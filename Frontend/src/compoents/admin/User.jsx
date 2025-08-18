import React, { useEffect, useState } from 'react'
import API from ".././Api.js"
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUpload } from "react-icons/fa";
import { UserModal } from './UserModal.jsx';
// <IoIosAddCircleOutline  />

export const User = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const res = await API.get("auth/signup")
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
            <div className="container" >
                <div className="d-flex justify-content-end my-4">
                    <span className='d-flex align-items-center mx-2' > Add </span>  
                     <button className='btn btn-primary' data-bs-target="#exampleModal" data-bs-toggle="modal" >  <IoIosAddCircleOutline /> </button>
                </div>

                <table className='table rounded table-bordered table-striped table-hover text-center' >
                    <thead className='' >
                        <tr className='align-middle'>
                            <th colSpan="col"> No </th>
                            <th colSpan="col"> Username </th>
                            <th colSpan="col"> Password </th>
                            <th colSpan="col"> Email </th>
                            <th colSpan="col" > Phone </th>
                            <th colSpan="col" > Role </th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, i) => (
                            <tr key={item._id} className='align-middle' >
                                <th colSpan="col" > {i + 1} </th>
                                <td> {item.username} </td>
                                <td> {item.password} </td>
                                <td> {item.email} </td>
                                <td> {item.phone} </td>
                                <td> {item.role} </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <UserModal />

            



        </>
    )
}
