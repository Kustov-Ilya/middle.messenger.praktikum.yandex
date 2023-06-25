import Block, { BlockProps } from "../../core/block";
import template from "./error-page.hbs";
import SubButton from "../../components/common/sub-button";
import { ROUTER } from "../../utils/consts";

export default class ErrorPage extends Block {
  constructor(props: BlockProps = {}) {
    super("LogonPage", props);
  }

  protected init(): void {
    this.children.subbutton = new SubButton({
      href: ROUTER.CHATS,
      text: "Назад к чатам",
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
