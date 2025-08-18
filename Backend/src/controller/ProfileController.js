import UserModel from "../model/AuthModel.js";
import ProvideProfileModel from "../model/ProvideModel.js";
import ServiceModel from "../model/ServiceModel.js";


export const ADD_PROFILE = async (req, res) => {

    const { userId, serviceId, bio, location } = req.body

    const image = req.file?.filename
    try{

        const user = await UserModel.findById(userId).lean()
        
        const service = await ServiceModel.findById(serviceId).lean()

        if(!user) return res.status(404).json({ message : "User Not Found."})
        
        if(!service) return res.status(404).json({ message : "Service Item Not Found." })
        
        const newProfile = new ProvideProfileModel({
            userId : user._id,
            serviceId : service._id,
            bio,
            location,
            image : image
        })

        await newProfile.save()

        return  res.status(202).json({ message : "Profile Add To Successfully." })

    }
    catch(err){
        return res.status(500).json({ message : err.message})
    }
}


export const GET_ALL_PROFILE =  async(req,res) => {
     try{
        
        const service = await ProvideProfileModel.find()
          
          .populate("userId", "username")
        
          .populate("serviceId", "name")

       
        return res.status(202).json(service)
    }
    catch(err){
        
        return res.status(500).json({ message : err.message})
    }
}



