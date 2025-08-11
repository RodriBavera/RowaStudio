import { useState } from 'react';
import './Contacto.css'; // Importar el archivo CSS

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
      // Aquí irá la configuración de EmailJS
      // import emailjs from '@emailjs/browser';
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY');

      // Simulación de envío (reemplaza con EmailJS real)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-header text-center mb-5">
              <h1 className="contact-title">Contáctanos</h1>
              <p className="contact-subtitle">
                Estamos aquí para ayudarte. Envíanos un mensaje y nos pondremos en contacto contigo pronto.
              </p>
            </div>

            <div className="contact-form-container">
              <div className="contact-form">
                <div className="row">
                  <div className="col-md-6 mb-4">
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

                  <div className="col-md-6 mb-4">
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
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
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

                  <div className="col-md-6 mb-4">
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
                        <option value="solicitar-cotizacion">Solicitar Cotización</option>
                        <option value="soporte-tecnico">Soporte Técnico</option>
                        <option value="reclamos">Reclamos</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
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

                {submitStatus === 'success' && (
                  <div className="alert alert-success" role="alert">
                    <strong>¡Mensaje enviado!</strong> Gracias por contactarnos. Te responderemos pronto.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="alert alert-danger" role="alert">
                    <strong>Error al enviar el mensaje.</strong> Por favor, inténtalo de nuevo.
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Enviando...</span>
                        </span>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-info mt-5">
              <div className="row text-center">
                <div className="col-md-4 mb-4">
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      📧
                    </div>
                    <h5>Email</h5>
                    <p>info@tuempresa.com</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      📱
                    </div>
                    <h5>Teléfono</h5>
                    <p>+54 9 11 1234-5678</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      📍
                    </div>
                    <h5>Ubicación</h5>
                    <p>San Martin Oeste 292</p>
                  </div>
                </div>
              </div>

              {/* Mapa integrado */}
              <div className="map-section mt-5">
                <h3 className="map-title text-center mb-4">Nuestra Ubicación</h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.232821621131!2d-64.29756692551898!3d-36.620782066802555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c2cd061cab68fd%3A0xa3c65fed6cbb3418!2sBAC%2C%20Av.%20San%20Mart%C3%ADn%20Oeste%20292%2C%20L6300%20Ciudad%20de%20Santa%20Rosa%2C%20La%20Pampa!5e0!3m2!1ses-419!2sar!4v1754692194162!5m2!1ses-419!2sar"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: '15px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Santa Rosa, La Pampa"
                  ></iframe>
                  <div className="map-overlay">
                    <div className="map-info">
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
    </div>
  );
}