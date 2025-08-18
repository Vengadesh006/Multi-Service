import mongoose from "mongoose";

const AddToCardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth_user",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    total: Number
})

const AddtoCardModel = mongoose.model("AddtoCard", AddToCardSchema)

export default AddtoCardModel;