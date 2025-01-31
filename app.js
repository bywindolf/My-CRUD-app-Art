import { DEFAULT_SEARCH } from './js/constants.js';
import { fetchArts, displayArts } from './js/api.js';
import { setupEventListerners } from './js/events.js';
import { testarXmodal } from './components.js';

const initApp = () => {
    //Logic for authentcation, where do i Live?
    const authKey = 'user-authenticated';
    function checkAuth() {
        return localStorage.getItem(authKey) !== null;
    }

    function authenticateUser() {
        // Playing around
    }

    function appLogin() {
        if (!checkAuth()) {
            testarXmodal('Logga in', 'jag är message');
        }
    }
    appLogin();

    console.log('Initializing app...');

    // Setup event listeners
    setupEventListerners();
    // Fetch and display arts
    fetchArts(DEFAULT_SEARCH).then(displayArts);
};
//App init
document.addEventListener('DOMContentLoaded', initApp);
