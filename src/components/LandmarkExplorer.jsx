import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Bookmark, Map as MapIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { landmarks } from '../data/landmarks';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom red marker icon
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Fly-to controller
const MapController = ({ position, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, zoom || 16, { duration: 1.5 });
        }
    }, [position, zoom, map]);
    return null;
};

const LandmarkExplorer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLandmark, setActiveLandmark] = useState(null);
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const defaultCenter = [-6.1700, 106.8250];

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
        <section ref={sectionRef} id="landmark-explorer" className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto font-poppins relative z-10 bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl md:text-[32px] font-bold text-gray-900 mb-2">
                        Jakarta Landmark Explorer
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Temukan Landmark Iconik Jakarta dan simpan favoritmu
                    </p>
                </div>
                <button onClick={handleOpenMap} className="flex items-center justify-center gap-2 px-6 py-2.5 border border-red-500 text-red-500 rounded-full font-medium hover:bg-red-50 transition-colors shrink-0">
                    Lihat Semua Landmark
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Horizontal Scroll */}
            <div className="relative mb-8">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
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
                                <div className="absolute top-2 right-2 bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                                    <Bookmark className="w-3.5 h-3.5 text-red-500" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-center text-gray-900 pb-1 text-sm md:text-base">
                                {landmark.title}
                            </h3>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Map Preview Section */}
            <div className="relative w-full h-[350px] md:h-[380px] rounded-[24px] overflow-hidden border border-red-400 bg-gray-100 shadow-sm">
                <MapContainer
                    center={defaultCenter}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                    style={{ minHeight: '350px' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {landmarks.map((landmark) => (
                        <Marker
                            key={landmark.id}
                            position={landmark.position}
                            icon={redIcon}
                            eventHandlers={{
                                click: () => setActiveLandmark(landmark),
                            }}
                        >
                            <Popup>
                                <div className="flex flex-col gap-2 min-w-[160px]">
                                    <img
                                        src={landmark.image}
                                        alt={landmark.title}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <p className="font-bold text-gray-900 text-sm">{landmark.title}</p>
                                    <p className="text-gray-500 text-xs">{landmark.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    {activeLandmark && (
                        <MapController position={activeLandmark.position} zoom={16} />
                    )}
                </MapContainer>

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
                        className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        <MapIcon className="w-5 h-5 text-gray-700" />
                        Buka Peta Interaktif
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LandmarkExplorer;
