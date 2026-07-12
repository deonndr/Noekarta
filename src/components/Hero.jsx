import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Star, ArrowRight } from 'lucide-react';

// impor component
import component2 from '../assets/components/starcomponent.png';

// impor gambar judul
import img1 from '../assets/hero-title1.png';
import img2 from '../assets/hero-title2.png';
import img3 from '../assets/hero-title3.png';
import img4 from '../assets/hero-title4.png';
import img5 from '../assets/hero-title5.png';
import img6 from '../assets/hero-title6.png';

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
const imageModules = import.meta.glob('../assets/landmarkjakarta*.png', { eager: true, import: 'default' });
const baseLandmarkImages = Object.keys(imageModules)
    .sort((a, b) => {
        const numA = parseInt(a.match(/landmarkjakarta(\d+)\.png/)[1], 10);
        const numB = parseInt(b.match(/landmarkjakarta(\d+)\.png/)[1], 10);
        return numA - numB;
    })
    .map(key => imageModules[key]);

// Duplicate for seamless infinite loop (3 sets to be safe)
const landmarkImages = [...baseLandmarkImages, ...baseLandmarkImages, ...baseLandmarkImages];

// ── Arc geometry constants ──
const ARC_MAX_ROTATE = 15;     // max rotateZ in degrees
const ARC_MAX_TRANSLATE_Y = 40; // max Y drop in px for arc curve
const ARC_MIN_SCALE = 0.85;    // scale at edges
const ARC_Z_BASE = 20;         // base z-index for center card
const CARD_WIDTH = 200;
const CARD_HEIGHT = 260;
const CARD_GAP = 16;
const AUTO_SCROLL_SPEED = 1;   // px per frame

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const fadeTimeoutRef = useRef(null);

    // Arc carousel refs
    const carouselRef = useRef(null);
    const cardRefs = useRef([]);
    const visibleCards = useRef(new Set());
    const rafId = useRef(null);
    const autoScrollRafId = useRef(null);
    const resizeTimer = useRef(null);
    const isHovered = useRef(false);

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

    // ── Arc Coverflow: calculate & apply transforms ──
    const applyArcTransforms = useCallback(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const scrollLeft = carousel.scrollLeft;
        const containerWidth = carousel.clientWidth;
        const centerX = scrollLeft + containerWidth / 2;

        // Only process visible cards + small buffer
        visibleCards.current.forEach((idx) => {
            const card = cardRefs.current[idx];
            if (!card) return;

            const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
            // Normalize offset: -1 (far left) to +1 (far right)
            const halfContainer = containerWidth / 2;
            const rawOffset = (cardCenterX - centerX) / halfContainer;
            const offset = Math.max(-1, Math.min(1, rawOffset));

            const rotateZ = offset * ARC_MAX_ROTATE;
            const translateY = Math.abs(offset) * ARC_MAX_TRANSLATE_Y;
            const scale = 1 - Math.abs(offset) * (1 - ARC_MIN_SCALE);
            const zIndex = ARC_Z_BASE - Math.round(Math.abs(offset) * 10);

            card.style.transform =
                `translate3d(0, ${translateY}px, 0) rotateZ(${rotateZ}deg) scale(${scale})`;
            card.style.zIndex = zIndex;
        });
    }, []);

    // RAF-throttled scroll handler
    const handleCarouselScroll = useCallback(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        // Seamless loop logic
        const singleSetWidth = baseLandmarkImages.length * (CARD_WIDTH + CARD_GAP);

        // If we scrolled past the first set, seamlessly jump back one set
        if (carousel.scrollLeft > singleSetWidth * 1.5) {
            carousel.scrollLeft -= singleSetWidth;
        } else if (carousel.scrollLeft < singleSetWidth * 0.5) {
            // If we scrolled backwards too far, seamlessly jump forward one set
            carousel.scrollLeft += singleSetWidth;
        }

        if (rafId.current) return; // Skip if frame already pending
        rafId.current = requestAnimationFrame(() => {
            applyArcTransforms();
            rafId.current = null;
        });
    }, [applyArcTransforms]);

    // ── IntersectionObserver: track which cards are visible ──
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number(entry.target.dataset.idx);
                    if (entry.isIntersecting) {
                        visibleCards.current.add(idx);
                        entry.target.classList.add('arc-card--active');
                    } else {
                        visibleCards.current.delete(idx);
                        entry.target.classList.remove('arc-card--active');
                        // Reset transform for off-screen cards
                        entry.target.style.transform = '';
                        entry.target.style.zIndex = '';
                    }
                });
                // Recalculate after visibility changes
                applyArcTransforms();
            },
            {
                root: carousel,
                rootMargin: '0px 250px', // buffer ~1 card beyond viewport
                threshold: 0,
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [applyArcTransforms]);

    // ── Auto-scroll loop ──
    useEffect(() => {
        const scrollLoop = () => {
            const carousel = carouselRef.current;
            if (carousel && !isHovered.current) {
                // Increment scroll
                carousel.scrollLeft += AUTO_SCROLL_SPEED;
            }
            autoScrollRafId.current = requestAnimationFrame(scrollLoop);
        };

        autoScrollRafId.current = requestAnimationFrame(scrollLoop);

        return () => {
            if (autoScrollRafId.current) cancelAnimationFrame(autoScrollRafId.current);
        };
    }, []);

    // ── Scroll listener with RAF throttle ──
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        carousel.addEventListener('scroll', handleCarouselScroll, { passive: true });

        // Initial calculation
        applyArcTransforms();

        return () => {
            carousel.removeEventListener('scroll', handleCarouselScroll);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
        };
    }, [handleCarouselScroll, applyArcTransforms]);

    // ── Debounced resize ──
    useEffect(() => {
        const handleResize = () => {
            if (resizeTimer.current) clearTimeout(resizeTimer.current);
            resizeTimer.current = setTimeout(() => {
                applyArcTransforms();
            }, 300);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimer.current) clearTimeout(resizeTimer.current);
        };
    }, [applyArcTransforms]);

    // Scroll carousel to center of the middle set on mount
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        // Small delay to ensure layout is ready
        const timer = setTimeout(() => {
            const singleSetWidth = baseLandmarkImages.length * (CARD_WIDTH + CARD_GAP);
            // Start in the middle of the second set
            const startPos = singleSetWidth + (singleSetWidth / 2) - (carousel.clientWidth / 2);
            carousel.scrollLeft = Math.max(0, startPos);
            applyArcTransforms();
        }, 100);

        return () => clearTimeout(timer);
    }, [applyArcTransforms]);

    // Side padding so first/last card can reach center
    const sidePadding =
        typeof window !== 'undefined'
            ? Math.max(window.innerWidth / 2 - CARD_WIDTH / 2, 100)
            : 400;

    return (
        <section className="w-full flex flex-col items-center justify-start pt-16 pb-0 relative overflow-hidden">

            {/* ── Floating Cards ── absolute ke section, di luar area teks ── */}
            {/* Top-left: 30+ Budaya Betawi */}
            <img
                src={cardfly1}
                alt="30+ Budaya Betawi"
                className="hidden lg:block select-none absolute z-20"
                style={{ left: '10%', top: '1%', width: 250, animation: 'float-card-1 8s ease-in-out infinite' }}
            />
            {/* Top-right: 50+ Kuliner Khas */}
            <img
                src={cardfly2}
                alt="50+ Kuliner Khas"
                className="hidden lg:block selecg-none absolute z-20"
                style={{ right: '10%', top: '1%', width: 250, animation: 'float-card-2 9s ease-in-out infinite' }}
            />
            {/* Bottom-left: 6 Kota Sejarah */}
            <img
                src={cardfly3}
                alt="6 Kota Sejarah"
                className="hidden lg:block select-none absolute z-20"
                style={{ left: '8%', top: '35%', width: 250, animation: 'float-card-3 8.5s ease-in-out infinite' }}
            />
            {/* Bottom-right: 200+ Landmark */}
            <img
                src={cardfly4}
                alt="200+ Landmark"
                className="hidden lg:block select-none absolute z-20"
                style={{ right: '8%', top: '35%', width: 250, animation: 'float-card-4 9.5s ease-in-out infinite' }}
            />

            {/* ── Konten Tengah ── */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 text-center">

                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 items-center rounded-full px-4 py-2 text-xs md:text-sm font-semibold bg-gray-50 mb-6 anim-fade-up"
                >
                    <img src={component2} alt="Star" className="mr-1" />
                    <p className="text-indigo-950">
                        Jelajahi Sejarah, Budaya &amp; Kuliner
                    </p>
                </div>

                {/* Judul Baris 1 */}
                <div className="flex font-ancizar items-center justify-center whitespace-nowrap gap-2 md:gap-3 text-[28px] sm:text-[34px] md:text-[44px] lg:text-[60px] font-extrabold text-black tracking-tight leading-[1.15]">
                    <span>Dari Jejak</span>
                    <div
                        ref={containerRef}
                        className="flex items-center justify-center h-10 sm:h-12 md:h-16 lg:h-[80px] transition-[width] duration-500 ease-in-out"
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
                <div className="mt-2 flex font-ancizar items-center justify-center whitespace-nowrap gap-2 md:gap-3 text-[28px] sm:text-[34px] md:text-[44px] lg:text-[60px] font-extrabold text-black tracking-tight leading-[1.15]">
                    <span>Jakarta</span>
                    <div className="bg-blue-100 text-blue-600 rounded-sm px-2 py-1 flex items-center justify-center">
                        <ArrowRight size={20} strokeWidth={3} className="md:w-6 md:h-6" />
                    </div>
                    <span className="overflow-hidden">Kota Digital</span>
                </div>

                {/* Subtitle */}
                <p
                    className="mt-5 text-sm md:text-[15px]  max-w-sm md:max-w-md leading-relaxed anim-fade-in"
                    style={{ animationDelay: '0.35s' }}
                >
                    Telusuri perjalanan panjang jakarta dari masa ke masa<br className="hidden md:block" />
                    dan temukan cerita di setiap sudut kotanya.
                </p>

                {/* Search Bar */}
                <div
                    className="mt-7 w-full max-w-[520px] anim-fade-up"
                    style={{ animationDelay: '0.55s' }}
                >
                    <div className="bg-white rounded-2xl flex items-center px-5 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-gray-200 focus-within:ring-2 focus-within:ring-gray-300 transition-all duration-300 group">
                        <Search className="text-gray-400 mr-3 shrink-0 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Jelajahi Sejarah, budaya, kuliner, dll"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
                        />
                    </div>
                </div>
            </div>

            {/* ── Arc Coverflow Carousel ── */}
            <div
                className="w-full mt-10 overflow-hidden"
                style={{ perspective: '1200px' }}
            >
                <div
                    ref={carouselRef}
                    className="arc-carousel select-none flex items-end overflow-x-scroll"
                    style={{
                        gap: CARD_GAP,
                        paddingLeft: sidePadding,
                        paddingRight: sidePadding,
                        paddingBottom: ARC_MAX_TRANSLATE_Y + 50,
                        paddingTop: ARC_MAX_TRANSLATE_Y + 10,
                        maskImage:
                            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                        // Optional: remove smooth behavior during auto scroll to prevent stutter
                        scrollBehavior: 'auto'
                    }}
                    onMouseEnter={() => { isHovered.current = true; }}
                    onMouseLeave={() => { isHovered.current = false; }}
                    onTouchStart={() => { isHovered.current = true; }}
                    onTouchEnd={() => { isHovered.current = false; }}
                >
                    {landmarkImages.map((src, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            data-idx={i}
                            className="arc-card shrink-0 rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.18)] border-[3px] border-white cursor-grab active:cursor-grabbing"
                            style={{
                                width: CARD_WIDTH,
                                height: CARD_HEIGHT,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Landmark ${i + 1}`}
                                className="w-full h-full object-cover pointer-events-none"
                                draggable={false}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;

