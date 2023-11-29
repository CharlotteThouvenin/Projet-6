import { createDomElements, createDeleteModaleContent } from "./createDOMelements.js";
import { getAllCategories, postNewWork } from "./callAPI.js";




// fonction generer la modale d'ajout de photo

async function createEditModale() {


    const modaleContent = document.querySelector(".modale__content")


    //ajout flèche retour

    const backArrow = document.querySelector(".fa-arrow-left");
    backArrow.style.opacity = "1"

    backArrow.addEventListener("click", function () {
        backArrow.style.opacity = "0";
        modaleContent.innerHTML = "";
        createDeleteModaleContent()
    })



    //modification titre
    const modaleTitle = document.querySelector(".modale__title")
    modaleTitle.innerText = "Ajout photo";


    // ajout contenu

    // création du formulaire
    const addImageForm = createDomElements("form", modaleContent, "modale__content__form")
    addImageForm.enctype = "multipart/form-data"

    // envoi des données du formulaire
    addImageForm.addEventListener("submit", function (event) {
        event.preventDefault()
        let formData = new FormData();
        formData.append("title", titreInput.value);
        formData.append("image", imageInput.files[0]);
        formData.append("category", categorieInput.value)
        postNewWork(formData);
        updateIndexGallery();
    })

    // emplacement pour prévisualiser l'image
    const divLoadImage = createDomElements("div", addImageForm, "modale__content__form__load");
    const imagePreview = createDomElements("img", divLoadImage, "modale__content__form__load__preview")
    imagePreview.style.display = "none";

    const imageIcon = createDomElements("i", divLoadImage, "modale__content__form__load__icon");
    imageIcon.classList.add("fa-solid")
    imageIcon.classList.add("fa-image")

    // input pour charger l'image
    const imageInput = createDomElements("input", addImageForm, "modale__content__form__load__input");
    imageInput.type = "file"
    imageInput.accept = ".jpeg, .png "
    imageInput.id = "image__input"
    imageInput.classList.add("hide")
    imageInput.required = "true"

    // afficher la prévisualisation de l'image
    imageInput.addEventListener("change", function () {

        const selectedFile = imageInput.files[0];
        previewImage(selectedFile, imagePreview);
        imageIcon.style.display = "none";
        ajoutbutton.style.display = "none";
        ajoutDetails.style.display = "none"

    });


    // bouton pour charger l'image
    const ajoutbutton = createDomElements("label", addImageForm, "modale__content__form__load__submit")
    ajoutbutton.innerText = "+ Ajouter photo"
    ajoutbutton.htmlFor = "image__input"

    const ajoutDetails = createDomElements("p", addImageForm, "modale__content__form__load__p")
    ajoutDetails.innerText = "jpg, png : 4mo max"

    // input titre
    const titreLabel = createDomElements("label", addImageForm)
    titreLabel.for = "titre"
    titreLabel.innerText = "Titre"
    const titreInput = createDomElements("input", addImageForm)
    titreInput.name = "titre"
    titreInput.required = "true"

    // input categorie
    const categorieLabel = createDomElements("label", addImageForm)
    categorieLabel.for = "categorie"
    categorieLabel.innerText = "Catégorie"
    const categorieInput = createDomElements("select", addImageForm)
    categorieInput.name = "categorie";
    categorieInput.required = "true"
    const defaultCategorieChoice = createDomElements("option", categorieInput)
    defaultCategorieChoice.value = ""

    const categoriesList = await getAllCategories()

    for (let i = 0; i < categoriesList.length; i++) {
        const categorieChoice = createDomElements("option", categorieInput)
        categorieChoice.value = categoriesList[i].id
        categorieChoice.innerText = categoriesList[i].name
    }

    const emptyDiv = createDomElements("div", addImageForm, "design__line")

    // bouton de validation du formulaire
    const formSubmitButton = createDomElements("button", addImageForm, "modale__content__form__submit");
    formSubmitButton.innerText = "Valider";

    // Fonction pour vérifier si tous les champs sont remplis
    function allFieldscompleted() {
        return titreInput.value !== "" && imageInput.files.length > 0 && categorieInput.value !== "";
    }

    // Fonction pour mettre à jour le style du bouton "Valider"
    function updateSubmitButtonStyle() {
        const isFieldsCompleted = allFieldscompleted();
        formSubmitButton.classList.toggle("active", isFieldsCompleted);
    }

    // lecture des champs pour savoir si il sont remplis
    titreInput.addEventListener("change", updateSubmitButtonStyle);
    imageInput.addEventListener("change", updateSubmitButtonStyle);
    categorieInput.addEventListener("change", updateSubmitButtonStyle);
};

// fonction pour afficher l'image chargée

function previewImage(selectedFile, imagePreview) {
    if (selectedFile) {

        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result;

            if (imagePreview) {
                imagePreview.style.display = "block";
                imagePreview.src = imageUrl;
            }
        };

        reader.readAsDataURL(selectedFile);
    }
}

export {createEditModale}
