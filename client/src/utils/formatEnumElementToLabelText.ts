export default (enumElement: string) => {
    const enumElementWithSpace = enumElement.replace('_', ' ').replace('-', ' ');

    return enumElementWithSpace.charAt(0).toUpperCase() + enumElementWithSpace.slice(1).toLowerCase();
};
