import { Link } from 'react-router-dom'
import './header.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/" className="site-footer__brand">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="site-footer__logo"
            width="34"
            height="34"
            loading="lazy"
            decoding="async"
          />
        </Link>
        <p className="site-footer__text">© {new Date().getFullYear()} Heri Lara</p>
      </div>
    </footer>
  )
}

export default Footer
