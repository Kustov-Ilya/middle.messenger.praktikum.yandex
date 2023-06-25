import { Dispatch, HttpError } from "./types";

export function hasError(response: XMLHttpRequest) {
  return response.status >= 400;
}

export function checkError(
  response: XMLHttpRequest,
  dispatch: Dispatch,
  field: string
) {
  if (hasError(response)) {
    const reason = (JSON.parse(response.responseText) as HttpError).reason;
    dispatch({ isLoading: false, [field]: reason });
    return true;
  }
  return false;
}
