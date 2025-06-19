'use client'
import Hero from '@/components/hero';
import WhyUAE from '@/components/why-uae';
import ContactForm from '@/components/contact-form';
import Testimonials from '@/components/testimonials';
import ContactSection from '@/components/contact-section';
import { useEffect, useRef, useState } from 'react';
import ConsultationCTA from '@/components/ConsultationCTA';

// Add this to extend the Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Google Tag code
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-10924580739";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'AW-10924580739');
    };

    return () => {
      // Cleanup: remove the script tag when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const clickedInsideModal = modalRef.current?.contains(target);
      const clickedInsidePortal = target.closest('[data-portal], [data-radix-popper-content-wrapper]');

      if (!clickedInsideModal && !clickedInsidePortal) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <main className="min-h-screen">
      <Hero />
      <WhyUAE />
      {/* <Testimonials /> */}
      <ConsultationCTA />
      <section id="contact-section">
        <ContactSection />
      </section>

      {/* Modal Overlay - Responsive */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            ref={modalRef}
            className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-black text-xl sm:text-2xl z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md transition-colors duration-200"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="pt-8 sm:pt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
