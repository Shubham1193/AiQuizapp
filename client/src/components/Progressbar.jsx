import React from 'react'

function Progressbar({progress}) {
  return (
    <div style={{width:"100%",height:"5%" , border:"2px solid "}}>
        <div style={{width:`${progress}%` , height:"100%" , backgroundColor:"red" , borderRadius:"1.5rem"}}></div>
    </div>
  )
}

export default Progressbar