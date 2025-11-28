import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [currentStats, setCurrentStats] = useState({ items: 0, students: 0, universities: 0 });
  const fullText = "Turn campus waste into student wealth";
  const finalStats = { items: 25000, students: 8500, universities: 150 };

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      if (step <= steps) {
        const progress = step / steps;
        setCurrentStats({
          items: Math.floor(finalStats.items * progress),
          students: Math.floor(finalStats.students * progress),
          universities: Math.floor(finalStats.universities * progress)
        });
        step++;
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();
  const handleAuthClick = (type) => {
    navigate(`/${type}`);
  };

  return (
    <section id="home" className="pt-28 pb-20 bg-gradient-to-br from-[#caac2a] via-[#d4b942] to-[#fdd835] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-5 h-5 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-0 bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
      
          <div className="order-1 md:order-2 flex w-full h-auto relative group">
            <img
              src={heroImage}
              alt="Students swapping items"
              className="w-full h-auto object-cover rounded-r-2xl md:rounded-l-none md:rounded-r-2xl transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-r-2xl md:rounded-l-none md:rounded-r-2xl">
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div className="text-center">
                    <div className="text-xl font-bold">{currentStats.items.toLocaleString()}+</div>
                    <div className="text-xs opacity-90">Items Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{currentStats.students.toLocaleString()}+</div>
                    <div className="text-xs opacity-90">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{currentStats.universities}+</div>
                    <div className="text-xs opacity-90">Universities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 md:order-1 flex flex-col justify-center p-8 sm:p-12 bg-gradient-to-br from-[#fdd835] to-[#f9c74f] rounded-2xl md:rounded-l-2xl md:rounded-r-none relative">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold leading-snug sm:leading-normal md:leading-tight text-gray-900 mb-2">
                {typedText}
                <span className="inline-block w-1 h-8 md:h-16 bg-[#137C5C] ml-2 animate-pulse"></span>
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-[#137C5C] text-white text-xs rounded-full font-medium">Sustainable</span>
                <span className="px-3 py-1 bg-white/80 text-[#137C5C] text-xs rounded-full font-medium">Save Money</span>
                <span className="px-3 py-1 bg-[#137C5C] text-white text-xs rounded-full font-medium">Community</span>
              </div>

              <p className="text-gray-700 text-sm sm:text-lg md:text-lg leading-relaxed max-w-full sm:max-w-lg mb-8">
                Swap, sell, and donate items with ease. Build a sustainable campus community while saving money and reducing waste.
              </p>

              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="group flex-1 min-w-[120px] px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#137C5C] text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Join Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10634b] to-[#0d5240] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                <Link to="howitworks" spy smooth offset={-70} duration={500}>
                  <button className="group flex-1 min-w-[120px] px-6 py-3 sm:px-8 sm:py-4 rounded-xl border-2 border-[#137C5C] text-[#137C5C] bg-white/90 font-bold hover:bg-[#137C5C] hover:text-white transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                    <span className="flex items-center justify-center gap-2">
                      Learn More
                    </span>
                  </button>
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Verified Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}