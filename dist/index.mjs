var t={},e=null,s=null;function i(t){var s=r(e.body);return{top:r(t).top-s.top}}function r(t){return t.getBoundingClientRect()}function l(){var t=navigator.userAgent.toLowerCase();return-1!=t.indexOf("safari")&&!(t.indexOf("chrome")>-1)}function o(){return"ontouchstart"in window||navigator.maxTouchPoints>0}class a{parseOffset(t,e="0,0",s,i=16){let r=e.split(",");1===r.length&&(r=[r[0],r[0]]);let l=r.map((e=>(e=e.trim()).startsWith("calc")?this.parseCalculation(e,t,s,i):this.parseSingleValue(e,t,s,i)));return l}parseSingleValue(t,e,s,i){let r,l=t.startsWith("-");if(l&&(t=t.slice(1)),"selfHeight"===t)r=e.offsetHeight;else if(t.endsWith("px"))r=parseFloat(t);else if(t.endsWith("%"))r=parseFloat(t)*s/100;else{if(!t.endsWith("rem"))throw new Error(`Unknown format offset: ${t}`);r=parseFloat(t)*i}return l?-r:r}parseCalculation(t,e,s,i){let r=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return r.reduce(((t,l,o)=>{if("-"===l||"+"===l)return t;{let a=this.parseSingleValue(l.trim(),e,s,i);return"-"===r[o-1]?t-a:t+a}}),0)}parseOrigin(t){null!=t&&""!=t||(t="center center");const e=t.split(" ");return`${this.parseOriginPart(e[0])} ${this.parseOriginPart(e[1]||e[0])}`}parseOriginPart(t){if((t=t.trim()).startsWith("random")){const e=t.slice(7,-1).split(",").map((t=>t.trim()));return e.forEach((t=>this.validateOrigin(t))),e[Math.floor(Math.random()*e.length)]}return this.validateOrigin(t),t}validateOrigin(t){if(!["top","center","bottom","left","right"].includes(t))throw new Error(`Invalid origin option: ${t}`)}}class n{constructor(){this.t=0,this.c=0,this.d=0,this.bS=0,this.cF=1}}class h{constructor(){this.data=new n,this.sAccelerate=.05,this.sDecelerate=.05,this.isProg=!1,this.velocity=0}onAnimationFrame(){}onWheel(t){}onScroll(t){this.data.c=e.documentElement.scrollTop,this.data.t=e.documentElement.scrollTop,this.data.d=0}onResize(){}}class c{constructor(){this.data=new n,this.sAccelerate=.05,this.sDecelerate=.05,this.isProg=!1,this.velocity=0}onAnimationFrame(){this.velocity=(this.data.t-this.data.c)*this.sAccelerate*(1-this.sDecelerate),this.velocity>.1||this.velocity<-.1?(this.data.c+=this.velocity,this.isProg=!0):(this.velocity=0,this.isProg=!1),window.scrollTo(0,this.data.c)}onWheel(t){t.preventDefault(),this.data.d=t.deltaY,this.data.t+=this.data.d,this.data.t=Math.max(this.data.t,0),this.data.t=Math.min(this.data.t,this.data.bS)}onScroll(t){t.preventDefault(),0==this.isProg&&(this.data.c=e.documentElement.scrollTop,this.data.t=e.documentElement.scrollTop,this.data.d=0,window.scrollTo(0,this.data.t))}onResize(){}}class d{constructor(){this.data=new n,this.sAccelerate=.05,this.sDecelerate=.05,this.isProg=!1,this.velocity=0}onAnimationFrame(){}onWheel(t){}onScroll(t){t.preventDefault()}onResize(){}}class g{constructor(){this.activeProgressEls=new Array,this.activeParallaxEls=new Array,this.stickyObj=new Array,this.progressObj=new Array,this.activeProgressObj=new Array,this.activeProgressFullObj=new Array,this.scrollObj=new Array,this.activeParallaxObj=new Array,this.parallaxObj=new Array,this.onScrollEvents=new Array,this.stEvent=new Map,this.prEvent=new Map,this.prxEvent=new Map,this.prScrollEvent=new Map,this.prStartEvent=new Map,this.prEndEvent=new Map,this.stScrollEvent=new Map,this.observers=[],this.sf=1,this.f=1,this.stateName="",this.disableRecalculate=!1,this.overflowCurrent=0,this.isEnabled=!0,this.isProgressEnable=!0,this.isStickyEnable=!0,this.isParallaxEnable=!0,this.scrollEngeneeDesktop=new c,this.scrollEngeneeMobile=new h,this.scrollEngeneeDisable=new d,this.mobileScrollMode="default",this.desktopScrollMode="desktop",e=document,s=window,this.wHeight=s.innerHeight,this.wWidth=s.innerWidth,this.parser=new a,this.scrollEngenee=this.scrollEngeneeDesktop,this.initElementsFromDOM(),s.addEventListener("resize",(()=>{this.onResize()})),this.wheelBindFunc=this.onWheel.bind(this),this.scrollBindFunc=this.onScroll.bind(this),this.defaultScrollBindFunc=this.onDefaultScroll.bind(this),document.body.addEventListener("wheel",this.wheelBindFunc,{passive:!1}),s.addEventListener("scroll",this.scrollBindFunc,{passive:!1}),this.onAnimationFrame(),this.sendElements(),this.onIntersectionObserver(),this.onResize(),this.onMutationObserver(),document.documentElement.classList.add("string-scroll"),document.documentElement.classList.add("string-smoothy")}static getInstance(){return g.instance||(g.instance=new g),g.instance}initElementsFromDOM(){this.scrollEls=e.querySelectorAll("[data-string]"),this.progressEls=e.querySelectorAll("[data-string-progress]"),this.stickyEls=e.querySelectorAll("[data-string-sticky-progress]"),this.parralaxEls=e.querySelectorAll("[data-string-parallax]"),this.lerpEls=e.querySelectorAll("[data-lerp]")}onChangePage(){this.scrollEngenee.data.c=0,this.scrollEngenee.data.t=0,window.scrollTo(0,this.scrollEngenee.data.c),this.initElementsFromDOM(),this.sendElements(),this.onIntersectionObserver()}setMobileMode(t){this.mobileScrollMode=t}setDesktopMode(t){this.desktopScrollMode=t}disableScroll(){this.scrollEngenee=this.scrollEngeneeDisable}enableScroll(){s.innerWidth<1024||o()?this.setScrollMode(this.mobileScrollMode):this.setScrollMode(this.desktopScrollMode)}setSpeedAccelerate(t){this.scrollEngeneeDesktop.sAccelerate=t}setSpeedDecelerate(t){this.scrollEngeneeDesktop.sDecelerate=t}setScrollFactor(t){this.f=t,l()?this.scrollEngeneeDesktop.data.cF=this.f*this.sf:this.scrollEngeneeDesktop.data.cF=this.f}setSafariFactor(t){this.sf=t,l()?this.scrollEngeneeDesktop.data.cF=this.f*this.sf:this.scrollEngeneeDesktop.data.cF=this.f}on(t,e){"scroll"===t&&this.onScrollEvents.push(e)}setScrollMode(t){switch(this.stateName=t,t){case"desktop":this.scrollEngenee=this.scrollEngeneeDesktop;break;case"default":this.scrollEngenee=this.scrollEngeneeMobile;break;case"disable":this.scrollEngenee=this.scrollEngeneeDisable}}enableById(){}disableById(t){function e(e){e.id==t&&(e.disabled=!0,e.el.setAttribute("data-string-disabled",""))}this.progressObj.forEach(e),this.parallaxObj.forEach(e),this.activeProgressObj.forEach(e)}enableProgress(){this.isProgressEnable=!0}enableSticky(){this.isStickyEnable=!0}enableParallax(){this.isParallaxEnable=!0}disableProgress(){this.isProgressEnable=!1}disableSticky(){this.isStickyEnable=!1}disableParallax(){this.isParallaxEnable=!1}onStickyEvent(t,e){this.stEvent.set(t,e)}onProgress(t,e){0==this.prEvent.has(t)&&this.prEvent.set(t,[]),this.prEvent.get(t).push(e)}onScrollProgress(t,e){this.prScrollEvent.set(t,e)}onStartProgress(t,e){this.prStartEvent.set(t,e)}onEndProgress(t,e){this.prEndEvent.set(t,e)}onParallax(t,e){this.prxEvent.set(t,e)}onScrollSticky(t,e){this.stScrollEvent.set(t,e)}onWheel(t){this.disableRecalculate?t.preventDefault():this.scrollEngenee.onWheel(t)}onMutationObserver(){new MutationObserver((t=>{t.forEach((t=>{if("childList"===t.type){let t=e.body,s=e.documentElement,i=Math.max(t.scrollHeight,t.offsetHeight,s.clientHeight,s.scrollHeight,s.offsetHeight);this.scrollEngenee.data.bS=i-this.wHeight,this.initElementsFromDOM(),this.sendElements(),this.onIntersectionObserver(),this.recalculate()}}))})).observe(document.body,{attributes:!0,childList:!0,subtree:!0})}onScroll(t){this.scrollEngenee.onScroll(t),this.recalculate(),this.onScrollEvents.forEach((t=>{t(e.documentElement.scrollTop)}))}onDefaultScroll(t){this.scrollEngenee.data.c=e.documentElement.scrollTop,this.scrollEngenee.data.t=e.documentElement.scrollTop,this.recalculate(),this.onScrollEvents.forEach((t=>{t(e.documentElement.scrollTop)}))}onIntersectionObserver(){this.observers.forEach((t=>{t.disconnect()})),this.observers=[];let t=t=>{t.forEach((t=>{t.isIntersecting?t.target.classList.add("-inview"):null!=t.target.getAttribute("data-string-repeat")&&t.target.classList.remove("-inview")}))};this.scrollObj.forEach((e=>{let s={root:null,rootMargin:`${-1*e.oTop}px 0px ${-1*e.oBottom}px 0px`,threshold:.01},i=new IntersectionObserver(t,s);i.observe(e.el),this.observers.push(i)}));let e=t=>{t.forEach((t=>{if(t.isIntersecting)this.activeProgressEls.includes(t.target)||(this.activeProgressEls.push(t.target),this.sendElements());else{let e=this.activeProgressEls.indexOf(t.target);-1!==e&&(this.activeProgressEls.splice(e,1),this.sendElements())}}))};this.progressObj.forEach((t=>{let s={root:null,rootMargin:`${1*t.oTop+1.5*this.wHeight}px 0px ${1*t.oBottom+1.5*this.wHeight}px 0px`,threshold:.001},i=new IntersectionObserver(e,s);i.observe(t.el),this.observers.push(i)}));let s=t=>{t.forEach((t=>{if(t.isIntersecting)this.activeParallaxEls.includes(t.target)||(this.activeParallaxEls.push(t.target),this.sendElements());else{let e=this.activeParallaxEls.indexOf(t.target);-1!==e&&(this.activeParallaxEls.splice(e,1),this.sendElements())}}))};this.parallaxObj.forEach((t=>{let e={root:null,rootMargin:`${1*t.oTop+10}px 0px ${1*t.oBottom+10}px 0px`,threshold:.001},i=new IntersectionObserver(s,e);i.observe(t.el),this.observers.push(i)}))}overflowHidden(){this.disableRecalculate=!0,this.overflowCurrent=this.scrollEngenee.data.c;const t=document.getElementById("string-scroll-layout");t&&(t.style.transform=`translateY(-${this.scrollEngenee.data.c}px)`)}overflowAuto(){const t=document.getElementById("string-scroll-layout");t&&(t.style.transform="translateY(0px)"),this.scrollEngenee.data.c=this.overflowCurrent,this.scrollEngenee.data.t=this.overflowCurrent,this.disableRecalculate=!1,setTimeout((()=>{window.scrollTo(0,this.scrollEngenee.data.c)}),10)}onAnimationFrame(){let t=()=>{this.scrollEngenee.onAnimationFrame(),requestAnimationFrame(t)};requestAnimationFrame(t)}recalculate(){this.disableRecalculate||(this.isStickyEnable&&this.stickyObj.forEach((t=>{if(t.disabled)return;let e=r(t.parent),s=0,l=i(t.parent).top-this.scrollEngenee.data.c,o=l+e.height;s=o<0?1:l>this.wHeight?0:1-o/(e.height+this.wHeight),t.el.style.setProperty("--string-sticky-progress",s),this.eStic(t.id,s)})),this.isProgressEnable&&this.activeProgressObj.forEach((t=>{if(t.disabled)return;let e=(this.scrollEngenee.data.c-t.startProgressPosition)/(t.endProgressPosition-t.startProgressPosition);e>1&&(e=1,this.eEndProg(t.id,e)),e<0&&(e=0,this.eStartProg(t.id,e)),t.el.style.setProperty("--string-progress",e),t.oldValue!=e&&this.prEvent.has(t.id)&&this.prEvent.get(t.id).forEach((t=>{t(e)})),this.eScrollProg(t.id,t.oTop-this.scrollEngenee.data.c+this.wHeight),t.oldValue=e})),this.isParallaxEnable&&this.activeParallaxObj.forEach((t=>{if(t.disabled)return;let e=(this.scrollEngenee.data.c-t.startProgressPosition)/(t.endProgressPosition-t.startProgressPosition);e>1&&(e=1),e<0&&(e=0),t.el.style.transform=`translateY(${e*t.parallaxFactor*this.wHeight}px)`,this.eParallax(t.id,e)})))}eStic(t,e){this.stEvent.has(t)&&this.stEvent.get(t)(e)}eScrollProg(t,e){this.prScrollEvent.has(t)&&this.prScrollEvent.get(t)(e)}eStartProg(t,e){this.prStartEvent.has(t)&&this.prStartEvent.get(t)(e)}eEndProg(t,e){this.prEndEvent.has(t)&&this.prEndEvent.get(t)(e)}eParallax(t,e){this.prxEvent.has(t)&&this.prxEvent.get(t)(e)}sendElements(){this.stickyObj=Array.from(this.stickyEls).map((t=>({el:t,top:t.getAttribute("data-offset-top"),height:t.getAttribute("data-offset-height"),disabled:null!=t.getAttribute("data-string-disabled"),id:t.getAttribute("data-string-id"),parent:null==t?null:t.parentNode}))),this.progressObj=Array.from(this.progressEls).map((t=>{r(t);var e=t.getAttribute("data-string-offset"),s=null==e?[0,0]:this.parser.parseOffset(t,e,this.wHeight);return{el:t,oTop:s[0],oBottom:s[1]}})),this.activeProgressObj=Array.from(this.activeProgressEls).map((t=>{var e=r(t),s=t.getAttribute("data-string-offset"),l=null==s?[0,0]:this.parser.parseOffset(t,s,this.wHeight);let o={el:t,top:i(t).top,bottom:i(t).top+e.height,height:e.height,oTop:l[0],oBottom:l[1],start:null==t.getAttribute("data-string-start")?1:t.getAttribute("data-string-start"),end:null==t.getAttribute("data-string-end")?1:t.getAttribute("data-string-end"),id:t.getAttribute("data-string-id"),disabled:null!=t.getAttribute("data-string-disabled"),oldValue:0,divisor:this.wHeight-l[0]-l[1]-e.height,divisorFull:e.height+this.wHeight,startProgressPosition:1,endProgressPosition:1};return o.startProgressPosition=o.start*(o.top-this.wHeight-o.oTop)+(1-o.start)*(o.top+o.height+o.oBottom-this.wHeight),o.endProgressPosition=o.end*(o.top+o.height+o.oBottom)+(1-o.end)*(o.top-o.oTop),o})),this.parallaxObj=Array.from(this.parralaxEls).map((t=>{r(t);var e=t.getAttribute("data-string-offset"),s=null==e?[0,0]:this.parser.parseOffset(t,e,this.wHeight);return{el:t,oTop:s[0],oBottom:s[1]}})),this.activeParallaxObj=Array.from(this.activeParallaxEls).map((t=>{var e=r(t),s=t.getAttribute("data-string-offset"),l=null==s?[0,0]:this.parser.parseOffset(t,s,this.wHeight),o=t.getAttribute("data-string-parallax");let a={el:t,top:i(t).top,bottom:i(t).top+e.height,height:e.height,oTop:l[0],oBottom:l[1],start:null==t.getAttribute("data-string-start")?1:t.getAttribute("data-string-start"),end:null==t.getAttribute("data-string-end")?1:t.getAttribute("data-string-end"),id:t.getAttribute("data-string-id"),disabled:null!=t.getAttribute("data-string-disabled"),parallaxFactor:o,oldValue:0,divisor:this.wHeight-l[0]-l[1]-e.height,divisorFull:e.height+this.wHeight,startProgressPosition:1,endProgressPosition:1};return a.startProgressPosition=a.top-this.wHeight+(a.start*(a.height+a.oTop)-(1-a.start)*a.oTop),a.endProgressPosition=a.top+(a.end*(a.height+a.oBottom)-(1-a.end)*a.oBottom),a})),this.scrollObj=Array.from(this.scrollEls).map((t=>{var e=r(t),s=t.getAttribute("data-string-offset"),l=null==s?[0,0]:this.parser.parseOffset(t,s,this.wHeight);return{el:t,top:i(t).top,height:e.height,oTop:l[0],oBottom:l[1],disabled:null!=t.getAttribute("data-string-disabled")}}))}initEl(t,e=!1){var s=r(t);e&&(t.style.setProperty("--string-progress",0),t.setAttribute("data-offset-top",i(t).top),t.setAttribute("data-offset-height",s.height));var l=t.getAttribute("data-string-origin");null!=l&&(t.style.transformOrigin=this.parser.parseOrigin(l))}onResize(){this.stickyEls.forEach((t=>{this.initEl(t,!0)})),this.progressEls.forEach((t=>{this.initEl(t,!0)})),this.scrollEls.forEach((t=>{this.initEl(t)})),this.sendElements(),s.innerWidth<1024||o()?this.setScrollMode(this.mobileScrollMode):this.setScrollMode(this.desktopScrollMode),this.wWidth!=s.innerWidth&&(this.wWidth=s.innerWidth,this.wHeight=s.innerHeight);let t=e.body,i=e.documentElement,r=Math.max(t.scrollHeight,t.offsetHeight,i.clientHeight,i.scrollHeight,i.offsetHeight);this.scrollEngenee.data.bS=r-this.wHeight,this.onIntersectionObserver()}}t.Z=g;var p=t.Z;export{p as default};