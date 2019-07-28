import { parse, VSQXParseResultUtil } from "../";

const input = document.querySelector("input") as HTMLInputElement;
input.addEventListener("change", handleFileSelect);

function handleFileSelect() {
  if (input.files.length <= 0) return;
  const file = input.files.item(0);
  const reader = new FileReader();
  reader.addEventListener("load", _e => {
    const result = parse(reader.result as string);

    // print error
    if (result.error) {
      console.error(result.error);
      return;
    }

    // store result util in a global variable
    const util = new VSQXParseResultUtil(result);
    self["util"] = util;

    // store raw DOM tree in a global variable
    const raw = result.data.raw;
    self["vsqx"] = raw;
    delete result.data.raw;

    // print result
    document.querySelector("pre").textContent = JSON.stringify(
      result,
      null,
      "  "
    );

    // print track info
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
  });
  reader.readAsText(file);
  // Array.from(input.files).forEach(console.log.bind(console));
}
