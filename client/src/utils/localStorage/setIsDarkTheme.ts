export default (isDarkTheme: boolean) => {
    if (localStorage) {
        localStorage.setItem('isDarkTheme', isDarkTheme ? '1' : '0');
    }
};
