import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Touchable } from './Touchable';

type ProductTypesProps = {
  types: string[];
  value: string;
  onPress: Function;
};

export function ProductTypes(props: ProductTypesProps) {
  const { types, value, onPress } = props ?? {};
  return (
    <ScrollView style={{ flexGrow: 0, backgroundColor: '#FFFFFF' }} horizontal>
      {types?.map((product) => (
        <Touchable
          title={product}
          style={[
            {
              height: 40,
              alignSelf: 'flex-end',
              borderColor: '#000000',
              backgroundColor: '#FFFFFF',
              ...(value === product && {
                backgroundColor: '#000000',
                borderWidth: 1,
                borderColor: '#FFFFFF', // replace with a ui.color(something)
              }),
            },
          ]}
          key={product}
          onPress={() => onPress(product)}
        >
          <Text
            style={{
              color: '#000000',
              padding: 10,
              ...(value === product && {
                color: '#FFFFFF',
              }),
            }}
          >
            {product}
          </Text>
        </Touchable>
      ))}
    </ScrollView>
  );
}
