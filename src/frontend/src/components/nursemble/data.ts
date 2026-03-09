import type { ConversationItem, ToolItem } from "./types";

export const SAMPLE_TOOLS: ToolItem[] = [
  {
    id: "nursestation",
    name: "NurseStation",
    iconEmoji: "🏥",
    description: "Your nursing resources hub",
    url: "https://nursestation.com",
    category: "resources",
  },
  {
    id: "campuslounge",
    name: "CampusLounge",
    iconEmoji: "🎓",
    description: "Student nurse community",
    url: "https://campuslounge.com",
    category: "community",
  },
  {
    id: "facultylounge",
    name: "FacultyLounge",
    iconEmoji: "👩‍🏫",
    description: "Nurse educators network",
    url: "https://facultylounge.com",
    category: "education",
  },
  {
    id: "nursicon",
    name: "Nursicon",
    iconEmoji: "🎨",
    description: "Nursing icons & visual assets",
    url: "https://nursicon.com",
    category: "resources",
  },
  {
    id: "rnsider",
    name: "RNsider",
    iconEmoji: "📰",
    description: "Nursing news & insights",
    url: "https://rnsider.com",
    category: "news",
  },
  {
    id: "omof",
    name: "Omof",
    iconEmoji: "🧘",
    description: "One moment of focus — wellness",
    url: "https://omof.com",
    category: "wellness",
  },
  {
    id: "supnurse",
    name: "SupNurse",
    iconEmoji: "💚",
    description: "Nurse peer support community",
    url: "https://supnurse.com",
    category: "community",
  },
  {
    id: "nurseidea",
    name: "NurseIdea",
    iconEmoji: "💡",
    description: "Nursing innovation ideas",
    url: "https://nurseidea.com",
    category: "innovation",
  },
  {
    id: "nursinginnoverse",
    name: "NursingInnoverse",
    iconEmoji: "🌐",
    description: "Nursing innovation universe",
    url: "https://nursinginnoverse.com",
    category: "innovation",
  },
  {
    id: "nurseforge",
    name: "NurseForge",
    iconEmoji: "⚒️",
    description: "Nurse career builder",
    url: "https://nurseforge.com",
    category: "career",
  },
  // ScrubLife uses the real scrubs image — iconEmoji kept as fallback
  {
    id: "scrublife",
    name: "ScrubLife",
    iconEmoji: "🩺",
    description: "Nursing apparel & gear",
    url: "https://scrublife.com",
    category: "lifestyle",
  },
  {
    id: "nursefluencers",
    name: "NurseFluencers",
    iconEmoji: "📱",
    description: "Nurse influencer network",
    url: "https://nursefluencers.com",
    category: "community",
  },
  {
    id: "suggest",
    name: "Suggest a Tool",
    iconEmoji: "💡",
    description: "Share your idea with us",
    url: "#suggest",
    category: "meta",
  },
];

export const SAMPLE_CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    title: "I'm exhausted after my shift and I think I need to talk to someone",
    group: "today",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content:
          "I'm exhausted after my shift and I think I need to talk to someone",
        timestamp: new Date(),
      },
      {
        id: "msg-2",
        role: "florence",
        content:
          "I hear you. 💚 12 hours of carrying that weight is real. You don't have to figure anything out right now. Would you like to talk here first, or should I open SupNurse where there's a whole community of nurses who get it? 🏮",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "conv-2",
    title: "Help me update my nursing resume",
    group: "today",
    messages: [
      {
        id: "msg-3",
        role: "user",
        content: "Help me update my nursing resume",
        timestamp: new Date(),
      },
      {
        id: "msg-4",
        role: "florence",
        content:
          "Of course! Let's make your resume shine. Tell me about your most recent role and any specializations — ICU, ER, pediatrics? And are we aiming for a specific type of position? 🏮",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "conv-3",
    title: "What certifications should I get next?",
    group: "yesterday",
    messages: [
      {
        id: "msg-5",
        role: "user",
        content: "What certifications should I get next?",
        timestamp: new Date(),
      },
      {
        id: "msg-6",
        role: "florence",
        content:
          "Great question! The right cert depends on your specialty and goals. Are you in acute care, community health, or thinking about advancing to NP? Let me point you toward the ones that will actually move your career. 🏮",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "conv-4",
    title: "I want to start a nurse blog",
    group: "yesterday",
    messages: [
      {
        id: "msg-7",
        role: "user",
        content: "I want to start a nurse blog",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "conv-5",
    title: "Find travel nursing jobs in Florida",
    group: "last7days",
    messages: [],
  },
  {
    id: "conv-6",
    title: "I need compression socks for 12-hour shifts",
    group: "last7days",
    messages: [],
  },
  {
    id: "conv-7",
    title: "How do I deal with a difficult charge nurse?",
    group: "last7days",
    messages: [],
  },
  {
    id: "conv-8",
    title: "Best scrub brands for petite nurses",
    group: "last30days",
    messages: [],
  },
  {
    id: "conv-9",
    title: "I'm thinking about getting my NP",
    group: "last30days",
    messages: [],
  },
  {
    id: "conv-10",
    title: "Connect me with other ICU nurses",
    group: "last30days",
    messages: [],
  },
];

export const PROMPT_CHIPS = [
  {
    id: "scrubs",
    label: "I need new scrubs",
    emoji: "",
    text: "I need new scrubs",
  },
  {
    id: "burnout",
    label: "I'm feeling burned out",
    emoji: "💚",
    text: "I'm feeling burned out",
  },
  {
    id: "business",
    label: "I have a business idea",
    emoji: "💡",
    text: "I have a business idea",
  },
  {
    id: "job",
    label: "Find me a nursing job",
    emoji: "💼",
    text: "Find me a nursing job",
  },
  {
    id: "connect",
    label: "I want to connect with nurses",
    emoji: "🤝",
    text: "I want to connect with nurses",
  },
  {
    id: "clinical",
    label: "I need clinical resources",
    emoji: "🏥",
    text: "I need clinical resources",
  },
];

export const SUPNURSE_TOOL = SAMPLE_TOOLS.find((t) => t.id === "supnurse")!;
