export class LoginPage {
  constructor() { }

  render() {
    return `
      <div class="page login-page">
        <div class="login-container fade-up">
          <div class="login-header">
            <img src="/b&w.png" alt="Folgo Admin" class="login-logo">
            <h1>Admin Login</h1>
            <p>Secure Access Area</p>
          </div>
          
          <form id="login-form" class="login-form">
            <div class="form-group">
              <input type="email" id="login-email" placeholder="Admin Email" required>
            </div>
            <div class="form-group">
              <input type="password" id="login-password" placeholder="Password" required>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block" id="login-btn">
              <span>Access Dashboard</span>
            </button>
            <p id="login-error" class="error-message"></p>
          </form>
        </div>
      </div>
    `;
  }

  afterRender() {
    const form = document.getElementById('login-form');
    if (form) {
      const btn = document.getElementById('login-btn');
      const errorMsg = document.getElementById('login-error');

      // Prevent default form submission
      form.addEventListener('submit', (e) => e.preventDefault());

      btn.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
          errorMsg.textContent = 'Please enter both email and password';
          return;
        }

        console.log('[Login] Attempting login for:', email);
        btn.disabled = true;
        btn.innerHTML = '<div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; display: inline-block; animation: spin 0.6s linear infinite;"></div>';
        errorMsg.textContent = '';

        // Dynamic import
        const { loginUser } = await import('../firebase.js');
        const response = await loginUser(email, password);
        console.log('[Login] Login response:', response.success ? 'Success' : 'Failed');

        if (response.success) {
          console.log('[Login] Login successful, waiting for auth sync...');
          btn.innerHTML = '<span>Success! Redirecting...</span>';

          // Wait a moment for Firebase to sync auth state
          setTimeout(() => {
            console.log('[Login] Navigating to admin page');
            // Use full page reload to ensure auth state is loaded
            window.location.href = '/admin';
          }, 500);
        } else {
          console.error('[Login] Login error:', response.error);
          btn.disabled = false;
          btn.innerHTML = '<span>Access Dashboard</span>';
          errorMsg.textContent = 'Access Denied: ' + response.error;
        }
      });
    }
  }
}
