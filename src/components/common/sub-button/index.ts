import Block, { BlockProps } from "../../../core/block";
import template from "./sub-button.hbs";

export default class SubButton extends Block {
  constructor(props: BlockProps) {
    super("SubButton", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
