import {
    createDomElements
} from "../utils/helpers.js";
import {
    getAllWorks
} from "../utils/callAPI.js";

// créer la galerie de la page d'accueil

function createIndexGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const gallery = document.querySelector(".gallery");

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = createDomElements("figure", gallery, "gallery__figure");

        //création d'une balise image 
        const workImage = createDomElements("img", workFigure, "gallery__figure__img", "autre-class");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        //creation du titre
        const workFigCaption = createDomElements("figcaption", workFigure, "gallery__figure__figcaption");
        workFigCaption.innerText = work.title;
    }
}


// fonction pour mettre à jour la galerie

async function updateIndexGallery() {
    document.querySelector(".gallery").innerHTML = "";
    const works = await getAllWorks();
    createIndexGallery(works)
}

// créer les filtres de la page index

function afficherFiltres(categories) {
    const portfolio = document.getElementById("portfolio");
    const gallery = document.querySelector(".gallery");
    const filtres = createDomElements("div", portfolio, "filtres");

    portfolio.insertBefore(filtres, gallery);
    const tous = {
        id: 0,
        name: "Tous"
    }
    categories.unshift(tous);

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

export {
    createIndexGallery,
    updateIndexGallery,
    afficherFiltres
}
