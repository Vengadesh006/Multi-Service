import mongoose from "mongoose";


const AvailbilitySchema = new mongoose.Schema({
    provider : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "auth_user",
        required : true
    },
    startDate : {
        type : Date,
        required : true,
    },
    endDate : {
        type : Date,
        required :true
    }
}, {timestamps : true})

const AvailbilityModel = mongoose.model("Availbility", AvailbilitySchema)

export default AvailbilityModel;