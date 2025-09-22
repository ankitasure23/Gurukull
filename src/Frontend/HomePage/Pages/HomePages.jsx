import React from 'react'
import '../index.css'
import Button from '../Components/Button.jsx'
import Home from '../assets/home.png'
import NavBar from '../Components/NavBar.jsx'
import HeroSection from '../Components/heroSection.jsx'
import Features from '../Components/Features.jsx'
import Footer from '../Components/Footer.jsx'
import About from '../Components/About.jsx'

function HomePages() {
    return (
        <>
        <div className="home-page">
            <div>
                <NavBar/>
            </div>
            <div>
                <HeroSection/>      
                </div>
                <div>
                    <Features/>
                </div>
                <div>
                    <About/>
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    </>
    )
}
export default HomePages