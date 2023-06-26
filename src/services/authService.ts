import { authAPI } from "../api/authAPI";
import { checkError, hasError } from "../utils/errorHandler";
import { router } from "../router";
import { ROUTER } from "../utils/consts";
import {
  DispatchStateHandler,
  LoginReqData,
  RegisterReqData,
  UserData,
} from "../utils/types";

export const login: DispatchStateHandler<LoginReqData> = async (
  dispatch,
  _state,
  action
) => {
  try {
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
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const logout: DispatchStateHandler<RegisterReqData> = async (
  dispatch
) => {
  try {
    await authAPI.logout();
    dispatch({ userData: undefined });
    router.go(ROUTER.LOGIN);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const register: DispatchStateHandler<RegisterReqData> = async (
  dispatch,
  _state,
  action
) => {
  try {
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
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
