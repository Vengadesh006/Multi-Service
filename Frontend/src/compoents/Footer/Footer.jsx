import React from 'react'
import "./Footer.css"

export const Footer = () => {
  return (

    <>
      <div className="mt-5 footer-img" >
        <footer>
          <div className="row mt-5 align-items-center">
            <div className="col-6 col-md-2 mb-3">
              <h4> Section </h4>
              <ul className='nav flex-column' >
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' >Home </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' >Feature</a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Pricing</a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' >FAQs</a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > About</a>
                </li>
              </ul>

            </div>
            <div className="col-6 col-md-2 mb-3">
              <h4> Discover </h4>
              <ul className='nav flex-column' >
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Become tasker </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > service By City </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' >  Services Nearby </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' >All Services</a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Elite Taskers</a>
                </li>
              </ul>

            </div>
            <div className="col-6 col-md-2 mb-3">
              <h4> Company </h4>
              <ul className='nav flex-column' >
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > About Us </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Careers </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Blog </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Terms & Privicy </a>
                </li>
                <li className='nav-item mb-2' >
                  <a href="" className='nav-link p-0 text-body-secondary' > Help </a>
                </li>
              </ul>

            </div>
            <div className='col-md-5 offset-md-1 mb-3' >
              <form action="">
                <h5> Subscribe to our newsletter </h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <input type="email" placeholder='email..' className='form-control' />
                    <button className='btn' style={{background : "#f57c20", color : 'white'}} >
                      submit
                    </button>
                </div>
              </form>

            </div>


          </div>
        </footer>

      </div>

    </>
  )
}
