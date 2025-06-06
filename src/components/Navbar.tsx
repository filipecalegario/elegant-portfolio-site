import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 20);

      // Find active section
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        // Cast section to HTMLElement to access offsetTop property
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'about', label: t('navbar.about') },
    { id: 'publications', label: t('navbar.publications') },
    { id: 'teaching', label: t('navbar.teaching') },
    { id: 'projects', label: t('navbar.projects') },
    { id: 'contact', label: t('navbar.contact') }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <a 
          href="#" 
          className="text-xl md:text-2xl font-bold transition-colors hover:text-primary/80"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {t('navbar.name')}
        </a>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher />
          <button 
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary/80",
                  activeSection === item.id 
                    ? "text-primary after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-primary after:rounded-full" 
                    : "text-foreground/80"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>

        {/* Mobile navigation */}
        <div className={cn(
          "absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 md:hidden overflow-hidden",
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        )}>
          <nav className="flex flex-col space-y-4 container mx-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "py-2 px-4 text-left rounded-md transition-colors",
                  activeSection === item.id 
                    ? "bg-secondary text-primary font-medium" 
                    : "text-foreground/80 hover:bg-secondary/50"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
