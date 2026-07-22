import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flag, LockKeyhole, X, ArrowLeft, ChevronLeft, Globe, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import maskot from '../assets/noekarta-maskot.webp';
import titleImage from '../assets/noequiz-title.webp';
import component3 from '../assets/components/component3.webp';
import component5 from '../assets/components/component5.webp';
import component6 from '../assets/components/component6.webp';
import component7 from '../assets/components/component7.webp';
import logoNoekarta from '../assets/logo-noekarta1.webp';

import component8 from '../assets/components/component8.webp';
import component9 from '../assets/components/component9.webp';
import component10 from '../assets/components/component10.webp';
import component11 from '../assets/components/component11.webp';

const stationIcons = [component8, component9, component10, component11];

const stations = [
  { title: 'Sejarah Batavia', title_en: 'Batavia History' },
  { title: 'Budaya Betawi', title_en: 'Betawi Culture' },
  { title: 'Kuliner Khas', title_en: 'Authentic Culinary' },
  { title: 'Landmark Jakarta', title_en: 'Jakarta Landmarks' },
];

// 5 soal per pos — setiap soal: { text, options: [{id, text, isCorrect}] }
const quizData = [
  // Pos 0 — Sejarah Batavia
  [
    {
      text: 'Pelabuhan utama Batavia yang menjadi pusat perdagangan rempah-rempah VOC pada abad ke-17 adalah...',
      text_en: 'The primary port of Batavia that served as the VOC spice trading hub in the 17th century was...',
      options: [
        { id: 1, text: 'Pelabuhan Sunda Kelapa', text_en: 'Sunda Kelapa Port', isCorrect: true },
        { id: 2, text: 'Pelabuhan Tanjung Priok', text_en: 'Tanjung Priok Port', isCorrect: false },
        { id: 3, text: 'Pelabuhan Merak', text_en: 'Merak Port', isCorrect: false },
        { id: 4, text: 'Pelabuhan Cilincing', text_en: 'Cilincing Port', isCorrect: false },
      ],
    },
    {
      text: 'Jan Pieterszoon Coen mendirikan Batavia pada tahun...',
      text_en: 'Jan Pieterszoon Coen established Batavia in the year...',
      options: [
        { id: 1, text: '1619', text_en: '1619', isCorrect: true },
        { id: 2, text: '1602', text_en: '1602', isCorrect: false },
        { id: 3, text: '1645', text_en: '1645', isCorrect: false },
        { id: 4, text: '1682', text_en: '1682', isCorrect: false },
      ],
    },
    {
      text: 'Nama "Jayakarta" diganti menjadi "Batavia" oleh...',
      text_en: 'The name "Jayakarta" was changed to "Batavia" by...',
      options: [
        { id: 1, text: 'VOC (Belanda)', text_en: 'VOC (Dutch)', isCorrect: true },
        { id: 2, text: 'Portugis', text_en: 'Portuguese', isCorrect: false },
        { id: 3, text: 'Inggris', text_en: 'British', isCorrect: false },
        { id: 4, text: 'Kerajaan Banten', text_en: 'Banten Kingdom', isCorrect: false },
      ],
    },
    {
      text: 'Kota Tua Jakarta dulunya merupakan pusat pemerintahan yang dikenal dengan nama...',
      text_en: 'Jakarta Old Town was historically an administrative center known as...',
      options: [
        { id: 1, text: 'Batavia', text_en: 'Batavia', isCorrect: true },
        { id: 2, text: 'Sunda Kelapa', text_en: 'Sunda Kelapa', isCorrect: false },
        { id: 3, text: 'Weltevreden', text_en: 'Weltevreden', isCorrect: false },
        { id: 4, text: 'Ommelanden', text_en: 'Ommelanden', isCorrect: false },
      ],
    },
    {
      text: 'Fatahillah mengubah nama Sunda Kelapa menjadi Jayakarta pada tanggal...',
      text_en: 'Fatahillah renamed Sunda Kelapa to Jayakarta on...',
      options: [
        { id: 1, text: '22 Juni 1527', text_en: 'June 22, 1527', isCorrect: true },
        { id: 2, text: '17 Agustus 1945', text_en: 'August 17, 1945', isCorrect: false },
        { id: 3, text: '4 Maret 1621', text_en: 'March 4, 1621', isCorrect: false },
        { id: 4, text: '1 Januari 1600', text_en: 'January 1, 1600', isCorrect: false },
      ],
    },
  ],
  // Pos 1 — Budaya Betawi
  [
    {
      text: 'Tari tradisional Betawi yang sering ditampilkan dalam penyambutan tamu kehormatan adalah...',
      text_en: 'Traditional Betawi dance frequently performed to welcome honored guests is...',
      options: [
        { id: 1, text: 'Tari Topeng Betawi', text_en: 'Betawi Mask Dance', isCorrect: true },
        { id: 2, text: 'Tari Kecak', text_en: 'Kecak Dance', isCorrect: false },
        { id: 3, text: 'Tari Saman', text_en: 'Saman Dance', isCorrect: false },
        { id: 4, text: 'Tari Jaipong', text_en: 'Jaipong Dance', isCorrect: false },
      ],
    },
    {
      text: 'Alat musik gesek Betawi yang mendapat pengaruh dari budaya Tionghoa adalah...',
      text_en: 'Traditional Betawi bowed string instrument influenced by Chinese culture is...',
      options: [
        { id: 1, text: 'Tehyan', text_en: 'Tehyan', isCorrect: true },
        { id: 2, text: 'Rebab', text_en: 'Rebab', isCorrect: false },
        { id: 3, text: 'Kecapi', text_en: 'Kecapi', isCorrect: false },
        { id: 4, text: 'Biola', text_en: 'Violin', isCorrect: false },
      ],
    },
    {
      text: 'Kesenian pertunjukan Betawi yang memadukan seni musik, lagu, dan lawak disebut...',
      text_en: 'Betawi performing art combining music, songs, and comedy is called...',
      options: [
        { id: 1, text: 'Lenong', text_en: 'Lenong', isCorrect: true },
        { id: 2, text: 'Ludruk', text_en: 'Ludruk', isCorrect: false },
        { id: 3, text: 'Ketoprak', text_en: 'Ketoprak', isCorrect: false },
        { id: 4, text: 'Wayang Kulit', text_en: 'Wayang Kulit', isCorrect: false },
      ],
    },
    {
      text: 'Pakaian adat pengantin pria Betawi disebut...',
      text_en: 'Traditional Betawi groom wedding attire is named...',
      options: [
        { id: 1, text: 'Dandanan Care Haji', text_en: 'Dandanan Care Haji', isCorrect: true },
        { id: 2, text: 'Baju Koko', text_en: 'Baju Koko', isCorrect: false },
        { id: 3, text: 'Beskap', text_en: 'Beskap', isCorrect: false },
        { id: 4, text: 'Teluk Belanga', text_en: 'Teluk Belanga', isCorrect: false },
      ],
    },
    {
      text: 'Senjata tradisional khas Betawi yang berbentuk seperti sabit adalah...',
      text_en: 'Iconic traditional Betawi machete-like weapon is...',
      options: [
        { id: 1, text: 'Golok', text_en: 'Golok', isCorrect: true },
        { id: 2, text: 'Keris', text_en: 'Keris', isCorrect: false },
        { id: 3, text: 'Mandau', text_en: 'Mandau', isCorrect: false },
        { id: 4, text: 'Rencong', text_en: 'Rencong', isCorrect: false },
      ],
    },
  ],
  // Pos 2 — Kuliner Khas
  [
    {
      text: 'Kuah Soto Betawi yang kental dan gurih terbuat dari campuran...',
      text_en: 'Rich and savory Soto Betawi broth is made from a mixture of...',
      options: [
        { id: 1, text: 'Santan dan Susu', text_en: 'Coconut milk and milk', isCorrect: true },
        { id: 2, text: 'Kaldu dan Kecap', text_en: 'Broth and soy sauce', isCorrect: false },
        { id: 3, text: 'Kacang dan Tauco', text_en: 'Peanuts and tauco', isCorrect: false },
        { id: 4, text: 'Kelapa dan Terasi', text_en: 'Coconut and shrimp paste', isCorrect: false },
      ],
    },
    {
      text: 'Kue tradisional Betawi yang berwarna hijau berbahan dasar tepung beras dan daun pandan adalah...',
      text_en: 'Traditional green Betawi cake made from rice flour and pandan leaves is...',
      options: [
        { id: 1, text: 'Kue Cucur', text_en: 'Kue Cucur', isCorrect: true },
        { id: 2, text: 'Kue Lapis', text_en: 'Kue Lapis', isCorrect: false },
        { id: 3, text: 'Kue Putu', text_en: 'Kue Putu', isCorrect: false },
        { id: 4, text: 'Klepon', text_en: 'Klepon', isCorrect: false },
      ],
    },
    {
      text: 'Minuman khas Betawi berbahan dasar kelapa muda yang sering disajikan saat Lebaran adalah...',
      text_en: 'Iconic iced Betawi dessert made with coconut milk and often served during Eid is...',
      options: [
        { id: 1, text: 'Es Selendang Mayang', text_en: 'Es Selendang Mayang', isCorrect: true },
        { id: 2, text: 'Es Cendol', text_en: 'Es Cendol', isCorrect: false },
        { id: 3, text: 'Es Dawet', text_en: 'Es Dawet', isCorrect: false },
        { id: 4, text: 'Es Campur', text_en: 'Es Campur', isCorrect: false },
      ],
    },
    {
      text: 'Makanan Betawi berupa potongan lontong dengan bumbu kacang dan sayuran disebut...',
      text_en: 'Betawi dish consisting of rice cake, tofu, vermicelli, and peanut sauce is...',
      options: [
        { id: 1, text: 'Gado-gado', text_en: 'Gado-gado', isCorrect: true },
        { id: 2, text: 'Ketoprak', text_en: 'Ketoprak', isCorrect: false },
        { id: 3, text: 'Lotek', text_en: 'Lotek', isCorrect: false },
        { id: 4, text: 'Pecel', text_en: 'Pecel', isCorrect: false },
      ],
    },
    {
      text: 'Kerak telor adalah makanan khas Betawi yang dimasak menggunakan...',
      text_en: 'Kerak Telor is a traditional Betawi dish uniquely cooked by...',
      options: [
        { id: 1, text: 'Wajan dibalik di atas bara arang', text_en: 'Flipping the pan over charcoal', isCorrect: true },
        { id: 2, text: 'Kukusan bambu', text_en: 'Bamboo steamer', isCorrect: false },
        { id: 3, text: 'Oven tradisional', text_en: 'Traditional oven', isCorrect: false },
        { id: 4, text: 'Wajan biasa di kompor', text_en: 'Regular pan on stove', isCorrect: false },
      ],
    },
  ],
  // Pos 3 — Landmark Jakarta
  [
    {
      text: 'Monumen Nasional (Monas) dibangun untuk memperingati...',
      text_en: 'The National Monument (Monas) was built to commemorate...',
      options: [
        { id: 1, text: 'Perjuangan kemerdekaan Indonesia', text_en: "Indonesia's independence struggle", isCorrect: true },
        { id: 2, text: 'Kemenangan Fatahillah', text_en: 'Fatahillah victory', isCorrect: false },
        { id: 3, text: 'Pembebasan Irian Barat', text_en: 'West Irian liberation', isCorrect: false },
        { id: 4, text: 'Proklamasi Soekarno-Hatta', text_en: 'Soekarno-Hatta proclamation', isCorrect: false },
      ],
    },
    {
      text: 'Patung yang dibangun untuk memperingati pembebasan Irian Barat adalah Patung...',
      text_en: 'The statue built to commemorate the liberation of West Irian is...',
      options: [
        { id: 1, text: 'Patung Pembebasan (Patung Dirgantara)', text_en: 'Dirgantara Statue', isCorrect: false },
        { id: 2, text: 'Patung Pemuda Membangun', text_en: 'Youth Monument', isCorrect: false },
        { id: 3, text: 'Patung Selamat Datang', text_en: 'Welcome Monument', isCorrect: false },
        { id: 4, text: 'Patung Pembebasan Irian Barat', text_en: 'West Irian Liberation Statue', isCorrect: true },
      ],
    },
    {
      text: 'Museum Fatahillah atau Museum Sejarah Jakarta berlokasi di kawasan...',
      text_en: 'Fatahillah Museum or Jakarta History Museum is located in...',
      options: [
        { id: 1, text: 'Kota Tua Jakarta', text_en: 'Jakarta Old Town (Kota Tua)', isCorrect: true },
        { id: 2, text: 'Menteng', text_en: 'Menteng', isCorrect: false },
        { id: 3, text: 'Kebayoran Baru', text_en: 'Kebayoran Baru', isCorrect: false },
        { id: 4, text: 'Kemang', text_en: 'Kemang', isCorrect: false },
      ],
    },
    {
      text: 'Taman Mini Indonesia Indah (TMII) terletak di wilayah...',
      text_en: 'Taman Mini Indonesia Indah (TMII) is located in...',
      options: [
        { id: 1, text: 'Jakarta Timur', text_en: 'East Jakarta', isCorrect: true },
        { id: 2, text: 'Jakarta Selatan', text_en: 'South Jakarta', isCorrect: false },
        { id: 3, text: 'Jakarta Barat', text_en: 'West Jakarta', isCorrect: false },
        { id: 4, text: 'Jakarta Utara', text_en: 'North Jakarta', isCorrect: false },
      ],
    },
    {
      text: 'Kebun Binatang tertua di Jakarta yang masih beroperasi hingga kini adalah...',
      text_en: 'The oldest operating zoo in Jakarta to this day is...',
      options: [
        { id: 1, text: 'Kebun Binatang Ragunan', text_en: 'Ragunan Zoo', isCorrect: true },
        { id: 2, text: 'Kebun Binatang Gembira Loka', text_en: 'Gembira Loka Zoo', isCorrect: false },
        { id: 3, text: 'Taman Safari', text_en: 'Taman Safari', isCorrect: false },
        { id: 4, text: 'Ancol Dreamland', text_en: 'Ancol Dreamland', isCorrect: false },
      ],
    },
  ],
];

