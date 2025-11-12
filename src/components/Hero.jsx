import React from "react";
import { Link } from "react-scroll";
import heroImage from "../assets/hero-image.jpg";

export default function Hero() {
  return (
    <section id="home" className="pt-28 pb-20 bg-[#caac2a]">
      <div className="max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-lg">
      
          <div className="order-1 md:order-2 flex w-full h-auto">
            <img
              src={heroImage}
              alt="Students swapping items"
              className="w-full h-auto object-cover rounded-r-2xl md:rounded-l-none md:rounded-r-2xl"
            />
          </div>

        
          <div className="order-2 md:order-1 flex flex-col justify-center p-8 sm:p-12 bg-[#fdd835] rounded-2xl md:rounded-l-2xl md:rounded-r-none">
            <h1 className="text-2xl sm:text-3xl md:text-6xl font-medium leading-snug sm:leading-normal md:leading-tight text-gray-900">
              Turn campus <br />
              <span>waste</span> into <br />
              <span>student wealth</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-gray-700 text-sm sm:text-lg md:text-lg leading-relaxed max-w-full sm:max-w-lg">
              Swap, sell, and donate items with ease. Build a sustainable campus community while saving money.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap sm:flex-nowrap">
              <button className="flex-1 min-w-[100px] px-4 py-2 sm:px-8 sm:py-3 rounded-md bg-[#137C5C] text-white font-semibold shadow hover:bg-[#10634b] transition text-sm sm:text-base">
                Join now
              </button>
              <Link to="howitworks" spy smooth offset={-70} duration={500}>
                <button className="flex-1 min-w-[100px] px-4 py-2 sm:px-8 sm:py-3 rounded-md border border-[#137C5C] text-[#137C5C] bg-white font-semibold hover:bg-[#f0fdfa] transition text-sm sm:text-base">
                  Learn more
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
