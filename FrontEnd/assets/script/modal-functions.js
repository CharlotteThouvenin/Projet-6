// fonction creation d'une modale dans le dom
function createModale(){
    const body = document.querySelector("body")

    //creation de la modale
    const modale = createDomElements("aside", body, "modale");
    
    // fermeture au click en dehors du la fenetre contenu
    modale.addEventListener("click", function(event) {
        if (event.target === modale) {
            removeModale();
        }
    });
    
    //creation de la div avec le contenu
    const modaleContent = createDomElements("div", modale, "modale__content")

    return modaleContent
}


// Création de la modale Galerie Photo

function createGalleryModale (){

    const modaleContent = createModale()
    
    //ajout de la croix pour fermer
    const closingModaleButton = createDomElements("img", modaleContent, "modale__content__closebutton");
    closingModaleButton.src="./assets/icons/Vector (4).svg";
    listener(closingModaleButton, removeModale)
    

    //ajout du titre
    const modaleTitle = createDomElements("h1", modaleContent, "modale__content__title");
    modaleTitle.innerText = "Galerie photo";

    //ajout de la galerie
    const modaleGallery = createDomElements("div",modaleContent, "modale__content__gallery" );
    createModalGallery()

    //ajout du bouton ajouter une photo
    const modaleAddButton = createDomElements("button", modaleContent, "modal__content__addbutton");
    modaleAddButton.innerText = "Ajouter une photo";
    listener(modaleAddButton, createEditModale)
}



// fonction pour générer la galerie photo

async function createModalGallery (){
    const allWorks = await getAllWorks();
    genererModaleGallery(allWorks);
}

function genererModaleGallery(data) {

    const workFigureArray=[]

    for (let i = 0; i < data.length; i++) {
        const modalegallery = document.querySelector(".modale__content__gallery");

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = createDomElements("figure", modalegallery, "modale__content__gallery__figure")
        workFigureArray.push(workFigure)
        

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
                // fonction supprimer travail
                deleteWork(work.id)

                event.target.closest("figure").remove()
                // suprimer la galerie existante
               // const gallery= document.querySelector(".modale__content__gallery")
               // gallery.innerHTML=""
                // re generer la galerie avec les données à jour
                //createModalGallery()
            }
    
        })
    }
}

// fonction pour supprimer la modale

function removeModale (){
    const modale=document.querySelector(".modale");

    if(modale){
        modale.parentNode.removeChild(modale);
    }
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

