!function(t,s){if("object"==typeof exports&&"object"==typeof module)module.exports=s();else if("function"==typeof define&&define.amd)define([],s);else{var e=s();for(var i in e)("object"==typeof exports?exports:t)[i]=e[i]}}(this,(()=>(()=>{"use strict";var t={123:(t,s,e)=>{e.d(s,{StringAnimation:()=>p});var i=e(605);function r(t){return t.getBoundingClientRect()}class o{static getInstance(){return o.i||(o.i=new o),o.i}parseOffset(t,s="0,0",e,i=16){let r=s.split(",");return 1===r.length&&(r=[r[0],r[0]]),r.map((s=>(s=s.trim()).startsWith("calc")?this.parseCalc(s,t,e,i):this.parseSingle(s,t,e,i)))}parseSingle(t,s,e,i){let r,o=t.startsWith("-");return o&&(t=t.slice(1)),"selfHeight"===t?r=s.offsetHeight:t.endsWith("px")?r=parseFloat(t):t.endsWith("%")?r=parseFloat(t)*e/100:t.endsWith("rem")&&(r=parseFloat(t)*i),o?-r:r}parseCalc(t,s,e,i){let r=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return r.reduce(((t,o,n)=>{if("-"===o||"+"===o)return t;{let h=this.parseSingle(o.trim(),s,e,i);return"-"===r[n-1]?t-h:t+h}}),0)}parseOrigin(t){null!=t&&""!=t||(t="center center");const s=t.split(" ");return`${this.parseOrig(s[0])} ${this.parseOrig(s[1]||s[0])}`}parseOrig(t){if((t=t.trim()).startsWith("random")){const s=t.slice(7,-1).split(",").map((t=>t.trim()));return s[Math.floor(Math.random()*s.length)]}return t}parseCoords(t){let s=r(document.body);return{top:r(t).top-s.top}}}var n=e(899);const h="top",a="bottom";class l{constructor(t,s,e,i){this.progress=0,this.connects=new Array,this.showObserver=null,this.progressObserver=null;let l=r(t),p=window.innerHeight,c=(0,n.C)(t,"data-string-offset"),d=null==c?[0,0]:o.getInstance().parseOffset(t,c,p),g=l.height;this.el=t,this.key=(0,n.C)(t,"data-string-key",s),this.factor=(0,n.C)(t,e,1),this.progress=Number.parseFloat((0,n.C)(this.el,i,0)),this.top=o.getInstance().parseCoords(t).top,this.bottom=o.getInstance().parseCoords(t).top+g,this.height=g,this.oTop=d[0],this.oBottom=d[1],this.start=(0,n.C)(t,"data-string-start",1),this.end=(0,n.C)(t,"data-string-end",1),this.id=(0,n.C)(t,"data-string-id"),this.enabled=null==(0,n.C)(t,"data-string-enabled"),this.startPos=1,this.endPos=1,this.differencePos=1;let u=(0,n.C)(t,"data-string-start")||"top bottom",f=(0,n.C)(t,"data-string-end")||"bottom top",[b,y]=u.split(" "),[m,v]=f.split(" ");this.sElPos=b,this.sScrPos=y,this.eElPos=m,this.eScrPos=v,b==h&&y==h?this.startPos=this.top-this.oTop:b==h&&y==a?this.startPos=this.top-p-this.oTop:b==a&&y==h?this.startPos=this.top+this.height-this.oTop:b==a&&y==a&&(this.startPos=this.top-p-this.oTop),m==h&&v==h?this.endPos=this.top+this.oBottom:m==h&&v==a?this.endPos=this.top-p+this.oBottom:m==a&&v==h?this.endPos=this.top+this.height+this.oBottom:m==a&&v==a&&(this.endPos=this.top-p+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress;let P=(0,n.C)(this.el,"data-string-origin");null!=P&&(this.el.style.transformOrigin=o.getInstance().parseOrigin(P))}resize(t){let s=this.el,e=r(s).height;this.el=s,this.top=o.getInstance().parseCoords(s).top,this.bottom=o.getInstance().parseCoords(s).top+e,this.height=e,this.start=(0,n.C)(s,"data-string-start",1),this.end=(0,n.C)(s,"data-string-end",1),this.sElPos==h&&this.sScrPos==h?this.startPos=this.top-this.oTop:this.sElPos==h&&this.sScrPos==a?this.startPos=this.top-t-this.oTop:this.sElPos==a&&this.sScrPos==h?this.startPos=this.top+this.height-this.oTop:this.sElPos==a&&this.sScrPos==a&&(this.startPos=this.top-t-this.oTop),this.eElPos==h&&this.eScrPos==h?this.endPos=this.top+this.oBottom:this.eElPos==h&&this.eScrPos==a?this.endPos=this.top-t+this.oBottom:this.eElPos==a&&this.eScrPos==h?this.endPos=this.top+this.height+this.oBottom:this.eElPos==a&&this.eScrPos==a&&(this.endPos=this.top-t+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress}}class p{get key(){return this._key}get status(){return this._status}set status(t){this._status=t,this._status?this.onScrollEvent=t=>{this.objectsArray.forEach((s=>{if(null!=this.onScroll&&s.enabled){let e=this.onScroll(s,t);s.progress=e,this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress),s.el.style.setProperty(s.key,e.toString()),s.connects.forEach((t=>{t.progress=e,t.el.style.setProperty(s.key,e.toString()),this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress)}))}}))}:this.onScrollEvent=t=>{}}constructor(t="",s="",e="",r="data-string-progress-value"){this._status=!0,this.onScrollEvent=t=>{},this.id=1,this.objectsMap=new Map,this.objectsArray=new Array,this.allObjects=new Map,this.onUpdate=null,this.onScroll=null,this.onEnter=(t,s)=>{},this.onLeave=(t,s)=>{},this.eventManager=new i.E,this._key=t,this.progressKey=s,this.progressFactorKey=e,this.bufferProgressKey=r,this.status=!0}get(t){return this.allObjects.has(t)?this.allObjects.get(t):void 0}init(){let t=document.querySelectorAll(`[${this._key}]:not([data-string-connect]):not([${this._key}-inited])`);Array.from(t).forEach((t=>{this.addObject(t)}));let s=document.querySelectorAll("[data-string-connect]");Array.from(s).forEach((t=>{var s;let e=(0,n.C)(t,"data-string-connect");if(this.objectsMap.has(e)){t.setAttribute("data-string-id",(0,n.C)(t,"data-string-id",`${this._key}-${this.id}`));let i=new l(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);null===(s=this.objectsMap.get(e))||void 0===s||s.connects.push(i)}}))}resize(){let t=window.innerHeight;Array.from(this.allObjects).map((([s,e])=>{e.resize(t)}))}removeObject(t){let s=this.objectsMap.get(t);null!=(null==s?void 0:s.showObserver)&&(null==s||s.showObserver.disconnect()),null!=(null==s?void 0:s.progressObserver)&&(null==s||s.progressObserver.disconnect()),this.objectsMap.delete(t),this.allObjects.delete(t),s=void 0}addObject(t){window.innerHeight,t.setAttribute("data-string-id",(0,n.C)(t,"data-string-id",`${this._key}-${this.id}`)),t.classList.add((0,n.C)(t,"data-string-id",`${this._key}-${this.id}`)),t.setAttribute(`${this._key}-inited`,!0);let s=new l(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);this.allObjects.set((0,n.C)(t,"data-string-id"),s),this.objectsMap.set((0,n.C)(t,"data-string-id"),s);let e={root:null,rootMargin:`${1*s.oBottom+10}px 0px ${1*s.oTop+10}px 0px`,threshold:.001},i={root:null,rootMargin:`${s.oTop}px 0px ${s.oBottom}px 0px`,threshold:.001},r=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting){let e=(0,n.C)(t.target,"data-string-id",`${this._key}-${this.id}`);this.objectsMap.set(e,s)}else{let s=(0,n.C)(t.target,"data-string-id",`${this._key}-${this.id}`);this.objectsMap.delete(s)}this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),e),o=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting?(this.eventManager.emit(`intersection_${s.key}_${s.id}`,!0),this.onEnter(s,null)):(this.eventManager.emit(`intersection_${s.key}_${s.id}`,!1),this.onLeave(s,null)),this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),i);r.observe(t),o.observe(t),s.showObserver=o,s.progressObserver=r,this.id++}scrollEmit(t){this.onScrollEvent(t)}}},605:(t,s,e)=>{e.d(s,{E:()=>i});class i{constructor(){this.events=new Map}on(t,s){var e;0==this.events.has(t)&&this.events.set(t,[]),null===(e=this.events.get(t))||void 0===e||e.push(s)}has(t){return this.events.has(t)}emit(t,s){var e;this.events.has(t)&&(null===(e=this.events.get(t))||void 0===e||e.forEach((t=>{t(s)})))}off(t,s){let e=this.events.get(t);null!=e&&this.events.set(t,e.filter((t=>t!==s)))}}},899:(t,s,e)=>{function i(t,s,e=null){return null==t.getAttribute(s)?e:t.getAttribute(s)}e.d(s,{C:()=>i})}},s={};function e(i){var r=s[i];if(void 0!==r)return r.exports;var o=s[i]={exports:{}};return t[i](o,o.exports,e),o.exports}e.d=(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},e.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};e.r(i),e.d(i,{StringProgressAnimation:()=>o});var r=e(123);class o extends r.StringAnimation{constructor(){super("data-string-progress","--string-progress",""),this.onScroll=(t,s)=>Math.min(1,Math.max(0,(s.current-t.startPos)/t.differencePos))}}return i})()));
//# sourceMappingURL=StringProgressAnimation.js.map