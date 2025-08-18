import express from "express"
import {ADD_AVAILBILITY , GET_ALL_AVAILBILITY} from "../controller/AvailCotroller.js"

const routerAvailbility = express.Router()

routerAvailbility.post('/', ADD_AVAILBILITY)

routerAvailbility.get("/", GET_ALL_AVAILBILITY)


export default routerAvailbility;