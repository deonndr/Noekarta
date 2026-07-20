import { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import historyTitle from '../assets/history-title.webp';
import history1 from '../assets/history1.webp';
import history2 from '../assets/history2.webp';
import history3 from '../assets/history3.webp';
import history4 from '../assets/history4.webp';
import history5 from '../assets/history5.webp';
import history6 from '../assets/history6.webp';

const historyData = [
  {
    id: 1,
    name: 'Sunda Kelapa',
    year: 'Abad Ke 5',
    desc: 'Pelabuhan bersejarah di Jakarta Utara yang terletak di muara Sungai Ciliwung. Dulunya merupakan pelabuhan utama Kerajaan Sunda, tempat ini kini beroperasi sebagai pusat kapal layar kayu tradisional (Pinisi) antarpulau dan menjadi salah satu destinasi wisata sejarah yang menarik di ibu kota.',
    img: history1,
  },
  {
    id: 2,
    name: 'Jayakarta',
    year: '1527',
    desc: 'Jayakarta berkembang sebagai bandar perdagangan rempah-rempah yang penting. Namun, riwayatnya berakhir pada 1619 ketika VOC di bawah pimpinan Jan Pieterszoon Coen menaklukkan wilayah tersebut, meratakannya dengan tanah, dan membangun kota baru bernama Batavia di atasnya.',
    img: history2,
  },
  {
    id: 3,
    name: 'Batavia',
    year: '1619 - 1942',
    desc: 'Batavia adalah nama lama untuk ibu kota Indonesia, Jakarta, pada masa penjajahan Belanda. Nama ini diberikan oleh Vereenigde Oostindische Compagnie (VOC) pada tahun 1619 setelah menaklukkan Jayakarta, dan diambil dari nama suku bangsa Jermanik kuno (Batavi) yang dianggap sebagai leluhur bangsa Belanda.',
    img: history3,
  },
  {
    id: 4,
    name: 'Jakarta Merdeka',
    year: '1942 - 1966',
    desc: 'Jakarta merdeka adalah transformasi dari kota kolonial menjadi pusat perjuangan dan ibu kota. Setelah Proklamasi 1945, namanya diubah dari pendudukan Jepang (Jakarta Tokubetsu Shi) menjadi Jakarta. Di sinilah tempat Ir. Soekarno membacakan naskah proklamasi yang mengawali kedaulatan penuh Republik Indonesia.',
    img: history4,
  },
  {
    id: 5,
    name: 'Jakarta Modern',
    year: '1966 - 2000',
    desc: 'Jakarta telah bertransformasi menjadi megapolitan modern berskala global. Kota ini menawarkan pesona futuristik melalui integrasi transportasi publik mutakhir seperti MRT dan LRT, kawasan hijau terpadu seperti Hutan Kota GBK, perpustakaan berfasilitas digital di Perpustakaan Jakarta serta kemudahan mobilitas melalui aplikasi terintegrasi dari Transjakarta.',
    img: history5,
  },
  {
    id: 6,
    name: 'Jakarta Digital',
    year: '2000 - Sekarang',
    desc: 'Jakarta Digital merujuk pada transformasi digital yang dilakukan oleh Pemerintah Provinsi DKI Jakarta untuk mengubah wajah birokrasi, tata kelola, dan layanan publik dari sistem manual ke dalam ekosistem terpadu berbasis teknologi.',
    img: history6,
  },
];

const imageCache = new Map();

const preloadImage = (src, priority = 'auto') => {
  if (!src || typeof Image === 'undefined') return Promise.resolve();
  if (imageCache.has(src)) return imageCache.get(src);

  const image = new Image();
  image.decoding = 'async';
  image.fetchPriority = priority;

  const promise = new Promise((resolve) => {
    image.onload = resolve;
    image.onerror = resolve;
  }).then(() => {
    if (image.decode) {
      return image.decode().catch(() => undefined);
    }
    return undefined;
  });

  image.src = src;
  imageCache.set(src, promise);
  return promise;
};

const History = () => {
  const [activeCard, setActiveCard] = useState(1);
  const sectionRef = useRef(null);

  const activeData = historyData.find(d => d.id === activeCard);

  const handleSelectCard = useCallback((item) => {
    preloadImage(item.img, 'high');
    setActiveCard(item.id);
  }, []);

  useEffect(() => {
    const activeIndex = historyData.findIndex((item) => item.id === activeCard);
    [activeIndex, activeIndex + 1, activeIndex - 1].forEach((index) => {
      const item = historyData[index];
      if (item) preloadImage(item.img, index === activeIndex ? 'high' : 'low');
    });
  }, [activeCard]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const idleIds = [];
    const timeoutIds = [];
    let started = false;

    const schedulePreload = () => {
      if (started) return;
      started = true;

      historyData.forEach((item, index) => {
        const preload = () => preloadImage(item.img, index < 2 ? 'high' : 'low');

        if ('requestIdleCallback' in window) {
          const id = window.requestIdleCallback(preload, { timeout: 1200 + index * 180 });
          idleIds.push(id);
          return;
        }

        const id = window.setTimeout(preload, index * 120);
        timeoutIds.push(id);
      });
    };

    if (!('IntersectionObserver' in window) || !sectionRef.current) {
      schedulePreload();
      return () => {
        idleIds.forEach((id) => window.cancelIdleCallback?.(id));
        timeoutIds.forEach((id) => window.clearTimeout(id));
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          schedulePreload();
          observer.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      idleIds.forEach((id) => window.cancelIdleCallback?.(id));
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section ref={sectionRef} id="history" className="pt-24 pb-24 bg-[#FAFAFA] relative overflow-hidden font-poppins">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Timeline List */}
          <div className="w-full lg:w-[55%] flex flex-col pt-4">
            {/* Title Area */}
            <div className="mb-10">
              <img src={historyTitle} alt="Lorong Waktu digital" className="h-10 md:h-14 object-contain mb-4" />
              <p className="text-gray-600 max-w-sm md:max-w-md text-sm md:text-[15px] leading-relaxed">
                Telusuri Transformasi Jakarta dari masa ke masa, dari pelabuhan kecil hingga kota global.
              </p>
            </div>

            {/* Timeline List */}
            <div className="relative flex flex-col gap-4">
              {/* Continuous Animated Timeline Line */}
              <div className="absolute left-[7px] top-[36px] md:top-[42px] bottom-[36px] md:bottom-[42px] w-[2px] bg-[#D1D5DB] z-0 hidden sm:block">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-[#1E40AF]"
                  initial={false}
                  animate={{ height: `${((activeCard - 1) / (historyData.length - 1)) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>

              {/* Mobile Timeline Line (Fallback if padding is different) */}
              <div className="absolute left-[7px] top-[36px] bottom-[36px] w-[2px] bg-[#D1D5DB] z-0 sm:hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-[#1E40AF]"
                  initial={false}
                  animate={{ height: `${((activeCard - 1) / (historyData.length - 1)) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>

              {historyData.map((item, index) => {
                const isActive = activeCard === item.id;
                const isPast = item.id <= activeCard;
                return (
                  <div key={item.id} className="relative flex items-center gap-4 md:gap-6 z-10">
                    {/* Timeline Graphic */}
                    <div className="w-4 flex justify-center shrink-0">
                      <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-500 ${isPast ? 'bg-[#1E40AF]' : 'bg-[#D1D5DB]'}`} />
                    </div>

                    {/* Timeline Item Button */}
                    <button
                      onClick={() => handleSelectCard(item)}
                      onPointerEnter={() => preloadImage(item.img, 'high')}
                      className={`flex-1 flex items-center cursor-pointer justify-between p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#EBF3FF] border-[#BFDBFE]' 
                          : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors duration-300 ${
                          isActive 
                            ? 'bg-[#1E40AF] text-white' 
                            : 'bg-[#F3F4F6] text-gray-500'
                        }`}>
                          0{item.id}
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold text-[17px] md:text-lg mb-0.5 transition-colors duration-300 ${isActive ? 'text-[#0F285C]' : 'text-gray-800'}`}>
                            {item.name}
                          </div>
                          <div className={`text-[13px] md:text-sm font-medium transition-colors duration-300 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                            {item.year}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`transition-colors duration-300 ${isActive ? 'text-[#1E40AF]' : 'text-gray-400'}`} size={24} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detail Card */}
          <div className="w-full lg:w-[45%] flex flex-col lg:sticky lg:top-24 mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-[2rem] p-5 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full"
              >
                {/* Image Container (Persegi Panjang) */}
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 relative bg-gray-50">
                  <img
                    src={activeData.img}
                    alt={activeData.name}
                    className="w-full h-full object-cover"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>

                {/* Badge */}
                <div className="bg-[#EBF3FF] text-[#1E40AF] font-bold text-[13px] px-4 py-1.5 rounded-full inline-block mb-5">
                  0{activeData.id} / 0{historyData.length}
                </div>

                {/* Title */}
                <h3 className="text-[26px] md:text-3xl font-bold text-[#0F285C] mb-3">
                  {activeData.name}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-500 mb-5 text-sm font-semibold">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{activeData.year}</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-[1.7] text-[14px] md:text-[15px] mb-8 min-h-[120px]">
                  {activeData.desc}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-3 md:gap-4 mt-auto">
                  <button 
                    onClick={() => activeCard > 1 && handleSelectCard(historyData.find(d => d.id === activeCard - 1))}
                    disabled={activeCard === 1}
                    className="flex-1 flex items-center justify-center gap-2 py-3 md:py-3.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowLeft size={18} />
                    Sebelumnya
                  </button>
                  <button 
                    onClick={() => activeCard < historyData.length && handleSelectCard(historyData.find(d => d.id === activeCard + 1))}
                    disabled={activeCard === historyData.length}
                    className="flex-1 flex items-center justify-center gap-2 py-3 md:py-3.5 px-4 rounded-xl bg-[#0F285C] text-white font-semibold text-sm hover:bg-[#0F285C]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Selanjutnya
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default History;

