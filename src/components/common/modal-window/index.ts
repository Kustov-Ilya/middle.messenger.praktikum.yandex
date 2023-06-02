import Block, { BlockProps } from "../../../utils/block";
import template from "./modal-window.hbs";

export default class Modal extends Block {
  constructor(props: BlockProps = { type: "profile" }) {
    super("Modal", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
