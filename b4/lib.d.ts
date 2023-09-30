// import type { ZipReader } from './reader';
/* eslint-disable @typescript-eslint/naming-convention */
interface Navigator {
  /** Available only in iOS */
  readonly standalone: boolean;
}
interface Oggmented {
  OggmentedAudioContext: typeof AudioContext;
}
interface Window {
  AudioContext: typeof AudioContext;
  // /** Available only in iOS */
  // webkitAudioContext: typeof AudioContext;
}
interface Document {
  webkitExitFullscreen: () => Promise<void>;
  mozCancelFullScreen: () => Promise<void>;
  onwebkitfullscreenchange: (this: Document, ev: Event) => void;
  onmozfullscreenchange: (this: Document, ev: Event) => void;
  onwebkitfullscreenerror: (this: Document, ev: Event) => void;
  onmozfullscreenerror: (this: Document, ev: Event) => void;
  webkitFullscreenElement: Element;
  mozFullScreenElement: Element;
  webkitFullscreenEnabled: boolean;
  mozFullScreenEnabled: boolean;
}
interface HTMLElement {
  webkitRequestFullscreen: () => Promise<void>;
  mozRequestFullScreen: () => Promise<void>;
}
// Custom
interface Window {
  /** @deprecated for debug */
  [key: string]: unknown;
  _i: [string, (number | string)[], number, number];
  hook: object;
  oggmented: Oggmented;
}
interface Event {
  readonly target: EventTarget;
}
interface EventTarget {
  dispatchEvent: <K extends keyof CustomEventMap>(event: CustomEventMap[K]) => boolean;
  addEventListener: <K extends keyof CustomEventMap>(type: K, listener: (this: EventTarget, ev: CustomEventMap[K]) => unknown, options?: AddEventListenerOptions | boolean) => void;
  removeEventListener: <K extends keyof CustomEventMap>(type: K, listener: (this: EventTarget, ev: CustomEventMap[K]) => unknown, options?: AddEventListenerOptions | boolean) => void;
}
interface HTMLCanvasElement extends HTMLElement {
  getContext: (contextId: 'experimental-webgl', contextAttributes?: WebGLContextAttributes) => WebGLRenderingContext | null;
}
interface CustomEventMap {
  progress: ProgressEvent;
  load: ProgressEvent<FileReader> & { file: File; buffer: ArrayBuffer };
  read: CustomEvent<ByteData>;
}
interface ResourceMap {
  [key: string]: AudioBuffer | ImageBitmap | null;
  HitSong0: AudioBuffer;
  HitSong1: AudioBuffer;
  HitSong2: AudioBuffer;
  // LevelOver0_v1: AudioBuffer;
  // LevelOver1_v1: AudioBuffer;
  // LevelOver2_v1: AudioBuffer;
  // LevelOver3_v1: AudioBuffer;
  HitFXRaw: ImageBitmap;
  NoImageBlack: ImageBitmap;
  NoImageWhite: ImageBitmap;
  JudgeLine: ImageBitmap;
  JudgeLineMP: ImageBitmap;
  JudgeLineFC: ImageBitmap;
  Ranks: ImageBitmap[];
  Rank: ImageBitmap;
  mute: AudioBuffer;
  ProgressBar: ImageBitmap;
  LevelOver1: ImageBitmap;
  LevelOver3: ImageBitmap;
  LevelOver4: ImageBitmap;
  LevelOver5: ImageBitmap;
}
interface MediaData {
  audio: AudioBuffer;
  video: HTMLVideoElement | null;
}
interface ChartLineReaderData {
  type: 'line';
  data: ChartLineData[];
}
interface ChartInfoReaderData {
  type: 'info';
  data: ChartInfoData[];
}
interface ImageReaderData {
  name: string;
  type: 'image';
  data: ImageBitmap;
}
interface MediaReaderData {
  name: string;
  type: 'media';
  data: MediaData;
}
interface BetterMessage {
  host: string;
  code: number;
  name: string;
  message: string;
  target: string;
}
interface ChartReaderData {
  name: string;
  type: 'chart';
  data: Chart;
  format: string;
  md5: string;
  msg?: (BetterMessage | string)[];
  info?: ChartInfoData;
  line?: ChartLineData[];
}
interface UnknownReaderData {
  name: string;
  type: 'unknown';
  data: unknown;
}
type ReaderData = ChartInfoReaderData | ChartLineReaderData | ChartReaderData | ImageReaderData | MediaReaderData | UnknownReaderData;
interface ByteData {
  name: string;
  path: string;
  buffer: ArrayBuffer;
  text?: string;
  isText?: boolean;
  data?: unknown;
  isJSON?: boolean;
}
interface ByteReader {
  pattern: RegExp;
  type: string;
  mustMatch: boolean;
  weight: number;
  read: (data: ByteData, path: string, options: Record<string, unknown>) => Promise<ReaderData | null> | ReaderData | null;
}
interface ReaderOptions {
  handler: (data: ByteData) => Promise<unknown>;
}
interface ChartLineData {
  Chart?: string;
  LineId?: number;
  Image?: string;
  Vert?: string;
  Horz?: string;
  IsDark?: string;
  Scale?: number;
  Aspect?: number;
  UseBackgroundDim?: number;
  UseLineColor?: number;
  UseLineScale?: number;
}
interface ChartInfoData {
  Musician?: string;
  Composer?: string;
  Artist?: string;
  Chart?: string;
  Name?: string;
  Level?: string;
  Illustrator?: string;
  Designer?: string;
  Charter?: string;
  Music?: string;
  Image?: string;
  AspectRatio?: string;
  AspectRatioValue?: number;
  ScaleRatio?: string;
  ScaleRatioValue?: number;
  NoteScale?: string;
  NoteScaleValue?: number;
  GlobalAlpha?: string;
  GlobalAlphaValue?: number;
  BackgroundDim?: string;
  BackgroundDimValue?: number;
  Offset?: string;
  OffsetValue?: number;
}
interface StatData {
  newBestColor: string;
  newBestStr: string;
  scoreBest: string;
  scoreDelta: string;
  textAboveColor: string;
  textAboveStr: string;
  textBelowColor: string;
  textBelowStr: string;
}
interface ModuleConfig {
  name: string;
  description: string;
  contents: ModuleContent[];
}
interface ModuleBase {
  default: {
    contents: ModuleContent[];
  };
}
interface CommandModuleContent {
  type: 'command';
  meta: [string, () => void];
}
interface ScriptModuleContent {
  type: 'script';
  meta: [(arg0: (query: string) => Element | null) => void];
}
interface ConfigModuleContent {
  type: 'config';
  meta: [string, () => void];
}
interface UnknownModuleContent {
  type: 'unknown';
  meta: unknown;
}
interface FontOptions {
  alt: string;
}
type ModuleContent = CommandModuleContent | ConfigModuleContent | ScriptModuleContent | UnknownModuleContent;
// 只有CommonJS才认全局import
declare const JSZip: typeof import('jszip');
declare let hook: typeof import('./index').hook;
declare const Utils: {
  escapeHTML: (str: string) => string;
  addFont: (name: string, alt?: FontOptions) => Promise<unknown>;
  randomUUID: () => string;
} = {};
