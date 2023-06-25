import { WS_ENDPOINT, WS_EVENTS } from "../utils/consts";
import { cloneDeep } from "../utils/supportFuncs";
import Store from "./store";

const store = Store.Instance();

export default class WSTransport {
  private socket?: WebSocket;
  private pingInterval?: number;

  open(userId: number, chatId: number, token: string) {
    if (!this.pingInterval) {
      this.socket = new WebSocket(
        `${WS_ENDPOINT}/${userId}/${chatId}/${token}`
      );
      this.addListeners();
    }
  }

  close() {
    if (this.pingInterval) {
      store.set({ messageData: undefined });
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
      this.socket!.close();
    }
  }

  sendMessage(content: string | number, type: string) {
    this.socket!.send(JSON.stringify({ content: content, type: type }));
  }

  getOffsetMessages(offset = "0") {
    const body = JSON.stringify({ content: offset, type: "get old" });
    this.socket!.send(body);
  }

  private openListener() {
    setTimeout(this.getOffsetMessages.bind(this),50);

    this.pingInterval = setInterval(() => {
      this.socket!.send(JSON.stringify({ type: "ping" }));
    }, 10000);
  }

  private closeListener(e: CloseEvent) {
    this.removeListeners();
    if (!e.wasClean) {
      throw new Error("Обрыв соединения");
    }
  }

  private messagesListener(e: MessageEvent) {
    let data = JSON.parse(e.data);
    if (!Array.isArray(data)) {
      data = [data];
    }
    if (data instanceof Array) {
      data = data.filter(
        (mess) => mess.type == "message" || mess.type == "file"
      );

      if (data) {
        const { messageData } = store.getState();
        if (messageData) {
          store.set({ messageData: [...messageData, ...data] });
        } else {
          store.set({ messageData: cloneDeep(data.reverse()) });
        }
      }
    }
  }

  private errorListener(e: Event) {
    throw new Error(`${e}`);
  }

  private addListeners() {
    this.socket!.addEventListener(WS_EVENTS.OPEN, this.openListener.bind(this));
    this.socket!.addEventListener(
      WS_EVENTS.CLOSE,
      this.closeListener.bind(this)
    );
    this.socket!.addEventListener(
      WS_EVENTS.MESSAGE,
      this.messagesListener.bind(this)
    );
    this.socket!.addEventListener(
      WS_EVENTS.ERROR,
      this.errorListener.bind(this)
    );
  }

  private removeListeners() {
    this.socket!.removeEventListener(
      WS_EVENTS.OPEN,
      this.openListener.bind(this)
    );
    this.socket!.removeEventListener(
      WS_EVENTS.CLOSE,
      this.closeListener.bind(this)
    );
    this.socket!.removeEventListener(
      WS_EVENTS.MESSAGE,
      this.messagesListener.bind(this)
    );
    this.socket!.removeEventListener(
      WS_EVENTS.ERROR,
      this.errorListener.bind(this)
    );
  }
}
