import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import { Get_ALL_ADDTOCARD, AddtoCard, DELETE_CARD } from "../controller/AddToCard.js"


const routerAddtoCard = express.Router()

routerAddtoCard.post("/", AddtoCard)

routerAddtoCard.get("/", verifyToken , Get_ALL_ADDTOCARD)

routerAddtoCard.delete("/:id", DELETE_CARD)

export default routerAddtoCard;


