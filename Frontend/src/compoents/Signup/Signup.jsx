import React, { useState } from 'react'
import logo from "../../assets/sign.jpg"
import API from "../Api.js"
import {ToastContainer, toast} from "react-toastify"

export const Signup = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phone: ""
    })

    const [pass, setPass] = useState("password")

    const [check, setCheck] = useState(false)

    const [error, setError] = useState({
        username: "",
        password: "",
        email: "",
        phone: ""
    })

    const is_validation = () => {
        const err = {}
        const passwordPatter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phonePattern = /^\d{10}$/
        if (!formData.username) {
            err.username = "username fields is required."
        }
        if (!formData.password) {
            err.password = "password fields is reqired."
        }
        else if (!passwordPatter.test(formData.password)) {
            err.password = "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one special character"
        }
        if (!formData.email) {
            err.email = "email fields is required."
        }
        else if (!emailPattern.test(formData.email)) {
            err.email = "invalid email id"
        }
        if (!formData.phone) {
            err.phone = "phone fields is required."
        }
        else if (!phonePattern.test(formData.phone)) {
            err.phone = "Phone number must be exactly 10 digits."
        }
        setError(err)

        return err
    }

const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, role: "customer" });
};

const FormEvent = async (e) => {
    e.preventDefault();

    const formValid = await is_validation();

    if (Object.values(formValid).length === 0) {        
        try {

            const response = await API.post("/auth/signup", formData);
            toast.success(response.data.message);
        } catch (err) {
           console.log("form err", err?.response?.data?.message);
           toast.error(err?.response?.data?.message || "Something went wrong");
            
        }
    }
};

    return (
        <>
            <div style={{ marginTop: "100px" }} />
            <div className="container" >
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={FormEvent} className='p-4 p-md-5 border rounded-3 bg-body-tertiary shadow-lg ' >
                            <h4 className='text-center' > Signup Form </h4>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username : </label>
                                <input type="text" className="form-control my-2" placeholder='username' id="exampleInputEmail1" name='username' value={formData.username} onChange={inputEvent} />
                                {error.username && <small className='text-danger' > {error.username} </small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address: </label>
                                <input type="email" className="form-control my-2" placeholder='email ' id="exampleInputEmail1" name='email' value={formData.email} onChange={inputEvent} />
                                {error.email && <small className='text-danger' > {error.email} </small>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password : </label>
                                <input type={check ? "text" : "password"} className="form-control my-2" placeholder='password' id="exampleInputPassword1" name="password" value={formData.password} onChange={inputEvent} />
                                {error.password && <small className='text-danger' > {error.password} </small>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Phone Number :</label>
                                <input type="number" className="form-control my-2" placeholder='phone' id="exampleInputEmail1" name='phone' value={formData.phone} onChange={inputEvent} />
                                {error.phone && <small className='text-danger' > {error.phone} </small>}
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" onChange={() => setCheck(!check)} checked={check} className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Check password </label>
                            </div>
                            <button type="submit" className="btn w-100" style={{ background: "#f57c20", color: 'white' }}  >Submit</button>
                        </form>

                    </div>

                    <div className="col">

                        <img src={logo} alt=""
                            style={{
                                width: "100%",
                                height: '70vh',
                                objectFit: "cover"
                            }}
                            className='img-fluid'
                        />
                    </div>
                </div>
            </div>
            <ToastContainer position='bottom-right' />


        </>
    )
}
