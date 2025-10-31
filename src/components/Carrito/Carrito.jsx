import React from "react";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const navigate = useNavigate();
  
  // Obtener carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.location.reload(); // O usa estado para refrescar
  };

  const vaciarCarrito = () => {
    localStorage.removeItem('carrito');
    navigate('/tienda');
  };

  const finalizarCompra = () => {
    navigate('/checkout');
  };

  if (carrito.length === 0) {
    return (
      <div className="container my-4">
        <h2>Carrito de compras</h2>
        <p>El carrito está vacío.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/tienda')}>
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
                <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(item.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ${total}</h4>
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate('/tienda')}>
          ← Volver a la tienda
        </button>
        <button className="btn btn-primary" onClick={finalizarCompra}>
          Finalizar compra
        </button>
        <button className="btn btn-warning" onClick={vaciarCarrito}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}