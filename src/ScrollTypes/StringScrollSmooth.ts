import { StringScrollData } from "../StringScrollData";
import { iStringScroll } from "./iStringScroll";

export class StringScrollSmooth implements iStringScroll {
  public data: StringScrollData = new StringScrollData()
  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "desktop"
  public isParallaxEnabled: boolean = true
  public sC: number = 0.0
  private d: any
  constructor(document: any) {
    this.d = document
    this.updateScrollParams()
  }
  public updateScrollParams() {
    this.sC = this.sA * (1 - this.sD)
  }
  public setSpeedAccelerate(speed: number) {
    this.sA = speed
    this.updateScrollParams()
  }
  public setSpeedDecelerate(speed: number) {
    this.sD = speed
    this.updateScrollParams()
  }
  public onAnimationFrame() {
    this.v = ((this.data.t - this.data.c) * this.sC)
    if (this.v > 0.01 || this.v < -0.01) {
      this.data.c = this.data.c +this.v;
      this.isProg = true
      document.documentElement.scrollTop = this.data.c
    } else {
      if(this.v != 0){
        this.v = 0
        this.data.c = this.data.t
        this.isProg = false
        this.d.documentElement.scrollTop = this.data.c
      } 
    }
  }
  public onWheel(e: any) {
    if (e.deltaY != 0) {
      e.preventDefault()
      this.data.d = e.deltaY
      this.data.t += this.data.d
      this.data.t = Math.min(Math.max(this.data.t, 0), this.data.bS)
    }
  }
  public onScroll(e: any) {
    e.preventDefault()
    if (this.isProg == false) {
      this.v = this.d.documentElement.scrollTop - this.data.c
      this.data.c = this.d.documentElement.scrollTop
      this.data.t = this.d.documentElement.scrollTop
      this.data.d = 0
      window.scrollTo(0, this.data.t)
    }
  }
}