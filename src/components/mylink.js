import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const MyLink = ({children,to,navOptions,linkStyling,classStyle})=>{


    const navigate = useNavigate()
    
    return (
        <div 
            class={classStyle}
            style={linkStyling}
            onClick={()=>{
                try{
                    navigate(to,navOptions)
                    
                }
                catch(err){
                    alert(`little error here with link…:${err.message}`)
                }
            }}
        >
            {children}
        </div>
    )
}

export default MyLink