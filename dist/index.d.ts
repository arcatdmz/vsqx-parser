import { VSQXParseResult, Tempo } from "./common";
export * from "./common";
export declare function parse(xml: string): VSQXParseResult;
export declare class VSQXParseResultUtil {
    private result;
    constructor(result: VSQXParseResult);
    readonly data: {
        vender: string;
        version: string;
        resolution: number;
        voices: import("./common").Voice[];
        tempos: Tempo[];
        tracks: import("./common").Track[];
        raw: Element;
    };
    tickToTime(tick: number): number;
}
export declare function timePerTick(tempo: Tempo, resolution: number): number;
