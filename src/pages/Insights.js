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
              <div class="blog-card" data-article="article2026">
                <div class="blog-card-image">
                  <div class="blog-date-badge">Feb 2026</div>
                </div>
                <div class="blog-card-content">
                  <span class="blog-category">Trends</span>
                  <h3>Digital Marketing in 2026: The Age of AI & Authenticity</h3>
                  <p>From Generative Engine Optimization (GEO) to the return of human-centric content. Here is what you need to know to stay ahead.</p>
                  <span class="read-more">Read Article &rarr;</span>
                </div>
              </div>
              
              <!-- Placeholder for future articles -->
            </div>
          </div>
        </section>

        <!-- Article Modal -->
        <div id="article-modal" class="article-modal">
          <div class="article-modal-content">
            <button class="article-modal-close">&times;</button>
            <div id="article-modal-body" class="article-modal-body">
              <!-- Article content will be injected here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    const articleCards = document.querySelectorAll('.blog-card[data-article]');
    const modal = document.getElementById('article-modal');
    const modalBody = document.getElementById('article-modal-body');
    const closeBtn = document.querySelector('.article-modal-close');

    // Article content
    const articles = {
      article2026: `
                <article class="article-container">
                    <header class="article-header">
                        <span class="article-meta">February 15, 2026 • 5 min read • Trends</span>
                        <h1>Digital Marketing in 2026: The Age of AI & Authenticity</h1>
                        <p class="article-lead">The playbook has changed. Algorithms are smarter, consumers are skeptical, and "good enough" content no longer cuts it. Welcome to the era of Human-First Marketing.</p>
                    </header>

                    <div class="article-content">
                        <p>If 2024 was the year AI exploded, and 2025 was the year we learned to tame it, 2026 is the year we define our relationship with it. The digital landscape has shifted beneath our feet, and brands that refuse to adapt are vanishing into the noise. At Folgo Media, we've analyzed the data, tested the algorithms, and identified the four pillars that will define success this year.</p>

                        <h2>1. From SEO to GEO (Generative Engine Optimization)</h2>
                        <p>Search Engine Optimization is rapidly evolving into <strong>Generative Engine Optimization (GEO)</strong>. With Google's AI Overviews and ChatGPT Search becoming primary discovery tools, the goal is no longer just ranking for "10 blue links"—it's about becoming the trusted source that AI summarizes.</p>
                        <div class="highlight-box">
                            <h3>The Strategy Shift</h3>
                            <p>To win at GEO, content must be structured for direct answers. AI models prioritize authority, clarity, and citation-worthy facts. Focus on:</p>
                            <ul>
                                <li><strong>Direct Answers:</strong> Answer the user's question in the first 50 words.</li>
                                <li><strong>Citations & Data:</strong> Use original research and expert quotes that AI can reference.</li>
                                <li><strong>Brand Voice:</strong> While AI summarizes facts, it cannot replicate a distinct, human perspective.</li>
                            </ul>
                        </div>

                        <h2>2. Hyper-Personalization: The AI Companion</h2>
                        <p>Mass marketing is officially obsolete. Consumers in 2026 have AI shopping companions that filter out generic noise. Your brand isn't just speaking to a customer; you're speaking to their AI agent.</p>
                        <p><strong>The New Expectation:</strong> Context-aware experiences. If a customer has bought from you before, your site should know their preferences immediately. Static homepages are being replaced by dynamic, personalized feeds that adapt in real-time.</p>

                        <h2>3. The "Human" Premium & Authenticity</h2>
                        <p>In a world flooded with AI-generated content, <strong>human authenticity has become a luxury good</strong>. Unpolished, behind-the-scenes, and raw content is vastly outperforming high-production studio gloss because it signals <em>reality</em>.</p>
                        <p>Consumers are craving connection. Brands that leverage user-generated content (UGC), founder stories, and "build in public" narratives are building trust faster than those hiding behind corporate logos. Authenticity is no longer a buzzword; it's the only metric that matters.</p>

                        <h2>4. The Evolution of Short-Form Video</h2>
                        <p>TikTok, Reels, and YouTube Shorts have matured from entertainment platforms into powerful <strong>visual search engines</strong>. Gen Z and Alpha use these platforms to discover products, read reviews, and find tutorials before they ever open Google.</p>
                        <p>Your video strategy must be <strong>searchable</strong>. This means:</p>
                        <ul>
                            <li><strong>SEO-Driven Scripts:</strong> Using keywords naturally in your voiceover.</li>
                            <li><strong>Visual Hooks:</strong> Answering the query within the first 3 seconds.</li>
                            <li><strong>Contextual Captions:</strong> Helping algorithms understand exactly what your video solves.</li>
                        </ul>

                        <hr />

                        <h2>The Verdict for 2026</h2>
                        <p>Success this year isn't about choosing between AI and Human. It's about using AI to handle the scale and efficiency, so you can focus entirely on the Soul and Strategy.</p>
                        <p><strong>Ready to future-proof your brand?</strong> That's exactly, what we do.</p>
                        
                        <div class="article-cta">
                            <h3>Let's build your 2026 strategy.</h3>
                            <a href="/#estimator" class="cta-button" data-link>Get a Smart Quote</a>
                        </div>
                    </div>
                </article>
            `
    };

    // Open modal when card is clicked
    articleCards.forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-article');
        if (articles[articleId]) {
          modalBody.innerHTML = articles[articleId];
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
      });
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
}
