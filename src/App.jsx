import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './pages/Navbar'
import Inicio from './pages/Inicio'
import Resenas from './pages/Resenas'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import IniciarSesion from './pages/IniciarSesion'
import Pagar from './pages/Pagar'
import Dashboard from './pages/Dashboard'
import RutaProtegida from './pages/RutaProtegida'
import FormularioProducto from './components/FormularioProducto'
import EliminarProducto from './components/EliminarProducto'
import Footer from './pages/Footer'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/resenas' element={<Resenas />} />
              <Route path='/productos' element={<Productos />} />
              <Route path='/productos/:id' element={<DetalleProducto />} />
              <Route path='/productos/:categoria/:id' element={<DetalleProducto />} />
              <Route path="/iniciar-sesion" element={<IniciarSesion />} />
              {/* RUTA PROTEGIDA - para Usuarios */}
              <Route path="/pagar" element={<RutaProtegida><Pagar /></RutaProtegida>} />

              {/* RUTA PROTEGIDA - para Admins */}
              <Route path="/dashboard" element={<RutaProtegida soloAdmin={true}><Dashboard /></RutaProtegida>} />

              {/* Ruta para formulario Agrega/Edita*/}
              <Route
                path="/formulario-producto"
                element={
                  <RutaProtegida>
                    <FormularioProducto />
                  </RutaProtegida>
                }
              />

              {/* Ruta para ELIMINAR producto */}
              <Route
                path="/eliminar-producto"
                element={
                  <RutaProtegida>
                    <EliminarProducto />
                  </RutaProtegida>
                }
              />

              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              draggable
              pauseOnHover
            />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>

    </>
  )
}

export default App
