const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPass');

// Showing input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputs){
    inputs.forEach(input => {
        
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} is too short. Must be at least 3 characters.`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} is too long. Must be maximum 25 characters.`)
    }
}

function confirmPassword (pass, confPass) {
    if (pass.value === confPass.value) {
        showSuccess(confPass)
    } else {
        showError(confPass, 'Password does not match.')
        showError(pass, 'Password does not match.')
    }
}

// Adding an eventListener onSubmit 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkRequired([username, email, password, confirmPass]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    confirmPassword(password, confirmPass)
}) 