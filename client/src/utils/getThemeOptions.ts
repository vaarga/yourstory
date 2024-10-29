import { MODE, COLOR } from '../constants/theme';

export default (mode: MODE) => ({
    palette: {
        mode,
        primary: {
            main: COLOR.turquoise,
        },
        secondary: {
            main: COLOR.orange,
        },
        error: {
            main: COLOR.red,
        },
        warning: {
            main: COLOR.yellow,
        },
        heart: {
            main: COLOR.red,
        },
        delete: {
            main: COLOR.red,
            dark: COLOR.redDark,
            contrastText: COLOR.whiteLight,
        },
        background: {
            default: mode === MODE.LIGHT
                ? COLOR.white
                : COLOR.black,
            paper: mode === MODE.LIGHT
                ? COLOR.whiteLight
                : COLOR.blackLight,
        },
        googleSignInButton: {
            background: {
                default: mode === MODE.LIGHT
                    ? COLOR.blueLight
                    : COLOR.whiteLight,
                active: mode === MODE.LIGHT
                    ? COLOR.blue
                    : COLOR.whiteDark,
            },
            text: mode === MODE.LIGHT
                ? COLOR.whiteLight
                : COLOR.grey,
            iconBackground: mode === MODE.LIGHT
                ? COLOR.whiteLight
                : 'transparent',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained' as 'contained',
            },
        },
        MuiLoadingButton: {
            defaultProps: {
                variant: 'contained' as 'contained',
            },
        },
        MuiCircularProgress: {
            defaultProps: {
                size: 100,
                thickness: 2,
            },
        },
    },
});
