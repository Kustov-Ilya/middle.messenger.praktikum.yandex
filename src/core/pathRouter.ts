import Route from "./route";
import Block, { BlockProps } from "./block";
import { ROOT_QUERY, ROUTER } from "../utils/consts";

export default class Router {
  private static _instance: Router;
  private _rootQuery: string;
  private _history: History;
  private _currentRoute?: Route;
  private _routes: Route[];

  private constructor(rootQuery: string) {
    this._routes = [];
    this._history = window.history;
    this._rootQuery = rootQuery;
  }

  public static Instance() {
    return this._instance || (this._instance = new this(ROOT_QUERY));
  }

  use(
    pathname: string,
    block: unknown,
    props = {} as BlockProps,
    isRedirect?: () => boolean,
    redirectPath?: string
  ) {
    const route = new Route(
      pathname,
      block as Block,
      this._rootQuery,
      props,
      isRedirect,
      redirectPath ? () => this.go(redirectPath) : undefined
    );
    this._routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(document.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) return;

    this._currentRoute?.leave();
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this._history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  getRoute(pathname: string) {
    const resRoute = this._routes.find((route) => route.match(pathname));
    if (resRoute) return resRoute;
    this._history.replaceState("", "", ROUTER.NOT_FOUND);
    return this._routes.find((route) => route.match(ROUTER.NOT_FOUND));
  }
}
