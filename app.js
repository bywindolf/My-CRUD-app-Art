import { DEFAULT_SEARCH } from './js/constants.js';
import { fetchArts } from './js/fetch.js';
import { displayArts } from './js/functions.js';
import { setupEventListerners } from './js/events.js';

const initApp = () => {
    console.log('Initializing app...');

    // Setup event listeners
    setupEventListerners();
    // Fetch and display arts
    fetchArts(DEFAULT_SEARCH).then(displayArts);
};

//App init
document.addEventListener('DOMContentLoaded', initApp);
