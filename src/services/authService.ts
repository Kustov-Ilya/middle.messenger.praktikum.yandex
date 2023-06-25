import { authAPI } from "../api/authAPI";
import { checkError, hasError } from "../utils/errorHandler";
import { router } from "../router";
import { ROUTER } from "../utils/consts";
import {
  AppState,
  Dispatch,
  LoginReqData,
  RegisterReqData,
  UserData,
} from "../utils/types";

export async function login(
  dispatch: Dispatch,
  _state: AppState,
  action: LoginReqData
) {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);
  if (checkError(response, dispatch, "logonError")) return;

  const userDataResponse = await authAPI.getUserData();
  if (hasError(userDataResponse)) {
    dispatch(logout);
    return;
  }

  const userData = JSON.parse(userDataResponse.responseText) as UserData;
  dispatch({ isLoading: false, userData: userData });
  router.go(ROUTER.CHATS);
}

export async function logout(dispatch: Dispatch) {
  await authAPI.logout();
  dispatch({ userData: undefined });
  router.go(ROUTER.LOGIN);
}

export async function register(
  dispatch: Dispatch,
  _state: AppState,
  action: RegisterReqData
) {
  dispatch({ isLoading: true });
  const response = await authAPI.register(action);
  if (checkError(response, dispatch, "logonError")) return;
  const userDataResponse = await authAPI.getUserData();
  if (hasError(userDataResponse)) {
    dispatch(logout);
    return;
  }

  const userData = JSON.parse(userDataResponse.responseText) as UserData;
  dispatch({ isLoading: false, userData: userData });
  router.go(ROUTER.CHATS);
}
