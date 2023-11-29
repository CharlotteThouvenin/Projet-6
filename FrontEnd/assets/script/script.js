import { getAllCategories, getAllWorks } from "./callAPI.js";
import { afficherFiltres, createIndexGallery, createlogOut, createEditionModeBanner, createEditButton } from "./createDOMelements.js";
import { listenerFiltres } from "./filtersButtons.js";
import { logingOut, editWorks} from "./editButtons.js";


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

