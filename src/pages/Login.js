
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
              <input type="email" id="email" placeholder="Admin Email" required>
            </div>
            <div class="form-group">
              <input type="password" id="password" placeholder="Password" required>
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
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const btn = document.getElementById('login-btn');
                const errorMsg = document.getElementById('login-error');

                btn.disabled = true;
                btn.innerHTML = '<span>Verifying...</span>';
                errorMsg.textContent = '';

                // Import dynamically to avoid circular dependencies if any
                const { loginUser } = await import('../firebase.js');
                const response = await loginUser(email, password);

                if (response.success) {
                    window.location.hash = '/admin'; // Router will handle the change
                } else {
                    btn.disabled = false;
                    btn.innerHTML = '<span>Access Dashboard</span>';
                    errorMsg.textContent = 'Access Denied: ' + response.error;
                }
            });
        }
    }
}
