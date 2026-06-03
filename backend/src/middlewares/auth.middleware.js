import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import TokenBlacklist from "../models/tokenBlacklist.model.js"

async function authUser(req, res, next){

    const token = req.cookies.token

    try {
        
        if(!token){
            return res.status(400).json({
                message: "token not found"
            })
        }

        const tokenBlacklisted = await TokenBlacklist.findOne({token})

        if(tokenBlacklisted){
            return res.status(400).json({
                message: "invalid token"
            })
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        return res.status(400).json({
            message: "invalid password",
            error: error.message
        })
    }

}

export default authUser