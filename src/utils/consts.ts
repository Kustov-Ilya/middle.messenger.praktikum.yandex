export const enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_CWU = "flow:component-will-unmount",
  FLOW_RENDER = "flow:render",
}

export const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const enum ROUTER {
  LOGIN = "/",
  NOT_FOUND = "/error/404",
  SERVER_ERROR = "/error/500",
  REGISTER = "/sign-up",
  CHATS = "/messenger",
  VIEW_PROFILE = "/settings",
  EDIT_PROFILE = "/settings/editProfile",
  EDIT_PASSWORD = "/settings/editPassword",
}

export const enum WS_EVENTS {
  OPEN = "open",
  CLOSE = "close",
  MESSAGE = "message",
  ERROR = "error",
}

export const API_ENDPOINT = "https://ya-praktikum.tech/api/v2";
export const WS_ENDPOINT = "wss://ya-praktikum.tech/ws/chats";
export const RESOURCES_URL = API_ENDPOINT + "/resources";
export const ROOT_QUERY = "#root";

export const PATTERNS = {
  name: {
    regex: /^[A-ZА-ЯЁ-][A-Za-zА-Яа-яёЁ-]+$/,
    error: "Первая буква - заглавная, возможно тире",
  },
  login: {
    regex: /^[A-Za-z][A-Za-z\d_-]{2,19}$/,
    error: "Должен начинаться с буквы, от 3 до 20 символов",
  },
  email: {
    regex: /^[A-Za-z\d-_.]+@[A-Za-z]+\.[A-Za-z]+$/,
    error: "Введите корректный почтовый адрес",
  },
  phone: {
    regex: /^\+?[\d]{10,15}$/,
    error: "Должно содержать от 10 до 15 цифр, может начинаться с +",
  },
  password: {
    regex: /^[A-Za-z\d]{8,40}$/,
    error: "Должно содержать от 8 до 40 символов",
  },
  display_name: {
    regex: /^[A-Za-z][A-Za-z\d_-]{2,19}$/,
    error: "Должен начинаться с буквы, от 3 до 20 символов",
  },
  capitalLetter: { regex: /[A-Z]/, error: "Должно содержать заглавную букву" },
  oneDigit: { regex: /\d/, error: "Должно содержать цифру" },
  message: { regex: /.+/, error: "Должно содержать символ" },
};

export const LoginFields = ["login", "password"] as const;
export const RegisterFields = [
  "first_name",
  "second_name",
  "login",
  "email",
  "password",
  "passwordRepeat",
  "phone",
] as const;

export const UserFields = [
  "id",
  "login",
  "first_name",
  "second_name",
  "display_name",
  "avatar",
  "phone",
  "email",
] as const;

export const UserDataField = [
  "second_name",
  "first_name",
  "login",
  "display_name",
  "phone",
  "email",
];
export const UpdatePasswordFields = [
  "oldPassword",
  "newPassword",
  "newPasswordRepeat",
] as const;
