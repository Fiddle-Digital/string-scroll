!function(t,s){if("object"==typeof exports&&"object"==typeof module)module.exports=s();else if("function"==typeof define&&define.amd)define([],s);else{var e=s();for(var r in e)("object"==typeof exports?exports:t)[r]=e[r]}}(this,(()=>(()=>{"use strict";var t={344:(t,s,e)=>{e.d(s,{StringAnimation:()=>p});var r=e(351);function i(t){return t.getBoundingClientRect()}class o{static getInstance(){return o.i||(o.i=new o),o.i}parseOffset(t,s="0,0",e,r=16){let i=s.split(",");return 1===i.length&&(i=[i[0],i[0]]),i.map((s=>(s=s.trim()).startsWith("calc")?this.parseCalc(s,t,e,r):this.parseSingle(s,t,e,r)))}parseSingle(t,s,e,r){let i,o=t.startsWith("-");return o&&(t=t.slice(1)),"selfHeight"===t?i=s.offsetHeight:t.endsWith("px")?i=parseFloat(t):t.endsWith("%")?i=parseFloat(t)*e/100:t.endsWith("rem")&&(i=parseFloat(t)*r),o?-i:i}parseCalc(t,s,e,r){let i=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return i.reduce(((t,o,n)=>{if("-"===o||"+"===o)return t;{let a=this.parseSingle(o.trim(),s,e,r);return"-"===i[n-1]?t-a:t+a}}),0)}parseOrigin(t){null!=t&&""!=t||(t="center center");const s=t.split(" ");return`${this.parseOrig(s[0])} ${this.parseOrig(s[1]||s[0])}`}parseOrig(t){if((t=t.trim()).startsWith("random")){const s=t.slice(7,-1).split(",").map((t=>t.trim()));return s[Math.floor(Math.random()*s.length)]}return t}parseCoords(t){let s=i(document.body);return{top:i(t).top-s.top}}}var n=e(881);const a="top",h="bottom";class l{constructor(t,s,e,r){this.progress=0,this.connects=new Array,this.showObserver=null,this.progressObserver=null;let l=i(t),p=window.innerHeight,c=(0,n.L)(t,"data-string-offset"),d=null==c?[0,0]:o.getInstance().parseOffset(t,c,p),g=l.height;this.el=t,this.key=(0,n.L)(t,"data-string-key",s),this.factor=(0,n.L)(t,e,1),this.progress=Number.parseFloat((0,n.L)(this.el,r,0)),this.top=o.getInstance().parseCoords(t).top,this.bottom=o.getInstance().parseCoords(t).top+g,this.height=g,this.oTop=d[0],this.oBottom=d[1],this.start=(0,n.L)(t,"data-string-start",1),this.end=(0,n.L)(t,"data-string-end",1),this.id=(0,n.L)(t,"data-string-id"),this.enabled=null==(0,n.L)(t,"data-string-enabled"),this.startPos=1,this.endPos=1,this.differencePos=1;let u=(0,n.L)(t,"data-string-start")||"top bottom",f=(0,n.L)(t,"data-string-end")||"bottom top",[b,m]=u.split(" "),[v,y]=f.split(" ");this.sElPos=b,this.sScrPos=m,this.eElPos=v,this.eScrPos=y,b==a&&m==a?this.startPos=this.top-this.oTop:b==a&&m==h?this.startPos=this.top-p-this.oTop:b==h&&m==a?this.startPos=this.top+this.height-this.oTop:b==h&&m==h&&(this.startPos=this.top-p-this.oTop),v==a&&y==a?this.endPos=this.top+this.oBottom:v==a&&y==h?this.endPos=this.top-p+this.oBottom:v==h&&y==a?this.endPos=this.top+this.height+this.oBottom:v==h&&y==h&&(this.endPos=this.top-p+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress;let P=(0,n.L)(this.el,"data-string-origin");null!=P&&(this.el.style.transformOrigin=o.getInstance().parseOrigin(P))}resize(t){let s=this.el,e=i(s).height;this.el=s,this.top=o.getInstance().parseCoords(s).top,this.bottom=o.getInstance().parseCoords(s).top+e,this.height=e,this.start=(0,n.L)(s,"data-string-start",1),this.end=(0,n.L)(s,"data-string-end",1),this.sElPos==a&&this.sScrPos==a?this.startPos=this.top-this.oTop:this.sElPos==a&&this.sScrPos==h?this.startPos=this.top-t-this.oTop:this.sElPos==h&&this.sScrPos==a?this.startPos=this.top+this.height-this.oTop:this.sElPos==h&&this.sScrPos==h&&(this.startPos=this.top-t-this.oTop),this.eElPos==a&&this.eScrPos==a?this.endPos=this.top+this.oBottom:this.eElPos==a&&this.eScrPos==h?this.endPos=this.top-t+this.oBottom:this.eElPos==h&&this.eScrPos==a?this.endPos=this.top+this.height+this.oBottom:this.eElPos==h&&this.eScrPos==h&&(this.endPos=this.top-t+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress}}class p{get key(){return this._key}get status(){return this._status}set status(t){this._status=t,this._status?this.onScrollEvent=t=>{this.objectsArray.forEach((s=>{if(null!=this.onScroll&&s.enabled){let e=this.onScroll(s,t);s.progress=e,this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress),s.el.style.setProperty(s.key,e.toString()),s.connects.forEach((t=>{t.progress=e,t.el.style.setProperty(s.key,e.toString()),this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress)}))}}))}:this.onScrollEvent=t=>{}}constructor(t="",s="",e="",i="data-string-progress-value"){this._status=!0,this.onScrollEvent=t=>{},this.id=1,this.objectsMap=new Map,this.objectsArray=new Array,this.allObjects=new Map,this.onUpdate=null,this.onScroll=null,this.onEnter=(t,s)=>{},this.onLeave=(t,s)=>{},this.eventManager=new r.Q,this._key=t,this.progressKey=s,this.progressFactorKey=e,this.bufferProgressKey=i,this.status=!0}get(t){return this.objectsMap.has(t)?this.objectsMap.get(t):void 0}init(){let t=document.querySelectorAll(`[${this._key}]:not([data-string-connect]):not([data-string-inited])`);Array.from(t).forEach((t=>{this.addObject(t)}));let s=document.querySelectorAll("[data-string-connect]");Array.from(s).forEach((t=>{var s;let e=(0,n.L)(t,"data-string-connect");if(this.objectsMap.has(e)){t.setAttribute("data-string-id",(0,n.L)(t,"data-string-id",`string-progress-${this.id}`));let r=new l(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);null===(s=this.objectsMap.get(e))||void 0===s||s.connects.push(r)}}))}resize(){let t=window.innerHeight;Array.from(this.allObjects).map((([s,e])=>{e.resize(t)}))}removeObject(t){let s=this.objectsMap.get(t);null!=(null==s?void 0:s.showObserver)&&(null==s||s.showObserver.disconnect()),null!=(null==s?void 0:s.progressObserver)&&(null==s||s.progressObserver.disconnect()),this.objectsMap.delete(t),this.allObjects.delete(t),s=void 0}addObject(t){let s=window.innerHeight;t.setAttribute("data-string-id",(0,n.L)(t,"data-string-id",`string-progress-${this.id}`)),t.classList.add((0,n.L)(t,"data-string-id",`string-progress-${this.id}`)),t.setAttribute("data-string-inited",!0);let e=new l(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);this.allObjects.set((0,n.L)(t,"data-string-id"),e),this.objectsMap.set((0,n.L)(t,"data-string-id"),e);let r={root:null,rootMargin:`${e.oTop+1.5*s}px 0px ${e.oBottom+1.5*s}px 0px`,threshold:.001},i={root:null,rootMargin:`${e.oTop}px 0px ${e.oBottom}px 0px`,threshold:.001},o=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting){let s=(0,n.L)(t.target,"data-string-id");this.objectsMap.set(s,e)}else{let s=(0,n.L)(t.target,"data-string-id");this.objectsMap.delete(s)}this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),r),a=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting?(this.eventManager.emit(`intersection_${e.key}_${e.id}`,!0),this.onEnter(e,null)):(this.eventManager.emit(`intersection_${e.key}_${e.id}`,!1),this.onLeave(e,null)),this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),i);o.observe(t),a.observe(t),e.showObserver=a,e.progressObserver=o,this.id++}scrollEmit(t){this.onScrollEvent(t)}}},351:(t,s,e)=>{e.d(s,{Q:()=>r});class r{constructor(){this.events=new Map}on(t,s){var e;0==this.events.has(t)&&this.events.set(t,[]),null===(e=this.events.get(t))||void 0===e||e.push(s)}has(t){return this.events.has(t)}emit(t,s){var e;this.events.has(t)&&(null===(e=this.events.get(t))||void 0===e||e.forEach((t=>{t(s)})))}}},881:(t,s,e)=>{function r(t,s,e=null){return null==t.getAttribute(s)?e:t.getAttribute(s)}e.d(s,{L:()=>r})}},s={};function e(r){var i=s[r];if(void 0!==i)return i.exports;var o=s[r]={exports:{}};return t[r](o,o.exports,e),o.exports}e.d=(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},e.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return(()=>{e.r(r),e.d(r,{StringParallaxAnimation:()=>s});var t=e(344);class s extends t.StringAnimation{constructor(){super("data-string-parallax","--string-parallax","data-string-parallax"),this.onScroll=(t,s)=>{let e=(t.offsetTop-s.current)*t.factor;return requestAnimationFrame((()=>{t.el.style.transform=`translateY(${e}px)`,t.connects.forEach((s=>{s.el.style.transform=`translateY(${t.progress*t.factor}px)`}))})),e}}}})(),r})()));
//# sourceMappingURL=StringParallaxAnimation.js.map