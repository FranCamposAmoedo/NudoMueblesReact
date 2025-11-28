import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useState, useEffect } from "react";

export default function Productos() {
    const { productos, cargando, error } = useProducts();
    const { agregarAlCarrito } = useCartContext();
    const { esAdmin } = useAuthContext();
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        document.title = "Nudo Muebles | Productos";

        // Función para actualizar meta tags
        const updateMetaTag = (name, content, attribute = 'name') => {
            let meta = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        // Meta tags básicos
        updateMetaTag('description', 'Explora el catálogo de muebles. Encuentra sillas, mesas, estantes y mucho más.');
        updateMetaTag('keywords', 'muebles, madera, hierro, sillas, mesas');
        updateMetaTag('author', '@webmaster');
        updateMetaTag('robots', 'index, follow');

        // Open Graph
        updateMetaTag('og:title', 'Nudo Muebles', 'property');
        updateMetaTag('og:description', 'Explora el catálogo de muebles.', 'property');
        updateMetaTag('og:type', 'website', 'property');
        updateMetaTag('og:image', 'https://raw.githubusercontent.com/FranCamposAmoedo/NudoMueblesReact/refs/heads/main/public/images/LogoNudo.png', 'property');
        updateMetaTag('og:url', window.location.href, 'property');
    }, []);

    const productosPorPagina = 6;


    const manejarEliminar = (producto) => {
        // Navegar a la página de confirmación de eliminación
        navigate('/eliminar-producto', { state: { producto } });
    };

    const manejarEditar = (producto) => {
        // Navegar al formulario de edición
        navigate('/formulario-producto', { state: { producto } });
    };

    const productosFiltrados = productos.filter(
        (producto) =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            (producto.categoria &&
                producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
    );

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    // Cambiar de página
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


    // Resetear a página 1 con búsquedas
    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
        setPaginaActual(1);
    };



    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main style={{ padding: '3rem', paddingTop: '150px' }}>
            <section className="container-lg destacados">
                <h2 className="mb-4">Nuestros productos</h2>
                {/* Barra de búsqueda */}
                <div className="row mb-4">
                    <div className="col-12">
                        <label className="form-label fw-bold">Buscar productos</label>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o categoría..."
                            className="form-control"
                            value={busqueda}
                            onChange={manejarBusqueda}
                        />
                        {busqueda && (
                            <small className="text-muted">
                                Mostrando {productosFiltrados.length} de {productos.length} productos
                            </small>
                        )}
                    </div>
                </div>

                {/* Grid de productos */}
                <div className="flex-container text-center" id="lista-productos">
                    {productosActuales.map((producto) => (
                        <div key={producto.id} className="card" style={{ width: '18rem' }}>
                            <img
                                src={producto.avatar}
                                alt={producto.nombre}
                                className="card-img-top"
                            />

                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">
                                    {producto.descripcion}
                                </p>
                                <h4>Precio: ${producto.precio}</h4>

                                <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <Link className="btn btn-outline-info" to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{ producto }}><button>Más detalles</button></Link>
                                        <button
                                            onClick={() => agregarAlCarrito(producto)}
                                            className="comprar btn btn-outline-success"
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>


                                    {/* Botones de admin */}
                                    {esAdmin && (
                                        <div className="mt-3 pt-3 border-top">
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={() => manejarEditar(producto)}
                                                    className="btn btn-warning btn-sm flex-fill"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => manejarEliminar(producto)}
                                                    className="btn btn-danger btn-sm flex-fill"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Paginador - Estilo simplificado */}
                {productosFiltrados.length > productosPorPagina && (
                    <div className="d-flex justify-content-center my-4">
                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => cambiarPagina(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}


                {/* Información de la página actual */}
                {productosFiltrados.length > 0 && (
                    <div className="text-center text-muted mt-2">
                        <small>
                            Mostrando {productosActuales.length} productos
                            (página {paginaActual} de {totalPaginas})
                        </small>
                    </div>
                )}


            </section>
        </main>

    );
}