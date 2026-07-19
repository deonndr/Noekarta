import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

import logoNoekarta from '../assets/logo-noekarta2.webp';
import footerBg from '../assets/components/component-footer.png';
import monasLogo from '../assets/components/component-footer2.png';

const Footer = () => {
  const monasRef = React.useRef(null);

  React.useEffect(() => {
    if (monasRef.current) {
      gsap.fromTo(monasRef.current, 
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: monasRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-[#0A1841] text-white">
      {/* Layer 1: Background Image */}
      <div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Layer 2: Monas Logo (Animated) */}
      <div className="absolute right-0 bottom-0 z-10 h-full w-[80%] max-w-[650px] flex items-end justify-end pointer-events-none">
        <img 
          ref={monasRef}
          src={monasLogo} 
          alt="Monas Logo" 
          className="h-full w-auto object-contain object-right-bottom"
          style={{ opacity: 0 }} // Initial state for GSAP
        />
      </div>
      
      {/* Layer 3: Content */}
      <div className="relative z-20 mx-auto w-full max-w-[1300px] px-6 py-16 md:px-12 lg:px-16 lg:pt-24 lg:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column - Branding */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start pr-0 md:pr-12">
             <div className="mb-6">
                <img src={logoNoekarta} alt="Noekarta" className="h-10" />
             </div>
             
             <p className="mb-8 text-sm leading-relaxed text-[#c3ceea] max-w-[320px]">
                Noekarta adalah website yang di buat untuk memperkenalkan budaya, kuliner, sejarah dari kota jakarta
             </p>
             
             <a href="https://www.instagram.com/rpl_smkantartika1sda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-[14px] bg-[#1d2a54] px-6 py-3 text-sm font-semibold transition hover:bg-[#273a6a] hover:-translate-y-0.5 border border-white/5">
                <InstagramIcon className="h-5 w-5" />
                @SmartOneDev
             </a>
          </div>
          
    

          {/* Jakarta Column */}
          <div className="col-span-1 lg:col-span-2 pt-2">
             <h3 className="mb-6 text-lg font-bold text-white">Jakarta</h3>
             <ul className="space-y-4 text-[15px] font-medium text-[#c3ceea]">
                <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Tentang Jakarta</a></li>
             </ul>
          </div>
          
          {/* Jelajahi Column */}
          <div className="col-span-1 lg:col-span-2 pt-2">
             <h3 className="mb-6 text-lg font-bold text-white">Jelajahi</h3>
             <ul className="space-y-4 text-[15px] font-medium text-[#c3ceea]">
                <li><a href="#" className="hover:text-white transition-colors">Sejarah</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Budaya</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kuliner</a></li>
                <li><Link to="/landmark-explorer" className="hover:text-white transition-colors">Landmark Jakarta</Link></li>
             </ul>
          </div>
          
          {/* Game Column */}
          <div className="col-span-1 lg:col-span-2 pt-2">
             <h3 className="mb-6 text-lg font-bold text-white">Game</h3>
             <ul className="space-y-4 text-[15px] font-medium text-[#c3ceea]">
                <li><Link to="/noequiz" className="hover:text-white transition-colors">NoeQuiz</Link></li>
             </ul>
          </div>
          
        </div>
        
        {/* Bottom Section */}
        <div className="mt-28 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-end">
           <div className="col-span-1 lg:col-span-5">
             <p className="text-[13px] font-medium text-[#849bc5]">
                © 2026 Noekarta Jaya Motor Abadi, Antrekkkkk one
             </p>
           </div>
           
           <div className="col-span-1 lg:col-span-7">
             <div className="flex flex-wrap items-center gap-3">
                <a href="#" className="flex items-center gap-2 rounded-lg bg-[#1d2a54] px-4 py-2.5 text-xs font-semibold text-[#e1e7f5] transition hover:bg-[#273a6a] hover:-translate-y-0.5 border border-white/5">
                   <InstagramIcon className="h-4 w-4" />
                   @aaldiansyah_
                </a>
                <a href="#" className="flex items-center gap-2 rounded-lg bg-[#1d2a54] px-4 py-2.5 text-xs font-semibold text-[#e1e7f5] transition hover:bg-[#273a6a] hover:-translate-y-0.5 border border-white/5">
                   <InstagramIcon className="h-4 w-4" />
                   @bb_nndr
                </a>
                <a href="#" className="flex items-center gap-2 rounded-lg bg-[#1d2a54] px-4 py-2.5 text-xs font-semibold text-[#e1e7f5] transition hover:bg-[#273a6a] hover:-translate-y-0.5 border border-white/5">
                   <InstagramIcon className="h-4 w-4" />
                   @mlnarasyaaa_
                </a>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
