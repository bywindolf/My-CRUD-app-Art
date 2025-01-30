/* sadadf */
const API_BASE_URL = `https://api.artic.edu/api/v1/artworks`; // Sunflowers for now
let DEFAULT_SEARCH = 'cats';

const bodyEl = document.body; // Body Element
const listArtContainerEL = document.getElementById('listArts'); // Container for Arts
const listArtElement = listArtContainerEL;

const searchArtFormEl = document.getElementById('searchArtForm'); // Search from
const toggleViewportEl = document.getElementById('toggle-viewport'); // Toggle viewport

let valueCheck = localStorage.getItem('data-device') || 'desktop';

export {
    bodyEl,
    listArtContainerEL,
    searchArtFormEl,
    toggleViewportEl,
    valueCheck,
    API_BASE_URL,
    DEFAULT_SEARCH,
};
