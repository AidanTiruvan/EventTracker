import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from "../Components/Headers"
import { useNavigate } from 'react-router-dom'

const Event = () => {
  const { id } = useParams();
  const [eventName, setEventName] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [students, setStudents] = useState([])
  const [admins, setAdmins] = useState([])
  
  const getEvent = async () => {
    const res = await fetch("http://localhost:5000/api/event/event/" + id, {
        method: "GET"
    })
    const data = await res.json()
    console.log(data)

    if (data){
        setEventName(data.eventName)
        setStudents(data.students)
        setAdmins(data.admins)
    }
  }

  useEffect(() => {
    getEvent()
  }, [])

  return (
    <div className="min-h-screen max-w-full flex flex-col">
      <Header />
      <a href="/home" className='hover:text-gray-600 ml-5 mt-5'><strong>Back</strong></a>
      <br/>
      <h1 className='ml-5 text-green-500 text-3xl'><strong>{eventName}</strong></h1>
      <br/><br/>
      <p className='text-center text-xl mb-1'><strong>Participants</strong></p>
      <div className="rounded-md bg-gray-800 h-2 w-1/5 mx-auto" />
      <br/>
        {students.map(student => (
            <div className='w-1/6 mx-auto'>
                <p className='ml-10'><strong>{student.fullName}</strong> | Grade: {student.grade}</p>
            </div>
        ))}
        
    </div>
  )
}

export default Event