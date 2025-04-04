
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
}

const ProjectsSection = () => {
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
    
    const element = document.getElementById('projects');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  // Sample projects
  const projects: Project[] = [
    {
      id: 'project1',
      title: 'Análise de Dados Educacionais',
      description: 'Utilizando técnicas de machine learning para analisar padrões de aprendizado em ambientes educacionais online.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
      tags: ['Machine Learning', 'Python', 'Educação']
    },
    {
      id: 'project2',
      title: 'Sistema de Recomendação Acadêmica',
      description: 'Desenvolvimento de um sistema que recomenda materiais de estudo personalizados baseados no perfil do aluno.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500',
      tags: ['Algoritmos', 'Sistemas de Recomendação', 'JavaScript'],
      url: '#'
    },
    {
      id: 'project3',
      title: 'Aplicativo de Gerenciamento de Pesquisa',
      description: 'Ferramenta para auxiliar pesquisadores a organizar seus projetos, referências e publicações acadêmicas.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500',
      tags: ['Mobile', 'React Native', 'Produtividade'],
      url: '#'
    },
    {
      id: 'project4',
      title: 'Biblioteca de Computação Científica',
      description: 'Desenvolvimento de uma biblioteca open-source para operações matemáticas complexas e visualização de dados científicos.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500',
      tags: ['Open Source', 'C++', 'Computação Científica'],
      url: '#'
    }
  ];

  return (
    <section id="projects" className="bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-heading">Projetos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all",
                "transform transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    Ver projeto
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
