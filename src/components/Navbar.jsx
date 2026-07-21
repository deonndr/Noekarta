import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo-noekarta1.webp';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);
    const { language, toggleLanguage, t } = useLanguage();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    // Scroll listener untuk efek floating navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Tutup menu mobile saat klik di luar navbar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Kunci scroll body dan Lenis saat menu mobile terbuka
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            if (window.lenis) {
                window.lenis.stop();
            }
        } else {
            document.body.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
            }
        }
        return () => {
            document.body.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
            }
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { labelKey: 'nav_home',     sectionId: 'hero' },
        { labelKey: 'nav_about',    sectionId: 'about' },
        { labelKey: 'nav_history',  sectionId: 'history' },
        { labelKey: 'nav_culture',  sectionId: 'budaya' },
        { labelKey: 'nav_culinary', sectionId: 'kuliner' },
        { labelKey: 'nav_quiz',     sectionId: 'noequiz' },
    ];

    // Scroll ke section menggunakan Lenis (dengan fallback native scroll)
    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        // Delay scroll agar menu mobile sempat tertutup & Lenis restart dulu
        setTimeout(() => {
            const target = document.getElementById(sectionId);
            if (!target) return;

            if (window.lenis) {
                window.lenis.scrollTo(target, { offset: -80, duration: 1.2 });
            } else {
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 350);
    };

    return (
        <>

            <div className="h-[80px] md:h-[88px] w-full"></div>

            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'pt-4 px-4 sm:px-6 md:px-8' : 'pt-0 px-0'}`}>
                <nav
                    ref={menuRef}
                    className={`mx-auto w-full relative transition-all duration-500 ease-in-out ${isScrolled
                        ? ' backdrop-blur-lg backdrop-saturate-150 shadow-[0_8px_30px_rgb(0,0,0,0.10)] rounded-full px-6 md:px-10 lg:px-12 py-3 max-w-[1427px] border border-white/60'
                        : ' px-6 md:px-12 lg:px-24 py-5 border-b border-gray-100 max-w-full'
                        }`}
                >
                    <div className="flex items-center justify-between gap-4">
                        {/* Bagian Logo */}
                        <div className="flex items-center shrink-0">
                            <a href="/">
                                <img src={logo} alt="Noekarta Logo" className="h-8 md:h-10 w-auto select-none" />
                            </a>
                        </div>

                        {/* Tautan Navigasi (Desktop) — absolute agar benar-benar di tengah halaman */}
                        <div className="hidden lg:flex items-center gap-4 xl:gap-6 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={`#${link.sectionId}`}
                                    onClick={(e) => handleNavClick(e, link.sectionId)}
                                    className="relative whitespace-nowrap text-black text-sm font-medium hover:text-indigo-800 transition-colors py-1 nav-link-animated"
                                >
                                    {t(link.labelKey)}
                                </a>
                            ))}
                        </div>

                        {/* Sisi Kanan Bahasa + Menu Burger */}
                        <div className="flex items-center gap-4 shrink-0">
                            {/* Tombol pilih bahasa (Desktop) */}
                            <button
                                onClick={toggleLanguage}
                                className="hidden lg:flex items-center gap-1.5 text-gray-800 hover:text-black font-medium transition-colors focus:outline-none cursor-pointer"
                                aria-label="Toggle language"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>
                                <span className="text-sm tracking-wide">{language === 'id' ? 'ID' : 'EN'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {/* Tombol Menu Burger (Mobile) */}
                            <button
                                onClick={toggleMobileMenu}
                                className={`lg:hidden relative w-7 h-7 flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors focus:outline-none ${isMobileMenuOpen ? 'burger-open' : ''}`}
                                aria-label="Toggle menu"
                            >
                                <span className="burger-line burger-line-top" />
                                <span className="burger-line burger-line-mid" />
                                <span className="burger-line burger-line-bot" />
                            </button>
                        </div>
                    </div>

                </nav>

                {/* Overlay Menu Mobile — sibling <nav>, inset tetap agar selalu konsisten */}
                <div data-lenis-prevent="true" className={`mobile-menu absolute left-4 right-4 sm:left-6 sm:right-6 top-full mt-2 shadow-lg z-50 lg:hidden rounded-2xl border border-white/40 bg-white/20 backdrop-blur-xl backdrop-saturate-150 overflow-hidden ${isMobileMenuOpen ? 'menu-open' : ''}`}>
                    <div className="flex flex-col items-center gap-1 py-4">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={`#${link.sectionId}`}
                                className="mobile-link w-full text-center py-2 px-4 mx-2 rounded-xl text-gray-900 font-medium hover:text-blue-700 hover:bg-white/30 text-base"
                                onClick={(e) => handleNavClick(e, link.sectionId)}
                            >
                                {t(link.labelKey)}
                            </a>
                        ))}

                        {/* Pembatas halus */}
                        <div className="w-4/5 h-[1px] bg-white/30 my-2" />

                        {/* Language Switcher di Mobile Drawer */}
                        <div className="flex items-center gap-3 py-1">
                            <button
                                onClick={toggleLanguage}
                                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer backdrop-blur-sm ${language === 'id' ? 'bg-blue-800/90 text-white shadow-sm' : 'text-gray-700 hover:bg-white/30'}`}
                            >
                                ID
                            </button>
                            <span className="text-white/40 text-xs">|</span>
                            <button
                                onClick={toggleLanguage}
                                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer backdrop-blur-sm ${language === 'en' ? 'bg-blue-800/90 text-white shadow-sm' : 'text-gray-700 hover:bg-white/30'}`}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Backdrop gelap saat menu mobile terbuka */}
            <div
                className={`menu-backdrop fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden ${isMobileMenuOpen ? 'menu-open' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
};

export default Navbar;
