import Block, { BlockProps, BlockEvents } from "../../core/block";
import CustomField from "../../components/common/custom-field";
import template from "./logon-page.hbs";
import MainButton from "../../components/common/main-button";
import SubButton from "../../components/common/sub-button";
import { logonMeta } from "../../utils/pageMeta";
import { validationForm } from "../../utils/validation";
import { login, register } from "../../services/authService";
import Store from "../../core/store";
import { withStore } from "../../utils/withStore";
import { isType } from "../../utils/supportFuncs";
import Router from "../../core/pathRouter";
import { LoginReqData, RegisterReqData } from "../../utils/types";
import { LoginFields, RegisterFields } from "../../utils/consts";

const router = Router.Instance();
const store = Store.Instance();

function loginSubmit(loginFields: Block[]) {
  const resultOfValidations = validationForm(loginFields);

  if (!Object.values(resultOfValidations).every((res) => res.isValid)) return;
  const reqData = Object.keys(resultOfValidations).reduce((acc, fieldName) => {
    acc[fieldName] = resultOfValidations[fieldName].value;
    return acc;
  }, {} as Record<string, string>);
  if (isType<LoginReqData>(reqData, LoginFields)) {
    store.dispatch(login, reqData);
  }
}

function registerSubmit(registerFields: Block[]) {
  const resultOfValidations = validationForm(registerFields);

  if (!Object.values(resultOfValidations).every((res) => res.isValid)) return;
  const reqData = Object.keys(resultOfValidations).reduce((acc, fieldName) => {
    acc[fieldName] = resultOfValidations[fieldName].value;
    return acc;
  }, {} as Record<string, string>);
  if (isType<RegisterReqData>(reqData, RegisterFields)) {
    const error =
      reqData.password != reqData.passwordRepeat ? "Пароли не совпадают" : "";
    if (error) {
      registerFields[registerFields.length - 1].setProps({ helper: error });
      return;
    }
    store.dispatch(register, reqData);
  }
}

function onClick(e: Event) {
  if ((e.target as HTMLElement).tagName != "A") {
    return;
  }
  e.preventDefault();
  const pathname = (e.target as HTMLAnchorElement).pathname;
  router.go(pathname);
}

class LogonPage extends Block {
  constructor(props: BlockProps = { type: "login" }) {
    super("LogonPage", props);
  }

  protected init(): void {
    const type = this.props.type as string;
    if (type in logonMeta) {
      const logonSettings = logonMeta[type as keyof typeof logonMeta];
      this.props.login = type == "login";
      this.children.fields = logonSettings.fields.map(
        (fieldMeta) => new CustomField(fieldMeta)
      );
      this.children.submit = new MainButton(logonSettings.submit);
      this.children.subbutton = new SubButton(logonSettings.subbutton);

      if (!this.props.events) this.props.events = {};
      (this.props.events as BlockEvents).submit = this.onSubmit.bind(this);
      (this.props.events as BlockEvents).click = onClick;
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const fields = this.children.fields as Block[];

    if (this.props.type == "login") {
      loginSubmit(fields);
    } else if (this.props.type == "register") {
      registerSubmit(fields);
    }
  }
}

export default withStore(LogonPage, ["userData"]);
