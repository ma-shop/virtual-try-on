import { requireNativeComponent, UIManager, Platform } from 'react-native';
const LINKING_ERROR = "The package 'ma-shop-virtual-try-on' doesn't seem to be linked. Make sure: \n\n" + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const ComponentName = 'MASVirtualTryOnView';
export const MASVirtualTryOnView = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
//# sourceMappingURL=MASVirtualTryOnView.js.map