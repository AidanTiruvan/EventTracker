const mongoose = require("mongoose")

const adminSchema = mongoose.Schema ({ //template for admin in database with following fields
    username: String,
    password: String,
    fullName: String
  })


module.exports = mongoose.model("Admin", adminSchema)