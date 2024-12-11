const percentageDiff = (valA:number, valB:number) => {
    return +Math.abs(100 - valA / valB * 100).toFixed(10);
}

export default percentageDiff;