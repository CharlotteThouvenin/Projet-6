// fonction fetch

function fetchData (url, data) { async() =>{
    const reponse = await fetch(url);
    data= await reponse.json();

    let utilData = data.map(data => {data.imageUrl, data.title, data.category.name});

    genererGallery(utilData)

}  
}

//récupérer uniquement les propriétés utiles



// fonction generer galerie

function genererGallery(data){
    for (let i = 0; i<data.length; i++){
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = ""; /* efface le contenu */

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
        const workFigCaption = document.createElement ("figcaption");
        workFigure.appendChild(workFigCaption);
        workFigCaption.innerText = work.title;

    }

}

// fonction generer filtres



// fonction filtrer

function filtrerTableau(data, fonctionFiltrage) {
    return data.filter(fonctionFiltrage);
  }

function filtrerCategory (data, category) {
    return data.category.name === category
}

let tableauFiltreCategory = filtrerTableau (data,filtrerCategory)


// application des filtres

