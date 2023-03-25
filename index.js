const showFormBtn = document.getElementById('showFormBtn');

showFormBtn.addEventListener('click', e => {
    profileCard.style.display = 'none';
    formCard.style.display = 'block';
})

const contactForm = document.getElementById('contactForm');
const contactName = document.querySelector('input[id=name]');
const contactEmail = document.querySelector('input[id=email]');
const contactMsg = document.querySelector('textarea[id=msg]');
const successColor = 'text-green-600';
const errorColor = 'text-red-600';

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();
})

contactForm.addEventListener('reset', e => {
    profileCard.style.display = 'block';
    formCard.style.display = 'none';
    resetClasses();
})

function validateForm() {
    
    const contactNameValue = contactName.value.trim();
    const contactEmailValue = contactEmail.value.trim();
    const contactMsgValue = contactMsg.value.trim();

    if(!contactNameValue) {
        validateFail(contactName, 'Campo vacío');
    } else {
        validateOk(contactName);
    }

    if(!contactEmailValue) {
        validateFail(contactEmail, 'Campo vacío');
    } else if(!validateEmail(contactEmailValue)) {    
        validateFail(contactEmail, 'No es un e-mail válido');
    } else {
        validateOk(contactEmail);
    }

    if(!contactMsgValue) {
        validateFail(contactMsg, 'Campo vacío');
    } else {
        validateOk(contactMsg);
    }

    function validateEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);        
    }

    function validateOk(input) {
        const label = input.previousElementSibling;
        label.classList.add(successColor);
        input.nextElementSibling.classList.replace('block', 'hidden');
    }

    function validateFail(input, str) {
        const label = input.previousElementSibling;
        const p = input.nextElementSibling;
        if(label.classList.contains(successColor)) label.classList.remove(successColor);
        p.innerText = str;
        p.classList.remove('hidden')
        p.classList.add('block', errorColor)
    }

    if(contactNameValue && validateEmail(contactEmailValue) && contactMsgValue) {
        modal.classList.remove('hidden');
    }
}

const modal = document.getElementById('msgSentModal');
const closeModalbtn = modal.querySelector('#closeModalBtn');

closeModalbtn.addEventListener('click', e => {
    modal.classList.add('hidden');
    contactForm.reset();
})

function resetClasses() {
    const labels = document.querySelectorAll('#contactForm > div > label')

    labels.forEach(label => {
        label.classList.remove(successColor || errorColor)
    })

    const errorMsgs = document.querySelectorAll('#contactForm > div > p')

    errorMsgs.forEach(p => {
        p.classList.replace('block', 'hidden')
    })
}