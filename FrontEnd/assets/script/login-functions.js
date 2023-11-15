// creation de l'objet d'authentification au submit

function loginData() {
    const loginForm = document.querySelector(".login__form");
    console.log(loginForm);

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Utilisez # pour sélectionner l'élément par ID et .value pour récupérer la valeur
      

        const loginData = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#mdp").value
        };

        console.log(loginData);
    });
}

// fonction envoi donner authentification

//