var e = Object.defineProperty
  , t = (t,s,n)=>(((t,s,n)=>{
    s in t ? e(t, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[s] = n
}
)(t, "symbol" != typeof s ? s + "" : s, n),
n);
import {InteractProxy as s} from "./utils/interact.js";
import {audio as n} from "./utils/aup.js";
const i = {
    toggle(e) {
        if (!this.enabled)
            return Promise.reject(new Error("Fullscreen is not supported"));
        const t = ()=>new Promise(((e,t)=>{
            document.addEventListener(this.onchange, e, {
                once: !0
            }),
            document.addEventListener(this.onerror, t, {
                once: !0
            })
        }
        ));
        if (this.element) {
            const e = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
            if (e)
                return e.call(document),
                t()
        } else {
            const s = e instanceof HTMLElement ? e : document.body
              , n = s.requestFullscreen || s.webkitRequestFullscreen || s.mozRequestFullScreen;
            if (n)
                return n.call(s),
                t()
        }
        return Promise.reject(new Error("Fullscreen is not supported"))
    },
    check(e) {
        const t = e instanceof HTMLElement ? e : document.body;
        return this.element === t
    },
    get onchange() {
        return void 0 !== document.onfullscreenchange ? "fullscreenchange" : void 0 !== document.onwebkitfullscreenchange ? "webkitfullscreenchange" : void 0 !== document.onmozfullscreenchange ? "mozfullscreenchange" : null
    },
    get onerror() {
        return void 0 !== document.onfullscreenerror ? "fullscreenerror" : void 0 !== document.onwebkitfullscreenerror ? "webkitfullscreenerror" : void 0 !== document.onmozfullscreenerror ? "mozfullscreenerror" : null
    },
    get element() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || null
    },
    get enabled() {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || !1
    }
}
  , a = {
    async checkSupport() {
        const e = screen.orientation;
        if (!e)
            return !1;
        try {
            return await e.lock(e.type),
            e.unlock(),
            hook.toast("如果你看到了这个提示，请联系开发者：Unexpected Allow Orientation Lock Without Permission"),
            !0
        } catch (e) {
            if ("SecurityError" === e.name)
                return "The operation is insecure." !== e.message;
            if ("NotSupportedError" === e.name)
                return !1;
            if ("TypeError" === e.name)
                return !1;
            throw e
        }
    },
    lockLandscape() {
        const e = screen.orientation;
        return e ? e.lock("landscape-primary") : Promise.reject(new Error("Orientation is not supported"))
    },
    lockPortrait() {
        const e = screen.orientation;
        return e ? e.lock("portrait-primary") : Promise.reject(new Error("Orientation is not supported"))
    },
    unlock() {
        const e = screen.orientation;
        return e ? e.unlock() : Promise.reject(new Error("Orientation is not supported"))
    }
}
  , o = e=>void 0 === self[e];
{
    try {
        Reflect.construct(EventTarget, [])
    } catch {
        self.EventTarget = function() {
            this.listeners = {}
        }
        ,
        EventTarget.prototype = {
            constructor: EventTarget,
            addEventListener(e, t) {
                e in this.listeners || (this.listeners[e] = []),
                this.listeners[e].push(t)
            },
            removeEventListener(e, t) {
                if (!(e in this.listeners))
                    return;
                const s = this.listeners[e];
                for (let e = 0, n = s.length; e < n; e++)
                    if (s[e] === t)
                        return void s.splice(e, 1)
            },
            dispatchEvent(e) {
                if (!(e.type in this.listeners))
                    return !0;
                const t = this.listeners[e.type];
                for (let s = 0, n = t.length; s < n; s++)
                    t[s].call(this, e);
                return !e.defaultPrevented
            }
        }
    }
    const e = new Error;
    if (new Error("",{
        cause: e
    }).cause !== e) {
        class e extends self.Error {
            constructor(e, {cause: t}={}) {
                super(e),
                this.cause = t
            }
        }
        Object.defineProperty(e, "name", {
            value: "Error"
        }),
        self.Error = e
    }
    class t extends self.DOMException {
        constructor(e, s) {
            super(e, s),
            Error.captureStackTrace ? Error.captureStackTrace(this, t) : this.stack = (new Error).stack.replace(/.+\n/, "")
        }
    }
    Object.defineProperty(t, "name", {
        value: "DOMException"
    }),
    self.DOMException = t,
    o("AudioContext") && (self.AudioContext = self.webkitAudioContext),
    void 0 === Object.hasOwn && Object.defineProperty(Object, "hasOwn", {
        value: (e,t)=>Object.prototype.hasOwnProperty.call(e, t)
    })
}
class r {
    constructor() {
        t(this, "t0"),
        t(this, "t1"),
        t(this, "isPaused"),
        this.t0 = 0,
        this.t1 = 0,
        this.isPaused = !0
    }
    get time() {
        return this.isPaused ? this.t0 : this.t0 + performance.now() - this.t1
    }
    get second() {
        return this.time / 1e3
    }
    play() {
        if (!this.isPaused)
            throw new Error("Time has been playing");
        this.t1 = performance.now(),
        this.isPaused = !1
    }
    pause() {
        if (this.isPaused)
            throw new Error("Time has been paused");
        this.t0 = this.time,
        this.isPaused = !0
    }
    reset() {
        this.t0 = 0,
        this.t1 = 0,
        this.isPaused = !0
    }
    addTime(e=0) {
        this.t0 += e
    }
}
function l(e, t) {
    const s = e.replace(/\ufeff|\r/g, "").split("\n")
      , n = [];
    for (const e of s) {
        let t = ""
          , s = !1
          , i = !1;
        const a = [];
        for (const n of e)
            if ('"' === n)
                s ? i ? (t += n,
                i = !1) : i = !0 : s = !0;
            else if ("," === n)
                s ? i ? (a.push(t),
                t = "",
                s = !1,
                i = !1) : t += n : (a.push(t),
                t = "");
            else {
                if (i)
                    throw new SyntaxError("Unexpected token , (-1)");
                t += n
            }
        if (s) {
            if (!i)
                throw new SyntaxError("Unexpected token , (-2)");
            a.push(t),
            t = "",
            s = !1,
            i = !1
        } else
            a.push(t),
            t = "";
        n.push(a)
    }
    if (!t)
        return n;
    const i = [];
    for (let e = 1; e < n.length; e++) {
        const t = {};
        for (let s = 0; s < n[0].length; s++)
            t[n[0][s]] = n[e][s];
        i.push(t)
    }
    return i
}
function c(e) {
    const t = ["utf-8", "gbk", "big5", "shift_jis"];
    for (const s of t) {
        const n = new TextDecoder(s,{
            fatal: !0
        });
        try {
            return n.decode(e)
        } catch (e) {
            if (s === t[t.length - 1])
                throw e
        }
    }
    throw new Error("Unknown encoding")
}
function h(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var d, f, u = {
    exports: {}
}, m = {
    exports: {}
};
d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
f = {
    rotl: function(e, t) {
        return e << t | e >>> 32 - t
    },
    rotr: function(e, t) {
        return e << 32 - t | e >>> t
    },
    endian: function(e) {
        if (e.constructor == Number)
            return 16711935 & f.rotl(e, 8) | 4278255360 & f.rotl(e, 24);
        for (var t = 0; t < e.length; t++)
            e[t] = f.endian(e[t]);
        return e
    },
    randomBytes: function(e) {
        for (var t = []; e > 0; e--)
            t.push(Math.floor(256 * Math.random()));
        return t
    },
    bytesToWords: function(e) {
        for (var t = [], s = 0, n = 0; s < e.length; s++,
        n += 8)
            t[n >>> 5] |= e[s] << 24 - n % 32;
        return t
    },
    wordsToBytes: function(e) {
        for (var t = [], s = 0; s < 32 * e.length; s += 8)
            t.push(e[s >>> 5] >>> 24 - s % 32 & 255);
        return t
    },
    bytesToHex: function(e) {
        for (var t = [], s = 0; s < e.length; s++)
            t.push((e[s] >>> 4).toString(16)),
            t.push((15 & e[s]).toString(16));
        return t.join("")
    },
    hexToBytes: function(e) {
        for (var t = [], s = 0; s < e.length; s += 2)
            t.push(parseInt(e.substr(s, 2), 16));
        return t
    },
    bytesToBase64: function(e) {
        for (var t = [], s = 0; s < e.length; s += 3)
            for (var n = e[s] << 16 | e[s + 1] << 8 | e[s + 2], i = 0; i < 4; i++)
                8 * s + 6 * i <= 8 * e.length ? t.push(d.charAt(n >>> 6 * (3 - i) & 63)) : t.push("=");
        return t.join("")
    },
    base64ToBytes: function(e) {
        e = e.replace(/[^A-Z0-9+\/]/gi, "");
        for (var t = [], s = 0, n = 0; s < e.length; n = ++s % 4)
            0 != n && t.push((d.indexOf(e.charAt(s - 1)) & Math.pow(2, -2 * n + 8) - 1) << 2 * n | d.indexOf(e.charAt(s)) >>> 6 - 2 * n);
        return t
    }
},
m.exports = f;
var p = m.exports
  , g = {
    utf8: {
        stringToBytes: function(e) {
            return g.bin.stringToBytes(unescape(encodeURIComponent(e)))
        },
        bytesToString: function(e) {
            return decodeURIComponent(escape(g.bin.bytesToString(e)))
        }
    },
    bin: {
        stringToBytes: function(e) {
            for (var t = [], s = 0; s < e.length; s++)
                t.push(255 & e.charCodeAt(s));
            return t
        },
        bytesToString: function(e) {
            for (var t = [], s = 0; s < e.length; s++)
                t.push(String.fromCharCode(e[s]));
            return t.join("")
        }
    }
}
  , v = g
  , b = function(e) {
    return null != e && (w(e) || function(e) {
        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && w(e.slice(0, 0))
    }(e) || !!e._isBuffer)
};
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
function w(e) {
    return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
}
!function() {
    var e = p
      , t = v.utf8
      , s = b
      , n = v.bin
      , i = function(a, o) {
        a.constructor == String ? a = o && "binary" === o.encoding ? n.stringToBytes(a) : t.stringToBytes(a) : s(a) ? a = Array.prototype.slice.call(a, 0) : !Array.isArray(a) && a.constructor !== Uint8Array && (a = a.toString());
        for (var r = e.bytesToWords(a), l = 8 * a.length, c = 1732584193, h = -271733879, d = -1732584194, f = 271733878, u = 0; u < r.length; u++)
            r[u] = 16711935 & (r[u] << 8 | r[u] >>> 24) | 4278255360 & (r[u] << 24 | r[u] >>> 8);
        r[l >>> 5] |= 128 << l % 32,
        r[14 + (l + 64 >>> 9 << 4)] = l;
        var m = i._ff
          , p = i._gg
          , g = i._hh
          , v = i._ii;
        for (u = 0; u < r.length; u += 16) {
            var b = c
              , w = h
              , y = d
              , x = f;
            c = m(c, h, d, f, r[u + 0], 7, -680876936),
            f = m(f, c, h, d, r[u + 1], 12, -389564586),
            d = m(d, f, c, h, r[u + 2], 17, 606105819),
            h = m(h, d, f, c, r[u + 3], 22, -1044525330),
            c = m(c, h, d, f, r[u + 4], 7, -176418897),
            f = m(f, c, h, d, r[u + 5], 12, 1200080426),
            d = m(d, f, c, h, r[u + 6], 17, -1473231341),
            h = m(h, d, f, c, r[u + 7], 22, -45705983),
            c = m(c, h, d, f, r[u + 8], 7, 1770035416),
            f = m(f, c, h, d, r[u + 9], 12, -1958414417),
            d = m(d, f, c, h, r[u + 10], 17, -42063),
            h = m(h, d, f, c, r[u + 11], 22, -1990404162),
            c = m(c, h, d, f, r[u + 12], 7, 1804603682),
            f = m(f, c, h, d, r[u + 13], 12, -40341101),
            d = m(d, f, c, h, r[u + 14], 17, -1502002290),
            c = p(c, h = m(h, d, f, c, r[u + 15], 22, 1236535329), d, f, r[u + 1], 5, -165796510),
            f = p(f, c, h, d, r[u + 6], 9, -1069501632),
            d = p(d, f, c, h, r[u + 11], 14, 643717713),
            h = p(h, d, f, c, r[u + 0], 20, -373897302),
            c = p(c, h, d, f, r[u + 5], 5, -701558691),
            f = p(f, c, h, d, r[u + 10], 9, 38016083),
            d = p(d, f, c, h, r[u + 15], 14, -660478335),
            h = p(h, d, f, c, r[u + 4], 20, -405537848),
            c = p(c, h, d, f, r[u + 9], 5, 568446438),
            f = p(f, c, h, d, r[u + 14], 9, -1019803690),
            d = p(d, f, c, h, r[u + 3], 14, -187363961),
            h = p(h, d, f, c, r[u + 8], 20, 1163531501),
            c = p(c, h, d, f, r[u + 13], 5, -1444681467),
            f = p(f, c, h, d, r[u + 2], 9, -51403784),
            d = p(d, f, c, h, r[u + 7], 14, 1735328473),
            c = g(c, h = p(h, d, f, c, r[u + 12], 20, -1926607734), d, f, r[u + 5], 4, -378558),
            f = g(f, c, h, d, r[u + 8], 11, -2022574463),
            d = g(d, f, c, h, r[u + 11], 16, 1839030562),
            h = g(h, d, f, c, r[u + 14], 23, -35309556),
            c = g(c, h, d, f, r[u + 1], 4, -1530992060),
            f = g(f, c, h, d, r[u + 4], 11, 1272893353),
            d = g(d, f, c, h, r[u + 7], 16, -155497632),
            h = g(h, d, f, c, r[u + 10], 23, -1094730640),
            c = g(c, h, d, f, r[u + 13], 4, 681279174),
            f = g(f, c, h, d, r[u + 0], 11, -358537222),
            d = g(d, f, c, h, r[u + 3], 16, -722521979),
            h = g(h, d, f, c, r[u + 6], 23, 76029189),
            c = g(c, h, d, f, r[u + 9], 4, -640364487),
            f = g(f, c, h, d, r[u + 12], 11, -421815835),
            d = g(d, f, c, h, r[u + 15], 16, 530742520),
            c = v(c, h = g(h, d, f, c, r[u + 2], 23, -995338651), d, f, r[u + 0], 6, -198630844),
            f = v(f, c, h, d, r[u + 7], 10, 1126891415),
            d = v(d, f, c, h, r[u + 14], 15, -1416354905),
            h = v(h, d, f, c, r[u + 5], 21, -57434055),
            c = v(c, h, d, f, r[u + 12], 6, 1700485571),
            f = v(f, c, h, d, r[u + 3], 10, -1894986606),
            d = v(d, f, c, h, r[u + 10], 15, -1051523),
            h = v(h, d, f, c, r[u + 1], 21, -2054922799),
            c = v(c, h, d, f, r[u + 8], 6, 1873313359),
            f = v(f, c, h, d, r[u + 15], 10, -30611744),
            d = v(d, f, c, h, r[u + 6], 15, -1560198380),
            h = v(h, d, f, c, r[u + 13], 21, 1309151649),
            c = v(c, h, d, f, r[u + 4], 6, -145523070),
            f = v(f, c, h, d, r[u + 11], 10, -1120210379),
            d = v(d, f, c, h, r[u + 2], 15, 718787259),
            h = v(h, d, f, c, r[u + 9], 21, -343485551),
            c = c + b >>> 0,
            h = h + w >>> 0,
            d = d + y >>> 0,
            f = f + x >>> 0
        }
        return e.endian([c, h, d, f])
    };
    i._ff = function(e, t, s, n, i, a, o) {
        var r = e + (t & s | ~t & n) + (i >>> 0) + o;
        return (r << a | r >>> 32 - a) + t
    }
    ,
    i._gg = function(e, t, s, n, i, a, o) {
        var r = e + (t & n | s & ~n) + (i >>> 0) + o;
        return (r << a | r >>> 32 - a) + t
    }
    ,
    i._hh = function(e, t, s, n, i, a, o) {
        var r = e + (t ^ s ^ n) + (i >>> 0) + o;
        return (r << a | r >>> 32 - a) + t
    }
    ,
    i._ii = function(e, t, s, n, i, a, o) {
        var r = e + (s ^ (t | ~n)) + (i >>> 0) + o;
        return (r << a | r >>> 32 - a) + t
    }
    ,
    i._blocksize = 16,
    i._digestsize = 16,
    u.exports = function(t, s) {
        if (null == t)
            throw new Error("Illegal argument " + t);
        var a = e.wordsToBytes(i(t, s));
        return s && s.asBytes ? a : s && s.asString ? n.bytesToString(a) : e.bytesToHex(a)
    }
}();
const y = h(u.exports);
function x() {
    return new Worker("" + new URL("./zip.js",import.meta.url).href)
}
class k extends EventTarget {
    constructor() {
        super(),
        t(this, "input"),
        this.input = Object.assign(document.createElement("input"), {
            type: "file",
            accept: "",
            multiple: !0,
            onchange: ()=>{
                this.fireChange(this.input.files);
                for (const e of this.input.files || []) {
                    const t = new FileReader;
                    t.readAsArrayBuffer(e),
                    t.onprogress = e=>this.fireProgress(e.loaded, e.total),
                    t.onload = t=>t.target && t.target.result instanceof ArrayBuffer && this.fireLoad(e, t.target.result)
                }
            }
        })
    }
    uploadFile() {
        this.input.webkitdirectory = !1,
        this.input.click()
    }
    uploadDir() {
        this.input.webkitdirectory = !0,
        this.input.click()
    }
    fireChange(e) {
        return this.dispatchEvent(Object.assign(new Event("change"), {
            files: e
        }))
    }
    fireProgress(e, t) {
        return this.dispatchEvent(new ProgressEvent("progress",{
            lengthComputable: !0,
            loaded: e,
            total: t
        }))
    }
    fireLoad(e, t) {
        return this.dispatchEvent(Object.assign(new ProgressEvent("load"), {
            file: e,
            buffer: t
        }))
    }
}
class S extends EventTarget {
    constructor({handler: e=(async e=>Promise.resolve(e))}) {
        super(),
        t(this, "total"),
        t(this, "worker"),
        t(this, "handler"),
        this.worker = null,
        this.total = 0,
        this.handler = e
    }
    read(e) {
        if (!this.worker) {
            this.dispatchEvent(new CustomEvent("loadstart"));
            const e = new x;
            e.addEventListener("message", (e=>{
                (async()=>{
                    const {data: t} = e;
                    this.total = t.total;
                    const s = await this.handler(t.data);
                    this.dispatchEvent(new CustomEvent("read",{
                        detail: s
                    }))
                }
                )().catch((e=>this.dispatchEvent(new CustomEvent("error",{
                    detail: e
                }))))
            }
            )),
            this.worker = e
        }
        this.worker.postMessage(e, [e.buffer])
    }
    terminate() {
        this.worker && (this.worker.terminate(),
        this.worker = null)
    }
}
function L(e) {
    const {pattern: t, type: s="binary", mustMatch: n=!1, weight: i=0, read: a} = e
      , o = {
        pattern: t,
        type: s,
        mustMatch: n,
        weight: i,
        read: a
    };
    return "text" === s && (o.read = async(e,t)=>{
        if (null == e.isText)
            try {
                e.text = c(e.buffer),
                e.isText = !0
            } catch {
                e.isText = !1
            }
        return e.isText ? a(e, t) : null
    }
    ),
    "json" === s && (o.read = async(e,t)=>{
        if (null == e.isText)
            try {
                e.text = c(e.buffer),
                e.isText = !0
            } catch {
                e.isText = !1
            }
        if (null == e.isJSON)
            try {
                e.data = JSON.parse(e.text),
                e.isJSON = !0
            } catch {
                e.isJSON = !1
            }
        return e.isJSON ? a(e, t) : null
    }
    ),
    o
}
const T = [L({
    pattern: /\.(mp3|ogg|wav|mp4|webm|ogv|mpg|mpeg|avi|mov|flv|wmv|mkv)$/i,
    read: async(e,t,{createAudioBuffer: s}={})=>async function(e, t) {
        const s = document.createElement("video");
        await new Promise((t=>{
            s.src = URL.createObjectURL(new Blob([e.buffer])),
            s.preload = "metadata",
            s.onloadedmetadata = t,
            s.onerror = t
        }
        ));
        const {videoWidth: n, videoHeight: i} = s
          , a = {
            audio: await t(e.buffer.slice(0)),
            video: n && i ? s : null
        };
        return {
            type: "media",
            name: e.name,
            data: a
        }
    }(e, (async e=>"function" == typeof s ? s(e) : async function(e) {
        const t = new self.AudioContext;
        return await t.close(),
        new Promise(((s,n)=>{
            const i = t.decodeAudioData(e, s, n);
            i instanceof Promise && i.then(s, n)
        }
        )).catch((e=>{
            throw null != e ? e : new DOMException("Unable to decode audio data","EncodingError")
        }
        ))
    }(e)))
}), L({
    pattern: /\.json$/i,
    type: "json",
    read(e) {
        const t = C(e.text, ((e,t)=>"number" == typeof t ? Math.fround(t) : t))
          , s = `PGS(${t.formatVersion})`;
        return {
            type: "chart",
            name: e.name,
            md5: y(e.text),
            data: t,
            format: s
        }
    }
}), L({
    pattern: /\.(png|jpg|jpeg|gif|bmp|webp|svg)$/i,
    async read(e) {
        const t = new Blob([e.buffer])
          , s = await createImageBitmap(t);
        return {
            type: "image",
            name: e.name,
            data: s
        }
    }
}), L({
    pattern: /^line\.csv$/i,
    type: "text",
    mustMatch: !0,
    read: (e,t)=>({
        type: "line",
        data: M(l(e.text, !0), t)
    })
}), L({
    pattern: /^info\.csv$/i,
    type: "text",
    mustMatch: !0,
    read: (e,t)=>({
        type: "info",
        data: M(l(e.text, !0), t)
    })
})];
const E = {
    readFile: async function(e, t={}) {
        const {name: s, path: n} = function(e) {
            const t = e.lastIndexOf("/")
              , s = e.slice(t + 1)
              , n = ~t ? e.slice(0, t) : "";
            return {
                name: s,
                path: n
            }
        }(e.name)
          , i = T.filter((e=>e.pattern.test(s) || !e.mustMatch));
        i.sort(((e,t)=>e.pattern.test(s) && !t.pattern.test(s) ? -1 : !e.pattern.test(s) && t.pattern.test(s) ? 1 : e.weight > t.weight ? -1 : e.weight < t.weight ? 1 : 0));
        const a = []
          , o = (e,t)=>{
            e.pattern.test(s) && a.push(t)
        }
        ;
        for (const s of i)
            try {
                const i = await s.read(e, n, t);
                if (i)
                    return i
            } catch (e) {
                o(s, e)
            }
        return {
            type: "unknown",
            name: s,
            data: T[0].pattern.test(s) ? a : ""
        }
    },
    use: e=>{
        T.push(e)
    }
};
function M(e, t) {
    if (!t)
        return e;
    for (const s of e)
        null != s.Chart && (s.Chart = `${t}/${s.Chart}`),
        null != s.Music && (s.Music = `${t}/${s.Music}`),
        null != s.Image && (s.Image = `${t}/${s.Image}`);
    return e
}
function C(e, t) {
    const s = "function" == typeof t ? JSON.parse(e, t) : JSON.parse(e);
    if (void 0 === s.formatVersion)
        throw new Error("Invalid chart file");
    switch (0 | Number(s.formatVersion)) {
    case 1:
        for (const e of s.judgeLineList)
            for (const t of e.judgeLineMoveEvents)
                t.start2 = t.start % 1e3 / 520,
                t.end2 = t.end % 1e3 / 520,
                t.start = Math.floor(t.start / 1e3) / 880,
                t.end = Math.floor(t.end / 1e3) / 880;
    case 3:
        for (const e of s.judgeLineList) {
            let t = 0
              , s = 0;
            for (const n of e.speedEvents)
                n.startTime < 0 && (n.startTime = 0),
                n.floorPosition = t,
                n.floorPosition2 = s,
                t += (n.endTime - n.startTime) / e.bpm * 1.875 * n.value,
                s += Math.fround(Math.fround((n.endTime - n.startTime) / e.bpm * 1.875) * n.value),
                t = Math.fround(t),
                s = Math.fround(s)
        }
    case 3473:
        for (const e of s.judgeLineList)
            if (null == e.numOfNotes) {
                e.numOfNotes = 0;
                for (const t of e.notesAbove)
                    1 === t.type && e.numOfNotes++,
                    2 === t.type && e.numOfNotes++,
                    3 === t.type && e.numOfNotes++,
                    4 === t.type && e.numOfNotes++;
                for (const t of e.notesBelow)
                    1 === t.type && e.numOfNotes++,
                    2 === t.type && e.numOfNotes++,
                    3 === t.type && e.numOfNotes++,
                    4 === t.type && e.numOfNotes++
            }
        if (null == s.numOfNotes) {
            s.numOfNotes = 0;
            for (const e of s.judgeLineList)
                s.numOfNotes += e.numOfNotes
        }
        break;
    default:
        throw new Error(`Unsupported formatVersion: ${s.formatVersion}`)
    }
    return s
}
var A;
(e=>{
    e.int = function(e) {
        return 0 | Number(e)
    }
    ,
    e.float = function(e) {
        return Number(e) || 0
    }
    ,
    e.bool = function(e) {
        return !!e
    }
    ,
    e.str = function(e) {
        return String(e)
    }
    ,
    e.arr = function(e, t) {
        return Array.isArray(e) ? e.map((e=>new t(e || {}))) : []
    }
}
)(A || (A = {}));
class I {
    constructor(e) {
        t(this, "startTime"),
        t(this, "endTime"),
        t(this, "value"),
        t(this, "floorPosition"),
        t(this, "floorPosition2"),
        this.startTime = A.int(e.startTime),
        this.endTime = A.int(e.endTime),
        this.value = A.float(e.value),
        this.floorPosition = A.float(e.floorPosition),
        this.floorPosition2 = A.float(e.floorPosition2)
    }
}
class B {
    constructor(e) {
        t(this, "type"),
        t(this, "time"),
        t(this, "positionX"),
        t(this, "holdTime"),
        t(this, "speed"),
        t(this, "floorPosition"),
        this.type = A.int(e.type),
        this.time = A.int(e.time),
        this.positionX = A.float(e.positionX),
        this.holdTime = A.int(e.holdTime),
        this.speed = A.float(e.speed),
        this.floorPosition = A.float(e.floorPosition)
    }
}
class R {
    constructor(e) {
        t(this, "startTime"),
        t(this, "endTime"),
        t(this, "start"),
        t(this, "end"),
        t(this, "start2"),
        t(this, "end2"),
        this.startTime = A.int(e.startTime),
        this.endTime = A.int(e.endTime),
        this.start = A.float(e.start),
        this.end = A.float(e.end),
        this.start2 = A.float(e.start2),
        this.end2 = A.float(e.end2)
    }
}
class P {
    constructor(e) {
        t(this, "numOfNotes"),
        t(this, "numOfNotesAbove"),
        t(this, "numOfNotesBelow"),
        t(this, "bpm"),
        t(this, "speedEvents"),
        t(this, "notesAbove"),
        t(this, "notesBelow"),
        t(this, "judgeLineDisappearEvents"),
        t(this, "judgeLineMoveEvents"),
        t(this, "judgeLineRotateEvents"),
        this.numOfNotes = A.int(e.numOfNotes),
        this.numOfNotesAbove = A.int(e.numOfNotesAbove),
        this.numOfNotesBelow = A.int(e.numOfNotesBelow),
        this.bpm = A.float(e.bpm),
        this.speedEvents = A.arr(e.speedEvents, I),
        this.notesAbove = A.arr(e.notesAbove, B),
        this.notesBelow = A.arr(e.notesBelow, B),
        this.judgeLineDisappearEvents = A.arr(e.judgeLineDisappearEvents, R),
        this.judgeLineMoveEvents = A.arr(e.judgeLineMoveEvents, R),
        this.judgeLineRotateEvents = A.arr(e.judgeLineRotateEvents, R)
    }
}
class O {
    constructor(e) {
        t(this, "formatVersion"),
        t(this, "offset"),
        t(this, "numOfNotes"),
        t(this, "judgeLineList"),
        this.formatVersion = A.int(e.formatVersion),
        this.offset = A.float(e.offset),
        this.numOfNotes = A.int(e.numOfNotes),
        this.judgeLineList = A.arr(e.judgeLineList, P)
    }
}
function F(e) {
    const t = e.map((e=>new R(e)));
    if (!t.length)
        return [new R({
            startTime: -999999,
            endTime: 1e9
        })];
    const s = [new R({
        startTime: -999999,
        endTime: 0,
        start: t[0].start,
        end: t[0].start,
        start2: t[0].start2,
        end2: t[0].start2
    })];
    t.push(new R({
        startTime: t[t.length - 1].endTime,
        endTime: 1e9,
        start: t[t.length - 1].end,
        end: t[t.length - 1].end,
        start2: t[t.length - 1].end2,
        end2: t[t.length - 1].end2
    }));
    for (const e of t) {
        if (e.startTime > e.endTime)
            continue;
        const t = s[s.length - 1];
        t.endTime > e.endTime || (t.endTime === e.startTime ? s.push(e) : t.endTime < e.startTime ? s.push(new R({
            startTime: t.endTime,
            endTime: e.startTime,
            start: t.end,
            end: t.end,
            start2: t.end2,
            end2: t.end2
        }), e) : t.endTime > e.startTime && s.push(new R({
            startTime: t.endTime,
            endTime: e.endTime,
            start: (e.start * (e.endTime - t.endTime) + e.end * (t.endTime - e.startTime)) / (e.endTime - e.startTime),
            end: t.end,
            start2: (e.start2 * (e.endTime - t.endTime) + e.end2 * (t.endTime - e.startTime)) / (e.endTime - e.startTime),
            end2: t.end2
        })))
    }
    const n = [s.shift()];
    for (const e of s) {
        const t = n[n.length - 1]
          , s = t.endTime - t.startTime
          , i = e.endTime - e.startTime;
        e.startTime === e.endTime || (t.end === e.start && t.end2 === e.start2 && (t.end - t.start) * i == (e.end - e.start) * s && (t.end2 - t.start2) * i == (e.end2 - e.start2) * s ? (t.endTime = e.endTime,
        t.end = e.end,
        t.end2 = e.end2) : n.push(e))
    }
    return n
}
function N(e) {
    const t = [];
    for (const s of e) {
        const e = t[t.length - 1];
        (null == e ? void 0 : e.value) === s.value ? e.endTime = s.endTime : t.push(s)
    }
    return t
}
class D {
    constructor(e, s, n, i) {
        t(this, "type"),
        t(this, "id"),
        t(this, "offsetX"),
        t(this, "offsetY"),
        t(this, "isActive"),
        t(this, "isTapped"),
        t(this, "isMoving"),
        t(this, "lastDeltaX"),
        t(this, "lastDeltaY"),
        t(this, "nowDeltaX"),
        t(this, "nowDeltaY"),
        t(this, "deltaTime"),
        t(this, "currentTime"),
        t(this, "flicking"),
        t(this, "flicked"),
        this.type = e,
        this.id = s,
        this.offsetX = n,
        this.offsetY = i,
        this.isActive = !0,
        this.isTapped = !1,
        this.isMoving = !1,
        this.lastDeltaX = 0,
        this.lastDeltaY = 0,
        this.nowDeltaX = 0,
        this.nowDeltaY = 0,
        this.deltaTime = 0,
        this.currentTime = performance.now(),
        this.flicking = !1,
        this.flicked = !1
    }
    move(e, t) {
        this.lastDeltaX = this.nowDeltaX,
        this.lastDeltaY = this.nowDeltaY,
        this.nowDeltaX = e - this.offsetX,
        this.nowDeltaY = t - this.offsetY,
        this.offsetX = e,
        this.offsetY = t;
        const s = performance.now();
        this.deltaTime = s - this.currentTime,
        this.currentTime = s,
        this.isMoving = !0;
        const n = (this.nowDeltaX * this.lastDeltaX + this.nowDeltaY * this.lastDeltaY) / Math.sqrt(this.lastDeltaX ** 2 + this.lastDeltaY ** 2) / this.deltaTime;
        this.flicking && n < .5 ? (this.flicking = !1,
        this.flicked = !1) : !this.flicking && n > 1 && (this.flicking = !0)
    }
}
class j {
    constructor(e, s, n, i) {
        t(this, "offsetX"),
        t(this, "offsetY"),
        t(this, "type"),
        t(this, "judged"),
        t(this, "event"),
        t(this, "preventBad"),
        this.offsetX = e,
        this.offsetY = s,
        this.type = 0 | n,
        this.judged = !1,
        this.event = i,
        this.preventBad = !1
    }
}
class H {
    constructor() {
        t(this, "level"),
        t(this, "noteRank"),
        t(this, "combos"),
        t(this, "maxcombo"),
        t(this, "combo"),
        t(this, "cumDisp"),
        t(this, "curDisp"),
        t(this, "numDisp"),
        t(this, "numOfNotes"),
        t(this, "data"),
        t(this, "id"),
        t(this, "format"),
        this.level = 0,
        this.noteRank = [0, 0, 0, 0, 0, 0, 0, 0],
        this.combos = [0, 0, 0, 0, 0],
        this.cumDisp = 0,
        this.curDisp = 0,
        this.numDisp = 0,
        this.maxcombo = 0,
        this.combo = 0,
        this.numOfNotes = 0,
        this.data = {},
        this.id = "",
        this.format = ""
    }
    get good() {
        return this.noteRank[7] + this.noteRank[3]
    }
    get bad() {
        return this.noteRank[6] + this.noteRank[2]
    }
    get great() {
        return this.noteRank[5] + this.noteRank[1]
    }
    get perfect() {
        return this.noteRank[4] + this.great
    }
    get all() {
        return this.perfect + this.good + this.bad
    }
    get scoreNum() {
        const e = 1e6 * (.9 * this.perfect + .585 * this.good + .1 * this.maxcombo) / this.numOfNotes;
        return isFinite(e) ? e : 0
    }
    get scoreStr() {
        const e = this.scoreNum.toFixed(0);
        return "0".repeat(e.length < 7 ? 7 - e.length : 0) + e
    }
    get accNum() {
        const e = (this.perfect + .65 * this.good) / this.all;
        return isFinite(e) ? e : 1
    }
    get accStr() {
        return `${(100 * this.accNum).toFixed(2)}％`
    }
    get avgDispStr() {
        const e = Math.trunc(this.cumDisp / this.numDisp * 1e3) || 0;
        return `${e > 0 ? "+" : ""}${e.toFixed(0)}ms`
    }
    get curDispStr() {
        const e = Math.trunc(1e3 * this.curDisp);
        return `${e > 0 ? "+" : ""}${e.toFixed(0)}ms`
    }
    get lineStatus() {
        return this.bad ? 0 : this.good ? 3 : 1
    }
    get rankStatus() {
        const e = Math.round(this.scoreNum);
        return e >= 1e6 ? 0 : e >= 96e4 ? 1 : e >= 92e4 ? 2 : e >= 88e4 ? 3 : e >= 82e4 ? 4 : e >= 7e5 ? 5 : 6
    }
    get localData() {
        return Math.round(1e4 * this.accNum + 566).toString(22).slice(-3) + Math.round(this.scoreNum + 40672).toString(32).slice(-4) + this.level.toString(36).slice(-1)
    }
    static removeLegacy(e) {
        const t = localStorage.getItem("phi");
        null != t && (localStorage.setItem(e, t),
        localStorage.removeItem("phi"))
    }
    getData(e, t="") {
        const s = this.data[this.id].slice(0, 3)
          , n = this.data[this.id].slice(3, 7)
          , i = Math.round(1e4 * this.accNum + 566).toString(22).slice(-3)
          , a = Math.round(this.scoreNum + 40672).toString(32).slice(-4)
          , o = this.level.toString(36).slice(-1)
          , r = parseInt(n, 32) - 40672
          , l = r.toFixed(0)
          , c = "0".repeat(l.length < 7 ? 7 - l.length : 0) + l;
        e || (this.data[this.id] = (s > i ? s : i) + (n > a ? n : a) + o);
        const h = [];
        for (const [e,t] of Object.entries(this.data))
            h.push(e + t);
        localStorage.setItem(`phi-${t}`, h.sort((()=>Math.random() - .5)).join(""));
        const d = {
            newBestColor: n < a ? "#18ffbf" : "#fff",
            newBestStr: n < a ? "NEW BEST" : "BEST",
            scoreBest: c,
            scoreDelta: `${n > a ? "- " : "+ "}${Math.abs(r - Math.round(this.scoreNum))}`,
            textAboveColor: "#65fe43",
            textAboveStr: "  ( Speed {SPEED}x )",
            textBelowColor: "#fe4365",
            textBelowStr: "AUTO PLAY"
        };
        return e ? Object.assign(d, {
            newBestColor: "#fff",
            newBestStr: "BEST",
            scoreDelta: ""
        }) : 1 === this.lineStatus ? Object.assign(d, {
            textBelowStr: "ALL  PERFECT",
            textBelowColor: "#ffc500"
        }) : 3 === this.lineStatus ? Object.assign(d, {
            textBelowStr: "FULL  COMBO",
            textBelowColor: "#00bef1"
        }) : Object.assign(d, {
            textBelowStr: ""
        })
    }
    reset(e, t, s, n="") {
        var i;
        const a = `phi-${n}`;
        this.numOfNotes = 0 | e,
        this.combo = 0,
        this.maxcombo = 0,
        this.noteRank = [0, 0, 0, 0, 0, 0, 0, 0],
        this.combos = [0, 0, 0, 0, 0],
        this.cumDisp = 0,
        this.curDisp = 0,
        this.numDisp = 0,
        "" === n && H.removeLegacy(a);
        const o = null !== (i = localStorage.getItem(a)) && void 0 !== i ? i : (localStorage.setItem(a, ""),
        "");
        for (let e = 0; e < Math.floor(o.length / 40); e++) {
            const t = o.slice(40 * e, 40 * e + 40);
            this.data[t.slice(0, 32)] = t.slice(-8)
        }
        t && (this.data[t] || (this.data[t] = this.localData),
        this.id = t),
        this.format = s
    }
    addCombo(e, t) {
        this.noteRank[e]++,
        this.combo = e % 4 == 2 ? 0 : this.combo + 1,
        this.combo > this.maxcombo && (this.maxcombo = this.combo),
        this.combos[0]++,
        this.combos[t]++
    }
    addDisp(e) {
        this.curDisp = e,
        this.cumDisp += e,
        this.numDisp++
    }
}
function $(e, t, s) {
    const n = document.createElement("canvas");
    Object.assign(n, {
        width: e,
        height: t
    });
    const i = n.getContext("2d", s);
    if (!i)
        throw new TypeError("Failed to create canvas context");
    return i
}
function X(e) {
    return X = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ,
    X(e)
}
var Y = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259]
  , V = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
