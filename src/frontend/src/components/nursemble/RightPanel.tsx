import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import type { ToolItem } from "./types";

interface RightPanelProps {
  tool: ToolItem | null;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export function RightPanel({
  tool,
  isOpen,
  onClose,
  isMobile = false,
}: RightPanelProps) {
  const [iframeError, setIframeError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeError(false);
    setIframeKey((k) => k + 1);
  };

  if (!isOpen || !tool) return null;

  const panelContent = (
    <div className="flex flex-col h-full" data-ocid="right_panel.panel">
      {/* Panel header — surface layer */}
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{
          background: "oklch(0.138 0.010 250)",
          borderBottom: "1px solid oklch(0.98 0.008 240 / 12%)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-base leading-none">{tool.iconEmoji}</span>
          <span
            className="font-semibold text-[13px] truncate"
            style={{ color: "oklch(0.88 0.008 240)" }}
          >
            {tool.name}
          </span>
        </div>

        <div className="flex items-center gap-0.5 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md"
            style={{ color: "oklch(0.48 0.010 240)" }}
            onClick={handleRefresh}
            aria-label="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-7 w-7 rounded-md transition-colors"
            style={{ color: "oklch(0.48 0.010 240)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "oklch(0.88 0.008 240)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "oklch(0.48 0.010 240)";
            }}
            data-ocid="right_panel.external_link"
            aria-label={`Open ${tool.name} in new tab`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md"
            style={{ color: "oklch(0.48 0.010 240)" }}
            onClick={onClose}
            data-ocid="right_panel.close_button"
            aria-label="Close panel"
          >
            <X className="h-[15px] w-[15px]" />
          </Button>
        </div>
      </div>

      {/* Panel body */}
      <div className="flex-1 relative overflow-hidden">
        {iframeError ? (
          /* Fallback card — designed, not generic */
          <div
            className="flex flex-col items-center justify-center h-full p-10 text-center"
            style={{ background: "oklch(0.108 0.009 252)" }}
          >
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
              style={{
                background: "oklch(0.158 0.011 248)",
                border: "1px solid oklch(0.98 0.008 240 / 12%)",
              }}
            >
              {tool.iconEmoji}
            </div>
            <h3
              className="text-lg font-bold mb-1.5 tracking-tight"
              style={{ color: "oklch(0.92 0.008 240)" }}
            >
              {tool.name}
            </h3>
            <p
              className="text-sm mb-2 max-w-[240px] leading-relaxed"
              style={{ color: "oklch(0.58 0.010 240)" }}
            >
              {tool.description}
            </p>
            <p
              className="text-xs mb-6 opacity-60"
              style={{ color: "oklch(0.52 0.010 240)" }}
            >
              This site blocks embedding — open it directly.
            </p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{
                background: "oklch(0.598 0.118 182)",
                boxShadow: "0 2px 10px oklch(0.598 0.118 182 / 35%)",
              }}
            >
              <ExternalLink className="h-[14px] w-[14px]" />
              Open {tool.name}
            </a>
          </div>
        ) : (
          <iframe
            key={iframeKey}
            src={tool.url}
            title={tool.name}
            className="w-full h-full border-0"
            onError={() => setIframeError(true)}
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              try {
                const _ = iframe.contentWindow?.location.href;
                void _;
              } catch {
                setIframeError(true);
              }
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-40 flex flex-col"
        style={{ background: "oklch(0.108 0.009 252)" }}
      >
        {panelContent}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col border-l flex-shrink-0 slide-in-right"
      style={{
        width: "60%",
        minWidth: "60%",
        borderColor: "oklch(0.98 0.008 240 / 12%)",
        background: "oklch(0.108 0.009 252)",
      }}
    >
      {panelContent}
    </div>
  );
}
