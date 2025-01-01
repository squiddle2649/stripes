import './gradientPageStyling.css'
import { useState,useEffect,useRef, PureComponent } from 'react'
import {rgbToArray, colorToBlack, calculateColor, colorToWhite, findPrimary } from './colorFunctions'
const GradientPage = ()=>{
    const [currentPercentage, setCurrentPercentage] = useState(null)
    const [percentagesList,setPercentagesList] = useState([3,15,70])
    const [colorsData,setColorsData] = useState([
        {primaryPercentage:0,x:0,y:0,gradientPercentage:0},
        {primaryPercentage:50,x:0,y:0,gradientPercentage:100}
    ])
    const [currentPicker,setCurrentPicker] = useState(0)
    const canvasStyling = {
        background: `linear-gradient(90deg,
            ${calculateColor(colorsData[0])} ${colorsData[0].gradientPercentage}%,
            ${calculateColor(colorsData[1])} ${colorsData[1].gradientPercentage}%)`
    }
    
    const sliderStyling = (letter)=> {
        let gradient = null
        if(letter==='r'){
            gradient =`linear-gradient(90deg,
                rgb(0,${myRGB[1]},${myRGB[2]}),
                rgb(255,${myRGB[1]},${myRGB[2]})`
        }
        if(letter==='g'){
            gradient =`linear-gradient(90deg,
                rgb(${myRGB[0]},0,${myRGB[2]}),
                rgb(${myRGB[0]},255,${myRGB[2]})`
        }
        if(letter==='b'){
            gradient =`linear-gradient(90deg,
                rgb(${myRGB[0]},${myRGB[1]},0),
                rgb(${myRGB[0]},${myRGB[1]},255)`
        }
        return {
            marginBottom:"20px", 
            width:"200px",height:'20px',
            background:gradient,
            color:'white'
        }
    }
    const [myRGB,setMyRGB] = useState([4,25,100])
    const [currentTFF,setCurrentTFF] = useState(0)
    return (
        <div className="flexAlignCenter flexColumn fullWidth">
            <div className='h1 pageHeader'>Gradient</div>
            <div className='flexColumn flexCenter' style={{gap:"30px"}}>
                <div className='canvas' style={canvasStyling}></div>
                <div className='sliderContainer flexSpaceBetween' style={canvasStyling}>
                {colorsData.map((dataOfColor,index) => {
                    /* index has to be second parameter, so leave the first one empty */
                    return ( 
                        <div  className='stopPicker' key={index} onClick={() => {
                            setCurrentPicker(index)
                             }}>
                        </div>
                    );
                })}
                </div>
            </div>
            
            <div style={sliderStyling('r')}>R</div>
            <div style={sliderStyling('g')}>R</div>
            <div style={sliderStyling('b')}>R</div>
            
            {/* <RGB rgb = {calculateColor(colorsData[currentPicker])}></RGB> */}
            {/* <PrimaryGradient 
                currentPicker={currentPicker}
                colorsData={colorsData}
                setColorsData={setColorsData}
            ></PrimaryGradient>
            <Grayscale 
                currentPicker={currentPicker}
                colorsData={colorsData}
                setColorsData={setColorsData}
            ></Grayscale> */}
        </div>
    )
}
const RGB = ({rgb})=>{
    const rgbArray = rgbToArray(rgb)
    return (
        <div className='flexSpaceBetween' style={{margin:"20px 0"}}>
            <div className='grid3Column gridCentered' style={{gap:"10px 40px"}}>
                <div className='rgbBox flexCenter h3'>{rgbArray[0]}</div>
                <div className='rgbBox flexCenter h3'>{rgbArray[1]}</div>
                <div className='rgbBox flexCenter h3'>{rgbArray[2]}</div>
                <div className='h2' style={{fontFamily:"sourceSerifRegular"}}>r</div>
                <div className='h2' style={{fontFamily:"sourceSerifRegular"}}>g</div>
                <div className='h2' style={{fontFamily:"sourceSerifRegular"}}>b</div>
            </div>
        </div>
    )
}
const PrimaryGradient = ({setColorsData,currentPicker,colorsData})=>{
    const [togglePosition,setTogglePosition] = useState(null)
    const mouseDown = useRef(false)
    const primaryGradient = useRef(null)
    const handlePositionChange = (leftPercentage)=>{
        /* leftPercentage refers to the css propert of "left: x%" */
        setColorsData(prevColorsData => {
            const newColorsData = [...prevColorsData];/* copy */ 
            if(leftPercentage>=100){
                newColorsData[currentPicker].primaryPercentage = 100
                return newColorsData
            }
            if(leftPercentage<=0){
                newColorsData[currentPicker].primaryPercentage = 0
            }
            else{
                newColorsData[currentPicker].primaryPercentage = leftPercentage
            }
            return newColorsData
        });
    }
    const handleXChange = (clientX)=>{
        const gradientRect = primaryGradient.current.getBoundingClientRect()
        const distanceToEdge = clientX - gradientRect.left
        const distancePercent = (distanceToEdge/gradientRect.width)*100
        handlePositionChange(distancePercent)
        /* move the toggle */
        setTogglePosition(distancePercent)

    } 
    /* click */useEffect(()=>{
        
        const handleClick = (event) => {

            const clickedElement = event.target
            if(clickedElement.id==="picker"||clickedElement.id==="primaryGradient"){
                mouseDown.current=true
                console.log(currentPicker)
                handleXChange(event.clientX)                
            }

        }
       
        document.addEventListener('mousedown', handleClick);
       

        return () => {
          document.removeEventListener('mousedown', handleClick);

        };
    },[currentPicker])
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
    },[currentPicker])
    /* release */useEffect(()=>{
        const handleRelease = () => {
            mouseDown.current = false

        }
    
        document.addEventListener('mouseup', handleRelease);

        return () => {
          document.removeEventListener('mouseup', handleRelease);

        };
    },[])

    useEffect (()=>{
        /* whenever the activatedClicker changes we updates
        the position of the toggle */
       setTogglePosition(colorsData[currentPicker].primaryPercentage)
    },[currentPicker])

    return (
        <div className="primaryGradient" id="primaryGradient" ref={primaryGradient}>
    <div
        className="picker"
        id="picker"

        style={{
            left: togglePosition <= 0 ? "0" : (togglePosition >= 100 ? "100%" : `${togglePosition}%`)
        }}
          
    ></div>
</div>
    )
}
const Grayscale = ({setColorsData,colorsData,currentPicker})=>{    
    const cursorPosition ={x:colorsData[currentPicker].x,y:colorsData[currentPicker].y}
    const grayscaleContainer = useRef(null)
    const mouseDown = useRef(false)
    const handleCursorMove = (clientX,clientY)=>{
        const grayscaleRect = grayscaleContainer.current.getBoundingClientRect()
        const distanceToRight = grayscaleRect.right-clientX
        const distanceToTop = clientY - grayscaleRect.top
        /* move the toggle */
        setColorsData(prevColorsData => {
            const newColorsData = [...prevColorsData];/* copy */ 
            /* x/400 = something/255 */
            newColorsData[currentPicker].x = distanceToRight*255/400
            newColorsData[currentPicker].y = distanceToTop
            return newColorsData
        })
        // console.log('ready to move')

    }
    /* click */useEffect(()=>{
        
        const handleClick = (event) => {

            const clickedElement = event.target
            if(clickedElement.id==="grayscalePicker"||clickedElement.id==="grayscale"){
                mouseDown.current=true
                handleCursorMove(event.clientX,event.clientY)
            }

        }
       
        document.addEventListener('mousedown', handleClick);
       

        return () => {
          document.removeEventListener('mousedown', handleClick);

        };
    },[currentPicker])
    /* release */useEffect(()=>{
        
        const handleRelease = (event) => {
            mouseDown.current=false

        }
       
        document.addEventListener('mouseup', handleRelease);
       

        return () => {
          document.removeEventListener('mouseup', handleRelease);

        };
    },[currentPicker])
    /* drag */useEffect(()=>{
        
        const handleDrag = (event) => {
            if(mouseDown.current){
                mouseDown.current=true
                handleCursorMove(event.clientX,event.clientY)
            }

        }
       
        document.addEventListener('mousemove', handleDrag);
       

        return () => {
          document.removeEventListener('mousemove', handleDrag);

        };
    },[currentPicker])
    
    const handlePickerMove = (newX,newY)=>{

        // [{percentage:50,x:0,y:0}]
        /* x and y are between 0 and 255 */
        /* x/400 = something/255=> something = x*255/400 */
        setColorsData(prevColorsData => {
            const newColorsData = [...prevColorsData];/* copy */ 
            newColorsData[currentPicker].x=/* newX*255/400 */newX
            newColorsData[currentPicker].y=newY
            return newColorsData 
        })
    }
    const positionRight = (x)=>{
        /* 0<x<255 */
        /* why 400? width of grayscaleGradient = 400px */
        const right = x*400/255
        if(right>=400)return `${400-11}px`
        if(right<=0)return '-10px'
        return `${(x*400/255)-11}px`
    }
    const positionTop = (y)=>{
        /* 0<y<255 */
        if(y>=255)return `${255-11}px`
        if(y<0)return '-11px'
        return `${y-11}px`
    }
    return (
        <div className='grayscaleContainer' ref={grayscaleContainer} >
            {Array.from({ length: 256 }, (currentTFF, index) => (
                <div 
                // ${colorToBlack(white,index+1)}, 
                    key={index} 
                    style={{
                        background:`linear-gradient(90deg,${colorToBlack("rgb(255,255,255)",index)},${colorToBlack(findPrimary(colorsData[currentPicker].primaryPercentage),index)})`
                    }} 
                    id="grayscale"
                    className="grayscale">
                </div>
            ))}
            {/* x/255 = something/400 */}
            <div style={{right:positionRight(cursorPosition.x),top:positionTop(cursorPosition.y)}} id='grayscalePicker' className='grayscalePicker'></div>
            <div style={{width:'40px',height:'40px',background:`$`}}></div>
        </div>
    )
}
export default GradientPage