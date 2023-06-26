import {
  LoginFields,
  METHODS,
  RegisterFields,
  UpdatePasswordFields,
  UserDataField,
} from "./consts";

type StringObj = Record<string, string>;

// For httpTransport
export interface RequestOptions {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
}

export type HTTPMethod = (
  url: string,
  options?: RequestOptions
) => Promise<XMLHttpRequest>;

export type HttpError = {
  reason: string;
};

// For pages struct
export type LogonStruct = {
  fields: StringObj[];
  submit: StringObj;
  subbutton: StringObj;
};

export type ProfileStruct = {
  fields: StringObj[];
  saveButton: StringObj | null;
  subbuttons: StringObj[];
};

export type LoginReqData = Record<(typeof LoginFields)[number], string>;

export type RegisterReqData = Record<(typeof RegisterFields)[number], string>;

// For user API
export type UserData = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

// For chats API
export type LastMessageDataType = {
  user: UserDataType;
  time: string;
  content: string;
};

export type TokenRespType = {
  token: string;
};

export type ChatDataType = {
  id: number;
  created_by: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessageDataType;
};
export type CreateChatReqData = { title: string };

export type DeleteChatReqData = { chatId: number };

export type UsersChatReq = {
  users: Array<number>;
  chatId: number;
};

// For profile api
export type UserDataType = Record<(typeof UserDataField)[number], string>;
export type UpdatePasswordReqData = Record<
  (typeof UpdatePasswordFields)[number],
  string
>;

export type SearchUserReqData = {
  login: string;
};

// For store
export type MessageFileType = {
  id: number;
  path: string;
  content_size: number;
  content_type: string;
  filename: string;
  upload_date: string;
  user_id: number;
  type: string;
};

export type MessageDataType = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: MessageFileType | null;
};

export type State = {
  isLoading: boolean;
  logonError: string;
  userError: string;
  chatError: string;
  chatsData: ChatDataType[];
  messageData: (MessageDataType | MessageFileType)[];
  selectedChat: ChatDataType;
  userData: UserData;
  appIsInited: boolean;
  chatToken: string;
  newChatFileId: number;
};
export type AppState = Partial<State>;

export type Dispatch = (
  nextStateOrAction: AppState | Action,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
) => void;

export type Action = (
  dispatch: Dispatch,
  state: AppState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
) => void;

export type DispatchStateHandler<TAction> = (
  dispatch: Dispatch,
  _state: AppState,
  action: TAction
) => void;

// validation

export type ValidationAttrs = {
  name: string;
  value: string;
  type: string;
  isValid: boolean;
  error: string;
};
