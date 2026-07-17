import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import historyTitle from '../assets/history-title.webp';
import history1 from '../assets/history-image1.webp';
import history2 from '../assets/history-image2.webp';
import history3 from '../assets/history-image3.webp';
import history4 from '../assets/history-image4.webp';
import history5 from '../assets/history-image5.webp';
import history6 from '../assets/history-image6.webp';
import title1 from '../assets/hero-title1.webp';
import title2 from '../assets/hero-title2.webp';
import title3 from '../assets/hero-title3.webp';
import title4 from '../assets/hero-title4.webp';
import title5 from '../assets/hero-title5.webp';
import title6 from '../assets/hero-title6.webp';

const historyData = [
  {
    id: 1,
    name: 'Sunda Kelapa',
    titleImg: title1,
    year: 'Abad ke-5',
    desc: 'Pelabuhan bersejarah di Jakarta Utara yang terletak di muara Sungai Ciliwung. Dulunya merupakan pelabuhan utama Kerajaan Sunda, tempat ini kini beroperasi sebagai pusat kapal layar kayu tradisional (Pinisi) antarpulau dan menjadi salah satu destinasi wisata sejarah yang menarik di ibu kota.',
    img: history1,

  },
  {
    id: 2,
    name: 'Jayakarta',
    titleImg: title2,
    year: 'Tahun 1527',
    desc: 'Jayakarta berkembang sebagai bandar perdagangan rempah-rempah yang penting. Namun, riwayatnya berakhir pada 1619 ketika VOC di bawah pimpinan Jan Pieterszoon Coen menaklukkan wilayah tersebut, meratakannya dengan tanah, dan membangun kota baru bernama Batavia di atasnya.',
    img: history2,

  },
  {
    id: 3,
    name: 'Batavia',
    titleImg: title3,
    year: '1619 - 1942',
    desc: 'Batavia adalah nama lama untuk ibu kota Indonesia, Jakarta, pada masa penjajahan Belanda. Nama ini diberikan oleh Vereenigde Oostindische Compagnie (VOC) pada tahun 1619 setelah menaklukkan Jayakarta, dan diambil dari nama suku bangsa Jermanik kuno (Batavi) yang dianggap sebagai leluhur bangsa Belanda.',
    img: history3,

  },
  {
    id: 4,
    name: 'Jakarta Merdeka',
    titleImg: title4,
    year: '1945 - 90-an',
    desc: 'Jakarta Merdeka adalah transformasi dari kota kolonial menjadi pusat perjuangan dan ibu kota. Setelah Proklamasi 1945, namanya diubah dari pendudukan Jepang (Jakarta Tokubetsu Shi) menjadi Jakarta. Di sinilah tempat Ir. Soekarno membacakan naskah proklamasi yang mengawali kedaulatan penuh Republik Indonesia.',
    img: history4,

  },
  {
    id: 5,
    name: 'Jakarta Modern',
    titleImg: title5,
    year: '1990 - 2000-an',
    desc: 'Jakarta telah bertransformasi menjadi megapolitan modern berskala global. Kota ini menawarkan pesona futuristik melalui integrasi transportasi publik mutakhir seperti MRT dan LRT, kawasan hijau terpadu seperti Hutan Kota GBK, perpustakaan berkualitas digital di Perpustakaan Jakarta serta kemudahan mobilitas melalui aplikasi terintegrasi dari Transjakarta.',
    img: history5,

  },
  {
    id: 6,
    name: 'Jakarta Digital',
    titleImg: title6,
    year: '2000 - Saat Ini',
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

const preloadHistoryAssets = (item, priority = 'auto') => (
  Promise.all([
    preloadImage(item.img, priority),
    preloadImage(item.titleImg, priority),
  ])
);

const History = () => {
  const [activeCard, setActiveCard] = useState(1);
  const sectionRef = useRef(null);

  const activeData = historyData.find(d => d.id === activeCard);

  const handleSelectCard = useCallback((item) => {
    preloadHistoryAssets(item, 'high');
    setActiveCard(item.id);
  }, []);

  useEffect(() => {
    const activeIndex = historyData.findIndex((item) => item.id === activeCard);
    [activeIndex, activeIndex + 1, activeIndex - 1].forEach((index) => {
      const item = historyData[index];
      if (item) preloadHistoryAssets(item, index === activeIndex ? 'high' : 'low');
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
        const preload = () => preloadHistoryAssets(item, index < 2 ? 'high' : 'low');

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
    <section ref={sectionRef} id="history" className="pt-24 pb-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start">

          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Title */}
            <div className="mb-8">
              <img src={historyTitle} alt="Lorong Waktu digital" className="h-12 md:h-16 object-contain" />
            </div>

            {/* Banner */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 mb-10 shadow-sm w-full md:w-[90%]">
              <PartyPopper className="text-[#2563EB] shrink-0" size={24} />
              <p className="text-gray-800 font-medium">
                Setiap era membentuk cerita, setiap cerita membentuk Jakarta.
              </p>
            </div>

            {/* List */}
            <div className="flex font-ancizar flex-col w-full md:w-[90%]">
              {historyData.map((item) => {
                const isActive = activeCard === item.id;
                return (
                  <div key={item.id} className="relative">
                    {item.id > 1 && <div className="h-px  bg-gray-200 w-full" />}
                    <div
                      onPointerEnter={() => preloadHistoryAssets(item, 'high')}
                      onFocus={() => preloadHistoryAssets(item, 'high')}
                      onClick={() => handleSelectCard(item)}
                      className={`flex items-center justify-between py-4 px-6 cursor-pointer transition-all rounded-r-xl ${isActive ? 'bg-[#F0F5FF]' : 'hover:bg-gray-50'
                        }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-800 rounded-r-full" />
                      )}
                      <div className="flex items-center gap-6">
                        <span className={`text-lg font-medium ${isActive ? 'text-indigo-950' : 'text-gray-400'}`}>
                          0{item.id}
                        </span>
                        <span className={`text-xl font-semibold ${isActive ? 'text-[#0F285C]' : 'text-gray-700'}`}>
                          {item.name}
                        </span>
                      </div>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md ${isActive ? 'bg-blue-800 text-white' : 'bg-indigo-950 text-white'}`}>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start pt-10 lg:pt-0">
            <div className="relative w-full max-w-[506px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Image with Pre-shaped Blob */}
                  <div className="relative aspect-[506/489] w-full mb-10 flex items-center justify-center">
                    {/* Badge */}
                    <div className="absolute bottom-2 left-2 md:bottom-6 md:left-10 w-20 h-20 md:w-[90px] md:h-[90px] bg-indigo-950 text-white rounded-full flex items-center justify-center text-2xl md:text-[32px] font-bold z-10 border-[6px] border-[#FAFAFA]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                      0{activeData.id}
                    </div>

                    <div className="w-full h-full transition-all duration-1000 ease-in-out drop-shadow-[6px_4px_4px_rgba(0,0,0,0.25)]">
                      <img
                        src={activeData.img}
                        alt={activeData.name}
                        className="w-full h-full object-contain"
                        width="506"
                        height="489"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <img
                      src={activeData.titleImg}
                      alt={activeData.name}
                      className="h-10 md:h-12 object-contain object-left"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <span className="bg-[#E5EDFF] shadow-xl ms-auto text-indigo-900 px-5 py-2 rounded-xl text-sm font-semibold w-fit">
                      {activeData.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-black leading-relaxed text-[15px] md:text-[16px]">
                    {activeData.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default History;
