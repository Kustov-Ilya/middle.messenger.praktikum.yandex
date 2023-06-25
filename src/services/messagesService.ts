import WSTransport from "../core/wsTransport";
import Store from "../core/store";
import { resourceAPI } from "../api/resourceAPI";
import { MessageFileType } from "../utils/types";

const store = Store.Instance();
const wsTransport = new WSTransport();

export function sendMessage(message: string) {
  wsTransport.sendMessage(message, "message");
}

export async function sendFile(data: FormData) {
  const response = await resourceAPI.createResource(data);
  const fileResp = JSON.parse(response.responseText) as MessageFileType;
  const fileRespId = fileResp.id;
  wsTransport.sendMessage(fileRespId, "file");
}

export async function openConnection() {
  wsTransport.close();
  const state = store.getState();
  const userId = state.userData?.id;
  const chatId = state.selectedChat?.id;
  const token = state.chatToken;
  if (userId && chatId && token) {
    setTimeout(() => wsTransport.open(userId, chatId, token), 0);
  }
}

export function closeConnection() {
  wsTransport.close();
}
