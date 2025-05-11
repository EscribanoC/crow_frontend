export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;
  
    try {
      const response = await fetch(`${API_URL}api/v1/usuarios/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener el usuario");
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Fallo al obtener el usuario:", error);
      return null;
    }
  };