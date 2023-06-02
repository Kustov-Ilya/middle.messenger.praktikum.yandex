import Block, { BlockProps } from "../../utils/block";
import template from "./chat-page.hbs";
import SidebarHeader from "../../components/sidebar/sidebar-header";
import SearchLine from "../../components/sidebar/search-line";
import ChatItem from "../../components/sidebar/chat-item";
import ChatHeader from "../../components/chat/chat-header";
import ChatFooter from "../../components/chat/chat-footer";
import TextMessage from "../../components/chat/text-message";
import ImageMessage from "../../components/chat/image-message";
import DateSeparator from "../../components/chat/date-separator";

import { dateFormat, timeFormat } from "../../utils/dttmFormat";
import { getChatList, getMessages } from "../../utils/getChatsData";

export default class ChatPage extends Block {
  constructor(props: BlockProps = {}) {
    super("LogonPage", props);
  }

  protected init(): void {
    const chats: Block[] | null = this.createChatList();
    const messages: Block[] | null = this.createMessages();
    this.children.chats = chats;
    this.children.messages = messages;
    this.children.sidebarHeader = new SidebarHeader();
    this.children.searchLine = new SearchLine();
    this.children.chatHeader = new ChatHeader();
    this.children.chatFooter = new ChatFooter();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  createChatList() {
    const chats = getChatList();
    return chats.map(
      (chat) => new ChatItem({ ...chat, date: dateFormat(chat.date) })
    );
  }

  createMessages() {
    const messages = getMessages();
    const messageListWithSeps: { date: string; arr: Block[] } = messages.reduce(
      (acc, message) => {
        const date = dateFormat(message.date);
        if (date != acc.date) {
          acc.arr.push(
            new DateSeparator({ date: date.slice(0, date.length - 4) })
          );
          acc.date = date;
        }
        acc.arr.push(
          message.imageMessage
            ? new ImageMessage({ ...message, time: timeFormat(message.date) })
            : new TextMessage({ ...message, time: timeFormat(message.date) })
        );
        return acc;
      },
      { date: "", arr: [] as Block[] }
    );
    return messageListWithSeps.arr;
  }
}
