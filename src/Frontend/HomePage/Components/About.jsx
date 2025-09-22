import React from 'react'
import '../index.css'
import Card from './Card.jsx'
import Vision from '../assets/vision.png'
import Mission from '../assets/mission.png'

function About() { 
    return (
        <>
            <h1 className='text-purple-900 font-bold text-7xl text-center mt-5 mb-12'>Who Are We?</h1>
            <div className="about-section flex flex-row gap-20 justify-center items-center flex-wrap mb-20">
                <div className='about w-1/2 flex flex-col items-center mb-16 rounded-full p-10 bg-transparent'>
                    <img className='w-56 h-44' src={Vision} alt="Vision" />
                    <h1 className='font-bold text-purple-800 text-6xl mt-12 mb-10 text-center'>Our Vision</h1>
                    <p className='font-bold text-purple-500 text-xl max-w-96'>To bridge the educational divide by transforming learning into an engaging, inclusive, and accessible experience for every student, regardless of location or resources. We envision a future where every child learns not out of compulsion, but out of curiosity and joy.</p>
                </div>

                <div className='about w-1/2 flex flex-col items-center mb-16 rounded-full p-10 bg-transparent'>
                    <img className='w-56 h-44' src={Mission} alt="Mision" />
                    <h1 className='font-bold text-purple-800 text-6xl mt-12 mb-10 text-center'>Our Mission</h1>
                    <p className='font-bold text-purple-500 text-xl max-w-96'>To gamify STEM education through interactive games, quizzes, and simulations that spark curiosity.To empower rural and underserved students with multilingual, offline-first access, ensuring no learner is left behind.</p>
                </div>
            </div>
        </>
    )
}

export default About