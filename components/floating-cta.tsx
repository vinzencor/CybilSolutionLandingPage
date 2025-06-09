"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl p-6 w-72 animate-in slide-in-right">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Contact Us</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Get a free consultation about setting up your business in the UAE.
          </p>
          
          {/* <div className="space-y-3">
            <Button className="gold-btn w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Book Consultation
            </Button>
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Button 
            className="gold-btn rounded-full h-14 w-14 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}