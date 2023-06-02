import Block, { BlockProps } from "../../../utils/block";
import template from "./main-button.hbs";

export default class MainButton extends Block {
  constructor(props: BlockProps) {
    super("MainButton", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
