import React, { useEffect, useState } from "react";
import ProfileImageUploader from "../ProfileImageUploader";

const EditUsuarioModal = ({ usuario, onClose, onSave }) => {
  const [email, setEmail] = useState("");
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [generos, setGeneros] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}enums/generos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch generos");
        }
        return response.json();
      })
      .then((data) => setGeneros(data))
      .catch((error) => console.error("Error fetching generos:", error));
  }, []);

  useEffect(() => {
    if (usuario) {
      setEmail(usuario.email);
      setUsuarioNombre(usuario.usuario);
      setGenero(usuario.genero || "");
      setAvatar(usuario.avatar || null); // Puede que luego necesites pasarlo al uploader
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatarFile = event.target.avatarRegister.files[0];

    const formData = new FormData();
    formData.append("email", email);
    formData.append("usuario", usuarioNombre);
    formData.append("genero", genero);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    onSave(usuario.id, formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="image-container">
            <ProfileImageUploader
              initialImage={avatar}
              onFileSelect={(file) => setAvatar(file)}
            />
          </div>

          <div className="form-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-input">
            <label>Usuario:</label>
            <input
              type="text"
              value={usuarioNombre}
              onChange={(e) => setUsuarioNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-input">
            <label>Género:</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="">Seleccione un género</option>
              {generos.map((g) => (
                <option key={g} value={g}>
                  {g}
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
};

export default EditUsuarioModal;
