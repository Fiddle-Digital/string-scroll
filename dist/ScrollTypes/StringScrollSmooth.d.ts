import { StringScrollData } from "../StringScrollData";
import { iStringScroll } from "./iStringScroll";
export declare class StringScrollSmooth implements iStringScroll {
    data: StringScrollData;
    sA: number;
    sD: number;
    isProg: boolean;
    v: number;
    name: string;
    isParallaxEnabled: boolean;
    sC: number;
    private d;
    constructor(document: any);
    updateScrollParams(): void;
    setSpeedAccelerate(speed: number): void;
    setSpeedDecelerate(speed: number): void;
    onAnimationFrame(): void;
    onWheel(e: any): void;
    onScroll(e: any): void;
}
