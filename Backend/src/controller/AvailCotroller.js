import UserModel from "../model/AuthModel.js";
import AvailbilityModel from "../model/Availbility.js";


export const ADD_AVAILBILITY = async (req,res) => {
    
    const { providerId , startDate,endDate } = req.body

    try{
        const user = await UserModel.findById(providerId).lean()

        const check_in =  new Date(startDate)

        const check_out = new Date(endDate)

        if(!user)  return res.staus(404).json({ message : " User not Found. "})
        
        if( check_in >= check_out){
            return res.staus(422).json({ message : "invalid range."})
        }
        const slot = new AvailbilityModel({
            provider : user._id,
            startDate : check_in,
            endDate : check_out
        })

        await slot.save()

        return res.status(202).json(slot)

    }
    catch(err){
        return res.staus(500).json({ message : err.message })
    }
}

export const GET_ALL_AVAILBILITY = () => {



}