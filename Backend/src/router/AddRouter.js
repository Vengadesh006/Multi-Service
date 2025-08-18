import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import { Get_ALL_ADDTOCARD, AddtoCard } from "../controller/AddToCard.js"


const routerAddtoCard = express.Router()

routerAddtoCard.post("/", AddtoCard)

routerAddtoCard.get("/", verifyToken , Get_ALL_ADDTOCARD)

export default routerAddtoCard;


