// fonction creation de la modale dans le dom
function createModale (){
    const body = document.querySelector("body")

    //creation de la modale
    const modale = createModalElements("aside", body, "modale");
    

    //creation de la div avec le contenu
    const modaleContent = createModalElements("div", modale, "modale__content")

    //ajout de la croix pour fermer
    const closingModaleButton = createModalElements("img", modaleContent, "modale__content__closebutton");
    closingModaleButton.src="./assets/icons/Vector (4).svg";
    closingModaleButton.addEventListener("click", function (){
        removeModale()
    })

    //ajout du titre
    const modaleTitle = createModalElements("h1", modaleContent, "modale__content__title");
    modaleTitle.innerText = "Galerie photo";

    //ajout de la galerie
    const modaleGallery = createModalElements("div",modaleContent, "modale__content__gallery" );
    createModalGallery()

    //ajout du bouton ajouter une photo
    const modaleAddButton = createModalElements("button", modaleContent, "modal__content__addbutton");
    modaleAddButton.innerText = "Ajouter une photo";

}

function createModalElements (type, parent, className){
    const modalElement = document.createElement(type);
    parent.appendChild(modalElement);
    modalElement.classList.add(className)

    return modalElement
}

// fonction pour générer la galerie photo

async function createModalGallery (){
    const allWorks = await getAllWorks();
    genererModaleGallery(allWorks);

}

function genererModaleGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const modalegallery = document.querySelector(".modale__content__gallery");

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = document.createElement("figure");
        modalegallery.appendChild(workFigure);

        //création d'une balise image 
        const workImage = document.createElement("img");
        workFigure.appendChild(workImage);
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        workImage.classList.add("modale__content__gallery__image")

        //creation du bouton poubelle
        const workTrashIcon = document.createElement("img");
        workFigure.appendChild(workTrashIcon);
        workTrashIcon.src="./assets/icons/Group 10.svg";
        workTrashIcon.classList.add("modale__content__gallery__icon");
    }
}

// fonction pour supprimer la modale

function removeModale (){
    const modale=document.querySelector(".modale");
    if(modale){
        modale.parentNode.removeChild(modale);
    }
}