import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const currentLanguage = i18n.language?.startsWith('pt') ? 'pt' : 'en';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2 py-1">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline ml-1 text-sm">
            {currentLanguage === 'en' ? 'EN' : 'PT'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? 'bg-secondary font-medium' : ''}
        >
          {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('pt')}
          className={currentLanguage === 'pt' ? 'bg-secondary font-medium' : ''}
        >
          {t('language.pt')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher; 