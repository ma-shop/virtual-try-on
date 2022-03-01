"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VirtualTryOn;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _MASVirtualTryOnView = require("./MASVirtualTryOnView");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VirtualTryOn(props) {
  const {
    children,
    selectedColor,
    style,
    value
  } = props !== null && props !== void 0 ? props : {};
  return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_MASVirtualTryOnView.MASVirtualTryOnView, {
    style: [style],
    productColor: selectedColor,
    productType: value === null || value === void 0 ? void 0 : value.type
  }), children));
}
//# sourceMappingURL=VirtualTryOn.js.map