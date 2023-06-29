import Block, { BlockProps, BlockEvents } from "../../../core/block";
import template from "./chat-header.hbs";
import optionsIcon from "../../../asserts/options.svg";
import addIcon from "../../../asserts/add.svg";
import CustomField from "../../common/custom-field";
import MainButton from "../../common/main-button";
import modalController from "../../../utils/modalController";
import avatarLogo from "../../../asserts/avatar-logo.svg";
import UploadFileField from "../../common/upload-file-field";
import delChat from "../../../asserts/delete.svg";
import Store from "../../../core/store";
import {
  addAvatar,
  addUsers,
  deleteChat,
  deleteUsers,
} from "../../../services/chatService";
import { withStore } from "../../../utils/withStore";
import { RESOURCES_URL } from "../../../utils/consts";
import { ChatDataType, DeleteChatReqData } from "../../../utils/types";

const store = Store.Instance();

function addUserHandler(e: Event) {
  const body = getBodyForChangeChatUsers(e);
  store.dispatch(addUsers, body);
}

function deleteUserHandler(e: Event) {
  const body = getBodyForChangeChatUsers(e);
  store.dispatch(deleteUsers, body);
}

function getBodyForChangeChatUsers(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  const body = {
    users: (formData.get("users") as string).split(","),
    chatId: store.getState().selectedChat!.id.toString(),
  };
  return body;
}

function addChatAvatarHandler(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  formData.append("chatId", store.getState().selectedChat!.id.toString());
  store.dispatch(addAvatar, formData);
}

function deleteChatHandler(chatId: number) {
  const reqData = { chatId: chatId } as DeleteChatReqData;
  store.dispatch(deleteChat, reqData);
}

class ChatHeader extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatHeader", props);
  }

  protected init(): void {
    this.props.optionsIcon = optionsIcon;
    this.props.addIcon = addIcon;
    this.props.hiddenMenu = true;
    this.props.avatarLogo = avatarLogo;
    this.props.delChat = delChat;
    this.props.resourceURL = RESOURCES_URL;

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).click = this.onClick.bind(this);
  }

  protected componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): boolean {
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onClick(e: Event) {
    let classes = (e.target as HTMLElement).className;
    const parentClasses = (e.target as HTMLElement).parentElement!.className;
    if (classes.includes("chat-header__options")) {
      this.setProps({ hiddenMenu: !this.props.hiddenMenu });
    }
    classes = classes.concat(parentClasses);

    if (classes.includes("chat-header__add-user")) {
      this.showModal("add");
    }
    if (classes.includes("chat-header__delete-user")) {
      this.showModal("delete");
    }
    if (classes.includes("chat-header__change-avatar")) {
      this.showModalAvatar();
    }
    if (classes.includes("chat-header__delete-chat")) {
      this.showModalDeleteChat();
    }
  }
  showModalDeleteChat() {
    const formSettings = {
      title: "Удалить чат",
      button: new MainButton({
        text: "Удалить",
      }),
    };
    const chatId = (this.props.selectedChat as ChatDataType).id;
    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      () => deleteChatHandler(chatId),
      formSettings
    );
  }

  showModalAvatar() {
    const formSettings = {
      title: "Загрузите файл",
      field: new UploadFileField({ name: "avatar" }),
      button: new MainButton({
        text: "Добавить",
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      addChatAvatarHandler,
      formSettings
    );
  }

  showModal(mode: string) {
    const formSettings = {
      title: `${mode == "add" ? "Добавить" : "Удалить"} пользователя`,
      field: new CustomField({
        type: "text",
        name: "users",
        label: "Пользователи",
      }),
      button: new MainButton({
        text: `${mode == "add" ? "Добавить" : "Удалить"}`,
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      mode == "add" ? addUserHandler : deleteUserHandler,
      formSettings
    );
  }
}

export default withStore(ChatHeader, ["selectedChat"]);
