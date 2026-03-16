import React from "react";
import { BookCard } from "./BookCard";

export function RecommendationGrid({ recommendations }) {
  // Filter books to only show those with a valid cover image
  const validBooks = (recommendations || []).filter((rec) => {
    if (!rec || typeof rec !== "object") return false;
    
    // Unified cover URL check
    const coverUrl =
      rec.image ||
      rec.coverUrl ||
      rec["Image-URL-M"] ||
      rec["Image-URL-L"];
    
    if (!coverUrl || typeof coverUrl !== "string") return false;
    const lowerUrl = coverUrl.toLowerCase();
    
    // Relaxed filtering: always show searched result, others hide only if text 'placeholder' exists
    return (
      rec.isMatched ||
      (coverUrl && 
       coverUrl.trim() !== "" && 
       !lowerUrl.includes("placeholder") &&
       !lowerUrl.includes("unsplash.com"))
    );
  });

  if (validBooks.length === 0) {
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
        {validBooks.map((rec, index) => (
          <BookCard key={rec.isbn || `${rec.title}-${index}`} book={rec} />
        ))}
      </div>
    </div>
  );
}

