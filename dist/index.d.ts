export interface Voice {
    vbs: number;
    vpc: number;
    name: string;
}
export interface Tempo {
    tick: number;
    bpm: number;
}
export interface Track {
    no: number;
    name: string;
    comment: string;
    content: MusicalPart;
}
export interface MusicalPart {
    tick: number;
    playTime: number;
    singer: Voice;
    comment: string;
    notes: Note[];
}
export interface Note {
    tick: number;
    duration: number;
    note: number;
    velocity: number;
    lyric: string;
    phonemes: string;
}
export interface VSQXParseResult {
    error?: string;
    data: {
        vender: string;
        version: string;
        voices: Voice[];
        tempos: Tempo[];
        tracks: Track[];
        raw: Element;
    };
}
export declare function parse(xml: string): VSQXParseResult;
export declare function findVoice(voiceDb: Voice[], vbs: number, vpc: number): Voice;
