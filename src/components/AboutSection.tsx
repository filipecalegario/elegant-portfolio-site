
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

const AboutSection = ({
  name = "Seu Nome",
  title = "Professor & Pesquisador",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo nec urna feugiat vestibulum. Nulla facilisi. Etiam ut lectus ac arcu vestibulum vestibulum. Phasellus euismod, mauris id commodo maximus, felis arcu lacinia erat, vitae commodo nunc orci id justo.",
  imageUrl = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=400&h=500"
}: AboutSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('about');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className={cn(
            "w-full md:w-1/3 transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3"></div>
              <img 
                src={imageUrl} 
                alt={name} 
                className="relative w-full rounded-2xl object-cover aspect-[3/4] shadow-lg"
              />
            </div>
          </div>
          
          <div className={cn(
            "w-full md:w-2/3 transition-all duration-700 delay-300 transform",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">{name}</h2>
            <h3 className="text-xl md:text-2xl text-primary mb-6">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {description}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#contact" 
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Entre em contato
              </a>
              <a 
                href="#publications" 
                className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('publications');
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Ver publicações
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
