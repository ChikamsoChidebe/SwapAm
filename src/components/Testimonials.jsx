import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "I love how Swapam makes it easy to exchange items I no longer use. I swapped my old blender for a new desk lamp — smooth and fun!",
    name: "Aisha K.",
    role: "University of Cape Town",
  },
  {
    quote:
      "As a lecturer, I had lab gear gathering dust. Through Swapam, I exchanged them with students who truly needed them.",
    name: "Dr. Kenneth M.",
    role: "University of Ibadan",
  },
  {
    quote:
      "I swapped my old phone for a pair of headphones. Swapam helps me declutter and save money at the same time. Love it!",
    name: "Sophie L.",
    role: "University of Toronto",
  },
  {
    quote:
      "Swapam connects people in the most resourceful way. I exchanged some textbooks — and made a new friend in the process.",
    name: "Chidera O.",
    role: "University of Nigeria",
  },
  {
    quote:
      "This isn’t just swapping; it’s sustainable living. I’ve exchanged clothes, shoes, and even a mini fridge through Swapam.",
    name: "David L.",
    role: "University of Accra",
  },
];

const TestimonialCard = ({ quote, name, role, highlight, tilt }) => (
  <div
    className={`p-6 rounded-xl text-center w-[90%] sm:w-72 transition-all duration-300 ${
      highlight
        ? "bg-yellow-400 text-black shadow-xl scale-105 z-10"
        : "bg-green-700 text-green-200 opacity-70"
    } ${tilt === "left" ? "-rotate-6" : tilt === "right" ? "rotate-6" : ""}`}
  >
    <p className="text-sm italic leading-relaxed mb-4">“{quote}”</p>
    <div className="font-semibold">{name}</div>
    <div className="text-xs">{role}</div>
  </div>
);


export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const prev = (index - 1 + testimonials.length) % testimonials.length;
  const next = (index + 1) % testimonials.length;

  return (
    <section
      id="testimonials"
      className="py-20 bg-green-900 text-center text-white relative overflow-hidden"
    >
      <h3 className="text-2xl font-bold mb-12" >What Our Clients Say</h3>
    

      {/* --- Desktop View --- */}
      <div className="hidden sm:flex items-center justify-center gap-6 transition-all duration-500">
        <TestimonialCard {...testimonials[prev]} tilt="left" />
        <TestimonialCard {...testimonials[index]} highlight />
        <TestimonialCard {...testimonials[next]} tilt="right" />
      </div>

      {/* --- Mobile View  --- */}
      <div className="flex sm:hidden flex-col items-center justify-center px-6">
        <TestimonialCard {...testimonials[index]} highlight />
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={prevSlide}
            className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

     
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-10 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-10 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
