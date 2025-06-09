"use client";

import { useRef, useEffect } from 'react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';
import CountUp from 'react-countup';
import { businessStats } from '@/lib/constants';


export default function WhyUAE() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="h-10 w-10 text-[#f2b84b]" />;
      case 'TrendingUp':
        return <TrendingUp className="h-10 w-10 text-[#f2b84b]" />;
      case 'Briefcase':
        return <Briefcase className="h-10 w-10 text-[#f2b84b]" />;
      default:
        return <Users className="h-10 w-10 text-[#f2b84b]" />;
    }
  };

  return (
    <section
      id="why-uae"
      ref={sectionRef}
      className="py-20 bg-gray-50 opacity-100 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">Why Choose Cybil Solutions?</h2>
        <p className="section-subtitle max-w-3xl mx-auto">
          We combine expertise, transparency, and personalized service to make your business setup journey smooth
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center">
          {businessStats.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-6 border rounded-lg bg-white shadow-sm">
              <div className="mb-4 p-4 bg-primary/5 rounded-full">
                {getIcon(item.icon)}
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {item.value !== null ? (
                  <>
                    <CountUp end={item.value} duration={2} />{item.suffix}
                  </>
                ) : (
                  "✓"
                )}
              </div>
              <p className="text-lg font-medium text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}