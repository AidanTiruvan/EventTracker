import {useState, useEffect} from 'react'
import Header from "../Components/NavBar"

const Leaderboard = () => {
  
  //State variables to store the sorted students as arrays by grade level
  const [a9, seta9] = useState([])
  const [a10, seta10] = useState([])
  const [a11, seta11] = useState([])
  const [a12, seta12] = useState([])

  const getData = async () => { //a Get request to get the sorted students by grade level
    const res = await fetch("http://localhost:5000/api/student/sorted", {
        method: "GET"
    })
    const data = await res.json()

    if (data){
        seta9(data.students9)
        seta10(data.students10)
        seta11(data.students11)
        seta12(data.students12)
    }
  }

  useEffect(() => {
    getData() //happens the first time the application is loaded to that page
  }, [])

  return ( //displays the list of students in sorted order with their names and points side by side by grade level 
    <div className="min-h-screen max-w-full flex flex-col">
        <Header />
        <h1 className='text-center mt-5 text-green-500 text-3xl mb-5'><strong>Leaderboard</strong></h1>
        <br/>

        <div className='w-1/2 mx-auto'>
            <div className="rounded-md bg-gray-800">
                    <h3 className='text-white text-center mb-3'>9th Grade: </h3>
            </div>

            <div className='flex flex-row mx-auto text-center mb-5'>
                <div className='w-1/2'>
                    <p className='ml-5'><strong className='text-green-500'>Name</strong></p>
                </div>
                <div className='w-1/2'>
                    <p classNamr="ml-5"><strong className='text-green-500'>Points</strong></p>
                </div> 
            </div>
            {a9.map((student, index) => (
                <div className='flex flex-row mx-auto text-center'>
                    <div className='w-1/2'>
                        <p className='ml-5'><strong>{student.fullName}</strong></p>
                    </div>
                    <div className='w-1/2'>
                        <p classNamr="ml-5"><strong>{student.points}</strong></p>
                    </div> 
                </div>
            ))}
        </div>
        <br/><br/>

        <div className='w-1/2 mx-auto'>
            <div className="rounded-md bg-gray-800">
                    <h3 className='text-white text-center mb-3'>10th Grade: </h3>
                </div>
            <div className='flex flex-row mx-auto text-center mb-5'>
                <div className='w-1/2'>
                    <p className='ml-5'><strong className='text-green-500'>Name</strong></p>
                </div>
                <div className='w-1/2'>
                    <p classNamr="ml-5"><strong className='text-green-500'>Points</strong></p>
                </div> 
            </div>
            {a10.map((student, index) => (
                <div className='flex flex-row mx-auto text-center'>
                    <div className='w-1/2'>
                        <p className='ml-5'><strong>{student.fullName}</strong></p>
                    </div>
                    <div className='w-1/2'>
                        <p classNamr="ml-5"><strong>{student.points}</strong></p>
                    </div> 
                </div>
            ))}
        </div>
        <br/><br/>


        <div className='w-1/2 mx-auto'>
            <div className="rounded-md bg-gray-800">
                    <h3 className='text-white text-center mb-3'>11th Grade: </h3>
            </div>
            <div className='flex flex-row mx-auto text-center mb-5'>
                <div className='w-1/2'>
                    <p className='ml-5'><strong className='text-green-500'>Name</strong></p>
                </div>
                <div className='w-1/2'>
                    <p classNamr="ml-5"><strong className='text-green-500'>Points</strong></p>
                </div> 
            </div>
            {a11.map((student, index) => (
                <div className='flex flex-row mx-auto text-center'>
                    <div className='w-1/2'>
                        <p className='ml-5'><strong>{student.fullName}</strong></p>
                    </div>
                    <div className='w-1/2'>
                        <p classNamr="ml-5"><strong>{student.points}</strong></p>
                    </div> 
                </div>
            ))}
        </div>
        <br/><br/>


        <div className='w-1/2 mx-auto'>
            <div className="rounded-md bg-gray-800">
                    <h3 className='text-white text-center mb-3'>12th Grade: </h3>
            </div>
            <div className='flex flex-row mx-auto text-center mb-5'>
                <div className='w-1/2'>
                    <p className='ml-5'><strong className='text-green-500'>Name</strong></p>
                </div>
                <div className='w-1/2'>
                    <p classNamr="ml-5"><strong className='text-green-500'>Points</strong></p>
                </div> 
            </div>
            {a12.map((student, index) => (
                <div className='flex flex-row mx-auto text-center'>
                    <div className='w-1/2'>
                        <p className='ml-5'><strong>{student.fullName}</strong></p>
                    </div>
                    <div className='w-1/2'>
                        <p classNamr="ml-5"><strong>{student.points}</strong></p>
                    </div> 
                </div>
            ))}
        </div>
        <br/>
        

    </div>
  )
}

export default Leaderboard