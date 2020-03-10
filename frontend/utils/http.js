import axios from 'axios';

const http = axios.create({
  baseURL: addressMapperApiSettings.baseUrl,
  headers: {'X-WP-Nonce': addressMapperApiSettings.nonce},
});

export default http;
