var jy=Object.defineProperty;var Ky=(e,t,n)=>t in e?jy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Pe=(e,t,n)=>Ky(e,typeof t!="symbol"?t+"":t,n);const Xy="modulepreload",Yy=function(e){return"/"+e},au={},Zy=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=s(n.map(u=>{if(u=Yy(u),u in au)return;au[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Xy,c||(f.as="script"),f.crossOrigin="",f.href=u,l&&f.setAttribute("nonce",l),document.head.appendChild(f),c)return new Promise((g,y)=>{f.addEventListener("load",g),f.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return i.then(s=>{for(const o of s||[])o.status==="rejected"&&a(o.reason);return t().catch(a)})};let Qy=fh;const Cn=1,Lr=2,ch={owned:null,cleanups:null,context:null,owner:null};var Ge=null;let Pi=null,Jy=null,xt=null,tt=null,on=null,ni=0;function ew(e,t){const n=xt,r=Ge,i=e.length===0,a=t===void 0?r:t,s=i?ch:{owned:null,cleanups:null,context:a?a.context:null,owner:a},o=i?e:()=>e(()=>ri(()=>rr(s)));Ge=s,xt=null;try{return ii(o,!0)}finally{xt=n,Ge=r}}function Fr(e,t,n){const r=rw(e,t,!1,Cn);ph(r)}function ri(e){if(xt===null)return e();const t=xt;xt=null;try{return e()}finally{xt=t}}function tw(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&ii(()=>{for(let i=0;i<e.observers.length;i+=1){const a=e.observers[i],s=Pi&&Pi.running;s&&Pi.disposed.has(a),(s?!a.tState:!a.state)&&(a.pure?tt.push(a):on.push(a),a.observers&&mh(a)),s||(a.state=Cn)}if(tt.length>1e6)throw tt=[],new Error},!1)),t}function ph(e){if(!e.fn)return;rr(e);const t=ni;nw(e,e.value,t)}function nw(e,t,n){let r;const i=Ge,a=xt;xt=Ge=e;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=Cn,e.owned&&e.owned.forEach(rr),e.owned=null),e.updatedAt=n+1,gh(s)}finally{xt=a,Ge=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?tw(e,r):e.value=r,e.updatedAt=n)}function rw(e,t,n,r=Cn,i){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Ge,context:Ge?Ge.context:null,pure:n};return Ge===null||Ge!==ch&&(Ge.owned?Ge.owned.push(a):Ge.owned=[a]),a}function hh(e){if(e.state===0)return;if(e.state===Lr)return Va(e);if(e.suspense&&ri(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ni);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===Cn)ph(e);else if(e.state===Lr){const r=tt;tt=null,ii(()=>Va(e,t[0]),!1),tt=r}}function ii(e,t){if(tt)return e();let n=!1;t||(tt=[]),on?n=!0:on=[],ni++;try{const r=e();return iw(n),r}catch(r){n||(on=null),tt=null,gh(r)}}function iw(e){if(tt&&(fh(tt),tt=null),e)return;const t=on;on=null,t.length&&ii(()=>Qy(t),!1)}function fh(e){for(let t=0;t<e.length;t++)hh(e[t])}function Va(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===Cn?r!==t&&(!r.updatedAt||r.updatedAt<ni)&&hh(r):i===Lr&&Va(r,t)}}}function mh(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Lr,n.pure?tt.push(n):on.push(n),n.observers&&mh(n))}}function rr(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const a=i.pop(),s=n.observerSlots.pop();r<i.length&&(a.sourceSlots[s]=r,i[r]=a,n.observerSlots[r]=s)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)rr(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)rr(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function aw(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function gh(e,t=Ge){throw aw(e)}function Je(e,t){return ri(()=>e(t||{}))}function sw(e,t,n){let r=n.length,i=t.length,a=r,s=0,o=0,l=t[i-1].nextSibling,u=null;for(;s<i||o<a;){if(t[s]===n[o]){s++,o++;continue}for(;t[i-1]===n[a-1];)i--,a--;if(i===s){const c=a<r?o?n[o-1].nextSibling:n[a-o]:l;for(;o<a;)e.insertBefore(n[o++],c)}else if(a===o)for(;s<i;)(!u||!u.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[a-1]&&n[o]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(n[o++],t[s++].nextSibling),e.insertBefore(n[--a],c),t[i]=n[a]}else{if(!u){u=new Map;let p=o;for(;p<a;)u.set(n[p],p++)}const c=u.get(t[s]);if(c!=null)if(o<c&&c<a){let p=s,f=1,g;for(;++p<i&&p<a&&!((g=u.get(t[p]))==null||g!==c+f);)f++;if(f>c-o){const y=t[s];for(;o<c;)e.insertBefore(n[o++],y)}else e.replaceChild(n[o++],t[s++])}else s++;else t[s++].remove()}}}function ow(e,t,n,r={}){let i;return ew(a=>{i=a,t===document?e():vt(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function it(e,t,n,r){let i;const a=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},s=()=>(i||(i=a())).cloneNode(!0);return s.cloneNode=s,s}function lw(e,t){t==null?e.removeAttribute("class"):e.className=t}function fe(e,t,n){return ri(()=>e(t,n))}function vt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return Wr(e,t,r,n);Fr(i=>Wr(e,t(),i,n),r)}function Wr(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(s){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=_n(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=_n(e,n,r);else{if(a==="function")return Fr(()=>{let o=t();for(;typeof o=="function";)o=o();n=Wr(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],l=n&&Array.isArray(n);if(Ha(o,t,n,i))return Fr(()=>n=Wr(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=_n(e,n,r),s)return n}else l?n.length===0?su(e,o,r):sw(e,n,o):(n&&_n(e),su(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(s)return n=_n(e,n,r,t);_n(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Ha(e,t,n,r){let i=!1;for(let a=0,s=t.length;a<s;a++){let o=t[a],l=n&&n[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=Ha(e,o,l)||i;else if(u==="function")if(r){for(;typeof o=="function";)o=o();i=Ha(e,Array.isArray(o)?o:[o],Array.isArray(l)?l:[l])||i}else e.push(o),i=!0;else{const c=String(o);l&&l.nodeType===3&&l.data===c?e.push(l):e.push(document.createTextNode(c))}}return i}function su(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function _n(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let a=!1;for(let s=t.length-1;s>=0;s--){const o=t[s];if(i!==o){const l=o.parentNode===e;!a&&!s?l?e.replaceChild(i,o):e.insertBefore(i,n):l&&o.remove()}else a=!0}}else e.insertBefore(i,n);return[i]}const uw=`@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600;700;800&display=swap");

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

.settings-toggle {
  width: 38px;
  min-width: 38px;
  padding: 0;
  display: grid;
  place-items: center;
}

.settings-toggle svg {
  width: 18px;
  height: 18px;
}

.settings-toggle path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.settings-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 16px;
  z-index: 80;
  width: min(320px, calc(100vw - 32px));
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow);
  display: grid;
  gap: 14px;
}

.settings-panel section {
  display: grid;
  gap: 9px;
}

.settings-panel ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
}

.danger-button {
  justify-content: center;
  border-color: rgba(176, 57, 48, 0.42);
  color: #8b332c;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(253, 239, 236, 0.9)),
    var(--panel);
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
  min-height: 92px;
  padding: 6px;
  overflow: hidden;
  border-radius: 7px;
  background:
    radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.9), rgba(246, 241, 229, 0.78) 58%, rgba(222, 218, 204, 0.52)),
    #f7f7f2;
  display: grid;
  place-items: center;
}

.neighbor-button img,
.neighbor-button canvas {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.neighbor-button canvas {
  transform: scale(0.94);
}

.neighbor-button img {
  position: absolute;
  inset: 0;
  margin: auto;
  padding: 7px;
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
`,m={shells:[],filtered:[],contours:null,contourPoints:0,contourScale:1,model:null,viewport:null,selected:null,selectedContour:null,generatedContour:null,generatedTraits:null,generatedMode:"selected",uploadImageUrl:"",xAxis:0,yAxis:1,colorMode:"species",pcValues:[],pcControlRows:[],morphFilters:new Map,categoryFilters:{origin:"",rarity:"",color:""},conservationCache:new Map,starredIds:[],showAllStars:!1,speciesCounts:new Map,speciesTraits:new Map,localityMatchRate:0,drawFrame:0,drawTimer:0,sourceFrame:null,sourceMode:"fallback",scatterHitCache:null,screenNeighborScanCount:0,starredHydrationTimer:0,starredHydrationRun:0,starredHydratedCount:0,starredThumbs:[],tooltipFrame:0,tooltipEvent:null,tooltipLastAt:0,holdingNearest:!1,pendingSelectShell:null,targetFrame:0,targetEvent:null,targetNeighborTimer:0,targetNeighborValues:null,targetNeighborLastAt:0,draggingTarget:!1,targetDragStart:null,panningViewport:null,walkingPca:!1,walkFrame:0,walkStartedAt:0,hashReady:!1,suppressHash:!1,hashTimer:0,needsDraw:!0,sourceToken:0,sourceLoadTimer:0,selectionRun:0,scatterPointCache:null,shellById:new Map,surpriseQueue:[],surpriseQueueSource:null,surprisePrimeTimer:0,neighborCache:new Map,neighborTimer:0,neighborHydrationTimer:0,neighborHydrationItems:[],neighborSearchRun:0,neighborSearchTimer:0,neighborToken:0,neighborRenderKey:"",pointColorCache:new Map,paletteCache:new Map,originFilterOptionsCache:null,mapShellImageIds:new Set},E={};let he=null,De=null;function dw(){he=E.scatter.getContext("2d"),De=E.outline.getContext("2d")}const xr=new Map,Ri=new Map,Rr=new Map,Et=new Map;var cw=it('<aside class="panel controls-panel">'),pw=it('<section class="panel-section search-section"><div class=search-row><label class=field><span>Search</span><input type=search placeholder="Species or Shellprint"></label><button class=filters-toggle title="Open filters"aria-expanded=false>Filters</button></div><div class=filters-popover hidden><header><h2>Filters</h2><button title="Close filters"aria-label="Close filters">x</button></header><div class=filter-controls></div><div class=filter-actions><button title="Reset filters">Reset</button></div></div><div class=shell-action-row><button class=surprise-shell title="Surprise me"aria-label="Surprise me"><svg viewBox="0 0 24 24"aria-hidden=true><rect x=4 y=4 width=16 height=16 rx=3.5></rect><circle cx=8.5 cy=8.5 r=1.2></circle><circle cx=15.5 cy=8.5 r=1.2></circle><circle cx=12 cy=12 r=1.2></circle><circle cx=8.5 cy=15.5 r=1.2></circle><circle cx=15.5 cy=15.5 r=1.2></circle></svg></button><button class=upload-shell title="Bring your own shell"><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 16V5"></path><path d="M7.5 9.5 12 5l4.5 4.5"></path><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"></path></svg><span>Bring your own shell</span></button></div><input type=file accept=image/* hidden><div class=section-title><h2>Map</h2></div><div class=axis-grid><label><span>X</span><select></select></label><label><span>Y</span><select></select></label></div><label class=field><span>Color</span><select><option value=locality>Location</option><option value=species>Species</option><option value=conservation>Conservation</option><option value=shell>Shell color</option><option value=pattern>Pattern</option><option value=lightness>Lightness</option><option value=concavity>Concavity'),hw=it('<section class="panel-section physical-shell"><div class=section-title><h2>Physical Shell <span class="fingerprint-chip compact">------</span></h2><button class=star-button title="Star this shape"aria-label="Star this shape"aria-pressed=false><svg class=star-icon viewBox="0 0 24 24"aria-hidden=true><path class=star-shape d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z"></path></svg></button></div><div class=source-frame><div class=source-spinner hidden></div><img class=source-image alt hidden></div><div class=selected-name>None</div><dl>');function fw(){return(()=>{var e=cw();return fe(t=>{E.controlsPanel=t},e),vt(e,Je(mw,{}),null),vt(e,Je(gw,{}),null),e})()}function mw(){return(()=>{var e=pw(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,s=t.nextSibling,o=s.firstChild,l=o.firstChild,u=l.nextSibling,c=o.nextSibling,p=c.nextSibling,f=p.firstChild,g=s.nextSibling,y=g.firstChild,_=y.nextSibling,T=g.nextSibling,v=T.nextSibling,x=v.nextSibling,C=x.firstChild,k=C.firstChild,I=k.nextSibling,M=C.nextSibling,A=M.firstChild,$=A.nextSibling,O=x.nextSibling,U=O.firstChild,H=U.nextSibling;return fe(F=>{E.search=F},i),fe(F=>{E.filtersToggle=F},a),fe(F=>{E.filtersPanel=F},s),fe(F=>{E.closeFilters=F},u),fe(F=>{E.filterControls=F},c),fe(F=>{E.resetTraitFilters=F},f),fe(F=>{E.randomShell=F},y),fe(F=>{E.uploadShell=F},_),fe(F=>{E.uploadInput=F},T),fe(F=>{E.xAxisSelect=F},I),fe(F=>{E.yAxisSelect=F},$),fe(F=>{E.colorModeSelect=F},H),e})()}function gw(){return(()=>{var e=hw(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,s=t.nextSibling,o=s.firstChild,l=o.nextSibling,u=s.nextSibling,c=u.nextSibling;return fe(p=>{E.physicalHash=p},i),fe(p=>{E.starShell=p},a),fe(p=>{E.sourceSpinner=p},o),fe(p=>{E.sourceImage=p},l),fe(p=>{E.selectedName=p},u),fe(p=>{E.selectedDetails=p},c),e})()}var bw=it('<section class=scatter-panel aria-label="PCA scatter plot"><canvas class=scatter-canvas></canvas><div class=point-tooltip hidden>');function yw(){return(()=>{var e=bw(),t=e.firstChild,n=t.nextSibling;return fe(r=>{E.scatter=r},t),fe(r=>{E.pointTooltip=r},n),e})()}var ww=it('<div class=loading-overlay><div class=rpg-loader aria-hidden=true><div class=loader-shadow></div><div class=loader-aura></div><div class=loader-pearl><span class="pearl-spark spark-1"></span><span class="pearl-spark spark-2"></span><span class="pearl-spark spark-3"></span></div></div><p>Opening shell data'),_w=it("<div class=missing-data hidden><div><h2>Processed Data Missing</h2><p>Build FFT fingerprints, export static data, then refresh the app.</p><code>make fingerprints export-static"),xw=it('<div><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip>');function vw(){return(()=>{var e=ww(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=t.nextSibling;return fe(s=>{E.loadingOverlay=s},e),vt(t,Je(ou,{position:"top"}),i),vt(t,Je(ou,{position:"bottom"}),i),fe(s=>{E.loadingText=s},a),e})()}function $w(){return(()=>{var e=_w();return fe(t=>{E.missingData=t},e),e})()}function ou(e){return(()=>{var t=xw();return Fr(()=>lw(t,`loader-shell loader-shell-${e.position}`)),t})()}var Sw=it('<aside class="panel lab-panel">'),kw=it('<section class="panel-section projected-lab"><div class=generated-shape><div class=section-title><h2>Projected Shell <span class="fingerprint-chip compact">------</span></h2></div><div class=projection-frame><canvas class=outline-canvas width=420 height=420></canvas><button class=svg-export title="Export generated shell as SVG">SVG</button></div></div><div class=color-palette><h2>Palette</h2><div class=palette-swatches></div></div><div class=slider-stack><div class=section-title><h2>Contour PCs</h2><div class=title-actions><button title="Reset contour coordinates">Mean</button><button title="Animate through contour PCA space">Walk</button></div></div><div class=pc-controls>'),Tw=it('<section class="panel-section neighbors"><div class=section-title><h2>Nearest Shells</h2></div><div class=neighbors-list>');function Cw(){return(()=>{var e=Sw();return vt(e,Je(Iw,{}),null),vt(e,Je(Ew,{}),null),e})()}function Iw(){return(()=>{var e=kw(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.firstChild,a=i.nextSibling,s=n.nextSibling,o=s.firstChild,l=o.nextSibling,u=t.nextSibling,c=u.firstChild,p=c.nextSibling,f=u.nextSibling,g=f.firstChild,y=g.firstChild,_=y.nextSibling,T=_.firstChild,v=T.nextSibling,x=g.nextSibling;return fe(C=>{E.projectedHash=C},a),fe(C=>{E.outline=C},o),fe(C=>{E.exportSvg=C},l),fe(C=>{E.paletteSwatches=C},p),fe(C=>{E.meanShape=C},T),fe(C=>{E.walkPca=C},v),fe(C=>{E.pcControls=C},x),e})()}function Ew(){return(()=>{var e=Tw(),t=e.firstChild,n=t.nextSibling;return fe(r=>{E.neighborsList=r},n),e})()}var zw=it('<header class=topbar><div class=brand-block><h1>Shellspace</h1><p class=status-line>Loading shell model</p></div><div class=starred-band aria-label="Starred shells"></div><div class=star-burst aria-hidden=true></div><div class=top-actions><button title="Zoom out">-</button><button title="Zoom in">+</button><button title="Reset map view">Reset</button><button class=settings-toggle title=Settings aria-label=Settings aria-expanded=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"></path><path d="m19 13.3.1-1.3-.1-1.3 2-1.5-1.9-3.2-2.4 1a8.6 8.6 0 0 0-2.2-1.3L14.2 3h-4.4l-.3 2.7A8.6 8.6 0 0 0 7.3 7L4.9 6 3 9.2l2 1.5-.1 1.3.1 1.3-2 1.5L4.9 18l2.4-1a8.6 8.6 0 0 0 2.2 1.3l.3 2.7h4.4l.3-2.7a8.6 8.6 0 0 0 2.2-1.3l2.4 1 1.9-3.2-2-1.5Z"></path></svg></button></div><div class=settings-panel hidden><section><h2>Settings</h2><button class=danger-button>Clear all data</button></section><section><h2>Controls</h2><ul><li>Two-finger pan moves the map.</li><li>Shift + two-finger pan zooms.</li><li>Click empty space projects a shell there.</li><li>Drag empty space walks through PCA space.');function Mw(){return(()=>{var e=zw(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=t.nextSibling,a=i.nextSibling,s=a.nextSibling,o=s.firstChild,l=o.nextSibling,u=l.nextSibling,c=u.nextSibling,p=s.nextSibling,f=p.firstChild,g=f.firstChild,y=g.nextSibling;return fe(_=>{E.statusLine=_},r),fe(_=>{E.starredBand=_},i),fe(_=>{E.starBurst=_},a),fe(_=>{E.zoomOut=_},o),fe(_=>{E.zoomIn=_},l),fe(_=>{E.resetView=_},u),fe(_=>{E.settingsToggle=_},c),fe(_=>{E.settingsPanel=_},p),fe(_=>{E.clearAllData=_},y),e})()}var Aw=it("<main class=workspace>");function Nw(){return[Je(Mw,{}),(()=>{var e=Aw();return vt(e,Je(fw,{}),null),vt(e,Je(yw,{}),null),vt(e,Je(Cw,{}),null),e})(),Je(vw,{}),Je($w,{})]}const bh=document.body.firstElementChild;if(!bh)throw new Error("Missing app root");const yh=document.createElement("style");yh.textContent=uw;document.head.append(yh);ow(()=>Je(Nw,{}),bh);Zy(async()=>{const{startShellspace:e}=await Promise.resolve().then(()=>Gx);return{startShellspace:e}},[]).then(({startShellspace:e})=>e());const Pw=["locality","species","conservation","shell","pattern","lightness","concavity"],ys="shellspace-starred",Rw="0.27.7",wh=`https://cdn.jsdelivr.net/pyodide/v${Rw}/full/`,Ow=`${wh}pyodide.js`,Bw=String.raw`
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
`,ai=[{key:"lightness",label:"Lightness",format:"percent"},{key:"area",label:"Area",format:"percent"},{key:"concavity",label:"Concavity",format:"percent"},{key:"asymmetry",label:"Asymmetry",format:"percent"}],lu=[{key:"low",label:"Low",min:0,max:1/3},{key:"medium",label:"Medium",min:1/3,max:2/3},{key:"high",label:"High",min:2/3,max:1}],Dw=["Common","Uncommon","Rare","Extremely rare","Data deficient"],uu=[["#f5ead0","Ivory"],["#d9c28d","Sand"],["#b68b57","Ochre"],["#7b5235","Umber"],["#3b2d25","Dark"],["#d7a295","Rose"],["#a94e44","Coral"],["#d07b39","Amber"],["#91885b","Olive"],["#7f9294","Blue gray"],["#c6c8c0","Pearl"],["#ffffff","White"]];function Uw(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;return new URLSearchParams(e)}function _h(){if(!m.hashReady||m.suppressHash)return;const e=new URLSearchParams;m.selected&&e.set("id",String(m.selected.id)),e.set("x",String(m.xAxis)),e.set("y",String(m.yAxis)),e.set("color",m.colorMode),e.set("pc",m.pcValues.slice(0,6).map(n=>Number(n).toFixed(3)).join(","));const t=`${window.location.pathname}${window.location.search}#${e.toString()}`;window.history.replaceState(null,"",t)}function Ht(){!m.hashReady||m.suppressHash||(window.clearTimeout(m.hashTimer),m.hashTimer=window.setTimeout(_h,80))}function fn(e,t){const n=e.getBoundingClientRect(),r=window.devicePixelRatio||1,i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r));return(e.width!==i||e.height!==a)&&(e.width=i,e.height=a,t.setTransform(r,0,0,r,0,0),e===E.scatter&&(m.needsDraw=!0,m.scatterHitCache=null,m.scatterPointCache=null)),{width:n.width,height:n.height}}function Lw(e){if(!e||e.id<0||!e.file)return Promise.resolve(null);if(Ri.has(e.file))return Ri.get(e.file);const t=new Promise(n=>{const r=new Image;r.decoding="async",r.onload=()=>n(r),r.onerror=()=>n(null),r.src=h2(e.file)});return Ri.set(e.file,t),t}function Fw(e,t=1200){if("requestIdleCallback"in window){window.requestIdleCallback(e,{timeout:t});return}window.setTimeout(e,Math.min(t,160))}function Ga(e,t=(n=>(n=m.selected)==null?void 0:n.id)()){if(!e.length)return null;let r=Math.floor(Math.random()*e.length);return t!=null&&e.length>1&&e[r].id===t&&(r=(r+1+Math.floor(Math.random()*(e.length-1)))%e.length),e[r]}function Ww(){m.surpriseQueue=[],m.surpriseQueueSource=null,window.clearTimeout(m.surprisePrimeTimer),m.surprisePrimeTimer=0}function qw(e){const t=new Set(m.surpriseQueue.map(r=>{var i;return(i=r.shell)==null?void 0:i.id}));let n=null;for(let r=0;r<12;r+=1){const i=Ga(e);if(!(!i||t.has(i.id))){n=i;break}}n||(n=Ga(e)),n&&m.surpriseQueue.push({shell:n,ready:!0})}function xh(e=m.filtered,t=12,n=80){e.length&&(m.surpriseQueueSource!==e&&(m.surpriseQueue=[],m.surpriseQueueSource=e),window.clearTimeout(m.surprisePrimeTimer),m.surprisePrimeTimer=window.setTimeout(()=>{Fw(()=>{for(;m.surpriseQueue.length<t;)qw(e)},500)},n))}function Vw(e){var t;if(m.surpriseQueueSource!==e||!m.surpriseQueue.length)return null;for(let n=0;n<m.surpriseQueue.length;n+=1){const r=m.surpriseQueue[n];if(!(!(r!=null&&r.shell)||r.shell.id===((t=m.selected)==null?void 0:t.id)))return m.surpriseQueue.splice(n,1),r.shell}return null}/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var ws=Object.defineProperty,Hw=Object.getOwnPropertyDescriptor,Gw=Object.getOwnPropertyNames,jw=Object.prototype.hasOwnProperty,Kw=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),In=(e,t)=>{for(var n in t)ws(e,n,{get:t[n],enumerable:!0})},Xw=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Gw(t))!jw.call(e,i)&&i!==n&&ws(e,i,{get:()=>t[i],enumerable:!(r=Hw(t,i))||r.enumerable});return e},ir=e=>Xw(ws({},"__esModule",{value:!0}),e),Dn,Ut,vn,du,vh,$h=q(()=>{Dn=new Map,Ut=[],vn=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Dn.get(e);if(r===void 0)Dn.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let i=Ut.indexOf(e);i!==-1&&Ut.splice(i,1);for(let a=0;a<Ut.length;a++)if(Dn.get(Ut[a]).priority<=n){Ut.splice(a,0,e);return}Ut.push(e)}return}throw new TypeError("not a valid backend")},du=async e=>{let t=Dn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},vh=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?Ut:n,i,a=[],s=new Set;for(let l of r){let u=await du(l);typeof u=="string"?a.push({name:l,err:u}):(i||(i=u),i===u&&s.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:u}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${u}`);let o=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,u)=>u==="executionProviders"?o:Reflect.get(l,u)})]}}),Yw=q(()=>{$h()}),Sh,Zw=q(()=>{Sh="1.26.0"}),Oi,Ue,kh=q(()=>{Zw(),Oi="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:Sh},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Oi=e}},get logLevel(){return Oi}},Object.defineProperty(Ue,"logLevel",{enumerable:!0})}),Se,Qw=q(()=>{kh(),Se=Ue}),Th,Ch,Jw=q(()=>{Th=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,l,u;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?u=[0,0,0,0]:typeof o.bias=="number"?u=[o.bias,o.bias,o.bias,o.bias]:(u=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(u[3]=o.bias[3]));let c=a*i,p=0,f=c,g=c*2,y=-1;s==="RGBA"?(p=0,f=c,g=c*2,y=c*3):s==="RGB"?(p=0,f=c,g=c*2):s==="RBG"&&(p=0,g=c,f=c*2);for(let _=0;_<a;_++)for(let T=0;T<i;T++){let v=(e.data[p++]-u[0])*l[0],x=(e.data[f++]-u[1])*l[1],C=(e.data[g++]-u[2])*l[2],k=y===-1?255:(e.data[y++]-u[3])*l[3];r.fillStyle="rgba("+v+","+x+","+C+","+k+")",r.fillRect(T,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ch=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let i,a,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],s=e.dims[3]):(i=e.dims[3],a=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,u,c;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let p=a*i;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,g=0,y=1,_=2,T=3,v=0,x=p,C=p*2,k=-1;o==="RGBA"?(v=0,x=p,C=p*2,k=p*3):o==="RGB"?(v=0,x=p,C=p*2):o==="RBG"&&(v=0,C=p,x=p*2),r=n.createImageData(i,a);for(let I=0;I<a*i;g+=f,y+=f,_+=f,T+=f,I++)r.data[g]=(e.data[v++]-c[0])*u[0],r.data[y]=(e.data[x++]-c[1])*u[1],r.data[_]=(e.data[C++]-c[2])*u[2],r.data[T]=k===-1?255:(e.data[k++]-c[3])*u[3]}else throw new Error("Can not access image data");return r}}),vr,Ih,Eh,zh,Mh,Ah,e_=q(()=>{_s(),vr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,s;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?s=[i.bias,i.bias,i.bias,i.bias]:s=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",u=n*r,c=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3),p=4,f=0,g=1,y=2,_=3,T=0,v=u,x=u*2,C=-1;o==="RGB"&&(p=3,f=0,g=1,y=2,_=-1),l==="RGBA"?C=u*3:l==="RBG"?(T=0,x=u,v=u*2):l==="BGR"&&(x=0,v=u,T=u*2);for(let k=0;k<u;k++,f+=p,y+=p,g+=p,_+=p)c[T++]=(e[f]+s[0])/a[0],c[v++]=(e[g]+s[1])/a[1],c[x++]=(e[y]+s[2])/a[2],C!==-1&&_!==-1&&(c[C++]=(e[_]+s[3])/a[3]);return l==="RGBA"?new et("float32",c,[1,4,n,r]):new et("float32",c,[1,3,n,r])},Ih=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=l();c.width=e.width,c.height=e.height;let p=u(c);if(p!=null){let f=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=f,o.width=g}else o.tensorFormat="RGBA",o.height=f,o.width=g;p.drawImage(e,0,0),s=p.getImageData(0,0,g,f).data}else throw new Error("Can not access image data")}else if(r){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=e.height,p=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=p,t!==void 0){let f=l();f.width=p,f.height=c;let g=u(f);if(g!=null)g.putImageData(e,0,0),s=g.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let p=u(c);if(p!=null){let f=e.height,g=e.width;return p.drawImage(e,0,0,g,f),s=p.getImageData(0,0,g,f).data,o.height=f,o.width=g,vr(s,o)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,p)=>{let f=l(),g=u(f);if(!e||!g)return p();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{f.width=y.width,f.height=y.height,g.drawImage(y,0,0,f.width,f.height);let _=g.getImageData(0,0,f.width,f.height);o.height=f.height,o.width=f.width,c(vr(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return vr(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Eh=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t,s=[1,r,n,4];return new et({location:"texture",type:"float32",texture:e,dims:s,download:i,dispose:a})},zh=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:i,dispose:a})},Mh=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:i,dispose:a})},Ah=(e,t,n)=>new et({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),tn,Yn,Bi,Nh,t_=q(()=>{tn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Yn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Bi=!1,Nh=()=>{if(!Bi){Bi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(tn.set("int64",BigInt64Array),Yn.set(BigInt64Array,"int64")),t&&(tn.set("uint64",BigUint64Array),Yn.set(BigUint64Array,"uint64")),r?(tn.set("float16",n),Yn.set(n,"float16")):tn.set("float16",Uint16Array)}}}),Ph,Rh,n_=q(()=>{_s(),Ph=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Rh=(e,t)=>{switch(e.location){case"cpu":return new et(e.type,e.data,t);case"cpu-pinned":return new et({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new et({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new et({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new et({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),et,_s=q(()=>{Jw(),e_(),t_(),n_(),et=class{constructor(e,t,n){Nh();let r,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=tn.get(r);if(!s)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(r=e,o=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=tn.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",s=e;else if(l==="boolean")r="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let l=Yn.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");i=o,this.cpuData=s,this.dataLocation="cpu"}let a=Ph(i);if(this.cpuData&&a!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return Ih(e,t)}static fromTexture(e,t){return Eh(e,t)}static fromGpuBuffer(e,t){return zh(e,t)}static fromMLTensor(e,t){return Mh(e,t)}static fromPinnedBuffer(e,t,n){return Ah(e,t,n)}toDataURL(e){return Th(this,e)}toImageData(e){return Ch(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Rh(this,e)}}}),ft,Oh=q(()=>{_s(),ft=et}),qr,Di,$t,gt,ln,un,Bh=q(()=>{kh(),qr=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},Di=(e,t)=>{var i;let n=((i=new Error().stack)==null?void 0:i.split(/\r\n|\r|\n/g))||[],r=!1;for(let a=0;a<n.length;a++){if(r&&!n[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${n[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),qr("CPU",s);return}n[a].includes("TRACE_FUNC")&&(r=!0)}},$t=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Di("BEGIN",e)},gt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Di("END",e)},ln=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.time(`ORT::${e}`)},un=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeEnd(`ORT::${e}`)}}),Dh,r_=q(()=>{$h(),Oh(),Bh(),Dh=class Uh{constructor(t){this.handler=t}async run(t,n,r){$t(),ln("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof ft||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof ft)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let u of n){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);i[u]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,c=Object.getOwnPropertyNames(n);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let f=n[p];(f===null||f instanceof ft)&&(u=!0,s=!1,i[p]=f)}if(u){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of this.inputNames)if(typeof t[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(s)for(let u of this.outputNames)i[u]=null;let o=await this.handler.run(t,i,a),l={};for(let u in o)if(Object.hasOwnProperty.call(o,u)){let c=o[u];c instanceof ft?l[u]=c:l[u]=new ft(c.type,c.data,c.dims)}return un("InferenceSession.run"),gt(),l}async release(){return this.handler.dispose()}static async create(t,n,r,i){$t(),ln("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,f=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(f=t.byteLength-p,typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||p+f>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,p,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await vh(s),u=await o.createInferenceSessionHandler(a,l);return un("InferenceSession.create"),gt(),new Uh(u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),xs,i_=q(()=>{r_(),xs=Dh}),a_=q(()=>{}),s_=q(()=>{}),o_=q(()=>{}),l_=q(()=>{}),u_={};In(u_,{InferenceSession:()=>xs,TRACE:()=>qr,TRACE_EVENT_BEGIN:()=>ln,TRACE_EVENT_END:()=>un,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>gt,Tensor:()=>ft,env:()=>Se,registerBackend:()=>vn});var at=q(()=>{Yw(),Qw(),i_(),Oh(),a_(),s_(),Bh(),o_(),l_()}),vs=q(()=>{}),Lh={};In(Lh,{default:()=>Fh});var Ui,Li,Fh,d_=q(()=>{var e;jg(),mn(),$s(),Ui="ort-wasm-proxy-worker",Li=((e=globalThis.self)==null?void 0:e.name)===Ui,Li&&(self.onmessage=t=>{let{type:n,in:r}=t.data;try{switch(n){case"init-wasm":Ss(r.wasm).then(()=>{Fs(r).then(()=>{postMessage({type:n})},i=>{postMessage({type:n,err:i})})},i=>{postMessage({type:n,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;Ws(a,i).then(()=>{postMessage({type:n})},s=>{postMessage({type:n,err:s})});break}case"copy-from":{let{buffer:i}=r,a=Yr(i);postMessage({type:n,out:a});break}case"create":{let{model:i,options:a}=r;qs(i,a).then(s=>{postMessage({type:n,out:s})},s=>{postMessage({type:n,err:s})});break}case"release":Vs(r),postMessage({type:n});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:o,options:l}=r;Hs(i,a,s,o,new Array(o.length).fill(null),l).then(u=>{u.some(c=>c[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:u},js([...s,...u]))},u=>{postMessage({type:n,err:u})});break}case"end-profiling":Gs(r),postMessage({type:n});break;default:}}catch(i){postMessage({type:n,err:i})}}),Fh=Li?null:t=>new Worker(t??Qe,{type:"module",name:Ui})}),Wh={};In(Wh,{default:()=>qh});async function cu(e={}){var ru,iu;var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&((ru=self.name)==null?void 0:ru.startsWith("em-pthread"));t.mountExternalData=(d,h)=>{d.startsWith("./")&&(d=d.substring(2)),(t.Xc||(t.Xc=new Map)).set(d,h)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=d=>async(...h)=>{var w;try{if(t.Yc)throw Error("Session already started");let b=t.Yc={Kd:h[0],errors:[]},S=await d(...h);if(t.Yc!==b)throw Error("Session mismatch");(w=t.dd)==null||w.flush();let z=b.errors;if(0<z.length){let N=await Promise.all(z);if(N=N.filter(B=>B),0<N.length)throw Error(N.join(`
`))}return S}finally{t.Yc=null}};t.jsepInit=(d,h)=>{if(d==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=h;let w=t.dd;t.jsepRegisterBuffer=(b,S,z,N)=>w.registerBuffer(b,S,z,N),t.jsepGetBuffer=b=>w.getBuffer(b),t.jsepCreateDownloader=(b,S,z)=>w.createDownloader(b,S,z),t.jsepOnCreateSession=b=>{w.onCreateSession(b)},t.jsepOnReleaseSession=b=>{w.onReleaseSession(b)},t.jsepOnRunStart=b=>w.onRunStart(b),t.Id=(b,S)=>{w.upload(b,S)}}else if(d==="webnn"){let w=h[0];[t.Wd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=h.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=b=>w.onRunStart(b),t.webnnOnRunEnd=w.onRunEnd.bind(w),t.webnnOnReleaseSession=b=>{w.onReleaseSession(b)},t.webnnCreateMLTensorDownloader=(b,S)=>w.createMLTensorDownloader(b,S),t.webnnRegisterMLTensor=(b,S,z,N)=>w.registerMLTensor(b,S,z,N),t.webnnCreateMLContext=b=>w.createMLContext(b),t.webnnRegisterMLConstant=(b,S,z,N,B,j)=>w.registerMLConstant(b,S,z,N,B,t.Xc,j),t.webnnRegisterGraphInput=w.registerGraphInput.bind(w),t.webnnIsGraphInput=w.isGraphInput.bind(w),t.webnnRegisterGraphOutput=w.registerGraphOutput.bind(w),t.webnnIsGraphOutput=w.isGraphOutput.bind(w),t.webnnCreateTemporaryTensor=w.createTemporaryTensor.bind(w),t.webnnIsGraphInputOutputTypeSupported=w.isGraphInputOutputTypeSupported.bind(w)}};let s=()=>{let d=h=>(...w)=>{let b=yt;return w=h(...w),yt!=b?new Promise((S,z)=>{xi={resolve:S,reject:z}}):w};(()=>{for(let h of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[h]=d(t[h])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s==null||s()};var o,l,u=(d,h)=>{throw h},c=import.meta.url,p="";if(n||r){try{p=new URL(".",c).href}catch{}r&&(l=d=>{var h=new XMLHttpRequest;return h.open("GET",d,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),o=async d=>{if(A(d))return new Promise((w,b)=>{var S=new XMLHttpRequest;S.open("GET",d,!0),S.responseType="arraybuffer",S.onload=()=>{S.status==200||S.status==0&&S.response?w(S.response):b(S.status)},S.onerror=b,S.send(null)});var h=await fetch(d,{credentials:"same-origin"});if(h.ok)return h.arrayBuffer();throw Error(h.status+" : "+h.url)}}var f,g,y,_,T,v,x=console.log.bind(console),C=console.error.bind(console),k=x,I=C,M=!1,A=d=>d.startsWith("file://");function $(){Rt.buffer!=U.buffer&&G()}if(i){let d=function(h){try{var w=h.data,b=w.Sc;if(b==="load"){let S=[];self.onmessage=z=>S.push(z),v=()=>{postMessage({Sc:"loaded"});for(let z of S)d(z);self.onmessage=d};for(let z of w.xd)t[z]&&!t[z].proxy||(t[z]=(...N)=>{postMessage({Sc:"callHandler",wd:z,args:N})},z=="print"&&(k=t[z]),z=="printErr"&&(I=t[z]));Rt=w.Od,G(),g=w.Pd,Ve(),_r()}else if(b==="run"){(function(S){var z=($(),Z)[S+52>>>2>>>0];S=($(),Z)[S+56>>>2>>>0],hl(z,z-S),pe(z)})(w.Rc),Ti(w.Rc,0,0,1,0,0),fo(),yi(w.Rc),O||(ol(),O=!0);try{U0(w.Md,w.bd)}catch(S){if(S!="unwind")throw S}}else w.target!=="setimmediate"&&(b==="checkMailbox"?O&&hr():b&&(I(`worker: received unknown command ${b}`),I(w)))}catch(S){throw ll(),S}};var O=!1;self.onunhandledrejection=h=>{throw h.reason||h},self.onmessage=d}var U,H,F,K,P,Z,Q,te,ie,W,re,L=!1;function G(){var d=Rt.buffer;t.HEAP8=U=new Int8Array(d),F=new Int16Array(d),t.HEAPU8=H=new Uint8Array(d),K=new Uint16Array(d),t.HEAP32=P=new Int32Array(d),t.HEAPU32=Z=new Uint32Array(d),Q=new Float32Array(d),te=new Float64Array(d),ie=new BigInt64Array(d),W=new BigUint64Array(d)}function X(){L=!0,i?v():Tt.sb()}function V(d){throw I(d="Aborted("+d+")"),M=!0,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),T==null||T(d),d}function _e(){return{a:{ma:ly,gb:oy,g:L0,J:F0,f:W0,o:q0,h:V0,ha:H0,b:G0,T:j0,Ha:_o,n:K0,$:So,Xa:ko,Da:To,Fa:Co,Ya:Io,Va:Eo,Oa:zo,Ua:Mo,ka:Ao,Ea:No,Ba:Po,Wa:Ro,Ca:Oo,bb:X0,ea:Y0,wa:Z0,ua:J0,da:tb,O:nb,H:rb,va:ib,_:cb,xa:pb,Ra:hb,za:mb,Ia:gb,sa:bb,fa:yb,Qa:yi,_a:wb,R:$b,r:Ib,c:gi,hb:Eb,y:zb,M:Mb,D:Ab,l:Nb,s:Vo,ib:Pb,I:Rb,S:Ob,j:Bb,u:Db,q:Ub,k:Lb,La:Fb,Ma:Wb,Na:qb,Ja:Ko,Ka:Xo,ta:Yo,db:Hb,ab:jb,v:Kb,aa:Xb,ga:Yb,$a:Gb,W:Zb,Za:Qb,Aa:Jb,F:Vb,U:ey,la:yr,ya:ny,fb:ty,eb:ry,Sa:el,Ta:tl,Ga:Nn,V:nl,ja:rl,Pa:il,ia:al,kb:Vy,na:Uy,lb:qy,oa:Dy,G:Ey,d:py,t:dy,w:uy,A:vy,mb:Ry,K:Ty,x:my,pa:Oy,Y:Ly,ba:Py,nb:Ny,ob:Ay,P:$y,qa:My,pb:zy,N:Cy,Z:By,e:cy,B:fy,m:hy,jb:Hy,p:by,z:yy,C:gy,E:wy,L:Sy,qb:Iy,Q:Fy,ca:ky,X:Wy,rb:xy,ra:_y,i:ay,a:Rt,cb:Ze}}}async function Ve(){function d(b,S){var z=Tt=b.exports;b={};for(let[N,B]of Object.entries(z))typeof B=="function"?(z=_b(B),b[N]=z):b[N]=B;return Tt=b,Tt=(function(){var N=Tt,B=Y=>de=>Y(de)>>>0,j=Y=>()=>Y()>>>0;return(N=Object.assign({},N)).tb=B(N.tb),N.Xb=j(N.Xb),N.Zb=B(N.Zb),N.lc=B(N.lc),N.mc=j(N.mc),N.qc=B(N.qc),N})(),po.push(Tt._b),sl=(b=Tt).tb,ol=b.ub,t._OrtInit=b.vb,t._OrtGetLastError=b.wb,t._OrtCreateSessionOptions=b.xb,t._OrtAppendExecutionProvider=b.yb,t._OrtAddFreeDimensionOverride=b.zb,t._OrtAddSessionConfigEntry=b.Ab,t._OrtReleaseSessionOptions=b.Bb,t._OrtCreateSession=b.Cb,t._OrtReleaseSession=b.Db,t._OrtGetInputOutputCount=b.Eb,t._OrtGetInputOutputMetadata=b.Fb,t._OrtFree=b.Gb,t._OrtCreateTensor=b.Hb,t._OrtGetTensorData=b.Ib,t._OrtReleaseTensor=b.Jb,t._OrtCreateRunOptions=b.Kb,t._OrtAddRunConfigEntry=b.Lb,t._OrtReleaseRunOptions=b.Mb,t._OrtCreateBinding=b.Nb,t._OrtBindInput=b.Ob,t._OrtBindOutput=b.Pb,t._OrtClearBoundOutputs=b.Qb,t._OrtReleaseBinding=b.Rb,t._OrtRunWithBinding=b.Sb,t._OrtRun=b.Tb,t._OrtEndProfiling=b.Ub,t._JsepOutput=b.Vb,t._JsepGetNodeName=b.Wb,wr=b.Xb,wt=t._free=b.Yb,On=t._malloc=b.Zb,Ti=b.ac,ll=b.bc,ul=b.cc,dl=b.dc,Ci=b.ec,cl=b.fc,pl=b.gc,ge=b.hc,Bn=b.ic,hl=b.jc,pe=b.kc,Ii=b.lc,me=b.mc,fl=b.nc,Ei=b.oc,ml=b.pc,gl=b.qc,bl=b.rc,zi=b.sc,yl=b.tc,wl=b.uc,_l=b.vc,xl=b.wc,vl=b.xc,$l=b.yc,Sl=b.zc,kl=b.Ac,Tl=b.Bc,Cl=b.Cc,Il=b.Dc,El=b.Ec,zl=b.Fc,Ml=b.Gc,Al=b.Hc,Nl=b.Ic,Pl=b.Jc,Rl=b.Kc,Ol=b.Lc,Bl=b.Mc,Dl=b.Nc,Ul=b.Pc,Ll=b.Qc,Fl=b.$c,Wl=b.ad,ql=b.fd,Vl=b.jd,Hl=b.kd,Gl=b.ld,jl=b.md,Kl=b.nd,Xl=b.od,Yl=b.pd,Zl=b.qd,Ql=b.vd,Jl=b.Sd,eu=b.Td,tu=b.Ud,nu=b.Vd,g=S,Tt}var h,w=_e();return t.instantiateWasm?new Promise(b=>{t.instantiateWasm(w,(S,z)=>{b(d(S,z))})}):i?d(new WebAssembly.Instance(g,_e()),g):(re??(re=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href),h=await(async function(b){var S=re;if(!f&&!A(S))try{var z=fetch(S,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(z,b)}catch(N){I(`wasm streaming compile failed: ${N}`),I("falling back to ArrayBuffer instantiation")}return(async function(N,B){try{var j=await(async function(Y){if(!f)try{var de=await o(Y);return new Uint8Array(de)}catch{}if(Y==re&&f)Y=new Uint8Array(f);else{if(!l)throw"both async and sync fetching of the wasm failed";Y=l(Y)}return Y})(N);return await WebAssembly.instantiate(j,B)}catch(Y){I(`failed to asynchronously prepare wasm: ${Y}`),V(Y)}})(S,b)})(w),d(h.instance,h.module))}class Ee{constructor(h){Pe(this,"name","ExitStatus");this.message=`Program terminated with exit(${h})`,this.status=h}}var Be=d=>{d.terminate(),d.onmessage=()=>{}},je=[],Ye=0,Ke=null,Nt=d=>{Pt.length==0&&(go(),mo(Pt[0]));var h=Pt.pop();if(!h)return 6;Pn.push(h),jt[d.Rc]=h,h.Rc=d.Rc;var w={Sc:"run",Md:d.Ld,bd:d.bd,Rc:d.Rc};return h.postMessage(w,d.rd),0},Ce=0,se=(d,h,...w)=>{var b,S=16*w.length,z=me(),N=Ii(S),B=N>>>3;for(b of w)typeof b=="bigint"?(($(),ie)[B++>>>0]=1n,($(),ie)[B++>>>0]=b):(($(),ie)[B++>>>0]=0n,($(),te)[B++>>>0]=b);return d=ul(d,0,S,N,h),pe(z),d};function Ze(d){if(i)return se(0,1,d);if(y=d,!(0<Ce)){for(var h of Pn)Be(h);for(h of Pt)Be(h);Pt=[],Pn=[],jt={},M=!0}u(0,new Ee(d))}function lr(d){if(i)return se(1,0,d);Nn(d)}var Nn=d=>{if(y=d,i)throw lr(d),"unwind";Ze(d)},Pt=[],Pn=[],po=[],jt={},ho=d=>{var h=d.Rc;delete jt[h],Pt.push(d),Pn.splice(Pn.indexOf(d),1),d.Rc=0,dl(h)};function fo(){po.forEach(d=>d())}var mo=d=>new Promise(h=>{d.onmessage=S=>{var z=S.data;if(S=z.Sc,z.Zc&&z.Zc!=wr()){var N=jt[z.Zc];N?N.postMessage(z,z.rd):I(`Internal error! Worker sent a message "${S}" to target pthread ${z.Zc}, but that thread no longer exists!`)}else S==="checkMailbox"?hr():S==="spawnThread"?Nt(z):S==="cleanupThread"?pr(()=>{ho(jt[z.Nd])}):S==="loaded"?(d.loaded=!0,h(d)):z.target==="setimmediate"?d.postMessage(z):S==="uncaughtException"?d.onerror(z.error):S==="callHandler"?t[z.wd](...z.args):S&&I(`worker sent an unknown command ${S}`)},d.onerror=S=>{throw I(`worker sent an error! ${S.filename}:${S.lineno}: ${S.message}`),S};var w,b=[];for(w of[])t.propertyIsEnumerable(w)&&b.push(w);d.postMessage({Sc:"load",xd:b,Od:Rt,Pd:g})});function go(){var d=new Worker((()=>{let h=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new h("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Pt.push(d)}var Rt,U0=(d,h)=>{Ce=0,d=zi(d,h),0<Ce?y=d:Ci(d)},ur=[],dr=0;function L0(d){var h=new pi(d>>>=0);return($(),U)[h.Tc+12>>>0]==0&&(bo(h,!0),dr--),yo(h,!1),ur.push(h),gl(d)}var yn=0,F0=()=>{ge(0,0);var d=ur.pop();fl(d.cd),yn=0};function bo(d,h){h=h?1:0,($(),U)[d.Tc+12>>>0]=h}function yo(d,h){h=h?1:0,($(),U)[d.Tc+13>>>0]=h}class pi{constructor(h){this.cd=h,this.Tc=h-24}}var hi=d=>{var h=yn;if(!h)return Bn(0),0;var w=new pi(h);($(),Z)[w.Tc+16>>>2>>>0]=h;var b=($(),Z)[w.Tc+4>>>2>>>0];if(!b)return Bn(0),h;for(var S of d){if(S===0||S===b)break;if(ml(S,b,w.Tc+16))return Bn(S),h}return Bn(b),h};function W0(){return hi([])}function q0(d){return hi([d>>>0])}function V0(d,h,w,b){return hi([d>>>0,h>>>0,w>>>0,b>>>0])}var H0=()=>{var d=ur.pop();d||V("no exception to throw");var h=d.cd;throw($(),U)[d.Tc+13>>>0]==0&&(ur.push(d),yo(d,!0),bo(d,!1),dr++),Ei(h),yn=h};function G0(d,h,w){var b=new pi(d>>>=0);throw h>>>=0,w>>>=0,($(),Z)[b.Tc+16>>>2>>>0]=0,($(),Z)[b.Tc+4>>>2>>>0]=h,($(),Z)[b.Tc+8>>>2>>>0]=w,Ei(d),dr++,yn=d}var j0=()=>dr;function wo(d,h,w,b){return i?se(2,1,d,h,w,b):_o(d,h,w,b)}function _o(d,h,w,b){if(d>>>=0,h>>>=0,w>>>=0,b>>>=0,!globalThis.SharedArrayBuffer)return 6;var S=[];return i&&S.length===0?wo(d,h,w,b):(d={Ld:w,Rc:d,bd:b,rd:S},i?(d.Sc="spawnThread",postMessage(d,S),0):Nt(d))}function K0(d){throw yn||(yn=d>>>0),yn}var xo=globalThis.TextDecoder&&new TextDecoder,vo=(d,h,w,b)=>{if(w=h+w,b)return w;for(;d[h]&&!(h>=w);)++h;return h},$o=(d,h=0,w,b)=>{if(16<(w=vo(d,h>>>=0,w,b))-h&&d.buffer&&xo)return xo.decode(d.buffer instanceof ArrayBuffer?d.subarray(h,w):d.slice(h,w));for(b="";h<w;){var S=d[h++];if(128&S){var z=63&d[h++];if((224&S)==192)b+=String.fromCharCode((31&S)<<6|z);else{var N=63&d[h++];65536>(S=(240&S)==224?(15&S)<<12|z<<6|N:(7&S)<<18|z<<12|N<<6|63&d[h++])?b+=String.fromCharCode(S):(S-=65536,b+=String.fromCharCode(55296|S>>10,56320|1023&S))}}else b+=String.fromCharCode(S)}return b},Ne=(d,h,w)=>(d>>>=0)?$o(($(),H),d,h,w):"";function So(d,h,w){return i?se(3,1,d,h,w):0}function ko(d,h){if(i)return se(4,1,d,h)}function To(d,h){if(i)return se(5,1,d,h)}function Co(d,h,w){if(i)return se(6,1,d,h,w)}function Io(d,h,w){return i?se(7,1,d,h,w):0}function Eo(d,h){if(i)return se(8,1,d,h)}function zo(d,h,w){if(i)return se(9,1,d,h,w)}function Mo(d,h,w,b){if(i)return se(10,1,d,h,w,b)}function Ao(d,h,w,b){if(i)return se(11,1,d,h,w,b)}function No(d,h,w,b){if(i)return se(12,1,d,h,w,b)}function Po(d){if(i)return se(13,1,d)}function Ro(d,h){if(i)return se(14,1,d,h)}function Oo(d,h,w){if(i)return se(15,1,d,h,w)}var X0=()=>V(""),bt=d=>{d>>>=0;for(var h="";;){var w=($(),H)[d++>>>0];if(!w)return h;h+=String.fromCharCode(w)}},fi={},mi={},wn=class extends Error{constructor(d){super(d),this.name="BindingError"}};function kt(d,h,w={}){return(function(b,S,z={}){var N=S.name;if(!b)throw new wn(`type "${N}" must have a positive integer typeid pointer`);if(mi.hasOwnProperty(b)){if(z.yd)return;throw new wn(`Cannot register type '${N}' twice`)}mi[b]=S,fi.hasOwnProperty(b)&&(S=fi[b],delete fi[b],S.forEach(B=>B()))})(d,h,w)}var Bo=(d,h,w)=>{switch(h){case 1:return w?b=>($(),U)[b>>>0]:b=>($(),H)[b>>>0];case 2:return w?b=>($(),F)[b>>>1>>>0]:b=>($(),K)[b>>>1>>>0];case 4:return w?b=>($(),P)[b>>>2>>>0]:b=>($(),Z)[b>>>2>>>0];case 8:return w?b=>($(),ie)[b>>>3>>>0]:b=>($(),W)[b>>>3>>>0];default:throw new TypeError(`invalid integer width (${h}): ${d}`)}};function Y0(d,h,w,b,S){d>>>=0,w>>>=0,h=bt(h>>>0);let z=N=>N;if(b=b===0n){let N=8*w;z=B=>BigInt.asUintN(N,B),S=z(S)}kt(d,{name:h,Oc:z,Vc:(N,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Uc:Bo(h,w,!b),Wc:null})}function Z0(d,h,w,b){kt(d>>>=0,{name:h=bt(h>>>0),Oc:function(S){return!!S},Vc:function(S,z){return z?w:b},Uc:function(S){return this.Oc(($(),H)[S>>>0])},Wc:null})}var Do=[],Kt=[0,1,,1,null,1,!0,1,!1,1];function gi(d){9<(d>>>=0)&&--Kt[d+1]==0&&(Kt[d]=void 0,Do.push(d))}var rt=d=>{if(!d)throw new wn(`Cannot use deleted val. handle = ${d}`);return Kt[d]},ot=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let h=Do.pop()||Kt.length;return Kt[h]=d,Kt[h+1]=1,h}};function bi(d){return this.Oc(($(),Z)[d>>>2>>>0])}var Q0={name:"emscripten::val",Oc:d=>{var h=rt(d);return gi(d),h},Vc:(d,h)=>ot(h),Uc:bi,Wc:null};function J0(d){return kt(d>>>0,Q0)}var eb=(d,h)=>{switch(h){case 4:return function(w){return this.Oc(($(),Q)[w>>>2>>>0])};case 8:return function(w){return this.Oc(($(),te)[w>>>3>>>0])};default:throw new TypeError(`invalid float width (${h}): ${d}`)}};function tb(d,h,w){w>>>=0,kt(d>>>=0,{name:h=bt(h>>>0),Oc:b=>b,Vc:(b,S)=>S,Uc:eb(h,w),Wc:null})}function nb(d,h,w,b,S){d>>>=0,w>>>=0,h=bt(h>>>0);let z=B=>B;if(b===0){var N=32-8*w;z=B=>B<<N>>>N,S=z(S)}kt(d,{name:h,Oc:z,Vc:(B,j)=>j,Uc:Bo(h,w,b!==0),Wc:null})}function rb(d,h,w){function b(z){var N=($(),Z)[z>>>2>>>0];return z=($(),Z)[z+4>>>2>>>0],new S(($(),U).buffer,z,N)}var S=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][h];kt(d>>>=0,{name:w=bt(w>>>0),Oc:b,Uc:b},{yd:!0})}var Ot=(d,h,w)=>{var b=($(),H);if(h>>>=0,0<w){var S=h;w=h+w-1;for(var z=0;z<d.length;++z){var N=d.codePointAt(z);if(127>=N){if(h>=w)break;b[h++>>>0]=N}else if(2047>=N){if(h+1>=w)break;b[h++>>>0]=192|N>>6,b[h++>>>0]=128|63&N}else if(65535>=N){if(h+2>=w)break;b[h++>>>0]=224|N>>12,b[h++>>>0]=128|N>>6&63,b[h++>>>0]=128|63&N}else{if(h+3>=w)break;b[h++>>>0]=240|N>>18,b[h++>>>0]=128|N>>12&63,b[h++>>>0]=128|N>>6&63,b[h++>>>0]=128|63&N,z++}}b[h>>>0]=0,d=h-S}else d=0;return d},cr=d=>{for(var h=0,w=0;w<d.length;++w){var b=d.charCodeAt(w);127>=b?h++:2047>=b?h+=2:55296<=b&&57343>=b?(h+=4,++w):h+=3}return h};function ib(d,h){kt(d>>>=0,{name:h=bt(h>>>0),Oc(w){var b=($(),Z)[w>>>2>>>0];return b=Ne(w+4,b,!0),wt(w),b},Vc(w,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var S=typeof b=="string";if(!(S||ArrayBuffer.isView(b)&&b.BYTES_PER_ELEMENT==1))throw new wn("Cannot pass non-string to std::string");var z=S?cr(b):b.length,N=On(4+z+1),B=N+4;return($(),Z)[N>>>2>>>0]=z,S?Ot(b,B,z+1):($(),H).set(b,B>>>0),w!==null&&w.push(wt,N),N},Uc:bi,Wc(w){wt(w)}})}var Uo=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,ab=(d,h,w)=>{if(d>>>=1,16<(h=vo(($(),K),d,h/2,w))-d&&Uo)return Uo.decode(($(),K).slice(d,h));for(w="";d<h;++d){var b=($(),K)[d>>>0];w+=String.fromCharCode(b)}return w},sb=(d,h,w)=>{if(w??(w=2147483647),2>w)return 0;var b=h;w=(w-=2)<2*d.length?w/2:d.length;for(var S=0;S<w;++S){var z=d.charCodeAt(S);($(),F)[h>>>1>>>0]=z,h+=2}return($(),F)[h>>>1>>>0]=0,h-b},ob=d=>2*d.length,lb=(d,h,w)=>{var b="";d>>>=2;for(var S=0;!(S>=h/4);S++){var z=($(),Z)[d+S>>>0];if(!z&&!w)break;b+=String.fromCodePoint(z)}return b},ub=(d,h,w)=>{if(h>>>=0,w??(w=2147483647),4>w)return 0;var b=h;w=b+w-4;for(var S=0;S<d.length;++S){var z=d.codePointAt(S);if(65535<z&&S++,($(),P)[h>>>2>>>0]=z,(h+=4)+4>w)break}return($(),P)[h>>>2>>>0]=0,h-b},db=d=>{for(var h=0,w=0;w<d.length;++w)65535<d.codePointAt(w)&&w++,h+=4;return h};function cb(d,h,w){if(d>>>=0,h>>>=0,w=bt(w>>>=0),h===2)var b=ab,S=sb,z=ob;else b=lb,S=ub,z=db;kt(d,{name:w,Oc:N=>{var B=($(),Z)[N>>>2>>>0];return B=b(N+4,B*h,!0),wt(N),B},Vc:(N,B)=>{if(typeof B!="string")throw new wn(`Cannot pass non-string to C++ string type ${w}`);var j=z(B),Y=On(4+j+h);return($(),Z)[Y>>>2>>>0]=j/h,S(B,Y+4,j+h),N!==null&&N.push(wt,Y),Y},Uc:bi,Wc(N){wt(N)}})}function pb(d,h){kt(d>>>=0,{zd:!0,name:h=bt(h>>>0),Oc:()=>{},Vc:()=>{}})}function hb(d){Ti(d>>>0,!r,1,!n,131072,!1),fo()}var pr=d=>{if(!M)try{if(d(),!(0<Ce))try{i?wr()&&Ci(y):Nn(y)}catch(h){h instanceof Ee||h=="unwind"||u(0,h)}}catch(h){h instanceof Ee||h=="unwind"||u(0,h)}},fb=!Atomics.waitAsync||((iu=globalThis.navigator)==null?void 0:iu.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function yi(d){d>>>=0,fb||(Atomics.waitAsync(($(),P),d>>>2,d).value.then(hr),d+=128,Atomics.store(($(),P),d>>>2,1))}var hr=()=>pr(()=>{var d=wr();d&&(yi(d),pl())});function mb(d,h){(d>>>=0)==h>>>0?setTimeout(hr):i?postMessage({Zc:d,Sc:"checkMailbox"}):(d=jt[d])&&d.postMessage({Sc:"checkMailbox"})}var wi=[];function gb(d,h,w,b,S){for(h>>>=0,S>>>=0,wi.length=0,w=S>>>3,b=S+b>>>3;w<b;){var z;z=($(),ie)[w++>>>0]?($(),ie)[w++>>>0]:($(),te)[w++>>>0],wi.push(z)}return(h?Mi[h]:sy[d])(...wi)}var bb=()=>{Ce=0};function yb(d){d>>>=0,i?postMessage({Sc:"cleanupThread",Nd:d}):ho(jt[d])}function wb(d){}var fr=d=>{try{d()}catch(h){V(h)}};function _b(d){var h=(...w)=>{mr.push(d);try{return d(...w)}finally{M||(mr.pop(),yt&&Bt===1&&mr.length===0&&(Bt=0,Ce+=1,fr(eu),typeof Fibers<"u"&&Fibers.Zd()))}};return Wo.set(d,h),h}var Bt=0,yt=null,Lo=0,mr=[],_i=new Map,Fo=new Map,Wo=new Map,xb=0,xi=null,vb=[],qo=d=>(function(h){if(!M){if(Bt===0){var w=!1,b=!1;h((S=0)=>{if(!M&&(Lo=S,w=!0,b)){Bt=2,fr(()=>tu(yt)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),S=!1;try{var z=(function(){var j=($(),P)[yt+8>>>2>>>0];return j=Fo.get(j),j=Wo.get(j),--Ce,j()})()}catch(j){z=j,S=!0}var N=!1;if(!yt){var B=xi;B&&(xi=null,(S?B.reject:B.resolve)(z),N=!0)}if(S&&!N)throw z}}),b=!0,w||(Bt=1,yt=(function(){var S=On(65548),z=S+12;if(($(),Z)[S>>>2>>>0]=z,($(),Z)[S+4>>>2>>>0]=z+65536,z=mr[0],!_i.has(z)){var N=xb++;_i.set(z,N),Fo.set(N,z)}return z=_i.get(z),($(),P)[S+8>>>2>>>0]=z,S})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),fr(()=>Jl(yt)))}else Bt===2?(Bt=0,fr(nu),wt(yt),yt=null,vb.forEach(pr)):V(`invalid state: ${Bt}`);return Lo}})(h=>{d().then(h)});function $b(d){return d>>>=0,qo(async()=>{var h=await rt(d);return ot(h)})}var vi=[],Sb=d=>{var h=vi.length;return vi.push(d),h},kb=(d,h)=>{for(var w=Array(d),b=0;b<d;++b){var S=b,z=($(),Z)[h+4*b>>>2>>>0],N=mi[z];if(N===void 0)throw d=`parameter ${b}`,z=sl(z),h=bt(z),wt(z),new wn(`${d} has unknown type ${h}`);w[S]=N}return w},Tb=(d,h,w)=>{var b=[];return d=d(b,w),b.length&&(($(),Z)[h>>>2>>>0]=ot(b)),d},Cb={},gr=d=>{var h=Cb[d];return h===void 0?bt(d):h};function Ib(d,h,w){var[b,...S]=kb(d,h>>>0);h=b.Vc.bind(b);var z=S.map(j=>j.Uc.bind(j));d--;var N={toValue:rt};switch(d=z.map((j,Y)=>{var de=`argFromPtr${Y}`;return N[de]=j,`${de}(args${Y?"+"+8*Y:""})`}),w){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:N.getStringOrSymbol=gr,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${d})`,b.zd||(N.toReturnWire=h,N.emval_returnValue=Tb,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,w=new Function(Object.keys(N),B)(...Object.values(N)),B=`methodCaller<(${S.map(j=>j.name)}) => ${b.name}>`,Sb(Object.defineProperty(w,"name",{value:B}))}function Eb(d,h){return h>>>=0,(d=rt(d>>>0))==rt(h)}function zb(d){return(d>>>=0)?(d=gr(d),ot(globalThis[d])):ot(globalThis)}function Mb(d){return d=gr(d>>>0),ot(t[d])}function Ab(d,h){return h>>>=0,d=rt(d>>>0),h=rt(h),ot(d[h])}function Nb(d){9<(d>>>=0)&&(Kt[d+1]+=1)}function Vo(d,h,w,b,S){return vi[d>>>0](h>>>0,w>>>0,b>>>0,S>>>0)}function Pb(d,h,w,b,S){return Vo(d>>>0,h>>>0,w>>>0,b>>>0,S>>>0)}function Rb(){return ot([])}function Ob(d){d=rt(d>>>0);for(var h=Array(d.length),w=0;w<d.length;w++)h[w]=d[w];return ot(h)}function Bb(d){return ot(gr(d>>>0))}function Db(){return ot({})}function Ub(d){for(var h=rt(d>>>=0);h.length;){var w=h.pop();h.pop()(w)}gi(d)}function Lb(d,h,w){h>>>=0,w>>>=0,d=rt(d>>>0),h=rt(h),w=rt(w),d[h]=w}function Fb(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),($(),P)[h>>>2>>>0]=d.getUTCSeconds(),($(),P)[h+4>>>2>>>0]=d.getUTCMinutes(),($(),P)[h+8>>>2>>>0]=d.getUTCHours(),($(),P)[h+12>>>2>>>0]=d.getUTCDate(),($(),P)[h+16>>>2>>>0]=d.getUTCMonth(),($(),P)[h+20>>>2>>>0]=d.getUTCFullYear()-1900,($(),P)[h+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),P)[h+28>>>2>>>0]=d}var Ho=d=>d%4==0&&(d%100!=0||d%400==0),Go=[0,31,60,91,121,152,182,213,244,274,305,335],jo=[0,31,59,90,120,151,181,212,243,273,304,334];function Wb(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),($(),P)[h>>>2>>>0]=d.getSeconds(),($(),P)[h+4>>>2>>>0]=d.getMinutes(),($(),P)[h+8>>>2>>>0]=d.getHours(),($(),P)[h+12>>>2>>>0]=d.getDate(),($(),P)[h+16>>>2>>>0]=d.getMonth(),($(),P)[h+20>>>2>>>0]=d.getFullYear()-1900,($(),P)[h+24>>>2>>>0]=d.getDay();var w=(Ho(d.getFullYear())?Go:jo)[d.getMonth()]+d.getDate()-1|0;($(),P)[h+28>>>2>>>0]=w,($(),P)[h+36>>>2>>>0]=-60*d.getTimezoneOffset(),w=new Date(d.getFullYear(),6,1).getTimezoneOffset();var b=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(w!=b&&d.getTimezoneOffset()==Math.min(b,w)),($(),P)[h+32>>>2>>>0]=d}function qb(d){d>>>=0;var h=new Date(($(),P)[d+20>>>2>>>0]+1900,($(),P)[d+16>>>2>>>0],($(),P)[d+12>>>2>>>0],($(),P)[d+8>>>2>>>0],($(),P)[d+4>>>2>>>0],($(),P)[d>>>2>>>0],0),w=($(),P)[d+32>>>2>>>0],b=h.getTimezoneOffset(),S=new Date(h.getFullYear(),6,1).getTimezoneOffset(),z=new Date(h.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(z,S);return 0>w?($(),P)[d+32>>>2>>>0]=+(S!=z&&N==b):0<w!=(N==b)&&(S=Math.max(z,S),h.setTime(h.getTime()+6e4*((0<w?N:S)-b))),($(),P)[d+24>>>2>>>0]=h.getDay(),w=(Ho(h.getFullYear())?Go:jo)[h.getMonth()]+h.getDate()-1|0,($(),P)[d+28>>>2>>>0]=w,($(),P)[d>>>2>>>0]=h.getSeconds(),($(),P)[d+4>>>2>>>0]=h.getMinutes(),($(),P)[d+8>>>2>>>0]=h.getHours(),($(),P)[d+12>>>2>>>0]=h.getDate(),($(),P)[d+16>>>2>>>0]=h.getMonth(),($(),P)[d+20>>>2>>>0]=h.getYear(),d=h.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function Ko(d,h,w,b,S,z,N){return i?se(16,1,d,h,w,b,S,z,N):-52}function Xo(d,h,w,b,S,z){if(i)return se(17,1,d,h,w,b,S,z)}var Rn={},Vb=()=>performance.timeOrigin+performance.now();function Yo(d,h){if(i)return se(18,1,d,h);if(Rn[d]&&(clearTimeout(Rn[d].id),delete Rn[d]),!h)return 0;var w=setTimeout(()=>{delete Rn[d],pr(()=>cl(d,performance.timeOrigin+performance.now()))},h);return Rn[d]={id:w,Yd:h},0}function Hb(d,h,w,b){d>>>=0,h>>>=0,w>>>=0,b>>>=0;var S=new Date().getFullYear(),z=new Date(S,0,1).getTimezoneOffset();S=new Date(S,6,1).getTimezoneOffset();var N=Math.max(z,S);($(),Z)[d>>>2>>>0]=60*N,($(),P)[h>>>2>>>0]=+(z!=S),d=(h=B=>{var j=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(j/60)).padStart(2,"0")}${String(j%60).padStart(2,"0")}`})(z),h=h(S),S<z?(Ot(d,w,17),Ot(h,b,17)):(Ot(d,b,17),Ot(h,w,17))}var Gb=()=>Date.now();function jb(d,h,w){return w>>>=0,0<=d&&3>=d?(d===0?d=Date.now():d=performance.timeOrigin+performance.now(),d=Math.round(1e6*d),($(),ie)[w>>>3>>>0]=BigInt(d),0):28}var $i=[],Zo=(d,h)=>{$i.length=0;for(var w;w=($(),H)[d++>>>0];){var b=w!=105;h+=(b&=w!=112)&&h%8?4:0,$i.push(w==112?($(),Z)[h>>>2>>>0]:w==106?($(),ie)[h>>>3>>>0]:w==105?($(),P)[h>>>2>>>0]:($(),te)[h>>>3>>>0]),h+=b?8:4}return $i};function Kb(d,h,w){return d>>>=0,h=Zo(h>>>0,w>>>0),Mi[d](...h)}function Xb(d,h,w){return d>>>=0,h=Zo(h>>>0,w>>>0),Mi[d](...h)}var Yb=()=>{};function Zb(d,h){return I(Ne(d>>>0,h>>>0))}var Qb=()=>{throw Ce+=1,"unwind"};function Jb(){return 4294901760}var ey=()=>navigator.hardwareConcurrency,Xt={},br=d=>{var h;return(h=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(d))?+h[1]:(h=/:(\d+):\d+(?:\)|$)/.exec(d))?2147483648|+h[1]:0},Qo=d=>{for(var h of d)(d=br(h))&&(Xt[d]=h)};function ty(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Qo(d),Xt.gd=br(d[3]),Xt.Jd=d,Xt.gd}function yr(d){if(!(d=Xt[d>>>0]))return 0;var h;if(h=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(d))d=h[1];else if(h=/^\s+at (.*) \(.*\)$/.exec(d))d=h[1];else{if(!(h=/^(.+?)@/.exec(d)))return 0;d=h[1]}wt(yr.hd??0),h=cr(d)+1;var w=On(h);return w&&Ot(d,w,h),yr.hd=w,yr.hd}function ny(d){d>>>=0;var h=($(),H).length;if(d<=h||4294901760<d)return!1;for(var w=1;4>=w;w*=2){var b=h*(1+.2/w);b=Math.min(b,d+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(d,b)/65536))-Rt.buffer.byteLength+65535)/65536|0;try{Rt.grow(b),G();var S=1;break e}catch{}S=void 0}if(S)return!0}return!1}function ry(d,h,w){if(d>>>=0,h>>>=0,Xt.gd==d)var b=Xt.Jd;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Qo(b);for(var S=3;b[S]&&br(b[S])!=d;)++S;for(d=0;d<w&&b[d+S];++d)($(),P)[h+4*d>>>2>>>0]=br(b[d+S]);return d}var Si,ki={},Jo=()=>{var b;if(!Si){var d,h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((b=globalThis.navigator)==null?void 0:b.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in ki)ki[d]===void 0?delete h[d]:h[d]=ki[d];var w=[];for(d in h)w.push(`${d}=${h[d]}`);Si=w}return Si};function el(d,h){if(i)return se(19,1,d,h);d>>>=0,h>>>=0;var w,b=0,S=0;for(w of Jo()){var z=h+b;($(),Z)[d+S>>>2>>>0]=z,b+=Ot(w,z,1/0)+1,S+=4}return 0}function tl(d,h){if(i)return se(20,1,d,h);d>>>=0,h>>>=0;var w=Jo();for(var b of(($(),Z)[d>>>2>>>0]=w.length,d=0,w))d+=cr(b)+1;return($(),Z)[h>>>2>>>0]=d,0}function nl(d){return i?se(21,1,d):52}function rl(d,h,w,b){return i?se(22,1,d,h,w,b):52}function il(d,h,w,b){return i?se(23,1,d,h,w,b):70}var iy=[null,[],[]];function al(d,h,w,b){if(i)return se(24,1,d,h,w,b);h>>>=0,w>>>=0,b>>>=0;for(var S=0,z=0;z<w;z++){var N=($(),Z)[h>>>2>>>0],B=($(),Z)[h+4>>>2>>>0];h+=8;for(var j=0;j<B;j++){var Y=d,de=($(),H)[N+j>>>0],we=iy[Y];de===0||de===10?((Y===1?k:I)($o(we)),we.length=0):we.push(de)}S+=B}return($(),Z)[b>>>2>>>0]=S,0}function ay(d){return d>>>0}i||(function(){for(var d=t.numThreads-1;d--;)go();je.push(async()=>{var h=(async function(){if(!i)return Promise.all(Pt.map(mo))})();Ye++,await h,--Ye==0&&Ke&&(h=Ke,Ke=null,h())})})(),i||(Rt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),G()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>me(),t.stackRestore=d=>pe(d),t.stackAlloc=d=>Ii(d),t.setValue=function(d,h,w="i8"){switch(w.endsWith("*")&&(w="*"),w){case"i1":case"i8":($(),U)[d>>>0]=h;break;case"i16":($(),F)[d>>>1>>>0]=h;break;case"i32":($(),P)[d>>>2>>>0]=h;break;case"i64":($(),ie)[d>>>3>>>0]=BigInt(h);break;case"float":($(),Q)[d>>>2>>>0]=h;break;case"double":($(),te)[d>>>3>>>0]=h;break;case"*":($(),Z)[d>>>2>>>0]=h;break;default:V(`invalid type for setValue: ${w}`)}},t.getValue=function(d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":return($(),U)[d>>>0];case"i16":return($(),F)[d>>>1>>>0];case"i32":return($(),P)[d>>>2>>>0];case"i64":return($(),ie)[d>>>3>>>0];case"float":return($(),Q)[d>>>2>>>0];case"double":return($(),te)[d>>>3>>>0];case"*":return($(),Z)[d>>>2>>>0];default:V(`invalid type for getValue: ${h}`)}},t.UTF8ToString=Ne,t.stringToUTF8=Ot,t.lengthBytesUTF8=cr;var sl,ol,wr,wt,On,Ti,ll,ul,dl,Ci,cl,pl,ge,Bn,hl,pe,Ii,me,fl,Ei,ml,gl,bl,zi,yl,wl,_l,xl,vl,$l,Sl,kl,Tl,Cl,Il,El,zl,Ml,Al,Nl,Pl,Rl,Ol,Bl,Dl,Ul,Ll,Fl,Wl,ql,Vl,Hl,Gl,jl,Kl,Xl,Yl,Zl,Ql,Jl,eu,tu,nu,Tt,sy=[Ze,lr,wo,So,ko,To,Co,Io,Eo,zo,Mo,Ao,No,Po,Ro,Oo,Ko,Xo,Yo,el,tl,nl,rl,il,al],Mi={973212:(d,h,w,b,S)=>{if(t===void 0||!t.Xc)return 1;if((d=Ne(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=t.Xc.get(d)))return 2;if(h=Number(h>>>0),w=Number(w>>>0),b=Number(b>>>0),h+w>d.byteLength)return 3;try{let z=d.subarray(h,h+w);switch(S){case 0:($(),H).set(z,b>>>0);break;case 1:t.Qd?t.Qd(b,z):t.Id(b,z);break;default:return 4}return 0}catch{return 4}},974036:(d,h,w)=>{t.td(d,($(),H).subarray(h>>>0,h+w>>>0))},974100:()=>t.Wd(),974142:d=>{t.sd(d)},974179:()=>{t.Bd()},974210:()=>{t.Cd()},974239:()=>{t.Gd()},974264:d=>t.Ad(d),974297:d=>t.Ed(d),974329:(d,h,w)=>{t.ed(Number(d),Number(h),Number(w),!0)},974392:(d,h,w)=>{t.ed(Number(d),Number(h),Number(w))},974449:()=>typeof wasmOffsetConverter<"u",974506:d=>{t.$b("Abs",d,void 0)},974557:d=>{t.$b("Neg",d,void 0)},974608:d=>{t.$b("Floor",d,void 0)},974661:d=>{t.$b("Ceil",d,void 0)},974713:d=>{t.$b("Reciprocal",d,void 0)},974771:d=>{t.$b("Sqrt",d,void 0)},974823:d=>{t.$b("Exp",d,void 0)},974874:d=>{t.$b("Erf",d,void 0)},974925:d=>{t.$b("Sigmoid",d,void 0)},974980:(d,h,w)=>{t.$b("HardSigmoid",d,{alpha:h,beta:w})},975059:d=>{t.$b("Log",d,void 0)},975110:d=>{t.$b("Sin",d,void 0)},975161:d=>{t.$b("Cos",d,void 0)},975212:d=>{t.$b("Tan",d,void 0)},975263:d=>{t.$b("Asin",d,void 0)},975315:d=>{t.$b("Acos",d,void 0)},975367:d=>{t.$b("Atan",d,void 0)},975419:d=>{t.$b("Sinh",d,void 0)},975471:d=>{t.$b("Cosh",d,void 0)},975523:d=>{t.$b("Asinh",d,void 0)},975576:d=>{t.$b("Acosh",d,void 0)},975629:d=>{t.$b("Atanh",d,void 0)},975682:d=>{t.$b("Tanh",d,void 0)},975734:d=>{t.$b("Not",d,void 0)},975785:(d,h,w)=>{t.$b("Clip",d,{min:h,max:w})},975854:d=>{t.$b("Clip",d,void 0)},975906:(d,h)=>{t.$b("Elu",d,{alpha:h})},975964:d=>{t.$b("Gelu",d,void 0)},976016:d=>{t.$b("Relu",d,void 0)},976068:(d,h)=>{t.$b("LeakyRelu",d,{alpha:h})},976132:(d,h)=>{t.$b("ThresholdedRelu",d,{alpha:h})},976202:(d,h)=>{t.$b("Cast",d,{to:h})},976260:d=>{t.$b("Add",d,void 0)},976311:d=>{t.$b("Sub",d,void 0)},976362:d=>{t.$b("Mul",d,void 0)},976413:d=>{t.$b("Div",d,void 0)},976464:d=>{t.$b("Pow",d,void 0)},976515:d=>{t.$b("Equal",d,void 0)},976568:d=>{t.$b("Greater",d,void 0)},976623:d=>{t.$b("GreaterOrEqual",d,void 0)},976685:d=>{t.$b("Less",d,void 0)},976737:d=>{t.$b("LessOrEqual",d,void 0)},976796:(d,h,w,b,S)=>{t.$b("ReduceMean",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},976971:(d,h,w,b,S)=>{t.$b("ReduceMax",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},977145:(d,h,w,b,S)=>{t.$b("ReduceMin",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},977319:(d,h,w,b,S)=>{t.$b("ReduceProd",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},977494:(d,h,w,b,S)=>{t.$b("ReduceSum",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},977668:(d,h,w,b,S)=>{t.$b("ReduceL1",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},977841:(d,h,w,b,S)=>{t.$b("ReduceL2",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},978014:(d,h,w,b,S)=>{t.$b("ReduceLogSum",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},978191:(d,h,w,b,S)=>{t.$b("ReduceSumSquare",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},978371:(d,h,w,b,S)=>{t.$b("ReduceLogSumExp",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},978551:d=>{t.$b("Where",d,void 0)},978604:(d,h,w)=>{t.$b("Transpose",d,{perm:h?Array.from(($(),P).subarray(Number(h)>>>0,Number(w)>>>0)):[]})},978728:(d,h,w,b)=>{t.$b("DepthToSpace",d,{blocksize:h,mode:Ne(w),format:b?"NHWC":"NCHW"})},978861:(d,h,w,b)=>{t.$b("DepthToSpace",d,{blocksize:h,mode:Ne(w),format:b?"NHWC":"NCHW"})},978994:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie,Dt)=>{t.$b("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[w],group:b,kernelShape:[S],pads:[z,N],strides:[B],wIsConst:()=>!!($(),U)[Y>>>0],outputPadding:de?Array.from(($(),P).subarray(Number(de)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),P).subarray(Number(ke)>>>0,Number(Ie)>>>0)):[],activation:Ne(Dt)})},979427:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie)=>{t.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),P).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:b,kernelShape:Array.from(($(),P).subarray(Number(S)>>>0,2+(Number(S)>>>0)>>>0)),pads:Array.from(($(),P).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from(($(),P).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),U)[j>>>0],outputPadding:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ie)})},980088:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie,Dt)=>{t.$b("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[w],group:b,kernelShape:[S],pads:[z,N],strides:[B],wIsConst:()=>!!($(),U)[Y>>>0],outputPadding:de?Array.from(($(),P).subarray(Number(de)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),P).subarray(Number(ke)>>>0,Number(Ie)>>>0)):[],activation:Ne(Dt)})},980521:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie)=>{t.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),P).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:b,kernelShape:Array.from(($(),P).subarray(Number(S)>>>0,2+(Number(S)>>>0)>>>0)),pads:Array.from(($(),P).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from(($(),P).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),U)[j>>>0],outputPadding:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],outputShape:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ie)})},981182:(d,h)=>{t.$b("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},981273:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie)=>{t.$b("AveragePool",d,{format:Ie?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:b,storage_order:S,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},981752:(d,h)=>{t.$b("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},981843:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie)=>{t.$b("AveragePool",d,{format:Ie?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:b,storage_order:S,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982322:(d,h)=>{t.$b("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},982409:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie)=>{t.$b("MaxPool",d,{format:Ie?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:b,storage_order:S,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982884:(d,h)=>{t.$b("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},982971:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie)=>{t.$b("MaxPool",d,{format:Ie?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:b,storage_order:S,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},983446:(d,h,w,b,S)=>{t.$b("Gemm",d,{alpha:h,beta:w,transA:b,transB:S})},983550:d=>{t.$b("MatMul",d,void 0)},983604:(d,h,w,b)=>{t.$b("ArgMax",d,{keepDims:!!h,selectLastIndex:!!w,axis:b})},983712:(d,h,w,b)=>{t.$b("ArgMin",d,{keepDims:!!h,selectLastIndex:!!w,axis:b})},983820:(d,h)=>{t.$b("Softmax",d,{axis:h})},983883:(d,h)=>{t.$b("Concat",d,{axis:h})},983943:(d,h,w,b,S)=>{t.$b("Split",d,{axis:h,numOutputs:w,splitSizes:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},984099:d=>{t.$b("Expand",d,void 0)},984153:(d,h)=>{t.$b("Gather",d,{axis:Number(h)})},984224:(d,h)=>{t.$b("GatherElements",d,{axis:Number(h)})},984303:(d,h)=>{t.$b("GatherND",d,{batch_dims:Number(h)})},984382:(d,h,w,b,S,z,N,B,j,Y,de)=>{t.$b("Resize",d,{antialias:h,axes:w?Array.from(($(),P).subarray(Number(w)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Ne(S),cubicCoeffA:z,excludeOutside:N,extrapolationValue:B,keepAspectRatioPolicy:Ne(j),mode:Ne(Y),nearestMode:Ne(de)})},984744:(d,h,w,b,S,z,N)=>{t.$b("Slice",d,{starts:h?Array.from(($(),P).subarray(Number(h)>>>0,Number(w)>>>0)):[],ends:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[],axes:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[]})},985008:d=>{t.$b("Tile",d,void 0)},985060:(d,h,w)=>{t.$b("InstanceNormalization",d,{epsilon:h,format:w?"NHWC":"NCHW"})},985174:(d,h,w)=>{t.$b("InstanceNormalization",d,{epsilon:h,format:w?"NHWC":"NCHW"})},985288:d=>{t.$b("Range",d,void 0)},985341:(d,h)=>{t.$b("Einsum",d,{equation:Ne(h)})},985422:(d,h,w,b,S)=>{t.$b("Pad",d,{mode:h,value:w,pads:b?Array.from(($(),P).subarray(Number(b)>>>0,Number(S)>>>0)):[]})},985565:(d,h,w,b,S,z)=>{t.$b("BatchNormalization",d,{epsilon:h,momentum:w,spatial:!!S,trainingMode:!!b,format:z?"NHWC":"NCHW"})},985734:(d,h,w,b,S,z)=>{t.$b("BatchNormalization",d,{epsilon:h,momentum:w,spatial:!!S,trainingMode:!!b,format:z?"NHWC":"NCHW"})},985903:(d,h,w)=>{t.$b("CumSum",d,{exclusive:Number(h),reverse:Number(w)})},986e3:(d,h,w)=>{t.$b("DequantizeLinear",d,{axis:h,blockSize:w})},986090:(d,h,w,b,S)=>{t.$b("GridSample",d,{align_corners:h,mode:Ne(w),padding_mode:Ne(b),format:S?"NHWC":"NCHW"})},986260:(d,h,w,b,S)=>{t.$b("GridSample",d,{align_corners:h,mode:Ne(w),padding_mode:Ne(b),format:S?"NHWC":"NCHW"})},986430:(d,h)=>{t.$b("ScatterND",d,{reduction:Ne(h)})},986515:(d,h,w,b,S,z,N,B,j)=>{t.$b("Attention",d,{numHeads:h,isUnidirectional:w,maskFilterValue:b,scale:S,doRotary:z,qkvHiddenSizes:N?Array.from(($(),P).subarray(Number(B)>>>0,Number(B)+N>>>0)):[],pastPresentShareBuffer:!!j})},986787:d=>{t.$b("BiasAdd",d,void 0)},986842:d=>{t.$b("BiasSplitGelu",d,void 0)},986903:d=>{t.$b("FastGelu",d,void 0)},986959:(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie,Dt,Ai)=>{t.$b("Conv",d,{format:we?"NHWC":"NCHW",auto_pad:h,dilations:w?Array.from(($(),P).subarray(Number(w)>>>0,Number(b)>>>0)):[],group:S,kernel_shape:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],strides:Y?Array.from(($(),P).subarray(Number(Y)>>>0,Number(de)>>>0)):[],w_is_const:()=>!!($(),U)[Number(ke)>>>0],activation:Ne(Ie),activation_params:Dt?Array.from(($(),Q).subarray(Number(Dt)>>>0,Number(Ai)>>>0)):[]})},987543:d=>{t.$b("Gelu",d,void 0)},987595:(d,h,w,b,S,z,N,B,j)=>{t.$b("GroupQueryAttention",d,{numHeads:h,kvNumHeads:w,scale:b,softcap:S,doRotary:z,rotaryInterleaved:N,smoothSoftmax:B,localWindowSize:j})},987812:(d,h,w,b)=>{t.$b("LayerNormalization",d,{axis:h,epsilon:w,simplified:!!b})},987923:(d,h,w,b)=>{t.$b("LayerNormalization",d,{axis:h,epsilon:w,simplified:!!b})},988034:(d,h,w,b,S,z)=>{t.$b("MatMulNBits",d,{k:h,n:w,accuracyLevel:b,bits:S,blockSize:z})},988161:(d,h,w,b,S,z)=>{t.$b("MultiHeadAttention",d,{numHeads:h,isUnidirectional:w,maskFilterValue:b,scale:S,doRotary:z})},988320:(d,h)=>{t.$b("QuickGelu",d,{alpha:h})},988384:(d,h,w,b,S)=>{t.$b("RotaryEmbedding",d,{interleaved:!!h,numHeads:w,rotaryEmbeddingDim:b,scale:S})},988523:(d,h,w)=>{t.$b("SkipLayerNormalization",d,{epsilon:h,simplified:!!w})},988625:(d,h,w)=>{t.$b("SkipLayerNormalization",d,{epsilon:h,simplified:!!w})},988727:(d,h,w,b)=>{t.$b("GatherBlockQuantized",d,{gatherAxis:h,quantizeAxis:w,blockSize:b})},988848:d=>{t.Fd(d)},988882:(d,h)=>t.Hd(Number(d),Number(h),t.Yc.Kd,t.Yc.errors)};function oy(d,h,w){return qo(async()=>{await t.Dd(Number(d),Number(h),Number(w))})}function ly(){return typeof wasmOffsetConverter<"u"}function uy(d,h,w,b){var S=me();try{return kl(d,h,w,b)}catch(z){if(pe(S),z!==z+0)throw z;ge(1,0)}}function dy(d,h,w){var b=me();try{return xl(d,h,w)}catch(S){if(pe(b),S!==S+0)throw S;ge(1,0)}}function cy(d){var h=me();try{yl(d)}catch(w){if(pe(h),w!==w+0)throw w;ge(1,0)}}function py(d,h){var w=me();try{return zi(d,h)}catch(b){if(pe(w),b!==b+0)throw b;ge(1,0)}}function hy(d,h,w){var b=me();try{bl(d,h,w)}catch(S){if(pe(b),S!==S+0)throw S;ge(1,0)}}function fy(d,h){var w=me();try{Tl(d,h)}catch(b){if(pe(w),b!==b+0)throw b;ge(1,0)}}function my(d,h,w,b,S,z,N){var B=me();try{return $l(d,h,w,b,S,z,N)}catch(j){if(pe(B),j!==j+0)throw j;ge(1,0)}}function gy(d,h,w,b,S,z){var N=me();try{wl(d,h,w,b,S,z)}catch(B){if(pe(N),B!==B+0)throw B;ge(1,0)}}function by(d,h,w,b){var S=me();try{Sl(d,h,w,b)}catch(z){if(pe(S),z!==z+0)throw z;ge(1,0)}}function yy(d,h,w,b,S){var z=me();try{_l(d,h,w,b,S)}catch(N){if(pe(z),N!==N+0)throw N;ge(1,0)}}function wy(d,h,w,b,S,z,N){var B=me();try{Il(d,h,w,b,S,z,N)}catch(j){if(pe(B),j!==j+0)throw j;ge(1,0)}}function _y(d,h,w,b,S,z,N){var B=me();try{El(d,h,w,b,S,z,N)}catch(j){if(pe(B),j!==j+0)throw j;ge(1,0)}}function xy(d,h,w,b,S,z,N,B){var j=me();try{Nl(d,h,w,b,S,z,N,B)}catch(Y){if(pe(j),Y!==Y+0)throw Y;ge(1,0)}}function vy(d,h,w,b,S){var z=me();try{return Cl(d,h,w,b,S)}catch(N){if(pe(z),N!==N+0)throw N;ge(1,0)}}function $y(d,h,w){var b=me();try{return Pl(d,h,w)}catch(S){if(pe(b),S!==S+0)throw S;ge(1,0)}}function Sy(d,h,w,b,S,z,N,B){var j=me();try{Rl(d,h,w,b,S,z,N,B)}catch(Y){if(pe(j),Y!==Y+0)throw Y;ge(1,0)}}function ky(d,h,w,b,S,z,N,B,j,Y,de,we){var ke=me();try{zl(d,h,w,b,S,z,N,B,j,Y,de,we)}catch(Ie){if(pe(ke),Ie!==Ie+0)throw Ie;ge(1,0)}}function Ty(d,h,w,b,S,z){var N=me();try{return Ml(d,h,w,b,S,z)}catch(B){if(pe(N),B!==B+0)throw B;ge(1,0)}}function Cy(d,h,w){var b=me();try{return Ol(d,h,w)}catch(S){if(pe(b),S!==S+0)throw S;return ge(1,0),0n}}function Iy(d,h,w,b,S,z,N,B,j){var Y=me();try{vl(d,h,w,b,S,z,N,B,j)}catch(de){if(pe(Y),de!==de+0)throw de;ge(1,0)}}function Ey(d){var h=me();try{return Bl(d)}catch(w){if(pe(h),w!==w+0)throw w;ge(1,0)}}function zy(d,h){var w=me();try{return Ql(d,h)}catch(b){if(pe(w),b!==b+0)throw b;return ge(1,0),0n}}function My(d){var h=me();try{return Dl(d)}catch(w){if(pe(h),w!==w+0)throw w;return ge(1,0),0n}}function Ay(d,h,w,b){var S=me();try{return Vl(d,h,w,b)}catch(z){if(pe(S),z!==z+0)throw z;ge(1,0)}}function Ny(d,h,w,b,S){var z=me();try{return Hl(d,h,w,b,S)}catch(N){if(pe(z),N!==N+0)throw N;ge(1,0)}}function Py(d,h,w,b,S,z){var N=me();try{return Gl(d,h,w,b,S,z)}catch(B){if(pe(N),B!==B+0)throw B;ge(1,0)}}function Ry(d,h,w,b,S,z){var N=me();try{return jl(d,h,w,b,S,z)}catch(B){if(pe(N),B!==B+0)throw B;ge(1,0)}}function Oy(d,h,w,b,S,z,N,B){var j=me();try{return Al(d,h,w,b,S,z,N,B)}catch(Y){if(pe(j),Y!==Y+0)throw Y;ge(1,0)}}function By(d,h,w,b,S){var z=me();try{return Kl(d,h,w,b,S)}catch(N){if(pe(z),N!==N+0)throw N;return ge(1,0),0n}}function Dy(d,h,w,b){var S=me();try{return Xl(d,h,w,b)}catch(z){if(pe(S),z!==z+0)throw z;ge(1,0)}}function Uy(d,h,w,b){var S=me();try{return Yl(d,h,w,b)}catch(z){if(pe(S),z!==z+0)throw z;ge(1,0)}}function Ly(d,h,w,b,S,z,N,B,j,Y,de,we){var ke=me();try{return Zl(d,h,w,b,S,z,N,B,j,Y,de,we)}catch(Ie){if(pe(ke),Ie!==Ie+0)throw Ie;ge(1,0)}}function Fy(d,h,w,b,S,z,N,B,j,Y,de){var we=me();try{Wl(d,h,w,b,S,z,N,B,j,Y,de)}catch(ke){if(pe(we),ke!==ke+0)throw ke;ge(1,0)}}function Wy(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie,Dt,Ai){var Gy=me();try{ql(d,h,w,b,S,z,N,B,j,Y,de,we,ke,Ie,Dt,Ai)}catch(Ni){if(pe(Gy),Ni!==Ni+0)throw Ni;ge(1,0)}}function qy(d,h,w){var b=me();try{return Ul(d,h,w)}catch(S){if(pe(b),S!==S+0)throw S;ge(1,0)}}function Vy(d,h,w){var b=me();try{return Ll(d,h,w)}catch(S){if(pe(b),S!==S+0)throw S;ge(1,0)}}function Hy(d,h,w,b){var S=me();try{Fl(d,h,w,b)}catch(z){if(pe(S),z!==z+0)throw z;ge(1,0)}}function _r(){if(0<Ye)Ke=_r;else if(i)_==null||_(t),X();else{for(var d=je;0<d.length;)d.shift()(t);0<Ye?Ke=_r:(t.calledRun=!0,M||(X(),_==null||_(t)))}}return i||(Tt=await Ve(),_r()),t.PTR_SIZE=4,L?t:new Promise((d,h)=>{_=d,T=h})}var qh,pu,c_=q(()=>{var e,t;qh=cu,pu=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),pu&&cu()}),Fi,ja,hu,Qe,Vh,$r,fu,mu,Wi,gu,qi,Hh,Vi,Gh,$s=q(()=>{vs(),Fi=typeof location>"u"?void 0:location.origin,ja=import.meta.url>"file:"&&import.meta.url<"file;",hu=()=>{{if(ja){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Fi).href}return import.meta.url}},Qe=hu(),Vh=()=>{if(Qe&&!Qe.startsWith("blob:"))return Qe.substring(0,Qe.lastIndexOf("/")+1)},$r=(e,t)=>{try{let n=t??Qe;return(n?new URL(e,n):new URL(e)).origin===Fi}catch{return!1}},fu=(e,t)=>{let n=t??Qe;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},mu=(e,t)=>`${t??"./"}${e}`,Wi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},gu=async e=>(await import(e)).default,qi=(d_(),ir(Lh)).default,Hh=async()=>{if(!Qe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if($r(Qe))return[void 0,qi()];let e=await Wi(Qe);return[e,qi(e)]},Vi=(c_(),ir(Wh)).default,Gh=async(e,t,n,r)=>{let i=Vi&&!(e||t);if(i)if(Qe)i=$r(Qe)||r&&!n;else if(r&&!n)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,Vi];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??fu(a,t),o=n&&s&&!$r(s,t),l=o?await Wi(s):s??mu(a,t);return[o?l:void 0,await gu(l)]}}}),Hi,Sr,Un,Gi,bu,yu,wu,Ss,Te,mn=q(()=>{$s(),Sr=!1,Un=!1,Gi=!1,bu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},yu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},wu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ss=async e=>{if(Sr)return Promise.resolve();if(Un)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Gi)throw new Error("previous call to 'initializeWebAssembly()' failed.");Un=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!wu())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!yu())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=bu();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,s=i==null?void 0:i.mjs,o=(s==null?void 0:s.href)??s,l=i==null?void 0:i.wasm,u=(l==null?void 0:l.href)??l,c=e.wasmBinary,[p,f]=await Gh(o,a,n>1,!!c||!!u),g=!1,y=[];if(t>0&&y.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},t)})),y.push(new Promise((_,T)=>{let v={numThreads:n};if(c)v.wasmBinary=c,v.locateFile=x=>x;else if(u||a)v.locateFile=x=>u??a+x;else if(o&&o.indexOf("blob:")!==0)v.locateFile=x=>new URL(x,o).href;else if(p){let x=Vh();x&&(v.locateFile=C=>x+C)}f(v).then(x=>{Un=!1,Sr=!0,Hi=x,_(),p&&URL.revokeObjectURL(p)},x=>{Un=!1,Gi=!0,T(x)})})),await Promise.race(y),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Te=()=>{if(Sr&&Hi)return Hi;throw new Error("WebAssembly is not initialized yet.")}}),ht,Vr,$e,ks=q(()=>{mn(),ht=(e,t)=>{let n=Te(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},Vr=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([i,a])=>{let s=t?t+i:i;if(typeof a=="object")Vr(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},$e=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,r===4?"i32":"i64")),s=t.getValue(i+r,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),jh,p_=q(()=>{mn(),ks(),jh=e=>{let t=Te(),n=0,r=[],i=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(i.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=ht(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&$e("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Vr(e.extra,"",new WeakSet,(s,o)=>{let l=ht(s,r),u=ht(o,r);t._OrtAddRunConfigEntry(n,l,u)!==0&&$e(`Can't set a run config entry: ${s} - ${o}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),a}}}),_u,xu,vu,Yt,$u,Kh,h_=q(()=>{mn(),ks(),_u=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},xu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},vu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Yt=(e,t,n,r)=>{let i=ht(t,r),a=ht(n,r);Te()._OrtAddSessionConfigEntry(e,i,a)!==0&&$e(`Can't set a session config entry: ${t} - ${n}.`)},$u=async(e,t,n)=>{let r=t.executionProviders;for(let i of r){let a=typeof i=="string"?i:i.name,s=[];switch(a){case"webnn":if(a="WEBNN",Yt(e,"session.disable_quant_qdq","1",n),Yt(e,"session.disable_qdq_constant_folding","1",n),typeof i!="string"){let p=i==null?void 0:i.deviceType;p&&Yt(e,"deviceType",p,n)}break;case"webgpu":if(a="JS",typeof i!="string"){let p=i;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);Yt(e,"preferredLayout",p.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let o=ht(a,n),l=s.length,u=0,c=0;if(l>0){u=Te()._malloc(l*Te().PTR_SIZE),n.push(u),c=Te()._malloc(l*Te().PTR_SIZE),n.push(c);for(let p=0;p<l;p++)Te().setValue(u+p*Te().PTR_SIZE,s[p][0],"*"),Te().setValue(c+p*Te().PTR_SIZE,s[p][1],"*")}await Te()._OrtAppendExecutionProvider(e,o,u,c,l)!==0&&$e(`Can't append execution provider: ${a}.`)}},Kh=async e=>{let t=Te(),n=0,r=[],i=e||{};vu(i);try{let a=_u(i.graphOptimizationLevel??"all"),s=xu(i.executionMode??"sequential"),o=typeof i.logId=="string"?ht(i.logId,r):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let u=i.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log verbosity level is not valid: ${u}`);let c=typeof i.optimizedModelFilePath=="string"?ht(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,s,!!i.enableProfiling,0,o,l,u,c),n===0&&$e("Can't create session options."),i.executionProviders&&await $u(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);Yt(n,"enableGraphCapture",i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[p,f]of Object.entries(i.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let g=ht(p,r);t._OrtAddFreeDimensionOverride(n,g,f)!==0&&$e(`Can't set a free dimension override: ${p} - ${f}.`)}return i.extra!==void 0&&Vr(i.extra,"",new WeakSet,(p,f)=>{Yt(n,p,f,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&$e("Can't release session options."),r.forEach(s=>t._free(s)),a}}}),nn,It,rn,si,Hr,Ts,Cs,Ka,ae=q(()=>{nn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},It=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},rn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return n>0?Math.ceil(r*n):void 0},si=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Hr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ts=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Cs=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ka=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Is,Xh=q(()=>{vs(),Is=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(o){if(o instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let s=0;for(;;){let{done:o,value:l}=await i.read();if(o)break;let u=l.byteLength;new Uint8Array(a,s,u).set(l),s+=u}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Su,ku,Tu,Cu,Es,Iu,ye,Mt=q(()=>{ae(),Su=["V","I","W","E","F"],ku=(e,t)=>{console.log(`[${Su[e]},${new Date().toISOString()}]${t}`)},Es=(e,t)=>{Tu=e,Cu=t},Iu=(e,t)=>{let n=Hr(e),r=Hr(Tu);n>=r&&ku(n,typeof t=="function"?t():t)},ye=(...e)=>{Cu&&Iu(...e)}}),Eu,kn,R,Gr,Yh,Zh,Qh,le=q(()=>{Eu=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},kn=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(n){if(r<2||i<2)return;let o=Eu.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(o===void 0)return;[s[a-2],s[a-1]]=o}for(let o=n?3:1;o<=a;o++){let l=r-o<0?1:e[r-o],u=i-o<0?1:t[i-o];if(l!==u&&l>1&&u>1)return;let c=Math.max(l,u);if(l&&u)s[a-o]=Math.max(l,u);else{if(c>1)return;s[a-o]=0}}return s}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},R=class Or{static size(t){return Or.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let i=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){i[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,n/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Or.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Or.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let i=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let i=n-3;i>=0;--i)r[i]=r[i+1]*t[i+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((i,a)=>i+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,i)=>r===n[i])}},Gr=class Zn{static adjustPoolAttributes(t,n,r,i,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<n.length-2;o++)o>=r.length?r.push(n[o+2]):r[o]=n[o+2];for(let o=0;o<r.length;o++)if(o<i.length){if(i[o]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let o=0;o<r.length;o++)if(o<a.length){if(a[o]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let o=0;o<r.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<r.length;o++){if(r[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=r[o]||s[o+r.length]>=r[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,s,o){if(o){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)Zn.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],r[l],i[l],a,l,l+t.length-2,o)}}static computePoolOutputShape(t,n,r,i,a,s,o){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return Zn.computeShapeHelper(t,n,l,r,i,a,s,o),l}static computeConvOutputShape(t,n,r,i,a,s,o){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return Zn.computeShapeHelper(!1,t,l,r,i,a,s,o),l}static computeShapeHelper(t,n,r,i,a,s,o,l){if(t)for(let u=0;u<n.length-2;u++)r.push(1);else for(let u=0;u<n.length-2;u++)r.push(Zn.adjustPadAndReturnShape(n[u+2],i[u],a[u],s[u],o,u,u+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,i,a,s,o,l){let u=r*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[o]=0,Math.floor((t-u)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+i-t;return a[s]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),a[o]=c-a[s],Math.floor((t+c-i)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[o]-u)/n+1)}},Yh=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,s,o;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(r?(o=n[0],l=1):(o=n[1],l=0),n[l]!==s)throw new Error("dimension mismatch");if(a<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(i&&!kn.isValidBroadcast(i,[a,o]))throw new Error("gemm: invalid bias shape for broadcast");return[a,o,s]}},Zh=-34028234663852886e22,Qh=34028234663852886e22}),zs,Jh=q(()=>{ae(),zs=(e,t)=>new(si(t))(e)}),ji,Xa,Ki,zu,Xi,Mu,Yi,Zi,Qi,Au,ef,f_=q(()=>{ae(),Mt(),ji=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Xa=(e,t)=>{if(t==="int32")return e;let n=ji.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(si(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let s=new Int32Array(i);for(let o=0;o<i;o++){let l=a[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ki=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let i=BigInt64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(r,Number);return new Uint8Array(i.buffer)}case"uint8":{if(r.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(r,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},zu=1,Xi=()=>zu++,Mu=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Yi=(e,t)=>{let n=ji.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,i)=>r*i)*n/8):0},Zi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Yi(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=Ki(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return n.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,i)=>r===n[i])}setIsDataConverted(e){this.isDataConverted=e}},Qi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!(a!=null&&a.input.dataTypes.includes(t))){if(s=Mu.get(t),!s||(a==null?void 0:a.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);ye("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Yi(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,o,!0,!0,s),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Xa(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let r=(t=this.wrapper)!=null&&t.isDataConverted?Ki(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Au=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Xi();return this.tensorTrackersById.set(e,new Qi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=Xi(),s=new Zi({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new Qi(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,n,r,i,a,s){let o=this.getMLContext(e);for(let[u,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,n)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}`);let p=this.freeTensors.splice(u,1)[0];return p.sessionId=e,p}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}}`);let l=await o.createTensor({dataType:s??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new Zi({sessionId:e,context:o,tensor:l,dataType:t,shape:n,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},ef=(...e)=>new Au(...e)}),Ln,Nu,tf,m_=q(()=>{ae(),mn(),Jh(),f_(),Mt(),Ln=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Nu=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((i,a)=>i===r[a]&&e[i]===t[i])},tf=class{constructor(e){this.tensorManager=ef(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Es(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>Nu(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(i=>i.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=Ln.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=Ln.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Te().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return zs(n,t)}}registerMLTensor(e,t,n,r){let i=Ln.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,r,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=a.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let u=l.slice(t,t+n).buffer,c;switch(i.dataType){case"float32":c=new Float32Array(u);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(u):new Uint16Array(u);break;case"int32":c=new Int32Array(u);break;case"uint32":c=new Uint32Array(u);break;case"int64":if(s){let p=Xa(new Uint8Array(u),"int64");c=new Int32Array(p.buffer),i.dataType="int32"}else c=new BigInt64Array(u);break;case"uint64":c=new BigUint64Array(u);break;case"int8":c=new Int8Array(u);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(u);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ye("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(i,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=Ln.get(nn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!(i!=null&&i.input.dataTypes.includes(r)):!!(i!=null&&i.output.dataTypes.includes(r))}flush(){}}}),Ms=q(()=>{}),Ji,kr,Tr,Pu,Ru,ea,Ya,Ou,nf,g_=q(()=>{Mt(),Ms(),Ji=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),kr=[],Tr=e=>Math.ceil(Number(e)/16)*16,Pu=e=>{for(let t=0;t<kr.length;t++){let n=kr[t];if(e<=n)return n}return Math.ceil(e/16)*16},Ru=1,ea=()=>Ru++,Ya=async(e,t,n,r)=>{let i=Tr(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let o=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(o,0,n)),l}else return new Uint8Array(o.slice(0,n))}finally{a.destroy()}},Ou=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ji)kr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=Tr(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,r,i)),o.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(o,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([u.finish()]),o.destroy(),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Tr(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=ea();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Pu(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let o=(i?this.freeBuffers:this.freeUniformBuffers).get(n);o?o.length>0?r=o.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let s={id:ea(),type:0,buffer:r};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await Ya(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ji.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},nf=(...e)=>new Ou(...e)}),Bu,ve,Ae=q(()=>{Bu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new Bu(e)}),Tn,Cr,Re,qe,ne,ze,Za,$n,Vt,ee,Fn,D,J,rf,As,Du,af,ue=q(()=>{ae(),le(),Tn=64,Cr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Re=(e,t=1)=>{let n=Cr(e,t);return typeof n=="string"?n:n[0]},qe=(e,t=1)=>{let n=Cr(e,t);return typeof n=="string"?n:n[1]},ne=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:R.computeStrides(n)})}),t},ze=e=>e%4===0?4:e%2===0?2:1,Za=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,$n=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Vt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ee=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Fn=(e,t,n,r,i)=>{let a=typeof n=="number",s=a?n:n.length,o=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,u=Cr(t,i),c=typeof u=="string"?u:u[1],p=typeof u=="string"?u:u[0],f={indices:l,value:c,storage:p,tensor:t},g=L=>typeof L=="string"?L:`${L}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=a?"uniforms.":"",T=`${_}${e}_shape`,v=`${_}${e}_strides`,x="";for(let L=0;L<s-1;L++)x+=`
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
  }`,k=L=>(y.offsetToIndices=!0,s<2?L:`o2i_${e}(${L})`),I=[];if(s>=2)for(let L=s-1;L>=0;L--)I.push(`${ee(v,L,s)} * (indices[${L}])`);let M=s<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${I.join("+")};
  }`,A=L=>(y.indicesToOffset=!0,s<2?L:`i2o_${e}(${L})`),$=(...L)=>s===0?"0u":`${f.indices}(${L.map(g).join(",")})`,O=(L,G)=>s<2?`${L}`:`${ee(L,G,s)}`,U=(L,G,X)=>s<2?`${L}=${X};`:`${ee(L,G,s)}=${X};`,H={},F=(L,G)=>{y.broadcastedIndicesToOffset=!0;let X=`${G.name}broadcastedIndicesTo${e}Offset`;if(X in H)return`${X}(${L})`;let V=[];for(let _e=s-1;_e>=0;_e--){let Ve=G.indicesGet("outputIndices",_e+G.rank-s);V.push(`${O(v,_e)} * (${Ve} % ${O(T,_e)})`)}return H[X]=`fn ${X}(outputIndices: ${G.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${X}(${L})`},K=(L,G)=>(()=>{if(f.storage===f.value)return`${e}[${L}]=${G};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${L}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${L}]=vec2<u32>(u32(${G}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${L}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),P=L=>(()=>{if(f.storage===f.value)return`${e}[${L}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${L}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${L}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${L}] & 0xFFu), bool(${e}[${L}] & 0xFF00u), bool(${e}[${L}] & 0xFF0000u), bool(${e}[${L}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Z=s<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${c} {
    return ${P(`i2o_${e}(indices)`)};
  }`,Q=s<2?"":(()=>{let L=o.map(X=>`d${X}: u32`).join(", "),G=o.map(X=>`d${X}`).join(", ");return`
  fn get_${e}(${L}) -> ${c} {
    return get_${e}ByIndices(${$(G)});
  }`})(),te=(...L)=>{if(L.length!==s)throw new Error(`indices length must be ${s}`);let G=L.map(g).join(",");return s===0?P("0u"):s===1?P(G[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${G})`)},ie=L=>s<2?P(L):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${L})`),W=s<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${c}) {
    ${K(`i2o_${e}(indices)`,"value")}
  }`,re=s<2?"":(()=>{let L=o.map(X=>`d${X}: u32`).join(", "),G=o.map(X=>`d${X}`).join(", ");return`
  fn set_${e}(${L}, value: ${c}) {
    set_${e}ByIndices(${$(G)}, value);
  }`})();return{impl:()=>{let L=[],G=!1;return y.offsetToIndices&&(L.push(C),G=!0),y.indicesToOffset&&(L.push(M),G=!0),y.broadcastedIndicesToOffset&&(Object.values(H).forEach(X=>L.push(X)),G=!0),y.set&&(L.push(re),G=!0),y.setByIndices&&(L.push(W),G=!0),y.get&&(L.push(Q),G=!0),y.getByIndices&&(L.push(Z),G=!0),!a&&G&&L.unshift(`const ${T} = ${f.indices}(${n.join(",")});`,`const ${v} = ${f.indices}(${R.computeStrides(n).join(",")});`),L.join(`
`)},type:f,offsetToIndices:k,indicesToOffset:A,broadcastedIndicesToOffset:F,indices:$,indicesGet:O,indicesSet:U,set:(...L)=>{if(L.length!==s+1)throw new Error(`indices length must be ${s}`);let G=L[s];if(typeof G!="string")throw new Error("value must be string");let X=L.slice(0,s).map(g).join(",");return s===0?K("0u",G):s===1?K(X[0],G):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${X}, ${G})`)},setByOffset:K,setByIndices:(L,G)=>s<2?K(L,G):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${L}, ${G});`),get:te,getByOffset:P,getByIndices:ie,usage:r,name:e,strides:v,shape:T,rank:s}},D=(e,t,n,r=1)=>Fn(e,t,n,"input",r),J=(e,t,n,r=1)=>Fn(e,t,n,"output",r),rf=(e,t,n)=>Fn(e,t,n,"atomicOutput",1),As=(e,t,n,r=1)=>Fn(e,t,n,"internal",r),Du=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Tn){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},af=(e,t)=>new Du(e,t)}),Uu,ta,Lu,Fu,Wu,qu,nt,sf,of,Gt=q(()=>{ae(),le(),Ae(),ue(),Uu=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ta=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Lu=(e,t)=>R.sortBasedOnPerm(e,ta(e.length,t)),Fu=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},Wu=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},qu=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},nt=(e,t)=>{let n=e.dataType,r=e.dims.length,i=ta(r,t),a=Lu(e.dims,i),s=e.dims,o=a,l=r<2||qu(i,e.dims),u;if(l)return u=y=>{let _=D("input",n,s,4),T=J("output",n,o,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(_,T)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:u};let{newShape:c,newPerm:p}=Wu(e.dims,i),f=R.areEqual(p,[2,3,1]),g=R.areEqual(p,[3,1,2]);if(c.length===2||f||g){s=f?[c[0],c[1]*c[2]]:g?[c[0]*c[1],c[2]]:c,o=[s[1],s[0]];let y=16;return u=_=>{let T=D("a",n,s.length),v=J("output",n,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${y+1}>, ${y}>;
  ${_.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/y),y:Math.ceil(o[0]/y)},programUniforms:[{type:12,data:_},...ne(s,o)]}},getShaderSource:u}}return u=y=>{let _=D("a",n,s.length),T=J("output",n,o.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(_,T)}

  ${Fu(i,r,_,T)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...ne(s,o)]}},getShaderSource:u}},sf=(e,t)=>{Uu(e.inputs,t.perm),e.compute(nt(e.inputs[0],t.perm))},of=e=>ve({perm:e.perm})}),Vu,Hu,Gu,ju,Ku,Xu,Yu,Zu,Qu,Ju,lt,lf,uf,df,cf,pf,hf,ff,mf,gf,bf,b_=q(()=>{ae(),le(),ue(),Ns(),Gt(),Vu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Hu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Gu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ju={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ku=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Xu=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let i=t.map(a=>e[a]);return[n,i]},Yu=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},Zu=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Qu=(e,t)=>{let n=[];if(!Zu(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Ju=(e,t,n,r,i,a,s)=>{let o=n[0].dims,l=R.size(a),u=R.size(s),c=D("_A",n[0].dataType,o),p=J("output",i,a),f=64;l===1&&(f=256);let g=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,y=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Gu[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${Vu[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Hu[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${r==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${ju[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:u}]})}},lt=(e,t,n,r)=>{let i=e.inputs.length===1?n:Qa(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((g,y)=>y));let s=R.normalizeAxes(a,e.inputs[0].dims.length),o=s,l=e.inputs[0],u=Qu(o,e.inputs[0].dims.length);u.length>0&&(l=e.compute(nt(e.inputs[0],u),{inputs:[0],outputs:[-1]})[0],o=Ku(o.length,l.dims.length));let[c,p]=Xu(l.dims,o),f=c;i.keepDims&&(f=Yu(c,s)),e.compute(Ju(t,i.cacheKey,[l],r,e.inputs[0].dataType,f,p),{inputs:[l]})},lf=(e,t)=>{lt(e,"ReduceMeanShared",t,"mean")},uf=(e,t)=>{lt(e,"ReduceL1Shared",t,"l1")},df=(e,t)=>{lt(e,"ReduceL2Shared",t,"l2")},cf=(e,t)=>{lt(e,"ReduceLogSumExpShared",t,"logSumExp")},pf=(e,t)=>{lt(e,"ReduceMaxShared",t,"max")},hf=(e,t)=>{lt(e,"ReduceMinShared",t,"min")},ff=(e,t)=>{lt(e,"ReduceProdShared",t,"prod")},mf=(e,t)=>{lt(e,"ReduceSumShared",t,"sum")},gf=(e,t)=>{lt(e,"ReduceSumSquareShared",t,"sumSquare")},bf=(e,t)=>{lt(e,"ReduceLogSumShared",t,"logSum")}}),ut,ed,jr,Qa,dt,td,nd,rd,id,ad,sd,od,ld,ud,dd,ct,yf,wf,_f,xf,vf,$f,Sf,kf,Tf,Cf,Ns=q(()=>{ae(),le(),Ae(),ue(),b_(),ut=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ed=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],jr=(e,t,n,r,i,a,s=!1,o=!1)=>{let l=[],u=n[0].dims,c=u.length,p=R.normalizeAxes(i,c),f=!o&&p.length===0;u.forEach((_,T)=>{f||p.indexOf(T)>=0?s&&l.push(1):l.push(_)});let g=l.length,y=R.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let T=[],v=D("_A",n[0].dataType,c),x=J("output",a,g),C=r(v,x,p),k=C[2];for(let I=0,M=0;I<c;I++)f||p.indexOf(I)>=0?(s&&M++,k=`for(var j${I}: u32 = 0; j${I} < ${u[I]}; j${I}++) {
                  ${C[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${v.indicesSet("input_indices",I,`j${I}`)}
                  ${k}
                }`):(T.push(`${v.indicesSet("input_indices",I,x.indicesGet("output_indices",M))};`),M++);return`

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
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...ne(u,l)]})}},Qa=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),ve({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},dt=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:Qa(i,n);e.compute(jr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?ed:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},td=(e,t)=>{ut(e.inputs),dt(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},nd=(e,t)=>{ut(e.inputs),dt(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},rd=(e,t)=>{ut(e.inputs),dt(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},id=(e,t)=>{ut(e.inputs),dt(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},ad=(e,t)=>{ut(e.inputs),dt(e,"ReduceMax",t,(n,r,i)=>{let a=[];for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},sd=(e,t)=>{ut(e.inputs),dt(e,"ReduceMean",t,(n,r,i)=>{let a=1;for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${a});`]})},od=(e,t)=>{ut(e.inputs),dt(e,"ReduceMin",t,(n,r,i)=>{let a=[];for(let s=0;s<n.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},ld=(e,t)=>{ut(e.inputs),dt(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},ud=(e,t)=>{ut(e.inputs),dt(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},dd=(e,t)=>{ut(e.inputs),dt(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ct=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:i*=e[a];return i<32&&r>1024},yf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sd(e,t):lf(e,t)},wf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nd(e,t):uf(e,t)},_f=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rd(e,t):df(e,t)},xf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?id(e,t):cf(e,t)},vf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ad(e,t):pf(e,t)},$f=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?od(e,t):hf(e,t)},Sf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ld(e,t):ff(e,t)},kf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ud(e,t):mf(e,t)},Tf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dd(e,t):gf(e,t)},Cf=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?td(e,t):bf(e,t)}}),na,If,Ef,Ja,y_=q(()=>{ae(),Ae(),Ns(),na=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},If=(e,t)=>{na(e.inputs);let n=(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(jr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Ef=(e,t)=>{na(e.inputs);let n=(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(jr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Ja=e=>ve(e)}),cd,Ir,pd,hd,fd,ar,md,zf,Ps=q(()=>{ae(),le(),Ms(),ue(),cd=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],u=n.dims[1],c=n.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,f=p,g=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let C of t.qkvHiddenSizes)if(C%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let y=u;if(p!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+f+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(s){if(f!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=s.dims[3])}let T=y+_,v=-1,x=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==u||o.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:u,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:p,vHiddenSize:g,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ir=(e,t,n)=>t&&e?`
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
    `,pd=(e,t,n,r,i,a,s,o)=>{let l=ze(s?1:a),u=64,c=a/l;c<u&&(u=32);let p=Math.ceil(a/l/u),f=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:c},{type:12,data:p}],g=Re(e.dataType,l),y=qe(1,l),_=["type"];s&&_.push("type"),o&&_.push("type");let T=v=>{let x=J("x",e.dataType,e.dims,l),C=[x],k=s?D("seq_lens",s.dataType,s.dims):void 0;k&&C.push(k);let I=o?D("total_sequence_length_input",o.dataType,o.dims):void 0;I&&C.push(I);let M=qe(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${u}>;
  var<workgroup> thread_sum: array<f32, ${u}>;
  ${v.registerUniforms(A).declareVariables(...C)}
  ${v.mainStart([u,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ir(k,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${u}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${u}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${u}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${M}(1.0) / ${M}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${M}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${u};${g};${l}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:f})}},hd=(e,t,n,r,i,a,s,o,l)=>{let u=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,u],p=e>1&&r,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,g=p?[a.batchSize,f,u,a.headSize]:void 0,y=a.nReps?a.nReps:1,_=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=ze(a.headSize),v=a.headSize/T,x=12,C={x:Math.ceil(u/x),y:Math.ceil(a.sequenceLength/x),z:a.batchSize*a.numHeads},k=[{type:12,data:a.sequenceLength},{type:12,data:v},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:_},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:y}],I=p&&r&&R.size(r.dims)>0,M=["type","type"];I&&M.push("type"),i&&M.push("type"),o&&M.push("type"),l&&M.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];p&&A.push({dims:g,dataType:t.dataType,gpuDataType:0});let $=O=>{let U=D("q",t.dataType,t.dims,T),H=D("key",n.dataType,n.dims,T),F=[U,H];if(I){let W=D("past_key",r.dataType,r.dims,T);F.push(W)}i&&F.push(D("attention_bias",i.dataType,i.dims));let K=o?D("seq_lens",o.dataType,o.dims):void 0;K&&F.push(K);let P=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;P&&F.push(P);let Z=J("output",t.dataType,c),Q=[Z];p&&Q.push(J("present_key",t.dataType,g,T));let te=qe(1,T),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${U.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${U.type.storage}, ${x*x}>;
  ${O.registerUniforms(ie).declareVariables(...F,...Q)}
  ${O.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ir(K,P,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${te}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
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
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${i!==void 0};${r!==void 0};${e}`,inputDependencies:M},getRunData:()=>({outputs:A,dispatchGroup:C,programUniforms:k}),getShaderSource:$}},fd=(e,t,n,r,i,a,s=void 0,o=void 0)=>{let l=a+i.kvSequenceLength,u=i.nReps?i.nReps:1,c=i.vHiddenSize*u,p=e>1&&r,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=p?[i.batchSize,f,l,i.headSize]:void 0,y=[i.batchSize,i.sequenceLength,c],_=12,T={x:Math.ceil(i.vHeadSize/_),y:Math.ceil(i.sequenceLength/_),z:i.batchSize*i.numHeads},v=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:u}],x=p&&r&&R.size(r.dims)>0,C=["type","type"];x&&C.push("type"),s&&C.push("type"),o&&C.push("type");let k=[{dims:y,dataType:t.dataType,gpuDataType:0}];p&&k.push({dims:g,dataType:t.dataType,gpuDataType:0});let I=M=>{let A=D("probs",t.dataType,t.dims),$=D("v",n.dataType,n.dims),O=[A,$];x&&O.push(D("past_value",r.dataType,r.dims));let U=s?D("seq_lens",s.dataType,s.dims):void 0;s&&O.push(U);let H=o?D("total_sequence_length_input",o.dataType,o.dims):void 0;o&&O.push(H);let F=[J("output",t.dataType,y)];p&&F.push(J("present_value",t.dataType,g));let K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${A.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${A.type.value}, ${_*_}>;
  ${M.registerUniforms(K).declareVariables(...O,...F)}
  ${M.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${u===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${u===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ir(U,H,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:k,dispatchGroup:T,programUniforms:v}),getShaderSource:I}},ar=(e,t,n,r,i,a,s,o,l,u,c=void 0,p=void 0)=>{let f=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),g=f>1?s:void 0,y=f>1?o:void 0,_=f>1?u.pastSequenceLength:0,T=_+u.kvSequenceLength,v=l&&R.size(l.dims)>0?l:void 0,x=[t,n];g&&R.size(g.dims)>0&&x.push(g),v&&x.push(v),c&&x.push(c),p&&x.push(p);let C=e.compute(hd(f,t,n,g,v,u,_,c,p),{inputs:x,outputs:f>1?[-1,1]:[-1]})[0];e.compute(pd(C,u.batchSize,u.numHeads,_,u.sequenceLength,T,c,p),{inputs:c&&p?[C,c,p]:[C],outputs:[]});let k=[C,r];y&&R.size(y.dims)>0&&k.push(y),c&&k.push(c),p&&k.push(p),e.compute(fd(f,C,r,y,u,_,c,p),{inputs:k,outputs:f>1?[0,2]:[0]})},md=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=p=>{let f=J("output_q",l[0].dataType,n),g=J("output_k",l[0].dataType,n),y=J("output_v",l[0].dataType,n),_=D("input",l[0].dataType,l[0].dims),T=D("weight",l[1].dataType,l[1].dims),v=D("bias",l[2].dataType,l[2].dims),x=_.type.storage,C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${x}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${x}, ${s*s}>;
  var<workgroup> tileWeightK: array<${x}, ${s*s}>;
  var<workgroup> tileWeightV: array<${x}, ${s*s}>;
  ${p.registerUniforms(C).declareVariables(_,T,v,f,g,y)}
  ${p.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:u}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},zf=(e,t)=>{let n=cd(e.inputs,t),[r,i,a]=md(e,n);return ar(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),gd,bd,yd,Mf,w_=q(()=>{at(),ae(),le(),Ae(),ue(),gd=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,i,a)=>{let s=i.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);i.forEach((o,l)=>{if(o!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},bd=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,s=r?ze(a[a.length-1]):1,o=i==="NHWC"&&a.length>1?s:1,l=R.size(a)/s,u=r,c=u?a.length:a,p=D("x",e[0].dataType,e[0].dims,s),f=D("scale",e[1].dataType,e[1].dims,o),g=D("bias",e[2].dataType,e[2].dims,o),y=D("inputMean",e[3].dataType,e[3].dims,o),_=D("inputVar",e[4].dataType,e[4].dims,o),T=J("y",e[0].dataType,c,s),v=()=>{let C="";if(r)C=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(i==="NCHW")C=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{C=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let k=1;k<f.rank;k++)C+=`cIndices[${k}] = outputIndices[${k}];`;C+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return C},x=C=>`
  const epsilon = ${n};
  ${C.registerUniform("outputSize","u32").declareVariables(p,f,g,y,_,T)}
  ${C.mainStart()}
  ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:u?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u?[{type:12,data:l},...ne(a)]:[{type:12,data:l}]})}},yd=e=>ve(e),Mf=(e,t)=>{let{inputs:n,outputCount:r}=e,i=yd({...t,outputCount:r});if(Se.webgpu.validateInputContent&&gd(n,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(bd(n,i))}}),wd,_d,Af,__=q(()=>{le(),ue(),wd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},_d=e=>{let t=e[0].dims,n=e[0].dims[2],r=R.size(t)/4,i=e[0].dataType,a=D("input",i,t,4),s=D("bias",i,[n],4),o=D("residual",i,t,4),l=J("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:u=>`
  const channels = ${n}u / 4;
  ${u.declareVariables(a,s,o,l)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Af=e=>{wd(e.inputs),e.compute(_d(e.inputs))}}),xd,xe,Nf,Pf,Rf,Of,Bf,Df,Uf,Lf,Ff,vd,Wf,qf,Vf,Hf,Qn,Gf,Br,jf,Kf,Xf,Yf,Zf,Qf,Jf,em,tm,nm,rm,im,am,sm,om,lm,ra,um,es,ts,dm,cm,pm,$d,Sd,hm,Rs=q(()=>{ae(),le(),Ae(),ue(),xd=(e,t,n,r,i,a,s)=>{let o=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let u=D("inputData",n,[o],4),c=J("outputData",r,[o],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(u,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${u.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},xe=(e,t,n,r,i,a=e.dataType,s,o)=>{let l=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:u=>xd(u,R.size(e.dims),e.dataType,a,n,r,o),getRunData:u=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(R.size(u[0].dims)/64/4)},programUniforms:l})}},Nf=e=>{e.compute(xe(e.inputs[0],"Abs","abs"))},Pf=e=>{e.compute(xe(e.inputs[0],"Acos","acos"))},Rf=e=>{e.compute(xe(e.inputs[0],"Acosh","acosh"))},Of=e=>{e.compute(xe(e.inputs[0],"Asin","asin"))},Bf=e=>{e.compute(xe(e.inputs[0],"Asinh","asinh"))},Df=e=>{e.compute(xe(e.inputs[0],"Atan","atan"))},Uf=e=>{e.compute(xe(e.inputs[0],"Atanh","atanh"))},Lf=e=>ve(e),Ff=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(xe(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},vd=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ve({min:t,max:n})},Wf=(e,t)=>{let n=t||vd(e.inputs),r=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},qf=e=>{e.compute(xe(e.inputs[0],"Ceil","ceil"))},Vf=e=>{e.compute(xe(e.inputs[0],"Cos","cos"))},Hf=e=>{e.compute(xe(e.inputs[0],"Cosh","cosh"))},Qn=e=>ve(e),Gf=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Br=(e="f32")=>`
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
}`,jf=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Br(t)))},Kf=e=>{e.compute(xe(e.inputs[0],"Exp","exp"))},Xf=e=>{e.compute(xe(e.inputs[0],"Floor","floor"))},Yf=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Br(t)))},Zf=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Qf=e=>{e.compute(xe(e.inputs[0],"Not",t=>`!${t}`))},Jf=e=>{e.compute(xe(e.inputs[0],"Neg",t=>`-${t}`))},em=e=>{e.compute(xe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},tm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},nm=e=>{e.compute(xe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},rm=e=>ve(e),im=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},am=e=>{e.compute(xe(e.inputs[0],"Sin","sin"))},sm=e=>{e.compute(xe(e.inputs[0],"Sinh","sinh"))},om=e=>{e.compute(xe(e.inputs[0],"Sqrt","sqrt"))},lm=e=>{e.compute(xe(e.inputs[0],"Tan","tan"))},ra=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,um=e=>{e.compute(xe(e.inputs[0],"Tanh",ra))},es=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ra("v")};
}
`,ts=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,dm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"FastGelu",ts,es(t),void 0,e.inputs[0].dataType))},cm=(e,t)=>{let n=qe(e.inputs[0].dataType);return e.compute(xe(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},pm=e=>{e.compute(xe(e.inputs[0],"Log","log"))},$d=(e,t)=>`
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
`,Sd=e=>`quick_gelu_impl(${e})`,hm=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"QuickGelu",Sd,$d(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),kd,Td,fm,x_=q(()=>{le(),ue(),Rs(),kd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Td=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=D("input",e[0].dataType,e[0].dims,4),r=D("bias",e[0].dataType,[e[0].dims[2]],4),i=J("output",e[0].dataType,t,4),a=R.size(t)/4,s=Re(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(n,r,i)}

  ${Br(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},fm=e=>{kd(e.inputs),e.compute(Td(e.inputs))}}),Cd,Id,pt,mm,gm,bm,ym,wm,_m,xm,vm,$m,Sm,v_=q(()=>{ae(),le(),ue(),Cd=(e,t,n,r,i,a,s,o,l,u,c,p)=>{let f,g;typeof o=="string"?f=g=(x,C)=>`${o}((${x}),(${C}))`:typeof o=="function"?f=g=o:(f=o.scalar,g=o.vector);let y=J("outputData",c,r.length,4),_=D("aData",l,t.length,4),T=D("bData",u,n.length,4),v;if(i)if(a){let x=R.size(t)===1,C=R.size(n)===1,k=t.length>0&&t[t.length-1]%4===0,I=n.length>0&&n[n.length-1]%4===0;x||C?v=y.setByOffset("global_idx",g(x?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),C?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",g(s||k?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=y.setByOffset("global_idx",g(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(C,k,I="")=>{let M=`aData[indexA${k}][componentA${k}]`,A=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${y.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${_.broadcastedIndicesToOffset(`outputIndices${k}`,y)};
            let offsetB${k} = ${T.broadcastedIndicesToOffset(`outputIndices${k}`,y)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${C}[${k}] = ${I}(${f(M,A)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(_,T,y)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Id=(e,t,n,r,i,a,s=n.dataType)=>{let o=n.dims.map(Number),l=r.dims.map(Number),u=!R.areEqual(o,l),c=o,p=R.size(o),f=!1,g=!1,y=[u];if(u){let _=kn.calcShape(o,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");c=_.slice(),p=R.size(c);let T=R.size(o)===1,v=R.size(l)===1,x=o.length>0&&o[o.length-1]%4===0,C=l.length>0&&l[l.length-1]%4===0;y.push(T),y.push(v),y.push(x),y.push(C);let k=1;for(let I=1;I<c.length;I++){let M=o[o.length-I],A=l[l.length-I];if(M===A)k*=M;else break}k%4===0?(g=!0,f=!0):(T||v||x||C)&&(f=!0)}else f=!0;return y.push(f),{name:e,shaderCache:{hint:t+y.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>Cd(_,o,l,c,f,u,g,i,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(c)/4)},...ne(o,l,c)]})}},pt=(e,t,n,r,i,a)=>{e.compute(Id(t,i??"",e.inputs[0],e.inputs[1],n,r,a))},mm=e=>{pt(e,"Add",(t,n)=>`${t}+${n}`)},gm=e=>{pt(e,"Div",(t,n)=>`${t}/${n}`)},bm=e=>{pt(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},ym=e=>{pt(e,"Mul",(t,n)=>`${t}*${n}`)},wm=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;pt(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
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
      `)},_m=e=>{pt(e,"Sub",(t,n)=>`${t}-${n}`)},xm=e=>{pt(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},vm=e=>{pt(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},$m=e=>{pt(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Sm=e=>{pt(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),Ed,zd,Md,Ad,km,Tm,$_=q(()=>{ae(),le(),Ae(),ue(),Ed=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],i=r.dataType,a=r.dims.length;e.forEach((s,o)=>{if(o!==n){if(s.dataType!==i)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,u)=>{if(u!==t&&l!==r.dims[u])throw new Error("non concat dimensions must match")})}})},zd=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Md=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset("global_idx",e[i].getByIndices("indices"));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},Ad=(e,t,n,r)=>{let i=R.size(n),a=new Array(e.length),s=new Array(e.length),o=0,l=[],u=[],c=[{type:12,data:i}];for(let _=0;_<e.length;++_)o+=e[_].dims[t],a[_]=o,u.push(e[_].dims.length),s[_]=D(`input${_}`,r,u[_]),l.push("rank"),c.push({type:12,data:a[_]});for(let _=0;_<e.length;++_)c.push(...ne(e[_].dims));c.push(...ne(n));let p=J("output",r,n.length),f=p.indicesGet("indices",t),g=Array.from(Array(a.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),y=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...s,p)})()}

  ${zd(a.length,g)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${g});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Md(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:y}},km=(e,t)=>{let n=e.inputs,r=n[0].dims,i=R.normalizeAxis(t.axis,r.length);Ed(n,i);let a=r.slice();a[i]=n.reduce((o,l)=>o+(l.dims.length>i?l.dims[i]:0),0);let s=n.filter(o=>R.size(o.dims)>0);e.compute(Ad(s,i,a,n[0].dataType),{inputs:s})},Tm=e=>ve({axis:e.axis})}),cn,pn,hn,Os,gn=q(()=>{ae(),le(),cn=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},pn=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},hn=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Os=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,r]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=(e==null?void 0:e.activation_params)||[Zh,Qh];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Le,Cm,Bs=q(()=>{Le=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Cm=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Im,S_=q(()=>{Im=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),tr,Ds,Us=q(()=>{ae(),le(),ue(),gn(),tr=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,o)=>`
      if (${ee(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,ee(i,o+a,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Ds=(e,t,n,r,i=!1,a)=>{let s=e[0].dims,o=e[1].dims,l=s[s.length-2],u=o[o.length-1],c=s[s.length-1],p=ze(u),f=ze(c),g=ze(l),y=R.size(n)/p/g,_=e.length>2,T=r?r.slice(0,-2):n.slice(0,-2),v=[R.size(T),l,u],x=[{type:12,data:y},{type:12,data:l},{type:12,data:u},{type:12,data:c}];pn(t,x),x.push(...ne(T,s,o)),_&&x.push(...ne(e[2].dims)),x.push(...ne(v));let C=k=>{let I=As("batch_dims",e[0].dataType,T.length),M=D("a",e[0].dataType,s.length,f),A=D("b",e[1].dataType,o.length,p),$=J("output",e[0].dataType,v.length,p),O=Re($.type.tensor),U=cn(t,$.type.value,O),H=[M,A],F="";if(_){let Z=i?p:1;H.push(D("bias",e[2].dataType,e[2].dims.length,Z)),F=`${i?`value += bias[col / ${Z}];`:`value += ${$.type.value}(bias[row + i]);`}`}let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];hn(t,K);let P=()=>{let Z=`var a_data: ${M.type.value};`;for(let Q=0;Q<f;Q++)Z+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${p}];`;for(let Q=0;Q<g;Q++){Z+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${f}];`;for(let te=0;te<f;te++)Z+=`
            values[${Q}] = fma(${A.type.value}(a_data${f===1?"":`[${te}]`}), b_data${te}, values[${Q}]);
`}return Z};return`
  ${k.registerUniforms(K).registerInternalVariables(I).declareVariables(...H,$)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${M.type.indices};
    ${tr("a_indices",M,M.rank-2,I.rank,"batch_indices")}
    ${M.indicesSet("a_indices",M.rank-2,0)}
    ${M.indicesSet("a_indices",M.rank-1,0)}
    let a_offset = ${M.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${tr("b_indices",A,A.rank-2,I.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${P()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${F}
      ${U}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${f};${g};${i}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:x}),getShaderSource:C}}}),Nd,Pd,ns,ia,Rd,rs,Od,Kr,Ls=q(()=>{ae(),le(),ue(),gn(),Us(),Bs(),Nd=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Pd=(e,t)=>e?`
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
        }`,ns=(e,t,n="f32",r,i=!1,a=32,s=!1,o=32)=>{let l=t[1]*e[1],u=t[0]*e[0],c=i?l:a,p=i?a:l,f=c/t[0],g=a/t[1];if(!((i&&f===4&&e[1]===4||!i&&(f===3||f===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${n}>, ${c/f}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${u/e[0]}>, ${a}>;

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
          ${Nd(i,r)}
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

          ${Pd(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ia=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Rd=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",rs=(e,t,n="f32",r,i=!1,a=32,s=!1,o=32,l=!1)=>{let u=e[1]*t[1],c=e[0]*t[0],p=i?u:a,f=i?a:u;if(!(f%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let g=f/t[1],y=p/t[0],_=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${u};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${ia(i,r)}
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
let globalRowStart = i32(workgroupId.y) * ${u};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${ia(i,r)}
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
      ${Rd(i)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${p}>, ${f}>;
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
`},Od=(e,t,n,r,i=!1)=>{let[a,s,o,l]=r,u=Re(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Le(e,u)} {
      var value = ${Le(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${tr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Le(e,u)} {
      var value = ${Le(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${tr("bIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Le(e,u)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${Le(e,u)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Kr=(e,t,n,r,i=!1,a)=>{let s=e[0].dims,o=e[1].dims,l=s.slice(0,-2),u=o.slice(0,-2),c=r?r.slice(0,-2):n.slice(0,-2),p=R.size(c),f=s[s.length-2],g=s[s.length-1],y=o[o.length-1],_=g%4===0&&y%4===0,T=f<=8?[4,1,1]:[4,4,1],v=[8,8,1],x=[Math.ceil(y/v[0]/T[0]),Math.ceil(f/v[1]/T[1]),Math.ceil(p/v[2]/T[2])],C=_?4:1,k=[...l,f,g/C],I=k.length,M=[...u,g,y/C],A=M.length,$=[p,f,y/C],O=[{type:6,data:f},{type:6,data:y},{type:6,data:g}];pn(t,O),O.push(...ne(c,k,M));let U=["rank","rank"],H=e.length>2;H&&(O.push(...ne(e[2].dims)),U.push("rank")),O.push(...ne($));let F=K=>{let P=c.length,Z=As("batchDims",e[0].dataType,P,1),Q=Re(e[0].dataType),te=D("a",e[0].dataType,I,C),ie=D("b",e[1].dataType,A,C),W=J("result",e[0].dataType,$.length,C),re=[te,ie];if(H){let _e=i?C:1;re.push(D("bias",e[2].dataType,e[2].dims.length,_e))}let L=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];hn(t,L);let G=Re(W.type.tensor),X=cn(t,W.type.value,G),V=Od(C,H,X,[Z,te,ie,W],i);return`
  ${K.registerUniforms(L).registerInternalVariables(Z).declareVariables(...re,W)}
  ${V}
  ${_?ns(T,v,Q,Z):rs(T,v,Q,Z)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${_};${i}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:O}),getShaderSource:F}}}),Bd,Em,k_=q(()=>{ae(),Mt(),ue(),gn(),Bs(),S_(),Ls(),Bd=(e,t,n,r,i=!1,a,s=4,o=4,l=4,u="f32")=>{let c=O=>{switch(O){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${u}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},p=O=>{switch(O){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},f=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",v=e?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Le(s,u)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${_}) {
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
    return ${Le(s,u)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${x}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${Le(s,u)}(0.0);`,k=e?r&&n?p(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(o)}
    }
    return ${Le(o,u)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(o)}
    }
    return ${Le(o,u)}(0.0);`,I=Le(l,u),M=Le(e?s:o,u),A=Le(e?o:s,u),$=cn(a,I,u);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${M} {
      ${e?C:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?k:C}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${Cm(i)}
      ${$}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Em=(e,t,n,r,i,a,s,o,l)=>{let u=t.format==="NHWC",c=u?e[0].dims[3]:e[0].dims[1],p=n[0],f=u?n[2]:n[3],g=u?n[1]:n[2],y=u?n[3]:n[1],_=u&&(c%4===0||c%3===0)&&y%4===0,T=u?y:f*g,v=u?f*g:y,x=[8,8,1],C=r<=8?[4,1,1]:[4,4,1],k=[Math.ceil(T/x[0]/C[0]),Math.ceil(v/x[1]/C[1]),Math.ceil(p/x[2]/C[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let I=_?u&&c%4!==0?3:4:1,M=x[1]*C[1],A=x[0]*C[0],$=Math.max(x[0]*I,x[1]),O=r%M===0,U=i%A===0,H=a%$===0,F=_?[I,4,4]:[1,1,1],K=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];pn(t,K),K.push(...ne(e[0].dims,e[1].dims));let P=["rank","rank"];s&&(K.push(...ne(e[2].dims)),P.push("rank")),K.push(...ne(n));let Z=Q=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];hn(t,te);let ie=_?4:1,W=Re(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${W}>`:W}) {
        result[flatIndex] = ${_?`vec4<${W}>`:W}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${W}>`:W}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,L=D("x",e[0].dataType,e[0].dims.length,I===3?1:I),G=D("w",e[1].dataType,e[1].dims.length,ie),X=[L,G],V=J("result",e[0].dataType,n.length,ie);if(s){let _e=D("bias",e[2].dataType,e[2].dims.length,ie);X.push(_e),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${W}>`:W} {
          return bias[coords.${u?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Im("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Q.registerUniforms(te).declareVariables(...X,V)}
        ${re}
        ${Bd(u,O,U,H,s,t,F[0],F[1],F[2],W)}
        ${_?ns(C,x,W,void 0,!u,$):rs(C,x,W,void 0,!u,$,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${_};${O};${U};${H};${M};${A};${$}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:K}),getShaderSource:Z}}}),Dd,aa,Wn,Ud,sa,Ld,zm,Mm,T_=q(()=>{ae(),Mt(),le(),ue(),gn(),Bs(),Dd=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},aa=e=>typeof e=="number"?[e,e,e]:e,Wn=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ud=(e,t,n,r=1)=>{let i=Wn(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},sa=(e,t,n,r,i)=>{i==null&&(i=Ud(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*i>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*i)/r[s]+1));return a},Ld=(e,t,n,r,i,a,s,o,l,u)=>{let c,p,f,g;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=sa([t,n,r,1],[o,l,u],1,[i,a,s],e);p=y[0],f=y[1],g=y[2]}else if(Array.isArray(e)){if(!e.every((_,T,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=sa([t,n,r,1],[o,l,u],1,[i,a,s],e[0]);p=y[0],f=y[1],g=y[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/i),f=Math.ceil(n/a),g=Math.ceil(r/s);let y=(p-1)*i+o-t,_=(f-1)*a+l-n,T=(g-1)*s+u-r,v=Math.floor(y/2),x=y-v,C=Math.floor(_/2),k=_-C,I=Math.floor(T/2),M=T-I;c={top:C,bottom:k,left:I,right:M,front:v,back:x}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:f,outWidth:g}},zm=(e,t,n,r,i,a=!1,s="channelsLast")=>{let o,l,u,c,p;if(s==="channelsLast")[o,l,u,c,p]=e;else if(s==="channelsFirst")[o,p,l,u,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[f,,g,y,_]=t,[T,v,x]=aa(n),[C,k,I]=aa(r),M=Wn(g,C),A=Wn(y,k),$=Wn(_,I),{padInfo:O,outDepth:U,outHeight:H,outWidth:F}=Ld(i,l,u,c,T,v,x,M,A,$),K=a?f*p:f,P=[0,0,0,0,0];return s==="channelsFirst"?P=[o,K,U,H,F]:s==="channelsLast"&&(P=[o,U,H,F,K]),{batchSize:o,dataFormat:s,inDepth:l,inHeight:u,inWidth:c,inChannels:p,outDepth:U,outHeight:H,outWidth:F,outChannels:K,padInfo:O,strideDepth:T,strideHeight:v,strideWidth:x,filterDepth:g,filterHeight:y,filterWidth:_,effectiveFilterDepth:M,effectiveFilterHeight:A,effectiveFilterWidth:$,dilationDepth:C,dilationHeight:k,dilationWidth:I,inShape:e,outShape:P,filterShape:t}},Mm=(e,t,n,r,i,a)=>{let s=a==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],l={x:n.map((T,v)=>v)},u=[Math.ceil(Dd(l.x.map(T=>n[T]))/o[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let c=1,p=R.size(n),f=[{type:12,data:p},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];pn(t,f),f.push(...ne(e[0].dims,e[1].dims));let g=["rank","rank"],y=e.length===3;y&&(f.push(...ne(e[2].dims)),g.push("rank")),f.push(...ne(n));let _=T=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];hn(t,v);let x=1,C=Re(e[0].dataType),k=D("x",e[0].dataType,e[0].dims.length,c),I=D("W",e[1].dataType,e[1].dims.length,x),M=[k,I],A=J("result",e[0].dataType,n.length,x),$="";if(y){let H=D("bias",e[2].dataType,e[2].dims.length,x);M.push(H),$+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${C} {
          return bias[${s?ee("coords",4,5):ee("coords",1,5)}];
        }`}let O=Le(c,C),U=cn(t,O,C);return`
            ${$}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
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
              ${y?"value = value + getBiasByOutputCoords(coords)":""};
              ${U}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${c};${y}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:f}),getShaderSource:_}}}),Am,Nm,C_=q(()=>{ae(),le(),ue(),gn(),Am=(e,t,n,r)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,l=t.format==="NHWC",u=l?n[3]:n[1],c=u/t.group,p=l&&c>=4?ze(u):1,f=R.size(n)/p,g=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];pn(t,g),g.push(...ne(s,[o[0],o[1],o[2],o[3]/p]));let y=i?["rank","rank","rank"]:["rank","rank"];g.push(...ne([n[0],n[1],n[2],n[3]/p]));let _=T=>{let v=J("output",e[0].dataType,n.length,p),x=Re(v.type.tensor),C=cn(t,v.type.value,x),k=D("x",e[0].dataType,s.length),I=D("w",e[1].dataType,o.length,p),M=[k,I];i&&M.push(D("b",e[2].dataType,e[2].dims,p));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];hn(t,A);let $=l?`
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
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
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
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${$}
    ${a}
    ${C}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:_}},Nm=(e,t,n,r)=>{let i=e.length>2,a=ze(n[3]),s=ze(n[2]),o=R.size(n)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],u=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[n[0],n[1],n[2],n[3]/a],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];pn(t,p),p.push(...ne(l,u,c));let f=(s-1)*t.strides[1]+u[1],g=y=>{let _=J("output",e[0].dataType,c.length,a),T=Re(_.type.tensor),v=cn(t,_.type.value,T),x=D("x",e[0].dataType,l.length,a),C=D("w",e[1].dataType,u.length,a),k=[x,C];i&&k.push(D("b",e[2].dataType,e[2].dims,a));let I=i?"value += b[output_channel];":"",M=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return hn(t,M),`
  ${y.registerUniforms(M).declareVariables(...k,_)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    for (var w_height: u32 = 0u; w_height < ${u[0]}; w_height++) {
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
        for (var w_width: u32 = 0u; w_width < ${u[1]}; w_width++) {
          let w_val = ${C.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${f};${u[0]};${u[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:g}}}),Fd,Er,Wd,zr,is,oa,qd,Vd,as,I_=q(()=>{le(),k_(),T_(),Ls(),C_(),gn(),Us(),Gt(),Fd=(e,t,n,r,i,a)=>{let s=e[0],o=e.slice(a?1:2,a?3:4),l=o.length,u=t[0],c=t.slice(2).map((f,g)=>f+(f-1)*(n[g]-1)),p=o.map((f,g)=>f+r[g]+r[g+l]).map((f,g)=>Math.floor((f-c[g]+i[g])/i[g]));return p.splice(0,0,s),p.splice(a?3:1,0,u),p},Er=[2,3,1,0],Wd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},zr=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();Gr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},is=e=>{let t=Os(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,s=e.kernel_shape,o=e.pads,l=e.strides,u=e.w_is_const();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:s,pads:o,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},oa=(e,t,n,r)=>{let i=n.format==="NHWC",a=Fd(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let M=[t[0]];if(i){let A=e.kernelCustomData.wT??e.compute(nt(t[1],Er),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),M.push(A)}else M.push(t[1]);t.length===3&&M.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Nm(M,n,a,r),{inputs:M}):e.compute(Am(M,n,a,r),{inputs:M});return}let s=t.length===3,o=t[0].dims[i?1:2],l=t[0].dims[i?2:3],u=t[0].dims[i?3:1],c=t[1].dims[2],p=t[1].dims[3],f=a[i?1:2],g=a[i?2:3],y=a[i?3:1],_=i&&c===o&&p===l&&n.pads[0]===0&&n.pads[1]===0;if(_||c===1&&p===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let M=a[0],A,$,O,U=[];if(i){let K=e.kernelCustomData.wT??e.compute(nt(t[1],Er),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=K),_){let P=o*l*u;A=t[0].reshape([1,M,P]),$=K.reshape([1,P,y]),O=[1,M,y]}else A=t[0].reshape([M,o*l,u]),$=K.reshape([1,u,y]),O=[M,f*g,y];U.push(A),U.push($)}else A=t[0].reshape([M,u,o*l]),$=t[1].reshape([1,y,u]),O=[M,y,f*g],U.push($),U.push(A);s&&U.push(t[2]);let H=O[2],F=U[0].dims[U[0].dims.length-1];H<8&&F<8?e.compute(Ds(U,n,a,O,i,r),{inputs:U}):e.compute(Kr(U,n,a,O,i,r),{inputs:U});return}let T=!0,v=e.kernelCustomData.wT??e.compute(nt(t[1],Er),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let x=[t[0],v];s&&x.push(t[2]);let C=i?f*g:y,k=i?y:f*g,I=c*p*u;e.compute(Em(x,n,a,C,k,I,s,T,r),{inputs:x})},qd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=zr({...t,pads:i,strides:a,dilations:s,kernelShape:o},r);oa(e,r,l,u=>n?[u[0],u[2],u[3]]:[u[0],u[1],u[3]])},Vd=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",i=zr(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=zm(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Mm(t,i,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},as=(e,t)=>{if(Wd(e.inputs,t),e.inputs[0].dims.length===3)qd(e,t);else if(e.inputs[0].dims.length===5)Vd(e,e.inputs,t);else{let n=zr(t,e.inputs);oa(e,e.inputs,n)}}}),Pm,E_=q(()=>{ae(),Mt(),le(),ue(),Pm=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format==="NHWC",s=t.group,o=e[1].dims,l=o[2]/s,u=o[3],c=a?ze(l):1,p=a&&u===1&&l>=4,f=p?Math.floor(l/4)*4:Math.floor(l/c)*c,g=l-f,y=a?ze(u):1,_=a?u===1?c:y:1,T=R.size(i)/y,v=[Math.ceil(T/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let x=["rank","rank"],C=[t.strides[0],t.strides[1]],k=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[t.dilations[0],t.dilations[1]],M=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[M[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),M[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:T},{type:12,data:C},{type:12,data:k},{type:12,data:I},{type:12,data:M},{type:6,data:A},{type:12,data:f},{type:12,data:l},{type:12,data:u},...ne(e[0].dims,e[1].dims)];r&&($.push(...ne(e[2].dims)),x.push("rank")),$.push(...ne(i));let O=U=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:C.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:M.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=Re(e[0].dataType),K=a?1:2,P=a?2:3,Z=a?3:1,Q=D("W",e[1].dataType,e[1].dims.length,_),te=D("Dy",e[0].dataType,e[0].dims.length,c),ie=[te,Q];r&&ie.push(D("bias",e[2].dataType,[i[Z]].length,y));let W=J("result",e[0].dataType,i.length,y),re=()=>{let X="";if(p)c===4?X+=`
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
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return X},L=()=>{if(g===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let X="";if(c===1){X+="dotProd = dotProd";for(let V=0;V<g;V++)X+=`
            + ${te.getByOffset(`x_offset + ${V}`)} * ${Q.getByOffset(`w_offset + ${V}`)}`;X+=";"}else if(c===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);X+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${Q.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return X},G=`
            let outputIndices = ${W.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${W.indicesGet("outputIndices",0)};
            let d1 = ${W.indicesGet("outputIndices",Z)};
            let r = ${W.indicesGet("outputIndices",K)};
            let c = ${W.indicesGet("outputIndices",P)};
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
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${P}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${Q.indicesToOffset(`${Q.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${re()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${L()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${y}]`:""};
            ${W.setByOffset("global_idx","value")};
          `;return`
    ${U.registerUniforms(H).declareVariables(...ie,W)}
      ${U.mainStart()}
      ${U.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${G}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${_}${y}${p}${g}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:O}}}),Hd,Gd,jd,la,Rm,Kd,ua,Xd,Om,z_=q(()=>{E_(),gn(),Gt(),Hd=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,Gd=(e,t,n,r,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[i]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[i]=a)},jd=(e,t,n,r,i,a,s,o,l,u)=>{let c=e.length-2,p=u.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let f=e[0],g=t[o?3:1]*i;for(let y=0,_=e.length-c-(o?1:0);y<c;++y,++_){let T=e[_],v=p?T*s[y]:u[y],x=Hd(T,s[y],a[y],t[_],n[y],v);Gd(x,r,a,y,y+c),p&&u.push(s[y]*(T-1)+l[y]+(t[_]-1)*n[y]+1-a[y]-a[y+c])}u.splice(0,0,f),u.splice(o?3:1,0,g)},la=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,f)=>p*f,1)===0){n.length=0;for(let p=2;p<t[1].dims.length;++p)n.push(t[1].dims[p])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}let u=e.strides.slice();if(u.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}jd(o,n,l,e.autoPad,e.group,i,u,r,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:n,pads:i,outputPadding:s,outputShape:a,dilations:l,strides:u}),c},Rm=e=>{let t=Os(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group??1,s=e.kernelShape,o=e.pads,l=e.strides,u=e.wIsConst(),c=e.outputPadding,p=e.outputShape;return{autoPad:r,format:n,dilations:i,group:a,kernelShape:s,outputPadding:c,outputShape:p,pads:o,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},Kd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ua=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(nt(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(Pm(a,n,r),{inputs:a})},Xd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),a=[1].concat(a),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let u=la({...t,pads:o,strides:s,dilations:a,kernelShape:i,outputPadding:l},r);ua(e,r,u,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Om=(e,t)=>{if(Kd(e.inputs,t),e.inputs[0].dims.length===3)Xd(e,t);else{let n=la(t,e.inputs);ua(e,e.inputs,n)}}}),Yd,Bm,Dm,M_=q(()=>{ae(),le(),Ae(),ue(),Yd=(e,t,n,r)=>{let i=R.size(t),a=t.length,s=D("input",e,a),o=J("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),u=R.normalizeAxis(l,a),c=p=>{let f=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,g=ee("uniforms.input_shape","uniforms.axis",a),y=r.reverse?f+(r.exclusive?" + 1":""):"0",_=r.reverse?g:f+(r.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:u},...ne(t,t)]}),getShaderSource:c}},Bm=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(Yd(r,n,i,t),{inputs:[0]})},Dm=e=>{let t=e.exclusive===1,n=e.reverse===1;return ve({exclusive:t,reverse:n})}}),Zd,Qd,Jd,Um,Lm,A_=q(()=>{ae(),le(),Ae(),ue(),Zd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Qd=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)i.push(n.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},Jd=(e,t)=>{let n,r,i,a,s,o,l=t.format==="NHWC",u=t.blocksize,c=t.mode==="DCR";l?([n,r,i,a]=e.dims,s=c?[n,r,i,u,u,a/u**2]:[n,r,i,a/u**2,u,u],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[n,u,u,a/u**2,r,i]:[n,a/u**2,u,u,r,i],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),f=p.dims.length,g=e.dataType,y=D("a",g,f),_=J("output",g,f),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(y,_)}

  ${Qd(o,f,y,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let x=l?[n,r*u,i*u,a/u**2]:[n,a/u**2,r*u,i*u],C=R.size(x),k=p.dims,I=R.sortBasedOnPerm(k,o);return{outputs:[{dims:x,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(C/64)},programUniforms:[{type:12,data:C},...ne(k,I)]}},getShaderSource:T}},Um=(e,t)=>{Zd(e.inputs),e.compute(Jd(e.inputs[0],t))},Lm=e=>ve({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Mr,qn,da,ec,tc,nc,rc,ca,ic,Fm,Wm,N_=q(()=>{ae(),le(),Ae(),ue(),Mr="[a-zA-Z]|\\.\\.\\.",qn="("+Mr+")+",da="^"+qn+"$",ec="("+qn+",)*"+qn,tc="^"+ec+"$",nc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},rc=class{constructor(e,t){var i;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(tc)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,s)=>{let o=e[s].dims.slice();if(!a.match(RegExp(da)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,o,s);this.lhs.push(l)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(qn)))throw new Error("Invalid RHS");(i=r.match(RegExp(Mr,"g")))==null||i.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,s=[],o=0;if(!e.match(RegExp(da))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Mr,"g")),u=new nc(r);return l==null||l.forEach((c,p)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let f=i-l.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(s=n.slice(o,o+f),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let y=String.fromCharCode(48+g);u.addSymbol(y,p+g),this.addSymbol(y,n[o++],r)}}else u.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[o++],r)}),u}},ca=e=>e+"_max",ic=(e,t,n,r)=>{let i=e.map(u=>u.length).map((u,c)=>D(`input${c}`,t,u)),a=R.size(r),s=J("output",t,r.length),o=[...n.symbolToInfo.keys()].filter(u=>!n.rhs.symbolToIndices.has(u)),l=u=>{let c=[],p="var prod = 1.0;",f="var sum = 0.0;",g="sum += prod;",y=[],_=[],T=[],v=[],x=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((k,I)=>{var M;if(n.rhs.symbolToIndices.has(I)){let A=(M=n.rhs.symbolToIndices.get(I))==null?void 0:M[0];A!==void 0&&n.lhs.forEach(($,O)=>{if(k.inputIndices.includes(O)){let U=$.symbolToIndices.get(I);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(H=>{c.push(`${i[O].indicesSet(`input${O}Indices`,H,s.indicesGet("outputIndices",A))}`)})}})}else n.lhs.forEach((A,$)=>{if(k.inputIndices.includes($)){let O=A.symbolToIndices.get(I);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(U=>{y.push(`${i[$].indicesSet(`input${$}Indices`,U,`${I}`)}`)}),v.push(`prod *= ${i[$].getByIndices(`input${$}Indices`)};`)}}),_.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${ca(I)}; ${I}++) {`),T.push("}")});let C=x?[...c,`let sum = ${i.map((k,I)=>k.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,f,..._,...y,p,...v,g,...T];return`
            ${u.registerUniforms(o.map(k=>({name:`${ca(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((k,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let u=o.filter(p=>n.symbolToInfo.has(p)).map(p=>{var f;return{type:12,data:((f=n.symbolToInfo.get(p))==null?void 0:f.dimValue)||0}});u.push({type:12,data:a});let c=e.map((p,f)=>[...ne(p)]).reduce((p,f)=>p.concat(f),u);return c.push(...ne(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Fm=(e,t)=>{let n=new rc(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((a,s)=>a.dims);e.compute(ic(i,e.inputs[0].dataType,n,r))},Wm=e=>{let t=e.equation.replace(/\s+/g,"");return ve({equation:t})}}),ac,pa,sc,oc,qm,P_=q(()=>{ae(),le(),ue(),ac=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},pa=(e,t)=>{let n=e.length-t.length,r=[];for(let i=0;i<n;++i)r.push(e[i]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},sc=(e,t)=>e.length>t.length?pa(e,t):pa(t,e),oc=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=sc(t,n),i=e[0].dataType,a=i===9||R.size(t)===1,s=i===9||t.length>0&&t[t.length-1]%4===0?4:1,o=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(R.size(r)/o),u=p=>{let f=D("input",i,t.length,s),g=J("output",i,r.length,o),y;if(i===9){let _=(T,v,x="")=>`
          let outputIndices${v} = ${g.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${f.broadcastedIndicesToOffset(`outputIndices${v}`,g)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${x}(${f.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${f.getByOffset(`inputOffset / ${s}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(f,g)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},c=[{type:12,data:l},...ne(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},qm=e=>{ac(e.inputs),e.compute(oc(e.inputs),{inputs:[0]})}}),lc,Vm,R_=q(()=>{ae(),le(),ue(),Rs(),lc=e=>{let t=e[0].dataType,n=R.size(e[0].dims),r=R.size(e[1].dims),i=r%4===0,a=s=>{let o=D("x",t,[1],4),l=D("bias",t,[1],4),u=J("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${l.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,f=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(o,l,u)}

    ${es(qe(t))}

    ${s.mainStart(Tn)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${u.setByOffset("global_idx",ts("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Tn/4)}})}},Vm=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?dm(e):e.compute(lc(e.inputs))}}),uc,dc,Hm,Gm,O_=q(()=>{ae(),le(),Ae(),ue(),uc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},dc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=R.normalizeAxis(t.axis,i),s=n.slice(0);s.splice(a,1,...r);let o=n[a],l=e[0].dataType===9?4:1,u=Math.ceil(R.size(s)/l),c=[{type:12,data:u},{type:6,data:o},{type:12,data:a},...ne(e[0].dims,e[1].dims,s)],p=f=>{let g=D("data",e[0].dataType,e[0].dims.length,l),y=D("inputIndices",e[1].dataType,e[1].dims.length),_=J("output",e[0].dataType,s.length,l),T=x=>{let C=r.length,k=`var indicesIndices${x}  = ${y.type.indices}(0);`;for(let I=0;I<C;I++)k+=`${C>1?`indicesIndices${x}[${I}]`:`indicesIndices${x}`} = ${s.length>1?`outputIndices${x}[uniforms.axis + ${I}]`:`outputIndices${x}`};`;k+=`
          var idx${x} = ${y.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${g.type.indices};
        `;for(let I=0,M=0;I<i;I++)I===a?(k+=`${i>1?`dataIndices${x}[${I}]`:`dataIndices${x}`} = u32(idx${x});`,M+=C):(k+=`${i>1?`dataIndices${x}[${I}]`:`dataIndices${x}`} = ${s.length>1?`outputIndices${x}[${M}]`:`outputIndices${x}`};`,M++);return k},v;if(e[0].dataType===9){let x=(C,k,I="")=>`
          let outputIndices${k} = ${_.offsetToIndices(`outputOffset + ${k}u`)};
          ${T(k)};
          let offset${k} = ${g.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${C}[${k}] = ${I}(${g.getByOffset(`index${k}`)}[component${k}]);
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
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,y,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:p}},Hm=e=>ve({axis:e.axis}),Gm=(e,t)=>{let n=e.inputs;uc(n),e.compute(dc(e.inputs,t))}}),cc,jm,Km,B_=q(()=>{ae(),le(),ue(),cc=(e,t,n,r,i,a,s,o,l)=>{let u=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:12,data:l}],c=[a];u.push(...ne(t.dims,c));let p=f=>{let g=D("indices_data",t.dataType,t.dims.length),y=J("input_slice_offsets_data",12,1,1),_=[g,y],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},jm=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,s=a[a.length-1],o=R.sizeToDimension(a,a.length-1),l=R.sizeFromDimension(r,t.batchDims+s),u=R.sizeToDimension(r,t.batchDims),c=R.sizeFromDimension(r,t.batchDims),p=o/u,f=new Array(s),g=l;for(let k=0;k<s;++k)f[s-1-k]=g,g*=r[t.batchDims+s-1-k];let y=cc(e,n[1],f,t.batchDims,r,o,p,c,s),_=t.batchDims+s;if(_>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(r.slice(_)),v=R.size(T),x=[{type:12,data:v},{type:12,data:l},...ne(n[0].dims,y.dims,T)],C=k=>{let I=D("data",n[0].dataType,n[0].dims.length),M=D("slice_offsets",12,y.dims.length),A=J("output",n[0].dataType,T.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,M,A)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:i}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:x}),getShaderSource:C},{inputs:[n[0],y]})},Km=e=>({batchDims:e.batch_dims,cacheKey:""})}),pc,hc,Xm,Ym,D_=q(()=>{ae(),le(),Ae(),ue(),pc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((o,l)=>l===n?Math.ceil(o/r)===a.dims[l]:o===a.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((o,l)=>o===a.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},hc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=R.normalizeAxis(t.gatherAxis,i),s=R.normalizeAxis(t.quantizeAxis,i),o=n.slice(0);o.splice(a,1,...r);let l=R.size(o),u=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...ne(...e.map((g,y)=>g.dims),o)],f=g=>{let y=D("data",e[0].dataType,e[0].dims.length),_=D("inputIndices",e[1].dataType,e[1].dims.length),T=D("scales",e[2].dataType,e[2].dims.length),v=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,x=J("output",u,o.length),C=[y,_,T];v&&C.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(k).declareVariables(...C,x)}
        ${g.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
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
        let dequantized_data = ${qe(u)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,y)=>y!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,y)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:u}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f}},Xm=(e,t)=>{let n=e.inputs;pc(n,t),e.compute(hc(e.inputs,t))},Ym=e=>ve({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),fc,mc,Zm,Qm,U_=q(()=>{ae(),le(),Ae(),ue(),fc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},mc=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,s=e[1].dataType,o=R.normalizeAxis(t.axis,i),l=n[o],u=a.slice(0),c=R.size(u),p=D("input",r,i),f=D("indicesInput",s,a.length),g=J("output",r,u.length),y=[{type:12,data:c},{type:6,data:l},{type:12,data:o}];return y.push(...ne(n,a,u)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:y}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,f,g)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Zm=e=>ve({axis:e.axis}),Qm=(e,t)=>{let n=e.inputs;fc(n),e.compute(mc(e.inputs,t))}}),gc,bc,Jm,eg,L_=q(()=>{ae(),le(),ue(),gc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},bc=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,s]=Yh.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),o=[i,a];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,u=Math.ceil(a/l),c=Math.ceil(i/l),p=!0,f=R.size(o),g=[{type:12,data:p?u:f},{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(g.push(...ne(e[2].dims)),y.push("rank")),g.push(...ne(o));let _=v=>{let x="";t.transA&&t.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let C=t.alpha===1?"":"value *= uniforms.alpha;",k=D("a",e[0].dataType,e[0].dims),I=D("b",e[1].dataType,e[1].dims),M=k.type.value,A=null,$=[k,I];e.length===3&&(A=D("c",e[2].dataType,e[2].dims.length),$.push(A));let O=J("output",e[0].dataType,o.length);$.push(O);let U=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
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
  }`},T=v=>{let x=D("a",e[0].dataType,e[0].dims),C=D("b",e[1].dataType,e[1].dims),k=null,I=[x,C];e.length===3&&(k=D("c",e[2].dataType,e[2].dims.length),I.push(k));let M=J("output",e[0].dataType,o.length);I.push(M);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",O="";t.transA&&t.transB?(O=`
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
  ${v.registerUniforms(A).declareVariables(...I)}
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
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:u*c},programUniforms:g}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:_}},Jm=e=>{let t=e.transA,n=e.transB,r=e.alpha,i=e.beta;return{transA:t,transB:n,alpha:r,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},eg=(e,t)=>{gc(e.inputs),e.compute(bc(e.inputs,t))}}),_t,Ct,Zt,Qt,yc,wc,_c,xc,vc,$c,Sc,kc,tg,ng,F_=q(()=>{ae(),le(),Ae(),ue(),[_t,Ct,Zt,Qt]=[0,1,2,3],yc=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},wc=`
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
`,_c=e=>`
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
`,xc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,vc=e=>`
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
`,$c=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${_t}] = batch;
     indices[${Ct}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Zt}] = u32(r);
            indices[${Qt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Zt}] = u32(clamp(r, 0, H - 1));
          indices[${Qt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Zt}] = gs_reflect(r, border[1], border[3]);
          indices[${Qt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Sc=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${_t}], indices[${Ct}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${_t}], indices[${Ct}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${_t}], indices[${Ct}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${_t}], indices[${Ct}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${_t}], indices[${Ct}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${_t}], indices[${Ct}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,kc=(e,t)=>{let n=D("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=D("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[_t,Ct,Zt,Qt]=[0,3,1,2]);let s=J("output",e[0].dataType,a.length),o=n.type.value,l=R.size(a),u=[{type:12,data:l},...ne(e[0].dims,r,a)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(n,i,s)}
  ${wc}
  ${_c(o)}
  ${xc(t)}
  ${vc(t)}
  ${$c(n,o,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Zt}]);
      let W_in = i32(uniforms.x_shape[${Qt}]);

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
      var grid_indices = vec3<u32>(indices[${_t}], indices[${Zt}], indices[${Qt}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Sc(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let f=R.size(a);return{outputs:[{dims:a,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:u}},getShaderSource:c}},tg=(e,t)=>{yc(e.inputs),e.compute(kc(e.inputs,t))},ng=e=>ve({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),He,Tc,rg,ha,Cc,Jn,ig,ag=q(()=>{ae(),le(),Ae(),Ms(),Ps(),ue(),Gt(),He=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Tc=(e,t)=>{let n=e[0],r=He(e,1),i=He(e,2),a=He(e,3),s=He(e,4),o=He(e,5),l=He(e,6),u=He(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],p=n.dims[1],f=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],g=p,y=0,_=0,T=Math.floor(f/t.numHeads);if(l&&u&&R.size(l.dims)&&R.size(u.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(u.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],_=l.dims[2]}else if(l&&R.size(l.dims)||u&&R.size(u.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(r&&R.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a&&R.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=y+g,C=0;if(s&&R.size(s.dims)>0){C=8;let A=s.dims;throw A.length===1?A[0]===c?C=1:A[0]===3*c+2&&(C=3):A.length===2&&A[0]===c&&A[1]===x&&(C=5),C===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,I=f;if(i&&R.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(g!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=i.dims[2]}else{if(g!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=i.dims[1]*i.dims[3],k=!0}}let M=!1;if(s&&R.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&R.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:f,vHiddenSize:I,headSize:T,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:C,scale:t.scale,broadcastResPosBias:M,passPastInKv:k,qkvFormat:v}},rg=e=>ve({...e}),ha=ve({perm:[0,2,1,3]}),Cc=(e,t,n,r,i,a,s)=>{let o=[r,i,a],l=R.size(o),u=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],c=p=>{let f=J("qkv_with_bias",t.dataType,o),g=D("qkv",t.dataType,o),y=D("bias",n.dataType,o),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(g,y,f)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:c},{inputs:[t,n],outputs:[-1]})[0]},Jn=(e,t,n,r,i,a,s,o)=>{let l=a;if(s&&R.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Cc(e,a,s,t,r,n*i,o),l=l.reshape([t,r,n,i]),n===1||r===1?l:e.compute(nt(l,ha.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,i])),n===1||r===1?l:e.compute(nt(l,ha.perm),{inputs:[l],outputs:[-1]})[0]},ig=(e,t)=>{let n=Tc(e.inputs,t),r=e.inputs[0],i=He(e.inputs,1),a=He(e.inputs,2),s=He(e.inputs,3),o=He(e.inputs,4),l=He(e.inputs,5),u=He(e.inputs,6),c=He(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if((i==null?void 0:i.dims.length)===5)throw new Error("Packed KV is not implemented");let p=i&&a&&i.dims.length===4&&a.dims.length===4,f=Jn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(p)return ar(e,f,i,a,o,void 0,u,c,l,n);if(!i||!a)throw new Error("key and value must be provided");let g=Jn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,s,n.hiddenSize),y=Jn(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);ar(e,f,g,y,o,void 0,u,c,l,n)}}),Ic,Ec,zc,Mc,ss,sg,og,lg=q(()=>{ae(),le(),Ae(),ue(),Ic=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ec=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>n.push(Number(i))),r=n.length),ve({numOutputs:r,axis:t.axis,splitSizes:n})},zc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ee("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Mc=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},ss=(e,t)=>{let n=e[0].dims,r=R.size(n),i=e[0].dataType,a=R.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),o=D("input",i,n.length),l=new Array(t.numOutputs),u=[],c=[],p=0,f=[{type:12,data:r}];for(let y=0;y<t.numOutputs;y++){p+=t.splitSizes[y],l[y]=p;let _=n.slice();_[a]=t.splitSizes[y],c.push(_),s[y]=J(`output${y}`,i,_.length),u.push({dims:c[y],dataType:e[0].dataType})}f.push({type:12,data:l},...ne(n,...c));let g=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...s)}
  ${zc(l.length)}
  ${Mc(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ee("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:u,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},sg=(e,t)=>{Ic(e.inputs);let n=e.inputs.length===1?t:Ec(e.inputs,t);e.compute(ss(e.inputs,n),{inputs:[0]})},og=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ve({axis:t,numOutputs:r,splitSizes:n})}}),Ac,Xr,ug,dg=q(()=>{ae(),le(),Ae(),ue(),Ac=(e,t)=>{let[n,r,i,a]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!R.areEqual(r.dims,[])&&!R.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!R.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],u=n.dims[n.dims.length-2],c=i.dims[0],p=R.sizeFromDimension(n.dims,1)/u,f=o===0?i.dims[1]*2:p/s;if(o>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(u!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(u>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(f/2!==i.dims[1]&&o/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},Xr=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,s=e[0].dims[0],o=R.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],u=o/l,c=e[2].dims[1],p=i===0?c*2:u/r,f=new Array(s,l,u/p,p-c),g=R.computeStrides(f),y=[{type:1,data:a},{type:12,data:f},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[o,u,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,p,l*p,1]}):[],...ne(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=T=>{let v=D("input",e[0].dataType,e[0].dims.length),x=D("position_ids",e[1].dataType,e[1].dims.length),C=D("cos_cache",e[2].dataType,e[2].dims.length),k=D("sin_cache",e[3].dataType,e[3].dims.length),I=J("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${T.declareVariables(v,x,C,k,I)}

        ${T.mainStart(Tn)}
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
            ${I.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ve({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(f)/Tn)},programUniforms:y})}},ug=(e,t)=>{Ac(e.inputs,t),e.compute(Xr(e.inputs,t))}}),Nc,Pc,fa,Rc,cg,W_=q(()=>{Ae(),ae(),Ps(),ag(),lg(),Gt(),dg(),ue(),Nc=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],i=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=n.dims[0],u=n.dims[1],c=n.dims.length===3?o?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],p=u,f=0,g=!r||r.dims.length===0,y=Math.floor(g?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);g&&(c=y*t.numHeads);let _=a&&a.dims.length!==0,T=s&&s.dims.length!==0;if(_&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=a.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let x=0,C=!1,k=t.kvNumHeads?y*t.kvNumHeads:c;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(p!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=i.dims[2]}else{if(p!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=i.dims[1]*i.dims[3],C=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let M=I.dims.reduce((A,$)=>A*$,1);if(M!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${M}.`);for(let A=0;A<I.dims.length;A++)if(I.dims[A]!==1&&I.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${I.dims[A]}.`)}return{batchSize:l,sequenceLength:u,pastSequenceLength:f,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:k,headSize:y,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:v}},Pc=ve({perm:[0,2,1,3]}),fa=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(nt(r,Pc.perm),{inputs:[r],outputs:[-1]})[0]),r},Rc=(e,t,n,r)=>{let i=7,a=["type","type"],s=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],u=c=>{let p=D("seq_lens",n.dataType,n.dims),f=D("total_seq_lens",r.dataType,r.dims),g=J("pos_ids",i,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(y).declareVariables(p,f,g)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${f.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:u}},cg=(e,t)=>{var k;let n=Nc(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((k=e.inputs[1])==null?void 0:k.dims.length)===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,u=e.inputs.length>5?e.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,p=ve({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[f,g,y]=!i&&!a?e.compute(ss([r],p),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],_,T;if(t.doRotary){let I=e.compute(Rc(n.batchSize,n.sequenceLength,l,u),{inputs:[l,u],outputs:[-1]})[0],M=e.inputs[7],A=e.inputs[8],$=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[f,I,M,A],U=[-1];_=e.compute(Xr(O,$),{inputs:O,outputs:U})[0],O.splice(0,1,g);let H=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Xr(O,H),{inputs:O,outputs:U})[0]}let v=Jn(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?_:f,void 0,0),x=fa(e,t.doRotary?T:g,n),C=fa(e,y,n);ar(e,v,x,C,void 0,void 0,s,o,void 0,n,l,u)}}),ma,Oc,Bc,pg,q_=q(()=>{ae(),le(),Gt(),ue(),ma=(e,t,n,r,i,a,s,o)=>{let l=ze(a),u=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,p=i*s,f=64;p===1&&(f=256);let g=[i,s,a/l],y=[i,s,2],_=["rank","type","type"],T=[];T.push(...ne(g,y));let v=x=>{let C=D("x",t.dataType,3,l),k=D("scale",n.dataType,n.dims),I=D("bias",r.dataType,r.dims),M=J("output",1,3,2),A=[C,k,I,M];return`
  var<workgroup> workgroup_shared : array<${c}, ${f}>;
  const workgroup_size = ${f}u;
  ${x.declareVariables(...A)}
  ${x.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${u}(0);
    var squared_sum = ${u}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${u}(${C.get("batch","channel","h")});
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
      let sum_final = ${Vt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Vt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:p},programUniforms:T}),getShaderSource:v},{inputs:[t,n,r],outputs:[-1]})[0]},Oc=(e,t,n)=>{let r=t[0].dims,i=r,a=2,s=r[0],o=r[1],l=R.sizeFromDimension(r,a),u=ze(l),c=R.size(i)/u,p=ma(e,t[0],t[1],t[2],s,l,o,n.epsilon),f=[s,o,l/u],g=[s,o],y=["type","none"],_=T=>{let v=D("x",t[0].dataType,f.length,u),x=D("scale_shift",1,g.length,2),C=J("output",t[0].dataType,f.length,u),k=[v,x,C];return`
  ${T.registerUniform("output_size","u32").declareVariables(...k)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${C.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${C.type.value}(scale_shift.x) + ${C.type.value}(scale_shift.y);
      ${C.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${u}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ne(f,g,f)]}),getShaderSource:_},{inputs:[t[0],p]})},Bc=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],s=r[r.length-1],o=R.sizeFromDimension(r,1)/s,l=ze(s),u=R.size(i)/l,c=[{type:12,data:o},{type:12,data:Math.floor(s/l)}],p=["type","type"],f=!1,g=[0,r.length-1];for(let v=0;v<r.length-2;v++)f=f||r[v+1]!==1,g.push(v+1);f=f&&r[r.length-1]!==1;let y=f?e.compute(nt(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(v,x)=>r[g[x]])),_=ma(e,y,t[1],t[2],a,o,s,n.epsilon),T=v=>{let x=Re(t[0].dataType),C=l===1?"vec2f":`mat${l}x2f`,k=A=>{let $=A===0?"x":"y",O=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${x}(${O}(scale.${$}))`;case 2:return`vec2<${x}>(${O}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${x}>(${O}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=D("input",t[0].dataType,t[0].dims,l),M=J("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
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
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],_]})},pg=(e,t)=>{t.format==="NHWC"?Bc(e,e.inputs,t):Oc(e,e.inputs,t)}}),Dc,Uc,hg,V_=q(()=>{ae(),le(),ue(),Dc=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Uc=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],s=!r&&e[2],o=i,l=R.normalizeAxis(t.axis,i.length),u=R.sizeToDimension(i,l),c=R.sizeFromDimension(i,l),p=R.size(a.dims),f=s?R.size(s.dims):0;if(p!==c||s&&f!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${f}`);let g=[];for(let I=0;I<i.length;++I)I<l?g.push(i[I]):g.push(1);let y=ze(c),_=["type","type"],T=[{type:12,data:u},{type:1,data:c},{type:12,data:Math.floor(c/y)},{type:1,data:t.epsilon}];s&&_.push("type");let v=n>1,x=n>2,C=I=>{let M=Re(e[0].dataType),A=[D("x",e[0].dataType,e[0].dims,y),D("scale",a.dataType,a.dims,y)];s&&A.push(D("bias",s.dataType,s.dims,y)),A.push(J("output",e[0].dataType,o,y)),v&&A.push(J("mean_data_output",1,g)),x&&A.push(J("inv_std_output",1,g));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms($).declareVariables(...A)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Za("f32",y)};
    var mean_square_vector = ${Za("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${$n(M,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Vt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Vt("mean_square_vector",y)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${$n(M,y,"x[j + offset]")};
      let f32scale = ${$n(M,y,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${$n(M,y,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:o,dataType:e[0].dataType}];return v&&k.push({dims:g,dataType:1}),x&&k.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${n};${r}`,inputDependencies:_},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:T}),getShaderSource:C}},hg=(e,t)=>{Dc(e.inputs),e.compute(Uc(e.inputs,t,e.outputCount))}}),Lc,fg,H_=q(()=>{le(),Us(),Ls(),Lc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},fg=e=>{Lc(e.inputs);let t=kn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Ds(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=R.size(e.inputs[0].dims.slice(0,-2)),s=R.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&s===1){let o=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),u=[1,a,n],c=[o,l];e.compute(Kr(c,{activation:""},t,u),{inputs:c})}else e.compute(Kr(e.inputs,{activation:""},t))}}}),Fc,Wc,qc,mg,gg,G_=q(()=>{ae(),le(),Ae(),ue(),Fc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!R.areEqual(s.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(R.size(o)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,u=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(R.size(l)!==u)throw new Error("zeroPoints input size error.")}},Wc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,s=t.n,o=n.slice(0,r-2),l=R.size(o),u=e[1].dims[2]/4,c=e[0].dataType,p=ze(t.k),f=ze(u),g=ze(s),y=o.concat([i,s]),_=i>1&&s/g%2===0?2:1,T=R.size(y)/g/_,v=64,x=[],C=[l,i,a/p],k=R.convertShape(e[1].dims).slice();k.splice(-1,1,u/f),x.push(...ne(C)),x.push(...ne(k)),x.push(...ne(e[2].dims)),e.length===4&&x.push(...ne(R.convertShape(e[3].dims)));let I=[l,i,s/g];x.push(...ne(I));let M=A=>{let $=C.length,O=D("a",e[0].dataType,$,p),U=D("b",12,k.length,f),H=D("scales",e[2].dataType,e[2].dims.length),F=[O,U,H],K=e.length===4?D("zero_points",12,e[3].dims.length):void 0;K&&F.push(K);let P=I.length,Z=J("output",e[0].dataType,P,g),Q=Re(e[0].dataType),te=(()=>{switch(p){case 1:return`array<${Q}, 8>`;case 2:return`mat4x2<${Q}>`;case 4:return`mat2x4<${Q}>`;default:throw new Error(`${p}-component is not supported.`)}})(),ie=Math.floor(32/t.bits),W=Math.floor(ie/8),re=()=>{let X="";for(let V=0;V<W;V++){let _e=V*t.bits*4,Ve=_e+t.bits;X+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?O.indicesToOffset(`${O.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${te};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/p}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${O.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let Ee=0;Ee<g*_;Ee++)X+=`
            b_value = ${f===1?`b${Ee}_data`:`b${Ee}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${V*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${_e}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ve}u) & b_mask);`}
            b_quantized_values = ${te}(${Array.from({length:4},(Be,je)=>`${Q}(b_value_lower[${je}]), ${Q}(b_value_upper[${je}])`).join(", ")});
            b_dequantized_values = ${p===1?`${te}(${Array.from({length:8},(Be,je)=>`(b_quantized_values[${je}] - ${K?`zero_point${Ee}`:"zero_point"}) * scale${Ee}`).join(", ")});`:`(b_quantized_values - ${te}(${Array(8).fill(`${K?`zero_point${Ee}`:"zero_point"}`).join(",")})) * scale${Ee};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(Ee/g)}]${g>1?`[${Ee%g}]`:""} += ${Array.from({length:8/p},(Be,je)=>`${p===1?`a_data${V>0?V:""}[${je}] * b_dequantized_values[${je}]`:`dot(a_data${V>0?V:""}[${je}], b_dequantized_values[${je}])`}`).join(" + ")};
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
            var word_offset: u32 = block * ${t.blockSize/p};
            ${L()}
            for (var word: u32 = 0; word < ${u}; word += ${f}) {
              ${G()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${re()}
                word_offset += ${ie/p};
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
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${f};${g};${_};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:c}],dispatchGroup:{x:T},programUniforms:x}),getShaderSource:M}},qc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,s=t.n,o=n.slice(0,r-2),l=R.size(o),u=e[1].dims[2]/4,c=e[0].dataType,p=ze(t.k),f=ze(u),g=o.concat([i,s]),y=128,_=s%8===0?8:s%4===0?4:1,T=y/_,v=Math.floor(32/t.bits),x=T*f*v,C=x/p,k=x/t.blockSize,I=R.size(g)/_,M=[],A=[l,i,a/p],$=R.convertShape(e[1].dims).slice();$.splice(-1,1,u/f),M.push(...ne(A)),M.push(...ne($)),M.push(...ne(e[2].dims)),e.length===4&&M.push(...ne(R.convertShape(e[3].dims)));let O=[l,i,s];M.push(...ne(O));let U=H=>{let F=A.length,K=D("a",e[0].dataType,F,p),P=D("b",12,$.length,f),Z=D("scales",e[2].dataType,e[2].dims.length),Q=[K,P,Z],te=e.length===4?D("zero_points",12,e[3].dims.length):void 0;te&&Q.push(te);let ie=O.length,W=J("output",e[0].dataType,ie),re=Re(e[0].dataType),L=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
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
            for (var a_offset = local_idx; a_offset < ${C}; a_offset += ${y})
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
            let b_data = ${P.getByIndices(`${P.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?"b_data":"b_data[i]"};
              ${(()=>{let G=Math.floor(v/8),X="";for(let V=0;V<G;V++){let _e=V*t.bits*4,Ve=_e+t.bits;X+=`
              ${L()}
              {${t.bits===2?`
                let half_word = b_value >> ${V*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${_e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ve}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(Ee,Be)=>`${re}(b_value_lower[${Be}]), ${re}(b_value_upper[${Be}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ee,Be)=>`${`dot(a_data${Be}, b_dequantized_values[${Be}])`}`).join(" + ")};
              }
              word_offset += ${8/p};`}return X})()}
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
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${f};${T};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:I},programUniforms:M}),getShaderSource:U}},mg=(e,t)=>{Fc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(qc(e.inputs,t)):e.compute(Wc(e.inputs,t))},gg=e=>ve(e)}),Vc,Hc,Gc,jc,Kc,Xc,Yc,Zc,bg,j_=q(()=>{ae(),le(),ue(),Vc=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Hc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
      `},Gc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},jc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},Kc=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},Xc=(e,t,n)=>{switch(n.mode){case 0:return Hc(e,t,n.pads.length);case 1:return Gc(e,t,n.pads.length);case 2:return jc(e,t,n.pads.length);case 3:return Kc(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Yc=(e,t)=>{let n=R.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=R.size(n),a=[{type:12,data:i},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...ne(e[0].dims,n));let o=["rank"],l=u=>{let c=J("output",e[0].dataType,n.length),p=D("x",e[0].dataType,r.length),f=p.type.value,g=Xc(c,r.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?f:"f32"}),`
            ${u.registerUniforms(y).declareVariables(p,c)}
            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(n)/64)},programUniforms:a}),getShaderSource:l}},Zc=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)a[Number(o[l])]=Number(n[l]),a[Number(o[l])+i]=Number(n[l+o.length])}else n.forEach((o,l)=>a[Number(l)]=Number(o));let s=[];return a.forEach(o=>s.push(o)),{mode:t.mode,value:r,pads:s}}else return t},bg=(e,t)=>{Vc(e.inputs);let n=Zc(e.inputs,t);e.compute(Yc(e.inputs,n),{inputs:[0]})}}),Vn,ga,ba,ya,wa,Qc,Jc,_a,xa,yg,wg,va,_g,xg,$a,vg,$g,Sg,kg,K_=q(()=>{at(),ae(),le(),ue(),Vn=e=>{if(Se.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ga=(e,t,n)=>{let r=t.format==="NHWC",i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),l=a?t.dilations.slice():[],u=t.pads.slice();Gr.adjustPoolAttributes(n,i,s,o,l,u);let c=Gr.computePoolOutputShape(n,i,o,l,s,u,t.autoPad),p=Object.assign({},t);a?Object.assign(p,{kernelShape:s,strides:o,pads:u,dilations:l,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:o,pads:u,cacheKey:t.cacheKey});let f=c.slice();return f.push(f.splice(1,1)[0]),[p,r?f:c]},ba=(e,t)=>{let n=t.format==="NHWC",r=R.size(e),i=R.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],p=!!(u+c);a.push({type:12,data:o},{type:12,data:l},{type:12,data:u},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];f=!!(_+T),a.push({type:12,data:g},{type:12,data:y},{type:12,data:_},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,p,f]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=R.computeStrides(t.kernelShape);a.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((u,c)=>u+c);return[a,s,!!l,!1,!1]}},ya=(e,t,n,r,i,a,s,o,l,u,c,p)=>{let f=i.format==="NHWC",g=t.type.value,y=J("output",t.type.tensor,r);if(i.kernelShape.length<=2){let _="",T="",v="",x=n-(f?2:1);if(c?_=`
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
                }`,i.kernelShape.length===2){let C=n-(f?3:2);p?T=`
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
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${g}(${o});
              var pad = 0;
              ${T}
              ${_}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=i.kernelShape.length,T=i.pads.length,v="";return u?v=`
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
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

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
            }`}},wa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Qc=e=>`${wa(e)};${e.countIncludePad}`,Jc=e=>`${wa(e)};${e.storageOrder};${e.dilations}`,_a=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),xa=(e,t,n,r)=>{let[i,a]=ga(t,r,n),s=D("x",t.dataType,t.dims.length),o=s.type.value,l="value += x_val;",u="";i.countIncludePad?u+=`value /= ${o}(uniforms.kernelSize);`:u+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,p,f,g,y]=ba(a,i);c.push(...ne(t.dims,a));let _=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${f};${g};${y}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:T=>ya(T,s,t.dims.length,a.length,i,l,u,0,p,f,g,y)}},yg=e=>{let t=e.count_include_pad!==0,n=_a(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Qc(r)}},wg=(e,t)=>{Vn(e.inputs),e.compute(xa("AveragePool",e.inputs[0],!1,t))},va={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},_g=e=>{let t=e.format;return{format:t,...va,cacheKey:t}},xg=(e,t)=>{Vn(e.inputs),e.compute(xa("GlobalAveragePool",e.inputs[0],!0,t))},$a=(e,t,n,r)=>{let[i,a]=ga(t,r,n),s=`
      value = max(x_val, value);
    `,o="",l=D("x",t.dataType,t.dims.length),u=["rank"],[c,p,f,g,y]=ba(a,i);return c.push(...ne(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${f};${g};${y}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:_=>ya(_,l,t.dims.length,a.length,i,s,o,t.dataType===10?-65504:-1e5,p,f,g,y)}},vg=(e,t)=>{Vn(e.inputs),e.compute($a("MaxPool",e.inputs[0],!1,t))},$g=e=>{let t=e.storage_order,n=e.dilations,r=_a(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:n,...r,cacheKey:""};return{...i,cacheKey:Jc(i)}},Sg=e=>{let t=e.format;return{format:t,...va,cacheKey:t}},kg=(e,t)=>{Vn(e.inputs),e.compute($a("GlobalMaxPool",e.inputs[0],!0,t))}}),ep,tp,Tg,Cg,X_=q(()=>{ae(),le(),Ae(),ue(),ep=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},tp=(e,t)=>{let n=R.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,s=e[1].dataType,o=R.size(a),l=r===3||r===2,u=l?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,p=e.length>2?e[2]:void 0,f=p?l?[Math.ceil(R.size(p.dims)/4)]:p.dims:void 0,g=c.length===0||c.length===1&&c[0]===1,y=g===!1&&c.length===1,_=ze(o),T=g&&(!l||_===4),v=T?_:1,x=T&&!l?_:1,C=D("input",l?12:r,u.length,x),k=D("scale",s,c.length),I=p?D("zero_point",l?12:r,f.length):void 0,M=J("output",s,a.length,v),A=[C,k];I&&A.push(I);let $=[u,c];p&&$.push(f);let O=[{type:12,data:o/v},{type:12,data:n},{type:12,data:t.blockSize},...ne(...$,a)],U=H=>{let F=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
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
          ${g?`let scale_value= ${k.getByOffset("0")}`:y?`
            let scale_index = ${M.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?g?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:y?l?`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":C.type.value}(0);`};
      // Compute and write output
      ${M.setByOffset("global_idx",`${M.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:U,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/v/64),y:1,z:1},programUniforms:O})}},Tg=(e,t)=>{ep(e.inputs,t),e.compute(tp(e.inputs,t))},Cg=e=>ve({axis:e.axis,blockSize:e.blockSize})}),np,rp,Ig,Y_=q(()=>{at(),ae(),ue(),np=(e,t,n)=>{let r=e===t,i=e<t&&n<0,a=e>t&&n>0;if(r||i||a)throw new Error("Range these inputs' contents are invalid.")},rp=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],s=i,o=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...ne(a)],l=u=>{let c=J("output",r,a.length),p=c.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${u.registerUniforms(f).declareVariables(c)}
        ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},Ig=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Se.webgpu.validateInputContent&&np(t,n,r),e.compute(rp(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),ip,ap,Eg,zg,Z_=q(()=>{ae(),le(),Ae(),ue(),ip=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
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
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},ap=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=1,s=Math.ceil(R.sizeToDimension(r,r.length-1)/a),o=r[r.length-1],l=R.sizeFromDimension(n,o),u=[{type:12,data:s},{type:12,data:o},{type:12,data:l},...ne(e[1].dims,e[2].dims,i)],c=p=>{let f=D("indices",e[1].dataType,e[1].dims.length),g=D("updates",e[2].dataType,e[2].dims.length,a),y=t.reduction!=="none"&&t.reduction!==""?rf("output",e[0].dataType,i.length):J("output",e[0].dataType,i.length,a);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,g,y)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${ip(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:c}},Eg=e=>ve({reduction:e.reduction}),zg=(e,t)=>{e.compute(ap(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),sp,op,lp,Sa,up,dp,cp,pp,hp,fp,mp,gp,ka,bp,yp,wp,_p,xp,Mg,Ag,Q_=q(()=>{ae(),le(),Ae(),ue(),sp=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},op=(e,t,n)=>{t.every(i=>i>=0&&i<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((i,a)=>r[i]=e[a]),r},lp=(e,t,n,r,i,a)=>{let[s,o,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],u=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>r.push(c)),r.length!==0&&r.length!==u&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");sp(r,t),t.axes.length>0&&op(r,t.axes,u).forEach((c,p)=>r[p]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>i.push(Number(c))),i.length!==0&&i.length!==u&&n>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof i<"u"&&r.length>0&&i.length>u)throw new Error("Resize requires only of scales or sizes to be specified")},Sa=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,up=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Sa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Sa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",dp=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",cp=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=i[s],r[s+n]=i[t.length+s]}),r):i},pp=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>i.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>i[a]=n[s])}else n.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,s)=>Math.round(a*t[s]))}return i},hp=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),i.forEach((a,s)=>i[s]=Math.round(a*t[s]))),i},fp=(e,t,n,r,i)=>`
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
    }`,mp=(e,t,n,r,i,a,s)=>`
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
    }`,gp=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ee("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ka=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",bp=(e,t,n,r,i)=>{let[a,s,o,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${n[o]} - 1))`)};
      ${ka(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${u} = originalIndices[${s}];
      var col:${u} = originalIndices[${o}];
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
      var x11: ${u} = getInputValue(batch, channel, row1, col1);
      var x12: ${u} = getInputValue(batch, channel, row1, col2);
      var x21: ${u} = getInputValue(batch, channel, row2, col1);
      var x22: ${u} = getInputValue(batch, channel, row2, col2);
      var dx1: ${u} = abs(row - ${u}(row1));
      var dx2: ${u} = abs(${u}(row2) - row);
      var dy1: ${u} = abs(col - ${u}(col1));
      var dy2: ${u} = abs(${u}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},yp=(e,t,n,r,i,a,s,o,l,u)=>{let c=n.length===2,[p,f]=c?[0,1]:[2,3],g=e.type.value,y=_=>{let T=_===p?"row":"col";return`
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
            ${u?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${T} = max(0, min(${T}, ${n[_]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",_,`u32(${T})`)};
          data[i + 1] = ${_===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${y(p)};
    ${y(f)};
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
    `},wp=(e,t,n,r,i)=>{let[a,s,o,l,u]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${ka(e,u,a,3)}
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
      var channel: u32 = ${n.length>3?`u32(originalIndices[${u}])`:"0"};
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
    }`},_p=(e,t,n,r,i,a)=>{let s=e.dims,o=cp(a,t.axes,s.length),l=pp(s,r,i,t.axes),u=r.slice();r.length===0&&(u=s.map((x,C)=>x===0?1:l[C]/x),t.keepAspectRatioPolicy!=="stretch"&&(l=hp(s,u,t)));let c=J("output",e.dataType,l.length),p=D("input",e.dataType,s.length),f=R.size(l),g=s.length===l.length&&s.every((x,C)=>x===l[C]),y=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,T=p.type.value,v=x=>`
      ${g?"":`
      ${up(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${gp(p,s)};
              ${dp(t.nearestMode,n,T)};
              ${mp(p,c,s,l,u.length,o.length,y)};
              `;case"linear":return`
              ${fp(c,s,l,u.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${bp(p,c,s,y,_)}`;if(s.length===3||s.length===5)return`${wp(p,c,s,y,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${yp(p,c,s,l,u,o,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",o.length).declareVariables(p,c)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${u.length>0?t.mode==="cubic"?u:u.length:""}|${i.length>0?i:""}|${o.length>0?o:""}|${g}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:u},{type:1,data:o},...ne(s,l)]})}},xp=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Mg=(e,t)=>{let n=[],r=[],i=[],a=xp(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");lp(e.inputs,t,a,n,r,i),e.compute(_p(e.inputs[0],t,a,n,r,i),{inputs:[0]})},Ag=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,u=e.nearestMode===""?"simple":e.nearestMode;return ve({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:o,mode:l,nearestMode:u})}}),vp,$p,Ng,J_=q(()=>{ae(),le(),ue(),vp=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},$p=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,s=R.size(a),o=a,l=s,u=a.slice(-1)[0],c=r?a.slice(0,-1).concat(1):[],p=!i&&e.length>3,f=e.length>4,g=r&&n>1,y=r&&n>2,_=n>3,T=64,v=ze(u),x=[{type:12,data:l},{type:12,data:v},{type:12,data:u},{type:1,data:t.epsilon}],C=I=>{let M=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[D("x",e[0].dataType,e[0].dims,v),D("skip",e[1].dataType,e[1].dims,v),D("gamma",e[2].dataType,e[2].dims,v)];p&&A.push(D("beta",e[3].dataType,e[3].dims,v)),f&&A.push(D("bias",e[4].dataType,e[4].dims,v)),A.push(J("output",e[0].dataType,o,v)),g&&A.push(J("mean_output",1,c)),y&&A.push(J("inv_std_output",1,c)),_&&A.push(J("input_skip_bias_sum",e[0].dataType,o,v));let $=Re(e[0].dataType),O=Re(1,v);return`

      ${I.registerUniforms(M).declareVariables(...A)}
      var<workgroup> sum_shared : array<${O}, ${T}>;
      var<workgroup> sum_squared_shared : array<${O}, ${T}>;

      ${I.mainStart([T,1,1])}
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
          let f32_value = ${$n($,v,"value")};
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
        let mean = ${Vt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Vt("square_sum",v)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:o,dataType:e[0].dataType}];return n>1&&k.push({dims:c,dataType:1}),n>2&&k.push({dims:c,dataType:1}),n>3&&k.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${y};${_}`,inputDependencies:e.map((I,M)=>"type")},getShaderSource:C,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(l/u)},programUniforms:x})}},Ng=(e,t)=>{vp(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute($p(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Sp,Hn,kp,Ta,Tp,Cp,Pg,Rg,e1=q(()=>{ae(),le(),Ae(),ue(),Sp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},Hn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},kp=(e,t)=>{if(e.length>1){let n=Hn(e,1),r=Hn(e,2),i=Hn(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),ve({starts:n,ends:r,axes:i})}else return t},Ta=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Tp=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,Cp=(e,t)=>{let n=e[0].dims,r=R.size(n),i=t.axes.length>0?R.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=Hn(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let s=t.starts.map((v,x)=>Ta(v,x,n,i,a)),o=t.ends.map((v,x)=>Ta(v,x,n,i,a));if(i.length!==s.length||i.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==n.length)for(let v=0;v<n.length;++v)i.includes(v)||(s.splice(v,0,0),o.splice(v,0,n[v]),a.splice(v,0,1));let l=a.map(v=>Math.sign(v));a.forEach((v,x,C)=>{if(v<0){let k=(o[x]-s[x])/v,I=s[x],M=I+k*a[x];s[x]=M,o[x]=I,C[x]=-v}});let u=n.slice(0);i.forEach((v,x)=>{u[v]=Math.ceil((o[v]-s[v])/a[v])});let c={dims:u,dataType:e[0].dataType},p=J("output",e[0].dataType,u.length),f=D("input",e[0].dataType,e[0].dims.length),g=R.size(u),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],_=[{type:12,data:g},{type:12,data:s},{type:6,data:l},{type:12,data:a},...ne(e[0].dims,u)],T=v=>`
      ${v.registerUniforms(y).declareVariables(f,p)}
        ${Tp(f,p,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:_})}},Pg=(e,t)=>{Sp(e.inputs,t);let n=kp(e.inputs,t);e.compute(Cp(e.inputs,n),{inputs:[0]})},Rg=e=>{let t=e.starts,n=e.ends,r=e.axes;return ve({starts:t,ends:n,axes:r})}}),Ip,Ep,Og,Bg,t1=q(()=>{ae(),le(),Ae(),Gt(),ue(),Ip=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Ep=(e,t)=>{let n=e.inputs[0],r=n.dims,i=R.size(r),a=r.length,s=R.normalizeAxis(t.axis,a),o=s<r.length-1,l,u=[];o?(u=Array.from({length:a},(A,$)=>$),u[s]=a-1,u[a-1]=s,l=e.compute(nt(n,u),{inputs:[n],outputs:[-1]})[0]):l=n;let c=l.dims,p=c[a-1],f=i/p,g=ze(p),y=p/g,_=64;f===1&&(_=256);let T=(A,$)=>$===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:$===2?`max(${A}.x, ${A}.y)`:$===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,v=D("x",l.dataType,l.dims,g),x=J("result",l.dataType,l.dims,g),C=v.type.value,k=Re(l.dataType)==="f32"?`var threadMax = ${C}(-3.4028234663852886e+38f);`:`var threadMax = ${C}(-65504.0h);`,I=A=>`
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
          rowSumShared = ${C}(${Vt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${C}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,M=e.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:y}]}),getShaderSource:I},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute(nt(M,u),{inputs:[M]})},Og=(e,t)=>{Ip(e.inputs),Ep(e,t)},Bg=e=>ve({axis:e.axis})}),Ca,zp,Mp,Ap,Dg,n1=q(()=>{ae(),le(),ue(),Ca=e=>Array.from(e.getBigInt64Array(),Number),zp=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ca(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Mp=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Ap=(e,t)=>{let n=e[0].dims,r=t??Ca(e[1]),i=Mp(n,r),a=R.size(i),s=e[0].dataType,o=D("input",s,n.length),l=J("output",s,i.length),u=c=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ne(e[0].dims,i)]}),getShaderSource:u}},Dg=e=>{zp(e.inputs),e.compute(Ap(e.inputs),{inputs:[0]})}}),Np,Pp,Ug,r1=q(()=>{ae(),le(),ue(),Np=(e,t,n,r,i)=>{let a=J("output_data",i,n.length,4),s=D("a_data",t[1].dataType,t[1].dims.length,4),o=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),u,c=(p,f,g)=>`select(${f}, ${p}, ${g})`;if(!r)u=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let p=(f,g,y="")=>{let _=`a_data[index_a${g}][component_a${g}]`,T=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
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
            ${f}[${g}] = ${y}(${c(_,T,v)});
          `};i===9?u=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:u=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,o,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${u}
      }`},Pp=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(R.areEqual(t,n)&&R.areEqual(n,r)),s=t,o=R.size(t);if(a){let u=kn.calcShape(kn.calcShape(t,n,!1),r,!1);if(!u)throw new Error("Can't perform where op on the given tensors");s=u,o=R.size(s)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:u=>Np(u,e,s,a,i),getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...ne(r,t,n,s)]})}},Ug=e=>{e.compute(Pp(e.inputs))}}),Lg,i1=q(()=>{y_(),Ps(),w_(),__(),x_(),v_(),$_(),I_(),z_(),M_(),A_(),N_(),P_(),R_(),O_(),B_(),D_(),U_(),L_(),F_(),W_(),q_(),V_(),H_(),G_(),ag(),j_(),K_(),X_(),Y_(),Z_(),Ns(),Q_(),dg(),J_(),e1(),t1(),lg(),n1(),Gt(),Rs(),r1(),Lg=new Map([["Abs",[Nf]],["Acos",[Pf]],["Acosh",[Rf]],["Add",[mm]],["ArgMax",[Ef,Ja]],["ArgMin",[If,Ja]],["Asin",[Of]],["Asinh",[Bf]],["Atan",[Df]],["Atanh",[Uf]],["Attention",[zf]],["AveragePool",[wg,yg]],["BatchNormalization",[Mf]],["BiasAdd",[Af]],["BiasSplitGelu",[fm]],["Cast",[Ff,Lf]],["Ceil",[qf]],["Clip",[Wf]],["Concat",[km,Tm]],["Conv",[as,is]],["ConvTranspose",[Om,Rm]],["Cos",[Vf]],["Cosh",[Hf]],["CumSum",[Bm,Dm]],["DepthToSpace",[Um,Lm]],["DequantizeLinear",[Tg,Cg]],["Div",[gm]],["Einsum",[Fm,Wm]],["Elu",[Gf,Qn]],["Equal",[bm]],["Erf",[jf]],["Exp",[Kf]],["Expand",[qm]],["FastGelu",[Vm]],["Floor",[Xf]],["FusedConv",[as,is]],["Gather",[Gm,Hm]],["GatherElements",[Qm,Zm]],["GatherBlockQuantized",[Xm,Ym]],["GatherND",[jm,Km]],["Gelu",[Yf]],["Gemm",[eg,Jm]],["GlobalAveragePool",[xg,_g]],["GlobalMaxPool",[kg,Sg]],["Greater",[xm]],["GreaterOrEqual",[$m]],["GridSample",[tg,ng]],["GroupQueryAttention",[cg]],["HardSigmoid",[im,rm]],["InstanceNormalization",[pg]],["LayerNormalization",[hg]],["LeakyRelu",[Zf,Qn]],["Less",[vm]],["LessOrEqual",[Sm]],["Log",[pm]],["MatMul",[fg]],["MatMulNBits",[mg,gg]],["MaxPool",[vg,$g]],["Mul",[ym]],["MultiHeadAttention",[ig,rg]],["Neg",[Jf]],["Not",[Qf]],["Pad",[bg]],["Pow",[wm]],["QuickGelu",[hm,Qn]],["Range",[Ig]],["Reciprocal",[em]],["ReduceMin",[$f]],["ReduceMean",[yf]],["ReduceMax",[vf]],["ReduceSum",[kf]],["ReduceProd",[Sf]],["ReduceL1",[wf]],["ReduceL2",[_f]],["ReduceLogSum",[Cf]],["ReduceLogSumExp",[xf]],["ReduceSumSquare",[Tf]],["Relu",[tm]],["Resize",[Mg,Ag]],["RotaryEmbedding",[ug]],["ScatterND",[zg,Eg]],["Sigmoid",[nm]],["Sin",[am]],["Sinh",[sm]],["Slice",[Pg,Rg]],["SkipLayerNormalization",[Ng]],["Split",[sg,og]],["Sqrt",[om]],["Softmax",[Og,Bg]],["Sub",[_m]],["Tan",[lm]],["Tanh",[um]],["ThresholdedRelu",[cm,Qn]],["Tile",[Dg]],["Transpose",[sf,of]],["Where",[Ug]]])}),Fg,a1=q(()=>{at(),Mt(),ue(),Fg=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){$t(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let u of t)o.push({binding:o.length,resource:{buffer:u.buffer}});for(let u of n)o.push({binding:o.length,resource:{buffer:u.buffer}});i&&o.push({binding:o.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let u={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(u)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),gt(e.programInfo.name)}dispose(){}build(e,t){$t(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(u=>{n.features.has(u.feature)&&r.push(`enable ${u.extension};`)});let i=af(t,this.backend.device.limits),a=e.getShaderSource(i),s=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,o=n.createShaderModule({code:s,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=n.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return gt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Wg={};In(Wg,{WebGpuBackend:()=>qg});var Rp,Op,Bp,qg,s1=q(()=>{at(),ae(),Mt(),Jh(),g_(),i1(),a1(),Rp=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${i}`);break}case"rank":{let a=e[r].dims.length;n.push(`${i};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Op=(e,t,n)=>{var i,a;let r=e.name;return(i=e.shaderCache)!=null&&i.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Rp(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,r},Bp=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},qg=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>t.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new Bp(t.info||await t.requestAdapterInfo()),this.gpuDataManager=nf(this),this.programManager=new Fg(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Es(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$t(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var r;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=n[i],s=a.kernelId,o=this.kernels.get(s),l=o.kernelType,u=o.kernelName,c=a.programName,p=a.inputTensorViews,f=a.outputTensorViews,g=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),T=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if((r=this.env.webgpu.profiling)!=null&&r.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(v=>({dims:v.dims,dataType:It(v.dataType)})),outputsMetadata:f.map(v=>({dims:v.dims,dataType:It(v.dataType)})),kernelId:s,kernelType:l,kernelName:u,programName:c,startTime:_,endTime:T});else{let v="";p.forEach((C,k)=>{v+=`input[${k}]: [${C.dims}] | ${It(C.dataType)}, `});let x="";f.forEach((C,k)=>{x+=`output[${k}]: [${C.dims}] | ${It(C.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${u}|${c}" ${v}${x}start time: ${_} ns, execution time: ${T-_} ns`)}qr("GPU",`${c}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),gt()}run(e,t,n,r,i,a){$t(e.name);let s=[];for(let x=0;x<t.length;++x){let C=t[x].data;if(C===0)continue;let k=this.gpuDataManager.get(C);if(!k)throw new Error(`no GPU data for input: ${C}`);s.push(k)}let{outputs:o,dispatchGroup:l,programUniforms:u}=e.getRunData(t),c=n.length===0?o.map((x,C)=>C):n;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let p=[],f=[];for(let x=0;x<o.length;++x){if(!Number.isInteger(c[x])||c[x]<-3||c[x]>=a)throw new Error(`Invalid output index: ${c[x]}`);if(c[x]===-3)continue;let C=c[x]===-1,k=c[x]===-2,I=C||k?i(o[x].dataType,o[x].dims):r(c[x],o[x].dataType,o[x].dims);if(p.push(I),I.data===0)continue;let M=this.gpuDataManager.get(I.data);if(!M)throw new Error(`no GPU data for output: ${I.data}`);if(C&&this.temporaryData.push(M),k){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(M)}f.push(M)}if(s.length!==t.length||f.length!==p.length){if(f.length===0)return gt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(u){let x=0,C=[];u.forEach(A=>{let $=typeof A.data=="number"?[A.data]:A.data;if($.length===0)return;let O=A.type===10?2:4,U,H;A.type===10?(H=$.length>4?16:$.length>2?8:$.length*O,U=$.length>4?16:O*$.length):(H=$.length<=2?$.length*O:16,U=16),x=Math.ceil(x/H)*H,C.push(x);let F=A.type===10?8:4;x+=$.length>4?Math.ceil($.length/F)*U:$.length*O});let k=16;x=Math.ceil(x/k)*k;let I=new ArrayBuffer(x);u.forEach((A,$)=>{let O=C[$],U=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(I,O,U.length).set(U);else if(A.type===12)new Uint32Array(I,O,U.length).set(U);else if(A.type===10)new Uint16Array(I,O,U.length).set(U);else if(A.type===1)new Float32Array(I,O,U.length).set(U);else throw new Error(`Unsupported uniform type: ${It(A.type)}`)});let M=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(M.buffer,0,I,0,x),this.gpuDataManager.release(M.id),g={offset:0,size:x,buffer:M.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),_=y[1]===1&&y[2]===1,T=Op(e,t,_),v=this.programManager.getArtifact(T);if(v||(v=this.programManager.build(e,y),this.programManager.setArtifact(T,v),ye("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),u&&v.uniformVariablesInfo){if(u.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${u.length} in program "${v.programInfo.name}".`);for(let x=0;x<u.length;x++){let C=u[x],k=C.type,I=typeof C.data=="number"?1:C.data.length,[M,A]=v.uniformVariablesInfo[x];if(k!==M||I!==A)throw new Error(`Uniform variable ${x} mismatch: expect type ${M} with size ${A}, got type ${k} with size ${I} in program "${v.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(v,s,f,y,g),gt(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=Lg.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,s=r.kernelEntry,o=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(u){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${u}`)),1}finally{l&&n.push(this.device.popErrorScope().then(u=>u?`GPU validation error for kernel "[${i}] ${a}": ${u.message}`:null));for(let u of this.temporaryData)this.gpuDataManager.release(u.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),s=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[s,n]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await Ya(this,e,t);return zs(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Vg={};In(Vg,{init:()=>Hg});var Ar,Dp,Hg,o1=q(()=>{ae(),Mt(),le(),m_(),Ar=class Gg{constructor(t,n,r,i){this.module=t,this.dataType=n,this.data=r,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new Gg(this.module,this.dataType,this.data,t)}},Dp=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*i++,a));let s=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,"*")),this.customDataSize=Number(e.getValue(r*i++,a));let o=[];for(let l=0;l<s;l++){let u=Number(e.getValue(r*i++,a)),c=Number(e.getValue(r*i++,"*")),p=Number(e.getValue(r*i++,a)),f=[];for(let g=0;g<p;g++)f.push(Number(e.getValue(r*i++,a)));o.push(new Ar(e,u,c,f))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let n=((s=t==null?void 0:t.inputs)==null?void 0:s.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,r=(t==null?void 0:t.outputs)??[],i=(o,l,u)=>new Ar(this.module,l,this.output(o,u),u),a=(o,l)=>{let u=rn(o,l);if(!u)throw new Error(`Unsupported data type: ${o}`);let c=u>0?this.backend.gpuDataManager.create(u).id:0;return new Ar(this.module,o,c,l)};return this.backend.run(e,n,r,i,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=r===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let s=0;s<t.length;s++)this.module.setValue(a+r*(s+1),t[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},Hg=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(s1(),ir(Wg)).WebGpuBackend,s=new a;await s.initialize(n,r),i("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,l,u,c=!1)=>{if(c)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(u)}`),s.memcpy(Number(o),Number(l));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(u)}`);let p=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(u));s.upload(Number(l),p)}},async(o,l,u)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${u}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+u)>>>0))},(o,l,u)=>s.createKernel(o,Number(l),u,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>s.releaseKernel(o),(o,l,u,c)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${o}, contextDataOffset=${l}`);let p=new Dp(t,s,Number(l));return s.computeKernel(Number(o),p,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new tf(n);i("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,o,l,u,c)=>a.ensureTensor(s,o,l,u,c),(s,o)=>{a.uploadTensor(s,o)},async(s,o)=>a.downloadTensor(s,o),(s,o)=>a.registerMLContext(s,o),!!n.trace])}}}),Up,Fs,Ws,Lt,Lp,Ia,Yr,qs,Vs,Ea,Hs,Gs,js,jg=q(()=>{at(),p_(),h_(),ae(),mn(),ks(),Xh(),Up=(e,t)=>{Te()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},Fs=async e=>{Up(e.wasm.numThreads,Hr(e.logLevel))},Ws=async(e,t)=>{var r,i;(i=(r=Te()).asyncInit)==null||i.call(r);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:s}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(o1(),ir(Vg)).init;t==="webgpu"&&await a("webgpu",Te(),e,n),t==="webnn"&&await a("webnn",Te(),e)}},Lt=new Map,Lp=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,i,i+r)!==0&&$e("Can't get session input/output count.");let a=r===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(n)}},Ia=(e,t)=>{let n=Te(),r=n.stackSave(),i=0;try{let a=n.PTR_SIZE,s=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&$e("Can't get session input/output metadata.");let o=Number(n.getValue(s,"*"));i=Number(n.getValue(s+a,"*"));let l=n.HEAP32[i/4];if(l===0)return[o,0];let u=n.HEAPU32[i/4+1],c=[];for(let p=0;p<u;p++){let f=Number(n.getValue(i+8+p*a,"*"));c.push(f!==0?n.UTF8ToString(f):Number(n.getValue(i+8+(p+u)*a,"*")))}return[o,l,c]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},Yr=e=>{let t=Te(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},qs=async(e,t)=>{var p,f,g,y;let n,r,i=Te();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Yr(e);let a=0,s=0,o=0,l=[],u=[],c=[];try{if([s,l]=await Kh(t),(t==null?void 0:t.externalData)&&i.mountExternalData){let $=[];for(let O of t.externalData){let U=typeof O=="string"?O:O.path;$.push(Is(typeof O=="string"?O:O.data).then(H=>{i.mountExternalData(U,H)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof $!="string"){let O=$,U=O==null?void 0:O.context,H=O==null?void 0:O.gpuDevice,F=O==null?void 0:O.deviceType,K=O==null?void 0:O.powerPreference;U?i.currentContext=U:H?i.currentContext=await i.webnnCreateMLContext(H):i.currentContext=await i.webnnCreateMLContext({deviceType:F,powerPreference:K})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,s),(p=i.webgpuOnCreateSession)==null||p.call(i,a),a===0&&$e("Can't create a session."),(f=i.jsepOnCreateSession)==null||f.call(i),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[_,T]=Lp(a),v=!!(t!=null&&t.enableGraphCapture),x=[],C=[],k=[],I=[],M=[];for(let $=0;$<_;$++){let[O,U,H]=Ia(a,$);O===0&&$e("Can't get an input name."),u.push(O);let F=i.UTF8ToString(O);x.push(F),k.push(U===0?{name:F,isTensor:!1}:{name:F,isTensor:!0,type:It(U),shape:H})}for(let $=0;$<T;$++){let[O,U,H]=Ia(a,$+_);O===0&&$e("Can't get an output name."),c.push(O);let F=i.UTF8ToString(O);C.push(F),I.push(U===0?{name:F,isTensor:!1}:{name:F,isTensor:!0,type:It(U),shape:H});{if(v&&(t==null?void 0:t.preferredOutputLocation)===void 0){M.push("gpu-buffer");continue}let K=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((g=t==null?void 0:t.preferredOutputLocation)==null?void 0:g[F])??"cpu",P=i.webnnIsGraphOutput;if(K==="cpu"&&P&&P(a,F)){M.push("ml-tensor-cpu-output");continue}if(K!=="cpu"&&K!=="cpu-pinned"&&K!=="gpu-buffer"&&K!=="ml-tensor")throw new Error(`Not supported preferred output location: ${K}.`);if(v&&K!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${K}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);M.push(K)}}let A=null;return M.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(o=i._OrtCreateBinding(a),o===0&&$e("Can't create IO binding."),A={handle:o,outputPreferredLocations:M,outputPreferredLocationsEncoded:M.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>Ka($))}),Lt.set(a,[a,u,c,A,v,!1]),[a,x,C,k,I]}catch(_){throw u.forEach(T=>i._OrtFree(T)),c.forEach(T=>i._OrtFree(T)),o!==0&&i._OrtReleaseBinding(o)!==0&&$e("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&$e("Can't release session."),_}finally{i._free(n),s!==0&&i._OrtReleaseSessionOptions(s)!==0&&$e("Can't release session options."),l.forEach(_=>i._free(_)),(y=i.unmountExternalData)==null||y.call(i)}},Vs=e=>{var l,u,c;let t=Te(),n=Lt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,s,o]=n;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&$e("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&$e("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(u=t.webnnOnReleaseSession)==null||u.call(t,e),(c=t.webgpuOnReleaseSession)==null||c.call(t,e),i.forEach(p=>t._OrtFree(p)),a.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(r)!==0&&$e("Can't release session."),Lt.delete(e)},Ea=async(e,t,n,r,i,a,s=!1)=>{if(!e){t.push(0);return}let o=Te(),l=o.PTR_SIZE,u=e[0],c=e[1],p=e[3],f=p,g,y;if(u==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let v=e[2].gpuBuffer;y=rn(nn(u),c);{let x=o.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=x(r,a,v,y)}}else if(p==="ml-tensor"){let v=e[2].mlTensor;y=rn(nn(u),c);let x=o.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=x(r,v,nn(u),c)}else{let v=e[2];if(Array.isArray(v)){y=l*v.length,g=o._malloc(y),n.push(g);for(let x=0;x<v.length;x++){if(typeof v[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);o.setValue(g+x*l,ht(v[x],n),"*")}}else{let x=o.webnnIsGraphInput,C=o.webnnIsGraphOutput;if(u!=="string"&&x&&C){let k=o.UTF8ToString(i);if(x(r,k)||C(r,k)){let I=nn(u);y=rn(I,c),f="ml-tensor";let M=o.webnnCreateTemporaryTensor,A=o.webnnUploadTensor;if(!M||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await M(r,I,c);A($,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),g=$}else y=v.byteLength,g=o._malloc(y),n.push(g),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),g)}else y=v.byteLength,g=o._malloc(y),n.push(g),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),g)}}let _=o.stackSave(),T=o.stackAlloc(4*c.length);try{c.forEach((x,C)=>o.setValue(T+C*l,x,l===4?"i32":"i64"));let v=o._OrtCreateTensor(nn(u),g,y,T,c.length,Ka(f));v===0&&$e(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(v)}finally{o.stackRestore(_)}},Hs=async(e,t,n,r,i,a)=>{var F,K,P,Z;let s=Te(),o=s.PTR_SIZE,l=Lt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let u=l[0],c=l[1],p=l[2],f=l[3],g=l[4],y=l[5],_=t.length,T=r.length,v=0,x=[],C=[],k=[],I=[],M=[],A=s.stackSave(),$=s.stackAlloc(_*o),O=s.stackAlloc(_*o),U=s.stackAlloc(T*o),H=s.stackAlloc(T*o);try{[v,x]=jh(a),ln("wasm prepareInputOutputTensor");for(let W=0;W<_;W++)await Ea(n[W],C,I,e,c[t[W]],t[W],g);for(let W=0;W<T;W++)await Ea(i[W],k,I,e,p[r[W]],_+r[W],g);un("wasm prepareInputOutputTensor");for(let W=0;W<_;W++)s.setValue($+W*o,C[W],"*"),s.setValue(O+W*o,c[t[W]],"*");for(let W=0;W<T;W++)s.setValue(U+W*o,k[W],"*"),s.setValue(H+W*o,p[r[W]],"*");if(f&&!y){let{handle:W,outputPreferredLocations:re,outputPreferredLocationsEncoded:L}=f;if(c.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${c.length}).`);ln("wasm bindInputsOutputs");for(let G=0;G<_;G++){let X=t[G];await s._OrtBindInput(W,c[X],C[G])!==0&&$e(`Can't bind input[${G}] for session=${e}.`)}for(let G=0;G<T;G++){let X=r[G];(F=i[G])!=null&&F[3]?(M.push(k[G]),s._OrtBindOutput(W,p[X],k[G],0)!==0&&$e(`Can't bind pre-allocated output[${G}] for session=${e}.`)):s._OrtBindOutput(W,p[X],0,L[X])!==0&&$e(`Can't bind output[${G}] to ${re[G]} for session=${e}.`)}un("wasm bindInputsOutputs"),Lt.set(e,[u,c,p,f,g,!0])}(K=s.jsepOnRunStart)==null||K.call(s,u),(P=s.webnnOnRunStart)==null||P.call(s,u);let Q;f?Q=await s._OrtRunWithBinding(u,f.handle,T,U,v):Q=await s._OrtRun(u,O,$,_,H,T,U,v),Q!==0&&$e("failed to call OrtRun().");let te=[],ie=[];ln("wasm ProcessOutputTensor");for(let W=0;W<T;W++){let re=Number(s.getValue(U+W*o,"*"));if(re===k[W]||M.includes(k[W])){te.push(i[W]),re!==k[W]&&s._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.");continue}let L=s.stackSave(),G=s.stackAlloc(4*o),X=!1,V,_e=0;try{s._OrtGetTensorData(re,G,G+o,G+2*o,G+3*o)!==0&&$e(`Can't access output tensor data on index ${W}.`);let Ve=o===4?"i32":"i64",Ee=Number(s.getValue(G,Ve));_e=s.getValue(G+o,"*");let Be=s.getValue(G+o*2,"*"),je=Number(s.getValue(G+o*3,Ve)),Ye=[];for(let Ce=0;Ce<je;Ce++)Ye.push(Number(s.getValue(Be+Ce*o,Ve)));s._OrtFree(Be)!==0&&$e("Can't free memory for tensor dims.");let Ke=Ye.reduce((Ce,se)=>Ce*se,1);V=It(Ee);let Nt=f==null?void 0:f.outputPreferredLocations[r[W]];if(V==="string"){if(Nt==="gpu-buffer"||Nt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let se=0;se<Ke;se++){let Ze=s.getValue(_e+se*o,"*"),lr=s.getValue(_e+(se+1)*o,"*"),Nn=se===Ke-1?void 0:lr-Ze;Ce.push(s.UTF8ToString(Ze,Nn))}te.push([V,Ye,Ce,"cpu"])}else if(Nt==="gpu-buffer"&&Ke>0){let Ce=s.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let se=Ce(_e),Ze=rn(Ee,Ke);if(Ze===void 0||!Ts(V))throw new Error(`Unsupported data type: ${V}`);X=!0,te.push([V,Ye,{gpuBuffer:se,download:s.jsepCreateDownloader(se,Ze,V),dispose:()=>{s._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(Nt==="ml-tensor"&&Ke>0){let Ce=s.webnnEnsureTensor,se=s.webnnIsGraphInputOutputTypeSupported;if(!Ce||!se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(rn(Ee,Ke)===void 0||!Cs(V))throw new Error(`Unsupported data type: ${V}`);if(!se(e,V,!1))throw new Error(`preferredLocation "ml-tensor" for ${V} output is not supported by current WebNN Context.`);let Ze=await Ce(e,_e,Ee,Ye,!1);X=!0,te.push([V,Ye,{mlTensor:Ze,download:s.webnnCreateMLTensorDownloader(_e,V),dispose:()=>{s.webnnReleaseTensorId(_e),s._OrtReleaseTensor(re)}},"ml-tensor"])}else if(Nt==="ml-tensor-cpu-output"&&Ke>0){let Ce=s.webnnCreateMLTensorDownloader(_e,V)(),se=te.length;X=!0,ie.push((async()=>{let Ze=[se,await Ce];return s.webnnReleaseTensorId(_e),s._OrtReleaseTensor(re),Ze})()),te.push([V,Ye,[],"cpu"])}else{let Ce=si(V),se=new Ce(Ke);new Uint8Array(se.buffer,se.byteOffset,se.byteLength).set(s.HEAPU8.subarray(_e,_e+se.byteLength)),te.push([V,Ye,se,"cpu"])}}finally{s.stackRestore(L),V==="string"&&_e&&s._free(_e),X||s._OrtReleaseTensor(re)}}f&&!g&&(s._OrtClearBoundOutputs(f.handle)!==0&&$e("Can't clear bound outputs."),Lt.set(e,[u,c,p,f,g,!1]));for(let[W,re]of await Promise.all(ie))te[W][2]=re;return un("wasm ProcessOutputTensor"),te}finally{(Z=s.webnnOnRunEnd)==null||Z.call(s,u),s.stackRestore(A),C.forEach(Q=>s._OrtReleaseTensor(Q)),k.forEach(Q=>s._OrtReleaseTensor(Q)),I.forEach(Q=>s._free(Q)),v!==0&&s._OrtReleaseRunOptions(v),x.forEach(Q=>s._free(Q))}},Gs=e=>{let t=Te(),n=Lt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],i=t._OrtEndProfiling(r);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},js=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),Ft,Xe,xn,Gn,jn,Nr,za,Pr,Jt,en,Fp,Kg,Xg,Yg,Zg,Qg,Jg,e0,t0=q(()=>{at(),jg(),mn(),$s(),Ft=()=>!!Se.wasm.proxy&&typeof document<"u",xn=!1,Gn=!1,jn=!1,Pr=new Map,Jt=(e,t)=>{let n=Pr.get(e);n?n.push(t):Pr.set(e,[t])},en=()=>{if(xn||!Gn||jn||!Xe)throw new Error("worker not ready")},Fp=e=>{switch(e.data.type){case"init-wasm":xn=!1,e.data.err?(jn=!0,za[1](e.data.err)):(Gn=!0,za[0]()),Nr&&(URL.revokeObjectURL(Nr),Nr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Pr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Kg=async()=>{if(!Gn){if(xn)throw new Error("multiple calls to 'initWasm()' detected.");if(jn)throw new Error("previous call to 'initWasm()' failed.");if(xn=!0,Ft())return new Promise((e,t)=>{Xe==null||Xe.terminate(),Hh().then(([n,r])=>{try{Xe=r,Xe.onerror=a=>t(a),Xe.onmessage=Fp,za=[e,t];let i={type:"init-wasm",in:Se};!i.in.wasm.wasmPaths&&(n||ja)&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href}),Xe.postMessage(i),Nr=n}catch(i){t(i)}},t)});try{await Ss(Se.wasm),await Fs(Se),Gn=!0}catch(e){throw jn=!0,e}finally{xn=!1}}},Xg=async e=>{if(Ft())return en(),new Promise((t,n)=>{Jt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:Se}};Xe.postMessage(r)});await Ws(Se,e)},Yg=async e=>Ft()?(en(),new Promise((t,n)=>{Jt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Xe.postMessage(r,[e.buffer])})):Yr(e),Zg=async(e,t)=>{if(Ft()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return en(),new Promise((n,r)=>{Jt("create",[n,r]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Xe.postMessage(i,a)})}else return qs(e,t)},Qg=async e=>{if(Ft())return en(),new Promise((t,n)=>{Jt("release",[t,n]);let r={type:"release",in:e};Xe.postMessage(r)});Vs(e)},Jg=async(e,t,n,r,i,a)=>{if(Ft()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return en(),new Promise((s,o)=>{Jt("run",[s,o]);let l=n,u={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};Xe.postMessage(u,js(l))})}else return Hs(e,t,n,r,i,a)},e0=async e=>{if(Ft())return en(),new Promise((t,n)=>{Jt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Xe.postMessage(r)});Gs(e)}}),Ma,Wp,n0,l1=q(()=>{at(),t0(),ae(),vs(),Xh(),Ma=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Wp=e=>{switch(e[3]){case"cpu":return new ft(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ts(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return ft.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case"ml-tensor":{let t=e[0];if(!Cs(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return ft.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},n0=class{async fetchModelAndCopyToWasmMemory(e){return Yg(await Is(e))}async loadModel(e,t){$t();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Zg(n,t),gt()}async dispose(){return Qg(this.sessionId)}async run(e,t,n){$t();let r=[],i=[];Object.entries(e).forEach(p=>{let f=p[0],g=p[1],y=this.inputNames.indexOf(f);if(y===-1)throw new Error(`invalid input '${f}'`);r.push(g),i.push(y)});let a=[],s=[];Object.entries(t).forEach(p=>{let f=p[0],g=p[1],y=this.outputNames.indexOf(f);if(y===-1)throw new Error(`invalid output '${f}'`);a.push(g),s.push(y)});let o=r.map((p,f)=>Ma(p,()=>`input "${this.inputNames[i[f]]}"`)),l=a.map((p,f)=>p?Ma(p,()=>`output "${this.outputNames[s[f]]}"`):null),u=await Jg(this.sessionId,i,o,s,l,n),c={};for(let p=0;p<u.length;p++)c[this.outputNames[s[p]]]=a[p]??Wp(u[p]);return gt(),c}startProfiling(){}endProfiling(){e0(this.sessionId)}}}),r0={};In(r0,{OnnxruntimeWebAssemblyBackend:()=>ls,initializeFlags:()=>os,wasmBackend:()=>i0});var os,ls,i0,u1=q(()=>{at(),t0(),l1(),os=()=>{(typeof Se.wasm.initTimeout!="number"||Se.wasm.initTimeout<0)&&(Se.wasm.initTimeout=0);let e=Se.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Se.wasm.simd=!1),typeof Se.wasm.proxy!="boolean"&&(Se.wasm.proxy=!1),typeof Se.wasm.trace!="boolean"&&(Se.wasm.trace=!1),typeof Se.wasm.numThreads!="number"||!Number.isInteger(Se.wasm.numThreads)||Se.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Se.wasm.numThreads=1;else{let t=typeof navigator>"u"?Kw("node:os").cpus().length:navigator.hardwareConcurrency;Se.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},ls=class{async init(e){os(),await Kg(),await Xg(e)}async createInferenceSessionHandler(e,t){let n=new n0;return await n.loadModel(e,t),n}},i0=new ls});at();at();at();var d1="1.26.0";{let e=(u1(),ir(r0)).wasmBackend;vn("webgpu",e,5),vn("webnn",e,5),vn("cpu",e,10),vn("wasm",e,10)}Object.defineProperty(Se.versions,"web",{value:d1,enumerable:!0});/**
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
 */function st(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const an=class an{constructor(){Pe(this,"customModelPaths",new Map);Pe(this,"baseUrl","/models");Pe(this,"webnnEnabled",!1);Pe(this,"webnnDeviceType","gpu");Pe(this,"webnnPowerPreference","default");Pe(this,"webgpuEnabled",!1);Pe(this,"webgpuPowerPreference","default");Pe(this,"generalLoggingEnabled",!1);Pe(this,"performanceLoggingEnabled",!1);Pe(this,"onnxProfilingEnabled",!1);Pe(this,"sessionCacheBypass",!1);Pe(this,"modelCacheBypass",!1);this.initializeDefaultPaths()}static getInstance(){return an.instance||(an.instance=new an),an.instance}initializeDefaultPaths(){this.customModelPaths.clear()}setCustomModelPath(t,n){this.customModelPaths.set(t,n),this.generalLoggingEnabled&&console.log(`Set custom model path for ${t}: ${n}`)}getCustomModelPath(t){return this.customModelPaths.get(t)}getAllModelPaths(){return new Map(this.customModelPaths)}hasCustomPath(t){const n=this.customModelPaths.get(t);return n!==void 0&&n!==""}resetToDefaults(){this.baseUrl="/models",this.customModelPaths.clear(),this.initializeDefaultPaths(),this.generalLoggingEnabled&&console.log("Reset all model paths to defaults")}removeCustomPath(t){this.customModelPaths.has(t)&&(this.customModelPaths.delete(t),this.generalLoggingEnabled&&console.log(`Removed custom path for ${t}`))}getAvailableModels(){return["u2net","u2netp","u2net_human_seg","u2net_cloth_seg","isnet-general-use","isnet-anime","silueta","u2net_custom"]}setBaseUrl(t){this.baseUrl=t,this.generalLoggingEnabled&&console.log(`Set base URL for models: ${t}`),this.initializeDefaultPaths()}getBaseUrl(){return this.baseUrl}enableWebNN(t){this.webnnEnabled=t,this.generalLoggingEnabled&&console.log(`WebNN support ${t?"enabled":"disabled"} globally`)}setWebNNDeviceType(t){this.webnnDeviceType=t,this.generalLoggingEnabled&&console.log(`WebNN device type set to: ${t}`)}setWebNNPowerPreference(t){this.webnnPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebNN power preference set to: ${t}`)}isWebNNEnabled(){return this.webnnEnabled}getWebNNDeviceType(){return this.webnnDeviceType}getWebNNPowerPreference(){return this.webnnPowerPreference}getWebNNConfig(){return{enabled:this.webnnEnabled,deviceType:this.webnnDeviceType,powerPreference:this.webnnPowerPreference}}resetWebNNSettings(){this.webnnEnabled=!1,this.webnnDeviceType="gpu",this.webnnPowerPreference="default",this.generalLoggingEnabled&&console.log("WebNN settings reset to defaults")}enableWebGPU(t){this.webgpuEnabled=t,this.generalLoggingEnabled&&console.log(`WebGPU support ${t?"enabled":"disabled"} globally`)}setWebGPUPowerPreference(t){this.webgpuPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebGPU power preference set to: ${t}`)}isWebGPUEnabled(){return this.webgpuEnabled}getWebGPUPowerPreference(){return this.webgpuPowerPreference}getWebGPUConfig(){return{enabled:this.webgpuEnabled,powerPreference:this.webgpuPowerPreference}}resetWebGPUSettings(){this.webgpuEnabled=!1,this.webgpuPowerPreference="default",this.generalLoggingEnabled&&console.log("WebGPU settings reset to defaults")}enableGeneralLogging(t){this.generalLoggingEnabled=t,this.generalLoggingEnabled&&console.log(`General logging ${t?"enabled":"disabled"}`)}enablePerformanceLogging(t){this.performanceLoggingEnabled=t,this.performanceLoggingEnabled&&console.log(`Performance logging ${t?"enabled":"disabled"}`)}isGeneralLoggingEnabled(){return this.generalLoggingEnabled}isPerformanceLoggingEnabled(){return this.performanceLoggingEnabled}enableONNXProfiling(t){this.onnxProfilingEnabled=t,this.onnxProfilingEnabled&&console.log(`ONNX profiling ${t?"enabled":"disabled"}`)}isONNXProfilingEnabled(){return this.onnxProfilingEnabled}getLoggingConfig(){return{generalLogging:this.generalLoggingEnabled,performanceLogging:this.performanceLoggingEnabled,onnxProfiling:this.onnxProfilingEnabled}}resetLoggingSettings(){this.generalLoggingEnabled=!1,this.performanceLoggingEnabled=!1,this.onnxProfilingEnabled=!1,this.generalLoggingEnabled&&console.log("Logging settings reset to defaults")}setSessionCacheBypass(t){this.sessionCacheBypass=t,this.generalLoggingEnabled&&console.log(`Session cache bypass ${t?"enabled":"disabled"} globally`)}setModelCacheBypass(t){this.modelCacheBypass=t,this.generalLoggingEnabled&&console.log(`Model cache bypass ${t?"enabled":"disabled"} globally`)}isSessionCacheBypassEnabled(){return this.sessionCacheBypass}isModelCacheBypassEnabled(){return this.modelCacheBypass}getCacheBypassConfig(){return{sessionCacheBypass:this.sessionCacheBypass,modelCacheBypass:this.modelCacheBypass}}resetCacheBypassSettings(){this.sessionCacheBypass=!1,this.modelCacheBypass=!1,this.generalLoggingEnabled&&console.log("Cache bypass settings reset to defaults")}};Pe(an,"instance");let us=an;const Me=us.getInstance();function be(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function Ks(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function oe(...e){Me.isPerformanceLoggingEnabled()&&console.log(...e)}function Fe(...e){console.warn(...e)}function En(...e){console.error(...e)}function At(e){return function(t,n,r){const i=r.value,a=n;return r.value=async function(...s){const o=performance.now();oe(`[${a}] Starting execution...`);try{const l=await i.apply(this,s),c=performance.now()-o;return oe(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-o;throw En(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function Xs(e){return function(t,n,r){const i=r.value,a=n;return r.value=function(...s){const o=performance.now();oe(`[${a}] Starting execution...`);try{const l=i.apply(this,s),c=performance.now()-o;return oe(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-o;throw En(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function Aa(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Failed to get context for canvas");return n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",e instanceof HTMLImageElement?(t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0)):(t.width=e.width,t.height=e.height,n.putImageData(e,0,0)),t}function c1(e){const t=performance.now();return be(`[fileToImage] Converting ${e instanceof File?e.name:"blob"} (${(e.size/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Image,a=URL.createObjectURL(e);i.onload=()=>{const s=performance.now()-t;oe(`[fileToImage] Image loaded: ${s.toFixed(2)}ms (${i.naturalWidth}x${i.naturalHeight})`),URL.revokeObjectURL(a),n(i)},i.onerror=s=>{const o=performance.now()-t;En(`[fileToImage] Image load failed: ${o.toFixed(2)}ms`,s),URL.revokeObjectURL(a),r(s)},i.src=a})}function p1(e){const t=performance.now();return be(`[arrayBufferToImage] Converting buffer (${(e.byteLength/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Blob([e]),a=new Image,s=URL.createObjectURL(i);a.onload=()=>{const o=performance.now()-t;oe(`[arrayBufferToImage] Image loaded: ${o.toFixed(2)}ms (${a.naturalWidth}x${a.naturalHeight})`),URL.revokeObjectURL(s),n(a)},a.onerror=o=>{const l=performance.now()-t;En(`[arrayBufferToImage] Image load failed: ${l.toFixed(2)}ms`,o),URL.revokeObjectURL(s),r(o)},a.src=s})}function qp(e,t="image/png"){const n=performance.now();return be(`[canvasToBlob] Converting ${e.width}x${e.height} canvas to ${t}...`),new Promise((r,i)=>{e.toBlob(a=>{const s=performance.now()-n;a?(oe(`[canvasToBlob] Conversion complete: ${s.toFixed(2)}ms (${(a.size/1024).toFixed(1)}KB)`),r(a)):(En(`[canvasToBlob] Conversion failed: ${s.toFixed(2)}ms`),i(new Error("Failed to convert canvas to blob")))},t)})}function h1(e,t,n="input.1"){const r=performance.now(),i=document.createElement("canvas");i.width=t.size[0],i.height=t.size[1];const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for temp canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(e,0,0,t.size[0],t.size[1]);const s=performance.now(),l=a.getImageData(0,0,t.size[0],t.size[1]).data,u=t.size[0],c=t.size[1];let p=0;for(let x=0;x<l.length;x+=4){const C=l[x]/255,k=l[x+1]/255,I=l[x+2]/255;p=Math.max(p,C,k,I)}const f=Math.max(p,1e-6),g=performance.now(),y=new Float32Array(3*c*u);for(let x=0;x<c;x++)for(let C=0;C<u;C++){const k=(x*u+C)*4,I=l[k]/255,M=l[k+1]/255,A=l[k+2]/255,$=I/f,O=M/f,U=A/f,H=($-t.mean[0])/t.std[0],F=(O-t.mean[1])/t.std[1],K=(U-t.mean[2])/t.std[2];y[x*u+C]=H,y[c*u+x*u+C]=F,y[2*c*u+x*u+C]=K}const _=performance.now(),T=new ft("float32",y,[1,3,c,u]),v=performance.now();return oe(`[normalizeImage] Performance:
    - Resize: ${(s-r).toFixed(2)}ms
    - Max find: ${(g-s).toFixed(2)}ms
    - Normalize: ${(_-g).toFixed(2)}ms
    - Tensor: ${(v-_).toFixed(2)}ms
    - Total: ${(v-r).toFixed(2)}ms
    - Max value: ${p.toFixed(6)}, Divisor: ${f.toFixed(6)}`),{[n]:T}}function f1(e,t=[1,1,320,320]){const[,,n,r]=t,i=performance.now(),a=e.slice(0,n*r);e.length!==n*r&&Fe("[normalizeMask] Mask length does not match output shape",{maskLength:e.length,outputShape:`${n}x${r}=${n*r}`});const s=performance.now()-i;oe(`[processModelOutput] Data extraction: ${s.toFixed(2)}ms`);const o=performance.now();let l=a[0],u=a[0];for(let y=1;y<a.length;y++)a[y]<l&&(l=a[y]),a[y]>u&&(u=a[y]);const c=performance.now()-o;oe(`[processModelOutput] Min/max calculation: ${c.toFixed(2)}ms (min=${l.toFixed(6)}, max=${u.toFixed(6)})`);const p=performance.now(),f=new Float32Array(a.length);for(let y=0;y<a.length;y++)f[y]=(a[y]-l)/(u-l);const g=performance.now()-p;return oe(`[processModelOutput] Normalization: ${g.toFixed(2)}ms`),f}function m1(e,{width:t,height:n}){const r=performance.now(),i=document.createElement("canvas");i.width=t,i.height=n;const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for mask canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const s=a.createImageData(t,n);for(let l=0;l<e.length;l++){const u=Math.round(e[l]*255),c=l*4;s.data[c]=u,s.data[c+1]=u,s.data[c+2]=u,s.data[c+3]=255}a.putImageData(s,0,0);const o=performance.now()-r;return oe(`[processModelOutput] Canvas creation: ${o.toFixed(2)}ms`),i}function g1(e,t){const n=performance.now(),{width:r,height:i}=e,a=document.createElement("canvas");a.width=t.width,a.height=t.height;const s=a.getContext("2d");if(!s)throw new Error("Failed to get context for resized canvas");s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(e,0,0,t.width,t.height);const o=performance.now()-n;return oe(`[processModelOutput] Resize: ${o.toFixed(2)}ms (${r}x${i} → ${t.width}x${t.height})`),a}function a0(e,t,n=[1,1,320,320]){const r=performance.now();be(`[processModelOutput] Processing output (${e.length} values) for ${t.width}x${t.height} image...`);const i=f1(e,n),[,,a,s]=n,o=m1(i,{width:s,height:a}),l=g1(o,t),u=performance.now()-r;return oe(`[processModelOutput] Total processing: ${u.toFixed(2)}ms`),l}function b1(e,t){const n=performance.now();be(`[naiveCutout] Creating cutout for ${e.width}x${e.height} image...`);const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d");if(!i)throw new Error("Failed to get context for result canvas");const a=performance.now();i.drawImage(e,0,0);const s=performance.now()-a;oe(`[naiveCutout] Image draw: ${s.toFixed(2)}ms`);const o=performance.now(),l=i.getImageData(0,0,r.width,r.height),u=t.getContext("2d");if(!u)throw new Error("Failed to get context for mask canvas");const c=u.getImageData(0,0,t.width,t.height),p=performance.now()-o;oe(`[naiveCutout] Data extraction: ${p.toFixed(2)}ms`);const f=performance.now();for(let v=0;v<l.data.length;v+=4){const x=v,C=c.data[x];l.data[v+3]=C}const g=performance.now()-f;oe(`[naiveCutout] Mask application: ${g.toFixed(2)}ms`);const y=performance.now();i.putImageData(l,0,0);const _=performance.now()-y;oe(`[naiveCutout] Put image data: ${_.toFixed(2)}ms`);const T=performance.now()-n;return oe(`[naiveCutout] Total cutout creation: ${T.toFixed(2)}ms`),r}function y1(e,t){const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");if(!r)throw new Error("Failed to get context for result canvas");return r.fillStyle=`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]/255})`,r.fillRect(0,0,n.width,n.height),r.drawImage(e,0,0),n}function w1(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");return n.filter="blur(2px)",n.drawImage(e,0,0),n.filter="none",t}function _1(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");n.drawImage(e,0,0);const r=n.getImageData(0,0,t.width,t.height),i=r.data;for(let a=0;a<i.length;a+=4){const s=i[a];i[a]=s,i[a+1]=s,i[a+2]=s,i[a+3]=255}return n.putImageData(r,0,0),t}const x1={"u2net.onnx":"a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456","u2netp.onnx":"b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567","u2net_human_seg.onnx":"c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678","u2net_cloth_seg.onnx":"d4e5f6789012345678901234567890abcdef1234567890abcdef123456789","silueta.onnx":"75da6c8d2f8096ec743d071951be73b4a8bc7b3e51d9a6625d63644f90ffeedb"};async function v1(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function $1(e,t){try{const n=x1[e];if(!n)return console.warn(`No hash available for model: ${e}`),!0;const r=await v1(t),i=r===n;return i||(console.error(`Model integrity check failed for ${e}`),console.error(`Expected: ${n}`),console.error(`Actual: ${r}`)),i}catch(n){return console.error(`Error verifying model integrity for ${e}:`,n),!1}}function S1(e,t){const r=t.byteLength/(1024*1024),a={"u2net.onnx":{min:170,max:180},"u2netp.onnx":{min:4,max:5},"u2net_human_seg.onnx":{min:170,max:180},"u2net_cloth_seg.onnx":{min:170,max:180},"silueta.onnx":{min:40,max:50}}[e];if(!a)return console.warn(`No size validation available for model: ${e}`),!0;const s=r>=a.min&&r<=a.max;return s||(console.error(`Model size validation failed for ${e}`),console.error(`Expected: ${a.min}-${a.max}MB, got: ${r.toFixed(2)}MB`)),s}async function Vp(e,t){return!(!S1(e,t)||!await $1(e,t))}function s0(){try{return typeof navigator<"u"&&"gpu"in navigator&&typeof navigator.gpu=="object"&&navigator.gpu!==null}catch(e){return Ks("WebGPU availability check failed:",e),!1}}function k1(e){return e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Fe(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}function o0(){try{return typeof navigator<"u"&&"ml"in navigator&&typeof navigator.ml=="object"&&navigator.ml!==null}catch(e){return Ks("WebNN availability check failed:",e),!1}}function T1(e={}){const t=performance.now();be("[getExecutionProviders] Determining execution providers...");const n=[];if(be("[getExecutionProviders] Input options:",{executionProviders:e.executionProviders,preferWebNN:e.preferWebNN,webnnDeviceType:e.webnnDeviceType,webnnPowerPreference:e.webnnPowerPreference,preferWebGPU:e.preferWebGPU,webgpuPowerPreference:e.webgpuPowerPreference}),e.executionProviders&&e.executionProviders.length>0){const f=performance.now()-t;return oe(`[getExecutionProviders] Using explicit providers: ${f.toFixed(2)}ms`),be(`[getExecutionProviders] Using explicit execution providers: ${e.executionProviders.join(", ")}`),[...e.executionProviders]}const r=performance.now(),i=e.preferWebNN??!1,a=o0(),s=performance.now()-r;oe(`[getExecutionProviders] WebNN preference check: ${s.toFixed(2)}ms`),be(`[getExecutionProviders] WebNN status: preferWebNN=${i}, available=${a}`),i&&a?(n.push("webnn"),be("[getExecutionProviders] WebNN execution provider added to preference list")):i&&!a&&Fe("[getExecutionProviders] WebNN was preferred but is not available in this browser");const o=performance.now(),l=e.preferWebGPU??!1,u=s0(),c=performance.now()-o;oe(`[getExecutionProviders] WebGPU preference check: ${c.toFixed(2)}ms`),be(`[getExecutionProviders] WebGPU status: preferWebGPU=${l}, available=${u}`),l&&u?(n.push("webgpu"),be("[getExecutionProviders] WebGPU execution provider added to preference list")):l&&!u&&Fe("[getExecutionProviders] WebGPU was preferred but is not available in this browser"),n.push("webgl","cpu");const p=performance.now()-t;return oe(`[getExecutionProviders] Provider selection complete: ${p.toFixed(2)}ms (${n.join(", ")})`),n}function C1(e){return e!=null&&e.webnnDeviceType&&!["cpu","gpu","npu"].includes(e.webnnDeviceType)?(Fe(`Invalid WebNN device type: ${e.webnnDeviceType}`),!1):e!=null&&e.webnnPowerPreference&&!["default","low-power","high-performance"].includes(e.webnnPowerPreference)?(Fe(`Invalid WebNN power preference: ${e.webnnPowerPreference}`),!1):e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Fe(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}const Wt={simd:!0,proxy:!1,numThreads:4};function l0(e=Wt){Se.wasm.simd=e.simd??Wt.simd,Se.wasm.proxy=e.proxy??Wt.proxy,Se.wasm.numThreads=e.numThreads??Wt.numThreads}l0();class Oe{constructor(t,n={}){Pe(this,"modelName");Pe(this,"session",null);Pe(this,"modelData",null);Pe(this,"options");this.modelName=t,this.options={...Wt,...n},this.options.simd=this.options.simd??Wt.simd,this.options.proxy=this.options.proxy??Wt.proxy,this.options.numThreads=this.options.numThreads??Wt.numThreads,l0(this.options)}emitProgress(t,n,r){this.options.onProgress&&this.options.onProgress({step:t,progress:n,message:r})}async initialize(){if(be(`[${this.modelName}] Starting session initialization...`),this.emitProgress("initializing",0,"Starting session initialization..."),this.session){be(`[${this.modelName}] Session already initialized, skipping`),this.emitProgress("initializing",100,"Session already initialized, skipping");return}this.emitProgress("initializing",20,"Validating configuration..."),await this.validateConfiguration(),this.emitProgress("initializing",50,"Downloading model..."),this.modelData=await this.downloadModel(),this.emitProgress("initializing",60,"Setting up execution providers...");const t=await this.setupExecutionProviders();this.emitProgress("initializing",80,"Creating session..."),await this.createSession(t),this.emitProgress("initializing",100,"Session initialized successfully")}async validateConfiguration(){C1(this.options)||Fe("Invalid WebNN configuration, falling back to default providers"),k1(this.options)||Fe("Invalid WebGPU configuration, falling back to default providers")}async setupExecutionProviders(){const t=T1(this.options);if(this.options.preferWebNN){const n=o0();be(`WebNN requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}if(this.options.preferWebGPU){const n=s0();be(`WebGPU requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}return t}async createSession(t){let n=!1,r=null;if(!this.modelData)throw new Error("Model data not found");for(const i of t)try{be(`[${this.modelName}] Attempting to create session with provider: ${i}`),this.session=await xs.create(this.modelData,{executionProviders:[i],enableProfiling:Me.isONNXProfilingEnabled()}),oe(`[${this.modelName}] Successfully created session with provider: ${i}`),Me.isONNXProfilingEnabled()&&be(`[${this.modelName}] ONNX profiling enabled - data will be logged after each inference`),n=!0;break}catch(a){Fe(`[${this.modelName}] Failed to create session with provider '${i}':`,a),r=a;continue}if(!n)throw new Error(`Failed to create ONNX session with any provider. Last error: ${(r==null?void 0:r.message)||"Unknown error"}`)}async downloadModel(){var n;if(be(`[${this.modelName}] Starting model download...`),this.options.bypassModelCache)be(`[${this.modelName}] Model cache bypassed, forcing fresh download`);else try{this.emitProgress("downloading",10,"Checking cache...");const r=await this.getCachedModel();if(r)return be(`[${this.modelName}] Using cached model: ${this.modelName}`),this.emitProgress("downloading",100,"Using cached model"),r}catch(r){Fe(`[${this.modelName}] IndexedDB cache unavailable, falling back to direct download:`,r)}be(`[${this.modelName}] Downloading model: ${this.modelName}`);const t=this.getModelUrl();this.emitProgress("downloading",20,"Starting download...");try{const r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const i=r.headers.get("content-length"),a=i?parseInt(i,10):0;if(be(`[${this.modelName}] Model size: ${(a/(1024*1024)).toFixed(2)}MB`),a>0){this.emitProgress("downloading",30,"Downloading model...");const l=(n=r.body)==null?void 0:n.getReader();if(l){const u=[];let c=0,p=!1;for(;!p;){const _=await l.read();if(p=_.done,p||!_.value)break;const T=_.value;u.push(T),c+=T.length;const v=30+Math.round(c/a*60);this.emitProgress("downloading",v,`Downloading model... ${Math.round(c/a*100)}%`)}const f=new Uint8Array(c);let g=0;for(const _ of u)f.set(_,g),g+=_.length;if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await Vp(this.modelName,f.buffer))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(f.buffer)}catch(_){Fe(`[${this.modelName}] Failed to cache model, but download succeeded:`,_)}return this.emitProgress("downloading",100,"Model ready"),f.buffer}}this.emitProgress("downloading",50,"Downloading model...");const s=await r.arrayBuffer();if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await Vp(this.modelName,s))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(s)}catch(l){Fe(`[${this.modelName}] Failed to cache model, but download succeeded:`,l)}return this.emitProgress("downloading",100,"Model ready"),s}catch(r){throw En(`[${this.modelName}] Model download failed:`,r),new Error(`Failed to download model ${this.modelName}: ${r}`)}}async getCachedModel(){return new Promise((t,n)=>{const r=indexedDB.open("rembg-models",2);r.onerror=()=>n(r.error),r.onsuccess=()=>{const o=r.result.transaction(["models"],"readonly").objectStore("models").get(this.modelName);o.onsuccess=()=>{const l=o.result;if(!l){t(null);return}const u=this.getModelVersion(),c=l.version||"1.0.0";if(c!==u){Ks(`Model version mismatch for ${this.modelName}: cached=${c}, current=${u}`),t(null);return}t(l.data||null)},o.onerror=()=>n(o.error)},r.onupgradeneeded=()=>{const i=r.result;i.objectStoreNames.contains("models")||i.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}async cacheModel(t){return new Promise((n,r)=>{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").put({name:this.modelName,data:t,timestamp:Date.now(),version:this.getModelVersion()});l.onsuccess=()=>n(),l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}getModelUrl(){const t=Me.getCustomModelPath(this.modelName);return t&&t!==""?(be(`Using custom model path for ${this.modelName}: ${t}`),t):this.getDefaultModelUrl()}getModelVersion(){return"1.0.0"}prepareInput(t){return h1(t,this.getNormalizationParams(),this.getInputName())}async runInference(t){if(!this.session)throw new Error("Session not initialized");const n=await this.session.run(t);if(Me.isONNXProfilingEnabled())try{this.session.endProfiling(),be(`[${this.modelName}] ONNX profiling data outputted to console`)}catch(r){Fe(`[${this.modelName}] Failed to collect profiling data:`,r)}return n}async predict(t){if(be(`[${this.modelName}] Starting prediction for ${t.width}x${t.height} image...`),this.session||await this.initialize(),!this.session)throw new Error("Session not initialized");const n=this.prepareInput(t),r=await this.runInference(n),i=this.outputToMaskArray(r);return be(`[${this.modelName}] Predicted ${i.length} masks`),i.map(a=>this.maskArrayToMaskCanvas(a,{width:t.width,height:t.height}))}outputToMaskArray(t){return[t[Object.keys(t)[0]].data]}maskArrayToMaskCanvas(t,n){return a0(t,n,this.getOutputShape())}static getName(){throw new Error("getName() must be implemented by subclass")}getName(){return this.modelName}getOptions(){return{...this.options}}async dispose(){this.session&&(await this.session.release(),this.session=null),this.modelData=null}static async clearCache(){return new Promise((t,n)=>{try{const r=indexedDB.deleteDatabase("rembg-models");r.onsuccess=()=>{be("Model cache cleared successfully"),t()},r.onerror=()=>{Fe("Failed to clear model cache:",r.error),n(r.error)}}catch(r){Fe("IndexedDB not available for cache clearing:",r),n(r)}})}static async clearModelCache(t){return new Promise((n,r)=>{try{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").delete(t);l.onsuccess=()=>{be(`Model cache cleared for ${t}`),n()},l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}}catch(i){Fe("IndexedDB not available for cache clearing:",i),r(i)}})}}st([At()],Oe.prototype,"initialize",null);st([At()],Oe.prototype,"validateConfiguration",null);st([At()],Oe.prototype,"setupExecutionProviders",null);st([At()],Oe.prototype,"createSession",null);st([At()],Oe.prototype,"downloadModel",null);st([At()],Oe.prototype,"getCachedModel",null);st([At()],Oe.prototype,"cacheModel",null);st([Xs()],Oe.prototype,"prepareInput",null);st([At()],Oe.prototype,"runInference",null);st([At()],Oe.prototype,"predict",null);st([Xs()],Oe.prototype,"outputToMaskArray",null);st([Xs()],Oe.prototype,"maskArrayToMaskCanvas",null);class I1 extends Oe{constructor(t){super("u2net",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net"}}class E1 extends Oe{constructor(t){super("u2netp",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2netp.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2netp"}}class z1 extends Oe{constructor(t){super("u2net_human_seg",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_human_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net_human_seg"}}class M1 extends Oe{constructor(n){super("u2net_cloth_seg",n);Pe(this,"clothCategory","combined")}setClothCategory(n){this.clothCategory=n}getClothCategory(){return this.clothCategory}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_cloth_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[768,768]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,3,768,768]}outputToMaskArray(n){const r=n[Object.keys(n)[0]],i=r.data,[,a,s,o]=r.dims,l=this.logSoftmax(i,a,s*o),u=this.argmax(l,a,s*o),c=[];for(let p=1;p<=3;p++){const f=new Float32Array(s*o);for(let g=0;g<u.length;g++)f[g]=u[g]===p?255.5:0;c.push(f)}return c}maskArrayToMaskCanvas(n,r){return a0(n,r,this.getOutputShape())}logSoftmax(n,r,i){const a=new Float32Array(n.length);for(let s=0;s<i;s++){let o=n[s];for(let c=1;c<r;c++)o=Math.max(o,n[c*i+s]);let l=0;for(let c=0;c<r;c++)l+=Math.exp(n[c*i+s]-o);const u=Math.log(l)+o;for(let c=0;c<r;c++)a[c*i+s]=n[c*i+s]-u}return a}argmax(n,r,i){const a=new Uint8Array(i);for(let s=0;s<i;s++){let o=n[s],l=0;for(let u=1;u<r;u++){const c=n[u*i+s];c>o&&(o=c,l=u)}a[s]=l}return a}static getName(){return"u2net_cloth_seg"}}class A1 extends Oe{constructor(t){super("isnet-general-use",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-general-use.onnx`}getNormalizationParams(){return{mean:[.5,.5,.5],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-general-use"}}class N1 extends Oe{constructor(t){super("isnet-anime",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-anime.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-anime"}}class P1 extends Oe{constructor(t){super("silueta",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/silueta.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"silueta"}}const zt=new Map;zt.set("u2net",I1);zt.set("u2netp",E1);zt.set("u2net_human_seg",z1);zt.set("u2net_cloth_seg",M1);zt.set("isnet-general-use",A1);zt.set("isnet-anime",N1);zt.set("silueta",P1);const sn=new Map,qt=[],R1={maxSessions:5};function O1(e,t){var a,s;const n=[];e.preferWebNN!==t.preferWebNN&&n.push(`preferWebNN: ${e.preferWebNN} vs ${t.preferWebNN}`),e.webnnDeviceType!==t.webnnDeviceType&&n.push(`webnnDeviceType: ${e.webnnDeviceType} vs ${t.webnnDeviceType}`),e.webnnPowerPreference!==t.webnnPowerPreference&&n.push(`webnnPowerPreference: ${e.webnnPowerPreference} vs ${t.webnnPowerPreference}`),e.preferWebGPU!==t.preferWebGPU&&n.push(`preferWebGPU: ${e.preferWebGPU} vs ${t.preferWebGPU}`),e.webgpuPowerPreference!==t.webgpuPowerPreference&&n.push(`webgpuPowerPreference: ${e.webgpuPowerPreference} vs ${t.webgpuPowerPreference}`),e.simd!==t.simd&&n.push(`simd: ${e.simd} vs ${t.simd}`),e.proxy!==t.proxy&&n.push(`proxy: ${e.proxy} vs ${t.proxy}`),e.numThreads!==t.numThreads&&n.push(`numThreads: ${e.numThreads} vs ${t.numThreads}`);const r=JSON.stringify((a=e.executionProviders)==null?void 0:a.sort()),i=JSON.stringify((s=t.executionProviders)==null?void 0:s.sort());return r!==i&&n.push(`executionProviders: ${r} vs ${i}`),n.length>0?(be(`[areSessionOptionsEqual] Settings mismatch detected: ${n.join(", ")}`),!1):!0}function Hp(e){const t=qt.indexOf(e);t>-1&&qt.splice(t,1),qt.push(e)}async function B1(){if(qt.length===0)return;const e=qt[0],t=sn.get(e);t&&(await t.dispose(),sn.delete(e),qt.shift())}async function D1(){for(;sn.size>=R1.maxSessions;)await B1()}async function u0(e="u2net",t,n){const r=performance.now();be(`[newSession] Creating session for model: ${e}`);const i=performance.now(),a={...n,preferWebNN:Me.isWebNNEnabled(),webnnDeviceType:Me.getWebNNDeviceType(),webnnPowerPreference:Me.getWebNNPowerPreference(),preferWebGPU:Me.isWebGPUEnabled(),webgpuPowerPreference:Me.getWebGPUPowerPreference(),bypassSessionCache:Me.isSessionCacheBypassEnabled(),bypassModelCache:Me.isModelCacheBypassEnabled()},s=performance.now()-i;if(oe(`[newSession] Options merge: ${s.toFixed(2)}ms`),e==="u2net_custom")throw new Error("u2net_custom requires modelPath in config");const o=performance.now(),l=zt.get(e),u=performance.now()-o;if(oe(`[newSession] Registry lookup: ${u.toFixed(2)}ms`),!l){const x=Array.from(zt.keys()).join(", ");throw new Error(`No session class found for model '${e}'. Available models: ${x}`)}const c=performance.now();if(!a.bypassSessionCache&&sn.has(e)){const x=sn.get(e),C=x.getOptions();if(O1(a,C)){Hp(e);const k=performance.now()-c,I=performance.now()-r;return oe(`[newSession] Cache hit for ${e}: ${k.toFixed(2)}ms (total: ${I.toFixed(2)}ms)`),x}else{be(`[newSession] Settings mismatch for ${e}, evicting cached session`),await x.dispose(),sn.delete(e);const k=qt.indexOf(e);k>-1&&qt.splice(k,1)}}else a.bypassSessionCache&&be(`[newSession] Session cache bypassed for ${e}`);const p=performance.now()-c;oe(`[newSession] Cache miss for ${e}: ${p.toFixed(2)}ms`);const f=performance.now(),g=new l(a),y=performance.now()-f;oe(`[newSession] Session creation: ${y.toFixed(2)}ms`);const _=performance.now();sn.set(e,g),Hp(e);const T=performance.now()-_;oe(`[newSession] Session caching: ${T.toFixed(2)}ms`),D1().catch(console.warn);const v=performance.now()-r;return oe(`[newSession] Total session creation: ${v.toFixed(2)}ms`),g}async function U1(e,t={}){const n=performance.now();be("[remove] Starting background removal process...");const r=(i,a,s)=>{t.onProgress&&t.onProgress({step:i,progress:a,message:s})};try{r("downloading",0,"Initializing...");const i=performance.now();let a;if(e instanceof HTMLCanvasElement)a=e,r("downloading",20,"Input ready"),be("[remove] Input is already a canvas");else if(e instanceof HTMLImageElement){const I=performance.now();a=Aa(e);const M=performance.now()-I;oe(`[remove] Image to canvas conversion: ${M.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof File||e instanceof Blob){r("downloading",10,"Loading image...");const I=performance.now(),M=await c1(e),A=performance.now()-I;oe(`[remove] File to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=Aa(M);const O=performance.now()-$;oe(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof ArrayBuffer){r("downloading",10,"Loading image...");const I=performance.now(),M=await p1(e),A=performance.now()-I;oe(`[remove] ArrayBuffer to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=Aa(M);const O=performance.now()-$;oe(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else throw new Error("Unsupported input type. Supported types: File, Blob, ArrayBuffer, HTMLImageElement, HTMLCanvasElement");const s=performance.now()-i;oe(`[remove] Total input processing: ${s.toFixed(2)}ms (${a.width}x${a.height})`);const o=performance.now();r("downloading",30,"Preparing model...");const l=t.session||await u0("u2net"),u=performance.now()-o;oe(`[remove] Session creation: ${u.toFixed(2)}ms`);const c=performance.now();r("processing",40,"Running AI model...");const p=await l.predict(a),f=performance.now()-c;if(oe(`[remove] Model prediction: ${f.toFixed(2)}ms`),p.length===0)throw new Error("No masks generated from model");r("processing",70,"Processing mask...");let g=p[0];if(t.postProcessMask){const I=performance.now();r("postprocessing",80,"Applying post-processing..."),g=w1(g);const M=performance.now()-I;oe(`[remove] Post-processing: ${M.toFixed(2)}ms`)}if(t.onlyMask){const I=performance.now();r("postprocessing",90,"Creating mask output...");const M=_1(g),A=performance.now()-I;oe(`[remove] Mask-only creation: ${A.toFixed(2)}ms`);const $=performance.now(),O=await qp(M,"image/png"),U=performance.now()-$;oe(`[remove] Canvas to blob conversion: ${U.toFixed(2)}ms`),r("complete",100,"Complete");const H=performance.now()-n;return oe(`[remove] Total processing time (mask-only): ${H.toFixed(2)}ms`),O}const y=performance.now();r("postprocessing",85,"Creating cutout...");let _=b1(a,g);const T=performance.now()-y;if(oe(`[remove] Cutout creation: ${T.toFixed(2)}ms`),t.bgcolor){const I=performance.now();r("postprocessing",90,"Applying background color..."),_=y1(_,t.bgcolor);const M=performance.now()-I;oe(`[remove] Background color application: ${M.toFixed(2)}ms`)}const v=performance.now();r("postprocessing",95,"Finalizing output...");const x=await qp(_,"image/png"),C=performance.now()-v;oe(`[remove] Final canvas to blob conversion: ${C.toFixed(2)}ms`),r("complete",100,"Complete");const k=performance.now()-n;return oe(`[remove] Total processing time: ${k.toFixed(2)}ms`),x}catch(i){const a=performance.now()-n;throw console.error(`[remove] Processing failed (${a.toFixed(2)}ms):`,i),t.onProgress&&t.onProgress({step:"complete",progress:0,message:`Error: ${i instanceof Error?i.message:"Unknown error"}`}),i}}let Na=null,Pa=null,Ra=null,Gp=!1;function jp(e,t){if(!e.length)return 0;const n=Math.min(e.length-1,Math.max(0,Math.round((e.length-1)*t)));return e[n]}function Oa(e){const t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function L1(e,t,n){const r=Oa(e),i=Oa(t),a=Oa(n);let s=(r*.4124564+i*.3575761+a*.1804375)/.95047,o=r*.2126729+i*.7151522+a*.072175,l=(r*.0193339+i*.119192+a*.9503041)/1.08883;const u=c=>c>.008856?Math.cbrt(c):7.787*c+16/116;return s=u(s),o=u(o),l=u(l),{l:ce((116*o-16)/100),a:500*(s-o)/127,b:200*(o-l)/127}}async function F1(e,t=640){var l;const n=await createImageBitmap(e),r=Math.min(1,t/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r)),s=document.createElement("canvas");s.width=i,s.height=a;const o=s.getContext("2d",{willReadFrequently:!0});return o.fillStyle="#000",o.fillRect(0,0,i,a),o.drawImage(n,0,0,i,a),(l=n.close)==null||l.call(n),o.getImageData(0,0,i,a)}function W1(e,t=768){const n=e.naturalWidth||e.width,r=e.naturalHeight||e.height,i=Math.min(1,t/Math.max(n,r)),a=Math.max(1,Math.round(n*i)),s=Math.max(1,Math.round(r*i)),o=document.createElement("canvas");o.width=a,o.height=s;const l=o.getContext("2d",{willReadFrequently:!0});return l.fillStyle="#000",l.fillRect(0,0,a,s),l.drawImage(e,0,0,a,s),l.getImageData(0,0,a,s)}function q1(){return Na||(Na=new Promise((e,t)=>{if(window.loadPyodide){e();return}const n=document.createElement("script");n.src=Ow,n.async=!0,n.onload=()=>e(),n.onerror=()=>t(new Error("could not load Pyodide")),document.head.append(n)})),Na}async function V1(){return Pa||(Pa=(async()=>{E.statusLine.textContent="Loading Python",await q1();const e=await window.loadPyodide({indexURL:wh});return E.statusLine.textContent="Loading numpy",await e.loadPackage(["numpy"]),e.runPython(Bw),e})()),Pa}function H1(){if(Gp)return;const e=new URL("public/ort/",document.baseURI);Se.wasm.numThreads=1,Se.wasm.proxy=!1,Se.wasm.wasmPaths={mjs:new URL("ort-wasm-simd-threaded.jsep.mjs",e).toString(),wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",e).toString()},Me.setBaseUrl(new URL("public/models",document.baseURI).toString()),Me.setModelCacheBypass(!0),Gp=!0}function G1(){return H1(),Ra||(Ra=u0("u2netp")),Ra}function j1(e,t,n){const r=atob(e||""),i=new Uint8Array(t*n);for(let a=0;a<Math.min(r.length,i.length);a+=1)i[a]=r.charCodeAt(a);return i}function d0(e,t,n){let r=t,i=n,a=-1,s=-1;for(let o=0;o<e.length;o+=1){if(!e[o])continue;const l=o%t,u=Math.floor(o/t);r=Math.min(r,l),i=Math.min(i,u),a=Math.max(a,l),s=Math.max(s,u)}return a<r?[0,0,t-1,n-1]:[r,i,a,s]}function K1(e,t,n=null){const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d"),a=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);for(let I=0;I<t.length;I+=1)a.data[I*4+3]=t[I]?a.data[I*4+3]:0;i.putImageData(a,0,0);const[s,o,l,u]=n||d0(t,e.width,e.height),c=Math.max(1,l-s+1),p=Math.max(1,u-o+1),f=Math.max(8,Math.round(Math.max(c,p)*.08)),g=Math.max(0,s-f),y=Math.max(0,o-f),_=Math.min(e.width,l+f+1),T=Math.min(e.height,u+f+1),v=Math.max(1,_-g),x=Math.max(1,T-y),C=Math.max(v,x),k=document.createElement("canvas");return k.width=C,k.height=C,k.getContext("2d").drawImage(r,g,y,v,x,(C-v)/2,(C-x)/2,v,x),k.toDataURL("image/png")}async function X1(e){var u;E.statusLine.textContent="Removing background";const t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").putImageData(e,0,0);const n=await G1(),r=await U1(t,{onlyMask:!0,postProcessMask:!0,session:n}),i=await createImageBitmap(r),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const s=a.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0,e.width,e.height),(u=i.close)==null||u.call(i);const o=s.getImageData(0,0,e.width,e.height).data,l=new Uint8Array(e.width*e.height);for(let c=0;c<l.length;c+=1)l[c]=o[c*4]>16?1:0;return l}async function c0(e){const t=await X1(e),n=await V1();n.FS.writeFile("/upload.rgba",new Uint8Array(e.data)),n.FS.writeFile("/upload.mask",t),E.statusLine.textContent="Fingerprinting shell";const r=n.runPython(`fingerprint_rgba_mask_file("/upload.rgba", "/upload.mask", ${e.width}, ${e.height}, ${m.contourPoints||256}, 32)`),i=JSON.parse(r),a=j1(i.mask,e.width,e.height),s=i.bbox||d0(a,e.width,e.height);return{imageData:e,mask:a,contour:new Float32Array(i.contour||[]),fingerprint:new Float32Array(i.fingerprint||[]),maskPixels:Number(i.mask_pixels||0),bbox:s,imageUrl:await K1(e,a,s)}}async function Y1(e){return E.statusLine.textContent="Cutting shell",c0(W1(e,768))}async function Z1(e){return E.statusLine.textContent="Cutting shell",c0(await F1(e,768))}const Ys="shellspace:cutouts:v1:index",Q1="shellspace:cutouts:v1:";function Zs(e){return`${Q1}${encodeURIComponent(e)}`}function Qs(){try{const e=JSON.parse(localStorage.getItem(Ys)||"[]");return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch{return[]}}function J1(e){try{localStorage.setItem(Ys,JSON.stringify([...new Set(e)]))}catch{}}function e2(){for(const e of Qs())try{localStorage.removeItem(Zs(e))}catch{}try{localStorage.removeItem(Ys)}catch{}Rr.clear(),Et.clear(),m.mapShellImageIds.clear()}function Js(e){if(!(e!=null&&e.file))return"";try{return localStorage.getItem(Zs(e.file))||""}catch{return""}}function t2(e,t){if(!(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/"))))try{localStorage.setItem(Zs(e.file),t),J1([...Qs(),e.file]),e.id>=0&&m.mapShellImageIds.add(e.id)}catch{}}function p0(e){const t=new Image;t.decoding="async";const n={image:t,ready:!1,promise:new Promise(r=>{t.onload=()=>{n.ready=!0,r(t)},t.onerror=()=>r(null)})};return t.src=e,n}function n2(e){const t=new Map(e.map(n=>[n.file,n]));for(const n of Qs()){const r=t.get(n);if(!r||Et.has(n))continue;const i=Js(r);i&&(Et.set(n,p0(i)),m.mapShellImageIds.add(r.id))}}function h0(e){var t;["Loading Python","Loading numpy","Removing background","Cutting shell","Fingerprinting shell"].includes((t=E.statusLine)==null?void 0:t.textContent)&&(E.statusLine.textContent=e)}async function f0(e){return e!=null&&e.file?(Rr.has(e.file)||Rr.set(e.file,(async()=>{const t=Js(e);if(t)return{imageUrl:t};const n=await Lw(e);if(!n)return null;const r=await Y1(n);return t2(e,r==null?void 0:r.imageUrl),r})().catch(t=>(E.statusLine&&(E.statusLine.textContent=t.message||"Python image cut failed"),null))),Rr.get(e.file)):null}function eo(e,t=null){if(!(e!=null&&e.file))return null;let n=Et.get(e.file);if(!n){const r=Js(e);r&&(n=p0(r),Et.set(e.file,n))}if(!n){const r=new Image;r.decoding="async",n={image:r,ready:!1,promise:f0(e).then(i=>i!=null&&i.imageUrl?new Promise(a=>{r.onload=()=>{n.ready=!0,a(r)},r.onerror=()=>a(null),r.src=i.imageUrl}):null)},Et.set(e.file,n)}return n.ready?n.image:(t&&n.promise.then(r=>{r&&t(r)}),null)}function r2(e,t=null){const n=e!=null&&e.file?Et.get(e.file):null;return n?n.ready?n.image:(t&&n.promise.then(r=>{r&&t(r)}),null):null}function oi(e,t){if(!e||!(t!=null&&t.file))return!1;const n=Et.get(t.file);return n?n.ready?(e.src=n.image.src,e.hidden=!1,!0):(n.promise.then(r=>{r!=null&&r.src&&e.isConnected&&(e.src=r.src,e.hidden=!1)}),!0):!1}async function i2(e){const t=eo(e);if(t)return t;const n=e!=null&&e.file?Et.get(e.file):null;return(n==null?void 0:n.promise)||null}async function a2(e,t){var a;if(!e||!t)return!1;const n=eo(t);if(n)return e.src=n.src,!0;const r=((a=E.statusLine)==null?void 0:a.textContent)||"",i=await i2(t);return h0(r),!e.isConnected||!(i!=null&&i.src)?!1:(e.src=i.src,!0)}function sr(){var e;return Math.min(6,((e=m.model)==null?void 0:e.contour_visible_component_count)||0)}function m0(){return sr()}function s2(){return m.pcValues}function Ba(e){var t;return(t=m.model.contour_pca_ranges)==null?void 0:t[e]}function o2(e){var t;return((t=m.model.contour_explained_variance_ratio)==null?void 0:t[e])||0}function g0(e){return`PC${e+1}`}function ds(e){return g0(e)}function St(e,t){var n;return((n=e.contour_pc)==null?void 0:n[t])||0}function li(e=m.xAxis,t=m.yAxis){var o;const n=((o=m.model.contour_pca_ranges)==null?void 0:o[0])||{p01:-1,p99:1},r=Ba(e)||n,i=Ba(t)||Ba(1)||n,a=Math.max((r.p99-r.p01)*.08,.001),s=Math.max((i.p99-i.p01)*.08,.001);return{minX:r.p01-a,maxX:r.p99+a,minY:i.p01-s,maxY:i.p99+s}}function nr(e,t,n){const r=m.viewport;return{x:(e-r.minX)/(r.maxX-r.minX)*n.width,y:n.height-(t-r.minY)/(r.maxY-r.minY)*n.height}}function b0(e,t,n){const r=m.viewport;return{x:r.minX+e/n.width*(r.maxX-r.minX),y:r.minY+(n.height-t)/n.height*(r.maxY-r.minY)}}function Zr(e,t=.78){let n=0;for(let r=0;r<e.length;r+=1)n=n*31+e.charCodeAt(r)>>>0;return`hsla(${n%360}, 42%, 42%, ${t})`}function Kp(e,t=.78){let n=0;const r=String(e||"");for(let i=0;i<r.length;i+=1)n=n*31+r.charCodeAt(i)>>>0;return Dr(n%360,.42,.42,t)}function y0(e,t=1){return[Math.round(ce(e.color_r_mean??.68)*255),Math.round(ce(e.color_g_mean??.64)*255),Math.round(ce(e.color_b_mean??.56)*255),Math.round(ce(t)*255)]}function w0(e){var t;return(e==null?void 0:e.live_conservation_status)||((t=e==null?void 0:e.species_traits)==null?void 0:t.protection_status)||"Not assessed"}function l2(e){const t=w0(e).toLowerCase();return t.includes("critically")?[126,24,28,230]:t.includes("endangered")?[200,45,38,220]:t.includes("vulnerable")?[232,123,54,210]:t.includes("near")?[228,176,62,200]:t.includes("least")?[58,139,99,190]:[102,111,117,112]}function _0(e,t){if(t==="locality")return e.location_key==="unknown"?[96,108,106,158]:Kp(e.location_key||"unknown",.66);if(t==="conservation")return l2(e);if(t==="shell")return y0(e);if(t==="lightness"){const n=ce(e.color_l_mean??.5);return Dr(48,.24,(24+n*54)/100)}if(t==="pattern"){const n=ce((e.color_pattern_strength||0)/.22);return Dr(204-n*162,(34+n*36)/100,(30+n*18)/100)}if(t==="concavity"){const n=ce((e.contour_concavity||0)/.32);return Dr(320-n*185,.56,(35+n*11)/100)}return Kp(e.species,.78)}function u2(e){if(m.pointColorCache.has(e))return m.pointColorCache.get(e);const t=new Uint8ClampedArray(m.shells.length*4);for(const n of m.shells){if(n.id<0||n.id>=m.shells.length)continue;const r=_0(n,e),i=n.id*4;t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3]}return m.pointColorCache.set(e,t),t}function We(e=0){if(m.needsDraw=!0,m.scatterHitCache=null,e>0){window.clearTimeout(m.drawTimer),m.drawTimer=window.setTimeout(()=>We(),e);return}window.clearTimeout(m.drawTimer),m.drawTimer=0,!m.drawFrame&&(m.drawFrame=requestAnimationFrame(()=>{m.drawFrame=0,c2()}))}function d2(e){const t=E.scatter.width,n=E.scatter.height;if(!t||!n)return;const r=window.devicePixelRatio||1,i=he.createImageData(t,n),a=i.data,s=u2(m.colorMode),o=Math.max(8,Math.round(r*4)),l=Math.floor(o/2);for(let u=0;u<e.shells.length;u+=1){const c=e.shells[u],p=Math.round(e.points[u*2]*r),f=Math.round(e.points[u*2+1]*r);if(p<-o||p>=t+o||f<-o||f>=n+o)continue;const g=c.id>=0&&c.id<m.shells.length?c.id*4:-1,y=g<0?_0(c,m.colorMode):null,_=g<0?y[0]:s[g],T=g<0?y[1]:s[g+1],v=g<0?y[2]:s[g+2],x=g<0?y[3]:s[g+3];for(let C=0;C<o;C+=1){const k=f+C-l;if(!(k<0||k>=n))for(let I=0;I<o;I+=1){const M=p+I-l;if(M<0||M>=t)continue;const A=(k*t+M)*4;a[A]=_,a[A+1]=T,a[A+2]=v,a[A+3]=x}}}he.putImageData(i,0,0)}function Xp(e,t,{request:n=!1}={}){if(!e||e.id<0)return!1;const r=n?eo(e,()=>We()):r2(e,()=>We());if(!r)return!1;const i=nr(St(e,m.xAxis),St(e,m.yAxis),t);if(i.x<-40||i.x>t.width+40||i.y<-40||i.y>t.height+40)return!0;const a=e===m.selected?52:42;return he.save(),he.drawImage(r,i.x-a/2,i.y-a/2,a,a),he.restore(),!0}function c2(){const e=fn(E.scatter,he);if(!m.viewport||!m.needsDraw)return;m.needsDraw=!1,he.clearRect(0,0,e.width,e.height);const t=x0(e);d2(t),he.save(),he.lineWidth=1,he.strokeStyle="rgba(32, 36, 42, 0.25)";const n=nr(0,0,e);n.x>=0&&n.x<=e.width&&(he.beginPath(),he.moveTo(n.x,0),he.lineTo(n.x,e.height),he.stroke()),n.y>=0&&n.y<=e.height&&(he.beginPath(),he.moveTo(0,n.y),he.lineTo(e.width,n.y),he.stroke());const r=s2();if(r.length){const i=nr(r[m.xAxis]||0,r[m.yAxis]||0,e);he.strokeStyle="#c65d4b",he.lineWidth=2,he.beginPath(),he.moveTo(i.x-10,i.y),he.lineTo(i.x+10,i.y),he.moveTo(i.x,i.y-10),he.lineTo(i.x,i.y+10),he.stroke()}for(const i of m.mapShellImageIds){const a=m.shellById.get(i);a&&a!==m.selected&&Xp(a,e)}if(m.selected&&!Xp(m.selected,e,{request:!0})){const i=nr(St(m.selected,m.xAxis),St(m.selected,m.yAxis),e);he.fillStyle="#ffffff",he.strokeStyle="#20242a",he.lineWidth=2,he.beginPath(),he.arc(i.x,i.y,6,0,Math.PI*2),he.fill(),he.stroke()}he.restore()}function p2(e){const t=m.viewport||{};return[m.xAxis,m.yAxis,e.width.toFixed(1),e.height.toFixed(1),Number(t.minX||0).toFixed(4),Number(t.maxX||0).toFixed(4),Number(t.minY||0).toFixed(4),Number(t.maxY||0).toFixed(4)].join("|")}function x0(e){var i;const t=p2(e);if(((i=m.scatterPointCache)==null?void 0:i.key)===t&&m.scatterPointCache.shells===m.filtered)return m.scatterPointCache;const n=m.filtered,r=new Float32Array(n.length*2);for(let a=0;a<n.length;a+=1){const s=nr(St(n[a],m.xAxis),St(n[a],m.yAxis),e);r[a*2]=s.x,r[a*2+1]=s.y}return m.scatterPointCache={key:t,shells:n,points:r},m.scatterHitCache=null,m.scatterPointCache}function v0(e){var o;const t=x0(e),n=t.key;if(((o=m.scatterHitCache)==null?void 0:o.key)===n&&m.scatterHitCache.shells===m.filtered)return m.scatterHitCache;const r=t.shells,i=t.points,a=24,s=new Map;for(let l=0;l<r.length;l+=1){const u=i[l*2],c=i[l*2+1];if(u<-a||u>e.width+a||c<-a||c>e.height+a)continue;const p=Math.floor(u/a),f=Math.floor(c/a),g=`${p},${f}`;let y=s.get(g);y||(y=[],s.set(g,y)),y.push(l)}return m.scatterHitCache={key:n,shells:r,points:i,grid:s,cellSize:a},m.scatterHitCache}function Kn(e){return new URL(`public/${e}`,document.baseURI).toString()}function h2(e){return new URL(`dataset/${encodeURIComponent(e).replaceAll("%2F","/")}`,document.baseURI).toString()}function ce(e){return Math.max(0,Math.min(1,e))}function mt(e,t=3){return Number(e||0).toLocaleString(void 0,{maximumFractionDigits:t})}function Da(e){return`${mt(ce(e)*100,1)}%`}function f2(e){return ce(((e==null?void 0:e.area)||0)/Math.max(1,((e==null?void 0:e.image_width)||0)*((e==null?void 0:e.image_height)||0)))}function to(e){const t=Math.max(1,(e==null?void 0:e.image_width)||400),n=Math.max(1,(e==null?void 0:e.image_height)||300),r=Math.max(t,n),i=10;return{cmPerImageUnit:i/r,widthCm:t/r*i,heightCm:n/r*i,longSideCm:i}}function m2(e){const t=to(e);return((e==null?void 0:e.area)||0)*t.cmPerImageUnit*t.cmPerImageUnit}function g2(e){return((e==null?void 0:e.mean_radius)||0)*to(e).cmPerImageUnit}function cs(e,t=!0){E.loadingText&&e&&(E.loadingText.textContent=e),E.loadingOverlay&&(E.loadingOverlay.hidden=!t)}function no(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function b2(e){if(e!=null&&e.fingerprint_hash)return e.fingerprint_hash;const t=(e.contour_pc||[]).slice(0,6).map(r=>Number(r||0).toFixed(4)),n=`${e.species}|${e.specimen}|${e.view}|${t.join(",")}`;return no(n).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function y2(e,t){const n=no(t)%360;e.style.setProperty("--hash-hue",String(n)),e.textContent=t}function Yp(e,t,n=t==null?void 0:t.fingerprint_hash){if(!e||!n)return;const r=Qr((t==null?void 0:t.color_r_mean)??.68,(t==null?void 0:t.color_g_mean)??.62,(t==null?void 0:t.color_b_mean)??.52);e.style.setProperty("--hash-hue",String(Math.round(r.h))),e.style.setProperty("--hash-saturation",`${Math.round(Math.max(.28,r.s)*100)}%`),e.style.setProperty("--hash-lightness",`${Math.round(Math.max(.3,Math.min(.72,r.l))*100)}%`),e.textContent=n}function Qr(e,t,n){const r=ce(e),i=ce(t),a=ce(n),s=Math.max(r,i,a),o=Math.min(r,i,a);let l=0,u=0;const c=(s+o)/2;if(s!==o){const p=s-o;u=c>.5?p/(2-s-o):p/(s+o),s===r?l=(i-a)/p+(i<a?6:0):s===i?l=(a-r)/p+2:l=(r-i)/p+4,l/=6}return{h:l*360,s:u,l:c}}function Xn(e,t,n){return`hsl(${(e%360+360)%360}, ${Math.round(ce(t)*100)}%, ${Math.round(ce(n)*100)}%)`}function Dr(e,t,n,r=1){const i=(e%360+360)%360/360,a=ce(t),s=ce(n);if(a===0){const c=Math.round(s*255);return[c,c,c,Math.round(ce(r)*255)]}const o=s<.5?s*(1+a):s+a-s*a,l=2*s-o,u=c=>{let p=i+c;return p<0&&(p+=1),p>1&&(p-=1),p<1/6?l+(o-l)*6*p:p<1/2?o:p<2/3?l+(o-l)*(2/3-p)*6:l};return[Math.round(u(1/3)*255),Math.round(u(0)*255),Math.round(u(-1/3)*255),Math.round(ce(r)*255)]}function w2(e){return e.location_label||"Locality unavailable"}function $0(e,t){var n;return t?((n=e==null?void 0:e.region_labels)==null?void 0:n[t])||t.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,r=>r.toUpperCase()):""}function ps(e,t){var n,r;return((r=(n=e==null?void 0:e.countries)==null?void 0:n[t])==null?void 0:r.title)||t}function _2(e){var r,i,a,s,o;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-localities-v1")return t;const n=e.species_names||[];for(let l=0;l<n.length;l+=1){const u=((r=e.primary_country_codes)==null?void 0:r[l])||"",c=((i=e.region_keys)==null?void 0:i[l])||"",p=((a=e.total_occurrences)==null?void 0:a[l])||0,f=((s=e.top_country_codes)==null?void 0:s[l])||[],g=((o=e.top_country_counts)==null?void 0:o[l])||[],y=u?ps(e,u):"",_=$0(e,c),T=f.map((v,x)=>({code:v,label:ps(e,v),count:g[x]||0}));t.set(n[l],{primary_country:u,primary_country_label:y,region_key:c,region_label:_,total_occurrences:p,top_countries:T,location_label:y&&_?`${y}, ${_}`:y||_||""})}return t}function x2(e){var a,s,o,l,u,c,p,f,g,y,_,T,v;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-species-traits-v1")return t;const n=e.species_names||[],r=e.rarity_labels||[],i=e.protection_status_labels||[];for(let x=0;x<n.length;x+=1){const C=((a=e.known_range_country_codes)==null?void 0:a[x])||[],k=((s=e.known_range_country_counts)==null?void 0:s[x])||[],I=C.map((M,A)=>({code:M,label:ps(e,M),count:k[A]||0}));t.set(n[x],{genus:((o=e.genus)==null?void 0:o[x])||"",rarity_label:r[(l=e.rarity)==null?void 0:l[x]]||"Data deficient",rarity_reason:((u=e.rarity_reasons)==null?void 0:u[x])||"",dataset_sample_count:((c=e.dataset_sample_count)==null?void 0:c[x])||0,observation_count:((p=e.observation_count)==null?void 0:p[x])||0,known_range_country_count:((f=e.country_count)==null?void 0:f[x])||I.length,known_range_countries:I,primary_country:((g=e.primary_country_codes)==null?void 0:g[x])||"",region_key:((y=e.region_keys)==null?void 0:y[x])||"",region_label:$0(e,((_=e.region_keys)==null?void 0:_[x])||""),protection_status:i[(T=e.protection_status)==null?void 0:T[x]]||"Not assessed",market_price_usd:((v=e.market_price_usd)==null?void 0:v[x])??null})}return t}function S0(e){const t=ce((1-(e.contour_solidity||1))/.32),n=e.contour_pc||[],r=ce(((n[1]||0)+7)/14),i=ce(((n[3]||0)+3)/6);return{asymmetry:ce(.4*Math.abs(r-.5)*2+.34*Math.abs(i-.5)*2+.26*t)}}function v2(e,t=null,n=null){var a;m.speciesCounts=new Map,m.originFilterOptionsCache=null;for(const s of e)m.speciesCounts.set(s.species,(m.speciesCounts.get(s.species)||0)+1);const r=_2(t),i=x2(n);m.speciesTraits=i,m.localityMatchRate=(t==null?void 0:t.match_rate)||0;for(const s of e){const o=r.get(s.species),l=i.get(s.species);s.fingerprint_hash||(s.fingerprint_hash=b2(s)),s.species_sample_count=m.speciesCounts.get(s.species)||1,s.species_traits=l||null,s.morph_traits=S0(s),s.rarity_label=(l==null?void 0:l.rarity_label)||"Data deficient",s.rarity_reason=(l==null?void 0:l.rarity_reason)||"",s.global_occurrences=(l==null?void 0:l.observation_count)||(o==null?void 0:o.total_occurrences)||0,s.location_label=(o==null?void 0:o.location_label)||"Locality unavailable",s.location_key=(o==null?void 0:o.primary_country)||(o==null?void 0:o.region_key)||"unknown",s.location_color=s.location_key==="unknown"?"rgba(96, 108, 106, 0.62)":Zr(s.location_key),s.species_color=Zr(s.species),s.region_label=(o==null?void 0:o.region_label)||"",s.top_countries_label=(a=o==null?void 0:o.top_countries)!=null&&a.length?o.top_countries.slice(0,3).map(u=>u.label).join(", "):""}}function hs(e){return fetch(e,{cache:"no-store"}).then(t=>{if(!t.ok)throw new Error(`${e} returned ${t.status}`);return t.json()})}async function Zp(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} returned ${t.status}`);if(!e.endsWith(".gz"))return t.arrayBuffer();const n=await t.arrayBuffer(),r=new Uint8Array(n);if(r[0]!==31||r[1]!==139)return n;if(!("DecompressionStream"in window))throw new Error("This browser cannot decompress the shell data pack.");return new Response(new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}function Ua(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").replace(/_/g," ").trim()||"Unknown shell"}function $2(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").trim()}async function S2(e){try{return await hs(e)}catch{return null}}function k2(e,t,n){const r=[];for(let i=0;i<n;i+=1){const a=[];for(let f=0;f<t;f+=1)a.push(e[f*n+i]||0);a.sort((f,g)=>f-g);const s=f=>a[Math.min(a.length-1,Math.max(0,Math.round((a.length-1)*f)))]||0,o=a[0]||0,l=a.at(-1)||0,u=s(.01),c=s(.99),p=Math.max(.001,c-u,l-o);r.push({min:o-p*.08,max:l+p*.08,p01:u-p*.08,p99:c+p*.08})}return r}async function k0(e){const t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),n=new Uint8Array(t.length);n.set(t);const r=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(r)].map(i=>i.toString(16).padStart(2,"0")).join("").slice(0,6).toUpperCase()}function T0(e,t=256){const n=Math.floor(e.length/4),r=new Float32Array(t*2);for(let i=0;i<t;i+=1){const a=i/t;let s=0,o=0;for(let l=0;l<n;l+=1){const u=l+1,c=l*4,p=e[c]||0,f=e[c+1]||0,g=e[c+2]||0,y=e[c+3]||0,_=Math.PI*2*u*a,T=Math.cos(_),v=Math.sin(_);s+=p*T-f*v+g*T+y*v,o+=p*v+f*T+y*T-g*v}r[i*2]=s,r[i*2+1]=o}return r}function T2(e){var i,a;const t=((i=m.model)==null?void 0:i.fingerprint_mean)||[],n=((a=m.model)==null?void 0:a.fingerprint_components)||[];if(!t.length||!n.length)return null;const r=new Float32Array(t);for(let s=0;s<Math.min(e.length,n.length);s+=1){const o=n[s]||[];for(let l=0;l<Math.min(r.length,o.length);l+=1)r[l]+=(e[s]||0)*o[l]}return r}function C2(e){var r,i;const t=((r=m.model)==null?void 0:r.fingerprint_mean)||[];return(((i=m.model)==null?void 0:i.fingerprint_components)||[]).map(a=>{let s=0;for(let o=0;o<Math.min(e.length,t.length,a.length);o+=1)s+=(e[o]-t[o])*a[o];return s})}async function I2(){const[e,t,n,r,i]=await Promise.all([hs(Kn("data/files.json")),hs(Kn("data/pca_model.json")),Zp(Kn("data/fingerprints.f32")),Zp(Kn("data/pca.f32")),S2(Kn("data/enrichment.json"))]),a=new Map(((i==null?void 0:i.rows)||[]).map(g=>[g.label,g])),s=e.length,o=new Float32Array(n),l=new Float32Array(r),u=Math.floor(o.length/s),c=Math.floor(l.length/s),p={processed_count:s,species_count:new Set(e.map(Ua)).size,contour_points:256,contour_scale:1,contour_component_count:c,contour_visible_component_count:Math.min(6,c),contour_pca_ranges:k2(l,s,c),contour_explained_variance_ratio:Array.from({length:c},()=>0),fingerprint_mean:t.mean||[],fingerprint_components:t.components||[]},f=await Promise.all(e.map(async(g,y)=>{const _=o.slice(y*u,(y+1)*u),T=Array.from(l.slice(y*c,(y+1)*c)),v=a.get($2(g))||{};return{id:y,file:g,species:Ua(g),specimen:"",specimen_label:"",view:"",view_label:"",name:Ua(g),contour_pc:T,trait_pc:[],fingerprint:_,fingerprint_hash:await k0(_),enrichment:v,rarity_label:v.rarity_proxy||"unknown",gbif_occurrence_count:Number(v.occurrence_count||0),gbif_country_count:Number(v.country_count||0),gbif_countries_top:v.countries_top||"",color_l_mean:Number(v.lightness_mean||0)/255,morph_traits:{asymmetry:Number(v.asymmetry_mean||0)}}}));return{model:p,shells:f}}function C0(e){if(e!=null&&e.upload_contour)return e.upload_contour;if((e==null?void 0:e.id)<0&&m.selected===e&&m.selectedContour)return m.selectedContour;if(xr.has(e.id))return xr.get(e.id);if(!m.contours&&(e!=null&&e.fingerprint)){const o=T0(e.fingerprint,m.contourPoints||256);return xr.set(e.id,o),o}if(!m.contours||!m.contourPoints)return null;const t=e.id*m.contourPoints*2;if(t+m.contourPoints*2>m.contours.length)return null;const r=e.center[0]*m.contourScale,i=e.center[1]*m.contourScale,a=Math.max(1e-6,e.mean_radius*m.contourScale),s=new Float32Array(m.contourPoints*2);for(let o=0;o<m.contourPoints;o+=1){const l=t+o*2;s[o*2]=(m.contours[l]-r)/a,s[o*2+1]=(m.contours[l+1]-i)/a}return xr.set(e.id,s),s}function I0(e){return e?{color_r_mean:e.color_r_mean,color_g_mean:e.color_g_mean,color_b_mean:e.color_b_mean,color_l_mean:e.color_l_mean,color_a_mean:e.color_a_mean,color_b_lab_mean:e.color_b_lab_mean,color_chroma_mean:e.color_chroma_mean,color_chroma_std:e.color_chroma_std,color_saturation_mean:e.color_saturation_mean,color_saturation_std:e.color_saturation_std,color_pattern_strength:e.color_pattern_strength,color_pattern_contrast:e.color_pattern_contrast,color_pattern_chroma:e.color_pattern_chroma,roughness:e.roughness,texture_gradient_mean:e.texture_gradient_mean,texture_residual_std:e.texture_residual_std,texture_luma_iqr:e.texture_luma_iqr,contour_concavity:e.contour_concavity,contour_solidity:e.contour_solidity}:{}}function E2(e){const t=e.color_l_mean??.5,n=e.color_chroma_mean??.1,r=(Math.atan2(e.color_hue_sin||0,e.color_hue_cos||1)*180/Math.PI+360)%360;return t>.72&&n<.12?"ivory":t<.32?"dark brown":n<.08?t>.58?"chalky cream":"stone gray":r<28||r>=342?"rose-brown":r<58?t>.58?"golden cream":"amber-brown":r<92?"olive-tan":r<165?"green-gray":r<235?"blue-gray":r<292?"violet-gray":"pink-tan"}function ro(){return m.generatedTraits||I0(m.selected)}function io(){const e=z2(m.pcValues);e&&(m.generatedContour=e,m.generatedTraits=null,m.generatedMode="pca",M0())}function z2(e){var i,a,s,o,l;const t=T2(e);if(t)return T0(t,m.contourPoints||256);if(!((a=(i=m.model)==null?void 0:i.contour_mean)!=null&&a.length)||!((o=(s=m.model)==null?void 0:s.contour_components)!=null&&o.length))return null;const n=m.model.contour_mean.length,r=new Float32Array(n);for(let u=0;u<n;u+=1){let c=m.model.contour_mean[u]||0;for(let p=0;p<m.model.contour_components.length;p+=1)c+=(e[p]||0)*(((l=m.model.contour_components[p])==null?void 0:l[u])||0);r[u]=c}return r}function ao(e){let t=0;for(const n of e)if(n)for(let r=0;r<n.length;r+=2)t=Math.max(t,Math.hypot(n[r],n[r+1]));return t||1}function dn(e,t,n,r,i){e.beginPath();const a=Math.floor(t.length/2);for(let s=0;s<a;s+=1){const o=n+t[s*2]*i,l=r+t[s*2+1]*i;s===0?e.moveTo(o,l):e.lineTo(o,l)}e.closePath()}function E0(e,t=.9){const n=Math.round(ce((e==null?void 0:e.color_r_mean)??.72)*255),r=Math.round(ce((e==null?void 0:e.color_g_mean)??.66)*255),i=Math.round(ce((e==null?void 0:e.color_b_mean)??.54)*255);return`rgba(${n}, ${r}, ${i}, ${t})`}function M2(){const e=m.pcValues.slice(0,6).map(t=>Number(t||0).toFixed(4));return no(`projected|${e.join(",")}`).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function z0(){var e,t,n;if((e=m.selected)!=null&&e.fingerprint_hash&&E.physicalHash&&Yp(E.physicalHash,m.selected),E.projectedHash){const r=m.generatedMode==="selected"&&((t=m.selected)!=null&&t.fingerprint_hash)?m.selected.fingerprint_hash:M2();m.generatedMode==="selected"&&((n=m.selected)!=null&&n.fingerprint_hash)?Yp(E.projectedHash,m.selected,r):y2(E.projectedHash,r)}}function A2(e,t,n,r,i,a){const s=Math.floor(t.length/2);if(s<4)return;const o=ce(((a==null?void 0:a.roughness)||.012)/.04),l=ce(((a==null?void 0:a.color_chroma_mean)||.08)/.35),u=ce(((a==null?void 0:a.contour_concavity)||.04)/.35),c=ce(((a==null?void 0:a.color_pattern_strength)||.06)/.22),p=ce(((a==null?void 0:a.color_pattern_contrast)||.04)/.18);e.save(),dn(e,t,n,r,i),e.clip();const f=4+Math.round(u*4+c*5);for(let _=1;_<=f;_+=1)dn(e,t,n,r,i*(.16+_/(f+1)*.78)),e.strokeStyle=`rgba(32, 36, 42, ${.035+l*.035+p*.05})`,e.lineWidth=.8+c*.55,e.stroke();const g=Math.max(4,Math.round(16-o*5-l*3-c*6));e.lineWidth=.9+o*.8+c*.6,e.strokeStyle=`rgba(32, 36, 42, ${.07+o*.12+p*.16})`;for(let _=0;_<s;_+=g){const T=t[_*2],v=t[_*2+1];e.beginPath(),e.moveTo(n+T*i*.22,r+v*i*.22),e.lineTo(n+T*i*.95,r+v*i*.95),e.stroke()}const y=e.createRadialGradient(n-i*.22,r-i*.28,i*.08,n,r,i*1.25);y.addColorStop(0,"rgba(255, 255, 255, 0.34)"),y.addColorStop(.45,"rgba(255, 255, 255, 0.08)"),y.addColorStop(1,"rgba(32, 36, 42, 0.08)"),e.fillStyle=y,e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore()}function M0(){const{width:e,height:t}=E.outline;De.clearRect(0,0,e,t),De.fillStyle="#f7f7f2",De.fillRect(0,0,e,t);const n=m.generatedContour||m.selectedContour;if(!n)return;z0();const r=e/2,i=t/2,a=Math.min(e,t)*.42/ao([n]),s=ro();De.save(),dn(De,n,r,i,a),De.fillStyle=E0(s,.9),De.strokeStyle="#287a74",De.lineWidth=3,De.fill(),A2(De,n,r,i,a,s),dn(De,n,r,i,a),De.stroke(),De.fillStyle="#20242a",De.beginPath(),De.arc(r,i,3,0,Math.PI*2),De.fill(),De.restore()}function N2(e,t,n,r){const i=[],a=Math.floor(e.length/2);for(let s=0;s<a;s+=1){const o=t+e[s*2]*r,l=n+e[s*2+1]*r;i.push(`${s===0?"M":"L"}${o.toFixed(2)} ${l.toFixed(2)}`)}return i.push("Z"),i.join(" ")}function P2(){const e=m.generatedContour||m.selectedContour;if(!e)return;const t=512,n=t/2,r=t*.42/ao([e]),i=N2(e,n,n,r),a=E0(ro(),.86),s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}"><rect width="${t}" height="${t}" fill="#f7f7f2"/><path d="${i}" fill="${a}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`,o=new Blob([s],{type:"image/svg+xml"}),l=URL.createObjectURL(o),u=document.createElement("a");u.href=l,u.download="seashell-generated.svg",u.click(),URL.revokeObjectURL(l)}function R2(e){return`rgb(${Math.round(e[0])}, ${Math.round(e[1])}, ${Math.round(e[2])})`}function Qp(e,t){const n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2];return n*n+r*r+i*i}function O2(e){if(!e.length)return null;const t=[e.reduce((n,r)=>{const i=Math.max(r[0],r[1],r[2])-Math.min(r[0],r[1],r[2]),a=Math.max(n[0],n[1],n[2])-Math.min(n[0],n[1],n[2]);return i>a?r:n},e[0]).slice()];for(;t.length<5;){let n=e[0],r=-1;for(const i of e){const a=Math.min(...t.map(s=>Qp(i,s)));a>r&&(r=a,n=i)}t.push(n.slice())}for(let n=0;n<5;n+=1){const r=t.map(()=>[0,0,0,0]);for(const i of e){let a=0,s=1/0;for(let o=0;o<t.length;o+=1){const l=Qp(i,t[o]);l<s&&(s=l,a=o)}r[a][0]+=i[0],r[a][1]+=i[1],r[a][2]+=i[2],r[a][3]+=1}for(let i=0;i<t.length;i+=1)r[i][3]&&(t[i]=[r[i][0]/r[i][3],r[i][1]/r[i][3],r[i][2]/r[i][3]])}return t.sort((n,r)=>Qr(n[0]/255,n[1]/255,n[2]/255).l-Qr(r[0]/255,r[1]/255,r[2]/255).l).map(R2)}function B2(){const e=E.sourceImage;if(!e||e.hidden||!e.complete||!e.naturalWidth||!e.naturalHeight)return null;const t=Math.min(220,e.naturalWidth),n=Math.max(1,Math.round(t/e.naturalWidth*e.naturalHeight)),r=document.createElement("canvas");r.width=t,r.height=n;const i=r.getContext("2d",{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a;try{a=i.getImageData(0,0,t,n).data}catch{return null}const s=[],o=Math.max(4,Math.floor(Math.sqrt(t*n/2200)));for(let l=0;l<n;l+=o)for(let u=0;u<t;u+=o){const c=(l*t+u)*4,p=a[c],f=a[c+1],g=a[c+2];a[c+3]<180||p+f+g<48||s.push([p,f,g])}return O2(s)}function D2(e){const t={r:ce(e.color_r_mean??.72),g:ce(e.color_g_mean??.66),b:ce(e.color_b_mean??.54)},n=Qr(t.r,t.g,t.b),r=ce((e.color_l_std||.18)/.32);return[Xn(n.h,n.s*.78,Math.max(.12,n.l-.28-r*.08)),Xn(n.h-8,n.s*.92,Math.max(.22,n.l-.12)),Xn(n.h,n.s,n.l),Xn(n.h+6,n.s*.72,Math.min(.86,n.l+.16)),Xn(n.h,n.s*.48,Math.min(.94,n.l+.3+r*.04))]}function zn(e=!1){if(!E.paletteSwatches)return;E.paletteSwatches.innerHTML="";const t=ro(),n=m.generatedMode==="selected"&&m.selected?m.selected.id:null;let r=n==null?null:m.paletteCache.get(n);!r&&e&&(r=B2(),r&&n!=null&&m.paletteCache.set(n,r)),r||(r=D2(t));for(const i of r){const a=document.createElement("span");a.className="palette-swatch",a.style.background=i,a.title=i,E.paletteSwatches.append(a)}}function Jp(e,t,n=""){E.sourceImage.hidden=!1,E.sourceSpinner&&(E.sourceSpinner.hidden=!1),E.sourceImage.dataset.fallbackApplied="false",E.sourceImage.alt=n,E.sourceImage.onerror=()=>{E.sourceImage.removeAttribute("src"),E.sourceSpinner&&(E.sourceSpinner.hidden=!0)},E.sourceImage.onload=()=>{E.sourceSpinner&&(E.sourceSpinner.hidden=!0),zn(!0)},E.sourceImage.src=e}async function A0(e,{preferFastSource:t=!1}={}){if(!e)return;const n=++m.sourceToken,r=m.selectionRun;if(window.clearTimeout(m.sourceLoadTimer),E.sourceSpinner&&(E.sourceSpinner.hidden=!1),m.uploadImageUrl&&e.id<0){Jp(m.uploadImageUrl,e,e.species);return}E.sourceImage.hidden=!0,m.sourceFrame=null,m.sourceMode="python",zn(!1);const i=E.statusLine.textContent;m.sourceLoadTimer=window.setTimeout(async()=>{const a=await f0(e);h0(i),!(r!==m.selectionRun||n!==m.sourceToken||m.selected!==e)&&(a!=null&&a.imageUrl?Jp(a.imageUrl,e,e.species):E.sourceSpinner&&(E.sourceSpinner.hidden=!0))},0)}function so(){const e=[];for(const t of[m.xAxis,m.yAxis])Number.isInteger(t)&&t>=0&&!e.includes(t)&&e.push(t);return e.length?e:[0,1]}function U2(e){var i,a;const t=(a=(i=m.model)==null?void 0:i.contour_pca_ranges)==null?void 0:a[e];if(!t)return 1;const n=Math.abs((t.p99??0)-(t.p01??0)),r=Math.abs((t.max??0)-(t.min??0));return Math.max(.001,n||r||1)}function ui(e,t,n=null){let r=0,i=0;const a=e.contour_pc||[],s=n!=null&&n.length?n:Array.from({length:Math.min(4,a.length,t.length)},(l,u)=>u);let o=0;for(const l of s){if(l>=a.length||l>=t.length)continue;const u=(a[l]||0)-(t[l]||0);r+=u**2,i+=(u/U2(l))**2,o+=1}return{rawSq:r,normalizedSq:i,dimensions:o}}function oo(e){if(!e.dimensions)return 0;const t=Math.sqrt(e.normalizedSq),n=Math.sqrt(e.dimensions);return Math.max(0,Math.min(100,(1-t/n)*100))}function L2(e,t,n){if(e.length<n){e.push(t);return}let r=0,i=e[0].distance;for(let a=1;a<e.length;a+=1)e[a].distance>i&&(i=e[a].distance,r=a);t.distance<i&&(e[r]=t)}function F2(e){return e.sort((t,n)=>t.distance-n.distance).map(t=>({distance:Math.sqrt(t.stats.rawSq),similarity:oo(t.stats),shell:t.shell}))}function W2(e,{axes:t=null,limit:n=4,excludeId:r=null}={}){const i=++m.neighborSearchRun;window.clearTimeout(m.neighborSearchTimer);const a=m.filtered.length?m.filtered:m.shells,s=[];let o=0;const l=()=>{var c;if(i!==m.neighborSearchRun)return;const u=performance.now()+5;for(;o<a.length&&performance.now()<u;o+=1){const p=a[o];if(p.id===r||!((c=p.contour_pc)!=null&&c.length))continue;const f=ui(p,e,t);L2(s,{distance:f.normalizedSq,stats:f,shell:p},n)}if(o<a.length){m.neighborSearchTimer=window.setTimeout(l,0);return}lo(F2(s))};m.neighborSearchTimer=window.setTimeout(l,0)}function q2(e){if(!e)return[];if(m.neighborCache.has(e.id))return m.neighborCache.get(e.id);const t=[];let n=-1,r=-1;for(const a of m.shells){if(a.id===e.id)continue;const s=ui(a,e.contour_pc||[]),o=s.normalizedSq;if(t.length<4){t.push({distance:o,stats:s,shell:a}),o>r&&(r=o,n=t.length-1);continue}if(!(o>=r)){t[n]={distance:o,stats:s,shell:a},r=-1;for(let l=0;l<t.length;l+=1)t[l].distance>r&&(r=t[l].distance,n=l)}}t.sort((a,s)=>a.distance-s.distance);const i=t.map(a=>({distance:Math.sqrt(a.stats.rawSq),similarity:oo(a.stats),shell:a.shell}));return m.neighborCache.set(e.id,i),i}function lo(e){const t=e.map(r=>r.shell.id).join("|");if(m.neighborRenderKey===t){m.draggingTarget&&m.neighborHydrationItems.length&&fs(m.neighborHydrationItems,t);return}m.neighborRenderKey=t,E.neighborsList.innerHTML="",window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationItems=[];const n=[];for(const r of e){const i=document.createElement("button");i.className="neighbor-button";const a=Number.isFinite(r.similarity)?r.similarity:0;i.title=`${r.shell.species} (${mt(a,1)}% similar, distance ${mt(r.distance,3)})`;const s=document.createElement("canvas");s.width=160,s.height=116,s.className="neighbor-contour",V2(s,r.shell);const o=document.createElement("img");o.setAttribute("aria-label",r.shell.species),o.alt=r.shell.species,o.hidden=!0,o.onload=()=>{o.hidden=!1,s.hidden=!0};const l=document.createElement("span");l.textContent=`${Math.round(a)}%`,i.append(s,o,l),i.addEventListener("click",()=>{ci(r.shell),bn(r.shell)}),E.neighborsList.append(i),oi(o,r.shell)&&(o.hidden||(s.hidden=!0)),n.push({image:o,shell:r.shell})}m.neighborHydrationItems=n,fs(n,t)}function V2(e,t){const n=e.getContext("2d"),r=C0(t);if(n.clearRect(0,0,e.width,e.height),!r)return;const i=e.width/2,a=e.height/2,s=Math.min(e.width,e.height)*.4/ao([r]),o=n.createLinearGradient(0,e.height*.22,e.width,e.height*.86);o.addColorStop(0,"#f7ead0"),o.addColorStop(1,"#c98f72"),dn(n,r,i,a,s),n.fillStyle=o,n.strokeStyle="rgba(59, 77, 76, 0.72)",n.lineWidth=2,n.fill(),n.stroke(),n.save(),dn(n,r,i,a,s),n.clip(),n.strokeStyle="rgba(255, 255, 255, 0.22)",n.lineWidth=1.1;for(let c=1;c<=2;c+=1)dn(n,r,i,a,s*(.34+c*.2)),n.stroke();n.strokeStyle="rgba(64, 44, 38, 0.1)",n.lineWidth=1;const l=Math.floor(r.length/2),u=Math.max(12,Math.floor(l/10));for(let c=0;c<l;c+=u){const p=r[c*2],f=r[c*2+1];n.beginPath(),n.moveTo(i+p*s*.25,a+f*s*.25),n.lineTo(i+p*s*.94,a+f*s*.94),n.stroke()}n.restore()}function fs(e,t){window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationTimer=window.setTimeout(()=>{if(m.neighborHydrationTimer=0,m.draggingTarget){fs(e,t);return}H2(e,t)},m.draggingTarget?180:650)}async function H2(e,t){const n=m.selectionRun;for(const r of e){if(n!==m.selectionRun||m.neighborRenderKey!==t)return;oi(r.image,r.shell)||a2(r.image,r.shell).then(()=>{(n!==m.selectionRun||m.neighborRenderKey!==t)&&(r.image.hidden=!0)})}}function G2(e,t=m.neighborToken){if(!e||t!==m.neighborToken){m.neighborRenderKey="",m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationTimer=0,m.neighborHydrationItems=[],E.neighborsList.innerHTML="";return}lo(q2(e))}function j2(e,t=null){if(m.neighborToken+=1,window.clearTimeout(m.neighborTimer),t){m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,lo(t);return}W2(e.slice(),{axes:so()})}function K2(){window.clearTimeout(m.targetNeighborTimer),m.targetNeighborTimer=0,m.targetNeighborValues=null,m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0}function eh(){const e=m.pendingSelectShell;m.pendingSelectShell=null,e&&bn(e,{preferFastSource:!0})}function Jr(e,t=0){m.neighborToken+=1;const n=m.neighborToken;if(window.clearTimeout(m.neighborTimer),!e){m.neighborRenderKey="",m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationTimer=0,m.neighborHydrationItems=[],E.neighborsList.innerHTML="";return}m.neighborTimer=window.setTimeout(()=>{G2(e,n)},t)}let Sn=0,N0=0;function X2(){try{const e=JSON.parse(localStorage.getItem(ys)||"[]");m.starredIds=Array.isArray(e)?e.filter(t=>Number.isFinite(Number(t))).map(Number):[]}catch{m.starredIds=[]}}function Y2(){localStorage.setItem(ys,JSON.stringify(m.starredIds.slice(0,80)))}function P0(e){return!!(e&&m.starredIds.includes(e.id))}function R0(){if(!E.starShell)return;const e=P0(m.selected);E.starShell.setAttribute("aria-pressed",e?"true":"false"),E.starShell.title=e?"Unstar this shape":"Star this shape",E.starShell.setAttribute("aria-label",e?"Unstar this shape":"Star this shape")}function Z2(){if(!m.selected)return;window.clearTimeout(m.neighborTimer);const e=m.selected.id,t=P0(m.selected);m.starredIds=m.starredIds.filter(n=>n!==e),t||(m.starredIds.unshift(e),window.requestAnimationFrame(()=>{E.starShell.classList.remove("star-pop"),E.starShell.classList.add("star-pop"),Q2(),window.setTimeout(()=>E.starShell.classList.remove("star-pop"),850)})),R0(),di(),window.setTimeout(Y2,0)}function Q2(){var s;if(!E.starBurst||!E.starShell)return;const e=E.starShell.getBoundingClientRect(),t=(s=E.starredBand)==null?void 0:s.getBoundingClientRect(),n=e.left+e.width/2,r=e.top+e.height/2,i=t?t.left+Math.min(70,t.width*.4):n,a=t?t.top+t.height/2:r-60;E.starBurst.style.setProperty("--burst-start-x",`${n}px`),E.starBurst.style.setProperty("--burst-start-y",`${r}px`),E.starBurst.style.setProperty("--burst-end-x",`${i}px`),E.starBurst.style.setProperty("--burst-end-y",`${a}px`),E.starBurst.innerHTML="";for(let o=0;o<9;o+=1){const l=document.createElement("span");l.style.setProperty("--spark-angle",`${o*40-20}deg`),l.style.setProperty("--spark-distance",`${24+o%3*10}px`),l.style.setProperty("--spark-delay",`${o*18}ms`),E.starBurst.append(l)}E.starBurst.classList.remove("is-active"),E.starBurst.offsetWidth,E.starBurst.classList.add("is-active"),window.setTimeout(()=>E.starBurst.classList.remove("is-active"),900)}function J2(){var i;if(m.showAllStars){const a=[];for(const s of m.starredIds){const o=bs(s);o&&a.push({shell:o})}return{items:a,hidden:0}}const e=Math.max(44,((i=E.starredBand)==null?void 0:i.clientWidth)||0),t=[];let n=0,r=0;for(let a=0;a<m.starredIds.length;a+=1){const s=bs(m.starredIds[a]);if(!s)continue;const o={shell:s},l=71,u=m.starredIds.length-a-1,c=u>0?54:0;if(t.length>0&&n+l+c>e){r=u+1;break}t.push(o),n+=l}return{items:t,hidden:r}}function di(){if(!E.starredBand)return;E.starredBand.innerHTML="",m.starredHydratedCount=0,m.starredThumbs=[];const{items:e,hidden:t}=J2();for(const{shell:n}of e){const r=document.createElement("button");r.className="starred-shell",r.title=`${n.species} ${n.fingerprint_hash}`,r.dataset.shellId=String(n.id);const i=document.createElement("img");i.alt=n.species,r.append(i),m.starredThumbs.push({button:r,image:i,shell:n}),r.addEventListener("click",()=>{ci(n),bn(n)}),E.starredBand.append(r),oi(i,n)}if(t>0||m.showAllStars){const n=document.createElement("button");n.className="starred-more",n.textContent=m.showAllStars?"Less":`+${t}`,n.title=m.showAllStars?"Show fewer starred shells":"Show all starred shells",n.addEventListener("click",()=>{m.showAllStars=!m.showAllStars,di()}),E.starredBand.append(n)}er(0)}function er(e=3e3){if(!E.starredBand)return;m.starredHydrationRun+=1;const t=m.starredHydrationRun;window.clearTimeout(m.starredHydrationTimer),m.starredHydrationTimer=window.setTimeout(()=>ex(t),e)}async function ex(e){if(!E.starredBand||e!==m.starredHydrationRun)return;const t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,r=m.starredThumbs.filter(({button:i})=>{const a=i.getBoundingClientRect();return a.right>=0&&a.left<=t&&a.bottom>=0&&a.top<=n}).slice(0,18);for(const{image:i,shell:a}of r){if(e!==m.starredHydrationRun)return;if(!(!i||!a)){if(await tx(),e!==m.starredHydrationRun||!i.isConnected)return;oi(i,a)&&(m.starredHydratedCount+=1)}}}function tx(){return new Promise(e=>{"requestIdleCallback"in window?window.requestIdleCallback(e,{timeout:300}):window.setTimeout(e,80)})}function nx(e){N0=e.clientX,!Sn&&(Sn=window.requestAnimationFrame(rx))}function rx(){if(Sn=0,!E.starredBand||!m.starredThumbs.length)return;const e=E.starredBand.getBoundingClientRect();for(const{button:t}of m.starredThumbs){const n=e.left+t.offsetLeft+t.offsetWidth/2,r=Math.max(0,1-Math.abs(N0-n)/118),i=r*r*(3-2*r);t.style.setProperty("--dock-scale",(1+i*1.08).toFixed(3)),t.style.setProperty("--dock-lift",`${(18*i).toFixed(2)}px`),t.style.setProperty("--dock-z",`${Math.round(i*100)}`)}}function th(){if(E.starredBand){Sn&&(window.cancelAnimationFrame(Sn),Sn=0);for(const{button:e}of m.starredThumbs)e.style.setProperty("--dock-scale","1"),e.style.setProperty("--dock-lift","0px"),e.style.setProperty("--dock-z","0")}}function La(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_key)||(e==null?void 0:e.location_key)||"unknown"}function ix(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_label)||(e==null?void 0:e.region_label)||(e==null?void 0:e.location_label)||"Unknown"}function ax(e,t){var i,a,s;if(!t)return!0;const[n,r]=t.split(":");return r?n==="region"?((i=e==null?void 0:e.species_traits)==null?void 0:i.region_key)===r||(e==null?void 0:e.region_key)===r||(e==null?void 0:e.location_key)===r||La(e)===r:n==="country"?(e==null?void 0:e.location_key)===r||((a=e==null?void 0:e.species_traits)==null?void 0:a.primary_country)===r||(((s=e==null?void 0:e.species_traits)==null?void 0:s.known_range_countries)||[]).some(o=>o.code===r):La(e)===t:La(e)===t}function sx(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}:null}function ox(e,t){const n=sx(t);if(!n)return 1/0;if(e.color_r_mean==null||e.color_g_mean==null||e.color_b_mean==null)return null;const r=y0(e),i=r[0]-n.r,a=r[1]-n.g,s=r[2]-n.b,o=Math.min(24,Math.max(0,e.color_pattern_strength||0)*80);return Math.sqrt(i*i+a*a+s*s)-o}function lx(e,t){if(!t)return!0;const n=ox(e,t);return n==null?!0:n<=105}function ux(e,t){var n;return t==="lightness"?e.color_l_mean==null?null:ce(e.color_l_mean):t==="area"?e.area==null||e.image_width==null||e.image_height==null?null:f2(e):t==="concavity"?e.contour_concavity==null?null:ce(e.contour_concavity/.32):t==="asymmetry"?((n=e.morph_traits)==null?void 0:n.asymmetry)==null?null:ce(e.morph_traits.asymmetry):null}function nh(e){for(const t of ai){const n=m.morphFilters.get(t.key);if(!n)continue;const r=ux(e,t.key);if(r!=null&&(r<n.min||r>n.max))return!1}return!(m.categoryFilters.rarity&&e.rarity_label!==m.categoryFilters.rarity||!ax(e,m.categoryFilters.origin)||!lx(e,m.categoryFilters.color))}function Mn(){var t;const e=E.search.value.trim().toLowerCase();m.filtered=e?m.shells.filter(n=>`${n.name} ${n.species} ${n.file} ${n.fingerprint_hash||""} ${n.legacy_fingerprint_hash||""} ${n.location_label||""}`.toLowerCase().includes(e)&&nh(n)):m.shells.filter(nh),m.scatterHitCache=null,m.scatterPointCache=null,Ww(),xh(),Jr(m.selected),zn(!1),E.statusLine&&((t=m.model)!=null&&t.processed_count)&&(E.statusLine.textContent=`${m.filtered.length.toLocaleString()} of ${m.model.processed_count.toLocaleString()} shells`),O0(),We(120)}function O0(){if(!E.filtersToggle)return;let e=0;for(const t of ai){const n=m.morphFilters.get(t.key);n&&(n.min>0||n.max<1)&&(e+=1)}for(const t of Object.values(m.categoryFilters))t&&(e+=1);E.filtersToggle.textContent=e?`Filters (${e})`:"Filters",E.filtersToggle.classList.toggle("is-active",e>0)}function dx(){return[...ms().regions.map(e=>[e.value,`Continent: ${e.label}`]),...ms().countries.map(e=>[e.value,`Country: ${e.label}`])]}function ms(){var n,r,i,a,s,o;const e=new Map,t=new Map;if(m.originFilterOptionsCache)return m.originFilterOptionsCache;for(const l of m.shells){const u=((n=l.species_traits)==null?void 0:n.region_key)||l.region_key||"",c=((r=l.species_traits)==null?void 0:r.region_label)||l.region_label||"";if(u&&u!=="unknown"){const f=`region:${u}`,g=e.get(f)||{value:f,key:u,label:c||ix(l),count:0};g.count+=1,e.set(f,g)}for(const f of((i=l.species_traits)==null?void 0:i.known_range_countries)||[]){if(!f.code||!f.label)continue;const g=`country:${f.code}`,y=t.get(g)||{value:g,code:f.code,label:f.label,region:((a=l.species_traits)==null?void 0:a.region_key)||"",count:0};y.count+=Math.max(1,Number(f.count||0)),t.set(g,y)}const p=l.location_key||"";if(p&&p!=="unknown"&&p.length<=3){const f=`country:${p}`,g=t.get(f)||{value:f,code:p,label:((s=l.location_label)==null?void 0:s.split(",")[0])||p,region:((o=l.species_traits)==null?void 0:o.region_key)||"",count:0};g.count+=1,t.set(f,g)}}return m.originFilterOptionsCache={regions:[...e.values()].sort((l,u)=>l.label.localeCompare(u.label)),countries:[...t.values()].sort((l,u)=>l.label.localeCompare(u.label)||l.code.localeCompare(u.code))},m.originFilterOptionsCache}function cx(){const e=document.createElement("label");e.className="filter-row filter-panel-card filter-select-row filter-origin-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Origin";const r=document.createElement("output");r.textContent=hx(m.categoryFilters.origin),t.append(n,r);const i=document.createElement("select");i.setAttribute("aria-label","Origin");for(const[a,s]of[["","Any origin"],...dx()]){const o=document.createElement("option");o.value=a,o.textContent=s,i.append(o)}i.value=m.categoryFilters.origin||"",i.addEventListener("change",()=>{m.categoryFilters.origin=i.value,An(),Mn()}),e.append(t,i),E.filterControls.append(e)}function px(){const e=document.createElement("div");e.className="filter-row filter-panel-card rarity-filter-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Rarity";const r=document.createElement("output");r.textContent=m.categoryFilters.rarity||"Any",t.append(n,r);const i=document.createElement("div");i.className="rarity-filter-options";for(const a of["",...Dw]){const s=document.createElement("button");s.type="button",s.textContent=a||"Any",s.setAttribute("aria-pressed",(m.categoryFilters.rarity||"")===a?"true":"false"),s.addEventListener("click",()=>{m.categoryFilters.rarity=m.categoryFilters.rarity===a?"":a,An(),Mn()}),i.append(s)}e.append(t,i),E.filterControls.append(e)}function hx(e){if(!e)return"Any";const t=ms(),n=[...t.regions,...t.countries].find(r=>r.value===e);return(n==null?void 0:n.label)||"Any"}function fx(e){m.morphFilters.set(e.key,m.morphFilters.get(e.key)||{min:0,max:1});const t=document.createElement("div");t.className=`filter-row filter-panel-card filter-range-row filter-${e.key}-row`;const n=document.createElement("header"),r=document.createElement("span");r.textContent=e.label;const i=document.createElement("output"),a=m.morphFilters.get(e.key),s=lu.find(l=>Math.abs(a.min-l.min)<.01&&Math.abs(a.max-l.max)<.01);i.textContent=(s==null?void 0:s.label)||"Any",n.append(r,i);const o=document.createElement("div");o.className="filter-levels";for(const l of lu){const u=document.createElement("button");u.type="button",u.dataset.level=l.key,u.textContent=l.label,u.title=`${e.label}: ${l.label}`;const c=(s==null?void 0:s.key)===l.key;u.setAttribute("aria-pressed",c?"true":"false"),u.addEventListener("click",()=>{const p=u.getAttribute("aria-pressed")==="true";m.morphFilters.set(e.key,p?{min:0,max:1}:{min:l.min,max:l.max}),An(),Mn()}),o.append(u)}t.append(n,o),E.filterControls.append(t)}function mx(){var s;const e=document.createElement("div");e.className="filter-row filter-panel-card color-filter-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Color";const r=document.createElement("output");r.textContent=((s=uu.find(([o])=>o===m.categoryFilters.color))==null?void 0:s[1])||"Any",t.append(n,r);const i=document.createElement("div");i.className="color-filter-panel";const a=document.createElement("div");a.className="color-swatch-filter";for(const[o,l]of uu){const u=document.createElement("button");u.type="button",u.title=l,u.setAttribute("aria-label",l),u.setAttribute("aria-pressed",m.categoryFilters.color===o?"true":"false"),u.style.setProperty("--swatch",o);const c=document.createElement("span");c.className="color-swatch-dot",u.append(c),u.addEventListener("click",()=>{m.categoryFilters.color=m.categoryFilters.color===o?"":o,An(),Mn()}),a.append(u)}i.append(a),e.append(t,i),E.filterControls.append(e)}function An(){if(E.filterControls){E.filterControls.innerHTML="",cx(),px(),mx();for(const e of ai)m.morphFilters.has(e.key)||m.morphFilters.set(e.key,{min:0,max:1}),fx(e);O0()}}function gx(){for(const e of ai)m.morphFilters.set(e.key,{min:0,max:1});m.categoryFilters={origin:"",rarity:"",color:""},An(),Mn()}function ei(){var f;if(!E.filtersPanel||!E.filtersToggle||E.filtersPanel.hidden)return;const e=window.innerWidth||document.documentElement.clientWidth||1024,t=window.innerHeight||document.documentElement.clientHeight||768,n=E.filtersToggle.getBoundingClientRect(),r=(f=E.controlsPanel)==null?void 0:f.getBoundingClientRect(),i=r?e-r.right-24:0,a=e>1080&&i>=520,s=a?Math.min(460,i):Math.min(460,Math.max(340,e-24)),o=a?r.right+12:n.left,l=Math.max(12,Math.min(o,e-s-12)),u=E.filtersPanel.offsetHeight||420,c=a?n.top:n.bottom+8,p=Math.max(12,Math.min(c,t-Math.min(u,t-24)-12));E.filtersPanel.style.setProperty("--filters-left",`${Math.round(l)}px`),E.filtersPanel.style.setProperty("--filters-top",`${Math.round(p)}px`),E.filtersPanel.style.setProperty("--filters-width",`${Math.round(s)}px`)}function Fa(e){!E.filtersPanel||!E.filtersToggle||(E.filtersPanel.hidden=!e,E.filtersToggle.setAttribute("aria-expanded",e?"true":"false"),e&&(ei(),window.requestAnimationFrame(ei)))}function bx(e,t,n,r){let i=0,a=0,s=0,o=t,l=n,u=0,c=0;for(let k=0;k<e.length;k+=1){if(!e[k])continue;const I=k%t,M=Math.floor(k/t);i+=1,a+=I,s+=M,o=Math.min(o,I),l=Math.min(l,M),u=Math.max(u,I),c=Math.max(c,M)}if(i<32)throw new Error("The uploaded shell mask is too small.");const p=a/i,f=s/i,g=Math.ceil(Math.hypot(Math.max(p,t-p),Math.max(f,n-f)))+2,y=[],_=[];for(let k=0;k<r;k+=1){const I=-Math.PI/2+k/r*Math.PI*2,M=Math.cos(I),A=Math.sin(I);let $=p,O=f,U=0;for(let H=0;H<=g;H+=.75){const F=Math.round(p+M*H),K=Math.round(f+A*H);if(F<0||F>=t||K<0||K>=n)break;e[K*t+F]&&($=F,O=K,U=H)}y.push([$,O]),_.push(U)}const T=_.reduce((k,I)=>k+I,0)/Math.max(1,_.length),v=new Float32Array(r*2);for(let k=0;k<r;k+=1)v[k*2]=(y[k][0]-p)/Math.max(1e-6,T),v[k*2+1]=(y[k][1]-f)/Math.max(1e-6,T);let x=0;for(let k=0;k<_.length;k+=1)x+=Math.abs(_[k]-_[(k+1)%_.length]);const C=Math.max(1,(u-o+1)*(c-l+1));return{contour:v,center:[p,f],meanRadius:T,area:i,bbox:[o,l,u,c],aspectRatio:Math.max((u-o+1)/Math.max(1,c-l+1),(c-l+1)/Math.max(1,u-o+1)),roughness:x/Math.max(1e-6,T*_.length),concavity:ce(1-i/C)}}function yx(e,t,n){const{data:r,width:i,height:a}=e,s=new Float32Array(i*a),o=[],l=[],u=[];let c=0,p=0,f=0,g=0,y=0,_=0,T=0,v=0,x=0;for(let ie=0;ie<i*a;ie+=1){const W=ie*4;s[ie]=(.2126*r[W]+.7152*r[W+1]+.0722*r[W+2])/255}for(let ie=0;ie<t.length;ie+=1){if(!t[ie])continue;const W=ie*4,re=r[W],L=r[W+1],G=r[W+2],X=L1(re,L,G),V=Math.max(re,L,G)/255,_e=Math.min(re,L,G)/255,Ve=V<=0?0:(V-_e)/V,Ee=Math.atan2(Math.sqrt(3)*(L-G),2*re-L-G),Be=Math.max(Ve,.05);c+=re/255,p+=L/255,f+=G/255,g+=X.l,y+=X.a,_+=X.b,T+=Math.sin(Ee)*Be,v+=Math.cos(Ee)*Be,x+=Be,o.push(X.l),l.push(Math.hypot(X.a,X.b)),u.push(Ve)}const C=Math.max(1,o.length),k=ie=>ie.reduce((W,re)=>W+re,0)/Math.max(1,ie.length),I=(ie,W)=>Math.sqrt(ie.reduce((re,L)=>re+(L-W)**2,0)/Math.max(1,ie.length)),M=k(o),A=k(l),$=k(u),O=[...o].sort((ie,W)=>ie-W);let U=0,H=[];for(let ie=1;ie<a-1;ie+=1)for(let W=1;W<i-1;W+=1){const re=ie*i+W;if(!t[re])continue;const L=s[re+1]-s[re-1],G=s[re+i]-s[re-i],X=(s[re-i]+s[re+i]+s[re-1]+s[re+1]+s[re])/5;U+=Math.hypot(L,G),H.push(s[re]-X)}const F=k(H),K=I(H,F),P=jp(O,.75)-jp(O,.25),Z=ce((I(o,M)*1.7+I(l,A)*2.2+I(u,$)*.9+K*10+P*1.2+ce(U/Math.max(1,H.length)/1.5))/6),Q=ce((I(o,M)*2+K*12+P*1.3)/3),te=ce((I(l,A)*2.6+I(u,$)*1.2)/2);return{visible_shell_ratio:1,mask_ratio:n.area/Math.max(1,i*a),area:n.area,center:n.center,bbox:n.bbox,mean_radius:n.meanRadius,image_width:i,image_height:a,roughness:n.roughness,aspect_ratio:n.aspectRatio,contour_solidity:1-n.concavity,contour_concavity:n.concavity,color_r_mean:c/C,color_g_mean:p/C,color_b_mean:f/C,color_l_mean:g/C,color_l_std:I(o,M),color_a_mean:y/C,color_b_lab_mean:_/C,color_chroma_mean:A,color_chroma_std:I(l,A),color_saturation_mean:$,color_saturation_std:I(u,$),color_hue_sin:T/Math.max(1,x),color_hue_cos:v/Math.max(1,x),texture_gradient_mean:U/Math.max(1,H.length),texture_residual_std:K,texture_luma_iqr:P,color_pattern_strength:Z,color_pattern_contrast:Q,color_pattern_chroma:te}}function wx(e,t){const n=Number(t||0);return e==="aspect_ratio"?Math.log1p(Math.max(0,n)):["roughness","contour_concavity","texture_gradient_mean","texture_residual_std","color_pattern_strength","color_pattern_contrast","color_pattern_chroma"].includes(e)?Math.log1p(Math.max(0,n)*64):n}function _x(e){const t=m.model.trait_feature_schema||[],n=m.model.trait_mean||[],r=m.model.trait_components||[];if(!t.length||!r.length)return[];const i=t.map((a,s)=>{var l;let o=0;if(String(a.name||"").startsWith("contour_pc")){const u=Number(String(a.name).replace("contour_pc",""))-1;o=((l=e.contour_pc)==null?void 0:l[u])||0}else o=wx(a.name,e[a.name]);return(o-(a.mean||0))/Math.max(1e-9,a.scale||1)*(a.weight||1)-(n[s]||0)});return r.map(a=>a.reduce((s,o,l)=>s+(i[l]||0)*o,0))}async function xx(){var t;const e=(t=E.uploadInput.files)==null?void 0:t[0];if(e)try{const n=await Z1(e),r=bx(n.mask,n.imageData.width,n.imageData.height,m.contourPoints||256);r.contour=n.contour;const i=yx(n.imageData,n.mask,r),a={id:-Date.now(),file:e.name,name:`Uploaded shell ${e.name}`,species:"Uploaded shell",specimen:"",specimen_label:"Bring your own shell",view:"",view_label:"Uploaded image",component_count:1,contour_pc:C2(n.fingerprint),upload_contour:r.contour,fingerprint:n.fingerprint,...i};a.trait_pc=_x(a),a.morph_traits=S0(a),a.fingerprint_hash=await k0(n.fingerprint),a.species_sample_count=1,a.global_occurrences=0,a.rarity_label="Data deficient",a.rarity_reason="uploaded image",a.location_label="Uploaded image",a.location_key="uploaded",a.location_color=Zr("uploaded"),a.species_color=Zr(a.species),m.uploadImageUrl&&URL.revokeObjectURL(m.uploadImageUrl),m.uploadImageUrl=n.imageUrl||URL.createObjectURL(e),m.shells=[a,...m.shells.filter(s=>s.id>=0)],m.filtered=[a,...m.filtered.filter(s=>s.id>=0)],m.shellById.set(a.id,a),ci(a),bn(a),E.statusLine.textContent="Uploaded shell projected"}catch(n){E.statusLine.textContent=n.message||"Upload failed"}finally{E.uploadInput.value=""}}function uo(e=!0){m.walkingPca=!1,window.cancelAnimationFrame(m.walkFrame),E.walkPca.textContent="Walk",E.walkPca.setAttribute("aria-pressed","false"),e&&Ht()}function B0(e){if(!m.walkingPca)return;m.walkStartedAt||(m.walkStartedAt=e);const t=(e-m.walkStartedAt)/1e3,n=[...m.pcValues];for(let r=0;r<sr();r+=1){const i=m.model.contour_pca_ranges[r],a=i?i.p99-i.p01:1;n[r]=Math.sin(t*(.32+r*.045)+r*1.73)*a*(.18+r*.018)}co(n,!1),m.walkFrame=window.requestAnimationFrame(B0)}function vx(){if(m.walkingPca){uo();return}m.walkingPca=!0,m.walkStartedAt=0,E.walkPca.textContent="Stop",E.walkPca.setAttribute("aria-pressed","true"),m.walkFrame=window.requestAnimationFrame(B0)}function $x(){uo(!1),co(Array.from({length:m.model.contour_component_count||sr()},()=>0))}function Wa(e){!E.settingsPanel||!E.settingsToggle||(E.settingsPanel.hidden=!e,E.settingsToggle.setAttribute("aria-expanded",e?"true":"false"))}function Sx(){if(window.confirm("Clear saved shell images, starred shells, and local settings?")){e2();try{localStorage.removeItem(ys)}catch{}window.location.hash="",window.location.reload()}}function kx(){var e,t,n,r,i,a,s,o,l;E.search.addEventListener("input",Mn),(e=E.filtersToggle)==null||e.addEventListener("click",()=>{var u;return Fa(((u=E.filtersPanel)==null?void 0:u.hidden)!==!1)}),(t=E.closeFilters)==null||t.addEventListener("click",()=>Fa(!1)),(n=E.settingsToggle)==null||n.addEventListener("click",u=>{var c;u.stopPropagation(),Wa(((c=E.settingsPanel)==null?void 0:c.hidden)!==!1)}),(r=E.settingsPanel)==null||r.addEventListener("click",u=>u.stopPropagation()),(i=E.clearAllData)==null||i.addEventListener("click",Sx),document.addEventListener("keydown",u=>{u.key==="Escape"&&(Fa(!1),Wa(!1))}),document.addEventListener("click",()=>{Wa(!1)}),E.randomShell.addEventListener("click",Rx),(a=E.resetTraitFilters)==null||a.addEventListener("click",gx),E.xAxisSelect.addEventListener("change",()=>uh(Number(E.xAxisSelect.value),m.yAxis)),E.yAxisSelect.addEventListener("change",()=>uh(m.xAxis,Number(E.yAxisSelect.value))),E.colorModeSelect.addEventListener("change",()=>{m.colorMode=E.colorModeSelect.value,We(),Ht()}),E.meanShape.addEventListener("click",$x),E.walkPca.addEventListener("click",vx),E.starShell.addEventListener("click",Z2),E.uploadShell.addEventListener("click",()=>E.uploadInput.click()),E.uploadInput.addEventListener("change",xx),E.exportSvg.addEventListener("click",P2),(s=E.starredBand)==null||s.addEventListener("pointermove",nx),(o=E.starredBand)==null||o.addEventListener("pointerleave",()=>{th(),er(1200)}),(l=E.starredBand)==null||l.addEventListener("pointercancel",th),E.zoomIn.addEventListener("click",()=>qa(.72)),E.zoomOut.addEventListener("click",()=>qa(1.38)),E.resetView.addEventListener("click",()=>{m.viewport=li(m.xAxis,m.yAxis),We()}),E.scatter.addEventListener("wheel",u=>{if(u.preventDefault(),er(1800),u.shiftKey){const c=E.scatter.getBoundingClientRect();qa(u.deltaY>0?1.12:.88,{x:u.clientX-c.left,y:u.clientY-c.top});return}Fx(u.deltaX,u.deltaY)}),E.scatter.addEventListener("pointerdown",u=>{if(u.button===1){u.preventDefault(),E.scatter.setPointerCapture(u.pointerId),zx(u);return}if(u.button!==0)return;m.holdingNearest=!0;const c=E.scatter.getBoundingClientRect(),p=gs(u.clientX-c.left,u.clientY-c.top);m.pendingSelectShell=p,p?Jr(p,16):(m.draggingTarget=!0,m.targetDragStart={pointerId:u.pointerId,clientX:u.clientX,clientY:u.clientY,active:!1,ignoreRealShells:!0},E.pointTooltip.hidden=!0)}),E.scatter.addEventListener("pointermove",u=>{if(m.panningViewport){u.preventDefault(),Mx(u);return}if(m.draggingTarget){const c=m.targetDragStart;if(c&&!c.active){if(Math.hypot(u.clientX-c.clientX,u.clientY-c.clientY)<4)return;c.active=!0}ih(u),E.pointTooltip.hidden=!0;return}if(m.holdingNearest){E.pointTooltip.hidden=!0;return}Px(u)}),E.scatter.addEventListener("mousedown",u=>{if(u.button!==0||m.draggingTarget||m.holdingNearest||m.panningViewport)return;m.holdingNearest=!0;const c=E.scatter.getBoundingClientRect(),p=gs(u.clientX-c.left,u.clientY-c.top);m.pendingSelectShell=p,p?Jr(p,16):(m.draggingTarget=!0,m.targetDragStart={pointerId:-1,clientX:u.clientX,clientY:u.clientY,active:!1,ignoreRealShells:!0},E.pointTooltip.hidden=!0)}),E.scatter.addEventListener("mousemove",u=>{if(!m.draggingTarget||(u.buttons&1)!==1)return;const c=m.targetDragStart;if(c&&!c.active){if(Math.hypot(u.clientX-c.clientX,u.clientY-c.clientY)<4)return;c.active=!0}ih(u),E.pointTooltip.hidden=!0});for(const u of["pointerup","pointercancel"])E.scatter.addEventListener(u,c=>{var g,y,_;const p=u==="pointerup"&&m.draggingTarget&&!((g=m.targetDragStart)!=null&&g.active);ah(),p&&ti(c);const f=u==="pointerup";m.holdingNearest=!1,m.draggingTarget=!1,m.targetDragStart=null,m.targetEvent=null,Ax(),f?eh():m.pendingSelectShell=null;try{(_=(y=E.scatter).hasPointerCapture)!=null&&_.call(y,c.pointerId)&&E.scatter.releasePointerCapture(c.pointerId)}catch{}u!=="pointerup"&&(E.pointTooltip.hidden=!0)});window.addEventListener("mouseup",u=>{var p;if(!m.holdingNearest&&!m.draggingTarget)return;const c=m.draggingTarget&&!((p=m.targetDragStart)!=null&&p.active);ah(),c&&ti(u),m.holdingNearest=!1,m.draggingTarget=!1,m.targetDragStart=null,m.targetEvent=null,eh()}),E.scatter.addEventListener("pointerleave",()=>{m.draggingTarget||m.panningViewport||(E.pointTooltip.hidden=!0)}),E.scatter.addEventListener("auxclick",u=>{u.button===1&&u.preventDefault()}),window.addEventListener("resize",()=>{We(),A0(m.selected),zn(),di(),ei()}),window.addEventListener("scroll",()=>{ei(),er(1800)},!0),window.addEventListener("wheel",()=>er(1800),{passive:!0,capture:!0})}function bn(e,{renderNearest:t=!0,preferFastSource:n=!1}={}){var r;if(!e)return;m.selectionRun+=1,m.sourceToken+=1,window.clearTimeout(m.sourceLoadTimer),window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationTimer=0,m.neighborHydrationItems=[],m.walkingPca&&uo(!1),e.id>=0&&m.uploadImageUrl&&(URL.revokeObjectURL(m.uploadImageUrl),m.uploadImageUrl=""),m.selected=e,E.sourceSpinner&&(E.sourceSpinner.hidden=!0),E.sourceImage&&(E.sourceImage.hidden=!0,E.sourceImage.removeAttribute("src")),e.id>=0&&m.mapShellImageIds.add(e.id),m.selectedContour=C0(e),m.generatedContour=m.selectedContour,m.generatedTraits=I0(e),m.generatedMode="selected",(e.contour_pc||[]).forEach((a,s)=>{m.pcValues[s]=a,or(s,a)}),E.selectedName.textContent=e.species,z0(),R0(),E.selectedDetails.innerHTML="";const i=[["Fingerprint",e.fingerprint_hash||"-"],["Rarity",e.rarity_label||"Data deficient"],["Origin",w2(e)]];if(e.area!=null&&e.image_width!=null&&e.image_height!=null&&i.push(["Area",`${mt(m2(e),2)} cm²`]),e.mean_radius!=null&&e.image_width!=null&&e.image_height!=null&&i.push(["Mean radius",`${mt(g2(e),2)} cm`]),e.color_l_mean!=null&&i.push(["Lightness",Da(e.color_l_mean)]),e.contour_concavity!=null&&i.push(["Concavity",Da(e.contour_concavity/.32)]),((r=e.morph_traits)==null?void 0:r.asymmetry)!=null&&i.push(["Asymmetry",Da(e.morph_traits.asymmetry)]),e.image_width!=null&&e.image_height!=null){const a=to(e);i.push(["Scale",`${mt(a.widthCm,2)} x ${mt(a.heightCm,2)} cm frame`])}for(const[a,s]of i){const o=document.createElement("dt");o.textContent=a;const l=document.createElement("dd");l.textContent=s,E.selectedDetails.append(o,l)}m.sourceFrame=null,A0(e,{preferFastSource:n}),t?Jr(e):E.neighborsList.innerHTML="",M0(),zn(!1),We(120),Ht()}function gs(e,t){const n=fn(E.scatter,he),r=v0(n);let i=null,a=1/0;const s=Math.floor(e/r.cellSize),o=Math.floor(t/r.cellSize);for(let l=0;l<=1;l+=1){for(let u=o-l;u<=o+l;u+=1)for(let c=s-l;c<=s+l;c+=1){if(l&&c>s-l&&c<s+l&&u>o-l&&u<o+l)continue;const p=r.grid.get(`${c},${u}`);if(p)for(const f of p){const g=r.points[f*2]-e,y=r.points[f*2+1]-t,_=g*g+y*y;_<a&&(a=_,i=r.shells[f])}}if(a<=196)break}return a<=196?i:null}function Tx(e,t,n,r=4){m.screenNeighborScanCount+=1;const i=fn(E.scatter,he),a=v0(i);if(!a.shells.length)return[];const s=Math.floor(e/a.cellSize),o=Math.floor(t/a.cellSize),l=[],u=new Set;let c=-1,p=-1;const f=Math.ceil(Math.max(i.width,i.height)/a.cellSize);for(let g=0;g<=f;g+=1){for(let y=o-g;y<=o+g;y+=1)for(let _=s-g;_<=s+g;_+=1){if(g&&_>s-g&&_<s+g&&y>o-g&&y<o+g)continue;const T=a.grid.get(`${_},${y}`);if(T)for(const v of T){if(u.has(v))continue;u.add(v);const x=a.points[v*2]-e,C=a.points[v*2+1]-t,k=x*x+C*C;if(l.length<r){l.push({screenDistance:k,shell:a.shells[v]}),k>p&&(p=k,c=l.length-1);continue}if(!(k>=p)){l[c]={screenDistance:k,shell:a.shells[v]},p=-1;for(let I=0;I<l.length;I+=1)l[I].screenDistance>p&&(p=l[I].screenDistance,c=I)}}}if(l.length>=r&&g>=2)break}return l.sort((g,y)=>g.screenDistance-y.screenDistance),l.map(g=>{const y=ui(g.shell,n,so());return{distance:Math.sqrt(y.rawSq),similarity:oo(y),shell:g.shell}})}function Cx(e,t){m.xAxis>=0&&m.xAxis<e.length&&(e[m.xAxis]=t.x),m.yAxis>=0&&m.yAxis<e.length&&m.yAxis!==m.xAxis&&(e[m.yAxis]=t.y)}function Ix(e,t){const n=so(),r=new Set(n),i=(t||[]).map(a=>({distance:ui(a.shell,e,n).normalizedSq,shell:a.shell})).sort((a,s)=>a.distance-s.distance);if(!i.length)return e;if(i[0].distance<1e-10){const a=i[0].shell.contour_pc||[];for(let s=0;s<e.length;s+=1)r.has(s)||(e[s]=a[s]||0);return e}for(let a=0;a<e.length;a+=1){if(r.has(a))continue;let s=0,o=0;for(const l of i){const u=l.shell.contour_pc||[];if(a>=u.length)continue;const c=1/Math.max(l.distance,1e-6);s+=(u[a]||0)*c,o+=c}e[a]=o?s/o:0}return e}function rh(e,t=null){var i;const n=Math.max(((i=m.model)==null?void 0:i.contour_component_count)||0,m.pcValues.length,sr()),r=Array.from({length:n},()=>0);return Cx(r,e),Ix(r,t)}function Ex(e,{updateControls:t=!0}={}){e.forEach((n,r)=>{m.pcValues[r]=n,t&&or(r,n)}),io()}function ti(e,{updateControls:t=!1}={}){const n=E.scatter.getBoundingClientRect(),r=fn(E.scatter,he),i=e.clientX-n.left,a=e.clientY-n.top,s=b0(i,a,r),o=rh(s),l=Tx(i,a,o,8),u=rh(s,l);Ex(u,{updateControls:t}),t||D0(u),j2(u,l.slice(0,4)),We(),Ht()}function ih(e){m.targetEvent={clientX:e.clientX,clientY:e.clientY},!m.targetFrame&&(m.targetFrame=window.requestAnimationFrame(()=>{m.targetFrame=0;const t=m.targetEvent;t&&ti(t)}))}function ah(){var t;m.targetFrame&&(window.cancelAnimationFrame(m.targetFrame),m.targetFrame=0);const e=m.targetEvent;m.targetEvent=null,e&&((t=m.targetDragStart)!=null&&t.active)&&ti(e),D0()}function zx(e){const t=E.scatter.getBoundingClientRect();m.panningViewport={pointerId:e.pointerId,startX:e.clientX-t.left,startY:e.clientY-t.top,viewport:{...m.viewport}},m.draggingTarget=!1,m.targetDragStart=null,m.targetEvent=null,m.pendingSelectShell=null,K2(),m.targetFrame&&(window.cancelAnimationFrame(m.targetFrame),m.targetFrame=0),m.holdingNearest=!1,E.scatter.classList.add("is-panning"),E.pointTooltip.hidden=!0}function Mx(e){if(!m.panningViewport||m.panningViewport.pointerId!==e.pointerId)return;const t=E.scatter.getBoundingClientRect(),n=fn(E.scatter,he),r=m.panningViewport,i=r.viewport,a=(e.clientX-t.left-r.startX)/n.width*(i.maxX-i.minX),s=(e.clientY-t.top-r.startY)/n.height*(i.maxY-i.minY);m.viewport={minX:i.minX-a,maxX:i.maxX-a,minY:i.minY+s,maxY:i.maxY+s},We()}function Ax(){m.panningViewport&&(m.panningViewport=null,E.scatter.classList.remove("is-panning"),Ht())}function Nx(e,t){if(!t){E.pointTooltip.hidden=!0;return}const n=E.scatter.getBoundingClientRect(),r=document.createElement("strong");r.textContent=t.species;const i=[r,document.createTextNode(t.file),document.createElement("br"),document.createTextNode(`${t.specimen_label||t.specimen||"Unknown specimen"}, ${t.view_label||t.view||"Unknown view"}`),document.createElement("br"),document.createTextNode(`${ds(m.xAxis)} ${mt(St(t,m.xAxis))}, ${ds(m.yAxis)} ${mt(St(t,m.yAxis))}`)];t.color_l_mean!=null&&i.push(document.createElement("br"),document.createTextNode(`${E2(t)}, lightness ${mt(t.color_l_mean,3)}`)),E.pointTooltip.replaceChildren(...i),E.pointTooltip.style.left=`${Math.min(Math.max(8,n.width-248),Math.max(8,e.clientX-n.left+14))}px`,E.pointTooltip.style.top=`${Math.min(Math.max(8,n.height-84),Math.max(8,e.clientY-n.top+14))}px`,E.pointTooltip.hidden=!1}function Px(e){m.tooltipEvent={clientX:e.clientX,clientY:e.clientY},!m.tooltipFrame&&(m.tooltipFrame=requestAnimationFrame(()=>{m.tooltipFrame=0;const t=performance.now();if(t-m.tooltipLastAt<60)return;m.tooltipLastAt=t;const n=m.tooltipEvent;if(!n)return;const r=E.scatter.getBoundingClientRect();Nx(n,gs(n.clientX-r.left,n.clientY-r.top))}))}function bs(e){const t=Number(e);return Number.isFinite(t)&&m.shellById.get(t)||null}function ci(e){if(!m.viewport||!e)return;const t=m.viewport.maxX-m.viewport.minX,n=m.viewport.maxY-m.viewport.minY,r=St(e,m.xAxis),i=St(e,m.yAxis);m.viewport={minX:r-t/2,maxX:r+t/2,minY:i-n/2,maxY:i+n/2}}function Rx(){const e=m.filtered.length?m.filtered:m.shells;if(!e.length)return;const t=Vw(e)||Ga(e);t&&(ci(t),bn(t,{preferFastSource:!0,renderNearest:!1}),We(420))}function sh(e){return`https://www.iucnredlist.org/search?query=${encodeURIComponent(e||"")}&searchType=species`}function Ur(e){return String(e||"").trim().toLowerCase()}function Ox(e){const t=String(e||"").trim().toUpperCase();return{EX:"Extinct",EW:"Extinct in the wild",CR:"Critically endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near threatened",LC:"Least concern",DD:"Data deficient"}[t]||t}function oh(e){return e&&e.place==null&&e.place_id==null}function lh(e){return/iucn/i.test(String((e==null?void 0:e.authority)||""))||Number((e==null?void 0:e.iucn)||0)>0}function Bx(...e){const t=[];for(const n of e)n&&(n.conservation_status&&t.push(n.conservation_status),Array.isArray(n.conservation_statuses)&&t.push(...n.conservation_statuses));return t.find(n=>oh(n)&&lh(n))||t.find(n=>lh(n))||t.find(n=>oh(n))||t[0]||null}function Dx(e){if(!e)return"Not assessed";const t=String(e.status||"").trim().toUpperCase(),n=e.status_name||e.description||Ox(t)||t,r=String(n||"").trim();return r?!t||r.toUpperCase().includes(`(${t})`)||r.toUpperCase()===t?r:`${r} (${t})`:"Not assessed"}function Ux(e,t){const n=Ur(t);return e.find(r=>Ur(r.name)===n)||e.find(r=>Ur(r.matched_term)===n)||e.find(r=>r.rank==="species")||e[0]||null}async function Lx(e,{signal:t=null}={}){var n;const r=Ur(e);if(!r)return{status:"Not assessed",authority:"",url:"",taxonId:null};if(m.conservationCache.has(r))return m.conservationCache.get(r);const i=new URLSearchParams({q:e,per_page:"8"}),a={status:"Not assessed",authority:"iNaturalist",url:sh(e),taxonId:null};try{const s=await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${i.toString()}`,{signal:t});if(!s.ok)return a;const o=await s.json(),l=Ux(o.results||[],e);if(!(l!=null&&l.id))return m.conservationCache.set(r,a),a;let u=l;const c=await fetch(`https://api.inaturalist.org/v1/taxa/${l.id}`,{signal:t});c.ok&&(u=((n=(await c.json()).results)==null?void 0:n[0])||l);const p=Bx(u,l),f={status:Dx(p),authority:(p==null?void 0:p.authority)||"iNaturalist",url:(p==null?void 0:p.url)||sh(e),taxonId:l.id};return m.conservationCache.set(r,f),f}catch(s){if((s==null?void 0:s.name)==="AbortError")throw s;return a}}function qa(e,t=null){const n=fn(E.scatter,he),r=t||{x:n.width/2,y:n.height/2},i=b0(r.x,r.y,n),a=m.viewport,s=li(m.xAxis,m.yAxis),o=s.maxX-s.minX,l=s.maxY-s.minY,u=Math.max(o*.04,.001),c=Math.max(l*.04,.001),p=Math.max(o*8,u),f=Math.max(l*8,c),g=Math.max(u,Math.min(p,(a.maxX-a.minX)*e)),y=Math.max(c,Math.min(f,(a.maxY-a.minY)*e));m.viewport={minX:i.x-r.x/n.width*g,maxX:i.x+(1-r.x/n.width)*g,minY:i.y-(n.height-r.y)/n.height*y,maxY:i.y+r.y/n.height*y},We()}function Fx(e,t){const n=fn(E.scatter,he),r=m.viewport;if(!r||!n.width||!n.height)return;const i=e/n.width*(r.maxX-r.minX),a=t/n.height*(r.maxY-r.minY);m.viewport={minX:r.minX+i,maxX:r.maxX+i,minY:r.minY-a,maxY:r.maxY-a},We()}function Wx(){const e=m0();for(const t of[E.xAxisSelect,E.yAxisSelect]){t.innerHTML="";for(let n=0;n<e;n+=1){const r=document.createElement("option");r.value=String(n),r.textContent=`${ds(n)} (${mt(o2(n)*100,1)}%)`,t.append(r)}}E.xAxisSelect.value=String(m.xAxis),E.yAxisSelect.value=String(m.yAxis)}function uh(e,t){m.xAxis=e,m.yAxis=t,E.xAxisSelect.value=String(e),E.yAxisSelect.value=String(t),m.viewport=li(e,t),We(120),Ht()}function qx(){E.pcControls.innerHTML="";const e=sr();m.pcValues=Array.from({length:m.model.contour_component_count||e},()=>0),m.pcControlRows=[];for(let t=0;t<e;t+=1){const n=m.model.contour_pca_ranges[t],r=n?n.p01:-1,i=n?n.p99:1,a=Math.max((i-r)/500,.001),s=document.createElement("div");s.className="pc-row";const o=document.createElement("label");o.textContent=g0(t);const l=document.createElement("input");l.type="range",l.min=String(r),l.max=String(i),l.step=String(a),l.value="0";const u=document.createElement("input");u.type="number",u.step=String(a),u.value="0.000",l.addEventListener("input",()=>dh(t,Number(l.value))),u.addEventListener("change",()=>dh(t,Number(u.value))),s.append(o,l,u),m.pcControlRows[t]={slider:l,number:u},E.pcControls.append(s)}}function or(e,t){const n=m.pcControlRows[e];n&&(n.slider.value=String(t),n.number.value=Number(t).toFixed(3))}function D0(e=m.pcValues){e.forEach((t,n)=>or(n,t))}function dh(e,t){m.pcValues[e]=t,or(e,t),io(),We(),Ht()}function co(e,t=!0){e.forEach((n,r)=>{m.pcValues[r]=n,or(r,n)}),io(),We(),t&&Ht()}window.shellspacePerf={selectedId:()=>{var e;return((e=m.selected)==null?void 0:e.id)??null},neighborCacheSize:()=>m.neighborCache.size,surpriseQueueSize:()=>m.surpriseQueue.length,surpriseReadyCount:()=>m.surpriseQueue.length,scatterPointCount:()=>{var e,t;return((t=(e=m.scatterPointCache)==null?void 0:e.shells)==null?void 0:t.length)||0},starredHydratedCount:()=>m.starredHydratedCount,screenNeighborScanCount:()=>m.screenNeighborScanCount,resetScreenNeighborScanCount:()=>{m.screenNeighborScanCount=0},sourceMode:()=>m.sourceMode,filteredCount:()=>m.filtered.length,lookupConservationStatus:Lx,conservationStatusForSelected:()=>w0(m.selected),selectSpecies:e=>{const t=m.shells.find(n=>n.species===e);return t&&bn(t),(t==null?void 0:t.id)??null}};async function Vx(){kx(),cs("Opening fingerprint data");const{model:e,shells:t}=await I2();m.model=e,m.shells=t,m.shellById=new Map(m.shells.map(p=>[p.id,p])),v2(m.shells,null,null),An(),m.filtered=m.shells,m.contours=null,m.contourPoints=e.contour_points||0,m.contourScale=e.contour_scale||1;const n=e.species_count?`${e.processed_count.toLocaleString()} shells, ${e.species_count.toLocaleString()} species`:`${e.processed_count.toLocaleString()} shells`;E.statusLine.textContent=n;const r=Uw();Pw.includes(r.get("color"))&&(m.colorMode=r.get("color"));const i=m0(),a=r.get("x"),s=r.get("y"),o=a==null?NaN:Number(a),l=s==null?NaN:Number(s);Number.isInteger(o)&&o>=0&&o<i&&(m.xAxis=o),Number.isInteger(l)&&l>=0&&l<i&&(m.yAxis=l),m.viewport=li(m.xAxis,m.yAxis),Wx(),qx(),E.colorModeSelect.value=m.colorMode,X2(),n2(m.shells),E.statusLine.textContent=n,m.suppressHash=!0;const u=bs(r.get("id"))||m.shells[0];bn(u,{renderNearest:!1});const c=(r.get("pc")||"").split(",").filter(p=>p.trim()!=="").map(p=>Number(p)).filter(p=>Number.isFinite(p));c.length&&co(c.slice(0,6),!1),m.suppressHash=!1,m.hashReady=!0,di(),zn(),We(),_h(),cs("",!1),xh()}function Hx(){dw(),Vx().catch(e=>{E.statusLine.textContent=e.message,cs("",!1),E.missingData&&(E.missingData.hidden=!1),console.error(e)})}const Gx=Object.freeze(Object.defineProperty({__proto__:null,startShellspace:Hx},Symbol.toStringTag,{value:"Module"}));
