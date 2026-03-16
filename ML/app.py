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
    # Return top popular books
    # We return a list of dictionaries for easier consumption by the frontend
    data = popular_df.to_dict('records')
    return jsonify(data)

@app.route('/recommend', methods=['POST'])
def recommend_books():
    book_name = request.json.get('book')
    if not book_name:
        return jsonify({"error": "No book name provided"}), 400
    
    try:
        if book_name not in pt.index:
            return jsonify({"error": f"Book '{book_name}' not found in the recommendations database"}), 404
            
        # index fetch
        index = np.where(pt.index == book_name)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]
        
        data = []
        for i in similar_items:
            item = {}
            temp_df = books[books['Book-Title'] == pt.index[i[0]]]
            if temp_df.empty:
                continue
            # Taking first entry and ensuring we have the required fields
            book_info = temp_df.drop_duplicates('Book-Title').iloc[0]
            item['title'] = str(book_info['Book-Title'])
            item['author'] = str(book_info['Book-Author'])
            item['image'] = str(book_info['Image-URL-M'])
            data.append(item)
        
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)