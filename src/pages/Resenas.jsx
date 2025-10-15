import React, { useEffect, useState } from 'react'

function Resenas() {

    const [personas, setPersonas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://randomuser.me/api")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setPersonas(datos.results);
                setCargando(false);
            })
            .catch((error) => {
                { console.error("Error!,", error) }
                setError("Hubo un problema al cargar los productos.");
                setCargando(false);
            });
    }, []);

    if (cargando) return <p style={{ padding: '3rem', paddingTop: '150px' }}>Cargando clientes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main style={{ padding: '3rem', paddingTop: '150px' }} className="container-lg">
            <h2 className="text-center">NUESTROS CLIENTES</h2>

            <section className="resenas-section resenia">
                <div className="container my-4 text-center">
                    <div className="resenas-item mt-2" id="contenido">
                        {/* Contenido recuperado con Fetch */}
                        {personas.map((persona) => (
                            <div key={persona.id}>
                                <img src={persona.picture.large} width="150px" className="img-fluid rounded-circle m-auto mb-5" />
                                <p>Nombre: {persona.name.first}</p>
                                <p>Email: {persona.email}</p>
                                <p>País: {persona.location.country}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn btn-success" onClick={() => window.location.reload()}>Siguiente</button>
            </section>
        </main>

    )
}

export default Resenas;