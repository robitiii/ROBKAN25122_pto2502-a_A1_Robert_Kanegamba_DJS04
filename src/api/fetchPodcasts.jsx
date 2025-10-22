// src/api/fetchPodcasts.js
const API_URL = 'https://podcast-api.netlify.app/';

/**
 * Fetch podcast data from the external podcast API.
 * 
 * This function makes a GET request to the podcast API endpoint and returns
 * the parsed JSON data. It includes proper error handling for network issues
 * and HTTP errors, with user-friendly error messages.
 * 
 * @async
 * @function fetchPodcasts
 * @returns {Promise<Array>} Promise that resolves to an array of podcast objects
 * @throws {Error} Throws an error if the API request fails or returns invalid data
 * 
 * @example
 * try {
 *   const podcasts = await fetchPodcasts();
 *   console.log(`Fetched ${podcasts.length} podcasts`);
 * } catch (error) {
 *   console.error('Failed to fetch podcasts:', error.message);
 * }
 */
export async function fetchPodcasts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Unable to fetch podcasts (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    console.log('First podcast:', data[0]);
    return data;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw new Error('⚠️ Failed to load podcasts. Please try again later.');
  }
}
