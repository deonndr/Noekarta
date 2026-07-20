import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

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

const LandmarkMap = ({ landmarks, activeLandmark, setActiveLandmark, setStreetViewTarget, defaultCenter }) => {
    return (
        <MapContainer
            center={defaultCenter}
            zoom={13}
            minZoom={11}
            scrollWheelZoom={true}
            className="w-full h-full text-black"
            style={{ minHeight: '350px' }}
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
                        click: () => setActiveLandmark(landmark),
                    }}
                >
                    <Popup>
                        <div className="flex flex-col gap-2 min-w-[160px] text-black">
                            <img
                                src={landmark.image}
                                alt={landmark.title}
                                className="w-full h-24 object-cover rounded-lg select-none"
                            />
                            <p className="font-bold text-gray-900 text-sm m-0">{landmark.title}</p>
                            <p className="text-gray-500 text-xs m-0">{landmark.description}</p>
                            <button
                                onClick={() => setStreetViewTarget(landmark)}
                                className="mt-1 flex items-center justify-center gap-1.5 bg-red-600 text-white py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-red-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
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
    );
};

export default LandmarkMap;
