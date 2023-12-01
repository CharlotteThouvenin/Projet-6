

function createDomElements (type, parent, className){
    const domElement = document.createElement(type);
    parent.appendChild(domElement);
    domElement.classList.add(className)

    return domElement
}



function previewImage(selectedFile, imagePreview) {
    if (selectedFile) {

        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result;

            if (imagePreview) {
                imagePreview.style.display = "block";
                imagePreview.src = imageUrl;
            }
        };

        reader.readAsDataURL(selectedFile);
    }
}


export {createDomElements, previewImage}