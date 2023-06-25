import { chatAPI } from "../api/chatAPI";
import { checkError } from "../utils/errorHandler";
import { merge } from "../utils/supportFuncs";
import { AppState, ChatDataType, CreateChatReqData, Dispatch, TokenRespType, UsersChatReq } from "../utils/types";

export async function getChats(dispatch: Dispatch) {
  dispatch({ isLoading: true });
  const response = await chatAPI.getChats();
  if (checkError(response, dispatch, "chatError")) return;
  const chatsData = JSON.parse(response.responseText) as ChatDataType[];
  dispatch({ isLoading: false, chatsData: chatsData });
}

export async function createChat(
  dispatch: Dispatch,
  _state: AppState,
  action: CreateChatReqData
) {
  dispatch({ isLoading: true });
  const response = await chatAPI.createChat(action);
  if (checkError(response, dispatch, "chatError")) return;
  dispatch(getChats);
  dispatch({ isLoading: false });
}

export async function addAvatar(
  dispatch: Dispatch,
  _state: AppState,
  action: FormData
) {
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
}

export async function addUsers(
  dispatch: Dispatch,
  _state: AppState,
  action: UsersChatReq
) {
  const response = await chatAPI.addUsers(action);
  if (checkError(response, dispatch, "chatError")) return;
}

export async function deleteUsers(
  dispatch: Dispatch,
  _state: AppState,
  action: UsersChatReq
) {
  const response = await chatAPI.deleteUsers(action);
  if (checkError(response, dispatch, "chatError")) return;
}

export async function getToken(
  dispatch: Dispatch,
  _state: AppState,
  action: string
) {
  const response = await chatAPI.getChatToken(action);
  if (checkError(response, dispatch, "chatError")) return;
  const tokenResp = JSON.parse(response.responseText) as TokenRespType;
  dispatch({ chatToken: tokenResp.token });
}
