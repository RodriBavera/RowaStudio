import { MercadoPagoConfig, Preference } from "mercadopago";

// Configura CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({}, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Método no permitido' 
    }, { headers: corsHeaders });
  }

  try {
    const { carrito, cliente, envio, formaPago } = req.body;
    
    console.log('📦 Recibiendo datos del carrito:', carrito);
    console.log('👤 Datos del cliente:', cliente);

    // Validaciones básicas
    if (!carrito || carrito.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'El carrito está vacío'
      }, { headers: corsHeaders });
    }

    if (!cliente || !cliente.email || !cliente.nombre) {
      return res.status(400).json({
        success: false,
        error: 'Datos del cliente incompletos'
      }, { headers: corsHeaders });
    }

    // Inicializar cliente de Mercado Pago
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.MP_ACCESS_TOKEN 
    });

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    console.log('💰 Total calculado:', total);

    // Determinar la URL base
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://rowa-studio.vercel.app/'; 

    const body = {
      items: [{
        title: carrito.length === 1 
          ? carrito[0].nombre 
          : `Compra de ${carrito.length} productos en RowaStudio`,
        quantity: 1,
        currency_id: "ARS",
        unit_price: total,
      }],
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`, 
        pending: `${baseUrl}/pending`,
      },
      auto_return: "approved",
      payer: {
        name: cliente.nombre,
        email: cliente.email,
        phone: {
          number: cliente.telefono || "1112345678"
        },
        address: {
          street_name: cliente.direccion || "No especificada",
          zip_code: "1001"
        }
      },
      payment_methods: {
        excluded_payment_types: [
          { id: "atm" }
        ],
        installments: 1
      },
      notification_url: `${baseUrl}/api/webhooks`, // Opcional para webhooks
      statement_descriptor: "ROWASTUDIO",
      metadata: {
        client_name: cliente.nombre,
        client_email: cliente.email,
        products_count: carrito.length,
        total_amount: total
      }
    };

    console.log('🎯 Creando preferencia con datos:', JSON.stringify(body, null, 2));

    const preference = new Preference(client);
    const result = await preference.create({ body });

    console.log('✅ Preferencia creada exitosamente:', result.id);

    res.status(200).json({
      success: true,
      id: result.id,
      init_point: result.init_point,
      message: 'Preferencia creada correctamente'
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('💥 Error creando preferencia:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { headers: corsHeaders });
  }
}