import { authAPI } from "../api/authAPI";
import { hasError } from "../utils/errorHandler";
import { DispatchStateHandler, UserData } from "../utils/types";
import { logout } from "./authService";

export const initApp: DispatchStateHandler<null> = async (dispatch) => {
  try {
    const userDataResponse = await authAPI.getUserData();
    if (hasError(userDataResponse)) {
      dispatch(logout);
      return;
    }

    const userData = JSON.parse(userDataResponse.responseText) as UserData;
    dispatch({ userData: userData });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
};
