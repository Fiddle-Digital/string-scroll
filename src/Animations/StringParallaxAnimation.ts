import { StringScrollObject } from "../Objects/StringScrollObject";
import { StringAnimation } from "./StringAnimation";
import { StringAnimationData } from "./StringAnimationData";

export class StringParallaxAnimation extends StringAnimation{
  windowHeight: number = 0
  constructor(){
    super('data-string-parallax', '--string-parallax', 'data-string-parallax')
    this.windowHeight = window.innerHeight
    this.onScroll = (object: StringScrollObject, data: StringAnimationData)=>{
      let progress = Math.min(1, Math.max(0, (data.current - object.startPos) / object.differencePos)); 
      requestAnimationFrame(() => {
        object.el.style.transform = `translateY(${progress * (object.factor * this.windowHeight) + (object.factor * this.windowHeight * -.5)}px)`
        object.connects.forEach(connect => {
          connect.el.style.transform = `translateY(${progress * object.factor * this.windowHeight}px)`
        });
      })
      return progress
    }

    if (window.innerWidth > 1080) {
        this.status = true
      } else {
        this.status = false
      }
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight
      if (window.innerWidth > 1080) {
        this.status = true
      } else {
        this.status = false
      }
    })
  }
}