const tutorialStepsId = [
  'Tekan pos aktif pertama, yaitu "Sejarah Batavia", untuk memulai permainan.',
  'Selesaikan 5 pertanyaan tipe Benar atau Salah yang tersedia di setiap pos.',
  'Jawab minimal 3 pertanyaan dengan benar untuk dapat melangkah ke tahap berikutnya.',
  'Pos berikutnya akan terbuka secara otomatis setelah Anda berhasil menyelesaikan pos sebelumnya.',
];

const tutorialStepsEn = [
  'Tap the first active station, "Batavia History", to start the game.',
  'Complete 5 multiple-choice questions available at each station.',
  'Answer at least 3 questions correctly to proceed to the next stage.',
  'The next station will automatically unlock after you successfully complete the previous one.',
];

const TutorialModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const steps = language === 'en' ? tutorialStepsEn : tutorialStepsId;

  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      if (window.lenis) window.lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (window.lenis) window.lenis.start();
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
                    <h2 className="text-[20px] font-bold leading-tight text-black sm:text-[22px]">{language === 'en' ? 'How to Play' : 'Cara Bermain'}</h2>
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
                {steps.map((step, i) => (
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

const TOTAL_QUESTIONS = 5;
const PASS_THRESHOLD = 3;
const TIME_PER_QUESTION = 20;

const QuizModal = ({ stationIndex, station, onClose, onFinish }) => {
  const { language } = useLanguage();
  const [modalState, setModalState] = useState('confirm'); // 'confirm' | 'countdown' | 'quiz' | 'result'
  const [countdown, setCountdown] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isTextLarge, setIsTextLarge] = useState(false);

  const questions = quizData[stationIndex] ?? quizData[0];
  const currentQuestion = questions[currentQuestionIndex];
  const isPassed = correctCount >= PASS_THRESHOLD;

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

  // Countdown timer
  useEffect(() => {
    if (modalState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        const t = setTimeout(() => setModalState('quiz'), 0);
        return () => clearTimeout(t);
      }
    }
  }, [modalState, countdown]);

  const handleSubmit = (isTimeout = false) => {
    if (hasSubmitted) return;
    setHasSubmitted(true);
    const isCorrect = isTimeout
      ? false
      : (currentQuestion.options.find(o => o.id === selectedOption)?.isCorrect ?? false);
    if (isCorrect) setCorrectCount(prev => prev + 1);
  };

  // Per-question timer
  useEffect(() => {
    if (modalState !== 'quiz' || hasSubmitted) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Time's up — treat as wrong answer
      const t = setTimeout(() => handleSubmit(true), 0);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState, timeLeft, hasSubmitted]);

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= TOTAL_QUESTIONS) {
      setModalState('result');
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setHasSubmitted(false);
      setTimeLeft(TIME_PER_QUESTION);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setCorrectCount(0);
    setTimeLeft(TIME_PER_QUESTION);
    setCountdown(3);
    setModalState('countdown');
  };

  if (!station) return null;

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
          className={`relative w-full bg-[#F8F9FA] shadow-2xl ${
            modalState === 'quiz'
              ? 'max-w-[660px] max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-[28px]'
              : 'max-w-md overflow-hidden rounded-[24px]'
          }`}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── CONFIRM ── */}
          {modalState === 'confirm' && (
            <div className="flex flex-col bg-white text-center">
              <div
                className="w-full h-[140px] relative"
                style={{
                  backgroundColor: '#111A5A',
                  backgroundImage: `url(${component7})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0]">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[30px] fill-white block">
                    <path d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z" className="fill-white" />
                  </svg>
                </div>
              </div>
              <div className="relative z-10 flex justify-center -mt-[56px]">
                <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-white">
                  <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#EDF2FF] relative">
                    <div className="absolute inset-1 rounded-full border-[2.5px] border-dashed border-[#111A5A] opacity-40 animate-[spin_8s_linear_infinite]" />
                    <div
                      className="flex h-[76px] w-[76px] items-center justify-center rounded-full relative overflow-hidden z-10"
                      style={{ backgroundColor: '#111A5A', backgroundImage: `url(${component7})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <span className="text-white text-[40px] font-bold relative z-10 leading-none">?</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8 pt-4">
                <h3 className="text-[28px] font-bold text-[#0A1B3F] mb-1">{language === 'en' ? 'Ready?' : 'Siap?'}</h3>
                <p className="text-[#3A3A3A] font-medium mb-2 text-[14px]">
                  {language === 'en' ? (station.title_en || station.title) : station.title}
                </p>
                <p className="text-[#6B7280] text-[13px] mb-8">
                  {language === 'en' ? (
                    <>Answer at least <span className="font-bold text-[#111A5A]">{PASS_THRESHOLD} out of {TOTAL_QUESTIONS}</span> questions correctly to proceed to the next station.</>
                  ) : (
                    <>Jawab minimal <span className="font-bold text-[#111A5A]">{PASS_THRESHOLD} dari {TOTAL_QUESTIONS}</span> soal dengan benar untuk lanjut ke pos berikutnya.</>
                  )}
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setModalState('countdown')} className="flex-1 rounded-[14px] bg-[#111A5A] py-3.5 text-[15px] font-bold text-white transition hover:bg-[#083E93] shadow-[0_8px_20px_rgba(10,27,63,0.15)] cursor-pointer">
                    {language === 'en' ? 'Yes, Ready!' : 'Iya, Siap!'}
                  </button>
                  <button onClick={onClose} className="flex-1 rounded-[14px] border-[2px] border-[#111A5A] bg-white py-3.5 text-[15px] font-bold text-[#111A5A] transition hover:bg-slate-50 cursor-pointer">
                    {language === 'en' ? 'No' : 'Tidak'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── COUNTDOWN ── */}
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

          {/* ── QUIZ ── */}
          {modalState === 'quiz' && currentQuestion && (
            <div className="flex flex-col min-h-0 bg-white rounded-[28px]">
              {/* Dark blue header */}
              <div
                className="relative flex h-[140px] sm:h-[150px] flex-col px-6 pt-5 sm:px-8 mx-2 mt-2 sm:mx-3 sm:mt-3"
                style={{ backgroundColor: '#111A5A', backgroundImage: `url(${component7})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '24px' }}
              >
                <div className="flex items-center justify-between">
                  <button onClick={onClose} className="rounded-full p-2 text-white transition hover:bg-white/20 cursor-pointer">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  {/* Question progress dots */}
                  <div className="flex items-center gap-1.5">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                          i < currentQuestionIndex
                            ? 'w-2 h-2 bg-green-400'
                            : i === currentQuestionIndex
                            ? 'w-3 h-3 bg-white'
                            : 'w-2 h-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <button onClick={() => setIsTextLarge(!isTextLarge)} className="flex items-center justify-center p-2 text-white transition hover:bg-white/20 cursor-pointer">
                    <img src={component6} alt="Text Size" className="h-5 w-auto object-contain brightness-0 invert" />
                  </button>
                </div>
              </div>

              {/* Question card */}
              <div className="relative z-10 -mt-12 mx-4 sm:mx-6">
                {/* Timer circle */}
                <div className="absolute -top-10 left-1/2 flex h-[80px] w-[80px] -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md z-20">
                  <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke={timeLeft <= 5 ? '#EF4444' : '#111A5A'}
                      strokeWidth="4.5"
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={(2 * Math.PI * 34) - (timeLeft / TIME_PER_QUESTION) * (2 * Math.PI * 34)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className={`relative text-lg font-bold transition-colors ${timeLeft <= 5 ? 'text-red-500' : 'text-[#111A5A]'}`}>{timeLeft}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-[18px] bg-white p-5 pt-12 sm:p-6 sm:pt-12 shadow-sm border border-gray-100"
                  >
                    <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <img src={logoNoekarta} alt="Noekarta" className="h-6 w-auto object-contain" />
                        <div className="h-3.5 w-px bg-gray-300 mx-1.5" />
                        <img src={component5} alt="Logo 2" className="h-3.5 w-auto object-contain" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#111A5A]">
                        {language === 'en' ? 'Question' : 'Soal'} {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className={`mb-2 font-bold text-[#111A5A] transition-all ${isTextLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                        {language === 'en' ? (station.title_en || station.title) : station.title}
                      </h3>
                      <p className={`font-medium leading-relaxed text-gray-700 transition-all ${isTextLarge ? 'text-[15px] sm:text-[16px]' : 'text-[13px] sm:text-[14px]'}`}>
                        {language === 'en' ? (currentQuestion.text_en || currentQuestion.text) : currentQuestion.text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Options & submit */}
              <div className="px-4 pb-6 pt-4 sm:px-6">
                <div className="space-y-2.5">
                  {currentQuestion.options.map((option) => {
                    let optionStyle = 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800';
                    let showIcon = null;

                    if (hasSubmitted) {
                      if (option.isCorrect) {
                        optionStyle = 'border-green-500 bg-green-50 text-gray-800 shadow-sm';
                        showIcon = <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500"><Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} /></div>;
                      } else if (selectedOption === option.id) {
                        optionStyle = 'border-red-500 bg-red-50 text-gray-800 shadow-sm';
                        showIcon = <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500"><X className="h-3.5 w-3.5 text-white" strokeWidth={3.5} /></div>;
                      } else {
                        optionStyle = 'border-gray-200 bg-white text-gray-800 opacity-50';
                      }
                    } else if (selectedOption === option.id) {
                      optionStyle = 'border-[#0A4BB3] bg-blue-50 text-gray-800';
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
                          <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 flex-shrink-0 ${selectedOption === option.id ? 'border-[#0A4BB3]' : 'border-gray-300'}`}>
                            {selectedOption === option.id && <div className="h-2.5 w-2.5 rounded-full bg-[#0A4BB3]" />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Next button */}
                {!hasSubmitted ? (
                  <button
                    disabled={!selectedOption}
                    onClick={() => handleSubmit()}
                    className={`mt-5 w-full rounded-[12px] py-3 text-sm font-bold text-white transition ${
                      !selectedOption ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-[#0A4BB3] hover:bg-[#083E93] shadow-md cursor-pointer'
                    }`}
                  >
                    Kirim Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="mt-5 w-full rounded-[12px] py-3 text-sm font-bold text-white bg-[#0A4BB3] hover:bg-[#083E93] shadow-md cursor-pointer transition"
                  >
                    {currentQuestionIndex + 1 < TOTAL_QUESTIONS ? 'Soal Berikutnya →' : 'Lihat Hasil'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {modalState === 'result' && (
            <div className="flex flex-col bg-white text-center overflow-hidden rounded-[24px]">
              {/* Header */}
              <div
                className="w-full h-[120px] relative flex items-center justify-center"
                style={{ backgroundColor: isPassed ? '#0A4BB3' : '#111A5A', backgroundImage: `url(${component7})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0]">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[30px] fill-white block">
                    <path d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z" className="fill-white" />
                  </svg>
                </div>
              </div>

              {/* Score badge */}
              <div className="relative z-10 flex justify-center -mt-[52px] mb-4">
                <div className={`flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white shadow-lg border-4 ${
                  isPassed ? 'border-green-400' : 'border-red-400'
                }`}>
                  <div className={`flex flex-col items-center justify-center h-[80px] w-[80px] rounded-full ${
                    isPassed ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className={`text-3xl font-black leading-none ${
                      isPassed ? 'text-green-600' : 'text-red-600'
                    }`}>{correctCount}/{TOTAL_QUESTIONS}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                      isPassed ? 'text-green-500' : 'text-red-500'
                    }`}>{isPassed ? 'LULUS' : 'GAGAL'}</span>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2">
                {isPassed ? (
                  <>
                    <h3 className="text-[24px] font-bold text-[#0A1B3F] mb-1">Selamat! 🎉</h3>
                    <p className="text-[#3A3A3A] text-[13px] mb-6">
                      Kamu berhasil menjawab <span className="font-bold text-green-600">{correctCount} dari {TOTAL_QUESTIONS}</span> soal dengan benar.
                      Pos <span className="font-bold">{station.title}</span> telah selesai!
                    </p>
                    <button
                      onClick={() => onFinish(correctCount)}
                      className="w-full rounded-[14px] bg-[#111A5A] py-3.5 text-[15px] font-bold text-white transition hover:bg-[#083E93] shadow-[0_8px_20px_rgba(10,27,63,0.15)] cursor-pointer"
                    >
                      Lanjut ke Pos Berikutnya →
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-[24px] font-bold text-[#0A1B3F] mb-1">Hampir Berhasil!</h3>
                    <p className="text-[#3A3A3A] text-[13px] mb-2">
                      Kamu hanya menjawab <span className="font-bold text-red-600">{correctCount} dari {TOTAL_QUESTIONS}</span> soal dengan benar.
                    </p>
                    <p className="text-[#6B7280] text-[12px] mb-6">
                      Butuh minimal <span className="font-bold text-[#111A5A]">{PASS_THRESHOLD} jawaban benar</span> untuk lanjut. Coba lagi!
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRetry}
                        className="flex-1 rounded-[14px] bg-[#111A5A] py-3.5 text-[14px] font-bold text-white transition hover:bg-[#083E93] shadow-md cursor-pointer"
                      >
                        Coba Lagi
                      </button>
                      <button
                        onClick={onClose}
                        className="flex-1 rounded-[14px] border-2 border-gray-300 bg-white py-3.5 text-[14px] font-bold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                      >
                        Keluar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

const NoeQuizPage = ({ completedStations = [], setCompletedStations }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    
    window.lenis = lenis;

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.lenis = null;
    };
  }, []);
  const [activeStation, setActiveStation] = useState(null);
  const [answersGiven, setAnswersGiven] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const completedCount = completedStations.length;
  const accuracy = answersGiven ? Math.round((correctAnswers / answersGiven) * 100) : 0;
  const posData = stations.map((station, index) => ({
    id: index + 1,
    name: language === 'en' ? (station.title_en || station.title) : station.title,
    isLocked: index > 0 && !completedStations.includes(index - 1),
    isCompleted: completedStations.includes(index),
  }));

  const finishStation = (correctCount) => {
    const stationIndex = activeStation;
    // Only mark complete if passed (>= PASS_THRESHOLD correct)
    if (correctCount >= PASS_THRESHOLD) {
      setCompletedStations((completed) =>
        completed.includes(stationIndex) ? completed : [...completed, stationIndex]
      );
      setAnswersGiven((total) => total + TOTAL_QUESTIONS);
      setCorrectAnswers((total) => total + correctCount);
    }
    setActiveStation(null);
  };

  const openStation = (stationIndex) => {
    setActiveStation(stationIndex);
  };

  return (
    <div className="min-h-screen bg-white font-poppins pb-12">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 bg-white sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-[#3A3A3A] font-semibold text-sm hover:text-[#0A1B3F]">
           <ChevronLeft className="w-4 h-4" /> {t('back')}
        </Link>
        <img src={logoNoekarta} alt="Noekarta" className="h-5 md:h-6 object-contain" />
        <div className="flex items-center gap-4 text-sm font-semibold text-[#3A3A3A]">
           <div className="hidden md:flex items-center gap-1 cursor-pointer" onClick={toggleLanguage}>
             <Globe className="w-4 h-4" /> {language === 'en' ? 'ID' : 'EN'} <span className="text-[10px]">▼</span>
           </div>
           <Menu className="w-5 h-5 cursor-pointer md:hidden" />
        </div>
      </header>

      <main className="relative">
        {/* Layer 2: Dark Blue Header Banner */}
        <div className="absolute top-6 left-0 w-full z-0 px-4 md:px-8 lg:px-12 flex justify-center">
          <div 
            className="w-full max-w-[1300px] h-[240px] md:h-[280px] rounded-[32px] md:rounded-[40px]"
            style={{
              backgroundColor: '#111A5A',
              backgroundImage: `url(${component7})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-4 md:px-8 lg:px-12 max-w-[1300px] mx-auto pt-20 lg:pt-48">
          
          {/* Layer 3: Cards */}
          <div className="w-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            
             {/* Left Card: Explorasi */}
             <div className="flex-1 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-10 relative flex flex-col justify-center overflow-visible min-h-[280px]">
               <div className="relative z-10 pr-[110px] sm:pr-[140px] md:pr-[180px] lg:pr-[240px] xl:pr-[270px]">
                 <img src={titleImage} alt="NoeQuiz Explorasi" className="h-[32px] md:h-[38px] object-contain mb-4 select-none" />
                 <p className="text-[#3A3A3A] text-sm md:text-[14px] leading-relaxed mb-6 font-medium">
                   {t('quiz_desc')}
                 </p>
                 <button onClick={() => setIsTutorialOpen(true)} className="bg-[#111A5A] hover:bg-[#0d1445] text-white font-semibold px-6 py-1.5 sm:px-8 sm:py-2 md:px-10 md:py-2.5 rounded-full transition-all text-[11px] sm:text-xs md:text-sm shadow-md cursor-pointer w-max">
                   {t('quiz_tutorial_btn')}
                 </button>
               </div>
               {/* Maskot */}
               <div className="absolute right-0 bottom-0 z-0 pointer-events-none max-w-[200px] md:max-w-[240px] lg:max-w-[320px] xl:max-w-[320px] w-full">
                 <img src={maskot} alt="Noekarta Maskot" className="w-full h-auto object-contain drop-shadow-2xl select-none" />
               </div>
             </div>

             {/* Right Card: Statistik */}
             <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-10 flex-1 lg:max-w-[420px] flex flex-col justify-center">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-[#111A5A]">{t('quiz_stats_title')}</h3>
                  <div className="w-11 h-11 bg-[#111A5A] rounded-[12px] flex items-center justify-center shadow-md">
                    <img src={component3} alt="Chart" className="w-5 h-5 select-none object-contain invert brightness-0" />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 font-semibold">{t('quiz_stats_total')}</span>
                    <span className="text-xs font-bold text-[#111A5A]">{completedCount}/4 {t('quiz_stats_completed')}</span>
                  </div>
                  <div className="flex gap-2">
                    {stations.map((station, index) => (
                      <div key={station.title} className={`h-2.5 flex-1 rounded-full transition-colors duration-500 ${completedStations.includes(index) ? 'bg-[#111A5A]' : 'bg-gray-100'}`} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100">
                  <div className="text-center flex-1">
                    <p className="text-3xl font-black text-[#111A5A] mb-1">{answersGiven}</p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{t('quiz_stats_answered')}</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-3xl font-black text-[#111A5A] mb-1">{accuracy}<span className="text-xl ml-0.5">%</span></p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{t('quiz_stats_accuracy')}</p>
                  </div>
                </div>
             </div>
             
          </div>

          {/* Map Section */}
          <div
            className="relative mt-8 md:mt-10 h-[620px] overflow-hidden md:h-[720px] rounded-[30px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
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
          <span className="mt-2 text-[10px] font-bold text-[#0A1B3F]">{t('quiz_map_start')}</span>
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
                {pos.isCompleted ? <Check className="h-7 w-7" strokeWidth={3} /> : pos.isLocked ? <LockKeyhole className="h-6 w-6" /> : <img src={stationIcons[index]} className="h-7 w-7 object-contain brightness-0 invert" alt={pos.name} />}
              </span>
              <span className={`absolute w-[112px] ${labelPositions[index]}`}>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ${pos.isCompleted ? 'bg-[#E6E2FF] text-[#2F1FE4]' : isUnlocked ? 'bg-white/90 text-[#0A4BB3]' : 'bg-slate-200/80 text-slate-500'}`}>{pos.isCompleted ? (language === 'en' ? 'Done' : 'Selesai') : isUnlocked ? (language === 'en' ? 'Active' : 'Aktif') : (language === 'en' ? 'Locked' : 'Terkunci')}</span>
                <span className={`mt-1 block text-xs font-bold leading-tight ${pos.isLocked ? 'text-slate-600' : 'text-[#0A1B3F]'}`}>{pos.name}</span>
              </span>
            </motion.button>
          );
        })}

        <div className="absolute left-[80%] top-[73%] z-20 flex -translate-x-1/2 flex-col items-center">
          <div className={`flex h-13 w-13 items-center justify-center rounded-full border-4 border-white text-white shadow-lg transition-colors ${posData.at(-1).isCompleted ? 'bg-[#3522E7] ring-4 ring-[#B6AEFF]/80' : 'bg-[#272C39]'}`}>
            {posData.at(-1).isCompleted ? <Check className="h-5 w-5" strokeWidth={3} /> : <Flag className="h-5 w-5" />}
          </div>
          <span className="mt-2 text-[10px] font-bold text-[#0A1B3F]">{t('quiz_map_finish')}</span>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex w-[min(92%,360px)] -translate-x-1/2 items-center justify-center gap-5 rounded-full border border-[#E3E8F5] bg-white/95 px-4 py-3 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur">
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#0A4BB3]" />{language === 'en' ? 'Active' : 'Aktif'}</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#62646B]" />{language === 'en' ? 'Locked' : 'Terkunci'}</span>
          <span className="flex items-center gap-1.5"><i className="flex h-3 w-3 items-center justify-center rounded-full bg-[#2F1FE4] text-[8px] text-white">✓</i>{language === 'en' ? 'Done' : 'Selesai'}</span>
        </div>
      </div>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
      <QuizModal
        key={activeStation ?? 'closed'}
        stationIndex={activeStation ?? 0}
        station={activeStation === null ? null : stations[activeStation]}
        onClose={() => setActiveStation(null)}
        onFinish={finishStation}
      />
        </div>
      </main>
    </div>
  );
};

export default NoeQuizPage;
