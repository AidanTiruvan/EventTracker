const { request } = require("express")
const express = require("express")
const router = express.Router()
const Event = require("../Models/eventModel")
const Student = require("../Models/studentModel")



router.post("/", async (req, res) => { //Post request to create an admin
    const student = await Student.create({username: req.body.username, password: req.body.password, fullName: req.body.fullName})
    res.status(200).json(student)
})


module.exports = router