import { bodyEl } from './js/constants.js';

// Just playing around

// Our buttonX can take parameter className
export const buttonX = (buttonText, targetElement) => {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = buttonText;
    targetElement.appendChild(buttonEl);
    console.log('inne i button', buttonEl);
};

export const testarXmodal = (title, message) => {
    console.log('testar');

    //Create the Dialog
    const authModal = document.createElement('dialog');
    //Create button for closing modal
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close me';

    const authModalWrapper = document.createElement('div');
    authModalWrapper.classList.add('wrapper');

    authModalWrapper.innerHTML = `
        <h1>Jag är en dialog ${title}</h1>
        <div>${message}</div<
    `;
    authModal.appendChild(closeBtn);
    authModal.appendChild(authModalWrapper);

    // Call buttonX component
    buttonX('Klicka på mig', authModalWrapper);

    bodyEl.appendChild(authModal);

    authModal.showModal();

    //CLose if closebtn clicked
    closeBtn.addEventListener('click', (ev) => {
        console.log('sTÄNCG!');
        authModal.close();
    });
};
