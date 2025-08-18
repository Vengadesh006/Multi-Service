import UserModel from "../model/AuthModel.js"
import BookModel from "../model/BookingModel.js"
import ServiceModel from "../model/ServiceModel.js"
import AvailbilityModel from "../model/Availbility.js"
import mongoose from "mongoose"

export const ADD_BOOKING = async (req, res) => {

    const { userId, providerId, serviceId, startDate, time, hour } = req.body

    const service = await ServiceModel.findById(serviceId).lean()

    const user = await UserModel.findById(userId).lean()

    const provide = await UserModel.findById(providerId).lean()

    console.log(provide);
    

    if (!service) return res.status(404).json({ message: "Service Not Fount" })

    if (!user) return res.status(404).json({ message: "User Not Fount" })

    if (!provide) return res.status(404).json({ message: "Provide Not Fount" })

    const start_date = new Date(`${startDate}T${time}`)

    if (isNaN(start_date)) {
        return res.status(400).json({ message: `Invalid date format: ${isoString}` });
    }

    const end_date = new Date(start_date.getTime() + hour * 60 * 60 * 1000)

    const total = service.price * hour


    const solt = await AvailbilityModel.findOne({
        provider: provide._id,
        startDate: { $lte: start_date },
        endDate: { $gte: end_date }
    })

    if (solt) {
        return res.status(422).json({ message: 'Provider not available for this Moment' });
    }


    const soltVaild = new AvailbilityModel({
        provider: provide._id,
        startDate: start_date,
        endDate: end_date
    })

    await soltVaild.save()

    try {
        const verfiy = await BookModel.findOne({
            provider: providerId,
            $or: [
                { startDate: { $lte: start_date } },
                { endDate: { $gt: end_date } }
            ]
        })

        if (verfiy) return res.status(409).json({ message: 'Time already booked' })

        const booking = await BookModel.create(
            [
                {
                    user: user._id,
                    provider: provide._id,
                    service: service._id,
                    startDate: start_date,
                    endDate: end_date,
                    time,
                    hour,
                    price: total,
                    status: "confirmed",
                },
            ]
        );

        return res.status(202).json({ booking: booking[0] })

    }
    catch (err) {

        return res.status(500).json({ message: 'Booking failed', error: err.message })
    }

}


export const GET_ALL_BOOK = async (req, res) => {
    
    try{
        const bookInfo = await BookModel.find()
        .populate("user", "username")
        .populate("provider", "username")
        .populate("service", "name")
        return res.status(202).json(bookInfo)
    }
    catch(err){
        return res.status(500).json({message : err.message})
    }
}