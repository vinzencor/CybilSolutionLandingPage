"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type ContactFormProps = {
  onSuccess?: () => void;
};

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
];

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+971');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;

    const cleanData = {
      firstName: form.firstName.value.trim(),
      email: form.email.value.trim(),
      phone: `${countryCode} ${form.phone.value.trim()}`,
      description: form.description.value.trim(), 
    };

    const phone = `'${cleanData.phone}`;  

    const data = {
      firstName: cleanData.firstName,
      email: cleanData.email,
      phone: phone,
      description: cleanData.description,
    };


    try {
      const res = await fetch("https://sheetdb.io/api/v1/xs57v33d00wiy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const result = await res.json();
      if (res.ok && result?.created) {
        toast({
          title: "Form submitted successfully!",
          description: "We'll contact you shortly to discuss your business needs.",
        });
        form.reset();
        setFormSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      toast({
        title: "Error submitting form!",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-4 sm:py-6 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full px-3 sm:px-4">
        {formSubmitted ? (
          <div className="text-center p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold">Thank you!</h3>
            <p className="mt-1 text-xs sm:text-sm">
              We'll contact you shortly to discuss your business needs.
            </p>
          </div>
        ) : (
          <>
            <h2 className="section-title text-center mb-1 text-sm sm:text-base">Need Help?</h2>
            <p className="text-center text-xs sm:text-sm mb-3 sm:mb-4">
              Get a Callback in just a Minute. Just drop your number below!
            </p>

            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Name Field */}
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-xs font-medium">
                    Name *
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Enter your full name"
                    required
                    className="text-sm h-9"
                  />
                </div>

                {/* Email and Phone Fields - Responsive Grid */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-medium">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="text-sm h-9"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-medium">
                      Phone Number *
                    </label>
                    <div className="flex space-x-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-1/4 text-xs h-9">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map(({ code, country }) => (
                            <SelectItem key={code} value={code} className="text-xs">
                              {country} ({code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        required
                        className="w-3/4 text-sm h-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div className="space-y-1">
                  <label htmlFor="description" className="text-xs font-medium">
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    placeholder="Additional details or questions"
                    className="w-full h-16 p-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="gold-btn w-full py-2 text-sm font-medium hover:bg-[#f5d88a] transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get a Call Now"}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}