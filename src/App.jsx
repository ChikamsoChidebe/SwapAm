import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks.jsx";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App(){
  return (
    <div className="text-gray-800">
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Impact />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
