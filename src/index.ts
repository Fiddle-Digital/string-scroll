import { EventManager } from "./EventManager"
import { StringScrollObject } from "./Objects/StringScrollObject"
import { iStringScroll } from "./ScrollTypes/iStringScroll"
import { StringScrollDefault } from "./ScrollTypes/StringScrollDefault"
import { StringScrollDisable } from "./ScrollTypes/StringScrollDisable"
import { StringScrollSmooth } from "./ScrollTypes/StringScrollSmooth"

import { StringAnimation } from "./Animations/StringAnimation"
import { StringAnimationData } from "./Animations/StringAnimationData"
import { StringLerpAnimation } from "./Animations/StringLerpAnimation"
import { StringParallaxAnimation } from "./Animations/StringParallaxAnimation"
import { StringProgressAnimation } from "./Animations/StringProgressAnimation"
import { StringShowAnimation } from "./Animations/StringShowAnimation"
import { StringScrollbar } from "./Scrollbar/StringScrollbar"
import { StringTracker } from "./Tracker/StringTracker"
import { StringScrollData } from "./StringScrollData"



let d: any = null
let w: any = null
function isTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0));
}
class StringScroll {
  private static i: StringScroll;
  private wH: number
  private wW: number
  
  private onScrollEvents: Array<any> = new Array<any>()
  private onScrollLerpEvents: Array<any> = new Array<any>()
  
  private sf: number = 1
  private f: number = 1

  
  private overflowCurrent = 0

  private wheelBindFunc
  private scrollBindFunc

  private animations: Array<StringAnimation> = new Array<StringAnimation>() 
  
  private sEn: iStringScroll
  private sEnDesktop: StringScrollSmooth 
  private sEnMobile: StringScrollDefault 
  private sEnDisable: StringScrollDisable
  private eventManager: EventManager = new EventManager()

  private scrollbar: any
  

  private animationGlobalCycle = ()=>{
    this.animationCycle()
  }
  private animationCycle = ()=>{}


  private _enabled: boolean = true
  get enabled(){
    return this._enabled
  }
  set enabled(value: boolean){
    this._enabled = value
    this.animations.forEach(animation => {
      animation.status = this._enabled
    });
    if(this._enabled){
      this.updateModeParams('smooth')
      if (w.innerWidth < 1024 || isTouchDevice()) {
        this.scrollMode = this.mMode
      } else {
        this.scrollMode = this.dMode
      }
    } else {
      this.sEn = this.sEnDisable
      this.updateModeParams('disable')
    }
  }

  private mode: "smooth" | "disable" | "default" = "smooth"
  get scrollMode(){
    return this.mode
  }
  set scrollMode(scrollMode: "smooth" | "disable" | "default"){
    document.documentElement.classList.remove(`-${this.mode}`)
    this.mode = scrollMode
    document.documentElement.classList.add(`-${this.mode}`)
    switch (this.mode) {
      case "smooth":
        this.sEn = this.sEnDesktop
        break;
      case "default":
        this.sEn = this.sEnMobile
        break;
      case "disable":
        this.sEnDisable.v = this.sEn.v
        this.sEnDisable.data = this.sEn.data
        this.sEn = this.sEnDisable
        break;
    }
  }

  private mMode: "disable" | "default" = "default"
  get mobileScrollMode(){
    return this.mMode
  }
  set mobileScrollMode(mobileMode: "disable" | "default"){
    this.mMode = mobileMode
    this.updateModeParams(this.mMode)
  }

  private dMode: "smooth" | "disable" | "default" = "smooth"
  get desktopScrollMode(){
    return this.dMode
  }
  set desktopScrollMode(desktopMode: "smooth" | "disable" | "default"){
    this.dMode = desktopMode
    this.updateModeParams(this.dMode)
  }

  private updateModeParams(mobileMode: "smooth" | "disable" | "default"){
    if (w.innerWidth < 1024 || isTouchDevice()) {
      this.scrollMode = this.mMode
    } else {
      this.scrollMode = this.dMode
    }
    if(mobileMode == "disable"){
      document.documentElement.classList.add(`-without-scrollbar`)
    } else {
      document.documentElement.classList.remove(`-without-scrollbar`)
    }
  }
  
  private sA: number = 0.13
  get speedAccelerate(){
    return this.sA
  }
  set speedAccelerate(speed: number){
    this.sA = speed
    this.sEnDesktop.sA = speed
    this.sEnDisable.sA = speed
    this.sEnMobile.sA = speed
  }

  private sD: number = 0.04
  get speedDecelerate(){
    return this.sD
  }
  set speedDecelerate(speed: number){
    this.sD = speed
    this.sEnDesktop.sD = speed
    this.sEnDisable.sD = speed
    this.sEnMobile.sD = speed
  }

  get scrollPosition(){
    return this.sEn.data.c
  }
  set scrollPosition(scrollPosition: number){
    this.sEn.data.c = scrollPosition
    this.sEn.data.t = scrollPosition
    window.scrollTo(0, this.sEn.data.c);
  }



