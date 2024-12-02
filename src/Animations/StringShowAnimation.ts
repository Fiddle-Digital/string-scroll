import { StringScrollObject } from "../Objects/StringScrollObject";
import { attr } from "../Utils/attr";
import { StringAnimation } from "./StringAnimation";
import { StringAnimationData } from "./StringAnimationData";

export class StringShowAnimation extends StringAnimation{
  constructor(){
    super('data-string', '', '')
    this.onEnter = (object: StringScrollObject) => {
      object.el.classList.add("-inview")
    }
    this.onLeave = (object: StringScrollObject)=>{
      if (attr(object.el, `data-string-repeat`) != null) {
        object.el.classList.remove("-inview")
      }
    }
  }
}