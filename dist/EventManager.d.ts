export declare class EventManager {
    private events;
    on(id: string, event: Function): void;
    has(id: string): boolean;
    emit(id: string, value: any): void;
}
