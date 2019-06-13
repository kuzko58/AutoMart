import {
    main
} from '/scripts/main.js';
import {
    bodyTypeArr,
    allStates,
    manuYearArrFunc,
    vehicle,
    carModel
} from '/scripts/storage.js';

function addOption(arr, elemId) {
    document.getElementById(elemId).length = 1;
    arr.forEach(el => {
        let x = document.createElement('option');
        x.value = el;
        x.textContent = el;
        document.getElementById(elemId).appendChild(x);
    });
}
let selectedBodyType, selectedBrand;


window.addEventListener('load', () => {
    main();
    addOption(bodyTypeArr, 'bodyType');
    addOption(manuYearArrFunc(1990, 2019), 'manuYear');
    addOption(allStates, 'stateLocation');

});

document.getElementById('bodyType').addEventListener('change', () => {
    document.getElementById('brandModel').length = 1;
    selectedBodyType = document.getElementById('bodyType').value.toLowerCase();
    addOption(vehicle[selectedBodyType], 'manuBrand');
});

document.getElementById('manuBrand').addEventListener('change', () => {
    selectedBrand = document.getElementById('manuBrand').value.toLowerCase();
    addOption(carModel[selectedBrand][selectedBodyType], 'brandModel');
});