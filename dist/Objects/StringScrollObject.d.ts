export declare class StringScrollObject {
    el: HTMLElement;
    top: number;
    bottom: number;
    height: number;
    oTop: number;
    oBottom: number;
    key: string;
    start: number;
    end: number;
    factor: number;
    id: string;
    enabled: boolean;
    startPos: number;
    endPos: number;
    differencePos: number;
    offsetTop: number;
    progress: number;
    connects: Array<StringScrollObject>;
    showObserver: IntersectionObserver | null;
    progressObserver: IntersectionObserver | null;
    sElPos: string;
    sScrPos: string;
    eElPos: string;
    eScrPos: string;
    constructor(element: HTMLElement, key: string, factor: string, bufferProgressKey: string);
    resize(windowHeight: number): void;
}
