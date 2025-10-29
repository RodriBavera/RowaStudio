import { Routes, Route  } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from "./components/Footer/Footer"
import Home from './pages/Home'
import Tienda from "./components/Tienda/Tienda"
import Contacto from "./components/Contacto/Contacto"
import Servicios from "./components/Servicios/Servicios"
import SobreMi from "./components/SobreMi/SobreMi"
import Success from "./components/Success/Success"
import Failure from "./components/Failure/Failure"


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
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
