import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';

// impor component
import component2 from '../assets/components/starcomponent.webp';

// impor gambar judul
import img1 from '../assets/hero-title1.webp';
import img2 from '../assets/hero-title2.webp';
import img3 from '../assets/hero-title3.webp';
import img4 from '../assets/hero-title4.webp';
import img5 from '../assets/hero-title5.webp';
import img6 from '../assets/hero-title6.webp';

// impor gambar floating cards
import cardfly1 from '../assets/cardfly1.svg';
import cardfly2 from '../assets/cardfly2.svg';
import cardfly3 from '../assets/cardfly3.svg';
import cardfly4 from '../assets/cardfly4.svg';

const titleFrames = [
    { label: 'Batavia', image: img1 },
    { label: 'Jayakarta', image: img2 },
    { label: 'Sunda Kelapa', image: img3 },
    { label: 'Jakarta Merdeka', image: img4 },
    { label: 'Jakarta Modern', image: img5 },
    { label: 'Jakarta Digital', image: img6 },
];

// Load all landmark images 1-20
const imageModules = import.meta.glob('../assets/landmarkjakarta*.webp', { eager: true, import: 'default' });
const baseLandmarkImages = Object.keys(imageModules)
    .sort((a, b) => {
        const numA = parseInt(a.match(/landmarkjakarta(\d+)\.webp/)[1], 10);
        const numB = parseInt(b.match(/landmarkjakarta(\d+)\.webp/)[1], 10);
        return numA - numB;
    })
    .map(key => imageModules[key]);

