import Block from "./utils/block";
import LogonPage from "./pages/logon-page";
import ProfilePage from "./pages/profile-page";
import ErrorPage from "./pages/error-page";
import ChatPage from "./pages/chat-page";
import HomePage from "./pages/home-page";
import renderDOM from "./utils/renderDom";

const pages: Record<string, Block> = {
  "/login": new LogonPage({ type: "login" }),
  "/register": new LogonPage({ type: "register" }),
  "/profile": new ProfilePage({ type: "profile" }),
  "/profile/editProfile": new ProfilePage({ type: "editProfile" }),
  "/profile/editPassword": new ProfilePage({ type: "editPassword" }),
  "/error/404": new ErrorPage({ error: "404", description: "Не туда попали" }),
  "/error/500": new ErrorPage({ error: "404", description: "Мы уже чиним" }),
  "/chat": new ChatPage(),
  "/": new HomePage(),
};

function selectPage() {
  if (Object.keys(pages).includes(window.location.pathname)) {
    renderDOM(pages[window.location.pathname]);
  } else {
    window.history.replaceState(null, "", "/error/404");
    renderDOM(pages["error404Page"]);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  selectPage();

  window.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).tagName != "A") {
      return;
    }
    e.preventDefault();
    const href = (e.target as HTMLAnchorElement).href;
    window.history.pushState(null, "", href);
    selectPage();
  });

  window.addEventListener("popstate", () => {
    selectPage();
  });
});
