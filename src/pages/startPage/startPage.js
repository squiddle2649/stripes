import './startPageStyling.css'
import MyLink from '../../components/mylink'
import OptionComponent from './optionComponent'
const StartPage = ()=>{
    return (
        <div className="flexStartAlignCenter flexColumn fullWidth" style={{height:'fit-content'/* ,width:"390px" */}}>
            <div className='stripeColumns flexCenter'>
                <div className='stripe green'></div>
                <div className='stripe green'></div>
                <div className='stripe green'></div>
                <div className='stripe green'></div>
                <div className='stripe green'></div>
                <div className='stripe green'></div>
                <div className='stripe green'></div>
            </div>
            <div className="pageHeader h1">Stripes</div>
            <div className="pageHeader h3" style={{marginBottom:"15px"}}>Beautiful colors</div>
            <div className='flexCenter flexColumn' style={{gap:'25px'}}>
                <MyLink to="/gradient" >
                    <OptionComponent illustrationType="Gradient"></OptionComponent>
                </MyLink>
                <MyLink to="/animation" >
                    <OptionComponent illustrationType="Animation"></OptionComponent>
                </MyLink>
                <MyLink to="/palette" >
                    <OptionComponent illustrationType="Palette"></OptionComponent>
                </MyLink>
                <MyLink to="/extract" >
                    <OptionComponent illustrationType="Extract"></OptionComponent>
                </MyLink>
            </div>
            <h3 style={{marginTop:"120px", fontFamily:"regular"}}>Bruno Avelar</h3>
        </div>
    )
}

export default StartPage