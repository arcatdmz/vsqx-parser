import { Tempo, Track, Voice } from "./common";
export declare function parseVSQ4Voices(el: Element): Voice[];
export declare function parseVSQ4Tempos(el: Element): Tempo[];
export declare function parseVSQ4Tracks(el: Element, voiceDb: Voice[]): Track[];
