export const colorToBlack = (rgb,currentTFF)=>{
    /* TFF = two five five = 255. Basically I want to know what value from 255 we are at */
    /* y = mx+t */
    // const compute = (-initialTFF*currentTFF/255)+initialTFF
    const rgbArray = rgbToArray(rgb)
    const newArray =  rgbArray.map((letterValue)=>{
        const result = Math.round((-letterValue*currentTFF/255)+letterValue)
        if(result>255)return 255
        if(result<0)return 0
        return result
    })
    return `rgb(${newArray[0]},${newArray[1]},${newArray[2]})`
}
export const colorToWhite = (rgb, currentTFF)=>{
    const rgbArray = rgbToArray(rgb)
    const newArray =  rgbArray.map((letterValue)=>{
        const result = Math.round(((255-letterValue)*currentTFF/255)+letterValue)
        if(result>255)return 255
        if(result<0)return 0
        return result
    })
    return `rgb(${newArray[0]},${newArray[1]},${newArray[2]})`

}
export const rgbToArray=(rgbString)=> {
        
    // Remove 'rgb(' and ')' from the string
    const rgbValues = rgbString.slice(4, -1);

    // Split the string into an array of color values
    const colorValues = rgbValues.split(',');

    // Convert each color value to a number
    const colorArray = colorValues.map(Number);

    return colorArray;
} 
export const findPrimary = (percentage)=>{ /* 0<=percentage<=100 */
    if(percentage===0||percentage===100)return('rgb(255,0,0)')
    if(percentage>=0&&percentage<(50/3)){
        /* ranges from red to yellow */
        const linearFunction = 255*percentage/(50/3)
        return (`rgb(255,${linearFunction},0)`)
    }
    if(percentage>=(50/3)&&percentage<(50/3)*2){
        /* ranges from red to yellow */
        const linearFunction = (-255*(percentage-(50/3))/(50/3))+255
        return (`rgb(${linearFunction},255,0)`)
    }
    // if(percentage>=50*4/3)return "rgb(0,0,0)"
    if(percentage>=(50/3)*2&&percentage<50){
        /* ranges from red to yellow */
        const linearFunction = 255*(percentage-50*2/3)/(50/3)
        return (`rgb(0,255,${linearFunction})`)
    }
    if(percentage>=50&&percentage<(50/3)*4){
        /* ranges from red to yellow */
        const linearFunction = (-255*(percentage-(50*3/3))/(50/3))+255
        return (`rgb(0,${linearFunction},255)`)
    }
    if(percentage>=(50/3)*4&&percentage<50*5/3){
        /* ranges from red to yellow */
        const linearFunction = 255*(percentage-50*4/3)/(50/3)
        return (`rgb(${linearFunction},0,255)`)
    }
    if(percentage>=50*5/3&&percentage<=100){
        /* ranges from red to yellow */
        const linearFunction = (-255*(percentage-(50*5/3))/(50/3))+255
        return (`rgb(255,0,${linearFunction})`)
    }
   
}
export const calculateColor = (colorDataObject)=>{
    const primaryColor = findPrimary(colorDataObject.primaryPercentage)
    const currentPrimaryToWhite = colorToWhite(primaryColor,colorDataObject.x)
    return colorToBlack(currentPrimaryToWhite,colorDataObject.y)
}