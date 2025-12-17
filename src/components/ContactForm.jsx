import { useForm, ValidationError } from '@formspree/react'
import { FaPhoneAlt } from 'react-icons/fa'
import './contact-form.css'

function ContactForm({
  formId = 'xwpgjrvp',
  whatsappHref = 'https://wa.me/529848045757',
  className = '',
}) {
  const [state, handleSubmit] = useForm(formId)
  const containerClass = ['contact__form-card', className].filter(Boolean).join(' ')

  return (
    <div className={containerClass}>
      {state.succeeded ? (
        <div className="contact__thanks">Gracias! Te respondere muy pronto.</div>
      ) : (
        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nombre</span>
            <input type="text" name="name" placeholder="Tu nombre" />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" placeholder="tu@email.com" required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </label>
          <label className="field">
            <span>Mensaje</span>
            <textarea name="message" placeholder="Cuentame sobre tu proyecto" rows="4" />
            <ValidationError prefix="Mensaje" field="message" errors={state.errors} />
          </label>
          <div className="form__actions">
            <button type="submit" className="btn btn--primary" disabled={state.submitting}>
              Enviar
            </button>
            <a className="btn btn--outline" href={whatsappHref} target="_blank" rel="noreferrer">
              <FaPhoneAlt aria-hidden="true" /> Agendar llamada
            </a>
          </div>
        </form>
      )}
    </div>
  )
}

export default ContactForm
