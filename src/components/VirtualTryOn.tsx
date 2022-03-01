import React from 'react';
import { View, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { MASVirtualTryOnView } from './MASVirtualTryOnView';

type VirtualTryOnProps = {
  color: string;
  selectedColor: string;
  onSetProduct?: Function;
  style?: StyleProp<ViewStyle>;
  types?: string[];
  value?: {
    type: string;
    options: {
      color?: string;
      sku?: string;
      name?: string;
    }[];
  };
  // Passing a fragment as children will result in a Runtime Error: Objects not valid as React Child!
  children: React.ReactNode;
};

export default function VirtualTryOn(props: VirtualTryOnProps) {
  const { children, selectedColor, style, value } = props ?? {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MASVirtualTryOnView
          style={[style]}
          productColor={selectedColor}
          productType={value?.type}
        />
        {children}
      </View>
    </SafeAreaView>
  );
}
