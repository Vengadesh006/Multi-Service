import AddtoCardModel from "../model/AddToCard.js";
import UserModel from "../model/AuthModel.js";
import ServiceModel from "../model/ServiceModel.js";

export const AddtoCard = async (req,res) => {
    const {userId, serviceId, quantity } = req.body
    try{
        const user_valid = await UserModel.findById(userId).lean()


        if(!user_valid) return res.status(404).json({message : "User not found."})

        const service_valid = await ServiceModel.findById(serviceId).lean()

        if(!service_valid) return res.status(404).json({message : "Service not found."})

        const sum = service_valid.price * quantity

        const newAdd = new AddtoCardModel({
            user : userId,
            service : serviceId, 
            quantity,
            total :sum
        })

        await newAdd.save()

        return res.status(202).json({ message : "add to card succesfully." })
    } 
    catch(err){
        return res.status(500).json({ message : err.message, mes : "invaild credential." }) 
    }
}

export const Get_ALL_ADDTOCARD = async (req, res) => {

    const userId = req.user?.user_id
    
    try {
        
        const addtocard = await AddtoCardModel.find({user : userId}).lean()
        .populate("user", "username")
        .populate("service", "name desc price image")
        .lean()
        
        return res.status(202).json(addtocard)

    }
    catch(err){
        return res.status(500).json({ message : err.message, mes : "invaild credential." }) 
    }
}

export const DELETE_CARD = async (req, res) => {
    const id = req.params.id 
    console.log(id);
    
    try{
       const del =  await AddtoCardModel.findByIdAndDelete(id).lean()
      
       return res.status(202).json({ message : "delete to card." })
    }
    catch(err){
        return res.status(500).json({ message : err.message, mes : "invaild credential." }) 
    }

}