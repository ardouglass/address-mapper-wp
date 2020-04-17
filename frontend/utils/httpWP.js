import axios from 'axios';

const baseURL = addressMapperApiSettings.baseUrl || '';
const nonce = addressMapperApiSettings.nonce || '';

const httpWP = axios.create({
  baseURL,
  headers: {'X-WP-Nonce': nonce},
});

export default httpWP;
