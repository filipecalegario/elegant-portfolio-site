import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
}

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Fetch projects based on the current language
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Determine the language to use for the projects file
        const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en';
        const basePath = (import.meta.env.BASE_URL as string) || '/';
        const response = await fetch(`${basePath}data/projects_${lang}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to empty array if there's an error
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  if (isLoading) {
    return (
      <section id="projects" className="bg-gray-50">
        <div className="container mx-auto">
          <h2 className="section-heading">{t('projects.title')}</h2>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-heading">{t('projects.title')}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all",
                "transform transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded-md"
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
                    className="text-primary hover:text-primary/80 font-medium flex items-center text-sm"
                  >
                    {t('projects.viewProject')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
