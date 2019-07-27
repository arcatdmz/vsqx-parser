import { hello } from "../";
hello();

const input = document.querySelector("input") as HTMLInputElement;
input.addEventListener("change", handleFileSelect);

function handleFileSelect() {
  if (input.files.length <= 0) return;
  const file = input.files.item(0);
  // Array.from(input.files).forEach(console.log.bind(console));
}
