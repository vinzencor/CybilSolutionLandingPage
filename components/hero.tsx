"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { contactInfo, heroContent } from '@/lib/constants';
import { BsWhatsapp } from 'react-icons/bs';
import { X } from 'lucide-react';
import ContactForm from './contact-form';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popup when clicking outside
  interface PopupBackdropClickEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> { }

  const handlePopupBackdropClick = (e: PopupBackdropClickEvent) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  // Close popup on escape key
  useEffect(() => {
    interface EscapeKeyEvent extends KeyboardEvent {
      key: string;
    }

    const handleEscape = (e: EscapeKeyEvent) => {
      if (e.key === 'Escape') {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Overlay & Background */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          backgroundPosition: "center 20%",
        }}
      ></div>

      {/* Header - Responsive */}
      <header
        className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300
    ${scrolled
            ? 'bg-transparent backdrop-blur-sm shadow-md py-1 w-[90%] sm:w-[80%] lg:w-[75%] max-w-5xl'
            : 'bg-white py-2 w-[95%] sm:w-[90%] max-w-screen-xl'}
    rounded-[30px] sm:rounded-[50px] lg:rounded-[70px]`}
      >
        <div className="container mx-auto px-3 sm:px-6 flex justify-between items-center h-10 sm:h-12">
          <div className="flex items-center gap-2 pt-1 sm:pt-2.5">
            <img
              src="/business-men-services-pro-pic.png"
              alt="Cybil Solutions"
              className="h-[120px] w-[140px] sm:h-[150px] sm:w-[170px] lg:h-[180px] lg:w-[200px]"
            />
          </div>

          <Button
            className="gold-btn hover:bg-white flex items-center justify-center p-2 sm:p-3"
            onClick={() => {
              const el = document.getElementById("contact-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <a
              href={`https://wa.me/${contactInfo.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <BsWhatsapp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Content + Contact Form - Responsive Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
        {/* Hero Content + Contact Form - Responsive Layout */}
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
  <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
    {/* Hero Text - Responsive */}
    <div className="w-full xl:w-1/2 max-w-2xl slide-up pt-16 sm:pt-20 lg:pt-24">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
        {heroContent.title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed">
        {heroContent.subtitle}
      </p>

      {/* Trust Badges - Responsive */}
      <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 items-center mb-8">
        {heroContent.trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-[#f2b84b] rounded-full mr-2"></div>
            <span className="text-xs sm:text-sm font-medium">{badge}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Contact Form - Responsive positioning */}
    <div className="w-full xl:w-[400px] 2xl:w-[450px] xl:ml-auto mt-8 xl:mt-0 rounded-xl overflow-hidden shadow-md text-black" id="contact-section">
      <ContactForm />
    </div>
  </div>

  {/* Button Below Content */}
  <div className="mt-8 flex justify-center">
    <Button
      onClick={() => setShowPopup(true)}
      className="bg-[#f2b84b] hover:bg-[#e6a835] text-black font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      Book a Free Consultation
    </Button>
  </div>
</div>

      </div>

      {/* New Div with Centered Button */}
      

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handlePopupBackdropClick}
        >
          <div className="relative bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in duration-300 zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            {/* Contact Form in Popup */}
            <div className="text-black">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </section>

  );
}