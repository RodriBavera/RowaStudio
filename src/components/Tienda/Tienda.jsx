import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← AÑADE ESTO
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import Catalogo from "../Catalogo/Catalogo";

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ← HOOK DE NAVEGACIÓN

  // Obtener carrito desde localStorage
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Traer productos desde Firestore (tu código actual)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setCargando(true);
        setError(null);
        const productosRef = collection(db, 'productos');
        const querySnapshot = await getDocs(productosRef);
        
        if (querySnapshot.empty) {
          setProductos([]);
          return;
        }
        
        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProductos(productosData);
        
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        setError("Error al cargar productos: " + error.message);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Función para ver carrito
  const verCarrito = () => {
    navigate('/carrito'); // ← Navegación real
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
        <h1 className="m-0">Tienda Rowa Studio</h1>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={verCarrito} // ← USA LA FUNCIÓN
          >
            🛒 Carrito ({carrito.length})
          </button>
        </div>
      </div>

      {/* Solo muestra el catálogo aquí */}
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
          onAgregarAlCarrito={(producto) => {
            setCarrito((prev) => {
              const existe = prev.find((p) => p.id === producto.id);
              if (existe) {
                return prev.map((p) =>
                  p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
              }
              return [...prev, { ...producto, cantidad: 1 }];
            });
          }}
        />
      )}
    </div>
  );
}