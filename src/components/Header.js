export class Header {
  constructor() { }

  render() {
    return `
      <header class="site-header">
        <div class="container header-container">
          <div class="logo">
            <a href="/" data-link>
              <img src="/b&w.png" alt="Folgo" style="height: 40px;">
            </a>
          </div>
          <nav>
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
}
