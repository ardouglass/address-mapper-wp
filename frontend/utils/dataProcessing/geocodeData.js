import Bottleneck from 'bottleneck';
import axios from 'axios';
import {requiredFields} from 'utils/dataProcessing/parseCSV';

/**
 * Geocodes the passed in data
 * @param {Object} data - The data to geocode
 * @returns {Object} The data with latitude and longitude fields
 */
const _geocodeData = async (data, key) => {
  const address = requiredFields.map(field => data[field]).join(', ');

  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {params: {address, key}}
  );

  const latLng = response.data.results[0].geometry.location;

  return {...latLng, ...data};
};

// Only allow 25 concurrent requests per second
const limiter = new Bottleneck({
  maxConcurrent: 25,
  minTime: 40,
  reservoir: 25,
  reservoirRefreshAmount: 25,
  reservoirRefreshInterval: 1000,
});

// Wrap the geocoding function in the limiter
const geocodeData = limiter.wrap(_geocodeData);

/**
 * Geocodes arrays of passed in data
 * @param {Object[]} chunk - Array of rows of data to process in parallel
 * @param {string} key - Google Maps API key
 */
const geocodeChunks = async (chunk, key) =>
  Promise.all(chunk.map(async row => geocodeData(row, key)));

export {geocodeChunks, geocodeData as default};
