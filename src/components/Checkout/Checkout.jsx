// Checkout.jsx - VERSIÓN COMPLETA CORREGIDA
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "", email: "", telefono: "", direccion: ""
  });
  const [carrito, setCarrito] = useState([]);
  const [formaEnvio, setFormaEnvio] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        setCarrito(carritoParseado);
      } catch (error) {
        localStorage.removeItem('carrito');
      }
    }
  }, []);

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  const totalConEnvio = formaEnvio === "Envío a domicilio" ? total + 500 : total;

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handlePagar = async () => {
    if (!cliente.nombre || !cliente.email || !cliente.telefono) {
      setMensaje("Por favor, completa todos los datos requeridos.");
      return;
    }
    if (carrito.length === 0 || !formaEnvio) {
      setMensaje("Completa el carrito y selecciona envío.");
      return;
    }

    setMensaje("");
    setLoading(true);

    try {
      console.log("🔄 Iniciando pago con API Vercel...");
      
      // ✅ ESTA ES LA LÍNEA IMPORTANTE
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrito, cliente, envio: formaEnvio, formaPago: "mercadopago" }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      console.log("✅ Respuesta API:", data);

      if (data.id) {
        localStorage.removeItem('carrito');
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}&lang=es`;
      }

    } catch (error) {
      console.error("❌ Error:", error);
      setMensaje(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="checkout-container">
        <div className="carrito-vacio">
          <h2>Carrito Vacío</h2>
          <button onClick={() => navigate('/')} className="boton-volver">
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      {/* Tus secciones de formulario aquí */}
      <div className="checkout-section">
        <h3>📋 Tus Datos</h3>
        <input type="text" name="nombre" placeholder="Nombre *" value={cliente.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email *" value={cliente.email} onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono *" value={cliente.telefono} onChange={handleChange} required />
        <input type="text" name="direccion" placeholder="Dirección *" value={cliente.direccion} onChange={handleChange} required />
      </div>

      {/* ... resto de tu JSX ... */}
      
      <button onClick={handlePagar} disabled={loading} className="boton-pagar">
        {loading ? "🔄 Procesando..." : `💳 Pagar $${totalConEnvio}`}
      </button>

      {mensaje && <div className="mensaje error">{mensaje}</div>}
    </div>
  );
}