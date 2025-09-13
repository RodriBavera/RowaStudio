import React, { useState } from "react";
import "./Checkout.css";

export default function Checkout({ carrito, onVolver, onEnviarPedido }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [metodoPago, setMetodoPago] = useState("WhatsApp");
  const [envio, setEnvio] = useState("Retiro en local");
  const [direccion, setDireccion] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    let mensaje = `Pedido de ${nombre}\nTel: ${telefono}\nEmail: ${email}\nMétodo de pago: ${metodoPago}\nEnvío: ${envio}`;
    
    // Agregar dirección si es envío a domicilio
    if (envio === "Envío a domicilio" && direccion) {
      mensaje += `\nDirección: ${direccion}`;
    }
    
    mensaje += `\nProductos:\n`;
    carrito.forEach((item) => {
      mensaje += `- ${item.nombre} x ${item.cantidad} = $${item.precio * item.cantidad}\n`;
    });

    const telefonoWspNegocio = "542954315039"; 
    const urlWhatsapp = `https://api.whatsapp.com/send?phone=${telefonoWspNegocio}&text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, "_blank");

    setMensajeEnviado(true);
    onEnviarPedido();
  }

  if (mensajeEnviado) {
    return (
      <div className="checkout-container">
        <div className="container my-4">
          <div className="success-message">
            <h2>¡Gracias por tu pedido!</h2>
            <p>Te contactaremos a la brevedad para coordinar.</p>
            <button className="btn btn-primary" onClick={onVolver}>
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="checkout-card card shadow">
              <div className="checkout-header card-header bg-primary text-white">
                <h2 className="mb-0">Finalizar compra</h2>
              </div>
              <div className="card-body">
                <form onSubmit={manejarEnvio} className="checkout-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre completo *</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Teléfono *</label>
                      <input 
                        type="tel" 
                        required 
                        className="form-control" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Método de pago</label>
                      <select 
                        className="form-select" 
                        value={metodoPago} 
                        onChange={(e) => setMetodoPago(e.target.value)}
                      >
                        <option>WhatsApp</option>
                        <option>Transferencia</option>
                        <option>Mercado Pago</option>
                        <option>Tarjeta en el local</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Método de envío</label>
                      <select 
                        className="form-select" 
                        value={envio} 
                        onChange={(e) => setEnvio(e.target.value)}
                      >
                        <option>Retiro en local</option>
                        <option>Envío a domicilio</option>
                      </select>
                    </div>
                  </div>
                  
                  {envio === "Envío a domicilio" && (
                    <div className="mb-3 address-field">
                      <label className="form-label">Dirección de envío *</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control" 
                        placeholder="Ingresa tu dirección completa" 
                        value={direccion} 
                        onChange={(e) => setDireccion(e.target.value)} 
                      />
                      <div className="form-text">
                        Por favor incluye calle, número, piso/depto, y localidad.
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <h5>Resumen del pedido:</h5>
                    <div className="order-summary">
                      <ul className="list-group mb-3">
                        {carrito.map((item, index) => (
                          <li key={index} className="order-item list-group-item d-flex justify-content-between align-items-center">
                            <span>{item.nombre} x {item.cantidad}</span>
                            <span>${item.precio * item.cantidad}</span>
                          </li>
                        ))}
                        <li className="order-item order-total list-group-item d-flex justify-content-between align-items-center">
                          <strong>Total</strong>
                          <strong>$
                            {carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)}
                          </strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-4 button-group">
                    <button type="button" className="btn-checkout btn-secondary" onClick={onVolver}>
                      ← Volver al carrito
                    </button>
                    <button type="submit" className="btn-checkout btn-whatsapp">
                      <i className="bi bi-whatsapp"></i>
                      Enviar pedido por WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}