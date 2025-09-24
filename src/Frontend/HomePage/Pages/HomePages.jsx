import React from "react";
import "../../../index.css";

// Components
import NavBar from "../Components/NavBar.jsx";
import HeroSection from "../Components/HeroSection.jsx";
import Features from "../Components/Features.jsx";
import About from "../Components/About.jsx";
import Footer from "../Components/Footer.jsx";

// Assets (use only if needed, otherwise remove)
import Home from "../../../assets/home.png";
import Pragya from "../../../assets/pragya.png";
function HomePages() {
return (
    <div className="home-page">
        <NavBar />
        <HeroSection />
        <Features />
        <About />
        <Footer />
    </div>
);
}

export default HomePages;
