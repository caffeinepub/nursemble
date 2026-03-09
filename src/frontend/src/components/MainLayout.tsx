import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, useEffect, useState } from "react";
import { ChatPanel } from "./nursemble/ChatPanel";
import { LeftSidebar } from "./nursemble/LeftSidebar";
import { MobileTabBar } from "./nursemble/MobileTabBar";
import { RightPanel } from "./nursemble/RightPanel";
import { TopNav } from "./nursemble/TopNav";
import { SUPNURSE_TOOL } from "./nursemble/data";
import type {
  ActiveTab,
  ChatMessage,
  ConversationItem,
  ToolItem,
} from "./nursemble/types";

let msgIdCounter = 100;
function genId() {
  return `msg-${++msgIdCounter}-${Date.now()}`;
}

const FLORENCE_RESPONSES: Record<string, string> = {
  scrubs:
    "Great choice! Scrubs that hold up through a 12-hour shift matter. Let me open ScrubLife — they've got a solid curation of brands that nurses actually love, including options for every body type. 🏮",
  burnout:
    "I hear you. 💚 Burnout is real and it's not a weakness — it's a signal. Let's talk about what's been weighing on you most. Or if you'd like connection, I can open SupNurse where there are nurses who truly get it. 🏮",
  business:
    "A nurse with a business idea? That's exciting! 💡 Tell me more — is it a product, a service, a content brand? NurseIdea and NursingInnoverse are both great communities for nurse entrepreneurs. 🏮",
  job: "Let's find you something great! 💼 Are you open to travel nursing, or looking for something local? Full-time, PRN, or remote? Let me know your specialty and I'll pull up the best options through NurseForge. 🏮",
  connect:
    "Community is everything in nursing. 🤝 I can connect you with ICU nurses, travel nurses, new grads — whatever community fits your needs. CampusLounge is great for students, and SupNurse is wonderful for peer support. Where would you like to start? 🏮",
  clinical:
    "Clinical resources coming right up! 🏥 Are you looking for drug references, clinical calculators, practice guidelines, or CE courses? NurseStation has a great collection, and I can walk you through what's most relevant to your specialty. 🏮",
};

function getFlorenceResponse(message: string): Promise<string> {
  return new Promise((resolve) => {
    const lower = message.toLowerCase();
    const delay = 1200 + Math.random() * 800;
    let response =
      "I'm here for you. 💚 Tell me more about what you need — whether it's career support, resources, wellness, or just someone to talk to. I've got you. 🏮";
    if (
      lower.includes("scrub") ||
      lower.includes("uniform") ||
      lower.includes("clothing")
    ) {
      response = FLORENCE_RESPONSES.scrubs;
    } else if (
      lower.includes("burnout") ||
      lower.includes("exhausted") ||
      lower.includes("tired") ||
      lower.includes("stressed") ||
      lower.includes("talk to someone")
    ) {
      response = FLORENCE_RESPONSES.burnout;
    } else if (
      lower.includes("business") ||
      lower.includes("idea") ||
      lower.includes("entrepreneur")
    ) {
      response = FLORENCE_RESPONSES.business;
    } else if (
      lower.includes("job") ||
      lower.includes("work") ||
      lower.includes("position") ||
      lower.includes("hiring")
    ) {
      response = FLORENCE_RESPONSES.job;
    } else if (
      lower.includes("connect") ||
      lower.includes("community") ||
      lower.includes("nurse")
    ) {
      response = FLORENCE_RESPONSES.connect;
    } else if (
      lower.includes("clinical") ||
      lower.includes("resource") ||
      lower.includes("reference") ||
      lower.includes("drug")
    ) {
      response = FLORENCE_RESPONSES.clinical;
    }
    setTimeout(() => resolve(response), delay);
  });
}

