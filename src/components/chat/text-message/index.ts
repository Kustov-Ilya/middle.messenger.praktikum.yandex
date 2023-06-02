import Block, { BlockProps } from "../../../utils/block";
import template from "./text-message.hbs";
import checkIcon from "../../../asserts/dbl-check.svg";

export default class TextMessage extends Block {
  constructor(props: BlockProps = {}) {
    super("TextMessage", props);
  }

  protected init(): void {
    this.props.checkIcon = checkIcon;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
