import { Tempo } from "./index";

export function parseVSQ3Tempos(el: Element): Tempo[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq3>masterTrack>tempo")
  ) as Element[]).map(tempo => {
    const tick = parseInt(tempo.querySelector("posTick").textContent);
    const bpm = parseInt(tempo.querySelector("bpm").textContent);
    return {
      tick,
      bpm
    };
  });
}
