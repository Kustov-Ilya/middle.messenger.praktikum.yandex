import Block, { BlockProps } from "../../utils/block";
import template from "./error-page.hbs";
import SubButton from "../../components/common/sub-button";

export default class ErrorPage extends Block {
  constructor(props: BlockProps = {}) {
    super("LogonPage", props);
  }

  protected init(): void {
    this.children.subbutton = new SubButton({
      href: "/chat",
      text: "Назад к чатам",
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
