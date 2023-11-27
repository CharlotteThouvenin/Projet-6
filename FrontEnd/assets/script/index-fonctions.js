

// fonction pour récupérer tous les travaux

async function getAllWorks() {

    const worksUrl = "http://localhost:5678/api/works";
    const works = await getFetch(worksUrl)

    return works
}

// fonction pour générer la galerie initiale

async function generateInitialWoksGallery(){
    const allWorks = await getAllWorks();
    genererGallery(allWorks);
}

// fonction récupérer les categories

async function getAllCategories(){

    const categoriesUrl = "http://localhost:5678/api/categories"

    const categories = await getFetch(categoriesUrl)

    // rajout de la catégorie "Tous" en index 0 pour le bouton "Tous"
    const tous = {
        id:0,
        name:"Tous"
    }
    categories.unshift(tous)

    return categories
}



// fonction generer filtres

async function genererFiltres() {
    const categories = await getAllCategories();
    const portfolio = document.getElementById("portfolio");
    const gallery = document.querySelector(".gallery")

    const filtres = createDomElements("div",portfolio,"filtres")

    portfolio.insertBefore(filtres, gallery);

    const boutonsArray = []

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i].name;
        const boutonFiltres = createDomElements("button", filtres);
        boutonFiltres.innerText = category;
        boutonsArray.push(boutonFiltres);

        boutonsArray.forEach((bouton, index) => {
            bouton.categoryName = categories[index].name
        })
    }

    listenerFiltres()
}



// application des filtres

async function listenerFiltres() {

    // récupérer les data à filtrer
    let worksData = await getAllWorks();

    // récupérer les boutons filtres
    const boutonWorkFiltres = document.querySelectorAll(".filtres button");

    // ajout des eventlistener
    for (let i = 0; i < boutonWorkFiltres.length; i++) {
        boutonWorkFiltres[i].addEventListener("click", async function () {
            // aplication de la fonction filtrer en excluant le bouton "Tous"  qui est en index 0 dans le tableau des boutons
            if (i > 0) {
                let workFiltres = await filtrer(boutonWorkFiltres[i].categoryName)
                // effacer la galerie en cours
                document.querySelector(".gallery").innerHTML = "";
                // et afficher la galerie du resultat des filtres
                genererGallery(workFiltres);

            } else {
                document.querySelector(".gallery").innerHTML = "";
                genererGallery(worksData);
            }

        })
    }
}


