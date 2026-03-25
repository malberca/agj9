import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type LitoStoredReply = {
  id: string;
  role: "assistant";
  text: string;
  createdAt: string;
  source: "telegram";
};

const maxRepliesPerSession = 100;

function getSupabaseUrl() {
  return process.env.SUPABASE_URL?.trim() || "";
}

function getSupabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
}

function getSupabaseRepliesTable() {
  return process.env.SUPABASE_LITO_REPLIES_TABLE?.trim() || "lito_chat_replies";
}

function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}

function getSupabaseRepliesUrl() {
  return `${getSupabaseUrl()}/rest/v1/${getSupabaseRepliesTable()}`;
}

function createSupabaseHeaders() {
  const serviceRoleKey = getSupabaseServiceRoleKey();

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

async function readSupabaseReplies(sessionId: string) {
  const query = new URLSearchParams({
    session_id: `eq.${sessionId}`,
    select: "id,text,created_at,source",
    order: "created_at.asc",
    limit: maxRepliesPerSession.toString(),
  });

  const response = await fetch(`${getSupabaseRepliesUrl()}?${query.toString()}`, {
    headers: createSupabaseHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase replies fetch failed with status ${response.status}`);
  }

  const rows = (await response.json().catch(() => [])) as Array<{
    id?: string;
    text?: string;
    created_at?: string;
    source?: string;
  }>;

  if (!Array.isArray(rows)) {
    return [];
  }

  return rows
    .filter(
      (row) =>
        typeof row?.id === "string" &&
        typeof row?.text === "string" &&
        typeof row?.created_at === "string" &&
        row?.source === "telegram",
    )
    .map((row) => ({
      id: row.id as string,
      role: "assistant" as const,
      text: row.text as string,
      createdAt: row.created_at as string,
      source: "telegram" as const,
    }));
}

async function appendSupabaseReply({
  sessionId,
  id,
  text,
}: {
  sessionId: string;
  id: string;
  text: string;
}) {
  const response = await fetch(getSupabaseRepliesUrl(), {
    method: "POST",
    headers: {
      ...createSupabaseHeaders(),
      Prefer: "resolution=ignore-duplicates,return=representation",
    },
    body: JSON.stringify([
      {
        id,
        session_id: sessionId,
        text,
        source: "telegram",
      },
    ]),
    cache: "no-store",
  });

  if (response.ok) {
    const rows = (await response.json().catch(() => [])) as Array<{
      id?: string;
      text?: string;
      created_at?: string;
      source?: string;
    }>;

    const insertedReply = rows[0];

    if (insertedReply?.id && insertedReply?.text && insertedReply?.created_at) {
      return {
        id: insertedReply.id,
        role: "assistant" as const,
        text: insertedReply.text,
        createdAt: insertedReply.created_at,
        source: "telegram" as const,
      };
    }
  }

  if (response.status === 409) {
    const replies = await readSupabaseReplies(sessionId);
    return replies.find((reply) => reply.id === id) || null;
  }

  if (!response.ok) {
    throw new Error(`Supabase reply insert failed with status ${response.status}`);
  }

  const replies = await readSupabaseReplies(sessionId);
  return replies.find((reply) => reply.id === id) || null;
}

function getStoreDir() {
  return process.env.LITO_CHAT_STORE_DIR || path.join("/tmp", "lito-chat-store");
}

function getSessionFilePath(sessionId: string) {
  return path.join(getStoreDir(), `${encodeURIComponent(sessionId)}.json`);
}

async function readSessionReplies(sessionId: string) {
  try {
    const raw = await readFile(getSessionFilePath(sessionId), "utf8");
    const parsed = JSON.parse(raw) as LitoStoredReply[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (reply) =>
        typeof reply?.id === "string" &&
        typeof reply?.text === "string" &&
        typeof reply?.createdAt === "string" &&
        reply?.role === "assistant" &&
        reply?.source === "telegram",
    );
  } catch {
    return [];
  }
}

async function writeSessionReplies(sessionId: string, replies: LitoStoredReply[]) {
  const filePath = getSessionFilePath(sessionId);
  const tempFilePath = `${filePath}.tmp`;

  await mkdir(getStoreDir(), { recursive: true });
  await writeFile(tempFilePath, JSON.stringify(replies.slice(-maxRepliesPerSession)), "utf8");
  await rename(tempFilePath, filePath);
}

export async function listLitoReplies(sessionId: string) {
  if (isSupabaseConfigured()) {
    return readSupabaseReplies(sessionId);
  }

  return readSessionReplies(sessionId);
}

export async function appendLitoReply({
  sessionId,
  id,
  text,
}: {
  sessionId: string;
  id: string;
  text: string;
}) {
  if (isSupabaseConfigured()) {
    return appendSupabaseReply({ sessionId, id, text });
  }

  const replies = await readSessionReplies(sessionId);

  if (replies.some((reply) => reply.id === id)) {
    return replies.find((reply) => reply.id === id) || null;
  }

  const nextReply: LitoStoredReply = {
    id,
    role: "assistant",
    text,
    createdAt: new Date().toISOString(),
    source: "telegram",
  };

  await writeSessionReplies(sessionId, [...replies, nextReply]);

  return nextReply;
}
