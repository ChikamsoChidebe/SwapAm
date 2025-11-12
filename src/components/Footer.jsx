import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-10">
 
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">
        
        
        <div className="md:col-span-1">
          <h4 className="text-2xl font-bold text-gray-900">Swapam</h4>
          <p className="mt-3 text-sm text-gray-600 max-w-xs">
            Turn campus waste into student wealth — swap, sell, donate.
          </p>
        </div>

        
        <div className="grid grid-cols-2 gap-6 md:contents">
         
          <div className="md:col-span-1">
            <h5 className="text-lg font-semibold text-gray-900 mb-3">Quick links</h5>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer">About us</li>
              <li className="hover:text-primary cursor-pointer">How it works</li>
              <li className="hover:text-primary cursor-pointer">Campus impact</li>
              <li className="hover:text-primary cursor-pointer">Community</li>
            </ul>
          </div>

      
          <div className="md:col-span-1">
            <h5 className="text-lg font-semibold text-gray-900 mb-3">Support</h5>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer">FAQ</li>
              <li className="hover:text-primary cursor-pointer">Help center</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
              <li className="hover:text-primary cursor-pointer">Careers</li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-1">
          <h5 className="text-lg font-semibold text-gray-900 mb-3">Stay connected</h5>

          <form className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white border rounded-lg overflow-hidden w-full">
            <input
              type="email"
              placeholder="Email address"
              className="w-full sm:flex-1 px-4 py-2 text-sm outline-none min-w-0"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition"
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 mt-5 text-gray-600">
            <FaFacebookF className="cursor-pointer hover:text-primary" />
            <FaInstagram className="cursor-pointer hover:text-primary" />
            <FaXTwitter className="cursor-pointer hover:text-primary" />
            <FaLinkedinIn className="cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>

    
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Swapam. All rights reserved.</p>
          <div className="flex gap-3 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy policy</a>
            <span>·</span>
            <a href="#" className="hover:text-primary">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
