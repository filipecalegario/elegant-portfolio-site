import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  name: string;
  code?: string;
  semester: string;
  description?: string;
  image?: string;
}

const TeachingSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Observe section visibility for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('teaching');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Usar import.meta.env.BASE_URL para obter o caminho base configurado no vite
        const basePath = (import.meta.env.BASE_URL as string) || '/';
        const response = await fetch(`${basePath}courses.json`);
        if (!response.ok) {
          throw new Error('Failed to load courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Não foi possível carregar as disciplinas. Usando dados de exemplo.');
        // Use sample data if fetch fails
        setCourses(sampleCourses);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Sample courses as fallback
  const sampleCourses: Course[] = [
    {
      id: 'cs101',
      name: 'Introdução à Ciência da Computação',
      code: 'CS101',
      semester: '2024.1',
      description: 'Fundamentos e conceitos básicos de ciência da computação.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'ds201',
      name: 'Estrutura de Dados',
      code: 'DS201',
      semester: '2024.1',
      description: 'Implementação e análise de estruturas de dados.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'ai301',
      name: 'Inteligência Artificial',
      code: 'AI301',
      semester: '2023.2',
      description: 'Fundamentos de IA, machine learning e aplicações.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'net401',
      name: 'Redes de Computadores',
      code: 'NET401',
      semester: '2023.2',
      description: 'Arquitetura e protocolos de redes.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <section id="teaching" className="bg-white">
      <div className="container mx-auto">
        <h2 className="section-heading">Ensino</h2>
        
        <div className={cn(
          "transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div 
                  key={course.id}
                  className={cn(
                    "bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all",
                    "transform transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    `delay-[${index * 100}ms]`
                  )}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=300`} 
                      alt={course.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                      <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-2 rounded">
                        {course.semester}
                      </span>
                    </div>
                    {course.code && <p className="text-sm text-gray-500 mb-3">Código: {course.code}</p>}
                    {course.description && <p className="text-gray-600 mt-2">{course.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeachingSection;
