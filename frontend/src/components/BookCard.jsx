import React from 'react';
import { cn } from '../lib/utils';

export function BookCard({ title, coverUrl }) {
  return (
    <div className={cn(
      "group relative flex flex-col justify-end overflow-hidden",
      "w-full aspect-[2/3] rounded-xl cursor-pointer shadow-sm hover:shadow-xl",
      "transition-all duration-300 transform hover:-translate-y-2",
      "border border-border bg-card text-card-foreground"
    )}>
      {coverUrl ? (
        <div className="absolute inset-0 w-full h-full z-0 p-2 bg-muted/20">
           <img 
            src={coverUrl.replace('http://', 'https://')} 
            alt={title} 
            className="w-full h-full object-cover rounded-md shadow-sm"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&size=200&background=random&color=fff&bold=true`;
            }}
           />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 z-0 flex items-center justify-center p-4 text-center">
            <span className="text-muted-foreground font-semibold opacity-50 text-xl line-clamp-3">{title}</span>
        </div>
      )}
      <div className="relative z-10 bg-background/80 backdrop-blur-sm p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-border">
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
      </div>
      <div className="absolute top-4 left-4 z-10 w-[calc(100%-2rem)] group-hover:opacity-0 transition-opacity duration-300 bg-background/80 backdrop-blur-md rounded-md p-3 shadow-sm border border-border">
         <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
      </div>
    </div>
  );
}
