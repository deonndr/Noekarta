import { useRef, useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bookmark, Map as MapIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { useInView } from 'motion/react';
import { landmarks } from '../data/landmarks';
import StreetViewPortal from './StreetViewPortal';
import cardfly from '../assets/cardfly4.svg';

const LandmarkMap = lazy(() => import('./LandmarkMap'));

const LandmarkExplorer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLandmark, setActiveLandmark] = useState(null);
    const [streetViewTarget, setStreetViewTarget] = useState(null);
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { margin: '200px' });
    const defaultCenter = [-6.1700, 106.8250];

    const [isMapVisible, setIsMapVisible] = useState(false);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsMapVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '300px 0px',
                threshold: 0.01,
            }
        );

        observer.observe(mapContainerRef.current);
        return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
        if (location.state?.scrollToLandmarkExplorer && sectionRef.current) {

            // Scroll instantly before the browser paints the first frame
            sectionRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });

            // If Lenis is already initialized, sync it immediately
            if (window.lenis) {
                window.lenis.scrollTo(sectionRef.current, { immediate: true });
            }
        }
    }, [location]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.querySelector('div:first-child')?.offsetWidth || 280;
        const gap = 16;
        const scrollAmount = cardWidth + gap;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    const handleOpenMap = () => {
        navigate('/landmark-explorer');
    };

    return (
        <section ref={sectionRef} id="landmark-explorer" className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto font-poppins relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl md:text-[32px] font-ancizar font-bold text-gray-900 mb-2">
                        Jakarta Landmark Explorer
                    </h2>
                    <p className=" text-lg">
                        Temukan Landmark Iconik Jakarta dan simpan favoritmu
                    </p>
                </div>
                <img src={cardfly}
                    alt="landmark"
                    className="select-none w-[230px]"
                    style={{ animation: isSectionInView ? 'float-card-2 9s ease-in-out infinite' : 'none' }}
                />
            </div>

            {/* Horizontal Scroll */}
            <div className="relative mb-8">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-200  hover:text-blue-500 cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-2 pb-2 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {landmarks.map((landmark) => (
                        <div
                            key={landmark.id}
                            onClick={() => setActiveLandmark(landmark)}
                            className="snap-start shrink-0 w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] max-w-[280px] bg-white rounded-[15px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 p-2 cursor-pointer group flex flex-col"
                        >
                            <div className="relative w-full h-[130px] rounded-[10px] overflow-hidden mb-3">
                                <img
                                    src={landmark.image}
                                    alt={landmark.title}
                                    className="w-full h-full select-none object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                               
                            </div>
                            <h3 className="font-semibold text-center text-gray-900 pb-1 text-sm md:text-base">
                                {landmark.title}
                            </h3>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-200  hover:text-blue-500 cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Map Preview Section */}
            <div ref={mapContainerRef} className="relative w-full h-[350px] md:h-[380px] rounded-[24px] overflow-hidden border border-blue-400 bg-gray-100 shadow-sm">
                <Suspense fallback={
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-[1px] z-[999] pointer-events-none">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm font-semibold text-gray-700 tracking-wide">Memuat Peta...</p>
                    </div>
                }>
                    {isMapVisible ? (
                        <LandmarkMap
                            landmarks={landmarks}
                            activeLandmark={activeLandmark}
                            setActiveLandmark={setActiveLandmark}
                            setStreetViewTarget={setStreetViewTarget}
                            defaultCenter={defaultCenter}
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                            <p className="text-sm font-semibold text-gray-700 tracking-wide">Mempersiapkan Peta...</p>
                        </div>
                    )}
                </Suspense>

                {/* Active landmark pill */}
                {activeLandmark && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-red-200">
                            <MapIcon className="w-4 h-4 text-red-500" />
                            <span className="font-semibold text-gray-800 text-sm">{activeLandmark.title}</span>
                            <button
                                onClick={() => setActiveLandmark(null)}
                                className="ml-1 text-gray-400 hover:text-gray-600 text-xs leading-none"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                    <button
                        onClick={handleOpenMap}
                        className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <MapIcon className="w-5 h-5 text-gray-700" />
                        Buka Peta Interaktif
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>
            {streetViewTarget && <StreetViewPortal landmark={streetViewTarget} onClose={() => setStreetViewTarget(null)} />}
        </section>
    );
};

export default LandmarkExplorer;
