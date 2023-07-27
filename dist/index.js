(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>p});var s=null,i=null;function r(t,e="0,0",s,i=16){let r=e.split(",");1===r.length&&(r=[r[0],r[0]]);let a=r.map((e=>(e=e.trim()).startsWith("calc")?function(t,e,s,i){let r=(t=t.slice(5,-1)).split(/([-+])/).filter(Boolean);return r.reduce(((t,a,o)=>{if("-"===a||"+"===a)return t;{let n=l(a.trim(),e,s,i);return"-"===r[o-1]?t-n:t+n}}),0)}(e,t,s,i):l(e,t,s,i)));return a}function l(t,e,s,i){let r,l=t.startsWith("-");if(l&&(t=t.slice(1)),"selfHeight"===t)r=e.offsetHeight;else if(t.endsWith("px"))r=parseFloat(t);else if(t.endsWith("%"))r=parseFloat(t)*s/100;else{if(!t.endsWith("rem"))throw new Error(`Unknown format offset: ${t}`);r=parseFloat(t)*i}return l?-r:r}function a(t){if((t=t.trim()).startsWith("random")){const e=t.slice(7,-1).split(",").map((t=>t.trim()));return e.forEach((t=>o(t))),e[Math.floor(Math.random()*e.length)]}return o(t),t}function o(t){if(!["top","center","bottom","left","right"].includes(t))throw new Error(`Invalid origin option: ${t}`)}function n(t){var e=h(s.body);return{top:h(t).top-e.top}}function h(t){return t.getBoundingClientRect()}function c(){var t=navigator.userAgent.toLowerCase();return-1!=t.indexOf("safari")&&!(t.indexOf("chrome")>-1)}function d(){let t=!1;var e;return e=navigator.userAgent||navigator.vendor,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}class g{constructor(){this.respState="",this.activeProgressEls=new Array,this.activeParallaxEls=new Array,this.stickyObj=new Array,this.progressObj=new Array,this.activeProgressObj=new Array,this.scrollObj=new Array,this.parallaxObj=new Array,this.onScrollEvents=new Array,this.stEvent=new Map,this.prEvent=new Map,this.prxEvent=new Map,this.prScrollEvent=new Map,this.prStartEvent=new Map,this.prEndEvent=new Map,this.stScrollEvent=new Map,this.observers=[],this.sf=1,this.f=1,this.cf=1,this.sAccelerate=.05,this.sDecelerate=.05,this.stPsDist=0,this.t=0,this.c=0,this.stPs=null,this.d=0,this.currentDeltaModule=0,this.requestId=null,this.bottomScroll=0,this.isProg=!1,this.isProgTimeout=null,this.actualAccelerate=.05,this.isEnabled=!0,this.isProgressEnable=!0,this.isStickyEnable=!0,this.isParallaxEnable=!0,this.isScrollDown=!1,s=document,i=window,this.wHeight=i.innerHeight,this.scrollEls=s.querySelectorAll("[data-string]"),this.progressEls=s.querySelectorAll("[data-string-progress]"),this.stickyEls=s.querySelectorAll("[data-string-sticky-progress]"),this.parralaxEls=s.querySelectorAll("[data-string-parallax]"),this.lerpEls=s.querySelectorAll("[data-lerp]"),i.addEventListener("resize",(()=>{this.onResize()})),this.wheelBindFunc=this.onWheel.bind(this),this.scrollBindFunc=this.onScroll.bind(this),this.defaultScrollBindFunc=this.onDefaultScroll.bind(this),i.addEventListener("wheel",this.wheelBindFunc,{passive:!1}),i.addEventListener("scroll",this.scrollBindFunc,{passive:!1}),this.onAnimationFrame(),this.sendElements(),this.onIntersectionObserver(),this.onResize(),document.documentElement.classList.add("string-scroll"),document.documentElement.classList.add("string-smoothy")}static getInstance(){return g.instance||(g.instance=new g),g.instance}setSpeedAccelerate(t){this.sAccelerate=t}setSpeedDecelerate(t){this.sDecelerate=t}setScrollFactor(t){this.f=t,c()?this.cf=this.f*this.sf:this.cf=this.f}setSafariFactor(t){this.sf=t,c()?this.cf=this.f*this.sf:this.cf=this.f}on(t,e){"scroll"===t&&this.onScrollEvents.push(e)}disable(){this.isEnabled&&(i.removeEventListener("wheel",this.wheelBindFunc),i.removeEventListener("scroll",this.scrollBindFunc),i.addEventListener("scroll",this.defaultScrollBindFunc),this.isEnabled=!1)}enable(){this.isEnabled||(i.removeEventListener("scroll",this.defaultScrollBindFunc),i.addEventListener("wheel",this.wheelBindFunc,{passive:!1}),i.addEventListener("scroll",this.scrollBindFunc,{passive:!1}),this.isEnabled=!0)}enableById(){}disableById(t){function e(e){e.id==t&&(e.disabled=!0,e.el.setAttribute("data-string-disabled",""),console.log(e))}this.progressObj.forEach(e),this.scrollObj.forEach(e),this.parallaxObj.forEach(e),this.activeProgressObj.forEach(e)}enableProgress(){this.isProgressEnable=!0}enableSticky(){this.isStickyEnable=!0}enableParallax(){this.isParallaxEnable=!0}disableProgress(){this.isProgressEnable=!1}disableSticky(){this.isStickyEnable=!1}disableParallax(){this.isParallaxEnable=!1}onStickyEvent(t,e){this.stEvent.set(t,e)}onProgress(t,e){this.prEvent.set(t,e)}onScrollProgress(t,e){this.prScrollEvent.set(t,e)}onStartProgress(t,e){this.prStartEvent.set(t,e)}onEndProgress(t,e){this.prEndEvent.set(t,e)}onParallax(t,e){this.prxEvent.set(t,e)}onScrollSticky(t,e){this.stScrollEvent.set(t,e)}onWheel(t){t.preventDefault(),this.currentDeltaModule=Math.abs(t.deltaY),this.d=t.deltaY*this.cf,this.t+=this.d,this.t<0&&(this.t=0),this.t>this.bottomScroll&&(this.t=this.bottomScroll),null==this.stPs&&(this.stPs=s.documentElement.scrollTop),this.isScrollDown!=this.c<this.t&&(this.stPs=s.documentElement.scrollTop,this.stPsDist=Math.abs((null==this.stPs?this.t:this.stPs)-this.t)/2,this.actualAccelerate=this.sAccelerate),this.isScrollDown=this.c<this.t}onScroll(t){t.preventDefault(),"d"==this.respState&&0==this.isProg&&(this.c=s.documentElement.scrollTop,this.t=s.documentElement.scrollTop,this.d=0),this.recalculate(),this.onScrollEvents.forEach((t=>{t(s.documentElement.scrollTop)}))}onDefaultScroll(t){this.c=s.documentElement.scrollTop,this.t=s.documentElement.scrollTop,this.recalculate(),this.onScrollEvents.forEach((t=>{t(s.documentElement.scrollTop)}))}onIntersectionObserver(){this.observers.forEach((t=>{t.disconnect()})),this.observers=[];let t=t=>{t.forEach((t=>{t.isIntersecting?t.target.classList.add("-inview"):null!=t.target.getAttribute("data-string-repeat")&&t.target.classList.remove("-inview")}))};this.scrollObj.forEach((e=>{let s={root:null,rootMargin:`${-1*e.oTop}px 0px ${-1*e.oBottom}px 0px`,threshold:.01},i=new IntersectionObserver(t,s);i.observe(e.el),this.observers.push(i)}));let e=t=>{t.forEach((t=>{if(t.isIntersecting)this.activeProgressEls.includes(t.target)||(this.activeProgressEls.push(t.target),this.sendElements());else{let e=this.activeProgressEls.indexOf(t.target);-1!==e&&(this.activeProgressEls.splice(e,1),this.sendElements())}}))};this.progressObj.forEach((t=>{let s={root:null,rootMargin:`${-1*t.oTop}px 0px ${-1*t.oBottom}px 0px`,threshold:.01},i=new IntersectionObserver(e,s);i.observe(t.el),this.observers.push(i)}));let s=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting)this.activeParallaxEls.includes(t.target)||(this.activeParallaxEls.push(t.target),this.sendElements());else{let e=this.activeParallaxEls.indexOf(t.target);-1!==e&&(this.activeParallaxEls.splice(e,1),this.sendElements())}}))}),{root:null,rootMargin:"0px",threshold:.01});this.parralaxEls.forEach((t=>{s.observe(t)})),this.observers.push(s)}onAnimationFrame(){let t=()=>{if("d"==this.respState){let t=(e=this.c,i=this.t,this.stPsDist,r=this.actualAccelerate,l=1,a=e,o=i,(1-(n=1-Math.exp(-r*l)))*a+n*o),g=t-this.c;this.c=t,Math.abs(this.c-this.t)<1&&(this.c=this.t),0!=g?(this.currentDeltaModule>40&&(this.actualAccelerate=(h=this.actualAccelerate,c=this.sDecelerate,d=this.actualAccelerate/this.sDecelerate,h*(1-(d*=d))+c*d)),this.isProg=!0,s.documentElement.scrollTop=s.body.scrollTop=this.c,document.documentElement.classList.add("string-scrolling"),null!=this.isProgTimeout&&clearTimeout(this.isProgTimeout),this.isProgTimeout=setTimeout((()=>{this.isProg=!1}),100),g=Math.abs(g),this.lerpEls.forEach(((t,e)=>{this.lerpEls[e].style.setProperty("--string-lerp",g)}))):(this.currentDeltaModule=0,this.actualAccelerate=this.sAccelerate,this.stPs=null,document.documentElement.classList.remove("string-scrolling"))}var e,i,r,l,a,o,n,h,c,d;this.recalculate(),requestAnimationFrame(t)};requestAnimationFrame(t)}recalculate(){this.isStickyEnable&&this.stickyObj.forEach((t=>{if(t.disabled)return;let e=h(t.parent).height,s=(this.c+this.wHeight*this.c/e)/e;t.el.style.setProperty("--string-sticky-progress",s),this.eStic(t.id,s)})),this.isProgressEnable&&this.activeProgressObj.forEach((t=>{if(t.disabled)return;let e=(this.c-t.oBottom+this.wHeight-t.top)/(this.wHeight-t.oTop-t.oBottom);e>1&&(e=1,this.eEndProg(t.id,e)),e<0&&(e=0,this.eStartProg(t.id,e)),t.el.style.setProperty("--string-progress",e),t.oldValue!=e&&this.eProg(t.id,e),this.eScrollProg(t.id,t.oTop-this.c+this.wHeight),t.oldValue=e})),this.isParallaxEnable&&this.parallaxObj.forEach((t=>{if(t.disabled)return;let e=(this.c-t.oBottom+this.wHeight-t.top)/(this.wHeight-t.oTop-t.oBottom);e>1&&(e=1),e<0&&(e=0),t.el.style.transform=`translateY(${e*t.parallaxFactor*this.wHeight}px)`,this.eParallax(t.id,e)}))}eStic(t,e){this.stEvent.has(t)&&this.stEvent.get(t)(e)}eProg(t,e){this.prEvent.has(t)&&this.prEvent.get(t)(e)}eScrollProg(t,e){this.prScrollEvent.has(t)&&this.prScrollEvent.get(t)(e)}eStartProg(t,e){this.prStartEvent.has(t)&&this.prStartEvent.get(t)(e)}eEndProg(t,e){this.prEndEvent.has(t)&&this.prEndEvent.get(t)(e)}eParallax(t,e){this.prxEvent.has(t)&&this.prxEvent.get(t)(e)}eScrollSticky(t,e){this.stScrollEvent.has(t)&&this.stScrollEvent.get(t)(e)}sendElements(){this.stickyObj=Array.from(this.stickyEls).map((t=>({el:t,top:t.getAttribute("data-offset-top"),height:t.getAttribute("data-offset-height"),disabled:null!=t.getAttribute("data-string-disabled"),id:t.getAttribute("data-string-id"),parent:t.parentNode}))),this.progressObj=Array.from(this.progressEls).map((t=>{var e=h(t),s=t.getAttribute("data-string-offset"),i=null==s?[0,0]:r(t,s,this.wHeight);return{el:t,top:n(t).top,height:e.height,oTop:i[0],oBottom:i[1],id:t.getAttribute("data-string-id"),disabled:null!=t.getAttribute("data-string-disabled"),oldValue:0}})),this.activeProgressObj=Array.from(this.activeProgressEls).map((t=>{var e=h(t),s=t.getAttribute("data-string-offset"),i=null==s?[0,0]:r(t,s,this.wHeight);return{el:t,top:n(t).top,height:e.height,oTop:i[0],oBottom:i[1],id:t.getAttribute("data-string-id"),disabled:null!=t.getAttribute("data-string-disabled"),oldValue:0}})),this.parallaxObj=Array.from(this.activeParallaxEls).map((t=>{var e=h(t),s=t.getAttribute("data-string-offset"),i=t.getAttribute("data-string-parallax"),l=null==s?[0,0]:r(t,s,this.wHeight);return{el:t,top:n(t).top,height:e.height,oTop:l[0],oBottom:l[1],parallaxFactor:i,id:t.getAttribute("data-string-id"),disabled:null!=t.getAttribute("data-string-disabled")}})),this.scrollObj=Array.from(this.scrollEls).map((t=>{var e=h(t),s=t.getAttribute("data-string-offset"),i=null==s?[0,0]:r(t,s,this.wHeight);return{el:t,top:n(t).top,height:e.height,oTop:i[0],oBottom:i[1],disabled:null!=t.getAttribute("data-string-disabled")}}))}initEl(t,e=!1){var s=h(t);e&&(t.style.setProperty("--string-progress",0),t.setAttribute("data-offset-top",n(t).top),t.setAttribute("data-offset-height",s.height));var i=t.getAttribute("data-string-origin");null!=i&&(t.style.transformOrigin=function(t){null!=t&&""!=t||(t="center center");const e=t.split(" ");return`${a(e[0])} ${a(e[1]||e[0])}`}(i))}onResize(){this.stickyEls.forEach((t=>{this.initEl(t,!0)})),this.progressEls.forEach((t=>{this.initEl(t,!0)})),this.scrollEls.forEach((t=>{this.initEl(t)})),this.sendElements();let t=s.body,e=s.documentElement,r=Math.max(t.scrollHeight,t.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight);this.wHeight=i.screen.height,this.bottomScroll=r-this.wHeight,d()||(this.respState="d"),d()&&(this.respState="m"),this.onIntersectionObserver()}}const p=g;module.exports=e})();