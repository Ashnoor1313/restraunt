import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/Common/SmoothScroll';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Loader from './components/UI/Loader';
import BackgroundBlobs from './components/UI/BackgroundBlobs';
import RouteFallbackLoader from './components/UI/RouteFallbackLoader';

// Pages - Lazy loaded for production performance optimization
const Home = lazy(() => import('./pages/Home'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const ReservationPage = lazy(() => import('./pages/ReservationPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
            <Suspense fallback={<RouteFallbackLoader />}>
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
            </Suspense>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
