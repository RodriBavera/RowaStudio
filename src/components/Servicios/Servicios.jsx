import React, { useState } from "react";
import servicios from "../../data/servicios.json";
import "./Servicios.css";
import ModalServicios from "../ModalServicios/ModalServicios.jsx";

export default function Servicios() {
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (servicio) => {
    setModalData(servicio);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <section className="servicios-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title servicios-title">
            En <span className="text-accent">Rowa Studio</span> brindamos tratamientos diseñados para tu bienestar
          </h2>
          <p className="section-subtitle">
            Combinando <span className="text-primary">tecnología de vanguardia</span> con atención personalizada
          </p>
        </div>

        <div className="row g-4">
          {servicios.map((servicio) => {
            const imagenSrc = `/assets/ImgServicios/${servicio.imagen}`;
            return (
              <div
                className="col-xl-4 col-md-6"
                key={servicio.id}
              >
                <div className="servicio-card card h-100 border-0 shadow-sm">
                  <div className="card-img-container overflow-hidden">
                    <img
                      src={imagenSrc}
                      className="card-img-top servicio-img"
                      alt={servicio.titulo}
                      onError={(e) => {
                        console.error(`❌ No se pudo cargar: ${servicio.imagen}`);
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Imagen+No+Disponible";
                      }}
                    />
                    <div className="card-overlay"></div>
                  </div>
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title servicio-name">{servicio.titulo}</h5>
                    <p className="card-text servicio-desc flex-grow-1">{servicio.descripcion}</p>
                    <button
                      className="btn btn-primary servicio-btn align-self-start mt-auto"
                      onClick={() => handleOpenModal(servicio)}
                    >
                      Más detalles
                      <span className="btn-icon ms-2">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Versión carrusel para móviles */}
        <div className="d-block d-md-none mt-4">
          <div id="carouselServicios" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {servicios.map((servicio, index) => {
                const imagenSrc = `/assets/ImgServicios/${servicio.imagen}`;
                return (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={servicio.id}>
                    <div className="servicio-card card h-100 border-0 shadow-sm mx-2">
                      <div className="card-img-container overflow-hidden">
                        <img
                          src={imagenSrc}
                          className="card-img-top servicio-img"
                          alt={servicio.titulo}
                          onError={(e) => {
                            console.error(`❌ No se pudo cargar: ${servicio.imagen}`);
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=Imagen+No+Disponible";
                          }}
                        />
                        <div className="card-overlay"></div>
                      </div>
                      <div className="card-body d-flex flex-column p-4">
                        <h5 className="card-title servicio-name">{servicio.titulo}</h5>
                        <p className="card-text servicio-desc flex-grow-1">{servicio.descripcion}</p>
                        <button
                          className="btn btn-primary servicio-btn align-self-start mt-auto"
                          onClick={() => handleOpenModal(servicio)}
                        >
                          Más detalles
                          <span className="btn-icon ms-2">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselServicios" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselServicios" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalData && (
        <ModalServicios modalData={modalData} onClose={handleCloseModal} />
      )}
    </section>
  );
}