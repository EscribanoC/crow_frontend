import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/LoginModal.css";
import "../styles/components/welcomeButton.css";
import ProfileImageUploader from "./ProfileImageUploader";

function LoginModal({
  toggleModal,
  redirectTo = null,
  animateContent = false,
}) {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [generos, setGeneros] = useState([]);
  const [formTransition, setFormTransition] = useState(""); // '' | 'to-register' | 'to-login'

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isRegistering) {
      fetch(`${API_URL}api/v1/enums/generos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch generos");
          }
          return response.json();
        })
        .then((data) => setGeneros(data))
        .catch((error) => console.error("Error fetching generos:", error));
    }
  }, [isRegistering]);

  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch(`${API_URL}api/v1/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        toggleModal();

        if (redirectTo) {
          navigate(redirectTo);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("emailRegister");
    const usuario = formData.get("usuarioRegister");
    const password = formData.get("passwordRegister");
    const repeatPassword = formData.get("repeatPasswordRegister");
    const genero = formData.get("generoRegister");
    const avatar = formData.get("avatarRegister");

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = new FormData();
    if (avatar) {
      payload.append("avatar", avatar);
    }
    payload.append("email", email);
    payload.append("usuario", usuario);
    payload.append("password", password);
    payload.append("genero", genero);

    fetch(`${API_URL}api/v1/auth/register`, {
      method: "POST",
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register");
        }
        return response.json();
      })
      .then(() => {
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      })
      .catch((error) => {
        console.error("Error during registration:", payload);
        alert("Registration failed. Please try again.");
      });
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      toggleModal();
    }
  };

  //Animación a registro
  const handleToRegister = () => {
    setFormTransition("to-register");
    setTimeout(() => {
      setIsRegistering(true);
      setFormTransition("");
    }, 400);
  };

  //Animación a login
  const handleToLogin = () => {
    setFormTransition("to-login");
    setTimeout(() => {
      setIsRegistering(false);
      setFormTransition("");
    }, 400);
  };

  return (
    <div
      className={`modal ${
        animateContent ? "animate-in-modal" : "animate-out-modal"
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-header">
        <img
          src="./image/Logo1.png"
          alt="Logo"
          className="logo-welcome-small"
        />
      </div>

      <div
        className={`modal-content modal-anim-height ${
          isRegistering ? "register" : "login"
        }
      ${formTransition ? " " + formTransition : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`form-wrapper 
        ${!isRegistering && formTransition === "to-register" ? "fade-out" : ""}
        ${isRegistering && formTransition === "to-login" ? "fade-out" : ""}
        ${!isRegistering && !formTransition ? "fade-in" : ""}
        ${formTransition === "to-login" && !isRegistering ? "fade-in" : ""}`}
          style={{
            display: isRegistering && !formTransition ? "none" : "flex",
          }}
        >
          <div className="modal-form">
            <form onSubmit={handleLogin}>
              <div className="form-input">
                <label>Email:</label>
                <input id="email" type="email" name="email" required />
              </div>
              <div className="form-input">
                <label>Contraseña:</label>
                <input id="password" type="password" name="password" required />
              </div>
              <button
                type="submit"
                className="welcome-button boton-submit-modal"
              >
                Iniciar Sesión
              </button>
            </form>

            <div className="alternative-login">
              <p>
                ¿No tienes una cuenta?
                <button onClick={handleToRegister} className="link-button">
                  Regístrate
                </button>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`form-wrapper${
            isRegistering && formTransition === "to-login" ? " fade-out" : ""
          }${
            !isRegistering && formTransition === "to-register"
              ? " fade-out"
              : ""
          }${isRegistering && !formTransition ? " fade-in" : ""}
          ${
            formTransition === "to-register" && isRegistering ? " fade-in" : ""
          }`}
          style={{
            display: !isRegistering && !formTransition ? "none" : "block",
          }}
        >
          <div className="modal-form">
            <form onSubmit={handleRegister}>
              <div className="image-container">
                <ProfileImageUploader />
              </div>
              <div className="form-input">
                <label>Email:</label>
                <input type="email" name="emailRegister" required />
              </div>
              <div className="form-input">
                <label>Usuario:</label>
                <input type="text" name="usuarioRegister" required />
              </div>
              <div className="form-input">
                <label>Contraseña:</label>
                <input type="password" name="passwordRegister" required />
              </div>
              <div className="form-input">
                <label>Repetir Contraseña:</label>
                <input type="password" name="repeatPasswordRegister" required />
              </div>
              <div className="form-input">
                <label>Género:</label>
                <select name="generoRegister" required>
                  <option value="">Seleccione un género</option>
                  {generos.map((genero) => (
                    <option key={genero} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="welcome-button boton-submit-modal"
                type="submit"
              >
                Registrarse
              </button>
            </form>
            <div className="alternative-login">
              <p>
                ¿Ya tienes una cuenta?
                <button onClick={handleToLogin} className="link-button">
                  Inicia sesión
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
