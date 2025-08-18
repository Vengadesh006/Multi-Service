import React, { useEffect, useState } from 'react'
import API from '../Api.js'
import { MdDelete } from "react-icons/md";
import { FaUpload } from "react-icons/fa";


export const BookingDetails = () => {
    const [book, setBooking] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/booking")
                setBooking(res.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()
    },[])

    console.log(book);
    
    return (
        <>
        <div style={{ marginTop : "100px"}} />
            <div className="container " >
                <table className='table rounded table-bordered table-striped table-hover text-center' >
                    <thead className='' >
                        <tr className='align-middle'>
                            <th colSpan="col"> No </th>
                            <th colSpan="col"> Username </th>
                            <th colSpan="col"> Provider </th>
                            <th colSpan="col"> Service </th>
                            <th colSpan="col" > Start Date </th>
                            <th colSpan="col" > End Date </th>
                            <th colSpan="col" > Time </th>
                            <th colSpan="col" > Hour </th>
                            <th colSpan="col" > Statues </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((item, i) => (
                            <tr key={item._id} className='align-middle' >
                                <th colSpan="col" > {i + 1} </th>
                                <td> {item?.user?.username} </td>
                                <td> {item?.provider?.username} </td>
                                <td> {item?.service?.name} </td>
                                <td> {new Date(item.startDate).toLocaleString()} </td>
                                <td> {new Date(item.endDate).toLocaleString()} </td>
                                <td> {item.time} </td>
                                <td> {item.hour}  </td>
                                <td> {item.status} </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </>
    )
}
