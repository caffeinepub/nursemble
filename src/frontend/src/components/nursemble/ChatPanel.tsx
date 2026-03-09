import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROMPT_CHIPS } from "./data";
import type { ChatMessage, ConversationItem } from "./types";

interface ChatPanelProps {
  activeConversation: ConversationItem | null;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  isRightPanelOpen: boolean;
  isMobile?: boolean;
  onBackFromTool?: () => void;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-5" data-ocid="chat.typing_state">
      <div
        className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
        style={{ background: "oklch(0.598 0.118 182 / 18%)" }}
      >
        <span className="text-sm leading-none">🏮</span>
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-[18px] rounded-bl-[4px]"
        style={{
          background: "oklch(0.980 0.004 90)",
          border: "1px solid oklch(0.228 0.034 248 / 12%)",
        }}
      >
        <span
          className="typing-dot block h-[6px] w-[6px] rounded-full"
          style={{ background: "oklch(0.598 0.118 182)" }}
        />
        <span
          className="typing-dot block h-[6px] w-[6px] rounded-full"
          style={{ background: "oklch(0.598 0.118 182)" }}
        />
        <span
          className="typing-dot block h-[6px] w-[6px] rounded-full"
          style={{ background: "oklch(0.598 0.118 182)" }}
        />
      </div>
    </div>
  );
}

function WelcomeState({
  onChipClick,
}: { onChipClick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 pb-20 relative">
      <div className="welcome-atmosphere" />
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center relative z-10">
        <div className="relative flex items-center justify-center welcome-fade-in">
          <div className="lamp-halo" />
          <img
            src="/assets/generated/florence-lamp-transparent.dim_120x120.png"
            alt="Florence lamp"
            className="h-24 w-24 object-contain lamp-glow-large relative z-10"
          />
        </div>
        <div className="welcome-fade-in-delay-1 space-y-2">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              color: "oklch(0.228 0.034 248)",
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            Hello, Nurse Sarah!
            <br />
            <span>I&apos;m Florence.</span>
          </h1>
          <p
            className="text-base font-medium tracking-wide"
            style={{
              color: "oklch(0.598 0.118 182)",
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
          >
            Your Entire Career, in Harmony.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full welcome-fade-in-delay-2">
          {PROMPT_CHIPS.map((chip, i) => (
            <button
              type="button"
              key={chip.id}
              onClick={() => onChipClick(chip.text)}
              className="teal-chip rounded-full px-3.5 py-2.5 text-sm text-left transition-all flex items-center gap-2"
              data-ocid={`chat.prompt_chip.${i + 1}`}
            >
              {chip.id === "scrubs" ? (
                <img
                  src="/assets/generated/scrubs-icon-transparent.dim_80x80.png"
                  alt=""
                  className="h-4 w-4 object-contain flex-shrink-0"
                />
              ) : (
                <span>{chip.emoji}</span>
              )}
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex items-end gap-3 mb-5 fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isUser && (
        <div
          className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
          style={{ background: "oklch(0.598 0.118 182 / 18%)" }}
        >
          <span className="text-sm leading-none">🏮</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[78%] text-[14px]",
          isUser ? "bubble-user" : "bubble-florence",
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <div
          className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
          style={{ background: "oklch(0.598 0.118 182 / 28%)" }}
        >
          <span className="text-[10px] font-bold" style={{ color: "white" }}>
            SN
          </span>
        </div>
      )}
    </div>
  );
}

export function ChatPanel({
  activeConversation,
  messages,
  isTyping,
  onSendMessage,
  isRightPanelOpen,
  isMobile = false,
  onBackFromTool,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");
    onSendMessage(text);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const hasMessages = activeConversation !== null && messages.length > 0;

  return (
    <div
      className="flex flex-col flex-1 relative overflow-hidden"
      style={{ transition: "all 0.3s ease" }}
    >
      {isMobile && isRightPanelOpen && (
        <div
          className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
          style={{
            background: "oklch(0.934 0.010 80)",
            borderBottom: "1px solid oklch(0.228 0.034 248 / 12%)",
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-foreground"
            onClick={onBackFromTool}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Florence
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        {!hasMessages ? (
          <div className="h-full flex flex-col">
            <WelcomeState onChipClick={onSendMessage} />
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div
              className="px-5 py-7 max-w-3xl mx-auto"
              data-ocid="chat.messages_list"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
      </div>

      <div
        className="flex-shrink-0 px-4 py-4"
        style={{
          background: "oklch(0.934 0.010 80)",
          borderTop: "1px solid oklch(0.228 0.034 248 / 10%)",
        }}
      >
        <div
          className="max-w-3xl mx-auto flex items-end gap-3 rounded-2xl px-4 py-3 chat-input-wrapper"
          style={{
            background: "oklch(0.980 0.004 90)",
            border: "1px solid oklch(0.228 0.034 248 / 12%)",
          }}
        >
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Tell Florence what you need…"
            className="flex-1 resize-none border-0 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[26px] max-h-40 py-0 px-0 leading-relaxed"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 400,
            }}
            rows={1}
            data-ocid="chat.input"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-8 w-8 rounded-xl flex-shrink-0 transition-all duration-150"
            style={{
              background: inputValue.trim()
                ? "oklch(0.598 0.118 182)"
                : "oklch(0.870 0.012 80)",
              color: inputValue.trim() ? "white" : "oklch(0.600 0.008 260)",
              border: "none",
              boxShadow: inputValue.trim()
                ? "0 2px 8px oklch(0.598 0.118 182 / 35%)"
                : "none",
            }}
            data-ocid="chat.send_button"
            aria-label="Send message"
          >
            <Send className="h-[15px] w-[15px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
