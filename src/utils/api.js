// api.js
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '18445929-e575d6623fb59f5ed7bcd7f03';
const PER_PAGE = 12;

const fetchImages = async (searchQuery, currentPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchImages;
