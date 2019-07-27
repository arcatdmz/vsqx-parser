import { Tempo } from "./index";

export function parseVSQ4Tempos(el: Element): Tempo[] {
  return (Array.prototype.slice.call(
    el.querySelectorAll("vsq4>masterTrack>tempo")
  ) as Element[]).map(tempo => {
    const tick = parseInt(tempo.querySelector("t").textContent);
    const bpm = parseInt(tempo.querySelector("v").textContent);
    return {
      tick,
      bpm
    };
  });
}
