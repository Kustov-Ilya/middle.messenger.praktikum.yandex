import Block, { BlockProps, BlockEvents } from "../../../utils/block";
import template from "./custom-field.hbs";
import { validation } from "../../../utils/validation";

export default class CustomField extends Block {
  private value: string;
  constructor(props: BlockProps = {}) {
    super("CustomField", props);
    this.value = "";
  }

  protected init(): void {
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
