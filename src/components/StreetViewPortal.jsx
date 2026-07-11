import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const StreetViewPortal = ({ landmark, onClose }) => {
    const [showIframe, setShowIframe] = useState(false);
    
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const portalRef = useRef(null);
    const bgImageRef = useRef(null);
    const iframeRef = useRef(null);
    const uiRef = useRef(null);
    const btnRef = useRef(null);
    
    const isClosingRef = useRef(false);

    useEffect(() => {
        if (landmark) {
            isClosingRef.current = false;
            const timer = setTimeout(() => setShowIframe(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setShowIframe(false);
        }
    }, [landmark]);

    const handleClose = () => {
        if (isClosingRef.current) return;
        isClosingRef.current = true;
        
        const tl = gsap.timeline({ onComplete: onClose });

        tl.to(uiRef.current, { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
          .to(btnRef.current, { scale: 0, rotation: 90, duration: 0.3, ease: 'power2.in' }, 0)
          .to(portalRef.current, { scale: 0.8, opacity: 0, borderRadius: '32px', duration: 0.6, ease: 'power3.inOut' }, 0.1)
          .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0.2);
    };

    useGSAP(() => {
        if (!landmark) return;

        const tl = gsap.timeline();

        // 1. Fade in overlay
        gsap.set(overlayRef.current, { opacity: 0 });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);

        // 2. Zoom in portal
        gsap.set(portalRef.current, { scale: 0.5, opacity: 0, borderRadius: '32px' });
        tl.to(portalRef.current, {
            scale: 1,
            opacity: 1,
            borderRadius: '0px',
            duration: 1,
            ease: 'expo.inOut'
        }, 0);

        // 3. UI and Btn entrance
        gsap.set(uiRef.current, { y: -30, opacity: 0 });
        gsap.set(btnRef.current, { scale: 0, rotation: -90 });
        
        tl.to(uiRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.6)
          .to(btnRef.current, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.5)' }, 0.7);

    }, { dependencies: [landmark], scope: containerRef });

    useGSAP(() => {
        if (showIframe) {
            gsap.to(bgImageRef.current, { opacity: 0, scale: 1.2, duration: 1.5, ease: 'power2.inOut' });
            if (iframeRef.current) {
                gsap.fromTo(iframeRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.3, ease: 'power2.inOut' });
            }
        } else {
            gsap.set(bgImageRef.current, { opacity: 1, scale: 1 });
        }
    }, { dependencies: [showIframe], scope: containerRef });

    // Gunakan koordinat khusus Street View jika ada, kalau tidak gunakan koordinat pin
    const svLat = landmark?.streetViewPosition ? landmark.streetViewPosition[0] : landmark?.position[0];
    const svLng = landmark?.streetViewPosition ? landmark.streetViewPosition[1] : landmark?.position[1];

    const streetViewUrl = landmark ? `https://maps.google.com/maps?q=${svLat},${svLng}&layer=c&cbll=${svLat},${svLng}&cbp=12,0,0,0,0&output=svembed` : '';

    if (typeof document === 'undefined' || !landmark) return null;

    return createPortal(
        <div ref={containerRef} className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden">
            {/* Overlay bg */}
            <div ref={overlayRef} className="absolute inset-0 bg-black"></div>
            
            <div
                ref={portalRef}
                className="relative w-full h-full bg-black overflow-hidden"
            >
                {/* Background image that zooms in and fades out as Street View loads */}
                <div
                    ref={bgImageRef}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${landmark.image})` }}
                />

                {/* Google Street View iframe */}
                {showIframe && (
                    <iframe
                        ref={iframeRef}
                        src={streetViewUrl}
                        className="absolute inset-0 w-full h-full z-10 border-0"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                )}

                {/* UI Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20 flex justify-between items-start pointer-events-none">
                    <div
                        ref={uiRef}
                        className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl text-white pointer-events-auto shadow-2xl border border-white/10 max-w-md"
                    >
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-3">
                            {landmark.title}
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded text-white">
                                360° Street View
                            </span>
                        </h2>
                        <p className="text-xs text-gray-300 mt-1 hidden md:block leading-relaxed">
                            {landmark.description}
                        </p>
                    </div>

                    <button
                        ref={btnRef}
                        onClick={handleClose}
                        className="bg-white/10 hover:bg-red-600 backdrop-blur-md text-white p-3 rounded-full shadow-lg transition-colors pointer-events-auto flex items-center justify-center cursor-pointer border border-white/20 group"
                        title="Tutup Street View"
                    >
                        <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default StreetViewPortal;
