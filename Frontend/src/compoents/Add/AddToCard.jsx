import React, { useEffect, useState } from 'react'
import API from '../Api'
import { toast, ToastContainer } from 'react-toastify'

export const AddToCard = () => {
  const [addcard, setAddCard] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/addtocard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setAddCard(response.data)
      } catch (err) {
        console.log("form err", err?.response?.data?.message)
        toast.error(err?.response?.data?.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const deleteCard = async (id) => {
    try{
      const response =await API.delete(`/addtocard/${id}`)
      toast.success(response?.data.message)
    }
    catch (err) {
        console.log("form err", err?.response?.data?.message)
        toast.error(err?.response?.data?.message || "Something went wrong")
   
    }
    
    
    
  }

  return (
    <>
      <ToastContainer />
      <div className="container my-3">
        <div className="row justify-content-center">

          {loading ? (
            <h5 className="text-center">Loading...</h5>
          ) : addcard?.length === 0 ? (
            <h5 className="text-center">No Cart Items</h5>
          ) : (
            addcard.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                <div className="card shadow-sm h-100">
                  <img
                    src={`http://localhost:8000/serviceImg/${item?.service?.image}` || "https://via.placeholder.com/200"}
                    className="card-img-top"
                    alt={item?.service?.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item?.service?.name}</h5>
                    <p className="card-text" style={{ flexGrow: 1 }}>
                      {item?.service?.desc}
                    </p>
                    <ul className="list-group list-group-flush mb-3">
                      <li className="list-group-item">Price: ₹{item?.service?.price}</li>
                      <li className="list-group-item">Quantity: {item?.quantity}</li>
                      <li className="list-group-item fw-bold">Total: ₹{item?.total}</li>
                    </ul>
                    <button onClick={() => deleteCard(item._id)}  className="btn btn-danger mt-auto">Remove Item</button>
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
