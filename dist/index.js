(()=>{"use strict";var t={d:(s,e)=>{for(var i in e)t.o(e,i)&&!t.o(s,i)&&Object.defineProperty(s,i,{enumerable:!0,get:e[i]})},o:(t,s)=>Object.prototype.hasOwnProperty.call(t,s),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},s={};t.r(s),t.d(s,{StringScroll:()=>f});let e=null,i=null;const r="data-string-",o="top",a="bottom";function l(t,s,e=null){return null==t.getAttribute(s)?e:t.getAttribute(s)}function n(t){let s=h(e.body);return{top:h(t).top-s.top}}function h(t){return t.getBoundingClientRect()}function c(){let t=navigator.userAgent.toLowerCase();return-1!=t.indexOf("safari")&&!(t.indexOf("chrome")>-1)}function d(){return"ontouchstart"in window||navigator.maxTouchPoints>0}class p{parseOffset(t,s="0,0",e,i=16){let r=s.split(",");return 1===r.length&&(r=[r[0],r[0]]),r.map((s=>(s=s.trim()).startsWith("calc")?this.parseCalc(s,t,e,i):this.parseSingle(s,t,e,i)))}parseSingle(t,s,e,i){let r,o=t.startsWith("-");return o&&(t=t.slice(1)),"selfHeight"===t?r=s.offsetHeight:t.endsWith("px")?r=parseFloat(t):t.endsWith("%")?r=parseFloat(t)*e/100:t.endsWith("rem")&&(r=parseFloat(t)*i),o?-r:r}parseCalc(t,s,e,i){let r=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return r.reduce(((t,o,a)=>{if("-"===o||"+"===o)return t;{let l=this.parseSingle(o.trim(),s,e,i);return"-"===r[a-1]?t-l:t+l}}),0)}parseOrigin(t){null!=t&&""!=t||(t="center center");const s=t.split(" ");return`${this.parseOrig(s[0])} ${this.parseOrig(s[1]||s[0])}`}parseOrig(t){if((t=t.trim()).startsWith("random")){const s=t.slice(7,-1).split(",").map((t=>t.trim()));return s[Math.floor(Math.random()*s.length)]}return t}}class u{constructor(){this.t=0,this.c=0,this.d=0,this.bS=0,this.cF=1}}class E{constructor(){this.data=new u,this.sA=.13,this.sD=.04,this.isProg=!1,this.v=0,this.name="mobile",this.vT=0}onAnimationFrame(){this.vT>0&&(this.v=this.vT/6,this.vT-=this.v,this.vT<10&&(this.vT=0))}onWheel(t){this.vT+=Math.abs(t.deltaY)}onScroll(t){this.data.c=e.documentElement.scrollTop,this.data.t=e.documentElement.scrollTop,this.data.d=0}}class m{constructor(){this.data=new u,this.sA=.13,this.sD=.04,this.isProg=!1,this.v=0,this.name="desktop"}onAnimationFrame(){this.v=(this.data.t-this.data.c)*this.sA*(1-this.sD),this.v>.1||this.v<-.1?(this.data.c+=this.v,this.isProg=!0):(this.v=0,this.isProg=!1),window.scrollTo(0,this.data.c)}onWheel(t){t.preventDefault(),this.data.d=t.deltaY,this.data.t+=this.data.d,this.data.t=Math.max(this.data.t,0),this.data.t=Math.min(this.data.t,this.data.bS)}onScroll(t){t.preventDefault(),0==this.isProg&&(this.data.c=e.documentElement.scrollTop,this.data.t=e.documentElement.scrollTop,this.data.d=0,window.scrollTo(0,this.data.t))}}class g{constructor(){this.data=new u,this.sA=.13,this.sD=.04,this.isProg=!1,this.v=0,this.name="disable"}onAnimationFrame(){}onWheel(t){}onScroll(t){t.preventDefault()}}class f{constructor(){this.actProgE=new Array,this.actParallE=new Array,this.progO=new Array,this.actProgO=new Array,this.scrollO=new Array,this.actParallO=new Array,this.parallO=new Array,this.onScrollEvents=new Array,this.intersectionEvent=new Map,this.prEvent=new Map,this.prScrollEvent=new Map,this.obs=[],this.sf=1,this.f=1,this.disablecalc=!1,this.overflowCurrent=0,this.isProgress=!0,this.isParallax=!0,this.sEnDesktop=new m,this.sEnMobile=new E,this.sEnDisable=new g,this.mMode="default",this.dMode="smooth",this.IsAutoupdateScrollPosition=!0,e=document,i=window,this.wH=i.innerHeight,this.wW=i.innerWidth,this.parser=new p,this.sEn=this.sEnDesktop,this.initElementsFromDOM(),i.addEventListener("resize",(()=>{this.onResize()})),this.wheelBindFunc=this.onWheel.bind(this),this.scrollBindFunc=this.onScroll.bind(this),document.body.addEventListener("wheel",this.wheelBindFunc,{passive:!1}),i.addEventListener("scroll",this.scrollBindFunc,{passive:!1}),this.onAnimationFrame(),this.sendElements(),this.initObserver(),this.onResize(),this.onMutationObserver(),document.documentElement.classList.add("string-scroll"),document.documentElement.classList.add("string-smoothy")}static getInstance(){return f.i||(f.i=new f),f.i}initElementsFromDOM(){this.scrollE=e.querySelectorAll("[data-string]"),this.progE=e.querySelectorAll(`[${r}progress]`),this.parallE=e.querySelectorAll(`[${r}parallax]`),this.lerpE=e.querySelectorAll(`[${r}lerp]`)}setScrollPosition(t){this.sEn.data.c=t,this.sEn.data.t=t,window.scrollTo(0,this.sEn.data.c)}setMobileMode(t){this.mMode=t,this.enableScroll()}setDesktopMode(t){this.dMode=t,this.enableScroll()}disableScroll(){this.sEn=this.sEnDisable}enableScroll(){i.innerWidth<1024||d()?this.setScrollMode(this.mMode):this.setScrollMode(this.dMode)}setSpeedAccelerate(t){this.sEnDesktop.sA=t,this.sEnDisable.sA=t,this.sEnMobile.sA=t}setSpeedDecelerate(t){this.sEnDesktop.sD=t,this.sEnDisable.sD=t,this.sEnMobile.sD=t}setScrollFactor(t){this.f=t,c()?this.sEnDesktop.data.cF=this.f*this.sf:this.sEnDesktop.data.cF=this.f}setSafariFactor(t){this.sf=t,c()?this.sEnDesktop.data.cF=this.f*this.sf:this.sEnDesktop.data.cF=this.f}on(t,s,e=""){switch(t){case"scroll":this.onScrollEvents.push(s);break;case"progress":0==this.prEvent.has(e)&&this.prEvent.set(e,[]),this.prEvent.get(e).push(s);break;case"intersection":0==this.intersectionEvent.has(e)&&this.intersectionEvent.set(e,[]),this.intersectionEvent.get(e).push(s);break;case"scroll-progress":0==this.prScrollEvent.has(e)&&this.prScrollEvent.set(e,[]),this.prScrollEvent.get(e).push(s)}}setScrollMode(t){switch(t){case"smooth":this.sEn=this.sEnDesktop;break;case"default":this.sEn=this.sEnMobile;break;case"disable":this.sEn=this.sEnDisable}}enableById(t){const s=s=>{s.id==t&&(s.disabled=!0,s.el.removeAttribute(`${r}disabled`))};this.progO.forEach(s),this.parallO.forEach(s),this.actProgO.forEach(s)}disableById(t){const s=s=>{s.id==t&&(s.disabled=!0,s.el.setAttribute(`${r}disabled`,""))};this.progO.forEach(s),this.parallO.forEach(s),this.actProgO.forEach(s)}setProgressStatus(t){this.isProgress=t}setParallaxStatus(t){this.isParallax=t}onWheel(t){this.disablecalc?t.preventDefault():this.sEn.onWheel(t)}onMutationObserver(){new MutationObserver((t=>{t.forEach((t=>{if("childList"===t.type){let t=e.body,s=e.documentElement,i=Math.max(t.scrollHeight,t.offsetHeight,s.clientHeight,s.scrollHeight,s.offsetHeight);this.sEn.data.bS=i-this.wH,this.initElementsFromDOM(),this.sendElements(),this.initObserver(),this.calc()}}))})).observe(document.body,{attributes:!0,childList:!0,subtree:!0})}onScroll(t){this.sEn.onScroll(t),this.calc(),this.onScrollEvents.forEach((t=>{t(e.documentElement.scrollTop)}))}initObserver(){this.obs.forEach((t=>{t.disconnect()})),this.obs=[];let t=t=>{t.forEach((t=>{t.isIntersecting?(t.target.classList.add("-inview"),this.emit(this.intersectionEvent,l(t.target,`${r}id`),!0)):null!=l(t.target,`${r}repeat`)&&(t.target.classList.remove("-inview"),this.emit(this.intersectionEvent,l(t.target,`${r}id`),!1))}))};this.scrollO.forEach((s=>{let e={root:null,rootMargin:`${s.oTop}px 0px ${s.oBottom}px 0px`,threshold:.01},i=new IntersectionObserver(t,e);i.observe(s.el),this.obs.push(i)}));let s=t=>{t.forEach((t=>{if(t.isIntersecting)this.actProgE.includes(t.target)||(this.actProgE.push(t.target),this.sendElements());else{let s=this.actProgE.indexOf(t.target);-1!==s&&(this.actProgE.splice(s,1),this.sendElements())}}))};this.progO.forEach((t=>{let e={root:null,rootMargin:`${1*t.oTop+1.5*this.wH}px 0px ${1*t.oBottom+1.5*this.wH}px 0px`,threshold:.001},i=new IntersectionObserver(s,e);i.observe(t.el),this.obs.push(i)}));let e=t=>{t.forEach((t=>{if(t.isIntersecting)this.actParallE.includes(t.target)||(this.actParallE.push(t.target),this.sendElements());else{let s=this.actParallE.indexOf(t.target);-1!==s&&(this.actParallE.splice(s,1),this.sendElements())}}))};this.parallO.forEach((t=>{let s={root:null,rootMargin:`${1*t.oTop+10}px 0px ${1*t.oBottom+10}px 0px`,threshold:.001},i=new IntersectionObserver(e,s);i.observe(t.el),this.obs.push(i)}))}overflowHidden(){this.disablecalc=!0,this.overflowCurrent=this.sEn.data.c;const t=document.getElementById("string-scroll-layout");t&&(t.style.transform=`translateY(-${this.sEn.data.c}px)`)}overflowAuto(){const t=document.getElementById("string-scroll-layout");t&&(t.style.transform="translateY(0px)"),this.sEn.data.c=this.overflowCurrent,this.sEn.data.t=this.overflowCurrent,this.disablecalc=!1,setTimeout((()=>{window.scrollTo(0,this.sEn.data.c)}),10)}onAnimationFrame(){let t=()=>{this.sEn.onAnimationFrame(),this.lerpE.forEach(((t,s)=>{this.lerpE[s].style.setProperty("--scroll-lerp",Math.abs(this.sEn.v))})),this.isParallax&&this.actParallO.forEach((t=>{t.disabled||(t.progress+=this.sEn.v,t.el.style.transform=`translateY(${t.progress*t.parallaxFactor}px)`,t.el.setAttribute("data-string-parallax-progress",t.progress))})),requestAnimationFrame(t)};requestAnimationFrame(t)}calc(){this.disablecalc||this.isProgress&&this.actProgO.forEach((t=>{if(t.disabled)return;let s=Math.min(1,Math.max(0,(this.sEn.data.c-t.startPos)/(t.endPos-t.startPos)));t.el.style.setProperty("--string-progress",s),t.oldValue!=s&&(t.connectEvent.forEach((t=>{t(s)})),this.emit(this.prEvent,t.id,s),t.oldValue=s),this.emit(this.prScrollEvent,t.id,t.oTop-this.sEn.data.c+this.wH)}))}emit(t,s,e){t.has(s)&&t.get(s).forEach((t=>{t(e)}))}sendElements(){this.progO=Array.from(this.progE).map((t=>{h(t);let s=l(t,`${r}offset`),e=null==s?[0,0]:this.parser.parseOffset(t,s,this.wH);return{el:t,oTop:e[0],oBottom:e[1]}})),this.actProgO=Array.from(this.actProgE).filter((t=>null==l(t,`${r}connect`))).map((t=>{let s=h(t),e=l(t,`${r}offset`),i=null==e?[0,0]:this.parser.parseOffset(t,e,this.wH),c=s.height,d={el:t,top:n(t).top,bottom:n(t).top+c,height:c,oTop:i[0],oBottom:i[1],start:l(t,`${r}start`,1),end:l(t,`${r}end`,1),id:l(t,`${r}id`),disabled:null!=l(t,`${r}disabled`),oldValue:0,divisor:this.wH-i[0]-i[1]-c,divisorFull:c+this.wH,startPos:1,endPos:1,connectEvent:new Array},p=l(t,`${r}start`)||"top bottom",u=l(t,`${r}end`)||"bottom top",[E,m]=p.split(" "),[g,f]=u.split(" "),b=d.top-d.oTop,v=d.top-d.oTop-this.wH,w=d.top+d.height+d.oBottom,P=d.top+d.height+d.oBottom-this.wH;return E==o&&m==o&&(d.startPos=b),E==o&&m==a&&(d.startPos=v),E==a&&m==o&&(d.startPos=w),E==a&&m==a&&(d.startPos=P),g==o&&f==o&&(d.endPos=b),g==o&&f==a&&(d.endPos=v),g==a&&f==o&&(d.endPos=w),g==a&&f==a&&(d.endPos=P),d})),Array.from(this.actProgE).forEach((t=>{if(null!=l(t,`${r}connect`)){let s=this.actProgO.find((s=>s.id==l(t,`${r}connect`)));null!=s&&s.connectEvent.push((s=>{t.style.setProperty("--string-progress",s)}))}})),this.parallO=Array.from(this.parallE).map((t=>{let s=l(t,`${r}offset`),e=null==s?[0,0]:this.parser.parseOffset(t,s,this.wH);return{el:t,oTop:e[0],oBottom:e[1]}})),this.actParallO=Array.from(this.actParallE).filter((t=>null==l(t,`${r}connect`))).map((t=>{if(null==l(t,`${r}connect`)){let s=h(t),e=l(t,`${r}offset`),i=null==e?[0,0]:this.parser.parseOffset(t,e,this.wH),o=l(t,`${r}parallax`),a=s.height,c={el:t,top:n(t).top,bottom:n(t).top+a,height:a,oTop:i[0],oBottom:i[1],start:l(t,`${r}start`,1),end:l(t,`${r}end`,1),id:l(t,`${r}id`),disabled:null!=l(t,`${r}disabled`),parallaxFactor:o,progress:null==l(t,"data-string-parallax-progress")?0:Number.parseFloat(l(t,"data-string-parallax-progress")),oldV:0,oldValue:0,divisor:this.wH-i[0]-i[1]-a,divisorFull:a+this.wH,startPos:1,endPos:1};return c.startPos=c.top-this.wH+(c.start*(c.height+c.oTop)-(1-c.start)*c.oTop),c.endPos=c.top+(c.end*(c.height+c.oBottom)-(1-c.end)*c.oBottom),c}})),Array.from(this.actParallE).forEach((t=>{if(null!=l(t,`${r}connect`)){let s=this.actProgO.find((s=>s.id==l(t,`${r}connect`))),e=l(t,`${r}parallax`);null!=s&&s.connectEvent.push((s=>{t.style.transform=`translateY(${s*e*this.wH}px)`}))}})),this.scrollO=Array.from(this.scrollE).map((t=>{let s=h(t),e=l(t,`${r}offset`),i=null==e?[0,0]:this.parser.parseOffset(t,e,this.wH);return{el:t,top:n(t).top,height:s.height,oTop:i[0],oBottom:i[1],disabled:null!=l(t,`${r}disabled`)}}))}initEl(t,s=!1){let e=h(t);s&&(t.style.setProperty("--string-progress",0),t.setAttribute("data-offset-top",n(t).top),t.setAttribute("data-offset-height",e.height));let i=l(t,`${r}origin`);null!=i&&(t.style.transformOrigin=this.parser.parseOrigin(i))}onResize(){this.progE.forEach((t=>{this.initEl(t,!0)})),this.scrollE.forEach((t=>{this.initEl(t)})),this.sendElements(),i.innerWidth<1024||d()?this.setScrollMode(this.mMode):this.setScrollMode(this.dMode),this.wW!=i.innerWidth&&(this.wW=i.innerWidth,this.wH=i.innerHeight);let t=e.body,s=e.documentElement,r=Math.max(t.scrollHeight,t.offsetHeight,s.clientHeight,s.scrollHeight,s.offsetHeight);this.sEn.data.bS=r-this.wH,this.initObserver(),this.calc()}}module.exports=s})();