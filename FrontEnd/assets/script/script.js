import { getAllCategories, getAllWorks } from "./callAPI.js";
import { afficherFiltres, createIndexGallery } from "./createDOMelements.js";
import { listenerFiltres } from "./filters.js";



const token = sessionStorage.getItem("Token")

if(token){
    createlogOut();
    addEditionModeBanner();
    addEditButton();
}

else{
    const works = await getAllWorks()
    const categories = await getAllCategories()
    createIndexGallery(works)
    afficherFiltres(categories)
    listenerFiltres(works)
}

