import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { getRecommendations } from "../services/api";
import { toast } from "sonner";

export function SearchBar({ onRecommendations }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock array for autocomplete presentation
  const dummyBooks = [
    "Animal Farm",
    "1984",
    "The Hobbit",
    "Harry Potter",
    "The Great Gatsby",
    "Pride and Prejudice",
    "To Kill a Mockingbird",
    "The Catcher in the Rye",
  ];
  const suggestions = query
    ? dummyBooks.filter((b) => b.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;
    onRecommendations(null); // Clear previous results while loading
    setLoading(true);
    setQuery(searchQuery);
    setShowSuggestions(false);
    try {
      const recs = await getRecommendations(searchQuery);
      onRecommendations(recs);
    } catch (error) {
      toast.error("Unable to find exact matches. Try a different title!");
      onRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col gap-2 z-50">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          className="h-12 bg-background/80 backdrop-blur-sm text-lg shadow-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(query);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Button
          type="submit"
          className="h-12 px-6 shadow-sm"
          disabled={loading}
          onClick={() => handleSearch(query)}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full"></span>
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </div>

      {showSuggestions && query && suggestions.length > 0 && (
        <div className="absolute top-14 w-full bg-background border border-border rounded-md shadow-2xl z-[100] p-2 animate-in fade-in slide-in-from-top-2">
          {suggestions.map((book, index) => (
            <div
              key={`${book}-${index}`}
              className="px-4 py-3 hover:bg-muted cursor-pointer rounded-sm text-sm"
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery(book);
                handleSearch(book);
              }}
            >
              {book}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
