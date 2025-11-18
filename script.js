const menuHamburgerBtnEl = document.querySelector('#menu-hamburger-btn');
const navlistEl = document.querySelector('.nav-list');
const accordionQuestionEl = document.querySelectorAll('.accordion-question');
const accordionitemEl = document.querySelectorAll('.accordion-item');


menuHamburgerBtnEl.addEventListener('click', () => {
    navlistEl.classList.toggle('active');
});


accordionQuestionEl.forEach(question => {
    question.addEventListener('click', () =>{
        const item = question.parentElement;
        item.classList.toggle('active');

        accordionitemEl.forEach(itemLoop => {
            if(itemLoop !== item){
                itemLoop.classList.remove('active');
            }
        });

    });
  
});



