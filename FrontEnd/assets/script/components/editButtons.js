import {
    afficherDeleteModale
} from "../Services/deleteWorks.js";

// bouton "logout"

function logingOut(button) {
    button.addEventListener("click", function () {
        sessionStorage.clear("Token");
    });
};

// bouton "modifier"
function editWorks(button) {
    button.addEventListener("click", function () {
        afficherDeleteModale();
    });
};

export {
    logingOut,
    editWorks
}