import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useInView, motion } from 'motion/react';
import TitleImage from '../assets/Apa_Itu_Jakarta.png';
import landmarkjakarta1 from '../assets/card_about1.png';
import landmarkjakarta2 from '../assets/card_about3.png';
import landmarkjakarta3 from '../assets/card_about2.png';
import landmarkjakarta4 from '../assets/card_about4.png';
import component1 from '../assets/components/component1.png';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(progress * value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  const formattedCount = count.toFixed(2).replace('.', ',');

  return <span ref={ref}>{formattedCount}</span>;
};

const About = () => {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Images Grid */}
        <div className="flex gap-4">
          {/* Left sub-column */}
          <div className="flex-1 flex flex-col gap-4 mt-0">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl p-5 border border-white">
              <h3 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                <AnimatedCounter value={11.01} duration={2} /> juta jiwa
              </h3>
              <p className="text-sm text-gray-500 whitespace-nowrap mt-1">Penduduk Kota Jakarta</p>
            </div>
            
            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white ">
              <img 
                src={landmarkjakarta1} 
                alt="Jakarta 1" 
                className="w-full h-[394px] object-cover border border-white  select-none rounded-[14px]"
              />
            </div>
            
            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white ">
              <img 
                src={landmarkjakarta2} 
                alt="Jakarta 2" 
                className="w-full h-[176px] object-cover select-none rounded-[14px]"
              />
            </div>
          </div>

          {/* Right sub-column */}
          <div className="flex-1 flex flex-col gap-4 pt-10">
            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white ">
              <img 
                src={landmarkjakarta4} 
                alt="Jakarta 3" 
                className="w-full h-[319px] object-cover select-none rounded-[14px]"
              />
            </div>
            
            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white ">
              <img 
                src={landmarkjakarta3} 
                alt="Jakarta 4" 
                className="w-full h-[250px] object-cover select-none rounded-[14px]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Text & CTA */}
        <div className="relative flex flex-col justify-center space-y-5 lg:pl-10">
          {/* Floating Decorations (component1) */}
          <motion.img 
            src={component1} 
            alt="Decoration" 
            className="absolute -top-30 left-[35%] w-[70px] h-[70px] object-contain select-none"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img 
            src={component1} 
            alt="Decoration" 
            className="absolute -top-6 right-[10%] w-[60px] h-[60px] object-contain select-none"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="flex justify-start mb-2 relative z-10">
            <img 
              src={TitleImage} 
              alt="Apa Itu Jakarta" 
              className="h-[65px] md:h-[75px] object-contain select-none" 
            />
          </div>

          <h2 className="text-[32px] md:text-[38px] font-bold text-gray-900 leading-tight relative z-10">
            Jakarta, Kota sejarah<br />& inovasi
          </h2>
          
          <p className="text-[#5B5B5B] text-lg md:text-xl leading-relaxed relative z-10 max-w-[90%]">
            Dari pelabuhan Sunda Kelapa hingga pusat Inovasi digital Asia Tenggara,
            Jakarta memadukan warisan budaya dan semangat modern untuk masa depan
            yang lebih baik
          </p>
          
          <div className="pt-2 relative z-10">
            <button className="flex items-center gap-2 px-8 py-3.5 cursor-pointer bg-[#1455e6] text-white rounded-[12px] font-medium hover:bg-blue-700 transition-colors">
              Selengkapnya tentang Jakarta
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
