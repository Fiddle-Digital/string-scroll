!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(this,(()=>(()=>{"use strict";var t={d:(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{StringTracker:()=>n});class n{constructor(t=(...t)=>{}){this.trackedFunction=t,this.callCount=0}start(){this.createDisplayElement(),this.startTracking()}createDisplayElement(){this.displayElement=document.createElement("div"),this.displayElement.style.position="fixed",this.displayElement.style.bottom="10px",this.displayElement.style.right="10px",this.displayElement.style.backgroundColor="black",this.displayElement.style.color="green",this.displayElement.style.padding="5px 10px",this.displayElement.style.fontFamily="Arial, sans-serif",this.displayElement.style.fontSize="16px",this.displayElement.style.zIndex="1000",this.displayElement.setAttribute("data-fps","0"),document.body.appendChild(this.displayElement);const t=document.createElement("style");t.innerHTML="\n      [data-fps]::after {\n        content: attr(data-fps) ' FPS';\n        position: absolute;\n        bottom: 0;\n        right: 0;\n        background-color: black;\n        color: green;\n        padding: 5px 10px;\n        font-family: Arial, sans-serif;\n        font-size: 16px;\n        z-index: 1000;\n      }\n    ",document.head.appendChild(t)}startTracking(){this.intervalId=setInterval((()=>{this.displayElement.setAttribute("data-fps",`${this.callCount}`),this.callCount=0}),1e3)}getTrackedFunction(){return(...t)=>(this.callCount++,this.trackedFunction(...t))}stopTracking(){clearInterval(this.intervalId),document.body.removeChild(this.displayElement)}resize(){}}return e})()));
//# sourceMappingURL=StringTracker.js.map