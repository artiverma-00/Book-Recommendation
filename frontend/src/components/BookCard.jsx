import React from "react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function BookCard({ book }) {
  const navigate = useNavigate();
  // If no coverUrl is provided, we don't render the card at all (though the parent should filter this)
  const coverUrl = book.image || book.coverUrl || book["Image-URL-M"] || book["Image-URL-L"];
  if (!coverUrl) return null;

  const handleClick = () => {
    navigate(`/book/${book.isbn || book.title}`, { state: { book } });
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden animate-in fade-in duration-500",
        "w-full aspect-[2/3] rounded-xl cursor-pointer shadow-sm hover:shadow-xl",
        "transition-all duration-300 transform hover:-translate-y-2",
        "border border-border bg-card text-card-foreground",
      )}
    >
      <div className="absolute inset-0 w-full h-full z-0 p-2 bg-muted/10">
        <img
          src={coverUrl.replace("http://", "https://")}
          alt={book.title}
          className="w-full h-full object-cover rounded-md shadow-sm"
          onError={(e) => {
            // Show a high-quality fallback for ANY book that fails to load its cover
            e.target.src = "https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=300&auto=format&fit=crop";
          }}
        />
      </div>

      {book.isMatched && (
        <div className="absolute top-2 right-2 z-20 px-2 py-1 bg-primary text-[10px] text-primary-foreground font-bold rounded-md uppercase tracking-tighter shadow-sm animate-pulse">
          Searched Result
        </div>
      )}
      
      <div className="relative z-10 bg-background/80 backdrop-blur-sm p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-border">
        <h3 className="font-semibold text-lg line-clamp-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
      </div>
      
      <div className="absolute top-4 left-4 z-10 w-[calc(100%-2rem)] group-hover:opacity-0 transition-opacity duration-300 bg-background/80 backdrop-blur-md rounded-md p-3 shadow-sm border border-border">
        <h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>
      </div>
    </div>
  );
}
