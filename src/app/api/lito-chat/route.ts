import { headers } from "next/headers";

type LitoChatPayload = {
  sessionId?: string;
  message?: string;
  pagePath?: string;
};

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `lito-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_LITO_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      {
        error:
          "Lito ya esta listo en la web, pero falta conectar el webhook de n8n (`N8N_LITO_WEBHOOK_URL`).",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as LitoChatPayload | null;
  const message = body?.message?.trim();

  if (!message) {
    return Response.json(
      {
        error: "Escribi un mensaje antes de enviarlo.",
      },
      { status: 400 },
    );
  }

  const headerStore = await headers();
  const sessionId = body?.sessionId || createSessionId();

  const upstreamResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.N8N_LITO_WEBHOOK_SECRET
        ? { "x-lito-secret": process.env.N8N_LITO_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify({
      sessionId,
      message,
      pagePath: body?.pagePath || "/",
      origin: "web-lito",
      receivedAt: new Date().toISOString(),
      metadata: {
        userAgent: headerStore.get("user-agent"),
        referer: headerStore.get("referer"),
        forwardedFor: headerStore.get("x-forwarded-for"),
      },
    }),
    cache: "no-store",
  }).catch(() => null);

  if (!upstreamResponse || !upstreamResponse.ok) {
    return Response.json(
      {
        error:
          "No pude entregarle el mensaje a Lito en este momento. Proba otra vez en unos segundos.",
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    sessionId,
    message: "Lito ya le llevo tu mensaje al equipo.",
  });
}
