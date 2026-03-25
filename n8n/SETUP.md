# Puesta en marcha n8n

Esta carpeta ya trae los workflows listos para importar:

- `lito-webhook-to-telegram.json`
- `lito-telegram-to-web-reply.json`
- `lito-signup-to-sheets-and-email.json`

## 1. Configuracion sin Variables de n8n

### En la web (`.env.local`)

Copiar desde `.env.local.example` y completar:

- `N8N_LITO_WEBHOOK_URL`
- `N8N_LITO_WEBHOOK_SECRET`
- `N8N_LITO_REPLY_WEBHOOK_SECRET`
- `N8N_LITO_SIGNUP_WEBHOOK_URL`
- `N8N_LITO_SIGNUP_WEBHOOK_SECRET`

### En n8n

No hace falta usar la seccion `Variables`.

En este setup:

- los secretos y URLs se editan directamente en los nodos
- Telegram, Google Sheets y SMTP se conectan con `Credentials`

## 2. Workflow de chat Lito

### A. Web -> Telegram

Importar `lito-webhook-to-telegram.json`.

Este workflow:

- recibe el POST desde `src/app/api/lito-chat/route.ts`
- valida el header `x-lito-secret`
- reenvia el mensaje a Telegram
- incluye el `sessionId` del visitante

#### Ajustes manuales en nodos

- en `Validar y Formatear`, reemplazar `REEMPLAZAR_CON_SECRETO_LITO`
- en `Enviar a Telegram`, dejar `chatId` en `-5193039068` o cambiarlo si despues mueven el grupo

#### Credenciales requeridas

En la UI de n8n, asignar una credencial `Telegram API` al nodo:

- `Enviar a Telegram`

### B. Telegram -> web

Importar `lito-telegram-to-web-reply.json`.

Este workflow:

- escucha mensajes nuevos del bot en Telegram
- detecta el `sessionId` si Cacho responde sobre el mensaje original
- tambien soporta el formato `/lito <sessionId> respuesta`
- publica la respuesta en `POST /api/lito-chat/replies`

#### Ajustes manuales en nodos

- en `Mandar Respuesta a la Web`, reemplazar `https://tu-dominio.com/api/lito-chat/replies`
- en `Mandar Respuesta a la Web`, reemplazar `REEMPLAZAR_CON_SECRETO_REPLY`

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

#### Ajustes manuales en nodos

- en `Validar y Preparar Sumate`, reemplazar `REEMPLAZAR_CON_SECRETO_SIGNUP`
- en `Validar y Preparar Sumate`, reemplazar `REEMPLAZAR_CON_GOOGLE_SHEET_ID`
- en `Guardar en Google Sheets`, reemplazar `REEMPLAZAR_CON_GOOGLE_SHEET_ID`
- en `Avisar al Equipo`, reemplazar `REEMPLAZAR_CON_RESEND_API_KEY`
- en `Avisar al Equipo`, reemplazar `REEMPLAZAR_CON_EMAIL_EQUIPO`
- en `Agradecer al Suscriptor`, reemplazar `REEMPLAZAR_CON_RESEND_API_KEY`
- si quieren otro remitente, cambiar `sumate@lanuevedejulio.com.ar` en ambos nodos

#### Credenciales requeridas

En la UI de n8n, asignar:

- una credencial `Google Sheets OAuth2` al nodo `Guardar en Google Sheets`
- no hace falta SMTP si usan Resend por API

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

1. Importar `lito-webhook-to-telegram.json`
2. Importar `lito-telegram-to-web-reply.json`
3. Importar `lito-signup-to-sheets-and-email.json`
4. Editar placeholders y secretos en los nodos
5. Asignar credenciales Telegram, Google Sheets y SMTP
6. Activar los 3 workflows
7. Copiar las URLs productivas de webhook a `.env.local`
8. Reiniciar la web

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

## 8. Supabase para replies compartidas

Si la web corre en Vercel, la opcion recomendada es Supabase.

### Variables de entorno en la web

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LITO_REPLIES_TABLE` opcional

### SQL de la tabla

Ejecutar:

- `supabase/lito_chat_replies.sql`

Por default la app usa la tabla:

- `lito_chat_replies`