function z(e, t, s, n, i, a) {
    if (!(isNaN(a) || a < 1)) {
        a |= 0;
        var o = function(e, t, s, n, i) {
            if ("string" == typeof e && (e = document.getElementById(e)),
            !e || "object" !== X(e) || !("getContext"in e))
                throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");
            var a = e.getContext("2d");
            try {
                return a.getImageData(t, s, n, i)
            } catch (e) {
                throw new Error("unable to access image data: " + e)
            }
        }(e, t, s, n, i);
        o = function(e, t, s, n, i, a) {
            for (var o, r = e.data, l = 2 * a + 1, c = n - 1, h = i - 1, d = a + 1, f = d * (d + 1) / 2, u = new _, m = u, p = 1; p < l; p++)
                m = m.next = new _,
                p === d && (o = m);
            m.next = u;
            for (var g = null, v = null, b = 0, w = 0, y = Y[a], x = V[a], k = 0; k < i; k++) {
                m = u;
                for (var S = r[w], L = r[w + 1], T = r[w + 2], E = r[w + 3], M = 0; M < d; M++)
                    m.r = S,
                    m.g = L,
                    m.b = T,
                    m.a = E,
                    m = m.next;
                for (var C = 0, A = 0, I = 0, B = 0, R = d * S, P = d * L, O = d * T, F = d * E, N = f * S, D = f * L, j = f * T, H = f * E, $ = 1; $ < d; $++) {
                    var X = w + ((c < $ ? c : $) << 2)
                      , z = r[X]
                      , U = r[X + 1]
                      , q = r[X + 2]
                      , W = r[X + 3]
                      , J = d - $;
                    N += (m.r = z) * J,
                    D += (m.g = U) * J,
                    j += (m.b = q) * J,
                    H += (m.a = W) * J,
                    C += z,
                    A += U,
                    I += q,
                    B += W,
                    m = m.next
                }
                g = u,
                v = o;
                for (var Z = 0; Z < n; Z++) {
                    var G = H * y >> x;
                    if (r[w + 3] = G,
                    0 !== G) {
                        var K = 255 / G;
                        r[w] = (N * y >> x) * K,
                        r[w + 1] = (D * y >> x) * K,
                        r[w + 2] = (j * y >> x) * K
                    } else
                        r[w] = r[w + 1] = r[w + 2] = 0;
                    N -= R,
                    D -= P,
                    j -= O,
                    H -= F,
                    R -= g.r,
                    P -= g.g,
                    O -= g.b,
                    F -= g.a;
                    var Q = Z + a + 1;
                    Q = b + (Q < c ? Q : c) << 2,
                    N += C += g.r = r[Q],
                    D += A += g.g = r[Q + 1],
                    j += I += g.b = r[Q + 2],
                    H += B += g.a = r[Q + 3],
                    g = g.next;
                    var ee = v
                      , te = ee.r
                      , se = ee.g
                      , ne = ee.b
                      , ie = ee.a;
                    R += te,
                    P += se,
                    O += ne,
                    F += ie,
                    C -= te,
                    A -= se,
                    I -= ne,
                    B -= ie,
                    v = v.next,
                    w += 4
                }
                b += n
            }
            for (var ae = 0; ae < n; ae++) {
                var oe = r[w = ae << 2]
                  , re = r[w + 1]
                  , le = r[w + 2]
                  , ce = r[w + 3]
                  , he = d * oe
                  , de = d * re
                  , fe = d * le
                  , ue = d * ce
                  , me = f * oe
                  , pe = f * re
                  , ge = f * le
                  , ve = f * ce;
                m = u;
                for (var be = 0; be < d; be++)
                    m.r = oe,
                    m.g = re,
                    m.b = le,
                    m.a = ce,
                    m = m.next;
                for (var we = n, ye = 0, xe = 0, ke = 0, Se = 0, Le = 1; Le <= a; Le++) {
                    w = we + ae << 2;
                    var Te = d - Le;
                    me += (m.r = oe = r[w]) * Te,
                    pe += (m.g = re = r[w + 1]) * Te,
                    ge += (m.b = le = r[w + 2]) * Te,
                    ve += (m.a = ce = r[w + 3]) * Te,
                    Se += oe,
                    ye += re,
                    xe += le,
                    ke += ce,
                    m = m.next,
                    Le < h && (we += n)
                }
                w = ae,
                g = u,
                v = o;
                for (var Ee = 0; Ee < i; Ee++) {
                    var Me = w << 2;
                    r[Me + 3] = ce = ve * y >> x,
                    ce > 0 ? (ce = 255 / ce,
                    r[Me] = (me * y >> x) * ce,
                    r[Me + 1] = (pe * y >> x) * ce,
                    r[Me + 2] = (ge * y >> x) * ce) : r[Me] = r[Me + 1] = r[Me + 2] = 0,
                    me -= he,
                    pe -= de,
                    ge -= fe,
                    ve -= ue,
                    he -= g.r,
                    de -= g.g,
                    fe -= g.b,
                    ue -= g.a,
                    Me = ae + ((Me = Ee + d) < h ? Me : h) * n << 2,
                    me += Se += g.r = r[Me],
                    pe += ye += g.g = r[Me + 1],
                    ge += xe += g.b = r[Me + 2],
                    ve += ke += g.a = r[Me + 3],
                    g = g.next,
                    he += oe = v.r,
                    de += re = v.g,
                    fe += le = v.b,
                    ue += ce = v.a,
                    Se -= oe,
                    ye -= re,
                    xe -= le,
                    ke -= ce,
                    v = v.next,
                    w += n
                }
            }
            return e
        }(o, 0, 0, n, i, a),
        e.getContext("2d").putImageData(o, t, s)
    }
}
var U, _ = function e() {
    (function(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    )(this, e),
    this.r = 0,
    this.g = 0,
    this.b = 0,
    this.a = 0,
    this.next = null
};
function q(e) {
    const t = $(1, 1);
    return t.fillStyle = e,
    t.fillRect(0, 0, 1, 1),
    t.getImageData(0, 0, 1, 1).data
}
async function W(e, t, s=512) {
    const n = q(t)
      , i = $(e.width, e.height, {
        willReadFrequently: !0
    });
    i.drawImage(e, 0, 0);
    for (let t = 0; t < e.height; t += s)
        for (let a = 0; a < e.width; a += s) {
            const e = i.getImageData(a, t, s, s);
            for (let t = 0; t < e.data.length / 4; t++)
                e.data[4 * t] *= n[0] / 255,
                e.data[4 * t + 1] *= n[1] / 255,
                e.data[4 * t + 2] *= n[2] / 255,
                e.data[4 * t + 3] *= n[3] / 255;
            i.putImageData(e, a, t)
        }
    return createImageBitmap(i.canvas)
}
async function J(e, t, s) {
    const n = Math.floor(null != t ? t : Math.min(e.width, e.height))
      , i = Math.floor(null != s ? s : n)
      , a = [];
    for (let t = 0; t < e.height; t += i)
        for (let s = 0; s < e.width; s += n)
            a.push(createImageBitmap(e, s, t, n, i));
    return Promise.all(a)
}
(e=>{
    e.decode = function(e, t=0) {
        const s = $(e.width - 2 * t, e.height - 2 * t);
        s.drawImage(e, -t, -t);
        const n = s.getImageData(0, 0, s.canvas.width, s.canvas.width)
          , i = new Uint8Array(n.data.length / 4 * 3);
        for (let e = 0; e < i.length; e++)
            i[e] = n.data[4 * (e / 3 | 0) + e % 3] ^ 3473 * e;
        const a = new DataView(i.buffer,0,4).getUint32(0);
        return i.buffer.slice(4, a + 4)
    }
    ,
    e.decodeAlt = function(e) {
        const t = $(e.width, e.height);
        t.drawImage(e, 0, 0);
        const s = t.getImageData(0, 0, t.canvas.width, t.canvas.height)
          , n = new Uint8Array(s.data.length / 4 * 3)
          , i = (e=0,t=0)=>e ^ t ** 2 * 3473 & 255;
        for (let e = 0; e < n.length; e++)
            n[e] = s.data[4 * (e / 3 | 0) + e % 3];
        const a = new Uint8Array(n.length / 2);
        for (let e = 0; e < n.length / 2; e++)
            a[e] = i((n[2 * e] + 8) / 17 << 4 | (n[2 * e + 1] + 8) / 17, e);
        const o = new DataView(a.buffer,0,4).getUint32(0);
        return a.buffer.slice(4, o + 4)
    }
}
)(U || (U = {}));
class Z {
    constructor(e, s=!1) {
        t(this, "container"),
        t(this, "checkbox"),
        t(this, "label"),
        this.container = document.createElement("div"),
        this.checkbox = document.createElement("input"),
        this.checkbox.type = "checkbox",
        this.checkbox.id = Utils.randomUUID(),
        this.checkbox.checked = s,
        this.label = document.createElement("label"),
        this.label.htmlFor = this.checkbox.id,
        this.label.textContent = e,
        this.container.appendChild(this.checkbox),
        this.container.appendChild(this.label)
    }
    get checked() {
        return this.checkbox.checked
    }
    set checked(e) {
        this.checkbox.checked = e,
        this.checkbox.dispatchEvent(new Event("change"))
    }
    appendTo(e) {
        return e.appendChild(this.container),
        this
    }
    appendBefore(e) {
        if (null == e.parentNode)
            throw new Error("Node must have a parent node");
        return e.parentNode.insertBefore(this.container, e),
        this
    }
    toggle() {
        this.checked = !this.checkbox.checked
    }
    hook(e=((e,t)=>{}
    )) {
        return e(this.checkbox, this.container),
        this
    }
}
class G extends Array {
    constructor({updateCallback: e=((...e)=>!1), iterateCallback: s=((...e)=>{}
    )}={}) {
        super(),
        t(this, "update"),
        t(this, "animate"),
        this.update = this.defilter.bind(this, e),
        this.animate = this.iterate.bind(this, s)
    }
    defilter(e) {
        let t = this.length;
        for (; t--; )
            e(this[t]) && this.splice(t, 1);
        return this
    }
    iterate(e) {
        for (const t of this)
            e(t)
    }
    add(e) {
        this[this.length] = e
    }
    clear() {
        this.length = 0
    }
}
class K {
    constructor(e, s, n, i) {
        t(this, "offsetX"),
        t(this, "offsetY"),
        t(this, "color"),
        t(this, "text"),
        t(this, "time"),
        this.offsetX = e,
        this.offsetY = s,
        this.color = n,
        this.text = i,
        this.time = 0
    }
    static tap(e, t) {
        return new K(e,t,"cyan","")
    }
    static hold(e, t) {
        return new K(e,t,"lime","")
    }
    static move(e, t) {
        return new K(e,t,"violet","")
    }
}
class Q {
    constructor(e, s, n, i) {
        t(this, "offsetX"),
        t(this, "offsetY"),
        t(this, "time"),
        t(this, "duration"),
        t(this, "effects"),
        t(this, "direction"),
        t(this, "color");
        const a = gs.hitFX[n];
        this.offsetX = e || 0,
        this.offsetY = s || 0,
        this.time = performance.now(),
        this.duration = a.duration,
        this.effects = a.effects,
        this.direction = Array(a.numOfParts || 0).fill(0).map((()=>[80 * Math.random() + 185, 2 * Math.random() * Math.PI])),
        this.color = i
    }
    static perfect(e, t, s) {
        return new Q(e,t,"Perfect","#ffeca0")
    }
    static good(e, t, s) {
        return new Q(e,t,"Good","#b4e1ff")
    }
}
class ee {
    constructor(e, s, n, i) {
        t(this, "offsetX"),
        t(this, "offsetY"),
        t(this, "time"),
        t(this, "duration"),
        t(this, "color"),
        t(this, "text"),
        this.offsetX = e || 0,
        this.offsetY = s || 0,
        this.time = performance.now(),
        this.duration = 250,
        this.color = n,
        this.text = i
    }
    static early(e, t) {
        return new ee(e,t,"#03aaf9","Early")
    }
    static late(e, t) {
        return new ee(e,t,"#ff4612","Late")
    }
}
class te {
    constructor(e, s, n=!1) {
        t(this, "full"),
        t(this, "head"),
        t(this, "body"),
        t(this, "tail");
        const i = -e.width / 2 * s
          , a = -e.height / 2 * s
          , o = e.width * s
          , r = e.height * s;
        this.full = t=>t.drawImage(e, i, a, o, r),
        this.head = t=>t.drawImage(e, i, 0, o, r),
        this.body = (t,s,n)=>t.drawImage(e, i, s, o, n),
        this.tail = (t,s)=>t.drawImage(e, i, s - r, o, r),
        n && (this.head = t=>t.drawImage(e, i, a, o, r),
        this.tail = (t,s)=>t.drawImage(e, i, s - r - a, o, r))
    }
}
async function se({messageCallback: e=(e=>{}
), warnCallback: t=(e=>{}
), errorCallback: s=((e,t,s)=>{}
), mobileCallback: i=(()=>{}
), orientNotSupportCallback: r=(()=>{}
)}={}) {
    const l = (e,t)=>{
        const n = (e=>null === e ? "Null" : void 0 === e ? "Undefined" : e.constructor.name)(e);
        let i = String(e)
          , a = String(e);
        if (e instanceof Error) {
            var o;
            const t = null !== (o = e.stack) && void 0 !== o ? o : "Stack not available";
            i = e.name === n ? e.message : `${e.name}: ${e.message}`;
            const s = t.indexOf(i) + 1;
            a = s ? `${i}\n ${t.slice(s + i.length)}` : `${i}\n    ${t.split("\n").join("\n    ")}`
        }
        null != t && (i = t);
        const r = `[${n}] ${i.split("\n")[0]}`
          , l = `[${n}] ${a}`;
        s(r, Utils.escapeHTML(l))
    }
    ;
    self.addEventListener("error", (e=>l(e.error, e.message))),
    self.addEventListener("unhandledrejection", (e=>l(e.reason)));
    const c = async(t,n,i)=>{
        if (!i())
            return !0;
        const a = `错误：${t}组件加载失败（点击查看详情）`
          , o = `${t}组件加载失败，请检查您的网络连接然后重试：`
          , r = `${t}组件加载失败，请检查浏览器兼容性`;
        return e(`加载 ${t}组件...`),
        await function(...e) {
            const t = Array.from(e[0]instanceof Array ? e[0] : e, (e=>new URL(e,location).href))
              , s = function*(e) {
                yield*e
            }(t)
              , n = e=>new Promise(((i,a)=>{
                if (!e)
                    return void a(new DOMException(`All urls are invalid\n ${t.join("\n")}`,"NetworkError"));
                const o = document.createElement("script");
                o.onload = ()=>i(o),
                o.onerror = ()=>n(s.next().value).then((e=>i(e))).catch((e=>a(e))),
                o.src = e,
                location.port || (o.crossOrigin = "anonymous"),
                document.head.appendChild(o)
            }
            ));
            return n(s.next().value)
        }(n).catch((e=>s(a, e.message.replace(/.+/, o), !0))),
        !i() || (s(a, r, !0),
        !1)
    }
    ;
    if (await Utils.addFont("Titillium Web", {
        alt: "Custom"
    }),
    e("检查浏览器兼容性..."),
    (void 0 !== navigator.standalone || navigator.platform.includes("Linux") && 5 === navigator.maxTouchPoints) && i(),
    function(e) {
        if (navigator.userAgent.includes("MiuiBrowser")) {
            const t = /MiuiBrowser\/(\d+\.\d+)/.exec(navigator.userAgent)
              , s = "检测到小米浏览器且版本低于17.4，可能存在切后台声音消失的问题";
            (null == t || parseFloat(t[1]) < 17.4) && e(s)
        }
    }(t),
    !await c("ImageBitmap兼容", "/lib/createImageBitmap.js", (()=>o("createImageBitmap"))))
        return -1;
    e("加载声音组件...");
    const h = "" !== (new Audio).canPlayType("audio/ogg");
    if (!await c("ogg格式兼容", "/lib/oggmented-bundle.js", (()=>!h && o("oggmented"))))
        return -4;
    n.init(h ? self.AudioContext : self.oggmented.OggmentedAudioContext);
    const d = document.createElement("canvas").toDataURL("image/webp").includes("data:image/webp");
    return await c("webp格式兼容", "/lib/webp-bundle.js", (()=>!d && o("webp"))) ? (await async function(e) {
        await a.checkSupport() || e()
    }(r),
    0) : -5
}
function ne(e, t, s) {
    const {width: n, height: i} = e
      , {width: a, height: o} = t;
    return a * i > o * n ? [a * (1 - s) / 2, (o - a * i / n * s) / 2, a * s, a * i / n * s] : [(a - o * n / i * s) / 2, o * (1 - s) / 2, o * n / i * s, o * s]
}
class ie {
    constructor(e) {
        t(this, "host"),
        t(this, "code"),
        t(this, "name"),
        t(this, "target"),
        t(this, "list"),
        t(this, "updateHTML"),
        this.host = e.host,
        this.code = e.code,
        this.name = e.name,
        this.target = e.target,
        this.list = [e],
        this.updateHTML = ()=>{}
    }
    appendMessage(e) {
        return this.host === e.host && this.code === e.code && this.name === e.name && this.target === e.target && (this.list.push(e),
        this.updateHTML(),
        !0)
    }
}
class ae {
    constructor() {
        t(this, "lastMessage", ""),
        t(this, "betterMessageBoxes"),
        this.betterMessageBoxes = []
    }
    addBox(e="warn") {
        const t = document.createElement("div");
        return t.setAttribute("type", e),
        t.classList.add("msgbox"),
        this.nodeView.appendChild(t)
    }
    removeNodeBox(e) {
        e.remove(),
        this.updateText(this.lastMessage)
    }
    removeBetterMessageBox(e) {
        const t = this.betterMessageBoxes.indexOf(e);
        -1 !== t && this.betterMessageBoxes.splice(t, 1)
    }
    msgbox(e="", t="", s=!1) {
        const n = this.addBox(t);
        n.innerHTML = e;
        const i = document.createElement("a");
        i.innerText = "忽略",
        i.style.float = "right",
        i.onclick = ()=>this.removeNodeBox(n),
        i.classList.toggle("disabled", s),
        n.appendChild(i)
    }
    bmsgbox(e) {
        const t = new ie(e)
          , s = {
            page: 1,
            size: 5,
            get pages() {
                return Math.ceil(t.list.length / this.size)
            }
        }
          , n = document.createTextNode("")
          , i = document.createElement("a");
        i.innerText = "全部忽略",
        i.classList.add("bm-rbtn");
        const a = document.createElement("span");
        a.textContent = String(s.page),
        a.contentEditable = "true",
        a.style.cssText = ";color:red;outline:none;text-decoration:underline";
        const o = document.createElement("span");
        o.textContent = String(s.pages);
        const r = document.createElement("a");
        r.innerText = "上一页";
        const l = document.createElement("a");
        l.innerText = "下一页";
        const c = document.createElement("div");
        c.classList.add("bm-item"),
        c.append(a, " / ", o, " 页 ", r, " ", l);
        const h = this.addBox(["notice", "warn", "error"][t.code]);
        h.append(n, i, c),
        i.setAttribute("bm-ctrl", ""),
        c.setAttribute("bm-ctrl", "");
        const d = e=>{
            isNaN(e) || (s.page = Math.max(1, Math.min(e, s.pages))),
            a.textContent = String(s.page),
            t.updateHTML()
        }
        ;
        a.onblur = ()=>d(parseInt(a.textContent)),
        r.onclick = ()=>d(s.page - 1),
        l.onclick = ()=>d(s.page + 1),
        i.onclick = ()=>{
            this.removeBetterMessageBox(t),
            this.removeNodeBox(h)
        }
        ;
        let f = 0;
        return t.updateHTML = ()=>{
            clearTimeout(f),
            f = self.setTimeout((()=>{
                const {pages: e} = s;
                s.page > e && (s.page = e);
                const i = (s.page - 1) * s.size;
                n.textContent = `${t.code ? `${t.host}: 检测到 ${t.list.length}个 ${t.name}\n` : ""}来自 ${t.target}`,
                a.textContent = String(s.page),
                o.textContent = String(e);
                for (const t of h.querySelectorAll("[bm-ctrl]"))
                    t.classList.toggle("hide", e <= 1);
                for (const e of h.querySelectorAll("[bm-cell]"))
                    e.remove();
                for (const e of t.list.slice(i, i + s.size)) {
                    const s = document.createElement("a");
                    s.innerText = "忽略",
                    s.classList.add("bm-rbtn"),
                    s.onclick = ()=>{
                        t.list.splice(t.list.indexOf(e), 1),
                        t.updateHTML(),
                        0 === t.list.length ? (this.removeBetterMessageBox(t),
                        this.removeNodeBox(h)) : this.updateText(this.lastMessage)
                    }
                    ;
                    const n = document.createElement("div");
                    n.setAttribute("bm-cell", ""),
                    n.classList.add("bm-item"),
                    n.append(`${e.name}: ${e.message}`, s),
                    h.appendChild(n)
                }
            }
            ))
        }
        ,
        this.betterMessageBoxes.push(t),
        t
    }
    getBetterMessageBox(e) {
        for (const t of this.betterMessageBoxes)
            if (t.appendMessage(e))
                return t;
        return this.bmsgbox(e)
    }
    updateText(e="", t="") {
        const s = this.nodeView.querySelectorAll(".msgbox[type=warn]").length + this.betterMessageBoxes.reduce(((e,t)=>e + t.list.length - 1), 0);
        "error" === t ? (this.nodeText.className = "error",
        this.nodeText.innerText = e) : (this.nodeText.className = s ? "warning" : "accept",
        this.nodeText.innerText = e + (s ? `（发现 ${s}个问题，点击查看）` : ""),
        this.lastMessage = e)
    }
    sendWarning(e="", t=!1) {
        "string" == typeof e ? this.msgbox(t ? e : Utils.escapeHTML(e), "warn") : this.getBetterMessageBox(e).updateHTML(),
        this.updateText(this.lastMessage)
    }
    sendError(e="", t="", s=!1) {
        if (t) {
            const e = /([A-Za-z][A-Za-z+-.]{2,}:\/\/|www\.)[^\s\x00-\x20\x7f-\x9f"]{2,}[^\s\x00-\x20\x7f-\x9f"!'),.:;?\]}]/g
              , n = t.replace(e, ((e="")=>{
                const t = e.startsWith("www.") ? `//${e}` : e
                  , s = e.replace(`${location.origin}/`, "");
                return e.includes(location.origin) ? `<a href="#"style="color:#023b8f;text-decoration:underline;">${s}</a>` : `<a href="${t}"target="_blank"style="color:#023b8f;text-decoration:underline;">${s}</a>`
            }
            ));
            this.msgbox(n, "error", s)
        }
        this.updateText(e, "error")
    }
}
self._i = ["Phixos", "1.5.3".split("."), 1611795955, 1695344069];
const oe = e=>document.getElementById(e) || (()=>{
    throw new Error(`Cannot find element: ${e}`)
}
)()
  , re = e=>document.body.querySelector(e)
  , le = oe("view-nav")
  , ce = oe("view-cfg")
  , he = oe("view-msg")
  , de = oe("cover-dark")
  , fe = oe("cover-rsmg")
  , ue = oe("cover-view")
  , me = oe("btn-rsmg")
  , pe = oe("btn-docs")
  , ge = oe("btn-more")
  , ve = oe("nav-cfg")
  , be = oe("nav-msg")
  , we = oe("msg-out")
  , ye = oe("uploader")
  , xe = oe("stage")
  , ke = oe("select-note-scale")
  , Se = oe("select-aspect-ratio")
  , Le = oe("select-background-dim")
  , Te = oe("highLight")
  , Ee = oe("input-offset")
  , Me = oe("lineColor")
  , Ce = oe("autoplay")
  , Ae = oe("showTransition")
  , Ie = oe("feedback")
  , Be = oe("imageBlur")
  , Re = oe("select-bg")
  , Pe = oe("btn-play")
  , Oe = oe("btn-pause")
  , Fe = oe("select-bgm")
  , Ne = oe("select-chart")
  , De = oe("select-flip")
  , je = oe("select-speed")
  , He = oe("input-name")
  , $e = oe("input-artist")
  , Xe = oe("input-charter")
  , Ye = oe("input-illustrator")
  , Ve = oe("select-difficulty")
  , ze = oe("select-level")
  , Ue = oe("select-volume")
  , _e = oe("uploader-select")
  , qe = oe("uploader-upload")
  , We = oe("uploader-file")
  , Je = oe("uploader-dir")
  , Ze = oe("select")
  , Ge = oe("mask")
  , Ke = {
    easeInSine: e=>1 - Math.cos(e * Math.PI / 2),
    easeOutSine: e=>Math.sin(e * Math.PI / 2),
    easeOutCubic: e=>1 + (e - 1) ** 3
}
  , Qe = (e=0)=>`${Math.floor(e / 60)}:${`00 ${Math.floor(e % 60)}`.slice(-2)}`
  , et = {
    modify: e=>e,
    pressTime: 0
};
et.before = new Map,
et.now = new Map,
et.after = new Map,
et.filter = null,
et.filterOptions = {},
document.oncontextmenu = e=>e.preventDefault();
for (const e of le.children)
    e.addEventListener("click", (function() {
        for (const e of le.children)
            e.classList.toggle("active", e === this);
        ce.classList.toggle("hide", "nav-cfg" !== this.id),
        he.classList.toggle("hide", "nav-msg" !== this.id)
    }
    ));
de.addEventListener("click", (()=>{
    de.classList.add("fade"),
    fe.classList.add("fade"),
    ue.classList.add("fade")
}
)),
me.addEventListener("click", (()=>{
    de.classList.remove("fade"),
    fe.classList.remove("fade")
}
)),
pe.addEventListener("click", (()=>{
    et.fireModal("<p>提示</p>", '<p><a href="https://docs.lchzh.net/project/sim-phi-core" target="_blank">点击此处</a>查看使用说明</p>')
}
)),
ge.addEventListener("click", (()=>{
    de.classList.remove("fade"),
    ue.classList.remove("fade"),
    ve.click()
}
)),
we.addEventListener("click", (()=>{
    de.classList.remove("fade"),
    ue.classList.remove("fade"),
    be.click()
}
));
const tt = new class extends ae {
    constructor() {
        super(...arguments),
        t(this, "nodeView", he),
        t(this, "nodeText", we)
    }
}
  , st = tt.updateText.bind(tt)
  , nt = tt.sendWarning.bind(tt)
  , it = tt.sendError.bind(tt)
  , at = new H
  , ot = new class {
    constructor(e) {
        t(this, "aspectRatio"),
        t(this, "isFull"),
        t(this, "stage"),
        this.aspectRatio = 0,
        this.isFull = !1,
        this.stage = e,
        this.resize()
    }
    resize(e=0) {
        this.aspectRatio = e || this.aspectRatio || 16 / 9;
        const t = Math.min(854, .8 * document.documentElement.clientWidth)
          , s = t / this.aspectRatio;
        this.isFull ? this.stage.style.cssText = ";position:fixed;top:0;left:0;bottom:0;right:0" : this.stage.style.cssText = `;width:${t.toFixed()}px;height:${s.toFixed()}px`
    }
    getFull() {
        return this.isFull
    }
    setFull(e) {
        return this.isFull = e
    }
}
(xe)
  , rt = new class {
    constructor(e) {
        if (t(this, "stage"),
        t(this, "canvas"),
        t(this, "ctx"),
        t(this, "canvasfg"),
        t(this, "ctxfg"),
        t(this, "wlen"),
        t(this, "hlen"),
        t(this, "scaleX"),
        t(this, "scaleY"),
        t(this, "width"),
        t(this, "height"),
        t(this, "matX"),
        t(this, "matY"),
        t(this, "matR"),
        t(this, "speed"),
        t(this, "lineScale"),
        t(this, "noteScale"),
        t(this, "noteScaleRatio"),
        t(this, "brightness"),
        t(this, "multiHint"),
        t(this, "playMode"),
        t(this, "musicVolume"),
        t(this, "soundVolume"),
        t(this, "enableFR"),
        t(this, "enableVP"),
        t(this, "lowResFactor"),
        t(this, "lines"),
        t(this, "notes"),
        t(this, "taps"),
        t(this, "drags"),
        t(this, "flicks"),
        t(this, "holds"),
        t(this, "linesReversed"),
        t(this, "notesReversed"),
        t(this, "tapsReversed"),
        t(this, "dragsReversed"),
        t(this, "flicksReversed"),
        t(this, "holdsReversed"),
        t(this, "tapholds"),
        t(this, "chart"),
        t(this, "bgImage"),
        t(this, "bgImageBlur"),
        t(this, "bgMusic"),
        t(this, "bgVideo"),
        t(this, "_mirrorType"),
        t(this, "initialized"),
        !(e instanceof HTMLDivElement))
            throw new Error("Not a container");
        const s = ()=>{
            throw new Error("Failed to initialize canvas")
        }
        ;
        this.stage = e,
        this.canvas = document.createElement("canvas"),
        this.ctx = this.canvas.getContext("2d", {
            alpha: !1
        }) || s(),
        this.canvasfg = document.createElement("canvas"),
        this.ctxfg = this.canvasfg.getContext("2d") || s(),
        this.stage.appendChild(this.canvas),
        this.canvas.style.cssText = ";position:absolute;top:0px;left:0px;right:0px;bottom:0px",
        console.log("Hello, Phixos!"),
        this.speed = 1,
        this.lineScale = 57.6,
        this.noteScale = 1,
        this.noteScaleRatio = 8e3,
        this.brightness = .6,
        this.multiHint = !0,
        this.playMode = 1,
        this.musicVolume = 1,
        this.soundVolume = 1,
        this._mirrorType = 0,
        this.enableFR = !1,
        this.enableVP = !1,
        this.chart = null,
        this.bgImage = null,
        this.bgImageBlur = null,
        this.bgMusic = null,
        this.bgVideo = null,
        this.lines = [],
        this.notes = [],
        this.taps = [],
        this.drags = [],
        this.flicks = [],
        this.holds = [],
        this.linesReversed = [],
        this.notesReversed = [],
        this.tapsReversed = [],
        this.dragsReversed = [],
        this.flicksReversed = [],
        this.holdsReversed = [],
        this.tapholds = [],
        this.lowResFactor = 1,
        this.width = 0,
        this.height = 0,
        this.wlen = 0,
        this.hlen = 0,
        this.scaleX = 0,
        this.scaleY = 0,
        this.matX = e=>e,
        this.matY = e=>e,
        this.matR = e=>e,
        this.initialized = !1,
        this._setLowResFactor(1),
        this.resizeCanvas()
    }
    setNoteScale(e=1) {
        this.noteScale = e,
        this.noteScaleRatio = this.canvasfg.width * this.noteScale / 8080
    }
    setLowResFactor(e=1) {
        this._setLowResFactor(e),
        this._resizeCanvas()
    }
    resizeCanvas() {
        const {clientWidth: e, clientHeight: t} = this.stage;
        this.width === e && this.height === t || (this.width = e,
        this.height = t,
        this.canvas.style.cssText += `;width:${e}px;height:${t}px`,
        this._resizeCanvas())
    }
    mirrorView(e=this._mirrorType) {
        const t = 3 & e;
        this._mirrorType = t,
        this.transformView(1 & t ? -1 : 1, 2 & t ? -1 : 1, 0, 0)
    }
    transformView(e=1, t=1, s=0, n=0) {
        const {canvasfg: i} = this
          , a = i.width * e
          , o = .5 * (i.width - a)
          , r = -i.height * t
          , l = .5 * (i.height - r)
          , c = -Math.sign(e * t) * Math.PI / 180
          , h = t > 0 ? 0 : Math.PI
          , d = Math.sign(t) * a * .05625
          , f = Math.sign(t) * -r * .6;
        this.matX = e=>o + a * (e - s),
        this.matY = e=>l + r * (e - n),
        this.matR = e=>h + c * e,
        this.scaleX = d,
        this.scaleY = f,
        this.initialized = !0
    }
    prerenderChart(e) {
        this.lines.length = 0,
        this.notes.length = 0,
        this.taps.length = 0,
        this.drags.length = 0,
        this.flicks.length = 0,
        this.holds.length = 0,
        this.tapholds.length = 0;
        const t = new O(e)
          , s = {
            aniStart: 1e9,
            aniEnd: 0,
            hitStart: 1e9,
            hitEnd: 0
        }
          , n = e=>{
            e < s.aniStart && (s.aniStart = e),
            e > s.aniEnd && (s.aniEnd = e)
        }
          , i = e=>{
            n(e),
            e < s.hitStart && (s.hitStart = e),
            e > s.hitEnd && (s.hitEnd = e)
        }
          , a = (e,t)=>{
            for (const s of e)
                s.startSeconds = s.startTime / t * 1.875,
                s.endSeconds = s.endTime / t * 1.875,
                s.startTime > -999999 && n(s.startSeconds),
                s.endTime < 1e9 && n(s.endSeconds)
        }
          , o = (e,t,s,n,a)=>{
            e.offsetX = 0,
            e.offsetY = 0,
            e.alpha = 0,
            e.seconds = e.time * t,
            e.holdSeconds = e.holdTime * t,
            e.maxVisiblePos = (e=>{
                const t = Math.fround(e);
                if (!isFinite(t))
                    throw new TypeError("Argument must be a finite number");
                const s = 11718.75
                  , n = t >= s ? 2 ** Math.floor(1 + Math.log2(t / s)) : 1
                  , i = t / n + .001
                  , a = Math.fround(i);
                if (a <= i)
                    return a * n;
                const o = new Float32Array([i]);
                return new Uint32Array(o.buffer)[0] += o[0] <= 0 ? 1 : -1,
                o[0] * n
            }
            )(e.floorPosition),
            e.time < 1e9 && (i(e.seconds),
            i(e.seconds + e.holdSeconds)),
            e.line = s,
            e.lineId = s.lineId,
            e.noteId = n,
            e.isAbove = a,
            e.name = `${s.lineId}${a ? "+" : "-"}${n}${"?tdhf"[e.type]}`,
            this.notes.push(e),
            1 === e.type ? this.taps.push(e) : 2 === e.type ? this.drags.push(e) : 3 === e.type ? this.holds.push(e) : 4 === e.type && this.flicks.push(e),
            (1 === e.type || 3 === e.type) && this.tapholds.push(e)
        }
          , r = (e,t)=>e.seconds - t.seconds || e.lineId - t.lineId || e.noteId - t.noteId;
        t.judgeLineList.forEach(((e,t)=>e.lineId = t));
        for (const e of t.judgeLineList)
            e.bpm *= this.speed,
            e.offsetX = 0,
            e.offsetY = 0,
            e.alpha = 0,
            e.rotation = 0,
            e.positionY = 0,
            e.positionY2 = 0,
            e.speedEvents = N(e.speedEvents),
            e.judgeLineDisappearEvents = F(e.judgeLineDisappearEvents),
            e.judgeLineMoveEvents = F(e.judgeLineMoveEvents),
            e.judgeLineRotateEvents = F(e.judgeLineRotateEvents),
            e.disappearEventsIndex = 0,
            e.moveEventsIndex = 0,
            e.rotateEventsIndex = 0,
            e.speedEventsIndex = 0,
            a(e.speedEvents, e.bpm),
            a(e.judgeLineDisappearEvents, e.bpm),
            a(e.judgeLineMoveEvents, e.bpm),
            a(e.judgeLineRotateEvents, e.bpm),
            this.lines.push(e),
            e.notesAbove.forEach(((t,s)=>o(t, 1.875 / e.bpm, e, s, !0))),
            e.notesBelow.forEach(((t,s)=>o(t, 1.875 / e.bpm, e, s, !1)));
        this.notes.sort(r),
        this.taps.sort(r),
        this.drags.sort(r),
        this.holds.sort(r),
        this.flicks.sort(r),
        this.notesReversed = this.notes.slice(0).reverse(),
        this.tapsReversed = this.taps.slice(0).reverse(),
        this.dragsReversed = this.drags.slice(0).reverse(),
        this.holdsReversed = this.holds.slice(0).reverse(),
        this.flicksReversed = this.flicks.slice(0).reverse(),
        this.linesReversed = this.lines.slice(0).reverse(),
        this.tapholds.sort(r);
        const l = {};
        for (const e of this.notes)
            l[e.seconds.toFixed(6)] = l[e.seconds.toFixed(6)] ? 2 : 1;
        for (const e of this.notes)
            e.isMulti = 2 === l[e.seconds.toFixed(6)];
        for (let e = 0; e < this.flicks.length; e++) {
            const t = this.flicks[e];
            t.nearNotes = [];
            for (let s = e + 1; s < this.flicks.length; s++) {
                const e = this.flicks[s];
                if (Math.fround(e.seconds - t.seconds) > .01)
                    break;
                t.nearNotes.push(e)
            }
        }
        for (let e = 0; e < this.tapholds.length; e++) {
            const t = this.tapholds[e];
            t.nearNotes = [];
            for (let s = e + 1; s < this.tapholds.length; s++) {
                const e = this.tapholds[s];
                if (Math.fround(e.seconds - t.seconds) > .01)
                    break;
                t.nearNotes.push(e)
            }
        }
        this.chart = t,
        this.chart.maxSeconds = s.aniEnd,
        console.table(s)
    }
    seekLineEventIndex(e) {
        if (!this.initialized)
            throw new Error("Not initialized");
        for (const t of this.lines)
            if (t.speedEventsIndex = 0,
            t.disappearEventsIndex = 0,
            t.moveEventsIndex = 0,
            t.rotateEventsIndex = 0,
            null != e) {
                for (; t.speedEventsIndex < t.speedEvents.length && t.speedEvents[t.speedEventsIndex].startSeconds < e; )
                    t.speedEventsIndex++;
                for (; t.disappearEventsIndex < t.judgeLineDisappearEvents.length && t.judgeLineDisappearEvents[t.disappearEventsIndex].startSeconds < e; )
                    t.disappearEventsIndex++;
                for (; t.moveEventsIndex < t.judgeLineMoveEvents.length && t.judgeLineMoveEvents[t.moveEventsIndex].startSeconds < e; )
                    t.moveEventsIndex++;
                for (; t.rotateEventsIndex < t.judgeLineRotateEvents.length && t.judgeLineRotateEvents[t.rotateEventsIndex].startSeconds < e; )
                    t.rotateEventsIndex++
            }
    }
    updateByTime(e) {
        if (!this.initialized)
            throw new Error("Not initialized");
        for (const t of this.lines) {
            for (let s = t.disappearEventsIndex, n = t.judgeLineDisappearEvents.length; s < n; s++) {
                const n = t.judgeLineDisappearEvents[s];
                if (e > n.endSeconds)
                    continue;
                const i = (e - n.startSeconds) / (n.endSeconds - n.startSeconds);
                t.alpha = n.start + (n.end - n.start) * i,
                t.alpha > 1 && (t.alpha = 1),
                t.disappearEventsIndex = s;
                break
            }
            for (let s = t.moveEventsIndex, n = t.judgeLineMoveEvents.length; s < n; s++) {
                const n = t.judgeLineMoveEvents[s];
                if (e > n.endSeconds)
                    continue;
                const i = (e - n.startSeconds) / (n.endSeconds - n.startSeconds);
                t.offsetX = this.matX(n.start + (n.end - n.start) * i),
                t.offsetY = this.matY(n.start2 + (n.end2 - n.start2) * i),
                t.moveEventsIndex = s;
                break
            }
            for (let s = t.rotateEventsIndex, n = t.judgeLineRotateEvents.length; s < n; s++) {
                const n = t.judgeLineRotateEvents[s];
                if (e > n.endSeconds)
                    continue;
                const i = (e - n.startSeconds) / (n.endSeconds - n.startSeconds);
                t.rotation = this.matR(n.start + (n.end - n.start) * i),
                t.cosr = Math.cos(t.rotation),
                t.sinr = Math.sin(t.rotation),
                t.rotateEventsIndex = s;
                break
            }
            for (let s = t.speedEventsIndex, n = t.speedEvents.length; s < n; s++) {
                const n = t.speedEvents[s];
                if (!(e > n.endSeconds)) {
                    t.positionY = (e - n.startSeconds) * this.speed * n.value + (this.enableFR ? n.floorPosition2 : n.floorPosition),
                    t.positionY2 = (e - n.startSeconds) * this.speed * n.value + n.floorPosition2,
                    t.speedEventsIndex = s;
                    break
                }
            }
            const s = s=>3 !== s.type ? (s.floorPosition - t.positionY) * s.speed : s.seconds < e ? (s.seconds - e) * this.speed * s.speed : s.floorPosition - t.positionY
              , n = e=>null == e.badTime ? s(e) : (performance.now() - e.badTime > 500 && delete e.badTime,
            null == e.badY && (e.badY = s(e)),
            e.badY)
              , i = (n,i,a)=>{
                if (n.projectX = t.offsetX + i * n.cosr,
                n.offsetX = n.projectX + a * n.sinr,
                n.projectY = t.offsetY + i * n.sinr,
                n.offsetY = n.projectY - a * n.cosr,
                n.visible = (n.offsetX - this.wlen) ** 2 + (n.offsetY - this.hlen) ** 2 < (1.23625 * this.wlen + this.hlen + this.scaleY * n.holdSeconds * this.speed * n.speed) ** 2,
                n.showPoint = !1,
                null == n.badTime)
                    if (n.seconds > e) {
                        n.showPoint = !0;
                        const e = n.maxVisiblePos < t.positionY2;
                        n.alpha = e || this.enableVP && .6 * s(n) > 2 || 3 === n.type && 0 === n.speed ? 0 : 1
                    } else
                        n.frameCount = null == n.frameCount ? 0 : n.frameCount + 1,
                        3 === n.type ? (n.showPoint = !0,
                        n.alpha = 0 === n.speed ? 0 : n.status % 4 == 2 ? .45 : 1) : n.alpha = Math.max(1 - (e - n.seconds) / .16, 0)
            }
            ;
            for (const e of t.notesAbove)
                e.cosr = t.cosr,
                e.sinr = t.sinr,
                i(e, this.scaleX * e.positionX, this.scaleY * n(e));
            for (const e of t.notesBelow)
                e.cosr = -t.cosr,
                e.sinr = -t.sinr,
                i(e, -this.scaleX * e.positionX, this.scaleY * n(e))
        }
    }
    _setLowResFactor(e=1) {
        this.lowResFactor = e * self.devicePixelRatio
    }
    _resizeCanvas() {
        const {canvas: e, canvasfg: t, width: s, height: n} = this
          , i = s * this.lowResFactor
          , a = n * this.lowResFactor;
        e.width = i,
        e.height = a,
        t.width = Math.min(i, 16 * a / 9),
        t.height = a,
        this.wlen = t.width / 2,
        this.hlen = t.height / 2,
        this.mirrorView(),
        this.setNoteScale(this.noteScale),
        this.lineScale = t.width > .75 * t.height ? t.height / 18.75 : t.width / 14.0625
    }
}
(xe)
  , {canvas: lt, ctx: ct, canvasfg: ht, ctxfg: dt} = rt;
self.addEventListener("resize", (()=>ot.resize()));
class ft extends EventTarget {
    constructor(e="") {
        super(),
        t(this, "status"),
        this.status = e
    }
    emit(e="") {
        this.status !== e && (this.status = e,
        this.dispatchEvent(new Event("change")))
    }
    eq(e="") {
        return this.status === e
    }
    ne(e="") {
        return this.status !== e
    }
}
const ut = new ft("stop")
  , mt = {
    text: "",
    list: [],
    reg(e, t, s) {
        this.list[this.list.length] = {
            toString: ()=>s(e)
        },
        e.addEventListener(t, this.update.bind(this))
    },
    update() {
        const e = this.list.map(String).filter(Boolean);
        this.text = 0 === e.length ? "" : `(${e.join("+")})`
    }
};
let pt = "";
const gt = new Map
  , vt = new Map
  , bt = new Map
  , wt = new Map
  , yt = new Map
  , xt = new Map
  , kt = []
  , St = [];
ke.addEventListener("change", (e=>{
    rt.setNoteScale(Number(e.target.value))
}
)),
Se.addEventListener("change", (e=>{
    ot.resize(Number(e.target.value))
}
)),
Le.addEventListener("change", (e=>{
    rt.brightness = Number(e.target.value)
}
)),
Te.addEventListener("change", (e=>{
    rt.multiHint = e.target.checked
}
));
const Lt = new class {
    constructor(e) {
        t(this, "key"),
        t(this, "data"),
        this.key = e,
        this.data = {}
    }
    init(e) {
        var t;
        return this.data = JSON.parse(null !== (t = localStorage.getItem(this.key)) && void 0 !== t ? t : "{}"),
        "function" == typeof e && e(this.data) && this.reset(),
        this
    }
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.data))
    }
    reset() {
        this.data = {},
        this.save()
    }
    get(e) {
        return this.data[e]
    }
    set(e, t) {
        this.data[e] = t,
        this.save()
    }
    reg(e, t, s=!0) {
        if (t instanceof HTMLInputElement || t instanceof HTMLSelectElement) {
            const n = "checkbox" === t.type ? "checked" : "value"
              , i = this.get(e);
            void 0 !== i && (t[n] = i),
            t.addEventListener("change", (()=>{
                this.set(e, t[n])
            }
            )),
            s && t.dispatchEvent(new Event("change"))
        } else {
            if (!(t instanceof HTMLTextAreaElement))
                throw new Error("Node must be <input>, <select> or <textarea>");
            {
                const n = this.get(e);
                void 0 !== n && (t.value = n),
                t.addEventListener("change", (()=>{
                    this.set(e, t.value)
                }
                )),
                s && t.dispatchEvent(new Event("change"))
            }
        }
    }
}
("sim-phi-status").init((e=>e.resetCfg));
Lt.reg("feedback", Ie),
Lt.reg("imageBlur", Be),
Lt.reg("highLight", Te),
Lt.reg("lineColor", Me),
Lt.reg("autoplay", Ce),
Lt.reg("showTransition", Ae);
const Tt = new Z("恢复默认设置(刷新生效)").appendTo(ce).hook(Lt.reg.bind(Lt, "resetCfg"))
  , Et = new Z("Early/Late特效").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "showCE2"))
  , Mt = new Z("显示定位点").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "showPoint"))
  , Ct = new Z("显示Acc").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "showAcc"))
  , At = new Z("显示统计").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "showStat"))
  , It = new Z("低分辨率").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "lowRes"))
  , Bt = new Z("横屏锁定",!0).appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "lockOri"))
  , Rt = new Z("限制帧率").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "maxFrame"))
  , Pt = new Z("音画实时同步(若声音卡顿则建议关闭)",!0).appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "autoDelay"))
  , Ot = new Z("隐藏距离较远的音符").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "enableVP"));
