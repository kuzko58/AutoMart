import {
    main
} from '/scripts/main.js';
import {
    latestDeals
} from '/scripts/storage.js';
import {
    createNewElem,
    createNewImage
} from '/scripts/func-lib.js';

const [getStarted, existingUser] = [document.getElementById('getStarted'), document.getElementById('existingUser')];
const adContainerPartitionHolder = document.getElementById('adContainerPartitionHolder');


function addAdvertToLatest(obj) {
    let overlay = createNewElem('div', ['ad-container-partition-overlay']);
    let arr = [createNewElem('h3', '', obj.price), createNewElem('span', '', obj.name), createNewElem('span', '', obj.condition), createNewElem('span', '', obj.year)];
    arr.forEach((el) => {
        overlay.appendChild(el);
    });
    let adPart = createNewElem('div', ['ad-container-partition']);
    adPart.appendChild(createNewImage('img', obj.image, 'image', '100%', '100%'));
    adPart.appendChild(overlay);

    adContainerPartitionHolder.appendChild(adPart);
    let n = document.querySelectorAll('.ad-container-partition').length;
    if (screen.width < 768) {
        document.querySelector('.ad-container-partition-holder').style.width = `calc(${n} * (100% - 10px))`;
    } else if (screen.width < 1280) {
        document.querySelector('.ad-container-partition-holder').style.width = `calc(${n} * (45vw))`;

    } else {
        document.querySelector('.ad-container-partition-holder').style.width = `calc(${n} * (460px))`;

    }

}

function scroller() {
    let scrollDistance = 0;
    let scrollDirection = 'right';
    let x = Number(document.querySelector('.ad-container-body-inner').offsetWidth);
    let y = x / 2;

    setInterval(() => {
        if (scrollDistance <= 0) {
            scrollDirection = 'right';
        }
        if (scrollDistance >= Number(document.querySelector('.ad-container-body-inner').offsetWidth)) {
            scrollDirection = 'left';
        }

        if (scrollDirection === 'right') {
            document.querySelector('.ad-container-body-inner').scrollBy(y, 0);
            scrollDistance += y;
        }
        if (scrollDirection === 'left') {
            document.querySelector('.ad-container-body-inner').scrollBy(-y, 0);

            scrollDistance -= y;
        }

    }, 5000);

}

window.addEventListener('load', () => {
    main();

    latestDeals.forEach(el => {
        addAdvertToLatest(el);
    });

});
if (screen.width >= 1280) {
    scroller();
}


getStarted.addEventListener('click', () => {
    sessionStorage.page = 'sign up';
    window.location = 'sign in.html';
});
existingUser.addEventListener('click', () => {
    sessionStorage.page = 'sign in';
    window.location = 'sign in.html';
});

document.getElementById('findCar').addEventListener('click', () => {
    window.location = 'search.html';
});
document.getElementById('sellCar').addEventListener('click', () => {
    window.location = 'sell.html';
});