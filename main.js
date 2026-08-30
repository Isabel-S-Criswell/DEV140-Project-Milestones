// FORM VALIDATION
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const msgInput = document.getElementById('message');
  const radioInputs = document.querySelectorAll('input[name="reason"]');

  // Real-time error clearing as user types or changes input
  const clearFieldError = (inputEl, errorId) => {
    if (inputEl) {
      inputEl.removeAttribute('aria-invalid');
    }
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  if (nameInput) {
    nameInput.addEventListener('input', () => clearFieldError(nameInput, 'name-error'));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearFieldError(emailInput, 'email-error'));
  }
  if (msgInput) {
    msgInput.addEventListener('input', () => clearFieldError(msgInput, 'message-error'));
  }
  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => clearFieldError(null, 'reason-error'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));

    // Validate Name
    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) showError(nameInput, 'name-error', 'Please enter your full name.');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
      if (emailInput) showError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate Radio Choice
    const reasonChecked = document.querySelector('input[name="reason"]:checked');
    if (!reasonChecked) {
      const reasonError = document.getElementById('reason-error');
      if (reasonError) reasonError.textContent = 'Please select a reason for inquiry.';
      isValid = false;
    }

    // Validate Message
    if (!msgInput || !msgInput.value.trim()) {
      if (msgInput) showError(msgInput, 'message-error', 'Please enter a message.');
      isValid = false;
    }

    if (isValid) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    }
  });

  function showError(inputEl, errorId, message) {
    inputEl.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }
});

// ACCESSIBILITY DOM INTERACTION MENU
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
    if (textSizeBtn) {
      textSizeBtn.addEventListener('click', () => {
        document.body.classList.toggle('large-text');
      });
    }

    // Toggle High Contrast Mode
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.hidden = true;
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// API FETCH (BONUS REQUIREMENT)
document.addEventListener('DOMContentLoaded', () => {
  const githubStatsContainer = document.getElementById('github-stats');

  if (githubStatsContainer) {
    const username = 'Isabel-S-Criswell';

    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        githubStatsContainer.innerHTML = `
          <p class="github-api-info">
            <strong>GitHub Activity:</strong> ${data.public_repos} Public Repositories | ${data.followers} Followers
          </p>
        `;
      })
      .catch(error => {
        console.error('Error loading GitHub stats:', error);
        githubStatsContainer.innerHTML = `<p class="github-api-error">Unable to load live GitHub statistics.</p>`;
      });
  }
});
