import axios from "axios";

const API_URL = "http://localhost:3001/api/books";

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching books", error);
        return [];
    }
};

export const getRecommendations = async (bookName) => {
    try {
        const response = await axios.post(`${API_URL}/recommend`, { book: bookName });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch recommendations");
    }
};
