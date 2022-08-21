import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.alvama.co',
});

export default api;
