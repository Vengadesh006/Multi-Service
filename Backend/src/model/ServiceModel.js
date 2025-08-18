import { Schema, model } from "mongoose";


const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        index: true
    },
    duration : {
        type : Number,
        default : 15
    },
    image : String

}, { timestamps: true })

const ServiceModel = model("Service", ServiceSchema)

export default ServiceModel;
