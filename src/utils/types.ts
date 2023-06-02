import { METHODS } from "./consts";

export type chatDataType = {
  id: number;
  chatName: string;
  lastMessage: string;
  lastOwn: boolean;
  date: string | Date;
  unreadCount: string;
};

export type messageDataType = {
  id: number;
  textMessage?: string;
  imageMessage?: string;
  own: boolean;
  date: string | Date;
  ownStatus?: string;
};

export interface requestOptions {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: Record<string, unknown>;
  timeout?: number;
}

type stringObj = Record<string, string>;

export type logonStruct = {
  fields: stringObj[];
  submit: stringObj;
  subbutton: stringObj;
};

export type profileStruct = {
  fields: stringObj[];
  saveButton: stringObj | null;
  subbuttons: stringObj[];
};
