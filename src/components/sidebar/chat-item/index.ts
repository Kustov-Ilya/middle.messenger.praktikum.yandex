import Block, { BlockProps } from "../../../core/block";
import { withStore } from "../../../utils/withStore";
import template from "./chat-item.hbs";

class ChatItem extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatItem", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatItem, ["selectedChat"]);
