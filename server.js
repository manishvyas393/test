const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const app = express()
const PORT = process.env.PORT || 4000
dotenv.config()
mongoose.connect(process.env.mongo_uri).then(() => {
      console.log("connected")
}).catch(err => console.log(err))
app.use(express.json())
app.use(cookieParser())
app.use("/api", userRoutes)
app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})
