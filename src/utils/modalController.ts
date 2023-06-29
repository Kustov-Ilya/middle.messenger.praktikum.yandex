import Modal from "../components/common/modal-window";
import Block, { BlockChilds } from "../core/block";

export default function modalController(
  children: BlockChilds,
  dispatch: () => void,
  handler: (e: Event) => void,
  formSettings: Partial<{ title: string; field: Block; button: Block }>
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
      submit: (e: Event) => {
        e.preventDefault();
        handler(e);
        delete children.modal;
        dispatch();
      },
    },
  });
  dispatch();
}
