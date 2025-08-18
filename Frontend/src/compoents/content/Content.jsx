import React from 'react'
import "./Content.css"
import logo from "../../assets/bc.png"

export const Content = () => {
    return (
        <div className="container mb-3">
            <hr />
            <div className="row align-items-center g-5">
                {/* IMAGE COLUMN */}
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <div className="hero-container">
                        <div className="blob blob-back"></div>
                        <div className="blob blob-front"></div>
                        <img
                            src={logo}
                            alt="woman"
                            className="person-img img-fluid"
                        />
                    </div>
                </div>

                {/* CONTENT COLUMN */}
                <div className="col-12 col-md-6">
                    <h1 style={{ lineHeight: "1.2" }}>Create your plans and pricing</h1>
                    <p style={{ lineHeight: "1.6" }}>
                        Done with the setup ✅ <br />
                        Time to define the pricing of your appointment booking startup. Manage your booking
                        SaaS startup with no lines of code. Charge different pricing plans for
                        your appointment booking service at different plans to your customers.
                    </p>
                </div>
            </div>
        </div>


    )
}
