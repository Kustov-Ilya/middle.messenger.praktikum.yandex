import Modal from "../components/common/modal-window";
import Block, { BlockChilds } from "./block";

export default function modalController(
  children: BlockChilds,
  dispatch: () => void,
  formSettings: { title: string; field: Block; button: Block }
) {
  children.modal = new Modal({
    ...formSettings,
    events: {
      click: (e: Event) => {
        if ((e.target as HTMLElement).className != "modal-window") {
          return;
        }
        delete children.modal;
        dispatch();
      },
    },
  });
  dispatch();
}
