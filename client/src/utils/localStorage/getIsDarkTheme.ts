export default () => {
    if (localStorage?.getItem('isDarkTheme') !== null) {
        return localStorage.getItem('isDarkTheme') === '1';
    }

    // In the case the user's local storage is disabled or the 'isDarkTheme' item's value is not set (null) we will use
    // the light theme
    return false;
};
