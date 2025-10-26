const menuHamburgerBtnEl = document.querySelector('#menu-hamburger-btn');
const navlistEl = document.querySelector('.nav-list');







menuHamburgerBtnEl.addEventListener('click', function() {
    navlistEl.classList.toggle('active');
});
