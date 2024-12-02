import { EventManager } from "./EventManager"
import { StringScrollObject } from "./Objects/StringScrollObject"
import { type iStringScroll } from "./ScrollTypes/iStringScroll"
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
function isSafari(): boolean {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
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
  private cf: number = 1
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


  get safariFactor(){
    return this.sf
  }
  set safariFactor(value: number){
    this.sf = value
    if (isSafari()) {
      this.sEnDesktop.setSpeedAccelerate(this.sA * this.sf)
      this.sEnDisable.setSpeedAccelerate(this.sA * this.sf)
      this.sEnMobile.setSpeedAccelerate(this.sA * this.sf)
      this.sEnDesktop.setSpeedDecelerate(this.sD * this.sf)
      this.sEnDisable.setSpeedDecelerate(this.sD * this.sf)
      this.sEnMobile.setSpeedDecelerate(this.sD * this.sf)
    }
  }
  get chromiumFactor(){
    return this.cf
  }
  set chromiumFactor(value: number){
    this.cf = value
    if (!isSafari()) {
      this.sEnDesktop.setSpeedAccelerate(this.sA * this.cf)
      this.sEnDisable.setSpeedAccelerate(this.sA * this.cf)
      this.sEnMobile.setSpeedAccelerate(this.sA * this.cf)
      this.sEnDesktop.setSpeedDecelerate(this.sD * this.cf)
      this.sEnDisable.setSpeedDecelerate(this.sD * this.cf)
      this.sEnMobile.setSpeedDecelerate(this.sD * this.cf)
    }
  }

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
    if (isSafari()) {
      this.sEnDesktop.setSpeedAccelerate(this.sA * this.sf)
      this.sEnDisable.setSpeedAccelerate(this.sA * this.sf)
      this.sEnMobile.setSpeedAccelerate(this.sA * this.sf)
    } else {
      this.sEnDesktop.setSpeedAccelerate(this.sA * this.cf)
      this.sEnDisable.setSpeedAccelerate(this.sA * this.cf)
      this.sEnMobile.setSpeedAccelerate(this.sA * this.cf)
    }
    
  }

  private sD: number = 0.04
  get speedDecelerate(){
    return this.sD
  }
  set speedDecelerate(speed: number){
    this.sD = speed
    if (isSafari()) {
      this.sEnDesktop.setSpeedDecelerate(this.sD * this.sf)
      this.sEnDisable.setSpeedDecelerate(this.sD * this.sf)
      this.sEnMobile.setSpeedDecelerate(this.sD * this.sf)
    } else {
      this.sEnDesktop.setSpeedDecelerate(this.sD * this.cf)
      this.sEnDisable.setSpeedDecelerate(this.sD * this.cf)
      this.sEnMobile.setSpeedDecelerate(this.sD * this.cf)
    }
  }

  get scrollPosition(){
    return this.sEn.data.c
  }
  set scrollPosition(scrollPosition: number){
    this.sEn.data.c = scrollPosition
    this.sEn.data.t = scrollPosition
    window.scrollTo(0, this.sEn.data.c);
  }

  private isUp: number = 3
  private oC: number = 0


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
  public off(key: "scroll" | "progress" | "intersection" | "lerp", event: any, id: string = "") {
    let object = this.getObject(id)
    switch (key) {
      case "scroll":
        this.onScrollEvents = this.onScrollEvents.filter((h: any) => h !== event)
        break;
      case "progress":
        if(object != undefined){
          this.eventManager.off(`progress_${object.key}_${id}`, event)
        }
        break;
      case "lerp":
        this.onScrollLerpEvents = this.onScrollLerpEvents.filter((h: any) => h !== event)
        break;
      case "intersection":
        if(object != undefined){
          this.eventManager.off(`intersection_${object.key}_${id}`, event)
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
          let isResizing = false
          if (mutation.removedNodes.length > 0) {
            
            mutation.removedNodes.forEach(removedNode => {
              
              if (removedNode.nodeType === Node.ELEMENT_NODE) {
                if ((removedNode as Element).getAttribute('data-string-fixed') == null) {
                  isResizing = true
                } else {
                  
                }
                this.animations.forEach((animation) => {
                  Array.from(animation.allObjects).map(([name, value]) => {
                    if(document.body.contains(value.el) == false){
                      animation.removeObject(value.id)
                    }
                  });
                })
              }
            })
            if (isResizing) {
              this.onResize()
            }
          }
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(addedNode => {
              if (addedNode.nodeType === Node.ELEMENT_NODE) {
                if ((addedNode as Element).getAttribute('data-string-fixed') == null) {
                  isResizing = true
                } else {
                }
              }
            })

            
            this.animations.forEach((animation) => {
              let elements = document.querySelectorAll(`[${animation.key}]:not([data-string-connect]):not([${animation.key}-inited])`)
              elements.forEach(element => {
                animation.addObject(element)
              });
            });
            if (isResizing) {
              this.onResize()
            }
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

    
    if (this.sEn.v != 0 && this.isUp != 1 && this.oC < this.sEn.data.c) {
      this.isUp = 1
      document.documentElement.classList.add("-scroll-down")
      document.documentElement.classList.remove("-scroll-up")
    } 
    if (this.sEn.v != 0 && this.isUp != 2 && this.oC > this.sEn.data.c) {
      this.isUp = 2
      document.documentElement.classList.add("-scroll-up")
      document.documentElement.classList.remove("-scroll-down")
    }
    if (this.sEn.v == 0 && this.isUp!=3) {
      this.isUp = 3
      document.documentElement.classList.remove("-scroll-up")
      document.documentElement.classList.remove("-scroll-down")
    }
    
    
    //document.documentElement.style.setProperty("--string-lerp", Math.abs(this.sEn.v).toString())
    this.animations.forEach((animation) => {
      animation.scrollEmit({
        current: this.sEn.data.c,
        target: this.sEn.data.t,
        value: this.sEn.v,
      })
    });
    this.oC = this.sEn.data.c
    
  }
  private onAnimationFrame() {
    this.animationCycle = () => {
      this.sEn.onAnimationFrame()
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
    if (this.wW != w.innerWidth || w.innerWidth > 1024) {
      this.wW = w.innerWidth
      this.wH = w.innerHeight
    } 
    if (this.wW != w.innerWidth || w.innerWidth > 1024) {
      let b = d.body,
      h = d.documentElement
      let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
        h.clientHeight, h.scrollHeight, h.offsetHeight)
      this.sEn.data.bS = dHeight - this.wH

      this.animations.forEach((animation) => {
        animation.scrollEmit({
          current: this.sEn.data.c,
          target: this.sEn.data.t,
          value: this.sEn.v,
        })
      });
    }

    
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
