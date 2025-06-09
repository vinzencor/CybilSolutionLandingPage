"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { heroContent } from '@/lib/constants';
import { FaWhatsapp } from "react-icons/fa";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center">
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          backgroundPosition: "center 20%"
        }}
      ></div>

      <header
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300
  ${scrolled
            ? 'bg-transparent backdrop-blur-sm shadow-md py-1 w-[75%] max-w-5xl'
            : 'bg-white py-2 w-[95%] max-w-screen-xl'}
  rounded-[70px]`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center h-12">
          <div className="flex items-center gap-2 pt-2.5">
            <img
              src="/business-men-services-pro-pic.png"
              alt="Cybil Solutions"
              className="h-[180px] w-[200px]"
            />

          </div>

          <Button
            className="gold-btn hover:bg-white hidden md:flex"
            onClick={() => {
              const el = document.getElementById("contact-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contact Us
          </Button>

        </div>
      </header>




      <div className="container mx-auto px-4 relative z-20 text-white">
        <div className="max-w-2xl slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {heroContent.subtitle}
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="gold-btn text-lg px-8 py-6 hover:bg-white">
              {heroContent.primaryCTA}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border rounded-full transition-all border-white text-white hover:bg-white text-lg px-8 py-6 flex items-center"
            >
              <FaWhatsapp className="mr-2 h-5 w-5" />
              {heroContent.secondaryCTA}
            </Button>
          </div> */}


          <div className="flex flex-wrap gap-6 items-center">
            {heroContent.trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#f2b84b] rounded-full mr-2"></div>
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}