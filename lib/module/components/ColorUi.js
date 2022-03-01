import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Touchable } from './Touchable';
export default function ColorUi(props) {
  const {
    options,
    value,
    onPress
  } = props !== null && props !== void 0 ? props : {};
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container,
    horizontal: true
  }, options === null || options === void 0 ? void 0 : options.map(_ref => {
    let {
      color,
      sku,
      name
    } = _ref;
    return /*#__PURE__*/React.createElement(View, {
      key: `color-option-${sku}-${color}`,
      style: styles.option
    }, /*#__PURE__*/React.createElement(Text, {
      style: value === color ? [styles.colorLabel, styles.selectedLabel] : [styles.colorLabel]
    }, color), /*#__PURE__*/React.createElement(Touchable, {
      style: value === color ? [styles.circle, {
        backgroundColor: color
      }, styles.selected] : [styles.circle, {
        backgroundColor: color
      }],
      onPress: () => onPress({
        color,
        name
      })
    }));
  }));
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 15,
    paddingLeft: 10
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderWidth: 0,
    alignSelf: 'flex-end',
    margin: 5
  },
  colorLabel: {
    fontSize: 15,
    marginBottom: 5
  },
  selected: {
    borderWidth: 3,
    borderColor: '#000000'
  },
  selectedLabel: {
    fontWeight: 'bold'
  },
  option: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10
  }
});
//# sourceMappingURL=ColorUi.js.map