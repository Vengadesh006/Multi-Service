import React, { createContext, useContext, useEffect, useState } from 'react'
import logo from "../../assets/m1.png"
import "./Nav.css"
import { Home } from '../home/Home'
import { Link } from 'react-router-dom'
import API from '../Api'

export const Nav = () => {

  const [isAuthenticate, setIsAuthenticate] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsAuthenticate(res.data?.username)

      }
      catch (err) {
        console.log(err?.response?.data?.message);

      }
    }
    fetchData()
  }, [])

  return (

    <>

      <nav className="navbar navbar-expand-lg shadow-lg fixed-top bg-body-tertiary">
        <div className="container">
          <Link href="#" className="navbar-brand">
            <img src={logo} alt="navbar-img" className="navbar-img" /> <span className='mx-2' > {isAuthenticate} </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar-list"
            >
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item mx-3">
                <a href="#service" className="nav-link">Service</a>
              </li>
              <li className="nav-item mx-3">
                <Link to="/addcard" className="nav-link">Cart</Link>
              </li>
            </ul>
            <Link
              to="/login"
              className="btn mx-3"
              style={{ background: "#f57c20", color: "white" }}
            >
              Login
            </Link>


          </div>
        </div>
      </nav>
    </>
  )



}
