import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type VirtualTryOnProps = {
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
    children: React.ReactNode;
};
export default function VirtualTryOn(props: VirtualTryOnProps): JSX.Element;
export {};
