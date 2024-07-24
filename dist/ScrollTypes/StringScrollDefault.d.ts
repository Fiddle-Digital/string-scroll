import { StringScrollData } from "../StringScrollData";
import { iStringScroll } from "./iStringScroll";
export declare class StringScrollDefault implements iStringScroll {
    data: StringScrollData;
    sA: number;
    sD: number;
    isProg: boolean;
    v: number;
    name: string;
    sC: number;
    private vT;
    private d;
    private animateC;
    isParallaxEnabled: boolean;
    constructor(document: any);
    updateScrollParams(): void;
    setSpeedAccelerate(speed: number): void;
    setSpeedDecelerate(speed: number): void;
    onAnimationFrame(): void;
    onWheel(e: any): void;
    onScroll(e: any): void;
}
