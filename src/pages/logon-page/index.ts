import Block, { BlockProps, BlockEvents } from "../../utils/block";
import CustomField from "../../components/common/custom-field";
import template from "./logon-page.hbs";
import MainButton from "../../components/common/main-button";
import SubButton from "../../components/common/sub-button";
import { logonMeta } from "../../utils/pageMeta";
import { validationForm } from "../../utils/validation";

export default class LogonPage extends Block {
  constructor(props: BlockProps = { type: "login" }) {
    super("LogonPage", props);
  }

  protected init(): void {
    const { type } = this.props;
    const logonSettings = logonMeta[type as string];

    this.props.login = type == "login";

    this.children.fields = logonSettings.fields.map(
      (fieldMeta) => new CustomField(fieldMeta)
    );
    this.children.submit = new MainButton(logonSettings.submit);
    this.children.subbutton = new SubButton(logonSettings.subbutton);

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).submit = this.onSubmit.bind(this);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const fields = this.children.fields as Block[];
    const resultOfValidations = validationForm(fields);

    if (!resultOfValidations.every((res) => res.isValid)) {
      // eslint-disable-next-line no-console
      console.log("error on fields");
      return;
    }

    const passwordsFields = resultOfValidations.filter(
      (res) => res.type === "password"
    );

    if (passwordsFields.length <= 1) {
      // eslint-disable-next-line no-console
      console.log("Action: login");
      // eslint-disable-next-line no-console
      resultOfValidations.forEach((res) => console.log(res.name, res.value));
      return;
    }

    const error =
      passwordsFields[0].value != passwordsFields[1].value
        ? "Пароли не совпадают"
        : "";

    if (error) {
      fields[fields.length - 1].setProps({ helper: error });
      return;
    }

    // eslint-disable-next-line no-console
    console.log("Action: registration");
    // eslint-disable-next-line no-console
    resultOfValidations.forEach((res) => console.log(res.name, res.value));
  }
}
