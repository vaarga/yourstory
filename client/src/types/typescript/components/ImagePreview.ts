export type CanvasCssProperty = {
    width: string;
    height: string;
    maxWidth: number;
    maxHeight: number;
    aspectRatio: string;
    borderRadius: number;
};

export type DivCssProperty = CanvasCssProperty & {
    p: number;
    backgroundColor: string;
    display: string;
    textAlign: string;
    alignItems: string;
};
