const mongoose = require("mongoose")

const studentSchema = mongoose.Schema ({ //template for student in database with following fields
    username: String,
    password: String,
    fullName: String,
    points: Number,
    grade: Number,
    joinedEvents: [],
    type: String,
  })


module.exports = mongoose.model("Student", studentSchema)