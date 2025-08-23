import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SobreMi.css";

export default function SobreMi() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Array de imágenes en public/assets
    const images = [
        
        "/assets/RowaStudioSobreMi1.jpg"
        
    ];

    return (
        <section className="sobre-mi-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Conoce a Nuestra Profesional</h2>
                    <div className="title-divider"></div>
                    <p className="section-subtitle">
                        Pasión, experiencia y dedicación al servicio de tu belleza
                    </p>
                </div>

                <div className="content-wrapper">
                    {/* Imagenes lado izquierdo */}
                    <div className="image-container">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Rocío ${idx + 1}`}
                                className={`professional-image ${hoveredIndex === idx ? "hovered" : ""}`}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>

                    {/* Información lado derecho */}
                    <div className="info-container">
                        <div className="professional-info">
                            <div className="name-section">
                                <h3 className="professional-name">Rocío Mejias Weigun</h3>
                                <p className="professional-title">
                                    Especialista en Estética y Belleza
                                </p>
                                <div className="experience-badge">
                                    <span className="years">3+</span>
                                    <span className="text">años de experiencia</span>
                                </div>
                            </div>

                            <div className="bio-content">
                                <p className="intro-text">
                                    Mi pasión es ayudar a cada cliente a sentirse seguro, radiante
                                    y conectado con su mejor versión. Con más de 3 años de
                                    experiencia en el mundo de la estética.
                                </p>

                                <p className="description-text">
                                    Me especializo en tratamientos personalizados que realzan la
                                    belleza natural de cada persona. Cada rostro cuenta una
                                    historia única y merece un cuidado especial.
                                </p>

                                <p className="philosophy-text">
                                    Mi filosofía se basa en combinar técnicas avanzadas con un
                                    trato cálido y profesional, creando experiencias
                                    transformadoras.
                                </p>
                            </div>

                            {/* Especialidades */}
                            <div className="specialties-section">
                                <h4 className="specialties-title">Especialidades</h4>
                                <div className="specialties-list">
                                    <div className="specialty-item">
                                        <span className="specialty-icon">✨</span>
                                        <span className="specialty-name">Tratamientos Faciales</span>
                                    </div>
                                    <div className="specialty-item">
                                        <span className="specialty-icon">💆‍♀️</span>
                                        <span className="specialty-name">Cuidado de la Piel</span>
                                    </div>
                                    <div className="specialty-item">
                                        <span className="specialty-icon">💅</span>
                                        <span className="specialty-name">Manicure & Pedicure</span>
                                    </div>
                                    <div className="specialty-item">
                                        <span className="specialty-icon"></span>
                                        <span className="specialty-name">Depilación Láser</span>
                                    </div>
                                </div>
                            </div>

                            {/* Botón de contacto */}
                            <button
                                className="contact-btn"
                                onClick={() =>
                                    window.open(
                                        "https://www.tuturno.io/rowastudio",
                                        "_blank"
                                    )
                                }
                            >
                                <span>Reserva tu Cita</span>
                                <span className="btn-arrow">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Testimonios */}
                <div className="testimonials-section">
  <div className="testimonials-container">
    <h4 className="testimonials-title">Testimonios</h4>

    <div
      id="carouselTestimonials"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      {/* Indicadores */}
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselTestimonials" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselTestimonials" data-bs-slide-to="1"></li>
      </ol>

      {/* Slides */}
      <div className="carousel-inner">
        {/* Grupo 1 */}
        <div className="carousel-item active">
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Rocio es increíble, siempre salgo renovada de cada sesión."</p>
                </div>
                <div className="testimonial-author">
                  <strong>María C.</strong>
                  <span>Cliente desde 2022</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Los mejores tratamientos faciales de Santa Rosa."</p>
                </div>
                <div className="testimonial-author">
                  <strong>Ana L.</strong>
                  <span>Cliente desde 2023</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Excelente atención, muy profesionales."</p>
                </div>
                <div className="testimonial-author">
                  <strong>Lucía F.</strong>
                  <span>Cliente desde 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grupo 2 */}
        <div className="carousel-item">
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Me sentí cómoda desde el primer momento. 10/10."</p>
                </div>
                <div className="testimonial-author">
                  <strong>Carlos P.</strong>
                  <span>Cliente desde 2024</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Muy recomendable, trato humano y cordial."</p>
                </div>
                <div className="testimonial-author">
                  <strong>Jorge R.</strong>
                  <span>Cliente desde 2023</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Siempre salgo más feliz y relajada, gracias Rocio."</p>
                </div>
                <div className="testimonial-author">
                  <strong>Paula M.</strong>
                  <span>Cliente desde 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselTestimonials"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselTestimonials"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</div>
            </div>
        </section>
    );
}