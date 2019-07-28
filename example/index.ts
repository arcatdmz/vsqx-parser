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
    self["vsqx"] = raw;
    delete result.data.raw;
    document.querySelector("pre").textContent = JSON.stringify(
      result,
      null,
      "  "
    );
    if (result.data.tracks) {
      const dl = document.querySelector("dl");
      result.data.tracks.forEach(track => {
        const dt = document.createElement("dt");
        dt.appendChild(document.createTextNode(`${track.no}:${track.name}`));
        const dd = document.createElement("dd");
        dd.appendChild(
          document.createTextNode(
            track.content.notes.map(note => note.lyric).join("")
          )
        );
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
    }
  });
  reader.readAsBinaryString(file);
  // Array.from(input.files).forEach(console.log.bind(console));
}
