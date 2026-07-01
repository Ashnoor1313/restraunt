import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/Common/SmoothScroll';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Loader from './components/UI/Loader';
import BackgroundBlobs from './components/UI/BackgroundBlobs';

// Pages
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <BackgroundBlobs />
        
        {/* Visual Loader on first load */}
        <Loader />

        <div className="flex flex-col min-h-screen bg-transparent text-theme-text transition-colors duration-500 relative">
          {/* Header / Nav */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/reservation" element={<ReservationPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
