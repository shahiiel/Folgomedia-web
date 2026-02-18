export class Header {
  constructor() { }

  render() {
    return `
      <header class="site-header">
        <div class="container header-container">
          <div class="logo">
            <a href="/" data-link>
              <img src="/b&w.png" alt="Folgo" class="logo-img">
            </a>
          </div>
          <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav id="main-nav">
            <ul class="nav-links">
              <li><a href="/" data-link>Home</a></li>
              <li><a href="/services" data-link>Services</a></li>
              <li><a href="/insights" data-link>Insights</a></li>
              <li><a href="/about" data-link>About Us</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  afterRender() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');

    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      btn.classList.toggle('is-active', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', false);
      });
    });
  }
}
