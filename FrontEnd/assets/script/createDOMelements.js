// fonction pour créer un élément dans le dom

import { getAllWorks } from "./callAPI.js";
import {createModalGallery} from "./deleteWorks.js";
import { createEditModale } from "./addWorks.js";

function createDomElements (type, parent, className){
    const domElement = document.createElement(type);
    parent.appendChild(domElement);
    domElement.classList.add(className)

    return domElement
}


// créer la galerie de la page d'accueil

function createIndexGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const gallery = document.querySelector(".gallery");

       

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = createDomElements("figure", gallery, "gallery__figure");

        //création d'une balise image 
        const workImage = createDomElements("img", workFigure, "gallery__figure__img","autre-class");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        //creation du titre
        const workFigCaption = createDomElements("figcaption", workFigure, "gallery__figure__figcaption")
        workFigCaption.innerText = work.title;
    }
}

// fonction pour mettre à jour la galerie

async function updateIndexGallery() {
    document.querySelector(".gallery").innerHTML="";
    const works = await getAllWorks();
    createIndexGallery(works)
}

// créer les filtres de la page index

function afficherFiltres (categories){
    const portfolio = document.getElementById("portfolio");
    const gallery = document.querySelector(".gallery")
    const filtres = createDomElements("div",portfolio,"filtres")

    portfolio.insertBefore(filtres, gallery);
    const tous = {
        id:0,
        name:"Tous"
    }
    categories.unshift(tous)

    const boutonsArray = []

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i].name;
        const boutonFiltres = createDomElements("button", filtres);
        boutonFiltres.innerText = category;
        boutonsArray.push(boutonFiltres);

        boutonsArray.forEach((bouton, index) => {
            bouton.categoryName = categories[index].name
        })
    }
}

// créer les boutons de modifications sur la page d'accueil

// modification du login en logout
function createlogOut() {
    const logButton = document.querySelector("nav a");
    logButton.innerText = "logout";
    logButton.href = "";
    
    return logButton
}

// création de la bannière d'édition

function createEditionModeBanner() {
    
    const body = document.querySelector("body")
    const editBanner = createDomElements("div", body, "mode_edition")
    body.insertBefore(editBanner, body.firstChild);

    const icon= createDomElements("i", editBanner, "edit_icon")
    icon.classList.add("fa-solid")
    icon.classList.add("fa-pen-to-square")


    const text = document.createElement("span");
    editBanner.appendChild(text);
    text.textContent = "Mode édition"
}

// création du bouton modifier

function createEditButton (){
    const mesProjets = document.querySelector(".projets")
    const editButton = createDomElements("div", mesProjets, "edit_button")

    const icon= createDomElements("i", editButton, "edit_icon")
    icon.classList.add("fa-solid")
    icon.classList.add("fa-pen-to-square")


    const text = document.createElement("span");
    editButton.appendChild(text);
    text.textContent = "modifier"

    return editButton
}


// creation de la modale


function createDeleteModaleContent () {
    const modale = document.querySelector(".modale")
    const modaleTitle = document.querySelector(".modale__title")
    modaleTitle.innerText = "Galerie photo";

    //ajout de la galerie
    const modaleContent = document.querySelector(".modale__content")
    const modaleGallery = createDomElements("div",modaleContent, "modale__content__gallery" );
    
    createModalGallery()

    const emptyDiv = createDomElements("div", modaleContent, "design__line")

    //ajout du bouton ajouter une photo
    const modaleAddButton = createDomElements("button", modaleContent, "modale__submit")
    modaleAddButton.innerText = "Ajouter une photo";
    modaleAddButton.addEventListener("click", function(){
        modaleContent.innerHTML="";
        createEditModale()
    })
}


export {createDomElements, createIndexGallery, updateIndexGallery, afficherFiltres, createlogOut, createEditionModeBanner, createEditButton, createDeleteModaleContent}