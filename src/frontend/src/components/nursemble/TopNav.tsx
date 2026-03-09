import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, Menu } from "lucide-react";
import { useState } from "react";
import { SAMPLE_TOOLS } from "./data";
import type { ToolItem } from "./types";

interface TopNavProps {
  onHamburgerClick: () => void;
  onToolSelect: (tool: ToolItem) => void;
}

function GridIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Apps grid"
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

export function TopNav({ onHamburgerClick, onToolSelect }: TopNavProps) {
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
      style={{
        background: "oklch(0.920 0.012 78)",
        borderBottom: "1px solid oklch(0.228 0.034 248 / 12%)",
        backdropFilter: "blur(0px)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-2.5">
        {/* Hamburger — mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground h-8 w-8"
          onClick={onHamburgerClick}
          data-ocid="mobile.hamburger_button"
          aria-label="Open sidebar"
        >
          <Menu className="h-[18px] w-[18px]" />
        </Button>

        {/* Logo + Wordmark */}
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/generated/florence-lamp-transparent.dim_120x120.png"
            alt="Nursemble lamp"
            className="h-[30px] w-[30px] object-contain lamp-glow"
          />
          <span
            className="text-foreground font-semibold text-[15px] tracking-tight hidden sm:block"
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              letterSpacing: "-0.01em",
            }}
          >
            Nursemble
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* 9-dot grid */}
        <DropdownMenu open={gridOpen} onOpenChange={setGridOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg"
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
                  <span className="text-base leading-none">
                    {tool.iconEmoji}
                  </span>
                  <span
                    className="text-[12px] font-semibold leading-tight mt-0.5"
                    style={{ color: "oklch(0.228 0.034 248)" }}
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
                className="flex items-center gap-2 text-xs transition-colors p-1.5 rounded-md"
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
                <ExternalLink
                  className="h-3 w-3 flex-shrink-0"
                  style={{ color: "oklch(0.522 0.006 260)" }}
                />
                Suggest a new tool for the ecosystem
              </a>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile avatar */}
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
              style={{ background: "oklch(0.598 0.118 182)" }}
            >
              SN
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
