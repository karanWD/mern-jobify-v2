import express from "express"
import "express-async-errors"
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import jobsRouter from "./routers/jobs-router.js"
import authRouter from "./routers/auth-router.js"
import userRouter from "./routers/user-router.js"
import dashboardRouter from "./routers/dashboard-router.js"
import {authenticateUser} from "./middlewares/authMiddleware.js";
import path,{dirname} from "path"
import {fileURLToPath} from "url"
import cloudinary from 'cloudinary';


// Config
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Public
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,"./public")))

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Router
app.use("/api/auth", authRouter)
app.use("/api/dashboard",authenticateUser, dashboardRouter)
app.use("/api/jobs", authenticateUser,jobsRouter)
app.use("/api/user", authenticateUser,userRouter)

// Error Handler
app.use("*", (res, req) => {
  console.log('404 ROUTE')
  res.status(404).json({message:"unexpected route"})
})
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({message: "Unfortunately, we have some errors here :("})
})


// Database
try {
  await mongoose.connect(process.env.DB_URL).then(() => console.log("DB IS CONNECTED"))
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port:${process.env.PORT || 5100}`)
  })

} catch (e) {
  console.log(e, "ERROR on registering db")
  process.exit(1);
}
