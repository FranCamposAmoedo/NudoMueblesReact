import { Link, useParams, useLocation } from "react-router-dom";

const DetalleProducto = () => {

    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;

    if (!producto) {
        return (
            <div>
                <p>No se pudo cargar el producto</p>
                <Link to="/carrito">
                    <button>Volver a Productos</button>
                </Link>
            </div>
        );
    }

    return (
        <main id="detalleProducto" className="container-lg d-flex justify-around gap-10" style={{ padding: '3rem', paddingTop: '150px' }}>

            <div className="detImageContainer" style={{ width: '50%' }}>
                <img src={producto.avatar} alt={producto.nombre} width={'100%'} />
            </div>
            <div style={{ width: '100%' }}>
                <h3>Detalles del Producto {id}</h3>
                <ul style={{ paddingLeft: '0px' }}>
                    <li key={producto.id}>
                        <h2>{producto.nombre}</h2>
                        <br />
                        <p className="descProduct">{producto.descripcion}</p>
                        <p className="descProduct">Medidas: {producto.detalles.medidas}</p>
                        <p className="descProduct">{producto.detalles.materiales}</p>
                        <p className="descProduct">Color: {producto.detalles.color}</p>
                        <p className="descProduct">Peso: {producto.detalles.peso}</p>
                        <p><strong>Precio: ${producto.precio}</strong></p>

                    </li>
                    <hr />
                    <button className="btn btn-info"><Link className="no-underline text-white" to={`/productos`}>Volver</Link></button>
                </ul>

            </div>

        </main>
    );
}; export default DetalleProducto;