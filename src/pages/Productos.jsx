import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarritoCompras from "./Carrito";
import datosProductos from "../assets/productos.json";

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        try {
            setProductos(datosProductos.productos);
            setCargando(false);

        } catch (error) {
            console.error("Error:", error);
            setError("Hubo un problema al cargar los productos.");
            setCargando(false);
        }
    }, []);


    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
        alert(`Producto ${producto.nombre} agregado al carrito`);
    }

    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main style={{ padding: '3rem', paddingTop: '150px' }}>
            <section className="container-lg text-center destacados">
                <h2>Nuestros productos</h2>

                <ul className="flex-container" id="lista-productos">
                    {productos.map((producto) => (
                        <li className="card" style={{ width: '18rem' }} key={producto.id}>
                            <img className="card-img-top" src={producto.avatar} alt={producto.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <h4>Precio: ${producto.precio}</h4>
                                <Link className="btn btn-outline-info" to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{ producto }}><button>Más detalles</button></Link>
                                <button className="comprar btn btn-outline-success" onClick={() => agregarAlCarrito(producto)}>Comprar</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <CarritoCompras carrito={carrito} setCarrito={setCarrito} />
            </section>
        </main>

    );
}