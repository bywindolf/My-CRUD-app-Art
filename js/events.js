import { searchArtFormEl, toggleViewportEl, bodyEl } from './constants.js';
import { fetchArts, displayArts } from './api.js';

// const artItem = document.getElementById();

export const setupEventListerners = () => {
    //Öppna dialog på klick av vår app-wrapper för nu

    // Vår sök
    searchArtFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('asasg');

        const searchInputEl = document.getElementById('inputSearch');
        console.log(searchInputEl.value);
        let searchWord = searchInputEl.value.trim();
        console.log(searchWord);
        fetchArts(searchWord).then(displayArts); // Fetch and display default arts
    });

    // Vår toggle
    toggleViewportEl.addEventListener('click', (e) => {
        e.preventDefault();

        // Get the current value from localStorage
        let valueCheck = localStorage.getItem('data-device') || 'desktop';
        localStorage.setItem('data-device', valueCheck);
        bodyEl.setAttribute('data-device', valueCheck);

        console.log('Current value in LS:', valueCheck);
        // If no value exists in localStorage, set it to 'desktop'

        if (!valueCheck) {
            console.log('No value found, setting to "desktop"');
            localStorage.setItem('data-device', 'desktop');
            valueCheck = 'desktop'; // Update the variable after setting
        }

        // Toggle between 'phone' and 'desktop' values
        const newValue = valueCheck === 'phone' ? 'desktop' : 'phone';
        console.log('Toggling to:', newValue);
        toggleViewportEl.textContent =
            valueCheck === 'phone' ? 'Switch to Desktop' : 'Switch to Phone';
        bodyEl.setAttribute('data-device', newValue);

        // Save the toggled value in localStorage
        localStorage.setItem('data-device', newValue);

        // Log the final state for verification
        console.log('New value in LS:', newValue);
    });
};
