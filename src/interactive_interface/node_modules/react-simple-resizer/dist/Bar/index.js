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
var types_1 = require("../types");
var utils_1 = require("../utils");
var context_1 = require("../context");
var Bar_styled_1 = require("./Bar.styled");
var disablePassive_1 = require("./disablePassive");
var BarComponent = (function (_super) {
    __extends(BarComponent, _super);
    function BarComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultInnerRef = React.createRef();
        _this.interactiveAreaRef = React.createRef();
        _this.id = _this.props.context.createID(_this.props);
        _this.isValidClick = true;
        _this.isActivated = false;
        _this.onMouseDown = _this.triggerMouseAction(types_1.BarActionType.ACTIVATE);
        _this.onMouseMove = _this.triggerMouseAction(types_1.BarActionType.MOVE);
        _this.onMouseUp = _this.triggerMouseAction(types_1.BarActionType.DEACTIVATE);
        _this.onTouchStart = _this.triggerTouchAction(types_1.BarActionType.ACTIVATE);
        _this.onTouchMove = _this.triggerTouchAction(types_1.BarActionType.MOVE);
        _this.onTouchEnd = _this.triggerTouchAction(types_1.BarActionType.DEACTIVATE);
        _this.onTouchCancel = _this.triggerTouchAction(types_1.BarActionType.DEACTIVATE);
        return _this;
    }
    Object.defineProperty(BarComponent.prototype, "ref", {
        get: function () {
            return this.props.innerRef || this.defaultInnerRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "childProps", {
        get: function () {
            return utils_1.omit(this.props, [
                'context',
                'innerRef',
                'onClick',
                'expandInteractiveArea',
                'onStatusChanged',
            ]);
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.componentDidMount = function () {
        this.props.context.populateInstance(this.id, this.ref);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('touchmove', this.onTouchMove, disablePassive_1.disablePassive);
        document.addEventListener('touchend', this.onTouchEnd);
        document.addEventListener('touchcancel', this.onTouchCancel);
        if (this.interactiveAreaRef.current) {
            this.interactiveAreaRef.current.addEventListener('mousedown', this.onMouseDown);
            this.interactiveAreaRef.current.addEventListener('touchstart', this.onTouchStart, disablePassive_1.disablePassive);
        }
    };
    BarComponent.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        document.removeEventListener('touchcancel', this.onTouchCancel);
        if (this.interactiveAreaRef.current) {
            this.interactiveAreaRef.current.removeEventListener('mousedown', this.onMouseDown);
            this.interactiveAreaRef.current.removeEventListener('touchstart', this.onTouchStart);
        }
    };
    BarComponent.prototype.render = function () {
        return (React.createElement(Bar_styled_1.StyledBar, __assign({}, this.childProps, { ref: this.ref }),
            this.props.children,
            React.createElement(Bar_styled_1.StyledInteractiveArea, __assign({}, this.props.expandInteractiveArea, { ref: this.interactiveAreaRef, vertical: this.props.context.vertical }))));
    };
    BarComponent.prototype.onStatusChanged = function (isActivated) {
        if (this.isActivated !== isActivated) {
            this.isActivated = isActivated;
            if (typeof this.props.onStatusChanged === 'function') {
                this.props.onStatusChanged(isActivated);
            }
        }
    };
    BarComponent.prototype.updateStatusIfNeed = function (type) {
        if (type === types_1.BarActionType.ACTIVATE) {
            this.onStatusChanged(true);
        }
        else if (type === types_1.BarActionType.DEACTIVATE) {
            this.onStatusChanged(false);
        }
    };
    BarComponent.prototype.triggerAction = function (type, coordinate) {
        if (this.isActivated || type === types_1.BarActionType.ACTIVATE) {
            this.props.context.triggerBarAction({ type: type, coordinate: coordinate, barID: this.id });
        }
        if (this.isActivated && type === types_1.BarActionType.DEACTIVATE) {
            this.onClick();
        }
        this.updateStatusIfNeed(type);
        this.updateClickStatus(type);
    };
    BarComponent.prototype.triggerMouseAction = function (type) {
        var _this = this;
        return function (event) {
            _this.disableUserSelectIfResizing(event, type);
            var x = event.clientX, y = event.clientY;
            _this.triggerAction(type, { x: x, y: y });
        };
    };
    BarComponent.prototype.triggerTouchAction = function (type) {
        var _this = this;
        return function (event) {
            _this.disableUserSelectIfResizing(event, type);
            var touch = event.touches[0] || { clientX: 0, clientY: 0 };
            var x = touch.clientX, y = touch.clientY;
            _this.triggerAction(type, { x: x, y: y });
        };
    };
    BarComponent.prototype.disableUserSelectIfResizing = function (event, type) {
        if (this.isActivated || type === types_1.BarActionType.ACTIVATE) {
            event.preventDefault();
        }
    };
    BarComponent.prototype.updateClickStatus = function (type) {
        if (this.isActivated) {
            if (type === types_1.BarActionType.ACTIVATE) {
                this.isValidClick = true;
            }
            else if (type === types_1.BarActionType.MOVE) {
                this.isValidClick = false;
            }
        }
    };
    BarComponent.prototype.onClick = function () {
        if (this.isValidClick && typeof this.props.onClick === 'function') {
            this.isValidClick = false;
            this.props.onClick();
        }
    };
    return BarComponent;
}(React.PureComponent));
exports.Bar = context_1.withResizerContext(BarComponent);
