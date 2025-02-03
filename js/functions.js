import { listArtContainerEL, dialog } from './constants.js';
import { loginDialog, artCard } from './components.js';
import { fetchArtDetails } from './fetch.js';

// Function to get liked items from localStorage
export const getLikedItems = () => {
    const likedItems = localStorage.getItem('likedItems');
    return likedItems ? JSON.parse(likedItems) : [];
};

// Function to save liked items to localStorage
export const saveLikedItems = (likedItems) => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
};

// Function to update the aria-pressed attribute based on the like status
export const updateLikeButtonState = (button, isLiked) => {
    button.setAttribute('aria-pressed', isLiked);
};

// CHECK AUTH, is user logged in?
export function checkAuth() {
    // Return true/false depending if value exist or not.
    const isAuthenticated = Boolean(localStorage.getItem('user-authenticated'));
    // If FALSE
    if (!isAuthenticated) {
        // Redirect to out AuthModal
        loginDialog('Logga in', 'Dina favoriter är bakom inlogg typ.');
        return false;
    }
    // If TRUE
    return true;
}

// Display ARTs
export const displayArts = async (artIDs) => {
    console.log('We are in -> displasyArts');

    // Empty listArtContainerEl
    listArtContainerEL.innerHTML = '';

    // Create an UL for our LI (ARTs)
    const ulEl = document.createElement('ul');
    ulEl.classList.add('art-list');

    // LOOP through or ARTs
    // --> Use a for...of loop to handle async/await properly (forEach not working with async/await)
    for (const artID of artIDs) {
        console.log('Fetching details for artID:', artID);

        const artDetails = await fetchArtDetails(artID); // FETCH artDetails

        // IF artDetails
        if (artDetails) {
            const artItem = artCard(artDetails.title, artDetails.id, artDetails.image_id);
            artItem.classList.add('art-item');
            artItem.setAttribute('data-id', `${artDetails.id}`); // Set ID for each <li>-item

            ulEl.appendChild(artItem); // APPEND artItem
        }
        //ELSE
        else {
            const errorItem = document.createElement('li');
            errorItem.innerHTML = `
                <img src="${details.thumbnail.lqip}" />
                <h1>sd${details.title}</h1>
                <p>${details.id}</p>
            `;
            ulEl.appendChild(errorItem);
        }
    }
    //APPEND ARTs to <ul>
    listArtContainerEL.appendChild(ulEl);

    // Attach ONE event listener to the parent UL for delegation
    ulEl.addEventListener('click', async (e) => {
        // Handling click on .art-item (view art details)
        const clickedItem = e.target.closest('.art-item');
        if (clickedItem && !e.target.closest('.like-button')) {
            const artID = clickedItem.getAttribute('data-id');
            console.log('Art ID:', artID);

            try {
                const artDetails = await fetchArtDetails(artID);
                console.log('Art Details:', artDetails);
                dialog.innerHTML = `
                <div class="wrapper">
                <img src="https://www.artic.edu/iiif/2/${artDetails.image_id}/full/843,/0/default.jpg">
                <div class="art-details">
                <h4>${artDetails.title}</h4>
                <h4>${artDetails.medium_display}</h4>

                </div>
                </div>
                `;
                dialog.showModal();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        // Handling click on .like-button
        const likeButton = e.target.closest('.like-button');
        if (likeButton) {
            e.preventDefault();
            e.stopPropagation();
            // Get the current list of liked items from localStorage
            const likedItems = getLikedItems();
            const artID = likeButton.closest('.art-item').getAttribute('data-id');

            // Check if the art item is already liked
            const isLiked = likedItems.includes(artID);

            // Toggle like status
            if (isLiked) {
                // Remove the item from liked list if it's already liked
                const updatedLikes = likedItems.filter((id) => id !== artID);
                saveLikedItems(updatedLikes);
                updateLikeButtonState(likeButton, false);
            } else {
                // Add the item to liked list if it's not already liked
                likedItems.push(artID);
                saveLikedItems(likedItems);
                updateLikeButtonState(likeButton, true);
            }

            console.log(`Button ${likeButton.id} aria-pressed: ${!isLiked}`);
        }
    });

    // Separate listener for dialog close
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

    // Initialize the like button states based on localStorage when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        const likedItems = getLikedItems();
        const likeButtons = document.querySelectorAll('.like-button');

        likeButtons.forEach((button) => {
            const artID = button.closest('.art-item').getAttribute('data-id');
            const isLiked = likedItems.includes(artID);
            updateLikeButtonState(button, isLiked);
        });
    });
};
