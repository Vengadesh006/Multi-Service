import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import API from '../Api'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { BookingSession } from './BookingSession'
import "./Booking.css"
import { toast } from 'react-toastify'
import { AuthContext } from '../../App'


export const Booking = () => {

   
    const { id } = useParams()

    const [serviceId, setServiceId] = useState(null)

    const [providerId, setProviderId] = useState(null)

    const [provider, setProvider] = useState([]);

    const [profile, setProfile] = useState([])

    const token = localStorage.getItem("token")

    const [activeIndex, setActiveIndex] = useState(null);

    const [count, setCount] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(`service/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setServiceId(res.data)
            }
            catch (err) {
                console.log("server err", err?.response?.data?.message)
                toast.error(err?.response?.data?.message)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/profile")
                setProvider(res.data)
            }
            catch (err) {
                console.log("provider err", err?.response?.message);
            }
        }
        fetchData()
    }, [])

    const Click = (id) => {

        setProfile((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
        setProviderId(id)
    };

    const serviceData = serviceId?.service;

    const userId = serviceId?.userId

    console.log(userId);
    


    const add = async (item) => {
        const sum = item?.price * count
        const payload = {
            userId: userId?.user_id,
             serviceId : serviceData?._id,
            quantity: count,
            total: sum
        }
    
        try {
            const response = await API.post("/addtocard", payload)
            console.log(response?.data?.message);
            toast.success(response?.data?.message)
        }
        catch (err) {
            console.log("form err", err?.response?.data?.message);
            toast.error(err?.response?.data?.message || "Something went wrong");

        }
    }


    return (

        <>
            <div className="container">


                <div className="card mb-3 border-0" style={{ maxWidth: "740px" }} >
                    <div className="row g-3 align-items-center ">
                        <div className="col-md-4">
                            <img src={`http://localhost:8000/serviceImg/${serviceData?.image}`} className="img-fluid rounded" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title"> {serviceData?.name} </h2>
                                <h4 className="card-text"> {serviceData?.desc} </h4>
                                <p className="card-text"> ₹{serviceData?.price} </p>
                                <div className="quany my-3">
                                    <button className='btn btn-code ' onClick={() => setCount(count + 1)} >
                                        +
                                    </button>
                                    <span> {count} </span>
                                    <button className='btn btn-code' onClick={() => setCount(count > 0 ? count - 1 : 0)} >
                                        -
                                    </button>
                                </div>
                                <button className='btn btn-outline-danger' onClick={() => add(serviceData)}  >
                                    add to card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />


                <div className="row g-4 align-items-stretch">
                    <h5 className='text-center my-5' > Provider Details </h5>
                    {provider.map((item, i) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item._id}>
                            <div
                                className={`card h-100 shadow-sm rounded-4 ${activeIndex === i ? 'actives' : 'border-0'}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setActiveIndex(i);      // set active class
                                    setProviderId(item._id) // set selected providerId
                                }}
                            >
                                <div className="text-center pt-3">
                                    <img
                                        src={`http://localhost:8000/profile/${item.image}`}
                                        alt="profile"
                                        className="rounded-circle"
                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title mb-1">{item.userId.username}</h5>
                                    <p className="text-muted mb-1">
                                        {item.bio.length < 25 ? item.bio : item.bio.substring(0, 25) + "..."}
                                    </p>
                                    <p className="card-text">{item.location}</p>
                                    <button className="btn btn-outline-primary btn-sm mt-auto">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BookingSession serviceId={serviceData?._id} userId={serviceId?.userId?.user_id} providerId={providerId} />



        </>
    )
}
// "card h-100 shadow-sm rounded-4 actives "
// : "card h-100 shadow-sm rounded-4 border-0"


