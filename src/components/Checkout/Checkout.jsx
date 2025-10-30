import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: ""
  });

  const [carrito, setCarrito] = useState([]);
  const [formaPago, setFormaPago] = useState("");
  const [formaEnvio, setFormaEnvio] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        if (Array.isArray(carritoParseado) && carritoParseado.length > 0) {
          setCarrito(carritoParseado);
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
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
    // Validaciones
    if (!cliente.nombre || !cliente.email) {
      setMensaje("Por favor, completa tu nombre y email.");
      return;
    }

    if (!cliente.telefono) {
      setMensaje("Por favor, ingresa tu teléfono para contactarte.");
      return;
    }

    if (carrito.length === 0) {
      setMensaje("Tu carrito está vacío.");
      return;
    }

    if (!formaEnvio) {
      setMensaje("Selecciona una forma de envío.");
      return;
    }

    setMensaje("");
    setLoading(true);

    try {
      console.log("🔄 Iniciando proceso de pago...");

      // ✅ URL RELATIVA - funciona tanto en desarrollo como producción
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carrito,
          cliente,
          envio: formaEnvio,
          formaPago: "mercadopago"
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      console.log("✅ Preferencia creada:", data);

      if (data.id) {
        // Limpiar carrito antes de redirigir
        localStorage.removeItem('carrito');
        setCarrito([]);

        console.log("🎯 Redirigiendo a Mercado Pago...");
        
        // ✅ URL en español
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}&lang=es`;
      }

    } catch (error) {
      console.error("❌ Error:", error);
      setMensaje(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  // Si el carrito está vacío, mostrar mensaje
  if (carrito.length === 0) {
    return (
      <div className="checkout-container">
        <div className="carrito-vacio">
          <h2>Carrito Vacío</h2>
          <p>No hay productos en tu carrito.</p>
          <button
            onClick={() => navigate('/')}
            className="boton-volver"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>

      <div className="checkout-section">
        <h3>📋 Tus Datos</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo *"
          value={cliente.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico *"
          value={cliente.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono *"
          value={cliente.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección *"
          value={cliente.direccion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout-section">
        <h3>🚚 Forma de Envío</h3>
        <label>
          <input
            type="radio"
            name="envio"
            value="Envío a domicilio"
            checked={formaEnvio === "Envío a domicilio"}
            onChange={(e) => setFormaEnvio(e.target.value)}
          />
          Envío a domicilio (+$500)
        </label>
        <label>
          <input
            type="radio"
            name="envio"
            value="Retiro en el local"
            checked={formaEnvio === "Retiro en el local"}
            onChange={(e) => setFormaEnvio(e.target.value)}
          />
          Retiro en el local (Gratis)
        </label>
      </div>

      <div className="checkout-section">
        <h3>💳 Forma de Pago</h3>
        <label>
          <input
            type="radio"
            name="pago"
            value="mercadopago"
            checked={formaPago === "mercadopago"}
            onChange={(e) => setFormaPago(e.target.value)}
          />
          Mercado Pago (Tarjetas, Efectivo)
        </label>
      </div>

      <div className="checkout-section">
        <h3>🛒 Resumen de tu Pedido</h3>
        <div className="resumen-productos">
          {carrito.map((producto, index) => (
            <div key={index} className="producto-item">
              <span className="producto-nombre">{producto.nombre}</span>
              <span className="producto-cantidad">x{producto.cantidad}</span>
              <span className="producto-precio">${producto.precio * producto.cantidad}</span>
            </div>
          ))}
        </div>

        {formaEnvio === "Envío a domicilio" && (
          <div className="envio-costo">
            <span>Costo de envío:</span>
            <span>+$500</span>
          </div>
        )}

        <div className="total-final">
          <span>Total:</span>
          <span>${formaEnvio === "Envío a domicilio" ? total + 500 : total}</span>
        </div>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.includes('Error') ? 'error' : 'info'}`}>
          {mensaje}
        </div>
      )}

      <button
        onClick={handlePagar}
        disabled={loading}
        className="boton-pagar"
      >
        {loading ? "🔄 Procesando..." : `💳 Pagar $${formaEnvio === "Envío a domicilio" ? total + 500 : total}`}
      </button>

      <button
        onClick={() => navigate('/')}
        className="boton-secundario"
      >
        ← Seguir Comprando
      </button>
    </div>
  );
}