import { ChildProps, Coordinate, SizeInfo, SizeRelatedInfo } from '../types';
export declare const DEFAULT_COORDINATE_OFFSET: Coordinate;
export declare function isSolid({ size }: ChildProps): boolean;
export declare function isDisabledResponsive(childProps: ChildProps): boolean;
export declare function calculateCoordinateOffset(current: Coordinate, previous: Coordinate | null): Coordinate;
export declare function collectSizeRelatedInfo(): {
    collect(sizeInfo: SizeInfo): void;
    getResult(): SizeRelatedInfo;
};
export declare function getNextSizeRelatedInfo(barID: number, offset: number, sizeInfoArray: SizeInfo[]): SizeRelatedInfo;
