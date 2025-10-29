import { useEffect } from 'react';

export default function Failure() {
  useEffect(() => {
    console.log('❌ Pago fallido');
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Pago Fallido ❌</h1>
      <p>Hubo un problema con tu pago. Intenta nuevamente.</p>
      <button onClick={() => window.location.href = '/checkout'}>
        Reintentar pago
      </button>
    </div>
  );
}