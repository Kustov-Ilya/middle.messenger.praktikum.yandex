import Block, { BlockProps } from "../../core/block";
import template from "./chat-page.hbs";
import SidebarHeader from "../../components/sidebar/sidebar-header";
import SearchLine from "../../components/sidebar/search-line";
import ChatHeader from "../../components/chat/chat-header";
import ChatFooter from "../../components/chat/chat-footer";
import { withStore } from "../../utils/withStore";
import Store from "../../core/store";
import { getChats, getToken } from "../../services/chatService";
import { isEqual } from "../../utils/supportFuncs";
import {
  createChatList,
  createMessageList,
} from "../../utils/createChatElements";
import { validation } from "../../utils/validation";
import { openConnection, sendMessage } from "../../services/messagesService";
import { ChatDataType, MessageDataType, UserData } from "../../utils/types";

const store = Store.Instance();

function onClickChatItem(id: number) {
  const selectedChat = store
    .getState()
    .chatsData?.filter((chat) => chat.id == id)[0];
  if (selectedChat) {
    store.dispatch({ selectedChat: selectedChat });
    store.dispatch(getToken, selectedChat.id);
  }
}

function sendMessageSubmit(e: Event) {
  e.preventDefault();
  if ((e.target as HTMLFormElement).className != "chat-footer__form") return;
  const inputClass = "chat-footer__new-message";
  const target = (e.target! as HTMLElement).getElementsByClassName(
    inputClass
  )[0] as HTMLInputElement;
  const resultOfValidation = validation(target.value, target.name, target.type);

  if (resultOfValidation.isValid) {
    sendMessage(target.value);
    target.value = "";
  } else {
    throw new Error(resultOfValidation.error);
  }
}

class ChatPage extends Block {
  constructor(props: BlockProps = {}) {
    super("LogonPage", props);
  }

  protected init(): void {
    const chats: Block[] = this.createChats();
    const messages: Block[] = this.createMessages();
    this.children.chats = chats;
    this.children.messages = messages;
    this.children.sidebarHeader = new SidebarHeader();
    this.children.searchLine = new SearchLine();
    this.children.chatHeader = new ChatHeader();
    this.children.chatFooter = new ChatFooter({
      events: {
        submit: (e: Event) => sendMessageSubmit(e),
      },
    });
  }

  protected componentDidMount(): void {
    (this.props.store as Store).dispatch(getChats);
  }

  protected componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): boolean {
    if (isEqual(oldProps, newProps)) return false;
    if (oldProps.chatsData != newProps.chatsData) {
      this.children.chats = this.createChats();
    }
    if (oldProps.messageData != newProps.messageData) {
      this.children.messages = this.createMessages();
    }
    if (oldProps.selectedChat != newProps.selectedChat) {
      (this.children.chatHeader as Block).setProps({
        selectedChat: this.props.selectedChat,
      });
    }
    if (oldProps.chatToken != newProps.chatToken) {
      openConnection();
    }
    return true;
  }
  
  createMessages() {
    if (this.props.userData) {
      return createMessageList(
        this.props.messageData as MessageDataType[],
        (this.props.userData as UserData).id
      );
    } else return [];
  }

  createChats() {
    return createChatList(
      this.props.chatsData as ChatDataType[],
      onClickChatItem
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatPage, [
  "chatsData",
  "chatToken",
  "selectedChat",
  "userData",
  "messageData",
]);
