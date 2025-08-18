import React, { useState, useEffect } from 'react'
import API from ".././Api.js"
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUpload } from "react-icons/fa";
import { UserModal } from './UserModal.jsx';
import { ServiceModal } from './ServiceModal.jsx';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



export const ServiceDetails = () => {
    const [serviceData, setServiceData] = useState([])

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const res = await API.get("/service")
                setServiceData(res.data)

            }
            catch (err) {
                console.log("admin err", err);

            }
        }
        fetchDate()
    }, [])

    const deleteService = async (id) => {
        try {
            const { data } = await API.delete(`/service/${id}`);
            console.log(data?.message);
            toast.success(data?.message || "Service deleted successfully");
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong";
            console.error("Delete error:", errMsg);
            toast.error(errMsg);
        }
    };


    return (
        <>     <div className="container mt-4">
            <div className="d-flex justify-content-end my-4">
                <span className='d-flex align-items-center mx-2' > Add </span>
                <button className='btn btn-primary' data-bs-target="#serviceModel" data-bs-toggle="modal" >
                    <IoIosAddCircleOutline />
                </button>
            </div>

            <table className='table table-bordered table-striped table-hover text-center'>
                <thead className='align-middle'>
                    <tr>
                        <th>No</th>
                        <th>Provider Name</th>
                        <th>Service Name</th>
                        <th>Bio</th>
                        <th>Location</th>
                        <th>Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceData.map((item, i) => (
                        <tr key={item._id} className='align-middle'>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.desc}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                <img
                                    src={`http://localhost:8000/serviceImg/${item.image}`}
                                    alt=""
                                    style={{ height: "50px", width: "50px", objectFit: "cover" }}
                                />
                            </td>
                            <td>
                                <Link to={`/admin-service/${item._id}`} className='btn btn-primary'>
                                    <FaUpload />
                                </Link>
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => deleteService(item._id)} >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
            <ServiceModal />
            <ToastContainer position='bottom-right' />
        </>


    )
}