Ot.checkbox.addEventListener("change", (e=>rt.enableVP = e.target.checked)),
Ot.checkbox.dispatchEvent(new Event("change"));
const Ft = new Z("使用单精度浮点运算").appendBefore(Tt.container).hook(Lt.reg.bind(Lt, "enableFR"));
function Nt() {
    for (const e of St)
        if (Ne.value.trim() === e.Chart) {
            if (null != e.Name && (He.value = e.Name),
            null != e.Musician && ($e.value = e.Musician),
            null != e.Composer && ($e.value = e.Composer),
            null != e.Artist && ($e.value = e.Artist),
            null != e.Level) {
                pt = e.Level;
                const t = pt.toLocaleUpperCase().split("LV.").map((e=>e.trim()));
                t[0] && (Ve.value = t[0]),
                t[1] && (ze.value = t[1])
            }
            null != e.Illustrator && (Ye.value = e.Illustrator),
            null != e.Designer && (Xe.value = e.Designer),
            null != e.Charter && (Xe.value = e.Charter),
            null != e.Music && bt.has(e.Music) && (Fe.value = e.Music),
            null != e.Image && gt.has(e.Image) && (Re.value = e.Image,
            Re.dispatchEvent(new Event("change"))),
            null != e.AspectRatio && isFinite(e.AspectRatioValue = parseFloat(e.AspectRatio)) && (Se.value = e.AspectRatio,
            ot.resize(e.AspectRatioValue)),
            null != e.ScaleRatio && isFinite(e.ScaleRatioValue = parseFloat(e.ScaleRatio)) && (ke.value = String(8080 / e.ScaleRatioValue),
            rt.setNoteScale(8080 / e.ScaleRatioValue)),
            null != e.NoteScale && isFinite(e.NoteScaleValue = parseFloat(e.NoteScale)) && (ke.value = e.NoteScale,
            rt.setNoteScale(e.NoteScaleValue)),
            null != e.GlobalAlpha && isFinite(e.GlobalAlphaValue = parseFloat(e.GlobalAlpha)) && (Le.value = e.GlobalAlpha,
            rt.brightness = e.GlobalAlphaValue),
            null != e.BackgroundDim && isFinite(e.BackgroundDimValue = parseFloat(e.BackgroundDim)) && (Le.value = e.BackgroundDim,
            rt.brightness = e.BackgroundDimValue),
            null != e.Offset && isFinite(e.OffsetValue = parseFloat(e.Offset)) && (Ee.value = e.Offset)
        }
}
Ft.checkbox.addEventListener("change", (e=>rt.enableFR = e.target.checked)),
Ft.checkbox.dispatchEvent(new Event("change")),
De.addEventListener("change", (e=>{
    rt.mirrorView(Number(e.target.value))
}
)),
Lt.reg("selectFlip", De),
je.addEventListener("change", (e=>{
    var t;
    rt.speed = 2 ** ((null !== (t = {
        slowest: -9,
        slower: -4,
        faster: 3,
        fastest: 5
    }[e.target.value.toLowerCase()]) && void 0 !== t ? t : 0) / 12)
}
)),
Lt.reg("selectSpeed", je);
const Dt = new k;
!function() {
    const e = {}
      , t = {};
    let s = 0
      , i = 0;
    const a = async(n,a,o,r)=>{
        t[n] = a,
        i = Object.values(t).reduce(((e,t)=>e + t), 0),
        await (o instanceof Promise ? o : Promise.resolve(o)),
        e[n] = (e[n] || 0) + 1,
        s = Object.values(e).reduce(((e,t)=>e + t), 0),
        st(`读取文件：${s}/${i}`),
        e[n] === t[n] && null != r && r(),
        d()
    }
    ;
    et.handleFile = a;
    let o = 0;
    const r = {
        createAudioBuffer: async e=>n.decode(e)
    }
      , l = new S({
        handler: async e=>E.readFile(e, r)
    });
    async function c(e) {
        switch (console.log(e),
        e.type) {
        case "line":
            kt.push(...e.data);
            break;
        case "info":
            St.push(...e.data);
            break;
        case "media":
            {
                let t = e.name;
                for (; bt.has(t); )
                    t += "\n";
                bt.set(t, e.data),
                Fe.appendChild(h(t, e.name));
                break
            }
        case "image":
            {
                let t = e.name;
                for (; gt.has(t); )
                    t += "\n";
                gt.set(t, e.data),
                vt.set(t, await async function(e) {
                    const t = $(e.width, e.height)
                      , {width: s, height: n} = t.canvas;
                    return t.drawImage(e, 0, 0),
                    z(t.canvas, 0, 0, s, n, Math.ceil(.0125 * Math.min(s, n))),
                    createImageBitmap(t.canvas)
                }(e.data)),
                Re.appendChild(h(t, e.name));
                break
            }
        case "chart":
            {
                e.msg && e.msg.forEach((e=>nt(e))),
                e.info && St.push(e.info),
                e.line && kt.push(...e.line);
                let t = e.name;
                for (; wt.has(t); )
                    t += "\n";
                wt.set(t, e.data),
                yt.set(t, e.md5),
                xt.set(t, e.format),
                Ne.appendChild(h(t, e.name));
                break
            }
        default:
            console.warn(`Unsupported file: ${e.name}`),
            console.log(e.data),
            nt(`不支持的文件：${e.name}\n ${e.data || "Error: Unknown File Type"}`)
        }
    }
    function h(e, t) {
        const s = document.createElement("option")
          , n = /(^|\/)\./.test(t);
        return s.innerHTML = n ? "" : t,
        s.value = e,
        n && s.classList.add("hide"),
        s
    }
    function d() {
        s === i ? (ye.classList.remove("disabled"),
        Nt()) : ye.classList.add("disabled")
    }
    l.addEventListener("loadstart", (()=>st("加载zip组件..."))),
    l.addEventListener("read", (e=>{
        a("zip", l.total, c(e.detail))
    }
    )),
    qe.addEventListener("click", Dt.uploadFile.bind(Dt)),
    We.addEventListener("click", Dt.uploadFile.bind(Dt)),
    Je.addEventListener("click", Dt.uploadDir.bind(Dt)),
    Dt.addEventListener("change", d),
    Dt.addEventListener("progress", (e=>{
        if (!e.total)
            return;
        const t = Math.floor(e.loaded / e.total * 100);
        st(`加载文件：${t}% (${Ms(e.loaded)}/${Ms(e.total)})`)
    }
    )),
    Dt.addEventListener("load", (e=>{
        const {file: {name: t, webkitRelativePath: s}, buffer: n} = e
          , i = n.byteLength > 4 && 1347093252 === new DataView(n).getUint32(0, !1)
          , h = {
            name: t,
            buffer: n,
            path: s || t
        };
        i ? l.read(h) : (async()=>{
            o++;
            const e = await E.readFile(h, r);
            await a("file", o, c(e))
        }
        )()
    }
    ))
}(),
et.uploader = Dt,
import("./index-5e9f797b.js").then((e=>e.default()));
const jt = new class {
    constructor() {
        t(this, "list"),
        this.list = []
    }
    activate(e, t, s, n) {
        const {list: i} = this
          , a = i.findIndex((s=>s.type === e && s.id === t));
        -1 !== a && i.splice(a, 1),
        i.push(new D(e,t,s,n))
    }
    moving(e, t, s, n) {
        const i = this.list.find((s=>s.type === e && s.id === t));
        i && i.move(s, n)
    }
    deactivate(e, t) {
        const s = this.list.find((s=>s.type === e && s.id === t));
        s && (s.isActive = !1)
    }
    update() {
        const {list: e} = this;
        for (let t = 0; t < e.length; t++) {
            const s = e[t];
            s.isActive ? (s.isTapped = !0,
            s.isMoving = !1) : e.splice(t--, 1)
        }
    }
    clear(e) {
        for (const t of this.list)
            t.type === e && this.deactivate(e, t.id)
    }
}
  , Ht = ()=>{
    i.onchange && document.removeEventListener(i.onchange, Ht),
    jt.clear("keyboard"),
    ot.setFull(i.check()),
    ot.resize()
}
  , $t = new r
  , Xt = new r
  , Yt = new r
  , Vt = {
    time: [0, 0, 0, 0],
    func: [async()=>Promise.resolve().then(Is), async()=>Promise.resolve().then(As).then(As), async()=>Promise.resolve().then((()=>At.toggle())), async()=>{
        const e = ot.getFull();
        try {
            if (await i.toggle(),
            !ot.setFull(i.check()) || (i.onchange && document.addEventListener(i.onchange, Ht),
            !Bt.checked))
                return;
            await a.lockLandscape()
        } catch (t) {
            console.warn(t),
            ot.setFull(!e)
        } finally {
            ot.resize()
        }
    }
    ],
    click(e) {
        const t = performance.now();
        t - this.time[e] < 300 && this.func[e]().catch((e=>{
            console.warn(e),
            et.toast(`按太多下了！(${e.message})`)
        }
        )),
        this.time[e] = t
    },
    activate(e, t) {
        const {lineScale: s} = rt;
        e < 1.5 * s && t < 1.5 * s && this.click(0),
        e > ht.width - 1.5 * s && t < 1.5 * s && this.click(1),
        e < 1.5 * s && t > ht.height - 1.5 * s && this.click(2),
        e > ht.width - 1.5 * s && t > ht.height - 1.5 * s && this.click(3),
        Yt.second > 0 && (et.pressTime = et.pressTime > 0 ? -Yt.second : Yt.second)
    }
};
function zt(e, t) {
    const {offsetX: s, offsetY: n} = e
      , {offsetX: i, offsetY: a, cosr: o, sinr: r} = t;
    return Math.abs((s - i) * o + (n - a) * r) || 0
}
function Ut(e, t) {
    const {offsetX: s, offsetY: n} = e
      , {offsetX: i, offsetY: a, cosr: o, sinr: r} = t;
    return Math.abs((s - i) * o + (n - a) * r) + Math.abs((s - i) * r - (n - a) * o) || 0
}
const _t = {};
let qt = 0
  , Wt = 0
  , Jt = 0
  , Zt = 0
  , Gt = 0
  , Kt = 0
  , Qt = !1
  , es = !1
  , ts = !1;
