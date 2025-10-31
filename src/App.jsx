// App.jsx
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/Header'
import Footer from "./components/Footer/Footer"
import Home from './pages/Home'
import Tienda from "./components/Tienda/Tienda"
import Contacto from "./components/Contacto/Contacto"
import Servicios from "./components/Servicios/Servicios"
import SobreMi from "./components/SobreMi/SobreMi"
import Success from "./components/Success/Success"
import Failure from "./components/Failure/Failure"
import Checkout from "./components/Checkout/Checkout"
import Carrito from "./components/Carrito/Carrito"

// Componente para manejar hash routes
function HashHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 HashHandler - Location:', location);
    console.log('🔍 HashHandler - Hash:', location.hash);
    
    // Manejar hash changes cuando MercadoPago redirige
    if (location.hash === '#success') {
      console.log('🎯 Redirigiendo a /success desde hash');
      navigate('/success', { replace: true });
    } else if (location.hash === '#failure') {
      console.log('🎯 Redirigiendo a /failure desde hash');
      navigate('/failure', { replace: true });
    } else if (location.hash === '#pending') {
      console.log('🎯 Redirigiendo a /success desde hash pending');
      navigate('/success', { replace: true });
    }
  }, [location.hash, navigate]);

  return null;
}

const App = () => {
  return (
   <>
      <Header />
      <HashHandler /> {/* ← Componente para manejar hash routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App