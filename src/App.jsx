import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './pages/Navbar'
import Inicio from './pages/Inicio'
import Resenas from './pages/Resenas'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import IniciarSesion from './pages/IniciarSesion'
import Pagar from './pages/Pagar'
import RutaProtegida from './pages/RutaProtegida'
import Footer from './pages/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "", email: "" });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/resenas' element={<Resenas />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:id' element={<DetalleProducto />} />
        <Route path='/productos/:categoria/:id' element={<DetalleProducto />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion
          setIsAuthenticated={setIsAuthenticated}
          setUsuario={setUsuario}
        />
        }
        />
        <Route path="/pagar" element={<RutaProtegida isAuthenticated={isAuthenticated}>
          <Pagar
            setIsAuthenticated={setIsAuthenticated}
            setUsuario={setUsuario}
            usuario={usuario}
          />
        </RutaProtegida>
        }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
