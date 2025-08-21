import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Admin.css";
import g2 from "../../assets/g2.png"
import { User } from "./User";

export const Admin = () => {
  const location = useLocation(); 

  return (
    <>
    <div className="container-fluid">
      <div className="row">
       
        <div className="sidebar border-end col-md-3 col-lg-2 p-0 bg-body-tertiary">
          <div className="offcanvas-md offcanvas-end bg-body-tertiary"
            tabIndex={-1}
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
            style={{ zIndex: 1045 }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Dashboard
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto" style={{marginTop : "100px"}} >
              <ul className="list-group list-group-flush">
                <li className="list-group-item p-3">
                  <Link
                    to="/admin"
                    className={`nav-link ${location.pathname === "/admin" ? "active-link" : ""}`}
                  >
                    Admin Page
                  </Link>
                </li>
                <li className="list-group-item p-3">
                  <Link
                    to="/admin-provider"
                    className={`nav-link ${location.pathname === "/users" ? "active-link" : ""}`}
                  >
                    Provider Details
                  </Link>
                </li>
                <li className="list-group-item p-3">
                  <Link
                    to="/admin-service"
                    className={`nav-link ${location.pathname === "/services" ? "active-link" : ""}`}
                  >
                    Service Details
                  </Link>
                </li>
                <li className="list-group-item p-3">
                  <Link
                    to="/admin-booking"
                    className={`nav-link ${location.pathname === "/bookings" ? "active-link" : ""}`}
                  >
                    Booking Details
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2 className="text-center" >Welcome to Admin Dashboard</h2>
            <div className="graph">
              <img src={g2} style={
                {width : "100%", height : "70vh", objectFit : "contain"} 
              } alt="" />
            </div>
             <User />
        </div>
      </div>
    </div>
   
   </>
  );
};
