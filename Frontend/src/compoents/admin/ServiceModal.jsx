import React, { useState } from 'react'
import API from '../Api'
import { toast, ToastContainer } from 'react-toastify'

export const ServiceModal = () => {

  const [serviceData, setServiceData] = useState({
    name: "",
    desc: "",
    price: "",
    image: null,
  })

  const [error, setError] = useState({})


  const is_validate = () => {
    const err = {}

    if (!serviceData.name.trim()) {
      err.name = "Service name is required"
    }
    if (!serviceData.desc.trim()) {
      err.desc = "Description is required"
    }
    if (!serviceData.price) {
      err.price = "Price is required"
    }
    if (!serviceData.image) {
      err.image = "Image is required"
    }
    setError(err)
    return Object.keys(err).length === 0
  }

  const inputEvent = (e) => {

    const { name, value, files } = e.target
    if (name === "image") {
      setServiceData({ ...serviceData, image: files[0] })
    } else {
      setServiceData({ ...serviceData, [name]: value })
    }
  }

  const FormEvent = async (e) => {
    e.preventDefault()
    if (is_validate()) {
      try {
        const formData = new FormData();
        formData.append("name", serviceData.name)
        formData.append("desc", serviceData.desc)
        formData.append("price", serviceData.price)
        formData.append("image", serviceData.image)

        const response =await API.post("/service", formData)
        console.log(response?.data?.message);
        
        toast.success(response?.data?.message)
      }
      catch (err) {
        console.log("form err", err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Something went wrong");


      }
    }
  }

  

    return (
      <>
        <div className="modal fade" id="serviceModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Service</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={FormEvent} className="p-3">

                  <div className="mb-3">
                    <label className="form-label">Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter service name"
                      name="name"
                      value={serviceData.name}
                      onChange={inputEvent}
                    />
                    {error.name && <small className="text-danger">{error.name}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter description"
                      name="desc"
                      value={serviceData.desc}
                      onChange={inputEvent}
                    />
                    {error.desc && <small className="text-danger">{error.desc}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price (₹)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter price"
                      name="price"
                      value={serviceData.price}
                      onChange={inputEvent}
                    />
                    {error.price && <small className="text-danger">{error.price}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={inputEvent}
                    />
                    {error.image && <small className="text-danger">{error.image}</small>}
                  </div>

                  <button type="submit" className="btn btn-warning w-100 text-white">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='bottom-right' />
      </>
    )
  }
