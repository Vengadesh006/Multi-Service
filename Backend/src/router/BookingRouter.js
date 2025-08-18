import express from "express"
import {ADD_BOOKING, GET_ALL_BOOK } from "../controller/BookController.js"
import verifyToken from "../middleware/verifyToken.js"

const routerBook = express.Router()

routerBook.post("/", verifyToken, ADD_BOOKING)
routerBook.get("/", GET_ALL_BOOK )

export default routerBook