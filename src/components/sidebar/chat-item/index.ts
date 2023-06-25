import Block, { BlockProps } from "../../../core/block";
import Store from "../../../core/store";
import { withStore } from "../../../utils/withStore";
import template from "./chat-item.hbs";

class ChatItem extends Block {
  constructor(props: BlockProps = {}) {
    super("ChatItem", props);
  }

  protected init(): void {
    this.props.own =
      this.props.created_by !=
      (this.props.store as Store).getState().userData!.id;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatItem, ["selectedChat"]);
