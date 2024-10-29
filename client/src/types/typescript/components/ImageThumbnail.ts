export type DefaultCssProperty = {
    flex: number;
    aspectRatio: string;
    display: string;
};

export type CanvasContainerCssProperty = DefaultCssProperty & {
    position: string;
};

export type IconButtonContainerCssProperty = DefaultCssProperty & {
    justifyContent: string;
    alignItems: string;
    backgroundColor: string;
    borderRadius: number;
};
