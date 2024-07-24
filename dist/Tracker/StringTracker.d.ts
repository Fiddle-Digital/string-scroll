export declare class StringTracker {
    trackedFunction: (...args: any[]) => any;
    private callCount;
    private intervalId;
    private displayElement;
    constructor(trackedFunction?: (...args: any[]) => any);
    start(): void;
    private createDisplayElement;
    private startTracking;
    getTrackedFunction(): (...args: any[]) => any;
    stopTracking(): void;
    resize(): void;
}
