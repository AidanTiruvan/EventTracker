import React from 'react'
import Header from "../Components/NavBar"

const FAQ = () => {
  return (
    <div className="min-h-screen max-w-full flex flex-col">
        <Header />
        <h1 className='text-center mt-5 text-green-500 text-3xl mb-5'><strong>FAQ</strong></h1>
        <br/><br/><br/>

        <div className='w-1/2 mx-auto mb-5'>
            <p className='text-xl text-center'><strong className='text-green-500'>Q1: </strong><strong>How do I track my attendance at school events and earn points?</strong></p>
            <p className='text-md text-center'>To track your attendance at school events and earn points, you will need to login to your EventTracker account then go to your Home page, there you can sign up for events. Once you show up to a certain event, an administrator will mark you off for attendance, and you will automatically receive points if attended. </p>
        </div>
        <div className='w-1/2 mx-auto mb-5'>
            <p className='text-xl text-center'><strong className='text-green-500'>Q2: </strong><strong>Can I see a history of the events I've attended and the points I've earned?</strong></p>
            <p className='text-md text-center'>Yes, you can see past events and points earned in the home page of EventTracker. </p>
        </div>
        <div className='w-1/2 mx-auto mb-5'>
            <p className='text-xl text-center'><strong className='text-green-500'>Q3: </strong><strong>How can I redeem the points I've earned for rewards or prizes?</strong></p>
            <p className='text-md text-center'>To redeem points you have earned, navigate to the Prizes page where you can see the current redeemable rewards, then ask an administrator or teacher to register you for the prize. This will deduct the points from your balance. </p>
        </div>

    </div>
  )
}

export default FAQ