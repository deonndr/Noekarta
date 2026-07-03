import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
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

function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />
      <Hero />
      <About />
      <History />
      <BetawiHeritage />
      <KulinerJakarta />
      <LandmarkExplorer />
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
