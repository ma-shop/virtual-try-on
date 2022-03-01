import React from 'react';
import { TouchableOpacity } from 'react-native';
export function Touchable(props) {
  const {
    children,
    style,
    onPress
  } = props;
  let Component = TouchableOpacity;
  return /*#__PURE__*/React.createElement(Component, {
    style: style,
    onPress: onPress
  }, children);
}
//# sourceMappingURL=Touchable.js.map