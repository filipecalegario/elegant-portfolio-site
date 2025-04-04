
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface PublicationEntry {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: string;
  doi?: string;
  url?: string;
}

const PublicationsSection = () => {
  const [publications, setPublications] = useState<PublicationEntry[]>([]);
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
    
    const element = document.getElementById('publications');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBibFile = async () => {
      try {
        const response = await fetch('/references.bib');
        if (!response.ok) {
          throw new Error('Failed to load publications');
        }
        const bibText = await response.text();
        const parsedPublications = parseBibTeX(bibText);
        setPublications(parsedPublications);
      } catch (err) {
        console.error('Error loading publications:', err);
        setError('Não foi possível carregar as publicações. Usando dados de exemplo.');
        // Use sample data if fetch fails
        setPublications(samplePublications);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibFile();
  }, []);

  // Simple BibTeX parser (this is a simplified version)
  const parseBibTeX = (bibText: string): PublicationEntry[] => {
    const entries: PublicationEntry[] = [];
    const entryRegex = /@(\w+)\s*{\s*([^,]+),([^@]+)/g;
    const fieldRegex = /\s*(\w+)\s*=\s*{([^}]*)}/g;

    let match;
    while ((match = entryRegex.exec(bibText)) !== null) {
      const type = match[1];
      const id = match[2].trim();
      const fieldsText = match[3];
      
      const entry: any = { id, type };
      
      let fieldMatch;
      while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
        const fieldName = fieldMatch[1].toLowerCase();
        const fieldValue = fieldMatch[2].trim();
        entry[fieldName] = fieldValue;
      }
      
      // Process authors
      if (entry.author) {
        entry.authors = entry.author.split(' and ').map((author: string) => author.trim());
        delete entry.author;
      } else {
        entry.authors = [];
      }
      
      entries.push(entry as PublicationEntry);
    }
    
    return entries;
  };

  // Format publication in ABNT style
  const formatABNT = (pub: PublicationEntry): string => {
    const formatAuthors = (authors: string[]) => {
      if (authors.length === 0) return '';
      if (authors.length === 1) return authors[0].toUpperCase() + '.';
      
      const lastAuthor = authors.pop();
      return authors.map(a => a.toUpperCase()).join('; ') + '; ' + lastAuthor!.toUpperCase() + '.';
    };
    
    const authors = formatAuthors(pub.authors);
    const title = pub.title.endsWith('.') ? pub.title : pub.title + '.';
    
    if (pub.journal) {
      return `${authors} ${title} ${pub.journal}, ${pub.year}.${pub.doi ? ` DOI: ${pub.doi}` : ''}`;
    } else if (pub.conference) {
      return `${authors} ${title} In: ${pub.conference}, ${pub.year}.${pub.doi ? ` DOI: ${pub.doi}` : ''}`;
    } else {
      return `${authors} ${title} ${pub.year}.${pub.doi ? ` DOI: ${pub.doi}` : ''}`;
    }
  };

  // Sample publications as fallback
  const samplePublications: PublicationEntry[] = [
    {
      id: 'smith2022',
      title: 'Advances in modern computing architectures',
      authors: ['Smith, John', 'Doe, Jane'],
      journal: 'Journal of Computer Science',
      year: '2022',
      doi: '10.1000/xyz123'
    },
    {
      id: 'brown2021',
      title: 'Machine learning applications in healthcare',
      authors: ['Brown, Robert', 'Johnson, Emily', 'Williams, David'],
      conference: 'International Conference on AI in Medicine',
      year: '2021',
      doi: '10.1001/jama.2021.123456'
    },
    {
      id: 'garcia2023',
      title: 'Deep learning approaches for natural language processing',
      authors: ['Garcia, Maria'],
      journal: 'Computational Linguistics Journal',
      year: '2023',
      doi: '10.1002/cl.20230101'
    }
  ];

  return (
    <section id="publications" className="bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-heading">Publicações</h2>
        
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
            <ul className="space-y-4 list-disc pl-5">
              {publications.map((pub) => (
                <li 
                  key={pub.id}
                  className="text-gray-800 leading-relaxed"
                >
                  <p>{formatABNT(pub)}</p>
                  
                  {(pub.doi || pub.url) && (
                    <div className="mt-1 ml-2 text-sm">
                      {pub.doi && (
                        <a 
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline inline-flex items-center mr-4"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                          DOI
                        </a>
                      )}
                      {pub.url && (
                        <a 
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-primary text-sm hover:underline inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                          Link
                        </a>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
