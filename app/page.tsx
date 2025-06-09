'use client'
import Hero from '@/components/hero';
import WhyUAE from '@/components/why-uae';
import ContactForm from '@/components/contact-form';
import Testimonials from '@/components/testimonials';
import ContactSection from '@/components/contact-section';
import { useEffect, useRef, useState } from 'react';
import ConsultationCTA from '@/components/ConsultationCTA';

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
      <Testimonials />
      <ConsultationCTA />
      <section id="contact-section">
        <ContactSection />
      </section>


      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <ContactForm />
          </div>
        </div>

      )}
    </main>
  );
}