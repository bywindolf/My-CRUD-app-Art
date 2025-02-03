import { bodyEl } from './constants.js';

// Our buttonX can take parameter className and targetEl, parent.
export const buttonX = (buttonText, targetElement) => {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = buttonText;
    targetElement.appendChild(buttonEl);
    return targetElement;
};

// Login Dialog
export const loginDialog = (title, message) => {
    //Create the Dialog
    const authModal = document.createElement('dialog');
    //Create button for closing modal
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close me';

    const authModalWrapper = document.createElement('div');
    authModalWrapper.classList.add('wrapper');

    authModalWrapper.innerHTML = `
        <h1>${title}</h1>
        <div>${message}</div<
    `;
    authModal.appendChild(closeBtn);
    authModal.appendChild(authModalWrapper);

    // Call buttonX component
    const buttonEl = buttonX('Klicka på mig', authModalWrapper);

    bodyEl.appendChild(authModal);

    authModal.showModal();

    //The only action to authenticate is to click button for now
    buttonEl.addEventListener('click', (e) => {
        const authKey = 'user-authenticated';
        localStorage.setItem(authKey, true);
        console.log('hello');
        authModal.close();
    });

    //CLose if closebtn clicked
    closeBtn.addEventListener('click', (ev) => {
        console.log('sTÄNCG!');
        authModal.close();
    });
};

export const artCard = (title, id, imageId) => {
    const artCardEl = document.createElement('li');
    artCardEl.innerHTML = `
    <figure>
        <button class="like-button" aria-pressed="" id="${id}">Like</button>
        <img src="https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg">
    </figure>
        <h3>${title}</h3>

    `;
    return artCardEl;
};
