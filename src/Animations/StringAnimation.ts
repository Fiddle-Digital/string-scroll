import { EventManager } from "../EventManager";
import { StringScrollObject } from "../Objects/StringScrollObject";
import { attr } from "../Utils/attr";
import { StringAnimationData } from "./StringAnimationData";

export class StringAnimation{
  protected _key: string
  get key(){
    return this._key
  }
  
  protected _status: boolean = true
  get status(){
    return this._status
  }
  set status(value: boolean){
    this._status = value
    if(this._status){
      this.onScrollEvent = (data: any) => {
        this.scrollData = data
        this.objectsArray.forEach((object: StringScrollObject) => {
          if(this.onScroll != null){
            if (object.enabled ) {
            let progress = this.onScroll(object, data)
            object.progress = progress
            this.eventManager.emit(`progress_${object.key}_${object.id}`, object.progress)
            object.el.style.setProperty(object.key, progress.toString())
            object.connects.forEach(connect => {
              connect.progress = progress
              connect.el.style.setProperty(object.key, progress.toString())
              this.eventManager.emit(`progress_${object.key}_${object.id}`, object.progress)
            });
          }
          }
        });
      }
    } else {
      this.onScrollEvent = (data: any)=>{ }
    }
  }

  private scrollData: StringAnimationData = {
    current:  0,
    target:  0,
    value: 0
  }

  private onScrollEvent = (data: any)=>{}
  protected progressKey: string
  protected progressFactorKey: string
  protected bufferProgressKey: string
  private id: number = 1
  protected objectsMap: Map<string, StringScrollObject> = new Map<string, StringScrollObject>()
  protected objectsArray: Array<StringScrollObject> = new Array<StringScrollObject>()
  public allObjects: Map<string, StringScrollObject> = new Map<string, StringScrollObject>()
  protected onUpdate: ((element: StringScrollObject, data: StringAnimationData) => number) | null = null
  protected onScroll: ((element: StringScrollObject, data: StringAnimationData) => number) | null = null
  protected onEnter: (element: StringScrollObject, data: StringAnimationData | null) => void = (element: StringScrollObject, data: StringAnimationData | null)=>{}
  protected onLeave: (element: StringScrollObject, data: StringAnimationData | null) => void = (element: StringScrollObject, data: StringAnimationData | null) => { }
  protected onObjectAdded: (object: StringScrollObject, data: StringAnimationData) => void = (object: StringScrollObject, data: StringAnimationData)=>{}
  protected onResize: (object: StringScrollObject) => void = (object: StringScrollObject)=>{}
  public eventManager: EventManager = new EventManager()

  constructor(key: string = "", progressKey: string = "", progressFactorKey: string = "", bufferProgressKey: string = "data-string-progress-value"){
    this._key = key
    this.progressKey = progressKey
    this.progressFactorKey = progressFactorKey
    this.bufferProgressKey = bufferProgressKey
    this.status = true
  }
  get(id: string): StringScrollObject | undefined{
    return this.objectsMap.has(id) ? this.objectsMap.get(id) : undefined
  }
  init(){
    let progE = document.querySelectorAll(`[${this._key}]:not([data-string-connect]):not([${this._key}-inited])`)
    Array.from(progE)
    .forEach((el: any) => {
      this.addObject(el)
    });
    let connectE = document.querySelectorAll(`[data-string-connect]`)
    Array.from(connectE).forEach((el: any) => {
      let connectId = attr(el, `data-string-connect`)
      if(this.objectsMap.has(connectId)){
        el.setAttribute(`data-string-id`, attr(el, `data-string-id`, `string-progress-${this.id}`))
        let stringConnectObject = new StringScrollObject(el, this.progressKey, this.progressFactorKey, this.bufferProgressKey)
        this.objectsMap.get(connectId)?.connects.push(stringConnectObject)
      }
    })
  }
  resize() {
    
    let windowHeight = window.innerHeight
    //console.log(Array.from(this.allObjects).length)
    Array.from(this.allObjects).map(([name, value]) => {
      this.onResize(value)
      value.resize(windowHeight)
    });
  }
  public removeObject(id: string){
    let removedObject = this.objectsMap.get(id)
    if(removedObject?.showObserver != null){
      removedObject?.showObserver.disconnect()
    }
    if(removedObject?.progressObserver != null){
      removedObject?.progressObserver.disconnect()
    }
    this.objectsMap.delete(id)
    this.allObjects.delete(id)
    removedObject = undefined
  }
  public addObject(el: any){
    let wH = window.innerHeight
    el.setAttribute(`data-string-id`, attr(el, `data-string-id`, `string-progress-${this.id}`))
    el.classList.add(attr(el, `data-string-id`, `string-progress-${this.id}`))
    el.setAttribute(`${this._key}-inited`, true)
    let stringObject = new StringScrollObject(el, this.progressKey, this.progressFactorKey, this.bufferProgressKey)
    this.allObjects.set(attr(el, `data-string-id`), stringObject)
    this.objectsMap.set(attr(el, `data-string-id`), stringObject)
    let callbackShow = (es: any) => {
      es.forEach((e: any) => {
        if (e.isIntersecting) {
          this.eventManager.emit(`intersection_${stringObject.key}_${stringObject.id}`, true)
          this.onEnter(stringObject, null)
        } else {
          this.eventManager.emit(`intersection_${stringObject.key}_${stringObject.id}`, false)
          this.onLeave(stringObject, null)
        }
        this.objectsArray = Array.from(this.objectsMap).map(([name, value]) => (value))
      })
    }
    let callbackGl = (es: any) => {
      es.forEach((e: any) => {
        if (e.isIntersecting) {
          let id = attr(e.target, `data-string-id`)
          this.objectsMap.set(id, stringObject)
        } else {
          let id = attr(e.target, `data-string-id`)
          this.objectsMap.delete(id)
        }
        this.objectsArray = Array.from(this.objectsMap).map(([name, value]) => (value))
      })
    }
    let optionsProgress = {
      root: null,
      rootMargin: `${stringObject.oTop + wH * 1.5}px 0px ${stringObject.oBottom + wH * 1.5}px 0px`,
      threshold: 0.001,
    }
    let optionsShow = {
      root: null,
      rootMargin: `${stringObject.oTop}px 0px ${stringObject.oBottom}px 0px`,
      threshold: 0.001,
    }
    let obGl = new IntersectionObserver(callbackGl, optionsProgress);
    let obShow = new IntersectionObserver(callbackShow, optionsShow);

    obGl.observe(el);
    obShow.observe(el);

    stringObject.showObserver = obShow
    stringObject.progressObserver = obGl

    this.onObjectAdded(stringObject, this.scrollData)
    
    this.id++
  }
  public scrollEmit(data: StringAnimationData) {
    this.scrollData = data
    this.onScrollEvent(data)
  }
}