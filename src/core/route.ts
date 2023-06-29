import { isEqual } from "../utils/supportFuncs";
import Block, { BlockProps } from "./block";
import renderDOM from "./renderDom";

export default class Route {
  private _pathname: string;
  private _blockClass: Block;
  private _block?: Block;
  private _rootQuery: string;
  private _componentProps: BlockProps;
  private _isRedirect?: () => boolean;
  private _redirect?: () => void;

  constructor(
    pathname: string,
    view: Block,
    rootQuery: string,
    componentProps: BlockProps,
    isRedirect?: () => boolean,
    redirect?: () => void
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._componentProps = componentProps;
    this._isRedirect = isRedirect;
    this._redirect = redirect;
    this._rootQuery = rootQuery;
  }


  leave() {
    if (this._block) {
      this._block.destroy();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  needRedirect() {
    if (this._isRedirect) {
      return this._isRedirect();
    }
    return true;
  }

  render() {
    if (!this.needRedirect()) {
      if (this._redirect) {
        this._redirect();
      } else {
        throw new Error(`No redirect function for path ${this._pathname}`);
      }
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._block = new this._blockClass({
      ...this._componentProps,
    });
    renderDOM(this._block!, this._rootQuery);
  }
}
