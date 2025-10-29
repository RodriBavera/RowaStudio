import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function enviarEmail(cliente, carrito, total) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const productosHTML = carrito
    .map(
      (item) =>
        `<li>${item.nombre} x ${item.cantidad} = $${item.precio * item.cantidad}</li>`
    )
    .join("");

  const html = `
    <h2>¡Gracias por tu compra, ${cliente.nombre}! 💖</h2>
    <p>Tu pago con <b>Mercado Pago</b> fue aprobado correctamente.</p>
    <p>Detalles del pedido:</p>
    <ul>${productosHTML}</ul>
    <p><b>Total:</b> $${total}</p>
    <p>El equipo de <b>Rowa Studio</b> se comunicará con vos para coordinar la entrega.</p>
  `;

  await transporter.sendMail({
    from: `"Rowa Studio" <${process.env.EMAIL_USER}>`,
    to: cliente.email,
    subject: "Confirmación de compra - Pago aprobado ✔️",
    html,
  });

  console.log(`✉️ Email enviado a ${cliente.email}`);
}
