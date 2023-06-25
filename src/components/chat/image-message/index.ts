import Block, { BlockProps } from "../../../core/block";
import template from "./image-message.hbs";
import checkIcon from "../../../asserts/dbl-check.svg";

export default class ImageMessage extends Block {
  constructor(props: BlockProps = {}) {
    super("ImageMessage", props);
  }

  protected init(): void {
    this.props.own = this.props.currentUser == this.props.user_id;
    this.props.checkIcon = checkIcon;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
