// ========================
// CONTACT FORM VALIDATION
// ========================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add('error');
  if (error) error.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.remove('error');
  if (error) error.textContent = '';
}

// Clear errors on input
['name', 'email', 'subject', 'message'].forEach(id => {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('input', () => clearError(id, id + 'Error'));
  }
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let hasError = false;

    // Clear all errors first
    ['name', 'email', 'subject', 'message'].forEach(id => clearError(id, id + 'Error'));

    if (!name) {
      showError('name', 'nameError', 'Please enter your name.');
      hasError = true;
    } else if (name.length < 2) {
      showError('name', 'nameError', 'Name must be at least 2 characters.');
      hasError = true;
    }

    if (!email) {
      showError('email', 'emailError', 'Please enter your email address.');
      hasError = true;
    } else if (!validateEmail(email)) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      hasError = true;
    }

    if (!subject) {
      showError('subject', 'subjectError', 'Please enter a subject.');
      hasError = true;
    }

    if (!message) {
      showError('message', 'messageError', 'Please write a message.');
      hasError = true;
    } else if (message.length < 10) {
      showError('message', 'messageError', 'Message must be at least 10 characters.');
      hasError = true;
    }

    if (hasError) return;

    // Simulate submission
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;
      formSuccess.style.display = 'block';

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}
