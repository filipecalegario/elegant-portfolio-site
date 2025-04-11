
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

const AboutSection = ({
  name = "Filipe Calegario",
  title = "Assistant Professor",
  description = `Filipe Calegario is an Assistant Professor at the Center for Informatics (CIn) at the Federal University of Pernambuco (UFPE). His research explores the fields of computational creativity, generative AI, and human–AI interaction.

He previously worked as an industrial researcher at the SENAI Institute for Innovation in Information and Communication Technologies. He holds a Ph.D. in Computer Science from UFPE and, in 2015, completed a research internship in music technology at McGill University (Canada) as part of a sandwich Ph.D. program.

Calegario is a co-founder of Batebit Artesania Digital, a creative lab dedicated to the design and development of experimental interfaces and interactive installations. He is also a member of MusTIC, the art and technology research group at CIn-UFPE, and currently leads GERAIA, the CIn-UFPE research group focused on generative AI applications.

He has presented his work at numerous events exploring the intersection of art and technology, including Recife: The Playable City, FILE – International Electronic Language Festival, Festival de Arte Digital (FAD), Continuum, and Interactivos?.

In both 2014 and 2018, he was awarded grants from Rumos Itaú Cultural to develop the Tocada musical app and the Probatio prototyping toolkit.`,
  imageUrl = "https://www.cin.ufpe.br/~fcac/IMG_4344_copy1_quad2_reduzido.jpg"
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
