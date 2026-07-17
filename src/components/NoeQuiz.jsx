import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import maskot from '../assets/noekarta-maskot.webp';
import titleImage from '../assets/noequiz-title.webp';
import component3 from '../assets/components/component3.webp';
import component5 from '../assets/components/component5.webp';

const tutorialSteps = [
  'Tekan pos aktif pertama, yaitu "Sejarah Batavia", untuk memulai permainan.',
  'Selesaikan 5 pertanyaan tipe Benar atau Salah yang tersedia di setiap pos.',
  'Jawab minimal 3 pertanyaan dengan benar untuk dapat melangkah ke tahap berikutnya.',
  'Pos berikutnya akan terbuka secara otomatis setelah Anda berhasil menyelesaikan pos sebelumnya.',
];

const TutorialModal = ({ isOpen, onClose }) => {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="tutorial-overlay"
          data-lenis-prevent="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            backgroundColor: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            key="tutorial-modal"
            initial={{ opacity: 0, scale: 0.94, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 36 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 26,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '18px',
              width: '100%',
              maxWidth: '650px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 26px 70px rgba(5, 14, 32, 0.18)',
            }}
          >
            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="px-5 py-6 sm:px-8 sm:py-7 md:px-9 md:py-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="noequiz-controller-orbit">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A4BB3] shadow-[0_8px_18px_rgba(10,75,179,0.24)]">
                      <img src={component5} alt="Controller" className="h-8 w-8 object-contain select-none" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-[20px] font-bold leading-tight text-black sm:text-[22px]">Cara Bermain</h2>
                    <div className="mt-1 inline-flex h-6 items-center rounded-full bg-[#EAF0FF] px-4">
                      <img src={titleImage} alt="NoeQuiz Explorasi" className="h-3.5 w-auto object-contain select-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <button
                    onClick={onClose}
                    aria-label="Tutup tutorial"
                    className="mt-2 rounded-full p-1 text-black transition-colors hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
                  >
                    <X className="h-5 w-5" strokeWidth={2.3} />
                  </button>
                </div>
              </div>

              <div className="my-7 h-px w-full bg-gray-100" />

              <div className="space-y-6 sm:space-y-7">
                {tutorialSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-5 sm:gap-7"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.16 + i * 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="noequiz-step-ring mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0A4BB3]/30 sm:h-9 sm:w-9"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    >
                      <div className="noequiz-step-number flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#083E93] text-[10px] font-bold text-white sm:h-[30px] sm:w-[30px] sm:text-[11px]">
                        {i + 1}
                      </div>
                    </div>
                    <p className="max-w-[430px] pt-1 text-[13px] font-semibold leading-[1.55] text-black sm:text-[14px]">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const NoeQuiz = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 md:py-24 relative">
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">

        <div className="relative flex-1 lg:max-w-[55%] flex items-end">
          <div className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-10 w-full z-10 shadow-sm">
            <div className="lg:max-w-[60%] xl:max-w-[55%]">
              <div className="flex items-center gap-4 mb-5 flex-wrap lg:flex-nowrap">
                <img src={titleImage} alt="NoeQuiz Explorasi" className="h-[32px] md:h-[38px] object-contain select-none" />
                <button
                  onClick={() => setIsTutorialOpen(true)}
                  className="bg-[#0A2E6D] hover:bg-[#0d3a8a] text-white text-xs font-semibold px-5 py-2 rounded-full tracking-wide transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.97] whitespace-nowrap"
                >
                  Tutorial!
                </button>
              </div>

              <p className="text-[#3A3A3A] text-sm md:text-[15px] leading-relaxed mb-8">
                Selesaikan Tantangan si setiap pos dengan skor minimal 3/5 benar untuk membuka pos selanjutnya. Mari taklukkan semua level!
              </p>

              <button className="bg-[#0A2E6D] hover:bg-[#0d3a8a] text-white font-semibold px-8 py-3.5 rounded-[14px] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]">
                Berikutnya!
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 -bottom-4 z-20 pointer-events-none translate-x-4 xl:translate-x-8">
            <img src={maskot} alt="Noekarta Maskot" className="h-[420px] lg:h-[460px] object-contain drop-shadow-2xl select-none origin-bottom" />
          </div>
        </div>

        <div className="flex lg:hidden justify-center -my-2 z-20 pointer-events-none">
          <img src={maskot} alt="Noekarta Maskot" className="h-[220px] object-contain drop-shadow-2xl select-none" />
        </div>

        <div className="relative bg-white border border-gray-200 rounded-[24px] p-8 md:p-10 flex-1 lg:max-w-[45%] z-10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1B3F]">Statistik Petualangan</h3>
              <div className="w-12 h-12 bg-[#0A2E6D] rounded-2xl flex items-center justify-center shadow-md">
                <img src={component3} alt="Chart" className="w-6 h-6 select-none object-contain" />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 font-medium">Total Pos Diselesaikan</span>
                <span className="text-sm font-bold text-[#0A2E6D]">0/4 Pos Selesai</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2.5 rounded-full bg-[#1455e6]"></div>
                <div className="flex-1 h-2.5 rounded-full bg-gray-200"></div>
                <div className="flex-1 h-2.5 rounded-full bg-gray-200"></div>
                <div className="flex-1 h-2.5 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="text-center flex-1">
              <p className="text-3xl md:text-4xl font-bold text-[#0A1B3F]">10</p>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">Soal Dijawab</p>
            </div>
            <div className="w-px h-14 bg-gray-200"></div>
            <div className="text-center flex-1">
              <p className="text-3xl md:text-4xl font-bold text-[#0A1B3F]">80<span className="text-xl md:text-2xl ml-0.5">%</span></p>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">Tingkat Benar</p>
            </div>
          </div>
        </div>

      </div>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </section>
  );
};

export default NoeQuiz;
