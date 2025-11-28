import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
    const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
    const { vaciarCarrito, carrito } = useCartContext();
    const navigate = useNavigate();

    const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

    const manejarCerrarSesion = () => {
        navigate("/productos");
        setTimeout(() => {
            vaciarCarrito();
            cerrarSesion();
        }, 100);
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-lg">
                    <Link className="navbar-brand" to="/"
                    ><img src="/images/LogoNudo.png"
                        /></Link>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/resenas">Reseñas</Link></li>
                        {usuario?.nombre === "admin" && (
                            <li className="nav-item">
                                <Link to="/formulario-producto" className="nav-link">Agregar Producto</Link>
                            </li>
                        )}
                    </ul>
                    <section className="d-flex align-items-center gap-3 justify-content-end">
                        <div>
                            <Link to="/pagar" className="nav-link d-flex align-items-center">
                                <FaShoppingCart />
                                {totalItemsCarrito > 0 && (
                                    <div className="relative top-[-5px] right-[-2px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {totalItemsCarrito}
                                    </div>
                                )}
                            </Link>
                        </div>

                        {isAuthenticated ? (
                            <div className="d-flex align-items-center gap-3">
                                <h2 className='text-sm font-bold mb-0'>Hola, {usuario.nombre}</h2>

                                {usuario.nombre === "admin" && (
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                )}

                                <button onClick={manejarCerrarSesion} className="btn btn-secondary btn-sm">
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <Link to="/iniciar-sesion" className="nav-link text-[#000000a6]">Iniciar Sesión</Link>
                        )}
                    </section>
                </div>
            </nav>
        </header>

    )
}

export default Navbar;