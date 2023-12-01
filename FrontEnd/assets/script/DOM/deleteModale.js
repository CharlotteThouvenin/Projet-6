import { createDomElements } from "../utils/helpers.js";
import {listenerDeleteWork } from "../Services/deleteWorks.js";
import { createEditModale } from "../Services/addWorks.js";
import { getAllWorks } from "../utils/callAPI.js";
import { listenerCloseModale } from "../components/closeButtons.js";

// creation de la modale pour supprimer un travail


async function createDeleteModaleContent () {

    listenerCloseModale()

    const modaleTitle = document.querySelector(".modale__title")
    modaleTitle.innerText = "Galerie photo";

    //ajout de la galerie
    const modaleContent = document.querySelector(".modale__content");
    
    while (modaleContent.firstChild) {
        modaleContent.removeChild(modaleContent.firstChild);
    }

    const modaleGallery = createDomElements("div",modaleContent, "modale__content__gallery" );

    await createDeleteGallery();
    
    await listenerDeleteWork();

    if (!modaleContent.querySelector(".modale__submit")) {
        const emptyDiv = createDomElements("div", modaleContent, "design__line");

        const modaleAddButton = createDomElements("button", modaleContent, "modale__submit");
        modaleAddButton.innerText = "Ajouter une photo";
        modaleAddButton.addEventListener("click", function () {
            while (modaleContent.firstChild) {
                modaleContent.removeChild(modaleContent.firstChild);
            }
            createEditModale();
        });
}
}
// creation de la gallery

async function createDeleteGallery (){
    const modalegallery = document.querySelector(".modale__content__gallery");

const work = await getAllWorks();

for (let i = 0; i < work.length; i++) {

    //création d'une balise qui contient un travail
    const workFigure = createDomElements("figure", modalegallery, "modale__content__gallery__figure")
    

    //création d'une balise image 
    const workImage = createDomElements("img",workFigure, "modale__content__gallery__image")
    workImage.src = work[i].imageUrl;
    workImage.alt = work[i].title;
    

    //creation du bouton poubelle
    const workTrashIcon= createDomElements("i", workFigure, "modale__content__gallery__icon")
    workTrashIcon.classList.add("fa-solid")
    workTrashIcon.classList.add("fa-trash-can")
    }
}

export{createDeleteModaleContent, createDeleteGallery}