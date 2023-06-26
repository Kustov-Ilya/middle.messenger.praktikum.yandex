import { chatAPI } from "../api/chatAPI";
import { checkError } from "../utils/errorHandler";
import { merge } from "../utils/supportFuncs";
import {
  ChatDataType,
  CreateChatReqData,
  DeleteChatReqData,
  DispatchStateHandler,
  TokenRespType,
  UsersChatReq,
} from "../utils/types";

export const getChats: DispatchStateHandler<null> = async (dispatch) => {
  try {
    dispatch({ isLoading: true });
    const response = await chatAPI.getChats();
    if (checkError(response, dispatch, "chatError")) return;
    const chatsData = JSON.parse(response.responseText) as ChatDataType[];
    dispatch({ isLoading: false, chatsData: chatsData });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const createChat: DispatchStateHandler<CreateChatReqData> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });
    const response = await chatAPI.createChat(action);
    if (checkError(response, dispatch, "chatError")) return;
    dispatch(getChats);
    dispatch({ isLoading: false });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const deleteChat: DispatchStateHandler<DeleteChatReqData> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });
    const response = await chatAPI.deleteChat(action);
    if (checkError(response, dispatch, "chatError")) return;
    dispatch(getChats);
    dispatch({ isLoading: false, selectedChat: undefined });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const addAvatar: DispatchStateHandler<FormData> = async (
  dispatch,
  _state,
  action
) => {
  try {
    const response = await chatAPI.addAvatar(action);
    if (checkError(response, dispatch, "chatError")) return;
    const selectedChatData = JSON.parse(
      response.responseText
    ) as Partial<ChatDataType>;
    dispatch({
      selectedChat: merge(
        _state.selectedChat as Record<string, unknown>,
        selectedChatData as Record<string, unknown>
      ) as ChatDataType,
    });
    dispatch(getChats);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const addUsers: DispatchStateHandler<UsersChatReq> = async (
  dispatch,
  _state,
  action
) => {
  try {
    const response = await chatAPI.addUsers(action);
    if (checkError(response, dispatch, "chatError")) return;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const deleteUsers: DispatchStateHandler<UsersChatReq> = async (
  dispatch,
  _state,
  action
) => {
  try {
    const response = await chatAPI.deleteUsers(action);
    if (checkError(response, dispatch, "chatError")) return;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const getToken: DispatchStateHandler<string> = async (
  dispatch,
  _state,
  action
) => {
  try {
    const response = await chatAPI.getChatToken(action);
    if (checkError(response, dispatch, "chatError")) return;
    const tokenResp = JSON.parse(response.responseText) as TokenRespType;
    dispatch({ chatToken: tokenResp.token });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
