import Block, { BlockProps, BlockEvents } from "../../../core/block";
import { validation } from "../../../utils/validation";
import template from "./profile-field.hbs";

export default class ProfileField extends Block {
  constructor(props: BlockProps = {}) {
    super("ProfileField", props);
  }

  protected init(): void {
    this.props.readonly = this.props.mode == "view";

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).blur = this.onBlur.bind(this);
  }

  onBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    const result = validation(target.value, target.name, target.type);
    this.setProps({
      value: target.value,
      helper: result.error,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
