import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../services/storage";
import {
  DraftRequest,
  DraftResponse,
  SessionIdResponse,
  SettingsResponse,
  SettingsUpdateRequest,
  StartDraftResponse,
} from "../models/extension-requests";

axios.defaults.baseURL =
  "https://rightpage-dev-faef281bae39.herokuapp.com/extension";

axios.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Extension = {
  getSettings: () => requests.get<SettingsResponse>("/settings"),
  updateSettings: (settings: SettingsUpdateRequest) =>
    requests.put("/settings", settings),
  getSessionId: () => requests.get<SessionIdResponse>("/session"),
  startDraft: (draft: DraftRequest) =>
    requests.post<StartDraftResponse>("/draft", draft),
  getDraftStatus: (sessionId: string) =>
    requests.get<DraftResponse>(`/draft/${sessionId}`),
};

export const agent = {
  Extension,
};
