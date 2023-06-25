import Block, { BlockProps } from "../../../core/block";
import template from "./upload-file-field.hbs";

export default class UploadFileField extends Block {
  constructor(props: BlockProps = {}) {
    super("CustomField", props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
