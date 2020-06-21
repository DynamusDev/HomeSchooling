export type Action = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (data?: any) => void;
  name: string;
  enabled?: boolean;
}

export type ToggleAction = Action & {
  active: boolean;
}

export type SelectAction<T> = Action & {
  callback: (choice: T) => void;
  options: T[];
}

export type Course = 'maths' | 'physics' | 'biology' | 'english' | 'french' | 'history' | 'foreign';

export type Level = {
  level: number;
  className: string;
}

export type AccessibilityMenu = 'fonts' | 'spacing' | 'syllable' | 'coloring' | 'notebook' | 'interface' | 'interfaceParameters'
export type MenuButton = 'newNotebook' | 'loadNotebook' | 'pageDisplay' | 'export' | 'notebook' | 'print'
  | 'svgconversion' | 'mathmlconversion' | 'language' | 'themedisplay' | 'updatetools' | 'help' | 'about'
  | 'tutorialvideos' | 'tutorials' | 'ask'
export type MenuName = 'file' | 'edit' | 'options' | 'help'

export type AccessibilityOptions = {
  wordSpacing?: number;
  syllableSpacing?: number;
  lineSpacing?: number;
  syllableSeparator?: '|' | '-' | '/' | '+';
  colorByMode?: ColorMode;
  fontSize?: number;
  fontFamily?: string;
  colorSet?: string[];
  soundsColors?: {
    [sound: string]: string;
  };
  highContrast?: boolean;
  interfaceSize?: number;
  showMargin?: boolean;
}

export type ColorMode = 'line' | 'word' | 'syllable' | 'sound'
