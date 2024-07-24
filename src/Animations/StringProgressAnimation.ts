import { StringScrollObject } from "../Objects/StringScrollObject";
import { StringAnimation } from "./StringAnimation";
import { StringAnimationData } from "./StringAnimationData";

export class StringProgressAnimation extends StringAnimation{
  constructor(){
    super('data-string-progress', '--string-progress', '')
    this.onScroll = (object: StringScrollObject, data: StringAnimationData)=>{
      return Math.min(1, Math.max(0, (data.current - object.startPos) / object.differencePos)); 
    }
  }
}