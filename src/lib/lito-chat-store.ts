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
