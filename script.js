document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    const radioInputs = form.querySelectorAll('input[type="radio"]');
    const checkbox = document.getElementById('consent');

    // Show error message and add error class
    function showError(element, show = true) {
        const errorMessage = element.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.classList.toggle('visible', show);
        }
        element.classList.toggle('error', show);
    }

    // Validate individual input
    function validateInput(input) {
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            showError(input, !emailRegex.test(input.value));
        } else {
            showError(input, !input.value.trim());
        }
    }

    // Validate radio buttons
    function validateRadioGroup() {
        const radioGroup = document.querySelector('.radio-group');
        const checked = form.querySelector('input[name="queryType"]:checked');
        const errorMessage = radioGroup.parentElement.querySelector('.error-message');
        errorMessage.classList.toggle('visible', !checked);
    }

    // Add blur event listeners to inputs
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => validateInput(input));
    });

    // Add change event listener to radio buttons
    radioInputs.forEach(radio => {
        radio.addEventListener('change', validateRadioGroup);
    });

    // Add change event listener to checkbox
    checkbox.addEventListener('change', function() {
        showError(this, !this.checked);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        inputs.forEach(input => {
            validateInput(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });

        // Validate radio buttons
        validateRadioGroup();
        if (!form.querySelector('input[name="queryType"]:checked')) {
            isValid = false;
        }

        // Validate checkbox
        if (!checkbox.checked) {
            showError(checkbox, true);
            isValid = false;
        }

        if (isValid) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
            alert('Form submitted successfully!');
            form.reset();
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.classList.remove('visible');
            });
            document.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error');
            });
        }
    });
});