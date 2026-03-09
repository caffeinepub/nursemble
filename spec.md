# Nursemble

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full Nursemble.com nurse ecosystem gateway application
- AI concierge named Florence with warm, caring persona
- Three-panel desktop layout: left sidebar, center chat, right tool panel
- Sign-in page with lamp logo, email/password, Google button, credit tiers
- Left sidebar: New Chat button, grouped chat history (Today/Yesterday/Last 7 Days/Last 30 Days), collapsible, bottom profile/settings/credits area
- Center chat panel: Florence welcome state with lamp glow, greeting, tagline, 6 prompt chips; chat message bubbles; typing indicator (teal dots); Florence signs with 🏮
- Right panel: slides open when tool triggered, shows tool iframe/link, close button, header with tool name + external link
- Top navbar: lamp logo + Nursemble wordmark (left), 9-dot grid icon + profile avatar (right)
- 9-dot grid dropdown: 13 tool tiles with icon/name/description + "Suggest a Tool" tile
- Sample chat history in sidebar (realistic, grouped)
- Sample conversation pre-loaded: exhausted nurse shift conversation with SupNurse panel
- Mobile layout: full-screen chat, hamburger sidebar, fixed bottom input, bottom tab bar (Florence / Tools / Profile), full-screen tool panel with back button
- Footer: 988 crisis line + copyright
- Dark mode default throughout
- Glowing teal lamp animation (soft pulse, never harsh)
- Plus Jakarta Sans font

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan

### Backend
- User auth (login/session) via authorization component
- Chat session storage: create session, list sessions, get messages, save message, delete session
- Each session stores: id, title (first message), created timestamp, messages array
- Florence response simulation: backend stores/returns pre-written warm responses for demo
- Tool list: static list of 13 tools with name, description, url, icon

### Frontend
- App shell: dark background (#0f1117), Plus Jakarta Sans font loaded from Google Fonts
- Auth gate: sign-in page shown if not logged in
- Sign-in page: centered lamp glow logo, form fields, Google button (UI only), credit tiers
- MainLayout: top navbar + three-panel body
- LeftSidebar component: collapsible, New Chat, grouped history list with hover-delete, profile row
- ChatPanel component: welcome state (centered lamp + greeting + chips) or active chat (messages + input)
- RightPanel component: animated slide-in, iframe or placeholder for tool, close button
- TopNav component: logo + wordmark, 9-dot grid popover, profile avatar
- ToolGrid component: 13 tool tiles in grid dropdown
- Message bubbles: Florence left-aligned, user right-aligned
- Typing indicator: 3 animated teal dots
- Prompt chips: 6 clickable suggestion chips
- Sample data: 8-10 realistic chat history entries grouped by date, pre-loaded sample conversation
- Mobile responsive: hamburger menu, bottom tab bar, full-screen transitions
- All interactive elements get deterministic data-ocid markers
- Smooth CSS transitions for sidebar collapse and right panel slide
