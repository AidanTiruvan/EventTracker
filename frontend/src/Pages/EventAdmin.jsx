import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from "../Components/Headers"
import { useNavigate } from 'react-router-dom'

const EventAdmin = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [eventName, setEventName] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [students, setStudents] = useState([])
  const [admins, setAdmins] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [points, setPoints] = useState(0)


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

  const handleChange = (e) => {
    if (e.target.checked){
        setSelectedStudents([...selectedStudents, e.target.value])
    }
    else {
        let arr = selectedStudents.filter((username) => username !== e.target.value)
        setSelectedStudents(arr)
    }
  }

  const markStudent = async (studentusername) => {
    const res = await fetch("http://localhost:5000/api/student/" + studentusername, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            points
        })
    })
    const data = await res.json()
    if (data){
      console.log(data.username + " points are now " + data.points)
    }
  }

  const deactivate = async () => {
    const res = await fetch("http://localhost:5000/api/event/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({})
    })
    const data = await res.json()
  }

  const markAllStudents = () => {
    selectedStudents.forEach(student => {markStudent(student)})
    deactivate()
    navigate("/home-admin")
  }

  return (
    <div className="min-h-screen max-w-full flex flex-col">
      <Header />
      <a href="/home-admin" className='hover:text-gray-600 ml-10 mt-5'><strong>Back</strong></a>
      <br />
      <h1 className='ml-10 text-green-500 text-3xl'><strong>{eventName}</strong></h1>
      <br/><br/>

      <p className='text-center text-2xl mb-1'><strong>Mark Attendance</strong></p>
      <div className="rounded-md bg-gray-800 h-2 w-1/3 mx-auto" />
      <br/>
      <div className='w-1/3 mx-auto'>
        <div className='w-1/3 mx-auto flex flex-row'>
          <input className='w-full mx-auto text-center border border-black mt-1 rounded-md' type="number" placeholder={points} onChange={(e) => {setPoints(e.target.value)}}/> 
          <p className='my-auto ml-3'> points</p>
        </div>
        <div className='flex flex-row mx-auto text-center mb-5 mt-4'>
          <div className='w-1/2'>
              <p className=''><strong className='text-green-500'>Name</strong></p>
          </div>
          <div className='w-1/2'>
              <p classNamr=""><strong className='text-green-500'>Grade</strong></p>
          </div> 
        </div>
        {students.map(student => (
            <div className='w-5/6 pl-3 mx-auto flex flex-row border border-gray-400 rounded-md mt-2'>
                <input type="checkbox" name="students" value={student.username} onChange={handleChange}/>
                <div className='w-1/2'>
                    <p className='ml-2 text-lg'><strong>{student.fullName}</strong></p>
                </div>
                <div className='w-1/2'>
                    <p className="text-center ml-5 text-lg"><strong>{student.grade}</strong></p>
                </div> 
                <br/>
            </div>
            
        ))}
        <div className='w-1/3 mx-auto mt-5'>
          <button className="w-full bg-green-500  rounded-md text-white mb-3 hover:bg-green-300 " onClick={markAllStudents}>Submit</button>
        </div>
        
      </div>

    </div>
  )
}

export default EventAdmin