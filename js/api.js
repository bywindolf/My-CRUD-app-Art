import { API_BASE_URL, listArtContainerEL } from './constants.js';
// Visa Konst
export const displayArts = async (artIDs) => {
    console.log('inne i displasyArts');
    console.log(artIDs); // Array [123,123,123]

    listArtContainerEL.innerHTML = '';
    const ulEl = document.createElement('ul');

    for (const artID of artIDs) {
        // Use a for...of loop to handle async/await properly
        console.log('va fan');
        console.log('Fetching details for artID:', artID);

        const details = await fetchArtDetails(artID); // Hämta detaljer för art ID

        if (details) {
            const artItem = document.createElement('li');
            artItem.classList.add('art-item');
            artItem.setAttribute('data-id', `${details.id}`); // Set ID for each <li>-item
            artItem.innerHTML = `
                <figure>
                <button aria-pressed="false" class="like-button" id="${details.id}">Like</button>
                <img src="${details.thumbnail.lqip}" />
                </figure>
                <h1>${details.title}</h1>
                <p>${details.id}</p>
            `;
            ulEl.appendChild(artItem);
            //Like button
        } else {
            const errorItem = document.createElement('li');
            errorItem.innerHTML = `
                <img src="${details.thumbnail.lqip}" />
                <h1>sd${details.title}</h1>
                <p>${details.id}</p>
            `;
            ulEl.appendChild(errorItem);
        }
    }
    listArtContainerEL.appendChild(ulEl);

    // Not optimal, listen for "bubblers" on parent instead i guess
    const likeArtButtons = document.querySelectorAll('.like-button');
    likeArtButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const clickedButton = event.target;
            const isPressed = clickedButton.getAttribute('aria-pressed') === 'true';
            clickedButton.setAttribute('aria-pressed', !isPressed);
            console.log(`Button ${clickedButton.id} aria-pressed: ${!isPressed}`);
        });
    });

    // Dialogen
    const dialog = document.getElementById('artDialog');
    console.log(dialog);

    // Attach ONE event listener to the parent UL do the same on Like Buttons
    ulEl.addEventListener('click', async (e) => {
        const clickedItem = e.target.closest('.art-item'); // Find closest .art-item in case of nested clicks
        if (clickedItem) {
            // console.log('Clicked:', clickedItem.getAttribute('data-id'));

            const artID = clickedItem.getAttribute('data-id');

            console.log(artID);

            try {
                const artDetails = await fetchArtDetails(artID);
                console.log('---->', artDetails);
                dialog.innerHTML = `
                <h4>${artDetails.title}</h4>
                <img src="${artDetails.thumbnail.lqip}">
                
                                <img src="https://www.artic.edu/iiif/2/${artDetails.image_id}/full/843,/0/default.jpg">

                `;

                dialog.showModal();
            } catch {
                console.error('Failed to fetch data', error);
            }
        }
        // Let us Close the Dialog on click on === dialog
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
    });
};
export const fetchArts = async (query) => {
    try {
        console.log('inne i try');
        const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        console.log(data.data); // Its not constructed to give RESULTS. It gives an object with array of objects!
        // Vi har ni alla id i data.objectisIDs arrayen
        // Nu vill vi loopa igenom all data (nummer aka id)
        const artworks = data.data;

        // Extracting only the `id` values
        const artworkIds = artworks.map((artwork) => artwork.id);
        console.log(artworkIds);
        // displayArts(artworkIds);
        return artworkIds;
    } catch (error) {
        console.error(error);
    }
};

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
