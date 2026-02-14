import { renderFloatingWidget } from '../components/QuoteEstimator.js';
import { renderLeadForm } from '../components/LeadForm.js';

export class HomePage {
  constructor() { }

  render() {
    return `
      <div class="page home-page">
        <!-- Floating Orbs Background -->
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>

        <!-- Hero Section -->
        <section class="hero-section">
          <div class="container">
            <h1 class="hero-title fade-up">
              We Build <br>
              <span class="highlight">Brand Assets</span>, <br>
              Not Just Content.
            </h1>
            <p class="hero-subtitle fade-up delay-100">
              Your brand deserves more than posts. We build empires.
            </p>
            <div class="hero-cta fade-up delay-200">
              <a href="/about" class="btn btn-primary" data-link>View Our Work</a>
              <a href="#contact" class="btn btn-outline">Get a Free Audit</a>
            </div>
          </div>
        </section>

        <!-- Trust Strip (Infinite Marquee) -->
        <section class="trust-section fade-up delay-100">
          <div class="marquee-container">
            <div class="marquee-content">
              <span>PERPEX</span> <span>•</span>
              <span>PLACEX</span> <span>•</span>
              <span>PERPEX BSCHOOL</span> <span>•</span>
              <span>FROOTREE</span> <span>•</span>
              <span>SULCA</span> <span>•</span>
              <span>NOTEAI</span> <span>•</span>
              <span>LADDER EDUCATION</span> <span>•</span>
              <span>AAAI FRESH</span> <span>•</span>
              <span>PERPEX</span> <span>•</span>
              <span>PLACEX</span> <span>•</span>
              <span>PERPEX BSCHOOL</span> <span>•</span>
              <span>FROOTREE</span> <span>•</span>
              <span>SULCA</span> <span>•</span>
              <span>NOTEAI</span> <span>•</span>
              <span>LADDER EDUCATION</span> <span>•</span>
              <span>AAAI FRESH</span> <span>•</span>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="stats-section">
          <div class="container stats-grid">
            <div class="stat-item fade-up">
              <div class="stat-number" data-target="8">0</div>
              <div class="stat-label">Brands Scaled</div>
            </div>
            <div class="stat-item fade-up delay-100">
              <div class="stat-number" data-target="1000">0</div>
              <div class="stat-label">Leads Generated</div>
            </div>
            <div class="stat-item fade-up delay-200">
              <div class="stat-number" data-target="200">0</div>
              <div class="stat-label">Avg. Growth %</div>
            </div>
          </div>
        </section>

        <!-- Services Section -->
        <section class="services-section">
          <div class="container">
            <h2 class="section-title fade-up">Our Architecture</h2>
            <div class="services-grid">
              <div class="service-card fade-up delay-100">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
                  </svg>
                </div>
                <h3>Brand Strategy</h3>
                <p>Positioning your institution to lead, not just compete.</p>
              </div>
              <div class="service-card fade-up delay-200">
                <div class="service-icon">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <h3>Performance Marketing</h3>
                <p>Data-driven campaigns that increase admissions and ROI.</p>
              </div>
              <div class="service-card fade-up delay-300">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                </div>
                <h3>Content Creation</h3>
                <p>Visual storytelling that builds trust and authority.</p>
              </div>
              <div class="service-card fade-up delay-100">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3>Community Growth</h3>
                <p>Building loyal communities around your educational brand.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Process Section (Interactive Drag-to-Connect) -->
        <section class="process-section" id="process-section">
          <div class="container">
            <h2 class="section-title fade-up">How We Work</h2>
            <p class="process-hint fade-up delay-100">Drag to connect the dots ✨</p>
            <div class="process-interactive" id="process-interactive">
              <svg class="process-svg" id="process-svg"></svg>
              <div class="process-node active" id="node-0" data-step="0">
                <div class="node-icon">🔍</div>
                <h3>Audit</h3>
                <p>We analyze your gap.</p>
                <div class="node-dot node-dot-out" id="dot-out-0" data-from="0"></div>
              </div>
              <div class="process-node locked" id="node-1" data-step="1">
                <div class="node-dot node-dot-in" id="dot-in-1" data-to="1"></div>
                <div class="node-icon">🧠</div>
                <h3>Strategy</h3>
                <p>We build the map.</p>
                <div class="node-dot node-dot-out" id="dot-out-1" data-from="1"></div>
              </div>
              <div class="process-node locked" id="node-2" data-step="2">
                <div class="node-dot node-dot-in" id="dot-in-2" data-to="2"></div>
                <div class="node-icon">🚀</div>
                <h3>Execution</h3>
                <p>We create assets.</p>
                <div class="node-dot node-dot-out" id="dot-out-2" data-from="2"></div>
              </div>
              <div class="process-node locked" id="node-3" data-step="3">
                <div class="node-dot node-dot-in" id="dot-in-3" data-to="3"></div>
                <div class="node-icon">📈</div>
                <h3>Growth</h3>
                <p>You scale.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Community Teaser -->
        <section class="community-teaser">
          <div class="container teaser-content">
            <div class="teaser-text fade-up">
              <h2>Not an Agency.<br><span class="highlight">A Collective.</span></h2>
              <p>We bypass the traditional firm structure to provide direct access to top-tier talent.</p>
              <a href="/about" class="btn btn-primary" data-link>Read Our Story</a>
            </div>
            <div class="teaser-visual fade-up delay-200">
              <!-- Geometric placeholder -->
              <div class="circle-graphic"></div>
            </div>
          </div>
        </section>

        <!-- Lead Capture Form -->
        ${renderLeadForm()}

        <!-- Final CTA -->
        <section class="cta-section">
          <div class="container">
            <h2 class="cta-title fade-up">Stop Competing.<br>Start <span class="highlight">Leading.</span></h2>
            <a href="#contact" class="btn btn-secondary fade-up delay-100">Let's Talk Growth</a>
          </div>
        </section>
        <!-- Footer -->
        <footer class="site-footer fade-up delay-200" style="padding: 4rem 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
          <div class="container">
            <img src="/b&w.png" alt="Folgo" style="height: 30px; margin: 0 auto 1rem; opacity: 0.8;">
            <p style="opacity: 0.5; font-size: 0.9rem;">&copy; 2026 Folgo Media. All rights reserved.</p>
          </div>
        </footer>
        <!-- Floating Quote Widget -->
        ${renderFloatingWidget()}
      </div>
    `;
  }
}
