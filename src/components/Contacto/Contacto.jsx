import { useState } from 'react';
import { sendEmail } from '../services/email';
import './Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendEmail(formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-header text-center mb-5">
          <h1 className="contact-title">Contáctanos</h1>
          <div className="title-divider mx-auto mb-3"></div>
          <p className="contact-subtitle">
            Estamos aquí para ayudarte. Envíanos un mensaje y nos pondremos en contacto contigo pronto.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-content">
              {/* Formulario */}
              <div className="contact-form-section">
                <div className="form-container">
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name" className="form-label">
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre completo"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">
                            Email *
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+54 9 11 1234-5678"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="subject" className="form-label">
                            Asunto *
                          </label>
                          <select
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Selecciona un asunto</option>
                            <option value="consulta-general">Consulta General</option>
                            <option value="solicitar-cotizacion">Solicitar Cotización por Servicio</option>
                            <option value="soporte-tecnico">Consulta por turnos</option>
                            <option value="reclamos">Reclamos</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="message" className="form-label">
                            Mensaje *
                          </label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Escribe tu mensaje aquí..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="alert alert-success mt-4" role="alert">
                        <div className="d-flex align-items-center">
                          <span className="alert-icon">✓</span>
                          <div>
                            <strong>¡Mensaje enviado!</strong> Gracias por contactarnos. Te responderemos pronto.
                          </div>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="alert alert-error mt-4" role="alert">
                        <div className="d-flex align-items-center">
                          <span className="alert-icon">⚠</span>
                          <div>
                            <strong>Error al enviar el mensaje.</strong> Por favor, inténtalo de nuevo.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Enviando...</span>
                            </span>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <span className="btn-icon">✉</span>
                            Enviar Mensaje
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="contact-info-section">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="contact-info-card">
                      <div className="contact-icon">📧</div>
                      <div className="contact-info-content">
                        <h5>Email</h5>
                        <p>info@rowastudio.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="contact-info-card">
                      <div className="contact-icon">📱</div>
                      <div className="contact-info-content">
                        <h5>Teléfono</h5>
                        <p>2954315039</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="contact-info-card">
                      <div className="contact-icon">📍</div>
                      <div className="contact-info-content">
                        <h5>Ubicación</h5>
                        <p>San Martin Oeste 292</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="map-section">
                <h3 className="section-title text-center mb-4">Nuestra Ubicación</h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.232821621131!2d-64.29756692551898!3d-36.620782066802555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c2cd061cab68fd%3A0xa3c65fed6cbb3418!2sBAC%2C%20Av.%20San%20Mart%C3%ADn%20Oeste%20292%2C%20L6300%20Ciudad%20de%20Santa%20Rosa%2C%20La%20Pampa!5e0!3m2!1ses-419!2sar!4v1754692194162!5m2!1ses-419!2sar"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Santa Rosa, La Pampa"
                  ></iframe>
                  <div className="map-overlay">
                    <div className="map-info-card">
                      <h6>🏢 Visitanos</h6>
                      <p>Santa Rosa, La Pampa<br />Argentina</p>
                      <button
                        className="btn btn-map"
                        onClick={() => window.open('https://maps.google.com/?q=Santa+Rosa,+La+Pampa,+Argentina', '_blank')}
                      >
                        Ver en Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}