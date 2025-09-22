import React from 'react';
import Avatar from '../../../assets/avatar.png';
import Button from './Button.jsx';
import Learn from '../../../assets/learn.png';
import Download from '../../../assets/download.png';
import Science from '../../../assets/science.png';
import Technology from '../../../assets/technology.png';
import Engineering from '../../../assets/engineering.png';
import Mathematics from '../../../assets/mathematics.png';

function HeroSection() {
    return (
        <div className='flex items-center justify-around p-10'>
            <div className='flex flex-col gap-10'>
                <Button name="Science" icon={Science}></Button>
                <Button name="Technology" icon={Technology}></Button>
                <Button name="Engineering" icon={Engineering}></Button>
                <Button name="Mathematics" icon={Mathematics}></Button>
            </div>
            <div className="relative w-[400px] h-[600px] items-center justify-center">
                <img src={Avatar} alt="Student" className="w-[500px] h-[500px] object-contain relative z-10" />
            </div>
        
            <div className='flex flex-col justify-center max-w-2xl text-center gap-6'>
                <h1 className='text-6xl text-purple-800 font-extrabold'>LEARN PLAY GROW</h1>
                <h2 className='text-2xl  font-bold text-purple-600 text-'>Making STEM learning fun, accessible, and gamified for every student.</h2>
                <p className='text-purple-600 font-bold text-2xl'>Welcome to <span className="font-semibold text-purple-600">SikSha</span> —  
                a gamified digital learning platform designed for students in grades 6–12.  
                Master STEM subjects through interactive <span className="text-blue-600">games, quizzes, and simulations</span>,  
                    with multilingual support and offline access for everyone.</p>
                <div className='flex gap-12 justify-center'>
                    <Button icon={Learn}></Button>
                    <Button icon={Download}></Button>
                </div>
            </div>
        </div>
    )

}

export default HeroSection;