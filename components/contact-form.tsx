

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type ContactFormProps = {
  onSuccess?: () => void;
};
export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;

    const data = {
      firstName: form.firstName.value,
      email: form.email.value,
      phone: form.phone.value,
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
        setBusinessType("");
        setFormSubmitted(true);
        if (onSuccess) onSuccess();
      }
      else {
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

    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {formSubmitted ? (
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold">Thank you!</h3>
              <p className="mt-2">
                We'll contact you shortly to discuss your business needs.
              </p>
            </div>
          ) : (
            <>
              <h2 className="section-title">Need Help?</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Get a Callback in just a Minute.
                Just drop your number below!
              </p>

              <div className="mt-8 bg-white p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      Name *
                    </label>
                    <Input id="firstName" placeholder="Enter your full name" required />
                  </div>

                  {/* Email and Phone Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </label>
                      <Input id="phone" placeholder="+971 XX XXX XXXX" required />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="gold-btn w-full py-6 text-lg font-medium"
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
      </div>
    </section>
  );
}