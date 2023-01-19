const { request } = require("express")
const express = require("express")
const router = express.Router()
const Event = require("../Models/eventModel")
const Student = require("../Models/studentModel")
const Admin = require("../Models/adminModel")

const comparePoints = (a, b) => {
    return a.points - b.points
}

router.get("/sorted", async (req, res) => { //Get request which gets the students sorted by the number of points from the database
    const students9 = await Student.find({grade: 9})
    const students10 = await Student.find({grade: 10})
    const students11 = await Student.find({grade: 11})
    const students12 = await Student.find({grade: 12})


    res.status(200).json({students9: students9.sort(comparePoints).reverse(), students10: students10.sort(comparePoints).reverse(), students11: students11.sort(comparePoints).reverse(), students12: students12.sort(comparePoints).reverse()})
})

router.get("/", async (req, res) => { //Get request which gets the students in random order from the database
    const students9 = await Student.find({grade: 9})
    const students10 = await Student.find({grade: 10})
    const students11 = await Student.find({grade: 11})
    const students12 = await Student.find({grade: 12})

    res.status(200).json({students9: students9, students10: students10, students11: students11, students12: students12})
})

router.get("/:eventid", async (req, res) => { //Get request which tells if the user is registered for a particular event or not
    const event = await Event.findById(req.params.eventid)
    res.status(200).json(event.studentRegistered)
}) 

router.get("/studentdata/:studentid", async (req, res) => { //Get request which gives the information of a particular student 
    const student = await Student.findById(req.params.studentid)
    res.status(200).json({
        username: student.username,
        fullName: student.fullName,
        points: student.points,
        grade: student.grade,
        joinedEvents: student.joinedEvents
    })
})

router.get("/admindata/:adminid", async (req, res) => { //Get request which gives the information of a particular admin
    const admin = await Admin.findById(req.params.adminid)
    res.status(200).json({
        username: admin.username,
        fullName: admin.fullName,
    })
})


router.post("/", async (req, res) => { //Post request which creates a student with specified form fields
    if (req.body.type === "Student"){
        const s = await Student.findOne({username: req.body.username})
        if (s){
            res.status(400).json({message: "Username already taken"}) //displays error if username has already been taken
        }
        else {
            const student = await Student.create({username: req.body.username, password: req.body.password, fullName: req.body.fullName, grade: req.body.grade, points: 0, joinedEvents: [], type: "Student"})
            res.status(200).json(student)
        }

    }
    else if (req.body.type === "Administrator"){ //same functionality as above for student but for admin
        const a = await Admin.findOne({username: req.body.username})
        if (a){
            res.status(400).json({message: "Username already taken"})
        }
        else {
            const admin = await Admin.create({username: req.body.username, password: req.body.password, fullName: req.body.fullName})
            res.status(200).json(admin)
        }
    }
})

router.post("/login", async (req, res) => { //Post request which sends login credentials to database, and validates in order to authenticate user
    let student
    let admin

    if (req.body.type === "Student"){
        student = await Student.findOne({username: req.body.username, password: req.body.password})

        if (student){
            res.status(200).json(student)
        }
        else {
            res.status(400).json({message: "Invalid Credentials"}) //error message if credentials are invalid
        }
    }
    else if (req.body.type === "Administrator"){
        admin = await Admin.findOne({username: req.body.username, password: req.body.password})

        if (admin){
            res.status(200).json(admin)
        }
        else {
            res.status(400).json({message: "Invalid Credentials"})
        }
    }
})

router.put("/:studentusername", async (req, res) => { //Put request which updates the particular student's number of points 
    const student = await Student.findOne({username: req.params.studentusername})

    let num = parseInt(student.points) + parseInt(req.body.points) //
    const s = await Student.findOneAndUpdate({username: req.params.studentusername}, {points: num}) //finds student by username and updates points
    res.status(200).json(s)
})



module.exports = router