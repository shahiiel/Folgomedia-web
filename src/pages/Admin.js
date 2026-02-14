export class AdminPage {
  constructor() { }

  render() {
    return `
      <div class="page admin-page display-flex-center" style="font-family: var(--font-main); color: var(--color-text-white);">
        <div id="admin-loader" class="loader" style="text-align: center; margin-top: 20vh;">
          <div style="font-size: 1.5rem; margin-bottom: 1rem;">🔐</div>
          <p style="font-size: 1.2rem; letter-spacing: 1px;">Verifying Secure Access...</p>
          <div class="spinner" style="width: 30px; height: 30px; border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid var(--color-secondary-yellow); border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
          <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 2rem;">
            Taking too long? <a href="/login" class="link" style="color: var(--color-secondary-yellow); text-decoration: underline; cursor: pointer;">Click here to Login</a>
          </p>
        </div>
        <div id="admin-content" style="display: none; width: 100%;">
          <div class="container">
            <header class="admin-header fade-up">
              <h1>Admin Dashboard</h1>
              <button id="logout-btn" class="btn btn-outline btn-sm">Logout</button>
            </header>

            <div class="admin-stats fade-up delay-100">
              <div class="stat-card">
                <h3>Total Leads</h3>
                <p id="total-leads">Loading...</p>
              </div>
            </div>

            <div class="leads-section fade-up delay-200">
              <h2>Recent Submissions</h2>
              <div class="table-responsive">
                <table class="leads-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody id="leads-body">
                    <tr><td colspan="6" style="text-align:center;">Loading data...</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    try {
      console.log('[Admin] Starting auth check...');
      const loader = document.getElementById('admin-loader');
      const content = document.getElementById('admin-content');

      // Timeout fallback
      const authTimeout = setTimeout(() => {
        console.warn('[Admin] Auth check timed out after 6 seconds');
        if (loader && loader.style.display !== 'none') {
          loader.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 1rem;">⚠️</div>
            <p style="color: var(--color-secondary-yellow);">Connection Timeout</p>
            <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.8;">Unable to verify authentication.</p>
            <a href="/login" class="btn btn-primary" style="margin-top:1.5rem">Go to Login</a>
          `;
        }
      }, 6000);

      // Dynamic import to avoid build issues
      const { auth, onAuth StateChanged, fetchLeads } = await import('../firebase.js');
      const { signOut } = await import('firebase/auth');

      onAuthStateChanged(auth, async (user) => {
        clearTimeout(authTimeout);
        console.log('[Admin] Auth state changed, user:', user ? user.email : 'null');

        if (!user) {
          console.log('[Admin] No user found, redirecting to login');
          // Use full reload to reset state
          window.location.href = '/login';
          return;
        }

        console.log('[Admin] User authenticated, showing dashboard');
        // User is logged in
        if (loader) loader.style.display = 'none';
        if (content) content.style.display = 'block';

        // Load dashboard data
        this.loadData(fetchLeads);
      }, (error) => {
        // Auth error handler
        clearTimeout(authTimeout);
        console.error('[Admin] Auth error:', error);
        if (loader) {
          loader.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 1rem;">❌</div>
            <p style="color: #ff6b6b; font-size: 1.1rem;">Authentication Error</p>
            <p style="font-size: 0.85rem; opacity: 0.8; margin: 1rem 0; max-width: 400px;">${error.message}</p>
            <a href="/login" class="btn btn-primary" style="margin-top:1rem">Go to Login</a>
          `;
        }
      });

      // Logout button
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
          console.log('[Admin] Logging out');
          await signOut(auth);
          window.location.href = '/login';
        });
      }
    } catch (err) {
      console.error('[Admin] Critical error:', err);
      const loader = document.getElementById('admin-loader');
      if (loader) {
        loader.innerHTML = `
          <div style="font-size: 1.5rem; margin-bottom: 1rem;">💥</div>
          <p style="color: #ff6b6b; font-size: 1.1rem;">System Error</p>
          <p style="font-size: 0.85rem; opacity: 0.8; margin: 1rem 0;">${err.message}</p>
          <a href="/login" class="btn btn-primary" style="margin-top:1rem">Go to Login</a>
        `;
      }
    }
  }

  async loadData(fetchLeads) {
    const response = await fetchLeads();
    const tbody = document.getElementById('leads-body');
    const countEl = document.getElementById('total-leads');

    if (!response.success) {
      if (tbody) tbody.innerHTML = `<tr><td colspan="6" class="error-text">Error: ${response.error}</td></tr>`;
      if (countEl) countEl.textContent = '-';
      return;
    }

    const leads = response.data;
    if (countEl) countEl.textContent = leads.length;

    if (leads.length === 0) {
      if (tbody) tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No leads found.</td></tr>`;
      return;
    }

    if (tbody) {
      tbody.innerHTML = leads.map(lead => `
        <tr>
          <td>${lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
          <td class="font-bold">${this.escape(lead.name)}</td>
          <td><a href="mailto:${this.escape(lead.email)}" class="link">${this.escape(lead.email)}</a></td>
          <td>${this.escape(lead.phone)}</td>
          <td><span class="badge ${lead.type === 'estimate' ? 'badge-blue' : 'badge-green'}">${lead.type || 'lead'}</span></td>
          <td class="message-cell" title="${this.escape(lead.message)}">${this.truncate(lead.message, 50)}</td>
        </tr>
      `).join('');
    }
  }

  escape(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  truncate(str, n) {
    if (!str) return '';
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }
}
