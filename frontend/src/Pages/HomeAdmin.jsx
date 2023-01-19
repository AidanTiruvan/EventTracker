import {useState, useEffect} from 'react'
import Header from "../Components/NavBarAdmin"
import { Navigate, useNavigate } from 'react-router-dom'


const HomeAdmin = () => {
  const userid = localStorage.getItem('user') //user id is stored in localstorage to have during the duration of the visit to the site
  const [events, setEvents] = useState([])
  const [deactivated, setDeactivated] = useState(false)
  const [name, setName] = useState("")

  
  const [nine, setNine] = useState([])
  const [ten, setTen] = useState([])
  const [eleven, setEleven] = useState([])
  const [twelve, setTwelve] = useState([])

  const [w9, setW9] = useState("")
  const [w10, setW10] = useState("")
  const [w11, setW11] = useState("")
  const [w12, setW12] = useState("")

  const [w9p, setW9p] = useState(0)
  const [w10p, setW10p] = useState(0)
  const [w11p, setW11p] = useState(0)
  const [w12p, setW12p] = useState(0)

  const [w9m, setW9m] = useState("")
  const [w10m, setW10m] = useState("")
  const [w11m, setW11m] = useState("")
  const [w12m, setW12m] = useState("")

  const getUser = async () => {
    const res = await fetch("http://localhost:5000/api/student/admindata/" + userid, {
        method: "GET",
    })
    const data = await res.json()
    console.log(data)
    setName(data.fullName)
  }

  const getEvents = async () => {
      const res = await fetch("http://localhost:5000/api/event", {
          method: "GET"
      })
      const data = await res.json()
      setEvents(data)
  }

  const onEventDeactivate = async (id) => {
    const res = await fetch("http://localhost:5000/api/event/" + id, {
      method: "PUT",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify({})
    })
    const data = await res.json()

    if (data){
      setDeactivated(!deactivated)
    }
  }

  const allgrades = async () => {
    const res = await fetch("http://localhost:5000/api/student/", {
      method: "GET"
    })
    const data = await res.json()
    console.log(data)
    if (data){
      setNine(data.students9)
      setTen(data.students10)
      setEleven(data.students11)
      setTwelve(data.students12)
    }
  }

  useEffect(() => {
    getUser()
    getEvents()
    allgrades()
  }, [deactivated])

  const getMessages = () => {
    if (w9 >= 100){
      setW9m("Elligible for 100 point prize")
    }
    else if (w9 >= 50 && w9 < 100){
      setW9m("Elligible for 50 point prize")
    }
    else if (w9 >= 20 && w9 < 50){
      setW9m("Elligible for 20 point prize")
    }
    else {
      setW9m("")
    }

    if (w10 >= 100){
      setW10m("Elligible for 100 point prize")
    }
    else if (w10 >= 50 && w10 < 100){
      setW10m("Elligible for 50 point prize")
    }
    else if (w10 >= 20 && w10 < 50){
      setW10m("Elligible for 20 point prize")
    }
    else {
      setW10m("")
    }

    if (w11 >= 100){
      setW11m("Elligible for 100 point prize")
    }
    else if (w11 >= 50 && w11 < 100){
      setW11m("Elligible for 50 point prize")
    }
    else if (w11 >= 20 && w11 < 50){
      setW11m("Elligible for 20 point prize")
    }
    else {
      setW11m("")
    }

    if (w12 >= 100){
      setW12m("Elligible for 100 point prize")
    }
    else if (w12 >= 50 && w12 < 100){
      setW12m("Elligible for 50 point prize")
    }
    else if (w12 >= 20 && w12 < 50){
      setW12m("Elligible for 20 point prize")
    }
    else {
      setW12m("")
    }
  }

  const getWinners = () => {
    let idx9 = Math.floor(Math.random() * nine.length)
    let idx10 = Math.floor(Math.random() * ten.length)
    let idx11 = Math.floor(Math.random() * eleven.length)
    let idx12 = Math.floor(Math.random() * twelve.length)

    setW9p(nine[idx9].points)
    setW9(nine[idx9].fullName)
    if (nine[idx9].points >= 100){
      setW9m("Elligible for 100 point prize")
    }
    else if (nine[idx9].points >= 50 && nine[idx9].points < 100){
      setW9m("Elligible for 50 point prize")
    }
    else if (nine[idx9].points >= 20 && nine[idx9].points < 50){
      setW9m("Elligible for 20 point prize")
    }
    else {
      setW9m("")
    }

    setW10p(ten[idx10].points)
    setW10(ten[idx10].fullName)
    if (ten[idx10].points >= 100){
      setW10m("Elligible for 100 point prize")
    }
    else if (ten[idx10].points >= 50 && ten[idx10].points < 100){
      setW10m("Elligible for 50 point prize")
    }
    else if (ten[idx10].points >= 20 && ten[idx10].points < 50){
      setW10m("Elligible for 20 point prize")
    }
    else {
      setW10m("")
    }

    setW11p(eleven[idx11].points)
    setW11(eleven[idx11].fullName)
    if (eleven[idx11].points >= 100){
      
      setW11m("Elligible for 100 point prize")
    }
    else if (eleven[idx11].points >= 50 && eleven[idx11].points < 100){
      setW11m("Elligible for 50 point prize")
    }
    else if (eleven[idx11].points >= 20 && eleven[idx11].points < 50){
      setW11m("Elligible for 20 point prize")
    }
    else {
      console.log("i dont work")
      setW11m("")
    }

    setW12p(twelve[idx12].points)
    setW12(twelve[idx12].fullName)
    if (twelve[idx12].points >= 100){
      setW12m("Elligible for 100 point prize")
    }
    else if (twelve[idx12].points >= 50 && twelve[idx12].points < 100){
      setW12m("Elligible for 50 point prize")
    }
    else if (twelve[idx12].points >= 20 && twelve[idx12].points < 50){
      setW12m("Elligible for 20 point prize")
    }
    else {
      setW12m("")
    }

  }

  const clearWinners = () => {
    setW9("")
    setW10("")
    setW11("")
    setW12("")

    setW9p(0)
    setW10p(0)
    setW11p(0)
    setW12p(0)
  }

  const navigate = useNavigate()

  return (
    <div className="min-h-screen max-w-full flex flex-col">
      <Header />
      
      <div className='mt-7'>
            <div className='w-1/2 mx-auto'>
                <h1 className='text-center text-3xl'><strong>Welcome</strong> <strong className=' text-green-500'>{name}</strong></h1>
            </div>
            <br/><br/><br/>
            <div className='w-1/4'>
                <div className="rounded-md bg-gray-800 w-1/2 mx-auto">
                    <h3 className='text-white text-center mb-3'>Events: </h3>
                </div>
            </div>

            <div className=' w-full flex flex-row mx-auto'>
              {events.map(event => (
                <div className='flex flex-row mt-3 w-1/5 mr-5'>
                    <div className='bg-green-500 w-3'/>
                    <div className= " bg-gray-200 w-full hover:bg-gray-300 hover:cursor-pointer" onClick={() => navigate("/event-admin/" + event._id)}>
                        <p className='ml-1 text-lg' href={"/event/" + event._id}><strong>{event.eventName}</strong></p>
                        <p className='ml-1'>{event.eventDescription}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>

      <br/><br/><br/>
      {w9 === "" ? <button className="w-1/6 mx-auto bg-green-500  rounded-md text-white mb-3 hover:bg-green-300 text-lg" onClick={getWinners}><strong>Get Quarter Winners</strong></button> : <button className="w-1/6 mx-auto bg-green-500  rounded-md text-white mb-3 hover:bg-green-300 text-lg" onClick={clearWinners}><strong>Clear Quarter Winners</strong></button>}
      {w9 !== "" &&
        <div className='mx-auto flex mt-3'>
          <div className='mx-10'>
            <p className='text-lg text-green-500 underline'><strong>Winner 9th Grade</strong></p>
            <p><strong>{w9}</strong></p>
            <p>{w9p} points</p>
            <p>{w9m}</p>
            <br/>
          </div>
          <div className='mx-10'>
            <p className='text-lg text-green-500 underline'><strong>Winner 10th Grade</strong></p>
            <p><strong>{w10}</strong></p>
            <p>{w10p} points</p>
            <p>{w10m}</p>
            <br/>
          </div>
          <div className='mx-10'>
            <p className='text-lg text-green-500 underline'><strong>Winner 11th Grade</strong></p>
            <p><strong>{w11}</strong></p>
            <p>{w11p} points</p>
            <p>{w11m}</p>
            <br/>
          </div>
          <div className='mx-10'>
            <p className='text-lg text-green-500 underline'><strong>Winner 12th Grade</strong></p>
            <p><strong>{w12}</strong></p>
            <p>{w12p} points</p>
            <p>{w12m}</p>
            <br/>
          </div>
          
        </div>
      }
    </div>
  )
}

export default HomeAdmin