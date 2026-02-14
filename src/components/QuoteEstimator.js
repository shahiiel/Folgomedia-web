export const PRICING = [
  { keywords: ['reel', 'reels'], label: 'Reels (Normal – pkg of 4)', unitPrice: 2000, unit: 'reel', defaultQty: 4 },
  { keywords: ['advanced reel', 'advanced reels', 'motion reel'], label: 'Advanced Reels (AE/Premiere)', unitPrice: 3000, unit: 'reel', defaultQty: 1 },
  { keywords: ['story video', 'series video', 'content video'], label: 'Story/Series Video', unitPrice: 5000, unit: 'video', defaultQty: 1 },
  { keywords: ['video shoot', 'shooting'], label: 'Video Shooting', unitPrice: 500, unit: 'video', defaultQty: 1 },
  { keywords: ['video edit', 'editing'], label: 'Video Editing', unitPrice: 800, unit: 'video', defaultQty: 1 },
  { keywords: ['video', 'video production'], label: 'Video (Shoot + Edit + Script)', unitPrice: 2000, unit: 'video', defaultQty: 1 },
  { keywords: ['design', 'post', 'posts', 'static', 'graphic', 'poster', 'flyer', 'brochure'], label: 'Design', unitPrice: 350, unit: 'design', defaultQty: 1 },
  { keywords: ['template', 'simple design'], label: 'Template/Simple Design', unitPrice: 350, unit: 'design', defaultQty: 1 },
  { keywords: ['social media', 'smm', 'management'], label: 'Social Media Management', unitPrice: 10000, unit: 'month', defaultQty: 1 },
  { keywords: ['logo'], label: 'Logo Design', unitPrice: 5000, unit: 'project', defaultQty: 1 },
  { keywords: ['brand', 'branding', 'strategy'], label: 'Brand Strategy', unitPrice: 8000, unit: 'project', defaultQty: 1 },
  { keywords: ['campaign', 'ad', 'ads'], label: 'Campaign Design', unitPrice: 7000, unit: 'campaign', defaultQty: 1 },
  { keywords: ['content writing', 'writing', 'copy', 'copywriting', 'script'], label: 'Content Writing', unitPrice: 300, unit: 'piece', defaultQty: 1 },
  { keywords: ['package', 'packaging'], label: 'Package Design', unitPrice: 3000, unit: 'project', defaultQty: 1 },
  { keywords: ['event', 'corporate'], label: 'Corporate Event Design', unitPrice: 15000, unit: 'event', defaultQty: 1 },
];

export function parseQuote(text) {
  const lower = text.toLowerCase();
  const results = [];

  for (const service of PRICING) {
    for (const kw of service.keywords) {
      if (lower.includes(kw)) {
        const regex = new RegExp(`(\\d+)\\s*(?:${kw}|${service.keywords.join('|')})`, 'i');
        const regexAfter = new RegExp(`(?:${kw}|${service.keywords.join('|')})\\s*[:=-]?\\s*(\\d+)`, 'i');
        const matchBefore = text.match(regex);
        const matchAfter = text.match(regexAfter);
        const qty = matchBefore ? parseInt(matchBefore[1]) : matchAfter ? parseInt(matchAfter[1]) : service.defaultQty;

        results.push({
          label: service.label,
          qty,
          unit: service.unit,
          unitPrice: service.unitPrice,
          total: qty * service.unitPrice,
        });
        break;
      }
    }
  }

  return results;
}

export function renderEstimatorSection() {
  return `
    <section class="estimator-section">
      <div class="container">
        <h2 class="section-title fade-up">Instant Quote</h2>
        <p class="estimator-subtitle fade-up delay-100">Tell us what you need — we'll estimate the cost instantly.</p>
        <div class="estimator-card fade-up delay-200">
          <div class="estimator-input-wrap">
            <span class="estimator-icon">✨</span>
            <input type="text" class="estimator-input" id="estimator-input-section" placeholder='Try: "10 reels, logo design, and social media for 3 months"' autocomplete="off" />
          </div>
          <div class="estimator-results" id="estimator-results-section"></div>
        </div>
      </div>
    </section>
  `;
}

