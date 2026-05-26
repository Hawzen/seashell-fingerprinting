var b_=Object.defineProperty;var y_=(e,t,n)=>t in e?b_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Pe=(e,t,n)=>y_(e,typeof t!="symbol"?t+"":t,n);const w_="modulepreload",__=function(e){return"/"+e},qu={},x_=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){let o=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=o(n.map(u=>{if(u=__(u),u in qu)return;qu[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":w_,c||(f.as="script"),f.crossOrigin="",f.href=u,l&&f.setAttribute("nonce",l),document.head.appendChild(f),c)return new Promise((g,b)=>{f.addEventListener("load",g),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return i.then(o=>{for(const s of o||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})};let v_=uf;const Un=1,oi=2,of={owned:null,cleanups:null,context:null,owner:null};var Ge=null;let oa=null,$_=null,$t=null,tt=null,mn=null,Ii=0;function S_(e,t){const n=$t,r=Ge,i=e.length===0,a=t===void 0?r:t,o=i?of:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>zi(()=>xr(o)));Ge=o,$t=null;try{return Mi(s,!0)}finally{$t=n,Ge=r}}function si(e,t,n){const r=C_(e,t,!1,Un);sf(r)}function zi(e){if($t===null)return e();const t=$t;$t=null;try{return e()}finally{$t=t}}function k_(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&Mi(()=>{for(let i=0;i<e.observers.length;i+=1){const a=e.observers[i],o=oa&&oa.running;o&&oa.disposed.has(a),(o?!a.tState:!a.state)&&(a.pure?tt.push(a):mn.push(a),a.observers&&df(a)),o||(a.state=Un)}if(tt.length>1e6)throw tt=[],new Error},!1)),t}function sf(e){if(!e.fn)return;xr(e);const t=Ii;T_(e,e.value,t)}function T_(e,t,n){let r;const i=Ge,a=$t;$t=Ge=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=Un,e.owned&&e.owned.forEach(xr),e.owned=null),e.updatedAt=n+1,cf(o)}finally{$t=a,Ge=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?k_(e,r):e.value=r,e.updatedAt=n)}function C_(e,t,n,r=Un,i){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Ge,context:Ge?Ge.context:null,pure:n};return Ge===null||Ge!==of&&(Ge.owned?Ge.owned.push(a):Ge.owned=[a]),a}function lf(e){if(e.state===0)return;if(e.state===oi)return _o(e);if(e.suspense&&zi(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Ii);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===Un)sf(e);else if(e.state===oi){const r=tt;tt=null,Mi(()=>_o(e,t[0]),!1),tt=r}}function Mi(e,t){if(tt)return e();let n=!1;t||(tt=[]),mn?n=!0:mn=[],Ii++;try{const r=e();return E_(n),r}catch(r){n||(mn=null),tt=null,cf(r)}}function E_(e){if(tt&&(uf(tt),tt=null),e)return;const t=mn;mn=null,t.length&&Mi(()=>v_(t),!1)}function uf(e){for(let t=0;t<e.length;t++)lf(e[t])}function _o(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===Un?r!==t&&(!r.updatedAt||r.updatedAt<Ii)&&lf(r):i===oi&&_o(r,t)}}}function df(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=oi,n.pure?tt.push(n):mn.push(n),n.observers&&df(n))}}function xr(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const a=i.pop(),o=n.observerSlots.pop();r<i.length&&(a.sourceSlots[o]=r,i[r]=a,n.observerSlots[r]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)xr(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)xr(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function I_(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function cf(e,t=Ge){throw I_(e)}function Ye(e,t){return zi(()=>e(t||{}))}function z_(e,t,n){let r=n.length,i=t.length,a=r,o=0,s=0,l=t[i-1].nextSibling,u=null;for(;o<i||s<a;){if(t[o]===n[s]){o++,s++;continue}for(;t[i-1]===n[a-1];)i--,a--;if(i===o){const c=a<r?s?n[s-1].nextSibling:n[a-s]:l;for(;s<a;)e.insertBefore(n[s++],c)}else if(a===s)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[a-1]&&n[s]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(n[s++],t[o++].nextSibling),e.insertBefore(n[--a],c),t[i]=n[a]}else{if(!u){u=new Map;let p=s;for(;p<a;)u.set(n[p],p++)}const c=u.get(t[o]);if(c!=null)if(s<c&&c<a){let p=o,f=1,g;for(;++p<i&&p<a&&!((g=u.get(t[p]))==null||g!==c+f);)f++;if(f>c-s){const b=t[o];for(;s<c;)e.insertBefore(n[s++],b)}else e.replaceChild(n[s++],t[o++])}else o++;else t[o++].remove()}}}function M_(e,t,n,r={}){let i;return S_(a=>{i=a,t===document?e():Tt(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function rt(e,t,n,r){let i;const a=()=>{const s=document.createElement("template");return s.innerHTML=e,s.content.firstChild},o=()=>(i||(i=a())).cloneNode(!0);return o.cloneNode=o,o}function A_(e,t){t==null?e.removeAttribute("class"):e.className=t}function oe(e,t,n){return zi(()=>e(t,n))}function Tt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return li(e,t,r,n);si(i=>li(e,t(),i,n),r)}function li(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(o){let s=n[0];s&&s.nodeType===3?s.data!==t&&(s.data=t):s=document.createTextNode(t),n=In(e,n,r,s)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=In(e,n,r);else{if(a==="function")return si(()=>{let s=t();for(;typeof s=="function";)s=s();n=li(e,s,n,r)}),()=>n;if(Array.isArray(t)){const s=[],l=n&&Array.isArray(n);if(xo(s,t,n,i))return si(()=>n=li(e,s,n,r,!0)),()=>n;if(s.length===0){if(n=In(e,n,r),o)return n}else l?n.length===0?Vu(e,s,r):z_(e,n,s):(n&&In(e),Vu(e,s));n=s}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=In(e,n,r,t);In(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function xo(e,t,n,r){let i=!1;for(let a=0,o=t.length;a<o;a++){let s=t[a],l=n&&n[e.length],u;if(!(s==null||s===!0||s===!1))if((u=typeof s)=="object"&&s.nodeType)e.push(s);else if(Array.isArray(s))i=xo(e,s,l)||i;else if(u==="function")if(r){for(;typeof s=="function";)s=s();i=xo(e,Array.isArray(s)?s:[s],Array.isArray(l)?l:[l])||i}else e.push(s),i=!0;else{const c=String(s);l&&l.nodeType===3&&l.data===c?e.push(l):e.push(document.createTextNode(c))}}return i}function Vu(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function In(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let a=!1;for(let o=t.length-1;o>=0;o--){const s=t[o];if(i!==s){const l=s.parentNode===e;!a&&!o?l?e.replaceChild(i,s):e.insertBefore(i,n):l&&s.remove()}else a=!0}}else e.insertBefore(i,n);return[i]}const N_=`@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600;700;800&display=swap");

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

.settings-check {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--ink);
  font-size: 13px;
  line-height: 1.25;
}

.settings-check input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--teal);
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

.pca-guide-button {
  /* width: 26px; */
  min-height: 26px;
  padding: 0;
  border-radius: 50%;
  font-weight: 800;
  font-style: normal;
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

.filter-select-row select,
.filter-select-row input {
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
  grid-template-columns: repeat(var(--color-filter-columns, 8), minmax(0, 1fr));
  gap: 6px;
  width: 100%;
}

.color-swatch-filter button {
  aspect-ratio: 1;
  min-width: 0;
  min-height: 0;
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

.color-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 7px 10px;
  align-items: center;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.2;
}

.color-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
}

.color-legend-dot {
  width: 10px;
  height: 10px;
  flex: 0 0 10px;
  border: 1px solid rgba(31, 38, 40, 0.12);
  border-radius: 50%;
}

.color-legend-gradient {
  display: grid;
  width: 100%;
  gap: 4px;
}

.color-legend-gradient > span:first-child {
  height: 8px;
  border: 1px solid rgba(31, 38, 40, 0.1);
  border-radius: 999px;
}

.color-legend-labels {
  display: flex;
  justify-content: space-between;
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

.source-inspect-toggle,
.source-cursor-toggle {
  position: absolute;
  bottom: 10px;
  z-index: 5;
  width: 29px;
  min-width: 29px;
  height: 29px;
  min-height: 29px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 1px solid rgba(49, 67, 66, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  color: #314342;
  box-shadow: 0 8px 20px rgba(37, 36, 31, 0.14);
  backdrop-filter: blur(8px);
}

.source-inspect-toggle {
  right: 10px;
}

.source-cursor-toggle {
  right: 45px;
}

.source-inspect-toggle:hover,
.source-inspect-toggle[aria-pressed="true"],
.source-cursor-toggle:hover,
.source-cursor-toggle[aria-pressed="true"] {
  background: rgba(23, 117, 113, 0.92);
  color: white;
  border-color: rgba(23, 117, 113, 0.9);
}

.source-cursor-toggle svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.source-inspect-toggle span {
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0;
}

.shell-cursor-active,
.shell-cursor-active * {
  cursor: var(--shell-cursor), auto !important;
}

.source-inspect {
  width: 100%;
  height: min(340px, 38vh);
  max-height: 340px;
  padding: 10px 10px 56px;
  display: grid;
  background: #f7f4ec;
}

.source-frame.is-inspecting .source-image,
.source-frame.is-inspecting .source-spinner {
  display: none;
}

.source-fingerprint-json {
  width: 100%;
  height: 100%;
  resize: none;
  padding: 10px;
  border: 1px solid rgba(49, 67, 66, 0.16);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.82);
  color: #213937;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  line-height: 1.45;
  outline: none;
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

.svg-export,
.draw-shell-button {
  position: absolute;
  top: 10px;
  min-height: 28px;
  padding: 4px 7px;
  font-size: 12px;
}

.svg-export {
  right: 10px;
  min-width: 42px;
}

.draw-shell-button {
  right: 60px;
  width: 32px;
  min-width: 32px;
  padding: 0;
  display: grid;
  place-items: center;
}

.draw-shell-button[aria-pressed="true"] {
  background: var(--teal);
  border-color: var(--teal);
  color: white;
}

.draw-shell-button svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.projection-frame.is-drawing .outline-canvas {
  cursor: crosshair;
  touch-action: none;
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
  min-width: 0;
  padding: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0;
  cursor: pointer;
}

.palette-swatch:last-child {
  border-right: 0;
}

.palette-swatch[aria-pressed="true"] {
  box-shadow: inset 0 0 0 3px rgba(31, 117, 111, 0.82);
}

.loading-overlay {
  --loader-ink: #6a4a39;
  --loader-shell: #c98268;
  --loader-light: #f4c879;
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 18px;
  background: var(--paper);
  color: var(--loader-ink);
  opacity: 1;
  transition: opacity 220ms ease, background 220ms ease;
}

.loading-overlay.is-loader-preview {
  pointer-events: none;
  background: rgba(248, 245, 238, 0.82);
  backdrop-filter: blur(2px);
}

.loading-overlay.is-fading-out {
  opacity: 0;
}

.loading-overlay.is-loader-preview .rpg-loader {
  filter: none;
}

.loading-overlay.is-loader-preview p {
  opacity: 0;
}

.pca-guide-modal {
  position: fixed;
  inset: 0;
  z-index: 35;
  display: grid;
  place-items: center;
  padding: 24px;
}

.pca-guide-modal[hidden] {
  display: none;
}

.pca-guide-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(26, 30, 32, 0.46);
  backdrop-filter: blur(4px);
}

.pca-guide-dialog {
  position: relative;
  z-index: 1;
  width: min(920px, calc(100vw - 20px));
  max-height: min(820px, calc(100vh - 20px));
  overflow: auto;
  padding: 10px;
  border-radius: 6px;
  background: var(--panel);
  box-shadow: 0 18px 48px rgba(24, 28, 30, 0.24);
}

.pca-guide-dialog > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.pca-guide-dialog h2 {
  margin: 0;
  font-size: 16px;
}

.pca-guide-title {
  display: grid;
  gap: 3px;
}

.pca-guide-title p {
  margin: 0;
  max-width: 680px;
  color: #3f4a4c;
  font-size: 14px;
  line-height: 1.4;
}

.pca-guide-dialog > header button {
  width: 30px;
  min-height: 30px;
  padding: 0;
}

.pca-guide-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.pca-guide-row {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.pca-guide-row-header {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 10px;
}

.pca-guide-row h3 {
  margin: 0;
  padding: 0 2px;
  border-radius: 3px;
  border-bottom: 1px dashed rgba(31, 117, 111, 0.68);
  font-size: 13px;
  font-style: italic;
  cursor: text;
  outline: 0;
}

.pca-guide-row h3:focus {
  background: rgba(31, 117, 111, 0.08);
  box-shadow: 0 0 0 2px rgba(31, 117, 111, 0.1);
}

.pca-guide-shells {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.pca-guide-shell {
  display: grid;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.pca-guide-shell-frame {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 3px;
  background: transparent;
}

.pca-guide-shell img,
.pca-guide-shell canvas {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pca-guide-empty {
  margin: 0;
  color: var(--muted);
}

.rpg-loader {
  position: relative;
  width: 190px;
  height: 150px;
  image-rendering: pixelated;
  transform: scale(1.15);
  animation: loader-wobble 1.2s steps(2, end) infinite;
}

.loader-shadow {
  position: absolute;
  left: 48px;
  top: 124px;
  width: 94px;
  height: 10px;
  border-radius: 50%;
  background: rgba(31, 36, 42, 0.22);
  opacity: 0.68;
  animation: shadow-blip 1.2s steps(2, end) infinite;
}

.loader-aura {
  display: none;
}

.loader-shell {
  position: absolute;
  left: 31px;
  width: 128px;
  height: 50px;
  box-sizing: border-box;
  border: 4px solid var(--loader-ink);
  background: var(--loader-shell);
  overflow: hidden;
  box-shadow: 0 5px 0 var(--loader-ink);
}

.loader-shell::before {
  content: "";
  position: absolute;
  inset: 7px 10px auto;
  height: 10px;
  background: var(--loader-light);
}

.loader-shell-top {
  top: 37px;
  z-index: 4;
  border-radius: 56px 56px 8px 8px;
  transform-origin: 50% 100%;
  animation: shell-top-chomp 1.2s steps(1, end) infinite;
}

.loader-shell-bottom {
  top: 82px;
  z-index: 2;
  border-radius: 8px 8px 56px 56px;
  transform-origin: 50% 0;
  animation: shell-bottom-chomp 1.2s steps(1, end) infinite;
}

.loader-shell-bottom::before {
  top: auto;
  bottom: 7px;
}

.shell-rib {
  position: absolute;
  width: 5px;
  height: 60px;
  background: #9b5d4d;
  opacity: 0.85;
}

.loader-shell-top .shell-rib {
  bottom: -18px;
  transform-origin: 50% 100%;
}

.loader-shell-bottom .shell-rib {
  top: -18px;
  transform-origin: 50% 0;
}

.rib-1 { left: 24px; transform: rotate(-28deg); }

.rib-2 { left: 46px; transform: rotate(-13deg); }

.rib-3 { left: 62px; transform: rotate(0deg); }

.rib-4 { left: 82px; transform: rotate(13deg); }

.rib-5 { left: 105px; transform: rotate(28deg); }

.shell-lip {
  position: absolute;
  left: -4px;
  right: -4px;
  height: 10px;
  background: #f7d997;
  border: 4px solid var(--loader-ink);
}

.loader-shell-top .shell-lip { bottom: -6px; }

.loader-shell-bottom .shell-lip { top: -6px; }

.loader-pearl {
  position: absolute;
  left: 73px;
  top: 67px;
  z-index: 3;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid var(--loader-ink);
  background:
    radial-gradient(circle at 28% 24%, #fffaf0 0 8%, transparent 9%),
    radial-gradient(circle at 64% 68%, #e8c384 0 18%, transparent 19%),
    #fff2cf;
  box-shadow:
    inset -7px -8px 0 #d9a85f,
    inset 5px 4px 0 #fff8dd,
    0 4px 0 var(--loader-ink);
  opacity: 0;
  animation: pearl-pop 1.2s steps(1, end) infinite;
}

.loader-pearl::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 7px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #fff5c8;
  opacity: 0;
  animation: pearl-light-core 1.2s steps(1, end) infinite;
}

.loader-pearl::after {
  content: "";
  position: absolute;
  left: 2px;
  top: 1px;
  width: 24px;
  height: 24px;
  background: #fff5c8;
  opacity: 0;
  clip-path: polygon(50% 0, 58% 38%, 100% 50%, 58% 62%, 50% 100%, 42% 62%, 0 50%, 42% 38%);
  animation: pearl-light-star 1.2s steps(1, end) infinite;
}

.pearl-spark {
  position: absolute;
  background: #fff5c8;
  opacity: 0;
  pointer-events: none;
  animation: pearl-light-ray 1.2s steps(1, end) infinite;
}

.spark-1 {
  left: 11px;
  top: -16px;
  width: 5px;
  height: 15px;
}

.spark-2 {
  left: 30px;
  top: 5px;
  width: 15px;
  height: 5px;
  animation-delay: 0.03s;
}

.spark-3 {
  left: -8px;
  top: 8px;
  width: 14px;
  height: 5px;
  transform: rotate(-45deg);
  animation-delay: 0.06s;
}

.loading-overlay p {
  margin: 0;
  color: var(--loader-ink);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.8;
  text-shadow: none;
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

@keyframes loader-wobble {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1.15);
  }
  25% {
    transform: translate(-2px, 1px) rotate(-1deg) scale(1.15);
  }
  50% {
    transform: translate(2px, -1px) rotate(1deg) scale(1.15);
  }
  75% {
    transform: translate(0, 2px) rotate(0deg) scale(1.15);
  }
}

@keyframes shadow-blip {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0.82);
  }
}

@keyframes shell-top-chomp {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  18% {
    transform: translateY(-18px) rotate(-7deg);
  }
  32% {
    transform: translateY(-24px) rotate(6deg);
  }
  48% {
    transform: translateY(-19px) rotate(-4deg);
  }
  64% {
    transform: translateY(0) rotate(0deg);
  }
  72% {
    transform: translateY(-6px) rotate(-2deg);
  }
  80% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes shell-bottom-chomp {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  18% {
    transform: translateY(9px) rotate(4deg);
  }
  32% {
    transform: translateY(13px) rotate(-3deg);
  }
  48% {
    transform: translateY(10px) rotate(2deg);
  }
  64% {
    transform: translateY(0) rotate(0deg);
  }
  72% {
    transform: translateY(3px) rotate(1deg);
  }
  80% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes pearl-pop {
  0%,
  17%,
  74%,
  100% {
    opacity: 0;
    transform: translateY(17px) scale(0.32) rotate(0deg);
    filter: brightness(1);
  }
  18% {
    opacity: 1;
    transform: translateY(4px) scale(0.85) rotate(-5deg);
    filter: brightness(1);
  }
  32% {
    opacity: 1;
    transform: translateY(-12px) scale(1.08) rotate(4deg);
    filter: brightness(1);
  }
  48%,
  54% {
    opacity: 1;
    transform: translateY(-7px) scale(1) rotate(0deg);
    filter: brightness(1);
  }
  55% {
    opacity: 1;
    transform: translateY(-7px) scale(0.96) rotate(0deg);
    filter: brightness(1.05);
  }
  58% {
    opacity: 1;
    transform: translateY(-8px) scale(1.08) rotate(0deg);
    filter: brightness(1.85);
  }
  61% {
    opacity: 1;
    transform: translateY(-8px) scale(1.03) rotate(0deg);
    filter: brightness(1.45);
  }
  64%,
  70% {
    opacity: 1;
    transform: translateY(-7px) scale(1) rotate(0deg);
    filter: brightness(1.08);
  }
}

@keyframes pearl-light-halo {
  0%,
  54%,
  66%,
  100% {
    opacity: 0;
    transform: scale(0.55);
  }
  55% {
    opacity: 0.45;
    transform: scale(0.75);
  }
  58% {
    opacity: 1;
    transform: scale(1);
  }
  61% {
    opacity: 0.55;
    transform: scale(0.86);
  }
  64% {
    opacity: 0;
    transform: scale(0.7);
  }
}

@keyframes pearl-light-core {
  0%,
  54%,
  66%,
  100% {
    opacity: 0;
    transform: scale(0.4);
  }
  55% {
    opacity: 1;
    transform: scale(0.8);
  }
  58% {
    opacity: 1;
    transform: scale(1.35);
  }
  61% {
    opacity: 1;
    transform: scale(0.95);
  }
  64% {
    opacity: 0;
    transform: scale(0.45);
  }
}

@keyframes pearl-light-star {
  0%,
  54%,
  66%,
  100% {
    opacity: 0;
    transform: scale(0.15) rotate(0deg);
  }
  55% {
    opacity: 1;
    transform: scale(0.8) rotate(0deg);
  }
  58% {
    opacity: 1;
    transform: scale(1.55) rotate(45deg);
  }
  61% {
    opacity: 1;
    transform: scale(0.9) rotate(45deg);
  }
  64% {
    opacity: 0;
    transform: scale(0.2) rotate(90deg);
  }
}

@keyframes pearl-light-ray {
  0%,
  55%,
  66%,
  100% {
    opacity: 0;
  }
  58%,
  61% {
    opacity: 1;
  }
  64% {
    opacity: 0;
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

  .pca-guide-modal {
    padding: 8px;
  }

  .pca-guide-dialog {
    width: calc(100vw - 16px);
    max-height: calc(100vh - 16px);
    padding: 8px;
  }

  .pca-guide-list {
    grid-template-columns: 1fr;
  }

  .pc-row {
    grid-template-columns: 82px 1fr;
  }

  .pc-row input[type="number"] {
    grid-column: 2;
  }
}
`,m={shells:[],filtered:[],contours:null,contourPoints:0,contourScale:1,model:null,viewport:null,selected:null,selectedContour:null,generatedContour:null,generatedTraits:null,generatedMode:"selected",uploadImageUrl:"",xAxis:0,yAxis:1,colorMode:"roughness",pcValues:[],pcaAxisNames:[],pcControlRows:[],morphFilters:new Map,categoryFilters:{origin:"",rarity:"",color:""},conservationCache:new Map,starredIds:[],showAllStars:!1,speciesCounts:new Map,speciesTraits:new Map,localityMatchRate:0,drawFrame:0,drawTimer:0,sourceFrame:null,sourceMode:"fallback",sourceInspectOpen:!1,sourceCursorActive:!1,sourceCursorUrl:"",scatterHitCache:null,screenNeighborScanCount:0,starredHydrationTimer:0,starredHydrationRun:0,starredHydratedCount:0,starredThumbs:[],tooltipFrame:0,tooltipEvent:null,tooltipLastAt:0,holdingNearest:!1,pendingSelectShell:null,targetFrame:0,targetEvent:null,targetNeighborTimer:0,targetNeighborValues:null,targetNeighborLastAt:0,draggingTarget:!1,targetDragStart:null,panningViewport:null,walkingPca:!1,walkFrame:0,walkStartedAt:0,hashReady:!1,suppressHash:!1,hashTimer:0,needsDraw:!0,sourceToken:0,sourceLoadTimer:0,selectionRun:0,scatterPointCache:null,shellById:new Map,surpriseQueue:[],surpriseQueueSource:null,surprisePrimeTimer:0,neighborCache:new Map,neighborTimer:0,neighborHydrationTimer:0,neighborHydrationItems:[],neighborHydrationUnsubscribers:[],neighborSearchRun:0,neighborSearchTimer:0,neighborToken:0,neighborRenderKey:"",pointColorCache:new Map,originFilterOptionsCache:null,showPoppedShells:!0,mapShellImageIds:new Set},S={};let fe=null,De=null;function P_(){fe=S.scatter.getContext("2d"),De=S.outline.getContext("2d")}const Wr=new Map,sa=new Map,ui=new Map,at=new Map,mr=new Map;var R_=rt('<aside class="panel controls-panel">'),O_=rt('<section class="panel-section search-section"><div class=search-row><label class=field><span>Search</span><input type=search placeholder="Species or Shellprint"></label><button class=filters-toggle title="Open filters"aria-expanded=false>Filters</button></div><div class=filters-popover hidden><header><h2>Filters</h2><button title="Close filters"aria-label="Close filters">x</button></header><div class=filter-controls></div><div class=filter-actions><button title="Reset filters">Reset</button></div></div><div class=shell-action-row><button class=surprise-shell title="Surprise me"aria-label="Surprise me"><svg viewBox="0 0 24 24"aria-hidden=true><rect x=4 y=4 width=16 height=16 rx=3.5></rect><circle cx=8.5 cy=8.5 r=1.2></circle><circle cx=15.5 cy=8.5 r=1.2></circle><circle cx=12 cy=12 r=1.2></circle><circle cx=8.5 cy=15.5 r=1.2></circle><circle cx=15.5 cy=15.5 r=1.2></circle></svg></button><button class=upload-shell title="Bring your own shell"><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 16V5"></path><path d="M7.5 9.5 12 5l4.5 4.5"></path><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"></path></svg><span>Bring your own shell</span></button></div><input type=file accept=image/* hidden><div class=section-title><h2>Map<button class=pca-guide-button title="Explain PCA axes"aria-label="Explain PCA axes">?</button></h2></div><div class=axis-grid><label><span>X</span><select></select></label><label><span>Y</span><select></select></label></div><label class=field><span>Color</span><select></select></label><div class=color-legend hidden>'),B_=rt('<section class="panel-section physical-shell"><div class=section-title><h2>Physical Shell <span class="fingerprint-chip compact">------</span></h2><button class=star-button title="Star this shape"aria-label="Star this shape"aria-pressed=false><svg class=star-icon viewBox="0 0 24 24"aria-hidden=true><path class=star-shape d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z"></path></svg></button></div><div class=source-frame><div class=source-spinner hidden></div><img class=source-image alt hidden><div class=source-inspect hidden></div><button class=source-inspect-toggle title="Show fingerprint values"aria-label="Show fingerprint values"aria-pressed=false><span aria-hidden=true>{}</span></button><button class=source-cursor-toggle title="Use shell as cursor"aria-label="Use shell as cursor"aria-pressed=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M6 3.5 18.5 14l-6.1 1.1-3.2 5.4L6 3.5Z"></path><path d="m12.4 15.1 3 5.4"></path></svg></button></div><div class=selected-name>None</div><dl></dl><div class=color-palette><h2>Palette</h2><div class=palette-swatches>');function D_(){return(()=>{var e=R_();return oe(t=>{S.controlsPanel=t},e),Tt(e,Ye(L_,{}),null),Tt(e,Ye(U_,{}),null),e})()}function L_(){return(()=>{var e=O_(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,o=t.nextSibling,s=o.firstChild,l=s.firstChild,u=l.nextSibling,c=s.nextSibling,p=c.nextSibling,f=p.firstChild,g=o.nextSibling,b=g.firstChild,x=b.nextSibling,T=g.nextSibling,w=T.nextSibling,v=w.firstChild,E=v.firstChild,C=E.nextSibling,I=w.nextSibling,M=I.firstChild,A=M.firstChild,$=A.nextSibling,O=M.nextSibling,L=O.firstChild,H=L.nextSibling,K=I.nextSibling,X=K.firstChild,P=X.nextSibling,Z=K.nextSibling;return oe(W=>{S.search=W},i),oe(W=>{S.filtersToggle=W},a),oe(W=>{S.filtersPanel=W},o),oe(W=>{S.closeFilters=W},u),oe(W=>{S.filterControls=W},c),oe(W=>{S.resetTraitFilters=W},f),oe(W=>{S.randomShell=W},b),oe(W=>{S.uploadShell=W},x),oe(W=>{S.uploadInput=W},T),oe(W=>{S.pcaGuideOpen=W},C),oe(W=>{S.xAxisSelect=W},$),oe(W=>{S.yAxisSelect=W},H),oe(W=>{S.colorModeSelect=W},P),oe(W=>{S.colorLegend=W},Z),e})()}function U_(){return(()=>{var e=B_(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,o=t.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,c=u.nextSibling,p=c.nextSibling,f=o.nextSibling,g=f.nextSibling,b=g.nextSibling,x=b.firstChild,T=x.nextSibling;return oe(w=>{S.physicalHash=w},i),oe(w=>{S.starShell=w},a),oe(w=>{S.sourceFrameBox=w},o),oe(w=>{S.sourceSpinner=w},s),oe(w=>{S.sourceImage=w},l),oe(w=>{S.sourceInspect=w},u),oe(w=>{S.sourceInspectToggle=w},c),oe(w=>{S.sourceCursorToggle=w},p),oe(w=>{S.selectedName=w},f),oe(w=>{S.selectedDetails=w},g),oe(w=>{S.paletteSwatches=w},T),e})()}var F_=rt('<section class=scatter-panel aria-label="PCA scatter plot"><canvas class=scatter-canvas></canvas><div class=point-tooltip hidden>');function W_(){return(()=>{var e=F_(),t=e.firstChild,n=t.nextSibling;return oe(r=>{S.scatter=r},t),oe(r=>{S.pointTooltip=r},n),e})()}var q_=rt('<div class=loading-overlay><div class=rpg-loader aria-hidden=true><div class=loader-shadow></div><div class=loader-aura></div><div class=loader-pearl><span class="pearl-spark spark-1"></span><span class="pearl-spark spark-2"></span><span class="pearl-spark spark-3"></span></div></div><p>Opening shell data'),V_=rt("<div class=missing-data hidden><div><h2>Processed Data Missing</h2><p>Build FFT fingerprints, export static data, then refresh the app.</p><code>make fingerprints export-static"),H_=rt("<div class=pca-guide-modal hidden><div class=pca-guide-backdrop></div><section class=pca-guide-dialog role=dialog aria-modal=true aria-labelledby=pca-guide-title><header><div class=pca-guide-title><h2 id=pca-guide-title>PCA Axes</h2><p>Here are the shells that showcase the most variance within a given PCA, while minimizing variance of other axes</p></div><button title=Close aria-label=Close>x</button></header><div class=pca-guide-list>"),G_=rt('<div><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip>');function j_(){return(()=>{var e=q_(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=t.nextSibling;return oe(o=>{S.loadingOverlay=o},e),Tt(t,Ye(Hu,{position:"top"}),i),Tt(t,Ye(Hu,{position:"bottom"}),i),oe(o=>{S.loadingText=o},a),e})()}function K_(){return(()=>{var e=V_();return oe(t=>{S.missingData=t},e),e})()}function X_(){return(()=>{var e=H_(),t=e.firstChild,n=t.nextSibling,r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=r.nextSibling;return oe(s=>{S.pcaGuideModal=s},e),oe(s=>{S.pcaGuideClose=s},a),oe(s=>{S.pcaGuideList=s},o),e})()}function Hu(e){return(()=>{var t=G_();return si(()=>A_(t,`loader-shell loader-shell-${e.position}`)),t})()}var Y_=rt('<aside class="panel lab-panel">'),Q_=rt('<section class="panel-section projected-lab"><div class=generated-shape><div class=section-title><h2>Projected Shell <span class="fingerprint-chip compact">------</span></h2></div><div class=projection-frame><canvas class=outline-canvas width=420 height=420></canvas><button class=svg-export title="Export generated shell as SVG">SVG</button><button class=draw-shell-button title="Draw shell and project it"aria-label="Draw shell and project it"aria-pressed=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M4 17.8c3.8-6.7 7.4-6.7 10.8 0 1.4 2.8 3.2 2.8 5.2 0"></path><path d="M15.2 4.8 19.2 8.8"></path><path d="M5.8 18.2 15.9 8.1l3.2 3.2L9 21.4l-4.1.7.9-3.9Z"></path></svg></button></div></div><div class=slider-stack><div class=section-title><h2>Contour PCs</h2><div class=title-actions><button title="Reset contour coordinates">Mean</button><button title="Animate through contour PCA space">Walk</button></div></div><div class=pc-controls>'),Z_=rt('<section class="panel-section neighbors"><div class=section-title><h2>Nearest Shells</h2></div><div class=neighbors-list>');function J_(){return(()=>{var e=Y_();return Tt(e,Ye(e1,{}),null),Tt(e,Ye(t1,{}),null),e})()}function e1(){return(()=>{var e=Q_(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=n.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,c=t.nextSibling,p=c.firstChild,f=p.firstChild,g=f.nextSibling,b=g.firstChild,x=b.nextSibling,T=p.nextSibling;return oe(w=>{S.projectedHash=w},a),oe(w=>{S.outline=w},s),oe(w=>{S.exportSvg=w},l),oe(w=>{S.drawProjectedShell=w},u),oe(w=>{S.meanShape=w},b),oe(w=>{S.walkPca=w},x),oe(w=>{S.pcControls=w},T),e})()}function t1(){return(()=>{var e=Z_(),t=e.firstChild,n=t.nextSibling;return oe(r=>{S.neighborsList=r},n),e})()}var n1=rt('<header class=topbar><div class=brand-block><h1>Shellspace 🐚</h1><p class=status-line>Loading shell model</p></div><div class=starred-band aria-label="Starred shells"></div><div class=star-burst aria-hidden=true></div><div class=top-actions><button title="Zoom out">-</button><button title="Zoom in">+</button><button title="Reset map view">Reset</button><button class=settings-toggle title=Settings aria-label=Settings aria-expanded=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"></path><path d="m19 13.3.1-1.3-.1-1.3 2-1.5-1.9-3.2-2.4 1a8.6 8.6 0 0 0-2.2-1.3L14.2 3h-4.4l-.3 2.7A8.6 8.6 0 0 0 7.3 7L4.9 6 3 9.2l2 1.5-.1 1.3.1 1.3-2 1.5L4.9 18l2.4-1a8.6 8.6 0 0 0 2.2 1.3l.3 2.7h4.4l.3-2.7a8.6 8.6 0 0 0 2.2-1.3l2.4 1 1.9-3.2-2-1.5Z"></path></svg></button></div><div class=settings-panel hidden><section><h2>Settings</h2><label class=settings-check><input type=checkbox><span>Show shells on map</span></label><button class=danger-button>Clear all data</button></section><section><h2>Controls</h2><ul><li>Two-finger pan moves the map.</li><li>Shift + two-finger pan zooms.</li><li>Click empty space projects a shell there.</li><li>Drag empty space walks through PCA space.');function r1(){return(()=>{var e=n1(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=t.nextSibling,a=i.nextSibling,o=a.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,c=u.nextSibling,p=o.nextSibling,f=p.firstChild,g=f.firstChild,b=g.nextSibling,x=b.firstChild,T=b.nextSibling;return oe(w=>{S.statusLine=w},r),oe(w=>{S.starredBand=w},i),oe(w=>{S.starBurst=w},a),oe(w=>{S.zoomOut=w},s),oe(w=>{S.zoomIn=w},l),oe(w=>{S.resetView=w},u),oe(w=>{S.settingsToggle=w},c),oe(w=>{S.settingsPanel=w},p),oe(w=>{S.showPoppedShells=w},x),oe(w=>{S.clearAllData=w},T),e})()}var i1=rt("<main class=workspace>");function a1(){return[Ye(r1,{}),(()=>{var e=i1();return Tt(e,Ye(D_,{}),null),Tt(e,Ye(W_,{}),null),Tt(e,Ye(J_,{}),null),e})(),Ye(j_,{}),Ye(K_,{}),Ye(X_,{})]}const pf=document.body.firstElementChild;if(!pf)throw new Error("Missing app root");const hf=document.createElement("style");hf.textContent=N_;document.head.append(hf);M_(()=>Ye(a1,{}),pf);x_(async()=>{const{startShellspace:e}=await Promise.resolve().then(()=>i3);return{startShellspace:e}},[]).then(({startShellspace:e})=>e());const ff=[{key:"species",label:"Species"},{key:"locality",label:"Location"},{key:"conservation",label:"Conservation"},{key:"shell",label:"Shell color"},{key:"pattern",label:"Pattern"},{key:"lightness",label:"Lightness"},{key:"roughness",label:"Roughness"},{key:"rarity",label:"Rarity"},{key:"concavity",label:"Concavity"}],o1=ff.map(e=>e.key),jo="shellspace-starred",s1="0.27.7",mf=`https://cdn.jsdelivr.net/pyodide/v${s1}/full/`,l1=`${mf}pyodide.js`,u1=String.raw`
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
`,Ko=[{key:"lightness",label:"Lightness",format:"percent"},{key:"area",label:"Area",format:"percent"},{key:"concavity",label:"Concavity",format:"percent"},{key:"roughness",label:"Roughness",format:"percent"}],Gu=[{key:"low",label:"Low",min:0,max:1/3},{key:"medium",label:"Medium",min:1/3,max:2/3},{key:"high",label:"High",min:2/3,max:1}],ju=["Common","Uncommon","Rare"];function d1(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;return new URLSearchParams(e)}function gf(){if(!m.hashReady||m.suppressHash)return;const e=new URLSearchParams;m.selected&&e.set("id",String(m.selected.id)),e.set("x",String(m.xAxis)),e.set("y",String(m.yAxis)),e.set("color",m.colorMode),e.set("pc",m.pcValues.slice(0,6).map(n=>Number(n).toFixed(3)).join(","));const t=`${window.location.pathname}${window.location.search}#${e.toString()}`;window.history.replaceState(null,"",t)}function Qt(){!m.hashReady||m.suppressHash||(window.clearTimeout(m.hashTimer),m.hashTimer=window.setTimeout(gf,80))}function Sn(e,t){const n=e.getBoundingClientRect(),r=window.devicePixelRatio||1,i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r));return(e.width!==i||e.height!==a)&&(e.width=i,e.height=a,t.setTransform(r,0,0,r,0,0),e===S.scatter&&(m.needsDraw=!0,m.scatterHitCache=null,m.scatterPointCache=null)),{width:n.width,height:n.height}}function c1(e){if(!e||e.id<0||!e.file)return Promise.resolve(null);if(sa.has(e.file))return sa.get(e.file);const t=new Promise(n=>{const r=new Image;r.decoding="async",r.onload=()=>n(r),r.onerror=()=>n(null),r.src=Z2(e.file)});return sa.set(e.file,t),t}function p1(e,t=1200){if("requestIdleCallback"in window){window.requestIdleCallback(e,{timeout:t});return}window.setTimeout(e,Math.min(t,160))}function vo(e,t=(n=>(n=m.selected)==null?void 0:n.id)()){if(!e.length)return null;let r=Math.floor(Math.random()*e.length);return t!=null&&e.length>1&&e[r].id===t&&(r=(r+1+Math.floor(Math.random()*(e.length-1)))%e.length),e[r]}function h1(){m.surpriseQueue=[],m.surpriseQueueSource=null,window.clearTimeout(m.surprisePrimeTimer),m.surprisePrimeTimer=0}function f1(e){const t=new Set(m.surpriseQueue.map(r=>{var i;return(i=r.shell)==null?void 0:i.id}));let n=null;for(let r=0;r<12;r+=1){const i=vo(e);if(!(!i||t.has(i.id))){n=i;break}}n||(n=vo(e)),n&&m.surpriseQueue.push({shell:n,ready:!0})}function bf(e=m.filtered,t=12,n=80){e.length&&(m.surpriseQueueSource!==e&&(m.surpriseQueue=[],m.surpriseQueueSource=e),window.clearTimeout(m.surprisePrimeTimer),m.surprisePrimeTimer=window.setTimeout(()=>{p1(()=>{for(;m.surpriseQueue.length<t;)f1(e)},500)},n))}function m1(e){var t;if(m.surpriseQueueSource!==e||!m.surpriseQueue.length)return null;for(let n=0;n<m.surpriseQueue.length;n+=1){const r=m.surpriseQueue[n];if(!(!(r!=null&&r.shell)||r.shell.id===((t=m.selected)==null?void 0:t.id)))return m.surpriseQueue.splice(n,1),r.shell}return null}/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Xo=Object.defineProperty,g1=Object.getOwnPropertyDescriptor,b1=Object.getOwnPropertyNames,y1=Object.prototype.hasOwnProperty,w1=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),Fn=(e,t)=>{for(var n in t)Xo(e,n,{get:t[n],enumerable:!0})},_1=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of b1(t))!y1.call(e,i)&&i!==n&&Xo(e,i,{get:()=>t[i],enumerable:!(r=g1(t,i))||r.enumerable});return e},vr=e=>_1(Xo({},"__esModule",{value:!0}),e),Yn,Ht,Nn,Ku,yf,wf=q(()=>{Yn=new Map,Ht=[],Nn=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Yn.get(e);if(r===void 0)Yn.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let i=Ht.indexOf(e);i!==-1&&Ht.splice(i,1);for(let a=0;a<Ht.length;a++)if(Yn.get(Ht[a]).priority<=n){Ht.splice(a,0,e);return}Ht.push(e)}return}throw new TypeError("not a valid backend")},Ku=async e=>{let t=Yn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},yf=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?Ht:n,i,a=[],o=new Set;for(let l of r){let u=await Ku(l);typeof u=="string"?a.push({name:l,err:u}):(i||(i=u),i===u&&o.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:u}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${u}`);let s=t.filter(l=>o.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,u)=>u==="executionProviders"?s:Reflect.get(l,u)})]}}),x1=q(()=>{wf()}),_f,v1=q(()=>{_f="1.26.0"}),la,Le,xf=q(()=>{v1(),la="warning",Le={wasm:{},webgl:{},webgpu:{},versions:{common:_f},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);la=e}},get logLevel(){return la}},Object.defineProperty(Le,"logLevel",{enumerable:!0})}),Se,$1=q(()=>{xf(),Se=Le}),vf,$f,S1=q(()=>{vf=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let o=(t==null?void 0:t.format)!==void 0?t.format:"RGB",s=t==null?void 0:t.norm,l,u;s===void 0||s.mean===void 0?l=[255,255,255,255]:typeof s.mean=="number"?l=[s.mean,s.mean,s.mean,s.mean]:(l=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(l[3]=s.mean[3])),s===void 0||s.bias===void 0?u=[0,0,0,0]:typeof s.bias=="number"?u=[s.bias,s.bias,s.bias,s.bias]:(u=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(u[3]=s.bias[3]));let c=a*i,p=0,f=c,g=c*2,b=-1;o==="RGBA"?(p=0,f=c,g=c*2,b=c*3):o==="RGB"?(p=0,f=c,g=c*2):o==="RBG"&&(p=0,g=c,f=c*2);for(let x=0;x<a;x++)for(let T=0;T<i;T++){let w=(e.data[p++]-u[0])*l[0],v=(e.data[f++]-u[1])*l[1],E=(e.data[g++]-u[2])*l[2],C=b===-1?255:(e.data[b++]-u[3])*l[3];r.fillStyle="rgba("+w+","+v+","+E+","+C+")",r.fillRect(T,x,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},$f=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let i,a,o;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],o=e.dims[3]):(i=e.dims[3],a=e.dims[2],o=e.dims[1]);let s=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,u,c;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let p=a*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,g=0,b=1,x=2,T=3,w=0,v=p,E=p*2,C=-1;s==="RGBA"?(w=0,v=p,E=p*2,C=p*3):s==="RGB"?(w=0,v=p,E=p*2):s==="RBG"&&(w=0,E=p,v=p*2),r=n.createImageData(i,a);for(let I=0;I<a*i;g+=f,b+=f,x+=f,T+=f,I++)r.data[g]=(e.data[w++]-c[0])*u[0],r.data[b]=(e.data[v++]-c[1])*u[1],r.data[x]=(e.data[E++]-c[2])*u[2],r.data[T]=C===-1?255:(e.data[C++]-c[3])*u[3]}else throw new Error("Can not access image data");return r}}),qr,Sf,kf,Tf,Cf,Ef,k1=q(()=>{Yo(),qr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,o;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?o=[i.bias,i.bias,i.bias,i.bias]:o=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",u=n*r,c=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3),p=4,f=0,g=1,b=2,x=3,T=0,w=u,v=u*2,E=-1;s==="RGB"&&(p=3,f=0,g=1,b=2,x=-1),l==="RGBA"?E=u*3:l==="RBG"?(T=0,v=u,w=u*2):l==="BGR"&&(v=0,w=u,T=u*2);for(let C=0;C<u;C++,f+=p,b+=p,g+=p,x+=p)c[T++]=(e[f]+o[0])/a[0],c[w++]=(e[g]+o[1])/a[1],c[v++]=(e[b]+o[2])/a[2],E!==-1&&x!==-1&&(c[E++]=(e[x]+o[3])/a[3]);return l==="RGBA"?new et("float32",c,[1,4,n,r]):new et("float32",c,[1,3,n,r])},Sf=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",o,s=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=l();c.width=e.width,c.height=e.height;let p=u(c);if(p!=null){let f=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(s=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=f,s.width=g}else s.tensorFormat="RGBA",s.height=f,s.width=g;p.drawImage(e,0,0),o=p.getImageData(0,0,g,f).data}else throw new Error("Can not access image data")}else if(r){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=e.height,p=e.width),t!==void 0&&(s=t),s.format="RGBA",s.height=c,s.width=p,t!==void 0){let f=l();f.width=p,f.height=c;let g=u(f);if(g!=null)g.putImageData(e,0,0),o=g.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else o=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let p=u(c);if(p!=null){let f=e.height,g=e.width;return p.drawImage(e,0,0,g,f),o=p.getImageData(0,0,g,f).data,s.height=f,s.width=g,qr(o,s)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,p)=>{let f=l(),g=u(f);if(!e||!g)return p();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{f.width=b.width,f.height=b.height,g.drawImage(b,0,0,f.width,f.height);let x=g.getImageData(0,0,f.width,f.height);s.height=f.height,s.width=f.width,c(qr(x.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return qr(o,s);throw new Error("Input data provided is not supported - aborted tensor creation")},kf=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t,o=[1,r,n,4];return new et({location:"texture",type:"float32",texture:e,dims:o,download:i,dispose:a})},Tf=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:i,dispose:a})},Cf=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:i,dispose:a})},Ef=(e,t,n)=>new et({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),dn,lr,ua,If,T1=q(()=>{dn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),lr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ua=!1,If=()=>{if(!ua){ua=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(dn.set("int64",BigInt64Array),lr.set(BigInt64Array,"int64")),t&&(dn.set("uint64",BigUint64Array),lr.set(BigUint64Array,"uint64")),r?(dn.set("float16",n),lr.set(n,"float16")):dn.set("float16",Uint16Array)}}}),zf,Mf,C1=q(()=>{Yo(),zf=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Mf=(e,t)=>{switch(e.location){case"cpu":return new et(e.type,e.data,t);case"cpu-pinned":return new et({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new et({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new et({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new et({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),et,Yo=q(()=>{S1(),k1(),T1(),C1(),et=class{constructor(e,t,n){If();let r,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case"cpu-pinned":{let o=dn.get(r);if(!o)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,s;if(typeof e=="string")if(r=e,s=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let l=dn.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?o=l.from(t,BigInt):o=l.from(t)}else if(t instanceof l)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(s=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",o=e;else if(l==="boolean")r="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",o=Uint8Array.from(e);else{let l=lr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,o=e}if(s===void 0)s=[o.length];else if(!Array.isArray(s))throw new TypeError("A tensor's dims must be a number array");i=s,this.cpuData=o,this.dataLocation="cpu"}let a=zf(i);if(this.cpuData&&a!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return Sf(e,t)}static fromTexture(e,t){return kf(e,t)}static fromGpuBuffer(e,t){return Tf(e,t)}static fromMLTensor(e,t){return Cf(e,t)}static fromPinnedBuffer(e,t,n){return Ef(e,t,n)}toDataURL(e){return vf(this,e)}toImageData(e){return $f(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Mf(this,e)}}}),bt,Af=q(()=>{Yo(),bt=et}),di,da,Ct,yt,gn,bn,Nf=q(()=>{xf(),di=(e,t)=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.timeStamp(`${e}::ORT::${t}`)},da=(e,t)=>{var i;let n=((i=new Error().stack)==null?void 0:i.split(/\r\n|\r|\n/g))||[],r=!1;for(let a=0;a<n.length;a++){if(r&&!n[a].includes("TRACE_FUNC")){let o=`FUNC_${e}::${n[a].trim().split(" ")[1]}`;t&&(o+=`::${t}`),di("CPU",o);return}n[a].includes("TRACE_FUNC")&&(r=!0)}},Ct=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||da("BEGIN",e)},yt=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||da("END",e)},gn=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.time(`ORT::${e}`)},bn=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.timeEnd(`ORT::${e}`)}}),Pf,E1=q(()=>{wf(),Af(),Nf(),Pf=class Rf{constructor(t){this.handler=t}async run(t,n,r){Ct(),gn("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof bt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof bt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let u of n){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);i[u]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,c=Object.getOwnPropertyNames(n);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let f=n[p];(f===null||f instanceof bt)&&(u=!0,o=!1,i[p]=f)}if(u){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of this.inputNames)if(typeof t[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(o)for(let u of this.outputNames)i[u]=null;let s=await this.handler.run(t,i,a),l={};for(let u in s)if(Object.hasOwnProperty.call(s,u)){let c=s[u];c instanceof bt?l[u]=c:l[u]=new bt(c.type,c.data,c.dims)}return bn("InferenceSession.run"),yt(),l}async release(){return this.handler.dispose()}static async create(t,n,r,i){Ct(),gn("InferenceSession.create");let a,o={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,f=t.byteLength;if(typeof n=="object"&&n!==null)o=n;else if(typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(f=t.byteLength-p,typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||p+f>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,p,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,l]=await yf(o),u=await s.createInferenceSessionHandler(a,l);return bn("InferenceSession.create"),yt(),new Rf(u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Qo,I1=q(()=>{E1(),Qo=Pf}),z1=q(()=>{}),M1=q(()=>{}),A1=q(()=>{}),N1=q(()=>{}),P1={};Fn(P1,{InferenceSession:()=>Qo,TRACE:()=>di,TRACE_EVENT_BEGIN:()=>gn,TRACE_EVENT_END:()=>bn,TRACE_FUNC_BEGIN:()=>Ct,TRACE_FUNC_END:()=>yt,Tensor:()=>bt,env:()=>Se,registerBackend:()=>Nn});var ot=q(()=>{x1(),$1(),I1(),Af(),z1(),M1(),Nf(),A1(),N1()}),Zo=q(()=>{}),Of={};Fn(Of,{default:()=>Bf});var ca,pa,Bf,R1=q(()=>{var e;W0(),kn(),Jo(),ca="ort-wasm-proxy-worker",pa=((e=globalThis.self)==null?void 0:e.name)===ca,pa&&(self.onmessage=t=>{let{type:n,in:r}=t.data;try{switch(n){case"init-wasm":es(r.wasm).then(()=>{bs(r).then(()=>{postMessage({type:n})},i=>{postMessage({type:n,err:i})})},i=>{postMessage({type:n,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;ys(a,i).then(()=>{postMessage({type:n})},o=>{postMessage({type:n,err:o})});break}case"copy-from":{let{buffer:i}=r,a=bi(i);postMessage({type:n,out:a});break}case"create":{let{model:i,options:a}=r;ws(i,a).then(o=>{postMessage({type:n,out:o})},o=>{postMessage({type:n,err:o})});break}case"release":_s(r),postMessage({type:n});break;case"run":{let{sessionId:i,inputIndices:a,inputs:o,outputIndices:s,options:l}=r;xs(i,a,o,s,new Array(s.length).fill(null),l).then(u=>{u.some(c=>c[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:u},$s([...o,...u]))},u=>{postMessage({type:n,err:u})});break}case"end-profiling":vs(r),postMessage({type:n});break;default:}}catch(i){postMessage({type:n,err:i})}}),Bf=pa?null:t=>new Worker(t??Je,{type:"module",name:ca})}),Df={};Fn(Df,{default:()=>Lf});async function Xu(e={}){var Fu,Wu;var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&((Fu=self.name)==null?void 0:Fu.startsWith("em-pthread"));t.mountExternalData=(d,h)=>{d.startsWith("./")&&(d=d.substring(2)),(t.Xc||(t.Xc=new Map)).set(d,h)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=d=>async(...h)=>{var _;try{if(t.Yc)throw Error("Session already started");let y=t.Yc={Kd:h[0],errors:[]},k=await d(...h);if(t.Yc!==y)throw Error("Session mismatch");(_=t.dd)==null||_.flush();let z=y.errors;if(0<z.length){let N=await Promise.all(z);if(N=N.filter(B=>B),0<N.length)throw Error(N.join(`
`))}return k}finally{t.Yc=null}};t.jsepInit=(d,h)=>{if(d==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=h;let _=t.dd;t.jsepRegisterBuffer=(y,k,z,N)=>_.registerBuffer(y,k,z,N),t.jsepGetBuffer=y=>_.getBuffer(y),t.jsepCreateDownloader=(y,k,z)=>_.createDownloader(y,k,z),t.jsepOnCreateSession=y=>{_.onCreateSession(y)},t.jsepOnReleaseSession=y=>{_.onReleaseSession(y)},t.jsepOnRunStart=y=>_.onRunStart(y),t.Id=(y,k)=>{_.upload(y,k)}}else if(d==="webnn"){let _=h[0];[t.Wd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=h.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=y=>_.onRunStart(y),t.webnnOnRunEnd=_.onRunEnd.bind(_),t.webnnOnReleaseSession=y=>{_.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,k)=>_.createMLTensorDownloader(y,k),t.webnnRegisterMLTensor=(y,k,z,N)=>_.registerMLTensor(y,k,z,N),t.webnnCreateMLContext=y=>_.createMLContext(y),t.webnnRegisterMLConstant=(y,k,z,N,B,j)=>_.registerMLConstant(y,k,z,N,B,t.Xc,j),t.webnnRegisterGraphInput=_.registerGraphInput.bind(_),t.webnnIsGraphInput=_.isGraphInput.bind(_),t.webnnRegisterGraphOutput=_.registerGraphOutput.bind(_),t.webnnIsGraphOutput=_.isGraphOutput.bind(_),t.webnnCreateTemporaryTensor=_.createTemporaryTensor.bind(_),t.webnnIsGraphInputOutputTypeSupported=_.isGraphInputOutputTypeSupported.bind(_)}};let o=()=>{let d=h=>(..._)=>{let y=_t;return _=h(..._),_t!=y?new Promise((k,z)=>{ji={resolve:k,reject:z}}):_};(()=>{for(let h of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[h]=d(t[h])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o==null||o()};var s,l,u=(d,h)=>{throw h},c=import.meta.url,p="";if(n||r){try{p=new URL(".",c).href}catch{}r&&(l=d=>{var h=new XMLHttpRequest;return h.open("GET",d,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),s=async d=>{if(A(d))return new Promise((_,y)=>{var k=new XMLHttpRequest;k.open("GET",d,!0),k.responseType="arraybuffer",k.onload=()=>{k.status==200||k.status==0&&k.response?_(k.response):y(k.status)},k.onerror=y,k.send(null)});var h=await fetch(d,{credentials:"same-origin"});if(h.ok)return h.arrayBuffer();throw Error(h.status+" : "+h.url)}}var f,g,b,x,T,w,v=console.log.bind(console),E=console.error.bind(console),C=v,I=E,M=!1,A=d=>d.startsWith("file://");function $(){Ft.buffer!=L.buffer&&G()}if(i){let d=function(h){try{var _=h.data,y=_.Sc;if(y==="load"){let k=[];self.onmessage=z=>k.push(z),w=()=>{postMessage({Sc:"loaded"});for(let z of k)d(z);self.onmessage=d};for(let z of _.xd)t[z]&&!t[z].proxy||(t[z]=(...N)=>{postMessage({Sc:"callHandler",wd:z,args:N})},z=="print"&&(C=t[z]),z=="printErr"&&(I=t[z]));Ft=_.Od,G(),g=_.Pd,Ve(),Fr()}else if(y==="run"){(function(k){var z=($(),Z)[k+52>>>2>>>0];k=($(),Z)[k+56>>>2>>>0],Ql(z,z-k),he(z)})(_.Rc),Zi(_.Rc,0,0,1,0,0),Zs(),Vi(_.Rc),O||(Hl(),O=!0);try{uy(_.Md,_.bd)}catch(k){if(k!="unwind")throw k}}else _.target!=="setimmediate"&&(y==="checkMailbox"?O&&Pr():y&&(I(`worker: received unknown command ${y}`),I(_)))}catch(k){throw Gl(),k}};var O=!1;self.onunhandledrejection=h=>{throw h.reason||h},self.onmessage=d}var L,H,K,X,P,Z,W,te,ie,F,re,U=!1;function G(){var d=Ft.buffer;t.HEAP8=L=new Int8Array(d),K=new Int16Array(d),t.HEAPU8=H=new Uint8Array(d),X=new Uint16Array(d),t.HEAP32=P=new Int32Array(d),t.HEAPU32=Z=new Uint32Array(d),W=new Float32Array(d),te=new Float64Array(d),ie=new BigInt64Array(d),F=new BigUint64Array(d)}function Y(){U=!0,i?w():zt.sb()}function V(d){throw I(d="Aborted("+d+")"),M=!0,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),T==null||T(d),d}function _e(){return{a:{ma:Aw,gb:Mw,g:dy,J:cy,f:py,o:hy,h:fy,ha:my,b:gy,T:by,Ha:il,n:yy,$:ll,Xa:ul,Da:dl,Fa:cl,Ya:pl,Va:hl,Oa:fl,Ua:ml,ka:gl,Ea:bl,Ba:yl,Wa:wl,Ca:_l,bb:wy,ea:_y,wa:xy,ua:$y,da:ky,O:Ty,H:Cy,va:Ey,_:Ry,xa:Oy,Ra:By,za:Ly,Ia:Uy,sa:Fy,fa:Wy,Qa:Vi,_a:qy,R:jy,r:Zy,c:Wi,hb:Jy,y:ew,M:tw,D:nw,l:rw,s:El,ib:iw,I:aw,S:ow,j:sw,u:lw,q:uw,k:dw,La:cw,Ma:pw,Na:hw,Ja:Al,Ka:Nl,ta:Pl,db:mw,ab:bw,v:yw,aa:ww,ga:_w,$a:gw,W:xw,Za:vw,Aa:$w,F:fw,U:Sw,la:Lr,ya:Tw,fb:kw,eb:Cw,Sa:Dl,Ta:Ll,Ga:Hn,V:Ul,ja:Fl,Pa:Wl,ia:ql,kb:f_,na:u_,lb:h_,oa:l_,G:Jw,d:Ow,t:Pw,w:Nw,A:Gw,mb:a_,K:Yw,x:Lw,pa:o_,Y:d_,ba:i_,nb:r_,ob:n_,P:jw,qa:t_,pb:e_,N:Qw,Z:s_,e:Rw,B:Dw,m:Bw,jb:m_,p:Fw,z:Ww,C:Uw,E:qw,L:Kw,qb:Zw,Q:c_,ca:Xw,X:p_,rb:Hw,ra:Vw,i:Iw,a:Ft,cb:Ze}}}async function Ve(){function d(y,k){var z=zt=y.exports;y={};for(let[N,B]of Object.entries(z))typeof B=="function"?(z=Vy(B),y[N]=z):y[N]=B;return zt=y,zt=(function(){var N=zt,B=Q=>pe=>Q(pe)>>>0,j=Q=>()=>Q()>>>0;return(N=Object.assign({},N)).tb=B(N.tb),N.Xb=j(N.Xb),N.Zb=B(N.Zb),N.lc=B(N.lc),N.mc=j(N.mc),N.qc=B(N.qc),N})(),Ys.push(zt._b),Vl=(y=zt).tb,Hl=y.ub,t._OrtInit=y.vb,t._OrtGetLastError=y.wb,t._OrtCreateSessionOptions=y.xb,t._OrtAppendExecutionProvider=y.yb,t._OrtAddFreeDimensionOverride=y.zb,t._OrtAddSessionConfigEntry=y.Ab,t._OrtReleaseSessionOptions=y.Bb,t._OrtCreateSession=y.Cb,t._OrtReleaseSession=y.Db,t._OrtGetInputOutputCount=y.Eb,t._OrtGetInputOutputMetadata=y.Fb,t._OrtFree=y.Gb,t._OrtCreateTensor=y.Hb,t._OrtGetTensorData=y.Ib,t._OrtReleaseTensor=y.Jb,t._OrtCreateRunOptions=y.Kb,t._OrtAddRunConfigEntry=y.Lb,t._OrtReleaseRunOptions=y.Mb,t._OrtCreateBinding=y.Nb,t._OrtBindInput=y.Ob,t._OrtBindOutput=y.Pb,t._OrtClearBoundOutputs=y.Qb,t._OrtReleaseBinding=y.Rb,t._OrtRunWithBinding=y.Sb,t._OrtRun=y.Tb,t._OrtEndProfiling=y.Ub,t._JsepOutput=y.Vb,t._JsepGetNodeName=y.Wb,Ur=y.Xb,xt=t._free=y.Yb,Kn=t._malloc=y.Zb,Zi=y.ac,Gl=y.bc,jl=y.cc,Kl=y.dc,Ji=y.ec,Xl=y.fc,Yl=y.gc,ge=y.hc,Xn=y.ic,Ql=y.jc,he=y.kc,ea=y.lc,me=y.mc,Zl=y.nc,ta=y.oc,Jl=y.pc,eu=y.qc,tu=y.rc,na=y.sc,nu=y.tc,ru=y.uc,iu=y.vc,au=y.wc,ou=y.xc,su=y.yc,lu=y.zc,uu=y.Ac,du=y.Bc,cu=y.Cc,pu=y.Dc,hu=y.Ec,fu=y.Fc,mu=y.Gc,gu=y.Hc,bu=y.Ic,yu=y.Jc,wu=y.Kc,_u=y.Lc,xu=y.Mc,vu=y.Nc,$u=y.Pc,Su=y.Qc,ku=y.$c,Tu=y.ad,Cu=y.fd,Eu=y.jd,Iu=y.kd,zu=y.ld,Mu=y.md,Au=y.nd,Nu=y.od,Pu=y.pd,Ru=y.qd,Ou=y.vd,Bu=y.Sd,Du=y.Td,Lu=y.Ud,Uu=y.Vd,g=k,zt}var h,_=_e();return t.instantiateWasm?new Promise(y=>{t.instantiateWasm(_,(k,z)=>{y(d(k,z))})}):i?d(new WebAssembly.Instance(g,_e()),g):(re??(re=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href),h=await(async function(y){var k=re;if(!f&&!A(k))try{var z=fetch(k,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(z,y)}catch(N){I(`wasm streaming compile failed: ${N}`),I("falling back to ArrayBuffer instantiation")}return(async function(N,B){try{var j=await(async function(Q){if(!f)try{var pe=await s(Q);return new Uint8Array(pe)}catch{}if(Q==re&&f)Q=new Uint8Array(f);else{if(!l)throw"both async and sync fetching of the wasm failed";Q=l(Q)}return Q})(N);return await WebAssembly.instantiate(j,B)}catch(Q){I(`failed to asynchronously prepare wasm: ${Q}`),V(Q)}})(k,y)})(_),d(h.instance,h.module))}class Ie{constructor(h){Pe(this,"name","ExitStatus");this.message=`Program terminated with exit(${h})`,this.status=h}}var Be=d=>{d.terminate(),d.onmessage=()=>{}},je=[],Qe=0,Ke=null,Lt=d=>{Ut.length==0&&(el(),Js(Ut[0]));var h=Ut.pop();if(!h)return 6;Gn.push(h),en[d.Rc]=h,h.Rc=d.Rc;var _={Sc:"run",Md:d.Ld,bd:d.bd,Rc:d.Rc};return h.postMessage(_,d.rd),0},Ce=0,le=(d,h,..._)=>{var y,k=16*_.length,z=me(),N=ea(k),B=N>>>3;for(y of _)typeof y=="bigint"?(($(),ie)[B++>>>0]=1n,($(),ie)[B++>>>0]=y):(($(),ie)[B++>>>0]=0n,($(),te)[B++>>>0]=y);return d=jl(d,0,k,N,h),he(z),d};function Ze(d){if(i)return le(0,1,d);if(b=d,!(0<Ce)){for(var h of Gn)Be(h);for(h of Ut)Be(h);Ut=[],Gn=[],en={},M=!0}u(0,new Ie(d))}function Ir(d){if(i)return le(1,0,d);Hn(d)}var Hn=d=>{if(b=d,i)throw Ir(d),"unwind";Ze(d)},Ut=[],Gn=[],Ys=[],en={},Qs=d=>{var h=d.Rc;delete en[h],Ut.push(d),Gn.splice(Gn.indexOf(d),1),d.Rc=0,Kl(h)};function Zs(){Ys.forEach(d=>d())}var Js=d=>new Promise(h=>{d.onmessage=k=>{var z=k.data;if(k=z.Sc,z.Zc&&z.Zc!=Ur()){var N=en[z.Zc];N?N.postMessage(z,z.rd):I(`Internal error! Worker sent a message "${k}" to target pthread ${z.Zc}, but that thread no longer exists!`)}else k==="checkMailbox"?Pr():k==="spawnThread"?Lt(z):k==="cleanupThread"?Nr(()=>{Qs(en[z.Nd])}):k==="loaded"?(d.loaded=!0,h(d)):z.target==="setimmediate"?d.postMessage(z):k==="uncaughtException"?d.onerror(z.error):k==="callHandler"?t[z.wd](...z.args):k&&I(`worker sent an unknown command ${k}`)},d.onerror=k=>{throw I(`worker sent an error! ${k.filename}:${k.lineno}: ${k.message}`),k};var _,y=[];for(_ of[])t.propertyIsEnumerable(_)&&y.push(_);d.postMessage({Sc:"load",xd:y,Od:Ft,Pd:g})});function el(){var d=new Worker((()=>{let h=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new h("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Ut.push(d)}var Ft,uy=(d,h)=>{Ce=0,d=na(d,h),0<Ce?b=d:Ji(d)},zr=[],Mr=0;function dy(d){var h=new Di(d>>>=0);return($(),L)[h.Tc+12>>>0]==0&&(tl(h,!0),Mr--),nl(h,!1),zr.push(h),eu(d)}var Cn=0,cy=()=>{ge(0,0);var d=zr.pop();Zl(d.cd),Cn=0};function tl(d,h){h=h?1:0,($(),L)[d.Tc+12>>>0]=h}function nl(d,h){h=h?1:0,($(),L)[d.Tc+13>>>0]=h}class Di{constructor(h){this.cd=h,this.Tc=h-24}}var Li=d=>{var h=Cn;if(!h)return Xn(0),0;var _=new Di(h);($(),Z)[_.Tc+16>>>2>>>0]=h;var y=($(),Z)[_.Tc+4>>>2>>>0];if(!y)return Xn(0),h;for(var k of d){if(k===0||k===y)break;if(Jl(k,y,_.Tc+16))return Xn(k),h}return Xn(y),h};function py(){return Li([])}function hy(d){return Li([d>>>0])}function fy(d,h,_,y){return Li([d>>>0,h>>>0,_>>>0,y>>>0])}var my=()=>{var d=zr.pop();d||V("no exception to throw");var h=d.cd;throw($(),L)[d.Tc+13>>>0]==0&&(zr.push(d),nl(d,!0),tl(d,!1),Mr++),ta(h),Cn=h};function gy(d,h,_){var y=new Di(d>>>=0);throw h>>>=0,_>>>=0,($(),Z)[y.Tc+16>>>2>>>0]=0,($(),Z)[y.Tc+4>>>2>>>0]=h,($(),Z)[y.Tc+8>>>2>>>0]=_,ta(d),Mr++,Cn=d}var by=()=>Mr;function rl(d,h,_,y){return i?le(2,1,d,h,_,y):il(d,h,_,y)}function il(d,h,_,y){if(d>>>=0,h>>>=0,_>>>=0,y>>>=0,!globalThis.SharedArrayBuffer)return 6;var k=[];return i&&k.length===0?rl(d,h,_,y):(d={Ld:_,Rc:d,bd:y,rd:k},i?(d.Sc="spawnThread",postMessage(d,k),0):Lt(d))}function yy(d){throw Cn||(Cn=d>>>0),Cn}var al=globalThis.TextDecoder&&new TextDecoder,ol=(d,h,_,y)=>{if(_=h+_,y)return _;for(;d[h]&&!(h>=_);)++h;return h},sl=(d,h=0,_,y)=>{if(16<(_=ol(d,h>>>=0,_,y))-h&&d.buffer&&al)return al.decode(d.buffer instanceof ArrayBuffer?d.subarray(h,_):d.slice(h,_));for(y="";h<_;){var k=d[h++];if(128&k){var z=63&d[h++];if((224&k)==192)y+=String.fromCharCode((31&k)<<6|z);else{var N=63&d[h++];65536>(k=(240&k)==224?(15&k)<<12|z<<6|N:(7&k)<<18|z<<12|N<<6|63&d[h++])?y+=String.fromCharCode(k):(k-=65536,y+=String.fromCharCode(55296|k>>10,56320|1023&k))}}else y+=String.fromCharCode(k)}return y},Ne=(d,h,_)=>(d>>>=0)?sl(($(),H),d,h,_):"";function ll(d,h,_){return i?le(3,1,d,h,_):0}function ul(d,h){if(i)return le(4,1,d,h)}function dl(d,h){if(i)return le(5,1,d,h)}function cl(d,h,_){if(i)return le(6,1,d,h,_)}function pl(d,h,_){return i?le(7,1,d,h,_):0}function hl(d,h){if(i)return le(8,1,d,h)}function fl(d,h,_){if(i)return le(9,1,d,h,_)}function ml(d,h,_,y){if(i)return le(10,1,d,h,_,y)}function gl(d,h,_,y){if(i)return le(11,1,d,h,_,y)}function bl(d,h,_,y){if(i)return le(12,1,d,h,_,y)}function yl(d){if(i)return le(13,1,d)}function wl(d,h){if(i)return le(14,1,d,h)}function _l(d,h,_){if(i)return le(15,1,d,h,_)}var wy=()=>V(""),wt=d=>{d>>>=0;for(var h="";;){var _=($(),H)[d++>>>0];if(!_)return h;h+=String.fromCharCode(_)}},Ui={},Fi={},En=class extends Error{constructor(d){super(d),this.name="BindingError"}};function It(d,h,_={}){return(function(y,k,z={}){var N=k.name;if(!y)throw new En(`type "${N}" must have a positive integer typeid pointer`);if(Fi.hasOwnProperty(y)){if(z.yd)return;throw new En(`Cannot register type '${N}' twice`)}Fi[y]=k,Ui.hasOwnProperty(y)&&(k=Ui[y],delete Ui[y],k.forEach(B=>B()))})(d,h,_)}var xl=(d,h,_)=>{switch(h){case 1:return _?y=>($(),L)[y>>>0]:y=>($(),H)[y>>>0];case 2:return _?y=>($(),K)[y>>>1>>>0]:y=>($(),X)[y>>>1>>>0];case 4:return _?y=>($(),P)[y>>>2>>>0]:y=>($(),Z)[y>>>2>>>0];case 8:return _?y=>($(),ie)[y>>>3>>>0]:y=>($(),F)[y>>>3>>>0];default:throw new TypeError(`invalid integer width (${h}): ${d}`)}};function _y(d,h,_,y,k){d>>>=0,_>>>=0,h=wt(h>>>0);let z=N=>N;if(y=y===0n){let N=8*_;z=B=>BigInt.asUintN(N,B),k=z(k)}It(d,{name:h,Oc:z,Vc:(N,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Uc:xl(h,_,!y),Wc:null})}function xy(d,h,_,y){It(d>>>=0,{name:h=wt(h>>>0),Oc:function(k){return!!k},Vc:function(k,z){return z?_:y},Uc:function(k){return this.Oc(($(),H)[k>>>0])},Wc:null})}var vl=[],tn=[0,1,,1,null,1,!0,1,!1,1];function Wi(d){9<(d>>>=0)&&--tn[d+1]==0&&(tn[d]=void 0,vl.push(d))}var it=d=>{if(!d)throw new En(`Cannot use deleted val. handle = ${d}`);return tn[d]},lt=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let h=vl.pop()||tn.length;return tn[h]=d,tn[h+1]=1,h}};function qi(d){return this.Oc(($(),Z)[d>>>2>>>0])}var vy={name:"emscripten::val",Oc:d=>{var h=it(d);return Wi(d),h},Vc:(d,h)=>lt(h),Uc:qi,Wc:null};function $y(d){return It(d>>>0,vy)}var Sy=(d,h)=>{switch(h){case 4:return function(_){return this.Oc(($(),W)[_>>>2>>>0])};case 8:return function(_){return this.Oc(($(),te)[_>>>3>>>0])};default:throw new TypeError(`invalid float width (${h}): ${d}`)}};function ky(d,h,_){_>>>=0,It(d>>>=0,{name:h=wt(h>>>0),Oc:y=>y,Vc:(y,k)=>k,Uc:Sy(h,_),Wc:null})}function Ty(d,h,_,y,k){d>>>=0,_>>>=0,h=wt(h>>>0);let z=B=>B;if(y===0){var N=32-8*_;z=B=>B<<N>>>N,k=z(k)}It(d,{name:h,Oc:z,Vc:(B,j)=>j,Uc:xl(h,_,y!==0),Wc:null})}function Cy(d,h,_){function y(z){var N=($(),Z)[z>>>2>>>0];return z=($(),Z)[z+4>>>2>>>0],new k(($(),L).buffer,z,N)}var k=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][h];It(d>>>=0,{name:_=wt(_>>>0),Oc:y,Uc:y},{yd:!0})}var Wt=(d,h,_)=>{var y=($(),H);if(h>>>=0,0<_){var k=h;_=h+_-1;for(var z=0;z<d.length;++z){var N=d.codePointAt(z);if(127>=N){if(h>=_)break;y[h++>>>0]=N}else if(2047>=N){if(h+1>=_)break;y[h++>>>0]=192|N>>6,y[h++>>>0]=128|63&N}else if(65535>=N){if(h+2>=_)break;y[h++>>>0]=224|N>>12,y[h++>>>0]=128|N>>6&63,y[h++>>>0]=128|63&N}else{if(h+3>=_)break;y[h++>>>0]=240|N>>18,y[h++>>>0]=128|N>>12&63,y[h++>>>0]=128|N>>6&63,y[h++>>>0]=128|63&N,z++}}y[h>>>0]=0,d=h-k}else d=0;return d},Ar=d=>{for(var h=0,_=0;_<d.length;++_){var y=d.charCodeAt(_);127>=y?h++:2047>=y?h+=2:55296<=y&&57343>=y?(h+=4,++_):h+=3}return h};function Ey(d,h){It(d>>>=0,{name:h=wt(h>>>0),Oc(_){var y=($(),Z)[_>>>2>>>0];return y=Ne(_+4,y,!0),xt(_),y},Vc(_,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var k=typeof y=="string";if(!(k||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new En("Cannot pass non-string to std::string");var z=k?Ar(y):y.length,N=Kn(4+z+1),B=N+4;return($(),Z)[N>>>2>>>0]=z,k?Wt(y,B,z+1):($(),H).set(y,B>>>0),_!==null&&_.push(xt,N),N},Uc:qi,Wc(_){xt(_)}})}var $l=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Iy=(d,h,_)=>{if(d>>>=1,16<(h=ol(($(),X),d,h/2,_))-d&&$l)return $l.decode(($(),X).slice(d,h));for(_="";d<h;++d){var y=($(),X)[d>>>0];_+=String.fromCharCode(y)}return _},zy=(d,h,_)=>{if(_??(_=2147483647),2>_)return 0;var y=h;_=(_-=2)<2*d.length?_/2:d.length;for(var k=0;k<_;++k){var z=d.charCodeAt(k);($(),K)[h>>>1>>>0]=z,h+=2}return($(),K)[h>>>1>>>0]=0,h-y},My=d=>2*d.length,Ay=(d,h,_)=>{var y="";d>>>=2;for(var k=0;!(k>=h/4);k++){var z=($(),Z)[d+k>>>0];if(!z&&!_)break;y+=String.fromCodePoint(z)}return y},Ny=(d,h,_)=>{if(h>>>=0,_??(_=2147483647),4>_)return 0;var y=h;_=y+_-4;for(var k=0;k<d.length;++k){var z=d.codePointAt(k);if(65535<z&&k++,($(),P)[h>>>2>>>0]=z,(h+=4)+4>_)break}return($(),P)[h>>>2>>>0]=0,h-y},Py=d=>{for(var h=0,_=0;_<d.length;++_)65535<d.codePointAt(_)&&_++,h+=4;return h};function Ry(d,h,_){if(d>>>=0,h>>>=0,_=wt(_>>>=0),h===2)var y=Iy,k=zy,z=My;else y=Ay,k=Ny,z=Py;It(d,{name:_,Oc:N=>{var B=($(),Z)[N>>>2>>>0];return B=y(N+4,B*h,!0),xt(N),B},Vc:(N,B)=>{if(typeof B!="string")throw new En(`Cannot pass non-string to C++ string type ${_}`);var j=z(B),Q=Kn(4+j+h);return($(),Z)[Q>>>2>>>0]=j/h,k(B,Q+4,j+h),N!==null&&N.push(xt,Q),Q},Uc:qi,Wc(N){xt(N)}})}function Oy(d,h){It(d>>>=0,{zd:!0,name:h=wt(h>>>0),Oc:()=>{},Vc:()=>{}})}function By(d){Zi(d>>>0,!r,1,!n,131072,!1),Zs()}var Nr=d=>{if(!M)try{if(d(),!(0<Ce))try{i?Ur()&&Ji(b):Hn(b)}catch(h){h instanceof Ie||h=="unwind"||u(0,h)}}catch(h){h instanceof Ie||h=="unwind"||u(0,h)}},Dy=!Atomics.waitAsync||((Wu=globalThis.navigator)==null?void 0:Wu.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Vi(d){d>>>=0,Dy||(Atomics.waitAsync(($(),P),d>>>2,d).value.then(Pr),d+=128,Atomics.store(($(),P),d>>>2,1))}var Pr=()=>Nr(()=>{var d=Ur();d&&(Vi(d),Yl())});function Ly(d,h){(d>>>=0)==h>>>0?setTimeout(Pr):i?postMessage({Zc:d,Sc:"checkMailbox"}):(d=en[d])&&d.postMessage({Sc:"checkMailbox"})}var Hi=[];function Uy(d,h,_,y,k){for(h>>>=0,k>>>=0,Hi.length=0,_=k>>>3,y=k+y>>>3;_<y;){var z;z=($(),ie)[_++>>>0]?($(),ie)[_++>>>0]:($(),te)[_++>>>0],Hi.push(z)}return(h?ra[h]:zw[d])(...Hi)}var Fy=()=>{Ce=0};function Wy(d){d>>>=0,i?postMessage({Sc:"cleanupThread",Nd:d}):Qs(en[d])}function qy(d){}var Rr=d=>{try{d()}catch(h){V(h)}};function Vy(d){var h=(..._)=>{Or.push(d);try{return d(..._)}finally{M||(Or.pop(),_t&&qt===1&&Or.length===0&&(qt=0,Ce+=1,Rr(Du),typeof Fibers<"u"&&Fibers.Zd()))}};return Tl.set(d,h),h}var qt=0,_t=null,Sl=0,Or=[],Gi=new Map,kl=new Map,Tl=new Map,Hy=0,ji=null,Gy=[],Cl=d=>(function(h){if(!M){if(qt===0){var _=!1,y=!1;h((k=0)=>{if(!M&&(Sl=k,_=!0,y)){qt=2,Rr(()=>Lu(_t)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),k=!1;try{var z=(function(){var j=($(),P)[_t+8>>>2>>>0];return j=kl.get(j),j=Tl.get(j),--Ce,j()})()}catch(j){z=j,k=!0}var N=!1;if(!_t){var B=ji;B&&(ji=null,(k?B.reject:B.resolve)(z),N=!0)}if(k&&!N)throw z}}),y=!0,_||(qt=1,_t=(function(){var k=Kn(65548),z=k+12;if(($(),Z)[k>>>2>>>0]=z,($(),Z)[k+4>>>2>>>0]=z+65536,z=Or[0],!Gi.has(z)){var N=Hy++;Gi.set(z,N),kl.set(N,z)}return z=Gi.get(z),($(),P)[k+8>>>2>>>0]=z,k})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Rr(()=>Bu(_t)))}else qt===2?(qt=0,Rr(Uu),xt(_t),_t=null,Gy.forEach(Nr)):V(`invalid state: ${qt}`);return Sl}})(h=>{d().then(h)});function jy(d){return d>>>=0,Cl(async()=>{var h=await it(d);return lt(h)})}var Ki=[],Ky=d=>{var h=Ki.length;return Ki.push(d),h},Xy=(d,h)=>{for(var _=Array(d),y=0;y<d;++y){var k=y,z=($(),Z)[h+4*y>>>2>>>0],N=Fi[z];if(N===void 0)throw d=`parameter ${y}`,z=Vl(z),h=wt(z),xt(z),new En(`${d} has unknown type ${h}`);_[k]=N}return _},Yy=(d,h,_)=>{var y=[];return d=d(y,_),y.length&&(($(),Z)[h>>>2>>>0]=lt(y)),d},Qy={},Br=d=>{var h=Qy[d];return h===void 0?wt(d):h};function Zy(d,h,_){var[y,...k]=Xy(d,h>>>0);h=y.Vc.bind(y);var z=k.map(j=>j.Uc.bind(j));d--;var N={toValue:it};switch(d=z.map((j,Q)=>{var pe=`argFromPtr${Q}`;return N[pe]=j,`${pe}(args${Q?"+"+8*Q:""})`}),_){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:N.getStringOrSymbol=Br,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${d})`,y.zd||(N.toReturnWire=h,N.emval_returnValue=Yy,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,_=new Function(Object.keys(N),B)(...Object.values(N)),B=`methodCaller<(${k.map(j=>j.name)}) => ${y.name}>`,Ky(Object.defineProperty(_,"name",{value:B}))}function Jy(d,h){return h>>>=0,(d=it(d>>>0))==it(h)}function ew(d){return(d>>>=0)?(d=Br(d),lt(globalThis[d])):lt(globalThis)}function tw(d){return d=Br(d>>>0),lt(t[d])}function nw(d,h){return h>>>=0,d=it(d>>>0),h=it(h),lt(d[h])}function rw(d){9<(d>>>=0)&&(tn[d+1]+=1)}function El(d,h,_,y,k){return Ki[d>>>0](h>>>0,_>>>0,y>>>0,k>>>0)}function iw(d,h,_,y,k){return El(d>>>0,h>>>0,_>>>0,y>>>0,k>>>0)}function aw(){return lt([])}function ow(d){d=it(d>>>0);for(var h=Array(d.length),_=0;_<d.length;_++)h[_]=d[_];return lt(h)}function sw(d){return lt(Br(d>>>0))}function lw(){return lt({})}function uw(d){for(var h=it(d>>>=0);h.length;){var _=h.pop();h.pop()(_)}Wi(d)}function dw(d,h,_){h>>>=0,_>>>=0,d=it(d>>>0),h=it(h),_=it(_),d[h]=_}function cw(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),($(),P)[h>>>2>>>0]=d.getUTCSeconds(),($(),P)[h+4>>>2>>>0]=d.getUTCMinutes(),($(),P)[h+8>>>2>>>0]=d.getUTCHours(),($(),P)[h+12>>>2>>>0]=d.getUTCDate(),($(),P)[h+16>>>2>>>0]=d.getUTCMonth(),($(),P)[h+20>>>2>>>0]=d.getUTCFullYear()-1900,($(),P)[h+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),P)[h+28>>>2>>>0]=d}var Il=d=>d%4==0&&(d%100!=0||d%400==0),zl=[0,31,60,91,121,152,182,213,244,274,305,335],Ml=[0,31,59,90,120,151,181,212,243,273,304,334];function pw(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),($(),P)[h>>>2>>>0]=d.getSeconds(),($(),P)[h+4>>>2>>>0]=d.getMinutes(),($(),P)[h+8>>>2>>>0]=d.getHours(),($(),P)[h+12>>>2>>>0]=d.getDate(),($(),P)[h+16>>>2>>>0]=d.getMonth(),($(),P)[h+20>>>2>>>0]=d.getFullYear()-1900,($(),P)[h+24>>>2>>>0]=d.getDay();var _=(Il(d.getFullYear())?zl:Ml)[d.getMonth()]+d.getDate()-1|0;($(),P)[h+28>>>2>>>0]=_,($(),P)[h+36>>>2>>>0]=-60*d.getTimezoneOffset(),_=new Date(d.getFullYear(),6,1).getTimezoneOffset();var y=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(_!=y&&d.getTimezoneOffset()==Math.min(y,_)),($(),P)[h+32>>>2>>>0]=d}function hw(d){d>>>=0;var h=new Date(($(),P)[d+20>>>2>>>0]+1900,($(),P)[d+16>>>2>>>0],($(),P)[d+12>>>2>>>0],($(),P)[d+8>>>2>>>0],($(),P)[d+4>>>2>>>0],($(),P)[d>>>2>>>0],0),_=($(),P)[d+32>>>2>>>0],y=h.getTimezoneOffset(),k=new Date(h.getFullYear(),6,1).getTimezoneOffset(),z=new Date(h.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(z,k);return 0>_?($(),P)[d+32>>>2>>>0]=+(k!=z&&N==y):0<_!=(N==y)&&(k=Math.max(z,k),h.setTime(h.getTime()+6e4*((0<_?N:k)-y))),($(),P)[d+24>>>2>>>0]=h.getDay(),_=(Il(h.getFullYear())?zl:Ml)[h.getMonth()]+h.getDate()-1|0,($(),P)[d+28>>>2>>>0]=_,($(),P)[d>>>2>>>0]=h.getSeconds(),($(),P)[d+4>>>2>>>0]=h.getMinutes(),($(),P)[d+8>>>2>>>0]=h.getHours(),($(),P)[d+12>>>2>>>0]=h.getDate(),($(),P)[d+16>>>2>>>0]=h.getMonth(),($(),P)[d+20>>>2>>>0]=h.getYear(),d=h.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function Al(d,h,_,y,k,z,N){return i?le(16,1,d,h,_,y,k,z,N):-52}function Nl(d,h,_,y,k,z){if(i)return le(17,1,d,h,_,y,k,z)}var jn={},fw=()=>performance.timeOrigin+performance.now();function Pl(d,h){if(i)return le(18,1,d,h);if(jn[d]&&(clearTimeout(jn[d].id),delete jn[d]),!h)return 0;var _=setTimeout(()=>{delete jn[d],Nr(()=>Xl(d,performance.timeOrigin+performance.now()))},h);return jn[d]={id:_,Yd:h},0}function mw(d,h,_,y){d>>>=0,h>>>=0,_>>>=0,y>>>=0;var k=new Date().getFullYear(),z=new Date(k,0,1).getTimezoneOffset();k=new Date(k,6,1).getTimezoneOffset();var N=Math.max(z,k);($(),Z)[d>>>2>>>0]=60*N,($(),P)[h>>>2>>>0]=+(z!=k),d=(h=B=>{var j=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(j/60)).padStart(2,"0")}${String(j%60).padStart(2,"0")}`})(z),h=h(k),k<z?(Wt(d,_,17),Wt(h,y,17)):(Wt(d,y,17),Wt(h,_,17))}var gw=()=>Date.now();function bw(d,h,_){return _>>>=0,0<=d&&3>=d?(d===0?d=Date.now():d=performance.timeOrigin+performance.now(),d=Math.round(1e6*d),($(),ie)[_>>>3>>>0]=BigInt(d),0):28}var Xi=[],Rl=(d,h)=>{Xi.length=0;for(var _;_=($(),H)[d++>>>0];){var y=_!=105;h+=(y&=_!=112)&&h%8?4:0,Xi.push(_==112?($(),Z)[h>>>2>>>0]:_==106?($(),ie)[h>>>3>>>0]:_==105?($(),P)[h>>>2>>>0]:($(),te)[h>>>3>>>0]),h+=y?8:4}return Xi};function yw(d,h,_){return d>>>=0,h=Rl(h>>>0,_>>>0),ra[d](...h)}function ww(d,h,_){return d>>>=0,h=Rl(h>>>0,_>>>0),ra[d](...h)}var _w=()=>{};function xw(d,h){return I(Ne(d>>>0,h>>>0))}var vw=()=>{throw Ce+=1,"unwind"};function $w(){return 4294901760}var Sw=()=>navigator.hardwareConcurrency,nn={},Dr=d=>{var h;return(h=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(d))?+h[1]:(h=/:(\d+):\d+(?:\)|$)/.exec(d))?2147483648|+h[1]:0},Ol=d=>{for(var h of d)(d=Dr(h))&&(nn[d]=h)};function kw(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Ol(d),nn.gd=Dr(d[3]),nn.Jd=d,nn.gd}function Lr(d){if(!(d=nn[d>>>0]))return 0;var h;if(h=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(d))d=h[1];else if(h=/^\s+at (.*) \(.*\)$/.exec(d))d=h[1];else{if(!(h=/^(.+?)@/.exec(d)))return 0;d=h[1]}xt(Lr.hd??0),h=Ar(d)+1;var _=Kn(h);return _&&Wt(d,_,h),Lr.hd=_,Lr.hd}function Tw(d){d>>>=0;var h=($(),H).length;if(d<=h||4294901760<d)return!1;for(var _=1;4>=_;_*=2){var y=h*(1+.2/_);y=Math.min(y,d+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(d,y)/65536))-Ft.buffer.byteLength+65535)/65536|0;try{Ft.grow(y),G();var k=1;break e}catch{}k=void 0}if(k)return!0}return!1}function Cw(d,h,_){if(d>>>=0,h>>>=0,nn.gd==d)var y=nn.Jd;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),Ol(y);for(var k=3;y[k]&&Dr(y[k])!=d;)++k;for(d=0;d<_&&y[d+k];++d)($(),P)[h+4*d>>>2>>>0]=Dr(y[d+k]);return d}var Yi,Qi={},Bl=()=>{var y;if(!Yi){var d,h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((y=globalThis.navigator)==null?void 0:y.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in Qi)Qi[d]===void 0?delete h[d]:h[d]=Qi[d];var _=[];for(d in h)_.push(`${d}=${h[d]}`);Yi=_}return Yi};function Dl(d,h){if(i)return le(19,1,d,h);d>>>=0,h>>>=0;var _,y=0,k=0;for(_ of Bl()){var z=h+y;($(),Z)[d+k>>>2>>>0]=z,y+=Wt(_,z,1/0)+1,k+=4}return 0}function Ll(d,h){if(i)return le(20,1,d,h);d>>>=0,h>>>=0;var _=Bl();for(var y of(($(),Z)[d>>>2>>>0]=_.length,d=0,_))d+=Ar(y)+1;return($(),Z)[h>>>2>>>0]=d,0}function Ul(d){return i?le(21,1,d):52}function Fl(d,h,_,y){return i?le(22,1,d,h,_,y):52}function Wl(d,h,_,y){return i?le(23,1,d,h,_,y):70}var Ew=[null,[],[]];function ql(d,h,_,y){if(i)return le(24,1,d,h,_,y);h>>>=0,_>>>=0,y>>>=0;for(var k=0,z=0;z<_;z++){var N=($(),Z)[h>>>2>>>0],B=($(),Z)[h+4>>>2>>>0];h+=8;for(var j=0;j<B;j++){var Q=d,pe=($(),H)[N+j>>>0],we=Ew[Q];pe===0||pe===10?((Q===1?C:I)(sl(we)),we.length=0):we.push(pe)}k+=B}return($(),Z)[y>>>2>>>0]=k,0}function Iw(d){return d>>>0}i||(function(){for(var d=t.numThreads-1;d--;)el();je.push(async()=>{var h=(async function(){if(!i)return Promise.all(Ut.map(Js))})();Qe++,await h,--Qe==0&&Ke&&(h=Ke,Ke=null,h())})})(),i||(Ft=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),G()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>me(),t.stackRestore=d=>he(d),t.stackAlloc=d=>ea(d),t.setValue=function(d,h,_="i8"){switch(_.endsWith("*")&&(_="*"),_){case"i1":case"i8":($(),L)[d>>>0]=h;break;case"i16":($(),K)[d>>>1>>>0]=h;break;case"i32":($(),P)[d>>>2>>>0]=h;break;case"i64":($(),ie)[d>>>3>>>0]=BigInt(h);break;case"float":($(),W)[d>>>2>>>0]=h;break;case"double":($(),te)[d>>>3>>>0]=h;break;case"*":($(),Z)[d>>>2>>>0]=h;break;default:V(`invalid type for setValue: ${_}`)}},t.getValue=function(d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":return($(),L)[d>>>0];case"i16":return($(),K)[d>>>1>>>0];case"i32":return($(),P)[d>>>2>>>0];case"i64":return($(),ie)[d>>>3>>>0];case"float":return($(),W)[d>>>2>>>0];case"double":return($(),te)[d>>>3>>>0];case"*":return($(),Z)[d>>>2>>>0];default:V(`invalid type for getValue: ${h}`)}},t.UTF8ToString=Ne,t.stringToUTF8=Wt,t.lengthBytesUTF8=Ar;var Vl,Hl,Ur,xt,Kn,Zi,Gl,jl,Kl,Ji,Xl,Yl,ge,Xn,Ql,he,ea,me,Zl,ta,Jl,eu,tu,na,nu,ru,iu,au,ou,su,lu,uu,du,cu,pu,hu,fu,mu,gu,bu,yu,wu,_u,xu,vu,$u,Su,ku,Tu,Cu,Eu,Iu,zu,Mu,Au,Nu,Pu,Ru,Ou,Bu,Du,Lu,Uu,zt,zw=[Ze,Ir,rl,ll,ul,dl,cl,pl,hl,fl,ml,gl,bl,yl,wl,_l,Al,Nl,Pl,Dl,Ll,Ul,Fl,Wl,ql],ra={973212:(d,h,_,y,k)=>{if(t===void 0||!t.Xc)return 1;if((d=Ne(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=t.Xc.get(d)))return 2;if(h=Number(h>>>0),_=Number(_>>>0),y=Number(y>>>0),h+_>d.byteLength)return 3;try{let z=d.subarray(h,h+_);switch(k){case 0:($(),H).set(z,y>>>0);break;case 1:t.Qd?t.Qd(y,z):t.Id(y,z);break;default:return 4}return 0}catch{return 4}},974036:(d,h,_)=>{t.td(d,($(),H).subarray(h>>>0,h+_>>>0))},974100:()=>t.Wd(),974142:d=>{t.sd(d)},974179:()=>{t.Bd()},974210:()=>{t.Cd()},974239:()=>{t.Gd()},974264:d=>t.Ad(d),974297:d=>t.Ed(d),974329:(d,h,_)=>{t.ed(Number(d),Number(h),Number(_),!0)},974392:(d,h,_)=>{t.ed(Number(d),Number(h),Number(_))},974449:()=>typeof wasmOffsetConverter<"u",974506:d=>{t.$b("Abs",d,void 0)},974557:d=>{t.$b("Neg",d,void 0)},974608:d=>{t.$b("Floor",d,void 0)},974661:d=>{t.$b("Ceil",d,void 0)},974713:d=>{t.$b("Reciprocal",d,void 0)},974771:d=>{t.$b("Sqrt",d,void 0)},974823:d=>{t.$b("Exp",d,void 0)},974874:d=>{t.$b("Erf",d,void 0)},974925:d=>{t.$b("Sigmoid",d,void 0)},974980:(d,h,_)=>{t.$b("HardSigmoid",d,{alpha:h,beta:_})},975059:d=>{t.$b("Log",d,void 0)},975110:d=>{t.$b("Sin",d,void 0)},975161:d=>{t.$b("Cos",d,void 0)},975212:d=>{t.$b("Tan",d,void 0)},975263:d=>{t.$b("Asin",d,void 0)},975315:d=>{t.$b("Acos",d,void 0)},975367:d=>{t.$b("Atan",d,void 0)},975419:d=>{t.$b("Sinh",d,void 0)},975471:d=>{t.$b("Cosh",d,void 0)},975523:d=>{t.$b("Asinh",d,void 0)},975576:d=>{t.$b("Acosh",d,void 0)},975629:d=>{t.$b("Atanh",d,void 0)},975682:d=>{t.$b("Tanh",d,void 0)},975734:d=>{t.$b("Not",d,void 0)},975785:(d,h,_)=>{t.$b("Clip",d,{min:h,max:_})},975854:d=>{t.$b("Clip",d,void 0)},975906:(d,h)=>{t.$b("Elu",d,{alpha:h})},975964:d=>{t.$b("Gelu",d,void 0)},976016:d=>{t.$b("Relu",d,void 0)},976068:(d,h)=>{t.$b("LeakyRelu",d,{alpha:h})},976132:(d,h)=>{t.$b("ThresholdedRelu",d,{alpha:h})},976202:(d,h)=>{t.$b("Cast",d,{to:h})},976260:d=>{t.$b("Add",d,void 0)},976311:d=>{t.$b("Sub",d,void 0)},976362:d=>{t.$b("Mul",d,void 0)},976413:d=>{t.$b("Div",d,void 0)},976464:d=>{t.$b("Pow",d,void 0)},976515:d=>{t.$b("Equal",d,void 0)},976568:d=>{t.$b("Greater",d,void 0)},976623:d=>{t.$b("GreaterOrEqual",d,void 0)},976685:d=>{t.$b("Less",d,void 0)},976737:d=>{t.$b("LessOrEqual",d,void 0)},976796:(d,h,_,y,k)=>{t.$b("ReduceMean",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},976971:(d,h,_,y,k)=>{t.$b("ReduceMax",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977145:(d,h,_,y,k)=>{t.$b("ReduceMin",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977319:(d,h,_,y,k)=>{t.$b("ReduceProd",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977494:(d,h,_,y,k)=>{t.$b("ReduceSum",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977668:(d,h,_,y,k)=>{t.$b("ReduceL1",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977841:(d,h,_,y,k)=>{t.$b("ReduceL2",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978014:(d,h,_,y,k)=>{t.$b("ReduceLogSum",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978191:(d,h,_,y,k)=>{t.$b("ReduceSumSquare",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978371:(d,h,_,y,k)=>{t.$b("ReduceLogSumExp",d,{keepDims:!!h,noopWithEmptyAxes:!!_,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978551:d=>{t.$b("Where",d,void 0)},978604:(d,h,_)=>{t.$b("Transpose",d,{perm:h?Array.from(($(),P).subarray(Number(h)>>>0,Number(_)>>>0)):[]})},978728:(d,h,_,y)=>{t.$b("DepthToSpace",d,{blocksize:h,mode:Ne(_),format:y?"NHWC":"NCHW"})},978861:(d,h,_,y)=>{t.$b("DepthToSpace",d,{blocksize:h,mode:Ne(_),format:y?"NHWC":"NCHW"})},978994:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee,Vt)=>{t.$b("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[_],group:y,kernelShape:[k],pads:[z,N],strides:[B],wIsConst:()=>!!($(),L)[Q>>>0],outputPadding:pe?Array.from(($(),P).subarray(Number(pe)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),P).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(Vt)})},979427:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee)=>{t.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),P).subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),group:y,kernelShape:Array.from(($(),P).subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),pads:Array.from(($(),P).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from(($(),P).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),L)[j>>>0],outputPadding:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},980088:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee,Vt)=>{t.$b("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[_],group:y,kernelShape:[k],pads:[z,N],strides:[B],wIsConst:()=>!!($(),L)[Q>>>0],outputPadding:pe?Array.from(($(),P).subarray(Number(pe)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),P).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(Vt)})},980521:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee)=>{t.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),P).subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),group:y,kernelShape:Array.from(($(),P).subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),pads:Array.from(($(),P).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from(($(),P).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),L)[j>>>0],outputPadding:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},981182:(d,h)=>{t.$b("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},981273:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee)=>{t.$b("AveragePool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:_,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},981752:(d,h)=>{t.$b("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},981843:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee)=>{t.$b("AveragePool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:_,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982322:(d,h)=>{t.$b("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},982409:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee)=>{t.$b("MaxPool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:_,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982884:(d,h)=>{t.$b("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},982971:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee)=>{t.$b("MaxPool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:_,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},983446:(d,h,_,y,k)=>{t.$b("Gemm",d,{alpha:h,beta:_,transA:y,transB:k})},983550:d=>{t.$b("MatMul",d,void 0)},983604:(d,h,_,y)=>{t.$b("ArgMax",d,{keepDims:!!h,selectLastIndex:!!_,axis:y})},983712:(d,h,_,y)=>{t.$b("ArgMin",d,{keepDims:!!h,selectLastIndex:!!_,axis:y})},983820:(d,h)=>{t.$b("Softmax",d,{axis:h})},983883:(d,h)=>{t.$b("Concat",d,{axis:h})},983943:(d,h,_,y,k)=>{t.$b("Split",d,{axis:h,numOutputs:_,splitSizes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},984099:d=>{t.$b("Expand",d,void 0)},984153:(d,h)=>{t.$b("Gather",d,{axis:Number(h)})},984224:(d,h)=>{t.$b("GatherElements",d,{axis:Number(h)})},984303:(d,h)=>{t.$b("GatherND",d,{batch_dims:Number(h)})},984382:(d,h,_,y,k,z,N,B,j,Q,pe)=>{t.$b("Resize",d,{antialias:h,axes:_?Array.from(($(),P).subarray(Number(_)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Ne(k),cubicCoeffA:z,excludeOutside:N,extrapolationValue:B,keepAspectRatioPolicy:Ne(j),mode:Ne(Q),nearestMode:Ne(pe)})},984744:(d,h,_,y,k,z,N)=>{t.$b("Slice",d,{starts:h?Array.from(($(),P).subarray(Number(h)>>>0,Number(_)>>>0)):[],ends:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[],axes:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[]})},985008:d=>{t.$b("Tile",d,void 0)},985060:(d,h,_)=>{t.$b("InstanceNormalization",d,{epsilon:h,format:_?"NHWC":"NCHW"})},985174:(d,h,_)=>{t.$b("InstanceNormalization",d,{epsilon:h,format:_?"NHWC":"NCHW"})},985288:d=>{t.$b("Range",d,void 0)},985341:(d,h)=>{t.$b("Einsum",d,{equation:Ne(h)})},985422:(d,h,_,y,k)=>{t.$b("Pad",d,{mode:h,value:_,pads:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},985565:(d,h,_,y,k,z)=>{t.$b("BatchNormalization",d,{epsilon:h,momentum:_,spatial:!!k,trainingMode:!!y,format:z?"NHWC":"NCHW"})},985734:(d,h,_,y,k,z)=>{t.$b("BatchNormalization",d,{epsilon:h,momentum:_,spatial:!!k,trainingMode:!!y,format:z?"NHWC":"NCHW"})},985903:(d,h,_)=>{t.$b("CumSum",d,{exclusive:Number(h),reverse:Number(_)})},986e3:(d,h,_)=>{t.$b("DequantizeLinear",d,{axis:h,blockSize:_})},986090:(d,h,_,y,k)=>{t.$b("GridSample",d,{align_corners:h,mode:Ne(_),padding_mode:Ne(y),format:k?"NHWC":"NCHW"})},986260:(d,h,_,y,k)=>{t.$b("GridSample",d,{align_corners:h,mode:Ne(_),padding_mode:Ne(y),format:k?"NHWC":"NCHW"})},986430:(d,h)=>{t.$b("ScatterND",d,{reduction:Ne(h)})},986515:(d,h,_,y,k,z,N,B,j)=>{t.$b("Attention",d,{numHeads:h,isUnidirectional:_,maskFilterValue:y,scale:k,doRotary:z,qkvHiddenSizes:N?Array.from(($(),P).subarray(Number(B)>>>0,Number(B)+N>>>0)):[],pastPresentShareBuffer:!!j})},986787:d=>{t.$b("BiasAdd",d,void 0)},986842:d=>{t.$b("BiasSplitGelu",d,void 0)},986903:d=>{t.$b("FastGelu",d,void 0)},986959:(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee,Vt,ia)=>{t.$b("Conv",d,{format:we?"NHWC":"NCHW",auto_pad:h,dilations:_?Array.from(($(),P).subarray(Number(_)>>>0,Number(y)>>>0)):[],group:k,kernel_shape:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],strides:Q?Array.from(($(),P).subarray(Number(Q)>>>0,Number(pe)>>>0)):[],w_is_const:()=>!!($(),L)[Number(ke)>>>0],activation:Ne(Ee),activation_params:Vt?Array.from(($(),W).subarray(Number(Vt)>>>0,Number(ia)>>>0)):[]})},987543:d=>{t.$b("Gelu",d,void 0)},987595:(d,h,_,y,k,z,N,B,j)=>{t.$b("GroupQueryAttention",d,{numHeads:h,kvNumHeads:_,scale:y,softcap:k,doRotary:z,rotaryInterleaved:N,smoothSoftmax:B,localWindowSize:j})},987812:(d,h,_,y)=>{t.$b("LayerNormalization",d,{axis:h,epsilon:_,simplified:!!y})},987923:(d,h,_,y)=>{t.$b("LayerNormalization",d,{axis:h,epsilon:_,simplified:!!y})},988034:(d,h,_,y,k,z)=>{t.$b("MatMulNBits",d,{k:h,n:_,accuracyLevel:y,bits:k,blockSize:z})},988161:(d,h,_,y,k,z)=>{t.$b("MultiHeadAttention",d,{numHeads:h,isUnidirectional:_,maskFilterValue:y,scale:k,doRotary:z})},988320:(d,h)=>{t.$b("QuickGelu",d,{alpha:h})},988384:(d,h,_,y,k)=>{t.$b("RotaryEmbedding",d,{interleaved:!!h,numHeads:_,rotaryEmbeddingDim:y,scale:k})},988523:(d,h,_)=>{t.$b("SkipLayerNormalization",d,{epsilon:h,simplified:!!_})},988625:(d,h,_)=>{t.$b("SkipLayerNormalization",d,{epsilon:h,simplified:!!_})},988727:(d,h,_,y)=>{t.$b("GatherBlockQuantized",d,{gatherAxis:h,quantizeAxis:_,blockSize:y})},988848:d=>{t.Fd(d)},988882:(d,h)=>t.Hd(Number(d),Number(h),t.Yc.Kd,t.Yc.errors)};function Mw(d,h,_){return Cl(async()=>{await t.Dd(Number(d),Number(h),Number(_))})}function Aw(){return typeof wasmOffsetConverter<"u"}function Nw(d,h,_,y){var k=me();try{return uu(d,h,_,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function Pw(d,h,_){var y=me();try{return au(d,h,_)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function Rw(d){var h=me();try{nu(d)}catch(_){if(he(h),_!==_+0)throw _;ge(1,0)}}function Ow(d,h){var _=me();try{return na(d,h)}catch(y){if(he(_),y!==y+0)throw y;ge(1,0)}}function Bw(d,h,_){var y=me();try{tu(d,h,_)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function Dw(d,h){var _=me();try{du(d,h)}catch(y){if(he(_),y!==y+0)throw y;ge(1,0)}}function Lw(d,h,_,y,k,z,N){var B=me();try{return su(d,h,_,y,k,z,N)}catch(j){if(he(B),j!==j+0)throw j;ge(1,0)}}function Uw(d,h,_,y,k,z){var N=me();try{ru(d,h,_,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function Fw(d,h,_,y){var k=me();try{lu(d,h,_,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function Ww(d,h,_,y,k){var z=me();try{iu(d,h,_,y,k)}catch(N){if(he(z),N!==N+0)throw N;ge(1,0)}}function qw(d,h,_,y,k,z,N){var B=me();try{pu(d,h,_,y,k,z,N)}catch(j){if(he(B),j!==j+0)throw j;ge(1,0)}}function Vw(d,h,_,y,k,z,N){var B=me();try{hu(d,h,_,y,k,z,N)}catch(j){if(he(B),j!==j+0)throw j;ge(1,0)}}function Hw(d,h,_,y,k,z,N,B){var j=me();try{bu(d,h,_,y,k,z,N,B)}catch(Q){if(he(j),Q!==Q+0)throw Q;ge(1,0)}}function Gw(d,h,_,y,k){var z=me();try{return cu(d,h,_,y,k)}catch(N){if(he(z),N!==N+0)throw N;ge(1,0)}}function jw(d,h,_){var y=me();try{return yu(d,h,_)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function Kw(d,h,_,y,k,z,N,B){var j=me();try{wu(d,h,_,y,k,z,N,B)}catch(Q){if(he(j),Q!==Q+0)throw Q;ge(1,0)}}function Xw(d,h,_,y,k,z,N,B,j,Q,pe,we){var ke=me();try{fu(d,h,_,y,k,z,N,B,j,Q,pe,we)}catch(Ee){if(he(ke),Ee!==Ee+0)throw Ee;ge(1,0)}}function Yw(d,h,_,y,k,z){var N=me();try{return mu(d,h,_,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function Qw(d,h,_){var y=me();try{return _u(d,h,_)}catch(k){if(he(y),k!==k+0)throw k;return ge(1,0),0n}}function Zw(d,h,_,y,k,z,N,B,j){var Q=me();try{ou(d,h,_,y,k,z,N,B,j)}catch(pe){if(he(Q),pe!==pe+0)throw pe;ge(1,0)}}function Jw(d){var h=me();try{return xu(d)}catch(_){if(he(h),_!==_+0)throw _;ge(1,0)}}function e_(d,h){var _=me();try{return Ou(d,h)}catch(y){if(he(_),y!==y+0)throw y;return ge(1,0),0n}}function t_(d){var h=me();try{return vu(d)}catch(_){if(he(h),_!==_+0)throw _;return ge(1,0),0n}}function n_(d,h,_,y){var k=me();try{return Eu(d,h,_,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function r_(d,h,_,y,k){var z=me();try{return Iu(d,h,_,y,k)}catch(N){if(he(z),N!==N+0)throw N;ge(1,0)}}function i_(d,h,_,y,k,z){var N=me();try{return zu(d,h,_,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function a_(d,h,_,y,k,z){var N=me();try{return Mu(d,h,_,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function o_(d,h,_,y,k,z,N,B){var j=me();try{return gu(d,h,_,y,k,z,N,B)}catch(Q){if(he(j),Q!==Q+0)throw Q;ge(1,0)}}function s_(d,h,_,y,k){var z=me();try{return Au(d,h,_,y,k)}catch(N){if(he(z),N!==N+0)throw N;return ge(1,0),0n}}function l_(d,h,_,y){var k=me();try{return Nu(d,h,_,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function u_(d,h,_,y){var k=me();try{return Pu(d,h,_,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function d_(d,h,_,y,k,z,N,B,j,Q,pe,we){var ke=me();try{return Ru(d,h,_,y,k,z,N,B,j,Q,pe,we)}catch(Ee){if(he(ke),Ee!==Ee+0)throw Ee;ge(1,0)}}function c_(d,h,_,y,k,z,N,B,j,Q,pe){var we=me();try{Tu(d,h,_,y,k,z,N,B,j,Q,pe)}catch(ke){if(he(we),ke!==ke+0)throw ke;ge(1,0)}}function p_(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee,Vt,ia){var g_=me();try{Cu(d,h,_,y,k,z,N,B,j,Q,pe,we,ke,Ee,Vt,ia)}catch(aa){if(he(g_),aa!==aa+0)throw aa;ge(1,0)}}function h_(d,h,_){var y=me();try{return $u(d,h,_)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function f_(d,h,_){var y=me();try{return Su(d,h,_)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function m_(d,h,_,y){var k=me();try{ku(d,h,_,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function Fr(){if(0<Qe)Ke=Fr;else if(i)x==null||x(t),Y();else{for(var d=je;0<d.length;)d.shift()(t);0<Qe?Ke=Fr:(t.calledRun=!0,M||(Y(),x==null||x(t)))}}return i||(zt=await Ve(),Fr()),t.PTR_SIZE=4,U?t:new Promise((d,h)=>{x=d,T=h})}var Lf,Yu,O1=q(()=>{var e,t;Lf=Xu,Yu=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Yu&&Xu()}),ha,$o,Qu,Je,Uf,Vr,Zu,Ju,fa,ed,ma,Ff,ga,Wf,Jo=q(()=>{Zo(),ha=typeof location>"u"?void 0:location.origin,$o=import.meta.url>"file:"&&import.meta.url<"file;",Qu=()=>{{if($o){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ha).href}return import.meta.url}},Je=Qu(),Uf=()=>{if(Je&&!Je.startsWith("blob:"))return Je.substring(0,Je.lastIndexOf("/")+1)},Vr=(e,t)=>{try{let n=t??Je;return(n?new URL(e,n):new URL(e)).origin===ha}catch{return!1}},Zu=(e,t)=>{let n=t??Je;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Ju=(e,t)=>`${t??"./"}${e}`,fa=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ed=async e=>(await import(e)).default,ma=(R1(),vr(Of)).default,Ff=async()=>{if(!Je)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Vr(Je))return[void 0,ma()];let e=await fa(Je);return[e,ma(e)]},ga=(O1(),vr(Df)).default,Wf=async(e,t,n,r)=>{let i=ga&&!(e||t);if(i)if(Je)i=Vr(Je)||r&&!n;else if(r&&!n)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,ga];{let a="ort-wasm-simd-threaded.jsep.mjs",o=e??Zu(a,t),s=n&&o&&!Vr(o,t),l=s?await fa(o):o??Ju(a,t);return[s?l:void 0,await ed(l)]}}}),ba,Hr,Qn,ya,td,nd,rd,es,Te,kn=q(()=>{Jo(),Hr=!1,Qn=!1,ya=!1,td=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},nd=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},rd=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},es=async e=>{if(Hr)return Promise.resolve();if(Qn)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ya)throw new Error("previous call to 'initializeWebAssembly()' failed.");Qn=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!rd())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!nd())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=td();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,o=i==null?void 0:i.mjs,s=(o==null?void 0:o.href)??o,l=i==null?void 0:i.wasm,u=(l==null?void 0:l.href)??l,c=e.wasmBinary,[p,f]=await Wf(s,a,n>1,!!c||!!u),g=!1,b=[];if(t>0&&b.push(new Promise(x=>{setTimeout(()=>{g=!0,x()},t)})),b.push(new Promise((x,T)=>{let w={numThreads:n};if(c)w.wasmBinary=c,w.locateFile=v=>v;else if(u||a)w.locateFile=v=>u??a+v;else if(s&&s.indexOf("blob:")!==0)w.locateFile=v=>new URL(v,s).href;else if(p){let v=Uf();v&&(w.locateFile=E=>v+E)}f(w).then(v=>{Qn=!1,Hr=!0,ba=v,x(),p&&URL.revokeObjectURL(p)},v=>{Qn=!1,ya=!0,T(v)})})),await Promise.race(b),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Te=()=>{if(Hr&&ba)return ba;throw new Error("WebAssembly is not initialized yet.")}}),ft,ci,$e,ts=q(()=>{kn(),ft=(e,t)=>{let n=Te(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},ci=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([i,a])=>{let o=t?t+i:i;if(typeof a=="object")ci(a,o+".",n,r);else if(typeof a=="string"||typeof a=="number")r(o,a.toString());else if(typeof a=="boolean")r(o,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},$e=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,r===4?"i32":"i64")),o=t.getValue(i+r,"*"),s=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(n)}}}),qf,B1=q(()=>{kn(),ts(),qf=e=>{let t=Te(),n=0,r=[],i=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(i.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=ft(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&$e("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&ci(e.extra,"",new WeakSet,(o,s)=>{let l=ft(o,r),u=ft(s,r);t._OrtAddRunConfigEntry(n,l,u)!==0&&$e(`Can't set a run config entry: ${o} - ${s}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(o=>t._free(o)),a}}}),id,ad,od,rn,sd,Vf,D1=q(()=>{kn(),ts(),id=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},ad=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},od=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},rn=(e,t,n,r)=>{let i=ft(t,r),a=ft(n,r);Te()._OrtAddSessionConfigEntry(e,i,a)!==0&&$e(`Can't set a session config entry: ${t} - ${n}.`)},sd=async(e,t,n)=>{let r=t.executionProviders;for(let i of r){let a=typeof i=="string"?i:i.name,o=[];switch(a){case"webnn":if(a="WEBNN",rn(e,"session.disable_quant_qdq","1",n),rn(e,"session.disable_qdq_constant_folding","1",n),typeof i!="string"){let p=i==null?void 0:i.deviceType;p&&rn(e,"deviceType",p,n)}break;case"webgpu":if(a="JS",typeof i!="string"){let p=i;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);rn(e,"preferredLayout",p.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=ft(a,n),l=o.length,u=0,c=0;if(l>0){u=Te()._malloc(l*Te().PTR_SIZE),n.push(u),c=Te()._malloc(l*Te().PTR_SIZE),n.push(c);for(let p=0;p<l;p++)Te().setValue(u+p*Te().PTR_SIZE,o[p][0],"*"),Te().setValue(c+p*Te().PTR_SIZE,o[p][1],"*")}await Te()._OrtAppendExecutionProvider(e,s,u,c,l)!==0&&$e(`Can't append execution provider: ${a}.`)}},Vf=async e=>{let t=Te(),n=0,r=[],i=e||{};od(i);try{let a=id(i.graphOptimizationLevel??"all"),o=ad(i.executionMode??"sequential"),s=typeof i.logId=="string"?ft(i.logId,r):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let u=i.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log verbosity level is not valid: ${u}`);let c=typeof i.optimizedModelFilePath=="string"?ft(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,o,!!i.enableProfiling,0,s,l,u,c),n===0&&$e("Can't create session options."),i.executionProviders&&await sd(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);rn(n,"enableGraphCapture",i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[p,f]of Object.entries(i.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let g=ft(p,r);t._OrtAddFreeDimensionOverride(n,g,f)!==0&&$e(`Can't set a free dimension override: ${p} - ${f}.`)}return i.extra!==void 0&&ci(i.extra,"",new WeakSet,(p,f)=>{rn(n,p,f,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&$e("Can't release session options."),r.forEach(o=>t._free(o)),a}}}),cn,Nt,pn,Ai,pi,ns,rs,So,ae=q(()=>{cn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Nt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},pn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return n>0?Math.ceil(r*n):void 0},Ai=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},pi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ns=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",rs=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",So=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),is,Hf=q(()=>{Zo(),is=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(s){if(s instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw s}let o=0;for(;;){let{done:s,value:l}=await i.read();if(s)break;let u=l.byteLength;new Uint8Array(a,o,u).set(l),o+=u}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),ld,ud,dd,cd,as,pd,ye,Bt=q(()=>{ae(),ld=["V","I","W","E","F"],ud=(e,t)=>{console.log(`[${ld[e]},${new Date().toISOString()}]${t}`)},as=(e,t)=>{dd=e,cd=t},pd=(e,t)=>{let n=pi(e),r=pi(dd);n>=r&&ud(n,typeof t=="function"?t():t)},ye=(...e)=>{cd&&pd(...e)}}),hd,Bn,R,hi,Gf,jf,Kf,de=q(()=>{hd=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Bn=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),o=new Array(a);if(n){if(r<2||i<2)return;let s=hd.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(s===void 0)return;[o[a-2],o[a-1]]=s}for(let s=n?3:1;s<=a;s++){let l=r-s<0?1:e[r-s],u=i-s<0?1:t[i-s];if(l!==u&&l>1&&u>1)return;let c=Math.max(l,u);if(l&&u)o[a-s]=Math.max(l,u);else{if(c>1)return;o[a-s]=0}}return o}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},R=class ni{static size(t){return ni.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let i=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){i[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,n/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ni.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ni.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let i=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let i=n-3;i>=0;--i)r[i]=r[i+1]*t[i+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((i,a)=>i+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,i)=>r===n[i])}},hi=class ur{static adjustPoolAttributes(t,n,r,i,a,o){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let s=0;s<n.length-2;s++)s>=r.length?r.push(n[s+2]):r[s]=n[s+2];for(let s=0;s<r.length;s++)if(s<i.length){if(i[s]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let s=0;s<r.length;s++)if(s<a.length){if(a[s]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let s=0;s<r.length*2;s++)if(s<o.length){if(o[s]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let s=0;s<r.length;s++){if(r[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[s]>=r[s]||o[s+r.length]>=r[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,o,s){if(s){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)ur.adjustPadAndReturnShape(t[l+(o?1:2)],n[l],r[l],i[l],a,l,l+t.length-2,s)}}static computePoolOutputShape(t,n,r,i,a,o,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return ur.computeShapeHelper(t,n,l,r,i,a,o,s),l}static computeConvOutputShape(t,n,r,i,a,o,s){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return ur.computeShapeHelper(!1,t,l,r,i,a,o,s),l}static computeShapeHelper(t,n,r,i,a,o,s,l){if(t)for(let u=0;u<n.length-2;u++)r.push(1);else for(let u=0;u<n.length-2;u++)r.push(ur.adjustPadAndReturnShape(n[u+2],i[u],a[u],o[u],s,u,u+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,i,a,o,s,l){let u=r*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[o]=0,a[s]=0,Math.floor((t-u)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+i-t;return a[o]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),a[s]=c-a[o],Math.floor((t+c-i)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[o]+a[s]-u)/n+1)}},Gf=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,o,s;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let l=-1;if(r?(s=n[0],l=1):(s=n[1],l=0),n[l]!==o)throw new Error("dimension mismatch");if(a<=0||s<=0||o<=0)throw new Error("invalid shape specified");if(i&&!Bn.isValidBroadcast(i,[a,s]))throw new Error("gemm: invalid bias shape for broadcast");return[a,s,o]}},jf=-34028234663852886e22,Kf=34028234663852886e22}),os,Xf=q(()=>{ae(),os=(e,t)=>new(Ai(t))(e)}),wa,ko,_a,fd,xa,md,va,$a,Sa,gd,Yf,L1=q(()=>{ae(),Bt(),wa=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ko=(e,t)=>{if(t==="int32")return e;let n=wa.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(Ai(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let o=new Int32Array(i);for(let s=0;s<i;s++){let l=a[s];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");o[s]=Number(l)}return new Uint8Array(o.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let o=Int32Array.from(a,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},_a=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let i=BigInt64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(r,Number);return new Uint8Array(i.buffer)}case"uint8":{if(r.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(r,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},fd=1,xa=()=>fd++,md=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),va=(e,t)=>{let n=wa.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,i)=>r*i)*n/8):0},$a=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return va(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=_a(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return n.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,i)=>r===n[i])}setIsDataConverted(e){this.isDataConverted=e}},Sa=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!(a!=null&&a.input.dataTypes.includes(t))){if(o=md.get(t),!o||(a==null?void 0:a.input.dataTypes.includes(o)))throw new Error(`WebNN backend does not support data type: ${t}`);ye("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==va(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,s,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ko(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let r=(t=this.wrapper)!=null&&t.isDataConverted?_a(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},gd=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=xa();return this.tensorTrackersById.set(e,new Sa(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=xa(),o=new $a({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new Sa(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,n,r,i,a,o){let s=this.getMLContext(e);for(let[u,c]of this.freeTensors.entries())if(c.canReuseTensor(s,t,n)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${n}`);let p=this.freeTensors.splice(u,1)[0];return p.sessionId=e,p}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${n}}`);let l=await s.createTensor({dataType:o??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new $a({sessionId:e,context:s,tensor:l,dataType:t,shape:n,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Yf=(...e)=>new gd(...e)}),Zn,bd,Qf,U1=q(()=>{ae(),kn(),Xf(),L1(),Bt(),Zn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),bd=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((i,a)=>i===r[a]&&e[i]===t[i])},Qf=class{constructor(e){this.tensorManager=Yf(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,as(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>bd(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(i=>i.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=Zn.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=Zn.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Te().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return os(n,t)}}registerMLTensor(e,t,n,r){let i=Zn.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,r,i,a,o=!1){if(!a)throw new Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let l=a.get(s);if(!l)throw new Error(`File with name ${s} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let u=l.slice(t,t+n).buffer,c;switch(i.dataType){case"float32":c=new Float32Array(u);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(u):new Uint16Array(u);break;case"int32":c=new Int32Array(u);break;case"uint32":c=new Uint32Array(u);break;case"int64":if(o){let p=ko(new Uint8Array(u),"int64");c=new Int32Array(p.buffer),i.dataType="int32"}else c=new BigInt64Array(u);break;case"uint64":c=new BigUint64Array(u);break;case"int8":c=new Int8Array(u);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(u);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ye("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(i,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=Zn.get(cn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!(i!=null&&i.input.dataTypes.includes(r)):!!(i!=null&&i.output.dataTypes.includes(r))}flush(){}}}),ss=q(()=>{}),ka,Gr,jr,yd,wd,Ta,To,_d,Zf,F1=q(()=>{Bt(),ss(),ka=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Gr=[],jr=e=>Math.ceil(Number(e)/16)*16,yd=e=>{for(let t=0;t<Gr.length;t++){let n=Gr[t];if(e<=n)return n}return Math.ceil(e/16)*16},wd=1,Ta=()=>wd++,To=async(e,t,n,r)=>{let i=jr(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(s,0,n)),l}else return new Uint8Array(s.slice(0,n))}finally{a.destroy()}},_d=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ka)Gr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=jr(i),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);let s=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=s.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,r,i)),s.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(s,0,o.gpuData.buffer,0,a),this.backend.device.queue.submit([u.finish()]),s.destroy(),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=jr(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Ta();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=yd(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let s=(i?this.freeBuffers:this.freeUniformBuffers).get(n);s?s.length>0?r=s.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let o={id:Ta(),type:0,buffer:r};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await To(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ka.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Zf=(...e)=>new _d(...e)}),xd,ve,Ae=q(()=>{xd=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new xd(e)}),Dn,Kr,Re,qe,ne,ze,Co,Pn,Yt,ee,Jn,D,J,Jf,ls,vd,em,ce=q(()=>{ae(),de(),Dn=64,Kr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Re=(e,t=1)=>{let n=Kr(e,t);return typeof n=="string"?n:n[0]},qe=(e,t=1)=>{let n=Kr(e,t);return typeof n=="string"?n:n[1]},ne=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:R.computeStrides(n)})}),t},ze=e=>e%4===0?4:e%2===0?2:1,Co=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Pn=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Yt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ee=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Jn=(e,t,n,r,i)=>{let a=typeof n=="number",o=a?n:n.length,s=[...new Array(o).keys()],l=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,u=Kr(t,i),c=typeof u=="string"?u:u[1],p=typeof u=="string"?u:u[0],f={indices:l,value:c,storage:p,tensor:t},g=U=>typeof U=="string"?U:`${U}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},x=a?"uniforms.":"",T=`${x}${e}_shape`,w=`${x}${e}_strides`,v="";for(let U=0;U<o-1;U++)v+=`
    let dim${U} = current / ${ee(w,U,o)};
    let rest${U} = current % ${ee(w,U,o)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${o-1}] = current;`;let E=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${v}
    return indices;
  }`,C=U=>(b.offsetToIndices=!0,o<2?U:`o2i_${e}(${U})`),I=[];if(o>=2)for(let U=o-1;U>=0;U--)I.push(`${ee(w,U,o)} * (indices[${U}])`);let M=o<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${I.join("+")};
  }`,A=U=>(b.indicesToOffset=!0,o<2?U:`i2o_${e}(${U})`),$=(...U)=>o===0?"0u":`${f.indices}(${U.map(g).join(",")})`,O=(U,G)=>o<2?`${U}`:`${ee(U,G,o)}`,L=(U,G,Y)=>o<2?`${U}=${Y};`:`${ee(U,G,o)}=${Y};`,H={},K=(U,G)=>{b.broadcastedIndicesToOffset=!0;let Y=`${G.name}broadcastedIndicesTo${e}Offset`;if(Y in H)return`${Y}(${U})`;let V=[];for(let _e=o-1;_e>=0;_e--){let Ve=G.indicesGet("outputIndices",_e+G.rank-o);V.push(`${O(w,_e)} * (${Ve} % ${O(T,_e)})`)}return H[Y]=`fn ${Y}(outputIndices: ${G.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${Y}(${U})`},X=(U,G)=>(()=>{if(f.storage===f.value)return`${e}[${U}]=${G};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${G}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),P=U=>(()=>{if(f.storage===f.value)return`${e}[${U}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${U}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${U}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Z=o<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${c} {
    return ${P(`i2o_${e}(indices)`)};
  }`,W=o<2?"":(()=>{let U=s.map(Y=>`d${Y}: u32`).join(", "),G=s.map(Y=>`d${Y}`).join(", ");return`
  fn get_${e}(${U}) -> ${c} {
    return get_${e}ByIndices(${$(G)});
  }`})(),te=(...U)=>{if(U.length!==o)throw new Error(`indices length must be ${o}`);let G=U.map(g).join(",");return o===0?P("0u"):o===1?P(G[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${G})`)},ie=U=>o<2?P(U):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${U})`),F=o<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${c}) {
    ${X(`i2o_${e}(indices)`,"value")}
  }`,re=o<2?"":(()=>{let U=s.map(Y=>`d${Y}: u32`).join(", "),G=s.map(Y=>`d${Y}`).join(", ");return`
  fn set_${e}(${U}, value: ${c}) {
    set_${e}ByIndices(${$(G)}, value);
  }`})();return{impl:()=>{let U=[],G=!1;return b.offsetToIndices&&(U.push(E),G=!0),b.indicesToOffset&&(U.push(M),G=!0),b.broadcastedIndicesToOffset&&(Object.values(H).forEach(Y=>U.push(Y)),G=!0),b.set&&(U.push(re),G=!0),b.setByIndices&&(U.push(F),G=!0),b.get&&(U.push(W),G=!0),b.getByIndices&&(U.push(Z),G=!0),!a&&G&&U.unshift(`const ${T} = ${f.indices}(${n.join(",")});`,`const ${w} = ${f.indices}(${R.computeStrides(n).join(",")});`),U.join(`
`)},type:f,offsetToIndices:C,indicesToOffset:A,broadcastedIndicesToOffset:K,indices:$,indicesGet:O,indicesSet:L,set:(...U)=>{if(U.length!==o+1)throw new Error(`indices length must be ${o}`);let G=U[o];if(typeof G!="string")throw new Error("value must be string");let Y=U.slice(0,o).map(g).join(",");return o===0?X("0u",G):o===1?X(Y[0],G):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${Y}, ${G})`)},setByOffset:X,setByIndices:(U,G)=>o<2?X(U,G):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${G});`),get:te,getByOffset:P,getByIndices:ie,usage:r,name:e,strides:w,shape:T,rank:o}},D=(e,t,n,r=1)=>Jn(e,t,n,"input",r),J=(e,t,n,r=1)=>Jn(e,t,n,"output",r),Jf=(e,t,n)=>Jn(e,t,n,"atomicOutput",1),ls=(e,t,n,r=1)=>Jn(e,t,n,"internal",r),vd=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Dn){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${a}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let i=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},em=(e,t)=>new vd(e,t)}),$d,Ca,Sd,kd,Td,Cd,nt,tm,nm,Zt=q(()=>{ae(),de(),Ae(),ce(),$d=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ca=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Sd=(e,t)=>R.sortBasedOnPerm(e,Ca(e.length,t)),kd=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},Td=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},Cd=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},nt=(e,t)=>{let n=e.dataType,r=e.dims.length,i=Ca(r,t),a=Sd(e.dims,i),o=e.dims,s=a,l=r<2||Cd(i,e.dims),u;if(l)return u=b=>{let x=D("input",n,o,4),T=J("output",n,s,4);return`
  ${b.registerUniform("output_size","u32").declareVariables(x,T)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64/4)},programUniforms:[{type:12,data:Math.ceil(b/4)}]}},getShaderSource:u};let{newShape:c,newPerm:p}=Td(e.dims,i),f=R.areEqual(p,[2,3,1]),g=R.areEqual(p,[3,1,2]);if(c.length===2||f||g){o=f?[c[0],c[1]*c[2]]:g?[c[0]*c[1],c[2]]:c,s=[o[1],o[0]];let b=16;return u=x=>{let T=D("a",n,o.length),w=J("output",n,s.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(T,w)}
  var<workgroup> tile : array<array<${w.type.value}, ${b+1}>, ${b}>;
  ${x.mainStart([b,b,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${b} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${b}u + local_id.x;
    let input_row = workgroup_id_x * ${b}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${b}u + local_id.x;
    let output_row = workgroup_id_y * ${b}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${w.setByIndices(`${w.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/b),y:Math.ceil(s[0]/b)},programUniforms:[{type:12,data:x},...ne(o,s)]}},getShaderSource:u}}return u=b=>{let x=D("a",n,o.length),T=J("output",n,s.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(x,T)}

  ${kd(i,r,x,T)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let b=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...ne(o,s)]}},getShaderSource:u}},tm=(e,t)=>{$d(e.inputs,t.perm),e.compute(nt(e.inputs[0],t.perm))},nm=e=>ve({perm:e.perm})}),Ed,Id,zd,Md,Ad,Nd,Pd,Rd,Od,Bd,ut,rm,im,am,om,sm,lm,um,dm,cm,pm,W1=q(()=>{ae(),de(),ce(),us(),Zt(),Ed={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Id={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},zd={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Md={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ad=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Nd=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let i=t.map(a=>e[a]);return[n,i]},Pd=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},Rd=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Od=(e,t)=>{let n=[];if(!Rd(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Bd=(e,t,n,r,i,a,o)=>{let s=n[0].dims,l=R.size(a),u=R.size(o),c=D("_A",n[0].dataType,s),p=J("output",i,a),f=64;l===1&&(f=256);let g=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,b=x=>`
        ${x.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${x.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${zd[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${Ed[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Id[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${r==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${Md[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:u}]})}},ut=(e,t,n,r)=>{let i=e.inputs.length===1?n:Eo(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((g,b)=>b));let o=R.normalizeAxes(a,e.inputs[0].dims.length),s=o,l=e.inputs[0],u=Od(s,e.inputs[0].dims.length);u.length>0&&(l=e.compute(nt(e.inputs[0],u),{inputs:[0],outputs:[-1]})[0],s=Ad(s.length,l.dims.length));let[c,p]=Nd(l.dims,s),f=c;i.keepDims&&(f=Pd(c,o)),e.compute(Bd(t,i.cacheKey,[l],r,e.inputs[0].dataType,f,p),{inputs:[l]})},rm=(e,t)=>{ut(e,"ReduceMeanShared",t,"mean")},im=(e,t)=>{ut(e,"ReduceL1Shared",t,"l1")},am=(e,t)=>{ut(e,"ReduceL2Shared",t,"l2")},om=(e,t)=>{ut(e,"ReduceLogSumExpShared",t,"logSumExp")},sm=(e,t)=>{ut(e,"ReduceMaxShared",t,"max")},lm=(e,t)=>{ut(e,"ReduceMinShared",t,"min")},um=(e,t)=>{ut(e,"ReduceProdShared",t,"prod")},dm=(e,t)=>{ut(e,"ReduceSumShared",t,"sum")},cm=(e,t)=>{ut(e,"ReduceSumSquareShared",t,"sumSquare")},pm=(e,t)=>{ut(e,"ReduceLogSumShared",t,"logSum")}}),dt,Dd,fi,Eo,ct,Ld,Ud,Fd,Wd,qd,Vd,Hd,Gd,jd,Kd,pt,hm,fm,mm,gm,bm,ym,wm,_m,xm,vm,us=q(()=>{ae(),de(),Ae(),ce(),W1(),dt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Dd=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],fi=(e,t,n,r,i,a,o=!1,s=!1)=>{let l=[],u=n[0].dims,c=u.length,p=R.normalizeAxes(i,c),f=!s&&p.length===0;u.forEach((x,T)=>{f||p.indexOf(T)>=0?o&&l.push(1):l.push(x)});let g=l.length,b=R.size(l);return{name:e,shaderCache:t,getShaderSource:x=>{let T=[],w=D("_A",n[0].dataType,c),v=J("output",a,g),E=r(w,v,p),C=E[2];for(let I=0,M=0;I<c;I++)f||p.indexOf(I)>=0?(o&&M++,C=`for(var j${I}: u32 = 0; j${I} < ${u[I]}; j${I}++) {
                  ${E[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${w.indicesSet("input_indices",I,`j${I}`)}
                  ${C}
                }`):(T.push(`${w.indicesSet("input_indices",I,v.indicesGet("output_indices",M))};`),M++);return`

        ${x.registerUniform("output_size","u32").declareVariables(w,v)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${v.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${E[0]}       // init ops for reduce max/min
          ${E[1]}
          ${C}
          ${E[3]}
          ${E.length===4?v.setByOffset("global_idx","value"):E.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...ne(u,l)]})}},Eo=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),ve({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ct=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:Eo(i,n);e.compute(fi(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?Dd:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Ld=(e,t)=>{dt(e.inputs),ct(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Ud=(e,t)=>{dt(e.inputs),ct(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Fd=(e,t)=>{dt(e.inputs),ct(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Wd=(e,t)=>{dt(e.inputs),ct(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},qd=(e,t)=>{dt(e.inputs),ct(e,"ReduceMax",t,(n,r,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",o,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Vd=(e,t)=>{dt(e.inputs),ct(e,"ReduceMean",t,(n,r,i)=>{let a=1;for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&(a*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${a});`]})},Hd=(e,t)=>{dt(e.inputs),ct(e,"ReduceMin",t,(n,r,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Gd=(e,t)=>{dt(e.inputs),ct(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},jd=(e,t)=>{dt(e.inputs),ct(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Kd=(e,t)=>{dt(e.inputs),ct(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},pt=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:i*=e[a];return i<32&&r>1024},hm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vd(e,t):rm(e,t)},fm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ud(e,t):im(e,t)},mm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Fd(e,t):am(e,t)},gm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wd(e,t):om(e,t)},bm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qd(e,t):sm(e,t)},ym=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Hd(e,t):lm(e,t)},wm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Gd(e,t):um(e,t)},_m=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?jd(e,t):dm(e,t)},xm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Kd(e,t):cm(e,t)},vm=(e,t)=>{pt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ld(e,t):pm(e,t)}}),Ea,$m,Sm,Io,q1=q(()=>{ae(),Ae(),us(),Ea=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},$m=(e,t)=>{Ea(e.inputs);let n=(r,i,a)=>{let o=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&o.push(`input_indices[${s}] = 0;`);return[`${o.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(fi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Sm=(e,t)=>{Ea(e.inputs);let n=(r,i,a)=>{let o=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&o.push(`input_indices[${s}] = 0;`);return[`${o.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(fi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Io=e=>ve(e)}),Xd,Xr,Yd,Qd,Zd,$r,Jd,km,ds=q(()=>{ae(),de(),ss(),ce(),Xd=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];if(o&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],u=n.dims[1],c=n.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,f=p,g=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let E of t.qkvHiddenSizes)if(E%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let b=u;if(p!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+f+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let x=0;if(o){if(f!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(x=o.dims[3])}let T=b+x,w=-1,v=0;if(a)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==l||s.dims[1]!==t.numHeads||s.dims[2]!==u||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:u,pastSequenceLength:x,kvSequenceLength:b,totalSequenceLength:T,maxSequenceLength:w,inputHiddenSize:c,hiddenSize:p,vHiddenSize:g,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Xr=(e,t,n)=>t&&e?`
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
    `,Yd=(e,t,n,r,i,a,o,s)=>{let l=ze(o?1:a),u=64,c=a/l;c<u&&(u=32);let p=Math.ceil(a/l/u),f=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:c},{type:12,data:p}],g=Re(e.dataType,l),b=qe(1,l),x=["type"];o&&x.push("type"),s&&x.push("type");let T=w=>{let v=J("x",e.dataType,e.dims,l),E=[v],C=o?D("seq_lens",o.dataType,o.dims):void 0;C&&E.push(C);let I=s?D("total_sequence_length_input",s.dataType,s.dims):void 0;I&&E.push(I);let M=qe(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${u}>;
  var<workgroup> thread_sum: array<f32, ${u}>;
  ${w.registerUniforms(A).declareVariables(...E)}
  ${w.mainStart([u,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Xr(C,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${u}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${u}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${u}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${M}(1.0) / ${M}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${M}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${u};${g};${l}`,inputDependencies:x},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:f})}},Qd=(e,t,n,r,i,a,o,s,l)=>{let u=o+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,u],p=e>1&&r,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,g=p?[a.batchSize,f,u,a.headSize]:void 0,b=a.nReps?a.nReps:1,x=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=ze(a.headSize),w=a.headSize/T,v=12,E={x:Math.ceil(u/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},C=[{type:12,data:a.sequenceLength},{type:12,data:w},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:x},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:b}],I=p&&r&&R.size(r.dims)>0,M=["type","type"];I&&M.push("type"),i&&M.push("type"),s&&M.push("type"),l&&M.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];p&&A.push({dims:g,dataType:t.dataType,gpuDataType:0});let $=O=>{let L=D("q",t.dataType,t.dims,T),H=D("key",n.dataType,n.dims,T),K=[L,H];if(I){let F=D("past_key",r.dataType,r.dims,T);K.push(F)}i&&K.push(D("attention_bias",i.dataType,i.dims));let X=s?D("seq_lens",s.dataType,s.dims):void 0;X&&K.push(X);let P=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;P&&K.push(P);let Z=J("output",t.dataType,c),W=[Z];p&&W.push(J("present_key",t.dataType,g,T));let te=qe(1,T),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${L.type.storage}, ${v*v}>;
  ${O.registerUniforms(ie).declareVariables(...K,...W)}
  ${O.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Xr(X,P,!0)}
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
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${i!==void 0};${r!==void 0};${e}`,inputDependencies:M},getRunData:()=>({outputs:A,dispatchGroup:E,programUniforms:C}),getShaderSource:$}},Zd=(e,t,n,r,i,a,o=void 0,s=void 0)=>{let l=a+i.kvSequenceLength,u=i.nReps?i.nReps:1,c=i.vHiddenSize*u,p=e>1&&r,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=p?[i.batchSize,f,l,i.headSize]:void 0,b=[i.batchSize,i.sequenceLength,c],x=12,T={x:Math.ceil(i.vHeadSize/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},w=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:u}],v=p&&r&&R.size(r.dims)>0,E=["type","type"];v&&E.push("type"),o&&E.push("type"),s&&E.push("type");let C=[{dims:b,dataType:t.dataType,gpuDataType:0}];p&&C.push({dims:g,dataType:t.dataType,gpuDataType:0});let I=M=>{let A=D("probs",t.dataType,t.dims),$=D("v",n.dataType,n.dims),O=[A,$];v&&O.push(D("past_value",r.dataType,r.dims));let L=o?D("seq_lens",o.dataType,o.dims):void 0;o&&O.push(L);let H=s?D("total_sequence_length_input",s.dataType,s.dims):void 0;s&&O.push(H);let K=[J("output",t.dataType,b)];p&&K.push(J("present_value",t.dataType,g));let X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;
  var<workgroup> tileQ: array<${A.type.value}, ${x*x}>;
  var<workgroup> tileV: array<${A.type.value}, ${x*x}>;
  ${M.registerUniforms(X).declareVariables(...O,...K)}
  ${M.mainStart([x,x,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${u===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${u===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Xr(L,H,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${v&&p?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:C,dispatchGroup:T,programUniforms:w}),getShaderSource:I}},$r=(e,t,n,r,i,a,o,s,l,u,c=void 0,p=void 0)=>{let f=Math.min(e.outputCount,1+(o?1:0)+(s?1:0)),g=f>1?o:void 0,b=f>1?s:void 0,x=f>1?u.pastSequenceLength:0,T=x+u.kvSequenceLength,w=l&&R.size(l.dims)>0?l:void 0,v=[t,n];g&&R.size(g.dims)>0&&v.push(g),w&&v.push(w),c&&v.push(c),p&&v.push(p);let E=e.compute(Qd(f,t,n,g,w,u,x,c,p),{inputs:v,outputs:f>1?[-1,1]:[-1]})[0];e.compute(Yd(E,u.batchSize,u.numHeads,x,u.sequenceLength,T,c,p),{inputs:c&&p?[E,c,p]:[E],outputs:[]});let C=[E,r];b&&R.size(b.dims)>0&&C.push(b),c&&C.push(c),p&&C.push(p),e.compute(Zd(f,E,r,b,u,x,c,p),{inputs:C,outputs:f>1?[0,2]:[0]})},Jd=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,o=12,s={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=p=>{let f=J("output_q",l[0].dataType,n),g=J("output_k",l[0].dataType,n),b=J("output_v",l[0].dataType,n),x=D("input",l[0].dataType,l[0].dims),T=D("weight",l[1].dataType,l[1].dims),w=D("bias",l[2].dataType,l[2].dims),v=x.type.storage,E=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${v}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${v}, ${o*o}>;
  var<workgroup> tileWeightK: array<${v}, ${o*o}>;
  var<workgroup> tileWeightV: array<${v}, ${o*o}>;
  ${p.registerUniforms(E).declareVariables(x,T,w,f,g,b)}
  ${p.mainStart([o,o,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${v}(0);
    var valueK = ${v}(0);
    var valueV = ${v}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:u}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},km=(e,t)=>{let n=Xd(e.inputs,t),[r,i,a]=Jd(e,n);return $r(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),ec,tc,nc,Tm,V1=q(()=>{ot(),ae(),de(),Ae(),ce(),ec=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,i,a)=>{let o=i.length;if(o!==r.length)throw new Error(`${a}: num dimensions != ${o}`);i.forEach((s,l)=>{if(s!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},tc=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,o=r?ze(a[a.length-1]):1,s=i==="NHWC"&&a.length>1?o:1,l=R.size(a)/o,u=r,c=u?a.length:a,p=D("x",e[0].dataType,e[0].dims,o),f=D("scale",e[1].dataType,e[1].dims,s),g=D("bias",e[2].dataType,e[2].dims,s),b=D("inputMean",e[3].dataType,e[3].dims,s),x=D("inputVar",e[4].dataType,e[4].dims,s),T=J("y",e[0].dataType,c,o),w=()=>{let E="";if(r)E=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${o}`:"outputIndices[1]"};`;else if(i==="NCHW")E=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{E=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let C=1;C<f.rank;C++)E+=`cIndices[${C}] = outputIndices[${C}];`;E+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return E},v=E=>`
  const epsilon = ${n};
  ${E.registerUniform("outputSize","u32").declareVariables(p,f,g,b,x,T)}
  ${E.mainStart()}
  ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${o}`)};
    ${w()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${x.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${o}`,inputDependencies:u?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u?[{type:12,data:l},...ne(a)]:[{type:12,data:l}]})}},nc=e=>ve(e),Tm=(e,t)=>{let{inputs:n,outputCount:r}=e,i=nc({...t,outputCount:r});if(Se.webgpu.validateInputContent&&ec(n,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(tc(n,i))}}),rc,ic,Cm,H1=q(()=>{de(),ce(),rc=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},ic=e=>{let t=e[0].dims,n=e[0].dims[2],r=R.size(t)/4,i=e[0].dataType,a=D("input",i,t,4),o=D("bias",i,[n],4),s=D("residual",i,t,4),l=J("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:u=>`
  const channels = ${n}u / 4;
  ${u.declareVariables(a,o,s,l)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Cm=e=>{rc(e.inputs),e.compute(ic(e.inputs))}}),ac,xe,Em,Im,zm,Mm,Am,Nm,Pm,Rm,Om,oc,Bm,Dm,Lm,Um,dr,Fm,ri,Wm,qm,Vm,Hm,Gm,jm,Km,Xm,Ym,Qm,Zm,Jm,eg,tg,ng,rg,Ia,ig,zo,Mo,ag,og,sg,sc,lc,lg,cs=q(()=>{ae(),de(),Ae(),ce(),ac=(e,t,n,r,i,a,o)=>{let s=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let u=D("inputData",n,[s],4),c=J("outputData",r,[s],4),p=[{name:"vec_size",type:"u32"}];return o&&p.push(...o),`
      ${e.registerUniforms(p).declareVariables(u,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${u.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},xe=(e,t,n,r,i,a=e.dataType,o,s)=>{let l=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return o&&l.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:u=>ac(u,R.size(e.dims),e.dataType,a,n,r,s),getRunData:u=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(R.size(u[0].dims)/64/4)},programUniforms:l})}},Em=e=>{e.compute(xe(e.inputs[0],"Abs","abs"))},Im=e=>{e.compute(xe(e.inputs[0],"Acos","acos"))},zm=e=>{e.compute(xe(e.inputs[0],"Acosh","acosh"))},Mm=e=>{e.compute(xe(e.inputs[0],"Asin","asin"))},Am=e=>{e.compute(xe(e.inputs[0],"Asinh","asinh"))},Nm=e=>{e.compute(xe(e.inputs[0],"Atan","atan"))},Pm=e=>{e.compute(xe(e.inputs[0],"Atanh","atanh"))},Rm=e=>ve(e),Om=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(xe(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},oc=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ve({min:t,max:n})},Bm=(e,t)=>{let n=t||oc(e.inputs),r=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Dm=e=>{e.compute(xe(e.inputs[0],"Ceil","ceil"))},Lm=e=>{e.compute(xe(e.inputs[0],"Cos","cos"))},Um=e=>{e.compute(xe(e.inputs[0],"Cosh","cosh"))},dr=e=>ve(e),Fm=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ri=(e="f32")=>`
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
}`,Wm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,ri(t)))},qm=e=>{e.compute(xe(e.inputs[0],"Exp","exp"))},Vm=e=>{e.compute(xe(e.inputs[0],"Floor","floor"))},Hm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,ri(t)))},Gm=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},jm=e=>{e.compute(xe(e.inputs[0],"Not",t=>`!${t}`))},Km=e=>{e.compute(xe(e.inputs[0],"Neg",t=>`-${t}`))},Xm=e=>{e.compute(xe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Ym=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},Qm=e=>{e.compute(xe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Zm=e=>ve(e),Jm=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},eg=e=>{e.compute(xe(e.inputs[0],"Sin","sin"))},tg=e=>{e.compute(xe(e.inputs[0],"Sinh","sinh"))},ng=e=>{e.compute(xe(e.inputs[0],"Sqrt","sqrt"))},rg=e=>{e.compute(xe(e.inputs[0],"Tan","tan"))},Ia=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,ig=e=>{e.compute(xe(e.inputs[0],"Tanh",Ia))},zo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ia("v")};
}
`,Mo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ag=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"FastGelu",Mo,zo(t),void 0,e.inputs[0].dataType))},og=(e,t)=>{let n=qe(e.inputs[0].dataType);return e.compute(xe(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},sg=e=>{e.compute(xe(e.inputs[0],"Log","log"))},sc=(e,t)=>`
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
`,lc=e=>`quick_gelu_impl(${e})`,lg=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"QuickGelu",lc,sc(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),uc,dc,ug,G1=q(()=>{de(),ce(),cs(),uc=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},dc=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=D("input",e[0].dataType,e[0].dims,4),r=D("bias",e[0].dataType,[e[0].dims[2]],4),i=J("output",e[0].dataType,t,4),a=R.size(t)/4,o=Re(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:s=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${s.declareVariables(n,r,i)}

  ${ri(o)}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ug=e=>{uc(e.inputs),e.compute(dc(e.inputs))}}),cc,pc,ht,dg,cg,pg,hg,fg,mg,gg,bg,yg,wg,j1=q(()=>{ae(),de(),ce(),cc=(e,t,n,r,i,a,o,s,l,u,c,p)=>{let f,g;typeof s=="string"?f=g=(v,E)=>`${s}((${v}),(${E}))`:typeof s=="function"?f=g=s:(f=s.scalar,g=s.vector);let b=J("outputData",c,r.length,4),x=D("aData",l,t.length,4),T=D("bData",u,n.length,4),w;if(i)if(a){let v=R.size(t)===1,E=R.size(n)===1,C=t.length>0&&t[t.length-1]%4===0,I=n.length>0&&n[n.length-1]%4===0;v||E?w=b.setByOffset("global_idx",g(v?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"),E?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):w=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${x.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",g(o||C?x.getByOffset("offsetA / 4u"):`${x.type.value}(${x.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||I?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=b.setByOffset("global_idx",g(x.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(E,C,I="")=>{let M=`aData[indexA${C}][componentA${C}]`,A=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${x.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let offsetB${C} = ${T.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${E}[${C}] = ${I}(${f(M,A)});
          `};c===9?w=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:w=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(x,T,b)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},pc=(e,t,n,r,i,a,o=n.dataType)=>{let s=n.dims.map(Number),l=r.dims.map(Number),u=!R.areEqual(s,l),c=s,p=R.size(s),f=!1,g=!1,b=[u];if(u){let x=Bn.calcShape(s,l,!1);if(!x)throw new Error("Can't perform binary op on the given tensors");c=x.slice(),p=R.size(c);let T=R.size(s)===1,w=R.size(l)===1,v=s.length>0&&s[s.length-1]%4===0,E=l.length>0&&l[l.length-1]%4===0;b.push(T),b.push(w),b.push(v),b.push(E);let C=1;for(let I=1;I<c.length;I++){let M=s[s.length-I],A=l[l.length-I];if(M===A)C*=M;else break}C%4===0?(g=!0,f=!0):(T||w||v||E)&&(f=!0)}else f=!0;return b.push(f),{name:e,shaderCache:{hint:t+b.map(x=>x.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:x=>cc(x,s,l,c,f,u,g,i,n.dataType,r.dataType,o,a),getRunData:()=>({outputs:[{dims:c,dataType:o}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(c)/4)},...ne(s,l,c)]})}},ht=(e,t,n,r,i,a)=>{e.compute(pc(t,i??"",e.inputs[0],e.inputs[1],n,r,a))},dg=e=>{ht(e,"Add",(t,n)=>`${t}+${n}`)},cg=e=>{ht(e,"Div",(t,n)=>`${t}/${n}`)},pg=e=>{ht(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},hg=e=>{ht(e,"Mul",(t,n)=>`${t}*${n}`)},fg=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ht(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
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
      `)},mg=e=>{ht(e,"Sub",(t,n)=>`${t}-${n}`)},gg=e=>{ht(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},bg=e=>{ht(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},yg=e=>{ht(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},wg=e=>{ht(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),hc,fc,mc,gc,_g,xg,K1=q(()=>{ae(),de(),Ae(),ce(),hc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],i=r.dataType,a=r.dims.length;e.forEach((o,s)=>{if(s!==n){if(o.dataType!==i)throw new Error("input tensors should be one type");if(o.dims.length!==a)throw new Error("input tensors should have the same shape");o.dims.forEach((l,u)=>{if(u!==t&&l!==r.dims[u])throw new Error("non concat dimensions must match")})}})},fc=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,mc=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset("global_idx",e[i].getByIndices("indices"));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},gc=(e,t,n,r)=>{let i=R.size(n),a=new Array(e.length),o=new Array(e.length),s=0,l=[],u=[],c=[{type:12,data:i}];for(let x=0;x<e.length;++x)s+=e[x].dims[t],a[x]=s,u.push(e[x].dims.length),o[x]=D(`input${x}`,r,u[x]),l.push("rank"),c.push({type:12,data:a[x]});for(let x=0;x<e.length;++x)c.push(...ne(e[x].dims));c.push(...ne(n));let p=J("output",r,n.length),f=p.indicesGet("indices",t),g=Array.from(Array(a.length).keys()).map(x=>`uniforms.sizeInConcatAxis${x}`).join(","),b=x=>`

  ${(()=>{x.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)x.registerUniform(`sizeInConcatAxis${T}`,"u32");return x.declareVariables(...o,p)})()}

  ${fc(a.length,g)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${g});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${mc(o,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:b}},_g=(e,t)=>{let n=e.inputs,r=n[0].dims,i=R.normalizeAxis(t.axis,r.length);hc(n,i);let a=r.slice();a[i]=n.reduce((s,l)=>s+(l.dims.length>i?l.dims[i]:0),0);let o=n.filter(s=>R.size(s.dims)>0);e.compute(gc(o,i,a,n[0].dataType),{inputs:o})},xg=e=>ve({axis:e.axis})}),wn,_n,xn,ps,Tn=q(()=>{ae(),de(),wn=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},_n=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},xn=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},ps=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,r]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=(e==null?void 0:e.activation_params)||[jf,Kf];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ue,vg,hs=q(()=>{Ue=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},vg=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),$g,X1=q(()=>{$g=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),gr,fs,ms=q(()=>{ae(),de(),ce(),Tn(),gr=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((o,s)=>`
      if (${ee(t.shape,s,t.rank)} != 1) {
        ${t.indicesSet(e,s,ee(i,s+a,r))}
      } else {
        ${t.indicesSet(e,s,0)}
      }`).join("")}
`},fs=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,l=o[o.length-2],u=s[s.length-1],c=o[o.length-1],p=ze(u),f=ze(c),g=ze(l),b=R.size(n)/p/g,x=e.length>2,T=r?r.slice(0,-2):n.slice(0,-2),w=[R.size(T),l,u],v=[{type:12,data:b},{type:12,data:l},{type:12,data:u},{type:12,data:c}];_n(t,v),v.push(...ne(T,o,s)),x&&v.push(...ne(e[2].dims)),v.push(...ne(w));let E=C=>{let I=ls("batch_dims",e[0].dataType,T.length),M=D("a",e[0].dataType,o.length,f),A=D("b",e[1].dataType,s.length,p),$=J("output",e[0].dataType,w.length,p),O=Re($.type.tensor),L=wn(t,$.type.value,O),H=[M,A],K="";if(x){let Z=i?p:1;H.push(D("bias",e[2].dataType,e[2].dims.length,Z)),K=`${i?`value += bias[col / ${Z}];`:`value += ${$.type.value}(bias[row + i]);`}`}let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];xn(t,X);let P=()=>{let Z=`var a_data: ${M.type.value};`;for(let W=0;W<f;W++)Z+=`
              let b_data${W} = b[(b_offset + (k + ${W}) * uniforms.N + col) / ${p}];`;for(let W=0;W<g;W++){Z+=`a_data = a[(a_offset + (row + ${W}) * uniforms.K + k) / ${f}];`;for(let te=0;te<f;te++)Z+=`
            values[${W}] = fma(${A.type.value}(a_data${f===1?"":`[${te}]`}), b_data${te}, values[${W}]);
`}return Z};return`
  ${C.registerUniforms(X).registerInternalVariables(I).declareVariables(...H,$)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${M.type.indices};
    ${gr("a_indices",M,M.rank-2,I.rank,"batch_indices")}
    ${M.indicesSet("a_indices",M.rank-2,0)}
    ${M.indicesSet("a_indices",M.rank-1,0)}
    let a_offset = ${M.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${gr("b_indices",A,A.rank-2,I.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${P()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${K}
      ${L}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${f};${g};${i}`,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:v}),getShaderSource:E}}}),bc,yc,Ao,za,wc,No,_c,mi,gs=q(()=>{ae(),de(),ce(),Tn(),ms(),hs(),bc=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,yc=(e,t)=>e?`
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
        }`,Ao=(e,t,n="f32",r,i=!1,a=32,o=!1,s=32)=>{let l=t[1]*e[1],u=t[0]*e[0],c=i?l:a,p=i?a:l,f=c/t[0],g=a/t[1];if(!((i&&f===4&&e[1]===4||!i&&(f===3||f===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
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
  let batch = ${o?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${o?`${Math.ceil(s/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${bc(i,r)}
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

          ${yc(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},za=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,wc=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",No=(e,t,n="f32",r,i=!1,a=32,o=!1,s=32,l=!1)=>{let u=e[1]*t[1],c=e[0]*t[0],p=i?u:a,f=i?a:u;if(!(f%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let g=f/t[1],b=p/t[0],x=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${u};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${za(i,r)}
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
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${x};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${za(i,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${x}; innerRow = innerRow + 1) {
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
      ${wc(i)}
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
    let batch = ${o?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(s/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${T}
  }
`},_c=(e,t,n,r,i=!1)=>{let[a,o,s,l]=r,u=Re(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ue(e,u)} {
      var value = ${Ue(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${gr("aIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ue(e,u)} {
      var value = ${Ue(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${gr("bIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ue(e,u)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${Ue(e,u)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},mi=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,l=o.slice(0,-2),u=s.slice(0,-2),c=r?r.slice(0,-2):n.slice(0,-2),p=R.size(c),f=o[o.length-2],g=o[o.length-1],b=s[s.length-1],x=g%4===0&&b%4===0,T=f<=8?[4,1,1]:[4,4,1],w=[8,8,1],v=[Math.ceil(b/w[0]/T[0]),Math.ceil(f/w[1]/T[1]),Math.ceil(p/w[2]/T[2])],E=x?4:1,C=[...l,f,g/E],I=C.length,M=[...u,g,b/E],A=M.length,$=[p,f,b/E],O=[{type:6,data:f},{type:6,data:b},{type:6,data:g}];_n(t,O),O.push(...ne(c,C,M));let L=["rank","rank"],H=e.length>2;H&&(O.push(...ne(e[2].dims)),L.push("rank")),O.push(...ne($));let K=X=>{let P=c.length,Z=ls("batchDims",e[0].dataType,P,1),W=Re(e[0].dataType),te=D("a",e[0].dataType,I,E),ie=D("b",e[1].dataType,A,E),F=J("result",e[0].dataType,$.length,E),re=[te,ie];if(H){let _e=i?E:1;re.push(D("bias",e[2].dataType,e[2].dims.length,_e))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];xn(t,U);let G=Re(F.type.tensor),Y=wn(t,F.type.value,G),V=_c(E,H,Y,[Z,te,ie,F],i);return`
  ${X.registerUniforms(U).registerInternalVariables(Z).declareVariables(...re,F)}
  ${V}
  ${x?Ao(T,w,W,Z):No(T,w,W,Z)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${x};${i}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:O}),getShaderSource:K}}}),xc,Sg,Y1=q(()=>{ae(),Bt(),ce(),Tn(),hs(),X1(),gs(),xc=(e,t,n,r,i=!1,a,o=4,s=4,l=4,u="f32")=>{let c=O=>{switch(O){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${u}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},p=O=>{switch(O){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},f=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",x=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",w=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${Ue(o,u)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${x}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(o)}
    }
    return resData;`,E=e?t&&r?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ue(o,u)}(0.0);`:r&&n?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Ue(o,u)}(0.0);`,C=e?r&&n?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${Ue(s,u)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${Ue(s,u)}(0.0);`,I=Ue(l,u),M=Ue(e?o:s,u),A=Ue(e?s:o,u),$=wn(a,I,u);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${M} {
      ${e?E:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?C:E}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${vg(i)}
      ${$}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Sg=(e,t,n,r,i,a,o,s,l)=>{let u=t.format==="NHWC",c=u?e[0].dims[3]:e[0].dims[1],p=n[0],f=u?n[2]:n[3],g=u?n[1]:n[2],b=u?n[3]:n[1],x=u&&(c%4===0||c%3===0)&&b%4===0,T=u?b:f*g,w=u?f*g:b,v=[8,8,1],E=r<=8?[4,1,1]:[4,4,1],C=[Math.ceil(T/v[0]/E[0]),Math.ceil(w/v[1]/E[1]),Math.ceil(p/v[2]/E[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let I=x?u&&c%4!==0?3:4:1,M=v[1]*E[1],A=v[0]*E[0],$=Math.max(v[0]*I,v[1]),O=r%M===0,L=i%A===0,H=a%$===0,K=x?[I,4,4]:[1,1,1],X=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];_n(t,X),X.push(...ne(e[0].dims,e[1].dims));let P=["rank","rank"];o&&(X.push(...ne(e[2].dims)),P.push("rank")),X.push(...ne(n));let Z=W=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];xn(t,te);let ie=x?4:1,F=Re(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${x?`vec4<${F}>`:F}) {
        result[flatIndex] = ${x?`vec4<${F}>`:F}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${x?`vec4<${F}>`:F}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${x?"/ 4":""}, value);
      }`,U=D("x",e[0].dataType,e[0].dims.length,I===3?1:I),G=D("w",e[1].dataType,e[1].dims.length,ie),Y=[U,G],V=J("result",e[0].dataType,n.length,ie);if(o){let _e=D("bias",e[2].dataType,e[2].dims.length,ie);Y.push(_e),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${x?`vec4<${F}>`:F} {
          return bias[coords.${u?"w":"y"}${x?"/ 4":""}];
        }`}return`
        ${$g("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${W.registerUniforms(te).declareVariables(...Y,V)}
        ${re}
        ${xc(u,O,L,H,o,t,K[0],K[1],K[2],F)}
        ${x?Ao(E,v,F,void 0,!u,$):No(E,v,F,void 0,!u,$,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${x};${O};${L};${H};${M};${A};${$}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:X}),getShaderSource:Z}}}),vc,Ma,er,$c,Aa,Sc,kg,Tg,Q1=q(()=>{ae(),Bt(),de(),ce(),Tn(),hs(),vc=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ma=e=>typeof e=="number"?[e,e,e]:e,er=(e,t)=>t<=1?e:e+(e-1)*(t-1),$c=(e,t,n,r=1)=>{let i=er(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},Aa=(e,t,n,r,i)=>{i==null&&(i=$c(e,t[0],r[0]));let a=[0,0,0,n];for(let o=0;o<3;o++)e[o]+2*i>=t[o]&&(a[o]=Math.trunc((e[o]-t[o]+2*i)/r[o]+1));return a},Sc=(e,t,n,r,i,a,o,s,l,u)=>{let c,p,f,g;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Aa([t,n,r,1],[s,l,u],1,[i,a,o],e);p=b[0],f=b[1],g=b[2]}else if(Array.isArray(e)){if(!e.every((x,T,w)=>x===w[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Aa([t,n,r,1],[s,l,u],1,[i,a,o],e[0]);p=b[0],f=b[1],g=b[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/i),f=Math.ceil(n/a),g=Math.ceil(r/o);let b=(p-1)*i+s-t,x=(f-1)*a+l-n,T=(g-1)*o+u-r,w=Math.floor(b/2),v=b-w,E=Math.floor(x/2),C=x-E,I=Math.floor(T/2),M=T-I;c={top:E,bottom:C,left:I,right:M,front:w,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:f,outWidth:g}},kg=(e,t,n,r,i,a=!1,o="channelsLast")=>{let s,l,u,c,p;if(o==="channelsLast")[s,l,u,c,p]=e;else if(o==="channelsFirst")[s,p,l,u,c]=e;else throw new Error(`Unknown dataFormat ${o}`);let[f,,g,b,x]=t,[T,w,v]=Ma(n),[E,C,I]=Ma(r),M=er(g,E),A=er(b,C),$=er(x,I),{padInfo:O,outDepth:L,outHeight:H,outWidth:K}=Sc(i,l,u,c,T,w,v,M,A,$),X=a?f*p:f,P=[0,0,0,0,0];return o==="channelsFirst"?P=[s,X,L,H,K]:o==="channelsLast"&&(P=[s,L,H,K,X]),{batchSize:s,dataFormat:o,inDepth:l,inHeight:u,inWidth:c,inChannels:p,outDepth:L,outHeight:H,outWidth:K,outChannels:X,padInfo:O,strideDepth:T,strideHeight:w,strideWidth:v,filterDepth:g,filterHeight:b,filterWidth:x,effectiveFilterDepth:M,effectiveFilterHeight:A,effectiveFilterWidth:$,dilationDepth:E,dilationHeight:C,dilationWidth:I,inShape:e,outShape:P,filterShape:t}},Tg=(e,t,n,r,i,a)=>{let o=a==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let s=[64,1,1],l={x:n.map((T,w)=>w)},u=[Math.ceil(vc(l.x.map(T=>n[T]))/s[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let c=1,p=R.size(n),f=[{type:12,data:p},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];_n(t,f),f.push(...ne(e[0].dims,e[1].dims));let g=["rank","rank"],b=e.length===3;b&&(f.push(...ne(e[2].dims)),g.push("rank")),f.push(...ne(n));let x=T=>{let w=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];xn(t,w);let v=1,E=Re(e[0].dataType),C=D("x",e[0].dataType,e[0].dims.length,c),I=D("W",e[1].dataType,e[1].dims.length,v),M=[C,I],A=J("result",e[0].dataType,n.length,v),$="";if(b){let H=D("bias",e[2].dataType,e[2].dims.length,v);M.push(H),$+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${E} {
          return bias[${o?ee("coords",4,5):ee("coords",1,5)}];
        }`}let O=Ue(c,E),L=wn(t,O,E);return`
            ${$}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${T.registerUniforms(w).declareVariables(...M,A)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${ee("coords",0,C.rank)};
              let d2 = ${o?ee("coords",C.rank-1,C.rank):ee("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${o?ee("coords",1,C.rank):ee("coords",2,C.rank)},
              ${o?ee("coords",2,C.rank):ee("coords",3,C.rank)},
              ${o?ee("coords",3,C.rank):ee("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?ee("uniforms.x_shape",1,C.rank):ee("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${o?ee("uniforms.x_shape",2,C.rank):ee("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${o?ee("uniforms.x_shape",3,C.rank):ee("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${o?ee("uniforms.x_shape",4,C.rank):ee("uniforms.x_shape",1,C.rank)};
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
                      ${o?`let xValues = vec4<f32>(
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
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
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
                      ${o?`let xValues = vec3<f32>(
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
              ${b?"value = value + getBiasByOutputCoords(coords)":""};
              ${L}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${c};${b}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:f}),getShaderSource:x}}}),Cg,Eg,Z1=q(()=>{ae(),de(),ce(),Tn(),Cg=(e,t,n,r)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",o=e[0].dims,s=e[1].dims,l=t.format==="NHWC",u=l?n[3]:n[1],c=u/t.group,p=l&&c>=4?ze(u):1,f=R.size(n)/p,g=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];_n(t,g),g.push(...ne(o,[s[0],s[1],s[2],s[3]/p]));let b=i?["rank","rank","rank"]:["rank","rank"];g.push(...ne([n[0],n[1],n[2],n[3]/p]));let x=T=>{let w=J("output",e[0].dataType,n.length,p),v=Re(w.type.tensor),E=wn(t,w.type.value,v),C=D("x",e[0].dataType,o.length),I=D("w",e[1].dataType,s.length,p),M=[C,I];i&&M.push(D("b",e[2].dataType,e[2].dims,p));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];xn(t,A);let $=l?`
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
            let xVal = ${C.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(A).declareVariables(...M,w)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${w.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${w.type.value} = ${w.type.value}(0);
    ${$}
    ${a}
    ${E}
    ${w.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:x}},Eg=(e,t,n,r)=>{let i=e.length>2,a=ze(n[3]),o=ze(n[2]),s=R.size(n)/a/o,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],u=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[n[0],n[1],n[2],n[3]/a],p=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];_n(t,p),p.push(...ne(l,u,c));let f=(o-1)*t.strides[1]+u[1],g=b=>{let x=J("output",e[0].dataType,c.length,a),T=Re(x.type.tensor),w=wn(t,x.type.value,T),v=D("x",e[0].dataType,l.length,a),E=D("w",e[1].dataType,u.length,a),C=[v,E];i&&C.push(D("b",e[2].dataType,e[2].dims,a));let I=i?"value += b[output_channel];":"",M=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return xn(t,M),`
  ${b.registerUniforms(M).declareVariables(...C,x)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${f}>;
    var values: array<${x.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${u[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${u[1]}; w_width++) {
          let w_val = ${E.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${I}
      ${w}
      ${x.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${o};${f};${u[0]};${u[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:g}}}),kc,Yr,Tc,Qr,Po,Na,Cc,Ec,Ro,J1=q(()=>{de(),Y1(),Q1(),gs(),Z1(),Tn(),ms(),Zt(),kc=(e,t,n,r,i,a)=>{let o=e[0],s=e.slice(a?1:2,a?3:4),l=s.length,u=t[0],c=t.slice(2).map((f,g)=>f+(f-1)*(n[g]-1)),p=s.map((f,g)=>f+r[g]+r[g+l]).map((f,g)=>Math.floor((f-c[g]+i[g])/i[g]));return p.splice(0,0,o),p.splice(a?3:1,0,u),p},Yr=[2,3,1,0],Tc=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Qr=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();hi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},Po=e=>{let t=ps(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,o=e.kernel_shape,s=e.pads,l=e.strides,u=e.w_is_const();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,pads:s,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},Na=(e,t,n,r)=>{let i=n.format==="NHWC",a=kc(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let M=[t[0]];if(i){let A=e.kernelCustomData.wT??e.compute(nt(t[1],Yr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),M.push(A)}else M.push(t[1]);t.length===3&&M.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Eg(M,n,a,r),{inputs:M}):e.compute(Cg(M,n,a,r),{inputs:M});return}let o=t.length===3,s=t[0].dims[i?1:2],l=t[0].dims[i?2:3],u=t[0].dims[i?3:1],c=t[1].dims[2],p=t[1].dims[3],f=a[i?1:2],g=a[i?2:3],b=a[i?3:1],x=i&&c===s&&p===l&&n.pads[0]===0&&n.pads[1]===0;if(x||c===1&&p===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let M=a[0],A,$,O,L=[];if(i){let X=e.kernelCustomData.wT??e.compute(nt(t[1],Yr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=X),x){let P=s*l*u;A=t[0].reshape([1,M,P]),$=X.reshape([1,P,b]),O=[1,M,b]}else A=t[0].reshape([M,s*l,u]),$=X.reshape([1,u,b]),O=[M,f*g,b];L.push(A),L.push($)}else A=t[0].reshape([M,u,s*l]),$=t[1].reshape([1,b,u]),O=[M,b,f*g],L.push($),L.push(A);o&&L.push(t[2]);let H=O[2],K=L[0].dims[L[0].dims.length-1];H<8&&K<8?e.compute(fs(L,n,a,O,i,r),{inputs:L}):e.compute(mi(L,n,a,O,i,r),{inputs:L});return}let T=!0,w=e.kernelCustomData.wT??e.compute(nt(t[1],Yr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=w);let v=[t[0],w];o&&v.push(t[2]);let E=i?f*g:b,C=i?b:f*g,I=c*p*u;e.compute(Sg(v,n,a,E,C,I,o,T,r),{inputs:v})},Cc=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),s=[1].concat(t.kernelShape),l=Qr({...t,pads:i,strides:a,dilations:o,kernelShape:s},r);Na(e,r,l,u=>n?[u[0],u[2],u[3]]:[u[0],u[1],u[3]])},Ec=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",i=Qr(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,o=kg(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Tg(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],r))},Ro=(e,t)=>{if(Tc(e.inputs,t),e.inputs[0].dims.length===3)Cc(e,t);else if(e.inputs[0].dims.length===5)Ec(e,e.inputs,t);else{let n=Qr(t,e.inputs);Na(e,e.inputs,n)}}}),Ig,ex=q(()=>{ae(),Bt(),de(),ce(),Ig=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format==="NHWC",o=t.group,s=e[1].dims,l=s[2]/o,u=s[3],c=a?ze(l):1,p=a&&u===1&&l>=4,f=p?Math.floor(l/4)*4:Math.floor(l/c)*c,g=l-f,b=a?ze(u):1,x=a?u===1?c:b:1,T=R.size(i)/b,w=[Math.ceil(T/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let v=["rank","rank"],E=[t.strides[0],t.strides[1]],C=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[t.dilations[0],t.dilations[1]],M=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[M[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),M[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:T},{type:12,data:E},{type:12,data:C},{type:12,data:I},{type:12,data:M},{type:6,data:A},{type:12,data:f},{type:12,data:l},{type:12,data:u},...ne(e[0].dims,e[1].dims)];r&&($.push(...ne(e[2].dims)),v.push("rank")),$.push(...ne(i));let O=L=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:E.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:M.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],K=Re(e[0].dataType),X=a?1:2,P=a?2:3,Z=a?3:1,W=D("W",e[1].dataType,e[1].dims.length,x),te=D("Dy",e[0].dataType,e[0].dims.length,c),ie=[te,W];r&&ie.push(D("bias",e[2].dataType,[i[Z]].length,b));let F=J("result",e[0].dataType,i.length,b),re=()=>{let Y="";if(p)c===4?Y+=`
        let xValue = ${te.getByOffset("x_offset")};
        let wValue = ${W.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?Y+=`
          dotProd = dotProd + dot(vec4<${K}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}), vec4<${K}>(${W.getByOffset("w_offset")}, ${W.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(Y+=`
          dotProd = dotProd + dot(vec4<${K}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}, ${te.getByOffset("x_offset + 2u")}, ${te.getByOffset("x_offset + 3u")}), vec4<${K}>(${W.getByOffset("w_offset")}, ${W.getByOffset("w_offset + 1u")}, ${W.getByOffset("w_offset + 2u")}, ${W.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Y+=`
                  let xValue = ${a?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):te.get("batch","inputChannel","idyR","idyC")};
        `,c===1)Y+=`
          let w_offset = ${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${W.getByOffset(`w_offset / ${x}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<c;V++)Y+=`
            let wValue${V} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${x}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return Y},U=()=>{if(g===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let Y="";if(c===1){Y+="dotProd = dotProd";for(let V=0;V<g;V++)Y+=`
            + ${te.getByOffset(`x_offset + ${V}`)} * ${W.getByOffset(`w_offset + ${V}`)}`;Y+=";"}else if(c===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);Y+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${W.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Y},G=`
            let outputIndices = ${F.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${F.indicesGet("outputIndices",0)};
            let d1 = ${F.indicesGet("outputIndices",Z)};
            let r = ${F.indicesGet("outputIndices",X)};
            let c = ${F.indicesGet("outputIndices",P)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${F.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${K}(dyRCorner) + ${K}(wR)) / ${K}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${K}(uniforms.Dy_shape[${X}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${K}(dyCCorner) + ${K}(wC)) / ${K}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${K}(uniforms.Dy_shape[${P}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${W.indicesToOffset(`${W.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${x};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${re()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${b}]`:""};
            ${F.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(H).declareVariables(...ie,F)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${G}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${x}${b}${p}${g}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:O}}}),Ic,zc,Mc,Pa,zg,Ac,Ra,Nc,Mg,tx=q(()=>{ex(),Tn(),Zt(),Ic=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,zc=(e,t,n,r,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[i]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[i]=a)},Mc=(e,t,n,r,i,a,o,s,l,u)=>{let c=e.length-2,p=u.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let f=e[0],g=t[s?3:1]*i;for(let b=0,x=e.length-c-(s?1:0);b<c;++b,++x){let T=e[x],w=p?T*o[b]:u[b],v=Ic(T,o[b],a[b],t[x],n[b],w);zc(v,r,a,b,b+c),p&&u.push(o[b]*(T-1)+l[b]+(t[x]-1)*n[b]+1-a[b]-a[b+c])}u.splice(0,0,f),u.splice(s?3:1,0,g)},Pa=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,f)=>p*f,1)===0){n.length=0;for(let p=2;p<t[1].dims.length;++p)n.push(t[1].dims[p])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),s=t[0].dims,l=e.dilations.slice();if(l.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}let u=e.strides.slice();if(u.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}Mc(s,n,l,e.autoPad,e.group,i,u,r,o,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:n,pads:i,outputPadding:o,outputShape:a,dilations:l,strides:u}),c},zg=e=>{let t=ps(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group??1,o=e.kernelShape,s=e.pads,l=e.strides,u=e.wIsConst(),c=e.outputPadding,p=e.outputShape;return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,outputPadding:c,outputShape:p,pads:s,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},Ac=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((o,s)=>o+s,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((o,s)=>o+s,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((o,s)=>o+s,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((o,s)=>o+s,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ra=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(nt(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(Ig(a,n,r),{inputs:a})},Nc=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let s=t.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],o=[1].concat(o),a=[1].concat(a),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let u=Pa({...t,pads:s,strides:o,dilations:a,kernelShape:i,outputPadding:l},r);Ra(e,r,u,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Mg=(e,t)=>{if(Ac(e.inputs,t),e.inputs[0].dims.length===3)Nc(e,t);else{let n=Pa(t,e.inputs);Ra(e,e.inputs,n)}}}),Pc,Ag,Ng,nx=q(()=>{ae(),de(),Ae(),ce(),Pc=(e,t,n,r)=>{let i=R.size(t),a=t.length,o=D("input",e,a),s=J("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),u=R.normalizeAxis(l,a),c=p=>{let f=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,g=ee("uniforms.input_shape","uniforms.axis",a),b=r.reverse?f+(r.exclusive?" + 1":""):"0",x=r.reverse?g:f+(r.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${x};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:u},...ne(t,t)]}),getShaderSource:c}},Ag=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(Pc(r,n,i,t),{inputs:[0]})},Ng=e=>{let t=e.exclusive===1,n=e.reverse===1;return ve({exclusive:t,reverse:n})}}),Rc,Oc,Bc,Pg,Rg,rx=q(()=>{ae(),de(),Ae(),ce(),Rc=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Oc=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)i.push(n.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},Bc=(e,t)=>{let n,r,i,a,o,s,l=t.format==="NHWC",u=t.blocksize,c=t.mode==="DCR";l?([n,r,i,a]=e.dims,o=c?[n,r,i,u,u,a/u**2]:[n,r,i,a/u**2,u,u],s=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=c?[n,u,u,a/u**2,r,i]:[n,a/u**2,u,u,r,i],s=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(o),f=p.dims.length,g=e.dataType,b=D("a",g,f),x=J("output",g,f),T=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(b,x)}

  ${Oc(s,f,b,x)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:w=>{let v=l?[n,r*u,i*u,a/u**2]:[n,a/u**2,r*u,i*u],E=R.size(v),C=p.dims,I=R.sortBasedOnPerm(C,s);return{outputs:[{dims:v,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},...ne(C,I)]}},getShaderSource:T}},Pg=(e,t)=>{Rc(e.inputs),e.compute(Bc(e.inputs[0],t))},Rg=e=>ve({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Zr,tr,Oa,Dc,Lc,Uc,Fc,Ba,Wc,Og,Bg,ix=q(()=>{ae(),de(),Ae(),ce(),Zr="[a-zA-Z]|\\.\\.\\.",tr="("+Zr+")+",Oa="^"+tr+"$",Dc="("+tr+",)*"+tr,Lc="^"+Dc+"$",Uc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Fc=class{constructor(e,t){var i;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(Lc)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,o)=>{let s=e[o].dims.slice();if(!a.match(RegExp(Oa)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,s,o);this.lhs.push(l)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,o])=>o.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(tr)))throw new Error("Invalid RHS");(i=r.match(RegExp(Zr,"g")))==null||i.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(a);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,o=[],s=0;if(!e.match(RegExp(Oa))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Zr,"g")),u=new Uc(r);return l==null||l.forEach((c,p)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let f=i-l.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(o=n.slice(s,s+f),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<o.length;g++){let b=String.fromCharCode(48+g);u.addSymbol(b,p+g),this.addSymbol(b,n[s++],r)}}else u.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[s++],r)}),u}},Ba=e=>e+"_max",Wc=(e,t,n,r)=>{let i=e.map(u=>u.length).map((u,c)=>D(`input${c}`,t,u)),a=R.size(r),o=J("output",t,r.length),s=[...n.symbolToInfo.keys()].filter(u=>!n.rhs.symbolToIndices.has(u)),l=u=>{let c=[],p="var prod = 1.0;",f="var sum = 0.0;",g="sum += prod;",b=[],x=[],T=[],w=[],v=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((C,I)=>{var M;if(n.rhs.symbolToIndices.has(I)){let A=(M=n.rhs.symbolToIndices.get(I))==null?void 0:M[0];A!==void 0&&n.lhs.forEach(($,O)=>{if(C.inputIndices.includes(O)){let L=$.symbolToIndices.get(I);if(L===void 0)throw new Error("Invalid symbol error");L.forEach(H=>{c.push(`${i[O].indicesSet(`input${O}Indices`,H,o.indicesGet("outputIndices",A))}`)})}})}else n.lhs.forEach((A,$)=>{if(C.inputIndices.includes($)){let O=A.symbolToIndices.get(I);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(L=>{b.push(`${i[$].indicesSet(`input${$}Indices`,L,`${I}`)}`)}),w.push(`prod *= ${i[$].getByIndices(`input${$}Indices`)};`)}}),x.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Ba(I)}; ${I}++) {`),T.push("}")});let E=v?[...c,`let sum = ${i.map((C,I)=>C.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,f,...x,...b,p,...w,g,...T];return`
            ${u.registerUniforms(s.map(C=>({name:`${Ba(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,o)}

            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${i.map((C,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${E.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let u=s.filter(p=>n.symbolToInfo.has(p)).map(p=>{var f;return{type:12,data:((f=n.symbolToInfo.get(p))==null?void 0:f.dimValue)||0}});u.push({type:12,data:a});let c=e.map((p,f)=>[...ne(p)]).reduce((p,f)=>p.concat(f),u);return c.push(...ne(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Og=(e,t)=>{let n=new Fc(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((a,o)=>a.dims);e.compute(Wc(i,e.inputs[0].dataType,n,r))},Bg=e=>{let t=e.equation.replace(/\s+/g,"");return ve({equation:t})}}),qc,Da,Vc,Hc,Dg,ax=q(()=>{ae(),de(),ce(),qc=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Da=(e,t)=>{let n=e.length-t.length,r=[];for(let i=0;i<n;++i)r.push(e[i]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},Vc=(e,t)=>e.length>t.length?Da(e,t):Da(t,e),Hc=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=Vc(t,n),i=e[0].dataType,a=i===9||R.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4===0?4:1,s=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(R.size(r)/s),u=p=>{let f=D("input",i,t.length,o),g=J("output",i,r.length,s),b;if(i===9){let x=(T,w,v="")=>`
          let outputIndices${w} = ${g.offsetToIndices(`outputOffset + ${w}u`)};
          let offset${w} = ${f.broadcastedIndicesToOffset(`outputIndices${w}`,g)};
          let index${w} = offset${w} / 4u;
          let component${w} = offset${w} % 4u;
          ${T}[${w}] = ${v}(${f.getByOffset(`index${w}`)}[component${w}]);
        `;b=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${x("data",0,"u32")}
        ${x("data",1,"u32")}
        ${x("data",2,"u32")}
        ${x("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${f.getByOffset(`inputOffset / ${o}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(f,g)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},c=[{type:12,data:l},...ne(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Dg=e=>{qc(e.inputs),e.compute(Hc(e.inputs),{inputs:[0]})}}),Gc,Lg,ox=q(()=>{ae(),de(),ce(),cs(),Gc=e=>{let t=e[0].dataType,n=R.size(e[0].dims),r=R.size(e[1].dims),i=r%4===0,a=o=>{let s=D("x",t,[1],4),l=D("bias",t,[1],4),u=J("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${l.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,f=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(c).declareVariables(s,l,u)}

    ${zo(qe(t))}

    ${o.mainStart(Dn)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${u.setByOffset("global_idx",Mo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Dn/4)}})}},Lg=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?ag(e):e.compute(Gc(e.inputs))}}),jc,Kc,Ug,Fg,sx=q(()=>{ae(),de(),Ae(),ce(),jc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Kc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=R.normalizeAxis(t.axis,i),o=n.slice(0);o.splice(a,1,...r);let s=n[a],l=e[0].dataType===9?4:1,u=Math.ceil(R.size(o)/l),c=[{type:12,data:u},{type:6,data:s},{type:12,data:a},...ne(e[0].dims,e[1].dims,o)],p=f=>{let g=D("data",e[0].dataType,e[0].dims.length,l),b=D("inputIndices",e[1].dataType,e[1].dims.length),x=J("output",e[0].dataType,o.length,l),T=v=>{let E=r.length,C=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let I=0;I<E;I++)C+=`${E>1?`indicesIndices${v}[${I}]`:`indicesIndices${v}`} = ${o.length>1?`outputIndices${v}[uniforms.axis + ${I}]`:`outputIndices${v}`};`;C+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${g.type.indices};
        `;for(let I=0,M=0;I<i;I++)I===a?(C+=`${i>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = u32(idx${v});`,M+=E):(C+=`${i>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = ${o.length>1?`outputIndices${v}[${M}]`:`outputIndices${v}`};`,M++);return C},w;if(e[0].dataType===9){let v=(E,C,I="")=>`
          let outputIndices${C} = ${x.offsetToIndices(`outputOffset + ${C}u`)};
          ${T(C)};
          let offset${C} = ${g.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${E}[${C}] = ${I}(${g.getByOffset(`index${C}`)}[component${C}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${x.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${x.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${g.getByIndices("dataIndices")};
      ${x.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,b,x)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:p}},Ug=e=>ve({axis:e.axis}),Fg=(e,t)=>{let n=e.inputs;jc(n),e.compute(Kc(e.inputs,t))}}),Xc,Wg,qg,lx=q(()=>{ae(),de(),ce(),Xc=(e,t,n,r,i,a,o,s,l)=>{let u=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:l}],c=[a];u.push(...ne(t.dims,c));let p=f=>{let g=D("indices_data",t.dataType,t.dims.length),b=J("input_slice_offsets_data",12,1,1),x=[g,b],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(T).declareVariables(...x)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},Wg=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,o=a[a.length-1],s=R.sizeToDimension(a,a.length-1),l=R.sizeFromDimension(r,t.batchDims+o),u=R.sizeToDimension(r,t.batchDims),c=R.sizeFromDimension(r,t.batchDims),p=s/u,f=new Array(o),g=l;for(let C=0;C<o;++C)f[o-1-C]=g,g*=r[t.batchDims+o-1-C];let b=Xc(e,n[1],f,t.batchDims,r,s,p,c,o),x=t.batchDims+o;if(x>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(r.slice(x)),w=R.size(T),v=[{type:12,data:w},{type:12,data:l},...ne(n[0].dims,b.dims,T)],E=C=>{let I=D("data",n[0].dataType,n[0].dims.length),M=D("slice_offsets",12,b.dims.length),A=J("output",n[0].dataType,T.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,M,A)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:i}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:v}),getShaderSource:E},{inputs:[n[0],b]})},qg=e=>({batchDims:e.batch_dims,cacheKey:""})}),Yc,Qc,Vg,Hg,ux=q(()=>{ae(),de(),Ae(),ce(),Yc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((s,l)=>l===n?Math.ceil(s/r)===a.dims[l]:s===a.dims[l]).reduce((s,l)=>s&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==a.dims.length||!o.dims.map((s,l)=>s===a.dims[l]).reduce((s,l)=>s&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Qc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=R.normalizeAxis(t.gatherAxis,i),o=R.normalizeAxis(t.quantizeAxis,i),s=n.slice(0);s.splice(a,1,...r);let l=R.size(s),u=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:l},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...ne(...e.map((g,b)=>g.dims),s)],f=g=>{let b=D("data",e[0].dataType,e[0].dims.length),x=D("inputIndices",e[1].dataType,e[1].dims.length),T=D("scales",e[2].dataType,e[2].dims.length),w=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,v=J("output",u,s.length),E=[b,x,T];w&&E.push(w);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(C).declareVariables(...E,v)}
        ${g.mainStart()}
        let output_indices = ${v.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${v.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${v.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${v.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${b.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${v.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${b.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${b.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${b.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${qe(u)}(quantized_data - zero_point) * scale;
        ${v.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,b)=>b!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,b)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:u}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f}},Vg=(e,t)=>{let n=e.inputs;Yc(n,t),e.compute(Qc(e.inputs,t))},Hg=e=>ve({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Zc,Jc,Gg,jg,dx=q(()=>{ae(),de(),Ae(),ce(),Zc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Jc=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,o=e[1].dataType,s=R.normalizeAxis(t.axis,i),l=n[s],u=a.slice(0),c=R.size(u),p=D("input",r,i),f=D("indicesInput",o,a.length),g=J("output",r,u.length),b=[{type:12,data:c},{type:6,data:l},{type:12,data:s}];return b.push(...ne(n,a,u)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:b}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,f,g)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Gg=e=>ve({axis:e.axis}),jg=(e,t)=>{let n=e.inputs;Zc(n),e.compute(Jc(e.inputs,t))}}),ep,tp,Kg,Xg,cx=q(()=>{ae(),de(),ce(),ep=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},tp=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,o]=Gf.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let l=16,u=Math.ceil(a/l),c=Math.ceil(i/l),p=!0,f=R.size(s),g=[{type:12,data:p?u:f},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(g.push(...ne(e[2].dims)),b.push("rank")),g.push(...ne(s));let x=w=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let E=t.alpha===1?"":"value *= uniforms.alpha;",C=D("a",e[0].dataType,e[0].dims),I=D("b",e[1].dataType,e[1].dims),M=C.type.value,A=null,$=[C,I];e.length===3&&(A=D("c",e[2].dataType,e[2].dims.length),$.push(A));let O=J("output",e[0].dataType,s.length);$.push(O);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${w.registerUniforms(L).declareVariables(...$)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${M}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${E}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",O)}; value += ${M}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=w=>{let v=D("a",e[0].dataType,e[0].dims),E=D("b",e[1].dataType,e[1].dims),C=null,I=[v,E];e.length===3&&(C=D("c",e[2].dataType,e[2].dims.length),I.push(C));let M=J("output",e[0].dataType,s.length);I.push(M);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",O="";t.transA&&t.transB?(O=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(O=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(O=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(O=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${w.registerUniforms(A).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${E.type.storage}, ${l}>, ${l}>;
  ${w.mainStart([l,l,1])}
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

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${M.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:u*c},programUniforms:g}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:x}},Kg=e=>{let t=e.transA,n=e.transB,r=e.alpha,i=e.beta;return{transA:t,transB:n,alpha:r,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Xg=(e,t)=>{ep(e.inputs),e.compute(tp(e.inputs,t))}}),vt,Mt,an,on,np,rp,ip,ap,op,sp,lp,up,Yg,Qg,px=q(()=>{ae(),de(),Ae(),ce(),[vt,Mt,an,on]=[0,1,2,3],np=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},rp=`
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
`,ip=e=>`
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
`,ap=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,op=e=>`
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
`,sp=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${vt}] = batch;
     indices[${Mt}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${an}] = u32(r);
            indices[${on}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${an}] = u32(clamp(r, 0, H - 1));
          indices[${on}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${an}] = gs_reflect(r, border[1], border[3]);
          indices[${on}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,lp=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${vt}], indices[${Mt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${vt}], indices[${Mt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${vt}], indices[${Mt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${vt}], indices[${Mt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${vt}], indices[${Mt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${vt}], indices[${Mt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,up=(e,t)=>{let n=D("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=D("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[vt,Mt,an,on]=[0,3,1,2]);let o=J("output",e[0].dataType,a.length),s=n.type.value,l=R.size(a),u=[{type:12,data:l},...ne(e[0].dims,r,a)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(n,i,o)}
  ${rp}
  ${ip(s)}
  ${ap(t)}
  ${op(t)}
  ${sp(n,s,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${an}]);
      let W_in = i32(uniforms.x_shape[${on}]);

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

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${vt}], indices[${an}], indices[${on}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${lp(o,s,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let f=R.size(a);return{outputs:[{dims:a,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:u}},getShaderSource:c}},Yg=(e,t)=>{np(e.inputs),e.compute(up(e.inputs,t))},Qg=e=>ve({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),He,dp,Zg,La,cp,cr,Jg,e0=q(()=>{ae(),de(),Ae(),ss(),ds(),ce(),Zt(),He=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,dp=(e,t)=>{let n=e[0],r=He(e,1),i=He(e,2),a=He(e,3),o=He(e,4),s=He(e,5),l=He(e,6),u=He(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],p=n.dims[1],f=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],g=p,b=0,x=0,T=Math.floor(f/t.numHeads);if(l&&u&&R.size(l.dims)&&R.size(u.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(u.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],x=l.dims[2]}else if(l&&R.size(l.dims)||u&&R.size(u.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(r&&R.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');w=2,g=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,g=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,g=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}if(a&&R.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+g,E=0;if(o&&R.size(o.dims)>0){E=8;let A=o.dims;throw A.length===1?A[0]===c?E=1:A[0]===3*c+2&&(E=3):A.length===2&&A[0]===c&&A[1]===v&&(E=5),E===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,I=f;if(i&&R.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(g!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=i.dims[2]}else{if(g!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=i.dims[1]*i.dims[3],C=!0}}let M=!1;if(o&&R.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(s&&R.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==c||s.dims[1]!==t.numHeads||s.dims[2]!==p||s.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:g,totalSequenceLength:v,maxSequenceLength:x,inputHiddenSize:0,hiddenSize:f,vHiddenSize:I,headSize:T,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:E,scale:t.scale,broadcastResPosBias:M,passPastInKv:C,qkvFormat:w}},Zg=e=>ve({...e}),La=ve({perm:[0,2,1,3]}),cp=(e,t,n,r,i,a,o)=>{let s=[r,i,a],l=R.size(s),u=[{type:12,data:l},{type:12,data:o},{type:12,data:a}],c=p=>{let f=J("qkv_with_bias",t.dataType,s),g=D("qkv",t.dataType,s),b=D("bias",n.dataType,s),x=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(x).declareVariables(g,b,f)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:c},{inputs:[t,n],outputs:[-1]})[0]},cr=(e,t,n,r,i,a,o,s)=>{let l=a;if(o&&R.size(o.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=cp(e,a,o,t,r,n*i,s),l=l.reshape([t,r,n,i]),n===1||r===1?l:e.compute(nt(l,La.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,i])),n===1||r===1?l:e.compute(nt(l,La.perm),{inputs:[l],outputs:[-1]})[0]},Jg=(e,t)=>{let n=dp(e.inputs,t),r=e.inputs[0],i=He(e.inputs,1),a=He(e.inputs,2),o=He(e.inputs,3),s=He(e.inputs,4),l=He(e.inputs,5),u=He(e.inputs,6),c=He(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if((i==null?void 0:i.dims.length)===5)throw new Error("Packed KV is not implemented");let p=i&&a&&i.dims.length===4&&a.dims.length===4,f=cr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,o,0);if(p)return $r(e,f,i,a,s,void 0,u,c,l,n);if(!i||!a)throw new Error("key and value must be provided");let g=cr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,o,n.hiddenSize),b=cr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,o,2*n.hiddenSize);$r(e,f,g,b,s,void 0,u,c,l,n)}}),pp,hp,fp,mp,Oo,t0,n0,r0=q(()=>{ae(),de(),Ae(),ce(),pp=e=>{if(!e||e.length<1)throw new Error("too few inputs")},hp=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>n.push(Number(i))),r=n.length),ve({numOutputs:r,axis:t.axis,splitSizes:n})},fp=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ee("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,mp=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Oo=(e,t)=>{let n=e[0].dims,r=R.size(n),i=e[0].dataType,a=R.normalizeAxis(t.axis,n.length),o=new Array(t.numOutputs),s=D("input",i,n.length),l=new Array(t.numOutputs),u=[],c=[],p=0,f=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){p+=t.splitSizes[b],l[b]=p;let x=n.slice();x[a]=t.splitSizes[b],c.push(x),o[b]=J(`output${b}`,i,x.length),u.push({dims:c[b],dataType:e[0].dataType})}f.push({type:12,data:l},...ne(n,...c));let g=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(s,...o)}
  ${fp(l.length)}
  ${mp(o)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ee("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${s.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:u,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},t0=(e,t)=>{pp(e.inputs);let n=e.inputs.length===1?t:hp(e.inputs,t);e.compute(Oo(e.inputs,n),{inputs:[0]})},n0=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ve({axis:t,numOutputs:r,splitSizes:n})}}),gp,gi,i0,a0=q(()=>{ae(),de(),Ae(),ce(),gp=(e,t)=>{let[n,r,i,a]=e,{numHeads:o,rotaryEmbeddingDim:s}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!R.areEqual(r.dims,[])&&!R.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!R.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],u=n.dims[n.dims.length-2],c=i.dims[0],p=R.sizeFromDimension(n.dims,1)/u,f=s===0?i.dims[1]*2:p/o;if(s>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(u!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(u>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(f/2!==i.dims[1]&&s/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},gi=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,o=e[0].dims[0],s=R.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],u=s/l,c=e[2].dims[1],p=i===0?c*2:u/r,f=new Array(o,l,u/p,p-c),g=R.computeStrides(f),b=[{type:1,data:a},{type:12,data:f},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[s,u,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[s,p,l*p,1]}):[],...ne(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],x=T=>{let w=D("input",e[0].dataType,e[0].dims.length),v=D("position_ids",e[1].dataType,e[1].dims.length),E=D("cos_cache",e[2].dataType,e[2].dims.length),C=D("sin_cache",e[3].dataType,e[3].dims.length),I=J("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${T.declareVariables(w,v,E,C,I)}

        ${T.mainStart(Dn)}
          let half_rotary_emb_dim = uniforms.${E.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",J("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${w.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ve({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(f)/Dn)},programUniforms:b})}},i0=(e,t)=>{gp(e.inputs,t),e.compute(gi(e.inputs,t))}}),bp,yp,Ua,wp,o0,hx=q(()=>{Ae(),ae(),ds(),e0(),r0(),Zt(),a0(),ce(),bp=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,l=n.dims[0],u=n.dims[1],c=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],p=u,f=0,g=!r||r.dims.length===0,b=Math.floor(g?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);g&&(c=b*t.numHeads);let x=a&&a.dims.length!==0,T=o&&o.dims.length!==0;if(x&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(x&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=a.dims[2]}else if(x||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let v=0,E=!1,C=t.kvNumHeads?b*t.kvNumHeads:c;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(p!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=i.dims[2]}else{if(p!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=i.dims[1]*i.dims[3],E=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let M=I.dims.reduce((A,$)=>A*$,1);if(M!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${M}.`);for(let A=0;A<I.dims.length;A++)if(I.dims[A]!==1&&I.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${I.dims[A]}.`)}return{batchSize:l,sequenceLength:u,pastSequenceLength:f,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:C,headSize:b,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:E,qkvFormat:w}},yp=ve({perm:[0,2,1,3]}),Ua=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(nt(r,yp.perm),{inputs:[r],outputs:[-1]})[0]),r},wp=(e,t,n,r)=>{let i=7,a=["type","type"],o=[e*t],s=e*t,l=[{type:12,data:s},{type:12,data:t},{type:12,data:e}],u=c=>{let p=D("seq_lens",n.dataType,n.dims),f=D("total_seq_lens",r.dataType,r.dims),g=J("pos_ids",i,o),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(b).declareVariables(p,f,g)}
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:u}},o0=(e,t)=>{var C;let n=bp(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((C=e.inputs[1])==null?void 0:C.dims.length)===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,s=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,u=e.inputs.length>5?e.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,p=ve({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[f,g,b]=!i&&!a?e.compute(Oo([r],p),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],x,T;if(t.doRotary){let I=e.compute(wp(n.batchSize,n.sequenceLength,l,u),{inputs:[l,u],outputs:[-1]})[0],M=e.inputs[7],A=e.inputs[8],$=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[f,I,M,A],L=[-1];x=e.compute(gi(O,$),{inputs:O,outputs:L})[0],O.splice(0,1,g);let H=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(gi(O,H),{inputs:O,outputs:L})[0]}let w=cr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?x:f,void 0,0),v=Ua(e,t.doRotary?T:g,n),E=Ua(e,b,n);$r(e,w,v,E,void 0,void 0,o,s,void 0,n,l,u)}}),Fa,_p,xp,s0,fx=q(()=>{ae(),de(),Zt(),ce(),Fa=(e,t,n,r,i,a,o,s)=>{let l=ze(a),u=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,p=i*o,f=64;p===1&&(f=256);let g=[i,o,a/l],b=[i,o,2],x=["rank","type","type"],T=[];T.push(...ne(g,b));let w=v=>{let E=D("x",t.dataType,3,l),C=D("scale",n.dataType,n.dims),I=D("bias",r.dataType,r.dims),M=J("output",1,3,2),A=[E,C,I,M];return`
  var<workgroup> workgroup_shared : array<${c}, ${f}>;
  const workgroup_size = ${f}u;
  ${v.declareVariables(...A)}
  ${v.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${u}(0);
    var squared_sum = ${u}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${u}(${E.get("batch","channel","h")});
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
      let sum_final = ${Yt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Yt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${s};${f}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:p},programUniforms:T}),getShaderSource:w},{inputs:[t,n,r],outputs:[-1]})[0]},_p=(e,t,n)=>{let r=t[0].dims,i=r,a=2,o=r[0],s=r[1],l=R.sizeFromDimension(r,a),u=ze(l),c=R.size(i)/u,p=Fa(e,t[0],t[1],t[2],o,l,s,n.epsilon),f=[o,s,l/u],g=[o,s],b=["type","none"],x=T=>{let w=D("x",t[0].dataType,f.length,u),v=D("scale_shift",1,g.length,2),E=J("output",t[0].dataType,f.length,u),C=[w,v,E];return`
  ${T.registerUniform("output_size","u32").declareVariables(...C)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${E.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${w.getByOffset("global_idx")} * ${E.type.value}(scale_shift.x) + ${E.type.value}(scale_shift.y);
      ${E.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${u}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ne(f,g,f)]}),getShaderSource:x},{inputs:[t[0],p]})},xp=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[r.length-1],s=R.sizeFromDimension(r,1)/o,l=ze(o),u=R.size(i)/l,c=[{type:12,data:s},{type:12,data:Math.floor(o/l)}],p=["type","type"],f=!1,g=[0,r.length-1];for(let w=0;w<r.length-2;w++)f=f||r[w+1]!==1,g.push(w+1);f=f&&r[r.length-1]!==1;let b=f?e.compute(nt(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(w,v)=>r[g[v]])),x=Fa(e,b,t[1],t[2],a,s,o,n.epsilon),T=w=>{let v=Re(t[0].dataType),E=l===1?"vec2f":`mat${l}x2f`,C=A=>{let $=A===0?"x":"y",O=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${O}(scale.${$}))`;case 2:return`vec2<${v}>(${O}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${v}>(${O}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=D("input",t[0].dataType,t[0].dims,l),M=J("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${E}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${M.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${w.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],x]})},s0=(e,t)=>{t.format==="NHWC"?xp(e,e.inputs,t):_p(e,e.inputs,t)}}),vp,$p,l0,mx=q(()=>{ae(),de(),ce(),vp=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},$p=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],o=!r&&e[2],s=i,l=R.normalizeAxis(t.axis,i.length),u=R.sizeToDimension(i,l),c=R.sizeFromDimension(i,l),p=R.size(a.dims),f=o?R.size(o.dims):0;if(p!==c||o&&f!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${f}`);let g=[];for(let I=0;I<i.length;++I)I<l?g.push(i[I]):g.push(1);let b=ze(c),x=["type","type"],T=[{type:12,data:u},{type:1,data:c},{type:12,data:Math.floor(c/b)},{type:1,data:t.epsilon}];o&&x.push("type");let w=n>1,v=n>2,E=I=>{let M=Re(e[0].dataType),A=[D("x",e[0].dataType,e[0].dims,b),D("scale",a.dataType,a.dims,b)];o&&A.push(D("bias",o.dataType,o.dims,b)),A.push(J("output",e[0].dataType,s,b)),w&&A.push(J("mean_data_output",1,g)),v&&A.push(J("inv_std_output",1,g));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms($).declareVariables(...A)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Co("f32",b)};
    var mean_square_vector = ${Co("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Pn(M,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Yt("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Yt("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Pn(M,b,"x[j + offset]")};
      let f32scale = ${Pn(M,b,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Pn(M,b,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:s,dataType:e[0].dataType}];return w&&C.push({dims:g,dataType:1}),v&&C.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:x},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:T}),getShaderSource:E}},l0=(e,t)=>{vp(e.inputs),e.compute($p(e.inputs,t,e.outputCount))}}),Sp,u0,gx=q(()=>{de(),ms(),gs(),Sp=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},u0=e=>{Sp(e.inputs);let t=Bn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(fs(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=R.size(e.inputs[0].dims.slice(0,-2)),o=R.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&o===1){let s=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),u=[1,a,n],c=[s,l];e.compute(mi(c,{activation:""},t,u),{inputs:c})}else e.compute(mi(e.inputs,{activation:""},t))}}}),kp,Tp,Cp,d0,c0,bx=q(()=>{ae(),de(),Ae(),ce(),kp=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!R.areEqual(o.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let s=e[2].dims;if(R.size(s)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,u=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(R.size(l)!==u)throw new Error("zeroPoints input size error.")}},Tp=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),l=R.size(s),u=e[1].dims[2]/4,c=e[0].dataType,p=ze(t.k),f=ze(u),g=ze(o),b=s.concat([i,o]),x=i>1&&o/g%2===0?2:1,T=R.size(b)/g/x,w=64,v=[],E=[l,i,a/p],C=R.convertShape(e[1].dims).slice();C.splice(-1,1,u/f),v.push(...ne(E)),v.push(...ne(C)),v.push(...ne(e[2].dims)),e.length===4&&v.push(...ne(R.convertShape(e[3].dims)));let I=[l,i,o/g];v.push(...ne(I));let M=A=>{let $=E.length,O=D("a",e[0].dataType,$,p),L=D("b",12,C.length,f),H=D("scales",e[2].dataType,e[2].dims.length),K=[O,L,H],X=e.length===4?D("zero_points",12,e[3].dims.length):void 0;X&&K.push(X);let P=I.length,Z=J("output",e[0].dataType,P,g),W=Re(e[0].dataType),te=(()=>{switch(p){case 1:return`array<${W}, 8>`;case 2:return`mat4x2<${W}>`;case 4:return`mat2x4<${W}>`;default:throw new Error(`${p}-component is not supported.`)}})(),ie=Math.floor(32/t.bits),F=Math.floor(ie/8),re=()=>{let Y="";for(let V=0;V<F;V++){let _e=V*t.bits*4,Ve=_e+t.bits;Y+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?O.indicesToOffset(`${O.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${te};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/p}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${O.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let Ie=0;Ie<g*x;Ie++)Y+=`
            b_value = ${f===1?`b${Ie}_data`:`b${Ie}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${V*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${_e}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ve}u) & b_mask);`}
            b_quantized_values = ${te}(${Array.from({length:4},(Be,je)=>`${W}(b_value_lower[${je}]), ${W}(b_value_upper[${je}])`).join(", ")});
            b_dequantized_values = ${p===1?`${te}(${Array.from({length:8},(Be,je)=>`(b_quantized_values[${je}] - ${X?`zero_point${Ie}`:"zero_point"}) * scale${Ie}`).join(", ")});`:`(b_quantized_values - ${te}(${Array(8).fill(`${X?`zero_point${Ie}`:"zero_point"}`).join(",")})) * scale${Ie};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(Ie/g)}]${g>1?`[${Ie%g}]`:""} += ${Array.from({length:8/p},(Be,je)=>`${p===1?`a_data${V>0?V:""}[${je}] * b_dequantized_values[${je}]`:`dot(a_data${V>0?V:""}[${je}], b_dequantized_values[${je}])`}`).join(" + ")};
          `}return Y},U=()=>{let Y=`
            var col_index = col * ${g};
            ${X?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${W}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let V=0;V<g*x;V++)Y+=`
            let scale${V} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${X?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${W}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Y},G=()=>{let Y=`col_index = col * ${g};`;for(let V=0;V<g*x;V++)Y+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Y+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${te};
            var b_dequantized_values: ${te};`,Y};return`
        var<workgroup> workgroup_shared: array<${Z.type.value}, ${x*w}>;
        ${A.declareVariables(...K,Z)}
        ${A.mainStart([w,1,1])}
          let output_indices = ${Z.offsetToIndices(`(global_idx / ${w}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${U()}
            for (var word: u32 = 0; word < ${u}; word += ${f}) {
              ${G()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${re()}
                word_offset += ${ie/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${f};${g};${x};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:c}],dispatchGroup:{x:T},programUniforms:v}),getShaderSource:M}},Cp=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),l=R.size(s),u=e[1].dims[2]/4,c=e[0].dataType,p=ze(t.k),f=ze(u),g=s.concat([i,o]),b=128,x=o%8===0?8:o%4===0?4:1,T=b/x,w=Math.floor(32/t.bits),v=T*f*w,E=v/p,C=v/t.blockSize,I=R.size(g)/x,M=[],A=[l,i,a/p],$=R.convertShape(e[1].dims).slice();$.splice(-1,1,u/f),M.push(...ne(A)),M.push(...ne($)),M.push(...ne(e[2].dims)),e.length===4&&M.push(...ne(R.convertShape(e[3].dims)));let O=[l,i,o];M.push(...ne(O));let L=H=>{let K=A.length,X=D("a",e[0].dataType,K,p),P=D("b",12,$.length,f),Z=D("scales",e[2].dataType,e[2].dims.length),W=[X,P,Z],te=e.length===4?D("zero_points",12,e[3].dims.length):void 0;te&&W.push(te);let ie=O.length,F=J("output",e[0].dataType,ie),re=Re(e[0].dataType),U=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${E}>;
        var<workgroup> inter_results: array<array<${F.type.value}, ${T}>, ${x}>;
        ${H.declareVariables(...W,F)}
        ${H.mainStart([T,x,1])}
          let output_indices = ${F.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${C} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${E};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${E}; a_offset += ${b})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${X.getByIndices(`${X.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${X.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
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
              ${(()=>{let G=Math.floor(w/8),Y="";for(let V=0;V<G;V++){let _e=V*t.bits*4,Ve=_e+t.bits;Y+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${V*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${_e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ve}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(Ie,Be)=>`${re}(b_value_lower[${Be}]), ${re}(b_value_upper[${Be}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ie,Be)=>`${`dot(a_data${Be}, b_dequantized_values[${Be}])`}`).join(" + ")};
              }
              word_offset += ${8/p};`}return Y})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${F.type.value} = ${F.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${F.setByIndices(`${F.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${f};${T};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:I},programUniforms:M}),getShaderSource:L}},d0=(e,t)=>{kp(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Cp(e.inputs,t)):e.compute(Tp(e.inputs,t))},c0=e=>ve(e)}),Ep,Ip,zp,Mp,Ap,Np,Pp,Rp,p0,yx=q(()=>{ae(),de(),ce(),Ep=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Ip=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
      `},zp=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},Mp=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},Ap=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},Np=(e,t,n)=>{switch(n.mode){case 0:return Ip(e,t,n.pads.length);case 1:return zp(e,t,n.pads.length);case 2:return Mp(e,t,n.pads.length);case 3:return Ap(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Pp=(e,t)=>{let n=R.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=R.size(n),a=[{type:12,data:i},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&a.push({type:o?e[2].dataType:1,data:t.value}),a.push(...ne(e[0].dims,n));let s=["rank"],l=u=>{let c=J("output",e[0].dataType,n.length),p=D("x",e[0].dataType,r.length),f=p.type.value,g=Np(c,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:o?f:"f32"}),`
            ${u.registerUniforms(b).declareVariables(p,c)}
            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(n)/64)},programUniforms:a}),getShaderSource:l}},Rp=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let s=e[3].getBigInt64Array();for(let l=0;l<s.length;l++)a[Number(s[l])]=Number(n[l]),a[Number(s[l])+i]=Number(n[l+s.length])}else n.forEach((s,l)=>a[Number(l)]=Number(s));let o=[];return a.forEach(s=>o.push(s)),{mode:t.mode,value:r,pads:o}}else return t},p0=(e,t)=>{Ep(e.inputs);let n=Rp(e.inputs,t);e.compute(Pp(e.inputs,n),{inputs:[0]})}}),nr,Wa,qa,Va,Ha,Op,Bp,Ga,ja,h0,f0,Ka,m0,g0,Xa,b0,y0,w0,_0,wx=q(()=>{ot(),ae(),de(),ce(),nr=e=>{if(Se.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Wa=(e,t,n)=>{let r=t.format==="NHWC",i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),s=t.strides.slice(),l=a?t.dilations.slice():[],u=t.pads.slice();hi.adjustPoolAttributes(n,i,o,s,l,u);let c=hi.computePoolOutputShape(n,i,s,l,o,u,t.autoPad),p=Object.assign({},t);a?Object.assign(p,{kernelShape:o,strides:s,pads:u,dilations:l,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:o,strides:s,pads:u,cacheKey:t.cacheKey});let f=c.slice();return f.push(f.splice(1,1)[0]),[p,r?f:c]},qa=(e,t)=>{let n=t.format==="NHWC",r=R.size(e),i=R.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],p=!!(u+c);a.push({type:12,data:s},{type:12,data:l},{type:12,data:u},{type:12,data:c}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],x=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];f=!!(x+T),a.push({type:12,data:g},{type:12,data:b},{type:12,data:x},{type:12,data:T}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,o,!0,p,f]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=R.computeStrides(t.kernelShape);a.push({type:12,data:s},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((u,c)=>u+c);return[a,o,!!l,!1,!1]}},Va=(e,t,n,r,i,a,o,s,l,u,c,p)=>{let f=i.format==="NHWC",g=t.type.value,b=J("output",t.type.tensor,r);if(i.kernelShape.length<=2){let x="",T="",w="",v=n-(f?2:1);if(c?x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,i.kernelShape.length===2){let E=n-(f?3:2);p?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${E}] < 0 || xIndices[${E}] >= uniforms.x_shape[${E}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                `,w=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${g}(${s});
              var pad = 0;
              ${T}
              ${x}
              ${w}
              ${o}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let x=i.kernelShape.length,T=i.pads.length,w="";return u?w=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:w=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${x}>;

              var value = ${g}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${x-1}u; j++) {
                  offsets[j] = offset / ${ee("uniforms.kernelStrides","j",x)};
                  offset -= offsets[j] * ${ee("uniforms.kernelStrides","j",x)};
                }
                offsets[${x-1}] = offset;

                isPad = false;
                for (var j = ${n-x}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ee("uniforms.strides",`j - ${n-x}u`,x)}
                    + offsets[j - ${n-x}u] - ${ee("uniforms.pads","j - 2u",T)};
                  ${w}
              }
              ${o}

              output[global_idx] = value;
            }`}},Ha=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Op=e=>`${Ha(e)};${e.countIncludePad}`,Bp=e=>`${Ha(e)};${e.storageOrder};${e.dilations}`,Ga=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ja=(e,t,n,r)=>{let[i,a]=Wa(t,r,n),o=D("x",t.dataType,t.dims.length),s=o.type.value,l="value += x_val;",u="";i.countIncludePad?u+=`value /= ${s}(uniforms.kernelSize);`:u+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[c,p,f,g,b]=qa(a,i);c.push(...ne(t.dims,a));let x=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${f};${g};${b}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:T=>Va(T,o,t.dims.length,a.length,i,l,u,0,p,f,g,b)}},h0=e=>{let t=e.count_include_pad!==0,n=Ga(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Op(r)}},f0=(e,t)=>{nr(e.inputs),e.compute(ja("AveragePool",e.inputs[0],!1,t))},Ka={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},m0=e=>{let t=e.format;return{format:t,...Ka,cacheKey:t}},g0=(e,t)=>{nr(e.inputs),e.compute(ja("GlobalAveragePool",e.inputs[0],!0,t))},Xa=(e,t,n,r)=>{let[i,a]=Wa(t,r,n),o=`
      value = max(x_val, value);
    `,s="",l=D("x",t.dataType,t.dims.length),u=["rank"],[c,p,f,g,b]=qa(a,i);return c.push(...ne(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${f};${g};${b}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:x=>Va(x,l,t.dims.length,a.length,i,o,s,t.dataType===10?-65504:-1e5,p,f,g,b)}},b0=(e,t)=>{nr(e.inputs),e.compute(Xa("MaxPool",e.inputs[0],!1,t))},y0=e=>{let t=e.storage_order,n=e.dilations,r=Ga(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:n,...r,cacheKey:""};return{...i,cacheKey:Bp(i)}},w0=e=>{let t=e.format;return{format:t,...Ka,cacheKey:t}},_0=(e,t)=>{nr(e.inputs),e.compute(Xa("GlobalMaxPool",e.inputs[0],!0,t))}}),Dp,Lp,x0,v0,_x=q(()=>{ae(),de(),Ae(),ce(),Dp=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Lp=(e,t)=>{let n=R.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,o=e[1].dataType,s=R.size(a),l=r===3||r===2,u=l?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,p=e.length>2?e[2]:void 0,f=p?l?[Math.ceil(R.size(p.dims)/4)]:p.dims:void 0,g=c.length===0||c.length===1&&c[0]===1,b=g===!1&&c.length===1,x=ze(s),T=g&&(!l||x===4),w=T?x:1,v=T&&!l?x:1,E=D("input",l?12:r,u.length,v),C=D("scale",o,c.length),I=p?D("zero_point",l?12:r,f.length):void 0,M=J("output",o,a.length,w),A=[E,C];I&&A.push(I);let $=[u,c];p&&$.push(f);let O=[{type:12,data:s/w},{type:12,data:n},{type:12,data:t.blockSize},...ne(...$,a)],L=H=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${H.registerUniforms(K).declareVariables(...A,M)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${M.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${E.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${w===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${E.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${C.getByOffset("0")}`:b?`
            let scale_index = ${M.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?g?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:b?l?`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":E.type.value}(0);`};
      // Compute and write output
      ${M.setByOffset("global_idx",`${M.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/w/64),y:1,z:1},programUniforms:O})}},x0=(e,t)=>{Dp(e.inputs,t),e.compute(Lp(e.inputs,t))},v0=e=>ve({axis:e.axis,blockSize:e.blockSize})}),Up,Fp,$0,xx=q(()=>{ot(),ae(),ce(),Up=(e,t,n)=>{let r=e===t,i=e<t&&n<0,a=e>t&&n>0;if(r||i||a)throw new Error("Range these inputs' contents are invalid.")},Fp=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],o=i,s=[{type:12,data:o},{type:r,data:e},{type:r,data:n},...ne(a)],l=u=>{let c=J("output",r,a.length),p=c.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${u.registerUniforms(f).declareVariables(c)}
        ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}},$0=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Se.webgpu.validateInputContent&&Up(t,n,r),e.compute(Fp(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),Wp,qp,S0,k0,vx=q(()=>{ae(),de(),Ae(),ce(),Wp=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
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
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},qp=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=1,o=Math.ceil(R.sizeToDimension(r,r.length-1)/a),s=r[r.length-1],l=R.sizeFromDimension(n,s),u=[{type:12,data:o},{type:12,data:s},{type:12,data:l},...ne(e[1].dims,e[2].dims,i)],c=p=>{let f=D("indices",e[1].dataType,e[1].dims.length),g=D("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?Jf("output",e[0].dataType,i.length):J("output",e[0].dataType,i.length,a);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,g,b)}
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
    ${Wp(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:c}},S0=e=>ve({reduction:e.reduction}),k0=(e,t)=>{e.compute(qp(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Vp,Hp,Gp,Ya,jp,Kp,Xp,Yp,Qp,Zp,Jp,eh,Qa,th,nh,rh,ih,ah,T0,C0,$x=q(()=>{ae(),de(),Ae(),ce(),Vp=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Hp=(e,t,n)=>{t.every(i=>i>=0&&i<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((i,a)=>r[i]=e[a]),r},Gp=(e,t,n,r,i,a)=>{let[o,s,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],u=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&e.length>s&&e[s].dims.length===1&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(c=>r.push(c)),r.length!==0&&r.length!==u&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Vp(r,t),t.axes.length>0&&Hp(r,t.axes,u).forEach((c,p)=>r[p]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>i.push(Number(c))),i.length!==0&&i.length!==u&&n>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof i<"u"&&r.length>0&&i.length>u)throw new Error("Resize requires only of scales or sizes to be specified")},Ya=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,jp=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ya("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ya("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Kp=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Xp=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,o)=>{r[a]=i[o],r[o+n]=i[t.length+o]}),r):i},Yp=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>i.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,o)=>i[a]=n[o])}else n.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,o)=>Math.round(a*t[o]))}return i},Qp=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),i.forEach((a,o)=>i[o]=Math.round(a*t[o]))),i},Zp=(e,t,n,r,i)=>`
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
    }`,Jp=(e,t,n,r,i,a,o)=>`
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
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,eh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ee("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Qa=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",th=(e,t,n,r,i)=>{let[a,o,s,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(col, ${n[s]} - 1))`)};
      ${Qa(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${u} = originalIndices[${o}];
      var col:${u} = originalIndices[${s}];
      ${r?`if (row < 0 || row > (${n[o]} - 1) || col < 0 || col > (${n[s]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${n[o]} - 1));
      col = max(0, min(col, ${n[s]} - 1));
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
    }`},nh=(e,t,n,r,i,a,o,s,l,u)=>{let c=n.length===2,[p,f]=c?[0,1]:[2,3],g=e.type.value,b=x=>{let T=x===p?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[x]},
        ${r[x]}, ${n[x]}, ${a[x]}, ${a[x]} + ${n.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[x]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${g} = originalIdx + ${g}(i);
          if (${T} < 0 || ${T} >= ${n[x]}) {
            ${u?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${l};`:`${T} = max(0, min(${T}, ${n[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${T})`)};
          data[i + 1] = ${x===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(p)};
    ${b(f)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
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
    `},rh=(e,t,n,r,i)=>{let[a,o,s,l,u]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Qa(e,u,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${o}];
      var height:${c} = originalIndices[${s}];
      var width:${c} = originalIndices[${l}];
      ${r?`if (depth < 0 || depth > (${n[o]} - 1) || height < 0 || height > (${n[s]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${n[o]} - 1));
      height = max(0, min(height, ${n[s]} - 1));
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
    }`},ih=(e,t,n,r,i,a)=>{let o=e.dims,s=Xp(a,t.axes,o.length),l=Yp(o,r,i,t.axes),u=r.slice();r.length===0&&(u=o.map((v,E)=>v===0?1:l[E]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Qp(o,u,t)));let c=J("output",e.dataType,l.length),p=D("input",e.dataType,o.length),f=R.size(l),g=o.length===l.length&&o.every((v,E)=>v===l[E]),b=t.coordinateTransformMode==="tf_crop_and_resize",x=t.extrapolationValue,T=p.type.value,w=v=>`
      ${g?"":`
      ${jp(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${eh(p,o)};
              ${Kp(t.nearestMode,n,T)};
              ${Jp(p,c,o,l,u.length,s.length,b)};
              `;case"linear":return`
              ${Zp(c,o,l,u.length,s.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${th(p,c,o,b,x)}`;if(o.length===3||o.length===5)return`${rh(p,c,o,b,x)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${nh(p,c,o,l,u,s,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",s.length).declareVariables(p,c)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${u.length>0?t.mode==="cubic"?u:u.length:""}|${i.length>0?i:""}|${s.length>0?s:""}|${g}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:u},{type:1,data:s},...ne(o,l)]})}},ah=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},T0=(e,t)=>{let n=[],r=[],i=[],a=ah(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Gp(e.inputs,t,a,n,r,i),e.compute(ih(e.inputs[0],t,a,n,r,i),{inputs:[0]})},C0=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,s=e.keepAspectRatioPolicy,l=e.mode,u=e.nearestMode===""?"simple":e.nearestMode;return ve({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:s,mode:l,nearestMode:u})}}),oh,sh,E0,Sx=q(()=>{ae(),de(),ce(),oh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},sh=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,o=R.size(a),s=a,l=o,u=a.slice(-1)[0],c=r?a.slice(0,-1).concat(1):[],p=!i&&e.length>3,f=e.length>4,g=r&&n>1,b=r&&n>2,x=n>3,T=64,w=ze(u),v=[{type:12,data:l},{type:12,data:w},{type:12,data:u},{type:1,data:t.epsilon}],E=I=>{let M=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[D("x",e[0].dataType,e[0].dims,w),D("skip",e[1].dataType,e[1].dims,w),D("gamma",e[2].dataType,e[2].dims,w)];p&&A.push(D("beta",e[3].dataType,e[3].dims,w)),f&&A.push(D("bias",e[4].dataType,e[4].dims,w)),A.push(J("output",e[0].dataType,s,w)),g&&A.push(J("mean_output",1,c)),b&&A.push(J("inv_std_output",1,c)),x&&A.push(J("input_skip_bias_sum",e[0].dataType,s,w));let $=Re(e[0].dataType),O=Re(1,w);return`

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
          ${x?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Pn($,w,"value")};
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
        let mean = ${Yt("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Yt("square_sum",w)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:s,dataType:e[0].dataType}];return n>1&&C.push({dims:c,dataType:1}),n>2&&C.push({dims:c,dataType:1}),n>3&&C.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${g};${b};${x}`,inputDependencies:e.map((I,M)=>"type")},getShaderSource:E,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(l/u)},programUniforms:v})}},E0=(e,t)=>{oh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(sh(e.inputs,t,e.outputCount,!1),{outputs:n})}}),lh,rr,uh,Za,dh,ch,I0,z0,kx=q(()=>{ae(),de(),Ae(),ce(),lh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},rr=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},uh=(e,t)=>{if(e.length>1){let n=rr(e,1),r=rr(e,2),i=rr(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),ve({starts:n,ends:r,axes:i})}else return t},Za=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},dh=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,ch=(e,t)=>{let n=e[0].dims,r=R.size(n),i=t.axes.length>0?R.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=rr(e,4);a.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let o=t.starts.map((w,v)=>Za(w,v,n,i,a)),s=t.ends.map((w,v)=>Za(w,v,n,i,a));if(i.length!==o.length||i.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==n.length)for(let w=0;w<n.length;++w)i.includes(w)||(o.splice(w,0,0),s.splice(w,0,n[w]),a.splice(w,0,1));let l=a.map(w=>Math.sign(w));a.forEach((w,v,E)=>{if(w<0){let C=(s[v]-o[v])/w,I=o[v],M=I+C*a[v];o[v]=M,s[v]=I,E[v]=-w}});let u=n.slice(0);i.forEach((w,v)=>{u[w]=Math.ceil((s[w]-o[w])/a[w])});let c={dims:u,dataType:e[0].dataType},p=J("output",e[0].dataType,u.length),f=D("input",e[0].dataType,e[0].dims.length),g=R.size(u),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],x=[{type:12,data:g},{type:12,data:o},{type:6,data:l},{type:12,data:a},...ne(e[0].dims,u)],T=w=>`
      ${w.registerUniforms(b).declareVariables(f,p)}
        ${dh(f,p,n)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:x})}},I0=(e,t)=>{lh(e.inputs,t);let n=uh(e.inputs,t);e.compute(ch(e.inputs,n),{inputs:[0]})},z0=e=>{let t=e.starts,n=e.ends,r=e.axes;return ve({starts:t,ends:n,axes:r})}}),ph,hh,M0,A0,Tx=q(()=>{ae(),de(),Ae(),Zt(),ce(),ph=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},hh=(e,t)=>{let n=e.inputs[0],r=n.dims,i=R.size(r),a=r.length,o=R.normalizeAxis(t.axis,a),s=o<r.length-1,l,u=[];s?(u=Array.from({length:a},(A,$)=>$),u[o]=a-1,u[a-1]=o,l=e.compute(nt(n,u),{inputs:[n],outputs:[-1]})[0]):l=n;let c=l.dims,p=c[a-1],f=i/p,g=ze(p),b=p/g,x=64;f===1&&(x=256);let T=(A,$)=>$===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:$===2?`max(${A}.x, ${A}.y)`:$===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,w=D("x",l.dataType,l.dims,g),v=J("result",l.dataType,l.dims,g),E=w.type.value,C=Re(l.dataType)==="f32"?`var threadMax = ${E}(-3.4028234663852886e+38f);`:`var threadMax = ${E}(-65504.0h);`,I=A=>`
      var<workgroup> rowMaxShared : ${E};
      var<workgroup> rowSumShared : ${E};
      var<workgroup> threadShared : array<${E}, ${x}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${E} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${E}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables(w,v)}
      ${A.mainStart(x)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${x};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${C}
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
          rowMaxShared = ${E}(${T("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${E}(0.0);
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
          rowSumShared = ${E}(${Yt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${E}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,M=e.compute({name:"Softmax",shaderCache:{hint:`${g};${x}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:b}]}),getShaderSource:I},{inputs:[l],outputs:[s?-1:0]})[0];s&&e.compute(nt(M,u),{inputs:[M]})},M0=(e,t)=>{ph(e.inputs),hh(e,t)},A0=e=>ve({axis:e.axis})}),Ja,fh,mh,gh,N0,Cx=q(()=>{ae(),de(),ce(),Ja=e=>Array.from(e.getBigInt64Array(),Number),fh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ja(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},mh=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},gh=(e,t)=>{let n=e[0].dims,r=t??Ja(e[1]),i=mh(n,r),a=R.size(i),o=e[0].dataType,s=D("input",o,n.length),l=J("output",o,i.length),u=c=>`
      const inputShape = ${s.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(s,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ne(e[0].dims,i)]}),getShaderSource:u}},N0=e=>{fh(e.inputs),e.compute(gh(e.inputs),{inputs:[0]})}}),bh,yh,P0,Ex=q(()=>{ae(),de(),ce(),bh=(e,t,n,r,i)=>{let a=J("output_data",i,n.length,4),o=D("a_data",t[1].dataType,t[1].dims.length,4),s=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),u,c=(p,f,g)=>`select(${f}, ${p}, ${g})`;if(!r)u=a.setByOffset("global_idx",c(o.getByOffset("global_idx"),s.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let p=(f,g,b="")=>{let x=`a_data[index_a${g}][component_a${g}]`,T=`b_data[index_b${g}][component_b${g}]`,w=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${a.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${o.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_b${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_c${g} = ${l.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${f}[${g}] = ${b}(${c(x,T,w)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(l,o,s,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${u}
      }`},yh=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(R.areEqual(t,n)&&R.areEqual(n,r)),o=t,s=R.size(t);if(a){let u=Bn.calcShape(Bn.calcShape(t,n,!1),r,!1);if(!u)throw new Error("Can't perform where op on the given tensors");o=u,s=R.size(o)}let l=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:u=>bh(u,e,o,a,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:l},...ne(r,t,n,o)]})}},P0=e=>{e.compute(yh(e.inputs))}}),R0,Ix=q(()=>{q1(),ds(),V1(),H1(),G1(),j1(),K1(),J1(),tx(),nx(),rx(),ix(),ax(),ox(),sx(),lx(),ux(),dx(),cx(),px(),hx(),fx(),mx(),gx(),bx(),e0(),yx(),wx(),_x(),xx(),vx(),us(),$x(),a0(),Sx(),kx(),Tx(),r0(),Cx(),Zt(),cs(),Ex(),R0=new Map([["Abs",[Em]],["Acos",[Im]],["Acosh",[zm]],["Add",[dg]],["ArgMax",[Sm,Io]],["ArgMin",[$m,Io]],["Asin",[Mm]],["Asinh",[Am]],["Atan",[Nm]],["Atanh",[Pm]],["Attention",[km]],["AveragePool",[f0,h0]],["BatchNormalization",[Tm]],["BiasAdd",[Cm]],["BiasSplitGelu",[ug]],["Cast",[Om,Rm]],["Ceil",[Dm]],["Clip",[Bm]],["Concat",[_g,xg]],["Conv",[Ro,Po]],["ConvTranspose",[Mg,zg]],["Cos",[Lm]],["Cosh",[Um]],["CumSum",[Ag,Ng]],["DepthToSpace",[Pg,Rg]],["DequantizeLinear",[x0,v0]],["Div",[cg]],["Einsum",[Og,Bg]],["Elu",[Fm,dr]],["Equal",[pg]],["Erf",[Wm]],["Exp",[qm]],["Expand",[Dg]],["FastGelu",[Lg]],["Floor",[Vm]],["FusedConv",[Ro,Po]],["Gather",[Fg,Ug]],["GatherElements",[jg,Gg]],["GatherBlockQuantized",[Vg,Hg]],["GatherND",[Wg,qg]],["Gelu",[Hm]],["Gemm",[Xg,Kg]],["GlobalAveragePool",[g0,m0]],["GlobalMaxPool",[_0,w0]],["Greater",[gg]],["GreaterOrEqual",[yg]],["GridSample",[Yg,Qg]],["GroupQueryAttention",[o0]],["HardSigmoid",[Jm,Zm]],["InstanceNormalization",[s0]],["LayerNormalization",[l0]],["LeakyRelu",[Gm,dr]],["Less",[bg]],["LessOrEqual",[wg]],["Log",[sg]],["MatMul",[u0]],["MatMulNBits",[d0,c0]],["MaxPool",[b0,y0]],["Mul",[hg]],["MultiHeadAttention",[Jg,Zg]],["Neg",[Km]],["Not",[jm]],["Pad",[p0]],["Pow",[fg]],["QuickGelu",[lg,dr]],["Range",[$0]],["Reciprocal",[Xm]],["ReduceMin",[ym]],["ReduceMean",[hm]],["ReduceMax",[bm]],["ReduceSum",[_m]],["ReduceProd",[wm]],["ReduceL1",[fm]],["ReduceL2",[mm]],["ReduceLogSum",[vm]],["ReduceLogSumExp",[gm]],["ReduceSumSquare",[xm]],["Relu",[Ym]],["Resize",[T0,C0]],["RotaryEmbedding",[i0]],["ScatterND",[k0,S0]],["Sigmoid",[Qm]],["Sin",[eg]],["Sinh",[tg]],["Slice",[I0,z0]],["SkipLayerNormalization",[E0]],["Split",[t0,n0]],["Sqrt",[ng]],["Softmax",[M0,A0]],["Sub",[mg]],["Tan",[rg]],["Tanh",[ig]],["ThresholdedRelu",[og,dr]],["Tile",[N0]],["Transpose",[tm,nm]],["Where",[P0]]])}),O0,zx=q(()=>{ot(),Bt(),ce(),O0=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){Ct(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let s=[];for(let u of t)s.push({binding:s.length,resource:{buffer:u.buffer}});for(let u of n)s.push({binding:s.length,resource:{buffer:u.buffer}});i&&s.push({binding:s.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let u={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(u)}o.setPipeline(e.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,t){Ct(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(u=>{n.features.has(u.feature)&&r.push(`enable ${u.extension};`)});let i=em(t,this.backend.device.limits),a=e.getShaderSource(i),o=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,s=n.createShaderModule({code:o,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let l=n.createComputePipeline({compute:{module:s,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,o=Math.ceil(Math.sqrt(a));if(o>i){if(o=Math.ceil(Math.cbrt(a)),o>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),B0={};Fn(B0,{WebGpuBackend:()=>D0});var wh,_h,xh,D0,Mx=q(()=>{ot(),ae(),Bt(),Xf(),F1(),Ix(),zx(),wh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${i}`);break}case"rank":{let a=e[r].dims.length;n.push(`${i};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},_h=(e,t,n)=>{var i,a;let r=e.name;return(i=e.shaderCache)!=null&&i.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${wh(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,r},xh=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},D0=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>t.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new xh(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Zf(this),this.programManager=new O0(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,as(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ct(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var r;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=n[i],o=a.kernelId,s=this.kernels.get(o),l=s.kernelType,u=s.kernelName,c=a.programName,p=a.inputTensorViews,f=a.outputTensorViews,g=t[i*2],b=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let x=Number(g-this.queryTimeBase),T=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(x)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if((r=this.env.webgpu.profiling)!=null&&r.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(w=>({dims:w.dims,dataType:Nt(w.dataType)})),outputsMetadata:f.map(w=>({dims:w.dims,dataType:Nt(w.dataType)})),kernelId:o,kernelType:l,kernelName:u,programName:c,startTime:x,endTime:T});else{let w="";p.forEach((E,C)=>{w+=`input[${C}]: [${E.dims}] | ${Nt(E.dataType)}, `});let v="";f.forEach((E,C)=>{v+=`output[${C}]: [${E.dims}] | ${Nt(E.dataType)}, `}),console.log(`[profiling] kernel "${o}|${l}|${u}|${c}" ${w}${v}start time: ${x} ns, execution time: ${T-x} ns`)}di("GPU",`${c}::${g}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),yt()}run(e,t,n,r,i,a){Ct(e.name);let o=[];for(let v=0;v<t.length;++v){let E=t[v].data;if(E===0)continue;let C=this.gpuDataManager.get(E);if(!C)throw new Error(`no GPU data for input: ${E}`);o.push(C)}let{outputs:s,dispatchGroup:l,programUniforms:u}=e.getRunData(t),c=n.length===0?s.map((v,E)=>E):n;if(c.length!==s.length)throw new Error(`Output size ${c.length} must be equal to ${s.length}.`);let p=[],f=[];for(let v=0;v<s.length;++v){if(!Number.isInteger(c[v])||c[v]<-3||c[v]>=a)throw new Error(`Invalid output index: ${c[v]}`);if(c[v]===-3)continue;let E=c[v]===-1,C=c[v]===-2,I=E||C?i(s[v].dataType,s[v].dims):r(c[v],s[v].dataType,s[v].dims);if(p.push(I),I.data===0)continue;let M=this.gpuDataManager.get(I.data);if(!M)throw new Error(`no GPU data for output: ${I.data}`);if(E&&this.temporaryData.push(M),C){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(M)}f.push(M)}if(o.length!==t.length||f.length!==p.length){if(f.length===0)return yt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(u){let v=0,E=[];u.forEach(A=>{let $=typeof A.data=="number"?[A.data]:A.data;if($.length===0)return;let O=A.type===10?2:4,L,H;A.type===10?(H=$.length>4?16:$.length>2?8:$.length*O,L=$.length>4?16:O*$.length):(H=$.length<=2?$.length*O:16,L=16),v=Math.ceil(v/H)*H,E.push(v);let K=A.type===10?8:4;v+=$.length>4?Math.ceil($.length/K)*L:$.length*O});let C=16;v=Math.ceil(v/C)*C;let I=new ArrayBuffer(v);u.forEach((A,$)=>{let O=E[$],L=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(I,O,L.length).set(L);else if(A.type===12)new Uint32Array(I,O,L.length).set(L);else if(A.type===10)new Uint16Array(I,O,L.length).set(L);else if(A.type===1)new Float32Array(I,O,L.length).set(L);else throw new Error(`Unsupported uniform type: ${Nt(A.type)}`)});let M=this.gpuDataManager.create(v,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(M.buffer,0,I,0,v),this.gpuDataManager.release(M.id),g={offset:0,size:v,buffer:M.buffer}}let b=this.programManager.normalizeDispatchGroupSize(l),x=b[1]===1&&b[2]===1,T=_h(e,t,x),w=this.programManager.getArtifact(T);if(w||(w=this.programManager.build(e,b),this.programManager.setArtifact(T,w),ye("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),u&&w.uniformVariablesInfo){if(u.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${u.length} in program "${w.programInfo.name}".`);for(let v=0;v<u.length;v++){let E=u[v],C=E.type,I=typeof E.data=="number"?1:E.data.length,[M,A]=w.uniformVariablesInfo[v];if(C!==M||I!==A)throw new Error(`Uniform variable ${v} mismatch: expect type ${M} with size ${A}, got type ${C} with size ${I} in program "${w.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${b[0]}x${b[1]}x${b[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let v={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(v),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(v)}return this.programManager.run(w,o,f,b,g),yt(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=R0.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,o=r.kernelEntry,s=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&(s[1]=s[0](s[1]),s[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(t,s[1]),0}catch(u){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${u}`)),1}finally{l&&n.push(this.device.popErrorScope().then(u=>u?`GPU validation error for kernel "[${i}] ${a}": ${u.message}`:null));for(let u of this.temporaryData)this.gpuDataManager.release(u.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),o=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[o,n]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await To(this,e,t);return os(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),L0={};Fn(L0,{init:()=>U0});var Jr,vh,U0,Ax=q(()=>{ae(),Bt(),de(),U1(),Jr=class F0{constructor(t,n,r,i){this.module=t,this.dataType=n,this.data=r,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new F0(this.module,this.dataType,this.data,t)}},vh=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*i++,a));let o=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,"*")),this.customDataSize=Number(e.getValue(r*i++,a));let s=[];for(let l=0;l<o;l++){let u=Number(e.getValue(r*i++,a)),c=Number(e.getValue(r*i++,"*")),p=Number(e.getValue(r*i++,a)),f=[];for(let g=0;g<p;g++)f.push(Number(e.getValue(r*i++,a)));s.push(new Jr(e,u,c,f))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var o;let n=((o=t==null?void 0:t.inputs)==null?void 0:o.map(s=>typeof s=="number"?this.inputs[s]:s))??this.inputs,r=(t==null?void 0:t.outputs)??[],i=(s,l,u)=>new Jr(this.module,l,this.output(s,u),u),a=(s,l)=>{let u=pn(s,l);if(!u)throw new Error(`Unsupported data type: ${s}`);let c=u>0?this.backend.gpuDataManager.create(u).id:0;return new Jr(this.module,s,c,l)};return this.backend.run(e,n,r,i,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=r===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let o=0;o<t.length;o++)this.module.setValue(a+r*(o+1),t[o],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},U0=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Mx(),vr(B0)).WebGpuBackend,o=new a;await o.initialize(n,r),i("webgpu",[o,s=>o.alloc(Number(s)),s=>o.free(s),(s,l,u,c=!1)=>{if(c)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(l)}, size=${Number(u)}`),o.memcpy(Number(s),Number(l));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(l)}, size=${Number(u)}`);let p=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));o.upload(Number(l),p)}},async(s,l,u)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${l}, size=${u}`),await o.download(Number(s),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+u)>>>0))},(s,l,u)=>o.createKernel(s,Number(l),u,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),s=>o.releaseKernel(s),(s,l,u,c)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${l}`);let p=new vh(t,o,Number(l));return o.computeKernel(Number(s),p,c)},()=>o.captureBegin(),()=>o.captureEnd(),()=>o.replay()])}else{let a=new Qf(n);i("webnn",[a,()=>a.reserveTensorId(),o=>a.releaseTensorId(o),async(o,s,l,u,c)=>a.ensureTensor(o,s,l,u,c),(o,s)=>{a.uploadTensor(o,s)},async(o,s)=>a.downloadTensor(o,s),(o,s)=>a.registerMLContext(o,s),!!n.trace])}}}),$h,bs,ys,Gt,Sh,eo,bi,ws,_s,to,xs,vs,$s,W0=q(()=>{ot(),B1(),D1(),ae(),kn(),ts(),Hf(),$h=(e,t)=>{Te()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},bs=async e=>{$h(e.wasm.numThreads,pi(e.logLevel))},ys=async(e,t)=>{var r,i;(i=(r=Te()).asyncInit)==null||i.call(r);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let o=e.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(Ax(),vr(L0)).init;t==="webgpu"&&await a("webgpu",Te(),e,n),t==="webnn"&&await a("webnn",Te(),e)}},Gt=new Map,Sh=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,i,i+r)!==0&&$e("Can't get session input/output count.");let a=r===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(n)}},eo=(e,t)=>{let n=Te(),r=n.stackSave(),i=0;try{let a=n.PTR_SIZE,o=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,o,o+a)!==0&&$e("Can't get session input/output metadata.");let s=Number(n.getValue(o,"*"));i=Number(n.getValue(o+a,"*"));let l=n.HEAP32[i/4];if(l===0)return[s,0];let u=n.HEAPU32[i/4+1],c=[];for(let p=0;p<u;p++){let f=Number(n.getValue(i+8+p*a,"*"));c.push(f!==0?n.UTF8ToString(f):Number(n.getValue(i+8+(p+u)*a,"*")))}return[s,l,c]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},bi=e=>{let t=Te(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},ws=async(e,t)=>{var p,f,g,b;let n,r,i=Te();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=bi(e);let a=0,o=0,s=0,l=[],u=[],c=[];try{if([o,l]=await Vf(t),(t==null?void 0:t.externalData)&&i.mountExternalData){let $=[];for(let O of t.externalData){let L=typeof O=="string"?O:O.path;$.push(is(typeof O=="string"?O:O.data).then(H=>{i.mountExternalData(L,H)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof $!="string"){let O=$,L=O==null?void 0:O.context,H=O==null?void 0:O.gpuDevice,K=O==null?void 0:O.deviceType,X=O==null?void 0:O.powerPreference;L?i.currentContext=L:H?i.currentContext=await i.webnnCreateMLContext(H):i.currentContext=await i.webnnCreateMLContext({deviceType:K,powerPreference:X})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,o),(p=i.webgpuOnCreateSession)==null||p.call(i,a),a===0&&$e("Can't create a session."),(f=i.jsepOnCreateSession)==null||f.call(i),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[x,T]=Sh(a),w=!!(t!=null&&t.enableGraphCapture),v=[],E=[],C=[],I=[],M=[];for(let $=0;$<x;$++){let[O,L,H]=eo(a,$);O===0&&$e("Can't get an input name."),u.push(O);let K=i.UTF8ToString(O);v.push(K),C.push(L===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Nt(L),shape:H})}for(let $=0;$<T;$++){let[O,L,H]=eo(a,$+x);O===0&&$e("Can't get an output name."),c.push(O);let K=i.UTF8ToString(O);E.push(K),I.push(L===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Nt(L),shape:H});{if(w&&(t==null?void 0:t.preferredOutputLocation)===void 0){M.push("gpu-buffer");continue}let X=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((g=t==null?void 0:t.preferredOutputLocation)==null?void 0:g[K])??"cpu",P=i.webnnIsGraphOutput;if(X==="cpu"&&P&&P(a,K)){M.push("ml-tensor-cpu-output");continue}if(X!=="cpu"&&X!=="cpu-pinned"&&X!=="gpu-buffer"&&X!=="ml-tensor")throw new Error(`Not supported preferred output location: ${X}.`);if(w&&X!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${X}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);M.push(X)}}let A=null;return M.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(s=i._OrtCreateBinding(a),s===0&&$e("Can't create IO binding."),A={handle:s,outputPreferredLocations:M,outputPreferredLocationsEncoded:M.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>So($))}),Gt.set(a,[a,u,c,A,w,!1]),[a,v,E,C,I]}catch(x){throw u.forEach(T=>i._OrtFree(T)),c.forEach(T=>i._OrtFree(T)),s!==0&&i._OrtReleaseBinding(s)!==0&&$e("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&$e("Can't release session."),x}finally{i._free(n),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&$e("Can't release session options."),l.forEach(x=>i._free(x)),(b=i.unmountExternalData)==null||b.call(i)}},_s=e=>{var l,u,c;let t=Te(),n=Gt.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,o,s]=n;o&&(s&&t._OrtClearBoundOutputs(o.handle)!==0&&$e("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&$e("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(u=t.webnnOnReleaseSession)==null||u.call(t,e),(c=t.webgpuOnReleaseSession)==null||c.call(t,e),i.forEach(p=>t._OrtFree(p)),a.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(r)!==0&&$e("Can't release session."),Gt.delete(e)},to=async(e,t,n,r,i,a,o=!1)=>{if(!e){t.push(0);return}let s=Te(),l=s.PTR_SIZE,u=e[0],c=e[1],p=e[3],f=p,g,b;if(u==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(o&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let w=e[2].gpuBuffer;b=pn(cn(u),c);{let v=s.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=v(r,a,w,b)}}else if(p==="ml-tensor"){let w=e[2].mlTensor;b=pn(cn(u),c);let v=s.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=v(r,w,cn(u),c)}else{let w=e[2];if(Array.isArray(w)){b=l*w.length,g=s._malloc(b),n.push(g);for(let v=0;v<w.length;v++){if(typeof w[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);s.setValue(g+v*l,ft(w[v],n),"*")}}else{let v=s.webnnIsGraphInput,E=s.webnnIsGraphOutput;if(u!=="string"&&v&&E){let C=s.UTF8ToString(i);if(v(r,C)||E(r,C)){let I=cn(u);b=pn(I,c),f="ml-tensor";let M=s.webnnCreateTemporaryTensor,A=s.webnnUploadTensor;if(!M||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await M(r,I,c);A($,new Uint8Array(w.buffer,w.byteOffset,w.byteLength)),g=$}else b=w.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,b),g)}else b=w.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,b),g)}}let x=s.stackSave(),T=s.stackAlloc(4*c.length);try{c.forEach((v,E)=>s.setValue(T+E*l,v,l===4?"i32":"i64"));let w=s._OrtCreateTensor(cn(u),g,b,T,c.length,So(f));w===0&&$e(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(w)}finally{s.stackRestore(x)}},xs=async(e,t,n,r,i,a)=>{var K,X,P,Z;let o=Te(),s=o.PTR_SIZE,l=Gt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let u=l[0],c=l[1],p=l[2],f=l[3],g=l[4],b=l[5],x=t.length,T=r.length,w=0,v=[],E=[],C=[],I=[],M=[],A=o.stackSave(),$=o.stackAlloc(x*s),O=o.stackAlloc(x*s),L=o.stackAlloc(T*s),H=o.stackAlloc(T*s);try{[w,v]=qf(a),gn("wasm prepareInputOutputTensor");for(let F=0;F<x;F++)await to(n[F],E,I,e,c[t[F]],t[F],g);for(let F=0;F<T;F++)await to(i[F],C,I,e,p[r[F]],x+r[F],g);bn("wasm prepareInputOutputTensor");for(let F=0;F<x;F++)o.setValue($+F*s,E[F],"*"),o.setValue(O+F*s,c[t[F]],"*");for(let F=0;F<T;F++)o.setValue(L+F*s,C[F],"*"),o.setValue(H+F*s,p[r[F]],"*");if(f&&!b){let{handle:F,outputPreferredLocations:re,outputPreferredLocationsEncoded:U}=f;if(c.length!==x)throw new Error(`input count from feeds (${x}) is expected to be always equal to model's input count (${c.length}).`);gn("wasm bindInputsOutputs");for(let G=0;G<x;G++){let Y=t[G];await o._OrtBindInput(F,c[Y],E[G])!==0&&$e(`Can't bind input[${G}] for session=${e}.`)}for(let G=0;G<T;G++){let Y=r[G];(K=i[G])!=null&&K[3]?(M.push(C[G]),o._OrtBindOutput(F,p[Y],C[G],0)!==0&&$e(`Can't bind pre-allocated output[${G}] for session=${e}.`)):o._OrtBindOutput(F,p[Y],0,U[Y])!==0&&$e(`Can't bind output[${G}] to ${re[G]} for session=${e}.`)}bn("wasm bindInputsOutputs"),Gt.set(e,[u,c,p,f,g,!0])}(X=o.jsepOnRunStart)==null||X.call(o,u),(P=o.webnnOnRunStart)==null||P.call(o,u);let W;f?W=await o._OrtRunWithBinding(u,f.handle,T,L,w):W=await o._OrtRun(u,O,$,x,H,T,L,w),W!==0&&$e("failed to call OrtRun().");let te=[],ie=[];gn("wasm ProcessOutputTensor");for(let F=0;F<T;F++){let re=Number(o.getValue(L+F*s,"*"));if(re===C[F]||M.includes(C[F])){te.push(i[F]),re!==C[F]&&o._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.");continue}let U=o.stackSave(),G=o.stackAlloc(4*s),Y=!1,V,_e=0;try{o._OrtGetTensorData(re,G,G+s,G+2*s,G+3*s)!==0&&$e(`Can't access output tensor data on index ${F}.`);let Ve=s===4?"i32":"i64",Ie=Number(o.getValue(G,Ve));_e=o.getValue(G+s,"*");let Be=o.getValue(G+s*2,"*"),je=Number(o.getValue(G+s*3,Ve)),Qe=[];for(let Ce=0;Ce<je;Ce++)Qe.push(Number(o.getValue(Be+Ce*s,Ve)));o._OrtFree(Be)!==0&&$e("Can't free memory for tensor dims.");let Ke=Qe.reduce((Ce,le)=>Ce*le,1);V=Nt(Ie);let Lt=f==null?void 0:f.outputPreferredLocations[r[F]];if(V==="string"){if(Lt==="gpu-buffer"||Lt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let le=0;le<Ke;le++){let Ze=o.getValue(_e+le*s,"*"),Ir=o.getValue(_e+(le+1)*s,"*"),Hn=le===Ke-1?void 0:Ir-Ze;Ce.push(o.UTF8ToString(Ze,Hn))}te.push([V,Qe,Ce,"cpu"])}else if(Lt==="gpu-buffer"&&Ke>0){let Ce=o.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let le=Ce(_e),Ze=pn(Ie,Ke);if(Ze===void 0||!ns(V))throw new Error(`Unsupported data type: ${V}`);Y=!0,te.push([V,Qe,{gpuBuffer:le,download:o.jsepCreateDownloader(le,Ze,V),dispose:()=>{o._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(Lt==="ml-tensor"&&Ke>0){let Ce=o.webnnEnsureTensor,le=o.webnnIsGraphInputOutputTypeSupported;if(!Ce||!le)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(pn(Ie,Ke)===void 0||!rs(V))throw new Error(`Unsupported data type: ${V}`);if(!le(e,V,!1))throw new Error(`preferredLocation "ml-tensor" for ${V} output is not supported by current WebNN Context.`);let Ze=await Ce(e,_e,Ie,Qe,!1);Y=!0,te.push([V,Qe,{mlTensor:Ze,download:o.webnnCreateMLTensorDownloader(_e,V),dispose:()=>{o.webnnReleaseTensorId(_e),o._OrtReleaseTensor(re)}},"ml-tensor"])}else if(Lt==="ml-tensor-cpu-output"&&Ke>0){let Ce=o.webnnCreateMLTensorDownloader(_e,V)(),le=te.length;Y=!0,ie.push((async()=>{let Ze=[le,await Ce];return o.webnnReleaseTensorId(_e),o._OrtReleaseTensor(re),Ze})()),te.push([V,Qe,[],"cpu"])}else{let Ce=Ai(V),le=new Ce(Ke);new Uint8Array(le.buffer,le.byteOffset,le.byteLength).set(o.HEAPU8.subarray(_e,_e+le.byteLength)),te.push([V,Qe,le,"cpu"])}}finally{o.stackRestore(U),V==="string"&&_e&&o._free(_e),Y||o._OrtReleaseTensor(re)}}f&&!g&&(o._OrtClearBoundOutputs(f.handle)!==0&&$e("Can't clear bound outputs."),Gt.set(e,[u,c,p,f,g,!1]));for(let[F,re]of await Promise.all(ie))te[F][2]=re;return bn("wasm ProcessOutputTensor"),te}finally{(Z=o.webnnOnRunEnd)==null||Z.call(o,u),o.stackRestore(A),E.forEach(W=>o._OrtReleaseTensor(W)),C.forEach(W=>o._OrtReleaseTensor(W)),I.forEach(W=>o._free(W)),w!==0&&o._OrtReleaseRunOptions(w),v.forEach(W=>o._free(W))}},vs=e=>{let t=Te(),n=Gt.get(e);if(!n)throw new Error("invalid session id");let r=n[0],i=t._OrtEndProfiling(r);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},$s=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),jt,Xe,zn,ir,ar,ei,no,ti,sn,ln,kh,q0,V0,H0,G0,j0,K0,X0,Y0=q(()=>{ot(),W0(),kn(),Jo(),jt=()=>!!Se.wasm.proxy&&typeof document<"u",zn=!1,ir=!1,ar=!1,ti=new Map,sn=(e,t)=>{let n=ti.get(e);n?n.push(t):ti.set(e,[t])},ln=()=>{if(zn||!ir||ar||!Xe)throw new Error("worker not ready")},kh=e=>{switch(e.data.type){case"init-wasm":zn=!1,e.data.err?(ar=!0,no[1](e.data.err)):(ir=!0,no[0]()),ei&&(URL.revokeObjectURL(ei),ei=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ti.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},q0=async()=>{if(!ir){if(zn)throw new Error("multiple calls to 'initWasm()' detected.");if(ar)throw new Error("previous call to 'initWasm()' failed.");if(zn=!0,jt())return new Promise((e,t)=>{Xe==null||Xe.terminate(),Ff().then(([n,r])=>{try{Xe=r,Xe.onerror=a=>t(a),Xe.onmessage=kh,no=[e,t];let i={type:"init-wasm",in:Se};!i.in.wasm.wasmPaths&&(n||$o)&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href}),Xe.postMessage(i),ei=n}catch(i){t(i)}},t)});try{await es(Se.wasm),await bs(Se),ir=!0}catch(e){throw ar=!0,e}finally{zn=!1}}},V0=async e=>{if(jt())return ln(),new Promise((t,n)=>{sn("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:Se}};Xe.postMessage(r)});await ys(Se,e)},H0=async e=>jt()?(ln(),new Promise((t,n)=>{sn("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Xe.postMessage(r,[e.buffer])})):bi(e),G0=async(e,t)=>{if(jt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return ln(),new Promise((n,r)=>{sn("create",[n,r]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Xe.postMessage(i,a)})}else return ws(e,t)},j0=async e=>{if(jt())return ln(),new Promise((t,n)=>{sn("release",[t,n]);let r={type:"release",in:e};Xe.postMessage(r)});_s(e)},K0=async(e,t,n,r,i,a)=>{if(jt()){if(n.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return ln(),new Promise((o,s)=>{sn("run",[o,s]);let l=n,u={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};Xe.postMessage(u,$s(l))})}else return xs(e,t,n,r,i,a)},X0=async e=>{if(jt())return ln(),new Promise((t,n)=>{sn("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Xe.postMessage(r)});vs(e)}}),ro,Th,Q0,Nx=q(()=>{ot(),Y0(),ae(),Zo(),Hf(),ro=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Th=e=>{switch(e[3]){case"cpu":return new bt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ns(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return bt.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case"ml-tensor":{let t=e[0];if(!rs(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return bt.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},Q0=class{async fetchModelAndCopyToWasmMemory(e){return H0(await is(e))}async loadModel(e,t){Ct();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await G0(n,t),yt()}async dispose(){return j0(this.sessionId)}async run(e,t,n){Ct();let r=[],i=[];Object.entries(e).forEach(p=>{let f=p[0],g=p[1],b=this.inputNames.indexOf(f);if(b===-1)throw new Error(`invalid input '${f}'`);r.push(g),i.push(b)});let a=[],o=[];Object.entries(t).forEach(p=>{let f=p[0],g=p[1],b=this.outputNames.indexOf(f);if(b===-1)throw new Error(`invalid output '${f}'`);a.push(g),o.push(b)});let s=r.map((p,f)=>ro(p,()=>`input "${this.inputNames[i[f]]}"`)),l=a.map((p,f)=>p?ro(p,()=>`output "${this.outputNames[o[f]]}"`):null),u=await K0(this.sessionId,i,s,o,l,n),c={};for(let p=0;p<u.length;p++)c[this.outputNames[o[p]]]=a[p]??Th(u[p]);return yt(),c}startProfiling(){}endProfiling(){X0(this.sessionId)}}}),Z0={};Fn(Z0,{OnnxruntimeWebAssemblyBackend:()=>Do,initializeFlags:()=>Bo,wasmBackend:()=>J0});var Bo,Do,J0,Px=q(()=>{ot(),Y0(),Nx(),Bo=()=>{(typeof Se.wasm.initTimeout!="number"||Se.wasm.initTimeout<0)&&(Se.wasm.initTimeout=0);let e=Se.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Se.wasm.simd=!1),typeof Se.wasm.proxy!="boolean"&&(Se.wasm.proxy=!1),typeof Se.wasm.trace!="boolean"&&(Se.wasm.trace=!1),typeof Se.wasm.numThreads!="number"||!Number.isInteger(Se.wasm.numThreads)||Se.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Se.wasm.numThreads=1;else{let t=typeof navigator>"u"?w1("node:os").cpus().length:navigator.hardwareConcurrency;Se.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Do=class{async init(e){Bo(),await q0(),await V0(e)}async createInferenceSessionHandler(e,t){let n=new Q0;return await n.loadModel(e,t),n}},J0=new Do});ot();ot();ot();var Rx="1.26.0";{let e=(Px(),vr(Z0)).wasmBackend;Nn("webgpu",e,5),Nn("webnn",e,5),Nn("cpu",e,10),Nn("wasm",e,10)}Object.defineProperty(Se.versions,"web",{value:Rx,enumerable:!0});/**
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
 */function st(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const hn=class hn{constructor(){Pe(this,"customModelPaths",new Map);Pe(this,"baseUrl","/models");Pe(this,"webnnEnabled",!1);Pe(this,"webnnDeviceType","gpu");Pe(this,"webnnPowerPreference","default");Pe(this,"webgpuEnabled",!1);Pe(this,"webgpuPowerPreference","default");Pe(this,"generalLoggingEnabled",!1);Pe(this,"performanceLoggingEnabled",!1);Pe(this,"onnxProfilingEnabled",!1);Pe(this,"sessionCacheBypass",!1);Pe(this,"modelCacheBypass",!1);this.initializeDefaultPaths()}static getInstance(){return hn.instance||(hn.instance=new hn),hn.instance}initializeDefaultPaths(){this.customModelPaths.clear()}setCustomModelPath(t,n){this.customModelPaths.set(t,n),this.generalLoggingEnabled&&console.log(`Set custom model path for ${t}: ${n}`)}getCustomModelPath(t){return this.customModelPaths.get(t)}getAllModelPaths(){return new Map(this.customModelPaths)}hasCustomPath(t){const n=this.customModelPaths.get(t);return n!==void 0&&n!==""}resetToDefaults(){this.baseUrl="/models",this.customModelPaths.clear(),this.initializeDefaultPaths(),this.generalLoggingEnabled&&console.log("Reset all model paths to defaults")}removeCustomPath(t){this.customModelPaths.has(t)&&(this.customModelPaths.delete(t),this.generalLoggingEnabled&&console.log(`Removed custom path for ${t}`))}getAvailableModels(){return["u2net","u2netp","u2net_human_seg","u2net_cloth_seg","isnet-general-use","isnet-anime","silueta","u2net_custom"]}setBaseUrl(t){this.baseUrl=t,this.generalLoggingEnabled&&console.log(`Set base URL for models: ${t}`),this.initializeDefaultPaths()}getBaseUrl(){return this.baseUrl}enableWebNN(t){this.webnnEnabled=t,this.generalLoggingEnabled&&console.log(`WebNN support ${t?"enabled":"disabled"} globally`)}setWebNNDeviceType(t){this.webnnDeviceType=t,this.generalLoggingEnabled&&console.log(`WebNN device type set to: ${t}`)}setWebNNPowerPreference(t){this.webnnPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebNN power preference set to: ${t}`)}isWebNNEnabled(){return this.webnnEnabled}getWebNNDeviceType(){return this.webnnDeviceType}getWebNNPowerPreference(){return this.webnnPowerPreference}getWebNNConfig(){return{enabled:this.webnnEnabled,deviceType:this.webnnDeviceType,powerPreference:this.webnnPowerPreference}}resetWebNNSettings(){this.webnnEnabled=!1,this.webnnDeviceType="gpu",this.webnnPowerPreference="default",this.generalLoggingEnabled&&console.log("WebNN settings reset to defaults")}enableWebGPU(t){this.webgpuEnabled=t,this.generalLoggingEnabled&&console.log(`WebGPU support ${t?"enabled":"disabled"} globally`)}setWebGPUPowerPreference(t){this.webgpuPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebGPU power preference set to: ${t}`)}isWebGPUEnabled(){return this.webgpuEnabled}getWebGPUPowerPreference(){return this.webgpuPowerPreference}getWebGPUConfig(){return{enabled:this.webgpuEnabled,powerPreference:this.webgpuPowerPreference}}resetWebGPUSettings(){this.webgpuEnabled=!1,this.webgpuPowerPreference="default",this.generalLoggingEnabled&&console.log("WebGPU settings reset to defaults")}enableGeneralLogging(t){this.generalLoggingEnabled=t,this.generalLoggingEnabled&&console.log(`General logging ${t?"enabled":"disabled"}`)}enablePerformanceLogging(t){this.performanceLoggingEnabled=t,this.performanceLoggingEnabled&&console.log(`Performance logging ${t?"enabled":"disabled"}`)}isGeneralLoggingEnabled(){return this.generalLoggingEnabled}isPerformanceLoggingEnabled(){return this.performanceLoggingEnabled}enableONNXProfiling(t){this.onnxProfilingEnabled=t,this.onnxProfilingEnabled&&console.log(`ONNX profiling ${t?"enabled":"disabled"}`)}isONNXProfilingEnabled(){return this.onnxProfilingEnabled}getLoggingConfig(){return{generalLogging:this.generalLoggingEnabled,performanceLogging:this.performanceLoggingEnabled,onnxProfiling:this.onnxProfilingEnabled}}resetLoggingSettings(){this.generalLoggingEnabled=!1,this.performanceLoggingEnabled=!1,this.onnxProfilingEnabled=!1,this.generalLoggingEnabled&&console.log("Logging settings reset to defaults")}setSessionCacheBypass(t){this.sessionCacheBypass=t,this.generalLoggingEnabled&&console.log(`Session cache bypass ${t?"enabled":"disabled"} globally`)}setModelCacheBypass(t){this.modelCacheBypass=t,this.generalLoggingEnabled&&console.log(`Model cache bypass ${t?"enabled":"disabled"} globally`)}isSessionCacheBypassEnabled(){return this.sessionCacheBypass}isModelCacheBypassEnabled(){return this.modelCacheBypass}getCacheBypassConfig(){return{sessionCacheBypass:this.sessionCacheBypass,modelCacheBypass:this.modelCacheBypass}}resetCacheBypassSettings(){this.sessionCacheBypass=!1,this.modelCacheBypass=!1,this.generalLoggingEnabled&&console.log("Cache bypass settings reset to defaults")}};Pe(hn,"instance");let Lo=hn;const Me=Lo.getInstance();function be(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function Ss(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function ue(...e){Me.isPerformanceLoggingEnabled()&&console.log(...e)}function We(...e){console.warn(...e)}function Wn(...e){console.error(...e)}function Dt(e){return function(t,n,r){const i=r.value,a=n;return r.value=async function(...o){const s=performance.now();ue(`[${a}] Starting execution...`);try{const l=await i.apply(this,o),c=performance.now()-s;return ue(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-s;throw Wn(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function ks(e){return function(t,n,r){const i=r.value,a=n;return r.value=function(...o){const s=performance.now();ue(`[${a}] Starting execution...`);try{const l=i.apply(this,o),c=performance.now()-s;return ue(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-s;throw Wn(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function io(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Failed to get context for canvas");return n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",e instanceof HTMLImageElement?(t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0)):(t.width=e.width,t.height=e.height,n.putImageData(e,0,0)),t}function Ox(e){const t=performance.now();return be(`[fileToImage] Converting ${e instanceof File?e.name:"blob"} (${(e.size/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Image,a=URL.createObjectURL(e);i.onload=()=>{const o=performance.now()-t;ue(`[fileToImage] Image loaded: ${o.toFixed(2)}ms (${i.naturalWidth}x${i.naturalHeight})`),URL.revokeObjectURL(a),n(i)},i.onerror=o=>{const s=performance.now()-t;Wn(`[fileToImage] Image load failed: ${s.toFixed(2)}ms`,o),URL.revokeObjectURL(a),r(o)},i.src=a})}function Bx(e){const t=performance.now();return be(`[arrayBufferToImage] Converting buffer (${(e.byteLength/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Blob([e]),a=new Image,o=URL.createObjectURL(i);a.onload=()=>{const s=performance.now()-t;ue(`[arrayBufferToImage] Image loaded: ${s.toFixed(2)}ms (${a.naturalWidth}x${a.naturalHeight})`),URL.revokeObjectURL(o),n(a)},a.onerror=s=>{const l=performance.now()-t;Wn(`[arrayBufferToImage] Image load failed: ${l.toFixed(2)}ms`,s),URL.revokeObjectURL(o),r(s)},a.src=o})}function Ch(e,t="image/png"){const n=performance.now();return be(`[canvasToBlob] Converting ${e.width}x${e.height} canvas to ${t}...`),new Promise((r,i)=>{e.toBlob(a=>{const o=performance.now()-n;a?(ue(`[canvasToBlob] Conversion complete: ${o.toFixed(2)}ms (${(a.size/1024).toFixed(1)}KB)`),r(a)):(Wn(`[canvasToBlob] Conversion failed: ${o.toFixed(2)}ms`),i(new Error("Failed to convert canvas to blob")))},t)})}function Dx(e,t,n="input.1"){const r=performance.now(),i=document.createElement("canvas");i.width=t.size[0],i.height=t.size[1];const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for temp canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(e,0,0,t.size[0],t.size[1]);const o=performance.now(),l=a.getImageData(0,0,t.size[0],t.size[1]).data,u=t.size[0],c=t.size[1];let p=0;for(let v=0;v<l.length;v+=4){const E=l[v]/255,C=l[v+1]/255,I=l[v+2]/255;p=Math.max(p,E,C,I)}const f=Math.max(p,1e-6),g=performance.now(),b=new Float32Array(3*c*u);for(let v=0;v<c;v++)for(let E=0;E<u;E++){const C=(v*u+E)*4,I=l[C]/255,M=l[C+1]/255,A=l[C+2]/255,$=I/f,O=M/f,L=A/f,H=($-t.mean[0])/t.std[0],K=(O-t.mean[1])/t.std[1],X=(L-t.mean[2])/t.std[2];b[v*u+E]=H,b[c*u+v*u+E]=K,b[2*c*u+v*u+E]=X}const x=performance.now(),T=new bt("float32",b,[1,3,c,u]),w=performance.now();return ue(`[normalizeImage] Performance:
    - Resize: ${(o-r).toFixed(2)}ms
    - Max find: ${(g-o).toFixed(2)}ms
    - Normalize: ${(x-g).toFixed(2)}ms
    - Tensor: ${(w-x).toFixed(2)}ms
    - Total: ${(w-r).toFixed(2)}ms
    - Max value: ${p.toFixed(6)}, Divisor: ${f.toFixed(6)}`),{[n]:T}}function Lx(e,t=[1,1,320,320]){const[,,n,r]=t,i=performance.now(),a=e.slice(0,n*r);e.length!==n*r&&We("[normalizeMask] Mask length does not match output shape",{maskLength:e.length,outputShape:`${n}x${r}=${n*r}`});const o=performance.now()-i;ue(`[processModelOutput] Data extraction: ${o.toFixed(2)}ms`);const s=performance.now();let l=a[0],u=a[0];for(let b=1;b<a.length;b++)a[b]<l&&(l=a[b]),a[b]>u&&(u=a[b]);const c=performance.now()-s;ue(`[processModelOutput] Min/max calculation: ${c.toFixed(2)}ms (min=${l.toFixed(6)}, max=${u.toFixed(6)})`);const p=performance.now(),f=new Float32Array(a.length);for(let b=0;b<a.length;b++)f[b]=(a[b]-l)/(u-l);const g=performance.now()-p;return ue(`[processModelOutput] Normalization: ${g.toFixed(2)}ms`),f}function Ux(e,{width:t,height:n}){const r=performance.now(),i=document.createElement("canvas");i.width=t,i.height=n;const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for mask canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const o=a.createImageData(t,n);for(let l=0;l<e.length;l++){const u=Math.round(e[l]*255),c=l*4;o.data[c]=u,o.data[c+1]=u,o.data[c+2]=u,o.data[c+3]=255}a.putImageData(o,0,0);const s=performance.now()-r;return ue(`[processModelOutput] Canvas creation: ${s.toFixed(2)}ms`),i}function Fx(e,t){const n=performance.now(),{width:r,height:i}=e,a=document.createElement("canvas");a.width=t.width,a.height=t.height;const o=a.getContext("2d");if(!o)throw new Error("Failed to get context for resized canvas");o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(e,0,0,t.width,t.height);const s=performance.now()-n;return ue(`[processModelOutput] Resize: ${s.toFixed(2)}ms (${r}x${i} → ${t.width}x${t.height})`),a}function eb(e,t,n=[1,1,320,320]){const r=performance.now();be(`[processModelOutput] Processing output (${e.length} values) for ${t.width}x${t.height} image...`);const i=Lx(e,n),[,,a,o]=n,s=Ux(i,{width:o,height:a}),l=Fx(s,t),u=performance.now()-r;return ue(`[processModelOutput] Total processing: ${u.toFixed(2)}ms`),l}function Wx(e,t){const n=performance.now();be(`[naiveCutout] Creating cutout for ${e.width}x${e.height} image...`);const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d");if(!i)throw new Error("Failed to get context for result canvas");const a=performance.now();i.drawImage(e,0,0);const o=performance.now()-a;ue(`[naiveCutout] Image draw: ${o.toFixed(2)}ms`);const s=performance.now(),l=i.getImageData(0,0,r.width,r.height),u=t.getContext("2d");if(!u)throw new Error("Failed to get context for mask canvas");const c=u.getImageData(0,0,t.width,t.height),p=performance.now()-s;ue(`[naiveCutout] Data extraction: ${p.toFixed(2)}ms`);const f=performance.now();for(let w=0;w<l.data.length;w+=4){const v=w,E=c.data[v];l.data[w+3]=E}const g=performance.now()-f;ue(`[naiveCutout] Mask application: ${g.toFixed(2)}ms`);const b=performance.now();i.putImageData(l,0,0);const x=performance.now()-b;ue(`[naiveCutout] Put image data: ${x.toFixed(2)}ms`);const T=performance.now()-n;return ue(`[naiveCutout] Total cutout creation: ${T.toFixed(2)}ms`),r}function qx(e,t){const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");if(!r)throw new Error("Failed to get context for result canvas");return r.fillStyle=`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]/255})`,r.fillRect(0,0,n.width,n.height),r.drawImage(e,0,0),n}function Vx(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");return n.filter="blur(2px)",n.drawImage(e,0,0),n.filter="none",t}function Hx(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");n.drawImage(e,0,0);const r=n.getImageData(0,0,t.width,t.height),i=r.data;for(let a=0;a<i.length;a+=4){const o=i[a];i[a]=o,i[a+1]=o,i[a+2]=o,i[a+3]=255}return n.putImageData(r,0,0),t}const Gx={"u2net.onnx":"a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456","u2netp.onnx":"b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567","u2net_human_seg.onnx":"c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678","u2net_cloth_seg.onnx":"d4e5f6789012345678901234567890abcdef1234567890abcdef123456789","silueta.onnx":"75da6c8d2f8096ec743d071951be73b4a8bc7b3e51d9a6625d63644f90ffeedb"};async function jx(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function Kx(e,t){try{const n=Gx[e];if(!n)return console.warn(`No hash available for model: ${e}`),!0;const r=await jx(t),i=r===n;return i||(console.error(`Model integrity check failed for ${e}`),console.error(`Expected: ${n}`),console.error(`Actual: ${r}`)),i}catch(n){return console.error(`Error verifying model integrity for ${e}:`,n),!1}}function Xx(e,t){const r=t.byteLength/(1024*1024),a={"u2net.onnx":{min:170,max:180},"u2netp.onnx":{min:4,max:5},"u2net_human_seg.onnx":{min:170,max:180},"u2net_cloth_seg.onnx":{min:170,max:180},"silueta.onnx":{min:40,max:50}}[e];if(!a)return console.warn(`No size validation available for model: ${e}`),!0;const o=r>=a.min&&r<=a.max;return o||(console.error(`Model size validation failed for ${e}`),console.error(`Expected: ${a.min}-${a.max}MB, got: ${r.toFixed(2)}MB`)),o}async function Eh(e,t){return!(!Xx(e,t)||!await Kx(e,t))}function tb(){try{return typeof navigator<"u"&&"gpu"in navigator&&typeof navigator.gpu=="object"&&navigator.gpu!==null}catch(e){return Ss("WebGPU availability check failed:",e),!1}}function Yx(e){return e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(We(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}function nb(){try{return typeof navigator<"u"&&"ml"in navigator&&typeof navigator.ml=="object"&&navigator.ml!==null}catch(e){return Ss("WebNN availability check failed:",e),!1}}function Qx(e={}){const t=performance.now();be("[getExecutionProviders] Determining execution providers...");const n=[];if(be("[getExecutionProviders] Input options:",{executionProviders:e.executionProviders,preferWebNN:e.preferWebNN,webnnDeviceType:e.webnnDeviceType,webnnPowerPreference:e.webnnPowerPreference,preferWebGPU:e.preferWebGPU,webgpuPowerPreference:e.webgpuPowerPreference}),e.executionProviders&&e.executionProviders.length>0){const f=performance.now()-t;return ue(`[getExecutionProviders] Using explicit providers: ${f.toFixed(2)}ms`),be(`[getExecutionProviders] Using explicit execution providers: ${e.executionProviders.join(", ")}`),[...e.executionProviders]}const r=performance.now(),i=e.preferWebNN??!1,a=nb(),o=performance.now()-r;ue(`[getExecutionProviders] WebNN preference check: ${o.toFixed(2)}ms`),be(`[getExecutionProviders] WebNN status: preferWebNN=${i}, available=${a}`),i&&a?(n.push("webnn"),be("[getExecutionProviders] WebNN execution provider added to preference list")):i&&!a&&We("[getExecutionProviders] WebNN was preferred but is not available in this browser");const s=performance.now(),l=e.preferWebGPU??!1,u=tb(),c=performance.now()-s;ue(`[getExecutionProviders] WebGPU preference check: ${c.toFixed(2)}ms`),be(`[getExecutionProviders] WebGPU status: preferWebGPU=${l}, available=${u}`),l&&u?(n.push("webgpu"),be("[getExecutionProviders] WebGPU execution provider added to preference list")):l&&!u&&We("[getExecutionProviders] WebGPU was preferred but is not available in this browser"),n.push("webgl","cpu");const p=performance.now()-t;return ue(`[getExecutionProviders] Provider selection complete: ${p.toFixed(2)}ms (${n.join(", ")})`),n}function Zx(e){return e!=null&&e.webnnDeviceType&&!["cpu","gpu","npu"].includes(e.webnnDeviceType)?(We(`Invalid WebNN device type: ${e.webnnDeviceType}`),!1):e!=null&&e.webnnPowerPreference&&!["default","low-power","high-performance"].includes(e.webnnPowerPreference)?(We(`Invalid WebNN power preference: ${e.webnnPowerPreference}`),!1):e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(We(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}const Kt={simd:!0,proxy:!1,numThreads:4};function rb(e=Kt){Se.wasm.simd=e.simd??Kt.simd,Se.wasm.proxy=e.proxy??Kt.proxy,Se.wasm.numThreads=e.numThreads??Kt.numThreads}rb();class Oe{constructor(t,n={}){Pe(this,"modelName");Pe(this,"session",null);Pe(this,"modelData",null);Pe(this,"options");this.modelName=t,this.options={...Kt,...n},this.options.simd=this.options.simd??Kt.simd,this.options.proxy=this.options.proxy??Kt.proxy,this.options.numThreads=this.options.numThreads??Kt.numThreads,rb(this.options)}emitProgress(t,n,r){this.options.onProgress&&this.options.onProgress({step:t,progress:n,message:r})}async initialize(){if(be(`[${this.modelName}] Starting session initialization...`),this.emitProgress("initializing",0,"Starting session initialization..."),this.session){be(`[${this.modelName}] Session already initialized, skipping`),this.emitProgress("initializing",100,"Session already initialized, skipping");return}this.emitProgress("initializing",20,"Validating configuration..."),await this.validateConfiguration(),this.emitProgress("initializing",50,"Downloading model..."),this.modelData=await this.downloadModel(),this.emitProgress("initializing",60,"Setting up execution providers...");const t=await this.setupExecutionProviders();this.emitProgress("initializing",80,"Creating session..."),await this.createSession(t),this.emitProgress("initializing",100,"Session initialized successfully")}async validateConfiguration(){Zx(this.options)||We("Invalid WebNN configuration, falling back to default providers"),Yx(this.options)||We("Invalid WebGPU configuration, falling back to default providers")}async setupExecutionProviders(){const t=Qx(this.options);if(this.options.preferWebNN){const n=nb();be(`WebNN requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}if(this.options.preferWebGPU){const n=tb();be(`WebGPU requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}return t}async createSession(t){let n=!1,r=null;if(!this.modelData)throw new Error("Model data not found");for(const i of t)try{be(`[${this.modelName}] Attempting to create session with provider: ${i}`),this.session=await Qo.create(this.modelData,{executionProviders:[i],enableProfiling:Me.isONNXProfilingEnabled()}),ue(`[${this.modelName}] Successfully created session with provider: ${i}`),Me.isONNXProfilingEnabled()&&be(`[${this.modelName}] ONNX profiling enabled - data will be logged after each inference`),n=!0;break}catch(a){We(`[${this.modelName}] Failed to create session with provider '${i}':`,a),r=a;continue}if(!n)throw new Error(`Failed to create ONNX session with any provider. Last error: ${(r==null?void 0:r.message)||"Unknown error"}`)}async downloadModel(){var n;if(be(`[${this.modelName}] Starting model download...`),this.options.bypassModelCache)be(`[${this.modelName}] Model cache bypassed, forcing fresh download`);else try{this.emitProgress("downloading",10,"Checking cache...");const r=await this.getCachedModel();if(r)return be(`[${this.modelName}] Using cached model: ${this.modelName}`),this.emitProgress("downloading",100,"Using cached model"),r}catch(r){We(`[${this.modelName}] IndexedDB cache unavailable, falling back to direct download:`,r)}be(`[${this.modelName}] Downloading model: ${this.modelName}`);const t=this.getModelUrl();this.emitProgress("downloading",20,"Starting download...");try{const r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const i=r.headers.get("content-length"),a=i?parseInt(i,10):0;if(be(`[${this.modelName}] Model size: ${(a/(1024*1024)).toFixed(2)}MB`),a>0){this.emitProgress("downloading",30,"Downloading model...");const l=(n=r.body)==null?void 0:n.getReader();if(l){const u=[];let c=0,p=!1;for(;!p;){const x=await l.read();if(p=x.done,p||!x.value)break;const T=x.value;u.push(T),c+=T.length;const w=30+Math.round(c/a*60);this.emitProgress("downloading",w,`Downloading model... ${Math.round(c/a*100)}%`)}const f=new Uint8Array(c);let g=0;for(const x of u)f.set(x,g),g+=x.length;if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await Eh(this.modelName,f.buffer))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(f.buffer)}catch(x){We(`[${this.modelName}] Failed to cache model, but download succeeded:`,x)}return this.emitProgress("downloading",100,"Model ready"),f.buffer}}this.emitProgress("downloading",50,"Downloading model...");const o=await r.arrayBuffer();if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await Eh(this.modelName,o))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(o)}catch(l){We(`[${this.modelName}] Failed to cache model, but download succeeded:`,l)}return this.emitProgress("downloading",100,"Model ready"),o}catch(r){throw Wn(`[${this.modelName}] Model download failed:`,r),new Error(`Failed to download model ${this.modelName}: ${r}`)}}async getCachedModel(){return new Promise((t,n)=>{const r=indexedDB.open("rembg-models",2);r.onerror=()=>n(r.error),r.onsuccess=()=>{const s=r.result.transaction(["models"],"readonly").objectStore("models").get(this.modelName);s.onsuccess=()=>{const l=s.result;if(!l){t(null);return}const u=this.getModelVersion(),c=l.version||"1.0.0";if(c!==u){Ss(`Model version mismatch for ${this.modelName}: cached=${c}, current=${u}`),t(null);return}t(l.data||null)},s.onerror=()=>n(s.error)},r.onupgradeneeded=()=>{const i=r.result;i.objectStoreNames.contains("models")||i.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}async cacheModel(t){return new Promise((n,r)=>{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").put({name:this.modelName,data:t,timestamp:Date.now(),version:this.getModelVersion()});l.onsuccess=()=>n(),l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}getModelUrl(){const t=Me.getCustomModelPath(this.modelName);return t&&t!==""?(be(`Using custom model path for ${this.modelName}: ${t}`),t):this.getDefaultModelUrl()}getModelVersion(){return"1.0.0"}prepareInput(t){return Dx(t,this.getNormalizationParams(),this.getInputName())}async runInference(t){if(!this.session)throw new Error("Session not initialized");const n=await this.session.run(t);if(Me.isONNXProfilingEnabled())try{this.session.endProfiling(),be(`[${this.modelName}] ONNX profiling data outputted to console`)}catch(r){We(`[${this.modelName}] Failed to collect profiling data:`,r)}return n}async predict(t){if(be(`[${this.modelName}] Starting prediction for ${t.width}x${t.height} image...`),this.session||await this.initialize(),!this.session)throw new Error("Session not initialized");const n=this.prepareInput(t),r=await this.runInference(n),i=this.outputToMaskArray(r);return be(`[${this.modelName}] Predicted ${i.length} masks`),i.map(a=>this.maskArrayToMaskCanvas(a,{width:t.width,height:t.height}))}outputToMaskArray(t){return[t[Object.keys(t)[0]].data]}maskArrayToMaskCanvas(t,n){return eb(t,n,this.getOutputShape())}static getName(){throw new Error("getName() must be implemented by subclass")}getName(){return this.modelName}getOptions(){return{...this.options}}async dispose(){this.session&&(await this.session.release(),this.session=null),this.modelData=null}static async clearCache(){return new Promise((t,n)=>{try{const r=indexedDB.deleteDatabase("rembg-models");r.onsuccess=()=>{be("Model cache cleared successfully"),t()},r.onerror=()=>{We("Failed to clear model cache:",r.error),n(r.error)}}catch(r){We("IndexedDB not available for cache clearing:",r),n(r)}})}static async clearModelCache(t){return new Promise((n,r)=>{try{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").delete(t);l.onsuccess=()=>{be(`Model cache cleared for ${t}`),n()},l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}}catch(i){We("IndexedDB not available for cache clearing:",i),r(i)}})}}st([Dt()],Oe.prototype,"initialize",null);st([Dt()],Oe.prototype,"validateConfiguration",null);st([Dt()],Oe.prototype,"setupExecutionProviders",null);st([Dt()],Oe.prototype,"createSession",null);st([Dt()],Oe.prototype,"downloadModel",null);st([Dt()],Oe.prototype,"getCachedModel",null);st([Dt()],Oe.prototype,"cacheModel",null);st([ks()],Oe.prototype,"prepareInput",null);st([Dt()],Oe.prototype,"runInference",null);st([Dt()],Oe.prototype,"predict",null);st([ks()],Oe.prototype,"outputToMaskArray",null);st([ks()],Oe.prototype,"maskArrayToMaskCanvas",null);class Jx extends Oe{constructor(t){super("u2net",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net"}}class e2 extends Oe{constructor(t){super("u2netp",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2netp.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2netp"}}class t2 extends Oe{constructor(t){super("u2net_human_seg",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_human_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net_human_seg"}}class n2 extends Oe{constructor(n){super("u2net_cloth_seg",n);Pe(this,"clothCategory","combined")}setClothCategory(n){this.clothCategory=n}getClothCategory(){return this.clothCategory}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_cloth_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[768,768]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,3,768,768]}outputToMaskArray(n){const r=n[Object.keys(n)[0]],i=r.data,[,a,o,s]=r.dims,l=this.logSoftmax(i,a,o*s),u=this.argmax(l,a,o*s),c=[];for(let p=1;p<=3;p++){const f=new Float32Array(o*s);for(let g=0;g<u.length;g++)f[g]=u[g]===p?255.5:0;c.push(f)}return c}maskArrayToMaskCanvas(n,r){return eb(n,r,this.getOutputShape())}logSoftmax(n,r,i){const a=new Float32Array(n.length);for(let o=0;o<i;o++){let s=n[o];for(let c=1;c<r;c++)s=Math.max(s,n[c*i+o]);let l=0;for(let c=0;c<r;c++)l+=Math.exp(n[c*i+o]-s);const u=Math.log(l)+s;for(let c=0;c<r;c++)a[c*i+o]=n[c*i+o]-u}return a}argmax(n,r,i){const a=new Uint8Array(i);for(let o=0;o<i;o++){let s=n[o],l=0;for(let u=1;u<r;u++){const c=n[u*i+o];c>s&&(s=c,l=u)}a[o]=l}return a}static getName(){return"u2net_cloth_seg"}}class r2 extends Oe{constructor(t){super("isnet-general-use",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-general-use.onnx`}getNormalizationParams(){return{mean:[.5,.5,.5],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-general-use"}}class i2 extends Oe{constructor(t){super("isnet-anime",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-anime.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-anime"}}class a2 extends Oe{constructor(t){super("silueta",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/silueta.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"silueta"}}const Ot=new Map;Ot.set("u2net",Jx);Ot.set("u2netp",e2);Ot.set("u2net_human_seg",t2);Ot.set("u2net_cloth_seg",n2);Ot.set("isnet-general-use",r2);Ot.set("isnet-anime",i2);Ot.set("silueta",a2);const fn=new Map,Xt=[],o2={maxSessions:5};function s2(e,t){var a,o;const n=[];e.preferWebNN!==t.preferWebNN&&n.push(`preferWebNN: ${e.preferWebNN} vs ${t.preferWebNN}`),e.webnnDeviceType!==t.webnnDeviceType&&n.push(`webnnDeviceType: ${e.webnnDeviceType} vs ${t.webnnDeviceType}`),e.webnnPowerPreference!==t.webnnPowerPreference&&n.push(`webnnPowerPreference: ${e.webnnPowerPreference} vs ${t.webnnPowerPreference}`),e.preferWebGPU!==t.preferWebGPU&&n.push(`preferWebGPU: ${e.preferWebGPU} vs ${t.preferWebGPU}`),e.webgpuPowerPreference!==t.webgpuPowerPreference&&n.push(`webgpuPowerPreference: ${e.webgpuPowerPreference} vs ${t.webgpuPowerPreference}`),e.simd!==t.simd&&n.push(`simd: ${e.simd} vs ${t.simd}`),e.proxy!==t.proxy&&n.push(`proxy: ${e.proxy} vs ${t.proxy}`),e.numThreads!==t.numThreads&&n.push(`numThreads: ${e.numThreads} vs ${t.numThreads}`);const r=JSON.stringify((a=e.executionProviders)==null?void 0:a.sort()),i=JSON.stringify((o=t.executionProviders)==null?void 0:o.sort());return r!==i&&n.push(`executionProviders: ${r} vs ${i}`),n.length>0?(be(`[areSessionOptionsEqual] Settings mismatch detected: ${n.join(", ")}`),!1):!0}function Ih(e){const t=Xt.indexOf(e);t>-1&&Xt.splice(t,1),Xt.push(e)}async function l2(){if(Xt.length===0)return;const e=Xt[0],t=fn.get(e);t&&(await t.dispose(),fn.delete(e),Xt.shift())}async function u2(){for(;fn.size>=o2.maxSessions;)await l2()}async function ib(e="u2net",t,n){const r=performance.now();be(`[newSession] Creating session for model: ${e}`);const i=performance.now(),a={...n,preferWebNN:Me.isWebNNEnabled(),webnnDeviceType:Me.getWebNNDeviceType(),webnnPowerPreference:Me.getWebNNPowerPreference(),preferWebGPU:Me.isWebGPUEnabled(),webgpuPowerPreference:Me.getWebGPUPowerPreference(),bypassSessionCache:Me.isSessionCacheBypassEnabled(),bypassModelCache:Me.isModelCacheBypassEnabled()},o=performance.now()-i;if(ue(`[newSession] Options merge: ${o.toFixed(2)}ms`),e==="u2net_custom")throw new Error("u2net_custom requires modelPath in config");const s=performance.now(),l=Ot.get(e),u=performance.now()-s;if(ue(`[newSession] Registry lookup: ${u.toFixed(2)}ms`),!l){const v=Array.from(Ot.keys()).join(", ");throw new Error(`No session class found for model '${e}'. Available models: ${v}`)}const c=performance.now();if(!a.bypassSessionCache&&fn.has(e)){const v=fn.get(e),E=v.getOptions();if(s2(a,E)){Ih(e);const C=performance.now()-c,I=performance.now()-r;return ue(`[newSession] Cache hit for ${e}: ${C.toFixed(2)}ms (total: ${I.toFixed(2)}ms)`),v}else{be(`[newSession] Settings mismatch for ${e}, evicting cached session`),await v.dispose(),fn.delete(e);const C=Xt.indexOf(e);C>-1&&Xt.splice(C,1)}}else a.bypassSessionCache&&be(`[newSession] Session cache bypassed for ${e}`);const p=performance.now()-c;ue(`[newSession] Cache miss for ${e}: ${p.toFixed(2)}ms`);const f=performance.now(),g=new l(a),b=performance.now()-f;ue(`[newSession] Session creation: ${b.toFixed(2)}ms`);const x=performance.now();fn.set(e,g),Ih(e);const T=performance.now()-x;ue(`[newSession] Session caching: ${T.toFixed(2)}ms`),u2().catch(console.warn);const w=performance.now()-r;return ue(`[newSession] Total session creation: ${w.toFixed(2)}ms`),g}async function d2(e,t={}){const n=performance.now();be("[remove] Starting background removal process...");const r=(i,a,o)=>{t.onProgress&&t.onProgress({step:i,progress:a,message:o})};try{r("downloading",0,"Initializing...");const i=performance.now();let a;if(e instanceof HTMLCanvasElement)a=e,r("downloading",20,"Input ready"),be("[remove] Input is already a canvas");else if(e instanceof HTMLImageElement){const I=performance.now();a=io(e);const M=performance.now()-I;ue(`[remove] Image to canvas conversion: ${M.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof File||e instanceof Blob){r("downloading",10,"Loading image...");const I=performance.now(),M=await Ox(e),A=performance.now()-I;ue(`[remove] File to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=io(M);const O=performance.now()-$;ue(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof ArrayBuffer){r("downloading",10,"Loading image...");const I=performance.now(),M=await Bx(e),A=performance.now()-I;ue(`[remove] ArrayBuffer to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=io(M);const O=performance.now()-$;ue(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else throw new Error("Unsupported input type. Supported types: File, Blob, ArrayBuffer, HTMLImageElement, HTMLCanvasElement");const o=performance.now()-i;ue(`[remove] Total input processing: ${o.toFixed(2)}ms (${a.width}x${a.height})`);const s=performance.now();r("downloading",30,"Preparing model...");const l=t.session||await ib("u2net"),u=performance.now()-s;ue(`[remove] Session creation: ${u.toFixed(2)}ms`);const c=performance.now();r("processing",40,"Running AI model...");const p=await l.predict(a),f=performance.now()-c;if(ue(`[remove] Model prediction: ${f.toFixed(2)}ms`),p.length===0)throw new Error("No masks generated from model");r("processing",70,"Processing mask...");let g=p[0];if(t.postProcessMask){const I=performance.now();r("postprocessing",80,"Applying post-processing..."),g=Vx(g);const M=performance.now()-I;ue(`[remove] Post-processing: ${M.toFixed(2)}ms`)}if(t.onlyMask){const I=performance.now();r("postprocessing",90,"Creating mask output...");const M=Hx(g),A=performance.now()-I;ue(`[remove] Mask-only creation: ${A.toFixed(2)}ms`);const $=performance.now(),O=await Ch(M,"image/png"),L=performance.now()-$;ue(`[remove] Canvas to blob conversion: ${L.toFixed(2)}ms`),r("complete",100,"Complete");const H=performance.now()-n;return ue(`[remove] Total processing time (mask-only): ${H.toFixed(2)}ms`),O}const b=performance.now();r("postprocessing",85,"Creating cutout...");let x=Wx(a,g);const T=performance.now()-b;if(ue(`[remove] Cutout creation: ${T.toFixed(2)}ms`),t.bgcolor){const I=performance.now();r("postprocessing",90,"Applying background color..."),x=qx(x,t.bgcolor);const M=performance.now()-I;ue(`[remove] Background color application: ${M.toFixed(2)}ms`)}const w=performance.now();r("postprocessing",95,"Finalizing output...");const v=await Ch(x,"image/png"),E=performance.now()-w;ue(`[remove] Final canvas to blob conversion: ${E.toFixed(2)}ms`),r("complete",100,"Complete");const C=performance.now()-n;return ue(`[remove] Total processing time: ${C.toFixed(2)}ms`),v}catch(i){const a=performance.now()-n;throw console.error(`[remove] Processing failed (${a.toFixed(2)}ms):`,i),t.onProgress&&t.onProgress({step:"complete",progress:0,message:`Error: ${i instanceof Error?i.message:"Unknown error"}`}),i}}let ao=null,zh=!1,At=null,c2=0;const pr=new Map;function Pt(e=80){return new Promise(t=>{if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(()=>t(),{timeout:e});return}requestAnimationFrame(()=>t())})}function Mh(e,t){if(!e.length)return 0;const n=Math.min(e.length-1,Math.max(0,Math.round((e.length-1)*t)));return e[n]}function oo(e){const t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function p2(e,t,n){const r=oo(e),i=oo(t),a=oo(n);let o=(r*.4124564+i*.3575761+a*.1804375)/.95047,s=r*.2126729+i*.7151522+a*.072175,l=(r*.0193339+i*.119192+a*.9503041)/1.08883;const u=c=>c>.008856?Math.cbrt(c):7.787*c+16/116;return o=u(o),s=u(s),l=u(l),{l:se((116*s-16)/100),a:500*(o-s)/127,b:200*(s-l)/127}}async function h2(e,t=640){var l;const n=await createImageBitmap(e),r=Math.min(1,t/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r)),o=document.createElement("canvas");o.width=i,o.height=a;const s=o.getContext("2d",{willReadFrequently:!0});return s.fillStyle="#000",s.fillRect(0,0,i,a),s.drawImage(n,0,0,i,a),(l=n.close)==null||l.call(n),s.getImageData(0,0,i,a)}function f2(e,t=768){const n=e.naturalWidth||e.width,r=e.naturalHeight||e.height,i=Math.min(1,t/Math.max(n,r)),a=Math.max(1,Math.round(n*i)),o=Math.max(1,Math.round(r*i)),s=document.createElement("canvas");s.width=a,s.height=o;const l=s.getContext("2d",{willReadFrequently:!0});return l.fillStyle="#000",l.fillRect(0,0,a,o),l.drawImage(e,0,0,a,o),l.getImageData(0,0,a,o)}function m2(){return At||(At=new Worker(new URL("/assets/fingerprint-worker-C74g51lu.js",import.meta.url),{type:"classic"}),At.onmessage=e=>{const{id:t,ok:n,raw:r,error:i}=e.data||{},a=pr.get(t);a&&(pr.delete(t),n?a.resolve(r):a.reject(new Error(i||"Worker fingerprint failed")))},At.onerror=e=>{for(const[,t]of pr)t.reject(new Error(e.message||"Worker fingerprint failed"));pr.clear(),At==null||At.terminate(),At=null}),At}function g2(e,t){const n=m2(),r=++c2,i=new Uint8Array(e.data),a=new Uint8Array(t);return new Promise((o,s)=>{pr.set(r,{resolve:o,reject:s}),n.postMessage({id:r,payload:{rgba:i.buffer,mask:a.buffer,width:e.width,height:e.height,contourPoints:m.contourPoints||256,runtime:{pyodideIndex:mf,pyodideScript:l1,pythonCode:u1}}},[i.buffer,a.buffer])})}function b2(){if(zh)return;const e=new URL("public/ort/",document.baseURI);Se.wasm.numThreads=1,Se.wasm.proxy=!0,Se.wasm.wasmPaths={mjs:new URL("ort-wasm-simd-threaded.jsep.mjs",e).toString(),wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",e).toString()},Me.setBaseUrl(new URL("public/models",document.baseURI).toString()),Me.setModelCacheBypass(!0),zh=!0}function y2(){return b2(),ao||(ao=ib("u2netp")),ao}function w2(e,t,n){const r=atob(e||""),i=new Uint8Array(t*n);for(let a=0;a<Math.min(r.length,i.length);a+=1)i[a]=r.charCodeAt(a);return i}function ab(e,t,n){let r=t,i=n,a=-1,o=-1;for(let s=0;s<e.length;s+=1){if(!e[s])continue;const l=s%t,u=Math.floor(s/t);r=Math.min(r,l),i=Math.min(i,u),a=Math.max(a,l),o=Math.max(o,u)}return a<r?[0,0,t-1,n-1]:[r,i,a,o]}function _2(e){return new Promise(t=>{e.toBlob(n=>{if(!n){t(e.toDataURL("image/png"));return}const r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>t(e.toDataURL("image/png")),r.readAsDataURL(n)},"image/png")})}async function x2(e,t,n=null){const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d"),a=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);for(let I=0;I<t.length;I+=1)a.data[I*4+3]=t[I]?a.data[I*4+3]:0,(I&131071)===131071&&await Pt(16);i.putImageData(a,0,0);const[o,s,l,u]=n||ab(t,e.width,e.height),c=Math.max(1,l-o+1),p=Math.max(1,u-s+1),f=Math.max(8,Math.round(Math.max(c,p)*.08)),g=Math.max(0,o-f),b=Math.max(0,s-f),x=Math.min(e.width,l+f+1),T=Math.min(e.height,u+f+1),w=Math.max(1,x-g),v=Math.max(1,T-b),E=Math.max(w,v),C=document.createElement("canvas");return C.width=E,C.height=E,C.getContext("2d").drawImage(r,g,b,w,v,(E-w)/2,(E-v)/2,w,v),_2(C)}async function v2(e){var u;S.statusLine.textContent="Removing background",await Pt();const t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").putImageData(e,0,0);const n=await y2();await Pt();const r=await d2(t,{onlyMask:!0,postProcessMask:!0,session:n});await Pt();const i=await createImageBitmap(r),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(i,0,0,e.width,e.height),(u=i.close)==null||u.call(i);const s=o.getImageData(0,0,e.width,e.height).data,l=new Uint8Array(e.width*e.height);for(let c=0;c<l.length;c+=1)l[c]=s[c*4]>16?1:0,(c&131071)===131071&&await Pt(16);return l}async function ob(e){const t=await v2(e);S.statusLine.textContent="Fingerprinting shell",await Pt();const n=await g2(e,t);await Pt();const r=JSON.parse(n),i=w2(r.mask,e.width,e.height),a=r.bbox||ab(i,e.width,e.height);return{imageData:e,mask:i,contour:new Float32Array(r.contour||[]),fingerprint:new Float32Array(r.fingerprint||[]),maskPixels:Number(r.mask_pixels||0),bbox:a,imageUrl:await x2(e,i,a)}}async function $2(e){return S.statusLine.textContent="Cutting shell",await Pt(),ob(f2(e,768))}async function S2(e){return S.statusLine.textContent="Cutting shell",await Pt(),ob(await h2(e,768))}const Ts="shellspace:cutouts:v1:index",k2="shellspace:cutouts:v1:";let so=!1,T2=0;const mt=[],Rn=new Map,C2=80;function Cs(e){return`${k2}${encodeURIComponent(e)}`}function sb(){try{const e=JSON.parse(localStorage.getItem(Ts)||"[]");return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch{return[]}}function E2(e){try{localStorage.setItem(Ts,JSON.stringify([...new Set(e)]))}catch{}}function I2(){mt.length=0,Rn.clear();for(const e of sb())try{localStorage.removeItem(Cs(e))}catch{}try{localStorage.removeItem(Ts)}catch{}ui.clear(),at.clear(),mr.clear(),m.mapShellImageIds.clear()}function Es(e){if(!(e!=null&&e.file))return"";try{return localStorage.getItem(Cs(e.file))||""}catch{return""}}function z2(e,t){if(!(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/"))))try{localStorage.setItem(Cs(e.file),t),E2([...sb(),e.file]),e.id>=0&&m.mapShellImageIds.add(e.id)}catch{}}function M2(e,t){const n=()=>z2(e,t);if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(n,{timeout:5e3});return}window.setTimeout(n,2500)}function lb(e){var t;["Loading Python","Loading numpy","Removing background","Cutting shell","Fingerprinting shell"].includes((t=S.statusLine)==null?void 0:t.textContent)&&(S.statusLine.textContent=e)}function A2(e=120){return new Promise(t=>{if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(()=>t(),{timeout:e});return}window.setTimeout(t,16)})}function ub(){so||(so=!0,(async()=>{for(;mt.length;){mt.sort((t,n)=>n.priority-t.priority||t.id-n.id);const e=mt.shift();e.file&&Rn.delete(e.file),await A2();try{e.resolve(await e.task())}catch(t){S.statusLine&&(S.statusLine.textContent=t.message||"Python image cut failed"),e.resolve(null)}}so=!1,mt.length&&ub()})())}function N2(e,t,n,{priority:r=0}={}){const i=Rn.get(e);if(i)return r>i.priority&&(i.priority=r),!0;if(mt.length>=C2){if(r<=0)return!1;let s=-1,l=r;for(let c=0;c<mt.length;c+=1)mt[c].priority<l&&(l=mt[c].priority,s=c);if(s<0)return!1;const[u]=mt.splice(s,1);Rn.delete(u.file),ui.delete(u.file),u.resolve(null)}const a=cb(t),o=new Promise(s=>{const l={id:++T2,file:e,priority:r,task:n,resolve:s};mt.push(l),Rn.set(e,l),ub()});return ui.set(e,o),a.promise=a.promise||o,!0}function Uo(e,t){if(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/")))return;let n=at.get(e.file);n||(n=db(),at.set(e.file,n)),n.image.src=t,e.id>=0&&m.mapShellImageIds.add(e.id),n.promise.then(r=>{if(!(r!=null&&r.src))return;window.dispatchEvent(new CustomEvent("shellspace:cutout-ready",{detail:{shellId:e.id,file:e.file}}));const i=mr.get(e.file);if(i)for(const a of[...i])a(r)})}function db(){const e=new Image;e.decoding="async";const t={image:e,ready:!1,promise:null};return t.promise=new Promise(n=>{e.onload=()=>{t.ready=!0,n(e)},e.onerror=()=>n(null)}),t}function cb(e){let t=at.get(e.file);return t||(t=db(),at.set(e.file,t)),t}function Sr(e,t={}){var n;return e!=null&&e.file?(n=at.get(e.file))!=null&&n.ready?!0:ui.has(e.file)?(B2(e.file,t.priority),!0):N2(e.file,e,async()=>{const r=Es(e);if(r)return Uo(e,r),{imageUrl:r};const i=await c1(e);if(!i)return null;const a=await $2(i);return a!=null&&a.imageUrl&&(Uo(e,a.imageUrl),M2(e,a.imageUrl)),a},t):!1}function P2(e,t){if(!(e!=null&&e.file)||!t)return()=>{};let n=mr.get(e.file);n||(n=new Set,mr.set(e.file,n)),n.add(t);const r=at.get(e.file);return r!=null&&r.ready&&queueMicrotask(()=>t(r.image)),()=>{n.delete(t),n.size||mr.delete(e.file)}}function R2(e){return cb(e).promise.then(n=>n!=null&&n.src?{imageUrl:n.src}:null)}function O2(e,t,{timeout:n=3e4}={}){return new Promise(r=>{const i=performance.now(),a=()=>{if(!e.isConnected){r(!1);return}const o=Ni(t);if(o!=null&&o.src){e.src=o.src,r(!0);return}if(performance.now()-i>n){r(!1);return}window.setTimeout(a,120)};a()})}function B2(e,t=0){const n=Rn.get(e);n&&t>n.priority&&(n.priority=t)}async function D2(e,t={}){return e!=null&&e.file?(Sr(e,t),R2(e).catch(n=>(S.statusLine&&(S.statusLine.textContent=n.message||"Python image cut failed"),null))):null}function pb(e,t=null,n={}){if(!(e!=null&&e.file))return null;let r=at.get(e.file);return!r&&n.request!==!1&&(Sr(e,n),r=at.get(e.file)),r?r.ready?r.image:(t&&r.promise.then(i=>{i&&t(i)}),null):null}function Ni(e,t=null){const n=e!=null&&e.file?at.get(e.file):null;return n?n.ready?n.image:(t&&n.promise.then(r=>{r&&t(r)}),null):null}function Is(e,t){if(!e||!(t!=null&&t.file))return!1;const n=at.get(t.file);return n?n.ready?(e.src=n.image.src,e.hidden=!1,!0):(n.promise.then(r=>{r!=null&&r.src&&e.isConnected&&(e.src=r.src,e.hidden=!1)}),!0):!1}async function L2(e,t={}){const n=pb(e,null,{...t,request:!1});if(n)return n;const r=Es(e);if(r)return Uo(e,r),Ni(e);Sr(e,t);const i=e!=null&&e.file?at.get(e.file):null;return(i==null?void 0:i.promise)||null}async function U2(e,t,n={}){var o;if(!e||!t)return!1;const r=pb(t,null,{...n,request:!1});if(r)return e.src=r.src,!0;const i=((o=S.statusLine)==null?void 0:o.textContent)||"";if(!Sr(t,n))return!1;const a=await O2(e,t,n);return lb(i),a}function kr(){var e;return Math.min(6,((e=m.model)==null?void 0:e.contour_visible_component_count)||0)}function zs(){return kr()}function F2(){return m.pcValues}function lo(e){var t;return(t=m.model.contour_pca_ranges)==null?void 0:t[e]}function hb(e){var n;return String(((n=m.pcaAxisNames)==null?void 0:n[e])||"").trim()||`PC${e+1}`}function yi(e){var n;const t=String(((n=m.pcaAxisNames)==null?void 0:n[e])||"").trim();return t?`${t} (PC${e+1})`:`PC${e+1}`}function Et(e,t){var n;return((n=e.contour_pc)==null?void 0:n[t])||0}function Pi(e=m.xAxis,t=m.yAxis){var s;const n=((s=m.model.contour_pca_ranges)==null?void 0:s[0])||{p01:-1,p99:1},r=lo(e)||n,i=lo(t)||lo(1)||n,a=Math.max((r.p99-r.p01)*.08,.001),o=Math.max((i.p99-i.p01)*.08,.001);return{minX:r.p01-a,maxX:r.p99+a,minY:i.p01-o,maxY:i.p99+o}}function br(e,t,n){const r=m.viewport;return{x:(e-r.minX)/(r.maxX-r.minX)*n.width,y:n.height-(t-r.minY)/(r.maxY-r.minY)*n.height}}function fb(e,t,n){const r=m.viewport;return{x:r.minX+e/n.width*(r.maxX-r.minX),y:r.minY+(n.height-t)/n.height*(r.maxY-r.minY)}}function wi(e,t=.78){let n=0;for(let r=0;r<e.length;r+=1)n=n*31+e.charCodeAt(r)>>>0;return`hsla(${n%360}, 42%, 42%, ${t})`}function Ah(e,t=.78){let n=0;const r=String(e||"");for(let i=0;i<r.length;i+=1)n=n*31+r.charCodeAt(i)>>>0;return gt(n%360,.42,.42,t)}function mb(e,t=1){return[Math.round(se(e.color_r_mean??.68)*255),Math.round(se(e.color_g_mean??.64)*255),Math.round(se(e.color_b_mean??.56)*255),Math.round(se(t)*255)]}function Ms(e){var t;return(e==null?void 0:e.live_conservation_status)||((t=e==null?void 0:e.species_traits)==null?void 0:t.protection_status)||"Not assessed"}function uo(e){const t=String(e||"").trim().toLowerCase();return t&&!["unknown","not assessed","data deficient","locality unavailable"].includes(t)}function un(e){if(e==null||String(e).trim()==="")return!1;const t=Number(e);return Number.isFinite(t)}function W2(e,t){var n;return t==="species"?!0:t==="locality"?uo(e.location_key):t==="conservation"?uo(Ms(e)):t==="shell"?un(e.color_r_mean)&&un(e.color_g_mean)&&un(e.color_b_mean):t==="pattern"?un(e.color_pattern_strength):t==="lightness"?un(e.color_l_mean):t==="roughness"?un((n=e.morph_traits)==null?void 0:n.roughness):t==="rarity"?uo(e.rarity_label):t==="concavity"?un(e.contour_concavity):!1}function q2(){return ff.filter(e=>m.shells.some(t=>W2(t,e.key)))}function Nh(){var t;if(!S.colorModeSelect)return;const e=q2();S.colorModeSelect.innerHTML="";for(const n of e){const r=document.createElement("option");r.value=n.key,r.textContent=n.label,S.colorModeSelect.append(r)}e.some(n=>n.key===m.colorMode)||(m.colorMode=e.some(n=>n.key==="roughness")?"roughness":((t=e[0])==null?void 0:t.key)||"species"),S.colorModeSelect.value=m.colorMode,gb()}function Mn(e){return`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]/255})`}function An(e,t){const n=document.createElement("span");n.className="color-legend-item";const r=document.createElement("span");r.className="color-legend-dot",r.style.background=t;const i=document.createElement("span");return i.textContent=e,n.append(r,i),n}function co(e,t,n="Low",r="High"){const i=document.createElement("div");i.className="color-legend-gradient";const a=document.createElement("span");a.style.background=`linear-gradient(90deg, ${e}, ${t})`;const o=document.createElement("span");return o.className="color-legend-labels",o.innerHTML=`<span>${n}</span><span>${r}</span>`,i.append(a,o),i}function gb(){if(!S.colorLegend)return;const e=S.colorLegend;if(e.innerHTML="",e.hidden=!1,m.colorMode==="rarity"){e.append(An("Common","rgba(52, 136, 96, 0.82)"),An("Uncommon","rgba(222, 146, 54, 0.85)"),An("Rare","rgba(199, 64, 44, 0.88)"));return}if(m.colorMode==="lightness"){e.append(co(Mn(gt(48,.24,.24)),Mn(gt(48,.24,.78)),"Dark","Light"));return}if(m.colorMode==="roughness"){e.append(co(Mn(gt(178,.58,.34)),Mn(gt(28,.58,.5)),"Smooth","Rough"));return}if(m.colorMode==="concavity"){e.append(co(Mn(gt(320,.56,.35)),Mn(gt(135,.56,.46)),"Smooth","Indented"));return}if(m.colorMode==="conservation"){e.append(An("Least","rgba(58, 139, 99, 0.75)"),An("Near","rgba(228, 176, 62, 0.78)"),An("Risk","rgba(200, 45, 38, 0.86)"));return}e.hidden=!0}function V2(e){const t=Ms(e).toLowerCase();return t.includes("critically")?[126,24,28,230]:t.includes("endangered")?[200,45,38,220]:t.includes("vulnerable")?[232,123,54,210]:t.includes("near")?[228,176,62,200]:t.includes("least")?[58,139,99,190]:[102,111,117,112]}function H2(e){const t=String(e.rarity_label||"").toLowerCase();return t.includes("uncommon")?[222,146,54,218]:t.includes("common")?[52,136,96,208]:t.includes("rare")?[199,64,44,224]:[104,113,116,138]}function bb(e,t){var n;if(t==="locality")return e.location_key==="unknown"?[96,108,106,158]:Ah(e.location_key||"unknown",.66);if(t==="conservation")return V2(e);if(t==="shell")return mb(e);if(t==="lightness"){const r=se(e.color_l_mean??.5);return gt(48,.24,(24+r*54)/100)}if(t==="roughness"){const r=se(((n=e.morph_traits)==null?void 0:n.roughness)??0);return gt(178-r*150,.58,(34+r*16)/100)}if(t==="rarity")return H2(e);if(t==="pattern"){const r=se((e.color_pattern_strength||0)/.22);return gt(204-r*162,(34+r*36)/100,(30+r*18)/100)}if(t==="concavity"){const r=se((e.contour_concavity||0)/.32);return gt(320-r*185,.56,(35+r*11)/100)}return Ah(e.species,.78)}function G2(e){if(m.pointColorCache.has(e))return m.pointColorCache.get(e);const t=new Uint8ClampedArray(m.shells.length*4);for(const n of m.shells){if(n.id<0||n.id>=m.shells.length)continue;const r=bb(n,e),i=n.id*4;t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3]}return m.pointColorCache.set(e,t),t}function Fe(e=0){if(m.needsDraw=!0,m.scatterHitCache=null,e>0){window.clearTimeout(m.drawTimer),m.drawTimer=window.setTimeout(()=>Fe(),e);return}window.clearTimeout(m.drawTimer),m.drawTimer=0,!m.drawFrame&&(m.drawFrame=requestAnimationFrame(()=>{m.drawFrame=0,K2()}))}window.addEventListener("shellspace:cutout-ready",()=>Fe());function j2(e){const t=S.scatter.width,n=S.scatter.height;if(!t||!n)return;const r=window.devicePixelRatio||1,i=fe.createImageData(t,n),a=i.data,o=G2(m.colorMode),s=Math.max(8,Math.round(r*4)),l=Math.floor(s/2);for(let u=0;u<e.shells.length;u+=1){const c=e.shells[u],p=Math.round(e.points[u*2]*r),f=Math.round(e.points[u*2+1]*r);if(p<-s||p>=t+s||f<-s||f>=n+s)continue;const g=c.id>=0&&c.id<m.shells.length?c.id*4:-1,b=g<0?bb(c,m.colorMode):null,x=g<0?b[0]:o[g],T=g<0?b[1]:o[g+1],w=g<0?b[2]:o[g+2],v=g<0?b[3]:o[g+3];for(let E=0;E<s;E+=1){const C=f+E-l;if(!(C<0||C>=n))for(let I=0;I<s;I+=1){const M=p+I-l;if(M<0||M>=t)continue;const A=(C*t+M)*4;a[A]=x,a[A+1]=T,a[A+2]=w,a[A+3]=v}}}fe.putImageData(i,0,0)}function Ph(e,t){if(!e||e.id<0)return!1;const n=Ni(e,()=>Fe());if(!n)return!1;const r=br(Et(e,m.xAxis),Et(e,m.yAxis),t);if(r.x<-40||r.x>t.width+40||r.y<-40||r.y>t.height+40)return!0;const i=e===m.selected?52:42;return fe.save(),fe.drawImage(n,r.x-i/2,r.y-i/2,i,i),fe.restore(),!0}function K2(){const e=Sn(S.scatter,fe);if(!m.viewport||!m.needsDraw)return;m.needsDraw=!1,fe.clearRect(0,0,e.width,e.height);const t=yb(e),n=new Set(t.shells);j2(t),fe.save(),fe.lineWidth=1,fe.strokeStyle="rgba(32, 36, 42, 0.25)";const r=br(0,0,e);r.x>=0&&r.x<=e.width&&(fe.beginPath(),fe.moveTo(r.x,0),fe.lineTo(r.x,e.height),fe.stroke()),r.y>=0&&r.y<=e.height&&(fe.beginPath(),fe.moveTo(0,r.y),fe.lineTo(e.width,r.y),fe.stroke());const i=F2();if(i.length){const a=br(i[m.xAxis]||0,i[m.yAxis]||0,e);fe.strokeStyle="#c65d4b",fe.lineWidth=2,fe.beginPath(),fe.moveTo(a.x-10,a.y),fe.lineTo(a.x+10,a.y),fe.moveTo(a.x,a.y-10),fe.lineTo(a.x,a.y+10),fe.stroke()}if(m.showPoppedShells)for(const a of m.mapShellImageIds){const o=m.shellById.get(a);o&&o!==m.selected&&n.has(o)&&Ph(o,e)}if(m.selected&&n.has(m.selected)&&(!m.showPoppedShells||!Ph(m.selected,e))){const a=br(Et(m.selected,m.xAxis),Et(m.selected,m.yAxis),e);fe.fillStyle="#ffffff",fe.strokeStyle="#20242a",fe.lineWidth=2,fe.beginPath(),fe.arc(a.x,a.y,6,0,Math.PI*2),fe.fill(),fe.stroke()}fe.restore()}function X2(e){const t=m.viewport||{};return[m.xAxis,m.yAxis,e.width.toFixed(1),e.height.toFixed(1),Number(t.minX||0).toFixed(4),Number(t.maxX||0).toFixed(4),Number(t.minY||0).toFixed(4),Number(t.maxY||0).toFixed(4)].join("|")}function yb(e){var i;const t=X2(e);if(((i=m.scatterPointCache)==null?void 0:i.key)===t&&m.scatterPointCache.shells===m.filtered)return m.scatterPointCache;const n=m.filtered,r=new Float32Array(n.length*2);for(let a=0;a<n.length;a+=1){const o=br(Et(n[a],m.xAxis),Et(n[a],m.yAxis),e);r[a*2]=o.x,r[a*2+1]=o.y}return m.scatterPointCache={key:t,shells:n,points:r},m.scatterHitCache=null,m.scatterPointCache}function wb(e){var s;const t=yb(e),n=t.key;if(((s=m.scatterHitCache)==null?void 0:s.key)===n&&m.scatterHitCache.shells===m.filtered)return m.scatterHitCache;const r=t.shells,i=t.points,a=24,o=new Map;for(let l=0;l<r.length;l+=1){const u=i[l*2],c=i[l*2+1];if(u<-a||u>e.width+a||c<-a||c>e.height+a)continue;const p=Math.floor(u/a),f=Math.floor(c/a),g=`${p},${f}`;let b=o.get(g);b||(b=[],o.set(g,b)),b.push(l)}return m.scatterHitCache={key:n,shells:r,points:i,grid:o,cellSize:a},m.scatterHitCache}let yr=!1,Rh=0,wr=0,Ln=!1,Fo=0,_i=0;const Y2=1400;function _b(){S.loadingOverlay&&(S.loadingOverlay.hidden=!0,S.loadingOverlay.classList.remove("is-fading-out"))}function Q2(){S.loadingOverlay&&(S.loadingOverlay.classList.add("is-fading-out"),window.clearTimeout(wr),wr=window.setTimeout(_b,220))}function xb(){!S.loadingOverlay||yr||!Ln||(window.clearTimeout(_i),S.loadingOverlay.hidden=!1,S.loadingOverlay.classList.remove("is-fading-out"),S.loadingOverlay.classList.add("is-loader-preview"))}function vb(){var e;window.clearTimeout(Fo),(e=S.loadingOverlay)!=null&&e.classList.contains("is-loader-preview")&&(S.loadingOverlay.classList.add("is-fading-out"),window.clearTimeout(_i),_i=window.setTimeout(()=>{S.loadingOverlay.classList.remove("is-loader-preview","is-fading-out"),yr||_b()},220))}window.addEventListener("keydown",e=>{e.key.toLowerCase()!=="z"||Ln||(Ln=!0,window.clearTimeout(Fo),Fo=window.setTimeout(xb,160))});window.addEventListener("keyup",e=>{e.key.toLowerCase()==="z"&&(Ln=!1,vb())});window.addEventListener("blur",()=>{Ln=!1,vb()});function or(e){return new URL(`public/${e}`,document.baseURI).toString()}function Z2(e){return new URL(`dataset/${encodeURIComponent(e).replaceAll("%2F","/")}`,document.baseURI).toString()}function se(e){return Math.max(0,Math.min(1,e))}function St(e,t=3){return Number(e||0).toLocaleString(void 0,{maximumFractionDigits:t})}function po(e){return`${St(se(e)*100,1)}%`}function J2(e){return se(((e==null?void 0:e.area)||0)/Math.max(1,((e==null?void 0:e.image_width)||0)*((e==null?void 0:e.image_height)||0)))}function $b(e){if(!e||e.length<8)return null;const t=Math.floor(e.length/2);let n=0,r=0;for(let l=0;l<t;l+=1)n+=Number(e[l*2]||0),r+=Number(e[l*2+1]||0);n/=t,r/=t;const i=[];for(let l=0;l<t;l+=1){const u=Number(e[l*2]||0)-n,c=Number(e[l*2+1]||0)-r,p=Math.hypot(u,c);Number.isFinite(p)&&p>1e-6&&i.push(p)}if(i.length<4)return null;const a=i.reduce((l,u)=>l+u,0)/i.length;if(a<=1e-6)return null;const o=Math.max(2,Math.round(i.length*.035));let s=0;for(let l=0;l<i.length;l+=1){let u=0,c=0;for(let p=-o;p<=o;p+=1)u+=i[(l+p+i.length)%i.length],c+=1;s+=Math.abs(i[l]-u/c)}return se(s/i.length/a)}function As(e){const t=Math.max(1,(e==null?void 0:e.image_width)||400),n=Math.max(1,(e==null?void 0:e.image_height)||300),r=Math.max(t,n),i=10;return{cmPerImageUnit:i/r,widthCm:t/r*i,heightCm:n/r*i,longSideCm:i}}function ev(e){const t=As(e);return((e==null?void 0:e.area)||0)*t.cmPerImageUnit*t.cmPerImageUnit}function tv(e){return((e==null?void 0:e.mean_radius)||0)*As(e).cmPerImageUnit}function xi(e,t=!0){if(S.loadingText&&e&&(S.loadingText.textContent=e),!S.loadingOverlay)return;if(t){yr=!0,Rh=performance.now(),window.clearTimeout(wr),window.clearTimeout(_i),S.loadingOverlay.classList.remove("is-loader-preview","is-fading-out"),S.loadingOverlay.hidden=!1;return}const n=Y2-(performance.now()-Rh);if(yr&&n>0){window.clearTimeout(wr),wr=window.setTimeout(()=>xi("",!1),n);return}if(yr=!1,Ln){xb();return}Q2()}function Ns(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function nv(e){if(e!=null&&e.fingerprint_hash)return e.fingerprint_hash;const t=(e.contour_pc||[]).slice(0,6).map(r=>Number(r||0).toFixed(4)),n=`${e.species}|${e.specimen}|${e.view}|${t.join(",")}`;return Ns(n).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function rv(e,t){const n=Ns(t)%360;e.style.setProperty("--hash-hue",String(n)),e.textContent=t}function Oh(e,t,n=t==null?void 0:t.fingerprint_hash){if(!e||!n)return;const r=Sb((t==null?void 0:t.color_r_mean)??.68,(t==null?void 0:t.color_g_mean)??.62,(t==null?void 0:t.color_b_mean)??.52);e.style.setProperty("--hash-hue",String(Math.round(r.h))),e.style.setProperty("--hash-saturation",`${Math.round(Math.max(.28,r.s)*100)}%`),e.style.setProperty("--hash-lightness",`${Math.round(Math.max(.3,Math.min(.72,r.l))*100)}%`),e.textContent=n}function Sb(e,t,n){const r=se(e),i=se(t),a=se(n),o=Math.max(r,i,a),s=Math.min(r,i,a);let l=0,u=0;const c=(o+s)/2;if(o!==s){const p=o-s;u=c>.5?p/(2-o-s):p/(o+s),o===r?l=(i-a)/p+(i<a?6:0):o===i?l=(a-r)/p+2:l=(r-i)/p+4,l/=6}return{h:l*360,s:u,l:c}}function sr(e,t,n){return`hsl(${(e%360+360)%360}, ${Math.round(se(t)*100)}%, ${Math.round(se(n)*100)}%)`}function gt(e,t,n,r=1){const i=(e%360+360)%360/360,a=se(t),o=se(n);if(a===0){const c=Math.round(o*255);return[c,c,c,Math.round(se(r)*255)]}const s=o<.5?o*(1+a):o+a-o*a,l=2*o-s,u=c=>{let p=i+c;return p<0&&(p+=1),p>1&&(p-=1),p<1/6?l+(s-l)*6*p:p<1/2?s:p<2/3?l+(s-l)*(2/3-p)*6:l};return[Math.round(u(1/3)*255),Math.round(u(0)*255),Math.round(u(-1/3)*255),Math.round(se(r)*255)]}function iv(e){return e.location_label||"Locality unavailable"}function kb(e,t){var n;return t?((n=e==null?void 0:e.region_labels)==null?void 0:n[t])||t.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,r=>r.toUpperCase()):""}function Wo(e,t){var n,r;return((r=(n=e==null?void 0:e.countries)==null?void 0:n[t])==null?void 0:r.title)||t}function av(e){var r,i,a,o;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-localities-v1")return t;const n=e.species_names||[];for(let s=0;s<n.length;s+=1){const l=((r=e.primary_country_codes)==null?void 0:r[s])||"",u=((i=e.region_keys)==null?void 0:i[s])||"",c=((a=e.top_country_codes)==null?void 0:a[s])||[],p=((o=e.top_country_counts)==null?void 0:o[s])||[],f=l?Wo(e,l):"",g=kb(e,u),b=c.map((x,T)=>({code:x,label:Wo(e,x),count:p[T]||0}));t.set(n[s],{primary_country:l,primary_country_label:f,region_key:u,region_label:g,top_countries:b,location_label:f&&g?`${f}, ${g}`:f||g||""})}return t}function ov(e){var a,o,s,l,u,c,p,f,g,b,x,T;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-species-traits-v1")return t;const n=e.species_names||[],r=e.rarity_labels||[],i=e.protection_status_labels||[];for(let w=0;w<n.length;w+=1){const v=((a=e.known_range_country_codes)==null?void 0:a[w])||[],E=((o=e.known_range_country_counts)==null?void 0:o[w])||[],C=v.map((I,M)=>({code:I,label:Wo(e,I),count:E[M]||0}));t.set(n[w],{genus:((s=e.genus)==null?void 0:s[w])||"",rarity_label:r[(l=e.rarity)==null?void 0:l[w]]||"Data deficient",rarity_reason:((u=e.rarity_reasons)==null?void 0:u[w])||"",dataset_sample_count:((c=e.dataset_sample_count)==null?void 0:c[w])||0,known_range_country_count:((p=e.country_count)==null?void 0:p[w])||C.length,known_range_countries:C,primary_country:((f=e.primary_country_codes)==null?void 0:f[w])||"",region_key:((g=e.region_keys)==null?void 0:g[w])||"",region_label:kb(e,((b=e.region_keys)==null?void 0:b[w])||""),protection_status:i[(x=e.protection_status)==null?void 0:x[w]]||"Not assessed",market_price_usd:((T=e.market_price_usd)==null?void 0:T[w])??null})}return t}function Tb(e){const t=Number.isFinite(Number(e.roughness))?Number(e.roughness):$b(e.upload_contour),n=se((1-(e.contour_solidity||1))/.32),r=e.contour_pc||[],i=se(((r[1]||0)+7)/14),a=se(((r[3]||0)+3)/6);return{roughness:t??se(.4*Math.abs(i-.5)*2+.34*Math.abs(a-.5)*2+.26*n)}}function sv(e,t=null,n=null){var a;m.speciesCounts=new Map,m.originFilterOptionsCache=null;for(const o of e)m.speciesCounts.set(o.species,(m.speciesCounts.get(o.species)||0)+1);const r=av(t),i=ov(n);m.speciesTraits=i,m.localityMatchRate=(t==null?void 0:t.match_rate)||0;for(const o of e){const s=r.get(o.species),l=i.get(o.species),u=Tb(o);o.fingerprint_hash||(o.fingerprint_hash=nv(o)),o.species_sample_count=m.speciesCounts.get(o.species)||1,o.species_traits=l||null,o.morph_traits={...u,...o.morph_traits||{}},o.rarity_label=(l==null?void 0:l.rarity_label)||o.rarity_label||"",o.rarity_reason=(l==null?void 0:l.rarity_reason)||"",o.location_label=(s==null?void 0:s.location_label)||"Locality unavailable",o.location_key=(s==null?void 0:s.primary_country)||(s==null?void 0:s.region_key)||"unknown",o.location_color=o.location_key==="unknown"?"rgba(96, 108, 106, 0.62)":wi(o.location_key),o.species_color=wi(o.species),o.region_label=(s==null?void 0:s.region_label)||"",o.top_countries_label=(a=s==null?void 0:s.top_countries)!=null&&a.length?s.top_countries.slice(0,3).map(c=>c.label).join(", "):o.countries_top||""}}function qo(e){return fetch(e,{cache:"no-store"}).then(t=>{if(!t.ok)throw new Error(`${e} returned ${t.status}`);return t.json()})}async function Bh(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} returned ${t.status}`);if(!e.endsWith(".gz"))return t.arrayBuffer();const n=await t.arrayBuffer(),r=new Uint8Array(n);if(r[0]!==31||r[1]!==139)return n;if(!("DecompressionStream"in window))throw new Error("This browser cannot decompress the shell data pack.");return new Response(new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}const kt=15,Tr=10,lv=.08,Dh=[{saturation:.2,lightness:.18},{saturation:.42,lightness:.24},{saturation:.64,lightness:.31},{saturation:.82,lightness:.39},{saturation:.82,lightness:.48},{saturation:.74,lightness:.58},{saturation:.62,lightness:.68},{saturation:.48,lightness:.78},{saturation:.34,lightness:.86},{saturation:.2,lightness:.93}];function Ps(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function Cb(e){const t=[Number((e==null?void 0:e[0])??0),Number((e==null?void 0:e[1])??0),Number((e==null?void 0:e[2])??0)],n=t.some(r=>r>1)?255:1;return t.map(r=>Ps(r/n))}function uv(e,t,n){const r=(e%360+360)%360/360,i=n<.5?n*(1+t):n+t-n*t,a=2*n-i,o=s=>{let l=r+s;return l<0&&(l+=1),l>1&&(l-=1),l<1/6?a+(i-a)*6*l:l<1/2?i:l<2/3?a+(i-a)*(2/3-l)*6:a};return[o(1/3),o(0),o(-1/3)].map(Ps)}function dv(e){return`#${e.map(t=>Math.max(0,Math.min(255,Math.round(t*255))).toString(16).padStart(2,"0")).join("")}`}function cv(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]:null}function pv(e){const t=String(e||"").match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i);return t?[Number(t[1])/255,Number(t[2])/255,Number(t[3])/255].map(Ps):null}function Eb(e){const t=Math.max(0,Math.min(kt*Tr-1,Math.round(Number(e)||0))),n=Math.floor(t/kt),r=t%kt;return uv(r/kt*360,Dh[n].saturation,Dh[n].lightness)}function Vo(e){const t=Math.max(0,Math.min(kt*Tr-1,Math.round(Number(e)||0))),n=Eb(t);return{bin:t,hex:dv(n),rgb:n,hue:t%kt,tone:Math.floor(t/kt),count:0,weight:0}}function Rs(e){const t=Cb(e);let n=0,r=1/0;for(let i=0;i<kt*Tr;i+=1){const a=Eb(i),o=t[0]-a[0],s=t[1]-a[1],l=t[2]-a[2],u=o*o*.3+s*s*.59+l*l*.11;u<r&&(r=u,n=i)}return n}function hv(e){const t=cv(e)||pv(e);return t?Rs(t):null}function vi(e){return`bin:${Math.max(0,Math.min(kt*Tr-1,Math.round(Number(e)||0)))}`}function Ib(e){const t=String(e||"");if(t.startsWith("bin:")){const n=Number(t.slice(4));return Number.isInteger(n)&&n>=0&&n<kt*Tr?n:null}return hv(t)}function fv(e){const n=Array.isArray(e==null?void 0:e.color_palette_rgb)?e.color_palette_rgb.map(Cb):[];if(!n.length)return{colors:[],weights:[]};const r=Array.isArray(e==null?void 0:e.color_palette_weights)?e.color_palette_weights:[],i=n.map((o,s)=>{const l=Number(r[s]);return Number.isFinite(l)&&l>0?l:1/n.length}),a=i.reduce((o,s)=>o+s,0)||1;return{colors:n,weights:i.map(o=>o/a)}}function Os(e){const{colors:t,weights:n}=fv(e),r=new Map;for(let a=0;a<t.length;a+=1){const o=Rs(t[a]);r.set(o,(r.get(o)||0)+n[a])}const i=[...r.entries()].map(([a,o])=>({bin:a,weight:Math.round(o*1e4)/1e4})).sort((a,o)=>o.weight-a.weight||a.bin-o.bin);return e.color_bins=i,i}function mv(e){for(const t of e||[])Os(t)}function gv(e,t){const n=Number(t);return Number.isInteger(n)?(Array.isArray(e==null?void 0:e.color_bins)?e.color_bins:Os(e)).some(i=>i.bin===n&&Number(i.weight||0)>0):!1}function Bs(e){const t=new Map;for(const n of e||[]){const r=Array.isArray(n==null?void 0:n.color_bins)?n.color_bins:Os(n);for(const i of r){const a=Number(i.weight||0);if(a<lv)continue;const o=t.get(i.bin)||Vo(i.bin);o.count+=1,o.weight+=a,t.set(i.bin,o)}}return[...t.values()].map(n=>({...n,weight:Math.round(n.weight*1e3)/1e3})).sort((n,r)=>n.tone-r.tone||n.hue-r.hue)}const bv=.28,Lh=12;function yv(e){if(!e)return 1;const t=Math.abs(Number(e.p99||0)-Number(e.p01||0)),n=Math.abs(Number(e.max||0)-Number(e.min||0));return Math.max(.001,t||n||1)}function zb(e,t,n){var a;const r=(n==null?void 0:n[t])||{},i=(Number(r.p01||0)+Number(r.p99||0))/2||0;return(Number(((a=e.contour_pc)==null?void 0:a[t])||0)-i)/yv(r)}function wv(e,t,n){return t.map(r=>zb(e,r,n))}function Mb(e,t){let n=0;for(let r=0;r<e.length;r+=1){const i=(e[r]||0)-(t[r]||0);n+=i*i}return n}function $i(e,t=0){if(!e.length)return null;const n=e[0].point.length||1,r=t%n,i=e.slice().sort((o,s)=>(o.point[r]||0)-(s.point[r]||0)),a=Math.floor(i.length/2);return{axis:r,item:i[a],left:$i(i.slice(0,a),t+1),right:$i(i.slice(a+1),t+1)}}function _v(e,t,n,r){!t||!Number.isFinite(n)||(e.push({item:t,distance:n}),e.sort((i,a)=>a.distance-i.distance),e.length>r&&(e.length=r))}function Si(e,t,n,r=[]){if(!e)return r;const i=e.axis,a=(t[i]||0)-(e.item.point[i]||0),o=a<=0?e.left:e.right,s=a<=0?e.right:e.left;Si(o,t,n,r),_v(r,e.item,Mb(t,e.item.point),n);const l=r.length<n?1/0:r[0].distance;return a*a<=l&&Si(s,t,n,r),r}function Ab(e,t){return e/(.05+t)}function Uh(e,t,n,r,i){const a=t.target<=n.target?t:n,o=t.target<=n.target?n:t;return{axis:e,axis_label:`PC${e+1}`,low_shell_id:a.shell.id,high_shell_id:o.shell.id,low_file:a.shell.file,high_file:o.shell.file,low_species:a.shell.species,high_species:o.shell.species,normalized_target_delta:Math.round(r*1e4)/1e4,orthogonal_distance:Math.round(i*1e4)/1e4,score:Math.round(Ab(r,i)*1e4)/1e4}}function xv(e,t,n,r){const i=n.filter(g=>g!==t),a=e.filter(g=>{var b;return((b=g==null?void 0:g.contour_pc)==null?void 0:b.length)>t}).map(g=>({shell:g,target:zb(g,t,r),point:wv(g,i,r)})).sort((g,b)=>g.target-b.target);if(a.length<2)return null;if(!i.length){const g=a[0],b=a[a.length-1];return Uh(t,g,b,Math.abs(b.target-g.target),0)}const o=Math.max(2,Math.min(Math.ceil(a.length*bv),Math.floor(a.length/2))),s=a.slice(0,o),l=a.slice(-o),u=$i(l),c=$i(s);let p=null;const f=(g,b)=>{if(!g||!b||g.shell.id===b.shell.id)return;const x=Math.abs(b.target-g.target),T=Math.sqrt(Mb(g.point,b.point)),w=Ab(x,T);(!p||w>p.score)&&(p={source:g,target:b,targetDelta:x,orthogonalDistance:T,score:w})};for(const g of s)for(const b of Si(u,g.point,Lh,[]))f(g,b.item);for(const g of l)for(const b of Si(c,g.point,Lh,[]))f(g,b.item);return p?Uh(t,p.source,p.target,p.targetDelta,p.orthogonalDistance):null}function vv(e,t,{axisCount:n=null}={}){const r=(e||[]).filter(o=>{var s;return(s=o==null?void 0:o.contour_pc)==null?void 0:s.length});if(r.length<2)return[];const i=Math.min(n||r[0].contour_pc.length,r[0].contour_pc.length,(t==null?void 0:t.length)||r[0].contour_pc.length),a=Array.from({length:i},(o,s)=>s);return a.map(o=>xv(r,o,a,t)).filter(Boolean)}function ho(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").replace(/_/g," ").trim()||"Unknown shell"}function $v(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").trim()}async function Sv(e){try{return await qo(e)}catch{return null}}function Fh(e){if(e==null||String(e).trim()==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function kv(e){const t=String(e||"").trim().toLowerCase();return!t||t==="unknown"?"":t.includes("high")?"Common":t.includes("moderate")?"Uncommon":t.includes("low")?"Rare":t.includes("common")?t.includes("uncommon")?"Uncommon":"Common":t.includes("rare")?"Rare":""}function Tv(e,t){const n=e.map(r=>{var i;return{shell:r,value:Number((i=r.morph_traits)==null?void 0:i[t])}}).filter(r=>Number.isFinite(r.value));if(n.length){if(n.sort((r,i)=>r.value-i.value),n.length===1){n[0].shell.morph_traits[`${t}_raw`]=n[0].value,n[0].shell.morph_traits[t]=.5;return}for(let r=0;r<n.length;){let i=r;for(;i+1<n.length&&n[i+1].value===n[r].value;)i+=1;const a=(r+i)/2/(n.length-1);for(let o=r;o<=i;o+=1)n[o].shell.morph_traits[`${t}_raw`]=n[o].value,n[o].shell.morph_traits[t]=a;r=i+1}}}function Cv(e,t,n){const r=[];for(let i=0;i<n;i+=1){const a=[];for(let f=0;f<t;f+=1)a.push(e[f*n+i]||0);a.sort((f,g)=>f-g);const o=f=>a[Math.min(a.length-1,Math.max(0,Math.round((a.length-1)*f)))]||0,s=a[0]||0,l=a.at(-1)||0,u=o(.01),c=o(.99),p=Math.max(.001,c-u,l-s);r.push({min:s-p*.08,max:l+p*.08,p01:u-p*.08,p99:c+p*.08})}return r}async function Nb(e){const t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),n=new Uint8Array(t.length);n.set(t);const r=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(r)].map(i=>i.toString(16).padStart(2,"0")).join("").slice(0,6).toUpperCase()}function Ds(e,t=256){const n=Math.floor(e.length/4),r=new Float32Array(t*2);for(let i=0;i<t;i+=1){const a=i/t;let o=0,s=0;for(let l=0;l<n;l+=1){const u=l+1,c=l*4,p=e[c]||0,f=e[c+1]||0,g=e[c+2]||0,b=e[c+3]||0,x=Math.PI*2*u*a,T=Math.cos(x),w=Math.sin(x);o+=p*T-f*w+g*T+b*w,s+=p*w+f*T+b*T-g*w}r[i*2]=o,r[i*2+1]=s}return r}function Ev(e){var i,a;const t=((i=m.model)==null?void 0:i.fingerprint_mean)||[],n=((a=m.model)==null?void 0:a.fingerprint_components)||[];if(!t.length||!n.length)return null;const r=new Float32Array(t);for(let o=0;o<Math.min(e.length,n.length);o+=1){const s=n[o]||[];for(let l=0;l<Math.min(r.length,s.length);l+=1)r[l]+=(e[o]||0)*s[l]}return r}function Pb(e){var r,i;const t=((r=m.model)==null?void 0:r.fingerprint_mean)||[];return(((i=m.model)==null?void 0:i.fingerprint_components)||[]).map(a=>{let o=0;for(let s=0;s<Math.min(e.length,t.length,a.length);s+=1)o+=(e[s]-t[s])*a[s];return o})}async function Iv(){const[e,t,n,r,i]=await Promise.all([qo(or("data/files.json")),qo(or("data/pca_model.json")),Bh(or("data/fingerprints.f32")),Bh(or("data/pca.f32")),Sv(or("data/enrichment.json"))]),a=(i==null?void 0:i.species)||(i==null?void 0:i.rows)||[],o=(i==null?void 0:i.shell)||[],s=new Map(a.map(T=>[T.label,T])),l=new Map(o.map(T=>[T.file,T])),u=e.length,c=new Float32Array(n),p=new Float32Array(r),f=Math.floor(c.length/u),g=Math.floor(p.length/u),b={processed_count:u,species_count:new Set(e.map(ho)).size,contour_points:256,contour_scale:1,contour_component_count:g,contour_visible_component_count:Math.min(6,g),contour_pca_ranges:Cv(p,u,g),contour_explained_variance_ratio:Array.from({length:g},()=>0),fingerprint_mean:t.mean||[],fingerprint_components:t.components||[]},x=await Promise.all(e.map(async(T,w)=>{const v=c.slice(w*f,(w+1)*f),E=Array.from(p.slice(w*g,(w+1)*g)),C=s.get($v(T))||{},I=l.get(T)||{},M=Fh(I.lightness_mean),A=Array.isArray(I.palette_rgb)?I.palette_rgb:[],$=Array.isArray(I.palette_weights)?I.palette_weights:[],O=Ds(v,256);return{id:w,file:T,species:ho(T),specimen:"",specimen_label:"",view:"",view_label:"",name:ho(T),contour_pc:E,trait_pc:[],fingerprint:v,fingerprint_hash:await Nb(v),enrichment:C,shell_enrichment:I,rarity_label:kv(C.rarity_proxy),country_count:Fh(C.country_count),countries_top:C.countries_top||"",color_l_mean:M==null?null:M/255,color_palette_rgb:A,color_palette_weights:$,morph_traits:{roughness:$b(O)}}}));return Tv(x,"roughness"),mv(x),b.contour_pca_diametric_pairs=vv(x,b.contour_pca_ranges,{axisCount:b.contour_component_count}),{model:b,shells:x}}function Rb(e){if(e!=null&&e.upload_contour)return e.upload_contour;if((e==null?void 0:e.id)<0&&m.selected===e&&m.selectedContour)return m.selectedContour;if(Wr.has(e.id))return Wr.get(e.id);if(!m.contours&&(e!=null&&e.fingerprint)){const s=Ds(e.fingerprint,m.contourPoints||256);return Wr.set(e.id,s),s}if(!m.contours||!m.contourPoints)return null;const t=e.id*m.contourPoints*2;if(t+m.contourPoints*2>m.contours.length)return null;const r=e.center[0]*m.contourScale,i=e.center[1]*m.contourScale,a=Math.max(1e-6,e.mean_radius*m.contourScale),o=new Float32Array(m.contourPoints*2);for(let s=0;s<m.contourPoints;s+=1){const l=t+s*2;o[s*2]=(m.contours[l]-r)/a,o[s*2+1]=(m.contours[l+1]-i)/a}return Wr.set(e.id,o),o}function Ob(e){var t;return e?{color_r_mean:e.color_r_mean,color_g_mean:e.color_g_mean,color_b_mean:e.color_b_mean,color_l_mean:e.color_l_mean,color_a_mean:e.color_a_mean,color_b_lab_mean:e.color_b_lab_mean,color_palette_rgb:e.color_palette_rgb,color_palette_weights:e.color_palette_weights,color_chroma_mean:e.color_chroma_mean,color_chroma_std:e.color_chroma_std,color_saturation_mean:e.color_saturation_mean,color_saturation_std:e.color_saturation_std,color_pattern_strength:e.color_pattern_strength,color_pattern_contrast:e.color_pattern_contrast,color_pattern_chroma:e.color_pattern_chroma,roughness:e.roughness??((t=e.morph_traits)==null?void 0:t.roughness),texture_gradient_mean:e.texture_gradient_mean,texture_residual_std:e.texture_residual_std,texture_luma_iqr:e.texture_luma_iqr,contour_concavity:e.contour_concavity,contour_solidity:e.contour_solidity}:{}}function zv(e){const t=e.color_l_mean??.5,n=e.color_chroma_mean??.1,r=(Math.atan2(e.color_hue_sin||0,e.color_hue_cos||1)*180/Math.PI+360)%360;return t>.72&&n<.12?"ivory":t<.32?"dark brown":n<.08?t>.58?"chalky cream":"stone gray":r<28||r>=342?"rose-brown":r<58?t>.58?"golden cream":"amber-brown":r<92?"olive-tan":r<165?"green-gray":r<235?"blue-gray":r<292?"violet-gray":"pink-tan"}function Ls(){return m.generatedTraits||Ob(m.selected)}function Us(){const e=Mv(m.pcValues);e&&(m.generatedContour=e,m.generatedTraits=null,m.generatedMode="pca",Ri())}function Mv(e){var i,a,o,s,l;const t=Ev(e);if(t)return Ds(t,m.contourPoints||256);if(!((a=(i=m.model)==null?void 0:i.contour_mean)!=null&&a.length)||!((s=(o=m.model)==null?void 0:o.contour_components)!=null&&s.length))return null;const n=m.model.contour_mean.length,r=new Float32Array(n);for(let u=0;u<n;u+=1){let c=m.model.contour_mean[u]||0;for(let p=0;p<m.model.contour_components.length;p+=1)c+=(e[p]||0)*(((l=m.model.contour_components[p])==null?void 0:l[u])||0);r[u]=c}return r}function Fs(e){let t=0;for(const n of e)if(n)for(let r=0;r<n.length;r+=2)t=Math.max(t,Math.hypot(n[r],n[r+1]));return t||1}function yn(e,t,n,r,i){e.beginPath();const a=Math.floor(t.length/2);for(let o=0;o<a;o+=1){const s=n+t[o*2]*i,l=r+t[o*2+1]*i;o===0?e.moveTo(s,l):e.lineTo(s,l)}e.closePath()}function Bb(e,t=.9){const n=Math.round(se((e==null?void 0:e.color_r_mean)??.72)*255),r=Math.round(se((e==null?void 0:e.color_g_mean)??.66)*255),i=Math.round(se((e==null?void 0:e.color_b_mean)??.54)*255);return`rgba(${n}, ${r}, ${i}, ${t})`}function Av(){const e=m.pcValues.slice(0,6).map(t=>Number(t||0).toFixed(4));return Ns(`projected|${e.join(",")}`).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function Db(){var e,t,n;if((e=m.selected)!=null&&e.fingerprint_hash&&S.physicalHash&&Oh(S.physicalHash,m.selected),S.projectedHash){const r=m.generatedMode==="selected"&&((t=m.selected)!=null&&t.fingerprint_hash)?m.selected.fingerprint_hash:Av();m.generatedMode==="selected"&&((n=m.selected)!=null&&n.fingerprint_hash)?Oh(S.projectedHash,m.selected,r):rv(S.projectedHash,r)}}function Nv(e,t,n,r,i,a){const o=Math.floor(t.length/2);if(o<4)return;const s=se(((a==null?void 0:a.roughness)||.012)/.04),l=se(((a==null?void 0:a.color_chroma_mean)||.08)/.35),u=se(((a==null?void 0:a.contour_concavity)||.04)/.35),c=se(((a==null?void 0:a.color_pattern_strength)||.06)/.22),p=se(((a==null?void 0:a.color_pattern_contrast)||.04)/.18);e.save(),yn(e,t,n,r,i),e.clip();const f=4+Math.round(u*4+c*5);for(let x=1;x<=f;x+=1)yn(e,t,n,r,i*(.16+x/(f+1)*.78)),e.strokeStyle=`rgba(32, 36, 42, ${.035+l*.035+p*.05})`,e.lineWidth=.8+c*.55,e.stroke();const g=Math.max(4,Math.round(16-s*5-l*3-c*6));e.lineWidth=.9+s*.8+c*.6,e.strokeStyle=`rgba(32, 36, 42, ${.07+s*.12+p*.16})`;for(let x=0;x<o;x+=g){const T=t[x*2],w=t[x*2+1];e.beginPath(),e.moveTo(n+T*i*.22,r+w*i*.22),e.lineTo(n+T*i*.95,r+w*i*.95),e.stroke()}const b=e.createRadialGradient(n-i*.22,r-i*.28,i*.08,n,r,i*1.25);b.addColorStop(0,"rgba(255, 255, 255, 0.34)"),b.addColorStop(.45,"rgba(255, 255, 255, 0.08)"),b.addColorStop(1,"rgba(32, 36, 42, 0.08)"),e.fillStyle=b,e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore()}function Ri(){const{width:e,height:t}=S.outline;De.clearRect(0,0,e,t),De.fillStyle="#f7f7f2",De.fillRect(0,0,e,t);const n=m.generatedContour||m.selectedContour;if(!n)return;Db();const r=e/2,i=t/2,a=Math.min(e,t)*.42/Fs([n]),o=Ls();De.save(),yn(De,n,r,i,a),De.fillStyle=Bb(o,.9),De.strokeStyle="#287a74",De.lineWidth=3,De.fill(),Nv(De,n,r,i,a,o),yn(De,n,r,i,a),De.stroke(),De.fillStyle="#20242a",De.beginPath(),De.arc(r,i,3,0,Math.PI*2),De.fill(),De.restore()}function Pv(e,t,n,r){const i=[],a=Math.floor(e.length/2);for(let o=0;o<a;o+=1){const s=t+e[o*2]*r,l=n+e[o*2+1]*r;i.push(`${o===0?"M":"L"}${s.toFixed(2)} ${l.toFixed(2)}`)}return i.push("Z"),i.join(" ")}function Rv(){const e=m.generatedContour||m.selectedContour;if(!e)return;const t=512,n=t/2,r=t*.42/Fs([e]),i=Pv(e,n,n,r),a=Bb(Ls(),.86),o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}"><rect width="${t}" height="${t}" fill="#f7f7f2"/><path d="${i}" fill="${a}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`,s=new Blob([o],{type:"image/svg+xml"}),l=URL.createObjectURL(s),u=document.createElement("a");u.href=l,u.download="seashell-generated.svg",u.click(),URL.revokeObjectURL(l)}const fo=typeof Intl<"u"&&Intl.DisplayNames?new Intl.DisplayNames(["en"],{type:"region"}):null;function Ws(e){const t=String(e||"").trim().toUpperCase();return!/^[A-Z]{2}$/.test(t)||t==="ZZ"?"":(fo==null?void 0:fo.of(t))||t}function Lb(e){const t=String(e||"").trim().toUpperCase();return!/^[A-Z]{2}$/.test(t)||t==="ZZ"?"":[...t].map(n=>String.fromCodePoint(127462+n.charCodeAt(0)-65)).join("")}function Ub(e){return String(e||"").split(";").map(t=>{const[n,r]=t.trim().split(":"),i=String(n||"").trim().toUpperCase();return{code:i,count:Number(r||0),name:Ws(i),flag:Lb(i)}}).filter(t=>t.code&&t.name&&Number.isFinite(t.count)&&t.count>0)}function Ov(e){const t=String(e||"").trim().toUpperCase();return`${Ws(t)} ${t}`.trim().toLowerCase()}function mo(e){const t=Ws(e);if(!t)return"";const n=Lb(e);return n?`${n} ${t}`:t}function Bv(e){const t=Ub(e);return t.length?t.map(n=>n.flag).filter(Boolean).join(" "):""}function Dv(e){return Array.isArray(e==null?void 0:e.color_bins)&&e.color_bins.length?e.color_bins.slice().sort((t,n)=>Number(n.weight||0)-Number(t.weight||0)||Number(t.bin||0)-Number(n.bin||0)).map(t=>{const n=Number(t.bin),r=Vo(n).hex;return{color:r,filterValue:vi(n),title:`${r} · bin ${n} · weight ${Number(t.weight||0).toFixed(3)}`}}):Array.isArray(e==null?void 0:e.color_palette_rgb)&&e.color_palette_rgb.length?e.color_palette_rgb.map(t=>{const n=[se(Number((t==null?void 0:t[0])??0)),se(Number((t==null?void 0:t[1])??0)),se(Number((t==null?void 0:t[2])??0))],r=Rs(n),i=Vo(r).hex;return{color:i,filterValue:vi(r),title:`${i} · bin ${r}`}}):[]}function Lv(e){const t={r:se(e.color_r_mean??.72),g:se(e.color_g_mean??.66),b:se(e.color_b_mean??.54)},n=Sb(t.r,t.g,t.b),r=se((e.color_l_std||.18)/.32);return[sr(n.h,n.s*.78,Math.max(.12,n.l-.28-r*.08)),sr(n.h-8,n.s*.92,Math.max(.22,n.l-.12)),sr(n.h,n.s,n.l),sr(n.h+6,n.s*.72,Math.min(.86,n.l+.16)),sr(n.h,n.s*.48,Math.min(.94,n.l+.3+r*.04))]}function qn(e=!1){if(!S.paletteSwatches)return;S.paletteSwatches.innerHTML="";const t=m.generatedMode==="selected"?Dv(m.selected):[],n=t.length?t:Lv(Ls()).map(r=>({color:r,filterValue:"",title:r}));for(const r of n){const i=document.createElement("button");i.type="button",i.className="palette-swatch",i.style.background=r.color,i.title=r.title,i.setAttribute("aria-label",`Filter by ${r.color}`),i.setAttribute("aria-pressed",r.filterValue&&m.categoryFilters.color===r.filterValue?"true":"false"),i.disabled=!r.filterValue,i.addEventListener("click",()=>{r.filterValue&&(m.categoryFilters.color=m.categoryFilters.color===r.filterValue?"":r.filterValue,window.dispatchEvent(new CustomEvent("shellspace:color-filter-changed")))}),S.paletteSwatches.append(i)}}const Uv=250;function vn({resetRenderKey:e=!1}={}){window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationTimer=0,m.neighborHydrationItems=[];for(const t of m.neighborHydrationUnsubscribers||[])t();m.neighborHydrationUnsubscribers=[],e&&(m.neighborRenderKey="")}function Wh(e,t,n=""){S.sourceImage.hidden=!1,S.sourceSpinner&&(S.sourceSpinner.hidden=!1),S.sourceImage.dataset.fallbackApplied="false",S.sourceImage.alt=n,S.sourceImage.onerror=()=>{S.sourceImage.removeAttribute("src"),S.sourceSpinner&&(S.sourceSpinner.hidden=!0)},S.sourceImage.onload=()=>{S.sourceSpinner&&(S.sourceSpinner.hidden=!0),qn(!1)},S.sourceImage.src=e}async function Fb(e,{preferFastSource:t=!1}={}){if(!e)return;const n=++m.sourceToken,r=m.selectionRun;if(window.clearTimeout(m.sourceLoadTimer),S.sourceSpinner&&(S.sourceSpinner.hidden=!1),m.uploadImageUrl&&e.id<0){Wh(m.uploadImageUrl,e,e.species);return}S.sourceImage.hidden=!0,m.sourceFrame=null,m.sourceMode="python",qn(!1);const i=S.statusLine.textContent;m.sourceLoadTimer=window.setTimeout(async()=>{if(r!==m.selectionRun||n!==m.sourceToken||m.selected!==e)return;const a=await D2(e,{priority:10});lb(i),!(r!==m.selectionRun||n!==m.sourceToken||m.selected!==e)&&(a!=null&&a.imageUrl?Wh(a.imageUrl,e,e.species):S.sourceSpinner&&(S.sourceSpinner.hidden=!0))},t?80:Uv)}function qs(){const e=[];for(const t of[m.xAxis,m.yAxis])Number.isInteger(t)&&t>=0&&!e.includes(t)&&e.push(t);return e.length?e:[0,1]}function Fv(e){var i,a;const t=(a=(i=m.model)==null?void 0:i.contour_pca_ranges)==null?void 0:a[e];if(!t)return 1;const n=Math.abs((t.p99??0)-(t.p01??0)),r=Math.abs((t.max??0)-(t.min??0));return Math.max(.001,n||r||1)}function Vs(e,t,n=null){let r=0,i=0;const a=e.contour_pc||[],o=n!=null&&n.length?n:Array.from({length:Math.min(4,a.length,t.length)},(l,u)=>u);let s=0;for(const l of o){if(l>=a.length||l>=t.length)continue;const u=(a[l]||0)-(t[l]||0);r+=u**2,i+=(u/Fv(l))**2,s+=1}return{rawSq:r,normalizedSq:i,dimensions:s}}function Wb(e){if(!e.dimensions)return 0;const t=Math.sqrt(e.normalizedSq),n=Math.sqrt(e.dimensions);return Math.max(0,Math.min(100,(1-t/n)*100))}function Wv(e,t,n){if(e.length<n){e.push(t);return}let r=0,i=e[0].distance;for(let a=1;a<e.length;a+=1)e[a].distance>i&&(i=e[a].distance,r=a);t.distance<i&&(e[r]=t)}function qv(e){return e.sort((t,n)=>t.distance-n.distance).map(t=>({distance:Math.sqrt(t.stats.rawSq),similarity:Wb(t.stats),shell:t.shell}))}function qb(e,{axes:t=null,limit:n=4,excludeId:r=null,cacheId:i=null}={}){const a=++m.neighborSearchRun;window.clearTimeout(m.neighborSearchTimer);const o=m.filtered.length?m.filtered:m.shells,s=[];let l=0;const u=()=>{var f;if(a!==m.neighborSearchRun)return;const c=performance.now()+5;for(;l<o.length&&performance.now()<c;l+=1){const g=o[l];if(g.id===r||!((f=g.contour_pc)!=null&&f.length))continue;const b=Vs(g,e,t);Wv(s,{distance:b.normalizedSq,stats:b,shell:g},n)}if(l<o.length){m.neighborSearchTimer=window.setTimeout(u,0);return}const p=qv(s);i!=null&&m.neighborCache.set(i,p),Hs(p)};m.neighborSearchTimer=window.setTimeout(u,0)}function Hs(e){const t=e.map(r=>r.shell.id).join("|");if(m.neighborRenderKey===t&&m.neighborHydrationItems.length)return;m.neighborRenderKey=t,S.neighborsList.innerHTML="",vn();const n=[];for(const r of e){const i=document.createElement("button");i.className="neighbor-button";const a=Number.isFinite(r.similarity)?r.similarity:0;i.title=`${r.shell.species} (${St(a,1)}% similar, distance ${St(r.distance,3)})`;const o=document.createElement("canvas");o.width=160,o.height=116,o.className="neighbor-contour",Vb(o,r.shell);const s=document.createElement("img");s.setAttribute("aria-label",r.shell.species),s.alt=r.shell.species,s.hidden=!0,s.onload=()=>{s.hidden=!1,o.hidden=!0};const l=document.createElement("span");l.textContent=`${Math.round(a)}%`,i.append(o,s,l),i.addEventListener("click",()=>{Cr(r.shell),Jt(r.shell)});const u=()=>Hb(r.shell,t);i.addEventListener("pointerenter",u),i.addEventListener("focus",u),S.neighborsList.append(i);const c=P2(r.shell,p=>{m.neighborRenderKey!==t||!s.isConnected||!(p!=null&&p.src)||(s.src=p.src,s.hidden=!1,o.hidden=!0)});m.neighborHydrationUnsubscribers.push(c),n.push({image:s,shell:r.shell})}m.neighborHydrationItems=n}function Vb(e,t){const n=e.getContext("2d"),r=Rb(t);if(n.clearRect(0,0,e.width,e.height),!r)return;const i=e.width/2,a=e.height/2,o=Math.min(e.width,e.height)*.4/Fs([r]),s=n.createLinearGradient(0,e.height*.22,e.width,e.height*.86);s.addColorStop(0,"#f7ead0"),s.addColorStop(1,"#c98f72"),yn(n,r,i,a,o),n.fillStyle=s,n.strokeStyle="rgba(59, 77, 76, 0.72)",n.lineWidth=2,n.fill(),n.stroke(),n.save(),yn(n,r,i,a,o),n.clip(),n.strokeStyle="rgba(255, 255, 255, 0.22)",n.lineWidth=1.1;for(let c=1;c<=2;c+=1)yn(n,r,i,a,o*(.34+c*.2)),n.stroke();n.strokeStyle="rgba(64, 44, 38, 0.1)",n.lineWidth=1;const l=Math.floor(r.length/2),u=Math.max(12,Math.floor(l/10));for(let c=0;c<l;c+=u){const p=r[c*2],f=r[c*2+1];n.beginPath(),n.moveTo(i+p*o*.25,a+f*o*.25),n.lineTo(i+p*o*.94,a+f*o*.94),n.stroke()}n.restore()}function Hb(e,t){!e||m.neighborRenderKey!==t||(window.clearTimeout(m.neighborHydrationTimer),m.neighborHydrationTimer=window.setTimeout(()=>{if(m.neighborHydrationTimer=0,m.draggingTarget){Hb(e,t);return}m.neighborRenderKey===t&&Sr(e,{priority:-5})},120))}function Vv(e,t=m.neighborToken){if(!e||t!==m.neighborToken){m.neighborRenderKey="",m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,vn(),S.neighborsList.innerHTML="";return}if(m.neighborCache.has(e.id)){Hs(m.neighborCache.get(e.id));return}qb(e.contour_pc||[],{excludeId:e.id,cacheId:e.id})}function Gb(e,t=null){if(m.neighborToken+=1,window.clearTimeout(m.neighborTimer),m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,vn({resetRenderKey:!0}),t){Hs(t);return}qb(e.slice(),{axes:qs()})}function Hv(){window.clearTimeout(m.targetNeighborTimer),m.targetNeighborTimer=0,m.targetNeighborValues=null,m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,vn({resetRenderKey:!0})}function qh(){const e=m.pendingSelectShell;m.pendingSelectShell=null,e&&Jt(e,{preferFastSource:!0})}function ki(e,t=0){m.neighborToken+=1;const n=m.neighborToken;if(window.clearTimeout(m.neighborTimer),vn({resetRenderKey:!0}),!e){m.neighborRenderKey="",m.neighborSearchRun+=1,window.clearTimeout(m.neighborSearchTimer),m.neighborSearchTimer=0,vn({resetRenderKey:!0}),S.neighborsList.innerHTML="";return}m.neighborTimer=window.setTimeout(()=>{Vv(e,n)},t)}let On=0,jb=0;function Gv(){try{const e=JSON.parse(localStorage.getItem(jo)||"[]");m.starredIds=Array.isArray(e)?e.filter(t=>Number.isFinite(Number(t))).map(Number):[]}catch{m.starredIds=[]}}function jv(){localStorage.setItem(jo,JSON.stringify(m.starredIds.slice(0,80)))}function Kb(e){return!!(e&&m.starredIds.includes(e.id))}function Xb(){if(!S.starShell)return;const e=Kb(m.selected);S.starShell.setAttribute("aria-pressed",e?"true":"false"),S.starShell.title=e?"Unstar this shape":"Star this shape",S.starShell.setAttribute("aria-label",e?"Unstar this shape":"Star this shape")}function Kv(){if(!m.selected)return;window.clearTimeout(m.neighborTimer);const e=m.selected.id,t=Kb(m.selected);m.starredIds=m.starredIds.filter(n=>n!==e),t||(m.starredIds.unshift(e),window.requestAnimationFrame(()=>{S.starShell.classList.remove("star-pop"),S.starShell.classList.add("star-pop"),Xv(),window.setTimeout(()=>S.starShell.classList.remove("star-pop"),850)})),Xb(),Oi(),window.setTimeout(jv,0)}function Xv(){var o;if(!S.starBurst||!S.starShell)return;const e=S.starShell.getBoundingClientRect(),t=(o=S.starredBand)==null?void 0:o.getBoundingClientRect(),n=e.left+e.width/2,r=e.top+e.height/2,i=t?t.left+Math.min(70,t.width*.4):n,a=t?t.top+t.height/2:r-60;S.starBurst.style.setProperty("--burst-start-x",`${n}px`),S.starBurst.style.setProperty("--burst-start-y",`${r}px`),S.starBurst.style.setProperty("--burst-end-x",`${i}px`),S.starBurst.style.setProperty("--burst-end-y",`${a}px`),S.starBurst.innerHTML="";for(let s=0;s<9;s+=1){const l=document.createElement("span");l.style.setProperty("--spark-angle",`${s*40-20}deg`),l.style.setProperty("--spark-distance",`${24+s%3*10}px`),l.style.setProperty("--spark-delay",`${s*18}ms`),S.starBurst.append(l)}S.starBurst.classList.remove("is-active"),S.starBurst.offsetWidth,S.starBurst.classList.add("is-active"),window.setTimeout(()=>S.starBurst.classList.remove("is-active"),900)}function Yv(){var i;if(m.showAllStars){const a=[];for(const o of m.starredIds){const s=Ei(o);s&&a.push({shell:s})}return{items:a,hidden:0}}const e=Math.max(44,((i=S.starredBand)==null?void 0:i.clientWidth)||0),t=[];let n=0,r=0;for(let a=0;a<m.starredIds.length;a+=1){const o=Ei(m.starredIds[a]);if(!o)continue;const s={shell:o},l=71,u=m.starredIds.length-a-1,c=u>0?54:0;if(t.length>0&&n+l+c>e){r=u+1;break}t.push(s),n+=l}return{items:t,hidden:r}}function Oi(){if(!S.starredBand)return;S.starredBand.innerHTML="",m.starredHydratedCount=0,m.starredThumbs=[];const{items:e,hidden:t}=Yv();for(const{shell:n}of e){const r=document.createElement("button");r.className="starred-shell",r.title=`${n.species} ${n.fingerprint_hash}`,r.dataset.shellId=String(n.id);const i=document.createElement("img");i.alt=n.species,r.append(i),m.starredThumbs.push({button:r,image:i,shell:n}),r.addEventListener("click",()=>{Cr(n),Jt(n)}),S.starredBand.append(r),Is(i,n)}if(t>0||m.showAllStars){const n=document.createElement("button");n.className="starred-more",n.textContent=m.showAllStars?"Less":`+${t}`,n.title=m.showAllStars?"Show fewer starred shells":"Show all starred shells",n.addEventListener("click",()=>{m.showAllStars=!m.showAllStars,Oi()}),S.starredBand.append(n)}hr(0)}async function Qv({limit:e=80,onProgress:t=null}={}){const n=[];for(const a of m.starredIds.slice(0,e)){const o=Ei(a);o!=null&&o.file&&n.push(o)}const r=n.filter(a=>!Ni(a)&&!Es(a));let i=0;for(const a of n)t&&r.includes(a)&&t({shell:a,loaded:i,total:r.length}),await L2(a,{priority:-2}),r.includes(a)&&(i+=1);return t&&r.length&&t({shell:null,loaded:i,total:r.length}),n.length}function hr(e=3e3){if(!S.starredBand)return;m.starredHydrationRun+=1;const t=m.starredHydrationRun;window.clearTimeout(m.starredHydrationTimer),m.starredHydrationTimer=window.setTimeout(()=>Zv(t),e)}async function Zv(e){if(!S.starredBand||e!==m.starredHydrationRun)return;const t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,r=m.starredThumbs.filter(({button:i})=>{const a=i.getBoundingClientRect();return a.right>=0&&a.left<=t&&a.bottom>=0&&a.top<=n}).slice(0,18);for(const{image:i,shell:a}of r){if(e!==m.starredHydrationRun)return;if(!(!i||!a)){if(await Jv(),e!==m.starredHydrationRun||!i.isConnected)return;Is(i,a)&&(m.starredHydratedCount+=1)}}}function Jv(){return new Promise(e=>{"requestIdleCallback"in window?window.requestIdleCallback(e,{timeout:300}):window.setTimeout(e,80)})}function e$(e){jb=e.clientX,!On&&(On=window.requestAnimationFrame(t$))}function t$(){if(On=0,!S.starredBand||!m.starredThumbs.length)return;const e=S.starredBand.getBoundingClientRect();for(const{button:t}of m.starredThumbs){const n=e.left+t.offsetLeft+t.offsetWidth/2,r=Math.max(0,1-Math.abs(jb-n)/118),i=r*r*(3-2*r);t.style.setProperty("--dock-scale",(1+i*1.08).toFixed(3)),t.style.setProperty("--dock-lift",`${(18*i).toFixed(2)}px`),t.style.setProperty("--dock-z",`${Math.round(i*100)}`)}}function Vh(){if(S.starredBand){On&&(window.cancelAnimationFrame(On),On=0);for(const{button:e}of m.starredThumbs)e.style.setProperty("--dock-scale","1"),e.style.setProperty("--dock-lift","0px"),e.style.setProperty("--dock-z","0")}}function go(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_key)||(e==null?void 0:e.location_key)||"unknown"}function Ho(e){var t;return Ub((e==null?void 0:e.countries_top)||((t=e==null?void 0:e.enrichment)==null?void 0:t.countries_top)||"")}function n$(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_label)||(e==null?void 0:e.region_label)||(e==null?void 0:e.location_label)||"Unknown"}function r$(e,t){var i,a,o,s;if(!t)return!0;const[n,r]=t.split(":");if(!r)return go(e)===t;if(n==="country-search"){const l=r.trim().toLowerCase();return l?String((e==null?void 0:e.location_label)||"").toLowerCase().includes(l)||(((i=e==null?void 0:e.species_traits)==null?void 0:i.known_range_countries)||[]).some(u=>`${u.label||""} ${u.code||""}`.toLowerCase().includes(l))||Ho(e).some(u=>Ov(u.code).includes(l)):!0}return n==="region"?((a=e==null?void 0:e.species_traits)==null?void 0:a.region_key)===r||(e==null?void 0:e.region_key)===r||(e==null?void 0:e.location_key)===r||go(e)===r:n==="country"?(e==null?void 0:e.location_key)===r||((o=e==null?void 0:e.species_traits)==null?void 0:o.primary_country)===r||(((s=e==null?void 0:e.species_traits)==null?void 0:s.known_range_countries)||[]).some(l=>l.code===r)||Ho(e).some(l=>l.code===r):go(e)===t}function i$(e){const t=String(e||"").trim().toLowerCase();return t&&!["unknown","not assessed","data deficient","locality unavailable"].includes(t)}function a$(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}:null}function Yb(e){return Array.isArray(e.color_palette_rgb)&&e.color_palette_rgb.length?e.color_palette_rgb.map(t=>[Number((t==null?void 0:t[0])??0)*255,Number((t==null?void 0:t[1])??0)*255,Number((t==null?void 0:t[2])??0)*255]).filter(t=>t.every(n=>Number.isFinite(n))):[]}function o$(e,t){const n=a$(t);if(!n)return 1/0;const r=Yb(e);if(r.length)return Math.min(...r.map(l=>{const u=l[0]-n.r,c=l[1]-n.g,p=l[2]-n.b;return Math.sqrt(u*u+c*c+p*p)}));if(e.color_r_mean==null||e.color_g_mean==null||e.color_b_mean==null)return null;const i=mb(e),a=i[0]-n.r,o=i[1]-n.g,s=i[2]-n.b;return Math.sqrt(a*a+o*o+s*s)}function s$(e,t){if(!t)return!0;const n=Ib(t);if(n!=null)return gv(e,n);const r=o$(e,t);return r==null?!0:r<=42}function Qb(e,t){var n;return t==="lightness"?e.color_l_mean==null?null:se(e.color_l_mean):t==="area"?e.area==null||e.image_width==null||e.image_height==null?null:J2(e):t==="concavity"?e.contour_concavity==null?null:se(e.contour_concavity/.32):t==="roughness"?((n=e.morph_traits)==null?void 0:n.roughness)==null?null:se(e.morph_traits.roughness):null}function Gs(){return Ko.filter(e=>m.shells.some(t=>Qb(t,e.key)!=null))}function Zb(){const e=new Set;for(const t of m.shells){const n=t.rarity_label;i$(n)&&e.add(n)}return ju.filter(t=>e.has(t)).concat([...e].filter(t=>!ju.includes(t)).sort())}function Jb(){return Bs(m.shells).length>0||m.shells.some(e=>Yb(e).length||e.color_r_mean!=null&&e.color_g_mean!=null&&e.color_b_mean!=null&&Number.isFinite(Number(e.color_r_mean))&&Number.isFinite(Number(e.color_g_mean))&&Number.isFinite(Number(e.color_b_mean)))}function ey(){return Bs(m.shells)}function l$(e){if(!e)return"Any";const t=Ib(e),n=t==null?null:Bs(m.shells).find(r=>r.bin===t);return(n==null?void 0:n.hex)||e}function Hh(e){for(const t of Gs()){const n=m.morphFilters.get(t.key);if(!n)continue;const r=Qb(e,t.key);if(r!=null&&(r<n.min||r>n.max))return!1}return!(m.categoryFilters.rarity&&e.rarity_label!==m.categoryFilters.rarity||m.categoryFilters.origin&&!r$(e,m.categoryFilters.origin)||m.categoryFilters.color&&!s$(e,m.categoryFilters.color))}function $n(){var t;const e=S.search.value.trim().toLowerCase();m.filtered=e?m.shells.filter(n=>`${n.name} ${n.species} ${n.file} ${n.fingerprint_hash||""} ${n.legacy_fingerprint_hash||""} ${n.location_label||""}`.toLowerCase().includes(e)&&Hh(n)):m.shells.filter(Hh),m.scatterHitCache=null,m.scatterPointCache=null,h1(),bf(),ki(m.selected),qn(!1),S.statusLine&&((t=m.model)!=null&&t.processed_count)&&(S.statusLine.textContent=`${m.filtered.length.toLocaleString()} of ${m.model.processed_count.toLocaleString()} shells`),ty(),Fe(120)}function ty(){if(!S.filtersToggle)return;let e=0;for(const t of Gs()){const n=m.morphFilters.get(t.key);n&&(n.min>0||n.max<1)&&(e+=1)}for(const t of Object.values(m.categoryFilters))t&&(e+=1);S.filtersToggle.textContent=e?`Filters (${e})`:"Filters",S.filtersToggle.classList.toggle("is-active",e>0)}function ny(){return[...ry().countries.map(e=>[e.value,e.label])]}function ry(){var n,r,i,a,o,s;const e=new Map,t=new Map;if(m.originFilterOptionsCache)return m.originFilterOptionsCache;for(const l of m.shells){const u=((n=l.species_traits)==null?void 0:n.region_key)||l.region_key||"",c=((r=l.species_traits)==null?void 0:r.region_label)||l.region_label||"";if(u&&u!=="unknown"){const f=`region:${u}`,g=e.get(f)||{value:f,key:u,label:c||n$(l),count:0};g.count+=1,e.set(f,g)}for(const f of((i=l.species_traits)==null?void 0:i.known_range_countries)||[]){if(!f.code||!f.label)continue;const g=`country:${f.code}`,b=t.get(g)||{value:g,code:f.code,label:mo(f.code)||f.label,region:((a=l.species_traits)==null?void 0:a.region_key)||"",count:0};b.count+=Math.max(1,Number(f.count||0)),t.set(g,b)}for(const f of Ho(l)){const g=`country:${f.code}`,b=mo(f.code);if(!b)continue;const x=t.get(g)||{value:g,code:f.code,label:b,region:"",count:0};x.count+=f.count,t.set(g,x)}const p=l.location_key||"";if(p&&p!=="unknown"&&p.length<=3){const f=`country:${p}`,g=t.get(f)||{value:f,code:p,label:mo(p)||((o=l.location_label)==null?void 0:o.split(",")[0])||p,region:((s=l.species_traits)==null?void 0:s.region_key)||"",count:0};g.count+=1,t.set(f,g)}}return m.originFilterOptionsCache={regions:[...e.values()].sort((l,u)=>l.label.localeCompare(u.label)),countries:[...t.values()].sort((l,u)=>l.label.localeCompare(u.label)||l.code.localeCompare(u.code))},m.originFilterOptionsCache}function u$(){var c;const e=document.createElement("label");e.className="filter-row filter-panel-card filter-select-row filter-origin-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Country";const r=document.createElement("output");r.textContent=c$(m.categoryFilters.origin),t.append(n,r);const i=document.createElement("input"),a=document.createElement("datalist"),o=ny(),s=new Map(o.map(([p,f])=>[f.toLowerCase(),p])),l=new Map(o),u="country-filter-options";a.id=u,i.type="search",i.placeholder="Search country",i.setAttribute("aria-label","Country"),i.setAttribute("list",u);for(const[p,f]of o){const g=document.createElement("option");g.value=f,g.label=p.replace(/^country:/,""),g.textContent=f,a.append(g)}(c=m.categoryFilters.origin)!=null&&c.startsWith("country-search:")?i.value=m.categoryFilters.origin.slice(15):m.categoryFilters.origin&&(i.value=l.get(m.categoryFilters.origin)||""),i.addEventListener("input",()=>{const p=i.value.trim();m.categoryFilters.origin=p?s.get(p.toLowerCase())||`country-search:${p}`:"",$n()}),e.append(t,i,a),S.filterControls.append(e)}function d$(){const e=Zb();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card rarity-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Rarity";const i=document.createElement("output");i.textContent=m.categoryFilters.rarity||"Any",n.append(r,i);const a=document.createElement("div");a.className="rarity-filter-options";for(const o of e){const s=document.createElement("button");s.type="button",s.textContent=o||"Any",s.setAttribute("aria-pressed",(m.categoryFilters.rarity||"")===o?"true":"false"),s.addEventListener("click",()=>{m.categoryFilters.rarity=m.categoryFilters.rarity===o?"":o,Vn(),$n()}),a.append(s)}t.append(n,a),S.filterControls.append(t)}function c$(e){if(!e)return"Any";if(e.startsWith("country-search:"))return e.slice(15);const t=ry(),n=[...t.regions,...t.countries].find(r=>r.value===e);return(n==null?void 0:n.label)||"Any"}function p$(e){m.morphFilters.set(e.key,m.morphFilters.get(e.key)||{min:0,max:1});const t=document.createElement("div");t.className=`filter-row filter-panel-card filter-range-row filter-${e.key}-row`;const n=document.createElement("header"),r=document.createElement("span");r.textContent=e.label;const i=document.createElement("output"),a=m.morphFilters.get(e.key),o=Gu.find(l=>Math.abs(a.min-l.min)<.01&&Math.abs(a.max-l.max)<.01);i.textContent=(o==null?void 0:o.label)||"Any",n.append(r,i);const s=document.createElement("div");s.className="filter-levels";for(const l of Gu){const u=document.createElement("button");u.type="button",u.dataset.level=l.key,u.textContent=l.label,u.title=`${e.label}: ${l.label}`;const c=(o==null?void 0:o.key)===l.key;u.setAttribute("aria-pressed",c?"true":"false"),u.addEventListener("click",()=>{const p=u.getAttribute("aria-pressed")==="true";m.morphFilters.set(e.key,p?{min:0,max:1}:{min:l.min,max:l.max}),Vn(),$n()}),s.append(u)}t.append(n,s),S.filterControls.append(t)}function h$(){if(!Jb())return;const e=ey();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card color-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Color";const i=document.createElement("output");i.textContent=l$(m.categoryFilters.color),n.append(r,i);const a=document.createElement("div");a.className="color-filter-panel";const o=document.createElement("div");o.className="color-swatch-filter";const l=[12,11,10,9,8,7,6,5].find(u=>e.length>=u&&e.length%u<=1)||Math.min(10,Math.max(5,Math.ceil(Math.sqrt(e.length*1.4))));o.style.setProperty("--color-filter-columns",String(l));for(const{bin:u,hex:c,count:p,weight:f}of e){const g=vi(u),b=document.createElement("button");b.type="button",b.title=`${c} · bin ${u} · ${p} shells · weight ${f.toFixed(2)}`,b.setAttribute("aria-label",`${c} color bin`),b.setAttribute("aria-pressed",m.categoryFilters.color===g?"true":"false"),b.style.setProperty("--swatch",c);const x=document.createElement("span");x.className="color-swatch-dot",b.append(x),b.addEventListener("click",()=>{m.categoryFilters.color=m.categoryFilters.color===g?"":g,Vn(),$n()}),o.append(b)}a.append(o),t.append(n,a),S.filterControls.append(t)}function Vn(){if(!S.filterControls)return;S.filterControls.innerHTML="";const e=ny(),t=Zb(),n=Gs();m.categoryFilters.origin&&!m.categoryFilters.origin.startsWith("country-search:")&&!e.some(([i])=>i===m.categoryFilters.origin)&&(m.categoryFilters.origin=""),t.includes(m.categoryFilters.rarity)||(m.categoryFilters.rarity="");const r=ey().filter(i=>i.count>0);m.categoryFilters.color&&!r.some(i=>vi(i.bin)===m.categoryFilters.color)&&(m.categoryFilters.color=""),Jb()||(m.categoryFilters.color="");for(const i of Ko)n.includes(i)||m.morphFilters.set(i.key,{min:0,max:1});e.length&&u$(),d$(),h$();for(const i of n)m.morphFilters.has(i.key)||m.morphFilters.set(i.key,{min:0,max:1}),p$(i);ty()}function f$(){for(const e of Ko)m.morphFilters.set(e.key,{min:0,max:1});m.categoryFilters={origin:"",rarity:"",color:""},Vn(),$n()}function Ti(){var f;if(!S.filtersPanel||!S.filtersToggle||S.filtersPanel.hidden)return;const e=window.innerWidth||document.documentElement.clientWidth||1024,t=window.innerHeight||document.documentElement.clientHeight||768,n=S.filtersToggle.getBoundingClientRect(),r=(f=S.controlsPanel)==null?void 0:f.getBoundingClientRect(),i=r?e-r.right-24:0,a=e>1080&&i>=520,o=a?Math.min(460,i):Math.min(460,Math.max(340,e-24)),s=a?r.right+12:n.left,l=Math.max(12,Math.min(s,e-o-12)),u=S.filtersPanel.offsetHeight||420,c=a?n.top:n.bottom+8,p=Math.max(12,Math.min(c,t-Math.min(u,t-24)-12));S.filtersPanel.style.setProperty("--filters-left",`${Math.round(l)}px`),S.filtersPanel.style.setProperty("--filters-top",`${Math.round(p)}px`),S.filtersPanel.style.setProperty("--filters-width",`${Math.round(o)}px`)}function bo(e){!S.filtersPanel||!S.filtersToggle||(S.filtersPanel.hidden=!e,S.filtersToggle.setAttribute("aria-expanded",e?"true":"false"),e&&(Ti(),window.requestAnimationFrame(Ti)))}const js="shellspace-pca-axis-names";function m$(){try{const e=JSON.parse(localStorage.getItem(js)||"[]");m.pcaAxisNames=Array.isArray(e)?e.map(t=>String(t||"")):[]}catch{m.pcaAxisNames=[]}}function g$(){try{localStorage.setItem(js,JSON.stringify(m.pcaAxisNames||[]))}catch{}}function Gh(e){return m.shellById.get(Number(e))||null}function b$(e,t,n){const r=m.selectionRun,i=()=>{!e.isConnected||r!==m.selectionRun||U2(e,n,{priority:-10}).then(a=>{!a&&e.isConnected&&(e.hidden=!0,t.hidden=!1)})};if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(i,{timeout:800});return}window.setTimeout(i,350)}function jh(e){const t=document.createElement("button");t.type="button",t.className="pca-guide-shell",t.title=(e==null?void 0:e.species)||"";const n=document.createElement("span");n.className="pca-guide-shell-frame";const r=document.createElement("img");r.alt=(e==null?void 0:e.species)||"",r.loading="eager",r.decoding="async",r.hidden=!0;const i=document.createElement("canvas");if(i.width=148,i.height=104,e&&Vb(i,e),r.onload=()=>{r.hidden=!1,i.hidden=!0},r.onerror=()=>{r.hidden=!0,i.hidden=!1},e){const a=Is(r,e);a&&!r.hidden&&(i.hidden=!0),a||b$(r,i,e)}return n.append(r,i),t.append(n),t.addEventListener("click",()=>{e&&(Cr(e),Jt(e),ii())}),t}function y$(e){var l;const t=Gh(e.low_shell_id),n=Gh(e.high_shell_id),r=document.createElement("article");r.className="pca-guide-row";const i=document.createElement("div");i.className="pca-guide-row-header";const a=document.createElement("h3"),o=`PC${e.axis+1}`;a.textContent=((l=m.pcaAxisNames)==null?void 0:l[e.axis])||o,a.contentEditable="true",a.spellcheck=!1,a.setAttribute("role","textbox"),a.setAttribute("aria-label",`Name ${o}`),a.addEventListener("input",()=>{const u=a.textContent.trim();m.pcaAxisNames[e.axis]=u===o?"":u,g$(),t3()}),a.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),a.blur())}),a.addEventListener("blur",()=>{a.textContent.trim()||(a.textContent=o)}),i.append(a);const s=document.createElement("div");return s.className="pca-guide-shells",s.append(jh(t),jh(n)),r.append(i,s),r}function w$(){var t;if(!S.pcaGuideList)return;const e=((t=m.model)==null?void 0:t.contour_pca_diametric_pairs)||[];if(S.pcaGuideList.innerHTML="",!e.length){const n=document.createElement("p");n.className="pca-guide-empty",n.textContent="No PCA contrast pairs are available yet.",S.pcaGuideList.append(n);return}for(const n of e.slice(0,6))S.pcaGuideList.append(y$(n))}function _$(){w$(),S.pcaGuideModal&&(S.pcaGuideModal.hidden=!1)}function ii(){S.pcaGuideModal&&(S.pcaGuideModal.hidden=!0)}function x$(e,t,n,r){let i=0,a=0,o=0,s=t,l=n,u=0,c=0;for(let C=0;C<e.length;C+=1){if(!e[C])continue;const I=C%t,M=Math.floor(C/t);i+=1,a+=I,o+=M,s=Math.min(s,I),l=Math.min(l,M),u=Math.max(u,I),c=Math.max(c,M)}if(i<32)throw new Error("The uploaded shell mask is too small.");const p=a/i,f=o/i,g=Math.ceil(Math.hypot(Math.max(p,t-p),Math.max(f,n-f)))+2,b=[],x=[];for(let C=0;C<r;C+=1){const I=-Math.PI/2+C/r*Math.PI*2,M=Math.cos(I),A=Math.sin(I);let $=p,O=f,L=0;for(let H=0;H<=g;H+=.75){const K=Math.round(p+M*H),X=Math.round(f+A*H);if(K<0||K>=t||X<0||X>=n)break;e[X*t+K]&&($=K,O=X,L=H)}b.push([$,O]),x.push(L)}const T=x.reduce((C,I)=>C+I,0)/Math.max(1,x.length),w=new Float32Array(r*2);for(let C=0;C<r;C+=1)w[C*2]=(b[C][0]-p)/Math.max(1e-6,T),w[C*2+1]=(b[C][1]-f)/Math.max(1e-6,T);let v=0;for(let C=0;C<x.length;C+=1)v+=Math.abs(x[C]-x[(C+1)%x.length]);const E=Math.max(1,(u-s+1)*(c-l+1));return{contour:w,center:[p,f],meanRadius:T,area:i,bbox:[s,l,u,c],aspectRatio:Math.max((u-s+1)/Math.max(1,c-l+1),(c-l+1)/Math.max(1,u-s+1)),roughness:v/Math.max(1e-6,T*x.length),concavity:se(1-i/E)}}function v$(e,t,n){const{data:r,width:i,height:a}=e,o=new Float32Array(i*a),s=[],l=[],u=[];let c=0,p=0,f=0,g=0,b=0,x=0,T=0,w=0,v=0;for(let ie=0;ie<i*a;ie+=1){const F=ie*4;o[ie]=(.2126*r[F]+.7152*r[F+1]+.0722*r[F+2])/255}for(let ie=0;ie<t.length;ie+=1){if(!t[ie])continue;const F=ie*4,re=r[F],U=r[F+1],G=r[F+2],Y=p2(re,U,G),V=Math.max(re,U,G)/255,_e=Math.min(re,U,G)/255,Ve=V<=0?0:(V-_e)/V,Ie=Math.atan2(Math.sqrt(3)*(U-G),2*re-U-G),Be=Math.max(Ve,.05);c+=re/255,p+=U/255,f+=G/255,g+=Y.l,b+=Y.a,x+=Y.b,T+=Math.sin(Ie)*Be,w+=Math.cos(Ie)*Be,v+=Be,s.push(Y.l),l.push(Math.hypot(Y.a,Y.b)),u.push(Ve)}const E=Math.max(1,s.length),C=ie=>ie.reduce((F,re)=>F+re,0)/Math.max(1,ie.length),I=(ie,F)=>Math.sqrt(ie.reduce((re,U)=>re+(U-F)**2,0)/Math.max(1,ie.length)),M=C(s),A=C(l),$=C(u),O=[...s].sort((ie,F)=>ie-F);let L=0,H=[];for(let ie=1;ie<a-1;ie+=1)for(let F=1;F<i-1;F+=1){const re=ie*i+F;if(!t[re])continue;const U=o[re+1]-o[re-1],G=o[re+i]-o[re-i],Y=(o[re-i]+o[re+i]+o[re-1]+o[re+1]+o[re])/5;L+=Math.hypot(U,G),H.push(o[re]-Y)}const K=C(H),X=I(H,K),P=Mh(O,.75)-Mh(O,.25),Z=se((I(s,M)*1.7+I(l,A)*2.2+I(u,$)*.9+X*10+P*1.2+se(L/Math.max(1,H.length)/1.5))/6),W=se((I(s,M)*2+X*12+P*1.3)/3),te=se((I(l,A)*2.6+I(u,$)*1.2)/2);return{visible_shell_ratio:1,mask_ratio:n.area/Math.max(1,i*a),area:n.area,center:n.center,bbox:n.bbox,mean_radius:n.meanRadius,image_width:i,image_height:a,roughness:n.roughness,aspect_ratio:n.aspectRatio,contour_solidity:1-n.concavity,contour_concavity:n.concavity,color_r_mean:c/E,color_g_mean:p/E,color_b_mean:f/E,color_l_mean:g/E,color_l_std:I(s,M),color_a_mean:b/E,color_b_lab_mean:x/E,color_chroma_mean:A,color_chroma_std:I(l,A),color_saturation_mean:$,color_saturation_std:I(u,$),color_hue_sin:T/Math.max(1,v),color_hue_cos:w/Math.max(1,v),texture_gradient_mean:L/Math.max(1,H.length),texture_residual_std:X,texture_luma_iqr:P,color_pattern_strength:Z,color_pattern_contrast:W,color_pattern_chroma:te}}function $$(e,t){const n=Number(t||0);return e==="aspect_ratio"?Math.log1p(Math.max(0,n)):["roughness","contour_concavity","texture_gradient_mean","texture_residual_std","color_pattern_strength","color_pattern_contrast","color_pattern_chroma"].includes(e)?Math.log1p(Math.max(0,n)*64):n}function S$(e){const t=m.model.trait_feature_schema||[],n=m.model.trait_mean||[],r=m.model.trait_components||[];if(!t.length||!r.length)return[];const i=t.map((a,o)=>{var l;let s=0;if(String(a.name||"").startsWith("contour_pc")){const u=Number(String(a.name).replace("contour_pc",""))-1;s=((l=e.contour_pc)==null?void 0:l[u])||0}else s=$$(a.name,e[a.name]);return(s-(a.mean||0))/Math.max(1e-9,a.scale||1)*(a.weight||1)-(n[o]||0)});return r.map(a=>a.reduce((o,s,l)=>o+(i[l]||0)*s,0))}async function k$(){var t;const e=(t=S.uploadInput.files)==null?void 0:t[0];if(e)try{const n=await S2(e),r=x$(n.mask,n.imageData.width,n.imageData.height,m.contourPoints||256);r.contour=n.contour;const i=v$(n.imageData,n.mask,r),a={id:-Date.now(),file:e.name,name:`Uploaded shell ${e.name}`,species:"Uploaded shell",specimen:"",specimen_label:"Bring your own shell",view:"",view_label:"Uploaded image",component_count:1,contour_pc:Pb(n.fingerprint),upload_contour:r.contour,fingerprint:n.fingerprint,...i};a.trait_pc=S$(a),a.morph_traits=Tb(a),a.fingerprint_hash=await Nb(n.fingerprint),a.species_sample_count=1,a.rarity_label="Data deficient",a.rarity_reason="uploaded image",a.location_label="Uploaded image",a.location_key="uploaded",a.location_color=wi("uploaded"),a.species_color=wi(a.species),m.uploadImageUrl&&URL.revokeObjectURL(m.uploadImageUrl),m.uploadImageUrl=n.imageUrl||URL.createObjectURL(e),m.shells=[a,...m.shells.filter(o=>o.id>=0)],m.filtered=[a,...m.filtered.filter(o=>o.id>=0)],m.shellById.set(a.id,a),Cr(a),Jt(a),S.statusLine.textContent="Uploaded shell projected"}catch(n){S.statusLine.textContent=n.message||"Upload failed"}finally{S.uploadInput.value=""}}const Ks="shellspace-show-popped-shells";let _r=!1,fr=!1,Rt=[];function iy(e){var t,n,r;_r=!!e,fr=!1,Rt=[],(t=S.drawProjectedShell)==null||t.setAttribute("aria-pressed",_r?"true":"false"),(r=(n=S.outline)==null?void 0:n.parentElement)==null||r.classList.toggle("is-drawing",_r)}function Kh(e){const t=S.outline.getBoundingClientRect();return{x:(e.clientX-t.left)/Math.max(1,t.width)*S.outline.width,y:(e.clientY-t.top)/Math.max(1,t.height)*S.outline.height}}function Xh(){if(Ri(),Rt.length<2)return;const e=S.outline.getContext("2d");e.save(),e.lineWidth=4,e.lineCap="round",e.lineJoin="round",e.strokeStyle="#c65d4b",e.beginPath(),e.moveTo(Rt[0].x,Rt[0].y);for(const t of Rt.slice(1))e.lineTo(t.x,t.y);e.stroke(),e.restore()}function T$(e,t=256){if(e.length<8)return null;const n=[...e,e[0]],r=[0];for(let c=1;c<n.length;c+=1){const p=n[c-1],f=n[c];r[c]=r[c-1]+Math.hypot(f.x-p.x,f.y-p.y)}const i=r.at(-1)||0;if(i<=1e-6)return null;const a=new Float32Array(t*2);let o=1;for(let c=0;c<t;c+=1){const p=c/t*i;for(;o<r.length-1&&r[o]<p;)o+=1;const f=n[o-1],g=n[o],b=Math.max(1e-6,r[o]-r[o-1]),x=(p-r[o-1])/b;a[c*2]=f.x+(g.x-f.x)*x,a[c*2+1]=f.y+(g.y-f.y)*x}let s=0,l=0;for(let c=0;c<t;c+=1)s+=a[c*2],l+=a[c*2+1];s/=t,l/=t;let u=0;for(let c=0;c<t;c+=1)a[c*2]-=s,a[c*2+1]-=l,u+=a[c*2]**2+a[c*2+1]**2;if(u=Math.sqrt(u/t),u<=1e-6)return null;for(let c=0;c<a.length;c+=1)a[c]/=u;return a}function C$(e,t=32){const n=Math.floor(e.length/2),r=new Float32Array(t*4);for(let i=1;i<=t;i+=1){let a=0,o=0,s=0,l=0;for(let c=0;c<n;c+=1){const p=e[c*2]||0,f=e[c*2+1]||0,g=Math.PI*2*i*c/n,b=Math.cos(g),x=Math.sin(g);a+=p*b+f*x,o+=f*b-p*x,s+=p*b-f*x,l+=f*b+p*x}const u=(i-1)*4;r[u]=a/n,r[u+1]=o/n,r[u+2]=s/n,r[u+3]=l/n}return r}function E$(){var r,i;const e=T$(Rt,m.contourPoints||256);if(!e)return;const t=C$(e,Math.floor((((i=(r=m.model)==null?void 0:r.fingerprint_mean)==null?void 0:i.length)||128)/4)),n=Pb(t);n.length&&(Bi(n),Gb(n),iy(!1))}function Xs(e=!0){m.walkingPca=!1,window.cancelAnimationFrame(m.walkFrame),S.walkPca.textContent="Walk",S.walkPca.setAttribute("aria-pressed","false"),e&&Qt()}function ay(e){if(!m.walkingPca)return;m.walkStartedAt||(m.walkStartedAt=e);const t=(e-m.walkStartedAt)/1e3,n=[...m.pcValues];for(let r=0;r<kr();r+=1){const i=m.model.contour_pca_ranges[r],a=i?i.p99-i.p01:1;n[r]=Math.sin(t*(.32+r*.045)+r*1.73)*a*(.18+r*.018)}Bi(n,!1),m.walkFrame=window.requestAnimationFrame(ay)}function I$(){if(m.walkingPca){Xs();return}m.walkingPca=!0,m.walkStartedAt=0,S.walkPca.textContent="Stop",S.walkPca.setAttribute("aria-pressed","true"),m.walkFrame=window.requestAnimationFrame(ay)}function z$(){Xs(!1),Bi(Array.from({length:m.model.contour_component_count||kr()},()=>0))}function yo(e){!S.settingsPanel||!S.settingsToggle||(S.settingsPanel.hidden=!e,S.settingsToggle.setAttribute("aria-expanded",e?"true":"false"))}function M$(){if(window.confirm("Clear saved shell images, starred shells, and local settings?")){I2();try{localStorage.removeItem(jo),localStorage.removeItem(Ks),localStorage.removeItem(js)}catch{}window.location.hash="",window.location.reload()}}function A$(){let e=!0;try{e=localStorage.getItem(Ks)!=="false"}catch{e=!0}m.showPoppedShells=e,S.showPoppedShells&&(S.showPoppedShells.checked=e)}function N$(){var e,t,n,r,i,a,o,s,l,u,c,p,f,g,b,x,T;A$(),S.search.addEventListener("input",$n),(e=S.filtersToggle)==null||e.addEventListener("click",()=>{var w;return bo(((w=S.filtersPanel)==null?void 0:w.hidden)!==!1)}),(t=S.pcaGuideOpen)==null||t.addEventListener("click",_$),(n=S.pcaGuideClose)==null||n.addEventListener("click",ii),(i=(r=S.pcaGuideModal)==null?void 0:r.querySelector(".pca-guide-backdrop"))==null||i.addEventListener("click",ii),(a=S.closeFilters)==null||a.addEventListener("click",()=>bo(!1)),(o=S.settingsToggle)==null||o.addEventListener("click",w=>{var v;w.stopPropagation(),yo(((v=S.settingsPanel)==null?void 0:v.hidden)!==!1)}),(s=S.settingsPanel)==null||s.addEventListener("click",w=>w.stopPropagation()),(l=S.clearAllData)==null||l.addEventListener("click",M$),(u=S.showPoppedShells)==null||u.addEventListener("change",()=>{m.showPoppedShells=!!S.showPoppedShells.checked;try{localStorage.setItem(Ks,m.showPoppedShells?"true":"false")}catch{}Fe()}),document.addEventListener("keydown",w=>{w.key==="Escape"&&(bo(!1),yo(!1),ii())}),document.addEventListener("click",()=>{yo(!1)}),S.randomShell.addEventListener("click",G$),(c=S.resetTraitFilters)==null||c.addEventListener("click",f$),S.xAxisSelect.addEventListener("change",()=>rf(Number(S.xAxisSelect.value),m.yAxis)),S.yAxisSelect.addEventListener("change",()=>rf(m.xAxis,Number(S.yAxisSelect.value))),S.colorModeSelect.addEventListener("change",()=>{m.colorMode=S.colorModeSelect.value,gb(),Fe(),Qt()}),window.addEventListener("shellspace:color-filter-changed",()=>{Vn(),$n()}),S.meanShape.addEventListener("click",z$),S.walkPca.addEventListener("click",I$),S.starShell.addEventListener("click",Kv),(p=S.sourceInspectToggle)==null||p.addEventListener("click",()=>sy(!m.sourceInspectOpen)),(f=S.sourceCursorToggle)==null||f.addEventListener("click",()=>R$(!m.sourceCursorActive)),(g=S.drawProjectedShell)==null||g.addEventListener("click",()=>iy(!_r)),S.outline.addEventListener("pointerdown",w=>{!_r||w.button!==0||(w.preventDefault(),fr=!0,Rt=[Kh(w)],S.outline.setPointerCapture(w.pointerId),Xh())}),S.outline.addEventListener("pointermove",w=>{if(!fr)return;w.preventDefault();const v=Kh(w),E=Rt.at(-1);E&&Math.hypot(v.x-E.x,v.y-E.y)<2.5||(Rt.push(v),Xh())});for(const w of["pointerup","pointercancel"])S.outline.addEventListener(w,v=>{if(fr){v.preventDefault();try{S.outline.releasePointerCapture(v.pointerId)}catch{}fr=!1,w==="pointerup"?E$():Ri()}});S.uploadShell.addEventListener("click",()=>S.uploadInput.click()),S.uploadInput.addEventListener("change",k$),S.exportSvg.addEventListener("click",Rv),(b=S.starredBand)==null||b.addEventListener("pointermove",e$),(x=S.starredBand)==null||x.addEventListener("pointerleave",()=>{Vh(),hr(1200)}),(T=S.starredBand)==null||T.addEventListener("pointercancel",Vh),S.zoomIn.addEventListener("click",()=>wo(.72)),S.zoomOut.addEventListener("click",()=>wo(1.38)),S.resetView.addEventListener("click",()=>{m.viewport=Pi(m.xAxis,m.yAxis),Fe()}),S.scatter.addEventListener("wheel",w=>{if(w.preventDefault(),hr(1800),w.shiftKey){const v=S.scatter.getBoundingClientRect();wo(w.deltaY>0?1.12:.88,{x:w.clientX-v.left,y:w.clientY-v.top});return}Z$(w.deltaX,w.deltaY)}),S.scatter.addEventListener("pointerdown",w=>{if(w.button===1){w.preventDefault(),S.scatter.setPointerCapture(w.pointerId),F$(w);return}if(w.button!==0)return;m.holdingNearest=!0;const v=S.scatter.getBoundingClientRect(),E=Go(w.clientX-v.left,w.clientY-v.top);m.pendingSelectShell=E,E?ki(E,16):(m.draggingTarget=!0,m.targetDragStart={pointerId:w.pointerId,clientX:w.clientX,clientY:w.clientY,active:!1,ignoreRealShells:!0},S.pointTooltip.hidden=!0)}),S.scatter.addEventListener("pointermove",w=>{if(m.panningViewport){w.preventDefault(),W$(w);return}if(m.draggingTarget){const v=m.targetDragStart;if(v&&!v.active){if(Math.hypot(w.clientX-v.clientX,w.clientY-v.clientY)<4)return;v.active=!0}Zh(w),S.pointTooltip.hidden=!0;return}if(m.holdingNearest){S.pointTooltip.hidden=!0;return}H$(w)}),S.scatter.addEventListener("mousedown",w=>{if(w.button!==0||m.draggingTarget||m.holdingNearest||m.panningViewport)return;m.holdingNearest=!0;const v=S.scatter.getBoundingClientRect(),E=Go(w.clientX-v.left,w.clientY-v.top);m.pendingSelectShell=E,E?ki(E,16):(m.draggingTarget=!0,m.targetDragStart={pointerId:-1,clientX:w.clientX,clientY:w.clientY,active:!1,ignoreRealShells:!0},S.pointTooltip.hidden=!0)}),S.scatter.addEventListener("mousemove",w=>{if(!m.draggingTarget||(w.buttons&1)!==1)return;const v=m.targetDragStart;if(v&&!v.active){if(Math.hypot(w.clientX-v.clientX,w.clientY-v.clientY)<4)return;v.active=!0}Zh(w),S.pointTooltip.hidden=!0});for(const w of["pointerup","pointercancel"])S.scatter.addEventListener(w,v=>{var I,M,A;const E=w==="pointerup"&&m.draggingTarget&&!((I=m.targetDragStart)!=null&&I.active);Jh(),E&&Ci(v);const C=w==="pointerup";m.holdingNearest=!1,m.draggingTarget=!1,m.targetDragStart=null,m.targetEvent=null,q$(),C?qh():m.pendingSelectShell=null;try{(A=(M=S.scatter).hasPointerCapture)!=null&&A.call(M,v.pointerId)&&S.scatter.releasePointerCapture(v.pointerId)}catch{}w!=="pointerup"&&(S.pointTooltip.hidden=!0)});window.addEventListener("mouseup",w=>{var E;if(!m.holdingNearest&&!m.draggingTarget)return;const v=m.draggingTarget&&!((E=m.targetDragStart)!=null&&E.active);Jh(),v&&Ci(w),m.holdingNearest=!1,m.draggingTarget=!1,m.targetDragStart=null,m.targetEvent=null,qh()}),S.scatter.addEventListener("pointerleave",()=>{m.draggingTarget||m.panningViewport||(S.pointTooltip.hidden=!0)}),S.scatter.addEventListener("auxclick",w=>{w.button===1&&w.preventDefault()}),window.addEventListener("resize",()=>{Fe(),Fb(m.selected),qn(),Oi(),Ti()}),window.addEventListener("scroll",()=>{Ti(),hr(1800)},!0),window.addEventListener("wheel",()=>hr(1800),{passive:!0,capture:!0})}function Yh(e){const t=String(e||"").trim();return!t||["unknown","not assessed","data deficient","locality unavailable"].includes(t.toLowerCase())?"":t}function oy(e=m.selected){if(!S.sourceInspect||!e)return;S.sourceInspect.innerHTML="";const t=document.createElement("textarea");t.className="source-fingerprint-json",t.readOnly=!0,t.spellcheck=!1,t.value=JSON.stringify({fingerprint:Array.from(e.fingerprint||[])},null,2),t.addEventListener("click",()=>t.select()),S.sourceInspect.append(t)}function sy(e){var t;m.sourceInspectOpen=!!e,(t=S.sourceFrameBox)==null||t.classList.toggle("is-inspecting",m.sourceInspectOpen),S.sourceInspect&&(S.sourceInspect.hidden=!m.sourceInspectOpen),S.sourceInspectToggle&&(S.sourceInspectToggle.setAttribute("aria-pressed",m.sourceInspectOpen?"true":"false"),S.sourceInspectToggle.title=m.sourceInspectOpen?"Show shell image":"Show fingerprint values",S.sourceInspectToggle.setAttribute("aria-label",S.sourceInspectToggle.title)),m.sourceInspectOpen&&oy()}function P$(e){if(!(e!=null&&e.src)||!(e.naturalWidth||e.width)||!(e.naturalHeight||e.height))return"";const t=48,n=document.createElement("canvas");n.width=t,n.height=t;const r=n.getContext("2d"),i=e.naturalWidth||e.width,a=e.naturalHeight||e.height,o=Math.min((t-4)/i,(t-4)/a),s=Math.max(1,Math.round(i*o)),l=Math.max(1,Math.round(a*o)),u=Math.round((t-s)/2),c=Math.round((t-l)/2);return r.clearRect(0,0,t,t),r.drawImage(e,u,c,s,l),n.toDataURL("image/png")}function R$(e){if(m.sourceCursorActive=!!e,!m.sourceCursorActive)m.sourceCursorUrl="",document.documentElement.classList.remove("shell-cursor-active"),document.documentElement.style.removeProperty("--shell-cursor");else{const t=O$();t?(m.sourceCursorUrl=t,document.documentElement.style.setProperty("--shell-cursor",`url("${t}") 24 24`),document.documentElement.classList.add("shell-cursor-active")):m.sourceCursorActive=!1}S.sourceCursorToggle&&(S.sourceCursorToggle.setAttribute("aria-pressed",m.sourceCursorActive?"true":"false"),S.sourceCursorToggle.title=m.sourceCursorActive?"Use normal cursor":"Use shell as cursor",S.sourceCursorToggle.setAttribute("aria-label",S.sourceCursorToggle.title))}function O$(){if(!S.sourceImage||S.sourceImage.hidden||!S.sourceImage.src)return"";try{return P$(S.sourceImage)}catch{return""}}function Jt(e,{renderNearest:t=!0,preferFastSource:n=!1}={}){var u;var r;if(!e)return;m.selectionRun+=1,m.sourceToken+=1,window.clearTimeout(m.sourceLoadTimer),vn({resetRenderKey:!0}),m.walkingPca&&Xs(!1),e.id>=0&&m.uploadImageUrl&&(URL.revokeObjectURL(m.uploadImageUrl),m.uploadImageUrl=""),m.selected=e,S.sourceSpinner&&(S.sourceSpinner.hidden=!0),S.sourceImage&&(S.sourceImage.hidden=!0,S.sourceImage.removeAttribute("src")),e.id>=0&&m.mapShellImageIds.add(e.id),m.selectedContour=Rb(e),m.generatedContour=m.selectedContour,m.generatedTraits=Ob(e),m.generatedMode="selected",(e.contour_pc||[]).forEach((c,p)=>{m.pcValues[p]=c,Er(p,c)}),S.selectedName.textContent=e.species,oy(e),sy(m.sourceInspectOpen),Db(),Xb(),S.selectedDetails.innerHTML="";const i=e.countries_top||e.top_countries_label||((u=e.enrichment)==null?void 0:u.countries_top),a=[["Shellprint",e.fingerprint_hash||"-"]],o=Yh(e.rarity_label);o&&a.push(["Rarity",o]);const s=Bv(i);s&&a.push(["Countries",s]);const l=Yh(iv(e));if(l&&a.push(["Origin",l]),e.area!=null&&e.image_width!=null&&e.image_height!=null&&a.push(["Area",`${St(ev(e),2)} cm²`]),e.mean_radius!=null&&e.image_width!=null&&e.image_height!=null&&a.push(["Mean radius",`${St(tv(e),2)} cm`]),e.color_l_mean!=null&&a.push(["Mean lightness",po(e.color_l_mean)]),e.contour_concavity!=null&&a.push(["Concavity",po(e.contour_concavity/.32)]),((r=e.morph_traits)==null?void 0:r.roughness)!=null&&a.push(["Roughness",po(e.morph_traits.roughness)]),e.image_width!=null&&e.image_height!=null){const c=As(e);a.push(["Scale",`${St(c.widthCm,2)} x ${St(c.heightCm,2)} cm frame`])}for(const[c,p]of a){if(p==null||p==="")continue;const f=document.createElement("dt");f.textContent=c;const g=document.createElement("dd");g.textContent=p,S.selectedDetails.append(f,g)}m.sourceFrame=null,Fb(e,{preferFastSource:n}),t?ki(e):S.neighborsList.innerHTML="",Ri(),qn(!1),Fe(120),Qt()}function Go(e,t){const n=Sn(S.scatter,fe),r=wb(n);let i=null,a=1/0;const o=Math.floor(e/r.cellSize),s=Math.floor(t/r.cellSize);for(let l=0;l<=1;l+=1){for(let u=s-l;u<=s+l;u+=1)for(let c=o-l;c<=o+l;c+=1){if(l&&c>o-l&&c<o+l&&u>s-l&&u<s+l)continue;const p=r.grid.get(`${c},${u}`);if(p)for(const f of p){const g=r.points[f*2]-e,b=r.points[f*2+1]-t,x=g*g+b*b;x<a&&(a=x,i=r.shells[f])}}if(a<=196)break}return a<=196?i:null}function B$(e,t,n,r=4){m.screenNeighborScanCount+=1;const i=Sn(S.scatter,fe),a=wb(i);if(!a.shells.length)return[];const o=Math.floor(e/a.cellSize),s=Math.floor(t/a.cellSize),l=[],u=new Set;let c=-1,p=-1;const f=Math.ceil(Math.max(i.width,i.height)/a.cellSize);for(let g=0;g<=f;g+=1){for(let b=s-g;b<=s+g;b+=1)for(let x=o-g;x<=o+g;x+=1){if(g&&x>o-g&&x<o+g&&b>s-g&&b<s+g)continue;const T=a.grid.get(`${x},${b}`);if(T)for(const w of T){if(u.has(w))continue;u.add(w);const v=a.points[w*2]-e,E=a.points[w*2+1]-t,C=v*v+E*E;if(l.length<r){l.push({screenDistance:C,shell:a.shells[w]}),C>p&&(p=C,c=l.length-1);continue}if(!(C>=p)){l[c]={screenDistance:C,shell:a.shells[w]},p=-1;for(let I=0;I<l.length;I+=1)l[I].screenDistance>p&&(p=l[I].screenDistance,c=I)}}}if(l.length>=r&&g>=2)break}return l.sort((g,b)=>g.screenDistance-b.screenDistance),l.map(g=>{const b=Vs(g.shell,n,qs());return{distance:Math.sqrt(b.rawSq),similarity:Wb(b),shell:g.shell}})}function D$(e,t){m.xAxis>=0&&m.xAxis<e.length&&(e[m.xAxis]=t.x),m.yAxis>=0&&m.yAxis<e.length&&m.yAxis!==m.xAxis&&(e[m.yAxis]=t.y)}function L$(e,t){const n=qs(),r=new Set(n),i=(t||[]).map(a=>({distance:Vs(a.shell,e,n).normalizedSq,shell:a.shell})).sort((a,o)=>a.distance-o.distance);if(!i.length)return e;if(i[0].distance<1e-10){const a=i[0].shell.contour_pc||[];for(let o=0;o<e.length;o+=1)r.has(o)||(e[o]=a[o]||0);return e}for(let a=0;a<e.length;a+=1){if(r.has(a))continue;let o=0,s=0;for(const l of i){const u=l.shell.contour_pc||[];if(a>=u.length)continue;const c=1/Math.max(l.distance,1e-6);o+=(u[a]||0)*c,s+=c}e[a]=s?o/s:0}return e}function Qh(e,t=null){var i;const n=Math.max(((i=m.model)==null?void 0:i.contour_component_count)||0,m.pcValues.length,kr()),r=Array.from({length:n},()=>0);return D$(r,e),L$(r,t)}function U$(e,{updateControls:t=!0}={}){e.forEach((n,r)=>{m.pcValues[r]=n,t&&Er(r,n)}),Us()}function Ci(e,{updateControls:t=!1}={}){const n=S.scatter.getBoundingClientRect(),r=Sn(S.scatter,fe),i=e.clientX-n.left,a=e.clientY-n.top,o=fb(i,a,r),s=Qh(o),l=B$(i,a,s,8),u=Qh(o,l);U$(u,{updateControls:t}),t||ly(u),Gb(u,l.slice(0,4)),Fe(),Qt()}function Zh(e){m.targetEvent={clientX:e.clientX,clientY:e.clientY},!m.targetFrame&&(m.targetFrame=window.requestAnimationFrame(()=>{m.targetFrame=0;const t=m.targetEvent;t&&Ci(t)}))}function Jh(){var t;m.targetFrame&&(window.cancelAnimationFrame(m.targetFrame),m.targetFrame=0);const e=m.targetEvent;m.targetEvent=null,e&&((t=m.targetDragStart)!=null&&t.active)&&Ci(e),ly()}function F$(e){const t=S.scatter.getBoundingClientRect();m.panningViewport={pointerId:e.pointerId,startX:e.clientX-t.left,startY:e.clientY-t.top,viewport:{...m.viewport}},m.draggingTarget=!1,m.targetDragStart=null,m.targetEvent=null,m.pendingSelectShell=null,Hv(),m.targetFrame&&(window.cancelAnimationFrame(m.targetFrame),m.targetFrame=0),m.holdingNearest=!1,S.scatter.classList.add("is-panning"),S.pointTooltip.hidden=!0}function W$(e){if(!m.panningViewport||m.panningViewport.pointerId!==e.pointerId)return;const t=S.scatter.getBoundingClientRect(),n=Sn(S.scatter,fe),r=m.panningViewport,i=r.viewport,a=(e.clientX-t.left-r.startX)/n.width*(i.maxX-i.minX),o=(e.clientY-t.top-r.startY)/n.height*(i.maxY-i.minY);m.viewport={minX:i.minX-a,maxX:i.maxX-a,minY:i.minY+o,maxY:i.maxY+o},Fe()}function q$(){m.panningViewport&&(m.panningViewport=null,S.scatter.classList.remove("is-panning"),Qt())}function V$(e,t){if(!t){S.pointTooltip.hidden=!0;return}const n=S.scatter.getBoundingClientRect(),r=document.createElement("strong");r.textContent=t.species;const i=[r,document.createTextNode(t.file),document.createElement("br"),document.createTextNode(`${t.specimen_label||t.specimen||"Unknown specimen"}, ${t.view_label||t.view||"Unknown view"}`),document.createElement("br"),document.createTextNode(`${yi(m.xAxis)} ${St(Et(t,m.xAxis))}, ${yi(m.yAxis)} ${St(Et(t,m.yAxis))}`)];t.color_l_mean!=null&&i.push(document.createElement("br"),document.createTextNode(`${zv(t)}, lightness ${St(t.color_l_mean,3)}`)),S.pointTooltip.replaceChildren(...i),S.pointTooltip.style.left=`${Math.min(Math.max(8,n.width-248),Math.max(8,e.clientX-n.left+14))}px`,S.pointTooltip.style.top=`${Math.min(Math.max(8,n.height-84),Math.max(8,e.clientY-n.top+14))}px`,S.pointTooltip.hidden=!1}function H$(e){m.tooltipEvent={clientX:e.clientX,clientY:e.clientY},!m.tooltipFrame&&(m.tooltipFrame=requestAnimationFrame(()=>{m.tooltipFrame=0;const t=performance.now();if(t-m.tooltipLastAt<60)return;m.tooltipLastAt=t;const n=m.tooltipEvent;if(!n)return;const r=S.scatter.getBoundingClientRect();V$(n,Go(n.clientX-r.left,n.clientY-r.top))}))}function Ei(e){const t=Number(e);return Number.isFinite(t)&&m.shellById.get(t)||null}function Cr(e){if(!m.viewport||!e)return;const t=m.viewport.maxX-m.viewport.minX,n=m.viewport.maxY-m.viewport.minY,r=Et(e,m.xAxis),i=Et(e,m.yAxis);m.viewport={minX:r-t/2,maxX:r+t/2,minY:i-n/2,maxY:i+n/2}}function G$(){const e=m.filtered.length?m.filtered:m.shells;if(!e.length)return;const t=m1(e)||vo(e);t&&(Cr(t),Jt(t,{preferFastSource:!0,renderNearest:!1}),Fe(420))}function ef(e){return`https://www.iucnredlist.org/search?query=${encodeURIComponent(e||"")}&searchType=species`}function ai(e){return String(e||"").trim().toLowerCase()}function j$(e){const t=String(e||"").trim().toUpperCase();return{EX:"Extinct",EW:"Extinct in the wild",CR:"Critically endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near threatened",LC:"Least concern",DD:"Data deficient"}[t]||t}function tf(e){return e&&e.place==null&&e.place_id==null}function nf(e){return/iucn/i.test(String((e==null?void 0:e.authority)||""))||Number((e==null?void 0:e.iucn)||0)>0}function K$(...e){const t=[];for(const n of e)n&&(n.conservation_status&&t.push(n.conservation_status),Array.isArray(n.conservation_statuses)&&t.push(...n.conservation_statuses));return t.find(n=>tf(n)&&nf(n))||t.find(n=>nf(n))||t.find(n=>tf(n))||t[0]||null}function X$(e){if(!e)return"Not assessed";const t=String(e.status||"").trim().toUpperCase(),n=e.status_name||e.description||j$(t)||t,r=String(n||"").trim();return r?!t||r.toUpperCase().includes(`(${t})`)||r.toUpperCase()===t?r:`${r} (${t})`:"Not assessed"}function Y$(e,t){const n=ai(t);return e.find(r=>ai(r.name)===n)||e.find(r=>ai(r.matched_term)===n)||e.find(r=>r.rank==="species")||e[0]||null}async function Q$(e,{signal:t=null}={}){var n;const r=ai(e);if(!r)return{status:"Not assessed",authority:"",url:"",taxonId:null};if(m.conservationCache.has(r))return m.conservationCache.get(r);const i=new URLSearchParams({q:e,per_page:"8"}),a={status:"Not assessed",authority:"iNaturalist",url:ef(e),taxonId:null};try{const o=await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${i.toString()}`,{signal:t});if(!o.ok)return a;const s=await o.json(),l=Y$(s.results||[],e);if(!(l!=null&&l.id))return m.conservationCache.set(r,a),a;let u=l;const c=await fetch(`https://api.inaturalist.org/v1/taxa/${l.id}`,{signal:t});c.ok&&(u=((n=(await c.json()).results)==null?void 0:n[0])||l);const p=K$(u,l),f={status:X$(p),authority:(p==null?void 0:p.authority)||"iNaturalist",url:(p==null?void 0:p.url)||ef(e),taxonId:l.id};return m.conservationCache.set(r,f),f}catch(o){if((o==null?void 0:o.name)==="AbortError")throw o;return a}}function wo(e,t=null){const n=Sn(S.scatter,fe),r=t||{x:n.width/2,y:n.height/2},i=fb(r.x,r.y,n),a=m.viewport,o=Pi(m.xAxis,m.yAxis),s=o.maxX-o.minX,l=o.maxY-o.minY,u=Math.max(s*.04,.001),c=Math.max(l*.04,.001),p=Math.max(s*8,u),f=Math.max(l*8,c),g=Math.max(u,Math.min(p,(a.maxX-a.minX)*e)),b=Math.max(c,Math.min(f,(a.maxY-a.minY)*e));m.viewport={minX:i.x-r.x/n.width*g,maxX:i.x+(1-r.x/n.width)*g,minY:i.y-(n.height-r.y)/n.height*b,maxY:i.y+r.y/n.height*b},Fe()}function Z$(e,t){const n=Sn(S.scatter,fe),r=m.viewport;if(!r||!n.width||!n.height)return;const i=e/n.width*(r.maxX-r.minX),a=t/n.height*(r.maxY-r.minY);m.viewport={minX:r.minX+i,maxX:r.maxX+i,minY:r.minY-a,maxY:r.maxY-a},Fe()}function J$(){const e=zs();for(const t of[S.xAxisSelect,S.yAxisSelect]){t.innerHTML="";for(let n=0;n<e;n+=1){const r=document.createElement("option");r.value=String(n),r.textContent=yi(n),t.append(r)}}S.xAxisSelect.value=String(m.xAxis),S.yAxisSelect.value=String(m.yAxis)}function rf(e,t){m.xAxis=e,m.yAxis=t,S.xAxisSelect.value=String(e),S.yAxisSelect.value=String(t),m.viewport=Pi(e,t),Fe(120),Qt()}function e3(){S.pcControls.innerHTML="";const e=kr();m.pcValues=Array.from({length:m.model.contour_component_count||e},()=>0),m.pcControlRows=[];for(let t=0;t<e;t+=1){const n=m.model.contour_pca_ranges[t],r=n?n.p01:-1,i=n?n.p99:1,a=Math.max((i-r)/500,.001),o=document.createElement("div");o.className="pc-row";const s=document.createElement("label");s.textContent=hb(t);const l=document.createElement("input");l.type="range",l.min=String(r),l.max=String(i),l.step=String(a),l.value="0";const u=document.createElement("input");u.type="number",u.step=String(a),u.value="0.000",l.addEventListener("input",()=>af(t,Number(l.value))),u.addEventListener("change",()=>af(t,Number(u.value))),o.append(s,l,u),m.pcControlRows[t]={label:s,slider:l,number:u},S.pcControls.append(o)}}function t3(){var t;const e=zs();for(const n of[S.xAxisSelect,S.yAxisSelect]){const r=n.value;for(let i=0;i<e;i+=1){const a=n.querySelector(`option[value="${i}"]`);a&&(a.textContent=yi(i))}n.value=r}for(let n=0;n<m.pcControlRows.length;n+=1)(t=m.pcControlRows[n])!=null&&t.label&&(m.pcControlRows[n].label.textContent=hb(n))}function Er(e,t){const n=m.pcControlRows[e];n&&(n.slider.value=String(t),n.number.value=Number(t).toFixed(3))}function ly(e=m.pcValues){e.forEach((t,n)=>Er(n,t))}function af(e,t){m.pcValues[e]=t,Er(e,t),Us(),Fe(),Qt()}function Bi(e,t=!0){e.forEach((n,r)=>{m.pcValues[r]=n,Er(r,n)}),Us(),Fe(),t&&Qt()}window.shellspacePerf={selectedId:()=>{var e;return((e=m.selected)==null?void 0:e.id)??null},neighborCacheSize:()=>m.neighborCache.size,surpriseQueueSize:()=>m.surpriseQueue.length,surpriseReadyCount:()=>m.surpriseQueue.length,scatterPointCount:()=>{var e,t;return((t=(e=m.scatterPointCache)==null?void 0:e.shells)==null?void 0:t.length)||0},starredHydratedCount:()=>m.starredHydratedCount,screenNeighborScanCount:()=>m.screenNeighborScanCount,resetScreenNeighborScanCount:()=>{m.screenNeighborScanCount=0},sourceMode:()=>m.sourceMode,filteredCount:()=>m.filtered.length,diametricPairs:()=>{var e;return((e=m.model)==null?void 0:e.contour_pca_diametric_pairs)||[]},lookupConservationStatus:Q$,conservationStatusForSelected:()=>Ms(m.selected),selectSpecies:e=>{const t=m.shells.find(n=>n.species===e);return t&&Jt(t),(t==null?void 0:t.id)??null}};async function n3(){N$(),xi("Opening fingerprint data");const{model:e,shells:t}=await Iv();m.model=e,m.shells=t,m.shellById=new Map(m.shells.map(p=>[p.id,p])),m$(),sv(m.shells,null,null),Vn(),m.filtered=m.shells,m.contours=null,m.contourPoints=e.contour_points||0,m.contourScale=e.contour_scale||1;const n=e.species_count?`${e.processed_count.toLocaleString()} shells, ${e.species_count.toLocaleString()} species`:`${e.processed_count.toLocaleString()} shells`;S.statusLine.textContent=n;const r=d1();o1.includes(r.get("color"))&&(m.colorMode=r.get("color")),Nh();const i=zs(),a=r.get("x"),o=r.get("y"),s=a==null?NaN:Number(a),l=o==null?NaN:Number(o);Number.isInteger(s)&&s>=0&&s<i&&(m.xAxis=s),Number.isInteger(l)&&l>=0&&l<i&&(m.yAxis=l),m.viewport=Pi(m.xAxis,m.yAxis),J$(),e3(),Nh(),Gv(),S.statusLine.textContent=n,m.suppressHash=!0;const u=Ei(r.get("id"))||m.shells[0];Jt(u,{renderNearest:!1});const c=(r.get("pc")||"").split(",").filter(p=>p.trim()!=="").map(p=>Number(p)).filter(p=>Number.isFinite(p));c.length&&Bi(c.slice(0,6),!1),m.suppressHash=!1,m.hashReady=!0,Oi(),qn(),Fe(),gf(),xi("",!1),m.starredIds.length&&Qv(),bf()}function r3(){P_(),n3().catch(e=>{S.statusLine.textContent=e.message,xi("",!1),S.missingData&&(S.missingData.hidden=!1),console.error(e)})}const i3=Object.freeze(Object.defineProperty({__proto__:null,startShellspace:r3},Symbol.toStringTag,{value:"Module"}));
