import {
    postNewWork
} from "../utils/callAPI.js";
import {
    displayBackArrow,
    createAddForm,
    createDivLoadImage,
    hideElements,
    createInputImage,
    createAddFileButton,
    createTitleInput,
    createCategoryInput,
    createSubmitButton
} from "../DOM/addModale.js";
import {
    createDeleteModaleContent
} from "../DOM/deleteModale.js";
import {
    createDomElements,
    previewImage
} from "../utils/helpers.js";


const modaleContent = document.querySelector(".modale__content");

// fonction generer la modale d'ajout de photo

async function createEditModale() {

    //ajout flèche retour

    const backArrow = displayBackArrow();

    backArrow.addEventListener("click", function () {
        backArrow.style.opacity = "0";

        while (modaleContent.firstChild) {
            modaleContent.removeChild(modaleContent.firstChild);
        }

        createDeleteModaleContent();
    })



    //modification titre
    const modaleTitle = document.querySelector(".modale__title");
    modaleTitle.innerText = "Ajout photo";

    // creation du formulaire
    const addImageForm = createAddForm();

    // envoi des données du formulaire

    addImageForm.addEventListener("submit", function (event) {
        event.preventDefault()
        let formData = new FormData();
        formData.append("title", titreInput.value);
        formData.append("image", imageInput.files[0]);
        formData.append("category", categorieInput.value);
        postNewWork(formData);
        updateIndexGallery();
    })

    // emplacement pour prévisualiser l'image
    const divLoadImage = createDivLoadImage(addImageForm);

    // input pour charger l'image
    const imageInput = createInputImage(addImageForm);


    // afficher la prévisualisation de l'image
    imageInput.addEventListener("change", function () {
        const selectedFile = imageInput.files[0];
        const imagePreview = document.querySelector(".modale__content__form__load__preview");
        previewImage(selectedFile, imagePreview);
        hideElements();
        updateSubmitButtonStyle()

    });


    // bouton pour charger l'image
    const ajoutbutton = createAddFileButton(addImageForm);

    // input titre

    const titreInput = createTitleInput(addImageForm)
    titreInput.addEventListener("change", updateSubmitButtonStyle);

    // input categorie

    const categorieInput = await createCategoryInput(addImageForm)
    categorieInput.addEventListener("change", updateSubmitButtonStyle);

    createDomElements("div", addImageForm, "design__line");

    // bouton de validation du formulaire
    const formSubmitButton = createSubmitButton(addImageForm);

}

// Fonction pour vérifier si tous les champs sont remplis
function allFieldscompleted() {
    const imageInput = document.querySelector(".modale__content__form__load__input");
    const titreInput = document.querySelector(".modale__content__form__titreInput");
    const categorieInput = document.querySelector(".modale__content__form__categoryInput");
    return titreInput.value !== "" && imageInput.files.length > 0 && categorieInput.value !== "";
}

// Fonction pour mettre à jour le style du bouton "Valider"
function updateSubmitButtonStyle() {
    const formSubmitButton = document.querySelector(".modale__content__form__submit")
    const isFieldsCompleted = allFieldscompleted();
    formSubmitButton.classList.toggle("active", isFieldsCompleted);
    formSubmitButton.disabled = !isFieldsCompleted;
}

export {
    createEditModale
}
