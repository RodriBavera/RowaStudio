import { Link, useSearchParams } from "react-router-dom";

export default function Failure() {
  const [searchParams] = useSearchParams();

  return (
    <div className="failure-page">
      <div className="failure-container">
        <div className="failure-icon">❌</div>
        <h1>Pago Fallido</h1>
        <p>Hubo un problema con tu pago. Por favor, intenta nuevamente.</p>
        
        {searchParams.get('status') && (
          <p className="error-details">
            Estado: {searchParams.get('status')}
          </p>
        )}
        
        <div className="failure-actions">
          <Link to="/checkout" className="btn btn-primary">
            Reintentar pago
          </Link>
          <Link to="/" className="btn btn-secondary">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}