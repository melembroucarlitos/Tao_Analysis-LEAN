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
var context_1 = require("../context");
var utils_1 = require("../utils");
var Section_styled_1 = require("./Section.styled");
var SectionComponent = (function (_super) {
    __extends(SectionComponent, _super);
    function SectionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultInnerRef = React.createRef();
        _this.id = _this.props.context.createID(_this.props);
        _this.subscription = new rxjs_1.Subscription();
        _this.flexGrowRatio = 0;
        _this.resize$ = _this.props.context.sizeRelatedInfo$.pipe(operators_1.map(function (_a) {
            var sizeInfoArray = _a.sizeInfoArray, flexGrowRatio = _a.flexGrowRatio;
            return ({
                sizeInfo: sizeInfoArray[_this.id],
                flexGrowRatio: flexGrowRatio,
            });
        }), operators_1.filter(function (_a) {
            var sizeInfo = _a.sizeInfo;
            return !!sizeInfo;
        }), operators_1.tap(function (_a) {
            var sizeInfo = _a.sizeInfo, flexGrowRatio = _a.flexGrowRatio;
            _this.sizeInfo = sizeInfo;
            _this.flexGrowRatio = flexGrowRatio;
            if (_this.ref.current) {
                var _b = _this.getStyle(sizeInfo, flexGrowRatio), flexGrow = _b.flexGrow, flexShrink = _b.flexShrink, flexBasis = _b.flexBasis;
                _this.ref.current.style.flexGrow = "" + flexGrow;
                _this.ref.current.style.flexShrink = "" + flexShrink;
                _this.ref.current.style.flexBasis = flexBasis + "px";
                _this.onSizeChanged(sizeInfo.currentSize);
            }
        }));
        return _this;
    }
    Object.defineProperty(SectionComponent.prototype, "ref", {
        get: function () {
            return this.props.innerRef || this.defaultInnerRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SectionComponent.prototype, "childProps", {
        get: function () {
            return __assign(__assign({}, utils_1.omit(this.props, [
                'defaultSize',
                'size',
                'disableResponsive',
                'innerRef',
                'onSizeChanged',
            ])), this.getStyle());
        },
        enumerable: true,
        configurable: true
    });
    SectionComponent.prototype.componentDidMount = function () {
        this.subscription.add(this.resize$.subscribe());
        this.props.context.populateInstance(this.id, this.ref);
    };
    SectionComponent.prototype.componentWillUnmount = function () {
        this.subscription.unsubscribe();
    };
    SectionComponent.prototype.render = function () {
        return React.createElement(Section_styled_1.StyledSection, __assign({}, this.childProps, { ref: this.ref }));
    };
    SectionComponent.prototype.onSizeChanged = function (currentSize) {
        if (typeof this.props.onSizeChanged === 'function') {
            this.props.onSizeChanged(currentSize);
        }
    };
    SectionComponent.prototype.getFlexShrink = function () {
        if (utils_1.isValidNumber(this.props.size)) {
            return 0;
        }
        else {
            return this.props.disableResponsive ? 1 : 0;
        }
    };
    SectionComponent.prototype.getStyle = function (sizeInfo, flexGrowRatio) {
        if (sizeInfo === void 0) { sizeInfo = this.sizeInfo; }
        if (flexGrowRatio === void 0) { flexGrowRatio = this.flexGrowRatio; }
        var flexShrink = this.getFlexShrink();
        if (sizeInfo) {
            var disableResponsive = sizeInfo.disableResponsive, currentSize = sizeInfo.currentSize;
            return {
                flexShrink: flexShrink,
                flexGrow: disableResponsive ? 0 : flexGrowRatio * currentSize,
                flexBasis: disableResponsive ? currentSize : 0,
            };
        }
        else {
            var size = this.props.size || this.props.defaultSize;
            if (utils_1.isValidNumber(size)) {
                return {
                    flexShrink: flexShrink,
                    flexGrow: 0,
                    flexBasis: size,
                };
            }
            else {
                return {
                    flexShrink: flexShrink,
                    flexGrow: 1,
                    flexBasis: 0,
                };
            }
        }
    };
    return SectionComponent;
}(React.PureComponent));
exports.Section = context_1.withResizerContext(SectionComponent);
