import { SizeRelatedInfo } from '../types';
import { BarActionScanResult } from './operators';
declare type ResizeResult = SizeRelatedInfo | BarActionScanResult;
export declare class Resizer {
    private resizeResult;
    private isDiscarded;
    constructor(resizeResult: ResizeResult);
    resizeSection(indexOfSection: number, config: {
        toSize: number;
        preferMoveLeftBar?: boolean;
    }): void;
    moveBar(indexOfBar: number, config: {
        withOffset: number;
    }): void;
    discard(): void;
    isSectionResized(indexOfSection: number): boolean;
    isBarActivated(indexOfBar: number): boolean;
    getSectionSize(indexOfSection: number): number;
    getResult(): SizeRelatedInfo;
    getTotalSize(): number;
    private getSize;
}
export {};
