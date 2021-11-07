"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.DEFAULT_COORDINATE_OFFSET = { x: 0, y: 0 };
function filterSize(nextSize, _a) {
    var maxSize = _a.maxSize, _b = _a.minSize, minSize = _b === void 0 ? 0 : _b;
    if (nextSize < minSize) {
        return {
            nextSize: minSize,
            remainingOffset: nextSize - minSize,
        };
    }
    if (utils_1.isValidNumber(maxSize) && nextSize > maxSize) {
        return {
            nextSize: maxSize,
            remainingOffset: nextSize - maxSize,
        };
    }
    return {
        nextSize: nextSize,
        remainingOffset: 0,
    };
}
function isSolid(_a) {
    var size = _a.size;
    return utils_1.isValidNumber(size);
}
exports.isSolid = isSolid;
function isDisabledResponsive(childProps) {
    var disableResponsive = childProps.disableResponsive;
    if (isSolid(childProps) && disableResponsive === undefined) {
        return true;
    }
    else {
        return !!disableResponsive;
    }
}
exports.isDisabledResponsive = isDisabledResponsive;
function calculateCoordinateOffset(current, previous) {
    if (previous) {
        return {
            x: current.x - previous.x,
            y: current.y - previous.y,
        };
    }
    else {
        return exports.DEFAULT_COORDINATE_OFFSET;
    }
}
exports.calculateCoordinateOffset = calculateCoordinateOffset;
function collectSizeRelatedInfo() {
    var sizeInfoArray = [];
    var responsiveChildCount = 0;
    var responsiveContainerSize = 0;
    return {
        collect: function (sizeInfo) {
            sizeInfoArray.push(sizeInfo);
            if (!sizeInfo.disableResponsive) {
                responsiveChildCount += 1;
                responsiveContainerSize += sizeInfo.currentSize;
            }
        },
        getResult: function () {
            return {
                sizeInfoArray: sizeInfoArray,
                flexGrowRatio: responsiveChildCount / responsiveContainerSize,
            };
        },
    };
}
exports.collectSizeRelatedInfo = collectSizeRelatedInfo;
function doResize(offset, sizeInfo) {
    if (sizeInfo.isSolid) {
        return {
            remainingOffset: offset,
            sizeInfo: sizeInfo,
        };
    }
    var _a = filterSize(sizeInfo.currentSize + offset, sizeInfo), nextSize = _a.nextSize, remainingOffset = _a.remainingOffset;
    return {
        sizeInfo: __assign(__assign({}, sizeInfo), { currentSize: nextSize }),
        remainingOffset: remainingOffset,
    };
}
function resize(barID, offset, trend, sizeInfoArray) {
    var newSizeInfoArray = [];
    var prevRemainingOffset = offset;
    for (var sectionID = barID + trend; isValidSectionID(sectionID); sectionID += trend) {
        if (prevRemainingOffset) {
            var _a = doResize(prevRemainingOffset, sizeInfoArray[sectionID]), sizeInfo = _a.sizeInfo, remainingOffset = _a.remainingOffset;
            prevRemainingOffset = remainingOffset;
            collect(sizeInfo);
        }
        else {
            collect(sizeInfoArray[sectionID]);
        }
    }
    function collect(sizeInfo) {
        if (trend === -1) {
            newSizeInfoArray.unshift(sizeInfo);
        }
        else {
            newSizeInfoArray.push(sizeInfo);
        }
    }
    function isValidSectionID(sectionID) {
        if (trend === -1) {
            return sectionID >= 0;
        }
        else {
            return sectionID <= sizeInfoArray.length - 1;
        }
    }
    return {
        sizeInfoArray: newSizeInfoArray,
        remainingOffset: prevRemainingOffset,
    };
}
function getNextSizeRelatedInfo(barID, offset, sizeInfoArray) {
    var _a = collectSizeRelatedInfo(), collect = _a.collect, getResult = _a.getResult;
    var leftResult = resize(barID, offset, -1, sizeInfoArray);
    var rightResult = resize(barID, -offset, 1, sizeInfoArray);
    var leftUsedOffset = offset - leftResult.remainingOffset;
    var rightUsedOffset = -offset - rightResult.remainingOffset;
    function collectAll(left, right) {
        left.forEach(collect);
        collect(sizeInfoArray[barID]);
        right.forEach(collect);
    }
    if (leftUsedOffset === -rightUsedOffset) {
        collectAll(leftResult.sizeInfoArray, rightResult.sizeInfoArray);
    }
    else if (Math.abs(leftUsedOffset) < Math.abs(rightUsedOffset)) {
        var newRightResult = resize(barID, -leftUsedOffset, 1, sizeInfoArray);
        collectAll(leftResult.sizeInfoArray, newRightResult.sizeInfoArray);
    }
    else {
        var newLeftResult = resize(barID, -rightUsedOffset, -1, sizeInfoArray);
        collectAll(newLeftResult.sizeInfoArray, rightResult.sizeInfoArray);
    }
    return getResult();
}
exports.getNextSizeRelatedInfo = getNextSizeRelatedInfo;
