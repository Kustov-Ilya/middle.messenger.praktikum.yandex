import Block, { BlockProps, BlockEvents } from "../../../utils/block";
import { validation } from "../../../utils/validation";
import template from "./profile-field.hbs";

export default class ProfileField extends Block {
  private value = "";

  constructor(props: BlockProps = {}) {
    super("ProfileField", props);
  }

  protected init(): void {
    this.props.readonly = this.props.mode == "view";

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).blur = this.onBlur.bind(this);
    (this.props.events as BlockEvents).keyup = this.onKeyup.bind(this);
  }

  onKeyup(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  onBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    const result = validation(target.value, target.name, target.type);
    this.setProps({
      helper: result.error,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, value: this.value });
  }
}
