export const enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const patterns = {
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
