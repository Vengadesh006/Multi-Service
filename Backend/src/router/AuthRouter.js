import express from 'express'
import { Signup,Login, get_user } from '../controller/AuthController.js'
import verifyToken from '../middleware/verifyToken.js'


const userRouter = express.Router()

userRouter.post('/signup', Signup)

userRouter.get("/signup", get_user)

userRouter.post('/login', Login)

userRouter.get("/", verifyToken, (req,res) => {
    return res.status(202).json(req.user)
})

export default userRouter;