// affichage de la modale

function afficherModale(){
    document.querySelector(".modale__container").style.display = "flex"
    createContentModale()
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





// Création du contenu de la modale

function createContentModale (){

    const modale = document.querySelector(".modale")
    const modaleTitle = document.querySelector(".modale__title")
    modaleTitle.innerText = "Galerie photo";

    //ajout de la galerie
    const modaleContent = document.querySelector(".modale__content")
    const modaleGallery = createDomElements("div",modaleContent, "modale__content__gallery" );
    createModalGallery()

    //ajout du bouton ajouter une photo
    const modaleAddButton = document.querySelector(".modale__submit")
    modaleAddButton.innerText = "Ajouter une photo";
    modaleAddButton.addEventListener("click", function(){
        modaleContent.innerHTML="";
        createEditModale()
    })
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
            console.log(event.target.closest("figure"))
            let reponseUser = confirm('Voulez vous vraiment supprimer ce travail ?')
            if(reponseUser === true){

                deleteWork(work.id)

                event.target.closest("figure").remove()

            }
    
        })
    }
}

// fonction pour fermer la modale

function closeModale (){
    const modaleContainer=document.querySelector(".modale__container");
    modaleContainer.style.display="none";
    const modaleContent = document.querySelector(".modale__content");
    modaleContent.innerHTML="";
}




//fonction  pour supprimer un travail

async function deleteWork (id){
    await fetch(`http://localhost:5678/api/works/${id}` , {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ sessionStorage.getItem("Token")
        },
        
    })
}

