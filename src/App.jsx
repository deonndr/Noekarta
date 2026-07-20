import { useEffect, useRef, lazy, Suspense, useState } from 'react';
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
import NoeQuiz from './components/NoeQuiz';
import Footer from './components/Footer';
import Seo from './components/Seo';

const LandmarkPage = lazy(() => import('./pages/LandmarkPage'));
const ApaItuJakartaPage = lazy(() => import('./pages/ApaItuJakartaPage'));
const NoeQuizPage = lazy(() => import('./pages/NoeQuizPage'));
const KulinerPage = lazy(() => import('./pages/KulinerPage'));
const InventoryPage = lazy(() => import('./pages/InventoryPage'));
import 'lenis/dist/lenis.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function LandingPage({ completedStations = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
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
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      <Seo
        title="Jelajahi Jakarta"
        description="Jelajahi sejarah, budaya Betawi, kuliner khas, landmark, dan cerita Jakarta melalui pengalaman interaktif dari Noekarta."
      />
      <Navbar />
      <Hero />
      <div className="gsap-section"><About /></div>
      <div className="gsap-section"><History /></div>
      <div className="gsap-section"><BetawiHeritage /></div>
      <div className="gsap-section"><KulinerJakarta /></div>
      <div className="gsap-section"><LandmarkExplorer /></div>
      <div className="gsap-section"><NoeQuiz completedStations={completedStations} /></div>
      <Footer />
    </div>
  );
}

function App() {
  const [completedStations, setCompletedStations] = useState([]);

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="h-screen w-screen bg-[#FAFAFA] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage completedStations={completedStations} />} />
          <Route path="/landmark-explorer" element={<LandmarkPage />} />
          <Route path="/apa-itu-jakarta" element={<ApaItuJakartaPage />} />
          <Route path="/noequiz" element={<NoeQuizPage completedStations={completedStations} setCompletedStations={setCompletedStations} />} />
          <Route path="/kuliner" element={<KulinerPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
