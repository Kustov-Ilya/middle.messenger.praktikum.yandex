import EventBus from "./eventBus";
import { cloneDeep, merge } from "../utils/supportFuncs";
import { Action, AppState } from "../utils/types";

export default class Store extends EventBus {
  private state: AppState = {} as AppState;

  private static _instance: Store;

  private constructor(initState: AppState) {
    super();
    this.state = initState;
  }

  public static Instance() {
    return this._instance || (this._instance = new this({}));
  }

  public getState() {
    return this.state;
  }

  public set(newState: AppState) {
    const prevState = cloneDeep(this.state);
    merge(this.state, newState);
    this.emit("changed", prevState, this.state);
  }

  public dispatch(nextStateOrAction: AppState | Action, payload?: unknown) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set(nextStateOrAction);
    }
  }
}
