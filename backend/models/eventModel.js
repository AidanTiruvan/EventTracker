const mongoose = require("mongoose")


const eventSchema = mongoose.Schema ({ //template for event in database with following fields
    eventName: String,
    eventDescription: String,
    studentsRegistered: [],
    isActive: Boolean
})


module.exports = mongoose.model("Event", eventSchema)
