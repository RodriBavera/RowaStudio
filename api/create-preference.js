// pages/api/create-preference.js
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { carrito, cliente, envio } = req.body;
    
    if (!carrito || carrito.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalConEnvio = envio === "Envío a domicilio" ? total + 500 : total;

    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) throw new Error('MP_ACCESS_TOKEN no configurado');

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mpToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{
          title: carrito.length === 1 ? carrito[0].nombre : `Compra de ${carrito.length} productos`,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: totalConEnvio,
        }],
        
        auto_return: "all",
      }),
    });

    if (!mpResponse.ok) throw new Error(`Error de Mercado Pago: ${mpResponse.status}`);

    const mpData = await mpResponse.json();
    
    return res.status(200).json({
      success: true,
      id: mpData.id,
      init_point: mpData.init_point
    });

  } catch (error) {
    console.error('Error en API:', error);
    return res.status(500).json({ error: error.message });
  }
}