"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidNumber(num) {
    return typeof num === 'number' && num === num;
}
exports.isValidNumber = isValidNumber;
function noop() { }
exports.noop = noop;
function omit(props, ignoreKeys) {
    var ignoreKeyMap = ignoreKeys.reduce(function (map, key) {
        map[key] = true;
        return map;
    }, {});
    return Object.keys(props).reduce(function (newProps, key) {
        if (ignoreKeyMap[key]) {
            return newProps;
        }
        else {
            newProps[key] = props[key];
            return newProps;
        }
    }, {});
}
exports.omit = omit;
