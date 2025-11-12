import React from "react"; 
import impactSvg from "../assets/svg6.svg"

const Stat = ({ value, label }) => (
  <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 text-center">
    <div className="text-4xl font-semibold text-[#0b3d2e]">{value}</div>
    <div className="text-sm text-gray-600 mt-2">{label}</div>
  </div>
);

export default function Impact() {
  return (
    <section id="impact" className="w-full">

 
      <div className="w-full bg-gradient-to-br from-[#CAAC2A] via-[#FDD835] to-[#ffffff] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-4xl font-medium text-black">
            Our Campus Impact
          </h3>
          <p className="mt-3 text-black max-w-2xl mx-auto leading-relaxed">
            Swapam aims to transform student communities through circular
            sustainability, reducing waste, promoting reuse, and creating
            inclusive opportunities for every student.
          </p>

      
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat value="30%" label="Target Waste Reduction" />
            <Stat value="1.2k" label="Expected Items Reused" />
            <Stat value="500+" label="Projected Active Students" />
            <Stat value="25+" label="Partner Schools (Goal)" />
          </div>
        </div>
      </div>

      
      <div className="w-full bg-[#0B3D2E] py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        
          <div className="flex-1 text-white">
            <h4 className="text-3xl md:text-3xl font-medium mb-4">
              Building Green Jobs on Campus
            </h4>
            <p className="leading-relaxed text-white/90">
              Swapam creates local employment opportunities for students through
              our agent network. Students earn income while supporting the circular
              economy through pickup, delivery, and verification services.
            </p>
          </div>

          <div className="flex-1">
            <div className="w-full h-64 bg-white/10 rounded-2xl flex items-center justify-center">
              <img
                src={impactSvg}
                alt="Delivery image"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
