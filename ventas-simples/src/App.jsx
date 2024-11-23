import React, { useState } from 'react';
import ProductList from "./components/ProductList";
import SellProduct from "./components/SellProduct";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoFruver from './assets/logo.png'; // Importa el logo

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
                <a className="navbar-brand" href="/">
                    <img src={LogoFruver} alt="Logo" style={{ width: '80px', marginRight: '10px' }} />
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                        <a className="nav-link" href="http://localhost:5175">PRODUCTOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:5176">PEDIDO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:5173">VENTA</a>

                        </li>
                    </ul>
                </div>
                {/* Botón de salir alineado a la derecha */}
                <button
                    className="btn btn-danger"
                    style={{ position: 'absolute', right: '10px' }}
                    onClick={() => {
                        window.location.href = 'http://localhost:5174/';
                    }}
                >
                    Salir
                </button>
            </nav>

            {/* Contenido principal */}
            <div className="container mt-5">
                <h1 className="text-center text-success mb-4">Sistema de Ventas</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {!selectedProduct ? (
                            <ProductList onSelectProduct={(product) => setSelectedProduct(product)} />
                        ) : (
                            <>
                                <SellProduct product={selectedProduct} />
                                <button
                                    className="btn btn-outline-secondary mt-3 w-100"
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Volver a la Lista
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Acerca de Fruver</h3>
            <p>
              Fruver es una empresa dedicada a la distribución de productos frescos de alta calidad.
              Nuestro compromiso es ofrecer lo mejor para nuestros clientes, garantizando siempre productos
              frescos y a precios competitivos.
            </p>
          </div>

          <div className="footer-section links">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/politica-privacidad">Política de Privacidad</a></li>
              <li><a href="/terminos">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contacto</h3>
            <p>Dirección: Cr 33 # 110 24, floridablanca, santander</p>
            <p>Email: <a href="mailto:contacto@fruver.com">Elmana@fruver.com</a></p>
            <p>Tel: +57 301 698 1025</p>
            <div className="social-links">
              <a href="https://www.facebook.com/portaldefrutas/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook"></i>
              </a>
            </div>
          </div>

          
        </div>

        <div className="footer-bottom">
          <p>© 2024 Elmana Fruver. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
    );
};

export default App;
