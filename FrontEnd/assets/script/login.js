
import {postLogInData} from "./callAPI.js"


loginDataListener()



// creation de l'objet d'authentification au submit

function loginDataListener() {
    const loginForm = document.querySelector(".login__form");
    let loginData = []

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        loginData = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#mdp").value
        };

        const chargeUtileData = chargeUtile(loginData);

        sendLoginData(chargeUtileData)

    });

}





// fonction convertir en json
function chargeUtile(data) {
    const chargeUtileData = JSON.stringify(data)
    return chargeUtileData
}

// fonction envoi donner authentification
async function sendLoginData(chargeUtile) {
    try{
        const postStatut = await postLogInData(chargeUtile);

        if (!postStatut.ok) {
            throw new Error(`${postStatut.status}: ${errorMessage}`);
        }

        const response = await postStatut.json()
       
        logInOk(response)

    } catch (error) {
        messageErreur()
    }
}


// fonction afficher message erreur

function messageErreur() {
    document.querySelector(".messageErreur").style.display = "block";
}




// fonction renvoyer sur page d'acceuil et stocker le token

function logInOk(response){
    // stocker le token
    sessionStorage.setItem("Token", response.token);
    // renvoi sur la page d'accueil
    window.location.replace("index.html")
}   