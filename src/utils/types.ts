import { METHODS } from "./consts";

export type ChatDataType = {
  id: number;
  chatName: string;
  lastMessage: string;
  lastOwn: boolean;
  date: string | Date;
  unreadCount: string;
};

export type MessageDataType = {
  id: number;
  textMessage?: string;
  imageMessage?: string;
  own: boolean;
  date: string | Date;
  ownStatus?: string;
};

export interface RequestOptions {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: Record<string, unknown>;
  timeout?: number;
}

type StringObj = Record<string, string>;

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

export type HTTPMethod = (
  url: string,
  options?: RequestOptions
) => Promise<XMLHttpRequest>;
