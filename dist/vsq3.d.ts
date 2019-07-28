import { Tempo, Track, Voice } from "./index";
export declare function parseVSQ3Voices(el: Element): Voice[];
export declare function parseVSQ3Tempos(el: Element): Tempo[];
export declare function parseVSQ3Tracks(el: Element, voiceDb: Voice[]): Track[];