export function MainLayout() {
  const isMobile = useIsMobile();
  // Sidebar hidden by default — clean welcome state on load
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeConversation, setActiveConversation] =
    useState<ConversationItem | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("florence");

  useEffect(() => {
    if (activeConversation) {
      setMessages(activeConversation.messages);
    } else {
      setMessages([]);
    }
  }, [activeConversation]);

  const handleConversationSelect = useCallback((conv: ConversationItem) => {
    setActiveConversation(conv);
    setMessages(conv.messages);
  }, []);

  const handleNewChat = useCallback(() => {
    setActiveConversation(null);
    setMessages([]);
    setRightPanelOpen(false);
    setActiveTool(null);
  }, []);

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: genId(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      if (!activeConversation) {
        const newConv: ConversationItem = {
          id: `conv-new-${Date.now()}`,
          title: text.length > 60 ? `${text.slice(0, 60)}…` : text,
          group: "today",
          messages: [userMsg],
        };
        setActiveConversation(newConv);
        setMessages([userMsg]);
      } else {
        setMessages((prev) => [...prev, userMsg]);
      }
      setIsTyping(true);
      try {
        const response = await getFlorenceResponse(text);
        const florenceMsg: ChatMessage = {
          id: genId(),
          role: "florence",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, florenceMsg]);
        const lower = text.toLowerCase();
        if (
          lower.includes("burnout") ||
          lower.includes("exhausted") ||
          lower.includes("tired") ||
          lower.includes("talk to someone") ||
          lower.includes("stressed")
        ) {
          setActiveTool(SUPNURSE_TOOL);
          setRightPanelOpen(true);
        }
      } finally {
        setIsTyping(false);
      }
    },
    [activeConversation],
  );

  const handleToolSelect = useCallback((tool: ToolItem) => {
    setActiveTool(tool);
    setRightPanelOpen(true);
  }, []);

  const handleCloseRightPanel = useCallback(() => {
    setRightPanelOpen(false);
    setActiveTool(null);
  }, []);

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
  }, []);

  const handleBackFromTool = useCallback(() => {
    setRightPanelOpen(false);
    setActiveTool(null);
  }, []);

  const showMobileRightPanel = isMobile && rightPanelOpen && activeTool;

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "oklch(0.934 0.010 80)" }}
    >
      <TopNav
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((v) => !v)}
        onToolSelect={handleToolSelect}
      />

      <div
        className="flex flex-1 overflow-hidden"
        style={{ marginTop: "56px" }}
      >
        {/* Sidebar — overlay for all screen sizes, hidden by default */}
        <LeftSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeConversationId={activeConversation?.id ?? null}
          onConversationSelect={handleConversationSelect}
          onNewChat={handleNewChat}
        />

        {/* Full-width center + right area */}
        <div className="flex flex-1 overflow-hidden relative">
          {!showMobileRightPanel && (
            <div
              className="flex flex-col overflow-hidden"
              style={{
                flex: rightPanelOpen && !isMobile ? "0 0 40%" : "1 1 0%",
                transition: "flex 0.3s ease",
              }}
            >
              <ChatPanel
                activeConversation={activeConversation}
                messages={messages}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
                isRightPanelOpen={rightPanelOpen}
                isMobile={isMobile}
                onBackFromTool={handleBackFromTool}
              />
            </div>
          )}

          {!isMobile && rightPanelOpen && activeTool && (
            <RightPanel
              tool={activeTool}
              isOpen={rightPanelOpen}
              onClose={handleCloseRightPanel}
            />
          )}

          {showMobileRightPanel && (
            <RightPanel
              tool={activeTool}
              isOpen={rightPanelOpen}
              onClose={handleCloseRightPanel}
              isMobile={true}
            />
          )}
        </div>
      </div>

      <footer
        className="flex-shrink-0 text-center py-2 px-5 text-[11px] hidden md:flex items-center justify-between"
        style={{
          background: "oklch(0.920 0.012 78)",
          borderTop: "1px solid oklch(0.228 0.034 248 / 12%)",
          color: "oklch(0.522 0.006 260)",
        }}
      >
        <span>
          <span style={{ color: "oklch(0.598 0.118 182)" }}>📞 988</span>{" "}
          Suicide & Crisis Lifeline — always available
        </span>
        <span>
          © {new Date().getFullYear()} Nursemble. Your Entire Career, in
          Harmony. ·{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </span>
      </footer>

      <MobileTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
