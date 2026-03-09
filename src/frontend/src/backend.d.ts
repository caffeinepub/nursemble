import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: string;
    content: string;
    role: string;
    timestamp: bigint;
    sessionId: string;
}
export interface Tool {
    id: string;
    url: string;
    name: string;
    description: string;
    iconEmoji: string;
    category: string;
}
export interface UserProfile {
    name: string;
    creditsRemaining: bigint;
}
export interface ChatSession {
    id: string;
    title: string;
    createdAt: bigint;
    updatedAt: bigint;
    messageCount: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMessage(sessionId: string, role: string, content: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createChatSession(initialMessage: string): Promise<string>;
    deleteChatSession(sessionId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFlorenceResponse(userMessage: string): Promise<string>;
    getMessages(sessionId: string): Promise<Array<Message>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listChatSessions(): Promise<Array<ChatSession>>;
    listTools(): Promise<Array<Tool>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
