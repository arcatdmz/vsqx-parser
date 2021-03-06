export interface Voice {
  vbs: number;
  vpc: number;
  name: string;
}

export interface Tempo {
  tick: number;
  duration: number;
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
  duration: number;
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
    resolution: number;
    preMeasure: number;
    timeSig: {
      nume: number;
      denomi: number;
    };
    voices: Voice[];
    tempos: Tempo[];
    tracks: Track[];
    raw: Element;
  };
}

export function findVoice(voiceDb: Voice[], vbs: number, vpc: number): Voice {
  return voiceDb.find(v => v.vbs === vbs && v.vpc === vpc);
}
