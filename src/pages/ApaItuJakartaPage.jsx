import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import logo from '../assets/logo-noekarta1.webp';
import heroBackground from '../assets/bg-ApaItuJakarta.webp';
import heroTitle from '../assets/title.pageApaItuJakarta.webp';
import heroForeground from '../assets/bgtrans-ApaItuJakarta.webp';
import card5 from '../assets/card-about5.webp';
import jakartaDroneVideo from '../assets/vid/drone_jakarta.webm';
import Seo from '../components/Seo';

const ApaItuJakartaPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    const updateLenis = (time) => lenis.raf(time * 1000);

    window.lenis = lenis;
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      if (window.lenis === lenis) window.lenis = undefined;
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white font-poppins font-sans">
      <Seo
        title="Apa Itu Jakarta"
        description="Kenali Jakarta sebagai jantung Indonesia: pusat pemerintahan, ekonomi, budaya, dan kehidupan metropolitan."
      />
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 h-[72px] flex items-center shrink-0">
        <div className="w-full px-4 md:px-8 flex items-center justify-between relative max-w-[1440px] mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm md:text-base font-medium">Kembali</span>
          </button>

          {/* Logo Center */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={logo} alt="Noekarta" className="h-8 w-auto select-none" />
          </a>

          {/* Language Selector */}
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>EN</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Hero: the title is intentionally sandwiched between the city backdrop and foreground skyline. */}
      <section className="px-4 pt-4 md:px-8 md:pt-7">
        <div className="relative mx-auto aspect-[2/1] w-full max-w-[1506px] overflow-hidden rounded-[28px] md:rounded-[48px]">
          <img
            src={heroBackground}
            alt="Pemandangan kota Jakarta"
            className="absolute inset-0 h-full brightness-75 w-full select-none object-cover"
          />

          <div className="absolute left-1/2 top-[31%] z-10 w-[78%] -translate-x-1/2 md:top-[18%] md:w-[76%]">
            <img
              src={cardfly}
              alt="Decoration"
              className="w-[120px] md:w-[150px] object-contain drop-shadow-sm select-none"
              style={{ animation: 'float-card-2 9s ease-in-out infinite' }}
            />
            <motion.img
              src={heroTitle}
              alt="Kota Jakarta"
              className="block w-full select-none"
              initial={{ opacity: 0, y: 72, filter: 'blur(7px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 2.35,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>

          <img
            src={heroForeground}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-cover"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-[1440px] px-4 pb-28 pt-12 md:px-8 md:pt-20">
        <div className=" rounded-[32px]  p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ">

          {/* Left: Video with blue tag */}
          <div className="w-full lg:w-1/2 relative rounded-[24px]  group">
            <div className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-[24px]">
              <video
                src={jakartaDroneVideo}
                poster={card5}
                className="w-full h-full object-cover "
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Video drone Jakarta"
              />
              {/* Tag */}
              <div className="absolute top-6 -left-6 z-10 bg-blue-950 text-white py-6 px-12 rounded-2xl shadow-lg">
                <div className="font-semibold text-lg leading-tight">661 km²</div>
                <div className="text-xs font-medium opacity-90">Luas Wilayah</div>
              </div>
            </div>
          </div>

          {/* Right: Facts */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-4xl font-ancizar font-bold text-gray-900 mb-8">
              Jakarta, Kota Impian
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1.5 min-w-[10px] h-[10px] rounded-full bg-blue-800"></div>
                <p className="leading-relaxed text-[15px]">
                  <span className="font-extrabold text-gray-900">Lokasi Geografis:</span> Terletak di pesisir barat laut Pulau Jawa, berbatasan langsung dengan Provinsi Banten di barat dan Jawa Barat di timur dan selatan, serta menghadap Laut Jawa di utara
                </p>
              </div>

              <div className="flex gap-4">
                <div className="mt-1.5 min-w-[10px] h-[10px] rounded-full bg-blue-800"></div>
                <p className="leading-relaxed text-[15px]">
                  <span className="font-extrabold text-gray-900">Pembagian Wilayah:</span> Terbagi menjadi lima Kota Administrasi (Jakarta Pusat, Jakarta Barat, Jakarta Selatan, Jakarta Utara, Jakarta Timur) dan satu Kabupaten Administrasi (Kepulauan Seribu).
                </p>
              </div>

              <div className="flex gap-4">
                <div className="mt-1.5 min-w-[10px] h-[10px] rounded-full bg-blue-800"></div>
                <p className="leading-relaxed text-[15px]">
                  <span className="font-extrabold text-gray-900">Skala Penduduk:</span> Wilayah metropolitan Jakarta Raya (dikenal sebagai Jabodetabek) dihuni oleh lebih dari 40 juta jiwa, menjadikannya salah satu aglomerasi perkotaan terbesar di dunia
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ApaItuJakartaPage;
