import Block, { BlockProps, BlockEvents } from "../../core/block";
import { RESOURCES_URL } from "../../utils/consts";
import ProfileField from "../../components/common/profile-field";
import template from "./profile-page.hbs";
import MainButton from "../../components/common/main-button";
import SubButton from "../../components/common/sub-button";
import { profileMeta } from "../../utils/pageMeta";
import arrowForwardIcon from "../../asserts/arrow-forward.svg";
import profileLogo from "../../asserts/profile-logo.svg";
import { validationForm } from "../../utils/validation";
import modalController from "../../utils/modalController";
import { router } from "../../router";
import { withStore } from "../../utils/withStore";
import Store from "../../core/store";
import { logout } from "../../services/authService";
import {
  updatePassword,
  updateProfile,
  updateAvatar,
} from "../../services/profileService";
import { isType } from "../../utils/supportFuncs";
import UploadFileField from "../../components/common/upload-file-field";
import {
  ROUTER,
  UpdatePasswordFields,
  UserDataField,
} from "../../utils/consts";
import {
  UpdatePasswordReqData,
  UserData,
  UserDataType,
} from "../../utils/types";

const store = Store.Instance();

function updatePasswordSubmit(fields: Block[]) {
  const resultOfValidations = validationForm(fields);

  if (!Object.values(resultOfValidations).every((res) => res.isValid)) return;
  const reqData = Object.keys(resultOfValidations).reduce((acc, fieldName) => {
    acc[fieldName] = resultOfValidations[fieldName].value;
    return acc;
  }, {} as Record<string, string>);

  if (isType<UpdatePasswordReqData>(reqData, UpdatePasswordFields)) {
    const error =
      reqData.newPassword != reqData.newPasswordRepeat
        ? "Пароли не совпадают"
        : "";
    if (error) {
      fields[fields.length - 1].setProps({ helper: error });
      return;
    }
    store.dispatch(updatePassword, reqData);
  }
}

function updateProfileSubmit(fields: Block[]) {
  const resultOfValidations = validationForm(fields);

  if (!Object.values(resultOfValidations).every((res) => res.isValid)) return;
  const reqData = Object.keys(resultOfValidations).reduce((acc, fieldName) => {
    acc[fieldName] = resultOfValidations[fieldName].value;
    return acc;
  }, {} as Record<string, string>);
  if (isType<UserDataType>(reqData, UserDataField)) {
    store.dispatch(updateProfile, reqData);
  }
}

function handler(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  store.dispatch(updateAvatar, formData);
}

class ProfilePage extends Block {
  constructor(props: BlockProps = { type: "profile" }) {
    super("ProfilePage", props);
  }

  protected init(): void {
    const { type } = this.props;
    const profileSettings = profileMeta[type as string];
    this.props.arrowForwardIcon = arrowForwardIcon;
    this.props.profileLogo = profileLogo;
    this.props.editPass = type == "editPassword";
    this.props.backToChats = ROUTER.CHATS;
    this.props.resourceURL = RESOURCES_URL;

    const userData = this.props.userData as UserData;
    this.children.fields = profileSettings.fields.map((fieldMeta) => {
      if (userData && fieldMeta.name) {
        const value = userData[fieldMeta.name as keyof UserData];
        return new ProfileField({ ...fieldMeta, value: value });
      }
      return new ProfileField(fieldMeta);
    });

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

  protected componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): boolean {
    return super.componentDidUpdate(
      oldProps.userData as UserData,
      newProps.userData as UserData
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onClick(e: Event) {
    let classList = (e.target as HTMLElement).className;
    classList = classList.concat(
      (e.target as HTMLElement).parentElement!.className
    );
    if (classList.includes("profile__logo-overlay")) {
      this.showModal();
    } else if ((e.target as HTMLElement).tagName == "A") {
      e.preventDefault();
      const pathname = (e.target as HTMLAnchorElement).pathname;
      if (pathname == ROUTER.LOGIN) {
        (this.props.store as Store).dispatch(logout);
      } else {
        router.go(pathname);
      }
    } else if (classList.includes("profile__back-button")) {
      e.preventDefault();
      router.go(ROUTER.CHATS);
    }
  }

  showModal() {
    const formSettings = {
      title: "Загрузите файл",
      field: new UploadFileField({ name: "avatar" }),
      button: new MainButton({
        text: "Добавить",
      }),
    };

    modalController(
      this.children,
      this.dispatchComponentDidMount.bind(this),
      handler,
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

    if (this.props.type == "editProfile") {
      updateProfileSubmit(fields);
    } else if (this.props.type == "editPassword") {
      updatePasswordSubmit(fields);
    }
  }
}

export default withStore(ProfilePage, ["userData"]);
