import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/LoginModal.css';

function LoginModal({ toggleModal, redirectTo = null }) {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [generos, setGeneros] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isRegistering) {
      fetch(`${API_URL}api/v1/enums/generos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch generos');
          }
          return response.json();
        })
        .then((data) => setGeneros(data))
        .catch((error) => console.error('Error fetching generos:', error));
    }
  }, [isRegistering]);

  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    fetch(`${API_URL}api/v1/auth/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        toggleModal();

        if (redirectTo) {
          navigate(redirectTo);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('emailRegister');
    const usuario = formData.get('usuarioRegister');
    const password = formData.get('passwordRegister');
    const repeatPassword = formData.get('repeatPasswordRegister');
    const genero = formData.get('generoRegister');
    const avatar = formData.get('avatarRegister');

    if (password !== repeatPassword) {
      alert('Passwords do not match.');
      return;
    }

    const payload = new FormData();
    payload.append('email', email);
    payload.append('usuario', usuario);
    payload.append('password', password);
    payload.append('genero', genero);
    payload.append('avatar', avatar);



    fetch(`${API_URL}api/v1/auth/register`, {
      method: 'POST',
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        return response.json();
      })
      .then(() => {
        alert('Registration successful! Please log in.');
        setIsRegistering(false);
      })
      .catch((error) => {
        console.error('Error during registration:', payload );
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {isRegistering ? (
          <>
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister}>
              <label>
                Email:
                <input type="email" name="emailRegister" required />
              </label>
              <label>
                Usuario:
                <input type="text" name="usuarioRegister" required />
              </label>
              <label>
                Contraseña:
                <input type="password" name="passwordRegister" required />
              </label>
              <label>
                Repetir Contraseña:
                <input type="password" name="repeatPasswordRegister" required />
              </label>
              <label>
                Género:
                <select name="generoRegister" required>
                  <option value="">Seleccione un género</option>
                  {generos.map((genero) => (
                    <option key={genero} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Avatar:
                <input type="file" name="avatarRegister" accept="image/*" required />
              </label>
              <button type="submit">Registrarse</button>
            </form>
            <button onClick={() => setIsRegistering(false)} className="link-button">
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
          </>
        ) : (
          <>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Contraseña:
                <input type="password" name="password" required />
              </label>
              <button type="submit">Iniciar Sesión</button>
            </form>
            <button onClick={() => setIsRegistering(true)} className="link-button">
              ¿No tienes una cuenta? Regístrate
            </button>
          </>
        )}
        <button onClick={toggleModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default LoginModal;