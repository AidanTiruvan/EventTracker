import React from 'react'

const NavBar = () => {
  return (
    <div className=" bg-zinc-900 w-full flex flex-row ">
        <h3 className="text-green-500 font-semibold text-xl py-1 pl-2">EventTracker</h3>
        <div className='ml-auto mr-10 pr-10 my-auto'>
          <a href="/home" className='text-white mr-10 pr-10 hover:text-slate-300'>Home</a>
            <a href="/leaderboard" className='text-white mr-10 pr-10 hover:text-slate-300'>Leaderboard</a>
            <a href="/prizes" className='text-white hover:text-slate-300 mr-10 pr-10'>Prizes</a>
            <a href="/faq" className='text-white hover:text-slate-300 mr-10 pr-10'>FAQ</a>
            <a href="/" className='text-white hover:text-slate-300'><strong>Sign Out</strong></a>
        </div>
    </div>
  )
}

export default NavBar