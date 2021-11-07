import { BarAction, BarActionType, Coordinate, SizeInfo, SizeRelatedInfo } from '../types';
export interface BarActionScanResult extends SizeRelatedInfo {
    barID: number;
    offset: number;
    type: BarActionType;
    originalCoordinate: Coordinate;
    defaultSizeInfoArray: SizeInfo[];
}
interface ScanBarActionConfig {
    getSizeRelatedInfo: () => SizeRelatedInfo;
    calculateOffset: (current: Coordinate, original: Coordinate) => number;
}
export declare function scanBarAction(config: ScanBarActionConfig): import("rxjs").OperatorFunction<BarAction, BarActionScanResult>;
export {};
