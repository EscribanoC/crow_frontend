import React from "react";
import UsuarioTable from "./UsuarioTable";

function AdminPanel({ selectedEntity }) {
  return (
    <main className="admin-panel">
      <h2>{selectedEntity}</h2>
      <div className="admin-panel-content">
        {selectedEntity === "Usuarios" ? (
          <UsuarioTable />
        ) : (
          <p>Selecciona una entidad para gestionar.</p>
        )}
      </div>
    </main>
  );
}

export default AdminPanel;
