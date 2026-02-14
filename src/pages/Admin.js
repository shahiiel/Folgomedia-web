
export class AdminPage {
    constructor() { }

    render() {
        return `
      <div class="page admin-page">
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
    `;
    }

    async afterRender() {
        // 1. Check Auth & Import
        const { auth, onAuthStateChanged, fetchLeads } = await import('../firebase.js');
        const { signOut } = await import('firebase/auth');

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.hash = '/login';
                return;
            }

            // User is logged in, load data
            this.loadData(fetchLeads);
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await signOut(auth);
                window.location.hash = '/login';
            });
        }

        // Save unsubscribe to clear listener if needed (SPA navigation usually clears page instance though)
    }

    async loadData(fetchLeads) {
        const response = await fetchLeads();
        const tbody = document.getElementById('leads-body');
        const countEl = document.getElementById('total-leads');

        if (!response.success) {
            tbody.innerHTML = `<tr><td colspan="6" class="error-text">Error: ${response.error}</td></tr>`;
            countEl.textContent = '-';
            return;
        }

        const leads = response.data;
        countEl.textContent = leads.length;

        if (leads.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No leads found.</td></tr>`;
            return;
        }

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

    escape(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    truncate(str, n) {
        if (!str) return '';
        return str.length > n ? str.substr(0, n - 1) + '...' : str;
    }
}
