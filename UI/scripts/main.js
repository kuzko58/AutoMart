function main() {
    const [menuImg, dropDown, dropDownDownUnderlay] = [document.getElementById('menuImg'), document.getElementById('dropDown'), document.getElementById('dropDownUnderlay')];
    const [navBarSignIn, sideBarSignIn] = [document.getElementById('navBarSignIn'), document.getElementById('sideBarSignIn')];
    const [navBarSell, sideBarSell] = [document.getElementById('navBarSell'), document.getElementById('sideBarSell')];
    const dropDownIconBoxList = document.querySelectorAll('.drop-down-icon-box');



    menuImg.addEventListener('click', () => {
        if (/menu-icon.png/.test(menuImg.src)) {
            menuImg.src = "css\\assets\\Icons\\cross.png";
            dropDownDownUnderlay.style.display = 'block';
            dropDownDownUnderlay.classList.replace('opacity-effect-out', 'opacity-effect-in');
            dropDown.classList.replace('menu-close-effect', 'menu-open-effect');
        } else {
            menuImg.src = "css\\assets\\Icons\\menu-icon.png";
            dropDown.classList.replace('menu-open-effect', 'menu-close-effect');
            dropDownDownUnderlay.classList.replace('opacity-effect-in', 'opacity-effect-out');


            dropDown.addEventListener('animationend', () => {
                if (event.animationName === 'menu-close-effect') {
                    dropDownDownUnderlay.style.display = 'none';
                }

            });
        }
    });


    dropDownIconBoxList.forEach(element => {
        element.addEventListener('click', () => element.classList.toggle('active-one'));
    });

    navBarSignIn.addEventListener('click', () => {
        sessionStorage.page = 'sign in';
        window.location = 'sign in.html';
    });
    sideBarSignIn.addEventListener('click', () => {
        sessionStorage.page = 'sign in';
        window.location = 'sign in.html';
    });
    navBarSell.addEventListener('click', () => {
        window.location = 'sell.html';
    });
    sideBarSell.addEventListener('click', () => {
        window.location = 'sell.html';
    });
}

export {
    main
};