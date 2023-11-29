

// fonction pour récupérer tous les travaux

import { afficherFiltres } from "./createDOMelements";



// fonction pour générer la galerie initiale

async function generateInitialWoksGallery(){
    const allWorks = await getAllWorks();
    genererGallery(allWorks);
}







