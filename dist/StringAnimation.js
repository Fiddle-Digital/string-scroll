(()=>{"use strict";var t={881:(t,s,e)=>{function i(t,s,e=null){return null==t.getAttribute(s)?e:t.getAttribute(s)}e.d(s,{L:()=>i})}},s={};function e(i){var r=s[i];if(void 0!==r)return r.exports;var o=s[i]={exports:{}};return t[i](o,o.exports,e),o.exports}e.d=(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},e.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};(()=>{e.r(i),e.d(i,{StringAnimation:()=>l});class t{constructor(){this.events=new Map}on(t,s){var e;0==this.events.has(t)&&this.events.set(t,[]),null===(e=this.events.get(t))||void 0===e||e.push(s)}has(t){return this.events.has(t)}emit(t,s){var e;this.events.has(t)&&(null===(e=this.events.get(t))||void 0===e||e.forEach((t=>{t(s)})))}}function s(t){return t.getBoundingClientRect()}class r{static getInstance(){return r.i||(r.i=new r),r.i}parseOffset(t,s="0,0",e,i=16){let r=s.split(",");return 1===r.length&&(r=[r[0],r[0]]),r.map((s=>(s=s.trim()).startsWith("calc")?this.parseCalc(s,t,e,i):this.parseSingle(s,t,e,i)))}parseSingle(t,s,e,i){let r,o=t.startsWith("-");return o&&(t=t.slice(1)),"selfHeight"===t?r=s.offsetHeight:t.endsWith("px")?r=parseFloat(t):t.endsWith("%")?r=parseFloat(t)*e/100:t.endsWith("rem")&&(r=parseFloat(t)*i),o?-r:r}parseCalc(t,s,e,i){let r=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return r.reduce(((t,o,n)=>{if("-"===o||"+"===o)return t;{let h=this.parseSingle(o.trim(),s,e,i);return"-"===r[n-1]?t-h:t+h}}),0)}parseOrigin(t){null!=t&&""!=t||(t="center center");const s=t.split(" ");return`${this.parseOrig(s[0])} ${this.parseOrig(s[1]||s[0])}`}parseOrig(t){if((t=t.trim()).startsWith("random")){const s=t.slice(7,-1).split(",").map((t=>t.trim()));return s[Math.floor(Math.random()*s.length)]}return t}parseCoords(t){let e=s(document.body);return{top:s(t).top-e.top}}}var o=e(881);const n="top",h="bottom";class a{constructor(t,e,i,a){this.progress=0,this.connects=new Array,this.showObserver=null,this.progressObserver=null;let l=s(t),p=window.innerHeight,c=(0,o.L)(t,"data-string-offset"),d=null==c?[0,0]:r.getInstance().parseOffset(t,c,p),g=l.height;this.el=t,this.key=(0,o.L)(t,"data-string-key",e),this.factor=(0,o.L)(t,i,1),this.progress=Number.parseFloat((0,o.L)(this.el,a,0)),this.top=r.getInstance().parseCoords(t).top,this.bottom=r.getInstance().parseCoords(t).top+g,this.height=g,this.oTop=d[0],this.oBottom=d[1],this.start=(0,o.L)(t,"data-string-start",1),this.end=(0,o.L)(t,"data-string-end",1),this.id=(0,o.L)(t,"data-string-id"),this.enabled=null==(0,o.L)(t,"data-string-enabled"),this.startPos=1,this.endPos=1,this.differencePos=1;let u=(0,o.L)(t,"data-string-start")||"top bottom",b=(0,o.L)(t,"data-string-end")||"bottom top",[f,P]=u.split(" "),[m,v]=b.split(" ");this.sElPos=f,this.sScrPos=P,this.eElPos=m,this.eScrPos=v,f==n&&P==n?this.startPos=this.top-this.oTop:f==n&&P==h?this.startPos=this.top-p-this.oTop:f==h&&P==n?this.startPos=this.top+this.height-this.oTop:f==h&&P==h&&(this.startPos=this.top-p-this.oTop),m==n&&v==n?this.endPos=this.top+this.oBottom:m==n&&v==h?this.endPos=this.top-p+this.oBottom:m==h&&v==n?this.endPos=this.top+this.height+this.oBottom:m==h&&v==h&&(this.endPos=this.top-p+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress;let y=(0,o.L)(this.el,"data-string-origin");null!=y&&(this.el.style.transformOrigin=r.getInstance().parseOrigin(y))}resize(t){let e=this.el,i=s(e).height;this.el=e,this.top=r.getInstance().parseCoords(e).top,this.bottom=r.getInstance().parseCoords(e).top+i,this.height=i,this.start=(0,o.L)(e,"data-string-start",1),this.end=(0,o.L)(e,"data-string-end",1),this.sElPos==n&&this.sScrPos==n?this.startPos=this.top-this.oTop:this.sElPos==n&&this.sScrPos==h?this.startPos=this.top-t-this.oTop:this.sElPos==h&&this.sScrPos==n?this.startPos=this.top+this.height-this.oTop:this.sElPos==h&&this.sScrPos==h&&(this.startPos=this.top-t-this.oTop),this.eElPos==n&&this.eScrPos==n?this.endPos=this.top+this.oBottom:this.eElPos==n&&this.eScrPos==h?this.endPos=this.top-t+this.oBottom:this.eElPos==h&&this.eScrPos==n?this.endPos=this.top+this.height+this.oBottom:this.eElPos==h&&this.eScrPos==h&&(this.endPos=this.top-t+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress}}class l{get key(){return this._key}get status(){return this._status}set status(t){this._status=t,this._status?this.onScrollEvent=t=>{this.objectsArray.forEach((s=>{if(null!=this.onScroll&&s.enabled){let e=this.onScroll(s,t);s.progress=e,this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress),s.el.style.setProperty(s.key,e.toString()),s.connects.forEach((t=>{t.progress=e,t.el.style.setProperty(s.key,e.toString()),this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress)}))}}))}:this.onScrollEvent=t=>{}}constructor(s="",e="",i="",r="data-string-progress-value"){this._status=!0,this.onScrollEvent=t=>{},this.id=1,this.objectsMap=new Map,this.objectsArray=new Array,this.allObjects=new Map,this.onUpdate=null,this.onScroll=null,this.onEnter=(t,s)=>{},this.onLeave=(t,s)=>{},this.eventManager=new t,this._key=s,this.progressKey=e,this.progressFactorKey=i,this.bufferProgressKey=r,this.status=!0}get(t){return this.objectsMap.has(t)?this.objectsMap.get(t):void 0}init(){let t=document.querySelectorAll(`[${this._key}]:not([data-string-connect]):not([data-string-inited])`);Array.from(t).forEach((t=>{this.addObject(t)}));let s=document.querySelectorAll("[data-string-connect]");Array.from(s).forEach((t=>{var s;let e=(0,o.L)(t,"data-string-connect");if(this.objectsMap.has(e)){t.setAttribute("data-string-id",(0,o.L)(t,"data-string-id",`string-progress-${this.id}`));let i=new a(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);null===(s=this.objectsMap.get(e))||void 0===s||s.connects.push(i)}}))}resize(){let t=window.innerHeight;Array.from(this.allObjects).map((([s,e])=>{e.resize(t)}))}removeObject(t){let s=this.objectsMap.get(t);null!=(null==s?void 0:s.showObserver)&&(null==s||s.showObserver.disconnect()),null!=(null==s?void 0:s.progressObserver)&&(null==s||s.progressObserver.disconnect()),this.objectsMap.delete(t),this.allObjects.delete(t),s=void 0}addObject(t){let s=window.innerHeight;t.setAttribute("data-string-id",(0,o.L)(t,"data-string-id",`string-progress-${this.id}`)),t.classList.add((0,o.L)(t,"data-string-id",`string-progress-${this.id}`)),t.setAttribute("data-string-inited",!0);let e=new a(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);this.allObjects.set((0,o.L)(t,"data-string-id"),e),this.objectsMap.set((0,o.L)(t,"data-string-id"),e);let i={root:null,rootMargin:`${e.oTop+1.5*s}px 0px ${e.oBottom+1.5*s}px 0px`,threshold:.001},r={root:null,rootMargin:`${e.oTop}px 0px ${e.oBottom}px 0px`,threshold:.001},n=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting){let s=(0,o.L)(t.target,"data-string-id");this.objectsMap.set(s,e)}else{let s=(0,o.L)(t.target,"data-string-id");this.objectsMap.delete(s)}this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),i),h=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting?(this.eventManager.emit(`intersection_${e.key}_${e.id}`,!0),this.onEnter(e,null)):(this.eventManager.emit(`intersection_${e.key}_${e.id}`,!1),this.onLeave(e,null)),this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),r);n.observe(t),h.observe(t),e.showObserver=h,e.progressObserver=n,this.id++}scrollEmit(t){this.onScrollEvent(t)}}})(),module.exports=i})();