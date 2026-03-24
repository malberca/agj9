# Puesta en marcha n8n

Esta carpeta ya trae los workflows listos para importar:

- `lito-webhook-to-telegram.json`
- `lito-telegram-to-web-reply.json`
- `lito-signup-to-sheets-and-email.json`

## 1. Variables de entorno

### En la web (`.env.local`)

Copiar desde `.env.local.example` y completar:

- `N8N_LITO_WEBHOOK_URL`
- `N8N_LITO_WEBHOOK_SECRET`
- `N8N_LITO_REPLY_WEBHOOK_SECRET`
- `N8N_LITO_SIGNUP_WEBHOOK_URL`
- `N8N_LITO_SIGNUP_WEBHOOK_SECRET`

### En n8n

Copiar desde `n8n/.env.example` y completar:

- `N8N_LITO_WEBHOOK_SECRET`
- `N8N_LITO_REPLY_WEBHOOK_SECRET`
- `N8N_LITO_SIGNUP_WEBHOOK_SECRET`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `LITO_WEB_REPLY_URL`
- `LITO_SIGNUP_SHEET_ID`
- `LITO_SIGNUP_SHEET_NAME`
- `LITO_SIGNUP_FROM_EMAIL`
- `LITO_SIGNUP_NOTIFY_EMAIL`
- `LITO_SIGNUP_CAMPAIGN_NAME`

## 2. Workflow de chat Lito

### A. Web -> Telegram

Importar `lito-webhook-to-telegram.json`.

Este workflow:

- recibe el POST desde `src/app/api/lito-chat/route.ts`
- valida el header `x-lito-secret`
- reenvia el mensaje a Telegram
- incluye el `sessionId` del visitante

No usa credencial de Telegram en n8n porque llama directo a la API de Telegram con `TELEGRAM_BOT_TOKEN`.

### B. Telegram -> web

Importar `lito-telegram-to-web-reply.json`.

Este workflow:

- escucha mensajes nuevos del bot en Telegram
- detecta el `sessionId` si Cacho responde sobre el mensaje original
- tambien soporta el formato `/lito <sessionId> respuesta`
- publica la respuesta en `POST /api/lito-chat/replies`

#### Credenciales requeridas

En la UI de n8n, asignar una credencial `Telegram API` a:

- `Telegram Trigger`
- `Confirmar en Telegram`

#### Forma de uso para Cacho

Opcion recomendada:

- responder directamente al mensaje que Lito envio al bot

Opcion alternativa:

- escribir `/lito <sessionId> tu respuesta`

## 3. Workflow de Sumate

Importar `lito-signup-to-sheets-and-email.json`.

Este workflow:

- recibe el POST desde `src/app/api/lito-signup/route.ts`
- valida el header `x-lito-signup-secret`
- guarda la suscripcion en Google Sheets
- manda mail de agradecimiento al afiliado
- manda mail interno al equipo

#### Credenciales requeridas

En la UI de n8n, asignar:

- una credencial `Google Sheets OAuth2` al nodo `Guardar en Google Sheets`
- una credencial `SMTP` al nodo `Avisar al Equipo`
- una credencial `SMTP` al nodo `Agradecer al Suscriptor`

## 4. Columnas del Google Sheet

Crear una hoja con nombre `Sumate` o usar el valor de `LITO_SIGNUP_SHEET_NAME`.

La fila 1 debe tener exactamente estas columnas:

- `received_at`
- `received_at_local`
- `nombre`
- `email`
- `telefono`
- `estacion_servicio`
- `funcion`
- `mensaje`
- `source`
- `referer`
- `forwarded_for`
- `user_agent`

## 5. Orden sugerido de activacion

1. Crear y probar variables de entorno en n8n
2. Importar `lito-webhook-to-telegram.json`
3. Importar `lito-telegram-to-web-reply.json`
4. Asignar credenciales Telegram al workflow de vuelta
5. Importar `lito-signup-to-sheets-and-email.json`
6. Crear la hoja y asignar credenciales Google Sheets + SMTP
7. Activar los 3 workflows
8. Copiar las URLs productivas de webhook a `.env.local`
9. Reiniciar la web

## 6. Pruebas recomendadas

### Chat Lito

1. Abrir la web
2. Enviar un mensaje desde Lito
3. Confirmar que llegue a Telegram con `Sesion: ...`
4. Responder sobre ese mensaje desde Telegram
5. Confirmar que la respuesta aparezca en la web a los pocos segundos

### Sumate

1. Abrir el modal `Sumate!`
2. Enviar nombre, email y telefono
3. Confirmar nueva fila en Google Sheets
4. Confirmar mail de agradecimiento al suscriptor
5. Confirmar mail interno al equipo

## 7. Dato importante de infraestructura

El endpoint `GET /api/lito-chat/replies` lee respuestas desde disco local.

Por defecto se usa:

- `/tmp/lito-chat-store`

Si la web corre en varias instancias o en serverless efimero, conviene mover eso a Redis, Supabase o una DB compartida.
