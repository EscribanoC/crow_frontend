import React from "react";

function AdminPanel({ selectedEntity }) {
  return (
    <main className="admin-panel">
      <h2>Gestionar: {selectedEntity}</h2>
      <div className="admin-panel-content">
        <p>
          Aquí se mostrarán los formularios y funcionalidades para{" "}
          <strong>{selectedEntity}</strong>.
        </p>
      </div>
    </main>
  );
}

export default AdminPanel;
