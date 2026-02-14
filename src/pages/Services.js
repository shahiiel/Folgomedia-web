import { renderEstimatorSection } from '../components/QuoteEstimator.js';

export class ServicesPage {
  constructor() { }

  render() {
    return `
      <div class="page services-page">
        <!-- Floating Orbs Background -->
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>

        <!-- Hero Section -->
        <section class="services-hero">
          <div class="container">
            <p class="hero-tag fade-up">WHAT WE DO</p>
            <h1 class="hero-title fade-up delay-100">Tailored Strategies. <br><span class="highlight">Universal Growth.</span></h1>
            <p class="hero-subtitle fade-up delay-200">From Tuition Centres to Construction Firms, we craft digital experiences that drive real business results.</p>
          </div>
        </section>

        <!-- Kickstarter Package -->
        <section class="kickstarter-section">
          <div class="container">
            <h2 class="section-title fade-up">The Folgo Kickstarter</h2>
            <div class="pricing-card fade-up delay-100">
              <div class="card-header">
                <h3>Starter Package</h3>
                <div class="price">₹29,879</div>
                <p>Perfect for Startups & New Brands</p>
              </div>
              <div class="card-body">
                <ul>
                  <li>✅ Complete Account Setup</li>
                  <li>✅ 8 High-Quality Reels</li>
                  <li>✅ 5 Static Posts</li>
                  <li>✅ Social Media Management</li>
                  <li>✅ Basic Brand Strategy</li>
                </ul>
                <a href="#contact" class="btn btn-primary">Get Started</a>
              </div>
            </div>
          </div>
        </section>

        <!-- Detailed Services -->
        <section class="all-services-section">
          <div class="container">
            <h2 class="section-title fade-up">Our Expertise</h2>
            <div class="services-list-grid">
              
              <div class="service-card fade-up delay-100">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <h3>Social Media Plans</h3>
                <p>Comprehensive management to keep your audience engaged and growing.</p>
              </div>

              <div class="service-card fade-up delay-200">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                </div>
                <h3>Package Designing</h3>
                <p>Custom packaging designs that stand out on the shelf.</p>
              </div>

              <div class="service-card fade-up delay-300">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                </div>
                <h3>Campaign Design</h3>
                <p>Strategic ad campaigns tailored for maximum ROI.</p>
              </div>

              <div class="service-card fade-up delay-100">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Corporate Events</h3>
                <p>End-to-end design and setup for impactful corporate gatherings.</p>
              </div>

              <div class="service-card fade-up delay-200">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <h3>Video Production</h3>
                <p>Professional video shooting and editing for reels, ads, and more.</p>
              </div>

              <div class="service-card fade-up delay-300">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
                  </svg>
                </div>
                <h3>Graphic Design</h3>
                <p>Creative posters, flyers, and brochures that communicate effectively.</p>
              </div>

              <div class="service-card fade-up delay-100">
                <div class="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3>Content Writing</h3>
                <p>Compelling copy that speaks your brand's voice.</p>
              </div>

            </div>
          </div>
        </section>

        <!-- Smart Quote Estimator -->
        ${renderEstimatorSection()}

        <!-- CTA -->
        <section class="cta-section">
          <div class="container">
            <h2 class="cta-title fade-up">Ready to Scale?</h2>
            <a href="mailto:contact@folgo.com" class="btn btn-secondary fade-up delay-100">Contact Us</a>
          </div>
        </section>

        <!-- Footer -->
        <footer class="site-footer fade-up delay-200" style="padding: 4rem 0; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
          <div class="container">
            <img src="/b&w.png" alt="Folgo" style="height: 30px; margin: 0 auto 1rem; opacity: 0.8;">
            <p style="opacity: 0.5; font-size: 0.9rem;">&copy; 2026 Folgo Media. All rights reserved.</p>
          </div>
        </footer>
      </div>
    `;
  }
}
