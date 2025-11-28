import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';


export default function Pagar() {
    const { usuario, cerrarSesion } = useAuthContext();
    const { carrito, total, vaciarCarrito, agregarCantidad, quitarCantidad } = useCartContext();
    const navigate = useNavigate();


    const tokenActual = localStorage.getItem('authToken');


    // Función para finalizar compra
    const comprar = () => {
        alert("¡Compra realizada con éxito!");
        vaciarCarrito(); // Limpiar carrito después de comprar
        navigate("/productos");
    };

    return (
        <div style={{ padding: '3rem', paddingTop: '150px' }}>
            <div>
                <h2>Hola {usuario.nombre}</h2>
                <p>Email: {usuario.email}</p>
                {/* Estilo para el Token */}
                <div style={{
                    background: '#f0f0f0',
                    padding: '8px',
                    borderRadius: '4px',
                    margin: '10px 0',
                    fontSize: '12px',
                    wordBreak: 'break-all'
                }}>
                    <strong>Token:</strong> {tokenActual}
                </div>
                <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
                <hr />
            </div>

            <div className="d-flex justify-center flex-col text-center">
                <h2 className="my-3">Tu compra:</h2>
                {carrito.length > 0 ? (
                    <>
                        {carrito.map((producto) => {
                            const cantidad = Number(producto.cantidad || 1);
                            const precioUnitario = Number(producto.precio || 0);
                            const subtotal = cantidad * precioUnitario;
                            return (
                                <div className="border border-black rounded-xl flex justify-center items-center gap-5 my-2 py-5 mx-auto" key={producto.id}>
                                    <img src={producto.avatar} alt={producto.nombre} width="20%" />
                                    <div className="flex flex-col items-center justify-center">
                                        <span>{producto.nombre}</span>
                                        <strong>Precio unidad: ${Number(precioUnitario).toFixed(2)}</strong>
                                        <div className="d-flex items-center gap-6 my-2">
                                            <button className="btn btn-outline-danger" onClick={() => quitarCantidad(producto.id)}>-</button>
                                            <div className="border-bottom">{cantidad}</div>
                                            <button className="btn btn-outline-success" onClick={() => agregarCantidad(producto.id)}>+</button>
                                        </div>
                                        <div className="mb-4"><strong>Subtotal: ${Number(subtotal).toFixed(2)}</strong></div>
                                    </div>
                                </div>
                            );
                        })}
                        <h3 className="my-3">Total a pagar: ${Number(total).toFixed(2)}</h3>
                    </>
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
            <div className="flex justify-center my-2">
                <button className="my-2 btn btn-secondary" onClick={vaciarCarrito}>
                    Vaciar Carrito
                </button>
            </div>

            <div className="flex justify-center gap-2">
                <button className="btn btn-danger" onClick={() => navigate("/productos")}>
                    {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
                </button>
                {carrito.length > 0 && (
                    <button className="btn btn-success" onClick={comprar}>
                        Confirmar y Pagar
                    </button>
                )}
            </div>
        </div>
    );
}