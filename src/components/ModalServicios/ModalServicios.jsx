import React from "react";
import "./ModalServicios.css";

export default function ModalServicios({ modalData, onClose }) {
  if (!modalData) return null;

  // ✅ Usar la misma ruta que funciona en Servicios.jsx
  const imagenSrc = `/assets/ImgServicios/${modalData.imagen}`;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title">{modalData.titulo}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="modal-body-custom">
          <img
            src={imagenSrc}
            alt={modalData.titulo}
            className="img-fluid mb-3 rounded"
            onError={(e) => {
              console.error(`❌ No se pudo cargar imagen en modal: ${modalData.imagen}`);
              e.target.src = "https://via.placeholder.com/400x250?text=Imagen+No+Disponible";
            }}
          />
          {/* Secciones con estilos */}
          <div className="detalle-servicio">
            {modalData.detalle.split(/(?=\¿|¿|Qué|Beneficios|En qué consiste|Cómo funciona|Diagnóstico|Limpieza|Mascarillas|Exfoliación|Extracción|Hidratación|Aparatología)/g).map((seccion, i) => (
              <p key={i}>
                <strong>
                  {seccion.match(/^[^\:]+:/)
                    ? seccion.match(/^[^\:]+:/)[0]
                    : ""}
                </strong>
                {seccion.replace(/^[^\:]+:/, "")}
              </p>
            ))}
          </div>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <a href="/contacto" className="btn btn-primary">
            Solicitar turno
          </a>
        </div>
      </div>
    </div>
  );
}