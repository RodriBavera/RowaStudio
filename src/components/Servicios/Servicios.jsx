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
    <div className="servicios-page container py-5">
      <h2 className="servicios-title text-center mb-5">
        En <span>Rowa Studio</span> brindamos tratamientos diseñados para tu bienestar,
        combinando <span>tecnología de vanguardia</span> con atención personalizada.
      </h2>

      <div className="row justify-content-center">
        {servicios.map((servicio) => {
          const imagenSrc = `/assets/ImgServicios/${servicio.imagen}`;
          return (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              key={servicio.id}
            >
              <div className="card servicio-card h-100">
                <img
                  src={imagenSrc}
                  className="card-img-top"
                  alt={servicio.titulo}
                  style={{ height: "160px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                  onError={(e) => {
                    console.error(`❌ No se pudo cargar: ${servicio.imagen}`);
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Imagen+No+Disponible";
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

      {/* Modal */}
      {modalData && (
        <ModalServicios modalData={modalData} onClose={handleCloseModal} />
      )}
    </div>
  );
}