import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "howitworks", label: "HOW IT WORKS" },
    { id: "impact", label: "IMPACT" }
  ];

  const handleAuthClick = (type) => {
    navigate(`/${type}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div
        className={`absolute inset-0 transition-all duration-300 z-0 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
            : "bg-gradient-to-r from-[#CAAC2A]/95 to-[#d4b942]/95 backdrop-blur-sm"
        }`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-4 mt-2 transition-all duration-300 ${
            isScrolled
              ? "bg-white/30 backdrop-blur-sm shadow-sm border border-white/20"
              : "bg-white/10 backdrop-blur-sm shadow-md border border-white/20"
          }`}
        >
          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                spy
                smooth
                offset={-80}
                duration={500}
                onSetActive={() => setActiveSection(item.id)}
                className={`group relative px-4 py-2 rounded-xl font-semibold cursor-pointer transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-[#137C5C] text-white shadow-lg"
                    : isScrolled
                    ? "text-[#1a1a1a] hover:bg-[#137C5C]/10 hover:text-[#137C5C]"
                    : "text-[#1a1a1a] hover:bg-white/20 hover:text-[#0f5132]"
                }`}
              >
                <span className="text-sm">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#fdd835] rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleAuthClick('login')}
              className={`group px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                isScrolled
                  ? "text-[#137C5C] border-[#137C5C] hover:bg-[#137C5C] hover:text-white"
                  : "text-[#0f5132] border-[#0f5132] bg-white/80 hover:bg-white hover:shadow-md"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleAuthClick('signup')}
              className="group px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#137C5C] to-[#0f5132] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Sign Up Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f5132] to-[#0a3d2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isOpen 
                  ? "bg-[#137C5C] text-white" 
                  : isScrolled 
                  ? "bg-white/20 text-[#1a1a1a] hover:bg-white/40" 
                  : "bg-white/10 text-[#1a1a1a] hover:bg-white/20"
              }`}
            >
              {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-30">
          <div
            className={`mx-4 mt-2 rounded-2xl shadow-2xl border transition-all duration-300 ${
              isScrolled
                ? "bg-white/95 backdrop-blur-md border-gray-200/50"
                : "bg-white/95 backdrop-blur-md border-white/20"
            }`}
          >
            <nav className="p-6">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    key={item.id}
                    onClick={() => setIsOpen(false)}
                    to={item.id}
                    spy
                    smooth
                    offset={-80}
                    duration={500}
                    className="group flex items-center gap-4 p-4 rounded-xl cursor-pointer text-[#1a1a1a] hover:bg-[#137C5C] hover:text-white transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="font-semibold">{item.label}</span>
                    <span className="ml-auto text-[#137C5C] group-hover:text-white transition-colors duration-300">→</span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="w-full p-4 rounded-xl border-2 border-[#137C5C] text-[#137C5C] font-semibold hover:bg-[#137C5C] hover:text-white transition-all duration-300"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-[#137C5C] to-[#0f5132] text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Sign Up Free
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}