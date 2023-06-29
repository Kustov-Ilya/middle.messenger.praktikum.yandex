import Block, { BlockProps } from "../../../core/block";
import template from "./date-separator.hbs";

export default class DateSeparator extends Block {
  constructor(props: BlockProps = {}) {
    super("DateSeparator", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
