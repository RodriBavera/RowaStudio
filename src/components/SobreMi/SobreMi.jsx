import { useState } from "react";
import RowaVideo from "../../assets/RowaVideo.mp4";
import "./SobreMi.css";

export default function SobreMi() {
    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleVideoLoad = () => {
        setVideoLoaded(true);
    };

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
                    {/* Video lado izquierdo */}
                    <div className="video-container">
                        <video
                            className={`professional-video ${videoLoaded ? "loaded" : ""}`}
                            src={RowaVideo}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            onLoadedData={handleVideoLoad}
                        >
                            Tu navegador no soporta el elemento de video.
                        </video>
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
                                    <span className="years">2+</span>
                                    <span className="text">años de experiencia</span>
                                </div>
                            </div>

                            <div className="bio-content">
                                <p className="intro-text">
                                    Mi pasión es ayudar a cada cliente a sentirse seguro, radiante y
                                    conectado con su mejor versión. Con más de 5 años de experiencia
                                    en el mundo de la estética.
                                </p>

                                <p className="description-text">
                                    Me especializo en tratamientos personalizados que realzan la belleza
                                    natural de cada persona. Cada rostro cuenta una historia única y merece
                                    un cuidado especial.
                                </p>

                                <p className="philosophy-text">
                                    Mi filosofía se basa en combinar técnicas avanzadas con un trato
                                    cálido y profesional, creando experiencias transformadoras.
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
      "https://www.tuturno.io/rowastudio?fbclid=PAZXh0bgNhZW0CMTEAAafOB_iH3ySqQ8XZT2auHDlLx7SUYTZS1ynPLFbTfa_OH7pfdza0he1IPtEdJw_aem_ZzYQeuMxEl61itjVPXzCpg",
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
                        <div className="testimonials-grid">
                            <div className="testimonial-card">
                                <div className="testimonial-content">
                                    <p>"Roxana es increíble, siempre salgo renovada de cada sesión. Su profesionalismo y calidez hacen toda la diferencia."</p>
                                </div>
                                <div className="testimonial-author">
                                    <strong>María C.</strong>
                                    <span>Cliente desde 2022</span>
                                </div>
                            </div>
                            <div className="testimonial-card">
                                <div className="testimonial-content">
                                    <p>"Los mejores tratamientos faciales de Santa Rosa. Roxana realmente entiende las necesidades de mi piel."</p>
                                </div>
                                <div className="testimonial-author">
                                    <strong>Ana L.</strong>
                                    <span>Cliente desde 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}