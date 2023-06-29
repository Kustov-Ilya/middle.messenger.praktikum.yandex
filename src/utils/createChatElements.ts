import DateSeparator from "../components/chat/date-separator";
import ImageMessage from "../components/chat/image-message";
import TextMessage from "../components/chat/text-message";
import Block from "../core/block";
import ChatItem from "../components/sidebar/chat-item";
import { ChatDataType, MessageDataType } from "./types";
import { dateFormat, timeFormat } from "./supportFuncs";

export function createChatList(
  chats: ChatDataType[],
  handler: (id: number) => void
) {
  if (chats) {
    return chats.map(
      (chat) =>
        new ChatItem({
          ...chat,
          time: dateFormat(chat.last_message?.time),
          events: {
            click: () => handler(chat.id),
          },
        })
    );
  } else {
    return [];
  }
}

export function createMessageList(messages: MessageDataType[], userId: number) {
  if (!messages) return [];
  const messageListWithSeps: { date: string; arr: Block[] } = messages.reduce(
    (acc, message) => {
      const rowDate = message.time;
      const date = dateFormat(rowDate);
      if (date != acc.date) {
        acc.arr.push(
          new DateSeparator({ date: date.slice(0, date.length - 4) })
        );
        acc.date = date;
      }
      acc.arr.push(
        message.type == "file"
          ? new ImageMessage({
            ...message,
            time: timeFormat(rowDate),
            currentUser: userId,
          })
          : new TextMessage({
            ...message,
            time: timeFormat(rowDate),
            currentUser: userId,
          })
      );
      return acc;
    },
    { date: "", arr: [] as Block[] }
  );
  return messageListWithSeps.arr;
}
