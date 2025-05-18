import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormAccordionSection from "./FormAccordionSection";
import CustomStepper from "./CustomStepper";

import "../styles/components/AccordionCrow.css";

export default function AccordionCrow() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categorias, setCategorias] = useState([]);
  const steps = [
    "Información básica",
    "Meta a llegar y fecha límite",
    "Recompensas",
    "Pasos finales",
  ];

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    imagenes: [],
    videoPromocional: null,
    fechaFinalizacion: "",
    metaFinanciera: "",
    recompensas: [],
  });

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, files) => {
    setFormData((prev) => ({ ...prev, [field]: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // TODO Enviar a una API, etc.
  };

  const handleStepChange = (step) => setActiveStep(step);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleComplete = () => {
    // TODO Invalidar el siguiente paso
    /* 
    if (activeStep === 0) {
      if (!formData.titulo || !formData.descripcion || !formData.categoria) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
      }
    }*/
    console.log("Paso completado:", activeStep);
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const allStepsCompleted = Object.keys(completed).length === steps.length;

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
    <Container maxWidth="md">
      <div className="create-crow-start-content-form">
        <CustomStepper
          steps={steps}
          activeStep={activeStep}
          completed={completed}
          onStepChange={handleStepChange}
        />

        <form onSubmit={handleSubmit} className="form-create-crow">
          {activeStep === 0 && (
            <div className="form-section-1">
              <FormAccordionSection
                title="Escribe un título para tu crow"
                description="El título será el primer elemento que leerán los usuarios, 
                      recuerda que tiene que ser breve y llamativo."
                numberSection="1"
              >
                <TextField
                  label="Título"
                  fullWidth
                  value={formData.titulo}
                  onChange={(e) => handleChange("titulo", e.target.value)}
                />
              </FormAccordionSection>

              <FormAccordionSection
                title="Añade una descripción"
                description="Introduce una descripción breve de tu proyecto"
                numberSection="2"
              >
                <TextField
                  label="Descripción"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                />
              </FormAccordionSection>

              <FormAccordionSection
                title="Categoría"
                description="Selecciona una categoría del listado"
                numberSection="3"
              >
                <FormControl fullWidth>
                  <InputLabel id="select-categoria-label">Categoría</InputLabel>
                  <Select
                    labelId="select-categoria-label"
                    value={formData.categoria}
                    label="Categoría"
                    onChange={(e) => handleChange("categoria", e.target.value)}
                  >
                    {categorias.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormAccordionSection>

              <FormAccordionSection
                title="Multimedia"
                description="Sube imágenes y un video promocional"
                numberSection="4"
              >
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink htmlFor="imagenes-upload">
                    Imágenes (varias)
                  </InputLabel>
                  <input
                    id="imagenes-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange("imagenes", e.target.files)
                    }
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel shrink htmlFor="video-upload">
                    Video Promocional
                  </InputLabel>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleFileChange("videoPromocional", e.target.files[0])
                    }
                  />
                </FormControl>
              </FormAccordionSection>
            </div>
          )}

          {activeStep === 1 && (
            <div className="form-section-2">
              <FormAccordionSection
                title="Fecha de finalización"
                description="Introduce una fecha límite para tu proyecto."
                numberSection="1"
              >
                <TextField
                  label="Fecha de finalización"
                  fullWidth
                  value={formData.titulo}
                  onChange={(e) => handleChange("titulo", e.target.value)}
                />
              </FormAccordionSection>
            </div>
          )}

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              className="button-crow-back"
            >
              Atrás
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleComplete}
                className="button-crow-next"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                className="button-crow-submit"
              >
                Crear Crow
              </Button>
            )}
          </Box>
        </form>
      </div>
    </Container>
  );
}
