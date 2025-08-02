import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const productosData = [
  {
    id: 1,
    nombre: "Crema Hidratante Facial",
    precio: 2500,
    categoria: "Hidratantes",
    img: "https://via.placeholder.com/150?text=Crema+Hidratante",
    descripcion:
      "Crema hidratante para todo tipo de piel, ayuda a mantener la piel suave y fresca.",
  },
  {
    id: 2,
    nombre: "Protector Solar SPF 50",
    precio: 3000,
    categoria: "Protectores",
    img: "https://via.placeholder.com/150?text=Protector+Solar",
    descripcion:
      "Protector solar con alta protección contra rayos UV, ideal para uso diario.",
  },
  {
    id: 3,
    nombre: "Limpiador Facial Suave",
    precio: 1800,
    categoria: "Limpieza",
    img: "https://via.placeholder.com/150?text=Limpiador+Facial",
    descripcion: "Limpiador facial suave que elimina impurezas sin resecar.",
  },
  {
    id: 4,
    nombre: "Serum Antiarrugas",
    precio: 4200,
    categoria: "Hidratantes",
    img: "https://via.placeholder.com/150?text=Serum+Antiarrugas",
    descripcion:
      "Serum concentrado para reducir arrugas y mejorar la elasticidad de la piel.",
  },
];

function Catalogo({ onSelectProducto, onAgregarAlCarrito }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = React.useState("");
  const categorias = [...new Set(productosData.map((p) => p.categoria))];

  const productosFiltrados = categoriaSeleccionada
    ? productosData.filter((p) => p.categoria === categoriaSeleccionada)
    : productosData;

  return (
    <div className="container my-4">
      <h2>Catálogo de productos</h2>

      <div className="mb-3">
        <label className="form-label fw-bold">Filtrar por categoría:</label>
        <select
          className="form-select"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productosFiltrados.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={producto.img}
                className="card-img-top"
                alt={producto.nombre}
                style={{ objectFit: "cover", height: "150px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-primary fw-bold">
                  ${producto.precio}
                </p>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => onSelectProducto(producto)}
                  >
                    Ver detalle
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => onAgregarAlCarrito(producto)}
                  >
                    + Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductoDetalle({ producto, onVolver, onAgregarAlCarrito }) {
  return (
    <div className="container my-4">
      <button className="btn btn-secondary mb-3" onClick={onVolver}>
        ← Volver al catálogo
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.img}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="text-primary fw-bold fs-4">${producto.precio}</p>
          <p>{producto.descripcion}</p>
          <button
            className="btn btn-success"
            onClick={() => onAgregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

function Carrito({
  carrito,
  onVaciar,
  onEliminarProducto,
  onVolverATienda,
  onFinalizarCompra,
}) {
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  if (carrito.length === 0) {
    return (
      <div className="container my-4">
        <h2>Carrito de compras</h2>
        <p>El carrito está vacío.</p>
        <button className="btn btn-secondary" onClick={onVolverATienda}>
          ← Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Carrito de compras</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio}</td>
              <td>${item.precio * item.cantidad}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onEliminarProducto(item.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ${total}</h4>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onVolverATienda}>
          ← Volver a la tienda
        </button>
        <button className="btn btn-primary" onClick={onFinalizarCompra}>
          Finalizar compra
        </button>
        <button className="btn btn-warning" onClick={onVaciar}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

function Checkout({ carrito, onVolver, onEnviarPedido }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [metodoPago, setMetodoPago] = useState("WhatsApp");
  const [envio, setEnvio] = useState("Retiro en local");
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    // Aquí podés armar el mensaje del pedido
    let mensaje = `Pedido de ${nombre}\nTel: ${telefono}\nEmail: ${email}\nMétodo de pago: ${metodoPago}\nEnvío: ${envio}\nProductos:\n`;
    carrito.forEach((item) => {
      mensaje += `- ${item.nombre} x ${item.cantidad} = $${item.precio * item.cantidad}\n`;
    });

    // Para simplificar, enviamos a WhatsApp con link
    const telefonoWspNegocio = "54911XXXXXXX"; // Cambiar por número real

    const urlWhatsapp = `https://api.whatsapp.com/send?phone=${telefonoWspNegocio}&text=${encodeURIComponent(
      mensaje
    )}`;

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
          <input
            type="text"
            required
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            required
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
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
        <div className="mb-3">
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
        <div className="mb-3">
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

        <button type="submit" className="btn btn-primary">
          Enviar pedido por WhatsApp
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onVolver}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default function Tienda() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [enCheckout, setEnCheckout] = useState(false);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((carritoPrev) => {
      const existe = carritoPrev.find((p) => p.id === producto.id);
      if (existe) {
        return carritoPrev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...carritoPrev, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarProducto(id) {
    setCarrito((carritoPrev) => carritoPrev.filter((p) => p.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function manejarFinalizarCompra() {
    setMostrarCarrito(false);
    setEnCheckout(true);
  }

  function manejarVolver() {
    setProductoSeleccionado(null);
    setEnCheckout(false);
    setMostrarCarrito(false);
  }

  function manejarPedidoEnviado() {
    setCarrito([]);
    setEnCheckout(false);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
        <h1 className="m-0">Tienda Rowa Studio</h1>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setMostrarCarrito(!mostrarCarrito);
            setEnCheckout(false);
            setProductoSeleccionado(null);
          }}
        >
          🛒 Carrito ({carrito.length})
        </button>
      </div>

      {enCheckout ? (
        <Checkout
          carrito={carrito}
          onVolver={manejarVolver}
          onEnviarPedido={manejarPedidoEnviado}
        />
      ) : mostrarCarrito ? (
        <Carrito
          carrito={carrito}
          onVaciar={vaciarCarrito}
          onEliminarProducto={eliminarProducto}
          onVolverATienda={() => setMostrarCarrito(false)}
          onFinalizarCompra={manejarFinalizarCompra}
        />
      ) : productoSeleccionado ? (
        <ProductoDetalle
          producto={productoSeleccionado}
          onVolver={() => setProductoSeleccionado(null)}
          onAgregarAlCarrito={agregarAlCarrito}
        />
      ) : (
        <Catalogo
          onSelectProducto={setProductoSeleccionado}
          onAgregarAlCarrito={agregarAlCarrito}
        />
      )}
    </div>
  );
}
