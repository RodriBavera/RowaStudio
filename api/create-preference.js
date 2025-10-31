// pages/api/create-preference.js
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
    console.log('📦 Productos en carrito:', carrito.length);
    console.log('👤 Cliente:', cliente.nombre);

    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) {
      console.error('❌ MP_ACCESS_TOKEN no configurado');
      throw new Error('MP_ACCESS_TOKEN no configurado en Vercel');
    }

    console.log('🔑 Token MP encontrado');

    // OBTENER LA URL BASE DINÁMICAMENTE - CON HASH ROUTES
    const baseUrl = req.headers.origin || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000');

    console.log('🌐 URL Base configurada:', baseUrl);

    // Crear items para Mercado Pago
    const items = carrito.map(item => ({
      title: item.nombre,
      quantity: item.cantidad,
      currency_id: 'ARS',
      unit_price: item.precio,
    }));

    // Si hay muchos items, crear un resumen
    const itemsForMP = carrito.length > 1 ? [
      {
        title: `Compra de ${carrito.length} productos en RowaStudio`,
        quantity: 1,
        currency_id: 'ARS',
        unit_price: totalConEnvio,
      }
    ] : items;

    console.log('🛒 Items para MP:', itemsForMP);

    // Crear preferencia usando fetch a la API de Mercado Pago
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mpToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: itemsForMP,
        payer: {
          name: cliente.nombre,
          email: cliente.email,
          phone: {
            number: cliente.telefono
          },
          address: {
            street_name: cliente.direccion
          }
        },
        // USAR HASH ROUTES - Esto siempre funciona sin configuración de servidor
        back_urls: {
          success: `${baseUrl}/#success`,
          failure: `${baseUrl}/#failure`,
          pending: `${baseUrl}/#pending`,
        },
        auto_return: 'approved',
        notification_url: process.env.VERCEL_URL ? 
          `https://${process.env.VERCEL_URL}/api/webhook` : null,
        statement_descriptor: 'ROWASTUDIO',
        external_reference: `order_${Date.now()}_${cliente.nombre.replace(/\s+/g, '_')}`,
        metadata: {
          customer_name: cliente.nombre,
          customer_email: cliente.email,
          customer_phone: cliente.telefono,
          delivery_type: envio,
          product_count: carrito.length,
          total_amount: totalConEnvio
        }
      }),
    });

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text();
      console.error('❌ Error de Mercado Pago:', mpResponse.status, errorText);
      throw new Error(`Error de Mercado Pago: ${mpResponse.status} - ${errorText}`);
    }

    const mpData = await mpResponse.json();
    
    console.log('✅ Preferencia creada exitosamente:', mpData.id);
    console.log('🔗 Init Point:', mpData.init_point);
    console.log('🔄 URLs de retorno configuradas con hash routes');
    console.log('📋 External Reference:', mpData.external_reference);

    return res.status(200).json({
      success: true,
      id: mpData.id,
      init_point: mpData.init_point,
      sandbox_init_point: mpData.sandbox_init_point,
      external_reference: mpData.external_reference,
      message: 'Preferencia creada correctamente'
    });

  } catch (error) {
    console.error('💥 Error en API:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message,
      details: 'Error al crear preferencia de pago',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}