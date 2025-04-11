import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-10 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              © {currentYear} Seu Nome. {t('footer.rights')}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#about" 
              className="text-gray-500 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('navbar.about')}
            </a>
            <a 
              href="#projects" 
              className="text-gray-500 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('navbar.projects')}
            </a>
            <a 
              href="#contact" 
              className="text-gray-500 hover:text-primary transition-colors"
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
              {t('navbar.contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
