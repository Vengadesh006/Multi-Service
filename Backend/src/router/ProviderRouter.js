import express from "express"
import multer from "multer";
import path from "path"
import fs from "fs"

import { ADD_PROFILE, GET_ALL_PROFILE} from "../controller/ProfileController.js";

const routerProvider = express.Router()

const ProviderDir = path.join(process.cwd(), "./assets/profile")

console.log(ProviderDir);



if(!fs.existsSync(ProviderDir)) {
    fs.mkdirSync(ProviderDir, {recursive : true})
}

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, ProviderDir )
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}-${ file.originalname}`)
    }
})

const upload = multer({storage : storage})

routerProvider.post('/', upload.single("image"), ADD_PROFILE)

routerProvider.get("/", GET_ALL_PROFILE)

export default routerProvider;

