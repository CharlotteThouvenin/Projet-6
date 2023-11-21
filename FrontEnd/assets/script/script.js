

generateInitialWoksGallery()


const token = sessionStorage.getItem("Token")

if(token){
    createlogOut();
    addEditionModeBanner();
    addEditButton();
}

else{
    genererFiltres()
}

