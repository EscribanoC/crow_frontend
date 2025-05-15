import React, { useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import "../styles/components/ProfileImageUploader.css";

const ProfileImageUploader = () => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setImage(null);
    inputRef.current.value = null;
  };

  return (
    <div className="profile-uploader-container">
      <div
        className={`profile-uploader ${dragActive ? "drag-active" : ""}`}
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={() => setDragActive(false)}
      >
        {image ? (
          <>
            <img src={image} alt="Preview" className="preview-img" />
          </>
        ) : (
          <div className="placeholder">
            <FaCamera size={24} className="camera-icon" />
            <p>Foto perfil</p>
            <span>Haz clic o arrastra aquí</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          name="avatarRegister"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden-input"
        />
      </div>

      {image && (
        <div className="delete-btn" onClick={handleDelete}>
          <FaTimes size={12} />
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;
