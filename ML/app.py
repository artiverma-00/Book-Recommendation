from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the models
popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))

@app.route('/books', methods=['GET'])
def get_popular_books():
    # Return top popular books with standardized keys
    data = []
    # popular_df usually has 'Book-Title', 'Book-Author', 'Image-URL-M', etc.
    for _, row in popular_df.iterrows():
        item = {
            'title': str(row.get('Book-Title', '')),
            'author': str(row.get('Book-Author', '')),
            'image': str(row.get('Image-URL-M', '')),
            'isbn': str(row.get('ISBN', '')),
            'year': str(row.get('Year-Of-Publication', '')),
            'publisher': str(row.get('Publisher', '')),
            'avg_rating': float(row.get('avg_rating', 0)),
            'num_ratings': int(row.get('num_ratings', 0))
        }
        data.append(item)
    return jsonify(data)

@app.route('/recommend', methods=['POST'])
def recommend_books():
    book_name = request.json.get('book')
    if not book_name:
        return jsonify({"error": "No book name provided"}), 400
    
    try:
        # Improved search logic: partial match
        idx_list = pt.index.to_series()
        # First try exact match (case-insensitive)
        exact_match = idx_list[idx_list.str.lower() == book_name.lower()]
        
        if not exact_match.empty:
            actual_book_name = exact_match.iloc[0]
        else:
            # Try partial match
            partial_matches = idx_list[idx_list.str.lower().str.contains(book_name.lower())]
            if not partial_matches.empty:
                # Pick the shortest match as it's likely the closest title
                actual_book_name = partial_matches.str.len().sort_values().index[0]
                actual_book_name = pt.index[np.where(pt.index == actual_book_name)[0][0]]
            else:
                return jsonify({"error": f"Book '{book_name}' not found"}), 404
        
        index = np.where(pt.index == actual_book_name)[0][0]
        
        # Get similar items, including the book itself as the first result
        distances = similarity_scores[index]
        similar_indices = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[0:12]
        
        data = []
        seen_titles = set()
        for i in similar_indices:
            book_title = pt.index[i[0]]
            if book_title in seen_titles:
                continue
            
            # Find all entries for this title
            all_entries = books[books['Book-Title'] == book_title]
            if all_entries.empty:
                continue
            
            # Try to find an entry with a valid cover image
            best_info = None
            valid_image_url = None
            
            for _, info in all_entries.iterrows():
                image_url = str(info.get('Image-URL-M', ''))
                # If not a placeholder, we found our best candidate
                if not any(p in image_url.lower() for p in ['mzzzzzzz', 'lzzzzzzz', 'placeholder']):
                    best_info = info
                    valid_image_url = image_url
                    break
            
            # Fallback to the first one if we must, but the frontend might filter it
            if not best_info:
                best_info = all_entries.iloc[0]
                valid_image_url = str(best_info.get('Image-URL-M', ''))
            
            seen_titles.add(book_title)
                
            item = {
                'title': str(best_info.get('Book-Title', '')),
                'author': str(best_info.get('Book-Author', '')),
                'image': valid_image_url,
                'isbn': str(best_info.get('ISBN', i[0])),
                'year': str(best_info.get('Year-Of-Publication', 'N/A')),
                'publisher': str(best_info.get('Publisher', 'N/A')),
                'isMatched': bool(i[0] == int(index))
            }
            data.append(item)
            if len(data) >= 8:
                break
        
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)