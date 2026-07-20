import { useState, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import component2 from '../assets/components/component2.webp';
import betawi1 from '../assets/image-betawiheritage1.webp';
import betawi2 from '../assets/image-betawiheritage2.webp';
import betawi3 from '../assets/image-betawiheritage3.webp';
import betawi4 from '../assets/image-betawiheritage4.webp';
import betawi5 from '../assets/image-betawiheritage5.webp';
import betawi6 from '../assets/image-betawiheritage6.webp';
import info1 from '../assets/information-betawiheritage1.webp';
import info2 from '../assets/information-betawiheritage2.webp';
import info3 from '../assets/information-betawiheritage3.webp';
import info4 from '../assets/information-betawiheritage4.webp';
import info5 from '../assets/information-betawiheritage5.webp';
import info6 from '../assets/information-betawiheritage6.webp';

const betawiData = [
  {
    id: 1,
    title: 'Budaya Betawi',
    badge: 'Ondel - Ondel',
    img: betawi1,
    infoImg: info1,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 2,
    title: 'Pakaian Adat Betawi',
    badge: 'Kebaya Encim',
    img: betawi2,
    infoImg: info2,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 3,
    title: 'Kuliner Betawi',
    badge: 'Semur Jengkol',
    img: betawi5,
    infoImg: info3,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 4,
    title: 'Kesenian & Music Betawi',
    badge: 'Rebana Biang',
    img: betawi3,
    infoImg: info4,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 5,
    title: 'Tradisi Betawi',
    badge: 'Ngarak Pengantin',
    img: betawi4,
    infoImg: info5,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 6,
    title: 'Wisata Betawi',
    badge: 'Museum Wayang',
    img: betawi6,
    infoImg: info6,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  }
];

// ── Desktop pages (original 2-page spread) ────────────────────────────────
const ImagePage = forwardRef(({ img }, ref) => (
  <div
    ref={ref}
    style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#1a1a2e' }}
  >
    <img
      src={img}
      alt=""
      className="select-none"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  </div>
));
ImagePage.displayName = 'ImagePage';

const TextPage = forwardRef(({ data }, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%',
      height: '100%',
      background: '#ffffff',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset -4px 0 15px rgba(0,0,0,0.03)'
    }}
  >
    {/* Spine shadow — visible during page peel */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '4px',
      height: '100%',
      background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
      zIndex: 1
    }} />
    <img
      src={data.infoImg}
      alt=""
      className="select-none"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      draggable="false"
    />
  </div>
));
TextPage.displayName = 'TextPage';

// ── Mobile page (image top + text bottom, single page) ─────────────────────
const CombinedPage = forwardRef(({ data }, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%',
      height: '100%',
      background: '#ffffff',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset -4px 0 15px rgba(0,0,0,0.03)'
    }}
    className="flex flex-col"
  >
    {/* Spine shadow */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '4px',
      height: '100%',
      background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
      zIndex: 1
    }} />
    <div className="w-full aspect-[4/3] shrink-0 relative bg-gray-50">
      <img
        src={data.img}
        alt={data.title}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable="false"
      />
    </div>
    <div className="flex-1 p-5 flex flex-col justify-center bg-white text-left">
      <span className="text-[#0F285C] font-bold text-lg mb-1">0{data.id}</span>
      <h3 className="text-[20px] font-bold text-gray-900 mb-2 leading-snug">{data.title}</h3>
      <div className="w-8 h-[3px] bg-[#0F285C] mb-3 rounded-full" />
      <p className="text-gray-600 text-[13px] leading-[1.6] mb-4 line-clamp-3">{data.desc}</p>
      <div className="inline-block border border-[#0F285C] text-[#0F285C] px-3 py-1 rounded-full text-[12px] font-semibold w-fit">{data.badge}</div>
    </div>
  </div>
));
CombinedPage.displayName = 'CombinedPage';

