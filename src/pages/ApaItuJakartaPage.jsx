import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Globe } from 'lucide-react';
import logo from '../assets/logo-noekarta.webp';
import bgImage from '../assets/bg-pageApaItuJakarta.webp';
import card3 from '../assets/card_about3.webp';
import card4 from '../assets/card_about4.webp';
import card5 from '../assets/card-about5.webp';
import card2 from '../assets/card_about2.webp'; // Used for the bottom section image
import jakartaDroneVideo from '../assets/vid/drone_jakarta.webm';
import Seo from '../components/Seo';

const ApaItuJakartaPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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
            <img src={logo} alt="Noekarta" className="h-8 w-auto" />
          </a>

          {/* Language Selector */}
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>EN</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[650px] flex flex-col items-center justify-start pt-20 px-4">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="Jakarta Background" className="w-full select-none h-full object-cover" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-ancizar tracking-wide">
            Jakarta, Jantung Indonesia
          </h1>
          <p className="text-gray-100 text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed text-center">
            Jakarta Merupakan Ibu Kota Indonesia Sekaligus Pusat Pemerintahan, Ekonomi, Bisnis,
            Dan Teknologi. Dengan Jumlah Penduduk Lebih Dari 10 Juta Jiwa, Jakarta Menjadi Kota
            Metropolitan Terbesar Di Indonesia Yang Dihuni Oleh Masyarakat Dari Berbagai Suku
            Dan Budaya.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div className="relative z-20 w-full  max-w-6xl mt-20 md:mt-24 lg:mt-10">
          <div className="flex flex-row flex-wrap md:flex-nowrap  lg:flex-nowrap justify-center items-end gap-4 md:gap-6 lg:gap-4 px-4 translate-y-24 md:translate-y-32">

            {/* Card 1: Food */}
            <div className="rounded-[20px] p-2  self-end mb-4 lg:mb-18  transform hover:-translate-y-2 transition-transform duration-300">
              <img src={card2} alt="Food" className="w-[140px] shadow-lg select-none md:w-[180px] lg:w-[287px] h-[140px] md:h-[180px] lg:h-[224px] object-cover rounded-[14px]" />
            </div>

            {/* Middle Column: Stats + Monas */}
            <div className="flex flex-col gap-4 self-start transform -translate-y-8 lg:translate-y-1">
              <div className="bg-white rounded-[20px] p-5  min-w-[200px] md:min-w-[240px] text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
                  11,01 juta jiwa
                </h3>
                <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap mt-1 font-medium">Penduduk Kota Jakarta</p>
              </div>
              <div className="rounded-[20px] p-2  w-full h-[120px] md:h-[140px] lg:w-[325px] lg:h-[169px] transform hover:-translate-y-2 transition-transform duration-300">
                <img src={card3} alt="Monas" className="w-full shadow-lg select-none h-full object-cover rounded-[14px]" />
              </div>
            </div>

            {/* Card 4: Stadium */}
            <div className="rounded-[20px] p-2   self-end mb-4 lg:mb-18 transform hover:-translate-y-2 transition-transform duration-300">
              <img src={card4} alt="Stadium" className="shadow-lg w-[130px] select-none md:w-[160px] lg:w-[244px] h-[150px] md:h-[190px] lg:h-[253px] object-cover rounded-[14px]" />
            </div>

            {/* Card 5: Cityscape */}
            <div className="rounded-[20px] p-2   self-end mb-10 lg:mb-28 transform hover:-translate-y-2 transition-transform duration-300">
              <img src={card5} alt="Cityscape" className="shadow-lg select-none w-[100px] md:w-[130px] lg:w-[202px] h-[100px] md:h-[130px] lg:h-[169px] object-cover rounded-[14px]" />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Section Spacer for the floating cards */}
      <div className="h-40 md:h-56"></div>

      {/* Content Section */}
      <section className="px-4 md:px-8 max-w-auto pb-28 mx-auto">
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
