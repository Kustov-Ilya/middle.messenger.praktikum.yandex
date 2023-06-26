import { checkError } from "../utils/errorHandler";
import { router } from "../router";
import { ROUTER } from "../utils/consts";
import {
  DispatchStateHandler,
  UpdatePasswordReqData,
  UserData,
  UserDataType,
} from "../utils/types";
import { userAPI } from "../api/userAPI";

export const updateProfile: DispatchStateHandler<UserDataType> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });
    const response = await userAPI.updateProfile(action);
    if (checkError(response, dispatch, "userError")) return;
    const userData = JSON.parse(response.responseText) as UserData;
    dispatch({ userData: userData });
    router.go(ROUTER.VIEW_PROFILE);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const updatePassword: DispatchStateHandler<
  UpdatePasswordReqData
> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });
    const response = await userAPI.updatePassword(action);
    if (checkError(response, dispatch, "userError")) return;
    router.go(ROUTER.VIEW_PROFILE);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const updateAvatar: DispatchStateHandler<FormData> = async (
  dispatch,
  _state,
  action
) => {
  try {
    const response = await userAPI.updateAvatar(action);
    if (checkError(response, dispatch, "userError")) return;
    const userData = JSON.parse(response.responseText) as UserData;
    dispatch({ userData: userData });
    router.go(ROUTER.VIEW_PROFILE);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
