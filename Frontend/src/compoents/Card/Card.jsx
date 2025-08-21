import React, { useContext, useEffect, useState } from 'react'
import API from '../Api'
import axios from 'axios'
import "./Card.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { toast } from 'react-toastify'

export const Card = () => {

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

    const navigate = useNavigate();

  const handleBook = (id) => {
    if (isAuthenticate) {
      navigate(`/book/${id}`); 
    } else {
      toast.warning("Please login first");
    }
  };


    const [serverData, setServerData] = useState([])

    const [serach, setserach] = useState("")

    useEffect(() => {
        const fetctData = async () => {
            try {
                const res = await API.get("/service")
                setServerData(res.data)
            }
            catch (err) {
                console.log(err?.response?.data.message);
            }
        }
        fetctData()
    }, [])

    return (
        <>
            <div className="container" id='service' >

                <h3 className='text-center' >
                    <span style={{ color: "#f57c20" }}>...</span>
                    <span style={{ color: "#f57c20" }}>S</span>ervice  <span style={{ color: "#f57c20" }}>P</span>rovider
                    <span style={{ color: "#f57c20" }}>...</span>
                </h3>
                <div className="dis">
                    <form class="d-flex  " role="search">
                        <input class="form-control shadow-sm p-2 me-2"
                            onChange={(e) => setserach(e.target.value)}
                            type="search" placeholder="Search.." aria-label="Search" />
                        <button class="btn" style={{ backgroundColor: "#f57c20", color: "white" }} type="submit">Search</button>
                    </form>
                </div>

                <hr />

                <div className="row mt-2">
                    {serverData.filter((item) =>
                        serach.toLowerCase() === "" ? item : item.name.toLowerCase().includes(serach)).length === 0 ? (
                        <h4 className='text-center' >No Service Available</h4>
                    ) : (
                        serverData
                            .filter((item) =>
                                serach.toLowerCase() === ""
                                    ? item
                                    : item.name.toLowerCase().includes(serach)
                            )
                            .map((item) => (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-2 mb-5" key={item._id}>
                                    <div className="card h-100 border-2 card-items">
                                        <img
                                            src={`http://localhost:8000/serviceImg/${item.image}`}
                                            className="card-img-top"
                                            alt=""
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ color: "#f57c20" }}>
                                                {item.name}
                                            </h5>
                                            <p className="card-text">
                                                {item.desc.length < 30
                                                    ? item.desc
                                                    : item.desc.substring(0, 30) + ".."}
                                            </p>
                                            <p className="card-text">${item.price}</p>

                                            <button
                                                onClick={() => handleBook(item._id)}
                                                className="btn w-100 my-2"
                                                style={{ background: "#f57c20", color: "white" }}
                                            >
                                                BOOK
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            ))
                    )}


                </div>
            </div>

        </>
    )
}
