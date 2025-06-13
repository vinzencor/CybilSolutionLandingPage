import { contactInfo } from '@/lib/constants';
import { Phone, Mail } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";


export default function ContactSection() {
  return (
    <section className="bg-gray-50 border-t border-gray-200">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-10">
      <div>
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Have questions or ready to start your business journey in the UAE?
          Our team of experts is here to help you every step of the way.
        </p>

        <div className="flex space-x-6">
          {/* WhatsApp Icon */}
          <a
            href={`https://wa.me/${contactInfo.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-80 transition"
          >
            <BsWhatsapp className="h-8 w-8" />
          </a>

          {/* Email Icon */}
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-black hover:opacity-80 transition"
          >
            <Mail className="h-8 w-8" />
          </a>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <img
          src="/business-men-services-pro-pic.png"
          alt="Cybil Solutions"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
        />
      </div>
    </div>

    <div className="mt-6 pt-2 pb-5 border-t border-gray-200 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Copyright © Cybil Solutions | Designed by Emilda Solutions
      </p>
    </div>
  </div>
</section>
  );
}