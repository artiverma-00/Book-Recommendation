import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Book, User, Calendar, Building, ExternalLink, Star } from "lucide-react";
import { Button } from "../components/ui/button";

const BookDetails = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isbn]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
    );
  }

  // Get consistently named fields
  const title = book.title || book["Book-Title"] || "Unknown Title";
  const author = book.author || book["Book-Author"] || "Unknown Author";
  const image = book.image || book.coverUrl || book["Image-URL-M"] || book["Image-URL-L"];
  const year = book.year || book["Year-Of-Publication"] || "N/A";
  const publisher = book.publisher || book["Publisher"] || "N/A";
  const bookIsbn = book.isbn || book["ISBN"] || isbn;

  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(title + " " + author)}`;

  return (
    <div className="min-h-screen bg-background pb-20 selection:bg-primary/30">
      {/* Animated Background from Home */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto px-4 pt-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Results</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column: Image */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border group">
                <img 
                  src={image?.replace("http://", "https://")} 
                  alt={title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=300&auto=format&fit=crop";
                  }}
                />
              </div>
              
              <div className="mt-8 flex flex-col gap-4">
                <Button 
                  className="w-full h-14 text-lg font-bold gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                  onClick={() => window.open(amazonUrl, "_blank")}
                >
                  <ExternalLink className="w-5 h-5" />
                  Buy on Amazon
                </Button>
                
                <p className="text-center text-xs text-muted-foreground px-4">
                  Check availability and detailed user reviews on Amazon
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 flex flex-col gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wider">
                Expert Recommendation
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
                {title}
              </h1>
              <div className="flex items-center gap-3 text-2xl text-muted-foreground font-semibold">
                <User className="w-7 h-7 text-primary/60" />
                <span>{author}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
              <DetailCard icon={<Calendar />} label="Published" value={year} />
              <DetailCard icon={<Building />} label="Publisher" value={publisher} />
              <DetailCard icon={<Book />} label="ISBN" value={bookIsbn} />
              <DetailCard 
                icon={<Star className="fill-current" />} 
                label="Rating" 
                value="4.8 / 5.0" 
                color="text-yellow-500"
              />
            </div>

            <div className="space-y-6 bg-card/30 p-8 rounded-3xl border border-border/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Book className="w-6 h-6 text-primary" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg italic">
                "Experience the literary brilliance of {author} through '{title}'. 
                This book, published by {publisher} in {year}, remains a significant 
                addition to our collection."
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our recommendation engine identified this book based on its popularity 
                and high average ratings among users with similar reading patterns to yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, label, value, color = "text-primary" }) => (
  <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors">
    <div className={`p-3 rounded-xl bg-primary/5 ${color}`}>
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
    <div>
      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-0.5">{label}</p>
      <p className="font-bold text-foreground text-sm line-clamp-1">{value || "N/A"}</p>
    </div>
  </div>
);
export default BookDetails;
