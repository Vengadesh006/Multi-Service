import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../Api'
import { toast,ToastContainer } from 'react-toastify'

export const Login = () => {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        username : "",
        password : ""
    })

     const [error,setError] = useState({
           username: "",
        password: "",   
        })

    const [pass, setPass] = useState("password")
    
    const [check,setCheck] = useState(false)

     const inputEvent = (e) => {
        const { name, value } = e.target
        setLoginForm({...loginForm, [name] : value})
    }

    const is_validation = () => {
        const err = {}
        const passwordPatter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        
        if(!loginForm.username){
            err.username = "username fields is required."
        }
        if(!loginForm.password){
            err.password = "password fields is reqired."
        }
        else if(!passwordPatter.test(loginForm.password)){
            err.password = "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one special character"
        }
        
        setError(err)

        return err

    }

    const FormEvent = async (e) => {
        e.preventDefault()
        const formValid =await is_validation()
        
        if(Object.values(formValid).length === 0){
            try{
                const response =await API.post("auth/login", loginForm)
                const token = localStorage.setItem("token", response.data.token)
                toast.success(response.data.message)
                window.alert(response.data.message)
                navigate("/")
            } 
            catch (err) {
                       console.log("form err", err?.response?.data?.message);
                       toast.error(err?.response?.data?.message || "Something went wrong");
                        
                    }
        }
        
    }


  return (
    <>
    <div style={{ marginTop : "100px"}} />
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className='display-4 fw-bold lh-1 text-body-emphasis mb-3' > customers to book multiple services</h1>
                    <p className='col-lg-10 fs-4' >
                        Multi-service booking allows customers to select and schedule several different services, potentially with varying dates, times, and even staff members, all within the same booking process
                    </p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">

                    <form action="" onSubmit={FormEvent} className='p-4 p-md-5 border rounded-3 bg-body-tertiary shadow-lg ' >
                        <div className="form-floating mb-3">
                            <input type="text" className='form-control' name='username' value={loginForm.username} onChange={inputEvent}  placeholder='username' />
                             <label htmlFor=""> username </label>
                             {error.username && <small className='text-danger' > {error.username} </small> } 
                        </div>
                        <div className="form-floating mb-3">
                            <input type={check ? "text" : "password"} className='form-control' placeholder='password' name='password' value={loginForm.password} onChange={inputEvent} />
                            <label htmlFor=""> password </label>
                            {error.password && <small className='text-danger' > {error.password} </small> } 
                        </div>
                        <div className="checkbox mb-3">
                            <label htmlFor=""> <input type="checkbox" onChange={() =>setCheck(!check) } name="" id="" /> Remember Me
                        </label>  

                        </div>
                        <button className='w-100 btn btn-lg' style={{background : "#f57c20", color : 'white'}} >
                            submit 
                        </button>
                        <hr className='my-4' />
                        <small class="text-body-secondary" >
                            By clicking <span className='mx-1' > <Link to='/signup' > Sign up </Link> </span>,you agree to the terms of use.
                        </small>
                    </form>
                </div>
            </div>

        </div>
         <ToastContainer position='bottom-right' />
    
    
    
    </>
  )
}
