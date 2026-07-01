import React, { useEffect } from 'react';
import Hero from '../components/Home/Hero';
import Trust from '../components/Home/Trust';
import Story from '../components/Home/Story';
import SignatureDishes from '../components/Home/SignatureDishes';
import TodaySpecial from '../components/Home/TodaySpecial';
import DiningJourney from '../components/Home/DiningJourney';
import LocationHours from '../components/Home/LocationHours';
import Newsletter from '../components/Home/Newsletter';

const Home = () => {
  // Update document title for SEO
  useEffect(() => {
    document.title = "L'Ambroisie | Fine Dining Parisian Culinary Experience";
  }, []);

  return (
    <div className="relative">
      <Hero />
      <Trust />
      <Story />
      <SignatureDishes />
      <TodaySpecial />
      <DiningJourney />
      <LocationHours />
      <Newsletter />
    </div>
  );
};

export default Home;
