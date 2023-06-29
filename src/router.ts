import Router from "./core/pathRouter";
import Store from "./core/store";
import ChatPage from "./pages/chat-page";
import LogonPage from "./pages/logon-page";
import ProfilePage from "./pages/profile-page";
import ErrorPage from "./pages/error-page";
import { ROUTER } from "./utils/consts";

export const router = Router.Instance();

export default function initRouter(store: Store) {
  router
    .use(
      ROUTER.LOGIN,
      LogonPage,
      { type: "login" },
      () => !store.getState().userData,
      ROUTER.CHATS
    )
    .use(ROUTER.NOT_FOUND, ErrorPage, {
      error: "404",
      description: "Не туда попали",
    })
    .use(ROUTER.SERVER_ERROR, ErrorPage, {
      error: "500",
      description: "Мы уже чиним",
    })
    .use(
      ROUTER.REGISTER,
      LogonPage,
      { type: "register" },
      () => !store.getState().userData,
      ROUTER.CHATS
    )
    .use(
      ROUTER.CHATS,
      ChatPage,
      {},
      () => Boolean(store.getState().userData),
      ROUTER.LOGIN
    )
    .use(
      ROUTER.VIEW_PROFILE,
      ProfilePage,
      { type: "profile" },
      () => Boolean(store.getState().userData),
      ROUTER.LOGIN
    )
    .use(
      ROUTER.EDIT_PROFILE,
      ProfilePage,
      { type: "editProfile" },
      () => Boolean(store.getState().userData),
      ROUTER.LOGIN
    )
    .use(
      ROUTER.EDIT_PASSWORD,
      ProfilePage,
      { type: "editPassword" },
      () => Boolean(store.getState().userData),
      ROUTER.LOGIN
    )
    .start();
}
