import React from 'react'
import page from "../../assets/page.png"

export const Page = () => {
  return (
    <>
        <div className='' style={{ display:"flex", alignItems:"center", justifyContent : "center", minHeight : "100vh" }} >
            <img src={page} style={{ width : "100%", height : "100vh" , objectFit : "contain" }} alt="" />
        </div>
    
    </>
  )
}
