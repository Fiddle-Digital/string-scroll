import { StringScrollData } from "../StringScrollData";
import { iStringScroll } from "./iStringScroll";

export class StringScrollDefault implements iStringScroll {
  public data: StringScrollData = new StringScrollData()

  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "mobile"
  public sC: number = 0.0
  private vT: number = 0
  private d: any
  private animateC: number = 0
  public isParallaxEnabled: boolean = false

  constructor(document: any) {
    this.d = document
    this.updateScrollParams()
  }

  public updateScrollParams() {

  }

  public setSpeedAccelerate(speed: number) {
    this.sA = speed
  }
  public setSpeedDecelerate(speed: number) {
    this.sD = speed
  }

  public onAnimationFrame() {
    this.vT = this.d.documentElement.scrollTop - this.animateC
    this.animateC = this.d.documentElement.scrollTop

    this.v = this.vT
  }
  public onWheel(e: any) {
  }
  public onScroll(e: any) {
    this.data.c = this.d.documentElement.scrollTop
    this.data.t = this.d.documentElement.scrollTop
    this.data.d = 0
  }
}