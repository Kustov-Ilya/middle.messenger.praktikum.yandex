import WSTransport from "../core/wsTransport";
import Store from "../core/store";
import { resourceAPI } from "../api/resourceAPI";
import { MessageFileType } from "../utils/types";

const store = Store.Instance();
const wsTransport = new WSTransport();

export function sendMessage(message: string) {
  try {
    wsTransport.sendMessage(message, "message");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export async function sendFile(data: FormData) {
  try {
    const response = await resourceAPI.createResource(data);
    const fileResp = JSON.parse(response.responseText) as MessageFileType;
    const fileRespId = fileResp.id;
    wsTransport.sendMessage(fileRespId, "file");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export async function openConnection() {
  try {
    wsTransport.close();
    const state = store.getState();
    const userId = state.userData?.id;
    const chatId = state.selectedChat?.id;
    const token = state.chatToken;
    if (userId && chatId && token) {
      setTimeout(() => wsTransport.open(userId, chatId, token), 0);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export function closeConnection() {
  try {
    wsTransport.close();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
