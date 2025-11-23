// =========================================================
// ELEMENTOS DO DOM
// =========================================================
const menuHamburgerBtnEl = document.querySelector('#menu-hamburger-btn');
const navlistEl = document.querySelector('.nav-list');
const accordionQuestionEl = document.querySelectorAll('.accordion-question');
const accordionitemEl = document.querySelectorAll('.accordion-item');
const countervalueEl = document.querySelectorAll('.counter-value');
const statssection = document.querySelector('#stats-section');
const contactformEl = document.querySelector('#contact-form');
const emailinputEl = document.querySelector('#email-input');
const messageinputEl = document.querySelector('#message-input');
const formFeedbackEl = document.querySelector('#form-feedback');


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


// =========================================================
// VALIDAÇÃO DE FORMULÁRIO
// =========================================================

// Remove mensagens de erro e classes visuais
const clearErrors = () => {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    formFeedbackEl.textContent = '';
}

// Exibe mensagem de erro abaixo do campo
const displayError = (inputElement, message) => {
    inputElement.classList.add('input-error');

    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    inputElement.parentElement.insertBefore(errorMessage, inputElement.nextSibling);
};

// Valida formato de email usando regex
const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
};

// Simula envio do formulário com feedback visual
const simulateSubmission = () => {
    formFeedbackEl.textContent = 'Enviando mensagem...';
    formFeedbackEl.classList.add('sending');
    contactformEl.querySelector('button').disabled = true;

    setTimeout(() => {
        contactformEl.reset();
        
        formFeedbackEl.textContent = 'Mensagem enviada com sucesso! Retornaremos em breve.';
        formFeedbackEl.classList.remove('sending');
        formFeedbackEl.classList.add('success');
        contactformEl.querySelector('button').disabled = false;

        setTimeout(() => {
            formFeedbackEl.textContent = '';
            formFeedbackEl.classList.remove('success');
        }, 5000);

    }, 1500);
};

// Valida todos os campos antes de enviar
const validateForm = (event) => {
    event.preventDefault();
    
    let isValid = true;
    clearErrors();

    const email = emailinputEl.value.trim();
    if (email === '') {
        displayError(emailinputEl, 'O campo E-mail é obrigatório.');
        isValid = false;
    } else if (!validateEmailFormat(email)) {
        displayError(emailinputEl, 'Por favor, insira um e-mail válido.');
        isValid = false;
    }

    if (messageinputEl.value.trim().length < 15) {
        displayError(messageinputEl, 'A mensagem deve ter no mínimo 15 caracteres.');
        isValid = false;
    }

    if (isValid) {
        simulateSubmission();
    }
};

contactformEl.addEventListener('submit', validateForm);






