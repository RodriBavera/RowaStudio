import React from "react";

export default function Carrito({ carrito, onVaciar, onEliminarProducto, onVolverATienda, onFinalizarCompra }) {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <div className="container my-4">
        <h2>Carrito de compras</h2>
        <p>El carrito está vacío.</p>
        <button className="btn btn-secondary" onClick={onVolverATienda}>
          ← Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Carrito de compras</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio}</td>
              <td>${item.precio * item.cantidad}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => onEliminarProducto(item.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ${total}</h4>
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onVolverATienda}>← Volver a la tienda</button>
        <button className="btn btn-primary" onClick={onFinalizarCompra}>Finalizar compra</button>
        <button className="btn btn-warning" onClick={onVaciar}>Vaciar carrito</button>
      </div>
    </div>
  );
}