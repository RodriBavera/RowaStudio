import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("✅ Pago exitoso - Parámetros:", Object.fromEntries(searchParams));
    
    // Limpiar carrito si existe
    localStorage.removeItem('carrito');
  }, [searchParams]);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>¡Pago Exitoso!</h1>
        <p>Tu compra ha sido procesada correctamente.</p>
        <p>Recibirás un email de confirmación shortly.</p>
        
        <div className="success-actions">
          <Link to="/" className="btn btn-primary">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}