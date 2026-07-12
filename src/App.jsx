import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LandmarkExplorer from './components/LandmarkExplorer';
import History from './components/history';
import BetawiHeritage from './components/BetawiHeritage';
import KulinerJakarta from './components/KulinerJakarta';
import LandmarkPage from './pages/LandmarkPage';
import 'lenis/dist/lenis.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const sections = containerRef.current.querySelectorAll('.gsap-section');
    
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { 
          opacity: 0, 
          y: 70 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-poppins" ref={containerRef}>
      <Navbar />
      <Hero />
      <div className="gsap-section"><About /></div>
      <div className="gsap-section"><History /></div>
      <div className="gsap-section"><BetawiHeritage /></div>
      <div className="gsap-section"><KulinerJakarta /></div>
      <div className="gsap-section"><LandmarkExplorer /></div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landmark-explorer" element={<LandmarkPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
