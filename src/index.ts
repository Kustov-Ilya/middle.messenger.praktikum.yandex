import "./styles/styles.pcss";
import { initApp } from "./services/initApp";
import Store from "./core/store";
import initRouter from "./router";
import { AppState } from "./utils/types";

const store = Store.Instance();

window.addEventListener("DOMContentLoaded", () => {
  store.on("changed", (prevState, nextState) => {
    if (
      !(prevState as AppState).appIsInited &&
      (nextState as AppState).appIsInited
    ) {
      initRouter(store);
    }
  });

  store.dispatch(initApp);
});
