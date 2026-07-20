import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const translations = {
  id: {
    // Navbar
    nav_home: 'Beranda',
    nav_about: 'Tentang Jakarta',
    nav_history: 'Sejarah',
    nav_culture: 'Budaya',
    nav_culinary: 'Kuliner',
    nav_quiz: 'NoeQuiz',

    // About section
    about_stat_label: 'Penduduk Kota Jakarta',
    about_heading: 'Jakarta, Kota sejarah & inovasi',
    about_desc:
      'Dari pelabuhan Sunda Kelapa hingga pusat Inovasi digital Asia Tenggara, Jakarta memadukan warisan budaya dan semangat modern untuk masa depan yang lebih baik',
    about_cta: 'Selengkapnya tentang Jakarta',

    // NoeQuiz landing section
    quiz_desc:
      'Selesaikan Tantangan di setiap pos dengan skor minimal 3/5 benar untuk membuka pos selanjutnya. Mari taklukkan semua level!',
    quiz_cta: 'Mainkan NoeQuiz Sekarang !!',
  },
  en: {
    // Navbar
    nav_home: 'Home',
    nav_about: 'About Jakarta',
    nav_history: 'History',
    nav_culture: 'Culture',
    nav_culinary: 'Culinary',
    nav_quiz: 'NoeQuiz',

    // About section
    about_stat_label: 'Jakarta City Population',
    about_heading: 'Jakarta, City of history & innovation',
    about_desc:
      'From the port of Sunda Kelapa to Southeast Asia\'s digital innovation hub, Jakarta blends cultural heritage with a modern spirit for a better future.',
    about_cta: 'Learn more about Jakarta',

    // NoeQuiz landing section
    quiz_desc:
      'Complete the challenge at each station with a minimum score of 3/5 correct to unlock the next station. Let\'s conquer all levels!',
    quiz_cta: 'Play NoeQuiz Now !!',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));

  const t = (key) => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
