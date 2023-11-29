// affichage de la modale

import { getAllWorks, deleteWork } from "./callAPI.js";
import { updateIndexGallery, createDomElements, createDeleteModaleContent} from "./createDOMelements.js";

function afficherModale(){
    document.querySelector(".modale__container").style.display = "flex"
    createDeleteModaleContent()
}


// fermeture de la modale
const modaleContainer = document.querySelector(".modale__container")
modaleContainer.addEventListener("click", function(event) {
        if (event.target === modaleContainer) {
            closeModale();
        }
    })
 const closingModaleButton = document.querySelector(".fa-xmark")
 closingModaleButton.addEventListener("click", function(){
    closeModale()
 })


// fonction pour générer la galerie photo

async function createModalGallery (){
    const allWorks = await getAllWorks();
    genererModaleGallery(allWorks);
}

function genererModaleGallery(data) {
    const modalegallery = document.querySelector(".modale__content__gallery");
        modalegallery.innerHTML=""

    for (let i = 0; i < data.length; i++) {
        const modalegallery = document.querySelector(".modale__content__gallery");

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = createDomElements("figure", modalegallery, "modale__content__gallery__figure")
        

        //création d'une balise image 
        const workImage = createDomElements("img",workFigure, "modale__content__gallery__image")
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        

        //creation du bouton poubelle
        const workTrashIcon= createDomElements("i", workFigure, "modale__content__gallery__icon")
        workTrashIcon.classList.add("fa-solid")
        workTrashIcon.classList.add("fa-trash-can")

        workTrashIcon.addEventListener("click", function(event){

            let reponseUser = confirm('Voulez vous vraiment supprimer ce travail ?')
            if(reponseUser === true){

                deleteWork(work.id)

                event.target.closest("figure").remove()

            }
    
        })
    }
}

// fonction pour fermer la modale

async function closeModale (){
    const modaleContainer=document.querySelector(".modale__container");
    modaleContainer.style.display="none";
    const modaleContent = document.querySelector(".modale__content");
    modaleContent.innerHTML="";
    
    updateIndexGallery ();
}



export {afficherModale, createModalGallery}