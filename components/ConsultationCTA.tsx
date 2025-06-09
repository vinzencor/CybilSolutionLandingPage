import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ContactForm from './contact-form';

export default function ConsultationCTA() {
    const [open, setOpen] = useState(false);

    return (
        <section className="py-20 bg-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto mb-8">
                Free Expert Guidance for Your Dubai Business Launch
            </h2>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="px-8 py-4 text-lg font-medium bg-[#f2b84b] hover:bg-[#f4d48c]">Book My Free Consultation</Button>
                </DialogTrigger>

                <DialogContent className="max-w-3xl w-full">
                    <ContactForm onSuccess={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </section>
    );
}
