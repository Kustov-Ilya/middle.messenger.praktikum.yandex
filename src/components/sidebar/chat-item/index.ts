import Block, { BlockProps } from "../../../core/block";
import { RESOURCES_URL } from "../../../utils/consts";
import { withStore } from "../../../utils/withStore";
import template from "./chat-item.hbs";

class ChatItem extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatItem", props);
  }

  protected init(): void {
    this.props.resourceURL = RESOURCES_URL;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatItem, ["selectedChat"]);
