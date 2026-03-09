import type { ActiveTab } from "./types";

interface MobileTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  const tabs: { id: ActiveTab; label: string; emoji: string }[] = [
    { id: "florence", label: "Florence", emoji: "🏮" },
    { id: "tools", label: "Tools", emoji: "⚙️" },
    { id: "profile", label: "Profile", emoji: "👤" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center md:hidden"
      style={{
        background: "oklch(0.920 0.012 78)",
        borderTop: "1px solid oklch(0.228 0.034 248 / 8%)",
        height: "60px",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            className="flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors relative"
            onClick={() => onTabChange(tab.id)}
            data-ocid={`mobile.tab.${tab.id}`}
            aria-label={tab.label}
          >
            <span className="text-lg leading-none">{tab.emoji}</span>
            <span
              className="text-[10px] font-medium leading-none"
              style={{
                color: isActive
                  ? "oklch(0.420 0.072 182)"
                  : "oklch(0.522 0.006 260)",
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 w-8 h-0.5 rounded-t-full"
                style={{ background: "oklch(0.598 0.118 182)" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
