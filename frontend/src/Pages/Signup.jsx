import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../Components/Headers"

function Signup() {

  //state variables to store the different fields the user is entering when signing up 
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [grade, setGrade] = useState(9)
  const [type, setType] = useState("")

  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  useEffect(() => {

  }, [])

  const onSubmit = async (e) => { //when the sign up form is submitted
    e.preventDefault()
    const res = await fetch("http://localhost:5000/api/student/", { //send a post request to create the student with the fields
      method: "POST",
      headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify({
				username,
				password,
                fullName,
                grade,
                type
			}),
    })

    const data = await res.json()
    console.log(data._id)
    
    if (data._id){
      navigate('/')
    }
    else {
      setMessage("Username is already taken") //if username is taken, print this message on the screen
    }
  }

  return ( //display a standard form to enter credentials to sign up for an account
    <div className="min-h-screen max-w-full flex flex-col">
      <Header/>
      <form className="w-1/2 mx-auto" onSubmit={onSubmit}>
        <h1 className="mt-2 mb-10 text-center text-3xl text-zinc-700 font-semibold">Sign Up</h1>
        <div className="mx-auto w-2/3 mb-3 mt-3">
          <input className="w-full border-b border-b-slate-400 text-lg" type="text" name="username" value={username} placeholder='Enter a username' onChange={(e) => (setUsername(e.target.value))}/>
        </div>
        <div className="mx-auto w-2/3 mb-5">
          <input className="w-full border-b border-b-slate-400 text-lg" type="password" value={password} placeholder='Enter a password' onChange={(e) => (setPassword(e.target.value))}/>
        </div>
        <div className="mx-auto w-2/3 mb-5">
          <input className="w-full border-b border-b-slate-400 text-lg" type="text" value={fullName} placeholder='Enter Full Name' onChange={(e) => (setFullName(e.target.value))}/>
        </div>
        <div className="mx-auto w-2/3 mb-5">
          <label />Grade
          <select name="grade" onChange={(e) => (setGrade(e.target.value))}>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
          </select>
        </div>
        <div className="w-1/3 mx-auto text-lg text-center flex flex-row">
          <div className='mr-3'>
            <input className='mx-auto' type="radio" name="type" value="Student" onChange={(e) => (setType(e.target.value))} required/>Student
          </div>
          <div>
            <input className='mx-auto' type="radio" name="type" value="Administrator" onChange={(e) => (setType(e.target.value))} required/>Administrator
          </div>
        </div>
        <div className="w-1/3 mx-auto text-lg">
          <button className="w-full mx-auto bg-green-500  rounded-md text-white mb-3 hover:bg-green-300 mt-5" type="submit">Sign Up</button>
        </div>
        <div className="w-full text-center mb-5">
          <a href="/" className="text-indigo-700 mx-auto hover:text-indigo-900">Back to login</a>
        </div>
      </form>
      <div className="w-full text-center mb-5">
        <p className="text-red-600 mx-auto">{message}</p>
      </div>
    </div>
  )
}

export default Signup