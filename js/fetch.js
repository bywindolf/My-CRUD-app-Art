import { API_BASE_URL } from './constants.js';

// FETCH Arts
export const fetchArts = async (query) => {
    try {
        console.log('inne fetchArts');
        const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();

        const artworks = data.data; // Array of numbers (IDs)
        // Extracting only the `id` values
        const artworkIds = artworks.map((artwork) => artwork.id);
        console.log(artworkIds);

        return artworkIds;
    } catch (error) {
        console.error(error);
    }
};

// FETCH ArtDetails
export const fetchArtDetails = async (artID) => {
    console.log('fetch art id ->', artID);
    const ART_API_URL = `${API_BASE_URL}/${artID}`; // Sunflowers for now
    try {
        console.log('inne i fetchArt');
        const response = await fetch(ART_API_URL);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        const wantedData = data.data; // Object...
        console.log('artistDetails', wantedData); // Lists all art to search term, we now want to fetch data about specific art.

        return wantedData;
    } catch (error) {
        console.error('Error fetching art details:', error);
        return null; // Return null in case of an error
    }
};
