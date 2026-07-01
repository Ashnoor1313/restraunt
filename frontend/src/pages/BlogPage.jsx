import React, { useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

const mockPosts = [
  {
    title: "The Art of Saffron: Sourcing the Red Gold",
    excerpt: "Discover the journey of hand-harvesting delicate saffron crocus filaments from local Kashan organic fields and how it transforms our Risotto Milanese.",
    date: "June 24, 2026",
    author: "Sommelier Sophia Loren",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Understanding Tannins: Pairing Aged Vintages",
    excerpt: "A guide on pairing high-tannin Cabernet sauvignon wines with grass-fed wood-fire grilled tenderloin and complex bone-marrow coatings.",
    date: "June 18, 2026",
    author: "Chef Marco Vancini",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
  }
];

const BlogPage = () => {
  useEffect(() => {
    document.title = "The Gastronomic Journal & Culinary News | L'Ambroisie";
  }, []);

  return (
    <div className="pt-32 pb-24 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-accent font-semibold flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4 text-theme-accent" /> Culinary Gazette
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">The Gastronomy Journal</h1>
          <p className="text-sm text-theme-text-muted leading-relaxed font-light">
            Insights into foraging techniques, rare vintage releases, and kitchen notes straight from our pastry and grill teams.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
          {mockPosts.map((post, idx) => (
            <div key={idx} className="space-y-6 group">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-theme-card-border/30 shadow-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
              </div>
              <div className="space-y-3">
                <div className="flex gap-4 text-xs text-theme-text-muted items-center">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> By {post.author}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-text group-hover:text-theme-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed font-light">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-theme-accent font-bold group-hover:text-theme-accent-hover transition-colors">
                    Read Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