export function renderFloatingWidget() {
  return `
    <div class="quote-fab-wrap" id="quote-fab-wrap">
      <div class="fab-label" id="fab-label">Psst… need a quote? 👀</div>
      <div class="quote-fab" id="quote-fab" title="Get an instant quote">
        <svg class="mascot" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <!-- Body -->
          <ellipse cx="40" cy="48" rx="30" ry="26" fill="#E6A32F"/>
          <!-- Belly highlight -->
          <ellipse cx="40" cy="52" rx="18" ry="14" fill="#f0b840" opacity="0.5"/>
          <!-- Left ear -->
          <ellipse cx="18" cy="26" rx="8" ry="10" fill="#E6A32F" transform="rotate(-15 18 26)"/>
          <ellipse cx="18" cy="26" rx="5" ry="7" fill="#d4922a" transform="rotate(-15 18 26)"/>
          <!-- Right ear -->
          <ellipse cx="62" cy="26" rx="8" ry="10" fill="#E6A32F" transform="rotate(15 62 26)"/>
          <ellipse cx="62" cy="26" rx="5" ry="7" fill="#d4922a" transform="rotate(15 62 26)"/>
          <!-- Head -->
          <circle cx="40" cy="34" r="24" fill="#E6A32F"/>
          <!-- Face highlight -->
          <circle cx="40" cy="32" r="20" fill="#f0b840" opacity="0.3"/>
          <!-- Left eye white -->
          <ellipse cx="31" cy="32" rx="7" ry="8" fill="white"/>
          <!-- Right eye white -->
          <ellipse cx="49" cy="32" rx="7" ry="8" fill="white"/>
          <!-- Left pupil (moves with cursor) -->
          <circle class="mascot-pupil mascot-pupil-left" cx="31" cy="33" r="3.5" fill="#1a1a1a"/>
          <!-- Right pupil (moves with cursor) -->
          <circle class="mascot-pupil mascot-pupil-right" cx="49" cy="33" r="3.5" fill="#1a1a1a"/>
          <!-- Left eye shine -->
          <circle cx="29" cy="30" r="1.5" fill="white" opacity="0.8"/>
          <!-- Right eye shine -->
          <circle cx="47" cy="30" r="1.5" fill="white" opacity="0.8"/>
          <!-- Nose -->
          <ellipse cx="40" cy="39" rx="2.5" ry="1.8" fill="#d4922a"/>
          <!-- Mouth (reactive) -->
          <path id="mascot-mouth" d="M34 43 Q40 48 46 43" stroke="#8B5E14" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <!-- Blush left -->
          <circle cx="24" cy="40" r="4" fill="#e88a5a" opacity="0.3"/>
          <!-- Blush right -->
          <circle cx="56" cy="40" r="4" fill="#e88a5a" opacity="0.3"/>
          <!-- Left hand wave -->
          <ellipse cx="12" cy="55" rx="5" ry="4" fill="#E6A32F" transform="rotate(-20 12 55)"/>
          <!-- Right hand wave -->
          <ellipse cx="68" cy="55" rx="5" ry="4" fill="#E6A32F" transform="rotate(20 68 55)"/>
        </svg>
        <span class="fab-pulse"></span>
      </div>
    </div>
    <div class="quote-panel" id="quote-panel">
      <div class="panel-header">
        <span>💰 Instant Quote</span>
        <button class="panel-close" id="panel-close">✕</button>
      </div>
      <div class="panel-body">
        <p class="panel-hint">Describe what you need and we'll estimate the cost!</p>
        <div class="estimator-input-wrap">
          <input type="text" class="estimator-input" id="estimator-input-float" placeholder='e.g. "5 reels and a logo"' autocomplete="off" />
        </div>
        <div class="estimator-results" id="estimator-results-float"></div>
      </div>
    </div>
  `;
}

export function renderResults(items, container) {
  if (items.length === 0) {
    container.innerHTML = '';
    return;
  }

  const total = items.reduce((sum, i) => sum + i.total, 0);

  container.innerHTML = `
    <div class="result-lines">
      ${items.map(i => `
        <div class="result-line">
          <span class="result-service">${i.label} × ${i.qty}</span>
          <span class="result-price">from ₹${i.total.toLocaleString('en-IN')}</span>
        </div>
      `).join('')}
    </div>
    <div class="result-total">
      <span>Starting From</span>
      <span class="total-price">₹${total.toLocaleString('en-IN')}+</span>
    </div>
    <p class="result-disclaimer">⚡ This is a rough estimate based on starting prices. Actual cost may vary based on complexity and scope.</p>
    <a href="mailto:contact@folgo.com?subject=Quote Request&body=I'm interested in: ${items.map(i => i.label).join(', ')}. Estimated from: ₹${total.toLocaleString('en-IN')}" class="btn btn-primary result-cta">Book a Meeting →</a>
  `;
}
