import {
    updateIndexGallery
} from "../DOM/indexGallery.js";
import {
    createDeleteModaleContent
} from "../DOM/deleteModale.js";



const modaleContainer = document.querySelector(".modale__container");

// fermeture de la modale

function listenerCloseModale() {

    modaleContainer.addEventListener("click", function (event) {
        if (event.target === modaleContainer) {
            closeModale();
        }
    })
    const closingModaleButton = document.querySelector(".fa-xmark");
    closingModaleButton.addEventListener("click", function () {
        closeModale();
    });
}


async function closeModale() {
    modaleContainer.style.display = "none";
    const modaleContent = document.querySelector(".modale__content");
    modaleContent.innerHTML = "";

    updateIndexGallery();
};

// retour en arrière

function listenerBackArrow() {
    const backArrow = displayBackArrow();
    backArrow.addEventListener("click", function () {
        backArrow.style.opacity = "0";
        const modaleContent = document.querySelector(".modale__content");
        while (modaleContent.firstChild) {
            modaleContent.removeChild(modaleContent.firstChild);
        };
        createDeleteModaleContent();
    });
};

export {
    listenerCloseModale,
    listenerBackArrow
}