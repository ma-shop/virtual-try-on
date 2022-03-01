"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Touchable = Touchable;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Touchable(props) {
  const {
    children,
    style,
    onPress
  } = props;
  let Component = _reactNative.TouchableOpacity;
  return /*#__PURE__*/_react.default.createElement(Component, {
    style: style,
    onPress: onPress
  }, children);
}
//# sourceMappingURL=Touchable.js.map