// ── 3D Cylinder Carousel constants ──
const TOTAL_ITEMS = baseLandmarkImages.length;
const CARD_WIDTH = 220;
const CARD_HEIGHT = 300;
const CYLINDER_PADDING = 50;   // extra spacing between cards on the cylinder wall
const AUTO_ROTATE_SPEED = 0.12; // degrees per frame

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const fadeTimeoutRef = useRef(null);

    // 3D Cylinder carousel refs
    const cylinderRef = useRef(null);
    const rotationRef = useRef(0);
    const autoRotateRafId = useRef(null);
    const isHovered = useRef(false);
    const isAnimatingRef = useRef(false);

    const heroRef = useRef(null);
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    useEffect(() => {
        if (!heroRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );
        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    const updateContainerWidth = useCallback((imgW, imgH) => {
        if (!containerRef.current) return;
        const containerHeight = containerRef.current.clientHeight;
        if (imgH > 0 && containerHeight > 0) {
            const newWidth = imgW * (containerHeight / imgH);
            containerRef.current.style.width = `${newWidth}px`;
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (imgRef.current) {
                updateContainerWidth(imgRef.current.naturalWidth, imgRef.current.naturalHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateContainerWidth]);

    const showTitleFrame = useCallback((nextIndex) => {
        const normalizedIndex = (nextIndex + titleFrames.length) % titleFrames.length;
        if (fadeTimeoutRef.current) {
            window.clearTimeout(fadeTimeoutRef.current);
            fadeTimeoutRef.current = null;
        }
        setOpacity(0);
        fadeTimeoutRef.current = window.setTimeout(() => {
            setCurrentIndex(normalizedIndex);
            setOpacity(1);
            fadeTimeoutRef.current = null;
        }, 400);
    }, []);

    // Judul berputar otomatis setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            showTitleFrame(currentIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, showTitleFrame]);

    useEffect(() => {
        return () => {
            if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
        };
    }, []);

    const handleImageLoad = (e) => {
        updateContainerWidth(e.target.naturalWidth, e.target.naturalHeight);
    };

    // ── Calculate dynamic dimensions ──
    const { currentCardWidth, currentCardHeight } = useMemo(() => {
        let width = CARD_WIDTH;
        let height = CARD_HEIGHT;
        if (windowWidth <= 768) {
            // tablet — kartu lebih kecil agar curve keliatan
            width = 90;
            height = 130;
        }
        if (windowWidth <= 480) {
            // phone — lebih kecil lagi
            width = 70;
            height = 100;
        }
        return { currentCardWidth: width, currentCardHeight: height };
    }, [windowWidth]);

    // ── Calculate cylinder radius ──
    const getRadius = useCallback(() => {
        // Tighter padding on mobile keeps cards closer, makes curve more visible
        const padding = windowWidth <= 480 ? 12 : windowWidth <= 768 ? 20 : CYLINDER_PADDING;
        return Math.round((currentCardWidth / 2) / Math.tan(Math.PI / TOTAL_ITEMS)) + padding;
    }, [currentCardWidth, windowWidth]);

    // ── Auto-rotation loop ──
    useEffect(() => {
        if (!isHeroVisible) return;

        const rotateLoop = () => {
            if (!isHovered.current && !isAnimatingRef.current && cylinderRef.current) {
                rotationRef.current += AUTO_ROTATE_SPEED;
                cylinderRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
            }
            autoRotateRafId.current = requestAnimationFrame(rotateLoop);
        };

        autoRotateRafId.current = requestAnimationFrame(rotateLoop);

        return () => {
            if (autoRotateRafId.current) cancelAnimationFrame(autoRotateRafId.current);
        };
    }, [isHeroVisible]);

    // ── Click handler: rotate clicked card to front ──
    const handleCardClick = useCallback((index) => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        const targetAngle = -(360 / TOTAL_ITEMS) * index;
        // Find the shortest rotation path
        const currentMod = rotationRef.current % 360;
        let diff = targetAngle - currentMod;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        const finalAngle = rotationRef.current + diff;

        // Animate to target
        if (cylinderRef.current) {
            cylinderRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cylinderRef.current.style.transform = `rotateY(${finalAngle}deg)`;
            rotationRef.current = finalAngle;

            // Remove transition after animation completes
            setTimeout(() => {
                if (cylinderRef.current) {
                    cylinderRef.current.style.transition = 'none';
                }
                isAnimatingRef.current = false;
            }, 850);
        }
    }, []);

    return (
        <section ref={heroRef} className="w-full flex flex-col items-center justify-start pt-6 md:pt-16 pb-0 relative overflow-hidden">

            {/* ── Floating Cards ── absolute ke section, di luar area teks ── */}
            {/* Top-left: 30+ Budaya Betawi */}
            <img
                src={cardfly1}
                alt="30+ Budaya Betawi"
                className="hidden lg:block select-none absolute z-20"
                style={{ left: '10%', top: '1%', width: 250, animation: isHeroVisible ? 'float-card-1 8s ease-in-out infinite' : 'none' }}
            />
            {/* Top-right: 50+ Kuliner Khas */}
            <img
                src={cardfly2}
                alt="50+ Kuliner Khas"
                className="hidden lg:block select-none absolute z-20"
                style={{ right: '10%', top: '1%', width: 250, animation: isHeroVisible ? 'float-card-2 9s ease-in-out infinite' : 'none' }}
            />
            {/* Bottom-left: 6 Kota Sejarah */}
            <img
                src={cardfly3}
                alt="6 Kota Sejarah"
                className="hidden lg:block select-none absolute z-20"
                style={{ left: '8%', top: '35%', width: 250, animation: isHeroVisible ? 'float-card-3 8.5s ease-in-out infinite' : 'none' }}
            />
            {/* Bottom-right: 200+ Landmark */}
            <img
                src={cardfly4}
                alt="200+ Landmark"
                className="hidden lg:block select-none absolute z-20"
                style={{ right: '8%', top: '35%', width: 250, animation: isHeroVisible ? 'float-card-4 9.5s ease-in-out infinite' : 'none' }}
            />

            {/* ── Konten Tengah ── */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 md:px-6 text-center">

                {/* Badge */}
                <div
                    className="inline-flex items-center gap-1 md:gap-2 rounded-full px-2.5 py-1 md:px-4 md:py-2 text-[10px] md:text-sm font-semibold bg-gray-50 mb-3 md:mb-6 anim-fade-up"
                >
                    <img src={component2} alt="Star" className="w-2.5 h-2.5 md:w-auto md:h-auto mr-0.5 md:mr-1 select-none" />
                    <p className="text-indigo-950">
                        Jelajahi Sejarah, Budaya &amp; Kuliner
                    </p>
                </div>

                {/* Judul Baris 1 */}
                <div className="flex flex-wrap md:flex-nowrap font-ancizar items-center justify-center md:whitespace-nowrap gap-1.5 md:gap-3 text-[clamp(20px,5.5vw,60px)] font-extrabold text-black tracking-tight leading-[1.2]">
                    <span>Dari Jejak</span>
                    <div
                        ref={containerRef}
                        className="flex items-center justify-center h-[clamp(28px,4vw,80px)] transition-[width] duration-500 ease-in-out"
                    >
                        <img
                            ref={imgRef}
                            src={titleFrames[currentIndex].image}
                            className="h-full w-auto object-contain transition-opacity duration-500 ease-in-out select-none"
                            alt={titleFrames[currentIndex].label}
                            style={{ opacity }}
                            onLoad={handleImageLoad}
                        />
                    </div>
                    <span>Menuju</span>
                </div>

                {/* Judul Baris 2 */}
                <div className="mt-1 md:mt-2 flex flex-wrap md:flex-nowrap font-ancizar items-center justify-center md:whitespace-nowrap gap-1.5 md:gap-3 text-[clamp(20px,5.5vw,60px)] font-extrabold text-black tracking-tight leading-[1.2]">
                    <span>Jakarta</span>
                    <div className="bg-blue-100 text-blue-600 rounded-sm px-1.5 py-0.5 md:px-2 md:py-1 flex items-center justify-center">
                        <ArrowRight size={18} strokeWidth={3} className="md:w-6 md:h-6" />
                    </div>
                    <span className="overflow-hidden">Kota Digital</span>
                </div>

                {/* Subtitle — Mobile: pendek & 1 baris */}
                <p
                    className="md:hidden mt-2 text-[11px] text-gray-500 leading-normal anim-fade-in"
                    style={{ animationDelay: '0.35s' }}
                >
                    Jelajahi cerita Jakarta, dari masa ke masa.
                </p>

                {/* Subtitle — Desktop: full copy */}
                <p
                    className="hidden md:block mt-5 text-[15px] max-w-md leading-relaxed anim-fade-in"
                    style={{ animationDelay: '0.35s' }}
                >
                    Telusuri perjalanan panjang jakarta dari masa ke masa<br />
                    dan temukan cerita di setiap sudut kotanya.
                </p>

                {/* Search Bar */}
                <div
                    className="mt-3 md:mt-7 w-full max-w-[260px] md:max-w-[520px] anim-fade-up"
                    style={{ animationDelay: '0.55s' }}
                >
                    <div className="bg-white rounded-xl md:rounded-2xl flex items-center px-3 py-2 md:px-5 md:py-5 shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-gray-200 focus-within:ring-2 focus-within:ring-gray-300 transition-all duration-300 group">
                        <Search className="text-gray-400 mr-2 md:mr-3 shrink-0 transition-colors w-3 h-3 md:w-[18px] md:h-[18px]" />
                        <input
                            type="text"
                            placeholder="Jelajahi Sejarah, budaya, kuliner, dll"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-[10px] md:text-base"
                        />
                    </div>
                </div>
            </div>

            {/* ── 3D Cylinder Concave Carousel ── */}
            <div
                className="carousel-container w-full mt-6 select-none"
                style={{
                    // Tighter perspective on mobile = lebih kuat efek 3D-nya
                    perspective: windowWidth <= 480 ? '500px' : windowWidth <= 768 ? '600px' : '900px',
                    height: windowWidth <= 480 ? '130px' : windowWidth <= 768 ? '170px' : '340px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    // Narrower fade on mobile agar kartu di sisi tidak terpotong
                    maskImage: windowWidth <= 768
                        ? 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                        : 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: windowWidth <= 768
                        ? 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                        : 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
            >
                <div
                    ref={cylinderRef}
                    style={{
                        position: 'relative',
                        width: 0,
                        height: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                    }}
                    onMouseEnter={() => { isHovered.current = true; }}
                    onMouseLeave={() => { isHovered.current = false; }}
                    onTouchStart={() => { isHovered.current = true; }}
                    onTouchEnd={() => { isHovered.current = false; }}
                >
                    {baseLandmarkImages.map((src, i) => {
                        const angle = (360 / TOTAL_ITEMS) * i;
                        const radius = getRadius();
                        return (
                            <div
                                key={i}
                                className="cylinder-card"
                                style={{
                                    position: 'absolute',
                                    width: currentCardWidth,
                                    height: currentCardHeight,
                                    left: -(currentCardWidth / 2),
                                    top: -(currentCardHeight / 2),
                                    // Sudut lebih kecil di mobile
                                    borderRadius: windowWidth <= 480 ? '6px' : windowWidth <= 768 ? '8px' : '1rem',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 20px -6px rgba(0,0,0,0.30)',
                                    // Border tipis di mobile agar tidak dominan di kartu kecil
                                    border: windowWidth <= 480
                                        ? '1.5px solid rgba(255,255,255,0.85)'
                                        : windowWidth <= 768
                                            ? '2px solid rgba(255,255,255,0.85)'
                                            : '3px solid rgba(255,255,255,0.8)',
                                    cursor: 'pointer',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: `rotateY(${angle}deg) translateZ(${-radius}px)`,
                                    willChange: 'transform',
                                }}
                                onClick={() => handleCardClick(i)}
                            >
                                <img
                                    src={src}
                                    alt={`Landmark ${i + 1}`}
                                    className="w-full h-full object-cover pointer-events-none select-none"
                                    draggable={false}
                                    loading="lazy"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hero;

