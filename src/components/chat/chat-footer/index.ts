import Block, { BlockProps, BlockEvents } from "../../../core/block";
import template from "./chat-footer.hbs";
import clipIcon from "../../../asserts/clip.svg";
import arrowForwardIcon from "../../../asserts/arrow-forward.svg";
import photoIcon from "../../../asserts/photo.svg";
import locationIcon from "../../../asserts/location.svg";
import fileIcon from "../../../asserts/file.svg";
import UploadFileField from "../../common/upload-file-field";
import MainButton from "../../common/main-button";
import modalController from "../../../utils/modalController";
import { sendFile } from "../../../services/messagesService";

function sendFileHandler(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  sendFile(formData);
}

export default class ChatFooter extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatFooter", props);
  }

  protected init(): void {
    this.props.clipIcon = clipIcon;
    this.props.arrowForwardIcon = arrowForwardIcon;
    this.props.photoIcon = photoIcon;
    this.props.locationIcon = locationIcon;
    this.props.fileIcon = fileIcon;
    this.props.hiddenMenu = true;

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).click = this.onClick.bind(this);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onClick(e: Event) {
    let classes = (e.target as HTMLElement).className;
    const parentClasses = (e.target as HTMLElement).parentElement!.className;
    if (classes.includes("chat-footer__options")) {
      this.setProps({ hiddenMenu: !this.props.hiddenMenu });
    }
    classes = classes.concat(parentClasses);
    if (classes.includes("chat-footer__send-photo")) {
      this.showModal();
    }
  }

  showModal() {
    const formSettings = {
      title: `Отправить фото`,
      field: new UploadFileField({
        name: "resource",
      }),
      button: new MainButton({
        text: `Отправить`,
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      sendFileHandler,
      formSettings
    );
  }
}
