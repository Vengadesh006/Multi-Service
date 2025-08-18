import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    
    const authHeader = req.headers.Authorization || req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(404).json({ message: "Unauthorization or access denid." })
    }
    try {
        const token = await authHeader.split(" ")[1]

        const decode = jwt.verify( token, process.env.JWT_SECRET)

        req.user = decode

        next()
    }
    catch (err) {
        return res.status(500).json({ message : "invalid token." })
    }
}

export default verifyToken;