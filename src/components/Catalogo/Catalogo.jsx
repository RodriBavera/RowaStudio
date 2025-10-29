import React, { useState } from "react";
import "./Catalogo.css";

export default function Catalogo({ productos, onSelectProducto, onAgregarAlCarrito }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => p.categoria === categoriaSeleccionada)
    : productos;

  return (
    <div className="container my-4">
      <h2>Catálogo de productos</h2>

      <div className="mb-3">
        <label className="form-label fw-bold">Filtrar por categoría:</label>
        <select
          className="form-select"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productosFiltrados.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={producto.img} 
                className="card-img-top"
                alt={producto.nombre}
                style={{ objectFit: "cover", height: "300px" }}
                onError={(e) => {
                  // Manejo de error si la imagen no existe
                  e.target.src = "/assets/placeholder.jpg"; // Imagen por defecto
                  e.target.alt = "Imagen no disponible";
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-primary fw-bold">
                  ${producto.precio}
                </p>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btnDetalles btn-primary flex-grow-1"
                    onClick={() => onSelectProducto(producto)}
                  >
                    Ver detalle
                  </button>
                  <button
                    className="btnCarrito btn-success"
                    onClick={() => onAgregarAlCarrito(producto)}
                  >
                    + Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}