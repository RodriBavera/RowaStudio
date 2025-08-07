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

  // Agrupar de a 3 para el carrusel
  const chunkArray = (arr, size) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  const slides = chunkArray(servicios, 3);

  return (
    <div className="servicios-page container py-5">
      
      <h3 className="lead text-center mb-5">
        En Rowa Studio brindamos tratamientos diseñados para tu bienestar,
        combinando tecnología de vanguardia con atención personalizada.
      </h3>

      <div id="carouselServicios" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((grupo, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <div className="row justify-content-center">
                {grupo.map((servicio) => {
                  // ✅ Usar ruta de public/ directamente
                  const imagenSrc = `/assets/ImgServicios/${servicio.imagen}`;

                  return (
                    <div className="col-md-4 mb-3" key={servicio.id}>
                      <div className="card h-100 shadow-sm">
                        <img
                          src={imagenSrc}
                          className="card-img-top"
                          alt={servicio.titulo}
                          style={{ height: '200px', objectFit: 'cover' }}
                          onError={(e) => {
                            console.error(`❌ No se pudo cargar: ${servicio.imagen}`);
                            e.target.src = "https://via.placeholder.com/300x200?text=Imagen+No+Disponible";
                          }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{servicio.titulo}</h5>
                          <p className="card-text flex-grow-1">{servicio.descripcion}</p>
                          <button
                            className="btn btn-outline-primary mt-auto"
                            onClick={() => handleOpenModal(servicio)}
                          >
                            Más detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselServicios"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselServicios"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Modal */}
      {modalData && (
        <ModalServicios modalData={modalData} onClose={handleCloseModal} />
      )}
    </div>
  );
}