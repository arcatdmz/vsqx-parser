interface VSQXParseResult {
    error?: string;
    data: {
        vender: string;
        version: string;
        raw: Element;
    };
}
export declare function parse(xml: string): VSQXParseResult;
export {};
