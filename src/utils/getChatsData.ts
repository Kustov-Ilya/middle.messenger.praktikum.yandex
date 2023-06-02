import { chatsList, messagesList } from "./chatData";
import { ChatDataType, MessageDataType } from "./types";

function prepareDataForChat(
  data: (ChatDataType | MessageDataType)[]
): (ChatDataType | MessageDataType)[] {
  return data
    .map((elem) => {
      elem.date = new Date(elem.date);
      return elem;
    })
    .sort(
      (elem1, elem2) =>
        (elem1.date as Date).getTime() - (elem2.date as Date).getTime()
    );
}

export function getChatList() {
  return prepareDataForChat(chatsList) as ChatDataType[];
}

export function getMessages() {
  return prepareDataForChat(messagesList) as MessageDataType[];
}
