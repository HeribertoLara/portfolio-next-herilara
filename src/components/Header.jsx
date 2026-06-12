import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FaBriefcase, FaRocket, FaChartLine } from 'react-icons/fa'
import { MdContactMail } from 'react-icons/md'
import './header.css'

const navItems = [
  { to: '/', labelKey: 'nav.home', label: 'Home', Icon: AiOutlineHome },
  { to: '/sobre-heriberto-lara', labelKey: 'nav.about', label: 'Sobre mi', Icon: AiOutlineUser },
  { to: '/portafolio', labelKey: 'nav.portfolio', label: 'Portafolio', Icon: FaBriefcase },
  { to: '/contacto-desarrollador-web', labelKey: 'nav.contact', label: 'Contacto', Icon: MdContactMail },
  { to: '/mas-ventas-para-brokers', labelKey: 'nav.brokers', label: 'Brokers', Icon: FaChartLine },
  { to: '/consigue-mas-clientes', labelKey: 'nav.clients', label: 'Consigue clientes', Icon: FaRocket },
]

function Header() {
  const [open, setOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const nextLocale = i18n.resolvedLanguage === 'en' ? 'es' : 'en'

  const toggle = () => setOpen((v) => !v)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty('overflow')
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.removeProperty('overflow')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="site-header__logo"
            width="34"
            height="34"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </Link>
        <button
          type="button"
          className={`site-header__toggle${open ? ' site-header__toggle--open' : ''}`}
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="site-header-nav"
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="site-header-nav"
          className={`site-header__nav${open ? ' site-header__nav--open' : ''}`}
          aria-hidden={open ? 'false' : 'true'}
        >
          <div className="site-header__nav-head">
            <span className="site-header__nav-title">Menu</span>
            <button
              type="button"
              className="site-header__nav-close"
              aria-label="Cerrar menu"
              onClick={close}
            >
              <span />
              <span />
            </button>
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className={({ isActive }) =>
                `site-header__link${isActive ? ' site-header__link--active' : ''}`
              }
            >
              {item.Icon && <item.Icon className="site-header__link-icon" aria-hidden="true" />}
              <span>{t(item.labelKey, { defaultValue: item.label })}</span>
            </NavLink>
          ))}
        </nav>
        <div className="site-header__lang">
          <button
            type="button"
            className="site-header__lang-btn"
            onClick={() => i18n.changeLanguage(nextLocale)}
            aria-label={t('common.changeLanguage', { lang: nextLocale.toUpperCase() })}
          >
            {nextLocale.toUpperCase()}
          </button>
        </div>
        <div
          className={`site-header__overlay${open ? ' site-header__overlay--active' : ''}`}
          onClick={close}
          role="presentation"
        />
      </div>
    </header>
  )
}

export default Header
