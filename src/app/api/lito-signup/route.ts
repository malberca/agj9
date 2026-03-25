import { headers } from "next/headers";

import {
  SignupPayload,
  getSignupFieldErrors,
  normalizeSignupPayload,
} from "@/lib/signup-validation";

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_LITO_SIGNUP_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      {
        error:
          "El modal ya esta listo, pero falta conectar el webhook de alta (`N8N_LITO_SIGNUP_WEBHOOK_URL`).",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as SignupPayload | null;
  const normalizedBody = normalizeSignupPayload(body || {});
  const validationErrors = getSignupFieldErrors(normalizedBody);

  if (Object.keys(validationErrors).length > 0) {
    return Response.json(
      {
        error: Object.values(validationErrors)[0],
      },
      { status: 400 },
    );
  }

  const headerStore = await headers();

  const upstreamResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.N8N_LITO_SIGNUP_WEBHOOK_SECRET
        ? { "x-lito-signup-secret": process.env.N8N_LITO_SIGNUP_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify({
      ...normalizedBody,
      source: "web-sumate-modal",
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
        error: "No pude enviar los datos en este momento. Proba otra vez en unos segundos.",
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    message: "Gracias. Ya enviamos tus datos al equipo.",
  });
}
