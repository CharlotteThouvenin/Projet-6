let utilData = []

let categoriesArray = []

let boutonsArray = []


// fonction fetch
async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    console.log(data)


    //récupérer uniquement les propriétés utiles

    utilData = data.map(item => ({
        imageUrl: item.imageUrl,
        title: item.title,
        categoryName: item.category.name
    }));
    console.log(utilData)


    //récupérer les catégories

    const categoriesSet = new Set();

    utilData.forEach(item => {
        categoriesSet.add(item.categoryName);
    });
    categoriesArray = Array.from(categoriesSet);
    //rajout de la catégorie "tous"
    categoriesArray.unshift("Tous");

    console.log(categoriesArray);


    //
    genererGallery(utilData);

    genererFiltres(categoriesArray);

}




// fonction generer galerie

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

function genererFiltres(categoryList) {
    const filtres = document.querySelector(".filtres");

    for (let i = 0; i < categoryList.length; i++) {
        const category = categoryList[i];
        const boutonFiltres = document.createElement("button");
        boutonFiltres.innerText = category;
        filtres.appendChild(boutonFiltres);
        boutonsArray.push(boutonFiltres);

        boutonsArray.forEach((bouton, index) => {
            bouton.categoryName = categoryList[index]
        })

        console.log(boutonsArray)
    }
    listenerFiltres()
}


// fonction filtrer

function filtrer(data, category) {
    console.log(data);
    console.log(category);
    return data.filter(item => item.categoryName === category);
}



// application des filtres

function listenerFiltres() {
    const boutonWorkFiltres = document.querySelectorAll(".filtres button");
    console.log(boutonWorkFiltres)

    for (let i = 0; i < boutonWorkFiltres.length; i++) {
        boutonWorkFiltres[i].addEventListener("click", function () {
            console.log(boutonWorkFiltres[i].categoryName)
            console.log(utilData)
            if (i > 0) {
                let workFiltres = filtrer(utilData, boutonWorkFiltres[i].categoryName)
                console.log(workFiltres)

                document.querySelector(".gallery").innerHTML = "";
                genererGallery(workFiltres);
            } else {
                document.querySelector(".gallery").innerHTML = "";
                genererGallery(utilData);
            }

        })

    }
}
