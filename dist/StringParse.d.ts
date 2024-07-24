export declare class StringParse {
    private static i;
    static getInstance(): StringParse;
    parseOffset(e: any, o: any, wH: any, baseRem?: number): any;
    parseSingle(v: string, element: any, wH: any, baseRem: number): number;
    parseCalc(c: string, element: any, wH: any, baseRem: number): number;
    parseOrigin(o: string): string;
    parseOrig(part: string): string;
    parseCoords(e: any): {
        top: number;
    };
}
