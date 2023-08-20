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
  Confidence: string;
  Content: string;
  Done: boolean;
  Question: string;
  Sources: any;
}

interface Tickets {
  name: string;
  comment: string;
}
