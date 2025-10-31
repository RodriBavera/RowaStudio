import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ Pago exitoso - Parámetros:", Object.fromEntries(searchParams));
    
    // Limpiar carritos
    const carritoPendiente = localStorage.getItem('carrito_pendiente');
    if (carritoPendiente) {
      console.log("🛒 Carrito procesado:", JSON.parse(carritoPendiente));
      localStorage.removeItem('carrito_pendiente');
    }
    
    localStorage.removeItem('carrito'); // Limpiar carrito principal
    
    // Redirigir después de mostrar el éxito
    const timer = setTimeout(() => {
      navigate('/tienda');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

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