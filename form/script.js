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
// Method that selects success class on each div
// only if there is some input value
showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Cpoy-pase some reg-ex code for checkinh if email form is valid
// from Stackoverflow
isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Additional function that Capitalize only first letter in the word
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Function that checks if the input field is required
// Response according to if else conditions
function checkRequired(inputs){
    // Since we have multiple input fields it is easier if we take
    // array as an input. Then, just loop over it and check requirements
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}


// Function that checks if min and max values of input fields
// are satisifed
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} is too short. Must be at least 3 characters.`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} is too long. Must be maximum 25 characters.`)
    }
}

// Function thta checks if password and confirmPassword fields match
// each other
function confirmPassword (pass, confPass) {
    if (pass.value === confPass.value) {
        showSuccess(confPass)
    } else {
        showError(confPass, 'Password does not match.')
        showError(pass, 'Password does not match.')
    }
}

// Adding an eventListener onSubmit and handling all prewirtten functions
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkRequired([username, email, password, confirmPass]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    confirmPassword(password, confirmPass)
}) 