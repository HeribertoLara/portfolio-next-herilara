import { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { FaPhoneAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import './contact-form.css'

const MIN_FILL_TIME_MS = 2500
const SUBMIT_COOLDOWN_MS = 30000
const STORAGE_KEY = 'heri_contact_form_cooldown_until'

function ContactForm({
  formId = 'xwpgjrvp',
  whatsappHref = 'https://wa.me/529848045757',
  className = '',
}) {
  const { t } = useTranslation()
  const [state, handleSubmit] = useForm(formId)
  const formStartedAtRef = useRef(0)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const [spamError, setSpamError] = useState('')
  const containerClass = ['contact__form-card', className].filter(Boolean).join(' ')

  useEffect(() => {
    formStartedAtRef.current = Date.now()
  }, [])

  useEffect(() => {
    const updateCooldown = () => {
      if (typeof window === 'undefined') return

      const storedUntil = Number(window.localStorage.getItem(STORAGE_KEY) || 0)
      const remaining = Math.max(0, storedUntil - Date.now())
      setCooldownRemaining(remaining)
    }

    updateCooldown()
    const intervalId = window.setInterval(updateCooldown, 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const handleProtectedSubmit = async (event) => {
    const formData = new FormData(event.currentTarget)
    const honeypotValue = String(formData.get('_gotcha') || '').trim()

    if (honeypotValue) {
      event.preventDefault()
      setSpamError(t('contactForm.validation.spam'))
      return
    }

    if (cooldownRemaining > 0) {
      event.preventDefault()
      setSpamError(t('contactForm.validation.cooldown'))
      return
    }

    if (Date.now() - formStartedAtRef.current < MIN_FILL_TIME_MS) {
      event.preventDefault()
      setSpamError(t('contactForm.validation.tooFast'))
      return
    }

    setSpamError('')
    if (typeof window !== 'undefined') {
      const cooldownUntil = Date.now() + SUBMIT_COOLDOWN_MS
      window.localStorage.setItem(STORAGE_KEY, String(cooldownUntil))
      setCooldownRemaining(SUBMIT_COOLDOWN_MS)
    }
    await handleSubmit(event)
  }

  return (
    <div className={containerClass}>
      {state.succeeded ? (
        <div className="contact__thanks">{t('contactForm.success')}</div>
      ) : (
        <form className="contact__form" onSubmit={handleProtectedSubmit}>
          <input
            type="text"
            name="_gotcha"
            className="field field--trap"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
          <label className="field">
            <span>{t('contactForm.name')}</span>
            <input type="text" name="name" placeholder={t('contactForm.namePlaceholder')} />
          </label>
          <label className="field">
            <span>{t('contactForm.email')}</span>
            <input type="email" name="email" placeholder={t('contactForm.emailPlaceholder')} required />
            <ValidationError prefix={t('contactForm.validation.email')} field="email" errors={state.errors} />
          </label>
          <label className="field">
            <span>{t('contactForm.message')}</span>
            <textarea name="message" placeholder={t('contactForm.messagePlaceholder')} rows="4" />
            <ValidationError
              prefix={t('contactForm.validation.message')}
              field="message"
              errors={state.errors}
            />
          </label>
          <div className="form__actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={state.submitting || cooldownRemaining > 0}
            >
              {cooldownRemaining > 0
                ? t('contactForm.submitCooldown', {
                    seconds: Math.ceil(cooldownRemaining / 1000),
                  })
                : t('contactForm.submit')}
            </button>
            <a className="btn btn--outline" href={whatsappHref} target="_blank" rel="noreferrer">
              <FaPhoneAlt aria-hidden="true" /> {t('contactForm.schedule')}
            </a>
          </div>
          {spamError ? <p className="contact__error">{spamError}</p> : null}
        </form>
      )}
    </div>
  )
}

export default ContactForm
