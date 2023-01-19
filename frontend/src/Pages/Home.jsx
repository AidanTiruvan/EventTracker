import {useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from "../Components/NavBar"

const Home = () => {
    const userid = localStorage.getItem('user')
    const navigate = useNavigate()
    const [joinedEvents, setJoinedEvents] = useState([])
    const [otherEvents, setOtherEvents] = useState([])
    const [innactiveEvents, setInnactiveEvents] = useState([])
    const [user, setUser] = useState({username: "", fullName: "", points: 0, grade: 0, joinedEvents: []})
    const [joined, setJoined] = useState(false)

    const getUser = async () => {
        const res = await fetch("http://localhost:5000/api/student/studentdata/" + userid, {
            method: "GET",
        })
        const data = await res.json()
        console.log(data)
        setUser(data)
    }

    const getEvents = async () => {
        const res = await fetch("http://localhost:5000/api/event/" + userid, {
            method: "GET"
        })
        const data = await res.json()
        setOtherEvents(data.otherEvents)
        setJoinedEvents(data.joinedEvents)
        setInnactiveEvents(data.innactiveEvents)
    }

    useEffect(() => {
        getUser()
        getEvents()
    }, [joined])

    const onJoin = async (id) => {
        const res = await fetch("http://localhost:5000/api/event/" + id + "/" + userid, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({})
        })
        const data = await res.json()
        if (data){
            setJoined(!joined)
        }
    }

  return (
    <div className="min-h-screen max-w-full flex flex-col">
        <Header />
        <div className='mt-7 h-full'>
            <div className='w-1/2 mx-auto'>
                <h1 className='text-center text-3xl'><strong>Welcome</strong> <strong className=' text-green-500'>{user.fullName}</strong></h1>
                <h3 className="text-center">You have earned <strong className=' text-green-500'>{user.points}</strong> points in total</h3>
            </div>
            <br/><br/><br/>
            <div className='w-1/4'>
                <div className="rounded-md bg-gray-800 w-1/2 mx-auto">
                    <h3 className='text-white text-center mb-3'>Past Events: </h3>
                </div>
            </div>

            <div className=' w-full flex flex-row mx-auto h-3/4 ml-2'>
                {innactiveEvents.map(event => (
                    <div className='flex flex-row mt-3 w-1/5 mr-5'>
                        <div className='bg-green-200 w-3'/>
                        <div className= " bg-gray-200 w-full">
                            <p className='ml-1 text-lg'><strong>{event.eventName}</strong></p>
                            <p className='ml-1 text-red-600'>EVENT PASSED</p>
                        </div>
                    </div>

                ))}
            </div>
            <br/><br/><br/><br/>
            <div className='w-1/4'>
                <div className="rounded-md bg-gray-800 w-1/2 mx-auto">
                    <h3 className='text-white text-center mb-3'>Joined Events: </h3>
                </div>
            </div>

            <div className=' w-full flex flex-row mx-auto h-3/4 ml-2'>
                {joinedEvents.map(event => (
                    <div className='flex flex-row mt-3 w-1/5 mr-5'>
                        <div className='bg-green-500 w-3'/>
                        <div className= " bg-gray-200 w-full hover:bg-gray-300 hover:cursor-pointer" onClick={() => navigate("/event/" + event._id)}>
                            <p className='ml-1 text-lg' href={"/event/" + event._id}><strong>{event.eventName}</strong></p>
                            <p className='ml-1'>{event.eventDescription}</p>
                        </div>
                    </div>

                ))}
            </div>

            <br/><br/><br/><br/>
            <div className='w-1/4'>
                <div className="rounded-md bg-gray-800 w-1/2 mx-auto">
                    <h3 className='text-white text-center mb-3'>Upcoming Events: </h3>
                </div>
            </div>
            <div className=' w-full flex flex-row mx-auto h-3/4 ml-2'>
                {otherEvents.map(event => (
                    <div className='flex flex-row mt-3 w-1/5 mr-5 mx-auto'>
                        <div className='bg-green-800 w-3'/>
                        <div className= " bg-gray-200 w-full hover:bg-gray-300 hover:cursor-pointer" onClick={() => onJoin(event._id)}>
                            <p className='ml-1 text-lg' href={"/event/" + event._id}><strong>{event.eventName}</strong></p>
                            <p className='ml-1'>{event.eventDescription}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        
    </div>
  )
}

export default Home