import { headers } from "next/headers";

import { appendLitoReply, listLitoReplies } from "@/lib/lito-chat-store";

type LitoReplyPayload = {
  id?: string;
  sessionId?: string;
  message?: string;
};

function createReplyId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `lito-reply-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId")?.trim();

  if (!sessionId) {
    return Response.json(
      {
        error: "Falta sessionId.",
      },
      { status: 400 },
    );
  }

  const replies = await listLitoReplies(sessionId);

  return Response.json({
    ok: true,
    replies,
  });
}

export async function POST(request: Request) {
  const headerStore = await headers();
  const expectedSecret = process.env.N8N_LITO_REPLY_WEBHOOK_SECRET;
  const receivedSecret =
    headerStore.get("x-lito-reply-secret") || headerStore.get("X-Lito-Reply-Secret");

  if (expectedSecret && receivedSecret !== expectedSecret) {
    return Response.json(
      {
        error: "Unauthorized webhook request.",
      },
      { status: 401 },
    );
  }

  const body = (await request.json().catch(() => null)) as LitoReplyPayload | null;
  const sessionId = body?.sessionId?.trim();
  const message = body?.message?.trim();

  if (!sessionId || !message) {
    return Response.json(
      {
        error: "sessionId y message son obligatorios.",
      },
      { status: 400 },
    );
  }

  const reply = await appendLitoReply({
    sessionId,
    id: body?.id?.trim() || createReplyId(),
    text: message,
  });

  return Response.json({
    ok: true,
    reply,
  });
}