// ── Component ──────────────────────────────────────────────────────────────
const BetawiHeritage = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  // Two book refs — one per breakpoint
  const bookDesktop = useRef();
  const bookMobile = useRef();

  const isMobile = () => window.innerWidth < 768;

  const handleNext = () => {
    if (isFlipping) return;
    if (isMobile()) {
      bookMobile.current?.pageFlip().flipNext();
    } else {
      bookDesktop.current?.pageFlip().flipNext();
    }
  };

  const handlePrev = () => {
    if (isFlipping) return;
    if (isMobile()) {
      bookMobile.current?.pageFlip().flipPrev();
    } else {
      bookDesktop.current?.pageFlip().flipPrev();
    }
  };

  const handleDotClick = (idx) => {
    if (isFlipping || idx === currentItem) return;
    if (isMobile()) {
      bookMobile.current?.pageFlip().turnToPage(idx);
    } else {
      bookDesktop.current?.pageFlip().turnToPage(idx * 2);
    }
  };

  const onFlipDesktop = (e) => {
    setCurrentItem(Math.floor(e.data / 2));
  };

  const onFlipMobile = (e) => {
    setCurrentItem(e.data);
  };

  const onChangeState = (e) => {
    if (e.data === 'flipping' || e.data === 'user_fold') {
      setIsFlipping(true);
    } else if (e.data === 'read') {
      setIsFlipping(false);
    }
  };

  const bookStyle = {
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
    overflow: 'hidden'
  };

  return (
    <section className="py-24 bg-[#FAFAFA] font-poppins relative overflow-hidden" id="betawi-heritage">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left Column: Static Content */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <div className="inline-flex items-center gap-2.5 bg-[#F1F5F9] px-4 py-2 rounded-xl mb-8 w-fit">
              <img src={component2} alt="icon" className="w-5 h-5 object-contain select-none" />
              <span className="text-[#0F285C] font-semibold text-sm">Betawi Heritage Hub</span>
            </div>

            <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-5 leading-tight font-ancizar">
              Kenali Budaya <br className="hidden md:block" />
              <span className="text-[#0F285C]">Jakarta</span>
            </h2>

            <p className="text-gray-600 text-[15px] leading-relaxed mb-10 max-w-sm">
              Jelajahi kekayaan budaya jakarta melalui tradisi, seni, dan warisan yang terus hidup hingga kini.
            </p>

            <div className="mt-auto flex flex-col gap-6">
              {/* Page counter */}
              <div className="text-sm text-gray-400 font-medium">
                <span className="text-[#0F285C] font-bold text-lg">{String(currentItem + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>0{betawiData.length}</span>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {betawiData.map((_, idx) => (
                  <button
                    key={idx}
                    disabled={isFlipping}
                    onClick={() => handleDotClick(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentItem
                        ? 'bg-[#0F285C] w-2.5 h-2.5'
                        : isFlipping
                          ? 'bg-[#D1D5DB] w-2 h-2 cursor-not-allowed opacity-50'
                          : 'bg-[#D1D5DB] hover:bg-gray-400 w-2 h-2 cursor-pointer'
                    }`}
                    aria-label={`Go to item ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Book */}
          <div className="w-full lg:w-[65%] flex justify-center">
            <div className="flex w-full items-center gap-2 md:gap-3">

              {/* Prev button */}
              <button
                onClick={handlePrev}
                disabled={isFlipping}
                className={`w-9 h-9 md:w-12 md:h-12 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center transition-all shrink-0 focus:outline-none ${
                  isFlipping
                    ? 'text-gray-200 border-gray-100 cursor-not-allowed opacity-40'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-white hover:shadow-sm hover:border-gray-300 cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              </button>

              <div className="flex-1 w-full overflow-hidden">

                {/* ── Desktop / iPad book (md+): original 2-page spread ── */}
                <div className="hidden md:block w-full">
                  <HTMLFlipBook
                    ref={bookDesktop}
                    width={370}
                    height={500}
                    size="stretch"
                    minWidth={240}
                    maxWidth={420}
                    minHeight={380}
                    maxHeight={560}
                    showCover={false}
                    mobileScrollSupport={false}
                    onFlip={onFlipDesktop}
                    onChangeState={onChangeState}
                    drawShadow={true}
                    flippingTime={900}
                    useMouseEvents={false}
                    style={bookStyle}
                  >
                    {betawiData.flatMap((item) => [
                      <ImagePage key={`img-${item.id}`} img={item.img} />,
                      <TextPage key={`txt-${item.id}`} data={item} />
                    ])}
                  </HTMLFlipBook>
                </div>

                {/* ── Mobile book (<md): CombinedPage with flip animation ── */}
                <div className="block md:hidden w-full">
                  <HTMLFlipBook
                    ref={bookMobile}
                    width={300}
                    height={460}
                    size="stretch"
                    minWidth={200}
                    maxWidth={380}
                    minHeight={360}
                    maxHeight={520}
                    showCover={false}
                    mobileScrollSupport={true}
                    onFlip={onFlipMobile}
                    onChangeState={onChangeState}
                    drawShadow={true}
                    flippingTime={900}
                    useMouseEvents={false}
                    style={bookStyle}
                  >
                    {betawiData.map((item) => (
                      <CombinedPage key={`page-${item.id}`} data={item} />
                    ))}
                  </HTMLFlipBook>
                </div>

              </div>

              {/* Next button */}
              <button
                onClick={handleNext}
                disabled={isFlipping}
                className={`w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shrink-0 focus:outline-none ${
                  isFlipping
                    ? 'bg-[#0F285C]/40 text-white/60 cursor-not-allowed'
                    : 'bg-[#0F285C] text-white hover:bg-[#1E40AF] hover:shadow-lg cursor-pointer'
                }`}
                aria-label="Next page"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BetawiHeritage;