  private constructor() {
    d = document
    w = window
    this.wH = w.innerHeight
    this.wW = w.innerWidth
    this.sEnDesktop = new StringScrollSmooth(d)
    this.sEnMobile = new StringScrollDefault(d)
    this.sEnDisable = new StringScrollDisable(d)
    this.sEn = this.sEnDesktop
    w.addEventListener('resize', () => { this.onResize() })
    this.wheelBindFunc = this.onWheel.bind(this)
    this.scrollBindFunc = this.onScroll.bind(this)
    document.body.addEventListener('wheel', this.wheelBindFunc, { passive: false })
    w.addEventListener('scroll', this.scrollBindFunc, { passive: false })
    
    document.documentElement.classList.add("string-scroll")
    document.documentElement.classList.add("string-smoothy")
    const style = document.createElement('style');
    style.id = 'hide-scrollbar-style';
    document.documentElement.style.setProperty("--string-lerp", `0`)
    style.textContent = `
        .-without-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .-without-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('keydown', (event) => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        return;
      }
      switch (event.key) {
        case 'ArrowUp':
          this.sEn.data.t -= this.wH / 3
          break;
          case 'ArrowDown':
            this.sEn.data.t += this.wH / 3
            
          break;
      }
    });

  }

  public static getInstance(): StringScroll {
    if (!StringScroll.i) {
      StringScroll.i = new StringScroll();
    }
    return StringScroll.i;
  }

  public scrollTo(scroll: number) {
    this.sEn.data.t = scroll
  }
  public on(key: "scroll" | "progress" | "intersection" | "lerp", event: any, id: string = "") {
    let object = this.getObject(id)
    switch (key) {
      case "scroll":
        this.onScrollEvents.push(event)
        break;
      case "progress":
        if(object != undefined){
          this.eventManager.on(`progress_${object.key}_${id}`, event)
        }
        break;
      case "lerp":
        this.onScrollLerpEvents.push(event)
        break;
      case "intersection":
        if(object != undefined){
          this.eventManager.on(`intersection_${object.key}_${id}`, event)
        }
        break;
    }
  }
  public use(objectClass: typeof StringAnimation | typeof StringTracker | typeof StringScrollbar){
    const object = new objectClass();
    if(object instanceof StringAnimation){
      object.eventManager = this.eventManager
      this.animations.push(object)
    }
    if(object instanceof StringScrollbar){
      this.scrollbar = object
    }
    if(object instanceof StringTracker){
      this.animationGlobalCycle = ()=>{
        this.sEn.onAnimationFrame()
        requestAnimationFrame(object.getTrackedFunction());
      }
      object.trackedFunction = this.animationGlobalCycle
      object.start()
    }
   

  }
  public start(){
    this.onAnimationFrame()
    this.onResize()
    this.onMutationObserver()
    this.animations.forEach((animation) => {
      animation.init()
    });
    
  }
  public forceUpdateParallax() {
    setTimeout(() => {
      let b = d.body,
        h = d.documentElement
      let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
        h.clientHeight, h.scrollHeight, h.offsetHeight)
      this.sEn.data.bS = dHeight - this.wH
    }, 300);
  }
  public setObjectStatus(id: string, status: boolean){
    let object = this.getObject(id)
    if(object != undefined){
      object.enabled = status
    }
  }
  private getObject(id: string): StringScrollObject | undefined{
    let findedObject = undefined
    this.animations.forEach(animation => {
      let object = animation.get(id)
      if(object != undefined){
        findedObject = object
      }
    })
    
    return findedObject
  }
  private onWheel(e: WheelEvent) {
    if (this._enabled == false) {
      e.preventDefault()
      return
    }
    this.sEn.onWheel(e)
  }
  private onMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (mutation.removedNodes.length > 0) {
            mutation.removedNodes.forEach(removedNode => {
              if (removedNode.nodeType === Node.ELEMENT_NODE) {
                this.animations.forEach((animation) => {
                  Array.from(animation.allObjects).map(([name, value]) => {
                    if(document.body.contains(value.el) == false){
                      animation.removeObject(value.id)
                    }
                  });
                })
              }
            });
            this.onResize()
          }
          if (mutation.addedNodes.length > 0) {
            this.animations.forEach((animation) => {
              let elements = document.querySelectorAll(`[${animation.key}]:not([data-string-connect]):not([data-string-inited])`)
              elements.forEach(element => {
                animation.addObject(element)
                
              });
            });
            this.onResize()
          }
          
        }
      });
    });
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    observer.observe(document.body, config);
    
  }
  private onScroll(e: Event) {
    this.sEn.onScroll(e)
    this.onScrollEvents.forEach(event => {
      event(this.sEn.data.c)
    });
    this.onScrollLerpEvents.forEach(event => {
      event(this.sEn.v)
    });
    //document.documentElement.style.setProperty("--string-lerp", Math.abs(this.sEn.v).toString())
    this.animations.forEach((animation) => {
      animation.scrollEmit({
        current: this.sEn.data.c,
        target: this.sEn.data.t,
        value: this.sEn.v,
      })
    });
    
  }
  private onAnimationFrame() {
    this.animationCycle = () => {
      this.sEn.onAnimationFrame()

      // this.animations.forEach((animation) => {
      //   animation.updateEmit({
      //     current: this.sEn.data.c,
      //     target: this.sEn.data.t,
      //     value: this.sEn.v,
      //   })
      // });
      requestAnimationFrame(this.animationGlobalCycle);
    }
    requestAnimationFrame(this.animationGlobalCycle);
  }
  
  public onResize() {
    this.scrollbar?.resize()
    this.animations.forEach((animation) => {
      animation.resize()
    });
    if (w.innerWidth < 1024 || isTouchDevice()) {
      this.scrollMode = this.mMode
    } else {
      this.scrollMode = this.dMode
    }
    if (this.wW != w.innerWidth) {
      this.wW = w.innerWidth
      this.wH = w.innerHeight
    }

    let b = d.body,
      h = d.documentElement
    let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
      h.clientHeight, h.scrollHeight, h.offsetHeight)
    this.sEn.data.bS = dHeight - this.wH

  }
}

export {
	StringScroll as StringScroll,
	StringScroll as default,
  StringAnimation,
  StringAnimationData,
  StringLerpAnimation,
  StringParallaxAnimation,
  StringProgressAnimation,
  StringShowAnimation,
  StringScrollbar,
  StringTracker,
  StringScrollData,
};
