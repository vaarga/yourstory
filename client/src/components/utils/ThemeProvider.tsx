import React, { ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import { useAppDispatch, State } from '../../store';
import getIsDarkTheme from '../../utils/localStorage/getIsDarkTheme';
import { uiAction } from '../../store/ui/ui-slice';
import getThemeOptions from '../../utils/getThemeOptions';
import { MODE } from '../../constants/theme';

const ThemeProvider = ({ children }: { children: ReactElement[] }): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { isDarkTheme } = useSelector((state: State) => state.ui);

    useEffect(() => {
        const isDarkThemeFromLocalStorage = getIsDarkTheme();

        if (isDarkTheme !== isDarkThemeFromLocalStorage) {
            appDispatch(uiAction.setIsDarkTheme(isDarkThemeFromLocalStorage));
        }
    }, []);

    const theme = useMemo(
        () => createTheme(getThemeOptions(isDarkTheme ? MODE.DARK : MODE.LIGHT)),
        [isDarkTheme],
    );

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            { children }
        </MuiThemeProvider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default ThemeProvider;
