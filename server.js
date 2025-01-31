import express from "express"
import "express-async-errors"
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import jobsRouter from "./routers/jobs-router.js"
import usersRouter from "./routers/users-router.js"

dotenv.config()
const app = express()
app.use(express.json())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}


app.use("/api/jobs", jobsRouter)
app.use("/api/auth", usersRouter)
app.use("*", (res, req) => {
  console.log('404 ROUTE')
  res.status(404).json({message:"unexpected route"})
})
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({message: "Unfortunately, we have some errors here :("})
})

try {
  await mongoose.connect(process.env.DB_URL).then(() => console.log("DB IS CONNECTED"))
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port:${process.env.PORT || 5100}`)
  })

} catch (e) {
  console.log(e, "ERROR on registering db")
  process.exit(1);
}
