import Block, { BlockProps } from "../../../core/block";
import template from "./search-line.hbs";

export default class SearchLine extends Block {
  constructor(props: BlockProps = {}) {
    super("SearchLine", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
