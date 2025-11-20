// =========================================================
// ELEMENTOS DO DOM
// =========================================================
const menuHamburgerBtnEl = document.querySelector('#menu-hamburger-btn');
const navlistEl = document.querySelector('.nav-list');
const accordionQuestionEl = document.querySelectorAll('.accordion-question');
const accordionitemEl = document.querySelectorAll('.accordion-item');
const countervalueEl = document.querySelectorAll('.counter-value');
const statssection = document.querySelector('#stats-section');

// =========================================================
// MENU HAMBÚRGUER
// =========================================================
menuHamburgerBtnEl.addEventListener('click', () => {
    navlistEl.classList.toggle('active');
});

// =========================================================
// FAQ (ACORDEÃO)
// =========================================================
accordionQuestionEl.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        
        // Fecha outros itens
        accordionitemEl.forEach(itemLoop => {
            if (itemLoop !== item) {
                itemLoop.classList.remove('active');
            }
        });
    });
});

// =========================================================
// ANIMAÇÃO DO CONTADOR
// =========================================================
const totalDuration = 3000;

const animateCounter = (element) => {
    const finalValue = +element.getAttribute('data-target');
    let startTime;
    
    const animationStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / totalDuration, 1);
        const currentValue = Math.floor(progress * finalValue);
        
        element.innerText = currentValue.toLocaleString('pt-BR');
        
        if (progress < 1) {
            window.requestAnimationFrame(animationStep);
        } else {
            element.innerText = finalValue.toLocaleString('pt-BR'); // Garante valor exato
        }
    };
    
    window.requestAnimationFrame(animationStep);
};

// =========================================================
// INTERSECTION OBSERVER (Dispara animação ao entrar na tela)
// =========================================================
const handleObserver = (entries, observer) => {
    const entry = entries[0];
    
    if (entry.isIntersecting) {
        countervalueEl.forEach(counter => animateCounter(counter));
        observer.unobserve(entry.target); // Para de observar após executar
    }
};

const observerOptions = {
    root: null,
    threshold: 0.5
};

const observer = new IntersectionObserver(handleObserver, observerOptions);
observer.observe(statssection);





