import { useState, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import component2 from '../assets/components/component2.webp';
import betawi1 from '../assets/image-betawiheritage1.png';
import betawi2 from '../assets/image-betawiheritage2.png';
import betawi3 from '../assets/image-betawiheritage3.png';
import betawi4 from '../assets/image-betawiheritage4.png';
import betawi5 from '../assets/image-betawiheritage5.png';
import betawi6 from '../assets/image-betawiheritage6.png';

const betawiData = [
  {
    id: 1,
    title: 'Budaya Betawi',
    badge: 'Ondel - Ondel',
    img: betawi1,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 2,
    title: 'Pakaian Adat Betawi',
    badge: 'Kebaya Encim',
    img: betawi2,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 3,
    title: 'Kuliner Betawi',
    badge: 'Semur Jengkol',
    img: betawi3,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 4,
    title: 'Kesenian & Music Betawi',
    badge: 'Rebana Biang',
    img: betawi4,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 5,
    title: 'Tradisi Betawi',
    badge: 'Ngarak Pengantin',
    img: betawi5,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  },
  {
    id: 6,
    title: 'Wisata Betawi',
    badge: 'Museum Wayang',
    img: betawi6,
    desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari'
  }
];

// react-pageflip requires children to be wrapped with forwardRef
const ImagePage = forwardRef(({ img }, ref) => (
  <div
    ref={ref}
    style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#1a1a2e' }}
  >
    <img
      src={img}
      alt=""
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
    {/* Spine shadow line on the left edge of text page */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '4px',
      height: '100%',
      background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
      zIndex: 1
    }} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 44px',
    }}>
      <span style={{ color: '#0F285C', fontWeight: 700, fontSize: '22px', marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
        0{data.id}
      </span>

      <div style={{ height: '76px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom: '16px', overflow: 'hidden' }}>
        <h3 style={{
          fontSize: '26px',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1.3,
          margin: 0,
          fontFamily: 'Poppins, sans-serif',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {data.title}
        </h3>
      </div>

      <div style={{ width: '48px', height: '3px', background: '#0F285C', borderRadius: '9999px', marginBottom: '20px' }} />

      <p style={{
        color: '#6B7280',
        fontSize: '14px',
        lineHeight: 1.7,
        marginBottom: '28px',
        height: '72px',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        margin: '0 0 28px 0'
      }}>
        {data.desc}
      </p>

      <div style={{
        display: 'inline-block',
        border: '1.5px solid #0F285C',
        color: '#0F285C',
        padding: '10px 24px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'Poppins, sans-serif',
        width: 'fit-content',
        letterSpacing: '0.05em'
      }}>
        {data.badge}
      </div>
    </div>
  </div>
));
TextPage.displayName = 'TextPage';

const BetawiHeritage = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const book = useRef();

  const flipNext = () => {
    book.current?.pageFlip().flipNext();
  };

  const flipPrev = () => {
    book.current?.pageFlip().flipPrev();
  };

  const onFlip = (e) => {
    // Each item = 2 pages (image + text), page index / 2 = item index
    setCurrentItem(Math.floor(e.data / 2));
  };

  return (
    <section className="py-24 bg-[#FAFAFA] font-poppins relative overflow-hidden" id="betawi-heritage">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left Column: Static Content */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <div className="inline-flex items-center gap-2.5 bg-[#F1F5F9] px-4 py-2 rounded-xl mb-8 w-fit">
              <img src={component2} alt="icon" className="w-5 h-5 object-contain" />
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
                <span>{String(betawiData.length).padStart(2, '0')}</span>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={flipPrev}
                  className="w-12 h-12 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white hover:shadow-sm hover:border-gray-300 transition-all focus:outline-none"
                  aria-label="Previous page"
                >
                  <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={flipNext}
                  className="w-12 h-12 rounded-full bg-[#0F285C] flex items-center justify-center text-white hover:bg-[#1E40AF] hover:shadow-lg transition-all focus:outline-none"
                  aria-label="Next page"
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {betawiData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx !== currentItem) {
                        // Jump to the correct page (each item = 2 pages, show left page = even index)
                        book.current?.pageFlip().turnToPage(idx * 2);
                      }
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentItem
                        ? 'bg-[#0F285C] w-2.5 h-2.5'
                        : 'bg-[#D1D5DB] hover:bg-gray-400 w-2 h-2'
                    }`}
                    aria-label={`Go to item ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Book */}
          <div className="w-full lg:w-[65%] flex justify-center">

            {/* Desktop Book */}
            <div className="hidden md:block w-full">
              <HTMLFlipBook
                ref={book}
                width={370}
                height={500}
                size="stretch"
                minWidth={240}
                maxWidth={420}
                minHeight={380}
                maxHeight={560}
                showCover={false}
                mobileScrollSupport={false}
                onFlip={onFlip}
                drawShadow={true}
                flippingTime={900}
                useMouseEvents={false}
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
                  overflow: 'hidden'
                }}
              >
                {betawiData.flatMap((item) => [
                  <ImagePage key={`img-${item.id}`} img={item.img} />,
                  <TextPage key={`txt-${item.id}`} data={item} />
                ])}
              </HTMLFlipBook>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden w-full flex-col rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] h-[600px]">
              <div className="h-[300px] shrink-0 relative bg-gray-100">
                <img
                  src={betawiData[currentItem].img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative bg-white">
                <div className="absolute inset-0 flex flex-col justify-center px-8 py-6">
                  <span className="text-[#0F285C] font-bold text-xl mb-2">0{betawiData[currentItem].id}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2">{betawiData[currentItem].title}</h3>
                  <div className="w-10 h-[3px] bg-[#0F285C] mb-4 rounded-full" />
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{betawiData[currentItem].desc}</p>
                  <div className="inline-block border-[1.5px] border-[#0F285C] text-[#0F285C] px-5 py-2 rounded-full text-sm font-semibold w-fit">{betawiData[currentItem].badge}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BetawiHeritage;
