export class InsightsPage {
    constructor() { }

    render() {
        return `
      <div class="page-container fade-in">
        <section class="hero-section small-hero">
          <div class="container">
            <h1 class="hero-title">Insights</h1>
            <p class="hero-subtitle">Trends, strategies, and the future of digital marketing.</p>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <div class="blog-grid">
              <!-- Article Card 1 -->
              <a href="/insights/digital-marketing-2026" class="blog-card" data-link>
                <div class="blog-card-image">
                  <div class="blog-date-badge">Feb 2026</div>
                </div>
                <div class="blog-card-content">
                  <span class="blog-category">Trends</span>
                  <h3>Digital Marketing in 2026: The Age of AI & Authenticity</h3>
                  <p>From Generative Engine Optimization (GEO) to the return of human-centric content. Here is what you need to know to stay ahead.</p>
                  <span class="read-more">Read Article &rarr;</span>
                </div>
              </a>
              
              <!-- Placeholder for future articles -->
            </div>
          </div>
        </section>
      </div>
    `;
    }
}
