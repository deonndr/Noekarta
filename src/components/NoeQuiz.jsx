import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Rocket, Flag, Check, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

import titleImage from '../assets/noequiz-title.webp';
import logoNoekarta from '../assets/logo-noekarta.webp';
import component8 from '../assets/components/component8.webp';
import component9 from '../assets/components/component9.webp';

const sampleQuestions = [
  {
    id: 1,
    title: "Pos 1: Sejarah Batavia",
    text: "Pelabuhan utama di Batavia yang menjadi pusat perdagangan rempah-rempah pada masa penjajahan Belanda adalah...",
  },
  {
    id: 2,
    title: "Pos 2: Budaya Betawi",
    text: "Kesenian musik tradisional Betawi yang mendapat pengaruh dari budaya Tionghoa dengan alat musik gesek Tehyan adalah...",
  },
  {
    id: 3,
    title: "Pos 3: Kuliner Khas",
    text: "Soto Betawi sangat khas dengan kuahnya yang kental dan gurih. Bahan utama pembuat kuah soto ini adalah...",
  },
  {
    id: 4,
    title: "Pos 4: Landmark Jakarta",
    text: "Monumen berupa patung yang dibangun untuk memperingati pembebasan Irian Barat dari tangan Belanda adalah...",
  },
  {
    id: 5,
    title: "Eksplorasi Jakarta",
    text: "Sebelum bernama Jakarta, kota ini pernah dinamakan Jayakarta oleh Fatahillah pada tanggal 22 Juni tahun...",
  }
];

