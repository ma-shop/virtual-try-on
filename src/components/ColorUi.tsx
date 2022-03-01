import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Touchable } from './Touchable';

type ColorUiProps = {
  options: {
    color: string;
    sku?: string;
    name?: string;
  }[];
  value: string;
  onPress: Function;
};

export default function ColorUi(props: ColorUiProps) {
  const { options, value, onPress } = props ?? {};

  return (
    <ScrollView style={styles.container} horizontal>
      {options?.map(({ color, sku, name }) => (
        <View key={`color-option-${sku}-${color}`} style={styles.option}>
          <Text
            style={
              value === color
                ? [styles.colorLabel, styles.selectedLabel]
                : [styles.colorLabel]
            }
          >
            {color}
          </Text>
          <Touchable
            style={
              value === color
                ? [styles.circle, { backgroundColor: color }, styles.selected]
                : [styles.circle, { backgroundColor: color }]
            }
            onPress={() => onPress({ color, name })}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 15,
    paddingLeft: 10,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderWidth: 0,
    alignSelf: 'flex-end',
    margin: 5,
  },
  colorLabel: {
    fontSize: 15,
    marginBottom: 5,
  },
  selected: {
    borderWidth: 3,
    borderColor: '#000000',
  },
  selectedLabel: {
    fontWeight: 'bold',
  },
  option: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10,
  },
});
