import './startPageStyling.css'
import { Extract,PlayBtn } from '../../assets/icons'
const OptionComponent = (props)=>{
    return (
        <div className="optionBtn flexCenter flexColumn">
            {props.illustrationType==="Animation"&&
                <div className='illustration animation flexCenter'>
                    {/* <PlayBtn></PlayBtn> */}
                </div>}
            {props.illustrationType==="Extract"&&
                <div style={{backgroundColor:"aqua"}} className='illustration flexCenter'>
                    <img src={require('./../../assets/extract.png')}></img>
                </div>}
            {props.illustrationType==="Gradient"&&
                <div className='illustration gradient flexCenter'>
                </div>}
            {props.illustrationType==="Palette"&&
                <div className='illustration flexCenter'>
                    <div className='fullHeight' style={{width:"25%",backgroundColor:"#9DA49D"}}></div>
                    <div className='fullHeight' style={{width:"25%",backgroundColor:"#8A9A5B"}}></div>
                    <div className='fullHeight' style={{width:"25%",backgroundColor:"#556B2F"}}></div>
                    <div className='fullHeight' style={{width:"25%",backgroundColor:"#708090"}}></div>
                </div>}
            <div className='optionTitle'><strong>{props.illustrationType}</strong></div>
        </div>
    )
}
export default OptionComponent
