import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Touchable } from './Touchable';
export function ProductTypes(props) {
  const {
    types,
    value,
    onPress
  } = props !== null && props !== void 0 ? props : {};
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: {
      flexGrow: 0,
      backgroundColor: '#FFFFFF'
    },
    horizontal: true
  }, types === null || types === void 0 ? void 0 : types.map(product => /*#__PURE__*/React.createElement(Touchable, {
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
  }, /*#__PURE__*/React.createElement(Text, {
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