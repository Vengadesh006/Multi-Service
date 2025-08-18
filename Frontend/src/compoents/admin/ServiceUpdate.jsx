import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../Api";
import { toast } from "react-toastify";

export const ServiceUpdate = () => {
  const [serviceData, setServiceData] = useState({
    name: "",
    desc: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/service/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServiceData(res?.data?.service);
      } catch (err) {
        console.log(err?.response?.data?.message);
      }
    })();
  }, [id, token]);

  const inputEvent = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setServiceData({ ...serviceData, image: files[0] });
    } else {
      setServiceData({ ...serviceData, [name]: value });
    }
  };

  
  const isValidate = () => {
    const err = {};
    if (!serviceData.name.trim()) err.name = "Service name is required";
    if (!serviceData.desc.trim()) err.desc = "Description is required";
    if (!serviceData.price) err.price = "Price is required";
    setError(err);
    return Object.keys(err).length === 0;
  };

  
  const FormEvent = async (e) => {
    e.preventDefault();
    if (!isValidate()) return;

    try {
      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("desc", serviceData.desc);
      formData.append("price", serviceData.price);
      if (serviceData.image instanceof File) {
        formData.append("image", serviceData.image);
      }

      const res = await API.patch(`/service/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res?.data?.message || "Updated successfully!");
      navigate("/admin-service");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container p-2" style={{maxWidth : "650px"}} >
      <h3 className="text-center my-3">Update Service</h3>
      <form onSubmit={FormEvent} className="p-3 border rounded shadow-sm">

        
        <div className="mb-3">
          <label className="form-label fw-bold">Service Name</label>
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
          <label className="form-label fw-bold">Description</label>
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
          <label className="form-label fw-bold">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            name="price"
            value={serviceData.price}
            onChange={inputEvent}
          />
          {error.price && <small className="text-danger">{error.price}</small>}
        </div>

       
        <div className="mb-3">
          <label className="form-label fw-bold">Image</label>
          {serviceData?.image && typeof serviceData.image === "string" && (
            <div className="mb-2">
              <img
                src={`http://localhost:8000/serviceImg/${serviceData.image}`}
                alt="service"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={inputEvent}
          />
        </div>

        <button type="submit" className="btn btn-warning w-100 text-white">
          Update
        </button>
      </form>
    </div>
  );
};
