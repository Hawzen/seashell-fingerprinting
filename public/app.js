var Uy=Object.defineProperty;var Ly=(e,t,n)=>t in e?Uy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Re=(e,t,n)=>Ly(e,typeof t!="symbol"?t+"":t,n);const Fy="modulepreload",Wy=function(e){return"/"+e},Xl={},qy=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=s(n.map(d=>{if(d=Wy(d),d in Xl)return;Xl[d]=!0;const c=d.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Fy,c||(f.as="script"),f.crossOrigin="",f.href=d,l&&f.setAttribute("nonce",l),document.head.appendChild(f),c)return new Promise((g,w)=>{f.addEventListener("load",g),f.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return i.then(s=>{for(const o of s||[])o.status==="rejected"&&a(o.reason);return t().catch(a)})};let Vy=rh;const kn=1,Dr=2,eh={owned:null,cleanups:null,context:null,owner:null};var He=null;let Ai=null,Hy=null,xt=null,tt=null,sn=null,ti=0;function Gy(e,t){const n=xt,r=He,i=e.length===0,a=t===void 0?r:t,s=i?eh:{owned:null,cleanups:null,context:a?a.context:null,owner:a},o=i?e:()=>e(()=>ni(()=>tr(s)));He=s,xt=null;try{return ri(o,!0)}finally{xt=n,He=r}}function Ur(e,t,n){const r=Xy(e,t,!1,kn);th(r)}function ni(e){if(xt===null)return e();const t=xt;xt=null;try{return e()}finally{xt=t}}function jy(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&ri(()=>{for(let i=0;i<e.observers.length;i+=1){const a=e.observers[i],s=Ai&&Ai.running;s&&Ai.disposed.has(a),(s?!a.tState:!a.state)&&(a.pure?tt.push(a):sn.push(a),a.observers&&ih(a)),s||(a.state=kn)}if(tt.length>1e6)throw tt=[],new Error},!1)),t}function th(e){if(!e.fn)return;tr(e);const t=ti;Ky(e,e.value,t)}function Ky(e,t,n){let r;const i=He,a=xt;xt=He=e;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=kn,e.owned&&e.owned.forEach(tr),e.owned=null),e.updatedAt=n+1,ah(s)}finally{xt=a,He=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?jy(e,r):e.value=r,e.updatedAt=n)}function Xy(e,t,n,r=kn,i){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:He,context:He?He.context:null,pure:n};return He===null||He!==eh&&(He.owned?He.owned.push(a):He.owned=[a]),a}function nh(e){if(e.state===0)return;if(e.state===Dr)return Wa(e);if(e.suspense&&ni(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ti);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===kn)th(e);else if(e.state===Dr){const r=tt;tt=null,ri(()=>Wa(e,t[0]),!1),tt=r}}function ri(e,t){if(tt)return e();let n=!1;t||(tt=[]),sn?n=!0:sn=[],ti++;try{const r=e();return Yy(n),r}catch(r){n||(sn=null),tt=null,ah(r)}}function Yy(e){if(tt&&(rh(tt),tt=null),e)return;const t=sn;sn=null,t.length&&ri(()=>Vy(t),!1)}function rh(e){for(let t=0;t<e.length;t++)nh(e[t])}function Wa(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===kn?r!==t&&(!r.updatedAt||r.updatedAt<ti)&&nh(r):i===Dr&&Wa(r,t)}}}function ih(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Dr,n.pure?tt.push(n):sn.push(n),n.observers&&ih(n))}}function tr(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const a=i.pop(),s=n.observerSlots.pop();r<i.length&&(a.sourceSlots[s]=r,i[r]=a,n.observerSlots[r]=s)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)tr(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)tr(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Zy(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ah(e,t=He){throw Zy(e)}function Je(e,t){return ni(()=>e(t||{}))}function Qy(e,t,n){let r=n.length,i=t.length,a=r,s=0,o=0,l=t[i-1].nextSibling,d=null;for(;s<i||o<a;){if(t[s]===n[o]){s++,o++;continue}for(;t[i-1]===n[a-1];)i--,a--;if(i===s){const c=a<r?o?n[o-1].nextSibling:n[a-o]:l;for(;o<a;)e.insertBefore(n[o++],c)}else if(a===o)for(;s<i;)(!d||!d.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[a-1]&&n[o]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(n[o++],t[s++].nextSibling),e.insertBefore(n[--a],c),t[i]=n[a]}else{if(!d){d=new Map;let h=o;for(;h<a;)d.set(n[h],h++)}const c=d.get(t[s]);if(c!=null)if(o<c&&c<a){let h=s,f=1,g;for(;++h<i&&h<a&&!((g=d.get(t[h]))==null||g!==c+f);)f++;if(f>c-o){const w=t[s];for(;o<c;)e.insertBefore(n[o++],w)}else e.replaceChild(n[o++],t[s++])}else s++;else t[s++].remove()}}}function Jy(e,t,n,r={}){let i;return Gy(a=>{i=a,t===document?e():vt(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function it(e,t,n,r){let i;const a=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},s=()=>(i||(i=a())).cloneNode(!0);return s.cloneNode=s,s}function ew(e,t){t==null?e.removeAttribute("class"):e.className=t}function ge(e,t,n){return ni(()=>e(t,n))}function vt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return Lr(e,t,r,n);Ur(i=>Lr(e,t(),i,n),r)}function Lr(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(s){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=yn(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=yn(e,n,r);else{if(a==="function")return Ur(()=>{let o=t();for(;typeof o=="function";)o=o();n=Lr(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],l=n&&Array.isArray(n);if(qa(o,t,n,i))return Ur(()=>n=Lr(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=yn(e,n,r),s)return n}else l?n.length===0?Yl(e,o,r):Qy(e,n,o):(n&&yn(e),Yl(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(s)return n=yn(e,n,r,t);yn(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function qa(e,t,n,r){let i=!1;for(let a=0,s=t.length;a<s;a++){let o=t[a],l=n&&n[e.length],d;if(!(o==null||o===!0||o===!1))if((d=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=qa(e,o,l)||i;else if(d==="function")if(r){for(;typeof o=="function";)o=o();i=qa(e,Array.isArray(o)?o:[o],Array.isArray(l)?l:[l])||i}else e.push(o),i=!0;else{const c=String(o);l&&l.nodeType===3&&l.data===c?e.push(l):e.push(document.createTextNode(c))}}return i}function Yl(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function yn(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let a=!1;for(let s=t.length-1;s>=0;s--){const o=t[s];if(i!==o){const l=o.parentNode===e;!a&&!s?l?e.replaceChild(i,o):e.insertBefore(i,n):l&&o.remove()}else a=!0}}else e.insertBefore(i,n);return[i]}const tw=`@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600;700;800&display=swap");

:root {
  color-scheme: light;
  --ink: #1f2628;
  --muted: #687170;
  --line: #d9d8ce;
  --paper: #f8f5ee;
  --panel: #ffffff;
  --wash: #eaf0ed;
  --teal: #1f756f;
  --coral: #b8624e;
  --museum-blue: #2b5f74;
  --shadow: 0 18px 44px rgba(31, 36, 42, 0.1);
}

* {
  box-sizing: border-box;
}

[hidden] {
  display: none !important;
}

html,
body {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

body > div {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-family: Fraunces, Georgia, "Times New Roman", serif;
  font-size: clamp(22px, 3vw, 34px);
  line-height: 1.22;
  padding-top: 2px;
  letter-spacing: 0;
  color: #172325;
}

h2 {
  font-family: Fraunces, Georgia, "Times New Roman", serif;
  font-size: 13px;
  line-height: 1.2;
  color: #304044;
  letter-spacing: 0;
}

h3 {
  font-size: 13px;
  line-height: 1.25;
}

button,
input,
select {
  font: inherit;
}

button {
  appearance: none;
  -webkit-appearance: none;
  min-height: 36px;
  min-width: 38px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(246, 243, 235, 0.86)),
    var(--panel);
  color: var(--ink);
  cursor: pointer;
  font-weight: 650;
  line-height: 1;
  user-select: none;
  transition:
    border-color 120ms ease,
    background 120ms ease,
    box-shadow 120ms ease,
    transform 120ms ease;
}

button:hover {
  border-color: var(--teal);
  box-shadow: 0 1px 0 rgba(31, 38, 40, 0.06);
}

button:active {
  transform: translateY(1px);
}

button:focus-visible {
  outline: 0;
  border-color: rgba(31, 117, 111, 0.82);
  box-shadow:
    0 0 0 2px rgba(31, 117, 111, 0.12),
    0 1px 0 rgba(31, 38, 40, 0.06);
}

.topbar {
  position: relative;
  z-index: 40;
  /* min-height: 0em; */
  /* padding: 10em; */
  padding: 1em;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(248, 245, 238, 0.94)),
    var(--paper);
  overflow: visible;
}

.brand-block {
  flex: 0 1 330px;
  min-width: 230px;
}

.topbar p {
  margin-top: 0em;
  padding-top: 0;
  color: var(--muted);
  font-size: 14px;
}

.brand-block .tagline {
  color: #365c62;
  font-size: 13px;
  line-height: 1.25;
}

.brand-block .status-line {
  font-size: 12px;
}

.starred-band {
  position: relative;
  align-self: stretch;
  flex: 1 1 auto;
  min-width: 0;
  max-width: none;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1px;
  overflow: visible;
  padding: 0;
  isolation: isolate;
}

.star-burst {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 0;
  height: 0;
  opacity: 0;
  transform: translate(var(--burst-start-x), var(--burst-start-y));
}

.star-burst::before {
  content: "";
  position: absolute;
  width: 34px;
  height: 34px;
  transform: translate(-50%, -50%);
  background: #e6a91e;
  clip-path: polygon(50% 0, 61% 34%, 98% 35%, 68% 56%, 79% 92%, 50% 70%, 21% 92%, 32% 56%, 2% 35%, 39% 34%);
  filter: drop-shadow(0 0 14px rgba(230, 169, 30, 0.7));
}

.star-burst span {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f2c54e;
  transform: translate(-50%, -50%);
}

.star-burst.is-active {
  animation: star-flight 0.72s cubic-bezier(0.18, 0.8, 0.2, 1) forwards;
}

.star-burst.is-active::before {
  animation: star-flight-core 0.72s ease-out forwards;
}

.star-burst.is-active span {
  animation: star-spark 0.56s ease-out var(--spark-delay) forwards;
}

.starred-shell {
  position: relative;
  flex: 0 0 var(--starred-thumb-width, 70px);
  width: var(--starred-thumb-width, 70px);
  height: 70px;
  min-width: 0;
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  display: grid;
  place-items: center;
  transform: translateY(var(--dock-lift, 0px)) scale(var(--dock-scale, 1));
  transform-origin: 50% 0%;
  transition: transform 130ms cubic-bezier(0.2, 0.8, 0.24, 1), filter 130ms ease;
  will-change: transform;
  z-index: var(--dock-z, 0);
}

.starred-shell,
.starred-shell:hover,
.starred-shell:active,
.starred-shell:focus-visible {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
  outline: 0;
}

.starred-shell:first-child {
  filter: none;
}

.starred-shell img {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  object-fit: contain;
}

.starred-more {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  margin-left: 5px;
  min-height: 34px;
  min-width: 42px;
  padding: 4px 8px;
  font-size: 12px;
}

.top-actions,
.title-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.top-actions {
  flex: 0 0 auto;
}

.workspace {
  min-height: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(260px, 330px) minmax(460px, 1fr) minmax(320px, 390px);
}

.panel {
  background: var(--panel);
  padding: 18px;
  overflow: auto;
}

.controls-panel {
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.lab-panel {
  border-left: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.panel-section {
  display: grid;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  margin-top: 18px;
}

.panel-section:first-child {
  padding-top: 0;
  border-top: 0;
  margin-top: 0;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.section-title h2 {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.section-title button {
  min-height: 30px;
  min-width: 0;
  padding: 5px 9px;
  font-size: 12px;
}

.scatter-panel {
  min-width: 0;
  min-height: 0;
  position: relative;
  background:
    linear-gradient(rgba(32, 36, 42, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32, 36, 42, 0.045) 1px, transparent 1px),
    var(--wash);
  background-size: 32px 32px;
}

.scatter-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
  touch-action: none;
}

.scatter-canvas.is-panning {
  cursor: grabbing;
}

.point-tooltip {
  position: absolute;
  z-index: 5;
  max-width: 240px;
  padding: 8px 10px;
  border: 1px solid rgba(32, 36, 42, 0.18);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow);
  color: var(--ink);
  font-size: 12px;
  line-height: 1.35;
  pointer-events: none;
}

.point-tooltip strong {
  display: block;
  margin-bottom: 3px;
}

.field {
  display: grid;
  gap: 7px;
  color: var(--muted);
  font-size: 13px;
}

.search-section {
  position: relative;
}

.search-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  align-items: end;
}

.shell-action-row {
  display: flex;
  gap: 8px;
  align-items: stretch;
}

.surprise-shell {
  flex: 0 0 42px;
  width: 42px;
  min-width: 42px;
  min-height: 42px;
  padding: 0;
  display: grid;
  place-items: center;
}

.surprise-shell svg,
.upload-shell svg {
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
}

.surprise-shell rect,
.upload-shell path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.surprise-shell circle {
  fill: currentColor;
}

.filters-toggle {
  min-height: 42px;
  padding: 8px 13px;
  border-color: rgba(40, 122, 116, 0.35);
  font-size: 14px;
}

.filters-toggle.is-active {
  border-color: var(--teal);
  background: var(--panel);
  box-shadow: inset 0 0 0 1px rgba(31, 117, 111, 0.18);
}

.filters-popover {
  position: fixed;
  left: var(--filters-left, 340px);
  right: auto;
  top: var(--filters-top, 96px);
  z-index: 80;
  width: var(--filters-width, min(460px, calc(100vw - 24px)));
  max-height: calc(100vh - 24px);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 0;
  padding: 0;
  border: 1px solid rgba(31, 38, 40, 0.16);
  border-radius: 8px;
  background: var(--panel);
  box-shadow: 0 22px 54px rgba(31, 36, 42, 0.15);
  transform-origin: left top;
  animation: filter-pop 170ms cubic-bezier(0.2, 0.8, 0.22, 1) both;
}

.filters-popover header,
.filter-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.filters-popover > header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 16px 18px 13px;
  border-bottom: 1px solid rgba(31, 38, 40, 0.1);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
}

.filters-popover > header h2 {
  font-size: 20px;
  line-height: 1.1;
}

.filters-popover header button {
  min-width: 42px;
  min-height: 42px;
  padding: 0;
  border-radius: 999px;
}

.filter-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: start;
  overflow: auto;
  padding: 0 18px;
}

.filter-row {
  display: grid;
  gap: 6px;
  padding: 10px 0;
  border-top: 1px solid rgba(31, 38, 40, 0.1);
}

.filter-row:first-child {
  border-top: 0;
}

.filter-panel-card {
  min-width: 0;
}

.filter-row header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #546063;
  font-size: 15px;
}

.filter-row header span,
dt {
  font-family: Fraunces, Georgia, "Times New Roman", serif;
  font-weight: 650;
  letter-spacing: 0;
}

.filter-row output {
  color: var(--ink);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.filter-select-row select {
  min-height: 44px;
}

.filter-levels,
.rarity-filter-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
}

.rarity-filter-options {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.filter-levels button,
.rarity-filter-options button {
  min-width: 0;
  min-height: 44px;
  padding: 8px 10px;
  color: #334246;
  background: var(--panel);
  font-size: 15px;
  transition: border-color 140ms ease, background 140ms ease, box-shadow 140ms ease, transform 140ms ease;
}

.filter-levels button:hover,
.rarity-filter-options button:hover,
.filter-levels button:focus-visible,
.rarity-filter-options button:focus-visible {
  border-color: rgba(31, 117, 111, 0.62);
  outline: 0;
}

.filter-levels button[aria-pressed="true"],
.rarity-filter-options button[aria-pressed="true"] {
  border-color: rgba(31, 117, 111, 0.8);
  background: var(--panel);
  color: var(--ink);
  box-shadow:
    inset 0 0 0 1px rgba(31, 117, 111, 0.18),
    0 0 0 2px rgba(31, 117, 111, 0.08);
}

.color-filter-panel {
  display: grid;
  gap: 8px;
}

.color-swatch-filter {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.color-swatch-filter button {
  min-width: 0;
  min-height: 44px;
  padding: 0;
  border-color: rgba(31, 38, 40, 0.16);
  border-radius: 5px;
  background: var(--swatch);
  transition: border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
}

.color-swatch-dot {
  display: none;
}

.color-swatch-filter button:hover,
.color-swatch-filter button:focus-visible {
  border-color: rgba(31, 38, 40, 0.48);
  box-shadow: 0 0 0 2px rgba(31, 38, 40, 0.08);
  outline: 0;
}

.color-swatch-filter button[aria-pressed="true"] {
  border-color: #1f2628;
  background: var(--swatch);
  box-shadow:
    0 0 0 2px var(--panel),
    0 0 0 4px rgba(31, 117, 111, 0.72);
}

.filter-actions {
  position: sticky;
  bottom: 0;
  padding: 13px 18px 16px;
  border-top: 1px solid rgba(31, 38, 40, 0.1);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
}

.filter-actions button {
  min-height: 40px;
  padding: 8px 14px;
}

.filters-popover select,
.filters-popover input[type="search"] {
  min-height: 46px;
  font-size: 15px;
}

input[type="search"],
input[type="number"],
select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-height: 38px;
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 8px 10px;
  color: var(--ink);
  background: #fff;
}

select {
  padding-right: 34px;
  background:
    linear-gradient(45deg, transparent 50%, #4d5a5c 50%) right 15px center / 6px 6px no-repeat,
    linear-gradient(135deg, #4d5a5c 50%, transparent 50%) right 10px center / 6px 6px no-repeat,
    #fff;
}

select::-ms-expand {
  display: none;
}

input:focus,
select:focus {
  outline: 0;
  border-color: var(--teal);
  box-shadow: 0 0 0 2px rgba(40, 122, 116, 0.14);
}

.axis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.axis-grid label {
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
}

.micro-status {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.35;
}

.source-frame {
  position: relative;
  width: 100%;
  min-height: 260px;
  max-height: 340px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(246, 242, 233, 0.82)),
    #f7f4ec;
  overflow: hidden;
}

.source-spinner {
  position: absolute;
  z-index: 2;
  width: 34px;
  height: 34px;
  border: 3px solid rgba(40, 122, 116, 0.18);
  border-top-color: var(--teal);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.image-preview img,
.source-image {
  width: 100%;
  height: min(340px, 38vh);
  max-height: 340px;
  object-fit: contain;
  display: block;
  background: transparent;
}

.upload-shell {
  flex: 1 1 auto;
  min-height: 42px;
  min-width: 0;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-color: rgba(198, 93, 75, 0.42);
  background: var(--panel);
  color: #783b30;
}

.star-button {
  position: relative;
  width: 40px;
  min-width: 40px;
  min-height: 40px;
  padding: 0;
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
}

.star-button:hover {
  border-color: transparent;
  background: transparent;
}

.star-icon {
  width: 32px;
  height: 32px;
  overflow: visible;
  transition: transform 140ms ease, filter 180ms ease;
}

.star-shape {
  fill: rgba(255, 255, 255, 0.78);
  stroke: #8f6f19;
  stroke-width: 1.35;
  stroke-linejoin: round;
  transition: fill 180ms ease, stroke 180ms ease, filter 180ms ease;
}

.star-button:hover .star-icon {
  transform: scale(1.08) rotate(-3deg);
}

.star-button:hover .star-shape {
  fill: rgba(244, 202, 83, 0.42);
  stroke: #bd8412;
}

.star-button[aria-pressed="true"] {
  filter: none;
}

.star-button[aria-pressed="true"] .star-icon {
  filter: drop-shadow(0 0 8px rgba(218, 159, 24, 0.5));
}

.star-button[aria-pressed="true"] .star-shape {
  fill: #e6a91e;
  stroke: #81560b;
}

.star-button::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(226, 183, 66, 0.46), transparent 64%);
  opacity: 0;
  transform: scale(0.5);
  pointer-events: none;
}

.star-button.star-pop {
  animation: star-pop 0.78s ease-out;
}

.star-button.star-pop::after {
  animation: star-glow 0.78s ease-out;
}

.fingerprint-chip {
  --hash-hue: 180;
  --hash-saturation: 52%;
  --hash-lightness: 42%;
  width: max-content;
  max-width: 100%;
  padding: 5px 9px;
  border: 1px solid hsl(var(--hash-hue), var(--hash-saturation), var(--hash-lightness));
  border-radius: 7px;
  background:
    linear-gradient(135deg, hsla(var(--hash-hue), var(--hash-saturation), 76%, 0.36), rgba(255, 255, 255, 0.92)),
    repeating-linear-gradient(45deg, transparent 0 6px, hsla(var(--hash-hue), var(--hash-saturation), var(--hash-lightness), 0.1) 6px 9px);
  color: hsl(var(--hash-hue), var(--hash-saturation), 24%);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
}

.fingerprint-chip::before {
  content: "";
  width: 14px;
  height: 14px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='black' stroke-width='1.9' stroke-linecap='round'%3E%3Cpath d='M6.4 18.8c.5-2.6.5-5.3 0-7.9a5.8 5.8 0 0 1 11.3 0c.4 2 .5 4 .2 6'/%3E%3Cpath d='M9.2 21c.7-3.1.7-6.4.1-9.6a2.8 2.8 0 0 1 5.5 0c.5 2.8.5 5.6 0 8.4'/%3E%3Cpath d='M12 21.5c.4-2.2.4-4.6.1-6.8'/%3E%3Cpath d='M4.3 14.7c-.2-1.2-.3-2.3-.2-3.5a8 8 0 0 1 15.8 0'/%3E%3Cpath d='M7.8 6.1a6.9 6.9 0 0 1 8.4 0'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
}

.fingerprint-chip.compact {
  display: inline-flex;
  margin-left: 6px;
  padding: 3px 6px;
  font-size: 10px;
  vertical-align: middle;
}

.selected-name {
  min-height: 0;
  padding-top: 2px;
  font-family: Fraunces, Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 650;
  word-break: break-word;
}

dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 8px 12px;
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

dt {
  color: var(--muted);
}

dd {
  margin: 0;
  color: var(--ink);
  min-width: 0;
  word-break: break-word;
}

.neighbors-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.neighbor-button {
  position: relative;
  min-width: 0;
  min-height: 82px;
  padding: 6px;
  overflow: hidden;
  border-radius: 7px;
  background: #f7f7f2;
  display: grid;
  place-items: center;
}

.neighbor-button img {
  width: min(86px, 100%);
  height: 68px;
  display: block;
  object-fit: contain;
}

.neighbor-button span {
  position: absolute;
  right: 4px;
  bottom: 4px;
  max-width: calc(100% - 8px);
  padding: 2px 4px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
  font-size: 10px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.outline-canvas {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #f7f7f2;
}

.outline-canvas {
  aspect-ratio: 1;
}

.projected-lab {
  gap: 16px;
}

.generated-shape,
.slider-stack,
.color-palette {
  display: grid;
  gap: 12px;
}

.projection-frame {
  position: relative;
}

.svg-export {
  position: absolute;
  right: 10px;
  top: 10px;
  min-height: 28px;
  min-width: 42px;
  padding: 4px 7px;
  font-size: 12px;
}

.pc-controls {
  display: grid;
  gap: 12px;
}

.pc-row {
  display: grid;
  grid-template-columns: 82px minmax(120px, 1fr) 78px;
  gap: 10px;
  align-items: center;
}

.pc-row label {
  color: var(--muted);
  font-size: 13px;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--teal);
}

.pc-row input[type="number"] {
  min-height: 32px;
  padding: 5px 7px;
  font-size: 13px;
}

.palette-swatches {
  display: flex;
  gap: 0;
  overflow: hidden;
  border: 1px solid rgba(32, 36, 42, 0.16);
  border-radius: 7px;
}

.palette-swatch {
  flex: 1 1 20%;
  min-height: 56px;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
}

.palette-swatch:last-child {
  border-right: 0;
}

.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 18px;
  background: rgba(251, 250, 246, 0.96);
}

.rpg-loader {
  position: relative;
  width: 190px;
  height: 160px;
  perspective: 680px;
  transform-style: preserve-3d;
  image-rendering: pixelated;
  animation: loader-bob 2.6s cubic-bezier(0.3, 0.02, 0.25, 1) infinite;
}

.loader-shadow {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 10px;
  height: 20px;
  border-radius: 50%;
  background: rgba(31, 36, 42, 0.24);
  filter: blur(2px);
  transform: rotateX(72deg);
  animation: loader-shadow 2.6s ease-in-out infinite;
}

.loader-aura {
  position: absolute;
  left: 48px;
  top: 38px;
  width: 76px;
  height: 76px;
  border: 3px solid rgba(255, 223, 112, 0.72);
  border-radius: 50%;
  opacity: 0;
  transform: translateZ(28px) scale(0.36);
  animation: loader-aura 2.6s ease-in-out infinite;
}

.loader-shell {
  position: absolute;
  left: 27px;
  width: 136px;
  height: 72px;
  overflow: hidden;
  border: 4px solid #6e4f3b;
  background:
    linear-gradient(96deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0) 32%),
    linear-gradient(135deg, #ffe5ac 0 18%, #d98b67 18% 35%, #f3bd7a 35% 52%, #a9574f 52% 68%, #f5ca86 68% 100%);
  box-shadow:
    inset 0 -10px 0 rgba(106, 56, 48, 0.28),
    inset 12px 0 0 rgba(255, 242, 189, 0.3),
    0 7px 0 rgba(84, 53, 42, 0.18);
  transform-style: preserve-3d;
}

.loader-shell::before,
.loader-shell::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.loader-shell::before {
  inset: 9px 18px auto;
  height: 18px;
  background: rgba(255, 246, 190, 0.36);
  clip-path: polygon(0 62%, 18% 0, 38% 70%, 58% 8%, 78% 62%, 100% 16%, 100% 100%, 0 100%);
}

.loader-shell::after {
  left: 13px;
  right: 13px;
  bottom: 7px;
  height: 7px;
  background: repeating-linear-gradient(90deg, rgba(61, 40, 34, 0.38) 0 8px, rgba(255, 233, 169, 0.22) 8px 16px);
  border-radius: 999px;
}

.loader-shell-top {
  top: 20px;
  border-radius: 78px 78px 18px 18px;
  transform-origin: 50% 100%;
  animation: loader-shell-top 2.6s cubic-bezier(0.42, 0, 0.2, 1) infinite;
}

.loader-shell-bottom {
  bottom: 22px;
  border-radius: 18px 18px 78px 78px;
  transform-origin: 50% 0;
  animation: loader-shell-bottom 2.6s cubic-bezier(0.42, 0, 0.2, 1) infinite;
}

.loader-shell-bottom .shell-lip {
  top: 3px;
  bottom: auto;
}

.shell-rib {
  position: absolute;
  bottom: -14px;
  width: 4px;
  height: 88px;
  border-radius: 999px;
  background: rgba(93, 55, 45, 0.46);
  box-shadow: 5px 0 0 rgba(255, 239, 178, 0.22);
  transform-origin: 50% 100%;
}

.rib-1 {
  left: 24px;
  transform: rotate(-26deg);
}

.rib-2 {
  left: 48px;
  transform: rotate(-12deg);
}

.rib-3 {
  left: 66px;
  height: 94px;
}

.rib-4 {
  right: 48px;
  transform: rotate(12deg);
}

.rib-5 {
  right: 24px;
  transform: rotate(26deg);
}

.shell-lip {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 3px;
  height: 12px;
  border: 3px solid rgba(83, 48, 40, 0.7);
  border-radius: 999px;
  background: #fff0b8;
}

.loader-pearl {
  position: absolute;
  left: 72px;
  top: 68px;
  z-index: 2;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 4px solid #6d6f85;
  background:
    radial-gradient(circle at 32% 26%, #ffffff 0 13%, transparent 14%),
    radial-gradient(circle at 38% 32%, #fff9d3 0 24%, #e6ecff 25% 48%, #96a1d1 49% 72%, #565b8c 73% 100%);
  box-shadow:
    inset -7px -8px 0 rgba(57, 62, 118, 0.26),
    0 0 0 0 rgba(255, 241, 135, 0);
  transform: translateZ(44px) scale(0.14);
  opacity: 0;
  animation: loader-pearl 2.6s cubic-bezier(0.3, 0.02, 0.25, 1) infinite;
}

.pearl-spark {
  position: absolute;
  width: 22px;
  height: 22px;
  opacity: 0;
  background: #fff2a6;
  clip-path: polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%);
  filter: drop-shadow(0 0 5px rgba(255, 218, 91, 0.8));
  animation: loader-spark 2.6s steps(1, end) infinite;
}

.spark-1 {
  right: -22px;
  top: -15px;
}

.spark-2 {
  left: -25px;
  top: 3px;
  width: 16px;
  height: 16px;
  animation-delay: 0.08s;
}

.spark-3 {
  right: -8px;
  bottom: -19px;
  width: 14px;
  height: 14px;
  animation-delay: 0.16s;
}

.loading-overlay p {
  color: #3d3f50;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.78);
}

@keyframes filter-pop {
  0% {
    opacity: 0;
    transform: translateX(-8px) translateY(6px) scale(0.985);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
}

@keyframes loader-bob {
  0%,
  100% {
    transform: translateY(0) rotateZ(-1deg);
  }
  40%,
  62% {
    transform: translateY(-8px) rotateZ(1deg);
  }
  78% {
    transform: translateY(1px) rotateZ(-1deg);
  }
}

@keyframes loader-shell-top {
  0%,
  16%,
  88%,
  100% {
    transform: rotateX(0deg) translateZ(0) translateY(0);
  }
  38%,
  66% {
    transform: rotateX(-52deg) translateZ(20px) translateY(-7px);
  }
  50% {
    transform: rotateX(-60deg) translateZ(24px) translateY(-9px);
  }
}

@keyframes loader-shell-bottom {
  0%,
  16%,
  88%,
  100% {
    transform: rotateX(0deg) translateZ(0) translateY(0);
  }
  38%,
  66% {
    transform: rotateX(7deg) translateZ(4px) translateY(2px);
  }
  50% {
    transform: rotateX(9deg) translateZ(5px) translateY(3px);
  }
}

@keyframes loader-pearl {
  0%,
  21%,
  90%,
  100% {
    opacity: 0;
    transform: translateZ(44px) scale(0.14) rotateY(0deg);
    box-shadow:
      inset -7px -8px 0 rgba(57, 62, 118, 0.26),
      0 0 0 0 rgba(255, 241, 135, 0);
  }
  38% {
    opacity: 1;
    transform: translateZ(58px) scale(0.86) rotateY(-18deg);
  }
  50%,
  64% {
    opacity: 1;
    transform: translateZ(70px) scale(1.06) rotateY(18deg);
    box-shadow:
      inset -7px -8px 0 rgba(57, 62, 118, 0.22),
      0 0 24px 9px rgba(255, 238, 120, 0.82);
  }
  80% {
    opacity: 1;
    transform: translateZ(54px) scale(0.78) rotateY(-12deg);
  }
}

@keyframes loader-aura {
  0%,
  34%,
  82%,
  100% {
    opacity: 0;
    transform: translateZ(28px) scale(0.36);
  }
  48% {
    opacity: 0.95;
    transform: translateZ(34px) scale(1.15);
  }
  64% {
    opacity: 0;
    transform: translateZ(34px) scale(1.45);
  }
}

@keyframes loader-spark {
  0%,
  42%,
  70%,
  100% {
    opacity: 0;
    transform: scale(0.45) rotate(0deg);
  }
  50%,
  58% {
    opacity: 1;
    transform: scale(1) rotate(45deg);
  }
}

@keyframes loader-shadow {
  0%,
  100% {
    opacity: 0.28;
    transform: rotateX(72deg) scaleX(0.92);
  }
  46%,
  66% {
    opacity: 0.18;
    transform: rotateX(72deg) scaleX(0.72);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rpg-loader,
  .loader-shadow,
  .loader-aura,
  .loader-shell-top,
  .loader-shell-bottom,
  .loader-pearl,
  .pearl-spark {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}

@keyframes star-pop {
  0% {
    transform: scale(1);
  }
  38% {
    transform: scale(1.42) rotate(-8deg);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes star-glow {
  0% {
    opacity: 0.8;
    transform: scale(0.4);
  }
  100% {
    opacity: 0;
    transform: scale(2.4);
  }
}

@keyframes star-flight {
  0% {
    opacity: 0;
    transform: translate(var(--burst-start-x), var(--burst-start-y)) scale(0.7);
  }
  18% {
    opacity: 1;
  }
  72% {
    opacity: 1;
    transform: translate(
      calc((var(--burst-start-x) + var(--burst-end-x)) / 2),
      calc(var(--burst-start-y) - 70px)
    ) scale(1.06);
  }
  100% {
    opacity: 0;
    transform: translate(var(--burst-end-x), var(--burst-end-y)) scale(0.46);
  }
}

@keyframes star-flight-core {
  0% {
    transform: translate(-50%, -50%) scale(0.75) rotate(-18deg);
  }
  55% {
    transform: translate(-50%, -50%) scale(1.24) rotate(12deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.58) rotate(36deg);
  }
}

@keyframes star-spark {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform:
      translate(-50%, -50%)
      rotate(var(--spark-angle))
      translateX(var(--spark-distance))
      scale(0.4);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.missing-data {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(251, 250, 246, 0.92);
}

.missing-data > div {
  max-width: 560px;
  padding: 22px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.missing-data h2 {
  font-size: 20px;
  line-height: 1.2;
  text-transform: none;
  letter-spacing: 0;
  color: var(--ink);
}

.missing-data p {
  margin-top: 8px;
  color: var(--muted);
}

code {
  display: block;
  margin-top: 14px;
  padding: 12px;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: #f4f0e8;
  color: #513d19;
}

@media (max-width: 1080px) {
  html,
  body {
    height: auto;
    min-height: 100%;
    overflow: auto;
  }

  body > div {
    height: auto;
    min-height: 100%;
    display: block;
  }

  .topbar {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .brand-block {
    flex-basis: 100%;
  }

  .workspace {
    height: auto;
    min-height: 0;
    overflow: visible;
    grid-template-columns: 1fr;
  }

  .panel,
  .lab-panel,
  .controls-panel {
    border: 0;
    border-bottom: 1px solid var(--line);
  }

  .scatter-panel {
    height: min(72vh, 680px);
    min-height: 420px;
    order: -1;
  }

  .filters-popover {
    left: var(--filters-left, 12px);
    right: auto;
    top: var(--filters-top, 96px);
    width: var(--filters-width, calc(100vw - 24px));
  }

  .filter-controls {
    grid-template-columns: 1fr;
  }

  .filter-select-row,
  .filter-range-row,
  .color-filter-row {
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 620px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .top-actions {
    width: 100%;
  }

  .top-actions button {
    flex: 1 1 auto;
  }

  .color-swatch-filter {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .pc-row {
    grid-template-columns: 82px 1fr;
  }

  .pc-row input[type="number"] {
    grid-column: 2;
  }
}
`,b={shells:[],filtered:[],contours:null,contourPoints:0,contourScale:1,model:null,viewport:null,selected:null,selectedContour:null,generatedContour:null,generatedTraits:null,generatedMode:"selected",uploadImageUrl:"",xAxis:0,yAxis:1,colorMode:"species",pcValues:[],pcControlRows:[],morphFilters:new Map,categoryFilters:{origin:"",rarity:"",color:""},conservationCache:new Map,starredIds:[],showAllStars:!1,speciesCounts:new Map,speciesTraits:new Map,localityMatchRate:0,drawFrame:0,drawTimer:0,sourceFrame:null,sourceMode:"fallback",scatterHitCache:null,screenNeighborScanCount:0,starredHydrationTimer:0,starredHydrationRun:0,starredHydratedCount:0,starredThumbs:[],tooltipFrame:0,tooltipEvent:null,tooltipLastAt:0,holdingNearest:!1,pendingSelectShell:null,targetFrame:0,targetEvent:null,targetNeighborTimer:0,targetNeighborValues:null,targetNeighborLastAt:0,draggingTarget:!1,targetDragStart:null,panningViewport:null,walkingPca:!1,walkFrame:0,walkStartedAt:0,hashReady:!1,suppressHash:!1,hashTimer:0,needsDraw:!0,sourceToken:0,sourceLoadTimer:0,scatterPointCache:null,shellById:new Map,surpriseQueue:[],surpriseQueueSource:null,surprisePrimeTimer:0,neighborCache:new Map,neighborTimer:0,neighborHydrationTimer:0,neighborHydrationItems:[],neighborSearchRun:0,neighborSearchTimer:0,neighborToken:0,neighborRenderKey:"",pointColorCache:new Map,paletteCache:new Map,originFilterOptionsCache:null},z={};let me=null,De=null;function nw(){me=z.scatter.getContext("2d"),De=z.outline.getContext("2d")}const wr=new Map,Ni=new Map,Ri=new Map;var rw=it('<aside class="panel controls-panel">'),iw=it('<section class="panel-section search-section"><div class=search-row><label class=field><span>Search</span><input type=search placeholder="Species or Shellprint"></label><button class=filters-toggle title="Open filters"aria-expanded=false>Filters</button></div><div class=filters-popover hidden><header><h2>Filters</h2><button title="Close filters"aria-label="Close filters">x</button></header><div class=filter-controls></div><div class=filter-actions><button title="Reset filters">Reset</button></div></div><div class=shell-action-row><button class=surprise-shell title="Surprise me"aria-label="Surprise me"><svg viewBox="0 0 24 24"aria-hidden=true><rect x=4 y=4 width=16 height=16 rx=3.5></rect><circle cx=8.5 cy=8.5 r=1.2></circle><circle cx=15.5 cy=8.5 r=1.2></circle><circle cx=12 cy=12 r=1.2></circle><circle cx=8.5 cy=15.5 r=1.2></circle><circle cx=15.5 cy=15.5 r=1.2></circle></svg></button><button class=upload-shell title="Bring your own shell"><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 16V5"></path><path d="M7.5 9.5 12 5l4.5 4.5"></path><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"></path></svg><span>Bring your own shell</span></button></div><input type=file accept=image/* hidden><div class=section-title><h2>Map</h2></div><div class=axis-grid><label><span>X</span><select></select></label><label><span>Y</span><select></select></label></div><label class=field><span>Color</span><select><option value=locality>Location</option><option value=species>Species</option><option value=conservation>Conservation</option><option value=shell>Shell color</option><option value=pattern>Pattern</option><option value=lightness>Lightness</option><option value=concavity>Concavity'),aw=it('<section class="panel-section physical-shell"><div class=section-title><h2>Physical Shell <span class="fingerprint-chip compact">------</span></h2><button class=star-button title="Star this shape"aria-label="Star this shape"aria-pressed=false><svg class=star-icon viewBox="0 0 24 24"aria-hidden=true><path class=star-shape d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z"></path></svg></button></div><div class=source-frame><div class=source-spinner hidden></div><img class=source-image alt hidden></div><div class=selected-name>None</div><dl>');function sw(){return(()=>{var e=rw();return ge(t=>{z.controlsPanel=t},e),vt(e,Je(ow,{}),null),vt(e,Je(lw,{}),null),e})()}function ow(){return(()=>{var e=iw(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,s=t.nextSibling,o=s.firstChild,l=o.firstChild,d=l.nextSibling,c=o.nextSibling,h=c.nextSibling,f=h.firstChild,g=s.nextSibling,w=g.firstChild,_=w.nextSibling,T=g.nextSibling,v=T.nextSibling,x=v.nextSibling,C=x.firstChild,k=C.firstChild,E=k.nextSibling,M=C.nextSibling,A=M.firstChild,$=A.nextSibling,O=x.nextSibling,U=O.firstChild,H=U.nextSibling;return ge(F=>{z.search=F},i),ge(F=>{z.filtersToggle=F},a),ge(F=>{z.filtersPanel=F},s),ge(F=>{z.closeFilters=F},d),ge(F=>{z.filterControls=F},c),ge(F=>{z.resetTraitFilters=F},f),ge(F=>{z.randomShell=F},w),ge(F=>{z.uploadShell=F},_),ge(F=>{z.uploadInput=F},T),ge(F=>{z.xAxisSelect=F},E),ge(F=>{z.yAxisSelect=F},$),ge(F=>{z.colorModeSelect=F},H),e})()}function lw(){return(()=>{var e=aw(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,s=t.nextSibling,o=s.firstChild,l=o.nextSibling,d=s.nextSibling,c=d.nextSibling;return ge(h=>{z.physicalHash=h},i),ge(h=>{z.starShell=h},a),ge(h=>{z.sourceSpinner=h},o),ge(h=>{z.sourceImage=h},l),ge(h=>{z.selectedName=h},d),ge(h=>{z.selectedDetails=h},c),e})()}var uw=it('<section class=scatter-panel aria-label="PCA scatter plot"><canvas class=scatter-canvas></canvas><div class=point-tooltip hidden>');function dw(){return(()=>{var e=uw(),t=e.firstChild,n=t.nextSibling;return ge(r=>{z.scatter=r},t),ge(r=>{z.pointTooltip=r},n),e})()}var cw=it('<div class=loading-overlay><div class=rpg-loader aria-hidden=true><div class=loader-shadow></div><div class=loader-aura></div><div class=loader-pearl><span class="pearl-spark spark-1"></span><span class="pearl-spark spark-2"></span><span class="pearl-spark spark-3"></span></div></div><p>Opening shell data'),pw=it("<div class=missing-data hidden><div><h2>Processed Data Missing</h2><p>Build FFT fingerprints, export static data, then refresh the app.</p><code>make fingerprints export-static"),hw=it('<div><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip>');function fw(){return(()=>{var e=cw(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=t.nextSibling;return ge(s=>{z.loadingOverlay=s},e),vt(t,Je(Zl,{position:"top"}),i),vt(t,Je(Zl,{position:"bottom"}),i),ge(s=>{z.loadingText=s},a),e})()}function mw(){return(()=>{var e=pw();return ge(t=>{z.missingData=t},e),e})()}function Zl(e){return(()=>{var t=hw();return Ur(()=>ew(t,`loader-shell loader-shell-${e.position}`)),t})()}var gw=it('<aside class="panel lab-panel">'),bw=it('<section class="panel-section projected-lab"><div class=generated-shape><div class=section-title><h2>Projected Shell <span class="fingerprint-chip compact">------</span></h2></div><div class=projection-frame><canvas class=outline-canvas width=420 height=420></canvas><button class=svg-export title="Export generated shell as SVG">SVG</button></div></div><div class=color-palette><h2>Palette</h2><div class=palette-swatches></div></div><div class=slider-stack><div class=section-title><h2>Contour PCs</h2><div class=title-actions><button title="Reset contour coordinates">Mean</button><button title="Animate through contour PCA space">Walk</button></div></div><div class=pc-controls>'),yw=it('<section class="panel-section neighbors"><div class=section-title><h2>Nearest Shells</h2></div><div class=neighbors-list>');function ww(){return(()=>{var e=gw();return vt(e,Je(_w,{}),null),vt(e,Je(xw,{}),null),e})()}function _w(){return(()=>{var e=bw(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.firstChild,a=i.nextSibling,s=n.nextSibling,o=s.firstChild,l=o.nextSibling,d=t.nextSibling,c=d.firstChild,h=c.nextSibling,f=d.nextSibling,g=f.firstChild,w=g.firstChild,_=w.nextSibling,T=_.firstChild,v=T.nextSibling,x=g.nextSibling;return ge(C=>{z.projectedHash=C},a),ge(C=>{z.outline=C},o),ge(C=>{z.exportSvg=C},l),ge(C=>{z.paletteSwatches=C},h),ge(C=>{z.meanShape=C},T),ge(C=>{z.walkPca=C},v),ge(C=>{z.pcControls=C},x),e})()}function xw(){return(()=>{var e=yw(),t=e.firstChild,n=t.nextSibling;return ge(r=>{z.neighborsList=r},n),e})()}var vw=it('<header class=topbar><div class=brand-block><h1>Shellspace</h1><p class=status-line>Loading shell model</p></div><div class=starred-band aria-label="Starred shells"></div><div class=star-burst aria-hidden=true></div><div class=top-actions><button title="Zoom out">-</button><button title="Zoom in">+</button><button title="Reset map view">Reset');function $w(){return(()=>{var e=vw(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=t.nextSibling,a=i.nextSibling,s=a.nextSibling,o=s.firstChild,l=o.nextSibling,d=l.nextSibling;return ge(c=>{z.statusLine=c},r),ge(c=>{z.starredBand=c},i),ge(c=>{z.starBurst=c},a),ge(c=>{z.zoomOut=c},o),ge(c=>{z.zoomIn=c},l),ge(c=>{z.resetView=c},d),e})()}var Sw=it("<main class=workspace>");function kw(){return[Je($w,{}),(()=>{var e=Sw();return vt(e,Je(sw,{}),null),vt(e,Je(dw,{}),null),vt(e,Je(ww,{}),null),e})(),Je(fw,{}),Je(mw,{})]}const sh=document.body.firstElementChild;if(!sh)throw new Error("Missing app root");const oh=document.createElement("style");oh.textContent=tw;document.head.append(oh);Jy(()=>Je(kw,{}),sh);qy(async()=>{const{startShellspace:e}=await Promise.resolve().then(()=>C2);return{startShellspace:e}},[]).then(({startShellspace:e})=>e());const Tw=["locality","species","conservation","shell","pattern","lightness","concavity"],lh="shellspace-starred",Cw="0.27.7",uh=`https://cdn.jsdelivr.net/pyodide/v${Cw}/full/`,Ew=`${uh}pyodide.js`,Iw=String.raw`
import base64
import json
import numpy as np


def _otsu(values):
    values = values.astype(np.float32).reshape(-1)
    max_value = float(values.max()) if values.size else 0.0
    if max_value <= 0:
        return 0.0
    hist, _ = np.histogram(values, bins=256, range=(0.0, max_value))
    total = float(hist.sum())
    indexes = np.arange(256, dtype=np.float64)
    sum_total = float((indexes * hist).sum())
    sum_back = 0.0
    weight_back = 0.0
    best = 0
    best_variance = -1.0
    for index, count in enumerate(hist):
        weight_back += float(count)
        if weight_back <= 0:
            continue
        weight_fore = total - weight_back
        if weight_fore <= 0:
            break
        sum_back += float(index * count)
        mean_back = sum_back / weight_back
        mean_fore = (sum_total - sum_back) / weight_fore
        variance = weight_back * weight_fore * (mean_back - mean_fore) ** 2
        if variance > best_variance:
            best_variance = variance
            best = index
    return (best / 255.0) * max_value


def _largest_component(mask):
    height, width = mask.shape
    visited = np.zeros(mask.shape, dtype=np.uint8)
    best = []
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or visited[y, x]:
                continue
            stack = [(x, y)]
            visited[y, x] = 1
            component = []
            while stack:
                cx, cy = stack.pop()
                component.append((cx, cy))
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if 0 <= nx < width and 0 <= ny < height and mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = 1
                        stack.append((nx, ny))
            if len(component) > len(best):
                best = component
    if not best:
        raise ValueError("no foreground found")
    out = np.zeros(mask.shape, dtype=np.uint8)
    for x, y in best:
        out[y, x] = 1
    return out


def _boundary_points(mask):
    padded = np.pad(mask.astype(bool), 1, constant_values=False)
    center = padded[1:-1, 1:-1]
    boundary = (
        center
        & (
            ~padded[:-2, 1:-1]
            | ~padded[2:, 1:-1]
            | ~padded[1:-1, :-2]
            | ~padded[1:-1, 2:]
        )
    )
    ys, xs = np.nonzero(boundary)
    if len(xs) < 3:
        raise ValueError("no shell contour found")
    points = np.column_stack([xs, ys]).astype(np.float32)
    centroid = points.mean(axis=0)
    angles = np.arctan2(points[:, 1] - centroid[1], points[:, 0] - centroid[0])
    return points[np.argsort(angles)]


def _resample(points, samples):
    closed = np.vstack([points, points[0]])
    lengths = np.linalg.norm(np.diff(closed, axis=0), axis=1)
    distance = np.concatenate([[0.0], np.cumsum(lengths)])
    perimeter = distance[-1]
    if perimeter <= 0:
        raise ValueError("zero contour perimeter")
    positions = np.linspace(0, perimeter, samples, endpoint=False)
    x = np.interp(positions, distance, closed[:, 0])
    y = np.interp(positions, distance, closed[:, 1])
    return np.column_stack([x, y]).astype(np.float32)


def _normalize(points):
    points = points.astype(np.float32)
    points -= points.mean(axis=0).reshape(1, 2)
    values, vectors = np.linalg.eigh(np.cov(points.T))
    axis = vectors[:, int(np.argmax(values))]
    angle = np.arctan2(axis[1], axis[0])
    c = float(np.cos(-angle))
    s = float(np.sin(-angle))
    rotation = np.array([[c, -s], [s, c]], dtype=np.float32)
    points = points @ rotation.T
    scale = float(np.sqrt(np.mean(np.sum(points * points, axis=1))))
    if scale <= 0:
        raise ValueError("zero contour scale")
    points /= scale
    area = 0.5 * float(np.sum(points[:, 0] * np.roll(points[:, 1], -1) - np.roll(points[:, 0], -1) * points[:, 1]))
    if area < 0:
        points = points[::-1]
    start = int(np.lexsort((points[:, 0], -points[:, 1]))[0])
    return np.roll(points, -start, axis=0).astype(np.float32)


def _mask_from_rgba(rgba):
    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]
    border = np.concatenate([
        rgb[:4].reshape(-1, 3),
        rgb[-4:].reshape(-1, 3),
        rgb[:, :4].reshape(-1, 3),
        rgb[:, -4:].reshape(-1, 3),
    ])
    bg = np.median(border, axis=0)
    distance = np.linalg.norm(rgb.astype(np.float32) - bg.reshape(1, 1, 3), axis=2)
    cutoff = _otsu(np.clip(distance, 0, 255))
    mask = ((distance > max(14, float(cutoff) * 0.72)) & (alpha > 20)).astype(np.uint8)
    return _largest_component(mask)


def load_shell_from_rgb_mask(rgb, mask, samples):
    mask = mask.astype(bool)

    ys, xs = np.nonzero(mask)
    if len(xs) == 0:
        raise ValueError("no shell foreground found")

    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    crop = mask[y0:y1, x0:x1]
    crop_rgb = rgb[y0:y1, x0:x1]

    side = max(crop.shape)
    canvas = np.zeros((side, side), dtype=bool)
    canvas_rgb = np.full((side, side, 3), 255, dtype=np.uint8)
    y = (side - crop.shape[0]) // 2
    x = (side - crop.shape[1]) // 2
    canvas[y : y + crop.shape[0], x : x + crop.shape[1]] = crop
    canvas_rgb[y : y + crop.shape[0], x : x + crop.shape[1]] = crop_rgb

    points = _boundary_points(canvas)
    if len(points) < 3:
        raise ValueError("shell contour is too small")

    shell = _normalize(_resample(points, samples))
    return shell, mask.astype(np.uint8)


def load_shell_from_rgba(rgba, samples):
    return load_shell_from_rgb_mask(rgba[:, :, :3], _mask_from_rgba(rgba), samples)


def _fft(shell, harmonics):
    z = shell[:, 0].astype(np.float32) + 1j * shell[:, 1].astype(np.float32)
    spectrum = np.fft.fft(z) / len(z)
    out = []
    for harmonic in range(1, harmonics + 1):
        pos = spectrum[harmonic]
        neg = spectrum[-harmonic]
        out.extend([pos.real, pos.imag, neg.real, neg.imag])
    return np.asarray(out, dtype=np.float32)


def fingerprint_rgba_file(path, width, height, samples=256, harmonics=32):
    raw = open(path, "rb").read()
    rgba = np.frombuffer(raw, dtype=np.uint8).reshape((height, width, 4))
    shell, mask = load_shell_from_rgba(rgba, samples)
    return _fingerprint_response(shell, mask, harmonics)


def fingerprint_rgba_mask_file(path, mask_path, width, height, samples=256, harmonics=32):
    raw = open(path, "rb").read()
    rgba = np.frombuffer(raw, dtype=np.uint8).reshape((height, width, 4))
    mask_raw = open(mask_path, "rb").read()
    mask = np.frombuffer(mask_raw, dtype=np.uint8).reshape((height, width)) > 0
    shell, mask = load_shell_from_rgb_mask(rgba[:, :, :3], mask, samples)
    return _fingerprint_response(shell, mask, harmonics)


def _fingerprint_response(shell, mask, harmonics):
    fingerprint = _fft(shell, harmonics)
    ys, xs = np.nonzero(mask)
    return json.dumps({
        "mask_pixels": int(mask.sum()),
        "bbox": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
        "mask": base64.b64encode(mask.tobytes()).decode("ascii"),
        "contour": shell.reshape(-1).round(6).tolist(),
        "fingerprint": fingerprint.round(7).tolist(),
    })
`,ii=[{key:"lightness",label:"Lightness",format:"percent"},{key:"area",label:"Area",format:"percent"},{key:"concavity",label:"Concavity",format:"percent"},{key:"asymmetry",label:"Asymmetry",format:"percent"}],Ql=[{key:"low",label:"Low",min:0,max:1/3},{key:"medium",label:"Medium",min:1/3,max:2/3},{key:"high",label:"High",min:2/3,max:1}],zw=["Common","Uncommon","Rare","Extremely rare","Data deficient"],Jl=[["#f5ead0","Ivory"],["#d9c28d","Sand"],["#b68b57","Ochre"],["#7b5235","Umber"],["#3b2d25","Dark"],["#d7a295","Rose"],["#a94e44","Coral"],["#d07b39","Amber"],["#91885b","Olive"],["#7f9294","Blue gray"],["#c6c8c0","Pearl"],["#ffffff","White"]];function Mw(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;return new URLSearchParams(e)}function dh(){if(!b.hashReady||b.suppressHash)return;const e=new URLSearchParams;b.selected&&e.set("id",String(b.selected.id)),e.set("x",String(b.xAxis)),e.set("y",String(b.yAxis)),e.set("color",b.colorMode),e.set("pc",b.pcValues.slice(0,6).map(n=>Number(n).toFixed(3)).join(","));const t=`${window.location.pathname}${window.location.search}#${e.toString()}`;window.history.replaceState(null,"",t)}function Vt(){!b.hashReady||b.suppressHash||(window.clearTimeout(b.hashTimer),b.hashTimer=window.setTimeout(dh,80))}function pn(e,t){const n=e.getBoundingClientRect(),r=window.devicePixelRatio||1,i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r));return(e.width!==i||e.height!==a)&&(e.width=i,e.height=a,t.setTransform(r,0,0,r,0,0),e===z.scatter&&(b.needsDraw=!0,b.scatterHitCache=null,b.scatterPointCache=null)),{width:n.width,height:n.height}}function ir(){var e;return Math.min(6,((e=b.model)==null?void 0:e.contour_visible_component_count)||0)}function ch(){return ir()}function Aw(){return b.pcValues}function Pi(e){var t;return(t=b.model.contour_pca_ranges)==null?void 0:t[e]}function Nw(e){var t;return((t=b.model.contour_explained_variance_ratio)==null?void 0:t[e])||0}function ph(e){return`PC${e+1}`}function Va(e){return ph(e)}function Wt(e,t){var n;return((n=e.contour_pc)==null?void 0:n[t])||0}function ai(e=b.xAxis,t=b.yAxis){var o;const n=((o=b.model.contour_pca_ranges)==null?void 0:o[0])||{p01:-1,p99:1},r=Pi(e)||n,i=Pi(t)||Pi(1)||n,a=Math.max((r.p99-r.p01)*.08,.001),s=Math.max((i.p99-i.p01)*.08,.001);return{minX:r.p01-a,maxX:r.p99+a,minY:i.p01-s,maxY:i.p99+s}}function Nr(e,t,n){const r=b.viewport;return{x:(e-r.minX)/(r.maxX-r.minX)*n.width,y:n.height-(t-r.minY)/(r.maxY-r.minY)*n.height}}function hh(e,t,n){const r=b.viewport;return{x:r.minX+e/n.width*(r.maxX-r.minX),y:r.minY+(n.height-t)/n.height*(r.maxY-r.minY)}}function Fr(e,t=.78){let n=0;for(let r=0;r<e.length;r+=1)n=n*31+e.charCodeAt(r)>>>0;return`hsla(${n%360}, 42%, 42%, ${t})`}function eu(e,t=.78){let n=0;const r=String(e||"");for(let i=0;i<r.length;i+=1)n=n*31+r.charCodeAt(i)>>>0;return Rr(n%360,.42,.42,t)}function fh(e,t=1){return[Math.round(ce(e.color_r_mean??.68)*255),Math.round(ce(e.color_g_mean??.64)*255),Math.round(ce(e.color_b_mean??.56)*255),Math.round(ce(t)*255)]}function mh(e){var t;return(e==null?void 0:e.live_conservation_status)||((t=e==null?void 0:e.species_traits)==null?void 0:t.protection_status)||"Not assessed"}function Rw(e){const t=mh(e).toLowerCase();return t.includes("critically")?[126,24,28,230]:t.includes("endangered")?[200,45,38,220]:t.includes("vulnerable")?[232,123,54,210]:t.includes("near")?[228,176,62,200]:t.includes("least")?[58,139,99,190]:[102,111,117,112]}function gh(e,t){if(t==="locality")return e.location_key==="unknown"?[96,108,106,158]:eu(e.location_key||"unknown",.66);if(t==="conservation")return Rw(e);if(t==="shell")return fh(e);if(t==="lightness"){const n=ce(e.color_l_mean??.5);return Rr(48,.24,(24+n*54)/100)}if(t==="pattern"){const n=ce((e.color_pattern_strength||0)/.22);return Rr(204-n*162,(34+n*36)/100,(30+n*18)/100)}if(t==="concavity"){const n=ce((e.contour_concavity||0)/.32);return Rr(320-n*185,.56,(35+n*11)/100)}return eu(e.species,.78)}function Pw(e){if(b.pointColorCache.has(e))return b.pointColorCache.get(e);const t=new Uint8ClampedArray(b.shells.length*4);for(const n of b.shells){if(n.id<0||n.id>=b.shells.length)continue;const r=gh(n,e),i=n.id*4;t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3]}return b.pointColorCache.set(e,t),t}function Ge(e=0){if(b.needsDraw=!0,b.scatterHitCache=null,e>0){window.clearTimeout(b.drawTimer),b.drawTimer=window.setTimeout(()=>Ge(),e);return}window.clearTimeout(b.drawTimer),b.drawTimer=0,!b.drawFrame&&(b.drawFrame=requestAnimationFrame(()=>{b.drawFrame=0,Bw()}))}function Ow(e){const t=z.scatter.width,n=z.scatter.height;if(!t||!n)return;const r=window.devicePixelRatio||1,i=me.createImageData(t,n),a=i.data,s=Pw(b.colorMode),o=Math.max(8,Math.round(r*4)),l=Math.floor(o/2);for(let d=0;d<e.shells.length;d+=1){const c=e.shells[d],h=Math.round(e.points[d*2]*r),f=Math.round(e.points[d*2+1]*r);if(h<-o||h>=t+o||f<-o||f>=n+o)continue;const g=c.id>=0&&c.id<b.shells.length?c.id*4:-1,w=g<0?gh(c,b.colorMode):null,_=g<0?w[0]:s[g],T=g<0?w[1]:s[g+1],v=g<0?w[2]:s[g+2],x=g<0?w[3]:s[g+3];for(let C=0;C<o;C+=1){const k=f+C-l;if(!(k<0||k>=n))for(let E=0;E<o;E+=1){const M=h+E-l;if(M<0||M>=t)continue;const A=(k*t+M)*4;a[A]=_,a[A+1]=T,a[A+2]=v,a[A+3]=x}}}me.putImageData(i,0,0)}function Bw(){const e=pn(z.scatter,me);if(!b.viewport||!b.needsDraw)return;b.needsDraw=!1,me.clearRect(0,0,e.width,e.height);const t=bh(e);Ow(t),me.save(),me.lineWidth=1,me.strokeStyle="rgba(32, 36, 42, 0.25)";const n=Nr(0,0,e);n.x>=0&&n.x<=e.width&&(me.beginPath(),me.moveTo(n.x,0),me.lineTo(n.x,e.height),me.stroke()),n.y>=0&&n.y<=e.height&&(me.beginPath(),me.moveTo(0,n.y),me.lineTo(e.width,n.y),me.stroke());const r=Aw();if(r.length){const i=Nr(r[b.xAxis]||0,r[b.yAxis]||0,e);me.strokeStyle="#c65d4b",me.lineWidth=2,me.beginPath(),me.moveTo(i.x-10,i.y),me.lineTo(i.x+10,i.y),me.moveTo(i.x,i.y-10),me.lineTo(i.x,i.y+10),me.stroke()}if(b.selected){const i=Nr(Wt(b.selected,b.xAxis),Wt(b.selected,b.yAxis),e);me.fillStyle="#ffffff",me.strokeStyle="#20242a",me.lineWidth=2,me.beginPath(),me.arc(i.x,i.y,6,0,Math.PI*2),me.fill(),me.stroke()}me.restore()}function Dw(e){const t=b.viewport||{};return[b.xAxis,b.yAxis,e.width.toFixed(1),e.height.toFixed(1),Number(t.minX||0).toFixed(4),Number(t.maxX||0).toFixed(4),Number(t.minY||0).toFixed(4),Number(t.maxY||0).toFixed(4)].join("|")}function bh(e){var i;const t=Dw(e);if(((i=b.scatterPointCache)==null?void 0:i.key)===t&&b.scatterPointCache.shells===b.filtered)return b.scatterPointCache;const n=b.filtered,r=new Float32Array(n.length*2);for(let a=0;a<n.length;a+=1){const s=Nr(Wt(n[a],b.xAxis),Wt(n[a],b.yAxis),e);r[a*2]=s.x,r[a*2+1]=s.y}return b.scatterPointCache={key:t,shells:n,points:r},b.scatterHitCache=null,b.scatterPointCache}function yh(e){var o;const t=bh(e),n=t.key;if(((o=b.scatterHitCache)==null?void 0:o.key)===n&&b.scatterHitCache.shells===b.filtered)return b.scatterHitCache;const r=t.shells,i=t.points,a=24,s=new Map;for(let l=0;l<r.length;l+=1){const d=i[l*2],c=i[l*2+1];if(d<-a||d>e.width+a||c<-a||c>e.height+a)continue;const h=Math.floor(d/a),f=Math.floor(c/a),g=`${h},${f}`;let w=s.get(g);w||(w=[],s.set(g,w)),w.push(l)}return b.scatterHitCache={key:n,shells:r,points:i,grid:s,cellSize:a},b.scatterHitCache}function On(e){return new URL(`public/${e}`,document.baseURI).toString()}function Uw(e){return new URL(`dataset/${encodeURIComponent(e).replaceAll("%2F","/")}`,document.baseURI).toString()}function ce(e){return Math.max(0,Math.min(1,e))}function mt(e,t=3){return Number(e||0).toLocaleString(void 0,{maximumFractionDigits:t})}function Oi(e){return`${mt(ce(e)*100,1)}%`}function Lw(e){return ce(((e==null?void 0:e.area)||0)/Math.max(1,((e==null?void 0:e.image_width)||0)*((e==null?void 0:e.image_height)||0)))}function ms(e){const t=Math.max(1,(e==null?void 0:e.image_width)||400),n=Math.max(1,(e==null?void 0:e.image_height)||300),r=Math.max(t,n),i=10;return{cmPerImageUnit:i/r,widthCm:t/r*i,heightCm:n/r*i,longSideCm:i}}function Fw(e){const t=ms(e);return((e==null?void 0:e.area)||0)*t.cmPerImageUnit*t.cmPerImageUnit}function Ww(e){return((e==null?void 0:e.mean_radius)||0)*ms(e).cmPerImageUnit}function Kn(e,t=!0){z.loadingText&&e&&(z.loadingText.textContent=e),z.loadingOverlay&&(z.loadingOverlay.hidden=!t)}function gs(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function qw(e){if(e!=null&&e.fingerprint_hash)return e.fingerprint_hash;const t=(e.contour_pc||[]).slice(0,6).map(r=>Number(r||0).toFixed(4)),n=`${e.species}|${e.specimen}|${e.view}|${t.join(",")}`;return gs(n).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function Vw(e,t){const n=gs(t)%360;e.style.setProperty("--hash-hue",String(n)),e.textContent=t}function tu(e,t,n=t==null?void 0:t.fingerprint_hash){if(!e||!n)return;const r=Wr((t==null?void 0:t.color_r_mean)??.68,(t==null?void 0:t.color_g_mean)??.62,(t==null?void 0:t.color_b_mean)??.52);e.style.setProperty("--hash-hue",String(Math.round(r.h))),e.style.setProperty("--hash-saturation",`${Math.round(Math.max(.28,r.s)*100)}%`),e.style.setProperty("--hash-lightness",`${Math.round(Math.max(.3,Math.min(.72,r.l))*100)}%`),e.textContent=n}function Wr(e,t,n){const r=ce(e),i=ce(t),a=ce(n),s=Math.max(r,i,a),o=Math.min(r,i,a);let l=0,d=0;const c=(s+o)/2;if(s!==o){const h=s-o;d=c>.5?h/(2-s-o):h/(s+o),s===r?l=(i-a)/h+(i<a?6:0):s===i?l=(a-r)/h+2:l=(r-i)/h+4,l/=6}return{h:l*360,s:d,l:c}}function Bn(e,t,n){return`hsl(${(e%360+360)%360}, ${Math.round(ce(t)*100)}%, ${Math.round(ce(n)*100)}%)`}function Rr(e,t,n,r=1){const i=(e%360+360)%360/360,a=ce(t),s=ce(n);if(a===0){const c=Math.round(s*255);return[c,c,c,Math.round(ce(r)*255)]}const o=s<.5?s*(1+a):s+a-s*a,l=2*s-o,d=c=>{let h=i+c;return h<0&&(h+=1),h>1&&(h-=1),h<1/6?l+(o-l)*6*h:h<1/2?o:h<2/3?l+(o-l)*(2/3-h)*6:l};return[Math.round(d(1/3)*255),Math.round(d(0)*255),Math.round(d(-1/3)*255),Math.round(ce(r)*255)]}function Hw(e){return e.location_label||"Locality unavailable"}function wh(e,t){var n;return t?((n=e==null?void 0:e.region_labels)==null?void 0:n[t])||t.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,r=>r.toUpperCase()):""}function Ha(e,t){var n,r;return((r=(n=e==null?void 0:e.countries)==null?void 0:n[t])==null?void 0:r.title)||t}function Gw(e){var r,i,a,s,o;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-localities-v1")return t;const n=e.species_names||[];for(let l=0;l<n.length;l+=1){const d=((r=e.primary_country_codes)==null?void 0:r[l])||"",c=((i=e.region_keys)==null?void 0:i[l])||"",h=((a=e.total_occurrences)==null?void 0:a[l])||0,f=((s=e.top_country_codes)==null?void 0:s[l])||[],g=((o=e.top_country_counts)==null?void 0:o[l])||[],w=d?Ha(e,d):"",_=wh(e,c),T=f.map((v,x)=>({code:v,label:Ha(e,v),count:g[x]||0}));t.set(n[l],{primary_country:d,primary_country_label:w,region_key:c,region_label:_,total_occurrences:h,top_countries:T,location_label:w&&_?`${w}, ${_}`:w||_||""})}return t}function jw(e){var a,s,o,l,d,c,h,f,g,w,_,T,v;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-species-traits-v1")return t;const n=e.species_names||[],r=e.rarity_labels||[],i=e.protection_status_labels||[];for(let x=0;x<n.length;x+=1){const C=((a=e.known_range_country_codes)==null?void 0:a[x])||[],k=((s=e.known_range_country_counts)==null?void 0:s[x])||[],E=C.map((M,A)=>({code:M,label:Ha(e,M),count:k[A]||0}));t.set(n[x],{genus:((o=e.genus)==null?void 0:o[x])||"",rarity_label:r[(l=e.rarity)==null?void 0:l[x]]||"Data deficient",rarity_reason:((d=e.rarity_reasons)==null?void 0:d[x])||"",dataset_sample_count:((c=e.dataset_sample_count)==null?void 0:c[x])||0,observation_count:((h=e.observation_count)==null?void 0:h[x])||0,known_range_country_count:((f=e.country_count)==null?void 0:f[x])||E.length,known_range_countries:E,primary_country:((g=e.primary_country_codes)==null?void 0:g[x])||"",region_key:((w=e.region_keys)==null?void 0:w[x])||"",region_label:wh(e,((_=e.region_keys)==null?void 0:_[x])||""),protection_status:i[(T=e.protection_status)==null?void 0:T[x]]||"Not assessed",market_price_usd:((v=e.market_price_usd)==null?void 0:v[x])??null})}return t}function _h(e){const t=ce((1-(e.contour_solidity||1))/.32),n=e.contour_pc||[],r=ce(((n[1]||0)+7)/14),i=ce(((n[3]||0)+3)/6);return{asymmetry:ce(.4*Math.abs(r-.5)*2+.34*Math.abs(i-.5)*2+.26*t)}}function Kw(e,t=null,n=null){var a;b.speciesCounts=new Map,b.originFilterOptionsCache=null;for(const s of e)b.speciesCounts.set(s.species,(b.speciesCounts.get(s.species)||0)+1);const r=Gw(t),i=jw(n);b.speciesTraits=i,b.localityMatchRate=(t==null?void 0:t.match_rate)||0;for(const s of e){const o=r.get(s.species),l=i.get(s.species);s.fingerprint_hash||(s.fingerprint_hash=qw(s)),s.species_sample_count=b.speciesCounts.get(s.species)||1,s.species_traits=l||null,s.morph_traits=_h(s),s.rarity_label=(l==null?void 0:l.rarity_label)||"Data deficient",s.rarity_reason=(l==null?void 0:l.rarity_reason)||"",s.global_occurrences=(l==null?void 0:l.observation_count)||(o==null?void 0:o.total_occurrences)||0,s.location_label=(o==null?void 0:o.location_label)||"Locality unavailable",s.location_key=(o==null?void 0:o.primary_country)||(o==null?void 0:o.region_key)||"unknown",s.location_color=s.location_key==="unknown"?"rgba(96, 108, 106, 0.62)":Fr(s.location_key),s.species_color=Fr(s.species),s.region_label=(o==null?void 0:o.region_label)||"",s.top_countries_label=(a=o==null?void 0:o.top_countries)!=null&&a.length?o.top_countries.slice(0,3).map(d=>d.label).join(", "):""}}function Ga(e){return fetch(e,{cache:"no-store"}).then(t=>{if(!t.ok)throw new Error(`${e} returned ${t.status}`);return t.json()})}async function nu(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} returned ${t.status}`);if(!e.endsWith(".gz"))return t.arrayBuffer();const n=await t.arrayBuffer(),r=new Uint8Array(n);if(r[0]!==31||r[1]!==139)return n;if(!("DecompressionStream"in window))throw new Error("This browser cannot decompress the shell data pack.");return new Response(new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}function Bi(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").replace(/_/g," ").trim()||"Unknown shell"}function Xw(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").trim()}async function Yw(e){try{return await Ga(e)}catch{return null}}function Zw(e,t,n){const r=[];for(let i=0;i<n;i+=1){const a=[];for(let f=0;f<t;f+=1)a.push(e[f*n+i]||0);a.sort((f,g)=>f-g);const s=f=>a[Math.min(a.length-1,Math.max(0,Math.round((a.length-1)*f)))]||0,o=a[0]||0,l=a.at(-1)||0,d=s(.01),c=s(.99),h=Math.max(.001,c-d,l-o);r.push({min:o-h*.08,max:l+h*.08,p01:d-h*.08,p99:c+h*.08})}return r}async function xh(e){const t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),n=new Uint8Array(t.length);n.set(t);const r=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(r)].map(i=>i.toString(16).padStart(2,"0")).join("").slice(0,6).toUpperCase()}function vh(e,t=256){const n=Math.floor(e.length/4),r=new Float32Array(t*2);for(let i=0;i<t;i+=1){const a=i/t;let s=0,o=0;for(let l=0;l<n;l+=1){const d=l+1,c=l*4,h=e[c]||0,f=e[c+1]||0,g=e[c+2]||0,w=e[c+3]||0,_=Math.PI*2*d*a,T=Math.cos(_),v=Math.sin(_);s+=h*T-f*v+g*T+w*v,o+=h*v+f*T+w*T-g*v}r[i*2]=s,r[i*2+1]=o}return r}function Qw(e){var i,a;const t=((i=b.model)==null?void 0:i.fingerprint_mean)||[],n=((a=b.model)==null?void 0:a.fingerprint_components)||[];if(!t.length||!n.length)return null;const r=new Float32Array(t);for(let s=0;s<Math.min(e.length,n.length);s+=1){const o=n[s]||[];for(let l=0;l<Math.min(r.length,o.length);l+=1)r[l]+=(e[s]||0)*o[l]}return r}function Jw(e){var r,i;const t=((r=b.model)==null?void 0:r.fingerprint_mean)||[];return(((i=b.model)==null?void 0:i.fingerprint_components)||[]).map(a=>{let s=0;for(let o=0;o<Math.min(e.length,t.length,a.length);o+=1)s+=(e[o]-t[o])*a[o];return s})}async function e_(){const[e,t,n,r,i]=await Promise.all([Ga(On("data/files.json")),Ga(On("data/pca_model.json")),nu(On("data/fingerprints.f32")),nu(On("data/pca.f32")),Yw(On("data/enrichment.json"))]),a=new Map(((i==null?void 0:i.rows)||[]).map(g=>[g.label,g])),s=e.length,o=new Float32Array(n),l=new Float32Array(r),d=Math.floor(o.length/s),c=Math.floor(l.length/s),h={processed_count:s,species_count:new Set(e.map(Bi)).size,contour_points:256,contour_scale:1,contour_component_count:c,contour_visible_component_count:Math.min(6,c),contour_pca_ranges:Zw(l,s,c),contour_explained_variance_ratio:Array.from({length:c},()=>0),fingerprint_mean:t.mean||[],fingerprint_components:t.components||[]},f=await Promise.all(e.map(async(g,w)=>{const _=o.slice(w*d,(w+1)*d),T=Array.from(l.slice(w*c,(w+1)*c)),v=a.get(Xw(g))||{};return{id:w,file:g,species:Bi(g),specimen:"",specimen_label:"",view:"",view_label:"",name:Bi(g),contour_pc:T,trait_pc:[],fingerprint:_,fingerprint_hash:await xh(_),enrichment:v,rarity_label:v.rarity_proxy||"unknown",gbif_occurrence_count:Number(v.occurrence_count||0),gbif_country_count:Number(v.country_count||0),gbif_countries_top:v.countries_top||"",color_l_mean:Number(v.lightness_mean||0)/255,morph_traits:{asymmetry:Number(v.asymmetry_mean||0)}}}));return{model:h,shells:f}}function t_(e){if(e!=null&&e.upload_contour)return e.upload_contour;if((e==null?void 0:e.id)<0&&b.selected===e&&b.selectedContour)return b.selectedContour;if(wr.has(e.id))return wr.get(e.id);if(!b.contours&&(e!=null&&e.fingerprint)){const o=vh(e.fingerprint,b.contourPoints||256);return wr.set(e.id,o),o}if(!b.contours||!b.contourPoints)return null;const t=e.id*b.contourPoints*2;if(t+b.contourPoints*2>b.contours.length)return null;const r=e.center[0]*b.contourScale,i=e.center[1]*b.contourScale,a=Math.max(1e-6,e.mean_radius*b.contourScale),s=new Float32Array(b.contourPoints*2);for(let o=0;o<b.contourPoints;o+=1){const l=t+o*2;s[o*2]=(b.contours[l]-r)/a,s[o*2+1]=(b.contours[l+1]-i)/a}return wr.set(e.id,s),s}function $h(e){return e?{color_r_mean:e.color_r_mean,color_g_mean:e.color_g_mean,color_b_mean:e.color_b_mean,color_l_mean:e.color_l_mean,color_a_mean:e.color_a_mean,color_b_lab_mean:e.color_b_lab_mean,color_chroma_mean:e.color_chroma_mean,color_chroma_std:e.color_chroma_std,color_saturation_mean:e.color_saturation_mean,color_saturation_std:e.color_saturation_std,color_pattern_strength:e.color_pattern_strength,color_pattern_contrast:e.color_pattern_contrast,color_pattern_chroma:e.color_pattern_chroma,roughness:e.roughness,texture_gradient_mean:e.texture_gradient_mean,texture_residual_std:e.texture_residual_std,texture_luma_iqr:e.texture_luma_iqr,contour_concavity:e.contour_concavity,contour_solidity:e.contour_solidity}:{}}function n_(e){const t=e.color_l_mean??.5,n=e.color_chroma_mean??.1,r=(Math.atan2(e.color_hue_sin||0,e.color_hue_cos||1)*180/Math.PI+360)%360;return t>.72&&n<.12?"ivory":t<.32?"dark brown":n<.08?t>.58?"chalky cream":"stone gray":r<28||r>=342?"rose-brown":r<58?t>.58?"golden cream":"amber-brown":r<92?"olive-tan":r<165?"green-gray":r<235?"blue-gray":r<292?"violet-gray":"pink-tan"}function bs(){return b.generatedTraits||$h(b.selected)}function ys(){const e=r_(b.pcValues);e&&(b.generatedContour=e,b.generatedTraits=null,b.generatedMode="pca",Ch())}function r_(e){var i,a,s,o,l;const t=Qw(e);if(t)return vh(t,b.contourPoints||256);if(!((a=(i=b.model)==null?void 0:i.contour_mean)!=null&&a.length)||!((o=(s=b.model)==null?void 0:s.contour_components)!=null&&o.length))return null;const n=b.model.contour_mean.length,r=new Float32Array(n);for(let d=0;d<n;d+=1){let c=b.model.contour_mean[d]||0;for(let h=0;h<b.model.contour_components.length;h+=1)c+=(e[h]||0)*(((l=b.model.contour_components[h])==null?void 0:l[d])||0);r[d]=c}return r}function Sh(e){let t=0;for(const n of e)if(n)for(let r=0;r<n.length;r+=2)t=Math.max(t,Math.hypot(n[r],n[r+1]));return t||1}function qr(e,t,n,r,i){e.beginPath();const a=Math.floor(t.length/2);for(let s=0;s<a;s+=1){const o=n+t[s*2]*i,l=r+t[s*2+1]*i;s===0?e.moveTo(o,l):e.lineTo(o,l)}e.closePath()}function kh(e,t=.9){const n=Math.round(ce((e==null?void 0:e.color_r_mean)??.72)*255),r=Math.round(ce((e==null?void 0:e.color_g_mean)??.66)*255),i=Math.round(ce((e==null?void 0:e.color_b_mean)??.54)*255);return`rgba(${n}, ${r}, ${i}, ${t})`}function i_(){const e=b.pcValues.slice(0,6).map(t=>Number(t||0).toFixed(4));return gs(`projected|${e.join(",")}`).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function Th(){var e,t,n;if((e=b.selected)!=null&&e.fingerprint_hash&&z.physicalHash&&tu(z.physicalHash,b.selected),z.projectedHash){const r=b.generatedMode==="selected"&&((t=b.selected)!=null&&t.fingerprint_hash)?b.selected.fingerprint_hash:i_();b.generatedMode==="selected"&&((n=b.selected)!=null&&n.fingerprint_hash)?tu(z.projectedHash,b.selected,r):Vw(z.projectedHash,r)}}function a_(e,t,n,r,i,a){const s=Math.floor(t.length/2);if(s<4)return;const o=ce(((a==null?void 0:a.roughness)||.012)/.04),l=ce(((a==null?void 0:a.color_chroma_mean)||.08)/.35),d=ce(((a==null?void 0:a.contour_concavity)||.04)/.35),c=ce(((a==null?void 0:a.color_pattern_strength)||.06)/.22),h=ce(((a==null?void 0:a.color_pattern_contrast)||.04)/.18);e.save(),qr(e,t,n,r,i),e.clip();const f=4+Math.round(d*4+c*5);for(let _=1;_<=f;_+=1)qr(e,t,n,r,i*(.16+_/(f+1)*.78)),e.strokeStyle=`rgba(32, 36, 42, ${.035+l*.035+h*.05})`,e.lineWidth=.8+c*.55,e.stroke();const g=Math.max(4,Math.round(16-o*5-l*3-c*6));e.lineWidth=.9+o*.8+c*.6,e.strokeStyle=`rgba(32, 36, 42, ${.07+o*.12+h*.16})`;for(let _=0;_<s;_+=g){const T=t[_*2],v=t[_*2+1];e.beginPath(),e.moveTo(n+T*i*.22,r+v*i*.22),e.lineTo(n+T*i*.95,r+v*i*.95),e.stroke()}const w=e.createRadialGradient(n-i*.22,r-i*.28,i*.08,n,r,i*1.25);w.addColorStop(0,"rgba(255, 255, 255, 0.34)"),w.addColorStop(.45,"rgba(255, 255, 255, 0.08)"),w.addColorStop(1,"rgba(32, 36, 42, 0.08)"),e.fillStyle=w,e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore()}function Ch(){const{width:e,height:t}=z.outline;De.clearRect(0,0,e,t),De.fillStyle="#f7f7f2",De.fillRect(0,0,e,t);const n=b.generatedContour||b.selectedContour;if(!n)return;Th();const r=e/2,i=t/2,a=Math.min(e,t)*.42/Sh([n]),s=bs();De.save(),qr(De,n,r,i,a),De.fillStyle=kh(s,.9),De.strokeStyle="#287a74",De.lineWidth=3,De.fill(),a_(De,n,r,i,a,s),qr(De,n,r,i,a),De.stroke(),De.fillStyle="#20242a",De.beginPath(),De.arc(r,i,3,0,Math.PI*2),De.fill(),De.restore()}function s_(e,t,n,r){const i=[],a=Math.floor(e.length/2);for(let s=0;s<a;s+=1){const o=t+e[s*2]*r,l=n+e[s*2+1]*r;i.push(`${s===0?"M":"L"}${o.toFixed(2)} ${l.toFixed(2)}`)}return i.push("Z"),i.join(" ")}function o_(){const e=b.generatedContour||b.selectedContour;if(!e)return;const t=512,n=t/2,r=t*.42/Sh([e]),i=s_(e,n,n,r),a=kh(bs(),.86),s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}"><rect width="${t}" height="${t}" fill="#f7f7f2"/><path d="${i}" fill="${a}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`,o=new Blob([s],{type:"image/svg+xml"}),l=URL.createObjectURL(o),d=document.createElement("a");d.href=l,d.download="seashell-generated.svg",d.click(),URL.revokeObjectURL(l)}function l_(e){if(!e||e.id<0||!e.file)return Promise.resolve(null);if(Ni.has(e.file))return Ni.get(e.file);const t=new Promise(n=>{const r=new Image;r.decoding="async",r.onload=()=>n(r),r.onerror=()=>n(null),r.src=Uw(e.file)});return Ni.set(e.file,t),t}function u_(e,t=1200){if("requestIdleCallback"in window){window.requestIdleCallback(e,{timeout:t});return}window.setTimeout(e,Math.min(t,160))}function ja(e,t=(n=>(n=b.selected)==null?void 0:n.id)()){if(!e.length)return null;let r=Math.floor(Math.random()*e.length);return t!=null&&e.length>1&&e[r].id===t&&(r=(r+1+Math.floor(Math.random()*(e.length-1)))%e.length),e[r]}function d_(){b.surpriseQueue=[],b.surpriseQueueSource=null,window.clearTimeout(b.surprisePrimeTimer),b.surprisePrimeTimer=0}function c_(e){const t=new Set(b.surpriseQueue.map(r=>{var i;return(i=r.shell)==null?void 0:i.id}));let n=null;for(let r=0;r<12;r+=1){const i=ja(e);if(!(!i||t.has(i.id))){n=i;break}}n||(n=ja(e)),n&&b.surpriseQueue.push({shell:n,ready:!0})}function Eh(e=b.filtered,t=12,n=80){e.length&&(b.surpriseQueueSource!==e&&(b.surpriseQueue=[],b.surpriseQueueSource=e),window.clearTimeout(b.surprisePrimeTimer),b.surprisePrimeTimer=window.setTimeout(()=>{u_(()=>{for(;b.surpriseQueue.length<t;)c_(e)},500)},n))}function p_(e){var t;if(b.surpriseQueueSource!==e||!b.surpriseQueue.length)return null;for(let n=0;n<b.surpriseQueue.length;n+=1){const r=b.surpriseQueue[n];if(!(!(r!=null&&r.shell)||r.shell.id===((t=b.selected)==null?void 0:t.id)))return b.surpriseQueue.splice(n,1),r.shell}return null}function h_(e){return`rgb(${Math.round(e[0])}, ${Math.round(e[1])}, ${Math.round(e[2])})`}function ru(e,t){const n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2];return n*n+r*r+i*i}function f_(e){if(!e.length)return null;const t=[e.reduce((n,r)=>{const i=Math.max(r[0],r[1],r[2])-Math.min(r[0],r[1],r[2]),a=Math.max(n[0],n[1],n[2])-Math.min(n[0],n[1],n[2]);return i>a?r:n},e[0]).slice()];for(;t.length<5;){let n=e[0],r=-1;for(const i of e){const a=Math.min(...t.map(s=>ru(i,s)));a>r&&(r=a,n=i)}t.push(n.slice())}for(let n=0;n<5;n+=1){const r=t.map(()=>[0,0,0,0]);for(const i of e){let a=0,s=1/0;for(let o=0;o<t.length;o+=1){const l=ru(i,t[o]);l<s&&(s=l,a=o)}r[a][0]+=i[0],r[a][1]+=i[1],r[a][2]+=i[2],r[a][3]+=1}for(let i=0;i<t.length;i+=1)r[i][3]&&(t[i]=[r[i][0]/r[i][3],r[i][1]/r[i][3],r[i][2]/r[i][3]])}return t.sort((n,r)=>Wr(n[0]/255,n[1]/255,n[2]/255).l-Wr(r[0]/255,r[1]/255,r[2]/255).l).map(h_)}function m_(){const e=z.sourceImage;if(!e||e.hidden||!e.complete||!e.naturalWidth||!e.naturalHeight)return null;const t=Math.min(220,e.naturalWidth),n=Math.max(1,Math.round(t/e.naturalWidth*e.naturalHeight)),r=document.createElement("canvas");r.width=t,r.height=n;const i=r.getContext("2d",{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a;try{a=i.getImageData(0,0,t,n).data}catch{return null}const s=[],o=Math.max(4,Math.floor(Math.sqrt(t*n/2200)));for(let l=0;l<n;l+=o)for(let d=0;d<t;d+=o){const c=(l*t+d)*4,h=a[c],f=a[c+1],g=a[c+2];a[c+3]<180||h+f+g<48||s.push([h,f,g])}return f_(s)}function g_(e){const t={r:ce(e.color_r_mean??.72),g:ce(e.color_g_mean??.66),b:ce(e.color_b_mean??.54)},n=Wr(t.r,t.g,t.b),r=ce((e.color_l_std||.18)/.32);return[Bn(n.h,n.s*.78,Math.max(.12,n.l-.28-r*.08)),Bn(n.h-8,n.s*.92,Math.max(.22,n.l-.12)),Bn(n.h,n.s,n.l),Bn(n.h+6,n.s*.72,Math.min(.86,n.l+.16)),Bn(n.h,n.s*.48,Math.min(.94,n.l+.3+r*.04))]}function Tn(e=!1){if(!z.paletteSwatches)return;z.paletteSwatches.innerHTML="";const t=bs(),n=b.generatedMode==="selected"&&b.selected?b.selected.id:null;let r=n==null?null:b.paletteCache.get(n);!r&&e&&(r=m_(),r&&n!=null&&b.paletteCache.set(n,r)),r||(r=g_(t));for(const i of r){const a=document.createElement("span");a.className="palette-swatch",a.style.background=i,a.title=i,z.paletteSwatches.append(a)}}/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var ws=Object.defineProperty,b_=Object.getOwnPropertyDescriptor,y_=Object.getOwnPropertyNames,w_=Object.prototype.hasOwnProperty,__=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),Cn=(e,t)=>{for(var n in t)ws(e,n,{get:t[n],enumerable:!0})},x_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of y_(t))!w_.call(e,i)&&i!==n&&ws(e,i,{get:()=>t[i],enumerable:!(r=b_(t,i))||r.enumerable});return e},nr=e=>x_(ws({},"__esModule",{value:!0}),e),Dn,Bt,_n,iu,Ih,zh=q(()=>{Dn=new Map,Bt=[],_n=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Dn.get(e);if(r===void 0)Dn.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let i=Bt.indexOf(e);i!==-1&&Bt.splice(i,1);for(let a=0;a<Bt.length;a++)if(Dn.get(Bt[a]).priority<=n){Bt.splice(a,0,e);return}Bt.push(e)}return}throw new TypeError("not a valid backend")},iu=async e=>{let t=Dn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ih=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?Bt:n,i,a=[],s=new Set;for(let l of r){let d=await iu(l);typeof d=="string"?a.push({name:l,err:d}):(i||(i=d),i===d&&s.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]}}),v_=q(()=>{zh()}),Mh,$_=q(()=>{Mh="1.26.0"}),Di,Ue,Ah=q(()=>{$_(),Di="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:Mh},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Di=e}},get logLevel(){return Di}},Object.defineProperty(Ue,"logLevel",{enumerable:!0})}),Se,S_=q(()=>{Ah(),Se=Ue}),Nh,Rh,k_=q(()=>{Nh=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let c=a*i,h=0,f=c,g=c*2,w=-1;s==="RGBA"?(h=0,f=c,g=c*2,w=c*3):s==="RGB"?(h=0,f=c,g=c*2):s==="RBG"&&(h=0,g=c,f=c*2);for(let _=0;_<a;_++)for(let T=0;T<i;T++){let v=(e.data[h++]-d[0])*l[0],x=(e.data[f++]-d[1])*l[1],C=(e.data[g++]-d[2])*l[2],k=w===-1?255:(e.data[w++]-d[3])*l[3];r.fillStyle="rgba("+v+","+x+","+C+","+k+")",r.fillRect(T,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Rh=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let i,a,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],s=e.dims[3]):(i=e.dims[3],a=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,d,c;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let h=a*i;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,g=0,w=1,_=2,T=3,v=0,x=h,C=h*2,k=-1;o==="RGBA"?(v=0,x=h,C=h*2,k=h*3):o==="RGB"?(v=0,x=h,C=h*2):o==="RBG"&&(v=0,C=h,x=h*2),r=n.createImageData(i,a);for(let E=0;E<a*i;g+=f,w+=f,_+=f,T+=f,E++)r.data[g]=(e.data[v++]-c[0])*d[0],r.data[w]=(e.data[x++]-c[1])*d[1],r.data[_]=(e.data[C++]-c[2])*d[2],r.data[T]=k===-1?255:(e.data[k++]-c[3])*d[3]}else throw new Error("Can not access image data");return r}}),_r,Ph,Oh,Bh,Dh,Uh,T_=q(()=>{_s(),_r=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,s;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?s=[i.bias,i.bias,i.bias,i.bias]:s=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=n*r,c=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),h=4,f=0,g=1,w=2,_=3,T=0,v=d,x=d*2,C=-1;o==="RGB"&&(h=3,f=0,g=1,w=2,_=-1),l==="RGBA"?C=d*3:l==="RBG"?(T=0,x=d,v=d*2):l==="BGR"&&(x=0,v=d,T=d*2);for(let k=0;k<d;k++,f+=h,w+=h,g+=h,_+=h)c[T++]=(e[f]+s[0])/a[0],c[v++]=(e[g]+s[1])/a[1],c[x++]=(e[w]+s[2])/a[2],C!==-1&&_!==-1&&(c[C++]=(e[_]+s[3])/a[3]);return l==="RGBA"?new et("float32",c,[1,4,n,r]):new et("float32",c,[1,3,n,r])},Ph=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=l();c.width=e.width,c.height=e.height;let h=d(c);if(h!=null){let f=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=f,o.width=g}else o.tensorFormat="RGBA",o.height=f,o.width=g;h.drawImage(e,0,0),s=h.getImageData(0,0,g,f).data}else throw new Error("Can not access image data")}else if(r){let c,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,h=t.resizedWidth):(c=e.height,h=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=h,t!==void 0){let f=l();f.width=h,f.height=c;let g=d(f);if(g!=null)g.putImageData(e,0,0),s=g.getImageData(0,0,h,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let h=d(c);if(h!=null){let f=e.height,g=e.width;return h.drawImage(e,0,0,g,f),s=h.getImageData(0,0,g,f).data,o.height=f,o.width=g,_r(s,o)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,h)=>{let f=l(),g=d(f);if(!e||!g)return h();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{f.width=w.width,f.height=w.height,g.drawImage(w,0,0,f.width,f.height);let _=g.getImageData(0,0,f.width,f.height);o.height=f.height,o.width=f.width,c(_r(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return _r(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Oh=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t,s=[1,r,n,4];return new et({location:"texture",type:"float32",texture:e,dims:s,download:i,dispose:a})},Bh=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:i,dispose:a})},Dh=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:i,dispose:a})},Uh=(e,t,n)=>new et({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),en,Xn,Ui,Lh,C_=q(()=>{en=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Xn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ui=!1,Lh=()=>{if(!Ui){Ui=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(en.set("int64",BigInt64Array),Xn.set(BigInt64Array,"int64")),t&&(en.set("uint64",BigUint64Array),Xn.set(BigUint64Array,"uint64")),r?(en.set("float16",n),Xn.set(n,"float16")):en.set("float16",Uint16Array)}}}),Fh,Wh,E_=q(()=>{_s(),Fh=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Wh=(e,t)=>{switch(e.location){case"cpu":return new et(e.type,e.data,t);case"cpu-pinned":return new et({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new et({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new et({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new et({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),et,_s=q(()=>{k_(),T_(),C_(),E_(),et=class{constructor(e,t,n){Lh();let r,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=en.get(r);if(!s)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(r=e,o=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=en.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",s=e;else if(l==="boolean")r="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let l=Xn.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");i=o,this.cpuData=s,this.dataLocation="cpu"}let a=Fh(i);if(this.cpuData&&a!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return Ph(e,t)}static fromTexture(e,t){return Oh(e,t)}static fromGpuBuffer(e,t){return Bh(e,t)}static fromMLTensor(e,t){return Dh(e,t)}static fromPinnedBuffer(e,t,n){return Uh(e,t,n)}toDataURL(e){return Nh(this,e)}toImageData(e){return Rh(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Wh(this,e)}}}),ft,qh=q(()=>{_s(),ft=et}),Vr,Li,$t,gt,on,ln,Vh=q(()=>{Ah(),Vr=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},Li=(e,t)=>{var i;let n=((i=new Error().stack)==null?void 0:i.split(/\r\n|\r|\n/g))||[],r=!1;for(let a=0;a<n.length;a++){if(r&&!n[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${n[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Vr("CPU",s);return}n[a].includes("TRACE_FUNC")&&(r=!0)}},$t=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Li("BEGIN",e)},gt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Li("END",e)},on=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.time(`ORT::${e}`)},ln=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeEnd(`ORT::${e}`)}}),Hh,I_=q(()=>{zh(),qh(),Vh(),Hh=class Gh{constructor(t){this.handler=t}async run(t,n,r){$t(),on("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof ft||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof ft)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of n){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);i[d]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(n);for(let h of this.outputNames)if(c.indexOf(h)!==-1){let f=n[h];(f===null||f instanceof ft)&&(d=!0,s=!1,i[h]=f)}if(d){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)i[d]=null;let o=await this.handler.run(t,i,a),l={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let c=o[d];c instanceof ft?l[d]=c:l[d]=new ft(c.type,c.data,c.dims)}return ln("InferenceSession.run"),gt(),l}async release(){return this.handler.dispose()}static async create(t,n,r,i){$t(),on("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,h=0,f=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(f=t.byteLength-h,typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||h+f>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-h}].`);if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,h,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await Ih(s),d=await o.createInferenceSessionHandler(a,l);return ln("InferenceSession.create"),gt(),new Gh(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),xs,z_=q(()=>{I_(),xs=Hh}),M_=q(()=>{}),A_=q(()=>{}),N_=q(()=>{}),R_=q(()=>{}),P_={};Cn(P_,{InferenceSession:()=>xs,TRACE:()=>Vr,TRACE_EVENT_BEGIN:()=>on,TRACE_EVENT_END:()=>ln,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>gt,Tensor:()=>ft,env:()=>Se,registerBackend:()=>_n});var at=q(()=>{v_(),S_(),z_(),qh(),M_(),A_(),Vh(),N_(),R_()}),vs=q(()=>{}),jh={};Cn(jh,{default:()=>Kh});var Fi,Wi,Kh,O_=q(()=>{var e;e0(),hn(),$s(),Fi="ort-wasm-proxy-worker",Wi=((e=globalThis.self)==null?void 0:e.name)===Fi,Wi&&(self.onmessage=t=>{let{type:n,in:r}=t.data;try{switch(n){case"init-wasm":Ss(r.wasm).then(()=>{Fs(r).then(()=>{postMessage({type:n})},i=>{postMessage({type:n,err:i})})},i=>{postMessage({type:n,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;Ws(a,i).then(()=>{postMessage({type:n})},s=>{postMessage({type:n,err:s})});break}case"copy-from":{let{buffer:i}=r,a=Zr(i);postMessage({type:n,out:a});break}case"create":{let{model:i,options:a}=r;qs(i,a).then(s=>{postMessage({type:n,out:s})},s=>{postMessage({type:n,err:s})});break}case"release":Vs(r),postMessage({type:n});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:o,options:l}=r;Hs(i,a,s,o,new Array(o.length).fill(null),l).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:d},js([...s,...d]))},d=>{postMessage({type:n,err:d})});break}case"end-profiling":Gs(r),postMessage({type:n});break;default:}}catch(i){postMessage({type:n,err:i})}}),Kh=Wi?null:t=>new Worker(t??Qe,{type:"module",name:Fi})}),Xh={};Cn(Xh,{default:()=>Yh});async function au(e={}){var jl,Kl;var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&((jl=self.name)==null?void 0:jl.startsWith("em-pthread"));t.mountExternalData=(u,p)=>{u.startsWith("./")&&(u=u.substring(2)),(t.Xc||(t.Xc=new Map)).set(u,p)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=u=>async(...p)=>{var y;try{if(t.Yc)throw Error("Session already started");let m=t.Yc={Kd:p[0],errors:[]},S=await u(...p);if(t.Yc!==m)throw Error("Session mismatch");(y=t.dd)==null||y.flush();let I=m.errors;if(0<I.length){let N=await Promise.all(I);if(N=N.filter(B=>B),0<N.length)throw Error(N.join(`
`))}return S}finally{t.Yc=null}};t.jsepInit=(u,p)=>{if(u==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=p;let y=t.dd;t.jsepRegisterBuffer=(m,S,I,N)=>y.registerBuffer(m,S,I,N),t.jsepGetBuffer=m=>y.getBuffer(m),t.jsepCreateDownloader=(m,S,I)=>y.createDownloader(m,S,I),t.jsepOnCreateSession=m=>{y.onCreateSession(m)},t.jsepOnReleaseSession=m=>{y.onReleaseSession(m)},t.jsepOnRunStart=m=>y.onRunStart(m),t.Id=(m,S)=>{y.upload(m,S)}}else if(u==="webnn"){let y=p[0];[t.Wd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=m=>y.onRunStart(m),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnOnReleaseSession=m=>{y.onReleaseSession(m)},t.webnnCreateMLTensorDownloader=(m,S)=>y.createMLTensorDownloader(m,S),t.webnnRegisterMLTensor=(m,S,I,N)=>y.registerMLTensor(m,S,I,N),t.webnnCreateMLContext=m=>y.createMLContext(m),t.webnnRegisterMLConstant=(m,S,I,N,B,j)=>y.registerMLConstant(m,S,I,N,B,t.Xc,j),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let s=()=>{let u=p=>(...y)=>{let m=yt;return y=p(...y),yt!=m?new Promise((S,I)=>{wi={resolve:S,reject:I}}):y};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=u(t[p])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s==null||s()};var o,l,d=(u,p)=>{throw p},c=import.meta.url,h="";if(n||r){try{h=new URL(".",c).href}catch{}r&&(l=u=>{var p=new XMLHttpRequest;return p.open("GET",u,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),o=async u=>{if(A(u))return new Promise((y,m)=>{var S=new XMLHttpRequest;S.open("GET",u,!0),S.responseType="arraybuffer",S.onload=()=>{S.status==200||S.status==0&&S.response?y(S.response):m(S.status)},S.onerror=m,S.send(null)});var p=await fetch(u,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var f,g,w,_,T,v,x=console.log.bind(console),C=console.error.bind(console),k=x,E=C,M=!1,A=u=>u.startsWith("file://");function $(){Nt.buffer!=U.buffer&&G()}if(i){let u=function(p){try{var y=p.data,m=y.Sc;if(m==="load"){let S=[];self.onmessage=I=>S.push(I),v=()=>{postMessage({Sc:"loaded"});for(let I of S)u(I);self.onmessage=u};for(let I of y.xd)t[I]&&!t[I].proxy||(t[I]=(...N)=>{postMessage({Sc:"callHandler",wd:I,args:N})},I=="print"&&(k=t[I]),I=="printErr"&&(E=t[I]));Nt=y.Od,G(),g=y.Pd,qe(),yr()}else if(m==="run"){(function(S){var I=($(),Z)[S+52>>>2>>>0];S=($(),Z)[S+56>>>2>>>0],rl(I,I-S),pe(I)})(y.Rc),Si(y.Rc,0,0,1,0,0),ro(),gi(y.Rc),O||(Zo(),O=!0);try{M0(y.Md,y.bd)}catch(S){if(S!="unwind")throw S}}else y.target!=="setimmediate"&&(m==="checkMailbox"?O&&cr():m&&(E(`worker: received unknown command ${m}`),E(y)))}catch(S){throw Qo(),S}};var O=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=u}var U,H,F,K,R,Z,Q,te,ie,W,re,L=!1;function G(){var u=Nt.buffer;t.HEAP8=U=new Int8Array(u),F=new Int16Array(u),t.HEAPU8=H=new Uint8Array(u),K=new Uint16Array(u),t.HEAP32=R=new Int32Array(u),t.HEAPU32=Z=new Uint32Array(u),Q=new Float32Array(u),te=new Float64Array(u),ie=new BigInt64Array(u),W=new BigUint64Array(u)}function X(){L=!0,i?v():kt.sb()}function V(u){throw E(u="Aborted("+u+")"),M=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),T==null||T(u),u}function _e(){return{a:{ma:ey,gb:Jb,g:A0,J:N0,f:R0,o:P0,h:O0,ha:B0,b:D0,T:U0,Ha:uo,n:L0,$:fo,Xa:mo,Da:go,Fa:bo,Ya:yo,Va:wo,Oa:_o,Ua:xo,ka:vo,Ea:$o,Ba:So,Wa:ko,Ca:To,bb:F0,ea:W0,wa:q0,ua:H0,da:j0,O:K0,H:X0,va:Y0,_:rb,xa:ib,Ra:ab,za:ob,Ia:lb,sa:ub,fa:db,Qa:gi,_a:cb,R:mb,r:_b,c:fi,hb:xb,y:vb,M:$b,D:Sb,l:kb,s:Ro,ib:Tb,I:Cb,S:Eb,j:Ib,u:zb,q:Mb,k:Ab,La:Nb,Ma:Rb,Na:Pb,Ja:Do,Ka:Uo,ta:Lo,db:Bb,ab:Ub,v:Lb,aa:Fb,ga:Wb,$a:Db,W:qb,Za:Vb,Aa:Hb,F:Ob,U:Gb,la:gr,ya:Kb,fb:jb,eb:Xb,Sa:Vo,Ta:Ho,Ga:Mn,V:Go,ja:jo,Pa:Ko,ia:Xo,kb:Oy,na:My,lb:Py,oa:zy,G:xy,d:iy,t:ny,w:ty,A:fy,mb:Cy,K:yy,x:oy,pa:Ey,Y:Ay,ba:Ty,nb:ky,ob:Sy,P:my,qa:$y,pb:vy,N:wy,Z:Iy,e:ry,B:sy,m:ay,jb:By,p:uy,z:dy,C:ly,E:cy,L:gy,qb:_y,Q:Ny,ca:by,X:Ry,rb:hy,ra:py,i:Zb,a:Nt,cb:Ze}}}async function qe(){function u(m,S){var I=kt=m.exports;m={};for(let[N,B]of Object.entries(I))typeof B=="function"?(I=pb(B),m[N]=I):m[N]=B;return kt=m,kt=(function(){var N=kt,B=Y=>de=>Y(de)>>>0,j=Y=>()=>Y()>>>0;return(N=Object.assign({},N)).tb=B(N.tb),N.Xb=j(N.Xb),N.Zb=B(N.Zb),N.lc=B(N.lc),N.mc=j(N.mc),N.qc=B(N.qc),N})(),to.push(kt._b),Yo=(m=kt).tb,Zo=m.ub,t._OrtInit=m.vb,t._OrtGetLastError=m.wb,t._OrtCreateSessionOptions=m.xb,t._OrtAppendExecutionProvider=m.yb,t._OrtAddFreeDimensionOverride=m.zb,t._OrtAddSessionConfigEntry=m.Ab,t._OrtReleaseSessionOptions=m.Bb,t._OrtCreateSession=m.Cb,t._OrtReleaseSession=m.Db,t._OrtGetInputOutputCount=m.Eb,t._OrtGetInputOutputMetadata=m.Fb,t._OrtFree=m.Gb,t._OrtCreateTensor=m.Hb,t._OrtGetTensorData=m.Ib,t._OrtReleaseTensor=m.Jb,t._OrtCreateRunOptions=m.Kb,t._OrtAddRunConfigEntry=m.Lb,t._OrtReleaseRunOptions=m.Mb,t._OrtCreateBinding=m.Nb,t._OrtBindInput=m.Ob,t._OrtBindOutput=m.Pb,t._OrtClearBoundOutputs=m.Qb,t._OrtReleaseBinding=m.Rb,t._OrtRunWithBinding=m.Sb,t._OrtRun=m.Tb,t._OrtEndProfiling=m.Ub,t._JsepOutput=m.Vb,t._JsepGetNodeName=m.Wb,br=m.Xb,wt=t._free=m.Yb,Rn=t._malloc=m.Zb,Si=m.ac,Qo=m.bc,Jo=m.cc,el=m.dc,ki=m.ec,tl=m.fc,nl=m.gc,fe=m.hc,Pn=m.ic,rl=m.jc,pe=m.kc,Ti=m.lc,he=m.mc,il=m.nc,Ci=m.oc,al=m.pc,sl=m.qc,ol=m.rc,Ei=m.sc,ll=m.tc,ul=m.uc,dl=m.vc,cl=m.wc,pl=m.xc,hl=m.yc,fl=m.zc,ml=m.Ac,gl=m.Bc,bl=m.Cc,yl=m.Dc,wl=m.Ec,_l=m.Fc,xl=m.Gc,vl=m.Hc,$l=m.Ic,Sl=m.Jc,kl=m.Kc,Tl=m.Lc,Cl=m.Mc,El=m.Nc,Il=m.Pc,zl=m.Qc,Ml=m.$c,Al=m.ad,Nl=m.fd,Rl=m.jd,Pl=m.kd,Ol=m.ld,Bl=m.md,Dl=m.nd,Ul=m.od,Ll=m.pd,Fl=m.qd,Wl=m.vd,ql=m.Sd,Vl=m.Td,Hl=m.Ud,Gl=m.Vd,g=S,kt}var p,y=_e();return t.instantiateWasm?new Promise(m=>{t.instantiateWasm(y,(S,I)=>{m(u(S,I))})}):i?u(new WebAssembly.Instance(g,_e()),g):(re??(re=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href),p=await(async function(m){var S=re;if(!f&&!A(S))try{var I=fetch(S,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,m)}catch(N){E(`wasm streaming compile failed: ${N}`),E("falling back to ArrayBuffer instantiation")}return(async function(N,B){try{var j=await(async function(Y){if(!f)try{var de=await o(Y);return new Uint8Array(de)}catch{}if(Y==re&&f)Y=new Uint8Array(f);else{if(!l)throw"both async and sync fetching of the wasm failed";Y=l(Y)}return Y})(N);return await WebAssembly.instantiate(j,B)}catch(Y){E(`failed to asynchronously prepare wasm: ${Y}`),V(Y)}})(S,m)})(y),u(p.instance,p.module))}class Ie{constructor(p){Re(this,"name","ExitStatus");this.message=`Program terminated with exit(${p})`,this.status=p}}var Be=u=>{u.terminate(),u.onmessage=()=>{}},je=[],Ye=0,Ke=null,Mt=u=>{At.length==0&&(ao(),io(At[0]));var p=At.pop();if(!p)return 6;An.push(p),Gt[u.Rc]=p,p.Rc=u.Rc;var y={Sc:"run",Md:u.Ld,bd:u.bd,Rc:u.Rc};return p.postMessage(y,u.rd),0},Ce=0,se=(u,p,...y)=>{var m,S=16*y.length,I=he(),N=Ti(S),B=N>>>3;for(m of y)typeof m=="bigint"?(($(),ie)[B++>>>0]=1n,($(),ie)[B++>>>0]=m):(($(),ie)[B++>>>0]=0n,($(),te)[B++>>>0]=m);return u=Jo(u,0,S,N,p),pe(I),u};function Ze(u){if(i)return se(0,1,u);if(w=u,!(0<Ce)){for(var p of An)Be(p);for(p of At)Be(p);At=[],An=[],Gt={},M=!0}d(0,new Ie(u))}function sr(u){if(i)return se(1,0,u);Mn(u)}var Mn=u=>{if(w=u,i)throw sr(u),"unwind";Ze(u)},At=[],An=[],to=[],Gt={},no=u=>{var p=u.Rc;delete Gt[p],At.push(u),An.splice(An.indexOf(u),1),u.Rc=0,el(p)};function ro(){to.forEach(u=>u())}var io=u=>new Promise(p=>{u.onmessage=S=>{var I=S.data;if(S=I.Sc,I.Zc&&I.Zc!=br()){var N=Gt[I.Zc];N?N.postMessage(I,I.rd):E(`Internal error! Worker sent a message "${S}" to target pthread ${I.Zc}, but that thread no longer exists!`)}else S==="checkMailbox"?cr():S==="spawnThread"?Mt(I):S==="cleanupThread"?dr(()=>{no(Gt[I.Nd])}):S==="loaded"?(u.loaded=!0,p(u)):I.target==="setimmediate"?u.postMessage(I):S==="uncaughtException"?u.onerror(I.error):S==="callHandler"?t[I.wd](...I.args):S&&E(`worker sent an unknown command ${S}`)},u.onerror=S=>{throw E(`worker sent an error! ${S.filename}:${S.lineno}: ${S.message}`),S};var y,m=[];for(y of[])t.propertyIsEnumerable(y)&&m.push(y);u.postMessage({Sc:"load",xd:m,Od:Nt,Pd:g})});function ao(){var u=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});At.push(u)}var Nt,M0=(u,p)=>{Ce=0,u=Ei(u,p),0<Ce?w=u:ki(u)},or=[],lr=0;function A0(u){var p=new di(u>>>=0);return($(),U)[p.Tc+12>>>0]==0&&(so(p,!0),lr--),oo(p,!1),or.push(p),sl(u)}var gn=0,N0=()=>{fe(0,0);var u=or.pop();il(u.cd),gn=0};function so(u,p){p=p?1:0,($(),U)[u.Tc+12>>>0]=p}function oo(u,p){p=p?1:0,($(),U)[u.Tc+13>>>0]=p}class di{constructor(p){this.cd=p,this.Tc=p-24}}var ci=u=>{var p=gn;if(!p)return Pn(0),0;var y=new di(p);($(),Z)[y.Tc+16>>>2>>>0]=p;var m=($(),Z)[y.Tc+4>>>2>>>0];if(!m)return Pn(0),p;for(var S of u){if(S===0||S===m)break;if(al(S,m,y.Tc+16))return Pn(S),p}return Pn(m),p};function R0(){return ci([])}function P0(u){return ci([u>>>0])}function O0(u,p,y,m){return ci([u>>>0,p>>>0,y>>>0,m>>>0])}var B0=()=>{var u=or.pop();u||V("no exception to throw");var p=u.cd;throw($(),U)[u.Tc+13>>>0]==0&&(or.push(u),oo(u,!0),so(u,!1),lr++),Ci(p),gn=p};function D0(u,p,y){var m=new di(u>>>=0);throw p>>>=0,y>>>=0,($(),Z)[m.Tc+16>>>2>>>0]=0,($(),Z)[m.Tc+4>>>2>>>0]=p,($(),Z)[m.Tc+8>>>2>>>0]=y,Ci(u),lr++,gn=u}var U0=()=>lr;function lo(u,p,y,m){return i?se(2,1,u,p,y,m):uo(u,p,y,m)}function uo(u,p,y,m){if(u>>>=0,p>>>=0,y>>>=0,m>>>=0,!globalThis.SharedArrayBuffer)return 6;var S=[];return i&&S.length===0?lo(u,p,y,m):(u={Ld:y,Rc:u,bd:m,rd:S},i?(u.Sc="spawnThread",postMessage(u,S),0):Mt(u))}function L0(u){throw gn||(gn=u>>>0),gn}var co=globalThis.TextDecoder&&new TextDecoder,po=(u,p,y,m)=>{if(y=p+y,m)return y;for(;u[p]&&!(p>=y);)++p;return p},ho=(u,p=0,y,m)=>{if(16<(y=po(u,p>>>=0,y,m))-p&&u.buffer&&co)return co.decode(u.buffer instanceof ArrayBuffer?u.subarray(p,y):u.slice(p,y));for(m="";p<y;){var S=u[p++];if(128&S){var I=63&u[p++];if((224&S)==192)m+=String.fromCharCode((31&S)<<6|I);else{var N=63&u[p++];65536>(S=(240&S)==224?(15&S)<<12|I<<6|N:(7&S)<<18|I<<12|N<<6|63&u[p++])?m+=String.fromCharCode(S):(S-=65536,m+=String.fromCharCode(55296|S>>10,56320|1023&S))}}else m+=String.fromCharCode(S)}return m},Ne=(u,p,y)=>(u>>>=0)?ho(($(),H),u,p,y):"";function fo(u,p,y){return i?se(3,1,u,p,y):0}function mo(u,p){if(i)return se(4,1,u,p)}function go(u,p){if(i)return se(5,1,u,p)}function bo(u,p,y){if(i)return se(6,1,u,p,y)}function yo(u,p,y){return i?se(7,1,u,p,y):0}function wo(u,p){if(i)return se(8,1,u,p)}function _o(u,p,y){if(i)return se(9,1,u,p,y)}function xo(u,p,y,m){if(i)return se(10,1,u,p,y,m)}function vo(u,p,y,m){if(i)return se(11,1,u,p,y,m)}function $o(u,p,y,m){if(i)return se(12,1,u,p,y,m)}function So(u){if(i)return se(13,1,u)}function ko(u,p){if(i)return se(14,1,u,p)}function To(u,p,y){if(i)return se(15,1,u,p,y)}var F0=()=>V(""),bt=u=>{u>>>=0;for(var p="";;){var y=($(),H)[u++>>>0];if(!y)return p;p+=String.fromCharCode(y)}},pi={},hi={},bn=class extends Error{constructor(u){super(u),this.name="BindingError"}};function St(u,p,y={}){return(function(m,S,I={}){var N=S.name;if(!m)throw new bn(`type "${N}" must have a positive integer typeid pointer`);if(hi.hasOwnProperty(m)){if(I.yd)return;throw new bn(`Cannot register type '${N}' twice`)}hi[m]=S,pi.hasOwnProperty(m)&&(S=pi[m],delete pi[m],S.forEach(B=>B()))})(u,p,y)}var Co=(u,p,y)=>{switch(p){case 1:return y?m=>($(),U)[m>>>0]:m=>($(),H)[m>>>0];case 2:return y?m=>($(),F)[m>>>1>>>0]:m=>($(),K)[m>>>1>>>0];case 4:return y?m=>($(),R)[m>>>2>>>0]:m=>($(),Z)[m>>>2>>>0];case 8:return y?m=>($(),ie)[m>>>3>>>0]:m=>($(),W)[m>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${u}`)}};function W0(u,p,y,m,S){u>>>=0,y>>>=0,p=bt(p>>>0);let I=N=>N;if(m=m===0n){let N=8*y;I=B=>BigInt.asUintN(N,B),S=I(S)}St(u,{name:p,Oc:I,Vc:(N,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Uc:Co(p,y,!m),Wc:null})}function q0(u,p,y,m){St(u>>>=0,{name:p=bt(p>>>0),Oc:function(S){return!!S},Vc:function(S,I){return I?y:m},Uc:function(S){return this.Oc(($(),H)[S>>>0])},Wc:null})}var Eo=[],jt=[0,1,,1,null,1,!0,1,!1,1];function fi(u){9<(u>>>=0)&&--jt[u+1]==0&&(jt[u]=void 0,Eo.push(u))}var rt=u=>{if(!u)throw new bn(`Cannot use deleted val. handle = ${u}`);return jt[u]},ot=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Eo.pop()||jt.length;return jt[p]=u,jt[p+1]=1,p}};function mi(u){return this.Oc(($(),Z)[u>>>2>>>0])}var V0={name:"emscripten::val",Oc:u=>{var p=rt(u);return fi(u),p},Vc:(u,p)=>ot(p),Uc:mi,Wc:null};function H0(u){return St(u>>>0,V0)}var G0=(u,p)=>{switch(p){case 4:return function(y){return this.Oc(($(),Q)[y>>>2>>>0])};case 8:return function(y){return this.Oc(($(),te)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${u}`)}};function j0(u,p,y){y>>>=0,St(u>>>=0,{name:p=bt(p>>>0),Oc:m=>m,Vc:(m,S)=>S,Uc:G0(p,y),Wc:null})}function K0(u,p,y,m,S){u>>>=0,y>>>=0,p=bt(p>>>0);let I=B=>B;if(m===0){var N=32-8*y;I=B=>B<<N>>>N,S=I(S)}St(u,{name:p,Oc:I,Vc:(B,j)=>j,Uc:Co(p,y,m!==0),Wc:null})}function X0(u,p,y){function m(I){var N=($(),Z)[I>>>2>>>0];return I=($(),Z)[I+4>>>2>>>0],new S(($(),U).buffer,I,N)}var S=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];St(u>>>=0,{name:y=bt(y>>>0),Oc:m,Uc:m},{yd:!0})}var Rt=(u,p,y)=>{var m=($(),H);if(p>>>=0,0<y){var S=p;y=p+y-1;for(var I=0;I<u.length;++I){var N=u.codePointAt(I);if(127>=N){if(p>=y)break;m[p++>>>0]=N}else if(2047>=N){if(p+1>=y)break;m[p++>>>0]=192|N>>6,m[p++>>>0]=128|63&N}else if(65535>=N){if(p+2>=y)break;m[p++>>>0]=224|N>>12,m[p++>>>0]=128|N>>6&63,m[p++>>>0]=128|63&N}else{if(p+3>=y)break;m[p++>>>0]=240|N>>18,m[p++>>>0]=128|N>>12&63,m[p++>>>0]=128|N>>6&63,m[p++>>>0]=128|63&N,I++}}m[p>>>0]=0,u=p-S}else u=0;return u},ur=u=>{for(var p=0,y=0;y<u.length;++y){var m=u.charCodeAt(y);127>=m?p++:2047>=m?p+=2:55296<=m&&57343>=m?(p+=4,++y):p+=3}return p};function Y0(u,p){St(u>>>=0,{name:p=bt(p>>>0),Oc(y){var m=($(),Z)[y>>>2>>>0];return m=Ne(y+4,m,!0),wt(y),m},Vc(y,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var S=typeof m=="string";if(!(S||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new bn("Cannot pass non-string to std::string");var I=S?ur(m):m.length,N=Rn(4+I+1),B=N+4;return($(),Z)[N>>>2>>>0]=I,S?Rt(m,B,I+1):($(),H).set(m,B>>>0),y!==null&&y.push(wt,N),N},Uc:mi,Wc(y){wt(y)}})}var Io=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Z0=(u,p,y)=>{if(u>>>=1,16<(p=po(($(),K),u,p/2,y))-u&&Io)return Io.decode(($(),K).slice(u,p));for(y="";u<p;++u){var m=($(),K)[u>>>0];y+=String.fromCharCode(m)}return y},Q0=(u,p,y)=>{if(y??(y=2147483647),2>y)return 0;var m=p;y=(y-=2)<2*u.length?y/2:u.length;for(var S=0;S<y;++S){var I=u.charCodeAt(S);($(),F)[p>>>1>>>0]=I,p+=2}return($(),F)[p>>>1>>>0]=0,p-m},J0=u=>2*u.length,eb=(u,p,y)=>{var m="";u>>>=2;for(var S=0;!(S>=p/4);S++){var I=($(),Z)[u+S>>>0];if(!I&&!y)break;m+=String.fromCodePoint(I)}return m},tb=(u,p,y)=>{if(p>>>=0,y??(y=2147483647),4>y)return 0;var m=p;y=m+y-4;for(var S=0;S<u.length;++S){var I=u.codePointAt(S);if(65535<I&&S++,($(),R)[p>>>2>>>0]=I,(p+=4)+4>y)break}return($(),R)[p>>>2>>>0]=0,p-m},nb=u=>{for(var p=0,y=0;y<u.length;++y)65535<u.codePointAt(y)&&y++,p+=4;return p};function rb(u,p,y){if(u>>>=0,p>>>=0,y=bt(y>>>=0),p===2)var m=Z0,S=Q0,I=J0;else m=eb,S=tb,I=nb;St(u,{name:y,Oc:N=>{var B=($(),Z)[N>>>2>>>0];return B=m(N+4,B*p,!0),wt(N),B},Vc:(N,B)=>{if(typeof B!="string")throw new bn(`Cannot pass non-string to C++ string type ${y}`);var j=I(B),Y=Rn(4+j+p);return($(),Z)[Y>>>2>>>0]=j/p,S(B,Y+4,j+p),N!==null&&N.push(wt,Y),Y},Uc:mi,Wc(N){wt(N)}})}function ib(u,p){St(u>>>=0,{zd:!0,name:p=bt(p>>>0),Oc:()=>{},Vc:()=>{}})}function ab(u){Si(u>>>0,!r,1,!n,131072,!1),ro()}var dr=u=>{if(!M)try{if(u(),!(0<Ce))try{i?br()&&ki(w):Mn(w)}catch(p){p instanceof Ie||p=="unwind"||d(0,p)}}catch(p){p instanceof Ie||p=="unwind"||d(0,p)}},sb=!Atomics.waitAsync||((Kl=globalThis.navigator)==null?void 0:Kl.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function gi(u){u>>>=0,sb||(Atomics.waitAsync(($(),R),u>>>2,u).value.then(cr),u+=128,Atomics.store(($(),R),u>>>2,1))}var cr=()=>dr(()=>{var u=br();u&&(gi(u),nl())});function ob(u,p){(u>>>=0)==p>>>0?setTimeout(cr):i?postMessage({Zc:u,Sc:"checkMailbox"}):(u=Gt[u])&&u.postMessage({Sc:"checkMailbox"})}var bi=[];function lb(u,p,y,m,S){for(p>>>=0,S>>>=0,bi.length=0,y=S>>>3,m=S+m>>>3;y<m;){var I;I=($(),ie)[y++>>>0]?($(),ie)[y++>>>0]:($(),te)[y++>>>0],bi.push(I)}return(p?Ii[p]:Qb[u])(...bi)}var ub=()=>{Ce=0};function db(u){u>>>=0,i?postMessage({Sc:"cleanupThread",Nd:u}):no(Gt[u])}function cb(u){}var pr=u=>{try{u()}catch(p){V(p)}};function pb(u){var p=(...y)=>{hr.push(u);try{return u(...y)}finally{M||(hr.pop(),yt&&Pt===1&&hr.length===0&&(Pt=0,Ce+=1,pr(Vl),typeof Fibers<"u"&&Fibers.Zd()))}};return Ao.set(u,p),p}var Pt=0,yt=null,zo=0,hr=[],yi=new Map,Mo=new Map,Ao=new Map,hb=0,wi=null,fb=[],No=u=>(function(p){if(!M){if(Pt===0){var y=!1,m=!1;p((S=0)=>{if(!M&&(zo=S,y=!0,m)){Pt=2,pr(()=>Hl(yt)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),S=!1;try{var I=(function(){var j=($(),R)[yt+8>>>2>>>0];return j=Mo.get(j),j=Ao.get(j),--Ce,j()})()}catch(j){I=j,S=!0}var N=!1;if(!yt){var B=wi;B&&(wi=null,(S?B.reject:B.resolve)(I),N=!0)}if(S&&!N)throw I}}),m=!0,y||(Pt=1,yt=(function(){var S=Rn(65548),I=S+12;if(($(),Z)[S>>>2>>>0]=I,($(),Z)[S+4>>>2>>>0]=I+65536,I=hr[0],!yi.has(I)){var N=hb++;yi.set(I,N),Mo.set(N,I)}return I=yi.get(I),($(),R)[S+8>>>2>>>0]=I,S})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),pr(()=>ql(yt)))}else Pt===2?(Pt=0,pr(Gl),wt(yt),yt=null,fb.forEach(dr)):V(`invalid state: ${Pt}`);return zo}})(p=>{u().then(p)});function mb(u){return u>>>=0,No(async()=>{var p=await rt(u);return ot(p)})}var _i=[],gb=u=>{var p=_i.length;return _i.push(u),p},bb=(u,p)=>{for(var y=Array(u),m=0;m<u;++m){var S=m,I=($(),Z)[p+4*m>>>2>>>0],N=hi[I];if(N===void 0)throw u=`parameter ${m}`,I=Yo(I),p=bt(I),wt(I),new bn(`${u} has unknown type ${p}`);y[S]=N}return y},yb=(u,p,y)=>{var m=[];return u=u(m,y),m.length&&(($(),Z)[p>>>2>>>0]=ot(m)),u},wb={},fr=u=>{var p=wb[u];return p===void 0?bt(u):p};function _b(u,p,y){var[m,...S]=bb(u,p>>>0);p=m.Vc.bind(m);var I=S.map(j=>j.Uc.bind(j));u--;var N={toValue:rt};switch(u=I.map((j,Y)=>{var de=`argFromPtr${Y}`;return N[de]=j,`${de}(args${Y?"+"+8*Y:""})`}),y){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:N.getStringOrSymbol=fr,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${u})`,m.zd||(N.toReturnWire=p,N.emval_returnValue=yb,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,y=new Function(Object.keys(N),B)(...Object.values(N)),B=`methodCaller<(${S.map(j=>j.name)}) => ${m.name}>`,gb(Object.defineProperty(y,"name",{value:B}))}function xb(u,p){return p>>>=0,(u=rt(u>>>0))==rt(p)}function vb(u){return(u>>>=0)?(u=fr(u),ot(globalThis[u])):ot(globalThis)}function $b(u){return u=fr(u>>>0),ot(t[u])}function Sb(u,p){return p>>>=0,u=rt(u>>>0),p=rt(p),ot(u[p])}function kb(u){9<(u>>>=0)&&(jt[u+1]+=1)}function Ro(u,p,y,m,S){return _i[u>>>0](p>>>0,y>>>0,m>>>0,S>>>0)}function Tb(u,p,y,m,S){return Ro(u>>>0,p>>>0,y>>>0,m>>>0,S>>>0)}function Cb(){return ot([])}function Eb(u){u=rt(u>>>0);for(var p=Array(u.length),y=0;y<u.length;y++)p[y]=u[y];return ot(p)}function Ib(u){return ot(fr(u>>>0))}function zb(){return ot({})}function Mb(u){for(var p=rt(u>>>=0);p.length;){var y=p.pop();p.pop()(y)}fi(u)}function Ab(u,p,y){p>>>=0,y>>>=0,u=rt(u>>>0),p=rt(p),y=rt(y),u[p]=y}function Nb(u,p){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),p>>>=0,u=new Date(1e3*u),($(),R)[p>>>2>>>0]=u.getUTCSeconds(),($(),R)[p+4>>>2>>>0]=u.getUTCMinutes(),($(),R)[p+8>>>2>>>0]=u.getUTCHours(),($(),R)[p+12>>>2>>>0]=u.getUTCDate(),($(),R)[p+16>>>2>>>0]=u.getUTCMonth(),($(),R)[p+20>>>2>>>0]=u.getUTCFullYear()-1900,($(),R)[p+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),R)[p+28>>>2>>>0]=u}var Po=u=>u%4==0&&(u%100!=0||u%400==0),Oo=[0,31,60,91,121,152,182,213,244,274,305,335],Bo=[0,31,59,90,120,151,181,212,243,273,304,334];function Rb(u,p){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),p>>>=0,u=new Date(1e3*u),($(),R)[p>>>2>>>0]=u.getSeconds(),($(),R)[p+4>>>2>>>0]=u.getMinutes(),($(),R)[p+8>>>2>>>0]=u.getHours(),($(),R)[p+12>>>2>>>0]=u.getDate(),($(),R)[p+16>>>2>>>0]=u.getMonth(),($(),R)[p+20>>>2>>>0]=u.getFullYear()-1900,($(),R)[p+24>>>2>>>0]=u.getDay();var y=(Po(u.getFullYear())?Oo:Bo)[u.getMonth()]+u.getDate()-1|0;($(),R)[p+28>>>2>>>0]=y,($(),R)[p+36>>>2>>>0]=-60*u.getTimezoneOffset(),y=new Date(u.getFullYear(),6,1).getTimezoneOffset();var m=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(y!=m&&u.getTimezoneOffset()==Math.min(m,y)),($(),R)[p+32>>>2>>>0]=u}function Pb(u){u>>>=0;var p=new Date(($(),R)[u+20>>>2>>>0]+1900,($(),R)[u+16>>>2>>>0],($(),R)[u+12>>>2>>>0],($(),R)[u+8>>>2>>>0],($(),R)[u+4>>>2>>>0],($(),R)[u>>>2>>>0],0),y=($(),R)[u+32>>>2>>>0],m=p.getTimezoneOffset(),S=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(I,S);return 0>y?($(),R)[u+32>>>2>>>0]=+(S!=I&&N==m):0<y!=(N==m)&&(S=Math.max(I,S),p.setTime(p.getTime()+6e4*((0<y?N:S)-m))),($(),R)[u+24>>>2>>>0]=p.getDay(),y=(Po(p.getFullYear())?Oo:Bo)[p.getMonth()]+p.getDate()-1|0,($(),R)[u+28>>>2>>>0]=y,($(),R)[u>>>2>>>0]=p.getSeconds(),($(),R)[u+4>>>2>>>0]=p.getMinutes(),($(),R)[u+8>>>2>>>0]=p.getHours(),($(),R)[u+12>>>2>>>0]=p.getDate(),($(),R)[u+16>>>2>>>0]=p.getMonth(),($(),R)[u+20>>>2>>>0]=p.getYear(),u=p.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function Do(u,p,y,m,S,I,N){return i?se(16,1,u,p,y,m,S,I,N):-52}function Uo(u,p,y,m,S,I){if(i)return se(17,1,u,p,y,m,S,I)}var Nn={},Ob=()=>performance.timeOrigin+performance.now();function Lo(u,p){if(i)return se(18,1,u,p);if(Nn[u]&&(clearTimeout(Nn[u].id),delete Nn[u]),!p)return 0;var y=setTimeout(()=>{delete Nn[u],dr(()=>tl(u,performance.timeOrigin+performance.now()))},p);return Nn[u]={id:y,Yd:p},0}function Bb(u,p,y,m){u>>>=0,p>>>=0,y>>>=0,m>>>=0;var S=new Date().getFullYear(),I=new Date(S,0,1).getTimezoneOffset();S=new Date(S,6,1).getTimezoneOffset();var N=Math.max(I,S);($(),Z)[u>>>2>>>0]=60*N,($(),R)[p>>>2>>>0]=+(I!=S),u=(p=B=>{var j=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(j/60)).padStart(2,"0")}${String(j%60).padStart(2,"0")}`})(I),p=p(S),S<I?(Rt(u,y,17),Rt(p,m,17)):(Rt(u,m,17),Rt(p,y,17))}var Db=()=>Date.now();function Ub(u,p,y){return y>>>=0,0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),u=Math.round(1e6*u),($(),ie)[y>>>3>>>0]=BigInt(u),0):28}var xi=[],Fo=(u,p)=>{xi.length=0;for(var y;y=($(),H)[u++>>>0];){var m=y!=105;p+=(m&=y!=112)&&p%8?4:0,xi.push(y==112?($(),Z)[p>>>2>>>0]:y==106?($(),ie)[p>>>3>>>0]:y==105?($(),R)[p>>>2>>>0]:($(),te)[p>>>3>>>0]),p+=m?8:4}return xi};function Lb(u,p,y){return u>>>=0,p=Fo(p>>>0,y>>>0),Ii[u](...p)}function Fb(u,p,y){return u>>>=0,p=Fo(p>>>0,y>>>0),Ii[u](...p)}var Wb=()=>{};function qb(u,p){return E(Ne(u>>>0,p>>>0))}var Vb=()=>{throw Ce+=1,"unwind"};function Hb(){return 4294901760}var Gb=()=>navigator.hardwareConcurrency,Kt={},mr=u=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+p[1]:0},Wo=u=>{for(var p of u)(u=mr(p))&&(Kt[u]=p)};function jb(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),Wo(u),Kt.gd=mr(u[3]),Kt.Jd=u,Kt.gd}function gr(u){if(!(u=Kt[u>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(u))u=p[1];else{if(!(p=/^(.+?)@/.exec(u)))return 0;u=p[1]}wt(gr.hd??0),p=ur(u)+1;var y=Rn(p);return y&&Rt(u,y,p),gr.hd=y,gr.hd}function Kb(u){u>>>=0;var p=($(),H).length;if(u<=p||4294901760<u)return!1;for(var y=1;4>=y;y*=2){var m=p*(1+.2/y);m=Math.min(m,u+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(u,m)/65536))-Nt.buffer.byteLength+65535)/65536|0;try{Nt.grow(m),G();var S=1;break e}catch{}S=void 0}if(S)return!0}return!1}function Xb(u,p,y){if(u>>>=0,p>>>=0,Kt.gd==u)var m=Kt.Jd;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Wo(m);for(var S=3;m[S]&&mr(m[S])!=u;)++S;for(u=0;u<y&&m[u+S];++u)($(),R)[p+4*u>>>2>>>0]=mr(m[u+S]);return u}var vi,$i={},qo=()=>{var m;if(!vi){var u,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((m=globalThis.navigator)==null?void 0:m.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in $i)$i[u]===void 0?delete p[u]:p[u]=$i[u];var y=[];for(u in p)y.push(`${u}=${p[u]}`);vi=y}return vi};function Vo(u,p){if(i)return se(19,1,u,p);u>>>=0,p>>>=0;var y,m=0,S=0;for(y of qo()){var I=p+m;($(),Z)[u+S>>>2>>>0]=I,m+=Rt(y,I,1/0)+1,S+=4}return 0}function Ho(u,p){if(i)return se(20,1,u,p);u>>>=0,p>>>=0;var y=qo();for(var m of(($(),Z)[u>>>2>>>0]=y.length,u=0,y))u+=ur(m)+1;return($(),Z)[p>>>2>>>0]=u,0}function Go(u){return i?se(21,1,u):52}function jo(u,p,y,m){return i?se(22,1,u,p,y,m):52}function Ko(u,p,y,m){return i?se(23,1,u,p,y,m):70}var Yb=[null,[],[]];function Xo(u,p,y,m){if(i)return se(24,1,u,p,y,m);p>>>=0,y>>>=0,m>>>=0;for(var S=0,I=0;I<y;I++){var N=($(),Z)[p>>>2>>>0],B=($(),Z)[p+4>>>2>>>0];p+=8;for(var j=0;j<B;j++){var Y=u,de=($(),H)[N+j>>>0],we=Yb[Y];de===0||de===10?((Y===1?k:E)(ho(we)),we.length=0):we.push(de)}S+=B}return($(),Z)[m>>>2>>>0]=S,0}function Zb(u){return u>>>0}i||(function(){for(var u=t.numThreads-1;u--;)ao();je.push(async()=>{var p=(async function(){if(!i)return Promise.all(At.map(io))})();Ye++,await p,--Ye==0&&Ke&&(p=Ke,Ke=null,p())})})(),i||(Nt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),G()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>he(),t.stackRestore=u=>pe(u),t.stackAlloc=u=>Ti(u),t.setValue=function(u,p,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":($(),U)[u>>>0]=p;break;case"i16":($(),F)[u>>>1>>>0]=p;break;case"i32":($(),R)[u>>>2>>>0]=p;break;case"i64":($(),ie)[u>>>3>>>0]=BigInt(p);break;case"float":($(),Q)[u>>>2>>>0]=p;break;case"double":($(),te)[u>>>3>>>0]=p;break;case"*":($(),Z)[u>>>2>>>0]=p;break;default:V(`invalid type for setValue: ${y}`)}},t.getValue=function(u,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return($(),U)[u>>>0];case"i16":return($(),F)[u>>>1>>>0];case"i32":return($(),R)[u>>>2>>>0];case"i64":return($(),ie)[u>>>3>>>0];case"float":return($(),Q)[u>>>2>>>0];case"double":return($(),te)[u>>>3>>>0];case"*":return($(),Z)[u>>>2>>>0];default:V(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Ne,t.stringToUTF8=Rt,t.lengthBytesUTF8=ur;var Yo,Zo,br,wt,Rn,Si,Qo,Jo,el,ki,tl,nl,fe,Pn,rl,pe,Ti,he,il,Ci,al,sl,ol,Ei,ll,ul,dl,cl,pl,hl,fl,ml,gl,bl,yl,wl,_l,xl,vl,$l,Sl,kl,Tl,Cl,El,Il,zl,Ml,Al,Nl,Rl,Pl,Ol,Bl,Dl,Ul,Ll,Fl,Wl,ql,Vl,Hl,Gl,kt,Qb=[Ze,sr,lo,fo,mo,go,bo,yo,wo,_o,xo,vo,$o,So,ko,To,Do,Uo,Lo,Vo,Ho,Go,jo,Ko,Xo],Ii={973212:(u,p,y,m,S)=>{if(t===void 0||!t.Xc)return 1;if((u=Ne(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.Xc.get(u)))return 2;if(p=Number(p>>>0),y=Number(y>>>0),m=Number(m>>>0),p+y>u.byteLength)return 3;try{let I=u.subarray(p,p+y);switch(S){case 0:($(),H).set(I,m>>>0);break;case 1:t.Qd?t.Qd(m,I):t.Id(m,I);break;default:return 4}return 0}catch{return 4}},974036:(u,p,y)=>{t.td(u,($(),H).subarray(p>>>0,p+y>>>0))},974100:()=>t.Wd(),974142:u=>{t.sd(u)},974179:()=>{t.Bd()},974210:()=>{t.Cd()},974239:()=>{t.Gd()},974264:u=>t.Ad(u),974297:u=>t.Ed(u),974329:(u,p,y)=>{t.ed(Number(u),Number(p),Number(y),!0)},974392:(u,p,y)=>{t.ed(Number(u),Number(p),Number(y))},974449:()=>typeof wasmOffsetConverter<"u",974506:u=>{t.$b("Abs",u,void 0)},974557:u=>{t.$b("Neg",u,void 0)},974608:u=>{t.$b("Floor",u,void 0)},974661:u=>{t.$b("Ceil",u,void 0)},974713:u=>{t.$b("Reciprocal",u,void 0)},974771:u=>{t.$b("Sqrt",u,void 0)},974823:u=>{t.$b("Exp",u,void 0)},974874:u=>{t.$b("Erf",u,void 0)},974925:u=>{t.$b("Sigmoid",u,void 0)},974980:(u,p,y)=>{t.$b("HardSigmoid",u,{alpha:p,beta:y})},975059:u=>{t.$b("Log",u,void 0)},975110:u=>{t.$b("Sin",u,void 0)},975161:u=>{t.$b("Cos",u,void 0)},975212:u=>{t.$b("Tan",u,void 0)},975263:u=>{t.$b("Asin",u,void 0)},975315:u=>{t.$b("Acos",u,void 0)},975367:u=>{t.$b("Atan",u,void 0)},975419:u=>{t.$b("Sinh",u,void 0)},975471:u=>{t.$b("Cosh",u,void 0)},975523:u=>{t.$b("Asinh",u,void 0)},975576:u=>{t.$b("Acosh",u,void 0)},975629:u=>{t.$b("Atanh",u,void 0)},975682:u=>{t.$b("Tanh",u,void 0)},975734:u=>{t.$b("Not",u,void 0)},975785:(u,p,y)=>{t.$b("Clip",u,{min:p,max:y})},975854:u=>{t.$b("Clip",u,void 0)},975906:(u,p)=>{t.$b("Elu",u,{alpha:p})},975964:u=>{t.$b("Gelu",u,void 0)},976016:u=>{t.$b("Relu",u,void 0)},976068:(u,p)=>{t.$b("LeakyRelu",u,{alpha:p})},976132:(u,p)=>{t.$b("ThresholdedRelu",u,{alpha:p})},976202:(u,p)=>{t.$b("Cast",u,{to:p})},976260:u=>{t.$b("Add",u,void 0)},976311:u=>{t.$b("Sub",u,void 0)},976362:u=>{t.$b("Mul",u,void 0)},976413:u=>{t.$b("Div",u,void 0)},976464:u=>{t.$b("Pow",u,void 0)},976515:u=>{t.$b("Equal",u,void 0)},976568:u=>{t.$b("Greater",u,void 0)},976623:u=>{t.$b("GreaterOrEqual",u,void 0)},976685:u=>{t.$b("Less",u,void 0)},976737:u=>{t.$b("LessOrEqual",u,void 0)},976796:(u,p,y,m,S)=>{t.$b("ReduceMean",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},976971:(u,p,y,m,S)=>{t.$b("ReduceMax",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},977145:(u,p,y,m,S)=>{t.$b("ReduceMin",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},977319:(u,p,y,m,S)=>{t.$b("ReduceProd",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},977494:(u,p,y,m,S)=>{t.$b("ReduceSum",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},977668:(u,p,y,m,S)=>{t.$b("ReduceL1",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},977841:(u,p,y,m,S)=>{t.$b("ReduceL2",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},978014:(u,p,y,m,S)=>{t.$b("ReduceLogSum",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},978191:(u,p,y,m,S)=>{t.$b("ReduceSumSquare",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},978371:(u,p,y,m,S)=>{t.$b("ReduceLogSumExp",u,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},978551:u=>{t.$b("Where",u,void 0)},978604:(u,p,y)=>{t.$b("Transpose",u,{perm:p?Array.from(($(),R).subarray(Number(p)>>>0,Number(y)>>>0)):[]})},978728:(u,p,y,m)=>{t.$b("DepthToSpace",u,{blocksize:p,mode:Ne(y),format:m?"NHWC":"NCHW"})},978861:(u,p,y,m)=>{t.$b("DepthToSpace",u,{blocksize:p,mode:Ne(y),format:m?"NHWC":"NCHW"})},978994:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee,Ot)=>{t.$b("ConvTranspose",u,{format:j?"NHWC":"NCHW",autoPad:p,dilations:[y],group:m,kernelShape:[S],pads:[I,N],strides:[B],wIsConst:()=>!!($(),U)[Y>>>0],outputPadding:de?Array.from(($(),R).subarray(Number(de)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),R).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(Ot)})},979427:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee)=>{t.$b("ConvTranspose",u,{format:B?"NHWC":"NCHW",autoPad:p,dilations:Array.from(($(),R).subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:m,kernelShape:Array.from(($(),R).subarray(Number(S)>>>0,2+(Number(S)>>>0)>>>0)),pads:Array.from(($(),R).subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(($(),R).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),U)[j>>>0],outputPadding:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from(($(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},980088:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee,Ot)=>{t.$b("ConvTranspose",u,{format:j?"NHWC":"NCHW",autoPad:p,dilations:[y],group:m,kernelShape:[S],pads:[I,N],strides:[B],wIsConst:()=>!!($(),U)[Y>>>0],outputPadding:de?Array.from(($(),R).subarray(Number(de)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),R).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(Ot)})},980521:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee)=>{t.$b("ConvTranspose",u,{format:B?"NHWC":"NCHW",autoPad:p,dilations:Array.from(($(),R).subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:m,kernelShape:Array.from(($(),R).subarray(Number(S)>>>0,2+(Number(S)>>>0)>>>0)),pads:Array.from(($(),R).subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(($(),R).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),U)[j>>>0],outputPadding:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from(($(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},981182:(u,p)=>{t.$b("GlobalAveragePool",u,{format:p?"NHWC":"NCHW"})},981273:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee)=>{t.$b("AveragePool",u,{format:Ee?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),R).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},981752:(u,p)=>{t.$b("GlobalAveragePool",u,{format:p?"NHWC":"NCHW"})},981843:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee)=>{t.$b("AveragePool",u,{format:Ee?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),R).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982322:(u,p)=>{t.$b("GlobalMaxPool",u,{format:p?"NHWC":"NCHW"})},982409:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee)=>{t.$b("MaxPool",u,{format:Ee?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),R).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982884:(u,p)=>{t.$b("GlobalMaxPool",u,{format:p?"NHWC":"NCHW"})},982971:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee)=>{t.$b("MaxPool",u,{format:Ee?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),R).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},983446:(u,p,y,m,S)=>{t.$b("Gemm",u,{alpha:p,beta:y,transA:m,transB:S})},983550:u=>{t.$b("MatMul",u,void 0)},983604:(u,p,y,m)=>{t.$b("ArgMax",u,{keepDims:!!p,selectLastIndex:!!y,axis:m})},983712:(u,p,y,m)=>{t.$b("ArgMin",u,{keepDims:!!p,selectLastIndex:!!y,axis:m})},983820:(u,p)=>{t.$b("Softmax",u,{axis:p})},983883:(u,p)=>{t.$b("Concat",u,{axis:p})},983943:(u,p,y,m,S)=>{t.$b("Split",u,{axis:p,numOutputs:y,splitSizes:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},984099:u=>{t.$b("Expand",u,void 0)},984153:(u,p)=>{t.$b("Gather",u,{axis:Number(p)})},984224:(u,p)=>{t.$b("GatherElements",u,{axis:Number(p)})},984303:(u,p)=>{t.$b("GatherND",u,{batch_dims:Number(p)})},984382:(u,p,y,m,S,I,N,B,j,Y,de)=>{t.$b("Resize",u,{antialias:p,axes:y?Array.from(($(),R).subarray(Number(y)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ne(S),cubicCoeffA:I,excludeOutside:N,extrapolationValue:B,keepAspectRatioPolicy:Ne(j),mode:Ne(Y),nearestMode:Ne(de)})},984744:(u,p,y,m,S,I,N)=>{t.$b("Slice",u,{starts:p?Array.from(($(),R).subarray(Number(p)>>>0,Number(y)>>>0)):[],ends:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[],axes:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(N)>>>0)):[]})},985008:u=>{t.$b("Tile",u,void 0)},985060:(u,p,y)=>{t.$b("InstanceNormalization",u,{epsilon:p,format:y?"NHWC":"NCHW"})},985174:(u,p,y)=>{t.$b("InstanceNormalization",u,{epsilon:p,format:y?"NHWC":"NCHW"})},985288:u=>{t.$b("Range",u,void 0)},985341:(u,p)=>{t.$b("Einsum",u,{equation:Ne(p)})},985422:(u,p,y,m,S)=>{t.$b("Pad",u,{mode:p,value:y,pads:m?Array.from(($(),R).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},985565:(u,p,y,m,S,I)=>{t.$b("BatchNormalization",u,{epsilon:p,momentum:y,spatial:!!S,trainingMode:!!m,format:I?"NHWC":"NCHW"})},985734:(u,p,y,m,S,I)=>{t.$b("BatchNormalization",u,{epsilon:p,momentum:y,spatial:!!S,trainingMode:!!m,format:I?"NHWC":"NCHW"})},985903:(u,p,y)=>{t.$b("CumSum",u,{exclusive:Number(p),reverse:Number(y)})},986e3:(u,p,y)=>{t.$b("DequantizeLinear",u,{axis:p,blockSize:y})},986090:(u,p,y,m,S)=>{t.$b("GridSample",u,{align_corners:p,mode:Ne(y),padding_mode:Ne(m),format:S?"NHWC":"NCHW"})},986260:(u,p,y,m,S)=>{t.$b("GridSample",u,{align_corners:p,mode:Ne(y),padding_mode:Ne(m),format:S?"NHWC":"NCHW"})},986430:(u,p)=>{t.$b("ScatterND",u,{reduction:Ne(p)})},986515:(u,p,y,m,S,I,N,B,j)=>{t.$b("Attention",u,{numHeads:p,isUnidirectional:y,maskFilterValue:m,scale:S,doRotary:I,qkvHiddenSizes:N?Array.from(($(),R).subarray(Number(B)>>>0,Number(B)+N>>>0)):[],pastPresentShareBuffer:!!j})},986787:u=>{t.$b("BiasAdd",u,void 0)},986842:u=>{t.$b("BiasSplitGelu",u,void 0)},986903:u=>{t.$b("FastGelu",u,void 0)},986959:(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee,Ot,zi)=>{t.$b("Conv",u,{format:we?"NHWC":"NCHW",auto_pad:p,dilations:y?Array.from(($(),R).subarray(Number(y)>>>0,Number(m)>>>0)):[],group:S,kernel_shape:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(N)>>>0)):[],pads:B?Array.from(($(),R).subarray(Number(B)>>>0,Number(j)>>>0)):[],strides:Y?Array.from(($(),R).subarray(Number(Y)>>>0,Number(de)>>>0)):[],w_is_const:()=>!!($(),U)[Number(ke)>>>0],activation:Ne(Ee),activation_params:Ot?Array.from(($(),Q).subarray(Number(Ot)>>>0,Number(zi)>>>0)):[]})},987543:u=>{t.$b("Gelu",u,void 0)},987595:(u,p,y,m,S,I,N,B,j)=>{t.$b("GroupQueryAttention",u,{numHeads:p,kvNumHeads:y,scale:m,softcap:S,doRotary:I,rotaryInterleaved:N,smoothSoftmax:B,localWindowSize:j})},987812:(u,p,y,m)=>{t.$b("LayerNormalization",u,{axis:p,epsilon:y,simplified:!!m})},987923:(u,p,y,m)=>{t.$b("LayerNormalization",u,{axis:p,epsilon:y,simplified:!!m})},988034:(u,p,y,m,S,I)=>{t.$b("MatMulNBits",u,{k:p,n:y,accuracyLevel:m,bits:S,blockSize:I})},988161:(u,p,y,m,S,I)=>{t.$b("MultiHeadAttention",u,{numHeads:p,isUnidirectional:y,maskFilterValue:m,scale:S,doRotary:I})},988320:(u,p)=>{t.$b("QuickGelu",u,{alpha:p})},988384:(u,p,y,m,S)=>{t.$b("RotaryEmbedding",u,{interleaved:!!p,numHeads:y,rotaryEmbeddingDim:m,scale:S})},988523:(u,p,y)=>{t.$b("SkipLayerNormalization",u,{epsilon:p,simplified:!!y})},988625:(u,p,y)=>{t.$b("SkipLayerNormalization",u,{epsilon:p,simplified:!!y})},988727:(u,p,y,m)=>{t.$b("GatherBlockQuantized",u,{gatherAxis:p,quantizeAxis:y,blockSize:m})},988848:u=>{t.Fd(u)},988882:(u,p)=>t.Hd(Number(u),Number(p),t.Yc.Kd,t.Yc.errors)};function Jb(u,p,y){return No(async()=>{await t.Dd(Number(u),Number(p),Number(y))})}function ey(){return typeof wasmOffsetConverter<"u"}function ty(u,p,y,m){var S=he();try{return ml(u,p,y,m)}catch(I){if(pe(S),I!==I+0)throw I;fe(1,0)}}function ny(u,p,y){var m=he();try{return cl(u,p,y)}catch(S){if(pe(m),S!==S+0)throw S;fe(1,0)}}function ry(u){var p=he();try{ll(u)}catch(y){if(pe(p),y!==y+0)throw y;fe(1,0)}}function iy(u,p){var y=he();try{return Ei(u,p)}catch(m){if(pe(y),m!==m+0)throw m;fe(1,0)}}function ay(u,p,y){var m=he();try{ol(u,p,y)}catch(S){if(pe(m),S!==S+0)throw S;fe(1,0)}}function sy(u,p){var y=he();try{gl(u,p)}catch(m){if(pe(y),m!==m+0)throw m;fe(1,0)}}function oy(u,p,y,m,S,I,N){var B=he();try{return hl(u,p,y,m,S,I,N)}catch(j){if(pe(B),j!==j+0)throw j;fe(1,0)}}function ly(u,p,y,m,S,I){var N=he();try{ul(u,p,y,m,S,I)}catch(B){if(pe(N),B!==B+0)throw B;fe(1,0)}}function uy(u,p,y,m){var S=he();try{fl(u,p,y,m)}catch(I){if(pe(S),I!==I+0)throw I;fe(1,0)}}function dy(u,p,y,m,S){var I=he();try{dl(u,p,y,m,S)}catch(N){if(pe(I),N!==N+0)throw N;fe(1,0)}}function cy(u,p,y,m,S,I,N){var B=he();try{yl(u,p,y,m,S,I,N)}catch(j){if(pe(B),j!==j+0)throw j;fe(1,0)}}function py(u,p,y,m,S,I,N){var B=he();try{wl(u,p,y,m,S,I,N)}catch(j){if(pe(B),j!==j+0)throw j;fe(1,0)}}function hy(u,p,y,m,S,I,N,B){var j=he();try{$l(u,p,y,m,S,I,N,B)}catch(Y){if(pe(j),Y!==Y+0)throw Y;fe(1,0)}}function fy(u,p,y,m,S){var I=he();try{return bl(u,p,y,m,S)}catch(N){if(pe(I),N!==N+0)throw N;fe(1,0)}}function my(u,p,y){var m=he();try{return Sl(u,p,y)}catch(S){if(pe(m),S!==S+0)throw S;fe(1,0)}}function gy(u,p,y,m,S,I,N,B){var j=he();try{kl(u,p,y,m,S,I,N,B)}catch(Y){if(pe(j),Y!==Y+0)throw Y;fe(1,0)}}function by(u,p,y,m,S,I,N,B,j,Y,de,we){var ke=he();try{_l(u,p,y,m,S,I,N,B,j,Y,de,we)}catch(Ee){if(pe(ke),Ee!==Ee+0)throw Ee;fe(1,0)}}function yy(u,p,y,m,S,I){var N=he();try{return xl(u,p,y,m,S,I)}catch(B){if(pe(N),B!==B+0)throw B;fe(1,0)}}function wy(u,p,y){var m=he();try{return Tl(u,p,y)}catch(S){if(pe(m),S!==S+0)throw S;return fe(1,0),0n}}function _y(u,p,y,m,S,I,N,B,j){var Y=he();try{pl(u,p,y,m,S,I,N,B,j)}catch(de){if(pe(Y),de!==de+0)throw de;fe(1,0)}}function xy(u){var p=he();try{return Cl(u)}catch(y){if(pe(p),y!==y+0)throw y;fe(1,0)}}function vy(u,p){var y=he();try{return Wl(u,p)}catch(m){if(pe(y),m!==m+0)throw m;return fe(1,0),0n}}function $y(u){var p=he();try{return El(u)}catch(y){if(pe(p),y!==y+0)throw y;return fe(1,0),0n}}function Sy(u,p,y,m){var S=he();try{return Rl(u,p,y,m)}catch(I){if(pe(S),I!==I+0)throw I;fe(1,0)}}function ky(u,p,y,m,S){var I=he();try{return Pl(u,p,y,m,S)}catch(N){if(pe(I),N!==N+0)throw N;fe(1,0)}}function Ty(u,p,y,m,S,I){var N=he();try{return Ol(u,p,y,m,S,I)}catch(B){if(pe(N),B!==B+0)throw B;fe(1,0)}}function Cy(u,p,y,m,S,I){var N=he();try{return Bl(u,p,y,m,S,I)}catch(B){if(pe(N),B!==B+0)throw B;fe(1,0)}}function Ey(u,p,y,m,S,I,N,B){var j=he();try{return vl(u,p,y,m,S,I,N,B)}catch(Y){if(pe(j),Y!==Y+0)throw Y;fe(1,0)}}function Iy(u,p,y,m,S){var I=he();try{return Dl(u,p,y,m,S)}catch(N){if(pe(I),N!==N+0)throw N;return fe(1,0),0n}}function zy(u,p,y,m){var S=he();try{return Ul(u,p,y,m)}catch(I){if(pe(S),I!==I+0)throw I;fe(1,0)}}function My(u,p,y,m){var S=he();try{return Ll(u,p,y,m)}catch(I){if(pe(S),I!==I+0)throw I;fe(1,0)}}function Ay(u,p,y,m,S,I,N,B,j,Y,de,we){var ke=he();try{return Fl(u,p,y,m,S,I,N,B,j,Y,de,we)}catch(Ee){if(pe(ke),Ee!==Ee+0)throw Ee;fe(1,0)}}function Ny(u,p,y,m,S,I,N,B,j,Y,de){var we=he();try{Al(u,p,y,m,S,I,N,B,j,Y,de)}catch(ke){if(pe(we),ke!==ke+0)throw ke;fe(1,0)}}function Ry(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee,Ot,zi){var Dy=he();try{Nl(u,p,y,m,S,I,N,B,j,Y,de,we,ke,Ee,Ot,zi)}catch(Mi){if(pe(Dy),Mi!==Mi+0)throw Mi;fe(1,0)}}function Py(u,p,y){var m=he();try{return Il(u,p,y)}catch(S){if(pe(m),S!==S+0)throw S;fe(1,0)}}function Oy(u,p,y){var m=he();try{return zl(u,p,y)}catch(S){if(pe(m),S!==S+0)throw S;fe(1,0)}}function By(u,p,y,m){var S=he();try{Ml(u,p,y,m)}catch(I){if(pe(S),I!==I+0)throw I;fe(1,0)}}function yr(){if(0<Ye)Ke=yr;else if(i)_==null||_(t),X();else{for(var u=je;0<u.length;)u.shift()(t);0<Ye?Ke=yr:(t.calledRun=!0,M||(X(),_==null||_(t)))}}return i||(kt=await qe(),yr()),t.PTR_SIZE=4,L?t:new Promise((u,p)=>{_=u,T=p})}var Yh,su,B_=q(()=>{var e,t;Yh=au,su=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),su&&au()}),qi,Ka,ou,Qe,Zh,xr,lu,uu,Vi,du,Hi,Qh,Gi,Jh,$s=q(()=>{vs(),qi=typeof location>"u"?void 0:location.origin,Ka=import.meta.url>"file:"&&import.meta.url<"file;",ou=()=>{{if(Ka){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,qi).href}return import.meta.url}},Qe=ou(),Zh=()=>{if(Qe&&!Qe.startsWith("blob:"))return Qe.substring(0,Qe.lastIndexOf("/")+1)},xr=(e,t)=>{try{let n=t??Qe;return(n?new URL(e,n):new URL(e)).origin===qi}catch{return!1}},lu=(e,t)=>{let n=t??Qe;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},uu=(e,t)=>`${t??"./"}${e}`,Vi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},du=async e=>(await import(e)).default,Hi=(O_(),nr(jh)).default,Qh=async()=>{if(!Qe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(xr(Qe))return[void 0,Hi()];let e=await Vi(Qe);return[e,Hi(e)]},Gi=(B_(),nr(Xh)).default,Jh=async(e,t,n,r)=>{let i=Gi&&!(e||t);if(i)if(Qe)i=xr(Qe)||r&&!n;else if(r&&!n)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,Gi];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??lu(a,t),o=n&&s&&!xr(s,t),l=o?await Vi(s):s??uu(a,t);return[o?l:void 0,await du(l)]}}}),ji,vr,Un,Ki,cu,pu,hu,Ss,Te,hn=q(()=>{$s(),vr=!1,Un=!1,Ki=!1,cu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},pu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},hu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ss=async e=>{if(vr)return Promise.resolve();if(Un)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ki)throw new Error("previous call to 'initializeWebAssembly()' failed.");Un=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!hu())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!pu())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=cu();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,s=i==null?void 0:i.mjs,o=(s==null?void 0:s.href)??s,l=i==null?void 0:i.wasm,d=(l==null?void 0:l.href)??l,c=e.wasmBinary,[h,f]=await Jh(o,a,n>1,!!c||!!d),g=!1,w=[];if(t>0&&w.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},t)})),w.push(new Promise((_,T)=>{let v={numThreads:n};if(c)v.wasmBinary=c,v.locateFile=x=>x;else if(d||a)v.locateFile=x=>d??a+x;else if(o&&o.indexOf("blob:")!==0)v.locateFile=x=>new URL(x,o).href;else if(h){let x=Zh();x&&(v.locateFile=C=>x+C)}f(v).then(x=>{Un=!1,vr=!0,ji=x,_(),h&&URL.revokeObjectURL(h)},x=>{Un=!1,Ki=!0,T(x)})})),await Promise.race(w),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Te=()=>{if(vr&&ji)return ji;throw new Error("WebAssembly is not initialized yet.")}}),ht,Hr,$e,ks=q(()=>{hn(),ht=(e,t)=>{let n=Te(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},Hr=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([i,a])=>{let s=t?t+i:i;if(typeof a=="object")Hr(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},$e=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,r===4?"i32":"i64")),s=t.getValue(i+r,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),ef,D_=q(()=>{hn(),ks(),ef=e=>{let t=Te(),n=0,r=[],i=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(i.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=ht(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&$e("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Hr(e.extra,"",new WeakSet,(s,o)=>{let l=ht(s,r),d=ht(o,r);t._OrtAddRunConfigEntry(n,l,d)!==0&&$e(`Can't set a run config entry: ${s} - ${o}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),a}}}),fu,mu,gu,Xt,bu,tf,U_=q(()=>{hn(),ks(),fu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},mu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},gu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Xt=(e,t,n,r)=>{let i=ht(t,r),a=ht(n,r);Te()._OrtAddSessionConfigEntry(e,i,a)!==0&&$e(`Can't set a session config entry: ${t} - ${n}.`)},bu=async(e,t,n)=>{let r=t.executionProviders;for(let i of r){let a=typeof i=="string"?i:i.name,s=[];switch(a){case"webnn":if(a="WEBNN",Xt(e,"session.disable_quant_qdq","1",n),Xt(e,"session.disable_qdq_constant_folding","1",n),typeof i!="string"){let h=i==null?void 0:i.deviceType;h&&Xt(e,"deviceType",h,n)}break;case"webgpu":if(a="JS",typeof i!="string"){let h=i;if(h!=null&&h.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);Xt(e,"preferredLayout",h.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let o=ht(a,n),l=s.length,d=0,c=0;if(l>0){d=Te()._malloc(l*Te().PTR_SIZE),n.push(d),c=Te()._malloc(l*Te().PTR_SIZE),n.push(c);for(let h=0;h<l;h++)Te().setValue(d+h*Te().PTR_SIZE,s[h][0],"*"),Te().setValue(c+h*Te().PTR_SIZE,s[h][1],"*")}await Te()._OrtAppendExecutionProvider(e,o,d,c,l)!==0&&$e(`Can't append execution provider: ${a}.`)}},tf=async e=>{let t=Te(),n=0,r=[],i=e||{};gu(i);try{let a=fu(i.graphOptimizationLevel??"all"),s=mu(i.executionMode??"sequential"),o=typeof i.logId=="string"?ht(i.logId,r):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=i.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof i.optimizedModelFilePath=="string"?ht(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,s,!!i.enableProfiling,0,o,l,d,c),n===0&&$e("Can't create session options."),i.executionProviders&&await bu(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);Xt(n,"enableGraphCapture",i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[h,f]of Object.entries(i.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let g=ht(h,r);t._OrtAddFreeDimensionOverride(n,g,f)!==0&&$e(`Can't set a free dimension override: ${h} - ${f}.`)}return i.extra!==void 0&&Hr(i.extra,"",new WeakSet,(h,f)=>{Xt(n,h,f,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&$e("Can't release session options."),r.forEach(s=>t._free(s)),a}}}),tn,Ct,nn,si,Gr,Ts,Cs,Xa,ae=q(()=>{tn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ct=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},nn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return n>0?Math.ceil(r*n):void 0},si=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Gr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ts=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Cs=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Xa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Es,nf=q(()=>{vs(),Es=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(o){if(o instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let s=0;for(;;){let{done:o,value:l}=await i.read();if(o)break;let d=l.byteLength;new Uint8Array(a,s,d).set(l),s+=d}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),yu,wu,_u,xu,Is,vu,ye,It=q(()=>{ae(),yu=["V","I","W","E","F"],wu=(e,t)=>{console.log(`[${yu[e]},${new Date().toISOString()}]${t}`)},Is=(e,t)=>{_u=e,xu=t},vu=(e,t)=>{let n=Gr(e),r=Gr(_u);n>=r&&wu(n,typeof t=="function"?t():t)},ye=(...e)=>{xu&&vu(...e)}}),$u,$n,P,jr,rf,af,sf,le=q(()=>{$u=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},$n=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(n){if(r<2||i<2)return;let o=$u.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(o===void 0)return;[s[a-2],s[a-1]]=o}for(let o=n?3:1;o<=a;o++){let l=r-o<0?1:e[r-o],d=i-o<0?1:t[i-o];if(l!==d&&l>1&&d>1)return;let c=Math.max(l,d);if(l&&d)s[a-o]=Math.max(l,d);else{if(c>1)return;s[a-o]=0}}return s}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},P=class Pr{static size(t){return Pr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let i=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){i[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,n/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Pr.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Pr.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let i=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let i=n-3;i>=0;--i)r[i]=r[i+1]*t[i+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((i,a)=>i+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,i)=>r===n[i])}},jr=class Yn{static adjustPoolAttributes(t,n,r,i,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<n.length-2;o++)o>=r.length?r.push(n[o+2]):r[o]=n[o+2];for(let o=0;o<r.length;o++)if(o<i.length){if(i[o]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let o=0;o<r.length;o++)if(o<a.length){if(a[o]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let o=0;o<r.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<r.length;o++){if(r[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=r[o]||s[o+r.length]>=r[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,s,o){if(o){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)Yn.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],r[l],i[l],a,l,l+t.length-2,o)}}static computePoolOutputShape(t,n,r,i,a,s,o){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return Yn.computeShapeHelper(t,n,l,r,i,a,s,o),l}static computeConvOutputShape(t,n,r,i,a,s,o){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return Yn.computeShapeHelper(!1,t,l,r,i,a,s,o),l}static computeShapeHelper(t,n,r,i,a,s,o,l){if(t)for(let d=0;d<n.length-2;d++)r.push(1);else for(let d=0;d<n.length-2;d++)r.push(Yn.adjustPadAndReturnShape(n[d+2],i[d],a[d],s[d],o,d,d+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,i,a,s,o,l){let d=r*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[o]=0,Math.floor((t-d)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+i-t;return a[s]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),a[o]=c-a[s],Math.floor((t+c-i)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[o]-d)/n+1)}},rf=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,s,o;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(r?(o=n[0],l=1):(o=n[1],l=0),n[l]!==s)throw new Error("dimension mismatch");if(a<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(i&&!$n.isValidBroadcast(i,[a,o]))throw new Error("gemm: invalid bias shape for broadcast");return[a,o,s]}},af=-34028234663852886e22,sf=34028234663852886e22}),zs,of=q(()=>{ae(),zs=(e,t)=>new(si(t))(e)}),Xi,Ya,Yi,Su,Zi,ku,Qi,Ji,ea,Tu,lf,L_=q(()=>{ae(),It(),Xi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ya=(e,t)=>{if(t==="int32")return e;let n=Xi.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(si(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let s=new Int32Array(i);for(let o=0;o<i;o++){let l=a[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Yi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let i=BigInt64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(r,Number);return new Uint8Array(i.buffer)}case"uint8":{if(r.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(r,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Su=1,Zi=()=>Su++,ku=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Qi=(e,t)=>{let n=Xi.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,i)=>r*i)*n/8):0},Ji=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Qi(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=Yi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return n.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,i)=>r===n[i])}setIsDataConverted(e){this.isDataConverted=e}},ea=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!(a!=null&&a.input.dataTypes.includes(t))){if(s=ku.get(t),!s||(a==null?void 0:a.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);ye("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Qi(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,o,!0,!0,s),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Ya(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let r=(t=this.wrapper)!=null&&t.isDataConverted?Yi(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Tu=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Zi();return this.tensorTrackersById.set(e,new ea(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=Zi(),s=new Ji({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new ea(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,n,r,i,a,s){let o=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,n)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}`);let h=this.freeTensors.splice(d,1)[0];return h.sessionId=e,h}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}}`);let l=await o.createTensor({dataType:s??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new Ji({sessionId:e,context:o,tensor:l,dataType:t,shape:n,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},lf=(...e)=>new Tu(...e)}),Ln,Cu,uf,F_=q(()=>{ae(),hn(),of(),L_(),It(),Ln=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Cu=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((i,a)=>i===r[a]&&e[i]===t[i])},uf=class{constructor(e){this.tensorManager=lf(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Is(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>Cu(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(i=>i.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=Ln.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=Ln.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Te().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return zs(n,t)}}registerMLTensor(e,t,n,r){let i=Ln.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,r,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=a.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+n).buffer,c;switch(i.dataType){case"float32":c=new Float32Array(d);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":c=new Int32Array(d);break;case"uint32":c=new Uint32Array(d);break;case"int64":if(s){let h=Ya(new Uint8Array(d),"int64");c=new Int32Array(h.buffer),i.dataType="int32"}else c=new BigInt64Array(d);break;case"uint64":c=new BigUint64Array(d);break;case"int8":c=new Int8Array(d);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ye("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(i,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=Ln.get(tn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!(i!=null&&i.input.dataTypes.includes(r)):!!(i!=null&&i.output.dataTypes.includes(r))}flush(){}}}),Ms=q(()=>{}),ta,$r,Sr,Eu,Iu,na,Za,zu,df,W_=q(()=>{It(),Ms(),ta=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),$r=[],Sr=e=>Math.ceil(Number(e)/16)*16,Eu=e=>{for(let t=0;t<$r.length;t++){let n=$r[t];if(e<=n)return n}return Math.ceil(e/16)*16},Iu=1,na=()=>Iu++,Za=async(e,t,n,r)=>{let i=Sr(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let o=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(o,0,n)),l}else return new Uint8Array(o.slice(0,n))}finally{a.destroy()}},zu=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ta)$r.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=Sr(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,r,i)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),o.destroy(),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Sr(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=na();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Eu(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let o=(i?this.freeBuffers:this.freeUniformBuffers).get(n);o?o.length>0?r=o.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let s={id:na(),type:0,buffer:r};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await Za(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ta.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},df=(...e)=>new zu(...e)}),Mu,ve,Ae=q(()=>{Mu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new Mu(e)}),Sn,kr,Pe,We,ne,ze,Qa,xn,qt,ee,Fn,D,J,cf,As,Au,pf,ue=q(()=>{ae(),le(),Sn=64,kr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Pe=(e,t=1)=>{let n=kr(e,t);return typeof n=="string"?n:n[0]},We=(e,t=1)=>{let n=kr(e,t);return typeof n=="string"?n:n[1]},ne=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:P.computeStrides(n)})}),t},ze=e=>e%4===0?4:e%2===0?2:1,Qa=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,xn=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,qt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ee=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Fn=(e,t,n,r,i)=>{let a=typeof n=="number",s=a?n:n.length,o=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=kr(t,i),c=typeof d=="string"?d:d[1],h=typeof d=="string"?d:d[0],f={indices:l,value:c,storage:h,tensor:t},g=L=>typeof L=="string"?L:`${L}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=a?"uniforms.":"",T=`${_}${e}_shape`,v=`${_}${e}_strides`,x="";for(let L=0;L<s-1;L++)x+=`
    let dim${L} = current / ${ee(v,L,s)};
    let rest${L} = current % ${ee(v,L,s)};
    indices[${L}] = dim${L};
    current = rest${L};
    `;x+=`indices[${s-1}] = current;`;let C=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${x}
    return indices;
  }`,k=L=>(w.offsetToIndices=!0,s<2?L:`o2i_${e}(${L})`),E=[];if(s>=2)for(let L=s-1;L>=0;L--)E.push(`${ee(v,L,s)} * (indices[${L}])`);let M=s<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${E.join("+")};
  }`,A=L=>(w.indicesToOffset=!0,s<2?L:`i2o_${e}(${L})`),$=(...L)=>s===0?"0u":`${f.indices}(${L.map(g).join(",")})`,O=(L,G)=>s<2?`${L}`:`${ee(L,G,s)}`,U=(L,G,X)=>s<2?`${L}=${X};`:`${ee(L,G,s)}=${X};`,H={},F=(L,G)=>{w.broadcastedIndicesToOffset=!0;let X=`${G.name}broadcastedIndicesTo${e}Offset`;if(X in H)return`${X}(${L})`;let V=[];for(let _e=s-1;_e>=0;_e--){let qe=G.indicesGet("outputIndices",_e+G.rank-s);V.push(`${O(v,_e)} * (${qe} % ${O(T,_e)})`)}return H[X]=`fn ${X}(outputIndices: ${G.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${X}(${L})`},K=(L,G)=>(()=>{if(f.storage===f.value)return`${e}[${L}]=${G};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${L}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${L}]=vec2<u32>(u32(${G}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${L}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),R=L=>(()=>{if(f.storage===f.value)return`${e}[${L}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${L}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${L}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${L}] & 0xFFu), bool(${e}[${L}] & 0xFF00u), bool(${e}[${L}] & 0xFF0000u), bool(${e}[${L}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Z=s<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${c} {
    return ${R(`i2o_${e}(indices)`)};
  }`,Q=s<2?"":(()=>{let L=o.map(X=>`d${X}: u32`).join(", "),G=o.map(X=>`d${X}`).join(", ");return`
  fn get_${e}(${L}) -> ${c} {
    return get_${e}ByIndices(${$(G)});
  }`})(),te=(...L)=>{if(L.length!==s)throw new Error(`indices length must be ${s}`);let G=L.map(g).join(",");return s===0?R("0u"):s===1?R(G[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${G})`)},ie=L=>s<2?R(L):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${L})`),W=s<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${c}) {
    ${K(`i2o_${e}(indices)`,"value")}
  }`,re=s<2?"":(()=>{let L=o.map(X=>`d${X}: u32`).join(", "),G=o.map(X=>`d${X}`).join(", ");return`
  fn set_${e}(${L}, value: ${c}) {
    set_${e}ByIndices(${$(G)}, value);
  }`})();return{impl:()=>{let L=[],G=!1;return w.offsetToIndices&&(L.push(C),G=!0),w.indicesToOffset&&(L.push(M),G=!0),w.broadcastedIndicesToOffset&&(Object.values(H).forEach(X=>L.push(X)),G=!0),w.set&&(L.push(re),G=!0),w.setByIndices&&(L.push(W),G=!0),w.get&&(L.push(Q),G=!0),w.getByIndices&&(L.push(Z),G=!0),!a&&G&&L.unshift(`const ${T} = ${f.indices}(${n.join(",")});`,`const ${v} = ${f.indices}(${P.computeStrides(n).join(",")});`),L.join(`
`)},type:f,offsetToIndices:k,indicesToOffset:A,broadcastedIndicesToOffset:F,indices:$,indicesGet:O,indicesSet:U,set:(...L)=>{if(L.length!==s+1)throw new Error(`indices length must be ${s}`);let G=L[s];if(typeof G!="string")throw new Error("value must be string");let X=L.slice(0,s).map(g).join(",");return s===0?K("0u",G):s===1?K(X[0],G):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${X}, ${G})`)},setByOffset:K,setByIndices:(L,G)=>s<2?K(L,G):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${L}, ${G});`),get:te,getByOffset:R,getByIndices:ie,usage:r,name:e,strides:v,shape:T,rank:s}},D=(e,t,n,r=1)=>Fn(e,t,n,"input",r),J=(e,t,n,r=1)=>Fn(e,t,n,"output",r),cf=(e,t,n)=>Fn(e,t,n,"atomicOutput",1),As=(e,t,n,r=1)=>Fn(e,t,n,"internal",r),Au=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Sn){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let i=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},pf=(e,t)=>new Au(e,t)}),Nu,ra,Ru,Pu,Ou,Bu,nt,hf,ff,Ht=q(()=>{ae(),le(),Ae(),ue(),Nu=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ra=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Ru=(e,t)=>P.sortBasedOnPerm(e,ra(e.length,t)),Pu=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},Ou=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},Bu=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},nt=(e,t)=>{let n=e.dataType,r=e.dims.length,i=ra(r,t),a=Ru(e.dims,i),s=e.dims,o=a,l=r<2||Bu(i,e.dims),d;if(l)return d=w=>{let _=D("input",n,s,4),T=J("output",n,o,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,T)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:d};let{newShape:c,newPerm:h}=Ou(e.dims,i),f=P.areEqual(h,[2,3,1]),g=P.areEqual(h,[3,1,2]);if(c.length===2||f||g){s=f?[c[0],c[1]*c[2]]:g?[c[0]*c[1],c[2]]:c,o=[s[1],s[0]];let w=16;return d=_=>{let T=D("a",n,s.length),v=J("output",n,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${_.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/w),y:Math.ceil(o[0]/w)},programUniforms:[{type:12,data:_},...ne(s,o)]}},getShaderSource:d}}return d=w=>{let _=D("a",n,s.length),T=J("output",n,o.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(_,T)}

  ${Pu(i,r,_,T)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=P.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...ne(s,o)]}},getShaderSource:d}},hf=(e,t)=>{Nu(e.inputs,t.perm),e.compute(nt(e.inputs[0],t.perm))},ff=e=>ve({perm:e.perm})}),Du,Uu,Lu,Fu,Wu,qu,Vu,Hu,Gu,ju,lt,mf,gf,bf,yf,wf,_f,xf,vf,$f,Sf,q_=q(()=>{ae(),le(),ue(),Ns(),Ht(),Du={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Uu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Lu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Fu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Wu=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},qu=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let i=t.map(a=>e[a]);return[n,i]},Vu=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},Hu=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Gu=(e,t)=>{let n=[];if(!Hu(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},ju=(e,t,n,r,i,a,s)=>{let o=n[0].dims,l=P.size(a),d=P.size(s),c=D("_A",n[0].dataType,o),h=J("output",i,a),f=64;l===1&&(f=256);let g=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,w=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(c,h)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Lu[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${Du[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Uu[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${Fu[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},lt=(e,t,n,r)=>{let i=e.inputs.length===1?n:Ja(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((g,w)=>w));let s=P.normalizeAxes(a,e.inputs[0].dims.length),o=s,l=e.inputs[0],d=Gu(o,e.inputs[0].dims.length);d.length>0&&(l=e.compute(nt(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=Wu(o.length,l.dims.length));let[c,h]=qu(l.dims,o),f=c;i.keepDims&&(f=Vu(c,s)),e.compute(ju(t,i.cacheKey,[l],r,e.inputs[0].dataType,f,h),{inputs:[l]})},mf=(e,t)=>{lt(e,"ReduceMeanShared",t,"mean")},gf=(e,t)=>{lt(e,"ReduceL1Shared",t,"l1")},bf=(e,t)=>{lt(e,"ReduceL2Shared",t,"l2")},yf=(e,t)=>{lt(e,"ReduceLogSumExpShared",t,"logSumExp")},wf=(e,t)=>{lt(e,"ReduceMaxShared",t,"max")},_f=(e,t)=>{lt(e,"ReduceMinShared",t,"min")},xf=(e,t)=>{lt(e,"ReduceProdShared",t,"prod")},vf=(e,t)=>{lt(e,"ReduceSumShared",t,"sum")},$f=(e,t)=>{lt(e,"ReduceSumSquareShared",t,"sumSquare")},Sf=(e,t)=>{lt(e,"ReduceLogSumShared",t,"logSum")}}),ut,Ku,Kr,Ja,dt,Xu,Yu,Zu,Qu,Ju,ed,td,nd,rd,id,ct,kf,Tf,Cf,Ef,If,zf,Mf,Af,Nf,Rf,Ns=q(()=>{ae(),le(),Ae(),ue(),q_(),ut=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Ku=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Kr=(e,t,n,r,i,a,s=!1,o=!1)=>{let l=[],d=n[0].dims,c=d.length,h=P.normalizeAxes(i,c),f=!o&&h.length===0;d.forEach((_,T)=>{f||h.indexOf(T)>=0?s&&l.push(1):l.push(_)});let g=l.length,w=P.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let T=[],v=D("_A",n[0].dataType,c),x=J("output",a,g),C=r(v,x,h),k=C[2];for(let E=0,M=0;E<c;E++)f||h.indexOf(E)>=0?(s&&M++,k=`for(var j${E}: u32 = 0; j${E} < ${d[E]}; j${E}++) {
                  ${C[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${k}
                }`):(T.push(`${v.indicesSet("input_indices",E,x.indicesGet("output_indices",M))};`),M++);return`

        ${_.registerUniform("output_size","u32").declareVariables(v,x)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${k}
          ${C[3]}
          ${C.length===4?x.setByOffset("global_idx","value"):C.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...ne(d,l)]})}},Ja=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),ve({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},dt=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:Ja(i,n);e.compute(Kr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?Ku:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Xu=(e,t)=>{ut(e.inputs),dt(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Yu=(e,t)=>{ut(e.inputs),dt(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Zu=(e,t)=>{ut(e.inputs),dt(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Qu=(e,t)=>{ut(e.inputs),dt(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Ju=(e,t)=>{ut(e.inputs),dt(e,"ReduceMax",t,(n,r,i)=>{let a=[];for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},ed=(e,t)=>{ut(e.inputs),dt(e,"ReduceMean",t,(n,r,i)=>{let a=1;for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${a});`]})},td=(e,t)=>{ut(e.inputs),dt(e,"ReduceMin",t,(n,r,i)=>{let a=[];for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},nd=(e,t)=>{ut(e.inputs),dt(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},rd=(e,t)=>{ut(e.inputs),dt(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},id=(e,t)=>{ut(e.inputs),dt(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ct=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:i*=e[a];return i<32&&r>1024},kf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ed(e,t):mf(e,t)},Tf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yu(e,t):gf(e,t)},Cf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zu(e,t):bf(e,t)},Ef=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qu(e,t):yf(e,t)},If=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ju(e,t):wf(e,t)},zf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?td(e,t):_f(e,t)},Mf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nd(e,t):xf(e,t)},Af=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rd(e,t):vf(e,t)},Nf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?id(e,t):$f(e,t)},Rf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xu(e,t):Sf(e,t)}}),ia,Pf,Of,es,V_=q(()=>{ae(),Ae(),Ns(),ia=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Pf=(e,t)=>{ia(e.inputs);let n=(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(Kr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Of=(e,t)=>{ia(e.inputs);let n=(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(Kr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},es=e=>ve(e)}),ad,Tr,sd,od,ld,rr,ud,Bf,Rs=q(()=>{ae(),le(),Ms(),ue(),ad=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],d=n.dims[1],c=n.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=i.dims[0]/3,f=h,g=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let C of t.qkvHiddenSizes)if(C%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let w=d;if(h!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==h+f+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(s){if(f!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=s.dims[3])}let T=w+_,v=-1,x=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:_,kvSequenceLength:w,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:h,vHiddenSize:g,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Tr=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,sd=(e,t,n,r,i,a,s,o)=>{let l=ze(s?1:a),d=64,c=a/l;c<d&&(d=32);let h=Math.ceil(a/l/d),f=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:c},{type:12,data:h}],g=Pe(e.dataType,l),w=We(1,l),_=["type"];s&&_.push("type"),o&&_.push("type");let T=v=>{let x=J("x",e.dataType,e.dims,l),C=[x],k=s?D("seq_lens",s.dataType,s.dims):void 0;k&&C.push(k);let E=o?D("total_sequence_length_input",o.dataType,o.dims):void 0;E&&C.push(E);let M=We(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(A).declareVariables(...C)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Tr(k,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${w}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${w}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${w}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${w}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${M}(1.0) / ${M}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${w}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${M}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${g};${l}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:f})}},od=(e,t,n,r,i,a,s,o,l)=>{let d=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,d],h=e>1&&r,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,g=h?[a.batchSize,f,d,a.headSize]:void 0,w=a.nReps?a.nReps:1,_=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=ze(a.headSize),v=a.headSize/T,x=12,C={x:Math.ceil(d/x),y:Math.ceil(a.sequenceLength/x),z:a.batchSize*a.numHeads},k=[{type:12,data:a.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:_},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:w}],E=h&&r&&P.size(r.dims)>0,M=["type","type"];E&&M.push("type"),i&&M.push("type"),o&&M.push("type"),l&&M.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];h&&A.push({dims:g,dataType:t.dataType,gpuDataType:0});let $=O=>{let U=D("q",t.dataType,t.dims,T),H=D("key",n.dataType,n.dims,T),F=[U,H];if(E){let W=D("past_key",r.dataType,r.dims,T);F.push(W)}i&&F.push(D("attention_bias",i.dataType,i.dims));let K=o?D("seq_lens",o.dataType,o.dims):void 0;K&&F.push(K);let R=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;R&&F.push(R);let Z=J("output",t.dataType,c),Q=[Z];h&&Q.push(J("present_key",t.dataType,g,T));let te=We(1,T),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${U.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${U.type.storage}, ${x*x}>;
  ${O.registerUniforms(ie).declareVariables(...F,...Q)}
  ${O.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${w===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${w===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Tr(K,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${te}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${te}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${Z.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${i!==void 0};${r!==void 0};${e}`,inputDependencies:M},getRunData:()=>({outputs:A,dispatchGroup:C,programUniforms:k}),getShaderSource:$}},ld=(e,t,n,r,i,a,s=void 0,o=void 0)=>{let l=a+i.kvSequenceLength,d=i.nReps?i.nReps:1,c=i.vHiddenSize*d,h=e>1&&r,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=h?[i.batchSize,f,l,i.headSize]:void 0,w=[i.batchSize,i.sequenceLength,c],_=12,T={x:Math.ceil(i.vHeadSize/_),y:Math.ceil(i.sequenceLength/_),z:i.batchSize*i.numHeads},v=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:d}],x=h&&r&&P.size(r.dims)>0,C=["type","type"];x&&C.push("type"),s&&C.push("type"),o&&C.push("type");let k=[{dims:w,dataType:t.dataType,gpuDataType:0}];h&&k.push({dims:g,dataType:t.dataType,gpuDataType:0});let E=M=>{let A=D("probs",t.dataType,t.dims),$=D("v",n.dataType,n.dims),O=[A,$];x&&O.push(D("past_value",r.dataType,r.dims));let U=s?D("seq_lens",s.dataType,s.dims):void 0;s&&O.push(U);let H=o?D("total_sequence_length_input",o.dataType,o.dims):void 0;o&&O.push(H);let F=[J("output",t.dataType,w)];h&&F.push(J("present_value",t.dataType,g));let K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${A.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${A.type.value}, ${_*_}>;
  ${M.registerUniforms(K).declareVariables(...O,...F)}
  ${M.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Tr(U,H,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:k,dispatchGroup:T,programUniforms:v}),getShaderSource:E}},rr=(e,t,n,r,i,a,s,o,l,d,c=void 0,h=void 0)=>{let f=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),g=f>1?s:void 0,w=f>1?o:void 0,_=f>1?d.pastSequenceLength:0,T=_+d.kvSequenceLength,v=l&&P.size(l.dims)>0?l:void 0,x=[t,n];g&&P.size(g.dims)>0&&x.push(g),v&&x.push(v),c&&x.push(c),h&&x.push(h);let C=e.compute(od(f,t,n,g,v,d,_,c,h),{inputs:x,outputs:f>1?[-1,1]:[-1]})[0];e.compute(sd(C,d.batchSize,d.numHeads,_,d.sequenceLength,T,c,h),{inputs:c&&h?[C,c,h]:[C],outputs:[]});let k=[C,r];w&&P.size(w.dims)>0&&k.push(w),c&&k.push(c),h&&k.push(h),e.compute(ld(f,C,r,w,d,_,c,h),{inputs:k,outputs:f>1?[0,2]:[0]})},ud=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=h=>{let f=J("output_q",l[0].dataType,n),g=J("output_k",l[0].dataType,n),w=J("output_v",l[0].dataType,n),_=D("input",l[0].dataType,l[0].dims),T=D("weight",l[1].dataType,l[1].dims),v=D("bias",l[2].dataType,l[2].dims),x=_.type.storage,C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${x}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${x}, ${s*s}>;
  var<workgroup> tileWeightK: array<${x}, ${s*s}>;
  var<workgroup> tileWeightV: array<${x}, ${s*s}>;
  ${h.registerUniforms(C).declareVariables(_,T,v,f,g,w)}
  ${h.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${x}(0);
    var valueK = ${x}(0);
    var valueV = ${x}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},Bf=(e,t)=>{let n=ad(e.inputs,t),[r,i,a]=ud(e,n);return rr(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),dd,cd,pd,Df,H_=q(()=>{at(),ae(),le(),Ae(),ue(),dd=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,i,a)=>{let s=i.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);i.forEach((o,l)=>{if(o!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},cd=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,s=r?ze(a[a.length-1]):1,o=i==="NHWC"&&a.length>1?s:1,l=P.size(a)/s,d=r,c=d?a.length:a,h=D("x",e[0].dataType,e[0].dims,s),f=D("scale",e[1].dataType,e[1].dims,o),g=D("bias",e[2].dataType,e[2].dims,o),w=D("inputMean",e[3].dataType,e[3].dims,o),_=D("inputVar",e[4].dataType,e[4].dims,o),T=J("y",e[0].dataType,c,s),v=()=>{let C="";if(r)C=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(i==="NCHW")C=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{C=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let k=1;k<f.rank;k++)C+=`cIndices[${k}] = outputIndices[${k}];`;C+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return C},x=C=>`
  const epsilon = ${n};
  ${C.registerUniform("outputSize","u32").declareVariables(h,f,g,w,_,T)}
  ${C.mainStart()}
  ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...ne(a)]:[{type:12,data:l}]})}},pd=e=>ve(e),Df=(e,t)=>{let{inputs:n,outputCount:r}=e,i=pd({...t,outputCount:r});if(Se.webgpu.validateInputContent&&dd(n,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(cd(n,i))}}),hd,fd,Uf,G_=q(()=>{le(),ue(),hd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},fd=e=>{let t=e[0].dims,n=e[0].dims[2],r=P.size(t)/4,i=e[0].dataType,a=D("input",i,t,4),s=D("bias",i,[n],4),o=D("residual",i,t,4),l=J("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(a,s,o,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Uf=e=>{hd(e.inputs),e.compute(fd(e.inputs))}}),md,xe,Lf,Ff,Wf,qf,Vf,Hf,Gf,jf,Kf,gd,Xf,Yf,Zf,Qf,Zn,Jf,Or,em,tm,nm,rm,im,am,sm,om,lm,um,dm,cm,pm,hm,fm,mm,aa,gm,ts,ns,bm,ym,wm,bd,yd,_m,Ps=q(()=>{ae(),le(),Ae(),ue(),md=(e,t,n,r,i,a,s)=>{let o=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let d=D("inputData",n,[o],4),c=J("outputData",r,[o],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(d,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},xe=(e,t,n,r,i,a=e.dataType,s,o)=>{let l=[{type:12,data:Math.ceil(P.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:d=>md(d,P.size(e.dims),e.dataType,a,n,r,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(P.size(d[0].dims)/64/4)},programUniforms:l})}},Lf=e=>{e.compute(xe(e.inputs[0],"Abs","abs"))},Ff=e=>{e.compute(xe(e.inputs[0],"Acos","acos"))},Wf=e=>{e.compute(xe(e.inputs[0],"Acosh","acosh"))},qf=e=>{e.compute(xe(e.inputs[0],"Asin","asin"))},Vf=e=>{e.compute(xe(e.inputs[0],"Asinh","asinh"))},Hf=e=>{e.compute(xe(e.inputs[0],"Atan","atan"))},Gf=e=>{e.compute(xe(e.inputs[0],"Atanh","atanh"))},jf=e=>ve(e),Kf=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(xe(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},gd=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ve({min:t,max:n})},Xf=(e,t)=>{let n=t||gd(e.inputs),r=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Yf=e=>{e.compute(xe(e.inputs[0],"Ceil","ceil"))},Zf=e=>{e.compute(xe(e.inputs[0],"Cos","cos"))},Qf=e=>{e.compute(xe(e.inputs[0],"Cosh","cosh"))},Zn=e=>ve(e),Jf=(e,t)=>{let n=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Or=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,em=e=>{let t=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Or(t)))},tm=e=>{e.compute(xe(e.inputs[0],"Exp","exp"))},nm=e=>{e.compute(xe(e.inputs[0],"Floor","floor"))},rm=e=>{let t=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Or(t)))},im=(e,t)=>{let n=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},am=e=>{e.compute(xe(e.inputs[0],"Not",t=>`!${t}`))},sm=e=>{e.compute(xe(e.inputs[0],"Neg",t=>`-${t}`))},om=e=>{e.compute(xe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},lm=e=>{let t=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},um=e=>{e.compute(xe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},dm=e=>ve(e),cm=(e,t)=>{let n=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},pm=e=>{e.compute(xe(e.inputs[0],"Sin","sin"))},hm=e=>{e.compute(xe(e.inputs[0],"Sinh","sinh"))},fm=e=>{e.compute(xe(e.inputs[0],"Sqrt","sqrt"))},mm=e=>{e.compute(xe(e.inputs[0],"Tan","tan"))},aa=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,gm=e=>{e.compute(xe(e.inputs[0],"Tanh",aa))},ts=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${aa("v")};
}
`,ns=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,bm=e=>{let t=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"FastGelu",ns,ts(t),void 0,e.inputs[0].dataType))},ym=(e,t)=>{let n=We(e.inputs[0].dataType);return e.compute(xe(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},wm=e=>{e.compute(xe(e.inputs[0],"Log","log"))},bd=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,yd=e=>`quick_gelu_impl(${e})`,_m=(e,t)=>{let n=We(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"QuickGelu",yd,bd(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),wd,_d,xm,j_=q(()=>{le(),ue(),Ps(),wd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},_d=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=D("input",e[0].dataType,e[0].dims,4),r=D("bias",e[0].dataType,[e[0].dims[2]],4),i=J("output",e[0].dataType,t,4),a=P.size(t)/4,s=Pe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(n,r,i)}

  ${Or(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},xm=e=>{wd(e.inputs),e.compute(_d(e.inputs))}}),xd,vd,pt,vm,$m,Sm,km,Tm,Cm,Em,Im,zm,Mm,K_=q(()=>{ae(),le(),ue(),xd=(e,t,n,r,i,a,s,o,l,d,c,h)=>{let f,g;typeof o=="string"?f=g=(x,C)=>`${o}((${x}),(${C}))`:typeof o=="function"?f=g=o:(f=o.scalar,g=o.vector);let w=J("outputData",c,r.length,4),_=D("aData",l,t.length,4),T=D("bData",d,n.length,4),v;if(i)if(a){let x=P.size(t)===1,C=P.size(n)===1,k=t.length>0&&t[t.length-1]%4===0,E=n.length>0&&n[n.length-1]%4===0;x||C?v=w.setByOffset("global_idx",g(x?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),C?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",g(s||k?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=w.setByOffset("global_idx",g(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(C,k,E="")=>{let M=`aData[indexA${k}][componentA${k}]`,A=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${w.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${_.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
            let offsetB${k} = ${T.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${C}[${k}] = ${E}(${f(M,A)});
          `};c===9?v=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,T,w)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},vd=(e,t,n,r,i,a,s=n.dataType)=>{let o=n.dims.map(Number),l=r.dims.map(Number),d=!P.areEqual(o,l),c=o,h=P.size(o),f=!1,g=!1,w=[d];if(d){let _=$n.calcShape(o,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");c=_.slice(),h=P.size(c);let T=P.size(o)===1,v=P.size(l)===1,x=o.length>0&&o[o.length-1]%4===0,C=l.length>0&&l[l.length-1]%4===0;w.push(T),w.push(v),w.push(x),w.push(C);let k=1;for(let E=1;E<c.length;E++){let M=o[o.length-E],A=l[l.length-E];if(M===A)k*=M;else break}k%4===0?(g=!0,f=!0):(T||v||x||C)&&(f=!0)}else f=!0;return w.push(f),{name:e,shaderCache:{hint:t+w.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>xd(_,o,l,c,f,d,g,i,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(P.size(c)/4)},...ne(o,l,c)]})}},pt=(e,t,n,r,i,a)=>{e.compute(vd(t,i??"",e.inputs[0],e.inputs[1],n,r,a))},vm=e=>{pt(e,"Add",(t,n)=>`${t}+${n}`)},$m=e=>{pt(e,"Div",(t,n)=>`${t}/${n}`)},Sm=e=>{pt(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},km=e=>{pt(e,"Mul",(t,n)=>`${t}*${n}`)},Tm=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;pt(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Cm=e=>{pt(e,"Sub",(t,n)=>`${t}-${n}`)},Em=e=>{pt(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Im=e=>{pt(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},zm=e=>{pt(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Mm=e=>{pt(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),$d,Sd,kd,Td,Am,Nm,X_=q(()=>{ae(),le(),Ae(),ue(),$d=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],i=r.dataType,a=r.dims.length;e.forEach((s,o)=>{if(o!==n){if(s.dataType!==i)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,d)=>{if(d!==t&&l!==r.dims[d])throw new Error("non concat dimensions must match")})}})},Sd=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,kd=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset("global_idx",e[i].getByIndices("indices"));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},Td=(e,t,n,r)=>{let i=P.size(n),a=new Array(e.length),s=new Array(e.length),o=0,l=[],d=[],c=[{type:12,data:i}];for(let _=0;_<e.length;++_)o+=e[_].dims[t],a[_]=o,d.push(e[_].dims.length),s[_]=D(`input${_}`,r,d[_]),l.push("rank"),c.push({type:12,data:a[_]});for(let _=0;_<e.length;++_)c.push(...ne(e[_].dims));c.push(...ne(n));let h=J("output",r,n.length),f=h.indicesGet("indices",t),g=Array.from(Array(a.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),w=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...s,h)})()}

  ${Sd(a.length,g)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${g});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${kd(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:w}},Am=(e,t)=>{let n=e.inputs,r=n[0].dims,i=P.normalizeAxis(t.axis,r.length);$d(n,i);let a=r.slice();a[i]=n.reduce((o,l)=>o+(l.dims.length>i?l.dims[i]:0),0);let s=n.filter(o=>P.size(o.dims)>0);e.compute(Td(s,i,a,n[0].dataType),{inputs:s})},Nm=e=>ve({axis:e.axis})}),un,dn,cn,Os,fn=q(()=>{ae(),le(),un=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},dn=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},cn=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Os=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,r]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=(e==null?void 0:e.activation_params)||[af,sf];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Le,Rm,Bs=q(()=>{Le=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Rm=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Pm,Y_=q(()=>{Pm=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),er,Ds,Us=q(()=>{ae(),le(),ue(),fn(),er=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,o)=>`
      if (${ee(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,ee(i,o+a,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Ds=(e,t,n,r,i=!1,a)=>{let s=e[0].dims,o=e[1].dims,l=s[s.length-2],d=o[o.length-1],c=s[s.length-1],h=ze(d),f=ze(c),g=ze(l),w=P.size(n)/h/g,_=e.length>2,T=r?r.slice(0,-2):n.slice(0,-2),v=[P.size(T),l,d],x=[{type:12,data:w},{type:12,data:l},{type:12,data:d},{type:12,data:c}];dn(t,x),x.push(...ne(T,s,o)),_&&x.push(...ne(e[2].dims)),x.push(...ne(v));let C=k=>{let E=As("batch_dims",e[0].dataType,T.length),M=D("a",e[0].dataType,s.length,f),A=D("b",e[1].dataType,o.length,h),$=J("output",e[0].dataType,v.length,h),O=Pe($.type.tensor),U=un(t,$.type.value,O),H=[M,A],F="";if(_){let Z=i?h:1;H.push(D("bias",e[2].dataType,e[2].dims.length,Z)),F=`${i?`value += bias[col / ${Z}];`:`value += ${$.type.value}(bias[row + i]);`}`}let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];cn(t,K);let R=()=>{let Z=`var a_data: ${M.type.value};`;for(let Q=0;Q<f;Q++)Z+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${h}];`;for(let Q=0;Q<g;Q++){Z+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${f}];`;for(let te=0;te<f;te++)Z+=`
            values[${Q}] = fma(${A.type.value}(a_data${f===1?"":`[${te}]`}), b_data${te}, values[${Q}]);
`}return Z};return`
  ${k.registerUniforms(K).registerInternalVariables(E).declareVariables(...H,$)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${M.type.indices};
    ${er("a_indices",M,M.rank-2,E.rank,"batch_indices")}
    ${M.indicesSet("a_indices",M.rank-2,0)}
    ${M.indicesSet("a_indices",M.rank-1,0)}
    let a_offset = ${M.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${er("b_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${R()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${F}
      ${U}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${f};${g};${i}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:x}),getShaderSource:C}}}),Cd,Ed,rs,sa,Id,is,zd,Xr,Ls=q(()=>{ae(),le(),ue(),fn(),Us(),Bs(),Cd=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Ed=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,rs=(e,t,n="f32",r,i=!1,a=32,s=!1,o=32)=>{let l=t[1]*e[1],d=t[0]*e[0],c=i?l:a,h=i?a:l,f=c/t[0],g=a/t[1];if(!((i&&f===4&&e[1]===4||!i&&(f===3||f===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${n}>, ${c/f}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Cd(i,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Ed(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},sa=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Id=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",is=(e,t,n="f32",r,i=!1,a=32,s=!1,o=32,l=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],h=i?d:a,f=i?a:d;if(!(f%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let g=f/t[1],w=h/t[0],_=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${sa(i,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${w};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${w}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${sa(i,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Id(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${h}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${T}
  }
`},zd=(e,t,n,r,i=!1)=>{let[a,s,o,l]=r,d=Pe(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Le(e,d)} {
      var value = ${Le(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${er("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Le(e,d)} {
      var value = ${Le(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${er("bIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Le(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${Le(e,d)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Xr=(e,t,n,r,i=!1,a)=>{let s=e[0].dims,o=e[1].dims,l=s.slice(0,-2),d=o.slice(0,-2),c=r?r.slice(0,-2):n.slice(0,-2),h=P.size(c),f=s[s.length-2],g=s[s.length-1],w=o[o.length-1],_=g%4===0&&w%4===0,T=f<=8?[4,1,1]:[4,4,1],v=[8,8,1],x=[Math.ceil(w/v[0]/T[0]),Math.ceil(f/v[1]/T[1]),Math.ceil(h/v[2]/T[2])],C=_?4:1,k=[...l,f,g/C],E=k.length,M=[...d,g,w/C],A=M.length,$=[h,f,w/C],O=[{type:6,data:f},{type:6,data:w},{type:6,data:g}];dn(t,O),O.push(...ne(c,k,M));let U=["rank","rank"],H=e.length>2;H&&(O.push(...ne(e[2].dims)),U.push("rank")),O.push(...ne($));let F=K=>{let R=c.length,Z=As("batchDims",e[0].dataType,R,1),Q=Pe(e[0].dataType),te=D("a",e[0].dataType,E,C),ie=D("b",e[1].dataType,A,C),W=J("result",e[0].dataType,$.length,C),re=[te,ie];if(H){let _e=i?C:1;re.push(D("bias",e[2].dataType,e[2].dims.length,_e))}let L=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];cn(t,L);let G=Pe(W.type.tensor),X=un(t,W.type.value,G),V=zd(C,H,X,[Z,te,ie,W],i);return`
  ${K.registerUniforms(L).registerInternalVariables(Z).declareVariables(...re,W)}
  ${V}
  ${_?rs(T,v,Q,Z):is(T,v,Q,Z)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${_};${i}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:O}),getShaderSource:F}}}),Md,Om,Z_=q(()=>{ae(),It(),ue(),fn(),Bs(),Y_(),Ls(),Md=(e,t,n,r,i=!1,a,s=4,o=4,l=4,d="f32")=>{let c=O=>{switch(O){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},h=O=>{switch(O){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,w=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",v=e?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Le(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${_}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,C=e?t&&r?`
    let col = colIn * ${s};
    ${x}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${Le(s,d)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${x}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${Le(s,d)}(0.0);`,k=e?r&&n?h(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(o)}
    }
    return ${Le(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(o)}
    }
    return ${Le(o,d)}(0.0);`,E=Le(l,d),M=Le(e?s:o,d),A=Le(e?o:s,d),$=un(a,E,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${M} {
      ${e?C:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?k:C}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${Rm(i)}
      ${$}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Om=(e,t,n,r,i,a,s,o,l)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],h=n[0],f=d?n[2]:n[3],g=d?n[1]:n[2],w=d?n[3]:n[1],_=d&&(c%4===0||c%3===0)&&w%4===0,T=d?w:f*g,v=d?f*g:w,x=[8,8,1],C=r<=8?[4,1,1]:[4,4,1],k=[Math.ceil(T/x[0]/C[0]),Math.ceil(v/x[1]/C[1]),Math.ceil(h/x[2]/C[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let E=_?d&&c%4!==0?3:4:1,M=x[1]*C[1],A=x[0]*C[0],$=Math.max(x[0]*E,x[1]),O=r%M===0,U=i%A===0,H=a%$===0,F=_?[E,4,4]:[1,1,1],K=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];dn(t,K),K.push(...ne(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(K.push(...ne(e[2].dims)),R.push("rank")),K.push(...ne(n));let Z=Q=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];cn(t,te);let ie=_?4:1,W=Pe(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${W}>`:W}) {
        result[flatIndex] = ${_?`vec4<${W}>`:W}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${W}>`:W}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,L=D("x",e[0].dataType,e[0].dims.length,E===3?1:E),G=D("w",e[1].dataType,e[1].dims.length,ie),X=[L,G],V=J("result",e[0].dataType,n.length,ie);if(s){let _e=D("bias",e[2].dataType,e[2].dims.length,ie);X.push(_e),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${W}>`:W} {
          return bias[coords.${d?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Pm("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Q.registerUniforms(te).declareVariables(...X,V)}
        ${re}
        ${Md(d,O,U,H,s,t,F[0],F[1],F[2],W)}
        ${_?rs(C,x,W,void 0,!d,$):is(C,x,W,void 0,!d,$,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${_};${O};${U};${H};${M};${A};${$}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:K}),getShaderSource:Z}}}),Ad,oa,Wn,Nd,la,Rd,Bm,Dm,Q_=q(()=>{ae(),It(),le(),ue(),fn(),Bs(),Ad=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},oa=e=>typeof e=="number"?[e,e,e]:e,Wn=(e,t)=>t<=1?e:e+(e-1)*(t-1),Nd=(e,t,n,r=1)=>{let i=Wn(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},la=(e,t,n,r,i)=>{i==null&&(i=Nd(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*i>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*i)/r[s]+1));return a},Rd=(e,t,n,r,i,a,s,o,l,d)=>{let c,h,f,g;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=la([t,n,r,1],[o,l,d],1,[i,a,s],e);h=w[0],f=w[1],g=w[2]}else if(Array.isArray(e)){if(!e.every((_,T,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=la([t,n,r,1],[o,l,d],1,[i,a,s],e[0]);h=w[0],f=w[1],g=w[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/i),f=Math.ceil(n/a),g=Math.ceil(r/s);let w=(h-1)*i+o-t,_=(f-1)*a+l-n,T=(g-1)*s+d-r,v=Math.floor(w/2),x=w-v,C=Math.floor(_/2),k=_-C,E=Math.floor(T/2),M=T-E;c={top:C,bottom:k,left:E,right:M,front:v,back:x}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:h,outHeight:f,outWidth:g}},Bm=(e,t,n,r,i,a=!1,s="channelsLast")=>{let o,l,d,c,h;if(s==="channelsLast")[o,l,d,c,h]=e;else if(s==="channelsFirst")[o,h,l,d,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[f,,g,w,_]=t,[T,v,x]=oa(n),[C,k,E]=oa(r),M=Wn(g,C),A=Wn(w,k),$=Wn(_,E),{padInfo:O,outDepth:U,outHeight:H,outWidth:F}=Rd(i,l,d,c,T,v,x,M,A,$),K=a?f*h:f,R=[0,0,0,0,0];return s==="channelsFirst"?R=[o,K,U,H,F]:s==="channelsLast"&&(R=[o,U,H,F,K]),{batchSize:o,dataFormat:s,inDepth:l,inHeight:d,inWidth:c,inChannels:h,outDepth:U,outHeight:H,outWidth:F,outChannels:K,padInfo:O,strideDepth:T,strideHeight:v,strideWidth:x,filterDepth:g,filterHeight:w,filterWidth:_,effectiveFilterDepth:M,effectiveFilterHeight:A,effectiveFilterWidth:$,dilationDepth:C,dilationHeight:k,dilationWidth:E,inShape:e,outShape:R,filterShape:t}},Dm=(e,t,n,r,i,a)=>{let s=a==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],l={x:n.map((T,v)=>v)},d=[Math.ceil(Ad(l.x.map(T=>n[T]))/o[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let c=1,h=P.size(n),f=[{type:12,data:h},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];dn(t,f),f.push(...ne(e[0].dims,e[1].dims));let g=["rank","rank"],w=e.length===3;w&&(f.push(...ne(e[2].dims)),g.push("rank")),f.push(...ne(n));let _=T=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];cn(t,v);let x=1,C=Pe(e[0].dataType),k=D("x",e[0].dataType,e[0].dims.length,c),E=D("W",e[1].dataType,e[1].dims.length,x),M=[k,E],A=J("result",e[0].dataType,n.length,x),$="";if(w){let H=D("bias",e[2].dataType,e[2].dims.length,x);M.push(H),$+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${C} {
          return bias[${s?ee("coords",4,5):ee("coords",1,5)}];
        }`}let O=Le(c,C),U=un(t,O,C);return`
            ${$}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
          ${T.registerUniforms(v).declareVariables(...M,A)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${ee("coords",0,k.rank)};
              let d2 = ${s?ee("coords",k.rank-1,k.rank):ee("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${s?ee("coords",1,k.rank):ee("coords",2,k.rank)},
              ${s?ee("coords",2,k.rank):ee("coords",3,k.rank)},
              ${s?ee("coords",3,k.rank):ee("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?ee("uniforms.x_shape",1,k.rank):ee("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${s?ee("uniforms.x_shape",2,k.rank):ee("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${s?ee("uniforms.x_shape",3,k.rank):ee("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${s?ee("uniforms.x_shape",4,k.rank):ee("uniforms.x_shape",1,k.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${U}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${c};${w}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:f}),getShaderSource:_}}}),Um,Lm,J_=q(()=>{ae(),le(),ue(),fn(),Um=(e,t,n,r)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,l=t.format==="NHWC",d=l?n[3]:n[1],c=d/t.group,h=l&&c>=4?ze(d):1,f=P.size(n)/h,g=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];dn(t,g),g.push(...ne(s,[o[0],o[1],o[2],o[3]/h]));let w=i?["rank","rank","rank"]:["rank","rank"];g.push(...ne([n[0],n[1],n[2],n[3]/h]));let _=T=>{let v=J("output",e[0].dataType,n.length,h),x=Pe(v.type.tensor),C=un(t,v.type.value,x),k=D("x",e[0].dataType,s.length),E=D("w",e[1].dataType,o.length,h),M=[k,E];i&&M.push(D("b",e[2].dataType,e[2].dims,h));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];cn(t,A);let $=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(A).declareVariables(...M,v)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${$}
    ${a}
    ${C}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:_}},Lm=(e,t,n,r)=>{let i=e.length>2,a=ze(n[3]),s=ze(n[2]),o=P.size(n)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[n[0],n[1],n[2],n[3]/a],h=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];dn(t,h),h.push(...ne(l,d,c));let f=(s-1)*t.strides[1]+d[1],g=w=>{let _=J("output",e[0].dataType,c.length,a),T=Pe(_.type.tensor),v=un(t,_.type.value,T),x=D("x",e[0].dataType,l.length,a),C=D("w",e[1].dataType,d.length,a),k=[x,C];i&&k.push(D("b",e[2].dataType,e[2].dims,a));let E=i?"value += b[output_channel];":"",M=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return cn(t,M),`
  ${w.registerUniforms(M).declareVariables(...k,_)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${f}>;
    var values: array<${_.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${x.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${x.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${C.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${f};${d[0]};${d[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:h}),getShaderSource:g}}}),Pd,Cr,Od,Er,as,ua,Bd,Dd,ss,ex=q(()=>{le(),Z_(),Q_(),Ls(),J_(),fn(),Us(),Ht(),Pd=(e,t,n,r,i,a)=>{let s=e[0],o=e.slice(a?1:2,a?3:4),l=o.length,d=t[0],c=t.slice(2).map((f,g)=>f+(f-1)*(n[g]-1)),h=o.map((f,g)=>f+r[g]+r[g+l]).map((f,g)=>Math.floor((f-c[g]+i[g])/i[g]));return h.splice(0,0,s),h.splice(a?3:1,0,d),h},Cr=[2,3,1,0],Od=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Er=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();jr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},as=e=>{let t=Os(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,s=e.kernel_shape,o=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:s,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},ua=(e,t,n,r)=>{let i=n.format==="NHWC",a=Pd(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let M=[t[0]];if(i){let A=e.kernelCustomData.wT??e.compute(nt(t[1],Cr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),M.push(A)}else M.push(t[1]);t.length===3&&M.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Lm(M,n,a,r),{inputs:M}):e.compute(Um(M,n,a,r),{inputs:M});return}let s=t.length===3,o=t[0].dims[i?1:2],l=t[0].dims[i?2:3],d=t[0].dims[i?3:1],c=t[1].dims[2],h=t[1].dims[3],f=a[i?1:2],g=a[i?2:3],w=a[i?3:1],_=i&&c===o&&h===l&&n.pads[0]===0&&n.pads[1]===0;if(_||c===1&&h===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let M=a[0],A,$,O,U=[];if(i){let K=e.kernelCustomData.wT??e.compute(nt(t[1],Cr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=K),_){let R=o*l*d;A=t[0].reshape([1,M,R]),$=K.reshape([1,R,w]),O=[1,M,w]}else A=t[0].reshape([M,o*l,d]),$=K.reshape([1,d,w]),O=[M,f*g,w];U.push(A),U.push($)}else A=t[0].reshape([M,d,o*l]),$=t[1].reshape([1,w,d]),O=[M,w,f*g],U.push($),U.push(A);s&&U.push(t[2]);let H=O[2],F=U[0].dims[U[0].dims.length-1];H<8&&F<8?e.compute(Ds(U,n,a,O,i,r),{inputs:U}):e.compute(Xr(U,n,a,O,i,r),{inputs:U});return}let T=!0,v=e.kernelCustomData.wT??e.compute(nt(t[1],Cr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let x=[t[0],v];s&&x.push(t[2]);let C=i?f*g:w,k=i?w:f*g,E=c*h*d;e.compute(Om(x,n,a,C,k,E,s,T,r),{inputs:x})},Bd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=Er({...t,pads:i,strides:a,dilations:s,kernelShape:o},r);ua(e,r,l,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Dd=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",i=Er(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Bm(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Dm(t,i,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},ss=(e,t)=>{if(Od(e.inputs,t),e.inputs[0].dims.length===3)Bd(e,t);else if(e.inputs[0].dims.length===5)Dd(e,e.inputs,t);else{let n=Er(t,e.inputs);ua(e,e.inputs,n)}}}),Fm,tx=q(()=>{ae(),It(),le(),ue(),Fm=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format==="NHWC",s=t.group,o=e[1].dims,l=o[2]/s,d=o[3],c=a?ze(l):1,h=a&&d===1&&l>=4,f=h?Math.floor(l/4)*4:Math.floor(l/c)*c,g=l-f,w=a?ze(d):1,_=a?d===1?c:w:1,T=P.size(i)/w,v=[Math.ceil(T/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let x=["rank","rank"],C=[t.strides[0],t.strides[1]],k=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],E=[t.dilations[0],t.dilations[1]],M=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[M[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),M[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:T},{type:12,data:C},{type:12,data:k},{type:12,data:E},{type:12,data:M},{type:6,data:A},{type:12,data:f},{type:12,data:l},{type:12,data:d},...ne(e[0].dims,e[1].dims)];r&&($.push(...ne(e[2].dims)),x.push("rank")),$.push(...ne(i));let O=U=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:C.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:M.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=Pe(e[0].dataType),K=a?1:2,R=a?2:3,Z=a?3:1,Q=D("W",e[1].dataType,e[1].dims.length,_),te=D("Dy",e[0].dataType,e[0].dims.length,c),ie=[te,Q];r&&ie.push(D("bias",e[2].dataType,[i[Z]].length,w));let W=J("result",e[0].dataType,i.length,w),re=()=>{let X="";if(h)c===4?X+=`
        let xValue = ${te.getByOffset("x_offset")};
        let wValue = ${Q.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?X+=`
          dotProd = dotProd + dot(vec4<${F}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}), vec4<${F}>(${Q.getByOffset("w_offset")}, ${Q.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(X+=`
          dotProd = dotProd + dot(vec4<${F}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}, ${te.getByOffset("x_offset + 2u")}, ${te.getByOffset("x_offset + 3u")}), vec4<${F}>(${Q.getByOffset("w_offset")}, ${Q.getByOffset("w_offset + 1u")}, ${Q.getByOffset("w_offset + 2u")}, ${Q.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(X+=`
                  let xValue = ${a?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):te.get("batch","inputChannel","idyR","idyC")};
        `,c===1)X+=`
          let w_offset = ${Q.indicesToOffset(`${Q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Q.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<c;V++)X+=`
            let wValue${V} = ${Q.getByOffset(`${Q.indicesToOffset(`${Q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return X},L=()=>{if(g===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let X="";if(c===1){X+="dotProd = dotProd";for(let V=0;V<g;V++)X+=`
            + ${te.getByOffset(`x_offset + ${V}`)} * ${Q.getByOffset(`w_offset + ${V}`)}`;X+=";"}else if(c===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);X+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${Q.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return X},G=`
            let outputIndices = ${W.offsetToIndices(`global_idx * ${w}`)};
            let batch = ${W.indicesGet("outputIndices",0)};
            let d1 = ${W.indicesGet("outputIndices",Z)};
            let r = ${W.indicesGet("outputIndices",K)};
            let c = ${W.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${W.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${F}(dyRCorner) + ${F}(wR)) / ${F}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${F}(uniforms.Dy_shape[${K}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${F}(dyCCorner) + ${F}(wC)) / ${F}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${Q.indicesToOffset(`${Q.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:c}) {
                  ${re()}
                  inputChannel = inputChannel + ${h?4:c};
                }
                ${L()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${w}]`:""};
            ${W.setByOffset("global_idx","value")};
          `;return`
    ${U.registerUniforms(H).declareVariables(...ie,W)}
      ${U.mainStart()}
      ${U.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${G}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${_}${w}${h}${g}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:O}}}),Ud,Ld,Fd,da,Wm,Wd,ca,qd,qm,nx=q(()=>{tx(),fn(),Ht(),Ud=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,Ld=(e,t,n,r,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[i]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[i]=a)},Fd=(e,t,n,r,i,a,s,o,l,d)=>{let c=e.length-2,h=d.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let f=e[0],g=t[o?3:1]*i;for(let w=0,_=e.length-c-(o?1:0);w<c;++w,++_){let T=e[_],v=h?T*s[w]:d[w],x=Ud(T,s[w],a[w],t[_],n[w],v);Ld(x,r,a,w,w+c),h&&d.push(s[w]*(T-1)+l[w]+(t[_]-1)*n[w]+1-a[w]-a[w+c])}d.splice(0,0,f),d.splice(o?3:1,0,g)},da=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,f)=>h*f,1)===0){n.length=0;for(let h=2;h<t[1].dims.length;++h)n.push(t[1].dims[h])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((h,f)=>h+f,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let d=e.strides.slice();if(d.reduce((h,f)=>h+f,0)===0){let h=t[0].dims.length-2;d=new Array(h).fill(1)}Fd(o,n,l,e.autoPad,e.group,i,d,r,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:n,pads:i,outputPadding:s,outputShape:a,dilations:l,strides:d}),c},Wm=e=>{let t=Os(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group??1,s=e.kernelShape,o=e.pads,l=e.strides,d=e.wIsConst(),c=e.outputPadding,h=e.outputShape;return{autoPad:r,format:n,dilations:i,group:a,kernelShape:s,outputPadding:c,outputShape:h,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Wd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ca=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(nt(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(Fm(a,n,r),{inputs:a})},qd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),a=[1].concat(a),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let d=da({...t,pads:o,strides:s,dilations:a,kernelShape:i,outputPadding:l},r);ca(e,r,d,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},qm=(e,t)=>{if(Wd(e.inputs,t),e.inputs[0].dims.length===3)qd(e,t);else{let n=da(t,e.inputs);ca(e,e.inputs,n)}}}),Vd,Vm,Hm,rx=q(()=>{ae(),le(),Ae(),ue(),Vd=(e,t,n,r)=>{let i=P.size(t),a=t.length,s=D("input",e,a),o=J("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=P.normalizeAxis(l,a),c=h=>{let f=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,g=ee("uniforms.input_shape","uniforms.axis",a),w=r.reverse?f+(r.exclusive?" + 1":""):"0",_=r.reverse?g:f+(r.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:d},...ne(t,t)]}),getShaderSource:c}},Vm=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(Vd(r,n,i,t),{inputs:[0]})},Hm=e=>{let t=e.exclusive===1,n=e.reverse===1;return ve({exclusive:t,reverse:n})}}),Hd,Gd,jd,Gm,jm,ix=q(()=>{ae(),le(),Ae(),ue(),Hd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Gd=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)i.push(n.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},jd=(e,t)=>{let n,r,i,a,s,o,l=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";l?([n,r,i,a]=e.dims,s=c?[n,r,i,d,d,a/d**2]:[n,r,i,a/d**2,d,d],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[n,d,d,a/d**2,r,i]:[n,a/d**2,d,d,r,i],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),f=h.dims.length,g=e.dataType,w=D("a",g,f),_=J("output",g,f),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(w,_)}

  ${Gd(o,f,w,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let x=l?[n,r*d,i*d,a/d**2]:[n,a/d**2,r*d,i*d],C=P.size(x),k=h.dims,E=P.sortBasedOnPerm(k,o);return{outputs:[{dims:x,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(C/64)},programUniforms:[{type:12,data:C},...ne(k,E)]}},getShaderSource:T}},Gm=(e,t)=>{Hd(e.inputs),e.compute(jd(e.inputs[0],t))},jm=e=>ve({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Ir,qn,pa,Kd,Xd,Yd,Zd,ha,Qd,Km,Xm,ax=q(()=>{ae(),le(),Ae(),ue(),Ir="[a-zA-Z]|\\.\\.\\.",qn="("+Ir+")+",pa="^"+qn+"$",Kd="("+qn+",)*"+qn,Xd="^"+Kd+"$",Yd=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Zd=class{constructor(e,t){var i;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(Xd)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,s)=>{let o=e[s].dims.slice();if(!a.match(RegExp(pa)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,o,s);this.lhs.push(l)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(qn)))throw new Error("Invalid RHS");(i=r.match(RegExp(Ir,"g")))==null||i.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,s=[],o=0;if(!e.match(RegExp(pa))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Ir,"g")),d=new Yd(r);return l==null||l.forEach((c,h)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let f=i-l.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(s=n.slice(o,o+f),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let w=String.fromCharCode(48+g);d.addSymbol(w,h+g),this.addSymbol(w,n[o++],r)}}else d.addSymbol(c,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[o++],r)}),d}},ha=e=>e+"_max",Qd=(e,t,n,r)=>{let i=e.map(d=>d.length).map((d,c)=>D(`input${c}`,t,d)),a=P.size(r),s=J("output",t,r.length),o=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),l=d=>{let c=[],h="var prod = 1.0;",f="var sum = 0.0;",g="sum += prod;",w=[],_=[],T=[],v=[],x=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((k,E)=>{var M;if(n.rhs.symbolToIndices.has(E)){let A=(M=n.rhs.symbolToIndices.get(E))==null?void 0:M[0];A!==void 0&&n.lhs.forEach(($,O)=>{if(k.inputIndices.includes(O)){let U=$.symbolToIndices.get(E);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(H=>{c.push(`${i[O].indicesSet(`input${O}Indices`,H,s.indicesGet("outputIndices",A))}`)})}})}else n.lhs.forEach((A,$)=>{if(k.inputIndices.includes($)){let O=A.symbolToIndices.get(E);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(U=>{w.push(`${i[$].indicesSet(`input${$}Indices`,U,`${E}`)}`)}),v.push(`prod *= ${i[$].getByIndices(`input${$}Indices`)};`)}}),_.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${ha(E)}; ${E}++) {`),T.push("}")});let C=x?[...c,`let sum = ${i.map((k,E)=>k.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,f,..._,...w,h,...v,g,...T];return`
            ${d.registerUniforms(o.map(k=>({name:`${ha(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((k,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(h=>n.symbolToInfo.has(h)).map(h=>{var f;return{type:12,data:((f=n.symbolToInfo.get(h))==null?void 0:f.dimValue)||0}});d.push({type:12,data:a});let c=e.map((h,f)=>[...ne(h)]).reduce((h,f)=>h.concat(f),d);return c.push(...ne(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Km=(e,t)=>{let n=new Zd(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((a,s)=>a.dims);e.compute(Qd(i,e.inputs[0].dataType,n,r))},Xm=e=>{let t=e.equation.replace(/\s+/g,"");return ve({equation:t})}}),Jd,fa,ec,tc,Ym,sx=q(()=>{ae(),le(),ue(),Jd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},fa=(e,t)=>{let n=e.length-t.length,r=[];for(let i=0;i<n;++i)r.push(e[i]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},ec=(e,t)=>e.length>t.length?fa(e,t):fa(t,e),tc=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=ec(t,n),i=e[0].dataType,a=i===9||P.size(t)===1,s=i===9||t.length>0&&t[t.length-1]%4===0?4:1,o=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(P.size(r)/o),d=h=>{let f=D("input",i,t.length,s),g=J("output",i,r.length,o),w;if(i===9){let _=(T,v,x="")=>`
          let outputIndices${v} = ${g.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${f.broadcastedIndicesToOffset(`outputIndices${v}`,g)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${x}(${f.getByOffset(`index${v}`)}[component${v}]);
        `;w=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else w=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${f.getByOffset(`inputOffset / ${s}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(f,g)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},c=[{type:12,data:l},...ne(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Ym=e=>{Jd(e.inputs),e.compute(tc(e.inputs),{inputs:[0]})}}),nc,Zm,ox=q(()=>{ae(),le(),ue(),Ps(),nc=e=>{let t=e[0].dataType,n=P.size(e[0].dims),r=P.size(e[1].dims),i=r%4===0,a=s=>{let o=D("x",t,[1],4),l=D("bias",t,[1],4),d=J("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${l.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,f=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(o,l,d)}

    ${ts(We(t))}

    ${s.mainStart(Sn)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",ns("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Sn/4)}})}},Zm=e=>{e.inputs.length<2||P.size(e.inputs[1].dims)===0?bm(e):e.compute(nc(e.inputs))}}),rc,ic,Qm,Jm,lx=q(()=>{ae(),le(),Ae(),ue(),rc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},ic=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=P.normalizeAxis(t.axis,i),s=n.slice(0);s.splice(a,1,...r);let o=n[a],l=e[0].dataType===9?4:1,d=Math.ceil(P.size(s)/l),c=[{type:12,data:d},{type:6,data:o},{type:12,data:a},...ne(e[0].dims,e[1].dims,s)],h=f=>{let g=D("data",e[0].dataType,e[0].dims.length,l),w=D("inputIndices",e[1].dataType,e[1].dims.length),_=J("output",e[0].dataType,s.length,l),T=x=>{let C=r.length,k=`var indicesIndices${x}  = ${w.type.indices}(0);`;for(let E=0;E<C;E++)k+=`${C>1?`indicesIndices${x}[${E}]`:`indicesIndices${x}`} = ${s.length>1?`outputIndices${x}[uniforms.axis + ${E}]`:`outputIndices${x}`};`;k+=`
          var idx${x} = ${w.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${g.type.indices};
        `;for(let E=0,M=0;E<i;E++)E===a?(k+=`${i>1?`dataIndices${x}[${E}]`:`dataIndices${x}`} = u32(idx${x});`,M+=C):(k+=`${i>1?`dataIndices${x}[${E}]`:`dataIndices${x}`} = ${s.length>1?`outputIndices${x}[${M}]`:`outputIndices${x}`};`,M++);return k},v;if(e[0].dataType===9){let x=(C,k,E="")=>`
          let outputIndices${k} = ${_.offsetToIndices(`outputOffset + ${k}u`)};
          ${T(k)};
          let offset${k} = ${g.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${C}[${k}] = ${E}(${g.getByOffset(`index${k}`)}[component${k}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${g.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,w,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:h}},Qm=e=>ve({axis:e.axis}),Jm=(e,t)=>{let n=e.inputs;rc(n),e.compute(ic(e.inputs,t))}}),ac,eg,tg,ux=q(()=>{ae(),le(),ue(),ac=(e,t,n,r,i,a,s,o,l)=>{let d=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:12,data:l}],c=[a];d.push(...ne(t.dims,c));let h=f=>{let g=D("indices_data",t.dataType,t.dims.length),w=J("input_slice_offsets_data",12,1,1),_=[g,w],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(T).declareVariables(..._)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},eg=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,s=a[a.length-1],o=P.sizeToDimension(a,a.length-1),l=P.sizeFromDimension(r,t.batchDims+s),d=P.sizeToDimension(r,t.batchDims),c=P.sizeFromDimension(r,t.batchDims),h=o/d,f=new Array(s),g=l;for(let k=0;k<s;++k)f[s-1-k]=g,g*=r[t.batchDims+s-1-k];let w=ac(e,n[1],f,t.batchDims,r,o,h,c,s),_=t.batchDims+s;if(_>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(r.slice(_)),v=P.size(T),x=[{type:12,data:v},{type:12,data:l},...ne(n[0].dims,w.dims,T)],C=k=>{let E=D("data",n[0].dataType,n[0].dims.length),M=D("slice_offsets",12,w.dims.length),A=J("output",n[0].dataType,T.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,M,A)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:i}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:x}),getShaderSource:C},{inputs:[n[0],w]})},tg=e=>({batchDims:e.batch_dims,cacheKey:""})}),sc,oc,ng,rg,dx=q(()=>{ae(),le(),Ae(),ue(),sc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=P.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((o,l)=>l===n?Math.ceil(o/r)===a.dims[l]:o===a.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((o,l)=>o===a.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},oc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=P.normalizeAxis(t.gatherAxis,i),s=P.normalizeAxis(t.quantizeAxis,i),o=n.slice(0);o.splice(a,1,...r);let l=P.size(o),d=e[2].dataType,c=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...ne(...e.map((g,w)=>g.dims),o)],f=g=>{let w=D("data",e[0].dataType,e[0].dims.length),_=D("inputIndices",e[1].dataType,e[1].dims.length),T=D("scales",e[2].dataType,e[2].dims.length),v=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,x=J("output",d,o.length),C=[w,_,T];v&&C.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(k).declareVariables(...C,x)}
        ${g.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${We(d)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,w)=>w!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,w)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:f}},ng=(e,t)=>{let n=e.inputs;sc(n,t),e.compute(oc(e.inputs,t))},rg=e=>ve({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),lc,uc,ig,ag,cx=q(()=>{ae(),le(),Ae(),ue(),lc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},uc=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,s=e[1].dataType,o=P.normalizeAxis(t.axis,i),l=n[o],d=a.slice(0),c=P.size(d),h=D("input",r,i),f=D("indicesInput",s,a.length),g=J("output",r,d.length),w=[{type:12,data:c},{type:6,data:l},{type:12,data:o}];return w.push(...ne(n,a,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:w}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,f,g)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},ig=e=>ve({axis:e.axis}),ag=(e,t)=>{let n=e.inputs;lc(n),e.compute(uc(e.inputs,t))}}),dc,cc,sg,og,px=q(()=>{ae(),le(),ue(),dc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},cc=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,s]=rf.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),o=[i,a];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(a/l),c=Math.ceil(i/l),h=!0,f=P.size(o),g=[{type:12,data:h?d:f},{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&(g.push(...ne(e[2].dims)),w.push("rank")),g.push(...ne(o));let _=v=>{let x="";t.transA&&t.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let C=t.alpha===1?"":"value *= uniforms.alpha;",k=D("a",e[0].dataType,e[0].dims),E=D("b",e[1].dataType,e[1].dims),M=k.type.value,A=null,$=[k,E];e.length===3&&(A=D("c",e[2].dataType,e[2].dims.length),$.push(A));let O=J("output",e[0].dataType,o.length);$.push(O);let U=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(U).declareVariables(...$)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${M}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${C}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",O)}; value += ${M}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=v=>{let x=D("a",e[0].dataType,e[0].dims),C=D("b",e[1].dataType,e[1].dims),k=null,E=[x,C];e.length===3&&(k=D("c",e[2].dataType,e[2].dims.length),E.push(k));let M=J("output",e[0].dataType,o.length);E.push(M);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",O="";t.transA&&t.transB?(O=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(O=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(O=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(O=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let U=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(A).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${C.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${M.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${O}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${$}
      }
      workgroupBarrier();
    }

    ${U}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${M.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:g}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:_}},sg=e=>{let t=e.transA,n=e.transB,r=e.alpha,i=e.beta;return{transA:t,transB:n,alpha:r,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},og=(e,t)=>{dc(e.inputs),e.compute(cc(e.inputs,t))}}),_t,Tt,Yt,Zt,pc,hc,fc,mc,gc,bc,yc,wc,lg,ug,hx=q(()=>{ae(),le(),Ae(),ue(),[_t,Tt,Yt,Zt]=[0,1,2,3],pc=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},hc=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,fc=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,mc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,gc=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,bc=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${_t}] = batch;
     indices[${Tt}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Yt}] = u32(r);
            indices[${Zt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Yt}] = u32(clamp(r, 0, H - 1));
          indices[${Zt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Yt}] = gs_reflect(r, border[1], border[3]);
          indices[${Zt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,yc=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${_t}], indices[${Tt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${_t}], indices[${Tt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${_t}], indices[${Tt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${_t}], indices[${Tt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${_t}], indices[${Tt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${_t}], indices[${Tt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,wc=(e,t)=>{let n=D("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=D("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[_t,Tt,Yt,Zt]=[0,3,1,2]);let s=J("output",e[0].dataType,a.length),o=n.type.value,l=P.size(a),d=[{type:12,data:l},...ne(e[0].dims,r,a)],c=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(n,i,s)}
  ${hc}
  ${fc(o)}
  ${mc(t)}
  ${gc(t)}
  ${bc(n,o,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Yt}]);
      let W_in = i32(uniforms.x_shape[${Zt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${_t}], indices[${Yt}], indices[${Zt}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${yc(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let f=P.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:d}},getShaderSource:c}},lg=(e,t)=>{pc(e.inputs),e.compute(wc(e.inputs,t))},ug=e=>ve({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ve,_c,dg,ma,xc,Qn,cg,pg=q(()=>{ae(),le(),Ae(),Ms(),Rs(),ue(),Ht(),Ve=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,_c=(e,t)=>{let n=e[0],r=Ve(e,1),i=Ve(e,2),a=Ve(e,3),s=Ve(e,4),o=Ve(e,5),l=Ve(e,6),d=Ve(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],h=n.dims[1],f=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],g=h,w=0,_=0,T=Math.floor(f/t.numHeads);if(l&&d&&P.size(l.dims)&&P.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=l.dims[2],_=l.dims[2]}else if(l&&P.size(l.dims)||d&&P.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(r&&P.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a&&P.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=w+g,C=0;if(s&&P.size(s.dims)>0){C=8;let A=s.dims;throw A.length===1?A[0]===c?C=1:A[0]===3*c+2&&(C=3):A.length===2&&A[0]===c&&A[1]===x&&(C=5),C===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,E=f;if(i&&P.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(g!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=i.dims[2]}else{if(g!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=i.dims[1]*i.dims[3],k=!0}}let M=!1;if(s&&P.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&P.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==h||o.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:w,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:f,vHiddenSize:E,headSize:T,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:C,scale:t.scale,broadcastResPosBias:M,passPastInKv:k,qkvFormat:v}},dg=e=>ve({...e}),ma=ve({perm:[0,2,1,3]}),xc=(e,t,n,r,i,a,s)=>{let o=[r,i,a],l=P.size(o),d=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],c=h=>{let f=J("qkv_with_bias",t.dataType,o),g=D("qkv",t.dataType,o),w=D("bias",n.dataType,o),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(g,w,f)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,n],outputs:[-1]})[0]},Qn=(e,t,n,r,i,a,s,o)=>{let l=a;if(s&&P.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=xc(e,a,s,t,r,n*i,o),l=l.reshape([t,r,n,i]),n===1||r===1?l:e.compute(nt(l,ma.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,i])),n===1||r===1?l:e.compute(nt(l,ma.perm),{inputs:[l],outputs:[-1]})[0]},cg=(e,t)=>{let n=_c(e.inputs,t),r=e.inputs[0],i=Ve(e.inputs,1),a=Ve(e.inputs,2),s=Ve(e.inputs,3),o=Ve(e.inputs,4),l=Ve(e.inputs,5),d=Ve(e.inputs,6),c=Ve(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if((i==null?void 0:i.dims.length)===5)throw new Error("Packed KV is not implemented");let h=i&&a&&i.dims.length===4&&a.dims.length===4,f=Qn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(h)return rr(e,f,i,a,o,void 0,d,c,l,n);if(!i||!a)throw new Error("key and value must be provided");let g=Qn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,s,n.hiddenSize),w=Qn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);rr(e,f,g,w,o,void 0,d,c,l,n)}}),vc,$c,Sc,kc,os,hg,fg,mg=q(()=>{ae(),le(),Ae(),ue(),vc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},$c=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>n.push(Number(i))),r=n.length),ve({numOutputs:r,axis:t.axis,splitSizes:n})},Sc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ee("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,kc=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},os=(e,t)=>{let n=e[0].dims,r=P.size(n),i=e[0].dataType,a=P.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),o=D("input",i,n.length),l=new Array(t.numOutputs),d=[],c=[],h=0,f=[{type:12,data:r}];for(let w=0;w<t.numOutputs;w++){h+=t.splitSizes[w],l[w]=h;let _=n.slice();_[a]=t.splitSizes[w],c.push(_),s[w]=J(`output${w}`,i,_.length),d.push({dims:c[w],dataType:e[0].dataType})}f.push({type:12,data:l},...ne(n,...c));let g=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...s)}
  ${Sc(l.length)}
  ${kc(s)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ee("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},hg=(e,t)=>{vc(e.inputs);let n=e.inputs.length===1?t:$c(e.inputs,t);e.compute(os(e.inputs,n),{inputs:[0]})},fg=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ve({axis:t,numOutputs:r,splitSizes:n})}}),Tc,Yr,gg,bg=q(()=>{ae(),le(),Ae(),ue(),Tc=(e,t)=>{let[n,r,i,a]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!P.areEqual(r.dims,[])&&!P.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!P.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],d=n.dims[n.dims.length-2],c=i.dims[0],h=P.sizeFromDimension(n.dims,1)/d,f=o===0?i.dims[1]*2:h/s;if(o>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(f/2!==i.dims[1]&&o/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},Yr=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,s=e[0].dims[0],o=P.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=o/l,c=e[2].dims[1],h=i===0?c*2:d/r,f=new Array(s,l,d/h,h-c),g=P.computeStrides(f),w=[{type:1,data:a},{type:12,data:f},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[o,d,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,h,l*h,1]}):[],...ne(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=T=>{let v=D("input",e[0].dataType,e[0].dims.length),x=D("position_ids",e[1].dataType,e[1].dims.length),C=D("cos_cache",e[2].dataType,e[2].dims.length),k=D("sin_cache",e[3].dataType,e[3].dims.length),E=J("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${T.declareVariables(v,x,C,k,E)}

        ${T.mainStart(Sn)}
          let half_rotary_emb_dim = uniforms.${C.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",J("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ve({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(P.size(f)/Sn)},programUniforms:w})}},gg=(e,t)=>{Tc(e.inputs,t),e.compute(Yr(e.inputs,t))}}),Cc,Ec,ga,Ic,yg,fx=q(()=>{Ae(),ae(),Rs(),pg(),mg(),Ht(),bg(),ue(),Cc=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],i=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=n.dims[0],d=n.dims[1],c=n.dims.length===3?o?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],h=d,f=0,g=!r||r.dims.length===0,w=Math.floor(g?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);g&&(c=w*t.numHeads);let _=a&&a.dims.length!==0,T=s&&s.dims.length!==0;if(_&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=a.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let x=0,C=!1,k=t.kvNumHeads?w*t.kvNumHeads:c;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(h!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=i.dims[2]}else{if(h!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=i.dims[1]*i.dims[3],C=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let M=E.dims.reduce((A,$)=>A*$,1);if(M!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${M}.`);for(let A=0;A<E.dims.length;A++)if(E.dims[A]!==1&&E.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${E.dims[A]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:f,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:k,headSize:w,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:v}},Ec=ve({perm:[0,2,1,3]}),ga=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(nt(r,Ec.perm),{inputs:[r],outputs:[-1]})[0]),r},Ic=(e,t,n,r)=>{let i=7,a=["type","type"],s=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=c=>{let h=D("seq_lens",n.dataType,n.dims),f=D("total_seq_lens",r.dataType,r.dims),g=J("pos_ids",i,s),w=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(w).declareVariables(h,f,g)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${f.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:d}},yg=(e,t)=>{var k;let n=Cc(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((k=e.inputs[1])==null?void 0:k.dims.length)===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=ve({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[f,g,w]=!i&&!a?e.compute(os([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],_,T;if(t.doRotary){let E=e.compute(Ic(n.batchSize,n.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],M=e.inputs[7],A=e.inputs[8],$=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[f,E,M,A],U=[-1];_=e.compute(Yr(O,$),{inputs:O,outputs:U})[0],O.splice(0,1,g);let H=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Yr(O,H),{inputs:O,outputs:U})[0]}let v=Qn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?_:f,void 0,0),x=ga(e,t.doRotary?T:g,n),C=ga(e,w,n);rr(e,v,x,C,void 0,void 0,s,o,void 0,n,l,d)}}),ba,zc,Mc,wg,mx=q(()=>{ae(),le(),Ht(),ue(),ba=(e,t,n,r,i,a,s,o)=>{let l=ze(a),d=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,h=i*s,f=64;h===1&&(f=256);let g=[i,s,a/l],w=[i,s,2],_=["rank","type","type"],T=[];T.push(...ne(g,w));let v=x=>{let C=D("x",t.dataType,3,l),k=D("scale",n.dataType,n.dims),E=D("bias",r.dataType,r.dims),M=J("output",1,3,2),A=[C,k,E,M];return`
  var<workgroup> workgroup_shared : array<${c}, ${f}>;
  const workgroup_size = ${f}u;
  ${x.declareVariables(...A)}
  ${x.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${C.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${qt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${qt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:h},programUniforms:T}),getShaderSource:v},{inputs:[t,n,r],outputs:[-1]})[0]},zc=(e,t,n)=>{let r=t[0].dims,i=r,a=2,s=r[0],o=r[1],l=P.sizeFromDimension(r,a),d=ze(l),c=P.size(i)/d,h=ba(e,t[0],t[1],t[2],s,l,o,n.epsilon),f=[s,o,l/d],g=[s,o],w=["type","none"],_=T=>{let v=D("x",t[0].dataType,f.length,d),x=D("scale_shift",1,g.length,2),C=J("output",t[0].dataType,f.length,d),k=[v,x,C];return`
  ${T.registerUniform("output_size","u32").declareVariables(...k)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${C.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${C.type.value}(scale_shift.x) + ${C.type.value}(scale_shift.y);
      ${C.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ne(f,g,f)]}),getShaderSource:_},{inputs:[t[0],h]})},Mc=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],s=r[r.length-1],o=P.sizeFromDimension(r,1)/s,l=ze(s),d=P.size(i)/l,c=[{type:12,data:o},{type:12,data:Math.floor(s/l)}],h=["type","type"],f=!1,g=[0,r.length-1];for(let v=0;v<r.length-2;v++)f=f||r[v+1]!==1,g.push(v+1);f=f&&r[r.length-1]!==1;let w=f?e.compute(nt(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(v,x)=>r[g[x]])),_=ba(e,w,t[1],t[2],a,o,s,n.epsilon),T=v=>{let x=Pe(t[0].dataType),C=l===1?"vec2f":`mat${l}x2f`,k=A=>{let $=A===0?"x":"y",O=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${x}(${O}(scale.${$}))`;case 2:return`vec2<${x}>(${O}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${x}>(${O}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=D("input",t[0].dataType,t[0].dims,l),M=J("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${C}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${M.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],_]})},wg=(e,t)=>{t.format==="NHWC"?Mc(e,e.inputs,t):zc(e,e.inputs,t)}}),Ac,Nc,_g,gx=q(()=>{ae(),le(),ue(),Ac=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Nc=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],s=!r&&e[2],o=i,l=P.normalizeAxis(t.axis,i.length),d=P.sizeToDimension(i,l),c=P.sizeFromDimension(i,l),h=P.size(a.dims),f=s?P.size(s.dims):0;if(h!==c||s&&f!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${f}`);let g=[];for(let E=0;E<i.length;++E)E<l?g.push(i[E]):g.push(1);let w=ze(c),_=["type","type"],T=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/w)},{type:1,data:t.epsilon}];s&&_.push("type");let v=n>1,x=n>2,C=E=>{let M=Pe(e[0].dataType),A=[D("x",e[0].dataType,e[0].dims,w),D("scale",a.dataType,a.dims,w)];s&&A.push(D("bias",s.dataType,s.dims,w)),A.push(J("output",e[0].dataType,o,w)),v&&A.push(J("mean_data_output",1,g)),x&&A.push(J("inv_std_output",1,g));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms($).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Qa("f32",w)};
    var mean_square_vector = ${Qa("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${xn(M,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${qt("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${qt("mean_square_vector",w)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${xn(M,w,"x[j + offset]")};
      let f32scale = ${xn(M,w,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${xn(M,w,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:o,dataType:e[0].dataType}];return v&&k.push({dims:g,dataType:1}),x&&k.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${n};${r}`,inputDependencies:_},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:T}),getShaderSource:C}},_g=(e,t)=>{Ac(e.inputs),e.compute(Nc(e.inputs,t,e.outputCount))}}),Rc,xg,bx=q(()=>{le(),Us(),Ls(),Rc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},xg=e=>{Rc(e.inputs);let t=$n.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Ds(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=P.size(e.inputs[0].dims.slice(0,-2)),s=P.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&s===1){let o=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),d=[1,a,n],c=[o,l];e.compute(Xr(c,{activation:""},t,d),{inputs:c})}else e.compute(Xr(e.inputs,{activation:""},t))}}}),Pc,Oc,Bc,vg,$g,yx=q(()=>{ae(),le(),Ae(),ue(),Pc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!P.areEqual(s.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(P.size(o)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(P.size(l)!==d)throw new Error("zeroPoints input size error.")}},Oc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,s=t.n,o=n.slice(0,r-2),l=P.size(o),d=e[1].dims[2]/4,c=e[0].dataType,h=ze(t.k),f=ze(d),g=ze(s),w=o.concat([i,s]),_=i>1&&s/g%2===0?2:1,T=P.size(w)/g/_,v=64,x=[],C=[l,i,a/h],k=P.convertShape(e[1].dims).slice();k.splice(-1,1,d/f),x.push(...ne(C)),x.push(...ne(k)),x.push(...ne(e[2].dims)),e.length===4&&x.push(...ne(P.convertShape(e[3].dims)));let E=[l,i,s/g];x.push(...ne(E));let M=A=>{let $=C.length,O=D("a",e[0].dataType,$,h),U=D("b",12,k.length,f),H=D("scales",e[2].dataType,e[2].dims.length),F=[O,U,H],K=e.length===4?D("zero_points",12,e[3].dims.length):void 0;K&&F.push(K);let R=E.length,Z=J("output",e[0].dataType,R,g),Q=Pe(e[0].dataType),te=(()=>{switch(h){case 1:return`array<${Q}, 8>`;case 2:return`mat4x2<${Q}>`;case 4:return`mat2x4<${Q}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ie=Math.floor(32/t.bits),W=Math.floor(ie/8),re=()=>{let X="";for(let V=0;V<W;V++){let _e=V*t.bits*4,qe=_e+t.bits;X+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?O.indicesToOffset(`${O.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${te};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/h}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${O.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let Ie=0;Ie<g*_;Ie++)X+=`
            b_value = ${f===1?`b${Ie}_data`:`b${Ie}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${V*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${_e}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${qe}u) & b_mask);`}
            b_quantized_values = ${te}(${Array.from({length:4},(Be,je)=>`${Q}(b_value_lower[${je}]), ${Q}(b_value_upper[${je}])`).join(", ")});
            b_dequantized_values = ${h===1?`${te}(${Array.from({length:8},(Be,je)=>`(b_quantized_values[${je}] - ${K?`zero_point${Ie}`:"zero_point"}) * scale${Ie}`).join(", ")});`:`(b_quantized_values - ${te}(${Array(8).fill(`${K?`zero_point${Ie}`:"zero_point"}`).join(",")})) * scale${Ie};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(Ie/g)}]${g>1?`[${Ie%g}]`:""} += ${Array.from({length:8/h},(Be,je)=>`${h===1?`a_data${V>0?V:""}[${je}] * b_dequantized_values[${je}]`:`dot(a_data${V>0?V:""}[${je}], b_dequantized_values[${je}])`}`).join(" + ")};
          `}return X},L=()=>{let X=`
            var col_index = col * ${g};
            ${K?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${Q}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let V=0;V<g*_;V++)X+=`
            let scale${V} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${K?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${Q}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return X},G=()=>{let X=`col_index = col * ${g};`;for(let V=0;V<g*_;V++)X+=`
            let b${V}_data = ${U.getByIndices(`${U.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return X+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${te};
            var b_dequantized_values: ${te};`,X};return`
        var<workgroup> workgroup_shared: array<${Z.type.value}, ${_*v}>;
        ${A.declareVariables(...F,Z)}
        ${A.mainStart([v,1,1])}
          let output_indices = ${Z.offsetToIndices(`(global_idx / ${v}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${L()}
            for (var word: u32 = 0; word < ${d}; word += ${f}) {
              ${G()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${re()}
                word_offset += ${ie/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${f};${g};${_};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:c}],dispatchGroup:{x:T},programUniforms:x}),getShaderSource:M}},Bc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,s=t.n,o=n.slice(0,r-2),l=P.size(o),d=e[1].dims[2]/4,c=e[0].dataType,h=ze(t.k),f=ze(d),g=o.concat([i,s]),w=128,_=s%8===0?8:s%4===0?4:1,T=w/_,v=Math.floor(32/t.bits),x=T*f*v,C=x/h,k=x/t.blockSize,E=P.size(g)/_,M=[],A=[l,i,a/h],$=P.convertShape(e[1].dims).slice();$.splice(-1,1,d/f),M.push(...ne(A)),M.push(...ne($)),M.push(...ne(e[2].dims)),e.length===4&&M.push(...ne(P.convertShape(e[3].dims)));let O=[l,i,s];M.push(...ne(O));let U=H=>{let F=A.length,K=D("a",e[0].dataType,F,h),R=D("b",12,$.length,f),Z=D("scales",e[2].dataType,e[2].dims.length),Q=[K,R,Z],te=e.length===4?D("zero_points",12,e[3].dims.length):void 0;te&&Q.push(te);let ie=O.length,W=J("output",e[0].dataType,ie),re=Pe(e[0].dataType),L=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${K.type.value}, ${C}>;
        var<workgroup> inter_results: array<array<${W.type.value}, ${T}>, ${_}>;
        ${H.declareVariables(...Q,W)}
        ${H.mainStart([T,_,1])}
          let output_indices = ${W.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${C};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${C}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${K.getByIndices(`${K.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${K.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${te?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${te.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${re}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${re}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${Z.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?"b_data":"b_data[i]"};
              ${(()=>{let G=Math.floor(v/8),X="";for(let V=0;V<G;V++){let _e=V*t.bits*4,qe=_e+t.bits;X+=`
              ${L()}
              {${t.bits===2?`
                let half_word = b_value >> ${V*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${_e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${qe}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(Ie,Be)=>`${re}(b_value_lower[${Be}]), ${re}(b_value_upper[${Be}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ie,Be)=>`${`dot(a_data${Be}, b_dequantized_values[${Be}])`}`).join(" + ")};
              }
              word_offset += ${8/h};`}return X})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${W.setByIndices(`${W.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${f};${T};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:E},programUniforms:M}),getShaderSource:U}},vg=(e,t)=>{Pc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Bc(e.inputs,t)):e.compute(Oc(e.inputs,t))},$g=e=>ve(e)}),Dc,Uc,Lc,Fc,Wc,qc,Vc,Hc,Sg,wx=q(()=>{ae(),le(),ue(),Dc=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Uc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
            k = i32(${e.indicesGet("indices",i)}) - ${ee("uniforms.pads",i,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ee("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${ee("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Lc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${ee("uniforms.pads",i,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ee("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ee("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ee("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Fc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${ee("uniforms.pads",i,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ee("uniforms.x_shape",i,t)})) {
                  k = i32(${ee("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${ee("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Wc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${ee("uniforms.pads",i,n)};
                if (k < 0)  {
                  k += i32(${ee("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${ee("uniforms.x_shape",i,t)})) {
                  k -= i32(${ee("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${ee("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},qc=(e,t,n)=>{switch(n.mode){case 0:return Uc(e,t,n.pads.length);case 1:return Lc(e,t,n.pads.length);case 2:return Fc(e,t,n.pads.length);case 3:return Wc(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Vc=(e,t)=>{let n=P.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=P.size(n),a=[{type:12,data:i},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...ne(e[0].dims,n));let o=["rank"],l=d=>{let c=J("output",e[0].dataType,n.length),h=D("x",e[0].dataType,r.length),f=h.type.value,g=qc(c,r.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:s?f:"f32"}),`
            ${d.registerUniforms(w).declareVariables(h,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(P.size(n)/64)},programUniforms:a}),getShaderSource:l}},Hc=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)a[Number(o[l])]=Number(n[l]),a[Number(o[l])+i]=Number(n[l+o.length])}else n.forEach((o,l)=>a[Number(l)]=Number(o));let s=[];return a.forEach(o=>s.push(o)),{mode:t.mode,value:r,pads:s}}else return t},Sg=(e,t)=>{Dc(e.inputs);let n=Hc(e.inputs,t);e.compute(Vc(e.inputs,n),{inputs:[0]})}}),Vn,ya,wa,_a,xa,Gc,jc,va,$a,kg,Tg,Sa,Cg,Eg,ka,Ig,zg,Mg,Ag,_x=q(()=>{at(),ae(),le(),ue(),Vn=e=>{if(Se.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ya=(e,t,n)=>{let r=t.format==="NHWC",i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),l=a?t.dilations.slice():[],d=t.pads.slice();jr.adjustPoolAttributes(n,i,s,o,l,d);let c=jr.computePoolOutputShape(n,i,o,l,s,d,t.autoPad),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:o,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:o,pads:d,cacheKey:t.cacheKey});let f=c.slice();return f.push(f.splice(1,1)[0]),[h,r?f:c]},wa=(e,t)=>{let n=t.format==="NHWC",r=P.size(e),i=P.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],h=!!(d+c);a.push({type:12,data:o},{type:12,data:l},{type:12,data:d},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];f=!!(_+T),a.push({type:12,data:g},{type:12,data:w},{type:12,data:_},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,f]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=P.computeStrides(t.kernelShape);a.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,c)=>d+c);return[a,s,!!l,!1,!1]}},_a=(e,t,n,r,i,a,s,o,l,d,c,h)=>{let f=i.format==="NHWC",g=t.type.value,w=J("output",t.type.tensor,r);if(i.kernelShape.length<=2){let _="",T="",v="",x=n-(f?2:1);if(c?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,i.kernelShape.length===2){let C=n-(f?3:2);h?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${C}] < 0 || xIndices[${C}] >= uniforms.x_shape[${C}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var value = ${g}(${o});
              var pad = 0;
              ${T}
              ${_}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=i.kernelShape.length,T=i.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${g}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${ee("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${ee("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${n-_}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ee("uniforms.strides",`j - ${n-_}u`,_)}
                    + offsets[j - ${n-_}u] - ${ee("uniforms.pads","j - 2u",T)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},xa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Gc=e=>`${xa(e)};${e.countIncludePad}`,jc=e=>`${xa(e)};${e.storageOrder};${e.dilations}`,va=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),$a=(e,t,n,r)=>{let[i,a]=ya(t,r,n),s=D("x",t.dataType,t.dims.length),o=s.type.value,l="value += x_val;",d="";i.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,h,f,g,w]=wa(a,i);c.push(...ne(t.dims,a));let _=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${f};${g};${w}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(P.size(a)/64)},programUniforms:c}),getShaderSource:T=>_a(T,s,t.dims.length,a.length,i,l,d,0,h,f,g,w)}},kg=e=>{let t=e.count_include_pad!==0,n=va(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Gc(r)}},Tg=(e,t)=>{Vn(e.inputs),e.compute($a("AveragePool",e.inputs[0],!1,t))},Sa={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Cg=e=>{let t=e.format;return{format:t,...Sa,cacheKey:t}},Eg=(e,t)=>{Vn(e.inputs),e.compute($a("GlobalAveragePool",e.inputs[0],!0,t))},ka=(e,t,n,r)=>{let[i,a]=ya(t,r,n),s=`
      value = max(x_val, value);
    `,o="",l=D("x",t.dataType,t.dims.length),d=["rank"],[c,h,f,g,w]=wa(a,i);return c.push(...ne(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${f};${g};${w}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(P.size(a)/64)},programUniforms:c}),getShaderSource:_=>_a(_,l,t.dims.length,a.length,i,s,o,t.dataType===10?-65504:-1e5,h,f,g,w)}},Ig=(e,t)=>{Vn(e.inputs),e.compute(ka("MaxPool",e.inputs[0],!1,t))},zg=e=>{let t=e.storage_order,n=e.dilations,r=va(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:n,...r,cacheKey:""};return{...i,cacheKey:jc(i)}},Mg=e=>{let t=e.format;return{format:t,...Sa,cacheKey:t}},Ag=(e,t)=>{Vn(e.inputs),e.compute(ka("GlobalMaxPool",e.inputs[0],!0,t))}}),Kc,Xc,Ng,Rg,xx=q(()=>{ae(),le(),Ae(),ue(),Kc=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Xc=(e,t)=>{let n=P.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,s=e[1].dataType,o=P.size(a),l=r===3||r===2,d=l?[Math.ceil(P.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,h=e.length>2?e[2]:void 0,f=h?l?[Math.ceil(P.size(h.dims)/4)]:h.dims:void 0,g=c.length===0||c.length===1&&c[0]===1,w=g===!1&&c.length===1,_=ze(o),T=g&&(!l||_===4),v=T?_:1,x=T&&!l?_:1,C=D("input",l?12:r,d.length,x),k=D("scale",s,c.length),E=h?D("zero_point",l?12:r,f.length):void 0,M=J("output",s,a.length,v),A=[C,k];E&&A.push(E);let $=[d,c];h&&$.push(f);let O=[{type:12,data:o/v},{type:12,data:n},{type:12,data:t.blockSize},...ne(...$,a)],U=H=>{let F=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${H.registerUniforms(F).declareVariables(...A,M)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${M.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${C.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${C.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${k.getByOffset("0")}`:w?`
            let scale_index = ${M.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?g?l?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:w?l?`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":C.type.value}(0);`};
      // Compute and write output
      ${M.setByOffset("global_idx",`${M.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:U,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/v/64),y:1,z:1},programUniforms:O})}},Ng=(e,t)=>{Kc(e.inputs,t),e.compute(Xc(e.inputs,t))},Rg=e=>ve({axis:e.axis,blockSize:e.blockSize})}),Yc,Zc,Pg,vx=q(()=>{at(),ae(),ue(),Yc=(e,t,n)=>{let r=e===t,i=e<t&&n<0,a=e>t&&n>0;if(r||i||a)throw new Error("Range these inputs' contents are invalid.")},Zc=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],s=i,o=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...ne(a)],l=d=>{let c=J("output",r,a.length),h=c.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${d.registerUniforms(f).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},Pg=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Se.webgpu.validateInputContent&&Yc(t,n,r),e.compute(Zc(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),Qc,Jc,Og,Bg,$x=q(()=>{ae(),le(),Ae(),ue(),Qc=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${i}bitcast<${r}>(oldValue) + (${n})${a}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Jc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=1,s=Math.ceil(P.sizeToDimension(r,r.length-1)/a),o=r[r.length-1],l=P.sizeFromDimension(n,o),d=[{type:12,data:s},{type:12,data:o},{type:12,data:l},...ne(e[1].dims,e[2].dims,i)],c=h=>{let f=D("indices",e[1].dataType,e[1].dims.length),g=D("updates",e[2].dataType,e[2].dims.length,a),w=t.reduction!=="none"&&t.reduction!==""?cf("output",e[0].dataType,i.length):J("output",e[0].dataType,i.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,g,w)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Qc(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:c}},Og=e=>ve({reduction:e.reduction}),Bg=(e,t)=>{e.compute(Jc(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),ep,tp,np,Ta,rp,ip,ap,sp,op,lp,up,dp,Ca,cp,pp,hp,fp,mp,Dg,Ug,Sx=q(()=>{ae(),le(),Ae(),ue(),ep=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},tp=(e,t,n)=>{t.every(i=>i>=0&&i<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((i,a)=>r[i]=e[a]),r},np=(e,t,n,r,i,a)=>{let[s,o,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>r.push(c)),r.length!==0&&r.length!==d&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");ep(r,t),t.axes.length>0&&tp(r,t.axes,d).forEach((c,h)=>r[h]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>i.push(Number(c))),i.length!==0&&i.length!==d&&n>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof i<"u"&&r.length>0&&i.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Ta=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,rp=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ta("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ta("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ip=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ap=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=i[s],r[s+n]=i[t.length+s]}),r):i},sp=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>i.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>i[a]=n[s])}else n.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,s)=>Math.round(a*t[s]))}return i},op=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),i.forEach((a,s)=>i[s]=Math.round(a*t[s]))),i},lp=(e,t,n,r,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${ee("uniforms.scales","i",r)};
        var roi_low = ${ee("uniforms.roi","i",i)};
        var roi_hi = ${ee("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${ee("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${ee("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,up=(e,t,n,r,i,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ee("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ee("uniforms.roi","i",a)};
          var roi_hi = ${ee("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${ee("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${ee("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,dp=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ee("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ca=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",cp=(e,t,n,r,i)=>{let[a,s,o,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${n[o]} - 1))`)};
      ${Ca(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${o}];
      ${r?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[o]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},pp=(e,t,n,r,i,a,s,o,l,d)=>{let c=n.length===2,[h,f]=c?[0,1]:[2,3],g=e.type.value,w=_=>{let T=_===h?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",_)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[_]},
        ${r[_]}, ${n[_]}, ${a[_]}, ${a[_]} + ${n.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${n[_]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${g} = originalIdx + ${g}(i);
          if (${T} < 0 || ${T} >= ${n[_]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${T} = max(0, min(${T}, ${n[_]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",_,`u32(${T})`)};
          data[i + 1] = ${_===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(h)};
    ${w(f)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},hp=(e,t,n,r,i)=>{let[a,s,o,l,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Ca(e,d,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${l}];
      ${r?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[o]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[o]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},fp=(e,t,n,r,i,a)=>{let s=e.dims,o=ap(a,t.axes,s.length),l=sp(s,r,i,t.axes),d=r.slice();r.length===0&&(d=s.map((x,C)=>x===0?1:l[C]/x),t.keepAspectRatioPolicy!=="stretch"&&(l=op(s,d,t)));let c=J("output",e.dataType,l.length),h=D("input",e.dataType,s.length),f=P.size(l),g=s.length===l.length&&s.every((x,C)=>x===l[C]),w=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,T=h.type.value,v=x=>`
      ${g?"":`
      ${rp(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${dp(h,s)};
              ${ip(t.nearestMode,n,T)};
              ${up(h,c,s,l,d.length,o.length,w)};
              `;case"linear":return`
              ${lp(c,s,l,d.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${cp(h,c,s,w,_)}`;if(s.length===3||s.length===5)return`${hp(h,c,s,w,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${pp(h,c,s,l,d,o,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(h,c)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${i.length>0?i:""}|${o.length>0?o:""}|${g}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:d},{type:1,data:o},...ne(s,l)]})}},mp=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Dg=(e,t)=>{let n=[],r=[],i=[],a=mp(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");np(e.inputs,t,a,n,r,i),e.compute(fp(e.inputs[0],t,a,n,r,i),{inputs:[0]})},Ug=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return ve({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:o,mode:l,nearestMode:d})}}),gp,bp,Lg,kx=q(()=>{ae(),le(),ue(),gp=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},bp=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,s=P.size(a),o=a,l=s,d=a.slice(-1)[0],c=r?a.slice(0,-1).concat(1):[],h=!i&&e.length>3,f=e.length>4,g=r&&n>1,w=r&&n>2,_=n>3,T=64,v=ze(d),x=[{type:12,data:l},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],C=E=>{let M=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[D("x",e[0].dataType,e[0].dims,v),D("skip",e[1].dataType,e[1].dims,v),D("gamma",e[2].dataType,e[2].dims,v)];h&&A.push(D("beta",e[3].dataType,e[3].dims,v)),f&&A.push(D("bias",e[4].dataType,e[4].dims,v)),A.push(J("output",e[0].dataType,o,v)),g&&A.push(J("mean_output",1,c)),w&&A.push(J("inv_std_output",1,c)),_&&A.push(J("input_skip_bias_sum",e[0].dataType,o,v));let $=Pe(e[0].dataType),O=Pe(1,v);return`

      ${E.registerUniforms(M).declareVariables(...A)}
      var<workgroup> sum_shared : array<${O}, ${T}>;
      var<workgroup> sum_squared_shared : array<${O}, ${T}>;

      ${E.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?"bias[offset1d + i]":$+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${xn($,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${qt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${qt("square_sum",v)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:o,dataType:e[0].dataType}];return n>1&&k.push({dims:c,dataType:1}),n>2&&k.push({dims:c,dataType:1}),n>3&&k.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${w};${_}`,inputDependencies:e.map((E,M)=>"type")},getShaderSource:C,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:x})}},Lg=(e,t)=>{gp(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(bp(e.inputs,t,e.outputCount,!1),{outputs:n})}}),yp,Hn,wp,Ea,_p,xp,Fg,Wg,Tx=q(()=>{ae(),le(),Ae(),ue(),yp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},Hn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},wp=(e,t)=>{if(e.length>1){let n=Hn(e,1),r=Hn(e,2),i=Hn(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),ve({starts:n,ends:r,axes:i})}else return t},Ea=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},_p=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${ee("uniforms.input_shape","i",n.length)};
            let steps_i = ${ee("uniforms.steps","i",n.length)};
            let signs_i = ${ee("uniforms.signs","i",n.length)};
            let starts_i = ${ee("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,xp=(e,t)=>{let n=e[0].dims,r=P.size(n),i=t.axes.length>0?P.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=Hn(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let s=t.starts.map((v,x)=>Ea(v,x,n,i,a)),o=t.ends.map((v,x)=>Ea(v,x,n,i,a));if(i.length!==s.length||i.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==n.length)for(let v=0;v<n.length;++v)i.includes(v)||(s.splice(v,0,0),o.splice(v,0,n[v]),a.splice(v,0,1));let l=a.map(v=>Math.sign(v));a.forEach((v,x,C)=>{if(v<0){let k=(o[x]-s[x])/v,E=s[x],M=E+k*a[x];s[x]=M,o[x]=E,C[x]=-v}});let d=n.slice(0);i.forEach((v,x)=>{d[v]=Math.ceil((o[v]-s[v])/a[v])});let c={dims:d,dataType:e[0].dataType},h=J("output",e[0].dataType,d.length),f=D("input",e[0].dataType,e[0].dims.length),g=P.size(d),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],_=[{type:12,data:g},{type:12,data:s},{type:6,data:l},{type:12,data:a},...ne(e[0].dims,d)],T=v=>`
      ${v.registerUniforms(w).declareVariables(f,h)}
        ${_p(f,h,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:_})}},Fg=(e,t)=>{yp(e.inputs,t);let n=wp(e.inputs,t);e.compute(xp(e.inputs,n),{inputs:[0]})},Wg=e=>{let t=e.starts,n=e.ends,r=e.axes;return ve({starts:t,ends:n,axes:r})}}),vp,$p,qg,Vg,Cx=q(()=>{ae(),le(),Ae(),Ht(),ue(),vp=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},$p=(e,t)=>{let n=e.inputs[0],r=n.dims,i=P.size(r),a=r.length,s=P.normalizeAxis(t.axis,a),o=s<r.length-1,l,d=[];o?(d=Array.from({length:a},(A,$)=>$),d[s]=a-1,d[a-1]=s,l=e.compute(nt(n,d),{inputs:[n],outputs:[-1]})[0]):l=n;let c=l.dims,h=c[a-1],f=i/h,g=ze(h),w=h/g,_=64;f===1&&(_=256);let T=(A,$)=>$===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:$===2?`max(${A}.x, ${A}.y)`:$===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,v=D("x",l.dataType,l.dims,g),x=J("result",l.dataType,l.dims,g),C=v.type.value,k=Pe(l.dataType)==="f32"?`var threadMax = ${C}(-3.4028234663852886e+38f);`:`var threadMax = ${C}(-65504.0h);`,E=A=>`
      var<workgroup> rowMaxShared : ${C};
      var<workgroup> rowSumShared : ${C};
      var<workgroup> threadShared : array<${C}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${C} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${C}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables(v,x)}
      ${A.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${C}(${T("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${C}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${C}(${qt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${C}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,M=e.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:w}]}),getShaderSource:E},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute(nt(M,d),{inputs:[M]})},qg=(e,t)=>{vp(e.inputs),$p(e,t)},Vg=e=>ve({axis:e.axis})}),Ia,Sp,kp,Tp,Hg,Ex=q(()=>{ae(),le(),ue(),Ia=e=>Array.from(e.getBigInt64Array(),Number),Sp=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ia(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},kp=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Tp=(e,t)=>{let n=e[0].dims,r=t??Ia(e[1]),i=kp(n,r),a=P.size(i),s=e[0].dataType,o=D("input",s,n.length),l=J("output",s,i.length),d=c=>`
      const inputShape = ${o.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(o,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ne(e[0].dims,i)]}),getShaderSource:d}},Hg=e=>{Sp(e.inputs),e.compute(Tp(e.inputs),{inputs:[0]})}}),Cp,Ep,Gg,Ix=q(()=>{ae(),le(),ue(),Cp=(e,t,n,r,i)=>{let a=J("output_data",i,n.length,4),s=D("a_data",t[1].dataType,t[1].dims.length,4),o=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),d,c=(h,f,g)=>`select(${f}, ${h}, ${g})`;if(!r)d=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(f,g,w="")=>{let _=`a_data[index_a${g}][component_a${g}]`,T=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${a.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_b${g} = ${o.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_c${g} = ${l.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${f}[${g}] = ${w}(${c(_,T,v)});
          `};i===9?d=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,o,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Ep=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(P.areEqual(t,n)&&P.areEqual(n,r)),s=t,o=P.size(t);if(a){let d=$n.calcShape($n.calcShape(t,n,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,o=P.size(s)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Cp(d,e,s,a,i),getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...ne(r,t,n,s)]})}},Gg=e=>{e.compute(Ep(e.inputs))}}),jg,zx=q(()=>{V_(),Rs(),H_(),G_(),j_(),K_(),X_(),ex(),nx(),rx(),ix(),ax(),sx(),ox(),lx(),ux(),dx(),cx(),px(),hx(),fx(),mx(),gx(),bx(),yx(),pg(),wx(),_x(),xx(),vx(),$x(),Ns(),Sx(),bg(),kx(),Tx(),Cx(),mg(),Ex(),Ht(),Ps(),Ix(),jg=new Map([["Abs",[Lf]],["Acos",[Ff]],["Acosh",[Wf]],["Add",[vm]],["ArgMax",[Of,es]],["ArgMin",[Pf,es]],["Asin",[qf]],["Asinh",[Vf]],["Atan",[Hf]],["Atanh",[Gf]],["Attention",[Bf]],["AveragePool",[Tg,kg]],["BatchNormalization",[Df]],["BiasAdd",[Uf]],["BiasSplitGelu",[xm]],["Cast",[Kf,jf]],["Ceil",[Yf]],["Clip",[Xf]],["Concat",[Am,Nm]],["Conv",[ss,as]],["ConvTranspose",[qm,Wm]],["Cos",[Zf]],["Cosh",[Qf]],["CumSum",[Vm,Hm]],["DepthToSpace",[Gm,jm]],["DequantizeLinear",[Ng,Rg]],["Div",[$m]],["Einsum",[Km,Xm]],["Elu",[Jf,Zn]],["Equal",[Sm]],["Erf",[em]],["Exp",[tm]],["Expand",[Ym]],["FastGelu",[Zm]],["Floor",[nm]],["FusedConv",[ss,as]],["Gather",[Jm,Qm]],["GatherElements",[ag,ig]],["GatherBlockQuantized",[ng,rg]],["GatherND",[eg,tg]],["Gelu",[rm]],["Gemm",[og,sg]],["GlobalAveragePool",[Eg,Cg]],["GlobalMaxPool",[Ag,Mg]],["Greater",[Em]],["GreaterOrEqual",[zm]],["GridSample",[lg,ug]],["GroupQueryAttention",[yg]],["HardSigmoid",[cm,dm]],["InstanceNormalization",[wg]],["LayerNormalization",[_g]],["LeakyRelu",[im,Zn]],["Less",[Im]],["LessOrEqual",[Mm]],["Log",[wm]],["MatMul",[xg]],["MatMulNBits",[vg,$g]],["MaxPool",[Ig,zg]],["Mul",[km]],["MultiHeadAttention",[cg,dg]],["Neg",[sm]],["Not",[am]],["Pad",[Sg]],["Pow",[Tm]],["QuickGelu",[_m,Zn]],["Range",[Pg]],["Reciprocal",[om]],["ReduceMin",[zf]],["ReduceMean",[kf]],["ReduceMax",[If]],["ReduceSum",[Af]],["ReduceProd",[Mf]],["ReduceL1",[Tf]],["ReduceL2",[Cf]],["ReduceLogSum",[Rf]],["ReduceLogSumExp",[Ef]],["ReduceSumSquare",[Nf]],["Relu",[lm]],["Resize",[Dg,Ug]],["RotaryEmbedding",[gg]],["ScatterND",[Bg,Og]],["Sigmoid",[um]],["Sin",[pm]],["Sinh",[hm]],["Slice",[Fg,Wg]],["SkipLayerNormalization",[Lg]],["Split",[hg,fg]],["Sqrt",[fm]],["Softmax",[qg,Vg]],["Sub",[Cm]],["Tan",[mm]],["Tanh",[gm]],["ThresholdedRelu",[ym,Zn]],["Tile",[Hg]],["Transpose",[hf,ff]],["Where",[Gg]]])}),Kg,Mx=q(()=>{at(),It(),ue(),Kg=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){$t(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of n)o.push({binding:o.length,resource:{buffer:d.buffer}});i&&o.push({binding:o.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),gt(e.programInfo.name)}dispose(){}build(e,t){$t(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{n.features.has(d.feature)&&r.push(`enable ${d.extension};`)});let i=pf(t,this.backend.device.limits),a=e.getShaderSource(i),s=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,o=n.createShaderModule({code:s,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=n.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return gt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Xg={};Cn(Xg,{WebGpuBackend:()=>Yg});var Ip,zp,Mp,Yg,Ax=q(()=>{at(),ae(),It(),of(),W_(),zx(),Mx(),Ip=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${i}`);break}case"rank":{let a=e[r].dims.length;n.push(`${i};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},zp=(e,t,n)=>{var i,a;let r=e.name;return(i=e.shaderCache)!=null&&i.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Ip(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,r},Mp=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Yg=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>t.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new Mp(t.info||await t.requestAdapterInfo()),this.gpuDataManager=df(this),this.programManager=new Kg(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Is(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$t(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var r;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=n[i],s=a.kernelId,o=this.kernels.get(s),l=o.kernelType,d=o.kernelName,c=a.programName,h=a.inputTensorViews,f=a.outputTensorViews,g=t[i*2],w=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),T=Number(w-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if((r=this.env.webgpu.profiling)!=null&&r.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(v=>({dims:v.dims,dataType:Ct(v.dataType)})),outputsMetadata:f.map(v=>({dims:v.dims,dataType:Ct(v.dataType)})),kernelId:s,kernelType:l,kernelName:d,programName:c,startTime:_,endTime:T});else{let v="";h.forEach((C,k)=>{v+=`input[${k}]: [${C.dims}] | ${Ct(C.dataType)}, `});let x="";f.forEach((C,k)=>{x+=`output[${k}]: [${C.dims}] | ${Ct(C.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${d}|${c}" ${v}${x}start time: ${_} ns, execution time: ${T-_} ns`)}Vr("GPU",`${c}::${g}::${w}`)}e.unmap(),this.pendingQueries.delete(e)}),gt()}run(e,t,n,r,i,a){$t(e.name);let s=[];for(let x=0;x<t.length;++x){let C=t[x].data;if(C===0)continue;let k=this.gpuDataManager.get(C);if(!k)throw new Error(`no GPU data for input: ${C}`);s.push(k)}let{outputs:o,dispatchGroup:l,programUniforms:d}=e.getRunData(t),c=n.length===0?o.map((x,C)=>C):n;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let h=[],f=[];for(let x=0;x<o.length;++x){if(!Number.isInteger(c[x])||c[x]<-3||c[x]>=a)throw new Error(`Invalid output index: ${c[x]}`);if(c[x]===-3)continue;let C=c[x]===-1,k=c[x]===-2,E=C||k?i(o[x].dataType,o[x].dims):r(c[x],o[x].dataType,o[x].dims);if(h.push(E),E.data===0)continue;let M=this.gpuDataManager.get(E.data);if(!M)throw new Error(`no GPU data for output: ${E.data}`);if(C&&this.temporaryData.push(M),k){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(M)}f.push(M)}if(s.length!==t.length||f.length!==h.length){if(f.length===0)return gt(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(d){let x=0,C=[];d.forEach(A=>{let $=typeof A.data=="number"?[A.data]:A.data;if($.length===0)return;let O=A.type===10?2:4,U,H;A.type===10?(H=$.length>4?16:$.length>2?8:$.length*O,U=$.length>4?16:O*$.length):(H=$.length<=2?$.length*O:16,U=16),x=Math.ceil(x/H)*H,C.push(x);let F=A.type===10?8:4;x+=$.length>4?Math.ceil($.length/F)*U:$.length*O});let k=16;x=Math.ceil(x/k)*k;let E=new ArrayBuffer(x);d.forEach((A,$)=>{let O=C[$],U=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(E,O,U.length).set(U);else if(A.type===12)new Uint32Array(E,O,U.length).set(U);else if(A.type===10)new Uint16Array(E,O,U.length).set(U);else if(A.type===1)new Float32Array(E,O,U.length).set(U);else throw new Error(`Unsupported uniform type: ${Ct(A.type)}`)});let M=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(M.buffer,0,E,0,x),this.gpuDataManager.release(M.id),g={offset:0,size:x,buffer:M.buffer}}let w=this.programManager.normalizeDispatchGroupSize(l),_=w[1]===1&&w[2]===1,T=zp(e,t,_),v=this.programManager.getArtifact(T);if(v||(v=this.programManager.build(e,w),this.programManager.setArtifact(T,v),ye("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let x=0;x<d.length;x++){let C=d[x],k=C.type,E=typeof C.data=="number"?1:C.data.length,[M,A]=v.uniformVariablesInfo[x];if(k!==M||E!==A)throw new Error(`Uniform variable ${x} mismatch: expect type ${M} with size ${A}, got type ${k} with size ${E} in program "${v.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(v,s,f,w,g),gt(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=jg.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,s=r.kernelEntry,o=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(d){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{l&&n.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),s=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[s,n]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await Za(this,e,t);return zs(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Zg={};Cn(Zg,{init:()=>Qg});var zr,Ap,Qg,Nx=q(()=>{ae(),It(),le(),F_(),zr=class Jg{constructor(t,n,r,i){this.module=t,this.dataType=n,this.data=r,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=P.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(P.size(t)!==P.size(this.dims))throw new Error("Invalid new shape");return new Jg(this.module,this.dataType,this.data,t)}},Ap=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*i++,a));let s=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,"*")),this.customDataSize=Number(e.getValue(r*i++,a));let o=[];for(let l=0;l<s;l++){let d=Number(e.getValue(r*i++,a)),c=Number(e.getValue(r*i++,"*")),h=Number(e.getValue(r*i++,a)),f=[];for(let g=0;g<h;g++)f.push(Number(e.getValue(r*i++,a)));o.push(new zr(e,d,c,f))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let n=((s=t==null?void 0:t.inputs)==null?void 0:s.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,r=(t==null?void 0:t.outputs)??[],i=(o,l,d)=>new zr(this.module,l,this.output(o,d),d),a=(o,l)=>{let d=nn(o,l);if(!d)throw new Error(`Unsupported data type: ${o}`);let c=d>0?this.backend.gpuDataManager.create(d).id:0;return new zr(this.module,o,c,l)};return this.backend.run(e,n,r,i,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=r===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let s=0;s<t.length;s++)this.module.setValue(a+r*(s+1),t[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},Qg=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Ax(),nr(Xg)).WebGpuBackend,s=new a;await s.initialize(n,r),i("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,l,d,c=!1)=>{if(c)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),s.memcpy(Number(o),Number(l));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let h=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));s.upload(Number(l),h)}},async(o,l,d)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>s.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>s.releaseKernel(o),(o,l,d,c)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let h=new Ap(t,s,Number(l));return s.computeKernel(Number(o),h,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new uf(n);i("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,o,l,d,c)=>a.ensureTensor(s,o,l,d,c),(s,o)=>{a.uploadTensor(s,o)},async(s,o)=>a.downloadTensor(s,o),(s,o)=>a.registerMLContext(s,o),!!n.trace])}}}),Np,Fs,Ws,Dt,Rp,za,Zr,qs,Vs,Ma,Hs,Gs,js,e0=q(()=>{at(),D_(),U_(),ae(),hn(),ks(),nf(),Np=(e,t)=>{Te()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},Fs=async e=>{Np(e.wasm.numThreads,Gr(e.logLevel))},Ws=async(e,t)=>{var r,i;(i=(r=Te()).asyncInit)==null||i.call(r);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:s}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(Nx(),nr(Zg)).init;t==="webgpu"&&await a("webgpu",Te(),e,n),t==="webnn"&&await a("webnn",Te(),e)}},Dt=new Map,Rp=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,i,i+r)!==0&&$e("Can't get session input/output count.");let a=r===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(n)}},za=(e,t)=>{let n=Te(),r=n.stackSave(),i=0;try{let a=n.PTR_SIZE,s=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&$e("Can't get session input/output metadata.");let o=Number(n.getValue(s,"*"));i=Number(n.getValue(s+a,"*"));let l=n.HEAP32[i/4];if(l===0)return[o,0];let d=n.HEAPU32[i/4+1],c=[];for(let h=0;h<d;h++){let f=Number(n.getValue(i+8+h*a,"*"));c.push(f!==0?n.UTF8ToString(f):Number(n.getValue(i+8+(h+d)*a,"*")))}return[o,l,c]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},Zr=e=>{let t=Te(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},qs=async(e,t)=>{var h,f,g,w;let n,r,i=Te();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Zr(e);let a=0,s=0,o=0,l=[],d=[],c=[];try{if([s,l]=await tf(t),(t==null?void 0:t.externalData)&&i.mountExternalData){let $=[];for(let O of t.externalData){let U=typeof O=="string"?O:O.path;$.push(Es(typeof O=="string"?O:O.data).then(H=>{i.mountExternalData(U,H)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof $!="string"){let O=$,U=O==null?void 0:O.context,H=O==null?void 0:O.gpuDevice,F=O==null?void 0:O.deviceType,K=O==null?void 0:O.powerPreference;U?i.currentContext=U:H?i.currentContext=await i.webnnCreateMLContext(H):i.currentContext=await i.webnnCreateMLContext({deviceType:F,powerPreference:K})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,s),(h=i.webgpuOnCreateSession)==null||h.call(i,a),a===0&&$e("Can't create a session."),(f=i.jsepOnCreateSession)==null||f.call(i),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[_,T]=Rp(a),v=!!(t!=null&&t.enableGraphCapture),x=[],C=[],k=[],E=[],M=[];for(let $=0;$<_;$++){let[O,U,H]=za(a,$);O===0&&$e("Can't get an input name."),d.push(O);let F=i.UTF8ToString(O);x.push(F),k.push(U===0?{name:F,isTensor:!1}:{name:F,isTensor:!0,type:Ct(U),shape:H})}for(let $=0;$<T;$++){let[O,U,H]=za(a,$+_);O===0&&$e("Can't get an output name."),c.push(O);let F=i.UTF8ToString(O);C.push(F),E.push(U===0?{name:F,isTensor:!1}:{name:F,isTensor:!0,type:Ct(U),shape:H});{if(v&&(t==null?void 0:t.preferredOutputLocation)===void 0){M.push("gpu-buffer");continue}let K=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((g=t==null?void 0:t.preferredOutputLocation)==null?void 0:g[F])??"cpu",R=i.webnnIsGraphOutput;if(K==="cpu"&&R&&R(a,F)){M.push("ml-tensor-cpu-output");continue}if(K!=="cpu"&&K!=="cpu-pinned"&&K!=="gpu-buffer"&&K!=="ml-tensor")throw new Error(`Not supported preferred output location: ${K}.`);if(v&&K!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${K}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);M.push(K)}}let A=null;return M.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(o=i._OrtCreateBinding(a),o===0&&$e("Can't create IO binding."),A={handle:o,outputPreferredLocations:M,outputPreferredLocationsEncoded:M.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>Xa($))}),Dt.set(a,[a,d,c,A,v,!1]),[a,x,C,k,E]}catch(_){throw d.forEach(T=>i._OrtFree(T)),c.forEach(T=>i._OrtFree(T)),o!==0&&i._OrtReleaseBinding(o)!==0&&$e("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&$e("Can't release session."),_}finally{i._free(n),s!==0&&i._OrtReleaseSessionOptions(s)!==0&&$e("Can't release session options."),l.forEach(_=>i._free(_)),(w=i.unmountExternalData)==null||w.call(i)}},Vs=e=>{var l,d,c;let t=Te(),n=Dt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,s,o]=n;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&$e("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&$e("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(d=t.webnnOnReleaseSession)==null||d.call(t,e),(c=t.webgpuOnReleaseSession)==null||c.call(t,e),i.forEach(h=>t._OrtFree(h)),a.forEach(h=>t._OrtFree(h)),t._OrtReleaseSession(r)!==0&&$e("Can't release session."),Dt.delete(e)},Ma=async(e,t,n,r,i,a,s=!1)=>{if(!e){t.push(0);return}let o=Te(),l=o.PTR_SIZE,d=e[0],c=e[1],h=e[3],f=h,g,w;if(d==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let v=e[2].gpuBuffer;w=nn(tn(d),c);{let x=o.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=x(r,a,v,w)}}else if(h==="ml-tensor"){let v=e[2].mlTensor;w=nn(tn(d),c);let x=o.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=x(r,v,tn(d),c)}else{let v=e[2];if(Array.isArray(v)){w=l*v.length,g=o._malloc(w),n.push(g);for(let x=0;x<v.length;x++){if(typeof v[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);o.setValue(g+x*l,ht(v[x],n),"*")}}else{let x=o.webnnIsGraphInput,C=o.webnnIsGraphOutput;if(d!=="string"&&x&&C){let k=o.UTF8ToString(i);if(x(r,k)||C(r,k)){let E=tn(d);w=nn(E,c),f="ml-tensor";let M=o.webnnCreateTemporaryTensor,A=o.webnnUploadTensor;if(!M||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await M(r,E,c);A($,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),g=$}else w=v.byteLength,g=o._malloc(w),n.push(g),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,w),g)}else w=v.byteLength,g=o._malloc(w),n.push(g),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,w),g)}}let _=o.stackSave(),T=o.stackAlloc(4*c.length);try{c.forEach((x,C)=>o.setValue(T+C*l,x,l===4?"i32":"i64"));let v=o._OrtCreateTensor(tn(d),g,w,T,c.length,Xa(f));v===0&&$e(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(v)}finally{o.stackRestore(_)}},Hs=async(e,t,n,r,i,a)=>{var F,K,R,Z;let s=Te(),o=s.PTR_SIZE,l=Dt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],c=l[1],h=l[2],f=l[3],g=l[4],w=l[5],_=t.length,T=r.length,v=0,x=[],C=[],k=[],E=[],M=[],A=s.stackSave(),$=s.stackAlloc(_*o),O=s.stackAlloc(_*o),U=s.stackAlloc(T*o),H=s.stackAlloc(T*o);try{[v,x]=ef(a),on("wasm prepareInputOutputTensor");for(let W=0;W<_;W++)await Ma(n[W],C,E,e,c[t[W]],t[W],g);for(let W=0;W<T;W++)await Ma(i[W],k,E,e,h[r[W]],_+r[W],g);ln("wasm prepareInputOutputTensor");for(let W=0;W<_;W++)s.setValue($+W*o,C[W],"*"),s.setValue(O+W*o,c[t[W]],"*");for(let W=0;W<T;W++)s.setValue(U+W*o,k[W],"*"),s.setValue(H+W*o,h[r[W]],"*");if(f&&!w){let{handle:W,outputPreferredLocations:re,outputPreferredLocationsEncoded:L}=f;if(c.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${c.length}).`);on("wasm bindInputsOutputs");for(let G=0;G<_;G++){let X=t[G];await s._OrtBindInput(W,c[X],C[G])!==0&&$e(`Can't bind input[${G}] for session=${e}.`)}for(let G=0;G<T;G++){let X=r[G];(F=i[G])!=null&&F[3]?(M.push(k[G]),s._OrtBindOutput(W,h[X],k[G],0)!==0&&$e(`Can't bind pre-allocated output[${G}] for session=${e}.`)):s._OrtBindOutput(W,h[X],0,L[X])!==0&&$e(`Can't bind output[${G}] to ${re[G]} for session=${e}.`)}ln("wasm bindInputsOutputs"),Dt.set(e,[d,c,h,f,g,!0])}(K=s.jsepOnRunStart)==null||K.call(s,d),(R=s.webnnOnRunStart)==null||R.call(s,d);let Q;f?Q=await s._OrtRunWithBinding(d,f.handle,T,U,v):Q=await s._OrtRun(d,O,$,_,H,T,U,v),Q!==0&&$e("failed to call OrtRun().");let te=[],ie=[];on("wasm ProcessOutputTensor");for(let W=0;W<T;W++){let re=Number(s.getValue(U+W*o,"*"));if(re===k[W]||M.includes(k[W])){te.push(i[W]),re!==k[W]&&s._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.");continue}let L=s.stackSave(),G=s.stackAlloc(4*o),X=!1,V,_e=0;try{s._OrtGetTensorData(re,G,G+o,G+2*o,G+3*o)!==0&&$e(`Can't access output tensor data on index ${W}.`);let qe=o===4?"i32":"i64",Ie=Number(s.getValue(G,qe));_e=s.getValue(G+o,"*");let Be=s.getValue(G+o*2,"*"),je=Number(s.getValue(G+o*3,qe)),Ye=[];for(let Ce=0;Ce<je;Ce++)Ye.push(Number(s.getValue(Be+Ce*o,qe)));s._OrtFree(Be)!==0&&$e("Can't free memory for tensor dims.");let Ke=Ye.reduce((Ce,se)=>Ce*se,1);V=Ct(Ie);let Mt=f==null?void 0:f.outputPreferredLocations[r[W]];if(V==="string"){if(Mt==="gpu-buffer"||Mt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let se=0;se<Ke;se++){let Ze=s.getValue(_e+se*o,"*"),sr=s.getValue(_e+(se+1)*o,"*"),Mn=se===Ke-1?void 0:sr-Ze;Ce.push(s.UTF8ToString(Ze,Mn))}te.push([V,Ye,Ce,"cpu"])}else if(Mt==="gpu-buffer"&&Ke>0){let Ce=s.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let se=Ce(_e),Ze=nn(Ie,Ke);if(Ze===void 0||!Ts(V))throw new Error(`Unsupported data type: ${V}`);X=!0,te.push([V,Ye,{gpuBuffer:se,download:s.jsepCreateDownloader(se,Ze,V),dispose:()=>{s._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(Mt==="ml-tensor"&&Ke>0){let Ce=s.webnnEnsureTensor,se=s.webnnIsGraphInputOutputTypeSupported;if(!Ce||!se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(nn(Ie,Ke)===void 0||!Cs(V))throw new Error(`Unsupported data type: ${V}`);if(!se(e,V,!1))throw new Error(`preferredLocation "ml-tensor" for ${V} output is not supported by current WebNN Context.`);let Ze=await Ce(e,_e,Ie,Ye,!1);X=!0,te.push([V,Ye,{mlTensor:Ze,download:s.webnnCreateMLTensorDownloader(_e,V),dispose:()=>{s.webnnReleaseTensorId(_e),s._OrtReleaseTensor(re)}},"ml-tensor"])}else if(Mt==="ml-tensor-cpu-output"&&Ke>0){let Ce=s.webnnCreateMLTensorDownloader(_e,V)(),se=te.length;X=!0,ie.push((async()=>{let Ze=[se,await Ce];return s.webnnReleaseTensorId(_e),s._OrtReleaseTensor(re),Ze})()),te.push([V,Ye,[],"cpu"])}else{let Ce=si(V),se=new Ce(Ke);new Uint8Array(se.buffer,se.byteOffset,se.byteLength).set(s.HEAPU8.subarray(_e,_e+se.byteLength)),te.push([V,Ye,se,"cpu"])}}finally{s.stackRestore(L),V==="string"&&_e&&s._free(_e),X||s._OrtReleaseTensor(re)}}f&&!g&&(s._OrtClearBoundOutputs(f.handle)!==0&&$e("Can't clear bound outputs."),Dt.set(e,[d,c,h,f,g,!1]));for(let[W,re]of await Promise.all(ie))te[W][2]=re;return ln("wasm ProcessOutputTensor"),te}finally{(Z=s.webnnOnRunEnd)==null||Z.call(s,d),s.stackRestore(A),C.forEach(Q=>s._OrtReleaseTensor(Q)),k.forEach(Q=>s._OrtReleaseTensor(Q)),E.forEach(Q=>s._free(Q)),v!==0&&s._OrtReleaseRunOptions(v),x.forEach(Q=>s._free(Q))}},Gs=e=>{let t=Te(),n=Dt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],i=t._OrtEndProfiling(r);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},js=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),Ut,Xe,wn,Gn,jn,Mr,Aa,Ar,Qt,Jt,Pp,t0,n0,r0,i0,a0,s0,o0,l0=q(()=>{at(),e0(),hn(),$s(),Ut=()=>!!Se.wasm.proxy&&typeof document<"u",wn=!1,Gn=!1,jn=!1,Ar=new Map,Qt=(e,t)=>{let n=Ar.get(e);n?n.push(t):Ar.set(e,[t])},Jt=()=>{if(wn||!Gn||jn||!Xe)throw new Error("worker not ready")},Pp=e=>{switch(e.data.type){case"init-wasm":wn=!1,e.data.err?(jn=!0,Aa[1](e.data.err)):(Gn=!0,Aa[0]()),Mr&&(URL.revokeObjectURL(Mr),Mr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Ar.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},t0=async()=>{if(!Gn){if(wn)throw new Error("multiple calls to 'initWasm()' detected.");if(jn)throw new Error("previous call to 'initWasm()' failed.");if(wn=!0,Ut())return new Promise((e,t)=>{Xe==null||Xe.terminate(),Qh().then(([n,r])=>{try{Xe=r,Xe.onerror=a=>t(a),Xe.onmessage=Pp,Aa=[e,t];let i={type:"init-wasm",in:Se};!i.in.wasm.wasmPaths&&(n||Ka)&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href}),Xe.postMessage(i),Mr=n}catch(i){t(i)}},t)});try{await Ss(Se.wasm),await Fs(Se),Gn=!0}catch(e){throw jn=!0,e}finally{wn=!1}}},n0=async e=>{if(Ut())return Jt(),new Promise((t,n)=>{Qt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:Se}};Xe.postMessage(r)});await Ws(Se,e)},r0=async e=>Ut()?(Jt(),new Promise((t,n)=>{Qt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Xe.postMessage(r,[e.buffer])})):Zr(e),i0=async(e,t)=>{if(Ut()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Jt(),new Promise((n,r)=>{Qt("create",[n,r]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Xe.postMessage(i,a)})}else return qs(e,t)},a0=async e=>{if(Ut())return Jt(),new Promise((t,n)=>{Qt("release",[t,n]);let r={type:"release",in:e};Xe.postMessage(r)});Vs(e)},s0=async(e,t,n,r,i,a)=>{if(Ut()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Jt(),new Promise((s,o)=>{Qt("run",[s,o]);let l=n,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};Xe.postMessage(d,js(l))})}else return Hs(e,t,n,r,i,a)},o0=async e=>{if(Ut())return Jt(),new Promise((t,n)=>{Qt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Xe.postMessage(r)});Gs(e)}}),Na,Op,u0,Rx=q(()=>{at(),l0(),ae(),vs(),nf(),Na=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Op=e=>{switch(e[3]){case"cpu":return new ft(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ts(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return ft.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case"ml-tensor":{let t=e[0];if(!Cs(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return ft.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},u0=class{async fetchModelAndCopyToWasmMemory(e){return r0(await Es(e))}async loadModel(e,t){$t();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await i0(n,t),gt()}async dispose(){return a0(this.sessionId)}async run(e,t,n){$t();let r=[],i=[];Object.entries(e).forEach(h=>{let f=h[0],g=h[1],w=this.inputNames.indexOf(f);if(w===-1)throw new Error(`invalid input '${f}'`);r.push(g),i.push(w)});let a=[],s=[];Object.entries(t).forEach(h=>{let f=h[0],g=h[1],w=this.outputNames.indexOf(f);if(w===-1)throw new Error(`invalid output '${f}'`);a.push(g),s.push(w)});let o=r.map((h,f)=>Na(h,()=>`input "${this.inputNames[i[f]]}"`)),l=a.map((h,f)=>h?Na(h,()=>`output "${this.outputNames[s[f]]}"`):null),d=await s0(this.sessionId,i,o,s,l,n),c={};for(let h=0;h<d.length;h++)c[this.outputNames[s[h]]]=a[h]??Op(d[h]);return gt(),c}startProfiling(){}endProfiling(){o0(this.sessionId)}}}),d0={};Cn(d0,{OnnxruntimeWebAssemblyBackend:()=>us,initializeFlags:()=>ls,wasmBackend:()=>c0});var ls,us,c0,Px=q(()=>{at(),l0(),Rx(),ls=()=>{(typeof Se.wasm.initTimeout!="number"||Se.wasm.initTimeout<0)&&(Se.wasm.initTimeout=0);let e=Se.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Se.wasm.simd=!1),typeof Se.wasm.proxy!="boolean"&&(Se.wasm.proxy=!1),typeof Se.wasm.trace!="boolean"&&(Se.wasm.trace=!1),typeof Se.wasm.numThreads!="number"||!Number.isInteger(Se.wasm.numThreads)||Se.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Se.wasm.numThreads=1;else{let t=typeof navigator>"u"?__("node:os").cpus().length:navigator.hardwareConcurrency;Se.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},us=class{async init(e){ls(),await t0(),await n0(e)}async createInferenceSessionHandler(e,t){let n=new u0;return await n.loadModel(e,t),n}},c0=new us});at();at();at();var Ox="1.26.0";{let e=(Px(),nr(d0)).wasmBackend;_n("webgpu",e,5),_n("webnn",e,5),_n("cpu",e,10),_n("wasm",e,10)}Object.defineProperty(Se.versions,"web",{value:Ox,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function st(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const rn=class rn{constructor(){Re(this,"customModelPaths",new Map);Re(this,"baseUrl","/models");Re(this,"webnnEnabled",!1);Re(this,"webnnDeviceType","gpu");Re(this,"webnnPowerPreference","default");Re(this,"webgpuEnabled",!1);Re(this,"webgpuPowerPreference","default");Re(this,"generalLoggingEnabled",!1);Re(this,"performanceLoggingEnabled",!1);Re(this,"onnxProfilingEnabled",!1);Re(this,"sessionCacheBypass",!1);Re(this,"modelCacheBypass",!1);this.initializeDefaultPaths()}static getInstance(){return rn.instance||(rn.instance=new rn),rn.instance}initializeDefaultPaths(){this.customModelPaths.clear()}setCustomModelPath(t,n){this.customModelPaths.set(t,n),this.generalLoggingEnabled&&console.log(`Set custom model path for ${t}: ${n}`)}getCustomModelPath(t){return this.customModelPaths.get(t)}getAllModelPaths(){return new Map(this.customModelPaths)}hasCustomPath(t){const n=this.customModelPaths.get(t);return n!==void 0&&n!==""}resetToDefaults(){this.baseUrl="/models",this.customModelPaths.clear(),this.initializeDefaultPaths(),this.generalLoggingEnabled&&console.log("Reset all model paths to defaults")}removeCustomPath(t){this.customModelPaths.has(t)&&(this.customModelPaths.delete(t),this.generalLoggingEnabled&&console.log(`Removed custom path for ${t}`))}getAvailableModels(){return["u2net","u2netp","u2net_human_seg","u2net_cloth_seg","isnet-general-use","isnet-anime","silueta","u2net_custom"]}setBaseUrl(t){this.baseUrl=t,this.generalLoggingEnabled&&console.log(`Set base URL for models: ${t}`),this.initializeDefaultPaths()}getBaseUrl(){return this.baseUrl}enableWebNN(t){this.webnnEnabled=t,this.generalLoggingEnabled&&console.log(`WebNN support ${t?"enabled":"disabled"} globally`)}setWebNNDeviceType(t){this.webnnDeviceType=t,this.generalLoggingEnabled&&console.log(`WebNN device type set to: ${t}`)}setWebNNPowerPreference(t){this.webnnPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebNN power preference set to: ${t}`)}isWebNNEnabled(){return this.webnnEnabled}getWebNNDeviceType(){return this.webnnDeviceType}getWebNNPowerPreference(){return this.webnnPowerPreference}getWebNNConfig(){return{enabled:this.webnnEnabled,deviceType:this.webnnDeviceType,powerPreference:this.webnnPowerPreference}}resetWebNNSettings(){this.webnnEnabled=!1,this.webnnDeviceType="gpu",this.webnnPowerPreference="default",this.generalLoggingEnabled&&console.log("WebNN settings reset to defaults")}enableWebGPU(t){this.webgpuEnabled=t,this.generalLoggingEnabled&&console.log(`WebGPU support ${t?"enabled":"disabled"} globally`)}setWebGPUPowerPreference(t){this.webgpuPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebGPU power preference set to: ${t}`)}isWebGPUEnabled(){return this.webgpuEnabled}getWebGPUPowerPreference(){return this.webgpuPowerPreference}getWebGPUConfig(){return{enabled:this.webgpuEnabled,powerPreference:this.webgpuPowerPreference}}resetWebGPUSettings(){this.webgpuEnabled=!1,this.webgpuPowerPreference="default",this.generalLoggingEnabled&&console.log("WebGPU settings reset to defaults")}enableGeneralLogging(t){this.generalLoggingEnabled=t,this.generalLoggingEnabled&&console.log(`General logging ${t?"enabled":"disabled"}`)}enablePerformanceLogging(t){this.performanceLoggingEnabled=t,this.performanceLoggingEnabled&&console.log(`Performance logging ${t?"enabled":"disabled"}`)}isGeneralLoggingEnabled(){return this.generalLoggingEnabled}isPerformanceLoggingEnabled(){return this.performanceLoggingEnabled}enableONNXProfiling(t){this.onnxProfilingEnabled=t,this.onnxProfilingEnabled&&console.log(`ONNX profiling ${t?"enabled":"disabled"}`)}isONNXProfilingEnabled(){return this.onnxProfilingEnabled}getLoggingConfig(){return{generalLogging:this.generalLoggingEnabled,performanceLogging:this.performanceLoggingEnabled,onnxProfiling:this.onnxProfilingEnabled}}resetLoggingSettings(){this.generalLoggingEnabled=!1,this.performanceLoggingEnabled=!1,this.onnxProfilingEnabled=!1,this.generalLoggingEnabled&&console.log("Logging settings reset to defaults")}setSessionCacheBypass(t){this.sessionCacheBypass=t,this.generalLoggingEnabled&&console.log(`Session cache bypass ${t?"enabled":"disabled"} globally`)}setModelCacheBypass(t){this.modelCacheBypass=t,this.generalLoggingEnabled&&console.log(`Model cache bypass ${t?"enabled":"disabled"} globally`)}isSessionCacheBypassEnabled(){return this.sessionCacheBypass}isModelCacheBypassEnabled(){return this.modelCacheBypass}getCacheBypassConfig(){return{sessionCacheBypass:this.sessionCacheBypass,modelCacheBypass:this.modelCacheBypass}}resetCacheBypassSettings(){this.sessionCacheBypass=!1,this.modelCacheBypass=!1,this.generalLoggingEnabled&&console.log("Cache bypass settings reset to defaults")}};Re(rn,"instance");let ds=rn;const Me=ds.getInstance();function be(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function Ks(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function oe(...e){Me.isPerformanceLoggingEnabled()&&console.log(...e)}function Fe(...e){console.warn(...e)}function En(...e){console.error(...e)}function zt(e){return function(t,n,r){const i=r.value,a=n;return r.value=async function(...s){const o=performance.now();oe(`[${a}] Starting execution...`);try{const l=await i.apply(this,s),c=performance.now()-o;return oe(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-o;throw En(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function Xs(e){return function(t,n,r){const i=r.value,a=n;return r.value=function(...s){const o=performance.now();oe(`[${a}] Starting execution...`);try{const l=i.apply(this,s),c=performance.now()-o;return oe(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-o;throw En(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function Ra(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Failed to get context for canvas");return n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",e instanceof HTMLImageElement?(t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0)):(t.width=e.width,t.height=e.height,n.putImageData(e,0,0)),t}function Bx(e){const t=performance.now();return be(`[fileToImage] Converting ${e instanceof File?e.name:"blob"} (${(e.size/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Image,a=URL.createObjectURL(e);i.onload=()=>{const s=performance.now()-t;oe(`[fileToImage] Image loaded: ${s.toFixed(2)}ms (${i.naturalWidth}x${i.naturalHeight})`),URL.revokeObjectURL(a),n(i)},i.onerror=s=>{const o=performance.now()-t;En(`[fileToImage] Image load failed: ${o.toFixed(2)}ms`,s),URL.revokeObjectURL(a),r(s)},i.src=a})}function Dx(e){const t=performance.now();return be(`[arrayBufferToImage] Converting buffer (${(e.byteLength/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Blob([e]),a=new Image,s=URL.createObjectURL(i);a.onload=()=>{const o=performance.now()-t;oe(`[arrayBufferToImage] Image loaded: ${o.toFixed(2)}ms (${a.naturalWidth}x${a.naturalHeight})`),URL.revokeObjectURL(s),n(a)},a.onerror=o=>{const l=performance.now()-t;En(`[arrayBufferToImage] Image load failed: ${l.toFixed(2)}ms`,o),URL.revokeObjectURL(s),r(o)},a.src=s})}function Bp(e,t="image/png"){const n=performance.now();return be(`[canvasToBlob] Converting ${e.width}x${e.height} canvas to ${t}...`),new Promise((r,i)=>{e.toBlob(a=>{const s=performance.now()-n;a?(oe(`[canvasToBlob] Conversion complete: ${s.toFixed(2)}ms (${(a.size/1024).toFixed(1)}KB)`),r(a)):(En(`[canvasToBlob] Conversion failed: ${s.toFixed(2)}ms`),i(new Error("Failed to convert canvas to blob")))},t)})}function Ux(e,t,n="input.1"){const r=performance.now(),i=document.createElement("canvas");i.width=t.size[0],i.height=t.size[1];const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for temp canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(e,0,0,t.size[0],t.size[1]);const s=performance.now(),l=a.getImageData(0,0,t.size[0],t.size[1]).data,d=t.size[0],c=t.size[1];let h=0;for(let x=0;x<l.length;x+=4){const C=l[x]/255,k=l[x+1]/255,E=l[x+2]/255;h=Math.max(h,C,k,E)}const f=Math.max(h,1e-6),g=performance.now(),w=new Float32Array(3*c*d);for(let x=0;x<c;x++)for(let C=0;C<d;C++){const k=(x*d+C)*4,E=l[k]/255,M=l[k+1]/255,A=l[k+2]/255,$=E/f,O=M/f,U=A/f,H=($-t.mean[0])/t.std[0],F=(O-t.mean[1])/t.std[1],K=(U-t.mean[2])/t.std[2];w[x*d+C]=H,w[c*d+x*d+C]=F,w[2*c*d+x*d+C]=K}const _=performance.now(),T=new ft("float32",w,[1,3,c,d]),v=performance.now();return oe(`[normalizeImage] Performance:
    - Resize: ${(s-r).toFixed(2)}ms
    - Max find: ${(g-s).toFixed(2)}ms
    - Normalize: ${(_-g).toFixed(2)}ms
    - Tensor: ${(v-_).toFixed(2)}ms
    - Total: ${(v-r).toFixed(2)}ms
    - Max value: ${h.toFixed(6)}, Divisor: ${f.toFixed(6)}`),{[n]:T}}function Lx(e,t=[1,1,320,320]){const[,,n,r]=t,i=performance.now(),a=e.slice(0,n*r);e.length!==n*r&&Fe("[normalizeMask] Mask length does not match output shape",{maskLength:e.length,outputShape:`${n}x${r}=${n*r}`});const s=performance.now()-i;oe(`[processModelOutput] Data extraction: ${s.toFixed(2)}ms`);const o=performance.now();let l=a[0],d=a[0];for(let w=1;w<a.length;w++)a[w]<l&&(l=a[w]),a[w]>d&&(d=a[w]);const c=performance.now()-o;oe(`[processModelOutput] Min/max calculation: ${c.toFixed(2)}ms (min=${l.toFixed(6)}, max=${d.toFixed(6)})`);const h=performance.now(),f=new Float32Array(a.length);for(let w=0;w<a.length;w++)f[w]=(a[w]-l)/(d-l);const g=performance.now()-h;return oe(`[processModelOutput] Normalization: ${g.toFixed(2)}ms`),f}function Fx(e,{width:t,height:n}){const r=performance.now(),i=document.createElement("canvas");i.width=t,i.height=n;const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for mask canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const s=a.createImageData(t,n);for(let l=0;l<e.length;l++){const d=Math.round(e[l]*255),c=l*4;s.data[c]=d,s.data[c+1]=d,s.data[c+2]=d,s.data[c+3]=255}a.putImageData(s,0,0);const o=performance.now()-r;return oe(`[processModelOutput] Canvas creation: ${o.toFixed(2)}ms`),i}function Wx(e,t){const n=performance.now(),{width:r,height:i}=e,a=document.createElement("canvas");a.width=t.width,a.height=t.height;const s=a.getContext("2d");if(!s)throw new Error("Failed to get context for resized canvas");s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(e,0,0,t.width,t.height);const o=performance.now()-n;return oe(`[processModelOutput] Resize: ${o.toFixed(2)}ms (${r}x${i} → ${t.width}x${t.height})`),a}function p0(e,t,n=[1,1,320,320]){const r=performance.now();be(`[processModelOutput] Processing output (${e.length} values) for ${t.width}x${t.height} image...`);const i=Lx(e,n),[,,a,s]=n,o=Fx(i,{width:s,height:a}),l=Wx(o,t),d=performance.now()-r;return oe(`[processModelOutput] Total processing: ${d.toFixed(2)}ms`),l}function qx(e,t){const n=performance.now();be(`[naiveCutout] Creating cutout for ${e.width}x${e.height} image...`);const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d");if(!i)throw new Error("Failed to get context for result canvas");const a=performance.now();i.drawImage(e,0,0);const s=performance.now()-a;oe(`[naiveCutout] Image draw: ${s.toFixed(2)}ms`);const o=performance.now(),l=i.getImageData(0,0,r.width,r.height),d=t.getContext("2d");if(!d)throw new Error("Failed to get context for mask canvas");const c=d.getImageData(0,0,t.width,t.height),h=performance.now()-o;oe(`[naiveCutout] Data extraction: ${h.toFixed(2)}ms`);const f=performance.now();for(let v=0;v<l.data.length;v+=4){const x=v,C=c.data[x];l.data[v+3]=C}const g=performance.now()-f;oe(`[naiveCutout] Mask application: ${g.toFixed(2)}ms`);const w=performance.now();i.putImageData(l,0,0);const _=performance.now()-w;oe(`[naiveCutout] Put image data: ${_.toFixed(2)}ms`);const T=performance.now()-n;return oe(`[naiveCutout] Total cutout creation: ${T.toFixed(2)}ms`),r}function Vx(e,t){const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");if(!r)throw new Error("Failed to get context for result canvas");return r.fillStyle=`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]/255})`,r.fillRect(0,0,n.width,n.height),r.drawImage(e,0,0),n}function Hx(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");return n.filter="blur(2px)",n.drawImage(e,0,0),n.filter="none",t}function Gx(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");n.drawImage(e,0,0);const r=n.getImageData(0,0,t.width,t.height),i=r.data;for(let a=0;a<i.length;a+=4){const s=i[a];i[a]=s,i[a+1]=s,i[a+2]=s,i[a+3]=255}return n.putImageData(r,0,0),t}const jx={"u2net.onnx":"a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456","u2netp.onnx":"b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567","u2net_human_seg.onnx":"c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678","u2net_cloth_seg.onnx":"d4e5f6789012345678901234567890abcdef1234567890abcdef123456789","silueta.onnx":"75da6c8d2f8096ec743d071951be73b4a8bc7b3e51d9a6625d63644f90ffeedb"};async function Kx(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function Xx(e,t){try{const n=jx[e];if(!n)return console.warn(`No hash available for model: ${e}`),!0;const r=await Kx(t),i=r===n;return i||(console.error(`Model integrity check failed for ${e}`),console.error(`Expected: ${n}`),console.error(`Actual: ${r}`)),i}catch(n){return console.error(`Error verifying model integrity for ${e}:`,n),!1}}function Yx(e,t){const r=t.byteLength/(1024*1024),a={"u2net.onnx":{min:170,max:180},"u2netp.onnx":{min:4,max:5},"u2net_human_seg.onnx":{min:170,max:180},"u2net_cloth_seg.onnx":{min:170,max:180},"silueta.onnx":{min:40,max:50}}[e];if(!a)return console.warn(`No size validation available for model: ${e}`),!0;const s=r>=a.min&&r<=a.max;return s||(console.error(`Model size validation failed for ${e}`),console.error(`Expected: ${a.min}-${a.max}MB, got: ${r.toFixed(2)}MB`)),s}async function Dp(e,t){return!(!Yx(e,t)||!await Xx(e,t))}function h0(){try{return typeof navigator<"u"&&"gpu"in navigator&&typeof navigator.gpu=="object"&&navigator.gpu!==null}catch(e){return Ks("WebGPU availability check failed:",e),!1}}function Zx(e){return e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Fe(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}function f0(){try{return typeof navigator<"u"&&"ml"in navigator&&typeof navigator.ml=="object"&&navigator.ml!==null}catch(e){return Ks("WebNN availability check failed:",e),!1}}function Qx(e={}){const t=performance.now();be("[getExecutionProviders] Determining execution providers...");const n=[];if(be("[getExecutionProviders] Input options:",{executionProviders:e.executionProviders,preferWebNN:e.preferWebNN,webnnDeviceType:e.webnnDeviceType,webnnPowerPreference:e.webnnPowerPreference,preferWebGPU:e.preferWebGPU,webgpuPowerPreference:e.webgpuPowerPreference}),e.executionProviders&&e.executionProviders.length>0){const f=performance.now()-t;return oe(`[getExecutionProviders] Using explicit providers: ${f.toFixed(2)}ms`),be(`[getExecutionProviders] Using explicit execution providers: ${e.executionProviders.join(", ")}`),[...e.executionProviders]}const r=performance.now(),i=e.preferWebNN??!1,a=f0(),s=performance.now()-r;oe(`[getExecutionProviders] WebNN preference check: ${s.toFixed(2)}ms`),be(`[getExecutionProviders] WebNN status: preferWebNN=${i}, available=${a}`),i&&a?(n.push("webnn"),be("[getExecutionProviders] WebNN execution provider added to preference list")):i&&!a&&Fe("[getExecutionProviders] WebNN was preferred but is not available in this browser");const o=performance.now(),l=e.preferWebGPU??!1,d=h0(),c=performance.now()-o;oe(`[getExecutionProviders] WebGPU preference check: ${c.toFixed(2)}ms`),be(`[getExecutionProviders] WebGPU status: preferWebGPU=${l}, available=${d}`),l&&d?(n.push("webgpu"),be("[getExecutionProviders] WebGPU execution provider added to preference list")):l&&!d&&Fe("[getExecutionProviders] WebGPU was preferred but is not available in this browser"),n.push("webgl","cpu");const h=performance.now()-t;return oe(`[getExecutionProviders] Provider selection complete: ${h.toFixed(2)}ms (${n.join(", ")})`),n}function Jx(e){return e!=null&&e.webnnDeviceType&&!["cpu","gpu","npu"].includes(e.webnnDeviceType)?(Fe(`Invalid WebNN device type: ${e.webnnDeviceType}`),!1):e!=null&&e.webnnPowerPreference&&!["default","low-power","high-performance"].includes(e.webnnPowerPreference)?(Fe(`Invalid WebNN power preference: ${e.webnnPowerPreference}`),!1):e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Fe(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}const Lt={simd:!0,proxy:!1,numThreads:4};function m0(e=Lt){Se.wasm.simd=e.simd??Lt.simd,Se.wasm.proxy=e.proxy??Lt.proxy,Se.wasm.numThreads=e.numThreads??Lt.numThreads}m0();class Oe{constructor(t,n={}){Re(this,"modelName");Re(this,"session",null);Re(this,"modelData",null);Re(this,"options");this.modelName=t,this.options={...Lt,...n},this.options.simd=this.options.simd??Lt.simd,this.options.proxy=this.options.proxy??Lt.proxy,this.options.numThreads=this.options.numThreads??Lt.numThreads,m0(this.options)}emitProgress(t,n,r){this.options.onProgress&&this.options.onProgress({step:t,progress:n,message:r})}async initialize(){if(be(`[${this.modelName}] Starting session initialization...`),this.emitProgress("initializing",0,"Starting session initialization..."),this.session){be(`[${this.modelName}] Session already initialized, skipping`),this.emitProgress("initializing",100,"Session already initialized, skipping");return}this.emitProgress("initializing",20,"Validating configuration..."),await this.validateConfiguration(),this.emitProgress("initializing",50,"Downloading model..."),this.modelData=await this.downloadModel(),this.emitProgress("initializing",60,"Setting up execution providers...");const t=await this.setupExecutionProviders();this.emitProgress("initializing",80,"Creating session..."),await this.createSession(t),this.emitProgress("initializing",100,"Session initialized successfully")}async validateConfiguration(){Jx(this.options)||Fe("Invalid WebNN configuration, falling back to default providers"),Zx(this.options)||Fe("Invalid WebGPU configuration, falling back to default providers")}async setupExecutionProviders(){const t=Qx(this.options);if(this.options.preferWebNN){const n=f0();be(`WebNN requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}if(this.options.preferWebGPU){const n=h0();be(`WebGPU requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}return t}async createSession(t){let n=!1,r=null;if(!this.modelData)throw new Error("Model data not found");for(const i of t)try{be(`[${this.modelName}] Attempting to create session with provider: ${i}`),this.session=await xs.create(this.modelData,{executionProviders:[i],enableProfiling:Me.isONNXProfilingEnabled()}),oe(`[${this.modelName}] Successfully created session with provider: ${i}`),Me.isONNXProfilingEnabled()&&be(`[${this.modelName}] ONNX profiling enabled - data will be logged after each inference`),n=!0;break}catch(a){Fe(`[${this.modelName}] Failed to create session with provider '${i}':`,a),r=a;continue}if(!n)throw new Error(`Failed to create ONNX session with any provider. Last error: ${(r==null?void 0:r.message)||"Unknown error"}`)}async downloadModel(){var n;if(be(`[${this.modelName}] Starting model download...`),this.options.bypassModelCache)be(`[${this.modelName}] Model cache bypassed, forcing fresh download`);else try{this.emitProgress("downloading",10,"Checking cache...");const r=await this.getCachedModel();if(r)return be(`[${this.modelName}] Using cached model: ${this.modelName}`),this.emitProgress("downloading",100,"Using cached model"),r}catch(r){Fe(`[${this.modelName}] IndexedDB cache unavailable, falling back to direct download:`,r)}be(`[${this.modelName}] Downloading model: ${this.modelName}`);const t=this.getModelUrl();this.emitProgress("downloading",20,"Starting download...");try{const r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const i=r.headers.get("content-length"),a=i?parseInt(i,10):0;if(be(`[${this.modelName}] Model size: ${(a/(1024*1024)).toFixed(2)}MB`),a>0){this.emitProgress("downloading",30,"Downloading model...");const l=(n=r.body)==null?void 0:n.getReader();if(l){const d=[];let c=0,h=!1;for(;!h;){const _=await l.read();if(h=_.done,h||!_.value)break;const T=_.value;d.push(T),c+=T.length;const v=30+Math.round(c/a*60);this.emitProgress("downloading",v,`Downloading model... ${Math.round(c/a*100)}%`)}const f=new Uint8Array(c);let g=0;for(const _ of d)f.set(_,g),g+=_.length;if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await Dp(this.modelName,f.buffer))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(f.buffer)}catch(_){Fe(`[${this.modelName}] Failed to cache model, but download succeeded:`,_)}return this.emitProgress("downloading",100,"Model ready"),f.buffer}}this.emitProgress("downloading",50,"Downloading model...");const s=await r.arrayBuffer();if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await Dp(this.modelName,s))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(s)}catch(l){Fe(`[${this.modelName}] Failed to cache model, but download succeeded:`,l)}return this.emitProgress("downloading",100,"Model ready"),s}catch(r){throw En(`[${this.modelName}] Model download failed:`,r),new Error(`Failed to download model ${this.modelName}: ${r}`)}}async getCachedModel(){return new Promise((t,n)=>{const r=indexedDB.open("rembg-models",2);r.onerror=()=>n(r.error),r.onsuccess=()=>{const o=r.result.transaction(["models"],"readonly").objectStore("models").get(this.modelName);o.onsuccess=()=>{const l=o.result;if(!l){t(null);return}const d=this.getModelVersion(),c=l.version||"1.0.0";if(c!==d){Ks(`Model version mismatch for ${this.modelName}: cached=${c}, current=${d}`),t(null);return}t(l.data||null)},o.onerror=()=>n(o.error)},r.onupgradeneeded=()=>{const i=r.result;i.objectStoreNames.contains("models")||i.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}async cacheModel(t){return new Promise((n,r)=>{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").put({name:this.modelName,data:t,timestamp:Date.now(),version:this.getModelVersion()});l.onsuccess=()=>n(),l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}getModelUrl(){const t=Me.getCustomModelPath(this.modelName);return t&&t!==""?(be(`Using custom model path for ${this.modelName}: ${t}`),t):this.getDefaultModelUrl()}getModelVersion(){return"1.0.0"}prepareInput(t){return Ux(t,this.getNormalizationParams(),this.getInputName())}async runInference(t){if(!this.session)throw new Error("Session not initialized");const n=await this.session.run(t);if(Me.isONNXProfilingEnabled())try{this.session.endProfiling(),be(`[${this.modelName}] ONNX profiling data outputted to console`)}catch(r){Fe(`[${this.modelName}] Failed to collect profiling data:`,r)}return n}async predict(t){if(be(`[${this.modelName}] Starting prediction for ${t.width}x${t.height} image...`),this.session||await this.initialize(),!this.session)throw new Error("Session not initialized");const n=this.prepareInput(t),r=await this.runInference(n),i=this.outputToMaskArray(r);return be(`[${this.modelName}] Predicted ${i.length} masks`),i.map(a=>this.maskArrayToMaskCanvas(a,{width:t.width,height:t.height}))}outputToMaskArray(t){return[t[Object.keys(t)[0]].data]}maskArrayToMaskCanvas(t,n){return p0(t,n,this.getOutputShape())}static getName(){throw new Error("getName() must be implemented by subclass")}getName(){return this.modelName}getOptions(){return{...this.options}}async dispose(){this.session&&(await this.session.release(),this.session=null),this.modelData=null}static async clearCache(){return new Promise((t,n)=>{try{const r=indexedDB.deleteDatabase("rembg-models");r.onsuccess=()=>{be("Model cache cleared successfully"),t()},r.onerror=()=>{Fe("Failed to clear model cache:",r.error),n(r.error)}}catch(r){Fe("IndexedDB not available for cache clearing:",r),n(r)}})}static async clearModelCache(t){return new Promise((n,r)=>{try{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").delete(t);l.onsuccess=()=>{be(`Model cache cleared for ${t}`),n()},l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}}catch(i){Fe("IndexedDB not available for cache clearing:",i),r(i)}})}}st([zt()],Oe.prototype,"initialize",null);st([zt()],Oe.prototype,"validateConfiguration",null);st([zt()],Oe.prototype,"setupExecutionProviders",null);st([zt()],Oe.prototype,"createSession",null);st([zt()],Oe.prototype,"downloadModel",null);st([zt()],Oe.prototype,"getCachedModel",null);st([zt()],Oe.prototype,"cacheModel",null);st([Xs()],Oe.prototype,"prepareInput",null);st([zt()],Oe.prototype,"runInference",null);st([zt()],Oe.prototype,"predict",null);st([Xs()],Oe.prototype,"outputToMaskArray",null);st([Xs()],Oe.prototype,"maskArrayToMaskCanvas",null);class e1 extends Oe{constructor(t){super("u2net",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net"}}class t1 extends Oe{constructor(t){super("u2netp",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2netp.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2netp"}}class n1 extends Oe{constructor(t){super("u2net_human_seg",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_human_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net_human_seg"}}class r1 extends Oe{constructor(n){super("u2net_cloth_seg",n);Re(this,"clothCategory","combined")}setClothCategory(n){this.clothCategory=n}getClothCategory(){return this.clothCategory}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_cloth_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[768,768]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,3,768,768]}outputToMaskArray(n){const r=n[Object.keys(n)[0]],i=r.data,[,a,s,o]=r.dims,l=this.logSoftmax(i,a,s*o),d=this.argmax(l,a,s*o),c=[];for(let h=1;h<=3;h++){const f=new Float32Array(s*o);for(let g=0;g<d.length;g++)f[g]=d[g]===h?255.5:0;c.push(f)}return c}maskArrayToMaskCanvas(n,r){return p0(n,r,this.getOutputShape())}logSoftmax(n,r,i){const a=new Float32Array(n.length);for(let s=0;s<i;s++){let o=n[s];for(let c=1;c<r;c++)o=Math.max(o,n[c*i+s]);let l=0;for(let c=0;c<r;c++)l+=Math.exp(n[c*i+s]-o);const d=Math.log(l)+o;for(let c=0;c<r;c++)a[c*i+s]=n[c*i+s]-d}return a}argmax(n,r,i){const a=new Uint8Array(i);for(let s=0;s<i;s++){let o=n[s],l=0;for(let d=1;d<r;d++){const c=n[d*i+s];c>o&&(o=c,l=d)}a[s]=l}return a}static getName(){return"u2net_cloth_seg"}}class i1 extends Oe{constructor(t){super("isnet-general-use",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-general-use.onnx`}getNormalizationParams(){return{mean:[.5,.5,.5],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-general-use"}}class a1 extends Oe{constructor(t){super("isnet-anime",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-anime.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-anime"}}class s1 extends Oe{constructor(t){super("silueta",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/silueta.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"silueta"}}const Et=new Map;Et.set("u2net",e1);Et.set("u2netp",t1);Et.set("u2net_human_seg",n1);Et.set("u2net_cloth_seg",r1);Et.set("isnet-general-use",i1);Et.set("isnet-anime",a1);Et.set("silueta",s1);const an=new Map,Ft=[],o1={maxSessions:5};function l1(e,t){var a,s;const n=[];e.preferWebNN!==t.preferWebNN&&n.push(`preferWebNN: ${e.preferWebNN} vs ${t.preferWebNN}`),e.webnnDeviceType!==t.webnnDeviceType&&n.push(`webnnDeviceType: ${e.webnnDeviceType} vs ${t.webnnDeviceType}`),e.webnnPowerPreference!==t.webnnPowerPreference&&n.push(`webnnPowerPreference: ${e.webnnPowerPreference} vs ${t.webnnPowerPreference}`),e.preferWebGPU!==t.preferWebGPU&&n.push(`preferWebGPU: ${e.preferWebGPU} vs ${t.preferWebGPU}`),e.webgpuPowerPreference!==t.webgpuPowerPreference&&n.push(`webgpuPowerPreference: ${e.webgpuPowerPreference} vs ${t.webgpuPowerPreference}`),e.simd!==t.simd&&n.push(`simd: ${e.simd} vs ${t.simd}`),e.proxy!==t.proxy&&n.push(`proxy: ${e.proxy} vs ${t.proxy}`),e.numThreads!==t.numThreads&&n.push(`numThreads: ${e.numThreads} vs ${t.numThreads}`);const r=JSON.stringify((a=e.executionProviders)==null?void 0:a.sort()),i=JSON.stringify((s=t.executionProviders)==null?void 0:s.sort());return r!==i&&n.push(`executionProviders: ${r} vs ${i}`),n.length>0?(be(`[areSessionOptionsEqual] Settings mismatch detected: ${n.join(", ")}`),!1):!0}function Up(e){const t=Ft.indexOf(e);t>-1&&Ft.splice(t,1),Ft.push(e)}async function u1(){if(Ft.length===0)return;const e=Ft[0],t=an.get(e);t&&(await t.dispose(),an.delete(e),Ft.shift())}async function d1(){for(;an.size>=o1.maxSessions;)await u1()}async function g0(e="u2net",t,n){const r=performance.now();be(`[newSession] Creating session for model: ${e}`);const i=performance.now(),a={...n,preferWebNN:Me.isWebNNEnabled(),webnnDeviceType:Me.getWebNNDeviceType(),webnnPowerPreference:Me.getWebNNPowerPreference(),preferWebGPU:Me.isWebGPUEnabled(),webgpuPowerPreference:Me.getWebGPUPowerPreference(),bypassSessionCache:Me.isSessionCacheBypassEnabled(),bypassModelCache:Me.isModelCacheBypassEnabled()},s=performance.now()-i;if(oe(`[newSession] Options merge: ${s.toFixed(2)}ms`),e==="u2net_custom")throw new Error("u2net_custom requires modelPath in config");const o=performance.now(),l=Et.get(e),d=performance.now()-o;if(oe(`[newSession] Registry lookup: ${d.toFixed(2)}ms`),!l){const x=Array.from(Et.keys()).join(", ");throw new Error(`No session class found for model '${e}'. Available models: ${x}`)}const c=performance.now();if(!a.bypassSessionCache&&an.has(e)){const x=an.get(e),C=x.getOptions();if(l1(a,C)){Up(e);const k=performance.now()-c,E=performance.now()-r;return oe(`[newSession] Cache hit for ${e}: ${k.toFixed(2)}ms (total: ${E.toFixed(2)}ms)`),x}else{be(`[newSession] Settings mismatch for ${e}, evicting cached session`),await x.dispose(),an.delete(e);const k=Ft.indexOf(e);k>-1&&Ft.splice(k,1)}}else a.bypassSessionCache&&be(`[newSession] Session cache bypassed for ${e}`);const h=performance.now()-c;oe(`[newSession] Cache miss for ${e}: ${h.toFixed(2)}ms`);const f=performance.now(),g=new l(a),w=performance.now()-f;oe(`[newSession] Session creation: ${w.toFixed(2)}ms`);const _=performance.now();an.set(e,g),Up(e);const T=performance.now()-_;oe(`[newSession] Session caching: ${T.toFixed(2)}ms`),d1().catch(console.warn);const v=performance.now()-r;return oe(`[newSession] Total session creation: ${v.toFixed(2)}ms`),g}async function c1(e,t={}){const n=performance.now();be("[remove] Starting background removal process...");const r=(i,a,s)=>{t.onProgress&&t.onProgress({step:i,progress:a,message:s})};try{r("downloading",0,"Initializing...");const i=performance.now();let a;if(e instanceof HTMLCanvasElement)a=e,r("downloading",20,"Input ready"),be("[remove] Input is already a canvas");else if(e instanceof HTMLImageElement){const E=performance.now();a=Ra(e);const M=performance.now()-E;oe(`[remove] Image to canvas conversion: ${M.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof File||e instanceof Blob){r("downloading",10,"Loading image...");const E=performance.now(),M=await Bx(e),A=performance.now()-E;oe(`[remove] File to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=Ra(M);const O=performance.now()-$;oe(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof ArrayBuffer){r("downloading",10,"Loading image...");const E=performance.now(),M=await Dx(e),A=performance.now()-E;oe(`[remove] ArrayBuffer to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=Ra(M);const O=performance.now()-$;oe(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else throw new Error("Unsupported input type. Supported types: File, Blob, ArrayBuffer, HTMLImageElement, HTMLCanvasElement");const s=performance.now()-i;oe(`[remove] Total input processing: ${s.toFixed(2)}ms (${a.width}x${a.height})`);const o=performance.now();r("downloading",30,"Preparing model...");const l=t.session||await g0("u2net"),d=performance.now()-o;oe(`[remove] Session creation: ${d.toFixed(2)}ms`);const c=performance.now();r("processing",40,"Running AI model...");const h=await l.predict(a),f=performance.now()-c;if(oe(`[remove] Model prediction: ${f.toFixed(2)}ms`),h.length===0)throw new Error("No masks generated from model");r("processing",70,"Processing mask...");let g=h[0];if(t.postProcessMask){const E=performance.now();r("postprocessing",80,"Applying post-processing..."),g=Hx(g);const M=performance.now()-E;oe(`[remove] Post-processing: ${M.toFixed(2)}ms`)}if(t.onlyMask){const E=performance.now();r("postprocessing",90,"Creating mask output...");const M=Gx(g),A=performance.now()-E;oe(`[remove] Mask-only creation: ${A.toFixed(2)}ms`);const $=performance.now(),O=await Bp(M,"image/png"),U=performance.now()-$;oe(`[remove] Canvas to blob conversion: ${U.toFixed(2)}ms`),r("complete",100,"Complete");const H=performance.now()-n;return oe(`[remove] Total processing time (mask-only): ${H.toFixed(2)}ms`),O}const w=performance.now();r("postprocessing",85,"Creating cutout...");let _=qx(a,g);const T=performance.now()-w;if(oe(`[remove] Cutout creation: ${T.toFixed(2)}ms`),t.bgcolor){const E=performance.now();r("postprocessing",90,"Applying background color..."),_=Vx(_,t.bgcolor);const M=performance.now()-E;oe(`[remove] Background color application: ${M.toFixed(2)}ms`)}const v=performance.now();r("postprocessing",95,"Finalizing output...");const x=await Bp(_,"image/png"),C=performance.now()-v;oe(`[remove] Final canvas to blob conversion: ${C.toFixed(2)}ms`),r("complete",100,"Complete");const k=performance.now()-n;return oe(`[remove] Total processing time: ${k.toFixed(2)}ms`),x}catch(i){const a=performance.now()-n;throw console.error(`[remove] Processing failed (${a.toFixed(2)}ms):`,i),t.onProgress&&t.onProgress({step:"complete",progress:0,message:`Error: ${i instanceof Error?i.message:"Unknown error"}`}),i}}let Pa=null,Oa=null,Ba=null,Lp=!1;function Fp(e,t){if(!e.length)return 0;const n=Math.min(e.length-1,Math.max(0,Math.round((e.length-1)*t)));return e[n]}function Da(e){const t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function p1(e,t,n){const r=Da(e),i=Da(t),a=Da(n);let s=(r*.4124564+i*.3575761+a*.1804375)/.95047,o=r*.2126729+i*.7151522+a*.072175,l=(r*.0193339+i*.119192+a*.9503041)/1.08883;const d=c=>c>.008856?Math.cbrt(c):7.787*c+16/116;return s=d(s),o=d(o),l=d(l),{l:ce((116*o-16)/100),a:500*(s-o)/127,b:200*(o-l)/127}}async function h1(e,t=640){var l;const n=await createImageBitmap(e),r=Math.min(1,t/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r)),s=document.createElement("canvas");s.width=i,s.height=a;const o=s.getContext("2d",{willReadFrequently:!0});return o.fillStyle="#000",o.fillRect(0,0,i,a),o.drawImage(n,0,0,i,a),(l=n.close)==null||l.call(n),o.getImageData(0,0,i,a)}function f1(e,t=768){const n=e.naturalWidth||e.width,r=e.naturalHeight||e.height,i=Math.min(1,t/Math.max(n,r)),a=Math.max(1,Math.round(n*i)),s=Math.max(1,Math.round(r*i)),o=document.createElement("canvas");o.width=a,o.height=s;const l=o.getContext("2d",{willReadFrequently:!0});return l.fillStyle="#000",l.fillRect(0,0,a,s),l.drawImage(e,0,0,a,s),l.getImageData(0,0,a,s)}function m1(){return Pa||(Pa=new Promise((e,t)=>{if(window.loadPyodide){e();return}const n=document.createElement("script");n.src=Ew,n.async=!0,n.onload=()=>e(),n.onerror=()=>t(new Error("could not load Pyodide")),document.head.append(n)})),Pa}async function b0(){return Oa||(Oa=(async()=>{z.statusLine.textContent="Loading Python",await m1();const e=await window.loadPyodide({indexURL:uh});return z.statusLine.textContent="Loading numpy",await e.loadPackage(["numpy"]),e.runPython(Iw),e})()),Oa}function g1(){if(Lp)return;const e=new URL("public/ort/",document.baseURI);Se.wasm.numThreads=1,Se.wasm.proxy=!1,Se.wasm.wasmPaths={mjs:new URL("ort-wasm-simd-threaded.jsep.mjs",e).toString(),wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",e).toString()},Me.setBaseUrl(new URL("public/models",document.baseURI).toString()),Me.setModelCacheBypass(!0),Lp=!0}function y0(){return g1(),Ba||(Ba=g0("u2netp")),Ba}function b1(e,t,n){const r=atob(e||""),i=new Uint8Array(t*n);for(let a=0;a<Math.min(r.length,i.length);a+=1)i[a]=r.charCodeAt(a);return i}function w0(e,t,n){let r=t,i=n,a=-1,s=-1;for(let o=0;o<e.length;o+=1){if(!e[o])continue;const l=o%t,d=Math.floor(o/t);r=Math.min(r,l),i=Math.min(i,d),a=Math.max(a,l),s=Math.max(s,d)}return a<r?[0,0,t-1,n-1]:[r,i,a,s]}function y1(e,t,n=null){const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d"),a=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);for(let E=0;E<t.length;E+=1)a.data[E*4+3]=t[E]?a.data[E*4+3]:0;i.putImageData(a,0,0);const[s,o,l,d]=n||w0(t,e.width,e.height),c=Math.max(1,l-s+1),h=Math.max(1,d-o+1),f=Math.max(8,Math.round(Math.max(c,h)*.08)),g=Math.max(0,s-f),w=Math.max(0,o-f),_=Math.min(e.width,l+f+1),T=Math.min(e.height,d+f+1),v=Math.max(1,_-g),x=Math.max(1,T-w),C=Math.max(v,x),k=document.createElement("canvas");return k.width=C,k.height=C,k.getContext("2d").drawImage(r,g,w,v,x,(C-v)/2,(C-x)/2,v,x),new Promise(E=>k.toBlob(M=>E(M?URL.createObjectURL(M):""),"image/png"))}async function w1(e){var d;z.statusLine.textContent="Removing background";const t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").putImageData(e,0,0);const n=await y0(),r=await c1(t,{onlyMask:!0,postProcessMask:!0,session:n}),i=await createImageBitmap(r),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const s=a.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0,e.width,e.height),(d=i.close)==null||d.call(i);const o=s.getImageData(0,0,e.width,e.height).data,l=new Uint8Array(e.width*e.height);for(let c=0;c<l.length;c+=1)l[c]=o[c*4]>16?1:0;return l}async function _0(e){const t=await w1(e),n=await b0();n.FS.writeFile("/upload.rgba",new Uint8Array(e.data)),n.FS.writeFile("/upload.mask",t),z.statusLine.textContent="Fingerprinting shell";const r=n.runPython(`fingerprint_rgba_mask_file("/upload.rgba", "/upload.mask", ${e.width}, ${e.height}, ${b.contourPoints||256}, 32)`),i=JSON.parse(r),a=b1(i.mask,e.width,e.height),s=i.bbox||w0(a,e.width,e.height);return{imageData:e,mask:a,contour:new Float32Array(i.contour||[]),fingerprint:new Float32Array(i.fingerprint||[]),maskPixels:Number(i.mask_pixels||0),bbox:s,imageUrl:await y1(e,a,s)}}async function _1(e){return z.statusLine.textContent="Cutting shell",_0(f1(e,768))}async function x1(e){return z.statusLine.textContent="Cutting shell",_0(await h1(e,768))}function x0(e){var t;["Loading Python","Loading numpy","Removing background","Cutting shell","Fingerprinting shell"].includes((t=z.statusLine)==null?void 0:t.textContent)&&(z.statusLine.textContent=e)}async function v0(e){return e!=null&&e.file?(Ri.has(e.file)||Ri.set(e.file,(async()=>{const t=await l_(e);return t?_1(t):null})().catch(t=>(z.statusLine&&(z.statusLine.textContent=t.message||"Python image cut failed"),null))),Ri.get(e.file)):null}async function $0(e,t){var i;if(!e||!t)return!1;const n=((i=z.statusLine)==null?void 0:i.textContent)||"",r=await v0(t);return x0(n),!e.isConnected||!(r!=null&&r.imageUrl)?!1:(e.src=r.imageUrl,!0)}function Wp(e,t,n=""){z.sourceImage.hidden=!1,z.sourceSpinner&&(z.sourceSpinner.hidden=!1),z.sourceImage.dataset.fallbackApplied="false",z.sourceImage.alt=n,z.sourceImage.onerror=()=>{z.sourceImage.removeAttribute("src"),z.sourceSpinner&&(z.sourceSpinner.hidden=!0)},z.sourceImage.onload=()=>{z.sourceSpinner&&(z.sourceSpinner.hidden=!0),Tn(!0)},z.sourceImage.src=e}async function S0(e,{preferFastSource:t=!1}={}){if(!e)return;const n=++b.sourceToken;if(window.clearTimeout(b.sourceLoadTimer),z.sourceSpinner&&(z.sourceSpinner.hidden=!1),b.uploadImageUrl&&e.id<0){Wp(b.uploadImageUrl,e,e.species);return}z.sourceImage.hidden=!0,b.sourceFrame=null,b.sourceMode="python",Tn(!1);const r=z.statusLine.textContent;b.sourceLoadTimer=window.setTimeout(async()=>{const i=await v0(e);x0(r),!(n!==b.sourceToken||b.selected!==e)&&(i!=null&&i.imageUrl?Wp(i.imageUrl,e,e.species):z.sourceSpinner&&(z.sourceSpinner.hidden=!0))},0)}function Ys(){const e=[];for(const t of[b.xAxis,b.yAxis])Number.isInteger(t)&&t>=0&&!e.includes(t)&&e.push(t);return e.length?e:[0,1]}function v1(e){var i,a;const t=(a=(i=b.model)==null?void 0:i.contour_pca_ranges)==null?void 0:a[e];if(!t)return 1;const n=Math.abs((t.p99??0)-(t.p01??0)),r=Math.abs((t.max??0)-(t.min??0));return Math.max(.001,n||r||1)}function oi(e,t,n=null){let r=0,i=0;const a=e.contour_pc||[],s=n!=null&&n.length?n:Array.from({length:Math.min(4,a.length,t.length)},(l,d)=>d);let o=0;for(const l of s){if(l>=a.length||l>=t.length)continue;const d=(a[l]||0)-(t[l]||0);r+=d**2,i+=(d/v1(l))**2,o+=1}return{rawSq:r,normalizedSq:i,dimensions:o}}function Zs(e){if(!e.dimensions)return 0;const t=Math.sqrt(e.normalizedSq),n=Math.sqrt(e.dimensions);return Math.max(0,Math.min(100,(1-t/n)*100))}function $1(e,t,n){if(e.length<n){e.push(t);return}let r=0,i=e[0].distance;for(let a=1;a<e.length;a+=1)e[a].distance>i&&(i=e[a].distance,r=a);t.distance<i&&(e[r]=t)}function S1(e){return e.sort((t,n)=>t.distance-n.distance).map(t=>({distance:Math.sqrt(t.stats.rawSq),similarity:Zs(t.stats),shell:t.shell}))}function k1(e,{axes:t=null,limit:n=4,excludeId:r=null}={}){const i=++b.neighborSearchRun;window.clearTimeout(b.neighborSearchTimer);const a=b.filtered.length?b.filtered:b.shells,s=[];let o=0;const l=()=>{var c;if(i!==b.neighborSearchRun)return;const d=performance.now()+5;for(;o<a.length&&performance.now()<d;o+=1){const h=a[o];if(h.id===r||!((c=h.contour_pc)!=null&&c.length))continue;const f=oi(h,e,t);$1(s,{distance:f.normalizedSq,stats:f,shell:h},n)}if(o<a.length){b.neighborSearchTimer=window.setTimeout(l,0);return}Qs(S1(s))};b.neighborSearchTimer=window.setTimeout(l,0)}function T1(e){if(!e)return[];if(b.neighborCache.has(e.id))return b.neighborCache.get(e.id);const t=[];let n=-1,r=-1;for(const a of b.shells){if(a.id===e.id)continue;const s=oi(a,e.contour_pc||[]),o=s.normalizedSq;if(t.length<4){t.push({distance:o,stats:s,shell:a}),o>r&&(r=o,n=t.length-1);continue}if(!(o>=r)){t[n]={distance:o,stats:s,shell:a},r=-1;for(let l=0;l<t.length;l+=1)t[l].distance>r&&(r=t[l].distance,n=l)}}t.sort((a,s)=>a.distance-s.distance);const i=t.map(a=>({distance:Math.sqrt(a.stats.rawSq),similarity:Zs(a.stats),shell:a.shell}));return b.neighborCache.set(e.id,i),i}function Qs(e){const t=e.map(r=>r.shell.id).join("|");if(b.neighborRenderKey===t){b.draggingTarget&&b.neighborHydrationItems.length&&cs(b.neighborHydrationItems,t);return}b.neighborRenderKey=t,z.neighborsList.innerHTML="",window.clearTimeout(b.neighborHydrationTimer),b.neighborHydrationItems=[];const n=[];for(const r of e){const i=document.createElement("button");i.className="neighbor-button";const a=Number.isFinite(r.similarity)?r.similarity:0;i.title=`${r.shell.species} (${mt(a,1)}% similar, distance ${mt(r.distance,3)})`;const s=document.createElement("img");s.setAttribute("aria-label",r.shell.species),s.alt=r.shell.species;const o=document.createElement("span");o.textContent=`${Math.round(a)}%`,i.append(s,o),i.addEventListener("click",()=>{ui(r.shell),mn(r.shell)}),z.neighborsList.append(i),n.push({image:s,shell:r.shell})}b.neighborHydrationItems=n,cs(n,t)}function cs(e,t){window.clearTimeout(b.neighborHydrationTimer),b.neighborHydrationTimer=window.setTimeout(()=>{if(b.neighborHydrationTimer=0,b.draggingTarget){cs(e,t);return}C1(e,t)},b.draggingTarget?10:0)}async function C1(e,t){for(const n of e){if(b.neighborRenderKey!==t)return;await $0(n.image,n.shell)}}function E1(e,t=b.neighborToken){if(!e||t!==b.neighborToken){b.neighborRenderKey="",b.neighborSearchRun+=1,window.clearTimeout(b.neighborSearchTimer),b.neighborSearchTimer=0,window.clearTimeout(b.neighborHydrationTimer),b.neighborHydrationTimer=0,b.neighborHydrationItems=[],z.neighborsList.innerHTML="";return}Qs(T1(e))}function I1(e,t=null){if(b.neighborToken+=1,window.clearTimeout(b.neighborTimer),t){b.neighborSearchRun+=1,window.clearTimeout(b.neighborSearchTimer),b.neighborSearchTimer=0,Qs(t);return}k1(e.slice(),{axes:Ys()})}function z1(){window.clearTimeout(b.targetNeighborTimer),b.targetNeighborTimer=0,b.targetNeighborValues=null,b.neighborSearchRun+=1,window.clearTimeout(b.neighborSearchTimer),b.neighborSearchTimer=0}function qp(){const e=b.pendingSelectShell;b.pendingSelectShell=null,e&&mn(e,{preferFastSource:!0})}function Qr(e,t=0){b.neighborToken+=1;const n=b.neighborToken;if(window.clearTimeout(b.neighborTimer),!e){b.neighborRenderKey="",b.neighborSearchRun+=1,window.clearTimeout(b.neighborSearchTimer),b.neighborSearchTimer=0,window.clearTimeout(b.neighborHydrationTimer),b.neighborHydrationTimer=0,b.neighborHydrationItems=[],z.neighborsList.innerHTML="";return}b.neighborTimer=window.setTimeout(()=>{E1(e,n)},t)}let vn=0,k0=0;function M1(){try{const e=JSON.parse(localStorage.getItem(lh)||"[]");b.starredIds=Array.isArray(e)?e.filter(t=>Number.isFinite(Number(t))).map(Number):[]}catch{b.starredIds=[]}}function A1(){localStorage.setItem(lh,JSON.stringify(b.starredIds.slice(0,80)))}function T0(e){return!!(e&&b.starredIds.includes(e.id))}function C0(){if(!z.starShell)return;const e=T0(b.selected);z.starShell.setAttribute("aria-pressed",e?"true":"false"),z.starShell.title=e?"Unstar this shape":"Star this shape",z.starShell.setAttribute("aria-label",e?"Unstar this shape":"Star this shape")}function N1(){if(!b.selected)return;window.clearTimeout(b.neighborTimer);const e=b.selected.id,t=T0(b.selected);b.starredIds=b.starredIds.filter(n=>n!==e),t||(b.starredIds.unshift(e),window.requestAnimationFrame(()=>{z.starShell.classList.remove("star-pop"),z.starShell.classList.add("star-pop"),R1(),window.setTimeout(()=>z.starShell.classList.remove("star-pop"),850)})),C0(),li(),window.setTimeout(A1,0)}function R1(){var s;if(!z.starBurst||!z.starShell)return;const e=z.starShell.getBoundingClientRect(),t=(s=z.starredBand)==null?void 0:s.getBoundingClientRect(),n=e.left+e.width/2,r=e.top+e.height/2,i=t?t.left+Math.min(70,t.width*.4):n,a=t?t.top+t.height/2:r-60;z.starBurst.style.setProperty("--burst-start-x",`${n}px`),z.starBurst.style.setProperty("--burst-start-y",`${r}px`),z.starBurst.style.setProperty("--burst-end-x",`${i}px`),z.starBurst.style.setProperty("--burst-end-y",`${a}px`),z.starBurst.innerHTML="";for(let o=0;o<9;o+=1){const l=document.createElement("span");l.style.setProperty("--spark-angle",`${o*40-20}deg`),l.style.setProperty("--spark-distance",`${24+o%3*10}px`),l.style.setProperty("--spark-delay",`${o*18}ms`),z.starBurst.append(l)}z.starBurst.classList.remove("is-active"),z.starBurst.offsetWidth,z.starBurst.classList.add("is-active"),window.setTimeout(()=>z.starBurst.classList.remove("is-active"),900)}function P1(){var i;if(b.showAllStars){const a=[];for(const s of b.starredIds){const o=fs(s);o&&a.push({shell:o})}return{items:a,hidden:0}}const e=Math.max(44,((i=z.starredBand)==null?void 0:i.clientWidth)||0),t=[];let n=0,r=0;for(let a=0;a<b.starredIds.length;a+=1){const s=fs(b.starredIds[a]);if(!s)continue;const o={shell:s},l=71,d=b.starredIds.length-a-1,c=d>0?54:0;if(t.length>0&&n+l+c>e){r=d+1;break}t.push(o),n+=l}return{items:t,hidden:r}}function li(){if(!z.starredBand)return;z.starredBand.innerHTML="",b.starredHydratedCount=0,b.starredThumbs=[];const{items:e,hidden:t}=P1();for(const{shell:n}of e){const r=document.createElement("button");r.className="starred-shell",r.title=`${n.species} ${n.fingerprint_hash}`,r.dataset.shellId=String(n.id);const i=document.createElement("img");i.alt=n.species,r.append(i),b.starredThumbs.push({button:r,image:i,shell:n}),r.addEventListener("click",()=>{ui(n),mn(n)}),z.starredBand.append(r)}if(t>0||b.showAllStars){const n=document.createElement("button");n.className="starred-more",n.textContent=b.showAllStars?"Less":`+${t}`,n.title=b.showAllStars?"Show fewer starred shells":"Show all starred shells",n.addEventListener("click",()=>{b.showAllStars=!b.showAllStars,li()}),z.starredBand.append(n)}Jn()}function Jn(e=3e3){if(!z.starredBand)return;b.starredHydrationRun+=1;const t=b.starredHydrationRun;window.clearTimeout(b.starredHydrationTimer),b.starredHydrationTimer=window.setTimeout(()=>O1(t),e)}async function O1(e){if(!z.starredBand||e!==b.starredHydrationRun)return;const t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,r=b.starredThumbs.filter(({button:i})=>{const a=i.getBoundingClientRect();return a.right>=0&&a.left<=t&&a.bottom>=0&&a.top<=n}).slice(0,18);for(const{image:i,shell:a}of r){if(e!==b.starredHydrationRun)return;if(!(!i||!a)){if(await B1(),e!==b.starredHydrationRun||!i.isConnected)return;await $0(i,a)&&(b.starredHydratedCount+=1)}}}function B1(){return new Promise(e=>{"requestIdleCallback"in window?window.requestIdleCallback(e,{timeout:300}):window.setTimeout(e,80)})}function D1(e){k0=e.clientX,!vn&&(vn=window.requestAnimationFrame(U1))}function U1(){if(vn=0,!z.starredBand||!b.starredThumbs.length)return;const e=z.starredBand.getBoundingClientRect();for(const{button:t}of b.starredThumbs){const n=e.left+t.offsetLeft+t.offsetWidth/2,r=Math.max(0,1-Math.abs(k0-n)/118),i=r*r*(3-2*r);t.style.setProperty("--dock-scale",(1+i*1.08).toFixed(3)),t.style.setProperty("--dock-lift",`${(18*i).toFixed(2)}px`),t.style.setProperty("--dock-z",`${Math.round(i*100)}`)}}function Vp(){if(z.starredBand){vn&&(window.cancelAnimationFrame(vn),vn=0);for(const{button:e}of b.starredThumbs)e.style.setProperty("--dock-scale","1"),e.style.setProperty("--dock-lift","0px"),e.style.setProperty("--dock-z","0")}}function Ua(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_key)||(e==null?void 0:e.location_key)||"unknown"}function L1(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_label)||(e==null?void 0:e.region_label)||(e==null?void 0:e.location_label)||"Unknown"}function F1(e,t){var i,a,s;if(!t)return!0;const[n,r]=t.split(":");return r?n==="region"?((i=e==null?void 0:e.species_traits)==null?void 0:i.region_key)===r||(e==null?void 0:e.region_key)===r||(e==null?void 0:e.location_key)===r||Ua(e)===r:n==="country"?(e==null?void 0:e.location_key)===r||((a=e==null?void 0:e.species_traits)==null?void 0:a.primary_country)===r||(((s=e==null?void 0:e.species_traits)==null?void 0:s.known_range_countries)||[]).some(o=>o.code===r):Ua(e)===t:Ua(e)===t}function W1(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}:null}function q1(e,t){const n=W1(t);if(!n)return 1/0;if(e.color_r_mean==null||e.color_g_mean==null||e.color_b_mean==null)return null;const r=fh(e),i=r[0]-n.r,a=r[1]-n.g,s=r[2]-n.b,o=Math.min(24,Math.max(0,e.color_pattern_strength||0)*80);return Math.sqrt(i*i+a*a+s*s)-o}function V1(e,t){if(!t)return!0;const n=q1(e,t);return n==null?!0:n<=105}function H1(e,t){var n;return t==="lightness"?e.color_l_mean==null?null:ce(e.color_l_mean):t==="area"?e.area==null||e.image_width==null||e.image_height==null?null:Lw(e):t==="concavity"?e.contour_concavity==null?null:ce(e.contour_concavity/.32):t==="asymmetry"?((n=e.morph_traits)==null?void 0:n.asymmetry)==null?null:ce(e.morph_traits.asymmetry):null}function Hp(e){for(const t of ii){const n=b.morphFilters.get(t.key);if(!n)continue;const r=H1(e,t.key);if(r!=null&&(r<n.min||r>n.max))return!1}return!(b.categoryFilters.rarity&&e.rarity_label!==b.categoryFilters.rarity||!F1(e,b.categoryFilters.origin)||!V1(e,b.categoryFilters.color))}function In(){var t;const e=z.search.value.trim().toLowerCase();b.filtered=e?b.shells.filter(n=>`${n.name} ${n.species} ${n.file} ${n.fingerprint_hash||""} ${n.legacy_fingerprint_hash||""} ${n.location_label||""}`.toLowerCase().includes(e)&&Hp(n)):b.shells.filter(Hp),b.scatterHitCache=null,b.scatterPointCache=null,d_(),Eh(),Qr(b.selected),Tn(!1),z.statusLine&&((t=b.model)!=null&&t.processed_count)&&(z.statusLine.textContent=`${b.filtered.length.toLocaleString()} of ${b.model.processed_count.toLocaleString()} shells`),E0(),Ge(120)}function E0(){if(!z.filtersToggle)return;let e=0;for(const t of ii){const n=b.morphFilters.get(t.key);n&&(n.min>0||n.max<1)&&(e+=1)}for(const t of Object.values(b.categoryFilters))t&&(e+=1);z.filtersToggle.textContent=e?`Filters (${e})`:"Filters",z.filtersToggle.classList.toggle("is-active",e>0)}function G1(){return[...ps().regions.map(e=>[e.value,`Continent: ${e.label}`]),...ps().countries.map(e=>[e.value,`Country: ${e.label}`])]}function ps(){var n,r,i,a,s,o;const e=new Map,t=new Map;if(b.originFilterOptionsCache)return b.originFilterOptionsCache;for(const l of b.shells){const d=((n=l.species_traits)==null?void 0:n.region_key)||l.region_key||"",c=((r=l.species_traits)==null?void 0:r.region_label)||l.region_label||"";if(d&&d!=="unknown"){const f=`region:${d}`,g=e.get(f)||{value:f,key:d,label:c||L1(l),count:0};g.count+=1,e.set(f,g)}for(const f of((i=l.species_traits)==null?void 0:i.known_range_countries)||[]){if(!f.code||!f.label)continue;const g=`country:${f.code}`,w=t.get(g)||{value:g,code:f.code,label:f.label,region:((a=l.species_traits)==null?void 0:a.region_key)||"",count:0};w.count+=Math.max(1,Number(f.count||0)),t.set(g,w)}const h=l.location_key||"";if(h&&h!=="unknown"&&h.length<=3){const f=`country:${h}`,g=t.get(f)||{value:f,code:h,label:((s=l.location_label)==null?void 0:s.split(",")[0])||h,region:((o=l.species_traits)==null?void 0:o.region_key)||"",count:0};g.count+=1,t.set(f,g)}}return b.originFilterOptionsCache={regions:[...e.values()].sort((l,d)=>l.label.localeCompare(d.label)),countries:[...t.values()].sort((l,d)=>l.label.localeCompare(d.label)||l.code.localeCompare(d.code))},b.originFilterOptionsCache}function j1(){const e=document.createElement("label");e.className="filter-row filter-panel-card filter-select-row filter-origin-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Origin";const r=document.createElement("output");r.textContent=X1(b.categoryFilters.origin),t.append(n,r);const i=document.createElement("select");i.setAttribute("aria-label","Origin");for(const[a,s]of[["","Any origin"],...G1()]){const o=document.createElement("option");o.value=a,o.textContent=s,i.append(o)}i.value=b.categoryFilters.origin||"",i.addEventListener("change",()=>{b.categoryFilters.origin=i.value,zn(),In()}),e.append(t,i),z.filterControls.append(e)}function K1(){const e=document.createElement("div");e.className="filter-row filter-panel-card rarity-filter-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Rarity";const r=document.createElement("output");r.textContent=b.categoryFilters.rarity||"Any",t.append(n,r);const i=document.createElement("div");i.className="rarity-filter-options";for(const a of["",...zw]){const s=document.createElement("button");s.type="button",s.textContent=a||"Any",s.setAttribute("aria-pressed",(b.categoryFilters.rarity||"")===a?"true":"false"),s.addEventListener("click",()=>{b.categoryFilters.rarity=b.categoryFilters.rarity===a?"":a,zn(),In()}),i.append(s)}e.append(t,i),z.filterControls.append(e)}function X1(e){if(!e)return"Any";const t=ps(),n=[...t.regions,...t.countries].find(r=>r.value===e);return(n==null?void 0:n.label)||"Any"}function Y1(e){b.morphFilters.set(e.key,b.morphFilters.get(e.key)||{min:0,max:1});const t=document.createElement("div");t.className=`filter-row filter-panel-card filter-range-row filter-${e.key}-row`;const n=document.createElement("header"),r=document.createElement("span");r.textContent=e.label;const i=document.createElement("output"),a=b.morphFilters.get(e.key),s=Ql.find(l=>Math.abs(a.min-l.min)<.01&&Math.abs(a.max-l.max)<.01);i.textContent=(s==null?void 0:s.label)||"Any",n.append(r,i);const o=document.createElement("div");o.className="filter-levels";for(const l of Ql){const d=document.createElement("button");d.type="button",d.dataset.level=l.key,d.textContent=l.label,d.title=`${e.label}: ${l.label}`;const c=(s==null?void 0:s.key)===l.key;d.setAttribute("aria-pressed",c?"true":"false"),d.addEventListener("click",()=>{const h=d.getAttribute("aria-pressed")==="true";b.morphFilters.set(e.key,h?{min:0,max:1}:{min:l.min,max:l.max}),zn(),In()}),o.append(d)}t.append(n,o),z.filterControls.append(t)}function Z1(){var s;const e=document.createElement("div");e.className="filter-row filter-panel-card color-filter-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Color";const r=document.createElement("output");r.textContent=((s=Jl.find(([o])=>o===b.categoryFilters.color))==null?void 0:s[1])||"Any",t.append(n,r);const i=document.createElement("div");i.className="color-filter-panel";const a=document.createElement("div");a.className="color-swatch-filter";for(const[o,l]of Jl){const d=document.createElement("button");d.type="button",d.title=l,d.setAttribute("aria-label",l),d.setAttribute("aria-pressed",b.categoryFilters.color===o?"true":"false"),d.style.setProperty("--swatch",o);const c=document.createElement("span");c.className="color-swatch-dot",d.append(c),d.addEventListener("click",()=>{b.categoryFilters.color=b.categoryFilters.color===o?"":o,zn(),In()}),a.append(d)}i.append(a),e.append(t,i),z.filterControls.append(e)}function zn(){if(z.filterControls){z.filterControls.innerHTML="",j1(),K1(),Z1();for(const e of ii)b.morphFilters.has(e.key)||b.morphFilters.set(e.key,{min:0,max:1}),Y1(e);E0()}}function Q1(){for(const e of ii)b.morphFilters.set(e.key,{min:0,max:1});b.categoryFilters={origin:"",rarity:"",color:""},zn(),In()}function Jr(){var f;if(!z.filtersPanel||!z.filtersToggle||z.filtersPanel.hidden)return;const e=window.innerWidth||document.documentElement.clientWidth||1024,t=window.innerHeight||document.documentElement.clientHeight||768,n=z.filtersToggle.getBoundingClientRect(),r=(f=z.controlsPanel)==null?void 0:f.getBoundingClientRect(),i=r?e-r.right-24:0,a=e>1080&&i>=520,s=a?Math.min(460,i):Math.min(460,Math.max(340,e-24)),o=a?r.right+12:n.left,l=Math.max(12,Math.min(o,e-s-12)),d=z.filtersPanel.offsetHeight||420,c=a?n.top:n.bottom+8,h=Math.max(12,Math.min(c,t-Math.min(d,t-24)-12));z.filtersPanel.style.setProperty("--filters-left",`${Math.round(l)}px`),z.filtersPanel.style.setProperty("--filters-top",`${Math.round(h)}px`),z.filtersPanel.style.setProperty("--filters-width",`${Math.round(s)}px`)}function La(e){!z.filtersPanel||!z.filtersToggle||(z.filtersPanel.hidden=!e,z.filtersToggle.setAttribute("aria-expanded",e?"true":"false"),e&&(Jr(),window.requestAnimationFrame(Jr)))}function J1(e,t,n,r){let i=0,a=0,s=0,o=t,l=n,d=0,c=0;for(let k=0;k<e.length;k+=1){if(!e[k])continue;const E=k%t,M=Math.floor(k/t);i+=1,a+=E,s+=M,o=Math.min(o,E),l=Math.min(l,M),d=Math.max(d,E),c=Math.max(c,M)}if(i<32)throw new Error("The uploaded shell mask is too small.");const h=a/i,f=s/i,g=Math.ceil(Math.hypot(Math.max(h,t-h),Math.max(f,n-f)))+2,w=[],_=[];for(let k=0;k<r;k+=1){const E=-Math.PI/2+k/r*Math.PI*2,M=Math.cos(E),A=Math.sin(E);let $=h,O=f,U=0;for(let H=0;H<=g;H+=.75){const F=Math.round(h+M*H),K=Math.round(f+A*H);if(F<0||F>=t||K<0||K>=n)break;e[K*t+F]&&($=F,O=K,U=H)}w.push([$,O]),_.push(U)}const T=_.reduce((k,E)=>k+E,0)/Math.max(1,_.length),v=new Float32Array(r*2);for(let k=0;k<r;k+=1)v[k*2]=(w[k][0]-h)/Math.max(1e-6,T),v[k*2+1]=(w[k][1]-f)/Math.max(1e-6,T);let x=0;for(let k=0;k<_.length;k+=1)x+=Math.abs(_[k]-_[(k+1)%_.length]);const C=Math.max(1,(d-o+1)*(c-l+1));return{contour:v,center:[h,f],meanRadius:T,area:i,bbox:[o,l,d,c],aspectRatio:Math.max((d-o+1)/Math.max(1,c-l+1),(c-l+1)/Math.max(1,d-o+1)),roughness:x/Math.max(1e-6,T*_.length),concavity:ce(1-i/C)}}function e2(e,t,n){const{data:r,width:i,height:a}=e,s=new Float32Array(i*a),o=[],l=[],d=[];let c=0,h=0,f=0,g=0,w=0,_=0,T=0,v=0,x=0;for(let ie=0;ie<i*a;ie+=1){const W=ie*4;s[ie]=(.2126*r[W]+.7152*r[W+1]+.0722*r[W+2])/255}for(let ie=0;ie<t.length;ie+=1){if(!t[ie])continue;const W=ie*4,re=r[W],L=r[W+1],G=r[W+2],X=p1(re,L,G),V=Math.max(re,L,G)/255,_e=Math.min(re,L,G)/255,qe=V<=0?0:(V-_e)/V,Ie=Math.atan2(Math.sqrt(3)*(L-G),2*re-L-G),Be=Math.max(qe,.05);c+=re/255,h+=L/255,f+=G/255,g+=X.l,w+=X.a,_+=X.b,T+=Math.sin(Ie)*Be,v+=Math.cos(Ie)*Be,x+=Be,o.push(X.l),l.push(Math.hypot(X.a,X.b)),d.push(qe)}const C=Math.max(1,o.length),k=ie=>ie.reduce((W,re)=>W+re,0)/Math.max(1,ie.length),E=(ie,W)=>Math.sqrt(ie.reduce((re,L)=>re+(L-W)**2,0)/Math.max(1,ie.length)),M=k(o),A=k(l),$=k(d),O=[...o].sort((ie,W)=>ie-W);let U=0,H=[];for(let ie=1;ie<a-1;ie+=1)for(let W=1;W<i-1;W+=1){const re=ie*i+W;if(!t[re])continue;const L=s[re+1]-s[re-1],G=s[re+i]-s[re-i],X=(s[re-i]+s[re+i]+s[re-1]+s[re+1]+s[re])/5;U+=Math.hypot(L,G),H.push(s[re]-X)}const F=k(H),K=E(H,F),R=Fp(O,.75)-Fp(O,.25),Z=ce((E(o,M)*1.7+E(l,A)*2.2+E(d,$)*.9+K*10+R*1.2+ce(U/Math.max(1,H.length)/1.5))/6),Q=ce((E(o,M)*2+K*12+R*1.3)/3),te=ce((E(l,A)*2.6+E(d,$)*1.2)/2);return{visible_shell_ratio:1,mask_ratio:n.area/Math.max(1,i*a),area:n.area,center:n.center,bbox:n.bbox,mean_radius:n.meanRadius,image_width:i,image_height:a,roughness:n.roughness,aspect_ratio:n.aspectRatio,contour_solidity:1-n.concavity,contour_concavity:n.concavity,color_r_mean:c/C,color_g_mean:h/C,color_b_mean:f/C,color_l_mean:g/C,color_l_std:E(o,M),color_a_mean:w/C,color_b_lab_mean:_/C,color_chroma_mean:A,color_chroma_std:E(l,A),color_saturation_mean:$,color_saturation_std:E(d,$),color_hue_sin:T/Math.max(1,x),color_hue_cos:v/Math.max(1,x),texture_gradient_mean:U/Math.max(1,H.length),texture_residual_std:K,texture_luma_iqr:R,color_pattern_strength:Z,color_pattern_contrast:Q,color_pattern_chroma:te}}function t2(e,t){const n=Number(t||0);return e==="aspect_ratio"?Math.log1p(Math.max(0,n)):["roughness","contour_concavity","texture_gradient_mean","texture_residual_std","color_pattern_strength","color_pattern_contrast","color_pattern_chroma"].includes(e)?Math.log1p(Math.max(0,n)*64):n}function n2(e){const t=b.model.trait_feature_schema||[],n=b.model.trait_mean||[],r=b.model.trait_components||[];if(!t.length||!r.length)return[];const i=t.map((a,s)=>{var l;let o=0;if(String(a.name||"").startsWith("contour_pc")){const d=Number(String(a.name).replace("contour_pc",""))-1;o=((l=e.contour_pc)==null?void 0:l[d])||0}else o=t2(a.name,e[a.name]);return(o-(a.mean||0))/Math.max(1e-9,a.scale||1)*(a.weight||1)-(n[s]||0)});return r.map(a=>a.reduce((s,o,l)=>s+(i[l]||0)*o,0))}async function r2(){var t;const e=(t=z.uploadInput.files)==null?void 0:t[0];if(e)try{const n=await x1(e),r=J1(n.mask,n.imageData.width,n.imageData.height,b.contourPoints||256);r.contour=n.contour;const i=e2(n.imageData,n.mask,r),a={id:-Date.now(),file:e.name,name:`Uploaded shell ${e.name}`,species:"Uploaded shell",specimen:"",specimen_label:"Bring your own shell",view:"",view_label:"Uploaded image",component_count:1,contour_pc:Jw(n.fingerprint),upload_contour:r.contour,fingerprint:n.fingerprint,...i};a.trait_pc=n2(a),a.morph_traits=_h(a),a.fingerprint_hash=await xh(n.fingerprint),a.species_sample_count=1,a.global_occurrences=0,a.rarity_label="Data deficient",a.rarity_reason="uploaded image",a.location_label="Uploaded image",a.location_key="uploaded",a.location_color=Fr("uploaded"),a.species_color=Fr(a.species),b.uploadImageUrl&&URL.revokeObjectURL(b.uploadImageUrl),b.uploadImageUrl=n.imageUrl||URL.createObjectURL(e),b.shells=[a,...b.shells.filter(s=>s.id>=0)],b.filtered=[a,...b.filtered.filter(s=>s.id>=0)],b.shellById.set(a.id,a),ui(a),mn(a),z.statusLine.textContent="Uploaded shell projected"}catch(n){z.statusLine.textContent=n.message||"Upload failed"}finally{z.uploadInput.value=""}}function Js(e=!0){b.walkingPca=!1,window.cancelAnimationFrame(b.walkFrame),z.walkPca.textContent="Walk",z.walkPca.setAttribute("aria-pressed","false"),e&&Vt()}function I0(e){if(!b.walkingPca)return;b.walkStartedAt||(b.walkStartedAt=e);const t=(e-b.walkStartedAt)/1e3,n=[...b.pcValues];for(let r=0;r<ir();r+=1){const i=b.model.contour_pca_ranges[r],a=i?i.p99-i.p01:1;n[r]=Math.sin(t*(.32+r*.045)+r*1.73)*a*(.18+r*.018)}eo(n,!1),b.walkFrame=window.requestAnimationFrame(I0)}function i2(){if(b.walkingPca){Js();return}b.walkingPca=!0,b.walkStartedAt=0,z.walkPca.textContent="Stop",z.walkPca.setAttribute("aria-pressed","true"),b.walkFrame=window.requestAnimationFrame(I0)}function a2(){Js(!1),eo(Array.from({length:b.model.contour_component_count||ir()},()=>0))}function s2(){var e,t,n,r,i,a;z.search.addEventListener("input",In),(e=z.filtersToggle)==null||e.addEventListener("click",()=>{var s;return La(((s=z.filtersPanel)==null?void 0:s.hidden)!==!1)}),(t=z.closeFilters)==null||t.addEventListener("click",()=>La(!1)),document.addEventListener("keydown",s=>{s.key==="Escape"&&La(!1)}),z.randomShell.addEventListener("click",g2),(n=z.resetTraitFilters)==null||n.addEventListener("click",Q1),z.xAxisSelect.addEventListener("change",()=>Qp(Number(z.xAxisSelect.value),b.yAxis)),z.yAxisSelect.addEventListener("change",()=>Qp(b.xAxis,Number(z.yAxisSelect.value))),z.colorModeSelect.addEventListener("change",()=>{b.colorMode=z.colorModeSelect.value,Ge(),Vt()}),z.meanShape.addEventListener("click",a2),z.walkPca.addEventListener("click",i2),z.starShell.addEventListener("click",N1),z.uploadShell.addEventListener("click",()=>z.uploadInput.click()),z.uploadInput.addEventListener("change",r2),z.exportSvg.addEventListener("click",o_),(r=z.starredBand)==null||r.addEventListener("pointermove",D1),(i=z.starredBand)==null||i.addEventListener("pointerleave",()=>{Vp(),Jn(1200)}),(a=z.starredBand)==null||a.addEventListener("pointercancel",Vp),z.zoomIn.addEventListener("click",()=>Fa(.72)),z.zoomOut.addEventListener("click",()=>Fa(1.38)),z.resetView.addEventListener("click",()=>{b.viewport=ai(b.xAxis,b.yAxis),Ge()}),z.scatter.addEventListener("wheel",s=>{if(s.preventDefault(),Jn(1800),s.shiftKey){const o=z.scatter.getBoundingClientRect();Fa(s.deltaY>0?1.12:.88,{x:s.clientX-o.left,y:s.clientY-o.top});return}v2(s.deltaX,s.deltaY)}),z.scatter.addEventListener("pointerdown",s=>{if(s.button===1){s.preventDefault(),z.scatter.setPointerCapture(s.pointerId),c2(s);return}if(s.button!==0)return;b.holdingNearest=!0;const o=z.scatter.getBoundingClientRect(),l=hs(s.clientX-o.left,s.clientY-o.top);b.pendingSelectShell=l,l?Qr(l,16):(b.draggingTarget=!0,b.targetDragStart={pointerId:s.pointerId,clientX:s.clientX,clientY:s.clientY,active:!1,ignoreRealShells:!0},z.pointTooltip.hidden=!0)}),z.scatter.addEventListener("pointermove",s=>{if(b.panningViewport){s.preventDefault(),p2(s);return}if(b.draggingTarget){const o=b.targetDragStart;if(o&&!o.active){if(Math.hypot(s.clientX-o.clientX,s.clientY-o.clientY)<4)return;o.active=!0}jp(s),z.pointTooltip.hidden=!0;return}if(b.holdingNearest){z.pointTooltip.hidden=!0;return}m2(s)}),z.scatter.addEventListener("mousedown",s=>{if(s.button!==0||b.draggingTarget||b.holdingNearest||b.panningViewport)return;b.holdingNearest=!0;const o=z.scatter.getBoundingClientRect(),l=hs(s.clientX-o.left,s.clientY-o.top);b.pendingSelectShell=l,l?Qr(l,16):(b.draggingTarget=!0,b.targetDragStart={pointerId:-1,clientX:s.clientX,clientY:s.clientY,active:!1,ignoreRealShells:!0},z.pointTooltip.hidden=!0)}),z.scatter.addEventListener("mousemove",s=>{if(!b.draggingTarget||(s.buttons&1)!==1)return;const o=b.targetDragStart;if(o&&!o.active){if(Math.hypot(s.clientX-o.clientX,s.clientY-o.clientY)<4)return;o.active=!0}jp(s),z.pointTooltip.hidden=!0});for(const s of["pointerup","pointercancel"])z.scatter.addEventListener(s,o=>{var c,h,f;const l=s==="pointerup"&&b.draggingTarget&&!((c=b.targetDragStart)!=null&&c.active);Kp(),l&&ei(o);const d=s==="pointerup";b.holdingNearest=!1,b.draggingTarget=!1,b.targetDragStart=null,b.targetEvent=null,h2(),d?qp():b.pendingSelectShell=null;try{(f=(h=z.scatter).hasPointerCapture)!=null&&f.call(h,o.pointerId)&&z.scatter.releasePointerCapture(o.pointerId)}catch{}s!=="pointerup"&&(z.pointTooltip.hidden=!0)});window.addEventListener("mouseup",s=>{var l;if(!b.holdingNearest&&!b.draggingTarget)return;const o=b.draggingTarget&&!((l=b.targetDragStart)!=null&&l.active);Kp(),o&&ei(s),b.holdingNearest=!1,b.draggingTarget=!1,b.targetDragStart=null,b.targetEvent=null,qp()}),z.scatter.addEventListener("pointerleave",()=>{b.draggingTarget||b.panningViewport||(z.pointTooltip.hidden=!0)}),z.scatter.addEventListener("auxclick",s=>{s.button===1&&s.preventDefault()}),window.addEventListener("resize",()=>{Ge(),S0(b.selected),Tn(),li(),Jr()}),window.addEventListener("scroll",()=>{Jr(),Jn(1800)},!0),window.addEventListener("wheel",()=>Jn(1800),{passive:!0,capture:!0})}function mn(e,{renderNearest:t=!0,preferFastSource:n=!1}={}){var r;if(!e)return;b.walkingPca&&Js(!1),e.id>=0&&b.uploadImageUrl&&(URL.revokeObjectURL(b.uploadImageUrl),b.uploadImageUrl=""),b.selected=e,b.selectedContour=t_(e),b.generatedContour=b.selectedContour,b.generatedTraits=$h(e),b.generatedMode="selected",(e.contour_pc||[]).forEach((a,s)=>{b.pcValues[s]=a,ar(s,a)}),z.selectedName.textContent=e.species,Th(),C0(),z.selectedDetails.innerHTML="";const i=[["Fingerprint",e.fingerprint_hash||"-"],["Rarity",e.rarity_label||"Data deficient"],["Origin",Hw(e)]];if(e.area!=null&&e.image_width!=null&&e.image_height!=null&&i.push(["Area",`${mt(Fw(e),2)} cm²`]),e.mean_radius!=null&&e.image_width!=null&&e.image_height!=null&&i.push(["Mean radius",`${mt(Ww(e),2)} cm`]),e.color_l_mean!=null&&i.push(["Lightness",Oi(e.color_l_mean)]),e.contour_concavity!=null&&i.push(["Concavity",Oi(e.contour_concavity/.32)]),((r=e.morph_traits)==null?void 0:r.asymmetry)!=null&&i.push(["Asymmetry",Oi(e.morph_traits.asymmetry)]),e.image_width!=null&&e.image_height!=null){const a=ms(e);i.push(["Scale",`${mt(a.widthCm,2)} x ${mt(a.heightCm,2)} cm frame`])}for(const[a,s]of i){const o=document.createElement("dt");o.textContent=a;const l=document.createElement("dd");l.textContent=s,z.selectedDetails.append(o,l)}b.sourceFrame=null,S0(e,{preferFastSource:n}),t?Qr(e):z.neighborsList.innerHTML="",Ch(),Tn(!1),Ge(120),Vt()}function hs(e,t){const n=pn(z.scatter,me),r=yh(n);let i=null,a=1/0;const s=Math.floor(e/r.cellSize),o=Math.floor(t/r.cellSize);for(let l=0;l<=1;l+=1){for(let d=o-l;d<=o+l;d+=1)for(let c=s-l;c<=s+l;c+=1){if(l&&c>s-l&&c<s+l&&d>o-l&&d<o+l)continue;const h=r.grid.get(`${c},${d}`);if(h)for(const f of h){const g=r.points[f*2]-e,w=r.points[f*2+1]-t,_=g*g+w*w;_<a&&(a=_,i=r.shells[f])}}if(a<=196)break}return a<=196?i:null}function o2(e,t,n,r=4){b.screenNeighborScanCount+=1;const i=pn(z.scatter,me),a=yh(i);if(!a.shells.length)return[];const s=Math.floor(e/a.cellSize),o=Math.floor(t/a.cellSize),l=[],d=new Set;let c=-1,h=-1;const f=Math.ceil(Math.max(i.width,i.height)/a.cellSize);for(let g=0;g<=f;g+=1){for(let w=o-g;w<=o+g;w+=1)for(let _=s-g;_<=s+g;_+=1){if(g&&_>s-g&&_<s+g&&w>o-g&&w<o+g)continue;const T=a.grid.get(`${_},${w}`);if(T)for(const v of T){if(d.has(v))continue;d.add(v);const x=a.points[v*2]-e,C=a.points[v*2+1]-t,k=x*x+C*C;if(l.length<r){l.push({screenDistance:k,shell:a.shells[v]}),k>h&&(h=k,c=l.length-1);continue}if(!(k>=h)){l[c]={screenDistance:k,shell:a.shells[v]},h=-1;for(let E=0;E<l.length;E+=1)l[E].screenDistance>h&&(h=l[E].screenDistance,c=E)}}}if(l.length>=r&&g>=2)break}return l.sort((g,w)=>g.screenDistance-w.screenDistance),l.map(g=>{const w=oi(g.shell,n,Ys());return{distance:Math.sqrt(w.rawSq),similarity:Zs(w),shell:g.shell}})}function l2(e,t){b.xAxis>=0&&b.xAxis<e.length&&(e[b.xAxis]=t.x),b.yAxis>=0&&b.yAxis<e.length&&b.yAxis!==b.xAxis&&(e[b.yAxis]=t.y)}function u2(e,t){const n=Ys(),r=new Set(n),i=(t||[]).map(a=>({distance:oi(a.shell,e,n).normalizedSq,shell:a.shell})).sort((a,s)=>a.distance-s.distance);if(!i.length)return e;if(i[0].distance<1e-10){const a=i[0].shell.contour_pc||[];for(let s=0;s<e.length;s+=1)r.has(s)||(e[s]=a[s]||0);return e}for(let a=0;a<e.length;a+=1){if(r.has(a))continue;let s=0,o=0;for(const l of i){const d=l.shell.contour_pc||[];if(a>=d.length)continue;const c=1/Math.max(l.distance,1e-6);s+=(d[a]||0)*c,o+=c}e[a]=o?s/o:0}return e}function Gp(e,t=null){var i;const n=Math.max(((i=b.model)==null?void 0:i.contour_component_count)||0,b.pcValues.length,ir()),r=Array.from({length:n},()=>0);return l2(r,e),u2(r,t)}function d2(e,{updateControls:t=!0}={}){e.forEach((n,r)=>{b.pcValues[r]=n,t&&ar(r,n)}),ys()}function ei(e,{updateControls:t=!1}={}){const n=z.scatter.getBoundingClientRect(),r=pn(z.scatter,me),i=e.clientX-n.left,a=e.clientY-n.top,s=hh(i,a,r),o=Gp(s),l=o2(i,a,o,8),d=Gp(s,l);d2(d,{updateControls:t}),t||z0(d),I1(d,l.slice(0,4)),Ge(),Vt()}function jp(e){b.targetEvent={clientX:e.clientX,clientY:e.clientY},!b.targetFrame&&(b.targetFrame=window.requestAnimationFrame(()=>{b.targetFrame=0;const t=b.targetEvent;t&&ei(t)}))}function Kp(){var t;b.targetFrame&&(window.cancelAnimationFrame(b.targetFrame),b.targetFrame=0);const e=b.targetEvent;b.targetEvent=null,e&&((t=b.targetDragStart)!=null&&t.active)&&ei(e),z0()}function c2(e){const t=z.scatter.getBoundingClientRect();b.panningViewport={pointerId:e.pointerId,startX:e.clientX-t.left,startY:e.clientY-t.top,viewport:{...b.viewport}},b.draggingTarget=!1,b.targetDragStart=null,b.targetEvent=null,b.pendingSelectShell=null,z1(),b.targetFrame&&(window.cancelAnimationFrame(b.targetFrame),b.targetFrame=0),b.holdingNearest=!1,z.scatter.classList.add("is-panning"),z.pointTooltip.hidden=!0}function p2(e){if(!b.panningViewport||b.panningViewport.pointerId!==e.pointerId)return;const t=z.scatter.getBoundingClientRect(),n=pn(z.scatter,me),r=b.panningViewport,i=r.viewport,a=(e.clientX-t.left-r.startX)/n.width*(i.maxX-i.minX),s=(e.clientY-t.top-r.startY)/n.height*(i.maxY-i.minY);b.viewport={minX:i.minX-a,maxX:i.maxX-a,minY:i.minY+s,maxY:i.maxY+s},Ge()}function h2(){b.panningViewport&&(b.panningViewport=null,z.scatter.classList.remove("is-panning"),Vt())}function f2(e,t){if(!t){z.pointTooltip.hidden=!0;return}const n=z.scatter.getBoundingClientRect(),r=document.createElement("strong");r.textContent=t.species;const i=[r,document.createTextNode(t.file),document.createElement("br"),document.createTextNode(`${t.specimen_label||t.specimen||"Unknown specimen"}, ${t.view_label||t.view||"Unknown view"}`),document.createElement("br"),document.createTextNode(`${Va(b.xAxis)} ${mt(Wt(t,b.xAxis))}, ${Va(b.yAxis)} ${mt(Wt(t,b.yAxis))}`)];t.color_l_mean!=null&&i.push(document.createElement("br"),document.createTextNode(`${n_(t)}, lightness ${mt(t.color_l_mean,3)}`)),z.pointTooltip.replaceChildren(...i),z.pointTooltip.style.left=`${Math.min(Math.max(8,n.width-248),Math.max(8,e.clientX-n.left+14))}px`,z.pointTooltip.style.top=`${Math.min(Math.max(8,n.height-84),Math.max(8,e.clientY-n.top+14))}px`,z.pointTooltip.hidden=!1}function m2(e){b.tooltipEvent={clientX:e.clientX,clientY:e.clientY},!b.tooltipFrame&&(b.tooltipFrame=requestAnimationFrame(()=>{b.tooltipFrame=0;const t=performance.now();if(t-b.tooltipLastAt<60)return;b.tooltipLastAt=t;const n=b.tooltipEvent;if(!n)return;const r=z.scatter.getBoundingClientRect();f2(n,hs(n.clientX-r.left,n.clientY-r.top))}))}function fs(e){const t=Number(e);return Number.isFinite(t)&&b.shellById.get(t)||null}function ui(e){if(!b.viewport||!e)return;const t=b.viewport.maxX-b.viewport.minX,n=b.viewport.maxY-b.viewport.minY,r=Wt(e,b.xAxis),i=Wt(e,b.yAxis);b.viewport={minX:r-t/2,maxX:r+t/2,minY:i-n/2,maxY:i+n/2}}function g2(){const e=b.filtered.length?b.filtered:b.shells;if(!e.length)return;const t=p_(e)||ja(e);t&&(ui(t),mn(t,{preferFastSource:!0,renderNearest:!1}),Ge(420))}function Xp(e){return`https://www.iucnredlist.org/search?query=${encodeURIComponent(e||"")}&searchType=species`}function Br(e){return String(e||"").trim().toLowerCase()}function b2(e){const t=String(e||"").trim().toUpperCase();return{EX:"Extinct",EW:"Extinct in the wild",CR:"Critically endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near threatened",LC:"Least concern",DD:"Data deficient"}[t]||t}function Yp(e){return e&&e.place==null&&e.place_id==null}function Zp(e){return/iucn/i.test(String((e==null?void 0:e.authority)||""))||Number((e==null?void 0:e.iucn)||0)>0}function y2(...e){const t=[];for(const n of e)n&&(n.conservation_status&&t.push(n.conservation_status),Array.isArray(n.conservation_statuses)&&t.push(...n.conservation_statuses));return t.find(n=>Yp(n)&&Zp(n))||t.find(n=>Zp(n))||t.find(n=>Yp(n))||t[0]||null}function w2(e){if(!e)return"Not assessed";const t=String(e.status||"").trim().toUpperCase(),n=e.status_name||e.description||b2(t)||t,r=String(n||"").trim();return r?!t||r.toUpperCase().includes(`(${t})`)||r.toUpperCase()===t?r:`${r} (${t})`:"Not assessed"}function _2(e,t){const n=Br(t);return e.find(r=>Br(r.name)===n)||e.find(r=>Br(r.matched_term)===n)||e.find(r=>r.rank==="species")||e[0]||null}async function x2(e,{signal:t=null}={}){var n;const r=Br(e);if(!r)return{status:"Not assessed",authority:"",url:"",taxonId:null};if(b.conservationCache.has(r))return b.conservationCache.get(r);const i=new URLSearchParams({q:e,per_page:"8"}),a={status:"Not assessed",authority:"iNaturalist",url:Xp(e),taxonId:null};try{const s=await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${i.toString()}`,{signal:t});if(!s.ok)return a;const o=await s.json(),l=_2(o.results||[],e);if(!(l!=null&&l.id))return b.conservationCache.set(r,a),a;let d=l;const c=await fetch(`https://api.inaturalist.org/v1/taxa/${l.id}`,{signal:t});c.ok&&(d=((n=(await c.json()).results)==null?void 0:n[0])||l);const h=y2(d,l),f={status:w2(h),authority:(h==null?void 0:h.authority)||"iNaturalist",url:(h==null?void 0:h.url)||Xp(e),taxonId:l.id};return b.conservationCache.set(r,f),f}catch(s){if((s==null?void 0:s.name)==="AbortError")throw s;return a}}function Fa(e,t=null){const n=pn(z.scatter,me),r=t||{x:n.width/2,y:n.height/2},i=hh(r.x,r.y,n),a=b.viewport,s=ai(b.xAxis,b.yAxis),o=s.maxX-s.minX,l=s.maxY-s.minY,d=Math.max(o*.04,.001),c=Math.max(l*.04,.001),h=Math.max(o*8,d),f=Math.max(l*8,c),g=Math.max(d,Math.min(h,(a.maxX-a.minX)*e)),w=Math.max(c,Math.min(f,(a.maxY-a.minY)*e));b.viewport={minX:i.x-r.x/n.width*g,maxX:i.x+(1-r.x/n.width)*g,minY:i.y-(n.height-r.y)/n.height*w,maxY:i.y+r.y/n.height*w},Ge()}function v2(e,t){const n=pn(z.scatter,me),r=b.viewport;if(!r||!n.width||!n.height)return;const i=e/n.width*(r.maxX-r.minX),a=t/n.height*(r.maxY-r.minY);b.viewport={minX:r.minX+i,maxX:r.maxX+i,minY:r.minY-a,maxY:r.maxY-a},Ge()}function $2(){const e=ch();for(const t of[z.xAxisSelect,z.yAxisSelect]){t.innerHTML="";for(let n=0;n<e;n+=1){const r=document.createElement("option");r.value=String(n),r.textContent=`${Va(n)} (${mt(Nw(n)*100,1)}%)`,t.append(r)}}z.xAxisSelect.value=String(b.xAxis),z.yAxisSelect.value=String(b.yAxis)}function Qp(e,t){b.xAxis=e,b.yAxis=t,z.xAxisSelect.value=String(e),z.yAxisSelect.value=String(t),b.viewport=ai(e,t),Ge(120),Vt()}function S2(){z.pcControls.innerHTML="";const e=ir();b.pcValues=Array.from({length:b.model.contour_component_count||e},()=>0),b.pcControlRows=[];for(let t=0;t<e;t+=1){const n=b.model.contour_pca_ranges[t],r=n?n.p01:-1,i=n?n.p99:1,a=Math.max((i-r)/500,.001),s=document.createElement("div");s.className="pc-row";const o=document.createElement("label");o.textContent=ph(t);const l=document.createElement("input");l.type="range",l.min=String(r),l.max=String(i),l.step=String(a),l.value="0";const d=document.createElement("input");d.type="number",d.step=String(a),d.value="0.000",l.addEventListener("input",()=>Jp(t,Number(l.value))),d.addEventListener("change",()=>Jp(t,Number(d.value))),s.append(o,l,d),b.pcControlRows[t]={slider:l,number:d},z.pcControls.append(s)}}function ar(e,t){const n=b.pcControlRows[e];n&&(n.slider.value=String(t),n.number.value=Number(t).toFixed(3))}function z0(e=b.pcValues){e.forEach((t,n)=>ar(n,t))}function Jp(e,t){b.pcValues[e]=t,ar(e,t),ys(),Ge(),Vt()}function eo(e,t=!0){e.forEach((n,r)=>{b.pcValues[r]=n,ar(r,n)}),ys(),Ge(),t&&Vt()}window.shellspacePerf={selectedId:()=>{var e;return((e=b.selected)==null?void 0:e.id)??null},neighborCacheSize:()=>b.neighborCache.size,surpriseQueueSize:()=>b.surpriseQueue.length,surpriseReadyCount:()=>b.surpriseQueue.length,scatterPointCount:()=>{var e,t;return((t=(e=b.scatterPointCache)==null?void 0:e.shells)==null?void 0:t.length)||0},starredHydratedCount:()=>b.starredHydratedCount,screenNeighborScanCount:()=>b.screenNeighborScanCount,resetScreenNeighborScanCount:()=>{b.screenNeighborScanCount=0},sourceMode:()=>b.sourceMode,filteredCount:()=>b.filtered.length,lookupConservationStatus:x2,conservationStatusForSelected:()=>mh(b.selected),selectSpecies:e=>{const t=b.shells.find(n=>n.species===e);return t&&mn(t),(t==null?void 0:t.id)??null}};async function k2(){s2(),Kn("Opening fingerprint data");const{model:e,shells:t}=await e_();b.model=e,b.shells=t,b.shellById=new Map(b.shells.map(h=>[h.id,h])),Kw(b.shells,null,null),zn(),b.filtered=b.shells,b.contours=null,b.contourPoints=e.contour_points||0,b.contourScale=e.contour_scale||1;const n=e.species_count?`${e.processed_count.toLocaleString()} shells, ${e.species_count.toLocaleString()} species`:`${e.processed_count.toLocaleString()} shells`;z.statusLine.textContent=n;const r=Mw();Tw.includes(r.get("color"))&&(b.colorMode=r.get("color"));const i=ch(),a=r.get("x"),s=r.get("y"),o=a==null?NaN:Number(a),l=s==null?NaN:Number(s);Number.isInteger(o)&&o>=0&&o<i&&(b.xAxis=o),Number.isInteger(l)&&l>=0&&l<i&&(b.yAxis=l),b.viewport=ai(b.xAxis,b.yAxis),$2(),S2(),z.colorModeSelect.value=b.colorMode,M1(),Kn("Loading Python"),await b0(),Kn("Loading rembg"),await y0(),z.statusLine.textContent=n,b.suppressHash=!0;const d=fs(r.get("id"))||b.shells[0];mn(d,{renderNearest:!1});const c=(r.get("pc")||"").split(",").filter(h=>h.trim()!=="").map(h=>Number(h)).filter(h=>Number.isFinite(h));c.length&&eo(c.slice(0,6),!1),b.suppressHash=!1,b.hashReady=!0,li(),Tn(),Ge(),dh(),Kn("",!1),Eh()}function T2(){nw(),k2().catch(e=>{z.statusLine.textContent=e.message,Kn("",!1),z.missingData&&(z.missingData.hidden=!1),console.error(e)})}const C2=Object.freeze(Object.defineProperty({__proto__:null,startShellspace:T2},Symbol.toStringTag,{value:"Module"}));
