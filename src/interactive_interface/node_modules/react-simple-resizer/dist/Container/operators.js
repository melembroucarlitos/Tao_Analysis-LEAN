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
var operators_1 = require("rxjs/operators");
var types_1 = require("../types");
var utils_1 = require("./utils");
var DEFAULT_BAR_ACTION_SCAN_RESULT = {
    barID: -1,
    offset: 0,
    type: types_1.BarActionType.DEACTIVATE,
    originalCoordinate: utils_1.DEFAULT_COORDINATE_OFFSET,
    defaultSizeInfoArray: [],
    sizeInfoArray: [],
    discard: true,
    flexGrowRatio: 0,
};
function scanBarAction(config) {
    return operators_1.scan(function (prevResult, action) {
        var result = {
            barID: action.barID,
            type: action.type,
        };
        switch (action.type) {
            case types_1.BarActionType.ACTIVATE:
                var _a = config.getSizeRelatedInfo(), sizeInfoArray = _a.sizeInfoArray, flexGrowRatio = _a.flexGrowRatio;
                return __assign(__assign(__assign({}, DEFAULT_BAR_ACTION_SCAN_RESULT), result), { originalCoordinate: action.coordinate, defaultSizeInfoArray: sizeInfoArray, sizeInfoArray: sizeInfoArray,
                    flexGrowRatio: flexGrowRatio });
            case types_1.BarActionType.MOVE:
                var offset = config.calculateOffset(action.coordinate, prevResult.originalCoordinate);
                return __assign(__assign(__assign({}, result), utils_1.getNextSizeRelatedInfo(action.barID, offset, prevResult.defaultSizeInfoArray)), { offset: offset, originalCoordinate: prevResult.originalCoordinate, defaultSizeInfoArray: prevResult.defaultSizeInfoArray, discard: false });
            case types_1.BarActionType.DEACTIVATE:
                return DEFAULT_BAR_ACTION_SCAN_RESULT;
        }
    }, DEFAULT_BAR_ACTION_SCAN_RESULT);
}
exports.scanBarAction = scanBarAction;
