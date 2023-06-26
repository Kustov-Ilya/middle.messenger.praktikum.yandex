import { BlockProps } from "../core/block";
import Store from "../core/store";
import { isEqual, cloneDeep } from "./supportFuncs";
import { State } from "./types";

const store = Store.Instance();

export function withStore<T>(WrappedBlock: T, fieldNames: string[]) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock {
    constructor(props: BlockProps) {
      super({
        ...props,
        store: store,
        ...fieldNames.reduce((acc, fieldName) => {
          const value = store.getState()[fieldName as keyof State];
          acc[fieldName] =
            typeof value == "object" ? cloneDeep(value as object) : value;
          return acc;
        }, {} as Record<string, unknown>),
      });
    }

    onChangeStoreCallback(oldState: unknown, newState: unknown) {
      if (!isEqual(oldState, newState)) {
        // @ts-expect-error this is not typed
        this.setProps({
          store: store,
          ...fieldNames.reduce((acc, fieldName) => {
            const value = store.getState()[fieldName as keyof State];
            acc[fieldName] =
              typeof value == "object" ? cloneDeep(value as object) : value;
            return acc;
          }, {} as Record<string, unknown>),
        });
      }
    }

    componentDidMount(props: BlockProps) {
      super.componentDidMount(props);
      store.on("changed", this.onChangeStoreCallback.bind(this));
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      store.off("changed", this.onChangeStoreCallback.bind(this));
    }
  } as T;
}
