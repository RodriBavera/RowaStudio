import { Routes, Route  } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from "./components/Footer/Footer"
import Home from './pages/Home'
import Tienda from "./components/Tienda/Tienda"
import Contacto from "./components/Contacto/Contacto"
import Servicios from "./components/Servicios/Servicios"
import SobreMi from "./components/SobreMi/SobreMi"



const App = () => {
  return (
   <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
