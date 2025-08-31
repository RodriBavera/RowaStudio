import React, { useState } from "react";

export default function Checkout({ carrito, onVolver, onEnviarPedido }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [metodoPago, setMetodoPago] = useState("WhatsApp");
  const [envio, setEnvio] = useState("Retiro en local");
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    let mensaje = `Pedido de ${nombre}\nTel: ${telefono}\nEmail: ${email}\nMétodo de pago: ${metodoPago}\nEnvío: ${envio}\nProductos:\n`;
    carrito.forEach((item) => {
      mensaje += `- ${item.nombre} x ${item.cantidad} = $${item.precio * item.cantidad}\n`;
    });

    const telefonoWspNegocio = "54911XXXXXXX"; // Cambiar por número real
    const urlWhatsapp = `https://api.whatsapp.com/send?phone=${telefonoWspNegocio}&text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, "_blank");

    setMensajeEnviado(true);
    onEnviarPedido();
  }

  if (mensajeEnviado) {
    return (
      <div className="container my-4">
        <h2>¡Gracias por tu pedido!</h2>
        <p>Te contactaremos a la brevedad para coordinar.</p>
        <button className="btn btn-primary" onClick={onVolver}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Finalizar compra</h2>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" required className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="tel" required className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Método de pago</label>
          <select className="form-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
            <option>WhatsApp</option>
            <option>Transferencia</option>
            <option>Mercado Pago</option>
            <option>Tarjeta en el local</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Método de envío</label>
          <select className="form-select" value={envio} onChange={(e) => setEnvio(e.target.value)}>
            <option>Retiro en local</option>
            <option>Envío a domicilio</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enviar pedido por WhatsApp</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onVolver}>Cancelar</button>
      </form>
    </div>
  );
}