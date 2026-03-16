import React from 'react';
import { BookCard } from './BookCard';

export function RecommendationGrid({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-muted-foreground bg-card rounded-xl border border-border/50 shadow-sm mt-8">
        <p className="text-lg">No recommendations yet.</p>
        <p className="text-sm">Search for a book to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-12 relative z-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
        Recommended Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((rec, index) => {
          const title = typeof rec === 'object' 
            ? (rec.title || rec['Book-Title'] || rec[0] || 'Unknown Book') 
            : rec;
          return (
            <BookCard 
              key={`${title}-${index}`} 
              title={title} 
              coverUrl={
                typeof rec === 'object' 
                  ? (rec.coverUrl || rec.image || rec['Image-URL-M'] || rec['Image-URL-L'] || rec[1] || null) 
                  : null
              } 
            />
          );
        })}
      </div>
    </div>
  );
}
