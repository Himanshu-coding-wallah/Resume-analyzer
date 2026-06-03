import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true}))
app.use(cookieParser())

//routes
app.use('/api/v1/auth', authRouter)

export default app