export const styleNumber = (number) => {
    const fixedNumber = Number((number * 0.1).toFixed(2));
    return fixedNumber;
}