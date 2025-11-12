import React from "react";
import aboutImage from "../assets/about-image.jpg"
import { Link } from "react-scroll";


export default function About() {
  return (
    <section id="about" className="bg-[#0b3d2e] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        
       
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={aboutImage}
            alt="About Swapam"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-medium leading-tight">
            About Swapam
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Swapam is a campus-based circular economy platform where students
            can swap, sell, or donate used items — from books and gadgets to
            clothes and decor. Our mission is to turn student waste into
            wealth, reduce campus waste, and make everyday essentials more
            accessible to everyone at little or no cost.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Together, we’re building a more sustainable, student-powered
            community — where sharing and reusing items becomes second nature.
          </p>

         
           <Link to="howitworks" spy smooth offset={-70} duration={500}>
          <button  className="mt-4 inline-flex items-center gap-2 border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-[#0b3d2e] transition-all duration-300 px-6 py-2 rounded-full font-medium">
            Learn more →
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
