export interface ChatMessage {
  id: string;
  role: "user" | "florence";
  content: string;
  timestamp: Date;
}

export interface ConversationItem {
  id: string;
  title: string;
  group: "today" | "yesterday" | "last7days" | "last30days";
  messages: ChatMessage[];
}

export interface ToolItem {
  id: string;
  name: string;
  iconEmoji: string;
  description: string;
  url: string;
  category: string;
}

export type ActiveTab = "florence" | "tools" | "profile";
