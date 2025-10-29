import React from "react";
import "./ProductoDetalle.css"; 

export default function ProductoDetalle({ producto, onVolver, onAgregarAlCarrito }) {
  return (
    <div className="container my-4 producto-detalle-container">
      <button className="btn-volver" onClick={onVolver}>
        ← Volver al catálogo
      </button>
      <div className="row producto-detalle-content">
        <div className="col-md-6">
          <img
            src={producto.img || "https://via.placeholder.com/300"}
            alt={producto.nombre}
            className="img-fluid rounded producto-imagen"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center producto-info">
          <h2 className="producto-nombre">{producto.nombre}</h2>
          <h4 className="producto-subtitulo">{producto.subtitulo}</h4>
          <p className="producto-descripcion">{producto.descripcion}</p>
          <p className="producto-precio">${producto.precio}</p>
          <button
            className="btn-agregar-carrito"
            onClick={() => onAgregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}