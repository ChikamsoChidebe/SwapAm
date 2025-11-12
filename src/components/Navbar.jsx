import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
     
      <div
        className={`absolute inset-0 transition-all duration-100 z-0 ${
          isScrolled
            ? "bg-white/95 border-transparent shadow-none"
            : "bg-[#CAAC2A]/95"
        }`}
      ></div>

     
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-2">
        <div
          className={`flex items-center justify-between rounded-xl px-6 py-3 mt-3 transition-all duration-100 ${
            isScrolled
              ? "bg-white/20 shadow-none border border-transparent"
              : "bg-[#d8b93e] shadow-sm border border-[#d8b93e]/20"
          }`}
        >
         
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#137C5C] flex items-center justify-center text-white font-semibold text-lg">
              S
            </div>
            <span className="text-lg font-semibold text-[#1a1a1a]">Swapam</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["home", "about", "howitworks", "impact"].map((section) => (
              <Link
                key={section}
                to={section}
                spy
                smooth
                offset={-80}
                duration={100}
                className={`font-medium cursor-pointer transition-colors duration-300 ${
                  isScrolled
                    ? "text-[#1a1a1a] hover:text-[#0f5132]"
                    : "text-[#1a1a1a] hover:text-[#0f5132]"
                }`}
              >
                {section.toUpperCase()}
              </Link>
            ))}
          </nav>

         
          <div className="hidden md:flex items-center gap-3">
            <button
              className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all duration-300 ${
                isScrolled
                  ? "text-[#0f5132] border-[#0f5132]/30 hover:bg-[#f4f4f4]"
                  : "text-[#0f5132] border-[#0f5132]/30 hover:bg-[#f9f1c5]"
              }`}
            >
              Login
            </button>
            <button
              className={`px-4 py-1.5 rounded-md text-sm font-medium shadow-sm transition-all duration-300 ${
                isScrolled
                  ? "bg-[#137C5C] text-[#ffffff] hover:bg-[#7ec376]"
                  : "bg-[#137C5C] text-[#ffffff] hover:bg-[#7ec376]"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1a1a1a] focus:outline-none z-20"
            >
              {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
     {isOpen && (
  <div
    className={`md:hidden border-t shadow-md transition-all duration-100 relative z-20 ${
      isScrolled
        ? "bg-white/80 border-[#e0e0e0]"
        : "bg-[#CAAC2A] border-[#d8b93e]/40"
    }`}
  >

        
          <nav className="flex flex-col px-6 py-4 gap-4">
            {["home", "about", "howitworks", "impact"].map((section) => (
              <Link
                key={section}
                onClick={() => setIsOpen(false)}
                to={section}
                spy
                smooth
                offset={-80}
                duration={400}
                className="cursor-pointer text-[#0f5132] hover:text-[#CAAC2A] font-medium transition"
              >
                {section.toUpperCase()}
              </Link>
            ))}

          
          </nav>
        </div>
      )}
    </header>
  );
}
