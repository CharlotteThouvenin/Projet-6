
// aller chercher les données dans l'API et les stocker dans un tableau worksData

let worksData = [];

const fetchWorksData = async () => {
        const reponse = await fetch("http://localhost:5678/api/works");
        worksData = await reponse.json();

        genererWorks();
}

fetchWorksData();


//Afficher les projets dynamiquement//

function genererWorks(){
    for (let i = 0; i < worksData.length; i++){

        const work = worksData[i];

        // récupération de la balise gallery qui contiendra les travaux
        const gallery = document.querySelector(".gallery");

        //création d'une balise qui contient un travail
        const workFigure = document.createElement("figure");
        gallery.appendChild(workFigure);

        //création d'une balise image 
        const workImage = document.createElement("img");
        workFigure.appendChild(workImage);
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        //creation du titre
        const workFigCaption = document.createElement ("figcaption");
        workFigure.appendChild(workFigCaption);
        workFigCaption.innerText = work.title;
    }
}



// creation des filtres


const filtres = document.querySelector(".filtres");
const boutonTous = document.createElement("button");
boutonTous.innerText = "Tous";
filtres.appendChild(boutonTous);


// récupération de la liste des categories avec fetch sur api/categories

let categoryList = [];

const fetchCategoryList = async () => {
        const response = await fetch("http://localhost:5678/api/categories");
        categoryList = await response.json();

        genererFiltres();

};

fetchCategoryList();

// fonction pour generer les boutons en fonction de la liste des categories

function genererFiltres() {
    for (let i = 0; i < categoryList.length; i++) {
        const category = categoryList[i];

        const boutonFiltres = document.createElement("button");
        boutonFiltres.innerText = category.name;
        filtres.appendChild(boutonFiltres);

        

    }
}

// fonctions pour filtrer

// filtre objet

const boutonObjet = document.querySelector(".category_1");
console.log(boutonObjet);

boutonObjet.addEventListener("click", function(){
    let workObjet = worksData.filter(function(){
        return worksData.categoryId === 1;
    });
    console.log (workObjet);
})

