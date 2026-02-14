document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupBtn = document.getElementById('signup-btn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Blocked Domains
    const blockedDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com'];

    // Validation State
    let isValid = {
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    };

    function showError(element, message) {
        element.textContent = message;
        element.style.color = '#ff4d4d';
        element.style.display = 'block';
        element.style.fontSize = '0.75rem';
    }

    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // function checkFormValidity() {
    //     if (isValid.name && isValid.email && isValid.password && isValid.confirmPassword) {
    //         signupBtn.disabled = false;
    //         signupBtn.style.opacity = '1';
    //         signupBtn.style.cursor = 'pointer';
    //     } else {
    //         signupBtn.disabled = true;
    //         signupBtn.style.opacity = '0.6';
    //         signupBtn.style.cursor = 'not-allowed';
    //     }
    // }

//     function checkFormValidity() {
//         if (Object.values(isValid).every(value => value === true)) {
//             signupBtn.disabled = false;
//             signupBtn.style.opacity = '1';
//             signupBtn.style.cursor = 'pointer';
//         } else {
//             signupBtn.disabled = true;
//             signupBtn.style.opacity = '0.6';
//             signupBtn.style.cursor = 'not-allowed';
//         }
//     }

    function checkFormValidity() {
    const isAllValid = Object.values(isValid).every(value => value === true);

    signupBtn.disabled = isAllValid ? false : true;
    signupBtn.style.opacity = isAllValid ? '1' : '0.6';
    signupBtn.style.cursor = isAllValid ? 'pointer' : 'not-allowed';
}

// This is a more concise way to write the function. It uses the every() method to check if all the values in the isValid object are true by storing the result in a variable 'isAllValid'. If they are, it enables the submit button and changes its opacity and cursor. Otherwise, it disables the submit button and changes its opacity and cursor. Instead of writing seperate button styles for the enabled and disabled buttons we write it in a shorter form of ternary operators. Ternary operators are a shorter form of if else statements which we majorly use to return values after a condition is fulfilled 

    

    // Full Name Validation
    fullNameInput.addEventListener('input', () => {
        const value = fullNameInput.value.trim();
        const wordCount = value.split(/\s+/).filter(word => word.length > 0).length;
        const hasNumber = /\d/.test(value);

        if (value.length < 3) {
            showError(nameError, 'Name must be at least 3 characters long.');
            isValid.name = false;
        } else if (wordCount < 2) {
            showError(nameError, 'Please enter your first and last name.');
            isValid.name = false;
        } else if (hasNumber) {
            showError(nameError, 'Name cannot contain numbers.');
            isValid.name = false;
        } else {
            clearError(nameError);
            isValid.name = true;
        }
        checkFormValidity();
    });

    // Email Validation
    emailInput.addEventListener('input', () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = value.split('@')[1];

        if (!emailRegex.test(value)) {
            showError(emailError, 'Please enter a valid email address.');
            isValid.email = false;
        } else if (blockedDomains.includes(domain)) {
            showError(emailError, 'This email provider is not allowed.');
            isValid.email = false;
        } else {
            clearError(emailError);
            isValid.email = true;
        }
        checkFormValidity();
    });

    // Password Validation
    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        const minLength = value.length >= 8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (!minLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
            let errorMsg = 'Password must have: ';
            let missing = [];
            if (!minLength) missing.push('8+ characters');
            if (!hasUpper) missing.push('1 uppercase');
            if (!hasLower) missing.push('1 lowercase');
            if (!hasNumber) missing.push('1 number');
            if (!hasSpecial) missing.push('1 special character');

            showError(passwordError, errorMsg + missing.join(', '));
            isValid.password = false;
        } else {
            clearError(passwordError);
            isValid.password = true;
        }

        // Re-check confirm password when password changes
        if (confirmPasswordInput.value) {
            const confirmValue = confirmPasswordInput.value;
            if (confirmValue !== value) {
                showError(confirmPasswordError, 'Passwords do not match.');
                isValid.confirmPassword = false;
            } else {
                clearError(confirmPasswordError);
                isValid.confirmPassword = true;
            }
        }

        checkFormValidity();
    });

    // Confirm Password Validation
    confirmPasswordInput.addEventListener('input', () => {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;

        if (value !== passwordValue) {
            showError(confirmPasswordError, 'Passwords do not match.');
            isValid.confirmPassword = false;
        } else {
            clearError(confirmPasswordError);
            isValid.confirmPassword = true;
        }
        checkFormValidity();
    });

    // Success Modal Logic
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    signupBtn.addEventListener('click', (e) => {
        if (!signupBtn.disabled) {
            e.preventDefault(); // Prevent form submission
            successModal.classList.add('show');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('show');
        // Optional: Reset form or redirect
        // window.location.href = 'dashboard.html'; 
    });

    // Close modal if clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
    });

});
