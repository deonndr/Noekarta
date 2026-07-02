import React, { useRef, useState, useEffect } from 'react';
import historyBg from '../assets/history-background.png';
import historyTitle from '../assets/history-title.png';
import history1 from '../assets/history1.png';
import history2 from '../assets/history2.png';
import history3 from '../assets/history3.png';
import history4 from '../assets/history4.png';
import history5 from '../assets/history5.png';
import history6 from '../assets/history6.png';
import title1 from '../assets/hero-title1.png';
import title2 from '../assets/hero-title2.png';
import title3 from '../assets/hero-title3.png';
import title4 from '../assets/hero-title4.png';
import title5 from '../assets/hero-title5.png';
import title6 from '../assets/hero-title6.png';

const historyData = [
  {
    id: 1,
    titleImg: title3,
    year: 'Abad ke-5',
    desc: 'Pelabuhan rempah dan pusat perdagangan Nusantara',
    img: history1,
  },
  {
    id: 2,
    titleImg: title2,
    year: '1527',
    desc: 'Pelabuhan baru dimuara sungai Ciliwung yang mulai berkembang',
    img: history2,
  },
  {
    id: 3,
    titleImg: title1,
    year: '1619 - 1942',
    desc: 'Markas utama VOC dan pusat pemerintahan Hindia - Belanda',
    img: history3,
  },
  {
    id: 4,
    titleImg: title4,
    year: '1945 - 1960-an',
    desc: 'Ibu kota republik yang bangkit dan membenah diri',
    img: history4,
  },
  {
    id: 5,
    titleImg: title5,
    year: '1960 - 2000-an',
    desc: 'Pertumbuhan gesit menjadi kota Metropolitan dan dinamis',
    img: history5,
  },
  {
    id: 6,
    titleImg: title6,
    year: '2000 - Saat ini',
    desc: 'Menuju kota Cerdas, Terhubung dan berkelanjutan',
    img: history6,
  },
];

const History = () => {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCard, setActiveCard] = useState(1);

  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Custom smooth scroll helper dengan durasi yang bisa diatur (1000ms default)
  const smoothScrollTo = (container, targetLeft, duration = 1000) => {
    const startLeft = container.scrollLeft;
    const distance = targetLeft - startLeft;
    let startTime = null;

    // Easing fungsi: sangat lambat di awal dan di akhir (ease-in-out cubic)
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      container.scrollLeft = startLeft + (distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const isHoverDevice = () => window.matchMedia && window.matchMedia('(hover: hover)').matches;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      
      // Mencegah hover trigger saat sedang scrolling
      isScrollingRef.current = true;
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 300); 
    }
  };

  const handleCardHover = (id, event) => {
    if (!isHoverDevice()) return;
    if (isScrollingRef.current) return;
    
    setActiveCard(id);
    scrollCardIntoView(event.currentTarget);
  };

  const handleCardClick = (id, event) => {
    // Toggle: klik card yang sudah aktif → tutup (balik ke default)
    if (activeCard === id) {
      setActiveCard(1);
      return;
    }
    setActiveCard(id);
    scrollCardIntoView(event.currentTarget);
  };

  const handleContainerMouseLeave = () => {
    if (!isHoverDevice()) return;
    setActiveCard(1);
  };

  const scrollCardIntoView = (card) => {
    const container = scrollRef.current;
    if (container && card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const isFullyVisible = (
        cardRect.left >= containerRect.left &&
        cardRect.right <= containerRect.right
      );

      if (!isFullyVisible) {
        let scrollAmount = 0;
        
        if (cardRect.right > containerRect.right) {
          scrollAmount = cardRect.right - containerRect.right + 24;
        } else if (cardRect.left < containerRect.left) {
          scrollAmount = cardRect.left - containerRect.left - 24;
        }

        const targetLeft = container.scrollLeft + scrollAmount;
        smoothScrollTo(container, targetLeft, 800);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleScroll, 100);
    window.addEventListener('resize', handleScroll);
    return () => {
      clearTimeout(timer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="history"
      className="pt-[100px] pb-[100px] bg-[#AC1717] relative overflow-hidden"
      style={{
        backgroundImage: `url(${historyBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1511px]">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-[80px]">
          <img
            src={historyTitle}
            alt="Lorong Waktu digital"
            className="h-14 md:h-20 mb-6 select-none object-contain"
          />
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl">
            Jelajahi perjalanan panjang Jakarta Dari masa ke masa
          </p>
        </div>

        <div className="relative w-full">
          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseLeave={handleContainerMouseLeave}
            className="flex overflow-x-auto pb-12 pt-4 px-4 -mx-4 gap-6 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {historyData.map((item) => {
              const isActive = activeCard === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={(e) => handleCardHover(item.id, e)}
                  onClick={(e) => handleCardClick(item.id, e)}
                  className={`relative min-w-[280px] md:min-w-[320px] h-[480px] bg-white rounded-[24px] cursor-pointer transition-shadow duration-500 flex-shrink-0 ${isActive ? 'shadow-[0_20px_40px_rgb(0,0,0,0.12)]' : 'shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]'}`}
                >
                  {/* Image Container */}
                  <div className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 ${isActive ? 'top-5 left-5 right-5 bottom-[calc(100%-190px)]' : 'top-0 left-0 right-0 bottom-0'}`}>
                    <img
                      src={item.img}
                      alt={`History ${item.id}`}
                      className={`w-full h-full select-none object-cover transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'rounded-[16px]' : 'rounded-[24px]'}`}
                    />
                    <div className={`absolute inset-0 bg-black/10 transition-all duration-500 pointer-events-none ${isActive ? 'opacity-0 rounded-[16px]' : 'opacity-100 rounded-[24px]'}`}></div>
                  </div>

                  {/* Nomor */}
                  <div className={`absolute top-5 left-5 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#e5252a] font-bold text-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 ${isActive ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
                    {item.id}
                  </div>

                  {/* Container kontent */}
                  <div className={`absolute top-[190px] left-0 right-0 bottom-0 p-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 flex flex-col justify-start ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                    <div className="relative inline-block self-start mb-3">
                      <img src={item.titleImg} alt={`Title ${item.id}`} className="h-10 select-none md:h-12 object-contain" />
                    </div>

                    <div className="mt-2 mb-3">
                      <span className="inline-block text-[20px] font-bold text-gray-900 pb-1">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-[20px] text-gray-800 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* efek blur kanan*/}
          <div
            className={`absolute top-3  rounded-xl -right-6 bg-gradient-to-l from-[#AC1717] via-[#AC1717]/80 to-transparent bottom-11 w-32 md:w-48 pointer-events-none transition-opacity duration-500 hidden md:flex items-center justify-end pr-2 md:pr-4 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
          >
          </div>
        </div>

      </div>
    </section>
  );
};

export default History;
