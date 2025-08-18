import React, { useEffect, useState } from 'react'
import API from ".././Api.js"
import { MdDelete } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { ProviderModel } from './ProviderModel.jsx';
import { IoIosAddCircleOutline } from "react-icons/io";

export const Provider = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const res = await API.get("/profile")
                setUser(res.data)

            }
            catch (err) {
                console.log("admin err", err);

            }
        }
        fetchDate()
    }, [])

    return (
        <>
            <div className="container mt-4">
        
            
                <table className='table table-bordered table-striped table-hover text-center'>
                    <thead className='align-middle'>
                        <tr>
                            <th>No</th>
                            <th>Provider Name</th>
                            <th>Service Name</th>
                            <th>Bio</th>
                            <th>Location</th>
                            <th>Image</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, i) => (
                            <tr key={item._id} className='align-middle'>
                                <td>{i + 1}</td>
                                <td>{item?.userId?.username}</td>
                                <td>{item?.serviceId?.name}</td>
                                <td>{item.bio}</td>
                                <td>{item.location}</td>
                                <td>
                                    <img
                                        src={`http://localhost:8000/profile/${item.image}`}
                                        alt=""
                                        style={{ height: "50px", width: "50px", objectFit: "cover" }}
                                    />
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProviderModel />

        </>
    )
}
