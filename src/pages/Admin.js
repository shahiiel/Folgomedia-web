
export class AdminPage {
  constructor() { }

  render() {
    return `
      <div class="page admin-page display-flex-center">
        <div id="admin-loader" class="loader">
          <p>Verifying Secure Access...</p>
          <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 1rem;">
            Stuck? <a href="/login" class="link" style="color: white; text-decoration: underline;">Click here to Login</a>
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
      const loader = document.getElementById('admin-loader');
      const content = document.getElementById('admin-content');
      const errorMsg = document.createElement('p');
      errorMsg.style.color = 'red';
      errorMsg.style.marginTop = '10px';

      if (loader) loader.appendChild(errorMsg);

      // Timeout fallback: Force redirect if Auth takes too long
      const authTimeout = setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
          console.warn('Auth check timed out, redirecting to login...');
          window.location.href = '/login';
        }
      }, 4000);

      // 1. Check Auth & Import
      const { auth, onAuthStateChanged, fetchLeads } = await import('../firebase.js');
      const { signOut } = await import('firebase/auth');

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        clearTimeout(authTimeout); // Auth responded, clear timeout

        if (!user) {
          window.location.href = '/login';
          return;
        }

        // User is logged in: Show Content, Hide Loader
        if (loader) loader.style.display = 'none';
        if (content) content.style.display = 'block';

        // Load Data
        this.loadData(fetchLeads);
      }, (error) => {
        // Auth Error Handler
        clearTimeout(authTimeout);
        console.error("Auth Error:", error);
        if (loader) {
          loader.innerHTML = `<p style="color:red">Auth Error: ${error.message}</p>
            <a href="/login" class="btn btn-primary" style="margin-top:1rem">Go to Login</a>`;
        }
      });

      // Logout logic
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
          await signOut(auth);
          window.location.href = '/login';
        });
      }
    } catch (err) {
      console.error("Admin Page Error:", err);
      const loader = document.getElementById('admin-loader');
      if (loader) {
        loader.innerHTML = `<p style="color:red">System Error: ${err.message}</p>
          <a href="/login" class="btn btn-primary" style="margin-top:1rem">Go to Login</a>`;
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
