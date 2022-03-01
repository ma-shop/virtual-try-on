import React from 'react';
import type { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';

type TouchableProps = {
  style?: ViewStyle[];
  title?: string;
  key?: string;
  onPress: () => void;
  children?: React.ReactNode;
};

export function Touchable(props: TouchableProps) {
  const { children, style, onPress } = props;

  let Component = TouchableOpacity;

  return (
    <Component style={style} onPress={onPress}>
      {children}
    </Component>
  );
}
