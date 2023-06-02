import EventBus from "./eventBus";
import { nanoid } from "nanoid";
import { EVENTS } from "./consts";

export type BlockProps = Record<string, unknown>;
export type BlockChilds = Record<string, Block | Block[]>;
export type BlockEvents = Record<string, (evt: Event) => void>;

export default abstract class Block {
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: BlockProps };
  private eventBus: () => EventBus;
  protected props: BlockProps;
  protected children: BlockChilds;
  public _id = nanoid(6);

  constructor(tagName = "div", propsAndChildren: BlockProps = {}) {
    const { children, props } = this._getChildrenAndProps(propsAndChildren);
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _getChildrenAndProps(propsAndChildren: BlockProps): {
    children: BlockChilds;
    props: BlockProps;
  } {
    const children: BlockChilds = {};
    const props: BlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        value instanceof Array &&
        value.every((elem) => elem instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  protected _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  protected compile(
    template: (props: BlockProps) => string,
    props: BlockProps
  ): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        propsAndStubs[name] = component.map(
          (comp) => `<div data-id="${comp._id}"></div>`
        );
      } else {
        propsAndStubs[name] = `<div data-id="${component._id}"></div>`;
      }
    });

    const html = template(propsAndStubs);
    const temp = document.createElement("template");
    temp.innerHTML = html;

    const changeBlankToComponent = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component._id}"]`);

      if (stub) {
        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent()!);
      }
    };

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach((comp) => changeBlankToComponent(comp));
      } else {
        changeBlankToComponent(component);
      }
    });
    return temp.content;
  }

  private _init(): void {
    this._createResources();
    this.init();
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown): void {
    const response = this.componentDidUpdate(
      oldProps as BlockProps,
      newProps as BlockProps
    );
    if (!response) {
      return;
    }
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): boolean {
    // Because without this error on ts (unused vars)
    if (oldProps == newProps) {
      return true;
    }
    return true;
  }

  setProps(nextProps: BlockProps): void {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    this._removeEvents();
    this._element!.innerHTML = "";
    this._element!.append(block);
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    //eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, val) {
        target[prop as string] = val;
        self.eventBus().emit(EVENTS.FLOW_CDU, { ...target }, { [prop]: val });
        return true;
      },
      deleteProperty() {
        throw new Error("нет доступа");
      },
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as { events: BlockEvents };
    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName], true);
    });
  }

  private _addEvents() {
    const { events = {} } = this.props as { events: BlockEvents };

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName], true);
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show(): void {
    this.getContent()!.style.display = "block";
  }

  public hide(): void {
    this.getContent()!.style.display = "none";
  }
}
