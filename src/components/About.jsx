import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useInView, motion } from 'motion/react';
import TitleImage from '../assets/Apa_Itu_Jakarta.webp';
import landmarkjakarta1 from '../assets/card_about1.webp';
import landmarkjakarta2 from '../assets/card_about3.webp';
import landmarkjakarta3 from '../assets/card_about2.webp';
import landmarkjakarta4 from '../assets/card_about4.webp';
import component1 from '../assets/components/component1.webp';
import { useLanguage } from '../context/LanguageContext';

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
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Left Column: Text & CTA — mobile-first (shown first on mobile) */}
        <div className="relative flex flex-col justify-center space-y-5 lg:pl-10 order-1 lg:order-2">
          {/* Floating Decorations — hidden on mobile to avoid overflow */}
          <motion.img
            src={component1}
            alt="Decoration"
            className="absolute -top-16 left-[35%] w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain select-none hidden md:block"
            whileInView={{ y: [0, -15, 0] }}
            viewport={{ once: false }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={component1}
            alt="Decoration"
            className="absolute -top-4 right-[10%] w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-contain select-none hidden md:block"
            whileInView={{ y: [0, 20, 0] }}
            viewport={{ once: false }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="flex justify-start mb-2 relative z-10">
            <img
              src={TitleImage}
              alt="Apa Itu Jakarta"
              className="h-[55px] md:h-[75px] object-contain select-none"
            />
          </div>

          <h2 className="text-[26px] md:text-[38px] font-ancizar font-bold text-gray-900 leading-tight relative z-10">
            {t('about_heading')}
          </h2>

          <p className="text-[#5B5B5B] text-base md:text-xl leading-relaxed relative z-10 max-w-[90%]">
            {t('about_desc')}
          </p>

          <div className="pt-2 relative z-10">
            <button
              onClick={() => navigate('/apa-itu-jakarta')}
              className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 cursor-pointer bg-indigo-950 text-white rounded-[12px] font-medium hover:bg-indigo-900 transition-colors text-sm md:text-base"
            >
              {t('about_cta')}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Images Grid — shown second on mobile */}
        <div className="flex gap-3 md:gap-4 order-2 lg:order-1">
          {/* Left sub-column */}
          <div className="flex-1 flex flex-col gap-3 md:gap-4 mt-0">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl p-4 md:p-5 border border-white shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
                <AnimatedCounter value={11.01} duration={2} /> juta jiwa
              </h3>
              <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap mt-1">{t('about_stat_label')}</p>
            </div>

            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white">
              <img
                src={landmarkjakarta1}
                alt="Jakarta 1"
                className="w-full h-[180px] md:h-[394px] object-cover border border-white select-none rounded-[14px]"
              />
            </div>

            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white">
              <img
                src={landmarkjakarta2}
                alt="Jakarta 2"
                className="w-full h-[110px] md:h-[176px] object-cover select-none rounded-[14px]"
              />
            </div>
          </div>

          {/* Right sub-column */}
          <div className="flex-1 flex flex-col gap-3 md:gap-4 pt-8 md:pt-10">
            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white">
              <img
                src={landmarkjakarta4}
                alt="Jakarta 3"
                className="w-full h-[150px] md:h-[319px] object-cover select-none rounded-[14px]"
              />
            </div>

            <div className="rounded-[20px] p-1.5 border border-white shadow-lg bg-white">
              <img
                src={landmarkjakarta3}
                alt="Jakarta 4"
                className="w-full h-[120px] md:h-[250px] object-cover select-none rounded-[14px]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
