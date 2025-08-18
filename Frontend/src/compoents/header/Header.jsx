import React, { createContext, useState } from 'react'
import "./Header.css"
import logo from "../../assets/m3.png"


export const Header = () => {


    return (
        <>
        <div className="container-fluid shadow-sm p-5 mb-5" id='header' style={{background : "#f57c20",borderRadius : '1rem' }} >        
            <div className="container col-xxl-8 bg-container">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                   <div className="col-10 col-sm-8 col-lg-6 img-align">
                        <img src={logo} className='d-block mx-lg-auto img-fluid' alt="" />
                    </div> 
                    <div className="col-lg-6">
                        <h2 className='display-5 fw-bold lh-1 text-body-emphasis mb-3 img-fluid' > Book multiple services with the same provider in one visit </h2>
                        <p className='fs-5' >
                            Multiservice booking is the perfect tool for both individual clients and larger groups who want to maximize their time.
                            Take advantage of our easy-to-use system that gives you the freedom to customize your day exactly how you want it.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}
