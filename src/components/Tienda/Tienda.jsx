import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import Catalogo from "../Catalogo/Catalogo";
import ProductoDetalle from "../ProductoDetalle/ProductoDetalle";
import Carrito from "../Carrito/Carrito";
import Checkout from "../Checkout/Checkout";

export default function Tienda() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [enCheckout, setEnCheckout] = useState(false);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Traer productos desde Firestore
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setCargando(true);
        setError(null);
        console.log('🔍 Intentando conectar a Firestore...');
        console.log('📦 Base de datos:', db);
        
        const productosRef = collection(db, 'productos');
        console.log('📋 Referencia a colección creada');
        
        const querySnapshot = await getDocs(productosRef);
        console.log('✅ Datos obtenidos:', querySnapshot.size, 'documentos');
        
        if (querySnapshot.empty) {
          console.warn('⚠️ La colección "productos" está vacía');
          setProductos([]);
          return;
        }
        
        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log('📊 Productos cargados:', productosData);
        setProductos(productosData);
        
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        console.error("Código de error:", error.code);
        console.error("Mensaje:", error.message);
        setError("Error al cargar productos: " + error.message);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Funciones de carrito
  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarProducto(id) {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
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

  // Vista normal para clientes
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
        <h1 className="m-0">Tienda Rowa Studio</h1>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => {
              setMostrarCarrito(!mostrarCarrito);
              setEnCheckout(false);
              setProductoSeleccionado(null);
            }}
          >
            🛒 Carrito ({carrito.length})
          </button>
        </div>
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
        <>
          {/* Estados de carga y error */}
          {cargando && (
            <div className="container my-4">
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando productos...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="container my-4">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {!cargando && !error && productos.length === 0 && (
            <div className="container my-4">
              <div className="alert alert-warning" role="alert">
                No hay productos disponibles. 
                <br />
                <small>Agrega productos desde la consola de Firebase.</small>
              </div>
            </div>
          )}

          {!cargando && !error && productos.length > 0 && (
            <Catalogo
              productos={productos}
              onSelectProducto={setProductoSeleccionado}
              onAgregarAlCarrito={agregarAlCarrito}
            />
          )}
        </>
      )}
    </div>
  );
}