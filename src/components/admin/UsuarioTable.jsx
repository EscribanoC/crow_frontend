import React, { useEffect, useState } from "react";
import EditUsuarioModal from "./EditUsuarioModal";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

function UsuarioTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}usuarios`);
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();
      setUsuarios(data || []);
      setTotalPages(Math.ceil(data.length / pageSize));
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const usuariosMostrados = usuarios.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  useEffect(() => {
    fetchUsuarios(currentPage);
  }, [currentPage]);

  const handleEdit = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    setUsuarioEditando(usuario);
  };

  const handleCloseModal = () => {
    setUsuarioEditando(null);
  };

  const handleSaveUsuario = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}usuarios/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      await fetchUsuarios(currentPage);
      handleCloseModal();
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleDelete = async (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    const confirmString = `BORRAR USUARIO ${usuario.usuario.toUpperCase()}`;

    const { value: inputText } = await Swal.fire({
      title: "Confirmar eliminación",
      html: `
      <p>Escribe <strong>${confirmString}</strong> para confirmar la eliminación del usuario.</p>
      <input id="confirmInput" class="swal2-input" >
    `,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const input = document.getElementById("confirmInput").value;
        if (input !== confirmString) {
          Swal.showValidationMessage("El texto no coincide exactamente.");
          return false;
        }
        return input;
      },
    });

    if (inputText === confirmString) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}usuarios/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al eliminar usuario");

        await fetchUsuarios(currentPage);

        Swal.fire(
          "¡Eliminado!",
          "El usuario ha sido eliminado correctamente.",
          "success"
        );
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  return (
    <div className="usuario-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Usuario</th>
            <th>Género</th>
            <th>Avatar</th>
            <th>Gestión</th>
          </tr>
        </thead>
        <tbody>
          {usuariosMostrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.email}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.genero}</td>
              <td>
                {usuario.avatar ? (
                  <div className="avatar-small-container">
                    <img
                      src={`${API_URL}${usuario.avatar}`}
                      alt="Avatar"
                      className="avatar-small"
                    />
                  </div>
                ) : (
                  "Sin avatar"
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(usuario.id)}>Editar</button>
                <button onClick={() => handleDelete(usuario.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </button>
        <span>
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>
      {usuarioEditando && (
        <EditUsuarioModal
          usuario={usuarioEditando}
          onClose={handleCloseModal}
          onSave={handleSaveUsuario}
        />
      )}
    </div>
  );
}

export default UsuarioTable;
