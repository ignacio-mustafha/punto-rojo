"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const defaultMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hola, soy tu asistente de Punto Red. Contame en que te puedo ayudar.",
  },
];

const createPortalSafe = (children: ReactNode, container: Element) => {
  const portalApi = ReactDOM as unknown as {
    createPortal: (node: ReactNode, target: Element) => ReactNode;
  };
  return portalApi.createPortal(children, container);
};

export default function FloatingChatBubble() {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [mounted, setMounted] = useState(false);

  const firstName = useMemo(() => user?.name?.split(" ")[0] ?? "usuario", [user?.name]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAuthenticated || !mounted) return null;

  const sendMessage = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const nextUserMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };
    const nextAssistantMessage: ChatMessage = {
      id: `${Date.now()}-assistant`,
      role: "assistant",
      content: "Gracias por tu consulta. Nuestro equipo te respondera por este chat en breve.",
    };

    setMessages((prev) => [...prev, nextUserMessage, nextAssistantMessage]);
    setDraft("");
  };

  return createPortalSafe(
    <div
      style={{
        position: "fixed",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        zIndex: 2147483000,
      }}
    >
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-[min(23rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-3 text-primary-foreground">
              <div>
                <p className="text-sm font-semibold">Soporte Punto Red</p>
                <p className="text-xs text-primary-foreground/90">En linea para {firstName}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
                aria-label="Cerrar chat"
                onClick={() => setOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>

            <div className="max-h-80 space-y-2 overflow-y-auto bg-muted/30 px-3 py-3">
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={[
                        "max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm",
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground",
                      ].join(" ")}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t bg-background p-3">
              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <Input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Escribi tu consulta..."
                  className="h-9 border-primary/20 bg-card text-xs focus-visible:ring-primary/30"
                />
                <Button type="submit" size="icon" className="h-9 w-9" aria-label="Enviar mensaje">
                  <Send size={15} />
                </Button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-white shadow-xl"
        aria-label={open ? "Ocultar chat de soporte" : "Abrir chat de soporte"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle size={22} />
      </motion.button>
    </div>
    ,
    document.body,
  );
}
