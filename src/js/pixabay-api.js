import axios from 'axios';

const ApiKey = '49778514-c989ee5c1575b477a31bb7b72';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = {
    key: ApiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
