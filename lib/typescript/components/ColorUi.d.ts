declare type ColorUiProps = {
    options: {
        color: string;
        sku?: string;
        name?: string;
    }[];
    value: string;
    onPress: Function;
};
export default function ColorUi(props: ColorUiProps): JSX.Element;
export {};
