import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { SAMPLE_CONVERSATIONS } from "./data";
import type { ConversationItem } from "./types";

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeConversationId: string | null;
  onConversationSelect: (conv: ConversationItem) => void;
  onNewChat: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const GROUP_LABELS: Record<ConversationItem["group"], string> = {
  today: "Today",
  yesterday: "Yesterday",
  last7days: "Last 7 Days",
  last30days: "Last 30 Days",
};

const GROUP_ORDER: ConversationItem["group"][] = [
  "today",
  "yesterday",
  "last7days",
  "last30days",
];

/* Warm cream sidebar — Luffu palette */
const SIDEBAR_BG = "oklch(0.920 0.012 78)";
const SIDEBAR_BORDER = "1px solid oklch(0.228 0.034 248 / 12%)";

export function LeftSidebar({
  isOpen,
  onToggle,
  activeConversationId,
  onConversationSelect,
  onNewChat,
  isMobile = false,
  onMobileClose,
}: LeftSidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [conversations, setConversations] =
    useState<ConversationItem[]>(SAMPLE_CONVERSATIONS);

  const grouped = GROUP_ORDER.reduce<Record<string, ConversationItem[]>>(
    (acc, group) => {
      acc[group] = conversations.filter((c) => c.group === group);
      return acc;
    },
    {} as Record<string, ConversationItem[]>,
  );

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  const handleConversationClick = (conv: ConversationItem) => {
    onConversationSelect(conv);
    if (isMobile && onMobileClose) onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-hidden">
      {/* New Chat button — teal, unchanged */}
      <div className="p-3 flex-shrink-0">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2.5 font-semibold text-[13px] h-9 rounded-lg transition-all"
          style={{
            background: "oklch(0.598 0.118 182)",
            color: "white",
            border: "none",
            boxShadow: "0 2px 8px oklch(0.598 0.118 182 / 30%)",
          }}
          data-ocid="sidebar.new_chat_button"
        >
          <PenLine className="h-[14px] w-[14px] flex-shrink-0" />
          New Chat
        </Button>
      </div>

      {/* History list */}
      <ScrollArea className="flex-1 px-2" data-ocid="sidebar.history_list">
        <div className="pb-2">
          {GROUP_ORDER.map((group) => {
            const items = grouped[group];
            if (!items || items.length === 0) return null;

            return (
              <div key={group} className="mb-5">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.07em] px-2 mb-1.5"
                  style={{ color: "oklch(0.522 0.006 260)" }}
                >
                  {GROUP_LABELS[group]}
                </p>

                {items.map((conv, index) => {
                  const isActive = conv.id === activeConversationId;
                  const isHovered = hoveredId === conv.id;
                  const ocidIndex =
                    SAMPLE_CONVERSATIONS.findIndex((c) => c.id === conv.id) + 1;

                  return (
                    <button
                      type="button"
                      key={conv.id}
                      className={cn(
                        "group relative w-full flex items-center gap-2 px-2.5 py-[7px] rounded-md cursor-pointer mb-0.5 transition-all text-left",
                        isActive ? "sidebar-item-active" : "sidebar-item-hover",
                      )}
                      style={
                        isActive
                          ? {
                              borderLeft: "2px solid oklch(0.598 0.118 182)",
                              background: "oklch(0.598 0.118 182 / 11%)",
                            }
                          : {
                              borderLeft: "2px solid transparent",
                            }
                      }
                      onClick={() => handleConversationClick(conv)}
                      onMouseEnter={() => setHoveredId(conv.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      data-ocid={`sidebar.item.${ocidIndex <= 10 ? ocidIndex : index + 1}`}
                      aria-label={conv.title}
                    >
                      <span
                        className="text-[12px] flex-1 truncate leading-snug"
                        style={{
                          color: isActive
                            ? "oklch(0.420 0.072 182)"
                            : "oklch(0.400 0.010 248)",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {conv.title}
                      </span>

                      {isHovered && !isActive && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, conv.id)}
                          className="flex-shrink-0 p-0.5 rounded transition-opacity"
                          style={{ color: "oklch(0.500 0.008 248)" }}
                          aria-label="Delete conversation"
                          data-ocid={`sidebar.item.${ocidIndex <= 10 ? ocidIndex : index + 1}.delete_button`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Bottom profile strip */}
      <div className="flex-shrink-0 p-3" style={{ borderTop: SIDEBAR_BORDER }}>
        <div className="flex items-center gap-2.5 mb-1">
          <Avatar className="h-7 w-7 flex-shrink-0">
            <AvatarFallback
              className="text-[10px] font-bold text-white"
              style={{ background: "oklch(0.598 0.118 182)" }}
            >
              SN
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p
              className="text-[12px] font-semibold truncate"
              style={{ color: "oklch(0.228 0.034 248)" }}
            >
              Sarah Nurse
            </p>
            <p
              className="text-[10px]"
              style={{ color: "oklch(0.522 0.006 260)" }}
            >
              💚 245 credits
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 flex-shrink-0 rounded-md"
            style={{ color: "oklch(0.500 0.008 248)" }}
            data-ocid="sidebar.settings_button"
            aria-label="Settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>

        <button
          type="button"
          className="w-full text-left text-[11px] px-2 py-1 rounded transition-colors"
          style={{ color: "oklch(0.500 0.008 248)" }}
          data-ocid="sidebar.profile_button"
        >
          View Profile
        </button>
      </div>
    </div>
  );

  /* ─── Mobile variant ─────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onMobileClose}
            onKeyDown={(e) => e.key === "Escape" && onMobileClose?.()}
            aria-hidden="true"
          />
        )}
        <aside
          className="fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col"
          style={{
            background: SIDEBAR_BG,
            borderRight: SIDEBAR_BORDER,
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          aria-label="Chat history sidebar"
        >
          <div
            className="flex items-center justify-between px-3 h-14 flex-shrink-0"
            style={{ borderBottom: SIDEBAR_BORDER }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.228 0.034 248)" }}
            >
              History
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              style={{ color: "oklch(0.522 0.006 260)" }}
              onClick={onMobileClose}
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          {sidebarContent}
        </aside>
      </>
    );
  }

  /* ─── Desktop variant ───────────────────────────────────── */
  return (
    <aside
      className="hidden md:flex flex-col flex-shrink-0 relative"
      style={{
        width: isOpen ? "240px" : "0px",
        minWidth: isOpen ? "240px" : "0px",
        overflow: "hidden",
        transition:
          "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        background: SIDEBAR_BG,
        borderRight: SIDEBAR_BORDER,
      }}
      aria-label="Chat history sidebar"
    >
      <div
        className="w-60 flex flex-col h-full"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.18s ease",
        }}
      >
        {sidebarContent}
      </div>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-10 flex items-center justify-center h-8 w-4 rounded-r-md transition-colors"
        style={{
          background: "oklch(0.905 0.014 80)",
          borderTop: "1px solid oklch(0.228 0.034 248 / 12%)",
          borderRight: "1px solid oklch(0.228 0.034 248 / 12%)",
          borderBottom: "1px solid oklch(0.228 0.034 248 / 12%)",
          color: "oklch(0.500 0.008 248)",
        }}
        data-ocid="sidebar.toggle"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}
