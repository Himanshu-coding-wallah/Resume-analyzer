import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const authRouter = express.Router()

/**
 * @route POST /api/v1/auth/register
 * @access public
 */
authRouter.route('/register').post(register)

/**
 * @route POST /api/v1/auth/login
 * @access only for registered
 */
authRouter.route('/login').post(login)


/**
 * @route POST /api/v1/auth/logout
 * @access only for logged in
 */
authRouter.route('/logout').post(logout)


/**
 * @route GET /api/v1/auth/get-me
 * @access 
 */
authRouter.route('/get-me').get(authUser ,getMe)

export default authRouter