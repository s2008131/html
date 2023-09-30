// type ArrayMapParameters<T> = typeof Array.prototype.map<T>;
// type ArrayMapCallback<T> = Parameters<ArrayMapParameters<T>>[0];
namespace To {
  export function int(a: unknown): number {
    return Number(a) | 0;
  }
  export function float(a: unknown): number {
    return Number(a) || 0;
  }
  export function bool(a: unknown): boolean {
    return Boolean(a);
  }
  export function str(a: unknown): string {
    return String(a);
  }
  // export function arr<T>(a: unknown, callbackfn: ArrayMapCallback<T>): T[] {
  //   return Array.isArray(a) ? a.map(callbackfn) : [];
  // }
  export function arr<T>(a: unknown, constructor: new (b: Record<string, unknown>) => T): T[] {
    return Array.isArray(a) ? a.map((i?: Record<string, unknown>) => new constructor(i || {})) : [];
  }
}
// const to = {
//   int(a: unknown): number {
//     return Number(a) | 0;
//   },
//   float(a: unknown): number {
//     return Number(a) || 0;
//   },
//   bool(a: unknown): boolean {
//     return Boolean(a);
//   },
//   str(a: unknown): string {
//     return String(a);
//   },
//   // arr<T>(a: unknown, callbackfn: ArrayMapCallback<T>): T[] {
//   //   return Array.isArray(a) ? a.map(callbackfn) : [];
//   // },
//   arr<T>(a: unknown, constructor: new (b: Record<string, unknown>) => T): T[] {
//     return Array.isArray(a) ? a.map((i?: Record<string, unknown>) => new constructor(i || {})) : [];
//   }
// };
class SpeedEvent {
  public startTime: number;
  public endTime: number;
  public value: number;
  public floorPosition: number;
  public floorPosition2: number;
  public constructor(event: Record<string, unknown>) {
    this.startTime = To.int(event.startTime);
    this.endTime = To.int(event.endTime);
    this.value = To.float(event.value);
    this.floorPosition = To.float(event.floorPosition);
    this.floorPosition2 = To.float(event.floorPosition2);
  }
}
interface SpeedEventExtends extends SpeedEvent {
  startSeconds: number;
  endSeconds: number;
}
class Note {
  public type: number;
  public time: number;
  public positionX: number;
  public holdTime: number;
  public speed: number;
  public floorPosition: number;
  public constructor(note: Record<string, unknown>) {
    this.type = To.int(note.type);
    this.time = To.int(note.time);
    this.positionX = To.float(note.positionX);
    this.holdTime = To.int(note.holdTime);
    this.speed = To.float(note.speed);
    this.floorPosition = To.float(note.floorPosition);
  }
}
export interface NoteExtends extends Note {
  maxVisiblePos: number;
  offsetX: number;
  offsetY: number;
  alpha: number;
  seconds: number;
  holdSeconds: number;
  line: JudgeLine;
  lineId: number;
  noteId: number;
  isAbove: boolean;
  name: string;
  isMulti: boolean;
  nearNotes: NoteExtends[];
  badTime?: number;
  badY?: number;
  projectX: number;
  projectY: number;
  cosr: number;
  sinr: number;
  visible: boolean;
  showPoint: boolean;
  frameCount: number;
  status: number;
  scored: boolean;
  holdTapTime: number;
  holdStatus: number;
  holdBroken: boolean;
  statOffset: number;
}
class LineEvent {
  public startTime: number;
  public endTime: number;
  public start: number;
  public end: number;
  public start2: number;
  public end2: number;
  public constructor(event: Record<string, unknown>) {
    this.startTime = To.int(event.startTime);
    this.endTime = To.int(event.endTime);
    this.start = To.float(event.start);
    this.end = To.float(event.end);
    this.start2 = To.float(event.start2);
    this.end2 = To.float(event.end2);
  }
}
interface LineEventExtends extends LineEvent {
  startSeconds: number;
  endSeconds: number;
}
class JudgeLine {
  public numOfNotes: number;
  public numOfNotesAbove: number;
  public numOfNotesBelow: number;
  public bpm: number;
  public speedEvents: SpeedEvent[];
  public notesAbove: Note[];
  public notesBelow: Note[];
  public judgeLineDisappearEvents: LineEvent[];
  public judgeLineMoveEvents: LineEvent[];
  public judgeLineRotateEvents: LineEvent[];
  public constructor(line: Record<string, unknown>) {
    this.numOfNotes = To.int(line.numOfNotes);
    this.numOfNotesAbove = To.int(line.numOfNotesAbove);
    this.numOfNotesBelow = To.int(line.numOfNotesBelow);
    this.bpm = To.float(line.bpm);
    this.speedEvents = To.arr(line.speedEvents, SpeedEvent);
    this.notesAbove = To.arr(line.notesAbove, Note);
    this.notesBelow = To.arr(line.notesBelow, Note);
    this.judgeLineDisappearEvents = To.arr(line.judgeLineDisappearEvents, LineEvent);
    this.judgeLineMoveEvents = To.arr(line.judgeLineMoveEvents, LineEvent);
    this.judgeLineRotateEvents = To.arr(line.judgeLineRotateEvents, LineEvent);
  }
}
export interface JudgeLineExtends extends JudgeLine {
  lineId: number;
  offsetX: number;
  offsetY: number;
  alpha: number;
  rotation: number;
  positionY: number;
  positionY2: number;
  speedEvents: SpeedEventExtends[];
  notesAbove: NoteExtends[];
  notesBelow: NoteExtends[];
  judgeLineDisappearEvents: LineEventExtends[];
  judgeLineMoveEvents: LineEventExtends[];
  judgeLineRotateEvents: LineEventExtends[];
  disappearEventsIndex: number;
  moveEventsIndex: number;
  rotateEventsIndex: number;
  speedEventsIndex: number;
  cosr: number;
  sinr: number;
  imageW: number;
  imageH: number;
  imageD: boolean;
  imageU: boolean;
  imageS: number;
  imageA: number;
  imageL: [ImageBitmap, ImageBitmap, null, ImageBitmap];
  imageC: boolean;
}
class Chart {
  public formatVersion: number;
  public offset: number;
  public numOfNotes: number;
  public judgeLineList: JudgeLine[];
  public constructor(chart: Record<string, unknown>) {
    this.formatVersion = To.int(chart.formatVersion);
    this.offset = To.float(chart.offset);
    this.numOfNotes = To.int(chart.numOfNotes);
    this.judgeLineList = To.arr(chart.judgeLineList, JudgeLine);
  }
}
interface ChartExtends extends Chart {
  maxSeconds: number;
  judgeLineList: JudgeLineExtends[];
}
interface EventSeconds {
  startTime: number;
  endTime: number;
  startSeconds: number;
  endSeconds: number;
}
export class Renderer {
  // 容器和画布上下文
  public stage: HTMLDivElement;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public canvasfg: HTMLCanvasElement;
  public ctxfg: CanvasRenderingContext2D;
  /** Half of the width of the canvas. */
  public wlen: number;
  /** Half of the height of the canvas. */
  public hlen: number;
  public scaleX: number;
  public scaleY: number;
  private width: number;
  private height: number;
  private matX: (x: number) => number;
  private matY: (y: number) => number;
  private matR: (r: number) => number;
  // 用户设置项
  public speed: number;
  public lineScale: number;
  public noteScale: number;
  public noteScaleRatio: number;
  public brightness: number;
  public multiHint: boolean;
  public playMode: number;
  public musicVolume: number;
  public soundVolume: number;
  public enableFR: boolean;
  public enableVP: boolean;
  public lowResFactor: number;
  // 谱面数据
  public readonly lines: JudgeLineExtends[];
  public readonly notes: NoteExtends[];
  public readonly taps: NoteExtends[];
  public readonly drags: NoteExtends[];
  public readonly flicks: NoteExtends[];
  public readonly holds: NoteExtends[];
  public linesReversed: JudgeLineExtends[];
  public notesReversed: NoteExtends[];
  public tapsReversed: NoteExtends[];
  public dragsReversed: NoteExtends[];
  public flicksReversed: NoteExtends[];
  public holdsReversed: NoteExtends[];
  public readonly tapholds: NoteExtends[];
  // 资源数据
  public chart: ChartExtends | null;
  public bgImage: ImageBitmap;
  public bgImageBlur: ImageBitmap;
  public bgMusic: AudioBuffer;
  public bgVideo: HTMLVideoElement | null;
  private _mirrorType: number;
  private initialized: boolean;
  public constructor(stage: unknown) {
    if (!(stage instanceof HTMLDivElement)) throw new Error('Not a container');
    const fail = () => { throw new Error('Failed to initialize canvas') };
    this.stage = stage;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false }) || fail(); // 游戏界面(alpha:false会使Firefox显示异常/需要验证)
    this.canvasfg = document.createElement('canvas'); // 绘制游戏主界面(OffscreenCanvas会使Safari崩溃)
    this.ctxfg = this.canvasfg.getContext('2d') || fail();
    this.stage.appendChild(this.canvas);
    this.canvas.style.cssText = ';position:absolute;top:0px;left:0px;right:0px;bottom:0px';
    console.log('Hello, Phixos!');
    // config
    this.speed = 1;
    this.lineScale = 57.6;
    this.noteScale = 1; // note缩放设定值
    this.noteScaleRatio = 8e3; // note缩放比率，由noteScale计算而来
    this.brightness = 0.6;
    // this.songName = '';
    // this.chartLevel = '';
    // this.illustrator = '';
    // this.chartDesign = '';
    // this.feedback = true;
    // this.imageBlur = true;
    this.multiHint = true;
    // this.hitSound = true;
    // this.anchorPoint = false;
    // this.coloredLine = true;
    // this.perfectLine = '#feffa9';
    // this.goodLine = '#a2eeff';
    // this.perfectNote = '#ffeca0';
    // this.goodNote = '#b4e1ff';
    // this.badNote = '#6c4343';
    this.playMode = 1; // 0:game,1:auto,2:hyper,3:auto&hyper
    this.musicVolume = 1;
    this.soundVolume = 1;
    // this.showTransition = true;
    // this.chartOffset = 0;
    this._mirrorType = 0;
    this.enableFR = false;
    this.enableVP = false;
    // chart
    this.chart = null;
    this.bgImage = null as unknown as ImageBitmap;
    this.bgImageBlur = null as unknown as ImageBitmap;
    this.bgMusic = null as unknown as AudioBuffer;
    this.bgVideo = null;
    this.lines = [];
    this.notes = [];
    this.taps = [];
    this.drags = [];
    this.flicks = [];
    this.holds = [];
    this.linesReversed = [];
    this.notesReversed = [];
    this.tapsReversed = [];
    this.dragsReversed = [];
    this.flicksReversed = [];
    this.holdsReversed = [];
    this.tapholds = [];
    // canvas
    this.lowResFactor = 1;
    this.width = 0;
    this.height = 0;
    this.wlen = 0;
    this.hlen = 0;
    this.scaleX = 0;
    this.scaleY = 0;
    this.matX = x => x;
    this.matY = y => y;
    this.matR = r => r;
    this.initialized = false;
    // event
    this._setLowResFactor(1);
    this.resizeCanvas();
  }
  // public get bgImage(): ImageBitmap {
  //   if (!this._bgImage) throw new Error('No background image');
  //   return this._bgImage;
  // }
  // public set bgImage(value: ImageBitmap) {
  //   this._bgImage = value;
  // }
  // public get bgImageBlur(): ImageBitmap {
  //   if (!this._bgImageBlur) throw new Error('No background image');
  //   return this._bgImageBlur;
  // }
  // public set bgImageBlur(value: ImageBitmap) {
  //   this._bgImageBlur = value;
  // }
  // public get bgMusic(): AudioBuffer {
  //   if (!this._bgMusic) throw new Error('No background music');
  //   return this._bgMusic;
  // }
  // public set bgMusic(value: AudioBuffer) {
  //   this._bgMusic = value;
  // }
  // config
  public setNoteScale(num = 1): void {
    this.noteScale = num;
    this.noteScaleRatio = this.canvasfg.width * this.noteScale / 8080; // note、特效缩放
  }
  public setLowResFactor(num = 1): void {
    this._setLowResFactor(num);
    this._resizeCanvas();
  }
  public resizeCanvas(): void {
    const { clientWidth: width, clientHeight: height } = this.stage;
    if (this.width === width && this.height === height) return;
    this.width = width;
    this.height = height;
    this.canvas.style.cssText += `;width:${width}px;height:${height}px`; // 只有inset还是会溢出
    this._resizeCanvas();
  }
  public mirrorView(code = this._mirrorType): void {
    const n = 3 & code;
    this._mirrorType = n;
    this.transformView(1 & n ? -1 : 1, 2 & n ? -1 : 1, 0, 0);
  }
  public transformView(scaleX = 1, scaleY = 1, offsetX = 0, offsetY = 0): void {
    const { canvasfg } = this;
    const xa = canvasfg.width * scaleX;
    const xb = (canvasfg.width - xa) * 0.5;
    const ya = -canvasfg.height * scaleY;
    const yb = (canvasfg.height - ya) * 0.5;
    const ra = -Math.sign(scaleX * scaleY) * Math.PI / 180;
    const rb = scaleY > 0 ? 0 : Math.PI;
    const tx = Math.sign(scaleY) * xa * 0.05625;
    const ty = Math.sign(scaleY) * -ya * 0.6; // 控制note流速
    this.matX = x => xb + xa * (x - offsetX);
    this.matY = y => yb + ya * (y - offsetY);
    this.matR = r => rb + ra * r;
    this.scaleX = tx;
    this.scaleY = ty;
    this.initialized = true;
  }
  // note预处理
  public prerenderChart(chart: Record<string, unknown>): void {
    this.lines.length = 0;
    this.notes.length = 0;
    this.taps.length = 0;
    this.drags.length = 0;
    this.flicks.length = 0;
    this.holds.length = 0;
    this.tapholds.length = 0;
    const chartNew = new Chart(chart) as ChartExtends;
    const ss = {
      aniStart: 1e9,
      aniEnd: 0,
      hitStart: 1e9,
      hitEnd: 0
    };
    const aniUpdate = (seconds: number) => {
      if (seconds < ss.aniStart) ss.aniStart = seconds;
      if (seconds > ss.aniEnd) ss.aniEnd = seconds;
    };
    const hitUpdate = (seconds: number) => {
      aniUpdate(seconds);
      if (seconds < ss.hitStart) ss.hitStart = seconds;
      if (seconds > ss.hitEnd) ss.hitEnd = seconds;
    };
    // 添加seconds
    const addSeconds = (events: EventSeconds[], bpm: number) => {
      for (const i of events) {
        i.startSeconds = i.startTime / bpm * 1.875;
        i.endSeconds = i.endTime / bpm * 1.875;
        if (i.startTime > 1 - 1e6) aniUpdate(i.startSeconds);
        if (i.endTime < 1e9) aniUpdate(i.endSeconds);
      }
    };
    // 获取note最大可见位置
    const getMaxVisiblePos = (x: number) => {
      const n = Math.fround(x);
      if (!isFinite(n)) throw new TypeError('Argument must be a finite number');
      const magic = 11718.75;
      const prime = n >= magic ? 2 ** Math.floor(1 + Math.log2(n / magic)) : 1;
      const a = n / prime + 0.001;
      const r = Math.fround(a);
      if (r <= a) return r * prime;
      const a_ = new Float32Array([a]);
      new Uint32Array(a_.buffer)[0] += a_[0] <= 0 ? 1 : -1;
      return a_[0] * prime;
    };
    // 向Renderer添加Note
    const addNote = (note: NoteExtends, beat32: number, line: JudgeLineExtends, noteId: number, isAbove: boolean) => {
      note.offsetX = 0;
      note.offsetY = 0;
      note.alpha = 0;
      note.seconds = note.time * beat32;
      note.holdSeconds = note.holdTime * beat32;
      note.maxVisiblePos = getMaxVisiblePos(note.floorPosition);
      if (note.time < 1e9) {
        hitUpdate(note.seconds);
        hitUpdate(note.seconds + note.holdSeconds);
      }
      note.line = line;
      note.lineId = line.lineId;
      note.noteId = noteId;
      note.isAbove = isAbove;
      note.name = `${line.lineId}${isAbove ? '+' : '-'}${noteId}${'?tdhf'[note.type]}`;
      this.notes.push(note);
      if (note.type === 1) this.taps.push(note);
      else if (note.type === 2) this.drags.push(note);
      else if (note.type === 3) this.holds.push(note);
      else if (note.type === 4) this.flicks.push(note);
      if (note.type === 1 || note.type === 3) this.tapholds.push(note);
    };
    const sortNote = (a: NoteExtends, b: NoteExtends) => a.seconds - b.seconds || a.lineId - b.lineId || a.noteId - b.noteId;
    // 优化events
    chartNew.judgeLineList.forEach((i, lineId) => i.lineId = lineId);
    for (const i of chartNew.judgeLineList) {
      i.bpm *= this.speed;
      i.offsetX = 0;
      i.offsetY = 0;
      i.alpha = 0;
      i.rotation = 0;
      i.positionY = 0; // 临时过渡用
      i.positionY2 = 0;
      i.speedEvents = normalizeSpeedEvent(i.speedEvents) as SpeedEventExtends[];
      i.judgeLineDisappearEvents = normalizeLineEvent(i.judgeLineDisappearEvents) as LineEventExtends[];
      i.judgeLineMoveEvents = normalizeLineEvent(i.judgeLineMoveEvents) as LineEventExtends[];
      i.judgeLineRotateEvents = normalizeLineEvent(i.judgeLineRotateEvents) as LineEventExtends[];
      i.disappearEventsIndex = 0;
      i.moveEventsIndex = 0;
      i.rotateEventsIndex = 0;
      i.speedEventsIndex = 0;
      addSeconds(i.speedEvents, i.bpm);
      addSeconds(i.judgeLineDisappearEvents, i.bpm);
      addSeconds(i.judgeLineMoveEvents, i.bpm);
      addSeconds(i.judgeLineRotateEvents, i.bpm);
      this.lines.push(i); // TODO: 可以定义新类避免函数在循环里定义
      i.notesAbove.forEach((j, noteId) => addNote(j, 1.875 / i.bpm, i, noteId, true));
      i.notesBelow.forEach((j, noteId) => addNote(j, 1.875 / i.bpm, i, noteId, false));
    }
    this.notes.sort(sortNote);
    this.taps.sort(sortNote);
    this.drags.sort(sortNote);
    this.holds.sort(sortNote);
    this.flicks.sort(sortNote);
    this.notesReversed = this.notes.slice(0).reverse();
    this.tapsReversed = this.taps.slice(0).reverse();
    this.dragsReversed = this.drags.slice(0).reverse();
    this.holdsReversed = this.holds.slice(0).reverse();
    this.flicksReversed = this.flicks.slice(0).reverse();
    this.linesReversed = this.lines.slice(0).reverse();
    this.tapholds.sort(sortNote);
    // 多押标记
    const timeOfMulti: Record<string, number> = {};
    for (const i of this.notes) timeOfMulti[i.seconds.toFixed(6)] = timeOfMulti[i.seconds.toFixed(6)] ? 2 : 1;
    for (const i of this.notes) i.isMulti = timeOfMulti[i.seconds.toFixed(6)] === 2;
    // 分析邻近Note(0.01s内标记，用于预处理Flick,TapHold重叠判定)
    for (let i = 0; i < this.flicks.length; i++) {
      const note = this.flicks[i];
      note.nearNotes = [];
      for (let j = i + 1; j < this.flicks.length; j++) {
        const note2 = this.flicks[j];
        if (Math.fround(note2.seconds - note.seconds) > 0.01) break;
        note.nearNotes.push(note2);
      }
    }
    for (let i = 0; i < this.tapholds.length; i++) {
      const note = this.tapholds[i];
      note.nearNotes = [];
      for (let j = i + 1; j < this.tapholds.length; j++) {
        const note2 = this.tapholds[j];
        if (Math.fround(note2.seconds - note.seconds) > 0.01) break;
        note.nearNotes.push(note2);
      }
    }
    this.chart = chartNew;
    this.chart.maxSeconds = ss.aniEnd;
    console.table(ss);
  }
  /** 从0开始，将事件index定位到正确位置 */
  public seekLineEventIndex(time?: number): void {
    if (!this.initialized) throw new Error('Not initialized');
    for (const line of this.lines) {
      line.speedEventsIndex = 0;
      line.disappearEventsIndex = 0;
      line.moveEventsIndex = 0;
      line.rotateEventsIndex = 0;
      if (time == null) continue;
      while (line.speedEventsIndex < line.speedEvents.length && line.speedEvents[line.speedEventsIndex].startSeconds < time) line.speedEventsIndex++;
      while (line.disappearEventsIndex < line.judgeLineDisappearEvents.length && line.judgeLineDisappearEvents[line.disappearEventsIndex].startSeconds < time) line.disappearEventsIndex++;
      while (line.moveEventsIndex < line.judgeLineMoveEvents.length && line.judgeLineMoveEvents[line.moveEventsIndex].startSeconds < time) line.moveEventsIndex++;
      while (line.rotateEventsIndex < line.judgeLineRotateEvents.length && line.judgeLineRotateEvents[line.rotateEventsIndex].startSeconds < time) line.rotateEventsIndex++;
    }
  }
  public updateByTime(time: number): void {
    if (!this.initialized) throw new Error('Not initialized');
    for (const line of this.lines) {
      for (let i = line.disappearEventsIndex, len = line.judgeLineDisappearEvents.length; i < len; i++) {
        const evt = line.judgeLineDisappearEvents[i];
        if (time > evt.endSeconds) continue;
        const dt = (time - evt.startSeconds) / (evt.endSeconds - evt.startSeconds);
        line.alpha = evt.start + (evt.end - evt.start) * dt;
        if (line.alpha > 1) line.alpha = 1;
        line.disappearEventsIndex = i;
        break;
      }
      for (let i = line.moveEventsIndex, len = line.judgeLineMoveEvents.length; i < len; i++) {
        const evt = line.judgeLineMoveEvents[i];
        if (time > evt.endSeconds) continue;
        const dt = (time - evt.startSeconds) / (evt.endSeconds - evt.startSeconds);
        line.offsetX = this.matX(evt.start + (evt.end - evt.start) * dt);
        line.offsetY = this.matY(evt.start2 + (evt.end2 - evt.start2) * dt);
        line.moveEventsIndex = i;
        break;
      }
      for (let i = line.rotateEventsIndex, len = line.judgeLineRotateEvents.length; i < len; i++) {
        const evt = line.judgeLineRotateEvents[i];
        if (time > evt.endSeconds) continue;
        const dt = (time - evt.startSeconds) / (evt.endSeconds - evt.startSeconds);
        line.rotation = this.matR(evt.start + (evt.end - evt.start) * dt);
        line.cosr = Math.cos(line.rotation);
        line.sinr = Math.sin(line.rotation);
        line.rotateEventsIndex = i;
        break;
      }
      for (let i = line.speedEventsIndex, len = line.speedEvents.length; i < len; i++) {
        const evt = line.speedEvents[i];
        if (time > evt.endSeconds) continue;
        line.positionY = (time - evt.startSeconds) * this.speed * evt.value + (this.enableFR ? evt.floorPosition2 : evt.floorPosition);
        line.positionY2 = (time - evt.startSeconds) * this.speed * evt.value + evt.floorPosition2;
        line.speedEventsIndex = i;
        break;
      }
      const getGoodY = (i: NoteExtends) => {
        if (i.type !== 3) return (i.floorPosition - line.positionY) * i.speed;
        if (i.seconds < time) return (i.seconds - time) * this.speed * i.speed;
        return i.floorPosition - line.positionY;
      };
      const getBadY = (i: NoteExtends) => {
        if (i.badTime == null) return getGoodY(i);
        if (performance.now() - i.badTime > 500) delete i.badTime;
        if (i.badY == null) i.badY = getGoodY(i);
        return i.badY;
      };
      const setAlpha = (i: NoteExtends, dx: number, dy: number) => {
        i.projectX = line.offsetX + dx * i.cosr;
        i.offsetX = i.projectX + dy * i.sinr;
        i.projectY = line.offsetY + dx * i.sinr;
        i.offsetY = i.projectY - dy * i.cosr;
        i.visible = (i.offsetX - this.wlen) ** 2 + (i.offsetY - this.hlen) ** 2 < (this.wlen * 1.23625 + this.hlen + this.scaleY * i.holdSeconds * this.speed * i.speed) ** 2; // Math.hypot实测性能较低
        i.showPoint = false;
        if (i.badTime != null) {
          // Not bad
        } else if (i.seconds > time) {
          i.showPoint = true;
          const isHidden = i.maxVisiblePos < line.positionY2;
          i.alpha = isHidden || this.enableVP && getGoodY(i) * 0.6 > 2 ? 0 : i.type === 3 && i.speed === 0 ? 0 : 1;
        } else {
          i.frameCount = i.frameCount == null ? 0 : i.frameCount + 1;
          if (i.type === 3) {
            i.showPoint = true;
            i.alpha = i.speed === 0 ? 0 : i.status % 4 === 2 ? 0.45 : 1;
          } else i.alpha = Math.max(1 - (time - i.seconds) / 0.16, 0); // 过线后0.16s消失
        }
      };
      for (const i of line.notesAbove) {
        i.cosr = line.cosr;
        i.sinr = line.sinr;
        setAlpha(i, this.scaleX * i.positionX, this.scaleY * getBadY(i));
      }
      for (const i of line.notesBelow) {
        i.cosr = -line.cosr;
        i.sinr = -line.sinr;
        setAlpha(i, -this.scaleX * i.positionX, this.scaleY * getBadY(i));
      }
    }
  }
  private _setLowResFactor(num = 1) {
    this.lowResFactor = num * self.devicePixelRatio;
  }
  private _resizeCanvas() {
    const { canvas, canvasfg, width, height } = this;
    const widthLowRes = width * this.lowResFactor;
    const heightLowRes = height * this.lowResFactor;
    canvas.width = widthLowRes;
    canvas.height = heightLowRes;
    canvasfg.width = Math.min(widthLowRes, heightLowRes * 16 / 9);
    canvasfg.height = heightLowRes;
    this.wlen = canvasfg.width / 2;
    this.hlen = canvasfg.height / 2;
    this.mirrorView();
    this.setNoteScale(this.noteScale);
    this.lineScale = canvasfg.width > canvasfg.height * 0.75 ? canvasfg.height / 18.75 : canvasfg.width / 14.0625; // 判定线、文字缩放
  }
}
// 规范判定线事件
function normalizeLineEvent(events: LineEvent[]) {
  const oldEvents = events.map(i => new LineEvent(i as unknown as Record<string, unknown>)); // 深拷贝
  if (!oldEvents.length) return [new LineEvent({ startTime: -999999, endTime: 1e9 })]; // 如果没有事件，添加一个默认事件(以后添加warning)
  const newEvents = [
    new LineEvent({
      startTime: -999999,
      endTime: 0,
      start: oldEvents[0].start,
      end: oldEvents[0].start,
      start2: oldEvents[0].start2,
      end2: oldEvents[0].start2
    })
  ]; // 以1-1e6开头
  oldEvents.push(new LineEvent({
    startTime: oldEvents[oldEvents.length - 1].endTime,
    endTime: 1e9,
    start: oldEvents[oldEvents.length - 1].end,
    end: oldEvents[oldEvents.length - 1].end,
    start2: oldEvents[oldEvents.length - 1].end2,
    end2: oldEvents[oldEvents.length - 1].end2
  })); // 以1e9结尾
  for (const i2 of oldEvents) {
    // 保证时间连续性
    if (i2.startTime > i2.endTime) continue;
    const i1 = newEvents[newEvents.length - 1];
    if (i1.endTime > i2.endTime) {
      // 忽略
    } else if (i1.endTime === i2.startTime) newEvents.push(i2);
    else if (i1.endTime < i2.startTime) {
      newEvents.push(new LineEvent({
        startTime: i1.endTime,
        endTime: i2.startTime,
        start: i1.end,
        end: i1.end,
        start2: i1.end2,
        end2: i1.end2
      }), i2);
    } else if (i1.endTime > i2.startTime) {
      newEvents.push(new LineEvent({
        startTime: i1.endTime,
        endTime: i2.endTime,
        start: (i2.start * (i2.endTime - i1.endTime) + i2.end * (i1.endTime - i2.startTime)) / (i2.endTime - i2.startTime),
        end: i1.end,
        start2: (i2.start2 * (i2.endTime - i1.endTime) + i2.end2 * (i1.endTime - i2.startTime)) / (i2.endTime - i2.startTime),
        end2: i1.end2
      }));
    }
  }
  // 合并相同变化率事件
  const newEvents2 = [newEvents.shift()!];
  for (const i2 of newEvents) {
    const i1 = newEvents2[newEvents2.length - 1];
    const d1 = i1.endTime - i1.startTime;
    const d2 = i2.endTime - i2.startTime;
    if (i2.startTime === i2.endTime) {
      // 忽略
    } else if (i1.end === i2.start && i1.end2 === i2.start2 && (i1.end - i1.start) * d2 === (i2.end - i2.start) * d1 && (i1.end2 - i1.start2) * d2 === (i2.end2 - i2.start2) * d1) {
      i1.endTime = i2.endTime;
      i1.end = i2.end;
      i1.end2 = i2.end2;
    } else newEvents2.push(i2);
  }
  return newEvents2;
}
// 规范speedEvents
function normalizeSpeedEvent(events: SpeedEvent[]) {
  const newEvents = [];
  for (const i2 of events) {
    const i1 = newEvents[newEvents.length - 1];
    if (i1?.value === i2.value) i1.endTime = i2.endTime;
    else newEvents.push(i2);
  }
  return newEvents;
}
