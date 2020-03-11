import axios from 'axios';

// @ts-ignore
const baseURL = addressMapperApiSettings.baseUrl || '';
// @ts-ignore
const nonce = addressMapperApiSettings.nonce || '';

const http = axios.create({
  baseURL,
  headers: {'X-WP-Nonce': nonce},
});

export default http;
