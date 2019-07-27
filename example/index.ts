import { parse } from "../";

const input = document.querySelector("input") as HTMLInputElement;
input.addEventListener("change", handleFileSelect);

function handleFileSelect() {
  if (input.files.length <= 0) return;
  const file = input.files.item(0);
  const reader = new FileReader();
  reader.addEventListener("load", _e => {
    const result = parse(reader.result as string);
    const raw = result.data.raw;
    self["vsq4"] = raw;
    delete result.data.raw;
    document.querySelector("pre").textContent = JSON.stringify(result);
  });
  reader.readAsBinaryString(file);
  // Array.from(input.files).forEach(console.log.bind(console));
}
