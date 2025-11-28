import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/HIW1.jpg";
import listImage from "../assets/HIW2.jpg";
import browseImage from "../assets/HIW3.jpg";
import exchangeImage from "../assets/HIW4.jpg";
import meetImage from "../assets/HIW5.jpg";
import rewardsImage from "../assets/HIW6.jpg";

const steps = [
  {
    title: "Sign Up with Student Email",
    text: "Create your account using your university email for verification. Join your campus community instantly.",
    img: signupImage,
    color: "from-blue-500 to-blue-600",
    features: ["University Email Verification", "Instant Account Setup", "Campus Community Access"]
  },
  {
    title: "List Your Items",
    text: "Upload photos and details of books, gadgets, clothes, or other items you want to swap, sell, or donate with smart categorization.",
    img: listImage,
    color: "from-green-500 to-green-600",
    features: ["Smart Photo Upload", "Auto-Categorization", "Price Suggestions"]
  },
  {
    title: "Browse & Connect",
    text: "Search for items you need and connect with other verified students through our secure messaging system and smart matching.",
    img: browseImage,
    color: "from-purple-500 to-purple-600",
    features: ["Smart Search", "Secure Messaging", "Verified Students Only"]
  },
  {
    title: "Choose Exchange Method",
    text: "Decide whether to swap directly, sell for cash, or donate. Set your terms and negotiate with other students safely.",
    img: exchangeImage,
    color: "from-orange-500 to-orange-600",
    features: ["Multiple Exchange Options", "Safe Negotiations", "Flexible Terms"]
  },
  {
    title: "Meet Safely on Campus",
    text: "Arrange meetups at designated safe spots or use our campus delivery agent for convenience and security.",
    img: meetImage,
    color: "from-red-500 to-red-600",
    features: ["Safe Meeting Points", "Campus Delivery", "Security Verified"]
  },
  {
    title: "Complete & Earn Rewards",
    text: "Confirm your transactions, rate your experience, and earn campus points redeemable for discounts and rewards.",
    img: rewardsImage,
    color: "from-yellow-500 to-yellow-600",
    features: ["Transaction Confirmation", "Rating System", "Campus Rewards"]
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleAuthClick = (type) => {
    navigate(`/${type}`);
  };

  return (
    <section ref={sectionRef} id="howitworks" className="bg-gradient-to-br from-[#f0ecdd] via-[#f5f1e4] to-[#faf7ed] py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#137C5C]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#caac2a]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#0b3d2e]/5 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#137C5C]/10 rounded-full text-[#137C5C] font-bold text-sm mb-6 backdrop-blur-sm border border-[#137C5C]/20">
            How It Works
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0b3d2e] mb-6 leading-tight">
            Your Journey to
            <span className="block bg-gradient-to-r from-[#137C5C] to-[#0b3d2e] bg-clip-text text-transparent">
              Sustainable Living
            </span>
          </h2>
          <p className="text-xl text-[#0b3d2e]/80 max-w-3xl mx-auto leading-relaxed">
            Simple, safe, and rewarding. Start your circular economy journey in
            just 6 easy steps and join thousands of students making a difference.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4">
            {/* Progress Bar Background */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-80 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#137C5C] to-[#0f5132] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
              <span className="text-sm font-semibold text-[#137C5C] min-w-[3rem]">
                {activeStep + 1}/{steps.length}
              </span>
            </div>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group relative flex flex-col items-center transition-all duration-500 ${
                    index === activeStep ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div className={`relative w-4 h-4 rounded-full transition-all duration-500 ${
                    index === activeStep
                      ? "bg-[#137C5C] shadow-lg shadow-[#137C5C]/50"
                      : index < activeStep
                      ? "bg-[#137C5C]/70"
                      : "bg-gray-300 group-hover:bg-gray-400"
                  }`}>
                    {index === activeStep && (
                      <>
                        <div className="absolute inset-0 bg-[#137C5C] rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-1 bg-white rounded-full"></div>
                      </>
                    )}
                    {index < activeStep && (
                      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-[#137C5C]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium transition-all duration-300 ${
                    index === activeStep 
                      ? "text-[#137C5C] opacity-100" 
                      : "text-gray-500 opacity-70 group-hover:opacity-100"
                  }`}>
                    Step {index + 1}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Auto-play Controls */}
            <div className="flex items-center justify-center mt-4 gap-3">
              <button 
                onClick={() => setActiveStep(activeStep > 0 ? activeStep - 1 : steps.length - 1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#137C5C] rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-medium">Auto-advancing</span>
              </div>
              
              <button 
                onClick={() => setActiveStep(activeStep < steps.length - 1 ? activeStep + 1 : 0)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`group relative h-80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ${
                i === activeStep
                  ? "transform scale-105 shadow-2xl shadow-[#137C5C]/20 z-10"
                  : "hover:transform hover:scale-102 shadow-xl hover:shadow-2xl"
              }`}
              onClick={() => setActiveStep(i)}
              style={{
                animationDelay: `${i * 150}ms`,
                animation: isVisible ? "slideInUp 0.8s ease-out forwards" : "none"
              }}
            >
              <img
                src={step.img}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  i === activeStep ? "scale-110 brightness-75 blur-sm" : "group-hover:scale-105 filter blur-sm"
                }`}
              />

              <div className={`absolute inset-0 transition-all duration-500 ${
                i === activeStep
                  ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  : "bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80"
              }`}></div>

              <div className={`absolute top-6 left-6 w-12 h-12 bg-white rounded-lg shadow-2xl flex items-center justify-center transition-all duration-500 transform ${
                i === activeStep ? "scale-110 rotate-12 shadow-white/20" : "group-hover:scale-105 hover:rotate-6"
              }`} style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: i === activeStep 
                  ? '0 8px 32px rgba(255,255,255,0.4), inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.05)'
                  : '0 4px 16px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.1)'
              }}>
                <div className={`w-6 h-6 bg-gradient-to-br from-[#137C5C] to-[#0f5132] rounded text-white text-sm font-bold flex items-center justify-center transition-all duration-300 ${
                  i === activeStep ? "shadow-lg" : ""
                }`}>
                  {i + 1}
                </div>
              </div>

              {i === activeStep && (
                <div className="absolute top-6 right-6 w-4 h-4 bg-[#caac2a] rounded-full animate-pulse shadow-lg"></div>
              )}

              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <div className={`transition-all duration-500 ${
                  i === activeStep ? "transform translate-y-0 opacity-100" : "transform translate-y-2 opacity-90"
                }`}>
                  <h4 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-4">
                    {step.text}
                  </p>

                  {i === activeStep && (
                    <div className="mt-4 space-y-2 animate-fadeIn">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-[#caac2a] rounded-full"></div>
                          <span className="text-white/90">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-[#caac2a] to-[#137C5C] transition-all duration-1000 ${
                      i <= activeStep ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div className={`absolute inset-0 border-4 rounded-3xl transition-all duration-300 ${
                i === activeStep
                  ? "border-[#137C5C] shadow-[0_0_30px_rgba(19,124,92,0.3)]"
                  : "border-transparent group-hover:border-white/30"
              }`}></div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="relative bg-gradient-to-r from-[#137C5C] via-[#0f5132] to-[#0b3d2e] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Sustainable Journey?
              </h3>
              <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Join over 25,000 students who are already making a positive impact while saving money and building community connections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="group px-8 py-4 bg-white text-[#137C5C] font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Get Started Today
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#caac2a] to-[#fdd835] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="group px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-[#137C5C] transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-lg">
                    Sign In
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="text-sm font-medium">25K+ Students</div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="text-sm font-medium">150+ Universities</div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Verified Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}