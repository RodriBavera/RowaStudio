import React from "react";

export default function ProductoDetalle({ producto, onVolver, onAgregarAlCarrito }) {
  return (
    <div className="container my-4">
      <button className="btn btn-secondary mb-3" onClick={onVolver}>
        ← Volver al catálogo
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.img || "https://via.placeholder.com/300"}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="text-uppercase text-danger mb-2">{producto.nombre}</h2>
          <h4 className="fw-bold mb-2">{producto.subtitulo}</h4>
          <p className="mb-3">{producto.descripcion}</p>
          <p className="text-danger fw-bold fs-4 mb-3">${producto.precio}</p>
          <button
            className="btn btn-danger w-50"
            onClick={() => onAgregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}