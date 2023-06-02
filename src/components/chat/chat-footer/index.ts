import Block, { BlockProps, BlockEvents } from "../../../utils/block";
import template from "./chat-footer.hbs";
import clipIcon from "../../../asserts/clip.svg";
import arrowForwardIcon from "../../../asserts/arrow-forward.svg";
import photoIcon from "../../../asserts/photo.svg";
import locationIcon from "../../../asserts/location.svg";
import fileIcon from "../../../asserts/file.svg";
import { validation } from "../../../utils/validation";

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
    (this.props.events as BlockEvents).submit = this.onSubmit.bind(this);
    (this.props.events as BlockEvents).click = this.onClick.bind(this);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const formClass = "chat-footer__form";
    const target = (e.target! as HTMLElement).getElementsByClassName(
      formClass
    )[0] as HTMLInputElement;
    const resultOfValidation = validation(
      target.value,
      target.name,
      target.type
    );

    if (resultOfValidation.isValid) {
      // eslint-disable-next-line no-console
      console.log("Action: SendMesage");
      // eslint-disable-next-line no-console
      console.log(target.name, target.value);
    } else {
      // eslint-disable-next-line no-console
      console.log(resultOfValidation.error);
    }
  }

  onClick(e: Event) {
    const classes = (e.target as HTMLElement).className;
    if (classes.includes("chat-footer__options")) {
      this.setProps({ hiddenMenu: !this.props.hiddenMenu });
    }
  }
}
