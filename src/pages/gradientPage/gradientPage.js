import './gradientPageStyling.css'
import { useState,useEffect,useRef, PureComponent } from 'react'
import {percentageToTFF,TFFtoPercentage} from './colorFunctions'
const GradientPage = ()=>{    
    const [cursorDistances,setCursorDistances] = useState([{r:0,g:0,b:0},{r:12,g:8,b:90}])
    const [currentPicker,setCurrentPicker] = useState(0)
    const myRGB = cursorDistances.map((percentage)=>(
        {r:percentageToTFF(percentage.r),
        g:percentageToTFF(percentage.g),
        b:percentageToTFF(percentage.b)}
    ))
    
    const canvasStyling = {
        background: `linear-gradient(90deg,
            rgb(${myRGB[currentPicker].r},${myRGB[currentPicker].g},${myRGB[currentPicker].b}),
            white)`
    }
    return (
        <div className="flexAlignCenter flexColumn fullWidth">
            <div className='h1 pageHeader'>Gradient</div>
            <div className='flexColumn flexCenter' style={{gap:"30px"}}>
                <div className='canvas' style={canvasStyling}></div>
            </div>
            <div className='flexCenter flexColumn' style={{gap:'40px',marginTop:"20px",width:'350px'}}>
                {['r','g','b'].map((letter)=>(
                    <RGBSlider
                        myRGB={myRGB}
                        letter={letter}
                        currentPicker={currentPicker}
                        cursorDistances={cursorDistances}
                        setCursorDistances={setCursorDistances}
                    ></RGBSlider>
                ))}
            </div>
            


        </div>
    )
}
const RGBSlider = ({cursorDistances,currentPicker,letter,myRGB,setCursorDistances})=>{
    const mouseDown = useRef(false)
    const rgbSlider = useRef(null)
    const sliderStyling = (letter)=> {
        let gradient = null
        if(letter==='r'){
            gradient =`linear-gradient(90deg,
                rgb(0,${myRGB[currentPicker].g},${myRGB[currentPicker].b}),
                rgb(255,${myRGB[currentPicker].g},${myRGB[currentPicker].b}))`
        }
        if(letter==='g'){
            gradient =`linear-gradient(90deg,
                rgb(${myRGB[currentPicker].r},0,${myRGB[currentPicker].b}),
                rgb(${myRGB[currentPicker].r},255,${myRGB[currentPicker].b})`
        }
        if(letter==='b'){
            gradient =`linear-gradient(90deg,
                rgb(${myRGB[currentPicker].r},${myRGB[currentPicker].g},0),
                rgb(${myRGB[currentPicker].r},${myRGB[currentPicker].g},255)`
        }
        return {
            width:"200px",height:'20px',
            background:gradient,
            position:'relative'
        }
    }
    const handleXChange = (clientX)=>{
        const sliderRect = rgbSlider.current.getBoundingClientRect()
        let distanceToEdge = clientX-sliderRect.left
        if(distanceToEdge<0)distanceToEdge=0
        if(distanceToEdge>sliderRect.width)distanceToEdge=sliderRect.width
        const distancePercentage = distanceToEdge*100/sliderRect.width

        setCursorDistances((prevCursorDistances)=>{
            const newCursorDistances = [...prevCursorDistances]
            newCursorDistances[currentPicker][letter] = distancePercentage
            return newCursorDistances
        })
        
    }
    /* click */useEffect(()=>{
        
        const handleClick = (event) => {

            const clickedElement = event.target
            if(clickedElement.id===letter){
                mouseDown.current=true
                handleXChange(event.clientX)
            }

        }
       
        document.addEventListener('mousedown', handleClick);
       

        return () => {
          document.removeEventListener('mousedown', handleClick);

        };
    /* left/100 = something/255; something = left*255/100 */
    },[])
    /* drag */useEffect(()=>{
        
        const handleMove = (event)=>{
            if(mouseDown.current){
                handleXChange(event.clientX)
            }
            
        }
        document.addEventListener('mousemove', handleMove);

        return () => {
          document.removeEventListener('mousemove', handleMove);
        };
    },[])
    /* release */useEffect(()=>{
        const handleRelease = () => {
            mouseDown.current = false

        }
    
        document.addEventListener('mouseup', handleRelease);

        return () => {
          document.removeEventListener('mouseup', handleRelease);

        };
    },[])
    const getLeft = ()=>{
        if(letter==='r'){
            return cursorDistances[currentPicker].r
        }
        if(letter==='g'){
            return cursorDistances[currentPicker].g
        }
        if(letter==='b'){
            return cursorDistances[currentPicker].b
        }
    }
    const [inputValue,setInputValue] = useState(myRGB[currentPicker][letter])
    
    
    return (
        <div className='flexSpaceEvenly fullWidth' style={{border:"2px solid aqua"}}>
            <div className='h2' style={{fontFamily:"sourceSerifRegular"}}>{letter}</div>
            <div ref={rgbSlider} id={letter} style={sliderStyling(letter)}>
                <div style={{left:`${getLeft()}%`}} id={letter} className='sliderCursor'></div>
            </div>
            <div className='rgbInputContainer flexCenter'>
                <input
                    className='rgbInput flexCenter h3'
                    value={inputValue} 
                    onChange={(e)=>{
                        const typedInput = e.target.value
                        if(typedInput>=0&&inputValue<=255){
                            setInputValue(Math.round(typedInput))
                        }
                    }
                    }
                ></input>
            </div>
        </div>
    )
}


export default GradientPage