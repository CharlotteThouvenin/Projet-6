import { getAllCategories, getAllWorks } from "../utils/callAPI.js";
import {createIndexGallery, afficherFiltres } from "../DOM/indexGallery.js";
import{createlogOut, createEditionModeBanner, createEditButton} from "../DOM/admin.js"
import { logingOut, editWorks } from "../components/editButtons.js";
import { listenerFiltres } from "../components/filtersButtons.js";


const token = sessionStorage.getItem("Token")

// page d'acceuil lorsque l'admin est connecté
if(token){
    const works = await getAllWorks();
    //const categories = await getAllCategories()
    createIndexGallery(works);

    const logbutton = createlogOut();
    logingOut(logbutton);

    createEditionModeBanner();

    const editButton = createEditButton();
    editWorks(editButton);

}
    

// page d'accueil visiteur
else{
    const works = await getAllWorks()
    const categories = await getAllCategories()
    createIndexGallery(works)
    afficherFiltres(categories)
    listenerFiltres(works)
}

