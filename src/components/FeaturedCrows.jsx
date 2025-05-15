import React, { useState, useEffect } from "react";

const FeaturedCrows = () => {
  const [crows, setCrows] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}api/v1/crows`)
      .then((response) => response.json())
      .then((data) => setCrows(data))
      .catch((error) => console.error("Error fetching crows:", error));
  }, []);

  return (
    <div className="">
      {crows.map((crow, index) => (
        <div key={index} className="crow-item">
          <div>
            <h3>{crow.titulo}</h3>
            <p>{crow.descripcion}</p>
            <p>{crow.metaDonacion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCrows;
