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
                    <div className="modal-title-section">
                        <h5 className="modal-title">{modalData.titulo}</h5>
                        <p className="modal-subtitle">Servicio profesional de estética</p>
                    </div>
                    <button
                        type="button"
                        className="btn-close-custom"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="modal-body-custom">
                    <div className="modal-image-container">
                        <img
                            src={imagenSrc}
                            alt={modalData.titulo}
                            className="modal-image"
                            onError={(e) => {
                                console.error(`❌ No se pudo cargar imagen en modal: ${modalData.imagen}`);
                                e.target.src = "https://via.placeholder.com/600x300?text=Imagen+No+Disponible";
                            }}
                        />
                    </div>
                    
                    
                    <div className="detalle-servicio">
                        {modalData.detalle.split(/(?=\¿|¿|Qué|Beneficios|En qué consiste|Cómo funciona|Diagnóstico|Limpieza|Mascarillas|Exfoliación|Extracción|Hidratación|Aparatología)/g).map((seccion, i) => {
                            const hasTitle = seccion.match(/^[^\:]+:/);
                            const title = hasTitle ? hasTitle[0] : "";
                            const content = seccion.replace(/^[^\:]+:/, "");
                            
                            return (
                                <div key={i} className="servicio-seccion">
                                    {title && (
                                        <h6 className="seccion-titulo">
                                            {title.replace(':', '')}
                                        </h6>
                                    )}
                                    {content && (
                                        <p className="seccion-contenido">
                                            {content}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="modal-footer-custom">
                    <button className="btn btn-outline-secondary" onClick={onClose}>
                        Cerrar
                    </button>
                    <a 
                        href="https://www.tuturno.io/rowastudio?fbclid=PAZXh0bgNhZW0CMTEAAafOB_iH3ySqQ8XZT2auHDlLx7SUYTZS1ynPLFbTfa_OH7pfdza0he1IPtEdJw_aem_ZzYQeuMxEl61itjVPXzCpg" 
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="btn-icon">📅</span>
                        Solicitar turno
                    </a>
                </div>
            </div>
        </div>
    );
}