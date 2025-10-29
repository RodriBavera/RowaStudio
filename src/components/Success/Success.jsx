import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Success.css';

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('✅ Pago exitoso - Proceso completado');
    
    
    localStorage.removeItem('carrito');
    
    // Los datos del pago vienen en los parámetros de URL
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    
    console.log('Payment ID:', paymentId);
    console.log('Status:', status);

  }, [searchParams]);

  const handleVolverInicio = () => {
    navigate('/');
  };

  

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h1>¡Compra Exitosa!</h1>
        <p>Tu pedido ha sido procesado correctamente.</p>
        <p>Hemos enviado un email de confirmación con los detalles de tu compra.</p>
        <p className="success-details">
          <strong>Número de pedido:</strong> #{Date.now()}
        </p>
        
        <div className="success-buttons">
          <button 
            onClick={handleVolverInicio}
            className="btn btn-primary"
          >
            🏠 Volver al Inicio
          </button>
          <button 
            onClick={handleVerPedidos}
            className="btn btn-secondary"
          >
            📦 Ver Mis Pedidos
          </button>
        </div>
        
        <p className="success-note">
          Si tienes alguna duda, contáctanos por WhatsApp.
        </p>
      </div>
    </div>
  );
}