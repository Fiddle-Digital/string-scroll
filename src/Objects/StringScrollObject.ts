import { StringParse } from "../StringParse"
import { attr } from "../Utils/attr"
import { gbcl } from "../Utils/gbcl"
const tS = "top"
const bS = "bottom"
export class StringScrollObject{
  public el: HTMLElement
  public top: number
  public bottom: number
  public height: number
  public oTop: number
  public oBottom: number
  public key: string
  public start: number
  public end: number
  public factor: number
  public id: string
  public enabled: boolean
  public startPos: number
  public endPos: number
  public differencePos: number
  public offsetTop: number
  public progress: number = 0
  public connects: Array<StringScrollObject> = new Array<StringScrollObject>()
  public showObserver: IntersectionObserver | null = null
  public progressObserver: IntersectionObserver | null = null

  public sElPos: string
  public sScrPos: string
  public eElPos: string
  public eScrPos: string

  constructor(element: HTMLElement, key: string, factor: string, bufferProgressKey: string){
    let r = gbcl(element)
    let wH = window.innerHeight
    let oA = attr(element, `data-string-offset`)
    let o = oA == null ? [0, 0] : StringParse.getInstance().parseOffset(element, oA, wH)
    let rH = r.height
    this.el= element
    this.key= attr(element, `data-string-key`, key)
    this.factor= attr(element, factor, 1)
    this.progress = Number.parseFloat(attr(this.el, bufferProgressKey, 0)),
    this.top= StringParse.getInstance().parseCoords(element).top
    this.bottom= StringParse.getInstance().parseCoords(element).top + rH
    this.height= rH
    this.oTop= o[0]
    this.oBottom= o[1]
    this.start= attr(element, `data-string-start`, 1)
    this.end= attr(element, `data-string-end`, 1)
    this.id= attr(element, `data-string-id`)
    this.enabled= attr(element, `data-string-enabled`) == null ? true : false
    this.startPos= 1
    this.endPos= 1
    this.differencePos= 1
    let startPosition = attr(element, `data-string-start`) || "top bottom";
    let endPosition = attr(element, `data-string-end`) || "bottom top";
    let [sElPos, sScrPos] = startPosition.split(" ");
    let [eElPos, eScrPos] = endPosition.split(" ");
    this.sElPos = sElPos
    this.sScrPos = sScrPos
    this.eElPos = eElPos
    this.eScrPos = eScrPos
    if (sElPos == tS && sScrPos == tS) {
      this.startPos = this.top - this.oTop
    } else if (sElPos == tS && sScrPos == bS) {
      this.startPos = this.top - wH - this.oTop
    } else if (sElPos == bS && sScrPos == tS) {
      this.startPos = this.top + this.height - this.oTop
    } else if (sElPos == bS && sScrPos == bS) {
      this.startPos = this.top - wH - this.oTop
    }
    if (eElPos == tS && eScrPos == tS) {
      this.endPos = this.top + this.oBottom
    } else if (eElPos == tS && eScrPos == bS) {
      this.endPos = this.top - wH + this.oBottom
    } else if (eElPos == bS && eScrPos == tS) {
      this.endPos = this.top + this.height + this.oBottom
    } else if (eElPos == bS && eScrPos == bS) {
      this.endPos = this.top - wH + this.height + this.oBottom
    }
    this.differencePos = this.endPos - this.startPos
    this.offsetTop = this.top - this.progress
    let org = attr(this.el, `data-string-origin`)
    if (org != null) {
      this.el.style.transformOrigin = StringParse.getInstance().parseOrigin(org)
    }
  }
  resize(windowHeight: number){
    let element = this.el
    let r = gbcl(element)
    let rH = r.height
    this.el= element
    this.top= StringParse.getInstance().parseCoords(element).top
    this.bottom= StringParse.getInstance().parseCoords(element).top + rH
    this.height= rH
    this.start= attr(element, `data-string-start`, 1)
    this.end= attr(element, `data-string-end`, 1)
    if (this.sElPos == tS && this.sScrPos == tS) {
      this.startPos = this.top - this.oTop
    } else if (this.sElPos == tS && this.sScrPos == bS) {
      this.startPos = this.top - windowHeight - this.oTop
    } else if (this.sElPos == bS && this.sScrPos == tS) {
      this.startPos = this.top + this.height - this.oTop
    } else if (this.sElPos == bS && this.sScrPos == bS) {
      this.startPos = this.top - windowHeight - this.oTop
    }
    if (this.eElPos == tS && this.eScrPos == tS) {
      this.endPos = this.top + this.oBottom
    } else if (this.eElPos == tS && this.eScrPos == bS) {
      this.endPos = this.top - windowHeight + this.oBottom
    } else if (this.eElPos == bS && this.eScrPos == tS) {
      this.endPos = this.top + this.height + this.oBottom
    } else if (this.eElPos == bS && this.eScrPos == bS) {
      this.endPos = this.top - windowHeight + this.height + this.oBottom
    }
    this.differencePos = this.endPos - this.startPos
    this.offsetTop = this.top - this.progress
    
  }
}