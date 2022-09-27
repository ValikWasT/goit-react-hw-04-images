import axios from 'axios';
import { API_KEY } from './api-key';

const BASE_URL = 'https://pixabay.com/api/';

export const fetchApiByName = async (searchQuery, page) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return response.data;
};
