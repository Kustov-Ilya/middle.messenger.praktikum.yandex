import { checkError } from "../utils/errorHandler";
import { router } from "../router";
import { ROUTER } from "../utils/consts";
import {
  AppState,
  Dispatch,
  UpdatePasswordReqData,
  UserData,
  UserDataType,
} from "../utils/types";
import { userAPI } from "../api/userAPI";

export async function updateProfile(
  dispatch: Dispatch,
  _state: AppState,
  action: UserDataType
) {
  dispatch({ isLoading: true });
  const response = await userAPI.updateProfile(action);
  if (checkError(response, dispatch, "userError")) return;
  const userData = JSON.parse(response.responseText) as UserData;
  dispatch({ userData: userData });
  router.go(ROUTER.VIEW_PROFILE);
}

export async function updatePassword(
  dispatch: Dispatch,
  _state: AppState,
  action: UpdatePasswordReqData
) {
  dispatch({ isLoading: true });
  const response = await userAPI.updatePassword(action);
  if (checkError(response, dispatch, "userError")) return;
  router.go(ROUTER.VIEW_PROFILE);
}

export async function updateAvatar(
  dispatch: Dispatch,
  _state: AppState,
  action: FormData
) {
  const response = await userAPI.updateAvatar(action);
  if (checkError(response, dispatch, "userError")) return;
  const userData = JSON.parse(response.responseText) as UserData;
  dispatch({ userData: userData });
  router.go(ROUTER.VIEW_PROFILE);
}
