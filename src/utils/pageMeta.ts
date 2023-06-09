import { ROUTER } from "./consts";
import { ProfileStruct } from "./types";

export const logonMeta = {
  login: {
    fields: [
      {
        name: "login",
        type: "text",
        label: "Логин",
      },
      {
        name: "password",
        type: "password",
        label: "Пароль",
      },
    ],
    submit: { text: "Авторизоваться" },
    subbutton: {
      href: ROUTER.REGISTER,
      text: "Нет аккаунта?",
    },
  },
  register: {
    fields: [
      {
        name: "email",
        type: "text",
        label: "Почта",
      },
      {
        name: "login",
        type: "text",
        label: "Логин",
      },
      {
        name: "first_name",
        type: "text",
        label: "Имя",
      },
      {
        name: "second_name",
        type: "text",
        label: "Фамилия",
      },
      {
        name: "phone",
        type: "tel",
        label: "Телефон",
      },
      {
        name: "password",
        type: "password",
        label: "Пароль",
      },
      {
        name: "passwordRepeat",
        type: "password",
        label: "Пароль (еще раз)",
      },
    ],
    submit: {
      text: "Зарегистрироваться",
    },
    subbutton: {
      href: ROUTER.LOGIN,
      text: "Войти",
    },
  },
};

export const profileMeta: Record<string, ProfileStruct> = {
  profile: {
    fields: [
      {
        name: "email",
        type: "text",
        label: "Почта",
        mode: "view",
      },
      {
        name: "login",
        type: "text",
        label: "Логин",
        mode: "view",
      },
      {
        name: "first_name",
        type: "text",
        label: "Имя",
        mode: "view",
      },
      {
        name: "second_name",
        type: "text",
        label: "Фамилия",
        mode: "view",
      },
      {
        name: "display_name",
        type: "text",
        label: "Имя в чате",
        mode: "view",
      },
      {
        name: "phone",
        type: "tel",
        label: "Телефон",
        mode: "view",
      },
    ],
    subbuttons: [
      {
        classes: "sub-button_13px",
        href: ROUTER.EDIT_PROFILE,
        text: "Изменить данные",
      },
      {
        classes: "sub-button_13px",
        href: ROUTER.EDIT_PASSWORD,
        text: "Изменить пароль",
      },
      {
        classes: "sub-button_13px sub-button_red",
        href: ROUTER.LOGIN,
        text: "Выйти",
      },
    ],
    saveButton: null,
  },
  editProfile: {
    fields: [
      {
        name: "email",
        type: "text",
        label: "Почта",
        mode: "edit",
      },
      {
        name: "login",
        type: "text",
        label: "Логин",
        mode: "edit",
      },
      {
        name: "first_name",
        type: "text",
        label: "Имя",
        mode: "edit",
      },
      {
        name: "second_name",
        type: "text",
        label: "Фамилия",
        mode: "edit",
      },
      {
        name: "display_name",
        type: "text",
        label: "Имя в чате",
        mode: "edit",
      },
      {
        name: "phone",
        type: "tel",
        label: "Телефон",
        mode: "edit",
      },
    ],
    subbuttons: [],
    saveButton: { text: "Сохранить" },
  },
  editPassword: {
    fields: [
      {
        name: "oldPassword",
        type: "password",
        label: "Старый пароль",
        mode: "edit",
      },
      {
        name: "newPassword",
        type: "password",
        label: "Новый пароль",
        mode: "edit",
      },
      {
        name: "newPasswordRepeat",
        type: "password",
        label: "Повторите новый пароль",
        mode: "edit",
      },
    ],
    subbuttons: [],
    saveButton: { text: "Сохранить" },
  },
};
