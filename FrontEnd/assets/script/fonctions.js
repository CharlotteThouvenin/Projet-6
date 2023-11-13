// fonction fetch

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    console.log(data)


//récupérer uniquement les propriétés utiles

    const utilData = data.map(item => ({
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
const categoriesArray = Array.from(categoriesSet);
categoriesArray.unshift("Tous");

console.log(categoriesArray);


//
    genererGallery(utilData);

    genererFiltres(categoriesArray);

}  




// fonction generer galerie

function genererGallery(data){
    for (let i = 0; i<data.length; i++){
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
        const workFigCaption = document.createElement ("figcaption");
        workFigure.appendChild(workFigCaption);
        workFigCaption.innerText = work.title;

    }

}

// fonction generer filtres

function genererFiltres(categoryList) {
    const filtres = document.querySelector(".filtres");
    const boutonsArray = [];

    for (let i = 0; i < categoryList.length; i++) {
        const category = categoryList[i];
        const boutonFiltres = document.createElement("button");
        boutonFiltres.innerText = category;
        filtres.appendChild(boutonFiltres);

        boutonsArray.push(boutonFiltres);

        console.log(boutonsArray)
    }
}


// fonction filtrer

function filtrerTableau(data, fonctionFiltrage) {
    return data.filter(fonctionFiltrage);
  }

function filtrerCategory (data, category) {
    return data.categoryName === category
}




// application des filtres


