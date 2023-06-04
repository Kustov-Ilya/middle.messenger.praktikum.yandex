import Block, { BlockProps } from "../../utils/block";
import template from "./home-page.hbs";

export default class HomePage extends Block {
  constructor(props: BlockProps = {}) {
    super("HomePage", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
