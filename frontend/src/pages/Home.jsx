import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { RecommendationGrid } from "../components/RecommendationGrid";
import AnimatedGridPattern from "../components/magicui/animated-grid-pattern";
import GradientText from "../components/magicui/gradient-text";
import { BookOpen } from "lucide-react";
import { getBooks } from "../services/api";

const Home = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const books = await getBooks();
        setRecommendations(books);
      } catch (error) {
        console.error("Failed to load popular books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  const handleRecommendations = (recs) => {
    setRecommendations(recs);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-start overflow-x-hidden relative selection:bg-primary/30 font-sans">
      <AnimatedGridPattern />

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="container relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="p-3 bg-primary/10 rounded-2xl shadow-sm border border-primary/20 mb-2">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center">
            Discover Your Next <br />
            <GradientText>Favorite Book</GradientText>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl px-4">
            Our ML-powered recommendation engine analyzes reading patterns to
            find the perfect book for your taste.
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-xl relative z-50 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
          <SearchBar onRecommendations={handleRecommendations} />
        </div>

        {/* Recommendations Section */}
        <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          {loading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
              <p className="text-muted-foreground animate-pulse">Analyzing literary patterns...</p>
            </div>
          ) : (
            <RecommendationGrid recommendations={recommendations} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
