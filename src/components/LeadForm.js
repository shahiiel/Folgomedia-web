export function renderLeadForm() {
    return `
    <section class="lead-section" id="contact">
      <div class="container">
        <div class="lead-form-card fade-up">
          <div class="lead-form-header">
            <h2 class="section-title">Let's Work Together</h2>
            <p class="lead-subtitle">Drop your details and we'll get back to you within 24 hours.</p>
          </div>
          <form id="lead-form" class="lead-form" autocomplete="on">
            <div class="form-row">
              <div class="form-group">
                <label for="lead-name">Your Name / Brand</label>
                <input type="text" id="lead-name" name="name" placeholder="e.g. Ladder Academy" required />
              </div>
              <div class="form-group">
                <label for="lead-phone">Phone Number</label>
                <input type="tel" id="lead-phone" name="phone" placeholder="+91 98765 43210" required />
              </div>
            </div>
            <div class="form-group">
              <label for="lead-email">Email Address</label>
              <input type="email" id="lead-email" name="email" placeholder="you@company.com" required />
            </div>
            <div class="form-group">
              <label for="lead-message">What do you need? <span class="optional">(optional)</span></label>
              <textarea id="lead-message" name="message" rows="3" placeholder="Tell us briefly — e.g. social media management, 10 reels, branding..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary lead-submit" id="lead-submit">
              <span class="submit-text">Send It Over 🚀</span>
              <span class="submit-loading" style="display:none;">Sending...</span>
            </button>
          </form>
          <div class="lead-success" id="lead-success" style="display:none;">
            <div class="success-icon">✅</div>
            <h3>We Got It!</h3>
            <p>Thanks for reaching out. We'll be in touch within 24 hours.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
