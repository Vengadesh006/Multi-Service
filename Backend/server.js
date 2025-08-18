import mongoose from "mongoose";
import express from "express"
import dotenv from 'dotenv'
import path from "path"
import userRouter from "./src/router/AuthRouter.js";
import verifyToken from "./src/middleware/verifyToken.js";
import serviceRouter from "./src/router/ServiceRouter.js";
import routerProvider from "./src/router/ProviderRouter.js";
import routerAvailbility from "./src/router/AvailbiltyRouter.js";
import cors from "cors"
import routerBook from "./src/router/BookingRouter.js";
import routerAddtoCard from "./src/router/AddRouter.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000 

mongoose.connect(process.env.MONGODB_URL)
.then( () => console.log("mongodb was connceting.."))
.catch(err => console.log("mongodb disconncet", err) )

app.use("/serviceImg",express.static(path.join(process.cwd(),"./assets/service" )))
app.use("/profile", express.static(path.join(process.cwd(), "./assets/profile")))



app.use("/auth", userRouter)
app.use('/service', serviceRouter)
app.use('/profile', routerProvider)
app.use("/availbility", routerAvailbility)
app.use("/booking", routerBook )
app.use("/addtocard", routerAddtoCard)
app.use("/user",userRouter)


app.listen(PORT, () => console.log(`server is running http://localhost:${PORT}`) )