/*import {
    main
} from './main.js';*/
const [profileInfo, profilePosts, profileOffers, profileSettings] = [document.getElementById('profileInfo'), document.getElementById('profilePosts'), document.getElementById('profileOffers'), document.getElementById('profileSettings')];
const [profileInfoBody, profilePostsBody, profileOffersBody, profileSettingsBody] = [document.getElementById('profileInfoBody'), document.getElementById('profilePostsBody'), document.getElementById('profileOffersBody'), document.getElementById('profileSettingsBody')];
const [sentOffers, recievedOffers] = [document.getElementById('sentOffers'), document.getElementById('recievedOffers')];
const [sentOffersBody, recievedOffersBody] = [document.getElementById('sentOffersBody'), document.getElementById('recievedOffersBody')];
const profileTabHead = [profileInfo, profilePosts, profileOffers, profileSettings];
const profileTabBody = [profileInfoBody, profilePostsBody, profileOffersBody, profileSettingsBody];
const offersTabHead = [sentOffers, recievedOffers];
const offersTabBody = [sentOffersBody, recievedOffersBody];

function switchTab(arr1, arr2, color1, color2) {
    arr1.forEach((el) => {
        el.addEventListener('click', () => {
            for (let item of arr2) {
                item.classList.add('hide');
                arr1[arr2.indexOf(item)].style.color = color1;
            }
            arr2[arr1.indexOf(el)].classList.remove('hide');
            el.style.color = color2;
            el.style.borderB
        });
    });
}
window.addEventListener('load', () => {

    // main();
    switchTab(profileTabHead, profileTabBody, 'lightgray', 'darkslategray');
    switchTab(offersTabHead, offersTabBody, 'lightgray', 'darkslategray');
});
