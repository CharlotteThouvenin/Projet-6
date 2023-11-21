// transofrmer le login en logout
function createlogOut() {
    const logButton = document.querySelector("nav a");
    logButton.innerText = "logout";
    logButton.href = "";
   
    logingOut(logButton)

}

// listener sur logout

function logingOut(button) {
    button.addEventListener("click", function () {
        sessionStorage.clear("Token")
    })
}

// creation des éléments de modifications

function iconEditMode(parent, texte) {
    const icon= createDomElements("i", parent, "edit_icon")
    icon.classList.add("fa-solid")
    icon.classList.add("fa-pen-to-square")


    const text = document.createElement("span");
    parent.appendChild(text);
    text.textContent = texte
}

// ajout bannière mode Edition

function addEditionModeBanner() {
    const body = document.querySelector("body")
    const editBanner = createDomElements("div", body, "mode_edition")
    body.insertBefore(editBanner, body.firstChild);

    iconEditMode(editBanner, "Mode édition");
}


//  bouton modifier

function addEditButton() {
    const mesProjets = document.querySelector(".projets")
    const editButton = createDomElements("div", mesProjets, "edit_button")
    iconEditMode(editButton, "modifier")
    editButton.addEventListener("click", function(){
        afficherModale()
    })
}


/*
function listenerEditButton (editButton){
    editButton.addEventListener("click", function(){
        createGalleryModale();
    })
}*/

