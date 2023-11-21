// fonction generer la modale d'ajout de photo

async function createEditModale(){

    const modale = document.querySelector(".modale")
    const addmodaleContent = createDomElements("div", modale, "addmodale__content")
    

    const addmodaleBackAndClose= createDomElements("div", addmodaleContent, "addmodale__content__backandclose");

    //ajout flèche retour

    const backArrow= createDomElements("img", addmodaleBackAndClose, "addmodale__content_backArrow");
    backArrow.src = "./assets/icons/backArrow.svg";
    backArrow.addEventListener("click", function(){
        addmodaleContent.parentNode.removeChild(addmodaleContent)
        })

    //ajout de la croix pour fermer
    const closingModaleButton = createDomElements("img", addmodaleBackAndClose, "addmodale__content__closebutton");
    closingModaleButton.src="./assets/icons/Vector (4).svg";
    closingModaleButton.addEventListener("click", function (){
        removeModale()
     })

 
     
     //ajout titre
     const modaleTitle = createDomElements("h1", addmodaleContent, "modale__content__title");
     modaleTitle.innerText = "Ajout photo";


     // ajout contenu

     const addImageForm = createDomElements("form", addmodaleContent, "addmodale__content__form")
     addImageForm.enctype = "multipart/form-data"

     const divLoadImage = createDomElements("div", addImageForm, "addmodale__content__form__load");

     const imageIcon = createDomElements("i", divLoadImage, "addmodale__content__form__load__icon");
     imageIcon.classList.add("fa-solid")
     imageIcon.classList.add("fa-image")

     const imageInput = createDomElements("input", divLoadImage, "addmodale__content__form__load__input");
     imageInput.type="file"
     imageInput.accept=".jpeg, .png "

     const ajoutbutton = createDomElements("button", divLoadImage, "addmodale__content__load__form__load__submit")
     ajoutbutton.type="submit"
     ajoutbutton.innerText="+ Ajouter photo"

     const ajoutDetails = createDomElements("p", divLoadImage)
     ajoutDetails.innerText ="jpg, png : 4mo max"

     const titreLabel = createDomElements("label", addImageForm)
     titreLabel.for="titre"
     titreLabel.innerText = "Titre"
     const titreInput = createDomElements("input", addImageForm)
     titreInput.name="titre"

     const categorieLabel = createDomElements("label", addImageForm)
     categorieLabel.for="categorie"
     categorieLabel.innerText="Catégorie"
     const categorieInput = createDomElements("select", addImageForm)
     categorieInput.name = "categorie"
     const defaultCategorieChoice = createDomElements("option", categorieInput)
     defaultCategorieChoice.value =""

     const categoriesList = await getAllCategories()
     //categoriesList.splice(0,1)
     console.log(categoriesList)

     for(let i = 1; i<categoriesList.length; i++){
        console.log(categoriesList)
        const categorieChoice = createDomElements("option", categorieInput)
        categorieChoice.value = categoriesList[i].name
        categorieChoice.innerText = categoriesList[i].name
     }

     const submitImage = createDomElements("button", addImageForm, "addmodale__content__form__submit")
     submitImage.innerText = "Valider"
}