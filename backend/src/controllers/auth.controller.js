import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import TokenBlacklist from "../models/tokenBlacklist.model.js"

async function register(req, res){
    const {name, email, username, password} = req.body

    if(!name || !email || !username || !password){
        return res.status(400).json({
            message: "please fill the details"
        })
    }

   try {
     const isExist = await User.findOne({
         $or: [{email}, {username}]
     })
 
     if(isExist){
         return res.status(400).json({
             message: "user already exist"
         })
     }
 
     const hashPass = await bcrypt.hash(password, 10)
 
     const user = await User.create({
         name,
         email,
         username, 
         password: hashPass
     })
 
     const token = jwt.sign(
         {id: user._id},
         process.env.JWT_SECRET,
         {expiresIn: '7d'}
     )
 
     res.cookie("token", token)
 
     return res.status(201).json({
         message: "user registered successfully",
         user: {
             name: user.name,
             username: user.username,
             email: user.email
         }
     })

   } catch (error) {
        return res.status(400).json({
         message: error.message
     })
   }
}

async function login(req, res){
    const {email, password} = req.body

    if( !email || !password){
        return res.status(400).json({
            message: "please fill the details"
        })
    }

    try {
        const user = await User.findOne({email})
    
        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }
    
        const verify = await bcrypt.compare(password, user.password)
    
        if(!verify){
            return res.status(400).json({
                message: "incorrect password"
            })
        }
    
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )
    
        res.cookie("token", token)
    
        return res.status(201).json({
            message: "user logged in successfully",
            user: {
                name: user.name,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

async function logout(req, res) {
    const token = req.cookies.token

    try {
        if(token){
            const blackListedToken = await TokenBlacklist.create({
                token
            })
        }
    
        res.clearCookie("token")
        return res.status(400).json({
            message: "user logged out"
        })

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

async function getMe(req, res) {
    const decoded = req.user

    const user = await User.findById(decoded.id).select(" -password")

    if(!user){
        return res.status(400).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        message: "user fetched ",
        user
    })
}

export {register, login, logout, getMe}