const ss = new class {
    constructor() {
        t(this, "tick"),
        t(this, "time"),
        t(this, "fps"),
        this.tick = 0,
        this.time = performance.now(),
        this.fps = 0
    }
    get fpsStr() {
        const {fps: e} = this;
        return e < 10 ? e.toPrecision(2) : e.toFixed(0)
    }
    get disp() {
        return .5 / this.fps || 0
    }
    addTick(e=10) {
        return ++this.tick >= e && (this.tick = 0,
        this.fps = 1e3 * e / (-this.time + (this.time = performance.now()))),
        this.fps
    }
}
  , ns = new class {
    constructor() {
        t(this, "callback"),
        t(this, "lastTime"),
        t(this, "interval"),
        t(this, "id"),
        this.callback = ()=>{}
        ,
        this.lastTime = 0,
        this.interval = Number.EPSILON,
        this.id = null,
        this._animate = this._animate.bind(this)
    }
    start() {
        null === this.id && (this.lastTime = performance.now(),
        this.id = requestAnimationFrame(this._animate.bind(this)))
    }
    stop() {
        null !== this.id && (cancelAnimationFrame(this.id),
        this.id = null)
    }
    setCallback(e) {
        if ("function" != typeof e)
            throw new TypeError("callback is not a function");
        this.callback = e
    }
    setFrameRate(e) {
        this.interval = Math.abs(1e3 / e),
        isFinite(this.interval) || (this.interval = Number.EPSILON)
    }
    _animate() {
        this.id = requestAnimationFrame(this._animate.bind(this));
        const e = performance.now()
          , t = e - this.lastTime;
        t > this.interval && (this.lastTime = e - t % this.interval,
        this.callback(e))
    }
}
;
ns.setCallback((function() {
    ss.addTick();
    const {lineScale: e} = rt;
    if (qt = performance.now(),
    rt.resizeCanvas(),
    Xt.second < .67) {
        !function() {
            if (null == rt.chart)
                throw new Error("Not initialized: Chart");
            !Qt && $t.second >= 3 && ut.eq("play") && (Qt = !0,
            ls(rt.bgMusic),
            null != rt.bgVideo && cs(rt.bgVideo)),
            ut.eq("play") && Qt && !es && (Zt = Wt + (qt - Jt) / 1e3),
            Zt < 0 && (Zt = 0),
            Zt >= Kt && (es = !0),
            Ae.checked && es && !ts && (ts = !0,
            Xt.play()),
            Gt = Math.max(Zt - (rt.chart.offset + Number(Ee.value) / 1e3 || 0) / rt.speed, 0),
            rt.updateByTime(Gt),
            us.update(),
            hs.update(),
            ds.update();
            for (const e of jt.list)
                "keyboard" !== e.type && (e.isTapped ? e.isMoving ? us.add(K.move(e.offsetX, e.offsetY)) : e.isActive && us.add(K.hold(e.offsetX, e.offsetY)) : us.add(K.tap(e.offsetX, e.offsetY)));
            if (Qt) {
                const e = .118125 * ht.width;
                fs.addEvent(rt.notes, Gt),
                fs.execute(rt.drags, Gt, e),
                fs.execute(rt.flicks, Gt, e),
                fs.execute(rt.tapholds, Gt, e)
            }
            jt.update(),
            rs.bgImage = Be.checked ? rt.bgImageBlur : rt.bgImage,
            rs.bgVideo = rt.bgVideo,
            rs.progress = (et.awawa ? Kt - Zt : Zt) / Kt,
            rs.name = He.value || He.placeholder,
            rs.artist = $e.value,
            rs.illustrator = Ye.value || Ye.placeholder,
            rs.charter = Xe.value || Xe.placeholder,
            rs.level = pt,
            at.combo > 2 ? (rs.combo = `${at.combo}`,
            rs.combo2 = 1 === rt.playMode ? "Autoplay" : "combo") : (rs.combo = "",
            rs.combo2 = ""),
            rs.showStat = !0,
            rs.customForeDraw = null,
            rs.customBackDraw = null
        }();
        for (const e of et.now.values())
            e(Zt * rt.speed);
        !function() {
            const {lineScale: e, wlen: t, hlen: s} = rt
              , {bgImage: n, bgVideo: i} = rs;
            if (dt.clearRect(0, 0, ht.width, ht.height),
            dt.globalAlpha = 1,
            dt.drawImage(n, ...ne(n, ht, 1)),
            Qt && null != i && !et.awawa) {
                const {videoWidth: e, videoHeight: t} = i;
                dt.drawImage(i, ...ne({
                    width: e,
                    height: t
                }, ht, 1))
            }
            if ($t.second >= 2.5 && !at.lineStatus && vs(0, e),
            dt.resetTransform(),
            dt.fillStyle = "#000",
            dt.globalAlpha = rt.brightness,
            dt.fillRect(0, 0, ht.width, ht.height),
            $t.second >= 2.5 && null != rs.customBackDraw && rs.customBackDraw(dt),
            $t.second >= 2.5 && vs(at.lineStatus ? 2 : 1, e),
            dt.resetTransform(),
            $t.second >= 3 && 0 === Xt.second && (function() {
                for (const e of rt.holds)
                    ks(e, Gt);
                for (const e of rt.dragsReversed)
                    xs(e);
                for (const e of rt.tapsReversed)
                    ys(e);
                for (const e of rt.flicksReversed)
                    Ss(e)
            }(),
            Mt.checked)) {
                dt.font = `${e}px Custom,Noto Sans SC`,
                dt.textAlign = "center";
                for (const t of rt.linesReversed)
                    dt.setTransform(t.cosr, t.sinr, -t.sinr, t.cosr, t.offsetX, t.offsetY),
                    dt.globalAlpha = 1,
                    dt.fillStyle = "violet",
                    dt.fillRect(.2 * -e, .2 * -e, .4 * e, .4 * e),
                    dt.fillStyle = "yellow",
                    dt.globalAlpha = (t.alpha + .5) / 1.5,
                    dt.fillText(t.lineId.toString(), 0, .3 * -e);
                for (const t of rt.notesReversed)
                    t.visible && (dt.setTransform(t.cosr, t.sinr, -t.sinr, t.cosr, t.offsetX, t.offsetY),
                    dt.globalAlpha = 1,
                    dt.fillStyle = "lime",
                    dt.fillRect(.2 * -e, .2 * -e, .4 * e, .4 * e),
                    dt.fillStyle = "cyan",
                    dt.globalAlpha = t.seconds > Gt ? 1 : .5,
                    dt.fillText(t.name, 0, .3 * -e))
            }
            hs.animate(),
            Et.checked && ds.animate(),
            dt.globalAlpha = 1,
            dt.setTransform(ht.width / 1920, 0, 0, ht.width / 1920, 0, e * ($t.second < .67 ? Ke.easeOutSine(1.5 * $t.second) - 1 : -Ke.easeOutSine(1.5 * Xt.second)) * 1.75),
            dt.drawImage(_t.ProgressBar, 1920 * rs.progress - 1920, 0),
            dt.resetTransform();
            for (const e of et.after.values())
                e();
            if (dt.fillStyle = "#fff",
            $t.second < 3) {
                $t.second < .67 ? dt.globalAlpha = Ke.easeOutSine(1.5 * $t.second) : $t.second >= 2.5 && (dt.globalAlpha = Ke.easeOutSine(6 - 2 * $t.second)),
                dt.textAlign = "center",
                bs(rs.name, t, .75 * s, 1.1 * e, ht.width - 1.5 * e),
                bs(rs.artist, t, .75 * s + 1.25 * e, .55 * e, ht.width - 1.5 * e),
                bs(`Illustration designed by ${rs.illustrator}`, t, 1.25 * s + .55 * e, .55 * e, ht.width - 1.5 * e),
                bs(`Level designed by ${rs.charter}`, t, 1.25 * s + 1.4 * e, .55 * e, ht.width - 1.5 * e),
                dt.globalAlpha = 1,
                dt.setTransform(1, 0, 0, 1, t, s);
                const n = 48 * e * ($t.second < .67 ? Ke.easeInSine(1.5 * $t.second) : 1)
                  , i = .15 * e;
                $t.second >= 2.5 && (dt.globalAlpha = Ke.easeOutSine(6 - 2 * $t.second)),
                dt.drawImage(Me.checked ? _t.JudgeLineMP : _t.JudgeLine, -n / 2, -i / 2, n, i)
            }
            dt.globalAlpha = 1,
            dt.setTransform(1, 0, 0, 1, 0, e * ($t.second < .67 ? Ke.easeOutSine(1.5 * $t.second) - 1 : -Ke.easeOutSine(1.5 * Xt.second)) * 1.75),
            rs.showStat && (dt.font = .95 * e + "px Custom,Noto Sans SC",
            dt.textAlign = "right",
            dt.fillText(at.scoreStr, ht.width - .65 * e, 1.375 * e),
            Ct.checked && (dt.font = .66 * e + "px Custom,Noto Sans SC",
            dt.fillText(at.accStr, ht.width - .65 * e, 2.05 * e))),
            dt.textAlign = "center",
            dt.font = 1.32 * e + "px Custom,Noto Sans SC",
            dt.fillText(rs.combo, t, 1.375 * e),
            dt.globalAlpha = $t.second < .67 ? Ke.easeOutSine(1.5 * $t.second) : 1 - Ke.easeOutSine(1.5 * Xt.second),
            dt.font = .66 * e + "px Custom,Noto Sans SC",
            dt.fillText(rs.combo2, t, 2.05 * e),
            dt.globalAlpha = 1,
            dt.setTransform(1, 0, 0, 1, 0, e * ($t.second < .67 ? 1 - Ke.easeOutSine(1.5 * $t.second) : Ke.easeOutSine(1.5 * Xt.second)) * 1.75),
            dt.textAlign = "right",
            bs(rs.level, ht.width - .75 * e, ht.height - .66 * e, .63 * e, t - e),
            dt.textAlign = "left",
            bs(rs.name, .65 * e, ht.height - .66 * e, .63 * e, t - e),
            dt.resetTransform(),
            dt.fillStyle = "#fff",
            $t.second < .67 ? dt.globalAlpha = Ke.easeOutSine(1.5 * $t.second) : dt.globalAlpha = 1 - Ke.easeOutSine(1.5 * Xt.second),
            dt.font = .4 * e + "px Custom,Noto Sans SC",
            dt.textAlign = "left",
            dt.fillText(`${Qe(et.awawa ? Kt - Zt : Zt)}/${Qe(Kt)}${mt.text}`, .05 * e, .6 * e),
            dt.fillText(at.format, ht.width - 4.35 * e, .6 * e),
            dt.textAlign = "right",
            dt.fillText(ss.fpsStr, ht.width - .05 * e, .6 * e),
            rs.showStat && At.checked && (dt.textAlign = "right",
            [at.noteRank[6], at.noteRank[7], at.noteRank[5], at.noteRank[4], at.noteRank[1], at.noteRank[3], at.noteRank[2]].forEach(((t,s)=>{
                const n = ["#fe7b93", "#0ac3ff", "lime", "#f0ed69", "lime", "#0ac3ff", "#999"];
                dt.fillStyle = n[s],
                dt.fillText(t.toString(), ht.width - .05 * e, ht.height / 2 + e * (s - 2.8) * .5)
            }
            )),
            dt.fillStyle = "#fff",
            dt.textAlign = "left",
            dt.fillText(`DSP:  ${at.curDispStr}`, .05 * e, ht.height / 2 - .15 * e),
            dt.fillText(`AVG:  ${at.avgDispStr}`, .05 * e, ht.height / 2 + .35 * e),
            dt.textAlign = "center",
            at.combos.forEach(((t,s)=>{
                const n = ["#fff", "#0ac3ff", "#f0ed69", "#a0e9fd", "#fe4365"];
                dt.fillStyle = n[s],
                dt.fillText(t.toString(), e * (s + .55) * 1.1, ht.height - .1 * e)
            }
            ))),
            $t.second >= 2.5 && $t.second < 3 ? dt.globalAlpha = 1 - Ke.easeOutSine(6 - 2 * $t.second) : dt.globalAlpha = 1 - Ke.easeOutSine(1.5 * Xt.second),
            $t.second >= 2.5 && null != rs.customForeDraw && rs.customForeDraw(dt),
            $t.second >= 2.5 && null != et.filter && et.filter(dt, Zt, qt / 1e3),
            Ie.checked && us.animate(),
            dt.resetTransform()
        }()
    } else if (!as) {
        as = !0,
        n.stop(),
        Oe.classList.add("disabled"),
        dt.globalCompositeOperation = "source-over",
        dt.resetTransform(),
        dt.globalAlpha = 1;
        const e = Be.checked ? rt.bgImageBlur : rt.bgImage;
        dt.drawImage(e, ...ne(e, ht, 1)),
        dt.fillStyle = "#000",
        dt.globalAlpha = rt.brightness,
        dt.fillRect(0, 0, ht.width, ht.height),
        self.setTimeout((()=>{
            if (!as)
                return;
            const e = ["ez", "hd", "in", "at"].indexOf(pt.slice(0, 2).toLocaleLowerCase());
            n.play(_t[`LevelOver ${e < 0 ? 2 : e}_v1`], {
                loop: !0
            }),
            Yt.reset(),
            Yt.play(),
            at.level = Number(/\d+$/.exec(pt)),
            os = at.getData(1 === rt.playMode, je.value)
        }
        ), 1e3)
    }
    null != os && function(e) {
        dt.resetTransform(),
        dt.clearRect(0, 0, ht.width, ht.height),
        dt.globalAlpha = 1;
        const t = Be.checked ? rt.bgImageBlur : rt.bgImage;
        dt.drawImage(t, ...ne(t, ht, 1)),
        dt.fillStyle = "#000",
        dt.globalAlpha = rt.brightness,
        dt.fillRect(0, 0, ht.width, ht.height),
        dt.globalCompositeOperation = "destination-out",
        dt.globalAlpha = 1;
        const s = 3.7320508075688776;
        dt.setTransform(ht.width - ht.height / s, 0, -ht.height / s, ht.height, ht.height / s, 0),
        dt.fillRect(0, 0, 1, Ke.easeOutCubic(ws(.94 * (Yt.second - .13)))),
        dt.resetTransform(),
        dt.globalCompositeOperation = "destination-over";
        const n = (ht.width - ht.height / s) / (16 - 9 / s);
        dt.setTransform(n / 120, 0, 0, n / 120, rt.wlen - 8 * n, rt.hlen - 4.5 * n),
        dt.drawImage(_t.LevelOver4, 183, 42, 1184, 228),
        dt.globalAlpha = ws((Yt.second - .27) / .83),
        dt.drawImage(_t.LevelOver1, 102, 378),
        dt.globalCompositeOperation = "source-over",
        dt.globalAlpha = 1,
        dt.drawImage(_t.LevelOver5, 700 * Ke.easeOutCubic(ws(1.25 * Yt.second)) - 369, 91, 20, 80),
        dt.fillStyle = "#fff",
        dt.textAlign = "left",
        bs(He.value || He.placeholder, 700 * Ke.easeOutCubic(ws(1.25 * Yt.second)) - 320, 160, 80, 1500);
        const i = bs(pt, 700 * Ke.easeOutCubic(ws(1.25 * Yt.second)) - 317, 212, 30, 750);
        dt.font = "30px Custom,Noto Sans SC",
        dt.globalAlpha = ws(3.75 * (Yt.second - 1.87));
        const a = 293 + 100 * ws(3.75 * (Yt.second - 1.87))
          , o = 410 - 164 * ws(2.14 * (Yt.second - 1.87));
        dt.drawImage(_t.LevelOver3, 661 - a / 2, 545 - a / 2, a, a),
        dt.drawImage(_t.Ranks[at.rankStatus], 661 - o / 2, 545 - o / 2, o, o),
        dt.globalAlpha = ws(2.5 * (Yt.second - .87)),
        dt.fillStyle = e.newBestColor,
        dt.fillText(e.newBestStr, 898, 433),
        dt.fillStyle = "#fff",
        dt.textAlign = "center",
        dt.fillText(e.scoreBest, 1180, 433),
        dt.globalAlpha = ws(2.5 * (Yt.second - 1.87)),
        dt.textAlign = "right",
        dt.fillText(e.scoreDelta, 1414, 433),
        dt.globalAlpha = ws(1.5 * (Yt.second - .95)),
        dt.textAlign = "left",
        dt.fillText(at.accStr, 352, 550),
        dt.fillText(at.maxcombo.toString(), 1528, 550),
        dt.fillStyle = e.textAboveColor,
        dt.fillText(1 === rt.speed ? "" : e.textAboveStr.replace("{SPEED}", rt.speed.toFixed(2)), 383 + Math.min(i, 750), 212),
        dt.fillStyle = e.textBelowColor,
        dt.fillText(e.textBelowStr, 1355, 595),
        dt.fillStyle = "#fff",
        dt.textAlign = "center",
        dt.font = "86px Custom,Noto Sans SC",
        dt.globalAlpha = ws(2 * (Yt.second - 1.12)),
        dt.fillText(at.scoreStr, 1075, 569),
        dt.font = "26px Custom,Noto Sans SC",
        dt.globalAlpha = ws(2.5 * (Yt.second - .87)),
        dt.fillText(at.perfect.toString(), 891, 650),
        dt.globalAlpha = ws(2.5 * (Yt.second - 1.07)),
        dt.fillText(at.good.toString(), 1043, 650),
        dt.globalAlpha = ws(2.5 * (Yt.second - 1.27)),
        dt.fillText(at.noteRank[6].toString(), 1196, 650),
        dt.globalAlpha = ws(2.5 * (Yt.second - 1.47)),
        dt.fillText(at.noteRank[2].toString(), 1349, 650),
        dt.font = "22px Custom,Noto Sans SC";
        const r = ws(5 * (et.pressTime > 0 ? Yt.second - et.pressTime : .2 - Yt.second - et.pressTime));
        dt.globalAlpha = .8 * ws(2.5 * (Yt.second - .87)) * r,
        dt.fillStyle = "#696",
        dt.fill(new Path2D("M841,718s-10,0-10,10v80s0,10,10,10h100s10,0,10-10v-80s0-10-10-10h-40l-10-20-10,20h-40z")),
        dt.globalAlpha = .8 * ws(2.5 * (Yt.second - 1.07)) * r,
        dt.fillStyle = "#669",
        dt.fill(new Path2D("M993,718s-10,0-10,10v80s0,10,10,10h100s10,0,10-10v-80s0-10-10-10h-40l-10-20-10,20h-40z")),
        dt.fillStyle = "#fff",
        dt.globalAlpha = ws(2.5 * (Yt.second - .97)) * r,
        dt.fillText(`Early: ${at.noteRank[5]}`, 891, 759),
        dt.fillText(`Late: ${at.noteRank[1]}`, 891, 792),
        dt.globalAlpha = ws(2.5 * (Yt.second - 1.17)) * r,
        dt.fillText(`Early: ${at.noteRank[7]}`, 1043, 759),
        dt.fillText(`Late: ${at.noteRank[3]}`, 1043, 792),
        dt.resetTransform(),
        dt.globalCompositeOperation = "destination-over",
        dt.globalAlpha = 1,
        dt.fillStyle = "#000",
        dt.drawImage(rt.bgImage, ...ne(rt.bgImage, ht, 1)),
        dt.fillRect(0, 0, ht.width, ht.height),
        dt.globalCompositeOperation = "source-over"
    }(os),
    ct.globalAlpha = 1;
    const t = Be.checked ? rt.bgImageBlur : rt.bgImage;
    ct.drawImage(t, ...ne(t, lt, 1.1)),
    ct.fillStyle = "#000",
    ct.globalAlpha = .4,
    ct.fillRect(0, 0, lt.width, lt.height),
    ct.globalAlpha = 1,
    ct.drawImage(ht, (lt.width - ht.width) / 2, 0),
    ct.globalCompositeOperation = "difference",
    ct.font = .4 * e + "px Custom,Noto Sans SC",
    ct.fillStyle = "#fff",
    ct.globalAlpha = .8,
    ct.textAlign = "right",
    ct.fillText(`${self._i[0]} v ${self._i[1].join(".")} - Code by lchzh3473`, (lt.width + ht.width) / 2 - .1 * e, lt.height - .1 * e),
    ct.globalCompositeOperation = "source-over"
}
));
const is = ()=>{
    "hidden" === document.visibilityState && ut.eq("play") && Is()
}
;
document.addEventListener("visibilitychange", is),
document.addEventListener("pagehide", is);
let as = !1
  , os = null;
