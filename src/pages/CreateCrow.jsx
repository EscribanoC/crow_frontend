import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccordionCrow from "../components/AccordionCrow";

import "../styles/pages/CreateCrow.css";

const CreateCrow = () => {
  const [creatingCrow, setCreatingCrow] = useState(false);

  const handleCreateCrow = () => {
    setCreatingCrow(!creatingCrow);
  };

  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          {!creatingCrow ? (
            <div className="create-crow-start-container create-crow-start-introduction">
              <div className="create-crow-start-content-image">
                <img src="./images/3dcomponents.png" alt="3D Componentes" />
              </div>
              <div className="create-crow-start-content">
                <div className="create-crow-start-content-text">
                  <p className="create-crow-description">
                    Vemos que tienes una idea para enseñar al resto del mundo, y
                    nosotros estamos muy contentos por que confíes en nosotros
                    como medio para lograrlo.
                  </p>
                  <p className="create-crow-description">
                    Dejaremos algunas de las guías que tenemos abajo por si te
                    sirven de ayuda. O si prefieres puedes empezar a darle forma
                    al CROW.
                  </p>
                  <button
                    className="create-crow-start-button"
                    onClick={handleCreateCrow}
                  >
                    Empezar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="create-crow-start-container create-crow-start-form">
              <div className="create-crow-start-create-crow-content">
                <div className="create-crow-start-create-crow-content-title">
                  <h1 className="section-title">Crea tu Crow</h1>
                  <p>Sigue lo pasos</p>
                </div>
                <AccordionCrow />
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCrow;
