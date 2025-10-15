import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function IniciarSesion({ setIsAuthenticated, setUsuario }) {
    const navigate = useNavigate();
    const ubicacion = useLocation();

    const [formulario, setFormulario] = useState({ nombre: '', email: '' });


    const manejarEnvio = (e) => {
        e.preventDefault();
        if (formulario.nombre && formulario.email) {
            setIsAuthenticated(true);
            setUsuario(formulario);

            // Si venía del carrito, redirige a pagar
            if (ubicacion.state?.carrito) {
                navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
            } else {
                navigate('/productos');
            }
        } else {
            alert('Completa todos los datos');
        }
    };

    return (
        <div className="flex justify-center flex-column text-center" style={{ padding: '3rem', paddingTop: '150px' }}>
            <h1 className="text-black">Inicia sesión para continuar</h1>
            <form className="text-center m-auto" onSubmit={manejarEnvio}>
                <input className="input-group-text"
                    type="text"
                    placeholder="Nombre completo"
                    value={formulario.nombre}
                    onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                    required
                />
                <input className="input-group-text mb-2"
                    type="email"
                    placeholder="Email"
                    value={formulario.email}
                    onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                    required
                />
                <button className="btn btn-success" type="submit">Iniciar Sesión</button>
                <strong> </strong>
                <button className="btn btn-danger" type="button" onClick={() => navigate('/productos')}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}