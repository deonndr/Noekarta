import { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { allKulinerData } from '../data/kuliner';
import { useInventory } from '../hooks/useInventory';
import { useLanguage } from '../context/LanguageContext';

import component1 from '../assets/components/component1.webp';

const kulinerData = allKulinerData.slice(0, 6);

/* Bookmark Icon SVG */
const BookmarkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const KulinerJakarta = () => {
  const { savedItems, toggleSave } = useInventory();
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);


  return (
    <section ref={sectionRef} className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-4 mb-10 relative flex flex-col justify-center h-full">
       

            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-gray-900 mb-6 leading-tight tracking-tight font-ancizar">
              {t('kuliner_heading')}
            </h2>
            <p className="text-gray-700 text-xl lg:text-2xl mb-10 max-w-md">
              {t('kuliner_sub')}
            </p>

            <Link to="/kuliner" className="bg-[#0f285e] hover:bg-[#0a1b40] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center w-fit gap-2 transition-colors">
              {t('kuliner_cta')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* component1 decorations */}
            <div className="hidden lg:block absolute -bottom-1 left-5 w-[80px] h-[80px]">
              <motion.img
                src={component1}
                alt="Decoration"
                className="w-full h-full object-contain select-none opacity-50"
                whileInView={{ y: [0, -15, 0] }}
                viewport={{ once: false }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="hidden lg:block absolute -bottom-10 left-40 w-[60px] h-[60px]">
              <motion.img
                src={component1}
                alt="Decoration"
                className="w-full h-full object-contain select-none opacity-50"
                whileInView={{ y: [0, 20, 0] }}
                viewport={{ once: false }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5 justify-items-center md:justify-items-center lg:justify-items-start w-full">
            {kulinerData.map((item) => (
              <div
                key={item.id}
                className="bg-white flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300 w-full max-w-[245px]"
                style={{
                  height: '323px',
                  borderRadius: '20px',
                  padding: '10px 10px 15px 10px',
                  gap: '15px',
                  boxShadow: '0px 0px 7px 0px rgba(0,0,0,0.25)',
                }}
              >
                {/* Image */}
                <div
                  className="relative rounded-[12px] overflow-hidden select-none"
                  style={{ height: '140px' }}
                >
                  <img
                    src={item.img}
                    alt={language === 'en' ? (item.title_en || item.title) : item.title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 px-1" style={{ flex: 1 }}>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-tight">
                    {language === 'en' ? (item.title_en || item.title) : item.title}
                  </h3>
                  <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3">
                    {language === 'en' ? (item.desc_en || item.desc) : item.desc}
                  </p>
                </div>

                {/* Save Button */}
                <div className="px-1 mt-auto">
                  <button
                    onClick={() => toggleSave(item.id)}
                    className="flex items-center justify-center gap-1.5 cursor-pointer w-full transition-colors"
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1.5px solid #0f285e',
                      backgroundColor: savedItems.includes(item.id) ? '#0f285e' : 'transparent',
                      color: savedItems.includes(item.id) ? 'white' : '#0f285e',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    <BookmarkIcon />
                    {savedItems.includes(item.id) ? t('kuliner_unsave_inventory') : t('kuliner_save_inventory')}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default KulinerJakarta;
