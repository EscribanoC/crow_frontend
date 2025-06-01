import React, { useState, useEffect } from "react";

function EditCrowModal({ crow, onClose, onSave }) {
  const [categorias, setCategorias] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    titulo: crow.titulo,
    descripcion: crow.descripcion,
    metaDonacion: crow.metaDonacion,
    recaudado: crow.recaudado,
    fechaCreacion: crow.fechaCreacion,
    fechaLimite: crow.fechaLimite,
    categoria: crow.categoria,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(crow.id, formData);
  };

  useEffect(() => {
    fetch(`${API_URL}enums/categorias`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categorías");
        }
        return response.json();
      })
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error fetching categorías:", error));
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Editar Crow {crow.titulo}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-input">
            <input
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={10}
            />
          </div>
          <div className="form-input">
            <input
              type="number"
              name="metaDonacion"
              value={formData.metaDonacion}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="number"
              name="recaudado"
              value={formData.recaudado}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="date"
              name="fechaLimite"
              value={formData.fechaLimite?.slice(0, 10)}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <select
              value={formData.categoria}
              name="categoria"
              onChange={handleChange}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions-admin">
            <button type="submit" className="boton-submit-modal-admin">
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="boton-cancelar-modal-admin"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCrowModal;
