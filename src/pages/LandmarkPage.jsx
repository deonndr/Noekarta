import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ChevronLeft, MapPin } from 'lucide-react';
import L from 'leaflet';
import { landmarks } from '../data/landmarks';
import logo from '../assets/logo-noekarta.png';
import StreetViewPortal from '../components/StreetViewPortal';

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/f87171/ffffff?text=Image+Not+Available';


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
            map.invalidateSize();
            map.flyTo(position, zoom || 16, { duration: 1.5, animate: true });
        }
    }, [position, zoom, map]);
    return null;
};

const LandmarkPage = () => {
    const navigate = useNavigate();
    const [activeLandmark, setActiveLandmark] = useState(null);
    const [streetViewTarget, setStreetViewTarget] = useState(null);
    const defaultCenter = [-6.1700, 106.8250];

    const handleBack = () => {
        navigate('/', { state: { scrollToLandmarkExplorer: true } });
    };

    const handleLandmarkClick = (landmark) => {
        setActiveLandmark(landmark);
    };

    return (
        <div className="h-screen bg-white font-poppins flex flex-col overflow-hidden">
            {/* Custom Header*/}
            <header className="w-full bg-white border-b border-gray-100 shadow-sm z-50 relative">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between gap-4">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm md:text-base">Kembali</span>
                    </button>

                    {/* Logo Center */}
                    <a href="/" className="absolute left-1/2 -translate-x-1/2">
                        <img src={logo} alt="Noekarta" className="h-8 w-auto" />
                    </a>

                    {/* Title Right */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="hidden md:inline">Jakarta Landmark Explorer</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row overflow-hidden" style={{ height: 'calc(100vh - 72px)' }}>

                {/* Sidebar: Landmark List (Desktop) */}
                <aside className="hidden lg:flex lg:w-[320px] xl:w-[380px] bg-white border-r border-gray-100 flex-col shrink-0 overflow-y-auto h-full">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-gray-900 mb-1">Landmark Jakarta</h1>
                        <p className="text-gray-500 text-sm">Klik landmark untuk menuju lokasinya di peta</p>
                    </div>

                    <div className="flex flex-col gap-2 p-4">
                        {landmarks.map((landmark) => {
                            const isActive = activeLandmark?.id === landmark.id;
                            return (
                                <button
                                    key={landmark.id}
                                    onClick={() => handleLandmarkClick(landmark)}
                                    className={`flex items-center gap-4 p-3 rounded-[14px] text-left transition-all duration-300 border ${
                                        isActive
                                            ? 'bg-red-50 border-red-300 shadow-sm'
                                            : 'bg-white border-gray-100 hover:border-red-200 hover:bg-red-50/40'
                                    }`}
                                >
                                    {/* Thumbnail */}
                                    <div className="w-16 h-16 rounded-[10px] overflow-hidden shrink-0">
                                        <img
                                            src={landmark.image || PLACEHOLDER_IMAGE}
                                            alt={landmark.title}
                                            className="w-full select-none h-full object-cover"
                                            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; e.currentTarget.onerror = null; }}
                                        />
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-semibold text-base truncate ${isActive ? 'text-red-600' : 'text-gray-900'}`}>
                                            {landmark.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-2">
                                            {landmark.description}
                                        </p>
                                    </div>
                                    {/* Pin indicator */}
                                    {isActive && (
                                        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Map */}
                <div className="flex-1 relative h-full min-h-[300px]">
                    <MapContainer
                        center={defaultCenter}
                        zoom={13}
                        minZoom={11}
                        scrollWheelZoom={true}
                        className="w-full h-full"
                        style={{ height: '100%' }}
                        maxBounds={[[-6.3934, 106.6894], [-6.0831, 106.9734]]}
                        maxBoundsViscosity={1.0}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            noWrap={true}
                        />
                        {landmarks.map((landmark) => (
                            <Marker
                                key={landmark.id}
                                position={landmark.position}
                                icon={redIcon}
                                eventHandlers={{
                                    click: () => handleLandmarkClick(landmark),
                                }}
                            >
                                <Popup>
                                    <div className="flex flex-col gap-2 min-w-[160px]">
                                        <img
                                            src={landmark.image || PLACEHOLDER_IMAGE}
                                            alt={landmark.title}
                                            className="w-full h-24 object-cover rounded-lg"
                                            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; e.currentTarget.onerror = null; }}
                                        />
                                        <p className="font-bold text-gray-900 text-sm">{landmark.title}</p>
                                        <p className="text-gray-500 text-xs">{landmark.description}</p>
                                        <button 
                                            onClick={() => setStreetViewTarget(landmark)}
                                            className="mt-1 flex items-center justify-center gap-1.5 bg-red-600 text-white py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-red-700 hover:shadow-lg transition-all duration-300"
                                        >
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                            Lihat 360°
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {activeLandmark && (
                            <MapController position={activeLandmark.position} zoom={16} />
                        )}
                    </MapContainer>

                    {/* Active landmark pill on top of map */}
                    {activeLandmark && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-red-200">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">{activeLandmark.title}</span>
                                <button
                                    onClick={() => setActiveLandmark(null)}
                                    className="ml-1 text-gray-400 hover:text-gray-600 text-xs leading-none"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mobile Landmark Carousel */}
                    <div className="absolute bottom-6 left-0 right-0 z-[1000] lg:hidden">
                        <style>{`
                            .mobile-carousel::-webkit-scrollbar { display: none; }
                        `}</style>
                        <div className="flex overflow-x-auto gap-4 px-4 pb-2 snap-x snap-mandatory mobile-carousel" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {landmarks.map((landmark) => {
                                const isActive = activeLandmark?.id === landmark.id;
                                return (
                                    <button
                                        key={landmark.id}
                                        onClick={() => handleLandmarkClick(landmark)}
                                        className={`flex flex-col gap-3 p-3 rounded-2xl text-left transition-all duration-300 border bg-white shrink-0 w-[260px] snap-center shadow-lg ${
                                            isActive
                                                ? 'border-red-400 ring-4 ring-red-50'
                                                : 'border-gray-100 opacity-95 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="w-full h-32 rounded-xl overflow-hidden shrink-0 relative">
                                            <img
                                                src={landmark.image || PLACEHOLDER_IMAGE}
                                                alt={landmark.title}
                                                className="w-full h-full select-none object-cover"
                                                onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; e.currentTarget.onerror = null; }}
                                            />
                                            {isActive && (
                                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                                                    <MapPin className="w-4 h-4 text-red-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-red-600' : 'text-gray-900'}`}>
                                                {landmark.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
                                                {landmark.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {streetViewTarget && <StreetViewPortal landmark={streetViewTarget} onClose={() => setStreetViewTarget(null)} />}
        </div>
    );
};

export default LandmarkPage;
