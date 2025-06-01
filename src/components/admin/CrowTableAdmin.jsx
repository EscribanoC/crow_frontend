import React, { useEffect, useState } from "react";
import EditCrowModal from "./EditCrowModal";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

function CrowTableAdmin() {
  const [crows, setCrows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const [crowEditando, setCrowEditando] = useState(null);
  const [mostrarEditor, setMostrarEditor] = useState(false);

  const fetchCrows = async () => {
    try {
      const response = await fetch(`${API_URL}crows/admin/crows`);
      if (!response.ok) throw new Error("Error al cargar crows");
      const data = await response.json();
      setCrows(data || []);
      setTotalPages(Math.ceil(data.length / pageSize));
    } catch (error) {
      console.error("Error cargando crows:", error);
    }
  };

  const crowsMostrados = crows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  useEffect(() => {
    fetchCrows();
  }, [currentPage]);

  const handleEdit = (id) => {
    const crow = crows.find((c) => c.id === id);
    setCrowEditando(crow);
    setMostrarEditor(true);
  };

  const handleCloseEditor = () => {
    setCrowEditando(null);
    setMostrarEditor(false);
  };

  const handleSave = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}crows/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar el crow");

      await fetchCrows();
      handleCloseEditor();
    } catch (error) {
      console.error("Error al guardar crow:", error);
    }
  };

  const handleDelete = async (id) => {
    const crow = crows.find((c) => c.id === id);
    const confirmString = `BORRAR CROW ${crow.titulo.toUpperCase()}`;

    const { value: inputText } = await Swal.fire({
      title: "Confirmar eliminación",
      html: `
      <p>Escribe <strong>${confirmString}</strong> para confirmar la eliminación del crow.</p>
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

        const response = await fetch(`${API_URL}crows/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al eliminar el crow");

        await fetchCrows(); // Recarga la lista

        Swal.fire(
          "¡Eliminado!",
          "El crow ha sido eliminado correctamente.",
          "success"
        );
      } catch (error) {
        console.error("Error al eliminar crow:", error);
        Swal.fire("Error", "No se pudo eliminar el crow.", "error");
      }
    }
  };

  return (
    <div className="crow-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Meta</th>
            <th>Recaudado</th>
            <th>Fecha Creación</th>
            <th>Fecha Límite</th>
            <th>Categoría</th>
            <th>Usuario</th>
            <th>Gestión</th>
          </tr>
        </thead>
        <tbody>
          {crowsMostrados.map((crow) => (
            <tr key={crow.id}>
              <td>{crow.id}</td>
              <td>{crow.titulo}</td>
              <td>
                <p className="description-crow-admin">{crow.descripcion}</p>
              </td>
              <td>{crow.metaDonacion}€</td>
              <td>{crow.recaudado}€</td>
              <td>{crow.fechaCreacion}</td>
              <td>{crow.fechaLimite}</td>
              <td>{crow.categoria}</td>
              <td>{crow.usuario.usuario}</td>
              <td>
                <div className="td-admin-manage-crows">
                  <button onClick={() => handleEdit(crow.id)}>Editar</button>
                  <button onClick={() => handleDelete(crow.id)}>Borrar</button>
                </div>
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
      {mostrarEditor && crowEditando && (
        <EditCrowModal
          crow={crowEditando}
          onClose={handleCloseEditor}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default CrowTableAdmin;
