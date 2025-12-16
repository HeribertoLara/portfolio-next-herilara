import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FaBriefcase, FaRocket } from 'react-icons/fa'
import { MdContactMail } from 'react-icons/md'
import './header.css'

const navItems = [
  { to: '/', label: 'Home', Icon: AiOutlineHome },
  { to: '/sobre-heriberto-lara', label: 'Sobre mi', Icon: AiOutlineUser },
  { to: '/portafolio-proyectos-nextjs', label: 'Portafolio', Icon: FaBriefcase },
  { to: '/contacto-desarrollador-web', label: 'Contacto', Icon: MdContactMail },
  { to: '/consigue-mas-clientes', label: 'Consigue clientes', Icon: FaRocket },
]

function Header() {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((v) => !v)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <img src="/images/logo.png" alt="Logo" className="site-header__logo" />
        </Link>
        <button
          type="button"
          className="site-header__toggle"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`site-header__nav${open ? ' site-header__nav--open' : ''}`}>
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
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
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
