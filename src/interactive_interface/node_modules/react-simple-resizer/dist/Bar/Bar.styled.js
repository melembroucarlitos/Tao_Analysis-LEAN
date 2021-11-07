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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.StyledBar = React.forwardRef(function (_a, ref) {
    var size = _a.size, style = _a.style, props = __rest(_a, ["size", "style"]);
    return (React.createElement("div", __assign({}, props, { ref: ref, style: __assign({ position: 'relative', flex: "0 0 " + size + "px" }, style) })));
});
exports.StyledInteractiveArea = React.forwardRef(function (_a, ref) {
    var _b = _a.top, top = _b === void 0 ? 0 : _b, _c = _a.right, right = _c === void 0 ? 0 : _c, _d = _a.bottom, bottom = _d === void 0 ? 0 : _d, _e = _a.left, left = _e === void 0 ? 0 : _e, vertical = _a.vertical, style = _a.style, props = __rest(_a, ["top", "right", "bottom", "left", "vertical", "style"]);
    return (React.createElement("div", __assign({}, props, { style: __assign({ position: 'absolute', top: -top, left: -left, right: -right, bottom: -bottom, cursor: vertical ? 'row-resize' : 'col-resize', WebkitTapHighlightColor: 'transparent', userSelect: 'none' }, style), ref: ref })));
});
