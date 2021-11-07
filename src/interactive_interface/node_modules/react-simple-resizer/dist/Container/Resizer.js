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
var utils_1 = require("./utils");
function getBarID(indexOfBar) {
    return indexOfBar * 2 + 1;
}
function getSectionID(indexOfSection) {
    return indexOfSection * 2;
}
var Resizer = (function () {
    function Resizer(resizeResult) {
        this.resizeResult = resizeResult;
        this.isDiscarded = false;
    }
    Resizer.prototype.resizeSection = function (indexOfSection, config) {
        if (this.isDiscarded) {
            return;
        }
        var sectionID = getSectionID(indexOfSection);
        var currentSize = this.getSize(sectionID);
        if (currentSize >= 0 && config.toSize >= 0) {
            var offset = config.toSize - currentSize;
            if (sectionID === this.resizeResult.sizeInfoArray.length - 1 ||
                config.preferMoveLeftBar) {
                this.moveBar(indexOfSection - 1, { withOffset: -offset });
            }
            else {
                this.moveBar(indexOfSection, { withOffset: offset });
            }
        }
    };
    Resizer.prototype.moveBar = function (indexOfBar, config) {
        if (this.isDiscarded) {
            return;
        }
        this.resizeResult = utils_1.getNextSizeRelatedInfo(getBarID(indexOfBar), config.withOffset, this.resizeResult.sizeInfoArray);
    };
    Resizer.prototype.discard = function () {
        this.isDiscarded = true;
    };
    Resizer.prototype.isSectionResized = function (indexOfSection) {
        var sectionID = getSectionID(indexOfSection);
        if ('defaultSizeInfoArray' in this.resizeResult) {
            return (this.getSize(sectionID) !==
                this.resizeResult.defaultSizeInfoArray[sectionID].currentSize);
        }
        else {
            return false;
        }
    };
    Resizer.prototype.isBarActivated = function (indexOfBar) {
        if ('barID' in this.resizeResult) {
            return this.resizeResult.barID === getBarID(indexOfBar);
        }
        else {
            return false;
        }
    };
    Resizer.prototype.getSectionSize = function (indexOfSection) {
        return this.getSize(getSectionID(indexOfSection));
    };
    Resizer.prototype.getResult = function () {
        return __assign(__assign({}, this.resizeResult), { discard: this.isDiscarded });
    };
    Resizer.prototype.getTotalSize = function () {
        return this.resizeResult.sizeInfoArray
            .filter(function (sizeInfo, index) { return sizeInfo && index % 2 === 0; })
            .reduce(function (total, _a) {
            var currentSize = _a.currentSize;
            return total + currentSize;
        }, 0);
    };
    Resizer.prototype.getSize = function (index) {
        var sizeInfo = this.resizeResult.sizeInfoArray[index];
        return sizeInfo ? sizeInfo.currentSize : -1;
    };
    return Resizer;
}());
exports.Resizer = Resizer;
