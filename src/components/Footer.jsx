import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { openCookiePreferences } from '../utils/analytics'
import './header.css'

function Footer() {
  const { t } = useTranslation()

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
        <div className="site-footer__meta">
          <p className="site-footer__text">{t('footer.copy', { year: new Date().getFullYear() })}</p>
          <div className="site-footer__links">
            <Link to="/privacidad" className="site-footer__link">
              {t('footer.privacy')}
            </Link>
            <button type="button" className="site-footer__link site-footer__link--button" onClick={openCookiePreferences}>
              {t('footer.cookies')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
