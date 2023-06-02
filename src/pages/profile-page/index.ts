import Block, { BlockProps, BlockEvents } from "../../utils/block";
import ProfileField from "../../components/common/profile-field";
import template from "./profile-page.hbs";
import MainButton from "../../components/common/main-button";
import SubButton from "../../components/common/sub-button";
import { profileMeta } from "../../utils/pageMeta";
import arrowForwardIcon from "../../asserts/arrow-forward.svg";
import profileLogo from "../../asserts/profile-logo.svg";
import { validationForm } from "../../utils/validation";
import CustomField from "../../components/common/custom-field";
import modalController from "../../utils/modalController";

export default class ProfilePage extends Block {
  constructor(props: BlockProps = { type: "profile" }) {
    super("ProfilePage", props);
  }

  protected init(): void {
    const { type } = this.props;
    const profileSettings = profileMeta[type as string];
    this.props.arrowForwardIcon = arrowForwardIcon;
    this.props.profileLogo = profileLogo;
    this.props.userName = "Валера";
    this.props.editPass = type == "editPassword";

    this.children.fields = profileSettings.fields.map(
      (fieldMeta) => new ProfileField(fieldMeta)
    );

    if (profileSettings?.saveButton) {
      this.children.saveButton = new MainButton(profileSettings.saveButton);
    }

    if (profileSettings) {
      this.children.subbuttons = profileSettings.subbuttons.map(
        (sbutMeta) => new SubButton(sbutMeta)
      );
    }

    if (!this.props.events) this.props.events = {};
    (this.props.events as BlockEvents).submit = this.onSubmit.bind(this);
    (this.props.events as BlockEvents).click = this.onClick.bind(this);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onClick(event: Event) {
    if (
      (event.target as HTMLElement).className.includes("profile__logo-overlay")
    ) {
      this.showModal();
    }
  }

  showModal() {
    const formSettings = {
      title: "Загрузите файл",
      field: new CustomField({ type: "file" }),
      button: new MainButton({
        text: "Добавить",
        events: {
          click: () => {
            delete this.children.modal;
            this.dispatchComponentDidMount();
          },
        },
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      formSettings
    );
  }

  onSubmit(e: Event) {
    const formClass = "profile__fields-block";

    if (!(e.target as HTMLElement).className.includes(formClass)) {
      return;
    }
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

    if (passwordsFields.length == 0) {
      // eslint-disable-next-line no-console
      console.log("Action: ChangeData");
      // eslint-disable-next-line no-console
      resultOfValidations.forEach((res) => console.log(res.name, res.value));
      return;
    }

    const error =
      passwordsFields[1].value != passwordsFields[2].value
        ? "Пароли не совпадают"
        : "";

    if (error) {
      fields[fields.length - 1].setProps({ helper: error });
      return;
    }
    // eslint-disable-next-line no-console
    console.log("Action: ChangePassword");
    // eslint-disable-next-line no-console
    resultOfValidations.forEach((res) => console.log(res.name, res.value));
  }
}
