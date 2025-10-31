// Checkout.jsx - VERSIÓN SIMPLIFICADA
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const handlePagar = async () => {
    if (carrito.length === 0) return;
    
    setLoading(true);

    try {
      const cliente = {
        nombre: "Cliente", // En un caso real, esto vendría de un formulario
        email: "cliente@ejemplo.com",
        telefono: "123456789",
        direccion: "Dirección ejemplo"
      };

      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carrito,
          cliente,
          envio: "Retiro en el local"
        }),
      });

      if (!res.ok) throw new Error('Error al crear preferencia');

      const data = await res.json();
      
      if (data.init_point) {
        // ✅ GUARDAMOS EL CARRITO TEMPORALMENTE
        localStorage.setItem('carrito_pendiente', JSON.stringify(carrito));
        
        // ✅ ABRIMOS MERCADOPAGO EN NUEVA PESTAÑA
        window.open(data.init_point, '_blank');
        
        // ✅ ESPERAMOS A QUE EL USUARIO VUELVA MANUALMENTE
        alert("Se abrió Mercado Pago en una nueva pestaña. Cuando termines el pago, vuelve aquí y haz click en 'Verificar Pago'.");
        
        setLoading(false);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  const verificarPago = () => {
    // ✅ CUANDO EL USUARIO VUELVE MANUALMENTE
    const carritoPendiente = localStorage.getItem('carrito_pendiente');
    
    if (carritoPendiente) {
      // Limpiar todo y redirigir a éxito
      localStorage.removeItem('carrito');
      localStorage.removeItem('carrito_pendiente');
      navigate('/success');
    } else {
      alert("No hay pagos pendientes por verificar.");
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container my-4">
        <h2>Carrito Vacío</h2>
        <button onClick={() => navigate('/tienda')} className="btn btn-primary">
          Volver a la Tienda
        </button>
      </div>
    );
  }

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  return (
    <div className="container my-4">
      <h2>Finalizar Compra</h2>
      
      <div className="card p-3 mb-3">
        <h4>Resumen del Pedido</h4>
        {carrito.map((item, index) => (
          <div key={index} className="d-flex justify-content-between">
            <span>{item.nombre} x{item.cantidad}</span>
            <span>${item.precio * item.cantidad}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <button
        onClick={handlePagar}
        disabled={loading}
        className="btn btn-success btn-lg w-100 mb-2"
      >
        {loading ? "🔄 Procesando..." : "💳 Pagar con Mercado Pago"}
      </button>

      <button
        onClick={verificarPago}
        className="btn btn-primary btn-lg w-100 mb-2"
      >
        ✅ Verificar Pago
      </button>

      <button
        onClick={() => navigate('/tienda')}
        className="btn btn-secondary w-100"
      >
        ← Seguir Comprando
      </button>

      <div className="mt-3 p-3 bg-light rounded">
        <small>
          💡 <strong>Instrucciones:</strong><br/>
          1. Haz click en "Pagar con Mercado Pago"<br/>
          2. Completa el pago en la nueva pestaña<br/>
          3. Vuelve a esta pestaña<br/>
          4. Haz click en "Verificar Pago"<br/>
        </small>
      </div>
    </div>
  );
}