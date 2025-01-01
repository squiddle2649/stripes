

export const percentageToTFF = (percentage)=>{
    return Math.round(percentage*255/100)
}
export const TFFtoPercentage = (tff)=>{
    return Math.round(tff*100/255)
}