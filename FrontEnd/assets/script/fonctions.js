

// fonction fetch
async function getAllWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

    genererGallery(works);

    return works
}

// fonction récupérer les categories

async function getAllCategories(){
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    // rajout de la catégorie "Tous" en index 0 pour le bouton "Tous"
    const tous = {
        id:0,
        name:"Tous"
    }
    categories.unshift(tous)

    return categories
}




// fonction generer galerie (initiale et filtrées)

function genererGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const gallery = document.querySelector(".gallery");

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = document.createElement("figure");
        gallery.appendChild(workFigure);

        //création d'une balise image 
        const workImage = document.createElement("img");
        workFigure.appendChild(workImage);
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        //creation du titre
        const workFigCaption = document.createElement("figcaption");
        workFigure.appendChild(workFigCaption);
        workFigCaption.innerText = work.title;
    }
}


// fonction generer filtres

async function genererFiltres() {
    const categories = await getAllCategories()
    const filtres = document.querySelector(".filtres");
    const boutonsArray = []

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i].name;
        const boutonFiltres = document.createElement("button");
        boutonFiltres.innerText = category;
        filtres.appendChild(boutonFiltres);
        boutonsArray.push(boutonFiltres);

        boutonsArray.forEach((bouton, index) => {
            bouton.categoryName = categories[index].name
        })
    }

    listenerFiltres()
}


// fonction filtrer

async function filtrer(category) {
    const works = await getAllWorks ()
    const filteredWorks = works.filter(work => work.category.name === category);

    return filteredWorks
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
            console.log(boutonWorkFiltres[i].categoryName)

            // aplication de la fonction filtrer en excluant le bouton "Tous"  qui est en index 0 dans le tableau des boutons
            if (i > 0) {
                let workFiltres = await filtrer(boutonWorkFiltres[i].categoryName)
                console.log(workFiltres)
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
