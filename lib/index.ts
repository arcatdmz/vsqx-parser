import { VSQXParseResult, Tempo } from "./common";
import { parseVSQ3Tempos, parseVSQ3Tracks, parseVSQ3Voices } from "./vsq3";
import { parseVSQ4Tempos, parseVSQ4Voices, parseVSQ4Tracks } from "./vsq4";

const vsq3NS = "http://www.yamaha.co.jp/vocaloid/schema/vsq3/";
const vsq4NS = "http://www.yamaha.co.jp/vocaloid/schema/vsq4/";

export * from "./common";

export function parse(xml: string): VSQXParseResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  if (isParseError(doc)) {
    return { error: "XML parse error", data: null };
  }
  if (
    doc.children.length <= 0 ||
    (doc.children[0].namespaceURI !== vsq3NS &&
      doc.children[0].namespaceURI !== vsq4NS) ||
    (doc.children[0].tagName !== "vsq3" && doc.children[0].tagName !== "vsq4")
  ) {
    return { error: "Unsupported VSQX format", data: null };
  }
  const raw = doc.children[0];
  const venderEl =
      raw.querySelector("vsq3>vender") || raw.querySelector("vsq4>vender"),
    vender = venderEl && venderEl.textContent;
  const versionEl =
      raw.querySelector("vsq3>version") || raw.querySelector("vsq4>version"),
    version = versionEl && versionEl.textContent;
  const v3 = doc.children[0].tagName === "vsq3";
  const resolution = parseInt(
    raw.querySelector(
      v3 ? "vsq3>masterTrack>resolution" : "vsq4>masterTrack>resolution"
    ).textContent
  );
  const tempos = v3 ? parseVSQ3Tempos(raw) : parseVSQ4Tempos(raw);
  const voices = v3 ? parseVSQ3Voices(raw) : parseVSQ4Voices(raw);
  const tracks = v3
    ? parseVSQ3Tracks(raw, voices)
    : parseVSQ4Tracks(raw, voices);
  return {
    data: {
      vender,
      version,
      resolution,
      voices,
      tempos,
      tracks,
      raw
    }
  };
}

export class VSQXParseResultUtil {
  constructor(private result: VSQXParseResult) {}
  public get data() {
    return this.result.data;
  }

  public tickToTime(tick: number) {
    const { tempos, resolution } = this.result.data;
    let time = 0;
    for (const tempo of tempos) {
      const tpt = timePerTick(tempo, resolution);
      if (tempo.duration !== -1 && tempo.tick + tempo.duration < tick) {
        time += tempo.duration * tpt;
      } else {
        time += (tick - tempo.tick) * tpt;
        break;
      }
    }
    return time;
  }
}

export function timePerTick(tempo: Tempo, resolution: number) {
  const bpm = tempo.bpm / 100;
  return (60 * 1000) / bpm / resolution;
}

// https://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
function isParseError(parsedDocument: Document) {
  const parser = new DOMParser(),
    errorneousParse = parser.parseFromString("<", "text/xml"),
    parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0]
      .namespaceURI;
  if (parsererrorNS === "http://www.w3.org/1999/xhtml") {
    return parsedDocument.getElementsByTagName("parsererror").length > 0;
  }
  return (
    parsedDocument.getElementsByTagNameNS(parsererrorNS, "parsererror").length >
    0
  );
}
