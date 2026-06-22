function HomePage() {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Sistema de gestion escolar</h1>

        <p className="card-text">
          Frontend desarrollado con React y conectado a un backend Spring Boot.
        </p>

        <p className="card-text">
          Desde esta aplicación podrás administrar los procesos academicos de estudiantes y docentes mediante operaciones CRUD completas.
        </p>

        <div className="alert alert-info mb-0">
          Backend esperado: <strong>http://localhost:5000</strong>
          <br />
          Frontend Vite: <strong>http://localhost:5173 o http://localhost:5174</strong>
        </div>
      </div>
    </div>
  );
}

export default HomePage;