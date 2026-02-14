import './style.css';
import { inject } from '@vercel/analytics';
import { Header } from './components/Header.js';
import { HomePage } from './pages/Home.js';
import { AboutPage } from './pages/About.js';
import { ServicesPage } from './pages/Services.js';
import { InsightsPage } from './pages/Insights.js';
import { Article2026Page } from './pages/Article2026.js';
import { parseQuote, renderResults } from './components/QuoteEstimator.js';
import { saveLead } from './firebase.js';

const app = document.querySelector('#app');
inject();

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/insights': InsightsPage,
  '/insights/digital-marketing-2026': Article2026Page,
};

function router() {
  const path = window.location.pathname;
  const PageClass = routes[path] || HomePage;

  const header = new Header();
  const page = new PageClass();

  app.innerHTML = `
    ${header.render()}
    <main>
      ${page.render()}
    </main>
  `;

  // Re-attach event listeners for links because we replaced innerHTML
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.history.pushState(null, null, href);
      router();
    });
  });

  // Initialize all features
  initAnimations();
  initStatsCounter();
  initParallax();
  initEstimator();
  initLeadForm();
  initProcessDrag();
}

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-up, .reveal-text');
  animatedElements.forEach(el => observer.observe(el));
}

function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);

        let current = 0;
        const updateCount = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current) + (target > 100 ? '+' : '');
            requestAnimationFrame(updateCount);
          } else {
            entry.target.innerText = target + (target > 100 ? '+' : '');
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

function initParallax() {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    const orbs = document.querySelectorAll('.bg-orb');
    orbs.forEach(orb => {
      const speed = orb.classList.contains('orb-1') ? 2 : -2;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

    const cards = document.querySelectorAll('.service-card, .process-step');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (e.clientX > rect.left && e.clientX < rect.right &&
        e.clientY > rect.top && e.clientY < rect.bottom) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 20;
        const dy = (e.clientY - cy) / 20;
        card.style.transform = `rotateY(${dx}deg) rotateX(${-dy}deg) scale(1.05)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

function initEstimator() {
  // Debounce helper
  let timer;
  function debounce(fn, ms) {
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  // Section estimator (Services page)
  const sectionInput = document.getElementById('estimator-input-section');
  const sectionResults = document.getElementById('estimator-results-section');
  if (sectionInput && sectionResults) {
    sectionInput.addEventListener('input', debounce(() => {
      const items = parseQuote(sectionInput.value);
      renderResults(items, sectionResults);
    }, 300));
  }

  // Floating widget estimator (Home page)
  const fabWrap = document.getElementById('quote-fab-wrap');
  const panel = document.getElementById('quote-panel');
  const closeBtn = document.getElementById('panel-close');
  const floatInput = document.getElementById('estimator-input-float');
  const floatResults = document.getElementById('estimator-results-float');

  if (fabWrap && panel) {
    fabWrap.addEventListener('click', () => {
      panel.classList.toggle('open');
      fabWrap.classList.toggle('hidden');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
        fabWrap.classList.remove('hidden');
      });
    }

    if (floatInput && floatResults) {
      floatInput.addEventListener('input', debounce(() => {
        const items = parseQuote(floatInput.value);
        renderResults(items, floatResults);
      }, 300));
    }
  }

  // Mascot eye tracking
  initMascotEyes();
}

function initMascotEyes() {
  const leftPupil = document.querySelector('.mascot-pupil-left');
  const rightPupil = document.querySelector('.mascot-pupil-right');

  if (!leftPupil || !rightPupil) return;

  // Default centers in SVG coords
  const leftCenter = { cx: 31, cy: 33 };
  const rightCenter = { cx: 49, cy: 33 };
  const maxOffset = 3; // max pixels the pupil can move

  document.addEventListener('mousemove', (e) => {
    const mascot = document.querySelector('.mascot');
    if (!mascot) return;

    const rect = mascot.getBoundingClientRect();
    const mascotCenterX = rect.left + rect.width / 2;
    const mascotCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - mascotCenterX;
    const dy = e.clientY - mascotCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const move = Math.min(dist / 30, maxOffset);
    const offsetX = Math.cos(angle) * move;
    const offsetY = Math.sin(angle) * move;

    leftPupil.setAttribute('cx', leftCenter.cx + offsetX);
    leftPupil.setAttribute('cy', leftCenter.cy + offsetY);
    rightPupil.setAttribute('cx', rightCenter.cx + offsetX);
    rightPupil.setAttribute('cy', rightCenter.cy + offsetY);
  });

  // Rotate cute phrases
  const label = document.getElementById('fab-label');
  const mouth = document.getElementById('mascot-mouth');
  if (label && mouth) {
    const expressions = [
      // { text, mouth SVG path, fill }
      { text: "Psst… need a quote? 👀", mouth: "M36 43 Q40 41 44 43", fill: "none" },       // subtle mysterious smirk
      { text: "Hey! Click me 🐻", mouth: "M34 43 Q40 49 46 43", fill: "none" },       // big happy smile
      { text: "I don't bite, promise 😄", mouth: "M34 42 Q40 50 46 42", fill: "#8B5E14" },    // open grin (filled)
      { text: "Let's do some math! 🧮", mouth: "M37 43 Q40 46 43 43", fill: "none" },       // small focused smile
      { text: "Wanna know the price? 💰", mouth: "M36 44 Q40 40 44 44", fill: "none" },       // cheeky upside-down smirk
      { text: "I'm free, the quote isn't 😜", mouth: "M34 43 Q37 48 40 45 Q43 48 46 43", fill: "none" }, // wavy playful mouth
      { text: "Try me! I'm smart-ish 🤓", mouth: "M38 43 A2 2 0 1 1 42 43", fill: "#8B5E14" },    // small 'o' surprised
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % expressions.length;
      const expr = expressions[idx];
      label.style.opacity = '0';
      mouth.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        label.textContent = expr.text;
        label.style.opacity = '0.85';
        mouth.setAttribute('d', expr.mouth);
        mouth.setAttribute('fill', expr.fill);
      }, 300);
    }, 3500);
  }
}

function initLeadForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('lead-submit');
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoading = submitBtn.querySelector('.submit-loading');
    const successDiv = document.getElementById('lead-success');

    const name = document.getElementById('lead-name').value.trim();
    const email = document.getElementById('lead-email').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const message = document.getElementById('lead-message').value.trim();

    if (!name || !email || !phone) return;

    // Show loading state
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    submitBtn.disabled = true;

    const result = await saveLead({ name, email, phone, message });

    if (result.success) {
      form.style.display = 'none';
      successDiv.style.display = 'block';
      successDiv.classList.add('fade-up', 'visible');
    } else {
      // Reset button on error
      submitText.style.display = 'inline';
      submitLoading.style.display = 'none';
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    }
  });
}

function initProcessDrag() {
  const container = document.getElementById('process-interactive');
  const svg = document.getElementById('process-svg');
  if (!container || !svg) return;

  let dragging = false;
  let fromStep = -1;
  let tempLine = null;
  const connections = [];

  // Make first dot pulse
  const firstDot = document.getElementById('dot-out-0');
  if (firstDot) firstDot.classList.add('pulse');

  function getDotCenter(el) {
    const rect = el.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - svgRect.left,
      y: rect.top + rect.height / 2 - svgRect.top
    };
  }

  function getPointerPos(e) {
    const touch = e.touches ? e.touches[0] : e;
    const svgRect = svg.getBoundingClientRect();
    return {
      x: touch.clientX - svgRect.left,
      y: touch.clientY - svgRect.top
    };
  }

  function createLine(x1, y1, x2, y2, cls) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    if (cls) line.setAttribute('class', cls);
    svg.appendChild(line);
    return line;
  }

  function onStart(e) {
    const dot = e.target.closest('.node-dot-out');
    if (!dot) return;
    const step = parseInt(dot.dataset.from);
    const node = document.getElementById('node-' + step);
    if (!node || !node.classList.contains('active')) return;
    if (dot.classList.contains('connected')) return;

    e.preventDefault();
    dragging = true;
    fromStep = step;
    dot.classList.remove('pulse');

    const center = getDotCenter(dot);
    tempLine = createLine(center.x, center.y, center.x, center.y, 'drawing');
  }

  function onMove(e) {
    if (!dragging || !tempLine) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    tempLine.setAttribute('x2', pos.x);
    tempLine.setAttribute('y2', pos.y);
  }

  function onEnd(e) {
    if (!dragging || !tempLine) return;
    dragging = false;

    const targetStep = fromStep + 1;
    const targetDot = document.getElementById('dot-in-' + targetStep);

    if (targetDot) {
      const pos = getPointerPos(e.changedTouches ? e.changedTouches[0] : e);
      const dotCenter = getDotCenter(targetDot);
      const dist = Math.sqrt((pos.x - dotCenter.x) ** 2 + (pos.y - dotCenter.y) ** 2);

      if (dist < 60) {
        // Snap connection!
        tempLine.setAttribute('x2', dotCenter.x);
        tempLine.setAttribute('y2', dotCenter.y);
        tempLine.classList.remove('drawing');
        connections.push(tempLine);

        // Mark dots as connected
        const fromDot = document.getElementById('dot-out-' + fromStep);
        if (fromDot) fromDot.classList.add('connected');
        targetDot.classList.add('connected');

        // Unlock next node
        const nextNode = document.getElementById('node-' + targetStep);
        if (nextNode) {
          nextNode.classList.remove('locked');
          nextNode.classList.add('unlocking', 'active');
          setTimeout(() => nextNode.classList.remove('unlocking'), 600);
        }

        // Pulse the next output dot
        const nextOutDot = document.getElementById('dot-out-' + targetStep);
        if (nextOutDot) {
          setTimeout(() => nextOutDot.classList.add('pulse'), 700);
        }

        tempLine = null;
        fromStep = -1;
        return;
      }
    }

    // Missed — remove temp line
    svg.removeChild(tempLine);
    tempLine = null;
    fromStep = -1;

    // Re-pulse the dot
    const fromDot = document.getElementById('dot-out-' + (targetStep - 1));
    if (fromDot && !fromDot.classList.contains('connected')) {
      fromDot.classList.add('pulse');
    }
  }

  // Mouse events
  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  // Touch events
  container.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onEnd);
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  router();
});
