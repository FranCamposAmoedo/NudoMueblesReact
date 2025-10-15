import { useLocation, useNavigate } from "react-router-dom";

export default function Pagar({
    setIsAuthenticated,
    usuario,
    setUsuario,
}) {
    const location = useLocation();
    const navigate = useNavigate();

    // Datos del carrito
    const carrito = location.state?.carrito || [];
    // Calculo del total
    const total = carrito.reduce(
        (suma, producto) => suma + Number(producto.precio),
        0
    );

    // Función para finalizar compra
    const comprar = () => {
        alert("¡Compra realizada con éxito!");
        navigate("/productos");
    };

    // Función para cerrar sesión
    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUsuario({ nombre: "", email: "" });
    };

    return (
        <div style={{ padding: '3rem', paddingTop: '150px' }}>
            <div>
                <h2>{usuario.nombre}</h2>
                <p>Email: {usuario.email}</p>
                <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
                <hr />
            </div>

            <div>
                <h2>Tu compra:</h2>

                {carrito.map((producto) => (
                    <div className="flex gap-4 mb-4" key={producto.id}>
                        <img src={producto.avatar} alt={producto.nombre} width="60" />
                        <div className="flex flex-col">
                            <span>{producto.nombre}</span>
                            <strong>${producto.precio}</strong>
                        </div>
                    </div>
                ))}

                <h3 className="mb-3">Total a pagar: ${total}</h3>
            </div>

            <div className="flex gap-2">
                <button className="btn btn-success" onClick={comprar}>Confirmar y Pagar</button>
                <button className="btn btn-danger" onClick={() => navigate("/productos")}>Cancelar</button>
            </div>
        </div>
    );
}