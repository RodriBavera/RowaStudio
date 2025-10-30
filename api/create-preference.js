// api/create-preference.js
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Para Vercel Serverless, necesitamos una versión compatible
// Si no funciona, usaremos fetch directo a la API

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { carrito, cliente, envio } = req.body;
    
    console.log('🛒 Procesando carrito con', carrito?.length, 'productos');
    
    // Validaciones
    if (!carrito || carrito.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalConEnvio = envio === "Envío a domicilio" ? total + 500 : total;

    console.log('💰 Total calculado:', totalConEnvio);

    // ✅ OPCIÓN A: Usar fetch directo a la API de Mercado Pago (MÁS CONFIABLE)
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{
          title: carrito.length === 1 ? carrito[0].nombre : `Compra de ${carrito.length} productos`,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: totalConEnvio,
        }],
        back_urls: {
          success: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://tu-app.vercel.app'}/success`,
          failure: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://tu-app.vercel.app'}/failure`,
          pending: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://tu-app.vercel.app'}/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'ROWASTUDIO'
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`MercadoPago API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    console.log('✅ Preferencia creada:', data.id);

    return res.status(200).json({
      success: true,
      id: data.id,
      init_point: data.init_point,
      message: 'Preferencia creada correctamente'
    });

  } catch (error) {
    console.error('💥 Error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}