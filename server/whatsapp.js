import dotenv from "dotenv";

dotenv.config();

export function enviarWhatsapp(cliente, carrito, total, envio) {
  const telefonoNegocio = process.env.TELEFONO_WSP_VENDEDOR;
  const productos = carrito
    .map(
      (item) =>
        `- ${item.nombre} x ${item.cantidad} = $${item.precio * item.cantidad}`
    )
    .join("\n");

  const mensaje = `
🛍️ *Nuevo pedido pagado con Mercado Pago*
👤 *Cliente:* ${cliente.nombre}
📧 *Email:* ${cliente.email}
🚚 *Forma de envío:* ${envio}
💰 *Total:* $${total}

📦 *Productos:*
${productos}
  `;

  const url = `https://api.whatsapp.com/send?phone=${telefonoNegocio}&text=${encodeURIComponent(
    mensaje
  )}`;

  console.log(`📲 Enviar este link al vendedor: ${url}`);
}
