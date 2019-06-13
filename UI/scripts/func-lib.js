function createNewElem(type, class_names, textContent) {
    let newElem = document.createElement(type);
    if (class_names) {
        class_names.forEach(el => {
            newElem.classList.add(el);
        });
    }
    if (textContent) {
        newElem.innerHTML = textContent;
    }
    return newElem;
}

function createNewImage(type, source, a, h, w) {
    let newImg = document.createElement(type);
    newImg.src = source;
    newImg.alt = a;
    newImg.style.height = h;
    newImg.style.width = w;
    return newImg;
}

export {
    createNewElem,
    createNewImage
};