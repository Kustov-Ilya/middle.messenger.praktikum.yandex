import Block, { BlockEvents, BlockProps } from "../../../core/block";
import template from "./sidebar-header.hbs";
import arrorRightIcon from "../../../asserts/arrow-right.svg";
import { router } from "../../../router";
import { ROUTER } from "../../../utils/consts";
import CustomField from "../../common/custom-field";
import MainButton from "../../common/main-button";
import modalController from "../../../utils/modalController";
import { withStore } from "../../../utils/withStore";
import { createChat } from "../../../services/chatService";
import Store from "../../../core/store";
import { CreateChatReqData } from "../../../utils/types";

const store = Store.Instance();

function handler(e: Event) {
  const value = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
  const data = { title: value } as CreateChatReqData;
  store.dispatch(createChat, data);
}

class SidebarHeader extends Block {
  constructor(props: BlockProps = {}) {
    super("SidebarHeader", props);
  }

  protected init(): void {
    this.props.arrorRightIcon = arrorRightIcon;
    this.props.toProfile = ROUTER.VIEW_PROFILE;
    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).click = this.onClick.bind(this);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onClick(e: Event) {
    const classList = (e.target as HTMLElement).className;
    const parentClasses = (e.target as HTMLElement).parentElement!.className;
    classList.concat(parentClasses);
    if (classList.includes("sidebar-header__create-chat")) {
      e.preventDefault();
      this.showModal();
    } else if (classList.includes("sidebar-header__profile")) {
      e.preventDefault();
      router.go(ROUTER.VIEW_PROFILE);
    }
  }

  showModal() {
    const formSettings = {
      title: "Создайте чат",
      field: new CustomField({
        name: "title",
        label: "Имя чата",
        type: "text",
        value: "",
      }),
      button: new MainButton({
        text: "Добавить",
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      handler,
      formSettings
    );
  }
}

export default withStore(SidebarHeader, ["chatsData"]);
