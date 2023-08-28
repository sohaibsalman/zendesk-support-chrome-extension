export interface SettingsResponse {
  crawl_status: string;
  crawl_url: string;
  draft_template: string;
  include_links: boolean;
}

export interface SettingsUpdateRequest {
  crawl_url: string;
  draft_template: string;
  include_links: boolean;
}

export interface SessionIdResponse {
  session_id: string;
}

export interface DraftRequest {
  ticket_comments: Tickets[];
  existing_draft: string;
  session_id: string;
}

export interface DraftResponse {
  confidence: string;
  content: string;
  done: boolean;
  question: string;
  sources: SourceLink[];
}

export interface StartDraftResponse {
  Confidence: string;
  Content: string;
  Done: boolean;
  Question: string;
  Sources: SourceLink[];
  Limit: boolean;
}

interface Tickets {
  name: string;
  comment: string;
}

export interface SourceLink {
  link: string;
  snippet: string;
  title: string;
}
