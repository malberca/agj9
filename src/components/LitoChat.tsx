"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const teaserMessage = "Hola soy Lito!";
const initialChatMessage =
  "Hola, soy Lito. Si queres enviarle un mensaje al equipo, escribilo aca.";
const legacyChatMessages = [
  "Hola, soy Toy. Si queres contarle algo a Cacho, escribilo aca.",
  "Hola, soy Toy. Si queres enviarle un mensaje al equipo, escribilo aca.",
];
const litoImageVersion = "20260324b";

const sessionStorageKey = "lito-chat-session-id";
const messagesStorageKey = "lito-chat-messages";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `lito-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createWelcomeMessage(): ChatMessage {
  return {
    id: "lito-welcome",
    role: "assistant",
    text: initialChatMessage,
  };
}

export function LitoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMessage()]);
  const [isSending, setIsSending] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const floatingMessage = useMemo(() => teaserMessage, []);
  const litoImageSrc = useMemo(() => `/images/lito.webp?v=${litoImageVersion}`, []);

  useEffect(() => {
    const existingSessionId = window.localStorage.getItem(sessionStorageKey);
    const nextSessionId = existingSessionId || createId();
    const storedMessages = window.localStorage.getItem(messagesStorageKey);

    if (!existingSessionId) {
      window.localStorage.setItem(sessionStorageKey, nextSessionId);
    }

    setSessionId(nextSessionId);

    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages) as ChatMessage[];
        const normalizedMessages = parsed.map((message) =>
          message.role === "assistant" && legacyChatMessages.includes(message.text)
            ? { ...message, text: initialChatMessage }
            : message,
        );

        if (normalizedMessages.length > 0) {
          setMessages(normalizedMessages);
        }
      } catch {
        window.localStorage.removeItem(messagesStorageKey);
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(messagesStorageKey, JSON.stringify(messages));
  }, [isReady, messages]);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = draft.trim();
    if (!message || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      text: message,
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsSending(true);

    try {
      const response = await fetch("/api/lito-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message,
          pagePath: window.location.pathname,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "No pude enviar el mensaje en este momento.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          text: result?.message || "Lito ya le llevo tu mensaje al equipo.",
        },
      ]);
    } catch (error) {
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "No pude enviar el mensaje en este momento.";

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          text: fallbackMessage,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={`litoChatDock ${isOpen ? "is-open" : ""}`}>
      {!isOpen && (
        <button
          type="button"
          className="litoChatTeaser"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat con Lito"
        >
          <span className="litoChatBubble">{floatingMessage}</span>
          <span className="litoChatMascotFrame">
            <span className="litoChatThruster" aria-hidden="true">
              <span className="litoChatThrusterCore" />
              <span className="litoChatThrusterGlow" />
            </span>
            <img
              src={litoImageSrc}
              alt="Lito, asistente del equipo"
              width={120}
              height={156}
              className="litoChatMascot"
            />
          </span>
        </button>
      )}

      {isOpen && (
        <section className="litoChatPanel" aria-label="Chat con Lito">
          <header className="litoChatHeader">
            <div className="litoChatHeaderCopy">
              <span className="litoChatEyebrow">Lito</span>
              <h2>Mensaje directo para el equipo</h2>
              <p>Escribi lo que quieras. Lito se lo acerca al equipo por privado.</p>
            </div>
            <button
              type="button"
              className="litoChatClose"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </header>

          <div className="litoChatMessages" ref={messagesRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`litoChatMessage ${
                  message.role === "assistant" ? "is-assistant" : "is-user"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className="litoChatComposer" onSubmit={handleSubmit}>
            <label className="litoChatLabel" htmlFor="lito-chat-message">
              Escribile al equipo
            </label>
            <textarea
              id="lito-chat-message"
              className="litoChatInput"
              rows={3}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Dejale un mensaje, una propuesta o una critica."
              disabled={isSending}
            />
            <div className="litoChatActions">
              <span className="litoChatHint">
                {isSending ? "Lito esta enviando tu mensaje..." : "Lito reenvia esto al equipo."}
              </span>
              <button
                type="submit"
                className="litoChatSend"
                disabled={isSending || draft.trim().length === 0}
              >
                {isSending ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
