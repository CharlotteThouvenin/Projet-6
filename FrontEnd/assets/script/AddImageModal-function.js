// fonction generer la modale d'ajout de photo

function createEditModale(){

    const modale = document.querySelector(".modale")
    const addmodaleContent = createDomElements("div", modale, "addmodale__content")
    

    const addmodaleBackAndClose= createDomElements("div", addmodaleContent, "addmodale__content__backandclose");

    //ajout flèche retour

    const backArrow= createDomElements("img", addmodaleBackAndClose, "addmodale__content_backArrow");
    backArrow.src = "./assets/icons/backArrow.svg";
    backArrow.addEventListener("click", function(){
        addmodaleContent.parentNode.removeChild(addmodaleContent)
        })

    //ajout de la croix pour fermer
    const closingModaleButton = createDomElements("img", addmodaleBackAndClose, "addmodale__content__closebutton");
    closingModaleButton.src="./assets/icons/Vector (4).svg";
    closingModaleButton.addEventListener("click", function (){
        removeModale()
     })

 
     
     //ajout titre
     const modaleTitle = createDomElements("h1", addmodaleContent, "modale__content__title");
     modaleTitle.innerText = "Ajout photo";

     // ajout contenu

     const divLoadImage = createDomElements("div", addmodaleContent, "addmodale__content__load");
}