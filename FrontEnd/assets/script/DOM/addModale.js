import {
    createDomElements
} from "../utils/helpers.js"

import { getAllCategories } from "../utils/callAPI.js";


const modaleContent = document.querySelector(".modale__content");


//ajout flèche retour
function displayBackArrow(){
    const backArrow = document.querySelector(".fa-arrow-left");
    backArrow.style.opacity = "1"

    return backArrow
}


// creation formulaire

function createAddForm() {

    const addImageForm = createDomElements("form", modaleContent, "modale__content__form");
    addImageForm.enctype = "multipart/form-data";

    return addImageForm
}

// creation de l'emplacement pour l'image

function createDivLoadImage(form) {
    const divLoadImage = createDomElements("div", form, "modale__content__form__load");
    const imagePreview = createDomElements("img", divLoadImage, "modale__content__form__load__preview")
    imagePreview.style.display = "none";

    const imageIcon = createDomElements("i", divLoadImage, "modale__content__form__load__icon");
    imageIcon.classList.add("fa-solid")
    imageIcon.classList.add("fa-image")
}

// image

// input pour charger l'image

function createInputImage(form) {
    const imageInput = createDomElements("input", form, "modale__content__form__load__input");
    imageInput.type = "file"
    imageInput.accept = ".jpeg, .png "
    imageInput.id = "image__input"
    imageInput.classList.add("hide")
    imageInput.required = "true"

    return imageInput
}

// bouton pour charger l'image

function createAddFileButton(form) {
    const ajoutbutton = createDomElements("label", form, "modale__content__form__load__submit")
    ajoutbutton.innerText = "+ Ajouter photo"
    ajoutbutton.htmlFor = "image__input"

    const ajoutDetails = createDomElements("p", form, "modale__content__form__load__p")
    ajoutDetails.innerText = "jpg, png : 4mo max"

    return ajoutbutton;

}

// cacher les éléments au preview

function hideElements(){
    document.querySelector(".modale__content__form__load__submit").style.display="none";
    document.querySelector(".modale__content__form__load__icon").style.display = "none";
    document.querySelector(".modale__content__form__load__p").style.display = "none";
       
}

// input Titre

function createTitleInput(form){
    const titreLabel = createDomElements("label", form)
    titreLabel.for = "titre"
    titreLabel.innerText = "Titre"
    const titreInput = createDomElements("input", form, "modale__content__form__titreInput")
    titreInput.name = "titre"
    titreInput.required = "true"

    return titreInput
}

async function createCategoryInput (form){
    const categorieLabel = createDomElements("label", form)
    categorieLabel.for = "categorie"
    categorieLabel.innerText = "Catégorie"
    const categorieInput = createDomElements("select", form, "modale__content__form__categoryInput")
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

    return categorieInput
}

function createSubmitButton (form){
    const formSubmitButton = createDomElements("button", form, "modale__content__form__submit");
    formSubmitButton.type = "submit"
    formSubmitButton.innerText = "Valider";
    formSubmitButton.disabled = "true";
}






export {
    displayBackArrow,
    createAddForm,
    createDivLoadImage,
    createInputImage,
    createAddFileButton,
    hideElements,
    createTitleInput,
    createCategoryInput,
    createSubmitButton
}