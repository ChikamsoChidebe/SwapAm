import React from "react";
import { Box } from "lucide-react"; // cube icon
import signupImage from "../assets/HIW1.jpg";
import listImage from "../assets/HIW2.jpg";
import browseImage from "../assets/HIW3.jpg";
import exchangeImage from "../assets/HIW4.jpg";
import meetImage from "../assets/HIW5.jpg";
import rewardsImage from "../assets/HIW6.jpg";

const steps = [
  {
    title: "Sign Up with Student ID",
    text: "Create your account using your university email and student ID for verification. Join your campus community.",
    img: signupImage,
  },
  {
    title: "List Your Items",
    text: "Upload photos and details of books, gadgets, clothes, or other items you want to swap, sell, or donate.",
    img: listImage,
  },
  {
    title: "Browse & Connect",
    text: "Search for items you need and connect with other verified students through our secure messaging system.",
    img: browseImage,
  },
  {
    title: "Choose Exchange Method",
    text: "Decide whether to swap directly, sell for cash, or donate. Set your terms and negotiate with other students.",
    img: exchangeImage,
  },
  {
    title: "Meet Safely on Campus",
    text: "Arrange meetups at designated safe spots or use our campus delivery agent for convenience.",
    img: meetImage,
  },
  {
    title: "Complete & Earn Rewards",
    text: "Confirm your transactions, rate your experience, and earn campus points redeemable for discounts.",
    img: rewardsImage,
  },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="bg-[#f0ecdd] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0b3d2e]">
          How Swapam Works
        </h2>
        <p className="text-[#0b3d2e]/80 mt-2 max-w-2xl mx-auto">
          Simple, safe, and rewarding. Start your circular economy journey in
          just 6 easy steps.
        </p>

      
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative h-64 rounded-2xl overflow-hidden group shadow-lg"
            >
             
              <img
                src={step.img}
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              
              <div className="absolute inset-0 bg-black/35 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/25"></div>

              
              <div className="relative z-10 h-full flex flex-col justify-center items-start p-6 text-white text-left space-y-3">
                
                <Box
                  size={26}
                  strokeWidth={3}
                  className="text-white mb-2"
                />

              
                <h4 className="text-xl md:text-2xl font-medium tracking-normal text-white">
                  {step.title}
                </h4>

               
                <p className="text-sm md:text-base text-gray-200 mt-1 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
