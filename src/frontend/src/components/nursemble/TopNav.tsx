import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { SAMPLE_TOOLS } from "./data";
import type { ToolItem } from "./types";

interface TopNavProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onToolSelect: (tool: ToolItem) => void;
}

function GridIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="1.6" fill="currentColor" />
      <circle cx="10" cy="4" r="1.6" fill="currentColor" />
      <circle cx="16" cy="4" r="1.6" fill="currentColor" />
      <circle cx="4" cy="10" r="1.6" fill="currentColor" />
      <circle cx="10" cy="10" r="1.6" fill="currentColor" />
      <circle cx="16" cy="10" r="1.6" fill="currentColor" />
      <circle cx="4" cy="16" r="1.6" fill="currentColor" />
      <circle cx="10" cy="16" r="1.6" fill="currentColor" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Panel-left icon — looks like Claude's sidebar toggle */
function PanelLeftIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="3"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="7.5"
        y1="3"
        x2="7.5"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function TopNav({
  sidebarOpen,
  onSidebarToggle,
  onToolSelect,
}: TopNavProps) {
  const [gridOpen, setGridOpen] = useState(false);

  const handleToolClick = (tool: ToolItem) => {
    setGridOpen(false);
    if (tool.id === "suggest") {
      window.open(
        "mailto:hello@nursemble.com?subject=Tool Suggestion",
        "_blank",
      );
      return;
    }
    onToolSelect(tool);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 h-14"
      style={{
        background: "oklch(0.920 0.012 78)",
        borderBottom: "1px solid oklch(0.228 0.034 248 / 12%)",
      }}
    >
      {/* Left — sidebar toggle + logo */}
      <div className="flex items-center gap-1">
        {/* Panel toggle — always visible on all screen sizes */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg flex-shrink-0 transition-colors"
          style={{
            color: sidebarOpen
              ? "oklch(0.420 0.095 182)"
              : "oklch(0.500 0.008 248)",
            background: sidebarOpen
              ? "oklch(0.598 0.118 182 / 10%)"
              : "transparent",
          }}
          onClick={onSidebarToggle}
          data-ocid="nav.sidebar_toggle"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <PanelLeftIcon />
        </Button>

        {/* Logo + Wordmark */}
        <div className="flex items-center gap-2 ml-0.5">
          <img
            src="/assets/generated/florence-lamp-transparent.dim_120x120.png"
            alt="Nursemble lamp"
            className="h-[28px] w-[28px] object-contain lamp-glow"
          />
          <span
            className="font-semibold text-[15px] hidden sm:block"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "oklch(0.228 0.034 248)",
            }}
          >
            Nursemble
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <DropdownMenu open={gridOpen} onOpenChange={setGridOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              style={{ color: "oklch(0.500 0.008 248)" }}
              data-ocid="nav.grid_button"
              aria-label="Open tools grid"
            >
              <GridIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-3 w-[392px]"
            style={{
              background: "oklch(0.975 0.005 85)",
              border: "1px solid oklch(0.228 0.034 248 / 14%)",
              boxShadow:
                "0 8px 32px oklch(0.228 0.034 248 / 12%), 0 2px 8px oklch(0.228 0.034 248 / 8%)",
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }}
            data-ocid="nav.tools_dropdown_menu"
          >
            <div className="mb-2.5 px-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.08em]">
                Nursemble Ecosystem
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {SAMPLE_TOOLS.map((tool) => (
                <button
                  type="button"
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="flex flex-col items-start gap-1 p-2.5 rounded-lg text-left transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "oklch(0.598 0.118 182 / 10%)";
                    el.style.borderColor = "oklch(0.598 0.118 182 / 28%)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "transparent";
                  }}
                >
                  <span className="leading-none flex items-center justify-center h-5 w-5">
                    {tool.id === "scrublife" ? (
                      <img
                        src="/assets/generated/scrubs-icon-transparent.dim_80x80.png"
                        alt="Scrubs"
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <span className="text-base">{tool.iconEmoji}</span>
                    )}
                  </span>
                  <span
                    className="text-[12px] font-semibold leading-tight mt-0.5"
                    style={{ color: "oklch(0.228 0.034 248)", fontWeight: 700 }}
                  >
                    {tool.name}
                  </span>
                  <span
                    className="text-[10px] leading-tight line-clamp-2"
                    style={{ color: "oklch(0.522 0.006 260)" }}
                  >
                    {tool.description}
                  </span>
                </button>
              ))}
            </div>

            <div
              className="mt-2.5 pt-2.5"
              style={{ borderTop: "1px solid oklch(0.228 0.034 248 / 10%)" }}
            >
              <a
                href="mailto:hello@nursemble.com?subject=Tool Suggestion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs p-1.5 rounded-md transition-colors"
                style={{ color: "oklch(0.522 0.006 260)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.228 0.034 248)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.522 0.006 260)";
                }}
              >
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                Suggest a new tool for the ecosystem
              </a>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full p-0"
          data-ocid="nav.profile_button"
          aria-label="Profile"
        >
          <Avatar className="h-[30px] w-[30px]">
            <AvatarFallback
              className="text-[10px] font-bold text-white"
              style={{
                background: "oklch(0.598 0.118 182)",
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}
            >
              SN
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