const NoeQuiz = ({ completedStations = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  const isBataviaComplete = completedStations.includes(0);
  const isBetawiUnlocked = completedStations.includes(0);
  const isBetawiComplete = completedStations.includes(1);
  const isFinishComplete = completedStations.includes(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentSlide((curr) => (curr + 1) % sampleQuestions.length);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setTimeLeft(5);
  };

  return (
    <section className="relative mx-auto max-w-[1200px] px-4 md:px-5 py-12 md:py-20 bg-[#FAFAFA]">
      <div className="w-full bg-white rounded-[40px] shadow-[0_4px_40px_rgba(0,0,0,0.06)] px-8 md:px-14 lg:px-20 py-12 md:py-16 border border-gray-100 flex flex-col items-center">
        
        {/* Top Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6 lg:gap-8 mb-24 mt-4 overflow-hidden">
          
          {/* Left: Text & Button */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full max-w-[500px]"
          >
            <img src={titleImage} alt="NoeQuiz Explorasi" className="h-10 md:h-12 object-contain mb-6 select-none" />
            <p className="text-[#3A3A3A] text-[14px] md:text-[15px] leading-relaxed mb-8 font-medium max-w-[450px]">
              Selesaikan Tantangan di setiap pos dengan skor minimal 3/5 benar untuk membuka pos selanjutnya. Mari taklukkan semua level!
            </p>
            <Link 
              to="/noequiz"
              className="inline-flex items-center gap-3 bg-[#2A238A] hover:bg-[#201a73] text-white font-semibold px-6 md:px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(42,35,138,0.3)] hover:shadow-[0_8px_25px_rgba(42,35,138,0.4)] active:scale-95 group w-max"
            >
              <Rocket className="w-5 h-5 text-white/90" />
              <span className="text-[14px] md:text-[15px]">Mainkan NoeQuiz Sekarang !!</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Question Card Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-[400px] md:max-w-[340px] lg:max-w-[400px]"
          >
            <div className="bg-white rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] border border-gray-100 p-6 md:p-8 min-h-[300px] flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img src={logoNoekarta} alt="Noekarta" className="h-3.5 md:h-4 w-auto object-contain" />
                </div>
                
                {/* Timer Circle */}
                <div className="relative flex items-center justify-center w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#E5E7EB" strokeWidth="5" />
                    {/* Progress circle */}
                    <circle 
                      cx="50" cy="50" r="46" fill="none" stroke="#1A1856" strokeWidth="5" 
                      strokeDasharray="289"
                      strokeDashoffset={289 - (timeLeft / 5) * 289}
                      className="transition-all duration-1000 ease-linear origin-center"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 text-[#1A1856] font-bold text-[16px] md:text-[18px] leading-none">
                    0{timeLeft}
                  </span>
                </div>

                <span className="text-[12px] md:text-[13px] font-semibold text-[#1A1856]">Soal {currentSlide + 1}/5</span>
              </div>

              <div className="flex-1 relative w-full h-full flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center text-center w-full mt-4"
                  >
                    <h4 className="text-[#1A1856] font-bold text-[15px] md:text-[16px] mb-4">{sampleQuestions[currentSlide].title}</h4>
                    <p className="text-[#3A3A3A] text-[12.5px] md:text-[13.5px] leading-[1.6] font-medium px-2">
                      {sampleQuestions[currentSlide].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-[6px] mt-8 absolute bottom-8 left-1/2 -translate-x-1/2">
                {sampleQuestions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-2 h-2 bg-[#1A1856]' : 'w-2 h-2 bg-[#D1D5E8] hover:bg-[#A9B8EB]'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Path */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full relative max-w-[850px] mx-auto hidden md:block"
        >
          {/* SVG Line Connections */}
          <div className="absolute top-1/2 left-[5%] w-[90%] h-[150px] -translate-y-1/2 z-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible absolute top-0 left-0 w-full h-full">
               {/* 1 to 2: Solid Purple or Dotted Blue depending on completion */}
               <path d="M 40 75 Q 180 20, 333 47" stroke={isBataviaComplete ? "#5C31DD" : "#251F8D"} strokeWidth={isBataviaComplete ? "3" : "2.5"} strokeDasharray={isBataviaComplete ? "none" : "8 8"} fill="none" className="transition-all duration-500" />
               {/* 2 to 3: Dotted Dark Blue or Solid depending on completion */}
               <path d="M 333 47 Q 500 130, 666 90" stroke={isBetawiComplete ? "#5C31DD" : "#251F8D"} strokeWidth={isBetawiComplete ? "3" : "2.5"} strokeDasharray={isBetawiComplete ? "none" : "8 8"} fill="none" className="transition-all duration-500" />
               {/* 3 to 4: Dotted Black/Gray */}
               <path d="M 666 90 Q 830 50, 960 75" stroke={isFinishComplete ? "#5C31DD" : "#1A1A1A"} strokeWidth={isFinishComplete ? "3" : "2.5"} strokeDasharray={isFinishComplete ? "none" : "8 8"} fill="none" className="transition-all duration-500" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-row justify-between items-start px-4 mt-8">
            
            {/* Start Node */}
            <div className="flex flex-col items-center relative z-20">
               <div className="w-[56px] h-[56px] rounded-full bg-[#515151] border-[4px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 25px 10px rgba(130, 205, 255, 0.5)' }}>
                 <Flag className="w-5 h-5" strokeWidth={2.5} />
               </div>
               <span className="text-[12px] font-bold mt-4 text-[#3A3A3A] uppercase tracking-wider">START</span>
            </div>

            {/* Node 1: Sejarah Batavia */}
            <Link to="/noequiz" className="flex flex-col items-center relative -translate-y-[28px] group hover:scale-105 transition-transform duration-300 z-20">
               {isBataviaComplete && (
                 <div className="absolute -top-7 px-3.5 py-0.5 bg-[#EAE8FE] text-[#341697] text-[10px] font-bold rounded-full mb-1.5 shadow-sm z-20">
                   Complete
                 </div>
               )}
               
               {isBataviaComplete ? (
                 <div className="w-[60px] h-[60px] rounded-full bg-[#0351DF] border-[4px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 8px rgba(211, 193, 250, 0.8), 0 0 30px 15px rgba(211, 193, 250, 0.6)' }}>
                   <Check className="w-8 h-8" strokeWidth={3.5} />
                 </div>
               ) : (
                 <div className="w-[60px] h-[60px] rounded-full bg-[#0A1869] border-[4px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 8px rgba(211, 193, 250, 0.8), 0 0 30px 15px rgba(211, 193, 250, 0.6)' }}>
                   <img src={component8} alt="Icon Batavia" className="w-7 h-7 object-contain" />
                 </div>
               )}

               <span className="text-[14px] font-bold mt-4 text-[#1A1856]">Sejarah Batavia</span>
            </Link>

            {/* Node 2: Budaya Betawi */}
            <Link to={isBetawiUnlocked ? "/noequiz" : "#"} className={`flex flex-col items-center relative translate-y-[15px] transition-transform duration-300 z-20 ${isBetawiUnlocked ? 'group hover:scale-105' : 'opacity-70 cursor-not-allowed'}`}>
               {isBetawiComplete && (
                 <div className="absolute -top-7 px-3.5 py-0.5 bg-[#EAE8FE] text-[#341697] text-[10px] font-bold rounded-full mb-1.5 shadow-sm z-20">
                   Complete
                 </div>
               )}

               {isBetawiComplete ? (
                 <div className="w-[60px] h-[60px] rounded-full bg-[#0351DF] border-[4px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 8px rgba(168, 219, 255, 0.8), 0 0 30px 15px rgba(168, 219, 255, 0.6)' }}>
                   <Check className="w-8 h-8" strokeWidth={3.5} />
                 </div>
               ) : isBetawiUnlocked ? (
                 <div className="w-[60px] h-[60px] rounded-full bg-[#0A1869] border-[4px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 8px rgba(168, 219, 255, 0.8), 0 0 30px 15px rgba(168, 219, 255, 0.6)' }}>
                   <img src={component9} alt="Icon Betawi" className="w-7 h-7 object-contain" />
                 </div>
               ) : (
                 <div className="w-[60px] h-[60px] rounded-full bg-[#62646B] border-[4px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 4px #D1D5E8' }}>
                   <LockKeyhole className="w-6 h-6" />
                 </div>
               )}

               <span className="text-[14px] font-bold mt-4 text-[#1A1856]">Budaya Betawi</span>
            </Link>

            {/* Finish Node */}
            <div className="flex flex-col items-center relative z-20">
               <div className={`w-[56px] h-[56px] rounded-full border-[4px] border-white text-white flex items-center justify-center relative z-10 transition-colors duration-500 ${isFinishComplete ? 'bg-[#5C31DD]' : 'bg-[#515151]'}`} style={{ boxShadow: '0 0 0 4px #D1D5E8' }}>
                 {isFinishComplete ? <Check className="w-5 h-5" strokeWidth={2.5} /> : <Flag className="w-5 h-5" strokeWidth={2.5} />}
               </div>
               <span className="text-[12px] font-bold mt-4 text-[#3A3A3A] uppercase tracking-wider">FINISH</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile View for Path */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full relative mt-12 mb-4 max-w-[300px] mx-auto md:hidden flex flex-col items-center gap-12"
        >
            {/* Start Node */}
            <div className="flex flex-col items-center">
               <div className="w-[50px] h-[50px] rounded-full bg-[#515151] border-[3px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 20px 8px rgba(130, 205, 255, 0.5)' }}>
                 <Flag className="w-5 h-5" strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-bold mt-2 text-[#3A3A3A] uppercase tracking-wider">START</span>
            </div>

            {/* Node 1 */}
            <Link to="/noequiz" className="flex flex-col items-center relative hover:scale-105 transition-transform duration-300">
               {isBataviaComplete && (
                 <div className="absolute -top-6 px-3 py-0.5 bg-[#EAE8FE] text-[#341697] text-[9px] font-bold rounded-full whitespace-nowrap shadow-sm z-20">
                   Complete
                 </div>
               )}
               {isBataviaComplete ? (
                 <div className="w-[50px] h-[50px] rounded-full bg-[#0351DF] border-[3px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 6px rgba(211, 193, 250, 0.8), 0 0 20px 10px rgba(211, 193, 250, 0.6)' }}>
                   <Check className="w-6 h-6" strokeWidth={3.5} />
                 </div>
               ) : (
                 <div className="w-[50px] h-[50px] rounded-full bg-[#0A1869] border-[3px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 6px rgba(211, 193, 250, 0.8), 0 0 20px 10px rgba(211, 193, 250, 0.6)' }}>
                   <img src={component8} alt="Icon Batavia" className="w-6 h-6 object-contain" />
                 </div>
               )}
               <span className="text-[13px] font-bold mt-4 text-[#1A1856]">Sejarah Batavia</span>
            </Link>

            {/* Node 2 */}
            <Link to={isBetawiUnlocked ? "/noequiz" : "#"} className={`flex flex-col items-center relative transition-transform duration-300 ${isBetawiUnlocked ? 'hover:scale-105' : 'opacity-70 cursor-not-allowed'}`}>
               {isBetawiComplete && (
                 <div className="absolute -top-6 px-3 py-0.5 bg-[#EAE8FE] text-[#341697] text-[9px] font-bold rounded-full whitespace-nowrap shadow-sm z-20">
                   Complete
                 </div>
               )}
               {isBetawiComplete ? (
                 <div className="w-[50px] h-[50px] rounded-full bg-[#0351DF] border-[3px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 6px rgba(168, 219, 255, 0.8), 0 0 20px 10px rgba(168, 219, 255, 0.6)' }}>
                   <Check className="w-6 h-6" strokeWidth={3.5} />
                 </div>
               ) : isBetawiUnlocked ? (
                 <div className="w-[50px] h-[50px] rounded-full bg-[#0A1869] border-[3px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 6px rgba(168, 219, 255, 0.8), 0 0 20px 10px rgba(168, 219, 255, 0.6)' }}>
                   <img src={component9} alt="Icon Betawi" className="w-6 h-6 object-contain" />
                 </div>
               ) : (
                 <div className="w-[50px] h-[50px] rounded-full bg-[#62646B] border-[3px] border-white text-white flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 3px #D1D5E8' }}>
                   <LockKeyhole className="w-5 h-5" />
                 </div>
               )}
               <span className="text-[13px] font-bold mt-4 text-[#1A1856]">Budaya Betawi</span>
            </Link>

            {/* Finish Node */}
            <div className="flex flex-col items-center">
               <div className={`w-[50px] h-[50px] rounded-full border-[3px] border-white text-white flex items-center justify-center relative z-10 transition-colors duration-500 ${isFinishComplete ? 'bg-[#5C31DD]' : 'bg-[#515151]'}`} style={{ boxShadow: '0 0 0 3px #D1D5E8' }}>
                 {isFinishComplete ? <Check className="w-5 h-5" strokeWidth={2.5} /> : <Flag className="w-5 h-5" strokeWidth={2.5} />}
               </div>
               <span className="text-[10px] font-bold mt-2 text-[#3A3A3A] uppercase tracking-wider">FINISH</span>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default NoeQuiz;
