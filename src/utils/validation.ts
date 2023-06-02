import Block from "./block";
import { patterns } from "./consts";

function checkRegexOnError(value: string, type: keyof typeof patterns) {
  return patterns[type].regex.test(value) ? "" : patterns[type].error;
}

export function validation(
  value: string,
  name: string,
  type: string
): { isValid: boolean; error: string } {
  let error = "";
  if (type == "password") {
    error =
      checkRegexOnError(value, "password") ||
      checkRegexOnError(value, "capitalLetter") ||
      checkRegexOnError(value, "oneDigit");
  } else if (["first_name", "second_name"].includes(name)) {
    error = checkRegexOnError(value, "name");
  } else if (
    name == "login" ||
    name == "email" ||
    name == "phone" ||
    name == "message" ||
    name == "display_name"
  ) {
    error = checkRegexOnError(value, name);
  }
  return { isValid: error.length == 0, error: error };
}

export function validationForm(fields: Block[]) {
  return fields.map((field) => {
    const target = field.element?.getElementsByTagName(
      "INPUT"
    )[0] as HTMLInputElement;
    const result = validation(target.value, target.name, target.type);

    field.setProps({
      helper: result.error,
    });

    return {
      ...result,
      name: target.name,
      value: target.value,
      type: target.type,
    };
  });
}
