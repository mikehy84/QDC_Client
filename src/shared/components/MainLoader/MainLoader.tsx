import React from 'react'
import loadingGif from "../../style/images/loading.gif"
import { motion as m } from "framer-motion";



export const MainLoader = () => {
  return (
    <div style={{display:'flex', margin:'auto' }}>
      <img src={loadingGif} alt="" />
    </div>
  )
}
