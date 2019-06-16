import {
  main
} from './main.js';

function switchTab(x, y, a, b) {
  y.style.color = 'lightgray';
  x.style.color = 'teal';
  x.style.borderBottom = '1px solid lightgray';
  y.style.borderBottom = 'none';
  document.querySelector(b).style.display = 'none';
  document.querySelector(a).style.display = 'flex';
}

window.addEventListener('load', () => {
  let data = sessionStorage.page;
  if (data === 'sign up') {
    switchTab(signUp, signIn, '.sign-up', '.sign-in');
  } else if (data === 'sign in') {
    switchTab(signIn, signUp, '.sign-in', '.sign-up');
  } else {
    switchTab(signIn, signUp, '.sign-in', '.sign-up');
  }
  main();
});


signUp.addEventListener('click', () => {
  switchTab(signUp, signIn, '.sign-up', '.sign-in');
});

signIn.addEventListener('click', () => {
  switchTab(signIn, signUp, '.sign-in', '.sign-up');
});