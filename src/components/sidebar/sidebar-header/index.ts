import Block, { BlockProps } from "../../../utils/block";
import template from "./sidebar-header.hbs";
import arrorRightIcon from "../../../asserts/arrow-right.svg";

export default class SidebarHeader extends Block {
  constructor(props: BlockProps = {}) {
    super("SidebarHeader", props);
  }

  protected init(): void {
    this.props.arrorRightIcon = arrorRightIcon;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
