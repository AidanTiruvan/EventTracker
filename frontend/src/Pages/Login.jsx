import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../Components/Headers"


const Login = () => {
  
  const navigate = useNavigate()

  //state variables to store the different fields the user is entering when logging in 
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  

  const onSubmit = async (e) => { //when the login form is submitted
    e.preventDefault()
    const res = await fetch("http://localhost:5000/api/student/login", { //send a post request to log the user in with the credentials
      method: "POST",
      headers: {
		'Content-Type': 'application/json',
	  },
      body: JSON.stringify({
        username,
        password,
        type
	    }),
    })

    const data = await res.json()
    console.log(data)

    if (data.type === "Student"){
      localStorage.setItem("user", data._id)
      navigate('/home') //navigate to home once logged in
    }
    else if (data.message){
      setMessage("Invalid Credentials") //if the user's credentials are invalid, print this message
    }
    else if (data) {
      localStorage.setItem("user", data._id)
      navigate('/home-admin') 
    }
  }

  const onRadioSelect = (e) => {
    setType(e.target.value) 
  }

  return ( //display a standard form to enter credentials to login
    <div className="min-h-screen max-w-full flex flex-col">
      <Header/>
      <form className="w-1/2 mx-auto" onSubmit={onSubmit}>
        <h1 className="mt-2 mb-10 text-center text-3xl text-zinc-700 font-semibold">Login</h1>
        <div className="mx-auto w-2/3 mb-3 mt-3">
          <input className="w-full border-b border-b-slate-400 text-lg" type="text" name="username" value={username} placeholder='Username' onChange={(e) => (setUsername(e.target.value))}/>
        </div>
        <div className="mx-auto w-2/3 mb-5">
          <input className="w-full border-b border-b-slate-400 text-lg" type="password" value={password} placeholder='Password' onChange={(e) => (setPassword(e.target.value))}/>
        </div>
        <div className="w-1/3 mx-auto text-lg text-center flex flex-row">
          <div className='mr-3'>
            <input className='mx-auto' type="radio" name="type" value="Student" onChange={onRadioSelect} required/>Student
          </div>
          <div>
            <input className='mx-auto' type="radio" name="type" value="Administrator" onChange={onRadioSelect} required/>Administrator
          </div>
        </div>
        <div className="w-1/3 mx-auto text-lg mt-5">
          <button className="w-full mx-auto bg-green-500  rounded-md text-white mb-3 hover:bg-green-300 " type="submit">LOGIN</button>
        </div>
        <div className="w-full text-center mb-5">
          <a href="/signup" className="text-indigo-700 mx-auto hover:text-indigo-900">Dont have an account?</a>
        </div>          
      </form>
      <div className="w-full text-center mb-5">
        <p className="text-red-600 mx-auto">{message}</p>
      </div>
    </div>
  )
}

export default Login