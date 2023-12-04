// affichage de la modale

import {
    getAllWorks,
    deleteWork
} from "../utils/callAPI.js";

import {
    createDeleteModaleContent
} from "../DOM/deleteModale.js";



function afficherDeleteModale() {
    document.querySelector(".modale__container").style.display = "flex";

    createDeleteModaleContent();
}




async function listenerDeleteWork() {

    const work = await getAllWorks();

    for (let i = 0; i < work.length; i++) {

        const workTrashIcon = document.querySelectorAll(".modale__content__gallery__icon");
        workTrashIcon[i].addEventListener("click", function (event) {

            let reponseUser = confirm('Voulez vous vraiment supprimer ce travail ?');
            if (reponseUser === true) {

                deleteWork(work[i].id);

                event.target.closest("figure").remove();

            }

        })
    }
}

export {
    listenerDeleteWork,
    afficherDeleteModale
}
