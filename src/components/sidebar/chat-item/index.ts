import Block, { BlockProps } from "../../../utils/block";
import template from "./chat-item.hbs";

export default class ChatItem extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatItem", props);
  }

  protected init(): void {
    this.props.selected = false;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
