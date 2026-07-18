import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flag, LockKeyhole, MapPin, X, ArrowLeft } from 'lucide-react';
import maskot from '../assets/noekarta-maskot.webp';
import titleImage from '../assets/noequiz-title.webp';
import component3 from '../assets/components/component3.webp';
import component5 from '../assets/components/component5.webp';
import component6 from '../assets/components/component6.webp';
import component7 from '../assets/components/component7.webp';
import logoNoekarta from '../assets/logo-noekarta.webp';
import quizBackground from '../assets/background-noequiz.webp';

const stations = [
  {
    title: 'Sejarah Batavia',
  },
  {
    title: 'Budaya Betawi',
  },
  {
    title: 'Kuliner Khas',
  },
  {
    title: 'Landmark Jakarta',
  },
];

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

const QuizModal = ({ station, onClose, onAnswer, onFinish }) => {
  const [modalState, setModalState] = useState('confirm'); // 'confirm', 'countdown', 'quiz'
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isTextLarge, setIsTextLarge] = useState(false);

  // Stop Lenis & lock body scroll when modal is open
  useEffect(() => {
    if (station) {
      if (window.lenis) window.lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        if (window.lenis) window.lenis.start();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }
  }, [station]);

  // Dummy question
  const dummyQuestion = {
    title: station?.title || "Sejarah Batavia",
    text: "Lorem ipsum dolor sit amet, adipiscing in proident dolore aute qui. Quis eu sunt minim aliqua ............ deserunt non exercitation do ullamco.",
    options: [
      { id: 1, text: "Lorep Dolor gg", isCorrect: true },
      { id: 2, text: "Lorep Dolor gg", isCorrect: false },
      { id: 3, text: "Lorep Dolor gg", isCorrect: false },
      { id: 4, text: "Lorep Dolor gg", isCorrect: false },
    ]
  };

  useEffect(() => {
    if (modalState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setModalState('quiz');
      }
    }
  }, [modalState, countdown]);

  useEffect(() => {
    if (modalState === 'quiz' && !hasSubmitted) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Auto submit if time runs out
        setHasSubmitted(true);
        if (selectedOption) {
          onAnswer(dummyQuestion.options.find(o => o.id === selectedOption)?.isCorrect || false);
        } else {
          onAnswer(false);
        }
      }
    }
  }, [modalState, timeLeft, hasSubmitted, selectedOption, onAnswer, dummyQuestion.options]);

  if (!station) return null;

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 20) * circumference;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#061333]/60 p-4 backdrop-blur-sm"
        data-lenis-prevent="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`relative w-full bg-[#F8F9FA] shadow-2xl ${modalState === 'quiz' ? 'max-w-[660px] max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-[28px]' : 'max-w-md overflow-hidden rounded-[24px]'}`}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {modalState === 'confirm' && (
            <div className="p-8 text-center bg-white">
              <h3 className="mb-8 text-2xl font-bold text-[#0A1B3F]">Apakah anda sudah siap?</h3>
              <div className="flex justify-center gap-4">
                <button onClick={onClose} className="w-32 rounded-full border-2 border-slate-300 py-3 font-bold text-slate-600 transition hover:bg-slate-100 cursor-pointer">
                  Tidak
                </button>
                <button onClick={() => setModalState('countdown')} className="w-32 rounded-full bg-[#0A4BB3] py-3 font-bold text-white transition hover:bg-[#083E93] cursor-pointer">
                  Iya
                </button>
              </div>
            </div>
          )}

          {modalState === 'countdown' && (
            <div className="flex h-64 items-center justify-center bg-white p-8">
              <motion.div
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="text-8xl font-black text-[#0A4BB3]"
              >
                {countdown > 0 ? countdown : 'GO!'}
              </motion.div>
            </div>
          )}

          {modalState === 'quiz' && (
            <div className="flex flex-col min-h-0 bg-white rounded-[28px]">
              {/* Layer 2: Dark blue container (inside white card) */}
              <div
                className="relative flex h-[140px] sm:h-[150px] flex-col px-6 pt-5 sm:px-8 mx-2 mt-2 sm:mx-3 sm:mt-3"
                style={{
                  backgroundColor: '#111A5A',
                  backgroundImage: `url(${component7})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '24px',
                }}
              >
                <div className="flex items-center justify-between">
                  <button onClick={onClose} className="rounded-full p-2 text-white transition hover:bg-white/20 cursor-pointer">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => setIsTextLarge(!isTextLarge)} className="flex items-center justify-center p-2 text-white transition hover:bg-white/20 cursor-pointer">
                    <img src={component6} alt="Text Size" className="h-5 w-auto object-contain brightness-0 invert" />
                  </button>
                </div>
              </div>

              {/* Layer 3: Question card overlapping the blue container */}
              <div className="relative z-10 -mt-12 mx-4 sm:mx-6">
                {/* Timer Circle - anchored to the top of the question card */}
                <div className="absolute -top-10 left-1/2 flex h-[80px] w-[80px] -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md z-20">
                  <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                    <circle
                      cx="40" cy="40" r="34" fill="none" stroke="#111A5A" strokeWidth="4.5"
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={(2 * Math.PI * 34) - (timeLeft / 20) * (2 * Math.PI * 34)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="relative text-lg font-bold text-[#111A5A]">{timeLeft}</span>
                </div>

                <div className="rounded-[18px] bg-white p-5 pt-12 sm:p-6 sm:pt-12 shadow-sm border border-gray-100">
                  <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <img src={logoNoekarta} alt="Noekarta" className="h-6 w-auto object-contain" />
                      <div className="h-3.5 w-px bg-gray-300 mx-1.5"></div>
                      <img src={component5} alt="Logo 2" className="h-3.5 w-auto object-contain" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#111A5A]">Question 1/5</span>
                  </div>

                  <div className="text-center">
                    <h3 className={`mb-2 font-bold text-[#111A5A] transition-all ${isTextLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>{dummyQuestion.title}</h3>
                    <p className={`font-medium leading-relaxed text-gray-700 transition-all ${isTextLarge ? 'text-[15px] sm:text-[16px]' : 'text-[13px] sm:text-[14px]'}`}>
                      {dummyQuestion.text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Options & Submit - white area */}
              <div className="px-4 pb-6 pt-4 sm:px-6">
                <div className="space-y-2.5">
                  {dummyQuestion.options.map((option) => {
                    let optionStyle = "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800";
                    let showIcon = null;

                    if (hasSubmitted) {
                      if (option.isCorrect) {
                        optionStyle = "border-green-500 bg-white text-gray-800 shadow-sm";
                        showIcon = <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500"><Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} /></div>;
                      } else if (selectedOption === option.id) {
                        optionStyle = "border-red-500 bg-white text-gray-800 shadow-sm";
                        showIcon = <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500"><X className="h-3.5 w-3.5 text-white" strokeWidth={3.5} /></div>;
                      } else {
                        optionStyle = "border-gray-200 bg-white text-gray-800 opacity-60";
                      }
                    } else if (selectedOption === option.id) {
                      optionStyle = "border-[#0A4BB3] bg-white text-gray-800";
                    }

                    return (
                      <button
                        key={option.id}
                        disabled={hasSubmitted}
                        onClick={() => setSelectedOption(option.id)}
                        className={`flex w-full items-center justify-between rounded-[14px] border-2 px-5 py-3 text-left transition-all cursor-pointer ${optionStyle}`}
                      >
                        <span className={`font-semibold transition-all ${isTextLarge ? 'text-base' : 'text-sm'}`}>{option.text}</span>
                        {hasSubmitted && showIcon ? (
                          showIcon
                        ) : (
                          <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedOption === option.id ? 'border-[#0A4BB3]' : 'border-gray-300'}`}>
                            {selectedOption === option.id && <div className="h-2.5 w-2.5 rounded-full bg-[#0A4BB3]"></div>}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Button */}
                <button
                  disabled={!selectedOption && !hasSubmitted}
                  onClick={() => {
                    if (!hasSubmitted) {
                      setHasSubmitted(true);
                      onAnswer(dummyQuestion.options.find(o => o.id === selectedOption)?.isCorrect || false);
                    } else {
                      onFinish(1); // dummy close/finish
                    }
                  }}
                  className={`mt-5 w-full rounded-[12px] py-3 text-sm font-bold text-white transition ${(!selectedOption && !hasSubmitted)
                      ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                      : 'bg-[#0A4BB3] hover:bg-[#083E93] shadow-md cursor-pointer'
                    }`}
                >
                  Kirim
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

const NoeQuiz = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [completedStations, setCompletedStations] = useState([]);
  const [answersGiven, setAnswersGiven] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const completedCount = completedStations.length;
  const accuracy = answersGiven ? Math.round((correctAnswers / answersGiven) * 100) : 0;
  const posData = stations.map((station, index) => ({
    id: index + 1,
    name: station.title,
    isLocked: index > 0 && !completedStations.includes(index - 1),
    isCompleted: completedStations.includes(index),
  }));

  const finishStation = () => {
    const stationIndex = activeStation;
    setCompletedStations((completed) => completed.includes(stationIndex) ? completed : [...completed, stationIndex]);
    setActiveStation(null);
  };

  const recordAnswer = (isCorrect) => {
    setAnswersGiven((total) => total + 1);
    setCorrectAnswers((total) => total + Number(isCorrect));
  };

  const openStation = (stationIndex) => {
    setActiveStation(stationIndex);
  };

  return (
    <section
      className="relative mx-auto max-w-auto overflow-visible rounded-[30px] bg-[#EEF3FF] p-4 md:p-5"
      style={{ backgroundImage: `linear-gradient(rgba(241, 245, 255, 0.34), rgba(241, 245, 255, 0.48)), url(${quizBackground})`, backgroundPosition: 'center', backgroundSize: '100% 100%' }}
    >
      <div className="w-full flex flex-col mt-18 lg:flex-row items-stretch gap-6 lg:gap-8">

        <div className="relative flex-1 lg:max-w-[55%] flex items-end">
          <div className="bg-white  rounded-[24px] p-8 md:p-10 w-full z-10 shadow-sm">
            <div className="lg:max-w-[60%] xl:max-w-[55%]">
              <div className="flex items-center gap-4 mb-5 flex-wrap lg:flex-nowrap">
                <img src={titleImage} alt="NoeQuiz Explorasi" className="h-[32px] md:h-[38px] object-contain select-none" />
              </div>

              <p className="text-[#3A3A3A] text-sm md:text-[15px] leading-relaxed mb-8">
                Selesaikan Tantangan di setiap pos dengan skor minimal 3/5 benar untuk membuka pos selanjutnya. Mari taklukkan semua level!
              </p>

              <button
                onClick={() => setIsTutorialOpen(true)}
                className="bg-[#0A2E6D] hover:bg-[#0d3a8a] text-white font-semibold sm:px-18 lg:px-14 xl:px-24 py-1 rounded-full transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]">
                Tutorial!
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 -bottom-4 z-30 pointer-events-none translate-x-4 xl:translate-x-8">
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
                <span className="text-sm font-bold text-[#0A2E6D]">{completedCount}/4 Pos Selesai</span>
              </div>
              <div className="flex gap-2">
                {stations.map((station, index) => (
                  <div key={station.title} className={`h-2.5 flex-1 rounded-full transition-colors duration-500 ${completedStations.includes(index) ? 'bg-[#1455e6]' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="text-center flex-1">
              <p className="text-3xl md:text-4xl font-bold text-[#0A1B3F]">{answersGiven}</p>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">Soal Dijawab</p>
            </div>
            <div className="w-px h-14 bg-gray-200"></div>
            <div className="text-center flex-1">
              <p className="text-3xl md:text-4xl font-bold text-[#0A1B3F]">{accuracy}<span className="text-xl md:text-2xl ml-0.5">%</span></p>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">Tingkat Benar</p>
            </div>
          </div>
        </div>

      </div>

      <div
        className="relative mt-8 h-[620px] overflow-hidden md:h-[720px]"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
          {[
            'M200 86 C 330 38, 675 48, 800 140',
            'M800 140 C 858 208, 565 244, 200 255',
            'M200 255 C 96 330, 475 396, 720 371',
            'M720 371 C 860 438, 535 500, 270 483',
            'M270 483 C 155 568, 594 618, 800 535',
          ].map((path, index) => {
            const targetPos = posData[index];
            const isSolid = targetPos ? !targetPos.isLocked : posData.at(-1).isCompleted;

            return <path key={path} d={path} fill="none" stroke={isSolid ? '#3522E7' : '#1F2937'} strokeWidth="2.8" strokeLinecap="round" strokeDasharray={isSolid ? '0' : '8 11'} className="transition-all duration-500" />;
          })}
        </svg>

        <div className="absolute left-[20%] top-[9%] z-20 flex -translate-x-1/2 flex-col items-center">
          <div className="flex h-13 w-13 items-center justify-center rounded-full border-4 border-white bg-[#272C39] text-white shadow-lg"><Flag className="h-5 w-5" /></div>
          <span className="mt-2 text-[10px] font-bold text-[#0A1B3F]">MULAI</span>
        </div>

        {posData.map((pos, index) => {
          const positions = ['left-[80%] top-[17%]', 'left-[20%] top-[34%]', 'left-[72%] top-[50%]', 'left-[27%] top-[66%]'];
          const labelPositions = ['right-[calc(100%+14px)] top-1/2 -translate-y-1/2 text-right', 'left-[calc(100%+14px)] top-1/2 -translate-y-1/2 text-left', 'left-[calc(100%+14px)] top-1/2 -translate-y-1/2 text-left', 'left-1/2 top-[calc(100%+12px)] -translate-x-1/2 text-center'];
          const isUnlocked = !pos.isLocked;

          return (
            <motion.button
              key={pos.id}
              type="button"
              onClick={() => isUnlocked && openStation(index)}
              disabled={!isUnlocked}
              whileHover={isUnlocked ? { scale: 1.04 } : undefined}
              whileTap={isUnlocked ? { scale: 0.97 } : undefined}
              aria-label={`${pos.name}${isUnlocked ? ', buka pos' : ', terkunci'}`}
              className={`absolute z-20 flex -translate-x-1/2 flex-col items-center text-center ${positions[index]} ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <span className={`relative flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-white shadow-[0_7px_18px_rgba(24,54,124,0.28)] transition-colors md:h-[66px] md:w-[66px] ${pos.isCompleted ? 'bg-[#2F1FE4] text-white ring-4 ring-[#B6AEFF]/80' : isUnlocked ? 'bg-[#0A4BB3] text-white ring-4 ring-[#9CC0FF]/70' : 'bg-[#62646B] text-white'}`}>
                {isUnlocked && !pos.isCompleted && <><i className="absolute -inset-3 rounded-full border-2 border-[#2D7EFF]/70 animate-ping" /><i className="absolute -inset-6 rounded-full border border-[#6EA9FF]/50 animate-[pulse_1.8s_ease-in-out_infinite]" /></>}
                {pos.isCompleted ? <Check className="h-7 w-7" strokeWidth={3} /> : pos.isLocked ? <LockKeyhole className="h-6 w-6" /> : <MapPin className="h-7 w-7" fill="currentColor" />}
              </span>
              <span className={`absolute w-[112px] ${labelPositions[index]}`}>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ${pos.isCompleted ? 'bg-[#E6E2FF] text-[#2F1FE4]' : isUnlocked ? 'bg-white/90 text-[#0A4BB3]' : 'bg-slate-200/80 text-slate-500'}`}>{pos.isCompleted ? 'Selesai' : isUnlocked ? 'Aktif' : 'Terkunci'}</span>
                <span className={`mt-1 block text-xs font-bold leading-tight ${pos.isLocked ? 'text-slate-600' : 'text-[#0A1B3F]'}`}>{pos.name}</span>
              </span>
            </motion.button>
          );
        })}

        <div className="absolute left-[80%] top-[73%] z-20 flex -translate-x-1/2 flex-col items-center">
          <div className={`flex h-13 w-13 items-center justify-center rounded-full border-4 border-white text-white shadow-lg transition-colors ${posData.at(-1).isCompleted ? 'bg-[#3522E7] ring-4 ring-[#B6AEFF]/80' : 'bg-[#272C39]'}`}>
            {posData.at(-1).isCompleted ? <Check className="h-5 w-5" strokeWidth={3} /> : <Flag className="h-5 w-5" />}
          </div>
          <span className="mt-2 text-[10px] font-bold text-[#0A1B3F]">SELESAI</span>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex w-[min(92%,360px)] -translate-x-1/2 items-center justify-center gap-5 rounded-full border border-[#E3E8F5] bg-white/95 px-4 py-3 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur">
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#0A4BB3]" />Aktif</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#62646B]" />Terkunci</span>
          <span className="flex items-center gap-1.5"><i className="flex h-3 w-3 items-center justify-center rounded-full bg-[#2F1FE4] text-[8px] text-white">✓</i>Selesai</span>
        </div>
      </div>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
      <QuizModal key={activeStation ?? 'closed'} station={activeStation === null ? null : stations[activeStation]} onClose={() => setActiveStation(null)} onAnswer={recordAnswer} onFinish={finishStation} />
    </section>
  );
};

export default NoeQuiz;
