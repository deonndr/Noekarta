import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import TitleImage from '../assets/Apa_Itu_Jakarta.png';
import landmark from '../assets/landmark.png';
import landmark2 from '../assets/landmark2.png';
import landmark3 from '../assets/landmark3.png';
import landmark4 from '../assets/landmark4.png';
import landmark5 from '../assets/landmark5.png';

const CARDS = [landmark, landmark2, landmark3, landmark4, landmark5];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CARDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="  px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="flex justify-center mb-[20px]">
        <img src={TitleImage} alt="Apa Itu Jakarta" className="w-[500px] h-[120px] object-contain select-none" />
      </div>

      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-12">
        {/* text sama tombol */}
        <div className="space-y-6 mt-12">
          <h2 className="text-[40px] font-bold text-gray-900 leading-tight">
            Jakarta, Kota sejarah<br />& inovasi
          </h2>
          <p className="text-black text-2xl leading-relaxed">
            Dari pelabuhan Sunda Kelapa hingga pusat Inovasi digital Asia Tenggara,
            Jakarta memadukan warisan budaya dan semanat modern untuk masa depan
            yang lebih baik
          </p>
          <button className="flex items-center gap-2 px-4 py-4 border border-red-500 text-red-600 rounded-[15px] font-medium hover:bg-red-50 transition-colors">
            Selengkapnya tentang Jakarta
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* card image */}
        <div className="relative h-[500px] md:h-[550px] w-full flex mt-8  overflow-hidden justify-center">
          <div className="relative w-[321px] h-[462px]" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {CARDS.map((cardImg, index) => {
              const len = CARDS.length;
              let offset = index - activeIndex;

              if (offset > Math.floor(len / 2)) offset -= len;
              if (offset < -Math.floor(len / 2)) offset += len;

              let translateX = 0;
              let translateY = 0;
              let translateZ = 0;
              let rotateY = 0;
              let zIndex = 10;
              let opacity = 1;

              if (offset === 0) {
                // Tengah
                translateX = 0;
                translateY = 0;
                translateZ = 0;
                rotateY = 0;
                zIndex = 20;
                opacity = 1;
              } else if (offset === -1) {
                // Kiri
                translateX = -160;
                translateY = 15;
                translateZ = -100;
                rotateY = 20;
                zIndex = 10;
                opacity = 0.5;
              } else if (offset === 1) {
                // Kanan
                translateX = 160;
                translateY = 15;
                translateZ = -100;
                rotateY = -20;
                zIndex = 10;
                opacity = 0.5;
              } else if (offset < -1) {
                // Sembunyi di kiri
                translateX = -250;
                translateY = 30;
                translateZ = -200;
                rotateY = 40;
                zIndex = 0;
                opacity = 0;
              } else if (offset > 1) {
                // Sembunyi di kanan
                translateX = 250;
                translateY = 30;
                translateZ = -200;
                rotateY = -40;
                zIndex = 0;
                opacity = 0;
              }

              return (
                <img
                  key={index}
                  src={cardImg}
                  alt={`Jakarta landmark ${index + 1}`}
                  className="absolute top-0 left-0 w-[321px] h-[462px] rounded-[20px] object-cover select-none transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity,
                  }}
                  onClick={() => setActiveIndex(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
