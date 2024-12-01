const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const form = document.getElementById('contactForm');
const thankYouPopup = document.getElementById('thankYouPopup');
const closePopup = document.getElementById('closePopup');

// Toggle the menu visibility
menuButton.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
});

// Validation function for individual fields
function validateField(field, pattern, errorMessage) {
    field.setCustomValidity(''); // Reset custom validity
    if (!pattern.test(field.value.trim())) {
        field.setCustomValidity(errorMessage);
        return false;
    }
    return true;
}

// Set up real-time validation for fields
function setupRealTimeValidation() {
    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    name.addEventListener('input', () => {
        validateField(name, /^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces.');
    });

    phone.addEventListener('input', () => {
        validateField(phone, /^\d+$/, 'Phone number must contain only numbers.');
    });

    email.addEventListener('input', () => {
        validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.');
    });

    message.addEventListener('input', () => {
        message.setCustomValidity(''); // Reset custom validity
        if (message.value.trim() === '') {
            message.setCustomValidity('Message field cannot be empty.');
        }
    });
}

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    let isValid = true; // Reset isValid for every submission

    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    // Validate fields on submission
    if (!validateField(name, /^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces.')) {
        isValid = false;
    }
    if (!validateField(phone, /^\d+$/, 'Phone number must contain only numbers.')) {
        isValid = false;
    }
    if (!validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.')) {
        isValid = false;
    }
    if (message.value.trim() === '') {
        message.setCustomValidity('Message field cannot be empty.');
        isValid = false;
    }

    // Trigger error messages if invalid
    if (!isValid) {
        form.reportValidity();
        return;
    }

    // Display Thank You popup if form is valid
    thankYouPopup.style.display = 'flex';

    // Reset form after successful submission
    form.reset();
});

// Close the popup when clicking the close button
closePopup.addEventListener('click', () => {
    thankYouPopup.style.display = 'none';
});

// Initialize real-time validation
setupRealTimeValidation();
