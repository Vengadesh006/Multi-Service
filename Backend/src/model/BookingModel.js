import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth_user",
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth_user",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true

    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    time: {
        type: String
    },
   
    hour: Number,

    status : {
        type : String, 
        enum: ['pending','confirmed','cancelled'],
        default: 'confirmed'
        
    },
    price: Number   

}, { timestamps: true })

const BookModel = mongoose.model("Booking", BookSchema)

export default BookModel