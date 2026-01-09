import { useForm, ValidationError } from '@formspree/react'
import { FaPhoneAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import './contact-form.css'

function ContactForm({
  formId = 'xwpgjrvp',
  whatsappHref = 'https://wa.me/529848045757',
  className = '',
}) {
  const { t } = useTranslation()
  const [state, handleSubmit] = useForm(formId)
  const containerClass = ['contact__form-card', className].filter(Boolean).join(' ')

  return (
    <div className={containerClass}>
      {state.succeeded ? (
        <div className="contact__thanks">{t('contactForm.success')}</div>
      ) : (
        <form className="contact__form" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn--primary" disabled={state.submitting}>
              {t('contactForm.submit')}
            </button>
            <a className="btn btn--outline" href={whatsappHref} target="_blank" rel="noreferrer">
              <FaPhoneAlt aria-hidden="true" /> {t('contactForm.schedule')}
            </a>
          </div>
        </form>
      )}
    </div>
  )
}

export default ContactForm
