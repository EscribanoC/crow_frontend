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
import { useNavigate } from "react-router-dom";

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
  const [numberOfRewards, setNumberOfRewards] = useState();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    imagenes: [],
    videoPromocional: null,
    fechaLimite: "",
    meta: 0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("titulo", formData.titulo);
    formDataToSend.append("descripcion", formData.descripcion);

    if (formData.videoPromocional) {
      formDataToSend.append("videoPresentacion", formData.videoPromocional);
    }

    if (formData.imagenes && formData.imagenes.length > 0) {
      for (const img of formData.imagenes) {
        formDataToSend.append("imagenesGaleria", img);
      }
    }

    formDataToSend.append("meta", parseFloat(formData.meta || 0));
    formDataToSend.append("fechaLimite", formData.fechaLimite);
    formDataToSend.append("categoria", formData.categoria);

    if (formData.recompensas.length > 0) {
      formData.recompensas.forEach((recompensa, index) => {
        formDataToSend.append(
          `recompensas[${index}][titulo]`,
          recompensa.titulo
        );
        formDataToSend.append(
          `recompensas[${index}][descripcion]`,
          recompensa.descripcion
        );
        formDataToSend.append(
          `recompensas[${index}][metaDonacion]`,
          recompensa.metaDonacion
        );
        if (recompensa.imagen) {
          formDataToSend.append(
            `recompensas[${index}][imagen]`,
            recompensa.imagen
          );
        }
      });
    }

    //TODO Quitar eso siguiente

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

    if (
      formData.videoPromocional &&
      formData.videoPromocional.size > MAX_VIDEO_SIZE
    ) {
      alert("El video excede el tamaño máximo permitido de 100MB.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}crows/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al crear el crow");
      }

      const data = await response.json();
      alert("Crow creado con éxito");
      console.log("Crow creado:", data);
      navigate("/home");
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  const handleStepChange = (step) => setActiveStep(step);

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleComplete = () => {
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
                    accept="video/mp4"
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
                title="Meta económica"
                description="Establece la cantidad de dinero que necesitas recaudar."
                numberSection="1"
              >
                <TextField
                  label="Cantidad objetivo (€)"
                  type="number"
                  inputMode="numeric"
                  fullWidth
                  value={formData.meta}
                  onChange={(e) => handleChange("meta", e.target.value)}
                  inputProps={{ min: 0 }}
                />
              </FormAccordionSection>

              <FormAccordionSection
                title="Fecha de finalización"
                description="Introduce una fecha límite para tu proyecto."
                numberSection="2"
              >
                <TextField
                  label="Fecha límite"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.fechaLimite}
                  onChange={(e) => handleChange("fechaLimite", e.target.value)}
                />
              </FormAccordionSection>
            </div>
          )}

          {activeStep === 2 && (
            <div className="form-section-4">
              <FormAccordionSection
                title="Recompensas"
                description="Ahora elige cuántas recompensas tendrá tu Crow. Estas recompensas serán para premiar a los donantes que lleguen a una meta de donación. Como máximo podrás poner 5 recompensas."
                numberSection="1"
              >
                <TextField
                  label="Número de recompensas"
                  type="number"
                  inputProps={{ min: 0, max: 5 }}
                  value={numberOfRewards}
                  onChange={(e) => {
                    const value = Math.min(
                      5,
                      Math.max(0, parseInt(e.target.value) || 0)
                    );
                    setNumberOfRewards(value);

                    // Ajustar tamaño del array de recompensas según el número
                    setFormData((prev) => ({
                      ...prev,
                      recompensas: Array.from(
                        { length: value },
                        (_, i) =>
                          prev.recompensas[i] || {
                            titulo: "",
                            descripcion: "",
                            imagen: null,
                            metaDonacion: "",
                          }
                      ),
                    }));
                  }}
                  fullWidth
                  margin="normal"
                />

                {/* Render dinámico de los formularios de recompensa */}
                {Array.from({ length: numberOfRewards }).map((_, index) => (
                  <Box
                    key={index}
                    mb={3}
                    p={2}
                    border="1px solid #ccc"
                    borderRadius="8px"
                  >
                    <h4>Recompensa {index + 1}</h4>
                    <TextField
                      label="Título"
                      fullWidth
                      margin="normal"
                      value={formData.recompensas[index]?.titulo || ""}
                      onChange={(e) => {
                        const updated = [...formData.recompensas];
                        updated[index].titulo = e.target.value;
                        setFormData({ ...formData, recompensas: updated });
                      }}
                    />
                    <TextField
                      label="Descripción"
                      fullWidth
                      multiline
                      rows={2}
                      margin="normal"
                      value={formData.recompensas[index]?.descripcion || ""}
                      onChange={(e) => {
                        const updated = [...formData.recompensas];
                        updated[index].descripcion = e.target.value;
                        setFormData({ ...formData, recompensas: updated });
                      }}
                    />
                    <TextField
                      label="Meta de donación (€)"
                      type="number"
                      fullWidth
                      margin="normal"
                      inputProps={{ min: 0 }}
                      value={formData.recompensas[index]?.metaDonacion || ""}
                      onChange={(e) => {
                        const updated = [...formData.recompensas];
                        updated[index].metaDonacion = e.target.value;
                        setFormData({ ...formData, recompensas: updated });
                      }}
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel shrink htmlFor={`reward-image-${index}`}>
                        Imagen de la recompensa
                      </InputLabel>
                      <input
                        id={`reward-image-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const updated = [...formData.recompensas];
                          updated[index].imagen = e.target.files[0];
                          setFormData({ ...formData, recompensas: updated });
                        }}
                      />
                    </FormControl>
                  </Box>
                ))}
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

            {activeStep < steps.length - 1 && (
              <Button
                type="button"
                variant="contained"
                onClick={handleComplete}
                className="button-crow-next"
              >
                Siguiente
              </Button>
            )}
            {activeStep === steps.length - 1 && (
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
