import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarritoCompras({ carrito, setCarrito }) {
    const navigate = useNavigate();

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const irAPagar = () => {
        navigate("/pagar", { state: { carrito } });
    };

    const total = carrito.reduce((sum, item) => sum + Number(item.precio), 0);

    return (
        <div style={{ paddingTop: '50px' }}>
            <hr />
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {carrito.map((item) => (
                        <div key={item.id}>
                            {item.nombre} - ${Number(item.precio).toFixed(3)}
                        </div>
                    ))}
                    <div>
                        <hr />
                        Total: ${Number(total).toFixed(3)}
                    </div>
                    <div className="flex justify-center gap-5" style={{ marginTop: '10px' }}>
                        <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar Carrito</button>
                        <button className="btn btn-success" onClick={irAPagar}>Pagar</button>
                    </div>
                </>
            )}
        </div>
    );
}