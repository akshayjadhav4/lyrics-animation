import { LineType } from "clrc";

export interface EnhancedLrc {
  lineNumber: number;
  raw: string;
  type: LineType;
  key?: string;
  value?: string;
  startMillisecond?: number;
  content?: string;
  words?: Word[];
}

export interface Word {
  index: number;
  raw: string;
  startMillisecond: number;
  content: string;
}

export interface LyricsLineProps {
  line: EnhancedLrc;
  isActiveLine: boolean;
  nextLineStartInMS?: number;
}

export interface AnimatedWordProps {
  word: Word;
  duration: number;
}

export interface AnimatedLetterProps {
  letter: string;
  duration: number;
  delay: number;
}
