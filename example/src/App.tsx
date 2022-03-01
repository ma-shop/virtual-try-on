import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorUi, VirtualTryOn } from 'ma-shop-virtual-try-on';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  // Lipstick (https://www.shop.com/Motives+reg+Maven+Mattes+-1436234961-p+.xhtml)
  // Blush (https://www.shop.com/Motives+reg+Pressed+Blush+-536366009-p+.xhtml)
  // Eyeshadow (https://www.shop.com/Motives+reg+Sublime+Eye+Shadow+Palette+-1902663623-p+.xhtml)
  const lipstick = {
    productType: 'lipstick',
    productName: 'Motives® Maven Mattes',
    options: [
      { name: 'Reveal Me', sku: '10MMLG', color: '#eeb89d' },
      { name: 'Sorry Not Sorry', sku: '15MMLG', color: '#a71a2f' },
      { name: "Daddy's Girl", sku: '12MMLG', color: '#c56e64' },
      { name: "Rust 'n' Roll", sku: '13MMLG', color: '#713b29' },
      { name: 'Scandalous', sku: '14MMLG', color: '#db1d3b' },
      { name: "She's A Doll", sku: '11MMLG', color: '#f2a6a0' },
      { name: 'Try Me', sku: '17MMLG', color: '#a447a7' },
    ],
  };

  const blush = {
    productType: 'blush',
    productName: 'Motives® Pressed Blush',
    options: [
      { name: 'Audacious (Matte)', sku: '204MB', color: '#d95972' },
      { name: 'Azalea (Matte)', sku: '212MB', color: '#ff1a1a' },
      { name: 'Baby Doll (Matte)', sku: '186MB', color: '#f19396' },
      { name: 'Cumin (Matte)', sku: '209MB', color: '#e65b2d' },
      { name: 'Dreamsicle (Pearl)', sku: '213MB', color: '#ff6633' },
      { name: 'English Rose (Matte)', sku: '194MB', color: '#fd7785' },
      { name: 'Ginger (Matte)', sku: '200MB', color: '#f07147' },
      { name: 'Halo (Pearl)', sku: '174MB', color: '#ffe1e1' },
      { name: 'Intriguing (Matte)', sku: '208MB', color: '#9b2921' },
      { name: 'Lust (Pearl)', sku: '176MB', color: '#de6263' },
      { name: 'Mink (Pearl)', sku: '199MB', color: '#c56d76' },
      { name: 'Naughty (Matte)', sku: '181MB', color: '#e16f65' },
      { name: 'Nectar (Pearl)', sku: '214MB', color: '#db5243' },
      { name: 'Peach Beige (Pearl)', sku: '206MB', color: '#de887a' },
      { name: 'Peach Twist (Matte)', sku: '203MB', color: '#f27c4a' },
      { name: 'Peachy Pink (Matte)', sku: '196MB', color: '#ff949b' },
      { name: 'Peony (Matte)', sku: '193MB', color: '#f21c52' },
      { name: 'Pinch Me (Matte)', sku: '201MB', color: '#fd8b9d' },
      { name: 'Poppy Passion (Matte)', sku: '211MB', color: '#ff849a' },
      { name: 'Porcelain Doll (Pearl)', sku: '179MB', color: '#dd6969' },
      { name: 'Pretty in Pink (Matte)', sku: '184MB', color: '#f27850' },
      { name: 'Rebel Rose (Matte)', sku: '205MB', color: '#ff3705' },
      { name: 'Siesta (Pearl)', sku: '198MB', color: '#f27850' },
      { name: 'Sunset (Pearl)', sku: '202MB', color: '#ff3705' },
      /* background color was an image { name: "Winter Nights (Matte)", sku: "207MB", color: "" } */
    ],
  };

  const eyeshadow = {
    productType: 'eyeshadow',
    productName: 'Motives® Sublime Eye Shadow Palette',
    options: [
      { name: 'Elevate', color: '#c2a18a', sku: 'c2a18a' },
      { name: 'Divine', color: '#24332f', sku: '24332f' },
      { name: 'Supreme', color: '#5c4943', sku: '5c4943' },
      { name: 'Glorious', color: '#e6dcc9', sku: 'e6dcc9' },
    ],
  };

  return (
    <>
      <View style={styles.button}>
        <Button
          color={'#202340'}
          title={lipstick.productName}
          onPress={() =>
            navigation.navigate('VirtualTryOn', {
              product: lipstick,
              options: { title: null },
            })
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          style={styles.button}
          color={'#202340'}
          title={blush.productName}
          onPress={() =>
            navigation.navigate('VirtualTryOn', { product: blush })
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          style={styles.button}
          color={'#202340'}
          title={eyeshadow.productName}
          onPress={() =>
            navigation.navigate('VirtualTryOn', { product: eyeshadow })
          }
        />
      </View>
    </>
  );
};

const VirtualTryOnScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [productColor, setProductColor] = useState('');
  const [productColorName, setProductColorName] = useState('Please Select');

  const onSetProductColor = ({ color, name }) => {
    setProductColor(color);
    setProductColorName(name);
  };

  const ProductDetail = () => (
    <>
      <Text style={styles.productName}>{product?.productName}</Text>
      <View style={styles.productColorContainer}>
        <Text style={styles.productColorNameLabel}>Selected color:</Text>
        <Text style={styles.productColorName}>{productColorName}</Text>
      </View>
    </>
  );

  return (
    <VirtualTryOn
      style={{ flex: 1 }}
      selectedColor={productColor}
      value={{
        type: product?.productType,
        options: product?.options,
      }}
    >
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <ProductDetail />
        <ColorUi
          value={productColor}
          options={product?.options}
          onPress={onSetProductColor}
        />
      </View>
    </VirtualTryOn>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitle: '' }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Virtual Try On' }}
        />
        <Stack.Screen
          name="VirtualTryOn"
          component={VirtualTryOnScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
  },
  productName: {
    fontSize: 30,
    paddingTop: 15,
    marginLeft: 15,
  },
  productColorContainer: {
    flexDirection: 'row',
  },
  productColorName: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 15,
    marginLeft: 15,
  },
  productColorNameLabel: {
    fontSize: 20,
    paddingTop: 15,
    marginLeft: 15,
  },
});
