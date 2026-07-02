import React, { useState } from 'react';
import { motion } from 'motion/react';
import kuliner1 from '../assets/kuliner1.png';
import kuliner2 from '../assets/kuliner2.png';
import kuliner3 from '../assets/kuliner3.png';
import kuliner4 from '../assets/kuliner4.png';
import kuliner5 from '../assets/kuliner5.png';

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
];

/* Bookmark Icon SVG */
const BookmarkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
    <section className="pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Kuliner Jakarta
            </h2>
            <p className="text-gray-900 text-lg">
              Cicipi kuliner khas Betawi dan Jakarta
            </p>
          </div>
          <a
            href="#"
            className="text-[#e5252a] font-semibold hover:text-red-700 transition-colors flex items-center gap-1 group whitespace-nowrap"
          >
            Lihat Semua Kuliner
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Cards Carousel */}
        <div
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 px-2 -mx-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {kulinerData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-[20px] flex flex-col flex-shrink-0 snap-start"
              style={{
                width: '245px',
                padding: '10px 10px 15px 10px',
                gap: '15px',
                boxShadow: '0 0 7px 0 rgba(0,0,0,0.25)',
              }}
            >
              {/* Image */}
              <div
                className="relative rounded-[14px] overflow-hidden select-none"
                style={{ height: '170px' }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 px-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-gray-900 text-base leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed" style={{ fontSize: '12px' }}>
                  {item.desc}
                </p>
              </div>

              {/* Save Button */}
              <div className="px-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSave(item.id)}
                  className="flex items-center gap-2 cursor-pointer"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: `1.5px solid ${savedItems.includes(item.id) ? '#e5252a' : '#e5252a'}`,
                    backgroundColor: savedItems.includes(item.id) ? '#fef2f2' : 'transparent',
                    color: '#e5252a',
                    fontSize: '12px',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <BookmarkIcon />
                  {savedItems.includes(item.id) ? 'Tersimpan' : 'Simpan ke Inventory'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KulinerJakarta;
