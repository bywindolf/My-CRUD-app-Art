import { bodyEl, valueCheck, DEFAULT_SEARCH } from './js/constants.js';
import { fetchArts, displayArts } from './js/api.js';
import { setupEventListerners } from './js/events.js';

localStorage.setItem('data-device', valueCheck);
bodyEl.setAttribute('data-device', valueCheck);

const initApp = () => {
    console.log('Initializing app...');
    setupEventListerners(); // Setup event listeners
    fetchArts(DEFAULT_SEARCH).then(displayArts); // Fetch and display default arts
};
//App init
document.addEventListener('DOMContentLoaded', initApp);
