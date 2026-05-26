var Yw=Object.defineProperty;var Zw=(e,t,n)=>t in e?Yw(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Pe=(e,t,n)=>Zw(e,typeof t!="symbol"?t+"":t,n);const Qw="modulepreload",Jw=function(e){return"/"+e},Pu={},e_=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){let o=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=o(n.map(u=>{if(u=Jw(u),u in Pu)return;Pu[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":Qw,c||(m.as="script"),m.crossOrigin="",m.href=u,l&&m.setAttribute("nonce",l),document.head.appendChild(m),c)return new Promise((b,f)=>{m.addEventListener("load",b),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return i.then(o=>{for(const s of o||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})};let t_=Yh;const Bn=1,Qr=2,jh={owned:null,cleanups:null,context:null,owner:null};var Ge=null;let Yi=null,n_=null,$t=null,tt=null,fn=null,wi=0;function r_(e,t){const n=$t,r=Ge,i=e.length===0,a=t===void 0?r:t,o=i?jh:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>_i(()=>hr(o)));Ge=o,$t=null;try{return xi(s,!0)}finally{$t=n,Ge=r}}function Jr(e,t,n){const r=o_(e,t,!1,Bn);Kh(r)}function _i(e){if($t===null)return e();const t=$t;$t=null;try{return e()}finally{$t=t}}function i_(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&xi(()=>{for(let i=0;i<e.observers.length;i+=1){const a=e.observers[i],o=Yi&&Yi.running;o&&Yi.disposed.has(a),(o?!a.tState:!a.state)&&(a.pure?tt.push(a):fn.push(a),a.observers&&Zh(a)),o||(a.state=Bn)}if(tt.length>1e6)throw tt=[],new Error},!1)),t}function Kh(e){if(!e.fn)return;hr(e);const t=wi;a_(e,e.value,t)}function a_(e,t,n){let r;const i=Ge,a=$t;$t=Ge=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=Bn,e.owned&&e.owned.forEach(hr),e.owned=null),e.updatedAt=n+1,Qh(o)}finally{$t=a,Ge=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?i_(e,r):e.value=r,e.updatedAt=n)}function o_(e,t,n,r=Bn,i){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Ge,context:Ge?Ge.context:null,pure:n};return Ge===null||Ge!==jh&&(Ge.owned?Ge.owned.push(a):Ge.owned=[a]),a}function Xh(e){if(e.state===0)return;if(e.state===Qr)return uo(e);if(e.suspense&&_i(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<wi);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===Bn)Kh(e);else if(e.state===Qr){const r=tt;tt=null,xi(()=>uo(e,t[0]),!1),tt=r}}function xi(e,t){if(tt)return e();let n=!1;t||(tt=[]),fn?n=!0:fn=[],wi++;try{const r=e();return s_(n),r}catch(r){n||(fn=null),tt=null,Qh(r)}}function s_(e){if(tt&&(Yh(tt),tt=null),e)return;const t=fn;fn=null,t.length&&xi(()=>t_(t),!1)}function Yh(e){for(let t=0;t<e.length;t++)Xh(e[t])}function uo(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===Bn?r!==t&&(!r.updatedAt||r.updatedAt<wi)&&Xh(r):i===Qr&&uo(r,t)}}}function Zh(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Qr,n.pure?tt.push(n):fn.push(n),n.observers&&Zh(n))}}function hr(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const a=i.pop(),o=n.observerSlots.pop();r<i.length&&(a.sourceSlots[o]=r,i[r]=a,n.observerSlots[r]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)hr(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)hr(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function l_(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Qh(e,t=Ge){throw l_(e)}function Ye(e,t){return _i(()=>e(t||{}))}function u_(e,t,n){let r=n.length,i=t.length,a=r,o=0,s=0,l=t[i-1].nextSibling,u=null;for(;o<i||s<a;){if(t[o]===n[s]){o++,s++;continue}for(;t[i-1]===n[a-1];)i--,a--;if(i===o){const c=a<r?s?n[s-1].nextSibling:n[a-s]:l;for(;s<a;)e.insertBefore(n[s++],c)}else if(a===s)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[a-1]&&n[s]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(n[s++],t[o++].nextSibling),e.insertBefore(n[--a],c),t[i]=n[a]}else{if(!u){u=new Map;let p=s;for(;p<a;)u.set(n[p],p++)}const c=u.get(t[o]);if(c!=null)if(s<c&&c<a){let p=o,m=1,b;for(;++p<i&&p<a&&!((b=u.get(t[p]))==null||b!==c+m);)m++;if(m>c-s){const f=t[o];for(;s<c;)e.insertBefore(n[s++],f)}else e.replaceChild(n[s++],t[o++])}else o++;else t[o++].remove()}}}function d_(e,t,n,r={}){let i;return r_(a=>{i=a,t===document?e():Tt(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function rt(e,t,n,r){let i;const a=()=>{const s=document.createElement("template");return s.innerHTML=e,s.content.firstChild},o=()=>(i||(i=a())).cloneNode(!0);return o.cloneNode=o,o}function c_(e,t){t==null?e.removeAttribute("class"):e.className=t}function ue(e,t,n){return _i(()=>e(t,n))}function Tt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return ei(e,t,r,n);Jr(i=>ei(e,t(),i,n),r)}function ei(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(o){let s=n[0];s&&s.nodeType===3?s.data!==t&&(s.data=t):s=document.createTextNode(t),n=Cn(e,n,r,s)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=Cn(e,n,r);else{if(a==="function")return Jr(()=>{let s=t();for(;typeof s=="function";)s=s();n=ei(e,s,n,r)}),()=>n;if(Array.isArray(t)){const s=[],l=n&&Array.isArray(n);if(co(s,t,n,i))return Jr(()=>n=ei(e,s,n,r,!0)),()=>n;if(s.length===0){if(n=Cn(e,n,r),o)return n}else l?n.length===0?Ru(e,s,r):u_(e,n,s):(n&&Cn(e),Ru(e,s));n=s}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=Cn(e,n,r,t);Cn(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function co(e,t,n,r){let i=!1;for(let a=0,o=t.length;a<o;a++){let s=t[a],l=n&&n[e.length],u;if(!(s==null||s===!0||s===!1))if((u=typeof s)=="object"&&s.nodeType)e.push(s);else if(Array.isArray(s))i=co(e,s,l)||i;else if(u==="function")if(r){for(;typeof s=="function";)s=s();i=co(e,Array.isArray(s)?s:[s],Array.isArray(l)?l:[l])||i}else e.push(s),i=!0;else{const c=String(s);l&&l.nodeType===3&&l.data===c?e.push(l):e.push(document.createTextNode(c))}}return i}function Ru(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function Cn(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let a=!1;for(let o=t.length-1;o>=0;o--){const s=t[o];if(i!==s){const l=s.parentNode===e;!a&&!o?l?e.replaceChild(i,s):e.insertBefore(i,n):l&&s.remove()}else a=!0}}else e.insertBefore(i,n);return[i]}const p_=`@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600;700;800&display=swap");

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
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 18px;
  background: rgba(251, 250, 246, 0.96);
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
`,g={shells:[],filtered:[],contours:null,contourPoints:0,contourScale:1,model:null,viewport:null,selected:null,selectedContour:null,generatedContour:null,generatedTraits:null,generatedMode:"selected",uploadImageUrl:"",xAxis:0,yAxis:1,colorMode:"roughness",pcValues:[],pcaAxisNames:[],pcControlRows:[],morphFilters:new Map,categoryFilters:{origin:"",rarity:"",color:""},conservationCache:new Map,starredIds:[],showAllStars:!1,speciesCounts:new Map,speciesTraits:new Map,localityMatchRate:0,drawFrame:0,drawTimer:0,sourceFrame:null,sourceMode:"fallback",scatterHitCache:null,screenNeighborScanCount:0,starredHydrationTimer:0,starredHydrationRun:0,starredHydratedCount:0,starredThumbs:[],tooltipFrame:0,tooltipEvent:null,tooltipLastAt:0,holdingNearest:!1,pendingSelectShell:null,targetFrame:0,targetEvent:null,targetNeighborTimer:0,targetNeighborValues:null,targetNeighborLastAt:0,draggingTarget:!1,targetDragStart:null,panningViewport:null,walkingPca:!1,walkFrame:0,walkStartedAt:0,hashReady:!1,suppressHash:!1,hashTimer:0,needsDraw:!0,sourceToken:0,sourceLoadTimer:0,selectionRun:0,scatterPointCache:null,shellById:new Map,surpriseQueue:[],surpriseQueueSource:null,surprisePrimeTimer:0,neighborCache:new Map,neighborTimer:0,neighborHydrationTimer:0,neighborHydrationItems:[],neighborSearchRun:0,neighborSearchTimer:0,neighborToken:0,neighborRenderKey:"",pointColorCache:new Map,originFilterOptionsCache:null,showPoppedShells:!0,mapShellImageIds:new Set},E={};let fe=null,De=null;function h_(){fe=E.scatter.getContext("2d"),De=E.outline.getContext("2d")}const Pr=new Map,Zi=new Map,ti=new Map,yt=new Map;var f_=rt('<aside class="panel controls-panel">'),m_=rt('<section class="panel-section search-section"><div class=search-row><label class=field><span>Search</span><input type=search placeholder="Species or Shellprint"></label><button class=filters-toggle title="Open filters"aria-expanded=false>Filters</button></div><div class=filters-popover hidden><header><h2>Filters</h2><button title="Close filters"aria-label="Close filters">x</button></header><div class=filter-controls></div><div class=filter-actions><button title="Reset filters">Reset</button></div></div><div class=shell-action-row><button class=surprise-shell title="Surprise me"aria-label="Surprise me"><svg viewBox="0 0 24 24"aria-hidden=true><rect x=4 y=4 width=16 height=16 rx=3.5></rect><circle cx=8.5 cy=8.5 r=1.2></circle><circle cx=15.5 cy=8.5 r=1.2></circle><circle cx=12 cy=12 r=1.2></circle><circle cx=8.5 cy=15.5 r=1.2></circle><circle cx=15.5 cy=15.5 r=1.2></circle></svg></button><button class=upload-shell title="Bring your own shell"><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 16V5"></path><path d="M7.5 9.5 12 5l4.5 4.5"></path><path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"></path></svg><span>Bring your own shell</span></button></div><input type=file accept=image/* hidden><div class=section-title><h2>Map<button class=pca-guide-button title="Explain PCA axes"aria-label="Explain PCA axes">?</button></h2></div><div class=axis-grid><label><span>X</span><select></select></label><label><span>Y</span><select></select></label></div><label class=field><span>Color</span><select></select></label><div class=color-legend hidden>'),g_=rt('<section class="panel-section physical-shell"><div class=section-title><h2>Physical Shell <span class="fingerprint-chip compact">------</span></h2><button class=star-button title="Star this shape"aria-label="Star this shape"aria-pressed=false><svg class=star-icon viewBox="0 0 24 24"aria-hidden=true><path class=star-shape d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8z"></path></svg></button></div><div class=source-frame><div class=source-spinner hidden></div><img class=source-image alt hidden></div><div class=selected-name>None</div><dl></dl><div class=color-palette><h2>Palette</h2><div class=palette-swatches>');function b_(){return(()=>{var e=f_();return ue(t=>{E.controlsPanel=t},e),Tt(e,Ye(y_,{}),null),Tt(e,Ye(w_,{}),null),e})()}function y_(){return(()=>{var e=m_(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,o=t.nextSibling,s=o.firstChild,l=s.firstChild,u=l.nextSibling,c=s.nextSibling,p=c.nextSibling,m=p.firstChild,b=o.nextSibling,f=b.firstChild,_=f.nextSibling,S=b.nextSibling,x=S.nextSibling,v=x.firstChild,C=v.firstChild,T=C.nextSibling,I=x.nextSibling,M=I.firstChild,A=M.firstChild,$=A.nextSibling,O=M.nextSibling,L=O.firstChild,H=L.nextSibling,K=I.nextSibling,X=K.firstChild,P=X.nextSibling,Q=K.nextSibling;return ue(W=>{E.search=W},i),ue(W=>{E.filtersToggle=W},a),ue(W=>{E.filtersPanel=W},o),ue(W=>{E.closeFilters=W},u),ue(W=>{E.filterControls=W},c),ue(W=>{E.resetTraitFilters=W},m),ue(W=>{E.randomShell=W},f),ue(W=>{E.uploadShell=W},_),ue(W=>{E.uploadInput=W},S),ue(W=>{E.pcaGuideOpen=W},T),ue(W=>{E.xAxisSelect=W},$),ue(W=>{E.yAxisSelect=W},H),ue(W=>{E.colorModeSelect=W},P),ue(W=>{E.colorLegend=W},Q),e})()}function w_(){return(()=>{var e=g_(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.nextSibling,a=n.nextSibling,o=t.nextSibling,s=o.firstChild,l=s.nextSibling,u=o.nextSibling,c=u.nextSibling,p=c.nextSibling,m=p.firstChild,b=m.nextSibling;return ue(f=>{E.physicalHash=f},i),ue(f=>{E.starShell=f},a),ue(f=>{E.sourceSpinner=f},s),ue(f=>{E.sourceImage=f},l),ue(f=>{E.selectedName=f},u),ue(f=>{E.selectedDetails=f},c),ue(f=>{E.paletteSwatches=f},b),e})()}var __=rt('<section class=scatter-panel aria-label="PCA scatter plot"><canvas class=scatter-canvas></canvas><div class=point-tooltip hidden>');function x_(){return(()=>{var e=__(),t=e.firstChild,n=t.nextSibling;return ue(r=>{E.scatter=r},t),ue(r=>{E.pointTooltip=r},n),e})()}var v_=rt('<div class=loading-overlay><div class=rpg-loader aria-hidden=true><div class=loader-shadow></div><div class=loader-aura></div><div class=loader-pearl><span class="pearl-spark spark-1"></span><span class="pearl-spark spark-2"></span><span class="pearl-spark spark-3"></span></div></div><p>Opening shell data'),$_=rt("<div class=missing-data hidden><div><h2>Processed Data Missing</h2><p>Build FFT fingerprints, export static data, then refresh the app.</p><code>make fingerprints export-static"),S_=rt("<div class=pca-guide-modal hidden><div class=pca-guide-backdrop></div><section class=pca-guide-dialog role=dialog aria-modal=true aria-labelledby=pca-guide-title><header><div class=pca-guide-title><h2 id=pca-guide-title>PCA Axes</h2><p>Here are the shells that showcase the most variance within a given PCA, while minimizing variance of other axes</p></div><button title=Close aria-label=Close>x</button></header><div class=pca-guide-list>"),k_=rt('<div><span class="shell-rib rib-1"></span><span class="shell-rib rib-2"></span><span class="shell-rib rib-3"></span><span class="shell-rib rib-4"></span><span class="shell-rib rib-5"></span><span class=shell-lip>');function T_(){return(()=>{var e=v_(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=t.nextSibling;return ue(o=>{E.loadingOverlay=o},e),Tt(t,Ye(Ou,{position:"top"}),i),Tt(t,Ye(Ou,{position:"bottom"}),i),ue(o=>{E.loadingText=o},a),e})()}function C_(){return(()=>{var e=$_();return ue(t=>{E.missingData=t},e),e})()}function E_(){return(()=>{var e=S_(),t=e.firstChild,n=t.nextSibling,r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=r.nextSibling;return ue(s=>{E.pcaGuideModal=s},e),ue(s=>{E.pcaGuideClose=s},a),ue(s=>{E.pcaGuideList=s},o),e})()}function Ou(e){return(()=>{var t=k_();return Jr(()=>c_(t,`loader-shell loader-shell-${e.position}`)),t})()}var I_=rt('<aside class="panel lab-panel">'),z_=rt('<section class="panel-section projected-lab"><div class=generated-shape><div class=section-title><h2>Projected Shell <span class="fingerprint-chip compact">------</span></h2></div><div class=projection-frame><canvas class=outline-canvas width=420 height=420></canvas><button class=svg-export title="Export generated shell as SVG">SVG</button></div></div><div class=slider-stack><div class=section-title><h2>Contour PCs</h2><div class=title-actions><button title="Reset contour coordinates">Mean</button><button title="Animate through contour PCA space">Walk</button></div></div><div class=pc-controls>'),M_=rt('<section class="panel-section neighbors"><div class=section-title><h2>Nearest Shells</h2></div><div class=neighbors-list>');function A_(){return(()=>{var e=I_();return Tt(e,Ye(N_,{}),null),Tt(e,Ye(P_,{}),null),e})()}function N_(){return(()=>{var e=z_(),t=e.firstChild,n=t.firstChild,r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=n.nextSibling,s=o.firstChild,l=s.nextSibling,u=t.nextSibling,c=u.firstChild,p=c.firstChild,m=p.nextSibling,b=m.firstChild,f=b.nextSibling,_=c.nextSibling;return ue(S=>{E.projectedHash=S},a),ue(S=>{E.outline=S},s),ue(S=>{E.exportSvg=S},l),ue(S=>{E.meanShape=S},b),ue(S=>{E.walkPca=S},f),ue(S=>{E.pcControls=S},_),e})()}function P_(){return(()=>{var e=M_(),t=e.firstChild,n=t.nextSibling;return ue(r=>{E.neighborsList=r},n),e})()}var R_=rt('<header class=topbar><div class=brand-block><h1>Shellspace 🐚</h1><p class=status-line>Loading shell model</p></div><div class=starred-band aria-label="Starred shells"></div><div class=star-burst aria-hidden=true></div><div class=top-actions><button title="Zoom out">-</button><button title="Zoom in">+</button><button title="Reset map view">Reset</button><button class=settings-toggle title=Settings aria-label=Settings aria-expanded=false><svg viewBox="0 0 24 24"aria-hidden=true><path d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"></path><path d="m19 13.3.1-1.3-.1-1.3 2-1.5-1.9-3.2-2.4 1a8.6 8.6 0 0 0-2.2-1.3L14.2 3h-4.4l-.3 2.7A8.6 8.6 0 0 0 7.3 7L4.9 6 3 9.2l2 1.5-.1 1.3.1 1.3-2 1.5L4.9 18l2.4-1a8.6 8.6 0 0 0 2.2 1.3l.3 2.7h4.4l.3-2.7a8.6 8.6 0 0 0 2.2-1.3l2.4 1 1.9-3.2-2-1.5Z"></path></svg></button></div><div class=settings-panel hidden><section><h2>Settings</h2><label class=settings-check><input type=checkbox><span>Show shells on map</span></label><button class=danger-button>Clear all data</button></section><section><h2>Controls</h2><ul><li>Two-finger pan moves the map.</li><li>Shift + two-finger pan zooms.</li><li>Click empty space projects a shell there.</li><li>Drag empty space walks through PCA space.');function O_(){return(()=>{var e=R_(),t=e.firstChild,n=t.firstChild,r=n.nextSibling,i=t.nextSibling,a=i.nextSibling,o=a.nextSibling,s=o.firstChild,l=s.nextSibling,u=l.nextSibling,c=u.nextSibling,p=o.nextSibling,m=p.firstChild,b=m.firstChild,f=b.nextSibling,_=f.firstChild,S=f.nextSibling;return ue(x=>{E.statusLine=x},r),ue(x=>{E.starredBand=x},i),ue(x=>{E.starBurst=x},a),ue(x=>{E.zoomOut=x},s),ue(x=>{E.zoomIn=x},l),ue(x=>{E.resetView=x},u),ue(x=>{E.settingsToggle=x},c),ue(x=>{E.settingsPanel=x},p),ue(x=>{E.showPoppedShells=x},_),ue(x=>{E.clearAllData=x},S),e})()}var B_=rt("<main class=workspace>");function D_(){return[Ye(O_,{}),(()=>{var e=B_();return Tt(e,Ye(b_,{}),null),Tt(e,Ye(x_,{}),null),Tt(e,Ye(A_,{}),null),e})(),Ye(T_,{}),Ye(C_,{}),Ye(E_,{})]}const Jh=document.body.firstElementChild;if(!Jh)throw new Error("Missing app root");const ef=document.createElement("style");ef.textContent=p_;document.head.append(ef);d_(()=>Ye(D_,{}),Jh);e_(async()=>{const{startShellspace:e}=await Promise.resolve().then(()=>N$);return{startShellspace:e}},[]).then(({startShellspace:e})=>e());const tf=[{key:"species",label:"Species"},{key:"locality",label:"Location"},{key:"conservation",label:"Conservation"},{key:"shell",label:"Shell color"},{key:"pattern",label:"Pattern"},{key:"lightness",label:"Lightness"},{key:"roughness",label:"Roughness"},{key:"rarity",label:"Rarity"},{key:"concavity",label:"Concavity"}],L_=tf.map(e=>e.key),Do="shellspace-starred",U_="0.27.7",nf=`https://cdn.jsdelivr.net/pyodide/v${U_}/full/`,F_=`${nf}pyodide.js`,W_=String.raw`
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
`,Lo=[{key:"lightness",label:"Lightness",format:"percent"},{key:"area",label:"Area",format:"percent"},{key:"concavity",label:"Concavity",format:"percent"},{key:"roughness",label:"Roughness",format:"percent"}],Bu=[{key:"low",label:"Low",min:0,max:1/3},{key:"medium",label:"Medium",min:1/3,max:2/3},{key:"high",label:"High",min:2/3,max:1}],Du=["Common","Uncommon","Rare"];function q_(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;return new URLSearchParams(e)}function rf(){if(!g.hashReady||g.suppressHash)return;const e=new URLSearchParams;g.selected&&e.set("id",String(g.selected.id)),e.set("x",String(g.xAxis)),e.set("y",String(g.yAxis)),e.set("color",g.colorMode),e.set("pc",g.pcValues.slice(0,6).map(n=>Number(n).toFixed(3)).join(","));const t=`${window.location.pathname}${window.location.search}#${e.toString()}`;window.history.replaceState(null,"",t)}function Yt(){!g.hashReady||g.suppressHash||(window.clearTimeout(g.hashTimer),g.hashTimer=window.setTimeout(rf,80))}function vn(e,t){const n=e.getBoundingClientRect(),r=window.devicePixelRatio||1,i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r));return(e.width!==i||e.height!==a)&&(e.width=i,e.height=a,t.setTransform(r,0,0,r,0,0),e===E.scatter&&(g.needsDraw=!0,g.scatterHitCache=null,g.scatterPointCache=null)),{width:n.width,height:n.height}}function V_(e){if(!e||e.id<0||!e.file)return Promise.resolve(null);if(Zi.has(e.file))return Zi.get(e.file);const t=new Promise(n=>{const r=new Image;r.decoding="async",r.onload=()=>n(r),r.onerror=()=>n(null),r.src=C2(e.file)});return Zi.set(e.file,t),t}function H_(e,t=1200){if("requestIdleCallback"in window){window.requestIdleCallback(e,{timeout:t});return}window.setTimeout(e,Math.min(t,160))}function po(e,t=(n=>(n=g.selected)==null?void 0:n.id)()){if(!e.length)return null;let r=Math.floor(Math.random()*e.length);return t!=null&&e.length>1&&e[r].id===t&&(r=(r+1+Math.floor(Math.random()*(e.length-1)))%e.length),e[r]}function G_(){g.surpriseQueue=[],g.surpriseQueueSource=null,window.clearTimeout(g.surprisePrimeTimer),g.surprisePrimeTimer=0}function j_(e){const t=new Set(g.surpriseQueue.map(r=>{var i;return(i=r.shell)==null?void 0:i.id}));let n=null;for(let r=0;r<12;r+=1){const i=po(e);if(!(!i||t.has(i.id))){n=i;break}}n||(n=po(e)),n&&g.surpriseQueue.push({shell:n,ready:!0})}function af(e=g.filtered,t=12,n=80){e.length&&(g.surpriseQueueSource!==e&&(g.surpriseQueue=[],g.surpriseQueueSource=e),window.clearTimeout(g.surprisePrimeTimer),g.surprisePrimeTimer=window.setTimeout(()=>{H_(()=>{for(;g.surpriseQueue.length<t;)j_(e)},500)},n))}function K_(e){var t;if(g.surpriseQueueSource!==e||!g.surpriseQueue.length)return null;for(let n=0;n<g.surpriseQueue.length;n+=1){const r=g.surpriseQueue[n];if(!(!(r!=null&&r.shell)||r.shell.id===((t=g.selected)==null?void 0:t.id)))return g.surpriseQueue.splice(n,1),r.shell}return null}/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Uo=Object.defineProperty,X_=Object.getOwnPropertyDescriptor,Y_=Object.getOwnPropertyNames,Z_=Object.prototype.hasOwnProperty,Q_=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),Dn=(e,t)=>{for(var n in t)Uo(e,n,{get:t[n],enumerable:!0})},J_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Y_(t))!Z_.call(e,i)&&i!==n&&Uo(e,i,{get:()=>t[i],enumerable:!(r=X_(t,i))||r.enumerable});return e},fr=e=>J_(Uo({},"__esModule",{value:!0}),e),jn,Vt,Mn,Lu,of,sf=q(()=>{jn=new Map,Vt=[],Mn=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=jn.get(e);if(r===void 0)jn.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let i=Vt.indexOf(e);i!==-1&&Vt.splice(i,1);for(let a=0;a<Vt.length;a++)if(jn.get(Vt[a]).priority<=n){Vt.splice(a,0,e);return}Vt.push(e)}return}throw new TypeError("not a valid backend")},Lu=async e=>{let t=jn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},of=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?Vt:n,i,a=[],o=new Set;for(let l of r){let u=await Lu(l);typeof u=="string"?a.push({name:l,err:u}):(i||(i=u),i===u&&o.add(l))}if(!i)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:u}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${u}`);let s=t.filter(l=>o.has(typeof l=="string"?l:l.name));return[i,new Proxy(e,{get:(l,u)=>u==="executionProviders"?s:Reflect.get(l,u)})]}}),e1=q(()=>{sf()}),lf,t1=q(()=>{lf="1.26.0"}),Qi,Le,uf=q(()=>{t1(),Qi="warning",Le={wasm:{},webgl:{},webgpu:{},versions:{common:lf},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Qi=e}},get logLevel(){return Qi}},Object.defineProperty(Le,"logLevel",{enumerable:!0})}),Se,n1=q(()=>{uf(),Se=Le}),df,cf,r1=q(()=>{df=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let o=(t==null?void 0:t.format)!==void 0?t.format:"RGB",s=t==null?void 0:t.norm,l,u;s===void 0||s.mean===void 0?l=[255,255,255,255]:typeof s.mean=="number"?l=[s.mean,s.mean,s.mean,s.mean]:(l=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(l[3]=s.mean[3])),s===void 0||s.bias===void 0?u=[0,0,0,0]:typeof s.bias=="number"?u=[s.bias,s.bias,s.bias,s.bias]:(u=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(u[3]=s.bias[3]));let c=a*i,p=0,m=c,b=c*2,f=-1;o==="RGBA"?(p=0,m=c,b=c*2,f=c*3):o==="RGB"?(p=0,m=c,b=c*2):o==="RBG"&&(p=0,b=c,m=c*2);for(let _=0;_<a;_++)for(let S=0;S<i;S++){let x=(e.data[p++]-u[0])*l[0],v=(e.data[m++]-u[1])*l[1],C=(e.data[b++]-u[2])*l[2],T=f===-1?255:(e.data[f++]-u[3])*l[3];r.fillStyle="rgba("+x+","+v+","+C+","+T+")",r.fillRect(S,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},cf=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let i,a,o;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],a=e.dims[1],o=e.dims[3]):(i=e.dims[3],a=e.dims[2],o=e.dims[1]);let s=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,u,c;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let p=a*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,b=0,f=1,_=2,S=3,x=0,v=p,C=p*2,T=-1;s==="RGBA"?(x=0,v=p,C=p*2,T=p*3):s==="RGB"?(x=0,v=p,C=p*2):s==="RBG"&&(x=0,C=p,v=p*2),r=n.createImageData(i,a);for(let I=0;I<a*i;b+=m,f+=m,_+=m,S+=m,I++)r.data[b]=(e.data[x++]-c[0])*u[0],r.data[f]=(e.data[v++]-c[1])*u[1],r.data[_]=(e.data[C++]-c[2])*u[2],r.data[S]=T===-1?255:(e.data[T++]-c[3])*u[3]}else throw new Error("Can not access image data");return r}}),Rr,pf,hf,ff,mf,gf,i1=q(()=>{Fo(),Rr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,o;typeof i.mean=="number"?a=[i.mean,i.mean,i.mean,i.mean]:a=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?o=[i.bias,i.bias,i.bias,i.bias]:o=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",u=n*r,c=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3),p=4,m=0,b=1,f=2,_=3,S=0,x=u,v=u*2,C=-1;s==="RGB"&&(p=3,m=0,b=1,f=2,_=-1),l==="RGBA"?C=u*3:l==="RBG"?(S=0,v=u,x=u*2):l==="BGR"&&(v=0,x=u,S=u*2);for(let T=0;T<u;T++,m+=p,f+=p,b+=p,_+=p)c[S++]=(e[m]+o[0])/a[0],c[x++]=(e[b]+o[1])/a[1],c[v++]=(e[f]+o[2])/a[2],C!==-1&&_!==-1&&(c[C++]=(e[_]+o[3])/a[3]);return l==="RGBA"?new et("float32",c,[1,4,n,r]):new et("float32",c,[1,3,n,r])},pf=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",o,s=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=l();c.width=e.width,c.height=e.height;let p=u(c);if(p!=null){let m=e.height,b=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,b=t.resizedWidth),t!==void 0){if(s=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=m,s.width=b}else s.tensorFormat="RGBA",s.height=m,s.width=b;p.drawImage(e,0,0),o=p.getImageData(0,0,b,m).data}else throw new Error("Can not access image data")}else if(r){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=e.height,p=e.width),t!==void 0&&(s=t),s.format="RGBA",s.height=c,s.width=p,t!==void 0){let m=l();m.width=p,m.height=c;let b=u(m);if(b!=null)b.putImageData(e,0,0),o=b.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else o=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let p=u(c);if(p!=null){let m=e.height,b=e.width;return p.drawImage(e,0,0,b,m),o=p.getImageData(0,0,b,m).data,s.height=m,s.width=b,Rr(o,s)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,p)=>{let m=l(),b=u(m);if(!e||!b)return p();let f=new Image;f.crossOrigin="Anonymous",f.src=e,f.onload=()=>{m.width=f.width,m.height=f.height,b.drawImage(f,0,0,m.width,m.height);let _=b.getImageData(0,0,m.width,m.height);s.height=m.height,s.width=m.width,c(Rr(_.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return Rr(o,s);throw new Error("Input data provided is not supported - aborted tensor creation")},hf=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t,o=[1,r,n,4];return new et({location:"texture",type:"float32",texture:e,dims:o,download:i,dispose:a})},ff=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:i,dispose:a})},mf=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new et({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:i,dispose:a})},gf=(e,t,n)=>new et({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),un,ar,Ji,bf,a1=q(()=>{un=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ar=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ji=!1,bf=()=>{if(!Ji){Ji=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(un.set("int64",BigInt64Array),ar.set(BigInt64Array,"int64")),t&&(un.set("uint64",BigUint64Array),ar.set(BigUint64Array,"uint64")),r?(un.set("float16",n),ar.set(n,"float16")):un.set("float16",Uint16Array)}}}),yf,wf,o1=q(()=>{Fo(),yf=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},wf=(e,t)=>{switch(e.location){case"cpu":return new et(e.type,e.data,t);case"cpu-pinned":return new et({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new et({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new et({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new et({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),et,Fo=q(()=>{r1(),i1(),a1(),o1(),et=class{constructor(e,t,n){bf();let r,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case"cpu-pinned":{let o=un.get(r);if(!o)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,s;if(typeof e=="string")if(r=e,s=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let l=un.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?o=l.from(t,BigInt):o=l.from(t)}else if(t instanceof l)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(s=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",o=e;else if(l==="boolean")r="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",o=Uint8Array.from(e);else{let l=ar.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,o=e}if(s===void 0)s=[o.length];else if(!Array.isArray(s))throw new TypeError("A tensor's dims must be a number array");i=s,this.cpuData=o,this.dataLocation="cpu"}let a=yf(i);if(this.cpuData&&a!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return pf(e,t)}static fromTexture(e,t){return hf(e,t)}static fromGpuBuffer(e,t){return ff(e,t)}static fromMLTensor(e,t){return mf(e,t)}static fromPinnedBuffer(e,t,n){return gf(e,t,n)}toDataURL(e){return df(this,e)}toImageData(e){return cf(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return wf(this,e)}}}),gt,_f=q(()=>{Fo(),gt=et}),ni,ea,Ct,bt,mn,gn,xf=q(()=>{uf(),ni=(e,t)=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.timeStamp(`${e}::ORT::${t}`)},ea=(e,t)=>{var i;let n=((i=new Error().stack)==null?void 0:i.split(/\r\n|\r|\n/g))||[],r=!1;for(let a=0;a<n.length;a++){if(r&&!n[a].includes("TRACE_FUNC")){let o=`FUNC_${e}::${n[a].trim().split(" ")[1]}`;t&&(o+=`::${t}`),ni("CPU",o);return}n[a].includes("TRACE_FUNC")&&(r=!0)}},Ct=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||ea("BEGIN",e)},bt=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||ea("END",e)},mn=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.time(`ORT::${e}`)},gn=e=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.timeEnd(`ORT::${e}`)}}),vf,s1=q(()=>{sf(),_f(),xf(),vf=class $f{constructor(t){this.handler=t}async run(t,n,r){Ct(),mn("InferenceSession.run");let i={},a={};if(typeof t!="object"||t===null||t instanceof gt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof gt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let u of n){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);i[u]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,c=Object.getOwnPropertyNames(n);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let m=n[p];(m===null||m instanceof gt)&&(u=!0,o=!1,i[p]=m)}if(u){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of this.inputNames)if(typeof t[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(o)for(let u of this.outputNames)i[u]=null;let s=await this.handler.run(t,i,a),l={};for(let u in s)if(Object.hasOwnProperty.call(s,u)){let c=s[u];c instanceof gt?l[u]=c:l[u]=new gt(c.type,c.data,c.dims)}return gn("InferenceSession.run"),bt(),l}async release(){return this.handler.dispose()}static async create(t,n,r,i){Ct(),mn("InferenceSession.create");let a,o={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,m=t.byteLength;if(typeof n=="object"&&n!==null)o=n;else if(typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(m=t.byteLength-p,typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||p+m>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,p,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,l]=await of(o),u=await s.createInferenceSessionHandler(a,l);return gn("InferenceSession.create"),bt(),new $f(u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Wo,l1=q(()=>{s1(),Wo=vf}),u1=q(()=>{}),d1=q(()=>{}),c1=q(()=>{}),p1=q(()=>{}),h1={};Dn(h1,{InferenceSession:()=>Wo,TRACE:()=>ni,TRACE_EVENT_BEGIN:()=>mn,TRACE_EVENT_END:()=>gn,TRACE_FUNC_BEGIN:()=>Ct,TRACE_FUNC_END:()=>bt,Tensor:()=>gt,env:()=>Se,registerBackend:()=>Mn});var at=q(()=>{e1(),n1(),l1(),_f(),u1(),d1(),xf(),c1(),p1()}),qo=q(()=>{}),Sf={};Dn(Sf,{default:()=>kf});var ta,na,kf,f1=q(()=>{var e;z0(),$n(),Vo(),ta="ort-wasm-proxy-worker",na=((e=globalThis.self)==null?void 0:e.name)===ta,na&&(self.onmessage=t=>{let{type:n,in:r}=t.data;try{switch(n){case"init-wasm":Ho(r.wasm).then(()=>{ls(r).then(()=>{postMessage({type:n})},i=>{postMessage({type:n,err:i})})},i=>{postMessage({type:n,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;us(a,i).then(()=>{postMessage({type:n})},o=>{postMessage({type:n,err:o})});break}case"copy-from":{let{buffer:i}=r,a=ui(i);postMessage({type:n,out:a});break}case"create":{let{model:i,options:a}=r;ds(i,a).then(o=>{postMessage({type:n,out:o})},o=>{postMessage({type:n,err:o})});break}case"release":cs(r),postMessage({type:n});break;case"run":{let{sessionId:i,inputIndices:a,inputs:o,outputIndices:s,options:l}=r;ps(i,a,o,s,new Array(s.length).fill(null),l).then(u=>{u.some(c=>c[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:u},fs([...o,...u]))},u=>{postMessage({type:n,err:u})});break}case"end-profiling":hs(r),postMessage({type:n});break;default:}}catch(i){postMessage({type:n,err:i})}}),kf=na?null:t=>new Worker(t??Je,{type:"module",name:ta})}),Tf={};Dn(Tf,{default:()=>Cf});async function Uu(e={}){var Au,Nu;var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&((Au=self.name)==null?void 0:Au.startsWith("em-pthread"));t.mountExternalData=(d,h)=>{d.startsWith("./")&&(d=d.substring(2)),(t.Xc||(t.Xc=new Map)).set(d,h)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=d=>async(...h)=>{var w;try{if(t.Yc)throw Error("Session already started");let y=t.Yc={Kd:h[0],errors:[]},k=await d(...h);if(t.Yc!==y)throw Error("Session mismatch");(w=t.dd)==null||w.flush();let z=y.errors;if(0<z.length){let N=await Promise.all(z);if(N=N.filter(B=>B),0<N.length)throw Error(N.join(`
`))}return k}finally{t.Yc=null}};t.jsepInit=(d,h)=>{if(d==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=h;let w=t.dd;t.jsepRegisterBuffer=(y,k,z,N)=>w.registerBuffer(y,k,z,N),t.jsepGetBuffer=y=>w.getBuffer(y),t.jsepCreateDownloader=(y,k,z)=>w.createDownloader(y,k,z),t.jsepOnCreateSession=y=>{w.onCreateSession(y)},t.jsepOnReleaseSession=y=>{w.onReleaseSession(y)},t.jsepOnRunStart=y=>w.onRunStart(y),t.Id=(y,k)=>{w.upload(y,k)}}else if(d==="webnn"){let w=h[0];[t.Wd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=h.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=y=>w.onRunStart(y),t.webnnOnRunEnd=w.onRunEnd.bind(w),t.webnnOnReleaseSession=y=>{w.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,k)=>w.createMLTensorDownloader(y,k),t.webnnRegisterMLTensor=(y,k,z,N)=>w.registerMLTensor(y,k,z,N),t.webnnCreateMLContext=y=>w.createMLContext(y),t.webnnRegisterMLConstant=(y,k,z,N,B,j)=>w.registerMLConstant(y,k,z,N,B,t.Xc,j),t.webnnRegisterGraphInput=w.registerGraphInput.bind(w),t.webnnIsGraphInput=w.isGraphInput.bind(w),t.webnnRegisterGraphOutput=w.registerGraphOutput.bind(w),t.webnnIsGraphOutput=w.isGraphOutput.bind(w),t.webnnCreateTemporaryTensor=w.createTemporaryTensor.bind(w),t.webnnIsGraphInputOutputTypeSupported=w.isGraphInputOutputTypeSupported.bind(w)}};let o=()=>{let d=h=>(...w)=>{let y=_t;return w=h(...w),_t!=y?new Promise((k,z)=>{Bi={resolve:k,reject:z}}):w};(()=>{for(let h of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[h]=d(t[h])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o==null||o()};var s,l,u=(d,h)=>{throw h},c=import.meta.url,p="";if(n||r){try{p=new URL(".",c).href}catch{}r&&(l=d=>{var h=new XMLHttpRequest;return h.open("GET",d,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),s=async d=>{if(A(d))return new Promise((w,y)=>{var k=new XMLHttpRequest;k.open("GET",d,!0),k.responseType="arraybuffer",k.onload=()=>{k.status==200||k.status==0&&k.response?w(k.response):y(k.status)},k.onerror=y,k.send(null)});var h=await fetch(d,{credentials:"same-origin"});if(h.ok)return h.arrayBuffer();throw Error(h.status+" : "+h.url)}}var m,b,f,_,S,x,v=console.log.bind(console),C=console.error.bind(console),T=v,I=C,M=!1,A=d=>d.startsWith("file://");function $(){Ut.buffer!=L.buffer&&G()}if(i){let d=function(h){try{var w=h.data,y=w.Sc;if(y==="load"){let k=[];self.onmessage=z=>k.push(z),x=()=>{postMessage({Sc:"loaded"});for(let z of k)d(z);self.onmessage=d};for(let z of w.xd)t[z]&&!t[z].proxy||(t[z]=(...N)=>{postMessage({Sc:"callHandler",wd:z,args:N})},z=="print"&&(T=t[z]),z=="printErr"&&(I=t[z]));Ut=w.Od,G(),b=w.Pd,Ve(),Nr()}else if(y==="run"){(function(k){var z=($(),Q)[k+52>>>2>>>0];k=($(),Q)[k+56>>>2>>>0],Wl(z,z-k),he(z)})(w.Rc),Wi(w.Rc,0,0,1,0,0),qs(),Pi(w.Rc),O||(Ol(),O=!0);try{Wb(w.Md,w.bd)}catch(k){if(k!="unwind")throw k}}else w.target!=="setimmediate"&&(y==="checkMailbox"?O&&Tr():y&&(I(`worker: received unknown command ${y}`),I(w)))}catch(k){throw Bl(),k}};var O=!1;self.onunhandledrejection=h=>{throw h.reason||h},self.onmessage=d}var L,H,K,X,P,Q,W,te,ie,F,re,U=!1;function G(){var d=Ut.buffer;t.HEAP8=L=new Int8Array(d),K=new Int16Array(d),t.HEAPU8=H=new Uint8Array(d),X=new Uint16Array(d),t.HEAP32=P=new Int32Array(d),t.HEAPU32=Q=new Uint32Array(d),W=new Float32Array(d),te=new Float64Array(d),ie=new BigInt64Array(d),F=new BigUint64Array(d)}function Y(){U=!0,i?x():zt.sb()}function V(d){throw I(d="Aborted("+d+")"),M=!0,d=new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info."),S==null||S(d),d}function _e(){return{a:{ma:cw,gb:dw,g:qb,J:Vb,f:Hb,o:Gb,h:jb,ha:Kb,b:Xb,T:Yb,Ha:Xs,n:Zb,$:Js,Xa:el,Da:tl,Fa:nl,Ya:rl,Va:il,Oa:al,Ua:ol,ka:sl,Ea:ll,Ba:ul,Wa:dl,Ca:cl,bb:Qb,ea:Jb,wa:ey,ua:ny,da:iy,O:ay,H:oy,va:sy,_:fy,xa:my,Ra:gy,za:yy,Ia:wy,sa:_y,fa:xy,Qa:Pi,_a:vy,R:Ty,r:My,c:Ai,hb:Ay,y:Ny,M:Py,D:Ry,l:Oy,s:wl,ib:By,I:Dy,S:Ly,j:Uy,u:Fy,q:Wy,k:qy,La:Vy,Ma:Hy,Na:Gy,Ja:$l,Ka:Sl,ta:kl,db:Ky,ab:Yy,v:Zy,aa:Qy,ga:Jy,$a:Xy,W:ew,Za:tw,Aa:nw,F:jy,U:rw,la:Mr,ya:aw,fb:iw,eb:ow,Sa:Il,Ta:zl,Ga:Wn,V:Ml,ja:Al,Pa:Nl,ia:Pl,kb:jw,na:Ww,lb:Gw,oa:Fw,G:Aw,d:mw,t:hw,w:pw,A:kw,mb:Dw,K:Iw,x:yw,pa:Lw,Y:qw,ba:Bw,nb:Ow,ob:Rw,P:Tw,qa:Pw,pb:Nw,N:zw,Z:Uw,e:fw,B:bw,m:gw,jb:Kw,p:_w,z:xw,C:ww,E:vw,L:Cw,qb:Mw,Q:Vw,ca:Ew,X:Hw,rb:Sw,ra:$w,i:lw,a:Ut,cb:Qe}}}async function Ve(){function d(y,k){var z=zt=y.exports;y={};for(let[N,B]of Object.entries(z))typeof B=="function"?(z=$y(B),y[N]=z):y[N]=B;return zt=y,zt=(function(){var N=zt,B=Z=>pe=>Z(pe)>>>0,j=Z=>()=>Z()>>>0;return(N=Object.assign({},N)).tb=B(N.tb),N.Xb=j(N.Xb),N.Zb=B(N.Zb),N.lc=B(N.lc),N.mc=j(N.mc),N.qc=B(N.qc),N})(),Fs.push(zt._b),Rl=(y=zt).tb,Ol=y.ub,t._OrtInit=y.vb,t._OrtGetLastError=y.wb,t._OrtCreateSessionOptions=y.xb,t._OrtAppendExecutionProvider=y.yb,t._OrtAddFreeDimensionOverride=y.zb,t._OrtAddSessionConfigEntry=y.Ab,t._OrtReleaseSessionOptions=y.Bb,t._OrtCreateSession=y.Cb,t._OrtReleaseSession=y.Db,t._OrtGetInputOutputCount=y.Eb,t._OrtGetInputOutputMetadata=y.Fb,t._OrtFree=y.Gb,t._OrtCreateTensor=y.Hb,t._OrtGetTensorData=y.Ib,t._OrtReleaseTensor=y.Jb,t._OrtCreateRunOptions=y.Kb,t._OrtAddRunConfigEntry=y.Lb,t._OrtReleaseRunOptions=y.Mb,t._OrtCreateBinding=y.Nb,t._OrtBindInput=y.Ob,t._OrtBindOutput=y.Pb,t._OrtClearBoundOutputs=y.Qb,t._OrtReleaseBinding=y.Rb,t._OrtRunWithBinding=y.Sb,t._OrtRun=y.Tb,t._OrtEndProfiling=y.Ub,t._JsepOutput=y.Vb,t._JsepGetNodeName=y.Wb,Ar=y.Xb,xt=t._free=y.Yb,Hn=t._malloc=y.Zb,Wi=y.ac,Bl=y.bc,Dl=y.cc,Ll=y.dc,qi=y.ec,Ul=y.fc,Fl=y.gc,ge=y.hc,Gn=y.ic,Wl=y.jc,he=y.kc,Vi=y.lc,me=y.mc,ql=y.nc,Hi=y.oc,Vl=y.pc,Hl=y.qc,Gl=y.rc,Gi=y.sc,jl=y.tc,Kl=y.uc,Xl=y.vc,Yl=y.wc,Zl=y.xc,Ql=y.yc,Jl=y.zc,eu=y.Ac,tu=y.Bc,nu=y.Cc,ru=y.Dc,iu=y.Ec,au=y.Fc,ou=y.Gc,su=y.Hc,lu=y.Ic,uu=y.Jc,du=y.Kc,cu=y.Lc,pu=y.Mc,hu=y.Nc,fu=y.Pc,mu=y.Qc,gu=y.$c,bu=y.ad,yu=y.fd,wu=y.jd,_u=y.kd,xu=y.ld,vu=y.md,$u=y.nd,Su=y.od,ku=y.pd,Tu=y.qd,Cu=y.vd,Eu=y.Sd,Iu=y.Td,zu=y.Ud,Mu=y.Vd,b=k,zt}var h,w=_e();return t.instantiateWasm?new Promise(y=>{t.instantiateWasm(w,(k,z)=>{y(d(k,z))})}):i?d(new WebAssembly.Instance(b,_e()),b):(re??(re=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href),h=await(async function(y){var k=re;if(!m&&!A(k))try{var z=fetch(k,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(z,y)}catch(N){I(`wasm streaming compile failed: ${N}`),I("falling back to ArrayBuffer instantiation")}return(async function(N,B){try{var j=await(async function(Z){if(!m)try{var pe=await s(Z);return new Uint8Array(pe)}catch{}if(Z==re&&m)Z=new Uint8Array(m);else{if(!l)throw"both async and sync fetching of the wasm failed";Z=l(Z)}return Z})(N);return await WebAssembly.instantiate(j,B)}catch(Z){I(`failed to asynchronously prepare wasm: ${Z}`),V(Z)}})(k,y)})(w),d(h.instance,h.module))}class Ie{constructor(h){Pe(this,"name","ExitStatus");this.message=`Program terminated with exit(${h})`,this.status=h}}var Be=d=>{d.terminate(),d.onmessage=()=>{}},je=[],Ze=0,Ke=null,Dt=d=>{Lt.length==0&&(Hs(),Vs(Lt[0]));var h=Lt.pop();if(!h)return 6;qn.push(h),Jt[d.Rc]=h,h.Rc=d.Rc;var w={Sc:"run",Md:d.Ld,bd:d.bd,Rc:d.Rc};return h.postMessage(w,d.rd),0},Ce=0,se=(d,h,...w)=>{var y,k=16*w.length,z=me(),N=Vi(k),B=N>>>3;for(y of w)typeof y=="bigint"?(($(),ie)[B++>>>0]=1n,($(),ie)[B++>>>0]=y):(($(),ie)[B++>>>0]=0n,($(),te)[B++>>>0]=y);return d=Dl(d,0,k,N,h),he(z),d};function Qe(d){if(i)return se(0,1,d);if(f=d,!(0<Ce)){for(var h of qn)Be(h);for(h of Lt)Be(h);Lt=[],qn=[],Jt={},M=!0}u(0,new Ie(d))}function xr(d){if(i)return se(1,0,d);Wn(d)}var Wn=d=>{if(f=d,i)throw xr(d),"unwind";Qe(d)},Lt=[],qn=[],Fs=[],Jt={},Ws=d=>{var h=d.Rc;delete Jt[h],Lt.push(d),qn.splice(qn.indexOf(d),1),d.Rc=0,Ll(h)};function qs(){Fs.forEach(d=>d())}var Vs=d=>new Promise(h=>{d.onmessage=k=>{var z=k.data;if(k=z.Sc,z.Zc&&z.Zc!=Ar()){var N=Jt[z.Zc];N?N.postMessage(z,z.rd):I(`Internal error! Worker sent a message "${k}" to target pthread ${z.Zc}, but that thread no longer exists!`)}else k==="checkMailbox"?Tr():k==="spawnThread"?Dt(z):k==="cleanupThread"?kr(()=>{Ws(Jt[z.Nd])}):k==="loaded"?(d.loaded=!0,h(d)):z.target==="setimmediate"?d.postMessage(z):k==="uncaughtException"?d.onerror(z.error):k==="callHandler"?t[z.wd](...z.args):k&&I(`worker sent an unknown command ${k}`)},d.onerror=k=>{throw I(`worker sent an error! ${k.filename}:${k.lineno}: ${k.message}`),k};var w,y=[];for(w of[])t.propertyIsEnumerable(w)&&y.push(w);d.postMessage({Sc:"load",xd:y,Od:Ut,Pd:b})});function Hs(){var d=new Worker((()=>{let h=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new h("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Lt.push(d)}var Ut,Wb=(d,h)=>{Ce=0,d=Gi(d,h),0<Ce?f=d:qi(d)},vr=[],$r=0;function qb(d){var h=new Ei(d>>>=0);return($(),L)[h.Tc+12>>>0]==0&&(Gs(h,!0),$r--),js(h,!1),vr.push(h),Hl(d)}var kn=0,Vb=()=>{ge(0,0);var d=vr.pop();ql(d.cd),kn=0};function Gs(d,h){h=h?1:0,($(),L)[d.Tc+12>>>0]=h}function js(d,h){h=h?1:0,($(),L)[d.Tc+13>>>0]=h}class Ei{constructor(h){this.cd=h,this.Tc=h-24}}var Ii=d=>{var h=kn;if(!h)return Gn(0),0;var w=new Ei(h);($(),Q)[w.Tc+16>>>2>>>0]=h;var y=($(),Q)[w.Tc+4>>>2>>>0];if(!y)return Gn(0),h;for(var k of d){if(k===0||k===y)break;if(Vl(k,y,w.Tc+16))return Gn(k),h}return Gn(y),h};function Hb(){return Ii([])}function Gb(d){return Ii([d>>>0])}function jb(d,h,w,y){return Ii([d>>>0,h>>>0,w>>>0,y>>>0])}var Kb=()=>{var d=vr.pop();d||V("no exception to throw");var h=d.cd;throw($(),L)[d.Tc+13>>>0]==0&&(vr.push(d),js(d,!0),Gs(d,!1),$r++),Hi(h),kn=h};function Xb(d,h,w){var y=new Ei(d>>>=0);throw h>>>=0,w>>>=0,($(),Q)[y.Tc+16>>>2>>>0]=0,($(),Q)[y.Tc+4>>>2>>>0]=h,($(),Q)[y.Tc+8>>>2>>>0]=w,Hi(d),$r++,kn=d}var Yb=()=>$r;function Ks(d,h,w,y){return i?se(2,1,d,h,w,y):Xs(d,h,w,y)}function Xs(d,h,w,y){if(d>>>=0,h>>>=0,w>>>=0,y>>>=0,!globalThis.SharedArrayBuffer)return 6;var k=[];return i&&k.length===0?Ks(d,h,w,y):(d={Ld:w,Rc:d,bd:y,rd:k},i?(d.Sc="spawnThread",postMessage(d,k),0):Dt(d))}function Zb(d){throw kn||(kn=d>>>0),kn}var Ys=globalThis.TextDecoder&&new TextDecoder,Zs=(d,h,w,y)=>{if(w=h+w,y)return w;for(;d[h]&&!(h>=w);)++h;return h},Qs=(d,h=0,w,y)=>{if(16<(w=Zs(d,h>>>=0,w,y))-h&&d.buffer&&Ys)return Ys.decode(d.buffer instanceof ArrayBuffer?d.subarray(h,w):d.slice(h,w));for(y="";h<w;){var k=d[h++];if(128&k){var z=63&d[h++];if((224&k)==192)y+=String.fromCharCode((31&k)<<6|z);else{var N=63&d[h++];65536>(k=(240&k)==224?(15&k)<<12|z<<6|N:(7&k)<<18|z<<12|N<<6|63&d[h++])?y+=String.fromCharCode(k):(k-=65536,y+=String.fromCharCode(55296|k>>10,56320|1023&k))}}else y+=String.fromCharCode(k)}return y},Ne=(d,h,w)=>(d>>>=0)?Qs(($(),H),d,h,w):"";function Js(d,h,w){return i?se(3,1,d,h,w):0}function el(d,h){if(i)return se(4,1,d,h)}function tl(d,h){if(i)return se(5,1,d,h)}function nl(d,h,w){if(i)return se(6,1,d,h,w)}function rl(d,h,w){return i?se(7,1,d,h,w):0}function il(d,h){if(i)return se(8,1,d,h)}function al(d,h,w){if(i)return se(9,1,d,h,w)}function ol(d,h,w,y){if(i)return se(10,1,d,h,w,y)}function sl(d,h,w,y){if(i)return se(11,1,d,h,w,y)}function ll(d,h,w,y){if(i)return se(12,1,d,h,w,y)}function ul(d){if(i)return se(13,1,d)}function dl(d,h){if(i)return se(14,1,d,h)}function cl(d,h,w){if(i)return se(15,1,d,h,w)}var Qb=()=>V(""),wt=d=>{d>>>=0;for(var h="";;){var w=($(),H)[d++>>>0];if(!w)return h;h+=String.fromCharCode(w)}},zi={},Mi={},Tn=class extends Error{constructor(d){super(d),this.name="BindingError"}};function It(d,h,w={}){return(function(y,k,z={}){var N=k.name;if(!y)throw new Tn(`type "${N}" must have a positive integer typeid pointer`);if(Mi.hasOwnProperty(y)){if(z.yd)return;throw new Tn(`Cannot register type '${N}' twice`)}Mi[y]=k,zi.hasOwnProperty(y)&&(k=zi[y],delete zi[y],k.forEach(B=>B()))})(d,h,w)}var pl=(d,h,w)=>{switch(h){case 1:return w?y=>($(),L)[y>>>0]:y=>($(),H)[y>>>0];case 2:return w?y=>($(),K)[y>>>1>>>0]:y=>($(),X)[y>>>1>>>0];case 4:return w?y=>($(),P)[y>>>2>>>0]:y=>($(),Q)[y>>>2>>>0];case 8:return w?y=>($(),ie)[y>>>3>>>0]:y=>($(),F)[y>>>3>>>0];default:throw new TypeError(`invalid integer width (${h}): ${d}`)}};function Jb(d,h,w,y,k){d>>>=0,w>>>=0,h=wt(h>>>0);let z=N=>N;if(y=y===0n){let N=8*w;z=B=>BigInt.asUintN(N,B),k=z(k)}It(d,{name:h,Oc:z,Vc:(N,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Uc:pl(h,w,!y),Wc:null})}function ey(d,h,w,y){It(d>>>=0,{name:h=wt(h>>>0),Oc:function(k){return!!k},Vc:function(k,z){return z?w:y},Uc:function(k){return this.Oc(($(),H)[k>>>0])},Wc:null})}var hl=[],en=[0,1,,1,null,1,!0,1,!1,1];function Ai(d){9<(d>>>=0)&&--en[d+1]==0&&(en[d]=void 0,hl.push(d))}var it=d=>{if(!d)throw new Tn(`Cannot use deleted val. handle = ${d}`);return en[d]},st=d=>{switch(d){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let h=hl.pop()||en.length;return en[h]=d,en[h+1]=1,h}};function Ni(d){return this.Oc(($(),Q)[d>>>2>>>0])}var ty={name:"emscripten::val",Oc:d=>{var h=it(d);return Ai(d),h},Vc:(d,h)=>st(h),Uc:Ni,Wc:null};function ny(d){return It(d>>>0,ty)}var ry=(d,h)=>{switch(h){case 4:return function(w){return this.Oc(($(),W)[w>>>2>>>0])};case 8:return function(w){return this.Oc(($(),te)[w>>>3>>>0])};default:throw new TypeError(`invalid float width (${h}): ${d}`)}};function iy(d,h,w){w>>>=0,It(d>>>=0,{name:h=wt(h>>>0),Oc:y=>y,Vc:(y,k)=>k,Uc:ry(h,w),Wc:null})}function ay(d,h,w,y,k){d>>>=0,w>>>=0,h=wt(h>>>0);let z=B=>B;if(y===0){var N=32-8*w;z=B=>B<<N>>>N,k=z(k)}It(d,{name:h,Oc:z,Vc:(B,j)=>j,Uc:pl(h,w,y!==0),Wc:null})}function oy(d,h,w){function y(z){var N=($(),Q)[z>>>2>>>0];return z=($(),Q)[z+4>>>2>>>0],new k(($(),L).buffer,z,N)}var k=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][h];It(d>>>=0,{name:w=wt(w>>>0),Oc:y,Uc:y},{yd:!0})}var Ft=(d,h,w)=>{var y=($(),H);if(h>>>=0,0<w){var k=h;w=h+w-1;for(var z=0;z<d.length;++z){var N=d.codePointAt(z);if(127>=N){if(h>=w)break;y[h++>>>0]=N}else if(2047>=N){if(h+1>=w)break;y[h++>>>0]=192|N>>6,y[h++>>>0]=128|63&N}else if(65535>=N){if(h+2>=w)break;y[h++>>>0]=224|N>>12,y[h++>>>0]=128|N>>6&63,y[h++>>>0]=128|63&N}else{if(h+3>=w)break;y[h++>>>0]=240|N>>18,y[h++>>>0]=128|N>>12&63,y[h++>>>0]=128|N>>6&63,y[h++>>>0]=128|63&N,z++}}y[h>>>0]=0,d=h-k}else d=0;return d},Sr=d=>{for(var h=0,w=0;w<d.length;++w){var y=d.charCodeAt(w);127>=y?h++:2047>=y?h+=2:55296<=y&&57343>=y?(h+=4,++w):h+=3}return h};function sy(d,h){It(d>>>=0,{name:h=wt(h>>>0),Oc(w){var y=($(),Q)[w>>>2>>>0];return y=Ne(w+4,y,!0),xt(w),y},Vc(w,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var k=typeof y=="string";if(!(k||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new Tn("Cannot pass non-string to std::string");var z=k?Sr(y):y.length,N=Hn(4+z+1),B=N+4;return($(),Q)[N>>>2>>>0]=z,k?Ft(y,B,z+1):($(),H).set(y,B>>>0),w!==null&&w.push(xt,N),N},Uc:Ni,Wc(w){xt(w)}})}var fl=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,ly=(d,h,w)=>{if(d>>>=1,16<(h=Zs(($(),X),d,h/2,w))-d&&fl)return fl.decode(($(),X).slice(d,h));for(w="";d<h;++d){var y=($(),X)[d>>>0];w+=String.fromCharCode(y)}return w},uy=(d,h,w)=>{if(w??(w=2147483647),2>w)return 0;var y=h;w=(w-=2)<2*d.length?w/2:d.length;for(var k=0;k<w;++k){var z=d.charCodeAt(k);($(),K)[h>>>1>>>0]=z,h+=2}return($(),K)[h>>>1>>>0]=0,h-y},dy=d=>2*d.length,cy=(d,h,w)=>{var y="";d>>>=2;for(var k=0;!(k>=h/4);k++){var z=($(),Q)[d+k>>>0];if(!z&&!w)break;y+=String.fromCodePoint(z)}return y},py=(d,h,w)=>{if(h>>>=0,w??(w=2147483647),4>w)return 0;var y=h;w=y+w-4;for(var k=0;k<d.length;++k){var z=d.codePointAt(k);if(65535<z&&k++,($(),P)[h>>>2>>>0]=z,(h+=4)+4>w)break}return($(),P)[h>>>2>>>0]=0,h-y},hy=d=>{for(var h=0,w=0;w<d.length;++w)65535<d.codePointAt(w)&&w++,h+=4;return h};function fy(d,h,w){if(d>>>=0,h>>>=0,w=wt(w>>>=0),h===2)var y=ly,k=uy,z=dy;else y=cy,k=py,z=hy;It(d,{name:w,Oc:N=>{var B=($(),Q)[N>>>2>>>0];return B=y(N+4,B*h,!0),xt(N),B},Vc:(N,B)=>{if(typeof B!="string")throw new Tn(`Cannot pass non-string to C++ string type ${w}`);var j=z(B),Z=Hn(4+j+h);return($(),Q)[Z>>>2>>>0]=j/h,k(B,Z+4,j+h),N!==null&&N.push(xt,Z),Z},Uc:Ni,Wc(N){xt(N)}})}function my(d,h){It(d>>>=0,{zd:!0,name:h=wt(h>>>0),Oc:()=>{},Vc:()=>{}})}function gy(d){Wi(d>>>0,!r,1,!n,131072,!1),qs()}var kr=d=>{if(!M)try{if(d(),!(0<Ce))try{i?Ar()&&qi(f):Wn(f)}catch(h){h instanceof Ie||h=="unwind"||u(0,h)}}catch(h){h instanceof Ie||h=="unwind"||u(0,h)}},by=!Atomics.waitAsync||((Nu=globalThis.navigator)==null?void 0:Nu.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Pi(d){d>>>=0,by||(Atomics.waitAsync(($(),P),d>>>2,d).value.then(Tr),d+=128,Atomics.store(($(),P),d>>>2,1))}var Tr=()=>kr(()=>{var d=Ar();d&&(Pi(d),Fl())});function yy(d,h){(d>>>=0)==h>>>0?setTimeout(Tr):i?postMessage({Zc:d,Sc:"checkMailbox"}):(d=Jt[d])&&d.postMessage({Sc:"checkMailbox"})}var Ri=[];function wy(d,h,w,y,k){for(h>>>=0,k>>>=0,Ri.length=0,w=k>>>3,y=k+y>>>3;w<y;){var z;z=($(),ie)[w++>>>0]?($(),ie)[w++>>>0]:($(),te)[w++>>>0],Ri.push(z)}return(h?ji[h]:uw[d])(...Ri)}var _y=()=>{Ce=0};function xy(d){d>>>=0,i?postMessage({Sc:"cleanupThread",Nd:d}):Ws(Jt[d])}function vy(d){}var Cr=d=>{try{d()}catch(h){V(h)}};function $y(d){var h=(...w)=>{Er.push(d);try{return d(...w)}finally{M||(Er.pop(),_t&&Wt===1&&Er.length===0&&(Wt=0,Ce+=1,Cr(Iu),typeof Fibers<"u"&&Fibers.Zd()))}};return bl.set(d,h),h}var Wt=0,_t=null,ml=0,Er=[],Oi=new Map,gl=new Map,bl=new Map,Sy=0,Bi=null,ky=[],yl=d=>(function(h){if(!M){if(Wt===0){var w=!1,y=!1;h((k=0)=>{if(!M&&(ml=k,w=!0,y)){Wt=2,Cr(()=>zu(_t)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),k=!1;try{var z=(function(){var j=($(),P)[_t+8>>>2>>>0];return j=gl.get(j),j=bl.get(j),--Ce,j()})()}catch(j){z=j,k=!0}var N=!1;if(!_t){var B=Bi;B&&(Bi=null,(k?B.reject:B.resolve)(z),N=!0)}if(k&&!N)throw z}}),y=!0,w||(Wt=1,_t=(function(){var k=Hn(65548),z=k+12;if(($(),Q)[k>>>2>>>0]=z,($(),Q)[k+4>>>2>>>0]=z+65536,z=Er[0],!Oi.has(z)){var N=Sy++;Oi.set(z,N),gl.set(N,z)}return z=Oi.get(z),($(),P)[k+8>>>2>>>0]=z,k})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Cr(()=>Eu(_t)))}else Wt===2?(Wt=0,Cr(Mu),xt(_t),_t=null,ky.forEach(kr)):V(`invalid state: ${Wt}`);return ml}})(h=>{d().then(h)});function Ty(d){return d>>>=0,yl(async()=>{var h=await it(d);return st(h)})}var Di=[],Cy=d=>{var h=Di.length;return Di.push(d),h},Ey=(d,h)=>{for(var w=Array(d),y=0;y<d;++y){var k=y,z=($(),Q)[h+4*y>>>2>>>0],N=Mi[z];if(N===void 0)throw d=`parameter ${y}`,z=Rl(z),h=wt(z),xt(z),new Tn(`${d} has unknown type ${h}`);w[k]=N}return w},Iy=(d,h,w)=>{var y=[];return d=d(y,w),y.length&&(($(),Q)[h>>>2>>>0]=st(y)),d},zy={},Ir=d=>{var h=zy[d];return h===void 0?wt(d):h};function My(d,h,w){var[y,...k]=Ey(d,h>>>0);h=y.Vc.bind(y);var z=k.map(j=>j.Uc.bind(j));d--;var N={toValue:it};switch(d=z.map((j,Z)=>{var pe=`argFromPtr${Z}`;return N[pe]=j,`${pe}(args${Z?"+"+8*Z:""})`}),w){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:N.getStringOrSymbol=Ir,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${d})`,y.zd||(N.toReturnWire=h,N.emval_returnValue=Iy,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,w=new Function(Object.keys(N),B)(...Object.values(N)),B=`methodCaller<(${k.map(j=>j.name)}) => ${y.name}>`,Cy(Object.defineProperty(w,"name",{value:B}))}function Ay(d,h){return h>>>=0,(d=it(d>>>0))==it(h)}function Ny(d){return(d>>>=0)?(d=Ir(d),st(globalThis[d])):st(globalThis)}function Py(d){return d=Ir(d>>>0),st(t[d])}function Ry(d,h){return h>>>=0,d=it(d>>>0),h=it(h),st(d[h])}function Oy(d){9<(d>>>=0)&&(en[d+1]+=1)}function wl(d,h,w,y,k){return Di[d>>>0](h>>>0,w>>>0,y>>>0,k>>>0)}function By(d,h,w,y,k){return wl(d>>>0,h>>>0,w>>>0,y>>>0,k>>>0)}function Dy(){return st([])}function Ly(d){d=it(d>>>0);for(var h=Array(d.length),w=0;w<d.length;w++)h[w]=d[w];return st(h)}function Uy(d){return st(Ir(d>>>0))}function Fy(){return st({})}function Wy(d){for(var h=it(d>>>=0);h.length;){var w=h.pop();h.pop()(w)}Ai(d)}function qy(d,h,w){h>>>=0,w>>>=0,d=it(d>>>0),h=it(h),w=it(w),d[h]=w}function Vy(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),($(),P)[h>>>2>>>0]=d.getUTCSeconds(),($(),P)[h+4>>>2>>>0]=d.getUTCMinutes(),($(),P)[h+8>>>2>>>0]=d.getUTCHours(),($(),P)[h+12>>>2>>>0]=d.getUTCDate(),($(),P)[h+16>>>2>>>0]=d.getUTCMonth(),($(),P)[h+20>>>2>>>0]=d.getUTCFullYear()-1900,($(),P)[h+24>>>2>>>0]=d.getUTCDay(),d=(d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),P)[h+28>>>2>>>0]=d}var _l=d=>d%4==0&&(d%100!=0||d%400==0),xl=[0,31,60,91,121,152,182,213,244,274,305,335],vl=[0,31,59,90,120,151,181,212,243,273,304,334];function Hy(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),h>>>=0,d=new Date(1e3*d),($(),P)[h>>>2>>>0]=d.getSeconds(),($(),P)[h+4>>>2>>>0]=d.getMinutes(),($(),P)[h+8>>>2>>>0]=d.getHours(),($(),P)[h+12>>>2>>>0]=d.getDate(),($(),P)[h+16>>>2>>>0]=d.getMonth(),($(),P)[h+20>>>2>>>0]=d.getFullYear()-1900,($(),P)[h+24>>>2>>>0]=d.getDay();var w=(_l(d.getFullYear())?xl:vl)[d.getMonth()]+d.getDate()-1|0;($(),P)[h+28>>>2>>>0]=w,($(),P)[h+36>>>2>>>0]=-60*d.getTimezoneOffset(),w=new Date(d.getFullYear(),6,1).getTimezoneOffset();var y=new Date(d.getFullYear(),0,1).getTimezoneOffset();d=0|(w!=y&&d.getTimezoneOffset()==Math.min(y,w)),($(),P)[h+32>>>2>>>0]=d}function Gy(d){d>>>=0;var h=new Date(($(),P)[d+20>>>2>>>0]+1900,($(),P)[d+16>>>2>>>0],($(),P)[d+12>>>2>>>0],($(),P)[d+8>>>2>>>0],($(),P)[d+4>>>2>>>0],($(),P)[d>>>2>>>0],0),w=($(),P)[d+32>>>2>>>0],y=h.getTimezoneOffset(),k=new Date(h.getFullYear(),6,1).getTimezoneOffset(),z=new Date(h.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(z,k);return 0>w?($(),P)[d+32>>>2>>>0]=+(k!=z&&N==y):0<w!=(N==y)&&(k=Math.max(z,k),h.setTime(h.getTime()+6e4*((0<w?N:k)-y))),($(),P)[d+24>>>2>>>0]=h.getDay(),w=(_l(h.getFullYear())?xl:vl)[h.getMonth()]+h.getDate()-1|0,($(),P)[d+28>>>2>>>0]=w,($(),P)[d>>>2>>>0]=h.getSeconds(),($(),P)[d+4>>>2>>>0]=h.getMinutes(),($(),P)[d+8>>>2>>>0]=h.getHours(),($(),P)[d+12>>>2>>>0]=h.getDate(),($(),P)[d+16>>>2>>>0]=h.getMonth(),($(),P)[d+20>>>2>>>0]=h.getYear(),d=h.getTime(),BigInt(isNaN(d)?-1:d/1e3)}function $l(d,h,w,y,k,z,N){return i?se(16,1,d,h,w,y,k,z,N):-52}function Sl(d,h,w,y,k,z){if(i)return se(17,1,d,h,w,y,k,z)}var Vn={},jy=()=>performance.timeOrigin+performance.now();function kl(d,h){if(i)return se(18,1,d,h);if(Vn[d]&&(clearTimeout(Vn[d].id),delete Vn[d]),!h)return 0;var w=setTimeout(()=>{delete Vn[d],kr(()=>Ul(d,performance.timeOrigin+performance.now()))},h);return Vn[d]={id:w,Yd:h},0}function Ky(d,h,w,y){d>>>=0,h>>>=0,w>>>=0,y>>>=0;var k=new Date().getFullYear(),z=new Date(k,0,1).getTimezoneOffset();k=new Date(k,6,1).getTimezoneOffset();var N=Math.max(z,k);($(),Q)[d>>>2>>>0]=60*N,($(),P)[h>>>2>>>0]=+(z!=k),d=(h=B=>{var j=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(j/60)).padStart(2,"0")}${String(j%60).padStart(2,"0")}`})(z),h=h(k),k<z?(Ft(d,w,17),Ft(h,y,17)):(Ft(d,y,17),Ft(h,w,17))}var Xy=()=>Date.now();function Yy(d,h,w){return w>>>=0,0<=d&&3>=d?(d===0?d=Date.now():d=performance.timeOrigin+performance.now(),d=Math.round(1e6*d),($(),ie)[w>>>3>>>0]=BigInt(d),0):28}var Li=[],Tl=(d,h)=>{Li.length=0;for(var w;w=($(),H)[d++>>>0];){var y=w!=105;h+=(y&=w!=112)&&h%8?4:0,Li.push(w==112?($(),Q)[h>>>2>>>0]:w==106?($(),ie)[h>>>3>>>0]:w==105?($(),P)[h>>>2>>>0]:($(),te)[h>>>3>>>0]),h+=y?8:4}return Li};function Zy(d,h,w){return d>>>=0,h=Tl(h>>>0,w>>>0),ji[d](...h)}function Qy(d,h,w){return d>>>=0,h=Tl(h>>>0,w>>>0),ji[d](...h)}var Jy=()=>{};function ew(d,h){return I(Ne(d>>>0,h>>>0))}var tw=()=>{throw Ce+=1,"unwind"};function nw(){return 4294901760}var rw=()=>navigator.hardwareConcurrency,tn={},zr=d=>{var h;return(h=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(d))?+h[1]:(h=/:(\d+):\d+(?:\)|$)/.exec(d))?2147483648|+h[1]:0},Cl=d=>{for(var h of d)(d=zr(h))&&(tn[d]=h)};function iw(){var d=Error().stack.toString().split(`
`);return d[0]=="Error"&&d.shift(),Cl(d),tn.gd=zr(d[3]),tn.Jd=d,tn.gd}function Mr(d){if(!(d=tn[d>>>0]))return 0;var h;if(h=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(d))d=h[1];else if(h=/^\s+at (.*) \(.*\)$/.exec(d))d=h[1];else{if(!(h=/^(.+?)@/.exec(d)))return 0;d=h[1]}xt(Mr.hd??0),h=Sr(d)+1;var w=Hn(h);return w&&Ft(d,w,h),Mr.hd=w,Mr.hd}function aw(d){d>>>=0;var h=($(),H).length;if(d<=h||4294901760<d)return!1;for(var w=1;4>=w;w*=2){var y=h*(1+.2/w);y=Math.min(y,d+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(d,y)/65536))-Ut.buffer.byteLength+65535)/65536|0;try{Ut.grow(y),G();var k=1;break e}catch{}k=void 0}if(k)return!0}return!1}function ow(d,h,w){if(d>>>=0,h>>>=0,tn.gd==d)var y=tn.Jd;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),Cl(y);for(var k=3;y[k]&&zr(y[k])!=d;)++k;for(d=0;d<w&&y[d+k];++d)($(),P)[h+4*d>>>2>>>0]=zr(y[d+k]);return d}var Ui,Fi={},El=()=>{var y;if(!Ui){var d,h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((y=globalThis.navigator)==null?void 0:y.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(d in Fi)Fi[d]===void 0?delete h[d]:h[d]=Fi[d];var w=[];for(d in h)w.push(`${d}=${h[d]}`);Ui=w}return Ui};function Il(d,h){if(i)return se(19,1,d,h);d>>>=0,h>>>=0;var w,y=0,k=0;for(w of El()){var z=h+y;($(),Q)[d+k>>>2>>>0]=z,y+=Ft(w,z,1/0)+1,k+=4}return 0}function zl(d,h){if(i)return se(20,1,d,h);d>>>=0,h>>>=0;var w=El();for(var y of(($(),Q)[d>>>2>>>0]=w.length,d=0,w))d+=Sr(y)+1;return($(),Q)[h>>>2>>>0]=d,0}function Ml(d){return i?se(21,1,d):52}function Al(d,h,w,y){return i?se(22,1,d,h,w,y):52}function Nl(d,h,w,y){return i?se(23,1,d,h,w,y):70}var sw=[null,[],[]];function Pl(d,h,w,y){if(i)return se(24,1,d,h,w,y);h>>>=0,w>>>=0,y>>>=0;for(var k=0,z=0;z<w;z++){var N=($(),Q)[h>>>2>>>0],B=($(),Q)[h+4>>>2>>>0];h+=8;for(var j=0;j<B;j++){var Z=d,pe=($(),H)[N+j>>>0],we=sw[Z];pe===0||pe===10?((Z===1?T:I)(Qs(we)),we.length=0):we.push(pe)}k+=B}return($(),Q)[y>>>2>>>0]=k,0}function lw(d){return d>>>0}i||(function(){for(var d=t.numThreads-1;d--;)Hs();je.push(async()=>{var h=(async function(){if(!i)return Promise.all(Lt.map(Vs))})();Ze++,await h,--Ze==0&&Ke&&(h=Ke,Ke=null,h())})})(),i||(Ut=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),G()),t.wasmBinary&&(m=t.wasmBinary),t.stackSave=()=>me(),t.stackRestore=d=>he(d),t.stackAlloc=d=>Vi(d),t.setValue=function(d,h,w="i8"){switch(w.endsWith("*")&&(w="*"),w){case"i1":case"i8":($(),L)[d>>>0]=h;break;case"i16":($(),K)[d>>>1>>>0]=h;break;case"i32":($(),P)[d>>>2>>>0]=h;break;case"i64":($(),ie)[d>>>3>>>0]=BigInt(h);break;case"float":($(),W)[d>>>2>>>0]=h;break;case"double":($(),te)[d>>>3>>>0]=h;break;case"*":($(),Q)[d>>>2>>>0]=h;break;default:V(`invalid type for setValue: ${w}`)}},t.getValue=function(d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":return($(),L)[d>>>0];case"i16":return($(),K)[d>>>1>>>0];case"i32":return($(),P)[d>>>2>>>0];case"i64":return($(),ie)[d>>>3>>>0];case"float":return($(),W)[d>>>2>>>0];case"double":return($(),te)[d>>>3>>>0];case"*":return($(),Q)[d>>>2>>>0];default:V(`invalid type for getValue: ${h}`)}},t.UTF8ToString=Ne,t.stringToUTF8=Ft,t.lengthBytesUTF8=Sr;var Rl,Ol,Ar,xt,Hn,Wi,Bl,Dl,Ll,qi,Ul,Fl,ge,Gn,Wl,he,Vi,me,ql,Hi,Vl,Hl,Gl,Gi,jl,Kl,Xl,Yl,Zl,Ql,Jl,eu,tu,nu,ru,iu,au,ou,su,lu,uu,du,cu,pu,hu,fu,mu,gu,bu,yu,wu,_u,xu,vu,$u,Su,ku,Tu,Cu,Eu,Iu,zu,Mu,zt,uw=[Qe,xr,Ks,Js,el,tl,nl,rl,il,al,ol,sl,ll,ul,dl,cl,$l,Sl,kl,Il,zl,Ml,Al,Nl,Pl],ji={973212:(d,h,w,y,k)=>{if(t===void 0||!t.Xc)return 1;if((d=Ne(Number(d>>>0))).startsWith("./")&&(d=d.substring(2)),!(d=t.Xc.get(d)))return 2;if(h=Number(h>>>0),w=Number(w>>>0),y=Number(y>>>0),h+w>d.byteLength)return 3;try{let z=d.subarray(h,h+w);switch(k){case 0:($(),H).set(z,y>>>0);break;case 1:t.Qd?t.Qd(y,z):t.Id(y,z);break;default:return 4}return 0}catch{return 4}},974036:(d,h,w)=>{t.td(d,($(),H).subarray(h>>>0,h+w>>>0))},974100:()=>t.Wd(),974142:d=>{t.sd(d)},974179:()=>{t.Bd()},974210:()=>{t.Cd()},974239:()=>{t.Gd()},974264:d=>t.Ad(d),974297:d=>t.Ed(d),974329:(d,h,w)=>{t.ed(Number(d),Number(h),Number(w),!0)},974392:(d,h,w)=>{t.ed(Number(d),Number(h),Number(w))},974449:()=>typeof wasmOffsetConverter<"u",974506:d=>{t.$b("Abs",d,void 0)},974557:d=>{t.$b("Neg",d,void 0)},974608:d=>{t.$b("Floor",d,void 0)},974661:d=>{t.$b("Ceil",d,void 0)},974713:d=>{t.$b("Reciprocal",d,void 0)},974771:d=>{t.$b("Sqrt",d,void 0)},974823:d=>{t.$b("Exp",d,void 0)},974874:d=>{t.$b("Erf",d,void 0)},974925:d=>{t.$b("Sigmoid",d,void 0)},974980:(d,h,w)=>{t.$b("HardSigmoid",d,{alpha:h,beta:w})},975059:d=>{t.$b("Log",d,void 0)},975110:d=>{t.$b("Sin",d,void 0)},975161:d=>{t.$b("Cos",d,void 0)},975212:d=>{t.$b("Tan",d,void 0)},975263:d=>{t.$b("Asin",d,void 0)},975315:d=>{t.$b("Acos",d,void 0)},975367:d=>{t.$b("Atan",d,void 0)},975419:d=>{t.$b("Sinh",d,void 0)},975471:d=>{t.$b("Cosh",d,void 0)},975523:d=>{t.$b("Asinh",d,void 0)},975576:d=>{t.$b("Acosh",d,void 0)},975629:d=>{t.$b("Atanh",d,void 0)},975682:d=>{t.$b("Tanh",d,void 0)},975734:d=>{t.$b("Not",d,void 0)},975785:(d,h,w)=>{t.$b("Clip",d,{min:h,max:w})},975854:d=>{t.$b("Clip",d,void 0)},975906:(d,h)=>{t.$b("Elu",d,{alpha:h})},975964:d=>{t.$b("Gelu",d,void 0)},976016:d=>{t.$b("Relu",d,void 0)},976068:(d,h)=>{t.$b("LeakyRelu",d,{alpha:h})},976132:(d,h)=>{t.$b("ThresholdedRelu",d,{alpha:h})},976202:(d,h)=>{t.$b("Cast",d,{to:h})},976260:d=>{t.$b("Add",d,void 0)},976311:d=>{t.$b("Sub",d,void 0)},976362:d=>{t.$b("Mul",d,void 0)},976413:d=>{t.$b("Div",d,void 0)},976464:d=>{t.$b("Pow",d,void 0)},976515:d=>{t.$b("Equal",d,void 0)},976568:d=>{t.$b("Greater",d,void 0)},976623:d=>{t.$b("GreaterOrEqual",d,void 0)},976685:d=>{t.$b("Less",d,void 0)},976737:d=>{t.$b("LessOrEqual",d,void 0)},976796:(d,h,w,y,k)=>{t.$b("ReduceMean",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},976971:(d,h,w,y,k)=>{t.$b("ReduceMax",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977145:(d,h,w,y,k)=>{t.$b("ReduceMin",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977319:(d,h,w,y,k)=>{t.$b("ReduceProd",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977494:(d,h,w,y,k)=>{t.$b("ReduceSum",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977668:(d,h,w,y,k)=>{t.$b("ReduceL1",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},977841:(d,h,w,y,k)=>{t.$b("ReduceL2",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978014:(d,h,w,y,k)=>{t.$b("ReduceLogSum",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978191:(d,h,w,y,k)=>{t.$b("ReduceSumSquare",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978371:(d,h,w,y,k)=>{t.$b("ReduceLogSumExp",d,{keepDims:!!h,noopWithEmptyAxes:!!w,axes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},978551:d=>{t.$b("Where",d,void 0)},978604:(d,h,w)=>{t.$b("Transpose",d,{perm:h?Array.from(($(),P).subarray(Number(h)>>>0,Number(w)>>>0)):[]})},978728:(d,h,w,y)=>{t.$b("DepthToSpace",d,{blocksize:h,mode:Ne(w),format:y?"NHWC":"NCHW"})},978861:(d,h,w,y)=>{t.$b("DepthToSpace",d,{blocksize:h,mode:Ne(w),format:y?"NHWC":"NCHW"})},978994:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee,qt)=>{t.$b("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[w],group:y,kernelShape:[k],pads:[z,N],strides:[B],wIsConst:()=>!!($(),L)[Z>>>0],outputPadding:pe?Array.from(($(),P).subarray(Number(pe)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),P).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(qt)})},979427:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee)=>{t.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),P).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:y,kernelShape:Array.from(($(),P).subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),pads:Array.from(($(),P).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from(($(),P).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),L)[j>>>0],outputPadding:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},980088:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee,qt)=>{t.$b("ConvTranspose",d,{format:j?"NHWC":"NCHW",autoPad:h,dilations:[w],group:y,kernelShape:[k],pads:[z,N],strides:[B],wIsConst:()=>!!($(),L)[Z>>>0],outputPadding:pe?Array.from(($(),P).subarray(Number(pe)>>>0,Number(we)>>>0)):[],outputShape:ke?Array.from(($(),P).subarray(Number(ke)>>>0,Number(Ee)>>>0)):[],activation:Ne(qt)})},980521:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee)=>{t.$b("ConvTranspose",d,{format:B?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),P).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),group:y,kernelShape:Array.from(($(),P).subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),pads:Array.from(($(),P).subarray(Number(z)>>>0,4+(Number(z)>>>0)>>>0)),strides:Array.from(($(),P).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!($(),L)[j>>>0],outputPadding:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],outputShape:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[],activation:Ne(Ee)})},981182:(d,h)=>{t.$b("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},981273:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee)=>{t.$b("AveragePool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},981752:(d,h)=>{t.$b("GlobalAveragePool",d,{format:h?"NHWC":"NCHW"})},981843:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee)=>{t.$b("AveragePool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982322:(d,h)=>{t.$b("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},982409:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee)=>{t.$b("MaxPool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},982884:(d,h)=>{t.$b("GlobalMaxPool",d,{format:h?"NHWC":"NCHW"})},982971:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee)=>{t.$b("MaxPool",d,{format:Ee?"NHWC":"NCHW",auto_pad:h,ceil_mode:w,count_include_pad:y,storage_order:k,dilations:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],kernel_shape:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],pads:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],strides:we?Array.from(($(),P).subarray(Number(we)>>>0,Number(ke)>>>0)):[]})},983446:(d,h,w,y,k)=>{t.$b("Gemm",d,{alpha:h,beta:w,transA:y,transB:k})},983550:d=>{t.$b("MatMul",d,void 0)},983604:(d,h,w,y)=>{t.$b("ArgMax",d,{keepDims:!!h,selectLastIndex:!!w,axis:y})},983712:(d,h,w,y)=>{t.$b("ArgMin",d,{keepDims:!!h,selectLastIndex:!!w,axis:y})},983820:(d,h)=>{t.$b("Softmax",d,{axis:h})},983883:(d,h)=>{t.$b("Concat",d,{axis:h})},983943:(d,h,w,y,k)=>{t.$b("Split",d,{axis:h,numOutputs:w,splitSizes:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},984099:d=>{t.$b("Expand",d,void 0)},984153:(d,h)=>{t.$b("Gather",d,{axis:Number(h)})},984224:(d,h)=>{t.$b("GatherElements",d,{axis:Number(h)})},984303:(d,h)=>{t.$b("GatherND",d,{batch_dims:Number(h)})},984382:(d,h,w,y,k,z,N,B,j,Z,pe)=>{t.$b("Resize",d,{antialias:h,axes:w?Array.from(($(),P).subarray(Number(w)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Ne(k),cubicCoeffA:z,excludeOutside:N,extrapolationValue:B,keepAspectRatioPolicy:Ne(j),mode:Ne(Z),nearestMode:Ne(pe)})},984744:(d,h,w,y,k,z,N)=>{t.$b("Slice",d,{starts:h?Array.from(($(),P).subarray(Number(h)>>>0,Number(w)>>>0)):[],ends:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[],axes:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[]})},985008:d=>{t.$b("Tile",d,void 0)},985060:(d,h,w)=>{t.$b("InstanceNormalization",d,{epsilon:h,format:w?"NHWC":"NCHW"})},985174:(d,h,w)=>{t.$b("InstanceNormalization",d,{epsilon:h,format:w?"NHWC":"NCHW"})},985288:d=>{t.$b("Range",d,void 0)},985341:(d,h)=>{t.$b("Einsum",d,{equation:Ne(h)})},985422:(d,h,w,y,k)=>{t.$b("Pad",d,{mode:h,value:w,pads:y?Array.from(($(),P).subarray(Number(y)>>>0,Number(k)>>>0)):[]})},985565:(d,h,w,y,k,z)=>{t.$b("BatchNormalization",d,{epsilon:h,momentum:w,spatial:!!k,trainingMode:!!y,format:z?"NHWC":"NCHW"})},985734:(d,h,w,y,k,z)=>{t.$b("BatchNormalization",d,{epsilon:h,momentum:w,spatial:!!k,trainingMode:!!y,format:z?"NHWC":"NCHW"})},985903:(d,h,w)=>{t.$b("CumSum",d,{exclusive:Number(h),reverse:Number(w)})},986e3:(d,h,w)=>{t.$b("DequantizeLinear",d,{axis:h,blockSize:w})},986090:(d,h,w,y,k)=>{t.$b("GridSample",d,{align_corners:h,mode:Ne(w),padding_mode:Ne(y),format:k?"NHWC":"NCHW"})},986260:(d,h,w,y,k)=>{t.$b("GridSample",d,{align_corners:h,mode:Ne(w),padding_mode:Ne(y),format:k?"NHWC":"NCHW"})},986430:(d,h)=>{t.$b("ScatterND",d,{reduction:Ne(h)})},986515:(d,h,w,y,k,z,N,B,j)=>{t.$b("Attention",d,{numHeads:h,isUnidirectional:w,maskFilterValue:y,scale:k,doRotary:z,qkvHiddenSizes:N?Array.from(($(),P).subarray(Number(B)>>>0,Number(B)+N>>>0)):[],pastPresentShareBuffer:!!j})},986787:d=>{t.$b("BiasAdd",d,void 0)},986842:d=>{t.$b("BiasSplitGelu",d,void 0)},986903:d=>{t.$b("FastGelu",d,void 0)},986959:(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee,qt,Ki)=>{t.$b("Conv",d,{format:we?"NHWC":"NCHW",auto_pad:h,dilations:w?Array.from(($(),P).subarray(Number(w)>>>0,Number(y)>>>0)):[],group:k,kernel_shape:z?Array.from(($(),P).subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:B?Array.from(($(),P).subarray(Number(B)>>>0,Number(j)>>>0)):[],strides:Z?Array.from(($(),P).subarray(Number(Z)>>>0,Number(pe)>>>0)):[],w_is_const:()=>!!($(),L)[Number(ke)>>>0],activation:Ne(Ee),activation_params:qt?Array.from(($(),W).subarray(Number(qt)>>>0,Number(Ki)>>>0)):[]})},987543:d=>{t.$b("Gelu",d,void 0)},987595:(d,h,w,y,k,z,N,B,j)=>{t.$b("GroupQueryAttention",d,{numHeads:h,kvNumHeads:w,scale:y,softcap:k,doRotary:z,rotaryInterleaved:N,smoothSoftmax:B,localWindowSize:j})},987812:(d,h,w,y)=>{t.$b("LayerNormalization",d,{axis:h,epsilon:w,simplified:!!y})},987923:(d,h,w,y)=>{t.$b("LayerNormalization",d,{axis:h,epsilon:w,simplified:!!y})},988034:(d,h,w,y,k,z)=>{t.$b("MatMulNBits",d,{k:h,n:w,accuracyLevel:y,bits:k,blockSize:z})},988161:(d,h,w,y,k,z)=>{t.$b("MultiHeadAttention",d,{numHeads:h,isUnidirectional:w,maskFilterValue:y,scale:k,doRotary:z})},988320:(d,h)=>{t.$b("QuickGelu",d,{alpha:h})},988384:(d,h,w,y,k)=>{t.$b("RotaryEmbedding",d,{interleaved:!!h,numHeads:w,rotaryEmbeddingDim:y,scale:k})},988523:(d,h,w)=>{t.$b("SkipLayerNormalization",d,{epsilon:h,simplified:!!w})},988625:(d,h,w)=>{t.$b("SkipLayerNormalization",d,{epsilon:h,simplified:!!w})},988727:(d,h,w,y)=>{t.$b("GatherBlockQuantized",d,{gatherAxis:h,quantizeAxis:w,blockSize:y})},988848:d=>{t.Fd(d)},988882:(d,h)=>t.Hd(Number(d),Number(h),t.Yc.Kd,t.Yc.errors)};function dw(d,h,w){return yl(async()=>{await t.Dd(Number(d),Number(h),Number(w))})}function cw(){return typeof wasmOffsetConverter<"u"}function pw(d,h,w,y){var k=me();try{return eu(d,h,w,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function hw(d,h,w){var y=me();try{return Yl(d,h,w)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function fw(d){var h=me();try{jl(d)}catch(w){if(he(h),w!==w+0)throw w;ge(1,0)}}function mw(d,h){var w=me();try{return Gi(d,h)}catch(y){if(he(w),y!==y+0)throw y;ge(1,0)}}function gw(d,h,w){var y=me();try{Gl(d,h,w)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function bw(d,h){var w=me();try{tu(d,h)}catch(y){if(he(w),y!==y+0)throw y;ge(1,0)}}function yw(d,h,w,y,k,z,N){var B=me();try{return Ql(d,h,w,y,k,z,N)}catch(j){if(he(B),j!==j+0)throw j;ge(1,0)}}function ww(d,h,w,y,k,z){var N=me();try{Kl(d,h,w,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function _w(d,h,w,y){var k=me();try{Jl(d,h,w,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function xw(d,h,w,y,k){var z=me();try{Xl(d,h,w,y,k)}catch(N){if(he(z),N!==N+0)throw N;ge(1,0)}}function vw(d,h,w,y,k,z,N){var B=me();try{ru(d,h,w,y,k,z,N)}catch(j){if(he(B),j!==j+0)throw j;ge(1,0)}}function $w(d,h,w,y,k,z,N){var B=me();try{iu(d,h,w,y,k,z,N)}catch(j){if(he(B),j!==j+0)throw j;ge(1,0)}}function Sw(d,h,w,y,k,z,N,B){var j=me();try{lu(d,h,w,y,k,z,N,B)}catch(Z){if(he(j),Z!==Z+0)throw Z;ge(1,0)}}function kw(d,h,w,y,k){var z=me();try{return nu(d,h,w,y,k)}catch(N){if(he(z),N!==N+0)throw N;ge(1,0)}}function Tw(d,h,w){var y=me();try{return uu(d,h,w)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function Cw(d,h,w,y,k,z,N,B){var j=me();try{du(d,h,w,y,k,z,N,B)}catch(Z){if(he(j),Z!==Z+0)throw Z;ge(1,0)}}function Ew(d,h,w,y,k,z,N,B,j,Z,pe,we){var ke=me();try{au(d,h,w,y,k,z,N,B,j,Z,pe,we)}catch(Ee){if(he(ke),Ee!==Ee+0)throw Ee;ge(1,0)}}function Iw(d,h,w,y,k,z){var N=me();try{return ou(d,h,w,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function zw(d,h,w){var y=me();try{return cu(d,h,w)}catch(k){if(he(y),k!==k+0)throw k;return ge(1,0),0n}}function Mw(d,h,w,y,k,z,N,B,j){var Z=me();try{Zl(d,h,w,y,k,z,N,B,j)}catch(pe){if(he(Z),pe!==pe+0)throw pe;ge(1,0)}}function Aw(d){var h=me();try{return pu(d)}catch(w){if(he(h),w!==w+0)throw w;ge(1,0)}}function Nw(d,h){var w=me();try{return Cu(d,h)}catch(y){if(he(w),y!==y+0)throw y;return ge(1,0),0n}}function Pw(d){var h=me();try{return hu(d)}catch(w){if(he(h),w!==w+0)throw w;return ge(1,0),0n}}function Rw(d,h,w,y){var k=me();try{return wu(d,h,w,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function Ow(d,h,w,y,k){var z=me();try{return _u(d,h,w,y,k)}catch(N){if(he(z),N!==N+0)throw N;ge(1,0)}}function Bw(d,h,w,y,k,z){var N=me();try{return xu(d,h,w,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function Dw(d,h,w,y,k,z){var N=me();try{return vu(d,h,w,y,k,z)}catch(B){if(he(N),B!==B+0)throw B;ge(1,0)}}function Lw(d,h,w,y,k,z,N,B){var j=me();try{return su(d,h,w,y,k,z,N,B)}catch(Z){if(he(j),Z!==Z+0)throw Z;ge(1,0)}}function Uw(d,h,w,y,k){var z=me();try{return $u(d,h,w,y,k)}catch(N){if(he(z),N!==N+0)throw N;return ge(1,0),0n}}function Fw(d,h,w,y){var k=me();try{return Su(d,h,w,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function Ww(d,h,w,y){var k=me();try{return ku(d,h,w,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function qw(d,h,w,y,k,z,N,B,j,Z,pe,we){var ke=me();try{return Tu(d,h,w,y,k,z,N,B,j,Z,pe,we)}catch(Ee){if(he(ke),Ee!==Ee+0)throw Ee;ge(1,0)}}function Vw(d,h,w,y,k,z,N,B,j,Z,pe){var we=me();try{bu(d,h,w,y,k,z,N,B,j,Z,pe)}catch(ke){if(he(we),ke!==ke+0)throw ke;ge(1,0)}}function Hw(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee,qt,Ki){var Xw=me();try{yu(d,h,w,y,k,z,N,B,j,Z,pe,we,ke,Ee,qt,Ki)}catch(Xi){if(he(Xw),Xi!==Xi+0)throw Xi;ge(1,0)}}function Gw(d,h,w){var y=me();try{return fu(d,h,w)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function jw(d,h,w){var y=me();try{return mu(d,h,w)}catch(k){if(he(y),k!==k+0)throw k;ge(1,0)}}function Kw(d,h,w,y){var k=me();try{gu(d,h,w,y)}catch(z){if(he(k),z!==z+0)throw z;ge(1,0)}}function Nr(){if(0<Ze)Ke=Nr;else if(i)_==null||_(t),Y();else{for(var d=je;0<d.length;)d.shift()(t);0<Ze?Ke=Nr:(t.calledRun=!0,M||(Y(),_==null||_(t)))}}return i||(zt=await Ve(),Nr()),t.PTR_SIZE=4,U?t:new Promise((d,h)=>{_=d,S=h})}var Cf,Fu,m1=q(()=>{var e,t;Cf=Uu,Fu=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Fu&&Uu()}),ra,ho,Wu,Je,Ef,Or,qu,Vu,ia,Hu,aa,If,oa,zf,Vo=q(()=>{qo(),ra=typeof location>"u"?void 0:location.origin,ho=import.meta.url>"file:"&&import.meta.url<"file;",Wu=()=>{{if(ho){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ra).href}return import.meta.url}},Je=Wu(),Ef=()=>{if(Je&&!Je.startsWith("blob:"))return Je.substring(0,Je.lastIndexOf("/")+1)},Or=(e,t)=>{try{let n=t??Je;return(n?new URL(e,n):new URL(e)).origin===ra}catch{return!1}},qu=(e,t)=>{let n=t??Je;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Vu=(e,t)=>`${t??"./"}${e}`,ia=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Hu=async e=>(await import(e)).default,aa=(f1(),fr(Sf)).default,If=async()=>{if(!Je)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Or(Je))return[void 0,aa()];let e=await ia(Je);return[e,aa(e)]},oa=(m1(),fr(Tf)).default,zf=async(e,t,n,r)=>{let i=oa&&!(e||t);if(i)if(Je)i=Or(Je)||r&&!n;else if(r&&!n)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,oa];{let a="ort-wasm-simd-threaded.jsep.mjs",o=e??qu(a,t),s=n&&o&&!Or(o,t),l=s?await ia(o):o??Vu(a,t);return[s?l:void 0,await Hu(l)]}}}),sa,Br,Kn,la,Gu,ju,Ku,Ho,Te,$n=q(()=>{Vo(),Br=!1,Kn=!1,la=!1,Gu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},ju=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ku=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ho=async e=>{if(Br)return Promise.resolve();if(Kn)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(la)throw new Error("previous call to 'initializeWebAssembly()' failed.");Kn=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Ku())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!ju())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=Gu();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i=="string"?i:void 0,o=i==null?void 0:i.mjs,s=(o==null?void 0:o.href)??o,l=i==null?void 0:i.wasm,u=(l==null?void 0:l.href)??l,c=e.wasmBinary,[p,m]=await zf(s,a,n>1,!!c||!!u),b=!1,f=[];if(t>0&&f.push(new Promise(_=>{setTimeout(()=>{b=!0,_()},t)})),f.push(new Promise((_,S)=>{let x={numThreads:n};if(c)x.wasmBinary=c,x.locateFile=v=>v;else if(u||a)x.locateFile=v=>u??a+v;else if(s&&s.indexOf("blob:")!==0)x.locateFile=v=>new URL(v,s).href;else if(p){let v=Ef();v&&(x.locateFile=C=>v+C)}m(x).then(v=>{Kn=!1,Br=!0,sa=v,_(),p&&URL.revokeObjectURL(p)},v=>{Kn=!1,la=!0,S(v)})})),await Promise.race(f),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Te=()=>{if(Br&&sa)return sa;throw new Error("WebAssembly is not initialized yet.")}}),ht,ri,$e,Go=q(()=>{$n(),ht=(e,t)=>{let n=Te(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},ri=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([i,a])=>{let o=t?t+i:i;if(typeof a=="object")ri(a,o+".",n,r);else if(typeof a=="string"||typeof a=="number")r(o,a.toString());else if(typeof a=="boolean")r(o,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},$e=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,r===4?"i32":"i64")),o=t.getValue(i+r,"*"),s=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(n)}}}),Mf,g1=q(()=>{$n(),Go(),Mf=e=>{let t=Te(),n=0,r=[],i=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(i.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=ht(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&$e("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&ri(e.extra,"",new WeakSet,(o,s)=>{let l=ht(o,r),u=ht(s,r);t._OrtAddRunConfigEntry(n,l,u)!==0&&$e(`Can't set a run config entry: ${o} - ${s}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(o=>t._free(o)),a}}}),Xu,Yu,Zu,nn,Qu,Af,b1=q(()=>{$n(),Go(),Xu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Yu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Zu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},nn=(e,t,n,r)=>{let i=ht(t,r),a=ht(n,r);Te()._OrtAddSessionConfigEntry(e,i,a)!==0&&$e(`Can't set a session config entry: ${t} - ${n}.`)},Qu=async(e,t,n)=>{let r=t.executionProviders;for(let i of r){let a=typeof i=="string"?i:i.name,o=[];switch(a){case"webnn":if(a="WEBNN",nn(e,"session.disable_quant_qdq","1",n),nn(e,"session.disable_qdq_constant_folding","1",n),typeof i!="string"){let p=i==null?void 0:i.deviceType;p&&nn(e,"deviceType",p,n)}break;case"webgpu":if(a="JS",typeof i!="string"){let p=i;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);nn(e,"preferredLayout",p.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=ht(a,n),l=o.length,u=0,c=0;if(l>0){u=Te()._malloc(l*Te().PTR_SIZE),n.push(u),c=Te()._malloc(l*Te().PTR_SIZE),n.push(c);for(let p=0;p<l;p++)Te().setValue(u+p*Te().PTR_SIZE,o[p][0],"*"),Te().setValue(c+p*Te().PTR_SIZE,o[p][1],"*")}await Te()._OrtAppendExecutionProvider(e,s,u,c,l)!==0&&$e(`Can't append execution provider: ${a}.`)}},Af=async e=>{let t=Te(),n=0,r=[],i=e||{};Zu(i);try{let a=Xu(i.graphOptimizationLevel??"all"),o=Yu(i.executionMode??"sequential"),s=typeof i.logId=="string"?ht(i.logId,r):0,l=i.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let u=i.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log verbosity level is not valid: ${u}`);let c=typeof i.optimizedModelFilePath=="string"?ht(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!i.enableCpuMemArena,!!i.enableMemPattern,o,!!i.enableProfiling,0,s,l,u,c),n===0&&$e("Can't create session options."),i.executionProviders&&await Qu(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);nn(n,"enableGraphCapture",i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[p,m]of Object.entries(i.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let b=ht(p,r);t._OrtAddFreeDimensionOverride(n,b,m)!==0&&$e(`Can't set a free dimension override: ${p} - ${m}.`)}return i.extra!==void 0&&ri(i.extra,"",new WeakSet,(p,m)=>{nn(n,p,m,r)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&$e("Can't release session options."),r.forEach(o=>t._free(o)),a}}}),dn,Nt,cn,vi,ii,jo,Ko,fo,ae=q(()=>{dn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Nt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},cn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((i,a)=>i*a,1);return n>0?Math.ceil(r*n):void 0},vi=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ii=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},jo=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ko=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",fo=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Xo,Nf=q(()=>{qo(),Xo=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(s){if(s instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw s}let o=0;for(;;){let{done:s,value:l}=await i.read();if(s)break;let u=l.byteLength;new Uint8Array(a,o,u).set(l),o+=u}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Ju,ed,td,nd,Yo,rd,ye,Ot=q(()=>{ae(),Ju=["V","I","W","E","F"],ed=(e,t)=>{console.log(`[${Ju[e]},${new Date().toISOString()}]${t}`)},Yo=(e,t)=>{td=e,nd=t},rd=(e,t)=>{let n=ii(e),r=ii(td);n>=r&&ed(n,typeof t=="function"?t():t)},ye=(...e)=>{nd&&rd(...e)}}),id,Rn,R,ai,Pf,Rf,Of,de=q(()=>{id=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Rn=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),o=new Array(a);if(n){if(r<2||i<2)return;let s=id.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(s===void 0)return;[o[a-2],o[a-1]]=s}for(let s=n?3:1;s<=a;s++){let l=r-s<0?1:e[r-s],u=i-s<0?1:t[i-s];if(l!==u&&l>1&&u>1)return;let c=Math.max(l,u);if(l&&u)o[a-s]=Math.max(l,u);else{if(c>1)return;o[a-s]=0}}return o}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},R=class Kr{static size(t){return Kr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let i=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){i[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");i[a]=1,n/=t[a],a--}for(a--;a>=0;a--)i[a]=t[a];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Kr.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Kr.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let i=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[a])}return i}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let i=n-3;i>=0;--i)r[i]=r[i+1]*t[i+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((i,a)=>i+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,i)=>r===n[i])}},ai=class or{static adjustPoolAttributes(t,n,r,i,a,o){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let s=0;s<n.length-2;s++)s>=r.length?r.push(n[s+2]):r[s]=n[s+2];for(let s=0;s<r.length;s++)if(s<i.length){if(i[s]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let s=0;s<r.length;s++)if(s<a.length){if(a[s]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let s=0;s<r.length*2;s++)if(s<o.length){if(o[s]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let s=0;s<r.length;s++){if(r[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[s]>=r[s]||o[s+r.length]>=r[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,o,s){if(s){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)or.adjustPadAndReturnShape(t[l+(o?1:2)],n[l],r[l],i[l],a,l,l+t.length-2,s)}}static computePoolOutputShape(t,n,r,i,a,o,s){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return or.computeShapeHelper(t,n,l,r,i,a,o,s),l}static computeConvOutputShape(t,n,r,i,a,o,s){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return or.computeShapeHelper(!1,t,l,r,i,a,o,s),l}static computeShapeHelper(t,n,r,i,a,o,s,l){if(t)for(let u=0;u<n.length-2;u++)r.push(1);else for(let u=0;u<n.length-2;u++)r.push(or.adjustPadAndReturnShape(n[u+2],i[u],a[u],o[u],s,u,u+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,i,a,o,s,l){let u=r*(i-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[o]=0,a[s]=0,Math.floor((t-u)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+i-t;return a[o]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),a[s]=c-a[o],Math.floor((t+c-i)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[o]+a[s]-u)/n+1)}},Pf=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,o,s;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let l=-1;if(r?(s=n[0],l=1):(s=n[1],l=0),n[l]!==o)throw new Error("dimension mismatch");if(a<=0||s<=0||o<=0)throw new Error("invalid shape specified");if(i&&!Rn.isValidBroadcast(i,[a,s]))throw new Error("gemm: invalid bias shape for broadcast");return[a,s,o]}},Rf=-34028234663852886e22,Of=34028234663852886e22}),Zo,Bf=q(()=>{ae(),Zo=(e,t)=>new(vi(t))(e)}),ua,mo,da,ad,ca,od,pa,ha,fa,sd,Df,y1=q(()=>{ae(),Ot(),ua=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),mo=(e,t)=>{if(t==="int32")return e;let n=ua.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(vi(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let o=new Int32Array(i);for(let s=0;s<i;s++){let l=a[s];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");o[s]=Number(l)}return new Uint8Array(o.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let o=Int32Array.from(a,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},da=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let i=BigInt64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(r,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(r.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(r,Number);return new Uint8Array(i.buffer)}case"uint8":{if(r.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(r,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},ad=1,ca=()=>ad++,od=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),pa=(e,t)=>{let n=ua.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,i)=>r*i)*n/8):0},ha=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return pa(this.dataType,this.tensorShape)}destroy(){ye("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=da(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return n.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,i)=>r===n[i])}setIsDataConverted(e){this.isDataConverted=e}},fa=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!(a!=null&&a.input.dataTypes.includes(t))){if(o=od.get(t),!o||(a==null?void 0:a.input.dataTypes.includes(o)))throw new Error(`WebNN backend does not support data type: ${t}`);ye("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==pa(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,s,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=mo(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ye("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let r=(t=this.wrapper)!=null&&t.isDataConverted?da(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},sd=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ca();return this.tensorTrackersById.set(e,new fa(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){ye("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){ye("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=ca(),o=new ha({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new fa(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,n,r,i,a,o){let s=this.getMLContext(e);for(let[u,c]of this.freeTensors.entries())if(c.canReuseTensor(s,t,n)){ye("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${n}`);let p=this.freeTensors.splice(u,1)[0];return p.sessionId=e,p}ye("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${n}}`);let l=await s.createTensor({dataType:o??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new ha({sessionId:e,context:s,tensor:l,dataType:t,shape:n,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Df=(...e)=>new sd(...e)}),Xn,ld,Lf,w1=q(()=>{ae(),$n(),Bf(),y1(),Ot(),Xn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),ld=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((i,a)=>i===r[a]&&e[i]===t[i])},Lf=class{constructor(e){this.tensorManager=Df(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Yo(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ye("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ye("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)ye("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let n=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(n=>ld(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(i=>i.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ye("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=Xn.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){ye("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=Xn.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Te().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ye("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Zo(n,t)}}registerMLTensor(e,t,n,r){let i=Xn.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return ye("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,r,i,a,o=!1){if(!a)throw new Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let l=a.get(s);if(!l)throw new Error(`File with name ${s} not found in preloaded files.`);if(t+n>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let u=l.slice(t,t+n).buffer,c;switch(i.dataType){case"float32":c=new Float32Array(u);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(u):new Uint16Array(u);break;case"int32":c=new Int32Array(u);break;case"uint32":c=new Uint32Array(u);break;case"int64":if(o){let p=mo(new Uint8Array(u),"int64");c=new Int32Array(p.buffer),i.dataType="int32"}else c=new BigInt64Array(u);break;case"uint64":c=new BigUint64Array(u);break;case"int8":c=new Int8Array(u);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(u);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ye("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(i,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=Xn.get(dn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>"u"?!1:n?!!(i!=null&&i.input.dataTypes.includes(r)):!!(i!=null&&i.output.dataTypes.includes(r))}flush(){}}}),Qo=q(()=>{}),ma,Dr,Lr,ud,dd,ga,go,cd,Uf,_1=q(()=>{Ot(),Qo(),ma=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Dr=[],Lr=e=>Math.ceil(Number(e)/16)*16,ud=e=>{for(let t=0;t<Dr.length;t++){let n=Dr[t];if(e<=n)return n}return Math.ceil(e/16)*16},dd=1,ga=()=>dd++,go=async(e,t,n,r)=>{let i=Lr(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(s,0,n)),l}else return new Uint8Array(s.slice(0,n))}finally{a.destroy()}},cd=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ma)Dr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=Lr(i),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);let s=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=s.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,r,i)),s.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(s,0,o.gpuData.buffer,0,a),this.backend.device.queue.submit([u.finish()]),s.destroy(),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Lr(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=ga();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=ud(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let s=(i?this.freeBuffers:this.freeUniformBuffers).get(n);s?s.length>0?r=s.pop():r=this.backend.device.createBuffer({size:n,usage:t}):r=this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let o={id:ga(),type:0,buffer:r};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await go(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ma.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ye("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Uf=(...e)=>new cd(...e)}),pd,ve,Ae=q(()=>{pd=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new pd(e)}),On,Ur,Re,qe,ne,ze,bo,An,Xt,ee,Yn,D,J,Ff,Jo,hd,Wf,ce=q(()=>{ae(),de(),On=64,Ur=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Re=(e,t=1)=>{let n=Ur(e,t);return typeof n=="string"?n:n[0]},qe=(e,t=1)=>{let n=Ur(e,t);return typeof n=="string"?n:n[1]},ne=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:R.computeStrides(n)})}),t},ze=e=>e%4===0?4:e%2===0?2:1,bo=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,An=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Xt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ee=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Yn=(e,t,n,r,i)=>{let a=typeof n=="number",o=a?n:n.length,s=[...new Array(o).keys()],l=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,u=Ur(t,i),c=typeof u=="string"?u:u[1],p=typeof u=="string"?u:u[0],m={indices:l,value:c,storage:p,tensor:t},b=U=>typeof U=="string"?U:`${U}u`,f={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=a?"uniforms.":"",S=`${_}${e}_shape`,x=`${_}${e}_strides`,v="";for(let U=0;U<o-1;U++)v+=`
    let dim${U} = current / ${ee(x,U,o)};
    let rest${U} = current % ${ee(x,U,o)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${o-1}] = current;`;let C=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=U=>(f.offsetToIndices=!0,o<2?U:`o2i_${e}(${U})`),I=[];if(o>=2)for(let U=o-1;U>=0;U--)I.push(`${ee(x,U,o)} * (indices[${U}])`);let M=o<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,A=U=>(f.indicesToOffset=!0,o<2?U:`i2o_${e}(${U})`),$=(...U)=>o===0?"0u":`${m.indices}(${U.map(b).join(",")})`,O=(U,G)=>o<2?`${U}`:`${ee(U,G,o)}`,L=(U,G,Y)=>o<2?`${U}=${Y};`:`${ee(U,G,o)}=${Y};`,H={},K=(U,G)=>{f.broadcastedIndicesToOffset=!0;let Y=`${G.name}broadcastedIndicesTo${e}Offset`;if(Y in H)return`${Y}(${U})`;let V=[];for(let _e=o-1;_e>=0;_e--){let Ve=G.indicesGet("outputIndices",_e+G.rank-o);V.push(`${O(x,_e)} * (${Ve} % ${O(S,_e)})`)}return H[Y]=`fn ${Y}(outputIndices: ${G.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${Y}(${U})`},X=(U,G)=>(()=>{if(m.storage===m.value)return`${e}[${U}]=${G};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${G}), select(0u, 0xFFFFFFFFu, ${G} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${G}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${G}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),P=U=>(()=>{if(m.storage===m.value)return`${e}[${U}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${U}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${U}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),Q=o<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${c} {
    return ${P(`i2o_${e}(indices)`)};
  }`,W=o<2?"":(()=>{let U=s.map(Y=>`d${Y}: u32`).join(", "),G=s.map(Y=>`d${Y}`).join(", ");return`
  fn get_${e}(${U}) -> ${c} {
    return get_${e}ByIndices(${$(G)});
  }`})(),te=(...U)=>{if(U.length!==o)throw new Error(`indices length must be ${o}`);let G=U.map(b).join(",");return o===0?P("0u"):o===1?P(G[0]):(f.get=!0,f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}(${G})`)},ie=U=>o<2?P(U):(f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}ByIndices(${U})`),F=o<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${c}) {
    ${X(`i2o_${e}(indices)`,"value")}
  }`,re=o<2?"":(()=>{let U=s.map(Y=>`d${Y}: u32`).join(", "),G=s.map(Y=>`d${Y}`).join(", ");return`
  fn set_${e}(${U}, value: ${c}) {
    set_${e}ByIndices(${$(G)}, value);
  }`})();return{impl:()=>{let U=[],G=!1;return f.offsetToIndices&&(U.push(C),G=!0),f.indicesToOffset&&(U.push(M),G=!0),f.broadcastedIndicesToOffset&&(Object.values(H).forEach(Y=>U.push(Y)),G=!0),f.set&&(U.push(re),G=!0),f.setByIndices&&(U.push(F),G=!0),f.get&&(U.push(W),G=!0),f.getByIndices&&(U.push(Q),G=!0),!a&&G&&U.unshift(`const ${S} = ${m.indices}(${n.join(",")});`,`const ${x} = ${m.indices}(${R.computeStrides(n).join(",")});`),U.join(`
`)},type:m,offsetToIndices:T,indicesToOffset:A,broadcastedIndicesToOffset:K,indices:$,indicesGet:O,indicesSet:L,set:(...U)=>{if(U.length!==o+1)throw new Error(`indices length must be ${o}`);let G=U[o];if(typeof G!="string")throw new Error("value must be string");let Y=U.slice(0,o).map(b).join(",");return o===0?X("0u",G):o===1?X(Y[0],G):(f.set=!0,f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}(${Y}, ${G})`)},setByOffset:X,setByIndices:(U,G)=>o<2?X(U,G):(f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${G});`),get:te,getByOffset:P,getByIndices:ie,usage:r,name:e,strides:x,shape:S,rank:o}},D=(e,t,n,r=1)=>Yn(e,t,n,"input",r),J=(e,t,n,r=1)=>Yn(e,t,n,"output",r),Ff=(e,t,n)=>Yn(e,t,n,"atomicOutput",1),Jo=(e,t,n,r=1)=>Yn(e,t,n,"internal",r),hd=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=On){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Wf=(e,t)=>new hd(e,t)}),fd,ba,md,gd,bd,yd,nt,qf,Vf,Zt=q(()=>{ae(),de(),Ae(),ce(),fd=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ba=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),md=(e,t)=>R.sortBasedOnPerm(e,ba(e.length,t)),gd=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)i+=`a[${e[a]}]=i[${a}];`;return i+="return a;}"},bd=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},yd=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},nt=(e,t)=>{let n=e.dataType,r=e.dims.length,i=ba(r,t),a=md(e.dims,i),o=e.dims,s=a,l=r<2||yd(i,e.dims),u;if(l)return u=f=>{let _=D("input",n,o,4),S=J("output",n,s,4);return`
  ${f.registerUniform("output_size","u32").declareVariables(_,S)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let f=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(f/4)}]}},getShaderSource:u};let{newShape:c,newPerm:p}=bd(e.dims,i),m=R.areEqual(p,[2,3,1]),b=R.areEqual(p,[3,1,2]);if(c.length===2||m||b){o=m?[c[0],c[1]*c[2]]:b?[c[0]*c[1],c[2]]:c,s=[o[1],o[0]];let f=16;return u=_=>{let S=D("a",n,o.length),x=J("output",n,s.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(S,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${f+1}>, ${f}>;
  ${_.mainStart([f,f,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${f} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${f}u + local_id.x;
    let input_row = workgroup_id_x * ${f}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${f}u + local_id.x;
    let output_row = workgroup_id_y * ${f}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/f),y:Math.ceil(s[0]/f)},programUniforms:[{type:12,data:_},...ne(o,s)]}},getShaderSource:u}}return u=f=>{let _=D("a",n,o.length),S=J("output",n,s.length);return`
  ${f.registerUniform("output_size","u32").declareVariables(_,S)}

  ${gd(i,r,_,S)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let f=R.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...ne(o,s)]}},getShaderSource:u}},qf=(e,t)=>{fd(e.inputs,t.perm),e.compute(nt(e.inputs[0],t.perm))},Vf=e=>ve({perm:e.perm})}),wd,_d,xd,vd,$d,Sd,kd,Td,Cd,Ed,lt,Hf,Gf,jf,Kf,Xf,Yf,Zf,Qf,Jf,em,x1=q(()=>{ae(),de(),ce(),es(),Zt(),wd={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},_d={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},xd={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},vd={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},$d=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Sd=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let i=t.map(a=>e[a]);return[n,i]},kd=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},Td=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Cd=(e,t)=>{let n=[];if(!Td(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Ed=(e,t,n,r,i,a,o)=>{let s=n[0].dims,l=R.size(a),u=R.size(o),c=D("_A",n[0].dataType,s),p=J("output",i,a),m=64;l===1&&(m=256);let b=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,f=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${xd[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${wd[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${_d[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${r==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${vd[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:l},programUniforms:[{type:12,data:u}]})}},lt=(e,t,n,r)=>{let i=e.inputs.length===1?n:yo(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((b,f)=>f));let o=R.normalizeAxes(a,e.inputs[0].dims.length),s=o,l=e.inputs[0],u=Cd(s,e.inputs[0].dims.length);u.length>0&&(l=e.compute(nt(e.inputs[0],u),{inputs:[0],outputs:[-1]})[0],s=$d(s.length,l.dims.length));let[c,p]=Sd(l.dims,s),m=c;i.keepDims&&(m=kd(c,o)),e.compute(Ed(t,i.cacheKey,[l],r,e.inputs[0].dataType,m,p),{inputs:[l]})},Hf=(e,t)=>{lt(e,"ReduceMeanShared",t,"mean")},Gf=(e,t)=>{lt(e,"ReduceL1Shared",t,"l1")},jf=(e,t)=>{lt(e,"ReduceL2Shared",t,"l2")},Kf=(e,t)=>{lt(e,"ReduceLogSumExpShared",t,"logSumExp")},Xf=(e,t)=>{lt(e,"ReduceMaxShared",t,"max")},Yf=(e,t)=>{lt(e,"ReduceMinShared",t,"min")},Zf=(e,t)=>{lt(e,"ReduceProdShared",t,"prod")},Qf=(e,t)=>{lt(e,"ReduceSumShared",t,"sum")},Jf=(e,t)=>{lt(e,"ReduceSumSquareShared",t,"sumSquare")},em=(e,t)=>{lt(e,"ReduceLogSumShared",t,"logSum")}}),ut,Id,oi,yo,dt,zd,Md,Ad,Nd,Pd,Rd,Od,Bd,Dd,Ld,ct,tm,nm,rm,im,am,om,sm,lm,um,dm,es=q(()=>{ae(),de(),Ae(),ce(),x1(),ut=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Id=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],oi=(e,t,n,r,i,a,o=!1,s=!1)=>{let l=[],u=n[0].dims,c=u.length,p=R.normalizeAxes(i,c),m=!s&&p.length===0;u.forEach((_,S)=>{m||p.indexOf(S)>=0?o&&l.push(1):l.push(_)});let b=l.length,f=R.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let S=[],x=D("_A",n[0].dataType,c),v=J("output",a,b),C=r(x,v,p),T=C[2];for(let I=0,M=0;I<c;I++)m||p.indexOf(I)>=0?(o&&M++,T=`for(var j${I}: u32 = 0; j${I} < ${u[I]}; j${I}++) {
                  ${C[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${x.indicesSet("input_indices",I,`j${I}`)}
                  ${T}
                }`):(S.push(`${x.indicesSet("input_indices",I,v.indicesGet("output_indices",M))};`),M++);return`

        ${_.registerUniform("output_size","u32").declareVariables(x,v)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${v.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${C[0]}       // init ops for reduce max/min
          ${C[1]}
          ${T}
          ${C[3]}
          ${C.length===4?v.setByOffset("global_idx","value"):C.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...ne(u,l)]})}},yo=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),ve({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},dt=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:yo(i,n);e.compute(oi(t,{hint:a.cacheKey,inputDependencies:["rank"]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?Id:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},zd=(e,t)=>{ut(e.inputs),dt(e,"ReduceLogSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Md=(e,t)=>{ut(e.inputs),dt(e,"ReduceL1",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Ad=(e,t)=>{ut(e.inputs),dt(e,"ReduceL2",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Nd=(e,t)=>{ut(e.inputs),dt(e,"ReduceLogSumExp",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Pd=(e,t)=>{ut(e.inputs),dt(e,"ReduceMax",t,(n,r,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",o,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Rd=(e,t)=>{ut(e.inputs),dt(e,"ReduceMean",t,(n,r,i)=>{let a=1;for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&(a*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${a});`]})},Od=(e,t)=>{ut(e.inputs),dt(e,"ReduceMin",t,(n,r,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Bd=(e,t)=>{ut(e.inputs),dt(e,"ReduceProd",t,(n,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Dd=(e,t)=>{ut(e.inputs),dt(e,"ReduceSum",t,(n,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Ld=(e,t)=>{ut(e.inputs),dt(e,"ReduceSumSquare",t,(n,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ct=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:i*=e[a];return i<32&&r>1024},tm=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Rd(e,t):Hf(e,t)},nm=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Md(e,t):Gf(e,t)},rm=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ad(e,t):jf(e,t)},im=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Nd(e,t):Kf(e,t)},am=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Pd(e,t):Xf(e,t)},om=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Od(e,t):Yf(e,t)},sm=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bd(e,t):Zf(e,t)},lm=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Dd(e,t):Qf(e,t)},um=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ld(e,t):Jf(e,t)},dm=(e,t)=>{ct(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zd(e,t):em(e,t)}}),ya,cm,pm,wo,v1=q(()=>{ae(),Ae(),es(),ya=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},cm=(e,t)=>{ya(e.inputs);let n=(r,i,a)=>{let o=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&o.push(`input_indices[${s}] = 0;`);return[`${o.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(oi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},pm=(e,t)=>{ya(e.inputs);let n=(r,i,a)=>{let o=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&o.push(`input_indices[${s}] = 0;`);return[`${o.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(oi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},wo=e=>ve(e)}),Ud,Fr,Fd,Wd,qd,mr,Vd,hm,ts=q(()=>{ae(),de(),Qo(),ce(),Ud=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];if(o&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],u=n.dims[1],c=n.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,m=p,b=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let C of t.qkvHiddenSizes)if(C%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],b=t.qkvHiddenSizes[2]}let f=u;if(p!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+m+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(o){if(m!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=o.dims[3])}let S=f+_,x=-1,v=0;if(a)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==l||s.dims[1]!==t.numHeads||s.dims[2]!==u||s.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:u,pastSequenceLength:_,kvSequenceLength:f,totalSequenceLength:S,maxSequenceLength:x,inputHiddenSize:c,hiddenSize:p,vHiddenSize:b,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(b/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Fr=(e,t,n)=>t&&e?`
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
    `,Fd=(e,t,n,r,i,a,o,s)=>{let l=ze(o?1:a),u=64,c=a/l;c<u&&(u=32);let p=Math.ceil(a/l/u),m=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:c},{type:12,data:p}],b=Re(e.dataType,l),f=qe(1,l),_=["type"];o&&_.push("type"),s&&_.push("type");let S=x=>{let v=J("x",e.dataType,e.dims,l),C=[v],T=o?D("seq_lens",o.dataType,o.dims):void 0;T&&C.push(T);let I=s?D("total_sequence_length_input",s.dataType,s.dims):void 0;I&&C.push(I);let M=qe(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${u}>;
  var<workgroup> thread_sum: array<f32, ${u}>;
  ${x.registerUniforms(A).declareVariables(...C)}
  ${x.mainStart([u,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Fr(T,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${u}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${f}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${f}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${u}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${f}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${f}(x[offset + i]) - max_value);
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
        var f32input = ${f}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${M}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${u};${b};${l}`,inputDependencies:_},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:m})}},Wd=(e,t,n,r,i,a,o,s,l)=>{let u=o+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,u],p=e>1&&r,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,b=p?[a.batchSize,m,u,a.headSize]:void 0,f=a.nReps?a.nReps:1,_=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=ze(a.headSize),x=a.headSize/S,v=12,C={x:Math.ceil(u/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},T=[{type:12,data:a.sequenceLength},{type:12,data:x},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:_},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:f}],I=p&&r&&R.size(r.dims)>0,M=["type","type"];I&&M.push("type"),i&&M.push("type"),s&&M.push("type"),l&&M.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];p&&A.push({dims:b,dataType:t.dataType,gpuDataType:0});let $=O=>{let L=D("q",t.dataType,t.dims,S),H=D("key",n.dataType,n.dims,S),K=[L,H];if(I){let F=D("past_key",r.dataType,r.dims,S);K.push(F)}i&&K.push(D("attention_bias",i.dataType,i.dims));let X=s?D("seq_lens",s.dataType,s.dims):void 0;X&&K.push(X);let P=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;P&&K.push(P);let Q=J("output",t.dataType,c),W=[Q];p&&W.push(J("present_key",t.dataType,b,S));let te=qe(1,S),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${L.type.storage}, ${v*v}>;
  ${O.registerUniforms(ie).declareVariables(...K,...W)}
  ${O.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${f===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${f===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Fr(X,P,!0)}
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
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${Q.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${i!==void 0};${r!==void 0};${e}`,inputDependencies:M},getRunData:()=>({outputs:A,dispatchGroup:C,programUniforms:T}),getShaderSource:$}},qd=(e,t,n,r,i,a,o=void 0,s=void 0)=>{let l=a+i.kvSequenceLength,u=i.nReps?i.nReps:1,c=i.vHiddenSize*u,p=e>1&&r,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,b=p?[i.batchSize,m,l,i.headSize]:void 0,f=[i.batchSize,i.sequenceLength,c],_=12,S={x:Math.ceil(i.vHeadSize/_),y:Math.ceil(i.sequenceLength/_),z:i.batchSize*i.numHeads},x=[{type:12,data:i.sequenceLength},{type:12,data:l},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:u}],v=p&&r&&R.size(r.dims)>0,C=["type","type"];v&&C.push("type"),o&&C.push("type"),s&&C.push("type");let T=[{dims:f,dataType:t.dataType,gpuDataType:0}];p&&T.push({dims:b,dataType:t.dataType,gpuDataType:0});let I=M=>{let A=D("probs",t.dataType,t.dims),$=D("v",n.dataType,n.dims),O=[A,$];v&&O.push(D("past_value",r.dataType,r.dims));let L=o?D("seq_lens",o.dataType,o.dims):void 0;o&&O.push(L);let H=s?D("total_sequence_length_input",s.dataType,s.dims):void 0;s&&O.push(H);let K=[J("output",t.dataType,f)];p&&K.push(J("present_value",t.dataType,b));let X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${A.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${A.type.value}, ${_*_}>;
  ${M.registerUniforms(X).declareVariables(...O,...K)}
  ${M.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${u===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${u===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Fr(L,H,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:T,dispatchGroup:S,programUniforms:x}),getShaderSource:I}},mr=(e,t,n,r,i,a,o,s,l,u,c=void 0,p=void 0)=>{let m=Math.min(e.outputCount,1+(o?1:0)+(s?1:0)),b=m>1?o:void 0,f=m>1?s:void 0,_=m>1?u.pastSequenceLength:0,S=_+u.kvSequenceLength,x=l&&R.size(l.dims)>0?l:void 0,v=[t,n];b&&R.size(b.dims)>0&&v.push(b),x&&v.push(x),c&&v.push(c),p&&v.push(p);let C=e.compute(Wd(m,t,n,b,x,u,_,c,p),{inputs:v,outputs:m>1?[-1,1]:[-1]})[0];e.compute(Fd(C,u.batchSize,u.numHeads,_,u.sequenceLength,S,c,p),{inputs:c&&p?[C,c,p]:[C],outputs:[]});let T=[C,r];f&&R.size(f.dims)>0&&T.push(f),c&&T.push(c),p&&T.push(p),e.compute(qd(m,C,r,f,u,_,c,p),{inputs:T,outputs:m>1?[0,2]:[0]})},Vd=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,o=12,s={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=p=>{let m=J("output_q",l[0].dataType,n),b=J("output_k",l[0].dataType,n),f=J("output_v",l[0].dataType,n),_=D("input",l[0].dataType,l[0].dims),S=D("weight",l[1].dataType,l[1].dims),x=D("bias",l[2].dataType,l[2].dims),v=_.type.storage,C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${v}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${v}, ${o*o}>;
  var<workgroup> tileWeightK: array<${v}, ${o*o}>;
  var<workgroup> tileWeightV: array<${v}, ${o*o}>;
  ${p.registerUniforms(C).declareVariables(_,S,x,m,b,f)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:u}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},hm=(e,t)=>{let n=Ud(e.inputs,t),[r,i,a]=Vd(e,n);return mr(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),Hd,Gd,jd,fm,$1=q(()=>{at(),ae(),de(),Ae(),ce(),Hd=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,i,a)=>{let o=i.length;if(o!==r.length)throw new Error(`${a}: num dimensions != ${o}`);i.forEach((s,l)=>{if(s!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},Gd=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,o=r?ze(a[a.length-1]):1,s=i==="NHWC"&&a.length>1?o:1,l=R.size(a)/o,u=r,c=u?a.length:a,p=D("x",e[0].dataType,e[0].dims,o),m=D("scale",e[1].dataType,e[1].dims,s),b=D("bias",e[2].dataType,e[2].dims,s),f=D("inputMean",e[3].dataType,e[3].dims,s),_=D("inputVar",e[4].dataType,e[4].dims,s),S=J("y",e[0].dataType,c,o),x=()=>{let C="";if(r)C=`let cOffset = ${a.length===1?"0u":i==="NHWC"?`outputIndices[${a.length-1}] / ${o}`:"outputIndices[1]"};`;else if(i==="NCHW")C=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{C=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let T=1;T<m.rank;T++)C+=`cIndices[${T}] = outputIndices[${T}];`;C+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return C},v=C=>`
  const epsilon = ${n};
  ${C.registerUniform("outputSize","u32").declareVariables(p,m,b,f,_,S)}
  ${C.mainStart()}
  ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${o}`)};
    ${x()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${o}`,inputDependencies:u?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u?[{type:12,data:l},...ne(a)]:[{type:12,data:l}]})}},jd=e=>ve(e),fm=(e,t)=>{let{inputs:n,outputCount:r}=e,i=jd({...t,outputCount:r});if(Se.webgpu.validateInputContent&&Hd(n,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Gd(n,i))}}),Kd,Xd,mm,S1=q(()=>{de(),ce(),Kd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Xd=e=>{let t=e[0].dims,n=e[0].dims[2],r=R.size(t)/4,i=e[0].dataType,a=D("input",i,t,4),o=D("bias",i,[n],4),s=D("residual",i,t,4),l=J("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:u=>`
  const channels = ${n}u / 4;
  ${u.declareVariables(a,o,s,l)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},mm=e=>{Kd(e.inputs),e.compute(Xd(e.inputs))}}),Yd,xe,gm,bm,ym,wm,_m,xm,vm,$m,Sm,Zd,km,Tm,Cm,Em,sr,Im,Xr,zm,Mm,Am,Nm,Pm,Rm,Om,Bm,Dm,Lm,Um,Fm,Wm,qm,Vm,Hm,wa,Gm,_o,xo,jm,Km,Xm,Qd,Jd,Ym,ns=q(()=>{ae(),de(),Ae(),ce(),Yd=(e,t,n,r,i,a,o)=>{let s=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let u=D("inputData",n,[s],4),c=J("outputData",r,[s],4),p=[{name:"vec_size",type:"u32"}];return o&&p.push(...o),`
      ${e.registerUniforms(p).declareVariables(u,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${u.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},xe=(e,t,n,r,i,a=e.dataType,o,s)=>{let l=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return o&&l.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:u=>Yd(u,R.size(e.dims),e.dataType,a,n,r,s),getRunData:u=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(R.size(u[0].dims)/64/4)},programUniforms:l})}},gm=e=>{e.compute(xe(e.inputs[0],"Abs","abs"))},bm=e=>{e.compute(xe(e.inputs[0],"Acos","acos"))},ym=e=>{e.compute(xe(e.inputs[0],"Acosh","acosh"))},wm=e=>{e.compute(xe(e.inputs[0],"Asin","asin"))},_m=e=>{e.compute(xe(e.inputs[0],"Asinh","asinh"))},xm=e=>{e.compute(xe(e.inputs[0],"Atan","atan"))},vm=e=>{e.compute(xe(e.inputs[0],"Atanh","atanh"))},$m=e=>ve(e),Sm=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(xe(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},Zd=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ve({min:t,max:n})},km=(e,t)=>{let n=t||Zd(e.inputs),r=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Tm=e=>{e.compute(xe(e.inputs[0],"Ceil","ceil"))},Cm=e=>{e.compute(xe(e.inputs[0],"Cos","cos"))},Em=e=>{e.compute(xe(e.inputs[0],"Cosh","cosh"))},sr=e=>ve(e),Im=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Xr=(e="f32")=>`
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
}`,zm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Xr(t)))},Mm=e=>{e.compute(xe(e.inputs[0],"Exp","exp"))},Am=e=>{e.compute(xe(e.inputs[0],"Floor","floor"))},Nm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Xr(t)))},Pm=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Rm=e=>{e.compute(xe(e.inputs[0],"Not",t=>`!${t}`))},Om=e=>{e.compute(xe(e.inputs[0],"Neg",t=>`-${t}`))},Bm=e=>{e.compute(xe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Dm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},Lm=e=>{e.compute(xe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Um=e=>ve(e),Fm=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},Wm=e=>{e.compute(xe(e.inputs[0],"Sin","sin"))},qm=e=>{e.compute(xe(e.inputs[0],"Sinh","sinh"))},Vm=e=>{e.compute(xe(e.inputs[0],"Sqrt","sqrt"))},Hm=e=>{e.compute(xe(e.inputs[0],"Tan","tan"))},wa=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Gm=e=>{e.compute(xe(e.inputs[0],"Tanh",wa))},_o=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${wa("v")};
}
`,xo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,jm=e=>{let t=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"FastGelu",xo,_o(t),void 0,e.inputs[0].dataType))},Km=(e,t)=>{let n=qe(e.inputs[0].dataType);return e.compute(xe(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},Xm=e=>{e.compute(xe(e.inputs[0],"Log","log"))},Qd=(e,t)=>`
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
`,Jd=e=>`quick_gelu_impl(${e})`,Ym=(e,t)=>{let n=qe(e.inputs[0].dataType);e.compute(xe(e.inputs[0],"QuickGelu",Jd,Qd(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),ec,tc,Zm,k1=q(()=>{de(),ce(),ns(),ec=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},tc=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=D("input",e[0].dataType,e[0].dims,4),r=D("bias",e[0].dataType,[e[0].dims[2]],4),i=J("output",e[0].dataType,t,4),a=R.size(t)/4,o=Re(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:s=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${s.declareVariables(n,r,i)}

  ${Xr(o)}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Zm=e=>{ec(e.inputs),e.compute(tc(e.inputs))}}),nc,rc,pt,Qm,Jm,eg,tg,ng,rg,ig,ag,og,sg,T1=q(()=>{ae(),de(),ce(),nc=(e,t,n,r,i,a,o,s,l,u,c,p)=>{let m,b;typeof s=="string"?m=b=(v,C)=>`${s}((${v}),(${C}))`:typeof s=="function"?m=b=s:(m=s.scalar,b=s.vector);let f=J("outputData",c,r.length,4),_=D("aData",l,t.length,4),S=D("bData",u,n.length,4),x;if(i)if(a){let v=R.size(t)===1,C=R.size(n)===1,T=t.length>0&&t[t.length-1]%4===0,I=n.length>0&&n[n.length-1]%4===0;v||C?x=f.setByOffset("global_idx",b(v?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),C?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):x=`
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",f)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",f)};
            ${f.setByOffset("global_idx",b(o||T?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||I?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=f.setByOffset("global_idx",b(_.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(C,T,I="")=>{let M=`aData[indexA${T}][componentA${T}]`,A=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${f.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${_.broadcastedIndicesToOffset(`outputIndices${T}`,f)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`,f)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${C}[${T}] = ${I}(${m(M,A)});
          `};c===9?x=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(_,S,f)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},rc=(e,t,n,r,i,a,o=n.dataType)=>{let s=n.dims.map(Number),l=r.dims.map(Number),u=!R.areEqual(s,l),c=s,p=R.size(s),m=!1,b=!1,f=[u];if(u){let _=Rn.calcShape(s,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");c=_.slice(),p=R.size(c);let S=R.size(s)===1,x=R.size(l)===1,v=s.length>0&&s[s.length-1]%4===0,C=l.length>0&&l[l.length-1]%4===0;f.push(S),f.push(x),f.push(v),f.push(C);let T=1;for(let I=1;I<c.length;I++){let M=s[s.length-I],A=l[l.length-I];if(M===A)T*=M;else break}T%4===0?(b=!0,m=!0):(S||x||v||C)&&(m=!0)}else m=!0;return f.push(m),{name:e,shaderCache:{hint:t+f.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>nc(_,s,l,c,m,u,b,i,n.dataType,r.dataType,o,a),getRunData:()=>({outputs:[{dims:c,dataType:o}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(c)/4)},...ne(s,l,c)]})}},pt=(e,t,n,r,i,a)=>{e.compute(rc(t,i??"",e.inputs[0],e.inputs[1],n,r,a))},Qm=e=>{pt(e,"Add",(t,n)=>`${t}+${n}`)},Jm=e=>{pt(e,"Div",(t,n)=>`${t}/${n}`)},eg=e=>{pt(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},tg=e=>{pt(e,"Mul",(t,n)=>`${t}*${n}`)},ng=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;pt(e,"Pow",{scalar:(n,r)=>`pow_custom(${n},${r})`,vector:(n,r)=>`pow_vector_custom(${n},${r})`},`
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
      `)},rg=e=>{pt(e,"Sub",(t,n)=>`${t}-${n}`)},ig=e=>{pt(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},ag=e=>{pt(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},og=e=>{pt(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},sg=e=>{pt(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),ic,ac,oc,sc,lg,ug,C1=q(()=>{ae(),de(),Ae(),ce(),ic=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],i=r.dataType,a=r.dims.length;e.forEach((o,s)=>{if(s!==n){if(o.dataType!==i)throw new Error("input tensors should be one type");if(o.dims.length!==a)throw new Error("input tensors should have the same shape");o.dims.forEach((l,u)=>{if(u!==t&&l!==r.dims[u])throw new Error("non concat dimensions must match")})}})},ac=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,oc=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset("global_idx",e[i].getByIndices("indices"));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},sc=(e,t,n,r)=>{let i=R.size(n),a=new Array(e.length),o=new Array(e.length),s=0,l=[],u=[],c=[{type:12,data:i}];for(let _=0;_<e.length;++_)s+=e[_].dims[t],a[_]=s,u.push(e[_].dims.length),o[_]=D(`input${_}`,r,u[_]),l.push("rank"),c.push({type:12,data:a[_]});for(let _=0;_<e.length;++_)c.push(...ne(e[_].dims));c.push(...ne(n));let p=J("output",r,n.length),m=p.indicesGet("indices",t),b=Array.from(Array(a.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),f=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)_.registerUniform(`sizeInConcatAxis${S}`,"u32");return _.declareVariables(...o,p)})()}

  ${ac(a.length,b)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${b});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${oc(o,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:f}},lg=(e,t)=>{let n=e.inputs,r=n[0].dims,i=R.normalizeAxis(t.axis,r.length);ic(n,i);let a=r.slice();a[i]=n.reduce((s,l)=>s+(l.dims.length>i?l.dims[i]:0),0);let o=n.filter(s=>R.size(s.dims)>0);e.compute(sc(o,i,a,n[0].dataType),{inputs:o})},ug=e=>ve({axis:e.axis})}),yn,wn,_n,rs,Sn=q(()=>{ae(),de(),yn=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},wn=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},_n=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},rs=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,r]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=(e==null?void 0:e.activation_params)||[Rf,Of];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ue,dg,is=q(()=>{Ue=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},dg=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),cg,E1=q(()=>{cg=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),cr,as,os=q(()=>{ae(),de(),ce(),Sn(),cr=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((o,s)=>`
      if (${ee(t.shape,s,t.rank)} != 1) {
        ${t.indicesSet(e,s,ee(i,s+a,r))}
      } else {
        ${t.indicesSet(e,s,0)}
      }`).join("")}
`},as=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,l=o[o.length-2],u=s[s.length-1],c=o[o.length-1],p=ze(u),m=ze(c),b=ze(l),f=R.size(n)/p/b,_=e.length>2,S=r?r.slice(0,-2):n.slice(0,-2),x=[R.size(S),l,u],v=[{type:12,data:f},{type:12,data:l},{type:12,data:u},{type:12,data:c}];wn(t,v),v.push(...ne(S,o,s)),_&&v.push(...ne(e[2].dims)),v.push(...ne(x));let C=T=>{let I=Jo("batch_dims",e[0].dataType,S.length),M=D("a",e[0].dataType,o.length,m),A=D("b",e[1].dataType,s.length,p),$=J("output",e[0].dataType,x.length,p),O=Re($.type.tensor),L=yn(t,$.type.value,O),H=[M,A],K="";if(_){let Q=i?p:1;H.push(D("bias",e[2].dataType,e[2].dims.length,Q)),K=`${i?`value += bias[col / ${Q}];`:`value += ${$.type.value}(bias[row + i]);`}`}let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];_n(t,X);let P=()=>{let Q=`var a_data: ${M.type.value};`;for(let W=0;W<m;W++)Q+=`
              let b_data${W} = b[(b_offset + (k + ${W}) * uniforms.N + col) / ${p}];`;for(let W=0;W<b;W++){Q+=`a_data = a[(a_offset + (row + ${W}) * uniforms.K + k) / ${m}];`;for(let te=0;te<m;te++)Q+=`
            values[${W}] = fma(${A.type.value}(a_data${m===1?"":`[${te}]`}), b_data${te}, values[${W}]);
`}return Q};return`
  ${T.registerUniforms(X).registerInternalVariables(I).declareVariables(...H,$)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${M.type.indices};
    ${cr("a_indices",M,M.rank-2,I.rank,"batch_indices")}
    ${M.indicesSet("a_indices",M.rank-2,0)}
    ${M.indicesSet("a_indices",M.rank-1,0)}
    let a_offset = ${M.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${cr("b_indices",A,A.rank-2,I.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${P()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${K}
      ${L}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${m};${b};${i}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:v}),getShaderSource:C}}}),lc,uc,vo,_a,dc,$o,cc,si,ss=q(()=>{ae(),de(),ce(),Sn(),os(),is(),lc=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,uc=(e,t)=>e?`
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
        }`,vo=(e,t,n="f32",r,i=!1,a=32,o=!1,s=32)=>{let l=t[1]*e[1],u=t[0]*e[0],c=i?l:a,p=i?a:l,m=c/t[0],b=a/t[1];if(!((i&&m===4&&e[1]===4||!i&&(m===3||m===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${n}>, ${c/m}>, ${p}>;
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
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${lc(i,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
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

          ${uc(i,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},_a=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,dc=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",$o=(e,t,n="f32",r,i=!1,a=32,o=!1,s=32,l=!1)=>{let u=e[1]*t[1],c=e[0]*t[0],p=i?u:a,m=i?a:u;if(!(m%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let b=m/t[1],f=p/t[0],_=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${u};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${_a(i,r)}
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

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${f};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${f}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${_a(i,r)}
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
      ${dc(i)}
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
    ${S}
  }
`},cc=(e,t,n,r,i=!1)=>{let[a,o,s,l]=r,u=Re(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ue(e,u)} {
      var value = ${Ue(e,u)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${cr("aIndices",o,o.rank-2,a.rank,"batchIndices")}
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
        ${cr("bIndices",s,s.rank-2,a.rank,"batchIndices")}
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
    `},si=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,l=o.slice(0,-2),u=s.slice(0,-2),c=r?r.slice(0,-2):n.slice(0,-2),p=R.size(c),m=o[o.length-2],b=o[o.length-1],f=s[s.length-1],_=b%4===0&&f%4===0,S=m<=8?[4,1,1]:[4,4,1],x=[8,8,1],v=[Math.ceil(f/x[0]/S[0]),Math.ceil(m/x[1]/S[1]),Math.ceil(p/x[2]/S[2])],C=_?4:1,T=[...l,m,b/C],I=T.length,M=[...u,b,f/C],A=M.length,$=[p,m,f/C],O=[{type:6,data:m},{type:6,data:f},{type:6,data:b}];wn(t,O),O.push(...ne(c,T,M));let L=["rank","rank"],H=e.length>2;H&&(O.push(...ne(e[2].dims)),L.push("rank")),O.push(...ne($));let K=X=>{let P=c.length,Q=Jo("batchDims",e[0].dataType,P,1),W=Re(e[0].dataType),te=D("a",e[0].dataType,I,C),ie=D("b",e[1].dataType,A,C),F=J("result",e[0].dataType,$.length,C),re=[te,ie];if(H){let _e=i?C:1;re.push(D("bias",e[2].dataType,e[2].dims.length,_e))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];_n(t,U);let G=Re(F.type.tensor),Y=yn(t,F.type.value,G),V=cc(C,H,Y,[Q,te,ie,F],i);return`
  ${X.registerUniforms(U).registerInternalVariables(Q).declareVariables(...re,F)}
  ${V}
  ${_?vo(S,x,W,Q):$o(S,x,W,Q)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${_};${i}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:O}),getShaderSource:K}}}),pc,pg,I1=q(()=>{ae(),Ot(),ce(),Sn(),is(),E1(),ss(),pc=(e,t,n,r,i=!1,a,o=4,s=4,l=4,u="f32")=>{let c=O=>{switch(O){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${u}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},p=O=>{switch(O){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=e?`
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
    `,f=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",x=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${Ue(o,u)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${f} && xCol >= 0 && xCol < ${_}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(o)}
    }
    return resData;`,C=e?t&&r?`
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
    return ${Ue(o,u)}(0.0);`,T=e?r&&n?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${Ue(s,u)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${Ue(s,u)}(0.0);`,I=Ue(l,u),M=Ue(e?o:s,u),A=Ue(e?s:o,u),$=yn(a,I,u);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${M} {
      ${e?C:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?T:C}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${dg(i)}
      ${$}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},pg=(e,t,n,r,i,a,o,s,l)=>{let u=t.format==="NHWC",c=u?e[0].dims[3]:e[0].dims[1],p=n[0],m=u?n[2]:n[3],b=u?n[1]:n[2],f=u?n[3]:n[1],_=u&&(c%4===0||c%3===0)&&f%4===0,S=u?f:m*b,x=u?m*b:f,v=[8,8,1],C=r<=8?[4,1,1]:[4,4,1],T=[Math.ceil(S/v[0]/C[0]),Math.ceil(x/v[1]/C[1]),Math.ceil(p/v[2]/C[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let I=_?u&&c%4!==0?3:4:1,M=v[1]*C[1],A=v[0]*C[0],$=Math.max(v[0]*I,v[1]),O=r%M===0,L=i%A===0,H=a%$===0,K=_?[I,4,4]:[1,1,1],X=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];wn(t,X),X.push(...ne(e[0].dims,e[1].dims));let P=["rank","rank"];o&&(X.push(...ne(e[2].dims)),P.push("rank")),X.push(...ne(n));let Q=W=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];_n(t,te);let ie=_?4:1,F=Re(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${F}>`:F}) {
        result[flatIndex] = ${_?`vec4<${F}>`:F}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${F}>`:F}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,U=D("x",e[0].dataType,e[0].dims.length,I===3?1:I),G=D("w",e[1].dataType,e[1].dims.length,ie),Y=[U,G],V=J("result",e[0].dataType,n.length,ie);if(o){let _e=D("bias",e[2].dataType,e[2].dims.length,ie);Y.push(_e),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${F}>`:F} {
          return bias[coords.${u?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${cg("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${W.registerUniforms(te).declareVariables(...Y,V)}
        ${re}
        ${pc(u,O,L,H,o,t,K[0],K[1],K[2],F)}
        ${_?vo(C,v,F,void 0,!u,$):$o(C,v,F,void 0,!u,$,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${_};${O};${L};${H};${M};${A};${$}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:X}),getShaderSource:Q}}}),hc,xa,Zn,fc,va,mc,hg,fg,z1=q(()=>{ae(),Ot(),de(),ce(),Sn(),is(),hc=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},xa=e=>typeof e=="number"?[e,e,e]:e,Zn=(e,t)=>t<=1?e:e+(e-1)*(t-1),fc=(e,t,n,r=1)=>{let i=Zn(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},va=(e,t,n,r,i)=>{i==null&&(i=fc(e,t[0],r[0]));let a=[0,0,0,n];for(let o=0;o<3;o++)e[o]+2*i>=t[o]&&(a[o]=Math.trunc((e[o]-t[o]+2*i)/r[o]+1));return a},mc=(e,t,n,r,i,a,o,s,l,u)=>{let c,p,m,b;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=va([t,n,r,1],[s,l,u],1,[i,a,o],e);p=f[0],m=f[1],b=f[2]}else if(Array.isArray(e)){if(!e.every((_,S,x)=>_===x[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=va([t,n,r,1],[s,l,u],1,[i,a,o],e[0]);p=f[0],m=f[1],b=f[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/i),m=Math.ceil(n/a),b=Math.ceil(r/o);let f=(p-1)*i+s-t,_=(m-1)*a+l-n,S=(b-1)*o+u-r,x=Math.floor(f/2),v=f-x,C=Math.floor(_/2),T=_-C,I=Math.floor(S/2),M=S-I;c={top:C,bottom:T,left:I,right:M,front:x,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:m,outWidth:b}},hg=(e,t,n,r,i,a=!1,o="channelsLast")=>{let s,l,u,c,p;if(o==="channelsLast")[s,l,u,c,p]=e;else if(o==="channelsFirst")[s,p,l,u,c]=e;else throw new Error(`Unknown dataFormat ${o}`);let[m,,b,f,_]=t,[S,x,v]=xa(n),[C,T,I]=xa(r),M=Zn(b,C),A=Zn(f,T),$=Zn(_,I),{padInfo:O,outDepth:L,outHeight:H,outWidth:K}=mc(i,l,u,c,S,x,v,M,A,$),X=a?m*p:m,P=[0,0,0,0,0];return o==="channelsFirst"?P=[s,X,L,H,K]:o==="channelsLast"&&(P=[s,L,H,K,X]),{batchSize:s,dataFormat:o,inDepth:l,inHeight:u,inWidth:c,inChannels:p,outDepth:L,outHeight:H,outWidth:K,outChannels:X,padInfo:O,strideDepth:S,strideHeight:x,strideWidth:v,filterDepth:b,filterHeight:f,filterWidth:_,effectiveFilterDepth:M,effectiveFilterHeight:A,effectiveFilterWidth:$,dilationDepth:C,dilationHeight:T,dilationWidth:I,inShape:e,outShape:P,filterShape:t}},fg=(e,t,n,r,i,a)=>{let o=a==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let s=[64,1,1],l={x:n.map((S,x)=>x)},u=[Math.ceil(hc(l.x.map(S=>n[S]))/s[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let c=1,p=R.size(n),m=[{type:12,data:p},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];wn(t,m),m.push(...ne(e[0].dims,e[1].dims));let b=["rank","rank"],f=e.length===3;f&&(m.push(...ne(e[2].dims)),b.push("rank")),m.push(...ne(n));let _=S=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];_n(t,x);let v=1,C=Re(e[0].dataType),T=D("x",e[0].dataType,e[0].dims.length,c),I=D("W",e[1].dataType,e[1].dims.length,v),M=[T,I],A=J("result",e[0].dataType,n.length,v),$="";if(f){let H=D("bias",e[2].dataType,e[2].dims.length,v);M.push(H),$+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${C} {
          return bias[${o?ee("coords",4,5):ee("coords",1,5)}];
        }`}let O=Ue(c,C),L=yn(t,O,C);return`
            ${$}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${S.registerUniforms(x).declareVariables(...M,A)}
          ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${ee("coords",0,T.rank)};
              let d2 = ${o?ee("coords",T.rank-1,T.rank):ee("coords",1,T.rank)};
              let xFRCCorner = vec3<u32>(${o?ee("coords",1,T.rank):ee("coords",2,T.rank)},
              ${o?ee("coords",2,T.rank):ee("coords",3,T.rank)},
              ${o?ee("coords",3,T.rank):ee("coords",4,T.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?ee("uniforms.x_shape",1,T.rank):ee("uniforms.x_shape",2,T.rank)};
              let xShapeZ = ${o?ee("uniforms.x_shape",2,T.rank):ee("uniforms.x_shape",3,T.rank)};
              let xShapeW = ${o?ee("uniforms.x_shape",3,T.rank):ee("uniforms.x_shape",4,T.rank)};
              let xShapeU = ${o?ee("uniforms.x_shape",4,T.rank):ee("uniforms.x_shape",1,T.rank)};
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
              ${f?"value = value + getBiasByOutputCoords(coords)":""};
              ${L}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${c};${f}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:m}),getShaderSource:_}}}),mg,gg,M1=q(()=>{ae(),de(),ce(),Sn(),mg=(e,t,n,r)=>{let i=e.length>2,a=i?"value += b[output_channel];":"",o=e[0].dims,s=e[1].dims,l=t.format==="NHWC",u=l?n[3]:n[1],c=u/t.group,p=l&&c>=4?ze(u):1,m=R.size(n)/p,b=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];wn(t,b),b.push(...ne(o,[s[0],s[1],s[2],s[3]/p]));let f=i?["rank","rank","rank"]:["rank","rank"];b.push(...ne([n[0],n[1],n[2],n[3]/p]));let _=S=>{let x=J("output",e[0].dataType,n.length,p),v=Re(x.type.tensor),C=yn(t,x.type.value,v),T=D("x",e[0].dataType,o.length),I=D("w",e[1].dataType,s.length,p),M=[T,I];i&&M.push(D("b",e[2].dataType,e[2].dims,p));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];_n(t,A);let $=l?`
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
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(A).declareVariables(...M,x)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${$}
    ${a}
    ${C}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},gg=(e,t,n,r)=>{let i=e.length>2,a=ze(n[3]),o=ze(n[2]),s=R.size(n)/a/o,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],u=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[n[0],n[1],n[2],n[3]/a],p=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];wn(t,p),p.push(...ne(l,u,c));let m=(o-1)*t.strides[1]+u[1],b=f=>{let _=J("output",e[0].dataType,c.length,a),S=Re(_.type.tensor),x=yn(t,_.type.value,S),v=D("x",e[0].dataType,l.length,a),C=D("w",e[1].dataType,u.length,a),T=[v,C];i&&T.push(D("b",e[2].dataType,e[2].dims,a));let I=i?"value += b[output_channel];":"",M=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return _n(t,M),`
  ${f.registerUniforms(M).declareVariables(...T,_)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
          let w_val = ${C.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${I}
      ${x}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${o};${m};${u[0]};${u[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:b}}}),gc,Wr,bc,qr,So,$a,yc,wc,ko,A1=q(()=>{de(),I1(),z1(),ss(),M1(),Sn(),os(),Zt(),gc=(e,t,n,r,i,a)=>{let o=e[0],s=e.slice(a?1:2,a?3:4),l=s.length,u=t[0],c=t.slice(2).map((m,b)=>m+(m-1)*(n[b]-1)),p=s.map((m,b)=>m+r[b]+r[b+l]).map((m,b)=>Math.floor((m-c[b]+i[b])/i[b]));return p.splice(0,0,o),p.splice(a?3:1,0,u),p},Wr=[2,3,1,0],bc=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},qr=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();ai.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},So=e=>{let t=rs(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,a=e.group,o=e.kernel_shape,s=e.pads,l=e.strides,u=e.w_is_const();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,pads:s,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},$a=(e,t,n,r)=>{let i=n.format==="NHWC",a=gc(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let M=[t[0]];if(i){let A=e.kernelCustomData.wT??e.compute(nt(t[1],Wr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),M.push(A)}else M.push(t[1]);t.length===3&&M.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(gg(M,n,a,r),{inputs:M}):e.compute(mg(M,n,a,r),{inputs:M});return}let o=t.length===3,s=t[0].dims[i?1:2],l=t[0].dims[i?2:3],u=t[0].dims[i?3:1],c=t[1].dims[2],p=t[1].dims[3],m=a[i?1:2],b=a[i?2:3],f=a[i?3:1],_=i&&c===s&&p===l&&n.pads[0]===0&&n.pads[1]===0;if(_||c===1&&p===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let M=a[0],A,$,O,L=[];if(i){let X=e.kernelCustomData.wT??e.compute(nt(t[1],Wr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=X),_){let P=s*l*u;A=t[0].reshape([1,M,P]),$=X.reshape([1,P,f]),O=[1,M,f]}else A=t[0].reshape([M,s*l,u]),$=X.reshape([1,u,f]),O=[M,m*b,f];L.push(A),L.push($)}else A=t[0].reshape([M,u,s*l]),$=t[1].reshape([1,f,u]),O=[M,f,m*b],L.push($),L.push(A);o&&L.push(t[2]);let H=O[2],K=L[0].dims[L[0].dims.length-1];H<8&&K<8?e.compute(as(L,n,a,O,i,r),{inputs:L}):e.compute(si(L,n,a,O,i,r),{inputs:L});return}let S=!0,x=e.kernelCustomData.wT??e.compute(nt(t[1],Wr),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let v=[t[0],x];o&&v.push(t[2]);let C=i?m*b:f,T=i?f:m*b,I=c*p*u;e.compute(pg(v,n,a,C,T,I,o,S,r),{inputs:v})},yc=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),s=[1].concat(t.kernelShape),l=qr({...t,pads:i,strides:a,dilations:o,kernelShape:s},r);$a(e,r,l,u=>n?[u[0],u[2],u[3]]:[u[0],u[1],u[3]])},wc=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",i=qr(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,o=hg(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(fg(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],r))},ko=(e,t)=>{if(bc(e.inputs,t),e.inputs[0].dims.length===3)yc(e,t);else if(e.inputs[0].dims.length===5)wc(e,e.inputs,t);else{let n=qr(t,e.inputs);$a(e,e.inputs,n)}}}),bg,N1=q(()=>{ae(),Ot(),de(),ce(),bg=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format==="NHWC",o=t.group,s=e[1].dims,l=s[2]/o,u=s[3],c=a?ze(l):1,p=a&&u===1&&l>=4,m=p?Math.floor(l/4)*4:Math.floor(l/c)*c,b=l-m,f=a?ze(u):1,_=a?u===1?c:f:1,S=R.size(i)/f,x=[Math.ceil(S/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${x}`);let v=["rank","rank"],C=[t.strides[0],t.strides[1]],T=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[t.dilations[0],t.dilations[1]],M=[T[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[M[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),M[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:S},{type:12,data:C},{type:12,data:T},{type:12,data:I},{type:12,data:M},{type:6,data:A},{type:12,data:m},{type:12,data:l},{type:12,data:u},...ne(e[0].dims,e[1].dims)];r&&($.push(...ne(e[2].dims)),v.push("rank")),$.push(...ne(i));let O=L=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:C.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:M.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],K=Re(e[0].dataType),X=a?1:2,P=a?2:3,Q=a?3:1,W=D("W",e[1].dataType,e[1].dims.length,_),te=D("Dy",e[0].dataType,e[0].dims.length,c),ie=[te,W];r&&ie.push(D("bias",e[2].dataType,[i[Q]].length,f));let F=J("result",e[0].dataType,i.length,f),re=()=>{let Y="";if(p)c===4?Y+=`
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
          let wValue = ${W.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<c;V++)Y+=`
            let wValue${V} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return Y},U=()=>{if(b===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let Y="";if(c===1){Y+="dotProd = dotProd";for(let V=0;V<b;V++)Y+=`
            + ${te.getByOffset(`x_offset + ${V}`)} * ${W.getByOffset(`w_offset + ${V}`)}`;Y+=";"}else if(c===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);Y+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${W.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Y},G=`
            let outputIndices = ${F.offsetToIndices(`global_idx * ${f}`)};
            let batch = ${F.indicesGet("outputIndices",0)};
            let d1 = ${F.indicesGet("outputIndices",Q)};
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
                var w_offset = ${W.indicesToOffset(`${W.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
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
            let value = dotProd${r?` + bias[d1 / ${f}]`:""};
            ${F.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(H).declareVariables(...ie,F)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${G}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${_}${f}${p}${b}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:x[0],y:x[1],z:x[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:O}}}),_c,xc,vc,Sa,yg,$c,ka,Sc,wg,P1=q(()=>{N1(),Sn(),Zt(),_c=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,xc=(e,t,n,r,i)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[i]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[i]=a)},vc=(e,t,n,r,i,a,o,s,l,u)=>{let c=e.length-2,p=u.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let m=e[0],b=t[s?3:1]*i;for(let f=0,_=e.length-c-(s?1:0);f<c;++f,++_){let S=e[_],x=p?S*o[f]:u[f],v=_c(S,o[f],a[f],t[_],n[f],x);xc(v,r,a,f,f+c),p&&u.push(o[f]*(S-1)+l[f]+(t[_]-1)*n[f]+1-a[f]-a[f+c])}u.splice(0,0,m),u.splice(s?3:1,0,b)},Sa=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,m)=>p*m,1)===0){n.length=0;for(let p=2;p<t[1].dims.length;++p)n.push(t[1].dims[p])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),s=t[0].dims,l=e.dilations.slice();if(l.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}let u=e.strides.slice();if(u.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}vc(s,n,l,e.autoPad,e.group,i,u,r,o,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:n,pads:i,outputPadding:o,outputShape:a,dilations:l,strides:u}),c},yg=e=>{let t=rs(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,a=e.group??1,o=e.kernelShape,s=e.pads,l=e.strides,u=e.wIsConst(),c=e.outputPadding,p=e.outputShape;return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,outputPadding:c,outputShape:p,pads:s,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},$c=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((o,s)=>o+s,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((o,s)=>o+s,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((o,s)=>o+s,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((o,s)=>o+s,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ka=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(nt(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(bg(a,n,r),{inputs:a})},Sc=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let s=t.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],o=[1].concat(o),a=[1].concat(a),i=[1].concat(i);let l=t.outputPadding;l=[0].concat(l);let u=Sa({...t,pads:s,strides:o,dilations:a,kernelShape:i,outputPadding:l},r);ka(e,r,u,c=>n?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},wg=(e,t)=>{if($c(e.inputs,t),e.inputs[0].dims.length===3)Sc(e,t);else{let n=Sa(t,e.inputs);ka(e,e.inputs,n)}}}),kc,_g,xg,R1=q(()=>{ae(),de(),Ae(),ce(),kc=(e,t,n,r)=>{let i=R.size(t),a=t.length,o=D("input",e,a),s=J("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),u=R.normalizeAxis(l,a),c=p=>{let m=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,b=ee("uniforms.input_shape","uniforms.axis",a),f=r.reverse?m+(r.exclusive?" + 1":""):"0",_=r.reverse?b:m+(r.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${f};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:u},...ne(t,t)]}),getShaderSource:c}},_g=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(kc(r,n,i,t),{inputs:[0]})},xg=e=>{let t=e.exclusive===1,n=e.reverse===1;return ve({exclusive:t,reverse:n})}}),Tc,Cc,Ec,vg,$g,O1=q(()=>{ae(),de(),Ae(),ce(),Tc=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Cc=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)i.push(n.indicesSet("a",e[a],`i[${a}]`));return i.push("return a;}"),i.join(`
`)},Ec=(e,t)=>{let n,r,i,a,o,s,l=t.format==="NHWC",u=t.blocksize,c=t.mode==="DCR";l?([n,r,i,a]=e.dims,o=c?[n,r,i,u,u,a/u**2]:[n,r,i,a/u**2,u,u],s=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=c?[n,u,u,a/u**2,r,i]:[n,a/u**2,u,u,r,i],s=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(o),m=p.dims.length,b=e.dataType,f=D("a",b,m),_=J("output",b,m),S=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(f,_)}

  ${Cc(s,m,f,_)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:x=>{let v=l?[n,r*u,i*u,a/u**2]:[n,a/u**2,r*u,i*u],C=R.size(v),T=p.dims,I=R.sortBasedOnPerm(T,s);return{outputs:[{dims:v,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(C/64)},programUniforms:[{type:12,data:C},...ne(T,I)]}},getShaderSource:S}},vg=(e,t)=>{Tc(e.inputs),e.compute(Ec(e.inputs[0],t))},$g=e=>ve({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Vr,Qn,Ta,Ic,zc,Mc,Ac,Ca,Nc,Sg,kg,B1=q(()=>{ae(),de(),Ae(),ce(),Vr="[a-zA-Z]|\\.\\.\\.",Qn="("+Vr+")+",Ta="^"+Qn+"$",Ic="("+Qn+",)*"+Qn,zc="^"+Ic+"$",Mc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Ac=class{constructor(e,t){var i;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,r]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(zc)))throw new Error("Invalid LHS term");if(n.split(",").forEach((a,o)=>{let s=e[o].dims.slice();if(!a.match(RegExp(Ta)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,s,o);this.lhs.push(l)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,o])=>o.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(Qn)))throw new Error("Invalid RHS");(i=r.match(RegExp(Vr,"g")))==null||i.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(a);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,o=[],s=0;if(!e.match(RegExp(Ta))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Vr,"g")),u=new Mc(r);return l==null||l.forEach((c,p)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(o=n.slice(s,s+m),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<o.length;b++){let f=String.fromCharCode(48+b);u.addSymbol(f,p+b),this.addSymbol(f,n[s++],r)}}else u.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[s++],r)}),u}},Ca=e=>e+"_max",Nc=(e,t,n,r)=>{let i=e.map(u=>u.length).map((u,c)=>D(`input${c}`,t,u)),a=R.size(r),o=J("output",t,r.length),s=[...n.symbolToInfo.keys()].filter(u=>!n.rhs.symbolToIndices.has(u)),l=u=>{let c=[],p="var prod = 1.0;",m="var sum = 0.0;",b="sum += prod;",f=[],_=[],S=[],x=[],v=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((T,I)=>{var M;if(n.rhs.symbolToIndices.has(I)){let A=(M=n.rhs.symbolToIndices.get(I))==null?void 0:M[0];A!==void 0&&n.lhs.forEach(($,O)=>{if(T.inputIndices.includes(O)){let L=$.symbolToIndices.get(I);if(L===void 0)throw new Error("Invalid symbol error");L.forEach(H=>{c.push(`${i[O].indicesSet(`input${O}Indices`,H,o.indicesGet("outputIndices",A))}`)})}})}else n.lhs.forEach((A,$)=>{if(T.inputIndices.includes($)){let O=A.symbolToIndices.get(I);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(L=>{f.push(`${i[$].indicesSet(`input${$}Indices`,L,`${I}`)}`)}),x.push(`prod *= ${i[$].getByIndices(`input${$}Indices`)};`)}}),_.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Ca(I)}; ${I}++) {`),S.push("}")});let C=v?[...c,`let sum = ${i.map((T,I)=>T.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,m,..._,...f,p,...x,b,...S];return`
            ${u.registerUniforms(s.map(T=>({name:`${Ca(T)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,o)}

            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${i.map((T,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${C.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let u=s.filter(p=>n.symbolToInfo.has(p)).map(p=>{var m;return{type:12,data:((m=n.symbolToInfo.get(p))==null?void 0:m.dimValue)||0}});u.push({type:12,data:a});let c=e.map((p,m)=>[...ne(p)]).reduce((p,m)=>p.concat(m),u);return c.push(...ne(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Sg=(e,t)=>{let n=new Ac(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((a,o)=>a.dims);e.compute(Nc(i,e.inputs[0].dataType,n,r))},kg=e=>{let t=e.equation.replace(/\s+/g,"");return ve({equation:t})}}),Pc,Ea,Rc,Oc,Tg,D1=q(()=>{ae(),de(),ce(),Pc=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ea=(e,t)=>{let n=e.length-t.length,r=[];for(let i=0;i<n;++i)r.push(e[i]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},Rc=(e,t)=>e.length>t.length?Ea(e,t):Ea(t,e),Oc=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=Rc(t,n),i=e[0].dataType,a=i===9||R.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4===0?4:1,s=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(R.size(r)/s),u=p=>{let m=D("input",i,t.length,o),b=J("output",i,r.length,s),f;if(i===9){let _=(S,x,v="")=>`
          let outputIndices${x} = ${b.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${m.broadcastedIndicesToOffset(`outputIndices${x}`,b)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${S}[${x}] = ${v}(${m.getByOffset(`index${x}`)}[component${x}]);
        `;f=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else f=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${m.getByOffset(`inputOffset / ${o}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(m,b)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${f}`},c=[{type:12,data:l},...ne(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Tg=e=>{Pc(e.inputs),e.compute(Oc(e.inputs),{inputs:[0]})}}),Bc,Cg,L1=q(()=>{ae(),de(),ce(),ns(),Bc=e=>{let t=e[0].dataType,n=R.size(e[0].dims),r=R.size(e[1].dims),i=r%4===0,a=o=>{let s=D("x",t,[1],4),l=D("bias",t,[1],4),u=J("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${l.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,m=i?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(c).declareVariables(s,l,u)}

    ${_o(qe(t))}

    ${o.mainStart(On)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${u.setByOffset("global_idx",xo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/On/4)}})}},Cg=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?jm(e):e.compute(Bc(e.inputs))}}),Dc,Lc,Eg,Ig,U1=q(()=>{ae(),de(),Ae(),ce(),Dc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Lc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=R.normalizeAxis(t.axis,i),o=n.slice(0);o.splice(a,1,...r);let s=n[a],l=e[0].dataType===9?4:1,u=Math.ceil(R.size(o)/l),c=[{type:12,data:u},{type:6,data:s},{type:12,data:a},...ne(e[0].dims,e[1].dims,o)],p=m=>{let b=D("data",e[0].dataType,e[0].dims.length,l),f=D("inputIndices",e[1].dataType,e[1].dims.length),_=J("output",e[0].dataType,o.length,l),S=v=>{let C=r.length,T=`var indicesIndices${v}  = ${f.type.indices}(0);`;for(let I=0;I<C;I++)T+=`${C>1?`indicesIndices${v}[${I}]`:`indicesIndices${v}`} = ${o.length>1?`outputIndices${v}[uniforms.axis + ${I}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${f.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${b.type.indices};
        `;for(let I=0,M=0;I<i;I++)I===a?(T+=`${i>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = u32(idx${v});`,M+=C):(T+=`${i>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = ${o.length>1?`outputIndices${v}[${M}]`:`outputIndices${v}`};`,M++);return T},x;if(e[0].dataType===9){let v=(C,T,I="")=>`
          let outputIndices${T} = ${_.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${b.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${C}[${T}] = ${I}(${b.getByOffset(`index${T}`)}[component${T}]);
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
      ${S("")};
      let value = ${b.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,f,_)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:p}},Eg=e=>ve({axis:e.axis}),Ig=(e,t)=>{let n=e.inputs;Dc(n),e.compute(Lc(e.inputs,t))}}),Uc,zg,Mg,F1=q(()=>{ae(),de(),ce(),Uc=(e,t,n,r,i,a,o,s,l)=>{let u=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:l}],c=[a];u.push(...ne(t.dims,c));let p=m=>{let b=D("indices_data",t.dataType,t.dims.length),f=J("input_slice_offsets_data",12,1,1),_=[b,f],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(S).declareVariables(..._)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},zg=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,o=a[a.length-1],s=R.sizeToDimension(a,a.length-1),l=R.sizeFromDimension(r,t.batchDims+o),u=R.sizeToDimension(r,t.batchDims),c=R.sizeFromDimension(r,t.batchDims),p=s/u,m=new Array(o),b=l;for(let T=0;T<o;++T)m[o-1-T]=b,b*=r[t.batchDims+o-1-T];let f=Uc(e,n[1],m,t.batchDims,r,s,p,c,o),_=t.batchDims+o;if(_>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(r.slice(_)),x=R.size(S),v=[{type:12,data:x},{type:12,data:l},...ne(n[0].dims,f.dims,S)],C=T=>{let I=D("data",n[0].dataType,n[0].dims.length),M=D("slice_offsets",12,f.dims.length),A=J("output",n[0].dataType,S.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,M,A)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:i}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:v}),getShaderSource:C},{inputs:[n[0],f]})},Mg=e=>({batchDims:e.batch_dims,cacheKey:""})}),Fc,Wc,Ag,Ng,W1=q(()=>{ae(),de(),Ae(),ce(),Fc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((s,l)=>l===n?Math.ceil(s/r)===a.dims[l]:s===a.dims[l]).reduce((s,l)=>s&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==a.dims.length||!o.dims.map((s,l)=>s===a.dims[l]).reduce((s,l)=>s&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Wc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=R.normalizeAxis(t.gatherAxis,i),o=R.normalizeAxis(t.quantizeAxis,i),s=n.slice(0);s.splice(a,1,...r);let l=R.size(s),u=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:l},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...ne(...e.map((b,f)=>b.dims),s)],m=b=>{let f=D("data",e[0].dataType,e[0].dims.length),_=D("inputIndices",e[1].dataType,e[1].dims.length),S=D("scales",e[2].dataType,e[2].dims.length),x=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,v=J("output",u,s.length),C=[f,_,S];x&&C.push(x);let T=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(T).declareVariables(...C,v)}
        ${b.mainStart()}
        let output_indices = ${v.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${v.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${v.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${f.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${v.indicesGet("output_indices","i")};
          ${f.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${f.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${v.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${f.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${f.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${f.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${qe(u)}(quantized_data - zero_point) * scale;
        ${v.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,f)=>f!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,f)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:u}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:m}},Ag=(e,t)=>{let n=e.inputs;Fc(n,t),e.compute(Wc(e.inputs,t))},Ng=e=>ve({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),qc,Vc,Pg,Rg,q1=q(()=>{ae(),de(),Ae(),ce(),qc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Vc=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,o=e[1].dataType,s=R.normalizeAxis(t.axis,i),l=n[s],u=a.slice(0),c=R.size(u),p=D("input",r,i),m=D("indicesInput",o,a.length),b=J("output",r,u.length),f=[{type:12,data:c},{type:6,data:l},{type:12,data:s}];return f.push(...ne(n,a,u)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:f}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,b)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},Pg=e=>ve({axis:e.axis}),Rg=(e,t)=>{let n=e.inputs;qc(n),e.compute(Vc(e.inputs,t))}}),Hc,Gc,Og,Bg,V1=q(()=>{ae(),de(),ce(),Hc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Gc=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,o]=Pf.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let l=16,u=Math.ceil(a/l),c=Math.ceil(i/l),p=!0,m=R.size(s),b=[{type:12,data:p?u:m},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],f=["type","type"];e.length===3&&(b.push(...ne(e[2].dims)),f.push("rank")),b.push(...ne(s));let _=x=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let C=t.alpha===1?"":"value *= uniforms.alpha;",T=D("a",e[0].dataType,e[0].dims),I=D("b",e[1].dataType,e[1].dims),M=T.type.value,A=null,$=[T,I];e.length===3&&(A=D("c",e[2].dataType,e[2].dims.length),$.push(A));let O=J("output",e[0].dataType,s.length);$.push(O);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(L).declareVariables(...$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${M}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${C}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",O)}; value += ${M}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=x=>{let v=D("a",e[0].dataType,e[0].dims),C=D("b",e[1].dataType,e[1].dims),T=null,I=[v,C];e.length===3&&(T=D("c",e[2].dataType,e[2].dims.length),I.push(T));let M=J("output",e[0].dataType,s.length);I.push(M);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",O="";t.transA&&t.transB?(O=`
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
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(A).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${C.type.storage}, ${l}>, ${l}>;
  ${x.mainStart([l,l,1])}
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
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${M.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:u*c},programUniforms:b}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},Og=e=>{let t=e.transA,n=e.transB,r=e.alpha,i=e.beta;return{transA:t,transB:n,alpha:r,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Bg=(e,t)=>{Hc(e.inputs),e.compute(Gc(e.inputs,t))}}),vt,Mt,rn,an,jc,Kc,Xc,Yc,Zc,Qc,Jc,ep,Dg,Lg,H1=q(()=>{ae(),de(),Ae(),ce(),[vt,Mt,rn,an]=[0,1,2,3],jc=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Kc=`
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
`,Xc=e=>`
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
`,Yc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Zc=e=>`
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
`,Qc=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${vt}] = batch;
     indices[${Mt}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${rn}] = u32(r);
            indices[${an}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${rn}] = u32(clamp(r, 0, H - 1));
          indices[${an}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${rn}] = gs_reflect(r, border[1], border[3]);
          indices[${an}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Jc=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
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
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,ep=(e,t)=>{let n=D("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=D("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[vt,Mt,rn,an]=[0,3,1,2]);let o=J("output",e[0].dataType,a.length),s=n.type.value,l=R.size(a),u=[{type:12,data:l},...ne(e[0].dims,r,a)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(n,i,o)}
  ${Kc}
  ${Xc(s)}
  ${Yc(t)}
  ${Zc(t)}
  ${Qc(n,s,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${rn}]);
      let W_in = i32(uniforms.x_shape[${an}]);

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
      var grid_indices = vec3<u32>(indices[${vt}], indices[${rn}], indices[${an}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Jc(o,s,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let m=R.size(a);return{outputs:[{dims:a,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:u}},getShaderSource:c}},Dg=(e,t)=>{jc(e.inputs),e.compute(ep(e.inputs,t))},Lg=e=>ve({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),He,tp,Ug,Ia,np,lr,Fg,Wg=q(()=>{ae(),de(),Ae(),Qo(),ts(),ce(),Zt(),He=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,tp=(e,t)=>{let n=e[0],r=He(e,1),i=He(e,2),a=He(e,3),o=He(e,4),s=He(e,5),l=He(e,6),u=He(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],p=n.dims[1],m=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],b=p,f=0,_=0,S=Math.floor(m/t.numHeads);if(l&&u&&R.size(l.dims)&&R.size(u.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(u.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=l.dims[2],_=l.dims[2]}else if(l&&R.size(l.dims)||u&&R.size(u.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(r&&R.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,b=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,b=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,b=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(a&&R.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=f+b,C=0;if(o&&R.size(o.dims)>0){C=8;let A=o.dims;throw A.length===1?A[0]===c?C=1:A[0]===3*c+2&&(C=3):A.length===2&&A[0]===c&&A[1]===v&&(C=5),C===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,I=m;if(i&&R.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(b!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=i.dims[2]}else{if(b!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=i.dims[1]*i.dims[3],T=!0}}let M=!1;if(o&&R.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(s&&R.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==c||s.dims[1]!==t.numHeads||s.dims[2]!==p||s.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:f,kvSequenceLength:b,totalSequenceLength:v,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:S,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:C,scale:t.scale,broadcastResPosBias:M,passPastInKv:T,qkvFormat:x}},Ug=e=>ve({...e}),Ia=ve({perm:[0,2,1,3]}),np=(e,t,n,r,i,a,o)=>{let s=[r,i,a],l=R.size(s),u=[{type:12,data:l},{type:12,data:o},{type:12,data:a}],c=p=>{let m=J("qkv_with_bias",t.dataType,s),b=D("qkv",t.dataType,s),f=D("bias",n.dataType,s),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(_).declareVariables(b,f,m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:c},{inputs:[t,n],outputs:[-1]})[0]},lr=(e,t,n,r,i,a,o,s)=>{let l=a;if(o&&R.size(o.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=np(e,a,o,t,r,n*i,s),l=l.reshape([t,r,n,i]),n===1||r===1?l:e.compute(nt(l,Ia.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,i])),n===1||r===1?l:e.compute(nt(l,Ia.perm),{inputs:[l],outputs:[-1]})[0]},Fg=(e,t)=>{let n=tp(e.inputs,t),r=e.inputs[0],i=He(e.inputs,1),a=He(e.inputs,2),o=He(e.inputs,3),s=He(e.inputs,4),l=He(e.inputs,5),u=He(e.inputs,6),c=He(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if((i==null?void 0:i.dims.length)===5)throw new Error("Packed KV is not implemented");let p=i&&a&&i.dims.length===4&&a.dims.length===4,m=lr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,o,0);if(p)return mr(e,m,i,a,s,void 0,u,c,l,n);if(!i||!a)throw new Error("key and value must be provided");let b=lr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,o,n.hiddenSize),f=lr(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,o,2*n.hiddenSize);mr(e,m,b,f,s,void 0,u,c,l,n)}}),rp,ip,ap,op,To,qg,Vg,Hg=q(()=>{ae(),de(),Ae(),ce(),rp=e=>{if(!e||e.length<1)throw new Error("too few inputs")},ip=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>n.push(Number(i))),r=n.length),ve({numOutputs:r,axis:t.axis,splitSizes:n})},ap=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ee("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,op=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},To=(e,t)=>{let n=e[0].dims,r=R.size(n),i=e[0].dataType,a=R.normalizeAxis(t.axis,n.length),o=new Array(t.numOutputs),s=D("input",i,n.length),l=new Array(t.numOutputs),u=[],c=[],p=0,m=[{type:12,data:r}];for(let f=0;f<t.numOutputs;f++){p+=t.splitSizes[f],l[f]=p;let _=n.slice();_[a]=t.splitSizes[f],c.push(_),o[f]=J(`output${f}`,i,_.length),u.push({dims:c[f],dataType:e[0].dataType})}m.push({type:12,data:l},...ne(n,...c));let b=f=>`
  ${f.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(s,...o)}
  ${ap(l.length)}
  ${op(o)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ee("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${s.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:u,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}},qg=(e,t)=>{rp(e.inputs);let n=e.inputs.length===1?t:ip(e.inputs,t);e.compute(To(e.inputs,n),{inputs:[0]})},Vg=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return ve({axis:t,numOutputs:r,splitSizes:n})}}),sp,li,Gg,jg=q(()=>{ae(),de(),Ae(),ce(),sp=(e,t)=>{let[n,r,i,a]=e,{numHeads:o,rotaryEmbeddingDim:s}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!R.areEqual(r.dims,[])&&!R.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!R.areEqual(i.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],u=n.dims[n.dims.length-2],c=i.dims[0],p=R.sizeFromDimension(n.dims,1)/u,m=s===0?i.dims[1]*2:p/o;if(s>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(u!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(u>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(m/2!==i.dims[1]&&s/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},li=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,o=e[0].dims[0],s=R.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],u=s/l,c=e[2].dims[1],p=i===0?c*2:u/r,m=new Array(o,l,u/p,p-c),b=R.computeStrides(m),f=[{type:1,data:a},{type:12,data:m},{type:12,data:b},...e[0].dims.length===3?new Array({type:12,data:[s,u,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[s,p,l*p,1]}):[],...ne(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=S=>{let x=D("input",e[0].dataType,e[0].dims.length),v=D("position_ids",e[1].dataType,e[1].dims.length),C=D("cos_cache",e[2].dataType,e[2].dims.length),T=D("sin_cache",e[3].dataType,e[3].dims.length),I=J("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${S.declareVariables(x,v,C,T,I)}

        ${S.mainStart(On)}
          let half_rotary_emb_dim = uniforms.${C.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",J("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${x.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ve({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(m)/On)},programUniforms:f})}},Gg=(e,t)=>{sp(e.inputs,t),e.compute(li(e.inputs,t))}}),lp,up,za,dp,Kg,G1=q(()=>{Ae(),ae(),ts(),Wg(),Hg(),Zt(),jg(),ce(),lp=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,l=n.dims[0],u=n.dims[1],c=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],p=u,m=0,b=!r||r.dims.length===0,f=Math.floor(b?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);b&&(c=f*t.numHeads);let _=a&&a.dims.length!==0,S=o&&o.dims.length!==0;if(_&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===f)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=a.dims[2]}else if(_||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==f)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==f)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let v=0,C=!1,T=t.kvNumHeads?f*t.kvNumHeads:c;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(p!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=i.dims[2]}else{if(p!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');T=i.dims[1]*i.dims[3],C=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let M=I.dims.reduce((A,$)=>A*$,1);if(M!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${M}.`);for(let A=0;A<I.dims.length;A++)if(I.dims[A]!==1&&I.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${I.dims[A]}.`)}return{batchSize:l,sequenceLength:u,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:T,headSize:f,vHeadSize:Math.floor(T/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:C,qkvFormat:x}},up=ve({perm:[0,2,1,3]}),za=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(nt(r,up.perm),{inputs:[r],outputs:[-1]})[0]),r},dp=(e,t,n,r)=>{let i=7,a=["type","type"],o=[e*t],s=e*t,l=[{type:12,data:s},{type:12,data:t},{type:12,data:e}],u=c=>{let p=D("seq_lens",n.dataType,n.dims),m=D("total_seq_lens",r.dataType,r.dims),b=J("pos_ids",i,o),f=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(f).declareVariables(p,m,b)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      ${b.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${b.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:u}},Kg=(e,t)=>{var T;let n=lp(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((T=e.inputs[1])==null?void 0:T.dims.length)===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,s=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,u=e.inputs.length>5?e.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,p=ve({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[m,b,f]=!i&&!a?e.compute(To([r],p),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],_,S;if(t.doRotary){let I=e.compute(dp(n.batchSize,n.sequenceLength,l,u),{inputs:[l,u],outputs:[-1]})[0],M=e.inputs[7],A=e.inputs[8],$=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[m,I,M,A],L=[-1];_=e.compute(li(O,$),{inputs:O,outputs:L})[0],O.splice(0,1,b);let H=ve({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(li(O,H),{inputs:O,outputs:L})[0]}let x=lr(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?_:m,void 0,0),v=za(e,t.doRotary?S:b,n),C=za(e,f,n);mr(e,x,v,C,void 0,void 0,o,s,void 0,n,l,u)}}),Ma,cp,pp,Xg,j1=q(()=>{ae(),de(),Zt(),ce(),Ma=(e,t,n,r,i,a,o,s)=>{let l=ze(a),u=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,p=i*o,m=64;p===1&&(m=256);let b=[i,o,a/l],f=[i,o,2],_=["rank","type","type"],S=[];S.push(...ne(b,f));let x=v=>{let C=D("x",t.dataType,3,l),T=D("scale",n.dataType,n.dims),I=D("bias",r.dataType,r.dims),M=J("output",1,3,2),A=[C,T,I,M];return`
  var<workgroup> workgroup_shared : array<${c}, ${m}>;
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
      let sum_final = ${Xt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Xt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${s};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:S}),getShaderSource:x},{inputs:[t,n,r],outputs:[-1]})[0]},cp=(e,t,n)=>{let r=t[0].dims,i=r,a=2,o=r[0],s=r[1],l=R.sizeFromDimension(r,a),u=ze(l),c=R.size(i)/u,p=Ma(e,t[0],t[1],t[2],o,l,s,n.epsilon),m=[o,s,l/u],b=[o,s],f=["type","none"],_=S=>{let x=D("x",t[0].dataType,m.length,u),v=D("scale_shift",1,b.length,2),C=J("output",t[0].dataType,m.length,u),T=[x,v,C];return`
  ${S.registerUniform("output_size","u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${C.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${C.type.value}(scale_shift.x) + ${C.type.value}(scale_shift.y);
      ${C.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ne(m,b,m)]}),getShaderSource:_},{inputs:[t[0],p]})},pp=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[r.length-1],s=R.sizeFromDimension(r,1)/o,l=ze(o),u=R.size(i)/l,c=[{type:12,data:s},{type:12,data:Math.floor(o/l)}],p=["type","type"],m=!1,b=[0,r.length-1];for(let x=0;x<r.length-2;x++)m=m||r[x+1]!==1,b.push(x+1);m=m&&r[r.length-1]!==1;let f=m?e.compute(nt(e.inputs[0],b),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(x,v)=>r[b[v]])),_=Ma(e,f,t[1],t[2],a,s,o,n.epsilon),S=x=>{let v=Re(t[0].dataType),C=l===1?"vec2f":`mat${l}x2f`,T=A=>{let $=A===0?"x":"y",O=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${O}(scale.${$}))`;case 2:return`vec2<${v}>(${O}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${v}>(${O}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=D("input",t[0].dataType,t[0].dims,l),M=J("output",t[0].dataType,i,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${C}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${M.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:S},{inputs:[t[0],_]})},Xg=(e,t)=>{t.format==="NHWC"?pp(e,e.inputs,t):cp(e,e.inputs,t)}}),hp,fp,Yg,K1=q(()=>{ae(),de(),ce(),hp=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},fp=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],o=!r&&e[2],s=i,l=R.normalizeAxis(t.axis,i.length),u=R.sizeToDimension(i,l),c=R.sizeFromDimension(i,l),p=R.size(a.dims),m=o?R.size(o.dims):0;if(p!==c||o&&m!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${m}`);let b=[];for(let I=0;I<i.length;++I)I<l?b.push(i[I]):b.push(1);let f=ze(c),_=["type","type"],S=[{type:12,data:u},{type:1,data:c},{type:12,data:Math.floor(c/f)},{type:1,data:t.epsilon}];o&&_.push("type");let x=n>1,v=n>2,C=I=>{let M=Re(e[0].dataType),A=[D("x",e[0].dataType,e[0].dims,f),D("scale",a.dataType,a.dims,f)];o&&A.push(D("bias",o.dataType,o.dims,f)),A.push(J("output",e[0].dataType,s,f)),x&&A.push(J("mean_data_output",1,b)),v&&A.push(J("inv_std_output",1,b));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms($).declareVariables(...A)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${bo("f32",f)};
    var mean_square_vector = ${bo("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${An(M,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xt("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xt("mean_square_vector",f)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${An(M,f,"x[j + offset]")};
      let f32scale = ${An(M,f,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${An(M,f,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:s,dataType:e[0].dataType}];return x&&T.push({dims:b,dataType:1}),v&&T.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${n};${r}`,inputDependencies:_},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:S}),getShaderSource:C}},Yg=(e,t)=>{hp(e.inputs),e.compute(fp(e.inputs,t,e.outputCount))}}),mp,Zg,X1=q(()=>{de(),os(),ss(),mp=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Zg=e=>{mp(e.inputs);let t=Rn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(as(e.inputs,{activation:""},t));else{let i=t[t.length-2],a=R.size(e.inputs[0].dims.slice(0,-2)),o=R.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&o===1){let s=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),u=[1,a,n],c=[s,l];e.compute(si(c,{activation:""},t,u),{inputs:c})}else e.compute(si(e.inputs,{activation:""},t))}}}),gp,bp,yp,Qg,Jg,Y1=q(()=>{ae(),de(),Ae(),ce(),gp=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!R.areEqual(o.dims,[t.n,i,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let s=e[2].dims;if(R.size(s)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,u=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(R.size(l)!==u)throw new Error("zeroPoints input size error.")}},bp=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),l=R.size(s),u=e[1].dims[2]/4,c=e[0].dataType,p=ze(t.k),m=ze(u),b=ze(o),f=s.concat([i,o]),_=i>1&&o/b%2===0?2:1,S=R.size(f)/b/_,x=64,v=[],C=[l,i,a/p],T=R.convertShape(e[1].dims).slice();T.splice(-1,1,u/m),v.push(...ne(C)),v.push(...ne(T)),v.push(...ne(e[2].dims)),e.length===4&&v.push(...ne(R.convertShape(e[3].dims)));let I=[l,i,o/b];v.push(...ne(I));let M=A=>{let $=C.length,O=D("a",e[0].dataType,$,p),L=D("b",12,T.length,m),H=D("scales",e[2].dataType,e[2].dims.length),K=[O,L,H],X=e.length===4?D("zero_points",12,e[3].dims.length):void 0;X&&K.push(X);let P=I.length,Q=J("output",e[0].dataType,P,b),W=Re(e[0].dataType),te=(()=>{switch(p){case 1:return`array<${W}, 8>`;case 2:return`mat4x2<${W}>`;case 4:return`mat2x4<${W}>`;default:throw new Error(`${p}-component is not supported.`)}})(),ie=Math.floor(32/t.bits),F=Math.floor(ie/8),re=()=>{let Y="";for(let V=0;V<F;V++){let _e=V*t.bits*4,Ve=_e+t.bits;Y+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?O.indicesToOffset(`${O.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${te};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/p}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${O.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let Ie=0;Ie<b*_;Ie++)Y+=`
            b_value = ${m===1?`b${Ie}_data`:`b${Ie}_data[i]`};
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
            workgroup_shared[local_id.x * ${_} + ${Math.floor(Ie/b)}]${b>1?`[${Ie%b}]`:""} += ${Array.from({length:8/p},(Be,je)=>`${p===1?`a_data${V>0?V:""}[${je}] * b_dequantized_values[${je}]`:`dot(a_data${V>0?V:""}[${je}], b_dequantized_values[${je}])`}`).join(" + ")};
          `}return Y},U=()=>{let Y=`
            var col_index = col * ${b};
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
            `;for(let V=0;V<b*_;V++)Y+=`
            let scale${V} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${X?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${W}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Y},G=()=>{let Y=`col_index = col * ${b};`;for(let V=0;V<b*_;V++)Y+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Y+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${te};
            var b_dequantized_values: ${te};`,Y};return`
        var<workgroup> workgroup_shared: array<${Q.type.value}, ${_*x}>;
        ${A.declareVariables(...K,Q)}
        ${A.mainStart([x,1,1])}
          let output_indices = ${Q.offsetToIndices(`(global_idx / ${x}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${U()}
            for (var word: u32 = 0; word < ${u}; word += ${m}) {
              ${G()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${re()}
                word_offset += ${ie/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${m};${b};${_};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:S},programUniforms:v}),getShaderSource:M}},yp=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),l=R.size(s),u=e[1].dims[2]/4,c=e[0].dataType,p=ze(t.k),m=ze(u),b=s.concat([i,o]),f=128,_=o%8===0?8:o%4===0?4:1,S=f/_,x=Math.floor(32/t.bits),v=S*m*x,C=v/p,T=v/t.blockSize,I=R.size(b)/_,M=[],A=[l,i,a/p],$=R.convertShape(e[1].dims).slice();$.splice(-1,1,u/m),M.push(...ne(A)),M.push(...ne($)),M.push(...ne(e[2].dims)),e.length===4&&M.push(...ne(R.convertShape(e[3].dims)));let O=[l,i,o];M.push(...ne(O));let L=H=>{let K=A.length,X=D("a",e[0].dataType,K,p),P=D("b",12,$.length,m),Q=D("scales",e[2].dataType,e[2].dims.length),W=[X,P,Q],te=e.length===4?D("zero_points",12,e[3].dims.length):void 0;te&&W.push(te);let ie=O.length,F=J("output",e[0].dataType,ie),re=Re(e[0].dataType),U=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${C}>;
        var<workgroup> inter_results: array<array<${F.type.value}, ${S}>, ${_}>;
        ${H.declareVariables(...W,F)}
        ${H.mainStart([S,_,1])}
          let output_indices = ${F.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${C};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${C}; a_offset += ${f})
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
            let block = tile * ${T} + local_id.x;
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
            let scale = ${Q.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${P.getByIndices(`${P.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${m}; i++) {
              let b_value = ${m===1?"b_data":"b_data[i]"};
              ${(()=>{let G=Math.floor(x/8),Y="";for(let V=0;V<G;V++){let _e=V*t.bits*4,Ve=_e+t.bits;Y+=`
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

          if (local_idx < ${_}) {
            var output_value: ${F.type.value} = ${F.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${F.setByIndices(`${F.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${m};${S};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:c}],dispatchGroup:{x:I},programUniforms:M}),getShaderSource:L}},Qg=(e,t)=>{gp(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(yp(e.inputs,t)):e.compute(bp(e.inputs,t))},Jg=e=>ve(e)}),wp,_p,xp,vp,$p,Sp,kp,Tp,e0,Z1=q(()=>{ae(),de(),ce(),wp=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},_p=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
      `},xp=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},vp=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},$p=(e,t,n)=>{let r="";for(let i=t-1;i>=0;--i)r+=`
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
          `},Sp=(e,t,n)=>{switch(n.mode){case 0:return _p(e,t,n.pads.length);case 1:return xp(e,t,n.pads.length);case 2:return vp(e,t,n.pads.length);case 3:return $p(e,t,n.pads.length);default:throw new Error("Invalid mode")}},kp=(e,t)=>{let n=R.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=R.size(n),a=[{type:12,data:i},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&a.push({type:o?e[2].dataType:1,data:t.value}),a.push(...ne(e[0].dims,n));let s=["rank"],l=u=>{let c=J("output",e[0].dataType,n.length),p=D("x",e[0].dataType,r.length),m=p.type.value,b=Sp(c,r.length,t),f=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&f.push({name:"constant_value",type:o?m:"f32"}),`
            ${u.registerUniforms(f).declareVariables(p,c)}
            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(n)/64)},programUniforms:a}),getShaderSource:l}},Tp=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let s=e[3].getBigInt64Array();for(let l=0;l<s.length;l++)a[Number(s[l])]=Number(n[l]),a[Number(s[l])+i]=Number(n[l+s.length])}else n.forEach((s,l)=>a[Number(l)]=Number(s));let o=[];return a.forEach(s=>o.push(s)),{mode:t.mode,value:r,pads:o}}else return t},e0=(e,t)=>{wp(e.inputs);let n=Tp(e.inputs,t);e.compute(kp(e.inputs,n),{inputs:[0]})}}),Jn,Aa,Na,Pa,Ra,Cp,Ep,Oa,Ba,t0,n0,Da,r0,i0,La,a0,o0,s0,l0,Q1=q(()=>{at(),ae(),de(),ce(),Jn=e=>{if(Se.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Aa=(e,t,n)=>{let r=t.format==="NHWC",i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),s=t.strides.slice(),l=a?t.dilations.slice():[],u=t.pads.slice();ai.adjustPoolAttributes(n,i,o,s,l,u);let c=ai.computePoolOutputShape(n,i,s,l,o,u,t.autoPad),p=Object.assign({},t);a?Object.assign(p,{kernelShape:o,strides:s,pads:u,dilations:l,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:o,strides:s,pads:u,cacheKey:t.cacheKey});let m=c.slice();return m.push(m.splice(1,1)[0]),[p,r?m:c]},Na=(e,t)=>{let n=t.format==="NHWC",r=R.size(e),i=R.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],p=!!(u+c);a.push({type:12,data:s},{type:12,data:l},{type:12,data:u},{type:12,data:c}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let b=t.kernelShape[t.kernelShape.length-2],f=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];m=!!(_+S),a.push({type:12,data:b},{type:12,data:f},{type:12,data:_},{type:12,data:S}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,o,!0,p,m]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=R.computeStrides(t.kernelShape);a.push({type:12,data:s},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((u,c)=>u+c);return[a,o,!!l,!1,!1]}},Pa=(e,t,n,r,i,a,o,s,l,u,c,p)=>{let m=i.format==="NHWC",b=t.type.value,f=J("output",t.type.tensor,r);if(i.kernelShape.length<=2){let _="",S="",x="",v=n-(m?2:1);if(c?_=`
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
                }`,i.kernelShape.length===2){let C=n-(m?3:2);p?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${C}] < 0 || xIndices[${C}] >= uniforms.x_shape[${C}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${C}] = indices[${C}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var value = ${b}(${s});
              var pad = 0;
              ${S}
              ${_}
              ${x}
              ${o}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=i.kernelShape.length,S=i.pads.length,x="";return u?x=`
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
            ${e.registerUniforms(l).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${b}(${s});
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
                    + offsets[j - ${n-_}u] - ${ee("uniforms.pads","j - 2u",S)};
                  ${x}
              }
              ${o}

              output[global_idx] = value;
            }`}},Ra=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Cp=e=>`${Ra(e)};${e.countIncludePad}`,Ep=e=>`${Ra(e)};${e.storageOrder};${e.dilations}`,Oa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ba=(e,t,n,r)=>{let[i,a]=Aa(t,r,n),o=D("x",t.dataType,t.dims.length),s=o.type.value,l="value += x_val;",u="";i.countIncludePad?u+=`value /= ${s}(uniforms.kernelSize);`:u+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[c,p,m,b,f]=Na(a,i);c.push(...ne(t.dims,a));let _=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${m};${b};${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:S=>Pa(S,o,t.dims.length,a.length,i,l,u,0,p,m,b,f)}},t0=e=>{let t=e.count_include_pad!==0,n=Oa(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Cp(r)}},n0=(e,t)=>{Jn(e.inputs),e.compute(Ba("AveragePool",e.inputs[0],!1,t))},Da={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},r0=e=>{let t=e.format;return{format:t,...Da,cacheKey:t}},i0=(e,t)=>{Jn(e.inputs),e.compute(Ba("GlobalAveragePool",e.inputs[0],!0,t))},La=(e,t,n,r)=>{let[i,a]=Aa(t,r,n),o=`
      value = max(x_val, value);
    `,s="",l=D("x",t.dataType,t.dims.length),u=["rank"],[c,p,m,b,f]=Na(a,i);return c.push(...ne(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${m};${b};${f}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(a)/64)},programUniforms:c}),getShaderSource:_=>Pa(_,l,t.dims.length,a.length,i,o,s,t.dataType===10?-65504:-1e5,p,m,b,f)}},a0=(e,t)=>{Jn(e.inputs),e.compute(La("MaxPool",e.inputs[0],!1,t))},o0=e=>{let t=e.storage_order,n=e.dilations,r=Oa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:n,...r,cacheKey:""};return{...i,cacheKey:Ep(i)}},s0=e=>{let t=e.format;return{format:t,...Da,cacheKey:t}},l0=(e,t)=>{Jn(e.inputs),e.compute(La("GlobalMaxPool",e.inputs[0],!0,t))}}),Ip,zp,u0,d0,J1=q(()=>{ae(),de(),Ae(),ce(),Ip=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===t.axis||i===e[0].dims[a]).reduce((i,a)=>i&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},zp=(e,t)=>{let n=R.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,o=e[1].dataType,s=R.size(a),l=r===3||r===2,u=l?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,p=e.length>2?e[2]:void 0,m=p?l?[Math.ceil(R.size(p.dims)/4)]:p.dims:void 0,b=c.length===0||c.length===1&&c[0]===1,f=b===!1&&c.length===1,_=ze(s),S=b&&(!l||_===4),x=S?_:1,v=S&&!l?_:1,C=D("input",l?12:r,u.length,v),T=D("scale",o,c.length),I=p?D("zero_point",l?12:r,m.length):void 0,M=J("output",o,a.length,x),A=[C,T];I&&A.push(I);let $=[u,c];p&&$.push(m);let O=[{type:12,data:s/x},{type:12,data:n},{type:12,data:t.blockSize},...ne(...$,a)],L=H=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${H.registerUniforms(K).declareVariables(...A,M)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${M.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${C.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${C.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${T.getByOffset("0")}`:f?`
            let scale_index = ${M.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?b?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:f?l?`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?i?"i32":"u32":C.type.value}(0);`};
      // Compute and write output
      ${M.setByOffset("global_idx",`${M.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/x/64),y:1,z:1},programUniforms:O})}},u0=(e,t)=>{Ip(e.inputs,t),e.compute(zp(e.inputs,t))},d0=e=>ve({axis:e.axis,blockSize:e.blockSize})}),Mp,Ap,c0,ex=q(()=>{at(),ae(),ce(),Mp=(e,t,n)=>{let r=e===t,i=e<t&&n<0,a=e>t&&n>0;if(r||i||a)throw new Error("Range these inputs' contents are invalid.")},Ap=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],o=i,s=[{type:12,data:o},{type:r,data:e},{type:r,data:n},...ne(a)],l=u=>{let c=J("output",r,a.length),p=c.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${u.registerUniforms(m).declareVariables(c)}
        ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}},c0=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),Se.webgpu.validateInputContent&&Mp(t,n,r),e.compute(Ap(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),Np,Pp,p0,h0,tx=q(()=>{ae(),de(),Ae(),ce(),Np=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
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
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Pp=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=1,o=Math.ceil(R.sizeToDimension(r,r.length-1)/a),s=r[r.length-1],l=R.sizeFromDimension(n,s),u=[{type:12,data:o},{type:12,data:s},{type:12,data:l},...ne(e[1].dims,e[2].dims,i)],c=p=>{let m=D("indices",e[1].dataType,e[1].dims.length),b=D("updates",e[2].dataType,e[2].dims.length,a),f=t.reduction!=="none"&&t.reduction!==""?Ff("output",e[0].dataType,i.length):J("output",e[0].dataType,i.length,a);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,b,f)}
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
    ${Np(t.reduction,"output[data_offset + i]","value",f.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:c}},p0=e=>ve({reduction:e.reduction}),h0=(e,t)=>{e.compute(Pp(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Rp,Op,Bp,Ua,Dp,Lp,Up,Fp,Wp,qp,Vp,Hp,Fa,Gp,jp,Kp,Xp,Yp,f0,m0,nx=q(()=>{ae(),de(),Ae(),ce(),Rp=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Op=(e,t,n)=>{t.every(i=>i>=0&&i<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((i,a)=>r[i]=e[a]),r},Bp=(e,t,n,r,i,a)=>{let[o,s,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],u=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&e.length>s&&e[s].dims.length===1&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(c=>r.push(c)),r.length!==0&&r.length!==u&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Rp(r,t),t.axes.length>0&&Op(r,t.axes,u).forEach((c,p)=>r[p]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>i.push(Number(c))),i.length!==0&&i.length!==u&&n>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof i<"u"&&r.length>0&&i.length>u)throw new Error("Resize requires only of scales or sizes to be specified")},Ua=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,Dp=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ua("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ua("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Lp=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Up=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,o)=>{r[a]=i[o],r[o+n]=i[t.length+o]}),r):i},Fp=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>i.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,o)=>i[a]=n[o])}else n.forEach(a=>i.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((a,o)=>Math.round(a*t[o]))}return i},Wp=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>i[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),i.forEach((a,o)=>i[o]=Math.round(a*t[o]))),i},qp=(e,t,n,r,i)=>`
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
    }`,Vp=(e,t,n,r,i,a,o)=>`
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
    }`,Hp=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ee("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Fa=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",Gp=(e,t,n,r,i)=>{let[a,o,s,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(col, ${n[s]} - 1))`)};
      ${Fa(e,l,a,2)}
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
    }`},jp=(e,t,n,r,i,a,o,s,l,u)=>{let c=n.length===2,[p,m]=c?[0,1]:[2,3],b=e.type.value,f=_=>{let S=_===p?"row":"col";return`
      fn ${S}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",_)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[_]},
        ${r[_]}, ${n[_]}, ${a[_]}, ${a[_]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[_]} - 1))) {
          return ${l};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${S}: ${b} = originalIdx + ${b}(i);
          if (${S} < 0 || ${S} >= ${n[_]}) {
            ${u?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${l};`:`${S} = max(0, min(${S}, ${n[_]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",_,`u32(${S})`)};
          data[i + 1] = ${_===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(m)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${b}, 4>, coefs: array<${b}, 4>) -> ${b} {
    var coefsSum: ${b} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${b} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Kp=(e,t,n,r,i)=>{let[a,o,s,l,u]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Fa(e,u,a,3)}
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
    }`},Xp=(e,t,n,r,i,a)=>{let o=e.dims,s=Up(a,t.axes,o.length),l=Fp(o,r,i,t.axes),u=r.slice();r.length===0&&(u=o.map((v,C)=>v===0?1:l[C]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Wp(o,u,t)));let c=J("output",e.dataType,l.length),p=D("input",e.dataType,o.length),m=R.size(l),b=o.length===l.length&&o.every((v,C)=>v===l[C]),f=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,S=p.type.value,x=v=>`
      ${b?"":`
      ${Dp(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Hp(p,o)};
              ${Lp(t.nearestMode,n,S)};
              ${Vp(p,c,o,l,u.length,s.length,f)};
              `;case"linear":return`
              ${qp(c,o,l,u.length,s.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${Gp(p,c,o,f,_)}`;if(o.length===3||o.length===5)return`${Kp(p,c,o,f,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${jp(p,c,o,l,u,s,t.cubicCoeffA,f,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",s.length).declareVariables(p,c)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${u.length>0?t.mode==="cubic"?u:u.length:""}|${i.length>0?i:""}|${s.length>0?s:""}|${b}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:u},{type:1,data:s},...ne(o,l)]})}},Yp=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},f0=(e,t)=>{let n=[],r=[],i=[],a=Yp(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Bp(e.inputs,t,a,n,r,i),e.compute(Xp(e.inputs[0],t,a,n,r,i),{inputs:[0]})},m0=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,s=e.keepAspectRatioPolicy,l=e.mode,u=e.nearestMode===""?"simple":e.nearestMode;return ve({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:s,mode:l,nearestMode:u})}}),Zp,Qp,g0,rx=q(()=>{ae(),de(),ce(),Zp=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},Qp=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,o=R.size(a),s=a,l=o,u=a.slice(-1)[0],c=r?a.slice(0,-1).concat(1):[],p=!i&&e.length>3,m=e.length>4,b=r&&n>1,f=r&&n>2,_=n>3,S=64,x=ze(u),v=[{type:12,data:l},{type:12,data:x},{type:12,data:u},{type:1,data:t.epsilon}],C=I=>{let M=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[D("x",e[0].dataType,e[0].dims,x),D("skip",e[1].dataType,e[1].dims,x),D("gamma",e[2].dataType,e[2].dims,x)];p&&A.push(D("beta",e[3].dataType,e[3].dims,x)),m&&A.push(D("bias",e[4].dataType,e[4].dims,x)),A.push(J("output",e[0].dataType,s,x)),b&&A.push(J("mean_output",1,c)),f&&A.push(J("inv_std_output",1,c)),_&&A.push(J("input_skip_bias_sum",e[0].dataType,s,x));let $=Re(e[0].dataType),O=Re(1,x);return`

      ${I.registerUniforms(M).declareVariables(...A)}
      var<workgroup> sum_shared : array<${O}, ${S}>;
      var<workgroup> sum_squared_shared : array<${O}, ${S}>;

      ${I.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":$+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${An($,x,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
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
        let mean = ${Xt("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xt("square_sum",x)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:s,dataType:e[0].dataType}];return n>1&&T.push({dims:c,dataType:1}),n>2&&T.push({dims:c,dataType:1}),n>3&&T.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${b};${f};${_}`,inputDependencies:e.map((I,M)=>"type")},getShaderSource:C,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/u)},programUniforms:v})}},g0=(e,t)=>{Zp(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Qp(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Jp,er,eh,Wa,th,nh,b0,y0,ix=q(()=>{ae(),de(),Ae(),ce(),Jp=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},er=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},eh=(e,t)=>{if(e.length>1){let n=er(e,1),r=er(e,2),i=er(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),ve({starts:n,ends:r,axes:i})}else return t},Wa=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},th=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,nh=(e,t)=>{let n=e[0].dims,r=R.size(n),i=t.axes.length>0?R.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=er(e,4);a.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(i.length).fill(1));let o=t.starts.map((x,v)=>Wa(x,v,n,i,a)),s=t.ends.map((x,v)=>Wa(x,v,n,i,a));if(i.length!==o.length||i.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==n.length)for(let x=0;x<n.length;++x)i.includes(x)||(o.splice(x,0,0),s.splice(x,0,n[x]),a.splice(x,0,1));let l=a.map(x=>Math.sign(x));a.forEach((x,v,C)=>{if(x<0){let T=(s[v]-o[v])/x,I=o[v],M=I+T*a[v];o[v]=M,s[v]=I,C[v]=-x}});let u=n.slice(0);i.forEach((x,v)=>{u[x]=Math.ceil((s[x]-o[x])/a[x])});let c={dims:u,dataType:e[0].dataType},p=J("output",e[0].dataType,u.length),m=D("input",e[0].dataType,e[0].dims.length),b=R.size(u),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],_=[{type:12,data:b},{type:12,data:o},{type:6,data:l},{type:12,data:a},...ne(e[0].dims,u)],S=x=>`
      ${x.registerUniforms(f).declareVariables(m,p)}
        ${th(m,p,n)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:_})}},b0=(e,t)=>{Jp(e.inputs,t);let n=eh(e.inputs,t);e.compute(nh(e.inputs,n),{inputs:[0]})},y0=e=>{let t=e.starts,n=e.ends,r=e.axes;return ve({starts:t,ends:n,axes:r})}}),rh,ih,w0,_0,ax=q(()=>{ae(),de(),Ae(),Zt(),ce(),rh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},ih=(e,t)=>{let n=e.inputs[0],r=n.dims,i=R.size(r),a=r.length,o=R.normalizeAxis(t.axis,a),s=o<r.length-1,l,u=[];s?(u=Array.from({length:a},(A,$)=>$),u[o]=a-1,u[a-1]=o,l=e.compute(nt(n,u),{inputs:[n],outputs:[-1]})[0]):l=n;let c=l.dims,p=c[a-1],m=i/p,b=ze(p),f=p/b,_=64;m===1&&(_=256);let S=(A,$)=>$===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:$===2?`max(${A}.x, ${A}.y)`:$===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,x=D("x",l.dataType,l.dims,b),v=J("result",l.dataType,l.dims,b),C=x.type.value,T=Re(l.dataType)==="f32"?`var threadMax = ${C}(-3.4028234663852886e+38f);`:`var threadMax = ${C}(-65504.0h);`,I=A=>`
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
      ${A.registerUniform("packedCols","i32").declareVariables(x,v)}
      ${A.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
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
          rowMaxShared = ${C}(${S("threadShared[0]",b)});
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
          rowSumShared = ${C}(${Xt("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${C}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,M=e.compute({name:"Softmax",shaderCache:{hint:`${b};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:f}]}),getShaderSource:I},{inputs:[l],outputs:[s?-1:0]})[0];s&&e.compute(nt(M,u),{inputs:[M]})},w0=(e,t)=>{rh(e.inputs),ih(e,t)},_0=e=>ve({axis:e.axis})}),qa,ah,oh,sh,x0,ox=q(()=>{ae(),de(),ce(),qa=e=>Array.from(e.getBigInt64Array(),Number),ah=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(qa(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},oh=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},sh=(e,t)=>{let n=e[0].dims,r=t??qa(e[1]),i=oh(n,r),a=R.size(i),o=e[0].dataType,s=D("input",o,n.length),l=J("output",o,i.length),u=c=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ne(e[0].dims,i)]}),getShaderSource:u}},x0=e=>{ah(e.inputs),e.compute(sh(e.inputs),{inputs:[0]})}}),lh,uh,v0,sx=q(()=>{ae(),de(),ce(),lh=(e,t,n,r,i)=>{let a=J("output_data",i,n.length,4),o=D("a_data",t[1].dataType,t[1].dims.length,4),s=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),u,c=(p,m,b)=>`select(${m}, ${p}, ${b})`;if(!r)u=a.setByOffset("global_idx",c(o.getByOffset("global_idx"),s.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let p=(m,b,f="")=>{let _=`a_data[index_a${b}][component_a${b}]`,S=`b_data[index_b${b}][component_b${b}]`,x=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${a.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${o.broadcastedIndicesToOffset(`output_indices${b}`,a)};
            let offset_b${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,a)};
            let offset_c${b} = ${l.broadcastedIndicesToOffset(`output_indices${b}`,a)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${m}[${b}] = ${f}(${c(_,S,x)});
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
      }`},uh=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(R.areEqual(t,n)&&R.areEqual(n,r)),o=t,s=R.size(t);if(a){let u=Rn.calcShape(Rn.calcShape(t,n,!1),r,!1);if(!u)throw new Error("Can't perform where op on the given tensors");o=u,s=R.size(o)}let l=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:u=>lh(u,e,o,a,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:l},...ne(r,t,n,o)]})}},v0=e=>{e.compute(uh(e.inputs))}}),$0,lx=q(()=>{v1(),ts(),$1(),S1(),k1(),T1(),C1(),A1(),P1(),R1(),O1(),B1(),D1(),L1(),U1(),F1(),W1(),q1(),V1(),H1(),G1(),j1(),K1(),X1(),Y1(),Wg(),Z1(),Q1(),J1(),ex(),tx(),es(),nx(),jg(),rx(),ix(),ax(),Hg(),ox(),Zt(),ns(),sx(),$0=new Map([["Abs",[gm]],["Acos",[bm]],["Acosh",[ym]],["Add",[Qm]],["ArgMax",[pm,wo]],["ArgMin",[cm,wo]],["Asin",[wm]],["Asinh",[_m]],["Atan",[xm]],["Atanh",[vm]],["Attention",[hm]],["AveragePool",[n0,t0]],["BatchNormalization",[fm]],["BiasAdd",[mm]],["BiasSplitGelu",[Zm]],["Cast",[Sm,$m]],["Ceil",[Tm]],["Clip",[km]],["Concat",[lg,ug]],["Conv",[ko,So]],["ConvTranspose",[wg,yg]],["Cos",[Cm]],["Cosh",[Em]],["CumSum",[_g,xg]],["DepthToSpace",[vg,$g]],["DequantizeLinear",[u0,d0]],["Div",[Jm]],["Einsum",[Sg,kg]],["Elu",[Im,sr]],["Equal",[eg]],["Erf",[zm]],["Exp",[Mm]],["Expand",[Tg]],["FastGelu",[Cg]],["Floor",[Am]],["FusedConv",[ko,So]],["Gather",[Ig,Eg]],["GatherElements",[Rg,Pg]],["GatherBlockQuantized",[Ag,Ng]],["GatherND",[zg,Mg]],["Gelu",[Nm]],["Gemm",[Bg,Og]],["GlobalAveragePool",[i0,r0]],["GlobalMaxPool",[l0,s0]],["Greater",[ig]],["GreaterOrEqual",[og]],["GridSample",[Dg,Lg]],["GroupQueryAttention",[Kg]],["HardSigmoid",[Fm,Um]],["InstanceNormalization",[Xg]],["LayerNormalization",[Yg]],["LeakyRelu",[Pm,sr]],["Less",[ag]],["LessOrEqual",[sg]],["Log",[Xm]],["MatMul",[Zg]],["MatMulNBits",[Qg,Jg]],["MaxPool",[a0,o0]],["Mul",[tg]],["MultiHeadAttention",[Fg,Ug]],["Neg",[Om]],["Not",[Rm]],["Pad",[e0]],["Pow",[ng]],["QuickGelu",[Ym,sr]],["Range",[c0]],["Reciprocal",[Bm]],["ReduceMin",[om]],["ReduceMean",[tm]],["ReduceMax",[am]],["ReduceSum",[lm]],["ReduceProd",[sm]],["ReduceL1",[nm]],["ReduceL2",[rm]],["ReduceLogSum",[dm]],["ReduceLogSumExp",[im]],["ReduceSumSquare",[um]],["Relu",[Dm]],["Resize",[f0,m0]],["RotaryEmbedding",[Gg]],["ScatterND",[h0,p0]],["Sigmoid",[Lm]],["Sin",[Wm]],["Sinh",[qm]],["Slice",[b0,y0]],["SkipLayerNormalization",[g0]],["Split",[qg,Vg]],["Sqrt",[Vm]],["Softmax",[w0,_0]],["Sub",[rg]],["Tan",[Hm]],["Tanh",[Gm]],["ThresholdedRelu",[Km,sr]],["Tile",[x0]],["Transpose",[qf,Vf]],["Where",[v0]]])}),S0,ux=q(()=>{at(),Ot(),ce(),S0=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){Ct(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let s=[];for(let u of t)s.push({binding:s.length,resource:{buffer:u.buffer}});for(let u of n)s.push({binding:s.length,resource:{buffer:u.buffer}});i&&s.push({binding:s.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let u={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(u)}o.setPipeline(e.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),bt(e.programInfo.name)}dispose(){}build(e,t){Ct(e.name);let n=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(u=>{n.features.has(u.feature)&&r.push(`enable ${u.extension};`)});let i=Wf(t,this.backend.device.limits),a=e.getShaderSource(i),o=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,s=n.createShaderModule({code:o,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let l=n.createComputePipeline({compute:{module:s,entryPoint:"main"},layout:"auto",label:e.name});return bt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,o=Math.ceil(Math.sqrt(a));if(o>i){if(o=Math.ceil(Math.cbrt(a)),o>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),k0={};Dn(k0,{WebGpuBackend:()=>T0});var dh,ch,ph,T0,dx=q(()=>{at(),ae(),Ot(),Bf(),_1(),lx(),ux(),dh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${i}`);break}case"rank":{let a=e[r].dims.length;n.push(`${i};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${i};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},ch=(e,t,n)=>{var i,a;let r=e.name;return(i=e.shaderCache)!=null&&i.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${dh(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,r},ph=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},T0=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>t.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new ph(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Uf(this),this.programManager=new S0(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Yo(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ct(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var r;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=n[i],o=a.kernelId,s=this.kernels.get(o),l=s.kernelType,u=s.kernelName,c=a.programName,p=a.inputTensorViews,m=a.outputTensorViews,b=t[i*2],f=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=b);let _=Number(b-this.queryTimeBase),S=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if((r=this.env.webgpu.profiling)!=null&&r.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(x=>({dims:x.dims,dataType:Nt(x.dataType)})),outputsMetadata:m.map(x=>({dims:x.dims,dataType:Nt(x.dataType)})),kernelId:o,kernelType:l,kernelName:u,programName:c,startTime:_,endTime:S});else{let x="";p.forEach((C,T)=>{x+=`input[${T}]: [${C.dims}] | ${Nt(C.dataType)}, `});let v="";m.forEach((C,T)=>{v+=`output[${T}]: [${C.dims}] | ${Nt(C.dataType)}, `}),console.log(`[profiling] kernel "${o}|${l}|${u}|${c}" ${x}${v}start time: ${_} ns, execution time: ${S-_} ns`)}ni("GPU",`${c}::${b}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),bt()}run(e,t,n,r,i,a){Ct(e.name);let o=[];for(let v=0;v<t.length;++v){let C=t[v].data;if(C===0)continue;let T=this.gpuDataManager.get(C);if(!T)throw new Error(`no GPU data for input: ${C}`);o.push(T)}let{outputs:s,dispatchGroup:l,programUniforms:u}=e.getRunData(t),c=n.length===0?s.map((v,C)=>C):n;if(c.length!==s.length)throw new Error(`Output size ${c.length} must be equal to ${s.length}.`);let p=[],m=[];for(let v=0;v<s.length;++v){if(!Number.isInteger(c[v])||c[v]<-3||c[v]>=a)throw new Error(`Invalid output index: ${c[v]}`);if(c[v]===-3)continue;let C=c[v]===-1,T=c[v]===-2,I=C||T?i(s[v].dataType,s[v].dims):r(c[v],s[v].dataType,s[v].dims);if(p.push(I),I.data===0)continue;let M=this.gpuDataManager.get(I.data);if(!M)throw new Error(`no GPU data for output: ${I.data}`);if(C&&this.temporaryData.push(M),T){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(M)}m.push(M)}if(o.length!==t.length||m.length!==p.length){if(m.length===0)return bt(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(u){let v=0,C=[];u.forEach(A=>{let $=typeof A.data=="number"?[A.data]:A.data;if($.length===0)return;let O=A.type===10?2:4,L,H;A.type===10?(H=$.length>4?16:$.length>2?8:$.length*O,L=$.length>4?16:O*$.length):(H=$.length<=2?$.length*O:16,L=16),v=Math.ceil(v/H)*H,C.push(v);let K=A.type===10?8:4;v+=$.length>4?Math.ceil($.length/K)*L:$.length*O});let T=16;v=Math.ceil(v/T)*T;let I=new ArrayBuffer(v);u.forEach((A,$)=>{let O=C[$],L=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(I,O,L.length).set(L);else if(A.type===12)new Uint32Array(I,O,L.length).set(L);else if(A.type===10)new Uint16Array(I,O,L.length).set(L);else if(A.type===1)new Float32Array(I,O,L.length).set(L);else throw new Error(`Unsupported uniform type: ${Nt(A.type)}`)});let M=this.gpuDataManager.create(v,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(M.buffer,0,I,0,v),this.gpuDataManager.release(M.id),b={offset:0,size:v,buffer:M.buffer}}let f=this.programManager.normalizeDispatchGroupSize(l),_=f[1]===1&&f[2]===1,S=ch(e,t,_),x=this.programManager.getArtifact(S);if(x||(x=this.programManager.build(e,f),this.programManager.setArtifact(S,x),ye("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),u&&x.uniformVariablesInfo){if(u.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${u.length} in program "${x.programInfo.name}".`);for(let v=0;v<u.length;v++){let C=u[v],T=C.type,I=typeof C.data=="number"?1:C.data.length,[M,A]=x.uniformVariablesInfo[v];if(T!==M||I!==A)throw new Error(`Uniform variable ${v} mismatch: expect type ${M} with size ${A}, got type ${T} with size ${I} in program "${x.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let v={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(v),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(v)}return this.programManager.run(x,o,m,f,b),bt(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=$0.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,o=r.kernelEntry,s=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&(s[1]=s[0](s[1]),s[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(t,s[1]),0}catch(u){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${u}`)),1}finally{l&&n.push(this.device.popErrorScope().then(u=>u?`GPU validation error for kernel "[${i}] ${a}": ${u.message}`:null));for(let u of this.temporaryData)this.gpuDataManager.release(u.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),o=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[o,n]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await go(this,e,t);return Zo(r.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),C0={};Dn(C0,{init:()=>E0});var Hr,hh,E0,cx=q(()=>{ae(),Ot(),de(),w1(),Hr=class I0{constructor(t,n,r,i){this.module=t,this.dataType=n,this.data=r,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new I0(this.module,this.dataType,this.data,t)}},hh=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*i++,a));let o=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,"*")),this.customDataSize=Number(e.getValue(r*i++,a));let s=[];for(let l=0;l<o;l++){let u=Number(e.getValue(r*i++,a)),c=Number(e.getValue(r*i++,"*")),p=Number(e.getValue(r*i++,a)),m=[];for(let b=0;b<p;b++)m.push(Number(e.getValue(r*i++,a)));s.push(new Hr(e,u,c,m))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var o;let n=((o=t==null?void 0:t.inputs)==null?void 0:o.map(s=>typeof s=="number"?this.inputs[s]:s))??this.inputs,r=(t==null?void 0:t.outputs)??[],i=(s,l,u)=>new Hr(this.module,l,this.output(s,u),u),a=(s,l)=>{let u=cn(s,l);if(!u)throw new Error(`Unsupported data type: ${s}`);let c=u>0?this.backend.gpuDataManager.create(u).id:0;return new Hr(this.module,s,c,l)};return this.backend.run(e,n,r,i,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=r===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let o=0;o<t.length;o++)this.module.setValue(a+r*(o+1),t[o],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(n)}}},E0=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(dx(),fr(k0)).WebGpuBackend,o=new a;await o.initialize(n,r),i("webgpu",[o,s=>o.alloc(Number(s)),s=>o.free(s),(s,l,u,c=!1)=>{if(c)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(l)}, size=${Number(u)}`),o.memcpy(Number(s),Number(l));else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(l)}, size=${Number(u)}`);let p=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));o.upload(Number(l),p)}},async(s,l,u)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${l}, size=${u}`),await o.download(Number(s),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+u)>>>0))},(s,l,u)=>o.createKernel(s,Number(l),u,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),s=>o.releaseKernel(s),(s,l,u,c)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${l}`);let p=new hh(t,o,Number(l));return o.computeKernel(Number(s),p,c)},()=>o.captureBegin(),()=>o.captureEnd(),()=>o.replay()])}else{let a=new Lf(n);i("webnn",[a,()=>a.reserveTensorId(),o=>a.releaseTensorId(o),async(o,s,l,u,c)=>a.ensureTensor(o,s,l,u,c),(o,s)=>{a.uploadTensor(o,s)},async(o,s)=>a.downloadTensor(o,s),(o,s)=>a.registerMLContext(o,s),!!n.trace])}}}),fh,ls,us,Ht,mh,Va,ui,ds,cs,Ha,ps,hs,fs,z0=q(()=>{at(),g1(),b1(),ae(),$n(),Go(),Nf(),fh=(e,t)=>{Te()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},ls=async e=>{fh(e.wasm.numThreads,ii(e.logLevel))},us=async(e,t)=>{var r,i;(i=(r=Te()).asyncInit)==null||i.call(r);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let o=e.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(cx(),fr(C0)).init;t==="webgpu"&&await a("webgpu",Te(),e,n),t==="webnn"&&await a("webnn",Te(),e)}},Ht=new Map,mh=e=>{let t=Te(),n=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,i,i+r)!==0&&$e("Can't get session input/output count.");let a=r===4?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(n)}},Va=(e,t)=>{let n=Te(),r=n.stackSave(),i=0;try{let a=n.PTR_SIZE,o=n.stackAlloc(2*a);n._OrtGetInputOutputMetadata(e,t,o,o+a)!==0&&$e("Can't get session input/output metadata.");let s=Number(n.getValue(o,"*"));i=Number(n.getValue(o+a,"*"));let l=n.HEAP32[i/4];if(l===0)return[s,0];let u=n.HEAPU32[i/4+1],c=[];for(let p=0;p<u;p++){let m=Number(n.getValue(i+8+p*a,"*"));c.push(m!==0?n.UTF8ToString(m):Number(n.getValue(i+8+(p+u)*a,"*")))}return[s,l,c]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},ui=e=>{let t=Te(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},ds=async(e,t)=>{var p,m,b,f;let n,r,i=Te();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=ui(e);let a=0,o=0,s=0,l=[],u=[],c=[];try{if([o,l]=await Af(t),(t==null?void 0:t.externalData)&&i.mountExternalData){let $=[];for(let O of t.externalData){let L=typeof O=="string"?O:O.path;$.push(Xo(typeof O=="string"?O:O.data).then(H=>{i.mountExternalData(L,H)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof $!="string"){let O=$,L=O==null?void 0:O.context,H=O==null?void 0:O.gpuDevice,K=O==null?void 0:O.deviceType,X=O==null?void 0:O.powerPreference;L?i.currentContext=L:H?i.currentContext=await i.webnnCreateMLContext(H):i.currentContext=await i.webnnCreateMLContext({deviceType:K,powerPreference:X})}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,o),(p=i.webgpuOnCreateSession)==null||p.call(i,a),a===0&&$e("Can't create a session."),(m=i.jsepOnCreateSession)==null||m.call(i),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[_,S]=mh(a),x=!!(t!=null&&t.enableGraphCapture),v=[],C=[],T=[],I=[],M=[];for(let $=0;$<_;$++){let[O,L,H]=Va(a,$);O===0&&$e("Can't get an input name."),u.push(O);let K=i.UTF8ToString(O);v.push(K),T.push(L===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Nt(L),shape:H})}for(let $=0;$<S;$++){let[O,L,H]=Va(a,$+_);O===0&&$e("Can't get an output name."),c.push(O);let K=i.UTF8ToString(O);C.push(K),I.push(L===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Nt(L),shape:H});{if(x&&(t==null?void 0:t.preferredOutputLocation)===void 0){M.push("gpu-buffer");continue}let X=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((b=t==null?void 0:t.preferredOutputLocation)==null?void 0:b[K])??"cpu",P=i.webnnIsGraphOutput;if(X==="cpu"&&P&&P(a,K)){M.push("ml-tensor-cpu-output");continue}if(X!=="cpu"&&X!=="cpu-pinned"&&X!=="gpu-buffer"&&X!=="ml-tensor")throw new Error(`Not supported preferred output location: ${X}.`);if(x&&X!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${X}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);M.push(X)}}let A=null;return M.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(s=i._OrtCreateBinding(a),s===0&&$e("Can't create IO binding."),A={handle:s,outputPreferredLocations:M,outputPreferredLocationsEncoded:M.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>fo($))}),Ht.set(a,[a,u,c,A,x,!1]),[a,v,C,T,I]}catch(_){throw u.forEach(S=>i._OrtFree(S)),c.forEach(S=>i._OrtFree(S)),s!==0&&i._OrtReleaseBinding(s)!==0&&$e("Can't release IO binding."),a!==0&&i._OrtReleaseSession(a)!==0&&$e("Can't release session."),_}finally{i._free(n),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&$e("Can't release session options."),l.forEach(_=>i._free(_)),(f=i.unmountExternalData)==null||f.call(i)}},cs=e=>{var l,u,c;let t=Te(),n=Ht.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,o,s]=n;o&&(s&&t._OrtClearBoundOutputs(o.handle)!==0&&$e("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&$e("Can't release IO binding.")),(l=t.jsepOnReleaseSession)==null||l.call(t,e),(u=t.webnnOnReleaseSession)==null||u.call(t,e),(c=t.webgpuOnReleaseSession)==null||c.call(t,e),i.forEach(p=>t._OrtFree(p)),a.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(r)!==0&&$e("Can't release session."),Ht.delete(e)},Ha=async(e,t,n,r,i,a,o=!1)=>{if(!e){t.push(0);return}let s=Te(),l=s.PTR_SIZE,u=e[0],c=e[1],p=e[3],m=p,b,f;if(u==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(o&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let x=e[2].gpuBuffer;f=cn(dn(u),c);{let v=s.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=v(r,a,x,f)}}else if(p==="ml-tensor"){let x=e[2].mlTensor;f=cn(dn(u),c);let v=s.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=v(r,x,dn(u),c)}else{let x=e[2];if(Array.isArray(x)){f=l*x.length,b=s._malloc(f),n.push(b);for(let v=0;v<x.length;v++){if(typeof x[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);s.setValue(b+v*l,ht(x[v],n),"*")}}else{let v=s.webnnIsGraphInput,C=s.webnnIsGraphOutput;if(u!=="string"&&v&&C){let T=s.UTF8ToString(i);if(v(r,T)||C(r,T)){let I=dn(u);f=cn(I,c),m="ml-tensor";let M=s.webnnCreateTemporaryTensor,A=s.webnnUploadTensor;if(!M||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await M(r,I,c);A($,new Uint8Array(x.buffer,x.byteOffset,x.byteLength)),b=$}else f=x.byteLength,b=s._malloc(f),n.push(b),s.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,f),b)}else f=x.byteLength,b=s._malloc(f),n.push(b),s.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,f),b)}}let _=s.stackSave(),S=s.stackAlloc(4*c.length);try{c.forEach((v,C)=>s.setValue(S+C*l,v,l===4?"i32":"i64"));let x=s._OrtCreateTensor(dn(u),b,f,S,c.length,fo(m));x===0&&$e(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(x)}finally{s.stackRestore(_)}},ps=async(e,t,n,r,i,a)=>{var K,X,P,Q;let o=Te(),s=o.PTR_SIZE,l=Ht.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let u=l[0],c=l[1],p=l[2],m=l[3],b=l[4],f=l[5],_=t.length,S=r.length,x=0,v=[],C=[],T=[],I=[],M=[],A=o.stackSave(),$=o.stackAlloc(_*s),O=o.stackAlloc(_*s),L=o.stackAlloc(S*s),H=o.stackAlloc(S*s);try{[x,v]=Mf(a),mn("wasm prepareInputOutputTensor");for(let F=0;F<_;F++)await Ha(n[F],C,I,e,c[t[F]],t[F],b);for(let F=0;F<S;F++)await Ha(i[F],T,I,e,p[r[F]],_+r[F],b);gn("wasm prepareInputOutputTensor");for(let F=0;F<_;F++)o.setValue($+F*s,C[F],"*"),o.setValue(O+F*s,c[t[F]],"*");for(let F=0;F<S;F++)o.setValue(L+F*s,T[F],"*"),o.setValue(H+F*s,p[r[F]],"*");if(m&&!f){let{handle:F,outputPreferredLocations:re,outputPreferredLocationsEncoded:U}=m;if(c.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${c.length}).`);mn("wasm bindInputsOutputs");for(let G=0;G<_;G++){let Y=t[G];await o._OrtBindInput(F,c[Y],C[G])!==0&&$e(`Can't bind input[${G}] for session=${e}.`)}for(let G=0;G<S;G++){let Y=r[G];(K=i[G])!=null&&K[3]?(M.push(T[G]),o._OrtBindOutput(F,p[Y],T[G],0)!==0&&$e(`Can't bind pre-allocated output[${G}] for session=${e}.`)):o._OrtBindOutput(F,p[Y],0,U[Y])!==0&&$e(`Can't bind output[${G}] to ${re[G]} for session=${e}.`)}gn("wasm bindInputsOutputs"),Ht.set(e,[u,c,p,m,b,!0])}(X=o.jsepOnRunStart)==null||X.call(o,u),(P=o.webnnOnRunStart)==null||P.call(o,u);let W;m?W=await o._OrtRunWithBinding(u,m.handle,S,L,x):W=await o._OrtRun(u,O,$,_,H,S,L,x),W!==0&&$e("failed to call OrtRun().");let te=[],ie=[];mn("wasm ProcessOutputTensor");for(let F=0;F<S;F++){let re=Number(o.getValue(L+F*s,"*"));if(re===T[F]||M.includes(T[F])){te.push(i[F]),re!==T[F]&&o._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.");continue}let U=o.stackSave(),G=o.stackAlloc(4*s),Y=!1,V,_e=0;try{o._OrtGetTensorData(re,G,G+s,G+2*s,G+3*s)!==0&&$e(`Can't access output tensor data on index ${F}.`);let Ve=s===4?"i32":"i64",Ie=Number(o.getValue(G,Ve));_e=o.getValue(G+s,"*");let Be=o.getValue(G+s*2,"*"),je=Number(o.getValue(G+s*3,Ve)),Ze=[];for(let Ce=0;Ce<je;Ce++)Ze.push(Number(o.getValue(Be+Ce*s,Ve)));o._OrtFree(Be)!==0&&$e("Can't free memory for tensor dims.");let Ke=Ze.reduce((Ce,se)=>Ce*se,1);V=Nt(Ie);let Dt=m==null?void 0:m.outputPreferredLocations[r[F]];if(V==="string"){if(Dt==="gpu-buffer"||Dt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let se=0;se<Ke;se++){let Qe=o.getValue(_e+se*s,"*"),xr=o.getValue(_e+(se+1)*s,"*"),Wn=se===Ke-1?void 0:xr-Qe;Ce.push(o.UTF8ToString(Qe,Wn))}te.push([V,Ze,Ce,"cpu"])}else if(Dt==="gpu-buffer"&&Ke>0){let Ce=o.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let se=Ce(_e),Qe=cn(Ie,Ke);if(Qe===void 0||!jo(V))throw new Error(`Unsupported data type: ${V}`);Y=!0,te.push([V,Ze,{gpuBuffer:se,download:o.jsepCreateDownloader(se,Qe,V),dispose:()=>{o._OrtReleaseTensor(re)!==0&&$e("Can't release tensor.")}},"gpu-buffer"])}else if(Dt==="ml-tensor"&&Ke>0){let Ce=o.webnnEnsureTensor,se=o.webnnIsGraphInputOutputTypeSupported;if(!Ce||!se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(cn(Ie,Ke)===void 0||!Ko(V))throw new Error(`Unsupported data type: ${V}`);if(!se(e,V,!1))throw new Error(`preferredLocation "ml-tensor" for ${V} output is not supported by current WebNN Context.`);let Qe=await Ce(e,_e,Ie,Ze,!1);Y=!0,te.push([V,Ze,{mlTensor:Qe,download:o.webnnCreateMLTensorDownloader(_e,V),dispose:()=>{o.webnnReleaseTensorId(_e),o._OrtReleaseTensor(re)}},"ml-tensor"])}else if(Dt==="ml-tensor-cpu-output"&&Ke>0){let Ce=o.webnnCreateMLTensorDownloader(_e,V)(),se=te.length;Y=!0,ie.push((async()=>{let Qe=[se,await Ce];return o.webnnReleaseTensorId(_e),o._OrtReleaseTensor(re),Qe})()),te.push([V,Ze,[],"cpu"])}else{let Ce=vi(V),se=new Ce(Ke);new Uint8Array(se.buffer,se.byteOffset,se.byteLength).set(o.HEAPU8.subarray(_e,_e+se.byteLength)),te.push([V,Ze,se,"cpu"])}}finally{o.stackRestore(U),V==="string"&&_e&&o._free(_e),Y||o._OrtReleaseTensor(re)}}m&&!b&&(o._OrtClearBoundOutputs(m.handle)!==0&&$e("Can't clear bound outputs."),Ht.set(e,[u,c,p,m,b,!1]));for(let[F,re]of await Promise.all(ie))te[F][2]=re;return gn("wasm ProcessOutputTensor"),te}finally{(Q=o.webnnOnRunEnd)==null||Q.call(o,u),o.stackRestore(A),C.forEach(W=>o._OrtReleaseTensor(W)),T.forEach(W=>o._OrtReleaseTensor(W)),I.forEach(W=>o._free(W)),x!==0&&o._OrtReleaseRunOptions(x),v.forEach(W=>o._free(W))}},hs=e=>{let t=Te(),n=Ht.get(e);if(!n)throw new Error("invalid session id");let r=n[0],i=t._OrtEndProfiling(r);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},fs=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),Gt,Xe,En,tr,nr,Gr,Ga,jr,on,sn,gh,M0,A0,N0,P0,R0,O0,B0,D0=q(()=>{at(),z0(),$n(),Vo(),Gt=()=>!!Se.wasm.proxy&&typeof document<"u",En=!1,tr=!1,nr=!1,jr=new Map,on=(e,t)=>{let n=jr.get(e);n?n.push(t):jr.set(e,[t])},sn=()=>{if(En||!tr||nr||!Xe)throw new Error("worker not ready")},gh=e=>{switch(e.data.type){case"init-wasm":En=!1,e.data.err?(nr=!0,Ga[1](e.data.err)):(tr=!0,Ga[0]()),Gr&&(URL.revokeObjectURL(Gr),Gr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=jr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},M0=async()=>{if(!tr){if(En)throw new Error("multiple calls to 'initWasm()' detected.");if(nr)throw new Error("previous call to 'initWasm()' failed.");if(En=!0,Gt())return new Promise((e,t)=>{Xe==null||Xe.terminate(),If().then(([n,r])=>{try{Xe=r,Xe.onerror=a=>t(a),Xe.onmessage=gh,Ga=[e,t];let i={type:"init-wasm",in:Se};!i.in.wasm.wasmPaths&&(n||ho)&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href}),Xe.postMessage(i),Gr=n}catch(i){t(i)}},t)});try{await Ho(Se.wasm),await ls(Se),tr=!0}catch(e){throw nr=!0,e}finally{En=!1}}},A0=async e=>{if(Gt())return sn(),new Promise((t,n)=>{on("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:Se}};Xe.postMessage(r)});await us(Se,e)},N0=async e=>Gt()?(sn(),new Promise((t,n)=>{on("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Xe.postMessage(r,[e.buffer])})):ui(e),P0=async(e,t)=>{if(Gt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return sn(),new Promise((n,r)=>{on("create",[n,r]);let i={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Xe.postMessage(i,a)})}else return ds(e,t)},R0=async e=>{if(Gt())return sn(),new Promise((t,n)=>{on("release",[t,n]);let r={type:"release",in:e};Xe.postMessage(r)});cs(e)},O0=async(e,t,n,r,i,a)=>{if(Gt()){if(n.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return sn(),new Promise((o,s)=>{on("run",[o,s]);let l=n,u={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};Xe.postMessage(u,fs(l))})}else return ps(e,t,n,r,i,a)},B0=async e=>{if(Gt())return sn(),new Promise((t,n)=>{on("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Xe.postMessage(r)});hs(e)}}),ja,bh,L0,px=q(()=>{at(),D0(),ae(),qo(),Nf(),ja=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},bh=e=>{switch(e[3]){case"cpu":return new gt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!jo(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return gt.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case"ml-tensor":{let t=e[0];if(!Ko(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return gt.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},L0=class{async fetchModelAndCopyToWasmMemory(e){return N0(await Xo(e))}async loadModel(e,t){Ct();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await P0(n,t),bt()}async dispose(){return R0(this.sessionId)}async run(e,t,n){Ct();let r=[],i=[];Object.entries(e).forEach(p=>{let m=p[0],b=p[1],f=this.inputNames.indexOf(m);if(f===-1)throw new Error(`invalid input '${m}'`);r.push(b),i.push(f)});let a=[],o=[];Object.entries(t).forEach(p=>{let m=p[0],b=p[1],f=this.outputNames.indexOf(m);if(f===-1)throw new Error(`invalid output '${m}'`);a.push(b),o.push(f)});let s=r.map((p,m)=>ja(p,()=>`input "${this.inputNames[i[m]]}"`)),l=a.map((p,m)=>p?ja(p,()=>`output "${this.outputNames[o[m]]}"`):null),u=await O0(this.sessionId,i,s,o,l,n),c={};for(let p=0;p<u.length;p++)c[this.outputNames[o[p]]]=a[p]??bh(u[p]);return bt(),c}startProfiling(){}endProfiling(){B0(this.sessionId)}}}),U0={};Dn(U0,{OnnxruntimeWebAssemblyBackend:()=>Eo,initializeFlags:()=>Co,wasmBackend:()=>F0});var Co,Eo,F0,hx=q(()=>{at(),D0(),px(),Co=()=>{(typeof Se.wasm.initTimeout!="number"||Se.wasm.initTimeout<0)&&(Se.wasm.initTimeout=0);let e=Se.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Se.wasm.simd=!1),typeof Se.wasm.proxy!="boolean"&&(Se.wasm.proxy=!1),typeof Se.wasm.trace!="boolean"&&(Se.wasm.trace=!1),typeof Se.wasm.numThreads!="number"||!Number.isInteger(Se.wasm.numThreads)||Se.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Se.wasm.numThreads=1;else{let t=typeof navigator>"u"?Q_("node:os").cpus().length:navigator.hardwareConcurrency;Se.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Eo=class{async init(e){Co(),await M0(),await A0(e)}async createInferenceSessionHandler(e,t){let n=new L0;return await n.loadModel(e,t),n}},F0=new Eo});at();at();at();var fx="1.26.0";{let e=(hx(),fr(U0)).wasmBackend;Mn("webgpu",e,5),Mn("webnn",e,5),Mn("cpu",e,10),Mn("wasm",e,10)}Object.defineProperty(Se.versions,"web",{value:fx,enumerable:!0});/**
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
 */function ot(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}const pn=class pn{constructor(){Pe(this,"customModelPaths",new Map);Pe(this,"baseUrl","/models");Pe(this,"webnnEnabled",!1);Pe(this,"webnnDeviceType","gpu");Pe(this,"webnnPowerPreference","default");Pe(this,"webgpuEnabled",!1);Pe(this,"webgpuPowerPreference","default");Pe(this,"generalLoggingEnabled",!1);Pe(this,"performanceLoggingEnabled",!1);Pe(this,"onnxProfilingEnabled",!1);Pe(this,"sessionCacheBypass",!1);Pe(this,"modelCacheBypass",!1);this.initializeDefaultPaths()}static getInstance(){return pn.instance||(pn.instance=new pn),pn.instance}initializeDefaultPaths(){this.customModelPaths.clear()}setCustomModelPath(t,n){this.customModelPaths.set(t,n),this.generalLoggingEnabled&&console.log(`Set custom model path for ${t}: ${n}`)}getCustomModelPath(t){return this.customModelPaths.get(t)}getAllModelPaths(){return new Map(this.customModelPaths)}hasCustomPath(t){const n=this.customModelPaths.get(t);return n!==void 0&&n!==""}resetToDefaults(){this.baseUrl="/models",this.customModelPaths.clear(),this.initializeDefaultPaths(),this.generalLoggingEnabled&&console.log("Reset all model paths to defaults")}removeCustomPath(t){this.customModelPaths.has(t)&&(this.customModelPaths.delete(t),this.generalLoggingEnabled&&console.log(`Removed custom path for ${t}`))}getAvailableModels(){return["u2net","u2netp","u2net_human_seg","u2net_cloth_seg","isnet-general-use","isnet-anime","silueta","u2net_custom"]}setBaseUrl(t){this.baseUrl=t,this.generalLoggingEnabled&&console.log(`Set base URL for models: ${t}`),this.initializeDefaultPaths()}getBaseUrl(){return this.baseUrl}enableWebNN(t){this.webnnEnabled=t,this.generalLoggingEnabled&&console.log(`WebNN support ${t?"enabled":"disabled"} globally`)}setWebNNDeviceType(t){this.webnnDeviceType=t,this.generalLoggingEnabled&&console.log(`WebNN device type set to: ${t}`)}setWebNNPowerPreference(t){this.webnnPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebNN power preference set to: ${t}`)}isWebNNEnabled(){return this.webnnEnabled}getWebNNDeviceType(){return this.webnnDeviceType}getWebNNPowerPreference(){return this.webnnPowerPreference}getWebNNConfig(){return{enabled:this.webnnEnabled,deviceType:this.webnnDeviceType,powerPreference:this.webnnPowerPreference}}resetWebNNSettings(){this.webnnEnabled=!1,this.webnnDeviceType="gpu",this.webnnPowerPreference="default",this.generalLoggingEnabled&&console.log("WebNN settings reset to defaults")}enableWebGPU(t){this.webgpuEnabled=t,this.generalLoggingEnabled&&console.log(`WebGPU support ${t?"enabled":"disabled"} globally`)}setWebGPUPowerPreference(t){this.webgpuPowerPreference=t,this.generalLoggingEnabled&&console.log(`WebGPU power preference set to: ${t}`)}isWebGPUEnabled(){return this.webgpuEnabled}getWebGPUPowerPreference(){return this.webgpuPowerPreference}getWebGPUConfig(){return{enabled:this.webgpuEnabled,powerPreference:this.webgpuPowerPreference}}resetWebGPUSettings(){this.webgpuEnabled=!1,this.webgpuPowerPreference="default",this.generalLoggingEnabled&&console.log("WebGPU settings reset to defaults")}enableGeneralLogging(t){this.generalLoggingEnabled=t,this.generalLoggingEnabled&&console.log(`General logging ${t?"enabled":"disabled"}`)}enablePerformanceLogging(t){this.performanceLoggingEnabled=t,this.performanceLoggingEnabled&&console.log(`Performance logging ${t?"enabled":"disabled"}`)}isGeneralLoggingEnabled(){return this.generalLoggingEnabled}isPerformanceLoggingEnabled(){return this.performanceLoggingEnabled}enableONNXProfiling(t){this.onnxProfilingEnabled=t,this.onnxProfilingEnabled&&console.log(`ONNX profiling ${t?"enabled":"disabled"}`)}isONNXProfilingEnabled(){return this.onnxProfilingEnabled}getLoggingConfig(){return{generalLogging:this.generalLoggingEnabled,performanceLogging:this.performanceLoggingEnabled,onnxProfiling:this.onnxProfilingEnabled}}resetLoggingSettings(){this.generalLoggingEnabled=!1,this.performanceLoggingEnabled=!1,this.onnxProfilingEnabled=!1,this.generalLoggingEnabled&&console.log("Logging settings reset to defaults")}setSessionCacheBypass(t){this.sessionCacheBypass=t,this.generalLoggingEnabled&&console.log(`Session cache bypass ${t?"enabled":"disabled"} globally`)}setModelCacheBypass(t){this.modelCacheBypass=t,this.generalLoggingEnabled&&console.log(`Model cache bypass ${t?"enabled":"disabled"} globally`)}isSessionCacheBypassEnabled(){return this.sessionCacheBypass}isModelCacheBypassEnabled(){return this.modelCacheBypass}getCacheBypassConfig(){return{sessionCacheBypass:this.sessionCacheBypass,modelCacheBypass:this.modelCacheBypass}}resetCacheBypassSettings(){this.sessionCacheBypass=!1,this.modelCacheBypass=!1,this.generalLoggingEnabled&&console.log("Cache bypass settings reset to defaults")}};Pe(pn,"instance");let Io=pn;const Me=Io.getInstance();function be(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function ms(...e){Me.isGeneralLoggingEnabled()&&console.log(...e)}function le(...e){Me.isPerformanceLoggingEnabled()&&console.log(...e)}function Fe(...e){console.warn(...e)}function Ln(...e){console.error(...e)}function Bt(e){return function(t,n,r){const i=r.value,a=n;return r.value=async function(...o){const s=performance.now();le(`[${a}] Starting execution...`);try{const l=await i.apply(this,o),c=performance.now()-s;return le(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-s;throw Ln(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function gs(e){return function(t,n,r){const i=r.value,a=n;return r.value=function(...o){const s=performance.now();le(`[${a}] Starting execution...`);try{const l=i.apply(this,o),c=performance.now()-s;return le(`[${a}] Completed successfully: ${c.toFixed(2)}ms`),l}catch(l){const c=performance.now()-s;throw Ln(`[${a}] Failed after ${c.toFixed(2)}ms:`,l),l}},r}}function Ka(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Failed to get context for canvas");return n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",e instanceof HTMLImageElement?(t.width=e.naturalWidth,t.height=e.naturalHeight,n.drawImage(e,0,0)):(t.width=e.width,t.height=e.height,n.putImageData(e,0,0)),t}function mx(e){const t=performance.now();return be(`[fileToImage] Converting ${e instanceof File?e.name:"blob"} (${(e.size/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Image,a=URL.createObjectURL(e);i.onload=()=>{const o=performance.now()-t;le(`[fileToImage] Image loaded: ${o.toFixed(2)}ms (${i.naturalWidth}x${i.naturalHeight})`),URL.revokeObjectURL(a),n(i)},i.onerror=o=>{const s=performance.now()-t;Ln(`[fileToImage] Image load failed: ${s.toFixed(2)}ms`,o),URL.revokeObjectURL(a),r(o)},i.src=a})}function gx(e){const t=performance.now();return be(`[arrayBufferToImage] Converting buffer (${(e.byteLength/1024).toFixed(1)}KB)...`),new Promise((n,r)=>{const i=new Blob([e]),a=new Image,o=URL.createObjectURL(i);a.onload=()=>{const s=performance.now()-t;le(`[arrayBufferToImage] Image loaded: ${s.toFixed(2)}ms (${a.naturalWidth}x${a.naturalHeight})`),URL.revokeObjectURL(o),n(a)},a.onerror=s=>{const l=performance.now()-t;Ln(`[arrayBufferToImage] Image load failed: ${l.toFixed(2)}ms`,s),URL.revokeObjectURL(o),r(s)},a.src=o})}function yh(e,t="image/png"){const n=performance.now();return be(`[canvasToBlob] Converting ${e.width}x${e.height} canvas to ${t}...`),new Promise((r,i)=>{e.toBlob(a=>{const o=performance.now()-n;a?(le(`[canvasToBlob] Conversion complete: ${o.toFixed(2)}ms (${(a.size/1024).toFixed(1)}KB)`),r(a)):(Ln(`[canvasToBlob] Conversion failed: ${o.toFixed(2)}ms`),i(new Error("Failed to convert canvas to blob")))},t)})}function bx(e,t,n="input.1"){const r=performance.now(),i=document.createElement("canvas");i.width=t.size[0],i.height=t.size[1];const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for temp canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(e,0,0,t.size[0],t.size[1]);const o=performance.now(),l=a.getImageData(0,0,t.size[0],t.size[1]).data,u=t.size[0],c=t.size[1];let p=0;for(let v=0;v<l.length;v+=4){const C=l[v]/255,T=l[v+1]/255,I=l[v+2]/255;p=Math.max(p,C,T,I)}const m=Math.max(p,1e-6),b=performance.now(),f=new Float32Array(3*c*u);for(let v=0;v<c;v++)for(let C=0;C<u;C++){const T=(v*u+C)*4,I=l[T]/255,M=l[T+1]/255,A=l[T+2]/255,$=I/m,O=M/m,L=A/m,H=($-t.mean[0])/t.std[0],K=(O-t.mean[1])/t.std[1],X=(L-t.mean[2])/t.std[2];f[v*u+C]=H,f[c*u+v*u+C]=K,f[2*c*u+v*u+C]=X}const _=performance.now(),S=new gt("float32",f,[1,3,c,u]),x=performance.now();return le(`[normalizeImage] Performance:
    - Resize: ${(o-r).toFixed(2)}ms
    - Max find: ${(b-o).toFixed(2)}ms
    - Normalize: ${(_-b).toFixed(2)}ms
    - Tensor: ${(x-_).toFixed(2)}ms
    - Total: ${(x-r).toFixed(2)}ms
    - Max value: ${p.toFixed(6)}, Divisor: ${m.toFixed(6)}`),{[n]:S}}function yx(e,t=[1,1,320,320]){const[,,n,r]=t,i=performance.now(),a=e.slice(0,n*r);e.length!==n*r&&Fe("[normalizeMask] Mask length does not match output shape",{maskLength:e.length,outputShape:`${n}x${r}=${n*r}`});const o=performance.now()-i;le(`[processModelOutput] Data extraction: ${o.toFixed(2)}ms`);const s=performance.now();let l=a[0],u=a[0];for(let f=1;f<a.length;f++)a[f]<l&&(l=a[f]),a[f]>u&&(u=a[f]);const c=performance.now()-s;le(`[processModelOutput] Min/max calculation: ${c.toFixed(2)}ms (min=${l.toFixed(6)}, max=${u.toFixed(6)})`);const p=performance.now(),m=new Float32Array(a.length);for(let f=0;f<a.length;f++)m[f]=(a[f]-l)/(u-l);const b=performance.now()-p;return le(`[processModelOutput] Normalization: ${b.toFixed(2)}ms`),m}function wx(e,{width:t,height:n}){const r=performance.now(),i=document.createElement("canvas");i.width=t,i.height=n;const a=i.getContext("2d");if(!a)throw new Error("Failed to get context for mask canvas");a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const o=a.createImageData(t,n);for(let l=0;l<e.length;l++){const u=Math.round(e[l]*255),c=l*4;o.data[c]=u,o.data[c+1]=u,o.data[c+2]=u,o.data[c+3]=255}a.putImageData(o,0,0);const s=performance.now()-r;return le(`[processModelOutput] Canvas creation: ${s.toFixed(2)}ms`),i}function _x(e,t){const n=performance.now(),{width:r,height:i}=e,a=document.createElement("canvas");a.width=t.width,a.height=t.height;const o=a.getContext("2d");if(!o)throw new Error("Failed to get context for resized canvas");o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(e,0,0,t.width,t.height);const s=performance.now()-n;return le(`[processModelOutput] Resize: ${s.toFixed(2)}ms (${r}x${i} → ${t.width}x${t.height})`),a}function W0(e,t,n=[1,1,320,320]){const r=performance.now();be(`[processModelOutput] Processing output (${e.length} values) for ${t.width}x${t.height} image...`);const i=yx(e,n),[,,a,o]=n,s=wx(i,{width:o,height:a}),l=_x(s,t),u=performance.now()-r;return le(`[processModelOutput] Total processing: ${u.toFixed(2)}ms`),l}function xx(e,t){const n=performance.now();be(`[naiveCutout] Creating cutout for ${e.width}x${e.height} image...`);const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d");if(!i)throw new Error("Failed to get context for result canvas");const a=performance.now();i.drawImage(e,0,0);const o=performance.now()-a;le(`[naiveCutout] Image draw: ${o.toFixed(2)}ms`);const s=performance.now(),l=i.getImageData(0,0,r.width,r.height),u=t.getContext("2d");if(!u)throw new Error("Failed to get context for mask canvas");const c=u.getImageData(0,0,t.width,t.height),p=performance.now()-s;le(`[naiveCutout] Data extraction: ${p.toFixed(2)}ms`);const m=performance.now();for(let x=0;x<l.data.length;x+=4){const v=x,C=c.data[v];l.data[x+3]=C}const b=performance.now()-m;le(`[naiveCutout] Mask application: ${b.toFixed(2)}ms`);const f=performance.now();i.putImageData(l,0,0);const _=performance.now()-f;le(`[naiveCutout] Put image data: ${_.toFixed(2)}ms`);const S=performance.now()-n;return le(`[naiveCutout] Total cutout creation: ${S.toFixed(2)}ms`),r}function vx(e,t){const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");if(!r)throw new Error("Failed to get context for result canvas");return r.fillStyle=`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]/255})`,r.fillRect(0,0,n.width,n.height),r.drawImage(e,0,0),n}function $x(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");return n.filter="blur(2px)",n.drawImage(e,0,0),n.filter="none",t}function Sx(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");if(!n)throw new Error("Failed to get context for result canvas");n.drawImage(e,0,0);const r=n.getImageData(0,0,t.width,t.height),i=r.data;for(let a=0;a<i.length;a+=4){const o=i[a];i[a]=o,i[a+1]=o,i[a+2]=o,i[a+3]=255}return n.putImageData(r,0,0),t}const kx={"u2net.onnx":"a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456","u2netp.onnx":"b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567","u2net_human_seg.onnx":"c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678","u2net_cloth_seg.onnx":"d4e5f6789012345678901234567890abcdef1234567890abcdef123456789","silueta.onnx":"75da6c8d2f8096ec743d071951be73b4a8bc7b3e51d9a6625d63644f90ffeedb"};async function Tx(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function Cx(e,t){try{const n=kx[e];if(!n)return console.warn(`No hash available for model: ${e}`),!0;const r=await Tx(t),i=r===n;return i||(console.error(`Model integrity check failed for ${e}`),console.error(`Expected: ${n}`),console.error(`Actual: ${r}`)),i}catch(n){return console.error(`Error verifying model integrity for ${e}:`,n),!1}}function Ex(e,t){const r=t.byteLength/(1024*1024),a={"u2net.onnx":{min:170,max:180},"u2netp.onnx":{min:4,max:5},"u2net_human_seg.onnx":{min:170,max:180},"u2net_cloth_seg.onnx":{min:170,max:180},"silueta.onnx":{min:40,max:50}}[e];if(!a)return console.warn(`No size validation available for model: ${e}`),!0;const o=r>=a.min&&r<=a.max;return o||(console.error(`Model size validation failed for ${e}`),console.error(`Expected: ${a.min}-${a.max}MB, got: ${r.toFixed(2)}MB`)),o}async function wh(e,t){return!(!Ex(e,t)||!await Cx(e,t))}function q0(){try{return typeof navigator<"u"&&"gpu"in navigator&&typeof navigator.gpu=="object"&&navigator.gpu!==null}catch(e){return ms("WebGPU availability check failed:",e),!1}}function Ix(e){return e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Fe(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}function V0(){try{return typeof navigator<"u"&&"ml"in navigator&&typeof navigator.ml=="object"&&navigator.ml!==null}catch(e){return ms("WebNN availability check failed:",e),!1}}function zx(e={}){const t=performance.now();be("[getExecutionProviders] Determining execution providers...");const n=[];if(be("[getExecutionProviders] Input options:",{executionProviders:e.executionProviders,preferWebNN:e.preferWebNN,webnnDeviceType:e.webnnDeviceType,webnnPowerPreference:e.webnnPowerPreference,preferWebGPU:e.preferWebGPU,webgpuPowerPreference:e.webgpuPowerPreference}),e.executionProviders&&e.executionProviders.length>0){const m=performance.now()-t;return le(`[getExecutionProviders] Using explicit providers: ${m.toFixed(2)}ms`),be(`[getExecutionProviders] Using explicit execution providers: ${e.executionProviders.join(", ")}`),[...e.executionProviders]}const r=performance.now(),i=e.preferWebNN??!1,a=V0(),o=performance.now()-r;le(`[getExecutionProviders] WebNN preference check: ${o.toFixed(2)}ms`),be(`[getExecutionProviders] WebNN status: preferWebNN=${i}, available=${a}`),i&&a?(n.push("webnn"),be("[getExecutionProviders] WebNN execution provider added to preference list")):i&&!a&&Fe("[getExecutionProviders] WebNN was preferred but is not available in this browser");const s=performance.now(),l=e.preferWebGPU??!1,u=q0(),c=performance.now()-s;le(`[getExecutionProviders] WebGPU preference check: ${c.toFixed(2)}ms`),be(`[getExecutionProviders] WebGPU status: preferWebGPU=${l}, available=${u}`),l&&u?(n.push("webgpu"),be("[getExecutionProviders] WebGPU execution provider added to preference list")):l&&!u&&Fe("[getExecutionProviders] WebGPU was preferred but is not available in this browser"),n.push("webgl","cpu");const p=performance.now()-t;return le(`[getExecutionProviders] Provider selection complete: ${p.toFixed(2)}ms (${n.join(", ")})`),n}function Mx(e){return e!=null&&e.webnnDeviceType&&!["cpu","gpu","npu"].includes(e.webnnDeviceType)?(Fe(`Invalid WebNN device type: ${e.webnnDeviceType}`),!1):e!=null&&e.webnnPowerPreference&&!["default","low-power","high-performance"].includes(e.webnnPowerPreference)?(Fe(`Invalid WebNN power preference: ${e.webnnPowerPreference}`),!1):e!=null&&e.webgpuPowerPreference&&!["default","low-power","high-performance"].includes(e.webgpuPowerPreference)?(Fe(`Invalid WebGPU power preference: ${e.webgpuPowerPreference}`),!1):!0}const jt={simd:!0,proxy:!1,numThreads:4};function H0(e=jt){Se.wasm.simd=e.simd??jt.simd,Se.wasm.proxy=e.proxy??jt.proxy,Se.wasm.numThreads=e.numThreads??jt.numThreads}H0();class Oe{constructor(t,n={}){Pe(this,"modelName");Pe(this,"session",null);Pe(this,"modelData",null);Pe(this,"options");this.modelName=t,this.options={...jt,...n},this.options.simd=this.options.simd??jt.simd,this.options.proxy=this.options.proxy??jt.proxy,this.options.numThreads=this.options.numThreads??jt.numThreads,H0(this.options)}emitProgress(t,n,r){this.options.onProgress&&this.options.onProgress({step:t,progress:n,message:r})}async initialize(){if(be(`[${this.modelName}] Starting session initialization...`),this.emitProgress("initializing",0,"Starting session initialization..."),this.session){be(`[${this.modelName}] Session already initialized, skipping`),this.emitProgress("initializing",100,"Session already initialized, skipping");return}this.emitProgress("initializing",20,"Validating configuration..."),await this.validateConfiguration(),this.emitProgress("initializing",50,"Downloading model..."),this.modelData=await this.downloadModel(),this.emitProgress("initializing",60,"Setting up execution providers...");const t=await this.setupExecutionProviders();this.emitProgress("initializing",80,"Creating session..."),await this.createSession(t),this.emitProgress("initializing",100,"Session initialized successfully")}async validateConfiguration(){Mx(this.options)||Fe("Invalid WebNN configuration, falling back to default providers"),Ix(this.options)||Fe("Invalid WebGPU configuration, falling back to default providers")}async setupExecutionProviders(){const t=zx(this.options);if(this.options.preferWebNN){const n=V0();be(`WebNN requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}if(this.options.preferWebGPU){const n=q0();be(`WebGPU requested: ${n?"Available":"Not Available"}`),n&&be(`Using execution providers: ${t.join(", ")}`)}return t}async createSession(t){let n=!1,r=null;if(!this.modelData)throw new Error("Model data not found");for(const i of t)try{be(`[${this.modelName}] Attempting to create session with provider: ${i}`),this.session=await Wo.create(this.modelData,{executionProviders:[i],enableProfiling:Me.isONNXProfilingEnabled()}),le(`[${this.modelName}] Successfully created session with provider: ${i}`),Me.isONNXProfilingEnabled()&&be(`[${this.modelName}] ONNX profiling enabled - data will be logged after each inference`),n=!0;break}catch(a){Fe(`[${this.modelName}] Failed to create session with provider '${i}':`,a),r=a;continue}if(!n)throw new Error(`Failed to create ONNX session with any provider. Last error: ${(r==null?void 0:r.message)||"Unknown error"}`)}async downloadModel(){var n;if(be(`[${this.modelName}] Starting model download...`),this.options.bypassModelCache)be(`[${this.modelName}] Model cache bypassed, forcing fresh download`);else try{this.emitProgress("downloading",10,"Checking cache...");const r=await this.getCachedModel();if(r)return be(`[${this.modelName}] Using cached model: ${this.modelName}`),this.emitProgress("downloading",100,"Using cached model"),r}catch(r){Fe(`[${this.modelName}] IndexedDB cache unavailable, falling back to direct download:`,r)}be(`[${this.modelName}] Downloading model: ${this.modelName}`);const t=this.getModelUrl();this.emitProgress("downloading",20,"Starting download...");try{const r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const i=r.headers.get("content-length"),a=i?parseInt(i,10):0;if(be(`[${this.modelName}] Model size: ${(a/(1024*1024)).toFixed(2)}MB`),a>0){this.emitProgress("downloading",30,"Downloading model...");const l=(n=r.body)==null?void 0:n.getReader();if(l){const u=[];let c=0,p=!1;for(;!p;){const _=await l.read();if(p=_.done,p||!_.value)break;const S=_.value;u.push(S),c+=S.length;const x=30+Math.round(c/a*60);this.emitProgress("downloading",x,`Downloading model... ${Math.round(c/a*100)}%`)}const m=new Uint8Array(c);let b=0;for(const _ of u)m.set(_,b),b+=_.length;if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await wh(this.modelName,m.buffer))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(m.buffer)}catch(_){Fe(`[${this.modelName}] Failed to cache model, but download succeeded:`,_)}return this.emitProgress("downloading",100,"Model ready"),m.buffer}}this.emitProgress("downloading",50,"Downloading model...");const o=await r.arrayBuffer();if(this.emitProgress("downloading",90,"Download complete"),this.emitProgress("downloading",95,"Validating model..."),!await wh(this.modelName,o))throw new Error(`Model integrity validation failed for ${this.modelName}`);try{await this.cacheModel(o)}catch(l){Fe(`[${this.modelName}] Failed to cache model, but download succeeded:`,l)}return this.emitProgress("downloading",100,"Model ready"),o}catch(r){throw Ln(`[${this.modelName}] Model download failed:`,r),new Error(`Failed to download model ${this.modelName}: ${r}`)}}async getCachedModel(){return new Promise((t,n)=>{const r=indexedDB.open("rembg-models",2);r.onerror=()=>n(r.error),r.onsuccess=()=>{const s=r.result.transaction(["models"],"readonly").objectStore("models").get(this.modelName);s.onsuccess=()=>{const l=s.result;if(!l){t(null);return}const u=this.getModelVersion(),c=l.version||"1.0.0";if(c!==u){ms(`Model version mismatch for ${this.modelName}: cached=${c}, current=${u}`),t(null);return}t(l.data||null)},s.onerror=()=>n(s.error)},r.onupgradeneeded=()=>{const i=r.result;i.objectStoreNames.contains("models")||i.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}async cacheModel(t){return new Promise((n,r)=>{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").put({name:this.modelName,data:t,timestamp:Date.now(),version:this.getModelVersion()});l.onsuccess=()=>n(),l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}})}getModelUrl(){const t=Me.getCustomModelPath(this.modelName);return t&&t!==""?(be(`Using custom model path for ${this.modelName}: ${t}`),t):this.getDefaultModelUrl()}getModelVersion(){return"1.0.0"}prepareInput(t){return bx(t,this.getNormalizationParams(),this.getInputName())}async runInference(t){if(!this.session)throw new Error("Session not initialized");const n=await this.session.run(t);if(Me.isONNXProfilingEnabled())try{this.session.endProfiling(),be(`[${this.modelName}] ONNX profiling data outputted to console`)}catch(r){Fe(`[${this.modelName}] Failed to collect profiling data:`,r)}return n}async predict(t){if(be(`[${this.modelName}] Starting prediction for ${t.width}x${t.height} image...`),this.session||await this.initialize(),!this.session)throw new Error("Session not initialized");const n=this.prepareInput(t),r=await this.runInference(n),i=this.outputToMaskArray(r);return be(`[${this.modelName}] Predicted ${i.length} masks`),i.map(a=>this.maskArrayToMaskCanvas(a,{width:t.width,height:t.height}))}outputToMaskArray(t){return[t[Object.keys(t)[0]].data]}maskArrayToMaskCanvas(t,n){return W0(t,n,this.getOutputShape())}static getName(){throw new Error("getName() must be implemented by subclass")}getName(){return this.modelName}getOptions(){return{...this.options}}async dispose(){this.session&&(await this.session.release(),this.session=null),this.modelData=null}static async clearCache(){return new Promise((t,n)=>{try{const r=indexedDB.deleteDatabase("rembg-models");r.onsuccess=()=>{be("Model cache cleared successfully"),t()},r.onerror=()=>{Fe("Failed to clear model cache:",r.error),n(r.error)}}catch(r){Fe("IndexedDB not available for cache clearing:",r),n(r)}})}static async clearModelCache(t){return new Promise((n,r)=>{try{const i=indexedDB.open("rembg-models",2);i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result.transaction(["models"],"readwrite").objectStore("models").delete(t);l.onsuccess=()=>{be(`Model cache cleared for ${t}`),n()},l.onerror=()=>r(l.error)},i.onupgradeneeded=()=>{const a=i.result;a.objectStoreNames.contains("models")||a.createObjectStore("models",{keyPath:"name"}).createIndex("version","version",{unique:!1})}}catch(i){Fe("IndexedDB not available for cache clearing:",i),r(i)}})}}ot([Bt()],Oe.prototype,"initialize",null);ot([Bt()],Oe.prototype,"validateConfiguration",null);ot([Bt()],Oe.prototype,"setupExecutionProviders",null);ot([Bt()],Oe.prototype,"createSession",null);ot([Bt()],Oe.prototype,"downloadModel",null);ot([Bt()],Oe.prototype,"getCachedModel",null);ot([Bt()],Oe.prototype,"cacheModel",null);ot([gs()],Oe.prototype,"prepareInput",null);ot([Bt()],Oe.prototype,"runInference",null);ot([Bt()],Oe.prototype,"predict",null);ot([gs()],Oe.prototype,"outputToMaskArray",null);ot([gs()],Oe.prototype,"maskArrayToMaskCanvas",null);class Ax extends Oe{constructor(t){super("u2net",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net"}}class Nx extends Oe{constructor(t){super("u2netp",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2netp.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2netp"}}class Px extends Oe{constructor(t){super("u2net_human_seg",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_human_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"u2net_human_seg"}}class Rx extends Oe{constructor(n){super("u2net_cloth_seg",n);Pe(this,"clothCategory","combined")}setClothCategory(n){this.clothCategory=n}getClothCategory(){return this.clothCategory}getDefaultModelUrl(){return`${Me.getBaseUrl()}/u2net_cloth_seg.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[768,768]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,3,768,768]}outputToMaskArray(n){const r=n[Object.keys(n)[0]],i=r.data,[,a,o,s]=r.dims,l=this.logSoftmax(i,a,o*s),u=this.argmax(l,a,o*s),c=[];for(let p=1;p<=3;p++){const m=new Float32Array(o*s);for(let b=0;b<u.length;b++)m[b]=u[b]===p?255.5:0;c.push(m)}return c}maskArrayToMaskCanvas(n,r){return W0(n,r,this.getOutputShape())}logSoftmax(n,r,i){const a=new Float32Array(n.length);for(let o=0;o<i;o++){let s=n[o];for(let c=1;c<r;c++)s=Math.max(s,n[c*i+o]);let l=0;for(let c=0;c<r;c++)l+=Math.exp(n[c*i+o]-s);const u=Math.log(l)+s;for(let c=0;c<r;c++)a[c*i+o]=n[c*i+o]-u}return a}argmax(n,r,i){const a=new Uint8Array(i);for(let o=0;o<i;o++){let s=n[o],l=0;for(let u=1;u<r;u++){const c=n[u*i+o];c>s&&(s=c,l=u)}a[o]=l}return a}static getName(){return"u2net_cloth_seg"}}class Ox extends Oe{constructor(t){super("isnet-general-use",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-general-use.onnx`}getNormalizationParams(){return{mean:[.5,.5,.5],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-general-use"}}class Bx extends Oe{constructor(t){super("isnet-anime",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/isnet-anime.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[1,1,1],size:[1024,1024]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,1024,1024]}static getName(){return"isnet-anime"}}class Dx extends Oe{constructor(t){super("silueta",t)}getDefaultModelUrl(){return`${Me.getBaseUrl()}/silueta.onnx`}getNormalizationParams(){return{mean:[.485,.456,.406],std:[.229,.224,.225],size:[320,320]}}getInputName(){return this.session?this.session.inputNames[0]:"input_image"}getOutputShape(){return[1,1,320,320]}static getName(){return"silueta"}}const Rt=new Map;Rt.set("u2net",Ax);Rt.set("u2netp",Nx);Rt.set("u2net_human_seg",Px);Rt.set("u2net_cloth_seg",Rx);Rt.set("isnet-general-use",Ox);Rt.set("isnet-anime",Bx);Rt.set("silueta",Dx);const hn=new Map,Kt=[],Lx={maxSessions:5};function Ux(e,t){var a,o;const n=[];e.preferWebNN!==t.preferWebNN&&n.push(`preferWebNN: ${e.preferWebNN} vs ${t.preferWebNN}`),e.webnnDeviceType!==t.webnnDeviceType&&n.push(`webnnDeviceType: ${e.webnnDeviceType} vs ${t.webnnDeviceType}`),e.webnnPowerPreference!==t.webnnPowerPreference&&n.push(`webnnPowerPreference: ${e.webnnPowerPreference} vs ${t.webnnPowerPreference}`),e.preferWebGPU!==t.preferWebGPU&&n.push(`preferWebGPU: ${e.preferWebGPU} vs ${t.preferWebGPU}`),e.webgpuPowerPreference!==t.webgpuPowerPreference&&n.push(`webgpuPowerPreference: ${e.webgpuPowerPreference} vs ${t.webgpuPowerPreference}`),e.simd!==t.simd&&n.push(`simd: ${e.simd} vs ${t.simd}`),e.proxy!==t.proxy&&n.push(`proxy: ${e.proxy} vs ${t.proxy}`),e.numThreads!==t.numThreads&&n.push(`numThreads: ${e.numThreads} vs ${t.numThreads}`);const r=JSON.stringify((a=e.executionProviders)==null?void 0:a.sort()),i=JSON.stringify((o=t.executionProviders)==null?void 0:o.sort());return r!==i&&n.push(`executionProviders: ${r} vs ${i}`),n.length>0?(be(`[areSessionOptionsEqual] Settings mismatch detected: ${n.join(", ")}`),!1):!0}function _h(e){const t=Kt.indexOf(e);t>-1&&Kt.splice(t,1),Kt.push(e)}async function Fx(){if(Kt.length===0)return;const e=Kt[0],t=hn.get(e);t&&(await t.dispose(),hn.delete(e),Kt.shift())}async function Wx(){for(;hn.size>=Lx.maxSessions;)await Fx()}async function G0(e="u2net",t,n){const r=performance.now();be(`[newSession] Creating session for model: ${e}`);const i=performance.now(),a={...n,preferWebNN:Me.isWebNNEnabled(),webnnDeviceType:Me.getWebNNDeviceType(),webnnPowerPreference:Me.getWebNNPowerPreference(),preferWebGPU:Me.isWebGPUEnabled(),webgpuPowerPreference:Me.getWebGPUPowerPreference(),bypassSessionCache:Me.isSessionCacheBypassEnabled(),bypassModelCache:Me.isModelCacheBypassEnabled()},o=performance.now()-i;if(le(`[newSession] Options merge: ${o.toFixed(2)}ms`),e==="u2net_custom")throw new Error("u2net_custom requires modelPath in config");const s=performance.now(),l=Rt.get(e),u=performance.now()-s;if(le(`[newSession] Registry lookup: ${u.toFixed(2)}ms`),!l){const v=Array.from(Rt.keys()).join(", ");throw new Error(`No session class found for model '${e}'. Available models: ${v}`)}const c=performance.now();if(!a.bypassSessionCache&&hn.has(e)){const v=hn.get(e),C=v.getOptions();if(Ux(a,C)){_h(e);const T=performance.now()-c,I=performance.now()-r;return le(`[newSession] Cache hit for ${e}: ${T.toFixed(2)}ms (total: ${I.toFixed(2)}ms)`),v}else{be(`[newSession] Settings mismatch for ${e}, evicting cached session`),await v.dispose(),hn.delete(e);const T=Kt.indexOf(e);T>-1&&Kt.splice(T,1)}}else a.bypassSessionCache&&be(`[newSession] Session cache bypassed for ${e}`);const p=performance.now()-c;le(`[newSession] Cache miss for ${e}: ${p.toFixed(2)}ms`);const m=performance.now(),b=new l(a),f=performance.now()-m;le(`[newSession] Session creation: ${f.toFixed(2)}ms`);const _=performance.now();hn.set(e,b),_h(e);const S=performance.now()-_;le(`[newSession] Session caching: ${S.toFixed(2)}ms`),Wx().catch(console.warn);const x=performance.now()-r;return le(`[newSession] Total session creation: ${x.toFixed(2)}ms`),b}async function qx(e,t={}){const n=performance.now();be("[remove] Starting background removal process...");const r=(i,a,o)=>{t.onProgress&&t.onProgress({step:i,progress:a,message:o})};try{r("downloading",0,"Initializing...");const i=performance.now();let a;if(e instanceof HTMLCanvasElement)a=e,r("downloading",20,"Input ready"),be("[remove] Input is already a canvas");else if(e instanceof HTMLImageElement){const I=performance.now();a=Ka(e);const M=performance.now()-I;le(`[remove] Image to canvas conversion: ${M.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof File||e instanceof Blob){r("downloading",10,"Loading image...");const I=performance.now(),M=await mx(e),A=performance.now()-I;le(`[remove] File to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=Ka(M);const O=performance.now()-$;le(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else if(e instanceof ArrayBuffer){r("downloading",10,"Loading image...");const I=performance.now(),M=await gx(e),A=performance.now()-I;le(`[remove] ArrayBuffer to image conversion: ${A.toFixed(2)}ms`);const $=performance.now();a=Ka(M);const O=performance.now()-$;le(`[remove] Image to canvas conversion: ${O.toFixed(2)}ms`),r("downloading",20,"Input ready")}else throw new Error("Unsupported input type. Supported types: File, Blob, ArrayBuffer, HTMLImageElement, HTMLCanvasElement");const o=performance.now()-i;le(`[remove] Total input processing: ${o.toFixed(2)}ms (${a.width}x${a.height})`);const s=performance.now();r("downloading",30,"Preparing model...");const l=t.session||await G0("u2net"),u=performance.now()-s;le(`[remove] Session creation: ${u.toFixed(2)}ms`);const c=performance.now();r("processing",40,"Running AI model...");const p=await l.predict(a),m=performance.now()-c;if(le(`[remove] Model prediction: ${m.toFixed(2)}ms`),p.length===0)throw new Error("No masks generated from model");r("processing",70,"Processing mask...");let b=p[0];if(t.postProcessMask){const I=performance.now();r("postprocessing",80,"Applying post-processing..."),b=$x(b);const M=performance.now()-I;le(`[remove] Post-processing: ${M.toFixed(2)}ms`)}if(t.onlyMask){const I=performance.now();r("postprocessing",90,"Creating mask output...");const M=Sx(b),A=performance.now()-I;le(`[remove] Mask-only creation: ${A.toFixed(2)}ms`);const $=performance.now(),O=await yh(M,"image/png"),L=performance.now()-$;le(`[remove] Canvas to blob conversion: ${L.toFixed(2)}ms`),r("complete",100,"Complete");const H=performance.now()-n;return le(`[remove] Total processing time (mask-only): ${H.toFixed(2)}ms`),O}const f=performance.now();r("postprocessing",85,"Creating cutout...");let _=xx(a,b);const S=performance.now()-f;if(le(`[remove] Cutout creation: ${S.toFixed(2)}ms`),t.bgcolor){const I=performance.now();r("postprocessing",90,"Applying background color..."),_=vx(_,t.bgcolor);const M=performance.now()-I;le(`[remove] Background color application: ${M.toFixed(2)}ms`)}const x=performance.now();r("postprocessing",95,"Finalizing output...");const v=await yh(_,"image/png"),C=performance.now()-x;le(`[remove] Final canvas to blob conversion: ${C.toFixed(2)}ms`),r("complete",100,"Complete");const T=performance.now()-n;return le(`[remove] Total processing time: ${T.toFixed(2)}ms`),v}catch(i){const a=performance.now()-n;throw console.error(`[remove] Processing failed (${a.toFixed(2)}ms):`,i),t.onProgress&&t.onProgress({step:"complete",progress:0,message:`Error: ${i instanceof Error?i.message:"Unknown error"}`}),i}}let Xa=null,xh=!1,At=null,Vx=0;const ur=new Map;function Pt(e=80){return new Promise(t=>{if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(()=>t(),{timeout:e});return}requestAnimationFrame(()=>t())})}function vh(e,t){if(!e.length)return 0;const n=Math.min(e.length-1,Math.max(0,Math.round((e.length-1)*t)));return e[n]}function Ya(e){const t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function Hx(e,t,n){const r=Ya(e),i=Ya(t),a=Ya(n);let o=(r*.4124564+i*.3575761+a*.1804375)/.95047,s=r*.2126729+i*.7151522+a*.072175,l=(r*.0193339+i*.119192+a*.9503041)/1.08883;const u=c=>c>.008856?Math.cbrt(c):7.787*c+16/116;return o=u(o),s=u(s),l=u(l),{l:oe((116*s-16)/100),a:500*(o-s)/127,b:200*(s-l)/127}}async function Gx(e,t=640){var l;const n=await createImageBitmap(e),r=Math.min(1,t/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*r)),a=Math.max(1,Math.round(n.height*r)),o=document.createElement("canvas");o.width=i,o.height=a;const s=o.getContext("2d",{willReadFrequently:!0});return s.fillStyle="#000",s.fillRect(0,0,i,a),s.drawImage(n,0,0,i,a),(l=n.close)==null||l.call(n),s.getImageData(0,0,i,a)}function jx(e,t=768){const n=e.naturalWidth||e.width,r=e.naturalHeight||e.height,i=Math.min(1,t/Math.max(n,r)),a=Math.max(1,Math.round(n*i)),o=Math.max(1,Math.round(r*i)),s=document.createElement("canvas");s.width=a,s.height=o;const l=s.getContext("2d",{willReadFrequently:!0});return l.fillStyle="#000",l.fillRect(0,0,a,o),l.drawImage(e,0,0,a,o),l.getImageData(0,0,a,o)}function Kx(){return At||(At=new Worker(new URL("/assets/fingerprint-worker-C74g51lu.js",import.meta.url),{type:"classic"}),At.onmessage=e=>{const{id:t,ok:n,raw:r,error:i}=e.data||{},a=ur.get(t);a&&(ur.delete(t),n?a.resolve(r):a.reject(new Error(i||"Worker fingerprint failed")))},At.onerror=e=>{for(const[,t]of ur)t.reject(new Error(e.message||"Worker fingerprint failed"));ur.clear(),At==null||At.terminate(),At=null}),At}function Xx(e,t){const n=Kx(),r=++Vx,i=new Uint8Array(e.data),a=new Uint8Array(t);return new Promise((o,s)=>{ur.set(r,{resolve:o,reject:s}),n.postMessage({id:r,payload:{rgba:i.buffer,mask:a.buffer,width:e.width,height:e.height,contourPoints:g.contourPoints||256,runtime:{pyodideIndex:nf,pyodideScript:F_,pythonCode:W_}}},[i.buffer,a.buffer])})}function Yx(){if(xh)return;const e=new URL("public/ort/",document.baseURI);Se.wasm.numThreads=1,Se.wasm.proxy=!0,Se.wasm.wasmPaths={mjs:new URL("ort-wasm-simd-threaded.jsep.mjs",e).toString(),wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",e).toString()},Me.setBaseUrl(new URL("public/models",document.baseURI).toString()),Me.setModelCacheBypass(!0),xh=!0}function Zx(){return Yx(),Xa||(Xa=G0("u2netp")),Xa}function Qx(e,t,n){const r=atob(e||""),i=new Uint8Array(t*n);for(let a=0;a<Math.min(r.length,i.length);a+=1)i[a]=r.charCodeAt(a);return i}function j0(e,t,n){let r=t,i=n,a=-1,o=-1;for(let s=0;s<e.length;s+=1){if(!e[s])continue;const l=s%t,u=Math.floor(s/t);r=Math.min(r,l),i=Math.min(i,u),a=Math.max(a,l),o=Math.max(o,u)}return a<r?[0,0,t-1,n-1]:[r,i,a,o]}function Jx(e){return new Promise(t=>{e.toBlob(n=>{if(!n){t(e.toDataURL("image/png"));return}const r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>t(e.toDataURL("image/png")),r.readAsDataURL(n)},"image/png")})}async function e2(e,t,n=null){const r=document.createElement("canvas");r.width=e.width,r.height=e.height;const i=r.getContext("2d"),a=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);for(let I=0;I<t.length;I+=1)a.data[I*4+3]=t[I]?a.data[I*4+3]:0,(I&131071)===131071&&await Pt(16);i.putImageData(a,0,0);const[o,s,l,u]=n||j0(t,e.width,e.height),c=Math.max(1,l-o+1),p=Math.max(1,u-s+1),m=Math.max(8,Math.round(Math.max(c,p)*.08)),b=Math.max(0,o-m),f=Math.max(0,s-m),_=Math.min(e.width,l+m+1),S=Math.min(e.height,u+m+1),x=Math.max(1,_-b),v=Math.max(1,S-f),C=Math.max(x,v),T=document.createElement("canvas");return T.width=C,T.height=C,T.getContext("2d").drawImage(r,b,f,x,v,(C-x)/2,(C-v)/2,x,v),Jx(T)}async function t2(e){var u;E.statusLine.textContent="Removing background",await Pt();const t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").putImageData(e,0,0);const n=await Zx();await Pt();const r=await qx(t,{onlyMask:!0,postProcessMask:!0,session:n});await Pt();const i=await createImageBitmap(r),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(i,0,0,e.width,e.height),(u=i.close)==null||u.call(i);const s=o.getImageData(0,0,e.width,e.height).data,l=new Uint8Array(e.width*e.height);for(let c=0;c<l.length;c+=1)l[c]=s[c*4]>16?1:0,(c&131071)===131071&&await Pt(16);return l}async function K0(e){const t=await t2(e);E.statusLine.textContent="Fingerprinting shell",await Pt();const n=await Xx(e,t);await Pt();const r=JSON.parse(n),i=Qx(r.mask,e.width,e.height),a=r.bbox||j0(i,e.width,e.height);return{imageData:e,mask:i,contour:new Float32Array(r.contour||[]),fingerprint:new Float32Array(r.fingerprint||[]),maskPixels:Number(r.mask_pixels||0),bbox:a,imageUrl:await e2(e,i,a)}}async function n2(e){return E.statusLine.textContent="Cutting shell",await Pt(),K0(jx(e,768))}async function r2(e){return E.statusLine.textContent="Cutting shell",await Pt(),K0(await Gx(e,768))}const bs="shellspace:cutouts:v1:index",i2="shellspace:cutouts:v1:";let Za=!1,a2=0;const ft=[],Nn=new Map,o2=80;function ys(e){return`${i2}${encodeURIComponent(e)}`}function X0(){try{const e=JSON.parse(localStorage.getItem(bs)||"[]");return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch{return[]}}function s2(e){try{localStorage.setItem(bs,JSON.stringify([...new Set(e)]))}catch{}}function l2(){ft.length=0,Nn.clear();for(const e of X0())try{localStorage.removeItem(ys(e))}catch{}try{localStorage.removeItem(bs)}catch{}ti.clear(),yt.clear(),g.mapShellImageIds.clear()}function ws(e){if(!(e!=null&&e.file))return"";try{return localStorage.getItem(ys(e.file))||""}catch{return""}}function u2(e,t){if(!(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/"))))try{localStorage.setItem(ys(e.file),t),s2([...X0(),e.file]),e.id>=0&&g.mapShellImageIds.add(e.id)}catch{}}function d2(e,t){const n=()=>u2(e,t);if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(n,{timeout:5e3});return}window.setTimeout(n,2500)}function Y0(e){var t;["Loading Python","Loading numpy","Removing background","Cutting shell","Fingerprinting shell"].includes((t=E.statusLine)==null?void 0:t.textContent)&&(E.statusLine.textContent=e)}function c2(e=120){return new Promise(t=>{if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(()=>t(),{timeout:e});return}window.setTimeout(t,16)})}function Z0(){Za||(Za=!0,(async()=>{for(;ft.length;){ft.sort((t,n)=>n.priority-t.priority||t.id-n.id);const e=ft.shift();e.file&&Nn.delete(e.file),await c2();try{e.resolve(await e.task())}catch(t){E.statusLine&&(E.statusLine.textContent=t.message||"Python image cut failed"),e.resolve(null)}}Za=!1,ft.length&&Z0()})())}function p2(e,t,n,{priority:r=0}={}){const i=Nn.get(e);if(i)return r>i.priority&&(i.priority=r),!0;if(ft.length>=o2){if(r<=0)return!1;let s=-1,l=r;for(let c=0;c<ft.length;c+=1)ft[c].priority<l&&(l=ft[c].priority,s=c);if(s<0)return!1;const[u]=ft.splice(s,1);Nn.delete(u.file),ti.delete(u.file),u.resolve(null)}const a=J0(t),o=new Promise(s=>{const l={id:++a2,file:e,priority:r,task:n,resolve:s};ft.push(l),Nn.set(e,l),Z0()});return ti.set(e,o),a.promise=a.promise||o,!0}function zo(e,t){if(!(e!=null&&e.file)||!(t!=null&&t.startsWith("data:image/")))return;let n=yt.get(e.file);n||(n=Q0(),yt.set(e.file,n)),n.image.src=t,e.id>=0&&g.mapShellImageIds.add(e.id)}function Q0(){const e=new Image;e.decoding="async";const t={image:e,ready:!1,promise:null};return t.promise=new Promise(n=>{e.onload=()=>{t.ready=!0,n(e)},e.onerror=()=>n(null)}),t}function J0(e){let t=yt.get(e.file);return t||(t=Q0(),yt.set(e.file,t)),t}function $i(e,t={}){var n;return e!=null&&e.file?(n=yt.get(e.file))!=null&&n.ready?!0:ti.has(e.file)?(m2(e.file,t.priority),!0):p2(e.file,e,async()=>{const r=ws(e);if(r)return zo(e,r),{imageUrl:r};const i=await V_(e);if(!i)return null;const a=await n2(i);return a!=null&&a.imageUrl&&(zo(e,a.imageUrl),d2(e,a.imageUrl)),a},t):!1}function h2(e){return J0(e).promise.then(n=>n!=null&&n.src?{imageUrl:n.src}:null)}function f2(e,t,{timeout:n=3e4}={}){return new Promise(r=>{const i=performance.now(),a=()=>{if(!e.isConnected){r(!1);return}const o=Si(t);if(o!=null&&o.src){e.src=o.src,r(!0);return}if(performance.now()-i>n){r(!1);return}window.setTimeout(a,120)};a()})}function m2(e,t=0){const n=Nn.get(e);n&&t>n.priority&&(n.priority=t)}async function g2(e,t={}){return e!=null&&e.file?($i(e,t),h2(e).catch(n=>(E.statusLine&&(E.statusLine.textContent=n.message||"Python image cut failed"),null))):null}function eb(e,t=null,n={}){if(!(e!=null&&e.file))return null;let r=yt.get(e.file);return!r&&n.request!==!1&&($i(e,n),r=yt.get(e.file)),r?r.ready?r.image:(t&&r.promise.then(i=>{i&&t(i)}),null):null}function Si(e,t=null){const n=e!=null&&e.file?yt.get(e.file):null;return n?n.ready?n.image:(t&&n.promise.then(r=>{r&&t(r)}),null):null}function gr(e,t){if(!e||!(t!=null&&t.file))return!1;const n=yt.get(t.file);return n?n.ready?(e.src=n.image.src,e.hidden=!1,!0):(n.promise.then(r=>{r!=null&&r.src&&e.isConnected&&(e.src=r.src,e.hidden=!1)}),!0):!1}async function b2(e,t={}){const n=eb(e,null,{...t,request:!1});if(n)return n;const r=ws(e);if(r)return zo(e,r),Si(e);$i(e,t);const i=e!=null&&e.file?yt.get(e.file):null;return(i==null?void 0:i.promise)||null}async function tb(e,t,n={}){var o;if(!e||!t)return!1;const r=eb(t,null,{...n,request:!1});if(r)return e.src=r.src,!0;const i=((o=E.statusLine)==null?void 0:o.textContent)||"";if(!$i(t,n))return!1;const a=await f2(e,t,n);return Y0(i),a}function br(){var e;return Math.min(6,((e=g.model)==null?void 0:e.contour_visible_component_count)||0)}function _s(){return br()}function y2(){return g.pcValues}function Qa(e){var t;return(t=g.model.contour_pca_ranges)==null?void 0:t[e]}function nb(e){var n;return String(((n=g.pcaAxisNames)==null?void 0:n[e])||"").trim()||`PC${e+1}`}function di(e){var n;const t=String(((n=g.pcaAxisNames)==null?void 0:n[e])||"").trim();return t?`${t} (PC${e+1})`:`PC${e+1}`}function Et(e,t){var n;return((n=e.contour_pc)==null?void 0:n[t])||0}function ki(e=g.xAxis,t=g.yAxis){var s;const n=((s=g.model.contour_pca_ranges)==null?void 0:s[0])||{p01:-1,p99:1},r=Qa(e)||n,i=Qa(t)||Qa(1)||n,a=Math.max((r.p99-r.p01)*.08,.001),o=Math.max((i.p99-i.p01)*.08,.001);return{minX:r.p01-a,maxX:r.p99+a,minY:i.p01-o,maxY:i.p99+o}}function pr(e,t,n){const r=g.viewport;return{x:(e-r.minX)/(r.maxX-r.minX)*n.width,y:n.height-(t-r.minY)/(r.maxY-r.minY)*n.height}}function rb(e,t,n){const r=g.viewport;return{x:r.minX+e/n.width*(r.maxX-r.minX),y:r.minY+(n.height-t)/n.height*(r.maxY-r.minY)}}function ci(e,t=.78){let n=0;for(let r=0;r<e.length;r+=1)n=n*31+e.charCodeAt(r)>>>0;return`hsla(${n%360}, 42%, 42%, ${t})`}function $h(e,t=.78){let n=0;const r=String(e||"");for(let i=0;i<r.length;i+=1)n=n*31+r.charCodeAt(i)>>>0;return mt(n%360,.42,.42,t)}function ib(e,t=1){return[Math.round(oe(e.color_r_mean??.68)*255),Math.round(oe(e.color_g_mean??.64)*255),Math.round(oe(e.color_b_mean??.56)*255),Math.round(oe(t)*255)]}function xs(e){var t;return(e==null?void 0:e.live_conservation_status)||((t=e==null?void 0:e.species_traits)==null?void 0:t.protection_status)||"Not assessed"}function Ja(e){const t=String(e||"").trim().toLowerCase();return t&&!["unknown","not assessed","data deficient","locality unavailable"].includes(t)}function ln(e){if(e==null||String(e).trim()==="")return!1;const t=Number(e);return Number.isFinite(t)}function w2(e,t){var n;return t==="species"?!0:t==="locality"?Ja(e.location_key):t==="conservation"?Ja(xs(e)):t==="shell"?ln(e.color_r_mean)&&ln(e.color_g_mean)&&ln(e.color_b_mean):t==="pattern"?ln(e.color_pattern_strength):t==="lightness"?ln(e.color_l_mean):t==="roughness"?ln((n=e.morph_traits)==null?void 0:n.roughness):t==="rarity"?Ja(e.rarity_label):t==="concavity"?ln(e.contour_concavity):!1}function _2(){return tf.filter(e=>g.shells.some(t=>w2(t,e.key)))}function Sh(){var t;if(!E.colorModeSelect)return;const e=_2();E.colorModeSelect.innerHTML="";for(const n of e){const r=document.createElement("option");r.value=n.key,r.textContent=n.label,E.colorModeSelect.append(r)}e.some(n=>n.key===g.colorMode)||(g.colorMode=e.some(n=>n.key==="roughness")?"roughness":((t=e[0])==null?void 0:t.key)||"species"),E.colorModeSelect.value=g.colorMode,ab()}function In(e){return`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]/255})`}function zn(e,t){const n=document.createElement("span");n.className="color-legend-item";const r=document.createElement("span");r.className="color-legend-dot",r.style.background=t;const i=document.createElement("span");return i.textContent=e,n.append(r,i),n}function eo(e,t,n="Low",r="High"){const i=document.createElement("div");i.className="color-legend-gradient";const a=document.createElement("span");a.style.background=`linear-gradient(90deg, ${e}, ${t})`;const o=document.createElement("span");return o.className="color-legend-labels",o.innerHTML=`<span>${n}</span><span>${r}</span>`,i.append(a,o),i}function ab(){if(!E.colorLegend)return;const e=E.colorLegend;if(e.innerHTML="",e.hidden=!1,g.colorMode==="rarity"){e.append(zn("Common","rgba(52, 136, 96, 0.82)"),zn("Uncommon","rgba(222, 146, 54, 0.85)"),zn("Rare","rgba(199, 64, 44, 0.88)"));return}if(g.colorMode==="lightness"){e.append(eo(In(mt(48,.24,.24)),In(mt(48,.24,.78)),"Dark","Light"));return}if(g.colorMode==="roughness"){e.append(eo(In(mt(178,.58,.34)),In(mt(28,.58,.5)),"Smooth","Rough"));return}if(g.colorMode==="concavity"){e.append(eo(In(mt(320,.56,.35)),In(mt(135,.56,.46)),"Smooth","Indented"));return}if(g.colorMode==="conservation"){e.append(zn("Least","rgba(58, 139, 99, 0.75)"),zn("Near","rgba(228, 176, 62, 0.78)"),zn("Risk","rgba(200, 45, 38, 0.86)"));return}e.hidden=!0}function x2(e){const t=xs(e).toLowerCase();return t.includes("critically")?[126,24,28,230]:t.includes("endangered")?[200,45,38,220]:t.includes("vulnerable")?[232,123,54,210]:t.includes("near")?[228,176,62,200]:t.includes("least")?[58,139,99,190]:[102,111,117,112]}function v2(e){const t=String(e.rarity_label||"").toLowerCase();return t.includes("uncommon")?[222,146,54,218]:t.includes("common")?[52,136,96,208]:t.includes("rare")?[199,64,44,224]:[104,113,116,138]}function ob(e,t){var n;if(t==="locality")return e.location_key==="unknown"?[96,108,106,158]:$h(e.location_key||"unknown",.66);if(t==="conservation")return x2(e);if(t==="shell")return ib(e);if(t==="lightness"){const r=oe(e.color_l_mean??.5);return mt(48,.24,(24+r*54)/100)}if(t==="roughness"){const r=oe(((n=e.morph_traits)==null?void 0:n.roughness)??0);return mt(178-r*150,.58,(34+r*16)/100)}if(t==="rarity")return v2(e);if(t==="pattern"){const r=oe((e.color_pattern_strength||0)/.22);return mt(204-r*162,(34+r*36)/100,(30+r*18)/100)}if(t==="concavity"){const r=oe((e.contour_concavity||0)/.32);return mt(320-r*185,.56,(35+r*11)/100)}return $h(e.species,.78)}function $2(e){if(g.pointColorCache.has(e))return g.pointColorCache.get(e);const t=new Uint8ClampedArray(g.shells.length*4);for(const n of g.shells){if(n.id<0||n.id>=g.shells.length)continue;const r=ob(n,e),i=n.id*4;t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3]}return g.pointColorCache.set(e,t),t}function We(e=0){if(g.needsDraw=!0,g.scatterHitCache=null,e>0){window.clearTimeout(g.drawTimer),g.drawTimer=window.setTimeout(()=>We(),e);return}window.clearTimeout(g.drawTimer),g.drawTimer=0,!g.drawFrame&&(g.drawFrame=requestAnimationFrame(()=>{g.drawFrame=0,k2()}))}function S2(e){const t=E.scatter.width,n=E.scatter.height;if(!t||!n)return;const r=window.devicePixelRatio||1,i=fe.createImageData(t,n),a=i.data,o=$2(g.colorMode),s=Math.max(8,Math.round(r*4)),l=Math.floor(s/2);for(let u=0;u<e.shells.length;u+=1){const c=e.shells[u],p=Math.round(e.points[u*2]*r),m=Math.round(e.points[u*2+1]*r);if(p<-s||p>=t+s||m<-s||m>=n+s)continue;const b=c.id>=0&&c.id<g.shells.length?c.id*4:-1,f=b<0?ob(c,g.colorMode):null,_=b<0?f[0]:o[b],S=b<0?f[1]:o[b+1],x=b<0?f[2]:o[b+2],v=b<0?f[3]:o[b+3];for(let C=0;C<s;C+=1){const T=m+C-l;if(!(T<0||T>=n))for(let I=0;I<s;I+=1){const M=p+I-l;if(M<0||M>=t)continue;const A=(T*t+M)*4;a[A]=_,a[A+1]=S,a[A+2]=x,a[A+3]=v}}}fe.putImageData(i,0,0)}function kh(e,t){if(!e||e.id<0)return!1;const n=Si(e,()=>We());if(!n)return!1;const r=pr(Et(e,g.xAxis),Et(e,g.yAxis),t);if(r.x<-40||r.x>t.width+40||r.y<-40||r.y>t.height+40)return!0;const i=e===g.selected?52:42;return fe.save(),fe.drawImage(n,r.x-i/2,r.y-i/2,i,i),fe.restore(),!0}function k2(){const e=vn(E.scatter,fe);if(!g.viewport||!g.needsDraw)return;g.needsDraw=!1,fe.clearRect(0,0,e.width,e.height);const t=sb(e),n=new Set(t.shells);S2(t),fe.save(),fe.lineWidth=1,fe.strokeStyle="rgba(32, 36, 42, 0.25)";const r=pr(0,0,e);r.x>=0&&r.x<=e.width&&(fe.beginPath(),fe.moveTo(r.x,0),fe.lineTo(r.x,e.height),fe.stroke()),r.y>=0&&r.y<=e.height&&(fe.beginPath(),fe.moveTo(0,r.y),fe.lineTo(e.width,r.y),fe.stroke());const i=y2();if(i.length){const a=pr(i[g.xAxis]||0,i[g.yAxis]||0,e);fe.strokeStyle="#c65d4b",fe.lineWidth=2,fe.beginPath(),fe.moveTo(a.x-10,a.y),fe.lineTo(a.x+10,a.y),fe.moveTo(a.x,a.y-10),fe.lineTo(a.x,a.y+10),fe.stroke()}if(g.showPoppedShells)for(const a of g.mapShellImageIds){const o=g.shellById.get(a);o&&o!==g.selected&&n.has(o)&&kh(o,e)}if(g.selected&&n.has(g.selected)&&(!g.showPoppedShells||!kh(g.selected,e))){const a=pr(Et(g.selected,g.xAxis),Et(g.selected,g.yAxis),e);fe.fillStyle="#ffffff",fe.strokeStyle="#20242a",fe.lineWidth=2,fe.beginPath(),fe.arc(a.x,a.y,6,0,Math.PI*2),fe.fill(),fe.stroke()}fe.restore()}function T2(e){const t=g.viewport||{};return[g.xAxis,g.yAxis,e.width.toFixed(1),e.height.toFixed(1),Number(t.minX||0).toFixed(4),Number(t.maxX||0).toFixed(4),Number(t.minY||0).toFixed(4),Number(t.maxY||0).toFixed(4)].join("|")}function sb(e){var i;const t=T2(e);if(((i=g.scatterPointCache)==null?void 0:i.key)===t&&g.scatterPointCache.shells===g.filtered)return g.scatterPointCache;const n=g.filtered,r=new Float32Array(n.length*2);for(let a=0;a<n.length;a+=1){const o=pr(Et(n[a],g.xAxis),Et(n[a],g.yAxis),e);r[a*2]=o.x,r[a*2+1]=o.y}return g.scatterPointCache={key:t,shells:n,points:r},g.scatterHitCache=null,g.scatterPointCache}function lb(e){var s;const t=sb(e),n=t.key;if(((s=g.scatterHitCache)==null?void 0:s.key)===n&&g.scatterHitCache.shells===g.filtered)return g.scatterHitCache;const r=t.shells,i=t.points,a=24,o=new Map;for(let l=0;l<r.length;l+=1){const u=i[l*2],c=i[l*2+1];if(u<-a||u>e.width+a||c<-a||c>e.height+a)continue;const p=Math.floor(u/a),m=Math.floor(c/a),b=`${p},${m}`;let f=o.get(b);f||(f=[],o.set(b,f)),f.push(l)}return g.scatterHitCache={key:n,shells:r,points:i,grid:o,cellSize:a},g.scatterHitCache}function rr(e){return new URL(`public/${e}`,document.baseURI).toString()}function C2(e){return new URL(`dataset/${encodeURIComponent(e).replaceAll("%2F","/")}`,document.baseURI).toString()}function oe(e){return Math.max(0,Math.min(1,e))}function St(e,t=3){return Number(e||0).toLocaleString(void 0,{maximumFractionDigits:t})}function to(e){return`${St(oe(e)*100,1)}%`}function E2(e){return oe(((e==null?void 0:e.area)||0)/Math.max(1,((e==null?void 0:e.image_width)||0)*((e==null?void 0:e.image_height)||0)))}function ub(e){if(!e||e.length<8)return null;const t=Math.floor(e.length/2);let n=0,r=0;for(let l=0;l<t;l+=1)n+=Number(e[l*2]||0),r+=Number(e[l*2+1]||0);n/=t,r/=t;const i=[];for(let l=0;l<t;l+=1){const u=Number(e[l*2]||0)-n,c=Number(e[l*2+1]||0)-r,p=Math.hypot(u,c);Number.isFinite(p)&&p>1e-6&&i.push(p)}if(i.length<4)return null;const a=i.reduce((l,u)=>l+u,0)/i.length;if(a<=1e-6)return null;const o=Math.max(2,Math.round(i.length*.035));let s=0;for(let l=0;l<i.length;l+=1){let u=0,c=0;for(let p=-o;p<=o;p+=1)u+=i[(l+p+i.length)%i.length],c+=1;s+=Math.abs(i[l]-u/c)}return oe(s/i.length/a)}function vs(e){const t=Math.max(1,(e==null?void 0:e.image_width)||400),n=Math.max(1,(e==null?void 0:e.image_height)||300),r=Math.max(t,n),i=10;return{cmPerImageUnit:i/r,widthCm:t/r*i,heightCm:n/r*i,longSideCm:i}}function I2(e){const t=vs(e);return((e==null?void 0:e.area)||0)*t.cmPerImageUnit*t.cmPerImageUnit}function z2(e){return((e==null?void 0:e.mean_radius)||0)*vs(e).cmPerImageUnit}function Mo(e,t=!0){E.loadingText&&e&&(E.loadingText.textContent=e),E.loadingOverlay&&(E.loadingOverlay.hidden=!t)}function $s(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function M2(e){if(e!=null&&e.fingerprint_hash)return e.fingerprint_hash;const t=(e.contour_pc||[]).slice(0,6).map(r=>Number(r||0).toFixed(4)),n=`${e.species}|${e.specimen}|${e.view}|${t.join(",")}`;return $s(n).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function A2(e,t){const n=$s(t)%360;e.style.setProperty("--hash-hue",String(n)),e.textContent=t}function Th(e,t,n=t==null?void 0:t.fingerprint_hash){if(!e||!n)return;const r=db((t==null?void 0:t.color_r_mean)??.68,(t==null?void 0:t.color_g_mean)??.62,(t==null?void 0:t.color_b_mean)??.52);e.style.setProperty("--hash-hue",String(Math.round(r.h))),e.style.setProperty("--hash-saturation",`${Math.round(Math.max(.28,r.s)*100)}%`),e.style.setProperty("--hash-lightness",`${Math.round(Math.max(.3,Math.min(.72,r.l))*100)}%`),e.textContent=n}function db(e,t,n){const r=oe(e),i=oe(t),a=oe(n),o=Math.max(r,i,a),s=Math.min(r,i,a);let l=0,u=0;const c=(o+s)/2;if(o!==s){const p=o-s;u=c>.5?p/(2-o-s):p/(o+s),o===r?l=(i-a)/p+(i<a?6:0):o===i?l=(a-r)/p+2:l=(r-i)/p+4,l/=6}return{h:l*360,s:u,l:c}}function ir(e,t,n){return`hsl(${(e%360+360)%360}, ${Math.round(oe(t)*100)}%, ${Math.round(oe(n)*100)}%)`}function mt(e,t,n,r=1){const i=(e%360+360)%360/360,a=oe(t),o=oe(n);if(a===0){const c=Math.round(o*255);return[c,c,c,Math.round(oe(r)*255)]}const s=o<.5?o*(1+a):o+a-o*a,l=2*o-s,u=c=>{let p=i+c;return p<0&&(p+=1),p>1&&(p-=1),p<1/6?l+(s-l)*6*p:p<1/2?s:p<2/3?l+(s-l)*(2/3-p)*6:l};return[Math.round(u(1/3)*255),Math.round(u(0)*255),Math.round(u(-1/3)*255),Math.round(oe(r)*255)]}function N2(e){return e.location_label||"Locality unavailable"}function cb(e,t){var n;return t?((n=e==null?void 0:e.region_labels)==null?void 0:n[t])||t.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,r=>r.toUpperCase()):""}function Ao(e,t){var n,r;return((r=(n=e==null?void 0:e.countries)==null?void 0:n[t])==null?void 0:r.title)||t}function P2(e){var r,i,a,o;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-localities-v1")return t;const n=e.species_names||[];for(let s=0;s<n.length;s+=1){const l=((r=e.primary_country_codes)==null?void 0:r[s])||"",u=((i=e.region_keys)==null?void 0:i[s])||"",c=((a=e.top_country_codes)==null?void 0:a[s])||[],p=((o=e.top_country_counts)==null?void 0:o[s])||[],m=l?Ao(e,l):"",b=cb(e,u),f=c.map((_,S)=>({code:_,label:Ao(e,_),count:p[S]||0}));t.set(n[s],{primary_country:l,primary_country_label:m,region_key:u,region_label:b,top_countries:f,location_label:m&&b?`${m}, ${b}`:m||b||""})}return t}function R2(e){var a,o,s,l,u,c,p,m,b,f,_,S;const t=new Map;if((e==null?void 0:e.encoding)!=="shell-species-traits-v1")return t;const n=e.species_names||[],r=e.rarity_labels||[],i=e.protection_status_labels||[];for(let x=0;x<n.length;x+=1){const v=((a=e.known_range_country_codes)==null?void 0:a[x])||[],C=((o=e.known_range_country_counts)==null?void 0:o[x])||[],T=v.map((I,M)=>({code:I,label:Ao(e,I),count:C[M]||0}));t.set(n[x],{genus:((s=e.genus)==null?void 0:s[x])||"",rarity_label:r[(l=e.rarity)==null?void 0:l[x]]||"Data deficient",rarity_reason:((u=e.rarity_reasons)==null?void 0:u[x])||"",dataset_sample_count:((c=e.dataset_sample_count)==null?void 0:c[x])||0,known_range_country_count:((p=e.country_count)==null?void 0:p[x])||T.length,known_range_countries:T,primary_country:((m=e.primary_country_codes)==null?void 0:m[x])||"",region_key:((b=e.region_keys)==null?void 0:b[x])||"",region_label:cb(e,((f=e.region_keys)==null?void 0:f[x])||""),protection_status:i[(_=e.protection_status)==null?void 0:_[x]]||"Not assessed",market_price_usd:((S=e.market_price_usd)==null?void 0:S[x])??null})}return t}function pb(e){const t=Number.isFinite(Number(e.roughness))?Number(e.roughness):ub(e.upload_contour),n=oe((1-(e.contour_solidity||1))/.32),r=e.contour_pc||[],i=oe(((r[1]||0)+7)/14),a=oe(((r[3]||0)+3)/6);return{roughness:t??oe(.4*Math.abs(i-.5)*2+.34*Math.abs(a-.5)*2+.26*n)}}function O2(e,t=null,n=null){var a;g.speciesCounts=new Map,g.originFilterOptionsCache=null;for(const o of e)g.speciesCounts.set(o.species,(g.speciesCounts.get(o.species)||0)+1);const r=P2(t),i=R2(n);g.speciesTraits=i,g.localityMatchRate=(t==null?void 0:t.match_rate)||0;for(const o of e){const s=r.get(o.species),l=i.get(o.species),u=pb(o);o.fingerprint_hash||(o.fingerprint_hash=M2(o)),o.species_sample_count=g.speciesCounts.get(o.species)||1,o.species_traits=l||null,o.morph_traits={...u,...o.morph_traits||{}},o.rarity_label=(l==null?void 0:l.rarity_label)||o.rarity_label||"",o.rarity_reason=(l==null?void 0:l.rarity_reason)||"",o.location_label=(s==null?void 0:s.location_label)||"Locality unavailable",o.location_key=(s==null?void 0:s.primary_country)||(s==null?void 0:s.region_key)||"unknown",o.location_color=o.location_key==="unknown"?"rgba(96, 108, 106, 0.62)":ci(o.location_key),o.species_color=ci(o.species),o.region_label=(s==null?void 0:s.region_label)||"",o.top_countries_label=(a=s==null?void 0:s.top_countries)!=null&&a.length?s.top_countries.slice(0,3).map(c=>c.label).join(", "):o.countries_top||""}}function No(e){return fetch(e,{cache:"no-store"}).then(t=>{if(!t.ok)throw new Error(`${e} returned ${t.status}`);return t.json()})}async function Ch(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} returned ${t.status}`);if(!e.endsWith(".gz"))return t.arrayBuffer();const n=await t.arrayBuffer(),r=new Uint8Array(n);if(r[0]!==31||r[1]!==139)return n;if(!("DecompressionStream"in window))throw new Error("This browser cannot decompress the shell data pack.");return new Response(new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}const kt=15,yr=10,B2=.08,Eh=[{saturation:.2,lightness:.18},{saturation:.42,lightness:.24},{saturation:.64,lightness:.31},{saturation:.82,lightness:.39},{saturation:.82,lightness:.48},{saturation:.74,lightness:.58},{saturation:.62,lightness:.68},{saturation:.48,lightness:.78},{saturation:.34,lightness:.86},{saturation:.2,lightness:.93}];function Ss(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function hb(e){const t=[Number((e==null?void 0:e[0])??0),Number((e==null?void 0:e[1])??0),Number((e==null?void 0:e[2])??0)],n=t.some(r=>r>1)?255:1;return t.map(r=>Ss(r/n))}function D2(e,t,n){const r=(e%360+360)%360/360,i=n<.5?n*(1+t):n+t-n*t,a=2*n-i,o=s=>{let l=r+s;return l<0&&(l+=1),l>1&&(l-=1),l<1/6?a+(i-a)*6*l:l<1/2?i:l<2/3?a+(i-a)*(2/3-l)*6:a};return[o(1/3),o(0),o(-1/3)].map(Ss)}function L2(e){return`#${e.map(t=>Math.max(0,Math.min(255,Math.round(t*255))).toString(16).padStart(2,"0")).join("")}`}function U2(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]:null}function F2(e){const t=String(e||"").match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i);return t?[Number(t[1])/255,Number(t[2])/255,Number(t[3])/255].map(Ss):null}function fb(e){const t=Math.max(0,Math.min(kt*yr-1,Math.round(Number(e)||0))),n=Math.floor(t/kt),r=t%kt;return D2(r/kt*360,Eh[n].saturation,Eh[n].lightness)}function Po(e){const t=Math.max(0,Math.min(kt*yr-1,Math.round(Number(e)||0))),n=fb(t);return{bin:t,hex:L2(n),rgb:n,hue:t%kt,tone:Math.floor(t/kt),count:0,weight:0}}function ks(e){const t=hb(e);let n=0,r=1/0;for(let i=0;i<kt*yr;i+=1){const a=fb(i),o=t[0]-a[0],s=t[1]-a[1],l=t[2]-a[2],u=o*o*.3+s*s*.59+l*l*.11;u<r&&(r=u,n=i)}return n}function W2(e){const t=U2(e)||F2(e);return t?ks(t):null}function pi(e){return`bin:${Math.max(0,Math.min(kt*yr-1,Math.round(Number(e)||0)))}`}function mb(e){const t=String(e||"");if(t.startsWith("bin:")){const n=Number(t.slice(4));return Number.isInteger(n)&&n>=0&&n<kt*yr?n:null}return W2(t)}function q2(e){const n=Array.isArray(e==null?void 0:e.color_palette_rgb)?e.color_palette_rgb.map(hb):[];if(!n.length)return{colors:[],weights:[]};const r=Array.isArray(e==null?void 0:e.color_palette_weights)?e.color_palette_weights:[],i=n.map((o,s)=>{const l=Number(r[s]);return Number.isFinite(l)&&l>0?l:1/n.length}),a=i.reduce((o,s)=>o+s,0)||1;return{colors:n,weights:i.map(o=>o/a)}}function Ts(e){const{colors:t,weights:n}=q2(e),r=new Map;for(let a=0;a<t.length;a+=1){const o=ks(t[a]);r.set(o,(r.get(o)||0)+n[a])}const i=[...r.entries()].map(([a,o])=>({bin:a,weight:Math.round(o*1e4)/1e4})).sort((a,o)=>o.weight-a.weight||a.bin-o.bin);return e.color_bins=i,i}function V2(e){for(const t of e||[])Ts(t)}function H2(e,t){const n=Number(t);return Number.isInteger(n)?(Array.isArray(e==null?void 0:e.color_bins)?e.color_bins:Ts(e)).some(i=>i.bin===n&&Number(i.weight||0)>0):!1}function Cs(e){const t=new Map;for(const n of e||[]){const r=Array.isArray(n==null?void 0:n.color_bins)?n.color_bins:Ts(n);for(const i of r){const a=Number(i.weight||0);if(a<B2)continue;const o=t.get(i.bin)||Po(i.bin);o.count+=1,o.weight+=a,t.set(i.bin,o)}}return[...t.values()].map(n=>({...n,weight:Math.round(n.weight*1e3)/1e3})).sort((n,r)=>n.tone-r.tone||n.hue-r.hue)}const G2=.28,Ih=12;function j2(e){if(!e)return 1;const t=Math.abs(Number(e.p99||0)-Number(e.p01||0)),n=Math.abs(Number(e.max||0)-Number(e.min||0));return Math.max(.001,t||n||1)}function gb(e,t,n){var a;const r=(n==null?void 0:n[t])||{},i=(Number(r.p01||0)+Number(r.p99||0))/2||0;return(Number(((a=e.contour_pc)==null?void 0:a[t])||0)-i)/j2(r)}function K2(e,t,n){return t.map(r=>gb(e,r,n))}function bb(e,t){let n=0;for(let r=0;r<e.length;r+=1){const i=(e[r]||0)-(t[r]||0);n+=i*i}return n}function hi(e,t=0){if(!e.length)return null;const n=e[0].point.length||1,r=t%n,i=e.slice().sort((o,s)=>(o.point[r]||0)-(s.point[r]||0)),a=Math.floor(i.length/2);return{axis:r,item:i[a],left:hi(i.slice(0,a),t+1),right:hi(i.slice(a+1),t+1)}}function X2(e,t,n,r){!t||!Number.isFinite(n)||(e.push({item:t,distance:n}),e.sort((i,a)=>a.distance-i.distance),e.length>r&&(e.length=r))}function fi(e,t,n,r=[]){if(!e)return r;const i=e.axis,a=(t[i]||0)-(e.item.point[i]||0),o=a<=0?e.left:e.right,s=a<=0?e.right:e.left;fi(o,t,n,r),X2(r,e.item,bb(t,e.item.point),n);const l=r.length<n?1/0:r[0].distance;return a*a<=l&&fi(s,t,n,r),r}function yb(e,t){return e/(.05+t)}function zh(e,t,n,r,i){const a=t.target<=n.target?t:n,o=t.target<=n.target?n:t;return{axis:e,axis_label:`PC${e+1}`,low_shell_id:a.shell.id,high_shell_id:o.shell.id,low_file:a.shell.file,high_file:o.shell.file,low_species:a.shell.species,high_species:o.shell.species,normalized_target_delta:Math.round(r*1e4)/1e4,orthogonal_distance:Math.round(i*1e4)/1e4,score:Math.round(yb(r,i)*1e4)/1e4}}function Y2(e,t,n,r){const i=n.filter(b=>b!==t),a=e.filter(b=>{var f;return((f=b==null?void 0:b.contour_pc)==null?void 0:f.length)>t}).map(b=>({shell:b,target:gb(b,t,r),point:K2(b,i,r)})).sort((b,f)=>b.target-f.target);if(a.length<2)return null;if(!i.length){const b=a[0],f=a[a.length-1];return zh(t,b,f,Math.abs(f.target-b.target),0)}const o=Math.max(2,Math.min(Math.ceil(a.length*G2),Math.floor(a.length/2))),s=a.slice(0,o),l=a.slice(-o),u=hi(l),c=hi(s);let p=null;const m=(b,f)=>{if(!b||!f||b.shell.id===f.shell.id)return;const _=Math.abs(f.target-b.target),S=Math.sqrt(bb(b.point,f.point)),x=yb(_,S);(!p||x>p.score)&&(p={source:b,target:f,targetDelta:_,orthogonalDistance:S,score:x})};for(const b of s)for(const f of fi(u,b.point,Ih,[]))m(b,f.item);for(const b of l)for(const f of fi(c,b.point,Ih,[]))m(b,f.item);return p?zh(t,p.source,p.target,p.targetDelta,p.orthogonalDistance):null}function Z2(e,t,{axisCount:n=null}={}){const r=(e||[]).filter(o=>{var s;return(s=o==null?void 0:o.contour_pc)==null?void 0:s.length});if(r.length<2)return[];const i=Math.min(n||r[0].contour_pc.length,r[0].contour_pc.length,(t==null?void 0:t.length)||r[0].contour_pc.length),a=Array.from({length:i},(o,s)=>s);return a.map(o=>Y2(r,o,a,t)).filter(Boolean)}function no(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").replace(/_/g," ").trim()||"Unknown shell"}function Q2(e){return String(e||"").replace(/\.[^.]+$/,"").replace(/_\d+_[A-Z]$/i,"").trim()}async function J2(e){try{return await No(e)}catch{return null}}function Mh(e){if(e==null||String(e).trim()==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function ev(e){const t=String(e||"").trim().toLowerCase();return!t||t==="unknown"?"":t.includes("high")?"Common":t.includes("moderate")?"Uncommon":t.includes("low")?"Rare":t.includes("common")?t.includes("uncommon")?"Uncommon":"Common":t.includes("rare")?"Rare":""}function tv(e,t){const n=e.map(r=>{var i;return{shell:r,value:Number((i=r.morph_traits)==null?void 0:i[t])}}).filter(r=>Number.isFinite(r.value));if(n.length){if(n.sort((r,i)=>r.value-i.value),n.length===1){n[0].shell.morph_traits[`${t}_raw`]=n[0].value,n[0].shell.morph_traits[t]=.5;return}for(let r=0;r<n.length;){let i=r;for(;i+1<n.length&&n[i+1].value===n[r].value;)i+=1;const a=(r+i)/2/(n.length-1);for(let o=r;o<=i;o+=1)n[o].shell.morph_traits[`${t}_raw`]=n[o].value,n[o].shell.morph_traits[t]=a;r=i+1}}}function nv(e,t,n){const r=[];for(let i=0;i<n;i+=1){const a=[];for(let m=0;m<t;m+=1)a.push(e[m*n+i]||0);a.sort((m,b)=>m-b);const o=m=>a[Math.min(a.length-1,Math.max(0,Math.round((a.length-1)*m)))]||0,s=a[0]||0,l=a.at(-1)||0,u=o(.01),c=o(.99),p=Math.max(.001,c-u,l-s);r.push({min:s-p*.08,max:l+p*.08,p01:u-p*.08,p99:c+p*.08})}return r}async function wb(e){const t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),n=new Uint8Array(t.length);n.set(t);const r=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(r)].map(i=>i.toString(16).padStart(2,"0")).join("").slice(0,6).toUpperCase()}function Es(e,t=256){const n=Math.floor(e.length/4),r=new Float32Array(t*2);for(let i=0;i<t;i+=1){const a=i/t;let o=0,s=0;for(let l=0;l<n;l+=1){const u=l+1,c=l*4,p=e[c]||0,m=e[c+1]||0,b=e[c+2]||0,f=e[c+3]||0,_=Math.PI*2*u*a,S=Math.cos(_),x=Math.sin(_);o+=p*S-m*x+b*S+f*x,s+=p*x+m*S+f*S-b*x}r[i*2]=o,r[i*2+1]=s}return r}function rv(e){var i,a;const t=((i=g.model)==null?void 0:i.fingerprint_mean)||[],n=((a=g.model)==null?void 0:a.fingerprint_components)||[];if(!t.length||!n.length)return null;const r=new Float32Array(t);for(let o=0;o<Math.min(e.length,n.length);o+=1){const s=n[o]||[];for(let l=0;l<Math.min(r.length,s.length);l+=1)r[l]+=(e[o]||0)*s[l]}return r}function iv(e){var r,i;const t=((r=g.model)==null?void 0:r.fingerprint_mean)||[];return(((i=g.model)==null?void 0:i.fingerprint_components)||[]).map(a=>{let o=0;for(let s=0;s<Math.min(e.length,t.length,a.length);s+=1)o+=(e[s]-t[s])*a[s];return o})}async function av(){const[e,t,n,r,i]=await Promise.all([No(rr("data/files.json")),No(rr("data/pca_model.json")),Ch(rr("data/fingerprints.f32")),Ch(rr("data/pca.f32")),J2(rr("data/enrichment.json"))]),a=(i==null?void 0:i.species)||(i==null?void 0:i.rows)||[],o=(i==null?void 0:i.shell)||[],s=new Map(a.map(S=>[S.label,S])),l=new Map(o.map(S=>[S.file,S])),u=e.length,c=new Float32Array(n),p=new Float32Array(r),m=Math.floor(c.length/u),b=Math.floor(p.length/u),f={processed_count:u,species_count:new Set(e.map(no)).size,contour_points:256,contour_scale:1,contour_component_count:b,contour_visible_component_count:Math.min(6,b),contour_pca_ranges:nv(p,u,b),contour_explained_variance_ratio:Array.from({length:b},()=>0),fingerprint_mean:t.mean||[],fingerprint_components:t.components||[]},_=await Promise.all(e.map(async(S,x)=>{const v=c.slice(x*m,(x+1)*m),C=Array.from(p.slice(x*b,(x+1)*b)),T=s.get(Q2(S))||{},I=l.get(S)||{},M=Mh(I.lightness_mean),A=Array.isArray(I.palette_rgb)?I.palette_rgb:[],$=Array.isArray(I.palette_weights)?I.palette_weights:[],O=Es(v,256);return{id:x,file:S,species:no(S),specimen:"",specimen_label:"",view:"",view_label:"",name:no(S),contour_pc:C,trait_pc:[],fingerprint:v,fingerprint_hash:await wb(v),enrichment:T,shell_enrichment:I,rarity_label:ev(T.rarity_proxy),country_count:Mh(T.country_count),countries_top:T.countries_top||"",color_l_mean:M==null?null:M/255,color_palette_rgb:A,color_palette_weights:$,morph_traits:{roughness:ub(O)}}}));return tv(_,"roughness"),V2(_),f.contour_pca_diametric_pairs=Z2(_,f.contour_pca_ranges,{axisCount:f.contour_component_count}),{model:f,shells:_}}function _b(e){if(e!=null&&e.upload_contour)return e.upload_contour;if((e==null?void 0:e.id)<0&&g.selected===e&&g.selectedContour)return g.selectedContour;if(Pr.has(e.id))return Pr.get(e.id);if(!g.contours&&(e!=null&&e.fingerprint)){const s=Es(e.fingerprint,g.contourPoints||256);return Pr.set(e.id,s),s}if(!g.contours||!g.contourPoints)return null;const t=e.id*g.contourPoints*2;if(t+g.contourPoints*2>g.contours.length)return null;const r=e.center[0]*g.contourScale,i=e.center[1]*g.contourScale,a=Math.max(1e-6,e.mean_radius*g.contourScale),o=new Float32Array(g.contourPoints*2);for(let s=0;s<g.contourPoints;s+=1){const l=t+s*2;o[s*2]=(g.contours[l]-r)/a,o[s*2+1]=(g.contours[l+1]-i)/a}return Pr.set(e.id,o),o}function xb(e){var t;return e?{color_r_mean:e.color_r_mean,color_g_mean:e.color_g_mean,color_b_mean:e.color_b_mean,color_l_mean:e.color_l_mean,color_a_mean:e.color_a_mean,color_b_lab_mean:e.color_b_lab_mean,color_palette_rgb:e.color_palette_rgb,color_palette_weights:e.color_palette_weights,color_chroma_mean:e.color_chroma_mean,color_chroma_std:e.color_chroma_std,color_saturation_mean:e.color_saturation_mean,color_saturation_std:e.color_saturation_std,color_pattern_strength:e.color_pattern_strength,color_pattern_contrast:e.color_pattern_contrast,color_pattern_chroma:e.color_pattern_chroma,roughness:e.roughness??((t=e.morph_traits)==null?void 0:t.roughness),texture_gradient_mean:e.texture_gradient_mean,texture_residual_std:e.texture_residual_std,texture_luma_iqr:e.texture_luma_iqr,contour_concavity:e.contour_concavity,contour_solidity:e.contour_solidity}:{}}function ov(e){const t=e.color_l_mean??.5,n=e.color_chroma_mean??.1,r=(Math.atan2(e.color_hue_sin||0,e.color_hue_cos||1)*180/Math.PI+360)%360;return t>.72&&n<.12?"ivory":t<.32?"dark brown":n<.08?t>.58?"chalky cream":"stone gray":r<28||r>=342?"rose-brown":r<58?t>.58?"golden cream":"amber-brown":r<92?"olive-tan":r<165?"green-gray":r<235?"blue-gray":r<292?"violet-gray":"pink-tan"}function Is(){return g.generatedTraits||xb(g.selected)}function zs(){const e=sv(g.pcValues);e&&(g.generatedContour=e,g.generatedTraits=null,g.generatedMode="pca",Sb())}function sv(e){var i,a,o,s,l;const t=rv(e);if(t)return Es(t,g.contourPoints||256);if(!((a=(i=g.model)==null?void 0:i.contour_mean)!=null&&a.length)||!((s=(o=g.model)==null?void 0:o.contour_components)!=null&&s.length))return null;const n=g.model.contour_mean.length,r=new Float32Array(n);for(let u=0;u<n;u+=1){let c=g.model.contour_mean[u]||0;for(let p=0;p<g.model.contour_components.length;p+=1)c+=(e[p]||0)*(((l=g.model.contour_components[p])==null?void 0:l[u])||0);r[u]=c}return r}function Ms(e){let t=0;for(const n of e)if(n)for(let r=0;r<n.length;r+=2)t=Math.max(t,Math.hypot(n[r],n[r+1]));return t||1}function bn(e,t,n,r,i){e.beginPath();const a=Math.floor(t.length/2);for(let o=0;o<a;o+=1){const s=n+t[o*2]*i,l=r+t[o*2+1]*i;o===0?e.moveTo(s,l):e.lineTo(s,l)}e.closePath()}function vb(e,t=.9){const n=Math.round(oe((e==null?void 0:e.color_r_mean)??.72)*255),r=Math.round(oe((e==null?void 0:e.color_g_mean)??.66)*255),i=Math.round(oe((e==null?void 0:e.color_b_mean)??.54)*255);return`rgba(${n}, ${r}, ${i}, ${t})`}function lv(){const e=g.pcValues.slice(0,6).map(t=>Number(t||0).toFixed(4));return $s(`projected|${e.join(",")}`).toString(36).toUpperCase().padStart(6,"0").slice(-6)}function $b(){var e,t,n;if((e=g.selected)!=null&&e.fingerprint_hash&&E.physicalHash&&Th(E.physicalHash,g.selected),E.projectedHash){const r=g.generatedMode==="selected"&&((t=g.selected)!=null&&t.fingerprint_hash)?g.selected.fingerprint_hash:lv();g.generatedMode==="selected"&&((n=g.selected)!=null&&n.fingerprint_hash)?Th(E.projectedHash,g.selected,r):A2(E.projectedHash,r)}}function uv(e,t,n,r,i,a){const o=Math.floor(t.length/2);if(o<4)return;const s=oe(((a==null?void 0:a.roughness)||.012)/.04),l=oe(((a==null?void 0:a.color_chroma_mean)||.08)/.35),u=oe(((a==null?void 0:a.contour_concavity)||.04)/.35),c=oe(((a==null?void 0:a.color_pattern_strength)||.06)/.22),p=oe(((a==null?void 0:a.color_pattern_contrast)||.04)/.18);e.save(),bn(e,t,n,r,i),e.clip();const m=4+Math.round(u*4+c*5);for(let _=1;_<=m;_+=1)bn(e,t,n,r,i*(.16+_/(m+1)*.78)),e.strokeStyle=`rgba(32, 36, 42, ${.035+l*.035+p*.05})`,e.lineWidth=.8+c*.55,e.stroke();const b=Math.max(4,Math.round(16-s*5-l*3-c*6));e.lineWidth=.9+s*.8+c*.6,e.strokeStyle=`rgba(32, 36, 42, ${.07+s*.12+p*.16})`;for(let _=0;_<o;_+=b){const S=t[_*2],x=t[_*2+1];e.beginPath(),e.moveTo(n+S*i*.22,r+x*i*.22),e.lineTo(n+S*i*.95,r+x*i*.95),e.stroke()}const f=e.createRadialGradient(n-i*.22,r-i*.28,i*.08,n,r,i*1.25);f.addColorStop(0,"rgba(255, 255, 255, 0.34)"),f.addColorStop(.45,"rgba(255, 255, 255, 0.08)"),f.addColorStop(1,"rgba(32, 36, 42, 0.08)"),e.fillStyle=f,e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore()}function Sb(){const{width:e,height:t}=E.outline;De.clearRect(0,0,e,t),De.fillStyle="#f7f7f2",De.fillRect(0,0,e,t);const n=g.generatedContour||g.selectedContour;if(!n)return;$b();const r=e/2,i=t/2,a=Math.min(e,t)*.42/Ms([n]),o=Is();De.save(),bn(De,n,r,i,a),De.fillStyle=vb(o,.9),De.strokeStyle="#287a74",De.lineWidth=3,De.fill(),uv(De,n,r,i,a,o),bn(De,n,r,i,a),De.stroke(),De.fillStyle="#20242a",De.beginPath(),De.arc(r,i,3,0,Math.PI*2),De.fill(),De.restore()}function dv(e,t,n,r){const i=[],a=Math.floor(e.length/2);for(let o=0;o<a;o+=1){const s=t+e[o*2]*r,l=n+e[o*2+1]*r;i.push(`${o===0?"M":"L"}${s.toFixed(2)} ${l.toFixed(2)}`)}return i.push("Z"),i.join(" ")}function cv(){const e=g.generatedContour||g.selectedContour;if(!e)return;const t=512,n=t/2,r=t*.42/Ms([e]),i=dv(e,n,n,r),a=vb(Is(),.86),o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}"><rect width="${t}" height="${t}" fill="#f7f7f2"/><path d="${i}" fill="${a}" stroke="#287a74" stroke-width="6" stroke-linejoin="round"/></svg>`,s=new Blob([o],{type:"image/svg+xml"}),l=URL.createObjectURL(s),u=document.createElement("a");u.href=l,u.download="seashell-generated.svg",u.click(),URL.revokeObjectURL(l)}const ro=typeof Intl<"u"&&Intl.DisplayNames?new Intl.DisplayNames(["en"],{type:"region"}):null;function As(e){const t=String(e||"").trim().toUpperCase();return!/^[A-Z]{2}$/.test(t)||t==="ZZ"?"":(ro==null?void 0:ro.of(t))||t}function kb(e){const t=String(e||"").trim().toUpperCase();return!/^[A-Z]{2}$/.test(t)||t==="ZZ"?"":[...t].map(n=>String.fromCodePoint(127462+n.charCodeAt(0)-65)).join("")}function Tb(e){return String(e||"").split(";").map(t=>{const[n,r]=t.trim().split(":"),i=String(n||"").trim().toUpperCase();return{code:i,count:Number(r||0),name:As(i),flag:kb(i)}}).filter(t=>t.code&&t.name&&Number.isFinite(t.count)&&t.count>0)}function pv(e){const t=String(e||"").trim().toUpperCase();return`${As(t)} ${t}`.trim().toLowerCase()}function io(e){const t=As(e);if(!t)return"";const n=kb(e);return n?`${n} ${t}`:t}function hv(e){const t=Tb(e);return t.length?t.map(n=>n.flag).filter(Boolean).join(" "):""}function fv(e){return Array.isArray(e==null?void 0:e.color_bins)&&e.color_bins.length?e.color_bins.slice().sort((t,n)=>Number(n.weight||0)-Number(t.weight||0)||Number(t.bin||0)-Number(n.bin||0)).map(t=>{const n=Number(t.bin),r=Po(n).hex;return{color:r,filterValue:pi(n),title:`${r} · bin ${n} · weight ${Number(t.weight||0).toFixed(3)}`}}):Array.isArray(e==null?void 0:e.color_palette_rgb)&&e.color_palette_rgb.length?e.color_palette_rgb.map(t=>{const n=[oe(Number((t==null?void 0:t[0])??0)),oe(Number((t==null?void 0:t[1])??0)),oe(Number((t==null?void 0:t[2])??0))],r=ks(n),i=Po(r).hex;return{color:i,filterValue:pi(r),title:`${i} · bin ${r}`}}):[]}function mv(e){const t={r:oe(e.color_r_mean??.72),g:oe(e.color_g_mean??.66),b:oe(e.color_b_mean??.54)},n=db(t.r,t.g,t.b),r=oe((e.color_l_std||.18)/.32);return[ir(n.h,n.s*.78,Math.max(.12,n.l-.28-r*.08)),ir(n.h-8,n.s*.92,Math.max(.22,n.l-.12)),ir(n.h,n.s,n.l),ir(n.h+6,n.s*.72,Math.min(.86,n.l+.16)),ir(n.h,n.s*.48,Math.min(.94,n.l+.3+r*.04))]}function Un(e=!1){if(!E.paletteSwatches)return;E.paletteSwatches.innerHTML="";const t=g.generatedMode==="selected"?fv(g.selected):[],n=t.length?t:mv(Is()).map(r=>({color:r,filterValue:"",title:r}));for(const r of n){const i=document.createElement("button");i.type="button",i.className="palette-swatch",i.style.background=r.color,i.title=r.title,i.setAttribute("aria-label",`Filter by ${r.color}`),i.setAttribute("aria-pressed",r.filterValue&&g.categoryFilters.color===r.filterValue?"true":"false"),i.disabled=!r.filterValue,i.addEventListener("click",()=>{r.filterValue&&(g.categoryFilters.color=g.categoryFilters.color===r.filterValue?"":r.filterValue,window.dispatchEvent(new CustomEvent("shellspace:color-filter-changed")))}),E.paletteSwatches.append(i)}}const gv=1e3,bv=250;function Ah(e,t,n=""){E.sourceImage.hidden=!1,E.sourceSpinner&&(E.sourceSpinner.hidden=!1),E.sourceImage.dataset.fallbackApplied="false",E.sourceImage.alt=n,E.sourceImage.onerror=()=>{E.sourceImage.removeAttribute("src"),E.sourceSpinner&&(E.sourceSpinner.hidden=!0)},E.sourceImage.onload=()=>{E.sourceSpinner&&(E.sourceSpinner.hidden=!0),Un(!1)},E.sourceImage.src=e}async function Cb(e,{preferFastSource:t=!1}={}){if(!e)return;const n=++g.sourceToken,r=g.selectionRun;if(window.clearTimeout(g.sourceLoadTimer),E.sourceSpinner&&(E.sourceSpinner.hidden=!1),g.uploadImageUrl&&e.id<0){Ah(g.uploadImageUrl,e,e.species);return}E.sourceImage.hidden=!0,g.sourceFrame=null,g.sourceMode="python",Un(!1);const i=E.statusLine.textContent;g.sourceLoadTimer=window.setTimeout(async()=>{if(r!==g.selectionRun||n!==g.sourceToken||g.selected!==e)return;const a=await g2(e,{priority:10});Y0(i),!(r!==g.selectionRun||n!==g.sourceToken||g.selected!==e)&&(a!=null&&a.imageUrl?Ah(a.imageUrl,e,e.species):E.sourceSpinner&&(E.sourceSpinner.hidden=!0))},t?80:bv)}function Ns(){const e=[];for(const t of[g.xAxis,g.yAxis])Number.isInteger(t)&&t>=0&&!e.includes(t)&&e.push(t);return e.length?e:[0,1]}function yv(e){var i,a;const t=(a=(i=g.model)==null?void 0:i.contour_pca_ranges)==null?void 0:a[e];if(!t)return 1;const n=Math.abs((t.p99??0)-(t.p01??0)),r=Math.abs((t.max??0)-(t.min??0));return Math.max(.001,n||r||1)}function Ti(e,t,n=null){let r=0,i=0;const a=e.contour_pc||[],o=n!=null&&n.length?n:Array.from({length:Math.min(4,a.length,t.length)},(l,u)=>u);let s=0;for(const l of o){if(l>=a.length||l>=t.length)continue;const u=(a[l]||0)-(t[l]||0);r+=u**2,i+=(u/yv(l))**2,s+=1}return{rawSq:r,normalizedSq:i,dimensions:s}}function Ps(e){if(!e.dimensions)return 0;const t=Math.sqrt(e.normalizedSq),n=Math.sqrt(e.dimensions);return Math.max(0,Math.min(100,(1-t/n)*100))}function wv(e,t,n){if(e.length<n){e.push(t);return}let r=0,i=e[0].distance;for(let a=1;a<e.length;a+=1)e[a].distance>i&&(i=e[a].distance,r=a);t.distance<i&&(e[r]=t)}function _v(e){return e.sort((t,n)=>t.distance-n.distance).map(t=>({distance:Math.sqrt(t.stats.rawSq),similarity:Ps(t.stats),shell:t.shell}))}function xv(e,{axes:t=null,limit:n=4,excludeId:r=null}={}){const i=++g.neighborSearchRun;window.clearTimeout(g.neighborSearchTimer);const a=g.filtered.length?g.filtered:g.shells,o=[];let s=0;const l=()=>{var c;if(i!==g.neighborSearchRun)return;const u=performance.now()+5;for(;s<a.length&&performance.now()<u;s+=1){const p=a[s];if(p.id===r||!((c=p.contour_pc)!=null&&c.length))continue;const m=Ti(p,e,t);wv(o,{distance:m.normalizedSq,stats:m,shell:p},n)}if(s<a.length){g.neighborSearchTimer=window.setTimeout(l,0);return}Rs(_v(o))};g.neighborSearchTimer=window.setTimeout(l,0)}function vv(e){if(!e)return[];if(g.neighborCache.has(e.id))return g.neighborCache.get(e.id);const t=[];let n=-1,r=-1;for(const a of g.shells){if(a.id===e.id)continue;const o=Ti(a,e.contour_pc||[]),s=o.normalizedSq;if(t.length<4){t.push({distance:s,stats:o,shell:a}),s>r&&(r=s,n=t.length-1);continue}if(!(s>=r)){t[n]={distance:s,stats:o,shell:a},r=-1;for(let l=0;l<t.length;l+=1)t[l].distance>r&&(r=t[l].distance,n=l)}}t.sort((a,o)=>a.distance-o.distance);const i=t.map(a=>({distance:Math.sqrt(a.stats.rawSq),similarity:Ps(a.stats),shell:a.shell}));return g.neighborCache.set(e.id,i),i}function Rs(e){const t=e.map(r=>r.shell.id).join("|");if(g.neighborRenderKey===t){g.draggingTarget&&g.neighborHydrationItems.length&&Ro(g.neighborHydrationItems,t);return}g.neighborRenderKey=t,E.neighborsList.innerHTML="",window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationItems=[];const n=[];for(const r of e){const i=document.createElement("button");i.className="neighbor-button";const a=Number.isFinite(r.similarity)?r.similarity:0;i.title=`${r.shell.species} (${St(a,1)}% similar, distance ${St(r.distance,3)})`;const o=document.createElement("canvas");o.width=160,o.height=116,o.className="neighbor-contour",Eb(o,r.shell);const s=document.createElement("img");s.setAttribute("aria-label",r.shell.species),s.alt=r.shell.species,s.hidden=!0,s.onload=()=>{s.hidden=!1,o.hidden=!0};const l=document.createElement("span");l.textContent=`${Math.round(a)}%`,i.append(o,s,l),i.addEventListener("click",()=>{wr(r.shell),Qt(r.shell)}),E.neighborsList.append(i),gr(s,r.shell)&&(s.hidden||(o.hidden=!0)),n.push({image:s,shell:r.shell})}g.neighborHydrationItems=n,Ro(n,t)}function Eb(e,t){const n=e.getContext("2d"),r=_b(t);if(n.clearRect(0,0,e.width,e.height),!r)return;const i=e.width/2,a=e.height/2,o=Math.min(e.width,e.height)*.4/Ms([r]),s=n.createLinearGradient(0,e.height*.22,e.width,e.height*.86);s.addColorStop(0,"#f7ead0"),s.addColorStop(1,"#c98f72"),bn(n,r,i,a,o),n.fillStyle=s,n.strokeStyle="rgba(59, 77, 76, 0.72)",n.lineWidth=2,n.fill(),n.stroke(),n.save(),bn(n,r,i,a,o),n.clip(),n.strokeStyle="rgba(255, 255, 255, 0.22)",n.lineWidth=1.1;for(let c=1;c<=2;c+=1)bn(n,r,i,a,o*(.34+c*.2)),n.stroke();n.strokeStyle="rgba(64, 44, 38, 0.1)",n.lineWidth=1;const l=Math.floor(r.length/2),u=Math.max(12,Math.floor(l/10));for(let c=0;c<l;c+=u){const p=r[c*2],m=r[c*2+1];n.beginPath(),n.moveTo(i+p*o*.25,a+m*o*.25),n.lineTo(i+p*o*.94,a+m*o*.94),n.stroke()}n.restore()}function Ro(e,t){window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationTimer=window.setTimeout(()=>{if(g.neighborHydrationTimer=0,g.draggingTarget){Ro(e,t);return}$v(e,t)},gv)}async function $v(e,t){const n=g.selectionRun;for(const r of e){if(n!==g.selectionRun||g.neighborRenderKey!==t)return;gr(r.image,r.shell)||tb(r.image,r.shell,{priority:-5}).then(()=>{(n!==g.selectionRun||g.neighborRenderKey!==t)&&(r.image.hidden=!0)})}}function Sv(e,t=g.neighborToken){if(!e||t!==g.neighborToken){g.neighborRenderKey="",g.neighborSearchRun+=1,window.clearTimeout(g.neighborSearchTimer),g.neighborSearchTimer=0,window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationTimer=0,g.neighborHydrationItems=[],E.neighborsList.innerHTML="";return}Rs(vv(e))}function kv(e,t=null){if(g.neighborToken+=1,window.clearTimeout(g.neighborTimer),g.neighborSearchRun+=1,window.clearTimeout(g.neighborSearchTimer),g.neighborSearchTimer=0,window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationTimer=0,g.neighborHydrationItems=[],t){Rs(t);return}xv(e.slice(),{axes:Ns()})}function Tv(){window.clearTimeout(g.targetNeighborTimer),g.targetNeighborTimer=0,g.targetNeighborValues=null,g.neighborSearchRun+=1,window.clearTimeout(g.neighborSearchTimer),g.neighborSearchTimer=0}function Nh(){const e=g.pendingSelectShell;g.pendingSelectShell=null,e&&Qt(e,{preferFastSource:!0})}function mi(e,t=0){g.neighborToken+=1;const n=g.neighborToken;if(window.clearTimeout(g.neighborTimer),window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationTimer=0,g.neighborHydrationItems=[],!e){g.neighborRenderKey="",g.neighborSearchRun+=1,window.clearTimeout(g.neighborSearchTimer),g.neighborSearchTimer=0,window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationTimer=0,g.neighborHydrationItems=[],E.neighborsList.innerHTML="";return}g.neighborTimer=window.setTimeout(()=>{Sv(e,n)},t)}let Pn=0,Ib=0;function Cv(){try{const e=JSON.parse(localStorage.getItem(Do)||"[]");g.starredIds=Array.isArray(e)?e.filter(t=>Number.isFinite(Number(t))).map(Number):[]}catch{g.starredIds=[]}}function Ev(){localStorage.setItem(Do,JSON.stringify(g.starredIds.slice(0,80)))}function zb(e){return!!(e&&g.starredIds.includes(e.id))}function Mb(){if(!E.starShell)return;const e=zb(g.selected);E.starShell.setAttribute("aria-pressed",e?"true":"false"),E.starShell.title=e?"Unstar this shape":"Star this shape",E.starShell.setAttribute("aria-label",e?"Unstar this shape":"Star this shape")}function Iv(){if(!g.selected)return;window.clearTimeout(g.neighborTimer);const e=g.selected.id,t=zb(g.selected);g.starredIds=g.starredIds.filter(n=>n!==e),t||(g.starredIds.unshift(e),window.requestAnimationFrame(()=>{E.starShell.classList.remove("star-pop"),E.starShell.classList.add("star-pop"),zv(),window.setTimeout(()=>E.starShell.classList.remove("star-pop"),850)})),Mb(),Ci(),window.setTimeout(Ev,0)}function zv(){var o;if(!E.starBurst||!E.starShell)return;const e=E.starShell.getBoundingClientRect(),t=(o=E.starredBand)==null?void 0:o.getBoundingClientRect(),n=e.left+e.width/2,r=e.top+e.height/2,i=t?t.left+Math.min(70,t.width*.4):n,a=t?t.top+t.height/2:r-60;E.starBurst.style.setProperty("--burst-start-x",`${n}px`),E.starBurst.style.setProperty("--burst-start-y",`${r}px`),E.starBurst.style.setProperty("--burst-end-x",`${i}px`),E.starBurst.style.setProperty("--burst-end-y",`${a}px`),E.starBurst.innerHTML="";for(let s=0;s<9;s+=1){const l=document.createElement("span");l.style.setProperty("--spark-angle",`${s*40-20}deg`),l.style.setProperty("--spark-distance",`${24+s%3*10}px`),l.style.setProperty("--spark-delay",`${s*18}ms`),E.starBurst.append(l)}E.starBurst.classList.remove("is-active"),E.starBurst.offsetWidth,E.starBurst.classList.add("is-active"),window.setTimeout(()=>E.starBurst.classList.remove("is-active"),900)}function Mv(){var i;if(g.showAllStars){const a=[];for(const o of g.starredIds){const s=yi(o);s&&a.push({shell:s})}return{items:a,hidden:0}}const e=Math.max(44,((i=E.starredBand)==null?void 0:i.clientWidth)||0),t=[];let n=0,r=0;for(let a=0;a<g.starredIds.length;a+=1){const o=yi(g.starredIds[a]);if(!o)continue;const s={shell:o},l=71,u=g.starredIds.length-a-1,c=u>0?54:0;if(t.length>0&&n+l+c>e){r=u+1;break}t.push(s),n+=l}return{items:t,hidden:r}}function Ci(){if(!E.starredBand)return;E.starredBand.innerHTML="",g.starredHydratedCount=0,g.starredThumbs=[];const{items:e,hidden:t}=Mv();for(const{shell:n}of e){const r=document.createElement("button");r.className="starred-shell",r.title=`${n.species} ${n.fingerprint_hash}`,r.dataset.shellId=String(n.id);const i=document.createElement("img");i.alt=n.species,r.append(i),g.starredThumbs.push({button:r,image:i,shell:n}),r.addEventListener("click",()=>{wr(n),Qt(n)}),E.starredBand.append(r),gr(i,n)}if(t>0||g.showAllStars){const n=document.createElement("button");n.className="starred-more",n.textContent=g.showAllStars?"Less":`+${t}`,n.title=g.showAllStars?"Show fewer starred shells":"Show all starred shells",n.addEventListener("click",()=>{g.showAllStars=!g.showAllStars,Ci()}),E.starredBand.append(n)}dr(0)}async function Av({limit:e=80,onProgress:t=null}={}){const n=[];for(const a of g.starredIds.slice(0,e)){const o=yi(a);o!=null&&o.file&&n.push(o)}const r=n.filter(a=>!Si(a)&&!ws(a));let i=0;for(const a of n)t&&r.includes(a)&&t({shell:a,loaded:i,total:r.length}),await b2(a,{priority:-2}),r.includes(a)&&(i+=1);return t&&r.length&&t({shell:null,loaded:i,total:r.length}),n.length}function dr(e=3e3){if(!E.starredBand)return;g.starredHydrationRun+=1;const t=g.starredHydrationRun;window.clearTimeout(g.starredHydrationTimer),g.starredHydrationTimer=window.setTimeout(()=>Nv(t),e)}async function Nv(e){if(!E.starredBand||e!==g.starredHydrationRun)return;const t=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,r=g.starredThumbs.filter(({button:i})=>{const a=i.getBoundingClientRect();return a.right>=0&&a.left<=t&&a.bottom>=0&&a.top<=n}).slice(0,18);for(const{image:i,shell:a}of r){if(e!==g.starredHydrationRun)return;if(!(!i||!a)){if(await Pv(),e!==g.starredHydrationRun||!i.isConnected)return;gr(i,a)&&(g.starredHydratedCount+=1)}}}function Pv(){return new Promise(e=>{"requestIdleCallback"in window?window.requestIdleCallback(e,{timeout:300}):window.setTimeout(e,80)})}function Rv(e){Ib=e.clientX,!Pn&&(Pn=window.requestAnimationFrame(Ov))}function Ov(){if(Pn=0,!E.starredBand||!g.starredThumbs.length)return;const e=E.starredBand.getBoundingClientRect();for(const{button:t}of g.starredThumbs){const n=e.left+t.offsetLeft+t.offsetWidth/2,r=Math.max(0,1-Math.abs(Ib-n)/118),i=r*r*(3-2*r);t.style.setProperty("--dock-scale",(1+i*1.08).toFixed(3)),t.style.setProperty("--dock-lift",`${(18*i).toFixed(2)}px`),t.style.setProperty("--dock-z",`${Math.round(i*100)}`)}}function Ph(){if(E.starredBand){Pn&&(window.cancelAnimationFrame(Pn),Pn=0);for(const{button:e}of g.starredThumbs)e.style.setProperty("--dock-scale","1"),e.style.setProperty("--dock-lift","0px"),e.style.setProperty("--dock-z","0")}}function ao(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_key)||(e==null?void 0:e.location_key)||"unknown"}function Oo(e){var t;return Tb((e==null?void 0:e.countries_top)||((t=e==null?void 0:e.enrichment)==null?void 0:t.countries_top)||"")}function Bv(e){var t;return((t=e==null?void 0:e.species_traits)==null?void 0:t.region_label)||(e==null?void 0:e.region_label)||(e==null?void 0:e.location_label)||"Unknown"}function Dv(e,t){var i,a,o,s;if(!t)return!0;const[n,r]=t.split(":");if(!r)return ao(e)===t;if(n==="country-search"){const l=r.trim().toLowerCase();return l?String((e==null?void 0:e.location_label)||"").toLowerCase().includes(l)||(((i=e==null?void 0:e.species_traits)==null?void 0:i.known_range_countries)||[]).some(u=>`${u.label||""} ${u.code||""}`.toLowerCase().includes(l))||Oo(e).some(u=>pv(u.code).includes(l)):!0}return n==="region"?((a=e==null?void 0:e.species_traits)==null?void 0:a.region_key)===r||(e==null?void 0:e.region_key)===r||(e==null?void 0:e.location_key)===r||ao(e)===r:n==="country"?(e==null?void 0:e.location_key)===r||((o=e==null?void 0:e.species_traits)==null?void 0:o.primary_country)===r||(((s=e==null?void 0:e.species_traits)==null?void 0:s.known_range_countries)||[]).some(l=>l.code===r)||Oo(e).some(l=>l.code===r):ao(e)===t}function Lv(e){const t=String(e||"").trim().toLowerCase();return t&&!["unknown","not assessed","data deficient","locality unavailable"].includes(t)}function Uv(e){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}:null}function Ab(e){return Array.isArray(e.color_palette_rgb)&&e.color_palette_rgb.length?e.color_palette_rgb.map(t=>[Number((t==null?void 0:t[0])??0)*255,Number((t==null?void 0:t[1])??0)*255,Number((t==null?void 0:t[2])??0)*255]).filter(t=>t.every(n=>Number.isFinite(n))):[]}function Fv(e,t){const n=Uv(t);if(!n)return 1/0;const r=Ab(e);if(r.length)return Math.min(...r.map(l=>{const u=l[0]-n.r,c=l[1]-n.g,p=l[2]-n.b;return Math.sqrt(u*u+c*c+p*p)}));if(e.color_r_mean==null||e.color_g_mean==null||e.color_b_mean==null)return null;const i=ib(e),a=i[0]-n.r,o=i[1]-n.g,s=i[2]-n.b;return Math.sqrt(a*a+o*o+s*s)}function Wv(e,t){if(!t)return!0;const n=mb(t);if(n!=null)return H2(e,n);const r=Fv(e,t);return r==null?!0:r<=42}function Nb(e,t){var n;return t==="lightness"?e.color_l_mean==null?null:oe(e.color_l_mean):t==="area"?e.area==null||e.image_width==null||e.image_height==null?null:E2(e):t==="concavity"?e.contour_concavity==null?null:oe(e.contour_concavity/.32):t==="roughness"?((n=e.morph_traits)==null?void 0:n.roughness)==null?null:oe(e.morph_traits.roughness):null}function Os(){return Lo.filter(e=>g.shells.some(t=>Nb(t,e.key)!=null))}function Pb(){const e=new Set;for(const t of g.shells){const n=t.rarity_label;Lv(n)&&e.add(n)}return Du.filter(t=>e.has(t)).concat([...e].filter(t=>!Du.includes(t)).sort())}function Rb(){return Cs(g.shells).length>0||g.shells.some(e=>Ab(e).length||e.color_r_mean!=null&&e.color_g_mean!=null&&e.color_b_mean!=null&&Number.isFinite(Number(e.color_r_mean))&&Number.isFinite(Number(e.color_g_mean))&&Number.isFinite(Number(e.color_b_mean)))}function Ob(){return Cs(g.shells)}function qv(e){if(!e)return"Any";const t=mb(e),n=t==null?null:Cs(g.shells).find(r=>r.bin===t);return(n==null?void 0:n.hex)||e}function Rh(e){for(const t of Os()){const n=g.morphFilters.get(t.key);if(!n)continue;const r=Nb(e,t.key);if(r!=null&&(r<n.min||r>n.max))return!1}return!(g.categoryFilters.rarity&&e.rarity_label!==g.categoryFilters.rarity||g.categoryFilters.origin&&!Dv(e,g.categoryFilters.origin)||g.categoryFilters.color&&!Wv(e,g.categoryFilters.color))}function xn(){var t;const e=E.search.value.trim().toLowerCase();g.filtered=e?g.shells.filter(n=>`${n.name} ${n.species} ${n.file} ${n.fingerprint_hash||""} ${n.legacy_fingerprint_hash||""} ${n.location_label||""}`.toLowerCase().includes(e)&&Rh(n)):g.shells.filter(Rh),g.scatterHitCache=null,g.scatterPointCache=null,G_(),af(),mi(g.selected),Un(!1),E.statusLine&&((t=g.model)!=null&&t.processed_count)&&(E.statusLine.textContent=`${g.filtered.length.toLocaleString()} of ${g.model.processed_count.toLocaleString()} shells`),Bb(),We(120)}function Bb(){if(!E.filtersToggle)return;let e=0;for(const t of Os()){const n=g.morphFilters.get(t.key);n&&(n.min>0||n.max<1)&&(e+=1)}for(const t of Object.values(g.categoryFilters))t&&(e+=1);E.filtersToggle.textContent=e?`Filters (${e})`:"Filters",E.filtersToggle.classList.toggle("is-active",e>0)}function Db(){return[...Lb().countries.map(e=>[e.value,e.label])]}function Lb(){var n,r,i,a,o,s;const e=new Map,t=new Map;if(g.originFilterOptionsCache)return g.originFilterOptionsCache;for(const l of g.shells){const u=((n=l.species_traits)==null?void 0:n.region_key)||l.region_key||"",c=((r=l.species_traits)==null?void 0:r.region_label)||l.region_label||"";if(u&&u!=="unknown"){const m=`region:${u}`,b=e.get(m)||{value:m,key:u,label:c||Bv(l),count:0};b.count+=1,e.set(m,b)}for(const m of((i=l.species_traits)==null?void 0:i.known_range_countries)||[]){if(!m.code||!m.label)continue;const b=`country:${m.code}`,f=t.get(b)||{value:b,code:m.code,label:io(m.code)||m.label,region:((a=l.species_traits)==null?void 0:a.region_key)||"",count:0};f.count+=Math.max(1,Number(m.count||0)),t.set(b,f)}for(const m of Oo(l)){const b=`country:${m.code}`,f=io(m.code);if(!f)continue;const _=t.get(b)||{value:b,code:m.code,label:f,region:"",count:0};_.count+=m.count,t.set(b,_)}const p=l.location_key||"";if(p&&p!=="unknown"&&p.length<=3){const m=`country:${p}`,b=t.get(m)||{value:m,code:p,label:io(p)||((o=l.location_label)==null?void 0:o.split(",")[0])||p,region:((s=l.species_traits)==null?void 0:s.region_key)||"",count:0};b.count+=1,t.set(m,b)}}return g.originFilterOptionsCache={regions:[...e.values()].sort((l,u)=>l.label.localeCompare(u.label)),countries:[...t.values()].sort((l,u)=>l.label.localeCompare(u.label)||l.code.localeCompare(u.code))},g.originFilterOptionsCache}function Vv(){var c;const e=document.createElement("label");e.className="filter-row filter-panel-card filter-select-row filter-origin-row";const t=document.createElement("header"),n=document.createElement("span");n.textContent="Country";const r=document.createElement("output");r.textContent=Gv(g.categoryFilters.origin),t.append(n,r);const i=document.createElement("input"),a=document.createElement("datalist"),o=Db(),s=new Map(o.map(([p,m])=>[m.toLowerCase(),p])),l=new Map(o),u="country-filter-options";a.id=u,i.type="search",i.placeholder="Search country",i.setAttribute("aria-label","Country"),i.setAttribute("list",u);for(const[p,m]of o){const b=document.createElement("option");b.value=m,b.label=p.replace(/^country:/,""),b.textContent=m,a.append(b)}(c=g.categoryFilters.origin)!=null&&c.startsWith("country-search:")?i.value=g.categoryFilters.origin.slice(15):g.categoryFilters.origin&&(i.value=l.get(g.categoryFilters.origin)||""),i.addEventListener("input",()=>{const p=i.value.trim();g.categoryFilters.origin=p?s.get(p.toLowerCase())||`country-search:${p}`:"",xn()}),e.append(t,i,a),E.filterControls.append(e)}function Hv(){const e=Pb();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card rarity-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Rarity";const i=document.createElement("output");i.textContent=g.categoryFilters.rarity||"Any",n.append(r,i);const a=document.createElement("div");a.className="rarity-filter-options";for(const o of e){const s=document.createElement("button");s.type="button",s.textContent=o||"Any",s.setAttribute("aria-pressed",(g.categoryFilters.rarity||"")===o?"true":"false"),s.addEventListener("click",()=>{g.categoryFilters.rarity=g.categoryFilters.rarity===o?"":o,Fn(),xn()}),a.append(s)}t.append(n,a),E.filterControls.append(t)}function Gv(e){if(!e)return"Any";if(e.startsWith("country-search:"))return e.slice(15);const t=Lb(),n=[...t.regions,...t.countries].find(r=>r.value===e);return(n==null?void 0:n.label)||"Any"}function jv(e){g.morphFilters.set(e.key,g.morphFilters.get(e.key)||{min:0,max:1});const t=document.createElement("div");t.className=`filter-row filter-panel-card filter-range-row filter-${e.key}-row`;const n=document.createElement("header"),r=document.createElement("span");r.textContent=e.label;const i=document.createElement("output"),a=g.morphFilters.get(e.key),o=Bu.find(l=>Math.abs(a.min-l.min)<.01&&Math.abs(a.max-l.max)<.01);i.textContent=(o==null?void 0:o.label)||"Any",n.append(r,i);const s=document.createElement("div");s.className="filter-levels";for(const l of Bu){const u=document.createElement("button");u.type="button",u.dataset.level=l.key,u.textContent=l.label,u.title=`${e.label}: ${l.label}`;const c=(o==null?void 0:o.key)===l.key;u.setAttribute("aria-pressed",c?"true":"false"),u.addEventListener("click",()=>{const p=u.getAttribute("aria-pressed")==="true";g.morphFilters.set(e.key,p?{min:0,max:1}:{min:l.min,max:l.max}),Fn(),xn()}),s.append(u)}t.append(n,s),E.filterControls.append(t)}function Kv(){if(!Rb())return;const e=Ob();if(!e.length)return;const t=document.createElement("div");t.className="filter-row filter-panel-card color-filter-row";const n=document.createElement("header"),r=document.createElement("span");r.textContent="Color";const i=document.createElement("output");i.textContent=qv(g.categoryFilters.color),n.append(r,i);const a=document.createElement("div");a.className="color-filter-panel";const o=document.createElement("div");o.className="color-swatch-filter";const l=[12,11,10,9,8,7,6,5].find(u=>e.length>=u&&e.length%u<=1)||Math.min(10,Math.max(5,Math.ceil(Math.sqrt(e.length*1.4))));o.style.setProperty("--color-filter-columns",String(l));for(const{bin:u,hex:c,count:p,weight:m}of e){const b=pi(u),f=document.createElement("button");f.type="button",f.title=`${c} · bin ${u} · ${p} shells · weight ${m.toFixed(2)}`,f.setAttribute("aria-label",`${c} color bin`),f.setAttribute("aria-pressed",g.categoryFilters.color===b?"true":"false"),f.style.setProperty("--swatch",c);const _=document.createElement("span");_.className="color-swatch-dot",f.append(_),f.addEventListener("click",()=>{g.categoryFilters.color=g.categoryFilters.color===b?"":b,Fn(),xn()}),o.append(f)}a.append(o),t.append(n,a),E.filterControls.append(t)}function Fn(){if(!E.filterControls)return;E.filterControls.innerHTML="";const e=Db(),t=Pb(),n=Os();g.categoryFilters.origin&&!g.categoryFilters.origin.startsWith("country-search:")&&!e.some(([i])=>i===g.categoryFilters.origin)&&(g.categoryFilters.origin=""),t.includes(g.categoryFilters.rarity)||(g.categoryFilters.rarity="");const r=Ob().filter(i=>i.count>0);g.categoryFilters.color&&!r.some(i=>pi(i.bin)===g.categoryFilters.color)&&(g.categoryFilters.color=""),Rb()||(g.categoryFilters.color="");for(const i of Lo)n.includes(i)||g.morphFilters.set(i.key,{min:0,max:1});e.length&&Vv(),Hv(),Kv();for(const i of n)g.morphFilters.has(i.key)||g.morphFilters.set(i.key,{min:0,max:1}),jv(i);Bb()}function Xv(){for(const e of Lo)g.morphFilters.set(e.key,{min:0,max:1});g.categoryFilters={origin:"",rarity:"",color:""},Fn(),xn()}function gi(){var m;if(!E.filtersPanel||!E.filtersToggle||E.filtersPanel.hidden)return;const e=window.innerWidth||document.documentElement.clientWidth||1024,t=window.innerHeight||document.documentElement.clientHeight||768,n=E.filtersToggle.getBoundingClientRect(),r=(m=E.controlsPanel)==null?void 0:m.getBoundingClientRect(),i=r?e-r.right-24:0,a=e>1080&&i>=520,o=a?Math.min(460,i):Math.min(460,Math.max(340,e-24)),s=a?r.right+12:n.left,l=Math.max(12,Math.min(s,e-o-12)),u=E.filtersPanel.offsetHeight||420,c=a?n.top:n.bottom+8,p=Math.max(12,Math.min(c,t-Math.min(u,t-24)-12));E.filtersPanel.style.setProperty("--filters-left",`${Math.round(l)}px`),E.filtersPanel.style.setProperty("--filters-top",`${Math.round(p)}px`),E.filtersPanel.style.setProperty("--filters-width",`${Math.round(o)}px`)}function oo(e){!E.filtersPanel||!E.filtersToggle||(E.filtersPanel.hidden=!e,E.filtersToggle.setAttribute("aria-expanded",e?"true":"false"),e&&(gi(),window.requestAnimationFrame(gi)))}const Bs="shellspace-pca-axis-names";function Yv(){try{const e=JSON.parse(localStorage.getItem(Bs)||"[]");g.pcaAxisNames=Array.isArray(e)?e.map(t=>String(t||"")):[]}catch{g.pcaAxisNames=[]}}function Zv(){try{localStorage.setItem(Bs,JSON.stringify(g.pcaAxisNames||[]))}catch{}}function Oh(e){return g.shellById.get(Number(e))||null}function Qv(e,t,n){const r=g.selectionRun,i=()=>{!e.isConnected||r!==g.selectionRun||tb(e,n,{priority:-10}).then(a=>{!a&&e.isConnected&&(e.hidden=!0,t.hidden=!1)})};if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(i,{timeout:800});return}window.setTimeout(i,350)}function Bh(e){const t=document.createElement("button");t.type="button",t.className="pca-guide-shell",t.title=(e==null?void 0:e.species)||"";const n=document.createElement("span");n.className="pca-guide-shell-frame";const r=document.createElement("img");r.alt=(e==null?void 0:e.species)||"",r.loading="eager",r.decoding="async",r.hidden=!0;const i=document.createElement("canvas");if(i.width=148,i.height=104,e&&Eb(i,e),r.onload=()=>{r.hidden=!1,i.hidden=!0},r.onerror=()=>{r.hidden=!0,i.hidden=!1},e){const a=gr(r,e);a&&!r.hidden&&(i.hidden=!0),a||Qv(r,i,e)}return n.append(r,i),t.append(n),t.addEventListener("click",()=>{e&&(wr(e),Qt(e),Yr())}),t}function Jv(e){var l;const t=Oh(e.low_shell_id),n=Oh(e.high_shell_id),r=document.createElement("article");r.className="pca-guide-row";const i=document.createElement("div");i.className="pca-guide-row-header";const a=document.createElement("h3"),o=`PC${e.axis+1}`;a.textContent=((l=g.pcaAxisNames)==null?void 0:l[e.axis])||o,a.contentEditable="true",a.spellcheck=!1,a.setAttribute("role","textbox"),a.setAttribute("aria-label",`Name ${o}`),a.addEventListener("input",()=>{const u=a.textContent.trim();g.pcaAxisNames[e.axis]=u===o?"":u,Zv(),z$()}),a.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),a.blur())}),a.addEventListener("blur",()=>{a.textContent.trim()||(a.textContent=o)}),i.append(a);const s=document.createElement("div");return s.className="pca-guide-shells",s.append(Bh(t),Bh(n)),r.append(i,s),r}function e$(){var t;if(!E.pcaGuideList)return;const e=((t=g.model)==null?void 0:t.contour_pca_diametric_pairs)||[];if(E.pcaGuideList.innerHTML="",!e.length){const n=document.createElement("p");n.className="pca-guide-empty",n.textContent="No PCA contrast pairs are available yet.",E.pcaGuideList.append(n);return}for(const n of e.slice(0,6))E.pcaGuideList.append(Jv(n))}function t$(){e$(),E.pcaGuideModal&&(E.pcaGuideModal.hidden=!1)}function Yr(){E.pcaGuideModal&&(E.pcaGuideModal.hidden=!0)}function n$(e,t,n,r){let i=0,a=0,o=0,s=t,l=n,u=0,c=0;for(let T=0;T<e.length;T+=1){if(!e[T])continue;const I=T%t,M=Math.floor(T/t);i+=1,a+=I,o+=M,s=Math.min(s,I),l=Math.min(l,M),u=Math.max(u,I),c=Math.max(c,M)}if(i<32)throw new Error("The uploaded shell mask is too small.");const p=a/i,m=o/i,b=Math.ceil(Math.hypot(Math.max(p,t-p),Math.max(m,n-m)))+2,f=[],_=[];for(let T=0;T<r;T+=1){const I=-Math.PI/2+T/r*Math.PI*2,M=Math.cos(I),A=Math.sin(I);let $=p,O=m,L=0;for(let H=0;H<=b;H+=.75){const K=Math.round(p+M*H),X=Math.round(m+A*H);if(K<0||K>=t||X<0||X>=n)break;e[X*t+K]&&($=K,O=X,L=H)}f.push([$,O]),_.push(L)}const S=_.reduce((T,I)=>T+I,0)/Math.max(1,_.length),x=new Float32Array(r*2);for(let T=0;T<r;T+=1)x[T*2]=(f[T][0]-p)/Math.max(1e-6,S),x[T*2+1]=(f[T][1]-m)/Math.max(1e-6,S);let v=0;for(let T=0;T<_.length;T+=1)v+=Math.abs(_[T]-_[(T+1)%_.length]);const C=Math.max(1,(u-s+1)*(c-l+1));return{contour:x,center:[p,m],meanRadius:S,area:i,bbox:[s,l,u,c],aspectRatio:Math.max((u-s+1)/Math.max(1,c-l+1),(c-l+1)/Math.max(1,u-s+1)),roughness:v/Math.max(1e-6,S*_.length),concavity:oe(1-i/C)}}function r$(e,t,n){const{data:r,width:i,height:a}=e,o=new Float32Array(i*a),s=[],l=[],u=[];let c=0,p=0,m=0,b=0,f=0,_=0,S=0,x=0,v=0;for(let ie=0;ie<i*a;ie+=1){const F=ie*4;o[ie]=(.2126*r[F]+.7152*r[F+1]+.0722*r[F+2])/255}for(let ie=0;ie<t.length;ie+=1){if(!t[ie])continue;const F=ie*4,re=r[F],U=r[F+1],G=r[F+2],Y=Hx(re,U,G),V=Math.max(re,U,G)/255,_e=Math.min(re,U,G)/255,Ve=V<=0?0:(V-_e)/V,Ie=Math.atan2(Math.sqrt(3)*(U-G),2*re-U-G),Be=Math.max(Ve,.05);c+=re/255,p+=U/255,m+=G/255,b+=Y.l,f+=Y.a,_+=Y.b,S+=Math.sin(Ie)*Be,x+=Math.cos(Ie)*Be,v+=Be,s.push(Y.l),l.push(Math.hypot(Y.a,Y.b)),u.push(Ve)}const C=Math.max(1,s.length),T=ie=>ie.reduce((F,re)=>F+re,0)/Math.max(1,ie.length),I=(ie,F)=>Math.sqrt(ie.reduce((re,U)=>re+(U-F)**2,0)/Math.max(1,ie.length)),M=T(s),A=T(l),$=T(u),O=[...s].sort((ie,F)=>ie-F);let L=0,H=[];for(let ie=1;ie<a-1;ie+=1)for(let F=1;F<i-1;F+=1){const re=ie*i+F;if(!t[re])continue;const U=o[re+1]-o[re-1],G=o[re+i]-o[re-i],Y=(o[re-i]+o[re+i]+o[re-1]+o[re+1]+o[re])/5;L+=Math.hypot(U,G),H.push(o[re]-Y)}const K=T(H),X=I(H,K),P=vh(O,.75)-vh(O,.25),Q=oe((I(s,M)*1.7+I(l,A)*2.2+I(u,$)*.9+X*10+P*1.2+oe(L/Math.max(1,H.length)/1.5))/6),W=oe((I(s,M)*2+X*12+P*1.3)/3),te=oe((I(l,A)*2.6+I(u,$)*1.2)/2);return{visible_shell_ratio:1,mask_ratio:n.area/Math.max(1,i*a),area:n.area,center:n.center,bbox:n.bbox,mean_radius:n.meanRadius,image_width:i,image_height:a,roughness:n.roughness,aspect_ratio:n.aspectRatio,contour_solidity:1-n.concavity,contour_concavity:n.concavity,color_r_mean:c/C,color_g_mean:p/C,color_b_mean:m/C,color_l_mean:b/C,color_l_std:I(s,M),color_a_mean:f/C,color_b_lab_mean:_/C,color_chroma_mean:A,color_chroma_std:I(l,A),color_saturation_mean:$,color_saturation_std:I(u,$),color_hue_sin:S/Math.max(1,v),color_hue_cos:x/Math.max(1,v),texture_gradient_mean:L/Math.max(1,H.length),texture_residual_std:X,texture_luma_iqr:P,color_pattern_strength:Q,color_pattern_contrast:W,color_pattern_chroma:te}}function i$(e,t){const n=Number(t||0);return e==="aspect_ratio"?Math.log1p(Math.max(0,n)):["roughness","contour_concavity","texture_gradient_mean","texture_residual_std","color_pattern_strength","color_pattern_contrast","color_pattern_chroma"].includes(e)?Math.log1p(Math.max(0,n)*64):n}function a$(e){const t=g.model.trait_feature_schema||[],n=g.model.trait_mean||[],r=g.model.trait_components||[];if(!t.length||!r.length)return[];const i=t.map((a,o)=>{var l;let s=0;if(String(a.name||"").startsWith("contour_pc")){const u=Number(String(a.name).replace("contour_pc",""))-1;s=((l=e.contour_pc)==null?void 0:l[u])||0}else s=i$(a.name,e[a.name]);return(s-(a.mean||0))/Math.max(1e-9,a.scale||1)*(a.weight||1)-(n[o]||0)});return r.map(a=>a.reduce((o,s,l)=>o+(i[l]||0)*s,0))}async function o$(){var t;const e=(t=E.uploadInput.files)==null?void 0:t[0];if(e)try{const n=await r2(e),r=n$(n.mask,n.imageData.width,n.imageData.height,g.contourPoints||256);r.contour=n.contour;const i=r$(n.imageData,n.mask,r),a={id:-Date.now(),file:e.name,name:`Uploaded shell ${e.name}`,species:"Uploaded shell",specimen:"",specimen_label:"Bring your own shell",view:"",view_label:"Uploaded image",component_count:1,contour_pc:iv(n.fingerprint),upload_contour:r.contour,fingerprint:n.fingerprint,...i};a.trait_pc=a$(a),a.morph_traits=pb(a),a.fingerprint_hash=await wb(n.fingerprint),a.species_sample_count=1,a.rarity_label="Data deficient",a.rarity_reason="uploaded image",a.location_label="Uploaded image",a.location_key="uploaded",a.location_color=ci("uploaded"),a.species_color=ci(a.species),g.uploadImageUrl&&URL.revokeObjectURL(g.uploadImageUrl),g.uploadImageUrl=n.imageUrl||URL.createObjectURL(e),g.shells=[a,...g.shells.filter(o=>o.id>=0)],g.filtered=[a,...g.filtered.filter(o=>o.id>=0)],g.shellById.set(a.id,a),wr(a),Qt(a),E.statusLine.textContent="Uploaded shell projected"}catch(n){E.statusLine.textContent=n.message||"Upload failed"}finally{E.uploadInput.value=""}}const Ds="shellspace-show-popped-shells";function Ls(e=!0){g.walkingPca=!1,window.cancelAnimationFrame(g.walkFrame),E.walkPca.textContent="Walk",E.walkPca.setAttribute("aria-pressed","false"),e&&Yt()}function Ub(e){if(!g.walkingPca)return;g.walkStartedAt||(g.walkStartedAt=e);const t=(e-g.walkStartedAt)/1e3,n=[...g.pcValues];for(let r=0;r<br();r+=1){const i=g.model.contour_pca_ranges[r],a=i?i.p99-i.p01:1;n[r]=Math.sin(t*(.32+r*.045)+r*1.73)*a*(.18+r*.018)}Us(n,!1),g.walkFrame=window.requestAnimationFrame(Ub)}function s$(){if(g.walkingPca){Ls();return}g.walkingPca=!0,g.walkStartedAt=0,E.walkPca.textContent="Stop",E.walkPca.setAttribute("aria-pressed","true"),g.walkFrame=window.requestAnimationFrame(Ub)}function l$(){Ls(!1),Us(Array.from({length:g.model.contour_component_count||br()},()=>0))}function so(e){!E.settingsPanel||!E.settingsToggle||(E.settingsPanel.hidden=!e,E.settingsToggle.setAttribute("aria-expanded",e?"true":"false"))}function u$(){if(window.confirm("Clear saved shell images, starred shells, and local settings?")){l2();try{localStorage.removeItem(Do),localStorage.removeItem(Ds),localStorage.removeItem(Bs)}catch{}window.location.hash="",window.location.reload()}}function d$(){let e=!0;try{e=localStorage.getItem(Ds)!=="false"}catch{e=!0}g.showPoppedShells=e,E.showPoppedShells&&(E.showPoppedShells.checked=e)}function c$(){var e,t,n,r,i,a,o,s,l,u,c,p,m,b;d$(),E.search.addEventListener("input",xn),(e=E.filtersToggle)==null||e.addEventListener("click",()=>{var f;return oo(((f=E.filtersPanel)==null?void 0:f.hidden)!==!1)}),(t=E.pcaGuideOpen)==null||t.addEventListener("click",t$),(n=E.pcaGuideClose)==null||n.addEventListener("click",Yr),(i=(r=E.pcaGuideModal)==null?void 0:r.querySelector(".pca-guide-backdrop"))==null||i.addEventListener("click",Yr),(a=E.closeFilters)==null||a.addEventListener("click",()=>oo(!1)),(o=E.settingsToggle)==null||o.addEventListener("click",f=>{var _;f.stopPropagation(),so(((_=E.settingsPanel)==null?void 0:_.hidden)!==!1)}),(s=E.settingsPanel)==null||s.addEventListener("click",f=>f.stopPropagation()),(l=E.clearAllData)==null||l.addEventListener("click",u$),(u=E.showPoppedShells)==null||u.addEventListener("change",()=>{g.showPoppedShells=!!E.showPoppedShells.checked;try{localStorage.setItem(Ds,g.showPoppedShells?"true":"false")}catch{}We()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&(oo(!1),so(!1),Yr())}),document.addEventListener("click",()=>{so(!1)}),E.randomShell.addEventListener("click",x$),(c=E.resetTraitFilters)==null||c.addEventListener("click",Xv),E.xAxisSelect.addEventListener("change",()=>Hh(Number(E.xAxisSelect.value),g.yAxis)),E.yAxisSelect.addEventListener("change",()=>Hh(g.xAxis,Number(E.yAxisSelect.value))),E.colorModeSelect.addEventListener("change",()=>{g.colorMode=E.colorModeSelect.value,ab(),We(),Yt()}),window.addEventListener("shellspace:color-filter-changed",()=>{Fn(),xn()}),E.meanShape.addEventListener("click",l$),E.walkPca.addEventListener("click",s$),E.starShell.addEventListener("click",Iv),E.uploadShell.addEventListener("click",()=>E.uploadInput.click()),E.uploadInput.addEventListener("change",o$),E.exportSvg.addEventListener("click",cv),(p=E.starredBand)==null||p.addEventListener("pointermove",Rv),(m=E.starredBand)==null||m.addEventListener("pointerleave",()=>{Ph(),dr(1200)}),(b=E.starredBand)==null||b.addEventListener("pointercancel",Ph),E.zoomIn.addEventListener("click",()=>lo(.72)),E.zoomOut.addEventListener("click",()=>lo(1.38)),E.resetView.addEventListener("click",()=>{g.viewport=ki(g.xAxis,g.yAxis),We()}),E.scatter.addEventListener("wheel",f=>{if(f.preventDefault(),dr(1800),f.shiftKey){const _=E.scatter.getBoundingClientRect();lo(f.deltaY>0?1.12:.88,{x:f.clientX-_.left,y:f.clientY-_.top});return}C$(f.deltaX,f.deltaY)}),E.scatter.addEventListener("pointerdown",f=>{if(f.button===1){f.preventDefault(),E.scatter.setPointerCapture(f.pointerId),g$(f);return}if(f.button!==0)return;g.holdingNearest=!0;const _=E.scatter.getBoundingClientRect(),S=Bo(f.clientX-_.left,f.clientY-_.top);g.pendingSelectShell=S,S?mi(S,16):(g.draggingTarget=!0,g.targetDragStart={pointerId:f.pointerId,clientX:f.clientX,clientY:f.clientY,active:!1,ignoreRealShells:!0},E.pointTooltip.hidden=!0)}),E.scatter.addEventListener("pointermove",f=>{if(g.panningViewport){f.preventDefault(),b$(f);return}if(g.draggingTarget){const _=g.targetDragStart;if(_&&!_.active){if(Math.hypot(f.clientX-_.clientX,f.clientY-_.clientY)<4)return;_.active=!0}Uh(f),E.pointTooltip.hidden=!0;return}if(g.holdingNearest){E.pointTooltip.hidden=!0;return}_$(f)}),E.scatter.addEventListener("mousedown",f=>{if(f.button!==0||g.draggingTarget||g.holdingNearest||g.panningViewport)return;g.holdingNearest=!0;const _=E.scatter.getBoundingClientRect(),S=Bo(f.clientX-_.left,f.clientY-_.top);g.pendingSelectShell=S,S?mi(S,16):(g.draggingTarget=!0,g.targetDragStart={pointerId:-1,clientX:f.clientX,clientY:f.clientY,active:!1,ignoreRealShells:!0},E.pointTooltip.hidden=!0)}),E.scatter.addEventListener("mousemove",f=>{if(!g.draggingTarget||(f.buttons&1)!==1)return;const _=g.targetDragStart;if(_&&!_.active){if(Math.hypot(f.clientX-_.clientX,f.clientY-_.clientY)<4)return;_.active=!0}Uh(f),E.pointTooltip.hidden=!0});for(const f of["pointerup","pointercancel"])E.scatter.addEventListener(f,_=>{var v,C,T;const S=f==="pointerup"&&g.draggingTarget&&!((v=g.targetDragStart)!=null&&v.active);Fh(),S&&bi(_);const x=f==="pointerup";g.holdingNearest=!1,g.draggingTarget=!1,g.targetDragStart=null,g.targetEvent=null,y$(),x?Nh():g.pendingSelectShell=null;try{(T=(C=E.scatter).hasPointerCapture)!=null&&T.call(C,_.pointerId)&&E.scatter.releasePointerCapture(_.pointerId)}catch{}f!=="pointerup"&&(E.pointTooltip.hidden=!0)});window.addEventListener("mouseup",f=>{var S;if(!g.holdingNearest&&!g.draggingTarget)return;const _=g.draggingTarget&&!((S=g.targetDragStart)!=null&&S.active);Fh(),_&&bi(f),g.holdingNearest=!1,g.draggingTarget=!1,g.targetDragStart=null,g.targetEvent=null,Nh()}),E.scatter.addEventListener("pointerleave",()=>{g.draggingTarget||g.panningViewport||(E.pointTooltip.hidden=!0)}),E.scatter.addEventListener("auxclick",f=>{f.button===1&&f.preventDefault()}),window.addEventListener("resize",()=>{We(),Cb(g.selected),Un(),Ci(),gi()}),window.addEventListener("scroll",()=>{gi(),dr(1800)},!0),window.addEventListener("wheel",()=>dr(1800),{passive:!0,capture:!0})}function Dh(e){const t=String(e||"").trim();return!t||["unknown","not assessed","data deficient","locality unavailable"].includes(t.toLowerCase())?"":t}function Qt(e,{renderNearest:t=!0,preferFastSource:n=!1}={}){var u;var r;if(!e)return;g.selectionRun+=1,g.sourceToken+=1,window.clearTimeout(g.sourceLoadTimer),window.clearTimeout(g.neighborHydrationTimer),g.neighborHydrationTimer=0,g.neighborHydrationItems=[],g.walkingPca&&Ls(!1),e.id>=0&&g.uploadImageUrl&&(URL.revokeObjectURL(g.uploadImageUrl),g.uploadImageUrl=""),g.selected=e,E.sourceSpinner&&(E.sourceSpinner.hidden=!0),E.sourceImage&&(E.sourceImage.hidden=!0,E.sourceImage.removeAttribute("src")),e.id>=0&&g.mapShellImageIds.add(e.id),g.selectedContour=_b(e),g.generatedContour=g.selectedContour,g.generatedTraits=xb(e),g.generatedMode="selected",(e.contour_pc||[]).forEach((c,p)=>{g.pcValues[p]=c,_r(p,c)}),E.selectedName.textContent=e.species,$b(),Mb(),E.selectedDetails.innerHTML="";const i=e.countries_top||e.top_countries_label||((u=e.enrichment)==null?void 0:u.countries_top),a=[["Shellprint",e.fingerprint_hash||"-"]],o=Dh(e.rarity_label);o&&a.push(["Rarity",o]);const s=hv(i);s&&a.push(["Countries",s]);const l=Dh(N2(e));if(l&&a.push(["Origin",l]),e.area!=null&&e.image_width!=null&&e.image_height!=null&&a.push(["Area",`${St(I2(e),2)} cm²`]),e.mean_radius!=null&&e.image_width!=null&&e.image_height!=null&&a.push(["Mean radius",`${St(z2(e),2)} cm`]),e.color_l_mean!=null&&a.push(["Mean lightness",to(e.color_l_mean)]),e.contour_concavity!=null&&a.push(["Concavity",to(e.contour_concavity/.32)]),((r=e.morph_traits)==null?void 0:r.roughness)!=null&&a.push(["Roughness",to(e.morph_traits.roughness)]),e.image_width!=null&&e.image_height!=null){const c=vs(e);a.push(["Scale",`${St(c.widthCm,2)} x ${St(c.heightCm,2)} cm frame`])}for(const[c,p]of a){if(p==null||p==="")continue;const m=document.createElement("dt");m.textContent=c;const b=document.createElement("dd");b.textContent=p,E.selectedDetails.append(m,b)}g.sourceFrame=null,Cb(e,{preferFastSource:n}),t?mi(e):E.neighborsList.innerHTML="",Sb(),Un(!1),We(120),Yt()}function Bo(e,t){const n=vn(E.scatter,fe),r=lb(n);let i=null,a=1/0;const o=Math.floor(e/r.cellSize),s=Math.floor(t/r.cellSize);for(let l=0;l<=1;l+=1){for(let u=s-l;u<=s+l;u+=1)for(let c=o-l;c<=o+l;c+=1){if(l&&c>o-l&&c<o+l&&u>s-l&&u<s+l)continue;const p=r.grid.get(`${c},${u}`);if(p)for(const m of p){const b=r.points[m*2]-e,f=r.points[m*2+1]-t,_=b*b+f*f;_<a&&(a=_,i=r.shells[m])}}if(a<=196)break}return a<=196?i:null}function p$(e,t,n,r=4){g.screenNeighborScanCount+=1;const i=vn(E.scatter,fe),a=lb(i);if(!a.shells.length)return[];const o=Math.floor(e/a.cellSize),s=Math.floor(t/a.cellSize),l=[],u=new Set;let c=-1,p=-1;const m=Math.ceil(Math.max(i.width,i.height)/a.cellSize);for(let b=0;b<=m;b+=1){for(let f=s-b;f<=s+b;f+=1)for(let _=o-b;_<=o+b;_+=1){if(b&&_>o-b&&_<o+b&&f>s-b&&f<s+b)continue;const S=a.grid.get(`${_},${f}`);if(S)for(const x of S){if(u.has(x))continue;u.add(x);const v=a.points[x*2]-e,C=a.points[x*2+1]-t,T=v*v+C*C;if(l.length<r){l.push({screenDistance:T,shell:a.shells[x]}),T>p&&(p=T,c=l.length-1);continue}if(!(T>=p)){l[c]={screenDistance:T,shell:a.shells[x]},p=-1;for(let I=0;I<l.length;I+=1)l[I].screenDistance>p&&(p=l[I].screenDistance,c=I)}}}if(l.length>=r&&b>=2)break}return l.sort((b,f)=>b.screenDistance-f.screenDistance),l.map(b=>{const f=Ti(b.shell,n,Ns());return{distance:Math.sqrt(f.rawSq),similarity:Ps(f),shell:b.shell}})}function h$(e,t){g.xAxis>=0&&g.xAxis<e.length&&(e[g.xAxis]=t.x),g.yAxis>=0&&g.yAxis<e.length&&g.yAxis!==g.xAxis&&(e[g.yAxis]=t.y)}function f$(e,t){const n=Ns(),r=new Set(n),i=(t||[]).map(a=>({distance:Ti(a.shell,e,n).normalizedSq,shell:a.shell})).sort((a,o)=>a.distance-o.distance);if(!i.length)return e;if(i[0].distance<1e-10){const a=i[0].shell.contour_pc||[];for(let o=0;o<e.length;o+=1)r.has(o)||(e[o]=a[o]||0);return e}for(let a=0;a<e.length;a+=1){if(r.has(a))continue;let o=0,s=0;for(const l of i){const u=l.shell.contour_pc||[];if(a>=u.length)continue;const c=1/Math.max(l.distance,1e-6);o+=(u[a]||0)*c,s+=c}e[a]=s?o/s:0}return e}function Lh(e,t=null){var i;const n=Math.max(((i=g.model)==null?void 0:i.contour_component_count)||0,g.pcValues.length,br()),r=Array.from({length:n},()=>0);return h$(r,e),f$(r,t)}function m$(e,{updateControls:t=!0}={}){e.forEach((n,r)=>{g.pcValues[r]=n,t&&_r(r,n)}),zs()}function bi(e,{updateControls:t=!1}={}){const n=E.scatter.getBoundingClientRect(),r=vn(E.scatter,fe),i=e.clientX-n.left,a=e.clientY-n.top,o=rb(i,a,r),s=Lh(o),l=p$(i,a,s,8),u=Lh(o,l);m$(u,{updateControls:t}),t||Fb(u),kv(u,l.slice(0,4)),We(),Yt()}function Uh(e){g.targetEvent={clientX:e.clientX,clientY:e.clientY},!g.targetFrame&&(g.targetFrame=window.requestAnimationFrame(()=>{g.targetFrame=0;const t=g.targetEvent;t&&bi(t)}))}function Fh(){var t;g.targetFrame&&(window.cancelAnimationFrame(g.targetFrame),g.targetFrame=0);const e=g.targetEvent;g.targetEvent=null,e&&((t=g.targetDragStart)!=null&&t.active)&&bi(e),Fb()}function g$(e){const t=E.scatter.getBoundingClientRect();g.panningViewport={pointerId:e.pointerId,startX:e.clientX-t.left,startY:e.clientY-t.top,viewport:{...g.viewport}},g.draggingTarget=!1,g.targetDragStart=null,g.targetEvent=null,g.pendingSelectShell=null,Tv(),g.targetFrame&&(window.cancelAnimationFrame(g.targetFrame),g.targetFrame=0),g.holdingNearest=!1,E.scatter.classList.add("is-panning"),E.pointTooltip.hidden=!0}function b$(e){if(!g.panningViewport||g.panningViewport.pointerId!==e.pointerId)return;const t=E.scatter.getBoundingClientRect(),n=vn(E.scatter,fe),r=g.panningViewport,i=r.viewport,a=(e.clientX-t.left-r.startX)/n.width*(i.maxX-i.minX),o=(e.clientY-t.top-r.startY)/n.height*(i.maxY-i.minY);g.viewport={minX:i.minX-a,maxX:i.maxX-a,minY:i.minY+o,maxY:i.maxY+o},We()}function y$(){g.panningViewport&&(g.panningViewport=null,E.scatter.classList.remove("is-panning"),Yt())}function w$(e,t){if(!t){E.pointTooltip.hidden=!0;return}const n=E.scatter.getBoundingClientRect(),r=document.createElement("strong");r.textContent=t.species;const i=[r,document.createTextNode(t.file),document.createElement("br"),document.createTextNode(`${t.specimen_label||t.specimen||"Unknown specimen"}, ${t.view_label||t.view||"Unknown view"}`),document.createElement("br"),document.createTextNode(`${di(g.xAxis)} ${St(Et(t,g.xAxis))}, ${di(g.yAxis)} ${St(Et(t,g.yAxis))}`)];t.color_l_mean!=null&&i.push(document.createElement("br"),document.createTextNode(`${ov(t)}, lightness ${St(t.color_l_mean,3)}`)),E.pointTooltip.replaceChildren(...i),E.pointTooltip.style.left=`${Math.min(Math.max(8,n.width-248),Math.max(8,e.clientX-n.left+14))}px`,E.pointTooltip.style.top=`${Math.min(Math.max(8,n.height-84),Math.max(8,e.clientY-n.top+14))}px`,E.pointTooltip.hidden=!1}function _$(e){g.tooltipEvent={clientX:e.clientX,clientY:e.clientY},!g.tooltipFrame&&(g.tooltipFrame=requestAnimationFrame(()=>{g.tooltipFrame=0;const t=performance.now();if(t-g.tooltipLastAt<60)return;g.tooltipLastAt=t;const n=g.tooltipEvent;if(!n)return;const r=E.scatter.getBoundingClientRect();w$(n,Bo(n.clientX-r.left,n.clientY-r.top))}))}function yi(e){const t=Number(e);return Number.isFinite(t)&&g.shellById.get(t)||null}function wr(e){if(!g.viewport||!e)return;const t=g.viewport.maxX-g.viewport.minX,n=g.viewport.maxY-g.viewport.minY,r=Et(e,g.xAxis),i=Et(e,g.yAxis);g.viewport={minX:r-t/2,maxX:r+t/2,minY:i-n/2,maxY:i+n/2}}function x$(){const e=g.filtered.length?g.filtered:g.shells;if(!e.length)return;const t=K_(e)||po(e);t&&(wr(t),Qt(t,{preferFastSource:!0,renderNearest:!1}),We(420))}function Wh(e){return`https://www.iucnredlist.org/search?query=${encodeURIComponent(e||"")}&searchType=species`}function Zr(e){return String(e||"").trim().toLowerCase()}function v$(e){const t=String(e||"").trim().toUpperCase();return{EX:"Extinct",EW:"Extinct in the wild",CR:"Critically endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near threatened",LC:"Least concern",DD:"Data deficient"}[t]||t}function qh(e){return e&&e.place==null&&e.place_id==null}function Vh(e){return/iucn/i.test(String((e==null?void 0:e.authority)||""))||Number((e==null?void 0:e.iucn)||0)>0}function $$(...e){const t=[];for(const n of e)n&&(n.conservation_status&&t.push(n.conservation_status),Array.isArray(n.conservation_statuses)&&t.push(...n.conservation_statuses));return t.find(n=>qh(n)&&Vh(n))||t.find(n=>Vh(n))||t.find(n=>qh(n))||t[0]||null}function S$(e){if(!e)return"Not assessed";const t=String(e.status||"").trim().toUpperCase(),n=e.status_name||e.description||v$(t)||t,r=String(n||"").trim();return r?!t||r.toUpperCase().includes(`(${t})`)||r.toUpperCase()===t?r:`${r} (${t})`:"Not assessed"}function k$(e,t){const n=Zr(t);return e.find(r=>Zr(r.name)===n)||e.find(r=>Zr(r.matched_term)===n)||e.find(r=>r.rank==="species")||e[0]||null}async function T$(e,{signal:t=null}={}){var n;const r=Zr(e);if(!r)return{status:"Not assessed",authority:"",url:"",taxonId:null};if(g.conservationCache.has(r))return g.conservationCache.get(r);const i=new URLSearchParams({q:e,per_page:"8"}),a={status:"Not assessed",authority:"iNaturalist",url:Wh(e),taxonId:null};try{const o=await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?${i.toString()}`,{signal:t});if(!o.ok)return a;const s=await o.json(),l=k$(s.results||[],e);if(!(l!=null&&l.id))return g.conservationCache.set(r,a),a;let u=l;const c=await fetch(`https://api.inaturalist.org/v1/taxa/${l.id}`,{signal:t});c.ok&&(u=((n=(await c.json()).results)==null?void 0:n[0])||l);const p=$$(u,l),m={status:S$(p),authority:(p==null?void 0:p.authority)||"iNaturalist",url:(p==null?void 0:p.url)||Wh(e),taxonId:l.id};return g.conservationCache.set(r,m),m}catch(o){if((o==null?void 0:o.name)==="AbortError")throw o;return a}}function lo(e,t=null){const n=vn(E.scatter,fe),r=t||{x:n.width/2,y:n.height/2},i=rb(r.x,r.y,n),a=g.viewport,o=ki(g.xAxis,g.yAxis),s=o.maxX-o.minX,l=o.maxY-o.minY,u=Math.max(s*.04,.001),c=Math.max(l*.04,.001),p=Math.max(s*8,u),m=Math.max(l*8,c),b=Math.max(u,Math.min(p,(a.maxX-a.minX)*e)),f=Math.max(c,Math.min(m,(a.maxY-a.minY)*e));g.viewport={minX:i.x-r.x/n.width*b,maxX:i.x+(1-r.x/n.width)*b,minY:i.y-(n.height-r.y)/n.height*f,maxY:i.y+r.y/n.height*f},We()}function C$(e,t){const n=vn(E.scatter,fe),r=g.viewport;if(!r||!n.width||!n.height)return;const i=e/n.width*(r.maxX-r.minX),a=t/n.height*(r.maxY-r.minY);g.viewport={minX:r.minX+i,maxX:r.maxX+i,minY:r.minY-a,maxY:r.maxY-a},We()}function E$(){const e=_s();for(const t of[E.xAxisSelect,E.yAxisSelect]){t.innerHTML="";for(let n=0;n<e;n+=1){const r=document.createElement("option");r.value=String(n),r.textContent=di(n),t.append(r)}}E.xAxisSelect.value=String(g.xAxis),E.yAxisSelect.value=String(g.yAxis)}function Hh(e,t){g.xAxis=e,g.yAxis=t,E.xAxisSelect.value=String(e),E.yAxisSelect.value=String(t),g.viewport=ki(e,t),We(120),Yt()}function I$(){E.pcControls.innerHTML="";const e=br();g.pcValues=Array.from({length:g.model.contour_component_count||e},()=>0),g.pcControlRows=[];for(let t=0;t<e;t+=1){const n=g.model.contour_pca_ranges[t],r=n?n.p01:-1,i=n?n.p99:1,a=Math.max((i-r)/500,.001),o=document.createElement("div");o.className="pc-row";const s=document.createElement("label");s.textContent=nb(t);const l=document.createElement("input");l.type="range",l.min=String(r),l.max=String(i),l.step=String(a),l.value="0";const u=document.createElement("input");u.type="number",u.step=String(a),u.value="0.000",l.addEventListener("input",()=>Gh(t,Number(l.value))),u.addEventListener("change",()=>Gh(t,Number(u.value))),o.append(s,l,u),g.pcControlRows[t]={label:s,slider:l,number:u},E.pcControls.append(o)}}function z$(){var t;const e=_s();for(const n of[E.xAxisSelect,E.yAxisSelect]){const r=n.value;for(let i=0;i<e;i+=1){const a=n.querySelector(`option[value="${i}"]`);a&&(a.textContent=di(i))}n.value=r}for(let n=0;n<g.pcControlRows.length;n+=1)(t=g.pcControlRows[n])!=null&&t.label&&(g.pcControlRows[n].label.textContent=nb(n))}function _r(e,t){const n=g.pcControlRows[e];n&&(n.slider.value=String(t),n.number.value=Number(t).toFixed(3))}function Fb(e=g.pcValues){e.forEach((t,n)=>_r(n,t))}function Gh(e,t){g.pcValues[e]=t,_r(e,t),zs(),We(),Yt()}function Us(e,t=!0){e.forEach((n,r)=>{g.pcValues[r]=n,_r(r,n)}),zs(),We(),t&&Yt()}window.shellspacePerf={selectedId:()=>{var e;return((e=g.selected)==null?void 0:e.id)??null},neighborCacheSize:()=>g.neighborCache.size,surpriseQueueSize:()=>g.surpriseQueue.length,surpriseReadyCount:()=>g.surpriseQueue.length,scatterPointCount:()=>{var e,t;return((t=(e=g.scatterPointCache)==null?void 0:e.shells)==null?void 0:t.length)||0},starredHydratedCount:()=>g.starredHydratedCount,screenNeighborScanCount:()=>g.screenNeighborScanCount,resetScreenNeighborScanCount:()=>{g.screenNeighborScanCount=0},sourceMode:()=>g.sourceMode,filteredCount:()=>g.filtered.length,diametricPairs:()=>{var e;return((e=g.model)==null?void 0:e.contour_pca_diametric_pairs)||[]},lookupConservationStatus:T$,conservationStatusForSelected:()=>xs(g.selected),selectSpecies:e=>{const t=g.shells.find(n=>n.species===e);return t&&Qt(t),(t==null?void 0:t.id)??null}};async function M$(){c$(),Mo("Opening fingerprint data");const{model:e,shells:t}=await av();g.model=e,g.shells=t,g.shellById=new Map(g.shells.map(p=>[p.id,p])),Yv(),O2(g.shells,null,null),Fn(),g.filtered=g.shells,g.contours=null,g.contourPoints=e.contour_points||0,g.contourScale=e.contour_scale||1;const n=e.species_count?`${e.processed_count.toLocaleString()} shells, ${e.species_count.toLocaleString()} species`:`${e.processed_count.toLocaleString()} shells`;E.statusLine.textContent=n;const r=q_();L_.includes(r.get("color"))&&(g.colorMode=r.get("color")),Sh();const i=_s(),a=r.get("x"),o=r.get("y"),s=a==null?NaN:Number(a),l=o==null?NaN:Number(o);Number.isInteger(s)&&s>=0&&s<i&&(g.xAxis=s),Number.isInteger(l)&&l>=0&&l<i&&(g.yAxis=l),g.viewport=ki(g.xAxis,g.yAxis),E$(),I$(),Sh(),Cv(),E.statusLine.textContent=n,g.suppressHash=!0;const u=yi(r.get("id"))||g.shells[0];Qt(u,{renderNearest:!1});const c=(r.get("pc")||"").split(",").filter(p=>p.trim()!=="").map(p=>Number(p)).filter(p=>Number.isFinite(p));c.length&&Us(c.slice(0,6),!1),g.suppressHash=!1,g.hashReady=!0,Ci(),Un(),We(),rf(),Mo("",!1),g.starredIds.length&&Av(),af()}function A$(){h_(),M$().catch(e=>{E.statusLine.textContent=e.message,Mo("",!1),E.missingData&&(E.missingData.hidden=!1),console.error(e)})}const N$=Object.freeze(Object.defineProperty({__proto__:null,startShellspace:A$},Symbol.toStringTag,{value:"Module"}));
