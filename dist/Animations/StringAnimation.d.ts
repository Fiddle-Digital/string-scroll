import { EventManager } from "../EventManager";
import { StringScrollObject } from "../Objects/StringScrollObject";
import { StringAnimationData } from "./StringAnimationData";
export declare class StringAnimation {
    protected _key: string;
    get key(): string;
    protected _status: boolean;
    get status(): boolean;
    set status(value: boolean);
    private scrollData;
    private onScrollEvent;
    protected progressKey: string;
    protected progressFactorKey: string;
    protected bufferProgressKey: string;
    private id;
    protected objectsMap: Map<string, StringScrollObject>;
    protected objectsArray: Array<StringScrollObject>;
    allObjects: Map<string, StringScrollObject>;
    protected onUpdate: ((element: StringScrollObject, data: StringAnimationData) => number) | null;
    protected onScroll: ((element: StringScrollObject, data: StringAnimationData) => number) | null;
    protected onEnter: (element: StringScrollObject, data: StringAnimationData | null) => void;
    protected onLeave: (element: StringScrollObject, data: StringAnimationData | null) => void;
    protected onObjectAdded: (object: StringScrollObject, data: StringAnimationData) => void;
    protected onResize: (object: StringScrollObject) => void;
    eventManager: EventManager;
    constructor(key?: string, progressKey?: string, progressFactorKey?: string, bufferProgressKey?: string);
    get(id: string): StringScrollObject | undefined;
    init(): void;
    resize(): void;
    removeObject(id: string): void;
    addObject(el: any): void;
    scrollEmit(data: StringAnimationData): void;
}
