import { StringScrollData } from "../StringScrollData";
export interface iStringScroll {
    sC: number;
    sA: number;
    sD: number;
    data: StringScrollData;
    isProg: boolean;
    isParallaxEnabled: boolean;
    v: number;
    name: string;
    onAnimationFrame(): void;
    onWheel(e: any): void;
    onScroll(e: any): void;
    setSpeedAccelerate(speed: number): void;
    setSpeedDecelerate(speed: number): void;
    updateScrollParams(): void;
}
