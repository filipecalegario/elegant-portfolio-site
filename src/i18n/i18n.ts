import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly
const enTranslation = {
  navbar: {
    about: 'About',
    publications: 'Publications',
    teaching: 'Teaching',
    projects: 'Projects',
    contact: 'Contact'
  },
  about: {
    title: 'About Me',
    description: 'Professional profile and background information',
    contactButton: 'Contact Me',
    publicationsButton: 'View Publications'
  },
  publications: {
    title: 'Publications',
    description: 'Academic and professional publications'
  },
  teaching: {
    title: 'Teaching',
    description: 'Courses and educational materials'
  },
  projects: {
    title: 'Projects',
    description: 'Professional and personal projects',
    viewProject: 'View Project'
  },
  contact: {
    title: 'Contact',
    description: 'Interested in academic collaborations or want to get in touch? Feel free to contact me through the channels below.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message'
  },
  footer: {
    rights: 'All rights reserved'
  },
  language: {
    select: 'Select language',
    en: 'English',
    pt: 'Portuguese'
  }
};

const ptTranslation = {
  navbar: {
    about: 'Sobre',
    publications: 'Publicações',
    teaching: 'Ensino',
    projects: 'Projetos',
    contact: 'Contato'
  },
  about: {
    title: 'Sobre Mim',
    description: 'Perfil profissional e informações de background',
    contactButton: 'Entre em Contato',
    publicationsButton: 'Ver Publicações'
  },
  publications: {
    title: 'Publicações',
    description: 'Publicações acadêmicas e profissionais'
  },
  teaching: {
    title: 'Ensino',
    description: 'Cursos e materiais educacionais'
  },
  projects: {
    title: 'Projetos',
    description: 'Projetos profissionais e pessoais',
    viewProject: 'Ver Projeto'
  },
  contact: {
    title: 'Contato',
    description: 'Interessado em colaborações acadêmicas ou gostaria de entrar em contato? Fique à vontade para me contatar através dos canais abaixo.',
    name: 'Nome',
    email: 'Email',
    message: 'Mensagem',
    send: 'Enviar Mensagem'
  },
  footer: {
    rights: 'Todos os direitos reservados'
  },
  language: {
    select: 'Selecionar idioma',
    en: 'Inglês',
    pt: 'Português'
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: enTranslation
      },
      pt: {
        translation: ptTranslation
      }
    }
  });

export default i18n; 