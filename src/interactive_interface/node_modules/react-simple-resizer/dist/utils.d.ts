export declare function isValidNumber(num?: number): num is number;
export declare function noop(): void;
export declare function omit<P extends object, K extends keyof P>(props: P, ignoreKeys: K[]): Omit<P, K>;