const rs = {
    bgImage: null,
    bgVideo: null,
    bgMusicHack: e=>{}
    ,
    progress: 0,
    name: "",
    artist: "",
    illustrator: "",
    charter: "",
    level: "",
    combo: "",
    combo2: "",
    showStat: !1,
    customForeDraw: null,
    customBackDraw: null
};
function ls(e, t) {
    Jt = performance.now(),
    rs.bgMusicHack = n.play(e, {
        offset: (null != t ? t : 0) || 0,
        playbackrate: rt.speed,
        gainrate: rt.musicVolume,
        interval: Pt.checked ? 1 : 0
    })
}
async function cs(e, t) {
    e.currentTime = (null != t ? t : 0) || 0,
    e.playbackRate = rt.speed,
    e.muted = !0,
    await e.play()
}
const hs = new G({
    updateCallback: e=>qt >= e.time + e.duration,
    iterateCallback(e) {
        var t;
        const s = (qt - e.time) / e.duration
          , {effects: n} = e;
        dt.globalAlpha = 1,
        dt.setTransform(6 * rt.noteScaleRatio, 0, 0, 6 * rt.noteScaleRatio, e.offsetX, e.offsetY),
        (null !== (t = n[Math.floor(s * n.length)]) && void 0 !== t ? t : n[n.length - 1]).full(dt),
        dt.fillStyle = e.color,
        dt.globalAlpha = 1 - s;
        const i = 30 * (((.2078 * s - 1.6524) * s + 1.6399) * s + .4988);
        for (const t of e.direction) {
            const e = t[0] * (9 * s / (8 * s + 1));
            dt.fillRect(e * Math.cos(t[1]) - i / 2, e * Math.sin(t[1]) - i / 2, i, i)
        }
    }
})
  , ds = new G({
    updateCallback: e=>qt >= e.time + e.duration,
    iterateCallback(e) {
        const t = (qt - e.time) / e.duration;
        dt.setTransform(1, 0, 0, 1, e.offsetX, e.offsetY),
        dt.font = `bold ${rt.noteScaleRatio * (256 + 128 * (((.2078 * t - 1.6524) * t + 1.6399) * t + .4988))}px Custom,Noto Sans SC`,
        dt.textAlign = "center",
        dt.fillStyle = e.color,
        dt.globalAlpha = 1 - t,
        dt.fillText(e.text, 0, 128 * -rt.noteScaleRatio)
    }
})
  , fs = {
    list: [],
    addEvent(e, t) {
        const {list: s} = this;
        if (s.length = 0,
        1 === rt.playMode) {
            const n = Math.min(ss.disp, .04);
            for (const i of e) {
                if (i.scored)
                    continue;
                const e = i.seconds - t;
                1 === i.type ? e < n && (s[s.length] = new j(i.offsetX,i.offsetY,1)) : 2 === i.type ? e < n && (s[s.length] = new j(i.offsetX,i.offsetY,2)) : 3 === i.type ? i.holdTapTime ? s[s.length] = new j(i.offsetX,i.offsetY,2) : e < n && (s[s.length] = new j(i.offsetX,i.offsetY,1)) : 4 === i.type && e < n && (s[s.length] = new j(i.offsetX,i.offsetY,3))
            }
        } else if (ut.eq("play"))
            for (const e of jt.list)
                e.isTapped || (s[s.length] = new j(e.offsetX,e.offsetY,1)),
                e.isActive && (s[s.length] = new j(e.offsetX,e.offsetY,2)),
                "keyboard" === e.type && (s[s.length] = new j(e.offsetX,e.offsetY,3)),
                e.flicking && !e.flicked && (s[s.length] = new j(e.offsetX,e.offsetY,3,e))
    },
    execute(e, t, s) {
        const {list: i} = this;
        for (const a of e) {
            if (a.scored)
                continue;
            const e = a.seconds - t;
            if (e > .2)
                break;
            if (!(1 !== a.type && e > .16))
                if (e < -.16 && a.frameCount > 4 && !a.holdStatus)
                    a.status = 2,
                    at.addCombo(2, a.type),
                    a.scored = !0;
                else if (2 === a.type) {
                    if (e > 0)
                        for (const e of i)
                            1 === e.type && (zt(e, a) > s || (e.preventBad = !0));
                    if (4 !== a.status) {
                        for (const e of i)
                            if (2 === e.type && !(zt(e, a) > s)) {
                                a.status = 4;
                                break
                            }
                    } else
                        e < 0 && (n.play(_t.HitSong1, {
                            gainrate: rt.soundVolume
                        }),
                        hs.add(Q.perfect(a.projectX, a.projectY, a)),
                        at.addCombo(4, 2),
                        a.scored = !0)
                } else if (4 === a.type) {
                    if (e > 0 || 4 !== a.status)
                        for (const e of i)
                            1 === e.type && (zt(e, a) > s || (e.preventBad = !0));
                    if (4 !== a.status)
                        for (const e of i) {
                            if (3 !== e.type || zt(e, a) > s)
                                continue;
                            let n = Ut(e, a)
                              , i = a
                              , o = !1;
                            for (const r of a.nearNotes) {
                                if (r.status)
                                    continue;
                                if (r.seconds - t > .16)
                                    break;
                                if (zt(e, r) > s)
                                    continue;
                                const a = Ut(e, r);
                                a < n && (n = a,
                                i = r,
                                o = !0)
                            }
                            if (null == e.event) {
                                if (i.status = 4,
                                !o)
                                    break
                            } else if (!e.event.flicked && (i.status = 4,
                            e.event.flicked = !0,
                            !o))
                                break
                        }
                    else
                        e < 0 && (n.play(_t.HitSong2, {
                            gainrate: rt.soundVolume
                        }),
                        hs.add(Q.perfect(a.projectX, a.projectY, a)),
                        at.addCombo(4, 4),
                        a.scored = !0)
                } else {
                    if (3 === a.type && a.holdTapTime) {
                        if ((performance.now() - a.holdTapTime) * a.holdTime >= 16e3 * a.holdSeconds && (a.holdStatus % 4 == 0 || a.holdStatus % 4 == 1 ? hs.add(Q.perfect(a.projectX, a.projectY, a)) : a.holdStatus % 4 == 3 && hs.add(Q.good(a.projectX, a.projectY, a)),
                        a.holdTapTime = performance.now()),
                        e + a.holdSeconds < .2) {
                            a.status || at.addCombo(a.status = a.holdStatus, 3),
                            e + a.holdSeconds < 0 && (a.scored = !0);
                            continue
                        }
                        a.holdBroken = !0
                    }
                    for (const o of i) {
                        if (a.holdTapTime) {
                            if (2 !== o.type)
                                continue;
                            if (zt(o, a) <= s) {
                                a.holdBroken = !1;
                                break
                            }
                            continue
                        }
                        if (1 !== o.type || o.judged || zt(o, a) > s)
                            continue;
                        let i = e
                          , r = Ut(o, a)
                          , l = a
                          , c = !1;
                        for (const e of a.nearNotes) {
                            if (e.status || e.holdTapTime)
                                continue;
                            const n = e.seconds - t;
                            if (n > .2)
                                break;
                            if (3 === e.type && n > .16 || zt(o, e) > s)
                                continue;
                            const a = Ut(o, e);
                            a < r && (i = n,
                            r = a,
                            l = e,
                            c = !0)
                        }
                        if (i > .16) {
                            if (o.preventBad)
                                continue;
                            l.status = 6,
                            l.badTime = performance.now()
                        } else {
                            const e = l;
                            at.addDisp(Math.max(i, .04 * (-1 - e.frameCount) || 0)),
                            n.play(_t.HitSong0, {
                                gainrate: rt.soundVolume
                            }),
                            i > .08 ? (e.holdStatus = 7,
                            hs.add(Q.good(e.projectX, e.projectY, e)),
                            ds.add(ee.early(e.projectX, e.projectY))) : i > .04 ? (e.holdStatus = 5,
                            hs.add(Q.perfect(e.projectX, e.projectY, e)),
                            ds.add(ee.early(e.projectX, e.projectY))) : i > -.04 || e.frameCount < 1 ? (e.holdStatus = 4,
                            hs.add(Q.perfect(e.projectX, e.projectY, e))) : i > -.08 || e.frameCount < 2 ? (e.holdStatus = 1,
                            hs.add(Q.perfect(e.projectX, e.projectY, e)),
                            ds.add(ee.late(e.projectX, e.projectY))) : (e.holdStatus = 3,
                            hs.add(Q.good(e.projectX, e.projectY, e)),
                            ds.add(ee.late(e.projectX, e.projectY))),
                            1 === e.type && (e.status = e.holdStatus)
                        }
                        if (l.status ? (at.addCombo(l.status, 1),
                        l.scored = !0) : (l.holdTapTime = performance.now(),
                        l.holdBroken = !1),
                        o.judged = !0,
                        l.statOffset = i,
                        !c)
                            break
                    }
                    ut.eq("play") && a.holdTapTime && a.holdBroken && (a.status = 2,
                    at.addCombo(2, 3),
                    a.scored = !0)
                }
        }
    }
}
  , us = new G({
    updateCallback: e=>e.time++ > 0,
    iterateCallback(e) {
        dt.globalAlpha = .85,
        dt.setTransform(1, 0, 0, 1, e.offsetX, e.offsetY),
        dt.fillStyle = e.color,
        dt.beginPath(),
        dt.arc(0, 0, .5 * rt.lineScale, 0, 2 * Math.PI),
        dt.fill()
    }
})
  , ms = new s(lt);
