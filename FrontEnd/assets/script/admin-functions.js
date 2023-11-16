// transofrmer le login en logout
function createlogOut() {
    const logButton = document.querySelector("nav a");
    logButton.innerText = "logout";
    logButton.href = "";
    console.log(logButton)

    logingOut(logButton)

}
// listener sur logout

function logingOut(button) {
    button.addEventListener("click", function () {
        alert("Vous êtes maintenant déconnecté")
        sessionStorage.clear("Token")
    })
}

// creation des éléments de modifications

function iconEditMode(parent, texte, iconSrc) {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    parent.appendChild(icon);
    icon.classList.add("edit_icon");

    const text = document.createElement("span");
    parent.appendChild(text);
    text.textContent = texte
}

// ajout bannière mode Edition

function addEditionModeBanner() {

    const editBanner = document.createElement("div")
    const body = document.querySelector("body")
    body.insertBefore(editBanner, body.firstChild);
    editBanner.classList.add("mode_edition")

    iconEditMode(editBanner, "Mode édition", "./assets/icons/Vector (1).svg");

}


//  bouton modifier

function addEditButton() {
    const mesProjets = document.querySelector(".projets")
    const editButton = document.createElement("div")
    mesProjets.appendChild(editButton)
    editButton.classList.add("edit_button")
    iconEditMode(editButton, "modifier", "./assets/icons/pen-to-square-regular.svg")
}


// création modale
