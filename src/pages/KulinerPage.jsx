import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Search, Globe, ChevronDown } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import logo from '../assets/logo-noekarta1.webp';
import cardfly from '../assets/cardfly2.svg';
import Seo from '../components/Seo';
import { allKulinerData } from '../data/kuliner';
import { useInventory } from '../hooks/useInventory';
import { useLanguage } from '../context/LanguageContext';

/* Bookmark Icon SVG */
const BookmarkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const KulinerPage = () => {
    const navigate = useNavigate();
    const { savedItems, toggleSave } = useInventory();
    const { language, toggleLanguage, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    // Restore scroll position and init Lenis
    useEffect(() => {
        window.scrollTo(0, 0);

        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        window.lenis = lenis;

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    const handleBack = () => {
        navigate('/', { state: { scrollToKuliner: true } });
    };

    const filteredData = allKulinerData.filter(item => {
        const title = language === 'en' ? (item.title_en || item.title) : item.title;
        const desc = language === 'en' ? (item.desc_en || item.desc) : item.desc;
        return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               desc.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-white font-poppins flex flex-col">
            <Seo
                title={t('kuliner_page_title')}
                description={t('kuliner_page_sub')}
            />
            {/* Header */}
            <header className="w-full bg-white border-b border-gray-100 shadow-sm z-50 sticky top-0">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm md:text-base">{t('back')}</span>
                    </button>

                    <a href="/" className="absolute left-1/2 -translate-x-1/2">
                        <img src={logo} alt="Noekarta" className="h-8 w-auto select-none" />
                    </a>

                    <button 
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium cursor-pointer transition-colors"
                    >
                        <Globe className="w-4 h-4" />
                        {language === 'id' ? 'ID' : 'EN'}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-10">
                
                {/* Title & Floating Card Section */}
                <div className="flex flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 md:mb-3 font-ancizar leading-tight">
                            {t('kuliner_heading')}
                        </h1>
                        <p className="text-gray-700 text-sm md:text-xl">
                            {t('kuliner_sub')}
                        </p>
                    </div>
                    
                    {/* Floating Card Animation */}
                    <div className="relative w-[140px] sm:w-[200px] md:w-[280px] h-[80px] md:h-[100px] flex justify-end shrink-0">
                        <img
                            src={cardfly}
                            alt="Kuliner Khas"
                            className="w-full h-full object-contain drop-shadow-sm select-none"
                            style={{ animation: 'float-card-2 9s ease-in-out infinite' }}
                        />
                    </div>
                </div>

                {/* Search & Inventory Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Search className="w-5 h-5" />
                        </div>
                        <input 
                            type="text" 
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f285e] focus:bg-white transition-all placeholder:text-gray-400 text-gray-700"
                            placeholder={t('kuliner_search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Link to="/inventory" className="bg-[#0f285e] hover:bg-[#0a1b40] text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm">
                        <BookmarkIcon />
                        {t('kuliner_view_inventory')}
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
                    {filteredData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300 w-full max-w-[260px]"
                            style={{
                                height: '340px',
                                borderRadius: '20px',
                                padding: '12px 12px 16px 12px',
                                gap: '12px',
                                boxShadow: '0px 2px 12px rgba(0,0,0,0.08)',
                                border: '1px solid #f1f5f9'
                            }}
                        >
                            {/* Image */}
                            <div
                                className="relative rounded-[12px] overflow-hidden select-none bg-gray-100"
                                style={{ height: '150px' }}
                            >
                                <img
                                    src={item.img}
                                    alt={language === 'en' ? (item.title_en || item.title) : item.title}
                                    className="w-full h-full object-cover select-none"
                                    draggable="false"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-1 px-1" style={{ flex: 1 }}>
                                <h3 className="font-bold text-gray-900 text-[16px] leading-tight">
                                    {language === 'en' ? (item.title_en || item.title) : item.title}
                                </h3>
                                <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3">
                                    {language === 'en' ? (item.desc_en || item.desc) : item.desc}
                                </p>
                            </div>

                            {/* Save Button */}
                            <div className="px-1 mt-auto">
                                <button
                                    onClick={() => toggleSave(item.id)}
                                    className="flex items-center justify-center gap-1.5 cursor-pointer w-full transition-colors"
                                    style={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        border: '1.5px solid #0f285e',
                                        backgroundColor: savedItems.includes(item.id) ? '#0f285e' : 'transparent',
                                        color: savedItems.includes(item.id) ? 'white' : '#0f285e',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <BookmarkIcon />
                                    {savedItems.includes(item.id) ? t('kuliner_unsave_inventory') : t('kuliner_save_inventory')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="w-full text-center py-20 text-gray-500">
                        {t('kuliner_empty_search')}
                    </div>
                )}
            </main>
        </div>
    );
};

export default KulinerPage;
