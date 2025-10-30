
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
    console.log('📨 API recibió request');
    
    const { carrito, cliente, envio } = req.body;
    
    // Validaciones básicas
    if (!carrito || carrito.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    if (!cliente || !cliente.nombre || !cliente.email) {
      return res.status(400).json({ error: 'Datos del cliente incompletos' });
    }

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalConEnvio = envio === "Envío a domicilio" ? total + 500 : total;

    console.log('💰 Total:', totalConEnvio);

    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) {
      throw new Error('MP_ACCESS_TOKEN no configurado en Vercel');
    }

    console.log('🔑 Token MP encontrado');

    // Crear preferencia usando fetch a la API de Mercado Pago
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mpToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: carrito.length === 1 
              ? carrito[0].nombre 
              : `Compra de ${carrito.length} productos en RowaStudio`,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: totalConEnvio,
          }
        ],
        back_urls: {
          success: `https://${process.env.VERCEL_URL}/success`,
          failure: `https://${process.env.VERCEL_URL}/failure`,
          pending: `https://${process.env.VERCEL_URL}/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'ROWASTUDIO'
      }),
    });

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text();
      console.error('❌ Error de Mercado Pago:', mpResponse.status, errorText);
      throw new Error(`Error de Mercado Pago: ${mpResponse.status}`);
    }

    const mpData = await mpResponse.json();
    
    console.log('✅ Preferencia creada exitosamente:', mpData.id);

    return res.status(200).json({
      success: true,
      id: mpData.id,
      init_point: mpData.init_point,
      message: 'Preferencia creada correctamente'
    });

  } catch (error) {
    console.error('💥 Error en API:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message,
      details: 'Verifica las variables de entorno en Vercel'
    });
  }
}