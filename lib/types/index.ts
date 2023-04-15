import {
  GptMessage,
  OpenAiChatRequest,
  OpenAiModel,
} from "#/lib/types/open-ai";

export type ElementProps = {
  className?: string;
};

export type CommonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export type CommonSpacings = CommonSizes | "none" | "full";

export type Language =
  | "English"
  | "Arabic"
  | "Spanish"
  | "French"
  | "Russian"
  | "Klingon"
  | "Pig Latin";

// ============================================================================
//  ERRORS
// ============================================================================

export interface ResponseError extends Error {
  status: number;
  statusText?: string;
}

// ============================================================================
//  STATUS MONEY CHAT APP
// ============================================================================

export interface ConversationsDataState {
  folders: ConversationsFolder[];
  rootConversations: Conversation[];
}

export type StatusChatRequest = OpenAiChatRequest & {
  language?: Language;
};

export type StatusChatMessage = GptMessage & {
  timestamp: number;
  tokens?: number;
};

export interface ConversationsFolder {
  id: number;
  name: string;
  conversations: Conversation[];
}

export interface Conversation {
  id: number;
  name: string;
  messages: StatusChatMessage[];
  model: OpenAiModel;
  folderId: number;
}
