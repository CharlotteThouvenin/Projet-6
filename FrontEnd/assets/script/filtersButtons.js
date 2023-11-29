import { getAllWorks } from "./callAPI.js";
import { createIndexGallery } from "./createDOMelements.js";

// fonction filtrer

async function filtrer(category) {
    const works = await getAllWorks();
    const filteredWorks = works.filter(work => work.category.name === category);

    return filteredWorks
}


// application des filtres

async function listenerFiltres(data) {

    // récupérer les boutons filtres
    const boutonWorkFiltres = document.querySelectorAll(".filtres button");

    // ajout des eventlistener
    for (let i = 0; i < boutonWorkFiltres.length; i++) {
        boutonWorkFiltres[i].addEventListener("click", async function () {
            // aplication de la fonction filtrer en excluant le bouton "Tous"  qui est en index 0 dans le tableau des boutons
            if (i > 0) {
                let workFiltres = await filtrer(boutonWorkFiltres[i].categoryName)
                // effacer la galerie en cours
                document.querySelector(".gallery").innerHTML = "";
                // et afficher la galerie du resultat des filtres
                createIndexGallery(workFiltres);

            } else {
                document.querySelector(".gallery").innerHTML = "";
                createIndexGallery(data);
            }
        })
    }
}

export {listenerFiltres}