import React from 'react'
import { Link } from "react-router-dom"
import "./Admin.css"

export const Admin = () => {

  return (
    <>
    <div style={{ marginTop : "30px"}} />
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin-user"> User Details </Link></li>
            <li className="breadcrumb-item"><Link to="/admin-service"> Service Details </Link></li>
            <li className="breadcrumb-item"> <Link to="/admin-booking" > Booking Details </Link>  </li>
             <li className="breadcrumb-item"><Link to="/admin-provider"> Provider Details </Link></li>
          </ol>
        </nav>
        <hr />
        <section className='grgph' ></section>

      </div>


    </>
  )
}
