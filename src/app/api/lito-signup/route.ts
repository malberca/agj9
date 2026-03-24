import { headers } from "next/headers";

type LitoSignupPayload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  estacionServicio?: string;
  funcion?: string;
  mensaje?: string;
};

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

  const body = (await request.json().catch(() => null)) as LitoSignupPayload | null;
  const nombre = body?.nombre?.trim();
  const email = body?.email?.trim().toLowerCase();
  const telefono = body?.telefono?.trim();

  if (!nombre || !email || !telefono) {
    return Response.json(
      {
        error: "Nombre, email y telefono son obligatorios.",
      },
      { status: 400 },
    );
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    return Response.json(
      {
        error: "Necesito un email valido para poder contactarte.",
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
      nombre,
      email,
      telefono,
      estacionServicio: body?.estacionServicio?.trim() || "",
      funcion: body?.funcion?.trim() || "",
      mensaje: body?.mensaje?.trim() || "",
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
