import Block, { BlockProps, BlockEvents } from "../../../core/block";
import template from "./custom-field.hbs";
import { validation } from "../../../utils/validation";

export default class CustomField extends Block {
  constructor(props: BlockProps = {}) {
    super("CustomField", props);
  }

  protected init(): void {
    if (!this.props.value) this.props.value = "";

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
