const baseURL = "http://localhost:5678/api/"

// fonction fetch methode get

async function getFetch (url) {
    const response = await fetch(url);
    const data = await response.json();

    return(data)
}


//récupérer tous les travaux

async function getAllWorks() {

    const worksUrl = `${baseURL}works`;
    const works = await getFetch(worksUrl)
    console.log(worksUrl)
    return works
}

// récupérer les catégories

async function getAllCategories(){

    const categoriesUrl = `${baseURL}categories`

    const categories = await getFetch(categoriesUrl)

    

    return categories
};



// envoi données authentification

async function postLogInData (chargeUtile){
    const loginURL = `${baseURL}users/login`;
    console.log(loginURL)
    const postStatut = await fetch(loginURL,

    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    })
    return postStatut
}

// supprimer un travail

async function deleteWork (id){
    await fetch(`${baseURL}works/${id}` , 
    {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ sessionStorage.getItem("Token")
        },
        
    })
}


// fonction poster un nouveau travail

async function postNewWork(formData) {
    const postWorkApiUrl = `${baseURL}works`;
    const Token = sessionStorage.getItem("Token");

    await fetch(postWorkApiUrl, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${Token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Réponse de l'API :", data);

        })
        .catch(error => {
            console.error("Erreur lors de la requête à l'API :", error);
        });
}

export {getAllWorks, getAllCategories, postLogInData, postNewWork}
