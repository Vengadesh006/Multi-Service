import UserModel from "../model/AuthModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Signup = async (req,res)  => {
    
    const { username, password, email, phone , role} = req.body

    
    try {
        
        const user = await UserModel.findOne({email}).lean() 

        if(user) return res.status(404).json({ message : "user already exist." })
        
        const pass = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            username,
            password : pass,
            email,
            phone,
            role
        })  

        await newUser.save()

        return res.status(202).json({ message : "account create successfully." })
    }

    catch(err){
        return res.status(500).json({ message : err.message })
    }


}

export const get_user = async(req,res) => {
    try{
        const user =await UserModel.find().lean()
        return res.status(202).json(user)

    }
    catch(err){
        return res.status(500).json({ message : err.message })
    }
}

export const Login = async (req,res) => {

    const { username, password } = req.body

    try{
        const user = await UserModel.findOne({username}).lean()   
        
        if(!user) return res.status(404).json({ message : "User Invalid credentials" })
        

        const IsMatch = await bcrypt.compare(password, user.password)

        if(!IsMatch) return res.status(404).json({ message : "Invalid credentials" })

        const payload = {
            user_id : user._id,
            username : user.username,
            email : user.email
        }
            
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "1h"})

        return res.status(202).json({ message : "User Login Successfully.", token : token  })

    }
    catch(err){
       return res.status(500).json({ message : err.message, mes : "invaild credential." }) 
    }


}