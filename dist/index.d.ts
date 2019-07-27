export interface Tempo {
    tick: number;
    bpm: number;
}
export interface VSQXParseResult {
    error?: string;
    data: {
        vender: string;
        version: string;
        tempos: Tempo[];
        raw: Element;
    };
}
export declare function parse(xml: string): VSQXParseResult;
