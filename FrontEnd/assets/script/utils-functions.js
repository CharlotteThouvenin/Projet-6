// fonction fetch avec methode get pour récupérer les données

async function getFetch (url) {
    const response = await fetch(url);
    const data = await response.json();

    return(data)
}


// fonction pour créer un élément dans le dom

function createDomElements (type, parent, className){
    const domElement = document.createElement(type);
    parent.appendChild(domElement);
    domElement.classList.add(className)

    return domElement
}

// fonction listener

function listener (button, fonction){
    button.addEventListener("click", fonction)
}


// fonction generer une galerie (initiale et filtrées)

function genererGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const gallery = document.querySelector(".gallery");

        const work = data[i];

        //création d'une balise qui contient un travail
        const workFigure = createDomElements("figure", gallery, "gallery__figure");

        //création d'une balise image 
        const workImage = createDomElements("img", workFigure, "gallery__figure__img","autre-class");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;

        //creation du titre
        const workFigCaption = createDomElements("figcaption", workFigure, "gallery__figure__figcaption")
        workFigCaption.innerText = work.title;
    }
}


// fonction filtrer

async function filtrer(category) {
    const works = await getAllWorks ()
    const filteredWorks = works.filter(work => work.category.name === category);

    return filteredWorks
}

