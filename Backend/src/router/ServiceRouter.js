import express from "express";
import multer from "multer";
import path from "path";
import { ADD_SERVICE, DELETE, GET_ALL_SERVICE, GET_SERVICE, UPDATE } from "../controller/ServiceController.js";
import fs from "fs";
import verifyToken from "../middleware/verifyToken.js";

const serviceDir = path.join(process.cwd(), "src","../assets/service");

if (!fs.existsSync(serviceDir)) {
  fs.mkdirSync(serviceDir, { recursive: true });
}

const serviceRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, serviceDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

serviceRouter.post("/", upload.single("image"), ADD_SERVICE);

serviceRouter.get("/", GET_ALL_SERVICE)

serviceRouter.get("/:id", verifyToken, GET_SERVICE)

serviceRouter.delete('/:id', DELETE )

serviceRouter.patch('/:id', upload.single('image'), UPDATE)

export default serviceRouter;