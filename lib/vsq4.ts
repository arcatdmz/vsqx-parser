import { Tempo, Track, Voice, MusicalPart, findVoice } from "./common";

export function parseVSQ4Voices(el: Element): Voice[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq4>vVoiceTable>vVoice")
  ) as Element[]).map(parseVoice);
}

function parseVoice(voice: Element): Voice {
  const vbs = parseInt(voice.querySelector("vVoice>bs").textContent);
  const vpc = parseInt(voice.querySelector("vVoice>pc").textContent);
  const name = voice.querySelector("vVoice>name").textContent;
  return { vbs, vpc, name };
}

export function parseVSQ4Tempos(el: Element): Tempo[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq4>masterTrack>tempo")
  ) as Element[]).map(parseTempo);
}

function parseTempo(tempo: Element): Tempo {
  const tick = parseInt(tempo.querySelector("t").textContent);
  const bpm = parseInt(tempo.querySelector("v").textContent);
  return {
    tick,
    bpm
  };
}

export function parseVSQ4Tracks(el: Element, voiceDb: Voice[]): Track[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq4>vsTrack")
  ) as Element[]).map(track => parseTrack(track, voiceDb));
}

function parseTrack(track: Element, voiceDb: Voice[]): Track {
  const no = parseInt(track.querySelector("vsTrack>tNo").textContent);
  const name = track.querySelector("vsTrack>name").textContent;
  const comment = track.querySelector("vsTrack>comment").textContent;
  const content = parseMusicalPart(
    track.querySelector("vsTrack>vsPart"),
    voiceDb
  );
  return { no, name, comment, content };
}

function parseMusicalPart(vsPart: Element, voiceDb: Voice[]): MusicalPart {
  const tick = parseInt(vsPart.querySelector("vsPart>t").textContent);
  const playTime = parseInt(
    vsPart.querySelector("vsPart>playTime").textContent
  );
  const vbs = parseInt(vsPart.querySelector("vsPart>singer>bs").textContent);
  const vpc = parseInt(vsPart.querySelector("vsPart>singer>pc").textContent);
  const singer = findVoice(voiceDb, vbs, vpc);
  // const name = vsPart.querySelector("vsPart>name").textContent;
  const comment = vsPart.querySelector("vsPart>comment").textContent;
  const notes = (Array.prototype.slice.call(
    vsPart.querySelectorAll("vsPart>note")
  ) as Element[]).map(parseNote);
  return { tick, playTime, singer, comment, notes };
}

function parseNote(n: Element) {
  const [tick, duration, note, velocity] = ["t", "dur", "n", "v"].map(key =>
    parseInt(n.querySelector(`note>${key}`).textContent)
  );
  const [lyric, phonemes] = ["y", "p"].map(
    key => n.querySelector(`note>${key}`).textContent
  );
  return { tick, duration, note, velocity, lyric, phonemes };
}
