import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
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
                    </ul>
                </div>
            </nav>
        </header>

    )
}

export default Navbar