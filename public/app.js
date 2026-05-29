var a1=Object.defineProperty;var o1=(e,t,n)=>t in e?a1(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Re=(e,t,n)=>o1(e,typeof t!="symbol"?t+"":t,n);const s1="modulepreload",l1=function(e,t){return new URL(e,t).href},Cc={},u1=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){let o=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const s=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=o(n.map(d=>{if(d=l1(d,r),d in Cc)return;Cc[d]=!0;const p=d.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(!!r)for(let _=s.length-1;_>=0;_--){const T=s[_];if(T.href===d&&(!p||T.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${m}`))return;const b=document.createElement("link");if(b.rel=p?"stylesheet":s1,p||(b.as="script"),b.crossOrigin="",b.href=d,u&&b.setAttribute("nonce",u),document.head.appendChild(b),p)return new Promise((_,T)=>{b.addEventListener("load",_),b.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return i.then(o=>{for(const s of o||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})};let c1=Gh;const nr=1,Mi=2,qh={owned:null,cleanups:null,context:null,owner:null};var Ye=null;let Da=null,d1=null,Mt=null,lt=null,kn=null,ea=0;function p1(e,t){const n=Mt,r=Ye,i=e.length===0,a=t===void 0?r:t,o=i?qh:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>ta(()=>Br(o)));Ye=o,Mt=null;try{return na(s,!0)}finally{Mt=n,Ye=r}}function zi(e,t,n){const r=m1(e,t,!1,nr);Vh(r)}function ta(e){if(Mt===null)return e();const t=Mt;Mt=null;try{return e()}finally{Mt=t}}function f1(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&na(()=>{for(let i=0;i<e.observers.length;i+=1){const a=e.observers[i],o=Da&&Da.running;o&&Da.disposed.has(a),(o?!a.tState:!a.state)&&(a.pure?lt.push(a):kn.push(a),a.observers&&jh(a)),o||(a.state=nr)}if(lt.length>1e6)throw lt=[],new Error},!1)),t}function Vh(e){if(!e.fn)return;Br(e);const t=ea;h1(e,e.value,t)}function h1(e,t,n){let r;const i=Ye,a=Mt;Mt=Ye=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=nr,e.owned&&e.owned.forEach(Br),e.owned=null),e.updatedAt=n+1,Kh(o)}finally{Mt=a,Ye=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?f1(e,r):e.value=r,e.updatedAt=n)}function m1(e,t,n,r=nr,i){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Ye,context:Ye?Ye.context:null,pure:n};return Ye===null||Ye!==qh&&(Ye.owned?Ye.owned.push(a):Ye.owned=[a]),a}function Hh(e){if(e.state===0)return;if(e.state===Mi)return Yo(e);if(e.suspense&&ta(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ea);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===nr)Vh(e);else if(e.state===Mi){const r=lt;lt=null,na(()=>Yo(e,t[0]),!1),lt=r}}function na(e,t){if(lt)return e();let n=!1;t||(lt=[]),kn?n=!0:kn=[],ea++;try{const r=e();return g1(n),r}catch(r){n||(kn=null),lt=null,Kh(r)}}function g1(e){if(lt&&(Gh(lt),lt=null),e)return;const t=kn;kn=null,t.length&&na(()=>c1(t),!1)}function Gh(e){for(let t=0;t<e.length;t++)Hh(e[t])}function Yo(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===nr?r!==t&&(!r.updatedAt||r.updatedAt<ea)&&Hh(r):i===Mi&&Yo(r,t)}}}function jh(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Mi,n.pure?lt.push(n):kn.push(n),n.observers&&jh(n))}}function Br(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const a=i.pop(),o=n.observerSlots.pop();r<i.length&&(a.sourceSlots[o]=r,i[r]=a,n.observerSlots[r]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)Br(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Br(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function b1(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Kh(e,t=Ye){throw b1(e)}function nt(e,t){return ta(()=>e(t||{}))}function y1(e,t,n){let r=n.length,i=t.length,a=r,o=0,s=0,l=t[i-1].nextSibling,u=null;for(;o<i||s<a;){if(t[o]===n[s]){o++,s++;continue}for(;t[i-1]===n[a-1];)i--,a--;if(i===o){const d=a<r?s?n[s-1].nextSibling:n[a-s]:l;for(;s<a;)e.insertBefore(n[s++],d)}else if(a===s)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[a-1]&&n[s]===t[i-1]){const d=t[--i].nextSibling;e.insertBefore(n[s++],t[o++].nextSibling),e.insertBefore(n[--a],d),t[i]=n[a]}else{if(!u){u=new Map;let p=s;for(;p<a;)u.set(n[p],p++)}const d=u.get(t[o]);if(d!=null)if(s<d&&d<a){let p=o,m=1,g;for(;++p<i&&p<a&&!((g=u.get(t[p]))==null||g!==d+m);)m++;if(m>d-s){const b=t[o];for(;s<d;)e.insertBefore(n[s++],b)}else e.replaceChild(n[s++],t[o++])}else o++;else t[o++].remove()}}}function w1(e,t,n,r={}){let i;return p1(a=>{i=a,t===document?e():Nt(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function ct(e,t,n,r){let i;const a=()=>{const s=document.createElement("template");return s.innerHTML=e,s.content.firstChild},o=()=>(i||(i=a())).cloneNode(!0);return o.cloneNode=o,o}function _1(e,t){t==null?e.removeAttribute("class"):e.className=t}function ae(e,t,n){return ta(()=>e(t,n))}function Nt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return Ai(e,t,r,n);zi(i=>Ai(e,t(),i,n),r)}function Ai(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(o){let s=n[0];s&&s.nodeType===3?s.data!==t&&(s.data=t):s=document.createTextNode(t),n=Un(e,n,r,s)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=Un(e,n,r);else{if(a==="function")return zi(()=>{let s=t();for(;typeof s=="function";)s=s();n=Ai(e,s,n,r)}),()=>n;if(Array.isArray(t)){const s=[],l=n&&Array.isArray(n);if(Qo(s,t,n,i))return zi(()=>n=Ai(e,s,n,r,!0)),()=>n;if(s.length===0){if(n=Un(e,n,r),o)return n}else l?n.length===0?Tc(e,s,r):y1(e,n,s):(n&&Un(e),Tc(e,s));n=s}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=Un(e,n,r,t);Un(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Qo(e,t,n,r){let i=!1;for(let a=0,o=t.length;a<o;a++){let s=t[a],l=n&&n[e.length],u;if(!(s==null||s===!0||s===!1))if((u=typeof s)=="object"&&s.nodeType)e.push(s);else if(Array.isArray(s))i=Qo(e,s,l)||i;else if(u==="function")if(r){for(;typeof s=="function";)s=s();i=Qo(e,Array.isArray(s)?s:[s],Array.isArray(l)?l:[l])||i}else e.push(s),i=!0;else{const d=String(s);l&&l.nodeType===3&&l.data===d?e.push(l):e.push(document.createTextNode(d))}}return i}function Tc(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function Un(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let a=!1;for(let o=t.length-1;o>=0;o--){const s=t[o];if(i!==s){const l=s.parentNode===e;!a&&!o?l?e.replaceChild(i,s):e.insertBefore(i,n):l&&s.remove()}else a=!0}}else e.insertBefore(i,n);return[i]}const x1=`@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600;700;800&display=swap");

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

.settings-range {
  display: grid;
  gap: 8px;
  color: var(--ink);
  font-size: 13px;
  line-height: 1.25;
}

.settings-range header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.settings-range output {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.settings-range input {
  width: 100%;
  accent-color: var(--teal);
}

.settings-panel ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
}

.about-section p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.42;
}

.about-section a {
  color: var(--teal);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.about-section a:hover {
  text-decoration: underline;
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

.attributes-header-main {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.attribute-mode-toggle {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: min(220px, 100%);
  padding: 3px;
  border: 1px solid rgba(31, 38, 40, 0.12);
  border-radius: 8px;
  background: #f3f0e8;
}

.attribute-mode-toggle button {
  min-height: 32px;
  min-width: 0;
  padding: 5px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #4d5a5c;
  font-size: 13px;
  font-weight: 700;
}

.attribute-mode-toggle button[aria-pressed="true"] {
  background: var(--panel);
  color: var(--ink);
  box-shadow: 0 1px 4px rgba(31, 36, 42, 0.1);
}

.filters-popover > header > button {
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

.habitat-filter-options {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
}

.habitat-filter-options button {
  min-width: 0;
  min-height: 48px;
  padding: 7px;
  display: grid;
  place-items: center;
  background: var(--panel);
}

.habitat-filter-options .habitat-icon {
  width: 28px;
  height: 28px;
}

.habitat-filter-options .habitat-icon svg {
  width: 18px;
  height: 18px;
}

.habitat-filter-options button:hover,
.habitat-filter-options button:focus-visible {
  border-color: rgba(31, 117, 111, 0.62);
  outline: 0;
}

.habitat-filter-options button[aria-pressed="true"] {
  border-color: rgba(31, 117, 111, 0.8);
  box-shadow:
    inset 0 0 0 1px rgba(31, 117, 111, 0.18),
    0 0 0 2px rgba(31, 117, 111, 0.08);
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

.detail-filter-target {
  border-radius: 3px;
  cursor: pointer;
}

.detail-filter-target:focus-visible {
  outline: 1px solid rgba(31, 117, 111, 0.42);
  outline-offset: 2px;
}

.detail-filter-ack {
  animation: detail-filter-ack 620ms ease-out;
}

@keyframes detail-filter-ack {
  0% {
    background: rgba(31, 117, 111, 0);
    box-shadow: 0 0 0 0 rgba(31, 117, 111, 0);
  }
  28% {
    background: rgba(31, 117, 111, 0.12);
    box-shadow: 0 0 0 3px rgba(31, 117, 111, 0.12);
  }
  100% {
    background: rgba(31, 117, 111, 0);
    box-shadow: 0 0 0 0 rgba(31, 117, 111, 0);
  }
}

.country-filter-links {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
}

.country-filter-item {
  font-size: 14px;
  line-height: 1;
}

.taxonomy-list {
  display: grid;
  grid-template-columns: minmax(38px, max-content) minmax(0, 1fr);
  gap: 6px 10px;
  margin: 0;
  color: inherit;
  font-size: 13px;
}

.taxonomy-list dt {
  color: #8a928f;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.3;
}

.taxonomy-list dd {
  margin: 0;
  color: var(--ink);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
  word-break: normal;
  overflow-wrap: anywhere;
}

.taxonomy-list .taxonomy-genus-value {
  font-style: italic;
}

.habitat-icons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.habitat-icon {
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  padding: 0;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(49, 67, 66, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: #287a74;
}

.habitat-icon svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.habitat-marine {
  color: #1d6f8a;
  background: rgba(210, 236, 240, 0.84);
}

.habitat-brackish {
  color: #82702c;
  background: rgba(237, 230, 190, 0.84);
}

.habitat-freshwater {
  color: #2d75b8;
  background: rgba(217, 235, 252, 0.86);
}

.habitat-terrestrial {
  color: #52733b;
  background: rgba(221, 236, 210, 0.86);
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
  margin: 22px 0 0;
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
`,h={shells:[],filtered:[],contours:null,contourPoints:0,contourScale:1,model:null,viewport:null,selected:null,selectedContour:null,generatedContour:null,generatedTraits:null,generatedMode:"selected",uploadImageUrl:"",xAxis:0,yAxis:1,colorMode:"roughness",attributeMode:"filter",pcValues:[],pcaAxisNames:[],pcControlRows:[],morphFilters:new Map,categoryFilters:{origin:"",taxonomy:"",habitat:"",rarity:"",color:""},conservationCache:new Map,starredIds:[],showAllStars:!1,speciesCounts:new Map,speciesTraits:new Map,localityMatchRate:0,drawFrame:0,drawTimer:0,sourceFrame:null,sourceMode:"fallback",sourceInspectOpen:!1,sourceCursorActive:!1,sourceCursorUrl:"",scatterHitCache:null,screenNeighborScanCount:0,starredHydrationTimer:0,starredHydrationRun:0,starredHydratedCount:0,starredThumbs:[],tooltipFrame:0,tooltipEvent:null,tooltipLastAt:0,holdingNearest:!1,pendingSelectShell:null,targetFrame:0,targetEvent:null,targetNeighborTimer:0,targetNeighborValues:null,targetNeighborLastAt:0,draggingTarget:!1,targetDragStart:null,panningViewport:null,walkingPca:!1,walkFrame:0,walkStartedAt:0,hashReady:!1,suppressHash:!1,hashTimer:0,needsDraw:!0,sourceToken:0,sourceLoadTimer:0,selectionRun:0,scatterPointCache:null,shellById:new Map,surpriseQueue:[],surpriseQueueSource:null,surprisePrimeTimer:0,neighborCache:new Map,neighborTimer:0,neighborHydrationTimer:0,neighborHydrationItems:[],neighborHydrationUnsubscribers:[],neighborSearchRun:0,neighborSearchTimer:0,neighborToken:0,neighborRenderKey:"",pointColorCache:new Map,originFilterOptionsCache:null,filterOptionsCache:null,showPoppedShells:!0,mapSampleLimit:8e3,mapShellImageIds:new Set},$={};let he=null,Fe=null;function v1(){he=$.scatter.getContext("2d"),Fe=$.outline.getContext("2d")}const di=new Map,Fa=new Map,Ni=new Map,pt=new Map,zr=new Map;var $1=ct('<aside class="panel controls-panel">'),S1=ct('<section class="panel-section search-section"><div class=search-row><label class=field><span>Search</span><input type=search placeholder="Species or Shellprint"></label><button class=filters-toggle title="Open attributes"aria-expanded=false>Attributes</button></div><div class=filters-popover hidden><header><div class=attributes-header-main><h2>Attributes</h2><div class=attribute-mode-toggle role=tablist aria-label="Attribute mode"><button type=button data-attribute-mode=filter aria-pressed=true>Filter</button><button type=button data-attribute-mode=color aria-pressed=false>Color</button></div></div><button title="Close attributes"aria-label="Close attributes">x</button></header><div class=filter-controls></div><div class=filter-actions><button title="Reset filters">Reset</button></div></div><div class=shell-action-row><button class=surprise-shell title="Surprise me"aria-label="Surprise me"><svg viewBox="0 0 24 24"aria-hidden=true><rect x=4 y=4 width=16 height=16 rx=3.5></rect><circle cx=8.5 cy=8.5 r=1.2></circle><circle cx=15.5 cy=8.5 r=1.2></circle><circle cx=12 cy=12 r=1.2></circle><circle cx=8.5 cy=15.5 r=1.2></circle><circle cx=15.5 cy=15.5 r=1.2></circle></svg></button><button class=upload-shell title="Bring your own shell"><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 16V5"></path><path d="M7.5 9.5 12 5l4.5 4.5"></path><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"></path></svg><span>Bring your own shell</span></button></div><input type=file accept=image/* hidden><div class=section-title><h2>Map<button class=pca-guide-button title="Explain PCA axes"aria-label="Explain PCA axes">?</button></h2></div><div class=axis-grid><label><span>X</span><select></select></label><label><span>Y</span><select></select></label></div><div class=color-legend hidden>'),k1=ct('<section class="panel-section physical-shell"><div class=section-title><h2>Physical Shell <span class="fingerprint-chip compact">------</span></h2><button class=star-button title="Star this shape"aria-label="Star this shape"aria-pressed=false><svg class=star-icon viewBox="0 0 24 24"aria-hidden=true><path class=star-shape d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z"></path></svg></button></div><div class=source-frame><div class=source-spinner hidden></div><img class=source-image alt hidden><div class=source-inspect hidden></div><button class=source-inspect-toggle title="Show shell data"aria-label="Show shell data"aria-pressed=false><span aria-hidden=true>{}</span></button><button class=source-cursor-toggle title="Use shell as cursor"aria-label="Use shell as cursor"aria-pressed=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M6 3.5 18.5 14l-6.1 1.1-3.2 5.4L6 3.5Z"></path><path d="m12.4 15.1 3 5.4"></path></svg></button></div><div class=selected-name>None</div><dl></dl><div class=color-palette><h2>Palette</h2><div class=palette-swatches>');function C1(){return(()=>{var e=$1();return ae(t=>{$.controlsPanel=t},e),Nt(e,nt(T1,{}),null),Nt(e,nt(E1,{}),null),e})()}function T1(){return(()=>{var e=S1(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,o=t.nextSibling,s=o.firstChild,l=s.firstChild,u=l.firstChild,d=u.nextSibling,p=d.firstChild,m=p.nextSibling,g=l.nextSibling,b=s.nextSibling,_=b.nextSibling,T=_.firstChild,x=o.nextSibling,v=x.firstChild,I=v.nextSibling,E=x.nextSibling,k=E.nextSibling,M=k.firstChild,A=M.firstChild,S=A.nextSibling,P=k.nextSibling,O=P.firstChild,W=O.firstChild,G=W.nextSibling,X=O.nextSibling,R=X.firstChild,Y=R.nextSibling,Z=P.nextSibling;return ae(V=>{$.search=V},i),ae(V=>{$.filtersToggle=V},a),ae(V=>{$.filtersPanel=V},o),ae(V=>{$.attributeFilterMode=V},p),ae(V=>{$.attributeColorMode=V},m),ae(V=>{$.closeFilters=V},g),ae(V=>{$.filterControls=V},b),ae(V=>{$.resetTraitFilters=V},T),ae(V=>{$.randomShell=V},v),ae(V=>{$.uploadShell=V},I),ae(V=>{$.uploadInput=V},E),ae(V=>{$.pcaGuideOpen=V},S),ae(V=>{$.xAxisSelect=V},G),ae(V=>{$.yAxisSelect=V},Y),ae(V=>{$.colorLegend=V},Z),e})()}function E1(){return(()=>{var e=k1(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,o=t.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,d=u.nextSibling,p=d.nextSibling,m=o.nextSibling,g=m.nextSibling,b=g.nextSibling,_=b.firstChild,T=_.nextSibling;return ae(x=>{$.physicalHash=x},i),ae(x=>{$.starShell=x},a),ae(x=>{$.sourceFrameBox=x},o),ae(x=>{$.sourceSpinner=x},s),ae(x=>{$.sourceImage=x},l),ae(x=>{$.sourceInspect=x},u),ae(x=>{$.sourceInspectToggle=x},d),ae(x=>{$.sourceCursorToggle=x},p),ae(x=>{$.selectedName=x},m),ae(x=>{$.selectedDetails=x},g),ae(x=>{$.paletteSwatches=x},T),e})()}var I1=ct('<section class=scatter-panel aria-label="PCA scatter plot"><canvas class=scatter-canvas></canvas><div class=point-tooltip hidden>');function M1(){return(()=>{var e=I1(),t=e.firstChild,n=t.nextSibling;return ae(r=>{$.scatter=r},t),ae(r=>{$.pointTooltip=r},n),e})()}var z1=ct('<div class=loading-overlay><div class=rpg-loader aria-hidden=true><div class=loader-shadow></div><div class=loader-aura></div><div class=loader-pearl><span class="pearl-spark spark-1"></span><span class="pearl-spark spark-2"></span><span class="pearl-spark spark-3"></span></div></div><p>Opening shell data'),A1=ct("<div class=missing-data hidden><div><h2>Processed Data Missing</h2><p>Build FFT fingerprints, export static data, then refresh the app.</p><code>make fingerprints export-static"),N1=ct("<div class=pca-guide-modal hidden><div class=pca-guide-backdrop></div><section class=pca-guide-dialog role=dialog aria-modal=true aria-labelledby=pca-guide-title><header><div class=pca-guide-title><h2 id=pca-guide-title>PCA Axes</h2><p>Here are the shells that showcase the most variance within a given PCA, while minimizing variance of other axes</p></div><button title=Close aria-label=Close>x</button></header><div class=pca-guide-list>"),P1=ct('<div><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip>');function R1(){return(()=>{var e=z1(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=t.nextSibling;return ae(o=>{$.loadingOverlay=o},e),Nt(t,nt(Ec,{position:"top"}),i),Nt(t,nt(Ec,{position:"bottom"}),i),ae(o=>{$.loadingText=o},a),e})()}function O1(){return(()=>{var e=A1();return ae(t=>{$.missingData=t},e),e})()}function B1(){return(()=>{var e=N1(),t=e.firstChild,n=t.nextSibling,r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=r.nextSibling;return ae(s=>{$.pcaGuideModal=s},e),ae(s=>{$.pcaGuideClose=s},a),ae(s=>{$.pcaGuideList=s},o),e})()}function Ec(e){return(()=>{var t=P1();return zi(()=>_1(t,`loader-shell loader-shell-${e.position}`)),t})()}var L1=ct('<aside class="panel lab-panel">'),D1=ct('<section class="panel-section projected-lab"><div class=generated-shape><div class=section-title><h2>Projected Shell <span class="fingerprint-chip compact">------</span></h2></div><div class=projection-frame><canvas class=outline-canvas width=420 height=420></canvas><button class=svg-export title="Export generated shell as SVG">SVG</button><button class=draw-shell-button title="Draw shell and project it"aria-label="Draw shell and project it"aria-pressed=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M4 17.8c3.8-6.7 7.4-6.7 10.8 0 1.4 2.8 3.2 2.8 5.2 0"></path><path d="M15.2 4.8 19.2 8.8"></path><path d="M5.8 18.2 15.9 8.1l3.2 3.2L9 21.4l-4.1.7.9-3.9Z"></path></svg></button></div></div><div class=slider-stack><div class=section-title><h2>Contour PCs</h2><div class=title-actions><button title="Reset contour coordinates">Mean</button><button title="Animate through contour PCA space">Walk</button></div></div><div class=pc-controls>'),F1=ct('<section class="panel-section neighbors"><div class=section-title><h2>Nearest Shells</h2></div><div class=neighbors-list>');function U1(){return(()=>{var e=L1();return Nt(e,nt(W1,{}),null),Nt(e,nt(q1,{}),null),e})()}function W1(){return(()=>{var e=D1(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=n.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,d=t.nextSibling,p=d.firstChild,m=p.firstChild,g=m.nextSibling,b=g.firstChild,_=b.nextSibling,T=p.nextSibling;return ae(x=>{$.projectedHash=x},a),ae(x=>{$.outline=x},s),ae(x=>{$.exportSvg=x},l),ae(x=>{$.drawProjectedShell=x},u),ae(x=>{$.meanShape=x},b),ae(x=>{$.walkPca=x},_),ae(x=>{$.pcControls=x},T),e})()}function q1(){return(()=>{var e=F1(),t=e.firstChild,n=t.nextSibling;return ae(r=>{$.neighborsList=r},n),e})()}var V1=ct('<header class=topbar><div class=brand-block><h1>Shellspace 🐚</h1><p class=status-line>Loading shell model</p></div><div class=starred-band aria-label="Starred shells"></div><div class=star-burst aria-hidden=true></div><div class=top-actions><button title="Zoom out">-</button><button title="Zoom in">+</button><button title="Reset map view">Reset</button><button class=settings-toggle title=Settings aria-label=Settings aria-expanded=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"></path><path d="m19 13.3.1-1.3-.1-1.3 2-1.5-1.9-3.2-2.4 1a8.6 8.6 0 0 0-2.2-1.3L14.2 3h-4.4l-.3 2.7A8.6 8.6 0 0 0 7.3 7L4.9 6 3 9.2l2 1.5-.1 1.3.1 1.3-2 1.5L4.9 18l2.4-1a8.6 8.6 0 0 0 2.2 1.3l.3 2.7h4.4l.3-2.7a8.6 8.6 0 0 0 2.2-1.3l2.4 1 1.9-3.2-2-1.5Z"></path></svg></button></div><div class=settings-panel hidden><section><h2>Settings</h2><label class=settings-check><input type=checkbox><span>Show shells on map</span></label><label class=settings-range><header><span>Map sample</span><output>8,000</output></header><input type=range min=1000 max=30000 step=500></label><button class=danger-button>Clear all data</button></section><section><h2>Controls</h2><ul><li>Two-finger pan moves the map.</li><li>Shift + two-finger pan zooms.</li><li>Click empty space projects a shell there.</li><li>Drag empty space walks through PCA space.</li></ul></section><section class=about-section><h2>About</h2><p>Code, writeup, dataset notes, and references are in the repository.</p><a href=https://github.com/Hawzen/seashell-fingerprinting target=_blank rel=noreferrer>Repository');function H1(){return(()=>{var e=V1(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=t.nextSibling,a=i.nextSibling,o=a.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,d=u.nextSibling,p=o.nextSibling,m=p.firstChild,g=m.firstChild,b=g.nextSibling,_=b.firstChild,T=b.nextSibling,x=T.firstChild,v=x.firstChild,I=v.nextSibling,E=x.nextSibling,k=T.nextSibling;return ae(M=>{$.statusLine=M},r),ae(M=>{$.starredBand=M},i),ae(M=>{$.starBurst=M},a),ae(M=>{$.zoomOut=M},s),ae(M=>{$.zoomIn=M},l),ae(M=>{$.resetView=M},u),ae(M=>{$.settingsToggle=M},d),ae(M=>{$.settingsPanel=M},p),ae(M=>{$.showPoppedShells=M},_),ae(M=>{$.mapSampleOutput=M},I),ae(M=>{$.mapSampleLimit=M},E),ae(M=>{$.clearAllData=M},k),e})()}var G1=ct("<main class=workspace>");function j1(){return[nt(H1,{}),(()=>{var e=G1();return Nt(e,nt(C1,{}),null),Nt(e,nt(M1,{}),null),Nt(e,nt(U1,{}),null),e})(),nt(R1,{}),nt(O1,{}),nt(B1,{})]}const Xh=document.body.firstElementChild;if(!Xh)throw new Error("Missing app root");const Yh=document.createElement("style");Yh.textContent=x1;document.head.append(Yh);w1(()=>nt(j1,{}),Xh);u1(async()=>{const{startShellspace:e}=await Promise.resolve().then(()=>bS);return{startShellspace:e}},[],import.meta.url).then(({startShellspace:e})=>e());function K1(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;return new URLSearchParams(e)}function Qh(){if(!h.hashReady||h.suppressHash)return;const e=new URLSearchParams;h.selected&&e.set("id",String(h.selected.id)),e.set("x",String(h.xAxis)),e.set("y",String(h.yAxis)),e.set("color",h.colorMode),e.set("pc",h.pcValues.slice(0,6).map(n=>Number(n).toFixed(3)).join(","));const t=`${window.location.pathname}${window.location.search}#${e.toString()}`;window.history.replaceState(null,"",t)}function Bt(){!h.hashReady||h.suppressHash||(window.clearTimeout(h.hashTimer),h.hashTimer=window.setTimeout(Qh,80))}function Rn(e,t){const n=e.getBoundingClientRect(),r=window.devicePixelRatio||1,i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r));return(e.width!==i||e.height!==a)&&(e.width=i,e.height=a,t.setTransform(r,0,0,r,0,0),e===$.scatter&&(h.needsDraw=!0,h.scatterHitCache=null,h.scatterPointCache=null)),{width:n.width,height:n.height}}const ra=[{key:"species",label:"Species"},{key:"taxonomy",label:"Taxonomy"},{key:"habitat",label:"Habitat"},{key:"origin",label:"Country"},{key:"locality",label:"Location"},{key:"conservation",label:"Conservation"},{key:"color",label:"Shell color"},{key:"shell",label:"Shell color"},{key:"pattern",label:"Pattern"},{key:"lightness",label:"Lightness"},{key:"area",label:"Area"},{key:"roughness",label:"Roughness"},{key:"rarity",label:"Rarity"},{key:"concavity",label:"Concavity"}];ra.map(e=>e.key);const ks="shellspace-starred",X1="0.27.7",Zh=`https://cdn.jsdelivr.net/pyodide/v${X1}/full/`,Y1=`${Zh}pyodide.js`,Q1=String.raw`
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
`,Cs=[{key:"lightness",label:"Lightness",format:"percent"},{key:"area",label:"Area",format:"percent"},{key:"concavity",label:"Concavity",format:"percent"},{key:"roughness",label:"Roughness",format:"percent"}],In=[{key:"low",label:"Low",min:0,max:1/3},{key:"medium",label:"Medium",min:1/3,max:2/3},{key:"high",label:"High",min:2/3,max:1}],Ic=["Common","Uncommon","Rare"],zt=15,Wr=10,Z1=.08,Mc=[{saturation:.2,lightness:.18},{saturation:.42,lightness:.24},{saturation:.64,lightness:.31},{saturation:.82,lightness:.39},{saturation:.82,lightness:.48},{saturation:.74,lightness:.58},{saturation:.62,lightness:.68},{saturation:.48,lightness:.78},{saturation:.34,lightness:.86},{saturation:.2,lightness:.93}];function Ts(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function Jh(e){const t=[Number((e==null?void 0:e[0])??0),Number((e==null?void 0:e[1])??0),Number((e==null?void 0:e[2])??0)],n=t.some(r=>r>1)?255:1;return t.map(r=>Ts(r/n))}function J1(e,t,n){const r=(e%360+360)%360/360,i=n<.5?n*(1+t):n+t-n*t,a=2*n-i,o=s=>{let l=r+s;return l<0&&(l+=1),l>1&&(l-=1),l<1/6?a+(i-a)*6*l:l<1/2?i:l<2/3?a+(i-a)*(2/3-l)*6:a};return[o(1/3),o(0),o(-1/3)].map(Ts)}function ex(e){return`#${e.map(t=>Math.max(0,Math.min(255,Math.round(t*255))).toString(16).padStart(2,"0")).join("")}`}function tx(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]:null}function nx(e){const t=String(e||"").match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i);return t?[Number(t[1])/255,Number(t[2])/255,Number(t[3])/255].map(Ts):null}function em(e){const t=Math.max(0,Math.min(zt*Wr-1,Math.round(Number(e)||0))),n=Math.floor(t/zt),r=t%zt;return J1(r/zt*360,Mc[n].saturation,Mc[n].lightness)}function Zn(e){const t=Math.max(0,Math.min(zt*Wr-1,Math.round(Number(e)||0))),n=em(t);return{bin:t,hex:ex(n),rgb:n,hue:t%zt,tone:Math.floor(t/zt),count:0,weight:0}}function Es(e){const t=Jh(e);let n=0,r=1/0;for(let i=0;i<zt*Wr;i+=1){const a=em(i),o=t[0]-a[0],s=t[1]-a[1],l=t[2]-a[2],u=o*o*.3+s*s*.59+l*l*.11;u<r&&(r=u,n=i)}return n}function rx(e){const t=tx(e)||nx(e);return t?Es(t):null}function Pi(e){return`bin:${Math.max(0,Math.min(zt*Wr-1,Math.round(Number(e)||0)))}`}function qr(e){const t=String(e||"");if(t.startsWith("bin:")){const n=Number(t.slice(4));return Number.isInteger(n)&&n>=0&&n<zt*Wr?n:null}return rx(t)}function ix(e){const n=Array.isArray(e==null?void 0:e.color_palette_rgb)?e.color_palette_rgb.map(Jh):[];if(!n.length)return{colors:[],weights:[]};const r=Array.isArray(e==null?void 0:e.color_palette_weights)?e.color_palette_weights:[],i=n.map((o,s)=>{const l=Number(r[s]);return Number.isFinite(l)&&l>0?l:1/n.length}),a=i.reduce((o,s)=>o+s,0)||1;return{colors:n,weights:i.map(o=>o/a)}}function Is(e){const{colors:t,weights:n}=ix(e),r=new Map;for(let a=0;a<t.length;a+=1){const o=Es(t[a]);r.set(o,(r.get(o)||0)+n[a])}const i=[...r.entries()].map(([a,o])=>({bin:a,weight:Math.round(o*1e4)/1e4})).sort((a,o)=>o.weight-a.weight||a.bin-o.bin);return e.color_bins=i,i}function ax(e){for(const t of e||[])Is(t)}function tm(e,t){const n=Number(t);return Number.isInteger(n)?(Array.isArray(e==null?void 0:e.color_bins)?e.color_bins:Is(e)).some(i=>i.bin===n&&Number(i.weight||0)>0):!1}function ox(e){const t=new Map;for(const n of e||[]){const r=Array.isArray(n==null?void 0:n.color_bins)?n.color_bins:Is(n);for(const i of r){const a=Number(i.weight||0);if(a<Z1)continue;const o=t.get(i.bin)||Zn(i.bin);o.count+=1,o.weight+=a,t.set(i.bin,o)}}return[...t.values()].map(n=>({...n,weight:Math.round(n.weight*1e3)/1e3})).sort((n,r)=>n.tone-r.tone||n.hue-r.hue)}const Ua=typeof Intl<"u"&&Intl.DisplayNames?new Intl.DisplayNames(["en"],{type:"region"}):null;function Ms(e){const t=String(e||"").trim().toUpperCase();return!/^[A-Z]{2}$/.test(t)||t==="ZZ"?"":(Ua==null?void 0:Ua.of(t))||t}function nm(e){const t=String(e||"").trim().toUpperCase();return!/^[A-Z]{2}$/.test(t)||t==="ZZ"?"":[...t].map(n=>String.fromCodePoint(127462+n.charCodeAt(0)-65)).join("")}function ia(e){return String(e||"").split(";").map(t=>{const[n,r]=t.trim().split(":"),i=String(n||"").trim().toUpperCase();return{code:i,count:Number(r||0),name:Ms(i),flag:nm(i)}}).filter(t=>t.code&&t.name&&Number.isFinite(t.count)&&t.count>0)}function sx(e){const t=String(e||"").trim().toUpperCase();return`${Ms(t)} ${t}`.trim().toLowerCase()}function Xn(e){const t=Ms(e);if(!t)return"";const n=nm(e);return n?`${n} ${t}`:t}function lx(e){const t=ia(e);return t.length?t.map(n=>n.flag).filter(Boolean).join(" "):""}const Vr=[{key:"marine",label:"Marine",aphiaKey:"aphia_is_marine",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 14.2c2.3-2 4.6-2 6.9 0 2.3 2 4.6 2 6.9 0 1-.8 2-1.3 3.2-1.5"/><path d="M3.5 18.4c2.3-2 4.6-2 6.9 0 2.3 2 4.6 2 6.9 0 1-.8 2-1.3 3.2-1.5"/></svg>'},{key:"brackish",label:"Brackish",aphiaKey:"aphia_is_brackish",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c3.5 4.2 5.2 7.4 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2.6 1.7-5.8 5.2-10Z"/><path d="M8.4 15.4c2.4-1.5 4.8-1.5 7.2 0"/></svg>'},{key:"freshwater",label:"Freshwater",aphiaKey:"aphia_is_fresh",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c3.9 4.6 5.8 8 5.8 10.6a5.8 5.8 0 1 1-11.6 0C6.2 11.5 8.1 8.1 12 3.5Z"/></svg>'},{key:"terrestrial",label:"Terrestrial",aphiaKey:"aphia_is_terrestrial",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13.8c6.4-8.4 12.4-8.2 14-8.1.1 1.6.2 7.6-8.2 14-2.9-2.9-3-3-5.8-5.9Z"/><path d="M7.9 16.8 16.5 8.2"/></svg>'}];function ux(e){const t=String(e??"").trim().toLowerCase();return e===!0||e===1||t==="1"||t==="true"||t==="yes"}function On(e){const t=(e==null?void 0:e.enrichment)||e||{};return Vr.filter(n=>ux(t[n.aphiaKey])).map(n=>n.key)}function cx(e){if(!e||e.id<0||!e.file)return Promise.resolve(null);if(Fa.has(e.file))return Fa.get(e.file);const t=new Promise(n=>{const r=new Image;r.decoding="async",r.onload=()=>n(r),r.onerror=()=>n(null),r.src=r$(e.file)});return Fa.set(e.file,t),t}function dx(e,t=1200){if("requestIdleCallback"in window){window.requestIdleCallback(e,{timeout:t});return}window.setTimeout(e,Math.min(t,160))}function Zo(e,t=(n=>(n=h.selected)==null?void 0:n.id)()){if(!e.length)return null;let r=Math.floor(Math.random()*e.length);return t!=null&&e.length>1&&e[r].id===t&&(r=(r+1+Math.floor(Math.random()*(e.length-1)))%e.length),e[r]}function px(){h.surpriseQueue=[],h.surpriseQueueSource=null,window.clearTimeout(h.surprisePrimeTimer),h.surprisePrimeTimer=0}function fx(e){const t=new Set(h.surpriseQueue.map(r=>{var i;return(i=r.shell)==null?void 0:i.id}));let n=null;for(let r=0;r<12;r+=1){const i=Zo(e);if(!(!i||t.has(i.id))){n=i;break}}n||(n=Zo(e)),n&&h.surpriseQueue.push({shell:n,ready:!0})}function rm(e=h.filtered,t=12,n=80){e.length&&(h.surpriseQueueSource!==e&&(h.surpriseQueue=[],h.surpriseQueueSource=e),window.clearTimeout(h.surprisePrimeTimer),h.surprisePrimeTimer=window.setTimeout(()=>{dx(()=>{for(;h.surpriseQueue.length<t;)fx(e)},500)},n))}function hx(e){var t;if(h.surpriseQueueSource!==e||!h.surpriseQueue.length)return null;for(let n=0;n<h.surpriseQueue.length;n+=1){const r=h.surpriseQueue[n];if(!(!(r!=null&&r.shell)||r.shell.id===((t=h.selected)==null?void 0:t.id)))return h.surpriseQueue.splice(n,1),r.shell}return null}/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var zs=Object.defineProperty,mx=Object.getOwnPropertyDescriptor,gx=Object.getOwnPropertyNames,bx=Object.prototype.hasOwnProperty,yx=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),rr=(e,t)=>{for(var n in t)zs(e,n,{get:t[n],enumerable:!0})},wx=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of gx(t))!bx.call(e,i)&&i!==n&&zs(e,i,{get:()=>t[i],enumerable:!(r=mx(t,i))||r.enumerable});return e},Lr=e=>wx(zs({},"__esModule",{value:!0}),e),dr,rn,jn,zc,im,am=q(()=>{dr=new Map,rn=[],jn=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=dr.get(e);if(r===void 0)dr.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let i=rn.indexOf(e);i!==-1&&rn.splice(i,1);for(let a=0;a<rn.length;a++)if(dr.get(rn[a]).priority<=n){rn.splice(a,0,e);return}rn.push(e)}return}throw new TypeError("not a valid backend")},zc=async e=>{let t=dr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},im=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?rn:n,i,a=[],o=new Set;for(let l of r){let u=await zc(l);typeof u=="string"?a.push({name:l,err:u}):(i||(i=u),i===u&&o.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:u}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${u}`);let s=t.filter(l=>o.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,u)=>u==="executionProviders"?s:Reflect.get(l,u)})]}}),_x=q(()=>{am()}),om,xx=q(()=>{om="1.26.0"}),Wa,Ue,sm=q(()=>{xx(),Wa="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:om},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Wa=e}},get logLevel(){return Wa}},Object.defineProperty(Ue,"logLevel",{enumerable:!0})}),Se,vx=q(()=>{sm(),Se=Ue}),lm,um,$x=q(()=>{lm=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let o=(t==null?void 0:t.format)!==void 0?t.format:"RGB",s=t==null?void 0:t.norm,l,u;s===void 0||s.mean===void 0?l=[255,255,255,255]:typeof s.mean=="number"?l=[s.mean,s.mean,s.mean,s.mean]:(l=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(l[3]=s.mean[3])),s===void 0||s.bias===void 0?u=[0,0,0,0]:typeof s.bias=="number"?u=[s.bias,s.bias,s.bias,s.bias]:(u=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(u[3]=s.bias[3]));let d=a*i,p=0,m=d,g=d*2,b=-1;o==="RGBA"?(p=0,m=d,g=d*2,b=d*3):o==="RGB"?(p=0,m=d,g=d*2):o==="RBG"&&(p=0,g=d,m=d*2);for(let _=0;_<a;_++)for(let T=0;T<i;T++){let x=(e.data[p++]-u[0])*l[0],v=(e.data[m++]-u[1])*l[1],I=(e.data[g++]-u[2])*l[2],E=b===-1?255:(e.data[b++]-u[3])*l[3];r.fillStyle="rgba("+x+","+v+","+I+","+E+")",r.fillRect(T,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},um=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let i,a,o;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],o=e.dims[3]):(i=e.dims[3],a=e.dims[2],o=e.dims[1]);let s=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,u,d;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));let p=a*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,g=0,b=1,_=2,T=3,x=0,v=p,I=p*2,E=-1;s==="RGBA"?(x=0,v=p,I=p*2,E=p*3):s==="RGB"?(x=0,v=p,I=p*2):s==="RBG"&&(x=0,I=p,v=p*2),r=n.createImageData(i,a);for(let k=0;k<a*i;g+=m,b+=m,_+=m,T+=m,k++)r.data[g]=(e.data[x++]-d[0])*u[0],r.data[b]=(e.data[v++]-d[1])*u[1],r.data[_]=(e.data[I++]-d[2])*u[2],r.data[T]=E===-1?255:(e.data[E++]-d[3])*u[3]}else throw new Error("Can not access image data");return r}}),pi,cm,dm,pm,fm,hm,Sx=q(()=>{As(),pi=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,o;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?o=[i.bias,i.bias,i.bias,i.bias]:o=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",u=n*r,d=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3),p=4,m=0,g=1,b=2,_=3,T=0,x=u,v=u*2,I=-1;s==="RGB"&&(p=3,m=0,g=1,b=2,_=-1),l==="RGBA"?I=u*3:l==="RBG"?(T=0,v=u,x=u*2):l==="BGR"&&(v=0,x=u,T=u*2);for(let E=0;E<u;E++,m+=p,b+=p,g+=p,_+=p)d[T++]=(e[m]+o[0])/a[0],d[x++]=(e[g]+o[1])/a[1],d[v++]=(e[b]+o[2])/a[2],I!==-1&&_!==-1&&(d[I++]=(e[_]+o[3])/a[3]);return l==="RGBA"?new st("float32",d,[1,4,n,r]):new st("float32",d,[1,3,n,r])},cm=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",o,s=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(n){let d=l();d.width=e.width,d.height=e.height;let p=u(d);if(p!=null){let m=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(s=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=m,s.width=g}else s.tensorFormat="RGBA",s.height=m,s.width=g;p.drawImage(e,0,0),o=p.getImageData(0,0,g,m).data}else throw new Error("Can not access image data")}else if(r){let d,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,p=t.resizedWidth):(d=e.height,p=e.width),t!==void 0&&(s=t),s.format="RGBA",s.height=d,s.width=p,t!==void 0){let m=l();m.width=p,m.height=d;let g=u(m);if(g!=null)g.putImageData(e,0,0),o=g.getImageData(0,0,p,d).data;else throw new Error("Can not access image data")}else o=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=l();d.width=e.width,d.height=e.height;let p=u(d);if(p!=null){let m=e.height,g=e.width;return p.drawImage(e,0,0,g,m),o=p.getImageData(0,0,g,m).data,s.height=m,s.width=g,pi(o,s)}else throw new Error("Can not access image data")}else{if(a)return new Promise((d,p)=>{let m=l(),g=u(m);if(!e||!g)return p();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{m.width=b.width,m.height=b.height,g.drawImage(b,0,0,m.width,m.height);let _=g.getImageData(0,0,m.width,m.height);s.height=m.height,s.width=m.width,d(pi(_.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return pi(o,s);throw new Error("Input data provided is not supported - aborted tensor creation")},dm=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t,o=[1,r,n,4];return new st({location:"texture",type:"float32",texture:e,dims:o,download:i,dispose:a})},pm=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new st({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:i,dispose:a})},fm=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new st({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:i,dispose:a})},hm=(e,t,n)=>new st({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),_n,Sr,qa,mm,kx=q(()=>{_n=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Sr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),qa=!1,mm=()=>{if(!qa){qa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(_n.set("int64",BigInt64Array),Sr.set(BigInt64Array,"int64")),t&&(_n.set("uint64",BigUint64Array),Sr.set(BigUint64Array,"uint64")),r?(_n.set("float16",n),Sr.set(n,"float16")):_n.set("float16",Uint16Array)}}}),gm,bm,Cx=q(()=>{As(),gm=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},bm=(e,t)=>{switch(e.location){case"cpu":return new st(e.type,e.data,t);case"cpu-pinned":return new st({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new st({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new st({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new st({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),st,As=q(()=>{$x(),Sx(),kx(),Cx(),st=class{constructor(e,t,n){mm();let r,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case"cpu-pinned":{let o=_n.get(r);if(!o)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,s;if(typeof e=="string")if(r=e,s=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let l=_n.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?o=l.from(t,BigInt):o=l.from(t)}else if(t instanceof l)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(s=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",o=e;else if(l==="boolean")r="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",o=Uint8Array.from(e);else{let l=Sr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,o=e}if(s===void 0)s=[o.length];else if(!Array.isArray(s))throw new TypeError("A tensor's dims must be a number array");i=s,this.cpuData=o,this.dataLocation="cpu"}let a=gm(i);if(this.cpuData&&a!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return cm(e,t)}static fromTexture(e,t){return dm(e,t)}static fromGpuBuffer(e,t){return pm(e,t)}static fromMLTensor(e,t){return fm(e,t)}static fromPinnedBuffer(e,t,n){return hm(e,t,n)}toDataURL(e){return lm(this,e)}toImageData(e){return um(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return bm(this,e)}}}),$t,ym=q(()=>{As(),$t=st}),Ri,Va,Pt,St,Cn,Tn,wm=q(()=>{sm(),Ri=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},Va=(e,t)=>{var i;let n=((i=new Error().stack)==null?void 0:i.split(/\r\n|\r|\n/g))||[],r=!1;for(let a=0;a<n.length;a++){if(r&&!n[a].includes("TRACE_FUNC")){let o=`FUNC_${e}::${n[a].trim().split(" ")[1]}`;t&&(o+=`::${t}`),Ri("CPU",o);return}n[a].includes("TRACE_FUNC")&&(r=!0)}},Pt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Va("BEGIN",e)},St=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Va("END",e)},Cn=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.time(`ORT::${e}`)},Tn=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeEnd(`ORT::${e}`)}}),_m,Tx=q(()=>{am(),ym(),wm(),_m=class xm{constructor(t){this.handler=t}async run(t,n,r){Pt(),Cn("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof $t||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof $t)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let u of n){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);i[u]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,d=Object.getOwnPropertyNames(n);for(let p of this.outputNames)if(d.indexOf(p)!==-1){let m=n[p];(m===null||m instanceof $t)&&(u=!0,o=!1,i[p]=m)}if(u){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of this.inputNames)if(typeof t[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(o)for(let u of this.outputNames)i[u]=null;let s=await this.handler.run(t,i,a),l={};for(let u in s)if(Object.hasOwnProperty.call(s,u)){let d=s[u];d instanceof $t?l[u]=d:l[u]=new $t(d.type,d.data,d.dims)}return Tn("InferenceSession.run"),St(),l}async release(){return this.handler.dispose()}static async create(t,n,r,i){Pt(),Cn("InferenceSession.create");let a,o={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let d=t,p=0,m=t.byteLength;if(typeof n=="object"&&n!==null)o=n;else if(typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(m=t.byteLength-p,typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||p+m>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-p}].`);if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(d,p,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,l]=await im(o),u=await s.createInferenceSessionHandler(a,l);return Tn("InferenceSession.create"),St(),new xm(u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Ns,Ex=q(()=>{Tx(),Ns=_m}),Ix=q(()=>{}),Mx=q(()=>{}),zx=q(()=>{}),Ax=q(()=>{}),Nx={};rr(Nx,{InferenceSession:()=>Ns,TRACE:()=>Ri,TRACE_EVENT_BEGIN:()=>Cn,TRACE_EVENT_END:()=>Tn,TRACE_FUNC_BEGIN:()=>Pt,TRACE_FUNC_END:()=>St,Tensor:()=>$t,env:()=>Se,registerBackend:()=>jn});var ft=q(()=>{_x(),vx(),Ex(),ym(),Ix(),Mx(),wm(),zx(),Ax()}),Ps=q(()=>{}),vm={};rr(vm,{default:()=>$m});var Ha,Ga,$m,Px=q(()=>{var e;Eb(),Bn(),Rs(),Ha="ort-wasm-proxy-worker",Ga=((e=globalThis.self)==null?void 0:e.name)===Ha,Ga&&(self.onmessage=t=>{let{type:n,in:r}=t.data;try{switch(n){case"init-wasm":Os(r.wasm).then(()=>{Js(r).then(()=>{postMessage({type:n})},i=>{postMessage({type:n,err:i})})},i=>{postMessage({type:n,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;el(a,i).then(()=>{postMessage({type:n})},o=>{postMessage({type:n,err:o})});break}case"copy-from":{let{buffer:i}=r,a=Wi(i);postMessage({type:n,out:a});break}case"create":{let{model:i,options:a}=r;tl(i,a).then(o=>{postMessage({type:n,out:o})},o=>{postMessage({type:n,err:o})});break}case"release":nl(r),postMessage({type:n});break;case"run":{let{sessionId:i,inputIndices:a,inputs:o,outputIndices:s,options:l}=r;rl(i,a,o,s,new Array(s.length).fill(null),l).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:u},al([...o,...u]))},u=>{postMessage({type:n,err:u})});break}case"end-profiling":il(r),postMessage({type:n});break;default:}}catch(i){postMessage({type:n,err:i})}}),$m=Ga?null:t=>new Worker(t??ot,{type:"module",name:Ha})}),Sm={};rr(Sm,{default:()=>km});async function Ac(e={}){var Sc,kc;var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&((Sc=self.name)==null?void 0:Sc.startsWith("em-pthread"));t.mountExternalData=(c,f)=>{c.startsWith("./")&&(c=c.substring(2)),(t.Xc||(t.Xc=new Map)).set(c,f)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=c=>async(...f)=>{var w;try{if(t.Yc)throw Error("Session already started");let y=t.Yc={Kd:f[0],errors:[]},C=await c(...f);if(t.Yc!==y)throw Error("Session mismatch");(w=t.dd)==null||w.flush();let z=y.errors;if(0<z.length){let N=await Promise.all(z);if(N=N.filter(L=>L),0<N.length)throw Error(N.join(`
`))}return C}finally{t.Yc=null}};t.jsepInit=(c,f)=>{if(c==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=f;let w=t.dd;t.jsepRegisterBuffer=(y,C,z,N)=>w.registerBuffer(y,C,z,N),t.jsepGetBuffer=y=>w.getBuffer(y),t.jsepCreateDownloader=(y,C,z)=>w.createDownloader(y,C,z),t.jsepOnCreateSession=y=>{w.onCreateSession(y)},t.jsepOnReleaseSession=y=>{w.onReleaseSession(y)},t.jsepOnRunStart=y=>w.onRunStart(y),t.Id=(y,C)=>{w.upload(y,C)}}else if(c==="webnn"){let w=f[0];[t.Wd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=f.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=y=>w.onRunStart(y),t.webnnOnRunEnd=w.onRunEnd.bind(w),t.webnnOnReleaseSession=y=>{w.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,C)=>w.createMLTensorDownloader(y,C),t.webnnRegisterMLTensor=(y,C,z,N)=>w.registerMLTensor(y,C,z,N),t.webnnCreateMLContext=y=>w.createMLContext(y),t.webnnRegisterMLConstant=(y,C,z,N,L,K)=>w.registerMLConstant(y,C,z,N,L,t.Xc,K),t.webnnRegisterGraphInput=w.registerGraphInput.bind(w),t.webnnIsGraphInput=w.isGraphInput.bind(w),t.webnnRegisterGraphOutput=w.registerGraphOutput.bind(w),t.webnnIsGraphOutput=w.isGraphOutput.bind(w),t.webnnCreateTemporaryTensor=w.createTemporaryTensor.bind(w),t.webnnIsGraphInputOutputTypeSupported=w.isGraphInputOutputTypeSupported.bind(w)}};let o=()=>{let c=f=>(...w)=>{let y=Ct;return w=f(...w),Ct!=y?new Promise((C,z)=>{Ca={resolve:C,reject:z}}):w};(()=>{for(let f of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[f]=c(t[f])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o==null||o()};var s,l,u=(c,f)=>{throw f},d=import.meta.url,p="";if(n||r){try{p=new URL(".",d).href}catch{}r&&(l=c=>{var f=new XMLHttpRequest;return f.open("GET",c,!1),f.responseType="arraybuffer",f.send(null),new Uint8Array(f.response)}),s=async c=>{if(A(c))return new Promise((w,y)=>{var C=new XMLHttpRequest;C.open("GET",c,!0),C.responseType="arraybuffer",C.onload=()=>{C.status==200||C.status==0&&C.response?w(C.response):y(C.status)},C.onerror=y,C.send(null)});var f=await fetch(c,{credentials:"same-origin"});if(f.ok)return f.arrayBuffer();throw Error(f.status+" : "+f.url)}}var m,g,b,_,T,x,v=console.log.bind(console),I=console.error.bind(console),E=v,k=I,M=!1,A=c=>c.startsWith("file://");function S(){Jt.buffer!=O.buffer&&j()}if(i){let c=function(f){try{var w=f.data,y=w.Sc;if(y==="load"){let C=[];self.onmessage=z=>C.push(z),x=()=>{postMessage({Sc:"loaded"});for(let z of C)c(z);self.onmessage=c};for(let z of w.xd)t[z]&&!t[z].proxy||(t[z]=(...N)=>{postMessage({Sc:"callHandler",wd:z,args:N})},z=="print"&&(E=t[z]),z=="printErr"&&(k=t[z]));Jt=w.Od,j(),g=w.Pd,Ke(),ci()}else if(y==="run"){(function(C){var z=(S(),Y)[C+52>>>2>>>0];C=(S(),Y)[C+56>>>2>>>0],Pu(z,z-C),fe(z)})(w.Rc),za(w.Rc,0,0,1,0,0),Rl(),$a(w.Rc),P||(Eu(),P=!0);try{Qy(w.Md,w.bd)}catch(C){if(C!="unwind")throw C}}else w.target!=="setimmediate"&&(y==="checkMailbox"?P&&ri():y&&(k(`worker: received unknown command ${y}`),k(w)))}catch(C){throw Iu(),C}};var P=!1;self.onunhandledrejection=f=>{throw f.reason||f},self.onmessage=c}var O,W,G,X,R,Y,Z,V,ie,F,re,U=!1;function j(){var c=Jt.buffer;t.HEAP8=O=new Int8Array(c),G=new Int16Array(c),t.HEAPU8=W=new Uint8Array(c),X=new Uint16Array(c),t.HEAP32=R=new Int32Array(c),t.HEAPU32=Y=new Uint32Array(c),Z=new Float32Array(c),V=new Float64Array(c),ie=new BigInt64Array(c),F=new BigUint64Array(c)}function Q(){U=!0,i?x():Dt.sb()}function H(c){throw k(c="Aborted("+c+")"),M=!0,c=new WebAssembly.RuntimeError(c+". Build with -sASSERTIONS for more info."),T==null||T(c),c}function _e(){return{a:{ma:__,gb:w_,g:Zy,J:Jy,f:ew,o:tw,h:nw,ha:rw,b:iw,T:aw,Ha:Ul,n:ow,$:Hl,Xa:Gl,Da:jl,Fa:Kl,Ya:Xl,Va:Yl,Oa:Ql,Ua:Zl,ka:Jl,Ea:eu,Ba:tu,Wa:nu,Ca:ru,bb:sw,ea:lw,wa:uw,ua:dw,da:fw,O:hw,H:mw,va:gw,_:$w,xa:Sw,Ra:kw,za:Tw,Ia:Ew,sa:Iw,fa:Mw,Qa:$a,_a:zw,R:Rw,r:Fw,c:xa,hb:Uw,y:Ww,M:qw,D:Vw,l:Hw,s:du,ib:Gw,I:jw,S:Kw,j:Xw,u:Yw,q:Qw,k:Zw,La:Jw,Ma:e_,Na:t_,Ja:mu,Ka:gu,ta:bu,db:r_,ab:a_,v:o_,aa:s_,ga:l_,$a:i_,W:u_,Za:c_,Aa:d_,F:n_,U:p_,la:li,ya:h_,fb:f_,eb:m_,Sa:xu,Ta:vu,Ga:or,V:$u,ja:Su,Pa:ku,ia:Cu,kb:n1,na:Q_,lb:t1,oa:Y_,G:U_,d:S_,t:v_,w:x_,A:P_,mb:j_,K:L_,x:T_,pa:K_,Y:Z_,ba:G_,nb:H_,ob:V_,P:R_,qa:q_,pb:W_,N:D_,Z:X_,e:$_,B:C_,m:k_,jb:r1,p:I_,z:M_,C:E_,E:z_,L:O_,qb:F_,Q:J_,ca:B_,X:e1,rb:N_,ra:A_,i:b_,a:Jt,cb:it}}}async function Ke(){function c(y,C){var z=Dt=y.exports;y={};for(let[N,L]of Object.entries(z))typeof L=="function"?(z=Aw(L),y[N]=z):y[N]=L;return Dt=y,Dt=(function(){var N=Dt,L=J=>pe=>J(pe)>>>0,K=J=>()=>J()>>>0;return(N=Object.assign({},N)).tb=L(N.tb),N.Xb=K(N.Xb),N.Zb=L(N.Zb),N.lc=L(N.lc),N.mc=K(N.mc),N.qc=L(N.qc),N})(),Nl.push(Dt._b),Tu=(y=Dt).tb,Eu=y.ub,t._OrtInit=y.vb,t._OrtGetLastError=y.wb,t._OrtCreateSessionOptions=y.xb,t._OrtAppendExecutionProvider=y.yb,t._OrtAddFreeDimensionOverride=y.zb,t._OrtAddSessionConfigEntry=y.Ab,t._OrtReleaseSessionOptions=y.Bb,t._OrtCreateSession=y.Cb,t._OrtReleaseSession=y.Db,t._OrtGetInputOutputCount=y.Eb,t._OrtGetInputOutputMetadata=y.Fb,t._OrtFree=y.Gb,t._OrtCreateTensor=y.Hb,t._OrtGetTensorData=y.Ib,t._OrtReleaseTensor=y.Jb,t._OrtCreateRunOptions=y.Kb,t._OrtAddRunConfigEntry=y.Lb,t._OrtReleaseRunOptions=y.Mb,t._OrtCreateBinding=y.Nb,t._OrtBindInput=y.Ob,t._OrtBindOutput=y.Pb,t._OrtClearBoundOutputs=y.Qb,t._OrtReleaseBinding=y.Rb,t._OrtRunWithBinding=y.Sb,t._OrtRun=y.Tb,t._OrtEndProfiling=y.Ub,t._JsepOutput=y.Vb,t._JsepGetNodeName=y.Wb,ui=y.Xb,Tt=t._free=y.Yb,ur=t._malloc=y.Zb,za=y.ac,Iu=y.bc,Mu=y.cc,zu=y.dc,Aa=y.ec,Au=y.fc,Nu=y.gc,ge=y.hc,cr=y.ic,Pu=y.jc,fe=y.kc,Na=y.lc,me=y.mc,Ru=y.nc,Pa=y.oc,Ou=y.pc,Bu=y.qc,Lu=y.rc,Ra=y.sc,Du=y.tc,Fu=y.uc,Uu=y.vc,Wu=y.wc,qu=y.xc,Vu=y.yc,Hu=y.zc,Gu=y.Ac,ju=y.Bc,Ku=y.Cc,Xu=y.Dc,Yu=y.Ec,Qu=y.Fc,Zu=y.Gc,Ju=y.Hc,ec=y.Ic,tc=y.Jc,nc=y.Kc,rc=y.Lc,ic=y.Mc,ac=y.Nc,oc=y.Pc,sc=y.Qc,lc=y.$c,uc=y.ad,cc=y.fd,dc=y.jd,pc=y.kd,fc=y.ld,hc=y.md,mc=y.nd,gc=y.od,bc=y.pd,yc=y.qd,wc=y.vd,_c=y.Sd,xc=y.Td,vc=y.Ud,$c=y.Vd,g=C,Dt}var f,w=_e();return t.instantiateWasm?new Promise(y=>{t.instantiateWasm(w,(C,z)=>{y(c(C,z))})}):i?c(new WebAssembly.Instance(g,_e()),g):(re??(re=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href,import.meta.url).href),f=await(async function(y){var C=re;if(!m&&!A(C))try{var z=fetch(C,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(z,y)}catch(N){k(`wasm streaming compile failed: ${N}`),k("falling back to ArrayBuffer instantiation")}return(async function(N,L){try{var K=await(async function(J){if(!m)try{var pe=await s(J);return new Uint8Array(pe)}catch{}if(J==re&&m)J=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";J=l(J)}return J})(N);return await WebAssembly.instantiate(K,L)}catch(J){k(`failed to asynchronously prepare wasm: ${J}`),H(J)}})(C,y)})(w),c(f.instance,f.module))}class Ie{constructor(f){Re(this,"name","ExitStatus");this.message=`Program terminated with exit(${f})`,this.status=f}}var Le=c=>{c.terminate(),c.onmessage=()=>{}},Ze=[],rt=0,Je=null,Qt=c=>{Zt.length==0&&(Bl(),Ol(Zt[0]));var f=Zt.pop();if(!f)return 6;sr.push(f),pn[c.Rc]=f,f.Rc=c.Rc;var w={Sc:"run",Md:c.Ld,bd:c.bd,Rc:c.Rc};return f.postMessage(w,c.rd),0},Te=0,le=(c,f,...w)=>{var y,C=16*w.length,z=me(),N=Na(C),L=N>>>3;for(y of w)typeof y=="bigint"?((S(),ie)[L++>>>0]=1n,(S(),ie)[L++>>>0]=y):((S(),ie)[L++>>>0]=0n,(S(),V)[L++>>>0]=y);return c=Mu(c,0,C,N,f),fe(z),c};function it(c){if(i)return le(0,1,c);if(b=c,!(0<Te)){for(var f of sr)Le(f);for(f of Zt)Le(f);Zt=[],sr=[],pn={},M=!0}u(0,new Ie(c))}function Zr(c){if(i)return le(1,0,c);or(c)}var or=c=>{if(b=c,i)throw Zr(c),"unwind";it(c)},Zt=[],sr=[],Nl=[],pn={},Pl=c=>{var f=c.Rc;delete pn[f],Zt.push(c),sr.splice(sr.indexOf(c),1),c.Rc=0,zu(f)};function Rl(){Nl.forEach(c=>c())}var Ol=c=>new Promise(f=>{c.onmessage=C=>{var z=C.data;if(C=z.Sc,z.Zc&&z.Zc!=ui()){var N=pn[z.Zc];N?N.postMessage(z,z.rd):k(`Internal error! Worker sent a message "${C}" to target pthread ${z.Zc}, but that thread no longer exists!`)}else C==="checkMailbox"?ri():C==="spawnThread"?Qt(z):C==="cleanupThread"?ni(()=>{Pl(pn[z.Nd])}):C==="loaded"?(c.loaded=!0,f(c)):z.target==="setimmediate"?c.postMessage(z):C==="uncaughtException"?c.onerror(z.error):C==="callHandler"?t[z.wd](...z.args):C&&k(`worker sent an unknown command ${C}`)},c.onerror=C=>{throw k(`worker sent an error! ${C.filename}:${C.lineno}: ${C.message}`),C};var w,y=[];for(w of[])t.propertyIsEnumerable(w)&&y.push(w);c.postMessage({Sc:"load",xd:y,Od:Jt,Pd:g})});function Bl(){var c=new Worker((()=>{let f=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new f("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Zt.push(c)}var Jt,Qy=(c,f)=>{Te=0,c=Ra(c,f),0<Te?b=c:Aa(c)},Jr=[],ei=0;function Zy(c){var f=new ba(c>>>=0);return(S(),O)[f.Tc+12>>>0]==0&&(Ll(f,!0),ei--),Dl(f,!1),Jr.push(f),Bu(c)}var Dn=0,Jy=()=>{ge(0,0);var c=Jr.pop();Ru(c.cd),Dn=0};function Ll(c,f){f=f?1:0,(S(),O)[c.Tc+12>>>0]=f}function Dl(c,f){f=f?1:0,(S(),O)[c.Tc+13>>>0]=f}class ba{constructor(f){this.cd=f,this.Tc=f-24}}var ya=c=>{var f=Dn;if(!f)return cr(0),0;var w=new ba(f);(S(),Y)[w.Tc+16>>>2>>>0]=f;var y=(S(),Y)[w.Tc+4>>>2>>>0];if(!y)return cr(0),f;for(var C of c){if(C===0||C===y)break;if(Ou(C,y,w.Tc+16))return cr(C),f}return cr(y),f};function ew(){return ya([])}function tw(c){return ya([c>>>0])}function nw(c,f,w,y){return ya([c>>>0,f>>>0,w>>>0,y>>>0])}var rw=()=>{var c=Jr.pop();c||H("no exception to throw");var f=c.cd;throw(S(),O)[c.Tc+13>>>0]==0&&(Jr.push(c),Dl(c,!0),Ll(c,!1),ei++),Pa(f),Dn=f};function iw(c,f,w){var y=new ba(c>>>=0);throw f>>>=0,w>>>=0,(S(),Y)[y.Tc+16>>>2>>>0]=0,(S(),Y)[y.Tc+4>>>2>>>0]=f,(S(),Y)[y.Tc+8>>>2>>>0]=w,Pa(c),ei++,Dn=c}var aw=()=>ei;function Fl(c,f,w,y){return i?le(2,1,c,f,w,y):Ul(c,f,w,y)}function Ul(c,f,w,y){if(c>>>=0,f>>>=0,w>>>=0,y>>>=0,!globalThis.SharedArrayBuffer)return 6;var C=[];return i&&C.length===0?Fl(c,f,w,y):(c={Ld:w,Rc:c,bd:y,rd:C},i?(c.Sc="spawnThread",postMessage(c,C),0):Qt(c))}function ow(c){throw Dn||(Dn=c>>>0),Dn}var Wl=globalThis.TextDecoder&&new TextDecoder,ql=(c,f,w,y)=>{if(w=f+w,y)return w;for(;c[f]&&!(f>=w);)++f;return f},Vl=(c,f=0,w,y)=>{if(16<(w=ql(c,f>>>=0,w,y))-f&&c.buffer&&Wl)return Wl.decode(c.buffer instanceof ArrayBuffer?c.subarray(f,w):c.slice(f,w));for(y="";f<w;){var C=c[f++];if(128&C){var z=63&c[f++];if((224&C)==192)y+=String.fromCharCode((31&C)<<6|z);else{var N=63&c[f++];65536>(C=(240&C)==224?(15&C)<<12|z<<6|N:(7&C)<<18|z<<12|N<<6|63&c[f++])?y+=String.fromCharCode(C):(C-=65536,y+=String.fromCharCode(55296|C>>10,56320|1023&C))}}else y+=String.fromCharCode(C)}return y},Ne=(c,f,w)=>(c>>>=0)?Vl((S(),W),c,f,w):"";function Hl(c,f,w){return i?le(3,1,c,f,w):0}function Gl(c,f){if(i)return le(4,1,c,f)}function jl(c,f){if(i)return le(5,1,c,f)}function Kl(c,f,w){if(i)return le(6,1,c,f,w)}function Xl(c,f,w){return i?le(7,1,c,f,w):0}function Yl(c,f){if(i)return le(8,1,c,f)}function Ql(c,f,w){if(i)return le(9,1,c,f,w)}function Zl(c,f,w,y){if(i)return le(10,1,c,f,w,y)}function Jl(c,f,w,y){if(i)return le(11,1,c,f,w,y)}function eu(c,f,w,y){if(i)return le(12,1,c,f,w,y)}function tu(c){if(i)return le(13,1,c)}function nu(c,f){if(i)return le(14,1,c,f)}function ru(c,f,w){if(i)return le(15,1,c,f,w)}var sw=()=>H(""),kt=c=>{c>>>=0;for(var f="";;){var w=(S(),W)[c++>>>0];if(!w)return f;f+=String.fromCharCode(w)}},wa={},_a={},Fn=class extends Error{constructor(c){super(c),this.name="BindingError"}};function Lt(c,f,w={}){return(function(y,C,z={}){var N=C.name;if(!y)throw new Fn(`type "${N}" must have a positive integer typeid pointer`);if(_a.hasOwnProperty(y)){if(z.yd)return;throw new Fn(`Cannot register type '${N}' twice`)}_a[y]=C,wa.hasOwnProperty(y)&&(C=wa[y],delete wa[y],C.forEach(L=>L()))})(c,f,w)}var iu=(c,f,w)=>{switch(f){case 1:return w?y=>(S(),O)[y>>>0]:y=>(S(),W)[y>>>0];case 2:return w?y=>(S(),G)[y>>>1>>>0]:y=>(S(),X)[y>>>1>>>0];case 4:return w?y=>(S(),R)[y>>>2>>>0]:y=>(S(),Y)[y>>>2>>>0];case 8:return w?y=>(S(),ie)[y>>>3>>>0]:y=>(S(),F)[y>>>3>>>0];default:throw new TypeError(`invalid integer width (${f}): ${c}`)}};function lw(c,f,w,y,C){c>>>=0,w>>>=0,f=kt(f>>>0);let z=N=>N;if(y=y===0n){let N=8*w;z=L=>BigInt.asUintN(N,L),C=z(C)}Lt(c,{name:f,Oc:z,Vc:(N,L)=>(typeof L=="number"&&(L=BigInt(L)),L),Uc:iu(f,w,!y),Wc:null})}function uw(c,f,w,y){Lt(c>>>=0,{name:f=kt(f>>>0),Oc:function(C){return!!C},Vc:function(C,z){return z?w:y},Uc:function(C){return this.Oc((S(),W)[C>>>0])},Wc:null})}var au=[],fn=[0,1,,1,null,1,!0,1,!1,1];function xa(c){9<(c>>>=0)&&--fn[c+1]==0&&(fn[c]=void 0,au.push(c))}var dt=c=>{if(!c)throw new Fn(`Cannot use deleted val. handle = ${c}`);return fn[c]},mt=c=>{switch(c){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let f=au.pop()||fn.length;return fn[f]=c,fn[f+1]=1,f}};function va(c){return this.Oc((S(),Y)[c>>>2>>>0])}var cw={name:"emscripten::val",Oc:c=>{var f=dt(c);return xa(c),f},Vc:(c,f)=>mt(f),Uc:va,Wc:null};function dw(c){return Lt(c>>>0,cw)}var pw=(c,f)=>{switch(f){case 4:return function(w){return this.Oc((S(),Z)[w>>>2>>>0])};case 8:return function(w){return this.Oc((S(),V)[w>>>3>>>0])};default:throw new TypeError(`invalid float width (${f}): ${c}`)}};function fw(c,f,w){w>>>=0,Lt(c>>>=0,{name:f=kt(f>>>0),Oc:y=>y,Vc:(y,C)=>C,Uc:pw(f,w),Wc:null})}function hw(c,f,w,y,C){c>>>=0,w>>>=0,f=kt(f>>>0);let z=L=>L;if(y===0){var N=32-8*w;z=L=>L<<N>>>N,C=z(C)}Lt(c,{name:f,Oc:z,Vc:(L,K)=>K,Uc:iu(f,w,y!==0),Wc:null})}function mw(c,f,w){function y(z){var N=(S(),Y)[z>>>2>>>0];return z=(S(),Y)[z+4>>>2>>>0],new C((S(),O).buffer,z,N)}var C=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][f];Lt(c>>>=0,{name:w=kt(w>>>0),Oc:y,Uc:y},{yd:!0})}var en=(c,f,w)=>{var y=(S(),W);if(f>>>=0,0<w){var C=f;w=f+w-1;for(var z=0;z<c.length;++z){var N=c.codePointAt(z);if(127>=N){if(f>=w)break;y[f++>>>0]=N}else if(2047>=N){if(f+1>=w)break;y[f++>>>0]=192|N>>6,y[f++>>>0]=128|63&N}else if(65535>=N){if(f+2>=w)break;y[f++>>>0]=224|N>>12,y[f++>>>0]=128|N>>6&63,y[f++>>>0]=128|63&N}else{if(f+3>=w)break;y[f++>>>0]=240|N>>18,y[f++>>>0]=128|N>>12&63,y[f++>>>0]=128|N>>6&63,y[f++>>>0]=128|63&N,z++}}y[f>>>0]=0,c=f-C}else c=0;return c},ti=c=>{for(var f=0,w=0;w<c.length;++w){var y=c.charCodeAt(w);127>=y?f++:2047>=y?f+=2:55296<=y&&57343>=y?(f+=4,++w):f+=3}return f};function gw(c,f){Lt(c>>>=0,{name:f=kt(f>>>0),Oc(w){var y=(S(),Y)[w>>>2>>>0];return y=Ne(w+4,y,!0),Tt(w),y},Vc(w,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var C=typeof y=="string";if(!(C||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new Fn("Cannot pass non-string to std::string");var z=C?ti(y):y.length,N=ur(4+z+1),L=N+4;return(S(),Y)[N>>>2>>>0]=z,C?en(y,L,z+1):(S(),W).set(y,L>>>0),w!==null&&w.push(Tt,N),N},Uc:va,Wc(w){Tt(w)}})}var ou=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,bw=(c,f,w)=>{if(c>>>=1,16<(f=ql((S(),X),c,f/2,w))-c&&ou)return ou.decode((S(),X).slice(c,f));for(w="";c<f;++c){var y=(S(),X)[c>>>0];w+=String.fromCharCode(y)}return w},yw=(c,f,w)=>{if(w??(w=2147483647),2>w)return 0;var y=f;w=(w-=2)<2*c.length?w/2:c.length;for(var C=0;C<w;++C){var z=c.charCodeAt(C);(S(),G)[f>>>1>>>0]=z,f+=2}return(S(),G)[f>>>1>>>0]=0,f-y},ww=c=>2*c.length,_w=(c,f,w)=>{var y="";c>>>=2;for(var C=0;!(C>=f/4);C++){var z=(S(),Y)[c+C>>>0];if(!z&&!w)break;y+=String.fromCodePoint(z)}return y},xw=(c,f,w)=>{if(f>>>=0,w??(w=2147483647),4>w)return 0;var y=f;w=y+w-4;for(var C=0;C<c.length;++C){var z=c.codePointAt(C);if(65535<z&&C++,(S(),R)[f>>>2>>>0]=z,(f+=4)+4>w)break}return(S(),R)[f>>>2>>>0]=0,f-y},vw=c=>{for(var f=0,w=0;w<c.length;++w)65535<c.codePointAt(w)&&w++,f+=4;return f};function $w(c,f,w){if(c>>>=0,f>>>=0,w=kt(w>>>=0),f===2)var y=bw,C=yw,z=ww;else y=_w,C=xw,z=vw;Lt(c,{name:w,Oc:N=>{var L=(S(),Y)[N>>>2>>>0];return L=y(N+4,L*f,!0),Tt(N),L},Vc:(N,L)=>{if(typeof L!="string")throw new Fn(`Cannot pass non-string to C++ string type ${w}`);var K=z(L),J=ur(4+K+f);return(S(),Y)[J>>>2>>>0]=K/f,C(L,J+4,K+f),N!==null&&N.push(Tt,J),J},Uc:va,Wc(N){Tt(N)}})}function Sw(c,f){Lt(c>>>=0,{zd:!0,name:f=kt(f>>>0),Oc:()=>{},Vc:()=>{}})}function kw(c){za(c>>>0,!r,1,!n,131072,!1),Rl()}var ni=c=>{if(!M)try{if(c(),!(0<Te))try{i?ui()&&Aa(b):or(b)}catch(f){f instanceof Ie||f=="unwind"||u(0,f)}}catch(f){f instanceof Ie||f=="unwind"||u(0,f)}},Cw=!Atomics.waitAsync||((kc=globalThis.navigator)==null?void 0:kc.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function $a(c){c>>>=0,Cw||(Atomics.waitAsync((S(),R),c>>>2,c).value.then(ri),c+=128,Atomics.store((S(),R),c>>>2,1))}var ri=()=>ni(()=>{var c=ui();c&&($a(c),Nu())});function Tw(c,f){(c>>>=0)==f>>>0?setTimeout(ri):i?postMessage({Zc:c,Sc:"checkMailbox"}):(c=pn[c])&&c.postMessage({Sc:"checkMailbox"})}var Sa=[];function Ew(c,f,w,y,C){for(f>>>=0,C>>>=0,Sa.length=0,w=C>>>3,y=C+y>>>3;w<y;){var z;z=(S(),ie)[w++>>>0]?(S(),ie)[w++>>>0]:(S(),V)[w++>>>0],Sa.push(z)}return(f?Oa[f]:y_[c])(...Sa)}var Iw=()=>{Te=0};function Mw(c){c>>>=0,i?postMessage({Sc:"cleanupThread",Nd:c}):Pl(pn[c])}function zw(c){}var ii=c=>{try{c()}catch(f){H(f)}};function Aw(c){var f=(...w)=>{ai.push(c);try{return c(...w)}finally{M||(ai.pop(),Ct&&tn===1&&ai.length===0&&(tn=0,Te+=1,ii(xc),typeof Fibers<"u"&&Fibers.Zd()))}};return uu.set(c,f),f}var tn=0,Ct=null,su=0,ai=[],ka=new Map,lu=new Map,uu=new Map,Nw=0,Ca=null,Pw=[],cu=c=>(function(f){if(!M){if(tn===0){var w=!1,y=!1;f((C=0)=>{if(!M&&(su=C,w=!0,y)){tn=2,ii(()=>vc(Ct)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),C=!1;try{var z=(function(){var K=(S(),R)[Ct+8>>>2>>>0];return K=lu.get(K),K=uu.get(K),--Te,K()})()}catch(K){z=K,C=!0}var N=!1;if(!Ct){var L=Ca;L&&(Ca=null,(C?L.reject:L.resolve)(z),N=!0)}if(C&&!N)throw z}}),y=!0,w||(tn=1,Ct=(function(){var C=ur(65548),z=C+12;if((S(),Y)[C>>>2>>>0]=z,(S(),Y)[C+4>>>2>>>0]=z+65536,z=ai[0],!ka.has(z)){var N=Nw++;ka.set(z,N),lu.set(N,z)}return z=ka.get(z),(S(),R)[C+8>>>2>>>0]=z,C})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),ii(()=>_c(Ct)))}else tn===2?(tn=0,ii($c),Tt(Ct),Ct=null,Pw.forEach(ni)):H(`invalid state: ${tn}`);return su}})(f=>{c().then(f)});function Rw(c){return c>>>=0,cu(async()=>{var f=await dt(c);return mt(f)})}var Ta=[],Ow=c=>{var f=Ta.length;return Ta.push(c),f},Bw=(c,f)=>{for(var w=Array(c),y=0;y<c;++y){var C=y,z=(S(),Y)[f+4*y>>>2>>>0],N=_a[z];if(N===void 0)throw c=`parameter ${y}`,z=Tu(z),f=kt(z),Tt(z),new Fn(`${c} has unknown type ${f}`);w[C]=N}return w},Lw=(c,f,w)=>{var y=[];return c=c(y,w),y.length&&((S(),Y)[f>>>2>>>0]=mt(y)),c},Dw={},oi=c=>{var f=Dw[c];return f===void 0?kt(c):f};function Fw(c,f,w){var[y,...C]=Bw(c,f>>>0);f=y.Vc.bind(y);var z=C.map(K=>K.Uc.bind(K));c--;var N={toValue:dt};switch(c=z.map((K,J)=>{var pe=`argFromPtr${J}`;return N[pe]=K,`${pe}(args${J?"+"+8*J:""})`}),w){case 0:var L="toValue(handle)";break;case 2:L="new (toValue(handle))";break;case 3:L="";break;case 1:N.getStringOrSymbol=oi,L="toValue(handle)[getStringOrSymbol(methodName)]"}return L+=`(${c})`,y.zd||(N.toReturnWire=f,N.emval_returnValue=Lw,L=`return emval_returnValue(toReturnWire, destructorsRef, ${L})`),L=`return function (handle, methodName, destructorsRef, args) {
  ${L}
  }`,w=new Function(Object.keys(N),L)(...Object.values(N)),L=`methodCaller<(${C.map(K=>K.name)}) => ${y.name}>`,Ow(Object.defineProperty(w,"name",{value:L}))}function Uw(c,f){return f>>>=0,(c=dt(c>>>0))==dt(f)}function Ww(c){return(c>>>=0)?(c=oi(c),mt(globalThis[c])):mt(globalThis)}function qw(c){return c=oi(c>>>0),mt(t[c])}function Vw(c,f){return f>>>=0,c=dt(c>>>0),f=dt(f),mt(c[f])}function Hw(c){9<(c>>>=0)&&(fn[c+1]+=1)}function du(c,f,w,y,C){return Ta[c>>>0](f>>>0,w>>>0,y>>>0,C>>>0)}function Gw(c,f,w,y,C){return du(c>>>0,f>>>0,w>>>0,y>>>0,C>>>0)}function jw(){return mt([])}function Kw(c){c=dt(c>>>0);for(var f=Array(c.length),w=0;w<c.length;w++)f[w]=c[w];return mt(f)}function Xw(c){return mt(oi(c>>>0))}function Yw(){return mt({})}function Qw(c){for(var f=dt(c>>>=0);f.length;){var w=f.pop();f.pop()(w)}xa(c)}function Zw(c,f,w){f>>>=0,w>>>=0,c=dt(c>>>0),f=dt(f),w=dt(w),c[f]=w}function Jw(c,f){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),f>>>=0,c=new Date(1e3*c),(S(),R)[f>>>2>>>0]=c.getUTCSeconds(),(S(),R)[f+4>>>2>>>0]=c.getUTCMinutes(),(S(),R)[f+8>>>2>>>0]=c.getUTCHours(),(S(),R)[f+12>>>2>>>0]=c.getUTCDate(),(S(),R)[f+16>>>2>>>0]=c.getUTCMonth(),(S(),R)[f+20>>>2>>>0]=c.getUTCFullYear()-1900,(S(),R)[f+24>>>2>>>0]=c.getUTCDay(),c=(c.getTime()-Date.UTC(c.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(S(),R)[f+28>>>2>>>0]=c}var pu=c=>c%4==0&&(c%100!=0||c%400==0),fu=[0,31,60,91,121,152,182,213,244,274,305,335],hu=[0,31,59,90,120,151,181,212,243,273,304,334];function e_(c,f){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),f>>>=0,c=new Date(1e3*c),(S(),R)[f>>>2>>>0]=c.getSeconds(),(S(),R)[f+4>>>2>>>0]=c.getMinutes(),(S(),R)[f+8>>>2>>>0]=c.getHours(),(S(),R)[f+12>>>2>>>0]=c.getDate(),(S(),R)[f+16>>>2>>>0]=c.getMonth(),(S(),R)[f+20>>>2>>>0]=c.getFullYear()-1900,(S(),R)[f+24>>>2>>>0]=c.getDay();var w=(pu(c.getFullYear())?fu:hu)[c.getMonth()]+c.getDate()-1|0;(S(),R)[f+28>>>2>>>0]=w,(S(),R)[f+36>>>2>>>0]=-60*c.getTimezoneOffset(),w=new Date(c.getFullYear(),6,1).getTimezoneOffset();var y=new Date(c.getFullYear(),0,1).getTimezoneOffset();c=0|(w!=y&&c.getTimezoneOffset()==Math.min(y,w)),(S(),R)[f+32>>>2>>>0]=c}function t_(c){c>>>=0;var f=new Date((S(),R)[c+20>>>2>>>0]+1900,(S(),R)[c+16>>>2>>>0],(S(),R)[c+12>>>2>>>0],(S(),R)[c+8>>>2>>>0],(S(),R)[c+4>>>2>>>0],(S(),R)[c>>>2>>>0],0),w=(S(),R)[c+32>>>2>>>0],y=f.getTimezoneOffset(),C=new Date(f.getFullYear(),6,1).getTimezoneOffset(),z=new Date(f.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(z,C);return 0>w?(S(),R)[c+32>>>2>>>0]=+(C!=z&&N==y):0<w!=(N==y)&&(C=Math.max(z,C),f.setTime(f.getTime()+6e4*((0<w?N:C)-y))),(S(),R)[c+24>>>2>>>0]=f.getDay(),w=(pu(f.getFullYear())?fu:hu)[f.getMonth()]+f.getDate()-1|0,(S(),R)[c+28>>>2>>>0]=w,(S(),R)[c>>>2>>>0]=f.getSeconds(),(S(),R)[c+4>>>2>>>0]=f.getMinutes(),(S(),R)[c+8>>>2>>>0]=f.getHours(),(S(),R)[c+12>>>2>>>0]=f.getDate(),(S(),R)[c+16>>>2>>>0]=f.getMonth(),(S(),R)[c+20>>>2>>>0]=f.getYear(),c=f.getTime(),BigInt(isNaN(c)?-1:c/1e3)}function mu(c,f,w,y,C,z,N){return i?le(16,1,c,f,w,y,C,z,N):-52}function gu(c,f,w,y,C,z){if(i)return le(17,1,c,f,w,y,C,z)}var lr={},n_=()=>performance.timeOrigin+performance.now();function bu(c,f){if(i)return le(18,1,c,f);if(lr[c]&&(clearTimeout(lr[c].id),delete lr[c]),!f)return 0;var w=setTimeout(()=>{delete lr[c],ni(()=>Au(c,performance.timeOrigin+performance.now()))},f);return lr[c]={id:w,Yd:f},0}function r_(c,f,w,y){c>>>=0,f>>>=0,w>>>=0,y>>>=0;var C=new Date().getFullYear(),z=new Date(C,0,1).getTimezoneOffset();C=new Date(C,6,1).getTimezoneOffset();var N=Math.max(z,C);(S(),Y)[c>>>2>>>0]=60*N,(S(),R)[f>>>2>>>0]=+(z!=C),c=(f=L=>{var K=Math.abs(L);return`UTC${0<=L?"-":"+"}${String(Math.floor(K/60)).padStart(2,"0")}${String(K%60).padStart(2,"0")}`})(z),f=f(C),C<z?(en(c,w,17),en(f,y,17)):(en(c,y,17),en(f,w,17))}var i_=()=>Date.now();function a_(c,f,w){return w>>>=0,0<=c&&3>=c?(c===0?c=Date.now():c=performance.timeOrigin+performance.now(),c=Math.round(1e6*c),(S(),ie)[w>>>3>>>0]=BigInt(c),0):28}var Ea=[],yu=(c,f)=>{Ea.length=0;for(var w;w=(S(),W)[c++>>>0];){var y=w!=105;f+=(y&=w!=112)&&f%8?4:0,Ea.push(w==112?(S(),Y)[f>>>2>>>0]:w==106?(S(),ie)[f>>>3>>>0]:w==105?(S(),R)[f>>>2>>>0]:(S(),V)[f>>>3>>>0]),f+=y?8:4}return Ea};function o_(c,f,w){return c>>>=0,f=yu(f>>>0,w>>>0),Oa[c](...f)}function s_(c,f,w){return c>>>=0,f=yu(f>>>0,w>>>0),Oa[c](...f)}var l_=()=>{};function u_(c,f){return k(Ne(c>>>0,f>>>0))}var c_=()=>{throw Te+=1,"unwind"};function d_(){return 4294901760}var p_=()=>navigator.hardwareConcurrency,hn={},si=c=>{var f;return(f=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(c))?+f[1]:(f=/:(\d+):\d+(?:\)|$)/.exec(c))?2147483648|+f[1]:0},wu=c=>{for(var f of c)(c=si(f))&&(hn[c]=f)};function f_(){var c=Error().stack.toString().split(`
`);return c[0]=="Error"&&c.shift(),wu(c),hn.gd=si(c[3]),hn.Jd=c,hn.gd}function li(c){if(!(c=hn[c>>>0]))return 0;var f;if(f=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(c))c=f[1];else if(f=/^\s+at (.*) \(.*\)$/.exec(c))c=f[1];else{if(!(f=/^(.+?)@/.exec(c)))return 0;c=f[1]}Tt(li.hd??0),f=ti(c)+1;var w=ur(f);return w&&en(c,w,f),li.hd=w,li.hd}function h_(c){c>>>=0;var f=(S(),W).length;if(c<=f||4294901760<c)return!1;for(var w=1;4>=w;w*=2){var y=f*(1+.2/w);y=Math.min(y,c+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(c,y)/65536))-Jt.buffer.byteLength+65535)/65536|0;try{Jt.grow(y),j();var C=1;break e}catch{}C=void 0}if(C)return!0}return!1}function m_(c,f,w){if(c>>>=0,f>>>=0,hn.gd==c)var y=hn.Jd;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),wu(y);for(var C=3;y[C]&&si(y[C])!=c;)++C;for(c=0;c<w&&y[c+C];++c)(S(),R)[f+4*c>>>2>>>0]=si(y[c+C]);return c}var Ia,Ma={},_u=()=>{var y;if(!Ia){var c,f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((y=globalThis.navigator)==null?void 0:y.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(c in Ma)Ma[c]===void 0?delete f[c]:f[c]=Ma[c];var w=[];for(c in f)w.push(`${c}=${f[c]}`);Ia=w}return Ia};function xu(c,f){if(i)return le(19,1,c,f);c>>>=0,f>>>=0;var w,y=0,C=0;for(w of _u()){var z=f+y;(S(),Y)[c+C>>>2>>>0]=z,y+=en(w,z,1/0)+1,C+=4}return 0}function vu(c,f){if(i)return le(20,1,c,f);c>>>=0,f>>>=0;var w=_u();for(var y of((S(),Y)[c>>>2>>>0]=w.length,c=0,w))c+=ti(y)+1;return(S(),Y)[f>>>2>>>0]=c,0}function $u(c){return i?le(21,1,c):52}function Su(c,f,w,y){return i?le(22,1,c,f,w,y):52}function ku(c,f,w,y){return i?le(23,1,c,f,w,y):70}var g_=[null,[],[]];function Cu(c,f,w,y){if(i)return le(24,1,c,f,w,y);f>>>=0,w>>>=0,y>>>=0;for(var C=0,z=0;z<w;z++){var N=(S(),Y)[f>>>2>>>0],L=(S(),Y)[f+4>>>2>>>0];f+=8;for(var K=0;K<L;K++){var J=c,pe=(S(),W)[N+K>>>0],we=g_[J];pe===0||pe===10?((J===1?E:k)(Vl(we)),we.length=0):we.push(pe)}C+=L}return(S(),Y)[y>>>2>>>0]=C,0}function b_(c){return c>>>0}i||(function(){for(var c=t.numThreads-1;c--;)Bl();Ze.push(async()=>{var f=(async function(){if(!i)return Promise.all(Zt.map(Ol))})();rt++,await f,--rt==0&&Je&&(f=Je,Je=null,f())})})(),i||(Jt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),j()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>me(),t.stackRestore=c=>fe(c),t.stackAlloc=c=>Na(c),t.setValue=function(c,f,w="i8"){switch(w.endsWith("*")&&(w="*"),w){case"i1":case"i8":(S(),O)[c>>>0]=f;break;case"i16":(S(),G)[c>>>1>>>0]=f;break;case"i32":(S(),R)[c>>>2>>>0]=f;break;case"i64":(S(),ie)[c>>>3>>>0]=BigInt(f);break;case"float":(S(),Z)[c>>>2>>>0]=f;break;case"double":(S(),V)[c>>>3>>>0]=f;break;case"*":(S(),Y)[c>>>2>>>0]=f;break;default:H(`invalid type for setValue: ${w}`)}},t.getValue=function(c,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":return(S(),O)[c>>>0];case"i16":return(S(),G)[c>>>1>>>0];case"i32":return(S(),R)[c>>>2>>>0];case"i64":return(S(),ie)[c>>>3>>>0];case"float":return(S(),Z)[c>>>2>>>0];case"double":return(S(),V)[c>>>3>>>0];case"*":return(S(),Y)[c>>>2>>>0];default:H(`invalid type for getValue: ${f}`)}},t.UTF8ToString=Ne,t.stringToUTF8=en,t.lengthBytesUTF8=ti;var Tu,Eu,ui,Tt,ur,za,Iu,Mu,zu,Aa,Au,Nu,ge,cr,Pu,fe,Na,me,Ru,Pa,Ou,Bu,Lu,Ra,Du,Fu,Uu,Wu,qu,Vu,Hu,Gu,ju,Ku,Xu,Yu,Qu,Zu,Ju,ec,tc,nc,rc,ic,ac,oc,sc,lc,uc,cc,dc,pc,fc,hc,mc,gc,bc,yc,wc,_c,xc,vc,$c,Dt,y_=[it,Zr,Fl,Hl,Gl,jl,Kl,Xl,Yl,Ql,Zl,Jl,eu,tu,nu,ru,mu,gu,bu,xu,vu,$u,Su,ku,Cu],Oa={973212:(c,f,w,y,C)=>{if(t===void 0||!t.Xc)return 1;if((c=Ne(Number(c>>>0))).startsWith("./")&&(c=c.substring(2)),!(c=t.Xc.get(c)))return 2;if(f=Number(f>>>0),w=Number(w>>>0),y=Number(y>>>0),f+w>c.byteLength)return 3;try{let z=c.subarray(f,f+w);switch(C){case 0:(S(),W).set(z,y>>>0);break;case 1:t.Qd?t.Qd(y,z):t.Id(y,z);break;default:return 4}return 0}catch{return 4}},974036:(c,f,w)=>{t.td(c,(S(),W).subarray(f>>>0,f+w>>>0))},974100:()=>t.Wd(),974142:c=>{t.sd(c)},974179:()=>{t.Bd()},974210:()=>{t.Cd()},974239:()=>{t.Gd()},974264:c=>t.Ad(c),974297:c=>t.Ed(c),974329:(c,f,w)=>{t.ed(Number(c),Number(f),Number(w),!0)},974392:(c,f,w)=>{t.ed(Number(c),Number(f),Number(w))},974449:()=>typeof wasmOffsetConverter<"u",974506:c=>{t.$b("Abs",c,void 0)},974557:c=>{t.$b("Neg",c,void 0)},974608:c=>{t.$b("Floor",c,void 0)},974661:c=>{t.$b("Ceil",c,void 0)},974713:c=>{t.$b("Reciprocal",c,void 0)},974771:c=>{t.$b("Sqrt",c,void 0)},974823:c=>{t.$b("Exp",c,void 0)},974874:c=>{t.$b("Erf",c,void 0)},974925:c=>{t.$b("Sigmoid",c,void 0)},974980:(c,f,w)=>{t.$b("HardSigmoid",c,{alpha:f,beta:w})},975059:c=>{t.$b("Log",c,void 0)},975110:c=>{t.$b("Sin",c,void 0)},975161:c=>{t.$b("Cos",c,void 0)},975212:c=>{t.$b("Tan",c,void 0)},975263:c=>{t.$b("Asin",c,void 0)},975315:c=>{t.$b("Acos",c,void 0)},975367:c=>{t.$b("Atan",c,void 0)},975419:c=>{t.$b("Sinh",c,void 0)},975471:c=>{t.$b("Cosh",c,void 0)},975523:c=>{t.$b("Asinh",c,void 0)},975576:c=>{t.$b("Acosh",c,void 0)},975629:c=>{t.$b("Atanh",c,void 0)},975682:c=>{t.$b("Tanh",c,void 0)},975734:c=>{t.$b("Not",c,void 0)},975785:(c,f,w)=>{t.$b("Clip",c,{min:f,max:w})},975854:c=>{t.$b("Clip",c,void 0)},975906:(c,f)=>{t.$b("Elu",c,{alpha:f})},975964:c=>{t.$b("Gelu",c,void 0)},976016:c=>{t.$b("Relu",c,void 0)},976068:(c,f)=>{t.$b("LeakyRelu",c,{alpha:f})},976132:(c,f)=>{t.$b("ThresholdedRelu",c,{alpha:f})},976202:(c,f)=>{t.$b("Cast",c,{to:f})},976260:c=>{t.$b("Add",c,void 0)},976311:c=>{t.$b("Sub",c,void 0)},976362:c=>{t.$b("Mul",c,void 0)},976413:c=>{t.$b("Div",c,void 0)},976464:c=>{t.$b("Pow",c,void 0)},976515:c=>{t.$b("Equal",c,void 0)},976568:c=>{t.$b("Greater",c,void 0)},976623:c=>{t.$b("GreaterOrEqual",c,void 0)},976685:c=>{t.$b("Less",c,void 0)},976737:c=>{t.$b("LessOrEqual",c,void 0)},976796:(c,f,w,y,C)=>{t.$b("ReduceMean",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},976971:(c,f,w,y,C)=>{t.$b("ReduceMax",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},977145:(c,f,w,y,C)=>{t.$b("ReduceMin",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},977319:(c,f,w,y,C)=>{t.$b("ReduceProd",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},977494:(c,f,w,y,C)=>{t.$b("ReduceSum",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},977668:(c,f,w,y,C)=>{t.$b("ReduceL1",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},977841:(c,f,w,y,C)=>{t.$b("ReduceL2",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},978014:(c,f,w,y,C)=>{t.$b("ReduceLogSum",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},978191:(c,f,w,y,C)=>{t.$b("ReduceSumSquare",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},978371:(c,f,w,y,C)=>{t.$b("ReduceLogSumExp",c,{keepDims:!!f,noopWithEmptyAxes:!!w,axes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},978551:c=>{t.$b("Where",c,void 0)},978604:(c,f,w)=>{t.$b("Transpose",c,{perm:f?Array.from((S(),R).subarray(Number(f)>>>0,Number(w)>>>0)):[]})},978728:(c,f,w,y)=>{t.$b("DepthToSpace",c,{blocksize:f,mode:Ne(w),format:y?"NHWC":"NCHW"})},978861:(c,f,w,y)=>{t.$b("DepthToSpace",c,{blocksize:f,mode:Ne(w),format:y?"NHWC":"NCHW"})},978994:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee,nn)=>{t.$b("ConvTranspose",c,{format:K?"NHWC":"NCHW",autoPad:f,dilations:[w],group:y,kernelShape:[C],pads:[z,N],strides:[L],wIsConst:()=>!!(S(),O)[J>>>0],outputPadding:pe?Array.from((S(),R).subarray(Number(pe)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from((S(),R).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(nn)})},979427:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee)=>{t.$b("ConvTranspose",c,{format:L?"NHWC":"NCHW",autoPad:f,dilations:Array.from((S(),R).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:y,kernelShape:Array.from((S(),R).subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),pads:Array.from((S(),R).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from((S(),R).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!(S(),O)[K>>>0],outputPadding:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from((S(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},980088:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee,nn)=>{t.$b("ConvTranspose",c,{format:K?"NHWC":"NCHW",autoPad:f,dilations:[w],group:y,kernelShape:[C],pads:[z,N],strides:[L],wIsConst:()=>!!(S(),O)[J>>>0],outputPadding:pe?Array.from((S(),R).subarray(Number(pe)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from((S(),R).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(nn)})},980521:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee)=>{t.$b("ConvTranspose",c,{format:L?"NHWC":"NCHW",autoPad:f,dilations:Array.from((S(),R).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:y,kernelShape:Array.from((S(),R).subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),pads:Array.from((S(),R).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from((S(),R).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!(S(),O)[K>>>0],outputPadding:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from((S(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},981182:(c,f)=>{t.$b("GlobalAveragePool",c,{format:f?"NHWC":"NCHW"})},981273:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee)=>{t.$b("AveragePool",c,{format:Ee?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:y,storage_order:C,dilations:z?Array.from((S(),R).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:L?Array.from((S(),R).subarray(Number(L)>>>0,Number(K)>>>0)):[],pads:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],strides:we?Array.from((S(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},981752:(c,f)=>{t.$b("GlobalAveragePool",c,{format:f?"NHWC":"NCHW"})},981843:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee)=>{t.$b("AveragePool",c,{format:Ee?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:y,storage_order:C,dilations:z?Array.from((S(),R).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:L?Array.from((S(),R).subarray(Number(L)>>>0,Number(K)>>>0)):[],pads:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],strides:we?Array.from((S(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982322:(c,f)=>{t.$b("GlobalMaxPool",c,{format:f?"NHWC":"NCHW"})},982409:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee)=>{t.$b("MaxPool",c,{format:Ee?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:y,storage_order:C,dilations:z?Array.from((S(),R).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:L?Array.from((S(),R).subarray(Number(L)>>>0,Number(K)>>>0)):[],pads:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],strides:we?Array.from((S(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982884:(c,f)=>{t.$b("GlobalMaxPool",c,{format:f?"NHWC":"NCHW"})},982971:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee)=>{t.$b("MaxPool",c,{format:Ee?"NHWC":"NCHW",auto_pad:f,ceil_mode:w,count_include_pad:y,storage_order:C,dilations:z?Array.from((S(),R).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:L?Array.from((S(),R).subarray(Number(L)>>>0,Number(K)>>>0)):[],pads:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],strides:we?Array.from((S(),R).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},983446:(c,f,w,y,C)=>{t.$b("Gemm",c,{alpha:f,beta:w,transA:y,transB:C})},983550:c=>{t.$b("MatMul",c,void 0)},983604:(c,f,w,y)=>{t.$b("ArgMax",c,{keepDims:!!f,selectLastIndex:!!w,axis:y})},983712:(c,f,w,y)=>{t.$b("ArgMin",c,{keepDims:!!f,selectLastIndex:!!w,axis:y})},983820:(c,f)=>{t.$b("Softmax",c,{axis:f})},983883:(c,f)=>{t.$b("Concat",c,{axis:f})},983943:(c,f,w,y,C)=>{t.$b("Split",c,{axis:f,numOutputs:w,splitSizes:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},984099:c=>{t.$b("Expand",c,void 0)},984153:(c,f)=>{t.$b("Gather",c,{axis:Number(f)})},984224:(c,f)=>{t.$b("GatherElements",c,{axis:Number(f)})},984303:(c,f)=>{t.$b("GatherND",c,{batch_dims:Number(f)})},984382:(c,f,w,y,C,z,N,L,K,J,pe)=>{t.$b("Resize",c,{antialias:f,axes:w?Array.from((S(),R).subarray(Number(w)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Ne(C),cubicCoeffA:z,excludeOutside:N,extrapolationValue:L,keepAspectRatioPolicy:Ne(K),mode:Ne(J),nearestMode:Ne(pe)})},984744:(c,f,w,y,C,z,N)=>{t.$b("Slice",c,{starts:f?Array.from((S(),R).subarray(Number(f)>>>0,Number(w)>>>0)):[],ends:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[],axes:z?Array.from((S(),R).subarray(Number(z)>>>0,Number(N)>>>0)):[]})},985008:c=>{t.$b("Tile",c,void 0)},985060:(c,f,w)=>{t.$b("InstanceNormalization",c,{epsilon:f,format:w?"NHWC":"NCHW"})},985174:(c,f,w)=>{t.$b("InstanceNormalization",c,{epsilon:f,format:w?"NHWC":"NCHW"})},985288:c=>{t.$b("Range",c,void 0)},985341:(c,f)=>{t.$b("Einsum",c,{equation:Ne(f)})},985422:(c,f,w,y,C)=>{t.$b("Pad",c,{mode:f,value:w,pads:y?Array.from((S(),R).subarray(Number(y)>>>0,Number(C)>>>0)):[]})},985565:(c,f,w,y,C,z)=>{t.$b("BatchNormalization",c,{epsilon:f,momentum:w,spatial:!!C,trainingMode:!!y,format:z?"NHWC":"NCHW"})},985734:(c,f,w,y,C,z)=>{t.$b("BatchNormalization",c,{epsilon:f,momentum:w,spatial:!!C,trainingMode:!!y,format:z?"NHWC":"NCHW"})},985903:(c,f,w)=>{t.$b("CumSum",c,{exclusive:Number(f),reverse:Number(w)})},986e3:(c,f,w)=>{t.$b("DequantizeLinear",c,{axis:f,blockSize:w})},986090:(c,f,w,y,C)=>{t.$b("GridSample",c,{align_corners:f,mode:Ne(w),padding_mode:Ne(y),format:C?"NHWC":"NCHW"})},986260:(c,f,w,y,C)=>{t.$b("GridSample",c,{align_corners:f,mode:Ne(w),padding_mode:Ne(y),format:C?"NHWC":"NCHW"})},986430:(c,f)=>{t.$b("ScatterND",c,{reduction:Ne(f)})},986515:(c,f,w,y,C,z,N,L,K)=>{t.$b("Attention",c,{numHeads:f,isUnidirectional:w,maskFilterValue:y,scale:C,doRotary:z,qkvHiddenSizes:N?Array.from((S(),R).subarray(Number(L)>>>0,Number(L)+N>>>0)):[],pastPresentShareBuffer:!!K})},986787:c=>{t.$b("BiasAdd",c,void 0)},986842:c=>{t.$b("BiasSplitGelu",c,void 0)},986903:c=>{t.$b("FastGelu",c,void 0)},986959:(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee,nn,Ba)=>{t.$b("Conv",c,{format:we?"NHWC":"NCHW",auto_pad:f,dilations:w?Array.from((S(),R).subarray(Number(w)>>>0,Number(y)>>>0)):[],group:C,kernel_shape:z?Array.from((S(),R).subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:L?Array.from((S(),R).subarray(Number(L)>>>0,Number(K)>>>0)):[],strides:J?Array.from((S(),R).subarray(Number(J)>>>0,Number(pe)>>>0)):[],w_is_const:()=>!!(S(),O)[Number(ke)>>>0],activation:Ne(Ee),activation_params:nn?Array.from((S(),Z).subarray(Number(nn)>>>0,Number(Ba)>>>0)):[]})},987543:c=>{t.$b("Gelu",c,void 0)},987595:(c,f,w,y,C,z,N,L,K)=>{t.$b("GroupQueryAttention",c,{numHeads:f,kvNumHeads:w,scale:y,softcap:C,doRotary:z,rotaryInterleaved:N,smoothSoftmax:L,localWindowSize:K})},987812:(c,f,w,y)=>{t.$b("LayerNormalization",c,{axis:f,epsilon:w,simplified:!!y})},987923:(c,f,w,y)=>{t.$b("LayerNormalization",c,{axis:f,epsilon:w,simplified:!!y})},988034:(c,f,w,y,C,z)=>{t.$b("MatMulNBits",c,{k:f,n:w,accuracyLevel:y,bits:C,blockSize:z})},988161:(c,f,w,y,C,z)=>{t.$b("MultiHeadAttention",c,{numHeads:f,isUnidirectional:w,maskFilterValue:y,scale:C,doRotary:z})},988320:(c,f)=>{t.$b("QuickGelu",c,{alpha:f})},988384:(c,f,w,y,C)=>{t.$b("RotaryEmbedding",c,{interleaved:!!f,numHeads:w,rotaryEmbeddingDim:y,scale:C})},988523:(c,f,w)=>{t.$b("SkipLayerNormalization",c,{epsilon:f,simplified:!!w})},988625:(c,f,w)=>{t.$b("SkipLayerNormalization",c,{epsilon:f,simplified:!!w})},988727:(c,f,w,y)=>{t.$b("GatherBlockQuantized",c,{gatherAxis:f,quantizeAxis:w,blockSize:y})},988848:c=>{t.Fd(c)},988882:(c,f)=>t.Hd(Number(c),Number(f),t.Yc.Kd,t.Yc.errors)};function w_(c,f,w){return cu(async()=>{await t.Dd(Number(c),Number(f),Number(w))})}function __(){return typeof wasmOffsetConverter<"u"}function x_(c,f,w,y){var C=me();try{return Gu(c,f,w,y)}catch(z){if(fe(C),z!==z+0)throw z;ge(1,0)}}function v_(c,f,w){var y=me();try{return Wu(c,f,w)}catch(C){if(fe(y),C!==C+0)throw C;ge(1,0)}}function $_(c){var f=me();try{Du(c)}catch(w){if(fe(f),w!==w+0)throw w;ge(1,0)}}function S_(c,f){var w=me();try{return Ra(c,f)}catch(y){if(fe(w),y!==y+0)throw y;ge(1,0)}}function k_(c,f,w){var y=me();try{Lu(c,f,w)}catch(C){if(fe(y),C!==C+0)throw C;ge(1,0)}}function C_(c,f){var w=me();try{ju(c,f)}catch(y){if(fe(w),y!==y+0)throw y;ge(1,0)}}function T_(c,f,w,y,C,z,N){var L=me();try{return Vu(c,f,w,y,C,z,N)}catch(K){if(fe(L),K!==K+0)throw K;ge(1,0)}}function E_(c,f,w,y,C,z){var N=me();try{Fu(c,f,w,y,C,z)}catch(L){if(fe(N),L!==L+0)throw L;ge(1,0)}}function I_(c,f,w,y){var C=me();try{Hu(c,f,w,y)}catch(z){if(fe(C),z!==z+0)throw z;ge(1,0)}}function M_(c,f,w,y,C){var z=me();try{Uu(c,f,w,y,C)}catch(N){if(fe(z),N!==N+0)throw N;ge(1,0)}}function z_(c,f,w,y,C,z,N){var L=me();try{Xu(c,f,w,y,C,z,N)}catch(K){if(fe(L),K!==K+0)throw K;ge(1,0)}}function A_(c,f,w,y,C,z,N){var L=me();try{Yu(c,f,w,y,C,z,N)}catch(K){if(fe(L),K!==K+0)throw K;ge(1,0)}}function N_(c,f,w,y,C,z,N,L){var K=me();try{ec(c,f,w,y,C,z,N,L)}catch(J){if(fe(K),J!==J+0)throw J;ge(1,0)}}function P_(c,f,w,y,C){var z=me();try{return Ku(c,f,w,y,C)}catch(N){if(fe(z),N!==N+0)throw N;ge(1,0)}}function R_(c,f,w){var y=me();try{return tc(c,f,w)}catch(C){if(fe(y),C!==C+0)throw C;ge(1,0)}}function O_(c,f,w,y,C,z,N,L){var K=me();try{nc(c,f,w,y,C,z,N,L)}catch(J){if(fe(K),J!==J+0)throw J;ge(1,0)}}function B_(c,f,w,y,C,z,N,L,K,J,pe,we){var ke=me();try{Qu(c,f,w,y,C,z,N,L,K,J,pe,we)}catch(Ee){if(fe(ke),Ee!==Ee+0)throw Ee;ge(1,0)}}function L_(c,f,w,y,C,z){var N=me();try{return Zu(c,f,w,y,C,z)}catch(L){if(fe(N),L!==L+0)throw L;ge(1,0)}}function D_(c,f,w){var y=me();try{return rc(c,f,w)}catch(C){if(fe(y),C!==C+0)throw C;return ge(1,0),0n}}function F_(c,f,w,y,C,z,N,L,K){var J=me();try{qu(c,f,w,y,C,z,N,L,K)}catch(pe){if(fe(J),pe!==pe+0)throw pe;ge(1,0)}}function U_(c){var f=me();try{return ic(c)}catch(w){if(fe(f),w!==w+0)throw w;ge(1,0)}}function W_(c,f){var w=me();try{return wc(c,f)}catch(y){if(fe(w),y!==y+0)throw y;return ge(1,0),0n}}function q_(c){var f=me();try{return ac(c)}catch(w){if(fe(f),w!==w+0)throw w;return ge(1,0),0n}}function V_(c,f,w,y){var C=me();try{return dc(c,f,w,y)}catch(z){if(fe(C),z!==z+0)throw z;ge(1,0)}}function H_(c,f,w,y,C){var z=me();try{return pc(c,f,w,y,C)}catch(N){if(fe(z),N!==N+0)throw N;ge(1,0)}}function G_(c,f,w,y,C,z){var N=me();try{return fc(c,f,w,y,C,z)}catch(L){if(fe(N),L!==L+0)throw L;ge(1,0)}}function j_(c,f,w,y,C,z){var N=me();try{return hc(c,f,w,y,C,z)}catch(L){if(fe(N),L!==L+0)throw L;ge(1,0)}}function K_(c,f,w,y,C,z,N,L){var K=me();try{return Ju(c,f,w,y,C,z,N,L)}catch(J){if(fe(K),J!==J+0)throw J;ge(1,0)}}function X_(c,f,w,y,C){var z=me();try{return mc(c,f,w,y,C)}catch(N){if(fe(z),N!==N+0)throw N;return ge(1,0),0n}}function Y_(c,f,w,y){var C=me();try{return gc(c,f,w,y)}catch(z){if(fe(C),z!==z+0)throw z;ge(1,0)}}function Q_(c,f,w,y){var C=me();try{return bc(c,f,w,y)}catch(z){if(fe(C),z!==z+0)throw z;ge(1,0)}}function Z_(c,f,w,y,C,z,N,L,K,J,pe,we){var ke=me();try{return yc(c,f,w,y,C,z,N,L,K,J,pe,we)}catch(Ee){if(fe(ke),Ee!==Ee+0)throw Ee;ge(1,0)}}function J_(c,f,w,y,C,z,N,L,K,J,pe){var we=me();try{uc(c,f,w,y,C,z,N,L,K,J,pe)}catch(ke){if(fe(we),ke!==ke+0)throw ke;ge(1,0)}}function e1(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee,nn,Ba){var i1=me();try{cc(c,f,w,y,C,z,N,L,K,J,pe,we,ke,Ee,nn,Ba)}catch(La){if(fe(i1),La!==La+0)throw La;ge(1,0)}}function t1(c,f,w){var y=me();try{return oc(c,f,w)}catch(C){if(fe(y),C!==C+0)throw C;ge(1,0)}}function n1(c,f,w){var y=me();try{return sc(c,f,w)}catch(C){if(fe(y),C!==C+0)throw C;ge(1,0)}}function r1(c,f,w,y){var C=me();try{lc(c,f,w,y)}catch(z){if(fe(C),z!==z+0)throw z;ge(1,0)}}function ci(){if(0<rt)Je=ci;else if(i)_==null||_(t),Q();else{for(var c=Ze;0<c.length;)c.shift()(t);0<rt?Je=ci:(t.calledRun=!0,M||(Q(),_==null||_(t)))}}return i||(Dt=await Ke(),ci()),t.PTR_SIZE=4,U?t:new Promise((c,f)=>{_=c,T=f})}var km,Nc,Rx=q(()=>{var e,t;km=Ac,Nc=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Nc&&Ac()}),ja,Jo,Pc,ot,Cm,fi,Rc,Oc,Ka,Bc,Xa,Tm,Ya,Em,Rs=q(()=>{Ps(),ja=typeof location>"u"?void 0:location.origin,Jo=import.meta.url>"file:"&&import.meta.url<"file;",Pc=()=>{{if(Jo){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ja).href}return import.meta.url}},ot=Pc(),Cm=()=>{if(ot&&!ot.startsWith("blob:"))return ot.substring(0,ot.lastIndexOf("/")+1)},fi=(e,t)=>{try{let n=t??ot;return(n?new URL(e,n):new URL(e)).origin===ja}catch{return!1}},Rc=(e,t)=>{let n=t??ot;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Oc=(e,t)=>`${t??"./"}${e}`,Ka=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Bc=async e=>(await import(e)).default,Xa=(Px(),Lr(vm)).default,Tm=async()=>{if(!ot)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(fi(ot))return[void 0,Xa()];let e=await Ka(ot);return[e,Xa(e)]},Ya=(Rx(),Lr(Sm)).default,Em=async(e,t,n,r)=>{let i=Ya&&!(e||t);if(i)if(ot)i=fi(ot)||r&&!n;else if(r&&!n)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,Ya];{let a="ort-wasm-simd-threaded.jsep.mjs",o=e??Rc(a,t),s=n&&o&&!fi(o,t),l=s?await Ka(o):o??Oc(a,t);return[s?l:void 0,await Bc(l)]}}}),Qa,hi,pr,Za,Lc,Dc,Fc,Os,Ce,Bn=q(()=>{Rs(),hi=!1,pr=!1,Za=!1,Lc=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Dc=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Fc=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Os=async e=>{if(hi)return Promise.resolve();if(pr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Za)throw new Error("previous call to 'initializeWebAssembly()' failed.");pr=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Fc())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Dc())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=Lc();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,o=i==null?void 0:i.mjs,s=(o==null?void 0:o.href)??o,l=i==null?void 0:i.wasm,u=(l==null?void 0:l.href)??l,d=e.wasmBinary,[p,m]=await Em(s,a,n>1,!!d||!!u),g=!1,b=[];if(t>0&&b.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},t)})),b.push(new Promise((_,T)=>{let x={numThreads:n};if(d)x.wasmBinary=d,x.locateFile=v=>v;else if(u||a)x.locateFile=v=>u??a+v;else if(s&&s.indexOf("blob:")!==0)x.locateFile=v=>new URL(v,s).href;else if(p){let v=Cm();v&&(x.locateFile=I=>v+I)}m(x).then(v=>{pr=!1,hi=!0,Qa=v,_(),p&&URL.revokeObjectURL(p)},v=>{pr=!1,Za=!0,T(v)})})),await Promise.race(b),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(hi&&Qa)return Qa;throw new Error("WebAssembly is not initialized yet.")}}),xt,Oi,$e,Bs=q(()=>{Bn(),xt=(e,t)=>{let n=Ce(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},Oi=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([i,a])=>{let o=t?t+i:i;if(typeof a=="object")Oi(a,o+".",n,r);else if(typeof a=="string"||typeof a=="number")r(o,a.toString());else if(typeof a=="boolean")r(o,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},$e=e=>{let t=Ce(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,r===4?"i32":"i64")),o=t.getValue(i+r,"*"),s=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(n)}}}),Im,Ox=q(()=>{Bn(),Bs(),Im=e=>{let t=Ce(),n=0,r=[],i=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(i.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=xt(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&$e("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Oi(e.extra,"",new WeakSet,(o,s)=>{let l=xt(o,r),u=xt(s,r);t._OrtAddRunConfigEntry(n,l,u)!==0&&$e(`Can't set a run config entry: ${o} - ${s}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(o=>t._free(o)),a}}}),Uc,Wc,qc,mn,Vc,Mm,Bx=q(()=>{Bn(),Bs(),Uc=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Wc=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},qc=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},mn=(e,t,n,r)=>{let i=xt(t,r),a=xt(n,r);Ce()._OrtAddSessionConfigEntry(e,i,a)!==0&&$e(`Can't set a session config entry: ${t} - ${n}.`)},Vc=async(e,t,n)=>{let r=t.executionProviders;for(let i of r){let a=typeof i=="string"?i:i.name,o=[];switch(a){case"webnn":if(a="WEBNN",mn(e,"session.disable_quant_qdq","1",n),mn(e,"session.disable_qdq_constant_folding","1",n),typeof i!="string"){let p=i==null?void 0:i.deviceType;p&&mn(e,"deviceType",p,n)}break;case"webgpu":if(a="JS",typeof i!="string"){let p=i;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);mn(e,"preferredLayout",p.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=xt(a,n),l=o.length,u=0,d=0;if(l>0){u=Ce()._malloc(l*Ce().PTR_SIZE),n.push(u),d=Ce()._malloc(l*Ce().PTR_SIZE),n.push(d);for(let p=0;p<l;p++)Ce().setValue(u+p*Ce().PTR_SIZE,o[p][0],"*"),Ce().setValue(d+p*Ce().PTR_SIZE,o[p][1],"*")}await Ce()._OrtAppendExecutionProvider(e,s,u,d,l)!==0&&$e(`Can't append execution provider: ${a}.`)}},Mm=async e=>{let t=Ce(),n=0,r=[],i=e||{};qc(i);try{let a=Uc(i.graphOptimizationLevel??"all"),o=Wc(i.executionMode??"sequential"),s=typeof i.logId=="string"?xt(i.logId,r):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let u=i.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log verbosity level is not valid: ${u}`);let d=typeof i.optimizedModelFilePath=="string"?xt(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,o,!!i.enableProfiling,0,s,l,u,d),n===0&&$e("Can't create session options."),i.executionProviders&&await Vc(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);mn(n,"enableGraphCapture",i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[p,m]of Object.entries(i.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let g=xt(p,r);t._OrtAddFreeDimensionOverride(n,g,m)!==0&&$e(`Can't set a free dimension override: ${p} - ${m}.`)}return i.extra!==void 0&&Oi(i.extra,"",new WeakSet,(p,m)=>{mn(n,p,m,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&$e("Can't release session options."),r.forEach(o=>t._free(o)),a}}}),xn,qt,vn,aa,Bi,Ls,Ds,es,oe=q(()=>{xn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},qt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},vn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return n>0?Math.ceil(r*n):void 0},aa=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Bi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ls=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ds=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",es=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Fs,zm=q(()=>{Ps(),Fs=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(s){if(s instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw s}let o=0;for(;;){let{done:s,value:l}=await i.read();if(s)break;let u=l.byteLength;new Uint8Array(a,o,u).set(l),o+=u}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Hc,Gc,jc,Kc,Us,Xc,ye,Xt=q(()=>{oe(),Hc=["V","I","W","E","F"],Gc=(e,t)=>{console.log(`[${Hc[e]},${new Date().toISOString()}]${t}`)},Us=(e,t)=>{jc=e,Kc=t},Xc=(e,t)=>{let n=Bi(e),r=Bi(jc);n>=r&&Gc(n,typeof t=="function"?t():t)},ye=(...e)=>{Kc&&Xc(...e)}}),Yc,Jn,B,Li,Am,Nm,Pm,ce=q(()=>{Yc=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Jn=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),o=new Array(a);if(n){if(r<2||i<2)return;let s=Yc.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(s===void 0)return;[o[a-2],o[a-1]]=s}for(let s=n?3:1;s<=a;s++){let l=r-s<0?1:e[r-s],u=i-s<0?1:t[i-s];if(l!==u&&l>1&&u>1)return;let d=Math.max(l,u);if(l&&u)o[a-s]=Math.max(l,u);else{if(d>1)return;o[a-s]=0}}return o}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},B=class Ci{static size(t){return Ci.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let i=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){i[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,n/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Ci.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Ci.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let i=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let i=n-3;i>=0;--i)r[i]=r[i+1]*t[i+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((i,a)=>i+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,i)=>r===n[i])}},Li=class kr{static adjustPoolAttributes(t,n,r,i,a,o){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let s=0;s<n.length-2;s++)s>=r.length?r.push(n[s+2]):r[s]=n[s+2];for(let s=0;s<r.length;s++)if(s<i.length){if(i[s]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let s=0;s<r.length;s++)if(s<a.length){if(a[s]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let s=0;s<r.length*2;s++)if(s<o.length){if(o[s]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let s=0;s<r.length;s++){if(r[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[s]>=r[s]||o[s+r.length]>=r[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,o,s){if(s){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)kr.adjustPadAndReturnShape(t[l+(o?1:2)],n[l],r[l],i[l],a,l,l+t.length-2,s)}}static computePoolOutputShape(t,n,r,i,a,o,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return kr.computeShapeHelper(t,n,l,r,i,a,o,s),l}static computeConvOutputShape(t,n,r,i,a,o,s){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return kr.computeShapeHelper(!1,t,l,r,i,a,o,s),l}static computeShapeHelper(t,n,r,i,a,o,s,l){if(t)for(let u=0;u<n.length-2;u++)r.push(1);else for(let u=0;u<n.length-2;u++)r.push(kr.adjustPadAndReturnShape(n[u+2],i[u],a[u],o[u],s,u,u+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,i,a,o,s,l){let u=r*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[o]=0,a[s]=0,Math.floor((t-u)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((t+n-1)/n-1)*n+i-t;return a[o]=Math.floor(l==="SAME_LOWER"?(d+1)/2:d/2),a[s]=d-a[o],Math.floor((t+d-i)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[o]+a[s]-u)/n+1)}},Am=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,o,s;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let l=-1;if(r?(s=n[0],l=1):(s=n[1],l=0),n[l]!==o)throw new Error("dimension mismatch");if(a<=0||s<=0||o<=0)throw new Error("invalid shape specified");if(i&&!Jn.isValidBroadcast(i,[a,s]))throw new Error("gemm: invalid bias shape for broadcast");return[a,s,o]}},Nm=-34028234663852886e22,Pm=34028234663852886e22}),Ws,Rm=q(()=>{oe(),Ws=(e,t)=>new(aa(t))(e)}),Ja,ts,eo,Qc,to,Zc,no,ro,io,Jc,Om,Lx=q(()=>{oe(),Xt(),Ja=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ts=(e,t)=>{if(t==="int32")return e;let n=Ja.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(aa(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let o=new Int32Array(i);for(let s=0;s<i;s++){let l=a[s];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");o[s]=Number(l)}return new Uint8Array(o.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let o=Int32Array.from(a,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},eo=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let i=BigInt64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(r,Number);return new Uint8Array(i.buffer)}case"uint8":{if(r.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(r,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Qc=1,to=()=>Qc++,Zc=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),no=(e,t)=>{let n=Ja.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,i)=>r*i)*n/8):0},ro=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return no(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=eo(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return n.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,i)=>r===n[i])}setIsDataConverted(e){this.isDataConverted=e}},io=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!(a!=null&&a.input.dataTypes.includes(t))){if(o=Zc.get(t),!o||(a==null?void 0:a.input.dataTypes.includes(o)))throw new Error(`WebNN backend does not support data type: ${t}`);ye("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==no(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,s,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ts(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let r=(t=this.wrapper)!=null&&t.isDataConverted?eo(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Jc=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=to();return this.tensorTrackersById.set(e,new io(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=to(),o=new ro({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new io(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,n,r,i,a,o){let s=this.getMLContext(e);for(let[u,d]of this.freeTensors.entries())if(d.canReuseTensor(s,t,n)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${n}`);let p=this.freeTensors.splice(u,1)[0];return p.sessionId=e,p}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${n}}`);let l=await s.createTensor({dataType:o??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new ro({sessionId:e,context:s,tensor:l,dataType:t,shape:n,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Om=(...e)=>new Jc(...e)}),fr,ed,Bm,Dx=q(()=>{oe(),Bn(),Rm(),Lx(),Xt(),fr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),ed=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((i,a)=>i===r[a]&&e[i]===t[i])},Bm=class{constructor(e){this.tensorManager=Om(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Us(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>ed(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(i=>i.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=fr.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=fr.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Ce().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Ws(n,t)}}registerMLTensor(e,t,n,r){let i=fr.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,r,i,a,o=!1){if(!a)throw new Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let l=a.get(s);if(!l)throw new Error(`File with name ${s} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let u=l.slice(t,t+n).buffer,d;switch(i.dataType){case"float32":d=new Float32Array(u);break;case"float16":d=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(u):new Uint16Array(u);break;case"int32":d=new Int32Array(u);break;case"uint32":d=new Uint32Array(u);break;case"int64":if(o){let p=ts(new Uint8Array(u),"int64");d=new Int32Array(p.buffer),i.dataType="int32"}else d=new BigInt64Array(u);break;case"uint64":d=new BigUint64Array(u);break;case"int8":d=new Int8Array(u);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(u);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ye("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(i,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=fr.get(xn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!(i!=null&&i.input.dataTypes.includes(r)):!!(i!=null&&i.output.dataTypes.includes(r))}flush(){}}}),qs=q(()=>{}),ao,mi,gi,td,nd,oo,ns,rd,Lm,Fx=q(()=>{Xt(),qs(),ao=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),mi=[],gi=e=>Math.ceil(Number(e)/16)*16,td=e=>{for(let t=0;t<mi.length;t++){let n=mi[t];if(e<=n)return n}return Math.ceil(e/16)*16},nd=1,oo=()=>nd++,ns=async(e,t,n,r)=>{let i=gi(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(s,0,n)),l}else return new Uint8Array(s.slice(0,n))}finally{a.destroy()}},rd=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ao)mi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=gi(i),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);let s=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=s.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,r,i)),s.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(s,0,o.gpuData.buffer,0,a),this.backend.device.queue.submit([u.finish()]),s.destroy(),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=gi(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=oo();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=td(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let s=(i?this.freeBuffers:this.freeUniformBuffers).get(n);s?s.length>0?r=s.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let o={id:oo(),type:0,buffer:r};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await ns(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ao.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Lm=(...e)=>new rd(...e)}),id,ve,Ae=q(()=>{id=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new id(e)}),er,bi,Oe,Ge,ne,Me,rs,Kn,un,te,hr,D,ee,Dm,Vs,ad,Fm,de=q(()=>{oe(),ce(),er=64,bi=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Oe=(e,t=1)=>{let n=bi(e,t);return typeof n=="string"?n:n[0]},Ge=(e,t=1)=>{let n=bi(e,t);return typeof n=="string"?n:n[1]},ne=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:B.computeStrides(n)})}),t},Me=e=>e%4===0?4:e%2===0?2:1,rs=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Kn=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,un=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,te=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,hr=(e,t,n,r,i)=>{let a=typeof n=="number",o=a?n:n.length,s=[...new Array(o).keys()],l=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,u=bi(t,i),d=typeof u=="string"?u:u[1],p=typeof u=="string"?u:u[0],m={indices:l,value:d,storage:p,tensor:t},g=U=>typeof U=="string"?U:`${U}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=a?"uniforms.":"",T=`${_}${e}_shape`,x=`${_}${e}_strides`,v="";for(let U=0;U<o-1;U++)v+=`
    let dim${U} = current / ${te(x,U,o)};
    let rest${U} = current % ${te(x,U,o)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${o-1}] = current;`;let I=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${v}
    return indices;
  }`,E=U=>(b.offsetToIndices=!0,o<2?U:`o2i_${e}(${U})`),k=[];if(o>=2)for(let U=o-1;U>=0;U--)k.push(`${te(x,U,o)} * (indices[${U}])`);let M=o<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${k.join("+")};
  }`,A=U=>(b.indicesToOffset=!0,o<2?U:`i2o_${e}(${U})`),S=(...U)=>o===0?"0u":`${m.indices}(${U.map(g).join(",")})`,P=(U,j)=>o<2?`${U}`:`${te(U,j,o)}`,O=(U,j,Q)=>o<2?`${U}=${Q};`:`${te(U,j,o)}=${Q};`,W={},G=(U,j)=>{b.broadcastedIndicesToOffset=!0;let Q=`${j.name}broadcastedIndicesTo${e}Offset`;if(Q in W)return`${Q}(${U})`;let H=[];for(let _e=o-1;_e>=0;_e--){let Ke=j.indicesGet("outputIndices",_e+j.rank-o);H.push(`${P(x,_e)} * (${Ke} % ${P(T,_e)})`)}return W[Q]=`fn ${Q}(outputIndices: ${j.type.indices}) -> u32 {
             return ${H.length>0?H.join("+"):"0u"};
           }`,`${Q}(${U})`},X=(U,j)=>(()=>{if(m.storage===m.value)return`${e}[${U}]=${j};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${j}), select(0u, 0xFFFFFFFFu, ${j} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${j}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${j}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),R=U=>(()=>{if(m.storage===m.value)return`${e}[${U}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${U}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${U}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),Y=o<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${d} {
    return ${R(`i2o_${e}(indices)`)};
  }`,Z=o<2?"":(()=>{let U=s.map(Q=>`d${Q}: u32`).join(", "),j=s.map(Q=>`d${Q}`).join(", ");return`
  fn get_${e}(${U}) -> ${d} {
    return get_${e}ByIndices(${S(j)});
  }`})(),V=(...U)=>{if(U.length!==o)throw new Error(`indices length must be ${o}`);let j=U.map(g).join(",");return o===0?R("0u"):o===1?R(j[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${j})`)},ie=U=>o<2?R(U):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${U})`),F=o<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${d}) {
    ${X(`i2o_${e}(indices)`,"value")}
  }`,re=o<2?"":(()=>{let U=s.map(Q=>`d${Q}: u32`).join(", "),j=s.map(Q=>`d${Q}`).join(", ");return`
  fn set_${e}(${U}, value: ${d}) {
    set_${e}ByIndices(${S(j)}, value);
  }`})();return{impl:()=>{let U=[],j=!1;return b.offsetToIndices&&(U.push(I),j=!0),b.indicesToOffset&&(U.push(M),j=!0),b.broadcastedIndicesToOffset&&(Object.values(W).forEach(Q=>U.push(Q)),j=!0),b.set&&(U.push(re),j=!0),b.setByIndices&&(U.push(F),j=!0),b.get&&(U.push(Z),j=!0),b.getByIndices&&(U.push(Y),j=!0),!a&&j&&U.unshift(`const ${T} = ${m.indices}(${n.join(",")});`,`const ${x} = ${m.indices}(${B.computeStrides(n).join(",")});`),U.join(`
`)},type:m,offsetToIndices:E,indicesToOffset:A,broadcastedIndicesToOffset:G,indices:S,indicesGet:P,indicesSet:O,set:(...U)=>{if(U.length!==o+1)throw new Error(`indices length must be ${o}`);let j=U[o];if(typeof j!="string")throw new Error("value must be string");let Q=U.slice(0,o).map(g).join(",");return o===0?X("0u",j):o===1?X(Q[0],j):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${Q}, ${j})`)},setByOffset:X,setByIndices:(U,j)=>o<2?X(U,j):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${j});`),get:V,getByOffset:R,getByIndices:ie,usage:r,name:e,strides:x,shape:T,rank:o}},D=(e,t,n,r=1)=>hr(e,t,n,"input",r),ee=(e,t,n,r=1)=>hr(e,t,n,"output",r),Dm=(e,t,n)=>hr(e,t,n,"atomicOutput",1),Vs=(e,t,n,r=1)=>hr(e,t,n,"internal",r),ad=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=er){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Fm=(e,t)=>new ad(e,t)}),od,so,sd,ld,ud,cd,ut,Um,Wm,cn=q(()=>{oe(),ce(),Ae(),de(),od=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},so=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),sd=(e,t)=>B.sortBasedOnPerm(e,so(e.length,t)),ld=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},ud=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},cd=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},ut=(e,t)=>{let n=e.dataType,r=e.dims.length,i=so(r,t),a=sd(e.dims,i),o=e.dims,s=a,l=r<2||cd(i,e.dims),u;if(l)return u=b=>{let _=D("input",n,o,4),T=ee("output",n,s,4);return`
  ${b.registerUniform("output_size","u32").declareVariables(_,T)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64/4)},programUniforms:[{type:12,data:Math.ceil(b/4)}]}},getShaderSource:u};let{newShape:d,newPerm:p}=ud(e.dims,i),m=B.areEqual(p,[2,3,1]),g=B.areEqual(p,[3,1,2]);if(d.length===2||m||g){o=m?[d[0],d[1]*d[2]]:g?[d[0]*d[1],d[2]]:d,s=[o[1],o[0]];let b=16;return u=_=>{let T=D("a",n,o.length),x=ee("output",n,s.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${b+1}>, ${b}>;
  ${_.mainStart([b,b,1])}
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
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/b),y:Math.ceil(s[0]/b)},programUniforms:[{type:12,data:_},...ne(o,s)]}},getShaderSource:u}}return u=b=>{let _=D("a",n,o.length),T=ee("output",n,s.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(_,T)}

  ${ld(i,r,_,T)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let b=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...ne(o,s)]}},getShaderSource:u}},Um=(e,t)=>{od(e.inputs,t.perm),e.compute(ut(e.inputs[0],t.perm))},Wm=e=>ve({perm:e.perm})}),dd,pd,fd,hd,md,gd,bd,yd,wd,_d,gt,qm,Vm,Hm,Gm,jm,Km,Xm,Ym,Qm,Zm,Ux=q(()=>{oe(),ce(),de(),Hs(),cn(),dd={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},pd={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},fd={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},hd={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},md=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},gd=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let i=t.map(a=>e[a]);return[n,i]},bd=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},yd=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},wd=(e,t)=>{let n=[];if(!yd(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},_d=(e,t,n,r,i,a,o)=>{let s=n[0].dims,l=B.size(a),u=B.size(o),d=D("_A",n[0].dataType,s),p=ee("output",i,a),m=64;l===1&&(m=256);let g=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,b=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(d,p)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${fd[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${dd[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${pd[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${r==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${hd[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:u}]})}},gt=(e,t,n,r)=>{let i=e.inputs.length===1?n:is(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((g,b)=>b));let o=B.normalizeAxes(a,e.inputs[0].dims.length),s=o,l=e.inputs[0],u=wd(s,e.inputs[0].dims.length);u.length>0&&(l=e.compute(ut(e.inputs[0],u),{inputs:[0],outputs:[-1]})[0],s=md(s.length,l.dims.length));let[d,p]=gd(l.dims,s),m=d;i.keepDims&&(m=bd(d,o)),e.compute(_d(t,i.cacheKey,[l],r,e.inputs[0].dataType,m,p),{inputs:[l]})},qm=(e,t)=>{gt(e,"ReduceMeanShared",t,"mean")},Vm=(e,t)=>{gt(e,"ReduceL1Shared",t,"l1")},Hm=(e,t)=>{gt(e,"ReduceL2Shared",t,"l2")},Gm=(e,t)=>{gt(e,"ReduceLogSumExpShared",t,"logSumExp")},jm=(e,t)=>{gt(e,"ReduceMaxShared",t,"max")},Km=(e,t)=>{gt(e,"ReduceMinShared",t,"min")},Xm=(e,t)=>{gt(e,"ReduceProdShared",t,"prod")},Ym=(e,t)=>{gt(e,"ReduceSumShared",t,"sum")},Qm=(e,t)=>{gt(e,"ReduceSumSquareShared",t,"sumSquare")},Zm=(e,t)=>{gt(e,"ReduceLogSumShared",t,"logSum")}}),bt,xd,Di,is,yt,vd,$d,Sd,kd,Cd,Td,Ed,Id,Md,zd,wt,Jm,eg,tg,ng,rg,ig,ag,og,sg,lg,Hs=q(()=>{oe(),ce(),Ae(),de(),Ux(),bt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},xd=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Di=(e,t,n,r,i,a,o=!1,s=!1)=>{let l=[],u=n[0].dims,d=u.length,p=B.normalizeAxes(i,d),m=!s&&p.length===0;u.forEach((_,T)=>{m||p.indexOf(T)>=0?o&&l.push(1):l.push(_)});let g=l.length,b=B.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let T=[],x=D("_A",n[0].dataType,d),v=ee("output",a,g),I=r(x,v,p),E=I[2];for(let k=0,M=0;k<d;k++)m||p.indexOf(k)>=0?(o&&M++,E=`for(var j${k}: u32 = 0; j${k} < ${u[k]}; j${k}++) {
                  ${I[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${x.indicesSet("input_indices",k,`j${k}`)}
                  ${E}
                }`):(T.push(`${x.indicesSet("input_indices",k,v.indicesGet("output_indices",M))};`),M++);return`

        ${_.registerUniform("output_size","u32").declareVariables(x,v)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${v.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${E}
          ${I[3]}
          ${I.length===4?v.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...ne(u,l)]})}},is=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),ve({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},yt=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:is(i,n);e.compute(Di(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?xd:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},vd=(e,t)=>{bt(e.inputs),yt(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},$d=(e,t)=>{bt(e.inputs),yt(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Sd=(e,t)=>{bt(e.inputs),yt(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},kd=(e,t)=>{bt(e.inputs),yt(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Cd=(e,t)=>{bt(e.inputs),yt(e,"ReduceMax",t,(n,r,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",o,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Td=(e,t)=>{bt(e.inputs),yt(e,"ReduceMean",t,(n,r,i)=>{let a=1;for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&(a*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${a});`]})},Ed=(e,t)=>{bt(e.inputs),yt(e,"ReduceMin",t,(n,r,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Id=(e,t)=>{bt(e.inputs),yt(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Md=(e,t)=>{bt(e.inputs),yt(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},zd=(e,t)=>{bt(e.inputs),yt(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},wt=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:i*=e[a];return i<32&&r>1024},Jm=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Td(e,t):qm(e,t)},eg=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$d(e,t):Vm(e,t)},tg=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sd(e,t):Hm(e,t)},ng=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?kd(e,t):Gm(e,t)},rg=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Cd(e,t):jm(e,t)},ig=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ed(e,t):Km(e,t)},ag=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Id(e,t):Xm(e,t)},og=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Md(e,t):Ym(e,t)},sg=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zd(e,t):Qm(e,t)},lg=(e,t)=>{wt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vd(e,t):Zm(e,t)}}),lo,ug,cg,as,Wx=q(()=>{oe(),Ae(),Hs(),lo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},ug=(e,t)=>{lo(e.inputs);let n=(r,i,a)=>{let o=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&o.push(`input_indices[${s}] = 0;`);return[`${o.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(Di("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},cg=(e,t)=>{lo(e.inputs);let n=(r,i,a)=>{let o=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&o.push(`input_indices[${s}] = 0;`);return[`${o.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(Di("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},as=e=>ve(e)}),Ad,yi,Nd,Pd,Rd,Dr,Od,dg,Gs=q(()=>{oe(),ce(),qs(),de(),Ad=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];if(o&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],u=n.dims[1],d=n.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,m=p,g=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let b=u;if(p!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+m+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(o){if(m!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=o.dims[3])}let T=b+_,x=-1,v=0;if(a)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==l||s.dims[1]!==t.numHeads||s.dims[2]!==u||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:u,pastSequenceLength:_,kvSequenceLength:b,totalSequenceLength:T,maxSequenceLength:x,inputHiddenSize:d,hiddenSize:p,vHiddenSize:g,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},yi=(e,t,n)=>t&&e?`
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
    `,Nd=(e,t,n,r,i,a,o,s)=>{let l=Me(o?1:a),u=64,d=a/l;d<u&&(u=32);let p=Math.ceil(a/l/u),m=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:d},{type:12,data:p}],g=Oe(e.dataType,l),b=Ge(1,l),_=["type"];o&&_.push("type"),s&&_.push("type");let T=x=>{let v=ee("x",e.dataType,e.dims,l),I=[v],E=o?D("seq_lens",o.dataType,o.dims):void 0;E&&I.push(E);let k=s?D("total_sequence_length_input",s.dataType,s.dims):void 0;k&&I.push(k);let M=Ge(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${u}>;
  var<workgroup> thread_sum: array<f32, ${u}>;
  ${x.registerUniforms(A).declareVariables(...I)}
  ${x.mainStart([u,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${yi(E,k,!1)}
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
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${u};${g};${l}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:m})}},Pd=(e,t,n,r,i,a,o,s,l)=>{let u=o+a.kvSequenceLength,d=[a.batchSize,a.numHeads,a.sequenceLength,u],p=e>1&&r,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,g=p?[a.batchSize,m,u,a.headSize]:void 0,b=a.nReps?a.nReps:1,_=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=Me(a.headSize),x=a.headSize/T,v=12,I={x:Math.ceil(u/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},E=[{type:12,data:a.sequenceLength},{type:12,data:x},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:_},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:b}],k=p&&r&&B.size(r.dims)>0,M=["type","type"];k&&M.push("type"),i&&M.push("type"),s&&M.push("type"),l&&M.push("type");let A=[{dims:d,dataType:t.dataType,gpuDataType:0}];p&&A.push({dims:g,dataType:t.dataType,gpuDataType:0});let S=P=>{let O=D("q",t.dataType,t.dims,T),W=D("key",n.dataType,n.dims,T),G=[O,W];if(k){let F=D("past_key",r.dataType,r.dims,T);G.push(F)}i&&G.push(D("attention_bias",i.dataType,i.dims));let X=s?D("seq_lens",s.dataType,s.dims):void 0;X&&G.push(X);let R=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;R&&G.push(R);let Y=ee("output",t.dataType,d),Z=[Y];p&&Z.push(ee("present_key",t.dataType,g,T));let V=Ge(1,T),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${O.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${O.type.storage}, ${v*v}>;
  ${P.registerUniforms(ie).declareVariables(...G,...Z)}
  ${P.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${yi(X,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${k&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${V}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${k&&p?`
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
          value += ${V}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${Y.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${i!==void 0};${r!==void 0};${e}`,inputDependencies:M},getRunData:()=>({outputs:A,dispatchGroup:I,programUniforms:E}),getShaderSource:S}},Rd=(e,t,n,r,i,a,o=void 0,s=void 0)=>{let l=a+i.kvSequenceLength,u=i.nReps?i.nReps:1,d=i.vHiddenSize*u,p=e>1&&r,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=p?[i.batchSize,m,l,i.headSize]:void 0,b=[i.batchSize,i.sequenceLength,d],_=12,T={x:Math.ceil(i.vHeadSize/_),y:Math.ceil(i.sequenceLength/_),z:i.batchSize*i.numHeads},x=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:d},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:u}],v=p&&r&&B.size(r.dims)>0,I=["type","type"];v&&I.push("type"),o&&I.push("type"),s&&I.push("type");let E=[{dims:b,dataType:t.dataType,gpuDataType:0}];p&&E.push({dims:g,dataType:t.dataType,gpuDataType:0});let k=M=>{let A=D("probs",t.dataType,t.dims),S=D("v",n.dataType,n.dims),P=[A,S];v&&P.push(D("past_value",r.dataType,r.dims));let O=o?D("seq_lens",o.dataType,o.dims):void 0;o&&P.push(O);let W=s?D("total_sequence_length_input",s.dataType,s.dims):void 0;s&&P.push(W);let G=[ee("output",t.dataType,b)];p&&G.push(ee("present_value",t.dataType,g));let X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${A.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${A.type.value}, ${_*_}>;
  ${M.registerUniforms(X).declareVariables(...P,...G)}
  ${M.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${u===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${u===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${yi(O,W,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:E,dispatchGroup:T,programUniforms:x}),getShaderSource:k}},Dr=(e,t,n,r,i,a,o,s,l,u,d=void 0,p=void 0)=>{let m=Math.min(e.outputCount,1+(o?1:0)+(s?1:0)),g=m>1?o:void 0,b=m>1?s:void 0,_=m>1?u.pastSequenceLength:0,T=_+u.kvSequenceLength,x=l&&B.size(l.dims)>0?l:void 0,v=[t,n];g&&B.size(g.dims)>0&&v.push(g),x&&v.push(x),d&&v.push(d),p&&v.push(p);let I=e.compute(Pd(m,t,n,g,x,u,_,d,p),{inputs:v,outputs:m>1?[-1,1]:[-1]})[0];e.compute(Nd(I,u.batchSize,u.numHeads,_,u.sequenceLength,T,d,p),{inputs:d&&p?[I,d,p]:[I],outputs:[]});let E=[I,r];b&&B.size(b.dims)>0&&E.push(b),d&&E.push(d),p&&E.push(p),e.compute(Rd(m,I,r,b,u,_,d,p),{inputs:E,outputs:m>1?[0,2]:[0]})},Od=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,o=12,s={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=p=>{let m=ee("output_q",l[0].dataType,n),g=ee("output_k",l[0].dataType,n),b=ee("output_v",l[0].dataType,n),_=D("input",l[0].dataType,l[0].dims),T=D("weight",l[1].dataType,l[1].dims),x=D("bias",l[2].dataType,l[2].dims),v=_.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${v}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${v}, ${o*o}>;
  var<workgroup> tileWeightK: array<${v}, ${o*o}>;
  var<workgroup> tileWeightV: array<${v}, ${o*o}>;
  ${p.registerUniforms(I).declareVariables(_,T,x,m,g,b)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:u}),getShaderSource:d},{inputs:l,outputs:[-1,-1,-1]})},dg=(e,t)=>{let n=Ad(e.inputs,t),[r,i,a]=Od(e,n);return Dr(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),Bd,Ld,Dd,pg,qx=q(()=>{ft(),oe(),ce(),Ae(),de(),Bd=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,i,a)=>{let o=i.length;if(o!==r.length)throw new Error(`${a}: num dimensions != ${o}`);i.forEach((s,l)=>{if(s!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},Ld=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,o=r?Me(a[a.length-1]):1,s=i==="NHWC"&&a.length>1?o:1,l=B.size(a)/o,u=r,d=u?a.length:a,p=D("x",e[0].dataType,e[0].dims,o),m=D("scale",e[1].dataType,e[1].dims,s),g=D("bias",e[2].dataType,e[2].dims,s),b=D("inputMean",e[3].dataType,e[3].dims,s),_=D("inputVar",e[4].dataType,e[4].dims,s),T=ee("y",e[0].dataType,d,o),x=()=>{let I="";if(r)I=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${o}`:"outputIndices[1]"};`;else if(i==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let E=1;E<m.rank;E++)I+=`cIndices[${E}] = outputIndices[${E}];`;I+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return I},v=I=>`
  const epsilon = ${n};
  ${I.registerUniform("outputSize","u32").declareVariables(p,m,g,b,_,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${o}`)};
    ${x()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${o}`,inputDependencies:u?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u?[{type:12,data:l},...ne(a)]:[{type:12,data:l}]})}},Dd=e=>ve(e),pg=(e,t)=>{let{inputs:n,outputCount:r}=e,i=Dd({...t,outputCount:r});if(Se.webgpu.validateInputContent&&Bd(n,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Ld(n,i))}}),Fd,Ud,fg,Vx=q(()=>{ce(),de(),Fd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ud=e=>{let t=e[0].dims,n=e[0].dims[2],r=B.size(t)/4,i=e[0].dataType,a=D("input",i,t,4),o=D("bias",i,[n],4),s=D("residual",i,t,4),l=ee("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:u=>`
  const channels = ${n}u / 4;
  ${u.declareVariables(a,o,s,l)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},fg=e=>{Fd(e.inputs),e.compute(Ud(e.inputs))}}),Wd,xe,hg,mg,gg,bg,yg,wg,_g,xg,vg,qd,$g,Sg,kg,Cg,Cr,Tg,Ti,Eg,Ig,Mg,zg,Ag,Ng,Pg,Rg,Og,Bg,Lg,Dg,Fg,Ug,Wg,qg,uo,Vg,os,ss,Hg,Gg,jg,Vd,Hd,Kg,js=q(()=>{oe(),ce(),Ae(),de(),Wd=(e,t,n,r,i,a,o)=>{let s=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let u=D("inputData",n,[s],4),d=ee("outputData",r,[s],4),p=[{name:"vec_size",type:"u32"}];return o&&p.push(...o),`
      ${e.registerUniforms(p).declareVariables(u,d)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",l)}
  }`},xe=(e,t,n,r,i,a=e.dataType,o,s)=>{let l=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return o&&l.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:u=>Wd(u,B.size(e.dims),e.dataType,a,n,r,s),getRunData:u=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(B.size(u[0].dims)/64/4)},programUniforms:l})}},hg=e=>{e.compute(xe(e.inputs[0],"Abs","abs"))},mg=e=>{e.compute(xe(e.inputs[0],"Acos","acos"))},gg=e=>{e.compute(xe(e.inputs[0],"Acosh","acosh"))},bg=e=>{e.compute(xe(e.inputs[0],"Asin","asin"))},yg=e=>{e.compute(xe(e.inputs[0],"Asinh","asinh"))},wg=e=>{e.compute(xe(e.inputs[0],"Atan","atan"))},_g=e=>{e.compute(xe(e.inputs[0],"Atanh","atanh"))},xg=e=>ve(e),vg=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(xe(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},qd=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ve({min:t,max:n})},$g=(e,t)=>{let n=t||qd(e.inputs),r=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Sg=e=>{e.compute(xe(e.inputs[0],"Ceil","ceil"))},kg=e=>{e.compute(xe(e.inputs[0],"Cos","cos"))},Cg=e=>{e.compute(xe(e.inputs[0],"Cosh","cosh"))},Cr=e=>ve(e),Tg=(e,t)=>{let n=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ti=(e="f32")=>`
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
}`,Eg=e=>{let t=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Ti(t)))},Ig=e=>{e.compute(xe(e.inputs[0],"Exp","exp"))},Mg=e=>{e.compute(xe(e.inputs[0],"Floor","floor"))},zg=e=>{let t=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Ti(t)))},Ag=(e,t)=>{let n=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Ng=e=>{e.compute(xe(e.inputs[0],"Not",t=>`!${t}`))},Pg=e=>{e.compute(xe(e.inputs[0],"Neg",t=>`-${t}`))},Rg=e=>{e.compute(xe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Og=e=>{let t=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},Bg=e=>{e.compute(xe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Lg=e=>ve(e),Dg=(e,t)=>{let n=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},Fg=e=>{e.compute(xe(e.inputs[0],"Sin","sin"))},Ug=e=>{e.compute(xe(e.inputs[0],"Sinh","sinh"))},Wg=e=>{e.compute(xe(e.inputs[0],"Sqrt","sqrt"))},qg=e=>{e.compute(xe(e.inputs[0],"Tan","tan"))},uo=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Vg=e=>{e.compute(xe(e.inputs[0],"Tanh",uo))},os=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${uo("v")};
}
`,ss=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Hg=e=>{let t=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"FastGelu",ss,os(t),void 0,e.inputs[0].dataType))},Gg=(e,t)=>{let n=Ge(e.inputs[0].dataType);return e.compute(xe(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},jg=e=>{e.compute(xe(e.inputs[0],"Log","log"))},Vd=(e,t)=>`
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
`,Hd=e=>`quick_gelu_impl(${e})`,Kg=(e,t)=>{let n=Ge(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"QuickGelu",Hd,Vd(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Gd,jd,Xg,Hx=q(()=>{ce(),de(),js(),Gd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},jd=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=D("input",e[0].dataType,e[0].dims,4),r=D("bias",e[0].dataType,[e[0].dims[2]],4),i=ee("output",e[0].dataType,t,4),a=B.size(t)/4,o=Oe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:s=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${s.declareVariables(n,r,i)}

  ${Ti(o)}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Xg=e=>{Gd(e.inputs),e.compute(jd(e.inputs))}}),Kd,Xd,_t,Yg,Qg,Zg,Jg,e0,t0,n0,r0,i0,a0,Gx=q(()=>{oe(),ce(),de(),Kd=(e,t,n,r,i,a,o,s,l,u,d,p)=>{let m,g;typeof s=="string"?m=g=(v,I)=>`${s}((${v}),(${I}))`:typeof s=="function"?m=g=s:(m=s.scalar,g=s.vector);let b=ee("outputData",d,r.length,4),_=D("aData",l,t.length,4),T=D("bData",u,n.length,4),x;if(i)if(a){let v=B.size(t)===1,I=B.size(n)===1,E=t.length>0&&t[t.length-1]%4===0,k=n.length>0&&n[n.length-1]%4===0;v||I?x=b.setByOffset("global_idx",g(v?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):x=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",g(o||E?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||k?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=b.setByOffset("global_idx",g(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(I,E,k="")=>{let M=`aData[indexA${E}][componentA${E}]`,A=`bData[indexB${E}][componentB${E}]`;return`
            let outputIndices${E} = ${b.offsetToIndices(`global_idx * 4u + ${E}u`)};
            let offsetA${E} = ${_.broadcastedIndicesToOffset(`outputIndices${E}`,b)};
            let offsetB${E} = ${T.broadcastedIndicesToOffset(`outputIndices${E}`,b)};
            let indexA${E} = offsetA${E} / 4u;
            let indexB${E} = offsetB${E} / 4u;
            let componentA${E} = offsetA${E} % 4u;
            let componentB${E} = offsetB${E} % 4u;
            ${I}[${E}] = ${k}(${m(M,A)});
          `};d===9?x=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:x=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,T,b)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},Xd=(e,t,n,r,i,a,o=n.dataType)=>{let s=n.dims.map(Number),l=r.dims.map(Number),u=!B.areEqual(s,l),d=s,p=B.size(s),m=!1,g=!1,b=[u];if(u){let _=Jn.calcShape(s,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");d=_.slice(),p=B.size(d);let T=B.size(s)===1,x=B.size(l)===1,v=s.length>0&&s[s.length-1]%4===0,I=l.length>0&&l[l.length-1]%4===0;b.push(T),b.push(x),b.push(v),b.push(I);let E=1;for(let k=1;k<d.length;k++){let M=s[s.length-k],A=l[l.length-k];if(M===A)E*=M;else break}E%4===0?(g=!0,m=!0):(T||x||v||I)&&(m=!0)}else m=!0;return b.push(m),{name:e,shaderCache:{hint:t+b.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>Kd(_,s,l,d,m,u,g,i,n.dataType,r.dataType,o,a),getRunData:()=>({outputs:[{dims:d,dataType:o}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(d)/4)},...ne(s,l,d)]})}},_t=(e,t,n,r,i,a)=>{e.compute(Xd(t,i??"",e.inputs[0],e.inputs[1],n,r,a))},Yg=e=>{_t(e,"Add",(t,n)=>`${t}+${n}`)},Qg=e=>{_t(e,"Div",(t,n)=>`${t}/${n}`)},Zg=e=>{_t(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Jg=e=>{_t(e,"Mul",(t,n)=>`${t}*${n}`)},e0=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;_t(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
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
      `)},t0=e=>{_t(e,"Sub",(t,n)=>`${t}-${n}`)},n0=e=>{_t(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},r0=e=>{_t(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},i0=e=>{_t(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},a0=e=>{_t(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),Yd,Qd,Zd,Jd,o0,s0,jx=q(()=>{oe(),ce(),Ae(),de(),Yd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],i=r.dataType,a=r.dims.length;e.forEach((o,s)=>{if(s!==n){if(o.dataType!==i)throw new Error("input tensors should be one type");if(o.dims.length!==a)throw new Error("input tensors should have the same shape");o.dims.forEach((l,u)=>{if(u!==t&&l!==r.dims[u])throw new Error("non concat dimensions must match")})}})},Qd=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Zd=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset("global_idx",e[i].getByIndices("indices"));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},Jd=(e,t,n,r)=>{let i=B.size(n),a=new Array(e.length),o=new Array(e.length),s=0,l=[],u=[],d=[{type:12,data:i}];for(let _=0;_<e.length;++_)s+=e[_].dims[t],a[_]=s,u.push(e[_].dims.length),o[_]=D(`input${_}`,r,u[_]),l.push("rank"),d.push({type:12,data:a[_]});for(let _=0;_<e.length;++_)d.push(...ne(e[_].dims));d.push(...ne(n));let p=ee("output",r,n.length),m=p.indicesGet("indices",t),g=Array.from(Array(a.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),b=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...o,p)})()}

  ${Qd(a.length,g)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${g});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Zd(o,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}),getShaderSource:b}},o0=(e,t)=>{let n=e.inputs,r=n[0].dims,i=B.normalizeAxis(t.axis,r.length);Yd(n,i);let a=r.slice();a[i]=n.reduce((s,l)=>s+(l.dims.length>i?l.dims[i]:0),0);let o=n.filter(s=>B.size(s.dims)>0);e.compute(Jd(o,i,a,n[0].dataType),{inputs:o})},s0=e=>ve({axis:e.axis})}),Mn,zn,An,Ks,Ln=q(()=>{oe(),ce(),Mn=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},zn=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},An=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ks=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,r]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=(e==null?void 0:e.activation_params)||[Nm,Pm];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),We,l0,Xs=q(()=>{We=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},l0=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),u0,Kx=q(()=>{u0=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Ar,Ys,Qs=q(()=>{oe(),ce(),de(),Ln(),Ar=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((o,s)=>`
      if (${te(t.shape,s,t.rank)} != 1) {
        ${t.indicesSet(e,s,te(i,s+a,r))}
      } else {
        ${t.indicesSet(e,s,0)}
      }`).join("")}
`},Ys=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,l=o[o.length-2],u=s[s.length-1],d=o[o.length-1],p=Me(u),m=Me(d),g=Me(l),b=B.size(n)/p/g,_=e.length>2,T=r?r.slice(0,-2):n.slice(0,-2),x=[B.size(T),l,u],v=[{type:12,data:b},{type:12,data:l},{type:12,data:u},{type:12,data:d}];zn(t,v),v.push(...ne(T,o,s)),_&&v.push(...ne(e[2].dims)),v.push(...ne(x));let I=E=>{let k=Vs("batch_dims",e[0].dataType,T.length),M=D("a",e[0].dataType,o.length,m),A=D("b",e[1].dataType,s.length,p),S=ee("output",e[0].dataType,x.length,p),P=Oe(S.type.tensor),O=Mn(t,S.type.value,P),W=[M,A],G="";if(_){let Y=i?p:1;W.push(D("bias",e[2].dataType,e[2].dims.length,Y)),G=`${i?`value += bias[col / ${Y}];`:`value += ${S.type.value}(bias[row + i]);`}`}let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];An(t,X);let R=()=>{let Y=`var a_data: ${M.type.value};`;for(let Z=0;Z<m;Z++)Y+=`
              let b_data${Z} = b[(b_offset + (k + ${Z}) * uniforms.N + col) / ${p}];`;for(let Z=0;Z<g;Z++){Y+=`a_data = a[(a_offset + (row + ${Z}) * uniforms.K + k) / ${m}];`;for(let V=0;V<m;V++)Y+=`
            values[${Z}] = fma(${A.type.value}(a_data${m===1?"":`[${V}]`}), b_data${V}, values[${Z}]);
`}return Y};return`
  ${E.registerUniforms(X).registerInternalVariables(k).declareVariables(...W,S)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${M.type.indices};
    ${Ar("a_indices",M,M.rank-2,k.rank,"batch_indices")}
    ${M.indicesSet("a_indices",M.rank-2,0)}
    ${M.indicesSet("a_indices",M.rank-1,0)}
    let a_offset = ${M.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${Ar("b_indices",A,A.rank-2,k.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${S.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${R()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${G}
      ${O}
      let cur_indices = ${S.type.indices}(batch, row + i, col);
      let offset = ${S.indicesToOffset("cur_indices")};
      ${S.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${m};${g};${i}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:v}),getShaderSource:I}}}),ep,tp,ls,co,np,us,rp,Fi,Zs=q(()=>{oe(),ce(),de(),Ln(),Qs(),Xs(),ep=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,tp=(e,t)=>e?`
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
        }`,ls=(e,t,n="f32",r,i=!1,a=32,o=!1,s=32)=>{let l=t[1]*e[1],u=t[0]*e[0],d=i?l:a,p=i?a:l,m=d/t[0],g=a/t[1];if(!((i&&m===4&&e[1]===4||!i&&(m===3||m===4))&&d%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${n}>, ${d/m}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${u/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
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
          ${ep(i,r)}
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
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${tp(i,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},co=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,np=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",us=(e,t,n="f32",r,i=!1,a=32,o=!1,s=32,l=!1)=>{let u=e[1]*t[1],d=e[0]*t[0],p=i?u:a,m=i?a:u;if(!(m%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let g=m/t[1],b=p/t[0],_=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${u};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${co(i,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
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
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${co(i,r)}
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
      ${np(i)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${p}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${d}>, ${a}>;
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
`},rp=(e,t,n,r,i=!1)=>{let[a,o,s,l]=r,u=Oe(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${We(e,u)} {
      var value = ${We(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${Ar("aIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${We(e,u)} {
      var value = ${We(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Ar("bIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${We(e,u)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${We(e,u)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Fi=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,l=o.slice(0,-2),u=s.slice(0,-2),d=r?r.slice(0,-2):n.slice(0,-2),p=B.size(d),m=o[o.length-2],g=o[o.length-1],b=s[s.length-1],_=g%4===0&&b%4===0,T=m<=8?[4,1,1]:[4,4,1],x=[8,8,1],v=[Math.ceil(b/x[0]/T[0]),Math.ceil(m/x[1]/T[1]),Math.ceil(p/x[2]/T[2])],I=_?4:1,E=[...l,m,g/I],k=E.length,M=[...u,g,b/I],A=M.length,S=[p,m,b/I],P=[{type:6,data:m},{type:6,data:b},{type:6,data:g}];zn(t,P),P.push(...ne(d,E,M));let O=["rank","rank"],W=e.length>2;W&&(P.push(...ne(e[2].dims)),O.push("rank")),P.push(...ne(S));let G=X=>{let R=d.length,Y=Vs("batchDims",e[0].dataType,R,1),Z=Oe(e[0].dataType),V=D("a",e[0].dataType,k,I),ie=D("b",e[1].dataType,A,I),F=ee("result",e[0].dataType,S.length,I),re=[V,ie];if(W){let _e=i?I:1;re.push(D("bias",e[2].dataType,e[2].dims.length,_e))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];An(t,U);let j=Oe(F.type.tensor),Q=Mn(t,F.type.value,j),H=rp(I,W,Q,[Y,V,ie,F],i);return`
  ${X.registerUniforms(U).registerInternalVariables(Y).declareVariables(...re,F)}
  ${H}
  ${_?ls(T,x,Z,Y):us(T,x,Z,Y)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${_};${i}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:P}),getShaderSource:G}}}),ip,c0,Xx=q(()=>{oe(),Xt(),de(),Ln(),Xs(),Kx(),Zs(),ip=(e,t,n,r,i=!1,a,o=4,s=4,l=4,u="f32")=>{let d=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${u}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},p=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},m=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",x=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${We(o,u)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${_}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(o)}
    }
    return resData;`,I=e?t&&r?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${We(o,u)}(0.0);`:r&&n?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${We(o,u)}(0.0);`,E=e?r&&n?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${We(s,u)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${We(s,u)}(0.0);`,k=We(l,u),M=We(e?o:s,u),A=We(e?s:o,u),S=Mn(a,k,u);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${M} {
      ${e?I:E}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?E:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${l0(i)}
      ${S}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},c0=(e,t,n,r,i,a,o,s,l)=>{let u=t.format==="NHWC",d=u?e[0].dims[3]:e[0].dims[1],p=n[0],m=u?n[2]:n[3],g=u?n[1]:n[2],b=u?n[3]:n[1],_=u&&(d%4===0||d%3===0)&&b%4===0,T=u?b:m*g,x=u?m*g:b,v=[8,8,1],I=r<=8?[4,1,1]:[4,4,1],E=[Math.ceil(T/v[0]/I[0]),Math.ceil(x/v[1]/I[1]),Math.ceil(p/v[2]/I[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${E}`);let k=_?u&&d%4!==0?3:4:1,M=v[1]*I[1],A=v[0]*I[0],S=Math.max(v[0]*k,v[1]),P=r%M===0,O=i%A===0,W=a%S===0,G=_?[k,4,4]:[1,1,1],X=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];zn(t,X),X.push(...ne(e[0].dims,e[1].dims));let R=["rank","rank"];o&&(X.push(...ne(e[2].dims)),R.push("rank")),X.push(...ne(n));let Y=Z=>{let V=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];An(t,V);let ie=_?4:1,F=Oe(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${F}>`:F}) {
        result[flatIndex] = ${_?`vec4<${F}>`:F}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${F}>`:F}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,U=D("x",e[0].dataType,e[0].dims.length,k===3?1:k),j=D("w",e[1].dataType,e[1].dims.length,ie),Q=[U,j],H=ee("result",e[0].dataType,n.length,ie);if(o){let _e=D("bias",e[2].dataType,e[2].dims.length,ie);Q.push(_e),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${F}>`:F} {
          return bias[coords.${u?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${u0("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Z.registerUniforms(V).declareVariables(...Q,H)}
        ${re}
        ${ip(u,P,O,W,o,t,G[0],G[1],G[2],F)}
        ${_?ls(I,v,F,void 0,!u,S):us(I,v,F,void 0,!u,S,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${_};${P};${O};${W};${M};${A};${S}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:E[0],y:E[1],z:E[2]},programUniforms:X}),getShaderSource:Y}}}),ap,po,mr,op,fo,sp,d0,p0,Yx=q(()=>{oe(),Xt(),ce(),de(),Ln(),Xs(),ap=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},po=e=>typeof e=="number"?[e,e,e]:e,mr=(e,t)=>t<=1?e:e+(e-1)*(t-1),op=(e,t,n,r=1)=>{let i=mr(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},fo=(e,t,n,r,i)=>{i==null&&(i=op(e,t[0],r[0]));let a=[0,0,0,n];for(let o=0;o<3;o++)e[o]+2*i>=t[o]&&(a[o]=Math.trunc((e[o]-t[o]+2*i)/r[o]+1));return a},sp=(e,t,n,r,i,a,o,s,l,u)=>{let d,p,m,g;if(e==="VALID"&&(e=0),typeof e=="number"){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=fo([t,n,r,1],[s,l,u],1,[i,a,o],e);p=b[0],m=b[1],g=b[2]}else if(Array.isArray(e)){if(!e.every((_,T,x)=>_===x[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=fo([t,n,r,1],[s,l,u],1,[i,a,o],e[0]);p=b[0],m=b[1],g=b[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/i),m=Math.ceil(n/a),g=Math.ceil(r/o);let b=(p-1)*i+s-t,_=(m-1)*a+l-n,T=(g-1)*o+u-r,x=Math.floor(b/2),v=b-x,I=Math.floor(_/2),E=_-I,k=Math.floor(T/2),M=T-k;d={top:I,bottom:E,left:k,right:M,front:x,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:m,outWidth:g}},d0=(e,t,n,r,i,a=!1,o="channelsLast")=>{let s,l,u,d,p;if(o==="channelsLast")[s,l,u,d,p]=e;else if(o==="channelsFirst")[s,p,l,u,d]=e;else throw new Error(`Unknown dataFormat ${o}`);let[m,,g,b,_]=t,[T,x,v]=po(n),[I,E,k]=po(r),M=mr(g,I),A=mr(b,E),S=mr(_,k),{padInfo:P,outDepth:O,outHeight:W,outWidth:G}=sp(i,l,u,d,T,x,v,M,A,S),X=a?m*p:m,R=[0,0,0,0,0];return o==="channelsFirst"?R=[s,X,O,W,G]:o==="channelsLast"&&(R=[s,O,W,G,X]),{batchSize:s,dataFormat:o,inDepth:l,inHeight:u,inWidth:d,inChannels:p,outDepth:O,outHeight:W,outWidth:G,outChannels:X,padInfo:P,strideDepth:T,strideHeight:x,strideWidth:v,filterDepth:g,filterHeight:b,filterWidth:_,effectiveFilterDepth:M,effectiveFilterHeight:A,effectiveFilterWidth:S,dilationDepth:I,dilationHeight:E,dilationWidth:k,inShape:e,outShape:R,filterShape:t}},p0=(e,t,n,r,i,a)=>{let o=a==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let s=[64,1,1],l={x:n.map((T,x)=>x)},u=[Math.ceil(ap(l.x.map(T=>n[T]))/s[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let d=1,p=B.size(n),m=[{type:12,data:p},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];zn(t,m),m.push(...ne(e[0].dims,e[1].dims));let g=["rank","rank"],b=e.length===3;b&&(m.push(...ne(e[2].dims)),g.push("rank")),m.push(...ne(n));let _=T=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];An(t,x);let v=1,I=Oe(e[0].dataType),E=D("x",e[0].dataType,e[0].dims.length,d),k=D("W",e[1].dataType,e[1].dims.length,v),M=[E,k],A=ee("result",e[0].dataType,n.length,v),S="";if(b){let W=D("bias",e[2].dataType,e[2].dims.length,v);M.push(W),S+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${I} {
          return bias[${o?te("coords",4,5):te("coords",1,5)}];
        }`}let P=We(d,I),O=Mn(t,P,I);return`
            ${S}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
          ${T.registerUniforms(x).declareVariables(...M,A)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${te("coords",0,E.rank)};
              let d2 = ${o?te("coords",E.rank-1,E.rank):te("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${o?te("coords",1,E.rank):te("coords",2,E.rank)},
              ${o?te("coords",2,E.rank):te("coords",3,E.rank)},
              ${o?te("coords",3,E.rank):te("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?te("uniforms.x_shape",1,E.rank):te("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${o?te("uniforms.x_shape",2,E.rank):te("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${o?te("uniforms.x_shape",3,E.rank):te("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${o?te("uniforms.x_shape",4,E.rank):te("uniforms.x_shape",1,E.rank)};
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
              ${O}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${d};${b}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:m}),getShaderSource:_}}}),f0,h0,Qx=q(()=>{oe(),ce(),de(),Ln(),f0=(e,t,n,r)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",o=e[0].dims,s=e[1].dims,l=t.format==="NHWC",u=l?n[3]:n[1],d=u/t.group,p=l&&d>=4?Me(u):1,m=B.size(n)/p,g=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];zn(t,g),g.push(...ne(o,[s[0],s[1],s[2],s[3]/p]));let b=i?["rank","rank","rank"]:["rank","rank"];g.push(...ne([n[0],n[1],n[2],n[3]/p]));let _=T=>{let x=ee("output",e[0].dataType,n.length,p),v=Oe(x.type.tensor),I=Mn(t,x.type.value,v),E=D("x",e[0].dataType,o.length),k=D("w",e[1].dataType,s.length,p),M=[E,k];i&&M.push(D("b",e[2].dataType,e[2].dims,p));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];An(t,A);let S=l?`
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
            let xVal = ${E.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${k.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${E.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(A).declareVariables(...M,x)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${S}
    ${a}
    ${I}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:_}},h0=(e,t,n,r)=>{let i=e.length>2,a=Me(n[3]),o=Me(n[2]),s=B.size(n)/a/o,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],u=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],d=[n[0],n[1],n[2],n[3]/a],p=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];zn(t,p),p.push(...ne(l,u,d));let m=(o-1)*t.strides[1]+u[1],g=b=>{let _=ee("output",e[0].dataType,d.length,a),T=Oe(_.type.tensor),x=Mn(t,_.type.value,T),v=D("x",e[0].dataType,l.length,a),I=D("w",e[1].dataType,u.length,a),E=[v,I];i&&E.push(D("b",e[2].dataType,e[2].dims,a));let k=i?"value += b[output_channel];":"",M=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return An(t,M),`
  ${b.registerUniforms(M).declareVariables(...E,_)}
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

    var x_vals: array<${v.type.value}, ${m}>;
    var values: array<${_.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${u[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${u[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${k}
      ${x}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${o};${m};${u[0]};${u[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:g}}}),lp,wi,up,_i,cs,ho,cp,dp,ds,Zx=q(()=>{ce(),Xx(),Yx(),Zs(),Qx(),Ln(),Qs(),cn(),lp=(e,t,n,r,i,a)=>{let o=e[0],s=e.slice(a?1:2,a?3:4),l=s.length,u=t[0],d=t.slice(2).map((m,g)=>m+(m-1)*(n[g]-1)),p=s.map((m,g)=>m+r[g]+r[g+l]).map((m,g)=>Math.floor((m-d[g]+i[g])/i[g]));return p.splice(0,0,o),p.splice(a?3:1,0,u),p},wi=[2,3,1,0],up=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},_i=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();Li.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},cs=e=>{let t=Ks(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,o=e.kernel_shape,s=e.pads,l=e.strides,u=e.w_is_const();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,pads:s,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},ho=(e,t,n,r)=>{let i=n.format==="NHWC",a=lp(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let M=[t[0]];if(i){let A=e.kernelCustomData.wT??e.compute(ut(t[1],wi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),M.push(A)}else M.push(t[1]);t.length===3&&M.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(h0(M,n,a,r),{inputs:M}):e.compute(f0(M,n,a,r),{inputs:M});return}let o=t.length===3,s=t[0].dims[i?1:2],l=t[0].dims[i?2:3],u=t[0].dims[i?3:1],d=t[1].dims[2],p=t[1].dims[3],m=a[i?1:2],g=a[i?2:3],b=a[i?3:1],_=i&&d===s&&p===l&&n.pads[0]===0&&n.pads[1]===0;if(_||d===1&&p===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let M=a[0],A,S,P,O=[];if(i){let X=e.kernelCustomData.wT??e.compute(ut(t[1],wi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=X),_){let R=s*l*u;A=t[0].reshape([1,M,R]),S=X.reshape([1,R,b]),P=[1,M,b]}else A=t[0].reshape([M,s*l,u]),S=X.reshape([1,u,b]),P=[M,m*g,b];O.push(A),O.push(S)}else A=t[0].reshape([M,u,s*l]),S=t[1].reshape([1,b,u]),P=[M,b,m*g],O.push(S),O.push(A);o&&O.push(t[2]);let W=P[2],G=O[0].dims[O[0].dims.length-1];W<8&&G<8?e.compute(Ys(O,n,a,P,i,r),{inputs:O}):e.compute(Fi(O,n,a,P,i,r),{inputs:O});return}let T=!0,x=e.kernelCustomData.wT??e.compute(ut(t[1],wi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let v=[t[0],x];o&&v.push(t[2]);let I=i?m*g:b,E=i?b:m*g,k=d*p*u;e.compute(c0(v,n,a,I,E,k,o,T,r),{inputs:v})},cp=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),s=[1].concat(t.kernelShape),l=_i({...t,pads:i,strides:a,dilations:o,kernelShape:s},r);ho(e,r,l,u=>n?[u[0],u[2],u[3]]:[u[0],u[1],u[3]])},dp=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",i=_i(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,o=d0(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(p0(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],r))},ds=(e,t)=>{if(up(e.inputs,t),e.inputs[0].dims.length===3)cp(e,t);else if(e.inputs[0].dims.length===5)dp(e,e.inputs,t);else{let n=_i(t,e.inputs);ho(e,e.inputs,n)}}}),m0,Jx=q(()=>{oe(),Xt(),ce(),de(),m0=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format==="NHWC",o=t.group,s=e[1].dims,l=s[2]/o,u=s[3],d=a?Me(l):1,p=a&&u===1&&l>=4,m=p?Math.floor(l/4)*4:Math.floor(l/d)*d,g=l-m,b=a?Me(u):1,_=a?u===1?d:b:1,T=B.size(i)/b,x=[Math.ceil(T/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${x}`);let v=["rank","rank"],I=[t.strides[0],t.strides[1]],E=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],k=[t.dilations[0],t.dilations[1]],M=[E[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),E[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[M[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),M[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],S=[{type:12,data:T},{type:12,data:I},{type:12,data:E},{type:12,data:k},{type:12,data:M},{type:6,data:A},{type:12,data:m},{type:12,data:l},{type:12,data:u},...ne(e[0].dims,e[1].dims)];r&&(S.push(...ne(e[2].dims)),v.push("rank")),S.push(...ne(i));let P=O=>{let W=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:E.length},{name:"dilations",type:"u32",length:E.length},{name:"effective_filter_dims",type:"u32",length:M.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Oe(e[0].dataType),X=a?1:2,R=a?2:3,Y=a?3:1,Z=D("W",e[1].dataType,e[1].dims.length,_),V=D("Dy",e[0].dataType,e[0].dims.length,d),ie=[V,Z];r&&ie.push(D("bias",e[2].dataType,[i[Y]].length,b));let F=ee("result",e[0].dataType,i.length,b),re=()=>{let Q="";if(p)d===4?Q+=`
        let xValue = ${V.getByOffset("x_offset")};
        let wValue = ${Z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:d===2?Q+=`
          dotProd = dotProd + dot(vec4<${G}>(${V.getByOffset("x_offset")}, ${V.getByOffset("x_offset + 1u")}), vec4<${G}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:d===1&&(Q+=`
          dotProd = dotProd + dot(vec4<${G}>(${V.getByOffset("x_offset")}, ${V.getByOffset("x_offset + 1u")}, ${V.getByOffset("x_offset + 2u")}, ${V.getByOffset("x_offset + 3u")}), vec4<${G}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}, ${Z.getByOffset("w_offset + 2u")}, ${Z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Q+=`
                  let xValue = ${a?V.getByOffset(`${V.indicesToOffset(`${V.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):V.get("batch","inputChannel","idyR","idyC")};
        `,d===1)Q+=`
          let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Z.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let H=0;H<d;H++)Q+=`
            let wValue${H} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${H}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${H}] * wValue${H};`;return Q},U=()=>{if(g===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let Q="";if(d===1){Q+="dotProd = dotProd";for(let H=0;H<g;H++)Q+=`
            + ${V.getByOffset(`x_offset + ${H}`)} * ${Z.getByOffset(`w_offset + ${H}`)}`;Q+=";"}else if(d===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);Q+=`
          let xValue = ${V.getByOffset("x_offset")};
          let wValue = ${Z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Q},j=`
            let outputIndices = ${F.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${F.indicesGet("outputIndices",0)};
            let d1 = ${F.indicesGet("outputIndices",Y)};
            let r = ${F.indicesGet("outputIndices",X)};
            let c = ${F.indicesGet("outputIndices",R)};
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
              let dyR = (${G}(dyRCorner) + ${G}(wR)) / ${G}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${G}(uniforms.Dy_shape[${X}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${G}(dyCCorner) + ${G}(wC)) / ${G}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${G}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${V.indicesToOffset(`${V.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${Z.indicesToOffset(`${Z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:d}) {
                  ${re()}
                  inputChannel = inputChannel + ${p?4:d};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${b}]`:""};
            ${F.setByOffset("global_idx","value")};
          `;return`
    ${O.registerUniforms(W).declareVariables(...ie,F)}
      ${O.mainStart()}
      ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${j}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${_}${b}${p}${g}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:x[0],y:x[1],z:x[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:P}}}),pp,fp,hp,mo,g0,mp,go,gp,b0,e2=q(()=>{Jx(),Ln(),cn(),pp=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,fp=(e,t,n,r,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[i]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[i]=a)},hp=(e,t,n,r,i,a,o,s,l,u)=>{let d=e.length-2,p=u.length===0;l.length<d&&l.push(...Array(d-l.length).fill(0));let m=e[0],g=t[s?3:1]*i;for(let b=0,_=e.length-d-(s?1:0);b<d;++b,++_){let T=e[_],x=p?T*o[b]:u[b],v=pp(T,o[b],a[b],t[_],n[b],x);fp(v,r,a,b,b+d),p&&u.push(o[b]*(T-1)+l[b]+(t[_]-1)*n[b]+1-a[b]-a[b+d])}u.splice(0,0,m),u.splice(s?3:1,0,g)},mo=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,m)=>p*m,1)===0){n.length=0;for(let p=2;p<t[1].dims.length;++p)n.push(t[1].dims[p])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),s=t[0].dims,l=e.dilations.slice();if(l.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}let u=e.strides.slice();if(u.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}hp(s,n,l,e.autoPad,e.group,i,u,r,o,a);let d=Object.assign({},e);return Object.assign(d,{kernelShape:n,pads:i,outputPadding:o,outputShape:a,dilations:l,strides:u}),d},g0=e=>{let t=Ks(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group??1,o=e.kernelShape,s=e.pads,l=e.strides,u=e.wIsConst(),d=e.outputPadding,p=e.outputShape;return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,outputPadding:d,outputShape:p,pads:s,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},mp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((o,s)=>o+s,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((o,s)=>o+s,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((o,s)=>o+s,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((o,s)=>o+s,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},go=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(ut(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(m0(a,n,r),{inputs:a})},gp=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let s=t.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],o=[1].concat(o),a=[1].concat(a),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let u=mo({...t,pads:s,strides:o,dilations:a,kernelShape:i,outputPadding:l},r);go(e,r,u,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},b0=(e,t)=>{if(mp(e.inputs,t),e.inputs[0].dims.length===3)gp(e,t);else{let n=mo(t,e.inputs);go(e,e.inputs,n)}}}),bp,y0,w0,t2=q(()=>{oe(),ce(),Ae(),de(),bp=(e,t,n,r)=>{let i=B.size(t),a=t.length,o=D("input",e,a),s=ee("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),u=B.normalizeAxis(l,a),d=p=>{let m=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,g=te("uniforms.input_shape","uniforms.axis",a),b=r.reverse?m+(r.exclusive?" + 1":""):"0",_=r.reverse?g:m+(r.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:u},...ne(t,t)]}),getShaderSource:d}},y0=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(bp(r,n,i,t),{inputs:[0]})},w0=e=>{let t=e.exclusive===1,n=e.reverse===1;return ve({exclusive:t,reverse:n})}}),yp,wp,_p,_0,x0,n2=q(()=>{oe(),ce(),Ae(),de(),yp=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},wp=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)i.push(n.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},_p=(e,t)=>{let n,r,i,a,o,s,l=t.format==="NHWC",u=t.blocksize,d=t.mode==="DCR";l?([n,r,i,a]=e.dims,o=d?[n,r,i,u,u,a/u**2]:[n,r,i,a/u**2,u,u],s=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=d?[n,u,u,a/u**2,r,i]:[n,a/u**2,u,u,r,i],s=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(o),m=p.dims.length,g=e.dataType,b=D("a",g,m),_=ee("output",g,m),T=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(b,_)}

  ${wp(s,m,b,_)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:x=>{let v=l?[n,r*u,i*u,a/u**2]:[n,a/u**2,r*u,i*u],I=B.size(v),E=p.dims,k=B.sortBasedOnPerm(E,s);return{outputs:[{dims:v,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...ne(E,k)]}},getShaderSource:T}},_0=(e,t)=>{yp(e.inputs),e.compute(_p(e.inputs[0],t))},x0=e=>ve({blocksize:e.blocksize,mode:e.mode,format:e.format})}),xi,gr,bo,xp,vp,$p,Sp,yo,kp,v0,$0,r2=q(()=>{oe(),ce(),Ae(),de(),xi="[a-zA-Z]|\\.\\.\\.",gr="("+xi+")+",bo="^"+gr+"$",xp="("+gr+",)*"+gr,vp="^"+xp+"$",$p=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Sp=class{constructor(e,t){var i;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(vp)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,o)=>{let s=e[o].dims.slice();if(!a.match(RegExp(bo)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,s,o);this.lhs.push(l)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,o])=>o.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(gr)))throw new Error("Invalid RHS");(i=r.match(RegExp(xi,"g")))==null||i.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(a);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,o=[],s=0;if(!e.match(RegExp(bo))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(xi,"g")),u=new $p(r);return l==null||l.forEach((d,p)=>{if(d==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(o=n.slice(s,s+m),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<o.length;g++){let b=String.fromCharCode(48+g);u.addSymbol(b,p+g),this.addSymbol(b,n[s++],r)}}else u.addSymbol(d,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,n[s++],r)}),u}},yo=e=>e+"_max",kp=(e,t,n,r)=>{let i=e.map(u=>u.length).map((u,d)=>D(`input${d}`,t,u)),a=B.size(r),o=ee("output",t,r.length),s=[...n.symbolToInfo.keys()].filter(u=>!n.rhs.symbolToIndices.has(u)),l=u=>{let d=[],p="var prod = 1.0;",m="var sum = 0.0;",g="sum += prod;",b=[],_=[],T=[],x=[],v=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((E,k)=>{var M;if(n.rhs.symbolToIndices.has(k)){let A=(M=n.rhs.symbolToIndices.get(k))==null?void 0:M[0];A!==void 0&&n.lhs.forEach((S,P)=>{if(E.inputIndices.includes(P)){let O=S.symbolToIndices.get(k);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(W=>{d.push(`${i[P].indicesSet(`input${P}Indices`,W,o.indicesGet("outputIndices",A))}`)})}})}else n.lhs.forEach((A,S)=>{if(E.inputIndices.includes(S)){let P=A.symbolToIndices.get(k);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(O=>{b.push(`${i[S].indicesSet(`input${S}Indices`,O,`${k}`)}`)}),x.push(`prod *= ${i[S].getByIndices(`input${S}Indices`)};`)}}),_.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${yo(k)}; ${k}++) {`),T.push("}")});let I=v?[...d,`let sum = ${i.map((E,k)=>E.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...d,m,..._,...b,p,...x,g,...T];return`
            ${u.registerUniforms(s.map(E=>({name:`${yo(E)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,o)}

            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${i.map((E,k)=>`var input${k}Indices: ${i[k].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let u=s.filter(p=>n.symbolToInfo.has(p)).map(p=>{var m;return{type:12,data:((m=n.symbolToInfo.get(p))==null?void 0:m.dimValue)||0}});u.push({type:12,data:a});let d=e.map((p,m)=>[...ne(p)]).reduce((p,m)=>p.concat(m),u);return d.push(...ne(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}},getShaderSource:l}},v0=(e,t)=>{let n=new Sp(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((a,o)=>a.dims);e.compute(kp(i,e.inputs[0].dataType,n,r))},$0=e=>{let t=e.equation.replace(/\s+/g,"");return ve({equation:t})}}),Cp,wo,Tp,Ep,S0,i2=q(()=>{oe(),ce(),de(),Cp=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},wo=(e,t)=>{let n=e.length-t.length,r=[];for(let i=0;i<n;++i)r.push(e[i]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},Tp=(e,t)=>e.length>t.length?wo(e,t):wo(t,e),Ep=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=Tp(t,n),i=e[0].dataType,a=i===9||B.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4===0?4:1,s=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(B.size(r)/s),u=p=>{let m=D("input",i,t.length,o),g=ee("output",i,r.length,s),b;if(i===9){let _=(T,x,v="")=>`
          let outputIndices${x} = ${g.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${m.broadcastedIndicesToOffset(`outputIndices${x}`,g)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${T}[${x}] = ${v}(${m.getByOffset(`index${x}`)}[component${x}]);
        `;b=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${m.getByOffset(`inputOffset / ${o}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(m,g)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},d=[{type:12,data:l},...ne(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d})}},S0=e=>{Cp(e.inputs),e.compute(Ep(e.inputs),{inputs:[0]})}}),Ip,k0,a2=q(()=>{oe(),ce(),de(),js(),Ip=e=>{let t=e[0].dataType,n=B.size(e[0].dims),r=B.size(e[1].dims),i=r%4===0,a=o=>{let s=D("x",t,[1],4),l=D("bias",t,[1],4),u=ee("y",t,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${l.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,m=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(d).declareVariables(s,l,u)}

    ${os(Ge(t))}

    ${o.mainStart(er)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${u.setByOffset("global_idx",ss("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/er/4)}})}},k0=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?Hg(e):e.compute(Ip(e.inputs))}}),Mp,zp,C0,T0,o2=q(()=>{oe(),ce(),Ae(),de(),Mp=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},zp=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=B.normalizeAxis(t.axis,i),o=n.slice(0);o.splice(a,1,...r);let s=n[a],l=e[0].dataType===9?4:1,u=Math.ceil(B.size(o)/l),d=[{type:12,data:u},{type:6,data:s},{type:12,data:a},...ne(e[0].dims,e[1].dims,o)],p=m=>{let g=D("data",e[0].dataType,e[0].dims.length,l),b=D("inputIndices",e[1].dataType,e[1].dims.length),_=ee("output",e[0].dataType,o.length,l),T=v=>{let I=r.length,E=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let k=0;k<I;k++)E+=`${I>1?`indicesIndices${v}[${k}]`:`indicesIndices${v}`} = ${o.length>1?`outputIndices${v}[uniforms.axis + ${k}]`:`outputIndices${v}`};`;E+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${g.type.indices};
        `;for(let k=0,M=0;k<i;k++)k===a?(E+=`${i>1?`dataIndices${v}[${k}]`:`dataIndices${v}`} = u32(idx${v});`,M+=I):(E+=`${i>1?`dataIndices${v}[${k}]`:`dataIndices${v}`} = ${o.length>1?`outputIndices${v}[${M}]`:`outputIndices${v}`};`,M++);return E},x;if(e[0].dataType===9){let v=(I,E,k="")=>`
          let outputIndices${E} = ${_.offsetToIndices(`outputOffset + ${E}u`)};
          ${T(E)};
          let offset${E} = ${g.indicesToOffset(`dataIndices${E}`)};
          let index${E} = offset${E} / 4u;
          let component${E} = offset${E} % 4u;
          ${I}[${E}] = ${k}(${g.getByOffset(`index${E}`)}[component${E}]);
        `;x=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${g.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,b,_)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:p}},C0=e=>ve({axis:e.axis}),T0=(e,t)=>{let n=e.inputs;Mp(n),e.compute(zp(e.inputs,t))}}),Ap,E0,I0,s2=q(()=>{oe(),ce(),de(),Ap=(e,t,n,r,i,a,o,s,l)=>{let u=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:l}],d=[a];u.push(...ne(t.dims,d));let p=m=>{let g=D("indices_data",t.dataType,t.dims.length),b=ee("input_slice_offsets_data",12,1,1),_=[g,b],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(T).declareVariables(..._)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},E0=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,o=a[a.length-1],s=B.sizeToDimension(a,a.length-1),l=B.sizeFromDimension(r,t.batchDims+o),u=B.sizeToDimension(r,t.batchDims),d=B.sizeFromDimension(r,t.batchDims),p=s/u,m=new Array(o),g=l;for(let E=0;E<o;++E)m[o-1-E]=g,g*=r[t.batchDims+o-1-E];let b=Ap(e,n[1],m,t.batchDims,r,s,p,d,o),_=t.batchDims+o;if(_>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(r.slice(_)),x=B.size(T),v=[{type:12,data:x},{type:12,data:l},...ne(n[0].dims,b.dims,T)],I=E=>{let k=D("data",n[0].dataType,n[0].dims.length),M=D("slice_offsets",12,b.dims.length),A=ee("output",n[0].dataType,T.length);return`
          ${E.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,M,A)}
            ${E.mainStart()}
            ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:i}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:v}),getShaderSource:I},{inputs:[n[0],b]})},I0=e=>({batchDims:e.batch_dims,cacheKey:""})}),Np,Pp,M0,z0,l2=q(()=>{oe(),ce(),Ae(),de(),Np=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((s,l)=>l===n?Math.ceil(s/r)===a.dims[l]:s===a.dims[l]).reduce((s,l)=>s&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==a.dims.length||!o.dims.map((s,l)=>s===a.dims[l]).reduce((s,l)=>s&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Pp=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=B.normalizeAxis(t.gatherAxis,i),o=B.normalizeAxis(t.quantizeAxis,i),s=n.slice(0);s.splice(a,1,...r);let l=B.size(s),u=e[2].dataType,d=e[0].dataType===22,p=[{type:12,data:l},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...ne(...e.map((g,b)=>g.dims),s)],m=g=>{let b=D("data",e[0].dataType,e[0].dims.length),_=D("inputIndices",e[1].dataType,e[1].dims.length),T=D("scales",e[2].dataType,e[2].dims.length),x=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,v=ee("output",u,s.length),I=[b,_,T];x&&I.push(x);let E=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(E).declareVariables(...I,v)}
        ${g.mainStart()}
        let output_indices = ${v.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${v.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${v.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${v.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
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
        let quantized_data_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ge(u)}(quantized_data - zero_point) * scale;
        ${v.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,b)=>b!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,b)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:u}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:m}},M0=(e,t)=>{let n=e.inputs;Np(n,t),e.compute(Pp(e.inputs,t))},z0=e=>ve({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Rp,Op,A0,N0,u2=q(()=>{oe(),ce(),Ae(),de(),Rp=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Op=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,o=e[1].dataType,s=B.normalizeAxis(t.axis,i),l=n[s],u=a.slice(0),d=B.size(u),p=D("input",r,i),m=D("indicesInput",o,a.length),g=ee("output",r,u.length),b=[{type:12,data:d},{type:6,data:l},{type:12,data:s}];return b.push(...ne(n,a,u)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,g)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},A0=e=>ve({axis:e.axis}),N0=(e,t)=>{let n=e.inputs;Rp(n),e.compute(Op(e.inputs,t))}}),Bp,Lp,P0,R0,c2=q(()=>{oe(),ce(),de(),Bp=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Lp=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,o]=Am.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let l=16,u=Math.ceil(a/l),d=Math.ceil(i/l),p=!0,m=B.size(s),g=[{type:12,data:p?u:m},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(g.push(...ne(e[2].dims)),b.push("rank")),g.push(...ne(s));let _=x=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",E=D("a",e[0].dataType,e[0].dims),k=D("b",e[1].dataType,e[1].dims),M=E.type.value,A=null,S=[E,k];e.length===3&&(A=D("c",e[2].dataType,e[2].dims.length),S.push(A));let P=ee("output",e[0].dataType,s.length);S.push(P);let O=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(O).declareVariables(...S)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${M}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${I}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${M}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=x=>{let v=D("a",e[0].dataType,e[0].dims),I=D("b",e[1].dataType,e[1].dims),E=null,k=[v,I];e.length===3&&(E=D("c",e[2].dataType,e[2].dims.length),k.push(E));let M=ee("output",e[0].dataType,s.length);k.push(M);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],S="",P="";t.transA&&t.transB?(P=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
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
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let O=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(A).declareVariables(...k)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${l}>, ${l}>;
  ${x.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${M.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${S}
      }
      workgroupBarrier();
    }

    ${O}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${M.type.value}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:u*d},programUniforms:g}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:_}},P0=e=>{let t=e.transA,n=e.transB,r=e.alpha,i=e.beta;return{transA:t,transB:n,alpha:r,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},R0=(e,t)=>{Bp(e.inputs),e.compute(Lp(e.inputs,t))}}),Et,Ft,gn,bn,Dp,Fp,Up,Wp,qp,Vp,Hp,Gp,O0,B0,d2=q(()=>{oe(),ce(),Ae(),de(),[Et,Ft,gn,bn]=[0,1,2,3],Dp=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Fp=`
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
`,Up=e=>`
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
`,Wp=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,qp=e=>`
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
`,Vp=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Et}] = batch;
     indices[${Ft}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${gn}] = u32(r);
            indices[${bn}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${gn}] = u32(clamp(r, 0, H - 1));
          indices[${bn}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${gn}] = gs_reflect(r, border[1], border[3]);
          indices[${bn}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Hp=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Et}], indices[${Ft}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Et}], indices[${Ft}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Et}], indices[${Ft}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Et}], indices[${Ft}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Et}], indices[${Ft}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Et}], indices[${Ft}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Gp=(e,t)=>{let n=D("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=D("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Et,Ft,gn,bn]=[0,3,1,2]);let o=ee("output",e[0].dataType,a.length),s=n.type.value,l=B.size(a),u=[{type:12,data:l},...ne(e[0].dims,r,a)],d=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(n,i,o)}
  ${Fp}
  ${Up(s)}
  ${Wp(t)}
  ${qp(t)}
  ${Vp(n,s,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${gn}]);
      let W_in = i32(uniforms.x_shape[${bn}]);

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
      var grid_indices = vec3<u32>(indices[${Et}], indices[${gn}], indices[${bn}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Hp(o,s,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let m=B.size(a);return{outputs:[{dims:a,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:u}},getShaderSource:d}},O0=(e,t)=>{Dp(e.inputs),e.compute(Gp(e.inputs,t))},B0=e=>ve({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Xe,jp,L0,_o,Kp,Tr,D0,F0=q(()=>{oe(),ce(),Ae(),qs(),Gs(),de(),cn(),Xe=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,jp=(e,t)=>{let n=e[0],r=Xe(e,1),i=Xe(e,2),a=Xe(e,3),o=Xe(e,4),s=Xe(e,5),l=Xe(e,6),u=Xe(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=n.dims[0],p=n.dims[1],m=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],g=p,b=0,_=0,T=Math.floor(m/t.numHeads);if(l&&u&&B.size(l.dims)&&B.size(u.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(u.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],_=l.dims[2]}else if(l&&B.size(l.dims)||u&&B.size(u.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(r&&B.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,g=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,g=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,g=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(a&&B.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+g,I=0;if(o&&B.size(o.dims)>0){I=8;let A=o.dims;throw A.length===1?A[0]===d?I=1:A[0]===3*d+2&&(I=3):A.length===2&&A[0]===d&&A[1]===v&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let E=!1,k=m;if(i&&B.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(g!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=i.dims[2]}else{if(g!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=i.dims[1]*i.dims[3],E=!0}}let M=!1;if(o&&B.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(s&&B.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==d||s.dims[1]!==t.numHeads||s.dims[2]!==p||s.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:g,totalSequenceLength:v,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:m,vHiddenSize:k,headSize:T,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:M,passPastInKv:E,qkvFormat:x}},L0=e=>ve({...e}),_o=ve({perm:[0,2,1,3]}),Kp=(e,t,n,r,i,a,o)=>{let s=[r,i,a],l=B.size(s),u=[{type:12,data:l},{type:12,data:o},{type:12,data:a}],d=p=>{let m=ee("qkv_with_bias",t.dataType,s),g=D("qkv",t.dataType,s),b=D("bias",n.dataType,s),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(g,b,m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:d},{inputs:[t,n],outputs:[-1]})[0]},Tr=(e,t,n,r,i,a,o,s)=>{let l=a;if(o&&B.size(o.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Kp(e,a,o,t,r,n*i,s),l=l.reshape([t,r,n,i]),n===1||r===1?l:e.compute(ut(l,_o.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,i])),n===1||r===1?l:e.compute(ut(l,_o.perm),{inputs:[l],outputs:[-1]})[0]},D0=(e,t)=>{let n=jp(e.inputs,t),r=e.inputs[0],i=Xe(e.inputs,1),a=Xe(e.inputs,2),o=Xe(e.inputs,3),s=Xe(e.inputs,4),l=Xe(e.inputs,5),u=Xe(e.inputs,6),d=Xe(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if((i==null?void 0:i.dims.length)===5)throw new Error("Packed KV is not implemented");let p=i&&a&&i.dims.length===4&&a.dims.length===4,m=Tr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,o,0);if(p)return Dr(e,m,i,a,s,void 0,u,d,l,n);if(!i||!a)throw new Error("key and value must be provided");let g=Tr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,o,n.hiddenSize),b=Tr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,o,2*n.hiddenSize);Dr(e,m,g,b,s,void 0,u,d,l,n)}}),Xp,Yp,Qp,Zp,ps,U0,W0,q0=q(()=>{oe(),ce(),Ae(),de(),Xp=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Yp=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>n.push(Number(i))),r=n.length),ve({numOutputs:r,axis:t.axis,splitSizes:n})},Qp=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${te("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Zp=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},ps=(e,t)=>{let n=e[0].dims,r=B.size(n),i=e[0].dataType,a=B.normalizeAxis(t.axis,n.length),o=new Array(t.numOutputs),s=D("input",i,n.length),l=new Array(t.numOutputs),u=[],d=[],p=0,m=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){p+=t.splitSizes[b],l[b]=p;let _=n.slice();_[a]=t.splitSizes[b],d.push(_),o[b]=ee(`output${b}`,i,_.length),u.push({dims:d[b],dataType:e[0].dataType})}m.push({type:12,data:l},...ne(n,...d));let g=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(s,...o)}
  ${Qp(l.length)}
  ${Zp(o)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${te("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${s.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:u,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}},U0=(e,t)=>{Xp(e.inputs);let n=e.inputs.length===1?t:Yp(e.inputs,t);e.compute(ps(e.inputs,n),{inputs:[0]})},W0=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ve({axis:t,numOutputs:r,splitSizes:n})}}),Jp,Ui,V0,H0=q(()=>{oe(),ce(),Ae(),de(),Jp=(e,t)=>{let[n,r,i,a]=e,{numHeads:o,rotaryEmbeddingDim:s}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!B.areEqual(r.dims,[])&&!B.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!B.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],u=n.dims[n.dims.length-2],d=i.dims[0],p=B.sizeFromDimension(n.dims,1)/u,m=s===0?i.dims[1]*2:p/o;if(s>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(u!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(u>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(m/2!==i.dims[1]&&s/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},Ui=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,o=e[0].dims[0],s=B.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],u=s/l,d=e[2].dims[1],p=i===0?d*2:u/r,m=new Array(o,l,u/p,p-d),g=B.computeStrides(m),b=[{type:1,data:a},{type:12,data:m},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[s,u,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[s,p,l*p,1]}):[],...ne(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=T=>{let x=D("input",e[0].dataType,e[0].dims.length),v=D("position_ids",e[1].dataType,e[1].dims.length),I=D("cos_cache",e[2].dataType,e[2].dims.length),E=D("sin_cache",e[3].dataType,e[3].dims.length),k=ee("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${T.declareVariables(x,v,I,E,k)}

        ${T.mainStart(er)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",ee("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${x.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ve({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(m)/er)},programUniforms:b})}},V0=(e,t)=>{Jp(e.inputs,t),e.compute(Ui(e.inputs,t))}}),ef,tf,xo,nf,G0,p2=q(()=>{Ae(),oe(),Gs(),F0(),q0(),cn(),H0(),de(),ef=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,l=n.dims[0],u=n.dims[1],d=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],p=u,m=0,g=!r||r.dims.length===0,b=Math.floor(g?d/(t.numHeads+2*t.kvNumHeads):d/t.numHeads);g&&(d=b*t.numHeads);let _=a&&a.dims.length!==0,T=o&&o.dims.length!==0;if(_&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=a.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let v=0,I=!1,E=t.kvNumHeads?b*t.kvNumHeads:d;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(p!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=i.dims[2]}else{if(p!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');E=i.dims[1]*i.dims[3],I=!0}}let k=e.length>4?e[5]:void 0;if(k){if(k.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let M=k.dims.reduce((A,S)=>A*S,1);if(M!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${M}.`);for(let A=0;A<k.dims.length;A++)if(k.dims[A]!==1&&k.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${k.dims[A]}.`)}return{batchSize:l,sequenceLength:u,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:E,headSize:b,vHeadSize:Math.floor(E/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:x}},tf=ve({perm:[0,2,1,3]}),xo=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(ut(r,tf.perm),{inputs:[r],outputs:[-1]})[0]),r},nf=(e,t,n,r)=>{let i=7,a=["type","type"],o=[e*t],s=e*t,l=[{type:12,data:s},{type:12,data:t},{type:12,data:e}],u=d=>{let p=D("seq_lens",n.dataType,n.dims),m=D("total_seq_lens",r.dataType,r.dims),g=ee("pos_ids",i,o),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${d.registerUniforms(b).declareVariables(p,m,g)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:u}},G0=(e,t)=>{var E;let n=ef(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((E=e.inputs[1])==null?void 0:E.dims.length)===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,s=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,u=e.inputs.length>5?e.inputs[6]:void 0,d=n.kvNumHeads?n.kvNumHeads:n.numHeads,p=ve({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,d*n.headSize,d*n.headSize]}),[m,g,b]=!i&&!a?e.compute(ps([r],p),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],_,T;if(t.doRotary){let k=e.compute(nf(n.batchSize,n.sequenceLength,l,u),{inputs:[l,u],outputs:[-1]})[0],M=e.inputs[7],A=e.inputs[8],S=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),P=[m,k,M,A],O=[-1];_=e.compute(Ui(P,S),{inputs:P,outputs:O})[0],P.splice(0,1,g);let W=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Ui(P,W),{inputs:P,outputs:O})[0]}let x=Tr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?_:m,void 0,0),v=xo(e,t.doRotary?T:g,n),I=xo(e,b,n);Dr(e,x,v,I,void 0,void 0,o,s,void 0,n,l,u)}}),vo,rf,af,j0,f2=q(()=>{oe(),ce(),cn(),de(),vo=(e,t,n,r,i,a,o,s)=>{let l=Me(a),u=l===1?"f32":`vec${l}f`,d=l===1?"vec2f":`mat2x${l}f`,p=i*o,m=64;p===1&&(m=256);let g=[i,o,a/l],b=[i,o,2],_=["rank","type","type"],T=[];T.push(...ne(g,b));let x=v=>{let I=D("x",t.dataType,3,l),E=D("scale",n.dataType,n.dims),k=D("bias",r.dataType,r.dims),M=ee("output",1,3,2),A=[I,E,k,M];return`
  var<workgroup> workgroup_shared : array<${d}, ${m}>;
  const workgroup_size = ${m}u;
  ${v.declareVariables(...A)}
  ${v.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${u}(0);
    var squared_sum = ${u}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${u}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${un("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${un("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${s};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:p},programUniforms:T}),getShaderSource:x},{inputs:[t,n,r],outputs:[-1]})[0]},rf=(e,t,n)=>{let r=t[0].dims,i=r,a=2,o=r[0],s=r[1],l=B.sizeFromDimension(r,a),u=Me(l),d=B.size(i)/u,p=vo(e,t[0],t[1],t[2],o,l,s,n.epsilon),m=[o,s,l/u],g=[o,s],b=["type","none"],_=T=>{let x=D("x",t[0].dataType,m.length,u),v=D("scale_shift",1,g.length,2),I=ee("output",t[0].dataType,m.length,u),E=[x,v,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...E)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${u}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...ne(m,g,m)]}),getShaderSource:_},{inputs:[t[0],p]})},af=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[r.length-1],s=B.sizeFromDimension(r,1)/o,l=Me(o),u=B.size(i)/l,d=[{type:12,data:s},{type:12,data:Math.floor(o/l)}],p=["type","type"],m=!1,g=[0,r.length-1];for(let x=0;x<r.length-2;x++)m=m||r[x+1]!==1,g.push(x+1);m=m&&r[r.length-1]!==1;let b=m?e.compute(ut(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(x,v)=>r[g[v]])),_=vo(e,b,t[1],t[2],a,s,o,n.epsilon),T=x=>{let v=Oe(t[0].dataType),I=l===1?"vec2f":`mat${l}x2f`,E=A=>{let S=A===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${P}(scale.${S}))`;case 2:return`vec2<${v}>(${P}(scale[0].${S}, scale[1].${S}))`;case 4:return`vec4<${v}>(${P}(scale[0].${S}, scale[1].${S}, scale[2].${S}, scale[3].${S}))`;default:throw new Error(`Not supported compoents ${l}`)}},k=D("input",t[0].dataType,t[0].dims,l),M=ee("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${M.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${E(0)}, ${E(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:T},{inputs:[t[0],_]})},j0=(e,t)=>{t.format==="NHWC"?af(e,e.inputs,t):rf(e,e.inputs,t)}}),of,sf,K0,h2=q(()=>{oe(),ce(),de(),of=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},sf=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],o=!r&&e[2],s=i,l=B.normalizeAxis(t.axis,i.length),u=B.sizeToDimension(i,l),d=B.sizeFromDimension(i,l),p=B.size(a.dims),m=o?B.size(o.dims):0;if(p!==d||o&&m!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${m}`);let g=[];for(let k=0;k<i.length;++k)k<l?g.push(i[k]):g.push(1);let b=Me(d),_=["type","type"],T=[{type:12,data:u},{type:1,data:d},{type:12,data:Math.floor(d/b)},{type:1,data:t.epsilon}];o&&_.push("type");let x=n>1,v=n>2,I=k=>{let M=Oe(e[0].dataType),A=[D("x",e[0].dataType,e[0].dims,b),D("scale",a.dataType,a.dims,b)];o&&A.push(D("bias",o.dataType,o.dims,b)),A.push(ee("output",e[0].dataType,s,b)),x&&A.push(ee("mean_data_output",1,g)),v&&A.push(ee("inv_std_output",1,g));let S=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(S).declareVariables(...A)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${rs("f32",b)};
    var mean_square_vector = ${rs("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Kn(M,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${un("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${un("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Kn(M,b,"x[j + offset]")};
      let f32scale = ${Kn(M,b,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Kn(M,b,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},E=[{dims:s,dataType:e[0].dataType}];return x&&E.push({dims:g,dataType:1}),v&&E.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:_},getRunData:()=>({outputs:E,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:T}),getShaderSource:I}},K0=(e,t)=>{of(e.inputs),e.compute(sf(e.inputs,t,e.outputCount))}}),lf,X0,m2=q(()=>{ce(),Qs(),Zs(),lf=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},X0=e=>{lf(e.inputs);let t=Jn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Ys(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=B.size(e.inputs[0].dims.slice(0,-2)),o=B.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&o===1){let s=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),u=[1,a,n],d=[s,l];e.compute(Fi(d,{activation:""},t,u),{inputs:d})}else e.compute(Fi(e.inputs,{activation:""},t))}}}),uf,cf,df,Y0,Q0,g2=q(()=>{oe(),ce(),Ae(),de(),uf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!B.areEqual(o.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let s=e[2].dims;if(B.size(s)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,u=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(B.size(l)!==u)throw new Error("zeroPoints input size error.")}},cf=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),l=B.size(s),u=e[1].dims[2]/4,d=e[0].dataType,p=Me(t.k),m=Me(u),g=Me(o),b=s.concat([i,o]),_=i>1&&o/g%2===0?2:1,T=B.size(b)/g/_,x=64,v=[],I=[l,i,a/p],E=B.convertShape(e[1].dims).slice();E.splice(-1,1,u/m),v.push(...ne(I)),v.push(...ne(E)),v.push(...ne(e[2].dims)),e.length===4&&v.push(...ne(B.convertShape(e[3].dims)));let k=[l,i,o/g];v.push(...ne(k));let M=A=>{let S=I.length,P=D("a",e[0].dataType,S,p),O=D("b",12,E.length,m),W=D("scales",e[2].dataType,e[2].dims.length),G=[P,O,W],X=e.length===4?D("zero_points",12,e[3].dims.length):void 0;X&&G.push(X);let R=k.length,Y=ee("output",e[0].dataType,R,g),Z=Oe(e[0].dataType),V=(()=>{switch(p){case 1:return`array<${Z}, 8>`;case 2:return`mat4x2<${Z}>`;case 4:return`mat2x4<${Z}>`;default:throw new Error(`${p}-component is not supported.`)}})(),ie=Math.floor(32/t.bits),F=Math.floor(ie/8),re=()=>{let Q="";for(let H=0;H<F;H++){let _e=H*t.bits*4,Ke=_e+t.bits;Q+=`
          // reuse a data (pass ${H})
            var input_offset${H>0?H:""} = ${H===0?P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${H>0?H:""}: ${V};
            for (var j${H>0?H:""}: u32 = 0; j${H>0?H:""} < ${8/p}; j${H>0?H:""}++) {
              a_data${H>0?H:""}[j${H>0?H:""}] = ${P.getByOffset(`input_offset${H>0?H:""}`)};
              input_offset${H>0?H:""}++;
            }
          `;for(let Ie=0;Ie<g*_;Ie++)Q+=`
            b_value = ${m===1?`b${Ie}_data`:`b${Ie}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${H*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${_e}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ke}u) & b_mask);`}
            b_quantized_values = ${V}(${Array.from({length:4},(Le,Ze)=>`${Z}(b_value_lower[${Ze}]), ${Z}(b_value_upper[${Ze}])`).join(", ")});
            b_dequantized_values = ${p===1?`${V}(${Array.from({length:8},(Le,Ze)=>`(b_quantized_values[${Ze}] - ${X?`zero_point${Ie}`:"zero_point"}) * scale${Ie}`).join(", ")});`:`(b_quantized_values - ${V}(${Array(8).fill(`${X?`zero_point${Ie}`:"zero_point"}`).join(",")})) * scale${Ie};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(Ie/g)}]${g>1?`[${Ie%g}]`:""} += ${Array.from({length:8/p},(Le,Ze)=>`${p===1?`a_data${H>0?H:""}[${Ze}] * b_dequantized_values[${Ze}]`:`dot(a_data${H>0?H:""}[${Ze}], b_dequantized_values[${Ze}])`}`).join(" + ")};
          `}return Q},U=()=>{let Q=`
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
            let zero_point = ${Z}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let H=0;H<g*_;H++)Q+=`
            let scale${H} = ${W.getByOffset("col_index * nBlocksPerCol + block")};
            ${X?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${H} = ${Z}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Q},j=()=>{let Q=`col_index = col * ${g};`;for(let H=0;H<g*_;H++)Q+=`
            let b${H}_data = ${O.getByIndices(`${O.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Q+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${V};
            var b_dequantized_values: ${V};`,Q};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${_*x}>;
        ${A.declareVariables(...G,Y)}
        ${A.mainStart([x,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${x}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${U()}
            for (var word: u32 = 0; word < ${u}; word += ${m}) {
              ${j()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${re()}
                word_offset += ${ie/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${m};${g};${_};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:d}],dispatchGroup:{x:T},programUniforms:v}),getShaderSource:M}},df=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),l=B.size(s),u=e[1].dims[2]/4,d=e[0].dataType,p=Me(t.k),m=Me(u),g=s.concat([i,o]),b=128,_=o%8===0?8:o%4===0?4:1,T=b/_,x=Math.floor(32/t.bits),v=T*m*x,I=v/p,E=v/t.blockSize,k=B.size(g)/_,M=[],A=[l,i,a/p],S=B.convertShape(e[1].dims).slice();S.splice(-1,1,u/m),M.push(...ne(A)),M.push(...ne(S)),M.push(...ne(e[2].dims)),e.length===4&&M.push(...ne(B.convertShape(e[3].dims)));let P=[l,i,o];M.push(...ne(P));let O=W=>{let G=A.length,X=D("a",e[0].dataType,G,p),R=D("b",12,S.length,m),Y=D("scales",e[2].dataType,e[2].dims.length),Z=[X,R,Y],V=e.length===4?D("zero_points",12,e[3].dims.length):void 0;V&&Z.push(V);let ie=P.length,F=ee("output",e[0].dataType,ie),re=Oe(e[0].dataType),U=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${F.type.value}, ${T}>, ${_}>;
        ${W.declareVariables(...Z,F)}
        ${W.mainStart([T,_,1])}
          let output_indices = ${F.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${E} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${b})
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
            let block = tile * ${E} + local_id.x;
            ${V?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${V.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${re}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${re}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${Y.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${m}; i++) {
              let b_value = ${m===1?"b_data":"b_data[i]"};
              ${(()=>{let j=Math.floor(x/8),Q="";for(let H=0;H<j;H++){let _e=H*t.bits*4,Ke=_e+t.bits;Q+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${H*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${_e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ke}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(Ie,Le)=>`${re}(b_value_lower[${Le}]), ${re}(b_value_upper[${Le}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ie,Le)=>`${`dot(a_data${Le}, b_dequantized_values[${Le}])`}`).join(" + ")};
              }
              word_offset += ${8/p};`}return Q})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${F.type.value} = ${F.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${F.setByIndices(`${F.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${m};${T};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:d}],dispatchGroup:{x:k},programUniforms:M}),getShaderSource:O}},Y0=(e,t)=>{uf(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(df(e.inputs,t)):e.compute(cf(e.inputs,t))},Q0=e=>ve(e)}),pf,ff,hf,mf,gf,bf,yf,wf,Z0,b2=q(()=>{oe(),ce(),de(),pf=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ff=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
            k = i32(${e.indicesGet("indices",i)}) - ${te("uniforms.pads",i,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${te("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${te("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},hf=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${te("uniforms.pads",i,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${te("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${te("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${te("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},mf=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${te("uniforms.pads",i,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${te("uniforms.x_shape",i,t)})) {
                  k = i32(${te("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${te("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},gf=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet("indices",i)}) - ${te("uniforms.pads",i,n)};
                if (k < 0)  {
                  k += i32(${te("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${te("uniforms.x_shape",i,t)})) {
                  k -= i32(${te("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${te("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},bf=(e,t,n)=>{switch(n.mode){case 0:return ff(e,t,n.pads.length);case 1:return hf(e,t,n.pads.length);case 2:return mf(e,t,n.pads.length);case 3:return gf(e,t,n.pads.length);default:throw new Error("Invalid mode")}},yf=(e,t)=>{let n=B.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=B.size(n),a=[{type:12,data:i},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&a.push({type:o?e[2].dataType:1,data:t.value}),a.push(...ne(e[0].dims,n));let s=["rank"],l=u=>{let d=ee("output",e[0].dataType,n.length),p=D("x",e[0].dataType,r.length),m=p.type.value,g=bf(d,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:o?m:"f32"}),`
            ${u.registerUniforms(b).declareVariables(p,d)}
            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(n)/64)},programUniforms:a}),getShaderSource:l}},wf=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let s=e[3].getBigInt64Array();for(let l=0;l<s.length;l++)a[Number(s[l])]=Number(n[l]),a[Number(s[l])+i]=Number(n[l+s.length])}else n.forEach((s,l)=>a[Number(l)]=Number(s));let o=[];return a.forEach(s=>o.push(s)),{mode:t.mode,value:r,pads:o}}else return t},Z0=(e,t)=>{pf(e.inputs);let n=wf(e.inputs,t);e.compute(yf(e.inputs,n),{inputs:[0]})}}),br,$o,So,ko,Co,_f,xf,To,Eo,J0,eb,Io,tb,nb,Mo,rb,ib,ab,ob,y2=q(()=>{ft(),oe(),ce(),de(),br=e=>{if(Se.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},$o=(e,t,n)=>{let r=t.format==="NHWC",i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),s=t.strides.slice(),l=a?t.dilations.slice():[],u=t.pads.slice();Li.adjustPoolAttributes(n,i,o,s,l,u);let d=Li.computePoolOutputShape(n,i,s,l,o,u,t.autoPad),p=Object.assign({},t);a?Object.assign(p,{kernelShape:o,strides:s,pads:u,dilations:l,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:o,strides:s,pads:u,cacheKey:t.cacheKey});let m=d.slice();return m.push(m.splice(1,1)[0]),[p,r?m:d]},So=(e,t)=>{let n=t.format==="NHWC",r=B.size(e),i=B.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],p=!!(u+d);a.push({type:12,data:s},{type:12,data:l},{type:12,data:u},{type:12,data:d}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];m=!!(_+T),a.push({type:12,data:g},{type:12,data:b},{type:12,data:_},{type:12,data:T}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,o,!0,p,m]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=B.computeStrides(t.kernelShape);a.push({type:12,data:s},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((u,d)=>u+d);return[a,o,!!l,!1,!1]}},ko=(e,t,n,r,i,a,o,s,l,u,d,p)=>{let m=i.format==="NHWC",g=t.type.value,b=ee("output",t.type.tensor,r);if(i.kernelShape.length<=2){let _="",T="",x="",v=n-(m?2:1);if(d?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,i.kernelShape.length===2){let I=n-(m?3:2);p?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
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
              ${_}
              ${x}
              ${o}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=i.kernelShape.length,T=i.pads.length,x="";return u?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:x=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${g}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${te("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${te("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${n-_}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${te("uniforms.strides",`j - ${n-_}u`,_)}
                    + offsets[j - ${n-_}u] - ${te("uniforms.pads","j - 2u",T)};
                  ${x}
              }
              ${o}

              output[global_idx] = value;
            }`}},Co=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,_f=e=>`${Co(e)};${e.countIncludePad}`,xf=e=>`${Co(e)};${e.storageOrder};${e.dilations}`,To=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Eo=(e,t,n,r)=>{let[i,a]=$o(t,r,n),o=D("x",t.dataType,t.dims.length),s=o.type.value,l="value += x_val;",u="";i.countIncludePad?u+=`value /= ${s}(uniforms.kernelSize);`:u+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[d,p,m,g,b]=So(a,i);d.push(...ne(t.dims,a));let _=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${m};${g};${b}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:d}),getShaderSource:T=>ko(T,o,t.dims.length,a.length,i,l,u,0,p,m,g,b)}},J0=e=>{let t=e.count_include_pad!==0,n=To(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:_f(r)}},eb=(e,t)=>{br(e.inputs),e.compute(Eo("AveragePool",e.inputs[0],!1,t))},Io={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},tb=e=>{let t=e.format;return{format:t,...Io,cacheKey:t}},nb=(e,t)=>{br(e.inputs),e.compute(Eo("GlobalAveragePool",e.inputs[0],!0,t))},Mo=(e,t,n,r)=>{let[i,a]=$o(t,r,n),o=`
      value = max(x_val, value);
    `,s="",l=D("x",t.dataType,t.dims.length),u=["rank"],[d,p,m,g,b]=So(a,i);return d.push(...ne(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${m};${g};${b}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:d}),getShaderSource:_=>ko(_,l,t.dims.length,a.length,i,o,s,t.dataType===10?-65504:-1e5,p,m,g,b)}},rb=(e,t)=>{br(e.inputs),e.compute(Mo("MaxPool",e.inputs[0],!1,t))},ib=e=>{let t=e.storage_order,n=e.dilations,r=To(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:n,...r,cacheKey:""};return{...i,cacheKey:xf(i)}},ab=e=>{let t=e.format;return{format:t,...Io,cacheKey:t}},ob=(e,t)=>{br(e.inputs),e.compute(Mo("GlobalMaxPool",e.inputs[0],!0,t))}}),vf,$f,sb,lb,w2=q(()=>{oe(),ce(),Ae(),de(),vf=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},$f=(e,t)=>{let n=B.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,o=e[1].dataType,s=B.size(a),l=r===3||r===2,u=l?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,p=e.length>2?e[2]:void 0,m=p?l?[Math.ceil(B.size(p.dims)/4)]:p.dims:void 0,g=d.length===0||d.length===1&&d[0]===1,b=g===!1&&d.length===1,_=Me(s),T=g&&(!l||_===4),x=T?_:1,v=T&&!l?_:1,I=D("input",l?12:r,u.length,v),E=D("scale",o,d.length),k=p?D("zero_point",l?12:r,m.length):void 0,M=ee("output",o,a.length,x),A=[I,E];k&&A.push(k);let S=[u,d];p&&S.push(m);let P=[{type:12,data:s/x},{type:12,data:n},{type:12,data:t.blockSize},...ne(...S,a)],O=W=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${W.registerUniforms(G).declareVariables(...A,M)}
      ${W.mainStart()}
          ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${M.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${E.getByOffset("0")}`:b?`
            let scale_index = ${M.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${E.getByOffset("scale_index")};`:`
            var scale_indices: ${E.type.indices} = output_indices;
            let index = ${E.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${E.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${E.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${k?g?l?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:b?l?`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${E.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${M.setByOffset("global_idx",`${M.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:O,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/x/64),y:1,z:1},programUniforms:P})}},sb=(e,t)=>{vf(e.inputs,t),e.compute($f(e.inputs,t))},lb=e=>ve({axis:e.axis,blockSize:e.blockSize})}),Sf,kf,ub,_2=q(()=>{ft(),oe(),de(),Sf=(e,t,n)=>{let r=e===t,i=e<t&&n<0,a=e>t&&n>0;if(r||i||a)throw new Error("Range these inputs' contents are invalid.")},kf=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],o=i,s=[{type:12,data:o},{type:r,data:e},{type:r,data:n},...ne(a)],l=u=>{let d=ee("output",r,a.length),p=d.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${u.registerUniforms(m).declareVariables(d)}
        ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}},ub=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Se.webgpu.validateInputContent&&Sf(t,n,r),e.compute(kf(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),Cf,Tf,cb,db,x2=q(()=>{oe(),ce(),Ae(),de(),Cf=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
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
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Tf=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=1,o=Math.ceil(B.sizeToDimension(r,r.length-1)/a),s=r[r.length-1],l=B.sizeFromDimension(n,s),u=[{type:12,data:o},{type:12,data:s},{type:12,data:l},...ne(e[1].dims,e[2].dims,i)],d=p=>{let m=D("indices",e[1].dataType,e[1].dims.length),g=D("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?Dm("output",e[0].dataType,i.length):ee("output",e[0].dataType,i.length,a);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,g,b)}
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
    ${Cf(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:d}},cb=e=>ve({reduction:e.reduction}),db=(e,t)=>{e.compute(Tf(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Ef,If,Mf,zo,zf,Af,Nf,Pf,Rf,Of,Bf,Lf,Ao,Df,Ff,Uf,Wf,qf,pb,fb,v2=q(()=>{oe(),ce(),Ae(),de(),Ef=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},If=(e,t,n)=>{t.every(i=>i>=0&&i<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((i,a)=>r[i]=e[a]),r},Mf=(e,t,n,r,i,a)=>{let[o,s,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],u=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(d=>a.push(d));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&e.length>s&&e[s].dims.length===1&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(d=>r.push(d)),r.length!==0&&r.length!==u&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ef(r,t),t.axes.length>0&&If(r,t.axes,u).forEach((d,p)=>r[p]=d)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(d=>i.push(Number(d))),i.length!==0&&i.length!==u&&n>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof i<"u"&&r.length>0&&i.length>u)throw new Error("Resize requires only of scales or sizes to be specified")},zo=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,zf=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${zo("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${zo("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Af=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Nf=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,o)=>{r[a]=i[o],r[o+n]=i[t.length+o]}),r):i},Pf=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>i.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,o)=>i[a]=n[o])}else n.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,o)=>Math.round(a*t[o]))}return i},Rf=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),i.forEach((a,o)=>i[o]=Math.round(a*t[o]))),i},Of=(e,t,n,r,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${te("uniforms.scales","i",r)};
        var roi_low = ${te("uniforms.roi","i",i)};
        var roi_hi = ${te("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${te("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${te("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Bf=(e,t,n,r,i,a,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${te("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${te("uniforms.roi","i",a)};
          var roi_hi = ${te("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${te("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${te("uniforms.output_shape","i",r.length)};
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
    }`,Lf=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${te("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ao=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",Df=(e,t,n,r,i)=>{let[a,o,s,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(col, ${n[s]} - 1))`)};
      ${Ao(e,l,a,2)}
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
    }`},Ff=(e,t,n,r,i,a,o,s,l,u)=>{let d=n.length===2,[p,m]=d?[0,1]:[2,3],g=e.type.value,b=_=>{let T=_===p?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",_)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[_]},
        ${r[_]}, ${n[_]}, ${a[_]}, ${a[_]} + ${n.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[_]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${g} = originalIdx + ${g}(i);
          if (${T} < 0 || ${T} >= ${n[_]}) {
            ${u?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${l};`:`${T} = max(0, min(${T}, ${n[_]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",_,`u32(${T})`)};
          data[i + 1] = ${_===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(p)};
    ${b(m)};
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
    `},Uf=(e,t,n,r,i)=>{let[a,o,s,l,u]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Ao(e,u,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${o}];
      var height:${d} = originalIndices[${s}];
      var width:${d} = originalIndices[${l}];
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

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
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
    }`},Wf=(e,t,n,r,i,a)=>{let o=e.dims,s=Nf(a,t.axes,o.length),l=Pf(o,r,i,t.axes),u=r.slice();r.length===0&&(u=o.map((v,I)=>v===0?1:l[I]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Rf(o,u,t)));let d=ee("output",e.dataType,l.length),p=D("input",e.dataType,o.length),m=B.size(l),g=o.length===l.length&&o.every((v,I)=>v===l[I]),b=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,T=p.type.value,x=v=>`
      ${g?"":`
      ${zf(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Lf(p,o)};
              ${Af(t.nearestMode,n,T)};
              ${Bf(p,d,o,l,u.length,s.length,b)};
              `;case"linear":return`
              ${Of(d,o,l,u.length,s.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${Df(p,d,o,b,_)}`;if(o.length===3||o.length===5)return`${Uf(p,d,o,b,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${Ff(p,d,o,l,u,s,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",s.length).declareVariables(p,d)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${u.length>0?t.mode==="cubic"?u:u.length:""}|${i.length>0?i:""}|${s.length>0?s:""}|${g}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:u},{type:1,data:s},...ne(o,l)]})}},qf=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},pb=(e,t)=>{let n=[],r=[],i=[],a=qf(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Mf(e.inputs,t,a,n,r,i),e.compute(Wf(e.inputs[0],t,a,n,r,i),{inputs:[0]})},fb=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,s=e.keepAspectRatioPolicy,l=e.mode,u=e.nearestMode===""?"simple":e.nearestMode;return ve({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:s,mode:l,nearestMode:u})}}),Vf,Hf,hb,$2=q(()=>{oe(),ce(),de(),Vf=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},Hf=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,o=B.size(a),s=a,l=o,u=a.slice(-1)[0],d=r?a.slice(0,-1).concat(1):[],p=!i&&e.length>3,m=e.length>4,g=r&&n>1,b=r&&n>2,_=n>3,T=64,x=Me(u),v=[{type:12,data:l},{type:12,data:x},{type:12,data:u},{type:1,data:t.epsilon}],I=k=>{let M=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[D("x",e[0].dataType,e[0].dims,x),D("skip",e[1].dataType,e[1].dims,x),D("gamma",e[2].dataType,e[2].dims,x)];p&&A.push(D("beta",e[3].dataType,e[3].dims,x)),m&&A.push(D("bias",e[4].dataType,e[4].dims,x)),A.push(ee("output",e[0].dataType,s,x)),g&&A.push(ee("mean_output",1,d)),b&&A.push(ee("inv_std_output",1,d)),_&&A.push(ee("input_skip_bias_sum",e[0].dataType,s,x));let S=Oe(e[0].dataType),P=Oe(1,x);return`

      ${k.registerUniforms(M).declareVariables(...A)}
      var<workgroup> sum_shared : array<${P}, ${T}>;
      var<workgroup> sum_squared_shared : array<${P}, ${T}>;

      ${k.mainStart([T,1,1])}
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
          let bias_value = ${m?"bias[offset1d + i]":S+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Kn(S,x,"value")};
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
        let mean = ${un("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${un("square_sum",x)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${S}(mean)`}) *
            ${S}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},E=[{dims:s,dataType:e[0].dataType}];return n>1&&E.push({dims:d,dataType:1}),n>2&&E.push({dims:d,dataType:1}),n>3&&E.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${g};${b};${_}`,inputDependencies:e.map((k,M)=>"type")},getShaderSource:I,getRunData:()=>({outputs:E,dispatchGroup:{x:Math.ceil(l/u)},programUniforms:v})}},hb=(e,t)=>{Vf(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Hf(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Gf,yr,jf,No,Kf,Xf,mb,gb,S2=q(()=>{oe(),ce(),Ae(),de(),Gf=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},yr=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},jf=(e,t)=>{if(e.length>1){let n=yr(e,1),r=yr(e,2),i=yr(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),ve({starts:n,ends:r,axes:i})}else return t},No=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Kf=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${te("uniforms.input_shape","i",n.length)};
            let steps_i = ${te("uniforms.steps","i",n.length)};
            let signs_i = ${te("uniforms.signs","i",n.length)};
            let starts_i = ${te("uniforms.starts","i",n.length)};
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
      }`,Xf=(e,t)=>{let n=e[0].dims,r=B.size(n),i=t.axes.length>0?B.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=yr(e,4);a.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let o=t.starts.map((x,v)=>No(x,v,n,i,a)),s=t.ends.map((x,v)=>No(x,v,n,i,a));if(i.length!==o.length||i.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==n.length)for(let x=0;x<n.length;++x)i.includes(x)||(o.splice(x,0,0),s.splice(x,0,n[x]),a.splice(x,0,1));let l=a.map(x=>Math.sign(x));a.forEach((x,v,I)=>{if(x<0){let E=(s[v]-o[v])/x,k=o[v],M=k+E*a[v];o[v]=M,s[v]=k,I[v]=-x}});let u=n.slice(0);i.forEach((x,v)=>{u[x]=Math.ceil((s[x]-o[x])/a[x])});let d={dims:u,dataType:e[0].dataType},p=ee("output",e[0].dataType,u.length),m=D("input",e[0].dataType,e[0].dims.length),g=B.size(u),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],_=[{type:12,data:g},{type:12,data:o},{type:6,data:l},{type:12,data:a},...ne(e[0].dims,u)],T=x=>`
      ${x.registerUniforms(b).declareVariables(m,p)}
        ${Kf(m,p,n)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:_})}},mb=(e,t)=>{Gf(e.inputs,t);let n=jf(e.inputs,t);e.compute(Xf(e.inputs,n),{inputs:[0]})},gb=e=>{let t=e.starts,n=e.ends,r=e.axes;return ve({starts:t,ends:n,axes:r})}}),Yf,Qf,bb,yb,k2=q(()=>{oe(),ce(),Ae(),cn(),de(),Yf=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Qf=(e,t)=>{let n=e.inputs[0],r=n.dims,i=B.size(r),a=r.length,o=B.normalizeAxis(t.axis,a),s=o<r.length-1,l,u=[];s?(u=Array.from({length:a},(A,S)=>S),u[o]=a-1,u[a-1]=o,l=e.compute(ut(n,u),{inputs:[n],outputs:[-1]})[0]):l=n;let d=l.dims,p=d[a-1],m=i/p,g=Me(p),b=p/g,_=64;m===1&&(_=256);let T=(A,S)=>S===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:S===2?`max(${A}.x, ${A}.y)`:S===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,x=D("x",l.dataType,l.dims,g),v=ee("result",l.dataType,l.dims,g),I=x.type.value,E=Oe(l.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,k=A=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables(x,v)}
      ${A.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${E}
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
          rowMaxShared = ${I}(${T("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
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
          rowSumShared = ${I}(${un("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,M=e.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:b}]}),getShaderSource:k},{inputs:[l],outputs:[s?-1:0]})[0];s&&e.compute(ut(M,u),{inputs:[M]})},bb=(e,t)=>{Yf(e.inputs),Qf(e,t)},yb=e=>ve({axis:e.axis})}),Po,Zf,Jf,eh,wb,C2=q(()=>{oe(),ce(),de(),Po=e=>Array.from(e.getBigInt64Array(),Number),Zf=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Po(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jf=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},eh=(e,t)=>{let n=e[0].dims,r=t??Po(e[1]),i=Jf(n,r),a=B.size(i),o=e[0].dataType,s=D("input",o,n.length),l=ee("output",o,i.length),u=d=>`
      const inputShape = ${s.indices(...n)};
      ${d.registerUniform("output_size","u32").declareVariables(s,l)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ne(e[0].dims,i)]}),getShaderSource:u}},wb=e=>{Zf(e.inputs),e.compute(eh(e.inputs),{inputs:[0]})}}),th,nh,_b,T2=q(()=>{oe(),ce(),de(),th=(e,t,n,r,i)=>{let a=ee("output_data",i,n.length,4),o=D("a_data",t[1].dataType,t[1].dims.length,4),s=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),u,d=(p,m,g)=>`select(${m}, ${p}, ${g})`;if(!r)u=a.setByOffset("global_idx",d(o.getByOffset("global_idx"),s.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let p=(m,g,b="")=>{let _=`a_data[index_a${g}][component_a${g}]`,T=`b_data[index_b${g}][component_b${g}]`,x=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
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
            ${m}[${g}] = ${b}(${d(_,T,x)});
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
      }`},nh=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(B.areEqual(t,n)&&B.areEqual(n,r)),o=t,s=B.size(t);if(a){let u=Jn.calcShape(Jn.calcShape(t,n,!1),r,!1);if(!u)throw new Error("Can't perform where op on the given tensors");o=u,s=B.size(o)}let l=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:u=>th(u,e,o,a,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:l},...ne(r,t,n,o)]})}},_b=e=>{e.compute(nh(e.inputs))}}),xb,E2=q(()=>{Wx(),Gs(),qx(),Vx(),Hx(),Gx(),jx(),Zx(),e2(),t2(),n2(),r2(),i2(),a2(),o2(),s2(),l2(),u2(),c2(),d2(),p2(),f2(),h2(),m2(),g2(),F0(),b2(),y2(),w2(),_2(),x2(),Hs(),v2(),H0(),$2(),S2(),k2(),q0(),C2(),cn(),js(),T2(),xb=new Map([["Abs",[hg]],["Acos",[mg]],["Acosh",[gg]],["Add",[Yg]],["ArgMax",[cg,as]],["ArgMin",[ug,as]],["Asin",[bg]],["Asinh",[yg]],["Atan",[wg]],["Atanh",[_g]],["Attention",[dg]],["AveragePool",[eb,J0]],["BatchNormalization",[pg]],["BiasAdd",[fg]],["BiasSplitGelu",[Xg]],["Cast",[vg,xg]],["Ceil",[Sg]],["Clip",[$g]],["Concat",[o0,s0]],["Conv",[ds,cs]],["ConvTranspose",[b0,g0]],["Cos",[kg]],["Cosh",[Cg]],["CumSum",[y0,w0]],["DepthToSpace",[_0,x0]],["DequantizeLinear",[sb,lb]],["Div",[Qg]],["Einsum",[v0,$0]],["Elu",[Tg,Cr]],["Equal",[Zg]],["Erf",[Eg]],["Exp",[Ig]],["Expand",[S0]],["FastGelu",[k0]],["Floor",[Mg]],["FusedConv",[ds,cs]],["Gather",[T0,C0]],["GatherElements",[N0,A0]],["GatherBlockQuantized",[M0,z0]],["GatherND",[E0,I0]],["Gelu",[zg]],["Gemm",[R0,P0]],["GlobalAveragePool",[nb,tb]],["GlobalMaxPool",[ob,ab]],["Greater",[n0]],["GreaterOrEqual",[i0]],["GridSample",[O0,B0]],["GroupQueryAttention",[G0]],["HardSigmoid",[Dg,Lg]],["InstanceNormalization",[j0]],["LayerNormalization",[K0]],["LeakyRelu",[Ag,Cr]],["Less",[r0]],["LessOrEqual",[a0]],["Log",[jg]],["MatMul",[X0]],["MatMulNBits",[Y0,Q0]],["MaxPool",[rb,ib]],["Mul",[Jg]],["MultiHeadAttention",[D0,L0]],["Neg",[Pg]],["Not",[Ng]],["Pad",[Z0]],["Pow",[e0]],["QuickGelu",[Kg,Cr]],["Range",[ub]],["Reciprocal",[Rg]],["ReduceMin",[ig]],["ReduceMean",[Jm]],["ReduceMax",[rg]],["ReduceSum",[og]],["ReduceProd",[ag]],["ReduceL1",[eg]],["ReduceL2",[tg]],["ReduceLogSum",[lg]],["ReduceLogSumExp",[ng]],["ReduceSumSquare",[sg]],["Relu",[Og]],["Resize",[pb,fb]],["RotaryEmbedding",[V0]],["ScatterND",[db,cb]],["Sigmoid",[Bg]],["Sin",[Fg]],["Sinh",[Ug]],["Slice",[mb,gb]],["SkipLayerNormalization",[hb]],["Split",[U0,W0]],["Sqrt",[Wg]],["Softmax",[bb,yb]],["Sub",[t0]],["Tan",[qg]],["Tanh",[Vg]],["ThresholdedRelu",[Gg,Cr]],["Tile",[wb]],["Transpose",[Um,Wm]],["Where",[_b]]])}),vb,I2=q(()=>{ft(),Xt(),de(),vb=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){Pt(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let s=[];for(let u of t)s.push({binding:s.length,resource:{buffer:u.buffer}});for(let u of n)s.push({binding:s.length,resource:{buffer:u.buffer}});i&&s.push({binding:s.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let u={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(u)}o.setPipeline(e.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),St(e.programInfo.name)}dispose(){}build(e,t){Pt(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(u=>{n.features.has(u.feature)&&r.push(`enable ${u.extension};`)});let i=Fm(t,this.backend.device.limits),a=e.getShaderSource(i),o=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,s=n.createShaderModule({code:o,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let l=n.createComputePipeline({compute:{module:s,entryPoint:"main"},layout:"auto",label:e.name});return St(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,o=Math.ceil(Math.sqrt(a));if(o>i){if(o=Math.ceil(Math.cbrt(a)),o>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),$b={};rr($b,{WebGpuBackend:()=>Sb});var rh,ih,ah,Sb,M2=q(()=>{ft(),oe(),Xt(),Rm(),Fx(),E2(),I2(),rh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${i}`);break}case"rank":{let a=e[r].dims.length;n.push(`${i};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},ih=(e,t,n)=>{var i,a;let r=e.name;return(i=e.shaderCache)!=null&&i.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${rh(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,r},ah=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Sb=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>t.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new ah(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Lm(this),this.programManager=new vb(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Us(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Pt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var r;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=n[i],o=a.kernelId,s=this.kernels.get(o),l=s.kernelType,u=s.kernelName,d=a.programName,p=a.inputTensorViews,m=a.outputTensorViews,g=t[i*2],b=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),T=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if((r=this.env.webgpu.profiling)!=null&&r.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(x=>({dims:x.dims,dataType:qt(x.dataType)})),outputsMetadata:m.map(x=>({dims:x.dims,dataType:qt(x.dataType)})),kernelId:o,kernelType:l,kernelName:u,programName:d,startTime:_,endTime:T});else{let x="";p.forEach((I,E)=>{x+=`input[${E}]: [${I.dims}] | ${qt(I.dataType)}, `});let v="";m.forEach((I,E)=>{v+=`output[${E}]: [${I.dims}] | ${qt(I.dataType)}, `}),console.log(`[profiling] kernel "${o}|${l}|${u}|${d}" ${x}${v}start time: ${_} ns, execution time: ${T-_} ns`)}Ri("GPU",`${d}::${g}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),St()}run(e,t,n,r,i,a){Pt(e.name);let o=[];for(let v=0;v<t.length;++v){let I=t[v].data;if(I===0)continue;let E=this.gpuDataManager.get(I);if(!E)throw new Error(`no GPU data for input: ${I}`);o.push(E)}let{outputs:s,dispatchGroup:l,programUniforms:u}=e.getRunData(t),d=n.length===0?s.map((v,I)=>I):n;if(d.length!==s.length)throw new Error(`Output size ${d.length} must be equal to ${s.length}.`);let p=[],m=[];for(let v=0;v<s.length;++v){if(!Number.isInteger(d[v])||d[v]<-3||d[v]>=a)throw new Error(`Invalid output index: ${d[v]}`);if(d[v]===-3)continue;let I=d[v]===-1,E=d[v]===-2,k=I||E?i(s[v].dataType,s[v].dims):r(d[v],s[v].dataType,s[v].dims);if(p.push(k),k.data===0)continue;let M=this.gpuDataManager.get(k.data);if(!M)throw new Error(`no GPU data for output: ${k.data}`);if(I&&this.temporaryData.push(M),E){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(M)}m.push(M)}if(o.length!==t.length||m.length!==p.length){if(m.length===0)return St(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(u){let v=0,I=[];u.forEach(A=>{let S=typeof A.data=="number"?[A.data]:A.data;if(S.length===0)return;let P=A.type===10?2:4,O,W;A.type===10?(W=S.length>4?16:S.length>2?8:S.length*P,O=S.length>4?16:P*S.length):(W=S.length<=2?S.length*P:16,O=16),v=Math.ceil(v/W)*W,I.push(v);let G=A.type===10?8:4;v+=S.length>4?Math.ceil(S.length/G)*O:S.length*P});let E=16;v=Math.ceil(v/E)*E;let k=new ArrayBuffer(v);u.forEach((A,S)=>{let P=I[S],O=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(k,P,O.length).set(O);else if(A.type===12)new Uint32Array(k,P,O.length).set(O);else if(A.type===10)new Uint16Array(k,P,O.length).set(O);else if(A.type===1)new Float32Array(k,P,O.length).set(O);else throw new Error(`Unsupported uniform type: ${qt(A.type)}`)});let M=this.gpuDataManager.create(v,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(M.buffer,0,k,0,v),this.gpuDataManager.release(M.id),g={offset:0,size:v,buffer:M.buffer}}let b=this.programManager.normalizeDispatchGroupSize(l),_=b[1]===1&&b[2]===1,T=ih(e,t,_),x=this.programManager.getArtifact(T);if(x||(x=this.programManager.build(e,b),this.programManager.setArtifact(T,x),ye("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),u&&x.uniformVariablesInfo){if(u.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${u.length} in program "${x.programInfo.name}".`);for(let v=0;v<u.length;v++){let I=u[v],E=I.type,k=typeof I.data=="number"?1:I.data.length,[M,A]=x.uniformVariablesInfo[v];if(E!==M||k!==A)throw new Error(`Uniform variable ${v} mismatch: expect type ${M} with size ${A}, got type ${E} with size ${k} in program "${x.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${b[0]}x${b[1]}x${b[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let v={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(v),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(v)}return this.programManager.run(x,o,m,b,g),St(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=xb.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,o=r.kernelEntry,s=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&(s[1]=s[0](s[1]),s[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(t,s[1]),0}catch(u){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${u}`)),1}finally{l&&n.push(this.device.popErrorScope().then(u=>u?`GPU validation error for kernel "[${i}] ${a}": ${u.message}`:null));for(let u of this.temporaryData)this.gpuDataManager.release(u.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),o=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[o,n]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await ns(this,e,t);return Ws(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),kb={};rr(kb,{init:()=>Cb});var vi,oh,Cb,z2=q(()=>{oe(),Xt(),ce(),Dx(),vi=class Tb{constructor(t,n,r,i){this.module=t,this.dataType=n,this.data=r,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new Tb(this.module,this.dataType,this.data,t)}},oh=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*i++,a));let o=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,"*")),this.customDataSize=Number(e.getValue(r*i++,a));let s=[];for(let l=0;l<o;l++){let u=Number(e.getValue(r*i++,a)),d=Number(e.getValue(r*i++,"*")),p=Number(e.getValue(r*i++,a)),m=[];for(let g=0;g<p;g++)m.push(Number(e.getValue(r*i++,a)));s.push(new vi(e,u,d,m))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var o;let n=((o=t==null?void 0:t.inputs)==null?void 0:o.map(s=>typeof s=="number"?this.inputs[s]:s))??this.inputs,r=(t==null?void 0:t.outputs)??[],i=(s,l,u)=>new vi(this.module,l,this.output(s,u),u),a=(s,l)=>{let u=vn(s,l);if(!u)throw new Error(`Unsupported data type: ${s}`);let d=u>0?this.backend.gpuDataManager.create(u).id:0;return new vi(this.module,s,d,l)};return this.backend.run(e,n,r,i,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=r===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let o=0;o<t.length;o++)this.module.setValue(a+r*(o+1),t[o],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},Cb=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(M2(),Lr($b)).WebGpuBackend,o=new a;await o.initialize(n,r),i("webgpu",[o,s=>o.alloc(Number(s)),s=>o.free(s),(s,l,u,d=!1)=>{if(d)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(l)}, size=${Number(u)}`),o.memcpy(Number(s),Number(l));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(l)}, size=${Number(u)}`);let p=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));o.upload(Number(l),p)}},async(s,l,u)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${l}, size=${u}`),await o.download(Number(s),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+u)>>>0))},(s,l,u)=>o.createKernel(s,Number(l),u,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),s=>o.releaseKernel(s),(s,l,u,d)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${l}`);let p=new oh(t,o,Number(l));return o.computeKernel(Number(s),p,d)},()=>o.captureBegin(),()=>o.captureEnd(),()=>o.replay()])}else{let a=new Bm(n);i("webnn",[a,()=>a.reserveTensorId(),o=>a.releaseTensorId(o),async(o,s,l,u,d)=>a.ensureTensor(o,s,l,u,d),(o,s)=>{a.uploadTensor(o,s)},async(o,s)=>a.downloadTensor(o,s),(o,s)=>a.registerMLContext(o,s),!!n.trace])}}}),sh,Js,el,an,lh,Ro,Wi,tl,nl,Oo,rl,il,al,Eb=q(()=>{ft(),Ox(),Bx(),oe(),Bn(),Bs(),zm(),sh=(e,t)=>{Ce()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},Js=async e=>{sh(e.wasm.numThreads,Bi(e.logLevel))},el=async(e,t)=>{var r,i;(i=(r=Ce()).asyncInit)==null||i.call(r);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let o=e.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(z2(),Lr(kb)).init;t==="webgpu"&&await a("webgpu",Ce(),e,n),t==="webnn"&&await a("webnn",Ce(),e)}},an=new Map,lh=e=>{let t=Ce(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,i,i+r)!==0&&$e("Can't get session input/output count.");let a=r===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(n)}},Ro=(e,t)=>{let n=Ce(),r=n.stackSave(),i=0;try{let a=n.PTR_SIZE,o=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,o,o+a)!==0&&$e("Can't get session input/output metadata.");let s=Number(n.getValue(o,"*"));i=Number(n.getValue(o+a,"*"));let l=n.HEAP32[i/4];if(l===0)return[s,0];let u=n.HEAPU32[i/4+1],d=[];for(let p=0;p<u;p++){let m=Number(n.getValue(i+8+p*a,"*"));d.push(m!==0?n.UTF8ToString(m):Number(n.getValue(i+8+(p+u)*a,"*")))}return[s,l,d]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},Wi=e=>{let t=Ce(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},tl=async(e,t)=>{var p,m,g,b;let n,r,i=Ce();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Wi(e);let a=0,o=0,s=0,l=[],u=[],d=[];try{if([o,l]=await Mm(t),(t==null?void 0:t.externalData)&&i.mountExternalData){let S=[];for(let P of t.externalData){let O=typeof P=="string"?P:P.path;S.push(Fs(typeof P=="string"?P:P.data).then(W=>{i.mountExternalData(O,W)}))}await Promise.all(S)}for(let S of(t==null?void 0:t.executionProviders)??[])if((typeof S=="string"?S:S.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof S!="string"){let P=S,O=P==null?void 0:P.context,W=P==null?void 0:P.gpuDevice,G=P==null?void 0:P.deviceType,X=P==null?void 0:P.powerPreference;O?i.currentContext=O:W?i.currentContext=await i.webnnCreateMLContext(W):i.currentContext=await i.webnnCreateMLContext({deviceType:G,powerPreference:X})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,o),(p=i.webgpuOnCreateSession)==null||p.call(i,a),a===0&&$e("Can't create a session."),(m=i.jsepOnCreateSession)==null||m.call(i),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[_,T]=lh(a),x=!!(t!=null&&t.enableGraphCapture),v=[],I=[],E=[],k=[],M=[];for(let S=0;S<_;S++){let[P,O,W]=Ro(a,S);P===0&&$e("Can't get an input name."),u.push(P);let G=i.UTF8ToString(P);v.push(G),E.push(O===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:qt(O),shape:W})}for(let S=0;S<T;S++){let[P,O,W]=Ro(a,S+_);P===0&&$e("Can't get an output name."),d.push(P);let G=i.UTF8ToString(P);I.push(G),k.push(O===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:qt(O),shape:W});{if(x&&(t==null?void 0:t.preferredOutputLocation)===void 0){M.push("gpu-buffer");continue}let X=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((g=t==null?void 0:t.preferredOutputLocation)==null?void 0:g[G])??"cpu",R=i.webnnIsGraphOutput;if(X==="cpu"&&R&&R(a,G)){M.push("ml-tensor-cpu-output");continue}if(X!=="cpu"&&X!=="cpu-pinned"&&X!=="gpu-buffer"&&X!=="ml-tensor")throw new Error(`Not supported preferred output location: ${X}.`);if(x&&X!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${X}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);M.push(X)}}let A=null;return M.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(s=i._OrtCreateBinding(a),s===0&&$e("Can't create IO binding."),A={handle:s,outputPreferredLocations:M,outputPreferredLocationsEncoded:M.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>es(S))}),an.set(a,[a,u,d,A,x,!1]),[a,v,I,E,k]}catch(_){throw u.forEach(T=>i._OrtFree(T)),d.forEach(T=>i._OrtFree(T)),s!==0&&i._OrtReleaseBinding(s)!==0&&$e("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&$e("Can't release session."),_}finally{i._free(n),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&$e("Can't release session options."),l.forEach(_=>i._free(_)),(b=i.unmountExternalData)==null||b.call(i)}},nl=e=>{var l,u,d;let t=Ce(),n=an.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,o,s]=n;o&&(s&&t._OrtClearBoundOutputs(o.handle)!==0&&$e("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&$e("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(u=t.webnnOnReleaseSession)==null||u.call(t,e),(d=t.webgpuOnReleaseSession)==null||d.call(t,e),i.forEach(p=>t._OrtFree(p)),a.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(r)!==0&&$e("Can't release session."),an.delete(e)},Oo=async(e,t,n,r,i,a,o=!1)=>{if(!e){t.push(0);return}let s=Ce(),l=s.PTR_SIZE,u=e[0],d=e[1],p=e[3],m=p,g,b;if(u==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(o&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let x=e[2].gpuBuffer;b=vn(xn(u),d);{let v=s.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=v(r,a,x,b)}}else if(p==="ml-tensor"){let x=e[2].mlTensor;b=vn(xn(u),d);let v=s.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=v(r,x,xn(u),d)}else{let x=e[2];if(Array.isArray(x)){b=l*x.length,g=s._malloc(b),n.push(g);for(let v=0;v<x.length;v++){if(typeof x[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);s.setValue(g+v*l,xt(x[v],n),"*")}}else{let v=s.webnnIsGraphInput,I=s.webnnIsGraphOutput;if(u!=="string"&&v&&I){let E=s.UTF8ToString(i);if(v(r,E)||I(r,E)){let k=xn(u);b=vn(k,d),m="ml-tensor";let M=s.webnnCreateTemporaryTensor,A=s.webnnUploadTensor;if(!M||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let S=await M(r,k,d);A(S,new Uint8Array(x.buffer,x.byteOffset,x.byteLength)),g=S}else b=x.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,b),g)}else b=x.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,b),g)}}let _=s.stackSave(),T=s.stackAlloc(4*d.length);try{d.forEach((v,I)=>s.setValue(T+I*l,v,l===4?"i32":"i64"));let x=s._OrtCreateTensor(xn(u),g,b,T,d.length,es(m));x===0&&$e(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(x)}finally{s.stackRestore(_)}},rl=async(e,t,n,r,i,a)=>{var G,X,R,Y;let o=Ce(),s=o.PTR_SIZE,l=an.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let u=l[0],d=l[1],p=l[2],m=l[3],g=l[4],b=l[5],_=t.length,T=r.length,x=0,v=[],I=[],E=[],k=[],M=[],A=o.stackSave(),S=o.stackAlloc(_*s),P=o.stackAlloc(_*s),O=o.stackAlloc(T*s),W=o.stackAlloc(T*s);try{[x,v]=Im(a),Cn("wasm prepareInputOutputTensor");for(let F=0;F<_;F++)await Oo(n[F],I,k,e,d[t[F]],t[F],g);for(let F=0;F<T;F++)await Oo(i[F],E,k,e,p[r[F]],_+r[F],g);Tn("wasm prepareInputOutputTensor");for(let F=0;F<_;F++)o.setValue(S+F*s,I[F],"*"),o.setValue(P+F*s,d[t[F]],"*");for(let F=0;F<T;F++)o.setValue(O+F*s,E[F],"*"),o.setValue(W+F*s,p[r[F]],"*");if(m&&!b){let{handle:F,outputPreferredLocations:re,outputPreferredLocationsEncoded:U}=m;if(d.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${d.length}).`);Cn("wasm bindInputsOutputs");for(let j=0;j<_;j++){let Q=t[j];await o._OrtBindInput(F,d[Q],I[j])!==0&&$e(`Can't bind input[${j}] for session=${e}.`)}for(let j=0;j<T;j++){let Q=r[j];(G=i[j])!=null&&G[3]?(M.push(E[j]),o._OrtBindOutput(F,p[Q],E[j],0)!==0&&$e(`Can't bind pre-allocated output[${j}] for session=${e}.`)):o._OrtBindOutput(F,p[Q],0,U[Q])!==0&&$e(`Can't bind output[${j}] to ${re[j]} for session=${e}.`)}Tn("wasm bindInputsOutputs"),an.set(e,[u,d,p,m,g,!0])}(X=o.jsepOnRunStart)==null||X.call(o,u),(R=o.webnnOnRunStart)==null||R.call(o,u);let Z;m?Z=await o._OrtRunWithBinding(u,m.handle,T,O,x):Z=await o._OrtRun(u,P,S,_,W,T,O,x),Z!==0&&$e("failed to call OrtRun().");let V=[],ie=[];Cn("wasm ProcessOutputTensor");for(let F=0;F<T;F++){let re=Number(o.getValue(O+F*s,"*"));if(re===E[F]||M.includes(E[F])){V.push(i[F]),re!==E[F]&&o._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.");continue}let U=o.stackSave(),j=o.stackAlloc(4*s),Q=!1,H,_e=0;try{o._OrtGetTensorData(re,j,j+s,j+2*s,j+3*s)!==0&&$e(`Can't access output tensor data on index ${F}.`);let Ke=s===4?"i32":"i64",Ie=Number(o.getValue(j,Ke));_e=o.getValue(j+s,"*");let Le=o.getValue(j+s*2,"*"),Ze=Number(o.getValue(j+s*3,Ke)),rt=[];for(let Te=0;Te<Ze;Te++)rt.push(Number(o.getValue(Le+Te*s,Ke)));o._OrtFree(Le)!==0&&$e("Can't free memory for tensor dims.");let Je=rt.reduce((Te,le)=>Te*le,1);H=qt(Ie);let Qt=m==null?void 0:m.outputPreferredLocations[r[F]];if(H==="string"){if(Qt==="gpu-buffer"||Qt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let le=0;le<Je;le++){let it=o.getValue(_e+le*s,"*"),Zr=o.getValue(_e+(le+1)*s,"*"),or=le===Je-1?void 0:Zr-it;Te.push(o.UTF8ToString(it,or))}V.push([H,rt,Te,"cpu"])}else if(Qt==="gpu-buffer"&&Je>0){let Te=o.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let le=Te(_e),it=vn(Ie,Je);if(it===void 0||!Ls(H))throw new Error(`Unsupported data type: ${H}`);Q=!0,V.push([H,rt,{gpuBuffer:le,download:o.jsepCreateDownloader(le,it,H),dispose:()=>{o._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(Qt==="ml-tensor"&&Je>0){let Te=o.webnnEnsureTensor,le=o.webnnIsGraphInputOutputTypeSupported;if(!Te||!le)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(vn(Ie,Je)===void 0||!Ds(H))throw new Error(`Unsupported data type: ${H}`);if(!le(e,H,!1))throw new Error(`preferredLocation "ml-tensor" for ${H} output is not supported by current WebNN Context.`);let it=await Te(e,_e,Ie,rt,!1);Q=!0,V.push([H,rt,{mlTensor:it,download:o.webnnCreateMLTensorDownloader(_e,H),dispose:()=>{o.webnnReleaseTensorId(_e),o._OrtReleaseTensor(re)}},"ml-tensor"])}else if(Qt==="ml-tensor-cpu-output"&&Je>0){let Te=o.webnnCreateMLTensorDownloader(_e,H)(),le=V.length;Q=!0,ie.push((async()=>{let it=[le,await Te];return o.webnnReleaseTensorId(_e),o._OrtReleaseTensor(re),it})()),V.push([H,rt,[],"cpu"])}else{let Te=aa(H),le=new Te(Je);new Uint8Array(le.buffer,le.byteOffset,le.byteLength).set(o.HEAPU8.subarray(_e,_e+le.byteLength)),V.push([H,rt,le,"cpu"])}}finally{o.stackRestore(U),H==="string"&&_e&&o._free(_e),Q||o._OrtReleaseTensor(re)}}m&&!g&&(o._OrtClearBoundOutputs(m.handle)!==0&&$e("Can't clear bound outputs."),an.set(e,[u,d,p,m,g,!1]));for(let[F,re]of await Promise.all(ie))V[F][2]=re;return Tn("wasm ProcessOutputTensor"),V}finally{(Y=o.webnnOnRunEnd)==null||Y.call(o,u),o.stackRestore(A),I.forEach(Z=>o._OrtReleaseTensor(Z)),E.forEach(Z=>o._OrtReleaseTensor(Z)),k.forEach(Z=>o._free(Z)),x!==0&&o._OrtReleaseRunOptions(x),v.forEach(Z=>o._free(Z))}},il=e=>{let t=Ce(),n=an.get(e);if(!n)throw new Error("invalid session id");let r=n[0],i=t._OrtEndProfiling(r);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},al=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),on,et,Wn,wr,_r,$i,Bo,Si,yn,wn,uh,Ib,Mb,zb,Ab,Nb,Pb,Rb,Ob=q(()=>{ft(),Eb(),Bn(),Rs(),on=()=>!!Se.wasm.proxy&&typeof document<"u",Wn=!1,wr=!1,_r=!1,Si=new Map,yn=(e,t)=>{let n=Si.get(e);n?n.push(t):Si.set(e,[t])},wn=()=>{if(Wn||!wr||_r||!et)throw new Error("worker not ready")},uh=e=>{switch(e.data.type){case"init-wasm":Wn=!1,e.data.err?(_r=!0,Bo[1](e.data.err)):(wr=!0,Bo[0]()),$i&&(URL.revokeObjectURL($i),$i=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Si.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Ib=async()=>{if(!wr){if(Wn)throw new Error("multiple calls to 'initWasm()' detected.");if(_r)throw new Error("previous call to 'initWasm()' failed.");if(Wn=!0,on())return new Promise((e,t)=>{et==null||et.terminate(),Tm().then(([n,r])=>{try{et=r,et.onerror=a=>t(a),et.onmessage=uh,Bo=[e,t];let i={type:"init-wasm",in:Se};!i.in.wasm.wasmPaths&&(n||Jo)&&(i.in.wasm.wasmPaths={wasm:new URL(""+new URL("assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href,import.meta.url).href}),et.postMessage(i),$i=n}catch(i){t(i)}},t)});try{await Os(Se.wasm),await Js(Se),wr=!0}catch(e){throw _r=!0,e}finally{Wn=!1}}},Mb=async e=>{if(on())return wn(),new Promise((t,n)=>{yn("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:Se}};et.postMessage(r)});await el(Se,e)},zb=async e=>on()?(wn(),new Promise((t,n)=>{yn("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};et.postMessage(r,[e.buffer])})):Wi(e),Ab=async(e,t)=>{if(on()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return wn(),new Promise((n,r)=>{yn("create",[n,r]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),et.postMessage(i,a)})}else return tl(e,t)},Nb=async e=>{if(on())return wn(),new Promise((t,n)=>{yn("release",[t,n]);let r={type:"release",in:e};et.postMessage(r)});nl(e)},Pb=async(e,t,n,r,i,a)=>{if(on()){if(n.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return wn(),new Promise((o,s)=>{yn("run",[o,s]);let l=n,u={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};et.postMessage(u,al(l))})}else return rl(e,t,n,r,i,a)},Rb=async e=>{if(on())return wn(),new Promise((t,n)=>{yn("end-profiling",[t,n]);let r={type:"end-profiling",in:e};et.postMessage(r)});il(e)}}),Lo,ch,Bb,A2=q(()=>{ft(),Ob(),oe(),Ps(),zm(),Lo=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ch=e=>{switch(e[3]){case"cpu":return new $t(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ls(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return $t.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case"ml-tensor":{let t=e[0];if(!Ds(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return $t.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},Bb=class{async fetchModelAndCopyToWasmMemory(e){return zb(await Fs(e))}async loadModel(e,t){Pt();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Ab(n,t),St()}async dispose(){return Nb(this.sessionId)}async run(e,t,n){Pt();let r=[],i=[];Object.entries(e).forEach(p=>{let m=p[0],g=p[1],b=this.inputNames.indexOf(m);if(b===-1)throw new Error(`invalid input '${m}'`);r.push(g),i.push(b)});let a=[],o=[];Object.entries(t).forEach(p=>{let m=p[0],g=p[1],b=this.outputNames.indexOf(m);if(b===-1)throw new Error(`invalid output '${m}'`);a.push(g),o.push(b)});let s=r.map((p,m)=>Lo(p,()=>`input "${this.inputNames[i[m]]}"`)),l=a.map((p,m)=>p?Lo(p,()=>`output "${this.outputNames[o[m]]}"`):null),u=await Pb(this.sessionId,i,s,o,l,n),d={};for(let p=0;p<u.length;p++)d[this.outputNames[o[p]]]=a[p]??ch(u[p]);return St(),d}startProfiling(){}endProfiling(){Rb(this.sessionId)}}}),Lb={};rr(Lb,{OnnxruntimeWebAssemblyBackend:()=>hs,initializeFlags:()=>fs,wasmBackend:()=>Db});var fs,hs,Db,N2=q(()=>{ft(),Ob(),A2(),fs=()=>{(typeof Se.wasm.initTimeout!="number"||Se.wasm.initTimeout<0)&&(Se.wasm.initTimeout=0);let e=Se.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Se.wasm.simd=!1),typeof Se.wasm.proxy!="boolean"&&(Se.wasm.proxy=!1),typeof Se.wasm.trace!="boolean"&&(Se.wasm.trace=!1),typeof Se.wasm.numThreads!="number"||!Number.isInteger(Se.wasm.numThreads)||Se.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Se.wasm.numThreads=1;else{let t=typeof navigator>"u"?yx("node:os").cpus().length:navigator.hardwareConcurrency;Se.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},hs=class{async init(e){fs(),await Ib(),await Mb(e)}async createInferenceSessionHandler(e,t){let n=new Bb;return await n.loadModel(e,t),n}},Db=new hs});ft();ft();ft();var P2="1.26.0";{let e=(N2(),Lr(Lb)).wasmBackend;jn("webgpu",e,5),jn("webnn",e,5),jn("cpu",e,10),jn("wasm",e,10)}Object.defineProperty(Se.versions,"web",{value:P2,enumerable:!0});/**
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
 */function ht(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const $n=class $n{constructor(){Re(this,"customModelPaths",new Map);Re(this,"baseUrl","/models");Re(this,"webnnEnabled",!1);Re(this,"webnnDeviceType","gpu");Re(this,"webnnPowerPreference","default");Re(this,"webgpuEnabled",!1);Re(this,"webgpuPowerPreference","default");Re(this,"generalLoggingEnabled",!1);Re(this,"performanceLoggingEnabled",!1);Re(this,"onnxProfilingEnabled",!1);Re(this,"sessionCacheBypass",!1);Re(this,"modelCacheBypass",!1);this.initializeDefaultPaths()}static getInstance(){return $n.instance||($n.instance=new $n),$n.instance}initializeDefaultPaths(){this.customModelPaths.clear()}setCustomModelPath(t,n){this.customModelPaths.set(t,n),this.generalLoggingEnabled&&console.log(`Set custom model path for ${t}: ${n}`)}getCustomModelPath(t){return this.customModelPaths.get(t)}getAllModelPaths(){return new Map(this.customModelPaths)}hasCustomPath(t){const n=this.customModelPaths.get(t);return n!==void 0&&n!==""}resetToDefaults(){this.baseUrl="/models",this.customModelPaths.clear(),this.initializeDefaultPaths(),this.generalLoggingEnabled&&console.log("Reset all model paths to defaults")}removeCustomPath(t){this.customModelPaths.has(t)&&(this.customModelPaths.delete(t),this.generalLoggingEnabled&&console.log(`Removed custom path for ${t}`))}getAvailableModels(){return["u2net","u2netp","u2net_human_seg","u2net_cloth_seg","isnet-general-use","isnet-anime","silueta","u2net_custom"]}setBaseUrl(t){this.baseUrl=t,this.generalLoggingEnabled&&console.log(`Set base URL for models: ${t}`),this.initializeDefaultPaths()}getBaseUrl(){return this.baseUrl}enableWebNN(t){this.webnnEnabled=t,this.generalLoggingEnabled&&console.log(`WebNN support ${t?"enabled":"disabled"} globally`)}setWebNNDeviceType(t){this.webnnDeviceType=t,this.generalLoggingEnabled&&console.log(`WebNN device type set to: ${t}`)}setWebNNPowerPreference(t){this.webnnPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebNN power preference set to: ${t}`)}isWebNNEnabled(){return this.webnnEnabled}getWebNNDeviceType(){return this.webnnDeviceType}getWebNNPowerPreference(){return this.webnnPowerPreference}getWebNNConfig(){return{enabled:this.webnnEnabled,deviceType:this.webnnDeviceType,powerPreference:this.webnnPowerPreference}}resetWebNNSettings(){this.webnnEnabled=!1,this.webnnDeviceType="gpu",this.webnnPowerPreference="default",this.generalLoggingEnabled&&console.log("WebNN settings reset to defaults")}enableWebGPU(t){this.webgpuEnabled=t,this.generalLoggingEnabled&&console.log(`WebGPU support ${t?"enabled":"disabled"} globally`)}setWebGPUPowerPreference(t){this.webgpuPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebGPU power preference set to: ${t}`)}isWebGPUEnabled(){return this.webgpuEnabled}getWebGPUPowerPreference(){return this.webgpuPowerPreference}getWebGPUConfig(){return{enabled:this.webgpuEnabled,powerPreference:this.webgpuPowerPreference}}resetWebGPUSettings(){this.webgpuEnabled=!1,this.webgpuPowerPreference="default",this.generalLoggingEnabled&&console.log("WebGPU settings reset to defaults")}enableGeneralLogging(t){this.generalLoggingEnabled=t,this.generalLoggingEnabled&&console.log(`General logging ${t?"enabled":"disabled"}`)}enablePerformanceLogging(t){this.performanceLoggingEnabled=t,this.performanceLoggingEnabled&&console.log(`Performance logging ${t?"enabled":"disabled"}`)}isGeneralLoggingEnabled(){return this.generalLoggingEnabled}isPerformanceLoggingEnabled(){return this.performanceLoggingEnabled}enableONNXProfiling(t){this.onnxProfilingEnabled=t,this.onnxProfilingEnabled&&console.log(`ONNX profiling ${t?"enabled":"disabled"}`)}isONNXProfilingEnabled(){return this.onnxProfilingEnabled}getLoggingConfig(){return{generalLogging:this.generalLoggingEnabled,performanceLogging:this.performanceLoggingEnabled,onnxProfiling:this.onnxProfilingEnabled}}resetLoggingSettings(){this.generalLoggingEnabled=!1,this.performanceLoggingEnabled=!1,this.onnxProfilingEnabled=!1,this.generalLoggingEnabled&&console.log("Logging settings reset to defaults")}setSessionCacheBypass(t){this.sessionCacheBypass=t,this.generalLoggingEnabled&&console.log(`Session cache bypass ${t?"enabled":"disabled"} globally`)}setModelCacheBypass(t){this.modelCacheBypass=t,this.generalLoggingEnabled&&console.log(`Model cache bypass ${t?"enabled":"disabled"} globally`)}isSessionCacheBypassEnabled(){return this.sessionCacheBypass}isModelCacheBypassEnabled(){return this.modelCacheBypass}getCacheBypassConfig(){return{sessionCacheBypass:this.sessionCacheBypass,modelCacheBypass:this.modelCacheBypass}}resetCacheBypassSettings(){this.sessionCacheBypass=!1,this.modelCacheBypass=!1,this.generalLoggingEnabled&&console.log("Cache bypass settings reset to defaults")}};Re($n,"instance");let ms=$n;const ze=ms.getInstance();function be(...e){ze.isGeneralLoggingEnabled()&&console.log(...e)}function ol(...e){ze.isGeneralLoggingEnabled()&&console.log(...e)}function ue(...e){ze.isPerformanceLoggingEnabled()&&console.log(...e)}function Ve(...e){console.warn(...e)}function ir(...e){console.error(...e)}function Yt(e){return function(t,n,r){const i=r.value,a=n;return r.value=async function(...o){const s=performance.now();ue(`[${a}] Starting execution...`);try{const l=await i.apply(this,o),d=performance.now()-s;return ue(`[${a}] Completed successfully: ${d.toFixed(2)}ms`),l}catch(l){const d=performance.now()-s;throw ir(`[${a}] Failed after ${d.toFixed(2)}ms:`,l),l}},r}}function sl(e){return function(t,n,r){const i=r.value,a=n;return r.value=function(...o){const s=performance.now();ue(`[${a}] Starting execution...`);try{const l=i.apply(this,o),d=performance.now()-s;return ue(`[${a}] Completed successfully: ${d.toFixed(2)}ms`),l}catch(l){const d=performance.now()-s;throw ir(`[${a}] Failed after ${d.toFixed(2)}ms:`,l),l}},r}}function Do(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Failed to get context for canvas");return n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",e instanceof HTMLImageElement?(t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0)):(t.width=e.width,t.height=e.height,n.putImageData(e,0,0)),t}function R2(e){const t=performance.now();return be(`[fileToImage] Converting ${e instanceof File?e.name:"blob"} (${(e.size/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Image,a=URL.createObjectURL(e);i.onload=()=>{const o=performance.now()-t;ue(`[fileToImage] Image loaded: ${o.toFixed(2)}ms (${i.naturalWidth}x${i.naturalHeight})`),URL.revokeObjectURL(a),n(i)},i.onerror=o=>{const s=performance.now()-t;ir(`[fileToImage] Image load failed: ${s.toFixed(2)}ms`,o),URL.revokeObjectURL(a),r(o)},i.src=a})}function O2(e){const t=performance.now();return be(`[arrayBufferToImage] Converting buffer (${(e.byteLength/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Blob([e]),a=new Image,o=URL.createObjectURL(i);a.onload=()=>{const s=performance.now()-t;ue(`[arrayBufferToImage] Image loaded: ${s.toFixed(2)}ms (${a.naturalWidth}x${a.naturalHeight})`),URL.revokeObjectURL(o),n(a)},a.onerror=s=>{const l=performance.now()-t;ir(`[arrayBufferToImage] Image load failed: ${l.toFixed(2)}ms`,s),URL.revokeObjectURL(o),r(s)},a.src=o})}function dh(e,t="image/png"){const n=performance.now();return be(`[canvasToBlob] Converting ${e.width}x${e.height} canvas to ${t}...`),new Promise((r,i)=>{e.toBlob(a=>{const o=performance.now()-n;a?(ue(`[canvasToBlob] Conversion complete: ${o.toFixed(2)}ms (${(a.size/1024).toFixed(1)}KB)`),r(a)):(ir(`[canvasToBlob] Conversion failed: ${o.toFixed(2)}ms`),i(new Error("Failed to convert canvas to blob")))},t)})}function B2(e,t,n="input.1"){const r=performance.now(),i=document.createElement("canvas");i.width=t.size[0],i.height=t.size[1];const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for temp canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(e,0,0,t.size[0],t.size[1]);const o=performance.now(),l=a.getImageData(0,0,t.size[0],t.size[1]).data,u=t.size[0],d=t.size[1];let p=0;for(let v=0;v<l.length;v+=4){const I=l[v]/255,E=l[v+1]/255,k=l[v+2]/255;p=Math.max(p,I,E,k)}const m=Math.max(p,1e-6),g=performance.now(),b=new Float32Array(3*d*u);for(let v=0;v<d;v++)for(let I=0;I<u;I++){const E=(v*u+I)*4,k=l[E]/255,M=l[E+1]/255,A=l[E+2]/255,S=k/m,P=M/m,O=A/m,W=(S-t.mean[0])/t.std[0],G=(P-t.mean[1])/t.std[1],X=(O-t.mean[2])/t.std[2];b[v*u+I]=W,b[d*u+v*u+I]=G,b[2*d*u+v*u+I]=X}const _=performance.now(),T=new $t("float32",b,[1,3,d,u]),x=performance.now();return ue(`[normalizeImage] Performance:
    - Resize: ${(o-r).toFixed(2)}ms
    - Max find: ${(g-o).toFixed(2)}ms
    - Normalize: ${(_-g).toFixed(2)}ms
    - Tensor: ${(x-_).toFixed(2)}ms
    - Total: ${(x-r).toFixed(2)}ms
    - Max value: ${p.toFixed(6)}, Divisor: ${m.toFixed(6)}`),{[n]:T}}function L2(e,t=[1,1,320,320]){const[,,n,r]=t,i=performance.now(),a=e.slice(0,n*r);e.length!==n*r&&Ve("[normalizeMask] Mask length does not match output shape",{maskLength:e.length,outputShape:`${n}x${r}=${n*r}`});const o=performance.now()-i;ue(`[processModelOutput] Data extraction: ${o.toFixed(2)}ms`);const s=performance.now();let l=a[0],u=a[0];for(let b=1;b<a.length;b++)a[b]<l&&(l=a[b]),a[b]>u&&(u=a[b]);const d=performance.now()-s;ue(`[processModelOutput] Min/max calculation: ${d.toFixed(2)}ms (min=${l.toFixed(6)}, max=${u.toFixed(6)})`);const p=performance.now(),m=new Float32Array(a.length);for(let b=0;b<a.length;b++)m[b]=(a[b]-l)/(u-l);const g=performance.now()-p;return ue(`[processModelOutput] Normalization: ${g.toFixed(2)}ms`),m}function D2(e,{width:t,height:n}){const r=performance.now(),i=document.createElement("canvas");i.width=t,i.height=n;const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for mask canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const o=a.createImageData(t,n);for(let l=0;l<e.length;l++){const u=Math.round(e[l]*255),d=l*4;o.data[d]=u,o.data[d+1]=u,o.data[d+2]=u,o.data[d+3]=255}a.putImageData(o,0,0);const s=performance.now()-r;return ue(`[processModelOutput] Canvas creation: ${s.toFixed(2)}ms`),i}function F2(e,t){const n=performance.now(),{width:r,height:i}=e,a=document.createElement("canvas");a.width=t.width,a.height=t.height;const o=a.getContext("2d");if(!o)throw new Error("Failed to get context for resized canvas");o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(e,0,0,t.width,t.height);const s=performance.now()-n;return ue(`[processModelOutput] Resize: ${s.toFixed(2)}ms (${r}x${i} → ${t.width}x${t.height})`),a}function Fb(e,t,n=[1,1,320,320]){const r=performance.now();be(`[processModelOutput] Processing output (${e.length} values) for ${t.width}x${t.height} image...`);const i=L2(e,n),[,,a,o]=n,s=D2(i,{width:o,height:a}),l=F2(s,t),u=performance.now()-r;return ue(`[processModelOutput] Total processing: ${u.toFixed(2)}ms`),l}function U2(e,t){const n=performance.now();be(`[naiveCutout] Creating cutout for ${e.width}x${e.height} image...`);const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d");if(!i)throw new Error("Failed to get context for result canvas");const a=performance.now();i.drawImage(e,0,0);const o=performance.now()-a;ue(`[naiveCutout] Image draw: ${o.toFixed(2)}ms`);const s=performance.now(),l=i.getImageData(0,0,r.width,r.height),u=t.getContext("2d");if(!u)throw new Error("Failed to get context for mask canvas");const d=u.getImageData(0,0,t.width,t.height),p=performance.now()-s;ue(`[naiveCutout] Data extraction: ${p.toFixed(2)}ms`);const m=performance.now();for(let x=0;x<l.data.length;x+=4){const v=x,I=d.data[v];l.data[x+3]=I}const g=performance.now()-m;ue(`[naiveCutout] Mask application: ${g.toFixed(2)}ms`);const b=performance.now();i.putImageData(l,0,0);const _=performance.now()-b;ue(`[naiveCutout] Put image data: ${_.toFixed(2)}ms`);const T=performance.now()-n;return ue(`[naiveCutout] Total cutout creation: ${T.toFixed(2)}ms`),r}function W2(e,t){const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");if(!r)throw new Error("Failed to get context for result canvas");return r.fillStyle=`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]/255})`,r.fillRect(0,0,n.width,n.height),r.drawImage(e,0,0),n}function q2(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");return n.filter="blur(2px)",n.drawImage(e,0,0),n.filter="none",t}function V2(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");n.drawImage(e,0,0);const r=n.getImageData(0,0,t.width,t.height),i=r.data;for(let a=0;a<i.length;a+=4){const o=i[a];i[a]=o,i[a+1]=o,i[a+2]=o,i[a+3]=255}return n.putImageData(r,0,0),t}const H2={"u2net.onnx":"a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456","u2netp.onnx":"b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567","u2net_human_seg.onnx":"c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678","u2net_cloth_seg.onnx":"d4e5f6789012345678901234567890abcdef1234567890abcdef123456789","silueta.onnx":"75da6c8d2f8096ec743d071951be73b4a8bc7b3e51d9a6625d63644f90ffeedb"};async function G2(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function j2(e,t){try{const n=H2[e];if(!n)return console.warn(`No hash available for model: ${e}`),!0;const r=await G2(t),i=r===n;return i||(console.error(`Model integrity check failed for ${e}`),console.error(`Expected: ${n}`),console.error(`Actual: ${r}`)),i}catch(n){return console.error(`Error verifying model integrity for ${e}:`,n),!1}}function K2(e,t){const r=t.byteLength/(1024*1024),a={"u2net.onnx":{min:170,max:180},"u2netp.onnx":{min:4,max:5},"u2net_human_seg.onnx":{min:170,max:180},"u2net_cloth_seg.onnx":{min:170,max:180},"silueta.onnx":{min:40,max:50}}[e];if(!a)return console.warn(`No size validation available for model: ${e}`),!0;const o=r>=a.min&&r<=a.max;return o||(console.error(`Model size validation failed for ${e}`),console.error(`Expected: ${a.min}-${a.max}MB, got: ${r.toFixed(2)}MB`)),o}async function ph(e,t){return!(!K2(e,t)||!await j2(e,t))}function Ub(){try{return typeof navigator<"u"&&"gpu"in navigator&&typeof navigator.gpu=="object"&&navigator.gpu!==null}catch(e){return ol("WebGPU availability check failed:",e),!1}}function X2(e){return e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Ve(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}function Wb(){try{return typeof navigator<"u"&&"ml"in navigator&&typeof navigator.ml=="object"&&navigator.ml!==null}catch(e){return ol("WebNN availability check failed:",e),!1}}function Y2(e={}){const t=performance.now();be("[getExecutionProviders] Determining execution providers...");const n=[];if(be("[getExecutionProviders] Input options:",{executionProviders:e.executionProviders,preferWebNN:e.preferWebNN,webnnDeviceType:e.webnnDeviceType,webnnPowerPreference:e.webnnPowerPreference,preferWebGPU:e.preferWebGPU,webgpuPowerPreference:e.webgpuPowerPreference}),e.executionProviders&&e.executionProviders.length>0){const m=performance.now()-t;return ue(`[getExecutionProviders] Using explicit providers: ${m.toFixed(2)}ms`),be(`[getExecutionProviders] Using explicit execution providers: ${e.executionProviders.join(", ")}`),[...e.executionProviders]}const r=performance.now(),i=e.preferWebNN??!1,a=Wb(),o=performance.now()-r;ue(`[getExecutionProviders] WebNN preference check: ${o.toFixed(2)}ms`),be(`[getExecutionProviders] WebNN status: preferWebNN=${i}, available=${a}`),i&&a?(n.push("webnn"),be("[getExecutionProviders] WebNN execution provider added to preference list")):i&&!a&&Ve("[getExecutionProviders] WebNN was preferred but is not available in this browser");const s=performance.now(),l=e.preferWebGPU??!1,u=Ub(),d=performance.now()-s;ue(`[getExecutionProviders] WebGPU preference check: ${d.toFixed(2)}ms`),be(`[getExecutionProviders] WebGPU status: preferWebGPU=${l}, available=${u}`),l&&u?(n.push("webgpu"),be("[getExecutionProviders] WebGPU execution provider added to preference list")):l&&!u&&Ve("[getExecutionProviders] WebGPU was preferred but is not available in this browser"),n.push("webgl","cpu");const p=performance.now()-t;return ue(`[getExecutionProviders] Provider selection complete: ${p.toFixed(2)}ms (${n.join(", ")})`),n}function Q2(e){return e!=null&&e.webnnDeviceType&&!["cpu","gpu","npu"].includes(e.webnnDeviceType)?(Ve(`Invalid WebNN device type: ${e.webnnDeviceType}`),!1):e!=null&&e.webnnPowerPreference&&!["default","low-power","high-performance"].includes(e.webnnPowerPreference)?(Ve(`Invalid WebNN power preference: ${e.webnnPowerPreference}`),!1):e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Ve(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}const sn={simd:!0,proxy:!1,numThreads:4};function qb(e=sn){Se.wasm.simd=e.simd??sn.simd,Se.wasm.proxy=e.proxy??sn.proxy,Se.wasm.numThreads=e.numThreads??sn.numThreads}qb();class Be{constructor(t,n={}){Re(this,"modelName");Re(this,"session",null);Re(this,"modelData",null);Re(this,"options");this.modelName=t,this.options={...sn,...n},this.options.simd=this.options.simd??sn.simd,this.options.proxy=this.options.proxy??sn.proxy,this.options.numThreads=this.options.numThreads??sn.numThreads,qb(this.options)}emitProgress(t,n,r){this.options.onProgress&&this.options.onProgress({step:t,progress:n,message:r})}async initialize(){if(be(`[${this.modelName}] Starting session initialization...`),this.emitProgress("initializing",0,"Starting session initialization..."),this.session){be(`[${this.modelName}] Session already initialized, skipping`),this.emitProgress("initializing",100,"Session already initialized, skipping");return}this.emitProgress("initializing",20,"Validating configuration..."),await this.validateConfiguration(),this.emitProgress("initializing",50,"Downloading model..."),this.modelData=await this.downloadModel(),this.emitProgress("initializing",60,"Setting up execution providers...");const t=await this.setupExecutionProviders();this.emitProgress("initializing",80,"Creating session..."),await this.createSession(t),this.emitProgress("initializing",100,"Session initialized successfully")}async validateConfiguration(){Q2(this.options)||Ve("Invalid WebNN configuration, falling back to default providers"),X2(this.options)||Ve("Invalid WebGPU configuration, falling back to default providers")}async setupExecutionProviders(){const t=Y2(this.options);if(this.options.preferWebNN){const n=Wb();be(`WebNN requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}if(this.options.preferWebGPU){const n=Ub();be(`WebGPU requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}return t}async createSession(t){let n=!1,r=null;if(!this.modelData)throw new Error("Model data not found");for(const i of t)try{be(`[${this.modelName}] Attempting to create session with provider: ${i}`),this.session=await Ns.create(this.modelData,{executionProviders:[i],enableProfiling:ze.isONNXProfilingEnabled()}),ue(`[${this.modelName}] Successfully created session with provider: ${i}`),ze.isONNXProfilingEnabled()&&be(`[${this.modelName}] ONNX profiling enabled - data will be logged after each inference`),n=!0;break}catch(a){Ve(`[${this.modelName}] Failed to create session with provider '${i}':`,a),r=a;continue}if(!n)throw new Error(`Failed to create ONNX session with any provider. Last error: ${(r==null?void 0:r.message)||"Unknown error"}`)}async downloadModel(){var n;if(be(`[${this.modelName}] Starting model download...`),this.options.bypassModelCache)be(`[${this.modelName}] Model cache bypassed, forcing fresh download`);else try{this.emitProgress("downloading",10,"Checking cache...");const r=await this.getCachedModel();if(r)return be(`[${this.modelName}] Using cached model: ${this.modelName}`),this.emitProgress("downloading",100,"Using cached model"),r}catch(r){Ve(`[${this.modelName}] IndexedDB cache unavailable, falling back to direct download:`,r)}be(`[${this.modelName}] Downloading model: ${this.modelName}`);const t=this.getModelUrl();this.emitProgress("downloading",20,"Starting download...");try{const r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const i=r.headers.get("content-length"),a=i?parseInt(i,10):0;if(be(`[${this.modelName}] Model size: ${(a/(1024*1024)).toFixed(2)}MB`),a>0){this.emitProgress("downloading",30,"Downloading model...");const l=(n=r.body)==null?void 0:n.getReader();if(l){const u=[];let d=0,p=!1;for(;!p;){const _=await l.read();if(p=_.done,p||!_.value)break;const T=_.value;u.push(T),d+=T.length;const x=30+Math.round(d/a*60);this.emitProgress("downloading",x,`Downloading model... ${Math.round(d/a*100)}%`)}const m=new Uint8Array(d);let g=0;for(const _ of u)m.set(_,g),g+=_.length;if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await ph(this.modelName,m.buffer))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(m.buffer)}catch(_){Ve(`[${this.modelName}] Failed to cache model, but download succeeded:`,_)}return this.emitProgress("downloading",100,"Model ready"),m.buffer}}this.emitProgress("downloading",50,"Downloading model...");const o=await r.arrayBuffer();if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await ph(this.modelName,o))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(o)}catch(l){Ve(`[${this.modelName}] Failed to cache model, but download succeeded:`,l)}return this.emitProgress("downloading",100,"Model ready"),o}catch(r){throw ir(`[${this.modelName}] Model download failed:`,r),new Error(`Failed to download model ${this.modelName}: ${r}`)}}async getCachedModel(){return new Promise((t,n)=>{const r=indexedDB.open("rembg-models",2);r.onerror=()=>n(r.error),r.onsuccess=()=>{const s=r.result.transaction(["models"],"readonly").objectStore("models").get(this.modelName);s.onsuccess=()=>{const l=s.result;if(!l){t(null);return}const u=this.getModelVersion(),d=l.version||"1.0.0";if(d!==u){ol(`Model version mismatch for ${this.modelName}: cached=${d}, current=${u}`),t(null);return}t(l.data||null)},s.onerror=()=>n(s.error)},r.onupgradeneeded=()=>{const i=r.result;i.objectStoreNames.contains("models")||i.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}async cacheModel(t){return new Promise((n,r)=>{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").put({name:this.modelName,data:t,timestamp:Date.now(),version:this.getModelVersion()});l.onsuccess=()=>n(),l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}getModelUrl(){const t=ze.getCustomModelPath(this.modelName);return t&&t!==""?(be(`Using custom model path for ${this.modelName}: ${t}`),t):this.getDefaultModelUrl()}getModelVersion(){return"1.0.0"}prepareInput(t){return B2(t,this.getNormalizationParams(),this.getInputName())}async runInference(t){if(!this.session)throw new Error("Session not initialized");const n=await this.session.run(t);if(ze.isONNXProfilingEnabled())try{this.session.endProfiling(),be(`[${this.modelName}] ONNX profiling data outputted to console`)}catch(r){Ve(`[${this.modelName}] Failed to collect profiling data:`,r)}return n}async predict(t){if(be(`[${this.modelName}] Starting prediction for ${t.width}x${t.height} image...`),this.session||await this.initialize(),!this.session)throw new Error("Session not initialized");const n=this.prepareInput(t),r=await this.runInference(n),i=this.outputToMaskArray(r);return be(`[${this.modelName}] Predicted ${i.length} masks`),i.map(a=>this.maskArrayToMaskCanvas(a,{width:t.width,height:t.height}))}outputToMaskArray(t){return[t[Object.keys(t)[0]].data]}maskArrayToMaskCanvas(t,n){return Fb(t,n,this.getOutputShape())}static getName(){throw new Error("getName() must be implemented by subclass")}getName(){return this.modelName}getOptions(){return{...this.options}}async dispose(){this.session&&(await this.session.release(),this.session=null),this.modelData=null}static async clearCache(){return new Promise((t,n)=>{try{const r=indexedDB.deleteDatabase("rembg-models");r.onsuccess=()=>{be("Model cache cleared successfully"),t()},r.onerror=()=>{Ve("Failed to clear model cache:",r.error),n(r.error)}}catch(r){Ve("IndexedDB not available for cache clearing:",r),n(r)}})}static async clearModelCache(t){return new Promise((n,r)=>{try{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").delete(t);l.onsuccess=()=>{be(`Model cache cleared for ${t}`),n()},l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}}catch(i){Ve("IndexedDB not available for cache clearing:",i),r(i)}})}}ht([Yt()],Be.prototype,"initialize",null);ht([Yt()],Be.prototype,"validateConfiguration",null);ht([Yt()],Be.prototype,"setupExecutionProviders",null);ht([Yt()],Be.prototype,"createSession",null);ht([Yt()],Be.prototype,"downloadModel",null);ht([Yt()],Be.prototype,"getCachedModel",null);ht([Yt()],Be.prototype,"cacheModel",null);ht([sl()],Be.prototype,"prepareInput",null);ht([Yt()],Be.prototype,"runInference",null);ht([Yt()],Be.prototype,"predict",null);ht([sl()],Be.prototype,"outputToMaskArray",null);ht([sl()],Be.prototype,"maskArrayToMaskCanvas",null);class Z2 extends Be{constructor(t){super("u2net",t)}getDefaultModelUrl(){return`${ze.getBaseUrl()}/u2net.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net"}}class J2 extends Be{constructor(t){super("u2netp",t)}getDefaultModelUrl(){return`${ze.getBaseUrl()}/u2netp.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2netp"}}class ev extends Be{constructor(t){super("u2net_human_seg",t)}getDefaultModelUrl(){return`${ze.getBaseUrl()}/u2net_human_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net_human_seg"}}class tv extends Be{constructor(n){super("u2net_cloth_seg",n);Re(this,"clothCategory","combined")}setClothCategory(n){this.clothCategory=n}getClothCategory(){return this.clothCategory}getDefaultModelUrl(){return`${ze.getBaseUrl()}/u2net_cloth_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[768,768]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,3,768,768]}outputToMaskArray(n){const r=n[Object.keys(n)[0]],i=r.data,[,a,o,s]=r.dims,l=this.logSoftmax(i,a,o*s),u=this.argmax(l,a,o*s),d=[];for(let p=1;p<=3;p++){const m=new Float32Array(o*s);for(let g=0;g<u.length;g++)m[g]=u[g]===p?255.5:0;d.push(m)}return d}maskArrayToMaskCanvas(n,r){return Fb(n,r,this.getOutputShape())}logSoftmax(n,r,i){const a=new Float32Array(n.length);for(let o=0;o<i;o++){let s=n[o];for(let d=1;d<r;d++)s=Math.max(s,n[d*i+o]);let l=0;for(let d=0;d<r;d++)l+=Math.exp(n[d*i+o]-s);const u=Math.log(l)+s;for(let d=0;d<r;d++)a[d*i+o]=n[d*i+o]-u}return a}argmax(n,r,i){const a=new Uint8Array(i);for(let o=0;o<i;o++){let s=n[o],l=0;for(let u=1;u<r;u++){const d=n[u*i+o];d>s&&(s=d,l=u)}a[o]=l}return a}static getName(){return"u2net_cloth_seg"}}class nv extends Be{constructor(t){super("isnet-general-use",t)}getDefaultModelUrl(){return`${ze.getBaseUrl()}/isnet-general-use.onnx`}getNormalizationParams(){return{mean:[.5,.5,.5],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-general-use"}}class rv extends Be{constructor(t){super("isnet-anime",t)}getDefaultModelUrl(){return`${ze.getBaseUrl()}/isnet-anime.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-anime"}}class iv extends Be{constructor(t){super("silueta",t)}getDefaultModelUrl(){return`${ze.getBaseUrl()}/silueta.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"silueta"}}const Kt=new Map;Kt.set("u2net",Z2);Kt.set("u2netp",J2);Kt.set("u2net_human_seg",ev);Kt.set("u2net_cloth_seg",tv);Kt.set("isnet-general-use",nv);Kt.set("isnet-anime",rv);Kt.set("silueta",iv);const Sn=new Map,ln=[],av={maxSessions:5};function ov(e,t){var a,o;const n=[];e.preferWebNN!==t.preferWebNN&&n.push(`preferWebNN: ${e.preferWebNN} vs ${t.preferWebNN}`),e.webnnDeviceType!==t.webnnDeviceType&&n.push(`webnnDeviceType: ${e.webnnDeviceType} vs ${t.webnnDeviceType}`),e.webnnPowerPreference!==t.webnnPowerPreference&&n.push(`webnnPowerPreference: ${e.webnnPowerPreference} vs ${t.webnnPowerPreference}`),e.preferWebGPU!==t.preferWebGPU&&n.push(`preferWebGPU: ${e.preferWebGPU} vs ${t.preferWebGPU}`),e.webgpuPowerPreference!==t.webgpuPowerPreference&&n.push(`webgpuPowerPreference: ${e.webgpuPowerPreference} vs ${t.webgpuPowerPreference}`),e.simd!==t.simd&&n.push(`simd: ${e.simd} vs ${t.simd}`),e.proxy!==t.proxy&&n.push(`proxy: ${e.proxy} vs ${t.proxy}`),e.numThreads!==t.numThreads&&n.push(`numThreads: ${e.numThreads} vs ${t.numThreads}`);const r=JSON.stringify((a=e.executionProviders)==null?void 0:a.sort()),i=JSON.stringify((o=t.executionProviders)==null?void 0:o.sort());return r!==i&&n.push(`executionProviders: ${r} vs ${i}`),n.length>0?(be(`[areSessionOptionsEqual] Settings mismatch detected: ${n.join(", ")}`),!1):!0}function fh(e){const t=ln.indexOf(e);t>-1&&ln.splice(t,1),ln.push(e)}async function sv(){if(ln.length===0)return;const e=ln[0],t=Sn.get(e);t&&(await t.dispose(),Sn.delete(e),ln.shift())}async function lv(){for(;Sn.size>=av.maxSessions;)await sv()}async function Vb(e="u2net",t,n){const r=performance.now();be(`[newSession] Creating session for model: ${e}`);const i=performance.now(),a={...n,preferWebNN:ze.isWebNNEnabled(),webnnDeviceType:ze.getWebNNDeviceType(),webnnPowerPreference:ze.getWebNNPowerPreference(),preferWebGPU:ze.isWebGPUEnabled(),webgpuPowerPreference:ze.getWebGPUPowerPreference(),bypassSessionCache:ze.isSessionCacheBypassEnabled(),bypassModelCache:ze.isModelCacheBypassEnabled()},o=performance.now()-i;if(ue(`[newSession] Options merge: ${o.toFixed(2)}ms`),e==="u2net_custom")throw new Error("u2net_custom requires modelPath in config");const s=performance.now(),l=Kt.get(e),u=performance.now()-s;if(ue(`[newSession] Registry lookup: ${u.toFixed(2)}ms`),!l){const v=Array.from(Kt.keys()).join(", ");throw new Error(`No session class found for model '${e}'. Available models: ${v}`)}const d=performance.now();if(!a.bypassSessionCache&&Sn.has(e)){const v=Sn.get(e),I=v.getOptions();if(ov(a,I)){fh(e);const E=performance.now()-d,k=performance.now()-r;return ue(`[newSession] Cache hit for ${e}: ${E.toFixed(2)}ms (total: ${k.toFixed(2)}ms)`),v}else{be(`[newSession] Settings mismatch for ${e}, evicting cached session`),await v.dispose(),Sn.delete(e);const E=ln.indexOf(e);E>-1&&ln.splice(E,1)}}else a.bypassSessionCache&&be(`[newSession] Session cache bypassed for ${e}`);const p=performance.now()-d;ue(`[newSession] Cache miss for ${e}: ${p.toFixed(2)}ms`);const m=performance.now(),g=new l(a),b=performance.now()-m;ue(`[newSession] Session creation: ${b.toFixed(2)}ms`);const _=performance.now();Sn.set(e,g),fh(e);const T=performance.now()-_;ue(`[newSession] Session caching: ${T.toFixed(2)}ms`),lv().catch(console.warn);const x=performance.now()-r;return ue(`[newSession] Total session creation: ${x.toFixed(2)}ms`),g}async function uv(e,t={}){const n=performance.now();be("[remove] Starting background removal process...");const r=(i,a,o)=>{t.onProgress&&t.onProgress({step:i,progress:a,message:o})};try{r("downloading",0,"Initializing...");const i=performance.now();let a;if(e instanceof HTMLCanvasElement)a=e,r("downloading",20,"Input ready"),be("[remove] Input is already a canvas");else if(e instanceof HTMLImageElement){const k=performance.now();a=Do(e);const M=performance.now()-k;ue(`[remove] Image to canvas conversion: ${M.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof File||e instanceof Blob){r("downloading",10,"Loading image...");const k=performance.now(),M=await R2(e),A=performance.now()-k;ue(`[remove] File to image conversion: ${A.toFixed(2)}ms`);const S=performance.now();a=Do(M);const P=performance.now()-S;ue(`[remove] Image to canvas conversion: ${P.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof ArrayBuffer){r("downloading",10,"Loading image...");const k=performance.now(),M=await O2(e),A=performance.now()-k;ue(`[remove] ArrayBuffer to image conversion: ${A.toFixed(2)}ms`);const S=performance.now();a=Do(M);const P=performance.now()-S;ue(`[remove] Image to canvas conversion: ${P.toFixed(2)}ms`),r("downloading",20,"Input ready")}else throw new Error("Unsupported input type. Supported types: File, Blob, ArrayBuffer, HTMLImageElement, HTMLCanvasElement");const o=performance.now()-i;ue(`[remove] Total input processing: ${o.toFixed(2)}ms (${a.width}x${a.height})`);const s=performance.now();r("downloading",30,"Preparing model...");const l=t.session||await Vb("u2net"),u=performance.now()-s;ue(`[remove] Session creation: ${u.toFixed(2)}ms`);const d=performance.now();r("processing",40,"Running AI model...");const p=await l.predict(a),m=performance.now()-d;if(ue(`[remove] Model prediction: ${m.toFixed(2)}ms`),p.length===0)throw new Error("No masks generated from model");r("processing",70,"Processing mask...");let g=p[0];if(t.postProcessMask){const k=performance.now();r("postprocessing",80,"Applying post-processing..."),g=q2(g);const M=performance.now()-k;ue(`[remove] Post-processing: ${M.toFixed(2)}ms`)}if(t.onlyMask){const k=performance.now();r("postprocessing",90,"Creating mask output...");const M=V2(g),A=performance.now()-k;ue(`[remove] Mask-only creation: ${A.toFixed(2)}ms`);const S=performance.now(),P=await dh(M,"image/png"),O=performance.now()-S;ue(`[remove] Canvas to blob conversion: ${O.toFixed(2)}ms`),r("complete",100,"Complete");const W=performance.now()-n;return ue(`[remove] Total processing time (mask-only): ${W.toFixed(2)}ms`),P}const b=performance.now();r("postprocessing",85,"Creating cutout...");let _=U2(a,g);const T=performance.now()-b;if(ue(`[remove] Cutout creation: ${T.toFixed(2)}ms`),t.bgcolor){const k=performance.now();r("postprocessing",90,"Applying background color..."),_=W2(_,t.bgcolor);const M=performance.now()-k;ue(`[remove] Background color application: ${M.toFixed(2)}ms`)}const x=performance.now();r("postprocessing",95,"Finalizing output...");const v=await dh(_,"image/png"),I=performance.now()-x;ue(`[remove] Final canvas to blob conversion: ${I.toFixed(2)}ms`),r("complete",100,"Complete");const E=performance.now()-n;return ue(`[remove] Total processing time: ${E.toFixed(2)}ms`),v}catch(i){const a=performance.now()-n;throw console.error(`[remove] Processing failed (${a.toFixed(2)}ms):`,i),t.onProgress&&t.onProgress({step:"complete",progress:0,message:`Error: ${i instanceof Error?i.message:"Unknown error"}`}),i}}let Fo=null,hh=!1,Ut=null,cv=0;const Er=new Map;function Vt(e=80){return new Promise(t=>{if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(()=>t(),{timeout:e});return}requestAnimationFrame(()=>t())})}function mh(e,t){if(!e.length)return 0;const n=Math.min(e.length-1,Math.max(0,Math.round((e.length-1)*t)));return e[n]}function Uo(e){const t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function dv(e,t,n){const r=Uo(e),i=Uo(t),a=Uo(n);let o=(r*.4124564+i*.3575761+a*.1804375)/.95047,s=r*.2126729+i*.7151522+a*.072175,l=(r*.0193339+i*.119192+a*.9503041)/1.08883;const u=d=>d>.008856?Math.cbrt(d):7.787*d+16/116;return o=u(o),s=u(s),l=u(l),{l:se((116*s-16)/100),a:500*(o-s)/127,b:200*(s-l)/127}}async function pv(e,t=640){var l;const n=await createImageBitmap(e),r=Math.min(1,t/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r)),o=document.createElement("canvas");o.width=i,o.height=a;const s=o.getContext("2d",{willReadFrequently:!0});return s.fillStyle="#000",s.fillRect(0,0,i,a),s.drawImage(n,0,0,i,a),(l=n.close)==null||l.call(n),s.getImageData(0,0,i,a)}function fv(e,t=768){const n=e.naturalWidth||e.width,r=e.naturalHeight||e.height,i=Math.min(1,t/Math.max(n,r)),a=Math.max(1,Math.round(n*i)),o=Math.max(1,Math.round(r*i)),s=document.createElement("canvas");s.width=a,s.height=o;const l=s.getContext("2d",{willReadFrequently:!0});return l.fillStyle="#000",l.fillRect(0,0,a,o),l.drawImage(e,0,0,a,o),l.getImageData(0,0,a,o)}function hv(){return Ut||(Ut=new Worker(new URL(""+new URL("assets/fingerprint-worker-C74g51lu.js",import.meta.url).href,import.meta.url),{type:"classic"}),Ut.onmessage=e=>{const{id:t,ok:n,raw:r,error:i}=e.data||{},a=Er.get(t);a&&(Er.delete(t),n?a.resolve(r):a.reject(new Error(i||"Worker fingerprint failed")))},Ut.onerror=e=>{for(const[,t]of Er)t.reject(new Error(e.message||"Worker fingerprint failed"));Er.clear(),Ut==null||Ut.terminate(),Ut=null}),Ut}function mv(e,t){const n=hv(),r=++cv,i=new Uint8Array(e.data),a=new Uint8Array(t);return new Promise((o,s)=>{Er.set(r,{resolve:o,reject:s}),n.postMessage({id:r,payload:{rgba:i.buffer,mask:a.buffer,width:e.width,height:e.height,contourPoints:h.contourPoints||256,runtime:{pyodideIndex:Zh,pyodideScript:Y1,pythonCode:Q1}}},[i.buffer,a.buffer])})}function gv(){if(hh)return;const e=new URL("public/ort/",document.baseURI);Se.wasm.numThreads=1,Se.wasm.proxy=!0,Se.wasm.wasmPaths={mjs:new URL("ort-wasm-simd-threaded.jsep.mjs",e).toString(),wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",e).toString()},ze.setBaseUrl(new URL("public/models",document.baseURI).toString()),ze.setModelCacheBypass(!0),hh=!0}function bv(){return gv(),Fo||(Fo=Vb("u2netp")),Fo}function yv(e,t,n){const r=atob(e||""),i=new Uint8Array(t*n);for(let a=0;a<Math.min(r.length,i.length);a+=1)i[a]=r.charCodeAt(a);return i}function Hb(e,t,n){let r=t,i=n,a=-1,o=-1;for(let s=0;s<e.length;s+=1){if(!e[s])continue;const l=s%t,u=Math.floor(s/t);r=Math.min(r,l),i=Math.min(i,u),a=Math.max(a,l),o=Math.max(o,u)}return a<r?[0,0,t-1,n-1]:[r,i,a,o]}function wv(e){return new Promise(t=>{e.toBlob(n=>{if(!n){t(e.toDataURL("image/png"));return}const r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>t(e.toDataURL("image/png")),r.readAsDataURL(n)},"image/png")})}async function _v(e,t,n=null){const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d"),a=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);for(let k=0;k<t.length;k+=1)a.data[k*4+3]=t[k]?a.data[k*4+3]:0,(k&131071)===131071&&await Vt(16);i.putImageData(a,0,0);const[o,s,l,u]=n||Hb(t,e.width,e.height),d=Math.max(1,l-o+1),p=Math.max(1,u-s+1),m=Math.max(8,Math.round(Math.max(d,p)*.08)),g=Math.max(0,o-m),b=Math.max(0,s-m),_=Math.min(e.width,l+m+1),T=Math.min(e.height,u+m+1),x=Math.max(1,_-g),v=Math.max(1,T-b),I=Math.max(x,v),E=document.createElement("canvas");return E.width=I,E.height=I,E.getContext("2d").drawImage(r,g,b,x,v,(I-x)/2,(I-v)/2,x,v),wv(E)}async function xv(e){var u;$.statusLine.textContent="Removing background",await Vt();const t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").putImageData(e,0,0);const n=await bv();await Vt();const r=await uv(t,{onlyMask:!0,postProcessMask:!0,session:n});await Vt();const i=await createImageBitmap(r),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(i,0,0,e.width,e.height),(u=i.close)==null||u.call(i);const s=o.getImageData(0,0,e.width,e.height).data,l=new Uint8Array(e.width*e.height);for(let d=0;d<l.length;d+=1)l[d]=s[d*4]>16?1:0,(d&131071)===131071&&await Vt(16);return l}async function Gb(e){const t=await xv(e);$.statusLine.textContent="Fingerprinting shell",await Vt();const n=await mv(e,t);await Vt();const r=JSON.parse(n),i=yv(r.mask,e.width,e.height),a=r.bbox||Hb(i,e.width,e.height);return{imageData:e,mask:i,contour:new Float32Array(r.contour||[]),fingerprint:new Float32Array(r.fingerprint||[]),maskPixels:Number(r.mask_pixels||0),bbox:a,imageUrl:await _v(e,i,a)}}async function vv(e){return $.statusLine.textContent="Cutting shell",await Vt(),Gb(fv(e,768))}async function $v(e){return $.statusLine.textContent="Cutting shell",await Vt(),Gb(await pv(e,768))}const ll="shellspace:cutouts:v1:index",Sv="shellspace:cutouts:v1:";let Wo=!1,kv=0;const vt=[],Yn=new Map,Cv=80;function ul(e){return`${Sv}${encodeURIComponent(e)}`}function jb(){try{const e=JSON.parse(localStorage.getItem(ll)||"[]");return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch{return[]}}function Tv(e){try{localStorage.setItem(ll,JSON.stringify([...new Set(e)]))}catch{}}function Ev(){vt.length=0,Yn.clear();for(const e of jb())try{localStorage.removeItem(ul(e))}catch{}try{localStorage.removeItem(ll)}catch{}Ni.clear(),pt.clear(),zr.clear(),h.mapShellImageIds.clear()}function cl(e){if(!(e!=null&&e.file))return"";try{return localStorage.getItem(ul(e.file))||""}catch{return""}}function Iv(e,t){if(!(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/"))))try{localStorage.setItem(ul(e.file),t),Tv([...jb(),e.file]),e.id>=0&&h.mapShellImageIds.add(e.id)}catch{}}function Mv(e,t){const n=()=>Iv(e,t);if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(n,{timeout:5e3});return}window.setTimeout(n,2500)}function Kb(e){var t;["Loading Python","Loading numpy","Removing background","Cutting shell","Fingerprinting shell"].includes((t=$.statusLine)==null?void 0:t.textContent)&&($.statusLine.textContent=e)}function zv(e=120){return new Promise(t=>{if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(()=>t(),{timeout:e});return}window.setTimeout(t,16)})}function Xb(){Wo||(Wo=!0,(async()=>{for(;vt.length;){vt.sort((t,n)=>n.priority-t.priority||t.id-n.id);const e=vt.shift();e.file&&Yn.delete(e.file),await zv();try{e.resolve(await e.task())}catch(t){$.statusLine&&($.statusLine.textContent=t.message||"Python image cut failed"),e.resolve(null)}}Wo=!1,vt.length&&Xb()})())}function Av(e,t,n,{priority:r=0}={}){const i=Yn.get(e);if(i)return r>i.priority&&(i.priority=r),!0;if(vt.length>=Cv){if(r<=0)return!1;let s=-1,l=r;for(let d=0;d<vt.length;d+=1)vt[d].priority<l&&(l=vt[d].priority,s=d);if(s<0)return!1;const[u]=vt.splice(s,1);Yn.delete(u.file),Ni.delete(u.file),u.resolve(null)}const a=Qb(t),o=new Promise(s=>{const l={id:++kv,file:e,priority:r,task:n,resolve:s};vt.push(l),Yn.set(e,l),Xb()});return Ni.set(e,o),a.promise=a.promise||o,!0}function gs(e,t){if(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/")))return;let n=pt.get(e.file);n||(n=Yb(),pt.set(e.file,n)),n.image.src=t,e.id>=0&&h.mapShellImageIds.add(e.id),n.promise.then(r=>{if(!(r!=null&&r.src))return;window.dispatchEvent(new CustomEvent("shellspace:cutout-ready",{detail:{shellId:e.id,file:e.file}}));const i=zr.get(e.file);if(i)for(const a of[...i])a(r)})}function Yb(){const e=new Image;e.decoding="async";const t={image:e,ready:!1,promise:null};return t.promise=new Promise(n=>{e.onload=()=>{t.ready=!0,n(e)},e.onerror=()=>n(null)}),t}function Qb(e){let t=pt.get(e.file);return t||(t=Yb(),pt.set(e.file,t)),t}function Hr(e,t={}){var n;return e!=null&&e.file?(n=pt.get(e.file))!=null&&n.ready?!0:Ni.has(e.file)?(Ov(e.file,t.priority),!0):Av(e.file,e,async()=>{const r=cl(e);if(r)return gs(e,r),{imageUrl:r};const i=await cx(e);if(!i)return null;const a=await vv(i);return a!=null&&a.imageUrl&&(gs(e,a.imageUrl),Mv(e,a.imageUrl)),a},t):!1}function Nv(e,t){if(!(e!=null&&e.file)||!t)return()=>{};let n=zr.get(e.file);n||(n=new Set,zr.set(e.file,n)),n.add(t);const r=pt.get(e.file);return r!=null&&r.ready&&queueMicrotask(()=>t(r.image)),()=>{n.delete(t),n.size||zr.delete(e.file)}}function Pv(e){return Qb(e).promise.then(n=>n!=null&&n.src?{imageUrl:n.src}:null)}function Rv(e,t,{timeout:n=3e4}={}){return new Promise(r=>{const i=performance.now(),a=()=>{if(!e.isConnected){r(!1);return}const o=oa(t);if(o!=null&&o.src){e.src=o.src,r(!0);return}if(performance.now()-i>n){r(!1);return}window.setTimeout(a,120)};a()})}function Ov(e,t=0){const n=Yn.get(e);n&&t>n.priority&&(n.priority=t)}async function Bv(e,t={}){return e!=null&&e.file?(Hr(e,t),Pv(e).catch(n=>($.statusLine&&($.statusLine.textContent=n.message||"Python image cut failed"),null))):null}function Zb(e,t=null,n={}){if(!(e!=null&&e.file))return null;let r=pt.get(e.file);return!r&&n.request!==!1&&(Hr(e,n),r=pt.get(e.file)),r?r.ready?r.image:(t&&r.promise.then(i=>{i&&t(i)}),null):null}function oa(e,t=null){const n=e!=null&&e.file?pt.get(e.file):null;return n?n.ready?n.image:(t&&n.promise.then(r=>{r&&t(r)}),null):null}function dl(e,t){if(!e||!(t!=null&&t.file))return!1;const n=pt.get(t.file);return n?n.ready?(e.src=n.image.src,e.hidden=!1,!0):(n.promise.then(r=>{r!=null&&r.src&&e.isConnected&&(e.src=r.src,e.hidden=!1)}),!0):!1}async function Lv(e,t={}){const n=Zb(e,null,{...t,request:!1});if(n)return n;const r=cl(e);if(r)return gs(e,r),oa(e);Hr(e,t);const i=e!=null&&e.file?pt.get(e.file):null;return(i==null?void 0:i.promise)||null}async function Dv(e,t,n={}){var o;if(!e||!t)return!1;const r=Zb(t,null,{...n,request:!1});if(r)return e.src=r.src,!0;const i=((o=$.statusLine)==null?void 0:o.textContent)||"";if(!Hr(t,n))return!1;const a=await Rv(e,t,n);return Kb(i),a}function Gr(){var e;return Math.min(6,((e=h.model)==null?void 0:e.contour_visible_component_count)||0)}function pl(){return Gr()}function Fv(){return h.pcValues}function qo(e){var t;return(t=h.model.contour_pca_ranges)==null?void 0:t[e]}function Jb(e){var n;return String(((n=h.pcaAxisNames)==null?void 0:n[e])||"").trim()||`PC${e+1}`}function qi(e){var n;const t=String(((n=h.pcaAxisNames)==null?void 0:n[e])||"").trim();return t?`${t} (PC${e+1})`:`PC${e+1}`}function Rt(e,t){var n;return((n=e.contour_pc)==null?void 0:n[t])||0}function sa(e=h.xAxis,t=h.yAxis){var s;const n=((s=h.model.contour_pca_ranges)==null?void 0:s[0])||{p01:-1,p99:1},r=qo(e)||n,i=qo(t)||qo(1)||n,a=Math.max((r.p99-r.p01)*.08,.001),o=Math.max((i.p99-i.p01)*.08,.001);return{minX:r.p01-a,maxX:r.p99+a,minY:i.p01-o,maxY:i.p99+o}}function Nr(e,t,n){const r=h.viewport;return{x:(e-r.minX)/(r.maxX-r.minX)*n.width,y:n.height-(t-r.minY)/(r.maxY-r.minY)*n.height}}function ey(e,t,n){const r=h.viewport;return{x:r.minX+e/n.width*(r.maxX-r.minX),y:r.minY+(n.height-t)/n.height*(r.maxY-r.minY)}}function Vi(e,t=.78){let n=0;for(let r=0;r<e.length;r+=1)n=n*31+e.charCodeAt(r)>>>0;return`hsla(${n%360}, 42%, 42%, ${t})`}function Qe(e,t=.78){let n=0;const r=String(e||"");for(let i=0;i<r.length;i+=1)n=n*31+r.charCodeAt(i)>>>0;return je(n%360,.42,.42,t)}function bs(e,t=1){return[Math.round(se(e.color_r_mean??.68)*255),Math.round(se(e.color_g_mean??.64)*255),Math.round(se(e.color_b_mean??.56)*255),Math.round(se(t)*255)]}function fl(e){var t;return(e==null?void 0:e.live_conservation_status)||((t=e==null?void 0:e.species_traits)==null?void 0:t.protection_status)||"Not assessed"}function qn(e){const t=String(e||"").trim().toLowerCase();return t&&!["unknown","not assessed","data deficient","locality unavailable"].includes(t)}function It(e){if(e==null||String(e).trim()==="")return!1;const t=Number(e);return Number.isFinite(t)}function Hi(e,t){var n;return t==="lightness"?e.color_l_mean==null?null:se(e.color_l_mean):t==="area"?e.area==null||e.image_width==null||e.image_height==null?null:py(e):t==="concavity"?e.contour_concavity==null?null:se(e.contour_concavity/.32):t==="roughness"?((n=e.morph_traits)==null?void 0:n.roughness)==null?null:se(e.morph_traits.roughness):null}function jr(e){const t=String(e||"");if(t.startsWith("range:")){const[,n,r]=t.split(":");return n&&r?{type:"range",key:n,value:r}:null}return t.startsWith("taxonomy:")?{type:"taxonomy",value:t.slice(9)}:t.startsWith("habitat:")?{type:"habitat",value:t.slice(8)}:t.startsWith("origin:")?{type:"origin",value:t.slice(7)}:t.startsWith("palette:")?{type:"color",value:t.slice(8)}:t.startsWith("rarity:")?{type:"rarity",value:t.slice(7)}:["taxonomy","habitat","origin","color","lightness","area","roughness","rarity","concavity"].includes(t)?{type:t}:null}function ty(e){const t=(e==null?void 0:e.enrichment)||{};return t.aphia_family||t.aphia_genus||t.aphia_order||t.aphia_class||(e==null?void 0:e.species)||"Unknown"}function Uv(e){if(e!=null&&e._filterTaxonomyText)return e._filterTaxonomyText;const t=(e==null?void 0:e.enrichment)||{};return[t.aphia_class,t.aphia_order,t.aphia_family,t.aphia_genus,t.aphia_scientific_name,t.aphia_accepted_name,t.aphia_classification_path,e==null?void 0:e.species,e==null?void 0:e.name].filter(Boolean).join(" ").toLowerCase()}function Wv(e,t){const n=String(t||"").trim().toLowerCase().split(/\s+/).filter(Boolean);if(!n.length)return!0;const r=Uv(e);return n.every(i=>r.includes(i))}function Gi(e){var t,n,r;return((t=e==null?void 0:e.species_traits)==null?void 0:t.primary_country)||((r=(n=e==null?void 0:e._filterCountryItems)==null?void 0:n[0])==null?void 0:r.code)||(e==null?void 0:e.location_key)||"unknown"}function qv(e,t){var i,a,o;if(!t)return!0;const[n,r]=String(t).split(":");if(!r)return Gi(e)===t;if(n==="country-search"){const s=r.trim().toLowerCase();return s?((e==null?void 0:e._filterCountrySearchText)||"").includes(s):!0}return n==="region"?((i=e==null?void 0:e.species_traits)==null?void 0:i.region_key)===r||(e==null?void 0:e.region_key)===r||(e==null?void 0:e.location_key)===r:n==="country"?(e==null?void 0:e.location_key)===r||((a=e==null?void 0:e.species_traits)==null?void 0:a.primary_country)===r||((o=e==null?void 0:e._filterCountryCodes)==null?void 0:o.has(r))||((e==null?void 0:e._filterCountryItems)||[]).some(s=>s.code===r):Gi(e)===t}function Vv(e){var t;return((t=e==null?void 0:e._filterHabitatKeys)==null?void 0:t[0])||On(e)[0]||"unknown"}function Hv(e,t){return t?((e==null?void 0:e._filterHabitatSet)||new Set(On(e))).has(t):!0}function Vn(e,t=[31,117,111,222]){return e?t:[103,113,116,54]}function ny(e){return In.find(t=>t.key===e)}function gh(e,t){var n;if(t==="lightness"){const r=se(e.color_l_mean??.5);return je(48,.24,(24+r*54)/100)}if(t==="roughness"){const r=se(((n=e.morph_traits)==null?void 0:n.roughness)??0);return je(178-r*150,.58,(34+r*16)/100)}if(t==="area"){const r=se(Hi(e,"area")??.5);return je(210-r*176,.55,(35+r*16)/100)}if(t==="concavity"){const r=se((e.contour_concavity||0)/.32);return je(320-r*185,.56,(35+r*11)/100)}return Qe(t,.72)}function ry(e){return e==="low"?[43,95,116,222]:e==="medium"?[222,146,54,222]:e==="high"?[198,93,75,224]:[31,117,111,222]}function iy(e,t){var r;const n=jr(t);return(n==null?void 0:n.type)==="taxonomy"?qn(ty(e)):(n==null?void 0:n.type)==="habitat"?On(e).length>0||((e==null?void 0:e._filterHabitatKeys)||[]).length>0:(n==null?void 0:n.type)==="origin"?qn(Gi(e)):(n==null?void 0:n.type)==="color"?It(e.color_r_mean)&&It(e.color_g_mean)&&It(e.color_b_mean):(n==null?void 0:n.type)==="range"?Hi(e,n.key)!=null:(n==null?void 0:n.type)==="rarity"?qn(e.rarity_label):t==="species"?!0:t==="locality"?qn(e.location_key):t==="conservation"?qn(fl(e)):t==="shell"?It(e.color_r_mean)&&It(e.color_g_mean)&&It(e.color_b_mean):t==="pattern"?It(e.color_pattern_strength):t==="lightness"?It(e.color_l_mean):t==="area"?Hi(e,"area")!=null:t==="roughness"?It((r=e.morph_traits)==null?void 0:r.roughness):t==="rarity"?qn(e.rarity_label):t==="concavity"?It(e.contour_concavity):!1}function Gv(){return ra.filter(e=>h.shells.some(t=>iy(t,e.key)))}function ay(e){const t=String(e||""),n=jr(t);return(n==null?void 0:n.type)==="range"?["lightness","area","roughness","concavity"].includes(n.key):n?!0:ra.some(r=>r.key===t)}function jv(e){if(!e)return"Countries";if(e.startsWith("country-search:"))return e.slice(15);if(e.startsWith("country:")){const t=e.slice(8);return Xn(t)||t}return e.startsWith("region:")?e.slice(7).replace(/[-_]/g," "):e}function Hn(e=h.colorMode){var r,i;const t=String(e||""),n=jr(t);if((n==null?void 0:n.type)==="taxonomy")return n.value?n.value:"Family groups";if((n==null?void 0:n.type)==="habitat")return n.value?((r=Vr.find(a=>a.key===n.value))==null?void 0:r.label)||"Habitat":"All habitats";if((n==null?void 0:n.type)==="origin")return jv(n.value||"");if((n==null?void 0:n.type)==="color"){if(!n.value)return"Shell color";const a=qr(n.value);return a==null?n.value:Zn(a).hex}if((n==null?void 0:n.type)==="range"){const a=ny(n.value);return(a==null?void 0:a.label)||"Gradient"}return(n==null?void 0:n.type)==="rarity"?n.value||"All rarities":((i=ra.find(a=>a.key===t))==null?void 0:i.label)||"Shell color"}function bh(){var t;const e=Gv();if((!ay(h.colorMode)||!h.shells.some(n=>iy(n,h.colorMode)))&&(h.colorMode=e.some(n=>n.key==="roughness")?"roughness":((t=e[0])==null?void 0:t.key)||"species"),$.colorModeSelect){$.colorModeSelect.innerHTML="";for(const n of e){const r=document.createElement("option");r.value=n.key,r.textContent=n.label,$.colorModeSelect.append(r)}$.colorModeSelect.value=h.colorMode}la()}function De(e){return`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]/255})`}function qe(e,t){const n=document.createElement("span");n.className="color-legend-item";const r=document.createElement("span");r.className="color-legend-dot",r.style.background=t;const i=document.createElement("span");return i.textContent=e,n.append(r,i),n}function xr(e,t,n="Low",r="High"){const i=document.createElement("div");i.className="color-legend-gradient";const a=document.createElement("span");a.style.background=`linear-gradient(90deg, ${e}, ${t})`;const o=document.createElement("span");return o.className="color-legend-labels",o.innerHTML=`<span>${n}</span><span>${r}</span>`,i.append(a,o),i}function la(){if(!$.colorLegend)return;const e=$.colorLegend;e.innerHTML="",e.hidden=!1;const t=jr(h.colorMode);if((t==null?void 0:t.type)==="taxonomy"){e.append(t.value?qe(Hn(),De(Qe(t.value,.86))):qe("Family groups",De(Qe("taxonomy",.78))));return}if((t==null?void 0:t.type)==="habitat"){e.append(t.value?qe(Hn(),De(Qe(t.value,.86))):qe("Habitat groups",De(Qe("habitat",.78))));return}if((t==null?void 0:t.type)==="origin"){e.append(t.value?qe(Hn(),De(Qe(t.value,.86))):qe("Country groups",De(Qe("origin",.78))));return}if((t==null?void 0:t.type)==="color"&&t.value){const n=qr(t.value),r=n==null?t.value:Zn(n).hex;e.append(qe(Hn(),r));return}if((t==null?void 0:t.type)==="range"){if(t.value){e.append(qe(Hn(),De(ry(t.value))),qe("Other","rgba(103, 113, 116, 0.32)"));return}if(t.key==="area"){e.append(xr(De(je(210,.55,.35)),De(je(34,.55,.51)),"Small","Large"));return}}if((t==null?void 0:t.type)==="rarity"&&t.value){e.append(qe(t.value,De(ys({rarity_label:t.value}))),qe("Other","rgba(103, 113, 116, 0.32)"));return}if(h.colorMode==="rarity"){e.append(qe("Common","rgba(52, 136, 96, 0.82)"),qe("Uncommon","rgba(222, 146, 54, 0.85)"),qe("Rare","rgba(199, 64, 44, 0.88)"));return}if(h.colorMode==="lightness"){e.append(xr(De(je(48,.24,.24)),De(je(48,.24,.78)),"Dark","Light"));return}if(h.colorMode==="area"){e.append(xr(De(je(210,.55,.35)),De(je(34,.55,.51)),"Small","Large"));return}if(h.colorMode==="roughness"){e.append(xr(De(je(178,.58,.34)),De(je(28,.58,.5)),"Smooth","Rough"));return}if(h.colorMode==="concavity"){e.append(xr(De(je(320,.56,.35)),De(je(135,.56,.46)),"Smooth","Indented"));return}if(h.colorMode==="conservation"){e.append(qe("Least","rgba(58, 139, 99, 0.75)"),qe("Near","rgba(228, 176, 62, 0.78)"),qe("Risk","rgba(200, 45, 38, 0.86)"));return}e.hidden=!0}function Kv(e){const t=fl(e).toLowerCase();return t.includes("critically")?[126,24,28,230]:t.includes("endangered")?[200,45,38,220]:t.includes("vulnerable")?[232,123,54,210]:t.includes("near")?[228,176,62,200]:t.includes("least")?[58,139,99,190]:[102,111,117,112]}function ys(e){const t=String(e.rarity_label||"").toLowerCase();return t.includes("uncommon")?[222,146,54,218]:t.includes("common")?[52,136,96,208]:t.includes("rare")?[199,64,44,224]:[104,113,116,138]}function oy(e,t){const n=jr(t);if((n==null?void 0:n.type)==="taxonomy")return n.value?Vn(Wv(e,n.value),Qe(n.value,.86)):Qe(ty(e),.76);if((n==null?void 0:n.type)==="habitat"){if(n.value)return Vn(Hv(e,n.value),Qe(n.value,.86));const r=Vv(e);return r==="unknown"?[96,108,106,138]:Qe(r,.76)}if((n==null?void 0:n.type)==="origin"){if(n.value)return Vn(qv(e,n.value),Qe(n.value,.86));const r=Gi(e);return r==="unknown"?[96,108,106,138]:Qe(r,.72)}if((n==null?void 0:n.type)==="color"){if(!n.value)return bs(e);const r=qr(n.value),i=r==null?!1:tm(e,r),a=r==null?[31,117,111,222]:Zn(r).rgb.map(o=>Math.round(o*255)).concat(224);return Vn(i,a)}if((n==null?void 0:n.type)==="range"){if(!n.value)return gh(e,n.key);const r=ny(n.value),i=Hi(e,n.key),a=i!=null&&r&&i>=r.min&&i<=r.max;return Vn(!!a,ry(n.value))}if((n==null?void 0:n.type)==="rarity"&&n.value)return Vn(e.rarity_label===n.value,ys({rarity_label:n.value}));if(t==="locality")return e.location_key==="unknown"?[96,108,106,158]:Qe(e.location_key||"unknown",.66);if(t==="conservation")return Kv(e);if(t==="shell")return bs(e);if(t==="lightness"||t==="roughness"||t==="area"||t==="concavity")return gh(e,t);if(t==="rarity")return ys(e);if(t==="pattern"){const r=se((e.color_pattern_strength||0)/.22);return je(204-r*162,(34+r*36)/100,(30+r*18)/100)}return Qe(e.species,.78)}function Xv(e){if(h.pointColorCache.has(e))return h.pointColorCache.get(e);const t=new Uint8ClampedArray(h.shells.length*4);for(const n of h.shells){if(n.id<0||n.id>=h.shells.length)continue;const r=oy(n,e),i=n.id*4;t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3]}return h.pointColorCache.set(e,t),t}function Yv(){var e;return[h.mapSampleLimit||0,h.filtered.length,((e=h.selected)==null?void 0:e.id)??-1].join("|")}function Qv(e){const t=Math.floor(Number(h.mapSampleLimit||0));if(!t||e.length<=t)return e;const n=Math.max(1,Math.min(t,e.length)),r=[],i=new Set;for(let a=0;a<n;a+=1){const o=Math.floor((a+.5)*e.length/n),s=e[Math.min(e.length-1,o)];!s||i.has(s.id)||(r.push(s),i.add(s.id))}return h.selected&&e.includes(h.selected)&&!i.has(h.selected.id)&&(r.length>=n?r[r.length-1]=h.selected:r.push(h.selected)),r}function Pe(e=0){if(h.needsDraw=!0,h.scatterHitCache=null,e>0){window.clearTimeout(h.drawTimer),h.drawTimer=window.setTimeout(()=>Pe(),e);return}window.clearTimeout(h.drawTimer),h.drawTimer=0,!h.drawFrame&&(h.drawFrame=requestAnimationFrame(()=>{h.drawFrame=0,Jv()}))}window.addEventListener("shellspace:cutout-ready",()=>Pe());function Zv(e){const t=$.scatter.width,n=$.scatter.height;if(!t||!n)return;const r=window.devicePixelRatio||1,i=he.createImageData(t,n),a=i.data,o=Xv(h.colorMode),s=Math.max(8,Math.round(r*4)),l=Math.floor(s/2);for(let u=0;u<e.shells.length;u+=1){const d=e.shells[u],p=Math.round(e.points[u*2]*r),m=Math.round(e.points[u*2+1]*r);if(p<-s||p>=t+s||m<-s||m>=n+s)continue;const g=d.id>=0&&d.id<h.shells.length?d.id*4:-1,b=g<0?oy(d,h.colorMode):null,_=g<0?b[0]:o[g],T=g<0?b[1]:o[g+1],x=g<0?b[2]:o[g+2],v=g<0?b[3]:o[g+3];for(let I=0;I<s;I+=1){const E=m+I-l;if(!(E<0||E>=n))for(let k=0;k<s;k+=1){const M=p+k-l;if(M<0||M>=t)continue;const A=(E*t+M)*4;a[A]=_,a[A+1]=T,a[A+2]=x,a[A+3]=v}}}he.putImageData(i,0,0)}function yh(e,t){if(!e||e.id<0)return!1;const n=oa(e,()=>Pe());if(!n)return!1;const r=Nr(Rt(e,h.xAxis),Rt(e,h.yAxis),t);if(r.x<-40||r.x>t.width+40||r.y<-40||r.y>t.height+40)return!0;const i=e===h.selected?52:42;return he.save(),he.drawImage(n,r.x-i/2,r.y-i/2,i,i),he.restore(),!0}function Jv(){const e=Rn($.scatter,he);if(!h.viewport||!h.needsDraw)return;h.needsDraw=!1,he.clearRect(0,0,e.width,e.height);const t=sy(e),n=new Set(t.shells);Zv(t),he.save(),he.lineWidth=1,he.strokeStyle="rgba(32, 36, 42, 0.25)";const r=Nr(0,0,e);r.x>=0&&r.x<=e.width&&(he.beginPath(),he.moveTo(r.x,0),he.lineTo(r.x,e.height),he.stroke()),r.y>=0&&r.y<=e.height&&(he.beginPath(),he.moveTo(0,r.y),he.lineTo(e.width,r.y),he.stroke());const i=Fv();if(i.length){const a=Nr(i[h.xAxis]||0,i[h.yAxis]||0,e);he.strokeStyle="#c65d4b",he.lineWidth=2,he.beginPath(),he.moveTo(a.x-10,a.y),he.lineTo(a.x+10,a.y),he.moveTo(a.x,a.y-10),he.lineTo(a.x,a.y+10),he.stroke()}if(h.showPoppedShells)for(const a of h.mapShellImageIds){const o=h.shellById.get(a);o&&o!==h.selected&&n.has(o)&&yh(o,e)}if(h.selected&&n.has(h.selected)&&(!h.showPoppedShells||!yh(h.selected,e))){const a=Nr(Rt(h.selected,h.xAxis),Rt(h.selected,h.yAxis),e);he.fillStyle="#ffffff",he.strokeStyle="#20242a",he.lineWidth=2,he.beginPath(),he.arc(a.x,a.y,6,0,Math.PI*2),he.fill(),he.stroke()}he.restore()}function e$(e){const t=h.viewport||{};return[h.xAxis,h.yAxis,e.width.toFixed(1),e.height.toFixed(1),Number(t.minX||0).toFixed(4),Number(t.maxX||0).toFixed(4),Number(t.minY||0).toFixed(4),Number(t.maxY||0).toFixed(4)].join("|")}function sy(e){var a;const t=e$(e),n=Yv();if(((a=h.scatterPointCache)==null?void 0:a.key)===t&&h.scatterPointCache.source===h.filtered&&h.scatterPointCache.sampleSignature===n)return h.scatterPointCache;const r=Qv(h.filtered),i=new Float32Array(r.length*2);for(let o=0;o<r.length;o+=1){const s=Nr(Rt(r[o],h.xAxis),Rt(r[o],h.yAxis),e);i[o*2]=s.x,i[o*2+1]=s.y}return h.scatterPointCache={key:t,source:h.filtered,sampleSignature:n,shells:r,points:i},h.scatterHitCache=null,h.scatterPointCache}function ly(e){var s;const t=sy(e),n=t.key;if(((s=h.scatterHitCache)==null?void 0:s.key)===n&&h.scatterHitCache.source===h.filtered&&h.scatterHitCache.sampleSignature===t.sampleSignature)return h.scatterHitCache;const r=t.shells,i=t.points,a=24,o=new Map;for(let l=0;l<r.length;l+=1){const u=i[l*2],d=i[l*2+1];if(u<-a||u>e.width+a||d<-a||d>e.height+a)continue;const p=Math.floor(u/a),m=Math.floor(d/a),g=`${p},${m}`;let b=o.get(g);b||(b=[],o.set(g,b)),b.push(l)}return h.scatterHitCache={key:n,source:h.filtered,sampleSignature:t.sampleSignature,shells:r,points:i,grid:o,cellSize:a},h.scatterHitCache}let Pr=!1,wh=0,Rr=0,tr=!1,ws=0,ji=0;const t$=1400;function uy(){$.loadingOverlay&&($.loadingOverlay.hidden=!0,$.loadingOverlay.classList.remove("is-fading-out"))}function n$(){$.loadingOverlay&&($.loadingOverlay.classList.add("is-fading-out"),window.clearTimeout(Rr),Rr=window.setTimeout(uy,220))}function cy(){!$.loadingOverlay||Pr||!tr||(window.clearTimeout(ji),$.loadingOverlay.hidden=!1,$.loadingOverlay.classList.remove("is-fading-out"),$.loadingOverlay.classList.add("is-loader-preview"))}function dy(){var e;window.clearTimeout(ws),(e=$.loadingOverlay)!=null&&e.classList.contains("is-loader-preview")&&($.loadingOverlay.classList.add("is-fading-out"),window.clearTimeout(ji),ji=window.setTimeout(()=>{$.loadingOverlay.classList.remove("is-loader-preview","is-fading-out"),Pr||uy()},220))}window.addEventListener("keydown",e=>{e.key.toLowerCase()!=="z"||tr||(tr=!0,window.clearTimeout(ws),ws=window.setTimeout(cy,160))});window.addEventListener("keyup",e=>{e.key.toLowerCase()==="z"&&(tr=!1,dy())});window.addEventListener("blur",()=>{tr=!1,dy()});function vr(e){return new URL(`public/${e}`,document.baseURI).toString()}function r$(e){return new URL(`dataset/${encodeURIComponent(e).replaceAll("%2F","/")}`,document.baseURI).toString()}function se(e){return Math.max(0,Math.min(1,e))}function At(e,t=3){return Number(e||0).toLocaleString(void 0,{maximumFractionDigits:t})}function Vo(e){return`${At(se(e)*100,1)}%`}function py(e){return se(((e==null?void 0:e.area)||0)/Math.max(1,((e==null?void 0:e.image_width)||0)*((e==null?void 0:e.image_height)||0)))}function hl(e){if(!e||e.length<8)return null;const t=Math.floor(e.length/2),n=Math.max(2,Math.round(t*.025)),r=(l,u)=>{let d=l-u;for(;d>Math.PI;)d-=Math.PI*2;for(;d<-Math.PI;)d+=Math.PI*2;return d},i=l=>{const u=(l+t)%t;return[Number(e[u*2]||0),Number(e[u*2+1]||0)]},a=new Float32Array(t);for(let l=0;l<t;l+=1){const u=i(l),d=i(l+1),p=d[0]-u[0],m=d[1]-u[1];if(Math.hypot(p,m)<=1e-8)return null;a[l]=Math.atan2(m,p)}const o=new Float32Array(t);for(let l=0;l<t;l+=1)o[l]=r(a[l],a[(l-1+t)%t]);let s=0;for(let l=0;l<t;l+=1){let u=0,d=0;for(let p=-n;p<=n;p+=1)u+=o[(l+p+t)%t],d+=1;s+=Math.abs(o[l]-u/d)}return se(s/t/.08)}function ua(e){const t=Math.max(1,(e==null?void 0:e.image_width)||400),n=Math.max(1,(e==null?void 0:e.image_height)||300),r=Math.max(t,n),i=10;return{cmPerImageUnit:i/r,widthCm:t/r*i,heightCm:n/r*i,longSideCm:i}}function fy(e){const t=ua(e);return((e==null?void 0:e.area)||0)*t.cmPerImageUnit*t.cmPerImageUnit}function hy(e){return((e==null?void 0:e.mean_radius)||0)*ua(e).cmPerImageUnit}function ca(e,t=!0){if($.loadingText&&e&&($.loadingText.textContent=e),!$.loadingOverlay)return;if(t){Pr=!0,wh=performance.now(),window.clearTimeout(Rr),window.clearTimeout(ji),$.loadingOverlay.classList.remove("is-loader-preview","is-fading-out"),$.loadingOverlay.hidden=!1;return}const n=t$-(performance.now()-wh);if(Pr&&n>0){window.clearTimeout(Rr),Rr=window.setTimeout(()=>ca("",!1),n);return}if(Pr=!1,tr){cy();return}n$()}function ml(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function i$(e){if(e!=null&&e.fingerprint_hash)return e.fingerprint_hash;const t=(e.contour_pc||[]).slice(0,6).map(r=>Number(r||0).toFixed(4)),n=`${e.species}|${e.specimen}|${e.view}|${t.join(",")}`;return ml(n).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function a$(e,t){const n=ml(t)%360;e.style.setProperty("--hash-hue",String(n)),e.textContent=t}function _h(e,t,n=t==null?void 0:t.fingerprint_hash){if(!e||!n)return;const r=my((t==null?void 0:t.color_r_mean)??.68,(t==null?void 0:t.color_g_mean)??.62,(t==null?void 0:t.color_b_mean)??.52);e.style.setProperty("--hash-hue",String(Math.round(r.h))),e.style.setProperty("--hash-saturation",`${Math.round(Math.max(.28,r.s)*100)}%`),e.style.setProperty("--hash-lightness",`${Math.round(Math.max(.3,Math.min(.72,r.l))*100)}%`),e.textContent=n}function my(e,t,n){const r=se(e),i=se(t),a=se(n),o=Math.max(r,i,a),s=Math.min(r,i,a);let l=0,u=0;const d=(o+s)/2;if(o!==s){const p=o-s;u=d>.5?p/(2-o-s):p/(o+s),o===r?l=(i-a)/p+(i<a?6:0):o===i?l=(a-r)/p+2:l=(r-i)/p+4,l/=6}return{h:l*360,s:u,l:d}}function $r(e,t,n){return`hsl(${(e%360+360)%360}, ${Math.round(se(t)*100)}%, ${Math.round(se(n)*100)}%)`}function je(e,t,n,r=1){const i=(e%360+360)%360/360,a=se(t),o=se(n);if(a===0){const d=Math.round(o*255);return[d,d,d,Math.round(se(r)*255)]}const s=o<.5?o*(1+a):o+a-o*a,l=2*o-s,u=d=>{let p=i+d;return p<0&&(p+=1),p>1&&(p-=1),p<1/6?l+(s-l)*6*p:p<1/2?s:p<2/3?l+(s-l)*(2/3-p)*6:l};return[Math.round(u(1/3)*255),Math.round(u(0)*255),Math.round(u(-1/3)*255),Math.round(se(r)*255)]}function o$(e){return e.location_label||"Locality unavailable"}function gy(e,t){var n;return t?((n=e==null?void 0:e.region_labels)==null?void 0:n[t])||t.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,r=>r.toUpperCase()):""}function _s(e,t){var n,r;return((r=(n=e==null?void 0:e.countries)==null?void 0:n[t])==null?void 0:r.title)||t}function s$(e){var r,i,a,o;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-localities-v1")return t;const n=e.species_names||[];for(let s=0;s<n.length;s+=1){const l=((r=e.primary_country_codes)==null?void 0:r[s])||"",u=((i=e.region_keys)==null?void 0:i[s])||"",d=((a=e.top_country_codes)==null?void 0:a[s])||[],p=((o=e.top_country_counts)==null?void 0:o[s])||[],m=l?_s(e,l):"",g=gy(e,u),b=d.map((_,T)=>({code:_,label:_s(e,_),count:p[T]||0}));t.set(n[s],{primary_country:l,primary_country_label:m,region_key:u,region_label:g,top_countries:b,location_label:m&&g?`${m}, ${g}`:m||g||""})}return t}function l$(e){var a,o,s,l,u,d,p,m,g,b,_,T;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-species-traits-v1")return t;const n=e.species_names||[],r=e.rarity_labels||[],i=e.protection_status_labels||[];for(let x=0;x<n.length;x+=1){const v=((a=e.known_range_country_codes)==null?void 0:a[x])||[],I=((o=e.known_range_country_counts)==null?void 0:o[x])||[],E=v.map((k,M)=>({code:k,label:_s(e,k),count:I[M]||0}));t.set(n[x],{genus:((s=e.genus)==null?void 0:s[x])||"",rarity_label:r[(l=e.rarity)==null?void 0:l[x]]||"Data deficient",rarity_reason:((u=e.rarity_reasons)==null?void 0:u[x])||"",dataset_sample_count:((d=e.dataset_sample_count)==null?void 0:d[x])||0,known_range_country_count:((p=e.country_count)==null?void 0:p[x])||E.length,known_range_countries:E,primary_country:((m=e.primary_country_codes)==null?void 0:m[x])||"",region_key:((g=e.region_keys)==null?void 0:g[x])||"",region_label:gy(e,((b=e.region_keys)==null?void 0:b[x])||""),protection_status:i[(_=e.protection_status)==null?void 0:_[x]]||"Not assessed",market_price_usd:((T=e.market_price_usd)==null?void 0:T[x])??null})}return t}function by(e){const t=Number.isFinite(Number(e.roughness))?Number(e.roughness):hl(e.upload_contour),n=se((1-(e.contour_solidity||1))/.32),r=e.contour_pc||[],i=se(((r[1]||0)+7)/14),a=se(((r[3]||0)+3)/6);return{roughness:t??se(.4*Math.abs(i-.5)*2+.34*Math.abs(a-.5)*2+.26*n)}}function u$(e,t=null,n=null){var a;h.speciesCounts=new Map,h.originFilterOptionsCache=null;for(const o of e)h.speciesCounts.set(o.species,(h.speciesCounts.get(o.species)||0)+1);const r=s$(t),i=l$(n);h.speciesTraits=i,h.localityMatchRate=(t==null?void 0:t.match_rate)||0;for(const o of e){const s=r.get(o.species),l=i.get(o.species),u=by(o);o.fingerprint_hash||(o.fingerprint_hash=i$(o)),o.species_sample_count=h.speciesCounts.get(o.species)||1,o.species_traits=l||null,o.morph_traits={...u,...o.morph_traits||{}},o.rarity_label=(l==null?void 0:l.rarity_label)||o.rarity_label||"",o.rarity_reason=(l==null?void 0:l.rarity_reason)||"",o.location_label=(s==null?void 0:s.location_label)||"Locality unavailable",o.location_key=(s==null?void 0:s.primary_country)||(s==null?void 0:s.region_key)||"unknown",o.location_color=o.location_key==="unknown"?"rgba(96, 108, 106, 0.62)":Vi(o.location_key),o.species_color=Vi(o.species),o.region_label=(s==null?void 0:s.region_label)||"",o.top_countries_label=(a=s==null?void 0:s.top_countries)!=null&&a.length?s.top_countries.slice(0,3).map(d=>d.label).join(", "):o.countries_top||""}}function xs(e){return fetch(e,{cache:"no-store"}).then(t=>{if(!t.ok)throw new Error(`${e} returned ${t.status}`);return t.json()})}async function xh(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} returned ${t.status}`);if(!e.endsWith(".gz"))return t.arrayBuffer();const n=await t.arrayBuffer(),r=new Uint8Array(n);if(r[0]!==31||r[1]!==139)return n;if(!("DecompressionStream"in window))throw new Error("This browser cannot decompress the shell data pack.");return new Response(new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}const c$=.28,d$=384;function p$(e){if(!e)return 1;const t=Math.abs(Number(e.p99||0)-Number(e.p01||0)),n=Math.abs(Number(e.max||0)-Number(e.min||0));return Math.max(.001,t||n||1)}function vs(e,t,n){var a;const r=(n==null?void 0:n[t])||{},i=(Number(r.p01||0)+Number(r.p99||0))/2||0;return(Number(((a=e.contour_pc)==null?void 0:a[t])||0)-i)/p$(r)}function f$(e,t,n,r,i){let a=0;for(const o of r){if(o===n)continue;const s=vs(e.shell,o,i)-vs(t.shell,o,i);a+=s*s}return a}function yy(e,t){return e/(.05+t)}function vh(e,t,n,r,i){const a=t.target<=n.target?t:n,o=t.target<=n.target?n:t;return{axis:e,axis_label:`PC${e+1}`,low_shell_id:a.shell.id,high_shell_id:o.shell.id,low_file:a.shell.file,high_file:o.shell.file,low_species:a.shell.species,high_species:o.shell.species,normalized_target_delta:Math.round(r*1e4)/1e4,orthogonal_distance:Math.round(i*1e4)/1e4,score:Math.round(yy(r,i)*1e4)/1e4}}function h$(e,t,n,r){const i=e.filter(d=>{var p;return((p=d==null?void 0:d.contour_pc)==null?void 0:p.length)>t}).map(d=>({shell:d,target:vs(d,t,r)})).sort((d,p)=>d.target-p.target);if(i.length<2)return null;if(n.length<=1){const d=i[0],p=i[i.length-1];return vh(t,d,p,Math.abs(p.target-d.target),0)}const a=Math.max(2,Math.min(Math.ceil(i.length*c$),Math.floor(i.length/2),d$)),o=i.slice(0,a),s=i.slice(-a);let l=null;const u=(d,p)=>{if(!d||!p||d.shell.id===p.shell.id)return;const m=Math.abs(p.target-d.target),g=Math.sqrt(f$(d,p,t,n,r)),b=yy(m,g);(!l||b>l.score)&&(l={source:d,target:p,targetDelta:m,orthogonalDistance:g,score:b})};for(const d of o)for(const p of s)u(d,p);return l?vh(t,l.source,l.target,l.targetDelta,l.orthogonalDistance):null}function m$(e,t,{axisCount:n=null}={}){const r=(e||[]).filter(o=>{var s;return(s=o==null?void 0:o.contour_pc)==null?void 0:s.length});if(r.length<2)return[];const i=Math.min(n||r[0].contour_pc.length,r[0].contour_pc.length,(t==null?void 0:t.length)||r[0].contour_pc.length),a=Array.from({length:i},(o,s)=>s);return a.map(o=>h$(r,o,a,t)).filter(Boolean)}const $h=new Set(["DEA627","9D12CA","C30492","FFFD32","3C89E5","CE3B23","153910","68FE3F","1851E5","802900","C4DBCF","6CAE43","288230","B8BFCD","376F7C","136CC7","96DD3C","7CB60D","23F9C6","FD71FA","FA5A92"]);function Ho(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").replace(/_/g," ").trim()||"Unknown shell"}function g$(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").trim()}async function b$(e){try{return await xs(e)}catch{return null}}async function at(e,t){typeof e=="function"&&await e(t)}function Sh(e){if(e==null||String(e).trim()==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function y$(e){const t=String(e||"").trim().toLowerCase();return!t||t==="unknown"?"":t.includes("high")?"Common":t.includes("moderate")?"Uncommon":t.includes("low")?"Rare":t.includes("common")?t.includes("uncommon")?"Uncommon":"Common":t.includes("rare")?"Rare":""}function w$(e,t){const n=e.map(r=>{var i;return{shell:r,value:Number((i=r.morph_traits)==null?void 0:i[t])}}).filter(r=>Number.isFinite(r.value));if(n.length){if(n.sort((r,i)=>r.value-i.value),n.length===1){n[0].shell.morph_traits[`${t}_raw`]=n[0].value,n[0].shell.morph_traits[t]=.5;return}for(let r=0;r<n.length;){let i=r;for(;i+1<n.length&&n[i+1].value===n[r].value;)i+=1;const a=(r+i)/2/(n.length-1);for(let o=r;o<=i;o+=1)n[o].shell.morph_traits[`${t}_raw`]=n[o].value,n[o].shell.morph_traits[t]=a;r=i+1}}}function _$(e,t,n){const r=[];for(let i=0;i<n;i+=1){const a=[];for(let m=0;m<t;m+=1)a.push(e[m*n+i]||0);a.sort((m,g)=>m-g);const o=m=>a[Math.min(a.length-1,Math.max(0,Math.round((a.length-1)*m)))]||0,s=a[0]||0,l=a.at(-1)||0,u=o(.01),d=o(.99),p=Math.max(.001,d-u,l-s);r.push({min:s-p*.08,max:l+p*.08,p01:u-p*.08,p99:d+p*.08})}return r}function x$(e,t){const n=[];for(let r=0;r<t;r+=1){const i=e.map(p=>{var m;return((m=p.contour_pc)==null?void 0:m[r])||0}).sort((p,m)=>p-m),a=p=>i[Math.min(i.length-1,Math.max(0,Math.round((i.length-1)*p)))]||0,o=i[0]||0,s=i.at(-1)||0,l=a(.01),u=a(.99),d=Math.max(.001,u-l,s-o);n.push({min:o-d*.08,max:s+d*.08,p01:l-d*.08,p99:u+d*.08})}return n}function v$(e){return $h.has(String((e==null?void 0:e.fingerprint_hash)||"").toUpperCase())||$h.has(String((e==null?void 0:e.legacy_fingerprint_hash)||"").toUpperCase())}async function wy(e){const t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),n=new Uint8Array(t.length);n.set(t);const r=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(r)].map(i=>i.toString(16).padStart(2,"0")).join("").slice(0,6).toUpperCase()}function gl(e,t=256){const n=Math.floor(e.length/4),r=new Float32Array(t*2);for(let i=0;i<t;i+=1){const a=i/t;let o=0,s=0;for(let l=0;l<n;l+=1){const u=l+1,d=l*4,p=e[d]||0,m=e[d+1]||0,g=e[d+2]||0,b=e[d+3]||0,_=Math.PI*2*u*a,T=Math.cos(_),x=Math.sin(_);o+=p*T-m*x+g*T+b*x,s+=p*x+m*T+b*T-g*x}r[i*2]=o,r[i*2+1]=s}return r}function $$(e){var i,a;const t=((i=h.model)==null?void 0:i.fingerprint_mean)||[],n=((a=h.model)==null?void 0:a.fingerprint_components)||[];if(!t.length||!n.length)return null;const r=new Float32Array(t);for(let o=0;o<Math.min(e.length,n.length);o+=1){const s=n[o]||[];for(let l=0;l<Math.min(r.length,s.length);l+=1)r[l]+=(e[o]||0)*s[l]}return r}function _y(e){var r,i;const t=((r=h.model)==null?void 0:r.fingerprint_mean)||[];return(((i=h.model)==null?void 0:i.fingerprint_components)||[]).map(a=>{let o=0;for(let s=0;s<Math.min(e.length,t.length,a.length);s+=1)o+=(e[s]-t[s])*a[s];return o})}async function S$(e={}){const{onProgress:t=null}=e||{};await at(t,"Requesting shell index");const n=xs(vr("data/files.json"));await at(t,"Requesting PCA model");const r=xs(vr("data/pca_model.json"));await at(t,"Requesting FFT coefficients");const i=xh(vr("data/fingerprints.f32"));await at(t,"Requesting projected coordinates");const a=xh(vr("data/pca.f32"));await at(t,"Requesting species enrichment");const o=b$(vr("data/enrichment.json")),[s,l,u,d,p]=await Promise.all([n,r,i,a,o]);await at(t,"Indexing enrichment records");const m=(p==null?void 0:p.species)||(p==null?void 0:p.rows)||[],g=(p==null?void 0:p.shell)||[],b=new Map(m.map(O=>[O.label,O])),_=new Map(g.map(O=>[O.file,O]));await at(t,`Opening ${s.length.toLocaleString()} shell fingerprints`);const T=s.length,x=new Float32Array(u),v=new Float32Array(d),I=Math.floor(x.length/T),E=Math.floor(v.length/T);await at(t,"Computing PCA map ranges");const k={processed_count:T,species_count:new Set(s.map(Ho)).size,contour_points:256,contour_scale:1,contour_component_count:E,contour_visible_component_count:Math.min(6,E),contour_pca_ranges:_$(v,T,E),contour_explained_variance_ratio:Array.from({length:E},()=>0),fingerprint_mean:l.mean||[],fingerprint_components:l.components||[]},M=async(O,W)=>{const G=x.slice(W*I,(W+1)*I),X=Array.from(v.slice(W*E,(W+1)*E)),R=b.get(g$(O))||{},Y=_.get(O)||{},Z=Sh(Y.lightness_mean),V=Array.isArray(Y.palette_rgb)?Y.palette_rgb:[],ie=Array.isArray(Y.palette_weights)?Y.palette_weights:[],F=gl(G,256);return{id:W,file:O,species:Ho(O),specimen:"",specimen_label:"",view:"",view_label:"",name:Ho(O),contour_pc:X,trait_pc:[],fingerprint:G,fingerprint_hash:await wy(G),enrichment:R,shell_enrichment:Y,rarity_label:y$(R.rarity_proxy),country_count:Sh(R.country_count),countries_top:R.countries_top||"",color_l_mean:Z==null?null:Z/255,color_palette_rgb:V,color_palette_weights:ie,morph_traits:{roughness:hl(F)}}},A=[],S=1500;for(let O=0;O<s.length;O+=S){const W=Math.min(s.length,O+S);await at(t,`Reconstructing shell outlines ${O.toLocaleString()}-${W.toLocaleString()}`);const G=await Promise.all(s.slice(O,W).map((X,R)=>M(X,O+R)));A.push(...G)}const P=A.filter(O=>!v$(O));return k.processed_count=P.length,k.species_count=new Set(P.map(O=>O.species)).size,k.contour_pca_ranges=x$(P,E),await at(t,"Ranking outline roughness"),w$(P,"roughness"),await at(t,"Quantizing color palettes"),ax(P),await at(t,"Finding PCA contrast examples"),k.contour_pca_diametric_pairs=m$(P,k.contour_pca_ranges,{axisCount:k.contour_visible_component_count}),await at(t,"Fingerprint pack ready"),{model:k,shells:P}}function bl(e){if(e!=null&&e.upload_contour)return e.upload_contour;if((e==null?void 0:e.id)<0&&h.selected===e&&h.selectedContour)return h.selectedContour;if(di.has(e.id))return di.get(e.id);if(!h.contours&&(e!=null&&e.fingerprint)){const s=gl(e.fingerprint,h.contourPoints||256);return di.set(e.id,s),s}if(!h.contours||!h.contourPoints)return null;const t=e.id*h.contourPoints*2;if(t+h.contourPoints*2>h.contours.length)return null;const r=e.center[0]*h.contourScale,i=e.center[1]*h.contourScale,a=Math.max(1e-6,e.mean_radius*h.contourScale),o=new Float32Array(h.contourPoints*2);for(let s=0;s<h.contourPoints;s+=1){const l=t+s*2;o[s*2]=(h.contours[l]-r)/a,o[s*2+1]=(h.contours[l+1]-i)/a}return di.set(e.id,o),o}function xy(e){var t;return e?{color_r_mean:e.color_r_mean,color_g_mean:e.color_g_mean,color_b_mean:e.color_b_mean,color_l_mean:e.color_l_mean,color_a_mean:e.color_a_mean,color_b_lab_mean:e.color_b_lab_mean,color_palette_rgb:e.color_palette_rgb,color_palette_weights:e.color_palette_weights,color_chroma_mean:e.color_chroma_mean,color_chroma_std:e.color_chroma_std,color_saturation_mean:e.color_saturation_mean,color_saturation_std:e.color_saturation_std,color_pattern_strength:e.color_pattern_strength,color_pattern_contrast:e.color_pattern_contrast,color_pattern_chroma:e.color_pattern_chroma,roughness:e.roughness??((t=e.morph_traits)==null?void 0:t.roughness),texture_gradient_mean:e.texture_gradient_mean,texture_residual_std:e.texture_residual_std,texture_luma_iqr:e.texture_luma_iqr,contour_concavity:e.contour_concavity,contour_solidity:e.contour_solidity}:{}}function k$(e){const t=e.color_l_mean??.5,n=e.color_chroma_mean??.1,r=(Math.atan2(e.color_hue_sin||0,e.color_hue_cos||1)*180/Math.PI+360)%360;return t>.72&&n<.12?"ivory":t<.32?"dark brown":n<.08?t>.58?"chalky cream":"stone gray":r<28||r>=342?"rose-brown":r<58?t>.58?"golden cream":"amber-brown":r<92?"olive-tan":r<165?"green-gray":r<235?"blue-gray":r<292?"violet-gray":"pink-tan"}function yl(){return h.generatedTraits||xy(h.selected)}function wl(){const e=C$(h.pcValues);e&&(h.generatedContour=e,h.generatedTraits=null,h.generatedMode="pca",da())}function C$(e){var i,a,o,s,l;const t=$$(e);if(t)return gl(t,h.contourPoints||256);if(!((a=(i=h.model)==null?void 0:i.contour_mean)!=null&&a.length)||!((s=(o=h.model)==null?void 0:o.contour_components)!=null&&s.length))return null;const n=h.model.contour_mean.length,r=new Float32Array(n);for(let u=0;u<n;u+=1){let d=h.model.contour_mean[u]||0;for(let p=0;p<h.model.contour_components.length;p+=1)d+=(e[p]||0)*(((l=h.model.contour_components[p])==null?void 0:l[u])||0);r[u]=d}return r}function _l(e){let t=0;for(const n of e)if(n)for(let r=0;r<n.length;r+=2)t=Math.max(t,Math.hypot(n[r],n[r+1]));return t||1}function En(e,t,n,r,i){e.beginPath();const a=Math.floor(t.length/2);for(let o=0;o<a;o+=1){const s=n+t[o*2]*i,l=r+t[o*2+1]*i;o===0?e.moveTo(s,l):e.lineTo(s,l)}e.closePath()}function vy(e,t=.9){const n=Math.round(se((e==null?void 0:e.color_r_mean)??.72)*255),r=Math.round(se((e==null?void 0:e.color_g_mean)??.66)*255),i=Math.round(se((e==null?void 0:e.color_b_mean)??.54)*255);return`rgba(${n}, ${r}, ${i}, ${t})`}function T$(){const e=h.pcValues.slice(0,6).map(t=>Number(t||0).toFixed(4));return ml(`projected|${e.join(",")}`).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function $y(){var e,t,n;if((e=h.selected)!=null&&e.fingerprint_hash&&$.physicalHash&&_h($.physicalHash,h.selected),$.projectedHash){const r=h.generatedMode==="selected"&&((t=h.selected)!=null&&t.fingerprint_hash)?h.selected.fingerprint_hash:T$();h.generatedMode==="selected"&&((n=h.selected)!=null&&n.fingerprint_hash)?_h($.projectedHash,h.selected,r):a$($.projectedHash,r)}}function E$(e,t,n,r,i,a){const o=Math.floor(t.length/2);if(o<4)return;const s=se(((a==null?void 0:a.roughness)||.012)/.04),l=se(((a==null?void 0:a.color_chroma_mean)||.08)/.35),u=se(((a==null?void 0:a.contour_concavity)||.04)/.35),d=se(((a==null?void 0:a.color_pattern_strength)||.06)/.22),p=se(((a==null?void 0:a.color_pattern_contrast)||.04)/.18);e.save(),En(e,t,n,r,i),e.clip();const m=4+Math.round(u*4+d*5);for(let _=1;_<=m;_+=1)En(e,t,n,r,i*(.16+_/(m+1)*.78)),e.strokeStyle=`rgba(32, 36, 42, ${.035+l*.035+p*.05})`,e.lineWidth=.8+d*.55,e.stroke();const g=Math.max(4,Math.round(16-s*5-l*3-d*6));e.lineWidth=.9+s*.8+d*.6,e.strokeStyle=`rgba(32, 36, 42, ${.07+s*.12+p*.16})`;for(let _=0;_<o;_+=g){const T=t[_*2],x=t[_*2+1];e.beginPath(),e.moveTo(n+T*i*.22,r+x*i*.22),e.lineTo(n+T*i*.95,r+x*i*.95),e.stroke()}const b=e.createRadialGradient(n-i*.22,r-i*.28,i*.08,n,r,i*1.25);b.addColorStop(0,"rgba(255, 255, 255, 0.34)"),b.addColorStop(.45,"rgba(255, 255, 255, 0.08)"),b.addColorStop(1,"rgba(32, 36, 42, 0.08)"),e.fillStyle=b,e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore()}function da(){const{width:e,height:t}=$.outline;Fe.clearRect(0,0,e,t),Fe.fillStyle="#f7f7f2",Fe.fillRect(0,0,e,t);const n=h.generatedContour||h.selectedContour;if(!n)return;$y();const r=e/2,i=t/2,a=Math.min(e,t)*.42/_l([n]),o=yl();Fe.save(),En(Fe,n,r,i,a),Fe.fillStyle=vy(o,.9),Fe.strokeStyle="#287a74",Fe.lineWidth=3,Fe.fill(),E$(Fe,n,r,i,a,o),En(Fe,n,r,i,a),Fe.stroke(),Fe.fillStyle="#20242a",Fe.beginPath(),Fe.arc(r,i,3,0,Math.PI*2),Fe.fill(),Fe.restore()}function I$(e,t,n,r){const i=[],a=Math.floor(e.length/2);for(let o=0;o<a;o+=1){const s=t+e[o*2]*r,l=n+e[o*2+1]*r;i.push(`${o===0?"M":"L"}${s.toFixed(2)} ${l.toFixed(2)}`)}return i.push("Z"),i.join(" ")}function M$(){const e=h.generatedContour||h.selectedContour;if(!e)return;const t=512,n=t/2,r=t*.42/_l([e]),i=I$(e,n,n,r),a=vy(yl(),.86),o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}"><rect width="${t}" height="${t}" fill="#f7f7f2"/><path d="${i}" fill="${a}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`,s=new Blob([o],{type:"image/svg+xml"}),l=URL.createObjectURL(s),u=document.createElement("a");u.href=l,u.download="seashell-generated.svg",u.click(),URL.revokeObjectURL(l)}function z$(e){return Array.isArray(e==null?void 0:e.color_bins)&&e.color_bins.length?e.color_bins.slice().sort((t,n)=>Number(n.weight||0)-Number(t.weight||0)||Number(t.bin||0)-Number(n.bin||0)).map(t=>{const n=Number(t.bin),r=Zn(n).hex;return{color:r,filterValue:Pi(n),title:`${r} · bin ${n} · weight ${Number(t.weight||0).toFixed(3)}`}}):Array.isArray(e==null?void 0:e.color_palette_rgb)&&e.color_palette_rgb.length?e.color_palette_rgb.map(t=>{const n=[se(Number((t==null?void 0:t[0])??0)),se(Number((t==null?void 0:t[1])??0)),se(Number((t==null?void 0:t[2])??0))],r=Es(n),i=Zn(r).hex;return{color:i,filterValue:Pi(r),title:`${i} · bin ${r}`}}):[]}function A$(e){const t={r:se(e.color_r_mean??.72),g:se(e.color_g_mean??.66),b:se(e.color_b_mean??.54)},n=my(t.r,t.g,t.b),r=se((e.color_l_std||.18)/.32);return[$r(n.h,n.s*.78,Math.max(.12,n.l-.28-r*.08)),$r(n.h-8,n.s*.92,Math.max(.22,n.l-.12)),$r(n.h,n.s,n.l),$r(n.h+6,n.s*.72,Math.min(.86,n.l+.16)),$r(n.h,n.s*.48,Math.min(.94,n.l+.3+r*.04))]}function ar(e=!1){if(!$.paletteSwatches)return;$.paletteSwatches.innerHTML="";const t=h.generatedMode==="selected"?z$(h.selected):[],n=t.length?t:A$(yl()).map(r=>({color:r,filterValue:"",title:r}));for(const r of n){const i=document.createElement("button");i.type="button",i.className="palette-swatch",i.style.background=r.color,i.title=r.title,i.setAttribute("aria-label",`Filter by ${r.color}`),i.setAttribute("aria-pressed",r.filterValue&&h.categoryFilters.color===r.filterValue?"true":"false"),i.disabled=!r.filterValue,i.addEventListener("click",()=>{r.filterValue&&(h.categoryFilters.color=h.categoryFilters.color===r.filterValue?"":r.filterValue,window.dispatchEvent(new CustomEvent("shellspace:color-filter-changed")))}),$.paletteSwatches.append(i)}}const N$=250;function Nn({resetRenderKey:e=!1}={}){window.clearTimeout(h.neighborHydrationTimer),h.neighborHydrationTimer=0,h.neighborHydrationItems=[];for(const t of h.neighborHydrationUnsubscribers||[])t();h.neighborHydrationUnsubscribers=[],e&&(h.neighborRenderKey="")}function kh(e,t,n=""){$.sourceImage.hidden=!1,$.sourceSpinner&&($.sourceSpinner.hidden=!1),$.sourceImage.dataset.fallbackApplied="false",$.sourceImage.alt=n,$.sourceImage.onerror=()=>{$.sourceImage.removeAttribute("src"),$.sourceSpinner&&($.sourceSpinner.hidden=!0)},$.sourceImage.onload=()=>{$.sourceSpinner&&($.sourceSpinner.hidden=!0),ar(!1)},$.sourceImage.src=e}async function Sy(e,{preferFastSource:t=!1}={}){if(!e)return;const n=++h.sourceToken,r=h.selectionRun;if(window.clearTimeout(h.sourceLoadTimer),$.sourceSpinner&&($.sourceSpinner.hidden=!1),h.uploadImageUrl&&e.id<0){kh(h.uploadImageUrl,e,e.species);return}$.sourceImage.hidden=!0,h.sourceFrame=null,h.sourceMode="python",ar(!1);const i=$.statusLine.textContent;h.sourceLoadTimer=window.setTimeout(async()=>{if(r!==h.selectionRun||n!==h.sourceToken||h.selected!==e)return;const a=await Bv(e,{priority:10});Kb(i),!(r!==h.selectionRun||n!==h.sourceToken||h.selected!==e)&&(a!=null&&a.imageUrl?kh(a.imageUrl,e,e.species):$.sourceSpinner&&($.sourceSpinner.hidden=!0))},t?80:N$)}function xl(){const e=[];for(const t of[h.xAxis,h.yAxis])Number.isInteger(t)&&t>=0&&!e.includes(t)&&e.push(t);return e.length?e:[0,1]}function P$(e){var i,a;const t=(a=(i=h.model)==null?void 0:i.contour_pca_ranges)==null?void 0:a[e];if(!t)return 1;const n=Math.abs((t.p99??0)-(t.p01??0)),r=Math.abs((t.max??0)-(t.min??0));return Math.max(.001,n||r||1)}function vl(e,t,n=null){let r=0,i=0;const a=e.contour_pc||[],o=n!=null&&n.length?n:Array.from({length:Math.min(4,a.length,t.length)},(l,u)=>u);let s=0;for(const l of o){if(l>=a.length||l>=t.length)continue;const u=(a[l]||0)-(t[l]||0);r+=u**2,i+=(u/P$(l))**2,s+=1}return{rawSq:r,normalizedSq:i,dimensions:s}}function ky(e){if(!e.dimensions)return 0;const t=Math.sqrt(e.normalizedSq),n=Math.sqrt(e.dimensions);return Math.max(0,Math.min(100,(1-t/n)*100))}function R$(e,t,n){if(e.length<n){e.push(t);return}let r=0,i=e[0].distance;for(let a=1;a<e.length;a+=1)e[a].distance>i&&(i=e[a].distance,r=a);t.distance<i&&(e[r]=t)}function O$(e){return e.sort((t,n)=>t.distance-n.distance).map(t=>({distance:Math.sqrt(t.stats.rawSq),similarity:ky(t.stats),shell:t.shell}))}function Cy(e,{axes:t=null,limit:n=4,excludeId:r=null,cacheId:i=null}={}){const a=++h.neighborSearchRun;window.clearTimeout(h.neighborSearchTimer);const o=h.filtered.length?h.filtered:h.shells,s=[];let l=0;const u=()=>{var m;if(a!==h.neighborSearchRun)return;const d=performance.now()+5;for(;l<o.length&&performance.now()<d;l+=1){const g=o[l];if(g.id===r||!((m=g.contour_pc)!=null&&m.length))continue;const b=vl(g,e,t);R$(s,{distance:b.normalizedSq,stats:b,shell:g},n)}if(l<o.length){h.neighborSearchTimer=window.setTimeout(u,0);return}const p=O$(s);i!=null&&h.neighborCache.set(i,p),$l(p)};h.neighborSearchTimer=window.setTimeout(u,0)}function $l(e){const t=e.map(r=>r.shell.id).join("|");if(h.neighborRenderKey===t&&h.neighborHydrationItems.length)return;h.neighborRenderKey=t,$.neighborsList.innerHTML="",Nn();const n=[];for(const r of e){const i=document.createElement("button");i.className="neighbor-button";const a=Number.isFinite(r.similarity)?r.similarity:0;i.title=`${r.shell.species} (${At(a,1)}% similar, distance ${At(r.distance,3)})`;const o=document.createElement("canvas");o.width=160,o.height=116,o.className="neighbor-contour",Ty(o,r.shell);const s=document.createElement("img");s.setAttribute("aria-label",r.shell.species),s.alt=r.shell.species,s.hidden=!0,s.onload=()=>{s.hidden=!1,o.hidden=!0};const l=document.createElement("span");l.textContent=`${Math.round(a)}%`,i.append(o,s,l),i.addEventListener("click",()=>{Yr(r.shell),dn(r.shell)});const u=()=>Ey(r.shell,t);i.addEventListener("pointerenter",u),i.addEventListener("focus",u),$.neighborsList.append(i);const d=Nv(r.shell,p=>{h.neighborRenderKey!==t||!s.isConnected||!(p!=null&&p.src)||(s.src=p.src,s.hidden=!1,o.hidden=!0)});h.neighborHydrationUnsubscribers.push(d),n.push({image:s,shell:r.shell})}h.neighborHydrationItems=n}function Ty(e,t){const n=e.getContext("2d"),r=bl(t);if(n.clearRect(0,0,e.width,e.height),!r)return;const i=e.width/2,a=e.height/2,o=Math.min(e.width,e.height)*.4/_l([r]),s=n.createLinearGradient(0,e.height*.22,e.width,e.height*.86);s.addColorStop(0,"#f7ead0"),s.addColorStop(1,"#c98f72"),En(n,r,i,a,o),n.fillStyle=s,n.strokeStyle="rgba(59, 77, 76, 0.72)",n.lineWidth=2,n.fill(),n.stroke(),n.save(),En(n,r,i,a,o),n.clip(),n.strokeStyle="rgba(255, 255, 255, 0.22)",n.lineWidth=1.1;for(let d=1;d<=2;d+=1)En(n,r,i,a,o*(.34+d*.2)),n.stroke();n.strokeStyle="rgba(64, 44, 38, 0.1)",n.lineWidth=1;const l=Math.floor(r.length/2),u=Math.max(12,Math.floor(l/10));for(let d=0;d<l;d+=u){const p=r[d*2],m=r[d*2+1];n.beginPath(),n.moveTo(i+p*o*.25,a+m*o*.25),n.lineTo(i+p*o*.94,a+m*o*.94),n.stroke()}n.restore()}function Ey(e,t){!e||h.neighborRenderKey!==t||(window.clearTimeout(h.neighborHydrationTimer),h.neighborHydrationTimer=window.setTimeout(()=>{if(h.neighborHydrationTimer=0,h.draggingTarget){Ey(e,t);return}h.neighborRenderKey===t&&Hr(e,{priority:-5})},120))}function B$(e,t=h.neighborToken){if(!e||t!==h.neighborToken){h.neighborRenderKey="",h.neighborSearchRun+=1,window.clearTimeout(h.neighborSearchTimer),h.neighborSearchTimer=0,Nn(),$.neighborsList.innerHTML="";return}if(h.neighborCache.has(e.id)){$l(h.neighborCache.get(e.id));return}Cy(e.contour_pc||[],{excludeId:e.id,cacheId:e.id})}function Iy(e,t=null){if(h.neighborToken+=1,window.clearTimeout(h.neighborTimer),h.neighborSearchRun+=1,window.clearTimeout(h.neighborSearchTimer),h.neighborSearchTimer=0,Nn({resetRenderKey:!0}),t){$l(t);return}Cy(e.slice(),{axes:xl()})}function L$(){window.clearTimeout(h.targetNeighborTimer),h.targetNeighborTimer=0,h.targetNeighborValues=null,h.neighborSearchRun+=1,window.clearTimeout(h.neighborSearchTimer),h.neighborSearchTimer=0,Nn({resetRenderKey:!0})}function Ch(){const e=h.pendingSelectShell;h.pendingSelectShell=null,e&&dn(e,{preferFastSource:!0})}function Ki(e,t=0){h.neighborToken+=1;const n=h.neighborToken;if(window.clearTimeout(h.neighborTimer),Nn({resetRenderKey:!0}),!e){h.neighborRenderKey="",h.neighborSearchRun+=1,window.clearTimeout(h.neighborSearchTimer),h.neighborSearchTimer=0,Nn({resetRenderKey:!0}),$.neighborsList.innerHTML="";return}h.neighborTimer=window.setTimeout(()=>{B$(e,n)},t)}function Go(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_key)||(e==null?void 0:e.location_key)||"unknown"}function $s(e){var t;return(e==null?void 0:e._filterCountryItems)||ia((e==null?void 0:e.countries_top)||((t=e==null?void 0:e.enrichment)==null?void 0:t.countries_top)||"")}function He(){return h.attributeMode==="color"}function Sl(e){const t=String(h.colorMode||"");return t===e?"":t.startsWith(`range:${e}:`)?t.slice(`range:${e}:`.length):null}function jt(e){const t=String(h.colorMode||"");return e==="taxonomy"?t==="taxonomy"?"":t.startsWith("taxonomy:")?t.slice(9):null:e==="origin"?t==="origin"?"":t.startsWith("origin:")?t.slice(7):null:e==="habitat"?t==="habitat"?"":t.startsWith("habitat:")?t.slice(8):null:e==="color"?t==="color"||t==="shell"?"":t.startsWith("palette:")?t.slice(8):null:e==="rarity"?t==="rarity"?"":t.startsWith("rarity:")?t.slice(7):null:null}function Gn(e){h.colorMode=e,h.pointColorCache.clear(),la(),Pe(),Bt(),fa()}function Kr(e,t){const n=String(t||"");e==="taxonomy"?Gn(n?`taxonomy:${n}`:"taxonomy"):e==="origin"?Gn(n?`origin:${n}`:"origin"):e==="habitat"?Gn(jt("habitat")===n?"habitat":`habitat:${n}`):e==="color"?Gn(jt("color")===n?"color":`palette:${n}`):e==="rarity"&&Gn(jt("rarity")===n?"rarity":`rarity:${n}`)}function D$(e,t){Gn(Sl(e)===t?e:`range:${e}:${t}`)}function pa(e){if(!He())return h.categoryFilters[e]||"";const t=jt(e);return t??""}function My(e){if(!He()){const t=h.morphFilters.get(e),n=t&&In.find(r=>Math.abs(t.min-r.min)<.01&&Math.abs(t.max-r.max)<.01);return(n==null?void 0:n.key)||""}return Sl(e)||""}function Pn(e){return He()?jt(e)==null?"Not selected":Hn(h.colorMode):e==="origin"?Wy(h.categoryFilters.origin):e==="taxonomy"?h.categoryFilters.taxonomy||"Any":e==="habitat"?q$(h.categoryFilters.habitat):e==="rarity"?h.categoryFilters.rarity||"Any":e==="color"?H$(h.categoryFilters.color):"Any"}function zy(e){if(!He()){const r=h.morphFilters.get(e),i=r&&In.find(a=>Math.abs(r.min-a.min)<.01&&Math.abs(r.max-a.max)<.01);return(i==null?void 0:i.label)||"Any"}const t=Sl(e);if(t==null)return"Not selected";const n=In.find(r=>r.key===t);return(n==null?void 0:n.label)||"Gradient"}function Ay(){var t,n;const e=He();(t=$.attributeFilterMode)==null||t.setAttribute("aria-pressed",e?"false":"true"),(n=$.attributeColorMode)==null||n.setAttribute("aria-pressed",e?"true":"false"),$.resetTraitFilters&&($.resetTraitFilters.textContent=e?"Reset color":"Reset filters",$.resetTraitFilters.title=e?"Reset color":"Reset filters")}function F$(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_label)||(e==null?void 0:e.region_label)||(e==null?void 0:e.location_label)||"Unknown"}function U$(e,t){var i,a,o,s;if(!t)return!0;const[n,r]=t.split(":");if(!r)return Go(e)===t;if(n==="country-search"){const l=r.trim().toLowerCase();return l?((e==null?void 0:e._filterCountrySearchText)||"").includes(l)||$s(e).some(u=>sx(u.code).includes(l)):!0}return n==="region"?((i=e==null?void 0:e.species_traits)==null?void 0:i.region_key)===r||(e==null?void 0:e.region_key)===r||(e==null?void 0:e.location_key)===r||Go(e)===r:n==="country"?(e==null?void 0:e.location_key)===r||((a=e==null?void 0:e.species_traits)==null?void 0:a.primary_country)===r||(((o=e==null?void 0:e.species_traits)==null?void 0:o.known_range_countries)||[]).some(l=>l.code===r)||((s=e==null?void 0:e._filterCountryCodes)==null?void 0:s.has(r))||$s(e).some(l=>l.code===r):Go(e)===t}function W$(e){const t=String(e||"").trim().toLowerCase();return t&&!["unknown","not assessed","data deficient","locality unavailable"].includes(t)}function Ny(e){if(e!=null&&e._filterTaxonomyText)return e._filterTaxonomyText;const t=(e==null?void 0:e.enrichment)||{};return[t.aphia_class,t.aphia_order,t.aphia_family,t.aphia_genus,t.aphia_scientific_name,t.aphia_accepted_name,t.aphia_classification_path,e==null?void 0:e.species,e==null?void 0:e.name].filter(Boolean).join(" ").toLowerCase()}function Py(){return Xr().habitats}function q$(e){var t;return e&&((t=Vr.find(n=>n.key===e))==null?void 0:t.label)||"Any"}function Ry(e=h.shells){var t,n,r;for(const i of e||[]){const a=(i==null?void 0:i.enrichment)||{},o=ia((i==null?void 0:i.countries_top)||a.countries_top||"");i._filterCountryItems=o,i._filterCountryCodes=new Set([i==null?void 0:i.location_key,(t=i==null?void 0:i.species_traits)==null?void 0:t.primary_country,...(((n=i==null?void 0:i.species_traits)==null?void 0:n.known_range_countries)||[]).map(s=>s.code),...o.map(s=>s.code)].filter(Boolean).map(s=>String(s).toUpperCase())),i._filterCountrySearchText=[i==null?void 0:i.location_label,...(((r=i==null?void 0:i.species_traits)==null?void 0:r.known_range_countries)||[]).flatMap(s=>[s.label,s.code]),...o.flatMap(s=>[s.name,s.code])].filter(Boolean).join(" ").toLowerCase(),i._filterHabitatKeys=On(i),i._filterHabitatSet=new Set(i._filterHabitatKeys),i._filterTaxonomyText=Ny(i),i._filterSearchText=[i==null?void 0:i.name,i==null?void 0:i.species,i==null?void 0:i.file,i==null?void 0:i.fingerprint_hash,i==null?void 0:i.legacy_fingerprint_hash,i==null?void 0:i.location_label].filter(Boolean).join(" ").toLowerCase()}h.originFilterOptionsCache=null,h.filterOptionsCache=null}function Xr(){if(h.filterOptionsCache)return h.filterOptionsCache;const e=new Set,t=new Map;for(const i of h.shells){W$(i.rarity_label)&&e.add(i.rarity_label);for(const a of i._filterHabitatKeys||On(i))t.set(a,(t.get(a)||0)+1)}const n=ox(h.shells),r=n.length>0||h.shells.some(i=>Oy(i).length||i.color_r_mean!=null&&i.color_g_mean!=null&&i.color_b_mean!=null&&Number.isFinite(Number(i.color_r_mean))&&Number.isFinite(Number(i.color_g_mean))&&Number.isFinite(Number(i.color_b_mean)));return h.filterOptionsCache={rangeDefs:Cs.filter(i=>h.shells.some(a=>kl(a,i.key)!=null)),rarityOptions:Ic.filter(i=>e.has(i)).concat([...e].filter(i=>!Ic.includes(i)).sort()),habitats:Vr.map(i=>({...i,count:t.get(i.key)||0})).filter(i=>i.count>0),colorOptions:n,hasColorData:r},h.filterOptionsCache}function V$(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}:null}function Oy(e){return Array.isArray(e.color_palette_rgb)&&e.color_palette_rgb.length?e.color_palette_rgb.map(t=>[Number((t==null?void 0:t[0])??0)*255,Number((t==null?void 0:t[1])??0)*255,Number((t==null?void 0:t[2])??0)*255]).filter(t=>t.every(n=>Number.isFinite(n))):[]}function kl(e,t){var n;return t==="lightness"?e.color_l_mean==null?null:se(e.color_l_mean):t==="area"?e.area==null||e.image_width==null||e.image_height==null?null:py(e):t==="concavity"?e.contour_concavity==null?null:se(e.contour_concavity/.32):t==="roughness"?((n=e.morph_traits)==null?void 0:n.roughness)==null?null:se(e.morph_traits.roughness):null}function Cl(){return Xr().rangeDefs}function By(){return Xr().rarityOptions}function Ly(){return Xr().hasColorData}function Tl(){return Xr().colorOptions}function H$(e){if(!e)return"Any";const t=qr(e),n=t==null?null:Tl().find(r=>r.bin===t);return(n==null?void 0:n.hex)||e}function G$(){const e=Cl().map(l=>({def:l,filter:h.morphFilters.get(l.key)})).filter(({filter:l})=>l&&(l.min>0||l.max<1)),t=h.categoryFilters.rarity||"",n=h.categoryFilters.origin||"",r=String(h.categoryFilters.taxonomy||"").trim().toLowerCase().split(/\s+/).filter(Boolean),i=h.categoryFilters.habitat||"",a=h.categoryFilters.color||"",o=qr(a),s=o==null?V$(a):null;return l=>{for(const{def:u,filter:d}of e){const p=kl(l,u.key);if(p!=null&&(p<d.min||p>d.max))return!1}if(t&&l.rarity_label!==t||n&&!U$(l,n))return!1;if(r.length){const u=l._filterTaxonomyText||Ny(l);for(const d of r)if(!u.includes(d))return!1}if(i&&!(l._filterHabitatSet||new Set(On(l))).has(i))return!1;if(a)if(o!=null){if(!tm(l,o))return!1}else{const u=j$(l,s);if(u!=null&&u>42)return!1}return!0}}function j$(e,t){if(!t)return 1/0;const n=Oy(e);if(n.length){let s=1/0;for(const l of n){const u=l[0]-t.r,d=l[1]-t.g,p=l[2]-t.b,m=Math.sqrt(u*u+d*d+p*p);m<s&&(s=m)}return s}if(e.color_r_mean==null||e.color_g_mean==null||e.color_b_mean==null)return null;const r=bs(e),i=r[0]-t.r,a=r[1]-t.g,o=r[2]-t.b;return Math.sqrt(i*i+a*a+o*o)}function Ot({refreshControls:e=!1}={}){var r,i;e&&Fr();const t=$.search.value.trim().toLowerCase(),n=G$();h.filtered=t?h.shells.filter(a=>(a._filterSearchText||"").includes(t)&&n(a)):h.shells.filter(n),h.scatterHitCache=null,h.scatterPointCache=null,px(),rm(),Ki(h.selected),ar(!1),$.statusLine&&((r=h.model)!=null&&r.processed_count)&&($.statusLine.textContent=`${h.filtered.length.toLocaleString()} of ${h.model.processed_count.toLocaleString()} shells`),Dy(),Pe(120),((i=$.filtersPanel)==null?void 0:i.hidden)===!1&&fa()}function fa(){if(!$.filterControls)return;Ay();for(const r of $.filterControls.querySelectorAll("[data-filter-output]")){const i=r.dataset.filterOutput;["origin","taxonomy","habitat","rarity","color"].includes(i)?r.textContent=Pn(i):i!=null&&i.startsWith("range:")&&(r.textContent=zy(i.slice(6)))}for(const r of $.filterControls.querySelectorAll("[data-category-filter]")){const i=r.dataset.categoryFilter;r.setAttribute("aria-pressed",pa(i)===r.dataset.filterValue?"true":"false")}for(const r of $.filterControls.querySelectorAll("[data-range-filter]"))r.setAttribute("aria-pressed",My(r.dataset.rangeFilter)===r.dataset.level?"true":"false");const e=$.filterControls.querySelector("[data-filter-input='taxonomy']"),t=He()?jt("taxonomy")||"":h.categoryFilters.taxonomy||"";e&&e.value!==t&&(e.value=t);const n=$.filterControls.querySelector("[data-filter-input='origin']");if(n&&document.activeElement!==n){const r=He()?jt("origin")||"":h.categoryFilters.origin||"";n.value=r!=null&&r.startsWith("country-search:")?r.slice(15):Wy(r),n.value==="Any"&&(n.value=""),n.value==="Countries"&&(n.value="")}}function Dy(){if(!$.filtersToggle)return;let e=0;for(const t of Cl()){const n=h.morphFilters.get(t.key);n&&(n.min>0||n.max<1)&&(e+=1)}for(const t of Object.values(h.categoryFilters))t&&(e+=1);$.filtersToggle.textContent=e?`Attributes (${e})`:"Attributes",$.filtersToggle.classList.toggle("is-active",e>0)}function Fy(){return[...Uy().countries.map(e=>[e.value,e.label])]}function Uy(){var n,r,i,a,o,s;const e=new Map,t=new Map;if(h.originFilterOptionsCache)return h.originFilterOptionsCache;for(const l of h.shells){const u=((n=l.species_traits)==null?void 0:n.region_key)||l.region_key||"",d=((r=l.species_traits)==null?void 0:r.region_label)||l.region_label||"";if(u&&u!=="unknown"){const m=`region:${u}`,g=e.get(m)||{value:m,key:u,label:d||F$(l),count:0};g.count+=1,e.set(m,g)}for(const m of((i=l.species_traits)==null?void 0:i.known_range_countries)||[]){if(!m.code||!m.label)continue;const g=`country:${m.code}`,b=t.get(g)||{value:g,code:m.code,label:Xn(m.code)||m.label,region:((a=l.species_traits)==null?void 0:a.region_key)||"",count:0};b.count+=Math.max(1,Number(m.count||0)),t.set(g,b)}for(const m of $s(l)){const g=`country:${m.code}`,b=Xn(m.code);if(!b)continue;const _=t.get(g)||{value:g,code:m.code,label:b,region:"",count:0};_.count+=m.count,t.set(g,_)}const p=l.location_key||"";if(p&&p!=="unknown"&&p.length<=3){const m=`country:${p}`,g=t.get(m)||{value:m,code:p,label:Xn(p)||((o=l.location_label)==null?void 0:o.split(",")[0])||p,region:((s=l.species_traits)==null?void 0:s.region_key)||"",count:0};g.count+=1,t.set(m,g)}}return h.originFilterOptionsCache={regions:[...e.values()].sort((l,u)=>l.label.localeCompare(u.label)),countries:[...t.values()].sort((l,u)=>l.label.localeCompare(u.label)||l.code.localeCompare(u.code))},h.originFilterOptionsCache}function K$(){const e=document.createElement("label");e.className="filter-row filter-panel-card filter-select-row filter-origin-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Country";const r=document.createElement("output");r.dataset.filterOutput="origin",r.textContent=Pn("origin"),t.append(n,r);const i=document.createElement("input"),a=document.createElement("datalist"),o=Fy(),s=new Map(o.map(([p,m])=>[m.toLowerCase(),p])),l=new Map(o),u="country-filter-options";a.id=u,i.type="search",i.placeholder="Search country",i.dataset.filterInput="origin",i.setAttribute("aria-label","Country"),i.setAttribute("list",u);for(const[p,m]of o){const g=document.createElement("option");g.value=m,g.label=p.replace(/^country:/,""),g.textContent=m,a.append(g)}const d=He()?jt("origin")||"":h.categoryFilters.origin||"";d!=null&&d.startsWith("country-search:")?i.value=d.slice(15):d&&(i.value=l.get(d)||""),i.addEventListener("input",()=>{const p=i.value.trim(),m=p?s.get(p.toLowerCase())||`country-search:${p}`:"";if(He()){Kr("origin",m);return}h.categoryFilters.origin=m,Ot()}),e.append(t,i,a),$.filterControls.append(e)}function X$(){const e=By();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card rarity-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Rarity";const i=document.createElement("output");i.dataset.filterOutput="rarity",i.textContent=Pn("rarity"),n.append(r,i);const a=document.createElement("div");a.className="rarity-filter-options";for(const o of e){const s=document.createElement("button");s.type="button",s.textContent=o||"Any",s.dataset.categoryFilter="rarity",s.dataset.filterValue=o,s.setAttribute("aria-pressed",pa("rarity")===o?"true":"false"),s.addEventListener("click",()=>{if(He()){Kr("rarity",o);return}h.categoryFilters.rarity=h.categoryFilters.rarity===o?"":o,Ot()}),a.append(s)}t.append(n,a),$.filterControls.append(t)}function Wy(e){if(!e)return"Any";if(e.startsWith("country-search:"))return e.slice(15);const t=Uy(),n=[...t.regions,...t.countries].find(r=>r.value===e);return(n==null?void 0:n.label)||"Any"}function Y$(){const e=document.createElement("label");e.className="filter-row filter-panel-card filter-select-row filter-taxonomy-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Taxonomy";const r=document.createElement("output");r.dataset.filterOutput="taxonomy",r.textContent=Pn("taxonomy"),t.append(n,r);const i=document.createElement("input");i.type="search",i.placeholder=He()?"Taxon to highlight, or blank for families":"Class, order, family, genus",i.value=He()?jt("taxonomy")||"":h.categoryFilters.taxonomy||"",i.dataset.filterInput="taxonomy",i.setAttribute("aria-label","Taxonomy"),i.addEventListener("input",()=>{const a=i.value.trim();if(He()){Kr("taxonomy",a),r.textContent=Pn("taxonomy");return}h.categoryFilters.taxonomy=a,r.textContent=a||"Any",Ot()}),e.append(t,i),$.filterControls.append(e)}function Q$(){const e=Py();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card habitat-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Habitat";const i=document.createElement("output");i.dataset.filterOutput="habitat",i.textContent=Pn("habitat"),n.append(r,i);const a=document.createElement("div");a.className="habitat-filter-options";for(const{key:o,label:s,icon:l,count:u}of e){const d=document.createElement("button");d.type="button",d.title=`${s} · ${u.toLocaleString()} shells`,d.dataset.categoryFilter="habitat",d.dataset.filterValue=o,d.setAttribute("aria-label",s),d.setAttribute("aria-pressed",pa("habitat")===o?"true":"false");const p=document.createElement("span");p.className=`habitat-icon habitat-${o}`,p.innerHTML=l,d.append(p),d.addEventListener("click",()=>{if(He()){Kr("habitat",o);return}h.categoryFilters.habitat=h.categoryFilters.habitat===o?"":o,Ot()}),a.append(d)}t.append(n,a),$.filterControls.append(t)}function Z$(e){h.morphFilters.set(e.key,h.morphFilters.get(e.key)||{min:0,max:1});const t=document.createElement("div");t.className=`filter-row filter-panel-card filter-range-row filter-${e.key}-row`;const n=document.createElement("header"),r=document.createElement("span");r.textContent=e.label;const i=document.createElement("output");i.dataset.filterOutput=`range:${e.key}`;const a=My(e.key);i.textContent=zy(e.key),n.append(r,i);const o=document.createElement("div");o.className="filter-levels";for(const s of In){const l=document.createElement("button");l.type="button",l.dataset.level=s.key,l.dataset.rangeFilter=e.key,l.textContent=s.label,l.title=`${e.label}: ${s.label}`;const u=a===s.key;l.setAttribute("aria-pressed",u?"true":"false"),l.addEventListener("click",()=>{if(He()){D$(e.key,s.key);return}const d=l.getAttribute("aria-pressed")==="true";h.morphFilters.set(e.key,d?{min:0,max:1}:{min:s.min,max:s.max}),Ot()}),o.append(l)}t.append(n,o),$.filterControls.append(t)}function J$(){if(!Ly())return;const e=Tl();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card color-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Color";const i=document.createElement("output");i.dataset.filterOutput="color",i.textContent=Pn("color"),n.append(r,i);const a=document.createElement("div");a.className="color-filter-panel";const o=document.createElement("div");o.className="color-swatch-filter";const l=[12,11,10,9,8,7,6,5].find(u=>e.length>=u&&e.length%u<=1)||Math.min(10,Math.max(5,Math.ceil(Math.sqrt(e.length*1.4))));o.style.setProperty("--color-filter-columns",String(l));for(const{bin:u,hex:d,count:p,weight:m}of e){const g=Pi(u),b=document.createElement("button");b.type="button",b.title=`${d} · bin ${u} · ${p} shells · weight ${m.toFixed(2)}`,b.dataset.categoryFilter="color",b.dataset.filterValue=g,b.setAttribute("aria-label",`${d} color bin`),b.setAttribute("aria-pressed",pa("color")===g?"true":"false"),b.style.setProperty("--swatch",d);const _=document.createElement("span");_.className="color-swatch-dot",b.append(_),b.addEventListener("click",()=>{if(He()){Kr("color",g);return}h.categoryFilters.color=h.categoryFilters.color===g?"":g,Ot()}),o.append(b)}a.append(o),t.append(n,a),$.filterControls.append(t)}function Fr(){if(!$.filterControls)return;Ay(),$.filterControls.innerHTML="";const e=Fy(),t=By(),n=Cl();h.categoryFilters.origin&&!h.categoryFilters.origin.startsWith("country-search:")&&!e.some(([i])=>i===h.categoryFilters.origin)&&(h.categoryFilters.origin=""),t.includes(h.categoryFilters.rarity)||(h.categoryFilters.rarity=""),h.categoryFilters.habitat&&!Py().some(i=>i.key===h.categoryFilters.habitat)&&(h.categoryFilters.habitat="");const r=Tl().filter(i=>i.count>0);h.categoryFilters.color&&!r.some(i=>Pi(i.bin)===h.categoryFilters.color)&&(h.categoryFilters.color=""),Ly()||(h.categoryFilters.color="");for(const i of Cs)n.includes(i)||h.morphFilters.set(i.key,{min:0,max:1});Y$(),Q$(),e.length&&K$(),J$();for(const i of n)h.morphFilters.has(i.key)||h.morphFilters.set(i.key,{min:0,max:1}),Z$(i);X$(),Dy()}function e3(){if(He()){h.colorMode="roughness",h.pointColorCache.clear(),Fr(),la(),Pe(),Bt();return}for(const e of Cs)h.morphFilters.set(e.key,{min:0,max:1});h.categoryFilters={origin:"",taxonomy:"",habitat:"",rarity:"",color:""},Fr(),Ot()}function Th(e){const t=e==="color"?"color":"filter";h.attributeMode!==t&&(h.attributeMode=t,Fr(),fa())}function Xi(){var m;if(!$.filtersPanel||!$.filtersToggle||$.filtersPanel.hidden)return;const e=window.innerWidth||document.documentElement.clientWidth||1024,t=window.innerHeight||document.documentElement.clientHeight||768,n=$.filtersToggle.getBoundingClientRect(),r=(m=$.controlsPanel)==null?void 0:m.getBoundingClientRect(),i=r?e-r.right-24:0,a=e>1080&&i>=520,o=a?Math.min(460,i):Math.min(460,Math.max(340,e-24)),s=a?r.right+12:n.left,l=Math.max(12,Math.min(s,e-o-12)),u=$.filtersPanel.offsetHeight||420,d=a?n.top:n.bottom+8,p=Math.max(12,Math.min(d,t-Math.min(u,t-24)-12));$.filtersPanel.style.setProperty("--filters-left",`${Math.round(l)}px`),$.filtersPanel.style.setProperty("--filters-top",`${Math.round(p)}px`),$.filtersPanel.style.setProperty("--filters-width",`${Math.round(o)}px`)}function jo(e){!$.filtersPanel||!$.filtersToggle||($.filtersPanel.hidden=!e,$.filtersToggle.setAttribute("aria-expanded",e?"true":"false"),e&&(fa(),Xi(),window.requestAnimationFrame(Xi)))}let Qn=0,qy=0;function t3(){try{const e=JSON.parse(localStorage.getItem(ks)||"[]");h.starredIds=Array.isArray(e)?e.filter(t=>Number.isFinite(Number(t))).map(Number):[]}catch{h.starredIds=[]}}function n3(){localStorage.setItem(ks,JSON.stringify(h.starredIds.slice(0,80)))}function Vy(e){return!!(e&&h.starredIds.includes(e.id))}function Hy(){if(!$.starShell)return;const e=Vy(h.selected);$.starShell.setAttribute("aria-pressed",e?"true":"false"),$.starShell.title=e?"Unstar this shape":"Star this shape",$.starShell.setAttribute("aria-label",e?"Unstar this shape":"Star this shape")}function r3(){if(!h.selected)return;window.clearTimeout(h.neighborTimer);const e=h.selected.id,t=Vy(h.selected);h.starredIds=h.starredIds.filter(n=>n!==e),t||(h.starredIds.unshift(e),window.requestAnimationFrame(()=>{$.starShell.classList.remove("star-pop"),$.starShell.classList.add("star-pop"),i3(),window.setTimeout(()=>$.starShell.classList.remove("star-pop"),850)})),Hy(),ha(),window.setTimeout(n3,0)}function i3(){var o;if(!$.starBurst||!$.starShell)return;const e=$.starShell.getBoundingClientRect(),t=(o=$.starredBand)==null?void 0:o.getBoundingClientRect(),n=e.left+e.width/2,r=e.top+e.height/2,i=t?t.left+Math.min(70,t.width*.4):n,a=t?t.top+t.height/2:r-60;$.starBurst.style.setProperty("--burst-start-x",`${n}px`),$.starBurst.style.setProperty("--burst-start-y",`${r}px`),$.starBurst.style.setProperty("--burst-end-x",`${i}px`),$.starBurst.style.setProperty("--burst-end-y",`${a}px`),$.starBurst.innerHTML="";for(let s=0;s<9;s+=1){const l=document.createElement("span");l.style.setProperty("--spark-angle",`${s*40-20}deg`),l.style.setProperty("--spark-distance",`${24+s%3*10}px`),l.style.setProperty("--spark-delay",`${s*18}ms`),$.starBurst.append(l)}$.starBurst.classList.remove("is-active"),$.starBurst.offsetWidth,$.starBurst.classList.add("is-active"),window.setTimeout(()=>$.starBurst.classList.remove("is-active"),900)}function a3(){var i;if(h.showAllStars){const a=[];for(const o of h.starredIds){const s=Ji(o);s&&a.push({shell:s})}return{items:a,hidden:0}}const e=Math.max(44,((i=$.starredBand)==null?void 0:i.clientWidth)||0),t=[];let n=0,r=0;for(let a=0;a<h.starredIds.length;a+=1){const o=Ji(h.starredIds[a]);if(!o)continue;const s={shell:o},l=71,u=h.starredIds.length-a-1,d=u>0?54:0;if(t.length>0&&n+l+d>e){r=u+1;break}t.push(s),n+=l}return{items:t,hidden:r}}function ha(){if(!$.starredBand)return;$.starredBand.innerHTML="",h.starredHydratedCount=0,h.starredThumbs=[];const{items:e,hidden:t}=a3();for(const{shell:n}of e){const r=document.createElement("button");r.className="starred-shell",r.title=`${n.species} ${n.fingerprint_hash}`,r.dataset.shellId=String(n.id);const i=document.createElement("img");i.alt=n.species,r.append(i),h.starredThumbs.push({button:r,image:i,shell:n}),r.addEventListener("click",()=>{Yr(n),dn(n)}),$.starredBand.append(r),dl(i,n)}if(t>0||h.showAllStars){const n=document.createElement("button");n.className="starred-more",n.textContent=h.showAllStars?"Less":`+${t}`,n.title=h.showAllStars?"Show fewer starred shells":"Show all starred shells",n.addEventListener("click",()=>{h.showAllStars=!h.showAllStars,ha()}),$.starredBand.append(n)}Ir(0)}async function o3({limit:e=80,onProgress:t=null}={}){const n=[];for(const a of h.starredIds.slice(0,e)){const o=Ji(a);o!=null&&o.file&&n.push(o)}const r=n.filter(a=>!oa(a)&&!cl(a));let i=0;for(const a of n)t&&r.includes(a)&&t({shell:a,loaded:i,total:r.length}),await Lv(a,{priority:-2}),r.includes(a)&&(i+=1);return t&&r.length&&t({shell:null,loaded:i,total:r.length}),n.length}function Ir(e=3e3){if(!$.starredBand)return;h.starredHydrationRun+=1;const t=h.starredHydrationRun;window.clearTimeout(h.starredHydrationTimer),h.starredHydrationTimer=window.setTimeout(()=>s3(t),e)}async function s3(e){if(!$.starredBand||e!==h.starredHydrationRun)return;const t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,r=h.starredThumbs.filter(({button:i})=>{const a=i.getBoundingClientRect();return a.right>=0&&a.left<=t&&a.bottom>=0&&a.top<=n}).slice(0,18);for(const{image:i,shell:a}of r){if(e!==h.starredHydrationRun)return;if(!(!i||!a)){if(await l3(),e!==h.starredHydrationRun||!i.isConnected)return;dl(i,a)&&(h.starredHydratedCount+=1)}}}function l3(){return new Promise(e=>{"requestIdleCallback"in window?window.requestIdleCallback(e,{timeout:300}):window.setTimeout(e,80)})}function u3(e){qy=e.clientX,!Qn&&(Qn=window.requestAnimationFrame(c3))}function c3(){if(Qn=0,!$.starredBand||!h.starredThumbs.length)return;const e=$.starredBand.getBoundingClientRect();for(const{button:t}of h.starredThumbs){const n=e.left+t.offsetLeft+t.offsetWidth/2,r=Math.max(0,1-Math.abs(qy-n)/118),i=r*r*(3-2*r);t.style.setProperty("--dock-scale",(1+i*1.08).toFixed(3)),t.style.setProperty("--dock-lift",`${(18*i).toFixed(2)}px`),t.style.setProperty("--dock-z",`${Math.round(i*100)}`)}}function Eh(){if($.starredBand){Qn&&(window.cancelAnimationFrame(Qn),Qn=0);for(const{button:e}of h.starredThumbs)e.style.setProperty("--dock-scale","1"),e.style.setProperty("--dock-lift","0px"),e.style.setProperty("--dock-z","0")}}const El="shellspace-pca-axis-names";function d3(){try{const e=JSON.parse(localStorage.getItem(El)||"[]");h.pcaAxisNames=Array.isArray(e)?e.map(t=>String(t||"")):[]}catch{h.pcaAxisNames=[]}}function p3(){try{localStorage.setItem(El,JSON.stringify(h.pcaAxisNames||[]))}catch{}}function Ih(e){return h.shellById.get(Number(e))||null}function f3(e,t,n){const r=h.selectionRun,i=()=>{!e.isConnected||r!==h.selectionRun||Dv(e,n,{priority:-10}).then(a=>{!a&&e.isConnected&&(e.hidden=!0,t.hidden=!1)})};if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(i,{timeout:800});return}window.setTimeout(i,350)}function Mh(e){const t=document.createElement("button");t.type="button",t.className="pca-guide-shell",t.title=(e==null?void 0:e.species)||"";const n=document.createElement("span");n.className="pca-guide-shell-frame";const r=document.createElement("img");r.alt=(e==null?void 0:e.species)||"",r.loading="eager",r.decoding="async",r.hidden=!0;const i=document.createElement("canvas");if(i.width=148,i.height=104,e&&Ty(i,e),r.onload=()=>{r.hidden=!1,i.hidden=!0},r.onerror=()=>{r.hidden=!0,i.hidden=!1},e){const a=dl(r,e);a&&!r.hidden&&(i.hidden=!0),a||f3(r,i,e)}return n.append(r,i),t.append(n),t.addEventListener("click",()=>{e&&(Yr(e),dn(e),Ei())}),t}function h3(e){var l;const t=Ih(e.low_shell_id),n=Ih(e.high_shell_id),r=document.createElement("article");r.className="pca-guide-row";const i=document.createElement("div");i.className="pca-guide-row-header";const a=document.createElement("h3"),o=`PC${e.axis+1}`;a.textContent=((l=h.pcaAxisNames)==null?void 0:l[e.axis])||o,a.contentEditable="true",a.spellcheck=!1,a.setAttribute("role","textbox"),a.setAttribute("aria-label",`Name ${o}`),a.addEventListener("input",()=>{const u=a.textContent.trim();h.pcaAxisNames[e.axis]=u===o?"":u,p3(),fS()}),a.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),a.blur())}),a.addEventListener("blur",()=>{a.textContent.trim()||(a.textContent=o)}),i.append(a);const s=document.createElement("div");return s.className="pca-guide-shells",s.append(Mh(t),Mh(n)),r.append(i,s),r}function m3(){var t;if(!$.pcaGuideList)return;const e=((t=h.model)==null?void 0:t.contour_pca_diametric_pairs)||[];if($.pcaGuideList.innerHTML="",!e.length){const n=document.createElement("p");n.className="pca-guide-empty",n.textContent="No PCA contrast pairs are available yet.",$.pcaGuideList.append(n);return}for(const n of e.slice(0,6))$.pcaGuideList.append(h3(n))}function g3(){m3(),$.pcaGuideModal&&($.pcaGuideModal.hidden=!1)}function Ei(){$.pcaGuideModal&&($.pcaGuideModal.hidden=!0)}function b3(e,t,n,r){let i=0,a=0,o=0,s=t,l=n,u=0,d=0;for(let I=0;I<e.length;I+=1){if(!e[I])continue;const E=I%t,k=Math.floor(I/t);i+=1,a+=E,o+=k,s=Math.min(s,E),l=Math.min(l,k),u=Math.max(u,E),d=Math.max(d,k)}if(i<32)throw new Error("The uploaded shell mask is too small.");const p=a/i,m=o/i,g=Math.ceil(Math.hypot(Math.max(p,t-p),Math.max(m,n-m)))+2,b=[],_=[];for(let I=0;I<r;I+=1){const E=-Math.PI/2+I/r*Math.PI*2,k=Math.cos(E),M=Math.sin(E);let A=p,S=m,P=0;for(let O=0;O<=g;O+=.75){const W=Math.round(p+k*O),G=Math.round(m+M*O);if(W<0||W>=t||G<0||G>=n)break;e[G*t+W]&&(A=W,S=G,P=O)}b.push([A,S]),_.push(P)}const T=_.reduce((I,E)=>I+E,0)/Math.max(1,_.length),x=new Float32Array(r*2);for(let I=0;I<r;I+=1)x[I*2]=(b[I][0]-p)/Math.max(1e-6,T),x[I*2+1]=(b[I][1]-m)/Math.max(1e-6,T);const v=Math.max(1,(u-s+1)*(d-l+1));return{contour:x,center:[p,m],meanRadius:T,area:i,bbox:[s,l,u,d],aspectRatio:Math.max((u-s+1)/Math.max(1,d-l+1),(d-l+1)/Math.max(1,u-s+1)),roughness:hl(x),concavity:se(1-i/v)}}function y3(e,t,n){const{data:r,width:i,height:a}=e,o=new Float32Array(i*a),s=[],l=[],u=[];let d=0,p=0,m=0,g=0,b=0,_=0,T=0,x=0,v=0;for(let ie=0;ie<i*a;ie+=1){const F=ie*4;o[ie]=(.2126*r[F]+.7152*r[F+1]+.0722*r[F+2])/255}for(let ie=0;ie<t.length;ie+=1){if(!t[ie])continue;const F=ie*4,re=r[F],U=r[F+1],j=r[F+2],Q=dv(re,U,j),H=Math.max(re,U,j)/255,_e=Math.min(re,U,j)/255,Ke=H<=0?0:(H-_e)/H,Ie=Math.atan2(Math.sqrt(3)*(U-j),2*re-U-j),Le=Math.max(Ke,.05);d+=re/255,p+=U/255,m+=j/255,g+=Q.l,b+=Q.a,_+=Q.b,T+=Math.sin(Ie)*Le,x+=Math.cos(Ie)*Le,v+=Le,s.push(Q.l),l.push(Math.hypot(Q.a,Q.b)),u.push(Ke)}const I=Math.max(1,s.length),E=ie=>ie.reduce((F,re)=>F+re,0)/Math.max(1,ie.length),k=(ie,F)=>Math.sqrt(ie.reduce((re,U)=>re+(U-F)**2,0)/Math.max(1,ie.length)),M=E(s),A=E(l),S=E(u),P=[...s].sort((ie,F)=>ie-F);let O=0,W=[];for(let ie=1;ie<a-1;ie+=1)for(let F=1;F<i-1;F+=1){const re=ie*i+F;if(!t[re])continue;const U=o[re+1]-o[re-1],j=o[re+i]-o[re-i],Q=(o[re-i]+o[re+i]+o[re-1]+o[re+1]+o[re])/5;O+=Math.hypot(U,j),W.push(o[re]-Q)}const G=E(W),X=k(W,G),R=mh(P,.75)-mh(P,.25),Y=se((k(s,M)*1.7+k(l,A)*2.2+k(u,S)*.9+X*10+R*1.2+se(O/Math.max(1,W.length)/1.5))/6),Z=se((k(s,M)*2+X*12+R*1.3)/3),V=se((k(l,A)*2.6+k(u,S)*1.2)/2);return{visible_shell_ratio:1,mask_ratio:n.area/Math.max(1,i*a),area:n.area,center:n.center,bbox:n.bbox,mean_radius:n.meanRadius,image_width:i,image_height:a,roughness:n.roughness,aspect_ratio:n.aspectRatio,contour_solidity:1-n.concavity,contour_concavity:n.concavity,color_r_mean:d/I,color_g_mean:p/I,color_b_mean:m/I,color_l_mean:g/I,color_l_std:k(s,M),color_a_mean:b/I,color_b_lab_mean:_/I,color_chroma_mean:A,color_chroma_std:k(l,A),color_saturation_mean:S,color_saturation_std:k(u,S),color_hue_sin:T/Math.max(1,v),color_hue_cos:x/Math.max(1,v),texture_gradient_mean:O/Math.max(1,W.length),texture_residual_std:X,texture_luma_iqr:R,color_pattern_strength:Y,color_pattern_contrast:Z,color_pattern_chroma:V}}function w3(e,t){const n=Number(t||0);return e==="aspect_ratio"?Math.log1p(Math.max(0,n)):["roughness","contour_concavity","texture_gradient_mean","texture_residual_std","color_pattern_strength","color_pattern_contrast","color_pattern_chroma"].includes(e)?Math.log1p(Math.max(0,n)*64):n}function _3(e){const t=h.model.trait_feature_schema||[],n=h.model.trait_mean||[],r=h.model.trait_components||[];if(!t.length||!r.length)return[];const i=t.map((a,o)=>{var l;let s=0;if(String(a.name||"").startsWith("contour_pc")){const u=Number(String(a.name).replace("contour_pc",""))-1;s=((l=e.contour_pc)==null?void 0:l[u])||0}else s=w3(a.name,e[a.name]);return(s-(a.mean||0))/Math.max(1e-9,a.scale||1)*(a.weight||1)-(n[o]||0)});return r.map(a=>a.reduce((o,s,l)=>o+(i[l]||0)*s,0))}async function x3(){var t;const e=(t=$.uploadInput.files)==null?void 0:t[0];if(e)try{const n=await $v(e),r=b3(n.mask,n.imageData.width,n.imageData.height,h.contourPoints||256);r.contour=n.contour;const i=y3(n.imageData,n.mask,r),a={id:-Date.now(),file:e.name,name:`Uploaded shell ${e.name}`,species:"Uploaded shell",specimen:"",specimen_label:"Bring your own shell",view:"",view_label:"Uploaded image",component_count:1,contour_pc:_y(n.fingerprint),upload_contour:r.contour,fingerprint:n.fingerprint,...i};a.trait_pc=_3(a),a.morph_traits=by(a),a.fingerprint_hash=await wy(n.fingerprint),a.species_sample_count=1,a.rarity_label="Data deficient",a.rarity_reason="uploaded image",a.location_label="Uploaded image",a.location_key="uploaded",a.location_color=Vi("uploaded"),a.species_color=Vi(a.species),h.uploadImageUrl&&URL.revokeObjectURL(h.uploadImageUrl),h.uploadImageUrl=n.imageUrl||URL.createObjectURL(e),h.shells=[a,...h.shells.filter(o=>o.id>=0)],Ry(h.shells),h.filtered=[a,...h.filtered.filter(o=>o.id>=0)],h.shellById.set(a.id,a),Yr(a),dn(a),$.statusLine.textContent="Uploaded shell projected"}catch(n){$.statusLine.textContent=n.message||"Upload failed"}finally{$.uploadInput.value=""}}const Il="shellspace-show-popped-shells",Ml="shellspace-map-sample-limit",Yi=8e3;let Or=!1,Mr=!1,Ht=[];function ma(e){const t=Math.round(Number(e||Yi)/500)*500;return Math.max(1e3,Math.min(5e4,Number.isFinite(t)?t:Yi))}function v3(e=h.mapSampleLimit,t=h.filtered.length||h.shells.length||0){const n=ma(e);return t&&n>=t?`All ${t.toLocaleString()}`:n.toLocaleString()}function zl(){var n;if(!$.mapSampleLimit)return;const e=h.shells.length||((n=h.model)==null?void 0:n.processed_count)||3e4,t=Math.max(1e3,Math.ceil(e/500)*500);$.mapSampleLimit.max=String(t),$.mapSampleLimit.value=String(Math.min(ma(h.mapSampleLimit),t)),$.mapSampleOutput&&($.mapSampleOutput.textContent=v3(h.mapSampleLimit,e))}function $3(e){h.mapSampleLimit=ma(e);try{localStorage.setItem(Ml,String(h.mapSampleLimit))}catch{}h.scatterPointCache=null,h.scatterHitCache=null,zl(),Pe()}function Gy(e){var t,n,r;Or=!!e,Mr=!1,Ht=[],(t=$.drawProjectedShell)==null||t.setAttribute("aria-pressed",Or?"true":"false"),(r=(n=$.outline)==null?void 0:n.parentElement)==null||r.classList.toggle("is-drawing",Or)}function zh(e){const t=$.outline.getBoundingClientRect();return{x:(e.clientX-t.left)/Math.max(1,t.width)*$.outline.width,y:(e.clientY-t.top)/Math.max(1,t.height)*$.outline.height}}function Ah(){if(da(),Ht.length<2)return;const e=$.outline.getContext("2d");e.save(),e.lineWidth=4,e.lineCap="round",e.lineJoin="round",e.strokeStyle="#c65d4b",e.beginPath(),e.moveTo(Ht[0].x,Ht[0].y);for(const t of Ht.slice(1))e.lineTo(t.x,t.y);e.stroke(),e.restore()}function S3(e,t=256){if(e.length<8)return null;const n=[...e,e[0]],r=[0];for(let d=1;d<n.length;d+=1){const p=n[d-1],m=n[d];r[d]=r[d-1]+Math.hypot(m.x-p.x,m.y-p.y)}const i=r.at(-1)||0;if(i<=1e-6)return null;const a=new Float32Array(t*2);let o=1;for(let d=0;d<t;d+=1){const p=d/t*i;for(;o<r.length-1&&r[o]<p;)o+=1;const m=n[o-1],g=n[o],b=Math.max(1e-6,r[o]-r[o-1]),_=(p-r[o-1])/b;a[d*2]=m.x+(g.x-m.x)*_,a[d*2+1]=m.y+(g.y-m.y)*_}let s=0,l=0;for(let d=0;d<t;d+=1)s+=a[d*2],l+=a[d*2+1];s/=t,l/=t;let u=0;for(let d=0;d<t;d+=1)a[d*2]-=s,a[d*2+1]-=l,u+=a[d*2]**2+a[d*2+1]**2;if(u=Math.sqrt(u/t),u<=1e-6)return null;for(let d=0;d<a.length;d+=1)a[d]/=u;return a}function k3(e,t=32){const n=Math.floor(e.length/2),r=new Float32Array(t*4);for(let i=1;i<=t;i+=1){let a=0,o=0,s=0,l=0;for(let d=0;d<n;d+=1){const p=e[d*2]||0,m=e[d*2+1]||0,g=Math.PI*2*i*d/n,b=Math.cos(g),_=Math.sin(g);a+=p*b+m*_,o+=m*b-p*_,s+=p*b-m*_,l+=m*b+p*_}const u=(i-1)*4;r[u]=a/n,r[u+1]=o/n,r[u+2]=s/n,r[u+3]=l/n}return r}function C3(){var r,i;const e=S3(Ht,h.contourPoints||256);if(!e)return;const t=k3(e,Math.floor((((i=(r=h.model)==null?void 0:r.fingerprint_mean)==null?void 0:i.length)||128)/4)),n=_y(t);n.length&&(ga(n),Iy(n),Gy(!1))}function Al(e=!0){h.walkingPca=!1,window.cancelAnimationFrame(h.walkFrame),$.walkPca.textContent="Walk",$.walkPca.setAttribute("aria-pressed","false"),e&&Bt()}function jy(e){if(!h.walkingPca)return;h.walkStartedAt||(h.walkStartedAt=e);const t=(e-h.walkStartedAt)/1e3,n=[...h.pcValues];for(let r=0;r<Gr();r+=1){const i=h.model.contour_pca_ranges[r],a=i?i.p99-i.p01:1;n[r]=Math.sin(t*(.32+r*.045)+r*1.73)*a*(.18+r*.018)}ga(n,!1),h.walkFrame=window.requestAnimationFrame(jy)}function T3(){if(h.walkingPca){Al();return}h.walkingPca=!0,h.walkStartedAt=0,$.walkPca.textContent="Stop",$.walkPca.setAttribute("aria-pressed","true"),h.walkFrame=window.requestAnimationFrame(jy)}function E3(){Al(!1),ga(Array.from({length:h.model.contour_component_count||Gr()},()=>0))}function Ko(e){!$.settingsPanel||!$.settingsToggle||($.settingsPanel.hidden=!e,$.settingsToggle.setAttribute("aria-expanded",e?"true":"false"))}function I3(){if(window.confirm("Clear saved shell images, starred shells, and local settings?")){Ev();try{localStorage.removeItem(ks),localStorage.removeItem(Il),localStorage.removeItem(Ml),localStorage.removeItem(El)}catch{}window.location.hash="",window.location.reload()}}function M3(){let e=!0;try{e=localStorage.getItem(Il)!=="false",h.mapSampleLimit=ma(localStorage.getItem(Ml)||Yi)}catch{e=!0,h.mapSampleLimit=Yi}h.showPoppedShells=e,$.showPoppedShells&&($.showPoppedShells.checked=e),zl()}function z3(){var e,t,n,r,i,a,o,s,l,u,d,p,m,g,b,_,T,x,v,I,E;M3(),$.search.addEventListener("input",Ot),(e=$.filtersToggle)==null||e.addEventListener("click",()=>{var k;return jo(((k=$.filtersPanel)==null?void 0:k.hidden)!==!1)}),(t=$.attributeFilterMode)==null||t.addEventListener("click",()=>Th("filter")),(n=$.attributeColorMode)==null||n.addEventListener("click",()=>Th("color")),(r=$.pcaGuideOpen)==null||r.addEventListener("click",g3),(i=$.pcaGuideClose)==null||i.addEventListener("click",Ei),(o=(a=$.pcaGuideModal)==null?void 0:a.querySelector(".pca-guide-backdrop"))==null||o.addEventListener("click",Ei),(s=$.closeFilters)==null||s.addEventListener("click",()=>jo(!1)),(l=$.settingsToggle)==null||l.addEventListener("click",k=>{var M;k.stopPropagation(),Ko(((M=$.settingsPanel)==null?void 0:M.hidden)!==!1)}),(u=$.settingsPanel)==null||u.addEventListener("click",k=>k.stopPropagation()),(d=$.clearAllData)==null||d.addEventListener("click",I3),(p=$.showPoppedShells)==null||p.addEventListener("change",()=>{h.showPoppedShells=!!$.showPoppedShells.checked;try{localStorage.setItem(Il,h.showPoppedShells?"true":"false")}catch{}Pe()}),(m=$.mapSampleLimit)==null||m.addEventListener("input",()=>{$3($.mapSampleLimit.value)}),document.addEventListener("keydown",k=>{k.key==="Escape"&&(jo(!1),Ko(!1),Ei())}),document.addEventListener("click",()=>{Ko(!1)}),$.randomShell.addEventListener("click",iS),(g=$.resetTraitFilters)==null||g.addEventListener("click",e3),$.xAxisSelect.addEventListener("change",()=>Uh(Number($.xAxisSelect.value),h.yAxis)),$.yAxisSelect.addEventListener("change",()=>Uh(h.xAxis,Number($.yAxisSelect.value))),(b=$.colorModeSelect)==null||b.addEventListener("change",()=>{h.colorMode=$.colorModeSelect.value,la(),Pe(),Bt()}),window.addEventListener("shellspace:color-filter-changed",()=>{Ot()}),$.meanShape.addEventListener("click",E3),$.walkPca.addEventListener("click",T3),$.starShell.addEventListener("click",r3),(_=$.sourceInspectToggle)==null||_.addEventListener("click",()=>Xy(!h.sourceInspectOpen)),(T=$.sourceCursorToggle)==null||T.addEventListener("click",()=>j3(!h.sourceCursorActive)),(x=$.drawProjectedShell)==null||x.addEventListener("click",()=>Gy(!Or)),$.outline.addEventListener("pointerdown",k=>{!Or||k.button!==0||(k.preventDefault(),Mr=!0,Ht=[zh(k)],$.outline.setPointerCapture(k.pointerId),Ah())}),$.outline.addEventListener("pointermove",k=>{if(!Mr)return;k.preventDefault();const M=zh(k),A=Ht.at(-1);A&&Math.hypot(M.x-A.x,M.y-A.y)<2.5||(Ht.push(M),Ah())});for(const k of["pointerup","pointercancel"])$.outline.addEventListener(k,M=>{if(Mr){M.preventDefault();try{$.outline.releasePointerCapture(M.pointerId)}catch{}Mr=!1,k==="pointerup"?C3():da()}});$.uploadShell.addEventListener("click",()=>$.uploadInput.click()),$.uploadInput.addEventListener("change",x3),$.exportSvg.addEventListener("click",M$),(v=$.starredBand)==null||v.addEventListener("pointermove",u3),(I=$.starredBand)==null||I.addEventListener("pointerleave",()=>{Eh(),Ir(1200)}),(E=$.starredBand)==null||E.addEventListener("pointercancel",Eh),$.zoomIn.addEventListener("click",()=>Xo(.72)),$.zoomOut.addEventListener("click",()=>Xo(1.38)),$.resetView.addEventListener("click",()=>{h.viewport=sa(h.xAxis,h.yAxis),Pe()}),$.scatter.addEventListener("wheel",k=>{if(k.preventDefault(),Ir(1800),k.shiftKey){const M=$.scatter.getBoundingClientRect();Xo(k.deltaY>0?1.12:.88,{x:k.clientX-M.left,y:k.clientY-M.top});return}cS(k.deltaX,k.deltaY)}),$.scatter.addEventListener("pointerdown",k=>{if(k.button===1){k.preventDefault(),$.scatter.setPointerCapture(k.pointerId),J3(k);return}if(k.button!==0)return;h.holdingNearest=!0;const M=$.scatter.getBoundingClientRect(),A=Ss(k.clientX-M.left,k.clientY-M.top);h.pendingSelectShell=A,A?Ki(A,16):(h.draggingTarget=!0,h.targetDragStart={pointerId:k.pointerId,clientX:k.clientX,clientY:k.clientY,active:!1,ignoreRealShells:!0},$.pointTooltip.hidden=!0)}),$.scatter.addEventListener("pointermove",k=>{if(h.panningViewport){k.preventDefault(),eS(k);return}if(h.draggingTarget){const M=h.targetDragStart;if(M&&!M.active){if(Math.hypot(k.clientX-M.clientX,k.clientY-M.clientY)<4)return;M.active=!0}Oh(k),$.pointTooltip.hidden=!0;return}if(h.holdingNearest){$.pointTooltip.hidden=!0;return}rS(k)}),$.scatter.addEventListener("mousedown",k=>{if(k.button!==0||h.draggingTarget||h.holdingNearest||h.panningViewport)return;h.holdingNearest=!0;const M=$.scatter.getBoundingClientRect(),A=Ss(k.clientX-M.left,k.clientY-M.top);h.pendingSelectShell=A,A?Ki(A,16):(h.draggingTarget=!0,h.targetDragStart={pointerId:-1,clientX:k.clientX,clientY:k.clientY,active:!1,ignoreRealShells:!0},$.pointTooltip.hidden=!0)}),$.scatter.addEventListener("mousemove",k=>{if(!h.draggingTarget||(k.buttons&1)!==1)return;const M=h.targetDragStart;if(M&&!M.active){if(Math.hypot(k.clientX-M.clientX,k.clientY-M.clientY)<4)return;M.active=!0}Oh(k),$.pointTooltip.hidden=!0});for(const k of["pointerup","pointercancel"])$.scatter.addEventListener(k,M=>{var P,O,W;const A=k==="pointerup"&&h.draggingTarget&&!((P=h.targetDragStart)!=null&&P.active);Bh(),A&&Zi(M);const S=k==="pointerup";h.holdingNearest=!1,h.draggingTarget=!1,h.targetDragStart=null,h.targetEvent=null,tS(),S?Ch():h.pendingSelectShell=null;try{(W=(O=$.scatter).hasPointerCapture)!=null&&W.call(O,M.pointerId)&&$.scatter.releasePointerCapture(M.pointerId)}catch{}k!=="pointerup"&&($.pointTooltip.hidden=!0)});window.addEventListener("mouseup",k=>{var A;if(!h.holdingNearest&&!h.draggingTarget)return;const M=h.draggingTarget&&!((A=h.targetDragStart)!=null&&A.active);Bh(),M&&Zi(k),h.holdingNearest=!1,h.draggingTarget=!1,h.targetDragStart=null,h.targetEvent=null,Ch()}),$.scatter.addEventListener("pointerleave",()=>{h.draggingTarget||h.panningViewport||($.pointTooltip.hidden=!0)}),$.scatter.addEventListener("auxclick",k=>{k.button===1&&k.preventDefault()}),window.addEventListener("resize",()=>{Pe(),Sy(h.selected),ar(),ha(),Xi()}),window.addEventListener("scroll",()=>{Xi(),Ir(1800)},!0),window.addEventListener("wheel",()=>Ir(1800),{passive:!0,capture:!0})}function Nh(e){const t=String(e||"").trim();return!t||["unknown","not assessed","data deficient","locality unavailable"].includes(t.toLowerCase())?"":t}function A3(e){e&&(e.classList.remove("detail-filter-ack"),e.offsetWidth,e.classList.add("detail-filter-ack"),window.setTimeout(()=>e.classList.remove("detail-filter-ack"),620))}function Ph(e,t){e(),Ot(),A3(t)}function Qi(e,t,n=`Filter by ${e}`){const r=document.createElement("span");return r.textContent=e,Ur(r,t,n),r}function Ur(e,t,n){e.classList.add("detail-filter-target"),e.tabIndex=0,e.setAttribute("role","button"),e.title=n,e.addEventListener("click",()=>Ph(t,e)),e.addEventListener("keydown",r=>{r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),Ph(t,e))})}function N3(e){const t=String(e||"").trim();h.categoryFilters.taxonomy=h.categoryFilters.taxonomy===t?"":t}function P3(e){const t=e||"";h.categoryFilters.habitat=h.categoryFilters.habitat===t?"":t}function R3(e){const t=`country:${String(e||"").trim().toUpperCase()}`;h.categoryFilters.origin=h.categoryFilters.origin===t?"":t}function O3(e){const t=e||"";h.categoryFilters.rarity=h.categoryFilters.rarity===t?"":t}function Ky(e){const t=Number(e);return Number.isFinite(t)&&(In.find(n=>t>=n.min&&t<=n.max)||In.at(-1))||null}function B3(e,t){const n=Ky(t);if(!n)return;const r=h.morphFilters.get(e),i=r&&Math.abs(r.min-n.min)<.01&&Math.abs(r.max-n.max)<.01;h.morphFilters.set(e,i?{min:0,max:1}:{min:n.min,max:n.max})}function L3(e,t){var i,a;const n=String(((i=e==null?void 0:e.species_traits)==null?void 0:i.primary_country)||(e==null?void 0:e.location_key)||"").trim().toUpperCase();if(/^[A-Z]{2}$/.test(n)&&Xn(n))return`country:${n}`;const r=String(((a=e==null?void 0:e.species_traits)==null?void 0:a.region_key)||(e==null?void 0:e.region_key)||"").trim();return r&&r!=="unknown"?`region:${r}`:t?`country-search:${t}`:""}function tt(e,t=new WeakSet){if(e==null)return e;if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e!="object")return e;if(ArrayBuffer.isView(e))return Array.from(e);if(Array.isArray(e))return e.map(r=>tt(r,t));if(t.has(e))return"[Circular]";t.add(e);const n={};for(const[r,i]of Object.entries(e))typeof i!="function"&&(n[r]=tt(i,t));return t.delete(e),n}function Gt(e,t=()=>!0){const n={};for(const[r,i]of Object.entries(e||{}))i==null||i===""||t(r,i)&&(n[r]=tt(i));return n}function D3(e={}){const t=Gt(e,i=>i.startsWith("aphia_")),n={},r={};for(const[i,a]of Object.entries(t))if(i.startsWith("aphia_"))if(i.endsWith("_id")){const o=i.slice(6,-3);o&&!["accepted","classification","parent","original","taxon_rank"].some(s=>o.startsWith(s))&&(r[o]=a)}else["aphia_id","aphia_match_source","aphia_candidate_count","aphia_match_type","aphia_quality_status","aphia_quality_flags","aphia_url","aphia_lsid","aphia_scientific_name","aphia_authority","aphia_taxonomic_status","aphia_unaccept_reason","aphia_taxon_rank_id","aphia_rank","aphia_accepted_id","aphia_accepted_name","aphia_accepted_authority","aphia_parent_id","aphia_original_id","aphia_is_marine","aphia_is_brackish","aphia_is_fresh","aphia_is_terrestrial","aphia_is_extinct","aphia_modified","aphia_citation","aphia_classification_id","aphia_classification_path","aphia_classification_ids"].includes(i)||(n[i.slice(6)]=a);return{summary:Gt({match_source:e.aphia_match_source,candidate_count:e.aphia_candidate_count,match_type:e.aphia_match_type,quality_status:e.aphia_quality_status,quality_flags:e.aphia_quality_flags,aphia_id:e.aphia_id,url:e.aphia_url,lsid:e.aphia_lsid,scientific_name:e.aphia_scientific_name,authority:e.aphia_authority,taxonomic_status:e.aphia_taxonomic_status,unaccept_reason:e.aphia_unaccept_reason,rank:e.aphia_rank,accepted_id:e.aphia_accepted_id,accepted_name:e.aphia_accepted_name,accepted_authority:e.aphia_accepted_authority,parent_id:e.aphia_parent_id,original_id:e.aphia_original_id,modified:e.aphia_modified,citation:e.aphia_citation}),habitat:Gt({marine:e.aphia_is_marine,brackish:e.aphia_is_brackish,freshwater:e.aphia_is_fresh,terrestrial:e.aphia_is_terrestrial,extinct:e.aphia_is_extinct}),classification:Gt({id:e.aphia_classification_id,path:e.aphia_classification_path,ids:e.aphia_classification_ids}),ranks:n,rank_ids:r,raw:t}}function F3(e){var i;const t=e.enrichment||{},n=e.shell_enrichment||{},r=bl(e);return{schema:"shellspace-shell-inspect-v2",identity:Gt({id:e.id,file:e.file,species:e.species,name:e.name,specimen:e.specimen,specimen_label:e.specimen_label,view:e.view,view_label:e.view_label,fingerprint_hash:e.fingerprint_hash,legacy_fingerprint_hash:e.legacy_fingerprint_hash}),taxonomy:D3(t),enrichment:{species:tt(t),shell:tt(n)},occurrence_and_range:Gt({rarity_label:e.rarity_label,rarity_reason:e.rarity_reason,country_count:e.country_count,countries_top:e.countries_top,top_countries_label:e.top_countries_label,location_label:e.location_label,location_key:e.location_key,region_label:e.region_label,species_sample_count:e.species_sample_count,species_traits:e.species_traits}),physical_metrics:Gt({area_px:e.area,center_px:e.center,bbox_px:e.bbox,image_width_px:e.image_width,image_height_px:e.image_height,area_cm2:e.area!=null&&e.image_width!=null&&e.image_height!=null?fy(e):null,mean_radius_cm:e.mean_radius!=null&&e.image_width!=null&&e.image_height!=null?hy(e):null,frame_cm:e.image_width!=null&&e.image_height!=null?ua(e):null,mean_radius:e.mean_radius,contour_concavity:e.contour_concavity,contour_solidity:e.contour_solidity,morph_traits:e.morph_traits}),visual_traits:Gt({color_r_mean:e.color_r_mean,color_g_mean:e.color_g_mean,color_b_mean:e.color_b_mean,color_l_mean:e.color_l_mean,color_a_mean:e.color_a_mean,color_b_lab_mean:e.color_b_lab_mean,color_hue_cos:e.color_hue_cos,color_hue_sin:e.color_hue_sin,color_chroma_mean:e.color_chroma_mean,color_chroma_std:e.color_chroma_std,color_saturation_mean:e.color_saturation_mean,color_saturation_std:e.color_saturation_std,color_pattern_strength:e.color_pattern_strength,color_pattern_contrast:e.color_pattern_contrast,color_pattern_chroma:e.color_pattern_chroma,color_palette_rgb:e.color_palette_rgb,color_palette_weights:e.color_palette_weights,texture_gradient_mean:e.texture_gradient_mean,texture_residual_std:e.texture_residual_std,texture_luma_iqr:e.texture_luma_iqr,lightness_mean:n.lightness_mean,asymmetry:n.asymmetry,palette_rgb:n.palette_rgb,palette_weights:n.palette_weights}),embedding:{contour_pc:tt(e.contour_pc||[]),trait_pc:tt(e.trait_pc||[])},fingerprint:{hash:e.fingerprint_hash||"",length:((i=e.fingerprint)==null?void 0:i.length)||0,values:tt(e.fingerprint||[])},contour:{point_count:r?Math.floor(r.length/2):0,normalized_xy:tt(r||[]),upload_contour:tt(e.upload_contour||null)},raw_shell:tt(e)}}function U3(e={}){return[["class","class",e.aphia_class],["order","order",e.aphia_order],["family","family",e.aphia_family],["genus","genus",e.aphia_genus]].map(([t,n,r])=>[t,n,String(r||"").trim()]).filter(([,,t])=>!!t)}function W3(e={}){const t=U3(e);if(!t.length)return null;const n=document.createElement("dl");n.className="taxonomy-list",n.setAttribute("aria-label","Taxonomy ranks");for(const[r,i,a]of t){const o=document.createElement("dt");o.textContent=i;const s=document.createElement("dd");s.className=`taxonomy-value taxonomy-${r}-value`,s.textContent=a;const l=()=>N3(a),u=`Filter by ${i}: ${a}`;Ur(o,l,u),Ur(s,l,u),n.append(o,s)}return n}function q3(e){const t=On(e),n=Vr.filter(i=>t.includes(i.key));if(!n.length)return null;const r=document.createElement("span");r.className="habitat-icons";for(const{key:i,label:a,icon:o}of n){const s=document.createElement("span");s.className=`habitat-icon habitat-${i}`,s.title=a,s.setAttribute("aria-label",a),s.setAttribute("role","img"),s.innerHTML=o,Ur(s,()=>P3(i),`Filter by habitat: ${a}`),r.append(s)}return r}function V3(e){const t=ia(e);if(!t.length)return null;const n=document.createElement("span");n.className="country-filter-links";for(const r of t){const i=Xn(r.code)||r.name||r.code,a=Qi(r.flag||r.code,()=>R3(r.code),`Filter by ${i}`);a.classList.add("country-filter-item"),a.setAttribute("aria-label",i),n.append(a)}return n}function ki(e,t,n,r){const i=kl(e,t),a=Ky(i);if(!a)return[r,n];const o=()=>B3(t,i),s=`Filter ${r}: ${a.label}`;return[r,Qi(n,o,s),o,s]}function H3(e=h.selected){var n;if(!$.sourceInspect||!e)return;$.sourceInspect.innerHTML="";const t=document.createElement("textarea");t.className="source-fingerprint-json",t.readOnly=!0,t.spellcheck=!1;try{t.value=JSON.stringify(F3(e),null,2)}catch(r){t.value=JSON.stringify({schema:"shellspace-shell-inspect-error",error:(r==null?void 0:r.message)||"Unable to render shell data.",identity:Gt({id:e.id,file:e.file,species:e.species,fingerprint_hash:e.fingerprint_hash}),fingerprint:{hash:e.fingerprint_hash||"",length:((n=e.fingerprint)==null?void 0:n.length)||0,values:tt(e.fingerprint||[])},enrichment:{species:tt(e.enrichment||{}),shell:tt(e.shell_enrichment||{})}},null,2)}t.addEventListener("click",()=>t.select()),$.sourceInspect.append(t)}function Xy(e){var t;h.sourceInspectOpen=!!e,(t=$.sourceFrameBox)==null||t.classList.toggle("is-inspecting",h.sourceInspectOpen),$.sourceInspect&&($.sourceInspect.hidden=!h.sourceInspectOpen),$.sourceInspectToggle&&($.sourceInspectToggle.setAttribute("aria-pressed",h.sourceInspectOpen?"true":"false"),$.sourceInspectToggle.title=h.sourceInspectOpen?"Show shell image":"Show shell data",$.sourceInspectToggle.setAttribute("aria-label",$.sourceInspectToggle.title)),h.sourceInspectOpen&&H3()}function G3(e){if(!(e!=null&&e.src)||!(e.naturalWidth||e.width)||!(e.naturalHeight||e.height))return"";const t=48,n=document.createElement("canvas");n.width=t,n.height=t;const r=n.getContext("2d"),i=e.naturalWidth||e.width,a=e.naturalHeight||e.height,o=Math.min((t-4)/i,(t-4)/a),s=Math.max(1,Math.round(i*o)),l=Math.max(1,Math.round(a*o)),u=Math.round((t-s)/2),d=Math.round((t-l)/2);return r.clearRect(0,0,t,t),r.drawImage(e,u,d,s,l),n.toDataURL("image/png")}function j3(e){if(h.sourceCursorActive=!!e,!h.sourceCursorActive)h.sourceCursorUrl="",document.documentElement.classList.remove("shell-cursor-active"),document.documentElement.style.removeProperty("--shell-cursor");else{const t=K3();t?(h.sourceCursorUrl=t,document.documentElement.style.setProperty("--shell-cursor",`url("${t}") 24 24`),document.documentElement.classList.add("shell-cursor-active")):h.sourceCursorActive=!1}$.sourceCursorToggle&&($.sourceCursorToggle.setAttribute("aria-pressed",h.sourceCursorActive?"true":"false"),$.sourceCursorToggle.title=h.sourceCursorActive?"Use normal cursor":"Use shell as cursor",$.sourceCursorToggle.setAttribute("aria-label",$.sourceCursorToggle.title))}function K3(){if(!$.sourceImage||$.sourceImage.hidden||!$.sourceImage.src)return"";try{return G3($.sourceImage)}catch{return""}}function dn(e,{renderNearest:t=!0,preferFastSource:n=!1}={}){var g;var r;if(!e)return;h.selectionRun+=1,h.sourceToken+=1,window.clearTimeout(h.sourceLoadTimer),Nn({resetRenderKey:!0}),h.walkingPca&&Al(!1),e.id>=0&&h.uploadImageUrl&&(URL.revokeObjectURL(h.uploadImageUrl),h.uploadImageUrl=""),h.selected=e,$.sourceSpinner&&($.sourceSpinner.hidden=!0),$.sourceImage&&($.sourceImage.hidden=!0,$.sourceImage.removeAttribute("src")),e.id>=0&&h.mapShellImageIds.add(e.id),h.selectedContour=bl(e),h.generatedContour=h.selectedContour,h.generatedTraits=xy(e),h.generatedMode="selected",(e.contour_pc||[]).forEach((b,_)=>{h.pcValues[_]=b,Qr(_,b)}),$.selectedName.textContent=e.species,Xy(h.sourceInspectOpen),$y(),Hy(),$.selectedDetails.innerHTML="";const i=e.countries_top||((g=e.enrichment)==null?void 0:g.countries_top)||"",a=i||e.top_countries_label,o=W3(e.enrichment),s=q3(e),l=[];o&&l.push(["Taxonomy",o]),s&&l.push(["Habitat",s]);const u=Nh(e.rarity_label);if(u){const b=()=>O3(u);l.push(["Rarity",Qi(u,b,`Filter by rarity: ${u}`),b,`Filter by rarity: ${u}`])}const p=V3(i)||lx(a);p&&l.push(["Countries",p]);const m=Nh(o$(e));if(m){const b=L3(e,m);if(b){const _=()=>{h.categoryFilters.origin=h.categoryFilters.origin===b?"":b};l.push(["Origin",Qi(m,_,`Filter by origin: ${m}`),_,`Filter by origin: ${m}`])}else l.push(["Origin",m])}if(e.area!=null&&e.image_width!=null&&e.image_height!=null){const b=`${At(fy(e),2)} cm²`;l.push(ki(e,"area",b,"Area"))}if(e.mean_radius!=null&&e.image_width!=null&&e.image_height!=null&&l.push(["Mean radius",`${At(hy(e),2)} cm`]),e.color_l_mean!=null&&l.push(ki(e,"lightness",Vo(e.color_l_mean),"Mean lightness")),e.contour_concavity!=null&&l.push(ki(e,"concavity",Vo(e.contour_concavity/.32),"Concavity")),((r=e.morph_traits)==null?void 0:r.roughness)!=null&&l.push(ki(e,"roughness",Vo(e.morph_traits.roughness),"Roughness")),e.image_width!=null&&e.image_height!=null){const b=ua(e);l.push(["Scale",`${At(b.widthCm,2)} x ${At(b.heightCm,2)} cm frame`])}for(const[b,_,T,x]of l){if(_==null||_==="")continue;const v=document.createElement("dt");v.textContent=b,T&&Ur(v,T,x);const I=document.createElement("dd");_ instanceof Node?I.append(_):I.textContent=_,$.selectedDetails.append(v,I)}h.sourceFrame=null,Sy(e,{preferFastSource:n}),t?Ki(e):$.neighborsList.innerHTML="",da(),ar(!1),Pe(120),Bt()}function Ss(e,t){const n=Rn($.scatter,he),r=ly(n);let i=null,a=1/0;const o=Math.floor(e/r.cellSize),s=Math.floor(t/r.cellSize);for(let l=0;l<=1;l+=1){for(let u=s-l;u<=s+l;u+=1)for(let d=o-l;d<=o+l;d+=1){if(l&&d>o-l&&d<o+l&&u>s-l&&u<s+l)continue;const p=r.grid.get(`${d},${u}`);if(p)for(const m of p){const g=r.points[m*2]-e,b=r.points[m*2+1]-t,_=g*g+b*b;_<a&&(a=_,i=r.shells[m])}}if(a<=196)break}return a<=196?i:null}function X3(e,t,n,r=4){h.screenNeighborScanCount+=1;const i=Rn($.scatter,he),a=ly(i);if(!a.shells.length)return[];const o=Math.floor(e/a.cellSize),s=Math.floor(t/a.cellSize),l=[],u=new Set;let d=-1,p=-1;const m=Math.ceil(Math.max(i.width,i.height)/a.cellSize);for(let g=0;g<=m;g+=1){for(let b=s-g;b<=s+g;b+=1)for(let _=o-g;_<=o+g;_+=1){if(g&&_>o-g&&_<o+g&&b>s-g&&b<s+g)continue;const T=a.grid.get(`${_},${b}`);if(T)for(const x of T){if(u.has(x))continue;u.add(x);const v=a.points[x*2]-e,I=a.points[x*2+1]-t,E=v*v+I*I;if(l.length<r){l.push({screenDistance:E,shell:a.shells[x]}),E>p&&(p=E,d=l.length-1);continue}if(!(E>=p)){l[d]={screenDistance:E,shell:a.shells[x]},p=-1;for(let k=0;k<l.length;k+=1)l[k].screenDistance>p&&(p=l[k].screenDistance,d=k)}}}if(l.length>=r&&g>=2)break}return l.sort((g,b)=>g.screenDistance-b.screenDistance),l.map(g=>{const b=vl(g.shell,n,xl());return{distance:Math.sqrt(b.rawSq),similarity:ky(b),shell:g.shell}})}function Y3(e,t){h.xAxis>=0&&h.xAxis<e.length&&(e[h.xAxis]=t.x),h.yAxis>=0&&h.yAxis<e.length&&h.yAxis!==h.xAxis&&(e[h.yAxis]=t.y)}function Q3(e,t){const n=xl(),r=new Set(n),i=(t||[]).map(a=>({distance:vl(a.shell,e,n).normalizedSq,shell:a.shell})).sort((a,o)=>a.distance-o.distance);if(!i.length)return e;if(i[0].distance<1e-10){const a=i[0].shell.contour_pc||[];for(let o=0;o<e.length;o+=1)r.has(o)||(e[o]=a[o]||0);return e}for(let a=0;a<e.length;a+=1){if(r.has(a))continue;let o=0,s=0;for(const l of i){const u=l.shell.contour_pc||[];if(a>=u.length)continue;const d=1/Math.max(l.distance,1e-6);o+=(u[a]||0)*d,s+=d}e[a]=s?o/s:0}return e}function Rh(e,t=null){var i;const n=Math.max(((i=h.model)==null?void 0:i.contour_component_count)||0,h.pcValues.length,Gr()),r=Array.from({length:n},()=>0);return Y3(r,e),Q3(r,t)}function Z3(e,{updateControls:t=!0}={}){e.forEach((n,r)=>{h.pcValues[r]=n,t&&Qr(r,n)}),wl()}function Zi(e,{updateControls:t=!1}={}){const n=$.scatter.getBoundingClientRect(),r=Rn($.scatter,he),i=e.clientX-n.left,a=e.clientY-n.top,o=ey(i,a,r),s=Rh(o),l=X3(i,a,s,8),u=Rh(o,l);Z3(u,{updateControls:t}),t||Yy(u),Iy(u,l.slice(0,4)),Pe(),Bt()}function Oh(e){h.targetEvent={clientX:e.clientX,clientY:e.clientY},!h.targetFrame&&(h.targetFrame=window.requestAnimationFrame(()=>{h.targetFrame=0;const t=h.targetEvent;t&&Zi(t)}))}function Bh(){var t;h.targetFrame&&(window.cancelAnimationFrame(h.targetFrame),h.targetFrame=0);const e=h.targetEvent;h.targetEvent=null,e&&((t=h.targetDragStart)!=null&&t.active)&&Zi(e),Yy()}function J3(e){const t=$.scatter.getBoundingClientRect();h.panningViewport={pointerId:e.pointerId,startX:e.clientX-t.left,startY:e.clientY-t.top,viewport:{...h.viewport}},h.draggingTarget=!1,h.targetDragStart=null,h.targetEvent=null,h.pendingSelectShell=null,L$(),h.targetFrame&&(window.cancelAnimationFrame(h.targetFrame),h.targetFrame=0),h.holdingNearest=!1,$.scatter.classList.add("is-panning"),$.pointTooltip.hidden=!0}function eS(e){if(!h.panningViewport||h.panningViewport.pointerId!==e.pointerId)return;const t=$.scatter.getBoundingClientRect(),n=Rn($.scatter,he),r=h.panningViewport,i=r.viewport,a=(e.clientX-t.left-r.startX)/n.width*(i.maxX-i.minX),o=(e.clientY-t.top-r.startY)/n.height*(i.maxY-i.minY);h.viewport={minX:i.minX-a,maxX:i.maxX-a,minY:i.minY+o,maxY:i.maxY+o},Pe()}function tS(){h.panningViewport&&(h.panningViewport=null,$.scatter.classList.remove("is-panning"),Bt())}function nS(e,t){if(!t){$.pointTooltip.hidden=!0;return}const n=$.scatter.getBoundingClientRect(),r=document.createElement("strong");r.textContent=t.species;const i=[r,document.createTextNode(t.file),document.createElement("br"),document.createTextNode(`${t.specimen_label||t.specimen||"Unknown specimen"}, ${t.view_label||t.view||"Unknown view"}`),document.createElement("br"),document.createTextNode(`${qi(h.xAxis)} ${At(Rt(t,h.xAxis))}, ${qi(h.yAxis)} ${At(Rt(t,h.yAxis))}`)];t.color_l_mean!=null&&i.push(document.createElement("br"),document.createTextNode(`${k$(t)}, lightness ${At(t.color_l_mean,3)}`)),$.pointTooltip.replaceChildren(...i),$.pointTooltip.style.left=`${Math.min(Math.max(8,n.width-248),Math.max(8,e.clientX-n.left+14))}px`,$.pointTooltip.style.top=`${Math.min(Math.max(8,n.height-84),Math.max(8,e.clientY-n.top+14))}px`,$.pointTooltip.hidden=!1}function rS(e){h.tooltipEvent={clientX:e.clientX,clientY:e.clientY},!h.tooltipFrame&&(h.tooltipFrame=requestAnimationFrame(()=>{h.tooltipFrame=0;const t=performance.now();if(t-h.tooltipLastAt<60)return;h.tooltipLastAt=t;const n=h.tooltipEvent;if(!n)return;const r=$.scatter.getBoundingClientRect();nS(n,Ss(n.clientX-r.left,n.clientY-r.top))}))}function Ji(e){const t=Number(e);return Number.isFinite(t)&&h.shellById.get(t)||null}function Yr(e){if(!h.viewport||!e)return;const t=h.viewport.maxX-h.viewport.minX,n=h.viewport.maxY-h.viewport.minY,r=Rt(e,h.xAxis),i=Rt(e,h.yAxis);h.viewport={minX:r-t/2,maxX:r+t/2,minY:i-n/2,maxY:i+n/2}}function iS(){const e=h.filtered.length?h.filtered:h.shells;if(!e.length)return;const t=hx(e)||Zo(e);t&&(Yr(t),dn(t,{preferFastSource:!0,renderNearest:!1}),Pe(420))}function Lh(e){return`https://www.iucnredlist.org/search?query=${encodeURIComponent(e||"")}&searchType=species`}function Ii(e){return String(e||"").trim().toLowerCase()}function aS(e){const t=String(e||"").trim().toUpperCase();return{EX:"Extinct",EW:"Extinct in the wild",CR:"Critically endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near threatened",LC:"Least concern",DD:"Data deficient"}[t]||t}function Dh(e){return e&&e.place==null&&e.place_id==null}function Fh(e){return/iucn/i.test(String((e==null?void 0:e.authority)||""))||Number((e==null?void 0:e.iucn)||0)>0}function oS(...e){const t=[];for(const n of e)n&&(n.conservation_status&&t.push(n.conservation_status),Array.isArray(n.conservation_statuses)&&t.push(...n.conservation_statuses));return t.find(n=>Dh(n)&&Fh(n))||t.find(n=>Fh(n))||t.find(n=>Dh(n))||t[0]||null}function sS(e){if(!e)return"Not assessed";const t=String(e.status||"").trim().toUpperCase(),n=e.status_name||e.description||aS(t)||t,r=String(n||"").trim();return r?!t||r.toUpperCase().includes(`(${t})`)||r.toUpperCase()===t?r:`${r} (${t})`:"Not assessed"}function lS(e,t){const n=Ii(t);return e.find(r=>Ii(r.name)===n)||e.find(r=>Ii(r.matched_term)===n)||e.find(r=>r.rank==="species")||e[0]||null}async function uS(e,{signal:t=null}={}){var n;const r=Ii(e);if(!r)return{status:"Not assessed",authority:"",url:"",taxonId:null};if(h.conservationCache.has(r))return h.conservationCache.get(r);const i=new URLSearchParams({q:e,per_page:"8"}),a={status:"Not assessed",authority:"iNaturalist",url:Lh(e),taxonId:null};try{const o=await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${i.toString()}`,{signal:t});if(!o.ok)return a;const s=await o.json(),l=lS(s.results||[],e);if(!(l!=null&&l.id))return h.conservationCache.set(r,a),a;let u=l;const d=await fetch(`https://api.inaturalist.org/v1/taxa/${l.id}`,{signal:t});d.ok&&(u=((n=(await d.json()).results)==null?void 0:n[0])||l);const p=oS(u,l),m={status:sS(p),authority:(p==null?void 0:p.authority)||"iNaturalist",url:(p==null?void 0:p.url)||Lh(e),taxonId:l.id};return h.conservationCache.set(r,m),m}catch(o){if((o==null?void 0:o.name)==="AbortError")throw o;return a}}function Xo(e,t=null){const n=Rn($.scatter,he),r=t||{x:n.width/2,y:n.height/2},i=ey(r.x,r.y,n),a=h.viewport,o=sa(h.xAxis,h.yAxis),s=o.maxX-o.minX,l=o.maxY-o.minY,u=Math.max(s*.04,.001),d=Math.max(l*.04,.001),p=Math.max(s*8,u),m=Math.max(l*8,d),g=Math.max(u,Math.min(p,(a.maxX-a.minX)*e)),b=Math.max(d,Math.min(m,(a.maxY-a.minY)*e));h.viewport={minX:i.x-r.x/n.width*g,maxX:i.x+(1-r.x/n.width)*g,minY:i.y-(n.height-r.y)/n.height*b,maxY:i.y+r.y/n.height*b},Pe()}function cS(e,t){const n=Rn($.scatter,he),r=h.viewport;if(!r||!n.width||!n.height)return;const i=e/n.width*(r.maxX-r.minX),a=t/n.height*(r.maxY-r.minY);h.viewport={minX:r.minX+i,maxX:r.maxX+i,minY:r.minY-a,maxY:r.maxY-a},Pe()}function dS(){const e=pl();for(const t of[$.xAxisSelect,$.yAxisSelect]){t.innerHTML="";for(let n=0;n<e;n+=1){const r=document.createElement("option");r.value=String(n),r.textContent=qi(n),t.append(r)}}$.xAxisSelect.value=String(h.xAxis),$.yAxisSelect.value=String(h.yAxis)}function Uh(e,t){h.xAxis=e,h.yAxis=t,$.xAxisSelect.value=String(e),$.yAxisSelect.value=String(t),h.viewport=sa(e,t),Pe(120),Bt()}function pS(){$.pcControls.innerHTML="";const e=Gr();h.pcValues=Array.from({length:h.model.contour_component_count||e},()=>0),h.pcControlRows=[];for(let t=0;t<e;t+=1){const n=h.model.contour_pca_ranges[t],r=n?n.p01:-1,i=n?n.p99:1,a=Math.max((i-r)/500,.001),o=document.createElement("div");o.className="pc-row";const s=document.createElement("label");s.textContent=Jb(t);const l=document.createElement("input");l.type="range",l.min=String(r),l.max=String(i),l.step=String(a),l.value="0";const u=document.createElement("input");u.type="number",u.step=String(a),u.value="0.000",l.addEventListener("input",()=>Wh(t,Number(l.value))),u.addEventListener("change",()=>Wh(t,Number(u.value))),o.append(s,l,u),h.pcControlRows[t]={label:s,slider:l,number:u},$.pcControls.append(o)}}function fS(){var t;const e=pl();for(const n of[$.xAxisSelect,$.yAxisSelect]){const r=n.value;for(let i=0;i<e;i+=1){const a=n.querySelector(`option[value="${i}"]`);a&&(a.textContent=qi(i))}n.value=r}for(let n=0;n<h.pcControlRows.length;n+=1)(t=h.pcControlRows[n])!=null&&t.label&&(h.pcControlRows[n].label.textContent=Jb(n))}function Qr(e,t){const n=h.pcControlRows[e];n&&(n.slider.value=String(t),n.number.value=Number(t).toFixed(3))}function Yy(e=h.pcValues){e.forEach((t,n)=>Qr(n,t))}function Wh(e,t){h.pcValues[e]=t,Qr(e,t),wl(),Pe(),Bt()}function ga(e,t=!0){e.forEach((n,r)=>{h.pcValues[r]=n,Qr(r,n)}),wl(),Pe(),t&&Bt()}window.shellspacePerf={selectedId:()=>{var e;return((e=h.selected)==null?void 0:e.id)??null},neighborCacheSize:()=>h.neighborCache.size,surpriseQueueSize:()=>h.surpriseQueue.length,surpriseReadyCount:()=>h.surpriseQueue.length,scatterPointCount:()=>{var e,t;return((t=(e=h.scatterPointCache)==null?void 0:e.shells)==null?void 0:t.length)||0},starredHydratedCount:()=>h.starredHydratedCount,screenNeighborScanCount:()=>h.screenNeighborScanCount,resetScreenNeighborScanCount:()=>{h.screenNeighborScanCount=0},sourceMode:()=>h.sourceMode,filteredCount:()=>h.filtered.length,diametricPairs:()=>{var e;return((e=h.model)==null?void 0:e.contour_pca_diametric_pairs)||[]},lookupConservationStatus:uS,conservationStatusForSelected:()=>fl(h.selected),selectSpecies:e=>{const t=h.shells.find(n=>n.species===e);return t&&dn(t),(t==null?void 0:t.id)??null}};function hS(){return new Promise(e=>{if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(()=>window.setTimeout(e,0));return}window.setTimeout(e,0)})}async function Wt(e){ca(e),await hS()}async function mS(){z3(),await Wt("Opening fingerprint data");const{model:e,shells:t}=await S$({onProgress:Wt});await Wt("Indexing shell lookup"),h.model=e,h.shells=t,h.shellById=new Map(h.shells.map(p=>[p.id,p])),zl(),d3(),await Wt("Computing derived traits"),u$(h.shells,null,null),await Wt("Preparing filters"),Ry(h.shells),Fr(),h.filtered=h.shells,h.contours=null,h.contourPoints=e.contour_points||0,h.contourScale=e.contour_scale||1;const n=e.species_count?`${e.processed_count.toLocaleString()} shells, ${e.species_count.toLocaleString()} species`:`${e.processed_count.toLocaleString()} shells`;$.statusLine.textContent=n,await Wt("Restoring map controls");const r=K1();ay(r.get("color"))&&(h.colorMode=r.get("color")),bh();const i=pl(),a=r.get("x"),o=r.get("y"),s=a==null?NaN:Number(a),l=o==null?NaN:Number(o);Number.isInteger(s)&&s>=0&&s<i&&(h.xAxis=s),Number.isInteger(l)&&l>=0&&l<i&&(h.yAxis=l),h.viewport=sa(h.xAxis,h.yAxis),dS(),pS(),bh(),t3(),$.statusLine.textContent=n,await Wt("Selecting first shell"),h.suppressHash=!0;const u=Ji(r.get("id"))||h.shells[0];dn(u,{renderNearest:!1});const d=(r.get("pc")||"").split(",").filter(p=>p.trim()!=="").map(p=>Number(p)).filter(p=>Number.isFinite(p));d.length&&ga(d.slice(0,6),!1),h.suppressHash=!1,h.hashReady=!0,await Wt("Drawing shell map"),ha(),ar(),Pe(),Qh(),await Wt("Ready"),ca("",!1),h.starredIds.length&&o3(),rm()}function gS(){v1(),mS().catch(e=>{$.statusLine.textContent=e.message,ca("",!1),$.missingData&&($.missingData.hidden=!1),console.error(e)})}const bS=Object.freeze(Object.defineProperty({__proto__:null,startShellspace:gS},Symbol.toStringTag,{value:"Module"}));