function ps(e) {
    const t = lt.getBoundingClientRect();
    return {
        x: (e.clientX - t.left) / lt.offsetWidth * lt.width - (lt.width - ht.width) / 2,
        y: (e.clientY - t.top) / lt.offsetHeight * lt.height
    }
}
ms.setMouseEvent({
    mousedownCallback(e) {
        const t = e.button
          , {x: s, y: n} = ps(e);
        1 === t ? jt.activate("mouse", 4, s, n) : 2 === t ? jt.activate("mouse", 2, s, n) : jt.activate("mouse", 1 << t, s, n),
        Vt.activate(s, n)
    },
    mousemoveCallback(e) {
        const t = e.buttons
          , {x: s, y: n} = ps(e);
        for (let e = 1; e < 32; e <<= 1)
            t & e ? jt.moving("mouse", e, s, n) : jt.deactivate("mouse", e)
    },
    mouseupCallback(e) {
        const t = e.button;
        1 === t ? jt.deactivate("mouse", 4) : 2 === t ? jt.deactivate("mouse", 2) : jt.deactivate("mouse", 1 << t)
    }
}),
ms.setKeyboardEvent({
    keydownCallback(e) {
        ut.eq("stop") || ("Shift" === e.key ? Oe.click() : null == jt.list.find((t=>"keyboard" === t.type && t.id === e.code)) && jt.activate("keyboard", e.code, NaN, NaN))
    },
    keyupCallback(e) {
        ut.eq("stop") || "Shift" !== e.key && jt.deactivate("keyboard", e.code)
    }
}),
self.addEventListener("blur", (()=>{
    jt.clear("keyboard")
}
)),
ms.setTouchEvent({
    touchstartCallback(e) {
        for (const t of e.changedTouches) {
            const {x: e, y: s} = ps(t);
            jt.activate("touch", t.identifier, e, s),
            Vt.activate(e, s)
        }
    },
    touchmoveCallback(e) {
        for (const t of e.changedTouches) {
            const {x: e, y: s} = ps(t);
            jt.moving("touch", t.identifier, e, s)
        }
    },
    touchendCallback(e) {
        for (const t of e.changedTouches)
            jt.deactivate("touch", t.identifier)
    },
    touchcancelCallback(e) {
        for (const t of e.changedTouches)
            jt.deactivate("touch", t.identifier)
    }
});
const gs = {
    note: {},
    hitFX: {},
    async update(e, t, s, n=!1) {
        this.note[e] = new te(t,s,n),
        "Tap" === e && (this.note.TapBad = new te(await async function(e, t, s=512) {
            const n = q(t)
              , i = $(e.width, e.height, {
                willReadFrequently: !0
            });
            i.drawImage(e, 0, 0);
            for (let t = 0; t < e.height; t += s)
                for (let a = 0; a < e.width; a += s) {
                    const e = i.getImageData(a, t, s, s);
                    for (let t = 0; t < e.data.length / 4; t++)
                        e.data[4 * t] = n[0],
                        e.data[4 * t + 1] = n[1],
                        e.data[4 * t + 2] = n[2],
                        e.data[4 * t + 3] *= n[3] / 255;
                    i.putImageData(e, a, t)
                }
            return createImageBitmap(i.canvas)
        }(t, "#6c4343"),s))
    },
    async updateFX(e, t, s, n, i=!1, a) {
        const o = await J(e, s, n)
          , r = o.map((async e=>new te(await W(e, "rgba(255,236,160,0.8823529)"),t)))
          , l = o.map((async e=>new te(await W(e, "rgba(180,225,255,0.9215686)"),t)));
        e.close(),
        this.hitFX.Perfect = {
            effects: await Promise.all(r),
            numOfParts: i ? 0 : 4,
            duration: 0 | Number(a) || 500
        },
        this.hitFX.Good = {
            effects: await Promise.all(l),
            numOfParts: i ? 0 : 3,
            duration: 0 | Number(a) || 500
        },
        o.forEach((e=>e.close()))
    }
};
function vs(e, t) {
    const s = 1 - Ke.easeOutSine(1.5 * Xt.second);
    for (const n of rt.linesReversed)
        if (e ^ Number(n.imageD) && Xt.second < .67) {
            dt.globalAlpha = n.alpha,
            dt.setTransform(n.cosr * s, n.sinr, -n.sinr * s, n.cosr, rt.wlen + (n.offsetX - rt.wlen) * s, n.offsetY);
            const e = (n.imageU ? 18.75 * t : ht.height) * n.imageS / 1080
              , i = e * n.imageW * n.imageA
              , a = e * n.imageH;
            dt.drawImage(n.imageL[n.imageC && Me.checked ? at.lineStatus : 0], -i / 2, -a / 2, i, a)
        }
    dt.globalAlpha = 1
}
function bs(e, t, s, n, i) {
    dt.font = `${n}px Custom,Noto Sans SC`;
    const a = dt.measureText(e).width;
    return a > i && (dt.font = n / a * i + "px Custom,Noto Sans SC"),
    dt.fillText(e, t, s),
    a
}
function ws(e) {
    return e < 0 ? 0 : e > 1 ? 1 : e
}
function ys(e) {
    const t = e.isMulti && rt.multiHint
      , s = rt.noteScaleRatio;
    !e.visible || e.scored && null == e.badTime || (dt.setTransform(s * e.cosr, s * e.sinr, -s * e.sinr, s * e.cosr, e.offsetX, e.offsetY),
    null == e.badTime ? (dt.globalAlpha = e.alpha || (e.showPoint && Mt.checked ? .45 : 0),
    et.awawa && (dt.globalAlpha *= Math.max(1 + (Gt - e.seconds) / 1.5, 0)),
    gs.note[t ? "TapHL" : "Tap"].full(dt)) : (dt.globalAlpha = 1 - ws((performance.now() - e.badTime) / 500),
    gs.note.TapBad.full(dt)))
}
function xs(e) {
    const t = e.isMulti && rt.multiHint
      , s = rt.noteScaleRatio;
    !e.visible || e.scored && null == e.badTime || (dt.setTransform(s * e.cosr, s * e.sinr, -s * e.sinr, s * e.cosr, e.offsetX, e.offsetY),
    null == e.badTime && (dt.globalAlpha = e.alpha || (e.showPoint && Mt.checked ? .45 : 0),
    et.awawa && (dt.globalAlpha *= Math.max(1 + (Gt - e.seconds) / 1.5, 0)),
    gs.note[t ? "DragHL" : "Drag"].full(dt)))
}
function ks(e, t) {
    const s = e.isMulti && rt.multiHint
      , n = rt.noteScaleRatio;
    if (!e.visible || e.seconds + e.holdSeconds < t)
        return;
    dt.globalAlpha = e.alpha || (e.showPoint && Mt.checked ? .45 : 0),
    et.awawa && (dt.globalAlpha *= Math.max(1 + (Gt - e.seconds) / 1.5, 0)),
    dt.setTransform(n * e.cosr, n * e.sinr, -n * e.sinr, n * e.cosr, e.offsetX, e.offsetY);
    const i = rt.scaleY / n * e.speed * rt.speed
      , a = i * e.holdSeconds;
    e.seconds > t ? (gs.note[s ? "HoldHeadHL" : "HoldHead"].head(dt),
    gs.note[s ? "HoldHL" : "Hold"].body(dt, -a, a)) : gs.note[s ? "HoldHL" : "Hold"].body(dt, -a, a - i * (t - e.seconds)),
    gs.note.HoldEnd.tail(dt, -a)
}
function Ss(e) {
    const t = e.isMulti && rt.multiHint
      , s = rt.noteScaleRatio;
    !e.visible || e.scored && null == e.badTime || (dt.setTransform(s * e.cosr, s * e.sinr, -s * e.sinr, s * e.cosr, e.offsetX, e.offsetY),
    null == e.badTime && (dt.globalAlpha = e.alpha || (e.showPoint && Mt.checked ? .45 : 0),
    et.awawa && (dt.globalAlpha *= Math.max(1 + (Gt - e.seconds) / 1.5, 0)),
    gs.note[t ? "FlickHL" : "Flick"].full(dt)))
}
window.addEventListener("load", (()=>{
    (async()=>{
        if (lt.classList.add("fade"),
        st("初始化..."),
        await se({
            messageCallback: st,
            warnCallback: nt,
            errorCallback: it,
            mobileCallback: ()=>_e.style.display = "none",
            orientNotSupportCallback: ()=>{
                Bt.checked = !1,
                Bt.container.classList.add("disabled"),
                Bt.label.textContent += "(当前设备或浏览器不支持)"
            }
        }))
            return;
        await import("./utils/reader.js");
        const e = await async function(e) {
            const t = await (await fetch(e)).text();
            try {
                return JSON.parse(t)
            } catch (e) {
                return it("错误：解析资源时出现问题（点击查看详情）", Utils.escapeHTML(`解析资源时出现问题：\n ${e.message}\n原始数据：\n ${t}`), !0),
                null
            }
        }(atob("aHR0cHM6Ly9sY2h6aC5uZXQvZGF0YS9wYWNrLmpzb24=")).catch((()=>({
            image: {},
            audio: {},
            alternative: {},
            format: ""
        })));
        if (!e)
            return;
        await async function(e) {
            let t = 0
              , s = 0;
            const i = {};
            Object.assign(i, e.image),
            Object.assign(i, e.audio);
            const a = [];
            return "raw" === e.format ? (a.push(...Object.entries(e.image).map((async([e,n])=>{
                const [i,o] = n.split("|");
                console.log(i, o),
                await fetch(i, {
                    referrerPolicy: "no-referrer"
                }).then((async e=>e.blob())).then((async s=>{
                    const n = await createImageBitmap(s);
                    _t[e] = n,
                    st(`加载资源：${Math.floor(t++ / a.length * 100)}%`)
                }
                )).catch((()=>{
                    s++,
                    nt(`资源加载失败，请检查您的网络连接然后重试：\n ${new URL(i,location.toString()).toString()}`)
                }
                ))
            }
            ))),
            a.push(...Object.entries(e.audio).map((async([e,i])=>{
                await fetch(i, {
                    referrerPolicy: "no-referrer"
                }).then((async e=>e.arrayBuffer())).then((async s=>{
                    _t[e] = await n.decode(s),
                    st(`加载资源：${Math.floor(t++ / a.length * 100)}%`)
                }
                )).catch((()=>{
                    s++,
                    nt(`资源加载失败，请检查您的网络连接然后重试：\n ${new URL(i,location.toString()).toString()}`)
                }
                ))
            }
            )))) : a.push(...Object.entries(i).map((async([i,o])=>{
                const [r,l] = o.split("|");
                await fetch(r, {
                    referrerPolicy: "no-referrer"
                }).then((async e=>e.blob())).then((async s=>{
                    const o = await createImageBitmap(s);
                    if (null != l && l.startsWith("m")) {
                        const t = U.decode(o, Number(l.slice(1)));
                        o.close(),
                        _t[i] = await n.decode(t).catch((async t=>{
                            const s = await fetch(e.alternative[i], {
                                referrerPolicy: "no-referrer"
                            }).then((async e=>e.blob()));
                            return createImageBitmap(s).then(U.decodeAlt).then((async e=>n.decode(e))).catch((e=>(nt(`音频加载存在问题，将导致以下音频无法正常播放：\n ${i}(${e.message})\n如果多次刷新问题仍然存在，建议更换设备或浏览器。`),
                            n.mute(1))))
                        }
                        ))
                    } else
                        _t[i] = o;
                    st(`加载资源：${Math.floor(t++ / a.length * 100)}%`)
                }
                )).catch((e=>{
                    console.error(e),
                    it(`错误：${s++}个资源加载失败（点击查看详情）`, `资源加载失败，请检查您的网络连接然后重试：\n ${new URL(r,location.toString()).toString()}`, !0)
                }
                ))
            }
            ))),
            await Promise.all(a),
            {
                loadedNum: t,
                errorNum: s
            }
        }(e);
        await async function(e, t) {
            const s = ["Tap", "TapHL", "Drag", "DragHL", "HoldHead", "HoldHeadHL", "Hold", "HoldHL", "HoldEnd", "Flick", "FlickHL", "HitFXRaw"];
            null == e.image && (e.image = {});
            const {image: i} = e;
            for (const e of s)
                null == i[e] && (i[e] = "|8080");
            if (null == t.Tap) {
                const e = $(1089, 200);
                e.lineWidth = 32,
                e.strokeStyle = "#fff",
                e.stroke(new Path2D("M 0 0 L 1089 0 L 1089 200 L 0 200 Z")),
                e.strokeStyle = "#0ac3e1",
                e.stroke(new Path2D("M 50 50 L 1039 50 L 1039 150 L 50 150 Z")),
                t.Tap = await createImageBitmap(e.canvas)
            }
            if (null == t.TapHL) {
                const e = $(1089, 200);
                e.lineWidth = 32,
                e.strokeStyle = "#fdfd66",
                e.stroke(new Path2D("M 0 0 L 1089 0 L 1089 200 L 0 200 Z")),
                e.strokeStyle = "#0ac3e1",
                e.stroke(new Path2D("M 50 50 L 1039 50 L 1039 150 L 50 150 Z")),
                t.TapHL = await createImageBitmap(e.canvas)
            }
            if (null == t.Drag) {
                const e = $(1089, 160);
                e.lineWidth = 32,
                e.strokeStyle = "#fff",
                e.stroke(new Path2D("M 0 0 L 1089 0 L 1089 160 L 0 160 Z")),
                e.strokeStyle = "#f0ed69",
                e.stroke(new Path2D("M 50 50 L 1039 50 L 1039 110 L 50 110 Z")),
                t.Drag = await createImageBitmap(e.canvas)
            }
            if (null == t.DragHL) {
                const e = $(1089, 160);
                e.lineWidth = 32,
                e.strokeStyle = "#fdfd66",
                e.stroke(new Path2D("M 0 0 L 1089 0 L 1089 160 L 0 160 Z")),
                e.strokeStyle = "#f0ed69",
                e.stroke(new Path2D("M 50 50 L 1039 50 L 1039 110 L 50 110 Z")),
                t.DragHL = await createImageBitmap(e.canvas)
            }
            if (null == t.HoldHead) {
                const e = $(1089, 100);
                e.lineWidth = 32,
                e.strokeStyle = "#fff",
                e.stroke(new Path2D("M 0 0 L 0 100 L 1089 100 L 1089 0")),
                e.strokeStyle = "#96ebfc",
                e.stroke(new Path2D("M 50 0 L 50 50 L 1039 50 L 1039 0")),
                t.HoldHead = await createImageBitmap(e.canvas)
            }
            if (null == t.HoldHeadHL) {
                const e = $(1089, 100);
                e.lineWidth = 32,
                e.strokeStyle = "#fdfd66",
                e.stroke(new Path2D("M 0 0 L 0 100 L 1089 100 L 1089 0")),
                e.strokeStyle = "#96ebfc",
                e.stroke(new Path2D("M 50 0 L 50 50 L 1039 50 L 1039 0")),
                t.HoldHeadHL = await createImageBitmap(e.canvas)
            }
            if (null == t.Hold) {
                const e = $(1089, 1900);
                e.lineWidth = 32,
                e.strokeStyle = "#fff",
                e.stroke(new Path2D("M 0 0 L 0 1900 M 1089 0 L 1089 1900")),
                e.strokeStyle = "#96ebfc",
                e.stroke(new Path2D("M 50 0 L 50 1900 M 1039 0 L 1039 1900")),
                t.Hold = await createImageBitmap(e.canvas)
            }
            if (null == t.HoldHL) {
                const e = $(1089, 1900);
                e.lineWidth = 32,
                e.strokeStyle = "#fdfd66",
                e.stroke(new Path2D("M 0 0 L 0 1900 M 1089 0 L 1089 1900")),
                e.strokeStyle = "#96ebfc",
                e.stroke(new Path2D("M 50 0 L 50 1900 M 1039 0 L 1039 1900")),
                t.HoldHL = await createImageBitmap(e.canvas)
            }
            if (null == t.HoldEnd) {
                const e = $(1089, 100);
                e.lineWidth = 32,
                e.strokeStyle = "#fff",
                e.stroke(new Path2D("M 0 100 L 0 0 L 1089 0 L 1089 100")),
                e.strokeStyle = "#96ebfc",
                e.stroke(new Path2D("M 50 100 L 50 50 L 1039 50 L 1039 100")),
                t.HoldEnd = await createImageBitmap(e.canvas)
            }
            if (null == t.Flick) {
                const e = $(1089, 300);
                e.lineWidth = 32,
                e.strokeStyle = "#fff",
                e.stroke(new Path2D("M 0 0 L 1089 0 L 1089 300 L 0 300 Z")),
                e.strokeStyle = "#fe4365",
                e.stroke(new Path2D("M 50 50 L 1039 50 L 1039 250 L 50 250 Z")),
                t.Flick = await createImageBitmap(e.canvas)
            }
            if (null == t.FlickHL) {
                const e = $(1089, 300);
                e.lineWidth = 32,
                e.strokeStyle = "#fdfd66",
                e.stroke(new Path2D("M 0 0 L 1089 0 L 1089 300 L 0 300 Z")),
                e.strokeStyle = "#fe4365",
                e.stroke(new Path2D("M 50 50 L 1039 50 L 1039 250 L 50 250 Z")),
                t.FlickHL = await createImageBitmap(e.canvas)
            }
            if (null == t.Rank) {
                const e = ["#fffb00", "#a937e7", "#ea61df", "#ff9e22", "#00a844", "#00e8de", "#e4e4e4"]
                  , s = [5232301, 4532785, 16267326, 18415150, 16301615, 31491134, 1088575]
                  , n = $(256, 1792);
                for (let t = 0; t < 7; t++) {
                    n.fillStyle = "#fff",
                    n.fillRect(0, 256 * t, 256, 256),
                    n.fillStyle = "#303030",
                    n.fillRect(16, 256 * t + 16, 224, 224),
                    n.fillStyle = e[t];
                    const i = s[t]
                      , a = 32
                      , o = (256 - 5 * a) / 2;
                    for (let e = 0; e < 25; e++)
                        if (i >> e & 1) {
                            const s = o + e % 5 * a
                              , i = o + Math.floor(e / 5) * a + 256 * t;
                            n.fillRect(s, i, a, a)
                        }
                }
                t.Rank = await createImageBitmap(n.canvas)
            }
            if (null == t.HitFXRaw) {
                const e = $(256, 7680);
                e.strokeStyle = "#fff";
                for (let t = 0; t < 30; t++) {
                    const s = t / 30;
                    e.lineWidth = (1 - s) ** 2 * 25,
                    e.globalAlpha = 1 - s;
                    const n = s ** .2 * 224;
                    e.strokeRect(128 - n / 2, 256 * t + 128 - n / 2, n, n)
                }
                t.HitFXRaw = await createImageBitmap(e.canvas)
            }
            if (null == t.LevelOver1) {
                const e = $(1716, 325);
                e.fillStyle = "#000",
                e.globalAlpha = .8,
                e.fillRect(0, 0, 1716, 325),
                e.fillStyle = "#989898",
                e.fillRect(0, 94, 1716, 137),
                e.globalAlpha = 1,
                e.fillStyle = "white",
                e.textAlign = "right",
                e.font = "bold 30px Custom",
                e.fillText("ACC:", 240, 172),
                e.fillText("Max combo:", 1420, 172),
                e.textAlign = "center",
                e.font = "bold 22px Custom",
                e.fillText("Perfect", 788, 304),
                e.fillText("Good", 942, 304),
                e.fillText("Bad", 1096, 304),
                e.fillText("Miss", 1250, 304),
                t.LevelOver1 = await createImageBitmap(e.canvas)
            }
            if (null == t.LevelOver4) {
                const e = $(633, 122)
                  , s = e.createLinearGradient(24, 0, 633, 0);
                s.addColorStop(0, "rgba(0,0,0,0.78125)"),
                s.addColorStop(1, "rgba(0,0,0,0)"),
                e.fillStyle = s,
                e.fillRect(24, 24, 609, 72),
                t.LevelOver4 = await createImageBitmap(e.canvas)
            }
            if (null == t.LevelOver5) {
                const e = $(11, 43);
                e.fillStyle = "#fff",
                e.fillRect(3, 1, 7, 40),
                t.LevelOver5 = await createImageBitmap(e.canvas)
            }
            const a = ["HitFXRaw", "Rank", "LevelOver1", "LevelOver3", "LevelOver4", "LevelOver5"];
            for (const e of a)
                null == t[e] && (t[e] = await createImageBitmap($(1, 1).canvas));
            if (null == t.JudgeLine) {
                const e = $(1920, 3);
                e.fillStyle = "#fff",
                e.fillRect(0, 0, 1920, 3),
                t.JudgeLine = await createImageBitmap(e.canvas)
            }
            if (null == t.ProgressBar) {
                const e = $(1919, 11);
                e.fillStyle = "#919191",
                e.fillRect(0, 0, 1916, 11),
                e.fillStyle = "#fff",
                e.fillRect(1916, 0, 3, 11),
                t.ProgressBar = await createImageBitmap(e.canvas)
            }
            null == t.HitSong0 && (t.HitSong0 = n.triangle(.075, 880, .5)),
            null == t.HitSong1 && (t.HitSong1 = n.triangle(.05, 1318, .5)),
            null == t.HitSong2 && (t.HitSong2 = n.triangle(.075, 1760, .5)),
            null == t.LevelOver0_v1 && (t.LevelOver0_v1 = n.noise(27.83)),
            null == t.LevelOver1_v1 && (t.LevelOver1_v1 = n.noise(27.83)),
            null == t.LevelOver2_v1 && (t.LevelOver2_v1 = n.noise(27.83)),
            null == t.LevelOver3_v1 && (t.LevelOver3_v1 = n.noise(27.83))
        }(e, _t),
        await Promise.all(["Tap", "TapHL", "Drag", "DragHL", "HoldHead", "HoldHeadHL", "Hold", "HoldHL", "HoldEnd", "Flick", "FlickHL"].map((async t=>gs.update(t, _t[t], 8080 / Number(e.image[t].split("|")[1]))))),
        await gs.updateFX(_t.HitFXRaw, 8080 / Number(e.image.HitFXRaw.split("|")[1])),
        _t.NoImageBlack = await createImageBitmap(new ImageData(new Uint8ClampedArray(4).fill(0),1,1)),
        _t.NoImageWhite = await createImageBitmap(new ImageData(new Uint8ClampedArray(4).fill(255),1,1)),
        _t.JudgeLineMP = await W(_t.JudgeLine, "#feffa9"),
        _t.JudgeLineFC = await W(_t.JudgeLine, "#a2eeff"),
        _t.Ranks = await J(_t.Rank),
        _t.Rank.close(),
        _t.mute = n.mute(1),
        0 !== (()=>{
            const e = $(1, 1);
            return e.drawImage(_t.JudgeLine, 0, 0),
            e.getImageData(0, 0, 1, 1).data[0]
        }
        )() ? (st("等待上传文件..."),
        ye.classList.remove("disabled"),
        Ze.classList.remove("disabled"),
        ut.dispatchEvent(new CustomEvent("change"))) : it("检测到图片加载异常，请关闭所有应用程序然后重试")
    }
    )()
}
), {
    once: !0
});
const Ls = new Map;
class Ts {
    constructor(e) {
        t(this, "image"),
        t(this, "imageFC"),
        t(this, "imageAP"),
        t(this, "imageMP"),
        this.image = e,
        this.imageFC = null,
        this.imageAP = null,
        this.imageMP = null
    }
    async getFC() {
        return null == this.imageFC && (this.imageFC = await W(this.image, "#a2eeff")),
        this.imageFC
    }
    async getAP() {
        return null == this.imageAP && (this.imageAP = await Promise.resolve(null)),
        this.imageAP
    }
    async getMP() {
        return null == this.imageMP && (this.imageMP = await W(this.image, "#feffa9")),
        this.imageMP
    }
}
const Es = e=>{
    const t = Ls.get(e) || new Ts(e);
    return Ls.has(e) || Ls.set(e, t),
    t
}
;
function Ms(e=0) {
    let t = e;
    return t < 1024 ? `${t}B` : (t /= 1024) < 1024 ? `${t.toFixed(2)}KB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}MB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}GB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}TB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}PB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}EB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}ZB` : (t /= 1024) < 1024 ? `${t.toFixed(2)}YB` : (t /= 1024,
    `${t}BB`)
}
const Cs = e=>{
    const t = {
        sp: [0, 0],
        ez: [1, 7],
        hd: [3, 12],
        in: [6, 15],
        at: [13, 16]
    };
    let s = (Ve.value || "SP").toLowerCase()
      , n = 0 | Number(ze.value);
    if (0 === e) {
        const e = t[s];
        n < e[0] && (n = e[0]),
        n > e[1] && (n = e[1]),
        ze.value = n.toString(),
        ze.value = ze.value
    } else if (1 === e) {
        var i, a;
        const e = Object.keys(t);
        t[s][1] < n ? s = null !== (i = e.find((e=>t[e][1] >= n))) && void 0 !== i ? i : "SP" : t[s][0] > n && (s = null !== (a = e.reverse().find((e=>t[e][0] <= n))) && void 0 !== a ? a : "SP"),
        Ve.value = s.toUpperCase(),
        Ve.value = Ve.value
    }
    return [Ve.value || "SP", ze.value || "?"].join(" Lv.")
}
;
async function As() {
    if (ut.eq("stop")) {
        if (!Ne.value)
            return void it("错误：未选择任何谱面");
        for (const e of et.before.values())
            await e();
        n.play(_t.mute, {
            loop: !0,
            isOut: !1
        }),
        rt.prerenderChart(et.modify(wt.get(Ne.value)));
        const e = yt.get(Ne.value)
          , t = xt.get(Ne.value);
        at.level = Number(/\d+$/.exec(pt)),
        null != rt.chart && at.reset(rt.chart.numOfNotes, e, t, je.value),
        await async function({onwarn: e=(e=>{}
        )}={}) {
            for (const e of rt.lines)
                e.imageW = 6220.8,
                e.imageH = 7.68,
                e.imageL = [_t.JudgeLine, _t.JudgeLineMP, null, _t.JudgeLineFC],
                e.imageS = 1,
                e.imageA = 1,
                e.imageD = !1,
                e.imageC = !0,
                e.imageU = !0;
            for (const t of kt)
                if (Ne.value === t.Chart) {
                    if (null == t.LineId) {
                        e("未指定判定线id");
                        continue
                    }
                    const s = rt.lines[Number(t.LineId)];
                    if (null == s) {
                        e(`指定id的判定线不存在：${t.LineId}`);
                        continue
                    }
                    let n = null == t.Image ? null : gt.get(t.Image);
                    n || (null != t.Image && e(`图片不存在：${t.Image}`),
                    n = _t.NoImageBlack),
                    s.imageW = n.width,
                    s.imageH = n.height;
                    const i = Es(n);
                    s.imageL = await Promise.all([n, i.getMP(), i.getAP(), i.getFC()]);
                    let a = 0;
                    null != t.Vert && isFinite(a = parseFloat(t.Vert)) && (s.imageS = 1080 * Math.abs(a) / n.height,
                    s.imageU = a > 0),
                    null != t.Horz && isFinite(a = parseFloat(t.Horz)) && (s.imageA = a),
                    null != t.IsDark && isFinite(a = parseFloat(t.IsDark)) && (s.imageD = !!a),
                    null != t.Scale && isFinite(a = parseFloat(String(t.Scale))) && (s.imageS = a),
                    null != t.Aspect && isFinite(a = parseFloat(String(t.Aspect))) && (s.imageA = a),
                    null != t.UseBackgroundDim && isFinite(a = parseFloat(String(t.UseBackgroundDim))) && (s.imageD = !!a),
                    null != t.UseLineColor && isFinite(a = parseFloat(String(t.UseLineColor))) && (s.imageC = !!a),
                    null != t.UseLineScale && isFinite(a = parseFloat(String(t.UseLineScale))) && (s.imageU = !!a)
                }
        }({
            onwarn: nt
        }),
        rt.bgImage = gt.get(Re.value) || _t.NoImageWhite,
        rt.bgImageBlur = vt.get(Re.value) || _t.NoImageWhite;
        const s = bt.get(Fe.value) || {
            audio: n.mute(rt.chart.maxSeconds + .5),
            video: null
        };
        rt.bgMusic = s.audio,
        rt.bgVideo = s.video,
        Kt = rt.bgMusic.duration / rt.speed,
        Qt = !1,
        es = !1,
        ts = !1,
        Zt = 0,
        Ae.checked || $t.addTime(3e3),
        ns.start(),
        $t.play(),
        ms.activate(),
        ut.emit("play")
    } else
        ut.emit("stop"),
        ms.deactive(),
        n.stop(),
        ns.stop(),
        as = !1,
        os = null,
        us.clear(),
        hs.clear(),
        ds.clear(),
        $t.reset(),
        Xt.reset(),
        Yt.reset(),
        Wt = 0,
        Jt = 0,
        Kt = 0
}
async function Is() {
    ut.eq("stop") || as || (ut.eq("play") ? (null != rt.bgVideo && rt.bgVideo.pause(),
    $t.pause(),
    Ae.checked && es && Xt.pause(),
    Wt = Zt,
    n.stop(),
    ut.emit("pause")) : (null != rt.bgVideo && await cs(rt.bgVideo, Zt * rt.speed),
    $t.play(),
    Ae.checked && es && Xt.play(),
    Qt && !es && ls(rt.bgMusic, Zt * rt.speed),
    ut.emit("play")))
}
pt = Cs(-1),
Ve.addEventListener("change", (()=>{
    pt = Cs(0)
}
)),
ze.addEventListener("change", (()=>{
    pt = Cs(1)
}
)),
Ue.addEventListener("change", (e=>{
    const t = Number(e.target.value);
    rt.musicVolume = Math.min(1, 1 / t),
    rt.soundVolume = Math.min(1, t),
    Promise.resolve().then(Is).then(Is)
}
)),
Lt.reg("selectVolume", Ue),
Ce.addEventListener("change", (e=>{
    rt.playMode = e.target.checked ? 1 : 0
}
)),
Ce.dispatchEvent(new Event("change")),
It.checkbox.addEventListener("change", (e=>{
    rt.setLowResFactor(e.target.checked ? .5 : 1)
}
)),
It.checkbox.dispatchEvent(new Event("change")),
Re.onchange = ()=>{
    rt.bgImage = gt.get(Re.value),
    rt.bgImageBlur = vt.get(Re.value),
    ot.resize()
}
,
Ne.addEventListener("change", Nt),
function() {
    const e = document.createElement("input");
    Object.assign(e, {
        type: "number",
        min: 25,
        max: 1e3,
        value: 60
    }),
    e.style.cssText += ";width:50px;margin-left:10px",
    e.addEventListener("change", (function() {
        const e = Number(this.value);
        e < 25 && (this.value = "25"),
        e > 1e3 && (this.value = "1000"),
        ns.setFrameRate(Number(this.value))
    }
    )),
    Lt.reg("maxFrameNumber", e, !1),
    Rt.container.appendChild(e),
    Rt.checkbox.addEventListener("change", (function() {
        e.classList.toggle("disabled", !this.checked),
        this.checked ? e.dispatchEvent(new Event("change")) : ns.setFrameRate(0)
    }
    )),
    Rt.checkbox.dispatchEvent(new Event("change"))
}(),
ut.addEventListener("change", (function() {
    lt.classList.toggle("fade", this.eq("stop")),
    Ge.classList.toggle("fade", this.ne("stop")),
    Pe.value = this.eq("stop") ? "播放" : "停止",
    Oe.value = this.eq("pause") ? "继续" : "暂停",
    Oe.classList.toggle("disabled", this.eq("stop"));
    for (const e of (e=>document.body.querySelectorAll(e))(".disabled-when-playing"))
        e.classList.toggle("disabled", this.ne("stop"))
}
)),
Pe.addEventListener("click", (function() {
    (async()=>{
        this.classList.contains("disabled") || (this.classList.add("disabled"),
        await As(),
        this.classList.remove("disabled"))
    }
    )()
}
)),
Oe.addEventListener("click", (function() {
    (async()=>{
        this.classList.contains("disabled") || (this.classList.add("disabled"),
        await Is(),
        this.classList.remove("disabled"))
    }
    )()
}
)),
Ee.addEventListener("input", (function() {
    const e = Number(this.value);
    e < -400 && (this.value = "-400"),
    e > 600 && (this.value = "600")
}
)),
mt.reg(ut, "change", (()=>et.awawa ? "Reversed" : "")),
mt.reg(De, "change", (e=>["", "FlipX", "FlipY", "FlipX&Y"][Number(e.value)])),
mt.reg(je, "change", (e=>e.value)),
mt.reg(ut, "change", (e=>e.eq("pause") ? "Paused" : ""));
const Bs = (e,t)=>{
    He.addEventListener("input", ((e,t)=>{
        let s = 0;
        return ()=>{
            clearTimeout(s),
            s = self.setTimeout(e, t)
        }
    }
    )((()=>{
        He.value === e && (t(),
        He.value = "",
        He.dispatchEvent(new Event("input")))
    }
    ), 1e3))
}
  , Rs = (e,t)=>new Z(e).appendBefore(Tt.container).hook(t);
