import { Link } from "react-router-dom";
import banner from "../assets/RowaStudioBanner2.jpg";

export default function Home() {
  return (
    <div className="home">
      <div className="banner-container">
        <img src={banner} alt="Rowa Studio Banner" className="banner" />
        <div className="banner-text">
          <h1>Bienvenidos a RowaStudio</h1>
          <h2>Estética avanzada para tu bienestar</h2>
          <p>Descubrí nuestros servicios y productos exclusivos</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/tienda" className="btn btn-primary btn-lg">
              Ir a la tienda
            </Link>
            <Link to="/servicios" className="btn btn-outline-light btn-lg">
              Conocer servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
