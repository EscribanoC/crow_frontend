import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/LoginModal.css';

function LoginModal({ toggleModal, redirectTo = null}) {
  const navigate = useNavigate();
  
  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    fetch('http://localhost:8080/api/v1/auth/authenticate', {
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

  return (
    <div className="modal">
      <div className="modal-content">
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
        <button onClick={toggleModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default LoginModal;