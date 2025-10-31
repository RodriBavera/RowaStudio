import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "", email: "", telefono: "", direccion: ""
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
    // Validaciones (tu código actual)
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

      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carrito,
          cliente,
          envio: formaEnvio,
          formaPago: "mercadopago"
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ Preferencia creada:", data);

      if (data.id) {
        console.log("🎯 Redirigiendo a Mercado Pago...");
        
        // GUARDA EL CARRITO TEMPORALMENTE PARA SUCCESS/FALLURE
        localStorage.setItem('carrito_pendiente', JSON.stringify(carrito));
        
        // Redirige a MercadoPago - esto abre en nueva ventana/pestaña
        window.open(
          `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}&lang=es`,
          '_blank'
        );
        
        // Opcional: muestra mensaje de que se abrió MercadoPago
        setMensaje("Se abrió Mercado Pago en una nueva ventana. Completa el pago allí.");
        setLoading(false);
      }

    } catch (error) {
      console.error("❌ Error completo:", error);
      setMensaje(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  // Resto de tu componente igual...
  if (carrito.length === 0) {
    return (
      <div className="checkout-container">
        <div className="carrito-vacio">
          <h2>Carrito Vacío</h2>
          <p>No hay productos en tu carrito.</p>
          <button onClick={() => navigate('/tienda')} className="boton-volver">
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {/* ... tu JSX actual ... */}
      
      <button onClick={handlePagar} disabled={loading} className="boton-pagar">
        {loading ? "🔄 Procesando..." : `💳 Pagar $${totalConEnvio}`}
      </button>

      <button onClick={() => navigate('/tienda')} className="boton-secundario">
        ← Seguir Comprando
      </button>
    </div>
  );
}