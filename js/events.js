import { bodyEl, searchArtFormEl, toggleViewportEl, listArtContainerEL } from './constants.js'; // Elements
import { fetchArts, displayArts } from './api.js'; // Functions

export const setupEventListerners = () => {
    // Create an UL for our LI (ARTs)
    const ulEl = document.createElement('ul');

    let valueCheck = localStorage.getItem('data-device') || 'desktop';
    localStorage.setItem('data-device', valueCheck);
    bodyEl.setAttribute('data-device', valueCheck);

    // Our SEARCH
    searchArtFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        // Look for our value from search input
        const searchInputEl = document.getElementById('inputSearch');
        let query = searchInputEl.value.trim();
        // Fetch ARTs
        fetchArts(query).then(displayArts); // Fetch and display default arts
    });

    // Our Viewort TOGGLE
    toggleViewportEl.addEventListener('click', (e) => {
        e.preventDefault();

        // Get current TOGGLE-value. If none set to 'Desktop'
        let toggleValueCheck = localStorage.getItem('data-device') || 'desktop';

        // Toggle between 'phone' and 'desktop' values
        const newToggleValue = toggleValueCheck === 'phone' ? 'desktop' : 'phone';

        // Ternary operator
        toggleViewportEl.textContent =
            newToggleValue === 'phone' ? 'Switch to Desktop' : 'Switch to Phone';

        // Save the toggled value in localStorage
        localStorage.setItem('data-device', newToggleValue);

        // Update 'data-device' with new value
        bodyEl.setAttribute('data-device', newToggleValue);
    });

    //LOgic for like

    // Not optimal, listen for "bubblers" on parent instead i guess
    const likeArtButtons = document.querySelectorAll('.like-button');
    likeArtButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            console.log('hejej');
            event.preventDefault();
            const clickedButton = event.target;
            const isPressed = clickedButton.getAttribute('aria-pressed') === 'true';
            clickedButton.setAttribute('aria-pressed', !isPressed);
            console.log(`Button ${clickedButton.id} aria-pressed: ${!isPressed}`);
        });
    });

    //Listen for fav page

    const fanPageButtonEl = document.getElementById('fanPageBtn');
    fanPageButtonEl.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('button clicked');
        listArtContainerEL.innerHTML = 'test';
    });
};
