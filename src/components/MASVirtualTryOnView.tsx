import {
  requireNativeComponent,
  UIManager,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  "The package 'ma-shop-virtual-try-on' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type MASVirtualTryOnViewProps = {
  productType?: string;
  productColor: string;
  style?: StyleProp<ViewStyle>;
};

const ComponentName = 'MASVirtualTryOnView';

export const MASVirtualTryOnView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<MASVirtualTryOnViewProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
