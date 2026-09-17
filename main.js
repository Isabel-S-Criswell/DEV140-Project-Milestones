document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. API FETCH (GitHub Live Data)
  // ==========================================
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
        // Output as raw text inside the <p> instead of nesting a new paragraph
        githubStatsContainer.innerHTML = `
            <strong>GitHub Activity:</strong> ${data.public_repos} Public Repositories | ${data.followers} Followers
        `;
      })
      .catch(error => {
        console.error('Error loading GitHub stats:', error);
        githubStatsContainer.innerHTML = `Unable to load live GitHub statistics.`;
      });
  }

  // ==========================================
  // 2. DOM INTERACTION (Accessibility Menu)
  // ==========================================
  const toggleBtn = document.getElementById('a11y-toggle-btn');
  const menu = document.getElementById('a11y-menu');
  const textSizeBtn = document.getElementById('toggle-text-size');
  const contrastBtn = document.getElementById('toggle-high-contrast');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      menu.hidden = isExpanded;
    });

    if (textSizeBtn) {
      textSizeBtn.addEventListener('click', () => {
        document.body.classList.toggle('large-text');
      });
    }

    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
      });
    }

    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.hidden = true;
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 3. FORM VALIDATION
  // ==========================================
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const msgInput = document.getElementById('message');
  const radioInputs = document.querySelectorAll('input[name="reason"]');

  const showError = (inputEl, errorId, message) => {
    if (inputEl) {
      inputEl.setAttribute('aria-invalid', 'true');
    }
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  const clearFieldError = (inputEl, errorId) => {
    if (inputEl) {
      inputEl.removeAttribute('aria-invalid');
    }
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  if (nameInput) nameInput.addEventListener('input', () => clearFieldError(nameInput, 'name-error'));
  if (emailInput) emailInput.addEventListener('input', () => clearFieldError(emailInput, 'email-error'));
  if (msgInput) msgInput.addEventListener('input', () => clearFieldError(msgInput, 'message-error'));
  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => clearFieldError(null, 'reason-error'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let isValid = true;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));

    if (!nameInput || !nameInput.value.trim()) {
      showError(nameInput, 'name-error', 'Please enter your full name.');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    }

    const reasonChecked = document.querySelector('input[name="reason"]:checked');
    if (!reasonChecked) {
      const reasonError = document.getElementById('reason-error');
      if (reasonError) reasonError.textContent = 'Please select a reason for inquiry.';
      isValid = false;
    }

    if (!msgInput || !msgInput.value.trim()) {
      showError(msgInput, 'message-error', 'Please enter a message.');
      isValid = false;
    }

    if (isValid) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset(); 
    }
  });

});
