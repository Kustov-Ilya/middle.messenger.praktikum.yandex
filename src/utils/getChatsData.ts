import { chatsList, messagesList } from "./chatData";
import { chatDataType, messageDataType } from "./types";

function prepareDataForChat(
  data: (chatDataType | messageDataType)[]
): (chatDataType | messageDataType)[] {
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
  return prepareDataForChat(chatsList) as chatDataType[];
}

export function getMessages() {
  return prepareDataForChat(messagesList) as messageDataType[];
}
