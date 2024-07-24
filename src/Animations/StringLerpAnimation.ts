import { StringScrollObject } from "../Objects/StringScrollObject";
import { StringAnimation } from "./StringAnimation";
import { StringAnimationData } from "./StringAnimationData";

export class StringLerpAnimation extends StringAnimation{
  constructor(){
    super('data-string-lerp', '--string-lerp', '')
    this.onScroll = (object: StringScrollObject, data: StringAnimationData)=>{
      return data.value; 
    }
  }
}