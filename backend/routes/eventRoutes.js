const { request } = require("express")
const express = require("express")
const router = express.Router()
const Event = require("../Models/eventModel")
const Student = require("../Models/studentModel")
const Admin = require("../Models/adminModel")
const { findByIdAndUpdate, findById } = require("../Models/eventModel")


//Read data from database - GET request
router.get("/", async (req, res) => { //Get request to get the active events from the database 
    const events = await Event.find({})
    let displayEvents = [] //array for events to be displayed in "Upcoming events" part of home page
    events.forEach(event => {
        if (event.isActive){
            displayEvents.push(event)
        }
    })
    res.status(200).json(displayEvents)
}) 

router.get("/event/:eventid", async (req, res) => { //Get request to get the data of the particular event
    const event = await Event.findById(req.params.eventid)
    const students = await Student.find({})
    const admins = await Admin.find({})
    let joinedStudents = []

    students.forEach(student => {
        event.studentsRegistered.forEach(registeredStudent => { //loops through each student in database and checks if that same student is registered for that event
            if (student._id.equals(registeredStudent)){
                joinedStudents.push(student)
            }
        })
    })
   
    res.status(200).json({students: joinedStudents, eventName: event.eventName, eventDescription: event.eventDescription, admins: admins})
}) 


router.get("/:studentid", async (req, res) => { //Get request to get the joined, past, and upcoming events by a particular student
    const student = await Student.findById(req.params.studentid)
    const events = await Event.find({})

    let studentEvents = [...student.joinedEvents]
    let otherEvents = []
    let joinedEvents = []
    let innactiveEvents = []


    events.forEach(event => { //loops through each event in the database
        let canpush = true
        studentEvents.forEach(studentEvent => { //loops through each event the particular student has registered for
            if (event._id.equals(studentEvent)){
                canpush = false
            }
        })
        if (canpush && event.isActive){ //if events are not equal, push to "upcoming events"
            otherEvents.push(event)
        }
        else if (!canpush) { //if they are equal, meaning that the student has joined the event which is being looped through, push to "joined events"
            joinedEvents.push(event)
        }
        if (!event.isActive){ //if the event regardless of if its joined or not, is innactive, push it to "past events"
            innactiveEvents.push(event)
        }
    })

    res.status(200).json({joinedEvents: joinedEvents, otherEvents: otherEvents, innactiveEvents: innactiveEvents})
}) 



//create data to database - POST request
router.post("/", async (req, res) => { //Post request to create an event from fields
    const event = await Event.create({eventName: req.body.eventName, eventDescription: req.body.eventDesc, studentsRegistered: [], isActive: true})
    res.status(200).json(event)
})


//update a piece of data in database - PUT request
router.put("/:eventid/:studentid", async (req, res) => { //Put request which appends the particuar event to the particular students' joined events and appends the student to the event's registered users
    const event = await Event.findById(req.params.eventid)
    const student = await Student.findById(req.params.studentid)

    event.studentsRegistered.push(req.params.studentid) //pushes the id of the student to the registered students
    let arr = event.studentsRegistered
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventid, {studentsRegistered: arr})


    student.joinedEvents.push(req.params.eventid)
    arr = student.joinedEvents
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentid, {joinedEvents: arr})

    res.status(200).json({event: updatedEvent, student: student})
})

router.put("/:eventid", async (req, res) => { //Put request to change whether a particular event is active or not
    const event = await Event.findById(req.params.eventid)
    let newactive = !event.isActive
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventid, {isActive: newactive})
    res.status(200).json(updatedEvent)
})




module.exports = router