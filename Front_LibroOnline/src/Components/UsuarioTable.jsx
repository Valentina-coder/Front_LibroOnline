function UsuarioTable({ usuario, onEditar, onEliminar}){

    if (!Array.isArray(usuario) || usuario.length === 0){
        return (
            <div className="alert alert-warning mb-0">
                no hay usuarios para mostar
            </div>
        );
    }

    return(
        <div className="table-resposive"    >
            <table className="table table-striped table-bordered table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID usuario</th>
                        <th scope="col">primer nombre</th>
                        <th scope="col">segundo nombre</th>
                        <th scope="col">apellido paterno</th>
                        <th scope="col">apellido materno</th>
                        <th scope="col">telefono</th>
                        <th scope="col" className="text-center">
                            acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {usuario.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.primer_nombre}</td>
                            <td>{usuario.segundo_nombre}</td>
                            <td>{usuario.ap_paterno}</td>
                            <td>{usuario.ap_materno}</td>
                            <td>{usuario.telefono}</td>

                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-warning btn-sm"
                                        onClick={() => onEditar(usuario.id_usuario)}
                                    >
                                        editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onEliminar(usuario.id_usuario)}
                                    >
                                        eliminar
                                    </button>
                                </div>
                            </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsuarioTable;