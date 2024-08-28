!function(t,s){if("object"==typeof exports&&"object"==typeof module)module.exports=s();else if("function"==typeof define&&define.amd)define([],s);else{var e=s();for(var i in e)("object"==typeof exports?exports:t)[i]=e[i]}}(this,(()=>(()=>{"use strict";var t={344:(t,s,e)=>{e.d(s,{StringAnimation:()=>c});var i=e(351);function o(t){return t.getBoundingClientRect()}class n{static getInstance(){return n.i||(n.i=new n),n.i}parseOffset(t,s="0,0",e,i=16){let o=s.split(",");return 1===o.length&&(o=[o[0],o[0]]),o.map((s=>(s=s.trim()).startsWith("calc")?this.parseCalc(s,t,e,i):this.parseSingle(s,t,e,i)))}parseSingle(t,s,e,i){let o,n=t.startsWith("-");return n&&(t=t.slice(1)),"selfHeight"===t?o=s.offsetHeight:t.endsWith("px")?o=parseFloat(t):t.endsWith("%")?o=parseFloat(t)*e/100:t.endsWith("rem")&&(o=parseFloat(t)*i),n?-o:o}parseCalc(t,s,e,i){let o=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return o.reduce(((t,n,r)=>{if("-"===n||"+"===n)return t;{let a=this.parseSingle(n.trim(),s,e,i);return"-"===o[r-1]?t-a:t+a}}),0)}parseOrigin(t){null!=t&&""!=t||(t="center center");const s=t.split(" ");return`${this.parseOrig(s[0])} ${this.parseOrig(s[1]||s[0])}`}parseOrig(t){if((t=t.trim()).startsWith("random")){const s=t.slice(7,-1).split(",").map((t=>t.trim()));return s[Math.floor(Math.random()*s.length)]}return t}parseCoords(t){let s=o(document.body);return{top:o(t).top-s.top}}}var r=e(881);const a="top",l="bottom";class h{constructor(t,s,e,i){this.progress=0,this.connects=new Array,this.showObserver=null,this.progressObserver=null;let h=o(t),c=window.innerHeight,d=(0,r.L)(t,"data-string-offset"),m=null==d?[0,0]:n.getInstance().parseOffset(t,d,c),p=h.height;this.el=t,this.key=(0,r.L)(t,"data-string-key",s),this.factor=(0,r.L)(t,e,1),this.progress=Number.parseFloat((0,r.L)(this.el,i,0)),this.top=n.getInstance().parseCoords(t).top,this.bottom=n.getInstance().parseCoords(t).top+p,this.height=p,this.oTop=m[0],this.oBottom=m[1],this.start=(0,r.L)(t,"data-string-start",1),this.end=(0,r.L)(t,"data-string-end",1),this.id=(0,r.L)(t,"data-string-id"),this.enabled=null==(0,r.L)(t,"data-string-enabled"),this.startPos=1,this.endPos=1,this.differencePos=1;let u=(0,r.L)(t,"data-string-start")||"top bottom",g=(0,r.L)(t,"data-string-end")||"bottom top",[b,E]=u.split(" "),[v,f]=g.split(" ");this.sElPos=b,this.sScrPos=E,this.eElPos=v,this.eScrPos=f,b==a&&E==a?this.startPos=this.top-this.oTop:b==a&&E==l?this.startPos=this.top-c-this.oTop:b==l&&E==a?this.startPos=this.top+this.height-this.oTop:b==l&&E==l&&(this.startPos=this.top-c-this.oTop),v==a&&f==a?this.endPos=this.top+this.oBottom:v==a&&f==l?this.endPos=this.top-c+this.oBottom:v==l&&f==a?this.endPos=this.top+this.height+this.oBottom:v==l&&f==l&&(this.endPos=this.top-c+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress;let S=(0,r.L)(this.el,"data-string-origin");null!=S&&(this.el.style.transformOrigin=n.getInstance().parseOrigin(S))}resize(t){let s=this.el,e=o(s).height;this.el=s,this.top=n.getInstance().parseCoords(s).top,this.bottom=n.getInstance().parseCoords(s).top+e,this.height=e,this.start=(0,r.L)(s,"data-string-start",1),this.end=(0,r.L)(s,"data-string-end",1),this.sElPos==a&&this.sScrPos==a?this.startPos=this.top-this.oTop:this.sElPos==a&&this.sScrPos==l?this.startPos=this.top-t-this.oTop:this.sElPos==l&&this.sScrPos==a?this.startPos=this.top+this.height-this.oTop:this.sElPos==l&&this.sScrPos==l&&(this.startPos=this.top-t-this.oTop),this.eElPos==a&&this.eScrPos==a?this.endPos=this.top+this.oBottom:this.eElPos==a&&this.eScrPos==l?this.endPos=this.top-t+this.oBottom:this.eElPos==l&&this.eScrPos==a?this.endPos=this.top+this.height+this.oBottom:this.eElPos==l&&this.eScrPos==l&&(this.endPos=this.top-t+this.height+this.oBottom),this.differencePos=this.endPos-this.startPos,this.offsetTop=this.top-this.progress}}class c{get key(){return this._key}get status(){return this._status}set status(t){this._status=t,this._status?this.onScrollEvent=t=>{this.objectsArray.forEach((s=>{if(null!=this.onScroll&&s.enabled){let e=this.onScroll(s,t);s.progress=e,this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress),s.el.style.setProperty(s.key,e.toString()),s.connects.forEach((t=>{t.progress=e,t.el.style.setProperty(s.key,e.toString()),this.eventManager.emit(`progress_${s.key}_${s.id}`,s.progress)}))}}))}:this.onScrollEvent=t=>{}}constructor(t="",s="",e="",o="data-string-progress-value"){this._status=!0,this.onScrollEvent=t=>{},this.id=1,this.objectsMap=new Map,this.objectsArray=new Array,this.allObjects=new Map,this.onUpdate=null,this.onScroll=null,this.onEnter=(t,s)=>{},this.onLeave=(t,s)=>{},this.eventManager=new i.Q,this._key=t,this.progressKey=s,this.progressFactorKey=e,this.bufferProgressKey=o,this.status=!0}get(t){return this.objectsMap.has(t)?this.objectsMap.get(t):void 0}init(){let t=document.querySelectorAll(`[${this._key}]:not([data-string-connect]):not([${this._key}-inited])`);Array.from(t).forEach((t=>{this.addObject(t)}));let s=document.querySelectorAll("[data-string-connect]");Array.from(s).forEach((t=>{var s;let e=(0,r.L)(t,"data-string-connect");if(this.objectsMap.has(e)){t.setAttribute("data-string-id",(0,r.L)(t,"data-string-id",`string-progress-${this.id}`));let i=new h(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);null===(s=this.objectsMap.get(e))||void 0===s||s.connects.push(i)}}))}resize(){let t=window.innerHeight;Array.from(this.allObjects).map((([s,e])=>{e.resize(t)}))}removeObject(t){let s=this.objectsMap.get(t);null!=(null==s?void 0:s.showObserver)&&(null==s||s.showObserver.disconnect()),null!=(null==s?void 0:s.progressObserver)&&(null==s||s.progressObserver.disconnect()),this.objectsMap.delete(t),this.allObjects.delete(t),s=void 0}addObject(t){let s=window.innerHeight;t.setAttribute("data-string-id",(0,r.L)(t,"data-string-id",`string-progress-${this.id}`)),t.classList.add((0,r.L)(t,"data-string-id",`string-progress-${this.id}`)),t.setAttribute(`${this._key}-inited`,!0);let e=new h(t,this.progressKey,this.progressFactorKey,this.bufferProgressKey);this.allObjects.set((0,r.L)(t,"data-string-id"),e),this.objectsMap.set((0,r.L)(t,"data-string-id"),e);let i={root:null,rootMargin:`${e.oTop+1.5*s}px 0px ${e.oBottom+1.5*s}px 0px`,threshold:.001},o={root:null,rootMargin:`${e.oTop}px 0px ${e.oBottom}px 0px`,threshold:.001},n=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting){let s=(0,r.L)(t.target,"data-string-id");this.objectsMap.set(s,e)}else{let s=(0,r.L)(t.target,"data-string-id");this.objectsMap.delete(s)}this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),i),a=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting?(this.eventManager.emit(`intersection_${e.key}_${e.id}`,!0),this.onEnter(e,null)):(this.eventManager.emit(`intersection_${e.key}_${e.id}`,!1),this.onLeave(e,null)),this.objectsArray=Array.from(this.objectsMap).map((([t,s])=>s))}))}),o);n.observe(t),a.observe(t),e.showObserver=a,e.progressObserver=n,this.id++}scrollEmit(t){this.onScrollEvent(t)}}},824:(t,s,e)=>{e.d(s,{StringAnimationData:()=>i});class i{constructor(){this.current=0,this.target=0,this.value=0}}},592:(t,s,e)=>{e.d(s,{StringLerpAnimation:()=>o});var i=e(344);class o extends i.StringAnimation{constructor(){super("data-string-lerp","--string-lerp",""),this.onScroll=(t,s)=>s.value}}},777:(t,s,e)=>{e.d(s,{StringParallaxAnimation:()=>o});var i=e(344);class o extends i.StringAnimation{constructor(){super("data-string-parallax","--string-parallax","data-string-parallax"),this.onScroll=(t,s)=>{let e=(t.offsetTop-s.current)*t.factor;return requestAnimationFrame((()=>{t.el.style.transform=`translateY(${e}px)`,t.connects.forEach((s=>{s.el.style.transform=`translateY(${t.progress*t.factor}px)`}))})),e}}}},975:(t,s,e)=>{e.d(s,{StringProgressAnimation:()=>o});var i=e(344);class o extends i.StringAnimation{constructor(){super("data-string-progress","--string-progress",""),this.onScroll=(t,s)=>Math.min(1,Math.max(0,(s.current-t.startPos)/t.differencePos))}}},669:(t,s,e)=>{e.d(s,{StringShowAnimation:()=>n});var i=e(881),o=e(344);class n extends o.StringAnimation{constructor(){super("data-string","",""),this.onEnter=(t,s=null)=>{t.el.classList.add("-inview")},this.onLeave=(t,s=null)=>{null!=(0,i.L)(t.el,"data-string-repeat")&&t.el.classList.remove("-inview")}}}},351:(t,s,e)=>{e.d(s,{Q:()=>i});class i{constructor(){this.events=new Map}on(t,s){var e;0==this.events.has(t)&&this.events.set(t,[]),null===(e=this.events.get(t))||void 0===e||e.push(s)}off(t,s){if(this.events.has(t)){let e=this.events.get(t);null!=e&&this.events.set(t,e.filter((t=>t!==s)))}}has(t){return this.events.has(t)}emit(t,s){var e;this.events.has(t)&&(null===(e=this.events.get(t))||void 0===e||e.forEach((t=>{t(s)})))}}},845:(t,s,e)=>{e.d(s,{StringScrollbar:()=>i});class i{constructor(){this.isScrollbarWillShow=!0,this.createScrollbar(),this.updateThumb(),this.addCustomStyles()}addCustomStyles(){const t=document.createElement("style");t.textContent="\n            ::-webkit-scrollbar {\n                width: 0px;\n            }\n            body {\n                -ms-overflow-style: none;  /* IE and Edge */\n                scrollbar-width: none;  /* Firefox */\n            }\n        ",document.head.appendChild(t)}createScrollbar(){this.scrollbar=document.createElement("div"),this.scrollbar.classList.add("scrollbar"),this.thumb=document.createElement("div"),this.thumb.classList.add("thumb"),this.scrollbar.appendChild(this.thumb),document.body.appendChild(this.scrollbar),this.addDragFunctionality(),this.addScrollListener()}resize(){const t=document.documentElement.scrollHeight,s=window.innerHeight,e=s/t*s;this.thumb.style.setProperty("--height",e+"px"),t<=s?this.scrollbar.classList.add("-hide"):this.scrollbar.classList.remove("-hide")}updateThumb(){const t=document.documentElement.scrollHeight,s=window.innerHeight;this.thumb.style.setProperty("--position",document.documentElement.scrollTop/t*s+"px")}addDragFunctionality(){let t,s,e=!1;this.thumb.addEventListener("mousedown",(i=>{e=!0,t=i.clientY,s=document.documentElement.scrollTop,document.body.style.userSelect="none",this.scrollbar.classList.add("-touch")})),document.addEventListener("mousemove",(i=>{if(!e)return;const o=i.clientY-t,n=s+o/window.innerHeight*document.documentElement.scrollHeight;document.documentElement.scrollTop=n,this.updateThumb()})),document.addEventListener("mouseup",(()=>{e=!1,document.body.style.userSelect="",this.hideScrollbar(),this.scrollbar.classList.remove("-touch")}))}addScrollListener(){document.addEventListener("scroll",(()=>{this.updateThumb(),this.showScrollbar(),this.hideScrollbar()}))}showScrollbar(){this.scrollbar.classList.add("-scroll")}hideScrollbar(){this.scrollTimeout&&clearTimeout(this.scrollTimeout),this.scrollTimeout=setTimeout((()=>{this.scrollbar.classList.remove("-scroll")}),1e3)}}},749:(t,s,e)=>{e.d(s,{StringScrollData:()=>i});class i{constructor(){this.t=0,this.c=0,this.d=0,this.bS=0,this.cF=1}}},663:(t,s,e)=>{e.d(s,{StringTracker:()=>i});class i{constructor(t=((...t)=>{})){this.trackedFunction=t,this.callCount=0}start(){this.createDisplayElement(),this.startTracking()}createDisplayElement(){this.displayElement=document.createElement("div"),this.displayElement.style.position="fixed",this.displayElement.style.bottom="10px",this.displayElement.style.right="10px",this.displayElement.style.backgroundColor="black",this.displayElement.style.color="green",this.displayElement.style.padding="5px 10px",this.displayElement.style.fontFamily="Arial, sans-serif",this.displayElement.style.fontSize="16px",this.displayElement.style.zIndex="1000",this.displayElement.setAttribute("data-fps","0"),document.body.appendChild(this.displayElement);const t=document.createElement("style");t.innerHTML="\n      [data-fps]::after {\n        content: attr(data-fps) ' FPS';\n        position: absolute;\n        bottom: 0;\n        right: 0;\n        background-color: black;\n        color: green;\n        padding: 5px 10px;\n        font-family: Arial, sans-serif;\n        font-size: 16px;\n        z-index: 1000;\n      }\n    ",document.head.appendChild(t)}startTracking(){this.intervalId=setInterval((()=>{this.displayElement.setAttribute("data-fps",`${this.callCount}`),this.callCount=0}),1e3)}getTrackedFunction(){return(...t)=>(this.callCount++,this.trackedFunction(...t))}stopTracking(){clearInterval(this.intervalId),document.body.removeChild(this.displayElement)}resize(){}}},881:(t,s,e)=>{function i(t,s,e=null){return null==t.getAttribute(s)?e:t.getAttribute(s)}e.d(s,{L:()=>i})}},s={};function e(i){var o=s[i];if(void 0!==o)return o.exports;var n=s[i]={exports:{}};return t[i](n,n.exports,e),n.exports}e.d=(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},e.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};return(()=>{e.r(i),e.d(i,{StringAnimation:()=>a.StringAnimation,StringAnimationData:()=>l.StringAnimationData,StringLerpAnimation:()=>h.StringLerpAnimation,StringParallaxAnimation:()=>c.StringParallaxAnimation,StringProgressAnimation:()=>d.StringProgressAnimation,StringScroll:()=>v,StringScrollData:()=>s.StringScrollData,StringScrollbar:()=>p.StringScrollbar,StringShowAnimation:()=>m.StringShowAnimation,StringTracker:()=>u.StringTracker,default:()=>v});var t=e(351),s=e(749);class o{constructor(t){this.data=new s.StringScrollData,this.sA=.13,this.sD=.04,this.isProg=!1,this.v=0,this.name="mobile",this.sC=0,this.vT=0,this.animateC=0,this.isParallaxEnabled=!1,this.d=t,this.updateScrollParams()}updateScrollParams(){}setSpeedAccelerate(t){this.sA=t}setSpeedDecelerate(t){this.sD=t}onAnimationFrame(){this.vT=this.d.documentElement.scrollTop-this.animateC,this.animateC=this.d.documentElement.scrollTop,this.v=this.vT}onWheel(t){}onScroll(t){this.data.c=this.d.documentElement.scrollTop,this.data.t=this.d.documentElement.scrollTop,this.data.d=0}}class n{constructor(t){this.data=new s.StringScrollData,this.sA=.13,this.sD=.04,this.isProg=!1,this.v=0,this.name="disable",this.sC=0,this.isParallaxEnabled=!1,this.d=t,this.updateScrollParams()}updateScrollParams(){}setSpeedAccelerate(t){this.sA=t}setSpeedDecelerate(t){this.sD=t}onAnimationFrame(){}onWheel(t){}onScroll(t){t.preventDefault()}}class r{constructor(t){this.data=new s.StringScrollData,this.sA=.13,this.sD=.04,this.isProg=!1,this.v=0,this.name="desktop",this.isParallaxEnabled=!0,this.sC=0,this.d=t,this.updateScrollParams()}updateScrollParams(){this.sC=this.sA*(1-this.sD)}setSpeedAccelerate(t){this.sA=t,this.updateScrollParams()}setSpeedDecelerate(t){this.sD=t,this.updateScrollParams()}onAnimationFrame(){this.v=(this.data.t-this.data.c)*this.sC,this.v>.15||this.v<-.15?(this.data.c=this.data.c+this.v,this.isProg=!0,document.documentElement.scrollTop=this.data.c):0!=this.v&&(this.v=0,this.data.c=this.data.t,this.isProg=!1,this.d.documentElement.scrollTop=this.data.c)}onWheel(t){0!=t.deltaY&&(t.preventDefault(),this.data.d=t.deltaY,this.data.t+=this.data.d,this.data.t=Math.min(Math.max(this.data.t,0),this.data.bS))}onScroll(t){t.preventDefault(),0==this.isProg&&(this.v=this.d.documentElement.scrollTop-this.data.c,this.data.c=this.d.documentElement.scrollTop,this.data.t=this.d.documentElement.scrollTop,this.data.d=0,window.scrollTo(0,this.data.t))}}var a=e(344),l=e(824),h=e(592),c=e(777),d=e(975),m=e(669),p=e(845),u=e(663);let g=null,b=null;function E(){return"ontouchstart"in window||navigator.maxTouchPoints>0}class v{get enabled(){return this._enabled}set enabled(t){this._enabled=t,this.animations.forEach((t=>{t.status=this._enabled})),this._enabled?(this.updateModeParams("smooth"),b.innerWidth<1024||E()?this.scrollMode=this.mMode:this.scrollMode=this.dMode):(this.sEn=this.sEnDisable,this.updateModeParams("disable"))}get scrollMode(){return this.mode}set scrollMode(t){switch(document.documentElement.classList.remove(`-${this.mode}`),this.mode=t,document.documentElement.classList.add(`-${this.mode}`),this.mode){case"smooth":this.sEn=this.sEnDesktop;break;case"default":this.sEn=this.sEnMobile;break;case"disable":this.sEnDisable.v=this.sEn.v,this.sEnDisable.data=this.sEn.data,this.sEn=this.sEnDisable}}get mobileScrollMode(){return this.mMode}set mobileScrollMode(t){this.mMode=t,this.updateModeParams(this.mMode)}get desktopScrollMode(){return this.dMode}set desktopScrollMode(t){this.dMode=t,this.updateModeParams(this.dMode)}updateModeParams(t){b.innerWidth<1024||E()?this.scrollMode=this.mMode:this.scrollMode=this.dMode,"disable"==t?document.documentElement.classList.add("-without-scrollbar"):document.documentElement.classList.remove("-without-scrollbar")}get speedAccelerate(){return this.sA}set speedAccelerate(t){this.sA=t,this.sEnDesktop.sA=t,this.sEnDisable.sA=t,this.sEnMobile.sA=t}get speedDecelerate(){return this.sD}set speedDecelerate(t){this.sD=t,this.sEnDesktop.sD=t,this.sEnDisable.sD=t,this.sEnMobile.sD=t}get scrollPosition(){return this.sEn.data.c}set scrollPosition(t){this.sEn.data.c=t,this.sEn.data.t=t,window.scrollTo(0,this.sEn.data.c)}constructor(){this.onScrollEvents=new Array,this.onScrollLerpEvents=new Array,this.sf=1,this.f=1,this.overflowCurrent=0,this.animations=new Array,this.eventManager=new t.Q,this.animationGlobalCycle=()=>{this.animationCycle()},this.animationCycle=()=>{},this._enabled=!0,this.mode="smooth",this.mMode="default",this.dMode="smooth",this.sA=.13,this.sD=.04,g=document,b=window,this.wH=b.innerHeight,this.wW=b.innerWidth,this.sEnDesktop=new r(g),this.sEnMobile=new o(g),this.sEnDisable=new n(g),this.sEn=this.sEnDesktop,b.addEventListener("resize",(()=>{this.onResize()})),this.wheelBindFunc=this.onWheel.bind(this),this.scrollBindFunc=this.onScroll.bind(this),document.body.addEventListener("wheel",this.wheelBindFunc,{passive:!1}),b.addEventListener("scroll",this.scrollBindFunc,{passive:!1}),document.documentElement.classList.add("string-scroll"),document.documentElement.classList.add("string-smoothy");const s=document.createElement("style");s.id="hide-scrollbar-style",document.documentElement.style.setProperty("--string-lerp","0"),s.textContent="\n        .-without-scrollbar::-webkit-scrollbar {\n            display: none;\n        }\n        .-without-scrollbar {\n            -ms-overflow-style: none; /* IE and Edge */\n            scrollbar-width: none; /* Firefox */\n        }\n    ",document.head.appendChild(s),document.addEventListener("keydown",(t=>{const s=document.activeElement;if("INPUT"!==s.tagName&&"TEXTAREA"!==s.tagName)switch(t.key){case"ArrowUp":this.sEn.data.t-=this.wH/3;break;case"ArrowDown":this.sEn.data.t+=this.wH/3}}))}static getInstance(){return v.i||(v.i=new v),v.i}scrollTo(t){this.sEn.data.t=t}off(t,s,e=""){switch(this.getObject(e),t){case"scroll":this.onScrollEvents=this.onScrollEvents.filter((t=>t!==s));break;case"progress":this.eventManager.off(`progress_${e}`,s);break;case"lerp":this.onScrollLerpEvents=this.onScrollLerpEvents.filter((t=>t!==s));break;case"intersection":console.log(`off: intersection_${e}`),this.eventManager.off(`intersection_${e}`,s)}}on(t,s,e=""){switch(this.getObject(e),t){case"scroll":this.onScrollEvents.push(s);break;case"progress":this.eventManager.on(`progress_${e}`,s);break;case"lerp":this.onScrollLerpEvents.push(s);break;case"intersection":console.log(`on: intersection_${e}`),this.eventManager.on(`intersection_${e}`,s)}}use(t){const s=new t;s instanceof a.StringAnimation&&(s.eventManager=this.eventManager,this.animations.push(s)),s instanceof p.StringScrollbar&&(this.scrollbar=s),s instanceof u.StringTracker&&(this.animationGlobalCycle=()=>{this.sEn.onAnimationFrame(),requestAnimationFrame(s.getTrackedFunction())},s.trackedFunction=this.animationGlobalCycle,s.start())}start(){this.onAnimationFrame(),this.onResize(),this.onMutationObserver(),this.animations.forEach((t=>{t.init()}))}forceUpdateParallax(){setTimeout((()=>{let t=g.body,s=g.documentElement,e=Math.max(t.scrollHeight,t.offsetHeight,s.clientHeight,s.scrollHeight,s.offsetHeight);this.sEn.data.bS=e-this.wH}),300)}setObjectStatus(t,s){let e=this.getObject(t);null!=e&&(e.enabled=s)}getObject(t){let s;return this.animations.forEach((e=>{let i=e.get(t);null!=i&&(s=i)})),s}onWheel(t){0!=this._enabled?this.sEn.onWheel(t):t.preventDefault()}onMutationObserver(){new MutationObserver((t=>{t.forEach((t=>{"childList"===t.type&&(t.removedNodes.length>0&&(t.removedNodes.forEach((t=>{t.nodeType===Node.ELEMENT_NODE&&this.animations.forEach((t=>{Array.from(t.allObjects).map((([s,e])=>{0==document.body.contains(e.el)&&t.removeObject(e.id)}))}))})),this.onResize()),t.addedNodes.length>0&&(this.animations.forEach((t=>{document.querySelectorAll(`[${t.key}]:not([data-string-connect]):not([${t.key}-inited])`).forEach((s=>{t.addObject(s)}))})),this.onResize()))}))})).observe(document.body,{attributes:!0,childList:!0,subtree:!0})}onScroll(t){this.sEn.onScroll(t),this.onScrollEvents.forEach((t=>{t(this.sEn.data.c)})),this.onScrollLerpEvents.forEach((t=>{t(this.sEn.v)})),this.animations.forEach((t=>{t.status&&t.scrollEmit({current:this.sEn.data.c,target:this.sEn.data.t,value:this.sEn.v})}))}onAnimationFrame(){this.animationCycle=()=>{this.sEn.onAnimationFrame(),requestAnimationFrame(this.animationGlobalCycle)},requestAnimationFrame(this.animationGlobalCycle)}onResize(){var t;null===(t=this.scrollbar)||void 0===t||t.resize(),this.animations.forEach((t=>{t.resize()})),b.innerWidth<1024||E()?this.scrollMode=this.mMode:this.scrollMode=this.dMode,this.wW!=b.innerWidth&&(this.wW=b.innerWidth,this.wH=b.innerHeight);let s=g.body,e=g.documentElement,i=Math.max(s.scrollHeight,s.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight);this.sEn.data.bS=i-this.wH}}})(),i})()));
//# sourceMappingURL=index.js.map