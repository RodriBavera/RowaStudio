import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SobreMi.css";

export default function SobreMi() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

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

                <div className="row align-items-start">
                    {/* Columna de imagen */}
                    <div className="col-lg-5 mb-5 mb-lg-0">
                        <div className="image-container position-relative">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Rocío ${idx + 1}`}
                                    className={`professional-image img-fluid rounded shadow ${hoveredIndex === idx ? "hovered" : ""}`}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            ))}
                            <div className="experience-badge position-absolute top-0 start-0 m-3">
                                <div className="d-flex align-items-center bg-accent text-white px-3 py-2 rounded-pill shadow">
                                    <span className="years fw-bold fs-5">3+</span>
                                    <span className="text ms-2">años de experiencia</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna de información */}
                    <div className="col-lg-7 ps-lg-5">
                        <div className="professional-info">
                            <div className="name-section mb-4">
                                <h3 className="professional-name text-accent fw-bold mb-1">Rocío Mejias Weigun</h3>
                                <p className="professional-title text-muted mb-3">
                                    Especialista en Estética y Belleza
                                </p>
                            </div>

                            <div className="bio-content mb-4">
                                <p className="intro-text fst-italic text-primary mb-3">
                                    Mi pasión es ayudar a cada cliente a sentirse seguro, radiante
                                    y conectado con su mejor versión. Con más de 3 años de
                                    experiencia en el mundo de la estética.
                                </p>

                                <p className="description-text mb-3">
                                    Me especializo en tratamientos personalizados que realzan la
                                    belleza natural de cada persona. Cada rostro cuenta una
                                    historia única y merece un cuidado especial.
                                </p>

                                <p className="philosophy-text mb-0">
                                    Mi filosofía se basa en combinar técnicas avanzadas con un
                                    trato cálido y profesional, creando experiencias
                                    transformadoras.
                                </p>
                            </div>

                            {/* Especialidades */}
                            <div className="specialties-section mb-4">
                                <h4 className="specialties-title text-accent mb-3">Especialidades</h4>
                                <div className="row">
                                    <div className="col-sm-6 mb-2">
                                        <div className="specialty-item d-flex align-items-center p-3 bg-light rounded shadow-sm">
                                            <span className="specialty-icon me-3">✨</span>
                                            <span className="specialty-name">Tratamientos Faciales</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-2">
                                        <div className="specialty-item d-flex align-items-center p-3 bg-light rounded shadow-sm">
                                            <span className="specialty-icon me-3">💆‍♀️</span>
                                            <span className="specialty-name">Cuidado de la Piel</span>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 mb-2">
                                        <div className="specialty-item d-flex align-items-center p-3 bg-light rounded shadow-sm">
                                            <span className="specialty-icon me-3">⚡</span>
                                            <span className="specialty-name">Depilación Láser</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botón de contacto */}
                            <button
                                className="contact-btn btn btn-accent btn-lg rounded-pill px-4 py-2 d-flex align-items-center"
                                onClick={() => window.open("https://www.tuturno.io/rowastudio", "_blank")}
                            >
                                <span>Reserva tu Cita</span>
                                <span className="btn-arrow ms-2">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Testimonios */}
                <div className="testimonials-section mt-5 pt-5">
                    <div className="testimonials-container">
                        <h4 className="testimonials-title text-center text-accent mb-4">Testimonios</h4>

                        <div id="carouselTestimonials" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
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
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="testimonial-card h-100">
                                                <div className="testimonial-content">
                                                    <p>"Rocio es increíble, siempre salgo renovada de cada sesión."</p>
                                                </div>
                                                <div className="testimonial-author">
                                                    <strong>María C.</strong>
                                                    <span>Cliente desde 2022</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3 mb-md-0 d-none d-md-block">
                                            <div className="testimonial-card h-100">
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
                                            <div className="testimonial-card h-100">
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
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="testimonial-card h-100">
                                                <div className="testimonial-content">
                                                    <p>"Me sentí cómoda desde el primer momento. 10/10."</p>
                                                </div>
                                                <div className="testimonial-author">
                                                    <strong>Carlos P.</strong>
                                                    <span>Cliente desde 2024</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3 mb-md-0 d-none d-md-block">
                                            <div className="testimonial-card h-100">
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
                                            <div className="testimonial-card h-100">
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
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next">
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}