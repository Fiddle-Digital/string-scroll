import { StringScrollData } from "../StringScrollData";
import { iStringScroll } from "./iStringScroll";

export class StringScrollDisable implements iStringScroll {
  public data: StringScrollData = new StringScrollData()
  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "disable"
  public sC: number = 0.0
  public isParallaxEnabled: boolean = false

  private d: any

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
  }

  public onWheel(e: any) {
  }

  public onScroll(e: any) {
    e.preventDefault()

  }
}