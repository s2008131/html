const t=hook.define({name:"PhiZone",description:"PhiZone API",contents:[{type:"command",meta:["/pz",async function(t){const s=t||a("请输入歌曲ID");if(""===s||null===s)return void o("未输入歌曲ID，已取消操作");const r=await async function(t){e.sendMessage("等待服务器响应...");const s=await fetch(`${n}/songs/${0|t}/?query_charts=1`);if(!s.ok){if(404===s.status)return{charts:[]};throw new Error(`${s.status} ${s.statusText}`)}const r=await s.json();return console.log(r),c(r.charts.filter((t=>t.chart)),r)}(s).catch((t=>{o(`无法连接至服务器\n错误代码：${t.message}`),e.sendMessage("无法连接至服务器")}));if(console.log(r),r){if(!r.charts.length)return void o(`歌曲ID ${s} 对应的谱面不存在`);await i(r)}}]},{type:"command",meta:["/random",async function(){const t=await async function(){e.sendMessage("等待服务器响应...");const t=await fetch(`${n}/charts/?pagination=0&query_charts=1`);if(!t.ok){if(404===t.status)return{charts:[]};throw new Error(`${t.status} ${t.statusText}`)}const s=(await t.json()).filter((t=>t.chart)).sort((t=>Math.random()-.5))[0],r=await fetch(`${n}/songs/${s.song}/`).then((t=>t.json()));return c([s],r)}().catch((t=>o(`无法连接至服务器\n错误代码：${t.message}`)));if(console.log(t),t){if(!t.charts.length)return void o("歌曲ID <random> 对应的谱面不存在");await i(t)}}]}]}),{msgHandler:e,uploader:s}=hook,n="https://api.phi.zone",r="PhiZone API v0.7.2",a=t=>prompt(`${r}\n${t}`),o=t=>hook.toast(`${r}\n${t}`);function c(t,e){return{charts:t.map((t=>({id:t.id,chart:t.chart,level:`${t.level} Lv.${0|t.difficulty}`,charter:t.charter.replace(/\[PZUser:\d+:([^\]]+?)(:PZRT)?\]/g,"$1"),assets:t.assets}))),composer:e.composer,illustration:e.illustration,illustrator:e.illustrator,name:e.name,song:e.song}}async function i(t){const{charts:n}=t,r=[t.song,t.illustration];for(const t of n)t.chart&&r.push(t.chart),t.assets&&r.push(t.assets);const a=new u,c=t=>decodeURIComponent(t.match(/[^/]+$/)[0]);e.sendMessage("获取资源列表..."),await a.add(r,(({url:t,status:e,statusText:s})=>{o(`资源 '${c(t)}' 加载失败\n错误代码：${e} ${s}`)})),await a.start(s.fireProgress.bind(s));const i=async(t,e)=>{const n=await a.getData(t)||new ArrayBuffer(0);s.fireLoad({name:e},n)};await i(t.song,c(t.song)),await i(t.illustration,c(t.illustration));for(let e=0;e<n.length;e++){const r=n[e];r.assets&&await i(r.assets,c(r.assets)),await i(r.chart,c(r.chart));const a=new TextEncoder,o=h(r.id),u=`\n      #\n      Name: ${t.name}\n      Song: ${c(t.song)}\n      Picture: ${c(t.illustration)}\n      Chart: ${c(r.chart)}\n      Level: ${r.level}\n      Composer: ${t.composer}\n      Charter: ${r.charter}\n      Illustrator: ${t.illustrator}\n      Offset: ${o}\n    `,l=a.encode(u);s.fireLoad({name:"info.txt"},l.buffer)}}function u(){this.xhrs=Object.create(null)}function h(t){return 29===t?200:31===t?100:38===t?175:41===t?50:42===t?175:44===t?-150:54===t?-500:57===t?100:59===t?50:60===t?150:63===t?175:64===t?150:65===t?250:69===t?-100:71===t?50:73===t?200:74===t?300:76===t?-50:77===t?300:78===t||80===t?200:81===t||84===t?250:85===t?400:87===t?-50:88===t?225:90===t||91===t||93===t?200:95===t?175:100===t?150:101===t?-100:102===t?-200:103===t?-50:105===t?-400:106===t?250:107===t?150:108===t?200:110===t?150:115===t?200:119===t?100:133===t?-150:134===t?-100:0}u.prototype.add=function(t=[],e=(t=>{})){return Promise.all(t.filter((t=>!this.xhrs[t])).map((async t=>{try{const e=await async function(t){try{const e=await fetch(t,{method:"HEAD"}).catch((()=>{throw Object.assign(new Error,{url:t,status:0,statusText:"Network Error"})})),s=Number(e.headers.get("content-length"))||0;if(e.ok&&s)return s}catch{const e=await fetch(t,{method:"GET"}).catch((()=>{throw Object.assign(new Error,{url:t,status:0,statusText:"Network Error"})}));if(e.body.cancel(),!e.ok)throw Object.assign(new Error,{url:t,status:e.status,statusText:e.statusText});return Number(e.headers.get("content-length"))||0}throw Object.assign(new Error,{url:t,status:0,statusText:"Unknown Error"})}(t);this.xhrs[t]={event:{loaded:0,total:e}}}catch(t){e(t)}})))},u.prototype.start=function(t=((...t)=>{})){const e=Object.entries(this.xhrs);return Promise.all(e.map((([e,s])=>function(t,e=(t=>{})){return new Promise(((s,n)=>{const r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType="arraybuffer",r.onprogress=e,r.onload=t=>(200===r.status?s:n)(t),r.onerror=n,r.send()}))}(e,(e=>{s.event=e,t(this.loaded,this.total)})).then((t=>s.event=t)).catch((t=>s.event=t)))))},u.prototype.getData=function(t){if(!this.xhrs[t])return null;const{event:e}=this.xhrs[t];return e.loaded>=e.total?e.target.response:null},Object.defineProperty(u.prototype,"loaded",{get(){return Object.values(this.xhrs).reduce(((t,e)=>t+e.event.loaded),0)}}),Object.defineProperty(u.prototype,"total",{get(){return Object.values(this.xhrs).reduce(((t,e)=>t+Math.max(e.event.loaded,e.event.total)),0)}});export{t as default};
//# sourceMappingURL=phizone-33b53879.js.map