et.fireModal = function(e="", t="") {
    const s = document.createElement("div");
    s.classList.add("cover-dark", "fade");
    const n = document.createElement("div");
    n.classList.add("cover-view", "fade");
    const i = document.createElement("div");
    i.classList.add("view-nav"),
    i.innerHTML = e;
    const a = document.createElement("div");
    return a.classList.add("view-content"),
    a.innerHTML = t,
    a.addEventListener("custom-done", (()=>s.click())),
    n.append(i, a),
    requestAnimationFrame((()=>{
        re(".main").append(s, n),
        requestAnimationFrame((()=>{
            s.classList.remove("fade"),
            n.classList.remove("fade")
        }
        ))
    }
    )),
    s.addEventListener("click", (()=>{
        s.classList.add("fade"),
        s.addEventListener("transitionend", (()=>{
            s.remove()
        }
        )),
        n.classList.add("fade"),
        n.addEventListener("transitionend", (()=>{
            n.remove()
        }
        ))
    }
    )),
    a
}
,
et.toast = (e="")=>et.fireModal("<p>提示</p>", `<p style="white-space:pre;text-align:left;display:inline-block;">${e}</p>`),
et.define = e=>e,
et.use = async e=>{
    const t = await e.then((e=>e.default));
    for (const e of t.contents)
        if ("command" === e.type)
            Bs(e.meta[0], e.meta[1]);
        else if ("script" === e.type)
            e.meta[0](re);
        else {
            if ("config" !== e.type)
                throw new TypeError(`Unknown Plugin Type: ${e.type}`);
            Rs(e.meta[0], e.meta[1])
        }
    return console.log(t),
    t
}
,
et.use(import("./plugins/phizone.js")),
et.use(import("./plugins/tips.js")),
et.use(import("./plugins/filter.js")),
et.use(import("./plugins/skin.js")),
et.use(import("./plugins/export.js")),
et.use(import("./plugins/gauge.js")),
et.use(import("./plugins/dynamic-score.js")),
self.hook = et;
const Ps = et;
et.stat = at,
et.app = rt,
et.res = _t,
et.audio = n,
et.sendText = st,
et.sendWarning = nt,
et.sendError = it,
et.frameAnimater = ns,
et.timeEnd = Yt,
et.bgms = bt,
et.inputName = He,
et.selectbgm = Fe,
et.selectchart = Ne,
et.chartsMD5 = yt,
et.noteRender = gs,
et.fileReader = E,
et.ZipReader = S,
et.status = Lt,
et.tmps = rs,
et.awawa = !1,
et.pause = async()=>ut.eq("play") && Is(),
Object.defineProperty(et, "playing", {
    get: ()=>ut.eq("play")
}),
Object.defineProperty(et, "time", {
    get: ()=>Zt,
    set(e) {
        (async()=>{
            if (ut.eq("stop") || as)
                return;
            const t = ut.eq("play");
            t && await Is(),
            Zt = e / rt.speed,
            Wt = Zt,
            rt.seekLineEventIndex(),
            t && await Is().catch(console.warn)
        }
        )()
    }
});
export {U as I, C as c, L as d, E as f, Ps as h, M as j, y as m, gs as n, c as s};
//# sourceMappingURL=index-2c326a48.js.map
