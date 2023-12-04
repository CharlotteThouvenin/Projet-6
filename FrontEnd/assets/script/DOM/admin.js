import {
    createDomElements
} from "../utils/helpers.js";


// modification du login en logout
function createlogOut() {
    const logButton = document.querySelector("nav a");
    logButton.innerText = "logout";
    logButton.href = "";

    return logButton;
}

// création de la bannière d'édition

function createEditionModeBanner() {

    const body = document.querySelector("body");
    const editBanner = createDomElements("div", body, "mode_edition");
    body.insertBefore(editBanner, body.firstChild);

    const icon = createDomElements("i", editBanner, "edit_icon");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-pen-to-square");


    const text = document.createElement("span");
    editBanner.appendChild(text);
    text.textContent = "Mode édition";
}

// création du bouton modifier

function createEditButton() {
    const mesProjets = document.querySelector(".projets");
    const editButton = createDomElements("div", mesProjets, "edit_button");

    const icon = createDomElements("i", editButton, "edit_icon");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-pen-to-square");


    const text = document.createElement("span");
    editButton.appendChild(text);
    text.textContent = "modifier";

    return editButton;
}

export {
    createlogOut,
    createEditionModeBanner,
    createEditButton
}