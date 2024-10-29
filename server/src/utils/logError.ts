export default (error: any, auxData?: any) => {
    console.log(`\n\n${error}\n${JSON.stringify(auxData)}\n\n`);
    console.trace();
};
