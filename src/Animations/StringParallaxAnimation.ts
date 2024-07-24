import { StringScrollObject } from "../Objects/StringScrollObject";
import { StringAnimation } from "./StringAnimation";
import { StringAnimationData } from "./StringAnimationData";

export class StringParallaxAnimation extends StringAnimation{
  constructor(){
    super('data-string-parallax', '--string-parallax', 'data-string-parallax')
    this.onScroll = (object: StringScrollObject, data: StringAnimationData)=>{
      let progress = (object.offsetTop - data.current) * object.factor
      requestAnimationFrame(()=>{
        object.el.style.transform = `translateY(${progress}px)`
        object.connects.forEach(connect => {
          connect.el.style.transform = `translateY(${object.progress * object.factor }px)`
        });
      })
      return progress
    }
  }
}