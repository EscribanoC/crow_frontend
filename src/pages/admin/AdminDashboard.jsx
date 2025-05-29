import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPanel from "../../components/admin/AdminPanel";

import "../../styles/pages/admin.css";

function AdminDashboard() {
  const [selectedEntity, setSelectedEntity] = useState("Usuarios");

  return (
    <div className="admin-container">
      <AdminHeader />
      <div className="admin-body">
        <AdminSidebar
          selectedEntity={selectedEntity}
          onSelect={setSelectedEntity}
        />
        <AdminPanel selectedEntity={selectedEntity} />
      </div>
    </div>
  );
}

export default AdminDashboard;
