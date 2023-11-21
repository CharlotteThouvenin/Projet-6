// fonction generer la modale d'ajout de photo

async function createEditModale(){


    const modaleContent = document.querySelector(".modale__content")


    //ajout flèche retour

    const backArrow= document.querySelector(".fa-arrow-left");
    backArrow.style.opacity = "1"

    backArrow.addEventListener("click", function(){
        modaleContent.innerHTML="";
        backArrow.style.opacity = "0"
        createContentModale()
        })

 
     
     //modification titre
     const modaleTitle = document.querySelector(".modale__title")
     modaleTitle.innerText = "Ajout photo";


     // ajout contenu

     const addImageForm = createDomElements("form", modaleContent, "modale__content__form")
     addImageForm.enctype = "multipart/form-data"

     const divLoadImage = createDomElements("div", addImageForm, "modale__content__form__load");

     const imageIcon = createDomElements("i", divLoadImage, "modale__content__form__load__icon");
     imageIcon.classList.add("fa-solid")
     imageIcon.classList.add("fa-image")

     const imageInput = createDomElements("input", divLoadImage, "modale__content__form__load__input");
     imageInput.type="file"
     imageInput.accept=".jpeg, .png "

     const ajoutbutton = createDomElements("button", divLoadImage, "modale__content__form__load__submit")
     ajoutbutton.type="submit"
     ajoutbutton.innerText="+ Ajouter photo"

     const ajoutDetails = createDomElements("p", divLoadImage)
     ajoutDetails.innerText ="jpg, png : 4mo max"

     const titreLabel = createDomElements("label", addImageForm)
     titreLabel.for="titre"
     titreLabel.innerText = "Titre"
     const titreInput = createDomElements("input", addImageForm)
     titreInput.name="titre"

     const categorieLabel = createDomElements("label", addImageForm)
     categorieLabel.for="categorie"
     categorieLabel.innerText="Catégorie"
     const categorieInput = createDomElements("select", addImageForm)
     categorieInput.name = "categorie"
     const defaultCategorieChoice = createDomElements("option", categorieInput)
     defaultCategorieChoice.value =""

     const categoriesList = await getAllCategories()
     //categoriesList.splice(0,1)
     console.log(categoriesList)

     for(let i = 1; i<categoriesList.length; i++){
        console.log(categoriesList)
        const categorieChoice = createDomElements("option", categorieInput)
        categorieChoice.value = categoriesList[i].name
        categorieChoice.innerText = categoriesList[i].name
     }
}

/*
function previewImage() {
    var input = document.getElementById('inputFile');
    var preview = document.getElementById('imagePreview');
    
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            preview.appendChild(img);
        }

        reader.readAsDataURL(input.files[0]);
    }
}*/