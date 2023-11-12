declare class StringScroll {
    private static instance;
    private wHeight;
    private wWidth;
    private activeProgressEls;
    private activeParallaxEls;
    private progressEls;
    private stickyEls;
    private lerpEls;
    private scrollEls;
    private parralaxEls;
    private stickyObj;
    private progressObj;
    private activeProgressObj;
    private activeProgressFullObj;
    private scrollObj;
    private activeParallaxObj;
    private parallaxObj;
    private onScrollEvents;
    private stEvent;
    private prEvent;
    private prxEvent;
    private prScrollEvent;
    private prStartEvent;
    private prEndEvent;
    private stScrollEvent;
    private observers;
    private sf;
    private f;
    private sAccelerate;
    private sDecelerate;
    private stateName;
    private disableRecalculate;
    private overflowCurrent;
    private isEnabled;
    private wheelBindFunc;
    private scrollBindFunc;
    private defaultScrollBindFunc;
    private isProgressEnable;
    private isStickyEnable;
    private isParallaxEnable;
    private scrollEngenee;
    private scrollEngeneeDesktop;
    private scrollEngeneeMobile;
    private scrollEngeneeDisable;
    private parser;
    private mobileScrollMode;
    private desktopScrollMode;
    IsAutoupdateScrollPosition: boolean;
    private constructor();
    static getInstance(): StringScroll;
    private initElementsFromDOM;
    onChangePage(): void;
    SetScrollPosition(scroll: number): void;
    setMobileMode(mode: "smooth" | "disable" | "default"): void;
    setDesktopMode(mode: "smooth" | "disable" | "default"): void;
    disableScroll(): void;
    enableScroll(): void;
    setSpeedAccelerate(speed: number): void;
    setSpeedDecelerate(speed: number): void;
    setScrollFactor(factor: number): void;
    setSafariFactor(safariFactor: number): void;
    on(key: string, event: any): void;
    setScrollMode(mode: "smooth" | "disable" | "default"): void;
    enableById(): void;
    disableById(id: string): void;
    enableProgress(): void;
    enableSticky(): void;
    enableParallax(): void;
    disableProgress(): void;
    disableSticky(): void;
    disableParallax(): void;
    onStickyEvent(id: string, event: any): void;
    onProgress(id: string, event: any): void;
    onScrollProgress(id: string, event: any): void;
    onStartProgress(id: string, event: any): void;
    onEndProgress(id: string, event: any): void;
    onParallax(id: string, event: any): void;
    onScrollSticky(id: string, event: any): void;
    private onWheel;
    private onMutationObserver;
    private onScroll;
    private onDefaultScroll;
    private onIntersectionObserver;
    overflowHidden(): void;
    overflowAuto(): void;
    private onAnimationFrame;
    private recalculate;
    private eStic;
    private eScrollProg;
    private eStartProg;
    private eEndProg;
    private eParallax;
    private sendElements;
    private initEl;
    onResize(): void;
}
export default StringScroll;
