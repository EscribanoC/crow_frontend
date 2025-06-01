import React from "react";

function AdminSidebar({ selectedEntity, onSelect }) {
  const entities = ["Usuarios", "Crow"];

  return (
    <aside className="admin-sidebar">
      <h2>Gestión</h2>
      <ul>
        {entities.map((entity) => (
          <li
            key={entity}
            className={`sidebar-item ${
              selectedEntity === entity ? "active" : ""
            }`}
            onClick={() => onSelect(entity)}
          >
            {entity}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminSidebar;
