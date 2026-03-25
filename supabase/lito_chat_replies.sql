create table if not exists public.lito_chat_replies (
  id text primary key,
  session_id text not null,
  text text not null,
  source text not null default 'telegram',
  created_at timestamptz not null default now()
);

create index if not exists lito_chat_replies_session_created_at_idx
  on public.lito_chat_replies (session_id, created_at);
