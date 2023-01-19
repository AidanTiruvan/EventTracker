const express = require("express") //express is a javascript backend framework which allows you to create 'routes' to different 'endpoints'
const cors = require('cors')
const app = express()
const mongoose = require("mongoose") //mongoose is how we communicate with database

//connect to DB
mongoose.connect("mongodb+srv://aidantiruvan:aidantiruvan@eventtrackerdb.gitkocs.mongodb.net/EventTrackerDB")


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


//routes
app.use("/api/event", require("./routes/eventRoutes"))
app.use("/api/student", require("./routes/studentRoutes"))


//Run Server
app.listen(5000, () => console.log("Running on port 5000"))