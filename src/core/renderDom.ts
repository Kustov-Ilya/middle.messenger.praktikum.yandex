import Block from "./block";

export default function renderDOM(page: Block, path = "root") {
  const root = document.querySelector(path);
  if (root) {
    root.innerHTML = "";
    root.appendChild(page.getContent()!);
  }
}
