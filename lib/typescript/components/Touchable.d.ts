import React from 'react';
import type { ViewStyle } from 'react-native';
declare type TouchableProps = {
    style?: ViewStyle[];
    title?: string;
    key?: string;
    onPress: () => void;
    children?: React.ReactNode;
};
export declare function Touchable(props: TouchableProps): JSX.Element;
export {};
