import { VSQXParseResult, Tempo, Track } from "./common";
export * from "./common";
export declare function parse(xml: string): VSQXParseResult;
export declare class VSQXParseResultUtil {
    private result;
    constructor(result: VSQXParseResult);
    readonly data: {
        vender: string;
        version: string;
        resolution: number;
        preMeasure: number;
        timeSig: {
            nume: number;
            denomi: number;
        };
        voices: import("./common").Voice[];
        tempos: Tempo[];
        tracks: Track[];
        raw: Element;
    };
    readonly ticksPerMeasure: number;
    readonly offsetTick: number;
    getOffsetTickForTrack(track: Track): number;
    tickToTime(tick: number): number;
}
export declare function timePerTick(tempo: Tempo, resolution: number): number;
