"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductTypes = ProductTypes;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _Touchable = require("./Touchable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProductTypes(props) {
  const {
    types,
    value,
    onPress
  } = props !== null && props !== void 0 ? props : {};
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: {
      flexGrow: 0,
      backgroundColor: '#FFFFFF'
    },
    horizontal: true
  }, types === null || types === void 0 ? void 0 : types.map(product => /*#__PURE__*/_react.default.createElement(_Touchable.Touchable, {
    title: product,
    style: [{
      height: 40,
      alignSelf: 'flex-end',
      borderColor: '#000000',
      backgroundColor: '#FFFFFF',
      ...(value === product && {
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#FFFFFF' // replace with a ui.color(something)

      })
    }],
    key: product,
    onPress: () => onPress(product)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: '#000000',
      padding: 10,
      ...(value === product && {
        color: '#FFFFFF'
      })
    }
  }, product))));
}
//# sourceMappingURL=ProductTypes.js.map