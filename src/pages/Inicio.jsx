import React from 'react'
import { Link } from 'react-router-dom';

function Inicio() {
    return (
        <>
            <main>
                <section className="hero">
                    <div className="hero-container">
                        <h1>Nudo Muebles</h1>
                    </div>
                </section>
                <section className="container-lg destacados">
                    <h2>Categorías</h2>
                    <div className="flex-container">
                        <div className="card" style={{ width: "18rem" }}>
                            <img
                                src="/images/mesa-comedor-industrial.webp"
                                className="card-img-top"
                                alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Mesas</h5>
                                <p className="card-text">
                                    Más que un simple mueble, una mesa es el punto de encuentro donde la vida sucede. Desde cenas familiares y conversaciones con amigos, hasta largas jornadas de trabajo o estudio, nuestras mesas están diseñadas para adaptarse a cada momento de tu vida. Explora nuestra amplia selección y encuentra la pieza perfecta que no solo se ajuste a tu estilo, sino que también satisfaga todas tus necesidades de funcionalidad y diseño.
                                </p>
                                <Link to="/productos" className="btn btn-outline-success"
                                >Ir al producto</Link
                                >
                            </div>
                        </div>
                        <div className="card" style={{ width: "18rem" }}>
                            <img
                                src="/images/estanteria-modular-hierro.jpg"
                                className="card-img-top"
                                alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Estanterías</h5>
                                <p className="card-text">
                                    Dile adiós al desorden y dale un toque de personalidad a tus paredes con nuestras estanterías. Son la solución ideal para organizar libros, mostrar tus objetos decorativos favoritos y mantener cada espacio en orden. No son solo muebles de almacenamiento, sino elementos clave para el diseño de tu interior. Tenemos una gran variedad de opciones para cada estilo, desde soluciones minimalistas y modernas hasta diseños modulares que se adaptan a tu crecimiento.
                                </p>
                                <Link to="/productos" className="btn btn-outline-success"
                                >Ir al producto</Link
                                >
                            </div>
                        </div>
                        <div className="card" style={{ width: "18rem" }}>
                            <img
                                src="/images/silla-hierro-madera-rustica.jpg"
                                className="card-img-top"
                                alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Sillas y sillones</h5>
                                <p className="card-text">
                                    La comodidad no está reñida con el estilo. Nuestra colección de sillas y sillones te invita a relajarte y disfrutar de cada momento. Ya sea que busques la silla de comedor perfecta para tus invitados, la butaca ideal para tu rincón de lectura o el sillón que se convierta en tu lugar favorito, aquí lo encontrarás. Diseños ergonómicos, materiales de alta calidad y acabados elegantes se unen para ofrecerte la máxima comodidad y durabilidad.
                                </p>
                                <Link to="/productos" className="btn btn-outline-success"
                                >Ir al producto</Link
                                >
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Inicio;