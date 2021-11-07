"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var types_1 = require("../types");
var utils_1 = require("../utils");
var context_1 = require("../context");
var Resizer_1 = require("./Resizer");
exports.Resizer = Resizer_1.Resizer;
var operators_2 = require("./operators");
var utils_2 = require("./utils");
var Container_styled_1 = require("./Container.styled");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.childrenProps = [];
        _this.childrenInstance = [];
        _this.barActions$ = new rxjs_1.Subject();
        _this.sizeRelatedInfoAction$ = new rxjs_1.Subject();
        _this.sizeRelatedInfo$ = rxjs_1.merge(_this.sizeRelatedInfoAction$, _this.barActions$.pipe(operators_2.scanBarAction({
            calculateOffset: function (current, original) {
                return utils_2.calculateCoordinateOffset(current, original)[_this.axis];
            },
            getSizeRelatedInfo: function () { return _this.makeSizeInfos(); },
        }), operators_1.tap(function (scanResult) { return _this.monitorBarStatusChanges(scanResult); }))).pipe(operators_1.filter(function (_a) {
            var discard = _a.discard;
            return !discard;
        }), operators_1.map(function (resizeResult) {
            if (typeof _this.props.beforeApplyResizer === 'function') {
                var resizer = new Resizer_1.Resizer(resizeResult);
                _this.props.beforeApplyResizer(resizer);
                return resizer.getResult();
            }
            else {
                return resizeResult;
            }
        }), operators_1.filter(function (_a) {
            var discard = _a.discard;
            return !discard;
        }), operators_1.observeOn(rxjs_1.animationFrameScheduler), operators_1.share());
        _this.triggerBarAction = function (action) {
            _this.barActions$.next(action);
        };
        _this.createID = function (childProps) {
            _this.childrenProps.push(childProps);
            return _this.childrenProps.length - 1;
        };
        _this.populateChildInstance = function (id, ref) {
            if (ref.current) {
                _this.childrenInstance[id] = ref.current;
            }
        };
        return _this;
    }
    Object.defineProperty(Container.prototype, "axis", {
        get: function () {
            return this.props.vertical ? 'y' : 'x';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "dimension", {
        get: function () {
            return this.props.vertical ? 'height' : 'width';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "contextValue", {
        get: function () {
            return {
                vertical: !!this.props.vertical,
                sizeRelatedInfo$: this.sizeRelatedInfo$,
                createID: this.createID,
                populateInstance: this.populateChildInstance,
                triggerBarAction: this.triggerBarAction,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "containerProps", {
        get: function () {
            return utils_1.omit(this.props, [
                'onActivate',
                'beforeApplyResizer',
                'afterResizing',
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.componentDidMount = function () {
        this.refreshSizeInfos();
    };
    Container.prototype.render = function () {
        return (React.createElement(context_1.ResizerProvider, { value: this.contextValue },
            React.createElement(Container_styled_1.StyledContainer, __assign({}, this.containerProps), this.props.children)));
    };
    Container.prototype.getResizer = function () {
        return new Resizer_1.Resizer(this.makeSizeInfos());
    };
    Container.prototype.applyResizer = function (resizer) {
        this.sizeRelatedInfoAction$.next(resizer.getResult());
    };
    Container.prototype.monitorBarStatusChanges = function (_a) {
        var type = _a.type;
        switch (type) {
            case types_1.BarActionType.ACTIVATE:
                if (typeof this.props.onActivate === 'function') {
                    this.props.onActivate();
                }
                return;
            case types_1.BarActionType.DEACTIVATE:
                if (typeof this.props.afterResizing === 'function') {
                    this.props.afterResizing();
                }
                return;
            default:
                return;
        }
    };
    Container.prototype.refreshSizeInfos = function () {
        this.sizeRelatedInfoAction$.next(this.makeSizeInfos());
    };
    Container.prototype.makeSizeInfos = function () {
        var _this = this;
        var _a = utils_2.collectSizeRelatedInfo(), collect = _a.collect, getResult = _a.getResult;
        this.childrenProps.forEach(function (childProps, index) {
            var element = _this.childrenInstance[index];
            collect({
                maxSize: childProps.maxSize,
                minSize: childProps.minSize,
                disableResponsive: utils_2.isDisabledResponsive(childProps),
                isSolid: utils_2.isSolid(childProps),
                currentSize: element.getBoundingClientRect()[_this.dimension],
            });
        });
        return getResult();
    };
    return Container;
}(React.PureComponent));
exports.Container = Container;
