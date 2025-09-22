import React from 'react';
import Card from './Card.jsx';
import Multilingual from '../assets/multilingual.png';
import Offline from '../assets/offline.png';
import LowBandwidth from '../assets/bandwidth.png';
import Gamified from '../assets/gamified.png';
import Cognitive from '../assets/cognitive.png';
import TeacherAnalytics from '../assets/teacherAnalytics.png';

function Features() {
    return (
        <>
            <div className='mb-36'>
                <h1 className='text-6xl text-purple-900 justify-center items-center text-center font-extrabold mb-20'>Let's make learning addictive</h1>
            <div className='flex flex-row gap-10'>
                <Card icon={Multilingual} title="Multilingual Learning" description="Learn in your preferred language. Our platform is available in Hindi, Bengali, Tamil, English and many other languages making education accessible and comfortable for everyone."></Card>
                <Card icon={Offline} title="Works Offline" description="Never stop learning. Download lessons and access all your content without an internet connection, perfect for learning on the go."></Card>
                <Card icon={TeacherAnalytics} title="Teacher Analytics" description="Offers tools for teachers to track student progress and engagement.Helps personalize support based on individual learning patterns.."></Card>
            </div>
            <div className='flex flex-row gap-10'>
                <Card icon={LowBandwidth} title="Low-bandwidth" description="Optimized for every connection. Our platform uses small downloads, compressed assets, and progressive syncing to ensure a smooth learning experience, even on low-speed internet."></Card>
                <Card icon={Gamified} title="Gamified Learning" description="Provides games, quizzes, and simulations aligned with school curriculum to make learning an interactive and fun experience."></Card>
                <Card icon={Cognitive} title="Critical Thinking" description="Encourages problem-solving and critical thinking through engaging content designed to help students master new concepts."></Card>
            </div>
            </div>
        </>
    )
}

export default Features;