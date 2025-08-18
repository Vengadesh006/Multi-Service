import mongoose from "mongoose";


const ProvideProfileSchema =new  mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "auth_user",
        required : true
    },
    serviceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Service",
        required : true
    },
    
    bio : String,

    location : {
        type : String, 
        required : true
    },
    image : String

}, {timestamps : true} )

const ProvideProfileModel = mongoose.model("ProviderProfie", ProvideProfileSchema)

export default ProvideProfileModel;