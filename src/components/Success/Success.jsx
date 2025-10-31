import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("✅ Pago exitoso - URL completa:", window.location.href);
    
    // Obtener parámetros del hash o de la URL
    const urlParams = new URLSearchParams(window.location.search);
    console.log("📊 Parámetros de pago:", Object.fromEntries(urlParams));
    
    // Limpiar carritos
    localStorage.removeItem('carrito_pendiente');
    localStorage.removeItem('carrito');
    
    // Redirigir después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/tienda');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>¡Pago Exitoso!</h1>
        <p>Tu compra ha sido procesada correctamente.</p>
        <p>Recibirás un email de confirmación shortly.</p>
        <p className="redirect-message">Serás redirigido a la tienda en 5 segundos...</p>
        
        <div className="success-actions">
          <button onClick={() => navigate('/tienda')} className="btn btn-primary">
            Volver a la tienda ahora
          </button>
        </div>
      </div>
    </div>
  );
}