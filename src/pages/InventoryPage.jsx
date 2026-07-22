import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Globe, ChevronDown } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import logo from '../assets/logo-noekarta1.webp';
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
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
);

const InventoryPage = () => {
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
        navigate('/kuliner');
    };

    // Filter to only show saved items, and also apply search query
    const savedKulinerData = allKulinerData.filter(item => savedItems.includes(item.id));
    
    const filteredData = savedKulinerData.filter(item => {
        const title = language === 'en' ? (item.title_en || item.title) : item.title;
        const desc = language === 'en' ? (item.desc_en || item.desc) : item.desc;
        return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               desc.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-white font-poppins flex flex-col">
            <Seo
                title={t('inventory_title')}
                description={t('inventory_sub')}
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
                
                {/* Title & Search Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 font-ancizar">
                            {t('inventory_title')}
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl">
                            {t('inventory_sub')}
                        </p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-[350px]">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Search className="w-5 h-5" />
                        </div>
                        <input 
                            type="text" 
                            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f285e] transition-all placeholder:text-gray-400 text-gray-700 shadow-sm"
                            placeholder={t('inventory_search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center md:justify-items-start">
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
                                    className="flex items-center justify-center gap-2 cursor-pointer w-full transition-colors"
                                    style={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: '#0f285e',
                                        color: 'white',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        border: '1.5px solid #0f285e'
                                    }}
                                >
                                    <BookmarkIcon />
                                    {t('remove')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="w-full text-center py-20 text-gray-500">
                        {savedKulinerData.length === 0 
                            ? t('inventory_empty')
                            : (language === 'en' ? 'No saved culinary items match your search.' : 'Tidak ada kuliner tersimpan yang sesuai dengan pencarian.')}
                    </div>
                )}
            </main>
        </div>
    );
};

export default InventoryPage;
