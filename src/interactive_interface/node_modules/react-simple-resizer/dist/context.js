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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var rxjs_1 = require("rxjs");
var utils_1 = require("./utils");
exports.ResizerProvider = (_a = React.createContext({
    createID: function () { return -1; },
    populateInstance: utils_1.noop,
    triggerBarAction: utils_1.noop,
    vertical: false,
    sizeRelatedInfo$: rxjs_1.EMPTY,
}), _a.Provider), exports.ResizerConsumer = _a.Consumer;
function withResizerContext(Target) {
    return function (props) { return (React.createElement(exports.ResizerConsumer, null, function (context) {
        var finalProps = __assign(__assign({}, props), { context: context });
        return React.createElement(Target, __assign({}, finalProps));
    })); };
}
exports.withResizerContext = withResizerContext;
