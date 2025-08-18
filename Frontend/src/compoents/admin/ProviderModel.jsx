import React, { useState } from 'react'


export const ProviderModel = () => {

    const [provider, setProvider] = useState({
        userId : "",
        serviceId : "",
        bio : "",
        location : "",
        image: null
    })

    const [error, setError] = useState({
        userId : "",
        serviceId : "",
        bio : "",
        location : "",
        image: null
    })

    const is_validation = () => {
        const err = {}
       
        if (!provider.bio) {
            err.bio = "Bio fields is required."
        }
        if (!provider.location) {
            err.location = "Location fields is reqired."
        }
        
        if (!provider.image) {
            err.image = "Image fields is required."
        }
       
      
        setError(err)

        return err
    }

    const inputEvent = (e) => {
        const { name, value , } = e.target
        setProvider({ ...provider, [name]: value })
    }

    const FormEvent = (e) => {
        e.preventDefault()
        const formValid = is_validation()
        if (Object.values(formValid).length === 0) {
            console.log(provider);
        }

    }


    return (
        <>

            <div className="modal fade" id="PROVIDER" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">  </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={FormEvent} className='bg-body-tertiary p-3' >
                                <h4 className='text-center' > Add Provider Data </h4>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Bio : </label>
                                    <textarea type="text" className="form-control my-2" placeholder='bio' id="exampleInputEmail1"  />
                                    {error.username && <small className='text-danger' > {error.bio} </small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"> Location : </label>
                                    <input type="text" className="form-control my-2" placeholder='location ' id="exampleInputEmail1" />
                                    {error.email && <small className='text-danger' > {error.location} </small>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label"> Image </label>
                                    <input type="file" className="form-control my-2" placeholder='password' id="exampleInputPassword1" />
                                    {error.password && <small className='text-danger' > {error.image} </small>}
                                </div>
                                <button type="submit" className="btn w-100" style={{ background: "#f57c20", color: 'white' }}  >Submit</button>
                            </form>


                        </div>
                      
                    </div>
                </div>
            </div>

        </>
    )
}
