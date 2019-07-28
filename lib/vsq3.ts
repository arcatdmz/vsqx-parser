import { Tempo, Track, Voice, MusicalPart, findVoice } from "./common";

export function parseVSQ3Voices(el: Element): Voice[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq3>vVoiceTable>vVoice")
  ) as Element[]).map(parseVoice);
}

function parseVoice(voice: Element): Voice {
  const vbs = parseInt(voice.querySelector("vVoice>vBS").textContent);
  const vpc = parseInt(voice.querySelector("vVoice>vPC").textContent);
  const name = voice.querySelector("vVoice>vVoiceName").textContent;
  return { vbs, vpc, name };
}

export function parseVSQ3Tempos(el: Element): Tempo[] {
  const tempos = (Array.prototype.slice.call(
    el.querySelectorAll("vsq3>masterTrack>tempo")
  ) as Element[]).map(parseTempo);
  tempos.forEach((tempo, i) => {
    if (i < tempos.length - 1) {
      tempo.duration = tempos[i + 1].tick - tempo.tick;
    }
  });
  return tempos;
}

function parseTempo(tempo: Element): Tempo {
  const tick = parseInt(tempo.querySelector("tempo>posTick").textContent);
  const duration = -1;
  const bpm = parseInt(tempo.querySelector("tempo>bpm").textContent);
  return {
    tick,
    duration,
    bpm
  };
}

export function parseVSQ3Tracks(el: Element, voiceDb: Voice[]): Track[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq3>vsTrack")
  ) as Element[]).map(track => parseTrack(track, voiceDb));
}

function parseTrack(track: Element, voiceDb: Voice[]): Track {
  const no = parseInt(track.querySelector("vsTrack>vsTrackNo").textContent);
  const name = track.querySelector("vsTrack>trackName").textContent;
  const comment = track.querySelector("vsTrack>comment").textContent;
  const content = parseMusicalPart(
    track.querySelector("vsTrack>musicalPart"),
    voiceDb
  );
  return { no, name, comment, content };
}

function parseMusicalPart(musicalPart: Element, voiceDb: Voice[]): MusicalPart {
  const tick = parseInt(
    musicalPart.querySelector("musicalPart>posTick").textContent
  );
  const playTime = parseInt(
    musicalPart.querySelector("musicalPart>playTime").textContent
  );
  const vbs = parseInt(
    musicalPart.querySelector("musicalPart>singer>vBS").textContent
  );
  const vpc = parseInt(
    musicalPart.querySelector("musicalPart>singer>vPC").textContent
  );
  const singer = findVoice(voiceDb, vbs, vpc);
  const comment = musicalPart.querySelector("musicalPart>comment").textContent;
  const notes = (Array.prototype.slice.call(
    musicalPart.querySelectorAll("musicalPart>note")
  ) as Element[]).map(parseNote);
  return { tick, duration: playTime, singer, comment, notes };
}

function parseNote(n: Element) {
  const [tick, duration, note, velocity] = [
    "posTick",
    "durTick",
    "noteNum",
    "velocity"
  ].map(key => parseInt(n.querySelector(`note>${key}`).textContent));
  const [lyric, phonemes] = ["lyric", "phnms"].map(
    key => n.querySelector(`note>${key}`).textContent
  );
  return { tick, duration, note, velocity, lyric, phonemes };
}
