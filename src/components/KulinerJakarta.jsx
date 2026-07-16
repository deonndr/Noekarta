import React, { useState } from 'react';
import { motion } from 'motion/react';
import kuliner1 from '../assets/kuliner1.png';
import kuliner2 from '../assets/kuliner2.png';
import kuliner3 from '../assets/kuliner3.png';
import kuliner4 from '../assets/kuliner4.png';
import kuliner5 from '../assets/kuliner5.png';
import kuliner6 from '../assets/kuliner6.jpg';
import cardfly from '../assets/cardfly2.svg';
import component1 from '../assets/components/component1.png';

const kulinerData = [
  {
    id: 1,
    title: 'Kerak telor',
    img: kuliner1,
    desc: 'Telur bebek, Beras ketan Serundeng, dan ebi yang gurih',
  },
  {
    id: 2,
    title: 'Soto betawi',
    img: kuliner2,
    desc: 'Daging Sapi, jeroan, dan rempah - rempah yang khas',
  },
  {
    id: 3,
    title: 'Nasi uduk Betawi',
    img: kuliner3,
    desc: 'disajikan dengan lauk jengkol, semur tahu atau tempe',
  },
  {
    id: 4,
    title: 'Asinan Betawi',
    img: kuliner4,
    desc: 'kuahnya kemerahan, rasa asam, manis, dan pedas',
  },
  {
    id: 5,
    title: 'Roti Buaya',
    img: kuliner5,
    desc: 'disajikan pada acara khusus Seperti upacara pernikahan',
  },
  {
    id: 6,
    title: 'Es Selendang Mayang',
    img: kuliner6,
    desc: 'kue kenyal dari tepung beras, santan, dan air gula merah',
  },
];

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
  const [savedItems, setSavedItems] = useState([]);

  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-4 mb-10 relative flex flex-col justify-center h-full">
            {/* cardfly animation */}
            <div className="relative mb-6 h-[80px] w-full">
              <img
                src={cardfly}
                alt="50+ Kuliner Khas"
                className="absolute bottom-10 left-0 select-none z-20 w-[250px]"
                style={{ animation: 'float-card-2 9s ease-in-out infinite' }}
              />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-gray-900 mb-6 leading-tight tracking-tight font-ancizar">
              Kuliner Jakarta
            </h2>
            <p className="text-gray-700 text-xl lg:text-2xl mb-10 max-w-md">
              Cicipi kuliner khas Betawi dan Jakarta
            </p>

            <a href="#" className="bg-[#0f285e] hover:bg-[#0a1b40] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center w-fit gap-2 transition-colors">
              Lihat Semua Kuliner
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* component1 decorations */}
            <div className="absolute -bottom-1 left-5 w-[80px] h-[80px]">
              <motion.img
                src={component1}
                alt="Decoration"
                className="w-full h-full object-contain select-none opacity-50"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="absolute -bottom-10 left-40 w-[60px] h-[60px]">
              <motion.img
                src={component1}
                alt="Decoration"
                className="w-full h-full object-contain select-none opacity-50"
                animate={{ y: [0, 20, 0] }}
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
                    alt={item.title}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 px-1" style={{ flex: 1 }}>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3">
                    {item.desc}
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
                      border: '1px solid #3b82f6',
                      backgroundColor: savedItems.includes(item.id) ? '#eff6ff' : 'transparent',
                      color: '#3b82f6',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    <BookmarkIcon />
                    {savedItems.includes(item.id) ? 'Tersimpan' : 'Simpan ke Inventory'}
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
