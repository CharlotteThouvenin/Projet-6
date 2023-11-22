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
     
     addImageForm.addEventListener("submit", function(event){
        event.preventDefault()
        let formData = new FormData();
        formData.append("title", titreInput.value);
        formData.append("image", imageInput.files[0]);
        formData.append("category", categorieInput.value)
        console.log(formData)
        postNewWork(formData);
        updateIndexGallery();
     })

     const divLoadImage = createDomElements("div", addImageForm, "modale__content__form__load");
     const imagePreview = createDomElements("img", divLoadImage, "modale__content__form__load__preview")
     imagePreview.style.display="none";

     const imageIcon = createDomElements("i", divLoadImage, "modale__content__form__load__icon");
     imageIcon.classList.add("fa-solid")
     imageIcon.classList.add("fa-image")

     const imageInput = createDomElements("input", addImageForm, "modale__content__form__load__input");
     imageInput.type="file"
     imageInput.accept=".jpeg, .png "
     imageInput.id = "image__input"
     imageInput.classList.add("hide")

     imageInput.addEventListener("change", function () {
       
        const selectedFile = imageInput.files[0];
        previewImage(selectedFile, imagePreview);
        imageIcon.style.display="none";
        ajoutbutton.style.display="none";
        ajoutDetails.style.display="none"
       
    });



     const ajoutbutton = createDomElements("label", addImageForm, "modale__content__form__load__submit")
     ajoutbutton.innerText = "+ Ajouter photo"
     ajoutbutton.htmlFor = "image__input"

     const ajoutDetails = createDomElements("p", addImageForm)
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

     for(let i = 1; i<categoriesList.length; i++){
        const categorieChoice = createDomElements("option", categorieInput)
        categorieChoice.value = categoriesList[i].id
        categorieChoice.innerText = categoriesList[i].name
     }

     const formSubmitButton = createDomElements("button", addImageForm, "modale__content__form__submit")
    }

// fonction pour afficher l'image chargée

function previewImage(selectedFile, imagePreview){
    if (selectedFile) {

        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result;

            if (imagePreview) {
                imagePreview.style.display="block";
                imagePreview.src = imageUrl;
            }
        };

        reader.readAsDataURL(selectedFile);
    }
}


// fonction poster un nouveau travail

async function postNewWork (formData){
    const postWorkApiUrl= "http://localhost:5678/api/works";
    const Token = sessionStorage.getItem("Token");
    console.log(Token)

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
                // Gérez les erreurs ici
            });
}