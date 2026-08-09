document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));

    // Validate Name
    const nameInput = document.getElementById('full-name');
    if (!nameInput.value.trim()) {
      showError(nameInput, 'name-error', 'Please enter your full name.');
      isValid = false;
    }

    // Validate Email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate Radio Choice
    const reasonChecked = document.querySelector('input[name="reason"]:checked');
    if (!reasonChecked) {
      document.getElementById('reason-error').textContent = 'Please select a reason for inquiry.';
      isValid = false;
    }

    // Validate Message
    const msgInput = document.getElementById('message');
    if (!msgInput.value.trim()) {
      showError(msgInput, 'message-error', 'Please enter a message.');
      isValid = false;
    }

    if (isValid) {
      alert('Thank you! Your message has been sent successfully.'); // Standard submit confirmation
      form.reset();
    }
  });

  function showError(inputEl, errorId, message) {
    inputEl.setAttribute('aria-invalid', 'true');
    document.getElementById(errorId).textContent = message;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('a11y-toggle-btn');
  const menu = document.getElementById('a11y-menu');
  const textSizeBtn = document.getElementById('toggle-text-size');
  const contrastBtn = document.getElementById('toggle-high-contrast');

  if (toggleBtn && menu) {
    // Open/Close Dropdown Menu
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      menu.hidden = isExpanded;
    });

    // Toggle Large Text
    textSizeBtn.addEventListener('click', () => {
      document.body.classList.toggle('large-text');
    });

    // Toggle High Contrast Mode
    contrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.hidden = true;
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});