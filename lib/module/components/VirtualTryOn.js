import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { MASVirtualTryOnView } from './MASVirtualTryOnView';
export default function VirtualTryOn(props) {
  const {
    children,
    selectedColor,
    style,
    value
  } = props !== null && props !== void 0 ? props : {};
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(MASVirtualTryOnView, {
    style: [style],
    productColor: selectedColor,
    productType: value === null || value === void 0 ? void 0 : value.type
  }), children));
}
//# sourceMappingURL=VirtualTryOn.js.map