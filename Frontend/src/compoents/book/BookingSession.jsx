import React, { useState } from "react";
import API from "../Api";
import { toast, ToastContainer} from "react-toastify";

export const BookingSession = ({ serviceId, providerId, userId }) => {
  const timesArray = ["09:30", "12:00", "04:45", "07:30"];
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(0);

  const booking = async () => {
    if(!userId || !providerId || !serviceId){
      return toast.warning("Invalid IDs provided.");
    }
    if (!selectedTime || !date || hour === 0) {
      return toast.warning("Please select date, time and hours first.");
    }

    const data = {
      userId,
      providerId,
      serviceId,
      startDate: date,
      time: selectedTime,
      hour,
    };

    try{
      const token = localStorage.getItem("token");
      const res = await API.post("/booking", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Booked Successfully!");
      console.log(res.data);
    }
    catch(err){
      console.log("form err", err?.response?.data?.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center gy-3">
          
          <div className="col-12">
            <h6>Time :</h6>
            <div className="d-flex flex-wrap gap-2">
              {timesArray.map((t, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 border rounded ${selectedTime === t ? 'bg-primary text-white' : ''}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-12 col-sm-6">
            <h6>Date :</h6>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>
          
          <div className="col-12 col-sm-6 d-flex align-items-center gap-2">
            <h6 className="m-0">Hours:</h6>
            <button className="btn btn-warning" onClick={() => setHour(hour + 1)}>+</button>
            <span>{hour}</span>
            <button className="btn btn-warning" onClick={() => setHour(hour > 0 ? hour - 1 : 0)}>-</button>
          </div>
          
          <div className="col-12 text-center mt-3">
            <button className="btn btn-danger w-50" onClick={booking}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position='bottom-right' />
    </>
  );
};
