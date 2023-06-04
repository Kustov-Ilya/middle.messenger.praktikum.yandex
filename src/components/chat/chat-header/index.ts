import Block, { BlockProps, BlockEvents } from "../../../utils/block";
import template from "./chat-header.hbs";
import optionsIcon from "../../../asserts/options.svg";
import addIcon from "../../../asserts/add.svg";
import CustomField from "../../common/custom-field";
import MainButton from "../../common/main-button";
import modalController from "../../../utils/modalController";

export default class ChatHeader extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatHeader", props);
  }

  protected init(): void {
    this.props.optionsIcon = optionsIcon;
    this.props.addIcon = addIcon;
    this.props.hiddenMenu = true;

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).click = this.onClick.bind(this);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onClick(e: Event) {
    const classes = (e.target as HTMLElement).className;
    const parentClasses = (e.target as HTMLElement).parentElement!.className;
    if (classes.includes("chat-header__options")) {
      this.setProps({ hiddenMenu: !this.props.hiddenMenu });
    }

    if (classes.concat(parentClasses).includes("chat-header__add-user")) {
      this.showModal("add");
    }

    if (classes.concat(parentClasses).includes("chat-header__delete-user")) {
      this.showModal("delete");
    }
  }

  showModal(mode: string) {
    const formSettings = {
      title: `${mode == "add" ? "Добавить" : "Удалить"} пользователя`,
      field: new CustomField({
        type: "text",
        name: "login",
        label: "Логин пользователя",
      }),
      button: new MainButton({
        text: `${mode == "add" ? "Добавить" : "Удалить"}`,
        events: {
          click: () => {
            delete this.children.modal;
            this.dispatchComponentDidMount();
          },
        },
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      formSettings
    );
  }
}
