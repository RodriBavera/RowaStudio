// success.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        // Obtener datos del pago de los query params
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const externalReference = searchParams.get('external_reference');
        
        console.log('✅ Parámetros recibidos:', {
            paymentId,
            status,
            externalReference
        });

        if (paymentId) {
            // Opcional: Verificar el pago con tu backend
            verificarPago(paymentId);
        }

        // Limpiar carrito y hacer otras acciones post-pago
        limpiarCarrito();
    }, [searchParams]);

    const verificarPago = async (paymentId) => {
        try {
            const response = await fetch(`/api/verificar-pago/${paymentId}`);
            const data = await response.json();
            setPaymentData(data);
        } catch (error) {
            console.error('Error verificando pago:', error);
        }
    };

    const limpiarCarrito = () => {
        // Tu lógica para limpiar el carrito
        localStorage.removeItem('carrito');
    };

    return (
        <div className="success-page">
            <div className="success-container">
                <div className="success-icon">✅</div>
                <h1>¡Pago Exitoso!</h1>
                <p>Tu compra ha sido procesada correctamente.</p>
                
                {paymentData && (
                    <div className="payment-details">
                        <p><strong>ID de pago:</strong> {paymentData.id}</p>
                        <p><strong>Estado:</strong> {paymentData.status}</p>
                        <p><strong>Monto:</strong> ${paymentData.transaction_amount}</p>
                    </div>
                )}
                
                <div className="success-actions">
                    <Link to="/" className="btn btn-primary">
                        Volver a la tienda
                    </Link>
                    <button onClick={() => window.print()} className="btn btn-secondary">
                        Imprimir comprobante
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;